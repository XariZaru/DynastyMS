var status = -1;

importPackage(Packages.server.life);
var balrog_item = 4001261;

function start() {
	if (cm.haveItem(4031906,1)) {
		var map = cm.getPlayer().getEventInstance().getMapInstance(105100400);
		var players = cm.getPlayer().getEventInstance().getPlayers().toArray();
		
		for (var x = 0; x < players.length; x++) {
			players[x].changeMap(map, map.getPortal(0));
			players[x].getEventInstance().getEm().setProperty("stage", "3");
		}
		cm.gainItem(4031906, -cm.itemQuantity(4031906));
		
		var body = MapleLifeFactory.getMonster(8830000);
		var arm1 = MapleLifeFactory.getMonster(8830001);
		var arm2 = MapleLifeFactory.getMonster(8830002);
		
		if (cm.getPlayer().getJob().getId() < 2000) {
			arm1.setHp(15000000);
			arm2.setHp(15000000);
			body.setHp(50000000);
		} else {
			arm1.setHp(2000000);
			arm2.setHp(2000000);
			body.setHp(5000000);
		}
		
		cm.getPlayer().getEventInstance().registerMonster(arm1);
		cm.getPlayer().getEventInstance().registerMonster(arm2);
		cm.getPlayer().getEventInstance().registerMonster(body);
		
		map.spawnMonsterOnGroundBelow(arm1,479,258);
		map.spawnMonsterOnGroundBelow(arm2,479,258);
		map.spawnMonsterOnGroundBelow(body,479,258);
		cm.dispose();
	} else if (cm.getMapId() == 105100400 && cm.haveItem(balrog_item, 1)) {
		cm.gainItem(balrog_item, -cm.itemQuantity(balrog_item));
		cm.getPlayer().completeDynastyQuest("Unlocking a Hidden Power");
		cm.getPlayer().dropMessage(5, "[Mu Young] That was amazing! Come talk to me!");
		cm.getPlayer().getEventInstance().removePlayer(cm.getPlayer());
		cm.dispose();
	} else {
		cm.sendYesNo("Would you like to leave?");
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		if (cm.getPlayer().getEventInstance() != null)
			cm.getPlayer().getEventInstance().removePlayer(cm.getPlayer());
		else
			cm.warp(105100400);
	}
}