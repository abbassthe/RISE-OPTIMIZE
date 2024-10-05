import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
const Logout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await client.post("/userapi/logout", { withCredentials: true });

        navigate("/homepage");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};
/*
async function Logout() {
    const [currentUser, setCurrentUser] = useState<boolean | null>(null);
    useEffect(() => {
        client.get("/userapi/user")
            .then(function (res) {
                setCurrentUser(true);
            })
            .catch(function (error) {
                setCurrentUser(false);
            });
    }, []);
    if (currentUser) {
        // client.post("/userapi/logout", { withCredentials: true }).then(function (res) {
        //     setCurrentUser(false);
        //     const navigate = useNavigate();
        //     useEffect(() => {
        //         navigate('/homepage');
        //     }, [navigate]);
        // });

    }
    return client.post("/userapi/logout", { withCredentials: true }).then(function (res) {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/homepage');
        }, [navigate]);
    });;
};*/

export default Logout;
