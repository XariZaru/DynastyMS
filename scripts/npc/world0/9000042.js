importPackage(Packages.server);
var status = -1;

function start() {
	var manager = TimerManager.getInstance();
	cm.sendOk(
				"Active Count: " + manager.getActiveCount() + "\r\n" +
				"Completed Count: " + manager.getCompletedTaskCount() + "\r\n" +
				"Task Count: " + manager.getTaskCount() + "\r\n" + 
				"Queued Task Count: " + manager.getQueuedTasks());
	cm.dispose();
}