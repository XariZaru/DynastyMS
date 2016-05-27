var pos = [-156, 312,50,312,275,312,-639,312,-912,312,-1147,312,-404,312,51,312,87,254,-577,252];
var exp = [100, 200, 300, 400, 500, 600];
var mobs = [100100,100101,130101,210100, 130100, 1210100, 1210101];

var pos2 = [117,312,346,312,606,312,901,312,1153,237,745,55,488,55,-681,312-960,255,
			-1352,140,-1607,78];
var exp2 = [1000,1200,1400,1600,1800];
var mobs2 = [1120100,1210103,1110100,1110101,1130100,2220100];

var stages = [926130000, 926130102, 926130200];

function start() {
	// Exit map or still in map with no party
	if (cm.getParty() ==null && (cm.getMapId()!=926100203)) {
		cm.warp(926100203);
		cm.dispose();
	} else {
		cm.sendNext("Hahaha! Welcome to my office! I am #eYulete#n! Are you a taker in my lovely quest?");
	}
}

function action(m,t,s,status) {
	if (cm.getParty() == null) {
		noParty(s, status);
	} else if (cm.getMapId() == stages[0]) {
		firstStage(s, status);
	} else if (cm.getMapId() == stages[1]) {
		secondStage(s,status);
	} else if (cm.getMapId() == stages[2]) {
		thirdStage(s,status);
	} else {
		startPQ(s, status);
	}
}

function getTime() {
	var d = new Date();
	var currenTime = d.getTime() - cm.getPlayer().getPQ().endTime();
}

function thirdStage(s, status) {
	
}

function secondStage(s, status) {
	if (status == 0) {
		if (cm.getPlayer().getPQ().isCompleted()) {
			if (cm.getPlayer().getPQ().getStage() == 1) {
				cm.sendYesNo("Are you ready to continue? I hope you had a ton of fun last round, but this"
				 + " round is about to get a whole lot worse! #eHehehehe!#n");
			} else {
				cm.sendAcceptDecline("Hmmm, you're pretty good, aren't you? I wasn't expecting a person like you to get this far in this little adventure of mine. " + 
				"Are you ready to continue, then?")
			}
		} else {
			cm.sendOk("What are you doing? You've got a job to do, so #edo it!#n");
			cm.dispose();
		}
	} else if (status == 1) {
		if (cm.getPlayer().getPQ().getStage() == 1) {
			cm.sendOk("#eLET'S DO IT THEN! ON WITH THE FUN!#n");
			cm.getPlayer().getPQ().nextStage(cm.getPlayer().getMap(), pos2, exp2, mobs2);//, getTime());
			cm.dispose();
		} else {
			cm.getPlayer().getPQ().warpAll(stages[2]);
		}
	}
}

function startPQ(s, status) {
	cm.setLast("startPQ");
	if (status == 0) {
		cm.sendAcceptDecline("Are you ready? Remember, you can always add more players to your little group if you wish!");
	} else if (status == 1) {
		cm.warpParty(stages[0]);
	}
}

function firstStage(s, status) {
	cm.setLast("firstStage");
	if (status == 0) {
		if (cm.getPlayer().getPQ() == null) {
			cm.sendYesNo("Are you ready to begin this stage? It'll be quite a slaughter, hahaha.");
		} else if (!cm.getPlayer().getPQ().isCompleted()) {
			cm.sendOk("What are you doing? Don't talk to me you crazy nut job! The quest! The #equest#n!\r\n\r\n" + cm.getPlayer().getPQ().getReadable());
			cm.dispose();	
		} else {
			cm.sendYesNo("Hohoho, so you think you have a chance this quest? #eHahaha!#n Onto the next stage then!");
		}
	} else if (status == 1) {
		if (cm.getPlayer().getPQ() == null) {
			cm.sendOk("Okay! Here we go!!");
			cm.startKillMobsPQ(pos, exp, mobs, 600, stages);
			cm.dispose();
		} else {
			cm.getPlayer().getPQ().warpAll(stages[1]);
		}
	}
}

function noParty(s, status) {
	cm.setLast("noParty");
	if (status == 0) {
		cm.sendNext("#eMonster Run#n is a fun little quest you can do by yourself or with other players, though the difficulty does not change depending on your party size. So you best be either strong, " +
		"or incredibly foolish! Hahaha!");
	} else if (status == 1) {
		cm.sendSimple("Are there any minutiae you would like to review before undergoing my quest?\r\n", "Question on the stages", "Nothing else");
	} else if (status == 2) {
		if (s == 0) {
			cm.sendOk("Every stage is the same, though the monsters will increase with difficulty as you go. Remember, this quest isn't for the faint of heart, so if you have cholesterol issues " +
			"don't attempt to do this quest! When you get to the end I'll reward you with treasures beyond your wildest dreams!\r\n\r\n#eHahahaha!#n");
		}
		cm.dispose();
	}
}