function start() {
    if (cm.getQ()==15) {
        cm.sendAcceptDecline("Are you ready to take on what it means to be a #bMagician#k? You will be the front of the line Explorer, no fear at"+
                " all.");
    } else {
        cm.playerMessage(6,"The statue stands still with unmoving eyes.");
        cm.talkGuide("Perhaps we should come back another time.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        cm.warp(101000000);
        cm.gainItem(2000013, 100), cm.gainItem(2000014, 100), cm.gainItem(1142107), cm.gainItem(4161001), cm.completeQ(), 
        cm.talkGuide("Hey, look at that guy over there. Why don't we talk to him? Maybe he knows what to do."), cm.dispose();
    }
}