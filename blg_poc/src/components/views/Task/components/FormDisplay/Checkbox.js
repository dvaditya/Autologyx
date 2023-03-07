import formStyles from "./form.styles"
import { Checkbox } from "components/lib"

export default ({ field, value, onChange }) => {
    const classes = formStyles()

    const handleCheckboxChange = (v) => {
        onChange({
            ...value,
            value: !value.value
        })
    }

    return <div>
        <div>
            <div style={{ width: '100%', }}>
                <div className={classes.checkboxGroup}><Checkbox color="primary" checked={value.value} onChange={handleCheckboxChange} /><span className={classes.summaryTitle}>{field.label}</span></div>
            </div>
        </div>
    </div>
}