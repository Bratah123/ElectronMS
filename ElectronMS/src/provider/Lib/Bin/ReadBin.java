package provider.Lib.Bin;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import connections.Packets.PacketUtility.ByteStream;
import connections.Packets.PacketUtility.ReadingMaple;

public class ReadBin {

    private FileInputStream fis;
    private ReadingMaple dis;

    public ReadBin(String file) {
        try {
            this.fis = new FileInputStream("resources/bin/" + file);
        } catch (FileNotFoundException e) {
            throw new UnsupportedOperationException("Bin loading failed! The file '" + file + "' could not be found.");
        }
        try {
            byte[] b = new byte[fis.available()];
            fis.read(b);
            ByteStream bis = new ByteStream(b);
            this.dis = new ReadingMaple(bis);
        } catch (IOException ex) {
            Logger.getLogger(ReadBin.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Read a byte from the input stream.
     *
     */
    public byte readByte() {
        return dis.readByte();
    }

    /**
     * Read a boolean from the input stream.
     *
     *
     */
    public boolean readBool() {
        return dis.readByte() > 0;
    }

    /**
     * Read a short from the input stream.
     *
     *
     */
    public short readShort() {
        return dis.readShort();
    }

    /**
     * Read an integer from the input stream.
     *
     *
     */
    public int readInt() {
        return dis.readInt();
    }

    /**
     * Read a long from the input stream.
     *
     *
     */
    public long readLong() {
        return dis.readLong();
    }

    /**
     * Read a double from the input stream.
     *
     *
     */
    public double readDouble() {
        return dis.readDouble();
    }

    /**
     * Read a float from the input stream.
     *
     *
     */
    public float readFloat() {
        return dis.readFloat();
    }

    /**
     * Read a string from the input stream.
     *
     *
     */
    public String readString() {
        return dis.readMapleAsciiString();
    }

    /**
     * Skip a set amount of bytes.
     *
     *
     */
    public void skip(int n) {
        dis.skip(n);
    }

    /**
     * Close all the output streams.
     *
     *
     */
    public void close() throws IOException {
        // dis.();
        // dis.close();
        fis.close();
    }

}
