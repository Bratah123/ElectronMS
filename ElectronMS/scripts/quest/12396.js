importPackage(Packages.server.quest);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {
            qm.sendYesNo("�ȳ��ϼ���, #b#h0##k��. ���� ���� 70�� �޼��ϼ̱���! #b���� 70#k�� �޼��ϰ� �Ǹ� Ư���� ��, #b�����Ƽ#k�� �߰��� ���� �� �ְ� �ȴ�ϴ�. ���� ���� �� ���� ������� �帱�Կ�."); 
        } else if (status == 1) {
            qm.sendOk("��~! ����� ���ο� ��, �����Ƽ�� �߰������� ��Ƚ��ϴ�. ĳ���� ����â�� ���ؼ� Ȯ���غ�����~!");
            qm.forceStartQuest();
             qm.forceCompleteQuest();
            qm.setInnerStats();
            qm.dispose();
        } else if (status == 2) {
            qm.sendOk("�����Ƽ�� �����ϸ� ���ܰ� ������ ������ �ٽ� Ȯ�����ּ���~!");
            qm.dispose();
        }
    }
}