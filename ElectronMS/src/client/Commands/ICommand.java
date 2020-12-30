package client.Commands;

import client.Character.MapleCharacter;
import constants.ServerConstants;

public interface ICommand {
	int execute(MapleCharacter chr, String[] args);
	
	String getDescription();
	
	static char getPrefix() {
        return ServerConstants.PLAYER_COMMAND_PREFIX;
    }
}
