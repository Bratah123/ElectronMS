package launcher.Utility;

import client.Character.MapleCharacter;
import java.util.HashMap;
import java.util.Map;

import constants.ServerConstants;
import launcher.ServerPortInitialize.CashShopServer;
import launcher.ServerPortInitialize.ChannelServer;
import server.Maps.MapleLocalisation;

public class WorldConnected {

    /**
     * Scan all channels to see if the account has an employment store
     *
     * param <int> Account number
     *
     * @return Whether to own an employment store
     *
     * @since Revision 25
     *
     */
    public static boolean hasMerchant(int accountId) {
        boolean ret = false;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            ret = cserv.constainsMerchant(accountId);
        }
        return ret;

    }

    /**
     * Provides information on how many users each channel is accommodating
     *
     * @return Number of users in each channel
     *
     * @since Revision 25
     *
     */
    public static Map<Integer, Integer> getConnected(int serverId) {
        Map<Integer, Integer> ret = new HashMap<>();
        int total = 0;
        for (int i = 0; i < ServerConstants.ChannelCount; i++) {
            int curConnected = ChannelServer.getInstance(i).getPlayerStorage().getConnectedClients();
            ret.put(i, curConnected);
            total += curConnected;
        }
        ret.put(0, total);
        return ret;
    }

    public static int getConnectedi() {
        int total = 0;
        for (int i = 0; i < ServerConstants.ChannelCount; i++) {
            int curConnected = ChannelServer.getInstance(i).getPlayerStorage().getConnectedClients();
            total += curConnected;
        }
        return total;
    }

    /**
     * Scan all channels to see which channel the user is connected to.
     *
     * param <String> Username
     *
     * @return Channel being accessed (returns -1 if not connected)
     *
     * @since Revision 25
     *
     */
    public static int find(String charName) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            if (cserv.getPlayerStorage().getCharacterByName(charName) != null) {
                return cserv.getChannel();
            }
        }
        return -1;
    }

    /**
     * Scan all channels to see which channel the user is connected to.
     *
     * param <int> User number
     *
     * @return Channel being accessed (returns -1 if not connected)
     *
     * @since Revision 25
     *
     */
    public static int find(int characterId) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            if (cserv.getPlayerStorage().getCharacterById(characterId) != null) {
                return cserv.getChannel();
            }
        }
        return -1;
    }

    /**
     * Scan the Cash Shop channel to see if the user has access to the Cash Shop
     *
     * param <String> Username
     *
     * @return Whether to connect to the cash shop
     *
     * @since Revision 25
     *
     */
    public static boolean isCharacterInCS(String name) {
        return CashShopServer.getInstance().getPlayerStorage().isCharacterConnected(name);
    }

    /**
     * Scan all channels to see if the user is connected to any channel.
     *
     * param <String> Username
     *
     * @return Whether to connect
     *
     * @since Revision 25
     *
     */
    public static boolean isConnected(String charName) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            if (cserv.getPlayerStorage().getCharacterByName(charName) != null) {
                return true;
            }
        }
        return false;
    }

    /**
     * Scan all channels to see if the user is connected to any channel.
     *
     * param <int> Number of users
     *
     * @return Whether to connect
     *
     * @since Revision 25
     *
     */
    public static boolean isConnected(int id) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            if (cserv.getPlayerStorage().getCharacterById(id) != null) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * Scans all channels and provides location information of the user.
     *
     * param <String> Username
     *
     * @return Location information of the user
     *
     * @since Revision 25
     *
     */
    public static MapleLocalisation getLocation(String charName) {
        int channel = WorldConnected.find(charName);
        if (channel != -1) {
            MapleCharacter chr = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(charName);
            if (chr != null) {
                return new MapleLocalisation(chr.getMapId(), (byte) channel);
            }
        }
        return null;
    }

    public static Map<Integer, Integer> getConnected() {
        Map<Integer, Integer> ret = new HashMap<>();
        int total = 0;
        for (int i = 0; i < ServerConstants.ChannelCount; i++) {
            int curConnected = ChannelServer.getInstance(i).getPlayerStorage().getConnectedClients();
            ret.put(i, curConnected);
            total += curConnected;
        }
        ret.put(0, total);
        return ret;
    }
}
