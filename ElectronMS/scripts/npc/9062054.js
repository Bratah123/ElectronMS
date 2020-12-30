importPackage(java.mysql);
importPackage(java.lang);
importPackage(Packages.database);
var store = [
	//{'itemid' : 2439291, 'qty' : 1, 'price' : 100}, // Inventory expansion
	{'itemid' : 2049371, 'qty' : 1, 'price' : 150}, // 17 star AEE
	{'itemid' : 2049370, 'qty' : 1, 'price' : 100}, // 12 star AEE
	{'itemid' : 2630282, 'qty' : 15, 'price' : 50}, // Nodestone Boxes
	//{'itemid' : 5121060, 'qty' : 1, 'price' : 5000},
	{'itemid' : 4310034, 'qty' : 300, 'price' : 25}, // Justice Coins
	{'itemid' : 5062009, 'qty' : 100, 'price' : 25}, // Red Cube
	{'itemid' : 5062010, 'qty' : 100, 'price' : 25}, // Black Cubes
	{'itemid' : 5062500, 'qty' : 100, 'price' : 25}, // BPOT Cubes
	{'itemid' : 5062503, 'qty' : 100, 'price' : 25} // White Cubes
	//{'itemid' : 2049360, 'qty' : 1, 'price' : 13500},
	//{'itemid' : 4310156, 'qty' : 1, 'price' : 5000},
	//{'itemid' : 2470003, 'qty' : 1, 'price' : 5000},
	//{'itemid' : 4310235, 'qty' : 100, 'price' : 5000}
]

var enter = "\r\n";
var seld = -1;
var bp = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, sel) {
	if (mode == 1) {
		status++;
	} 
	else {
		cm.dispose();
		return;
    }
		
	if (status == 0) {
		bp = cm.getPlayer().getVPoints();
		var msg = "#fs11##dGood Morning! #dMy name is Toben Mage, and I manage a Vote Points store.#b#fs11#" +enter+enter;
		msg += "#h # Vote Points : "+bp+enter;
		for (i = 0; i < store.length; i++) 
		{
			msg += "#L"+i+"##b#i"+store[i]['itemid']+"##z"+store[i]['itemid']+"# "+store[i]['qty']+" QTY#k"+enter+" Price : #b"+store[i]['price']+"VP#k"+enter;
		}
		cm.sendSimple(msg);
	} 
	else if (status == 1) {
		seld = sel;
		var msg = "#fs11#Information about the item you want to purchase."+enter;
		if (sel != 999) {
			msg += " Item : #b#i"+store[seld]['itemid']+"##z"+store[seld]['itemid']+"##k"+enter;
			msg += " Count : #b"+store[seld]['qty']+" QTY #k"+enter;
			msg += " Price : "+store[seld]['price']+"P#k"+enter;
		} 
		else {
			msg += " Item : #b"+�ߵ�+"Additional Damage#k"+enter;
			msg += " Price : #b"+�ߵ�����+"P#k"+enter;
		}
		msg += " Are you sure you'd like to buy this item?";
		cm.sendYesNo(msg);
	} 
	else if (status == 2) {
		item = store[seld]['itemid'];
		qty = store[seld]['qty'];
		price = store[seld]['price'];
		if (bp >= price) {
			cm.gainItem(item, qty);
			cm.getPlayer().gainVPoints(-price);
			cm.sendOk("Your purchase is complete.");
			cm.dispose();
		} else {
			cm.sendOk("#bVote Points#k seems to be lacking.");
			cm.dispose();
		}
	}
}