var status;
// <editor-fold defaultstate="collapsed" desc="Storyline Quests">
var quests = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,42,43,44,45,46,47,48,49,50,51,52,53,54,55
        ,56,57,58,59,60],
    [1,2,3,4,5,6,7,8,9,10,12,15,17,18,19,20,21,22,23,24,25,27,31,32,33,34,35,36,37,38],[]];
var names = 
    // <editor-fold defaultstate="collapsed" desc="Names for Explorer">
        [["A Night in the City", "Finding a Jolly Old Man", "We Found Him!", "Cliff, the Holiday Assistant", "Package Delivered!", "Setting Fire to the Skies", "A Job Well"+
                " Done", "A Night in Happyville", "A Night in Happyville : Part 2", "A Night in Happyville : Part 3", "A Night in Happyville : Part 4",
              "The Man in the Red Suit", "A Dedicated Employee", "A Peaceful Night", "Lost at the Harbor", "The Explorer Heritage", "The Man in the Weird"+
                  " Suit", "Impatience is intolerable!", "Sticky and Slimy", "Suited and Geared!", "A New Profession", "The Dirty Work", 
                "The Dirty Work : Part 2", "The Dirty Work : Part 3", "Settling Down", "Another Power?", "The Suspicious Man", "Detective Work", 
                "Detective Work : Part 2", "Detective Work : Part 3", "Detective Work : Part 4", "Detective Work : Part 5", "A Pat on the Back",
            "A Promotion Well Earned", "Something Amiss", "Retaliation!", "Aggression Rises", "An Undercover Agent", "A Shadow Rises", "The Stealthy One",
        "Cleaning Up Loose Ends", "The Ends Are Tied", "Fighting Revenge", "The Lonely Bones", "The Portals Into Darkness", "Beginnings of an Armistice",
    "A Treaty with the Devils", "A Blood Treaty with the Devils", "A New Power In Mind?", "A Well-Earned Promotion", "Taking the Initiative", "Manji, the"+
        " Silent One", "One for the Team", "Preparations to Strike", "A General of the Rebels", "A Very Old Man"],
    // </editor-fold>    
    //<editor-fold defaultstate="collapsed" desc="Names of KoC">
    ["Perzen, the Commanding Officer", "A Simple Task", "Another Task in Mind", "A Slime to the Grave", "Progress is Quick", "Medicine"+
                " for a Woman", "Complacency", "My Reward?", "Finding Agent E", "Farm Work", "Allied Suppliers", "Man, You Are Good",
        "A Promotion is Always Nice", "Mission Into the Water", "A Reluctant Dolphin", "Kenta, the Elusive", "The Traitor Arises",
        "An Elusive Traitor", "A Treaty for Aqua Town", "An Even Better Plan", "An Even Better Plan : Part 2", "Something Bigger Than Us",
        "Amelia Pond", "Preparations for the Future", "Back to the Aqua", "A Lucrative Plan", "A Successful Lucrative Plan", "A Deep Plunge",
        "A Hunt for Jay"],
    //</editor-fold>

    []];
var details = 
        //<editor-fold defaultstate="collapsed" desc="Text for Explorer">
[["You're vacationing in Happyville. Perhaps you should find your mom and dad and see if you can help them with anything.\n\
","Mom and Dad told you to find a man called Santa and help him prepare for the holiday festitivites. He should be nearby in the town of Happyville.",
  "You found Santa. He was just a little-ways to the west from your parents. Perhaps it's time to see what he requires from you.",
  "Santa gave you a package of goods to deliver to Cliff. Santa told us Cliff should be in the town as well, dressed in red apparel.",
  "You found Cliff and delivered Santa's supplies to him as required. It's time for you to head back to Santa for more tasks.",
  "Santa gave you a package of fire-works that should be in your USE inventory. Set them off and speak with Santa once more.",
  "You've done quite a lot of work during the short time you had with Santa. It's time to find your parents and see what they've been up to this whole time.",
  "Mom and Dad want you to find tickets for the hotel in Happyville. They said a man named Simon should be in charge of ticketing. You should find him nearby.",
  "Simon decided to give you the tickets for free because of your job well done with Santa. This is fantastic. You should bring these tickets to them and"+
      " tell them of the good news.",
  "Your parents seemed ecstatic enough to give you a weapon of your choice. They also seemed to wish to speak to you again. You shouldn't keep"+
          " them waiting.",
  "You've checked into a remarkable hotel with glistening lights and a shining atmosphere. Talk with your parents to see attend to their needs.",
  "You were told to find Cliff once again. He seems to be running errands all over the place. Maybe it's a good time to give him a small break.",
  "You were made a dedicated employee of Santa's staff and were welcomed to come back any time you wished. Mom and Dad should hear of this good news.",
  "The night at the inn was spectacular. You should see to your parents; perhaps it's time to leave.",
  "You were separated from your parents during the ship ride. You should find them as soon as possible before the next train leaves you and your parents behind.",
  "The Explorers were once might warriors that possessed strength beyond recognition. They constantly strive for a better life. Your parents were once"+
      " the greatest explorers of the land. They told you to pick up their mantle and become one yourself. One of the statues to the right should show you"+
        " the way.",
  "You were teleported to a location elsewhere, and in your pockets you find potions and change. Your best bet would be to talk to the man to the right in the"+
      " weird and funky clothing.",
  "Taeng the Explorer seems to be in charge of the Explorer sect of Ellinia. Speak to him again to find out your first task.",
  "Apparently Taeng believes you are too weak to be of any use of him. He told you to train on these things called Slimes in the area to the left until"+
      " level 10.",
  "We reached level 10 and Taeng seemed quite pleased with your efforts. Speak to him again to discover his wishes.",
  "Taeng gave you a job of your choice and preferred for you to return at level 18. We should grind on some of those sticky things once more.",
  "You were told to hunt monsters that yield green mushroom caps and leaves. Perhaps some traveling should be planned in your book from now on. You need"+
      " to collect 60 leaves and 40 green mushroom caps.",
  "You were given a pat on the back for a job well done. Stemming the tide of the monsters is an honorable job in any community.",
  "Taeng has given you one more task, though he did mention it would be a tedious one. He wants you to collect 50 horny mushroom caps from monsters nearby Ellinia.",
  "You completed the task set out before you and must train until you are stronger. Taeng said you may be ready for a test at level 30.", 
  "Taeng spoke of an undercover agent down in the depths of a neutral town called Sleepywood. Find the agent and speak to him to recover information."+
      " The code word was \r\n\"#ePidgeon#n.\"",
  "You found the suspicious looking agent that Taeng described in the depths of Sleepywood. You should talk to him and find out more about his discoveries.",
  "Apparently, Taeng wants you to investigate the Sleepywood Sauna and dig up answers to why the Loyalists are present in neutral territory. \"Start from the"+
      " lower chain of command\", he said.",
      "You spoke with Agent C, but he didn't seem to know the true secrets behind this covert operation. Perhaps speaking to another representative will help.",
  "Agent O didn't seem to understand anything as well. At best, he was just as confused as Agent C was. Perhaps speaking with another agent will clarify this whole conundrum.",
  "Score! You found some reasons to why the Cygnus Knights have arrived in Sleepywood. If you can manage to weasle some information from their commander you may report back "+
          " to the undercover agent.",
          "It seems the lead commander didn't wish to speak to the likes of you. You should report to the suspicious agent and present to him with what"+
              " you have learned.",
  "The agent was glad with what you had found. He seems to have another task in mind for you.",
  "The agent congratulated you and decided to give you a promotion; however, he requested that you spend time at the Sleepywood Sauna to think things"+
      " over. His advice is sound, and Lilin believes so, too. Why not give it a shot?",
      "The receptionist was friendly enough, but she warned you to stay away from commotion. What does she mean? Is something terrible happening in the hotel?",
  "Agent E ordered some of her agents onto you. Defeat them and settle this dispute with Agent E afterwards.",
  "The aggression in Sleepywood has reached an apex. You should speak with your agent for further instruction.",
  "Your agent outfitted you in loyalist armor, worthy of the most infamous generals. He wishes to speak with you further, no doubt to coach you.",
  "You have learned your verses and are ready to infiltrate the agents' command structure. Speak with each of the agents accordingly.",
  "You possess the information needed to thwart the Loyalist schemes. Present the information to your agent to continue the job.",
  "The agent told you to confiscate any remaining documents. You'll have to bother Agent E one last time to finish the deed.",       
  "With the deeds in the agent's hands, you've been turned over to Taeng once more for further tasks. Report back to him at Ellinia.",
  "Apparently there have been recent influxes of monsters throughout the continent. Taeng's supplies are constantly harrassed by beasts other than the"+
      " loyalists. He's tasked you with the goal of eliminating a skeletal horde at Remains <Tomb> IV, and requested that you deliver to him"+
  " 10 horse skulls and 50 pelvic bones.", "You've delivered the bones to Taeng the Explorer and he seems absolutely thrilled! You've done a great job."+
  " Report back to him later for updates on the bones.", "Taeng found traces of energy leading back to portals all around the continent. He's commanded"+
  " that you enter one of them and investigate. Perhaps there's something to find, or something to kill ...", "The emblem seemed to have unnerved Taeng,"+
  " who insisted that you visit Orbis to find a man named Agent M. You may talk to Taeng for further information on the matter.", "Agent M is drafting"+
  " the treaty. Perhaps you should speak to him again; he seems to have finished outlining the core specifics.", "It seems Agent M is confident in his"+
  " signing of the armistice. The monster threat must be much larger than he expected. Bring the treaty back to Taeng in Ellinia.", "You've successfully"+
  " secured a treaty with the Knights of Cygnus to declare an armistice. You can be sure of total resistance toward the monster threat. Taeng will"+
  " continue to be your commanding officer. Report to him immediately. He seems to be eager to tell you something.", "You have been promoted to a "+
  " secondary Explorer, a title that is renowned in any explorer unit. Taeng insists that you return to him for more tasks; with the explorer threat"+
  " growing one cannot be too lenient. It's time to face your foes with severe voracity.", "Your first task involving the allegiance with the Loyalists"+
  " concerns material goods and supplies for your newly found ally. Taeng has told you to leave for Perion and meet with the supplier.", "Manji"+
      " was the supplier, but seemed quite interested in your abilities. She has given you the necessary supplies and it's your job to return them to"+
  " Taeng as soon as possible. Perhaps you can speak to her another time ...", "You delivered the goods to Taeng and he thanked you for them. He asked you to come back later when he wasn't busy. Perhaps he has something to say to you?.",
  "Taeng told you of the stories of Ellinia, Perion, and Lith Harbor. He was full of memories and emotion. It was nice to finally hear and receive the stories of the old world from someone as experienced as he is.",
    "Taeng promoted you to a general of the Rebel army so that you may lead the men into battle against the monsters. Your promotion has come long last, and he has given you your final set of skills for the coming battles.", "Taeng told you that you can receive your proper skills and training at Grendel the Really Old, who resides in his Magic Library at the top of Ellinia."],
    //</editor-fold>
        // <editor-fold defaultstate="collapsed" desc="Text for KoC">
    ["You've introduced yourself to Perzen, but he seems to have something else in mind for you.", "Perzen has commanded you to bring him"+
            " five snail shells, and to reach level 2 before you speak to him again. There are all types of small monsters roaming in"+
        " the local town. Most are docile, but some are aggressive. Eliminate some of the green snails and report back to Perzen once"+
    " you have completed your task.", "Perzen seemed satisfied at your attempt to complete his task. He may have other tasks in mind."
    , "Perzen has requested that you bring him 3 of the squishy liquids that fall off of a slime upon death. There are a few slimes"+
        " in the town itself. Collecting them should be easy.", "You retrieved 3 squishy liquid easily and turned them in to Perzen"+
    ". Continue with your training to hit new levels.", "Perzen gave you a strange looking bottle that contains many herbs. He told you"+
" to give it to a woman called Loha. Perhaps you may find her in the village nearby.", "You've turned in the bottle of medicine to Loha, but"+
" Perzen doesn't seem to have anything else for you to do. Perhaps you should train until he's ready with another assignment.", "You've been promoted"+
" to a rank 1 Knight of Cygnus. Your work seems to be done here. Training in Altaire should never extend for long periods of time. The Empire never"+
" stays sedentary. Report to Perzen one last time.", "Perzen shipped you off to a bright town named Henesys. He left you a message and"+
" said to find a woman named Agent E, who should be in charge of all Imperial activity on the continent. You are to find her immediately"+
" and start your first task.", "Agent E told you to hunt down pigs as they have been disrupting imperial supply lines for quite some"+
" time. She requires 10 leather and 2 pig heads as trophies and proof of your completion of the task.", "Your commanding officer,"+
" Agent E, has assigned to you a more important task. You are to enter Kerning City and deliver messages to three of the cities most"+
" important men. Afterwards, report back to Agent E as soon as possible.", "The letters have been delivered as Agent E had requested."+
" She seems to have more in store for your capabilities, but has withdrawn that opportunity until you have reached a more sufficient"+
" level.", "Agent E has promoted you to a second rank Cygnus Knight, but that doesn't mean you can stop here. She is sure to have tasks"+
" for you that extend to even further reaches of the continent.", "You've been tasked with subduing a potential threat in an imperial"+
" colony named Aquarium. It sits in the continent of Ossyria, which is home to the imperial capital, Orbis.", "The dolphin you spoke"+
" with seemed to know who the traitor is, but is unwilling to spill his secrets. He told you there are people inside the Zoo that"+
" may know who it is.", "Kenta told you to speak with Muse for she should know all about the traitor. Muse should be nearby in the Zoo,"+
" for she tends to the animals carefully.", "Muse told you Gerrard, the storage keeper of Aquarium, is the culprit. Find him in one"+
" of the main buildings and capture him.", "Gerrard refused to come with you to court. Apparently, you need to show evidence before"+
" making allegations. Dolphin might know how to pin this criminal down.", "Dolphin made you sign a treaty before handing over the"+
" suspicious items that could put Gerrard away for life. With this evidence, you can bring Gerrard in and convict him.",
"Gerrard has been convicted for his crimes against the empire. Instead of taking him in, you've decided to jot his name down instead and"+    
     " tell Agent M of the culprit. Agent E will come after, of course.", "Now that you've told Agent M of the culprit, it's time"+
    " to tell Agent E as well so she can update her archives.", "Agent E has noted that the monster threat has been growing much"+
" larger since the olden days. She's worried about the incoming refugees from the war and has asked you to run a check on them. She's"+
" provided a list of maps for you to follow and will repeat her instructions if you need her to.", "You met a refugee, Amelia Pond, who"+
" seems nice enough and has been under fear for quite a while. You've retrieved all the information needed to update a status on"+
" the immigrant condition.", "Agent E has decided based on our information that the monster threat has grown to a much more grave state."+
" She has ordered you to train harder than ever, and will be back to give you an assignment.", "Aquarium has been under siege by"+
" water creatures for quite some time. You should see Dolphin and have him brief you of the situation.", "Dolphin has requested that you honor the"+
" Empire's promises to Aquarium, so you have been tasked to embark on a journey to collect several items from the monsters around the sea.",
"You brought promise of economic success back to Aquarium; however, Dolphin seems to require some more help to get Aquarium back on its fins.",
"Dolphin has asked that you ask around the town about the mythical sharks before undergoing a task to kill them. What could be so fearsome about these"+
        " animals? Talk to the nearby residents of Aquarium to see who knows something about these dangerous predators.", "Kenta said"+
    " a boy named \"Jay\" is in possession of the book about the Aquarium Sharks. Kenta said he'd be on Victoria Island in one of the"+
" Imperials cities. You should look for Jay to quickly subdue Shark aggression against Aquarium's lucrative tourist attractions."],
// </editor-fold>  
    []];

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Other Quests">
var xnames = ["Receiving the Beta"]; 
var oquests = [[10000],[10001]]; // available, in progress
var odesc = ["You've heard someone around town is giving out free beta items to those who are new. Perhaps you should take a look."+
            "", "pew","damn"]; // for in progress
var npcname = ["Rooney"];
// </editor-fold>

var reqArray, reqDetails, reqNames, jobType, sel, available, progress, completed, onames, reqDesc;

// jobtype: 0 = explorer, 1 = KoC, 2 = aran

function start() {
    status = -1;
        if (cm.getLevel() <= 5) {
        	cm.sendNext("Hi! Welcome to #e#bDynastyMS#k#n. As a beginner, there'll be a lot of things that seem unfamiliar here compared to other" +
        			" Maplestory environments. Most notably, to be able to job advance you must complete the storyline. Everything on the server is" +
        			" geared towards customization. Everything from certain mob placements, transportation, PQs, and non-playable characters" +
        			" are made specially as a new form of interaction with the player.");
        } else {
            cm.sendNext("Hey, #b#h ##k! Let me retrieve a log of your current and past quests ...");
        }
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (cm.getLevel() <= 5) {
    	beginnerMessage();
    } else {
    	normalOptions(selection);
    }
}


function beginnerMessage() {
	if (cm.getQ()<1 && cm.getJobId()==1000) {
        cm.talkGuide("I think it's best if we find Perzen. He should be able to"+
            " help us get started in this world.");
    }
	cm.sendOk("Therefore, pay close attention to non-playable characters when they speak to you is imperative" +
			" to understanding the game. If you're lost you can always speak to me for information on your quests. " +
			"I can also tell you the unique non-playable characters that are specific to each major map if you want!\r\n\r\nAll these features" +
			" are available starting at #elevel 6#n.");
	cm.dispose();
}

function normalOptions(selection) {
	if (status == 0) {
	    (cm.getJobId()<900 ? jobType = 0 : cm.getJobId()>=1000 && cm.getJobId() < 2000 ? jobType = 1 : jobType = 2);
	    cm.sendSimple("Which of the following quest(s) or skills would you like to view?\r\n\r\n#b#L0#Storyline\r\n#L1#Other\r\n#L2#View Skills\r\n#L3#Unique characters on this map");
	} else if (status == 1) {
		sel = selection;
		if (selection == 0) {
		    cm.sendSimple("Would you like to view in-progress or completed quests?\r\n\r\n#b\r\n#L0#In Progress\r\n#L1#Completed");
		} else if (selection == 2) {
		    cm.sendOk("Here are your following skills ...\r\n\r\n#eSteal: "+cm.getPlayer().getSteal()+"\r\nPersuasion: "+
		            ""+cm.getPlayer().getPers()+"\r\nIntegrity: "+cm.getPlayer().getHonor()+"");
		    cm.dispose();
		} else if (selection == 3) {
			getUniqueNpc();
		} else {
		    cm.sendSimple("Would you like to view in-progress or completed quests?\r\n\r\n#b#L0#Available\r\n#L1#In Progress\r\n#L2#Completed");      
		}
	} else if (status == 2) {
		if (sel == 0) {
		        reqArray = new Array(), reqNames = new Array(), reqDetails = new Array();
		        text = "Which of the following "+(selection == 1 ? "completed" : "")+" quests would you like to open to view more details?\r\n#b";
		        for (var i = 0; i < quests[jobType].length; i++) {
		            (selection == 0 && cm.getQ()==quests[jobType][i]  ? (reqArray.push(quests[jobType][i]), reqDetails.push(details[jobType][i]), reqNames.push(names[jobType][i])) : status);
		            (selection == 1 && cm.getQ()>quests[jobType][i] ? (reqArray.push(quests[jobType][i]), reqDetails.push(details[jobType][i]), reqNames.push(names[jobType][i])) : status);
		        }
		        if (reqArray.length > 0) {
		            for (var i = 0; i < reqNames.length; i++) {
		            text += "\r\n#L"+i+"#"+(selection == 1 ? "#e#r[COMPLETED]#n#k" : "")+"#b "+reqNames[i]+"";
		            }
		           cm.sendSimple(text);
		        } else {
		            cm.sendOk(""+(selection == 0 ? "You are currently not undertaking any quests. Please try again once you've accepted a quest." : 
		                    "You do not have any finished quests. You can check again later once you have finished a quest.")+"");
		            cm.dispose();
		        }
		} else {
		    available = new Array(), onames = new Array(), reqDesc = new Array();
		    text = "Here are a following list of "+(selection == 0 ? "available" : selection == 1 ? "in-progress" : "completed")+" quests for you to look at.\r\n"
		    for (var i = 0; i < oquests[0].length; i++) {
		    (selection == 0 && !cm.iQC(oquests[0][i]) ? (onames.push(xnames[i])) : status);
		    (selection == 1 && cm.iQC(oquests[0][i]) && !cm.iQC(oquests[1][i]) ? (reqDesc.push(odesc[1][i]), onames.push(xnames[i])) : status);
		    (selection == 2 && cm.iQC(oquests[1][i]) ? (onames.push(xnames[i])) : status);
		    }
		    if (onames.length > 0) {
		        for (var i = 0; i < onames.length; i++) {
		            text += "\r\n#b"+(selection == 0 || selection == 2 ? ""+(selection == 2 ? "#e#r[COMPLETED]#n#k " : "")+""+onames[i]+"" : "#L"+i+"#"+onames[i]+"")+"";
		        }
		        (selection == 0 || selection == 2 ? (cm.sendOk(text), cm.dispose()) : cm.sendSimple(text));
		    } else {
		        cm.sendOk("You "+(selection == 1 ? "have no quests currently in progress." : "have no quests that are completed")+". Please"+
		            " try again later when you have undertaken or completed a task.");
		    cm.dispose();
		    }
		}
	} else if (status == 3) {
		if (sel == 0) {
		    cm.sendOk("#e"+reqNames[selection]+"#n#k\r\n_____________________________________________\r\n\r\n"+reqDetails[selection]);
		    cm.dispose();
		} else {
		    cm.sendOk("#e"+onames[selection]+"#n#k\r\n_____________________________________________\r\n\r\n"+reqDesc[selection]);
		}
	}
}

function getUniqueNpc(selection) {
	var maps = [100000000, 101000000, 102000000, 103000000, 104000000, 300000000];
	var npcs = [[],[],[],[],[], [2131003, 2131001, 2042009]];
	var descriptions = {
			2131003 : "Desc 1", 2131001 : "Desc 2", 2042009 : "Desc3"
	};
	
	if (status == 1) {
		text = "The current unique NPCs on this map are: \r\n";
		index = maps.indexOf(cm.getMapId());
		if (index != -1) {
			for (var x = 0; x < npcs[index].length; x++) {
				text += "\r\n#L"+x+"##p" + npcs[index][x] + "#";
			}
		}
		cm.sendSimple(text);
	} else if (status == 2) {
		cm.sendOk("Wut.");
		cm.dispose();
	}
}