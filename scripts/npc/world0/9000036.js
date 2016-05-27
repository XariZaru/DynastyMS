var status, treaty = 4031708, head = 4000017, leather = 4000021, nul = "\r\n\r\nDo you need something? I don't think I've any missions for you to do at this time. Come back later and maybe"+
        " we'll be able to find something for you.", nc = "not coded", note = 4032091, places = [104040000, 106010000, 104030000, 104020000], req = 
        [27,28,29,30], newArray, text;

function start() {
    status = -1;
    if (cm.getJobId()>0 && cm.getJobId() < 1000) {
    if (cm.getQ()==30) {
        cm.sendNext("Hello, ma'am I'm-",2);
    } else if (cm.countMonster()>0) {
        cm.sendOk("Monsters must be eliminated before speaking ...");
        cm.dispose();
    } else if (cm.getQ()==43) {
        if (cm.haveItem(1042181) || cm.haveItem(1062035) || cm.haveItem(1082079) || cm.haveItem(1102066)
    || cm.haveItem(1002605) || cm.haveItem(1702251) || cm.haveItem(1022015)) {
        cm.sendOk("Huh? What do you need?");
        cm.talkGuide("Put on your disguise, dumbo! Why'd you take it off?");
        cm.dispose();
    } else {
        cm.sendNext("#bAgent E#k, the paperwork has been processed, you can hand over any copies you have and I'll"+
            " keep them for safe record keeping at the library.",2);
    }
    } else if (cm.getQ()==42) {
        if (!cm.haveItem(treaty)) {
            cm.sendOk("Oh, you lost the treaty? Here, another copy. I've always got spares.\r\n\r\n#i"+treaty+"#");
            cm.gainItem(treaty);
            cm.dispose();
        } else {
            cm.sendOk("Do you need something else, sir?");
            cm.dispose();
        }
    } else if (cm.getQ()==41) {
        cm.sendNext("Is that really you? My god, her Majesty told me she was sending one of the #bHei qishi#k, but I didn't"+
            " think she would send one of its captains. Sir, the signing of the document is over, and here it is -- wait"+
        ", although I realize you are of a higher authority I still must request the code. It's required for all top tasks, and"+
    " even though you are here before me I'd wish to respect that code of honor.");
    } else if (cm.getQ()==34 && cm.getMapId()==105040401) {
        cm.sendNext("Hey, you, I know you. You were snooping around my men. I'll have to command retaliation in response.");
    } else if (cm.getQ()==35) {
        if (cm.countMonster() > 0) {
            cm.sendOk("You'll never get out alive!");
            cm.dispose();
        } else {
        cm.sendOk("What? This is impossible!"+
            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 10000 meso");
        cm.completeQ();
        cm.gainExp(15000);
        cm.gainMeso(10000);
        cm.talkGuide("Let's go see our agent. They're becoming more aggressive.");
        cm.dispose();
        }
    } else {
        cm.sendOk("If you could please leave that would be appreciable. If not \r\n... I'd like to talk to you in private.");
        cm.dispose();
    }
    } else if (cm.getJobId()>=1000 && cm.getJobId()<2000) {
    	if (cm.countMonster() > 0) {
    		cm.sendOk("I cannot possibly speak to you when there are monsters about! Eliminate them all!");
			cm.dispose();
    	} else if (cm.getQ()==9) {
            cm.sendNext("Yes, what do you need?");
        } else if (cm.getQ() == 32) {
            if (cm.getLevel() < 90) {
                cm.sendOk("#e#r[Level 90] : And the Onslaught Begins#n#k"+nul+"");
                cm.dispose();
            } else {
                cm.sendNext("You're looking stronger than ever. It's amazing to see you grow at such an alarming rate. Think of all the things"+
                    " you've done to help our empire grow stronger. Ever since you gave me the reports on the refugee influx, security has"+
                " nearly tripled in number. We're experiencing less monster attacks on our main immigration routes.");
            }
        } else if (cm.getQ() == 31) {
            cm.sendNext("Excellent work, it seems from your notes that you've taken quite a bit of information. What can you tell me about"+
                " the majority of the refugees' status. Are they well fed, clothed, and safe from harm? I need to know this so"+
            " I would know to bolster our security. We can't have our people under constant attack by silly things like monsters.");
        } else if (cm.getQ() < 31 && cm.getQ() >= 27) {
            newArray = new Array();
            text = "What are you still doing here? You still need to find out why the monsters are growing. Judging from your information, you"+
                    " currently need to visit the following areas #ein order#n...\r\n#b";
            for (var i = 0; i < places.length; i++) {
                if (cm.getQ() <= req[i]) {
                    newArray.push(places[i]);
                }
            }
            if (newArray.length > 0) {
                for (var i = 0; i < newArray.length; i++) {
                    text += "\r\n#m"+newArray[i]+"#";
                }
                cm.sendOk(text);
            } else {
                for (var i = 0; i < places.length; i++) {
                    text += "\r\n#m"+places[i]+"#";
                }
                cm.sendOk(text);
            }
            cm.talkGuide("Remember to visit the areas in order. It must have something to do with how recent the immigrants have arrived"), 
                    cm.dispose();
        } else if (cm.getQ() == 26) {
            if (cm.getLevel() < 70) {
                cm.sendOk("#e#r[Level 70] : Something Bigger Than Us#n#k"+nul+"");
                cm.dispose();
            } else {
                cm.sendNext("I'm glad you could make it. I'll have to brief you quickly since I'm short on time and need to meet with other"+
                    " commanding officers to discuss our next strategem.\r\n\r\nRecently, there has been a recent outbreak of monsters on the imperial"+
                " highways and no one can seem to stop them. They damage supplies, arms, and men as they advance to their destinations. I need"+
            " you to investigate why there is this outbreak. Once you found the reason why, report back to me.");
            }
        } else if (cm.getQ() == 25) {
            cm.sendNext("I've got the name, and I've told #bAgent M#k about it already so we don't have to worry about legal proceedings.", 2);
        } else if (cm.getQ() > 17 && cm.getQ() < 25) {
            cm.sendOk("You have to get that name to #bAgent M#k, hurry!");
            cm.dispose();
        } else if (cm.getQ() == 17) {
            if (cm.getLevel() < 45) {
                cm.sendOk("#e#r[Level 45] - Mission into the Water#n#k"+nul+"");
                cm.dispose();
            } else {
                cm.sendNext("How does it feel, those new powers? Doesn't it feel exhilerating when you use the new skills you've earned? Anyways"+
                    ", enough about your progress, we need to talk about what her Majesty requires. We suspect there's been treason"+
                " down in the depths of a little town named #bAqua Town#k, nearby #bOrbis#k. It's been under colonization since 950 R.E, but they've put up"+
            " quite a resilient fight.");
            }
        } else if (cm.getQ()==16) {
            if (cm.countMonster() > 0) {
                cm.sendOk("You have to eliminate the monsters to prove you are worthy of a promotion.");
                cm.dispose();
            } else {
                cm.talkGuide("Oh sweet, more powers. This will allow us to train on tougher monsters!"), cm.completeQ(), cm.changeJobById(cm.getJobId() + 10), cm.warp(cm.getPlayer().getSavedLocation("FREE_MARKET")), 
                cm.sendOk("That was a very well done job. You've been blessed with new powers. Congratulations. I have taken you back to your original position.");  
                cm.dispose();
            }
        } else if (cm.getQ() < 15 && cm.getQ() > 11) {
            lost = 15 - cm.getQ(), need = lost - cm.itemQuantity(note);
            if (cm.itemQuantity(note) < lost) {
                cm.gainItem(note, need);
                cm.sendOk("Try not to lose anymore of these notes. They're quite important.\r\n\r\n#eItem(s) obtained!#n\r\n#b"+need+"#k"+
                        " #i"+note+"#");
                cm.dispose();
            } else {
                cm.sendOk("This is all I have to say:\r\n\r\n#b#eEaglesong\r\nWhite Dove\r\nKnights of the Table#k#n\r\n\r\nGet these notes to"+
                    " Ervine, Matthias, and Mr. Pickall, whom are in Kerning City.");
                cm.dispose();
            }
        } else if (cm.getQ() == 15) {
            if (cm.getLevel() < 30) {
                cm.sendOk("#r#e[Level 30] : Promotions#n#k"+nul+"");
                cm.dispose();
            } else if (cm.getMapId() != 100000204){
                cm.sendNext("I know you've been here for a brief time, but I can see the potential that is teeming in your spirit. You're deserving"+
                    " of a promotion, however, I do believe you have to undergo our traditional tests of worthiness.");
            } else {
				cm.warp(100000000);
				cm.dispose();
			}
        } else if (cm.getQ()==11) {
            if (cm.getLevel() < 20) {
                cm.sendOk("#r#e[Level 20] : Communications#n#k"+nul+"");
                cm.dispose();
            } else {
                cm.sendNext("Great work last time, thinning down the monsters, but we've got bigger issues on our hand. The Knights"+
                    " of Cygnus are constantly at war with the vile scum, the #bExplorer Tribe#k. Our war has been waging on for"+
                " centuries, with lives and land being lost for queen and country. Without the braves knights, our lands would be"+
            " in utter turmoil.");
            }
        } else if (cm.getQ()==10) {
            if (!cm.haveItem(head, 2) || !cm.haveItem(leather, 10)) {
                cm.sendOk("Why are you still standing here? Go and kill those monsters so we'll have an easier time"+
                        " moving our troops for supplies and support."+
                        "\r\n\r\n"+("#B"+(cm.itemQuantity(head)/2 * 100))+"#  "+(cm.itemQuantity(head)/2 * 100
        )+"% #i"+head+"# collected\r\n\r\n"+("#B"+(cm.itemQuantity(leather)/10 * 100))+"#  "+(cm.itemQuantity(leather)/10 * 100
        )+"% #i"+leather+"# collected");
            } else {
                cm.sendOk("This should serve as a nice reward for your efforts ..."+
                    "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1500 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 2500 meso");
            cm.gainExp(1500), cm.gainMeso(2500), cm.completeQ(), cm.gainItem(leather,-10), cm.gainItem(head, -10), cm.dispose();
            }
        } else {
            cm.sendOk("Stand properly when I talk to you, otherwise you lack form and discipline.");
            cm.dispose();
        }
    } else {
        cm.sendOk("Do you need something?");
        cm.dispose();
        }
    }


function action(mode, type, selection) {
    (mode == 1 ? status++ : mode == -1 ? (cm.dispose(), status = -10) : status--);
    if (status == 0) {
        if (cm.getJobId()<1000) {
       if (cm.getQ()==34 && cm.getMapId()==105040401) {
           cm.sendNext("#b\"Command retaliation\"#k? What the heck is that even supposed to mean? You mean you're going to take action against me?", 2);
       } else if (cm.getQ()==43) {
           cm.sendNext("Really? I've never heard of record keeping ...");
        } else if (cm.getQ()==41) {
            cm.sendSimple("Of course, you know it. It's quite simple: just the extent of our power.\r\n\r\n#b#L0#Misty Shadows\r\n"+
                "#L1#Shadow Mountain\r\n#L2#Damp Fog\r\n#L3#Shadow Isle\r\n#L4#Eternal Flame");
        } else {
            cm.sendOk("Get out of my face. I don't speak to people like you. Especially the fishy ones.");
            cm.completeQ();
            cm.talkGuide("Oh, she's a hard one. I guess we've sucked out all the information we can receive."+
                " Let's go talk to our Agent.");
            cm.dispose();
        }
        } else {
            if (cm.getQ()==9) {
                cm.sendNext("I was sent here by a man named #bPerzen#k, down at the #bAltaire Encampment#k where he trained me. He"+
                    " said for me to find you and I would be assigned some sort of task. Do you happen to have anything for me"+
                " to do?",2);
            } else if (cm.getQ() == 32) {
                cm.sendNext("That's fantastic news, yet you still look very grim. Is there something bothering you, commander?",2);
            } else if (cm.getQ()==31) {
                cm.sendNext("Most of the refugees come from war-stricken areas. They are badly damaged, demoralized, and unhappy. Many"+
                    " suffer from raids and the people I have talked to noted the monsters. They seemed quite shaken by them, as if the"+
                " monster threat is growing too ominous. I suppose we should reckon with these forces. They happen to be harrassing Explorer"+
            " supply convoys as well.",2);
            } else if (cm.getQ()==26) {
                cm.sendAcceptDecline("You can travel to the surrounding roads of #bHenesys#k and talk to any refugee. They are poor beaten souls"+
                    " from the ongoing war and will have encountered such fiends.");
            } else if (cm.getQ() == 25) {
                cm.sendGetText("Great, what's his name? I'll have to write it down in my copy of the records for treason.\r\n\r\n#eCapitalize the"+
                    " first letter in all names.#n");
            } else if (cm.getQ()==17) {
                cm.sendAcceptDecline("I'll need you to go down there and talk to each and every person. Find out who's the traitor and bring me their name."+
                    " After you are done, you're to tell #bAgent M#k of this as well.\r\n\r\n#bTell Agent M, and then me.#k By law he is required"+
                " to have knowledge of treason before I do. If this law collapses, then certain judiciary steps have to be taken in order for our"+
            " military to remain in structure.");
            } else if (cm.getQ()==15) {
                cm.sendAcceptDecline("I'll take you to a room where we keep a group of monsters. If you can defeat them, then we'll recognize your"+
                    " combat prowess and endow upon you the powers of the promoted ones. Are you sure you can do this?");
            } else if (cm.getQ()==11) {
                cm.sendNext("Throughout history we have been plagued by the existence of the rebel #bexplorers#k. They separated"+
                    " from our kingdom, corrupted by the cunning words of #bTaeng the Emperor#k. His descendent, #bTaeng the Explorer#k"+
                " continues his legacy.");
        }
        }
    } else if (status == 1) {
        if (cm.getJobId()<1000) {
        if (cm.getQ()==41) {
            if (selection != 1) {
                cm.sendOk("Excuse me, what did you say?");
                cm.talkGuide("Wrong answer! C'mon, we rehearsed this with our agent!", 2);
                cm.spawn(9400739,1,62,109), cm.spawn(9400739,2,-164,-205);
                cm.dispose();
            } else {
                cm.sendOk("Here's the document. Please don't lose this ... I actually have more copies if you lose it.\r\n\r\n#i"+treaty+"#");
                cm.gainItem(treaty);
                cm.talkGuide("Let's go to the Agent.");
                cm.completeQ();
                cm.dispose();
            }
        } else if (cm.getQ()==43) {
            cm.sendNext("I made it a requirement, now hand over any documents you have. Afterwards, you are"+
                " released from this duty and able to continue with any other task assigned to you by your"+
            " commanding officer, understood?", 2);
        } else {
            cm.sendNext("You haven't been versed in military terms, have you? Well, yes, you are correct. Perhaps retaliation is the best option."+
                " This will be your last night. Say your prayers.");
        }
        } else {
            if (cm.getQ()==9) {
                cm.sendAcceptDecline("Nothing too big, actually. I have all of my most adept agents working on my tasks. You can, however, take"+
                    " care of the large monster infestation that is growing outside of our doorstep. If you could bring me back:"+
                "\r\n\r\n2 #i"+head+"#\r\n10 #i"+leather+"#\r\n\r\nThat would be splendid. What do you say? It's a fairly simple task.");
            } else if (cm.getQ()==32) {
                cm.sendNext("Actually, there is. Although the monster situation regarding immigration is under our control, apparently the"+
                    " monsters seem to sense this and have redirected their attacks elsewhere. It would seem that their focus are pin-pointed"+
                " on bordering towns of our empire. #bEl Nath and Aquarium#k have been under siege by the monsters, dampering their supplies"+
            " and munitions. If we don't act immediately, we may have to suffer major repercussions.");
            } else if (cm.getQ() == 31) {
                cm.sendGetNumber("Is that so? Even the Explorers deal with this upcoming plague. Tell me, #b#h ##k, what would you rate this"+
                    " threat to be on a scale of 1-10, trivial to catastrophic. I need to fathom what you are presenting before me. Give me"+
                " a number, quick, for there may be more important matters than the explorer tribe growing at hand.",1,1,10);
            } else if (cm.getQ() == 26) {
                text = "Great, you'll have to mark these maps down somewhere. Keep a log. Go to these areas in order. They are nearby Henesys"+
                    ".\r\n";
                for (var i = 0; i < places.length; i ++) {
                    text += "\r\n#b#m"+places[i]+"#";
                }
                cm.sendOk(text), cm.completeQ(), cm.talkGuide("She said we had to go to our areas in order ... let's not forget that"), 
                        cm.dispose();
            } else if (cm.getQ() == 25) {
                if (cm.getText() != "Gerrard") {
                    cm.sendOk("Are you sure that name is correct? You didn't give #bAgent M#k the name of a wrong person, did you? I don't have a copy"+
                        " of that person's name anywhere on this list.");
                cm.dispose();
                } else {
                    cm.sendOk("Brilliant, that should take care of all matters. Good work down there."+
                        "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 35000 meso");
                    cm.gainMeso(35000), cm.gainExp(35000), cm.completeQ(), cm.talkGuide("Brilliant! It feels good to do official work for"+
                            " our commander."), cm.dispose();
                }
            } else if (cm.getQ()==17) {
                cm.sendOk("Good, now get me a name. Don't come back until you've gotten it and told #bAgent M#k.");
                cm.completeQ(), cm.talkGuide("Aqua town goes by another name, Aquarium, and it lies nearby Orbis at the base of its tower."), cm.dispose();
            } else if (cm.getQ()==15) {
            	if (cm.getPlayerCount(100000204) > 0) {
            		cm.sendOk("This map is not free right now. Please change channels or try again later.");
            		cm.dispose();
            	} else {
	                cm.resetMap(100000204), cm.getPlayer().saveLocation("FREE_MARKET"), cm.warp(100000204);
	                cm.spawnDiff(100000204, 9400740, 3, 66, 161), cm.getPlayer().setQuesting(true, 3), cm.dispose();
            	}
            } else if (cm.getQ()==11) {
                cm.sendAcceptDecline("Onto the main point, I need you to communicate certain important messages to our base in #bKerning City#k"+
                    " It's a suburban area, quite crude, but very decent in terms of military innovation. I'll need you to send a message to"+
                " people named: #e#bErvine, Matthias, and Mr. Pickall#k#n\r\n\r\nThey work as primary suppliers in men, arms, and supplies. I'll"+
            " give you three messages, one for each. They'll know which note to pick up. It's a fairly simple task.");
            }
        }
    } else if (status == 2) {
       if (cm.getJobId()<1000) {
        if (cm.getQ()==43) {
            rand = Math.floor(Math.random() * 100);
            cm.sendOk("Oh, well, all right. Here are the extra copies.\r\n\r\n#eGained item!#n\r\n"+rand+"#i"+treaty+"#");
            cm.gainItem(treaty,rand);
            cm.completeQ();
            cm.dispose();
        } else {
        cm.sendOk("Agents! We need to take care of this #bexplorer#k scum. I'm tired of dealing with peasantry such as you. It's time"+
            " I made our infiltration public. Attack!");
        }
        } else {
            if (cm.getQ()==9) {
                cm.sendOk("Bring me back 10 #i"+head+"# and 10 #i"+leather+"# as proof of completion. The monster waves should be thinned down by"+
                    " your efforts.");
            cm.talkGuide("The surrounding areas near Henesys should contain the monsters we need to fight. If we take the portals to the left and right"+
                " we'll be able to complete our mission with ease. What are you waiting for?"), cm.completeQ(), cm.dispose();
            } else if (cm.getQ()==32) {
                cm.sendAcceptDecline("I need you to head to #bAquarium#k as soon as possible and talk to #bDolphin#k. He should fill you in on"+
                    " all of the details. Oh, and ... well done with the treaty. We'd been experiencing many financial shortages because of"+
                " #bAquarium#k, and now that an agreement has been settled, the financial burden is alleviating itself.");
            } else if (cm.getQ()==31) {
                if (selection < 4) {
                    cm.talkGuide("You can't be serious! Did you not see the refugees at those camps? They're dying out there, it can't be a "+selection+"."), cm.dispose();
                } else {
                    cm.sendNextPrev((selection > 3 && selection < 6 ? "That's enough danger to the people for me to send some of my own men to"+
                        " protect our people. We cannot afford for our own population to be under attack by something simple as this. It is"+
                    " ridiculous to think that we cannot deal with internal affairs such as this. We'll prepare the men at once and disperse"+
                " them to various refugee camps. I'll contact #bAgent M#k to notify him of the increased security to incoming refugees." : ""+
            "My god, is the threat really that large? We must contact #bAgent M#k right away and request men to send to the refugee camps. As"+
        " for now I'll have to command some of my personal platoon to watch over key points in our empire. We cannot allow such a threat to"+
    " continue to loom. Until we deal with this menace, I will not sleep peacefully. For every innocent life taken by these #emonsters#n I will"+
" fight back with a vigor ten-fold and deliver swift retribution."));
                }
            } else if (cm.getQ()==11) {
                cm.sendOk("Good. You have to remember 3 code words. Jot them down or something because they are key to getting the others to"+
                    " trust in what you have to say.#e\r\n\r\n#bEaglesong\r\nWhite Dove\r\nKnights of the Table#k");
            cm.gainItem(note, 3), cm.completeQ(), cm.dispose();
            }
        }
    } else if (status == 3) {
        if (cm.getJobId() < 1000) {
            cm.spawn(9400739, 2, 248, 158);
            cm.talkGuide("I suppose we'll have to talk with Agent E after we deal with these buffoons!");
            cm.completeQ();
            cm.dispose();
        } else if (cm.getJobId() >= 1000 && cm.getJobId() < 2000) {
            if (cm.getQ()==32) {
                cm.talkGuide("Agent E told us to meet with Dolphin once again to discuss the damages to supplies and munitions. We have to"+
                    " go to Aquarium as soon as possible!"), cm.completeQ(), cm.dispose();
            } else {
            cm.sendOk("As for you, I give you a solemn order that you must prepare yourself for the days that come ahead. Train, fight, do"+
                " whatever you must to prepare yourself for the tedious tasks you must undertake. Tenacity must rule in your mind, and"+
            " vigor in your heart. Do not rest for we have many innocent lives at stake here."), cm.changeJobById(cm.getJobId()+1),cm.completeQ(), cm.dispose();
            }
        }
    }
}