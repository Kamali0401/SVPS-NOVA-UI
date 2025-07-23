import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import AddFacultyDetails from "./addFacultyDetails/index";
import AdvanceTable from "./advanceTable";
import {
  fetchFaculties,
  facultySelector,
  deleteFaculty,
} from "../../app/redux/slices/facultySlice";
import { AsyncGet, AsyncPost, AsyncGetFiles } from "../../app/services/https";
import { API } from "../../app/services/endpoints";
import Popup from "reactjs-popup";

const FacultyDetails = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, facultyList } = useSelector(facultySelector);

  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [faculty, setFaculty] = useState();
  const [listOfFaculty, setlistOfFaculty] = useState(facultyList || []);
  const [file, setFile] = useState();
  const [filesList, setfilesList] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  const [fileName, setFileName] = useState();
  const [selectedFile, setselectedFile] = useState("");
  const togglePopup = () => {
    debugger;
    onAssessmentSelection("Faculty Details");
    setshowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setFaculty();
    }
  };
  const onFileUpload = async (res) => {
    debugger;
    /*if (selectedFile?.length < 1) {
      dispatch(fetchStudents);
      closePopup();
      return;
    }*/

    if (selectedFile[0].name == "Faculty.csv") {
      debugger;
      console.log(res, "response");
      //const studentData = res ? res[0] : student;
      const formData = new FormData();
      for (let index = 0; index < selectedFile.length; index++) {
        const fileUploaded = selectedFile[index];

        formData.append("FormFiles", fileUploaded);
      }

      formData.append("TypeofUser", "Facultys");

      try {
        debugger;
        const res = await AsyncPost(API.bulkupload, formData);
        
          alert(res.data);

        
        dispatch(fetchFaculties());
        window.location.reload(true);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("File Name should be Faculty.csv only");
    }

    //formData.append("id", Number(studentData?.id || 0));
  };
  const downloadListFun = async () => {
    debugger;
    alert("Please wait until the faculty list to download.");
    AsyncGetFiles(
      `${API.downloadListbasedonRole
      }Role=Faculty`
    )
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "AllFacultyList.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to download the template");
      });
  };
  const downloadFileFun = async () => {
    AsyncGetFiles(API.DownloadTemplate)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/zip" })
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", "file.zip");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  /*const closePopupFun = () => {
    closePopup();
    window.location.reload(false);
  };*/
  const onFileChange = async (e) => {
    let AllFiles = e.target.files;
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  // fetch data from our store

  // console.log(loading);
  console.log("Fetch data from Store", facultyList);

  const deleteFacultyFun = (item) => {
    dispatch(deleteFaculty(item.id));
  };

  const editFaculty = (item) => {
    setFaculty({ ...item, data: item });
    setshowPopup(!showPopup);
    setIsEdit(true);

  };

  useEffect(() => {
    getFacultyData();
  }, []);

  const getFacultyData = () => {
    dispatch(fetchFaculties());
  };

  useEffect(() => {
    if (!facultyList) {
      return;
    }
    setlistOfFaculty(facultyList);
  }, [facultyList]);

  console.log("Before Render facultyList", facultyList);
  console.log("Before Render listOfFaculty", listOfFaculty);

  // render the items
  const renderItems = () => {
    //loading state
    if (loading) return <strong>Loading please wait...</strong>;

    // error state
    if (error) return <strong>Items not available at this time</strong>;

    // regular data workflow
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">Faculty Details</h2>
            <div className="but col text-end">
              <button
                onClick={togglePopup}
                className="btn form-roundedbtn3 buttonW"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
                style={{ color: "white" }}
              >
                <i className="fa fa-plus"></i> ADD NEW
              </button>
            </div>

            <div className="but col d-flex gap-2">
              <button
                className="btn form-roundedbtn2 buttonW"
                type="button"
                style={{ color: "white" }}
                onClick={downloadListFun}
              >
                <i className="fa fa-list"></i> Faculty List
              </button>

              <button
                className="btn form-roundedbtn2 buttonW"
                type="button"
                style={{ color: "white" ,width:"360px !important"}}
                onClick={downloadFileFun}
              >
                <i className="fa fa-download"></i> Template
              </button>
            </div>


            {/* <div className="but col text-end">
              <button
                onClick={() => togglePopup()}
                className="btn btn-lg btn-success btn-block form-roundedbtn3"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                <span className="glyphicon glyphicon-plus"></span> ADD NEW
              </button>

              <button
                className="btn btn-lg btn-secondary btn-block form-roundedbtn2 buttonW"
                type="Button"
                onClick={() => downloadFileFun()}
                //buttonStyle={{width : '160px !important'}}
              >
                <span className="glyphicon glyphicon-remove"></span> Download
                Template
              </button> */}

              {/*<button
                className="btn btn-lg btn-secondary btn-block form-roundedbtn2"
                type="submit"
              >
                <span className="glyphicon glyphicon-remove"></span> DELETE
               </button>*/}
            
          </div>
          <h4 class="w-100  fw-bold mb-0 blue-heading">Bulk Upload </h4>

          <div className="col-xs-3 col-md-3 col-lg-3 col-sm-12  form-group">
            <input
              className="form-control"
              onChange={onFileChange}
              type="file"
              accept=".csv"
              id="formFileMultiple"
            />
          </div>
          <button
            className="btn btn-lg btn-secondary btn-block form-roundedbtn2"
            type="submit"
            onClick={onFileUpload}
          >
            <span className="glyphicon glyphicon-remove"></span> Upload
          </button>

          <div className="bootstrap-table">
            <div className="fixed-table-toolbar"></div>
            <div className="fixed-table-container">
              <div
                className="fixed-table-body"
                style={{
                  height: "65vh",
                  overflow: "auto",
                  marginTop: 20,
                }}
              >
                <AdvanceTable
                  deleteFacultyProp={(item) => deleteFacultyFun(item)}
                  editFacultyProp={(item) => editFaculty(item)}
                  data={listOfFaculty}
                />
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    ADD NEW
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Event:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Event Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup ? (
          <AddFacultyDetails
          isEdit ={IsEdit}
            item={assessment}
            closePopup={togglePopup}
            faculty={faculty}
          />
        ) : null}
      </div>
    );
  };

  // template
  return (
    // onWheel={()=> {dispatch(fetchProducts("Sarees"));}}
    <div>{renderItems()}</div>
  );
};
export default FacultyDetails;
