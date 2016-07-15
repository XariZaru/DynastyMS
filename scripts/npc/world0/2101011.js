/*DynastyMS Custom NP by Thane Krios
 * Sejan
 * The Town of Ariant
 */

var status;
var train = 920030001;
var bottom = 596;
var height = 83;
var pole = 1442000;
var maps = 1;
var training = [1010100, 1010200, 1010300, 1010400];

function finish() {
  cm.sendOk("You have to kill all the monsters before we can continue!");
  cm.dispose();
}

function createMob(id,x,y,exp,hp,level,amount) {
    if (x == null) {
        x = bottom;
    }
    if (y == null) {
        y = height;
    }
    for (var i = 0; i < amount; i++) {
        cm.createMob(id,x,y,exp,hp,level);
    }
}

function start() {
    var count = cm.countMonster();
    status = -1;
//	if (!cm.getPlayer().isGM()) {
//		cm.sendOk("This job is under construction. In order to view this you must be a SuperGM. Please play a KoC or Explorer."), cm.dispose();
//        } else 
            if (count > 0) {
                cm.sendOk("Kill all monsters before speaking to me!");
                cm.dispose();     
            } else if (cm.getJobId()>=2000 && cm.getJobId()<=2999) {
                cm.sendSimple("What do you wish to do?#b\r\n#L1#Talk With Sejan"+((cm.getMapId()>=train && cm.getMapId()<= (train+maps)) && cm.getQ()>= 29 ? "\r\n#L3#Leave the Hideout (To #m"+cm.getPlayer().getSavedLocation("WORLDTOUR")+"#)" : "")+"\r\n#b#L0#End Conversation\r\n");
            } else {
                cm.sendOk("The dark and the light coexist.");
                cm.dispose();
            }
    }

function action(mode, type, selection) {
    var count = cm.countMonster();
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (selection == 0) {
            cm.dispose();
        } else if (selection == 3) {
            map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            cm.warp(map);
        } else {
            if (cm.getJobId()>=2000 && cm.getJobId()<=2999 && cm.getMapId()==200000000 && cm.getQ() >= 12) {
                     cm.sendYesNo("Do you wish to return to our training map?");
            } else if (cm.getJobId()==2000) {
                if (cm.getQ()==0) {
                    cm.sendNext("Ah, it's good to see you, #b#h ##k. Have you found anything worth palming from these"+
                        " greedy merchants? You know how greedy they are, keeping the goods all for themselves. What"+
                    " do they expect us to do? Sit on the side lines and rot in the burning desert?\r\n\r\n"+
                "#b#L0#No, I haven't found anything worth taking, but I will soon find some. I'll have the food"+
            " before nightfall.");
                } else if (cm.getQ()==16) {
                	if (cm.getLevel() >= 10)
                		cm.sendNext("You are quite the strong man, aren't you? I believe we can get far with skills such as yours. Here, this is a little of what I know myself. It's not much, I'll be honest, but it should most definitely help with your training.");
                	else {
                		var text = "Hmm, you don't seem strong enough for these new powers. How about you train at these select maps for a little until you hit #elevel 10#n?\r\n#b";
                		for (var x = 0; x < training.length; x++)
                			text += "#L" + x + "##m" + training[x] + "#\r\n";
                		cm.sendSimple(text);
                	}
                } else if (cm.getQ()==15) {
                    if (count > 0) {
                        finish();
                    } else {
                        cm.sendOk("That was a very good display of your potential prowess. Excellent work of your skills, although they can be refurbished."+sQuest(500,2000)+"");
                        cm.dispose();
                    }
                } else if (cm.getQ()==14) {
                    cm.sendAcceptDecline("You went up against very easy enemies. I'm sure you'll have more difficulties with what I'm about to send against you. Are you ready for this?");
                } else if (cm.getQ()==13) {
                    if (count > 0) {
                       finish();
                    } else {
                        cm.sendOk("Haha! That was very well done! I've yet to see such a warrior prove himself on a field of battle like that; however, those animals are paltry. They are weak! You'll simply have to kill some more before I am positively sure of your prowess. Let me find you something bigger to kill, yes?"+sQuest(200,1000)+"");
                    }
                } else if (cm.getQ()==12) {
                    cm.sendYesNo("Very good! First order of business is to get you to level 10 as fast as possible. From there we can begin to use your wily ways to extort and coerce others to accept our somewhat imbalanced propositions. But hey, that is the life of a poor man, is it not?");
                } else if (cm.getQ()==11) {
                    cm.sendNext("That was a terribly close call. It's a good thing we left Ariant, though. I had a feeling something was bound to happen anyway. The better the sooner, eh?");
                } else if (cm.getQ()==10) {
                    if (cm.getMapId()!=200000000) {
                        cm.sendOk("What are you still doing here? Leave this place before they kill you!");
                        cm.talkGuide("Sejan wants us to leave this place and head to Orbis. We should heed his advice and leave as soon as possible.");
                        cm.dispose();
                    } else {
                        cm.sendOk("It's good to see you here in one piece."+sQuest(100,2000)+"");
                        cm.dispose();
                    }
                } else if (cm.getQ()==9) {
                    cm.sendNext("Sejan! The guards! They're everywhere! They caught us as we were leaving the throne room ... I'm not sure if they're still coming after us. We have to leave right away, otherwise it'll be our heads on their pikes. Please, we have to leave right now!",2);
            } else if (cm.getQ() < 3 && cm.getQ() >= 1) {
                cm.sendOk("Have you gotten the supplies we may need for tonight? The whole group is counting on your contribution as well.");
                cm.dispose();
            } else if (cm.getQ() == 4) {
                cm.sendNext("Have you ever heard of the royal palace in Ariant? There are supposed to be layers and layers of gold and jewels,"+
                    " mounted as high as the eye can see. They say the castle shimmers like a bright Arabian diamond, yet is only a reflection"+
                " of the treasures that lay hidden beneath its stone walls. Mountains, oceans, valleys of gold and rubies and emeralds that stretch"+
            " the expanse of a thousand Caliphate lands; and the rubies, oh ... the rubies, like deep limpid pools of desire, yet at the same time so rich and dark like"+
        " the color of blood, so beautiful.\r\n\r\n#eAnd food!#n Oh, #h #, just imagine the food. The Caliphate eats an amount that a poor man"+
        " could never hope of eating in a hundred years. Chicken, shrimp, fish, honey-bread, spices from all across the country. #h #, if"+
        " only you can see the image I see in my mind. It is beautiful!");
            } else if (cm.getQ()==5) {
                if (cm.getMapId()!=260000300) {
                    cm.sendOk("Meet me at #m260000300# so I can hand you the assignment. I have a few things to take care of here.");
                    cm.dispose();
                } else {
                    cm.sendNext("Glad you could make it ... the castle is just ahead, the entrance held by a single guard. You can definitely"+
                        " infiltrate the room and steal something of value.");
                }
            } else if (cm.getQ()==6) {
                cm.sendOk("Do you have the goods yet? Well, then hurry up!"), cm.dispose();
            } else if (cm.getQ()==3) {
                cm.sendNext("Fantastic, that seems to be good. Keep the things you have stolen; I merely wanted to test how well you've progressed"+
                    " since you first joined our group.");
	        } else {
	            cm.sendOk("The light and dark coexist ...");
	            cm.dispose();
	        }   
	        } else if (cm.getJobId()==2100) {
	        	cm.openNpc(cm.getNpc(), "aran_first_job");
	        }
        }
    } else if (status == 1) {
        if (cm.getJobId()>=2000 && cm.getJobId()<=2999 && cm.getMapId()==200000000 && cm.getQ() > 13) {
            if (cm.getPlayerCount(train) == 0) {
                cm.getPlayer().saveLocation("FREE_MARKET");
                cm.warp(train);
            } else {
	            cm.sendOk("There is currently a person in the training map. Please change channels or try again at another time.");
            }
            cm.dispose();
        } else if (cm.getJobId()==2000) {
        if (cm.getQ()==0) {
            cm.sendNext("Then do so, for the group relies on all of our contributions. If one fails to"+
                " perform his or her duty, we all suffer as a consequence. Look around town; perhaps"+
            " there are still things worth looking for.");
        } else if (cm.getQ()==16) {
        	if (cm.getLevel() < 10) {
        		cm.getPlayer().saveLocation("FREE_MARKET");
        		cm.warp(training[selection], 0);        		
        	} else {
	            cm.sendOk("Like I said: it's not much, but you can build on what I know. I like to think of myself as a man who takes opportunities at not only face value, but the values that are tacit behind them."+sQuest(1000,50000)+"");
	            cm.talkGuide("Where should we go now? I believe Sejan has the answer for us.");
	            cm.changeJobById(2100);
				cm.gainMeso(50000);
        	}
            cm.dispose();
     } else if (cm.getQ()==14) {
         cm.spawn(100101,5,596,83);
         cm.getPlayer().setQuesting(true, 5);
         cm.talkGuide("I'm sure we can best them as we bested the monsters before! We must be stay strong!");
         cm.dispose();
     } else if (cm.getQ()==12) {
         cm.sendOk("Haha! Good. The first thing we should do is test your endurance. Let's see if you can handle a few monsters. I brought a few of these exotic creatures from Ariant and have been breeding them for times such as this.");
    } else if (cm.getQ()==11) {
        cm.sendAcceptDecline("Anyways, the first thing to do is set up our base of operations here in #bOrbis#k. I've already scouted a place for you to further train. There we can train all your skills and craft you into a brilliant conniving artist ever to exist. Sounds great, yes?");
        } else if (cm.getQ()==9) {
            cm.sendNext("Is it that bad? Quick, we must leave right away. I feel we're going to be unable to make a living here any longer. I'll gather the children and take them aboard the first ship. We must leave #bAriant#k before they cut us off. You can give me whatever you've stolen when we're safe.");
        } else if (cm.getQ() == 4) {
            cm.sendNext("Imagine never living on the streets again, never having to sweat and toil on the streets. Imagine never"+
                " being treated like a common caste-less clan member, spited upon by all those higher. Even the peasant class despises"+
            " us. We are ridiculed day and night. But with ... with this robbery we can make a name for ourselves. We can"+
        " make all those who sneer at us cower in fear.");
        } else if (cm.getQ()==3) {
            cm.sendAcceptDecline("I have a big operation in mind if you'd like to take part in it. It should refine your skills as a thief. Maybe"+
                " one day you'll be as famous as the sultan himself, hehehe.");
        } else if (cm.getQ()==5) {
            cm.sendAcceptDecline("There's a guard up there whom is not permitted to allow anyone through those gates. If you can convince him in some"+
                " wily way I'm sure we can scoop up whatever treasure is available and book it before the king and queen can notice. What do you"+
            " say?");
        }  
        }
    } else if (status == 2) {
        if (cm.getJobId()==2000) {
        if (cm.getQ()==0) {
            cm.sendOk("Perhaps you should talk to the locals in this area. You may find something worth stealing, if you know what I mean.");
            cm.completeQ(), cm.talkGuide("Sejan said to talk with the various people around town and see if you can steal something."), cm.dispose();
             } else if (cm.getQ()==12) {
                 cm.getPlayer().setQuesting(true,10);
                 cm.talkGuide("Let's test ourselves against these monsters! We should work only to better our potential.");
                 cm.spawn(100100,10,564,83);
                 cm.dispose();
        } else if (cm.getQ()==11) {
                cm.sendOk("Great, I'll take you there myself. It'll be a long walk, and the area will be completely secluded, but with enough determination we should be able to find our way quite easily.");
        } else if (cm.getQ()==9) {
            cm.sendNext("Wait, so where should we meet? I have not the slightest idea of where to go.",2);
        } else if (cm.getQ()==5) {
            cm.sendOk("Great, I'll just stand watch and make sure we have an escape route. We can't afford to be cut off should they find"+
                " out a little too early."), cm.completeQ(), cm.dispose();
        } else if (cm.getQ()==4) {
            cm.sendOk("And all you have to do is meet me at the royal palace gates just outside the town. You should be able to find"+
                " it; everyone knows where it is. Just meet me at #b#m260000300##k, and bring no one else. I'll fill you in there.");
        cm.completeQ(), cm.warp(260000300), cm.talkGuide("Sejan told us to meet him at the Ariant Castle just outside the town.", 0);
        cm.dispose();
        } else if (cm.getQ()==3) {
            cm.sendOk("Good, speak to me again ... I'll have to get the information needed for us to begin.", 15, 1000);
            cm.completeQ(), cm.talkGuide("Sejan said he wants to speak to us again as soon as possible."), cm.dispose();         
        }  
      }
    } else if (status == 3) {
		if (cm.getJobId()==2000) {
		    if (cm.getQ()==9) {
		        cm.sendOk("Take the boat off of Ariant and head to #bOrbis#k. Meet me there in the main city. You'll have to look for me. It is a large, urban area, unlike the sandy deserts of Ariant. Quick, you must fly. I'll leave you coin to take the boat."+sQuest(100,20000)+"");
				cm.gainItem(4021007, -cm.itemQuantity(4021007));
				cm.warp(260000100);
		        cm.talkGuide("Sejan said to meet him in Orbis as soon as possible. Let us quickly take the boat to Orbis before the guards fall upon us.", 0);
		    } else if (cm.getQ()==11) {
				if (cm.getPlayerCount(train) > 0) {
					cm.sendOk("It seems someone else is in the area I'm taking you to. Perhaps you should change channels.");
					cm.dispose();
					return;
				}
		        cm.warp(train);
		        cm.completeQ();
		        cm.dispose();
		    }
        }
    }
}

function sQuest(exp, meso, guide) {
    if (guide == null) {
        guide = "Why don't we talk to Sejan again to see what we have to do?";
    }
   text = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# "+exp+" exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "+meso+" meso";
   cm.gainExp(exp);
   cm.gainMeso(meso);
   cm.completeQ();
   cm.talkGuide(guide);
   return text;
}