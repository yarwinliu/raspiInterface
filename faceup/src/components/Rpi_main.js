// Inside src/components/Rpi_main.js

import React from 'react';
import './rpi_main.css';
import PinNew,{PinParameters}  from "./PinNew";
  
class RpiMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
      pins: [],
    }

    /* define pins: */
    /* pinNumber, gpioNumber, pinType, gpioLevel */
    this.pinData = [
      [["7","4","IN","HIGH"],["8","5","OUT","LOW"]],
      [["9","6","IN","HIGH"],["10","7","OUT","LOW"]],
    ];
  }
  
  handleClick(parameters,clickButton) {
    if(clickButton==="direction"){
      alert("click button: pin number["+ parameters.pinNumber + "],dirction[" + parameters.pinType + "]");
    }
    else if(clickButton==="pin"){
      alert("click button: pin number["+ parameters.pinNumber + "]" );
    }
    else{
      alert("click button: un-supported button type");
    }
  }

  render() {
    for (var i = 0; i < this.pinData.length; i++) {
      //console.log(this.pinData[i][0]);
      let pl = this.pinData[i][0];
      let pr = this.pinData[i][1];
      let pinLeft = new PinParameters(this.handleClick,"left",pl[0],pl[1],pl[2],pl[3]);
      let pinRight = new PinParameters(this.handleClick,"right",pr[0],pr[1],pr[2],pr[3]);
      let pinPair = [pinLeft,pinRight];
      this.state.pins.push(pinPair);
    }

    const pinArray = this.state.pins.map((pinPair,index) => {
        const pinLeft = pinPair[0];
        const pinRight = pinPair[1];
        return (
          <tr key={index}>
            <PinNew parameters={pinLeft}/>
            <PinNew parameters={pinRight}/>
          </tr>
        );
    });

    return (
      <table>
      <tbody>
        {pinArray}
      </tbody>
      </table>
    );
  }
}

export default RpiMain;