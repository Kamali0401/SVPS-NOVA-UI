import React, { useState, useRef, useEffect } from "react";
import { BsShop, BsList } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const authenticate = (routeName) => {
    const getUser = localStorage.getItem("userRole");
    if (getUser) {
      navigate(routeName);
    } else {
      navigate("/");
    }
  };
  const _onClick = ({ key, data }) => {
    setShowMenu(false);
    const functionality = {
      home: () => authenticate("/Welcome"),
    };
    functionality[key](data);
  };

  const onNavigate = (ref) => {
    console.log(ref, "ref");
    navigate(ref);
    setShowMenu(false);
  };
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setShowMenu(false);
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
  return (
    <>
      <nav className="navbar_full">
        {localStorage.getItem("userRole") != null ? (
          <div className="sidebar-nav">
            <ul className="nav">
              <li className="active" onClick={() => _onClick({ key: "home" })}>
                <a>
                  <i className="glyphicon glyphicon-home"></i> Home
                </a>
              </li>
            </ul>
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/facultyDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Faculty
                  </a>
                </li>
              </ul>
            ) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/studentDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Student
                  </a>
                </li>
              </ul>
            ) : null}

            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/sectionDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Section
                  </a>
                </li>
              </ul>) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/roleDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Role
                  </a>
                </li></ul>) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/examDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Exam List
                  </a>
                </li></ul>) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/subjectDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Subject
                  </a>
                </li></ul>) : null}

            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li className="active">
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Mapping
                  </a>
                  {/* Sub-navigation for Faculty */}
                  <ul className="sub-nav">

                    {/* <li
                  className="active"
                  onClick={() => {
                    onNavigate("/batchSubMapping");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Subject Mapping
                  </a>
                </li> */}
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/batchStudMapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Section Student Mapping
                      </a>
                    </li>
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/sectionsubjectmapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Section Subject Mapping
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/holidayCalendar");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Holiday Calendar
                  </a>
                </li>
              </ul>
            ) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
  <ul className="nav">
    <li
      className="active"
      onClick={() => {
        onNavigate("/houseactivityDetails");
      }}
    >
      <a>
        <i className="glyphicon glyphicon-home"></i> House Activity
      </a>
    </li>
  </ul>
) : null}

            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/timetableDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Timetable
                  </a>
                </li>
              </ul>) : null}
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/houseDetails");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> House Details
                  </a>
                </li>
              </ul>) : null}

              {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/academicCalendar");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Academic Calendar
                  </a>
                </li>
              </ul>
            ) : null}
            {/* <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/attendance");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Attendance
                  </a>
                </li>
              </ul> */}
            {/* {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (

              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/updateStudentSemDate");
                  }} >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Student Config
                  </a>
                </li>
              </ul>
            ) : null} */}
            {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN")
              ? (
                <ul className="nav">
                  <li
                    className="active"
                    onClick={() => {
                      onNavigate("/sendFeedback");
                    }}
                  >
                    <a>
                      <i className="glyphicon glyphicon-home"></i>Feedback</a>
                  </li>
                </ul>
              ) : null} */}



            {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
            (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL")? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/memberDetails");
                  }}
                >
                   <a>
                    <i className="glyphicon glyphicon-home"></i>Member Details</a>
                </li>
              </ul>
              ) : null} */}
            <ul className="nav">
              <li className="active">
                <a>
                  <i className="glyphicon glyphicon-home"></i> Reports
                </a>
                {/* Sub-navigation for Faculty */}
                <ul className="sub-nav">
                  {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
              (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL") 
               ? (

                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/reports");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i> Activity Report
                  </a>
                </li>
            ) : null} */}
                  {/* <li className="active" onClick={() => {
              onNavigate("/markreports");
            }}>  <a>
                <i className="glyphicon glyphicon-home"></i> Mark Report  </a>
            </li> */}

                  {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") || (localStorage.getItem("userRole").toUpperCase() == "TEACHER") ||
                    (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL") ? (

                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/attendanceReports");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i>Attendance Report</a>
                    </li>
                  ) : null}
                </ul>
              </li>
            </ul>

            {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
              (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL") ? (
              <ul className="nav">
                <li
                  className="active"
                  onClick={() => {
                    onNavigate("/announcement");
                  }}
                >
                  <a>
                    <i className="glyphicon glyphicon-home"></i>Announcement</a>
                </li>
              </ul>
            ) : null} */}
          </div>
        ) : null}

        {/* </div> */}
      </nav>
      <nav className="navbar_mob">
        {localStorage.getItem("userRole") != null ? (
          <>
            <div className="sidebar-nav">
              <div class="dropdown" ref={wrapperRef}>
                <span>
                  <BsList
                    style={{ height: "30px", width: "30px" }}
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                  />
                </span>
                <div
                  ref={wrapperRef}
                  class="dropdown-content"
                  style={{ display: showMenu ? "block" : "none" }}
                >
                  <li
                    className="active"
                    onClick={() => _onClick({ key: "home" })}
                  >
                    <a>
                      <i className="glyphicon glyphicon-home"></i> Home
                    </a>
                  </li>

                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/facultyDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Faculty
                      </a>
                    </li>
                  ) : null}

                  <li
                    className="active"
                    onClick={() => {
                      onNavigate("/studentDetails");
                    }}
                  >
                    <a>
                      <i className="glyphicon glyphicon-home"></i> Student
                    </a>
                  </li>


                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/roleDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Role
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/examDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Exam List
                      </a>
                    </li>
                  ) : null}
                  {/* {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
                    <ul className="nav">
                      <li
                        className="active"
                        onClick={() => {
                          onNavigate("/formRoleDetails");
                        }}
                      >
                        <a>
                          <i className="glyphicon glyphicon-home"></i> Form Role
                        </a>
                      </li>
                    </ul>
                  ) : null} */}
                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/subjectDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Subject
                      </a>
                    </li>
                  ) : null}





                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/batchStudMapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i>Section Student
                        Mapping
                      </a>
                    </li>
                  ) : null}

                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/sectionsubjectmapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i>Section Subject
                        Mapping
                      </a>
                    </li>
                  ) : null}

                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/holidayCalendar");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Holiday Calendar
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/houseDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> House Details
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/timetableDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Timetable
                      </a>
                    </li>
                  ) : null}
                  {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
  <ul className="nav">
    <li
      className="active"
      onClick={() => {
        onNavigate("/houseactivityDetails");
      }}
    >
      <a>
        <i className="glyphicon glyphicon-home"></i> House Activity
      </a>
    </li>
  </ul>
) : null}


                  {/* {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/batchStudMapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i>Section Student
                        Mapping
                      </a>
                    </li>
                  ) : null}

            {localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/sectionsubjectmapping");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i>Section Subject
                        Mapping
                      </a>
                    </li>
                  ) : null} */}





                  {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
                 (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL")   ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/memberDetails");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Member Details
                     
                      </a>
                    </li>
                  ) : null} */}
{localStorage.getItem("userRole").toUpperCase() ==
                    "ADMIN" ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/academicCalendar");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Academic Calendar
                      </a>
                    </li>
                  ) : null}

                  {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
                    (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL") ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/attendanceReports");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Attendance Reports

                      </a>
                    </li>
                  ) : null}
                  {/* {(localStorage.getItem("userRole").toUpperCase() == "ADMIN") ||
                 (localStorage.getItem("userRole").toUpperCase() == "PRINCIPAL")   ? (
                    <li
                      className="active"
                      onClick={() => {
                        onNavigate("/announcement");
                      }}
                    >
                      <a>
                        <i className="glyphicon glyphicon-home"></i> Announcement
                     
                      </a>
                    </li>
                  ) : null} */}
                </div>
              </div>
            </div>
          </>
        ) : null}


      </nav>
    </>
  );
};
export default Navigation;
