import taskNavStyles from './taskNav.styles';
import clsx from 'clsx';

export default ({tabName, tabIndex, currentTabIndex, setCurrentTabIndex, depth}) => {
    const classes = taskNavStyles()
    const handleSetCurrentTabIndex = () => {
        setCurrentTabIndex(tabIndex)
    }

    const classNames=clsx([
        classes.sideBarTabItem,
        currentTabIndex === tabIndex && classes.activeTab,
    ])
    return <div onClick={handleSetCurrentTabIndex} className={classNames} >
        {tabName}
    </div>
}