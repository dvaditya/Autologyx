import formStyles from "./form.styles"
import Select from "components/lib/Select/SelectTile"

export default ({ field, value, onChange }) => {
    const classes = formStyles()

    const handleSelectChange = (e) => {
        onChange({
            ...value,
            value: e.target.value
        })
    }

    return <div>
        <div>
            <div style={{ width: '100%', }}>
                <span className={classes.summaryTitle}>{field.label}</span>
                <Select options={field.options} emptyOption={true} onChange={handleSelectChange} value={value.value}/>
            </div>
        </div>
    </div>
}