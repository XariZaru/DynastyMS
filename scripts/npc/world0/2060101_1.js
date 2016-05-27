var status, bj = [[100,200,300,400,500], ["warrior", "magician", "bowman", "thief", "pirate"]], sel,
        nul = "\r\n\r\nDo you need something? I don't think I've any missions for you to do at this time. Come back later and maybe"+
        " we'll be able to find something for you.", leaf = 4000005, cap = 4000012;
var slime = 4000004, wpot = 2000002, bpot = 2000003, nc = "not coded", skelemap = 101030108, skull = 4000208, bone = 4000207,
        scrolls60 = [2044001, 2044101, 2044201, 2044301, 2044401, 2044501, 2044601, 2044701, 2044801, 2044901, 2043001, 2043101, 2043201,
2043301, 2043801, 2043701, 2040804, 2040817], rand, rand1, rand2, dMaps = [100040000, 104040002, 107000100, 105070001
, 101030403, 101010102], marbas = 4032495, infox = ["Orbis is the #bloyalist#k capital city, which occupies a separate continent"+
        " that is reachable only through our airships. Ever since the war began hundreds of years in the past, transportation between"+
    " the two civilizations have grown dim, and trade has become nearly extinct. The most contact we've had with one another are"+
" usually a part of treaty-signing and negotiations. You can take the airship in #bEllinia#k, though, for it's one of the"+
" few ships the #bloyalist#k fleet will allow to pass through their blockade.", "#bAgent M#k is one of her Majesty's most loyal"+
" agents. It's been said that no man has ever beaten him in single combat. Now, #bAgent M#k rose to notoriety a few years back when"+
" he defeated our head commander, #bTuo Ye#k. It was a devastating blow for our entire nation, but we were able to recuperate"+
" and deal a crushing blow to their advance at our capital city, #bNew Leaf City#k. From there we were able to"+
" set up communication bases and establish a foothold in areas such as this. #bAgent M#k has been trying to reclaim lost territory"+
" ever since, and has been known to be very successful in his endeavors.","The loyalist and explorer feud has been in existence since"+
" the years of 0 R.E. The start of the system #bR.E.#k was recognized the moment our great war began. It is a fixed point in time"+
" and has been titled #bThe Great  Year#k.","It's quite simple. When our army has amassed in strength, we gather at one fixed point"+
" and launch our divisions are various towns. Our main force is focused on the primary target whilst the divsionary forces, ground"+
" forces, and ranged support assist from behind. Our divisionary forces exploit weaknesses in the enemy's defense.","Me?"+
" I've been part of the military since I could wield a proper sword! Which was ... I believe when I was 9. Young men are drafted into"+
" the military so they can begin combat experience training as soon as possible. This will prepare the boys for future combat"+
" and strengthen their resolve in fights."], ret = 0;
function start() {
    status = -1;
    if (cm.getJobId()>=1000) {
        cm.sendOk("I'm Taeng, who are you?");
        cm.dispose();
    } else if (cm.getQ()==49) {
        cm.sendSimple("You have to go see #bAgent M#k if you want to engage in diplomatic relations at the"+
                " Guild Headquarters. We have to call a ceasefire if we"+
            " want to fight the impending monster threat cohesively.\r\n#b#L0#What is Orbis?\r\n#L1#Who is Agent M?\r\n#L2#How"+
        " long has the explorer and loyalist feud been going on?\r\n#L3#How do we expand our territories?\r\n#L4#How long have you"+
    " been a part of the fight?\r\n\r\n\r\n#l#k#eChoose an option.");
    } else if (cm.getQ()==48) {
        if (!cm.haveItem(marbas)) {
            txt = "Here are the areas you can go to ...\r\n";
            for (var i = 0; i < dMaps.length; i++) 
            txt += "\r\n#b#m"+dMaps[i]+"#";
            cm.sendOk(txt);
            cm.dispose();
        } else {
            cm.sendNext("I found this item when I arrived at the portal. A monster named #bMarbas#k appeared and we fought for awhile"+
                ", but I overpowered him. When he died, he left this behind.",2);
        }
    } else if (cm.getQ()==46) {
        if (!cm.haveItem(bone, 50) || !cm.haveItem(skull,10)) {
            cm.sendOk("You have yet to collect the materials needed for me to study what exactly is allowing the monsters to infiltrate our"+
                " world. Please collect the items necessary."+
                "\r\n\r\n"+("#B"+(cm.itemQuantity(skull)/10 * 100))+"#  "+(cm.itemQuantity(skull)/10 * 100
        )+"% #i"+skull+"# collected\r\n"+("#B"+(cm.itemQuantity(bone)/50 * 100))+"#  "+(cm.itemQuantity(bone)/50 * 100
        )+"% #i"+bone+"# collected");           
        } else {
            rand = Math.floor(Math.random()*scrolls60.length);
            cm.sendNext("This is just what I needed, thank you. I'll have my top scientists looking onto this. The #bexplorer#k tribe will"+
                " need to enter negotiations with the #bloyalists#k to put our past grievances away until we can solve this mystery."+
            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 85000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 25000 meso"+
        "\r\n#fUI/UIWindow.img/QuestIcon/5/0# Mystery Reward");
        }
    } else if (cm.getQ()==47) {
        cm.sendAcceptDecline("#r#e[Chain Quest 2/2]#n#k\r\n\r\nHey, you're back. I found something in those bones that you might"+
            " like to hear about. Traces of it lead back to a #bdemon's doorway#k, a portal in which mobs spawn from constantly. There"+
        " are several of these portals all across the world, and if monsters are increasing because of these portals, we must look at the"+
    " cause behind them.");
    } else if (cm.getQ()==24) {
        if (cm.getLevel() < 30) {
            cm.sendOk("#e#r[Level 30] : Another Power?#n#k"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Hey, the time is right. I've got a man under cover in one of the #bloyalist#k towns that has some juicy news for us.");
        }
    } else if (cm.getQ()==45) {
        if (cm.getLevel()<60) {
        cm.sendOk("#e#r[Level 60] : Fighting Revenge#n#k"+nul+"");
        cm.dispose();
        } else {
            cm.sendNext("#r#e[Chain Quest 1/2]#n#k\r\n\r\nYou feeling stronger? Good, because you look the part. "+
                    "We have a problem that's arising. The #bloyalists#k found out"+
                " about our intervention and are bitter. They've already retaliated against several of our delicate supply convoys and"+
            " interecepted several of our messengers. We need some time to cool off.\r\n\r\n#ePlus, there's a bigger problem growing at hand.#n");
        }
    } else if (cm.getQ()<45 && cm.getQ() > 25) {
        cm.sendOk("Report to our agent in #bSleepywood#k, he'll know what to do with you.");
        cm.dispose();
    } else if (cm.getQ()==23) {
        if (!cm.haveItem(slime,100)) {
            cm.sendOk("You are currently lacking in proof of completion."+
                    "\r\n\r\n"+("#B"+(cm.itemQuantity(slime)/100 * 100))+"#  "+(cm.itemQuantity(slime)/100 * 100
        )+"% #i"+slime+"# collected");
        } else {
            cm.sendOk("Fantastic work. You haven't failed me once..."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 4000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 10000 meso"+
            "\r\n\r\n50 #i"+wpot+"# #t"+wpot+"#\t\t50 #i"+bpot+"# #t"+bpot+"#");
                cm.gainExp(4000), cm.gainMeso(10000), cm.gainItem(wpot, 50), cm.gainItem(bpot, 50), cm.gainItem(slime, -100),
                cm.completeQ(), cm.complete(), cm.dispose();
        }
    } else if (cm.getQ()==20) {
        if (cm.getLevel() < 18) {
            cm.sendOk("#e#r[Level 18] : The Next Step#k#n"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("So, how does it feel to be blessed with a position of the #eexplorer#n tribe? You have to fight for your side at all times, fight for the"+
            " #bDynasty#k. And that starts off with training to be a stronger fighter.");
        }
    } else if (cm.getQ()==16) {    
        cm.sendNext("Oh, hello, my name is #bTaeng#k and I am the leader of the explorer tribe on this side of the continent. Say, you seem"+
        " like a worthy adventurer yourself.");
    } else if (cm.getQ() == 19) {
        cm.sendSimple("Now, I understand there are many choices in life, but you've gotta make one right now. And this one decision will"+
            " dictate the outcome of your life. Do you understand? Choose an option below.#b\r\n\r\n#L0#Warrior #L1#Magician #L2#Bowman"+
        " #L3#Thief #L4#Pirate");
    } else if (cm.getQ() == 18) {
        if (cm.getLevel() < 10) {
            cm.sendOk("You don't seem to be prepared for what I'm about to give you. Why don't you train a little while longer?");
            cm.talkGuide("Taeng did tell us to train in the forest west of here. Why don't we give that a go?");
            cm.dispose();
        } else {
            cm.sendOk("Amazing, I didn't think you would finish so quickly."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/7/0#5000 meso");
        cm.gainMeso(5000);
        cm.complete();
        cm.completeQ();
        cm.dispose();              
        }
    } else if (cm.getQ()==22) {
        if (cm.getLevel() < 25) {
            cm.sendOk("#r#e[Level 25] : Tying Loose-Ends#k#n"+nul+"");
            cm.dispose();
        } else {
            cm.sendNext("Brilliant work before. Our caravan supplies have nearly increased by 3 fold ever since you took care of the monster infestation."+
                " We have to be careful when dealing with our own supply trains. An army is built upon layers, the supplies and men being the core of the structure.");
        }
    } else if (cm.getQ()==21) {
        if (!cm.haveItem(cap, 40) || !cm.haveItem(leaf, 60)) {
            cm.sendOk("Where are those items I told you to get? You need proof!\r\n\r\n"+("#B"+(cm.itemQuantity(cap)/40 * 100))+"#  "+(cm.itemQuantity(cap)/40 * 100
        )+"% #i"+cap+"# collected\r\n"+("#B"+(cm.itemQuantity(leaf)/60 * 100)+"#  "+(cm.itemQuantity(leaf)/60 * 100
        )+"% #i"+leaf+"# collected")+"");  
            cm.dispose();
        } else {
            cm.sendOk("Great work! I think our supply trains will be okay for now."+
                    "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0#1085 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 550 meso");
            cm.gainExp(1085);
            cm.gainMeso(550);
            cm.completeQ();
            cm.complete();
            cm.dispose();
        }
    } else if (cm.getQ() == 17) {
        cm.sendAcceptDecline("#r#e[Getting Started] : Level 7+#n#k\r\n\r\nYou seem to be all right there. Why don't you train in the area "+
                "to the left of here? There are an abundance in all types of monsters that you can train on.");
    } else {
        cm.sendOk("I am Taeng. Make yourself appear in a better fashion!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == -1) {
        if (status > -1) {
            cm.sendOk("Shame, I thought you'd be up to the task.");
            cm.dispose();
            return;
            } else {
            cm.dispose();
            return;
            }
    } else {
        if (cm.getQ()==49) {
            cm.talkGuide("Let's go to Orbis!");
            cm.dispose();
        } else {
        cm.dispose();
        return;
        }
    }
    if (status == 0) {
        if (cm.getQ()==16) {
            cm.sendNext("Oh, yes I am quite the adventurer. I like to explore and imagine myself on great journeys. Why, what do adventurers "+
                    "do?", 2);
        } else if (cm.getQ()==49) {
                (ret == 0 ? cm.sendNext(""+infox[selection]+"") : cm.sendSimple("What else would you like to know?"+
                    "\r\n#b#L0#What is Orbis?\r\n#L1#Who is Agent M?\r\n#L2#How"+
        " long has the explorer and loyalist feud been going on?\r\n#L3#How do we expand our territories?\r\n#L4#How long have you"+
    " been a part of the fight?\r\n\r\n\r\n#l#k#eChoose an option."));               
        } else if (cm.getQ()==48) {
            cm.sendAcceptDecline("Interesting, there seems to be traces of energy that radiate to the caves of #bEl Nath#k and #bLeafre#k."+
                " I'll find the trace myself, as for you, I need you to undergo a diplomatic mission to the #bloyalists#k main city,"+
            " #bOrbis#k, there I need you to talk to one of the top Knights, #bAgent M#k. He's in charge of all foreigns affairs,"+
        " and he holds the position as secretary of state.");
        } else if (cm.getQ()==47) {           
            txt = "There are some doorways nearby #bEllinia#k if you'd like to investigate, and there are some nearby Henesys. Just look around and"+
                " you'll find them. If you find anything interesting, or find any item, just pick it up and return.\r\n";
                for (var i = 0; i < dMaps.length; i++) 
                    txt += "#b\r\n#m"+dMaps[i]+"#";                 
                    cm.sendOk(txt);
                    cm.completeQ();
                    cm.dispose();
        } else if (cm.getQ()==46) {
            cm.sendOk("Your rewards are ..."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 85000 exp"+
                "\r\n#fUI/UIWindow.img/QuestIcon/7/0# 25000 meso\r\n#i"+scrolls60[rand]+"#\t#i"+1142109+"#");
            cm.gainExp(85000), cm.gainMeso(25000), cm.gainItem(1142109), cm.gainItem(scrolls60[rand]), cm.completeQ();
        } else if (cm.getQ()==45) {
            cm.sendNext("What threat? There's something bigger than the #bloyalist#k armies?",2);
        } else if (cm.getQ()==24) {
            cm.sendNext("Great, what is it?",2);
        } else if (cm.getQ()==20) {
            cm.sendAcceptDecline("Now, onto our main issue. We've been sending supplies to our neighboring towns, #bPerion#k and #bHenesys#k, but the supplies seem to"+
                " never arrive. We suspect it's the monsters disrupting our caravans. I need you to clean up some of the monsters there for me. Do you feel"+
            " up to the task?");
        } else if (cm.getQ()==19) {
            sel = selection;
            cm.sendYesNo("Are you sure you want to be a #b"+bj[1][selection]+"#k?");
        } else if (cm.getQ()==17) {
            cm.sendOk("Fantastic! Train on the slimes until you're #r#elevel 10#n#k, then come and see me. If you over level it's fine, I'll"+
                " compensate you when you get back.");
                cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()==22) {
            cm.sendAcceptDecline("However, recently there have been sightings of a smaller infestation growing down near #bHenesys#k. Normally I'd send a new recruit"+
                " in there, but I suppose you can fill in. Our more experienced soldiers are fighting off the #bCygnus#k empire. Are you up for it?");
    }
    } else if (status == 1) {
        if (cm.getQ()==16) {
            cm.sendYesNo("We #bexplorers#k scout surrounding territory and claim the land for ourselves. By doing so we spread our claim over new"+
                " minerals and metals, giving us a claim and advantage over the other nations. Sounds intriguing, right?");
        } else if (cm.getQ()==49) {
            (ret == 0 ? (cm.sendYesNo("Would you like to know something else?"), ret = 1, status = -1) : (cm.sendNext(infox[selection])));
        } else if (cm.getQ()==48) {
            cm.sendOk("Heads to #bOrbis#k and find #bAgent M#k, there you will engage in diplomatic negotiations.");
            cm.talkGuide("Orbis it is! Let's go find this Agent M guy.");
            cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()==45) {
            cm.sendAcceptDecline("Yes, and it's growing rapidly. Monsters in our world used to only reside as side-liners. They've never become"+
                " a major threat until recently, when they attacked a village and killed several citizens. I need you to go in and investigate.");
        } else if (cm.getQ()==24) {
            cm.sendAcceptDecline("Apparently, we've got some loyalist movement forming down at #bSleepywood#k. I need you to go there and meet up with"+
                " our agent. You should be able to find him, it's a small town. I reckon he's near the edges of the town, skulking around"+
            " and digging up information. What do you say, can I trust you?");
        } else if (cm.getQ()==20) {
            cm.sendOk("That's a good chap. I'll need you to show proof that you actually took care of the monsters, so I believe you should bring back some proof. Perhaps you should bring back ..."+
                "\r\n\r\n60 #i"+leaf+"#\r\n40 #i"+cap+"#");
            cm.completeQ();
            cm.dispose();
        } else if (cm.getQ()==22) {
            cm.sendOk("Clear out slimes near #bHenesys#k and bring me back ...\r\n\r\n100 #i"+slime+"#");
            cm.completeQ();
            cm.dispose();
    } else if (cm.getQ()==19) {
            cm.sendOk("You become a #b"+bj[1][sel]+"#k, congratulations.");
            cm.changeJobById(bj[0][sel]);
            cm.getPlayer().resetStats();
            cm.completeQ();
            cm.dispose();
        }
    } else if (status == 2) {
        if (cm.getQ()==16) {
            cm.sendNext("Well, we're always looking for more volunteers, so if you would like to join us just say #b\"yes\"#k");
        } else if (cm.getQ()==49) {
            cm.sendYesNo("Would you like to know something else?"), status = -1, ret = 1;
        } else if (cm.getQ()==45) {
            cm.sendNext("Where is this place? Somewhere nearby?",2);
        } else if (cm.getQ()==24) {
            cm.sendOk("Great, just head down to #bSleepywood#k and find our man. He'll brief you on what's necessary.\r\n\r\nOh! And the"+
                " secret code is #e\"Pidgeon\"#n");
            cm.completeQ(), cm.talkGuide("Sleepywood it is then. Do you even know how to get there? I suppose we have to use our world map"+
                "(W), to find it.");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.getQ()==16) {
            cm.sendOk("That's my lad! Speak to me again for your next task. Boy this is inredibly exciting."+
                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 350 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 500 meso");
            cm.talkGuide("Taeng would like to speak with us again.");
            cm.completeQ();
            cm.gainExp(350);
            cm.gainMeso(500);
        } else if (cm.getQ()==45) {
            cm.sendNext("They're everywhere my man! Monsters are filling themselves throughout the world as we speak. We have to begin to"+
                " find the source of all this madness. The filling of monsters must mean the crack in our worlds is widening, and that"+
            " the seal placed by #bGuang Xi#k is failing. We've had monster dilemmas before, but not at the rate of this.");
        }
    } else if (status == 4) {
        if (cm.getQ()==45) {
            cm.sendOk("I need you to take a look at an area named #b#m"+skelemap+"##k. There is unusual activity brewing there, the undead"+
                " rising from their graves as if taken over by some unknown spirit. If you could bring me back:\r\n\r\n10 #i"+skull+"#\r\n"+
            "50 #i"+bone+"#\r\n\r\nthat'd be splendid.");
            cm.completeQ();
            cm.dispose();
        }
    }
}