var status = -1;

// Quest area
var tera_forest = 240070000;

// First quest
var chain_tire = 4000552;

// Second quest
var maverick_items = {4000554: 50, 4000555: 50, 4000556: 100};

importPackage(Packages.server.life);


function start() {
	if (cm.getLevel() < 140) {
		cm.sendOk("Military arms are not meant to be used by those of the faint of heart! Come back when you are stronger and we'll see if I can get something into you just yet!");
	} else {
		switch (cm.getPlayer().getDynastyQuest("Arms Deal")) {
			case 0:
				cm.sendNext("Look at this fresh recruit! Haha!~ I bet you want access to some armament materials, no? Well, if you do, you're going to have to do a little work for me!");
				break;
			case 1:
				if (cm.getMapId() != tera_forest) {
					cm.sendOk("Are you deaf? Get your ass to #e#m" + tera_forest + "##n!");
					cm.dispose();
				} else {
					cm.sendNext("I'm glad to see that you've made it here in one piece. This is the entrance to the other realm.");
				}
				break;
			case 2:
				if (!cm.haveItem(chain_tire, 100)) {
					cm.sendOk("Look here, if you want to be able to help society grow stronger with weaponry, then we have to get at least 100 #b#z"+chain_tire+"##k!~");
					cm.dispose();
				} else {
					cm.sendOk("This will suffice, yes. This looks fantastic. Wow! Is that ... what is #ethat#n?!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 45000000");
					cm.getPlayer().completeDynastyQuest("Arms Deal");
					cm.gainExp(45000000);
					cm.gainItem(chain_tire, -100);
					cm.dispose();
				}
				break;
			case 3:
				cm.sendNext("Glad to see you back and ready for some action. Those chain tires you got me earlier were fantastic. They're being studied and implemented into our armory as we speak!");
				break;
			case 4:
				var complete = true;
				for (var item in maverick_items) 
					if (item != 999 && !cm.haveItem(item, maverick_items[item]))
						complete = false;
					else if (cm.getMeso() < maverick_items[item])
						complete = false;
				if (complete) {
					cm.sendOk("Brilliant, brilliant! Here is your reward! It is of fantastic quality. If you wish to learn how to obtain your sweet ride next, then just talk to me again!#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# 50000000");
					for (var item in maverick_items)
						if (item != 999)
							cm.gainItem(item, -maverick_items[item]);
						else
							cm.gainMeso(-maverick_items[item]);
					cm.getPlayer().completeDynastyQuest("Arms Deal");
					cm.gainExp(50000000);
				} else {
					cm.sendOk("If you want to be able to upgrade our armory, then you'd better be fetching what the army needs! How can we expect to defend ourselves against future invasions?\r\n\r\n" + listItems(maverick_items));
				}
				cm.dispose();
				break;
			default:
				cm.sendOk("Military armament is what keeps this country safe!");
				cm.dispose();
				break;
		}
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		switch (cm.getPlayer().getDynastyQuest("Arms Deal")) {
			case 0:
				cm.sendNext("The military needs futuristic material that allows us to prepare for the worst. As long as you can provide these munitions for me, I'm sure we're going to be able to do much more in a few years.");
				break;
			case 1:
				cm.sendAcceptDecline("The first step we have to take is gathering materials on their siege weaponry. If you can gather 100 #b#z"+chain_tire+"##k I believe that will be a great step towards improving this world!~");
				break;
			case 3:
				cm.sendAcceptDecline("The next part of our upgrading requires you to take a look at the enemy's infantry. If you can gather parts from them, I'm sure we'll be able to outfit our soldiers in a new and inconceivable way!");
				break;
		}
	} else if (status == 1) {
		switch (cm.getPlayer().getDynastyQuest("Arms Deal")) {
			case 0:
				cm.sendOk("Come meet me at the #e#m" + tera_forest + "##n. We'll talk more there.");
				cm.getPlayer().completeDynastyQuest("Arms Deal");
				cm.dispose();
				break;
			case 1:
				cm.sendOk("Gather 100 #b#z"+chain_tire+"##k and that should suffice.");
				cm.getPlayer().completeDynastyQuest("Arms Deal");
				cm.dispose();
				break;
			case 3:
				cm.sendOk("Just bring me back these items and we can call it a success:\r\n\r\n" + listItems(maverick_items));
				cm.getPlayer().completeDynastyQuest("Arms Deal");
				cm.dispose();
				break;
		}
	} else if (status == 2) {
		switch (cm.getPlayer().getDynastyQuest("Arms Deal")) {

		}
	}
}

function listItems(items) {
	var text = "";
	for (var item in items)
		if (item != 999)
			text += "#e" + items[item] + "#n #z" + item + "#\r\n";
		else
			text += items[item] + " mesos\r\n";
	return text + "#k";
}