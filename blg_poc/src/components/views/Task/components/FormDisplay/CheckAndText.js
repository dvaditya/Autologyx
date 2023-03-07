import clsx from 'clsx';
import formStyles from "./form.styles"
import Select from "components/lib/Select/SelectTile"
import { capitalizeUserResponses } from './Validators';

export default ({ field, value, onChange }) => {
    const classes = formStyles()
    const handleTristateChange = (e) => {
        onChange({
            ...value,
            value: {
                ...value.value,
                status: e.target.value
            }
        })
    }

    const handleNotesChange = (e) => {
        e.preventDefault()
        const newVal = e.target.value
        let updatedVal = capitalizeUserResponses(e.target.value)
        if(newVal) {
            onChange({
                ...value,
                value: {
                    status: "Deficient",
                    notes: updatedVal
                }
            })    
        } else {
            onChange({
                ...value,
                value: {
                    ...value.value,
                    notes: updatedVal
                }
            })
        }
        
    }
    const textAreaClasses = clsx([
        classes.textArea,
        classes.checkAndTextText
    ])
    return <div>
        <div className={classes.groupingContainer} style={{ width: '100%', }}>
            <span className={classes.summaryTitle}>{field.label}</span>
            <Select options={['Not started',"Deficient", "Complete"]} onChange={handleTristateChange} value={value.value.status} disabled={!!value.value.notes} />
            <textarea className={textAreaClasses} onChange={handleNotesChange} value={value.value.notes}></textarea>
        </div>
    </div>
}