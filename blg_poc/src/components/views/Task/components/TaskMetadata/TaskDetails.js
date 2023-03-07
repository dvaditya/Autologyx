import React from 'react';
import taskDetailsStyles from './taskDetails.styles';
import { date } from '../../../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Popover, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { ReactComponent as FormIcon } from '../../../../../img/FormIcon.svg'
import { ReactComponent as FileIcon } from '../../../../../img/fileIcon.svg'

const TaskDetails = ({ task }) => {
  const classes = taskDetailsStyles();
  const [popoverActive, setPopoverActive] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOnCLick = (e) => {
    setAnchorEl(e.target);
    setPopoverActive(!popoverActive); 
  }
  const handleClose = () => {
    setAnchorEl(null);
    setPopoverActive(false)
  };
  const id = popoverActive ? 'simple-popover' : undefined;
  const popOverContent = (
    <React.Fragment>
      <div className={classes.popOverContentContainer}>
        <div className={classes.keyHeader}><h3>Folder navbar Key</h3></div>
          <div className={classes.popoverItem}>
            <span style={{color: 'grey'}}>*</span> = Documents in subfolders
            <div className={classes.popoverItemSubText}>The grey * shows there will be documents in subfolders to the folder with the * attached</div>
          </div>
          <div className={classes.popoverItem}>
            <span style={{color: 'rgb(3, 212, 3)'}}>*</span> = Documents in folder
            <div className={classes.popoverItemSubText}>The green * shows there are documents in the current folder. Note: you can view documents in different folders and stay on the same form.</div>
          </div>
        <div className={classes.popoverItem}>
          <span><FormIcon /></span> = Has form
          <div className={classes.popoverItemSubText}>Click on the form icon to view the form attached to the folder.</div>
        </div>
        <div className={classes.popoverItem}>
          <span><FileIcon /></span> = View Documents
          <div className={classes.popoverItemSubText}>Click the file icon to navigate to that folders documents. Note: you can keep any form open and navigate to any different folders documents.</div>
        </div>
        <div className={classes.popoverItem} style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex'}}><FileIcon className={classes.selectedFileIconExample} />  = Viewing this folders documents</div>
          <div className={classes.popoverItemSubText}>The highlighted file icon indicates the folder for which documents are currently being viewed.</div>
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <div className={classes.detailsWrapper}>
      <div className={classes.details}>
        <div style={{width: '20%'}}  className={classes.title}>
          {/* <span style={{paddingLeft: '20px', }}>{task.field_name}</span> */}
          <div className={classes.infoIcon} onClick={handleOnCLick}>
            <FontAwesomeIcon 
              style={{fontSize: '20px'}} 
              color='#0c8ce9' 
              icon={faInfoCircle} 
              
            />
            <Popover 
              open={popoverActive} 
              anchorEl={anchorEl}
              onClose={handleClose}
              elevation={8}
              id={id}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              {popOverContent}
            </Popover>
          </div>
        </div>
        <p className={classes.detail}>
          <span className={classes.detailTitle}>Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={classes.detailValue}>{task?.field_module_status}</span>
        </p>
        <p className={classes.detail}>
          <span className={classes.detailTitle}>Updated By:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <div className={classes.detailValue}>
            <p className={classes.email}>{task?.field_updated_by}</p>
          </div>
        </p>
        <p className={classes.detail}>
          <span className={classes.detailTitle}>Last updated:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p className={classes.detailValue}>{date.getDate(task.field_last_updated, false, 'MM')}</p>
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;