package client.listeners;

import java.util.EventListener;

public interface DropListener extends EventListener {

	void drop(DropEvent event);
	
}
