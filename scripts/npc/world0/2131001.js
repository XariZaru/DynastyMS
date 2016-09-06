var status, shell = 4000019, squishy = 4000004, arthritis = 4032423, rpot = 2000013, bpot = 2000014;
var quest = 10002;

importPackage(Packages.client);


function start() {
    status = -1;
    //if (!cm.isQuestCompleted(quest)) {
		//cm.sendOk("#bTalk with Assistant Blue before continuing!#k", 2);
        //cm.talkGuide("Talk with Assistant Blue before you can continue with the storyline.");
        //cm.dispose();
    if (cm.getQ()==0) {
        cm.sendNext("Oh, who are you? My name is #bPerzen#k, and I am the trainer of this forest's encampment.");
    } else if (cm.getQ() == 8) {
        cm.sendNext("I'll ship you off to our central base in #bVictoria Island#k, \"Henesys\". When you get there, find a woman called"+
            " #bAgent E#k. She's in charge of all operations in that area.");
    } else if (cm.getQ()==7) {
        if (cm.getLevel() < 10){
         cm.sendOk("#e#r[Level 10] : My Reward?\r\n\r\n#n#kOh, do you need something? I don't believe I have anything in store for you at this time. If"+
             " you can come back at another time I'll be able to give you something else to do."), cm.dispose();
    } else {
        cm.sendSimple("You've seemed to progress remarkably fast for someone who is new to this encampment. I'd like you to take this gift ..."+
            " an official recognition of the advancement of your position in the #bKnights of Cygnus#k brotherhood. What do you say?\r\n\r\n"+
        "\t\t\t#b#L0#Dawn Warrior #L1#Blaze Wizard \r\n#L2#Wind Archer #L3#Night Walker #L4#Thunder Breaker");
    }       
    } else if (cm.getQ()==6) {
            cm.sendOk("What are you doing? Go and give #bLoha#k her medicine.");
   } else if (cm.getQ()==1) {
            cm.sendNext("Do you have anything I can do for you? I have a lot of free time and would like to pick up some"+
                "skills in fighting.",2);
    } else if (cm.getQ()==2) {
        if (!cm.haveItem(shell, 5) || !cm.getLevel()>= 3) {
            cm.sendOk("You haven't "+(!cm.haveItem(shell, 5) || !cm.getLevel()>= 3 ? "collected the 5 #i"+shell+"#"+
                    " yet, and haven't reached level #b3#k!" : !cm.haveItem(shell, 5) ? "collected the 5 #i"+shell+"# yet!" : "reached level #b3#k"+
                " yet!")+" Go and complete your task!");
            cm.dispose();
        } else {
            cm.sendOk("Good work. It was quick and swift, very efficient.\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 100 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 550 meso"+
                "\r\n100 #i"+bpot+"# 100 #i"+rpot+"#")
            }
    } else if (cm.getQ()==3) {
            cm.sendAcceptDecline("You're looking pretty strong there.\r\n\r\nLet's step it up a notch. Why don't you go kill some\r\n#bslimes#k. Bring back\r\n\r\n#b3#k #i"+squishy+"#\r\n\r\nCan you do that?");    
    } else if (cm.getQ()==4) {
        if (!cm.haveItem(squishy, 3)) {
            cm.sendOk("You haven't finished collecting all your squishy liquids. You currently have:\r\n\r\n#b"+cm.itemQuantity(squishy)+"/3#k.\r\n#B"+(cm.itemQuantity(squishy)/3 * 100)+"# "+(cm.itemQuantity(squishy)/3 * 100)+"% done.");
            cm.dispose();
        } else {
            cm.sendOk("Well done. Your training seems to be going by very quickly ...\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 500 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 1000 meso")
        }         
    } else if (cm.getQ() == 5) {
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
          if (cm.getQ()==0) {
                cm.sendGetText("What is your name?\r\n#e(Input your name correctly, including capitals and n umbers)#n");
		  } else if (cm.getQ() == 4) {
				cm.talkGuide("Talk with Perzen again!", 0);
				cm.complete();
				cm.gainExp(900);
				cm.gainMeso(1000);
				cm.completeQ();
				cm.gainItem(squishy, -3);
				cm.dispose();
		  } else if (cm.getQ()==2) {
			cm.gainMeso(550);
            cm.gainExp(200);
            cm.gainItem(shell, -5);
			cm.gainItem(bpot, 100);
			cm.gainItem(rpot, 100);
            cm.completeQ();
            cm.showInstruction("Remember to talk to the NPC after the completion of each quest to see what else he has in store.", 250, 150);       
            cm.dispose();
          } else if (cm.getQ()==8) {
              cm.warp(100000000);
			  cm.gainMeso(75000);
              cm.talkGuide("He said to find a woman named Agent E. I think she'll be our job advancement from now on!", 2);
			  cm.talkGuide("I think Agent E is supposed to be nearby the center of town. Let's check it out.", 7);
              cm.completeQ();
              cm.dispose();
          } else if (cm.getQ()==7) {
              //newb = cm.getLevel() - 10, newb *= 3;
              cm.changeJobById(cm.getJobId() + (100 + (100 * selection)));
			  cm.gainItem(cm.getJobId() == 1100 ? 1302077 : cm.getJobId() == 1200 ? 1372043 : cm.getJobId() == 1300 ? 1452051 : cm.getJobId() == 1400 ? 1472061 : 1482000);
			  if (cm.getJobId() == 1400 || cm.getJobId()==1300)
				  cm.gainItem((cm.getJobId() == 1400 ? 2070000 : 2060000), 2000);
			  cm.gainMeso(50000);
              //cm.gainSp(newb);
              resetStats();
              cm.sendOk("You have been gifted your position. If you'd like to leave this place, talk to me one last time."); // You have gained"+
                 // " #b"+newb+"#k additional sp since you overleveled.");
              cm.talkGuide("If we want to leave, Perzen said we'd have to talk to him.", 2);
              cm.completeQ();
              cm.dispose();
        } else if (cm.getQ()==1) {
               cm.sendNext("Yes, actually. #eJust don't wander beyond our borders.#n There are monsters present in the depths"+
                   " of #bAltaire#k that I'd rather remain undisturbed until our fighting capacity has reached its crux. Go train"+
               " on low leveled monsters throughout the town. They should resemble green snails. \r\n\r\n#eNOT the mossy ones. Those"+
           " are beyond your capability.");
        } else if (cm.getQ()==3) {
                 cm.sendOk("Go collect #b3#k #i"+squishy+"# for me. I'll talk to you when you're done.");
        } else if (cm.getQ() == 5) {
                cm.sendAcceptDecline("You should probably train some more, but I have something better in mind. You'll have to learn how to make quick deliveries when"+
                        " you arrive in the army. Perhaps you should take this package to #bLoha#k. She's a blessing to this encampment and constantly uses our"+
                        " supplies to the fullest. Take this medicine pouch to her.\r\n\r\n#eObtained!#n\r\n#i"+arthritis+"#");
            }
        } else if (status == 1) {
          if (cm.getQ()==0) {
            if (cm.getText() != cm.getPlayer().getName()) {
                cm.talkGuide("I don't think that's your real name, and I don't think Perzen would appreciate you lying to him about your actual name.");
                cm.dispose();
            } else {
                cm.sendOk("#b"+cm.getText()+"#k you say? A fine name.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 250 meso");
            }
			} else if (cm.getQ() == 3) {
				 cm.talkGuide("Let's take that portal up top and kill some slimes!", 0);
				 cm.showInstruction("Take the portal to the top left!", 250, 150);
				 cm.completeQ();
				 cm.dispose(); 
			} else if (cm.getQ()==1) {
                cm.sendAcceptDecline("So, what do you say?\r\nI'd also love for you to bring back 5 #i"+shell+"# while you're at it");     
			} else if (cm.getQ()==5) {
              cm.gainItem(arthritis);
              cm.completeQ();
              cm.talkGuide("Let's go find Loha! I'm sure she's around here somewhere.", 0);
              cm.dispose();
          }
        } else if (status == 2) {
            if (cm.getQ()==1) {
                cm.sendOk("Good, I'll expect you to be #blevel 2#k and in possession of #b5#k #i"+shell+"# when I see you again.");
           } else if (cm.getQ()==0) {
			    cm.completeQ();
                cm.gainMeso(250);
                cm.gainExp(100);
                cm.showInstruction("Let's speak with Perzen again. I think we can offer our assistance to him.", 200, 150);
                cm.dispose();
		   }
        } else if (status == 3) {
			if (cm.getQ()==1) {
				cm.talkGuide("Let's get 5 snail shells for Perzen!", 0);
				cm.showInstruction("There are monsters all over the place and #eeven in the tents#n!", 400, 350);
				cm.completeQ();
				cm.dispose();
			}
		}
}

function resetStats() {
	var totAp = cm.getPlayer().getStr() + cm.getPlayer().getDex() + cm.getPlayer().getLuk() + cm.getPlayer().getInt() + cm.getPlayer().getRemainingAp();
	cm.getPlayer().setStr(4);
	cm.getPlayer().setDex(4);
	cm.getPlayer().setLuk(4);
	cm.getPlayer().setInt(4);
	cm.getPlayer().setRemainingAp(totAp - 16);
	cm.getPlayer().updateSingleStat(MapleStat.STR, 4);
	cm.getPlayer().updateSingleStat(MapleStat.DEX, 4);
	cm.getPlayer().updateSingleStat(MapleStat.LUK, 4);
	cm.getPlayer().updateSingleStat(MapleStat.INT, 4);
	cm.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, totAp - 16);
}