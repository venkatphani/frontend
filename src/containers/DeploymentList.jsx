import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  margin: {
    marginTop: 100,
  },
});

const DeploymentList = (props) => {
  const { getAllDeployments, deleteDeployment, deployments } = props;

  const classes = useStyles();

  useEffect(() => {
    getAllDeployments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer className={classes.margin} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Template Name</TableCell>
              <TableCell align="center">Version</TableCell>
              <TableCell align="center">Url</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((row) => (
              <TableRow key={row.templateName}>
                <TableCell align="center" component="th" scope="row">
                  {row.templateName}
                </TableCell>
                <TableCell align="center">{row.version}</TableCell>
                <TableCell align="center">
                  <a href={row.url} rel="noreferrer noopener" target="_blank">
                    Click Here
                  </a>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={(e) => deleteDeployment(row._id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

DeploymentList.propTypes = {
  getAllDeployments: PropTypes.func.isRequired,
  deleteDeployment: PropTypes.func.isRequired,
  deployments: PropTypes.array.isRequired,
};

export default DeploymentList;
