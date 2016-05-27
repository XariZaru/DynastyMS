/*Recoded by Thane Krios
 * Local teleporter + Custom Quest for DynastyMS
 */

//230030200, 251000100 1000,10000

var status, place = [230030200, 251000100, 1000, 10000], choice;
var gorge = 230040000;
var lime = 4000182;
var goby = 4000179;
var chaos = 2049100;
var lottery = Math.floor(Math.random() * 100)
var rand = Math.floor(Math.random() * 100);
var shark = 4000181;
var teeth = 4000180;

function start() {
    status = -1;
    if (cm.getJobId() > 999 && cm.getJobId() < 2000) {
    if (cm.getQ()==34) {
        if (!cm.haveItem(lime, 25) || !cm.haveItem(goby,45)) {
            var alime = cm.itemQuantity(lime);
            var agoby = cm.itemQuantity(goby);
            var dgoby = Math.round(agoby/45 * 100);
            cm.sendOk("Oh, let's see how much you have collected so far ...\r\n\r\n#b#z"+lime+"##k #B"+cm.itemQuantity(lime)/25+"# - "+
                    ""+(alime/25 * 100)+"% ("+alime+"/25)\r\n#b#z"+goby+"##k #B"+agoby/45+"# - "+(dgoby)+"% ("+agoby+"/45)");
            cm.dispose();
        } else {
            cm.sendNext("Oh, are those the materials? Fantastic, let me send word to the merchants who specialize in those items and we'll work out"+
                " a plan. With this surplus, assuming it goes successful, I'm sure we can push for a restart of the town's economy");
        }
    } else if (cm.getQ()==35) {
        if (cm.getLevel() < 100) {
            cm.sendOk("#e#r[Level 100] : A Deep Plunge#n#k\r\n\r\n"+
                    "I think I've got something else in mind ... a permanent solution to our disaster at Aquarium.");
            cm.dispose();
        } else {
            cm.sendNext("You know those merchants we supplied the extra goby and ink to? Well, it turns out the caravan made it across the trench"+
                " without a single hindrance. It seems when you showed those monsters a work down at the bay, you really scared the others off; however,"+
            " that's not to include the Sharks and other frightening abyss monsters that dwell in the underwater caverns below our town.");
        }
    } else if (cm.getQ()==33) {
        cm.sendNext("Hey, #bDolphin#k, has there been any disturbances lately in aqua? When I left the town seemed at rest, but recently there have"+
            " been outbreaks of monster invasions throughout the Empire. Are there any infestations or issues I can take care of for you? I'm here"+
            " on behalf of the past treaties and current treaties which tie the town and the Empire together.",2);
    } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
        cm.sendSimple("Well, hello! I can take you to two of the following locations for a certain fee. Would you like to go?\r\n\r\n"+
            "#b#L0##m"+230030200+"# (1000 meso)\r\n#L1##m"+251000100+"# (10000 mesos)");
    } else {
        if (cm.getQ() == 18) {
            cm.sendNext("Hello, I was wondering if I may speak with you privately. I have something"+
            " that I must ask of you.",2);
        } else if (cm.getQ() == 22) {
            cm.sendNext("Look, I found the guy, but he refuses to accompany me to his trial. I need evidence to lock him away permanently."+
                " If he doesn't come with me, then the loyalists will force themselves into this town and search each individual home until"+
            " you are forced to hand over the evidence. What do you say?",2);
        } else {
            cm.sendOk("What do you need me for? Go find the guy!");
            cm.dispose();
        }
    }
    } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
        cm.sendSimple("Well, hello! I can take you to two of the following locations for a certain fee. Would you like to go?\r\n\r\n"+
            "#b#L0##m"+230030200+"# (1000 meso)\r\n#L1##m"+251000100+"# (10000 mesos)");
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
       if (cm.getJobId() > 999 && cm.getJobId() < 2000) {
        if (cm.getQ()==34) {
            cm.sendOk("Let me take these from you and send them to our suppliers . . ."+
                    "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 850000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 350000 meso"+
                ""+(rand == 58 ? "Wow, it seems #bDolphin#k had 1 #b#t"+chaos+"##k in stock and gave it to you! (1/100 chance)" : 
                "\r\n\r\nAww! You had a 1/100 chance of winning a #b#t"+chaos+"##k! The number you pulled was #b"+rand+"#k while the winning"+
            " number was #b"+lottery+"#k")+".");       
            cm.gainMeso(350000), cm.gainExp(850000), cm.completeQ(), cm.gainItem(goby,-45), cm.gainItem(lime,-25);
            (rand == lottery ? cm.gainItem(chaos,1) : cm.dispose()), cm.talkGuide("It seems Dolphin wishes to speak with us some more."), cm.dispose();
        } else if (cm.getQ()==35) {
            cm.sendNext("They"+
        " scare off what used to be potential tourists and make the caverns inhospitable for commercial activity. Perhaps if you cleared up the infestation"+
    " a little, and whatever stemmed the growth of monsters in the area, we would be able to bring this town back to a full recovery.");           
       } else if (cm.getQ()==33) {
            cm.sendNext("Yes! When you left the monsters began to grow in strength, overwhelming the city guards and our patrolmen. The Empire's"+
                " few remaining sentries were killed within a fortnight. Convoys and caravans have been unable to come in or out of the town, and as"+
            " a result we are being starved to death. We need to jumpstart the economy; it's in shambles and there is no merchant brave enough to"+
        " take a gambit and send a caravan to Orbis.\r\n\r\n#L0##bWhat can I do to help?");
        } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
            choice = selection;
            cm.sendYesNo("Are you sure you want to go to #b#m"+place[selection]+"##k? It will cost you #b"+place[(selection + 2)]+"#k mesos.");        
        } else {
            if (cm.getQ()!= 22) {
            cm.sendNext("Wait! Okay, I know why you're here. It's about that guy who's been snooping around and causing trouble. Treason, your"+
                " men call it, right?\r\n\r\n#L0##bYes, you are correct. Who is he?");
            } else {
                cm.sendNext("If it's evidence you require, then you shall get it, but you need to leave this town alone. I'll need a promise,"+
                    " a declaration--a treaty. I need some legal document that states you will leave the town alone in all instances"+
                " except treason, commerce, and drafts.");
            }
        }
         } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
            choice = selection;
            cm.sendYesNo("Are you sure you want to go to #b#m"+place[selection]+"##k? It will cost you #b"+place[(selection + 2)]+"#k mesos.");
         }
    } else if (status == 1) {
        if (cm.getJobId() > 999 && cm.getJobId() < 2000) {       
        if (cm.getQ()==33) {
             cm.sendNext("I was hoping you'd offer your assistance. The most important export of this town is the materials that derive from #b#m"+gorge+"##k,"+
                 " where fishermen and hunters go go gather #t"+lime+"# and #t"+goby+"#. Those two materials compose a minimum of 70% of Aquarium's"+
             " exports and income. Perhaps with a surplus of those materials merchants will be encouraged enough to go and take more risks.");   
        } else if (cm.getQ()==35) {
            cm.sendNext("The Sharks that dwell underneath the surface of the town are based off of our most ancient lore. While true, the tales are"+
                " extremely exaggerated and metaphorical. You should gather some information from the nearby residents to get an overall picture of what you"+
            " are up against. You go up against some of the toughest foes Aquarium has yet to seen show face.");            
         } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
            if (cm.getMeso() < place[choice + 2]) {
                cm.sendOk("You are lacking the funds to go to this area.");
                cm.dispose();
            } else {
                cm.warp(place[choice]);
                cm.gainMeso(-place[choice + 2]);
                cm.sendOk("Enjoy your time over there! I hope you come back safe and sound."), cm.dispose();;
            }
        } else {
            if (cm.getQ()!=22) {
            cm.sendNext("You know I can't tell that aloud. Look, I know someone who might. Go into the #bZoo#k and find someone who does. There's bound"+
                " to be someone willing to sell you that man's skin for some money.");
            } else {
                cm.sendNext("Go ahead, write the document. I'll wait for you to come with the final draft.",2);
            }
        }
    } else if (cm.getQ()!=18 && cm.getQ() > 22 && cm.getQ()!=33) {
            if (cm.getMeso() < place[choice + 2]) {
                cm.sendOk("You are lacking the funds to go to this area.");
                cm.dispose();
            } else {
                cm.warp(place[choice]);
                cm.gainMeso(-place[choice + 2]);
                cm.sendOk("Enjoy your time over there! I hope you come back safe and sound."), cm.dispose();;
            }
    }
    } else if (status == 2) {
        if (cm.getQ()==35) {
            cm.sendOk("Go, and talk to some of the others. They will have many tales to tell you of the sharks.");
            cm.completeQ(), cm.talkGuide("I'm sure we'll be able to find someone to help us. Perhaps if we talk to some of the Zoo keepers"+
                    " we'll be able to gather some information about these \"deadly sharks\"."),cm.dispose();
        } else if (cm.getQ()!=22 && cm.getQ()!=33) {
            cm.sendOk("Go to the #bZoo#k and talk to one of the employees. I guarantee you that one of them will tell you.");
            cm.completeQ(), cm.talkGuide("Inside the zoo he said? Okay, let's take a look and find the traitor."), cm.dispose();
        } else if (cm.getQ()==33) {
            cm.sendOk("If you can go get 25 #t"+lime+"# and 45 #t"+goby+"# I'm sure the merchants in the town will be courageous enough to vest"+
                " their money into another gambit at trade.");
        cm.completeQ(), cm.dispose();
        } else {
            cm.sendGetText("I actually have the whole thing written in advance. The town has been preparing for a moment such as this for"+
                " over four score years. This parcement has changed ownership several times between our village elder. Here are the"+
            " following requirements for it to be legally bound to the army and #bAquarium#k. Well, I'll actually sum it up, since I'm sure"+
        " you are busy with other tasks.\r\n\r\n#eAll acts are excluded save for those which revolve around commerce, drafts, and treason."+
    " In order for the Knights of Cygnus to pass a rule over this town it must be first approved by the village elder and his council. If"+
" there is insufficient cause for the law to be passed in this town, then the Knights of Cygnus must honor that decision and repeal"+
" its proposal.");
        }
    } else if (status == 3) {
        if (cm.getQ()==22) {
            if (cm.getText() != cm.getPlayer().getName()) {
                cm.talkGuide("Sign your name properly or there'll be consequences.");
                cm.dispose();
            } else {
                cm.sendOk("Fantastic! I'll keep the treaty for myself and you can relay the events to your superior officer. Here is the evidence"+
                    " you'll need to put away that traitor.\r\n\r\n#eItem obtained!#n\r\n#i4001132#");
            cm.completeQ(), cm.gainItem(4001132), cm.talkGuide("Dealing in illegal substances is against the loyalist law. However,"+
                    " this substance has been distributed to enemy lines in the explorer kingdom. This is solid proof of his"+
                    " treachery."), cm.dispose();
            }
        }
    }
}