var status;
// <editor-fold defaultstate="collapsed" desc="Storyline Quests">
var quests = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,42,43,44,45,46,47,48,49,50,51,52,53,54,55
        ,56,57,58,59,60],
    [1,2,3,4,5,6,7,8,9,10,12,15,17,18,19,20,21,22,23,24,25,27,31,32,33,34,35,36,37,38],[]];

// <editor-fold defaultstate="collapsed" desc="Other Quests">
var xnames = ["Receiving the Beta"]; 
var oquests = [[10000],[10001]]; // available, in progress
var odesc = ["You've heard someone around town is giving out free beta items to those who are new. Perhaps you should take a look."+
            "", "pew","damn"]; // for in progress
var npcname = ["Rooney"];
// </editor-fold>

var reqArray, reqDetails, reqNames, jobType, sel, available, progress, completed, onames, reqDesc;

// jobtype: 0 = explorer, 1 = KoC, 2 = aran

function start() {
    status = -1;
		//if (cm.getJobId() == 2000) {
			//cm.sendNext("Hey, Arans are currently disabled at the moment. You should go make a #bCygnus Knight#k or #bExplorer#k!");
//		} else
		if (cm.getLevel() <= 2) {
        	cm.sendNext("Hi! Welcome to #e#bDynastyMS#k#n. As a beginner, there'll be a lot of things that seem unfamiliar here compared to other" +
        			" Maplestory environments. Most notably, to be able to job advance you must complete the storyline. Everything on the server is" +
        			" geared towards customization. Everything from certain mob placements, transportation, PQs, and non-playable characters" +
        			" are made specially as a new form of interaction with the player.");
        } else {
            cm.sendNext("Hey, #b#h ##k! Let me retrieve a log of your current and past quests ...");
        }
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
		if (cm.getJobId()==2000 && cm.getQ() == 1) {
			cm.talkGuide("Let's go find a man called #eSejan#k, he should start us off in this world!", 0);
			cm.talkGuide("Sometimes if you miss the hints I give you, I'll say them again! Let's go find Sejan!", 5);
			//cm.getClient().disconnect(false, false);
			cm.dispose();
		} else if (cm.getPlayer().getJob().getId()==0 && cm.getLevel() < 2) {
			if (cm.getMapId() != 209000001)
				cm.warp(209000001);
			cm.talkGuide("I think it's best if we find Mom and Dad. They should be able to"+
				" help us get started in this world.", 0);
			cm.talkGuide("I think if we walk around a little we'll find them!",5);
			cm.talkGuide("They should be nearby a man named Santa. That's the last I heard of them!",10);
			cm.talkGuide("Job advancing is done through the storyline! So don't forget to do your quests!",15);
			cm.dispose();
		}
    } else {
        status++;
    }
    if (cm.getLevel() <= 2 || cm.getJobId()==2000 && cm.getQ()==1)
    	beginnerMessage();
    else	
		normalOptions(selection);
}


function beginnerMessage() {
	if (status == 0) {
		if (cm.getJobId() == 2000 && cm.getQ() == 1) {
			if (cm.getMapId() != 260000206)
				cm.warp(260000206);
			//cm.getClient().disconnect(false, false);
			cm.talkGuide("Let's go find a man called #eSejan#n, he should start us off in this world!", 0);
			cm.talkGuide("Sometimes if you miss the hints I give you, I'll say them again! Let's go find Sejan!", 5);
			cm.talkGuide("You can double click me for more options.", 9);
			cm.dispose();
			return;
		}
		cm.sendOk("Use #e@helper#n! It's an important command! Pay close attention to non-playable characters when they speak to you is imperative" +
				" to understanding the game. If you're lost you can always speak to me for information on your quests. " +
				"I can also tell you the unique non-playable characters that are specific to each major map if you want!\r\n\r\nAll these features" +
				" are available starting at #elevel 6#n.\r\n\r\n#eImportant commands:#n\r\n@helper\r\n@gm\r\n@str, luk, dex, int");
	} else if (status == 1) {
		if (cm.getMapId() != 209000001 && cm.getQ() < 4)
			cm.warp(209000001);
		cm.talkGuide("I think it's best if we find Mom and Dad. They should be able to"+
			" help us get started in this world.", 0);
		cm.talkGuide("I think if we walk around a little we'll find them!",5);
		cm.talkGuide("They should be nearby a man named Santa. That's the last I heard of them!",10);
		cm.talkGuide("Job advancing is done through the storyline! So don't forget to do your quests!",15);
		cm.talkGuide("You can double click me for more options!", 20);
		cm.dispose();
	}
}

function normalOptions(selection) {
	if (status == 0) {
	    (cm.getJobId()<900 ? jobType = 0 : cm.getJobId()>=1000 && cm.getJobId() < 2000 ? jobType = 1 : jobType = 2);
	    cm.sendSimple("Which of the following quest(s) or skills would you like to view?\r\n\r\n#b#L0#Storyline\r\n#L2#View Skills"); //\r\n#L3#Unique characters on this map");
	} else if (status == 1) {
		sel = selection;
		if (selection == 0) {
		    cm.sendSimple("Would you like to view in-progress or completed quests?\r\n\r\n#b\r\n#L0#In Progress\r\n#L1#Completed");
		} else if (selection == 2) {
		    cm.sendOk("Here are your following skills ...\r\n\r\n#eSteal: "+cm.getPlayer().getSteal()+"\r\nPersuasion: "+
		            ""+cm.getPlayer().getPersuasion()+"\r\nIntegrity: "+cm.getPlayer().getHonor()+"");
		    cm.dispose();  
		}
	} else if (status == 2) {
		if (selection == 1) {
		        if (cm.getPlayer().sendCompletedQuestList() != "") {
		        	var text = "Which of the following completed quests would you like to view in more detail?\r\n\r\n";
		           cm.sendSimple(text + cm.getPlayer().sendCompletedQuestList() + "\r\n#L999999#Exit");
		        }
		} else {
			cm.sendOk(cm.getPlayer().getCompletedQuest(cm.getQ() + 1));
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 999999) {
			cm.dispose();
			return;
		}
		cm.sendOk(cm.getPlayer().getCompletedQuest(selection));
		cm.dispose();
	}
}

function getUniqueNpc() {
	var maps = {
		100000000 : [1022101, 9040011, 9200000, 9250052, 9201001, 9000021, 9000036,
					9010000],
		101000000 : [1022101, 2060101],
		102000000 : [1022101],
		103000000 : [1022101],
		104000000 : [1022101],
	}
	
	text = "The current unique NPCs on this map are: \r\n\r\n#b";
	for (var x = 0; x < maps[cm.getMapId()].length; x++) {
		text += "#p " + maps[cm.getMapId()][x] + " #\r\n";
	}
	cm.sendOk(text);
	cm.dispose();
	
}