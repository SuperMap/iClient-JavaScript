::生成分库txt文件,源代码路径jChmBuild_source\createPackageFilelists.rar
createPackageFilelists.exe

::合并文件
for /f %%i in (SuperMap.txt) do type %%i >> SuperMap-debug.js
for /f %%i in (filelists.txt) do type %%i >> SuperMap-debug2.js


::删除分库的txt文件
if exist SuperMap_basic.txt ( del SuperMap_basic.txt) 
if exist SuperMap_cloud.txt ( del SuperMap_cloud.txt)
if exist SuperMap_OGC.txt ( del SuperMap_OGC.txt)
if exist SuperMap_iServer.txt ( del SuperMap_iServer.txt) 
if exist SuperMap_visualization.txt ( del SuperMap_visualization.txt) 

:: 初步压缩
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap.js SuperMap-debug.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap2.js SuperMap-debug2.js 





::删除源码中的文件
del "..\..\SuperMap.js" /f /q


::运行混淆工具
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap.js >> ../tools/compressor/SuperMap_compress.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap2.js >> ../tools/compressor/SuperMap_compress2.js


cd /d ../tools/compressor
for /f %%i in (compress.txt) do type %%i >> ../../../SuperMap.js



::删除压缩后的文件
del SuperMap.js
del SuperMap2.js

del SuperMap_compress.js
del SuperMap_compress2.js


::转换格式为UTF-8
dir "..\..\..\SuperMap.js" /A-D /B /S > encode.log
for /f %%i in (encode.log) do (  
    CScript /nologo encode.vbs %%i utf-8  
)
del encode.log

