import React from 'react';
import { connect } from 'react-redux';
import {
  getAudits as getRecords,
  sortAudits as sortRecords,
  searchAudits as searchRecords,
  resetAuditsTable as resetTable,
  editAudit as editRecord,
  selectAudit,
  openSidebar,
  deselectAudit,
} from 'store/actions/auditActions';
import { TableWrapper } from 'components/lib/Table';
import { useTable } from './hooks';
import tableStyles from './table.styles';
import { Launch as LaunchIcon } from '@material-ui/icons';

const AuditTable = ({
  selectAudit,
  openSidebar,
  deselectAudit,
  selectedID,
  getDocumentTemplates,
  ...rest
}) => {
  const { redirectToId } = useTable()
  const classes = tableStyles()


  const tableWrapperProps = {
    onButtonClick: redirectToId,
    selectedID,
    widgetMap: {},
    ...rest,
  };

  return <TableWrapper {...tableWrapperProps} />;
};

const mapStateToProps = ({
  audits: {
    records,
    currentAudit,
    columnOptions,
    pageCount,
    sortBy,
    total,
    searchQuery,
    showAuditDetail,
    open,
  },
}) => {
  return {
    records,
    selectedID:
      currentAudit === null || !open || showAuditDetail
        ? null
        : currentAudit.id,
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
  selectAudit,
  openSidebar,
  editRecord,
  searchRecords,
  resetTable,
  deselectAudit,
})(AuditTable);
