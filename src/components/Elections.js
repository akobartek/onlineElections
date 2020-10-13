import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@material-ui/core/";
import firebase from "firebase/app";
import { firestore } from "../firebase";

export default class Elections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: null,
      currentRound: null,
      selectedCandidate: null,
      userCode: "",
    };
    this.linkElement = React.createRef();
    this.fetchDataFromFirestore = this.fetchDataFromFirestore.bind(this);
    this.selectCandidate = this.selectCandidate.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.confirmSelection = this.confirmSelection.bind(this);
  }

  fetchDataFromFirestore() {
    const docRef = firestore
      .collection("elections")
      .doc(this.props.match.params.code);
    docRef.get().then((doc) => {
      const data = doc.data();
      docRef
        .collection("rounds")
        .doc(data.activeRound)
        .get()
        .then((roundDoc) => {
          // for (let i = 0; i < 9; i++) {
          //   docRef.collection("rounds").add(roundDoc.data());
          // }
          this.setState({
            dbData: data,
            currentRound: roundDoc.data(),
          });
        });
    });
  }

  selectCandidate(position, bgColor) {
    if (bgColor === "") this.setState({ selectedCandidate: position });
    else this.setState({ selectedCandidate: null });
  }

  handleCodeChange(e) {
    this.setState({ userCode: e.target.value });
  }

  confirmSelection() {
    const userCode = this.state.userCode;
    if (this.state.selectedCandidate == null) {
      alert("Nie można zatwierdzić głosu bez wybrania kandydata!");
      return;
    } else if (userCode === "") {
      alert("Nie można zatwierdzić głosu bez podania swojego kodu!");
      return;
    }
    const docRef = firestore
      .collection("elections")
      .doc(this.props.match.params.code);
    docRef.get().then((doc) => {
      const data = doc.data();
      if (!data.voters.includes(userCode)) {
        alert(
          "Nie znaleziono podanego kodu na liście kodów umożliwiających głosowanie!"
        );
        return;
      }
      const roundRef = docRef.collection("rounds").doc(data.activeRound);
      roundRef.get().then((roundDoc) => {
        const roundData = roundDoc.data();
        if (roundData.votes.includes(userCode)) {
          alert("Oddano już głos używając podanego kodu!");
          return;
        }
        roundRef.update({
          voters: firebase.firestore.FieldValue.arrayUnion(userCode),
          votes: firebase.firestore.FieldValue.arrayUnion(
            this.state.currentRound.candidates[this.state.selectedCandidate]
          ),
        });
        alert("Głos pomyślnie zapisany!");
        this.linkElement.current.click();
      });
    });
  }

  componentDidMount() {
    this.fetchDataFromFirestore();
  }

  render() {
    const buttons = {
      minWidth: "30vh",
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
    };
    const grid = {
      marginTop: "30px",
      paddingLeft: "20px",
      paddingRight: "20px",
    };
    const card = {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    };
    const cardContent = {
      flexGrows: 1,
      height: "100%",
    };

    let text = "";
    let text2 = "";
    const candidatesListJsx = [];
    if (this.state.currentRound != null) {
      text = this.state.currentRound.name;
      text2 = `w MF Tau ${this.state.dbData.city}`;

      for (let i = 0; i < this.state.currentRound.candidates.length; i++) {
        let bgColor = "";
        if (
          this.state.selectedCandidate != null &&
          this.state.selectedCandidate === i
        )
          bgColor = "primary.main";
        candidatesListJsx.push(
          <Grid
            item
            key={i}
            xs={6}
            sm={4}
            md={2}
            onClick={() => this.selectCandidate(i, bgColor)}
          >
            <Card style={card}>
              <Box bgcolor={bgColor} style={cardContent}>
                <CardContent>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    component="h2"
                  >
                    {this.state.currentRound.candidates[i]}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        );
      }
    }

    return (
      <div>
        <h1>
          {text}
          <br />
          {text2}
        </h1>
        <Grid container spacing={3} style={grid}>
          {candidatesListJsx}
        </Grid>
        <Box textAlign="center" marginTop="20px">
          <TextField label="Kod głosowania" onChange={this.handleCodeChange} />
        </Box>
        <div style={buttons}>
          <Button variant="contained" onClick={this.fetchDataFromFirestore}>
            Odśwież
          </Button>
          <Box width="100px" />
          <Button
            variant="contained"
            color="primary"
            onClick={this.confirmSelection}
          >
            Zagłosuj
          </Button>
        </div>
        <RouterLink
          to={`/results/${this.props.match.params.code}`}
          ref={this.linkElement}
        />
      </div>
    );
  }
}
