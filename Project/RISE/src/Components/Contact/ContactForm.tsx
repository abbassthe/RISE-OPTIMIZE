import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import emailjs from "@emailjs/browser";
import "./Contact.scss";
import "./ccontainer.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

type AlertInfo = {
  display: boolean;
  message: string;
  type: string;
};

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    display: false,
    message: "",
    type: "",
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message: string, type: string) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Destructure data object
    let am: number = 0;
    const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };
      axios
        .get("http://localhost:8000/contactapi/contactusers?search=" + email)
        .then(function (res) {
          am = parseInt(res.data[0].id);
          let msga = { user: am, msg: message };
          axios.post("http://localhost:8000/contactapi/contactmsgs/", msga);
        })
        .catch(function (err) {
          let user = { name: name, email: email };
          axios.post("http://localhost:8000/contactapi/contactusers/", user);
          axios
            .get(
              "http://localhost:8000/contactapi/contactusers?search=" + email
            )
            .then(function (res) {
              am = parseInt(res.data[0].id);
              let msga = { user: am, msg: message };
              axios.post("http://localhost:8000/contactapi/contactmsgs/", msga);
            });
        });

      // Use emailjs to email contact form data
      // await emailjs.send(
      //     import.meta.env.VITE_SERVICE_ID as string,
      //     import.meta.env.VITE_TEMPLATE_ID as string,
      //     templateParams,
      //     import.meta.env.VITE_PUBLIC_KEY as string,
      // );

      // Display success alert
      toggleAlert("Thanks for your message!", "success");
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert("Something went wrong with the API", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset();
    }
  };

  return (
    <div className="ContactForm">
      <div className="ccontainer mr-1">
        <div className="row">
          <div className="col-12 text-center">
            <div className="contactForm">
              <form
                className="formCont"
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Row 1 of form */}

                <div className="row formRowC">
                  <div className="col-6">
                    <input
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please enter your name",
                        },
                        maxLength: {
                          value: 30,
                          message: "Please use 30 characters or less",
                        },
                      })}
                      className="form-control formInputC"
                      placeholder="Name"
                    ></input>
                    {errors.name && (
                      <span className="errorMessage">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className="form-control formInputC"
                      placeholder="Email address"
                    ></input>
                    {errors.email && (
                      <span className="errorMessage">
                        Please enter a valid email address
                      </span>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className="row formRowC">
                  <div className="col">
                    <input
                      type="text"
                      {...register("subject", {
                        required: {
                          value: true,
                          message: "Please enter a subject",
                        },
                        maxLength: {
                          value: 75,
                          message: "Subject cannot exceed 75 characters",
                        },
                      })}
                      className="form-control formInputC"
                      placeholder="Subject"
                    ></input>
                    {errors.subject && (
                      <span className="errorMessage">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className="row formRowC">
                  <div className="col">
                    <textarea
                      rows={3}
                      {...register("message", {
                        required: true,
                      })}
                      className="form-control formInputC"
                      placeholder="Message"
                    ></textarea>
                    {errors.message && (
                      <span className="errorMessage">
                        Please enter a message
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="submit-btnC btn btn-primary "
                  disabled={disabled}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {alertInfo.display && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
          role="alert"
        >
          {alertInfo.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() =>
              setAlertInfo({ display: false, message: "", type: "" })
            } // Clear the alert when close button is clicked
          ></button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
