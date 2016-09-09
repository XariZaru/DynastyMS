package client.listeners;

import java.util.EventListener;

public interface MobDeadListener extends EventListener {

	void mobKilled(MobDeadEvent event);
	
}
