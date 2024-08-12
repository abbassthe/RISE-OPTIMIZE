import React from "react";
import "./Signup.scss";
function Signup() {
  return (
    <div className="App2">
      <div className="imagediv2">
        <div className="wrapperLogin2">
          <h1 id="head2">SignUp</h1>
          <div className="text2">Email</div>
          <div className="Input2">
            <img src=".\email.png" alt="" />
            <div id="line2"></div>
            <input type="email" />
          </div>
          <div className="text22">Password</div>
          <div className="Input2">
            <img src=".\password.png" alt="" />
            <div id="line"></div>
            <input type="password" />
          </div>
          <div className="text22">Confirm Password</div>
          <div className="Input2">
            <img src=".\password.png" alt="" />
            <div id="line2"></div>
            <input type="password" />
          </div>

          <button>SignUp</button>
          <div className="segment">
            <div className="lineHorizontal"></div>
            <span>Or Continue with </span>
            <div className="lineHorizontal"></div>
          </div>
          <div className="continueWith">
            <button className="LogInWithButton">
              <button className="LogInWithButtonInner"></button>
            </button>
            <button className="LogInWithButton"></button>
            <button className="LogInWithButton"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
