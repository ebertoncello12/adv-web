import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';

import './LoggedLayout.css'
import AppHeader from "./LoggedHeader.jsx";
import SideMenu from './SideBarMenu.jsx';
import AppFooter from "./LoggedFooter.jsx";



export const GeneralLayout = () => {
  return (
    <div className="App">
      <AppHeader />
            <div className="SideMenuAndPageContent">
                <SideMenu></SideMenu>
                <Outlet  />
            </div>
            <AppFooter />
        </div>
    );
};
