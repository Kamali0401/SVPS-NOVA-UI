import React, { useEffect, useRef, useState } from "react";
import logo from "../../app/assets/images/sonaLogo.jpg";
import "./header.css";
// import './bootstrap.css';
// import './bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { logoutReducer } from "../redux/slices/loginSlice";
import { useCallback } from "react";
//import NewItem from "../../app/components/changepassword";
import NewItem from "../../screens/activity/changepassword/index";
const Header = () => {
  
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const user = localStorage.getItem("username");
  const role = localStorage.getItem("userRole");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [password, setpassword] = useState();

 // console.log(showLogout);
  const goToLoginPage = () => {
    navigate("/login");
  };

  const logout = () => {
    Dispatch(logoutReducer(undefined, navigate));
  };
  const togglePopup = () => {
    onAssessmentSelection("Change Password ");
    setshowPopup(!showPopup);
    if (!showPopup) {
      setpassword();
    }
  };
  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };
  // useEffect(() => {
  //   console.log("running useEffect as logout ");
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setShowLogout(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!isNavCollapsed && ref.current && !ref.current.contains(e.target)) {
        setIsNavCollapsed(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isNavCollapsed]);

  return (
    <div className="">
      <header></header>

      <div className="desktop">
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
          <div className="container-fluid ">
            {" "}
            <a className="navbar-brand navbar-ht" href="#">
              <img src={logo} />
            </a>
            <h4 className="navbar-brand navbar-ht fw-bold mb-0 blue-heading" >
              Sona Valliappa Public School
            </h4>
            {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span>gh</span>
          </button> */}
            <h4 className="w-100 text-center fw-bold mb-0 blue-heading"style={{color:"#000C7B"}}>
              SVPS Management Suite
            </h4>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                <li className="nav-item dropdown position-relative">
                  {" "}
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleNavCollapse}
                  >
                    {" "}
                     <span ></span> 
                    <span className="username">
                      {user || "NaN"}
                      <span className="sub">{role || "NaN"}</span>
                    </span>{" "}
                  </a>
                  {!isNavCollapsed && (
                    <div
                    ref={ref}
                    // style={{left:"5px"}}
                    style={{ left: "-30px" }}
                      className="bg-light position-absolute border border-dark"
                    >                      
                      <hr className="dropdown-divider" />
                      
                      <a                       
                        className="dropdown-item"
                        href="#"
                        onClick={() => togglePopup()} 
                       //navigate ={("/changepassword")}
                      >
                        <i className="fas fa-eye fa-fw"></i> Change Password
                      </a>
                      <a
      className="dropdown-item"
      href="#"
      onClick={(e) => {
        e.preventDefault(); // Prevent page reload
        navigate("/delete-account"); // Navigate to Account Deletion Page
      }}
    >
      <i className="fas fa-user-times fa-fw"></i> Delete Account
    </a>
                      <a                       
                        className="dropdown-item"
                        href="#"
                        onClick={logout}
                      >
                        <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                      </a>
                      
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="container-fluid-mob">
        {" "}
        <a className="navbar-brand navbar-ht" href="#">
          <img src={logo} />
        </a>
        {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span>gh</span>
          </button> */}
        <h4 className="w-100 text-center fw-bold mb-0 blue-heading">
        SVPS Management Suite
        </h4>
        <div class="avtar_logout" ref={wrapperRef}>
          <span>
            <FiUser
              style={{ height: "30px", width: "30px" }}
              onClick={() => {
                setShowLogout(!showLogout);
              }}
            />
          </span>
          <div
            ref={wrapperRef}
            class="avtar-content"
            style={{ display: showLogout ? "block" : "none" }}
          >
            <span className="username">
              {user|| "NaN"}
              <span className="sub">{role || "NaN"}</span>
            </span>
            <p>
              {" "}
              
              <a className="dropdown-item" href="#" onClick={() => togglePopup()}>
                <i className="fa fa-eye"></i>  Change Password
              </a>
              <a
      className="dropdown-item"
      href="#"
      onClick={(e) => {
        e.preventDefault(); // Prevent page reload
        navigate("/delete-account"); // Navigate to Account Deletion Page
      }}
    >
      <i className="fas fa-user-times fa-fw"></i> Delete Account
    </a>
    <a className="dropdown-item" href="#" onClick={logout}>
                <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
              </a>
            </p>
          </div>
        </div>
      </div>
      {showPopup ? (
        <NewItem
          item={assessment}
          closePopup={() =>togglePopup()}
          password={password}
        />
      ) : null}
    </div>
  );
};
export default Header;
