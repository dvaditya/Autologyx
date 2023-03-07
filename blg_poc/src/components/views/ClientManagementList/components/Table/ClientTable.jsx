import React from 'react';
import { connect } from 'react-redux';
import {
  getMatters as getRecords,
  sortMatters as sortRecords,
  searchMatters as searchRecords,
  resetMattersTable as resetTable,
  editMatter as editRecord,
  selectMatter,
  openSidebar,
  deselectMatter,
} from 'store/actions/clientActions';
import { TableWrapper } from 'components/lib/Table';
import { useTable } from './hooks';
import tableStyles from './table.styles';
import { Launch as LaunchIcon } from '@material-ui/icons';

const MatterTable = ({
  selectMatter,
  openSidebar,
  deselectMatter,
  selectedID,
  getDocumentTemplates,
  setClientContactsModalClient,
  ...rest
}) => {
  const { redirectToId } = useTable()
  const classes = tableStyles()
  const manageContacts = (col, record) => {
      return <button
      className={classes.openButton}
      onClick={e => {
        e.stopPropagation();
        // set client contacts open for selected id
        // get and set client contacts
        setClientContactsModalClient(record)
      }}
    >
      <LaunchIcon className={classes.openButtonIcon} />
      <div className={classes.viewButtonText}>CONTACTS</div>
  </button>
  }

  const tableWrapperProps = {
    onButtonClick: redirectToId,
    selectedID,
    widgetMap: {manageContacts},
    ...rest,
  };

  return <TableWrapper {...tableWrapperProps} />;
};

const mapStateToProps = ({
  matters: {
    records,
    currentMatter,
    columnOptions,
    pageCount,
    sortBy,
    total,
    searchQuery,
    showMatterDetail,
    open,
  },
}) => {
  return {
    records,
    selectedID:
      currentMatter === null || !open || showMatterDetail
        ? null
        : currentMatter.id,
    columnOptions,
    pageCount,
    sortBy,
    total,
    searchQuery,
  };
};

export default connect(mapStateToProps, {
  getRecords,
  sortRecords,
  selectMatter,
  openSidebar,
  editRecord,
  searchRecords,
  resetTable,
  deselectMatter,
})(MatterTable);
