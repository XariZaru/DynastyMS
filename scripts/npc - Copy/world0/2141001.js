var status = -1;
var maps = [[100000000, 101000000], [180000000], [102000000]];
var chosenMap;
var chosenSection;

function start() {
    cm.sendNext("Okay testing.");
}

function action(mode,type,selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    revan(selection);
}


/*
Recoded by: Revan
-Added Quest Icons
-Grammar Corrections
-Price Added, 90% Discount
-Map Message Dropped (both exit/entrance map)
-SendOk On Arrival
*/
function revan(selection) {
    if (status == 0) {
        cm.sendSimple("Level 1~30 costs #b5,000#k #fUI/UIWindow.img/QuestIcon/7/0# \r\n\r\nLevel 30+ costs #b50,000#k #fUI/UIWindow.img/QuestIcon/7/0# \r\n\r\n #fUI/UIWindow.img/QuestIcon/3/0#\r\n#L0#Visit a Town#l\r\n#L1##rVisit The Spa#k#l\r\n#L2##bTake me to the Event!#k#l");
    } else if (status == 1) {
        chosenSection = selection;
        var selStr = "Select your destination.#b";
        for (var i = 0; i < maps[selection].length; i++) {
            selStr += "\r\n#L" + i + "##m" + maps[selection][i] + "#";
        }  
        cm.sendSimple(selStr);
    } else if (status == 2) {
        chosenMap = selection;
        cost = 50000;
        price = (cm.getPlayer().getLevel() <= 30) ? cost / 10 : cost; 
        var text = "Do you want to go to #b#m" + maps[chosenSection][selection] + "##k? \r\n\r\n It will cost you #r" + price + "#k #fUI/UIWindow.img/QuestIcon/7/0#";
        cm.sendYesNo(text);
    } else if (status == 3) {
        var text2 = "" + cm.getPlayer() + " has entered/exited the map using Cody.";
        var text3 = "Welcome to #b#m" + maps[chosenSection][chosenMap] + "##k! Please enjoy your stay " + cm.getPlayer() +".";
        if (cm.getMeso() < (price)) {
            cm.sendOk("Please come back when you have at least #r" + price + "#k #fUI/UIWindow.img/QuestIcon/7/0# ");
            cm.dispose();
            return;
        }
        cm.gainMeso(-price);
        cm.warp(maps[chosenSection][chosenMap]);
        cm.sendOk(text3);
        cm.dispose();
        if (!cm.getPlayer().isGM()){ //adam added this so that gm will stay anonymous when warp into a map using cody
            cm.mapMessage(5, text2);
        }
    }
}  