/*
 * Name: Jonathan Nguyen
 * Version: 1.0
 * Description: Bookcase that is part of KoC storyline for the Sharks quest.
 */

var status;

function start() {
    status = -1;
    if (cm.getQ()!=38) {
        cm.playerMessage(6, "It seems to be a bookshelf tucked away behind a poster.");
        cm.dispose();
    } else {
        cm.sendNext("Hmm ... what is this?\r\n\r\n#L0##b(There is a bookshelf tucked away"+
            " behind the Balrog information sign. Investigate?)#k",2);
    }
}

function action(mode,type,selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("#L1##b(There is a blue-spine book juxtaposed against other gray ones. Perhaps this is the book you are looking for)");
    }
}