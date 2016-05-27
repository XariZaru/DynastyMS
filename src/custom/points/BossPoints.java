package custom.points;

import client.MapleCharacter;

public class BossPoints implements IPoints {
	
	MapleCharacter player;
	
	public BossPoints(MapleCharacter player) {
		this.player = player;
	}

	@Override
	public void addPoints(int add) {
		player.gainBossPoints(add);
	}

	@Override
	public int getPoints() {
		return player.getBossPoints();
	}


}
