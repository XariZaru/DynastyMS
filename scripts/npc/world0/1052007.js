

var status = 0;
var ticketSelection = -1;
var text = "Here's the ticket reader.";
var hasTicket = false;
var NLC = false;
var maps = [103000900, 103000903, 103000906];

function start() {
	cm.sendSimple("Pick your destination.\n\r\n#L0##bKerning City Subway#l\r\n#L1##bKerning square Shopping Center (Get on the subway)#l\n\n\r\n#L2#Enter Contruction Site#l\r\n#L3#New Leaf City#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		cm.warp(103000101);
    		cm.dispose();
    		return;
        } else if (selection == 1) {
    		var train = cm.getEventManager("KerningTrain");
        	train.newInstance("KerningTrain");
        	train.setProperty("player", cm.getPlayer().getName());
        	train.startInstance(cm.getPlayer());
        	cm.dispose();
        	return;
        } else if (selection == 2) {
			cm.sendSimple("Which map would you like to go to?", "#m"+maps[0]+"#", "#m"+maps[1]+"#", "#m"+[2]+"#");  
			hasTicket = true;
        } else if (selection == 3) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("It seems you don't have a ticket! You can buy one from Bell.");
	    		cm.dispose();
	    		return;
        	}
        	cm.warp(600010001);
			cm.gainItem(4031711, -1);
        }
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                //cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(maps[selection]);
                cm.dispose();
                return;
            }
    	}
	    if (cm.haveItem(4031711)) {
		   	cm.gainItem(4031711, -1);
	        cm.warp(600010004);
	    	cm.dispose();
	    	return;
		}
    }
}