define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    const utils = require('game/components/utils/utils');
    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenLite;

    class ScenarioSymbol extends PIXI.Container {
        constructor() {
            super();
            this.alpha = 0;
            this.WIDTH = 91;
            this.HEIGHT = 86;
            this.enabled = false;
            this.spineAnim = undefined;
            this.value = undefined;
            this.matched = false;
            this.initSpine('scenario');
            this.initSpineForGoldFlow();

            this.previousSquare = undefined;
            this.nextSquare = undefined;

            this.flow = false;

            this.index = undefined;
            this.double = null;
            // Create all the empty sprites
            this.background = new PIXI.Sprite();
            this.meshSprite = undefined;
            this.meshSpriteMatch = undefined;
            this.meshSpriteWin = undefined;
            this.goldFlowAnim.name = "goldFlow";

            this.revealedSymbol = new PIXI.Sprite();
            this.revealedSymbol.anchor.set(0.5);

            // Center everything
            this.background.anchor.set(0.5);

            // Add all the result elements to a containerg
            this.resultContainer = new PIXI.Sprite();
            this.resultContainer.addChild(this.revealedSymbol);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';
            this.addChild(this.background, this.resultContainer);

            // State
            this.revealed = false;
            this.interactionState = '';

            this.winPresented = false;
            this.anticipationGlow = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(this.WIDTH / -2, this.HEIGHT / -2, this.WIDTH, this.HEIGHT);
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

            this.revealAnim.state.addListener({
                complete: (entry) => {
                    if (['1x_tile/tileWin', '2x_tile_bottom/tileWin', '2x_tile_top/tileWin'].includes(entry.animation.name)) {
                        if (this.anticipationGlow) {
                            this.revealAnim.state.setAnimation(0, entry.animation.name, false);
                        }
                    }
                }
            });

            let orientationChange = this.onOrientationChange.bind(this);
            orientationChange();

            msgBus.subscribe('GameSize.OrientationChange', orientationChange);
        }

        initSpine(inVal) {
            const _this = this;

            // Set the spine state
            _this.pickPointType = (inVal === 'scenario') ? 'Your' : 'Lucky';

            // Set up spine project
            _this.spineAnim = new PIXI.spine.Spine(resLib.spine['coverAnims'].spineData);
            _this.revealAnim = new PIXI.spine.Spine(resLib.spine['coverAnims'].spineData);

            _this.revealAnimContainer = new PIXI.Container();
            _this.revealAnimContainer.addChild(_this.revealAnim);

            _this.revealAnimContainer.renderable = false;

            _this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });

            _this.setSpineState({
                state: 'DEFAULT',
                loop: false
            }, 'revealAnim');

            _this.addChildAt(_this.spineAnim, 0);
            _this.addChildAt(_this.revealAnimContainer, 1);


            // Add a listener to the winningAnim so we know when the initial match anim has completed
            // Then we can switch to the loop anim
            //_this.goldFlowAnim.state.addListener({
            //complete: function( /*entry*/ ) {
            //if (entry.animation.name === _this.pickPointType.toLowerCase() + 'FX/matchSymbolGlow') {
            //_this.setWinState({
            //state: 'LOOP',
            //loop: true
            //});
            //}
            //}
            //});
        }

        initSpineForGoldFlow() {

            this.goldFlowAnim = new PIXI.spine.Spine(resLib.spine['goldFlow'].spineData);
            this.goldFlowAnim.renderable = false;

            this.addChildAt(this.goldFlowAnim, this.children.legnth - 1);
            this.goldFlowAnim.x = -38;
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                //this.enabled = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        populate(value,textureMap) {
            let anim = '1x_tile/tileStatic';
            if (this.double !== null) {
                if (this.index < this.double) {
                    anim = "2x_tile_top/tileStatic";
                } else {
                    anim = "2x_tile_bottom/tileStatic";
                }
            }

            this.spineAnim.state.setAnimation(0, anim, false);            

            this.value = value;
            const _this = this;

            let prefix = "square";

            if (this.double !== null) {
                if (this.index < this.double) {
                    prefix = 'tiles_2x_top/2x1';
                } else {
                    prefix = 'tiles_2x_bottom/2x1';
                }
            }

            _this.meshSprite = textureMap[prefix + 'Symbol0' + value];
            _this.meshSpriteMatch = textureMap[prefix + 'Symbol0' + value + 'Match'];
            _this.meshSpriteWin = textureMap[prefix + 'Symbol0' + value + 'Win'];
        }

        prompt() {
            //this.visible = true; // me make visible spine anims to see the cascade effect.
            this.alpha = 1;
            this.background.visible = false;
            this.spineAnim.renderable = true;
            this.setSpineState({
                state: 'APPEAR',
                loop: false
            });

            let target = 'targetTile';

            if (this.double !== null) {
                if (this.index < this.double) {
                    target = 'targetTile2x_top';
                } else {
                    target = 'targetTile2x_bottom';
                }
            }

            this.addToMesh(this.spineAnim, target, this.meshSprite);
        }

        makeGlow() {
            this.setSpineState({
                state: 'IDLE',
                loop: false
            });
            this.enabled = true;
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

        rollover() {
            //console.log('ScenarioSymbol: rollover');
        }

        stopRollover() {
            //console.log('ScenarioSymbol: stopRollover');
        }

        reset() {
            this.spineAnim.renderable = true;
            this.value = undefined;
            this.enabled = false;
            this.goldFlowAnim.state.clearTracks();
            this.goldFlowAnim.skeleton.setToSetupPose();
            this.goldFlowAnim.renderable = false;
            this.resultContainer.visible = false;
            this.background.visible = false;
            this.revealed = false;
            this.matched = false;
            this.flow = false;
            this.winPresented = false;
            this.anticipationGlow = false;
            if (this.spineAnim.state.listeners.length > 0) {
                utils.removeSpineListeners(this.spineAnim);
                utils.stopSpineAnim(this.spineAnim);
            }
            this.setSpineState({
                state: 'DEFAULT',
                loop: false
            });
            this.spineAnim.renderable = false;
            this.revealAnimContainer.renderable = false;
        }

        /*bringToFront() {
          // we need to move this pick point to the front
          // as otherwise the coverAnim will underlap neighbouring pickPoints
          this.parent.parent.setChildIndex(this.parent, this.parent.parent.children.length - 1);
        }*/

        setGoldFlowState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;

            // Stop anim if there is no state
            if (!data.state) {
                utils.stopSpineAnim(this.goldFlowAnim);
                return;
            }

            // Set win
            switch (data.state) {
                case 'WIN_ALL':
                    nextState = 'winAll_anim';
                    // Symbol is shown in spine anim, so we no longer need the statics
                    //this.noWin.texture = PIXI.Texture.EMPTY;
                    //this.win.texture = PIXI.Texture.EMPTY;
                    break;
                case 'MULTIPLIER':
                    nextState = 'win2x_anim';
                    break;
                case 'ANIMATE':
                    // Loop automatically called when ...NumberMatch_anim is complete
                    nextState = 'goldFlowAnim_mid';
                    break;
                case 'IDLE':
                    // Loop automatically called when ...NumberMatch_anim is complete
                    nextState = 'goldFlowStatic_mid';
                    break;
                case 'DEFAULT':
                    nextState = 'goldFlowStatic_mid';
                    // We do not want the initial anim to loop, so override whatever doLoop currently is
                    doLoop = false;
                    break;
            }

            //this.goldFlowAnim.renderable = true;
            this.goldFlowAnim.state.setAnimationByName(syncTime, nextState, doLoop);
        }


        setSpineState(data, target) {
            const _this = this;

            let spineTarget = "spineAnim";

            if (target !== undefined) {
                spineTarget = target;
            }

            let prefix = '1x_tile';

            if (this.double !== null) {
                if (this.double < this.index) {
                    prefix = "2x_tile_bottom";
                } else {
                    prefix = "2x_tile_top";
                }
            }

            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'DEFAULT':
                    nextState = prefix + '/tileStatic';
                    break;
                case 'APPEAR':
                    nextState = prefix + '/tileTurn_IN';
                    break;
                case 'IDLE':
                    nextState = prefix + '/tileTurn_IN';
                    break;
                case 'REVEAL':
                    nextState = _this.revealAnimationFrame;
                    break;
                case 'MATCH':
                    nextState = prefix + '/tileWin';
                    break;
                case 'OFF':
                    nextState = this.defaultState;
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }
            this[spineTarget].renderable = data.state !== 'OFF';
            this[spineTarget].state.setAnimation(syncTime, nextState, doLoop);
        }

        addToMesh(spineAnim, slotName, renderTexture) {
            let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(slotName)];
            let attachment = undefined;

            attachment = slot.attachment;

            attachment.region.texture = renderTexture;
            attachment.updateUVs();

            slot.currentMesh.texture = renderTexture;
            slot.currentMesh.uvs = new Float32Array(attachment.regionUVs);
            slot.currentMesh.dirty = true; 
        }

        async uncover() {
            const _this = this;
            //const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            //msgBus.publish(evt+'Out', this);
            await new Promise(resolve => {
                // we need to move this pick point to the front
                // as otherwise the coverAnim will underlap neighbouring pickPoints
                //_this.bringToFront();
                // we also need to bring this overall number set to the front
                // so that all spine anims are at the very front of the screen
                // _this.parent.parent.parent.setChildIndex(_this.parent.parent, _this.parent.parent.parent.children.length - 1);
                // need to define a global scope since the spine listeners don't maintain scope
                var globalScope = _this;
                globalScope.background.visible = true;
                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                utils.removeSpineListeners(globalScope.spineAnim);
                globalScope.spineAnim.state.addListener({
                    complete: function ( /*entry*/) {
                        utils.removeSpineListeners(globalScope.spineAnim);
                        resolve();
                    }
                });

                _this.setGoldFlowState({
                    state: 'DEFAULT',
                    loop: false
                });

                _this.resultContainer.visible = true;
                _this.enabled = false;
            });
        }

        match() {
            this.matched = true;

            this.stopAnticipation();

            let target = 'targetTileWin';
            let target_2 = 'targetTileMatched';

            if (this.double !== null) {
                if (this.index < this.double) {
                    target = 'targetTile_2x_top_win';
                    target_2 = 'targetTile_2x_top_matched';
                } else {
                    target = 'targetTile_2x_bottom_win';
                    target_2 = 'targetTile_2x_bottom_matched';
                }
            }

            this.setSpineState({
                state: 'MATCH',
                loop: false
            }, 'revealAnim');

            Tween.delayedCall(0.1, () => {
                this.revealAnim.state.tracks[0].trackTime = 0.5;
                this.addToMesh(this.revealAnim, target, this.meshSpriteMatch);
                this.addToMesh(this.revealAnim, target_2, this.meshSpriteMatch);
                this.revealAnimContainer.renderable = true;
                msgBus.publish('Game.CheckLavaFlow');
                audio.playSequential('match');  
            }, null, this);
        }

        advanceGoldLava() {
            if (this.flow === false) {
                this.flow = true;

                this.goldFlowAnim.state.setAnimation(0, 'goldFlowAnim_mid', false);
                this.goldFlowAnim.state.addAnimation(0, 'goldFlowStatic_mid', false);

                this.goldFlowAnim.renderable = true;
            }
        }

        presentWin() {
            if (!this.winPresented) {
                this.winPresented = true;

                let prefix = '1x_tile';
                let attachment = "targetSymbol_win";

                if (this.double !== null) {
                    if (this.double < this.index) {
                        prefix = "2x_tile_bottom";
                    } else {
                        prefix = "2x_tile_top";
                    }
                }

                let target = 'targetTileWin';

                if (this.double !== null) {
                    if (this.index < this.double) {
                        target = 'targetTile_2x_top_win';
                        attachment = "targetSymbol_2x_win_Top";
                    } else {
                        target = 'targetTile_2x_bottom_win';
                        attachment = "targetSymbol_2x_win_Bottom";
                    }
                }

                this.revealAnim.state.setAnimation(0, prefix + '/tileWin', false);
                this.revealAnim.skeleton.setAttachment(target, attachment);
                Tween.delayedCall(0.1, () => {
                    this.addToMesh(this.revealAnim, target, this.meshSpriteWin);
                }, null, this);
            }
        }

        anticipation() {
            if (this.winPresented === false) {
                let prefix = '1x_tile';

                this.anticipationGlow = true;

                if (this.double !== null) {
                    if (this.double < this.index) {
                        prefix = "2x_tile_bottom";
                    } else {
                        prefix = "2x_tile_top";
                    }
                }

                this.spineAnim.state.setAnimation(0, prefix + '/tileStatic_GLOW', true);
            }
        }

        stopAnticipation() {
            if (this.anticipationGlow) {

                let prefix = '1x_tile';

                this.anticipationGlow = false;

                if (this.double !== null) {
                    if (this.double < this.index) {
                        prefix = "2x_tile_bottom";
                    } else {
                        prefix = "2x_tile_top";
                    }
                }

                this.spineAnim.state.setAnimation(0, prefix + '/tileStatic', true);
            }
        }

        onOrientationChange() {
            this.goldFlowAnim.x = orientation.get() === orientation.LANDSCAPE ? -38 : -24;
        }

        static fromContainer(container, index) {
            const symbol = new ScenarioSymbol();
            symbol.index = index;
            container.addChild(symbol);
            return symbol;
        }
    }

    return ScenarioSymbol;
});