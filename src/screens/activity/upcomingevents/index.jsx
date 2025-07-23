import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import "./styles.css";
import NewItem from "./newitem/index";
import {
  fetchActivities,
  activitySelector,
  deleteActivity,
} from "../../../app/redux/slices/activitySlice";
import Popup from "reactjs-popup";
import AdvanceTable from "./advanceTable";
//import { ProjectModel } from "../..";

const Events = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, activityList } = useSelector(activitySelector);

  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [activity, setactivity] = useState();
  const [listOfActivity, setlistOfActivity] = useState(activityList || []);
  const [IsEdit, setIsEdit] = useState(false);
 /* const mokData = [
    {
      activityID: 2,
      activityName: "Project/Model",
      createdBy: "",
      createdDate: "2022-05-27T12:00:39.209Z",
      data: '{"activityID":2,"Topic":"cloud computing","Abstract":"sd","Event":"sf","OrganizedBy":"df","Venue":"qw","Prize":"1","FromDate":"2022-05-28T00:00:00.000Z","ToDate":"2022-05-29T00:00:00.000Z","Impact":"rd","studentORFaculty":"Student","InternalOrExternal":"Internal","OnlineOrOffline":"Offline","blended":true,"Attachment":"","StudentID":[{"studentID":"1313205","studentName":"Nandhini  K","departmentName":"English"}],"FacultyID":[]}',
      filePath: "",
      id: 0,
      modifiedBy: null,
      modifiedDate: null,
    },
  ];*/

  const togglePopup = () => {
    onAssessmentSelection("Upcoming Events Model");
    setshowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setactivity();
    }
  };

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  // fetch data from our store

  //console.log(activityList);

  const deleteActivityFun = (item) => {
    // console.log(item, "deleteActivityFun");
    dispatch(deleteActivity(item.id,48,null));
  };

  const editActivity = (item) => {
    // console.log(item, "editActivity");
    setactivity({ ...item, data: JSON.parse(item.data) });
    setshowPopup(!showPopup);
    setIsEdit(true);
  };

  useEffect(() => {
    getActivityData();
  }, []);
  const getActivityData = () => {
    console.log("manoj");
    dispatch(fetchActivities(48, null));
  };

  useEffect(() => {
    if (!activityList) {
      return;
    }
    setlistOfActivity(activityList);
  }, [activityList]);

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
            <h2 className="heading col pt-2">Upcoming Events</h2>
            <div className="but col text-end">
            {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
              <button
                onClick={() => togglePopup()}
                className="btn btn-lg btn-success btn-block form-roundedbtn3"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
               <i className="fa fa-plus"></i> ADD NEW
               
              </button>
              :null}
              {/* <button
                className="btn btn-lg btn-warning btn-block form-roundedbtn4"
                type="submit"
              >
                <span className="glyphicon glyphicon-edit"></span> EDIT
              </button> */}
              {/*<button
                className="btn btn-lg btn-secondary btn-block form-roundedbtn2"
                type="submit"
              >
                <span className="glyphicon glyphicon-remove"></span> DELETE
            </button>*/}
            </div>
          </div>
          <div className="bootstrap-table">
            <div className="fixed-table-container">
              <div className="fixed-table-body">
                <AdvanceTable
                  deleteActivityProp={(item) => deleteActivityFun(item)}
                  editActivityProp={(item) => editActivity(item)}
                  data={listOfActivity}
                />
              </div>
            </div>
          </div>

          {/*<div
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
                        Topic:
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
          </div>*/}
        </div>
        {showPopup ? (
          <NewItem
          isEdit={IsEdit}
            item={assessment}
            closePopup={togglePopup}
            activity={activity}
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
export default Events;
