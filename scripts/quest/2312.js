/* ===========================================================
			Resonance
	NPC Name: 		Maple Administrator
	Description: 	Quest -  Kingdom of Mushroom in Danger
=============================================================
Version 1.0 - Script Done.(17/7/2010)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
        qm.dispose();
		
	}
	cm.sendOk("okay!");
	//qm.forceStartQuest();
}

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
		    qm.dispose();
			return;
		}
	}
	if(status == 0)
		qm.sendNext("Hmmm? Is that a #brecommendation letter from the job instructor#k??! What is this, are you the one that came to save us, the Kingdom of Mushroom?");
	if(status == 1)
		qm.sendNextPrev("Hmmm... okay. Since the letter is from the job instructor, I suppose you are really the one. I apologize for not introducing myself to you earlier. I'm the #bHead Security Officer#k in charge of protecting King Mush. As you can see, this temporary hideout is protected by the team of security and soldiers. Our situation may be dire, but nevertheless, welcome to Kingdom of Mushroom.");
	if(status == 2){
		qm.gainItem(4032375, -1);
		qm.forceCompleteQuest();
		qm.updateQuest(2311, "1");
		qm.dispose();
	}
}
