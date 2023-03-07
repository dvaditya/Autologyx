import React from 'react';
import claimDetailsStyles from './claimDetails.styles';
import { Fade } from '@material-ui/core';

import { date } from 'utils';

const ClaimDetails = ({ record }) => {
  const classes = claimDetailsStyles();

  return (
    <Fade in={true}>
      <>
        <div style={{ width: '100%' }}>
          <div className={classes.topBar}>
            <div
              className={classes.claimTitle}
            >{`${record.field_claimant_reference}-${record.field_claimant_id}`}</div>
            <div className={classes.metaDataWrapper}>
              <div>
                Status <b>{record.field_claim_status}</b>
              </div>
              {record ? (
                <div>
                  Created at <b>{date.getHumanReadable(record.created_at)}</b>
                </div>
              ) : null}
            </div>
          </div>
          <hr className={classes.hr} />
        </div>
        <div
          style={{
            padding: '1rem',
          }}
        >
          <div className={classes.claimItemContainer}>
            <div className={classes.claimItem}>
              <div className={classes.claimItemTitle}>Claimant ID</div>
              <div>{record.field_claimant_id}</div>
            </div>
            <div className={classes.claimItem}>
              <div className={classes.claimItemTitle}>Claimant Name</div>
              <div>{record.field_claimant_name}</div>
            </div>
            <div className={classes.claimItem}>
            <div className={classes.claimItemTitle}>Claimant Reference</div>
            <div>{record.field_claimant_reference}</div>
          </div>
          </div>
        </div>
      </>
    </Fade>
  );
};

export default ClaimDetails;
