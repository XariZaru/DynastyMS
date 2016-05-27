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
	foo();
}


function foo(m,t,s) {
	if (status == 0) {
		cm.sendOk("Oh, is that an ancient relic?");
		cm.dispose();
	}
}