var pq_selections = {2094000: "Pirate", 9020000: "Kerning", 9103001: "Ludibrium Maze", 9000001: "2nd Monster Carnival", 9201048: "Amoria"};
var level_range = {2094000: [65, 100], 9020000: [21, 30], 9103001: [51,70], 9000001: [51, 80], 9201048: [40,200]};

function start() {
	if (cm.getMapId() == 109040000) {
		var number = 1;
		var text = "These are the PQs you can participate in at the moment!\r\n";
		for (npc in pq_selections)
			text += "\r\n#L" + npc + "##e"+ number++ +". #n" + pq_selections[npc] + " ("+ level_range[npc][0] + " to " + level_range[npc][1] +")";
		cm.sendSimple(text + "\r\n#L999#Exit");
	} else {
		if (cm.getParty() == null) {
			cm.sendNext("This second version of Monster Carnival is #ecustom#n made just for the #bDynasty#k!");
		}
		cm.dispose();
	}
}

function action(m,t,s) {
	if (m == -1 || s == 999) {
		cm.sendOk("It's a shame, but maybe I'll see you next time!");
		cm.dispose();
		return;
	}
	cm.openNpc(s);
}


/*
var status = 0;

function start() {
    cm.sendNext("Hey, I'm #bJean#k. I am waiting for my brother #bPaul#k. He is supposed to be here by now...");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("Hmm... What should I do? The event will start, soon... Many people went to participate in the event, so we better be hurry...");
        } else if (status == 2) {
            cm.sendSimple("Hey... Why don't you go with me? I think my brother will come with other people.\r\n#L0##e1.#n#b What kind of an event is it?#k#l\r\n#L1##e2.#n#b Explain the event game to me.#k#l\r\n#L2##e3.#n#b Alright, let's go!#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("All this month, MapleStory Global is celebrating its 3rd anniversary! The GM's will be holding surprise GM Events throughout the event, so stay on your toes and make sure to participate in at least one of the events for great prizes!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("There are many games for this event. It will help you a lot to know how to play the game before you play it. Choose the one you want to know more of! #b\r\n#L0# Ola Ola#l\r\n#L1# MapleStory Maple Physical Fitness Test#l\r\n#L2# Snow Ball#l\r\n#L3# Coconut Harvest#l\r\n#L4# OX Quiz#l\r\n#L5# Treasure Hunt#l#k");
            } else if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001) 
						cm.divideTeams();
        
					cm.getEvent().minusLimit();
					cm.warp(cm.getEvent().getMapId());
					cm.dispose();
				} else {
					cm.sendNext("Either the event has not been started, you already have the #bScroll of Secrets#k, or you have already participated in this event within the last 24 hours. Please try again later!");
					cm.dispose();                
            }
			}
        } else if (status == 4) {
            if (selection == 0) {
                cm.sendNext("#b[Ola Ola]#k is a game where participants climb ladders to reach the top. Climb your way up and move to the next level by choosing the correct portal out of the numerous portals available. \r\n\r\nThe game consists of three levels, and the time limit is #b6 MINUTES#k. During [Ola Ola], you #bwon't be able to jump, teleport, haste, or boost your speed using potions or items#k. There are also trick portals that'll lead you to a strange place, so please be aware of those.");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[MapleStory Physical Fitness Test] is a race through an obstacle course#k much like the Forest of Patience. You can win it by overcoming various obstacles and reach the final destination within the time limit. \r\n\r\nThe game consists of four levels, and the time limit is #b15 MINUTES#k. During [MapleStory Physical Fitness Test], you won't be able to use teleport or haste.");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[Snowball]#k consists of two teams, Maple Team and Story Team, and the two teams duke it out to see #bwhich team rolled the snowball farther and bigger in a limited time#k. If the game cannot be decided within the time period, then the team that rolled the snowball farther wins. \r\n\r\nTo roll up the snow, attack it by pressing #bCtrl#k. All long-ranged attacks and skill-based attacks will not work here, #bonly the close-range attacks will work#k. \r\n\r\nIf a character touches the snowball, he/she'll be sent back to the starting point. Attack the snowman in front of the starting point to prevent the opposing team from rolling the snow forward. This is where a well-planned strategy works, as the team will decide whether to attack the snowball or the snowman.");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[Coconut Harvest]#k consists of two teams, Maple Team and Story Team, and the two teams duke it out to see #bwhich team gathers up the most coconuts#k. The time limit is #b5 MINUTES#k. If the game ends in a tie, an additional 2 minutes will be awarded to determine the winner. If, for some reason, the score stays tied, then the game will end in a draw. \r\n\r\nAll long-range attacks and skill-based attacks will not work here, #bonly the close-range attacks will work#k. If you don't have a weapon for the close-range attacks, you can purchase them through an NPC within the event map. No matter the level of character, the weapon, or skills, all damages applied will be the same.\r\n\r\nBeware of the obstacles and traps within the map. If the character dies during the game, the character will be eliminated from the game. The player who strikes last before the coconut drops wins. Only the coconuts that hit the ground counts, which means the ones that do not fall off the tree, or the occasional explosion of the coconuts WILL NOT COUNT. There's also a hidden portal at one of the shells at the bottom of the map, so use that wisely!");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX Quiz]#k is a game of MapleStory smarts through X's and O's. Once you join the game, turn on the minimap by pressing #bM#k to see where the X and O are. A total of #r10 questions#k will be given, and the character that answers them all correctly wins the game. \r\n\r\nOnce the question is given, use the ladder to enter the area where the correct answer may be, be it X or O. If the character does not choose an answer or is hanging on the ladder past the time limit, the character will be eliminated. Please hold your position until [CORRECT] is off the screen before moving on. To prevent cheating of any kind, all types of chatting will be turned off during the OX Quiz.");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[Treasure Hunt]#k is a game in which your goal is to find the #btreasure scrolls#k that are hidden all over the map #rin 10 minutes#k. There will be a number of mysterious treasure chests hidden away, and once you break them apart, many items will surface from the chest. Your job is to pick out the treasure scroll from those items. \r\nTreasure chests can be destroyed using #bregular attacks#k, and once you have the treasure scroll in possession, you can trade it for the Scroll of Secrets through an NPC that's in charge of trading items. The trading NPC can be found on the Treasure Hunt map, but you can also trade your scroll through #bVikin#k of Lith Harbor.\r\n\r\nThis game has its share of hidden portals and hidden teleporting spots. To use them, press the #bup arrow#k at a certain spot, and you'll be teleported to a different place. Try jumping around, for you may also run into hidden stairs or ropes. There will also be a treasure chest that'll take you to a hidden spot, and a hidden chest that can only be found through the hidden portal, so try looking around.\r\n\r\nDuring the game of Treasure Hunt, all attack skills will be #rdisabled#k, so please break the treasure chest with the regular attack.");
                cm.dispose();
            }
        }   
    }
}  */