importPackage(Packages.packet.creators);
importPackage(Packages.handler.channel);
importPackage(Packages.constants);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
importPackage(Packages.tools);
importPackage(java.util);

var questNumber;
/*
1: Green Tier 
2: Blue Tier 
3: Red Tier
4: Pink Tier
5: Purple Tier
*/
var emeraldCoin = 4001623;
var nodestone = 2435719;
var jcoin = 4310034;
var purpleOrb = 4310185;
var memoryCore = 4031102;
var bp = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, sel) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
    	}
	
	if(status == 0)
	{	
		if(cm.getChar().getKeyValue("JusticeUnlock") == null)
		{
			cm.sendOk("Please finish the #rJustice Prequest#k first!");
			return cm.dispose();
		}
		else if(cm.getChar().getKeyValue("JusticeUnlock") != null && cm.getChar().getKeyValue("GreenTierUnlock") == null)
		{
			questNumber = 1;
			cm.sendYesNo("Welcome!\r\nTo unlock Green Tier I will need some items gathered..\r\nI will need you to get me :\r\n#i4001623# 5000, #i4310034# 1000, #i2435719# 150,\r\n#i5200002# 500,000,000, #i4310185# 2500,  #i4031102# 100");
		}
		else if(cm.getChar().getKeyValue("BlueTierUnlock") == null && cm.getChar().getKeyValue("GreenTierUnlock") != null)
		{
			questNumber = 2;
			cm.sendYesNo("Welcome!\r\nTo unlock Blue Tier I will need some items gathered..\r\nI will need you to get me :\r\n#i4001623# 7000, #i4310034# 2500, #i2435719# 300,\r\n#i5200002# 1,000,000,000, #i4310185# 4000,  #i4031102# 300");
		}
		else if(cm.getChar().getKeyValue("RedTierUnlock") == null && cm.getChar().getKeyValue("BlueTierUnlock") != null)
		{
			questNumber = 3;
			cm.sendYesNo("Welcome!\r\nTo unlock Red Tier I will need some items gathered..\r\nI will need you to get me :\r\n#i4001623# 9000, #i4310034# 3000, #i2435719# 500,\r\n#i5200002# 3,000,000,000, #i4310185# 8000,  #i4031102# 800");
		}
		else if(cm.getChar().getKeyValue("PinkTierUnlock") == null && cm.getChar().getKeyValue("RedTierUnlock") != null)
		{
			questNumber = 4;
			cm.sendYesNo("Welcome!\r\nTo unlock Pink Tier I will need some items gathered..\r\nI will need you to get me :\r\n#i4001623# 10000, #i4310034# 5000, #i2435719# 1000,\r\n#i5200002# 5,000,000,000, #i4310185# 10000,  #i4031102# 1500");
		}
		else if(cm.getChar().getKeyValue("PurpleTierUnlock") == null && cm.getChar().getKeyValue("PinkTierUnlock") != null)
		{
			questNumber = 5;
			cm.sendYesNo("Welcome!\r\nTo unlock Purple Tier I will need some items gathered..\r\nI will need you to get me :\r\n#i4001623# 10000, #i4310034# 10000, #i2435719# 3000,\r\n#i5200002# 8,000,000,000, #i4310185# 10000,  #i4031102# 3000");
		}
		else
		{
			cm.sendOk("You have already finished all the Tier Prequests.");
			return cm.dispose();
		}
	}
	else if(status == 1 && questNumber == 1) // Green Tier
	{
		if(cm.getQuantityOfItem(emeraldCoin) >= 5000 && cm.getQuantityOfItem(nodestone) >= 150 && cm.getQuantityOfItem(jcoin) >= 1000 && cm.getQuantityOfItem(memoryCore) >= 100 && cm.getMeso() >= 500000000)
		{
			cm.gainItem(emeraldCoin, -5000); // Emerald coin
			cm.gainItem(nodestone, -150); // Nodestone
			cm.gainItem(jcoin, -1000); // Justice Coins
			cm.gainItem(purpleOrb, -2500); // Purple Orb
			cm.gainMeso(-500000000); // Mesos
			cm.gainItem(memoryCore, -100); // Memory Core
			cm.getChar().setKeyValue("GreenTierUnlock", "ok");
			cm.sendOk("#fs11#You unlocked the Green Tier Section!");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials for Green Tier.");
			return cm.dispose();
		}
	}
	else if(status == 1 && questNumber == 2) // Blue Tier
	{
		if (cm.getQuantityOfItem(emeraldCoin) >= 7000 && cm.getQuantityOfItem(nodestone) >= 300 && cm.getQuantityOfItem(jcoin) >= 2500 && cm.getQuantityOfItem(purpleOrb) >= 4000 && cm.getQuantityOfItem(memoryCore) >= 300 && cm.getMeso() >= 1000000000)
		{
			cm.gainItem(emeraldCoin, -7000); // Emerald coin
			cm.gainItem(nodestone, -300); // Nodestone
			cm.gainItem(jcoin, -2500); // Justice Coins
			cm.gainItem(purpleOrb, -4000); // Purple Orb
			cm.gainMeso(-1000000000); // Mesos
			cm.gainItem(memoryCore, -300) // Memory Core
			cm.getChar().setKeyValue("BlueTierUnlock", "ok");
			cm.sendOk("#fs11#You have now unlocked the Blue Tier Section!");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials for Blue Tier");
			return cm.dispose();
		}
	}
	else if(status == 1 && questNumber == 3) // Red Tier
	{
		if (cm.getQuantityOfItem(emeraldCoin) >= 9000 && cm.getQuantityOfItem(nodestone) >= 500 && cm.getQuantityOfItem(jcoin) >= 2300 && cm.getQuantityOfItem(purpleOrb) >= 8000 && cm.getQuantityOfItem(memoryCore) >= 800 && cm.getMeso() >= 3000000000)
		{
			cm.gainItem(emeraldCoin, -9000); // Emerald coin
			cm.gainItem(nodestone, -500); // Nodestone
			cm.gainItem(jcoin, -3000); // Justice Coins
			cm.gainItem(purpleOrb, -8000); // Purple Orb
			cm.gainMeso(-3000000000); // Mesos
			cm.gainItem(memoryCore, -800) // Memory Core
			cm.getChar().setKeyValue("RedTierUnlock", "ok");
			cm.sendOk("#fs11#You have now unlocked the Red Tier Section!");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials for Red Tier");
			return cm.dispose();
		}
	}
	else if(status == 1 && questNumber == 4) // Pink Tier
	{
		if (cm.getQuantityOfItem(emeraldCoin) >= 10000 && cm.getQuantityOfItem(nodestone) >= 1000 && cm.getQuantityOfItem(jcoin) >= 5000 && cm.getQuantityOfItem(purpleOrb) >= 10000 && cm.getQuantityOfItem(memoryCore) >= 1500 && cm.getMeso() >= 5000000000)
		{
			cm.gainItem(emeraldCoin, -10000); // Emerald coin
			cm.gainItem(nodestone, -1000); // Nodestone
			cm.gainItem(jcoin, -5000); // Justice Coins
			cm.gainItem(purpleOrb, -10000); // Purple Orb
			cm.gainMeso(-5000000000); // Mesos
			cm.gainItem(memoryCore, -1500) // Memory Core
			cm.getChar().setKeyValue("PinkTierUnlock", "ok");
			cm.sendOk("#fs11#You have now unlocked the Pink Tier Section!");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials for Pink Tier");
			return cm.dispose();
		}
	}
	else if(status == 1 && questNumber == 5) // Purple Tier
	{
		if (cm.getQuantityOfItem(emeraldCoin) >= 10000 && cm.getQuantityOfItem(nodestone) >= 3000 && cm.getQuantityOfItem(jcoin) >= 10000 && cm.getQuantityOfItem(purpleOrb) >= 10000 && cm.getQuantityOfItem(memoryCore) >= 3000 && cm.getMeso() >= 8000000000)
		{
			cm.gainItem(emeraldCoin, -10000); // Emerald coin
			cm.gainItem(nodestone, -3000); // Nodestone
			cm.gainItem(jcoin, -10000); // Justice Coins
			cm.gainItem(purpleOrb, -10000); // Purple Orb
			cm.gainMeso(-8000000000); // Mesos
			cm.gainItem(memoryCore, -3000) // Memory Core
			cm.getChar().setKeyValue("PurpleTierUnlock", "ok");
			cm.sendOk("#fs11#You have now unlocked the Purple Tier Section!");
			return cm.dispose();
		}
		else
		{
			cm.sendOk("You do not have the neccessary materials for Purple Tier");
			return cm.dispose();
		}
	}
}