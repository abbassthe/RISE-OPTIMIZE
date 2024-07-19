import React from "react";
import "./login.scss";
function Login() {
  return (
    <div className="App">
      <div className="imagediv"></div>
      <div className="wrapperLogin">
        <h1 id="head">Login</h1>
        <div className="text">Email</div>
        <div className="Input">
          <img src=".\email.png" alt="" />
          <div id="line"></div>
          <input type="email" />
        </div>
        <div className="text2">Password</div>
        <div className="Input">
          <img src=".\password.png" alt="" />
          <div id="line"></div>
          <input type="password" />
        </div>
        <span id="forgotpassword">
          <a href="#">Forgot Password</a>
        </span>
        <button>Log In</button>
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
