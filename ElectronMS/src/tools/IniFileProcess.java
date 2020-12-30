package tools;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Hashtable;

public class IniFileProcess {

    private Hashtable<String, InnerData> table;

    public IniFileProcess(File file) {
        this.table = new Hashtable<String, InnerData>();
        try {
            String line, section;
            int index;
            BufferedReader input = new BufferedReader(new InputStreamReader(new FileInputStream(file), "EUC-KR"));
            InnerData inner = new InnerData();
            while ((line = input.readLine()) != null) {
                line = line.trim();
                if (line.startsWith("[") && line.endsWith("]")) {
                    inner = new InnerData();
                    section = line.substring(1, line.length() - 1);
                    this.table.put(section, inner);
                } else if (line.startsWith(";")) {
                    // ¡÷ºÆ
                } else {
                    index = line.indexOf('=');
                    if (index != -1) {
                        String attribute = line.substring(0, index);
                        attribute.trim();
                        String value = line.substring(index + 1);
                        value.trim();
                        inner.add(attribute, value);
                    }
                }
            }
            input.close();
        } catch (IOException error) {
            error.printStackTrace();
        }
    }

    public String getString(String section, String attribute) {
        IniFileProcess.InnerData inner = this.table.get(section.trim());
        if (inner != null) {
            attribute.trim();
            return inner.get(attribute);
        }
        return null;
    }

    private static class InnerData {

        private Hashtable<String, String> hashtable;

        public InnerData() {
            this.hashtable = new Hashtable<>();
        }

        public void add(String attribute, String value) {
            this.hashtable.put(attribute, value);
        }

        public String get(String attribute) {
            return this.hashtable.get(attribute);
        }
    }
}
