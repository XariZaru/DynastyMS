var status, choice, 
        patchNum = [["1.0", "1.1", "1.2", "1.3"],["1.0", "1.1", "1.2"],[],[]], // <---- Each .1 interval is = 1 week of updates
        patch = 
                // <editor-fold defaultstate="collapsed" desc="Pre-Alpha">
    [[["- Level 1-30 Explorer storyline created.\r\n- TestPoints for account added.\r\n- CustomQuest added.\r\n- Level 1-10 Knights of Cygnus added."+
            "\r\n- Set spawn maps for the three classes.\r\n- Added guide to assist the player.\r\n- Added portal scripts for Altaire"+
        "\r\n- Converted Happyville to beginner's starting place.\r\n- Decided which towns belong to which party.\r\n- Added in Custom CPQ."],
        ["- Level 30 - 90 Explorer storyline made.\r\n"+
        "- Level 10 - 20 storyline Knights of Cygnus made.\r\n- Added @guide for removal of guide (will return during quests).\r\n- Added setNPC"+
    "scriptable (makes all NPCs codable).\r\n- Fixed Orbis boat.\r\n- Added in goal npc named \"Pietro\".\r\n- Added event npc named \"Vikoon\"."+
" Currently only in Henesys.\r\n- 2nd Job for Knights of Cygnus.\r\n- Paul, All-in-One PQ NPC."], 
["- Knights of Cygnus level 30 chain quest finished.\r\n- Changes to delays in guide when talking.\r\n- Changes to guide when spawned.\r\n"+
            "- Knights of Cygnus updated to level 70.\r\n- Bug Report NPC (Cody) added\r\n- KoC chain quest level 70 finished."+
        "\r\n- Marked down which towns belong to which faction.\r\n- KoC updated to level 90.\r\n- Added Chair Gachapon NPC, "+
        "Nana(H).\r\n- Added Event Trophy Exchanger NPC, Mia. \r\n- Fixed The Ticket Gate not reading tickets correctly.",
        "\r\n- Added in Quest Log NPC for guide.\r\n- Added in maple items exchange for Gaga.\r\n- Added in Rooney as the beta quest NPC.",
    ], ["- Steal skill added.\r\n- Persuasion skill added.\r\n- Integrity skill added.\r\n- First parts of legend storyline coded.\r\n"+
            "- WZ Edits added (UI and Faces/Chairs)\r\n- Fixed Alcaster\r\n- Level 90 KoC.\r\n- Added Maple Shields to Gaga.\r\n- Voting NPC created.\r\n- Donation"+
        " NPC created."]], // <------ add to this current array, Kyo/Bram. Format is "\r\n - TEXT"
        // </editor-fold>
    ["- Level 90 KoC Storyline.\r\n- Drop rate of chaos scrolls lowered.\r\n- Drop rate of maple leaves lowered.\r\n- Level 100 KoC Storyline."+
            "\r\n- Began work on lottery npc.\r\n- Henesys Gachapon (added ~90 more items)\r\n- Hene gach now uses 3 tix.\r\n- Rooney now has 2 options, beta and daily"+
        "\r\n- Added in common items for Rooney\r\n- Fixed Gaga maple shield purchase\r\n- Disabled Chair gach npc\r\n- Finished"+
    " daily rewards NPC Rooney\r\n Began coding on 110 Explorer\r\n- Boats all fixed (Credits to Dev)", "- EXP rate changed\n\
 to 12x (maybe 8x later)\r\n- Bulletin Board w/ famous Imperial Legions added\r\n- Disabled event trophy again\r\n- Reenabled Henesys Gach\n\
\r\n- 4th Job Explorer coded\r\n- Perion Gacha finished\r\n- NLC Gacha finished\r\n- Boats fixed", "- First parts of Aran coded\r\n- Ariant NPC fixed (boat ride)\r\n- Ariant Castle palace portal edited and fixed\r\n- Donation Packages added\r\n- More skills to Wu Yuan\r\n- Fixed a part in Taeng storyline\r\n- Fixed boats finally (hopefully no more errors)\r\n- Reduced prize in Rooney's Beta Option"],
    [],
    []], again;
// patch is a multi,  multi array. Two arrays in one array.
// 0 = pre-alpha, 1 = alpha, 2 = beta, 3 = official release

function start() {
    status = -1;
    cm.sendNext("Hello, you must be #b#h ##k, I'm the #bNews Stand#k npc.");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple(""+(again != 1 ? "I keep log of all the patch and revisions made every week by the #bDynasty#k team. Which of the patch notes would you like to"+
        " review?" : "What other logs or revisions would you like to review?")+"\r\n\r\n#b#L0#Pre-Alpha\r\n#L1#Alpha");
    } else if (status == 1) {
        choice = selection;
        text = "\t\t\t\t\t\t\t\#e---===Revision Logs===---#n\r\n";
       if (cm.getLevel()>0) {
           for (var i = 0; i < patchNum[selection].length; i++) {
               text += "\r\n#L"+i+"##b"+patchNum[selection][i]+"#k";
           }
           cm.sendSimple(text);
       }
    } else if (status == 2) {
        cm.sendNext("\t\t\t\t\t\t\t#e---===Revision Log "+patchNum[choice][selection]+"===---#n\r\n\r\n"+patch[choice][selection]+"");
    } else if (status == 3) {
        status = -1, again = 1;
        cm.sendYesNo("Would you like to review more logs and revisions?");
    }
}