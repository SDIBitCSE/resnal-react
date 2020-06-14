import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row.marks);
  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledTableCell align="left">{row.name}</StyledTableCell>
        <StyledTableCell align="left">{row.usn}</StyledTableCell>
        <StyledTableCell align="left">{row.section}</StyledTableCell>
        <StyledTableCell align="left">{row.sem}</StyledTableCell>
        <StyledTableCell align="left">{row.gpa}</StyledTableCell>
        <StyledTableCell align="left">{row.totalFCD}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Semester Marks
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Subject Name</StyledTableCell>
                    <StyledTableCell align="left">Subject Code</StyledTableCell>
                    <StyledTableCell align="left">
                      Internal Marks
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      External Marks
                    </StyledTableCell>
                    <StyledTableCell align="left">Total Marks</StyledTableCell>

                    <StyledTableCell align="left">&nbsp;Grade</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.marks.map((mark: any) => (
                    <StyledTableRow key={mark.subjectCode}>
                      <StyledTableCell align="left">
                        {mark.subjectName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {mark.subjectCode}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {mark.internalMarks}
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        {mark.externalMarks}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {mark.totalMarks}
                      </StyledTableCell>
                      <StyledTableCell align="left">{mark.fcd}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export interface StudentTableProps {
  data: any;
}

const StudentTable: React.SFC<StudentTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">USN</StyledTableCell>
            <StyledTableCell align="left">Section</StyledTableCell>
            <StyledTableCell align="left">Semester</StyledTableCell>
            <StyledTableCell align="left">GPA</StyledTableCell>
            <StyledTableCell align="left">Overall Grade</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.student.map((row: any) => (
            <Row key={row.usn} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
