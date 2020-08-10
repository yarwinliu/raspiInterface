import React, { useEffect, useState } from 'react';
import 'styles/board.css'
import { getElements, toggleElement } from 'store/temp';

import {Button} from "@material-ui/core"

export const Board = () => {
    useEffect(() => {
        
    }, []);


    return(
        <div className="board-wrap">
            <canvas id="mainBoard" width="200" height="100">

            </canvas>
        </div>
        
    )
}