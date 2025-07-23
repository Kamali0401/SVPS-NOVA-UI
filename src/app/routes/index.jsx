import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import Loadable from "react-loadable";
import Layout from "../components/layout";

import {
  Home,
  
  Events,
  Attendance,
 // Advertisements,
  PressReports,
 // MOUs,
  UpcomingEvents,
} from "../../screens/";
import FacultyDetails from "../../screens/facultyDetailsDash";
import HolidayCalendar from "../../screens/HolidayCalendarDetails";
//import AdmissionDetails from "../../screens/admissionDetailsDash";
import StudentDetails from "../../screens/studentDetailsDash";
import SubjectDetails from "../../screens/subjectDetailsDash";
import UpcomingDetails from "../../screens/upcomingDetailsDash";
import RoleDetails from "../../screens/roleDetailsDash";
import ExamDetails from "../../screens/examDetailsDash";
//import BatchDetails from "../../screens/batchDetailsDash";
import BatchStudMappings from "../../screens/batchStudentMapping";
//import DeptStudMappings from "../../screens/deptStudentMapping";
//import BatchSubMappings from "../../screens/batchSubjectMapping";
import AttendancePage from "../../screens/activity/attendance";


import ReportPage from "../../screens/activity/reports";
import NewItem from "../components/item";
import AttendanceReports from "../../screens/attendanceReports";

//import StockReports from "../../screens/stockReports";

//import markreports from '../../screens/markReports/index';
import MarkReports from '../../screens/markReports';
import SectionSubjectMapping from '../../screens/sectionSubjectMapping';
import CollegeAnnouncement from '../../screens/announcement';
//import UpdateStudentSemDate from '../../screens/updateStudentSemDateDetails';
//import SendFeedBack from '../../screens/sendFeedbackDetails';
//import FeedbackReport from '../../screens/feedbackReports';
//import MemberDetails from "../../screens/OtherMemberDetails";
import SectionDetails from '../../screens/sectionDetailsDash';
import AccountDeletionPage from "../components/acoountdelection";
import TimetableDetails from '../../screens/timetableDetailsDash';
import HouseDetails from '../../screens/houseDetailsDash';
import HouseActivityDetails from '../../screens/houseactivityDetailsDash';
import AcademicCalendar from  "../../screens/AcademicCalendarDetails";
function Loading({ error }) {
  if (error) {
    return "Oh nooess!";
  } else {
    return <h3>Loading...</h3>;
  }
}
export const Path = {
  root: "/",
  welcome: "/welcome",
  home: "/home",
  productdetails: "/productdetails",
  salesdetails: "/sales",
  //checkout: "/checkout",
  myorders: "/myorders",
  product: "/newitem",
  login: "/login",
  activity: "/activity",
  //paperpresentation: "/paperpresentation" ,
  projectmodel: "/projectmodel",
  guestlectures: "/guestlectures",
  implanttraining: "/implanttraining",
  industrialvisit: "/industrialvisit",
  sportsandgames: "/sportsandgames",
  ncc: "/ncc",
  extensionservices: "/extensionservices",
  placement: "/placement",
  journalandbookpublication: "/journalandbookpublication",
  grants: "/grants",
  alumnievent: "/alumnievent",
  patent: "/patent",
  semester: "/semester",
  symposiumexpo: "/symposiumexpo",
  consultant: "/consultant",
  womenindevelopment: "/womenindevelopment",
  facultydevelopment: "/facultydevelopment",
  nss: "/nss",
  facultyDetails: "/facultyDetails",
  //admissionDetails: "/admissionDetails",
  studentDetails: "/studentDetails",
  
  subjectDetails: "/subjectDetails",
  upcomingDetails:"/upcomingDetails",
  
  events: "/events",

  pressreports: "/pressreports",

  roleDetails: "/roleDetails",
  examDetails:"/examDetails",
  
  departmentDetails: "/departmentDetails",
  roleActivity: "/roleActivity",
  //batchDetails: "/batchDetails",
  formRoleDetails: "/formRoleDetails",
  batchStudMapping: "batchStudMapping",
  //deptStudMapping: "deptStudMapping",
  //batchSubMapping: "/batchSubMapping",
  attendance: "/attendance",
  reports: "/reports",
  attendanceReports: "/attendanceReports",
  
  //stockreport: "/stockreport",

  markreports:"/markreports",

  sectionsubjectmapping:"/sectionsubjectmapping",
  announcement:"/announcement",
  //updateStudentSemDate:"/updateStudentSemDate",
//feedbackReport :"/feedbackReport",
  //sendFeedback:"/sendFeedback",
  upcomingevents: "/upcomingevents",
  //memberDetails:"/memberDetails",
  sectionDetails:"/sectionDetails",
   holidayCalendar:"/holidayCalendar",
   timetableDetails:"/timetableDetails",
   houseDetails:"/houseDetails",
   houseactivityDetails:"/houseactivityDetails",
academicCalendar:"/academicCalendar",
};

const Welcome = Loadable({
  loader: () => import("../../screens/welcome"),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import("../../screens/login"),
  loading: Loading,
});

// history={history}
class AppStackRoot extends Component {
  render() {
    console.log("rendering Layout");
    return (
      <Router>
        <Layout>
          <Routes>
            <Route exact path={Path.root} element={<Home />} />
            <Route exact path={Path.login} element={<Login />} />
            {/* <Route exact path={Path.activity} element={<Activity />} /> */}
            <Route exact path={Path.welcome} element={<Welcome />} />
            
            <Route
              exact
              path={Path.facultyDetails}
              element={<FacultyDetails />}
            />
            
            
            <Route
              exact
              path={Path.studentDetails}
              element={<StudentDetails />}
            />

           
            {/* <Route
              exact
              path={Path.miscellaneous}
              element={<Miscellaneous />}
            /> */}
          
            <Route exact path={Path.events} element={<Events />} />
           
            <Route exact path={Path.pressreports} element={<PressReports />} />
           
            <Route exact path={Path.upcomingevents} element={<UpcomingEvents />} />

            <Route
              exact
              path={Path.subjectDetails}
              element={<SubjectDetails />}
            />
           <Route
              exact
              path={Path.upcomingDetails}
              element={<UpcomingDetails />}
            />
            <Route exact path={Path.roleDetails} element={<RoleDetails />} />
            <Route exact path={Path.examDetails} element={<ExamDetails />} />
            
          
            <Route
              exact
              path={Path.batchStudMapping}
              element={<BatchStudMappings />}
            />
           
             <Route
              exact
              path={Path.sectionsubjectmapping}
              element={<SectionSubjectMapping />}
            />
            <Route exact path={Path.attendance} element={<AttendancePage />} />
            <Route exact path={Path.reports} element={<ReportPage />} />
            <Route exact path={Path.attendanceReports} element={<AttendanceReports />} />
            <Route exact path={Path.markreports} element={<MarkReports />} />
            

            

            {/* <Route exact path={Path.stockreport} element={<StockReports />} /> */}

            
            
            
         {/* <Route exact path={Path.facultysubjectmapping} element={<FacultySubjectMapping />}  */}
            
            <Route exact path={Path.announcement} element={<CollegeAnnouncement />} />
            


            
            <Route exact path={Path.sectionDetails} element={<SectionDetails />} />
              <Route exact path={Path.holidayCalendar} element={<HolidayCalendar />} />
              <Route path="/delete-account" element={<AccountDeletionPage />} />
              <Route exact path={Path.timetableDetails} element={<TimetableDetails />} />
              <Route exact path={Path.houseDetails} element={<HouseDetails />} />
              <Route exact path={Path.houseactivityDetails} element={<HouseActivityDetails />} />
<Route exact path={Path.academicCalendar} element={<AcademicCalendar />} />
          </Routes>
        </Layout>
      </Router>
    );
  }
}

export default AppStackRoot;
