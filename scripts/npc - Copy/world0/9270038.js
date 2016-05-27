/*
 * Name: Jonathan Nguyen
 * Desc: Brings player from CBD on plane ride to KC
*/

function start(){
    if (cm.getMapId()==540010000) {
        switch(cm.getKerningCBDPlaneStatus()){ //NOBOAT(0), TOOLATE(1), CANBOARDBOAT(2)
            case 0:
                cm.sendOk("The plane to Kerning City has already taken off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 1:
                cm.sendOk("The plane to Kerning City is ready to take off, please be patient and wait for next one.");
                cm.dispose();
                break;
            case 2:
                cm.sendYesNo("It looks like there are plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long, but you'll get to your destination just fine. What do you think? Do you wants to get on this ride? #eIt costs 5000 mesos#n.");
                break;
        }
    } else {
        cm.sendYesNo("Would you like to leave this ride?");
    }
}

function action(mode, type, selection) {
    if(mode == 1){
        if (cm.getMeso()>=5000) {
            cm.warp(540010001);
            cm.gainMeso(-5000);
        } else {
            cm.sendOk("You lack the mesos to purchase this trip. Please check your inventory or sell some items.");
        }
    }
    cm.dispose();
}