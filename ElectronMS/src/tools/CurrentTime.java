package tools;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

public class CurrentTime {

    public static String getCurrentTime() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HH:mm:ss");
        // if (calz.getTime().getHours() >= 12) {
        // time = "오후 "+time;
        // } else {
        // time = "오전 "+time;
        // }
        return simpleTimeFormat.format(calz.getTime());
    }

    public static String getAllCurrentTime1(long times) {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("MM월dd일");
        // if (calz.getTime().getHours() >= 12) {
        // time = "오후 "+time;
        // } else {
        // time = "오전 "+time;
        // }
        return simpleTimeFormat.format(times);
    }

    public static String getAllCurrentTime() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        // if (calz.getTime().getHours() >= 12) {
        // time = "오후 "+time;
        // } else {
        // time = "오전 "+time;
        // }
        return simpleTimeFormat.format(calz.getTime());
    }

    public static int getLeftTimeFromMinute(int minute) {
        Calendar d = Calendar.getInstance(TimeZone.getTimeZone("KST"));
        int min = d.get(Calendar.MINUTE), sec = d.get(Calendar.SECOND);
        int secs = (min * 60) + sec;
        return (minute * 60) - (secs % (minute * 60));
    }
    
    
    public static int getHours() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        return calz.getTime().getHours();
    }
        
    public static int getMinutes() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        return calz.getTime().getMinutes();
    }
        
    public static int getSeconds() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        return calz.getTime().getSeconds();
    }

    public static int getDay() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        return calz.getTime().getDay();
    }
}
