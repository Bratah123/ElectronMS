package launcher.ServerPortInitialize;

import client.Character.MapleCharacter;
import tools.CurrentTime;
import connections.Packets.MainPacketCreator;
import server.LifeEntity.Npc.NpcScript.NPCScriptManager;

public class MulongDojo implements Runnable {

    private int numTimes;

    public MulongDojo() {
        int date = CurrentTime.getDay();
        int dos = 0;
        this.numTimes = 0;
        boolean isfirst = false;
        long lastSaveAuctionTime = System.currentTimeMillis();
        System.out.println("[Loading Completed] Start MulongDojo");
    }

    @Override
    public void run() {
        long time = System.currentTimeMillis();
        numTimes++;

        for (ChannelServer cserv : ChannelServer.getAllInstances()) 
        {
            for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters().values()) 
            {
                if (chr != null) 
                {
                    if (chr.getDojoStartTime() > 0) 
                    {
                        if (chr.getDojoStopTime() > 0) 
                        {
                            chr.setDojoCoolTime(chr.getDojoCoolTime() + 1000); // Decrease by 1 every second
                            if (time - chr.getDojoStopTime() > 10000) {
                                chr.setDojoStopTime(0);
                                chr.getClient().getSession().writeAndFlush(MainPacketCreator.getDojoClockStop(false, (int) (900 - ((System.currentTimeMillis() - chr.getDojoStartTime()) / 1000))));
                            }
                        } else if ((time - chr.getDojoStartTime() - chr.getDojoCoolTime()) > (chr.getMapId() / 1000 == 925070 ? 300000 : chr.getMapId() / 1000 == 925071 ? 600000 : 900000)) {
                            chr.changeMap(925020000, 0);
                            NPCScriptManager.getInstance().start(chr.getClient(), 0, "dojo_exit");
                        }
                    }
                    //Party health renewal!
                    chr.updatePartyMemberHP();
                }
            }
        }
    }
}

