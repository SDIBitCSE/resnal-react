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

export interface BatchProps {}
const GET_BATCH = gql`
  query getBatch(
    $batch: String!
    $sem: Int!
    $section: String!
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

const Batch: React.SFC<BatchProps> = () => {
  const { loading: Bloading, error, data: Bdata } = useQuery(GET_BATCHES);
  const [batch, setBatch] = useState<string>("");
  const [sem, setSem] = useState<number>();
  const [section, setSection] = useState<string>();
  const [yearBack, setYearBack] = useState(false);
  const [backLog, setBackLog] = useState(false);
  const classes = useStyles();
  const [loadBatch, { called, loading, data }] = useLazyQuery(GET_BATCH, {
    variables: { batch, sem, section, yearBack, backLog },
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
              }}
            >
              <CardContent>
                <h2>Batchwize Result</h2>
                <form>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink style={{ color: "white" }}>
                      Batch
                    </InputLabel>
                    <Select
                      required
                      style={{ color: "white" }}
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value as string)}
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
                          <MenuItem value={batch}>{batch}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: "white" }}>
                      Select Batch
                    </FormHelperText>
                  </FormControl>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          <h1>Chart</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default Batch;
