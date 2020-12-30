/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launcher.Utility;

import client.Character.MapleCharacter;
import client.Community.CommunityHandler;
import client.Community.MapleBuddy.BuddyList;
import client.Community.MapleParty.MapleParty;
import client.Community.MapleParty.MaplePartyCharacter;
import client.Community.MapleParty.MaplePartyOperation;
import connections.Packets.MainPacketCreator;
import handlers.Chat.MapleMultiChat;
import handlers.Chat.MapleMultiChatCharacter;
import launcher.LauncherHandlers.MaplePlayerIdChannelPair;
import launcher.ServerPortInitialize.ChannelServer;
import handlers.Global.PlayerHandler.MaplePlayerHolder;

import java.util.ArrayList;
import java.util.List;

/** Functions that provide community (messenger, friend, party, etc.) functions across the server.
 *
 * @author SoulGirlJP
 *
 * since 2012. 2. 24
 * @since Revision 33
 */
public class WorldCommunity {
    
    /** Create a messenger room-Create a messenger in the world holder.
     * 
     * @param <mapleMultiChatCharacter> Messenger character
     * @return Messenger class
     * @since Revision 33
     */

    public static boolean isFreeze = false;
    
    public static MapleMultiChat createMessenger(MapleMultiChatCharacter chrfor) {
	return CommunityHandler.getInstance().createMessenger(chrfor);
    }
    
    /** Get Messenger Room-Get a messenger from the World Holder.
     * 
     * param <int> Messenger ID
     * @return Messenger class
     * @since Revision 33
     */

    public static MapleMultiChat getMessenger(int messengerid) {
	return CommunityHandler.getInstance().getMessenger(messengerid);
    }


    /** Leaving the messenger room-Obtaining a messenger from the world holder and deleting the messenger character.
     * 
     * param <int> Messenger ID
     * param <mapleMultiChatCharacter> Messenger character
     * @since Revision 33
     */
    public static void leaveMessenger(int messengerid, MapleMultiChatCharacter target) {
	final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
	if (messenger == null) {
	    throw new IllegalArgumentException("No messenger with the specified messengerid exists");
	}
	final int position = messenger.getPositionByName(target.getName());
	messenger.removeMember(target);
	for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleMultiChatCharacter messengerchar : messenger.getMembers()) {
                    final MapleCharacter chr = cserv.getPlayerStorage().getCharacterByName(messengerchar.getName());
                    if (chr != null) {
                        chr.getClient().getSession().writeAndFlush(MainPacketCreator.removeMessengerPlayer(position));
                    }
            }
	}
    }

    /** Participate in the messenger room-Broadcast packets to existing messenger participants.
     * 
     * param <int> Messenger ID
     * param <mapleMultiChatCharacter> Messenger character
     * param <String> Participant name
     * param <int> Participant Channel
     * @since Revision 33
     */
    public static void joinMessenger(int messengerid, MapleMultiChatCharacter newchar, String newcharname, int newcharchannel) {
	final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
	if (messenger == null) {
	    throw new IllegalArgumentException("No messenger with the specified messengerid exists");
	}
	
	    for (MapleMultiChatCharacter oldmessengerchar : messenger.getMembers()) {
                if (!(oldmessengerchar.getName().equals(newcharname))) {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        final MapleCharacter oldplayer = cserv.getPlayerStorage().getCharacterByName(oldmessengerchar.getName());
                        if (oldplayer != null) {
                            final MapleCharacter newplayer = ChannelServer.getInstance(newcharchannel).getPlayerStorage().getCharacterByName(newcharname);
                            oldplayer.getClient().getSession().writeAndFlush(MainPacketCreator.addMessengerPlayer(newcharname, newplayer, newchar.getPosition(), newcharchannel));
                            newplayer.getClient().getSession().writeAndFlush(MainPacketCreator.addMessengerPlayer(oldplayer.getName(), oldplayer, oldmessengerchar.getPosition(), oldmessengerchar.getChannel()));
                        }
                    }
                } else {
                    ChannelServer.getInstance(newcharchannel).getPlayerStorage().getCharacterByName(newcharname).getClient().send(MainPacketCreator.joinMessenger(newchar.getPosition()));
                }
            }
            
            
    }
	
    

    /** Messenger Chat-Packet Broadcast
     * 
     * param <int> Messenger ID
     * param <String> Chat conversation
     * param <String> Sender name
     * @since Revision 33
     */
    public static void messengerChat(int messengerid, String chattext, String namefrom) {
	final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
	if (messenger == null) {
	    throw new IllegalArgumentException("No messenger with the specified messengerid exists");
	}
	for (ChannelServer server : ChannelServer.getAllInstances()) {
	    for (MapleMultiChatCharacter messengerchar : messenger.getMembers()) {
                if (messengerchar.getChannel() == server.getChannel() && !(messengerchar.getName().equals(namefrom))) {
                    final MapleCharacter chr = server.getPlayerStorage().getCharacterByName(messengerchar.getName());
                    if (chr != null) {
                        chr.getClient().getSession().writeAndFlush(MainPacketCreator.messengerChat(namefrom, chattext));
                    }
                }
            }
	}
    }

    /** Rejecting an invitation to a messenger
     * 
     * param <String> Invited person
     * param <String> Rejecter
     * @since Revision 33
     */
    public static void declineChat(String target, String namefrom) {
	    if (WorldConnected.isConnected(target)) {
                final MapleCharacter chr = ChannelServer.getInstance(WorldConnected.find(target)).getPlayerStorage().getCharacterByName(target);
                final MapleMultiChat messenger = chr.getMessenger();
                if (messenger != null) {
                    chr.getClient().getSession().writeAndFlush(MainPacketCreator.messengerNote(namefrom, 5, 0));
                }
            }
	
    }
 
    /** Messenger update (when the look, etc. changes)
     * 
     * param <int> Messenger ID
     * param <String> Name of person updated
     * param <int> Current channel of the updated person
     * @since Revision 33
     */
    public static void updateMessenger(int messengerid, String namefrom, int fromchannel) {
	final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
	final int position = messenger.getPositionByName(namefrom);

	for (ChannelServer server : ChannelServer.getAllInstances()) {
	    for (MapleMultiChatCharacter messengerchar : messenger.getMembers()) {
                if (messengerchar.getChannel() == server.getChannel() && !(messengerchar.getName().equals(namefrom))) {
                    final MapleCharacter chr = server.getPlayerStorage().getCharacterByName(messengerchar.getName());
                    if (chr != null) {
                        MapleCharacter from = ChannelServer.getInstance(fromchannel).getPlayerStorage().getCharacterByName(namefrom);
                        chr.getClient().getSession().writeAndFlush(MainPacketCreator.updateMessengerPlayer(namefrom, from, position, fromchannel));
                    }
                }
            }
	}
    }

    /** Delete player from messenger without broadcasting packet
     * 
     * param <int> Messenger ID
     * param <mapleMultiChatCharacter> Messenger character
     * @since Revision 33
     * 
     */
    public static void silentLeaveMessenger(int messengerid, MapleMultiChatCharacter target) {
	final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
	if (messenger == null) {
	    throw new IllegalArgumentException("No messenger with the specified messengerid exists");
	}
	messenger.silentRemoveMember(target);
    }

    
    /** Players participate in messengers without broadcasting packets
     * 
     * param <int> Messenger ID
     * param <mapleMUltiChatCharacter> Player to join
     * param <int> Participating locations (slots)
     * @since Revision 33
     */
    public static void silentJoinMessenger(int messengerid, MapleMultiChatCharacter target, int position) {
        final MapleMultiChat messenger = CommunityHandler.getInstance().getMessenger(messengerid);
        if (messenger == null) {
            throw new IllegalArgumentException("No messenger with the specified messengerid exists");
        }
        messenger.silentAddMember(target, position);
    }


    /** Friend chat packet broadcasting
     * 
     * param <int[]> List of characters received
     * param <int> Sender character ID
     * param <String> Sender character name
     * param <String> Chat data
     * @since Revision 33
     */
    public static void buddyChat(int[] recipientCharacterIds, int cidFrom, String nameFrom, String chattext) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            final MaplePlayerHolder playerStorage = cserv.getPlayerStorage();
            for (int characterId : recipientCharacterIds) {
                final MapleCharacter chr = playerStorage.getCharacterById(characterId);
                if (chr != null) {
                    if (chr.getBuddylist().containsVisible(cidFrom)) {
                        chr.getClient().getSession().writeAndFlush(MainPacketCreator.multiChat(nameFrom, chattext, 0));
                    }
                }
            }
        }
    }

    /** Get a friend who is online.
     * 
     * param <int> Requester ID
     * param <String> Target ID
     * @return Player ID, Channel Pair Class Arrangement
     * @since Revision 33
     */
    public static MaplePlayerIdChannelPair[] multiBuddyFind(int charIdFrom, int[] characterIds) {
	List<MaplePlayerIdChannelPair> foundsChars = new ArrayList<>(characterIds.length);
	for (ChannelServer cserv : ChannelServer.getAllInstances()) {
	    for (int charid : cserv.multiBuddyFindMain(charIdFrom, characterIds)) {
		foundsChars.add(new MaplePlayerIdChannelPair(charid, cserv.getChannel()));
	    }
	}
	return foundsChars.toArray(new MaplePlayerIdChannelPair[0]);
    }

    /** Request additional friends
     * 
     * param <String> Additional name
     * param <int> Requester channel
     * param <int> Requester ID
     * param <String> Requester name
     * param <int> Requestor level
     * param <int> Requester job
     * @return Add friend result BuddyList.BuddyAddResult Enum value
     * @since Revision 33
     */
    public static BuddyList.BuddyAddResult requestBuddyAdd(String addName, int channelFrom, int cidFrom, String nameFrom, int levelFrom, int jobFrom, String groupName) {
        for (ChannelServer server : ChannelServer.getAllInstances()) {
            final MapleCharacter addChar = server.getPlayerStorage().getCharacterByName(addName);
            if (addChar != null) {
                final BuddyList buddylist = addChar.getBuddylist();
                if (buddylist.isFull()) {
                    return BuddyList.BuddyAddResult.BUDDYLIST_FULL;
                }
                if (!buddylist.contains(cidFrom)) {
                    buddylist.addBuddyRequest(addChar.getClient(), cidFrom, nameFrom, channelFrom, levelFrom, jobFrom, groupName);
                } else {
                    if (buddylist.containsVisible(cidFrom)) {
                        return BuddyList.BuddyAddResult.ALREADY_ON_LIST;
                    }
                }
            }
        }
	return BuddyList.BuddyAddResult.OK;
    }
    
    /** Obtain Party-Obtain a party with the corresponding Party ID from the World Holder.
     * 
     * param <int> Party ID to get
     * @return Party from World Holder
     * @since Revision 33
     */
    public static MapleParty getParty(int partyid) {
        return CommunityHandler.getInstance().getParty(partyid);
    }
    
    /** Send packets when the party is updated
     * 
     * param <int> Party ID
     * param <maplePartyOperation> Party update work
     * param <maplePartyCharacter> Target being updated
     */

    public static void updateParty(int partyid, MaplePartyOperation operation, MaplePartyCharacter target) {
	final MapleParty party = CommunityHandler.getInstance().getParty(partyid);
	if (party == null) {
	    throw new IllegalArgumentException("no party with the specified partyid exists");
	}
	switch (operation) {
	    case JOIN:
		party.addMember(target);
		break;
	    case EXPEL:
	    case LEAVE:
		party.removeMember(target);
		break;
	    case DISBAND:
		CommunityHandler.getInstance().disbandParty(partyid);
		break;
	    case SILENT_UPDATE:
	    case LOG_ONOFF:
		party.updateMember(target);
		break;
	    case CHANGE_LEADER:
		party.setLeader(target);
		break;
	    default:
		throw new RuntimeException("Unhandeled updateParty operation " + operation.name());
	}
	CommunityHandler.getInstance().updateParty(party, operation, target);
    }

    /** Create Party-Remember the new party in the world holder.
     * 
     * param <maplePartyCharacter> Party Chair, Party Character
     * @return Party class
     * @since Revision 33
     */
    public static MapleParty createParty(MaplePartyCharacter chrfor) {
	return CommunityHandler.getInstance().createParty(chrfor);
    }

    /** United chat
     * 
     * param <int> Guild ID
     * param <String> Sender's name
     * param <int> Sender Character ID
     * param <String> Chat data
     * @since Revision 33
     */
    public static void allianceChat(int gid, String name, int cid, String msg) {
	CommunityHandler.getInstance().allianceChat(gid, name, cid, msg);
    }

    /** Party chat
     * 
     * param <mapleParty> Party to send chat
     * param <String> Chat data
     * param <String> Sender character name
     * @since Revision 33
     */
    public static void partyChat(MapleParty party, String chattext, String namefrom) {
        for (ChannelServer server : ChannelServer.getAllInstances())
	for (MaplePartyCharacter partychar : party.getMembers()) {
	    if (partychar.getChannel() == server.getChannel() && !(partychar.getName().equals(namefrom))) {
		final MapleCharacter chr = server.getPlayerStorage().getCharacterByName(partychar.getName());
		if (chr != null) {
		    chr.getClient().getSession().writeAndFlush(MainPacketCreator.multiChat(namefrom, chattext, 1));
		    }
	    }
	 }
    }
}
