var commands = ["@dispose: Disposes you in case you're stuck", "@bug: Notifies the server of a bug/glitch",
                "@gm <message>: Calls a GM with a message of your issue", "@uptime: Checks how long the server has been running",
                "@whodrops <item name>: Checks what mobs drop the specified item", "@bosshp: Checks how much HP is left in a boss",
                "@online: Displays the current players online", "@quest: opens up quest log", "@guide: disables or enables the guide that follows you"];

function start() {
	text = "Here is a list of DynastyMS's current command list.#b\r\n\r\n";
	
	for (var x = 0; x < commands.length; x++) {
		text += commands[x] + "\r\n";
	}
	
	cm.sendOk(text);
	cm.dispose();
}