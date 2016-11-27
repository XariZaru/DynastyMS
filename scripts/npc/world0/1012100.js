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
/*  Athena Peirce
    Victoria Road : Bowman Instructional School(100000201)
	Archer Job Advancement
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
        else if(currJob == 300)
            secondJob(mode, type, selection);
        else if(cm.isQuestStarted(7500))
            thirdJob(mode, type, selection);
        else
            other(mode, type, selection);
    }
}

function firstJob(mode, type, selection) {
    if(status == 0 && mode == 1) {
        cm.sendNext("So, you would like to become an Archer? You need to meet some criteria in order to do so.#b You should be at least in level 10#k. Let's see...");
    } else if(status == 0 && mode == 0) { // Used when pressing no on status 1.
        cm.sendOk("Need more time to think about it? Feel free. It's not something you should take lightly anyway. Come talk to me when you're ready to make your decision.");
        cm.dispose();
    } else if(status == 1) {
        if(cm.getLevel() >= 10) {
            cm.sendYesNo("You seem to be qualified. Do you have a strong pair of eyes to see monsters truely, and the skills necessary to strike them with an arrow? We need someone like that. Would you like to become an Archer?");
        } else {
            cm.sendOk("You need to grow stronger. Don't think that following the path of the Archer is easy.");
            cm.dispose();
        }
    } else if(status == 2) {
        if(cm.canHold(1372043) && getNumberOfFreeSlots(2) >= 3) {
            if(cm.getJobId() == 0) {
                cm.changeJobById(300);
                cm.gainItem(1452051, 1);
                cm.gainItem(2060000, 200);
                cm.gainItem(2060000, 200);
                cm.gainItem(2060000, 200);
                cm.resetStats();
            }
            cm.sendNext("Right! You will be an Archer from now on. Here, I just gave a bit of my power to you!");
        } else {
            cm.sendOk("Humm. Make sure you have at least some space empty in your Equip and USE windows. I would like to give you a weapon as a reward for becoming an archer.");
            cm.dispose();
        }
    } else if(status == 3) {
        cm.sendNext("I have given you additional inventory slots, an entire row to be exact. I have also given you a little bit of #bSP#k. When you open up the #bskills menu#k in the lower left corner of your screen you can see the skills that you can learn by using SP. A warning though, you can't learn them all, and there are skills that will only become available after you learn other skills first.");
    } else if(status == 4) {
        cm.sendNextPrev("One more warning. After choosing your class, try to stay alive as long as possible. If you die, you will lose a good portion of your experience. You don't want to lose all of that hard work, do you? That's all I can teach you... From now on, you will have to work hard to become stronger. Come see me when you find yourself more powerful than you are now and need more advice.");
    } else if(status == 5) {
        cm.sendNextPrev("That's all I can teach you for now. Go out into the world, train, and become even stronger. Come back to me when you think you've done everything you can and need some more help. I'll be waiting for you here.");
    } else if(status == 6) {
        cm.sendPrev("Oh, and if you have any questions about being an archer, please just ask. I don't know everything to tell you the truth, but I can teach you some of what I know.");
    } else {
        cm.dispose();
    }
}

function secondJob(mode, type, selection) {
    if(cm.getLevel() >= 30) {
        if(cm.haveItem(4031010)) {
            // They have the letter of introduction, they need to clear the next step.
            cm.sendOk("You can't find the instructor, right? Find the #b#p1072002##k who is in #k#m106010000##k which is near #m100000000#. Give her this letter, and she will tell you what to do.");
            cm.dispose();
        } else if(cm.haveItem(4031012) || cm.getJobId() != currJob) {
            // Process the job advancement.
            secondJobAdvancement(mode, type, selection);
        } else {
            if(status == 0) {
                cm.sendYesNo("You have grown a lot since the last time I saw you. I don't see the weak being that you were before anymore. In fact, your much more like a true archer now. Well, would you like to become even more powerful? You just need to complete a simple test for me. Are you ready?");
            } else if(status == -1) {
                cm.sendOk("Are you sure? Becoming stronger quickly will help you a lot on your journey. If you change your mind in the future, you can come back here whenever you want. Remember that I will make you much more powerful than you already are.");
                cm.dispose();
            } else if(status == 1) {
                cm.sendNext("Good decision. You look strong, but I need to know for sure that you are strong enough by passing this test. It's not a difficult test, you should be fine. Take this letter for me.");
            } else if(status == 2) {
                if(cm.canHold(4031010)) {
                    cm.sendOk("Take this letter to #b#p1072002##k who is in #b#m106010000##k near #m100000000#. She is replacing me as an instructor for now. Give her the letter and she will proctor the test for me. I wish you luck.");
                    cm.gainItem(4031010);
                    cm.dispose();
                } else {
                    cm.sendOk("I believe you don't have room in your inventory to receive my letter. Free up some space in your etc. inventory and then talk to me again. After all, you can't take the test without the letter.");
                }
            } else {
                cm.dispose();
            }
        }
    } else { // Not level 30 yet, so offer a list of common questions.
        if(status == 0) {
            cm.sendSimple("Do you have any questions about the life of an Archer?\r\n#b#L0#What are the basic features of an Archer?#l\r\n#L1#What types of weapons do Archers use?#l\r\n#L2#What types of armor do Archers wear?#l\r\n#L3#What kind of skills do Archers use?#l");
        } else if(status == 1) {
            if(mode == 1) {
                select = selection;
            }
            if(select == 0) { // What are the characteristics of a warrior?
                cm.sendNextPrev("Being an Archer isn't a simple task. Archers have a reasonable amount of damage and strength. For an archer, their most important attribute is DEX. The only downside is that archers don't have much defense, so try to avoid getting hit if possible.");
            } else if(select == 1) { // What types of weapons do warriors use?
                cm.sendNextPrev("I'll explain more about the weapons of the archer. Instead of using weapons to directly hit a monster, archers use ranged weapons like bows and crossbows to kill monsters. Both have their advantages and disadvantages.");
            } else if(select == 2) {
                cm.sendNextPrev("I'll explain more about the armor of an Archer. Archers need to move quickly, therefore it not do any good to use heavy armor. Clothes with long and troublesome cords are out of the question.");
            } else if(select == 3) {
                cm.sendNextPrev("The skills available to archers are ones that use the archers high precision and dexterity. It's essential that archers acquire skills that allow them to attack the enemyt with precision.");
            }
        } else if(status == 2) {
            if(select == 0) {
                cm.sendPrev("An Archer's main advantage is that you can attack from afar, avoiding melee combat with monsters. Moreover, with an archers high avoid ability you will also avoid many melee attacks as well. The higher DEX you have, the more damage you will deal to the monster.");
            } else if(select == 1) {
                cm.sendNextPrev("The bows are not as powerful as crossbows, but are much faster in attack speed. The crossbows in turn are more powerful and less rapid. It will be difficult to make a decision.");
            } else if(select == 2) {
                cm.sendPrev("If you use the big and bulky armor of warriors, you will soon be surrounded by enemies. Pick out some simple and comfortable armor that suits you and fulfills it's function. It will help you a lot while you are hunting monsters.");
            } else if(select == 3) {
                cm.sendNextPrev("There are two main attack skills available to Archers. #b#q3001004##k and #b#q3001005##k. #q3001004# is a good, simple skill that allows you to cause a lot of damage on the enemy while using very little MP.");
            }
        } else if(status == 3) {
            if(select == 0 || select == 2) { // Close out all of the first three.
                cm.dispose();
            } else if(select == 1) {
                cm.sendPrev("You can get arrows and crossbow arrows by hunting monsters, or buying them in a shop. Because of this it is important to hunt frequently. Be sure to train every single day and success will come to you.");
            } else {
                cm.sendPrev("In turn, #q3001005# allows you to attack the enemy twice using a considerable amount of MP. You can only acquire this ability after learning #q3001004#. Don't forget that. Whatever you choose, become an expert in that skill.");
            }
        } else {
            cm.dispose();
        }
    }
}

function secondJobAdvancement(mode, type, selection) {
    if(status == 0) {
        cm.sendNext("Heh, I knew you would pass the test. I admit, you are a great archer. I will help make you even stronger than you are now. But before that, you will have to choose one of two paths that I will offer you. It will be a difficult decision, but feel free to ask questions.");
    } else if(status == 1) {
        cm.sendSimple("Okay, when you are ready to make your decision, click [I want to choose my class!] at the bottom.\r\n#b#L0#Explain to me the role of the Hunter#l\r\n#L1#Explain to me the role of the Crossbowman#l\r\n#L2#I want to choose my class!#l");
    } else if (status == 2 && mode == 0 && select == 3) { // Only do this if they hit no for job advancement.
        cm.sendOk("So, do you need to think a little more? There's no rush. It's not a decision to take lightly anyways. Let me know when you make your decision.");
        cm.dispose();
    } else if(status == 2) {
        if(mode == 1) {
            select = selection;
        }
        
        if(select == 0) {
            cm.sendNextPrev("Okay, here's what being a hunter is all about. Hunters have abilities such as #q3100000# and #q3101002# that allows you to enhance your shooting abilities. There an ability called #q3101004# that allows hunters to use an arrow substitute. It allows you to shoot for a long period of time without actually using your arrows. So if you've spent a lot of mesos on arrows, this ability is perfect for you.");
        } else if(select == 1) {
            cm.sendNextPrev("Okay, here's what being a crossbowman is all about. For a crossbowman, skills such as #q3200000# and #q3201002# are available along with #q3201004# for those that allows you to use an arrow substitute. This ability allows the player to shoot arrows for a long period of time without using your arrows. So if you've spent a lot of mesos on arrows, you may want to check it out.");
        } else if(select == 2) {
            cm.sendSimple("Well, have you decided? Choose the second advancement of the class you would like to become.\r\n#b#L0#Hunter#l\r\n#L1#Crossbowman#l");
        }
    } else if(status == 3) {
        if(select == 0) {
            cm.sendNextPrev("Next, I will explain the hunter ability #b#q3101003##k. No one is better than a hunter at long range attacks, but that changes completely when there are multiple enemies or you need to attack at close range. So, this ability is very important to help with that. It allows you to not only attack the nearest enemy, but also send other enemies away from you. It's an important skill for you to get a little more space to shoot in, which is a necessity.");
        } else if(select == 1) {
            cm.sendNextPrev("Okay, one of the skills that a crossbowman can have is #b#q3201003#k. No one can come close to the long distance crossbowman attacks, but it's a completely difffferent story when it comes to melee combat or facing multiple enemies. So, that makes this ability important. It allows you to attack with full force at close range, sending multiple enemies away in the process. It's a very important skill that gives you a little more space to work with.");
        } else if(select == 2) {
            jobSelect = selection;
            cm.sendYesNo("So you want to make the second job advancement as a #b" + (jobSelect == 0 ? "Hunter" : "Crossbowman") + "#k? After making your decision, you can't go back and choose another career path. Do you still want to make the advancement?");
        }
    } else if(status == 4) {
        if(select == 0) {
            cm.sendNextPrev("Next is the hunter attack ability, #b#q3101005##k. It is a skill that allows you to shoot arrows with bombs attached to them. If you hit an enemy with one of these arrows, the bome will explode causing damage to them, and any enemies near by, stunning them temporarily. Combine this ability with #q3000001#, the first job skill, and the damage will be amazing. I think you may like the role of Hunter.");
        } else if(select == 1) {
            cm.sendNextPrev("Okay, I will explain another one of the crossbowman attack skills, #b#q3201005##k. This ability allows you to attack multiple enemies, as the arrow passes through the monster and hits another monster behind it. The damage delt by it is powerful and can still hit multiple enemies at once. If combined with #q3000001# it's a simply amazing combination.");
        } else if(select == 2) {
            // Check to make sure they spent their SP.
            var reqSP = (cm.getLevel() - 30) * 3;
            if(cm.getPlayer().getRemainingSp() > reqSP && cm.getJobId() == currJob) {
                cm.sendOk("Hmmm... You have extra #bSP#k. You can't advance to your second job with saved SP from your first job. Use more SP on first job skills and come talk to me later.");
                cm.dispose();
                return;
            }
            
            if(cm.getJobId() == 300) {
                cm.gainItem(4031012, -1);
                cm.changeJobById(jobSelect == 0 ? 310 : 320);
            }
            
            var sendText = "Very well, You have now become a #b" + (jobSelect == 0 ? "Hunter" : "Crossbowman") + "#k!";
            sendText += " Hunters are a smart bunch with incredible vision, able to put an arrow into the heart of a monster with ease. You will have to train every day though. I will also help you become stronger than you already are.";
                        
            cm.sendNext(sendText);
        }
    } else if(status == 5) {
        if(select < 2) {
            status = 1;
            secondJobAdvancement(mode, type, action);
        } else {
            var jobTitle = jobSelect == 0 ? "Hunter" : "Crossbowman";
            cm.sendNextPrev("I gave you a book that contains the list of skills you can acquire as a " + jobTitle + ". In this book you will find a number of skills that the " + jobTitle + " can learn. Your inventories were also expanded with a new row of available slots, and I also gave you a boost in MP.");
        }
    } else if(status == 6) {
        cm.sendNextPrev("I gave you some #bSP#k. Open up your #bskills#k window to improve your newly acquired skills. One warning though, you can't learn every skill, and some are only available after you learn other skills. Don't forget that.");
    } else if(status == 7) {
        var sendText = "";
        
        sendText += jobSelect == 0 ? "Hunters" : "Crossbowmen";
        sendText += " have to be strong. But remember that you can't abuse your new power and use it against weaker beings. Use your power in the right way. Because using it in the right way is much more difficult than just getting stronger."
        cm.sendPrev(sendText);
    } else {
        cm.dispose();
    }
}

function thirdJob(mode, type, selection) {
    var info = cm.getQuestProgress(7500);
    if(status == 0) {
        if(info == "s" && (cm.getJobId() == 310 || cm.getJobId() == 320)) {
            cm.updateQuest(7500, "p1");
            cm.sendNext("I was waiting for you. A few days ago, #bRene#k from Ossyria told me about you. Well, I would like to test your strength. Amidst a dense forest somewhere in Victoria Island, you will find a secret passage that will take you to a new dimension. Only you can access it. Once you're inside, you will find my clone. Defeat them and bring me the #b#t4031059##k.");
        } else if(info == "p1") {
            if(cm.haveItem(4031059)) {
                cm.sendOk("Wow, you beat my clone and brought the #b#t4031059##k to me. Very good! This certainly proves your strength. In terms of strength, you are ready to advance to the next level of your class. As promised, I will give the #b#t4031057##k to you. Give this necklace to #bRene#k in Ossyria and you may take the second test for the advancement. Good luck!");
                cm.gainItem(4031059, -1);
                cm.gainItem(4031057, 1);
                cm.updateQuest(7500, "p2");
            } else {
                cm.sendOk("Amidst a dense forest somewhere in Victoria Island, you will find a secret passage that will take you to a new dimension. Once you're inside, you will find my clone. Defeat him and bring me the #b#t4031059##k.");
            }
            cm.dispose();
        } else if(info == "p2") {
            if(!cm.haveItem(4031057)) {
                cm.sendOk("Ahh! You lost #b#t4031057##k, huh? I said you should be careful. For goodness sake, I'll give you another... AGAIN. Please be careful this time. Without it, you can't take the next test for your advancement.");
            } else {
                cm.sendOk("Give this necklace to #bRene#k in Ossyria to take the second test of your advancement. Good Luck!");
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

function getNumberOfFreeSlots(invType) {
	var type = Packages.client.inventory.MapleInventoryType.getByType(invType);
	if(type == null) return 0;
	
	return cm.getPlayer().getInventory(type).getNumFreeSlot();
}

function other(mode, type, selection) {
    if(cm.getJobId() > 300 && cm.getJobId() < 400) {
        var jobTitle = "";
        if(cm.getJobId() == 310)
            jobTitle = "Hunter";
        else if(cm.getJobId() == 311)
            jobTitle = "Ranger";
        else if(cm.getJobId() == 312)
            jobTitle = "Bowmaster";
        else if(cm.getJobId() == 320)
            jobTitle = "Crossbowman";
        else if(cm.getJobId() == 321)
            jobTitle = "Sniper";
        else if(cm.getJobId() == 322)
            jobTitle = "Marksman";
            
            
        if(cm.getJobId() % 100 == 10) {
            cm.sendOk("Oh, it's you. What do you think of life as a " + jobTitle + "? You seem able to handle those explosive arrows easily. Please dedicate yourself and train even more.");
        } else if(cm.getJobId() % 100 == 20) {
            cm.sendOk("Oh, it's you. What do you think of life as a " + jobTitle + "? You seem to be able to handle that crossbow with ease now. Please dedicate yourself and train even more.");
        } else {
            cm.sendOk("Ahhh... You finally became a #b" + jobTitle + "#k. I knew you would not disappoint me. So what do you think of life as a " + jobTitle + "? Please dedicate yourself and practice even more.");
        }
    } else {
        cm.sendOk("Would you like to dabble in the power of nature? It may be a long and difficult road, but you certainly get a reward at the end, reaching the pinnacle of the art of magicians.");
    }
    
    cm.dispose();
}