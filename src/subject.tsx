import React, { useState } from "react";
import { Grid, Container, Card, CardContent } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TotalFCDTable from "./totalFCDTable";
import TotalFCDBar from "./totalFCDBar";
import TotalFCDPie from "./totalFCDPie";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
export interface SubjectProps {}
const GET_BATCH = gql`
  query getBatch(
    $batch: String!
    $sem: Int!
    $section: String
    $yearBack: Boolean!
    $backLog: Boolean!
  ) {
    batchResult(
      batch: $batch
      sem: $sem
      section: $section
      yearBack: $yearBack
      backLog: $backLog
    ) {
      usn
      name
      section
      gpa
      totalFCD
    }
  }
`;

const GET_BATCHES = gql`
  query getBatches {
    batches
  }
`;

const GET_SEMS = gql`
  query getSems($batch: String!) {
    sems(batch: $batch)
  }
`;

const GET_SUBS = gql`
  query getSubs($batch: String!, $sem: Int!) {
    subs(batch: $batch, sem: $sem) {
      subjectCode
      subjectName
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
}));

const Subject: React.SFC<SubjectProps> = () => {
  const { loading: Bloading, error, data: Bdata } = useQuery(GET_BATCHES);
  const [batch, setBatch] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [yearBack, setYearBack] = useState(true);
  const [backLog, setBackLog] = useState(false);
  const classes = useStyles();
  const [errors, setErrors] = useState({
    batch: false,
    sem: false,
    sub: false,
  });
  const [loadBatch, { called, loading, data }] = useLazyQuery(GET_BATCH, {
    variables: {
      batch,
      sem: Number.parseInt(sem),
      section: section === "" ? null : section,
      yearBack,
      backLog,
    },
  });
  const [
    loadSems,
    { called: sCalled, loading: sLoading, data: sData },
  ] = useLazyQuery(GET_SEMS, { variables: { batch } });
  const [
    loadSubs,
    { called: subCalled, loading: subLoading, data: subData },
  ] = useLazyQuery(GET_SUBS, {
    variables: { batch, sem: Number.parseInt(sem) },
  });

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
                <h2>Subjectwize Result</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (batch === "") setErrors({ ...errors, batch: true });
                    else if (sem === "") setErrors({ ...errors, sem: true });
                    else if (subject === "")
                      setErrors({ ...errors, sub: true });
                    else {
                      loadBatch();
                    }
                  }}
                >
                  <FormControl
                    className={classes.formControl}
                    error={errors.batch}
                  >
                    <InputLabel shrink style={{ color: "white" }}>
                      Batch
                    </InputLabel>
                    <Select
                      required
                      style={{ color: "white" }}
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={batch}
                      onChange={(e) => {
                        setBatch(e.target.value as string);
                        loadSems();
                        if (e.target.value === "")
                          setErrors({ ...errors, batch: true });
                        else setErrors({ ...errors, batch: false });
                      }}
                      displayEmpty
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      {Bloading && (
                        <MenuItem value="">
                          <em>Loading....</em>
                        </MenuItem>
                      )}
                      {!Bloading && (
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      )}
                      {!Bloading &&
                        Bdata.batches.map((batch: string) => (
                          <MenuItem key={batch} value={batch}>
                            {batch}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                      Select Batch(Required)
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    error={errors.sem}
                  >
                    <InputLabel shrink style={{ color: "white" }}>
                      Semester
                    </InputLabel>
                    <Select
                      required
                      style={{ color: "white" }}
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={sem}
                      onChange={(e) => {
                        setSem(e.target.value as string);
                        if (e.target.value === "")
                          setErrors({ ...errors, sem: true });
                        else setErrors({ ...errors, sem: false });
                        loadSubs();
                      }}
                      displayEmpty
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      {!sCalled && (
                        <MenuItem value="">
                          <em>Select Batch</em>
                        </MenuItem>
                      )}
                      {sLoading && sCalled && (
                        <MenuItem value="">
                          <em>Loading....</em>
                        </MenuItem>
                      )}
                      {!sLoading && sCalled && (
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      )}
                      {!sLoading &&
                        sCalled &&
                        sData.sems.map((sem: string) => (
                          <MenuItem key={sem} value={sem}>
                            {sem}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                      Select Semester(Required)
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink style={{ color: "white" }}>
                      Section
                    </InputLabel>
                    <Select
                      required
                      style={{ color: "white" }}
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={section}
                      onChange={(e) => setSection(e.target.value as string)}
                      displayEmpty
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                      Select Section(Optional)
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    error={errors.sub}
                  >
                    <InputLabel shrink style={{ color: "white" }}>
                      Subject
                    </InputLabel>
                    <Select
                      required
                      style={{ color: "white" }}
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value as string);
                        if (e.target.value === "")
                          setErrors({ ...errors, sub: true });
                        else setErrors({ ...errors, sub: false });
                      }}
                      displayEmpty
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      {!subCalled && (
                        <MenuItem value="">
                          <em>Select Batch and Sem</em>
                        </MenuItem>
                      )}
                      {subLoading && subCalled && (
                        <MenuItem value="">
                          <em>Loading....</em>
                        </MenuItem>
                      )}
                      {!subLoading && subCalled && (
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      )}
                      {!subLoading &&
                        subCalled &&
                        subData.subs.map((sub: any) => (
                          <MenuItem
                            key={sub.subjectCode}
                            value={sub.subjectCode}
                          >
                            {sub.subjectCode}-{sub.subjectName}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                      Select Semester(Required)
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <FormControlLabel
                    labelPlacement="start"
                    label="Show Yearback"
                    control={
                      <Switch
                        checked={yearBack}
                        onChange={() => setYearBack(!yearBack)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                  />
                  <FormControlLabel
                    labelPlacement="start"
                    label="Backlog Only"
                    control={
                      <Switch
                        checked={backLog}
                        onChange={() => setBackLog(!backLog)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                  />
                  <br />
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </Button>
                </form>
              </CardContent>
            </Card>
            {called && !loading && (
              <TotalFCDTable raw_data={data.batchResult} />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          {called && !loading && <TotalFCDBar data={data} />}
          {called && !loading && <TotalFCDPie data={data} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Subject;
