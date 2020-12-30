// Boss Npc
// Script : 2460015

importPackage(Packages.constants);

var status = -1;

var º° = "#fUI/FarmUI.img/objectStatus/star/whole#";
var HOT = "#fUI/CashShop.img/CSEffect/hot/0#";
var NEW = "#fUI/CashShop.img/CSEffect/new/0#";


function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
     var choose = "          #fnSharing Ghotic Extrabold##fs17##fUI/FarmUI.img/objectStatus/star/whole#ElectronMS Boss System#fUI/FarmUI.img/objectStatus/star/whole#\r\n#fs11##Cgray#    #fUI/FarmUI.img/objectStatus/star/whole3##dWelcome to the ElectronMS Boss System.#fUI/FarmUI.img/objectStatus/star/whole3##k\r\n\r\n#fs11#";
        if (cm.getPlayer().getKeyValue("AddDamageAccess") == null) {
            choose += "  #rPlease finish Justice prequest before talking to me.";
            cm.sendOk(choose);
            cm.dispose();
            }
        if (cm.getPlayer().getKeyValue("GreenTierUnlock") == null) {
            choose += "         Do you want to unlock Green Tier?\r\n";
            choose += "            #L29##fUI/FarmUI.img/objectStatus/star/whole5##r Unlock Green Tier";
            cm.sendOk(choose);
            }
        if (cm.getPlayer().getKeyValue("GreenTierUnlock") != null) {
        choose += "#L1##fUI/FarmUI.img/objectStatus/star/whole5##e#rZakum#k #d( ¡Ú¡Ú¡Ú ) [ HP 1 T ]#k \r\n";
        choose += "#L2##fUI/FarmUI.img/objectStatus/star/whole5##e#rHorntail#k #d( ¡Ú¡Ú¡Ú¡Ú ) [ HP 3 T ]#k \r\n";
        choose += "#L3##fUI/FarmUI.img/objectStatus/star/whole5##e#rFire Wolf#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 5 T ]#k \r\n";
            if (cm.getPlayer().getKeyValue("BlueTierUnlock") == null)
           choose += "\r\n\r\n#L30##fUI/FarmUI.img/objectStatus/star/whole7##r Unlock Blue tier.";


        if (cm.getPlayer().getKeyValue("BlueTierUnlock") != null) {
        choose += "#L999##e#g------------------------------------------------------------\r\n"
        choose += "#L4##fUI/FarmUI.img/objectStatus/star/whole7##e#rHilla#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 10 T ]#k \r\n";
        choose += "#L5##fUI/FarmUI.img/objectStatus/star/whole7##e#rVon Leon#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 25 T ]#k \r\n";
        choose += "#L6##fUI/FarmUI.img/objectStatus/star/whole7##e#rArkarium#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 50 T ]#k \r\n";
        choose += "#L7##fUI/FarmUI.img/objectStatus/star/whole7##e#rCygnus#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 100 T ]#k \r\n";
        choose += "#L8##fUI/FarmUI.img/objectStatus/star/whole7##e#rMagnus#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 180 T ]#k \r\n";
        choose += "#L9##fUI/FarmUI.img/objectStatus/star/whole7##e#rOmni-CLN#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 250 T ]#k \r\n";
        choose += "#L10##fUI/FarmUI.img/objectStatus/star/whole7##e#rPink Bean#k #d( ¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú¡Ú ) [ HP 400 T ]#k \r\n";
            if (cm.getPlayer().getKeyValue("RedTierUnlock") == null)
                   choose += "\r\n\r\n#L30##fUI/FarmUI.img/objectStatus/star/whole6##r Unlock Red tier.";


        if (cm.getPlayer().getKeyValue("RedTierUnlock") != null) {
        choose += "#L1000##e#g------------------------------------------------------------\r\n"
        choose += "#L11##fUI/FarmUI.img/objectStatus/star/whole6##e#rChaos Pierre#k #d( ¡Ú13x ) [ HP 600 T ]#k \r\n";
        choose += "#L12##fUI/FarmUI.img/objectStatus/star/whole6##e#rChaos Von Bon(KFC)#k #d( ¡Ú14x ) [ HP 750 T ]#k \r\n"; // Bugged Map
        choose += "#L13##fUI/FarmUI.img/objectStatus/star/whole6##e#rChaos Queen#k #d( ¡Ú15x ) [ HP 900 T ]#k \r\n";
        choose += "#L14##fUI/FarmUI.img/objectStatus/star/whole6##e#rChaos Vellum#k #d( ¡Ú16x ) [ HP 1.2 Q ]#k \r\n";
            if (cm.getPlayer().getKeyValue("PinkTierUnlock") == null)
                           choose += "\r\n\r\n#L30##fUI/FarmUI.img/objectStatus/star/whole15##r Unlock Pink tier.";


        if (cm.getPlayer().getKeyValue("PinkTierUnlock") != null) {
        choose += "#L1001##e#g------------------------------------------------------------\r\n"
        choose += "#L15##fUI/FarmUI.img/objectStatus/star/whole15##e#rLotus#k #d( ¡Ú17x ) [ HP 2 Q ]#k \r\n";
        choose += "#L16##fUI/FarmUI.img/objectStatus/star/whole15##e#rDamien#k #d( ¡Ú18x ) [ HP 3.5 Q ]#k \r\n";
        choose += "#L17##fUI/FarmUI.img/objectStatus/star/whole15##e#rLucid#k #d( ¡Ú19x ) [ HP 5 Q ]#k \r\n";
        choose += "#L18##fUI/FarmUI.img/objectStatus/star/whole15##e#rDorothy#d( ¡Ú20x ) [ HP 6.5 Q ]#k \r\n";
        choose += "#L19##fUI/FarmUI.img/objectStatus/star/whole15##e#rCross#d( ¡Ú21x ) [ HP 8 Q ]#k \r\n";
        choose += "#L20##fUI/FarmUI.img/objectStatus/star/whole15##e#rPapulatus#d( ¡Ú22x ) [ HP 10 Q ]#k \r\n";
            if (cm.getPlayer().getKeyValue("PurpleTierUnlock") == null)
                          choose += "\r\n\r\n#L30##fUI/FarmUI.img/objectStatus/star/whole16##r Unlock Purple tier.";


        if (cm.getPlayer().getKeyValue("PurpleTierUnlock") != null) {
        choose += "#L1002##e#g------------------------------------------------------------\r\n"
        choose += "#L21##fUI/FarmUI.img/objectStatus/star/whole16##e#rWill#d( ¡Ú23x ) [ HP 15 Q ]#k \r\n";
        choose += "#L22##fUI/FarmUI.img/objectStatus/star/whole16##e#rJin Hilla#d( ¡Ú24x ) [ HP 20 Q ]#k \r\n";
        choose += "#L23##fUI/FarmUI.img/objectStatus/star/whole16##e#rBlack Mage#d( ¡Ú25x ) [ HP 30 Q ]#k \r\n";
                 }
              }
           }
        }
      }
      cm.sendSimple(choose);
	}
	else if (status == 1 && selection >= 29) {

        cm.dispose();
        cm.openNpc(1540101);

    }
	else if(status == 1 && selection < 29)
	{
    if (selection == 1) {//Chaos Zakum
        cm.dispose();
  	cm.openNpc(2030013);

    }else if (selection == 2) {//Chaos Horntail
        cm.dispose();
  	cm.openNpc(9000325);

    }else if (selection == 3) {// Fire Wolf
        cm.dispose();
  	cm.openNpc(9000159);

    }else if (selection == 4) {// Hard Hilla
        cm.dispose();
  	cm.openNpc(9020011);

    }else if (selection == 5) {// Von Leon
        cm.dispose();
  	cm.openNpc(2159310);

    }else if (selection == 6) {// Arkarium
        cm.dispose();
  	cm.openNpc(2159308);

    }else if (selection == 7) {// Cygnus
        cm.dispose();
  	cm.openNpc(2520001);

    }else if (selection == 8) {// Magnus
        cm.dispose();
  	cm.openNpc(3000131);

    }else if (selection == 9) {// Omni-CLN
        cm.dispose();
  	cm.openNpc(2050005);

    }else if (selection == 10) {// Pink Bean
        cm.dispose();
  	cm.openNpc(2141000);

    }else if (selection == 11) {//  Chaos Pierre
        cm.dispose();
  	cm.openNpc(1530623);

    }else if (selection == 12) {// Chaos Von Bon(KFC)
        cm.dispose();
  	cm.openNpc(9000204);

    }else if (selection == 13) {// Chaos Queen
        cm.dispose();
  	cm.openNpc(1530665);

    }else if (selection == 14) {// Chaos Vellum
        cm.dispose();
  	cm.openNpc(1064017);

    }else if (selection == 15) {// Lotus
        cm.dispose();
  	cm.openNpc(1404005);

    }else if (selection == 16) {// Damien
        cm.dispose();
  	cm.openNpc(1530621);

    }else if (selection == 17) {// Lucid
        cm.dispose();
  	cm.openNpc(3003208);

    }else if (selection == 18) {// Dorothy
        cm.dispose();
  	cm.openNpc(2540011);

    }else if (selection == 19) {// Cross
        cm.dispose();
  	cm.openNpc(9073003);

    }else if (selection == 20) {// Papulatus
        cm.dispose();
  	cm.openNpc(2043000);

    }else if (selection == 21) {// Will
        cm.dispose();
  	cm.openNpc(2020005);

    }else if (selection == 22) {// Jin Hilla
        cm.dispose();
  	cm.openNpc(1064002);

    }else if (selection == 23) {// Black Mage
        cm.dispose();
  	cm.openNpc(9010010);

    }else if (selection == 29) {// Unlock
           cm.dispose();
           cm.openNpc(1540101);
    }else if (selection == 30) {// Unlock
             cm.dispose();
       	cm.openNpc(1540101);
    }else if (selection == 31) {// Unlock
             cm.dispose();
       	cm.openNpc(1540101);
    }else if (selection == 32) {// Unlock
             cm.dispose();
       	cm.openNpc(1540101);
    }else if (selection == 33) {//Unlock
             cm.dispose();
       	cm.openNpc(1540101);
    }else if (selection == 34) {// Unlock
             cm.dispose();
       	cm.openNpc(1540101);
    }

	} 
}