var npcs = [1012000, 9310058, 9201082, 1052014, 9250052, 9200000, 1022101, 9300008];
var scripts = ["travel", "buystuff", "commands","utilities","","","","others"];
var cm = null;

function start() {
	cm = cm;
	if (cm.getLevel() < 8) {
		cm.sendOk("You may not use my services until you reach level 8.");
		cm.dispose();
	} else {
	   cm.sendSimple("Hey, #r#h ##k, what would you like to do?#b\r\n", "I want to go somewhere", 
			   "I want to buy something", "I want to see the server's commands", "I want to use server utilities (check mob drops, etc.)", "I want to see the patch notes\r\n", "Speak with Cody (Boss Manager)", "Speak with Rooney (Daily Prize)", "#eSpeak with Others#n#k#l\r\n\r\n\r\n" + canVote());
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
	if (cm.getPlayer().canVoteGTOP())
		txt += "You can now vote at #dGTOP 100#k!\r\n";
	if (cm.getPlayer().canVoteUltimate())
		txt += "You can now vote at #dUltimate Private Servers#k!"
	return txt + "#b";
}