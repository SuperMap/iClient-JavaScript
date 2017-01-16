package iClient6R;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class ReplaceText {
	public static void main(String[] args) {
		String filePath=args[0];
		String srcText=args[1];
		String destText=args[2];
		replace(filePath, srcText, destText);
	}
	//修改文件，将文件中的 srcText 替换为 destText
	public static void replace(String filePath,String srcText,String destText) {
		try {
		    StringBuffer content = new StringBuffer();		    
			InputStreamReader reader = new InputStreamReader(new FileInputStream(filePath), "utf-8");
			char[] bytes = new char[1];
			while(reader.read(bytes) != -1) {
			    content.append(bytes);	
			}
			String contentStr = content.toString();
			if(contentStr.indexOf(srcText) != -1) {
			    contentStr = contentStr.replace(srcText, destText);
			    System.out.println("ok");
			}else{
				System.out.println("false");
			}
			reader.close();
			
			OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(filePath), "UTF-8");
			writer.write(contentStr);
			writer.flush();
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
