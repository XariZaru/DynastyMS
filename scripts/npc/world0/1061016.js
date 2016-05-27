var status, verse, phrases = [["The first command you should learn is #bbi zui#k, or translated: #eshut up#n. Use this command"+
            " whenever they are annoying or disrupting your thoughts and speech. This will assert authority over them. Wouldn't you"+
            " love to watch #bAgent E#k squirm underneath your power?", "The most frequently used phrase is #bgei wo#k, or:"+
            " #egive me#n. Obviously you should know when to use this command. Never say please, never ask politely. The loyalists"+
            " expect their leading commanders to be terse, straight to the point. Any dallying will result in suspicion.", 
            "Now, these are a bit out of date so use them sparingly. A wrong word may arouse suspicion. The first one is "+
                    " #bshadow mountain#k. This is reprentative of the extent of her #bMajesty's#k control over the land, and the"+
                    " stealthiness she employs to remain hidden.", "Once in awhile you should reference key phrases that remind"+
                " the #bloyalists#k of what they stand for. They love references to past battles and important historical events."+
            " The most major one is the victory at the #bOrbis#k over the explorers in 253 B.R.E, where #bGuang Xi#k held off over"+
        " 100,000 of our men with a measley force of 2,000. Though he is a #bloyalist#k, I have great respect for him, as do many"+
    " of the explorers. That's why the neutrality of #bSleepywood#k was named after a person, and not the place."], ["The second"+
    " command you need to know is #bgao su wo#k, or: #etell me#n. This will pretty much dictate how much information we receive"+
    " from these crazy boneheads. There isn't anything that's useful aside from these commands. You can always improvise, however,"+
    " just make it seem like you know what you're doing.", "The next request you should know about is #bgei wo zhe ge nu ren#k"+
    ", or: #egive me that woman#n. You can always improvise and say: #bgei wo zhe ge nan ren#k, which is: #egive me than man#n, but"+
    " it all depends on the situation. #bLoyalists#k must have their fair share of men and women, yes?",
    "The second code word you should know is #bshining diamond#k, which mirrors the #bloyalists#k dreams and visions of a glistening"+
            " royalist empire that glistens from sea to shining sea, untouched, unfettered, indisputed, and has sovereign authority"+
            " over all under her borders. They aspire to conquer continents, not just countries!",
    "The second most important reference should be each and every date of the election of a king or queen. In this case, the election"+
        " of her majesty took place in the year 1225 R.E. Remember that date, for if you reference that date it'll bring mirth, and"+
    " certainly lower any suspicious barriers one may have upon you."]], treaty = 4031708
    ; /*verse: 0 = command, 1 = request, 2 = code words, 3 = references*/
        
function start() {
    status = -1;
    if (cm.getJobId()>=1000) {
        cm.sendOk("Ugh ... this world is so tiring.");
        cm.dispose();
    } else if (cm.getQ()==25) {
        cm.sendSimple("Oh... I'm just a feeble man. Please spare me some change. Please ..."+
            "\r\n#b#L0#Spare the man change\r\n#L1#Attempt to speak password.");
    } else if (cm.getQ()<42 && cm.getQ() >= 37) {
        if (cm.haveItem(1042181) || cm.haveItem(1062035) || cm.haveItem(1082079) || cm.haveItem(1102066)
    || cm.haveItem(1002605) || cm.haveItem(1702251) || cm.haveItem(1022015)) {
        cm.sendOk(""+(cm.getQ()==37 ? "#r#e[Chain Quest: 3/3]#n#k\r\n\r\n" : "")+"Please put on all of your equipment. I need to prepare you for our task and I can't"+
            " have you walking in like a total idiot.");
        cm.dispose();
    } else {
        cm.sendNext(""+(cm.getQ()>=37 && cm.getQ() < 42 ? (cm.getQ()==37 ? "#r#e[Chain Quest: 3/3]#n#k\r\n\r\nPerfect, you look befitting a loyalist right-hand man."+
                "Why don't we go over some verses?" : "Do you still want to go over some verses? I can repeat some phrases if you'd like.") : status));
    }
    } else if (cm.getQ()==33) {
        cm.sendOk("You should go to the #bsauna#k and relax.");
        cm.talkGuide("Let's go to the sauna. It seems like a good choice.");
        cm.dispose();
    } else if (cm.getQ()>=45) {
        cm.sendOk("#e#r[Chain Quest 3/3] - COMPLETED#n#k\r\n\r\nNice work, I really admire what you did for us, getting that treaty and all that. It means a lot.");
        cm.dispose();
    } else if (cm.getQ()==44) {
        cm.sendOk("Fantastic, your job is done for now. You can report back to #bTaeng#k for further instruction from now on.");
        cm.talkGuide("He said to report to Taeng from now on. Let's leave this place.");
        cm.gainItem(treaty, -cm.itemQuantity(treaty));
        cm.completeQ();
        
        cm.dispose();
    } else if (cm.getQ()==43) {
        cm.sendOk("Get those files from #bAgent E#k. We need to make sure the treaty cannot be validated.");
        cm.dispose();
    } else if (cm.getQ()==42) {
        cm.sendNext("Well, how was it? Did you get anything important?");
    } else if (cm.getQ()>=38 && cm.getQ() < 42) {
        cm.sendOk("Go on, find some information, disrupt some plans, just talk to them!");
        cm.dispose();
    } else if (cm.getQ()==36) {
        cm.sendNext("#r#e[Chain Quest: 2/3]\r\n\r\n#n#kWhat happened? You look a little roughened up. Did something happen?");
    } else if (cm.getQ()==31) {
        cm.sendOk("You got it? You got what we need?"+
            "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 12000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 15000 meso");
            cm.gainExp(12000);
            cm.gainMeso(15000);
            cm.talkGuide("He wants to talk again!");
            cm.completeQ();
            cm.dispose();
    } else if (cm.getQ()==32) {
        cm.sendNext("Yes, I've got it. The #bloyalists#k are planning a take over of the town. They're talking with the mayor to see if he'll"+
            " back them over us.",2);
    } else if (cm.getQ() < 31 && cm.getQ() >= 27) {
        cm.sendOk("Go! You need to retrieve more information. This could be a potential invasion if we're not too careful!");
        cm.dispose();
    } else if (cm.getQ() == 26) {
        cm.sendNext("#r#e[Chain Quest : 1/3]#n#k\r\n\r\nLook here -- my god, they sent a rookie in. Okay, look, loyalists are constructing some sort of base down here. Bunch of"+
            " men have been funneling down into #bSleepywood#k like they own the area. #bSleepywood#k has been neutral grounds since the beginning"+
        " of the war and the sanctification of the #rTreaty of Ren Guang Xi#k. The fact that the loyalists are gathering in neutral territory"+
    " must mean they are up to something.");
    } else {
        cm.sendOk("Who are you ... ?");
        cm.dispose();
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
        if (cm.getQ()==32) {
            cm.sendAcceptDecline("Argh, those sneaky #bloyalists#k. We'll have to teach them what it means to be the #bexplorers#k. I'll need you"+
                " to infiltrate their camp and disrupt their supplies and men. Can you do that? ");
        } else if (cm.getQ()==42) {
            if (!cm.haveItem(treaty)) {
                cm.sendOk("Yes, here's the trea- ... hang on, I must have misplaced it. Let me go get another copy.",2);
                cm.dispose();
                cm.talkGuide("You can find another copy by talking to Agent E. She said she had extras.");
            } else {
                cm.sendNext("Yup, here it is, the treaty to the handover of #bSleepywood#k. Once I hand this to you, I can tell"+
                    " #bAgent E#k that the paper has been processed and we can get rid of any other copies. We'll"+
                " also have to talk to the mayor of #bSleepywood#k to keep him from signing another document.",2);
            }
        } else if (cm.getQ()<42 && cm.getQ() >= 37) {
            cm.sendSimple(""+(verse != 10 ? "Which of the verses do you want to go over?" : "Do you want to hear any more of the phrases, or are"+
                " you finished for now?")+"#b\r\n\r\n#L0#Commands\r\n#L1#Requests\r\n#L2#"+
                    "Code Words\r\n#L3#References\r\n"+(verse != 10 ? "" : "#L4##eI am finished#n")+"");
        } else if (cm.getQ()==36) {
            cm.sendNext("The loyalists know what we're up to. She threatened me and summoned her guard"+
                " onto me. We need to act quickly if we want to remain in control of #bSleepywood#k.",2);
        } else if (cm.getQ()==25) {
            if (selection == 0) {
            if (cm.getMeso()>50) {
                cm.sendOk("Oh bless your heart, thank you, thank you very much.\r\n\r\n#bYou have lost 50 mesos#k.");
                cm.gainMeso(-50);
                cm.dispose();
            } else {
                cm.sendOk("I haven't gotten any spare change ...",2);
                cm.dispose();
            }
        } else if (selection == 1) {
            cm.sendGetText("Huh? What do you want?");
        }
        } else if (cm.getQ()==26) {
            cm.sendNext("They are gathered at the hotel sauna just down the street. Four of them, that is. The rest have gone elsewhere ..."+
                " perhaps to do their dirty work. I'd be careful if I were you, venturing in there unaware of the dangers the #bloyalists#k pose"+
            " to use Explorers. ")
        }
    } else if (status == 1) {
        if (cm.getQ()==25) {
            if (cm.getText()!="Pidgeon") {
                cm.sendOk("What in the name are you talking about?");
                cm.talkGuide("Don't you remember? The password was Pidgeon!");
                cm.dispose();
            } else {
                cm.sendOk("Aha! I was wondering when you would come."+
                    "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 1000 meso");
                    cm.gainExp(10000);
                    cm.gainMeso(1000);
                    cm.completeQ();
                    cm.complete();
                    cm.dispose();
                     }
        } else if (cm.getQ()==42) {
            cm.sendOk("I'll take care of the mayor, you've done a fine job. Just tell #bAgent E#k that"+
                " the paper has been processed and that she has no reason to keep copies. Confiscate any"+
            " copies she may have.\r\n\r\n#eItem lost!#n\r\n#i"+treaty+"#"+
        "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 23000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 10000 meso");
    cm.gainItem(treaty,-1);
    cm.completeQ();
    cm.gainExp(23000), cm.gainMeso(10000), cm.complete();
    cm.dispose();
        } else if (cm.getQ()<42 && cm.getQ()>=37) {
            if (selection == 4) {
                cm.sendOk("Good, now go speak to each and every one of those agents again. It'd be a miracle if they recognized you"+
                    " in that outfit."+
                ""+(cm.getQ()==37 ? 
        "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 8000 exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# 1000 meso" : "")+"");
            (cm.getQ()==37 ? (cm.completeQ(), cm.gainExp(8000), cm.gainMeso(1000)) : status);
            cm.talkGuide("Okay, let's go see if those guards can recognize us!");
            cm.dispose();
            } else {
            verse = selection;
            // long shit coming up
            cm.sendNext(phrases[0][verse]);    
            }
            // end of long shit
        } else if (cm.getQ()==36) {
            cm.sendNext("I see, you're right. Let's get started right away.\r\n\r\nFirst we'll need to infiltrate their"+
                " command and overhear their actual plans. That way we can plan in accordance and disrupt them before"+
            " they even have a chance to retaliate. They'll give up before the invasion even begins!");
        } else if (cm.getQ()==32) {
            cm.sendSimple("Oh, before you go, which position were you thinking about advancing to?#b\r\n\r\n"+
                ""+(cm.getJobId()==100 ? "#L0#Fighter #L1#Page #L2#Spearman" : cm.getJobId()==200 ? "#L0#Fire/Poison #L1#Ice/Lightning"+
            " #L2#Cleric" : cm.getJobId()==300 ? "#L0#Hunter #L1#Crossbowman" : cm.getJobId()==400 ? "#L0#Assassin #L1#Bandit" : ""+
        "#L0#Brawler #L1#Marauder")+"");
        } else if (cm.getQ()==26) {
            cm.sendAcceptDecline("I'll need you to dig up some information on the agents. You'll have to act like an innocent person, with no prior"+
                " knowledge to why you are bothering them. You know ... just act casual. Find out as much information as you can about"+
            " their aspirations. We need to know why they are present on neutral territory.\r\n\r\nI have faith in you.");
                 }
    } else if (status == 2) {
        if (cm.getQ()==26) {
           cm.sendOk("Brilliant. Find out as much information as you can about the agents. I reckon one of them is the leader. There's some"+
               " kind of hierarchy going on. Start at the bottom.");
       cm.completeQ();
       cm.dispose();
        } else if (cm.getQ()<42 && cm.getQ() >= 37) {
            cm.sendNext(phrases[1][verse]);
            status = -1, verse = 10;
        } else if (cm.getQ()==36) {
            cm.sendOk("Put these clothes on. They'll mask over any equipment you wear. I got them off"+
                " a #bloyalist#k way back. They're supposed to represent the Majesty's most dangerous"+
            " task force.\r\n\r\n#i1042181#\r\n#i1062035#\r\n#i1082079#\r\n#i1102066#\r\n#i1002605#\r\n"+
        "#i1022015#\r\n#i1702251#");
            cm.talkGuide("Let's speak to him again. He wants to say something else."),
                    cm.gainItem(1042181), cm.gainItem(1062035), cm.gainItem(1082079), cm.gainItem(1102066), 
                   cm.gainItem(1002605), cm.gainItem(1702251), cm.gainItem(1022015), cm.completeQ(), cm.dispose();
        } else if (cm.getQ()==32) {
            cm.changeJobById((cm.getJobId()+10) + (10 * selection));
            cm.sendOk("Use the promotion wisely. It'll get you places ... I think you should go to the #bsauna#k here and cool off.");
            cm.talkGuide("My god, he's given you a new ranking! This is exhilerating isn't it? Let's go to the sauna.");
            cm.completeQ();
            cm.dispose();
                    }
                 }
            }
        
