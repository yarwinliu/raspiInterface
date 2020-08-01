import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';

import '../styles/board.css'

interface BoardProps {
    dimX : number;
    dimY: number;
}
export const Board = ({dimX, dimY}: BoardProps) => {
    console.log(dimX, dimY)

    return(
        <div className="board-wrap">
            {/* @ts-ignore: Ignore so ts-script wont mess with the height and width props */}
            <Stage height={600} width={800}>
                {
                    Array.from({length: dimX}, (x, i) => i).map((xVal)=>{
                        return( 
                            <Layer>
                                {
                                    Array.from({length: dimY}, (x, i) => i).map((yVal)=>{
                                        return(
                                            <Circle x={40*xVal + 30} y={40*yVal + 30} radius={10} fill="green" />
                                        )
                                    })
                                }
                            </Layer>
                            
                        )
                    })
                    
                }
            </Stage>
        </div>
        
    )
}