// inventory checker
// author @Brandon
importPackage(Packages.client);
importPackage(Packages.constants);
importPackage(java.util);
importPackage(Packages.client.ItemInventory.Inventory);
importPackage(Packages.client.ItemInventory.Items);
importPackage(Packages.client);
importPackage(Packages.server.Items);
importPackage(Packages.constants);
importPackage(Packages.LauncherHandlers);
importPackage(Packages.connections.Packets);
importPackage(Packages.tools);


var status = 0;
var invType;
var invSelct;
var bagIndex;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1){
	status++;
	}
    else{
	status--;
	}
	
    if (status == 0) 
	{
		if(cm.getChar().isGM())
		{
		    cm.sendGetText("This is the inventory checker. Please enter the player you'd like to search.");
		}
		else
		{
		    cm.sendOk("Listen here you fucker.");
		}
    }
	else if(status == 1)
	{
		var name = cm.getText();
		var connection = cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name);
		if(cm.getIdByName(name) <= 0)
		{
			cm.sendOk("This character does not exist.");
			return cm.dispose();
		}
		else if(connection == null)
		{
			cm.sendOk("This player is not online.");
			return cm.dispose();
		}
		else
		{
			var invSelection = "Which inventory slot would you like to check for " + name + "?\r\n\r\n";
			invSelection += "#L0##bEquips\r\n";
			invSelection += "#L1##bUse\r\n";
			invSelection += "#L2##bETC\r\n";
			invSelection += "#L3##bCash\r\n";
			//invSelection += "#L4##bEquipped\r\n#l"
			
			cm.sendSimple(invSelection);
		}
	}
	else if(status == 2 && selection == 0) // Equips
	{
		var name = cm.getText();
		invType = MapleInventoryType.EQUIP;
		cm.sendSimple("These are the items:\r\n" + cm.EquipListVertical(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient())); // Cancer ass line dont worry about it
	}
	else if(status == 2 && selection == 1) // Use
	{
		var name = cm.getText();
		invType = MapleInventoryType.USE;
		cm.sendSimple("These are the items:\r\n" + cm.UseListVertical(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient())); // Cancer ass line dont worry about it
	}
	else if(status == 2 && selection == 2) // ETC
	{
		var name = cm.getText();
		invType = MapleInventoryType.ETC;
		cm.sendSimple("These are the items:\r\n" + cm.ETCListVertical(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient())); // Cancer ass line dont worry about it
	}
	else if(status == 2 && selection == 3) // CASH
	{
		var name = cm.getText();
		invType = MapleInventoryType.CASH;
		cm.sendSimple("These are the items:\r\n" + cm.CashListVertical(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient())); // Cancer ass line dont worry about it
	}
	else if(status == 3 && selection == 4) // EQUIPPED
	{
		var name = cm.getText();
		invType = MapleInventoryType.EQUIPPED;
		cm.sendSimple("These are the items:\r\n" + cm.EquippedListVertical(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient())); // Cancer ass line dont worry about it
	}
	else if(status == 3)
	{
		bagIndex = selection;
		var name = cm.getText();
		var equip = cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getInventory(invType).getItem(bagIndex);
		var deleteDiag = "Would you like to delete #v" + equip.getItemId() + "#?\r\n";
		if(invType == MapleInventoryType.EQUIP || invType == MapleInventoryType.EQUIPPED)
		{
		deleteDiag += "STR: " + equip.getStr() + "\r\n";
		deleteDiag += "DEX: " + equip.getDex() + "\r\n";
		deleteDiag += "LUK: " + equip.getLuk() + "\r\n";
		deleteDiag += "INT: " + equip.getInt() + "\r\n";
		deleteDiag += "Wep Att: " + equip.getWatk() + "\r\n";
		deleteDiag += "Magic Att: " + equip.getMatk() + "\r\n";
		deleteDiag += "Flame Stat: " + equip.getFireStatToString() + "\r\n";
		cm.sendYesNo(deleteDiag);
		}
		else {
		    cm.sendYesNo(deleteDiag);
		}
	}
	else if(status == 4)
	{
		var name = cm.getText();
		var itemId = cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getInventory(invType).getItem(bagIndex).getItemId();
		var quantity = cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getItemQuantity(itemId, false);
		var item = cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getInventory(invType).getItem(bagIndex);

		InventoryManipulator.removeFromSlot(cm.getChar().getClient().getChannelServer().getPlayerStorage().getCharacterByName(name).getClient(), invType, bagIndex, quantity, false);
		
		cm.sendOk("#v" +  itemId + "# has been deleted successfully.");
	}
}
