export type ExtractedFormField = {
    type: string;
    action: any;
    id: string;
    value: any
  }
  
  export type ExtractedForm = {
    fields: ExtractedFormField[];
    apiKey: any;
    csrfToken: any;
    urlPath: string;
    emailId: number;
    fieldState: { [key: string]: string }
  }

  type ExtractedFormAction = {
    type: string,
    payload: ExtractedForm
}

  export default (state: ExtractedForm, action: ExtractedFormAction): ExtractedForm => {
    switch(action.type) {
        case "SET_EXTRACTED_FORM": {
            return action.payload
            
        }
        default: return state
    }
}