///*--==Rooldolph==--
// * Property of DynastyMS - LegendXV/Thane Krios
// * TP of Happyville*/
//
//function start() {
//    if (cm.getQ()>=14) {
//         cm.sendYesNo("Would you like to leave #m"+cm.getMapId()+"# and go to"+
//             " "+(cm.getMapId()==209000000 ? "#b\"Lith Harbor\"#k" : "#b\"Happyville\"#k")+"?");
//    } else {
//        cm.sendOk("#bHappyville#k is a brilliant place to vacaction to! Join us during the holidays!");
//        cm.dispose();
//    }
//}
//
//function action(mode, type, selection) {
//    if (mode == 1) {
//        (cm.getMapId()==209000000 ? cm.warp(104000000) : cm.warp(209000000));
//        cm.dispose();
//    } else {
//        cm.sendOk("Well, that's too bad. Maybe later?");
//        cm.dispose();
//        return;
//    }
//}

function start() {
	cm.sendOk("Hi.");
	cm.dispose();
}