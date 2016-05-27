var status, sel, nx = 0, sel2, sel3;
var count = 0;
//<editor-fold defaultstate="collapsed" desc="Scrolls/Single Items">
var items = [
    [2040804, 2040805, 2040810, 2040811,2040814,2040815,2040816,2040817,2044701,2044702,2044704,2044705, 2043301, 2043302, 2043304, 2043305,2043801,2043802,2043804,2043805,2043701,2043702,2043704,2043705,2043001,2043002,2043004,2043005, 2044001,2044002,2044004,2044005,2044301,2044302,2044304,2044305],[2022179]]; 
var costs = [[3,2,2,2,2,2,2,3,2,1,2,2,2,1,2,2,2,3,2,2,3,3,1,2,2,1,1,2,2,2,1,1,2,1,1,2,1],[1]];
var texts = ["Scrolls", "USE"];
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="Package Items">
var packages = [
    // Thief's Starter
    [4001126,2043301,2044701,2040826,1082002,2070005,2070005,2040501,2040516,1050018,1051017],
    // General
    [2340000,2040834,2040804,2040817,2044701,2043301,2049100,2044801,2049000,2043801,2044501],
    // Hero's Scroll
    [2044028,2044120,2044001,2044002,2044004,2044005,2044101,2044102,2044104,2044105],
    // Elder Magician's Scroll
    [2043813,2040817,2043801,2043802,2043804,2043805,2043806,2043807],
    [2043713,2040817,2043701,2043702,2043704,2043705,2043706,2043707], // Young Magician's Scroll
    [2043022,2040914,2043001,2043002,2043004,2043005,2043011,2043012], // Paladin
[], // DK

];
//</editor-fold>

var packageAmounts = [
    [6000,2,2,2,2,1,1,2,2,1,1], // Thief's STarter
    [2,1,8,8,3,3,2,3,2,3,3], // General
    [1,1,6,2,6,6,6,2,6,6], // Hero's
    [1,3,7,2,6,6,3,3], // Elder Magician's Scroll
    [1,3,7,2,6,6,3,3], // Young Magician's
    [1,2,6,2,5,5,3,2], // DK
];
var packageNames = ["Thief's Starter", "General Scroll", "Hero's Scroll", "Elder Magician's Wizened Scroll", "Young Magician's Arcane Scroll", "Paladin's Divine Scroll", "Dark Knight's Resilient Scroll"];
var packagePrices = [15,40,40,40,40,40,40];
var discount = 1;

//<editor-fold defaultstate="collapsed" desc="Maps">
var maps = [100000000,101000000,102000000,103000000,104000000,120000000,200000000,250000000,220000000,230000000,221000000,130000000,140000000,211000000,260000000,261000000,240000000,251000000,222000000,540000000,600000000,550000000,551000000];
//</editor-fold>
var nx = 2000;
var leaf = 1000;
var cost;

function start() {
    status = -1;
//    if (cm.getJobId()==910) {
    cm.sendNext("Hello, #b#h ##k, I handle all the donation rewards. You can exchange"+
        " your virtual currency for some in-game items.");
//    } else {
//        cm.sendOk("The donation NPC is not open to the public at this time.");
//        cm.dispose();
//    }
}

function fail() {
    cm.sendOk("You do not have enough yen to use this option. Please check your balance again.");
    cm.dispose();
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        text = "What option would you like to view? You currently have #b"+cm.getPlayer().getDp()+" yen#k.#b\r\n#L"+(texts.length+4)+"#Packages";
        for (var i = 0; i < texts.length; i++) {
            text += "\r\n#L"+i+"#"+texts[i]+"";
        }
            text += "\r\n#L"+(texts.length+1)+"#Maple Leaves\r\n#L"+(texts.length+2)+"#Teleport\r\n#L"+(texts.length+3)+"#Purchase NX\n\
    ";
            cm.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        // ugly code...
        if (sel < (texts.length + 1)) {
            text = "Here are the following items you wished for:\r\n";
            for (var i = 0; i < items[sel].length; i++) {
            text += "\r\n#L"+i+"##b1#k #i"+items[sel][i]+"# #t"+items[sel][i]+"# for #b"+(costs[sel][i])+"#k yen.";
        }
        cm.sendSimple(text);
        } else if (sel == (texts.length+3)) {
            cm.sendGetNumber("Each donor point gets you "+nx+" NX. Put how many points you would like to spend below.",1,1,100);
        } else if (sel == texts.length+4) {
            text = "Here are some of the packages that you can purchase:\r\n#b";
            for (var i = 0; i < packages.length; i++) {
                    text += "\r\n#L"+i+"#"+packageNames[i]+" package - "+packagePrices[i]+" yen";
            }
            cm.sendSimple(text);
        } else if (sel == (texts.length+2)) {
            if (cm.getPlayer().getDp()>=2) {
                text = "Here are the following maps you can teleport to. Each one costs #b1#k yen to teleport:\r\n";
                for (var i = 0; i < maps.length; i++) {
                    text += "#b\r\n#L"+i+"##m"+maps[i]+"#";
            }
            cm.sendSimple(text);
            } else {
                cm.sendOk("You don't have enough yen to use this option. You need at least 1 to use it.");
                cm.dispose();
            }
        } else if (sel == (texts.length+1)) {
                cm.sendGetNumber("You get #b"+leaf+"#k leaves per yen you spend. How much yen are you willing to spend on leaves?",1,1,100);
        }
    } else if (status == 2) {
        // start of ugly code
        sel2 = selection;
        if (sel < (texts.length+1)) {        
        cm.sendGetNumber(""+
                ""+("Input the amount of #i"+items[sel][selection]+"# you want. Each one costs"+
                " #b"+(costs[sel][selection])+"#k yen.")+"", 1,1,100);
        } else if (sel == (texts.length+4)) {
            var total = 0;
            for (var j = 0; j < packageAmounts[sel2].length; j++) {
                total += packageAmounts[sel2][j];
            }
            text = "The "+packageNames[sel2]+" package contains the following #e"+total+"#n items:\r\n";
            for (var i = 0; i < packages[sel2].length; i++) {
                text += "\r\n"+packageAmounts[sel2][i]+" #i"+packages[sel2][i]+"# - #t"+packages[sel2][i]+"# ";
            }
            text += "\r\n\r\n#eDo you still wish to purchase this "+packagePrices[sel2]+" yen package? Make sure you have the room to hold\n\
 all of these items. There will be no refunds to those who fail to obey this warning.";
            cm.sendYesNo(text);
        } else if (sel == (texts.length+3)) {
            if (cm.getPlayer().getDp() < selection) {
                cm.sendOk("You do not have enough donor points for this option.");
                cm.dispose();
            } else {
                cm.sendOk("You have gained #b"+selection*nx+"#k NX for "+selection+" yen!");
                cm.getPlayer().getCashShop().gainCash(4, nx * selection);
                cm.getPlayer().gainDp(-selection);
                cost = selection;
                cm.dispose();
            }
        } else if (sel == (texts.length+2)) {
            cm.warp(maps[selection]);
            cm.getPlayer().gainDp(-1);
            cost = 1;
            cm.dispose();
        } else if (sel == (texts.length+1)) {
                if (cm.getPlayer().getDp() < sel2) {
                    fail();
                } else {
                    if (cm.canHold(4001126)) {
                        cost = sel2;
                        cm.sendOk("You have gained #b"+(leaf*sel2)+"#k #i4001126# for #b"+selection+"#k yen.");
                        cm.gainItem(4001126,(leaf*sel2));
                        cm.getPlayer().gainDp(-sel2);
                        cm.dispose();
                    } else {
                        cm.sendOk("You need to make room for your purchase.");
                        cm.dispose();
                    }
                }
        }
    } else if (status == 3) {
        sel3 = selection;
        if (sel == (texts.length+4)) {
            if (cm.getPlayer().getDp() >= packagePrices[sel2]) {
                text = "You've purchased the #b"+packageNames[sel2]+" package#k for #b"+packagePrices[sel2]+"#k yen:\r\n";
                cm.getPlayer().gainDp(-packagePrices[sel2]/discount);
                for (var i = 0; i < packages[sel2].length; i++) {
                    text += "\r\n"+packageAmounts[sel2][i]+" #i"+packages[sel2][i]+"# - #t"+packages[sel2][i]+"#";
                    cm.gainItem(packages[sel2][i],packageAmounts[sel2][i]);
                }
                cm.sendOk(text);
                cost = packagePrices[sel2];
                cm.dispose();
            } else {
                fail();
            }
        } else {
            cm.sendYesNo("Are you sure you want to purchase #b"+selection+"#k #i"+items[sel][sel2]+"#? This transaction will amount to"+
            " the spending of #b"+(costs[sel][sel2] * selection)+"#k yen.");
        }
    } else if (status == 4) {
        if (cm.getPlayer().getDp()>=(costs[sel][sel2] * sel3)) {
            cm.sendOk(""+("You have purchased #b"+sel3+"#k #i"+items[sel][sel2]+"# for #b"+(costs[sel][sel2] * sel3)+"#k yen")+"");
            cm.gainItem(items[sel][sel2], sel3);
            cm.getPlayer().gainDp(-costs[sel][sel2] * sel3);
            cost = (costs[sel][sel2] * sel3);
            cm.dispose();
        } else {
            cm.sendOk("You do not have enough yen to purchase this item.");
            cm.dispose();
        }
    }
    if (cost > 0) {
        cm.playerMessage(6, "You have lost "+cost+" yen for your transcation. Your total balance is "+cm.getPlayer().getDp()+" yen.");
    }
}

//function start () {
//    cm.sendOk("Temporarily disabled.");
//    cm.dispose();
//}