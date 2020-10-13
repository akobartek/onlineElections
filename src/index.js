import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Elections from "./components/Elections";
import Results from "./components/Results";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import "./index.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  mainView: {
    minHeight: "88vh",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    justifyContent: "center",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.mainView}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route path="/" exact component={Main} />
            <Route path="/elections/:code" component={Elections} />
            <Route path="/results/:code" component={Results} />
          </BrowserRouter>
        </div>
        <Footer />
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
