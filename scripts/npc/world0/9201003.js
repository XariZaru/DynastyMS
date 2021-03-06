/* --Happyville Maps--
209000000
209080000
209080100
209000100
*/

var status = -1;
var reward = [1302077, 1332063, 1372043, 1452051, 1472061];
var tix = 4032055, hut = 209000100;
var quest = 10002;

function start() {
   // if (!cm.iQC(quest) && cm.getJobId()==0) {
     //   cm.talkGuide("You must speak with Assistant Blue on your left before you can continue.\r\n\r\n<--------------------------------------------",0);
       // cm.dispose();
    //} else {
	cm.sendNext("Hey, #h #, how are you doing? Is everything all right?");
    //}
}
	
function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
            if (cm.getQ()==12) {
                cm.sendNext("I think we should get some rest now. It's been a long day and we need to rest our legs. That"+
                    " means you too, #b#h ##k. Let's go take a nap.");
            } else if (cm.getQ()==14) {
                cm.sendNext("We feel like you've been getting very strong and independent lately. The fact that you go out and help others is"+
                    " proof enough that you're a qualified explorer! You know, your dad and I used to be one of the most famous explorers in the land"+
                ", but then we decided to have you as our child. But we don't regret it! Don't worry, we don't regret a single thing.\r\n\r\nYou have"+
            " been out greatest adventure, and now we'd love it if you could continue what we can no longer do.");
            } else if (cm.getQ()==13) {
                cm.sendNext("That was quite amazing, wasn't it? We got to board in this room for free, isn't that great?");
        } else if (cm.getQ()==10) {
                cm.sendOk("Now isn't this comfortable? It's lively, bright, and amazingly cheerful. You can even talk to"+
                    " #bCliff#k over there for conversation. He'll be our \"in keeper\" for tonight. How exciting, right?");
        } else if (cm.getQ()==9) {
                    cm.sendOk("Let's call it a night, okay? I'll go get us checked in right now.");
        } else if (cm.getQ()==8) {
                        text = "Are those the tickets? Brilliant! We also found something we thought you'd might like to have"+
                                "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 800 exp"+
                                "\r\n#fUI/UIWindow.img/QuestIcon/7/0# 3000 meso\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n\r\n";
                        for (var i = 0; i < reward.length; i++)
                            text += "#L"+i+"##i"+reward[i]+"# ";
                        cm.sendSimple(text);
              } else if (cm.getQ()==7) {
                        cm.sendOk("Have you gotten the hotel tickets yet? We'd love to spend the night here. I think #eSimon#n will give us the tickets for the night.");
                        cm.dispose();
                } else if (cm.getQ() == 6) {
                        cm.sendNext("How was #bSanta#k? Did you like him?");
                 } else if (cm.getQ() == 0) {
			cm.sendNext("It's so good to finally be on vacation. Your mom and I have always wanted to visit #b#m"+cm.getMapId()+"##k when we were"+
			" younger, but we'd always be busy.");
                 } else if (cm.getMapId()<209000000) {
                     cm.sendOk("I feel quite tired ...");
                     cm.dispose();
		} else {
			cm.sendOk("Your mother and I are just admiring the "+(cm.getMapId()==209000000 ? "view" : cm.getMapId()==104000000 ? 
                        "harbor" : cm.getMapId()==680000004 ? "view" : "hotel")+". You should go and "+(cm.getMapId()==209000000 ? 
                        "play with some new friends." : "take a look around the place.")+"");
			cm.talkGuide("Perhaps we should go train or help "+(cm.getMapId()==209000000 ? "Santa with his" : "people with their")+" troubles.", 3);
			cm.dispose();
        }
	} else if (status == 1) {    
            if (cm.getQ()==12) {
                cm.warp(cm.getMapId());
                cm.completeQ();
                cm.talkGuide("Ah. I feel refreshed from those accomodations. Let's talk with your #bMom and Dad#k to see what's up.", 0);
                cm.dispose();
            } else if (cm.getQ()==14) {
                cm.sendNext("I know you've still got a lot to learn, more experience to gain, but we promise you that it'll be worth it in the end.")
            } else if (cm.getQ()==13) {
                cm.sendNext("Though I do believe it's time for us to go back. We can always come back using #b#eRoodolph#n#k. Santa came by and"+
                    " told us we were welcome as long as we continue to share his holiday grace.");
            } else if (cm.getQ()==10) {
                cm.complete();
                cm.completeQ();
                cm.talkGuide("Let's talk to Cliff and see how he's like. There's a lot to do, and I'm sure he has some"+
                    " suggestions.", 0);
                cm.gainExp(1000);
			} else if (cm.getQ()==9) {
					 cm.warp(hut);
					 cm.talkGuide("There's your parents! Let's go talk to them!", 1);
					 cm.completeQ();
					 cm.dispose();
			} else if (cm.getQ()==8) {
				cm.completeQ();
				cm.gainItem(reward[selection]);
				if (selection == 2 || selection == 3)
					cm.gainItem(selection == 2 ? 2070000 : 2060000, 2000);
				cm.gainItem(tix,-2);
				cm.gainExp(800);
				cm.gainMeso(3000);
				cm.talkGuide("I think your #eparents#n still want to talk to you. Let's talk to them again!", 0);
				cm.dispose();
			} else if (cm.getQ()==6) {
					cm.sendNext("Yeah, I liked him. He's nice. Do you need anything else?",2);
			} else if (cm.getQ() == 0) {
				cm.sendOk("It'd be nice if you took a look around. You can go meet #bSanta#k. I think he needs some help. You should spread some spirit by giving a hand!");
		}
        } else if (status == 2) {
                if (cm.getQ()==6) {
                    cm.sendAcceptDecline("Oh, no. Actually, I think your Mother and I would love to spend the night, though. Can you make reservations with Simon?");
				} else if (cm.getQ() == 0) {
					cm.completeQ();
					cm.talkGuide("Speak with #bSanta#k nearby!", 0);
					cm.showInstruction("Talk with #eSanta#n to continue the storyline", 200, 50);
					cm.dispose();
                } else if (cm.getQ()==14) {
                    cm.sendOk("We're going to take you to a new place where you'll be able to train and get stronger for the good of our people. And don't you worry about about funding. Your mother and I will provide all the money you need.\r\n\r\n#eSpeak with Taeng the Explorer#n when you arrive at your new location.");
                } else if (cm.getQ()==13) {
                    cm.warp(104000000);
                    cm.completeQ();
                    cm.talkGuide("Let's go find Mom and Dad. We got separated on flight, but I'm sure they're relaxing somewhere. Let's go look"+
                        " for them!", 1);
                    cm.dispose();
        }
        } else if (status == 3) {
            if (cm.getQ()==14) {
				cm.warp(101000000);
                cm.completeQ();
				cm.completeQ();
                cm.complete();
                cm.talkGuide("Hey, let's talk to Taeng the Explorer! I heard he is in charge of everything around here.", 1);
				cm.gainMeso(75000);
                cm.dispose();
            } else {
				cm.completeQ();                  
				cm.talkGuide("Simon should be around here!", 0);
				cm.showInstruction("Let's find Simon!", 250, 50);
				cm.dispose();
            }
	}
}