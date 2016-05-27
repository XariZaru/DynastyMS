var status = -1;
var pers = false;
var honor = false;
var steal = false;
var skillText = ["Persuasion is the art of convincing others to do your bidding. It is useful for tricking guards and avoiding combat. More often than not we thieves can avoid conflict by simple words of the tongue. The more you practice your persuasion on others, the more adept you will become at endeavors. Use this skill wisely.", "Honor is how others perceive your status. More often than not the poor and middle-class will never take your integrity into question as you are obscure. To the nobles and royals, however, their agents who keep tabs on people throughout the Empire will have plenty of information on you. Of course, they don't know where our hide-out is, but they know of the general direction in which we leave. How do I know this? I used to be one of those agents myself, always hiding in the dark and spying on others.\r\n\r\nThe best way you can improve your integrity is to tell the truth when it counts. This is where people will remember you most by. Small white lies will have less of an impact, but build up a number of them and you'll regret it. A tarnished reputation is worse than no reputation at all.", "Steal is one of your most useful skills. It allows you to pawn items from people without their knowledge. If you fail, however, there is an almost positive chance that the guards will descend upon you. At that point you must choose to either run, or to fight like a man. Like all skills, you must practice this to hone its effectiveness."];
var bottom = 596;
var height = 83;
var pole = 1442000;

function sQuest(exp, meso, guide) {
    if (guide == null) {
        guide = "Why don't we talk to Sejan again to see what we have to do?";
    }
   text = "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#fUI/UIWindow.img/QuestIcon/8/0# "+exp+" exp\r\n#fUI/UIWindow.img/QuestIcon/7/0# "+meso+" meso";
   cm.gainExp(exp);
   cm.gainMeso(meso);
   cm.completeQ();
   cm.talkGuide(guide);
   return text;
   cm.dispose();
}

function start() {
	if (cm.countMonster > 0) {
        cm.sendOk("You need to kill all monsters!");
    } else {
        switch (cm.getQ()) {
            case 28:
                cm.sendNext("It seems I've taught you all you need to know until later. I feel you can go out and practice your skills until you are a true master. I'll have missions for you to do; sly missions, sneaky missions, dangerous missions, all the missions you can think of! My, I'm ecstatic just thinking about it!");
                break;
            case 27:
                cm.sendOk("Hahaha! That's absolutely wonderful. Here, take this, learn this, I don't care what you do with this! I'm absolutely ecstatic!\r\n\r\n#eLearned:#n #s21001003#"+sQuest(2000,25000, "This is absolutely cool! Sejan's taught us everything he knows for our skill cap. We should train hard and come back later to make him proud!")+"");
                cm.teachSkill(21001003,0,20,-1);
                cm.dispose();
                break;
            //<editor-fold defaultstate="collapsed" desc="27">
            case 26:
                cm.sendAcceptDecline("Hahaha! And I thought you'd have issues fighting against those monsters! Tell you what, if you can past this test I'll give you the last skill I know for your skill cap. What do you say? I'm just positive you'll love this new ability!");
                break;
            case 25:
                cm.sendAcceptDecline("Why don't we train you a little more and help you strengthen your hands? You may be skillful at what you do, but it's obvious that you lack the stamina for a real battle. The best way to train a man is to give him the skills and grind him into dust. That way he will learn everything by muscle memory and have the consistency to show for it.");
                break;
            case 24:
                cm.sendNext("Okay, the first thing I'm going to teach you is something called #b#q21000000##k. It will allow you to follow up your original attack with another, potentially disrupting the enemy with your raw power.\r\n\r\n#eDo you wish to learn it?#n");
                break;
            case 23:
                cm.sendNext("#b(Sejan paces back and forth at the top of the steps)#k",2);
                break;
            case 22:
                cm.sendNext("Now, as a thief you must learn how to be cunning and use the skills you have to win over others. Without these skills your life as a thief will be nothing but a failure: it is what separates us skilled rogues from the unskilled, the adept from the pathetic.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="19-22">
            case 21:
                cm.sendOk("My, what a brilliant display of skill! I haven't seen someone who can learn as fast as you do!"+sQuest(200,1500)+"");
                cm.dispose();
                break;
            case 18:
                cm.sendAcceptDecline("Now, I understand there is a lot for you to learn. If you'd like, I can train you until you grow stronger right here. Yup, right here. We don't need to go anywhere else. I have all of my equipment here and we're set on food as the younglings have gone out for the pillaging. What do you say?");
                break;
            case 19:
                cm.sendAcceptDecline("Are you ready for your first lesson? With the knowledge I endowed upon you earlier this should be easy!");
                break;
            case 20:
                cm.sendAcceptDecline("Haha, that was a very good job! The way you master your weapon is simply outstanding! Come, let us kill some more!");
                break;
            default:
                cm.sendOk("My, what a view this is!");
                cm.dispose();
                break;
            //</editor-fold>

            }
        }
}

function action(m,t,selection) {
	if (m == 1) {
		status++;
	} else {
		return;
	}
	if (status == 0) {
		switch(cm.getQ()) {
		    case 28:
		     cm.sendAcceptDecline("There's so much for you to do out there, so much to learn. Imagine the people we can steal from. Imagine how we'll be able to feed ourselves and never have to starve! Imagine the young ones, always having food and always having clothes. My, my. All you have to do, #b#h ##k, is to go out there and train yourself so you may become strong. So that you may hold your own against anyone.\r\n\r\n#eWhat do you say?#n");
		     break;
		 //<editor-fold defaultstate="collapsed" desc="Up to 27">
		     case 26:
		         cm.sendOk("Perfect! Why don't you give these guys a try and tell me what you think of them!");
		         break;
		     case 25:
		         cm.sendOk("Here, kill these guys again. I've made them a little stronger, so be careful when fighting against them.");
		         break;
		     case 24:
		         cm.sendOk("You've learned #b#q21000000##k. Why don't you give it a try next time?");
		         cm.teachSkill(21000000,0,20,-1);
		         cm.completeQ();
		         cm.talkGuide("Why don't we talk to Sejan again to see what we have to do?");
		         cm.dispose();
		         break;
		     case 23:
		         cm.sendAcceptDecline("I've been thinking: there's a little more I haven't taught you yet. If you'd like, I'd like to test you a few more times in exchange for these skills. What do you say? Another round?");
		         break;
		     case 22:
		         cm.sendSimple(""+(!pers && !honor && !steal ? "These are your following attributes which distinguish you from the rest. If you'd like for me to elucidate on any of the skills you can simply ask me." : "What other skills would you like me to elucidate upon?")+"\r\n\r\n#b#L0#Persuasion: "+cm.getPlayer().getPersuasion()+"\r\n#L1#Integrity: "+cm.getPlayer().getHonor()+"\r\n#L2#Steal: "+cm.getPlayer().getSteal()+""+(pers && honor && steal ? "\r\n#L3#I'm Good" : "")+"");
		         break;
		     //</editor-fold>
		 //<editor-fold defaultstate="collapsed" desc="Up to 21">
		     case 20:
		         cm.sendOk("Why don't you kill these guys for a change? #eI've given you some potions, so don't be afraid to fight!#n");            
		         break;
		     case 18:
		         cm.sendOk("Fantastic! Let me just get the materials ready for our training so we can practice. We have such a good vantage point and view from here: you can see the city, the clouds. You can breathe in the fresh air. Man, isn't this the outlaw's life right here? And when we're tired of training or if the monsters have gotten out of control, we can just sit our butts down at the top of these stairs and watch them scurry about.\r\n\r\nThis is the life, isn't it, #h #? I've been waiting all my life for something this good. #eDang I'm excited!#n");
		         cm.completeQ();
		         cm.dispose();
		         break;
		     case 19:
		         cm.sendOk("Kill all the pigs in the vicinity and report back to me as soon as possible!");
		         break;
		}
	     //</editor-fold>
		} else if (status == 1) {
			switch(cm.getQ()) {
            case 28:
              cm.sendYesNo("Splendid! I need you to do something for me. Our network stretches across continents, if I haven't told you. Thieves band together to find mutual interests and to help one another out. If you ever come upon something called #bMaster Thief#k, speak to it. He'll take you to me using our spy network. He'll even be able to take you to other towns free of charge, although he won't be able to take you back for an entire day.\r\n\r\nYou should speak with him to find out more information on our network.");
              break;
            //<editor-fold defaultstate="collapsed" desc="Up to 21">
          case 20:
              cm.getPlayer().setQuesting(true, 4);
              cm.spawn(1210101, 4, 596, 83);
              cm.gainItem(2000013,100), cm.gainItem(2000014,100);
              cm.dispose();
              break;
          case 19:
              cm.spawn(1210100,5,596,83);
              cm.getPlayer().setQuesting(true, 5);
              cm.talkGuide("Haha! Pigs! Let's go kill the swine and have them for dinner!");
              cm.dispose();
              break;
          //</editor-fold>
          //<editor-fold defaultstate="collapsed" desc="27">
          case 26:
        	  cm.spawn(2110200,15,bottom,height);
              cm.getPlayer().setQuesting(true, 15);
              cm.talkGuide("Let's get at them!");
              cm.dispose();
              break; 
          case 25:
              cm.spawn(2110200,8,bottom,height);
              cm.getPlayer().setQuesting(true, 18);
              cm.talkGuide("Haha, if he thinks he can stop us with a few of these cappy looking monsters, he's sorely mistake! C'mon "+cm.getPlayer().getName()+", let's get at them!");
              cm.dispose();
              break;
          case 24:              
              cm.spawn(1110100,bottom,height,100,380,16,10);
              cm.completeQ();
              cm.dispose();
              break;
          case 23:
              cm.sendNext("Brilliant! You're going to learn a brilliant new skill soon. If you'd like to continue, just tell me when.");
              break;
          case 22:
              switch(selection) {
                  case 0:
                      pers = true;
                      break;
                  case 1:
                      honor = true;
                      break;
                  case 2:
                      steal = true;
                      break;
              }
              if (selection == 3) {
                  cm.sendOk("Good, I'm glad I got that settled with you. There are a few more things I'd like to do with you before you embark to train elsewhere."+sQuest(500,20000));
                  cm.dispose();
              } else {
                  cm.sendNext(skillText[selection]);
                  status = -1;
                  break;
              }
          //</editor-fold>

        }
	} else if (status == 2) {
		switch(cm.getQ()) {
	        case 28:
	            cm.sendOk("I will take you to #bOrbis#k now so that you may meet with him. He'll answer any questions you have about our organization.");                    
	            break;
			case 23:
			    cm.sendOk("I've just let loose a few more monsters. Why don't you give them a try: I've also given you a new #epolearm#n. Equip that before you go down there and tell me how much stronger it feels in comparison to your old one.");
			    cm.gainItem(pole);
			    cm.getPlayer().setQuesting(true, 5);
			    cm.spawn(1110100,5,bottom,height);
			    cm.talkGuide("Wow, those look a lot stronger than the lackey he brought in earlier! Let's go show him our prowess in battle!");
			    break;
			default:
				break;
		}
	} else if (status == 3) {
		switch(cm.getQ()) {
	        case 28:
	            cm.completeQ();
	            cm.warp(200000000);
	            cm.talkGuide("Look to your left! There's the man he speaks of! Why is he ... made of stone?",2);
	            cm.dispose();
	            break;
    }
	}
}