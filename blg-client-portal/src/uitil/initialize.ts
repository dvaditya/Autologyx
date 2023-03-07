import { ReducerAction } from "../store/rootReducer"
import { get_build, get_build_prefix } from "./build";
import type { ModuleConfig } from "../store/clientConfigReducer"
import type {SavedFile} from "../store/filesReducer"
import type { ExtractedForm, ExtractedFormField } from "../store/extractedFormReducer";
import axios from "axios";


export type RecordAuditConfig = {
  field_audit_configuration: {
    structure: ModuleConfig
  },
  field_module_index: number
}

export type AuditConfig = {
  structure: ModuleConfig
}


const R = require("ramda")

const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL,ALX_INSTANCE, REACT_APP_ALX_INSTANCE, REACT_APP_LAMBDA_KEY_INSTANCE } = process.env;

const BUILD = get_build()

const transformConfigs = (auditConfigs: AuditConfig[]): ModuleConfig => {
  return {
    moduleName: "",
    instructions: "",
    maxFiles: 0,
    subfolders: auditConfigs.map((config: AuditConfig) => {
      return config.structure
    }),
    hideUnusedSubfolders: false,
    noClientDisplay: false
  }
}

const initialize = async (dispatch: React.Dispatch<ReducerAction>, extractedForm: ExtractedForm) => {
  dispatch({
    type: "SET_PAGE_LOADER",
    payload: true
  })

  try {
    //console.log( `https://${BUILD}.autologyx.com/api/v1/targets/${extractedForm.emailId}/?format=json&api_key=${REACT_APP_LAMBDA_KEY_INSTANCE}`)
    if(process.env.NODE_ENV !== 'development') {
      const { data } = await axios(
        `https://${BUILD}.autologyx.com/api/v1/targets/${extractedForm.emailId}/?format=json&api_key=${REACT_APP_LAMBDA_KEY_INSTANCE}`
      );
      extractedForm.fields = extractedForm.fields.map((field) => {
        return {
          ...field,
          value: data['field_'+field.id] ? data['field_'+field.id] : field.value
        }
      })
    }
  } catch (e) {
    console.log(e)
    dispatch({
      type: "SET_UNRECOVERABLE_MESSAGE",
      payload: "An error occurred initializing the app. An error occurred initializing the app. Refresh page to try again."
    })
  }

  const formVals = extractedForm.fields.reduce((acc: { [key: string]: string }, field: ExtractedFormField) => {
    return { ...acc, [field.id]: field.value }
  }, {})
  dispatch({
    type: "SET_EXTRACTED_FORM",
    payload: {
      ...extractedForm,
      fieldState: formVals
    }
  })
  // get audit
  let audit
  let configs
  let documents 
  try {
    const { data } = await axios(
      `https://${get_build_prefix()}${REACT_APP_API_URL}/audits/get?build=${BUILD}&authorizer_object_class_id=1`,
      {
        headers: {
          // api_key: REACT_APP_LAMBDA_KEY as string,
          uuid: formVals.audit_uuid
        }
      }
    );
    // console.log('initialize app data', data)
    audit = data?.results?.[0]
  } catch (e) {
    console.log(e)
    dispatch({
      type: "SET_UNRECOVERABLE_MESSAGE",
      payload: "An error occurred initializing the app. An error occurred initializing the app. Refresh page to try again."
    })
  }
  if (!audit) {
    dispatch({
      type: "SET_UNRECOVERABLE_MESSAGE",
      payload: "An error occurred initializing the app. Refresh page to try again."
    })
  }
  if (!audit?.field_audit_configuration) {
    // if audit has no config - get configs
    try {
      const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/configurations/get?build=${BUILD}&authorizer_object_class_id=1&active=1`,
        {
          headers: {
            // api_key: REACT_APP_LAMBDA_KEY as string,
            uuid: formVals.audit_uuid
          }
        }
      );
      // console.log('data from if audit has no config', data?.results)
      configs = R.sort((a: RecordAuditConfig, b: RecordAuditConfig) => {
        return a.field_module_index - b.field_module_index
      }, data?.results).map((config: RecordAuditConfig) => {
        return config.field_audit_configuration
      })
    } catch (e) {
      dispatch({
        type: "SET_UNRECOVERABLE_MESSAGE",
        payload: "An error occurred initializing the app. Refresh page to try again."
      })
    }
    // put configs on audit if required
    try {
      const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/audits/update?build=${BUILD}&authorizer_object_class_id=1`,
        {
          method: "PATCH",
          headers: {
            // api_key: REACT_APP_LAMBDA_KEY as string,
            uuid: formVals.audit_uuid
          },
          data: {
            "field_audit_configuration": {
              "configs": configs
            },
            "type": 1,
            "object_id": audit.id
          }
        }
      );
      audit = data
    } catch (e) {
      dispatch({
        type: "SET_UNRECOVERABLE_MESSAGE",
        payload: "An error occurred initializing the app. Refresh page to try again."
      })
    }
  }


  // dispatch audit config
  try {
    const auditCinfig = transformConfigs(audit?.field_audit_configuration?.configs)
    // console.log('transform audit configs,', auditCinfig, audit?.field_audit_configuration?.configs)
    dispatch({
      type: "SET_CLIENT_AUDIT_CONFIG",
      payload: auditCinfig
    })
  } catch (e) {
    console.log(e)
    dispatch({
      type: "SET_UNRECOVERABLE_MESSAGE",
      payload: "An error occurred initializing the app. Refresh page to try again."
    })
  }

  // get files
  try {
    const { data } = await axios(
      `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/get?authorizer_object_class_id=1&build=${BUILD}&object_class_id=5`,
      {
        headers: {
          // api_key: REACT_APP_LAMBDA_KEY as string,
          uuid: formVals.audit_uuid
        }
      }
    );
    documents = data?.results.map((doc: any) => {
      return {
        id: doc.field_document_uuid,
        path: doc.field_document_path.path,
        fileName: doc.field_document_name,
        size: doc.field_document_sizebytes,
        dateCreated: doc.created_at,
        type: doc.field_document_typemimetype,
        extension: doc.field_document_extention
        //createdBy: string
      }
    })
  } catch(e) {
    dispatch({
      type: "SET_UNRECOVERABLE_MESSAGE",
      payload: "An error occurred initializing the app. Refresh page to try again."
    })
  }
  // dispatch files
  
  documents.forEach((savedFile: SavedFile) => {
    dispatch({
      type: "SET_SAVED_FILE",
      payload: {
        path: savedFile.path,
        savedFile: savedFile
      }
    })
  })
  dispatch({
    type: "SET_PAGE_LOADER",
    payload: false
  })
}

export default initialize