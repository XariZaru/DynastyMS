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
/* Athena Pierce
	Archer Job Advancement
*/

var status = 0;
var jobName;
var jobId;

function start() {
	cm.sendYesNo("I think you may have come here to job advance, but job advancing isn't GMS-like in DynastyMS. I'll take you to #bEllinia#k. Talk with #eTaeng the Explorer#n to continue your storyline. Make sure you follow your guide's hints! You can talk to your guide by double clicking on the NPC that follows you.");
}

function action(m,t,s) {
	cm.warp(101000000);
	cm.talkGuide("I'm your guide! If you're ever lost, talk to me!", 0);
	cm.dispose();
}
