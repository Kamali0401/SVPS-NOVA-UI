import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import './bootstrap.css';
// import './bootstrap.min.css';
// import './styles.css';

import "./addnew.css";
import logo from "../../app/assets/images/Sona.png";
//import logo from "../../app/assets/images/Schoollogo.png";
import {
  loginsSelector,
  validateLogin,
} from "../../app/redux/slices/loginSlice";
import { Form, FormLabel } from "react-bootstrap";
import { API } from "../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
  PublicAsyncGet,
  PublicAsyncPost

} from "../../app/services/https";
const Login = () => {
  // set up dispatch
  const dispatch = useDispatch();
  //const history=useHistory();
  const navigate = useNavigate();
  // fetch data from our store
  const { errorMSG, successMsg } = useSelector((state) => state.login);

  console.log("login selector", loginsSelector);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [pswdErrorMsg, setPswdErrorMsg] = useState("");
  const [roleErrorMsg, setroleErrorMsg] = useState("");

  const [roleList, setRoleList] = useState([]); // State for dropdown data
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role
  useEffect(() => {
    PublicAsyncGet(API.getRoles)
      .then((res) => {
        const role =res.data.filter(x => x.name != "Parent");
        
        setRoleList(role); // Store API response in state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onClickLogin = async () => {
    console.log(username, password, selectedRole);
  
    try {
      // Reset error messages
      setUserNameErrorMsg("");
      setPswdErrorMsg("");
      setroleErrorMsg("");
  
      // Perform form validation
      const error = validationFun();
      if (!error) return; // Stop execution if validation fails
  
      // Prepare the request body
      const requestBody = {
        admissionNo: "", // If mobileNo is optional, keep it empty
        username: username,
        password: password,
        role: selectedRole,
      };
  
      // Send the login request
      const response = await PublicAsyncPost(API.validateUser, requestBody);
  
      if (response) {
        // Check the response status code
        if (response.status === 200 && response.data) {
          const { accessToken, expiresAt, username, userRole, userId,facultyUsername } = response.data;
  
          // Store JWT token and user details in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("expiresAt", expiresAt);
          localStorage.setItem("username", username);
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("userId", userId);
          localStorage.setItem("facultyUsername", facultyUsername);
  
          // Navigate to the Welcome page after successful login
          navigate("/Welcome");
        } else {
          // Handle the case when status is not 200
          setErrorMsg("Invalid username,password and role");
        }
      }
    } catch (error) {
      // If the error is an AxiosError and status is 400, show the error message
      if (error.response && error.response.status === 400) {
        setErrorMsg("Invalid username or password");
      } else {
        // Handle other errors (e.g., network errors)
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };
  
  

 /* useEffect(() => {
    console.log("success message", successMsg);
    const getUser = JSON.parse(localStorage.getItem("user"));
    console.log(getUser);
    getUser && navigate("/Welcome"); //history.push('/Welcome')
  }, [successMsg]);*/

  const validationFun = () => {
    let isValid = true;
    if (!username) {
      setUserNameErrorMsg("Username is required");
      isValid = false;
    }

    if (!password) {
      setPswdErrorMsg("Password is required");
      isValid = false;
    }
    if (!selectedRole) {
      setroleErrorMsg("Role is required");
      isValid = false;
    }

    return isValid;
  };

  const onTextValueChange = (e) => {
    switch (e.target.id) {
      case "userName":
        setUserName(e.target.value);
        console.log(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };
  const onRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // render the items
  const renderItems = () => {
    // loading state
    //   if (loading) return <strong>Loading please wait...</strong>;

    //   // error state
    //   if (error) return <strong>Items not available at this time</strong>;
    // regular data workflow
    return (
      <div className="container">
        <div className="login-logo off-canvas">
          {" "}
          <a href="#">
            <img src={logo} width="240" />
          </a>{" "}
        </div>

        {/* <label htmlFor="Password" className="fw-bold">
          {errorMSG}
        </label> */}
        <div className="form-container off-canvas">
          <Form>
            <h2 className="text-center fw-bold" style={{ color: "#000C7B" }}>Login</h2>
            <Form.Group>
              <label htmlFor="EmailAddress" className="fw-bold">
                User Name
              </label>
              <Form.Control
                type="text"
                name="username"
                id="userName"
                onChange={onTextValueChange}
                value={username}
                aria-required="true"
                aria-invalid="true"
                required
                onKeyDown={handleEnter}
              />
            </Form.Group>
            {userNameErrorMsg ? (
              <h6 style={{ color: "red" }}>{userNameErrorMsg}</h6>
            ) : null}
            <p></p>
            <Form.Group>
              <label htmlFor="Password" className="fw-bold">
                Password
              </label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                onChange={onTextValueChange}
                value={password}
                aria-required="true"
                aria-invalid="true"
                required
                onKeyDown={handleEnter}
              />
            </Form.Group>
            {pswdErrorMsg ? (
              <h6 style={{ color: "red" }}>{pswdErrorMsg}</h6>
            ) : null}
            <p></p>
            <Form.Group>
        <label htmlFor="Role" className="fw-bold">
          Select Role
        </label>
        <Form.Control
          as="select"
          name="role"
          value={selectedRole}
          onChange={onRoleChange}
          required
        >
          <option value="">-- Select Role --</option>
          {roleList.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
            <p></p>

      {/* Role Dropdown */}
     
      {roleErrorMsg ? (
              <h6 style={{ color: "red" }}>{roleErrorMsg}</h6>
            ) : null}
      <br />
            {ErrorMsg ? (
              <h6
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {ErrorMsg}
              </h6>
            ) : null}
            
            <p className="text-center">
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block form-roundedbtn"
                style={{background:"#ecb211"}}
                onClick={() => {
                  onClickLogin();
                }}
                onFocus={() => {
                  onClickLogin();
                }}
              >
                Sign in
              </button>
            </p>
          </Form>
        </div>
      </div>
    );
  };

  // template
  return <div>{renderItems()}</div>;
};

export default Login;
