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
	thief Job Advancement
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
        else if(currJob == 400)
            secondJob(mode, type, selection);
        else if(cm.isQuestStarted(7500))
            thirdJob(mode, type, selection);
        else
            other(mode, type, selection);
    }
}

function getNumberOfFreeSlots(invType) {
	var type = Packages.client.inventory.MapleInventoryType.getByType(invType);
	if(type == null) return 0;
	
	return cm.getPlayer().getInventory(type).getNumFreeSlot();
}

function firstJob(mode, type, selection) {
    if(status == 0 && mode == 1) {
        cm.sendNext("Do you want to become a Thief? You will need to meet certain criteria. We can't accept just ANYONE to become a thief. You should be at least level 10. Let's see..");
    } else if(status == 0 && mode == 0) { // Used when pressing no on status 1.
        cm.sendOk("Need more time to think about it? Feel free. It's not something you should take lightly anyway. Come talk to me when you're ready to make your decision.");
        cm.dispose();
    } else if(status == 1) {
        if(cm.getLevel() >= 10) {
            cm.sendYesNo("Ah! You look like someone who could be one of us, all you need is an evil mind and...  yes, yes. So, have you made a decision? Do you want to be a thief?");
        } else {
            cm.sendOk("Well, your only a beginner. I don't think you're ready to be with us yet. Become stronger and then come look for me.");
            cm.dispose();
        }
    } else if(status == 2) {
        if(getNumberOfFreeSlots(1) >= 2  && getNumberOfFreeSlots(2) >= 3) {
            if(cm.getJobId() == 0) {
                cm.changeJobById(400);
                cm.gainItem(1472061, 1);
                cm.gainItem(1332063, 1);
                cm.gainItem(2070015, 1000);
                cm.gainItem(2070015, 1000);
                cm.gainItem(2070015, 1000);
                cm.resetStats();
            }
            cm.sendNext("Okay, from now on, you are one of us! You will live like a nomad at first, but be patient and you will soon be leading the good life. I know, it's not much but I will give you some skills.");
        } else {
            cm.sendOk("Humm. Make sure you have at least some space empty in your Equip and USE windows. I would like to give you a weapon as a reward for becoming a thief.");
            cm.dispose();
        }
    } else if(status == 3) {
        cm.sendNext("I have given you additional inventory slots, an entire row to be exact. I have also given you a little bit of #bSP#k. When you open up the #bskills menu#k in the lower left corner of your screen you can see the skills that you can learn by using SP. A warning though, you can't learn them all, and there are skills that will only become available after you learn other skills first.");
    } else if(status == 4) {
        cm.sendNextPrev("One more warning. After choosing your class, try to stay alive as long as possible. If you die, you will lose a good portion of your experience. You don't want to lose all of that hard work, do you? That's all I can teach you... From now on, you will have to work hard to become stronger. Come see me when you find yourself more powerful than you are now and need more advice.");
    } else if(status == 5) {
        cm.sendNextPrev("That's all I can teach you for now. Go out into the world, train, and become even stronger. Come back to me when you think you've done everything you can and need some more help. I'll be waiting for you here.");
    } else if(status == 6) {
        cm.sendPrev("Oh, and if you have any questions about being an thief, please just ask. I don't know everything to tell you the truth, but I can teach you some of what I know.");
    } else {
        cm.dispose();
    }
}

function secondJob(mode, type, selection) {
    if(cm.getLevel() >= 30) {
        if(cm.haveItem(4031011)) {
            // They have the letter of introduction, they need to clear the next step.
            cm.sendOk("You can't find the instructor, right? Find the #b#p1072003##k who is in #k#m102040000##k which is near #m103000000#. Give him this letter, and he will tell you what to do.");
            cm.dispose();
        } else if(cm.haveItem(4031012) || cm.getJobId() != currJob) {
            // Process the job advancement.
            secondJobAdvancement(mode, type, selection);
        } else {
            if(status == 0) {
                cm.sendYesNo("You have grown a lot since the last time I saw you. I don't see the weak being that you were before anymore. In fact, your much more like a true thief now. Well, would you like to become even more powerful? You just need to complete a simple test for me. Are you ready?");
            } else if(status == -1) {
                cm.sendOk("Are you sure? Becoming stronger quickly will help you a lot on your journey. If you change your mind in the future, you can come back here whenever you want. Remember that I will make you much more powerful than you already are.");
                cm.dispose();
            } else if(status == 1) {
                cm.sendNext("Good decision. You look strong, but I need to know for sure that you are strong enough by passing this test. It's not a difficult test, you should be fine. Take this letter for me.");
            } else if(status == 2) {
                if(cm.canHold(4031011)) {
                    cm.sendOk("Take this letter to #b#p1072003##k who is in #b#m102040000##k near #m103000000#. He is replacing me as an instructor for now. Give him the letter and he will proctor the test for me. I wish you luck.");
                    cm.gainItem(4031011);
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
            cm.sendSimple("Do you have any questions about the life of an thief?\r\n#b#L0#What are the basic features of an thief?#l\r\n#L1#What types of weapons do thiefs use?#l\r\n#L2#What types of armor do thiefs wear?#l\r\n#L3#What kind of skills do thiefs use?#l");
        } else if(status == 1) {
            if(mode == 1) {
                select = selection;
            }
            if(select == 0) { // What are the characteristics of a warrior?
                cm.sendNextPrev("Being an thief isn't a simple task. thiefs have a reasonable amount of damage and strength. For an thief, their most important attribute is DEX. The only downside is that thiefs don't have much defense, so try to avoid getting hit if possible.");
            } else if(select == 1) { // What types of weapons do warriors use?
                cm.sendNextPrev("I'll explain more about the weapons of the thief. Instead of using weapons to directly hit a monster, thiefs use ranged weapons like bows and crossbows to kill monsters. Both have their advantages and disadvantages.");
            } else if(select == 2) {
                cm.sendNextPrev("I'll explain more about the armor of an thief. thiefs need to move quickly, therefore it not do any good to use heavy armor. Clothes with long and troublesome cords are out of the question.");
            } else if(select == 3) {
                cm.sendNextPrev("The skills available to thiefs are ones that use the thiefs high precision and dexterity. It's essential that thiefs acquire skills that allow them to attack the enemyt with precision.");
            }
        } else if(status == 2) {
            if(select == 0) {
                cm.sendPrev("An thief's main advantage is that you can attack from afar, avoiding melee combat with monsters. Moreover, with an thiefs high avoid ability you will also avoid many melee attacks as well. The higher DEX you have, the more damage you will deal to the monster.");
            } else if(select == 1) {
                cm.sendNextPrev("The bows are not as powerful as crossbows, but are much faster in attack speed. The crossbows in turn are more powerful and less rapid. It will be difficult to make a decision.");
            } else if(select == 2) {
                cm.sendPrev("If you use the big and bulky armor of warriors, you will soon be surrounded by enemies. Pick out some simple and comfortable armor that suits you and fulfills it's function. It will help you a lot while you are hunting monsters.");
            } else if(select == 3) {
                cm.sendNextPrev("There are two main attack skills available to thiefs. #b#q3001004##k and #b#q3001005##k. #q3001004# is a good, simple skill that allows you to cause a lot of damage on the enemy while using very little MP.");
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
        cm.sendNext("Heh, I knew you would pass the test. I admit, you are a great thief. I will help make you even stronger than you are now. But before that, you will have to choose one of two paths that I will offer you. It will be a difficult decision, but feel free to ask questions.");
    } else if(status == 1) {
        cm.sendSimple("Okay, when you are ready to make your decision, click [I want to choose my class!] at the bottom.\r\n#b#L0#Explain to me the role of the Assassin#l\r\n#L1#Explain to me the role of the Bandit#l\r\n#L2#I want to choose my class!#l");
    } else if (status == 2 && mode == 0 && select == 3) { // Only do this if they hit no for job advancement.
        cm.sendOk("So, do you need to think a little more? There's no rush. It's not a decision to take lightly anyways. Let me know when you make your decision.");
        cm.dispose();
    } else if(status == 2) {
        if(mode == 1) {
            select = selection;
        }
        
        if(select == 0) {
            cm.sendNextPrev("Okay, here's what being a bandit is all about. Assassins have abilities such as #q4101003# and #q4100001# that allows you to enhance your fighting abilities by giving you superb attack speed and an eye to hit enemies in critical locations. There an ability called #q4101004# that allows assassins to boost their agility for a good amount of time, allowing you to outmaneuver your foes.");
        } else if(select == 1) {
            cm.sendNextPrev("Okay, here's what being a bandit is all about. For a bandit, skills such as #q4200000# and #q4201002# are available to boost your combat prowess. There an ability called #q4201003# that allows bandits to boost their agility for a good amount of time, allowing you to outmaneuver your foes.");
        } else if(select == 2) {
            cm.sendSimple("Well, have you decided? Choose the second advancement of the class you would like to become.\r\n#b#L0#Asassin#l\r\n#L1#Bandit#l");
        }
    } else if(status == 3) {
        if(select == 0) {
            cm.sendNextPrev("Next, I will explain the bandit ability #b#q4101005##k. This allows you to absorb some of the damage you've done toward enemies as health, which is extremely useful in prolonged engagements where situations force you into desperate times.");
        } else if(select == 1) {
            cm.sendNextPrev("Okay, one of the skills that a bandit can have is #b#q4201004##k. No one is as sneaky as the bandit. With this skill you can swipe goods from unsuspecting foes, making you rich in the process without having to actually loot them! A bandit's life is truly one with many riches.");
        } else if(select == 2) {
            jobSelect = selection;
            cm.sendYesNo("So you want to make the second job advancement as a #b" + (jobSelect == 0 ? "assassin" : "bandit") + "#k? After making your decision, you can't go back and choose another career path. Do you still want to make the advancement?");
        }
    } else if(status == 4) {
        if(select == 0) {
            cm.sendNextPrev("Truly, as you can see, the assassin is meant for sneaky attacks that land extremely powerful hits on unsuspecting enemies!");
        } else if(select == 1) {
            cm.sendNextPrev("Next is the bandit attack ability, #b#q4201005##k. This is the bandit's primary offensive move, allowing you to attack with great ferocity numerous times. Enemies will never see this move coming as you shower them with an endless barrage of blows!");
        } else if(select == 2) {
            // Check to make sure they spent their SP.
            var reqSP = (cm.getLevel() - 30) * 3;
            if(cm.getPlayer().getRemainingSp() > reqSP && cm.getJobId() == currJob) {
                cm.sendOk("Hmmm... You have extra #bSP#k. You can't advance to your second job with saved SP from your first job. Use more SP on first job skills and come talk to me later.");
                cm.dispose();
                return;
            }
            
            if(cm.getJobId() == 400) {
                cm.gainItem(4031012, -1);
                cm.changeJobById(jobSelect == 0 ? 410 : 420);
            }
            
            var sendText = "Very well, You have now become a #b" + (jobSelect == 0 ? "assassin" : "bandit") + "#k!";
            sendText += " bandits are a smart bunch with incredible vision, able to put an arrow into the heart of a monster with ease. You will have to train every day though. I will also help you become stronger than you already are.";
                        
            cm.sendNext(sendText);
        }
    } else if(status == 5) {
        if(select < 2) {
            status = 1;
            secondJobAdvancement(mode, type, action);
        } else {
            var jobTitle = jobSelect == 0 ? "assassin" : "bandit";
            cm.sendNextPrev("I gave you a book that contains the list of skills you can acquire as a " + jobTitle + ". In this book you will find a number of skills that the " + jobTitle + " can learn. Your inventories were also expanded with a new row of available slots, and I also gave you a boost in MP.");
        }
    } else if(status == 6) {
        cm.sendNextPrev("I gave you some #bSP#k. Open up your #bskills#k window to improve your newly acquired skills. One warning though, you can't learn every skill, and some are only available after you learn other skills. Don't forget that.");
    } else if(status == 7) {
        var sendText = "";
        
        sendText += jobSelect == 0 ? "Assassins" : "Bandits";
        sendText += " have to be strong. But remember that you can't abuse your new power and use it against weaker beings. Use your power in the right way. Because using it in the right way is much more difficult than just getting stronger."
        cm.sendPrev(sendText);
    } else {
        cm.dispose();
    }
}

function thirdJob(mode, type, selection) {
    var info = cm.getQuestProgress(7500);
    if(status == 0) {
        if(info == "s" && (cm.getJobId() == 410 || cm.getJobId() == 420)) {
            cm.updateQuest(7500, "p1");
            cm.sendNext("I was waiting for you. A few days ago, #bArec#k from Ossyria told me about you. I see you're interested in visiting the shadowy world of the third job advancement for thieves. To achieve this goal, I will have to test your strength. There is a crack in the middle of a deep swamp on Victoria Island that will take you to a secret place. Once you're inside, you will find my clone. Defeat them and bring me the #b#t4031059##k.");
        } else if(info == "p1") {
            if(cm.haveItem(4031059)) {
                cm.sendOk("Wow, you beat my clone and brought the #b#t4031059##k to me. Very good! This certainly proves your strength. In terms of strength, you are ready to advance to the next level of your class. As promised, I will give the #b#t4031057##k to you. Give this necklace to #bRene#k in Ossyria and you may take the second test for the advancement. Good luck!");
                cm.gainItem(4031059, -1);
                cm.gainItem(4031057, 1);
                cm.updateQuest(7500, "p2");
            } else {
                cm.sendOk("There is a crack in the middle of a deep swamp on Victoria Island that will take you to a secret place. Inside, you will face my clone. Your task is to defeat him and bring the #b#t4031059##k back with you.");
            }
            cm.dispose();
        } else if(info == "p2") {
            if(!cm.haveItem(4031057)) {
                cm.sendOk("Ahh! You lost #b#t4031057##k, huh? I said you should be careful. For goodness sake, I'll give you another... AGAIN. Please be careful this time. Without it, you can't take the next test for your advancement.");
            } else {
                cm.sendOk("Give this necklace to #bArec#k in Ossyria to take the second test of your advancement. Good Luck!");
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
    if(cm.getJobId() > 400 && cm.getJobId() < 500) {
        var jobTitle = "";
        if(cm.getJobId() == 410)
            jobTitle = "Assassin";
        else if(cm.getJobId() == 411)
            jobTitle = "Hermit";
        else if(cm.getJobId() == 412)
            jobTitle = "Night Lord";
        else if(cm.getJobId() == 420)
            jobTitle = "Bandit";
        else if(cm.getJobId() == 421)
            jobTitle = "Chief Bandit";
        else if(cm.getJobId() == 422)
            jobTitle = "Shadower";
            
            
        if(cm.getJobId() % 10 == 0) {
            cm.sendOk("Is that really you? How's the life of a " + jobTitle + "? It looks like you've grown a lot! Continue striving to succeed!");
        } else if(cm.getJobId() % 10 == 1) {
            cm.sendOk("Oh, it's you. you must have passed the test and become a " + jobTitle + "! I knew you could! I can see greatness in you.");
        } else {
            cm.sendOk("Ahhh... You finally became a #b" + jobTitle + "#k. I knew you would not disappoint me. So what do you think of life as a " + jobTitle + "? Please dedicate yourself and practice even more.");
        }
    } else {
        cm.sendOk("Training and becoming stronger is good and fun, but don't you want to live live to the fullest? How about becoming a thief like us and REALLY live life. Sounds like a good idea, doesn't it?");
    }
    
    cm.dispose();
}