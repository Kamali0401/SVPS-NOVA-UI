import { configureStore     } from '@reduxjs/toolkit';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from "history";
import logger from 'redux-logger';
import welcomeReducer from './slices/welcomeSlice';
//import productReducer from './slices/productSlice';
import loginReducer from './slices/loginSlice';
import activityReducer from './slices/activitySlice';
import facultyReducer from './slices/facultySlice';
import studentReducer from './slices/studentSlice';
//import aluminiReducer from './slices/aluminiSlice';
import subjectReducer from './slices/subjectSlice';
//import admissionReducer from './slices/admissionSlice';
//import departmentReducer from './slices/departmentSlice';
import roleReducer from './slices/roleSlice';
import examReducer from './slices/examSlice';

//import roleActivityReducer from './slices/roleActivityMappingSlice';
//import batchReducer from './slices/batchDetailsSlice';
import sectionStudReducer from './slices/sectionStudentMappingSlice';
//import batchSubReducer from './slices/batchSubjectMappingSlice';
//import deptStudReducer from './slices/deptStudentMappingSlice';
//import formReducer from './slices/formRoleSlice';
//import indentReducer from './slices/indentSlice';
//import fdpReducer from './slices/fdpSlice';
//import odpReducer from './slices/odpSlice';
//import bpeReducer from './slices/bpeSlice';

import sectionSubjectMappingReducer from './slices/sectionSubjectMappingSlice';

import AnnouncementReducer from './slices/announcementSlice'
//import inventoryReducer from './slices/inventorySlice';
//import inventoryspecReducer from './slices/inventorySpecSlice';
//import purchasedOrderReducer from './slices/purchasedOrderDetailsSlice';
//import stockInventoryReducer from './slices/stockInventorySlice';
//import inventoryIssueReducer from "./slices/inventoryIssueSlice";
//import labdetailsReducer from "./slices/labDetailsSlice";
//import hoadetailsReducer from "./slices/hoaDetailsSlice";
//import budgetReducer from "./slices/budgetSlice";
//import memberReducer from './slices/memberSlice';
 import sectionReducer from './slices/sectionSlice';
 import upcomingReducer from './slices/upcomingSlice';
 import holidayCalendarReducer from './slices/holidaycalendarSlice';
 import academicCalendarReducer from './slices/academiccalendarSlice';
 import timetableReducer from './slices/timetableSlice';
import thunk from "redux-thunk"
import houseReducer from './slices/houseSlice';
import houseactivityReducer from './slices/houseActivitySlice';
const store= configureStore({
   reducer: {
      login: loginReducer,
      welcome: welcomeReducer,
      //products:productReducer,
      activities:activityReducer,
      routing: routerReducer,
      faculties: facultyReducer,
      students: studentReducer,
      //aluminies: aluminiReducer,
      //admissions: admissionReducer,
      subject:subjectReducer,
      upcoming:upcomingReducer,
      //departments:departmentReducer,
      role:roleReducer,
      exam:examReducer,
      //roleActivity: roleActivityReducer,
      //batches: batchReducer,
      sectionStuds: sectionStudReducer,
      //deptStuds: deptStudReducer,
      //batchSubs: batchSubReducer,
      //formRole:formReducer,
      //indents:indentReducer,
      //inventorys:inventoryReducer,
      //inventoryspecs:inventoryspecReducer,
      //purchasedOrders:purchasedOrderReducer,
      //stockInventorys:stockInventoryReducer,
      //inventoryIssues:inventoryIssueReducer,
      //labdetails:labdetailsReducer,
      //hoadetails:hoadetailsReducer,
     // ods:fdpReducer,
      //odps:odpReducer,
      //budget:budgetReducer,
      sectionSubjectmappings:sectionSubjectMappingReducer,
      //memberDetails:memberReducer,
      house:houseReducer,
      announcements:AnnouncementReducer,
      section:sectionReducer,
      holidayCalendar:holidayCalendarReducer,
      timetable:timetableReducer,
      houseActivity:houseactivityReducer,
      academicCalendar:academicCalendarReducer,
   },
   middleware: [thunk, logger],
})
// export const history = syncHistoryWithStore(createBrowserHistory(), store)
export default store; 