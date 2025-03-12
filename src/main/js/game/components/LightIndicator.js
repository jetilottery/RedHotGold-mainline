define(require => {

    //const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    //const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    //const resLib = require('skbJet/component/resourceLoader/resourceLib');
    //const utils = require('game/components/utils/utils');
    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenMax;

    class LightIndicator extends PIXI.Container {
        constructor() {

            super();

            this.WIDTH = 60;
            this.HEIGHT = 60;
            this.enabled = false;
            this.spineAnim = undefined;
            this.index = undefined;


            // Create all the empty sprites
            this.background = new PIXI.Sprite();

            this.light = new PIXI.Sprite();
            this.light.anchor.set(0.5);
            this.light.scale.set(0.914);
            this.light.texture = PIXI.Texture.fromFrame('pickAreaGreenMultiLightOn');
            this.light.x = 65;
            this.light.y = -5;
            this.light.alpha = 0;
            this.pickPointType = '';
            this.useWinningFrameAtAllTimes = false;
            this.interactionState = '';
            this.winType = '';


            // Center everything
            this.background.anchor.set(0.5);
            //this.revealAnim.anchor.set(0.5);
            //this.idleAnim.anchor.set(0.5);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Sprite();
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';
            this.addChild(this.background, this.resultContainer, this.light);

            // State
            this.revealed = false;
            this.interactionState = '';
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;

            }).then(
                () => {
                    this.enabled = false;
                });
        }

        populate(value) {
            this.value = value;
            const _this = this;

            if (this.index === 0) {
                _this.light.texture = PIXI.Texture.fromFrame('bonusLightOn');
            } else {
                _this.light.texture = PIXI.Texture.fromFrame('pickAreaGreenMultiLightOn');
            }
        }


        turnOnLight() {
            Tween.fromTo(this.light, 0.5, {
                alpha: 0
            }, {
                alpha: 1,
                yoyo: true,
                repeat: 4
            });
        }

        prompt() {
            this.bringToFront();
            this.background.visible = false;
            this.setSpineState({
                state: 'APPEAR',
                loop: false
            });
        }

        stopIdle() {
            this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        deleteIndicator() {
            //utils.removeSpineListeners(this.spineAnim);
            //utils.stopSpineAnim(this.spineAnim);
            //this.spineAnim.visible = false; // check that the symbols are visible again when replay.
        }

        reset() {
            this.enabled = false;
            this.light.alpha = 0;
            this.resultContainer.visible = false;
            this.background.visible = false;
            this.revealed = false;
            this.matched = false;
        }

        bringToFront() {
            // we need to move this pick point to the front
            // as otherwise the coverAnim will underlap neighbouring pickPoints
            this.parent.parent.setChildIndex(this.parent, this.parent.parent.children.length - 1);
        }

        static fromContainer(container, index) {
            const symbol = new LightIndicator();
            symbol.index = index;
            container.addChild(symbol);
            return symbol;
        }
    }

    return LightIndicator;
});