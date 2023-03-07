import React from 'react';
import { debounce } from 'throttle-debounce';
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  usePagination,
  useSortBy,
} from 'react-table';
import tableStyles from './table.styles';
import Select from '../Select';
import TextInput from '../TextInput';

import { ReactComponent as FirstPageIcon } from 'img/first-page.svg';
import { ReactComponent as PreviousPageIcon } from 'img/previous-page.svg';
import { ReactComponent as NextPageIcon } from 'img/next-page.svg';
import { ReactComponent as LastPageIcon } from 'img/last-page.svg';
import { ReactComponent as ArrowDownSmall } from 'img/arrow-down-small.svg';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';

const Table = ({
  data,
  columns,
  controlledPageCount,
  fetchData,
  sortBy,
  sort,
  total,
  updateTable,
  searchQuery,
  search,
  onSelect,
  withPagination,
  withResizeColumns,
  withSorting,
  // callback to calc if item is selected.
  isSelected,
}) => {
  const classes = tableStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      //   defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    usePagination
  );

  // Handles debounce.
  const [value, setValue] = React.useState('');
  const throttled = React.useRef(
    debounce(1500, val => {
      search(val);
    })
  );
  React.useEffect(() => throttled.current(value), [value]);

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, searchQuery });
  }, [fetchData, pageIndex, pageSize, sortBy, searchQuery, updateTable]);

  return (
    <>
      {withPagination && (
        <>
          <div className={classes.total}>
            {total !== null ? total : '-'} results
          </div>
          <Tooltip arrow placement="right" title='To search, start typing in the search box and the list will filter automatically based on the search term you enter'>
            <div style={{padding: '10px 10px 10px 2px', display: 'flex', width: 'fit-content'}}>
              <FontAwesomeIcon size='14px' color='#0c8ce9' icon={faInfoCircle}></FontAwesomeIcon>
            </div>
          </Tooltip>
          <div className="table-toolbar">
            <div>
              <TextInput
                value={value}
                setValue={({ target }) => setValue(target.value)}
                placeholder='Search...'
              />
            </div>
            <div className="right">
              <div className={classes.flexy}>
                <button
                  className="table-pagination"
                  disabled={!canPreviousPage}
                  onClick={() => gotoPage(0)}
                >
                  <FirstPageIcon />
                </button>
                <button
                  className="table-pagination"
                  disabled={!canPreviousPage}
                  onClick={previousPage}
                >
                  <PreviousPageIcon />
                </button>
                <button
                  className="table-pagination"
                  disabled={!canNextPage}
                  onClick={nextPage}
                >
                  <NextPageIcon />
                </button>
                <button
                  className="table-pagination"
                  disabled={!canNextPage}
                  onClick={() => gotoPage(pageCount - 1)}
                >
                  <LastPageIcon />
                </button>
                <div className={classes.pageCount}>
                  Page {pageIndex + 1} / {pageOptions.length}
                </div>
                <div className={`${classes.flexy} ${classes.perPage}`}>
                  <span className={classes.perPageLabel}>Per page:</span>
                  <Select
                    className={classes.select}
                    onChange={({ target }) => setPageSize(target.value)}
                    value={pageSize}
                    options={[10, 20, 50]}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={classes.tableWrapper}>
        <div {...getTableProps()} className={classes.table}>
          <div>
            {headerGroups.map(headerGroup => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup}
                className={classes.tr}
              >
                {headerGroup.headers.map(column => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.key}
                    className={clsx([
                      classes.th,
                      !withSorting && classes.notClickable,
                    ])}
                  >
                    <div
                      onClick={() => {
                        withSorting && sort(column.id);
                      }}
                      className={classes.thOrderWrapper}
                    >
                      {column.render('Header')}
                      {withSorting && (
                        <div className={classes.ordering}>
                          <ArrowDownSmall
                            className={`${classes.topOrder} ${
                              column.isSorted && !column.isSortedDesc
                                ? classes.activeOrdering
                                : ''
                            }`}
                          />

                          <ArrowDownSmall
                            className={
                              column.isSorted && column.isSortedDesc
                                ? classes.activeOrdering
                                : ''
                            }
                          />
                        </div>
                      )}
                    </div>

                    {withResizeColumns && (
                      <div
                        {...column.getResizerProps()}
                        className={`${classes.resizer} ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className="tbody">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <div key={i.toString()}>
                  <div
                    {...row.getRowProps()}
                    className={`${classes.tr} ${
                      isSelected(row.id) ? classes.activeTr : ''
                    }`}
                    onClick={() => {
                      onSelect(row.id);
                    }}
                  >
                    {row.cells.map(cell => {
                      return (
                        <div {...cell.getCellProps()} className={classes.td}>
                          {cell.render('Cell')}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

Table.defaultProps = {
  columns: [],
  data: {},
  withPagination: true,
  withResizeColumns: true,
  withSorting: true,
  onSelect: () => true,
  isSelected: () => false,
};

export default Table;
