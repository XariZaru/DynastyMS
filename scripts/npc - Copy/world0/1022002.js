var status, food = 4031580;

function start() {
    status = -1;
    if (cm.getQ()!=54 && cm.getQ()!=55) {
        cm.sendOk("Do you need something? I've got other things to do than to meddle with peasantry.");
        cm.dispose();
    } else if (cm.getQ()==55) {
        cm.sendOk("Get those supplies to #bTaeng#k as fast as you can.");
        cm.dispose();
    } else {
        cm.sendNext("You must be the little #bexplorer#k I've been hearing so much about. Tell me, how does it feel, being incredibly"+
            " gifted with your talents. You've accomplished everything our commander has issued to you and yet you don't seem to"+
        " break a single sweat. Dear ... what it must take to be someone like you.");
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("Actually, it's really easy, not much sweat involved in it either.",2);
    } else if (status == 1) {
        cm.sendNext("Hush, just take the supplies you came for. I wouldn't want to keep our commander waiting. He's rushed to"+
            " send these supplies off to #bAgent M#k. If our forces are to collaborate at its finest we must perform at maximum"+
        " efficiency.\r\n\r\n#L0##bErr ... okay.");
    } else if (status == 2) {
        cm.sendNext("Shh, just take it.");
    } else if (status == 3) {
        cm.sendOk("Get it to #bTaeng#k as fast as you can.\r\n\r\n#eObtained Item(s)!#n\r\n\r\n100 #i"+food+"#");
        cm.gainItem(food, 100);
        cm.completeQ(), cm.talkGuide("Let's rush these to Taeng as soon as possible!");
        cm.dispose();
    }
}