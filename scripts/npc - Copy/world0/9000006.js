var status, items = [4000000, 4000016, 4000019, 4000003, 4000017, 4000021], missingReq, rice = 4031279;

function start() {
    status = -1;
    cm.sendNext("As celebration for #bDynastyMS's#k opening event, I'm in charge of the fun weekly events you can participate in. Right now, I am"+
        " offering rice bags as rewards for the effort you put into this server.");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        text = "I currently need #e10#n of each of the following items. As a reward, I'll give you #b1#k #t"+rice+"#.\r\n";
        for (var i = 0; i < items.length; i++)
        text += "\r\n10 #i"+items[i]+"# - #t"+items[i]+"#";
        cm.sendNext(text);
    } else if (status == 1) {
        missingReq = new Array();
        for (var i = 0; i < items.length; i++) {
        if (!cm.haveItem(items[i], 10)) {
            missingReq.push(items[i]);
            }
        }
        if (missingReq.length > 0) {
            text = "You still need the following items ...\r\n";
            for (var i = 0; i < missingReq.length; i++) {
                amt = 10 - cm.itemQuantity(missingReq[i]);
            text += "\r\n"+amt+" #i"+missingReq[i]+"# - #t"+missingReq[i]+"#";
                }
            cm.sendOk(text);
            cm.dispose();
        } else {
            cm.sendYesNo("Hey, you do have enough to collect your reward. Would you like to receive #b1#k rice bag?");
            }
    } else if (status == 2) {
            text = "You have received #b1#k #i"+rice+"# as your reward!";
            if (cm.getPlayer().isGM() || !cm.getPlayer().isGM()) {
            for (var i = 0; i < items.length; i++)  {
                cm.gainItem(items[i], -10);
                }
            }
            cm.sendOk(text);
            cm.gainItem(rice);
            cm.dispose();
        }
    }

