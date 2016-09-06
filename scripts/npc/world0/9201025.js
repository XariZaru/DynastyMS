/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *9201025 - Nana(O)
 *@author Jvlaple
 */
 var status = -1;
 
function start() {
    if (cm.getLevel() < 50) {
		cm.sendOk("Boy, making things is a bit hard nowadays!");
		cm.dispose();
	} else if (cm.getPlayer().getDynastyQuest("Learning a New Craft") == 0) {
		cm.sendNext("Did you know that you can make things when you're strong enough, such as cool weapons, or you can disassemble them into really cool things, like #bmonster crystals#k?");
	} else {
		cm.sendOk("I hope you like what you've learned! The #eMaker Skill#n truly is a wonderful thing to take ahold of!");
		cm.dispose();
	}
}

function action(m,t,s) {
	if (m != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		cm.sendNext("Well, you're in luck because this power can only be ascertained by strong, strong people! Without the proper power to wield this, you might find yourself being overwhelmed by its properties! Just take a step back, breathe, and I'll transfer the knowledge I have of this skill to you!");
	} else if (status == 1) {
		cm.sendNext("You let Nana(O) put her hand on you and channel the knowledge from herself to you. You feel memories of an ancient deity flow into your mind, and all of a sudden a newfound knowledge becomes evident.", 2);
	} else if (status == 2) {
		cm.sendOk("All done! You should check your #eskills#n tab for the #bMaker Skill#k! I hope you like what you've learned today!");
		cm.getPlayer().completeDynastyQuest("Learning a New Craft");
		cm.teachSkill(10001007, 3, 3, -1);
		cm.teachSkill(1007, 3, 3, -1);
		cm.teachSkill(20001007, 3, 3, -1);
	}
}
//
//function action(mode, type, selection) {
//    if (mode == -1) {
//        cm.dispose();
//    } else {
//        if (mode == 0 && status == 0) {
//            cm.dispose();
//            return;
//        }
//        if (mode == 1)
//            status++;
//        else
//            status--;
//        if (cm.getPlayer().getMarriageQuestLevel() == 1 || cm.getPlayer().getMarriageQuestLevel() == 52) {
//            if (!cm.haveItem(4000083, 20)) {
//                if (status == 0) {
//                    cm.sendNext("Hey, you look like you need proofs of love? I can get them for you.");
//                } else if (status == 1) {
//                    cm.sendNext("All you have to do is bring me 20 #bJr. Sentinel Pieces.#k.");
//                    cm.dispose();
//                }
//            } else {
//                if (status == 0) {
//                    cm.sendNext("Wow, you were quick! Heres the proof of love...");
//                    cm.gainItem(4000083, -20)
//                    cm.gainItem(4031369, 1);
//                    cm.dispose();
//                }
//            }
//        } else {
//            cm.sendOk("Hi, I'm Nana the love fairy... Hows it going?");
//            cm.dispose();
//        }
//    }
//}