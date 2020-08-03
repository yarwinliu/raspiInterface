import React from 'react';

import '../styles/Main.css'
import { Board } from '../components/board';
import {  
    List,
} from '@material-ui/core'

export const Main = () => {
    return(
        <div className="bodyContent">
            <div className="sidebarContent">
                <List>
                </List>
                
            </div>
            <div className="mainContent">
                <Board/>
            </div>
        </div>
    )
}