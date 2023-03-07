import formStyles from "./form.styles"

export default ({field}) => {
    const classes = formStyles()
    return <div className={classes.sectionHeader}>{field.label}</div>
}