import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import "./login.scss";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function Login() {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  useEffect(() => {
    client.get("/userapi/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);
  function submitLogin(e: FormEvent) {
    e.preventDefault();
    client.post("/userapi/login", {
      email: email,
      password: password
    }).then(function (res) {
      setCurrentUser(true);
    });
  }

  if (currentUser) {
    return (
      <div>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="imagediv"></div>
      <div className="wrapperLogin">
        <h1 id="head">Login</h1>
        <div className="text">Email</div>
        <div className="Input">
          <img src=".\email.png" alt="" />
          <div id="line"></div>
          <input type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} ></input>
        </div>
        <div className="text2">Password</div>
        <div className="Input">
          <img src=".\password.png" alt="" />
          <div id="line"></div>
          <input type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} ></input>
        </div>
        <span id="forgotpassword">
          <a href="#">Forgot Password</a>
        </span>
        <button onClick={submitLogin}>Log In</button>
        <div className="segment">
          <div className="lineHorizontal"></div>
          <span>Or Continue with </span>
          <div className="lineHorizontal"></div>
        </div>
        <div className="continueWith">
          <button className="LogInWithButton"></button>
          <button className="LogInWithButton"></button>
          <button className="LogInWithButton"></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
