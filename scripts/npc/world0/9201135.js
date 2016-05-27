/*
 * Name: Jonathan Nguyen
 * Desc: Guide for Malaysia
 */
var maps = [540000000,551000000];
var price = 25000;

function start() {
    switch(cm.getMapId()) {
        case 540000000:
            cm.sendYesNo("I can take you to #m"+maps[1]+"#, a nice and secluded\n\
 area away from the fighting caused by the Empire and the Rebels. It's only a trip of #b"+price+"#k\n\
 mesos.");
            break;
        default:
            cm.sendYesNo("Do you wish to leave Kampung Village and return to #m"+maps[0]+"#?");
    }
}

function action(m,t,s) {
    if (m == 1) {
        if (cm.getMapId()==540000000) {
            if (cm.getMeso()>=price) {
                cm.gainMeso(-price);
            } else {
                cm.sendOk("You are lacking mesos to purchase this trip to #m"+maps[1]+"#.");
            }       
        }
        cm.warp(cm.getMapId()==540000000 ? maps[1] : maps[0]);
        cm.dispose();
    }
}