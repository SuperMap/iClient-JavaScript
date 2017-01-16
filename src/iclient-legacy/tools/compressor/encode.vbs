' *==============================================================================*
' * CMD 命令行编码转换工具包括GB2312,UTF-8,Unicode,BIG5 *
' * encode.vbs     BY: colinlin1982@sohu.com         2010-07-01 *
' *==============================================================================*
Usage1 = "语法１：encode.vbs [驱动器][目录][文件名] <charset>（直接替换原文件模式）"
Usage2 = "语法２：encode.vbs [驱动器][目录][文件名] [目标驱动器][目录][新名称] <charset> /Ｙ"
Usage3 = "        如果目标新文件已存在，使用/Ｙ参数后将直接替换而不提示是否改写！  "
Usage4 = "命令行编码转换工具 BY: colinlin1982@sohu.com"
Set objArgs=WScript.Arguments
Set fso=CreateObject("Scripting.FileSystemObject")
if objArgs.Count < 2 Then
	WScript.Echo(Usage1)
	WScript.Echo(Usage2)
	WScript.Echo(Usage3)
	WScript.Echo(Usage4)
	Wscript.Quit
end if
if not objArgs.Count < 4 Then
	' 参数过多
    Options="/y"
    ignoring=StrComp(objArgs(3), Options, vbTextCompare)
    if ignoring = 0 Then
        Sourcefile=objArgs(0)
        Getfile=objArgs(1)
		Charset=objArgs(2)
    else
        MsgBox "文件数量或参数太多        ", vbInformation, "程序意外终止"
        Wscript.Quit
    end if
else
    if not objArgs.Count < 3 Then
        Sourcefile=objArgs(0)
        Getfile=objArgs(1)
		Charset=objArgs(2)
        if fso.FileExists(Getfile) then
            Choice = MsgBox ("待处理文件 '"+Sourcefile+"' ==> 目标文件 '"+Getfile+"'    "&vbCrLf&"目标文件 '"+Getfile+"' 已存在，是否覆盖现有文件？",vbQuestion+vbYesNo,"确认覆盖目标文件")
            if not Choice = vbYes Then
                Wscript.Quit
            end if
        end if
    else
        Sourcefile=objArgs(0)
        Getfile=objArgs(0)
		Charset=objArgs(1)
    end if
end if

Call WriteToFile(Getfile, ReadFile(Sourcefile), Charset)
Wscript.Quit
'* 判断文件编码
Function GetCode (Sourcefile)
    Dim slz
    set slz = CreateObject("Adodb.Stream")
    slz.Type = 1
    slz.Mode = 3
    slz.Open
    slz.Position = 0
    slz.Loadfromfile Sourcefile
    Bin=slz.read(2)
    if AscB(MidB(Bin,1,1))=&HEF and AscB(MidB(Bin,2,1))=&HBB Then
        codes="UTF-8"
	elseif AscB(MidB(Bin,1,1))=&HFF and AscB(MidB(Bin,2,1))=&HFE Then
		codes="Unicode"
	else
		codes="GB2312"
    end if
    slz.Close
    set slz = Nothing
	GetCode = codes
End Function
'* 读取文件
Function ReadFile(Sourcefile)
    Dim Str
	oldChartset = GetCode(Sourcefile)
    Set stm = CreateObject("Adodb.Stream")
    stm.Type = 2
    stm.mode = 3
    stm.charset = oldChartset
    stm.Open
    stm.loadfromfile Sourcefile
    Str = stm.readtext
    stm.Close
    Set stm = Nothing
    ReadFile = Str
End Function
'* 写入文件
Function WriteToFile (Getfile, Str, CharSet)
    Set stm = CreateObject("Adodb.Stream")
    stm.Type = 2
    stm.mode = 3
    stm.charset = CharSet
    stm.Open
    stm.WriteText Str
    stm.SaveToFile Getfile,2
    stm.flush
    stm.Close
    Set stm = Nothing
End Function