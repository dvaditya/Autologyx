import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./summaryDisplay.styles"
import { capitalizeUserResponses } from "./Validators";

const R = require("ramda")

const PathIndicator = ({ path }) => {
    const classes = styles()
    return <div className={classes.breadCrumbs}>{path.map((pe, i) => <div className={classes.breadCrumb} key={pe}>{i > 0 && " \\ "} {pe}</div>)}</div>
}

const FolderSummaryPanel = ({ sumaryItems }) => {
    const classes = styles()
    return <div className={classes.summaryPanel}>
        {sumaryItems.map((item) => {
            return <SummaryItem label={item.label} value={item.value} />
        })}
    </div>
}

const SummaryItem = ({ label, value }) => {
    const classes = styles()
    return <div>
        <div className={classes.fieldLabel}>
            {label}
        </div>
        <div>
            {value}
        </div>
    </div>
}

const FolderSummary = ({ folderItem }) => {
    return <div>
        <PathIndicator path={folderItem.path} />
        <FolderSummaryPanel sumaryItems={folderItem.items} />
    </div>
}

const getDeficienciesFromAnswers = (answers, folderName, fields) => {
    return R.keys(answers).reduce((acc, label) => {
        if(!fields[label]) {
            return acc
        }
        const field = answers[label]
        switch(field.type) {
            case "deficiencies": {
                const value = field?.value?.notes
                return !!value ? [...acc, {label: label, value, folderName}] : acc
            }
            case "select": {
                const value = field?.value
                return !!value ? [...acc, {label: label, value, folderName}] : acc
            }
            case "comments": {
                const value = field?.value
                return !!value ? [...acc, {label: label, value, folderName}] : acc
            }
            case "grouping": {
                const value = field?.value
                return !!value ? [...acc, {label: label, value, folderName}] : acc
            }
            default: {
                return acc
            }
        }
    }, [])
}

const getResponseDataAtPath = (path, responseData, fields) => {
    if(path.length === 0) {
        const pathReponseData =  R.pathOr({}, ["form", "schema"], responseData)
        return getDeficienciesFromAnswers(pathReponseData, responseData.moduleName, fields)
    } else {
        const truePath = ["subfolders", ...R.intersperse("subfolders", path), "form", "schema"]
        const trueModuleName = R.pathOr("", ["subfolders", ...R.intersperse("subfolders", path), "moduleName"], responseData)
        const pathReponseData = R.pathOr({}, truePath, responseData)
        return getDeficienciesFromAnswers(pathReponseData, trueModuleName, fields)
    }
}

const getSubFolderNames =  (path, structure) => {
    if (path.length === 0) {
        return structure.subfolders.map((sf) => sf.moduleName)
    }
    else {
        const newPath = R.drop(1, path)
        const newTarget = R.head(path)
        const newStructure = R.find(R.propEq('moduleName', newTarget), structure.subfolders)
        return getSubFolderNames(newPath, newStructure)
    }
}

const getOrderedResponseData = (path, responseData, structure, fields) => {
    const barePath = R.dropLast(1, path)
    if(R.last(path) === "*") {
        const leafNames = getSubFolderNames(barePath, structure)
        return leafNames.reduce((acc, leafName) => {
            const deficiencies = getResponseDataAtPath(barePath.concat(leafName), responseData, fields)
            if(deficiencies.length) {
                return [...acc, deficiencies]
            } else {
                return acc
            }
        }, [])
    } else {
        return [getResponseDataAtPath(barePath, responseData, fields)]
    }

}

export default ({ field, value, onChange }) => {
    const [folderDeficiencies, setFolderDeficiencies] = useState([])
    const responseData = useSelector((state) => state.currentTaskResponseData)
    const structure = useSelector((state) => state.currentTask.config.structure)
    const classes = styles()
    useEffect(() => {
        const fields = field.fields.reduce((acc, fieldName) => {
            return {
                ...acc,
                [fieldName]: true
            }
        }, {})
        const deficiencies = getOrderedResponseData(field.path, responseData, structure, fields)
        setFolderDeficiencies(deficiencies)
    }, [])

    const handleNotesChange = (e) => {
        let updatedVal = capitalizeUserResponses(e.target.value)
        onChange({
            ...value,
            value: updatedVal
        })
    }

    return <div className={classes.summaryDisplay}>
        <div className={classes.mainTitle}>{field.label}</div>
        <div className={classes.summaryPanel}>
            {
                folderDeficiencies.map((deficiencies) => {
                    return (<div className={classes.summaryGroup}>{deficiencies.map((deficiency) => {
                        return <div><div className={classes.deficiencyContainer}>{deficiency.folderName}</div> <div className={classes.deficiencyContainer}>{deficiency.label}</div> <div>{deficiency.value}</div></div>
                    })
                }</div>)
                })
            }
        </div>
        <textarea className={classes.textArea} onChange={handleNotesChange} value={value.value}/>
    </div>

}