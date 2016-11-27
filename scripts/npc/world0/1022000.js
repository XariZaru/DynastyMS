/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*  Dances with Balrog
    Victoria Road : Warriors' Sanctuary (102000003)
	Warrior Job Advancement
    @author Twdtwd
 */

var status;
var select;
var jobSelect;
var currJob;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            currJob = cm.getJobId();
		}
        if(currJob == 0)
            firstJob(mode, type, selection);
        else if(currJob == 100)
            secondJob(mode, type, selection);
        else if(cm.isQuestStarted(7500))
            thirdJob(mode, type, selection);
        else
            other(mode, type, selection);
    }
}

function firstJob(mode, type, selection) {
    if(status == 0 && mode == 1) {
        cm.sendNext("Do you want to become a Warrior? You need to meet some criteria in order to do so.#b You should be at least in level 10#k. Let's see...");
    } else if(status == 0 && mode == 0) { // Used when pressing no on status 1.
        cm.sendOk("Need more time to think about it? Feel free. It's not something you should take lightly anyway. Come talk to me when you're ready to make your decision.");
        cm.dispose();
    } else if(status == 1) {
        if(cm.getLevel() >= 10) {
            cm.sendYesNo("You definitely have the look of a warrior. You may not be ready to take on everything a seasoned warrior would, but I can see a warrior in you. What do you think? Do you want to become a Warrior?");
        } else {
            cm.sendOk("I don't believe that you have the qualities to become a Warrior yet. Go train more and then come talk to me to become one.");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendNext("From now on, you will be a warrior! Continue striving. I'll improve your skills in the hope that you will continue training to become stronger than you already are.");
    } else if(status == 3) {
        if(cm.canHold(1302077)) {
            if(cm.getJobId() == 0) {
                cm.changeJobById(100);
                cm.gainItem(1302077, 1);
                cm.resetStats();
            }
            
            cm.sendNext("You are much stronger now. In addition, I have given you additional inventory slots, an entire row to be exact. I have also given you a little bit of #bSP#k. When you open up the #bskills menu#k in the lower left corner of your screen you can see the skills that you can learn by using SP. A warning though, you can't learn them all, and there are skills that will only become available after you learn other skills first.");
        } else {
            cm.sendOk("Humm. Make sure you have at least one empty slot in your Equip window. I would like to give you a weapon as a reward for becoming a warrior.");
            cm.dispose();
        }
    } else if(status == 4) {
        cm.sendNextPrev("One more warning. After choosing your class, try to stay alive as long as possible. If you die, you will lose a good portion of your experience. You don't want to lose all of that hard work, do you? That's all I can teach you... From now on, you will have to work hard to become stronger. Come see me when you find yourself more powerful than you are now and need more advice.");
    } else {
        cm.dispose();
    }
}

function secondJob(mode, type, selection) {
    if(cm.getLevel() >= 30) {
        if(cm.haveItem(4031008)) {
            // They have the letter of introduction, they need to clear the next step.
            cm.sendOk("Have you not yet found the #p1072000#? Find the #b#p1072000##k who is in #b#m102020300##k which is near #m102000000#. Deliver the letter to him and he will tell you what you need to do next.");
            cm.dispose();
        } else if(cm.haveItem(4031012) || cm.getJobId() != currJob) {
            // Process the job advancement.
            secondJobAdvancement(mode, type, selection);
        } else {
            if(status == 0) {
                cm.sendYesNo("Wow, you've really grown! You're not small and weak any more, now I can really see the potential in you! Impressive. So, what do you think? Do you want to become stronger than you already are? You just need to pass a simple test. Do you want to try?");
            } else if(status == -1) {
                cm.sendOk("Are you sure? Becoming stronger quickly will help you a lot on your journey. If you change your mind in the futue, you can come back here whenever you want. Remember that I will make you much more powerful than you already are.");
                cm.dispose();
            } else if(status == 1) {
                cm.sendNext("Good choice. You are strong, don't get me wrong, but there is still a need to test and see if your strength and power are real. The test isn't very difficult, you'll do fine. Here, take this letter and don't lose it.");
            } else if(status == 2) {
                if(cm.canHold(4031008)) {
                    cm.sendOk("Give this letter to #b#p1072000##k who is in #b#m102020300##k which is near #m102000000#. He's replacing me as a teacher because I am too busy here. Hand him this letter and he will proctor the test for me. He will give you additional information when you get there. Good luck to you.");
                    cm.gainItem(4031008);
                    cm.dispose();
                } else {
                    cm.sendOk("Hmmm... I can't give you the letter because you don't have enough space in your etc. inventory. Come back when you have cleared a few spaces out because the letter is the only way you can do the test.");
                }
            } else {
                cm.dispose();
            }
        }
    } else { // Not level 30 yet, so offer a list of common questions.
        if(status == 0) {
            cm.sendSimple("Oh, you have a question?\r\n#b#L0#What are the characteristics of a warrior?#l\r\n#L1#What types of weapons do warriors use?#l\r\n#L2#What types of armor do warriors wear?#l\r\n#L3#What skills are available to a warrior?#l");
        } else if(status == 1) {
            if(mode == 1) {
                select = selection;
            }
            if(select == 0) { // What are the characteristics of a warrior?
                cm.sendNextPrev("Let me explain the role of the warrior. The warriors have amazing physical strength and power. They also defend themselves well from monster attacks, so they are the best to fight in melee combat with monsters. With a high level of endurance, you wont die easily.");
            } else if(select == 1) { // What types of weapons do warriors use?
                cm.sendNextPrev("Let me explain the weapons that warriors use. Warriors use weapons that allow you to cut, stab, and strike. You can't use weapons like bows and projectile weapons.");
            } else if(select == 2) {
                cm.sendNextPrev("Let me explain the armor that warriors use. Warriors are strong and have a lot of strength so they can wear heavier armor than other classes can't. They may not be the best looking, but they serve their purpose to defend you in battle.");
            } else if(select == 3) {
                cm.sendNextPrev("The skills available to warriors are aimed at their physical strength and power. Those that enhance close combat are the ones that will help you most. There is also a skill that allows you to recover your HP quicker. You better become an expert in it.");
            }
        } else if(status == 2) {
            if(select == 0) {
                cm.sendPrev("However, to attack the monsters accurately, you will need a good dose of DEX not just concentrating on improving your STR. If you want to improve quickly, I recommend that you face stronger monsters.");
            } else if(select == 1) {
                cm.sendPrev("The most common weapons are swords, maces, pole arms, spears, axes, etc.. Every weapon has its advantages and disadvantages, so examine them thoroughly before choosing one. For now, try those with a high level of attack.");
            } else if(select == 2) {
                cm.sendPrev("Shields are perfect for warriors to use. Remember, however, that you can not use a shield if you are wielding a two-handed weapon. I know it will be a difficult decision to make...");
            } else if(select == 3) {
                cm.sendNextPrev("The two attack skills that are available are #b#q1001004##k and #b#q1001005##k. #q1001004# is the one that causes great damage to a single enemy. You can improve this skill from the start.");
            }
        } else if(status == 3) {
            if(select < 3) { // Close out all of the first three.
                cm.dispose();
            } else {
                cm.sendPrev("In turn, #q1001005# does not cause much damage, but attacks multiple enemys in the area at once. You can use it only when you have put a skill point into #q1001004#.");
            }
        } else {
            cm.dispose();
        }
    }
}

function secondJobAdvancement(mode, type, selection) {
    if(status == 0) {
        cm.sendNext("Ahh! You came back without a scratch! I knew you would take the test. I admit, you are a strong and formidable warrior. Right now, I will make you an even stronger warrior than you already are. BUT, before that, you have a choice to make. There are three paths that you will be offered. The choice you pick will determin your future as a warrior. The choice will not be easy, so if you have any questions feel free to ask.");
    } else if(status == 1) {
        cm.sendSimple("Okay, when you are ready to make your decision, click [I want to choose my class!] at the bottom.\r\n#b#L0#Explain to me the role of the Fighter#l\r\n#L1#Explain to me the role of the Page#l\r\n#L2#Explain to me the role of the Spearman#l\r\n#L3#I want to choose my class!#l");
    } else if (status == 2 && mode == 0 && select == 3) { // Only do this if they hit no for job advancement.
        cm.sendOk("So, do you need to think a little more? There's no rush. It's not a decision to take lightly anyways. Let me know when you make your decision.");
        cm.dispose();
    } else if(status == 2) {
        if(mode == 1) {
            select = selection;
        }
        
        if(select == 0) {
            cm.sendNextPrev("Let me explain the role of the Fighter. It's the most common type of warrior. The weapons used are the #bsword#k and #baxe#k because of advanced skills that can be acquired later. As a fighter, you should pick which type of weapon you want to use more, as you can't be proficient in both.");
        } else if(select == 1) {
            cm.sendNextPrev("Let me explain the role of the Page. The Page is a knight apprentice. They often use #bswords#k and #bmaces#k. It's not a good idea to use two different types of weapons, so you should choose one and stick with it.");
        } else if(select == 2) {
            cm.sendNextPrev("Let me explain the role of the Spearman. It's a class that specializes in the use of long range weapons, such as #bpole arms#k and #bspears#k. There are many useful skills acquired with both weapons, but it's recommended you choose one and stick with it.");
        } else if(select == 3) {
            cm.sendSimple("Hmmm, have you decided? Choose the second advancement of the class you would like to become.\r\n#b#L0#Fighter#l\r\n#L1#Page#l\r\n#L2#Spearman#l");
        }
    } else if(status == 3) {
        if(select == 0) {
            cm.sendNextPrev("In addition, there are also skills such as #b#q1101006##k and #b#q1101007##k available to Fighters. #b#q1101006##k is the kind of ability that lets you party enhance their weapons. With it, you can take down enemies with the extra power, which makes it very useful. The downside is that their defense is somewhat reduced in the process.");
        } else if(select == 1) {
            cm.sendNextPrev("In addition, there are also skills such as #b#q1201006##k and #b#q1101007##k for you to learn. #b#q1201006##k makes any opponent around you lose some attack skills and defense for a while. It's very useful against powerful monsters with good offensive skills.");
        } else if(select == 2) {
            cm.sendNextPrev("In addition, there are also skills such as #b#q1301006##k and #b#q1301007##k for you to learn. #b#q1301006##k allows you and members of your party to strengthen your defense and magic defense for a while. It's a very useful skill for the Spearmen with weapons that require two hands and can't defend themselves at the same time.");
        } else if(select == 3) {
            jobSelect = selection;
            cm.sendYesNo("So you want to make the second job advancement as a #b" + (jobSelect == 0 ? "Fighter" : jobSelect == 1 ? "Page" : " Spearman") + "#k? After making your decision, you can't go back and choose another career path. Do you still want to make the advancement?");
        }
    } else if(status == 4) {
        if(select == 0) {
            cm.sendNextPrev("#b#q1101007##k is the ability that allows you to return a portion of the damage caused by an enemy. The higher the hit you take, the more damage that you will counter attack the enemy with. This will help those who prefer fighting close to their enemy. What do you think? Isn't it cool to be a Fighter?");
        } else if(select == 1) {
            cm.sendNextPrev("#b#q1101007##k is a skill that allows you to return a portion of the damage done by monsters. The greater the damage you receive, the more damage you will cause the monster in return. It's the perfect skill for warriors who specialize in melee combat. What do you think? Isn't it a worthy cause to become a Page?");
        } else if(select == 2) {
            cm.sendNextPrev("#b#q1301007##k is a skill that allows you and your party to temporarily increase your maximum HP and MP. You can obtain up to 160% of your maximum HP/MP. This skill will help you and your party when you start to face really powerful opponents. What do you think? Isn't the Spearman a cool class?");
        } else if(select == 3) {
            // Check to make sure they spent their SP.
            var reqSP = (cm.getLevel() - 30) * 3;
            if(cm.getPlayer().getRemainingSp() > reqSP && cm.getJobId() == currJob) {
                cm.sendOk("Hmmm... You have extra #bSP#k. You can't advance to your second job with saved SP from your first job. Use more SP on first job skills and come talk to me later.");
                cm.dispose();
                return;
            }
            
            if(cm.getJobId() == 100) {
                cm.gainItem(4031012, -1);
                cm.changeJobById(jobSelect == 0 ? 110 : jobSelect == 1 ? 120 : 130);
            }
            
            var sendText = "Right! You have now become a #b" + (jobSelect == 0 ? "Fighter" : jobSelect == 1 ? "Page" : "Spearman") + "#k!";
            if(jobSelect == 0)
                sendText += " A Fighter fights to be the strongest among the strong and never stops fighting. Never lose your will to fight and always push yourself.";
            else if(jobSelect == 1)
                sendText += " Pages have intelligence and the bravery of a warrior. I hope you follow the right path with the right mindset.";
            else
                sendText += " The Spearman uses the power of darkness to take down enemies, always in the shadows. Believe in yourself and your incredible power for the journey to come.";
            
            sendText += " I will help you push yourself to become stronger than you already are."; 
            
            cm.sendNext(sendText);
        }
    } else if(status == 5) {
        if(select < 3) {
            status = 1;
            secondJobAdvancement(mode, type, action);
        } else {
            var jobTitle = jobSelect == 0 ? "Fighter" : jobSelect == 1 ? "Page" : "Spearman";
            cm.sendNextPrev("I gave you a book that contains the list of skills you can acquire as a " + jobTitle + ". In this book you will find a number of skills that the " + jobTitle + " can learn. Your inventories were also expanded with a new row of available slots.");
        }
    } else if(status == 6) {
        cm.sendNextPrev("I gave you some #bSP#k. Open up your #bskills#k window to improve your newly acquired skills. One warning though, you can't learn every skill, and some are only available after you learn other skills. Don't forget that.");
    } else if(status == 7) {
        var sendText = jobSelect == 0 ? "Fighters" : jobSelect == 1 ? "Pages" : "Spearmen"
        sendText += " have to be strong. But remember that you can't abuse your new power and use it against weaker beings. Use your power in the right way. Because using it in the right way is much more difficult than just getting stronger."
        cm.sendPrev(sendText);
    } else {
        cm.dispose();
    }
}

function thirdJob(mode, type, selection) {
    var info = cm.getQuestProgress(7500);
    if(status == 0) {
        if(info == "s" && (cm.getJobId() == 110 || cm.getJobId() == 120 || cm.getJobId() == 130)) {
            cm.updateQuest(7500, "p1");
            cm.sendNext("I was waiting for you. A few days ago, #bTylus#k from Ossyria told me about you. Well, I would like to test your strength. There is a secret passage near the #bant tunnel#k. Only you can access it. Once you're inside, you will find my clone. Defeat him and bring me the #b#t4031059##k.");
        } else if(info == "p1") {
            if(cm.haveItem(4031059)) {
                cm.sendOk("Wow, you beat my clone and brought the #b#t4031059##k to me. Very good! This certainly proves your strength. In terms of strength, you are ready to advance to the next level of your class. As promised, I will give the #b#t4031057##k to you. Give this necklace to #bTylus#k in Ossyria and you may take the second test for the advancement. Good luck!");
                cm.gainItem(4031059, -1);
                cm.gainItem(4031057, 1);
                cm.updateQuest(7500, "p2");
            } else {
                cm.sendOk("There is a secret passage near the #bant tunnel#k. Only you can enter it. Once you're inside, you will find my clone. Defeat him and bring me the #b#t4031059##k.");
            }
            cm.dispose();
        } else if(info == "p2") {
            if(!cm.haveItem(4031057)) {
                cm.sendOk("Ahh! You lost #b#t4031057##k, huh? I said you should be careful. For goodness sake, I'll give you another... AGAIN. Please be careful this time. Without it, you can't take the next test for your advancement.");
            } else {
                cm.sendOk("Give this necklace to #bTylus#k in Ossyria to take the second test of your advancement. Good Luck!");
                cm.dispose();
            }
            
        }
    } else if(status == 1) {
        if(info == "s") {
            cm.sendPrev("My clone is quite strong. It uses many special skills and you must fight him at close range. However, you can't stay in the secret passage too long. It's essential that you defeat him as quickly as possible. Well... Good Luck! I'll wait for you to bring me the #b#t4031059##k.");
        } else if(info == "p2") {
            if(cm.canHold(4031057)) {
                cm.gainItem(4031057);
            } else {
                cm.sendOk("Hmm... How strange. Please make sure you have an empty slot in your Etc. inventory.");
            }
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

function other(mode, type, selection) {
    if(cm.getJobId() > 100 && cm.getJobId() < 200) {
        var jobTitle = "";
        if(cm.getJobId() == 110)
            jobTitle = "Fighter";
        else if(cm.getJobId() == 111)
            jobTitle = "Crusader";
        else if(cm.getJobId() == 112)
            jobTitle = "Hero";
        else if(cm.getJobId() == 120)
            jobTitle = "Page";
        else if(cm.getJobId() == 121)
            jobTitle = "White Knight";
        else if(cm.getJobId() == 122)
            jobTitle = "Paladin";
        else if(cm.getJobId() == 130)
            jobTitle = "Spearman";
        else if(cm.getJobId() == 131)
            jobTitle = "Dragon Knight";
        else if(cm.getJobId() == 132)
            jobTitle = "Dark Knight";
            
            
        if(cm.getJobId() % 10 == 0) {
            cm.sendOk("Ah! Is that you? How is the life of a " + jobTitle + "? You seem.. much stronger than before! I hope you continue improving.");
        } else {
            cm.sendOk("Ahhh... You finally became a #b" + jobTitle + "#k. I knew you would not disappoint me. So what do you think of life as a " + jobTitle + "? Please dedicate yourself and practice even more.");
        }
    } else {
        cm.sendOk("What magnificent physqiue! What incredible power! Warriors are the best! Would you like to become a warrior?");
    }
    
    cm.dispose();
}