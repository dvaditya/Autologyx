import React, { memo } from 'react';
import {
  Table,
  InlineEdit,
  Select,
  Monetary,
  InlineEditTextArea,
  Input,
  Textarea,
} from 'components/lib';
import fieldTypes from 'consts/fieldTypes';
import { Launch as LaunchIcon } from '@material-ui/icons';
import dateFormatter from 'functions/dateFormatter';
import tableWrapperStyles from './tableWrapper.styles';

const TableWrapper = ({
  records,
  selectedID,
  columnOptions,
  pageCount,
  sortBy,
  total,
  searchQuery,
  onButtonClick,
  withPagination,
  withSorting,
  withResizeColumns,
  widgetMap,

  // Actions
  getRecords,
  sortRecords,
  resetTable,
  searchRecords,
  editRecord,
  handleSelect,
}) => {
  const classes = tableWrapperStyles();

  // Reset the records table config in the store
  React.useEffect(() => resetTable, []);

  // Data to be passed to table component
  const data = React.useMemo(() => {
    return records.map(record => {
      return columnOptions.reduce((row, col) => {
        return { ...row, [col.key]: renderCell(col, record) };
      }, {});
    });

    // Renders the cell specific to type
    function renderCell(col, record) {
      const { type = 'text', editable = false } = col;
      switch (type) {
        case 'custom':
          return renderRecordCells(col, record);
        case 'date':
          return dateFormatter(record[col.key]);
        default:
          if (editable) {
            switch (editable.type) {
              case fieldTypes.SELECT: {
                return (
                  <Select
                    value={record[col.key]}
                    options={editable.options}
                    onClick={e => e.stopPropagation()}
                    onChange={({ target }) =>
                      editRecord(record.id, { [col.key]: target.value })
                    }
                  />
                );
              }
              case fieldTypes.TEXTAREA: {
                return (
                  <InlineEditTextArea
                    value={record[col.key]}
                    table={true}
                    onChange={value =>
                      editRecord(record.id, { [col.key]: value })
                    }
                  />
                );
              }
              case fieldTypes.CURRENCY: {
                return (
                  <InlineEdit
                    text={record[col.key]}
                    type="number"
                    renderText={text => <Monetary int={text} />}
                    onSetText={value =>
                      editRecord(record.id, { [col.key]: value })
                    }
                  />
                );
              }
              case fieldTypes.TEXT: {
                return (
                  <div
                    className={classes.input}
                    style={{ width: '100%', marginRight: 0 }}
                  >
                    <Input
                      isFormikField={true}
                      name={`${col.key}.${record[col.key]}`}
                      disabled={col.isDisabled}
                    />
                  </div>
                );
              }
              case fieldTypes.TEXT_AREA: {
                return (
                  <div
                    className={classes.input}
                    style={{ width: '100%', marginRight: 0 }}
                  >
                    <Textarea
                      isFormikField={true}
                      classNames={classes.textarea}
                      name={`${col.key}.${record[col.key]}`}
                    />
                  </div>
                );
              }
              default: {
                return (
                  <InlineEdit
                    text={record[col.key]}
                    onSetText={value =>
                      editRecord(record.id, { [col.key]: value })
                    }
                  />
                );
              }
            }
          } else {
            return <span>{record[col.key]}</span>;
          }
      }
    }

    // Renders record specific content - e.g. action, etc .
    function renderRecordCells(col, record) {
      if (col.key === 'selectRecord') {
          return (
            <button
              className={classes.openButton}
              onClick={e => {
                e.stopPropagation();
                onButtonClick(record.id);
              }}
            >
              <LaunchIcon className={classes.openButtonIcon} />
              <div className={classes.viewButtonText}>VIEW</div>
            </button>
          );
      } else if (widgetMap && widgetMap[col.key]) {
        try {
          return widgetMap[col.key](col, record)
        } catch(e) {
          console.log(e)
          return null
        }
        
      } else {
        return null
      }
    }
  });

  // Table header to be passed to table component
  const columns = columnOptions.map(({ key, label, width = 160 }) => {
    return {
      Header: label,
      accessor: key,
      width,
    };
  });

  // Extracted sort functionality
  const handleSort = col => {
    sortRecords({
      col,
      dir: sortBy.col === col && sortBy.dir === 'desc' ? 'asc' : 'desc',
    });
  };

  const calcSelected = React.useCallback(
    id => {
      return selectedID !== null && selectedID === id;
    },
    [selectedID]
  );

  return (
    <Table
      data={data}
      columns={columns}
      fetchData={getRecords}
      controlledPageCount={pageCount}
      sortBy={sortBy}
      sort={handleSort}
      search={searchRecords}
      searchQuery={searchQuery}
      total={total}
      onSelect={handleSelect}
      isSelected={calcSelected}
      {...{ withPagination, withSorting, withResizeColumns }}
    />
  );
};

TableWrapper.defaultProps = {
  records: [],
  columnOptions: [],
  withPagination: true,
  withSorting: true,
  withResizeColumns: true,
  getRecords: () => null,
  sortRecords: () => null,
  resetTable: () => null,
  searchRecords: () => null,
  editRecord: () => null,
  onButtonClick: () => null,
  handleSelect: () => null,
};

export default memo(TableWrapper);
