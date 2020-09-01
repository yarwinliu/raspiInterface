import React, { useState } from 'react'
import clsx from 'clsx';

import 'styles/Main.css'
import { Board, SidebarLeft, SidebarRight } from 'components';
import {
    // AppBar,
    Drawer,
    IconButton
} from "@material-ui/core"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Menu as MenuIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: "20%",
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: "0%",
        marginRight: "0%"
    },
    contentShiftLeft: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: "20%",
    },
    contentShiftRight: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: "20%",
    },
  }),
);

export const Main = () => {
    const [openLeft, setOpenLeft] = useState<boolean>(true);
    const [openRight, setOpenRight] = useState<boolean>(true);

    const classes = useStyles();

    const handleLeft = () => {
        setOpenLeft(!openLeft);

    }
    const handleRight = () => {
        setOpenRight(!openRight);

    }

    return(
        <div className="body-content">
            <Drawer 
                open={openLeft} 
                variant="persistent" 
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <SidebarLeft/>
            </Drawer>
            <div 
                className={
                    clsx(classes.content, "main-content", {
                        [classes.contentShiftLeft]: openLeft,
                        [classes.contentShiftRight]: openRight,
                    })
                }
            >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleLeft}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleRight}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                
                <Board/>
            </div>
            <Drawer 
                open={openRight} 
                variant="persistent" 
                anchor="right" 
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <SidebarRight/>
            </Drawer>
        </div>
    )
}