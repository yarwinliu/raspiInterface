
import React from 'react';

import './pin.css';

/*****************************************************
 * Pin parameters:
 * location:
 *    left
 *    right
 * pinNumber: 1 - 50?
 * functionNumber: 1 - 30?  (if pinType is GPIO this is gpio number)
 * pinType:
 *    GPIO
 *    IN
 *    OUT
 *    GROUND
 *    3.3V
 *    5V
 *    UART TX
 *    UART RX
 * pinMode: (state)
 *    IN
 *    OUT
 * pinLevel: (state)
 *    HIGH
 *    LOW
*/
export class PinParameters {
  constructor(handleClick,location,pinNumber,functionNumber,pinType,pinMode,pinLevel)  {
    this._handleClick = handleClick;
    this._location = location;
    this._pinNumber = pinNumber;
    this._functionNumber = functionNumber;
    this._pinType = pinType;
    this._pinMode = pinMode;
    this._pinLevel = pinLevel;
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
  get functionNumber() {
    return this._functionNumber;
  }
  get pinType() {
    return this._pinType;
  }
  set pinType(x) {
    this._pinType = x;
  }
  get pinMode() {
    return this._pinMode;
  }
  set pinMode(x) {
    this._pinMode = x;
  }
  get pinLevel() {
    return this._pinLevel;
  }
  set pinLevel(x) {
    this._pinLevel = x;
  }
}

const PinTag = (props) => 
{
  return props.children;
}
 
/**
 * Primary UI component for user interaction
 */
  class Pin extends React.Component {
  //class Pin extends BasePin {
    onClick(clickButton){
      this.props.parameters.handleClick(this.props.parameters,clickButton);
      //alert(clickButton);
    }

    left_pin_render1=(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode)=>
    {
      return (
        <PinTag>
          <td align="center">
              <button type="button" className="FunctionBasic" id={functionID} value={pinType} onClick={this.onClick.bind(this,"direction")}>{pinMode}</button>
          </td>
          <td align="right">
              <div className="Description" id={descID}>GPIO {functionNumber}</div>
          </td>
          <td align="center">
              <button type="button" className={pinLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
          </td>
        </PinTag> 
        )
    }

    left_pin_render2=(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode)=>
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
              <div className="Description" id={descID}>{pinMode}</div>
          </td>
          <td align="center">
              <button type="button" className={pinLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
          </td>
        </PinTag> 
      )
    }

    right_pin_render1=(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode)=>
    {
      return (
        <PinTag>
            <td align="center">
                <button type="button" className={pinLevel} id={gpioID} onClick={this.onClick.bind(this,"pin")}>{pinNumber}</button>
            </td>
            <td align="left">
                <div className="Description" id={descID}>GPIO {functionNumber}</div>
            </td>
            <td align="center">
                <button type="button" className="FunctionBasic" id={functionID} value={pinType} onClick={this.onClick.bind(this,"direction")}>{pinMode}</button>
            </td>       
          </PinTag> 
        )
    }

    right_pin_render2=(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode)=>
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
              <div className="Description" id={descID}>{pinMode}</div>
          </td>
          <td align="center"></td>
        </PinTag>
      )
    }

    render(){
      const {location, pinNumber, functionNumber, pinType, pinMode, pinLevel} = this.props.parameters;
      //const descID = "description"+`${functionNumber}`;
      const descID = `description${functionNumber}`;
      const functionID = `function${functionNumber}`;
      const gpioID = `gpio${functionNumber}`;

      //console.log("functionID:",descID);
      if(location==="left"){
        switch(pinType){
          case 'GPIO':
            return this.left_pin_render1(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode);
          case 'GROUND':
          case '--':
          case '3.3V':
          case '5.0V':  
            return this.left_pin_render2(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode);
          default:
            return null;
        }
      }
      if(location==="right"){
        switch(pinType){
          case 'GPIO':
            return this.right_pin_render1(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode);
          case 'GROUND':
          case '--':
          case '3.3V':
          case '5.0V':  
            return this.right_pin_render2(functionID,pinType,descID,functionNumber,pinLevel,gpioID,pinNumber,pinMode);
          default:
            return null;
        }
      }
      else{
        return "pin location not defined correctly";
      }
    }
  }

export default Pin;