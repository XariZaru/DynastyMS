

function start() {
    if (cm.getQ()!=13) {
        cm.sendOk("Ah ... so many supplies to deliver, so little time. So little time. I don't have time to talk.");
        cm.dispose();
    } else {
        cm.sendSimple("Oh? Do you need something. Wait ... is that a note in your hand?"+
                "\r\n\r\n#b#L0#Black Dove\r\n#L1#Brown Dove\r\n#L2#White Dove\r\n#L3#Majestic Dove\r\n#L4#Beautiful Dove");
    }
}

function action(mode,type,selection) {
    if (mode == 1) {
        if (selection != 2) {
            cm.sendOk("What? I don't understand what you're talking about.");
            cm.dispose();
        } else {
            cm.sendOk("Oh, are those commands from #bAgent E#k? It must instructions on where to transport the goods ... \r\n\r\n#eItem(s) lost!#n\r\n#i"+4032091+"#");
            cm.gainItem(4032091,-1), cm.completeQ(), cm.talkGuide("This only leaves one person, let's go find him."), cm.dispose();
        }
    } else {
        cm.dispose();
        return;
        }
    }
