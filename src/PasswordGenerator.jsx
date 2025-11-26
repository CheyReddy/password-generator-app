import React, { useEffect, useRef, useState } from "react";
import "./PasswordGenerator.css";

function PasswordGenerator() {
  const [selected, setSelected] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  });
  const [passwordLength, setPasswordLength] = useState("");
  const [password, setPassword] = useState("");
  const [copyContent, setCopyContent] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersChars = "0123456789";
    const symbolChars = "!@#$%^&*()_-+=";

    let allowedChars = "";

    if (selected.lowercase) allowedChars += lowercaseChars;
    if (selected.uppercase) allowedChars += uppercaseChars;
    if (selected.numbers) allowedChars += numbersChars;
    if (
      selected.symbols ||
      !(selected.lowercase && selected.uppercase && selected.numbers)
    )
      allowedChars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < Number(passwordLength); i++) {
      let index = Math.floor(Math.random() * allowedChars.length);
      newPassword += allowedChars[index];
    }
    setPassword(newPassword);
  };

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const copyText = () => {
    navigator.clipboard.writeText(password);
    setCopyContent(password);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="password-container">
        <div className="password-length">
          <label>Password Length:</label>
          <input
            type="number"
            ref={inputRef}
            value={passwordLength}
            onChange={(e) => {
              setPasswordLength(e.target.value);
              setPassword("");
              setCopyContent("");
            }}

          />
        </div>
        <div className="password-options">
          <div className="select-option">
            <input type="checkbox" name="lowercase" onChange={handleCheckBox} />
            <label>Include LowerCase</label>
          </div>
          <div className="select-option">
            <input type="checkbox" name="uppercase" onChange={handleCheckBox} />
            <label>Include UpperCase</label>
          </div>
          <div className="select-option">
            <input type="checkbox" name="numbers" onChange={handleCheckBox} />
            <label>Include Numbers</label>
          </div>
          <div className="select-option">
            <input type="checkbox" name="symbols" onChange={handleCheckBox} />
            <label>Include Symbols</label>
          </div>
        </div>
        <div>
          <button onClick={handleClick}>Generate</button>
        </div>
        {/* <div className="result">
          <p>Generated Password:</p>
        </div> */}
        <div
          className="copy-label"
          onClick={copyText}
          style={{ visibility: password.length > 0 ? "visible" : "hidden" }}
        >
          📋Copy
        </div>

        <div
          className="password"
          style={{ visibility: password.length > 0 ? "visible" : "hidden" }}
        >
          {password}
        </div>

        <div
          className="copy-content"
          style={{ visibility: copyContent.length > 0 ? "visible" : "hidden" }}
        >
          Copied to Clipboard!
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
