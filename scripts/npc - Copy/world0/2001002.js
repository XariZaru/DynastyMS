var status;

function start() {
	status = -1;
	cm.sendYesNo("Isn't it a great day?");
}

function action(m,t,s) {
	if (m == 1) {
		cm.sendOk("It's good to have some cheer!");
	} else if (m == 0) {
		cm.sendOk("Huh, it's still great without your support.");
	} else {
		cm.sendOk("See ya later.");
	}
	cm.dispose();
}