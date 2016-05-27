var status = -1, cont = 4031474, yes;

function start() {
    if (cm.getQ()==11) {
        cm.sendNext("Oh, who are you? Wait, I think I've seen you running around. You were the "+
            ""+(cm.getPlayer().getGender()==0 ? "guy" : "girl")+" helping #bSanta#k, weren't you?");
    } else if (cm.getQ() == 3) {
		cm.sendNext("Dang it, where are my supplies already? ...");
	} else {
			cm.sendOk("Holidays are quite the hassle ...");
			cm.dispose();
	}
}

function action(m,t,s) {
	if (m == 1) {
		status++;
	} else if (m == -1) {
		cm.dispose();
		return;
	} else {
		status--;
	}
	if (status == 0) {
            if (cm.getQ()==11) {
                cm.sendNext("Yup, that was me. You were the guy he told me to give the supplies to.", 2);
            } else if (cm.getQ()==3) {
			cm.sendNext("Oh, are those my supplies?\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 50 exp");
		}
	} else if (status == 1) {
            if (cm.getQ()==11) {
                cm.sendNext("That's right, I remember now. Do you happen to have your contract on you?");
            } else if (cm.getQ()==3) {
			cm.complete();
			cm.completeQ();
			cm.gainExp(50);
			cm.talkGuide("That's what Santa wanted. We should probably go see him now.");
			cm.dispose();
		}
        } else if (status == 2) {
            if (cm.getQ()==11) {
                if (!cm.haveItem(cont)) {
                    cm.sendNext("Oh, you actually don't. We can fix that easily. Just sign your name on this sheet of"+
                            " paper and you'll be fine.");
                    yes = false;
                } else {
                    cm.sendNextPrev("Okay, let me see your contract now ... ");
                }
            }
        } else if (status == 3) {
            if (cm.getQ()==11) {
                if (yes == false) {
                    cm.sendGetText("Just sign your name here and we'll be done.");
                } else {
                    cm.sendOk("Judging from the work you have done here today, and how you offered your services so"+
                        " willingly to #bSanta#k, I'll mark #e\"guest\"#n as #e\"assistant\"#n. That way you'll receive"+
                    " free home and lodging whenever you pass by #bHappyville#k.");
                    cm.completeQ();
                    cm.gainExp(150);
                    cm.talkGuide("Let's talk to Mom and Dad again!");
                    cm.dispose();
                }
            }
        } else if (status == 4) {
            if (cm.getQ()==11) {
                text = cm.getText();
                if (yes == false) {
                if (text == cm.getPlayer().getName()) {
                    cm.sendNext("Here you go! Your contract once again.\r\n\r\n#eObtained!#n\r\n#i"+cont+"#");
                    cm.gainItem(cont, 1);
                    yes = true;
                    status = 1;
                } else {
                    cm.talkGuide("I don't believe you signed your name correctly. Cliff would probably get annoyed if you gave him a misleading name.");
                    cm.dispose();
                }
                } else {
                    cm.talkGuide("How wonderful! Let's celebrate by talking with your #bMom and Dad#k!");
                    cm.dispose();
                }
            }
        }
}
	
