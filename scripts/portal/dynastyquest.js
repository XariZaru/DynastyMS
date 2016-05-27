function enter(pi) {
    if (pi.getMap(105040401).getPlayerCount() > 0 || pi.getMap(105040400).getPlayerCount() > 0) {
        pi.getPlayer().dropMessage(6,"There is a player inside. You may not enter until he or she leaves.");
        return false;
    } 
	//var exped = pi.getEventManager("ZakumBattle").getInstance("ZakumBattle_" + pi.getPlayer().getClient().getChannel());
	//if (exped != null) {
	//	pi.getPlayer().dropMessage(6,"The battle at Zakum's Altar is currently underway.");
    //    return false;
	//}
    pi.warp(105040400,0);
    return true;
}