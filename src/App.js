import React, { useState } from "react";
import "./App.css";

import { autoReadSMS } from "./AutoReadSMS";

function App() {
  const [otp, setOtp] = useState("");
  const [listening, setListening] = useState(false);

  const handleSetOtp = (code) => {
    setListening(false);
    if (code) {
      setOtp(code);
    }
  };

  const handleGetOtp = async () => {
    setListening(true);
    await autoReadSMS(handleSetOtp);
  };

  console.log(otp);

  return (
    <div className="App">
      <h1>Received otp</h1>
      <br />
      {listening && <p>Listening...</p>}
      <h1>{otp}</h1>

      <button onClick={handleGetOtp}>Get otp</button>
    </div>
  );
}

export default App;
