function start() {
	cm.sendSimple(cm.getBugList(100, 35) + "\r\n#L0#Submit a bug#l\r\n#L101#Exit");
}

function action(m,t,s,status) {
	if (status == 0) {
		if (s == 101)
			cm.dispose();
		else if (s == 0)
			cm.sendGetText("Submit a bug that you wish to enter. It must be between 15-100 characters long.");
		else
			cm.sendOk(cm.getBug(s)), cm.dispose();
	} else if (status == 1) {
		if (cm.getText().length() < 15 || cm.getText().length() > 100) {
			cm.sendOk("You must submit a bug log that is within the admissable limits.");
			cm.dispose();
		} else {
			cm.sendOk("Your bug log along with your name has been submitted to the GMs. Thank you for your help!");
			cm.recordBug(cm.getText());
			cm.dispose();
		}
	}
}