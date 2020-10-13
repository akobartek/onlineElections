import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, TextField, Button } from "@material-ui/core/";
import { firestore } from "../firebase";

export default function Main() {
  const [code, setCode] = useState(0);
  const [linkElement, setLinkElement] = useState(0);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    firestore
      .collection("elections")
      .doc(code)
      .get()
      .then((doc) => {
        if (doc.exists) {
          linkElement.click();
        } else {
          alert(`Brak wyborów o kodzie ${code}`);
        }
      });
  };

  return (
    <div>
      <h1>Wpisz kod wyborów, w których chcesz wziąć udział:</h1>
      <Box textAlign="center">
        <TextField label="Kod wyborów" onChange={handleCodeChange} />
        <br />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={handleBtnClick}>
          Zatwierdź
        </Button>
      </Box>
      <RouterLink
        to={`/elections/${code}`}
        ref={(input) => setLinkElement(input)}
      />
    </div>
  );
}
