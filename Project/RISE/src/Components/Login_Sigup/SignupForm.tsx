import React from 'react';
import './Signup.scss'; 

const SignupForm: React.FC = () => {
  return (
    <div id="SignupWrapper">
      <form action="" method="">
        <div className="form-container slideRight-animation">
          <h1 className="form-header">Get started</h1>

          <div className="input-container">
            <input type="text" name="f-name" id="f-name" required />
            <span>First name</span>
            <div className="error"></div>
          </div>

          <div className="input-container">
            <input type="text" name="l-name" id="l-name" required />
            <span>Last name</span>
            <div className="error"></div>
          </div>

          <div className="input-container">
            <input type="email" name="mail" id="mail" required />
            <span>E-mail</span>
            <div className="error"></div>
          </div>

          <div className="input-container">
            <input type="tel" name="phone" id="phone" required />
            <span>Phone</span>
            <div className="error"></div>
          </div>

          <div className="input-container">
            <input type="password" name="user-password" id="user-password" className="user-password" required />
            <span>Password</span>
            <div className="error"></div>
          </div>

          <div className="input-container">
            <input type="password" name="user-password-confirm" id="user-password-confirm" className="password-confirmation" required />
            <span>Confirm Password</span>
            <div className="error"></div>
          </div>

          <div id="btm">
            <button type="submit" className="submit-btn">Create Account</button>
            <p className="btm-text">
              Already have an account..? <span className="btm-text-highlighted"> Log in</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
