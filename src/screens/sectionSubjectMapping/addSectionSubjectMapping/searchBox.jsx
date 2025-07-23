import React, { useEffect, useState } from "react";

const SearchBox = ({
  options,
  onInputChange,
  onChangeList,
  selectedOptions,
  reset,
  type,
}) => {
  const [inputTxt, setinputTxt] = useState("");
  const [showOptions, setshowOptions] = useState(false);
  const [selectedOpt, setselectedOpt] = useState(selectedOptions);

  const addOption = (opt) => {
    debugger;
    let optPresent;
    if (selectedOptions?.length > 0 && opt && opt?.studentID) {
      optPresent = selectedOptions.find(
        (itm) => itm.studentID === opt.studentID
      );
    }
    if (selectedOptions?.length > 0 && opt && opt?.facultyID) {
      optPresent = selectedOptions.find(
        (itm) => itm.facultyID === opt.facultyID
      );
    }
    if (optPresent) {
      alert("The Name is already selected");
      return;
    }
    const newList = selectedOpt ? [...selectedOpt, opt] : [opt];
    setselectedOpt(newList);
    setshowOptions(false);
    setinputTxt("");
  };

  const deleteOption = (opt) => {
    const oldList = [...selectedOpt];
    let newList;
    if (type === "student") {
      newList = oldList.filter((o) => o.studentID !== opt.studentID);
    }
    if (type === "faculty") {
      newList = oldList.filter((o) => o.facultyID !== opt.facultyID);
    }

    if (newList?.length < 1) {
      onChangeList([]);
    }
    setselectedOpt(newList || []);
    setinputTxt("");
  };

  const onChangeInput = (e) => {
    setshowOptions(true);
    setinputTxt(e.target.value);
    onInputChange(e.target.value);
  };

  useEffect(() => {
    if (selectedOpt?.length > 0 && selectedOpt) {
      onChangeList(selectedOpt);
	return;
    }
  }, [selectedOpt]);

  useEffect(() => {
    setselectedOpt(selectedOptions);
  }, [selectedOptions]);
 useEffect(() => {
    onChangeList([]);
    setselectedOpt(null);
    setshowOptions(false);
    setinputTxt("");
  }, [reset]);

  return (
    <div className="searchBox">
      <input
        className="form-control"
        type="text"
        id="abstract"
        placeholder="select"
        value={inputTxt}
        onChange={(e) => onChangeInput(e)}
      />
      {showOptions && inputTxt ? (
        <div className="optionsBlock">
          {options?.length > 0 ? (
            options.map((opt, i) => {
              return (
                <div className="options" key={i} onClick={() => addOption(opt)}>
                  <label>{opt.studentID || opt.facultyID} : {opt.studentName || opt.facultyName}</label>
                </div>
              );
            })
          ) : (
            <div className="options">
              <label>No Options</label>
            </div>
          )}
        </div>
      ) : null}
      <div className="d-flex flex-wrap">
        {selectedOpt?.length > 0 &&
          selectedOpt.map((opt, i) => {
            return (
              <div className="d-flex selected-id-box" key={i}>
                <p className="label">{`${
                  opt.studentName || opt.facultyName
                } : ${opt.studentID || opt.facultyID}`}</p>
                <div className="ms-3" onClick={() => deleteOption(opt)}>
                  x
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBox;
