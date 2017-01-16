::获取LCOV格式代码覆盖率文件
java -cp ..\..\tools\UnitTest\JSCover-all.jar jscover.report.Main --format=LCOV ..\..\jscover .
xcopy ..\..\jscover\original-src\examples examples\ /s /y
xcopy ..\..\jscover\*.lcov . /s /y
::拷贝Transformers10\libs文件夹下的内容到libs
if exist libs (rd /s /q libs) 
xcopy ..\..\libs libs\ /s /y

sonar-runner