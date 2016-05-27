var status = 0;

function start () {
    if (cm.haveItem(4031045, 1)) {
        cm.sendYesNo("Hey, it seems like you have a #i4031045#, will you like to go to Orbis");
    } else {
        cm.sendOk("You do not seem to have a #i4031045#, you can purchase it off Mue for 30,000 mesos!");
        cm.dispose();
        return;
    }
}

function action (mode, type, selection) {
    if (mode == - 1) {
        cm.dispose();
        return;
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("There's a lot to see in this town, come back when you feel like going to Ludibrium.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.gainItem(4031045, -1);
            cm.warp(200000100, 0);
            cm.dispose();
            return;
        }
    }
}
