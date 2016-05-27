var status;

function start() {
    status = -1;
    if (cm.getJobId() < 1000) {
    if (cm.getQ()==29) {
    cm.sendNext("What's your business sneaking around here? I saw you speaking to #bAgent C#k and #bAgent O#k"+
        ". Whatever you're up to I won't be a part of.\r\n#b#L0#What sort of brouhaha are you presuming that I"+
    " am taking a part of?");
    } else if (cm.countMonster()>0) {
        cm.sendOk("Monsters must be eliminated before speaking ...");
        cm.dispose();
    } else if (cm.getQ()==40) {
        cm.sendNext("Scram! We don't --, oh sir, I'm awfully sorry!");
    } else if (cm.getQ()>40 && cm.getQ() < 42) {
        cm.sendOk("No more sir, please ..");
        cm.dispose();
    } else {
        cm.sendOk("Scram! We don't talk to low-lifes!");
        cm.dispose();
    }
    } else {
        cm.sendOk("Hey! What's up?");
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
        if (cm.getQ()==40) {
            cm.sendNext("Oh don't worry about it, I'm just trying to ascertain the breadth of knowledge you've"+
                " supplied me in order to produce the next method in our strategy.",2);
        } else {
        cm.sendNext("Wait ... what?\r\n#b#L0#I'm attempting to ascertain the breadth and depth of your knowledge.");
        }
    } else if (status == 1) {
        if (cm.getQ()==40) {
            cm.sendNext("Err ... \r\n\r\n#L0##bOh, don't worry about that. You're seeming a little gloomy"+
                ", why don't you call in for a hiatus, or excuse yourself from the festivities until"+
            " the loyalist legion can comprehensively accomplish its mission successfully.");
        } else {
        cm.sendNext("No, what? Ascer-what? Stop!\r\n\r\n#b#L0#It seems your cranial lobe has developed"+
            " magnificently slower than your peers in contrast with past developments and records.");
        }
    } else if (status == 2) {
        if (cm.getQ()==40) {
            cm.sendNext("I ... development ...\r\n\r\n#L0##bOh, you'll be fine. I'll resume command over"+
                " this operation until your apprehensiveness wavers in magnitude.")
        } else {
        cm.sendNext("What in her Majesty's name are you saying?\r\n\r\n#b#L0#I told you, I'm trying to outline"+
            " how capable you are of engaging in intelligent conversation with another person.");
        }
    } else if (status == 3) {
        if (cm.getQ()==40) {
            cm.sendNext("Blow ... conversation\r\n\r\n#L0##bOh yes! I'm just assessing your ability to engage"+
                " in conversation with another being, remember?");
        } else {
        cm.sendNext("Stop ... I'll do anything, anything ...\r\n\r\n#b#L0#What is the reason for your infiltration"+
            " of this neutral territory?");
        }
    } else if (status == 4) {
        if (cm.getQ()==40) {
            cm.sendNext("Hey! Wait-\r\n\r\n#L0##bNow, now, don't waste your breath. And don't stand there"+
                " gaping either. How else will we achieve the land of #eshining diamonds#n?");
        } else {
        cm.sendNext("It's ... it's to convince the mayor to support #bloyalist#k takeover of the town #bSleepywood#k."+
            "\r\n#L0##bIn other words you are attempting a coup to overthrow any presence of Explorers?");
        }
    } else if (status == 5) {
        if (cm.getQ()==40) {
            cm.sendOk("Signing ... taking place ... now, ugh.");
            cm.completeQ();
            cm.dispose();
        } else {
        cm.sendOk("Yes ... please, no more. I can't take it.");
        cm.completeQ();
        cm.dispose();
         }
        }
}
