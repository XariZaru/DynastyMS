/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Description: Assistant Cheng, who provides a list of NPCs and their functions in Dynasty
 */

var status;
var npcs = 
   [9000020,9010002,9000021,9000036,9000069,9200000,1012000,9250052,9201001];
var desc = ["Travel NPC for Mushroom Shrine", "Nothing",
    "Sells maple weapons", "Knights of Cygnus storyline npcs", "Manages inkwell rewards (not open)",
"Bug report npc. Report your bugs here", "Transportation for Victoria Island", "Keeps track"+
        " of all the reports and updates the DynastyMS team makes", "Chair gachapon npc"];

function start() {
    status = -1;
    cm.sendNext("Hey, I'm #b#p"+cm.getNpc()+"##k, and I hold a record of many NPCs in DynastyMS and their functions.");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        text = "What npc were you thinking about looking up?\r\n#b";
        for (var i = 0; i < npcs.length; i++) {
            text += "\r\n#L"+i+"##p"+npcs[i]+"#";
        }  
        cm.sendSimple(text);
    } else if (status == 1) {
        cm.sendOk(desc[selection]);
        cm.dispose();
    }
}

