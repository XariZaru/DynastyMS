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
/* 
 * @Name         NimaKIN 
 * @Author:      Signalize 
 * @NPC:         9900000 
 * @Purpose:     Hair/Face/Eye Changer -- May set job as GM too 
 * @GMSPurpose:  Sets one's job as a GM. 
 * @Map:         180000000 
 */ 
var status = 0; 
var beauty = 0; 
var haircolor = Array(); 
var skin = [0, 1, 2, 3, 4, 5, 9, 10]; 

var fhair= [31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31400, 31410, 31420, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 34120, 34130, 34140, 34150, 34160, 34170, 34180, 34190, 34210, 34220, 34230, 34240, 34250, 34260, 34270, 34310, 34320, 34330, 34340, 34350, 34360, 34370, 34380, 34400, 34410, 34420, 34430, 34440, 34450, 34470, 34480, 34490, 34510, 34540, 34560, 34580, 34590, 34600, 34610, 34620, 34630, 34640, 34650, 34660, 34670, 34680, 34690, 34700, 34710, 34720, 34730, 34740, 34750, 34760, 34770, 34780, 34790, 34800, 34810, 34820, 34830, 34840, 34850, 34860, 34870, 34880, 34890, 34900, 34910, 34940, 34950, 34960, 34970, 34980, 37000, 37010, 37020, 37030, 37040, 37060, 37070, 37080, 37090, 37100, 37110, 37130, 37140, 37150, 37200, 37210, 37220, 37230, 37250, 37260, 37270, 37300, 37310, 37320, 37330, 37340, 37350, 37370, 37380, 37400, 37450, 37460, 37470, 37490, 37500, 37510, 37520, 37530, 37590, 37600]; 

var hair = [30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 36010, 36020, 36030, 36040, 36050, 36060, 36070, 36080, 36090, 36100, 36130, 36140, 36150, 36160, 36170, 36180, 36190, 36200, 36210, 36220, 36230, 36240, 36250, 36260, 36270, 36280, 36320, 36330, 36340, 36350, 36380, 36390, 36410, 36420, 36460, 36470, 36480, 36490, 36500, 36510,36520, 36530, 36600, 36610, 37120, 37160, 37170, 37240]; 

var hairnew = Array(); 
var face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20026]; 
var fface = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21024, 21025]; 
var facenew = Array(); 
var colors = Array(); 

function start() { 
    if (cm.getPlayer().isGM()) {
        cm.sendSimple("Hey there, I can change your look. What would you like to change?#b\r\n#L0#Skin#l\r\n#L1#Hair#l\r\n#L5#Female Hair#l\r\n#L2#Hair Color#l\r\n#L3#Eye#l\r\n#L6#Female Eyes#l\r\n#L4#Eye Color#l"); 
    } else {
        cm.sendOk("You are not allowed to use this GM feature NPC.");
        cm.dispose();
    }
} 

function action(mode, type, selection) { 
    status++; 
    if (mode != 1 || cm.getPlayer().gmLevel() < 0){ 
        cm.dispose(); 
        return; 
    } 
    if (status == 1) { 
        beauty = selection + 1; 
        if (selection == 0) 
            cm.sendStyle("Pick one?", skin); 
        else if (selection == 1 || selection == 5) { 
            for (var i in selection == 1 ? hair : fhair) 
                hairnew.push(i); 
            cm.sendStyle("Pick one?", hairnew); 
        } else if (selection == 2) { 
            //Zeta, All Black, Military, Mohawk hair -> black only 
            var colorint = 8; 
            var curhair = cm.getPlayer().getHair(); 
            if (curhair == 30010 || curhair == 30070 || curhair == 30080 || curhair == 30090) { 
                colorint = 1; 
            } 
            //Reset hair to black, otherwise able to go next hair style 
            var curhaircolor = parseInt(cm.getPlayer().getHair().toString().charAt(4)); 
            if (curhaircolor > 0) { 
                cm.setHair(cm.getPlayer().getHair() - curhaircolor); 
            }     
            for(var k = 0; k < colorint; k++) 
                haircolor.push(cm.getPlayer().getHair() + k); 
            cm.sendStyle("Pick one?", haircolor); 
        } else if (selection == 3 || selection == 6) { 
            for (var j in selection == 3 ? face : fface) 
                facenew.push(j); 
            cm.sendStyle("Pick one?", facenew); 
        } else if (selection == 4) { 
            for(var i = 0; i < 9; i++) 
                colors.push(cm.getPlayer().getFace() + (i*100)); 
            cm.sendStyle("Pick one?", colors); 
        } else if (selection == 7) { 
            cm.getPlayer().changeJobById(910); 
            cm.dispose(); 
        } 
    } else if (status == 2){ 
        if (beauty == 1) 
            cm.setSkin(skin[selection]); 
        if (beauty == 2 || beauty == 6) 
            cm.setHair(hairnew[selection]); 
        if (beauty == 3) 
            cm.setHair(haircolor[selection]); 
        if (beauty == 4 || beauty == 7) 
            cm.setFace(facenew[selection]); 
        if (beauty == 5) 
            cm.setFace(colors[selection]); 
        cm.dispose(); 
    } 
}