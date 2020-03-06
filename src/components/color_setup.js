import React from 'react';
import '../css/main.css';

class ColorSetup extends React.Component{
    constructor(){
        super();
        this.state = {
            defaultColorsList: [
                {title:"Red", hex:"#ff0000"}, 
                {title:"Green", hex:"#33cc33"}, 
                {title:"Blue", hex:"#0000ff"}
            ],
            colorHexString: "#ff0000",
            colorRange: {red:0, green:0, blue:0},
            prevColorValue: "#ff0000"
        }   
    }
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    toHex = (number)=>{
        let hexString = number.toString(16);
        hexString = /^.{1}$/.test(hexString)?'0'+hexString:hexString;
        return hexString;
    }
    selectPredefinedColor = (event)=>{
        this.setState({colorHexString: event.target.value});
        this.setState({prevColorValue: event.target.value});
    }
    selectCustomColor = (event)=>{
        this.state.colorRange[event.target.name.toLowerCase()] = Number(event.target.value);
        this.setState({colorHexString: `#${
            this.toHex(this.state.colorRange.red)+
            this.toHex(this.state.colorRange.green)+
            this.toHex(this.state.colorRange.blue)
        }`});
    }
    discardSettings = ()=>{
        this.setState({colorHexString: this.state.prevColorValue});
    }
    saveSettings = ()=>{
        this.setState({prevColorValue: this.state.colorHexString});
    }
    //------------------------------------------------------------
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    render(){
        return <div id="mainBlock">
            <input type="text" value={this.state.colorHexString} disabled/>
            <div class="dropdown">
            <input type="color" id="colorIndicator" value={this.state.colorHexString} class="dropdown" disabled/>
                <div class="dropdown-content">
                    {this.state.defaultColorsList.map(colorItem=>{
                        return <div><label>{colorItem.title}:</label><input type="range" name={colorItem.title} min="0" max="255" onChange={this.selectCustomColor}></input></div>
                    })}
                    <button onClick={this.discardSettings}>Discard</button><button onClick={this.saveSettings}>Save</button>
                </div>
            </div>
            <select onChange={this.selectPredefinedColor}>
                {this.state.defaultColorsList.map(colorItem=>{
                    return <option name={colorItem.title} value={colorItem.hex}>{colorItem.title}</option>
                })}
            </select>

        </div>
    }
}

export default ColorSetup;