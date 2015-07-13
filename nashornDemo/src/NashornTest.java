import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.FileNotFoundException;
import java.io.FileReader;

public class NashornTest {
    private static ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

    public static void main(String[] args) throws ScriptException, FileNotFoundException {
        engine.eval(new FileReader("src/sjViewer.js"));
        engine.eval(new FileReader("src/demoCode.js"));

        String html = (String) engine.eval("sjViewer.render(DEMO_CODE);");
        System.out.println(html);
    }



}
