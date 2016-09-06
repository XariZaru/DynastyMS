package client.inventory;

import client.MapleCharacter;

public interface IDonorPetFeature {

	void setType(int type);
	void displayResults(MapleCharacter chr);
	void setWatchedItem(int item);
	
	int getType();
	int getWatchedItem();
}
