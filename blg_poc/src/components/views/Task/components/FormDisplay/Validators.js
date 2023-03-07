export const validate_aml_atf_policies_deficiencies = (schema) => {
    let schemaKeys = Object.keys(schema)
    for (let index = 0; index < schemaKeys.length; index++) {
        const element = schemaKeys[index];
        if (schema[element].type === "deficiencies" && schema[element].value.status === "Deficient") {
            return true;
        }
    }

    return false;
}

export const capitalizeUserResponses = (taskAnswers) => {
    var response = taskAnswers.split(" ")
    let wordsToSearch = ["DPEP", "FPEP", "HIO"]
    let clientToSearch = ["CLIENTID", "CLIENT-ID"]
    var newResponse = ""
    response.forEach((x, index) => {
        if (wordsToSearch.includes(x.toUpperCase())) {
            x = x.toUpperCase()
        } else if (x.toUpperCase() == "CLIENT" && index+1 < response.length && response[index+1].toUpperCase() == "ID") {
            response[index+1] = "ID"
            x = "Client"
        } else if (clientToSearch.includes(x.toUpperCase())) {
            x = "Client ID"
        }
        if (index == 0) {
            newResponse = x
        } else {
            newResponse = newResponse + ' ' + x
        }
    })
    return newResponse
}
