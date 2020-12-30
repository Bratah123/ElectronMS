// Justice Unlock NPC in Magatia

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
function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} 
	else 
	{
		cm.dispose();
		return;
    }
	if (status == 0) 
	{
		if (cm.getChar().getKeyValue("AddDamageAccess") != null && cm.getChar().getKeyValue("JusticeUnlock") == null) 
		{
			cm.sendYesNo("So you want to unlock Justice bosses?\r\nI will need you to get me :\r\n#i4001623# 3000, #i2435719# 100,  #i5200002# 200,000,000\r\n#i4001832# 50000, #i4310185# 3000");
		}
		else if(cm.getChar().getKeyValue("AddDamageAccess") != null && cm.getChar().getKeyValue("JusticeUnlock") != null)
		{
			cm.sendOk("You already finished the Justice Prequest.");
			return cm.dispose();
		}
		else 
		{
			cm.sendOk("Hmm, it looks like you didn't learn how to use\r\n#rAdditional Damage #kyet!");
			return cm.dispose();
		}
	}
	else if (status == 1) 
	{
		if(cm.getQuantityOfItem(4001623) >= 3000 && cm.getQuantityOfItem(2435719) >= 100 && cm.getQuantityOfItem(4310185) >= 3000 && cm.getQuantityOfItem(4001832) >= 50000 && cm.getMeso() >= 200000000)
		{
			cm.gainItem(4001623, -3000); // Emerald coin
			cm.gainItem(2435719, -100); // Nodestone
			cm.gainItem(4310185, -3000); // Purple Orb
			cm.gainItem(4001832, -50000); // Spell trace
			cm.gainMeso(-200000000); // Mesos
			cm.getChar().setKeyValue("JusticeUnlock", "ok");
			cm.sendOk("You have finished the Justice Prequest.");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials.");
			return cm.dispose();
		}
	}
}
