package launcher.LauncherHandlers;

import connections.Database.MYSQL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import constants.ServerConstants;

public class MapleRankingWorker implements Runnable {

    private Connection connect;
    private long lastUpdate = 0;

    public void run() {
        try {
            connect = MYSQL.getConnection();
            connect.setAutoCommit(false);
            updateAllJobRankings();
        } catch (Exception error) {
            System.out.println("[Error] An error occurred while updating the ranking. : ");
            if (!ServerConstants.realese) {
                error.printStackTrace();
            }
            try {
                connect.rollback();
                connect.setAutoCommit(true);
            } catch (SQLException errors) {
                System.out.println("[Error] An error occurred during rollback. : ");
                System.out.println(errors);
            }
        } finally {
            try {
                connect.commit();
                connect.setAutoCommit(true);
                connect.close();
                lastUpdate = System.currentTimeMillis();
            } catch (SQLException ignored) {
            }
        }
    }

    private void updateAllJobRankings() {
        PreparedStatement query;
        ResultSet result;
        int rank = 0;
        int rankMove = 0;

        try {
            query = connect.prepareStatement(
                    "SELECT * FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id WHERE c.gm = 0 ORDER BY c.level DESC, c.exp DESC, c.rank ASC");
            result = query.executeQuery();
            query = connect.prepareStatement(
                    "UPDATE characters SET rankMove = ?, worldRankMove = ?, rank = ?, worldRank = ? WHERE id = ?");
            while (result.next()) {
                ++rank;
                if (result.getLong("lastlogin") < lastUpdate || result.getInt("loggedin") > 0) {
                    rankMove = result.getInt("rankMove");
                }
                rankMove += result.getInt("rank") - rank;
                query.setInt(1, rankMove);
                query.setInt(2, rankMove);
                query.setInt(3, rank);
                query.setInt(4, rank); // World rankings are temporarily processed
                query.setInt(5, result.getInt("id"));
                query.executeUpdate();
            }
        } catch (Exception error) {
            System.out.println(error);
        }
    }
}
