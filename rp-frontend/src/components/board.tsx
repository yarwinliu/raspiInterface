import React, { useEffect, useState } from 'react';
import '../styles/board.css'
import { getElements, toggleElement } from '../store/temp';

import {Button} from "@material-ui/core"

export const Board = () => {
    const [temp, setTemp] = useState<any>({})
    useEffect(() => {
        const temp = async () => {
            const elements = await getElements();
            setTemp(elements)
        }
        temp()
    }, [])

    const handleClick = async (pinName: any) => {
        const tempItem = await toggleElement(pinName)
        console.log(tempItem)
        setTemp(tempItem)
    }


    return(
        <div className="board-wrap">
            {/* @ts-ignore: Ignore so ts-script wont mess with the height and width props */}
            {
                Object.keys(temp).map((key) => {
                    console.log(key, temp[key])
                    let colorTemp: any;
                    if(temp[key].state === 0){
                        colorTemp="red"
                    }
                    else if(temp[key].state === 1){
                        colorTemp="green"
                    }
                    return (
                        <Button key={key} style={{color: colorTemp}} variant="contained" onClick={() => handleClick(key)}>
                            {temp[key].name}
                        </Button>
                    )
                })
            }
        </div>
        
    )
}