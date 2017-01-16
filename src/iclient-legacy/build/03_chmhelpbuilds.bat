@echo off
call setPath.bat

echo 拷贝 "chmdoc.hhp" 到 chmdoc，生成hhc、hhk、hhp...
copy assist\chmdoc.hhp chmdoc\ /y
chmdoc.FarRun

echo 拷贝 "hhc.exe" 到 chmdoc...
copy assist\hhc.exe chmdoc\ /y

echo 修改chm目录和索引...
hhc_hhk_modify.exe

del chmdoc\_errorlog.txt

echo 生成chm...
chmdoc\hhc.exe chmdoc\chmdoc.hhp

copy "chmdoc\SuperMap iClient for JavaScript Help.chm" %chmSavePath% /y
del chmdocLogfile.txt
rd /s /q chmdoc






