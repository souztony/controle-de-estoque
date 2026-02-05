import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class TestDB {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://ep-twilight-sky-a1zt7yhz-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&ssl=true&prepareThreshold=0";
        Properties props = new Properties();
        props.setProperty("user", "neondb_owner");
        props.setProperty("password", "npg_Gg42ZefkajpU");
        props.setProperty("prepareThreshold", "0");

        try {
            System.out.println("Connecting to: " + url);
            Connection conn = DriverManager.getConnection(url, props);
            System.out.println("Connected successfully!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
