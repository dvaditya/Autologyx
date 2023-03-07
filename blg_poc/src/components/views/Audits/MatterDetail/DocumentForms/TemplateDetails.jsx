import React from 'react';
import {
  Select,
  TextInput,
  Input,
  Checkbox,
  Button,
  FormSection,
} from 'components/lib';
import templateDetailsStyles from './templateDetails.styles';

const TemplateDetails = ({
  selectedFields,
  templateDetailsObj,
  templateEditableDetailsObj,
  setTemplateEditableDetailsObj,
  required
}) => {
  const classes = templateDetailsStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={classes.inputContainer}>
        {selectedFields && selectedFields.filter(field => field.editable === true)
          .map((field, index) => {
            return (
              <div key={index} className={classes.formItem}>
                <TextInput
                  email={field.name.toLowerCase().includes('email')}
                  value={templateEditableDetailsObj[field.slug] ? templateEditableDetailsObj[field.slug] : ''}
                  required={required}
                  label={field.name}
                  setValue={e =>
                    setTemplateEditableDetailsObj({
                      ...templateEditableDetailsObj,
                      [field.slug]: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
      </div>
      <div className={classes.inputContainer}>
        {selectedFields && selectedFields.filter(field => field.editable === false)
          .map((field, index) => {
            return (
              <div key={index} className={classes.formItem}>
                <TextInput
                  disabled={true}
                  label={field.name}
                  value={templateDetailsObj[field.slug]}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default TemplateDetails;
