import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select, TextField, Button, MenuItem, InputLabel, FormControl, makeStyles } from "@material-ui/core";
import config from "../config";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const CreateDeployment = (props) => {
  const classes = useStyles();
  const [templateName, setTemplateName] = useState("");
  const [version, setVersion] = useState("");
  const [url, setUrl] = useState("");
  const [selectedVersions, setSelectedVersions] = useState([]);
  const { createDeployment, errors } = props;

  const onTemplateChange = (e) => {
    setTemplateName(e.target.value);
    setSelectedVersions(config.seedData.find((x) => x.name === e.target.value).versions);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    createDeployment(templateName, version, url);
    setTemplateName("");
    setVersion("");
    setUrl("");
  };

  return (
    <>
      <form className={classes.root} onSubmit={onFormSubmit}>
        <FormControl required className={classes.formControl}>
          <InputLabel id="templateName">Template Name</InputLabel>
          <Select value={templateName} labelId="templateName" onChange={onTemplateChange}>
            {config.seedData.map((x) => {
              return (
                <MenuItem key={x.name} value={x.name}>
                  {x.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div>
          <FormControl required className={classes.formControl}>
            <InputLabel id="version">Version</InputLabel>
            <Select value={version} labelId="version" onChange={(e) => setVersion(e.target.value)}>
              {selectedVersions.map((x) => {
                return (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl required className={classes.formControl}>
            <TextField required type="url" value={url} label="Url" onChange={(e) => setUrl(e.target.value)} />
          </FormControl>
        </div>
        {errors &&
          Object.keys(errors).map((error) => {
            return <div key={error}>{errors[error]}</div>;
          })}
        <div>
          <Button variant="contained" color="primary" disabled={!version || !templateName || !url} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

CreateDeployment.propTypes = {
  createDeployment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CreateDeployment;
