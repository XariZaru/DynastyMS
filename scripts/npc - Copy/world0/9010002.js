///*
/// Scripted by Kyo
//*/
//
//var trophy = 4000038;
//var gacha = [1102040, 1102041, 1102042, 1102043, 1102079, 1102080, 1102081, 1102082, 1102083, 1102084, 1102085, 1102086, 1102087, 1082145, 1082146, 1082147, 1082148, 1082149, 1082150, 1082175, 1082176, 1082177, 1082178, 1082179, 1032026, 1032027, 1032028, 1132014, 1132015, 1132016, 1132013, 1132012, 1472054, 1002080, 1002081, 1002082, 1002083, 1002391, 1002392, 1002393, 1002394, 1002395, 1002448, 1002585, 1002586, 1002587, 1002584, 1072238, 1072239, 1072261, 1072262, 1072263, 1072264, 1092022, 1102206];
//var pinkbean = [1032031, 1122012, 1002776, 1002777, 1002778, 1002779, 1002780, 1102172, 1082234, 1082235, 1082236, 1082237, 1082238, 1052155, 1052156, 1052157, 1052158, 1052159, 1092057, 1092058, 1092059, 1072355, 1072356, 1072357, 1072358, 1072359, 1302081, 1312037, 1322060, 1402046, 1412033, 1422037, 1442063, 1482023, 1332073, 1332074, 1372044, 1382057, 1432047, 1452057, 1462050, 1472068, 1492023, 1002790, 1002791, 1002792, 1002793, 1002794, 1082239, 1082240, 1082241, 1082242, 1082243, 1052160, 1052161, 1052162, 1052163, 1052164, 1072361, 1072362, 1072363, 1072364, 1072365, 1302086, 1312038, 1322061, 1332075, 1332076, 1372045, 1382059, 1402047, 1412034, 1422038, 1432049, 1442067, 1452059, 1462051, 1472071, 1482024, 1492025];
//var chairs = [3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010014, 3010015, 3010016, 3010017, 3010018, 3010019, 3010025, 3011000, 3010040, 3010041, 3010045, 3012005, 3010046, 3010047, 3010072, 3010057, 3010058, 3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010043, 3010071, 3010085, 3010098, 3010116, 3010101, 3010073, 3010099, 3010106, 3010111, 3010080, 3010081, 3010082, 3010083, 3010084, 3010092, 3012010, 3012011, 3010069]; 
//var scrolls = [2040807, 2043003, 2043103, 2043203, 2044003, 2044103, 2044203, 2044303, 2044403, 2043703, 2043803, 2043303, 2044703, 2044503, 2044603, 2340000, 2049100];
//var random = Math.floor(Math.random() * 99);
//var randg = Math.floor(Math.random() * gacha.length);
//var randpb = Math.floor(Math.random() * pinkbean.length);
//var randc = Math.floor(Math.random() * chairs.length);
//var rands = Math.floor(Math.random() * scrolls.length);
//// Gachapon Items : 40% , Pink Bean Items : 40% , Chairs : 15% , Scrolls : 5% 
//var rewards = [2049100, 2340000];
//var cost = [2, 3];
//var status = -1;
//
//function start() {
//    action(1, 0, 0);
//}
// 
//function action(mode, type, selection) {  
//    if (mode != 1) {  
//        cm.dispose();  
//        return;  
//    } else
//        status ++;
//    if (status == 0) {
//        cm.sendSimple("Hello #e#h ##n, I'm the Event Trophy Exchanger. Which option would you like?\n\
//\r\n #L1000# #eRandomized reward for 1 #i"+trophy+"# #l \r\n #L1001# Variety of rewards #l");
//    } else if (status == 1) {
//        if (selection == 1000) {
//            if (cm.haveItem(trophy, 1)) {
//                if (random >= 0 && random < 40) {
//                    cm.gainItem(gacha[randg], 1);
//                } else if (random >= 40 && random < 80) {
//                    cm.gainItem(pinkbean[randpb], 1);
//                } else if (random >= 80 && random < 94) {
//                    cm.gainItem(chairs[randc], 1);
//                } else {
//                    cm.gainItem(scrolls[rands], 1);
//                }
//                cm.gainItem(trophy, -1);
//                cm.sendOk("You've gotten a #i"+(random >= 0 && random < 40 ? ""+gacha[randg]+"" : random >= 40 && random < 80 ? ""+pinkbean[randpb]+"" : random >= 80 && random < 95 ? ""+chairs[randc]+"" : ""+scrolls[rands]+"" )+"#!");
//                cm.dispose();
//            } else 
//                cm.sendOk("I'm sorry but you do not have a trophy.")
//        } else if (selection == 1001) {
//            cm.sendSimple("Which one would you like? \n\ \n\
//\r\n #L0# #t2049100# #i2049100# - 2 Trophies #l \r\n #L1# #t2340000# #i2340000# - 3 Trophies#l");
//        }
//    } else if (status == 2) {
//        if (cm.haveItem(4000038, cost[selection])) {
//            cm.gainItem(4000038, -cost[selection]);
//            cm.gainItem(rewards[selection]);
//            cm.sendOk("You've gotten a #i"+rewards[selection]+"#, please come again next time!");
//        } else {
//            cm.sendOk("I'm sorry but you're lacking the trophies");
//            cm.dispose();
//        }
//    }
//}
//
function start() {
    cm.sendOk("Disabled for now.");
    cm.dispose();
}