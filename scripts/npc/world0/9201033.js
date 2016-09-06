/*
 * Author: Jonathan Nguyen
 * 5/11/2013
 * Simon, hotel NPC of Happyville
 */

var status;
var item = 4032055;

function start() {
    status = -1;
    if (cm.getQ()==7) {
        cm.sendNext("Would you like to spend the night at our luxurious hotel? It's quite comfortable and I'm sure you would love to rest your tired feet.");
    } else if (cm.getQ()>=8) {
        cm.sendYesNo("Would you like to enter the hotel? I see you have been a great help to our town.");
    } else {
    cm.sendNext("Hello! Wouldn't you love to spend the night at our luxurious hotel? It's comfortable, clean, and very lively!");
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    (mode == 1 ? status++ : status--);
   if (status == 0) {
       if (cm.getQ()==7) {
            cm.sendNext("There are so many sights to see as well! We've got the magical #e#bChristmas Tree#k#n, #e#bSanta Claus#k#n, and our very own #e#r\"Roodolph the Reindeer#k#n\"!")
       } else if (cm.getQ()>=8) {
            cm.warp(209000100);
            cm.dispose();
        }
   } else if (status == 1) {
        if (cm.getQ()==7) {
            cm.sendNext("I'd like a room for three please. How much would that cost?", 2);
        }
   } else if (status == 2) {
        if (cm.getQ()==7) {
            cm.sendOk("Actually, tonight is a free night because #bSanta#k is giving out promotional offers to encourage holiday cheer. You'll be in room #b403#k."+
                      " Remember that, all right?");
        }
   } else if (status == 3) {
        if (cm.getQ()==7) {
            cm.gainItem(item, 3);
            cm.talkGuide("Room 403! Cool, what luck! We should rush these to your parents so they can rest as soon as possible!", 0);
            cm.showInstruction("Let's get back to your parents!", 200, 50);
			cm.completeQ();
            cm.dispose();
      }
   }
}