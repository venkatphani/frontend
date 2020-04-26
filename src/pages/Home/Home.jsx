import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import CreateDeployment from "../../containers/CreateDeployment";
import DeploymentList from "../../containers/DeploymentList";
import { createDeployment, getAllDeployments, deleteDeployment } from "../../actions/deploymentActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class Home extends PureComponent {
  render() {
    const {
      deployments,
      createDeployment: createDeploymentAction,
      getAllDeployments: getAllDeploymentsAction,
      deleteDeployment: deleteDeploymentAction,
      errors,
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid xs={12} item>
            <CreateDeployment createDeployment={createDeploymentAction} errors={errors} />
          </Grid>
          <Grid container xs={8} item>
            <DeploymentList deployments={deployments} getAllDeployments={getAllDeploymentsAction} deleteDeployment={deleteDeploymentAction} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { deployments, errors } = state.deployment;
  return { deployments, errors };
};

Home.propTypes = {
  deployments: PropTypes.array.isRequired,
  createDeployment: PropTypes.func.isRequired,
  getAllDeployments: PropTypes.func.isRequired,
  deleteDeployment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, { createDeployment, getAllDeployments, deleteDeployment })(Home));
