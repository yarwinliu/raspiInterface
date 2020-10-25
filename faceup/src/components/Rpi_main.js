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
      pins: {},
    }
  }
  
  handleClick(parameters,clickButton) {
    if(clickButton==="direction"){
      alert("click button: pin number["+ parameters.pinNumber + "]," + "dirction[" + parameters.pinType + "]");
    }
    else if(clickButton==="pin"){
      alert("click button: pin number["+ parameters.pinNumber + "]" );
    }
    else{
      alert("click button: un-supported button type");
    }

    
  }

  render() {
    let pinp1 = new PinParameters(this.handleClick,"left","7","4","IN","HIGH");
    let pinp2 = new PinParameters(this.handleClick,"right","8","5","OUT","LOW");
    return (
      <table>
      <tbody>
      <tr>
          <PinNew parameters={pinp1}/>
          <PinNew parameters={pinp2}/>
      </tr>
      </tbody>
      </table>
    );
  }

  
}

export default RpiMain;