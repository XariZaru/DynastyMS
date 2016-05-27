var npcs = [1012000, 9310058, 9201082, 1052014, 9200000,1022101, 9300008];
var scripts = ["travel", "buystuff", "commands","utilities","","","others"];

function start() {
	if (cm.getLevel() < 10) {
		cm.sendOk("You may not use my services until you reach level 10.");
		cm.dispose();d
	} else {
	   cm.sendSimple("Hey, #r#h ##k, what would you like to do?#b\r\n", "I want to go somewhere", 
			   "I want to buy something", "I want to see the server's commands", "I want to use server utilities\r\n", 
			   "Speak with Cody (Boss Manager)", "Speak with Rooney (Daily Prize)", "#eSpeak with Others#n");
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