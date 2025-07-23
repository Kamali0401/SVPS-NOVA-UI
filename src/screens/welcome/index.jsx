import React, { PureComponent, Fragment } from 'react';
import logoProject from '../../app/assets/images/paper.png';
import logoSemester from '../../app/assets/images/semester.png';
import logoMiscellaneous from '../../app/assets/images/misc.png';
import logoAttend from '../../app/assets/images/attend.png';
import logoEvent from '../../app/assets/images/event.png';

import logoPress from '../../app/assets/images/press.png';
import logoUpcomingEvent from '../../app/assets/images/event.png';

import './addnew.css';
import './bootstrap.css';
import './signin.css';
import './bootstrap.min.css';

import { Navigate } from "react-router-dom";


export default class Welcome extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

            redirectProjectModel: false,
            redirectGuestLectures: false,
            redirectImplantTraining: false,
            redirectIndustrialVisit: false,
            redirectSportsAndGames: false,
            redirectNCC: false,
            redirectExtensionServices: false,
            redirectPlacement: false,
            redirectJournalAndBookPublication: false,
            redirectGrants: false,
            redirectPaper: false,
            redirectAlumniEvent: false,
            redirectPatent: false,
            redirectSem: false,
            redirectSymposium: false,
            redirectConsultant: false,
            redirectFaculty: false,
            redirectWomen: false,
            redirectNSS: false,
            redirectAwards: false,
            redirectEvents: false,
            redirectAdvertisements:false,
            redirectPressReports: false,
            redirectMOUs:false,
            redirectMiscellaneous:false,
            redirectAttendancePage:false,
            redirectUpcomingEvents: false,
            redirectCompetition:false,
            redirectMark:false,

            success: ""
        }

this.goToMark=this.goToMark.bind(this);
        this.goToConsultant =this.goToConsultant.bind(this);
        this.goToEvents = this.goToEvents.bind(this);
        //this.goToAdvertisements = this.goToAdvertisements.bind(this);
        //this.goToMOUs = this.goToMOUs.bind(this);
        this.goToPressReports = this.goToPressReports.bind(this);
        this.goToUpcomingEvents = this.goToUpcomingEvents.bind(this);
        this.goToAttendance= this.goToAttendance.bind(this);
this.goToCompetition=this.goToCompetition.bind(this);
    }
    goToMark = () => {
            this.setState({ redirectMark: true })
        };
    goToConsultant=()=>{
        this.setState({ redirectConsultant: true })
     }
 goToCompetition=()=>{
    this.setState({ redirectCompetition: true })
 }
    goToEvents = () => {
        this.setState({ redirectEvents: true })
    };
    goToAttendance = () => {
        this.setState({ redirectAttendancePage: true })
    };
   
    goToPressReports = () => {
        this.setState({ redirectPressReports: true })
    };
    goToUpcomingEvents = () => {
        this.setState({ redirectUpcomingEvents: true })
    };
    render() {

        return (
            // <div className="col-xs-12 col-sm-8 col-md-9 col-lg-10">
            <div className="formsec dashboard dashboard_menu">
                {/*<div className="row"> <div className="col"><h2 className="heading">Dashboard</h2></div><div className="col"> <span className="title-section d-flex justify-content-end"><a
                    //</span>className="btn btn-archive btn-sm" href="#" role="button">Export Report</a></span></div></div>*/}



                <section id="focus" className="focus-section">

                    <div className="row row-cols-1 row-cols-lg-6 row-cols-md-4 row-cols-sm-2 row-cols-2  g-2">
                       
                        
                        
                        
                         {
                             //localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoEvent} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToEvents}>Events</a></div>
                                                {this.state.redirectEvents && <Navigate to='/events' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                              //  : null
                        }
                         
                          
                         {
                              //localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoPress} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToPressReports}>Press Reports</a></div>
                                                {this.state.redirectPressReports && <Navigate to='/pressreports' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                                // : null
                        }
                        {
                            /* JSON.parse(localStorage.getItem("user")).pressReports ?*/
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoMiscellaneous} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToCompetition}>Competition</a></div>
                                                {this.state.redirectCompetition && <Navigate to='/upcomingDetails' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                              /*   : null*/
                        }
                         {
                             // localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoUpcomingEvent} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToUpcomingEvents}>Upcoming Events</a></div>
                                                {this.state.redirectUpcomingEvents && <Navigate to='/upcomingevents' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                               //    :null
                        }
                        {
                           /* JSON.parse(localStorage.getItem("user")).roleName!="Admin" ?*/
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoAttend} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToAttendance}>Attendance</a></div>
                                                {this.state.redirectAttendancePage && <Navigate to='/attendance' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                               /* : null*/
                        }
                         {
                          localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                                <div className="col">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-image">
                                            <div className="hover-text">
                                                <img src={logoProject} className="card-img-top" alt="..." />
                                                <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToConsultant}>Announcement</a></div>
                                                {this.state.redirectConsultant && <Navigate to='/announcement' replace={true} />}
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                    </div>
                                </div> 
                               : null
                        }
                         {
                             // localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                             <div className="col">
                             <div className="card shadow-sm h-100">
                                 <div className="card-image">
                                     <div className="hover-text">
                                         <img src={logoSemester} className="card-img-top" alt="..." />
                                         <div className="bottom-right-tag text-uppercase"><a  onClick={this.goToMark}>Mark</a></div>
                                         {this.state.redirectMark && <Navigate to='/markreports' replace={true} />}
                                     </div>
                                     <div className="image-overlay"></div>
                                 </div>
                             </div>
                         </div>
                        // :null
                        }
                    </div>


                </section>
            </div>
            // </div>
        )

    }
}