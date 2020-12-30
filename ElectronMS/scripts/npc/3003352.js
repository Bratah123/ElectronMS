// Blue Orb Shop
// Script : 3003352
importPackage(java.util);
importPackage(Packages.client.ItemInventory.Inventory);
importPackage(Packages.client.ItemInventory.Items);
importPackage(Packages.client);
importPackage(Packages.server.Items);
importPackage(Packages.constants);
importPackage(Packages.LauncherHandlers);
importPackage(Packages.connections.Packets);
importPackage(Packages.tools);
var enter = "\r\n";
var shop = [
	{'itemid' : 5062009, 'qty' : 100, 'price' : 300},
        {'itemid' : 5062010, 'qty' : 50, 'price' : 300},
        {'itemid' : 5062500, 'qty' : 25, 'price' : 300},
        {'itemid' : 2049702, 'qty' : 1, 'price' : 150},
        {'itemid' : 2049702, 'qty' : 5, 'price' : 750},
        {'itemid' : 2048307, 'qty' : 1, 'price' : 200},
        {'itemid' : 2048307, 'qty' : 5, 'price' : 1000},
        {'itemid' : 2049506, 'qty' : 1, 'price' : 300},
        {'itemid' : 2048304, 'qty' : 1, 'price' : 600},
        {'itemid' : 2470000, 'qty' : 1, 'price' : 200},
        {'itemid' : 5064000, 'qty' : 1, 'price' : 150},
        {'itemid' : 5064000, 'qty' : 10, 'price' : 1500},
        {'itemid' : 5064100, 'qty' : 1, 'price' : 150},
        {'itemid' : 5064100, 'qty' : 10, 'price' : 1500},
        {'itemid' : 5064300, 'qty' : 1, 'price' : 150},
        {'itemid' : 5064300, 'qty' : 10, 'price' : 1500},
        {'itemid' : 2590008, 'qty' : 1, 'price' : 600}
]
var desiredQuantity = 0;
var realTotalPrice;

var blueOrb = 4310184;

var seld = -1;

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
	if (status == 0) {
		var msg = "#fs11##k#k#d#fs11##fUI/FarmUI.img/objectStatus/star/whole# #dGood Morning. Azure Upgrade shop.#k"+enter;
		msg += "#fs11##k#k#k#fs11##fUI/FarmUI.img/objectStatus/star/whole# blueOrb #r#i"+blueOrb+"##z"+blueOrb+"##k to trade."+enter;
		for (i = 0; i < shop.length; i++) {
			msg += "#e#r#L"+i+"##r#i"+shop[i]['itemid']+"##z"+shop[i]['itemid']+"# "+shop[i]['qty']+"개#k"+enter;
			msg += "　　 Required number : #b#i4310184# Blue Orb #r"+shop[i]['price']+"개#k"+enter;
		}
		cm.sendSimple(msg);
	} else if (status == 1) {
		seld = sel;
		var msg = "#fs11#Information of the item you want to purchase."+enter;
		msg += "*- Item : #r#i"+shop[seld]['itemid']+"##z"+shop[seld]['itemid']+"##k"+enter;
		msg += "*- Count　 : #r"+shop[seld]['qty']+"개 #k"+enter;
		msg += "*- Price　 : #i"+blueOrb+"##z"+blueOrb+"# #r"+shop[seld]['price']+"개#k"+enter+enter;
		msg += "*- #bHow much would you like to buy?";
		cm.sendGetNumber(msg, 1, 1, 9999);
	}
	else if(status == 2)
	{
		desiredQuantity = sel;
		realTotalPrice = desiredQuantity * shop[seld]['price'];
		var mathDiag = "You would like to buy #r" + (desiredQuantity * shop[seld]['qty']) + " #i" + shop[seld]['itemid'] + "##z" + shop[seld]['itemid'] + "##k for #b" + (desiredQuantity * shop[seld]['price']) + " Blue Orbs?";
		cm.sendYesNo(mathDiag);
	}
	else if (status == 3) {
		item = shop[seld]['itemid'];
		price = shop[seld]['price'];
		quantity = shop[seld]['qty'];
		if (cm.getQuantityOfItem(blueOrb) >= realTotalPrice) {
			for(var i = 0; i < desiredQuantity;i++)
			{
				if(cm.getChar().getInventory(MapleInventoryType.CASH).isFull() == true || cm.getChar().getInventory(MapleInventoryType.USE).isFull() == true)
				{
					cm.sendOk("Please make space in your inventory.");
					return cm.dispose();
				}
				else
				{
					cm.gainItem(blueOrb, -price);
					cm.gainItem(item, quantity);
				}
			}
			cm.sendOk("Your purchase is complete.");
			return cm.dispose();
		}
		else {
			cm.sendOk("#fs11##b#i"+blueOrb+"##z"+blueOrb+"##kYou do not have enough Blue Orbs to purchase that.");
			return cm.dispose();
		}
	}
}