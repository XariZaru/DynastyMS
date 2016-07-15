/*
 * Name: Jonathan Nguyen
 * Desc: Gives skills to 4th jobs (basic skills that are supposed to be given upon advancement.
 */
status = -1;
var dream = 108000700;

function start() {
    if (cm.getPlayer().isFourth()) {
        switch(cm.getQ()) {
            case 59:
                cm.sendNext("Grendel? I don't believe I've spoken with you, but Taeng sent me here for you to train me in the ways of the generals and to provide me with the necessary equipment so I may enter the field of battle appropriately. Do you suppose you can help me?",2);
                break;
            case 60:
            case 61:
            case 62:
            case 63:
                cm.sendYesNo("Do you wish to return to the dream state and hone your skills?");
                break;
            default:
                cm.sendOk("Ah, the wind is quite nice today. I think I'll go for a walk.");
                cm.dispose();
                break;
        }
    } else { 
		cm.sendOk("You can job advance as an explorer by speaking to #eTaeng the Explorer#n here in Ellinia near the bottom of the map.");
		cm.dispose();
		return
	}
}

/*
 * MAKE SURE TO FIX THE WARP OUT FUNCTION
 */

function action(m,t,s) {
    if (m == 1) {
		if (!cm.getPlayer().isFourth()) {
			cm.dispose();
			return;
		}
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
         if (cm.getPlayer().isFourth()) {
            switch(cm.getQ()) {
                case 59:
                     cm.sendNext("Ah, a new general I see. There hasn't been a new one appointed for nearly 40 years! You would think that with all the chaos our generals would have either been assassinated or perished due to natural illnesses. It must be the work of new medicine that has been driving its course throughout all of Victoria. It seems our century is one that encourages the propagation of such research. Though, however reluctant I may be, most of the research comes from Orbis and diffuses into Victoria through main ports.");
                     break;
                case 60:
                case 61:
                case 62:
                case 63:
                    for (var i = 0; i < 9; i++) {
                        if (cm.getPlayerCount(dream + i) == 0 && cm.getPlayerCount(dream + (10 + i)) == 0) {
                        	cm.getPlayer().saveLocation("FREE_MARKET");
                            cm.warp(dream + i);
                            cm.dispose();
                            return;
                        }                       
                    }
                    cm.sendOk("Oh, it seems all the rooms for testing are taken up right now. Please wait until another general finishes or leaves his room.");
                    cm.dispose();
                    break;
                }
            }
    } else if (status == 1) {
        if (cm.getPlayer().isFourth()) {
            switch(cm.getQ()) {
                case 59:
                cm.sendAcceptDecline("I'll have to tell you right now that the experience you are about to witness is one faced by all the previous generals. They have all undergone such an event and have benefited from it. It should not be too difficult for you, but I just want to be sure you are prepared for a task. What you see on the other side I have no idea, but you must hold steady and be prepared to conquer whatever comes your path.\r\n\r\n#eWhat say you?");
                break;
            }
        }
    } else if (status == 2) {
        if (cm.getPlayer().isFourth()) {
            switch(cm.getQ()) {
                case 59:
                    cm.sendOk("If you close your eyes I will take your mind to another place where you can focus your energy into obtaining the skills you need to be a worthy commander. When you wake, and if you are successful, you will be more powerful than ever before. If you fail there is no telling what will happen to your mind and soul.");
            }
        }
    } else if (status == 3) {
        if (cm.getPlayer().isFourth()) {
            switch(cm.getQ()) {
                case 59:
                    for (var i = 0; i < 9; i++) {
                        if (cm.getPlayerCount(dream + i) == 0 && cm.getPlayerCount(dream + (10 + i)) == 0) {
                            cm.warp(dream + i);
                            cm.completeQ();
                            cm.dispose();
                            return true;
                        }
                    }                   
                    break;
            }
        }
    }
}