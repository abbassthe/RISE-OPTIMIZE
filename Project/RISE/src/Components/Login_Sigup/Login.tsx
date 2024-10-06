import  { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Login() {
  const [_currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
  /*
  useEffect(() => {
    client.get("/userapi/user")
      .then(function (res) {
        const navigate = useNavigate();
        useEffect(() => {
          const performNavigate = async () => {
            try {
              navigate('/homepage');
            } catch (error) {
              console.error('Error not going back out:', error);
            }
          };

          performNavigate();
        }, [navigate]);

        return null;
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);*/
  // function submitLogin(e: FormEvent) {
  //   e.preventDefault();
  //   client.post("/userapi/login", {
  //     email: email,
  //     password: password
  //   }).then(function (res) {
  //     setCurrentUser(true);
  //   });
  // }
  const validate = () => {
    if (!email) {
      return "A correct form of email is required";
    }
    if (!password) {
      return "Please write a password";
    }
    return "Valid";
  };
  function submitLogin(e: FormEvent) {
    e.preventDefault();
    if (validate() == "Valid") {
      client
        .post("/userapi/login", {
          email: email,
          password: password,
        })
        .then(function () {
          setCurrentUser(true);
          setErrorMessage(null); // Clear error message on successful login
          navigate("/homepage");
          // const navigate = useNavigate();
          // useEffect(() => {
          //   const performNavigate = async () => {
          //     try {
          //       navigate('/homepage');

          //     } catch (error) {
          //       console.error('Error logging out:', error);
          //     }
          //   };
          //   performNavigate();
          // }, [navigate]);
        })
        .catch(function (error) {
          if (error.response.status == 403) {
            setErrorMessage("You are already logged in!"); // Set error message
            navigate("/homepage");
          } else {
            setErrorMessage(error.response.data.message); // Set error message
          }
          // setErrorMessage('Invalid email or password. Please try again.' + error.response.data.message); // Set error message
        });
    } else {
      setErrorMessage(validate());
    }
  }

  // if (currentUser) {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     const performNavigate = async () => {
  //       try {
  //         navigate('/homepage');
  //       } catch (error) {
  //         console.error('Error not going back out:', error);
  //       }
  //     };

  //     performNavigate();
  //   }, [navigate]);

  //   return null;
  // }
  /*
  return (
    <div>
      <div className="center">
        <h2>You're logged in!</h2>
      </div>
    </div>
  );*/

  return (
    <div className="App">
      <div className="imagedivlogin">
        <img src="./Sans titre 134_20240722012851.PNG"></img>
      </div>
      <div className="wrapperLogin">
        <h1 id="head">
          Login
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

        <div className="text2">Password</div>
        <div className="Input">
          <img src=".\password.png" alt="" />
          <div id="line"></div>
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></input>
        </div>
        <span id="forgotpassword">
          <a href="password-reset">Forgot Password</a>
        </span>

        <button onClick={submitLogin}>Log In</button>
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
  );
}

export default Login;
