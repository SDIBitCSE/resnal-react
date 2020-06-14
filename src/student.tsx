import React, { useState } from "react";
import { Grid, Container, Card, CardContent } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import StudentTable from "./studentTable";
import StudentLine from "./studentLine";
export interface StudentProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

const GET_STUDENT = gql`
  query getStudent($usn: String!) {
    student(usn: $usn) {
      usn
      name
      section
      sem
      gpa
      totalFCD
      marks {
        subjectCode
        subjectName
        internalMarks
        externalMarks
        totalMarks
        fcd
      }
    }
  }
`;

const Student: React.SFC<StudentProps> = () => {
  const classes = useStyles();
  const [usn, setUSN] = useState<string>();
  const [loadStudent, { called, loading, data }] = useLazyQuery(GET_STUDENT, {
    variables: { usn },
  });
  if (called && !loading) console.log(data);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Container maxWidth="sm">
            <Card
              style={{
                backgroundColor: "#333",
                color: "white",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <CardContent>
                <h2>Student Profile</h2>
                <form
                  className={classes.root}
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    loadStudent();
                  }}
                >
                  <TextField
                    style={{ background: "white" }}
                    required
                    id="outlined-basic"
                    label="Enter USN"
                    fullWidth
                    value={usn}
                    onChange={(e) => setUSN(e.target.value as string)}
                    variant="filled"
                  />
                  <Button
                    style={{ marginTop: "20px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          {called && loading && <CircularProgress />}
          {called && !loading && (
            <div style={{ paddingTop: "20px" }}>
              <StudentLine raw_data={data} />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          {called && loading && <CircularProgress />}
          {called && !loading && <StudentTable data={data} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Student;
