/*Custom NPC by Thane Krios
 * Kenta - Part of the KoC storyline
 */

var status;

function start() {
    status = -1;
    if (cm.getQ()==19) {
        cm.sendNext("Hello, I'd like to speak to you in private. I have something very important"+
            " to discuss with you.",2);
    } else if (cm.getQ()==36) {
        cm.sendNext("Kenta, do you know anything about the Sharks that live underneath Aquarium?",2);
    } else {
        cm.sendOk("What do you want? I have animals and pets to tend to."), cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (cm.getQ()==36) {
            cm.sendNext("Oh, boy, do I! I've been studying the Sharks for such a long time; several professors have actually gone into the depths of those"+
                " caves in the past and have come back full of riches. They say the road is perilous, however, and that one must be accompanied by"+
            " an experienced fighter to ward off the dangerous monsters there.");
        } else {
        cm.sendNext("Wait, I know what you're going to say. I don't know who it is. I've only speculations and rumors about him ... or her."+
            " If I knew I would tell you.");
        }
    } else if (status == 1) {
        if (cm.getQ()==36) {
            cm.sendNext("Could you perhaps tell me about these Sharks?",2);
        } else {
        cm.sendNext("How do I know you're not trying to protect this traitor?",2);
        }
    } else if (status == 2) {
        if (cm.getQ()==36) {
            cm.sendNext("From what I know the Sharks came from off the coasts of another land, perhaps those nearby Happyville. They were bred in secret"+
                ", but a few escaped through their containment cells and began to breed inside the Aquarium caverns.\r\n\r\n#eLegend has it that"+
            " the first man to see the Sharks saw a sliver of light radiating from their breeding grounds, coming from the alpha Shark; however,"+
        " as he began to sketch down the appearance of the beast a huge burst of light exploded in the cavern and blinded him for a minute. When the"+
    " brightness finally dimmed, he saw only emptiness. The Sharks had disappeared, and the image of the alpha Shark had somehow slipped away from the"+
" edges of his mind like an evanescent dream.");
        } else {
            cm.sendOk("Look, you really think we want another loyalist force coming in here and wrecking the town #eagain#n? Just ask someone else"+
                ", I'm sure they know. I don't get involved with politics.");
                cm.dispose(), cm.completeQ(), cm.talkGuide("I guess we have to try someone else."), cm.dispose();
        }
    } else if (status == 3) {
        if (cm.getQ()==36) {
            cm.sendOk("What memories the man did hold onto were the appearance of the alpha male's minion sharks, though they"+
                " seemed not to resemble anything the alpha male at all. It is weird ... you see. The man could not remember"+
            " the appearance of the alpha male shark, but he knew that the minions were nothing like it.\r\n\r\nThe man wrote down his"+
        " experiences in an ancient book. The book was passed onto a boy named \"Jay\", who lives on #bVictoria Island#k in one of the"+
    " main Imperial cities. Perhaps he knows something about the book."), cm.completeQ();
        }
    }
}