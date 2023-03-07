import formStyles from "./form.styles"
import { Checkbox } from "components/lib"
import Select from "components/lib/Select/SelectTile"
import { capitalizeUserResponses } from "./Validators"

const R = require("ramda")

const CheckBoxField = ({ field, onChange }) => {
    const classes = formStyles()
    const fieldName = field.label
    const handleCheckboxChange = () => {
        onChange(fieldName, !field.value)
    }
    return <div className={classes.checkboxGroup}><Checkbox color="primary" checked={field.value} onChange={handleCheckboxChange} /><span key={fieldName} className={classes.summaryTitle}>{field.label}</span></div>
}

const FreeformField = ({ field, onChange }) => {
    const classes = formStyles()
    const fieldName = field.label
    const handleNotesChange = (e) => {
        onChange(fieldName, e.target.value)
    }
    return <div className={classes.groupingContainer} style={{ width: '100%', }} key={fieldName}>
        <span className={classes.summaryTitle}>{field.label}</span>
        <textarea className={classes.textArea} onChange={handleNotesChange} value={field.value} />
    </div>
}

const SelectField = ({ field, onChange }) => {
    const classes = formStyles()
    const fieldName = field.label
    const handleSelectChange = (e) => {
        onChange(fieldName, e.target.value)
    }
    return <div style={{ width: '100%', }} key={fieldName}>
        <span className={classes.summaryTitle}>{field.label}</span>
        <Select options={field.options} emptyOption={true} onChange={handleSelectChange} value={field.value} />
    </div>
}

const GroupField = ({ field, onChange }) => {
    const fieldName = field.label
    
    switch (field.type) {
        case "checkbox": {
            return <CheckBoxField field={field} onChange={onChange} key={fieldName} />
        }
        case "freeform": {
            return <FreeformField field={field} onChange={onChange} key={fieldName}/>
        }
        case "select": {
            return <SelectField field={field} onChange={onChange} key={fieldName}/>
        }
        default: {
            return <div key={fieldName} >Input type not implemented</div>
        }
    }
}

export default ({ field, value, onChange }) => {
    const handleChange = (fieldName, v) => {
        onChange({
            ...value,
            fields: {
                ...value.fields,
                [fieldName]: {
                    ...value.fields[fieldName],
                    value: v
                }
            }
        })
    }
    const handleNotesChange = (e) => {
        const newVal = e.target.value
        let updatedVal = capitalizeUserResponses(e.target.value)
        if(newVal) {
            onChange({
                ...value,
                value: updatedVal,
                status: "Deficient"
            })   
        } else {
            onChange({
                ...value,
                value: updatedVal
            })
        }
        
    }
    const handleTristateChange = (e) => {
        onChange({
            ...value,
            status: e.target.value
        })
    }
    const classes = formStyles()
    const evalCondition = (condition) => {
        const fieldVal = value.fields[condition.fieldLookup]?.value
        const testVal = condition.testVal
        switch (condition.operator) {
            case "eq": {
                return fieldVal === testVal
            }
            case "not_eq": {
                return fieldVal !== testVal
            }
            case "null": {
                return !fieldVal
            }
            case "not_null": {
                return !!fieldVal
            }
            default: {
                return true
            }
        }
    }

    const isHidden = (field) => {
        if (!field.displayWhen) {
            return false
        }
        return !R.all((condition) => evalCondition(condition), field.displayWhen)
    }

    return <div className={classes.groupingContainer}>
        <div>
            <div className={classes.grouping} style={{ width: '100%', }}>
                <span className={classes.groupTitle}>{field.label}</span>
                <Select options={['Not started',"Deficient", "Complete"]} emptyOption={false} value={value.status} onChange={handleTristateChange} disabled={!!value.value}/>
                {
                    field.order.map((fieldName) => {
                        const f = value.fields[fieldName]
                        if (isHidden(f)) {
                            return null
                        }
                        return <GroupField key={f.label} field={f} onChange={handleChange} />
                    })
                }
                <textarea className={classes.textArea} onChange={handleNotesChange} value={value.value}/>
            </div>
        </div>
    </div>
}