import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Textarea } from '../../../../lib';
import CheckAndText from './CheckAndText';
import Checkbox from './Checkbox';
import Select from './Select';
import FreeText from './FreeText';
import Grouping from './Grouping';
import formStyles from './form.styles';
import { ErrorBoundary } from 'react-error-boundary';
import SummaryDisplay from './SummaryDisplay';
import SummaryDisplayReadOnly from './SummaryDisplayReadOnly';
import FormSectionHeader from './FormSectionHeader';
import { editTask } from 'api/tasks.api';
import TabItem from '../TaskNavigation/TabItem';
import {
  submitCurrentTask,
  saveCurrentTask
} from 'store/actions/currentTaskActions';
import { validate_aml_atf_policies_deficiencies } from './Validators';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Alert } from '@material-ui/lab';

import React from 'react';

const R = require('ramda');

const FormFieldErrorPlaceholder = ({fieldName=""}) => {
  return <div>Error displaying component {fieldName}</div>;
};

const FormField = ({ field, currentFormPath }) => {
  const dispatch = useDispatch();
  const getCurrentForm = (responseData, path) => {
    if (path.length <= 1) {
      return responseData?.form;
    } else {
      /*const nextPath = R.tail(path)
      const nextLevel = R.find(R.propEq('moduleName', R.head(nextPath)), responseData.subfolders)
      return getCurrentForm(nextLevel, nextPath)*/
      const fullPath = R.intersperse('subfolders', R.tail(path));
      const form = R.path(['subfolders', ...fullPath, 'form'], responseData);
      return form;
    }
  };
  const value = useSelector(state => {
    const responseData = state.currentTaskResponseData;
    // if(responseData.form && responseData.form.schema){
    //   var data = responseData.form.schema.find(x => x.type === "deficiencies")
    // }
    const currentForm = getCurrentForm(responseData, currentFormPath);
    var fieldValue = currentForm?.schema?.[field.label];
    if(fieldValue && fieldValue.label && fieldValue.label === "AML-ATF Polices and Procedures Outcome"){
      if(field.validate_deficiencies && validate_aml_atf_policies_deficiencies(responseData.form.schema)) {
        fieldValue.value = "Revise the compliance manual in accordance with the instructions in Schedule A";
      }
      else {
        fieldValue.value = ""
      }      
    }    
    return fieldValue;
  });

  const updateField = field => {
    dispatch({
      type: 'UPDATE_FORM_FIELD',
      payload: {
        currentFormPath: currentFormPath,
        field: field,
      },
    });
  };
  let fieldComponent = <div>"Field type not implemented"</div>;
  switch (field.type) {
    case 'deficiencies': {
      fieldComponent = (
        <CheckAndText field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'checkbox': {
      fieldComponent = (
        <Checkbox color='primary' field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'select': {
      fieldComponent = (
        <Select field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'freeform': {
      fieldComponent = (
        <FreeText field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'comments': {
      fieldComponent = (
        <FreeText field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'grouping': {
      fieldComponent = (
        <Grouping field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'sectionHeader': {
      fieldComponent = (
        <FormSectionHeader field={field} onChange={updateField} />
      );
      break;
    }
    case 'summaryGrouping': {
      fieldComponent = (
        <SummaryDisplay field={field} value={value} onChange={updateField} />
      );
      break;
    }
    case 'summaryGroupingDisplayOnly': {
      fieldComponent = (
        <SummaryDisplayReadOnly field={field} value={value} onChange={updateField} />
      );
      break;
    }
    default: {
      fieldComponent = <div>"Field type not implemented"</div>;
    }
  }
  return fieldComponent;
};

export default ({ currentPath, currentTabIndex, setCurrentTabIndex, auditId }) => {
  const formRef = useRef(null)
  const dispatch = useDispatch();
  const [currentForm, setCurrentForm] = useState(null);
  const [currentTabFields, setCurrentTabFields] = useState([]);
  const [instructions, setInstructions] = useState(null);
  const classes = formStyles();
  const config = useSelector(state => state.currentTask.config);
  const history = useHistory()
  const getForm = (path, structure) => {
    if (path.length === 0) {
      return null;
    } else if (path.length === 1) {
      setInstructions(structure.aum_instructions);
      return {
        formName: structure.form
      };
    } else {
      const newPath = R.drop(1, path);
      const newTarget = R.head(newPath);
      const newStructure = R.find(
        R.propEq('moduleName', newTarget),
        structure.subfolders
      );
      setInstructions(newStructure.aum_instructions);
      return getForm(newPath, newStructure);
    }
  };

  const handleSave = () => {
    dispatch(saveCurrentTask());
  };

  const handleSubmit = async () => {
    await dispatch(submitCurrentTask());
    history.push(`/management/audit?auditId=${auditId}`)
  };

  const tabItems = () => {
    const form = currentForm
    const tabNames = form.tabs.map((tab) => {
        return tab.label
    })
    if (tabNames.length <= 1) {
        return null
    }
    return tabNames.map((tabName, i) => {
        return <TabItem depth={0} key={tabName} tabName={tabName} tabIndex={i} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} />
    })

}

  useEffect(() => {
    if (!currentPath || !currentPath.length) {
      setCurrentForm(null);
    } else {
      const { formName, showModuleSummary } = getForm(
        currentPath,
        config.structure
      );
      const cf = config.forms[formName];
      setCurrentTabFields([]);
      setCurrentTabFields(
        generateCurrentTabFields(currentPath, currentTabIndex, cf)
      );
      setCurrentForm(cf);
    }
    if(formRef.current) {
      formRef.current.scrollTop = 0 
    }
  }, [currentPath, currentTabIndex]);

  const generateCurrentTabFields = (
    currentPath,
    currentTabIndex,
    currentForm
  ) => {
    const currentTabFields = R.pathOr(
      [],
      ['tabs', currentTabIndex, 'items'],
      currentForm
    );
    return currentTabFields.map(fieldName => {
      try {
        const field = currentForm.schema[fieldName];
        if (!field.label) {
          field.label = fieldName;
        }
        return (
          <FormField
            field={field}
            currentFormPath={currentPath}
            key={R.join('', currentPath) + fieldName}
          />
        );
      } catch (e) {
        console.log(e)
        return <FormFieldErrorPlaceholder fieldName={fieldName} />
      }

    });
  };

  return (
    <div className={classes.form} ref={formRef}>
      <div className={classes.breadCrumbs} style={{marginBottom: '0px'}}>
        {currentPath.map((pe, i) => {
          let lastItem = currentPath[currentPath.length - 1]
          return <div className={`${classes.breadCrumb} ${lastItem === pe && classes.lastPath}`} key={pe}>
            {i > 0 &&  <React.Fragment>&nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={faChevronRight} />&nbsp;&nbsp;</React.Fragment>} {pe}
            
          </div>
        })}        
      </div>
      {instructions ? 
              <div style={{width: '100%', marginBottom: '20px'}}>
                  <Alert style={{width:'100%'}} severity="info" sx={{color: '#aeaeaeb'}} >
                      {instructions}
                  </Alert>
              </div>  
              : ''
            }
      {!currentForm && <div className={classes.noFormSelected}>No Form Selected</div>}
      {currentForm && currentForm.tabs.length > 1 && <div className={classes.formTabs}>{tabItems()}</div>}
      {currentTabFields}
      <div className={classes.btnWrapper}>
        <Button type="primary" onClick={() => handleSave(false)}>
          Save
        </Button>
        <Button type="primary" onClick={() => handleSubmit(true)}>
          Complete
        </Button>
      </div>
    </div>
  );
};
