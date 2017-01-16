/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes.js
 * @requires SuperMap/Control.js
 * @requires SuperMap/Events.js
 * @requires SuperMap/Map.js
 * @requires SuperMap/Marker.js
 * @requires SuperMap/Layer/Markers.js
 * @requires SuperMap/BaseTypes/Element.js
 * @requires SuperMap/BaseTypes/Pixel.js
 * @requires SuperMap/BaseTypes/LonLat.js
 * @requires SuperMap/BaseTypes/Size.js
 * @requires SuperMap/Cloud/LocalSearch/POIInfosParameter.js
 * @requires SuperMap/Cloud/LocalSearch/POIInfosService.js
 */

/**
 * Class: SuperMap.Control.SearchCity
 * POI搜索类
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.SearchCity = SuperMap.Class(SuperMap.Control, {

    /**
     * Property: defaultPosition
     * {Object} 控件默认位置。
     */
    defaultPosition: null,

    /**
     * Property: input
     * {DOMElement} 城市选择按钮。
     */
    input: null,

    /**
     * Property: isLayerAddedToMap
     * {Boolean} markerLayer是否添加到地图。
     */
    isLayerAddedToMap: false,

    /**
     * Property: listContainer
     * {DOMElement} 搜索结果容器。
     */
    listContainer: null,

    /**
     * Property: markerLayer
     * {Object} 标注图层。
     */
    markerLayer: null,

    /**
     * Property: searchBtn
     * {DOMElement} 搜索按钮。
     */
    searchBtn: null,

    /**
     * Property: searchSiteContainer
     * {DOMElement} 搜索地点输入框容器。
     */
    searchSiteInputContainer: null,

    /**
     * Property: searchSiteInput
     * {DOMElement} 搜索地点输入框。
     */
    searchSiteInput: null,

    /**
     * Property: Vicity
     * {Object} 城市模版。
     */
    Vcity: {},

    /**
     * Constructor: SuperMap.Control.SearchCity
     * POI搜索控件构造函数。
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * defaultPosition - {Object} 控件位置
     *
     * Examples:
     * (start code)
     * var searchCity = new SuperMap.Control.SearchCity({defaultPosition: new SuperMap.Pixel(1000, 20)});
     * (end)
     */
    initialize: function(options) {
        if(!!options && options.defaultPosition) {
            this.defaultPosition = options.defaultPosition;
        } else {
            this.defaultPosition = new SuperMap.Pixel(1000, 20);
        }
        SuperMap.Control.prototype.initialize.apply(this, arguments);
        this.markerLayer = new SuperMap.Layer.Markers("searchMarkers");
    },

    /**
     * APIMethod: destroy
     * 销毁控件，将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.Event.stopObserving(this.input);
        SuperMap.Event.stopObserving(this.listContainer);
        SuperMap.Event.stopObserving(this.searchBtn);
        delete this.searchBtn;
        delete this.input;
        delete this.searchSiteInput;
        delete this.listContainer;
        this.Vcity = {};
        this.markerLayer = null;
        this.isLayerAddedToMap = false;
        SuperMap.Control.prototype.destroy.apply(this);
    },

    /**
     * Method: draw
     * 创建POI搜索控件
     * Returns:
     * {DOMElement} A reference to the DOMElement containing the zoom links.
     */
    draw: function() {
        var me = this,
            div = SuperMap.Control.prototype.draw.apply(this, arguments);
        me.initVcity();
        me.initCitySelector();
        me.initSearchSite();
        me.initSearchBtn();
        div.appendChild(me.input);
        div.appendChild(me.searchSiteInputContainer);
        div.appendChild(me.searchBtn);
        return div;
    },

    /**
     * Method: initVcity
     * 初始化城市列表
     */
    initVcity: function() {
        /* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */
        this.Vcity.allCity = [
             '北京市|beijing|bj','上海市|shanghai|sh','广州市|guangzhou|gz','深圳市|shenzhen|sz','南京市|nanjing|nj','杭州市|hangzhou|hz','天津市|tianjin|tj','重庆市|chongqing|cq','成都市|chengdu|cd','青岛市|qingdao|qd','苏州市|shuzhou|sz','无锡市|wuxi|wx','常州市|changzhou|cz','温州市|wenzhou|wz',
             '武汉市|wuhan|wh','长沙市|changsha|cs','石家庄市|shijiazhuang|sjz','南昌市|nanchang|nc','三亚市|sanya|sy','合肥市|hefei|hf','郑州市|zhengzhou|zz','保定市|baoding|bd','唐山市|tangshan|ts','秦皇岛市|qinhuangdao|qhd','邯郸市|handan|hd','邢台市|xingtai|xt','张家口市|zhangjiakou|zjk',
             '承德市|chengde|cd','衡水市|hengshui|hs','廊坊市|langfang|lf','沧州市|cangzhou|cz','太原市|taiyuan|ty','大同市|datong|dt','阳泉市|yangquan|yq','长治市|changzhi|cz','晋城市|jincheng|jc','朔州市|shuozhou|sz','晋中市|jinzhong|jz','运城市|yuncheng|yc','忻州市|xinzhou|xz','临汾市|linfen|lf',
             '吕梁市|lvliang|ll','呼和浩特市|huhehaote|hhht','包头市|baotou|bt','乌海市|wuhai|wh','赤峰市|chifeng|cf','通辽市|tongliao|tl','鄂尔多斯市|eerduosi|eeds','呼伦贝尔市|hulunbeier|hlbe','巴彦淖尔市|bayannaoer|byne','乌兰察布市|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm',
             '阿拉善盟|alashanmeng|alsm','沈阳市|shenyang|sy','大连市|dalian|dl','鞍山市|anshan|as','抚顺市|fushun|fs','本溪市|benxi|bx','丹东市|dandong|dd','锦州市|jinzhou|jz','营口市|yingkou|yk','阜新市|fuxin|fx','辽阳市|liaoyang|ly','盘锦市|panjin|pj','铁岭市|tieling|tl','朝阳市|chaoyang|cy',
             '葫芦岛市|huludao|hld','长春市|changchun|cc','吉林市|jilin|jl','四平市|siping|sp','辽源市|liaoyuan|ly','通化市|tonghua|th','白山市|baishan|bs','松原市|songyuan|sy','白城市|baicheng|bc','延边朝鲜族自治州|ybcxzzzz|ybcxzzzz','哈尔滨市|haerbin|heb','齐齐哈尔市|qiqihaer|qqhe','鸡西市|jixi|jx',
             '鹤岗市|hegang|hg','双鸭山市|shuangyashan|sys','大庆市|daqing|dq','伊春市|yichun|yc','佳木斯市|jiamusi|jms','七台河市|qitaihe|qth','牡丹江市|mudanjiang|mdj','黑河市|heihe|hh','绥化市|suihua|sh','大兴安岭地区|daxinganling|dxaldq','徐州市|xuzhou|xz','南通市|nantong|nt','连云港市|lianyungang|lyg',
             '淮安市|huaian|ha','盐城市|yancheng|yc','扬州市|yangzhou|yz','镇江市|zhenjiang|zj','泰州市|taizhou|tz','宿迁市|suqian|sq','宁波市|ningbo|nb','嘉兴市|jiaxing|jx','湖州市|huzhou|hz','绍兴市|shaoxing|sx','舟山市|zhoushan|zs','衢州市|quzhou|qz','金华市|jinhua|jh','台州市|taizhou|tz','丽水市|lishui|ls',
             '芜湖市|wuhu|wh','蚌埠市|bengbu|bb','淮南市|huainan|hn','马鞍山市|maanshan|mas','淮北市|huaibei|hb','铜陵市|tongling|tl','安庆市|anqing|aq','黄山市|huangshan|hs','滁州市|chuzhou|cz','阜阳市|fuyang|fy','宿州市|suzhou|sz','巢湖市|chaohu|ch','六安市|luan|la','亳州市|bozhou|bz','池州市|chizhou|cz',
             '宣城市|xuancheng|xc','福州市|fuzhou|fz','厦门市|xiamen|xm','莆田市|putian|pt','三明市|sanming|sm','泉州市|quanzhou|qz','漳州市|zhangzhou|zz','南平市|nanping|np','龙岩市|longyan|ly','宁德市|ningde|nd','景德镇市|jingdezhen|jdz','萍乡市|pingxiang|px','九江市|jiujiang|jj','新余市|xinyu|xy',
             '鹰潭市|yingtan|yt','赣州市|ganzhou|gz','吉安市|jian|ja','宜春市|yichun|yc','抚州市|fuzhou|fz','上饶市|shangrao|sr','济南市|jinan|jn','淄博市|zibo|zb','枣庄市|zaozhuang|zz','东营市|dongying|dy','烟台市|yantai|yt','潍坊市|weifang|wf','济宁市|jining|jn','泰安市|taian|ta','威海市|weihai|wh',
             '日照市|rizhao|rz','莱芜市|laiwu|lw','临沂市|linyi|ly','德州市|dezhou|dz','聊城市|liaocheng|lc','滨州市|binzhou|bz','菏泽市|heze|hz','开封市|kaifeng|kf','洛阳市|luoyang|ly','平顶山市|pingdingshan|pds','安阳市|anyang|ay','鹤壁市|hebi|hb','新乡市|xinxiang|xx','焦作市|jiaozuo|jz','濮阳市|puyang|py',
             '许昌市|xuchang|xc','漯河市|luohe|lh','三门峡市|sanmenxia|smx','南阳市|nanyang|ny','商丘市|shangqiu|sq','信阳市|xinyang|xy','周口市|zhoukou|zk','驻马店市|zhumadian|zmd','济源市|jiyuan|jiyuan','黄石市|huangshi|hs','十堰市|shiyan|sy','宜昌市|yichang|yc','襄樊市|xiangfan|xf','鄂州市|ezhou|ez',
             '荆门市|jingmen|jm','孝感市|xiaogan|xg','荆州市|jingzhou|jz','黄冈市|huanggang|hg','咸宁市|xianning|xn','随州市|suizhou|sz','恩施土家族苗族自治州|estjzmzzzz|estjzmzzzz','仙桃市|xiantao|xt','潜江市|qianjiang|qj','天门市|tianmen|tm','神农架林区|shennongjia|snjlq','株洲市|zhuzhou|zz','湘潭市|xiangtan|xt',
             '衡阳市|hengyang|hy','邵阳市|shaoyang|sy','岳阳市|yueyang|yy','常德市|changde|cd','张家界市|zhangjiajie|zjj','益阳市|yiyang|yy','郴州市|chenzhou|cz','永州市|yongzhou|yz','怀化市|huaihua|hh','娄底市|loudi|ld','湘西土家族苗族自治州|xxtjzmzzzz|xxtjzmzzzz','韶关市|shaoguan|sg','珠海市|zhuhai|zh',
             '汕头市|shantou|st','佛山市|foushan|fs','江门市|jiangmen|jm','湛江市|zhanjiang|jz','茂名市|maoming|mm','肇庆市|zhaoqing|zq','惠州市|huizhou|hz','梅州市|meizhou|mz','汕尾市|shanwei|sw','河源市|heyuan|hy','阳江市|yangjiang|yj','清远市|qingyuan|qy','东莞市|dongguan|dg','中山市|zhongshan|zs',
             '潮州市|chaozhou|cz','揭阳市|jieyang|jy','云浮市|yunfu|yf','南宁市|nanning|nn','柳州市|liuzhou|lz','桂林市|guilin|gl','梧州市|wuzhou|wz','北海市|beihai|bh','防城港市|fangchenggang|fcg','钦州市|qinzhou|qz','贵港市|guigang|gg','玉林市|yulin|yl','百色市|baise|bs','贺州市|hezhou|hz','河池市|hechi|hc',
             '来宾市|laibin|lb','崇左市|chongzuo|cz','海口市|haikou|hk','三亚市|sanya|sy','五指山市|wuzhishan|wzs','琼海市|qionghai|qh','儋州市|danzhou|dz','文昌市|wenchang|wc','万宁市|wanning|wn','东方市|dongfang|df','定安县|dingan|da','屯昌县|tunchang|tc','澄迈县|chengmai|cm','临高县|lingao|lg',
             '白沙黎族自治县|bsnzzzx|bsnzzzx','昌江黎族自治县|cjlzzzx|cjlzzzx','乐东黎族自治县|ldlzzzx|ldlzzzx','陵水黎族自治县|lingshui|ls','保亭黎族苗族自治县|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd',
             '自贡市|zigong|zg','攀枝花市|panzhihua|pzh','泸州市|luzhou|lz','德阳市|deyang|dy','绵阳市|mianyang|my','广元市|guangyuan|gy','遂宁市|suining|sn','内江市|neijiang|nj','乐山市|leshan|ls','南充市|nanchong|nc','眉山市|meishan|ms','宜宾市|yibin|yb','广安市|guangan|ga','达州市|dazhou|dz','雅安市|yaan|ya',
             '巴中市|bazhong|bz','资阳市|ziyang|zy','阿坝藏族羌族自治州|abzzqzzzz|abzzqzzzz','甘孜藏族自治州|gzzzzzz|gzzzzzz','凉山彝族自治州|lsyzzzz|lsyzzzz','贵阳市|guiyang|gy','六盘水市|liupanshui|lps','遵义市|zunyi|zy','安顺市|anshun|as','铜仁地区|tongren|tr','黔西南布依族苗族自治州|qxnbyzmzzzz|qxnbyzmzzzz',
             '毕节地区|bijie|bj','黔东南苗族侗族自治州|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治州|qnbyzmzzzz|qnbyzmzzzz','昆明市|kunming|km','曲靖市|qujing|qj','玉溪市|yuxi|yx','保山市|baoshan|bs','昭通市|zhaotong|zt','丽江市|lijiang|lj','思茅市|simao|sm','临沧市|lincang|lc','楚雄彝族自治州|cxyzzzz|cxyzzzz',
             '红河哈尼族彝族自治州|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治州|wszzmzzzz|wszzmzzzz','西双版纳傣族自治州|xsbndzzzz|xsbndzzzz','大理白族自治州|dlbzzzz|dlbzzzz','德宏傣族景颇族自治州|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治州|njlszzzz|njlszzzz','迪庆藏族自治州|dqzzzzz|dqzzzzz','拉萨市|lasa|ls',
             '昌都地区|changdudiqu|cd','山南地区|shannandiqu|sndq','日喀则地区|rikazediqu|rkzdq','那曲地区|naqudiqu|nqdq','阿里地区|alidiqu|aldq','林芝地区|linzhidiqu|lzdq','西安市|xian|xa','铜川市|tongchuan|tc','宝鸡市|baoji|bj','咸阳市|xianyang|xy','渭南市|weinan|wn','延安市|yanan|ya','汉中市|hanzhong|hz',
             '榆林市|yulin|yl','安康市|ankang|ak','商洛市|shangluo|sl','兰州市|lanzhou|lz','嘉峪关市|jiayuguan|jyg','金昌市|jinchang|jc','白银市|baiyin|by','天水市|tianshui|ts','武威市|wuwei|ww','张掖市|zhangye|zy','平凉市|pingliang|pl','酒泉市|jiuquan|jq','庆阳市|qingyang|qy','定西市|dingxi|dx','陇南市|longnan|ln',
             '临夏回族自治州|lxhzzzz|lxhzzzz','甘南藏族自治州|gnzzzzz|gnzzzzz','西宁市|xining|xn','海东地区|haidongdiqu|hddq','海北藏族自治州|hbzzzzz|hbzzzzz','黄南藏族自治州|hnzzzzz|hnzzzzz','海南藏族自治州|hnzzzzz|hnzzzzz','果洛藏族自治州|glzzzzz|hlzzzzz','玉树藏族自治州|yszzzzz|yszzzzz',
             '海西蒙古族藏族自治州|hxmgzzzzzz|hxmgzzzzzz','银川市|yinchuan|yc','石嘴山市|shizuishan|szs','吴忠市|wuzhong|wz','固原市|guyuan|gy','中卫市|zhongwei|zw','乌鲁木齐市|wulumuqi|wlmq','克拉玛依市|kelamayi|klmy','吐鲁番地区|tulufandiqu|tlfdq','哈密地区|hamidiqu|hmdq','昌吉回族自治州|cjhzzzz|cjhzzzz',
             '博尔塔拉蒙古自治州|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治州|byglmgzzz|byglmgzzz','阿克苏地区|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kzlskekzzzz|kzlskekzzzz','喀什地区|kashidiqu|ksdq','和田地区|hetian|ht','伊犁哈萨克自治州|ylhskzzz|ylhskzzz','塔城地区|tachengdiqu|tcdq','阿勒泰地区|aletaidiqu|altdq',
             '石河子市|shihezi|shz','阿拉尔市|alaer|ale','图木舒克市|tumushuke|tmsk','五家渠市|wujiaqu|wjq','台北市|taibei|tb','高雄市|gaoxiong|gx','基隆市|jilong|jl','台中市|taizhong|tz','台南市|tainan|tn','新竹市|xinzhu|xz','嘉义市|jiayi|jy','台北县|taibeixian|tbx','宜兰县|yilanxian|ylx','桃园县|taoyuanxian|tyx',
             '新竹县|xinzhuxian|xzx','苗栗县|miaolixian|mlx','台中县|taizhongxian|tzx','彰化县|zhanghuaxian|zhx','南投县|nantouxian|ntx','云林县|yunlinxian|ylx','嘉义县|jiayixian|jyx','台南县|tainanxian|tnx','高雄县|gaoxiongxian|gxx','屏东县|pingdongxian|pdx','澎湖县|penghuxian|phx','台东县|taidongxian|tdx',
             '花莲县|hualianxian|hlx','中西区|zhongxiqu|zxq','东区|dongqu|dq','九龙城区|jiulongchengqu|jlcq','观塘区|guantangqu|gtq','南区|nanqu|nq','深水埗区|shenshuibuqu|ssbq','黄大仙区|huangdaxianqu|hdxq','湾仔区|wanzaiqu|wzq','油尖旺区|youjianwangqu|yjwq','离岛区|lidaoqu|ldq','葵青区|kuiqingqu|kqq',
             '北区|beiqu|bq','西贡区|xigongqu|xgq','沙田区|shatianqu|stq','屯门区|tunmenqu|tmq','大埔区|dabuqu|dbq','荃湾区|quanwanqu|qwq','元朗区|yuanlangqu|ylq','花地玛堂区|huadimatangqu|hdmtq','圣安多尼堂区|shenganduonitangqu|sadntq','大堂区|datangqu|dtq','望德堂区|wangdetangqu|wdtq','风顺堂区|fengshuntangqu|fstq',
             '嘉模堂区|jiamotangqu|jmtq','圣方济各堂区|shengfangjigetangqu|sfjgtq'];

        /* 城市HTML模板 */
        this.Vcity._template = [
            '<p class="tip">直接输入可搜索城市(支持汉字/拼音)</p>',
            '<ul>',
            '<li class="on">热门城市</li>',
            '<li>AB</li>',
            '<li>CD</li>',
            '<li>EFG</li>',
            '<li>H</li>',
            '<li>J</li>',
            '<li>KL</li>',
            '<li>MNP</li>',
            '<li>QR</li>',
            '<li>S</li>',
            '<li>T</li>',
            '<li>W</li>',
            '<li>X</li>',
            '<li>Y</li>',
            '<li>Z</li>',
            '</ul>'
        ];
        /* 正则表达式 筛选中文城市名、拼音、首字母 */
        this.Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
        this.Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;
        this.transformArrayToObj();
    },

    /**
     * Method: transformArrayToObj
     * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
     */
    transformArrayToObj: function() {
        var me = this;
        var citys = me.Vcity.allCity, match, letter,
            regEx = me.Vcity.regEx,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
        if (!me.Vcity.oCity) {
            me.Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
            for (var i = 0, n = citys.length; i < n; i++) {
                match = regEx.exec(citys[i]);
                letter = match[3].toUpperCase();
                if (reg2.test(letter)) {
                    if (!me.Vcity.oCity.AB[letter]) me.Vcity.oCity.AB[letter] = [];
                    me.Vcity.oCity.AB[letter].push(match[1]);
                } else if (reg3.test(letter)) {
                    if (!me.Vcity.oCity.CD[letter]) me.Vcity.oCity.CD[letter] = [];
                    me.Vcity.oCity.CD[letter].push(match[1]);
                } else if (reg4.test(letter)) {
                    if (!me.Vcity.oCity.EFG[letter]) me.Vcity.oCity.EFG[letter] = [];
                    me.Vcity.oCity.EFG[letter].push(match[1]);
                }else if (reg5.test(letter)) {
                    if (!me.Vcity.oCity.H[letter]) me.Vcity.oCity.H[letter] = [];
                    me.Vcity.oCity.H[letter].push(match[1]);
                }else if (reg6.test(letter)) {
                    if (!me.Vcity.oCity.J[letter]) me.Vcity.oCity.J[letter] = [];
                    me.Vcity.oCity.J[letter].push(match[1]);
                }else if (reg7.test(letter)) {
                    if (!me.Vcity.oCity.KL[letter]) me.Vcity.oCity.KL[letter] = [];
                    me.Vcity.oCity.KL[letter].push(match[1]);
                }else if (reg8.test(letter)) {
                    if (!me.Vcity.oCity.MNP[letter]) me.Vcity.oCity.MNP[letter] = [];
                    me.Vcity.oCity.MNP[letter].push(match[1]);
                }else if (reg9.test(letter)) {
                    if (!me.Vcity.oCity.QR[letter]) me.Vcity.oCity.QR[letter] = [];
                    me.Vcity.oCity.QR[letter].push(match[1]);
                }else if (reg10.test(letter)) {
                    if (!me.Vcity.oCity.S[letter]) me.Vcity.oCity.S[letter] = [];
                    me.Vcity.oCity.S[letter].push(match[1]);
                }else if (reg11.test(letter)) {
                    if (!me.Vcity.oCity.T[letter]) me.Vcity.oCity.T[letter] = [];
                    me.Vcity.oCity.T[letter].push(match[1]);
                }else if (reg12.test(letter)) {
                    if (!me.Vcity.oCity.W[letter]) me.Vcity.oCity.W[letter] = [];
                    me.Vcity.oCity.W[letter].push(match[1]);
                }else if (reg13.test(letter)) {
                    if (!me.Vcity.oCity.X[letter]) me.Vcity.oCity.X[letter] = [];
                    me.Vcity.oCity.X[letter].push(match[1]);
                }else if (reg14.test(letter)) {
                    if (!me.Vcity.oCity.Y[letter]) me.Vcity.oCity.Y[letter] = [];
                    me.Vcity.oCity.Y[letter].push(match[1]);
                }else if (reg15.test(letter)) {
                    if (!me.Vcity.oCity.Z[letter]) me.Vcity.oCity.Z[letter] = [];
                    me.Vcity.oCity.Z[letter].push(match[1]);
                }

                /* 热门城市 前16条 */
                if(i<20){
                    if(!me.Vcity.oCity.hot['hot']) me.Vcity.oCity.hot['hot'] = [];
                    me.Vcity.oCity.hot['hot'].push(match[1]);
                }
            }
        }
    },

    /**
     * Method: initCitySelector
     * 初始化城市选择控件
     */
    initCitySelector: function() {
        var me = this;
        me.input = document.createElement("button");
        SuperMap.Element.addClass(me.input, "smCityInput");
        me.input.setAttribute("id", "smCityInput");
        me.input.innerHTML = "北京市";
        me.inputEvent();
    },

    /**
     * Method: initSearchSite
     * 初始化搜索地点输入Input
     */
    initSearchSite: function() {
        var me = this;
        me.searchSiteInputContainer = document.createElement("div");
        SuperMap.Element.addClass(me.searchSiteInputContainer, "searchSiteContainer");
        me.searchSiteInput = document.createElement("input");
        me.searchSiteInput.setAttribute("type", "text");
        me.searchSiteInput.setAttribute("placeholder", "搜索地点");
        me.searchSiteInput.setAttribute("id", "searchSite");
        me.searchSiteInput.setAttribute("required", "");
        SuperMap.Element.addClass(me.searchSiteInput, "searchSite");
        var clearInput = me.initClearInput();
        me.searchSiteInputContainer.appendChild(me.searchSiteInput);
        me.searchSiteInputContainer.appendChild(clearInput);
        var context = {
            'searchControl': this
        };
        me.searchSiteInput.addEventListener("keydown", function(event) {
            if(event.key == "Enter") {
                me.searchBtnClick.apply(context);
            };
        });
    },

    initClearInput: function() {
        var me = this;
        var div = document.createElement("a");
        SuperMap.Element.addClass(div, "clearInput");
        div.setAttribute("href", "javascript:");
        div.onclick = function() {
            me.searchSiteInput.value = "";
        }
        return div;
    },

    /**
     * Method: initSearchBtn
     * 初始化搜索地按钮
     */
    initSearchBtn: function() {
        var me = this;
        me.searchBtn = document.createElement("div");
        me.searchBtn.setAttribute("id", "searchBtn");
        SuperMap.Element.addClass(me.searchBtn, "searchBtn");
        var context = {
            'searchControl': this
        };
        SuperMap.Event.observe(me.searchBtn, 'click', SuperMap.Function.bindAsEventListener(me.searchBtnClick, context));
    },

    /**
     * Method: searchBtnClick
     * 搜索按钮点击事件
     */
    searchBtnClick: function() {
        var projection = this.searchControl.map.getProjection();
        var me = this,
            searchCity = me.searchControl.input.innerHTML,
            searchSite = me.searchControl.searchSiteInput.value,
            pageSize = 10,
            pageNum = 1,
            EPSG = parseInt(projection.split(":")[1]);
        if(searchSite == "") {
            alert("请输入搜索地点！");
            return ;
        }
        var poiInfosParameter = new SuperMap.Cloud.POIInfosParameter({
                city: searchCity,
                keyWords: searchSite,
                pageSize: pageSize,
                pageNum: pageNum,
                to: EPSG
            });
        var poiInfosService = new SuperMap.Cloud.POIInfosService("http://www.supermapol.com/iserver/services/localsearch/rest/searchdatas/China/poiinfos");
        poiInfosService.events.on({
            "scope": me.searchControl,
            "processCompleted": me.searchControl.searchCompleted,
            "processFailed": me.searchControl.searchFailed
        });
        poiInfosService.processAsync(poiInfosParameter);
    },

    /**
     * Method: searchCompleted
     * 查询成功执行此方法
     */
    searchCompleted: function(result) {
        var me = this;
        var poiInfos = result.result.poiInfos;
        var len = poiInfos.length;
        if(len != 0) {
            if(!me.listContainer) {
                me.createSearchResultContainer();
            } else {
                SuperMap.Element.removeClass(me.listContainer, 'hide');
                var ul = me.listContainer.getElementsByTagName("ul")[0];
                var lis = ul.getElementsByTagName("li");
                for(var j = 0, length = lis.length; j < length; j ++) {
                    ul.removeChild(lis[0]);
                }
            }
            var fragment = document.createDocumentFragment();
            for(var i = 0; i < len; i ++) {
                var li =document.createElement("li");
                li.infoObj = poiInfos[i];
                var liText =document.createTextNode(poiInfos[i].name);
                li.appendChild(liText);
                fragment.appendChild(li);

            }
            me.listContainer.getElementsByTagName("ul")[0].appendChild(fragment);
            me.addMarker(poiInfos);
            me.registeLiClick();
        }
    },

    /**
     * Method: searchFailed
     * 查询失败执行此方法
     */
    searchFailed: function(result) {
        alert(result.error.errorMsg);
    },

    /**
     * Method: createSearchResultContainer
     * 初始化查询结果列表容器
     */
    createSearchResultContainer: function() {
        var me = this;
        var inputPos = SuperMap.Element.getPosition(me.input);
        me.listContainer = document.createElement("div");
        me.listContainer.style.left = inputPos.left + "px";
        me.listContainer.style.top = (me.input.offsetHeight + inputPos.top + 5) + "px";
        SuperMap.Element.addClass(me.listContainer, "searchList");
        var ul = document.createElement("ul");
        me.listContainer.appendChild(ul);
        document.body.appendChild(me.listContainer);
        // 设置DIV阻止冒泡
        SuperMap.Event.observe(me.listContainer, 'click', SuperMap.Function.bindAsEventListener(function(event) {
            SuperMap.Event.stop(event);
        }, me.listContainer));

        // 设置点击文档隐藏弹出的城市选择框
        SuperMap.Event.observe(document, 'click', SuperMap.Function.bindAsEventListener(function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target == me.listContainer) return false;
            if(me.listContainer)SuperMap.Element.addClass(me.listContainer, "hide");
        }, document));
    },

    /**
     * Method: registeLiClick
     * 注册查询结果列表点击事件
     */
    registeLiClick: function() {
        var me = this;
        var lis = me.listContainer.getElementsByTagName("ul")[0].getElementsByTagName("li");
        for(var i = 0, len = lis.length; i < len; i ++) {
            lis[i].onclick = function(event) {
                var target = event.target;
                me.map.setCenter(new SuperMap.LonLat(target.infoObj.location.lon, target.infoObj.location.lat), 13);
            }
        }
    },

    /**
     * Method: addMarker
     * 添加标注
     */
    addMarker: function(poiObj) {
        var me = this;
        if(!me.isLayerAddedToMap) {
            me.map.addLayer(me.markerLayer);
        } else {
            me.markerLayer.clearMarkers();
        }
        var size = new SuperMap.Size(44,33),
            offset = new SuperMap.Pixel(-(size.w/2), -size.h),
            icon = new SuperMap.Icon('../theme/images/marker.png', size, offset);
        for(var i = 0, len = poiObj.length; i < len; i ++) {
            var marker = new SuperMap.Marker(new SuperMap.LonLat(poiObj[i].location.lon, poiObj[i].location.lat),icon);
            marker.poiInfo = poiObj[i];
            me.markerLayer.addMarker(marker);
        }
        me.isLayerAddedToMap = true;
    },
    /**
     * Method: inputEvent
     * 城市选择按钮事件
     */
    inputEvent: function() {
        var me = this;
        SuperMap.Event.observe(me.input, 'click', SuperMap.Function.bindAsEventListener(function(event) {
            event = event || window.event;
            if(!me.cityBox){
                me.createWarp();
            }else if(!!me.cityBox && SuperMap.Element.hasClass(me.cityBox, 'hide')){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!me.ul || (me.ul && SuperMap.Element.hasClass(me.url, 'hide'))){
                    SuperMap.Element.removeClass(me.cityBox, 'hide');

                    /* IE6 移除iframe 的hide 样式 */
                    SuperMap.Element.removeClass(me.myIframe, 'hide');
                    me.changeIframe();
                }
            }
        }, me.input));
        SuperMap.Event.observe(me.input, 'blur', SuperMap.Function.bindAsEventListener(function() {
            //var value = Vcity._m.trim(me.input.value);
            var value = me.input.value.replace(/^\s+|\s+$/g,'');
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = me.Vcity.allCity.length; i < n; i++) {
                    if (reg.test(me.Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    me.input.value= '';
                }else{
                    var lis = me.ul.getElementsByTagName('li');
                    //var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            me.input.innerHTML = bs[0].innerHTML;
                        }
                    }else{
                        me.input.innerHTML = '';
                    }
                }
            }
        }, me.input));
        SuperMap.Event.observe(me.input, 'keyup', SuperMap.Function.bindAsEventListener(function(event) {
            event = event || window.event;
            var keycode = event.keyCode;
            SuperMap.Element.addClass(me.cityBox, 'hide');
            me.createUl();

            /* 移除iframe 的hide 样式 */
            SuperMap.Element.removeClass(me.myIframe, 'hide');

            // 下拉菜单显示的时候捕捉按键事件
            if(me.ul && !SuperMap.Element.hasClass(me.ul, 'hide') && !me.isEmpty){
                me.KeyboardEvent(event, keycode);
            }
        }, me.input));
    },

    /**
     * Method: createWrap
     * 创建城市BOX HTML 框架
     */
    createWarp: function() {
        var inputPos = SuperMap.Element.getPosition(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        SuperMap.Event.observe(this.rootDiv, 'click', SuperMap.Function.bindAsEventListener(function(event) {
            SuperMap.Event.stop(event);
        }, this.rootDiv));

        // 设置点击文档隐藏弹出的城市选择框
        SuperMap.Event.observe(document, 'click', SuperMap.Function.bindAsEventListener(function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target == that.input) return false;
            if(that.cityBox)SuperMap.Element.addClass(that.cityBox, 'hide');
            if(that.ul)SuperMap.Element.addClass(that.ul, 'hide');
            if(that.myIframe)SuperMap.Element.addClass(that.myIframe, 'hide');
            if(that.listContainer)SuperMap.Element.addClass(that.listContainer, 'hide');
        }, document));
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = that.Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /**
     * Method: createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     */
    createHotCity: function() {
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = this.Vcity.regEx,
            oCity = this.Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="#">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            SuperMap.Element.removeClass(this.hot, 'hide');
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /**
     * Method: tabChange
     * tab按字母顺序切换
     */
    tabChange: function() {
        var lis = this.cityBox.getElementsByTagName('li');
        var divs = this.hotCity.getElementsByTagName('div');
        //var lis = Vcity._m.$('li',this.cityBox);
        //var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    SuperMap.Element.removeClass(lis[j], 'on');
                    SuperMap.Element.addClass(divs[j], 'hide');
                }
                SuperMap.Element.addClass(this, 'on');
                SuperMap.Element.removeClass(divs[this.index], 'hide');
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /**
     * Method: linkEvent
     * 城市link事件
     */
    linkEvent: function() {
        var links = this.hotCity.getElementsByTagName('a');
        //var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.innerHTML = this.innerHTML;
                SuperMap.Element.addClass(that.cityBox, 'hide');
                /* 点击城市名的时候隐藏myIframe */
                SuperMap.Element.addClass(that.myIframe, 'hide');
            }
        }
    },

    /**
     * Method: createUrl
     * 生成下拉选择列表
     */
    createUl: function () {
        var str, me = this;
        var value = this.input.value.replace(/^\s+|\s+$/g,'');
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = me.Vcity.allCity.length; i < n; i++) {
                if (reg.test(me.Vcity.allCity[i])) {
                    var match = me.Vcity.regEx.exec(me.Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && SuperMap.Element.hasClass(this.ul, 'hide')) {
                this.count = 0;
                SuperMap.Element.removeClass(this.ul, 'hide');
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            SuperMap.Element.addClass(this.ul, 'hide');
            SuperMap.Element.removeClass(this.cityBox, 'hide');

            SuperMap.Element.removeClass(this.myIframe, 'hide');

            this.changeIframe();
        }
    },

    /**
     * Method: changeIframe
     * IE6的改变遮罩SELECT 的 IFRAME尺寸大小
     */
    changeIframe: function() {
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /**
     * Method: keyboardEvent
     * 特定键盘事件，上、下、Enter键
     */
    KeyboardEvent: function(event, keycode) {
        var libs = this.ul.getElementsByTagName('li');
        //var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    SuperMap.Element.removeClass(lis[i], 'on');
                }
                SuperMap.Element.addClass(lis[this.count], 'on');
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    SuperMap.Element.removeClass(lis[i], 'on');
                }
                SuperMap.Element.addClass(lis[this.count], 'on');
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                SuperMap.Element.addClass(this.ul, 'hide');
                //SuperMap.Element.addClass(this.ul, 'hide');
                /* IE6 */
                SuperMap.Element.addClass(this.myIframe, 'hide');
                break;
            default:
                break;
        }
    },

    /**
     * Methodn: liEvent
     * 下拉列表li事件
     */
    liEvent: function() {
        var that = this;
        var lis = this.ul.getElementsByTagName('li');
        //var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            SuperMap.Event.observe(lis[i], 'click', SuperMap.Function.bindAsEventListener(function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                that.input.value = that.Vcity.regExChiese.exec(target.innerHTML)[0];
                SuperMap.Element.addClass(that.ul, 'hide');
                /* IE6 下拉菜单点击事件 */
                SuperMap.Element.addClass(that.myIframe, 'hide');
            }, lis[i]));
            SuperMap.Event.observe(lis[i], 'mouseover', SuperMap.Function.bindAsEventListener(function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                SuperMap.Element.addClass(target, 'on');
            }, lis[i]));
            SuperMap.Event.observe(lis[i], 'mouseout', SuperMap.Function.bindAsEventListener(function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                SuperMap.Element.removeClass(target, 'on');
            }, lis[i]));
        }
    },

    CLASS_NAME: "SuperMap.Control.SearchCity"
});
