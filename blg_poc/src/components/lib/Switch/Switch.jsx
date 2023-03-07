import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const SwitchButton = ({
    onChange,
    checked,
    name,
    setValue
}, props) => {

    const IOSSwitch = withStyles((theme) => ({
        root: {
            width: 36,
            height: 21,
            padding: 0,
            // margin: theme.spacing(1),
            marginRight: 10
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(15px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#0c8ce9',
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#0c8ce9',
                //border: '6px solid #fff',
            },
        },
        thumb: {
            width: 15,
            height: 15,
            transform: 'translateY(2px)',
            marginLeft: '2px',

        },
        track: {
            borderRadius: 21 / 2,
            border: 'none',
            backgroundColor: theme.palette.grey[400],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }))(({ classes, ...props }) => {
        return (
            <Switch
                name={name}
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                onChange={onChange}
                checked={checked}
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                }}
            />
        );
    });

    return (
        <IOSSwitch onChange={onChange} name={name} checked={checked} />
    )
}

export default SwitchButton