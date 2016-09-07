package listeners;

import client.MapleCharacter;

public interface DonorPetListener {

	void setType(int type);
	void displayResults(MapleCharacter chr);
	void setWatchedItem(int item);
	
	int getType();
	int getWatchedItem();
}
