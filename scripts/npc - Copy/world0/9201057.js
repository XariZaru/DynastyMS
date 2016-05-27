var tix = [4031711,4031713]; // to nlc, to kerning
var pos = 1;
var price = 5000;

function start() {
    (cm.getMapId()==600010001 ? pos = 1 : pos = 0);
    if (cm.getMapId()==600010001 || cm.getMapId()==103000100) {
        if (!cm.haveItem(tix[pos],1)) {
            cm.sendYesNo("Would you like to purchase a ticket for the subway train? It\n\
 costs "+price+" mesos.");
        } else {
            switch(cm.getKerningNLCTrainStatus()) {
                case 0:
                    cm.sendOk("The train has already left. You must wait for it to return before boarding.");
                    cm.dispose();
                    break;
                case 1:
                    cm.sendOk("The train is already getting ready to leave. It is too late to board it. Please come back later.");
                    cm.dispose();
                    break;
                case 2:
                    cm.sendYesNo("Do you want to board this train? There is still plenty of room left.");
                    break;
            }
        }
    } else {
        cm.sendYesNo("Do you wish to leave? Your ticket will not be refunded.");
    }
}

function action(m,t,s) {
    if (m == 1) {
        if (!cm.haveItem(tix[pos],1)) {
            if (cm.getMeso()>=5000) {
                cm.sendOk("You have purchased a ticket for 5000 mesos.");
                cm.gainItem(tix[pos],1);
                cm.gainMeso(-price);
            } else {
                cm.sendOk("You lack the mesos required to purchase this ticket.");
            }
        } else if (cm.getMapId()==600010002 || cm.getMapId()==600010004) {
            cm.warp(cm.getMapId()==600010002 ? 600010001 : 103000100);
        } else {
            cm.warp(cm.getMapId()==600010001 ? 600010002 : 600010004);
            cm.gainItem(tix[pos],-1);
        }
    }
    cm.dispose();
}