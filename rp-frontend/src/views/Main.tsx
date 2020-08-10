import React from 'react'

import 'styles/Main.css'
import { Board, Sidebar } from 'components';

export const Main = () => {
    return(
        <div data-testid="main" className="body-content">
            <div className="sidebar-content">
                <Sidebar/>
            </div>
            <div className="main-content">
                <Board/>
            </div>
        </div>
    )
}