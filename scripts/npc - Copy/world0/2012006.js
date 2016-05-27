var towns = [200000110,200000120,200000130,200000150,200000140,200000160,];
var tix = [4031047,4031074,4031331,4031576];

function start() {
    text = "Hey, which platform would you like to go to? Some platforms\n\
 need tickets while others require only money. Tickets can be purchased at the\n\
 booth near the center of this location.\r\n";
    for (var i = 0; i < towns.length; i++) {
       text += "\r\n#b#L"+i+"##m"+towns[i]+"# "+(i == 5 ? "<To Ereve>" : "")+"";
    }
    cm.sendSimple(text);
}

function action(m,t,s) {
    if (m == 1) {
        if (s == 4 || s == 5) {
            if (cm.getMeso()>=6000 || cm.getPlayer().isGM()) {
                cm.warp(towns[s]);
                cm.gainMeso(-6000);
            } else {
                cm.sendOk("You are lacking the mesos to purchase this pathway. Please check your inventory or sell some items.");
            }
        } else {
            if (cm.haveItem(tix[s],1) || cm.getPlayer().isGM()) {               
                cm.warp(towns[s]);
                cm.gainItem(tix[s],-1);
            } else {
                cm.sendOk("You do not have the ticket to board this pathway. Please purchase one from our ticketing booth.");
            }
        }
    }
    cm.dispose();
}