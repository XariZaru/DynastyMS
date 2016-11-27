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
    Victoria Road : Magic Library(102000003)
	Magician Job Advancement
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
        else if(currJob == 200)
            secondJob(mode, type, selection);
        else if(cm.isQuestStarted(7500))
            thirdJob(mode, type, selection);
        else
            other(mode, type, selection);
    }
}

function firstJob(mode, type, selection) {
    if(status == 0 && mode == 1) {
        cm.sendNext("Do you want to become a Magician? You need to meet some criteria in order to do so.#b You should be at least in level 8#k. Let's see...");
    } else if(status == 0 && mode == 0) { // Used when pressing no on status 1.
        cm.sendOk("Need more time to think about it? Feel free. It's not something you should take lightly anyway. Come talk to me when you're ready to make your decision.");
        cm.dispose();
    } else if(status == 1) {
        if(cm.getLevel() >= 8) {
            cm.sendYesNo("You definitely have the look of a magician. You may not be ready to take on everything a seasoned magician would, but I can see a magician in you. What do you think? Do you want to become a Magician?");
        } else {
            cm.sendOk("I don't believe that you have the qualities to become a Magician yet. Go train more and then come talk to me to become one.");
            cm.dispose();
        }
    } else if(status == 2) {
        if(cm.canHold(1372043)) {
            if(cm.getJobId() == 0) {
                cm.changeJobById(200);
                cm.gainItem(1372043, 1);
                cm.resetStats();
            }
            cm.sendNext("You have just gained much more magical power. Keep training every day to become even more powerful. I will also check in on you from time to time to see how you're progressing.");
        } else {
            cm.sendOk("Humm. Make sure you have at least one empty slot in your Equip window. I would like to give you a weapon as a reward for becoming a magician.");
            cm.dispose();
        }
    } else if(status == 3) {
        cm.sendNext("I have given you additional inventory slots, an entire row to be exact. I have also given you a little bit of #bSP#k. When you open up the #bskills menu#k in the lower left corner of your screen you can see the skills that you can learn by using SP. A warning though, you can't learn them all, and there are skills that will only become available after you learn other skills first.");
    } else if(status == 4) {
        cm.sendNextPrev("One more warning. After choosing your class, try to stay alive as long as possible. If you die, you will lose a good portion of your experience. You don't want to lose all of that hard work, do you? That's all I can teach you... From now on, you will have to work hard to become stronger. Come see me when you find yourself more powerful than you are now and need more advice.");
    } else if(status == 5) {
        cm.sendNextPrev("That's all I can teach you for now. Go out into the world, train, and become even stronger. Come back to me when you think you've done everything you can and need some more help. I'll be waiting for you here.");
    } else if(status == 6) {
        cm.sendPrev("Oh, and if you have any questions about being a magician, please just ask. I don't know everything to tell you the truth, but I can teach you some of what I know.");
    } else {
        cm.dispose();
    }
}

function secondJob(mode, type, selection) {
    if(cm.getLevel() >= 30) {
        if(cm.haveItem(4031009)) {
            // They have the letter of introduction, they need to clear the next step.
            cm.sendOk("Have you not yet found the #p1072001#? Find the #b#p1072001##k who is in #b#m101020000##k which is near #m101000000#. Deliver the letter to him and he will tell you what you need to do next.");
            cm.dispose();
        } else if(cm.haveItem(4031012) || cm.getJobId() != currJob) {
            // Process the job advancement.
            secondJobAdvancement(mode, type, selection);
        } else {
            if(status == 0) {
                cm.sendYesNo("Wow, you've really grown! You're quite different now. Much stronger, and I can even sense the expanded potential in you! Impressive. So, what do you think? Do you want to become stronger than you already are? You just need to pass a simple test. Do you want to try?");
            } else if(status == -1) {
                cm.sendOk("Are you sure? Becoming stronger quickly will help you a lot on your journey. If you change your mind in the future, you can come back here whenever you want. Remember that I will make you much more powerful than you already are.");
                cm.dispose();
            } else if(status == 1) {
                cm.sendNext("Well, you seem to be strong, that is true. But I need to see if you have the potential to grow even stronger. The test I have prepared will not be difficult and I think you will be able to pass it with ease. Here, take this letter. Don't lose it.");
            } else if(status == 2) {
                if(cm.canHold(4031009)) {
                    cm.sendOk("Take this letter to #b#p1072001##k who is in #b#m101020000##k near #m101000000#. He is replacing me as an instructor for now. Give the letter to him and he will proctor the test for me. He will give you all of the necessary information when you get there. Good luck to you.");
                    cm.gainItem(4031009);
                    cm.dispose();
                } else {
                    cm.sendOk("I believe you don't have room in your inventory to recieve my letter. Free up some space in your etc. inventory and then talk to me again. After all, you can't take the test without the letter.");
                }
            } else {
                cm.dispose();
            }
        }
    } else { // Not level 30 yet, so offer a list of common questions.
        if(status == 0) {
            cm.sendSimple("Any questions about how to be a Magician?\r\n#b#L0#What are the basic features of a Magician?#l\r\n#L1#What types of weapons do Magicians use?#l\r\n#L2#What types of armor do magicians wear?#l\r\n#L3#What kind of skills do magicians use?#l");
        } else if(status == 1) {
            if(mode == 1) {
                select = selection;
            }
            if(select == 0) { // What are the characteristics of a warrior?
                cm.sendNextPrev("I'll explain more about being a Magician. The Magicians have high levels of intelligence and magic. They can use the power of nature which is all around us to kill enemies. But, the downside is they are very weak in melee combat. Magicians don't have very high defense either, so be careful and avoid being killed.");
            } else if(select == 1) { // What types of weapons do warriors use?
                cm.sendNextPrev("I'll explain more about the weapons Magicians can wield. In fact, for a magician weapons wont do much at all directly. Magicians don't have much strength or dexterity, because of that you may find it difficult to defeat a small snail using your weapon directly.");
            } else if(select == 2) {
                cm.sendNextPrev("I'll explain more about the armor of a Magician. Honestly, magicians don't have a lot of armor as they have very little phyiscal strength. The defensive skills are also not that great, so I don't know if they will help much with anything.");
            } else if(select == 3) {
                cm.sendNextPrev("The skills available to Magicians use the high levels of intelligence and magic that magicians have. There is also the Magic Guard and Magic Armor skills which help prevent the death of magicians.");
            }
        } else if(status == 2) {
            if(select == 0) {
                cm.sendPrev("The fact Magicians can attack monsters from a distance will help out a lot though. Try to improve your intelligence level if you want to attack enemies with more precise spells. The higher your intelligence, the better you will be at casting spells and using magic.");
            } else if(select == 1) {
                cm.sendNextPrev("Now, because magicians use magical power, weapons take on a wholly different meaning. Magicians can gain magical power from staves and wands, and maces. But maces are only good for small force attacks.  I wouldn't recommend using maces for a magician at all really. ");
            } else if(select == 2) {
                cm.sendPrev("Some armors, however, have the ability to defend against great magical power so they can help protect you from magic attacks. They won't help much, but it's still better than not wearing anything at all. Be sure to buy some if you have time.");
            } else if(select == 3) {
                cm.sendNextPrev("The main attack skills magicians have are #b#q2001004##k and #b#q2001005##k. First, #q2001004#k is a skill that causes heavy damage to the opponent with minimal use of MP.");
            }
        } else if(status == 3) {
            if(select == 0 || select == 2) { // Close out all of the first three.
                cm.dispose();
            } else if(select == 1) {
                cm.sendPrev("In fact, staves and wands are the preferred weapons. They have special magical powers and improve the performance of the Magician because of that. It's a good idea to carry a weapon with a high level of magic power.");
            } else {
                cm.sendPrev("In turn, #q2001005# uses very little MP to attack the enemy twice. But you only can use #q2001005# when you already have some proficiency in #q2001004#. Don't forget that. You will have to decide what to do.");
            }
        } else {
            cm.dispose();
        }
    }
}

function secondJobAdvancement(mode, type, selection) {
    if(status == 0) {
        cm.sendNext("You did well, very well. I knew you would pass the test with ease. Now, I will make you even stronger. But, before that, you will have to choose one of three paths that you will be offered. It will not be an easy decision, but if you have any questions I will be happy to hear them.");
    } else if(status == 1) {
        cm.sendSimple("Okay, when you are ready to make your decision, click [I want to choose my class!] at the bottom.\r\n#b#L0#Explain to me the role of the Fire & Poison Wizard#l\r\n#L1#Explain to me the role of the Ice & Lightning Wizard#l\r\n#L2#Explain to me the role of the Cleric#l\r\n#L3#I want to choose my class!#l");
    } else if (status == 2 && mode == 0 && select == 3) { // Only do this if they hit no for job advancement.
        cm.sendOk("So, do you need to think a little more? There's no rush. It's not a decision to take lightly anyways. Let me know when you make your decision.");
        cm.dispose();
    } else if(status == 2) {
        if(mode == 1) {
            select = selection;
        }
        
        if(select == 0) {
            cm.sendNextPrev("Let me explain about the Fire & Poison Wizard. F/P Wizards specialize in magic of fire and poison. Skills such as #b#q2101001##k allow you to improve your overall magic and the magic level of your party for a while. There is also #b#q2100000##k which gives you a chance to absorb some of the enemy's MP. These skills are essential for Wizards in the heat of battle.");
        } else if(select == 1) {
            cm.sendNextPrev("Let me explain about the Ice & Lightning Wizard. I/L Wizards specialize in magic of ice and lightning. Skills such as #b#q2101001##k allow you to improve your overall magic and the magic level of your party for a while. There is also #b#q2100000##k which gives you a chance to absorb some of the enemy's MP. These skills are essential for the Wizard in the heat of battle.");
        } else if(select == 2) {
            cm.sendNextPrev("Let me explain about the Cleric now. Clerics use religious magic against monsters through prayers and incantations. Skills such as #b#q2301004##k temporarily improves weapon defense, magic defense, accuracy and avoidance. Also, #b#q2301003##k reduces a certain amount of weapon damage which helps offset their weakness.");
        } else if(select == 3) {
            cm.sendSimple("Well, have you decided? Choose the second advancement of the class you would like to become.\r\n#b#L0#Fire Poison Wizard#l\r\n#L1#Ice Lightning Wizard#l\r\n#L2#Cleric#l");
        }
    } else if(status == 3) {
        if(select == 0) {
            cm.sendNextPrev("Next, I will explain a magic attack called #b#q2101004##k. This skill shoots flaming arrows at enemies, which makes this your most powerful attack skill available during the second job. It will work best against enemies that are weak to fire because it will do much more damage. On the other hand, if you use it against enemies that are resistant to fire, the damage will be reduced by half. Don't forget that.");
        } else if(select == 1) {
            cm.sendNextPrev("Next, I will explain a magic attack called #b#q2201004##k. This skill shoots ice shards at enemies. Although it's not as powerful as #q2101004#, the enemies ");
        } else if(select == 2) {
            cm.sendNextPrev("The Cleric is the only Wizard able to perform recovery spells. The main skill to do this is through the #b#q2301002##k skill. The higher your MP, INT, and level of the skill, the more HP you will recover. It also affects the members of your party who are close to you. Overall, it's a very useful skill that allows you to continue hunting without the aid of potions.");
        } else if(select == 3) {
            jobSelect = selection;
            cm.sendYesNo("So you want to make the second job advancement as a #b" + (jobSelect == 0 ? "Fire Poison Wizard" : jobSelect == 1 ? "Ice Lightning Wizard" : "Cleric") + "#k? After making your decision, you can't go back and choose another career path. Do you still want to make the advancement?");
        }
    } else if(status == 4) {
        if(select == 0) {
            cm.sendNextPrev("Next up is a magic attack skill called #b#q2101005##k. It shoots poisonous bubbles at enemies so they will get poisoned. Thereafter, the HP of the enemy will decrease over time. If the spell does not work well, or if the monster has a lot of HP, it may be a good idea to use it as often as necessary to kill them.");
        } else if(select == 1) {
            cm.sendNextPrev("Next up is a magic attack skill called #b#q2201005##k. It is the only second job skill for Wizards that can be considered an advanced spell and affects multiple monsters at once. It can't cause much damage, but the advantage of attacking multiple monsters at once. However, it can only damage six monsters at a time. Still, it's an incredible attack.");
        } else if(select == 2) {
            cm.sendNextPrev("Clerics also have a magic attack called #b#q2301005##k. It's a spell that allows the Cleric to shoot holy arrows at monsters. It doesn't do a lot of damage, but it's very effective against undead monsters.");
        } else if(select == 3) {
            // Check to make sure they spent their SP.
            var reqSP = (cm.getLevel() - 30) * 3;
            if(cm.getPlayer().getRemainingSp() > reqSP && cm.getJobId() == currJob) {
                cm.sendOk("Hmmm... You have extra #bSP#k. You can't advance to your second job with saved SP from your first job. Use more SP on first job skills and come talk to me later.");
                cm.dispose();
                return;
            }
            
            if(cm.getJobId() == 200) {
                cm.gainItem(4031012, -1);
                cm.changeJobById(jobSelect == 0 ? 210 : jobSelect == 1 ? 220 : 230);
            }
            
            var sendText = "Right! You have now become a #b" + (jobSelect == 0 ? "Fire Poison Wizard" : jobSelect == 1 ? "Ice Lightning Wizard" : "Cleric") + "#k!";
            if(jobSelect >= 1)
                sendText += " Wizards use their high intelligence and command of nature around us to take down enemies. Continue with your studies, for one day you will become even more powerful than I.";
            else
                sendText += " Clerics blow life into every organism with an unshakable faith in God. Never stray from your holy path and one day I will help you become much more powerful.";
                        
            cm.sendNext(sendText);
        }
    } else if(status == 5) {
        if(select < 3) {
            status = 1;
            secondJobAdvancement(mode, type, action);
        } else {
            var jobTitle = jobSelect == 0 ? "Fire Poison Wizard" : jobSelect == 1 ? "Ice Lightning Wizard" : "Cleric";
            cm.sendNextPrev("I gave you a book that contains the list of skills you can acquire as a " + jobTitle + ". In this book you will find a number of skills that the " + jobTitle + " can learn. Your inventories were also expanded with a new row of available slots, and I also gave you a boost in MP.");
        }
    } else if(status == 6) {
        cm.sendNextPrev("I gave you some #bSP#k. Open up your #bskills#k window to improve your newly acquired skills. One warning though, you can't learn every skill, and some are only available after you learn other skills. Don't forget that.");
    } else if(status == 7) {
        var sendText = "";
        if(jobSelect <= 1) {
            sendText += jobSelect == 0 ? "Fire Poison Wizard" : "Ice Lightning Wizard";
            sendText += "s have to be strong. But remember that you can't abuse your new power and use it against weaker beings. Use your power in the right way. Because using it in the right way is much more difficult than just getting stronger."
        } else {
            sendText += "Clerics need faith above everything else. Keep your faith in God and treat all individuals with the respect and dignity they deserve. Continue trying hard and one day you will astound yourself with how much you've gorwn. I'll keep an eye on you until the time you are ready to become even more in tune with the faith.";
        }
        cm.sendPrev(sendText);
    } else {
        cm.dispose();
    }
}

function thirdJob(mode, type, selection) {
    var info = cm.getQuestProgress(7500);
    if(status == 0) {
        if(info == "s" && (cm.getJobId() == 210 || cm.getJobId() == 220 || cm.getJobId() == 230)) {
            cm.updateQuest(7500, "p1");
            cm.sendNext("I was waiting for you. A few days ago, #bRobeira#k from Ossyria told me about you. Well, I would like to test your strength. There is a secret passage near the #bEllinia forest#k. Only you can access it. Once you're inside, you will find my clone. Defeat him and bring me the #b#t4031059##k.");
        } else if(info == "p1") {
            if(cm.haveItem(4031059)) {
                cm.sendOk("Wow, you beat my clone and brought the #b#t4031059##k to me. Very good! This certainly proves your strength. In terms of strength, you are ready to advance to the next level of your class. As promised, I will give the #b#t4031057##k to you. Give this necklace to #bRobeira#k in Ossyria and you may take the second test for the advancement. Good luck!");
                cm.gainItem(4031059, -1);
                cm.gainItem(4031057, 1);
                cm.updateQuest(7500, "p2");
            } else {
                cm.sendOk("There is a secret passage near the #bEllinia#k. Only you can enter it. Once you're inside, you will find my clone. Defeat him and bring me the #b#t4031059##k.");
            }
            cm.dispose();
        } else if(info == "p2") {
            if(!cm.haveItem(4031057)) {
                cm.sendOk("Ahh! You lost #b#t4031057##k, huh? I said you should be careful. For goodness sake, I'll give you another... AGAIN. Please be careful this time. Without it, you can't take the next test for your advancement.");
            } else {
                cm.sendOk("Give this necklace to #bRobeira#k in Ossyria to take the second test of your advancement. Good Luck!");
                cm.dispose();
            }
            
        }
    } else if(status == 1) {
        if(info == "s") {
            cm.sendPrev("My clone is quite strong. He uses many special skills and you must fight him. However, you can't stay in the secret passage too long. It's essential that you defeat him as quickly as possible. Well... Good Luck! I'll wait for you to bring me the #b#t4031059##k.");
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
    if(cm.getJobId() > 200 && cm.getJobId() < 300) {
        var jobTitle = "";
        if(cm.getJobId() == 210)
            jobTitle = "Wizard";
        else if(cm.getJobId() == 211)
            jobTitle = "Mage";
        else if(cm.getJobId() == 212)
            jobTitle = "Arch Mage";
        else if(cm.getJobId() == 220)
            jobTitle = "Wizard";
        else if(cm.getJobId() == 221)
            jobTitle = "Mage";
        else if(cm.getJobId() == 222)
            jobTitle = "Arch Mage";
        else if(cm.getJobId() == 230)
            jobTitle = "Cleric";
        else if(cm.getJobId() == 231)
            jobTitle = "Priest";
        else if(cm.getJobId() == 232)
            jobTitle = "Bishop";
            
            
        if(cm.getJobId() % 100 == 10) {
            cm.sendOk("Oh, it's you. What do you think of life as a " + jobTitle + "? You seem quite comfortable with those flaming arrows now. Please dedicate yourself and train even more.");
        } else if(cm.getJobId() % 100 == 20) {
            cm.sendOk("Oh, it's you. What do you think of life as a " + jobTitle + "? You seem quite able to deal with the ice and lightning now. Please dedicate yourself and train even more.");
        } else if(cm.getJobId() % 100 == 30) {
            cm.sendOk("Oh, it's you. What do you think of life as a " + jobTitle + "? You seem to be able this sacred magic with ease. Please dedicate yourself and train even more.");
        } else {
            cm.sendOk("Ahhh... You finally became a #b" + jobTitle + "#k. I knew you would not disappoint me. So what do you think of life as a " + jobTitle + "? Please dedicate yourself and practice even more.");
        }
    } else {
        cm.sendOk("Would you like to dabble in the power of nature? It may be a long and difficult road, but you certainly get a reward at the end, reaching the pinnacle of the art of magicians.");
    }
    
    cm.dispose();
}