/*
	Inventory Expansion (2439291)
*/

importPackage(Packages.constants);
importPackage(Packages.client.items);
importPackage(java.util);
importPackage(Packages.client.ItemInventory.Inventory);
importPackage(Packages.client.ItemInventory.Items);
importPackage(Packages.client.ItemInventory);
importPackage(Packages.client);
importPackage(Packages.server.Items);
importPackage(Packages.constants);
importPackage(Packages.LauncherHandlers);
importPackage(Packages.connections.Packets);
importPackage(Packages.tools);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.constants);

var status = -1;
var inventory = ["Equip", "Use", "ETC", "Setup", "Cash"];
var slotSelected;
/*
0: EQUIP
1: USE
2: ETC
3: SETUP
4: CASH
*/
var type;


function start() {
status = -1
action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} 
	else {
	return cm.dispose();
	}
 
	if(status == 0)
	{
		var msg = "Select the inventory type you would like to expand.\r\n#r(Increases your maximum slot by 4)\r\n";
		for(var i = 0; i < inventory.length; i++)
		{
			msg += "#L" + i + "##b" + inventory[i] + "\r\n";
		}
		cm.sendSimple(msg);
	}
	else if(status == 1)
	{
		slotSelected = selection; // they tab they chose
			switch(slotSelected)
			{
				case 0:
					type = MapleInventoryType.EQUIP;
					cm.sendYesNo("Would you like to increase your " + inventory[slotSelected] + " inventory by 4?");
					break;
				case 1:
					type = MapleInventoryType.USE;
					cm.sendYesNo("Would you like to increase your " + inventory[slotSelected] + " inventory by 4?");
					break;
				case 2:
					type = MapleInventoryType.ETC;
					cm.sendYesNo("Would you like to increase your " + inventory[slotSelected] + " inventory by 4?");
					break;
				case 3:
					type = MapleInventoryType.SETUP;
					cm.sendYesNo("Would you like to increase your " + inventory[slotSelected] + " inventory by 4?");
					break;
				case 4:
					type = MapleInventoryType.CASH;
					cm.sendYesNo("Would you like to increase your " + inventory[slotSelected] + " inventory by 4?");
					break;
				default:
					cm.sendOk("You hacker.");
					cm.dispose();
					break;
			}		
	}
	else if(status == 2)
	{
		var slot = 4;
		cm.expandInventory(type, slot);
		cm.gainItem(2439291, -1);
		cm.sendOk("You've increased your " + inventory[slotSelected] + " tab by " + slot + ".");
		cm.dispose();
	}

}