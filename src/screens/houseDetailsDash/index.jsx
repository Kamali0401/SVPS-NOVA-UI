import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncGetFiles, AsyncPost } from "../../app/services/https";
import { API } from "../../app/services/endpoints";

import AddHouseDetails from "./addHouseDetails";
import AdvanceTable from "./advanceTable";
import {
  fetchHouses,
  HouseSelector,
  deleteHouseDetails,
} from "../../app/redux/slices/houseSlice";

const HouseDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, houseList } = useSelector(HouseSelector);

  const [isEdit, setIsEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [assessment, setAssessment] = useState("House Details");
  const [houses, setHouse] = useState();
  const [listOfHouse, setListOfHouse] = useState(houseList || []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const togglePopup = () => {
    setAssessment("House Details");
    setShowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setHouse();
    }
  };

  const deleteHouse = (item) => {
    dispatch(deleteHouseDetails(item.id));
  };

  const editHouse = (item) => {
    debugger;
    setHouse({ ...item, data: item });
    setShowPopup(!showPopup);
    setIsEdit(true);
  };
  useEffect(() => {
    getHouseData();
  }, []);
  const getHouseData = () => {
    dispatch(fetchHouses());
  };

  

 
  

  useEffect(() => {
    if (!houseList) {
      return;
    }
    setListOfHouse(houseList);
  }, [houseList]);

  const renderItems = () => {
    if (loading) return <strong>Loading please wait...</strong>;
    if (error) return <strong>Items not available at this time</strong>;

    return (
      <div className="col-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">House Details</h2>
            <div className="but col text-end">
              <button
                onClick={togglePopup}
                className="btn form-roundedbtn3 buttonW me-2"
                style={{ color: "white" }}
              >
                <i className="fa fa-plus"></i> ADD NEW
              </button>
              
            </div>
          </div>

          <div className="bootstrap-table">
            <div className="fixed-table-toolbar">
            </div>
            <div className="fixed-table-container">
              <div className="fixed-table-body">
              <AdvanceTable
                  deleteHouseProp={(item) => deleteHouse(item)}
                  editHouseProp={(item) => editHouse(item)}
                  data={listOfHouse}
                />
              </div>
            </div>
          </div>
          </div>
        {showPopup && (
          <AddHouseDetails
            isEdit={isEdit}
            item={assessment}
            closePopup={togglePopup}
            house={houses}
          />
        )}
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};

export default HouseDetails;
