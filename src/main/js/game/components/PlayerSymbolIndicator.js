define(require => {
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

    class PlayerSymbolIndicator extends PIXI.Container {
        constructor() {
            super();

            this.spineAnim = new PIXI.spine.Spine(resLib.spine['pickPoints'].spineData);
            this.defaultState = 'landscape/pickTakenLight_OFF';

            this.addChild(this.spineAnim);
        }

        enable() {
            this.spineAnim.state.setAnimation(0, 'landscape/pickTakenLight_anim', false);
        }

        on() {
            this.spineAnim.state.setAnimation(0, 'landscape/pickTakenLight_ON', false);
        }

        disable() {
            this.spineAnim.state.setAnimation(0, 'landscape/pickTakenLight_OFF', false);
        }

        pulse() {
            if(!autoPlay._enabled) {
                this.spineAnim.state.setAnimation(0, 'landscape/pickTakenLight_LOOP', true);
            }
        }

        static fromContainer(container) {
            const symbol = new PlayerSymbolIndicator();
            container.addChild(symbol);
            return symbol;
        }
    }

    return PlayerSymbolIndicator;
});