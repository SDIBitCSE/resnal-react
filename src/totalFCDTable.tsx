import React, { useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export interface TotalFCDTableProps {
  raw_data: any;
}

export interface Row {
  name: string;
  usn: string;
  section: string;
  gpa: number;
  totalFCD: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const TotalFCDTable: React.SFC<TotalFCDTableProps> = ({ raw_data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterName, setFilterName] = useState("");
  const [filterUSN, setFilterUSN] = useState("");
  const [filterSection, setFilterSection] = useState("None");
  const [filterGrade, setFilterGrade] = useState("None");
  const [data, setData] = useState([...raw_data]);
  const [doFilter, setDoFilter] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  if (doFilter) {
    let sec = filterSection === "None" ? "" : filterSection;
    let grade = filterGrade === "None" ? "" : filterGrade;
    var re1 = new RegExp(`^${filterName}.*`, "i");
    var re2 = new RegExp(`.*${filterUSN}.*`, "i");
    var re3 = new RegExp(`^${sec}.*`, "i");
    var re4 = new RegExp(`${grade}$`, "i");
    setData([
      ...raw_data.filter(
        (value: {
          name: string;
          usn: string;
          section: string;
          totalFCD: string;
        }) =>
          value.name.match(re1) &&
          value.usn.match(re2) &&
          value.section.match(re3) &&
          value.totalFCD.match(re4)
      ),
    ]);
    setDoFilter(false);
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">USN</StyledTableCell>
            <StyledTableCell align="left">Section</StyledTableCell>
            <StyledTableCell align="left">GPA</StyledTableCell>
            <StyledTableCell align="left">Overall Grade</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>
              {" "}
              <TextField
                id="filter"
                label="Filter"
                value={filterName}
                onChange={(e) => {
                  setFilterName(e.target.value);
                  setDoFilter(true);
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              {" "}
              <TextField
                id="filter"
                label="Filter"
                value={filterUSN}
                onChange={(e) => {
                  setFilterUSN(e.target.value);
                  setDoFilter(true);
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              {" "}
              <Select
                value={filterSection}
                onChange={(e) => {
                  setFilterSection(e.target.value as string);
                  setDoFilter(true);
                }}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
              </Select>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>
              {" "}
              <Select
                value={filterGrade}
                onChange={(e) => {
                  setFilterGrade(e.target.value as string);
                  setDoFilter(true);
                }}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"FCD"}>FCD</MenuItem>
                <MenuItem value={"FC"}>FC</MenuItem>
                <MenuItem value={"SC"}>SC</MenuItem>
                <MenuItem value={"P"}>P</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: Row) => (
              <StyledTableRow key={row.usn}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.usn}</StyledTableCell>
                <StyledTableCell align="left">{row.section}</StyledTableCell>
                <StyledTableCell align="left">{row.gpa}</StyledTableCell>
                <StyledTableCell align="left">{row.totalFCD}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TotalFCDTable;
