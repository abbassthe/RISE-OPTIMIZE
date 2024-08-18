import './Signup.scss';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function SignupForm() {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordconfirm, setPasswordConfirm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const performNavigate = async () => {
      try {
        await client.get("/userapi/user")
          .then(function (res) {
            setCurrentUser(true)
            navigate('/homepage');
          })
          .catch(function (error) {
            setCurrentUser(false);
          });;

      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    performNavigate();
  }, [navigate]);

  function isValid(p: any) {
    var phoneRe = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
  }
  const validate = () => {

    if (!username.trim()) return 'Username is required';
    if (!fullname.trim()) return 'Full name is required';
    if (!email.trim()) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid';
    }
    if (!phone.trim()) return 'Phone number is required';
    if (!isValid(phone)) return 'Phone number is invalid'
    if (!password) {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!passwordconfirm) {
      return 'Password confirmation is required';
    } else if (password !== passwordconfirm) {
      return 'Passwords do not match';
    }


    // If no errors, return true (form is valid), otherwise false
    return "Valid"
  };


  function submit(e: FormEvent) {
    if (validate() == "Valid") {
      // All fields are valid, proceed with form submission 
      e.preventDefault()
      client.post("/userapi/register", {
        email: email,
        username: username,
        fullname: fullname,
        phone: phone,
        password: password,
      }).then(function (res) {
        client.post("/userapi/login", {
          email: email,
          password: password
        }).then(function (res) {
          setCurrentUser(true);
          setErrorMessage(null);
          navigate('/homepage');
        }).catch(function (error) {
          if (error.response.status == 403) {
            setErrorMessage("You are already logged in!"); // Set error message
            navigate('/homepage');
          } else {
            setErrorMessage(error.response.data.message); // Set error message
          }

        });
      }).catch(function (error) {
        if (error.response.status == 403) {
          setErrorMessage("You are already logged in!"); // Set error message
          navigate('/homepage');
        } else {
          setErrorMessage(error.response.data.message); // Set error message
        }

      });
    } else { // invalid
      if (passwordconfirm) {
        e.preventDefault()
      }
      let ab = validate()
      if (ab == "Password must be at least 8 characters"
        || ab == "Passwords do not match"
        || ab == "Phone number is invalid"
        || ab == "Email is invalid"
      ) {
        setErrorMessage(ab)
      } else {
        setErrorMessage("")
      }
      // Password must be at least 8 characters
      // Passwords do not match
      // Phone number is invalid
      // Email is invalid

    }
  }
  if (!currentUser) {
    return (
      <div id="SignupWrapper">
        <form action="" method="">
          <div className="form-container slideRight-animation">
            <h1 className="form-header">Get started
              {errorMessage && <div style={{ color: 'red', marginBottom: '0px', fontSize: 23 }}>{errorMessage}</div>}
            </h1>

            <div className="input-container">
              <input type="text" name="u-name" id="u-name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required />
              <span>Username</span>
              <div className="error"></div>
            </div>

            <div className="input-container">
              <input type="text" name="f-name" id="f-name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
                required />
              <span>Full Name</span>
              <div className="error"></div>
            </div>

            <div className="input-container">
              <input type="email" name="mail" id="mail"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required />
              <span>E-mail</span>
              <div className="error"></div>
            </div>

            <div className="input-container">
              <input type="tel" name="phone" id="phone"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                required />
              <span>Phone</span>
              <div className="error"></div>
            </div>

            <div className="input-container">
              <input type="password" name="user-password" id="user-password" className="user-password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required />
              <span>Password</span>
              <div className="error"></div>
            </div>

            <div className="input-container">
              <input type="password" name="user-password-confirm" id="user-password-confirm" className="password-confirmation"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
                required />
              <span>Confirm Password</span>
              <div className="error"></div>
            </div>

            <div id="btm">
              <button type="submit" onClick={submit} className="submit-btn">Create Account</button>
              <p className="btm-text">
                Already have an account..? <span><a className="btm-text-highlighted" href="login" >Log in</a></span>
              </p>
              {/* https://www.example.com/login OR login */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
