export const get_build = () => {
    if(process.env.NODE_ENV === 'development') {
        return new URL(process.env.REACT_APP_ALX_INSTANCE).host.split(".")[0]
    } else {
        return window.location.host.split(".")[0]
    }
}

export const get_build_prefix = () => {
    const build = get_build()
    const parts = build.split("-")
    if(parts.length > 1) {
        return `${parts[0]}-`
    } else {
        return ""
    }
}