var npcs = [/*1012000,*/ 9310058, 1012004, 1052014, /*9250052,*/ 9200000, /*1022101,*/ 9201107, /*9300008,*/];
var scripts = [/*"travel",*/ "buystuff", "petFeatures","utilities",/*"",*/"",/*"",*/"",/*"others"*/];
var cm = null;

importPackage(Packages.tools);
importPackage(Packages.tools);
importPackage(Packages.java.sql);
importPackage(Packages.java.lang);

function start() {
	
	if (cm.getLevel() < 8) {
		cm.sendOk("You may not use my services until you reach level 8.");
		cm.dispose();
	} else {
	   cm.sendSimple("Hey, #r#h ##k, what would you like to do?#b\r\n", /*"I want to go somewhere",*/ 
			   "I want to buy something", "I want to access the pet features (donators only)", "I want to use server utilities (check mob drops, etc.)", /*"I want to see the patch notes\r\n",*/ "Speak with Cody (PQ and Bosses)", /*"Speak with Rooney (Daily Prize)",*/ "Master Warrior (Side Quests)#l" /*"#eSpeak with Others#n#k#l",*/+ "#k\r\n\r\n\r\n" + canVote());
	}
}

function action(mode, type, selection, status) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    
    if (status == 0) {
    	cm.openNpc(npcs[selection], (scripts[selection] != "" ? scripts[selection] : null));
    }
}

function canVote() {
	var txt = "";
	if (canVoteGTOP())
		txt += "You can now vote at #dGTOP 100#k!\r\n";
	if (canVoteUltimate())
		txt += "You can now vote at #dUltimate Private Servers#k!"
	return txt + "#b";
}

function canVoteGTOP() {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * from votingrecords WHERE ip = ? AND account = ? AND siteid = 1");
	ps.setString(1, cm.getClient().getIP());
	ps.setString(2, cm.getClient().getAccountName());
	
	var rs = ps.executeQuery();
	var can_vote = true;
	
	if (rs.next()) 
		can_vote = ((System.currentTimeMillis() - (rs.getInt("date") * 1000)) >= 86400000);
	
	ps.close();
	rs.close();
	return can_vote;
}

function canVoteUltimate() {
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * from votingrecords WHERE ip = ? AND account = ? AND siteid = 2");
	ps.setString(1, cm.getClient().getIP());
	ps.setString(2, cm.getClient().getAccountName());
	
	var rs = ps.executeQuery();
	var can_vote = true;
	
	if (rs.next()) 
		can_vote = ((System.currentTimeMillis() - (rs.getInt("date") * 1000)) >= 86400000);
	
	ps.close();
	rs.close();
	return can_vote;
}