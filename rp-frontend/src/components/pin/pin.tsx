import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, togglePin } from "store/ducks"

import { useTheme } from '@material-ui/core/styles';

import {
    Circle,
} from 'react-konva'

interface PinProps {
    pinNo: number,
    containerX: number,
    containerY: number,
    containerWidth: number,
    containerHeight: number,
    setHoveredPin: any,
} 

export const Pin = (props: PinProps) => {
    const { pinNo, containerX, containerY, containerWidth, containerHeight, setHoveredPin, ...other } = props;

    const url: string = useSelector((state: RootState) => state.Config.ipAddress)
    const totalNumPins: number = useSelector((state: RootState) => state.Board.numPins)
    const pinNames: Array<number> = useSelector((state: RootState) => state.Board.names)

    const dispatch = useDispatch()

    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    const [radius, setRadius] = useState<number>(0)

    const theme = useTheme();

    // Calculate the position of each item within the board
    useEffect( () => {
        setRadius((containerWidth*.8)/30)

        const currentColumn = Math.floor(pinNo/2)
        const widthPinContainer = (containerWidth)/Math.floor((totalNumPins+1)/2)
        const heightPinContainer = Math.floor((containerHeight)/2)

        console.log(currentColumn, pinNo, heightPinContainer, (totalNumPins+1)/2)

        if(totalNumPins%2 !== 0 && pinNo + 1 === totalNumPins){
            setX(((widthPinContainer  * currentColumn) + widthPinContainer/2) + containerX)
            setY((heightPinContainer) + containerY)
        }
        else{
            if(pinNo%2 !== 0){
                setX(((widthPinContainer * currentColumn) + widthPinContainer/2) + containerX)
                setY(((heightPinContainer) + heightPinContainer/2) + containerY) 
            }
            else if(pinNo%2 === 0){
                setX(((widthPinContainer * currentColumn) + widthPinContainer/2) + containerX)
                setY(((heightPinContainer) - heightPinContainer/2) + containerY)
            }
        }
    }, [containerHeight, containerWidth, containerX, containerY, pinNo, totalNumPins])

    const handlePinClick = () => {
        dispatch(togglePin(url, pinNames[pinNo]))
    }

    const handlePinHover = () => {
        setHoveredPin(pinNo)
    }

    const handlePinUnhover = () => {
        setHoveredPin(-1)
    }

    
    return (
        <React.Fragment>
            <Circle 
                {...other}
                x={x}
                y={y} 
                radius={radius} 
                fill={theme.palette.error.dark} 
                onClick={handlePinClick}
                onMouseEnter={handlePinHover}
                onMouseLeave={handlePinUnhover}
                draggable
            />
            
        </React.Fragment>
        
    )
}