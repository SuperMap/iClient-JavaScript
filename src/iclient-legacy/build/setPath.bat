@echo ON

::设置文件夹apidoc的路径
@if "%apidoc_Path%"=="" goto SetCvsSrcPath else goto HasSetCvsSrcPath
:SetCvsSrcPath
@set apidoc_Path= D:\agentJS\buildAgent\work\2_0_DistribuiltPackage_JavaScript\01_SourceCode\trunk\Transformers10
:HasSetCvsSrcPath
@echo apidoc_Path = %apidoc_Path%

::设置文件夹Transformers10的路径（以拷贝首页、产品介绍、开发指南和专题（4个）介绍页面及其相关css、js和images）
@if "%Transformers10_Path%"=="" goto SetCvsSrcPath else goto HasSetCvsSrcPath
:SetCvsSrcPath
@set Transformers10_Path=D:\agentJS\buildAgent\work\2_0_DistribuiltPackage_JavaScript\01_SourceCode\trunk
:HasSetCvsSrcPath
@echo Transformers10_Path = %Transformers10_Path%

::chm的保存路径
@if "%chmSavePath%"=="" goto SetCvsSrcPath else goto HasSetCvsSrcPath
:SetCvsSrcPath
@set chmSavePath= D:\agentJS\buildAgent\work\2_0_DistribuiltPackage_JavaScript\01_SourceCode\trunk\Transformers10\
:HasSetCvsSrcPath
@echo chmSavePath = %chmSavePath%






