import formStyles from "./form.styles"
import { capitalizeUserResponses } from "./Validators"

export default ({ field, value, onChange }) => {
    const classes = formStyles()

    const handleNotesChange = (e) => {
        e.preventDefault()
        let updatedVal = capitalizeUserResponses(e.target.value)
        onChange({
            ...value,
            value: updatedVal
        })
    }

    return <div>
        <div>
            <div className={classes.groupingContainer} style={{ width: '100%', }}>
                <span className={classes.summaryTitle}>{field.label}</span>
                <textarea className={classes.textArea} onChange={handleNotesChange} value={value.value}/>
            </div>
        </div>
    </div>
}