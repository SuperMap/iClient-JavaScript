import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//import org.lobobrowser.html.domimpl.HTMLDocumentImpl;
//import org.lobobrowser.html.parser.*;
//import org.lobobrowser.html.test.*;
//import org.lobobrowser.html.*;
import org.jsoup.Jsoup;
import org.w3c.dom.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.w3c.dom.NodeList;
import org.w3c.dom.html.HTMLElement;
//import org.w3c.dom.html2.HTMLCollection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

public class Main {

      public static ArrayList tagList = new ArrayList();

//    public static Element readFile(String path){
//        Element docEl = null;
//        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//        DocumentBuilder db = null;
//        try {
//            db = factory.newDocumentBuilder();
//            Document doc = null;
//            doc = db.parse(new File(path));
//            docEl = doc.getDocumentElement();
//        } catch (Exception e) {
//            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//            System.out.println(e.getMessage());
//        }
//        return docEl;
//    }
    public static void sort(Document doc){
        Element MainTopic = doc.getElementById("MainTopic");
        //Element CBody = get1ElementByAttribute(MainTopic, "class", "CBody");
        if(MainTopic==null)return;
        Element CBody =  MainTopic.getElementsByClass("CBody").first();
        if(CBody==null)return;
        Element Summary = CBody.getElementsByClass("Summary").first();//get1ElementByAttribute(CBody, "class", "Summary");
        if(Summary==null)return;
        Element SBorder = Summary.getElementsByClass("SBorder").first();//get1ElementByAttribute(Summary, "class", "SBorder");
        if(SBorder==null)return;
        Element table = SBorder.getElementsByTag("table").first();//get1ElementByTagName(SBorder, "table");
        //Element tbody = get1ElementByTagName(table,"tbody");
        if(table==null)return;
        Element tbody = table.getElementsByTag("tbody").first();
        Elements list = tbody.children();
        ArrayList list2 = sortTable(list);
        for(int i=0;i<list2.size();i++){
            System.out.println("after sort:key:" + getkeyOfTr((Element) list2.get(i)));
        }
        table.empty();
        //removeAllChild(table);
        appendChilds(table, list2);
    }
    public static String getHtmlStr(Document doc){
        String innerHTML = null;
        try {
            innerHTML = doc.html();
            innerHTML = replaceHtml(innerHTML);
            //innerHTML = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">"+innerHTML;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return innerHTML;
    }
//    public static void printString(String innerHTML,String path,String name){
//        try{
//            File dir = new File(path);
//            if(!dir.exists()){
//                dir.mkdirs();
//            }
//            File htmlFile = new File(path+name);
//            FileWriter fw = new FileWriter(htmlFile);
//            //innerHTML = new String(innerHTML.getBytes(),"utf-8");
//            fw.write(innerHTML);
//            fw.close();
//        }
//        catch (Exception e){
//            System.out.println(e.getMessage());
//        }
//    }
    public static void printString(String innerHTML,String path,String name){
        try{
            File dir = new File(path);
            if(!dir.exists()){
                dir.mkdirs();
            }
            OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(path+name),"UTF-8");
            out.write(innerHTML);
            out.flush();
            out.close();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    public static String replaceHtml(String innerHTML){
        ArrayList strs = tagList;
//        strs.add("script");
//        strs.add("a");
//        strs.add("b");
//        strs.add("td");
//        strs.add("input");
//        strs.add("iframe");
//        strs.add("div");
         for(int i=0;i<strs.size();i++){
             String str =(String) strs.get(i);

             String REGEX = "<("+str+")([^<]*)/>";
             String REPLACE = "<$1$2></$1>";
             Pattern p = Pattern.compile(REGEX);
             Matcher m = p.matcher(innerHTML);       // 获得匹配器对�?
//             while (m.find()) {
//                 //al.add(m.group(0));
//                 System.out.println(m.group(0));
//             }
             innerHTML = m.replaceAll(REPLACE);
         }
        return innerHTML;
    }
    public static void removeAllChild(Element el){
         el.empty();
//         NodeList list = el.getChildNodes();
//         if(list!=null){
//              for(int i=0;i<list.getLength();i++){
//                   Node node = list.item(i);
//                   el.removeChild(node);
//              }
//         }
    }
    public static void appendChilds(Element el,ArrayList list){
        for(int i=0;i<list.size();i++){
              el.appendChild((Element) list.get(i));
        }
    }
    public static ArrayList sortTable(Elements list){
        ArrayList list2 = new ArrayList();
        int j=0;
        for(j=0;j<list.size();j++){
            Element SMain = (Element) list.get(j);
            if(SMain.hasClass("SMain")){
                list2.add(SMain);
            }
            else{
                break;
            }
        }
        ArrayList classList = getListOfClass(list,j);
        ArrayList classList1 = new ArrayList();
        for(int i=0;i<classList.size();i++){
             HashMap classMap =(HashMap) classList.get(i);
             ArrayList listInClass = (ArrayList) classMap.get("list");
            ArrayList tpList = sortTrInSummary(listInClass);
            for(int k=0;k<tpList.size();k++){
                  System.out.println("tplist:"+getkeyOfTr((Element)tpList.get(k)));
            }
            classMap.put("list",tpList);

            classList1.add(i,classMap);
        }
        for(int i=0;i<classList1.size();i++){
            HashMap classMap =(HashMap) classList1.get(i);
            ArrayList listInClass = (ArrayList) classMap.get("list");
            ArrayList titleList = (ArrayList) classMap.get("titleList");
            list2.addAll(titleList);
            list2.addAll(listInClass);
        }
        return list2;
    }
    public static ArrayList getListOfClass(Elements list,int start){
         ArrayList classList = new ArrayList();
         ArrayList list2 = null;
         ArrayList titleList = null;
         HashMap classMap = null;
        int titleCount = 0;
         for(int i=start;i<list.size();i++){
              Element el =(Element) list.get(i);
              String className = el.className();
              if(className.indexOf("SGroup")>=0||className.indexOf("SClass")>=0){//.equals("SGroup SIndent1")
                  titleCount++;
                  if(titleCount==1){
                      if(classMap!=null){
                          classMap.put("list",list2);
                          classMap.put("titleList",titleList);
                          classList.add(classMap);
                          list2 = null;
                          titleList = null;
                          classMap = null;
                      }
                      classMap = new HashMap();
                      //classMap.put("title",el);
                      list2 = new ArrayList();
                      titleList = new ArrayList();
                  }
                  titleList.add(el);
              }
//              else if(className.indexOf("SClass")>=0){
//                  titleList.add(el);
//              }
             else{
                  titleCount=0;
                  list2.add(el);
             }
             if(i==list.size()-1){
                 classMap.put("list", list2);
                 classMap.put("titleList",titleList);
                 classList.add(classMap);
                 list2 = null;
                 titleList = null;
                 classMap = null;
             }
         }

        return classList;
    }
    public static ArrayList sortTrInSummary(ArrayList list){
        ArrayList newTrs = new ArrayList();
        String[] keys = new String[list.size()];
        HashMap map = new HashMap();
        for(int i=0;i<list.size();i++){
            Element tr = (Element) list.get(i);
            String key = getkeyOfTr(tr);
            keys[i] = key;
            map.put(key,tr);
        }
        sortString(keys);
        for(int i=0;i<keys.length;i++){
            newTrs.add(map.get(keys[i]));
        }
        return newTrs;
    }
    public static String getkeyOfTr(Element el){
         Element td = el.getElementsByTag("td").first();//get1ElementByTagName(el,"td");
         Element a = td.getElementsByTag("a").first();//get1ElementByTagName(td,"a");
         String key = a.text();
        return key;
    }
    public static void sortString(String ss[]){
        //String ss[]={"ab","wang","hi","a","abff"};
        MyString mySs[]=new MyString[ss.length];//创建自定义排序的数组
        for (int i = 0; i < ss.length; i++) {
            mySs[i]=new MyString(ss[i]);
        }
        Arrays.sort(mySs);//排序
        for (int i = 0; i < mySs.length; i++) {
            //System.out.println(mySs[i].s);
            ss[i] = mySs[i].s;
        }
    }
//    public static ArrayList getElementsByAttribute(Element el,String key,String value){
//        ArrayList el2s = new ArrayList();
//        if(el!=null){
//            NodeList els = el.getChildNodes();
//            for(int i=0;i<els.getLength();i++){
//                try{
//                    Element el3 = (Element) els.item(i);
//                    String attr = el3.getAttribute(key);
//                    if(attr!=null&&attr.equals(value)){
//                        el2s.add(el3);
//                        //break;
//                    }
//                }
//                catch (Exception e){
//                    System.out.println(e.getMessage());
//                }
//            }
//        }
//        return el2s;
//    }
//    public static Element get1ElementByAttribute(Element el,String key,String value){
//        Element el2 = null;
//        if(el!=null){
//            ArrayList list = getElementsByAttribute(el,key,value);
//            if(list.size()>0){
//                el2 = (Element) list.get(0);
//            }
//        }
//        return el2;
//    }
//    public static ArrayList getElementsByTagName(Element el,String value){
//        ArrayList el2s = new ArrayList();
//        if(el!=null){
//            NodeList els = el.getChildNodes();
//            for(int i=0;i<els.getLength();i++){
//                try{
//                    Element el3 = (Element) els.item(i);
//                    if(el3.getTagName().equals(value)){
//                        el2s.add(el3);
//                        //break;
//                    }
//                }
//                catch (Exception e){
//                    System.out.println(e.getMessage());
//                }
//            }
//        }
//        return el2s;
//    }
//    public static Element get1ElementByTagName(Element el,String value){
//        Element el2 = null;
//        if(el!=null){
//            ArrayList list = getElementsByTagName(el, value);
//            if(list.size()>0){
//                el2 = (Element) list.get(0);
//            }
//        }
//        return el2;
//    }
    public static Document readFile(String path){
        Document document = null;
        try {
            //UserAgentContext uacontext = new SimpleUserAgentContext();
            //DocumentBuilderImpl builder = new DocumentBuilderImpl(uacontext);
            //URL url = new URL(path);
            //InputStream in = url.openConnection().getInputStream();
            //FileInputStream in = null;
            //in = new FileInputStream(new File(path));
            //document = Jsoup.parse(path);
            document = Jsoup.parse(new File(path),"UTF-8");
            //Jsoup.p
            //Reader reader = new InputStreamReader(in, "utf-8");
            //InputSourceImpl inputSource = new InputSourceImpl(reader, path);
           // Document d = builder.parse(inputSource);
            //document = (HTMLDocumentImpl) d;
//            HTMLCollection images = document.getImages();
//            int length = images.getLength();
//            for(int i = 0; i < length; i++) {
//                System.out.println("- Image#" + i + ": " + images.item(i));
//            }

            //in.close();
        } catch (Exception e){
           // System.out.println(e.getMessage());
        }
        return document;
    }
    public static ArrayList getFileNamesList(String path,ArrayList list){
        if(list==null){
            list = new ArrayList();
        }
        File f = new File(path);
        if(f.exists()){
            String name = f.getName();
            if(f.isFile()){
                list.add(path);
            }
            else if(f.isDirectory()){
                 String[] names = f.list();
                 for(int i=0;i<names.length;i++){
                     String path1 = path+"\\"+names[i];
                     list=getFileNamesList(path1,list);
                 }
            }
        }
        return list;
    }
    public static String getNameFromPath(String path){
        //path = path.replace("\\files\\","\\files1\\");
        String name = path.replaceAll(".*\\\\([^\\\\]*html)","$1");
        return name;
    }
    public static String getPath1FromPath(String path){
        String path1 = path.replace("\\files1\\","\\files\\");
        path1 = path1.replaceAll("(.*)\\\\([^\\\\]*html)","$1");
        return path1;
    }
    public static String getConfig(){
        String path1 = null;
        try {
            String dir = System.getProperty("user.dir");
            String path = dir + "//sortDoc.xml";

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = null;
            db = factory.newDocumentBuilder();

            org.w3c.dom.Document doc = db.parse(new File(path));
            NodeList files = doc.getElementsByTagName("file");
            org.w3c.dom.Element file =(org.w3c.dom.Element) files.item(0);
            path1= file.getAttribute("path");

            NodeList taglists = doc.getElementsByTagName("taglist");
            org.w3c.dom.Element taglist =(org.w3c.dom.Element) taglists.item(0);
            NodeList tags = taglist.getElementsByTagName("tag");
            for(int i=0;i<tags.getLength();i++){
                org.w3c.dom.Element tag =(org.w3c.dom.Element) tags.item(i);
                String tagName = tag.getTextContent();
                tagList.add(tagName);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return path1;
    }
    public static ArrayList reNameTo(ArrayList paths){
        ArrayList pathList1 = new ArrayList();
        try {
            for(int i=0;i<paths.size();i++){
                 String path =(String) paths.get(i);
                 String path1 = path.replace("\\files\\", "\\files1\\");
                 pathList1.add(path1);
                 File f = new File(path);
                 File f1 = new File(path1);
                 String dir = path1.replaceAll("\\\\[^\\\\]*html", "");
                 File dirf = new File(dir);
                 if(!dirf.exists())dirf.mkdirs();
                 f.renameTo(f1);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return pathList1;
    }
    public static void deleteDir(File f){
        if(f.isDirectory()){
            File[] fs = f.listFiles();
            for(int i=0;i<fs.length;i++){
                File f1 = fs[i];
                if(f1.isDirectory()){
                    deleteDir(f1);
                }
                else{
                    f1.delete();
                }
            }
            f.delete();
        }
    }
    public static void main(String[] args) {
        try{
            System.out.println("start");
            String dir = System.getProperty("user.dir");
            //System.out.println("dir:"+dir);
            //String path0 = dir+"\\apidoc\\files";
            String path0 = getConfig();
            //System.out.println("getConfig");
            File testf = new File(path0);
            if(!testf.exists()){
                System.out.println("can not find directory:"+path0);
                return;
            }
            String path2 = path0.replace("files", "files1");
            //System.out.println("getFileNamesList");
            ArrayList pathList = getFileNamesList(path0, null);
            //System.out.println("pathList.size:"+pathList.size());
            //System.out.println("getFileNamesList end");
//        File tempDir1 = new File(path2);
//        boolean flag = tempDir1.delete();
//        deleteDir(tempDir1);
            pathList = reNameTo(pathList);
           // System.out.println("reNameTo");
//        String path = dir+"\\apidoc\\files\\SuperMap\\BaseTypes\\";
//        String name = "Size-js.html";
           // System.out.println("pathList.size:"+pathList.size());
            if(pathList.size()==0){
                System.out.println("there is no html files.");
                return;
            }
            for(int i=0;i<pathList.size();i++){
                //System.out.println("********************************"+i+"*******************************************");
                String path =(String) pathList.get(i);
                System.out.println("sort:"+path);//pathList.size()
                //System.out.println("path:"+path);
                Document doc = readFile(path);
                //System.out.println("********************************"+i+"*******************************************");
                sort(doc);

                String path1 = getPath1FromPath(path)+"\\";
                String name1 = getNameFromPath(path);
                //System.out.println("path1:"+path1+name1);
                String html = getHtmlStr(doc);
                //System.out.println(html);
                printString(html,path1,name1);
            }
            File tempDir = new File(path2);
            deleteDir(tempDir);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
  }
}
