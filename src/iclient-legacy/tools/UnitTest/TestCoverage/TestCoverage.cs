using System;
using System.Threading;
using System.Diagnostics;
using WatiN.Core;

namespace TestCoverage
{
    class TestCoverage
    {
        private static IE _ie;
        private static int sleepTime = 300000;

        //接收测试时间参数，单位为分钟
        [STAThread]
        static void Main(string[] args)
        {
            _ie = TestBrowser.GetInternetExplorer();
            if (_ie != null)
            {
                Console.WriteLine("InternetExplorer initialized.");
            }
            if (args != null && args.Length > 0)
            {
                Console.WriteLine("args[0]：" + args[0]);
                sleepTime = Int32.Parse(args[0]) * 1000 * 60;
            }
            /*//方法一：从参数中传入要测试的页面
             String[] pages=args
             //方法二：动态读取tests目录下的html文件来获取要测试的页面
            */
            //方法三：在程序中指定要测试的页面
            String[] pages = new String[] { "index" };//"point2d", "iserver6r","index"
            for (int index = 0; index < pages.Length; index++)
            {
                String page = pages[index];
                try
                {
                    getResult(page);
                }
                catch (PageLoadException e)
                {
                    Console.WriteLine("elementType:" + e.elementType + ",IdOrClass" + e.IdOrClass + ",operator:" + e.operatorType + "，" + e.Message);
                }
                catch (Exception e)
                {
                    Console.Write(e.StackTrace);
                }

            }
            _ie.Close();
        }

        public static void getResult(String testPage)
        {
            testPage = "http://localhost:60080/tests/" + testPage + ".html";
            Console.WriteLine("Start open the page \"" + testPage + "\"");
            Element input = _ie.Elements.Filter(Find.ById("location"))[0];
            if (input == null)
            {
                throw new PageLoadException("input", "location", "getInput", "is null");
            }
            input.SetAttributeValue("value", testPage);

            Element openInFrameButton = _ie.Elements.Filter(Find.ByTitle("open URL in the iframe below [Enter]"))[0];
            if (openInFrameButton == null)
            {
                throw new PageLoadException("button", "openInFrameButton", "getButton", "is null");
            }
            try
            {
                openInFrameButton.ClickNoWait();
                Console.WriteLine("openInFrameButton.Click()");
                Console.WriteLine("sleepTime：" + sleepTime + "ms.");
                Thread.Sleep(sleepTime);

                Element storeButton = _ie.Elements.Filter(Find.ById("storeButton"))[0];
                if (storeButton == null)
                {
                    throw new PageLoadException("button", "storeButton", "getButton", "is null");
                }
                storeButton.Click();
                Console.WriteLine("storeButton.Click()");

                /*//获取测试覆盖率REST等的总和
                ElementCollection col = _ie.Elements.Filter(Find.ByClass("leftColumn"));
                int states = 0;
                int execs = 0;
                foreach (Element item in col)
                {
                    string dir = item.Text;
                    if (dir.Contains("REST"))
                    {
                        Element totalEle = item.NextSibling;
                        Element execEle = totalEle.NextSibling;
                        states += Convert.ToInt32(totalEle.Text);
                        execs += Convert.ToInt32(execEle.Text);
                    }
                }
                Console.WriteLine("REST的案例总数为" + states + "  执行了：" + execs);
                 * */
                Thread.Sleep(60000);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                Console.WriteLine();
                Console.WriteLine(e.Message);
            }
        }
    }

    public static class TestBrowser
    {
        public static readonly object LOCK_ROOT = new object();
        public static IE _browser;

        public static IE GetInternetExplorer()
        {
            if (_browser == null)
            {
                lock (LOCK_ROOT)
                {
                    if (_browser == null)
                    {
                        try
                        {
                            //关闭其他正在运行的ie进程
                            Process[] processes = Process.GetProcessesByName("iexplore");
                            foreach (Process process in processes)
                            {
                                process.Kill();
                            }
                            _browser = new IE();
                            Settings.AutoMoveMousePointerToTopLeft = false;

                            // _browser = (IE)BrowserFactory.Create(BrowserType.InternetExplorer);
                            _browser.ShowWindow(WatiN.Core.Native.Windows.NativeMethods.WindowShowStyle.Show);
                            _browser.GoTo("http://localhost:60080/jscoverage.html");
                            Console.WriteLine("page 'http://localhost:60080/jscoverage.html' opened in IE!");
                            _browser.WaitForComplete();
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e.StackTrace);
                        }
                    }
                }
            }
            return _browser;
        }
    }

    public class PageLoadException : Exception
    {
        public String elementType;
        public String IdOrClass;
        public String operatorType;
        public String msg;
        public PageLoadException(String elementType, String IdOrClass, String operatorType, String msg)
        {
            this.elementType = elementType;
            this.IdOrClass = IdOrClass;
            this.operatorType = operatorType;
            this.msg = msg;
        }

        public PageLoadException(String elementType, String IdOrClass, String msg)
        {
            this.elementType = elementType;
            this.IdOrClass = IdOrClass;
            this.msg = msg;
        }
    }
}
