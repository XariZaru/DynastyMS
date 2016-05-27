var status = -1;

function start() {
    cm.sendNext("Doesn't the smell of the battlefield just fascinate you?");
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	} 
	status++;
	if (status == 0) {
		foo();
	}
}


function foo(m,t,s) {
	if (status == 0) {
		cm.sendNext("Ello governor!");
	} else if (status == 1) {
		cm.sendOk("Donezo.");
		cm.dispose();
	}
}