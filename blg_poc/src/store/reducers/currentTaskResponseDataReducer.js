const R = require("ramda")

const updateFormField = (responseData, field, formPath) => {
    if (formPath.length <= 1) {
        return R.assocPath(["form", "schema", field.label], field, responseData)
      } else {
        /*const nextPath = R.tail(path)
        const nextLevel = R.find(R.propEq('moduleName', R.head(nextPath)), responseData.subfolders)
        return getCurrentForm(nextLevel, nextPath)*/
        const fullPath = R.intersperse("subfolders", R.tail(formPath))
        return R.assocPath(["subfolders", ...fullPath,"form", "schema", field.label], field, responseData)
      }
    /*const updateFormFieldHelper = (responseData, field, formPath) => {
        if(formPath.length <= 1) {
            return {
                ...responseData,
                form: {
                    ...responseData.form,
                    schema: {
                        ...responseData.form.schema,
                        [field.label]: field
                    }
                }
            }
        } else {
            return {
                ...responseData,
                subfolders: responseData.subfolders.map((sf) => {
                    if(sf.moduleName === formPath[1]) {
                        return updateFormFieldHelper(sf, field, R.tail(formPath))
                    } else {
                        return sf
                    }
                })
            }
        }
    }
    return updateFormFieldHelper(responseData, field, formPath)*/
}

export default (state = {} , action) => {
    switch (action.type) {
        case "SET_CURRENT_TASK_RESPONSE_STATE": {
            return action.payload
        }
        case "CLEAR_CURRENT_TASK_STATE": {
            return {}
        }
        case "UPDATE_FORM_FIELD": {
            return updateFormField(state, action.payload.field, action.payload.currentFormPath)
        }
        default: {
            return state
        }
    }
}