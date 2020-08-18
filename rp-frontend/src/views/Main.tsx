import React from 'react'

import 'styles/Main.css'
import { Board, SidebarLeft, SidebarRight } from 'components';

export const Main = () => {
    return(
        <div className="body-content">
            <div className="sidebar-content">
                <SidebarLeft/>
            </div>
            <div className="main-content">
                <Board/>
            </div>
            <div className="sidebar-content">
                <SidebarRight/>
            </div>
        </div>
    )
}