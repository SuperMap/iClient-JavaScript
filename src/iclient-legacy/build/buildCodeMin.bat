::合并文件
for /f %%i in (SuperMap.txt) do type %%i >> SuperMap-debug.js
for /f %%i in (SuperMap2_min.txt) do type %%i >> SuperMap-debug2.js

:: 初步压缩
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap.js SuperMap-debug.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/SuperMap2.js SuperMap-debug2.js 
 
::删除合并后的文件
del SuperMap-debug.js /f /q
del SuperMap-debug2.js /f /q

::删除源码中的文件
del "../libs/SuperMap.js" /f /q

::运行混淆工具
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap.js >> ../tools/compressor/SuperMap_compress.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/SuperMap2.js >> ../tools/compressor/SuperMap_compress2.js

cd /d ../tools/compressor
for /f %%i in (compress.txt) do type %%i >> ../../libs/SuperMap.js

::删除压缩后的文件
del SuperMap.js
del SuperMap2.js
del SuperMap_compress.js
del SuperMap_compress2.js

::转换格式为UTF-8
dir "..\..\libs\SuperMap.js" /A-D /B /S > encode.log
for /f %%i in (encode.log) do (  
    CScript /nologo encode.vbs %%i utf-8  
)
del encode.log