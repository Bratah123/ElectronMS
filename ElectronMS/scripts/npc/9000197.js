importPackage(Packages.packet.creators);
importPackage(Packages.handler.channel);
importPackage(Packages.constants);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
importPackage(Packages.tools);
importPackage(java.util);

var bp = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}



/*  Treasure Box Unlock NPC  */

function action(mode, type, sel) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
    	}
		
	if (status == 0) {
		if (cm.getPlayer().getKeyValue("JusticeUnlock") != null) {
			if (cm.getPlayer().getKeyValue("TreasureUnlock") == null) {
				cm.sendYesNo("Welcome to monster Par.. i mean welcome so you want\r\nto unlock Treasure Bosses i see..\r\nI will need you to get me :\r\n#i4001623# 5000, #i4310034# 8000, #i2435719# 500,\r\n#i5200002# 1,000,000,000, #i4310185# 12000");
			} 
			else 
			{
				cm.sendOk("#fs11#You already completed the Treasure Prequest.");
				cm.dispose();
			}
		}
		else {
			cm.sendOk("Hmm, it looks like you didn't finish\r\n#rJustice Prequest #kyet!");
			cm.dispose();
		}
	}
	else if (status == 1) {
		if (cm.getQuantityOfItem(4001623) >= 5000 && cm.getQuantityOfItem(2435719) >= 500 && cm.getQuantityOfItem(4310034) >= 8000 && cm.getQuantityOfItem(4310185) >= 12000 && cm.getMeso() >= 1000000000) {
			cm.gainItem(4001623, -5000); // Emerald coin
			cm.gainItem(2435719, -500); // Nodestone
			cm.gainItem(4310034, -8000) // Justice Coins
			cm.gainItem(4310185, -12000); // Purple Orb
			cm.gainMeso(-1000000000); // Mesos
			cm.getPlayer().setKeyValue("TreasureUnlock", "ok");
			cm.sendOk("#fs11#You have now unlocked the Treasure section in @boss.");
			return cm.dispose();
        }
		else
		{
			cm.sendOk("You do not have the neccessary materials.");
			return cm.dispose();
		}
	}
}