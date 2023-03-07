/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/components/form.module.scss'
import { StoreContext, StoreContextType } from '../../store/StoreProvider';
import { getOrigin } from "../../uitil/url";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { ModuleConfig } from "../../store/clientConfigReducer";
const baseUrl = getOrigin()

interface SubmitValidation {
    parent: string,
    children: string[]
}

export default ({ disabled }: { disabled: boolean }) => {
    const { dispatch, state } = useContext(StoreContext) as StoreContextType
    const { extractedForm, clientAuditConfig, filesState } = state

    const [show, setShow] = useState(false);
    const [errorList, setErrorList] = useState<SubmitValidation[]>([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showSubmitWarning = () : boolean => {        
        if(clientAuditConfig.subfolders.length > 0 && !filesState.subFolders){
            setErrorList([]);
            return false;
        }

        let errors: SubmitValidation[] = [];
        for(let i = 0; i < clientAuditConfig.subfolders.length; i++){            
            let error: SubmitValidation = { parent: "", children: [] };
            let module = clientAuditConfig.subfolders[i];
            if(!filesState.subFolders[module.moduleName] || 
                (!filesState.subFolders[module.moduleName].subFolders &&
                 !filesState.subFolders[module.moduleName].savedFiles)) {
                    error.parent = module.moduleName;
                 }
        
            error = validateModuleChildren(module, error);
            if(error.parent) {
                errors.push(error);
            }
        }

        setErrorList(errors);
        return errors.length > 0;
    };

    const validateModuleChildren = (module: ModuleConfig, error: SubmitValidation) => {
        let children = module.subfolders.filter(x => !x.noClientDisplay);
        let moduleFileState = filesState.subFolders[module.moduleName];
        if(!moduleFileState){
            error.parent = error.parent ? error.parent : module.moduleName;
            error.children = children.map(x => x.moduleName);

            return error;
        }

        for(let i = 0; i < children.length; i++){
            if(!moduleFileState.subFolders[children[i].moduleName] || 
                (!moduleFileState.subFolders[children[i].moduleName].subFolders &&
                 !moduleFileState.subFolders[children[i].moduleName].savedFiles)) {
                    error.parent = error.parent ? error.parent : module.moduleName;
                    error.children.push(children[i].moduleName);
                    continue;
                 }
        }

        return error;
    };

    const startSubmission = () => {
        console.log(filesState);
        console.log(clientAuditConfig.subfolders);
        if(showSubmitWarning()) {
            // Open alert modal
            handleShow();
            return;
        }

        handleSubmit();
    };

    const handleSubmit = () => {
        dispatch({
            type: "SET_PAGE_LOADER",
            payload: true
        })
        const formActionURL = new URL(extractedForm?.fields?.find((field) => field?.type === 'form')?.action)
        const transformedActionURL = `${baseUrl}/${formActionURL.pathname}${formActionURL.search}`
        const formData = new FormData()

        formData.append("csrfmiddlewaretoken", extractedForm.csrfToken)
        formData.append("field_firstname", extractedForm.fieldState.firstname)
        formData.append("field_lastname", extractedForm.fieldState.lastname)
        formData.append("field_email", extractedForm.fieldState.email)
        formData.append("field_audit_uuid", extractedForm.fieldState.audit_uuid)
        formData.append("api_key", extractedForm.apiKey)
        
        const request = new XMLHttpRequest();

        request.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && (this.status === 200 || this.status === 302)) {
                window.open(`${window.location.origin}/portal/`, "_self")
            } else if (this.readyState === 4) {
                dispatch({
                    type: "SET_UNRECOVERABLE_MESSAGE",
                    payload: "An error occurred submitting. Refresh page to try again."
                  })
            }
        })
        request.open("POST", transformedActionURL);
        request.send(formData);
    }
    return (
        <>
        <button disabled={disabled} className={styles.submitBtn} type="button" id="target_form_submit" onClick={startSubmission} >
            <FontAwesomeIcon className={styles.chevronIcon} icon={faCheck} color="#fff" />
            Submit
        </button>

        <Dialog open={show} onClose={() => false} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontWeight: 'bold' }}>
            {"The following folders are empty. Are you sure you want to submit ?"}
            {
                errorList.map( validation => 
                    <>
                    <ul>
                      <li>
                        <label>{validation.parent}</label><br />
                        {
                            validation.children.map(child => 
                            <>
                                <label className="ml-3">{child}</label><br />
                            </>)
                        }
                      </li>
                      </ul>
                    </> 
                    )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={handleClose} style={{backgroundColor: '#00008B', color: 'white'}}>Cancel</Button>
            <Button onClick={() => { handleClose(); handleSubmit(); } } style={{backgroundColor: '#00008B', color: 'white'}}>Submit</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}