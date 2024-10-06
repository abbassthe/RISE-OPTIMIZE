import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reset.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "https://backendflutterforecast.onrender.com",
});

function ResetPassword() {
  const [_currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const performNavigate = async () => {
      try {
        await client
          .get("/userapi/user")
          .then(function () {
            setCurrentUser(true);
            navigate("/homepage");
          })
          .catch(function () {
            setCurrentUser(false);
          });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    performNavigate();
  }, [navigate]);
  const validate = () => {
    if (!email) {
      return "A correct form of email is required";
    }
    return "Valid";
  };
  function submitForget(e: FormEvent) {
    e.preventDefault();
    if (validate() == "Valid") {
      client
        .post("/userapi/password-reset/", {
          email: email,
        })
        .then(function (res) {
          setErrorMessage(res.data.message);
          // console.log(res.data.message)
        })
        .catch(function (error) {
          if (error.response.status == 403) {
            setErrorMessage("Please logout to proceed restoring your account"); // Set error message
            navigate("/homepage");
          } else {
            setErrorMessage(error.response.data.message); // Set error message
          }
        });
    } else {
      setErrorMessage(validate());
    }
  }
  return (
    <div className="AppReset">
      <div className="imagedivR">
        <img src="./Sans titre 134_20240722012851.PNG"></img>
      </div>
      <div className="wrapperLoginR">
        <h1 id="headR">
          Reset Password
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "0px", fontSize: 23 }}>
              {errorMessage}
            </div>
          )}
        </h1>
        <div className="text2">Email</div>
        <div className="Input">
          <img src=".\email.png" alt="" />
          <div id="line"></div>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          ></input>
        </div>

        <span id="login">
          <a href="login">Return to Login</a>
        </span>

        <button onClick={submitForget}>Submit</button>
      </div>
    </div>
  );
}

export default ResetPassword;
