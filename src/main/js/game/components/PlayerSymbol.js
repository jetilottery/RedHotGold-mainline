define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenLite;

    let bonusLightLoc = {landscape: {x: 635, y: 85}, portrait: {x: 60, y: 275}};
    let multiplierLightLoc = {landscape: {x: 1100, y: 100}, portrait: {x: 590, y: 310}};


    class PlayerSymbol extends Pressable {
        constructor() {
            super();

            this.WIDTH = 91;
            this.HEIGHT = 86;

            this.index = undefined;

            this.enabled = false;
            this.spineAnim = undefined;
            this.revealOrder = [];

            this.initSpine('player');

            // Create all the empty sprites
            this.background = new PIXI.Sprite();

            this.playerLight = new PIXI.Sprite();
            this.playerLight.anchor.set(0.5);
            this.playerLight.scale.set(0.914);
            this.playerLight.alpha = 0;
            this.playerLight.texture = PIXI.Texture.EMPTY; //PIXI.Texture.fromFrame('pickAreaGreenMultiLightOn'); //default assignment just for testing purposes.
            this.playerLight.x = orientation.get() === orientation.LANDSCAPE ? 65 : 68;
            this.playerLight.y = -3;

            //this.win = new PIXI.Sprite();
            //this.noWin = new PIXI.Sprite();
            this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.revealAnim.loop = false;
            this.revealAnim.visible = false;
            this.idleAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.idleAnim.loop = false;
            this.idleAnim.animationSpeed = 0.5;
            this.idleAnim.visible = false;

            this.revealAnimationFrame = undefined;

            this.typeOfLight = undefined;
            this.particleLightFunction = undefined;
            /*
                  this.revealedSymbolBG = new PIXI.Sprite();
                  this.revealedSymbolBG.anchor.set(0.5);
                  this.revealedSymbolBG.scale.set(0.914);
                  this.revealedSymbolBG.texture = PIXI.Texture.fromFrame('revealedSymbolBG');
            */
            //this.revealedSymbol = new PIXI.Sprite();
            //this.revealedSymbol.anchor.set(0.5);

            //this.revealedSymbolBG.addChild(this.revealedSymbol);

            this.winningAnim = undefined;
            this.pickPointType = '';
            this.useWinningFrameAtAllTimes = false;
            this.interactionState = '';
            this.winType = '';

            this.idleAnim.onComplete = () => {
                this.idleAnim.visible = false;
                this.revealAnim.visible = true;
            };

            // Center everything
            this.background.anchor.set(0.5);
            //this.win.anchor.set(0.5);
            //this.noWin.anchor.set(0.5);
            this.revealAnim.anchor.set(0.5);
            this.idleAnim.anchor.set(0.5);
            // Add all the result elements to a container
            this.resultContainer = new PIXI.Sprite();
            //this.resultContainer.addChild(this.revealedSymbolBG/*this.win, this.noWin*/);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.array = [];

            this.addChild(this.background, this.resultContainer, this.playerLight);

            // State
            this.revealed = false;

            this.interactionState = '';

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });
            //add the pointerover event
            this.off('pointerover');
            this.on('pointerover', () => {
                this.rollover();
            });
            this.off('pointerout');
            this.on('pointerout', () => {
                this.stopRollover();
            });
            this.on('pointerdown', () => {
                this.onMouseDown();
            });

            msgBus.subscribe('Game.BaseGame.checkIfMatchedComplete', () => {
                if (this.particleLightFunction !== undefined) {
                    this.particleLightFunction();
                    this.particleLightFunction = undefined;
                }
            });
            this.canGlow = true;
        }

        assignTypeOfLight(data) {
            return new Promise(resolve => {
                let newTexture;
                let particleLoc;
                let startLoc;
                let audioTrack = undefined;

                // "." = no light
                // "1" = green light
                // "2" = purple light
                switch (data.toString()) {
                    case ".":
                        newTexture = PIXI.Texture.EMPTY;
                        break;
                    case "1":
                        newTexture = PIXI.Texture.fromFrame('pickAreaPurpleMultiLightOn');
                        this.typeOfLight = "BONUS";
                        particleLoc = bonusLightLoc;
                        audioTrack = 'bonusLightReveal';
                        break;
                    case "2":
                        newTexture = PIXI.Texture.fromFrame('pickAreaGreenMultiLightOn');
                        this.typeOfLight = "MULTIPLIER";
                        particleLoc = multiplierLightLoc;
                        audioTrack = 'multiplierLightReveal';
                        break;
                }

                this.playerLight.texture = newTexture;
                if (audioTrack !== undefined) {
                    audio.play(audioTrack);
                }

                startLoc = orientation.get() === orientation.LANDSCAPE ?
                    {x: this.parent.x + 16, y: this.parent.y + 292} :
                    {x: this.parent.x + 55, y: this.parent.y};

                if (!autoPlay.enabled && data.toString() !== '.') {
                    this.particleLightFunction = () => {
                        let rand = Math.floor((Math.random() * 3) + 1);

                        Tween.delayedCall(2, () => {
                            msgBus.publish('Game.Particles.Goto', {
                                start: startLoc,
                                pos: {x: particleLoc[orientation.get()].x, y: particleLoc[orientation.get()].y},
                                particleType: this.typeOfLight,
                                config: rand,
                                cb: () => {
                                    msgBus.publish('Game.playerSymbolsManageLights', this.typeOfLight);
                                }
                            });
                        });
                    };
                }
                resolve();
            });
        }

        onMouseDown() {
            let ori = orientation.get() === orientation.LANDSCAPE ? "landscape" : "portrait";
            this.spineAnim.state.setAnimation(0, ori + "/btn_active_over", false);
        }

        initSpine(inVal) {
            this.pickPointType = (inVal === 'player') ? 'Your' : 'Lucky';

            this.spineAnim = new PIXI.spine.Spine(resLib.spine['pickPoints'].spineData);
            this.defaultState = 'landscape/btn_inactive_static';
            this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });

            this.addChild(this.spineAnim);

            // this.spineAnim.stateData.setMix('landscape/btn_active_highlightAnim', 'landscape/btn_active_static', 0.1);
            // this.spineAnim.stateData.setMix('landscape/btn_active_static', 'landscape/btn_active_highlightAnim', 0.1);
            //
            // this.spineAnim.stateData.setMix('landscape/btn_active_over', 'landscape/btn_active_highlightAnim', 0.1);
            // this.spineAnim.stateData.setMix('landscape/btn_active_highlightAnim', 'landscape/btn_active_over', 0.1);
            //
            // this.spineAnim.stateData.setMix('landscape/btn_active_over', 'landscape/btn_active_static', 0.1);
            // this.spineAnim.stateData.setMix('landscape/btn_active_static', 'landscape/btn_active_over', 0.1);
        }

        turnOn() {
            let _this = this;
            _this.bringToFront();
            return new Promise(resolve => Tween.fromTo(
                this.playerLight,
                0.55, {
                    alpha: 0,
                }, {
                    alpha: 1,
                    ease: window.Elastic.easeOut,
                    onComplete: function () {
                        resolve();
                    },
                }
            ));

        }

        enable() {
            return new Promise(resolve => {
                this.enabled = true;
                this.reveal = resolve;
                this.interactive = true;
                Tween.killTweensOf(this.mouseOutDelay);
            }).then(() => {
                this.enabled = false;
            });
        }

        storeOrder(shapes) {
            this.revealOrder = shapes.slice();
        }

        populate(value) {
            console.log('PlayerSymbol: populate: ' + value);

            const _this = this;

            console.log(this.revealOrder);
            console.log(this.revealOrder.indexOf(value));
            let tempIndex = this.revealOrder.indexOf(value) + 1;
            _this.revealAnimationFrame = 'landscape/btn_revealanim_0' + tempIndex;
        }

        prompt() {
            if (this.revealed === undefined || this.revealed === false) {

                this.bringToFront();
                this.background.visible = false;
                this.setSpineState({
                    state: 'APPEAR',
                    loop: false
                });
            }
        }

        makeGlow() {
            if (this.revealed === undefined || this.revealed === false) {
                if (this.canGlow) {
                    this.spineAnim.state.setAnimation(0, 'landscape/btn_active_highlightAnim', true);
                }
            }
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
            this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });
        }

        softDisable() {
            this.enabled = false;
        }

        rollover() {
            let _this = this;
            if (this.spineAnim.state.tracks[0].animation.name === "landscape/btn_active_static" || this.spineAnim.state.tracks[0].animation.name === "landscape/btn_active_highlightAnim") {
                if (this.spineAnim.state.tracks[0].animation.name !== "landscape/btn_active_over") {
                    this.spineAnim.state.setAnimation(0, 'landscape/btn_active_over', false);

                    Tween.killTweensOf(this.mouseOutDelay);

                    this.array.forEach(e => {
                        if (e.index !== _this.index && e.enabled) {
                            e.spineAnim.state.setAnimation(0, 'landscape/btn_active_static', false);
                        }
                    });
                }

            }
        }

        stopRollover() {
            let _this = this;
            if (this.spineAnim.state.tracks[0].animation.name === "landscape/btn_active_over") {
                this.spineAnim.state.setAnimation(0, 'landscape/btn_active_static', false);

                this.array.forEach(e => {
                    if (e.spineAnim.state.tracks[0].animation.name === 'landscape/btn_active_static' && e.enabled) {
                        Tween.delayedCall(0.3, _this.mouseOutDelay, [e]);
                    }
                });
            }
        }

        mouseOutDelay(e) {
            if (!autoPlay.enabled) {
                e.spineAnim.state.setAnimation(0, 'landscape/btn_active_highlightAnim', true);
            }
        }

        reset() {
            this.spineAnim.renderable = true;
            this.revealOrder = [];
            this.enabled = false;
            this.revealAnim.gotoAndStop(0);
            this.revealAnim.visible = true;
            this.canGlow = true;
            // this.noWin.visible = false;
            //this.win.visible = false;
            this.resultContainer.visible = false;
            this.background.visible = false;
            this.revealed = false;
            this.matched = false;
            this.playerLight.alpha = 0;
            this.playerLight.texture = PIXI.Texture.EMPTY;
            this.typeOfLight = undefined;
            this.particleLightFunction = undefined;

            utils.removeSpineListeners(this.spineAnim);
            utils.stopSpineAnim(this.spineAnim);
            this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });

        }

        bringToFront() {
        }

        setSpineState(data) {

            const _this = this;

            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'DEFAULT':
                    nextState = 'landscape/btn_inactive_static';
                    break;
                case 'APPEAR':
                    nextState = 'landscape/btn_active_static';
                    break;
                case 'IDLE':
                    nextState = 'landscape/btn_active_highlightAnim';
                    break;
                //case 'ROLLOVER':
                //nextState = this.pickPointType+'Number_MOUSEOVER';
                //break;
                case 'REVEAL':
                    nextState = _this.revealAnimationFrame; //'landscape/btn_revealanim_01';
                    break;
                //case 'ROLLOUT':
                //nextState = this.pickPointType+'Number_MOUSEOUT';
                //break;
                case 'OFF':
                    nextState = this.defaultState;
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }

            // If we're already in a rollout state, we don't want to be forcing the state back to default
            // as this would interrupt the rollout animation, so if we're going back to default, don't do anything
            //if (this.interactionState === 'ROLLOUT' && nextState === this.defaultState){
            //return;
            //}

            // Store the interaction state
            this.interactionState = data.state;

            utils.log('Changing spine state to: ' + nextState);
            this.spineAnim.renderable = data.state !== 'OFF';
            this.spineAnim.state.setAnimation(syncTime, nextState, doLoop);
        }

        async uncover() {

            const _this = this;
            //const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            //msgBus.publish(evt+'Out', this);
            await new Promise(resolve => {
                // we need to move this pick point to the front
                // as otherwise the coverAnim will underlap neighbouring pickPoints
                _this.bringToFront();
                // we also need to bring this overall number set to the front
                // so that all spine anims are at the very front of the screen
                _this.parent.parent.parent.setChildIndex(
                    _this.parent.parent,
                    _this.parent.parent.parent.children.length - 1
                );

                // need to define a global scope since the spine listeners don't maintain scope
                var globalScope = _this;

                globalScope.background.visible = true;
                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                utils.removeSpineListeners(globalScope.spineAnim);


                globalScope.spineAnim.state.addListener({
                    complete: function (/*entry*/) {

                        // Temp until we work out when the light needs to come on
                        Tween.to(globalScope.playerLight, 0.25, {
                            alpha: 1
                        });

                        utils.removeSpineListeners(globalScope.spineAnim);

                        _this.array.forEach(e => {
                            if (e.spineAnim.state.tracks[0].animation.name === 'landscape/btn_active_static' && e.enabled) {
                                Tween.delayedCall(0.3, _this.mouseOutDelay, [e]);
                            }
                        });

                        resolve();
                        //console.log("ANIMATION NAME--> " + entry.animation.name);
                        //console.log("ANIMATION TYPE--> " + entry.animation);
                        //console.log("ANIMATION TYPE--> " + entry);
                        //globalScope.setSpineState({state:'REVEAL', loop:false});
                        //if(entry.animation.name === 'REVEAL'){
                        //globalScope.setSpineState({state:'OFF', loop:false});
                        //this.cover.visible = false;
                        //resolve();
                        //}
                    }
                });

                // Disable interactivity to prevent re-reveal, then switch to the animation
                _this.resultContainer.visible = true;
                _this.enabled = false;
                _this.revealed = true;
                _this.makeReveal(); //msgBus.publish('Game.symbolRevealed');

            });

        }

        makeReveal() {

            //console.log("DISABLE CLICKS");
            let _this = this;
            this.enabled = false;
            _this.setSpineState({
                state: 'REVEAL',
                loop: false
            });

            _this.spineAnim.state.addListener({
                complete: function () {

                    console.log("ENABLE CLICKS");
                    _this.enabled = true;

                }
            });

            msgBus.publish('Game.playerSymbolsManageLights', _this.typeOfLight);
        }

        setAnimToStatic() {
            this.canGlow = false;
            this.setSpineState({
                state: 'APPEAR',
                loop: false
            });
        }

        match(winType) {
            this.matched = true;
            this.winType = winType || 'WIN';
            //this.win.visible = true;
            //this.noWin.visible = false;
        }

        presentWin() {
            let _this = this;
            _this.bringToFront();
            return new Promise(resolve => Tween.fromTo(
                this.resultContainer.scale,
                0.75, {
                    x: 0.666,
                    y: 0.666,
                }, {
                    x: 1,
                    y: 1,
                    ease: window.Elastic.easeOut.config(
                        gameConfig.matchAnimAmplitude,
                        gameConfig.matchAnimPeriod
                    ),
                    onComplete: function () {
                        //_this.setWinState({state:_this.winType,loop:true});
                        resolve();
                    },
                }
            ));
        }

        static fromContainer(container, index) {
            const symbol = new PlayerSymbol();
            symbol.index = index;
            container.addChild(symbol);
            return symbol;
        }
    }

    return PlayerSymbol;
});