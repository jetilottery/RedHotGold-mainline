define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['MusicLoop', 0],
    winTerminator: ['MusicTermWin', 1],
    loseTerminator: ['MusicTermLose', 1],
    click: ['Click', 4],
    costDown: ['BetDown', 1],
    costUp: ['BetUp', 2],
    buy: ['BuyButton', 2],
    costMax: ['BetMax', 3],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    match: ['MatchingSymbolSelect_1', 8],
    match_2: ['MatchingSymbolSelect_2', 9],
    match_3: ['MatchingSymbolSelect_3', 10],
    match_4: ['MatchingSymbolSelect_4', 11],
    match_5: ['MatchingSymbolSelect_5', 12],

    playerNumber: ['YourNumberSelect_1', 3],
    playerNumber_2: ['YourNumberSelect_2', 4],
    playerNumber_3: ['YourNumberSelect_3', 5],
    playerNumber_4: ['YourNumberSelect_4', 6],
    playerNumber_5: ['YourNumberSelect_5', 7],

    winlineWin_1: ['WinlineWin_1', 1],
    winlineWin_2: ['WinlineWin_2', 2],
    winlineWin_3: ['WinlineWin_3', 3],
    winlineWin_4: ['WinlineWin_4', 4],
    winlineWin_5: ['WinlineWin_5', 5],
    winlineWin_6: ['WinlineWin_6', 6],

    bonusGameReveal: ['BonusGameReveal', 3],
    multiplierGameReveal: ['MultiplierPrizeReveal', 4],

    bonusLightReveal: ['BonusLightReveal', 5],
    multiplierLightReveal: ['MultiplierLightReveal', 12],

    multiplierLight_1: ['MultiplierLight_1', 8],
    multiplierLight_2: ['MultiplierLight_2', 9],
    multiplierLight_3: ['MultiplierLight_3', 10],

    lightTrail_1: ['LightTrailWhoosh', 3],
    lightTrail_2: ['LightTrailWhoosh', 4],

    multiplierHammerSmash: ['MultiplierHammerSmash', 2],
    multiplierPowerMeter: ['MultiplierPowerMeter', 3],

    bonusCollect: ['BonusCollect', 2],
    tileReveal: ['TileReveal', 5],

    maxPrize: ['MaxPrize', 8],

    bonusSelect: ['BonusSelect', 6],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    //  buy: ['BuyButton', 4],
    //  revealAll: ['RevealAllButton', 4],
});
