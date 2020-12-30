package launcher.Utility;

import launcher.ServerPortInitialize.ChannelServer;

public class WorldBroadcasting {

    /**
     * Maple packet type packets are transmitted to all channels.
     *
     * param <Packet> Maple packet
     *
     * @since Revision 25
     */
    public static void broadcastMessage(byte[] data) {
        broadcast(data);
    }

    /**
     * Maple packet type packets are transmitted to all channels.
     *
     * param <Packet> Maple packet
     *
     * @since Revision 25
     */
    public static void broadcastSmega(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastSmegaPacket(data);
        }
    }

    public static void broadcastGM(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastGMPacket(data);
        }
    }

    public static void broadcast(byte[] data) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastPacket(data);
        }
    }

    /**
     * Send packets visible only to users who receive loudspeakers on all channels.
     *
     * @param <byte[]> Byte array
     *
     * @since Revision 25
     */
    /**
     * Transmit packets that only GM can receive on all channels.
     *
     * @param <byte[]> Byte array
     *
     * @since Revision 25
     */
    /**
     * Send friend logoff packets to all channels.
     *
     * param <String> Update character name
     * param <int> Update Carrick ID
     * param <int> channel
     * param <int[]> List of friend IDs to send packets to
     *
     * @since Revision 25
     */
    public static void loggedOff(String name, int characterId, int channel, int[] buddies) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.updateBuddies(characterId, channel, buddies, true);
        }
    }

    /**
     * Send friend logon packets to all channels.
     *
     * param <String> Update character name
     * param <int> Update Carrick ID
     * param <int> channel
     * param <int[]> List of friend IDs to send packets to
     *
     * @since Revision 25
     */
    public static void loggedOn(String name, int characterId, int channel, int[] buddies) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.updateBuddies(characterId, channel, buddies, false);
        }
    }
}
