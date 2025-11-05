/*
 * Author        : duytruong
 * Github        : https://github.com/SanderM2/ha-vertical-light-sliders
 * Description   : HA Vertical Light Sliders KNUTS
 * Based on      : github.com/DBuit/hass-smart-home-panel-card (Thanks to DBuit!)
 */
console.info("%c HA Vertical Light Sliders KNUTS","color: red; font-weight: bold; background: black");
import {
    LitElement,
    html,
    css
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
//"https://unpkg.com/lit-element@2.0.1/lit-element.js?module"
class HaVerticalLightSliders extends LitElement {
  
  static get properties() {
    return {
      hass: {},
      config: {},
      _sliderValues: { type: Object }
    };
  }
  
  constructor() {
    super();
    this._sliderValues = {};
  }
  
  render() {
    var primaryTextColor = "var(--primary-text-color)";
    var icon = this.config.icon ? this.config.icon : this._getDefaultIcon();
    var iconSize = this.config.iconSize ? this.config.iconSize: "28px";
    var iconColor = this.config.iconColor ? this.config.iconColor : primaryTextColor;

    var positionWidth = this.config.positionWidth ? this.config.positionWidth : "100px";
    var positionHeight = this.config.positionHeight ? this.config.positionHeight : "300px";
    var showName = this.config.showName ? this.config.showName : true;
    var showPosition = this.config.showPosition ? this.config.showPosition : true;
    var switchWidth = this.config.switchWidth ? this.config.switchWidth : positionWidth;
    var switchHeight = this.config.switchHeight ? this.config.switchHeight : switchWidth;
    var showSwitch = this.config.showSwitch;
    var switchFontColor = this.config.switchFontColor ? this.config.switchFontColor : primaryTextColor;
    var gapWidth = this.config.gapWidth ? this.config.gapWidth : "50px";
    
    var countText = this.config.countText ? this.config.countText : this._getDefaultCountText();
    var countTextFontColor = this.config.countTextFontColor ? this.config.countTextFontColor : primaryTextColor;
    var openBaseline = this.config.closedBaseline ? this.config.closedBaseline : 0;
    var entityCounter = 0;
    
    var showButton = this.config.showButton ? this.config.showButton : false;
    var buttonText = this.config.buttonText ? this.config.buttonText : "Home";
    var buttonPath = this.config.buttonPath ? this.config.buttonPath : "/lovelace/0";
    var buttonService = this.config.buttonService ? this.config.buttonService: "";
    var buttonData = this.config.buttonData ? this.config.buttonData : "";
    var buttonFontColor = this.config.buttonFontColor ? this.config.buttonFontColor : primaryTextColor;
    
    var background = this.config.background ? this.config.background : "transparent";
    
    // Sidebar configuration
    var sidebarWidth = this.config.sidebarWidth ? this.config.sidebarWidth : "300px";
    var sidebarMinWidth = this.config.sidebarMinWidth ? this.config.sidebarMinWidth : "200px";
    
    // Theme-aware color defaults
    var sideColor1 = this.config.sideColor1 ? this.config.sideColor1 : "#ffcccc";
    var sideColor2 = this.config.sideColor2 ? this.config.sideColor2 : '#b30000';
    var switchColor = this.config.switchColor ? this.config.switchColor : sideColor2;
    var closedColor = this.config.closedColor ? this.config.closedColor : "var(--bg-color-inactive)";
    var closedColor2 = this.config.closedColor2 ? this.config.closedColor2 : "hsl(0, 0%, 40%)";  // For >= 1%
    var openColor = this.config.openColor ? this.config.openColor : "hsl(0, 0%, 90%, 0.6)";
    var panelType = this.config.panelType;
    var showSidebar = this.config.showSidebar;
    var titleSize = this.config.titleSize ? this.config.titleSize : "40px";
    var titleFontColor = this.config.titleFontColor ? this.config.titleFontColor : primaryTextColor;
    
    return html`
        <ha-card>
        <div class="page" style="background:${background};">
        
          <div class="side" style="${this._panelSize(panelType, sidebarWidth, sidebarMinWidth)};--show-sidebar:${this._showFlex(showSidebar)};--sideColor-1:${sideColor1};--sideColor-2:${sideColor2};">
            <div class="header">
              
            </div>
            <div class="center">
              <div class="icon">
                <ha-icon style="--mdc-icon-size:${iconSize};--icon-color:${iconColor};" icon="${icon}" />
              </div>
              <h1 style="--title-size:${titleSize};--title-font-color:${titleFontColor};">${this.config.title}</h1>
              <h3 style="--count-font-color:${countTextFontColor};">${this._stateCount(openBaseline)} ${countText}</h3>
            </div>
            <div class="bottom">
                ${showButton ? html`<button class="back-btn" style="--button-size:${this._buttonFont(titleSize,buttonText)}px;--button-font-color:${buttonFontColor};" @click=${e => this._navigate(buttonPath,buttonService,buttonData)}>${buttonText}</button>` : html``}
            </div>
          </div>
          
          <div class="main">
            <div class="inner-main">
            ${this.config.entities.map(ent => {
            	entityCounter++;
                const stateObj = this.hass.states[ent.entity];
                
                return stateObj ? html`
                    <div class="light" style="--light-width:${this._lightSize(positionWidth,gapWidth,panelType)};--center-slider:${this._centerSliders(panelType)};">
                      <div class="light-slider">
                        <p class="light-brightness" data-entity="${stateObj.entity_id}" style="--show-position: ${this._showBlock(showPosition)};--light-fontSize: ${parseInt(positionWidth.replace(/px/,"")) / 4 - (parseInt(positionWidth.replace(/px/,"")) - 60) / 4}px;">${this._getDisplayBrightness(stateObj)}</p>
                        <div class="range-holder" style="--slider-height: ${positionHeight};--closed-color: ${this._getClosedColor(stateObj, closedColor, closedColor2)};--slider-progress: ${this._getCurrentSliderValue(stateObj)}%;">
                          <input type="range" class="${stateObj.state}" data-entity="${stateObj.entity_id}" style="--slider-width: ${positionWidth};--slider-height: ${positionHeight};--closed-color: ${this._getClosedColor(stateObj, closedColor, closedColor2)};--open-color: ${openColor};--slider-progress: ${this._getCurrentSliderValue(stateObj)}%;" .value="${this._getCurrentSliderValue(stateObj)}" @input=${e => this._sliderChangeWithUpdate(e, stateObj.entity_id)} @change=${e => this._setPosition(stateObj.entity_id, e.target.value, ent.script)}>
                        </div>
                        <div class="toggle" style="--show-switch: ${this._showFlex(showSwitch)};">
                            <input ?checked=${stateObj.state === "on"} type="checkbox" id="toggle${entityCounter}" class="toggle-btn" @change=${e => this._switch(stateObj)} />
                            <label for="toggle${entityCounter}" style="--switch-width: ${switchWidth};--switch-height: ${switchHeight};--switch-font-color: ${switchFontColor};--switch-color: ${switchColor};--switch-labelSize: ${parseInt(switchWidth.replace(/px/,"")) / 5}px;"><span></span></label>
                        </div>
                      </div>
                    </div>
                `: html``;
            })}
            </div>
          </div>
        </div>
        </ha-card>
    `;
  }
  

  updated() {
    // Set dark-mode attribute based on theme
    if (this.hass && this.hass.themes && this.hass.themes.darkMode) {
      this.setAttribute('dark-mode', '');
    } else {
      this.removeAttribute('dark-mode');
    }
  }
  
  _sliderChangeWithUpdate(event, entity_id) {
    const value = event.target.value;
    
    // Store the current slider value for display
    this._sliderValues = { ...this._sliderValues, [entity_id]: value };
    
    // Update CSS variables real-time for smooth color transition
    event.target.style.setProperty('--slider-progress', `${value}%`);
    event.target.parentElement.style.setProperty('--slider-progress', `${value}%`);
    
    // Update closedColor dynamically for 0% vs >= 1% logic
    const closedColor = this.config.closedColor ? this.config.closedColor : "var(--bg-color-inactive)";
    const closedColor2 = this.config.closedColor2 ? this.config.closedColor2 : "hsl(0, 0%, 40%)";
    const dynamicClosedColor = parseInt(value) >= 1 ? closedColor2 : closedColor;
    
    event.target.style.setProperty('--closed-color', dynamicClosedColor);
    event.target.parentElement.style.setProperty('--closed-color', dynamicClosedColor);
    
    // Trigger a re-render to update the display
    this.requestUpdate();
  }

  _getDisplayBrightness(stateObj) {
    // Use stored slider value during interaction, otherwise use actual state
    if (this._sliderValues && this._sliderValues[stateObj.entity_id] !== undefined) {
      return Math.round(this._sliderValues[stateObj.entity_id]);
    }
    return this._getLightBrightness(stateObj);
  }

  _getLightBrightness(stateObj) {
    if (stateObj.state === "off") {
      return '0';
    } else {
      return Math.round((stateObj.attributes.brightness || 255) / 255 * 100);
    }
  }

  _getDefaultIcon() {
    return 'mdi:lightbulb-group';
  }

  _getDefaultCountText() {
    return 'lights on';
  }

  _getCurrentSliderValue(stateObj) {
    return stateObj.state === "off" ? 0 : Math.round((stateObj.attributes.brightness || 255) / 255 * 100);
  }

  _getClosedColor(stateObj, closedColor, closedColor2) {
    const currentValue = this._getCurrentSliderValue(stateObj);
    return currentValue >= 1 ? closedColor2 : closedColor;
  }
  
  _setPosition(entity_id, value, script) {
    console.log('Setting light brightness for:', entity_id, 'value:', value);
    
    // Clear the stored slider value since we're setting the actual value
    if (this._sliderValues) {
      const newValues = { ...this._sliderValues };
      delete newValues[entity_id];
      this._sliderValues = newValues;
    }
    
    const brightness = Math.round(value * 255 / 100);
    
    if (value == 0) {
      console.log('Turning light off');
      this.hass.callService("light", "turn_off", {
          entity_id: entity_id
      });
    } else {
      console.log('Turning light on with brightness:', brightness);
      this.hass.callService("light", "turn_on", {
          entity_id: entity_id,
          brightness: brightness
      });
    }
    
    if (script) {
      this.hass.callService("script", "turn_on", {
        entity_id: script
      });
    }
  }
  
  _stateCount(baseline) {
      let count = 0;
      this.config.entities.map(ent => {
          const stateObj = this.hass.states[ent.entity];
          if(stateObj.state === "on") {
              count++;
          }
      })
      return count;
  }
  
  _panelSize(panelType, sidebarWidth, sidebarMinWidth) {
    if (panelType === true) {
      // Use percentage for panel mode
      let sideWidth = 30;
      return "--side-width:" + sideWidth + "%;--sidebar-width:" + sidebarWidth + ";--sidebar-min-width:" + sidebarMinWidth;
    } else {
      // Use fixed width for normal mode
      return "--side-width:" + sidebarWidth + ";--sidebar-width:" + sidebarWidth + ";--sidebar-min-width:" + sidebarMinWidth;
    }
  }
  
  _showFlex(showSidebar) {
    if (showSidebar === false) {
      return "none";
    }
    return "flex";
  }

  _showBlock(confValue) {
      if(confValue === false) {
          return "none";
      }
      return "block";
  }

  _lightSize(positionWidth, gapWidth, panelType) {
    if (panelType === false) {
      return (parseInt(positionWidth.replace(/px/,"")) + parseInt(gapWidth.replace(/px/,""))) + "px";
    } else {
      return "50%";
    }
  }
  
  _buttonFont(titleSize,buttonText) {
    let fieldSize = parseInt(titleSize.replace(/px/,"")) * this.config.title.length;
    let buttonSize = fieldSize / buttonText.length;
    return buttonSize * 0.5;
  }
  
  _centerSliders(panelType) {
    if (panelType === true) {
      return "0 auto";
    } else {
      return "0";
    }
  }
  
  _switch(stateObj) {
    if (stateObj.state === 'on') {
      this.hass.callService("light", "turn_off", {
        entity_id: stateObj.entity_id    
      });
    } else {
      this.hass.callService("light", "turn_on", {
        entity_id: stateObj.entity_id    
      });
    }
  }
  
  _navigate(path,service,data) {
    if (service.length === 0) {
      window.location.href = path;
    } else {
      let domain = service.split(".",2)[0];
      let ser = service.split(".",2)[1];
      this.hass.callService(domain,ser, {
        entity_id: data
      });
    }
  }
  
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    if (!config.title) {
      throw new Error("You need to define a title");
    }
    for (var i = 0, len = config.entities.length; i < len; i++) {
      if (config.entities[i].entity === undefined) {
        throw new Error(config.entities[i] + " is INVALID! Should be object: - entity: " + config.entities[i] + ".");
      }
    }
    this.config = config;
  }
  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
        :host {
          --default-disabled: 189, 189, 189;
          --rgb-disabled: var(--default-disabled);
          --bg-color-inactive: rgba(var(--rgb-disabled), 0.2);
        }
        :host([dark-mode]) {
          --default-disabled: 111, 111, 111;
          --bg-color-inactive: rgba(var(--rgb-disabled), 0.1);
        }
   		:host([is-panel]) ha-card {
      	  left: 50;
      	  top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
        }
        ha-card {
      	  overflow: hidden;
      	  width: 100%;
      	  height: 100%;
      	  display: flex;
      	  justify-content: center;
    	}
        .page {
          width:100%;
          height:100%;
          display:flex;
          flex-direction: row;
        }
        .page > .side {
          padding: 10px;
          width: var(--side-width);
          min-width: var(--sidebar-min-width);
          display:var(--show-sidebar);
          flex-direction:column;
          background: rgb(28,122,226);
          background: linear-gradient(145deg, var(--sideColor-1) 0%, var(--sideColor-2) 90%);
          justify-content:space-between;
          flex-shrink: 0;
        }
        .side .header {
        }
        .side .center {
          display:flex;
          flex-direction:column;
        }
        .side .center .icon {
          display:block;
          overflow:hidden;
          text-align:center;
        }
        .side .center .icon ha-icon {
          color:var(--icon-color);
        }
        .side .center  h1 {
          color:var(--title-font-color);
          margin:10px 0 0 5px;
          font-weight:400;
          font-size: var(--title-size);
          line-height: var(--title-size);
          text-align: center;
        }
        .side .center  h3 {
          color:var(--count-font-color);
          margin:5px 0 5px 0;
          font-size: 120%;
          font-weight: 400;
          line-height: 100%;
          text-align: center;
        }
        
        .side .bottom {
        }
        
        .back-btn {
          border:2px solid var(--button-font-color);
          color:var(--button-font-color);
          background:transparent;
          font-size:var(--button-size);
          border-radius: 4px;
          width:100%;
          display:block;
          padding: 10px 0;
        }
        
        .page > .main {
          flex: 1;
          overflow-x:scroll;
          padding-bottom: 0px;
          -ms-overflow-style: none;  /* IE and Edge */
  		  scrollbar-width: none;  /* Firefox */
         }
        .page > .main::-webkit-scrollbar {
  		  display: none;
		}
        .page > .main > .inner-main {
          display:flex;
          flex-direction:row;
          align-items:center;
          height:100%;
          margin: auto;
          padding-right: 0px;
        }
        .page > .main > .inner-main > .light {
          width: var(--light-width);
          display:inline-block;
          margin: var(--center-slider);
          padding-bottom: 0px;
        }
        
        .light .icon {
          margin: 0 auto;
          text-align:center;
          display:block;
          height: 50px;
          width: 50px;
          color: rgba(255,255,255,0.3);
          font-size: 30px;
          padding-top:5px;
        }
        .light .icon ha-icon {
          width: 30px;
          height: 30px;
          text-align:center;
        }
        .light .icon.on ha-icon {
          fill: #f7d959;
        }
        h2 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-bottom: 10px;
          text-align: center;
          font-size:20px;
          margin-top:0;
        }
        
        h3 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          font-size:18px;
        }
        
        .light-brightness {
          display: var(--show-position);
          font-weight: 300;
          margin-top: calc(var(--light-fontsize) / 2);
          margin-bottom: var(--light-fontsize);
          text-align: center;
          font-size: var(--light-fontSize);
        }
          
        .light-slider {
          margin-bottom: 5px;
        }

        .light-slider .light-brightness {
          color: var(--primary-text-color);
        }
        
        h4 {
          color: var(--primary-text-color);
          display: block;
          font-weight: 300;
          margin-bottom: 20px;
          text-align: center;
          font-size:16px;
          margin-top:0;
        }
        .light-brightness:after {
          content: "%";
          padding-left: 1px;
        }
        
        .range-holder {
          height: var(--slider-height);
          position:relative;
          display: block;
        }
        .range-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: 9px;
          width: var(--slider-height);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform:rotate(270deg);
          -moz-transform:rotate(270deg);
          -o-transform:rotate(270deg);
          -ms-transform:rotate(270deg);
          transform:rotate(270deg);
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
        }
        :host([dark-mode]) .range-holder input[type="range"] {
          background-color: var(--closed-color);
        }
          
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          color: var(--open-color);
          margin-top: 0px;
          transition: box-shadow 0.2s ease-in-out;
        }

        .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 20px;
          height: var(--slider-width);
          -webkit-appearance: none;
          background: transparent;
          border: none;
          cursor: pointer;
          opacity: 0;
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          background: linear-gradient(to right, var(--open-color) 0%, var(--open-color) var(--slider-progress, 0%), var(--closed-color) var(--slider-progress, 0%), var(--closed-color) 100%);
          border-radius: 9px;
          transition: all 0.2s ease-in-out;
        }
        .toggle {
          margin-top: 20px;
          margin-bottom: 10px;
          display: var(--show-switch);
          align-items: center;
          justify-content: center;
        }
        .toggle > input.toggle-btn {
          display: none;
        }
        .toggle > input.toggle-btn + label {
          border: 1px solid #FFF;
          background: transparent;
          width: var(--switch-width);
          height: var(--switch-height);
          text-align:center;
          line-height: var(--switch-height);
          cursor: pointer;
          border-radius: 4px;
          color: var(--switch-font-color);
          display:block;
          font-size:var(--switch-labelSize);
        }
        .toggle > input.toggle-btn + label:active,
        .toggle > input.toggle-btn + label {
          background: var(--switch-color);
          border-color: var(--switch-color);
        }
        .toggle > input.toggle-btn + label> span:before {
          content: 'ON/OFF';
        }
    `;
  }  
  
}
customElements.define('ha-vertical-light-sliders', HaVerticalLightSliders);
