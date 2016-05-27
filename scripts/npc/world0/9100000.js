//item = 1012084;
//var skills = [[4120005,4220005],[10,10]];
//var npcs = [9300005];
//
//
//function start() {
//    cm.changeMusic("Bgm00/Tennessee");
//    x = -95;
//    y = 95;
//    id = 100100;
//    id = 6130101;
//    cm.createMob(id,x,y,3,50,10);
//    c = cm.c;
//    //cm.spawn(id,1,x,y);
//    cm.c.getPlayer().dropCleanMessage("" + c.getPlayer().getMap().getMonsterById(id).getStats().getExp());
//    cm.dispose();
//    }
////    cm.gainSp(26);
////    cm.warp(101000000)
////    cm.dispose();
////    cm.gainExp(50 * Math.pow(cm.getLevel(),3));
////}
//
//function action(m,t,s){
//    if (mode != 1) {
//        cm.dispose();
//    }
//}
//
//function faggot(string, exp, meso) {
//    cm.sendOk(string);
//    cm.gainExp(exp);
//    cm.gainMeso(meso);
//    cm.dispose();
//}
//item = 1012084;
//var skills = [[4120005,4220005],[10,10]];
//var npcs = [9300005];
//
//
//function start() {
//    cm.changeMusic("Bgm00/Tennessee");
//    x = -95;
//    y = 95;
//    id = 100100;
//    id = 6130101;
//    cm.createMob(id,x,y,3,50,10);
//    c = cm.c;
//    //cm.spawn(id,1,x,y);
//    cm.c.getPlayer().dropCleanMessage("" + c.getPlayer().getMap().getMonsterById(id).getStats().getExp());
//    cm.dispose();
//    }
////    cm.gainSp(26);
////    cm.warp(101000000)
////    cm.dispose();
////    cm.gainExp(50 * Math.pow(cm.getLevel(),3));
////}
//
//function action(m,t,s){
//    if (mode != 1) {
//        cm.dispose();
//    }
//}
//
//function faggot(string, exp, meso) {
//    cm.sendOk(string);
//    cm.gainExp(exp);
//    cm.gainMeso(meso);
//    cm.dispose();
//}
var skills = [5121007, 15111004,5121001,5121009,5221010,15111005,5121002];

function start() {
    for (var i = 0; i < skills.length; i++) {
        cm.teachSkill(skills[i],0,10,-1);
    }
    cm.warp(910000000);
    cm.dispose();
}