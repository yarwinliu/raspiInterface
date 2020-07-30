import React, {useState} from 'react';

import '../styles/main.css'
import { Board } from '../components/board';
import { 
    TextField, 
    List,
    ListItem,
    ListItemText,
    Button
} from '@material-ui/core'

export const Main = () => {
    const [boardDimX, setBoardDimX] = useState<number>(0)
    const [boardDimY, setBoardDimY] = useState<number>(0)
    
    const [dimX, setDimX] = useState<number>(0)
    const [dimY, setDimY] = useState<number>(0)

    const inputDimX = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardDimX(parseInt(event.target.value) || 0)
    }

    const inputDimY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardDimY(parseInt(event.target.value) || 0)
        
    }

    const handleSet = () => {
        setDimX(boardDimX)
        setDimY(boardDimY)
    }

    return(
        <div className="bodyContent">
            <div className="sidebarContent">
                <List>
                    <ListItem className="list-item">
                        <ListItemText>Dimension of the Board</ListItemText>
                        <div className="row-dimension">
                            <TextField
                                label="Dimension X"
                                type="number"
                                value={boardDimX} 
                                onChange={inputDimX}
                                className="input-dimension"
                                style={{ margin: 8 }}
                            />
                            <TextField
                                label="Dimension Y"
                                type="number"
                                value={boardDimY} 
                                onChange={inputDimY}
                                className="input-dimension"
                                style={{ margin: 8 }}
                            />
                        </div>
                        <Button onClick={handleSet}>Set Board Size</Button>
                    </ListItem>
                </List>
                
            </div>
            <div className="mainContent">
                <Board dimX={dimX} dimY={dimY}/>
            </div>
        </div>
    )
}