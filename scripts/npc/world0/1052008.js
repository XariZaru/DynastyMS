var diamond = 4021007;

function start() {
    if (cm.getJobId() == 2000 && cm.getQ() == 8) {
            cm.sendYesNo("There are some sparkling jewels within the chest. Do you wish to take something from the chest?");
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