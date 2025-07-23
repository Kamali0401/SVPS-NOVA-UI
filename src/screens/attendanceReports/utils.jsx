import { memo } from "react";
import { CSVLink } from "react-csv";

const RenderIf = ({ children, isTrue }) => {
  return isTrue ? children : null;
};

export default memo(RenderIf);

export const ExportToCsv = ({ data, hours }) => {
  const headers = () => {
    let headers = [{ label: "Student ID", key: "studentList" }];
    Object.values(data)[0]?.map((item, index) =>
      headers.push({
        label: `${item.subjectCode}-${hours}hr`,
        key: "isPresent",
      })
    );
    return headers;
  };

  const csvData = () => {
    debugger;
    let body = [];

    Object.values(data).map((_item, idx) => {
      for (let i = 0; i < _item.length; i++) {
        const obj = _item[i];
        body.push({
          studentList: obj.rollNo,
          isPresent: `${obj.isPresent == 1 ? "Present" : "Absent"}`,
        });
      }
    });
    return body;
  };

  return (
    <CSVLink
      filename={"table-data.csv"}
      className="btn btn-success"
      // style={{
      //   marginRight: "5px",
      //   width: "100%",
      //   height: "55%",
      // }}
      headers={headers()}
      data={csvData()}
      type="button"
    >
      Generate Excel
    </CSVLink>
  );
};
