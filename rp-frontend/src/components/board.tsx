import React, {useState} from 'react';

import '../styles/board.css'

export const Board = () => {
    const [boardDimX, setBoardDimX] = useState<number>(0)
    const [boardDimY, setBoardDimY] = useState<number>(0)

    const inputDimX = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardDimX(parseInt(event.target.value))
    }

    const inputDimY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardDimY(parseInt(event.target.value))
    }
    

    return(
        <div className="bodyContent">
            <div className="sidebarContent">
                <div className="wrapInputRow">
                    <input
                        type="number" 
                        value={boardDimX} 
                        onChange={inputDimX}
                    />
                    <input
                        type="number" 
                        value={boardDimY} 
                        onChange={inputDimY}
                    />
                </div>
            </div>
            <div className="mainContent">
                Main Body
            </div>
        </div>
    )
}