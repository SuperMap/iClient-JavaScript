/**
 * 几何路径类
 *
 * 路径可由任意数目的图形（子路径）组成。每一图形都是由一系列相互连接的直线和曲线或几何形状基元构成的。图形的起始点是相互连接的
 * 一系列直线和曲线中的第一点。终结点是该序列中的最后一点。几何形状基元的起始点和终结点都是由基元规范定义的。
 * 路径表示一系列相互连接的直线和曲线。无法继承此类。
 * 元素是路径的基本组成部分,包括:
 * MoveToElement,LineToElement,CurveToElement,CurveToDataElement
 */
SuperMap.Plot.Path2D = new SuperMap.Class({

    m_pData: null,//UGPath2D的数据(路径中的元素)

    initialize: function (x, y, type) {
        if (x) {
            this.m_x = x;
            this.m_y = y;
            this.m_type = type;
        } else {
            m_pData = null;
        }
    },

    MoveTo: function (position) {
        ////////		//  写时复制操作
        this.ensureData();   //  确认是否需要写时复制，如果需要,就开辟新内存空间
        this.detach();		//  如果需要复制,就复制共享数据到新开辟的内存空间
        /////////		//      这两个函数总是成对出现

        var d = this.getDataPtr();
        // if(d.elements.length == 0){
        //     return;
        // }
        d.require_StartNewFigure = false;
        if (d.elements[d.elements.length - 1].GetType() == SuperMap.Plot.Path2D.ElementType.MoveToElement) {
            d.elements[d.elements.length - 1].SetPosition(position.x, position.y);
        } else {
            var elm = new SuperMap.Plot.Path2D.Element(position.x, position.y, SuperMap.Plot.Path2D.ElementType.MoveToElement);
            d.elements.push(elm);
        }
        d.cStart = d.elements.length - 1;
    },

    LineTo: function (position) {
        ////////		//  写时复制操作
        this.ensureData();   //  确认是否需要写时复制，如果需要,就开辟新内存空间
        this.detach();		//  如果需要复制,就复制共享数据到新开辟的内存空间
        /////////		//      这两个函数总是成对出现

        var d = this.getDataPtr();
        // if(d.elements.length == 0){
        //     return;
        // }

        d.MaybeStartNewFigure();

        if (d.elements[d.elements.length - 1].GetX() == position.x
            && d.elements[d.elements.length - 1].GetY() == position.y) {
            return;
        }

        var elm = new SuperMap.Plot.Path2D.Element(position.x, position.y, SuperMap.Plot.Path2D.ElementType.LineToElement);
        d.elements.push(elm);
    },

    CurveTo: function (c1, c2, end) {
        ////////		//  写时复制操作
        this.ensureData();   //  确认是否需要写时复制，如果需要,就开辟新内存空间
        this.detach();		//  如果需要复制,就复制共享数据到新开辟的内存空间
        /////////		//      这两个函数一般成对出现

        var d = this.getDataPtr();
        // if(d.elements.length == 0){
        //     return;
        // }
        if (d.elements[d.elements.length - 1].GetX() == c1.x
            && d.elements[d.elements.length - 1].GetY() == c1.y
            && c1.x == c2.x && c1.y == c2.y && c2.x == endPoint.x && c2.y == endPoint.y) {
            return;
        }

        d.MaybeStartNewFigure();

        var ce1 = new SuperMap.Plot.Path2D.Element(c1.x, c1.y, SuperMap.Plot.Path2D.ElementType.CurveToElement);
        var ce2 = new SuperMap.Plot.Path2D.Element(c2.x, c2.y, SuperMap.Plot.Path2D.ElementType.CurveToDataElement);
        var ee = new SuperMap.Plot.Path2D.Element(end.x, end.y, SuperMap.Plot.Path2D.ElementType.CurveToDataElement);
        d.elements.push(ce1);
        d.elements.push(ce2);
        d.elements.push(ee);
    },

    CubicTo: function (c1, c2, endPoint) {
        ////////		//  写时复制操作
        this.ensureData();   //  确认是否需要写时复制，如果需要,就开辟新内存空间
        this.detach();		//  如果需要复制,就复制共享数据到新开辟的内存空间
        /////////		//      这两个函数一般成对出现

        var d = this.getDataPtr();
        // if(d.elements.length == 0){
        //     return;
        // }
        if (d.elements[d.elements.length - 1].GetX() == c1.x
            && d.elements[d.elements.length - 1].GetY() == c1.y
            && c1.x == c2.x && c1.y == c2.y && c2.x == endPoint.x && c2.y == endPoint.y) {
            return;
        }

        d.MaybeStartNewFigure();

        var ce1 = new SuperMap.Plot.Path2D.Element(c1.x, c1.y, SuperMap.Plot.Path2D.ElementType.CurveToElement);
        var ce2 = new SuperMap.Plot.Path2D.Element(c2.x, c2.y, SuperMap.Plot.Path2D.ElementType.CurveToDataElement);
        var ee = new SuperMap.Plot.Path2D.Element(endPoint.x, endPoint.y, SuperMap.Plot.Path2D.ElementType.CurveToDataElement);
        d.elements.push(ce1);
        d.elements.push(ce2);
        d.elements.push(ee);
    },

    // 把Path2D转换为一系列的多边形,Path2D中的每个子路径都转换为一个多边形。
    // 参数:
    //  [out]subPathPolygons
    //  是把Path2D转换为多边形后的数组,数组中的每个UGPoint2Ds都是一个多边形(的所有节点)。
    // 返回值:
    //   UGbool, 如果转换成功，返回true; 转换失败，返回false
    ToSubPathPolygons: function (flatCurves) {
        var tmpEX, tmpEY;
        var data = this.getDataPtr();
        if (this.IsEmpty()) {
            return false;
        }

        var current = [];
        var nElement = this.GetElementCount();
        for (var i = 0; i < nElement; i++) {
            var e = data.elements[i];
            switch (e.GetType()) {
                case SuperMap.Plot.Path2D.ElementType.MoveToElement:
                {
                    if (current.length > 1) {
                        flatCurves.push(current);
                    }
                    current = [];
                    tmpEX = e.GetX();
                    tmpEY = e.GetY();
                    current.push(new SuperMap.Geometry.Point(tmpEX, tmpEY));
                }
                    break;
                case SuperMap.Plot.Path2D.ElementType.LineToElement:
                {
                    tmpEX = e.GetX();
                    tmpEY = e.GetY();
                    current.push(new SuperMap.Geometry.Point(tmpEX, tmpEY));
                }
                    break;
                case SuperMap.Plot.Path2D.ElementType.CurveToElement:
                {
                    if (data.elements[i + 1].GetType() != SuperMap.Plot.Path2D.ElementType.CurveToDataElement
                        || data.elements[i + 1].GetType() != SuperMap.Plot.Path2D.ElementType.CurveToDataElement) {

                    }
                    var tmpX1 = data.elements[i - 1].GetX();
                    var tmpY1 = data.elements[i - 1].GetY();
                    var tmpX2 = e.GetX();
                    var tmpY2 = e.GetY();
                    var tmpX3 = data.elements[i + 1].GetX();
                    var tmpY3 = data.elements[i + 1].GetY();
                    var tmpX4 = data.elements[i + 2].GetX();
                    var tmpY4 = data.elements[i + 2].GetY();

                    for (var t = 0.0; t <= 1.0; t += 0.03125) {
                        var t2 = t * t;
                        var t3 = t2 * t;
                        var a = 1 - 3 * t + 3 * t2 - t3;
                        var b = 3 * (t - 2 * t2 + t3);
                        var c = 3 * (t2 - t3);
                        var d = t3;
                        current.push(new SuperMap.Geometry.Point(a * tmpX1 + b * tmpX2 + c * tmpX3 + d * tmpX4, a * tmpY1 + b * tmpY2 + c * tmpY3 + d * tmpY4));
                    }
                    i += 2;
                }
                    break;
                case SuperMap.Plot.Path2D.ElementType.CurveToDataElement:
                    //assert(!"MGSPainterPath::toSubpathPolygons(), bad element type");
                    break;
            }
        }
        if (current.length > 1) {
            flatCurves.push(current);
        }
        return true;
    },

    ensureData: function () {
        if (m_pData == null) {
            this.ensureData_helper();
        }
    },

    ensureData_helper: function () {
        var data = new SuperMap.Plot.Path2D.UGPath2DData();
        var e = new SuperMap.Plot.Path2D.Element(0, 0, SuperMap.Plot.Path2D.ElementType.MoveToElement);
        data.elements.push(e);
        if (m_pData != null && !SuperMap.Plot.Path2D.mtDeRef(m_pData.ref)) {
            m_pData = null;
        }
        m_pData = data;
    },

    detach: function () {
        if (m_pData.ref != 1) {
            this.detach_helper();
        }
        this.setBoundsDirty(true);
    },

    detach_helper: function () {
        var data = new SuperMap.Plot.Path2D.UGPath2DData();
        if (m_pData != null && !SuperMap.Plot.Path2D.mtDeRef(m_pData.ref)) {
            m_pData = null;
        }
        m_pData = data;
    },

    setBoundsDirty: function (dirty) {
        this.getDataPtr().isBoundsDirty = dirty;
    },

    getDataPtr: function () {
        return m_pData;
    },

    IsEmpty: function () {
        if (m_pData == null) {//元素容器未初始化时为空路径
            return true;
        }
        var elementCount = m_pData.elements.length;//元素个数
        if (elementCount == 0) {//没有元素也是空路径
            return true;
        }
        if (elementCount == 1) {//唯一元素为MoveToElement也是空路径
            if (m_pData.elements[0].GetType() == SuperMap.Plot.Path2D.ElementType.MoveToElement) {
                return true;
            }
        }
        return false;//其他情况都不是空路径
    },

    GetElementCount: function () {
        return (m_pData != null) ? m_pData.elements.length : 0;
    },

    CLASS_NAME: "SuperMap.Plot.Path2D"
});

/**
 * 填充法则
 * 指定如何填充闭合路径的内部。
 *
 * 应用程序使用以下两个填充模式之一填充路径的内部：交替或环绕。该模式确定如何填充和剪辑闭合图形的内部。
 *
 * 默认模式是
 * OddEvenFill。为在交替模式中确定闭合图形的内部，绘制一条从路径中的任意起始点到明显位于路径外的某一点的直线。如果该直线跨过奇数个路径段，则起始点位于闭
 * 合区域内并且因此是填充或剪辑区域的一部分。如果该直线跨过偶数个路径段，则表明该起始点不位于要被填充或剪辑的区域内。通过使用直线将最后一点与图形的第一点相连接，填
 * 充或剪辑开放的图形。
 *
 * Winding
 * 模式考虑路径段在每个交叉处的方向。它为每一顺时针交叉加一，为每一逆时针交叉减一。如果结果非零，则认为该点在填充或剪辑区域的内部。计数为零意味着该点在填充或剪辑区
 * 域的外部。
 *
 * 基于所绘制的图形的各片断的顺序判断一个图形是顺时针还是逆时针的。
 *
 */
SuperMap.Plot.Path2D.FillRule = {
    OddEvenFill: 0,		//指定交替填充模式。
    WindingFill: 1		//指定环绕填充模式。
};

/**
 * 元素类型
 */
SuperMap.Plot.Path2D.ElementType = {
    MoveToElement: 0,		//移动到元素,会开始一个新子路径
    LineToElement: 1,		//直线连接元素
    CurveToElement: 2,		//曲线连接元素
    CurveToDataElement: 3	//曲线连接元素的附加数据
};

/**
 * Path元素类
 * 元素是某种类型的节点,连接成Path2D中的子路径
 */
SuperMap.Plot.Path2D.Element = new SuperMap.Class({
    m_x: 0.0,
    m_y: 0.0,
    m_type: 0,

    initialize: function (x, y, type) {
        this.m_x = x;
        this.m_y = y;
        this.m_type = type;
    },

    GetX: function () {
        return this.m_x;
    },

    GetY: function () {
        return this.m_y;
    },

    GetType: function () {
        return this.m_type;
    },

    GetPosition: function () {
        return SuperMap.Geometry.Point(this.m_x, this.m_y);
    },

    SetPosition: function (ax, ay) {
        this.m_x = ax;
        this.m_y = ay;
    },

    GetType: function () {
        return this.m_type;
    },

    SetType: function (atype) {
        this.m_type = atype;
    },

    IsCurveTo: function () {
        return this.m_type == SuperMap.Plot.Path2D.ElementType.CurveToElement;
    },

    IsLineTo: function () {
        return this.m_type == SuperMap.Plot.Path2D.ElementType.LineToElement;
    },

    IsMoveTo: function () {
        return this.m_type == SuperMap.Plot.Path2D.ElementType.MoveToElement;
    },

    Equal: function (element) {
        return SuperMap.Plot.PlottingUtil.equalFuzzy(this.m_x, element.m_x, 1E-10)
            && SuperMap.Plot.PlottingUtil.equalFuzzy(this.m_y, element.m_y, 1E-10)
            && this.m_type == element.m_type;
    },

    clone: function () {
        return new SuperMap.Plot.Path2D.Element(this.m_x, this.m_y, this.m_type);
    },

    CLASS_NAME: "SuperMap.Plot.Path2D.Element"
});


/**
 *  二维混合路径的私有数据包装类
 */
SuperMap.Plot.Path2D.UGPath2DData = new SuperMap.Class({
    cStart: 0,					    //当前子路径的起始元素索引
    fillRule: 0,                    //路径的填充规则
    require_StartNewFigure: false,	//功能还未知[hl-2009-3-19]待补充
    isBoundsDirty: false,			//是否需要重新计算bounds缓存的标志,//  如果是true表示UMPath2D的bounds已经改变,需要重新计算了!
    bounds: null,				    //外接矩形缓存
    ref: 1,                         //写时复制技术:数据的引用计数
    elements: null,                //储存UMPath2D的元素数据

    initialize: function (other) {
        if (other) {
            this.cStart = other.cStart;
            this.fillRule = other.fillRule;
            this.require_StartNewFigure = other.require_StartNewFigure;
            this.isBoundsDirty = other.isBoundsDirty;
            this.bounds = SuperMap.Bounds(other.bounds.left, other.bounds.bottom, other.bounds.right, other.bounds.top);
            this.ref = 1;
            this.elements = [];
            for (var i = 0; i < other.elements.length; i++) {
                this.elements.push(other.elements[i].clone());
            }
        } else {
            this.ref = 1;
            this.bounds = SuperMap.Bounds(0.0, 0.0, 0.0, 0.0);
            this.elements = [];
        }
    },

    IsClosed: function () {
        var first = this.elements[this.cStart];
        var last = this.elements[this.elements.length - 1];
        return (first.GetX() == last.GetX()) && (first.GetY() == last.GetY());
    },

    Close: function () {
        this.require_StartNewFigure = true;
        var first = this.elements[this.cStart];
        var last = this.elements[this.elements.length - 1];
        if (first != last) {
            if (first.Equal(last)) {
                last.SetPosition(first.GetX(), first.GetY());
            } else {
                this.elements.push(new SuperMap.Plot.Path2D.Element(first.GetX(), first.GetY(), SuperMap.Plot.Path2D.ElementType.LineToElement));
            }
        }
    },

    MaybeStartNewFigure: function () {
        if (this.require_StartNewFigure) {
            var e = this.elements[this.elements.length - 1].clone();
            e.SetType(SuperMap.Plot.Path2D.ElementType.MoveToElement);
            this.elements.push(e);
            this.require_StartNewFigure = false;
        }
    },

    CLASS_NAME: "SuperMap.Plot.Path2D.UGPath2DData"
});

SuperMap.Plot.Path2D.mtRef = function (i) {
    return (++i != 0);
};

SuperMap.Plot.Path2D.mtDeRef = function (i) {
    return (--i != 0);
};

