import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import AddSectionStudMappings from "./addSectionStudentMapping/index";
import {
  fetchSectionStuds,
  sectionStudSelector,
  deleteSectionStud
} from "../../app/redux/slices/sectionStudentMappingSlice";

import Popup from "reactjs-popup";
import AdvanceTable from "./advanceTable";

import { API } from "../../app/services/endpoints";
import { AsyncGet } from "../../app/services/https";

const SectionStudMappings = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, sectionStudList } = useSelector(sectionStudSelector);

  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [sectionStud, setSectionStud] = useState();
  const [listOfSectionStuds, setlistOfSectionStuds] = useState(sectionStudList || []);
  const [BatchDetailsList, setBatchDetailsList] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  console.log("List from State", sectionStudList);

  const togglePopup = () => {
    onAssessmentSelection("SectionStud Details");
    setshowPopup(!showPopup);
    setIsEdit(false);
    if (!showPopup) {
      setSectionStud();
    }
  };

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  // fetch data from our store

  // console.log(loading);
  console.log("Fetch data from Store", sectionStudList);

  const deleteSectionStudFun = (item) => {
    debugger
    var ids = item.map(x => x.Id);
    var SectionId = item[0].SectionId;
    dispatch(deleteSectionStud(ids,SectionId ));
  };

  const editSectionStud = (item) => {
    setSectionStud({ ...item, data: item });
    setshowPopup(!showPopup);
    setIsEdit(true);
  };

  useEffect(() => {
    getSectionStudData();
  }, []);

  const getSectionStudData = () => {
    dispatch(fetchSectionStuds());
  };

  useEffect(() => {
    debugger;
    if (!sectionStudList) {
      return;
    }
    AsyncGet(API.Section)
      .then((res) => {
        console.log(res.data, "get Batches");
        setBatchDetailsList(res.data);
        localStorage.setItem("SectionDetails", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setlistOfSectionStuds(sectionStudList);
  }, [sectionStudList]);

  console.log("Before Render sectionStudList", sectionStudList);
  console.log("Before Render listOfSectionStud", listOfSectionStuds);

  // render the items
  const renderItems = () => {
    console.log("inside render method", listOfSectionStuds);
    //loading state
    if (loading) return <strong>Loading please wait...</strong>;

    // error state
    if (error) return <strong>Items not available at this time</strong>;

    // regular data workflow
    return (

      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">Section Student Details</h2>
            <div className="but col text-end">
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
            </div>
          </div>
          <div className="bootstrap-table">
            <div className="fixed-table-toolbar">
            </div>
            <div className="fixed-table-container">
              <div className="fixed-table-body">
                {console.log("inside return method", listOfSectionStuds)}
                <AdvanceTable
                  deleteSectionStudProp={(item) => deleteSectionStudFun(item)}
                  editSectionStudProp={(item) => editSectionStud(item)}
                  data={listOfSectionStuds}
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
          <AddSectionStudMappings
            isEdit={IsEdit}
            item={assessment}
            closePopup={togglePopup}
            sectionStud={sectionStud}
          />
        ) : null}
      </div>
    );
  };


  return (
    <div>{renderItems()}</div>
  );
};
export default SectionStudMappings;
