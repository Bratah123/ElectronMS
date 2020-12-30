importPackage(Packages.server.named);

var status = 0;

// Emotes
var Event_Trophy = 4000038; // desc why tf is this in snake case
var queasy = 5160000;
var panicky = 5160001;
var sweetness = 5160002;
var smoochies = 5160003;
var wink = 5160004;
var ouch = 5160005;
var sparklingEyes = 5160006;
var flaming = 5160007;
var ray = 5160008;
var gooGoo = 5160009;
var whoaWhoa = 5160010;

// Smegas
var diamondMegaPhone = 5390029;
var ragingTiger
var loveMessenger = 5390036;
var heartMegaphone = 5073000;
var roaringMegaphone = 5390006;

var selected;
var isEmoteShop = false;
var isSmegaShop = false;

var emoteList = [queasy,panicky,sweetness,smoochies,wink,ouch,sparklingEyes,flaming,ray,gooGoo,whoaWhoa];

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
	
    if(status == 0) // Emote Shop
	{
    var intro = "Welcome to the Emote Shop.\r\n #rCOST: 1 #v" + Event_Trophy +  " #Event Trophy\r\n";
    intro += "#L0##v" + queasy +  "##b Queasy\r\n";
    intro += "#L1##v" + panicky + "# Panicky\r\n";
    intro += "#L2##v" + sweetness + "# Sweetness\r\n";
    intro += "#L3##v" + smoochies + "# Smoochies\r\n";
    intro += "#L4##v" + wink + "# Wink\r\n";
    intro += "#L5##v" + ouch + "# Ouch\r\n";
    intro += "#L6##v" + sparklingEyes + "# Sparkingling Eyes\r\n";
    intro += "#L7##v" + flaming + "# Flaming\r\n";
    intro += "#L8##v" + ray + "# Ray\r\n";
    intro += "#L9##v" + gooGoo + "# Goo Goo\r\n";
    intro += "#L10##v" + whoaWhoa + "# Whoa Whoa\r\n";
    cm.sendSimple(intro);
	}
    else if (status == 1) 
	{
		selected = selection;
		cm.sendYesNo("You would like to buy 1 #v" + emoteList[selected] + "?");
    }
	else if(status == 2)
	{
		if(cm.getQuantityOfItem(Event_Trophy) >= 1) // Desc you can improve this by adding a check for a full inventory
		{
			cm.gainItem(Event_Trophy, -1);
			cm.gainItem(emoteList[selected], 1);
			cm.sendOk("You have successfully bought 1 #v" + emoteList[selected] + "!");
		}
		else
		{
			cm.sendOk("You do not have enough #v" + Event_Trophy + "# Event Trophies for this item.");
		}
	}
}
