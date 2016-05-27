/*DynastyMS Custom NP by Thane Krios
 * Sejan
 * The Town of Ariant
 */

var status;
var train = 920030001;
var bottom = 596;
var height = 83;
var pers = false;
var honor = false;
var steal = false;
var skillText = ["Persuasion is the art of convincing others to do your bidding. It is useful for tricking guards and avoiding combat. More often than not we thieves can avoid conflict by simple words of the tongue. The more you practice your persuasion on others, the more adept you will become at endeavors. Use this skill wisely.", "Honor is how others perceive your status. More often than not the poor and middle-class will never take your integrity into question as you are obscure. To the nobles and royals, however, their agents who keep tabs on people throughout the Empire will have plenty of information on you. Of course, they don't know where our hide-out is, but they know of the general direction in which we leave. How do I know this? I used to be one of those agents myself, always hiding in the dark and spying on others.\r\n\r\nThe best way you can improve your integrity is to tell the truth when it counts. This is where people will remember you most by. Small white lies will have less of an impact, but build up a number of them and you'll regret it. A tarnished reputation is worse than no reputation at all.", "Steal is one of your most useful skills. It allows you to pawn items from people without their knowledge. If you fail, however, there is an almost positive chance that the guards will descend upon you. At that point you must choose to either run, or to fight like a man. Like all skills, you must practice this to hone its effectiveness."];
var pole = 1442000;
var maps = 1;

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
            if (cm.getJobId()>=2000 && cm.getJobId()<=2999 && cm.getMapId()==200000000 && cm.getQ() > 13) {
                     cm.sendYesNo("Do you wish to return to our training map?");
            } else if (cm.getJobId()==2000) {
                if (cm.getQ()==0) {
                    cm.sendNext("Ah, it's good to see you, #b#h ##k. Have you found anything worth palming from these"+
                        " greedy merchants? You know how greedy they are, keeping the goods all for themselves. What"+
                    " do they expect us to do? Sit on the side lines and rot in the burning desert?\r\n\r\n"+
                "#b#L0#No, I haven't found anything worth taking, but I will soon find some. I'll have the food"+
            " before nightfall.");
                } else if (cm.getQ()==18) { 
                    cm.sendNext("You are quite the strong man, aren't you? I believe we can get far with skills such as yours. Here, this is a little of what I know myself. It's not much, I'll be honest, but it should most definitely help with your training.");
                } else if (cm.getQ()==17) {
                    if (count > 0) {
                        finish();
                    } else {
                        cm.sendOk("That was a very good display of your potential prowess. Excellent work of your skills, although they can be refurbished."+sQuest(1000,2000)+"");
                        cm.dispose();
                    }
                } else if (cm.getQ()==16) {
                    cm.sendAcceptDecline("You went up against very easy enemies. I'm sure you'll have more difficulties with what I'm about to send against you. Are you ready for this?");
                } else if (cm.getQ()==15) {
                    if (count > 0) {
                       finish();
                    } else {
                        cm.sendOk("Haha! That was very well done! I've yet to see such a warrior prove himself on a field of battle like that; however, those animals are paltry. They are weak! You'll simply have to kill some more before I am positively sure of your prowess. Let me find you something bigger to kill, yes?"+sQuest(200,1000)+"");
                    }
                } else if (cm.getQ()==14) {
                    cm.sendYesNo("Very good! First order of business is to get you to level 10 as fast as possible. From there we can begin to use your wily ways to extort and coerce others to accept our somewhat imbalanced propositions. But hey, that is the life of a poor man, is it not?");
                } else if (cm.getQ()==13) {
                    cm.sendNext("That was a terribly close call. It's a good thing we left Ariant, though. I had a feeling something was bound to happen anyway. The better the sooner, eh?");
                } else if (cm.getQ()==12) {
                    if (cm.getMapId()!=200000000) {
                        cm.sendOk("What are you still doing here? Leave this place before they kill you!");
                        cm.talkGuide("Sejan wants us to leave this place and head to Orbis. We should heed his advice and leave as soon as possible.");
                        cm.dispose();
                    } else {
                        cm.sendOk("It's good to see you here in one piece."+sQuest(100,2000)+"");
                        cm.dispose();
                    }
                } else if (cm.getQ()==11) {
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
            if (cm.countMonster > 0) {
                cm.sendOk("You need to kill all monsters!");
            } else {
                switch (cm.getQ()) {
                    case 29:
                        cm.sendNext("It seems I've taught you all you need to know until later. I feel you can go out and practice your skills until you are a true master. I'll have missions for you to do; sly missions, sneaky missions, dangerous missions, all the missions you can think of! My, I'm ecstatic just thinking about it!");
                        break;
                    case 28:
                        cm.sendOk("Hahaha! That's absolutely wonderful. Here, take this, learn this, I don't care what you do with this! I'm absolutely ecstatic!\r\n\r\n#eLearned:#n #s21001003#"+sQuest(2000,25000, "This is absolutely cool! Sejan's taught us everything he knows for our skill cap. We should train hard and come back later to make him proud!")+"");
                        cm.teachSkill(21001003,0,20,-1);
                        cm.dispose();
                        break;
                    //<editor-fold defaultstate="collapsed" desc="27">
                    case 27:
                        cm.sendAcceptDecline("Hahaha! And I thought you'd have issues fighting against those monsters! Tell you what, if you can past this test I'll give you the last skill I know for your skill cap. What do you say? I'm just positive you'll love this new ability!");
                        break;
                    case 26:
                        cm.sendAcceptDecline("Why don't we train you a little more and help you strengthen your hands? You may be skillful at what you do, but it's obvious that you lack the stamina for a real battle. The best way to train a man is to give him the skills and grind him into dust. That way he will learn everything by muscle memory and have the consistency to show for it.");
                        break;
                    case 25:
                        cm.sendNext("Okay, the first thing I'm going to teach you is something called #b#q21000000##k. It will allow you to follow up your original attack with another, potentially disrupting the enemy with your raw power.\r\n\r\n#eDo you wish to learn it?#n");
                        break;
                    case 24:
                        cm.sendNext("#b(Sejan paces back and forth at the top of the steps)#k",2);
                        break;
                    case 23:
                        cm.sendNext("Now, as a thief you must learn how to be cunning and use the skills you have to win over others. Without these skills your life as a thief will be nothing but a failure: it is what separates us skilled rogues from the unskilled, the adept from the pathetic.");
                        break;
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="19-22">
                    case 22:
                        cm.sendOk("My, what a brilliant display of skill! I haven't seen someone who can learn as fast as you do!"+sQuest(500,1500)+"");
                        cm.dispose();
                        break;
                    case 19:
                        cm.sendAcceptDecline("Now, I understand there is a lot for you to learn. If you'd like, I can train you until you grow stronger right here. Yup, right here. We don't need to go anywhere else. I have all of my equipment here and we're set on food as the younglings have gone out for the pillaging. What do you say?");
                        break;
                    case 20:
                        cm.sendAcceptDecline("Are you ready for your first lesson? With the knowledge I endowed upon you earlier this should be easy!");
                        break;
                    case 21:
                        cm.sendAcceptDecline("Haha, that was a very good job! The way you master your weapon is simply outstanding! Come, let us kill some more!");
                        break;
                    default:
                        cm.sendOk("My, what a view this is!");
                        cm.dispose();
                        break;
                    //</editor-fold>

                    }
                }
            }
        }
    } else if (status == 1) {
        if (cm.getJobId()>=2000 && cm.getJobId()<=2999 && cm.getMapId()==200000000 && cm.getQ() > 13) {           
            for (var i = 0; i < maps; i++) {
                if (cm.getPlayerCount((train + i)) < 1) {
                    cm.getPlayer().saveLocation("WORLDTOUR");
                    cm.warp(train+i);               
                    cm.dispose();
                    return true;               
                }
            }
                    cm.sendOk("There is currently a person in the training map. Please change channels or try again at another time.");
                    cm.dispose();
        } else if (cm.getJobId()==2000) {
        if (cm.getQ()==0) {
            cm.sendNext("Then do so, for the group relies on all of our contributions. If one fails to"+
                " perform his or her duty, we all suffer as a consequence. Look around town; perhaps"+
            " there are still things worth looking for.");
        } else if (cm.getQ()==18) {
            cm.sendOk("Like I said: it's not much, but you can build on what I know. I like to think of myself as a man who takes opportunities at not only face value, but the values that are tacit behind them."+sQuest(1000,50000)+"");
            cm.talkGuide("Where should we go now? I believe Sejan has the answer for us.");
            cm.changeJobById(2100);
            cm.dispose();
     } else if (cm.getQ()==16) {
         for (var i = 0; i < 5; i++) {
            cm.createMob(100101,596,83,20,35,8);
         }
         cm.completeQ();
         cm.talkGuide("I'm sure we can best them as we bested the monsters before! We must be stay strong!");
         cm.dispose();
     } else if (cm.getQ()==14) {
         cm.sendOk("Haha! Good. The first thing we should do is test your endurance. Let's see if you can handle a few monsters. I brought a few of these exotic creatures from Ariant and have been breeding them for times such as this.");
    } else if (cm.getQ()==13) {
        cm.sendAcceptDecline("Anyways, the first thing to do is set up our base of operations here in #bOrbis#k. I've already scouted a place for you to further train. There we can train all your skills and craft you into a brilliant conniving artist ever to exist. Sounds great, yes?");
        } else if (cm.getQ()==11) {
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
        else if (cm.getJobId()==2100) {
           switch(cm.getQ()) {
               case 29:
                cm.sendAcceptDecline("There's so much for you to do out there, so much to learn. Imagine the people we can steal from. Imagine how we'll be able to feed ourselves and never have to starve! Imagine the young ones, always having food and always having clothes. My, my. All you have to do, #b#h ##k, is to go out there and train yourself so you may become strong. So that you may hold your own against anyone.\r\n\r\n#eWhat do you say?#n");
                break;
            //<editor-fold defaultstate="collapsed" desc="Up to 27">
                case 27:
                    cm.sendOk("Perfect! Why don't you give these guys a try and tell me what you think of them!");
                    break;
                case 26:
                    cm.sendOk("Here, kill these guys again. I've made them a little stronger, so be careful when fighting against them.");
                    break;
                case 25:
                    cm.sendOk("You've learned #b#q21000000##k. Why don't you give it a try next time?");
                    cm.teachSkill(21000000,0,20,-1);
                    cm.completeQ();
                    cm.talkGuide("Why don't we talk to Sejan again to see what we have to do?");
                    cm.dispose();
                    break;
                case 24:
                    cm.sendAcceptDecline("I've been thinking: there's a little more I haven't taught you yet. If you'd like, I'd like to test you a few more times in exchange for these skills. What do you say? Another round?");
                    break;
                case 23:
                    cm.sendSimple(""+(!pers && !honor && !steal ? "These are your following attributes which distinguish you from the rest. If you'd like for me to elucidate on any of the skills you can simply ask me." : "What other skills would you like me to elucidate upon?")+"\r\n\r\n#b#L0#Persuasion: "+cm.getPlayer().getPers()+"\r\n#L1#Integrity: "+cm.getPlayer().getHonor()+"\r\n#L2#Steal: "+cm.getPlayer().getSteal()+""+(pers && honor && steal ? "\r\n#L3#I'm Good" : "")+"");
                    break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="Up to 21">
                case 21:
                    cm.sendOk("Why don't you kill these guys for a change? #eI've given you some potions, so don't be afraid to fight!#n");            
                    break;
                case 19:
                    cm.sendOk("Fantastic! Let me just get the materials ready for our training so we can practice. We have such a good vantage point and view from here: you can see the city, the clouds. You can breathe in the fresh air. Man, isn't this the outlaw's life right here? And when we're tired of training or if the monsters have gotten out of control, we can just sit our butts down at the top of these stairs and watch them scurry about.\r\n\r\nThis is the life, isn't it, #h #? I've been waiting all my life for something this good. #eDang I'm excited!#n");
                    cm.completeQ();
                    cm.dispose();
                    break;
                case 20:
                    cm.sendOk("Kill all the pigs in the vicinity and report back to me as soon as possible!");
                    break;
                //</editor-fold>

           }
        }
    } else if (status == 2) {
        if (cm.getJobId()==2000) {
        if (cm.getQ()==0) {
            cm.sendOk("Perhaps you should talk to the locals in this area. You may find something worth stealing, if you know what I mean.");
            cm.completeQ(), cm.talkGuide("Sejan said to talk with the various people around town and see if you can steal something."), cm.dispose();
             } else if (cm.getQ()==14) {
                 cm.completeQ();
                 cm.talkGuide("Let's test ourselves against these monsters! We should work only to better our potential.");
                 for (var i = 0; i < 10; i++) {
                    cm.createMob(100100,(564+i),83,20,25,5);
                 }
                 cm.dispose();
        } else if (cm.getQ()==13) {
                cm.sendOk("Great, I'll take you there myself. It'll be a long walk, and the area will be completely secluded, but with enough determination we should be able to find our way quite easily.");
        } else if (cm.getQ()==11) {
            cm.sendNext("Wait, so where should we meet? I have not the slightest idea of where to go.",2);
        } else if (cm.getQ()==5) {
            cm.sendOk("Great, I'll just stand watch and make sure we have an escape route. We can't afford to be cut off should they find"+
                " out a little too early."), cm.completeQ(), cm.dispose();
        } else if (cm.getQ()==4) {
            cm.sendOk("And all you have to do is meet me at the royal palace gates just outside the town. You should be able to find"+
                " it; everyone knows where it is. Just meet me at #b#m260000300##k, and bring no one else. I'll fill you in there.");
        cm.completeQ(), cm.talkGuide("Sejan told us to meet him at the Ariant Castle just outside the town. We can find it on our minimap(W).");
        cm.dispose();
        } else if (cm.getQ()==3) {
            cm.sendOk("Good, speak to me again ... I'll have to get the information needed for us to begin.");
            cm.completeQ(), cm.talkGuide("Sejan said he wants to speak to us again as soon as possible."), cm.dispose();         }
      } else if (cm.getJobId()==2100) {
          switch(cm.getQ()) {
              case 29:
                cm.sendYesNo("Splendid! I need you to do something for me. Our network stretches across continents, if I haven't told you. Thieves band together to find mutual interests and to help one another out. If you ever come upon something called #bMaster Thief#k, speak to it. He'll take you to me using our spy network. He'll even be able to take you to other towns free of charge, although he won't be able to take you back for an entire day.\r\n\r\nYou should speak with him to find out more information on our network.");
                break;
              //<editor-fold defaultstate="collapsed" desc="Up to 21">
            case 21:
                cm.completeQ();
                createMob(1210101, bottom, height, 35,70,15,4);
                cm.gainItem(2000013,100), cm.gainItem(2000014,100);
                cm.dispose();
                break;
            case 20:
                createMob(1210100,596,83,20,60,5,3);
                cm.completeQ();
                cm.talkGuide("Haha! Pigs! Let's go kill the swine and have them for dinner!");
                cm.dispose();
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="27">
            case 27:
                createMob(2110200,bottom,height,22,200,18,15);
                cm.completeQ();
                cm.talkGuide("Haha, if he thinks he can stop us with a few of these cappy looking monsters, he's sorely mistake! C'mon "+cm.getPlayer().getName()+", let's get at them!");
                cm.dispose();
                break;
            case 26:              
                createMob(1110100,bottom,height,100,380,16,10);
                cm.completeQ();
                cm.dispose();
                break;
            case 24:
                cm.sendNext("Brilliant! You're going to learn a brilliant new skill soon. If you'd like to continue, just tell me when.");
                break;
            case 23:
                switch(selection) {
                    case 0:
                        pers = true;
                        break;
                    case 1:
                        honor = true;
                        break;
                    case 2:
                        steal = true;
                        break;
                }
                if (selection == 3) {
                    cm.sendOk("Good, I'm glad I got that settled with you. There are a few more things I'd like to do with you before you embark to train elsewhere."+sQuest(1000,20000));
                    cm.dispose();
                } else {
                    cm.sendNext(skillText[selection]);
                    status = 0;
                    break;
                }
            //</editor-fold>

          }
      }
    } else if (status == 3) {
   
if (cm.getJobId()==2000) {
    if (cm.getQ()==11) {
        cm.sendOk("Take the boat off of Ariant and head to #bOrbis#k. Meet me there in the main city. You'll have to look for me. It is a large, urban area, unlike the sandy deserts of Ariant. Quick, you must fly. I'll leave you coin to take the boat."+sQuest(100,20000)+"");
        cm.talkGuide("Sejan said to meet him in Orbis as soon as possible. Let us quickly take the boat to Orbis before the guards fall upon us.");
    } else if (cm.getQ()==13) {
        cm.warp(train);
        cm.completeQ();
        cm.dispose();
    }
} else if (cm.getJobId()==2100) {
            switch(cm.getQ()) {
                case 29:
                    cm.sendOk("I will take you to #bOrbis#k now so that you may meet with him. He'll answer any questions you have about our organization.");                    
                    break;
                    
                //<editor-fold defaultstate="collapsed" desc="24">
        case 24:
            cm.sendOk("I've just let loose a few more monsters. Why don't you give them a try: I've also given you a new #epolearm#n. Equip that before you go down there and tell me how much stronger it feels in comparison to your old one.");
            cm.gainItem(pole);
            cm.completeQ();
            createMob(1110100,bottom,height,50,90,15,10);
            cm.talkGuide("Wow, those look a lot stronger than the lackey he brought in earlier! Let's go show him our prowess in battle!");
            break;
        //</editor-fold>

            }
        }
    } else if (status == 4) {
        if (cm.getJobId() == 2100) {
            switch(cm.getQ()) {
                case 29:
                    cm.completeQ();
                    cm.warp(200000000);
                    cm.talkGuide("Look to your left! There's the man he speaks of! Why is he ... made of stone?");
                    cm.dispose();
                    break;
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
   cm.dispose();
}