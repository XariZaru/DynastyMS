var status = -1;
var sel;
var players;
var x, y;
var count = 1;

function start() {
    players = cm.onlineList();
    text = "Hey, #e#h ##n, you can warp to any user on DynastyMS by selecting his or her name. Shoutout to #eYou#n!";
    sum = 0;
    for (var k = 0; k < players.length; k++) {
        sum += players[k].length;
    }
    text += " There are currently #b#e"+sum+"#n#k users online in #b#e"+players.length+"#n#k different channels.\r\n";
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < players[i].length; j++) {
            text += "#b#L"+(count++)+"#"+players[i][j]+"#l#k";
        }
    }
    cm.sendSimple(text);
}


function action(m,t,s) {
    if (m == 1) {
        status++;
    } else {
        cm.dispose();
        return false;
    }
    if (status == 0) {
        x = 0;
        while (s > players[x].length) {
            s -= players[x].length;
            x++;
        }
        cm.gmWarpTo(players[x][s-1]);
        cm.dispose();
    }
}