import React, { useEffect, useState} from 'react';
import { Stage, Layer, Circle } from 'react-konva';

import '../styles/board.css'

import {getElements} from "../store/temp"

interface BoardProps {
    dimX : number;
    dimY: number;
}
export const Board = ({dimX, dimY}: BoardProps) => {
    console.log(dimX, dimY)

    const [toRender, setToRender] = useState<any>({})

    useEffect(()=>{
        getElements().then((elements) => {
            console.log(elements)
        })
    })

    return(
        <div className="board-wrap">
            {/* @ts-ignore: Ignore so ts-script wont mess with the height and width props */}
            <Stage height={600} width={800}>
                {
                    Object.keys(toRender).map((key) => {
                        console.log(toRender[key])
                    })
                    
                }
            </Stage>
        </div>
        
    )
}