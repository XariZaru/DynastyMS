var status;

function start() {
    status = -1;
    if (cm.getJobId() < 1000) {
    if (cm.getQ()==27) {
        cm.sendNext("They call me #bAgent C#k, and for good reason. \"C\" is a respectable title in our community.#b\r\n#L0#What do you mean \"our"+
                "\" community?");
    } else if (cm.countMonster()>0) {
        cm.sendOk("Monsters must be eliminated before speaking ...");
        cm.dispose();
    } else if (cm.getQ()>38 && cm.getQ()<42) {
        cm.sendOk("I won't bother you anymore, sir!");
        cm.dispose();
    } else if (cm.getQ()==38) {
        if (cm.haveItem(1042181) || cm.haveItem(1062035) || cm.haveItem(1082079) || cm.haveItem(1102066)
    || cm.haveItem(1002605) || cm.haveItem(1702251) || cm.haveItem(1022015)) {
        cm.sendOk("Huh? What are you doing here.");
        cm.talkGuide("Equip your disguise you dimwit! We're going to get caught!");
        cm.spawn(9400739,1,62,109);
        cm.dispose();
    } else {
        cm.sendOk("Oh, sir, yes sir! Oh my god, sir!");
        cm.talkGuide("He's not going to tell us anything.");
        cm.completeQ();
        cm.dispose();
    }
    } else {
        cm.sendOk("Hush ... the #bexplorers#k may be listening in on us.");
        cm.dispose();
        }
    } else {
        cm.sendOk("Huh, what do you want?");
        cm.dispose();
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
        if (cm.getQ()==27) {
            cm.sendNext("Oh, you know, the #bKnights of Cygnus#k. We've been adorned the honor being titled her Majesty's knights!"+
                "#b\r\n#L0#Sounds befitting of a man of your caliber.");
        } 
    } else if (status == 1) {
        if (cm.getQ()==27) {
            cm.sendNext("I know right? I cannot wait until I am promoted.\r\n#L0##bHow long has it been since your last promotion?");
        }
    } else if (status == 2) {
        if (cm.getQ()==27) {
            cm.sendNext("Alas, too long. But I am still confident I shall be rewarded one day! That's why I am on this mission.\r\n#L0##bMission?");
        }
    } else if (status == 3) {
        if (cm.getQ()==27) {
            cm.sendNext("I really shouldn't say, it's quite confidential. I mean, I don't even really know what we're doing in here. The others"+
                " bring me along so that we are bigger in size.\r\n#L0##bOh, you can tell me. Why?");
        }
    } else if (status == 4) {
        if (cm.getQ()==27) {
            cm.sendOk("Well, okay. It's some kind of diplomatic mission, something to do with the mayor of this town. I don't know anything else.");
            cm.completeQ();
            cm.dispose();
        }
    }
}
