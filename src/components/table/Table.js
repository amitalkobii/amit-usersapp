import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { useHistory } from "react-router-dom";

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@mui/material/Button';
import './Table.css';

export default function Table({ columns, data }) {
    const history = useHistory();

    const handleOnClick = (i) => {
        let index = pageIndex === 0 ? i : (i+1)*pageIndex*10;
        const username = data[index].login.username;
        history.push({
            pathname: `/user/${username}`, 
            state: {data: data[index]}});
    }

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
    state: { pageIndex },
  } = useTable({
    columns,
    data
  },
  useSortBy,
  usePagination,
  );

  const renderTableHead= () => {
      return(
        <TableHead>
        {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <TableCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                    column.isSorted
                    ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                    : ""
                }
                >
                {column.render("Header")}
                </TableCell>
            ))}
        </TableRow>
        ))}
    </TableHead>
      )
  }

  const renderTableBody = () => {
      return (
        <TableBody {...getTableBodyProps()}>
        {page.map((row, i) => {
        prepareRow(row);
        return (
            <TableRow {...row.getRowProps()} onClick={() => handleOnClick(i)}>
            {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")} 
                        </TableCell>;
            })}
            </TableRow>
        );
        })}
        </TableBody>
      )
  }


  const renderPagination = () => {
      return (
        <div>
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
            </Button>{' '}
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
            </Button>{' '}
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
            </Button>{' '}
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </Button>{' '}
            <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>{' '}
         </div>
      )
  }

  return (
      <>
      <h1 className="allusers-title">All Users</h1>
        <MaUTable {...getTableProps()}>
            {renderTableHead()}
            {renderTableBody()}
        </MaUTable>
        {renderPagination()}
    </>
  );

}