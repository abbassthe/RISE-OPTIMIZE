import { useParams } from "react-router-dom";
import  { useState,  FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./resetconfirm.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function PasswordResetConfirm() {
  const { encodedPk, token } = useParams<{
    encodedPk: string;
    token: string;
  }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [entered, setEntered] = useState<string>("");
  const navigate = useNavigate();
  // client.post("/userapi/password-reset/MQ/cbtag1-b3cf83cdb1ac6dd1b613de06be5d88e3/", {
  //   password: password
  // }).then(function (res) {
  //   console.log(res.data.message)
  // });
  const validate = () => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!passwordConfirm) {
      return "Password confirmation is required";
    } else if (password !== passwordConfirm) {
      return "Passwords do not match";
    }
    return "Valid";
  };
  if (entered != "true") {
    client
      .post("/userapi/check-token/" + encodedPk + "/" + token + "/", {})
      .then(function (res) {
        if (res.data.message == "Invalid token") {
          if (errorMessage != "Password reset complete") {
            navigate("/homepage");
          }
          return null;
        }
      })
      .catch(function () {
        if (errorMessage != "Password reset complete") {
          navigate("/homepage");
        }
        return null;
      });
    setEntered("true");
  }
  function submitChange(e: FormEvent) {
    e.preventDefault();
    if (errorMessage == "Password reset complete") {
      return;
    }
    if (validate() == "Valid") {
      // All fields are valid, proceed with form submission
      client
        .post("/userapi/password-reset/" + encodedPk + "/" + token + "/", {
          password: password,
        })
        .then(function (res) {
          // if (!entered) {
          if (errorMessage != "Password reset complete") {
            setErrorMessage(res.data.message);
          }

          setTimeout(() => {
            try {
              navigate("/homepage");
            } catch (error) {}
          }, 5000);
        })
        .catch(function (error) {
          if (error.response.status == 403) {
            setErrorMessage("Please logout to proceed restoring your account"); // Set error message
            navigate("/homepage");
          } else {
            setErrorMessage("Error: " + error.response.data.message); // Set error message
          }
        });
    } else {
      setErrorMessage(validate());
    }
  }
  return (
    <div className="AppReset">
      <div className="wrapperLogin">
        <h1 id="headR">
          Change Password
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "0px", fontSize: 23 }}>
              {errorMessage}
            </div>
          )}
        </h1>
        <div className="text2">Password</div>
        <div className="Input">
          <img className="imgResetI" src=".\password.png" alt="" />
          <div id="line"></div>
          <input
            className="InputR"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></input>
        </div>

        <div className="text2">
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Password Confirmation
        </div>
        <div className="Input">
          <img className="imgResetI" src=".\password.png" alt="" />
          <div id="line"></div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(e.target.value)
            }
          ></input>
        </div>
        <span id="loginR">
          <a id="aR" href="login">
            Return to Login
          </a>
        </span>

        <button onClick={submitChange}>Submit</button>
      </div>
    </div>
  );
}

export default PasswordResetConfirm;
