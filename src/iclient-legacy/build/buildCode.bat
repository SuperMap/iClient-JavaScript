::生成分库txt文件,源代码路径jChmBuild_source\createPackageFilelists.rar
createPackageFilelists.exe

::合并文件
for /f %%i in (SuperMap.txt) do type %%i >> SuperMap-debug.js
for /f %%i in (filelists.txt) do type %%i >> SuperMap-debug2.js
for /f %%i in (SuperMap_basic.txt) do type %%i >> SuperMap-debug-basic.js
for /f %%i in (SuperMap_cloud.txt) do type %%i >> SuperMap-debug-cloud.js
for /f %%i in (SuperMap_OGC.txt) do type %%i >> SuperMap-debug-OGC.js
for /f %%i in (SuperMap_iServer.txt) do type %%i >> SuperMap-debug-iServer.js
for /f %%i in (SuperMap_visualization.txt) do type %%i >> SuperMap-debug-visualization.js
for /f %%i in (filelists_plot.txt) do type %%i >> SuperMap-debug-plot.js

::删除分库的txt文件
if exist SuperMap_basic.txt ( del SuperMap_basic.txt) 
if exist SuperMap_cloud.txt ( del SuperMap_cloud.txt)
if exist SuperMap_OGC.txt ( del SuperMap_OGC.txt)
if exist SuperMap_iServer.txt ( del SuperMap_iServer.txt) 
if exist SuperMap_visualization.txt ( del SuperMap_visualization.txt) 

:: 初步压缩
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap.js SuperMap-debug.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap2.js SuperMap-debug2.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_Basic.js SuperMap-debug-basic.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_Cloud.js SuperMap-debug-cloud.js
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_OGC.js SuperMap-debug-OGC.js
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_IServer.js SuperMap-debug-iServer.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_Visualization.js SuperMap-debug-visualization.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_Plot.js SuperMap-debug-plot.js 

::删除合并后的文件
del SuperMap-debug.js /f /q
del SuperMap-debug2.js /f /q
del SuperMap-debug-basic.js /f /q
del SuperMap-debug-cloud.js /f /q
del SuperMap-debug-OGC.js /f /q
del SuperMap-debug-iServer.js /f /q
del SuperMap-debug-visualization.js /f /q
del SuperMap-debug-plot.js /f /q

::删除源码中的文件
del "../libs/SuperMap.js" /f /q
del "../libs/SuperMap_Basic.js" /f /q
del "../libs/SuperMap_Cloud.js" /f /q
del "../libs/SuperMap_OGC.js" /f /q
del "../libs/SuperMap_IServer.js" /f /q
del "../libs/SuperMap_Visualization.js" /f /q
del "../libs/SuperMap_Plot.js" /f /q

::运行混淆工具
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap.js >> ../tools/compressor/SuperMap_compress.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap2.js >> ../tools/compressor/SuperMap_compress2.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_Basic.js >> ../tools/compressor/SuperMap_compress_basic.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_Cloud.js >> ../tools/compressor/SuperMap_compress_cloud.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_OGC.js >> ../tools/compressor/SuperMap_compress_OGC.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_IServer.js >> ../tools/compressor/SuperMap_compress_iServer.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_Visualization.js >> ../tools/compressor/SuperMap_compress_visualization.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_Plot.js >> ../tools/compressor/SuperMap_compress_plot.js


cd /d ../tools/compressor
for /f %%i in (compress.txt) do type %%i >> ../../libs/SuperMap.js
for /f %%i in (compress_basic.txt) do type %%i >> ../../libs/SuperMap_Basic.js
for /f %%i in (compress_cloud.txt) do type %%i >> ../../libs/SuperMap_Cloud.js
for /f %%i in (compress_OGC.txt) do type %%i >> ../../libs/SuperMap_OGC.js
for /f %%i in (compress_iServer.txt) do type %%i >> ../../libs/SuperMap_IServer.js
for /f %%i in (compress_visualization.txt) do type %%i >> ../../libs/SuperMap_Visualization.js
for /f %%i in (compress_plot.txt) do type %%i >> ../../libs/SuperMap_Plot.js


::删除压缩后的文件
del SuperMap.js
del SuperMap2.js
del SuperMap_Basic.js
del SuperMap_Cloud.js
del SuperMap_OGC.js
del SuperMap_IServer.js
del SuperMap_Visualization.js
del SuperMap_Plot.js
del SuperMap_compress.js
del SuperMap_compress2.js
del SuperMap_compress_basic.js
del SuperMap_compress_cloud.js
del SuperMap_compress_OGC.js
del SuperMap_compress_iServer.js
del SuperMap_compress_visualization.js
del SuperMap_compress_plot.js

::转换格式为UTF-8
dir "..\..\libs\SuperMap.js" /A-D /B /S > encode.log
for /f %%i in (encode.log) do (  
    CScript /nologo encode.vbs %%i utf-8  
)
del encode.log

