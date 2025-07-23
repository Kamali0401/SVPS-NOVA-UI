import React, { useState } from "react";
import Header from "./header";
import Navigation from "./navigation";
import "./header.css";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [clickedOutSide, setclickedOutSide] = useState(false);

  // debugger;
  if (location.pathname == "/login" || location.pathname == "/") {
    // debugger;
    return <main>{children}</main>;
  } else {
    // debugger;
    return (
      <React.Fragment>
        <Header stateChange={clickedOutSide} />

        <div
          className="container-fluid"
          onClick={() => {
            setclickedOutSide(!clickedOutSide);
          }}
        >
          <div className="row row-offcanvas row-offcanvas-left">
            <div
              class="col-xs-6 col-sm-4 col-md-3 col-lg-3 sidebar-offcanvas"
              id="sidebar"
              role="navigation"
              style={{textAlign:"center",}}
              //width:"18%"
            >
              <Navigation />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
              <main>{children}</main>
            </div>
          </div>
        </div>
        {/* <main>{children}</main> */}

        <Footer />
      </React.Fragment>
    );
  }
};
export default Layout;
