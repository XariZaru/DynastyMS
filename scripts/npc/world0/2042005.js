var status = -1;
var lobbies = [980031000, 980032000, 980033000];
var selected_lobby;

importPackage(Packages.tools);

function start() {
	if (cm.getParty() == null) {
		cm.sendNext("The 2nd Monster Carnival is an area of festivities where we frolic with monsters from all around the world! By tuning in to this great festivity, I'm sure you'll have a ton of fun!");
	} else if (cm.isLeader()) {
		var text = "Which rooms do you wish to enter?\r\n";
		for (var x = 0; x < lobbies.length; x++)
			if (isFree(lobbies[x]))
				text += "\r\n#L"+lobbies[x]+"##m" + lobbies[x] + "# ("+(cm.getParties(lobbies[x]).size() == 0 ? "Free" : cm.getParties(lobbies[x]).toArray()[0].getLeader().getPlayer().getName() + "'s party")+")";
		cm.sendSimple(text + "\r\n#L999#Exit");
	} else {
		cm.sendOk("Please have the leader of your group speak with me to begin the game.");
		cm.dispose();
	}
	
}

function action(m,t,s) {
	if (m != 1 || s == 999) {
		cm.sendOk("Catch you next time then!");
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		if (cm.getParty() == null) {
			cm.sendNext("By creating a party of at least #b1#k person, I'll be able to match you with another party and you two can compete to your hearts content!");
		} else {
			if (cm.getPlayerCount(s) == 0) {
				cm.warpParty(s);
				cm.dispose();
			} else {
				selected_lobby = s;
				cm.sendAcceptDecline("This is the party you are about to send an invitation to. Do you still wish to send your invitation?\r\n\r\n" + cm.getPlayersInfo(selected_lobby));
			}
		}
	} else if (status == 1) {
		if (cm.getParty() == null) {
			cm.sendOk("The game itself is fairly simple! Here are the instructions!\r\n\r\n#eRules!#n\r\nParties compete on different maps. Each monster a player kills adds points to the total score and gives them current points which can be spent on summoning permanent monsters on the other team.\r\n\r\nUpon reaching 100 points, a #bfever#k time comes on and all monsters give 2x EXP for 10 seconds!\r\n\r\nThe party with the most points at the end of 10 minutes wins a substantial amount of experience, while the losing party isn't so lucky.");
			cm.dispose();
		} else {
			cm.sendOk("Your invitation has been sent to the leader of the opposing party. If they accept, then you will be brought in.");
			openNPCForPlayer(cm.getParties(selected_lobby).toArray()[0].getLeader().getPlayer(), "A party wishes to challenge you to a Monster Carnival event. Do you accept? This is the party in question:\r\n\r\n" + partyInfo(cm.getParty()));
			cm.dispose();
		}
	}
}

function isFree(mapid) {
	return cm.getParties(mapid).size() < 2 && (cm.getPlayerCount(mapid + 100) == 0 && cm.getPlayerCount(mapid + 200) == 0);
}

function openNPCForPlayer(player, message) {
	player.getClient().announce(MaplePacketCreator.getNPCTalk(2042005, 0, message, "00 00", 0));
}

function partyInfo(party) {
	var text = "";
	var members = party.getMembers().toArray();
	for (var x = 0; x < members.length; x++)
		text += members[x].getPlayer().getName() + ": Level " + members[x].getPlayer().getLevel() + "\r\n";
	return text;
}