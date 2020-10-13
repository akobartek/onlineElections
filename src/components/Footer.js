import React from "react";
import { Typography, Link } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topSpacing: {
    paddingTop: theme.spacing(1),
  },
  footer: {
    height: "12vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

function MadeFor() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Wykonano dla "}
      <Link color="inherit" target="_blank" href="https://mftau.pl/">
        wspólnoty MF Tau
      </Link>
      {"."}
    </Typography>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        href="https://www.linkedin.com/in/bart%C5%82omiej-soko%C5%82owski-070943106/"
      >
        Bartłomiej Sokołowski
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div>
        <MadeFor />
      </div>
      <div className={classes.topSpacing}>
        <Copyright />
      </div>
    </footer>
  );
}
