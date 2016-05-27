/*
 * Name: Jonathan Nguyen (credits to Janice Hui)
 * Version: 1.0
 * Desc: Boat from Orbis to Ludi
 */


function start(){
    if (cm.haveItem(4031045,1)) {
        switch(cm.getOrbisLudiBoatStatus()) { //NOBOAT(0), TOOLATE(1), CANBOARDBOAT(2)
            case 0:
                cm.sendOk("The boat to Orbis has already taken off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 1:
                cm.sendOk("The boat to Orbis is ready to take off and will accept no more passengers, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 2:
                cm.sendYesNo("It looks like there are plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long, but you'll get to your destination just fine. What do you think? Do you wants to get on this ride?");
                break;
        }
    }
}

function action(mode, type, selection) {
    if(mode == 1){
        cm.gainItem(4031045,-1);
        cm.warp(220000111);
    }
        cm.dispose();
}