importPackage(Packages.packet.creators);
importPackage(Packages.handler.channel);
importPackage(Packages.constants);
importPackage(Packages.server.LifeEntity.Npc.NpcScript)

var bp = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

/*  Additional Damage Unlock NPC */


function action(mode, type, sel) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
    	}
	if (status == 0) {
		if (cm.getPlayer().getKeyValue("AddDamageAccess") == null) {
			cm.sendYesNo("So you want to learn how to use Additional Damage?\r\nI will need you to get me :\r\n#i4001623# 2000, #i4001832# 50000, #i5200002# 50,000,000");

		} 
		else {
			cm.sendOk("#fs11#You already finished the Additional Damage Prequest.");
			return cm.dispose();
		}
	} 
	else if (status == 1) {
		if (cm.getQuantityOfItem(4001623) >= 2000 && cm.getQuantityOfItem(4001832) >= 50000 && cm.getMeso() >= 50000000) 
		{
			cm.getPlayer().setKeyValue("AddDamageAccess", "ok");
			cm.gainItem(4001623, -2000); // Emerald Coin
			cm.gainItem(4001832, -50000); // Spell Trace
			cm.gainMeso(-50000000); // Mesos
			cm.getChar().setKeyValue("AddDamageAccess", "ok");
			cm.sendOk("#fs11#Additional damage now available.");
			return cm.dispose();
        }
		else
		{
			cm.sendOk("You do not have the neccessary materials.");
			return cm.dispose();
		}

	}
}
