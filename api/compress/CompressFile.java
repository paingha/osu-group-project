import java.io.*;
import java.nio.file.*;
import java.util.zip.*;
//Niharika's Macbook pro~
//Author: Niharika Soma
public class CompressFile {

    private static void compressor(String fph) {
        try {
            File file = new File(fph);
            String compressorFile = file.getName().concat(".zip");

            FileOutputStream fs = new FileOutputStream(compressorFile);
            ZipOutputStream zs = new ZipOutputStream(fs);

            zs.putNextEntry(new ZipEntry(file.getName()));

            byte[] bytes = Files.readAllBytes(Paths.get(fph));
            zs.write(bytes, 0, bytes.length);
            zs.closeEntry();
            zs.close();

        } catch (FileNotFoundException ex) {
            System.err.format("File with such name doesn't exist", fph);
        } catch (IOException ex) {
            System.err.println("Input Output error: " + ex);
        }
    }

    public static void main(String[] args) {
        String fph = args[0];
        compressor(fph);
    }
}
