define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const text = require('skbJet/componentManchester/standardIW/components/fittedText');

    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenLite;

    let goldBonusState = 'bonusGoldFill';
    let greenBonusState = "bonusgreenFill";

    class BonusValve extends Pressable {
        constructor(index, posType) {
            super();

            this.index = index;
            this.posType = posType;

            this.needle = new PIXI.Sprite(PIXI.Texture.from('bonusDialNeedle'));
            this.decals = new PIXI.Sprite(PIXI.Texture.from('bonusDialDecals'));
            this.background = new PIXI.Sprite(PIXI.Texture.from('bonusGoldDialBG'));
            this.valueBackgroud = new PIXI.Sprite(PIXI.Texture.from('bonusSilverInfoBox'));
            this.bonusStatus = new PIXI.Sprite(PIXI.Texture.from(goldBonusState));

            this.idleSpine = new PIXI.spine.Spine(resLib.spine['bonusDialSweep'].spineData);

            this.value = new text(resources.i18n.Game.bonusValueSelect);
            this.value.style = textStyles.bonusValveValueSelect;
            this.value.maxWidth = 149;

            this.data = undefined;

            this.needle.anchor.set(0.5, 0.65);
            this.decals.anchor.set(0.5);
            this.background.anchor.set(0.5);
            this.valueBackgroud.anchor.set(0.5);
            this.value.anchor.set(0.5);
            this.bonusStatus.anchor.set(0.5);

            this.decals.y = -5;
            this.bonusStatus.y = 9;
            this.background.y = 2;
            this.value.y = -2;

            this.array = [];

            if (this.posType === 1) {
                this.valueBackgroud.y = 100;
                this.bonusStatus.y = 9;
                this.hitArea = new PIXI.Rectangle(-85, -81, 170, 205);
            } else {
                this.valueBackgroud.y = -100;
                this.bonusStatus.y = -9;
                this.hitArea = new PIXI.Rectangle(-85, -125, 170, 205);
            }

            this.background.addChild(this.decals, this.needle);
            this.valueBackgroud.addChild(this.value);
            this.addChild(this.bonusStatus, this.background, this.valueBackgroud, this.idleSpine);

            this.reset();

            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.onClick();
                }
            });

            this.on('pointerover', this.onMouseOver);
            this.on('pointerout', this.onMouseOut);

            this.enabled = false;
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        onClick() {
            this.reveal();
        }

        onMouseOver() {
            if (this.enabled === true) {
                this.array.forEach(e => {
                    e.idleSpine.renderable = false;
                });
            }
        }

        onMouseOut() {
            this.array.forEach(e => {
                if (e.idleSpine.renderable === false) {
                    if (e.enabled === true && autoPlay.enabled === false) {
                        e.idleSpine.renderable = true;
                        e.idle();
                    }
                }
            });
        }

        populate(data) {
            this.data = data;
        }

        idle(array) {
            if (array !== undefined) {
                this.array = array;
            }

            this.idleSpine.state.setAnimation(0, "animation", true);

        }

        updateNeedle() {
            return new Promise(resolve => {
                let delay = gameConfig.bonusValveDelay;
                let rotation = -2.3;
                let val = this.data;

                switch (val) {
                    case 'B11': {
                        rotation = -2;
                        break;
                    }
                    case 'B10': {
                        rotation = -1.7;
                        break;
                    }
                    case 'B9': {
                        rotation = -1.4;
                        break;
                    }
                    case 'B8': {
                        rotation = -1.1;
                        break;
                    }
                    case 'B7': {
                        rotation = -0.8;
                        break;
                    }
                    case 'B6': {
                        rotation = -0.5;
                        break;
                    }
                    case 'B5': {
                        rotation = -0.2;
                        break;
                    }
                    case 'B4': {
                        rotation = 0.1;
                        break;
                    }
                    case 'B3': {
                        rotation = 0.4;
                        break;
                    }
                    case 'B2': {
                        rotation = 0.7;
                        break;
                    }
                    case 'B1': {
                        rotation = 1;
                        break;
                    }
                    case 'X': {
                        rotation = 1.7;
                        break;
                    }
                    case undefined: {
                        this.needle.rotation = -2.3;
                        break;
                    }
                }
                this.bonusStatus.visible = true;
                this.bonusStatus.alpha = 0;

                Tween.to(this.bonusStatus, gameConfig.bonusSpeedMulitplier, {
                    delay: delay,
                    alpha: 1,
                });

                Tween.to(this.needle, 0.5 * gameConfig.bonusSpeedMulitplier, {
                    delay: delay,
                    rotation: -2.1,
                    onComplete: () => {
                        Tween.to(this.needle, 0.5 * gameConfig.bonusSpeedMulitplier, {
                            rotation: rotation,
                            ease: window.Elastic.easeOut.config(1, 0.3),
                            onComplete: () => {
                                this.setValue(val);
                                resolve();
                            }
                        }, this);
                    }
                }, this);
            });
        }

        intro(i) {
            let _this = this;

            Tween.to(_this.needle, 0.25, {
                delay: (0.05 * i),
                rotation: -1.3,
                onComplete: () => {
                    Tween.to(_this.needle, 0.5, {
                        rotation: -2.3,
                    }, this);
                }
            }, this);

            Tween.to(_this.value, 0.1, {
                delay: (0.05 * i),
                alpha: 1,
            }, this);

        }

        complete(resolve) {
            this.array.forEach(e => {
                e.idleSpine.renderable = false;
            });

            if (scenarioData.scenario.multiplierValue === undefined) {
                Tween.delayedCall(2, () => {
                    msgBus.publish('Game.TransitionToBaseGame', resolve);
                });
            } else {
                Tween.delayedCall(2, () => {
                    resolve();
                });
            }
        }

        updateToCompletedState() {
            this.value.style = textStyles.bonusValveValue;
            this.bonusStatus.texture = PIXI.Texture.from(greenBonusState);
            if (this.data === undefined) {
                this.value.text = "";
            }
        }

        setValue(val) {
            if (val !== 'X') {
                this.value.text = SKBeInstant.formatCurrency(prizeData.prizeTable[val]).formattedAmount;
                msgBus.publish('Game.Bonus.Update', prizeData.prizeTable[val]);
            } else {
                this.value.text = resources.i18n.Game.bonusValueCollect;
            }

            Tween.delayedCall(0.5, () => {
                this.onMouseOut();
            });

        }

        reset() {
            this.data = undefined;
            this.needle.rotation = -2.3;
            this.bonusStatus.visible = false;
            this.bonusStatus.texture = PIXI.Texture.from(goldBonusState);
            this.value.text = resources.i18n.Game.bonusValueSelect;
            this.value.style = textStyles.bonusValveValueSelect;
            this.value.alpha = 0;

            this.idleSpine.renderable = true;
        }

        disable() {
            this.enabled = false;
        }

        static fromContainer(container, index, posType) {
            const valve = new BonusValve(index, posType);
            container.addChild(valve);
            return valve;
        }
    }

    return BonusValve;
});