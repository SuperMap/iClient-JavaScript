using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using mshtml;
using NUnit.Framework;
using WatiN.Core;
using WatiN.Core.Native;
using WatiN.Core.Native.Windows;

namespace UnitTest
{
    public class UnitTest
    {
        private IE _ie;
        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
            try
            {
                System.Threading.Thread.CurrentThread.SetApartmentState(ApartmentState.STA);
            }
            catch (Exception e)
            {
                Console.Write(e.StackTrace);
                System.Threading.Thread.CurrentThread.SetApartmentState(ApartmentState.MTA);
            }
            _ie = TestBrowser.GetInternetExplorer();
        }

        [TestFixtureTearDown]
        public void TestFixtureDown()
        {
            _ie.Close();
        }

        [Test]
        public void QUnit([ValueSource("RunQUnitTests")]  QUnitTest current)
        {
            ((QUnitTest)current).ShouldPass();
        }

        public IEnumerable<QUnitTest> RunQUnitTests()
        {
            TestFile layer = new TestFile { FileName = "Layer.html", RunTime=5 };
            TestFile iServer6R = new TestFile { FileName = "iServer6R.html", RunTime = 5 };
            TestFile index = new TestFile { FileName = "index.html", RunTime = 60000 };
            System.Collections.Generic.List<TestFile> testHTMLs = new System.Collections.Generic.List<TestFile>
                   {
                       //layer,
                       //iServer6R,
                       index
                   };
            return testHTMLs.SelectMany(page => GetQUnitTestResults(page.FileName,page.RunTime));
        }


        public IEnumerable<QUnitTest> GetQUnitTestResults(string testPage,int sleepTime)
        {
            TestFixtureSetUp();
            _ie.GoTo(string.Format("D:/agentJS/buildAgent/work/SuperMapiClient60/01_SourceCode/trunk/Transformers10/tests/{0}", testPage));
            Thread.Sleep(100);
            Boolean running = true;
            int count = 0;
            while (running)
            {
                if (!_ie.ContainsText("Running"))                {
                    running = false;
                }
                else if (count <= 120)//20分钟后还没运行完的话算超时
                {
                    Thread.Sleep(10000);
                }
                else
                {
                    running = false;
                }
                count++;
            }
            return grabTestResultsFromWebPage(testPage);
        }

        public IEnumerable<QUnitTest> grabTestResultsFromWebPage(string testPage)
        {
            ElementCollection ec = _ie.Elements.Filter(Find.ById("qunit-tests"));
            if (ec == null) yield break;
            var qunitTestResults = ec[0];
            if (qunitTestResults == null) yield break;
            IEnumerable<INativeElement> testResults= qunitTestResults.NativeElement.Children.GetElements();
            if (testResults == null) yield break;

            var testName = String.Empty;
            var resultType = String.Empty;
            var failedAssert = String.Empty;
            //每一个测试函数
            foreach (INativeElement testCaseResult in testResults)
            {
                if (!testCaseResult.TagName.Equals("LI")) yield break;
                if (testCaseResult.GetType().Equals(typeof(WatiN.Core.Native.InternetExplorer.IEElement)))
                {
                    IHTMLElement testCase = ((WatiN.Core.Native.InternetExplorer.IEElement)testCaseResult).AsHtmlElement;
                    resultType = testCase.className;
                }
                
                IEnumerable<INativeElement> elementItems = testCaseResult.Children.GetElements();
                if (elementItems == null) yield break;
                //测试函数内的元素
                foreach (INativeElement elementItem in elementItems)
                {
                    IHTMLElement htmlElement = null;
                    if (elementItem.TagName.Equals("STRONG"))
                    {
                        if (elementItem.GetType().Equals(typeof(WatiN.Core.Native.InternetExplorer.IEElement)))
                        {
                            htmlElement = ((WatiN.Core.Native.InternetExplorer.IEElement)elementItem).AsHtmlElement;
                        }
                        testName = htmlElement.innerText;//处理括号
                    }
                    if (elementItem.TagName.Equals("OL") && resultType.Equals("fail"))
                    {
                        IEnumerable<INativeElement> AssertResults = elementItem.Children.GetElements();
                        foreach (INativeElement assertItem in AssertResults)
                        {
                            IHTMLElement assertItemHtml = ((WatiN.Core.Native.InternetExplorer.IEElement)assertItem).AsHtmlElement;
                            if (assertItemHtml.className.Equals("fail"))
                            {
                                failedAssert = testName + "\n"+ assertItemHtml.innerText;
                                break;
                            }
                        }
                    }
                }
                QUnitTest caseResult= new QUnitTest
                {
                    FileName = testPage,
                    TestName = removeAssertCounts(testName),
                    Result = resultType,
                    Message = failedAssert
                };
                yield return caseResult;
            }
        }

        private static string removeAssertCounts(string fullTagText)
        {
            if (fullTagText == null) return String.Empty;
            int parenPosition = fullTagText.IndexOf('(');
            if (parenPosition > 0)
            {
                return fullTagText.Substring(0, parenPosition - 1);
            }
            return fullTagText;
        }
    }

    public class TestFile
    {
        public string FileName { get; set; }
        public int RunTime { get; set; }
    }

    public class QUnitTest
    {
        public string FileName { get; set; }
        public string TestName { get; set; }
        public string Result { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return string.Format("[{0}] {1}", FileName, TestName);
        }
    }

    public static class QUnitTestHelpers
    {
        public static void ShouldPass(this QUnitTest theTest)
        {
            Assert.IsTrue(theTest.Result != null);
            Assert.AreEqual("pass", theTest.Result, theTest.Message);
        }
        
        public static bool Is(this XName xname, string name)
        {
            return xname.ToString().Equals(name, StringComparison.OrdinalIgnoreCase);
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
                            //_browser = new IE("http://lixf:8080/test");
                            _browser = new IE();
                            Settings.AutoMoveMousePointerToTopLeft = false;
                            _browser.ShowWindow(NativeMethods.WindowShowStyle.Show);
                        }catch(Exception e){
                            String msg = e.Message ;
                        }   
                    }
                }
            }
            return _browser;
        }
    }
}