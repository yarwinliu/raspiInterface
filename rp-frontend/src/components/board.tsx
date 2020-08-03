import React, { useEffect } from 'react';
import '../styles/board.css'
export const Board = () => {

    useEffect(()=>{
    })

    return(
        <div className="board-wrap">
            {/* @ts-ignore: Ignore so ts-script wont mess with the height and width props */}
            <canvas>
            </canvas>
        </div>
        
    )
}