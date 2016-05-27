function start() {
    if (cm.getQ()==48 && cm.getJobId() < 1000) {
        cm.sendSimple("#b(The portal seems to shimmer with a dreadful light.\r\n\r\n#L0#Enter?");
    } else {
        cm.playerMessage(6,"The portal shimmers slightly, but has no sense of energy.");
        cm.talkGuide("Perhaps we should come back at a later time.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        cm.warp(677000000);
        cm.dispose();
    }
}