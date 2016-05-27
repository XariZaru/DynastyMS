/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Desc: Goes to Kerning Square
 */

var status;

function start() {
    switch(cm.getMapId()) {
        case 103000100:
        case 103000310:
            cm.sendYesNo("Do you want to go to "+(cm.getMapId()==103000100 ? 
            "Kerning Square" : "Kerning Subway")+"?");    
            break;
        default:
            cm.sendOk("What's up");
            cm.dispose();
            break;
    }
}

function action(m,t,s) {
    if (m == 1) {
        cm.warp(cm.getMapId()==103000100 ? 103000310 : 103000100);
    }
    cm.dispose();
}