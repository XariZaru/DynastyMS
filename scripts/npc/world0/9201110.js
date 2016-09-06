var status = -1;
var maps = [100000000,101000000,102000000,103000000,104000000,120000000,200000000,250000000,220000000,230000000,221000000,130000000,140000000,211000000,260000000,261000000,240000000,251000000,222000000,540000000,600000000,550000000,551000000];
var map = 1;
var progress = 0;
var train = 920030001;
var info = [//<editor-fold defaultstate="collapsed" desc="Information on the Network">
    ["Our network branches out to nearly every continent, with the exception of a small Royalist sect known as #bOmega Sector#k. Operations in that area have been segregated from the real world and little is known about their discoveries. If you don't know who the Royalists are, or who the Rebels are, perhaps you should talk with our main informant: #bElpam Gorlab#k, who is situated in various towns. You can probably find him in major cities, such as #bNew Leaf City#k on the Victorian Continent.\r\n\r\nOur network provides intel on many different areas. I can tell you right now that Her Majesty, #bCygnus#k, is dining secretly with an ambassador from the country of #bAriant#k and that the Rebel commander, #bTaeng#k, is in discourse with a new recruit in Ellinia. Our network should not be underestimated. We can strike at a moment's notice.","Our little organization originated in the deserts of #bAriant#k as a clan dedicated to simple lifestyles. We pitied the poor, hated the rich, and starved daily. We took our misfortune, wielded it as our boon, and became the thieves people think of us today. Our little inconspicuous group began in 1600 B.R.E, almost 2 millenia ago, in a small room towered by the royal palace in the distance. It was in this hovel where five struggling men devised a solution which would better the lives of those in poverty.\r\n\r\nThey would steal from the merchants and share the goods with the poor: the classic Wu Yu and his hooded gang parable. The network stretched across all of Ariant. If you could find the symbol of a bloody hand imprinted on the bottom right of the door, then you could be sure to find some sort of help within the home if you were a thief yourself. And because of Royal regulations on private property the merchants could not storm said homes searching for someone to incriminate.\r\n\r\nBy 1550 B.R.E the Ariant network had disseminated into Magatia, where the famous scientists themselves found the markets mysteriously lacking in goods. The Magatian task force, renowned for police brutality, stormed the painted homes and murdered 3 women who refused to give up the refugees. In fury, the local thief network rose in rebellion and boycotted the markets by destroying food stalls and restaurants. Ariant sympathsizers sent provisions to supplement the rebellion's armament", "By 1450 B.R.E the rebellion had ended and the police force was coerced to adhere to the thieves' commands. This meant that the thieves held the majority of the power in the social structure. Without the common man the kingdom is doomed to fall, and thus the King's edict repealed the anti-tariff laws and established protection for local businesses. Still, it would take many years for the impoverished sections of the country to recover.\r\n\r\nIn 1385 B.R.E the situation was still nearly as bad as before. Although preventative measures had been put in place, the poor were unable to take advantage of their boon and capitalize on it. The amount of money in the commoners' hands was too little to ignite true reform. As a result, the rich stayed in power, and the poor stayed in poverty.", "Other continents got wind of what our little organization had become. New ones formed in Ellinia and Henesys, and even one in the royal city: Orbis. Our grassroot organization had become something much larger than any of the original founding fathers had even speculated. Riots broke out across the globe. Men sang of more prosperous  times. And from the shadows of the smoke that arose from the fervor rose new feelings of power and balance. In 1290 B.R.E the network of thieves finally met up and formed an intricate communications highway that allowed them to span across the whole world. It is the modern network you see today, and we've hardly changed. It has become a tradition for our younglings to start at a small age and become honed with years of practice. This is what has become of you today."]
    //</editor-fold>
,["I participate as a mediator between the clans and keep them in line. While we are for the most part a unified bunch, there are times where we enter disagreement. Without me to mediate between them, fights can often break out and disrupt the innerworkings of our network. This cannot be allowed.\r\n\r\nBy mediating between feuding groups, I'm able to keep our community safe.",
  "I've been a mediator for quite some time now. You might wonder why exactly my person is that of a statue, but that's because I, as a person, was infused into this rock a long time ago. How exactly long ago" +
  " I'm not quite sure, but it must have been at least over 4 score decades already."],["You can get missions through me. Sejan can also relay you missions by putting you into direct communication with me if you do happen to find him. Either way, I'll be the one that distributes the mission to you, and you'll undertake it. They'll be good, rewarding missions, mind you. So don't worry about the pay."]];
var intel,who,how, sel;
var food = 4031580;
var cm = null;
var bamboo = 4032309;
var kimono = 4000225;
var armor = 4000558;

importPackage(Packages.tools);
importPackage(Packages.java.sql);

function questDetails(level, title) {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT information from aran_info WHERE id = ?");
	ps.setInt(1, cm.getQ() + 1);
	var rs = ps.executeQuery();
	var details = "NO DETAILS";
	if (rs.next())
		details = rs.getString("information");
	ps.close();
	rs.close();
	return "#e#r[Level "+level+"] : " + title + "#n#k\r\n_____________________________________________\r\n\r\n" + details;
}

function rewardDetails(exp, meso) {
	return "#fUI/UIWindow.img/QuestIcon/8/0# " + exp + "\r\n#fUI/UIWindow.img/QuestIcon/7/0# " + meso;
}

function start() {
	cm = cm;
    if (cm.getJobId()>=2000 && cm.getJobId()<=2999) {
    	if (cm.getQ() == 28)
    		cm.sendNext("#b(The statue seems to be unmoving and stoic)#k",2);
    	else if (cm.getQ() == 29)
    		cm.sendNext("#bSejan#k tells me that you have traveled far from the desert sands of Ariant. You are now in the metropolis of" +
    				" #eOrbis#n, the thriving heart of the Empire, whom I assume you do not care about; however, this is much to the city that you need " +
    				"to learn, and that without proper knowledge of the Imperial's innerworkings you may find yourself in a tight situation.\r\n\r\n " +
    				"There is change occuring as we speak right now, and even though our network is vast we're unable to gather a significant amount of information " +
    				"about this particular foe.");
    	else if (cm.getQ() > 29)
            cm.sendSimple("What do you wish to do? You may enter the hideout whenever you wish to, but to go to other maps you will have to wait an entire day for it to replenish for our network is spread thin at this moment.\r\n\r\n#b#L2#Talk to Master Thief (storyline)\r\n#L0#Go to the Hideout\r\n#L1#Other Maps");
    	else {
    		cm.sendOk("#b(The statue seems to be unmoving and stoic.)#k", 2);
    		cm.dispose();
    	}
    } else {
    	cm.sendOk("#b(The statue seems to be unmoving and stoic, but if you stay close and long enough its eyes seems to glow.)#k", 2);
        cm.dispose();
    }
}


function action(m,t,s) {
    if (m != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
		if (s == 0) {
			if (cm.getPlayerCount((train)) < 1) {
				cm.getPlayer().saveLocation("WORLDTOUR");
				cm.warp(train); 
			} else {
				cm.sendOk("There is currently a person in the training map. Please change channels or try again at another time.");                          
			}
			cm.dispose();
		} else if (s == 1) {
			text = "Here are the following maps our network branches out to:\r\n#b";
			for (var i = 0; i < maps.length; i++) {
				text += "\r\n#L"+i+"##m"+maps[i]+"#";
			}
			cm.sendSimple(text);
		} else {
			switch(cm.getQ()) {
				case 45:
					if (cm.getLevel() < 120) {
						cm.sendOk(questDetails(120, "The Biggest Gift"));
						cm.dispose();
					} else {
						var skills = [21121000];
						cm.sendOk("Fantastic work so far. Keep it up.");
						cm.changeJobById(2112);
						for (var x = 0; x < skills.length; x++)
							cm.teachSkill(skills[x], 0, 10, -1);
						cm.completeQ();
						cm.dispose();
					}
					break;
				case 44:
					if (!cm.haveItem(armor, 150)) {
						cm.sendOk("Please gather 150 pieces of #i" + armor + "# so that I can start work.");
						cm.dispose();
					} else {
						cm.sendOk("Fantastic work. I'll need your help soon enough.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 9000000 exp");
						cm.gainExp(9000000);
						cm.gainItem(armor, -150);
						cm.completeQ();
						cm.dispose();						
					}
					break;
				case 43:
					if (cm.getLevel() < 110) {
						cm.sendOk(questDetails(110, "A Heavy Task Ahead 2"));
						cm.dispose();
						return;
					} else {
						cm.sendNext("I was able to discern something from the materials you got for me.");
					}
					break;
				case 42:
					if (!cm.haveItem(kimono, 50) || !cm.haveItem(bamboo, 10)) {
						cm.sendOk("Bring me 50 #i"+kimono+"# and 10 #i"+bamboo+"# so that I can inspect what has been happening in our world.");
						cm.dispose();
					} else {
						cm.gainItem(kimono, -50);
						cm.gainItem(bamboo, -10);
						cm.sendOk("I see ... this will take some time to decipher. Come back later when I have answers.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3000000 exp");
						cm.gainExp(3000000);
						cm.completeQ();
						cm.dispose();
					}
					break;
				case 41:
					if (cm.getLevel() < 90) {
						cm.sendOk(questDetails(95, "A Heavy Task Ahead"));
						cm.dispose();
						return;
					} else {
						cm.sendNext("It's good you're here. I need you to do something for me. While the empire has been fighting the rebels I've recently learned from faraway lands that something big is amassing in the shadows.");
					}
					break;
				case 40:
					if (cm.getLevel() < 70) {
						cm.sendOk(questDetails(70, "Understanding Power"));
						cm.dispose();
					} else {
						cm.sendOk("Hey, you've been doing a pretty good job. Take this as a reward for your well-earned services.");
						cm.changeJobById(2111);
						cm.teachSkill(21110002, 0, 20, -1);
						cm.completeQ();
						cm.dispose();
					}
					break;
				case 39:
					if (cm.getPlayer().getDynastyQuest("AranFaHai") < 2 || cm.getPlayer().getDynastyQuest("WuYuanAran") < 3 || cm.getPlayer().getDynastyQuest("ChefAran") < 2) {
						cm.sendOk("You still need to visit all three of the following cities and take what supplies you can get from them. The following cities are:\r\n\r\nKerning City\r\nLith Harbor\r\nHenesys");
						cm.dispose();
					} else {
						cm.sendOk("Nice job. The supplies are flowing in quite nicely to our secure location. This should help out our cause.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 400000 exp");
						cm.completeQ();
						cm.gainExp(400000);
						cm.dispose();
					}
					break;
				case 38:
					if (cm.getLevel() < 45) {
						cm.sendOk(questDetails(45, "Another Task [Chain Quest: 0/3]"));
						cm.dispose();
					} else {
						cm.sendNext("I'm happy to see that you're progressing along just fine. I hope you're ready for some work. We have a lot to do today. I'm sure you have a lot of questions, but those will be answered in time. You're progressing so quickly that we're unsure where to place you for our covert operations. I'm thinking you're ready for your first #eraid#n! How does that sound?");
					}
					break;
				case 37:
					cm.sendOk("Is this the food you got? This is a lot! Let me send this shipment off to #bSejan#k. Give me a moment.\r\n\r\n" + rewardDetails(100000, 50000));
					break;
				case 36:
				case 35:
				case 32:
				case 33:
				case 34:
					cm.sendOk("Well? Did you get the #i"+food+"# I asked you to get? Check #eHenesys Market#n to see if there are any heavy lifters you can snatch from.");
					cm.dispose();
					break;
				case 30:
					if (cm.getLevel() < 30) {
						cm.sendOk(questDetails(30, "A Quick Checkup"));
						cm.dispose();
					} else {
						cm.sendOk("Good, good! I'm happy to see you work so hard for your rewards. Here, take this power that has been entrusted from younglings to younglings for generations.");
					}
					break;
				case 31:
					cm.sendYesNo("Look, I see you what to make a difference in this cold world. So do many of the people in our organization. But look at this place. It is a pinnacle of disaster, of poverty. People are poor. Look at them come in droves from around the world, hoping to find solace in a desolate place such as this. Do you want to make a change to this world?");
					break;
				case 28:
					cm.sendNext("#b(The statue's eyes suddenly shine brightly and then fade away evanescently)#k",2);
					break;
				case 29:
					cm.sendNext("You, having been trained in our ways for quite a long time, understand how important it is that we feed " +
							"the needy. Without our services many can go hungry. It is of utmost importance then to maintain updated information " +
							"about various prominent figures so that we can make our raids accordingly.\r\n\r\nFor now, I'll take you to our network on " +
							"the mainland, #bVictoria Island#k, where you'll grow stronger and work to become a more important asset to our underground group.");
					break;
				default:
					if (s == 0) {
						if (cm.getPlayerCount((train)) < 1) {
							cm.getPlayer().saveLocation("WORLDTOUR");
							cm.warp(train); 
						} else {
							cm.sendOk("There is currently a person in the training map. Please change channels or try again at another time.");                          
						}
						cm.dispose();
					} else {
						text = "Here are the following maps our network branches out to:\r\n#b";
						for (var i = 0; i < maps.length; i++) {
							text += "\r\n#L"+i+"##m"+maps[i]+"#";
						}
						cm.sendSimple(text);
					}
					break;
			}
        }
    } else if (status == 1) {
        switch(cm.getQ()) {
			case 43:
				cm.sendNext("The fact that you were able to bring me so many #i"+kimono+"# in such a short period of time in combination with the amount of bamboo that dropped ... the ratio tells us that there is an imbalance in the world. I did some calculations and if they're correct we're looking at a 800% increase in danger in just the last year alone.");
				break;
			case 41:
				cm.sendAcceptDecline("I need you to travel to an area called #bZipangu#k and retrieve 50 #i" + kimono + "# and 10 #i" + bamboo + "#.");
				break;
			case 38:
				cm.sendNext("There's a few convoys around here that the Empire has transporting goods to their army. What's important is that these convoys don't bring supplies to any of the commonwealth. So while the army is kept happy and nutritious, there's a total disregard for the lower classes and backbone of their industry. We have to change that by re-routing food into the people so that they can continue to prosper. How does that sound?");
				break;
			case 37:
				cm.gainExp(100000);
				cm.gainMeso(50000);
				cm.completeQ();
				cm.talkGuide("How nice it feels to help out the needy! Let's check back in at another time!", 0);
				cm.gainItem(food, -1);
				break;
			case 30:
				cm.changeJobById(2110);
				var skills = {21100000: 20, 21100002: 30, 21100004: 20, 21100005: 20};
				for (var skill in skills)
					cm.teachSkill(skill, 0, skills[skill], -1);
				cm.completeQ();
				cm.talkGuide("Let's see what the Master Thief has to say! It seems he has a quest for us.", 0);
				cm.dispose();
				break;
			case 31:
				cm.sendOk("Then I want you to do something about this sickness that's plagueing the town. I need you to apply the skills you learned with #bSejan#k and find a source of food for these starving people.\r\n\r\nCheck nearby #eHenesys Market#n. I'm sure there's someone there with a purse heavier than he needs.\r\nIf you can, bring me back some #i"+food+"# for the people.");
				break;
            case 28:
                cm.sendSimple("The statue's rumbles, and then a deep voice speaks out: \"What do you wish to learn?\" (Read all options)\r\n\r\n#b#L0#What is the thief network?\r\n#L1#Who are you?\r\n#L2#How do I get missions?"+(intel && how && who ? "\r\n#L3##e#rThat's all I need for now#n#k" : "")+"");
                break;
            case 29:
            	cm.sendAcceptDecline("You can accept my offer at any time you wish to leave.\r\n\r\nAre you willing to leave now?");
            	break;
            default:
                if (cm.getBossLog('Aran') == 0) {
                    cm.setBossLog('Aran');
                    cm.warp(maps[s]);
                    cm.dispose();
                } else {
                    cm.sendOk("Our network is unable to reach you at this time; we are spread too thin to move you. You should wait some time (about a day) so we can reorganize our men and sneak you in.");
                    cm.dispose();
                    break;
            }
        }
    } else if (status == 2) {
        if (cm.getJobId() >= 2100) {
            switch(cm.getQ()) {
				case 43:
					cm.sendAcceptDecline("I'll need something else to process this material. If you can head into an area called #bNeo City#k and grab 150 #i" + armor + "#, which I can convert to a device that will allow us to track where the next threats are coming from.");
					break;
				case 41:
					cm.sendOk("Good. Come back with 50 #i"+kimono+"# and 10 #i"+bamboo+"#");
					cm.completeQ();
					break;
				case 38:
					cm.sendNext("There's a few spots I need you to check out; more specifically places where the food is distributed. If we can target these places, then they're sure to fall. We can start here, in Henesys, but there are other areas as well, such as Kerning City, Lith Harbor, and Nautilus Harbor. You can choose to start anywhere you wish, but at the end of the day you must bring back supplies from each of these locations.");
					break;
				case 31: 
					cm.talkGuide("The organization is depending on us to make a difference in people's lives!", 0);
					cm.talkGuide("Let's go to the Henesys Market and see who is despicable enough for us to thieve from!", 5);
					cm.completeQ();
					cm.dispose();
					break;
                case 28:
                	if (s == 3) {
                		cm.sendOk("Okay, talk to me again if you have the time.");
                		cm.completeQ();
                		cm.dispose();
                	} else {
	                	if (s != -1) {
	                		sel = s;
	                		if (sel == 0)
	                			intel = true;
	                		else if (sel == 1)
	                			who = true;
	                		else
	                			how = true;
	                	}
			            cm.sendNext(info[sel][progress]);
			            progress++;
			            status = 1;
			            if (progress >= info[sel].length)
			            	resetInfo();
                	}
		            break;
                case 29:
                	cm.warp(100000000,0);
                	cm.sendOk("#bI#k will call upon you and give you your next task when you're needed. To access our current task log, click on the helper nearby you to find " +
                			"receive information on the latest quest.");
                	cm.completeQ();
                	cm.dispose();
                	break;
                default:
                	cm.dispose();
                	break;
            }
        }  
    } else if (status == 3) {
		switch(cm.getQ()) {
			case 43:
				cm.sendOk("Grab me 200 #i"+armor+"# and we'll be able to prepare for the worst.");
				cm.completeQ();
				break;
			case 38:
				cm.sendOk("Check out these following locations:\r\n\r\n#eHenesys\r\nKerning City\r\nLith Harbor\r\nNautilus Harbor");
				cm.completeQ();
				cm.dispose();
				break;
		}
	}
}

function resetInfo() {
    status = 0;
    progress = 0;
}