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

const PressReports = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, activityList } = useSelector(activitySelector);

  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [activity, setactivity] = useState();
  const [listOfActivity, setlistOfActivity] = useState(activityList || []);
  const [IsEdit, setIsEdit] = useState(false);
  const togglePopup = () => {
    onAssessmentSelection("Press Reports");
    setshowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setactivity();
    }
  };

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  const deleteActivityFun = (item) => {
    dispatch(
      deleteActivity(
        item.id,
        46,null
        //JSON.parse(localStorage.getItem("user")).departmentId
      )
    );
  };

  const editActivity = (item) => {
    setactivity({ ...item, data: JSON.parse(item.data) });
    setshowPopup(!showPopup);
    setIsEdit(true);
  };

  const getActivityData = () => {
    console.log("manoj");
    dispatch(
      fetchActivities(46,null)
    );
  };

  useEffect(() => {
    getActivityData();
  }, []);

  useEffect(() => {
    if (!activityList) {
      return;
    }
    setlistOfActivity(activityList);
  }, [activityList]);

  // render the items
  const renderItems = () => {
    if (loading) return <strong>Loading please wait...</strong>;
    if (error) return <strong>Items not available at this time</strong>;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">Press Reports</h2>
            <div className="but col text-end">
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
  return <div>{renderItems()}</div>;
};
export default PressReports;
