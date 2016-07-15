

function start() {
    if (cm.getQ()!=12) {
        cm.sendOk("Yes, what do you need? I'm a busy man, having to run all these things. The #bKnights#k are always in need of men.");
        cm.dispose();
    } else {
        cm.sendSimple("Oh? Do you need something. Wait ... is that a note in your hand?\r\n\r\n#b#L0#Black Dove\r\n#L1#Eaglesong\r\n#L2#Murky Lake"+
            "\r\n#L3#Smelly Onion");
    }
}

function action(mode,type,selection) {
    if (mode == 1) {
        if (selection != 1) {
            cm.sendOk("What? I don't understand what you're talking about.");
            cm.dispose();
        } else {
            cm.sendOk("Brilliant! Orders from #bAgent E#k again, let me just take that off your hands ...\r\n\r\n#eItem(s) lost!#n\r\n#i"+4032091+"#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3000");
            cm.gainItem(4032091,-1), cm.completeQ(), cm.talkGuide("Let's go find the others. There should be two left.");
			cm.gainExp(3000);
			cm.dispose();
        }
    } else {
        cm.dispose();
        return;
        }
    }
