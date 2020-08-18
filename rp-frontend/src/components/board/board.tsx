import React, { useLayoutEffect, useEffect, useState } from 'react';

import { useSelector, ReactReduxContext, Provider } from 'react-redux';
import { RootState } from "store/ducks"


import { Stage, Layer, Rect } from 'react-konva';
import { Snackbar, ListItemText } from "@material-ui/core"
import { useTheme } from '@material-ui/core/styles';

import 'styles/board.css'
import { Pin } from 'components/pin';

export const Board = () => {
    const numPins: number = useSelector((state: RootState) => state.Board.numPins)
    const pinNames: Array<string> = useSelector((state: RootState) => state.Board.names)
    const pinStatus: Array<number> = useSelector((state: RootState) => state.Board.statuses)



    const [canvasHeight, setCanvasHeight] = useState<number>(0)
    const [canvasWidth, setCanvasWidth] = useState<number>(0)

    const [boardHeight, setBoardHeight] = useState<number>(0)
    const [boardWidth, setBoardWidth] = useState<number>(0)
    const [boardX, setBoardX] = useState<number>(0)
    const [boardY, setBoardY] = useState<number>(0)

    const [openHover, setOpenHover] = useState<boolean>(false)
    const [hoveredPin, setHoveredPin] = useState<number>(-1)
    const [hoveredPinName, setHoveredPinName] = useState<string>("")
    const [hoveredPinState, setHoveredPinState] = useState<number>(-1)

    const theme = useTheme();

    useLayoutEffect (() => {
        const updateDimensions = () => {
            setCanvasHeight(document.getElementById('wrap-stage')?.clientHeight || 0)
            setCanvasWidth(document.getElementById('wrap-stage')?.clientWidth || 0)
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        return (
            window.removeEventListener("reize", updateDimensions)
        )
    }, []);

    useEffect ( () => {
        console.log("WIDTH CHANGED", canvasWidth * .8)
        setBoardWidth( canvasWidth * .8)
        setBoardX( (canvasWidth/2) - (canvasWidth * .4) ) // Midway point minux half the height of the boards width to render it in "center"
    }, [canvasWidth])

    useEffect( () => {
        setHoveredPinName(pinNames[hoveredPin])
        setHoveredPinState(pinStatus[hoveredPin])
    }, [pinNames, pinStatus, hoveredPin])

    useEffect ( () => {
        setBoardHeight( canvasHeight * .3)
        setBoardY( (canvasHeight/2) - (canvasHeight * .15) ) // Midway point minux half the height of the boards width to render it in "center"
    }, [canvasHeight])

    const handlePinHover = (pin: number) => {
        if(pin !== -1){
            console.log(pin, "PIN")

            setOpenHover(true)
            setHoveredPin(pin)
            return
        }
        else{
            setOpenHover(false)
        }
    }

    return(
        <div id="wrap-stage" className="board-wrap">
            <ReactReduxContext.Consumer>
                {
                    ({store}) => (
                        <Stage width={ canvasWidth } height={ canvasHeight }>
                            <Provider store={store}>
                                <Layer>
                                    <Rect
                                        x={boardX}
                                        y={boardY}
                                        width={boardWidth}
                                        height={boardHeight}
                                        fill={theme.palette.success.main}
                                    />
                                    {
                                        Array.from(Array(numPins).keys()).map((key) =>{
                                            return(
                                                <Pin 
                                                    pinNo={key}
                                                    containerX={boardX}
                                                    containerY={boardY}
                                                    containerWidth={boardWidth}
                                                    containerHeight={boardHeight}
                                                    setHoveredPin={handlePinHover}
                                                    key={key} 
                                                />
                                            )
                                        })
                                    }
                                </Layer>
                            </Provider>
                                
                        </Stage>
                    )
                }
            </ReactReduxContext.Consumer>
            <Snackbar
                open={openHover}
                message={
                    <ListItemText
                        primary={" Pin Name: " + hoveredPinName}
                        secondary={ <span style={{color: theme.palette.common.white}}>
                            {" Status: " + hoveredPinState}
                        </span>}
                    />
                }
            />
        </div>
        
    )
}