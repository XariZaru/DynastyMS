var status, choice = [["Jie", "Gao", "Ai", "Ming", "Zhi"], 
    ["ta", "dao", "su", "ming", "to"], ["hen", "bi", "zao", "wo", "ling"]], choicea =-1, choiceb =-1, choicec = -1, cont = -1,
        tot = -1;

function start() {
    status = -1;
    if (cm.getJobId() < 1000) {
    if (cm.getQ()==28) {
        cm.sendNext("Hey, you were just talking to #bAgent C#k over there. What was that about?\r\n#L0##bOh, that was nothing. He seemed a little down.");
    } else if (cm.countMonster() > 0) {
        cm.sendOk("Please eliminate all mobs. I can't concentrate.");
        cm.dispose();
    } else if (cm.getQ()==39) {
        cm.sendNext("My lord -- I mean, dear god -- I mean, yes sir, reporting sir!");
    } else if (cm.countMonster()>0) {
        cm.sendOk("Monsters must be eliminated before speaking ...");
        cm.dispose();
    } else if (cm.getQ()>39 && cm.getQ()<42) {
        cm.sendOk("Can't wait for the signing to be done, eh, sir?");
        cm.dispose();
    } else {
        cm.sendOk("Hey, what are you doing here? We can't have you staying here."), cm.dispose();
        }
    } else {
        cm.sendOk("What is it that you need?");
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
    if (cm.getQ()==39) {
        cm.sendSimple("Bless her majesty, born on _______, will surely live on to her oldest days! In her name, I will salute and"+
                " give my blessings to her with all my heart.#b\r\n\r\n#L0#1850 R.E\r\n#L1#1025 R.E"+
            "\r\n#L2#8605 R.E\r\n#L3#1225 R.E\r\n#L4#6630 R.E",2);
    } else {
        cm.sendNext("#bAgent C#k? No way, he's always cheerful ... why?\r\n#L0##bIt's been a long time since his promotion. Perhaps it isn't so fair.");
    }
    } else if (status == 1) {
        if (cm.getQ()==39) {
            if (selection != 3) {
                cm.sendOk("Wait, what did you just say?");
                cm.spawn(9400739,1,62,109);
                cm.talkGuide("I can't believe you got the date wrong, get rid of these guys now!");
                cm.dispose();
            } else {
                cm.sendNext("Yes, praise her and her life, may she have longevity throughout her years.");
            }
        } else {
            cm.sendNext("What? Nonsense, he was promoted two years ago! He should be more grateful than that.\r\n#L0##bHow about you? When was your last promotion?");
        }
    } else if (status == 2) {
        if (cm.getQ()==39) {
             ((choicea == 1 && choiceb == 2 && selection == 3) ? cont = 1 : cont = -1);               
            (choicea == -1 ? choicea = selection : (choiceb == -1 && choicea != -1) ? choiceb = selection : (choicec == -1 && choiceb > -1)
            ? (choicec = selection, tot = 1) : tot = 0);
            cm.sendSimple("#b"+((choicea > -1 && choiceb == -1) ? ""+choice[0][choicea]+" ___ ___" : 
                    (choiceb > -1 && choicec == -1) ? ""+choice[0][choicea]+" "+choice[1][choiceb]+" ___" : (choicec > -1 && choiceb > -1) ? 
                    ""+choice[0][choicea]+" "+choice[1][choiceb]+" "+choice[2][choicec]+"" :"___ ___ ___")+" #ka status report on our current "+
                    "situation."+(choicea == -1 ? "\r\n\r\n#b#L0#Jie\r\n#L1#Gao\r\n#L2#"+
                "Ai\r\n#L3#Ming\r\n#L4#Zhi" : choiceb == -1 ? "\r\n\r\n#b#L0#ta\r\n#L1#dao\r\n#L2#su\r\n#L3#ming\r\n#L4#to" : 
            choicec == -1 ? "\r\n\r\n#b#L0#hen\r\n#L1#zi\r\n#L2#zao\r\n#L3#wo\r\n#L4#ling" : "")+"\r\n\r\n"+(
            ((cont != 1 && tot == 1) ? ("#r#e#L500#What?"+
        "That doesn't even make any sense!") : cont == 1 ? "#e#b#L500#(Seems about right)#n#k" : "")+""));
            ((tot == 1 && choicec > -1 && cont != 1) ? (cm.talkGuide("We're busted! Let's get rid of these guards!"), cm.dispose(),
        cm.spawn(9400739,1,62,109)) : tot = -1);                     
            (cont != 1 ? status = 1 : status);               
        } else {
            cm.sendNext("Er ... I'm not sure, actually. It's been quite a long time ...\r\n#L0##bBut you're loyal to her majesty, yes?");
        }
    } else if (status == 3) {
               if (cm.getQ()==39) {
                    cm.sendOk("Of course! The mayor is currently signing the papers to hand over #bSleepywood#k to #bAgent E#k. "+
                        " We're so close to victory!");
                cm.completeQ();
                    cm.dispose();
                } else {
        cm.sendNext("Yes, of course! But you're right ... it's been a long time since I've gotten a promotion.\r\n#L0##bWill this mission promote you?");
                }
    } else if (status == 4) {
        cm.sendOk("I hope so, we're just trying to convince the mayor of something. Not quite sure ... I really do hope I'm promoted.");
        cm.completeQ();
        cm.dispose();   
    }
}