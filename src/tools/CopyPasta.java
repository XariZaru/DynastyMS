/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import client.MapleCharacter;
import client.MapleClient;
import constants.ServerConstants;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.util.List;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import server.MapleItemInformationProvider;
import server.life.MapleMonsterInformationProvider;
import server.life.MonsterDropEntry;

/**
 *
 * @author peter
 */
public class CopyPasta {

//    public static boolean inProgress = false;
    public static void openSearchNpc(MapleClient c, String str) {
//        inProgress = true;
        if (c != null && str != null) {
            NPCScriptManager.getInstance().start(c, 9010000, "searchNpc", null, str);
        }
    }

    public static void openMapMobDropsNpc(MapleClient c, String str) {
        if (c != null && str != null) {
            NPCScriptManager.getInstance().start(c, 9010000, "MapMobDropsNpc", null, str);
        }
    }

    public static void showMobDrops(NPCConversationManager cm, String mobIdString) {

        if (cm == null && mobIdString == null) {
            return;
        }

        try {
            int mobId = Integer.parseInt(mobIdString.substring(
                    mobIdString.indexOf("#o")+2,
                    mobIdString.indexOf("##n")));
            cm.sendOk(mobDropsOutput(cm.getPlayer(), mobId));
        } catch (NumberFormatException nfe) {
            cm.sendOk(mobIdString);
        }
        cm.dispose();
    }

    public static String mobDropsOutput(MapleCharacter player, int mobId) {
        StringBuilder output = new StringBuilder();

        output.append("#eDrops List#n\r\n");

        //sorted drops (according to item types) :D
        List<MonsterDropEntry> drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobId);

        if (!drops.isEmpty()) {
            final MapleItemInformationProvider miip = MapleItemInformationProvider.getInstance();
            for (MonsterDropEntry drop : drops) {
                String itemName = miip.getName(drop.itemId);

                if (itemName != null && drop.chance != 0) {
                	double drop_rate = 1000000 / player.getDropRate();
                    output.append("- #i" + drop.itemId + "# #z" + drop.itemId + "# (" + (Math.round(drop.chance/drop_rate * 100d * 100000))/100000d + "%)" + "\r\n");
                }
            }
        } else { //if the mob has no drops
            output.append("Oops, it got so hungry so it ate them all, Bad #o" + mobId
                    + "#. Let us know if it should drop any items!");
        }
        output.append("\r\n\r\n");

        return output + "";
    }

    public static String[] split(String string, String regex) {
        return string.split(regex);
    }

//    public static void clear() {
//        inProgress = false;
//        client = null;
//        string = null;
//    }
//    public static void startSearchNpc() {
//        if (client != null && string != null) {
//            NPCScriptManager.getInstance().start(client, 9010000, "searchNpc", null, string);
//            clear();
//        }
//    }
    //this is tailored for search command, for now.
    public static void copyToClipboard(MapleCharacter chr, String s) {
        //we only want to copy id
        s = s.substring(2, s.indexOf("#k")); // 2 = s.indexOf("#b") + "#b".length()

        StringSelection stringSelection = new StringSelection(s);
        Clipboard clpbrd = Toolkit.getDefaultToolkit().getSystemClipboard();
        clpbrd.setContents(stringSelection, null);
        chr.dropMessage(5, "\"" + s + "\" is copied to your clipboard, you can just paste it somewhere. Use ctrl + v :)");
    }
}
