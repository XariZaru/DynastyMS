var status, shell = 4000019, squishy = 4000004, arthritis = 4032423;


function start() {
    status = -1;
    if (cm.getQ()==0) {
    if (!cm.iQC(10000)) {
        cm.sendNext("Oh, who are you? My name is #bPerzen#k, and I am the trainer of this forest's encampment.");
   } else if (!cm.iQC(10001)) {
            cm.sendNext("Do you have anything I can do for you? I have a lot of free time and would like to pick up some"+
                "skills in fighting.",2);
    } else if (!cm.iQC(10002)) {
        if (!cm.haveItem(shell, 5) || !cm.getLevel()>= 3) {
            cm.sendOk("You haven't "+(!cm.haveItem(shell, 5) || !cm.getLevel()>= 3 ? "collected the 5 #i"+shell+"#"+
                    " yet, and haven't reached level #b3#k!" : !cm.haveItem(shell, 5) ? "collected the 5 #i"+shell+"# yet!" : "reached level #b3#k"+
                " yet!")+" Go and complete your task!");
            cm.dispose();
        } else {
            cm.sendOk("Good work. It was quick and swift, very efficient.\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 100 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 550 meso")
            cm.gainMeso(550);
            cm.gainExp(100);
            cm.gainItem(shell, -5);
            cm.completeQuest(10002);
            cm.talkGuide("Remember to talk to your trainer after the completion of each quest to see what else he has in store. He is your storyline NPC.");       
            cm.dispose();
            }
    } else if (!cm.iQC(10003)) {
            cm.sendAcceptDecline("You're looking pretty strong there.\r\n\r\nLet's step it up a notch. Why don't you go kill some\r\n#bslimes#k. Bring back\r\n\r\n#b3#k #i"+squishy+"#\r\n\r\nCan you do that?");    
    } else if (!cm.iQC(10004)) {
        if (!cm.haveItem(squishy, 3)) {
            cm.sendOk("You haven't finished collecting all your squishy liquids. You currently have:\r\n\r\n#b"+cm.itemQuantity(squishy)+"/3#k.\r\n#B"+(cm.itemQuantity(squishy)/3 * 100)+"# "+(cm.itemQuantity(squishy)/3 * 100)+"% done.");
            cm.dispose();
        } else {
            cm.sendOk("Well done. Your training seems to be going by very quickly ...\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 500 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 1000 meso")
            cm.complete();
            cm.gainExp(500);
            cm.gainMeso(1000);
            cm.completeQ();
            cm.gainItem(squishy, -3);
            cm.dispose();
        }         
    }
    } else if (cm.getQ() == 1) {
        cm.sendNext("So, #bPerzen#k, what should I do now?", 2)
    } else {
        cm.sendOk("I'm #bPerzen#k, magical trainer of the #bAltaire#k encampment.");
        cm.dispose();
        }
    }


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
        if (status == 0) {
            if (cm.getQ()== 0) {
          if (!cm.iQC(10000)) {
                cm.sendGetText("What is your name?\r\n#e(Input your name correctly, including capitals and n umbers)#n");
        } else if (!cm.iQC(10002)) {
               cm.sendNext("Yes, actually. #eJust don't wander beyond our borders.#n There are monsters present in the depths"+
                   " of #bAltaire#k that I'd rather remain undisturbed until our fighting capacity has reached its crux. Go train"+
               " on low leveled monsters throughout the town. They should resemble green snails. \r\n\r\n#eNOT the mossy ones. Those"+
           " are beyond your capability.");
        } else if (!cm.iQC(10003)) {
                 cm.sendOk("Go collect #b3#k #i"+squishy+"# for me. I'll talk to you when you're done.");
                 cm.completeQuest(10003);
                 cm.dispose();
            }     
            } else if (cm.getQ() == 1) {
                cm.sendAcceptDecline("You should probably train some more, but I have something better in mind. You'll have to learn how to make quick deliveries when"+
                        " you arrive in the army. Perhaps you should take this package to #bLoha#k. She's a blessing to this encampment and constantly uses our"+
                        " supplies to the fullest. Take this medicine pouch to her.\r\n\r\n#eObtained!#n\r\n#i"+arthritis+"#");
            }
        } else if (status == 1) {
          if (cm.getQ()== 0) {
          if (!cm.iQC(10000)) {
            if (cm.getText() != cm.getPlayer().getName()) {
                cm.talkGuide("I don't think that's your real name, and I don't think Perzen would appreciate you lying to him about your actual name.");
                cm.dispose();
            } else {
                cm.sendOk("#b"+cm.getText()+"#k you say? A fine name.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 250 meso")
                cm.completeQuest(10000);
                cm.gainMeso(250);
                cm.gainExp(15);
                cm.talkGuide("Let's speak with Perzen again. I think we can offer our assistance to him.");
                cm.dispose();
            }
        } else if (!cm.iQC(10002)) {
                cm.sendAcceptDecline("So, what do you say?\r\nI'd also love for you to bring back 5 #i"+shell+"# while you're at it");     
        // end of Quest 10000
        }
          } else if (cm.getQ()==1) {
              cm.gainItem(arthritis);
              cm.completeQ();
              cm.dispose();
          }
        } else if (status == 2) {
            if (cm.getQ()==0) {
            if (!cm.iQC(10001)) {
                cm.completeQuest(10001);
                cm.sendOk("Good, I'll expect you to be #blevel 2#k and in possession of #b5#k #i"+shell+"# when I see you again.");
                cm.dispose();
                }
           }
        }
}