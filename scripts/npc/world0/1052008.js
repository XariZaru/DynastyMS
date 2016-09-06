var diamond = 4021007;
var coin = 4031039;
var roll = 4031040;
var sack = 4031041;

function start() {
    if (cm.getJobId() == 2000 && cm.getQ() == 7) {
            cm.sendYesNo("There are some sparkling jewels within the chest. Do you wish to take something from the chest?");
    } else if (cm.getMapId() == 103000902 ){
		if (cm.isQuestStarted(2055)) {
			cm.gainItem(coin, 1);
		} else if (cm.isQuestStarted(2056)) {
			cm.gainItem(roll, 1);
		} else if (cm.isQuestStarted(2057)) {
			cm.gainItem(sack, 1);
		} else {
			var ores = [4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007];
			cm.gainItem(ores[Math.random() * ores.length]);
			cm.gainItem(ores[Math.random() * ores.length]);
		}	
		cm.warp(103000100, 0);		
	} else {
		cm.sendOk("It is a chest full of many beautiful things.");
		cm.dispose();
	}
}

function sQuest(exp, meso) {
    text = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# " + exp + " exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# " + meso + " meso";
    cm.gainMeso(meso);
    cm.gainExp(exp);
    cm.completeQ();
    cm.dispose();
    return text;
}


function action(m, t, s) {
    if (m == 1) {
        cm.sendOk("You reach in and find something valuable. Perhaps Sejan will like this." + sQuest(100, 2000) + "");
        cm.talkGuide("Let's quickly get out of here before someone realizes!");
        cm.gainItem(diamond, 1);
    }
    cm.dispose();
}