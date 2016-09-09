package client.listeners;

import java.util.EventObject;

import client.MapleCharacter;
import client.inventory.Item;

public class DropEvent extends EventObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6837072931428574700L;
	Item item;
	MapleCharacter owner;
	
	public DropEvent(Object source, Item item, MapleCharacter owner) {
		super(source);
		this.item = item;
		this.owner = owner;
	}
	
	public Item getItem() {
		return item;
	}
	
	public MapleCharacter getOwner() {
		return owner;
	}

}
