import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import AddHouseActivityDetails from "./addHouseActivityDetails/index";
import AdvanceTable from "./advanceTable";
import {
  fetchHouseActivity,
  houseActivitySelector,
  deleteHouseActivity,
} from "../../app/redux/slices/houseActivitySlice";
import { AsyncGet } from "../../app/services/https";
import { API } from "../../app/services/endpoints";

const HouseActivityDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, houseActivityList } = useSelector(houseActivitySelector);

  const [isEdit, setIsEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [houseActivity, setHouseActivity] = useState();
  const [listOfHouseActivity, setListOfHouseActivity] = useState(houseActivityList || []);

  // Fetch initial data
  useEffect(() => {
    debugger;
    dispatch(fetchHouseActivity());
  }, [dispatch]);

  // Update local list when store changes
  useEffect(() => {
    if (!houseActivityList) return;
    setListOfHouseActivity(houseActivityList);
  }, [houseActivityList]);

  // Toggle Add/Edit popup
  const togglePopup = () => {
    setAssessment("HouseActivity Details");
    setShowPopup(prev => !prev);
    setIsEdit(false);
    if (!showPopup) {
      setHouseActivity();
    }
  };

  
  

  // Delete handler
  const deleteHouseActivityFun = (item) => {
    dispatch(deleteHouseActivity(item.id));
  };

  // Edit handler
  const editHouseActivity = (item) => {
    setHouseActivity({ ...item, data: item });
    setShowPopup(true);
    setIsEdit(true);
  };

  const renderItems = () => {
    if (loading) return <strong>Loading please wait...</strong>;
    if (error) return <strong>Items not available at this time</strong>;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">House Activity</h2>
            <div className="but col text-end">
              <button
                onClick={togglePopup}
                className="btn btn-lg btn-success btn-block form-roundedbtn3 buttonW"
                type="button"
              >
                <i className="fa fa-plus"></i> ADD NEW
              </button>

              
            </div>
          </div>

          <div className="bootstrap-table">
            <div className="fixed-table-toolbar"></div>
            <div className="fixed-table-container">
              <div className="fixed-table-body">
                <AdvanceTable
                  deleteHouseActivityProp={deleteHouseActivityFun}
                  editHouseActivityProp={editHouseActivity}
                  data={listOfHouseActivity}
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
                  <h5 className="modal-title" id="exampleModalLabel">ADD NEW</h5>
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
                      <label htmlFor="recipient-id" className="col-form-label">Id:</label>
                      <input type="text" className="form-control" id="recipient-id" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-code" className="col-form-label">HouseActivity Code:</label>
                      <input type="text" className="form-control" id="recipient-code" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label">HouseActivity Name:</label>
                      <input type="text" className="form-control" id="recipient-name" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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

        {showPopup && (
          <AddHouseActivityDetails
            isEdit={isEdit}
            item={assessment}
            closePopup={togglePopup}
            houseactivity={houseActivity}
          />
        )}
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};

export default HouseActivityDetails;
