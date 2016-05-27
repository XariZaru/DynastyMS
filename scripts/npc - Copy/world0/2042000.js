/*Map: Monster Carnival Room 4 Lobby: 980000400*/

/*var status;
var min = 2;
var max = 6;
var coin = 4001129;
var scoin = 4001254;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
    }
        if (mode == 0) {
            cm.sendOk("Come back later then.");
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
    if (status == 0) {
    var party = cm.partyMembersInMap();
    if (cm.getMapId()!=103000000) {
    if (cm.getMapId()==980000403 || cm.getMapId()==980000103 || cm.getMapId()==980000503) {
        cm.sendOk("Hey! Good job on winning! Your party has received #r6,000#k EXP TIMES the current EXP rate");
        cm.mapMessage(6,"[CPQ Assistant] Good job on winning! The party members in the map will receive 6,000 EXP TIMES the current EXP rate.");
    } else if (cm.getParty()){
        cm.sendOk("Aww! Better luck next time. You'll do better. Your party has received #r2,000#k EXP TIMES the current EXP rate.");
        cm.mapMessage(6,"[CPQ Assistant] Aww! Better luck next time! Party members in the map will receive 2,000 EXP TIMES the current EXP rate.");
    } else {
        cm.sendOk("I'll warp you out right now.");
        }
    } else {
        cm.sendYesNo("Do you want join the #bMonster Carnival#k?");
    }
    } else if (status == 1) {
    var party = cm.partyMembersInMap();
    if (cm.getMapId()!=103000000) {
    if (cm.getMapId()==980000403 || cm.getMapId()==980000103 || cm.getMapId()==980000503) {
        cm.warp(980000000);
        cm.gainExp(6000 * 15);
        cm.removeAll(scoin)
        cm.removeAll(coin);
        cm.dispose();
    } else if (cm.getParty()){
        cm.warp(980000000);
        cm.gainExp(2000 * 15);
        cm.removeAll(scoin);
        cm.removeAll(coin);
        cm.dispose();
    } else {
        cm.warp(100000000);
        cm.dispose();
                }
    } else {
        cm.warp(980000000);
        cm.dispose();
            }
        }
    } */

function start () {
    cm.sendOk("Glitches were found, NPC disabled until we fix it. Sorry for any inconvenience caused :)");
    cm.dispose();
}