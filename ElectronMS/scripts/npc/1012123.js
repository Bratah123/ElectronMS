


/*

	���� KMS �� �ҽ��� ��ũ��Ʈ �Դϴ�.

	���ǽþ��̵� : 1012123
	
	���ǽ� �̸� : ���

	���ǽð� �ִ� �� : ��׽ý���

	���ǽ� ���� : �ȵ���̵����ũ��


*/






/*

	���� ���ǽ�

*/

var status = 0;
var beauty = 0;
var selectioned = 0;
var selectiones = 0;
var colors;
var hairnew;
var facenew;
var haircolor;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11, 12, 13);
var mhair = Array(38000, 38010, 38020, 38030, 38040, 38050, 38060, 38070, 38090, 38100, 38110, 38120, 38130, 38270, 38280, 38290, 38300, 38310, 38390, 38400, 38410, 38420, 38430, 38440, 38460, 38470, 38490, 38520, 38540, 38550, 38560, 38570, 38580, 38590, 38600, 38610, 38620, 38630, 38640, 38650, 38660, 38670, 38680, 38690, 38700, 38730, 38740, 38750, 38760, 38800, 38810, 38820, 38840, 38880, 38910, 38940, 39090, 41080, 41090, 41100, 41110, 41120, 41150, 41160, 41200, 41220, 41340, 41350, 41370, 41380, 41390, 41400, 41470, 41480, 41490, 41510, 41520, 41560, 41570, 41590, 41600, 41750, 41950, 38490, 41700, 41860, 41890, 40610, 40780, 40810, 40940, 40950, 40960, 40970, 40980, 41600, 41670, 41700, 41720, 41730, 41740, 41750, 41850, 41860, 44010, 44120, 44130, 44200, 44290, 44320, 44330, 44460, 44461, 44462, 44463, 44464, 44465, 40780, 41900, 44470, 44480, 44490, 44500);
var fhair = Array(38000, 38010, 38020, 38030, 38040, 38050, 38060, 38070, 38090, 38100, 38110, 38120, 38130, 38270, 38280, 38290, 38300, 38310, 38390, 38400, 38410, 38420, 38430, 38440, 38460, 38470, 38490, 38520, 38540, 38550, 38560, 38570, 38580, 38590, 38600, 38610, 38620, 38630, 38640, 38650, 38660, 38670, 38680, 38690, 38700, 38730, 38740, 38750, 38760, 38800, 38810, 38820, 38840, 38880, 38910, 38940, 39090, 41080, 41090, 41100, 41110, 41120, 41150, 41160, 41200, 41220, 41340, 41350, 41370, 41380, 41390, 41400, 41470, 41480, 41490, 41510, 41520, 41560, 41570, 41590, 41600, 41750, 41950, 38490, 41700, 41860, 41890, 40610, 40780, 40810, 40940, 40950, 40960, 40970, 40980, 41600, 41670, 41700, 41720, 41730, 41740, 41750, 41850, 41860, 44010, 44120, 44130, 44200, 44290, 44320, 44330, 44460, 44461, 44462, 44463, 44464, 44465, 40780, 41900, 44470, 44480, 44490, 44500);
var mface = Array(24001, 24002, 24003, 24004, 24007, 24008, 24011, 24012, 24014, 24015, 24018, 24020, 24021, 24023, 24027, 24031, 24035, 24038, 24039, 24041, 24050, 24058, 24060, 24068, 24071, 24072, 24073, 24077, 24084, 24087, 24088, 24091, 24097, 24099, 25006, 25008, 26003, 26004, 26005, 26008, 26009, 26014, 26017, 26022, 26023, 26026, 26027, 26028, 26029, 26030, 26031, 26032, 26034, 26046, 26047, 26048, 26049, 26050, 26051, 26053, 26056, 26058, 26764, 26763, 26762, 26761, 26760, 26759, 25057, 25157);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21023, 21024, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21035, 21036, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 21061, 21062, 21063, 21064, 21065, 21069, 21070, 21074, 21075, 21077, 21078, 21079, 21080, 21081, 21082, 21083, 21084, 21085, 21086, 21089);

var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
        if (cm.getPlayer().getAndroid() == null) {
            cm.sendOk("�ȵ���̵尡 ���� ���� �ȵ���̵� ����ũ���� �Ͻ� �� �����ϴ�. �ȵ���̵�� �Բ� ã�ƿ� �ּ���.");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getAndroid().getItemId() != 1662043 && cm.getPlayer().getAndroid().getItemId() != 1662044) {
            cm.sendOk("������ �ȵ���̵常 ������ �Ӹ������� �����մϴ�.");
            cm.dispose();
            return;
        }
	    cm.sendSimple("��� ������ �Ӹ������� #b#i4310119# #t4310119# 10��#k�� �̿��Ͻ� �� �ֽ��ϴ�. ���Ͻô� �ȵ���̵� �ڵ� �غ�����!\r\n\r\n#e#r�� ���� : �� �� �����̳�, ������ ������ ����Ǵ� ���� �ٸ� ������ ������ �Ͻñ� �ٶ��ϴ�. (�ش� ������ �´� ������ �̹����� ���� ��� ƨ��ϴ�.)#e#n\r\n\r\n#L1##b�Ӹ�#k#l\r\n#L2##b�Ӹ���#k#l\r\n#L3##b��#k#l\r\n#L4##b������#k#l");
    } else if (status == 1) {
	if (cm.getAndroidGender() == 0) {if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < mhair.length; i++) {
		    if (mhair[i] == 30100 || mhair[i] == 30010) {
			hairnew.push(mhair[i]);
		    } else {
			hairnew.push(mhair[i] + parseInt(cm.getPlayer().getAndroid().getHair() % 10));
		    }
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", hairnew);
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayer().getAndroid().getHair() / 10) * 10;
		if (current == 30100) {
		    haircolor = Array(current, current + 1, current + 2, current + 3, current + 4, current + 5, current + 6, current + 7);
		} else if (current == 30010) {
		    haircolor = Array(current);
		} else {
		    for (var i = 0; i < 8; i++) {
			haircolor.push(current + i);
		    }
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", haircolor);
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < mface.length; i++) {
		    if (mface[i] == 20021 || mface[i] == 20022) {
			facenew.push(mface[i]);
		    } else {
			facenew.push(mface[i] + cm.getPlayer().getAndroid().getFace() % 1000 - (cm.getPlayer().getAndroid().getFace() % 100));
		    }
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", facenew);
	    } else if (selection == 4) {
		                beauty = 5;
                var current = cm.getPlayer().getAndroid().getFace() % 100 + 20000;
                colors = Array();
                if (current == 20021 || current == 20022) {
                    colors = Array(current,current + 100,current + 200,current + 300,current + 400,current + 600,current + 700);
                } else if (current == 20041 || current == 20042) {
                    colors = Array(current,current + 100,current + 200,current + 300);
                } else {
                    colors = Array(current,current + 100,current + 200,current + 300,current + 400,current + 500,current + 600,current + 700);
                cm.askAvatar("������ ���忡 ���� ���� ȯ���մϴ�.",colors);
}
	    }
	} else {
            if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < fhair.length; i++) {
		    hairnew.push(fhair[i] + parseInt(cm.getPlayer().getAndroid().getHair() % 10));
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", hairnew);
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayer().getAndroid().getHair() / 10) * 10;
		for (var i = 0; i < 8; i++) {
		    haircolor.push(current + i);
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", haircolor);
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < fface.length; i++) {
		    facenew.push(fface[i] + cm.getPlayer().getAndroid().getFace() % 1000 - (cm.getPlayer().getAndroid().getFace() % 100));
		}
		cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", facenew);
	    } else if (selection == 4) {
		beauty = 5;
		var current = cm.getPlayer().getAndroid().getFace() % 100 + 21000;
		colors = Array();
 		if (current == 21139 || current == 21140) {
		    colors = Array(current, current + 100, current + 200);
		} else {
		colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
		} cm.askAvatarAndroid("���ϴ� �ƹ�Ÿ�� �������ּ���.", colors);
	    }
	}
    } else if (status == 2) {
        selection = selection & 0xFF;
        if (!cm.haveItem(4310119, 10)) {
            cm.sendOk("#b#i4310119# #t4310119# 10��#k�� �ʿ��մϴ�. �������� ����� ���� ��Ű��� �´��� Ȯ���� �ּ���.");
            cm.dispose();
            return;
        }
        else if (beauty == 2 || beauty == 6)
	    cm.setHairAndroid(hairnew[selection]);
        else if (beauty == 3)
	    cm.setHairAndroid(haircolor[selection]);
        else if (beauty == 4 || beauty == 7)
	    cm.setFaceAndroid(facenew[selection]);
        else if (beauty == 5)
	    cm.setFaceAndroid(colors[selection]);
        cm.gainItem(4310119, -10);
        cm.dispose();
	   
    }
}