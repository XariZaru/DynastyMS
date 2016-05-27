function start() {
	cm.sendSimple("Where do you want to go?\r\n\r\n"+
						(cm.getMapId() == 250000100 ? "#L0#Orbis\r\n#L1#Herb Town" :
						"#L0#Mu Lung"));
}

function action(m,t,s) {
	if (m <= 0) {
		cm.sendOk("If you change your mind, then talk to me.");
		cm.dispose();
		return;
	}
	cm.warp(cm.getMapId()==250000100 && s == 0 ? 200000100 : 
			cm.getMapId()==250000100 && s == 1 ? 251000000 : 250000000);
	cm.dispose();
}