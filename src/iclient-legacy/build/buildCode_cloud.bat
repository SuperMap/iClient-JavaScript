::合并文件
for /f %%i in (filelists_cloud.txt) do type %%i >> SuperMap-debug-cloud.js

:: 初步压缩
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap_Cloud.js SuperMap-debug-cloud.js 
 ::删除合并后的文件
del SuperMap-debug-cloud.js /f /q

::删除源码中的文件
del "../libs/SuperMap_Cloud.js" /f /q

::运行混淆工具
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap_Cloud.js >> ../tools/compressor/SuperMap_compress_cloud.js

cd /d ../tools/compressor
for /f %%i in (compress_cloud.txt) do type %%i >> ../../libs/SuperMap_Cloud.js

::删除压缩后的文件
del SuperMap_Cloud.js
del SuperMap_compress_cloud.js

::转换格式为UTF-8
dir "..\..\libs\SuperMap_Cloud.js" /A-D /B /S > encode.log
for /f %%i in (encode.log) do (  
    CScript /nologo encode.vbs %%i utf-8  
)
del encode.log

