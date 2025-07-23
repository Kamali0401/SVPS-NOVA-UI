import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import mokdata1 from "./data.json";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import logoBlob from "../../../assets/logoBlob.json";
import { activity_opts, MainOptionsList } from "./optionsVar";

const ExcelJS = require("exceljs");

const GridTable = ({ activityName, gridBigData }) => {
  const { department } = JSON.parse(localStorage.getItem("user"));
  // const gridBigData = mokdata1;
  const [rowData, setrowData] = useState();
  const [headerData, setheaderData] = useState();
  const [title, settitle] = useState("");
  const [showModel, setshowModel] = useState(false);
  const gridRef = useRef();
  const formRef = useRef();

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const formatHeader = (fieldName) => {
    const pattren1 = new RegExp(/(^n[A-Z])/, "g");
    const pattren3 = new RegExp(/(^n\s)/, "g");
    if (pattren1.test(fieldName)) {
      let name = fieldName.replace(/([A-Z][A-Za-z])/g, " $1");
      return pattren3.test(name)
        ? name.replace(/(^n\s)/g, "Total No of ").toUpperCase()
        : name.toUpperCase();
    }
    // if (pattren.test(fieldName)) {
    //   return fieldName.replace(/([A-Z][A-Za-z])/g, " $1").toUpperCase();
    // }
    return fieldName.replace(/([A-Z][A-Za-z])/g, " $1").toUpperCase();
  };

  const exportCsv = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet", {
      properties: {
        defaultRowHeight: 60,
        defaultColWidth: "auto",
        outlineLevelRow: 1,
      },
    });

    const ROW = rowData;
    const HEADER = headerData;
    var workseetColumns = [];

    const logoid = workbook.addImage({
      base64: logoBlob.data,
      extension: logoBlob.extension,
    });

    HEADER.forEach((c) => {
      if (!columnVisibilityModel.hasOwnProperty(c.field)) {
        workseetColumns.push({
          header: formatHeader(c.field),
          key: c.field,
        });
      } else if (columnVisibilityModel[c.field] === true) {
        workseetColumns.push({
          header: formatHeader(c.field),
          key: c.field,
        });
      }
    });

    const headerLength =
      workseetColumns.length > 6 ? workseetColumns.length : 6;
    const quo =
      Math.floor(headerLength / 3) > 2 ? Math.floor(headerLength / 3) : 2;
    const rem = headerLength % 3;

    // console.log(quo, rem);

    const merge1 = quo;
    const merge2 = merge1 + quo + rem;
    const merge3 = merge2 + quo;
    if (headerLength < 9) {
      worksheet.getRows(1, 8).border = {
        top: { style: "thin", color: { argb: "0000" } },
        left: { style: "thin", color: { argb: "0000" } },
        bottom: { style: "thin", color: { argb: "0000" } },
        right: { style: "thin", color: { argb: "0000" } },
      };
    }

    // worksheet.columns = workseetColumns;
    // worksheet.addRows(rowDataWithOutImgData);
    // worksheet.spliceRows(1, 0, []);
    // worksheet.spliceRows(2, 0, []);
    worksheet.mergeCells(1, 1, 1, merge1);
    worksheet.getCell(1, 1).border = {
      top: { style: "thin", color: { argb: "0000" } },
      left: { style: "thin", color: { argb: "0000" } },
      bottom: { style: "thin", color: { argb: "0000" } },
      right: { style: "thin", color: { argb: "0000" } },
    };
    worksheet.mergeCells(1, merge1 + 1, 1, merge2);
    worksheet.getCell(1, merge1 + 1).border = {
      top: { style: "thin", color: { argb: "0000" } },
      left: { style: "thin", color: { argb: "0000" } },
      bottom: { style: "thin", color: { argb: "0000" } },
      right: { style: "thin", color: { argb: "0000" } },
    };
    worksheet.mergeCells(1, merge2 + 1, 1, merge3);
    worksheet.getCell(1, merge2 + 1).border = {
      top: { style: "thin", color: { argb: "0000" } },
      left: { style: "thin", color: { argb: "0000" } },
      bottom: { style: "thin", color: { argb: "0000" } },
      right: { style: "thin", color: { argb: "0000" } },
    };
    worksheet.mergeCells(2, 1, 2, headerLength);
    worksheet.getCell(2, headerLength).border = {
      top: { style: "thin", color: { argb: "0000" } },
      left: { style: "thin", color: { argb: "0000" } },
      bottom: { style: "thin", color: { argb: "0000" } },
      right: { style: "thin", color: { argb: "0000" } },
    };
    // const rows = worksheet.getRows(2, ROW.length + 1);
    worksheet.getCell(1, merge1 + 1).value = activityName
      .replace(/[A-Z]/g, " $&")
      .trim()
      .toUpperCase();
    worksheet.getCell(1, merge2 + 1).value = `Department : ${department}` || "";

    worksheet.getCell("A2").value = title.toUpperCase();
    worksheet.getRow(1).font = { bold: true, size: 13 };
    worksheet.getRow(1).height = 60;
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.getRow(2).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getRow(2).font = { bold: true, size: 13 };
    worksheet.getRow(3).font = { bold: true, size: 10 };
    worksheet.getRow(2).height = 60;
    console.log(worksheet.getRow(1));

    // ["A1", "H1", "O1", "A2"].forEach((cell) => {
    //   worksheet.getCell(cell).border = {
    //     top: { style: "thin", color: { argb: "0000" } },
    //     left: { style: "thin", color: { argb: "0000" } },
    //     bottom: { style: "thin", color: { argb: "0000" } },
    //     right: { style: "thin", color: { argb: "0000" } },
    //   };
    // });

    worksheet.addImage(logoid, {
      tl: { col: 0.1, row: 0.4 },
      ext: { width: 200, height: 45 },
    });
    // worksheet.getCell(1, merge2 + 1).alignment = { wrapText: true };

    const rowDataWithImgId = ROW.forEach((item, rowIndex) => {
      workseetColumns.forEach((column, columnIndex) => {
        const trimed = column.key.slice(0, -1);
        if (trimed == "image" && item[column.key]) {
          let imgId = workbook.addImage({
            base64: `data:image/png;base64,${item[column.key]}`,
            extension: "png",
          });
          worksheet.addImage(imgId, {
            tl: { col: columnIndex + 0.1, row: rowIndex + 3.3 },
            ext: { width: 30, height: 30},
          });
        } else {
          
          worksheet.getRow(rowIndex + 4).getCell(columnIndex + 1).value =
            item[column.key];
        }
        worksheet.getRow(rowIndex + 4).getCell(columnIndex + 1).border = {
          top: { style: "thin", color: { argb: "0000" } },
          left: { style: "thin", color: { argb: "0000" } },
          bottom: { style: "thin", color: { argb: "0000" } },
          right: { style: "thin", color: { argb: "0000" } },
        };
        worksheet.getRow(rowIndex + 4).getCell(columnIndex + 1).alignment = {
          wrapText: true,
          horizontal: "center",
          vertical: "middle",
          //height: "60px",        
        };
        worksheet.getRow(rowIndex + 4).height = 60;
      
      });
    });
    workseetColumns.forEach((column, index) => {
      worksheet.getRow(3).getCell(index + 1).value = column.header;
      worksheet.getRow(3).getCell(index + 1).border = {
        top: { style: "thin", color: { argb: "0000" } },
        left: { style: "thin", color: { argb: "0000" } },
        bottom: { style: "thin", color: { argb: "0000" } },
        right: { style: "thin", color: { argb: "0000" } },
      };
      worksheet.getRow(3).getCell(index + 1).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });
    // worksheet.columns.forEach((column) => {
    //   let maxLength = 0;
    //   column.values.map((itm, index) => {
    //     if (index == 3 && itm) {
    //       maxLength = itm?.toString().length + 3;
    //     }
    //   });
    //   column.width = maxLength < 5 ? 10 : maxLength;
    // });
    for (let i = 0; i < worksheet.columns.length; i += 1) { 
      let dataMax = 0;
      const column = worksheet.columns[i];
      
      for (let j = 1; j < column.values.length; j += 1) {
        const columnLength = column.values[j]?.length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      }
       column.width = dataMax < 10 ? 10 : dataMax;
      // column.wrapText = true;
    }
    workbook.xlsx
      .writeBuffer({
        base64: true,
      })
      .then(function (xls64) {
        // build anchor tag and attach file (works in chrome)
        var a = document.createElement("a");
        var data = new Blob([xls64], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        var url = URL.createObjectURL(data);
        a.href = url;
        a.download = "export.xlsx";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
        setshowModel(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const addMultipleImages = (files) => {
    // debugger;
    let images = {};
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        images[`image${i + 1}`] = element;
        if(i == 8)
        {
          i= files.length;
        }
        // images[`image${i + 1}`] = "";
      }
    }
    console.log("ActivityImages",images);
    return images;
  };

  const addMultipleusers = (users) => {
    // debugger;
    let _users = "";
    if(activityName == 'NCC' || activityName =='NSS' || activityName == 'PatentDetails' || activityName == 'SportsAndGames'
    || activityName == 'Awards' || activityName == 'Events'|| activityName == 'WomenInDevelopment'|| activityName == 'SymposiumAndExpos'|| activityName == 'ProjectorModel' 
    || activityName == 'FacultyDevelopment'|| activityName == 'Consultancy')
    {
      users.forEach((u, idx) => {
        console.log(u, idx, "idx");
        if (idx) {
          _users =
            _users + ",\n" + (u.studentName || u.facultyName || u.alumniName)+"-"+(u.departmentName);
          return;
        }
        _users = (u.studentName || u.facultyName || u.alumniName)+"-"+(u.departmentName);
      });
    }
    else{
      users.forEach((u, idx) => {
        console.log(u, idx, "idx");
        if (idx) {
          _users =
            _users + ",\n" + (u.studentName || u.facultyName || u.alumniName);
          return;
        }
        _users = u.studentName || u.facultyName || u.alumniName;
      });
    }
    
    return _users;
  };

  const processData = (data) => {
    let processedData = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];

      let newObj = { sno: i + 1, ...obj };
      if (obj.studentID?.length > 0) {
        const imgs = addMultipleImages(obj.fileBlob);
        newObj = {
          ...newObj,
          studentID: addMultipleusers(obj.studentID),
          facultyID: "",
          ...imgs,
        };
        delete newObj["fileBlob"];
      }
      if (obj.facultyID?.length > 0) {
        const imgs = addMultipleImages(obj.fileBlob);

        newObj = {
          ...newObj,
          studentID: "",
          facultyID: addMultipleusers(obj.facultyID),
          ...imgs,
        };
        delete newObj["fileBlob"];
      }
      if (obj.alumniID?.length > 0) {
        const imgs = addMultipleImages(obj.fileBlob);

        newObj = {
          ...newObj,
          alumniID: addMultipleusers(obj.alumniID),
          ...imgs,
        };
        delete newObj["fileBlob"];
      } else {
        const imgs = addMultipleImages(obj.fileBlob);

        newObj = {
          ...newObj,
          // alumniID: obj.alumniID[0]?.alumniName || "NaN",
          // fileBlob: "",
          ...imgs,
        };
        delete newObj["fileBlob"];
      }
      processedData.push(newObj);
    }
    return processedData;
  };

  useEffect(() => {
    const data = gridBigData; //remove this line
    if (!data && data.length < 1) {
      return;
    }
    const newData = processData(data);
    const longObject = newData.reduce((a, b) =>
      Object.keys(a).length > Object.keys(b).length ? a : b
    );
    const headers = Object.keys(longObject).map((itm, ix) => {
      const trimed = itm.slice(0, -1);
      if (trimed == "image") {
        return {
          field: itm,
          headerName: itm.toUpperCase(),
          minWidth: 70,
          width: 70,
          renderCell: (params) => {
            return params.value ? (
              <img
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                src={`data:image/png;base64,${params.value}`}
              />
            ) : null;
          },
        };
      }
      return { field: itm, headerName: formatHeader(itm) };
    });
    setheaderData(headers);
    setrowData(newData);

  }, []);
console.log("rowData",rowData);
  useEffect(() => {
    let handler = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setshowModel(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <button
          className="btn btn-success my-1"
          type="button"
          onClick={() => setshowModel(true)}
        >
          Generate Excel
        </button>
      </div>
      <div style={{ height: "90%", width: "100%" }}>
        {rowData && headerData ? (
          <DataGrid
            getRowId={(row) => row.sno}
            ref={gridRef}
            rows={rowData}
            pagination
            autoHeight
            columns={headerData}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel);
            }}
            sx={{
              "	.MuiTablePagination-selectLabel": {
                margin: "auto",
              },
              "	.MuiTablePagination-displayedRows": {
                margin: "auto",
              },
            }}
            // components={{ Toolbar: GridToolbar }}
          />
        ) : null}
      </div>
      {showModel && (
        <div className="popup_window">
          <div ref={formRef} className="p-4 bg-white">
            <h5>Title</h5>
            <div className="d-flex align-item-center">
              <input
                type={"text"}
                placeholder="Enter title"
                onChange={(e) => settitle(e.target.value)}
              />
              <button
                disabled={!title}
                className="btn btn-primary ms-3"
                type="button"
                onClick={exportCsv}
              >
                Add & Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default GridTable;
