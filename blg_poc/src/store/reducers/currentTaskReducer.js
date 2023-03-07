export default (state = {
    taskMeta: {

    },
    config: {},
    responseData: {
    }
}, action) => {
    switch (action.type) {
        case "SET_CURRENT_TASK_STATE": {
            return action.payload
        }
        case "CLEAR_CURRENT_TASK_STATE": {
            return {
                taskMeta: {

                },
                config: {},
            }
        }
        default: {
            return state
        }
    }
}