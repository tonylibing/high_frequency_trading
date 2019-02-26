import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

class PlayerRoleButton extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: inline-block;
                font-family: monospace;
                font-weight: bold;
            }

            button{
                font-family: monospace;
                font-size: 16px;
                background-color:#7F9AB5;
                color:#FFFFF0;
                text-align:center;
                width:90px;
                height:45px;
                border-radius: 5px;
                margin-top:10px;
            }
        
            /*
            button [strategy-on=selected]{
                animation-name: selected-animation;
                animation-duration: 1s;
                animation-fill-mode: forwards;
            }
            */
           
            .role-selected{
                animation-name: selected-animation;
                animation-duration: 1s;
                animation-fill-mode: forwards;
            }
            

            @keyframes selected-animation {
                100% {
                  background-color: #ED6A5A;
                }
            }

            /*
            button [strategy-on=not-selected]{
                animation-name: not-selected-animation;
                animation-duration: 1s;
                animation-fill-mode: forwards;
            }
            */
            
            .role-not-selected{
                animation-name: not-selected-animation;
                animation-duration: 1s;
                animation-fill-mode: forwards;
            }
            
            @keyframes not-selected-animation {
                100% {
                  background-color: #7F9AB5;
                }
            }
        </style>

        <div class="button">
            <button on-click="_handleClick" class$="{{_isSelected(roleName, playerRole)}}"> 
            [[roleName]] 
            </button>
        </div>
        `;
    }

    static get properties(){
        return {
            roleName: String,
            playerRole: String
        }
    }
            
    constructor(){
        super();    
    }

    _handleClick(){
        let socketMessage = {
            type: 'role_change',
            state: this.roleName,
        }

        let userInputEvent = new CustomEvent('user-input', {bubbles: true, composed: true, 
            detail: socketMessage });
            
        this.dispatchEvent(userInputEvent);
    } 

    _isSelected(roleName, playerRole) {
        // use custom class names instead of bool
        // since polymer and html does not like bools on markup
        return roleName == playerRole ? 'role-selected' : 'role-not-selected'
    }
}

customElements.define('player-role-button', PlayerRoleButton);