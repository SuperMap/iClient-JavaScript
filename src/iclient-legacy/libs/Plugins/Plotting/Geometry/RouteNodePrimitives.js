/**
 * Class: SuperMap.Geometry.RouteNodePrimitives
 * 构建航线节点的几何对象。
 */
SuperMap.Geometry.RouteNodePrimitives = SuperMap.Class({

    //初始化
    initialize: function(options){

    },

    /**
     * Method: rendezvousPoint
     * 会合点
     */
    rendezvousPoint: function(){
        var symbolCells = [];

        var circle = new Object;
        circle.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        circle.positionPoints = [];
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 20));
        circle.style = {surroundLineFlag: false, fontSize: 12};

        var text = new Object;
        text.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
        text.positionPoints = [];
        text.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        text.textContent = SuperMap.i18n("rendezvousPointContent");
        text.style = {surroundLineFlag: false, fontSize: 8, fontSizeLimit:true};
        text.style.labelAlign = "cm";

        symbolCells.push(text);
        symbolCells.push(circle);
        return symbolCells;
    },

    /**
     * Method: expandingPoint
     * 展开点
     */
    expandingPoint: function(){
        var symbolCells = [];

        var circle = new Object;
        circle.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        circle.positionPoints = [];
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 20));
        circle.style = {surroundLineFlag: false, fontSize: 12};

        var text = new Object;
        text.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
        text.positionPoints = [];
        text.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        text.textContent = SuperMap.i18n("expandingPointContent");
        text.style = {surroundLineFlag: false, fontSize: 8, fontSizeLimit:true};
        text.style.labelAlign = "cm";

        symbolCells.push(text);
        symbolCells.push(circle);
        return symbolCells;
    },

    /**
     * Method: volleyPoint
     * 齐射点
     */
    volleyPoint: function(){
        var symbolCells = [];

        var circle = new Object;
        circle.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        circle.positionPoints = [];
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 20));
        circle.style = {surroundLineFlag: false, fontSize: 12};

        var text = new Object;
        text.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
        text.positionPoints = [];
        text.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        text.textContent = SuperMap.i18n("volleyPointContent");
        text.style = {surroundLineFlag: false, fontSize: 8, fontSizeLimit:true};
        text.style.labelAlign = "cm";

        symbolCells.push(text);
        symbolCells.push(circle);
        return symbolCells;
    },

    /**
     * Method: standbyPoint
     * 待机点
     */
    standbyPoint_Outer: function(startAnlge,rotateAngle){
        var symbolCells = [];
        var centerPt = new SuperMap.Geometry.Point(0, 0);
        var circlePt = new SuperMap.Geometry.Point(0, 30);
        var radius = 30;
        var stepAngle = 10;
        if(!startAnlge){
            startAnlge = 90;
        }

        //上圆弧
        var upArc = new Object;
        upArc.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        upArc.positionPoints = [];
        for(var i = startAnlge + stepAngle; i < 180-stepAngle+startAnlge; i += stepAngle){
            var pt = SuperMap.Plot.PlottingUtil.findPoint(centerPt, circlePt, radius, i);
            upArc.positionPoints.push(pt);
        }
        upArc.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(upArc);


        //上圆弧箭头
        var pt1 = upArc.positionPoints[upArc.positionPoints.length-1];
        var pt2 = upArc.positionPoints[upArc.positionPoints.length-2];

        var upHeadPt1 = SuperMap.Plot.PlottingUtil.findPoint(pt1, pt2, 0.3*radius, 22.5);
        var upHeadPt2 = SuperMap.Plot.PlottingUtil.findPoint(pt1, pt2, 0.3*radius, -22.5);

        var upHead = new Object;
        upHead.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        upHead.positionPoints = [];
        upHead.positionPoints.push(upHeadPt1);
        upHead.positionPoints.push(pt1.clone());
        upHead.positionPoints.push(upHeadPt2);
        upHead.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(upHead);

        //下圆弧
        var downArc = new Object;
        downArc.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        downArc.positionPoints = [];
        for(var i = 180+stepAngle+startAnlge; i < 360-stepAngle+startAnlge; i += stepAngle){
            var pt = SuperMap.Plot.PlottingUtil.findPoint(centerPt, circlePt, radius, i);
            downArc.positionPoints.push(pt);
        }
        downArc.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(downArc);


        //下圆弧箭头
        var downPt1 = downArc.positionPoints[downArc.positionPoints.length-1];
        var downPt2 = downArc.positionPoints[downArc.positionPoints.length-2];

        var downHeadPt1 = SuperMap.Plot.PlottingUtil.findPoint(downPt1, downPt2, 0.3*radius, 22.5);
        var downHeadPt2 = SuperMap.Plot.PlottingUtil.findPoint(downPt1, downPt2, 0.3*radius, -22.5);

        var downHead = new Object;
        downHead.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        downHead.positionPoints = [];
        downHead.positionPoints.push(downHeadPt1);
        downHead.positionPoints.push(downPt1.clone());
        downHead.positionPoints.push(downHeadPt2);
        downHead.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(downHead);

        for(var  i=0; i< symbolCells.length; i++){

            for(var  j=0; j< symbolCells[i].positionPoints.length; j++){
                symbolCells[i].positionPoints[j].rotate(rotateAngle,centerPt);
            }
        }
        return symbolCells;
    },

    /**
     * Method: standbyPoint
     * 待机点
     */
    standbyPoint_Inner: function(){
        var symbolCells = [];

        var triangle = new Object;
        triangle.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        triangle.positionPoints = [];
        triangle.positionPoints.push(new SuperMap.Geometry.Point(-20,   0));
        triangle.positionPoints.push(new SuperMap.Geometry.Point( 20,  10));
        triangle.positionPoints.push(new SuperMap.Geometry.Point( 20, -10));
        triangle.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(triangle);

        var arrowBody = new Object;
        arrowBody.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        arrowBody.positionPoints = [];
        arrowBody.positionPoints.push(new SuperMap.Geometry.Point(-5,   0));
        arrowBody.positionPoints.push(new SuperMap.Geometry.Point( 17,  0));
        arrowBody.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(arrowBody);

        var arrowHead = new Object;
        arrowHead.type = SuperMap.Plot.SymbolType.POLYLINESYMBOL;
        arrowHead.positionPoints = [];
        arrowHead.positionPoints.push(new SuperMap.Geometry.Point(-2,  1.5));
        arrowHead.positionPoints.push(new SuperMap.Geometry.Point(-5, 0));
        arrowHead.positionPoints.push(new SuperMap.Geometry.Point(-2, -1.5));
        arrowHead.style = {surroundLineFlag: false, fontSize: 12};
        symbolCells.push(arrowHead);

        return symbolCells;
    },

    /**
     * Method: supplyPoint
     * 补给点
     */
    supplyPoint: function(){
        var symbolCells = [];

        var circle = new Object;
        circle.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        circle.positionPoints = [];
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        circle.positionPoints.push(new SuperMap.Geometry.Point(0, 20));
        circle.style = {surroundLineFlag: false, fontSize: 12};

        var text = new Object;
        text.type = SuperMap.Plot.SymbolType.TEXTSYMBOL;
        text.positionPoints = [];
        text.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        text.textContent = SuperMap.i18n("supplyPointContent");
        text.style = {surroundLineFlag: false, fontSize: 8, fontSizeLimit:true};
        text.style.labelAlign = "cm";

        symbolCells.push(text);
        symbolCells.push(circle);
        return symbolCells;
    },

    /**
     * Method: takeoffPoint
     * 起飞点
     */
    takeoffPoint: function(){
        var symbolCells = [];

        var cell = new Object;
        cell.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        cell.positionPoints = [];
        cell.positionPoints.push(new SuperMap.Geometry.Point(-8,  20));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 8,  20));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 8, -10));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 0, -20));
        cell.positionPoints.push(new SuperMap.Geometry.Point(-8, -10));
        cell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(cell);
        return symbolCells;
    },

    /**
     * Method: initialPoint
     * 初始点
     */
    initialPoint: function(){
        var symbolCells = [];

        var cell = new Object;
        cell.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        cell.positionPoints = [];
        cell.positionPoints.push(new SuperMap.Geometry.Point(-15,  11));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 15,  11));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 15, -11));
        cell.positionPoints.push(new SuperMap.Geometry.Point(-15, -11));
        cell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(cell);
        return symbolCells;
    },

    /**
     * Method: visualInitalPoint
     * 可视初始点
     */
    visualInitalPoint: function(){
        var symbolCells = [];

        var cell = new Object;
        cell.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        cell.positionPoints = [];
        cell.positionPoints.push(new SuperMap.Geometry.Point(  0,  10));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 15,   0));
        cell.positionPoints.push(new SuperMap.Geometry.Point(  0, -10));
        cell.positionPoints.push(new SuperMap.Geometry.Point(-15,   0));
        cell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(cell);
        return symbolCells;
    },

    /**
     * Method: weaponLanchPoint
     * 发射点
     */
    lanchPoint: function(){
        var symbolCells = [];

        var cell = new Object;
        cell.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        cell.positionPoints = [];
        cell.positionPoints.push(new SuperMap.Geometry.Point(  0,  15));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 10, -15));
        cell.positionPoints.push(new SuperMap.Geometry.Point(-10, -15));
        cell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(cell);
        return symbolCells;
    },

    /**
     * Method: turningPoint
     * 转弯点
     */
    turningPoint: function(){
        var symbolCells = [];

        var symbolCell = new Object;
        symbolCell.type = SuperMap.Plot.SymbolType.CIRCLESYMBOL;
        symbolCell.positionPoints = [];
        symbolCell.positionPoints.push(new SuperMap.Geometry.Point(0, 0));
        symbolCell.positionPoints.push(new SuperMap.Geometry.Point(0, 15));
        symbolCell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(symbolCell);
        return symbolCells;
    },

    /**
     * Method: aimingPoint
     * 瞄准点
     */
    aimingPoint: function(){
        var symbolCells = [];

        var cell = new Object;
        cell.type = SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL;
        cell.positionPoints = [];
        cell.positionPoints.push(new SuperMap.Geometry.Point(  0, -15));
        cell.positionPoints.push(new SuperMap.Geometry.Point( 10,  15));
        cell.positionPoints.push(new SuperMap.Geometry.Point(-10,  15));
        cell.style = {surroundLineFlag: false, fontSize: 12};

        symbolCells.push(cell);
        return symbolCells;
    },

    /**
     * Method: signText
     * 标牌文字
     */
    signText: function(){

    },

    CLASS_NAME: "SuperMap.Geometry.RouteNodePrimitives"
});

/**
 * Function: SuperMap.Geometry.RouteNodePrimitives.getRouteNodeFeature
 * 根据标号图元解析生成相应的Feature
 *
 * Parameters:
 * type - {Integer} 节点类型
 * map - {<SuperMap.Map>}
 *
 * Returns:
 * {Array(<SuperMap.Feature.Vector>)} 返回相应的Feature。
 */
SuperMap.Geometry.RouteNodePrimitives.getRouteNodeCells = function(type, inner,angle){
    var routeNodePri = new SuperMap.Geometry.RouteNodePrimitives();
    switch(type){
        case SuperMap.Plot.RouteNodeType.RENDEZVOUS:
            return routeNodePri.rendezvousPoint();
        case SuperMap.Plot.RouteNodeType.EXPANDING:
            return routeNodePri.expandingPoint();
        case SuperMap.Plot.RouteNodeType.VOLLEY:
            return routeNodePri.volleyPoint();
        case SuperMap.Plot.RouteNodeType.STANDBY:{
            if(inner){
                return routeNodePri.standbyPoint_Inner();
            }
            else{
                return routeNodePri.standbyPoint_Outer(null,angle);
            }
        }
        case SuperMap.Plot.RouteNodeType.SUPPLY:
            return routeNodePri.supplyPoint();
        case SuperMap.Plot.RouteNodeType.TAKEOFF:
            return routeNodePri.takeoffPoint();
        case SuperMap.Plot.RouteNodeType.INITIAL:
            return routeNodePri.initialPoint();
        case SuperMap.Plot.RouteNodeType.VISUALINITAL:
            return routeNodePri.visualInitalPoint();
        case SuperMap.Plot.RouteNodeType.LANCH:
        case SuperMap.Plot.RouteNodeType.WEAPONLAUNCHPOINT:
            return routeNodePri.lanchPoint();
        case SuperMap.Plot.RouteNodeType.TURNING:
        case SuperMap.Plot.RouteNodeType.COMMONROUTEPOINT:
            return routeNodePri.turningPoint();
        case SuperMap.Plot.RouteNodeType.AIMING:
            return routeNodePri.aimingPoint();
        default:
            return [];
    }
};