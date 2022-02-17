import React, { useState } from "react";
import "./App.css";

import { autoReadSMS } from "./AutoReadSMS";

function App() {
  const [otp, setOtp] = useState("");

  const handleGetOtp = () => {
    autoReadSMS(setOtp);
  };

  console.log(otp);

  return (
    <div className="App">
      <h1>Received otp</h1>
      <br />
      <h1>{otp}</h1>

      <button onClick={handleGetOtp}>Get otp</button>
    </div>
  );
}

export default App;
