import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AsyncGet , AsyncPost,AsyncGetFiles} from "../../app/services/https";
import { API } from "../../app/services/endpoints";

import AddTimetableDetails from "./addTimetableDetails/index";
import AdvanceTable from "./advanceTable";
import {
  fetchTimetables,
  TimetableSelector,
  deleteTimetableDetails,
} from "../../app/redux/slices/timetableSlice";

import Popup from "reactjs-popup";

const TimetableDetails = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, timetableList } = useSelector(TimetableSelector);
  const [IsEdit, setIsEdit] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [timetables, setTimetable] = useState();
  const [listOfTimetable, setlistOfTimetable] = useState(timetableList || []);
  const [selectedFile, setselectedFile] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const togglePopup = () => {
    debugger;
    onAssessmentSelection("Timetable Details");

    setshowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setTimetable();
    }
  };

  

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  // fetch data from our store

  // console.log(loading);
  console.log("Fetch data from Store", timetableList);

  const deleteTimetableFun = (item) => {
    debugger;
    dispatch(deleteTimetableDetails(item.id));
  };

  const editTimetable = async (item) => {
    debugger;
    setTimetable({ ...item, data: item });
    setshowPopup(!showPopup);
    setIsEdit(true);
  };

  useEffect(() => {
    getTimetableData();
  }, []);
  
  const getTimetableData = async () => {
    dispatch(fetchTimetables());
  };
  const onFileChange = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const downloadFileFun = async () => {

    AsyncGetFiles(API.DownloadTemplate )

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
  const onFileUpload = async (res) => {
      debugger;
      
  
      if(selectedFile[0].name == "Timetable.csv")
      {
        debugger;
        console.log(res, "response");
      
        const formData = new FormData();
        for (let index = 0; index < selectedFile.length; index++) {
          const fileUploaded = selectedFile[index];
          
          formData.append("FormFiles", fileUploaded);
        }
    
        formData.append("TypeofUser", 'Timetables');
        
      try {
        debugger
        const res = await AsyncPost(API.bulkupload, formData);  
        alert(res.data); 
        dispatch(fetchTimetables);
        
        window.location.reload(true);
  
      } catch (ex) {
        //alert(ex)
        console.log(ex);
      }
  
      }
      else{
        alert('File Name should be TImetable.csv only')
      }
    
  
    };
  useEffect(() => {
    if (!timetableList) {
      return;
    }
    setlistOfTimetable(timetableList);
  }, [timetableList]);

  console.log("Before Render timetableList", timetableList);
  console.log("Before Render listOfRole", listOfTimetable);

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
            <h2 className="heading col pt-2">Timetable Details</h2>
            <div className="but col text-end">
             <button
                onClick={() => togglePopup()}
                className="btn form-roundedbtn3 buttonW"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
                style={{ color: "white" ,width:"360px !important"}}
              >
              <i className="fa fa-plus"></i> ADD NEW
              </button>

              <button
                className="btn form-roundedbtn2 buttonW"
                type="button"
                style={{ color: "white" ,width:"360px !important",height:"50px"}}
                onClick={downloadFileFun}
              >
                <i className="fa fa-download"></i> Template
              </button>
            </div>
          </div>
          <h4 class= "w-100  fw-bold mb-0 blue-heading">Bulk Upload</h4>
          {/*<div className="row formadduser">*/}
          <div className="col-xs-3 col-md-3 col-lg-3 col-sm-12  form-group">
          {/*<h6 className="heading col pt-2">Bulk Upload</h6>*/}
              
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
                <span className="glyphicon glyphicon-remove"></span>Upload
              </button>

          <div className="bootstrap-table">
            <div className="fixed-table-toolbar">
            </div>
            <div className="fixed-table-container">
              <div className="fixed-table-header">
                <table></table>
              </div>
              <div className="fixed-table-body">
              <AdvanceTable
                  deleteTimetableProp={(item) => deleteTimetableFun(item)}
                  editTimetableProp={(item) => editTimetable(item)}
                  data={listOfTimetable}
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
                        timetables Id:
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
                        timetables Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Event Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div> */}
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
          <AddTimetableDetails
          isEdit={IsEdit}
            item={assessment}
            closePopup={togglePopup}
            timetables={timetables}
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
export default TimetableDetails;
