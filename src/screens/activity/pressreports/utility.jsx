import React, { useState } from "react";

import { CSVLink, CSVDownload} from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


export const ExportToCsv = ({ data }) => {
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ];
  const csvData = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];

  //   const csvFormatedData = data?.map((item) => {
  //     const mainFields = { ...item, data: "" };
  //     return {};
  //   });

  const processData = () => {
    let processedData = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      let newObj = { ...obj };
      if (obj.studentID && obj.studentID[0]?.studentName) {
        newObj = { ...newObj, studentID: obj.studentID[0]?.studentName };
      }
      if (obj.facultyID && obj.facultyID[0]?.facultyName) {
        newObj = { ...newObj, facultyID: obj.facultyID[0]?.facultyName };
      }
      if (obj.alumniID && obj.alumniID[0]?.alumniName) {
        newObj = { ...newObj, alumniID: obj.alumniID[0]?.alumniName };
      }
      processedData.push(newObj);
    }
    return processedData;
  };

  return (
    <CSVLink
      filename={"table-data.csv"}
      className="btn btn-success"
      style={{ height: "33px", marginRight: "5px", width: "98%" }}
      data={processData()}
      type="button"
    >
      Generate Excel
    </CSVLink>
  );
};
// ========================================================

export const ExportToPdf = ({ data }) => {
  const [people, setpeople] = useState([
    { name: "Keanu Reeves", profession: "Actor" },
    { name: "Lionel Messi", profession: "Football Player" },
    { name: "Cristiano Ronaldo", profession: "Football Player" },
    { name: "Jack Nicklaus", profession: "Golf Player" },
  ]);

  const exportPDF = () => {
    let processedData = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      let newObj = { ...obj };
      if (obj.studentID[0]?.studentName) {
        newObj = { ...newObj, studentID: obj.studentID[0]?.studentName };
      }
      if (obj.facultyID[0]?.facultyName) {
        newObj = { ...newObj, facultyID: obj.facultyID[0]?.facultyName };
      } else {
        newObj = { ...newObj, facultyID: "" };
      }
      processedData.push(newObj);
    }

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "My Awesome Report";
    const headersData = Object.keys(data[0]);
    const headers = [headersData];
    const body = processedData.map((elt) => Object.values(elt));

    let content = {
      startY: 50,
      head: headers,
      body: body,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };
  return (
    <div>
      <button
        className="btn btn-warning w-100"
        style={{ height: "33px" }}
        type="button"
        onClick={() => exportPDF()}
      >
        Generate PDF
      </button>
    </div>
  );
};
// class ExportToPdf extends React.Component {

//     constructor() {
//       super();
//       this.state = {
//         people: [
//           { name: "Keanu Reeves", profession: "Actor" },
//           { name: "Lionel Messi", profession: "Football Player" },
//           { name: "Cristiano Ronaldo", profession: "Football Player" },
//           { name: "Jack Nicklaus", profession: "Golf Player" },
//         ]
//       }
//     }

//     exportPDF = () => {
//       const unit = "pt";
//       const size = "A4"; // Use A1, A2, A3 or A4
//       const orientation = "portrait"; // portrait or landscape

//       const marginLeft = 40;
//       const doc = new jsPDF(orientation, unit, size);

//       doc.setFontSize(15);

//       const title = "My Awesome Report";
//       const headers = [["NAME", "PROFESSION"]];

//       const data = this.state.people.map(elt=> [elt.name, elt.profession]);

//       let content = {
//         startY: 50,
//         head: headers,
//         body: data
//       };

//       doc.text(title, marginLeft, 40);
//       doc.autoTable(content);
//       doc.save("report.pdf")
//     }

//     render() {
//       return (
//         <div>
//           <button onClick={() => this.exportPDF()}>Generate Report</button>
//         </div>
//       );
//     }
//   }

//   export default ExportToPdf;
