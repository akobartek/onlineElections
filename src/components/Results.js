import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
} from "@material-ui/core/";
import { firestore } from "../firebase";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: null,
      currentRound: null,
      votes: null,
    };
    this.fetchDataFromFirestore = this.fetchDataFromFirestore.bind(this);
  }

  fetchDataFromFirestore() {
    const docRef = firestore
      .collection("elections")
      .doc(this.props.match.params.code);
    docRef.get().then((doc) => {
      const data = doc.data();
      const roundRef = docRef.collection("rounds").doc(data.activeRound);
      roundRef.get().then((roundDoc) => {
        roundRef
          .collection("votes")
          .get()
          .then((snapshot) => {
            const votesList = [];
            snapshot.forEach((voteDoc) => {
              votesList.push(voteDoc.data().vote);
            });
            this.setState({
              dbData: data,
              currentRound: roundDoc.data(),
              votes: votesList,
            });
          });
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

    let roundName = "";
    const resultsListJsx = [];
    if (this.state.currentRound != null) {
      roundName = this.state.currentRound.name;

      const numberOfVotes = this.state.votes.length;
      for (let i = 0; i < this.state.currentRound.candidates.length; i++) {
        const candidate = this.state.currentRound.candidates[i];
        const numberOfCandidateVotes = this.state.votes.filter(
          (vote) => vote === candidate
        ).length;
        let percentage = (numberOfCandidateVotes / numberOfVotes) * 100;
        percentage = Math.round((percentage + Number.EPSILON) * 100) / 100;
        resultsListJsx.push(
          <ListItem>
            <ListItemText primary={candidate} />
            <ListItemSecondaryAction>
              {`${numberOfCandidateVotes} (${percentage}%)`}
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
    }

    return (
      <div>
        <h1>
          Wyniki wyborów w głosowaniu <br />
          {`"${roundName}"`}
        </h1>
        <List dense={true}>{resultsListJsx}</List>
        <div style={buttons}>
          <Button
            variant="contained"
            onClick={() => this.props.history.goBack()}
          >
            Wstecz
          </Button>
          <Box width="100px" />
          <Button
            variant="contained"
            color="primary"
            onClick={this.fetchDataFromFirestore}
          >
            Odśwież
          </Button>
        </div>
      </div>
    );
  }
}
