

function start() {
    if (cm.getQ()!=14) {
        cm.sendOk("So many arms to supply, so many men. Don't worry! Not a sweat, I'll just send this next shipment off and we'll crush those"+
            " #bExplorers#k!");
        cm.dispose();
    } else {
        cm.sendSimple("Oh? Do you need something. Wait ... is that a note in your hand?"+
                "\r\n\r\n#b#L0#Knights of the Round Table\r\n#L1#Knights of the Square Table\r\n#L2#The Knights Who Say \"Ni\"!\r\n#L3#Knights"+
            " of the Table");
    }
}

function action(mode,type,selection) {
    if (mode == 1) {
        if (selection != 3) {
            cm.sendOk("What? I don't understand what you're talking about.");
            cm.dispose();
        } else {
            cm.sendOk("Aha! More supplies of arms? Brilliant! \r\n\r\n#eItem(s) lost!#n\r\n#i"+4032091+"#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5000");
            cm.gainItem(4032091,-1), cm.completeQ(), cm.talkGuide("Let's go to talk to Agent E again. We're done here.");
			cm.gainExp(5000);
			cm.dispose();
        }
    } else {
        cm.dispose();
        return;
        }
    }
