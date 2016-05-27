var status;
var text;
var supply = 2430032;
var firework = 2022453;

function start() {
	status = -1;
		//10004
	if (cm.getQ() == 5) {
		if (cm.haveItem(firework,1)) {
			cm.sendOk("Set those fireworks off and engulf the world in holiday spirit!");
			cm.dispose();
		} else {
				cm.sendNext("How does it feel? That boost must be revitalizing, yes? God, I do love holiday spirit. I'll have to run and issue some errands. Perhaps you should return to your parents?"+
				"\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 50 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 2500 meso");
	}
		//10003
        } else if (cm.getQ() == 1) {
		cm.sendNext("Hohoho! Huh? Who are you?");
	} else if (cm.getQ() == 3) {
		cm.sendOk("Why haven't you gone to see #rCliff#k yet? He needs to leave with those supplies! The code is #b#esleighbells#n#k.");
		cm.dispose();
		//10001
        } else if (cm.getQ() == 2) {
		cm.sendNext("Hello! Who are you?");
	} else if (cm.getQ() == 4) {
			cm.sendNext("I see you've delivered the goods. I have to send those presents all around the world for children to enjoy. Though, most people come here for relaxation than"+
			" a enjoy the holiday spirit.");
		//10002            
	} else {
		cm.sendNext("Hello, I'm #rSanta#k, welcome to #b#m"+cm.getMapId()+"##k. Please enjoy your time here.");
		cm.dispose();
	}
}
	
function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else if (status == 1 && cm.getQ() == 1) {
		cm.sendOk("That's too bad. I would have thought you would be up to the task.");
		cm.dispose();
		return;
	} else {
		status--;
	}
	if (status == 0) {
			//10004
			if (cm.getQ() == 5) {
				cm.complete();
				cm.completeQ();
				cm.gainExp(50);
				cm.gainMeso(2500);
				cm.talkGuide("Let's go see your Mom and Dad again.");
				cm.dispose();
			//10003
                } else if (cm.getQ() == 1) {
			cm.gainExp(15);
			cm.talkGuide("I think Santa wants to say something else. Why don't you talk to him?");
			cm.completeQ();
			cm.dispose();
		} else if (cm.getQ()==4) {
			cm.sendAcceptDecline("Actually, to encourage some cheer would you like to help me set off some fireworks? Those always boost holiday spirit.");
			//10001                        
                } else if (cm.getQ() == 2) {
			cm.sendNext("#b#h ##k, sir. I thought you might need help with the holidays.",2);
			// 10000
		}
	} else if (status == 1) {
		if (cm.getQ() == 4) {
			cm.sendOk("Just set these off anywhere in #bHappyville#k. They'll give you a boost and supply others with an invisible form of spirit.");
                } else if (cm.getQ() == 2) {
			cm.sendAcceptDecline("Well that's just grand! I need #bCliff#k to make some deliveries to my workers. We're"+
			" a little behind our schedule. Can you deliver the packages to him?");
		}
	} else if (status == 2) {
		if (cm.getQ() == 2) {
			cm.sendYesNo("Oh, before you go, can I get your signature? I do this with all my helpers so I know that they will follow my rules and"+
			" regulations.");
        } else if (cm.getQ() == 4) {
			cm.gainItem(firework);
			cm.talkGuide("Let's set these off right now!");
			cm.completeQ();
			cm.dispose();                
		}
	} else if (status == 3) {
		if (cm.getQ() == 2) {
			cm.sendGetText("Please write your name here clearly ...");
		}
	} else if (status == 4) {
		if (cm.getQ() == 2) {
			text = cm.getText();
			if (text != cm.getPlayer().getName()) {
				cm.talkGuide("You didn't spell your name correctly! How will Santa recognize you later?");
				cm.dispose();
			} else {
				cm.sendYesNo("Is this your name, \"#b"+text+"#k\"?");
			}
		}
	} else if (status == 5) {
		if (cm.getQ() == 2) {
			cm.sendOk("Okay! Perfect. I've given you some supplies, #i"+supply+"#, and here is the contract you have signed. When you see #rCliff#k"+
			" use this code #e#bsleighbells#n#k. \r\n\r\n#eReceived!#n\r\n#i"+4031474+"#.");
			cm.completeQ();
			cm.gainItem(supply);
			cm.gainItem(4031474);
			cm.dispose();
		}
	}
}