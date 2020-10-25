
import React from 'react';

import './pin.css';

export class PinParameters {
  constructor(handleClick,location,pinNumber,gpioNumber,pinType,gpioLevel)  {
    this._handleClick = handleClick;
    this._location = location;
    this._pinNumber = pinNumber;
    this._gpioNumber = gpioNumber;
    this._pinType = pinType;
    this._gpioLevel = gpioLevel;
  }

  get handleClick() {
    return this._handleClick;
  }

  get location() {
    return this._location;
  }
  set location(x) {
    this._location = x;
  }
  get pinNumber() {
    return this._pinNumber;
  }
  get gpioNumber() {
    return this._gpioNumber;
  }
  get pinType() {
    return this._pinType;
  }
  set pinType(x) {
    this._pinType = x;
  }
  get gpioLevel() {
    return this._gpioLevel;
  }
  set gpioLevel(x) {
    this._gpioLevel = x;
  }
}

const PinTag = (props) => 
{
  return props.children;
}
 
/**
 * Primary UI component for user interaction
 */
class BasePin extends React.Component {

  getPinState=()=>{
    alert("get pin state");
    return (
      <h2>get pin state</h2>
    )
  }

  setPinState=(pinState)=>{
    alert("set pin state" + pinState);
    return (
      <h2>set pin state {pinState}</h2>
    )
  }

  togglePinState=()=>{
    alert("toggle pin state, gpio: " + this.props.pinNumber);
    return (
      <h2>toggle pin state, gpio: {this.props.gpioNumber}</h2>
    )
  }

  render(){
    return (
      <h2>BasePin class</h2>
    )
  }
}

  //const LeftPin = ({ pinNumber, gpioNumber, pinType, gpioLevel, ...props }) => {
  //class LeftPin extends React.Component {
  class PinNew extends BasePin {
    onClick(clickButton){
      this.props.parameters.handleClick(this.props.parameters,clickButton);
      //alert(clickButton);
    }

    left_pin_render1=(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber)=>
    {
      return (
        <PinTag>
          <td align="center">
              <button type="button" className="FunctionBasic" id={functionID} value={pinType} onClick={this.onClick.bind(this,"direction")}>{pinType}</button>
          </td>
          <td align="right">
              <div className="Description" id={descID}>GPIO {gpioNumber}</div>
          </td>
          <td align="center">
              <button type="button" className={gpioLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
          </td>
        </PinTag> 
        )
    }

    left_pin_render2=(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber)=>
    {
      var pinLevel = "HIGH";
      if(pinType==="GROUND")
      {
        pinLevel = "LOW";
      }
      else if(pinType==="--")
      {
        pinLevel = "DNC";
      }
      else if(this.props.pinType==="5.0V")
      {
        pinLevel = "V50";
      }
      return (
        <PinTag>
          <td align="center"></td>
          <td align="right">
              <div className="Description" id={descID}>{pinType}</div>
          </td>
          <td align="center">
              <button type="button" className={pinLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
          </td>
        </PinTag> 
      )
    }

    right_pin_render1=(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber)=>
    {
      return (
        <PinTag>
            <td align="center">
                <button type="button" className={gpioLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
            </td>
            <td align="left">
                <div className="Description" id={descID}>GPIO {gpioNumber}</div>
            </td>
            <td align="center">
                <button type="button" className="FunctionBasic" id={functionID} value={pinType} onClick={this.onClick.bind(this,"direction")}>{pinType}</button>
            </td>       
          </PinTag> 
        )
    }

    right_pin_render2=(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber)=>
    {
      var pinLevel = "HIGH";
      if(pinType==="GROUND")
      {
        pinLevel = "LOW";
      }
      else if(pinType==="--")
      {
        pinLevel = "DNC";
      }
      else if(this.props.pinType==="5.0V")
      {
        pinLevel = "V50";
      }
      return (
        <PinTag>
          <td align="center">
              <button type="button" className={pinLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
          </td>
          <td align="left">
              <div className="Description" id={descID}>{pinType}</div>
          </td>
          <td align="center"></td>
        </PinTag>
      )
    }

    render(){
      const {location, pinNumber, gpioNumber, pinType, gpioLevel} = this.props.parameters;
      //const descID = "description"+`${gpioNumber}`;
      const descID = `description${gpioNumber}`;
      const functionID = `function${gpioNumber}`;
      const gpioID = `gpio${gpioNumber}`;

      //console.log("functionID:",descID);
      if(location==="left"){
        switch(pinType){
          case 'OUT':
          case 'IN':
          case 'GPIO':
            return this.left_pin_render1(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber);
          case 'GROUND':
          case '--':
          case '3.3V':
          case '5.0V':  
            return this.left_pin_render2(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber);
          default:
            return null;
        }
      }
      if(location==="right"){
        switch(pinType){
          case 'OUT':
          case 'IN':
          case 'GPIO':
            return this.right_pin_render1(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber);
          case 'GROUND':
          case '--':
          case '3.3V':
          case '5.0V':  
            return this.right_pin_render2(functionID,pinType,descID,gpioNumber,gpioLevel,gpioID,pinNumber);
          default:
            return null;
        }
      }
      else{
        return "pin location not defined correctly";
      }
    }
  }

/*****************************************************
 * Input parameters:
 * location:
 *    left
 *    right
 * pinNumber: 1 - 50?
 * gpioNumber: 1 - 30?
 * pinType:
 *    GPIO
 *    IN
 *    OUT
 *    GROUND
 *    3.3V
 *    5V
 *    UART TX
 *    UART RX
 * gpioLevel:
 *    HIGH
 *    LOW
*/

export default PinNew;