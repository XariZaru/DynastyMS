var status;
var events = [[10000],[10001]]; // started/completed
var eventsName = ["One-time Gift"];
var unfinished;
var unfinishedNames;
var rand = Math.floor(Math.random() * 10000); // numbers from 0-100
// 9954-10000,9753-9953,8752-9752,7551-8751,0-7550
// .5% unique, 2% super rare, 10% rare, 12% nx, 75.5% common/equips
var nx = [200,500,1000,2000,4000,8000];
var items = [
    [2000004,2000000,2000001,2000002,2000003,2000016,2000017,2002000,
     2002001,2002002,2002003,2002004,2002005,2050004,
     2000005,2000006,2000011,2000012,2000018,2000019,2002010,2002011,
     2002016,2002017,
     2002018,2002019,2002024,2002025,2022544,2030000,2030001,2030002,2030003,
     2030004,2030005,2030006,2030007,2030019,2030020,2040024,2040027,2040316,
     2040319,2040324,2040417,2040420,2040423,2040530,2040617,2040620,2040623,
     2040823,2040923,2040926,2040929,2043015,2043110,2043210,2044010,2044110,
     2044210,2044310,2044410,2044800,2044805,2044900,2000007,2000008,2000009,
     2000010,2000011,2002006,2002007,2002008,2002009,2002010,2022000,2001002],
    [1322005,1322009,1322027,1332005,1040057,1040058,1040069,1040060,1060043
    ,1060044,1060045,1060046,1041047,1041048,1041049,1041050,1061043,1061044
,1061045,1061046,1002171,1002172,1002173,1002174,1002175,1040067,1040068,1040069
,1040070,1060056,1060057,1060058,1060059,1041054,1041055,1041056,1061050,1061051,
1061052,1002161,1002162,1002163,1002164,1002165,1061034,1061035,1061036,1050003,
1050026,1050028,1041041,1041042,1041043,1060016,1060017,1060018,1060019,1060020,
1051010,1051011,1051012,1051013,1040021,1040026,1002023,1492004,1482004,1472001,
1462000,1452005,1442001,1432002,1422001,1412006,1402002,1382002,1372003,1332012,
1332009,1322014,2070004,2070010],
    [],
    [1012076,1012077,1012078,1012079,1122001,1122002,
        1122003,1122004,1122005,1122006,2070006,2070005,2040001,2040101, 2040201, 2040301, 2040311, 2040321, 2040401,2040421,2040501,2040601,2040621,2040701,2040801,2040931,2041001,2043001,2043101,2043201, 2043301,2043701,2043801,2044001,2044101,2044201,2044301,2044401,2044501,2044601,2044701,2044801,2044901,2048001,2048011,2041101,2041301,],
    [1082149,1082230,1022082,1102206,1102149,1040138,1041139,
1082225,1060121,1061142,1072328,1102148,1040137,1041138,1082224,1060120,1061141,1072327,
1000030,1001045,1102096,1052091,1072281,1702119,1000032,1001047,1102097,1052093,
1072283,1702118,2070007],
    [1132016,1122000,1112401,1112402,1112414,
    1382052,1372042,1092049,1002858,1002859,1002860,1002861,4032119,1102084,1102086,
1102041,1102042, 1032031, 1122011, 1122012, 1002776, 1002777, 1002778, 1002779, 1002780, 1102172, 1082234, 1082235, 1082236, 1082237, 1082238, 1052155, 1052156, 1052157, 1052158, 1052159, 1092057, 1092058, 1092059, 1072355, 1072356, 1072357, 1072358, 1072359, 1302081, 1312037, 1322060, 1402046, 1412033, 1422037, 1442063, 1482023, 1332073, 1332074, 1372044, 1382057, 1432047, 1452057, 1462050, 1472068, 1492023]]; 
var sel;
var names = ["Common", "Common", "NX", "Rare", "Super Rare", "Unique"];
var type;
var commonItem;
// common, equips, rare, super rare, unique (post rare, all items gained are only 1)

function start() {
    status = -1;
    unfinished = new Array();
    unfinishedNames = new Array();
    for (var i = 0; i < events[1].length; i++) {
        if (!cm.iQC(events[1][i])) {
            unfinished.push(events[1][i]);
            unfinishedNames.push(eventsName[i]);
        }
    }
    if (unfinished.length >= 0) {
        cm.sendSimple("What option would you like to select?\r\n\r\n#b#L0#Daily Gift ("+(cm.getGiftLog('daily') >= 1 ? "UNAVAILABLE" : "AVAILABLE")+")\r\n#L1#One-Time Gift");
    }
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
        if (selection == 1) {
            if (cm.getPlayer().getDynastyQuest("A Gift for a New Player") == 0) {
               cm.sendOk("You have received your one-time items. Enjoy your time at DynastyMS!"),
               cm.gainItem(1002419,1), cm.gainItem(3010000, 1), cm.gainMeso(10000), cm.getPlayer().completeDynastyQuest("A Gift for a New Player"), cm.dispose();
            } else {
                cm.sendOk("You have already claimed this one-time gift. Please try again another time.");
                cm.dispose();
            }
        } else if (selection == 2) {
            cm.sendGetNumber("How many smegas will you buy? They are #b1,000,000#k mesos each.",1,1,100);
        } else {
			
			cm.sendOk("Disabled for rework again.");
			cm.dispose();
			return;
			
            cm.sendSimple("Here are the percentages so far ...\r\n#eUnique - .5%\r\nSuper Rare - 2%\r\nRare - 10%\r\nNX - 12%\r\nCommon - 75.5%"+
                "#n\r\n#b#L6#Claim daily gift\r\n#L0#Common/Equips\r\n#L2#NX\r\n#L3#Rare\r\n#L4#Super Rare\r\n#L5#Unique");
//            cm.sendOk("You have received your free daily gift! Please come back tomorrow to claim another.");
        }
    } else if (status == 1) {
        if (sel == 0) {
            if (selection != 6) {
            text = "Here are the winnable items from #e"+names[selection]+"#n category. ("+(items[selection].length + (selection == 0 ? items[1].length : 0))+")\r\n\r\n";
            for (var i = 0; i < (selection == 2 ? nx.length : items[selection].length); i++) {
                text += ""+(selection == 2 ? "#b\r\n"+nx[i]+" NX" : "#i"+items[selection][i]+"#")+"";
            }
            for (var i = 0; i < items[1][i]; i++) {
                if (selection == 0) {
                    text += "#i"+items[1][i]+"#";
                }
            }
            cm.sendOk(text);
            cm.dispose();
            } else {
                if (cm.getGiftLog('daily') >= 1 /*&& !cm.getPlayer().isGM()*/) {
                    cm.sendOk("You've already received your daily gift for the day. Please try again later.");
                    cm.dispose();
                } else {                     
                    randThree = Math.floor(Math.random() * 99);
                        for (var i = 0; i < items[1].length; i++) {
                            items[0].push(items[1][i]);
                        }
                        (rand >=9954 && rand <= 10000 ? type = 5 : rand >= 9753 && rand <= 9953 ? type = 4 : rand >= 8752 && rand <= 9752 ? type = 3 :
                            rand >= 7551 && rand <= 8751 ? type = 2 : type = 0);
                            randTwo = Math.floor(Math.random() * (type == 2 ? nx.length : items[type].length));
                        for (var i = 0; i < items[1].length; i++) {
                            if (items[type][randTwo] == items[1][i]) {
                                commonItem = 1;
                            }
                        }
                        if (type != 2 ? cm.canHold(items[type][randTwo]) : type) {
                            cm.sendOk("You have received your daily item!");
                            (type == 2 ? (cm.getPlayer().getCashShop().gainCash(4, nx[randTwo]), cm.playerMessage(6, "You have gained "+nx[randTwo]+" paypal NX.")) : type != 0 ? cm.gainItem(items[type][randTwo],1) :
                                    cm.gainItem(items[type][randTwo], 1 + (Math.floor(items[type][randTwo] / 10000) != 204 ? (randThree * (commonItem ==
                                1 ? 0 : 1)) : 0)));
                            cm.setBossLog('daily');
                            cm.dispose();
                        } else {
                            cm.sendOk("Please clear up inventory space before attempting to collect your daily reward.");
                            cm.dispose();
                        }
                }
            }
        } else if (sel == 2) {
            if (cm.getMeso()<(1000000 * selection)) {
                cm.sendOk("You lack the funds necessary to purchase these smegas.");
                cm.dispose();
            } else {
                cm.sendOk("You have purchased #b"+selection+"#k smegas for #b"+(1000000*selection)+"#k mesos.");
                cm.gainMeso((-1000000*selection));
                cm.gainItem(5072000, selection);
                cm.dispose();
            }
        }
    }
}
