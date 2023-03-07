import React from 'react';
import { faChevronDown, faChevronRight, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TabItem from "./TabItem"
import taskNavStyles from './taskNav.styles';
import { ReactComponent as FormIcon } from '../../../../../img/FormIcon.svg'
import { ReactComponent as FileIcon } from '../../../../../img/fileIcon.svg'
import { Tooltip } from '@material-ui/core';

const R = require("ramda")

const getForm = (path, structure) => {
    if (path.length === 0) {
        return null
    }
    else if (path.length === 1) {
        return structure.form
    } else {
        const newPath = R.drop(1, path)
        const newTarget = R.head(newPath)
        const newStructure = R.find(R.propEq('moduleName', newTarget), structure.subfolders)
        return getForm(newPath, newStructure)
    }
}

const NavItem = ({ navMeta, currentPath, setCurrentPath, currentDocumentsPath, setCurrentDocumentsPath, currentTabIndex, setCurrentTabIndex }) => {
    const [showChildren, setShowChildren] = useState(false)
    const classes = taskNavStyles()
    const toggleShowChildren = () => {
        setShowChildren(!showChildren)
    }

    const handleSetCurrentPath = () => {
        setCurrentPath(navMeta.path)
    }
    const handleSetCurrentDocumentsPath = () => {
        setCurrentDocumentsPath(navMeta.path)
    }
    const isCurrentPath = R.equals(currentPath, navMeta.path)

    const config = useSelector((state) => state.currentTask.config)

    const documents = useSelector(state => state.currentTaskDocuments.taskDocuments)

    const hasDocs = useMemo(() => R.any((doc) => { return R.equals(doc.field_document_path.path, navMeta.path) }, documents), [documents])

    const inPath = useMemo(() => R.any((doc) => { return R.startsWith(navMeta.path, doc.field_document_path.path) }, documents), [documents])

    const filteredSubfolders = useMemo(() => {
        if (!navMeta.hideUnusedSubfolders) {
            return navMeta.subTabs
        } else {
            const lastUsedIndex = R.findLastIndex((subTab) => {
                return R.any((doc) => { return R.equals(doc.field_document_path.path, subTab.path) }, documents)
            }, navMeta.subTabs)
            return R.take(lastUsedIndex + 2, navMeta.subTabs)
        }
    }, [documents])

    const tabItems = () => {
        if (!isCurrentPath) {
            return null
        }
        const form = config.forms[getForm(currentPath, config.structure)]
        const tabNames = form.tabs.map((tab) => {
            return tab.label
        })
        if (tabNames.length <= 1) {
            return null
        }
        return tabNames.map((tabName, i) => {
            return <TabItem depth={navMeta.path.length - 1} key={tabName} tabName={tabName} tabIndex={i} currentDocumentsPath={currentDocumentsPath} setCurrentDocumentsPath={setCurrentDocumentsPath} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} />
        })

    }

    // console.log(navMeta)

    return <div style={{ borderTop: '1.5px solid rgb(211, 222, 231)' }}>
        <div
            key={navMeta.label}
            onClick={() => true}
            className={clsx([
                classes.sideBarItem,
                isCurrentPath && classes.active,
            ])}
        >
            <div style={{
                marginLeft: `${(navMeta.path.length - 1) * 10}px`,
                display: 'flex',
                alignItems:'center',
                fontSize: '14px',
            }}>
                {!!navMeta.subTabs.length ?
                    <div style={{ marginRight: '15px', fontSize: '12px' }}>
                        <button className={classes.iconButton} onClick={toggleShowChildren}>
                            <FontAwesomeIcon icon={showChildren ? faChevronDown : faChevronRight} />
                        </button>
                    </div> : <div style={{ minWidth: '20px' }}></div>
                }
                <div className={`${ isCurrentPath ? classes.activeText : null}`}>{navMeta.label}</div> 
                <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: 'auto' }} >
                    {navMeta.hasForm &&
                        <Tooltip arrow title='Click to view form' >
                            <button className={classes.iconButton} style={{display: 'flex', marginTop: '3px',}}  onClick={handleSetCurrentPath}><FormIcon /></button>
                        </Tooltip>
                    }
                    {navMeta.maxFiles > 0 ?
                        <div>
                            <Tooltip arrow className={'tooltip'} title='Click to view docs'>
                                <button style={{display: 'flex', marginTop: '3px',}} className={`${classes.iconButton} ${currentDocumentsPath === navMeta.path ? classes.currentPath : null}`} onClick={handleSetCurrentDocumentsPath}><FileIcon /></button>
                            </Tooltip>
                        </div> : <div style={{minWidth: '23px'}}></div>}
                        {(hasDocs || inPath) ? <span style={hasDocs && inPath ? {color: '#03d403', fontWeight: '700'} : {color:'grey', fontWeight: '700'}}>*</span> : <span style={{minWidth:'7px'}}></span>}
                </div>
            </div>
        </div>
        {
            //tabItems()
        }
        {
            showChildren && filteredSubfolders.map((subTab) => {
                return <NavItem key={subTab.label} navMeta={subTab} currentPath={currentPath} setCurrentPath={setCurrentPath} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} currentDocumentsPath={currentDocumentsPath} setCurrentDocumentsPath={setCurrentDocumentsPath} />
            })
        }
    </div>
};

export default NavItem