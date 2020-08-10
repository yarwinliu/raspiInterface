import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, setUpForIp, boardSetPins} from "store/ducks"

import {
    Button,
    List, ListItem, ListSubheader,
    Tabs, Tab,
    TextField,
} from "@material-ui/core"

const sidebarControl = {
    SETTING: 0,
    EDITOR: 1,
}

export const Sidebar = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return(
        <div>
            <Tabs 
                onChange={handleChange}
                value={value}    
                centered 
            >
                <Tab label="Settings"/>
                <Tab label="Editor"/>
            </Tabs>
            <SidebarList value={value}/>

        </div>
        
    )
}

interface SidebarListProps {
    value: number
}

const SidebarList = (props: SidebarListProps) => {
    return(
        <div>
            { props.value === sidebarControl.SETTING && 
                <SidebarListSetting/>
            }
            { props.value === sidebarControl.EDITOR && 
                <SidebarListEditor/>
            }
        </div>
        
    )
}

const SidebarListSetting = () => {
    const backendLocation = useSelector( (state: RootState) => state.Config.ipAddress)

    const dispatch = useDispatch()

    const [urlInput, setUrlInput] = useState<string>(backendLocation)
    

    const handleChangeUrl = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setUrlInput(evt.target.value)
    }

    const handleBackendLocSet = () => {
        dispatch(setUpForIp(urlInput))
        console.log(backendLocation)
    }

    return(
        <List id={"sidebar-list-setting"} style={{padding: "0"}}>
            <ListSubheader style={{lineHeight: "1rem", paddingTop: "20px"}}>
                Backend Location
            </ListSubheader>
            <ListItem style={{paddingLeft: "25px"}}>
                <TextField
                    label="IP Address/URL"
                    helperText="Endpoint Location"
                    value={urlInput}
                    onChange={handleChangeUrl}
                />
                <Button style={{marginLeft: "auto"}} onClick={handleBackendLocSet}>
                    Set URL
                </Button>
            </ListItem>
        </List>
    )
}

const SidebarListEditor = () => {
    const pinNumber = useSelector( (state: RootState) => state.Board.numPins)
    const dispatch = useDispatch()

    const [pinInput, setPinInput] = useState<number>(pinNumber)

    useEffect( () => {
        setPinInput(pinNumber)
    }, [pinNumber])

    const handleChangePin = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPinInput(parseInt(evt.target.value))
    }

    const handleBackendPinSet = () => {
        dispatch(boardSetPins(pinInput))
    }
    return( 
        <List id={"sidebar-list-editor"} style={{padding: "0"}}>
            <ListSubheader style={{lineHeight: "1rem", paddingTop: "20px"}}>
                Board Pins
            </ListSubheader>
            <ListItem style={{paddingLeft: "25px"}}>
                <TextField
                    label="Number of Pins"
                    value={pinInput}
                    onChange={handleChangePin}
                    type="number"
                />
                <Button style={{marginLeft: "auto"}} onClick={handleBackendPinSet}>
                    Set Pin Number
                </Button>
            </ListItem>
        </List>
    )
}