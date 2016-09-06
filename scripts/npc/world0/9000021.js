var status, sel, sel2;
var maple35 = [1302020, 1382009,1452016,1462014,1472030,1492020,1482020];
// sword, staff, bow, crow, claw, gun, knuckle
var maple43 = [1302030,1332025,1382012,1412011,1422014,1432012,1442024,1452022,
    1462019,1472032,1492021,1482021];
// soul singer, wagner, lama staff, dragon axe, doom singer
// impaler, scorpio, soul searcher, crossbow, kandayo, storm pistol, storm finger
var leaf = 4001126, items3543 = [500,1000];
var maple64 = [1302064, 1402039,1332055,1332056,1372034,1382039,1312032,1412027,
    1322054,1422029,1432040,1442051,1452045,1462040,1472055,1492022,1482022];
// [glory sword, rohen], [dark mate, asura dagger], [shine wand, wisdom staff], [steel axe, demon axe]
// [havoc hammer, belzet], [soul spear], [karstan], [kandiva], [nishada], [skanda], [canon shooter]
// [golden claw]
var req64 = [[1302020,1302030],[1332025],[1382009,1382012],[1412011],[1422014],[1432012],[1442024],
    [1452016,1452022],[1462014,1462019],[1472030,1472032],[1492020,1472032],[1482020,1482021]];
var cost64 = [1250,1000];
var shields = [[1092030,1092045,1092046,1092047],[1000,2000]];
var throwing = [2070011,500];

importPackage(Packages.client.inventory);
importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.server);


var x, i, t, fag, dog;

function start() {
    status = -1;
    cm.sendSimple("What options would you like to view?\r\n\r\n#b#L0#Level 35 Maple Weapons\r\n#L1#Level 43 Maple Weapons\r\n#L2#Level 64 Maple Weapons\r\n#L3#Maple"+
        " Shields\r\n#L4#Maple Throwing-Stars\r\n#L5#Trade a Maple Weapon for Leaves");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return false;
    } else {
        status++;
    }
    if (status == 0) {
            sel = selection;
            text = "Which of the following items would you like to buy?\r\n\r\n";
        if (selection == 0 || selection == 1) {
            for (var i = 0; i < (selection == 0 ? maple35.length : maple43.length); i++) {
                text += "\r\n#L"+i+"##i"+(selection == 0 ? maple35 : maple43)[i]+"# #z"+(
                    selection == 0 ? maple35[i] : maple43[i])+"# - "+items3543[sel]+" #i4001126# #z"+4001126+"#";
            }
            cm.sendSimple(text);
        } else if (selection == 2) {
            for (var i = 0; i < maple64.length; i++) {
                text += "#L"+i+"##i"+maple64[i]+"# #z"+maple64[i]+"##l\r\n";
        }
            cm.sendSimple(text);
        } else if (selection == 3) {
            for (var i = 0; i < shields[0].length; i++) {
               text += "#L"+i+"##i"+shields[0][i]+"# #z"+shields[0][i]+"##l\r\n";
            }
            cm.sendSimple(text);
        } else if (selection == 4) {
            cm.sendYesNo("Maple Throwing-Stars cost #b500#k #i"+leaf+"# to purchase. Would you still like to purchase these?");
        } else if (selection == 5) {
			var txt = "You get #b200#k #i4001126# when you trade in a Maple equip. These are your following Maple equips:\r\n";
			var equips = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItems().entrySet().toArray();
			for (var x = 0; x < equips.length; x++) 
				if (MapleItemInformationProvider.getInstance().getName(equips[x].value.getItemId()).toLowerCase().contains("maple") && equips[x].value.getItemId() < 2000000)
					txt += "\r\n#L" + equips[x].value.getPosition() + "##i" + equips[x].value.getItemId() + "#";
			cm.sendSimple(txt + "\r\n#L999#Exit");
		}
    } else if (status == 1) {
        sel2 = selection;
        if (sel == 0 || sel == 1) {
            if (!cm.haveItem(leaf, items3543[sel])) {
                cm.sendOk("You do not have enough leaves for this transaction. You are currently lacking"+
                    " "+(items3543[sel] - cm.itemQuantity(leaf))+" leaves.");
                cm.dispose();
            } else {
                cm.sendYesNo("Are you sure you want to purchase this item: #i"+(sel == 0 ? maple35[selection] : maple43[selection]));          
             }
		} else if (sel == 5) {
			if (selection != 999) {
				cm.sendSimple("These are the #i"+cm.getEquip(selection).getItemId()+"# information. Are you sure you want to trade your Maple equipment for #b200#k leaves?\r\n\r\n" + cm.getEquipInfo(cm.getEquip(selection)));
				sel2 = selection;
			}
        } else if (sel == 4) {
            if (cm.haveItem(leaf, throwing[1])) {
                cm.sendOk("You have purchased #i"+throwing+"# for 500 #i"+leaf+"#.");
                cm.gainItem(throwing[0],500);
                cm.gainItem(leaf,-throwing[1]);
                cm.dispose();
            } else {
                cm.sendOk("You are lacking the materials needed to purchase this item.");
                cm.dispose();
            }
        } else if (sel == 3) {
                cm.sendNext("You need "+(selection != 0 ? "1 #i1092030# and #b2000 #t"+leaf+"##k" : "#b1000#k #t"+leaf+"#")+" to purchase #i"+shields[0][selection]+"#.");  
        } else if (sel == 2) {
            ((selection == 0 || selection == 1) ? fag = 0 : (selection == 2 || selection == 3) ? fag = 1 : (selection == 4 || selection == 5)
         ? fag = 2 : (selection == 6 || selection == 7) ? fag = 3 : (selection == 8 || selection == 9) ? fag = 4 : selection == 10 ?
           fag = 5 : selection == 11 ? fag = 6 : selection == 12 ? fag = 7 : selection == 13 ? fag = 8 : selection == 14 ? fag = 9
            : selection == 15 ? fag = 10 : fag = 11);
            text = "Here are the following items you can use, in combination with maple leaves, to upgrade your item to the next"+
                " tier: #b#t"+maple64[selection]+"##k\r\n\r\n";
                for (var i = 0; i < req64[fag].length; i++) {
                    text += "#L"+i+"##i"+req64[fag][i]+"# + #b"+cost64[i]+" #t"+leaf+"##k#l\r\n";
                }
            cm.sendSimple(text);
        }
    } else if (status == 2) {
        if (sel == 3) {
            (!cm.haveItem(leaf,shields[1][(sel2 == 0 ? 0 : 1)]) ? fail = 0 : (sel2 != 0 && !cm.haveItem(shields[0][0]) ? fail = 0 : fail = 1));
             if (fail == 0) {   
                cm.sendOk("You do not meet the required items/leaves needed for this transaction.");
                cm.dispose();
            } else {
                cm.sendOk("You have gained #i"+shields[0][sel2]+"# as a result of your choice.");
                gainItem(shields[0][sel2]);
                cm.gainItem(leaf,-shields[1][(sel2 == 0 ? 0 : 1)]);
                (sel2 != 0 ? cm.gainItem(shields[0][0], -1) : status);
                cm.dispose();
            }
		} else if (sel == 5) {
			cm.gainItem(4001126, 200);
			cm.removeItem(sel2);
			cm.dispose();
        } else if (sel == 0 || sel == 1){
                cm.sendOk("You have purchased a #i"+(sel == 0 ? maple35[sel2] : maple43[sel2])+"# for"+
                    " #b"+items3543[sel]+"#k leaves.");
                gainItem((sel == 0 ? maple35[sel2] : maple43[sel2]));
                cm.gainItem(leaf, -items3543[sel]);
                cm.dispose();
        } else {
            if (!cm.haveItem(leaf, cost64[selection]) || !cm.haveItem(req64[fag][selection])) {
                cm.sendOk("You do not have the sufficient item(s) needed to complete this transaction. Please check the requirements again.");
                cm.dispose();
            } else {
                cm.sendOk("You have received a #i"+maple64[sel2]+"# in exchange for #b"+cost64[selection]+"#k #i"+leaf+"#.");
                cm.gainItem(leaf, -cost64[selection]);
                gainItem(maple64[sel2]);
                cm.gainItem(req64[fag][selection],-1);
                cm.dispose();
            }
        }
    }
}

importPackage(Packages.client.inventory);
importPackage(Packages.server);

function gainItem(itemid) {
	var eq = MapleItemInformationProvider.getInstance().randomizeStats(MapleItemInformationProvider.getInstance().getEquipById(itemid));
	if (Math.floor(Math.random() * 10) <= 1) {
		eq = MapleItemInformationProvider.getInstance().addGodlyStats(eq);
		eq.setOwner("God");
		cm.getPlayer().dropMessage(5,"The item you purchased gleams brightly ... and almost seems godly? Congratulations!");
	}
	cm.gainEquip(eq);
}