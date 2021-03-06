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
        if (cm.getLevel() <= 2) {
        	cm.sendNext("Hi! Welcome to #e#bDynastyMS#k#n. As a beginner, you'll need to do the #bstoryline quests#k in order to #rjob advance#k!");
        } else {
            cm.sendNext("Hey, #b#h ##k! Let me retrieve a log of your current and past quests ...");
        }
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (cm.getLevel() <= 2) {
    	beginnerMessage();
    } else {
    	normalOptions(selection);
    }
}


function beginnerMessage() {
	if (status == 0) {
	cm.sendOk("There are important commands you can access by typing #e@help#n. In order to #ejob advance#n as a noblesse you must talk with #bAgent E#k, who comes later on in your storyline.");
	} else if (status == 1) {
		if (cm.getMapId() != 300000010)
			cm.warp(300000010);
		cm.talkGuide("Let's go find #bPerzen#k. He's the beginner storyline NPC for Cygnus Knights.", 0);
		cm.talkGuide("I'm your guide for Cygnus Knights. If you ever need to catch up on your storyline, double click me.", 5);
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
		} else if (selection == 3) {
			getUniqueNpc();
		} else {
		    cm.sendSimple("Would you like to view in-progress or completed quests?\r\n\r\n#b#L0#Available\r\n#L1#In Progress\r\n#L2#Completed");      
		}
	} else if (status == 2) {
		if (selection == 1) {
		        if (cm.getPlayer().sendCompletedQuestList() != "") {
		        	var text = "Which of the following completed quests would you like to view in more detail?\r\n\r\n";
		           cm.sendSimple(text + cm.getPlayer().sendCompletedQuestList());
		        } else {
		            cm.sendOk(""+(selection == 0 ? "You are currently not undertaking any quests. Please try again once you've accepted a quest." : 
		                    "You do not have any finished quests. You can check again later once you have finished a quest.")+"");
		            cm.dispose();
		        }
		} else {
			cm.sendOk(cm.getPlayer().getCompletedQuest(cm.getQ() + 1));
			cm.dispose();
		}
	} else if (status == 3) {
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