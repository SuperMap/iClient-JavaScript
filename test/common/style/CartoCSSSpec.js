import {CartoCSS} from '../../../src/common/style/CartoCSS';

describe('CartoCSS', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("getShaders_zoom", () => {
        var cartoCSS = new CartoCSS(
            "#world[zoom=9] {\n" +
            "  polygon-fill: #000;\n" +
            "\n" +
            "  [zoom > 9] {\n" +
            "    polygon-fill: #FFF;\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "#world[zoom<4] {\n" +
            "  polygon-fill: #FF0;\n" +
            "}\n" +
            "\n" +
            "#world[zoom > 9][zoom <= 11] {\n" +
            "  polygon-fill: #DDD;\n" +
            "}\n" +
            "\n" +
            "#countries {\n" +
            "  [zoom=1] { line-width:2; }\n" +
            "  [zoom=2] { line-width:1.5; }\n" +
            "  [zoom=3], [zoom=4] { line-width:1.25; }\n" +
            "  [zoom=5] { line-width:1; }\n" +
            "  [zoom=6] { line-width:0.9; }\n" +
            "  [zoom=7] { line-width:0.8; }\n" +
            "  [zoom=8] { line-width:0.7; }\n" +
            "  [zoom=9] { line-width:.6; }\n" +
            "  [zoom=10] { line-width:.5; }\n" +
            "  [zoom=11] { line-width:.4; }\n" +
            "  [zoom=12] { line-width:.3; }\n" +
            "  [zoom>12] { line-width:.25; }\n" +
            "}" +
            "#world_a {\n" +
            "    [zoom=9] { marker-height: 4; }\n" +
            "    [zoom>6][zoom<10] { marker-height: 3; }\n" +
            "    [zoom>3][zoom<7] { marker-height: 2; }\n" +
            "    [zoom<4] { marker-height: 1; }\n" +
            "}"
        );
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
    it("getShaders_class", () => {
        var cartoCSS = new CartoCSS(
            ".baz .bar {}\n" +
            ".foo {}\n" +
            ".bar {}\n" +
            ".foo .bar .baz {}\n" +
            ".baz {}\n" +
            ".baz .foo {}\n" +
            ".foo .baz {}" +
            "#countries .countries .two {\n" +
            "  polygon-fill:#0FF;\n" +
            "}\n" +
            "\n" +
            "#countries, #world {\n" +
            "  polygon-fill:#F0F;\n" +
            "  polygon-opacity: 0.5;\n" +
            "}\n" +
            "\n" +
            "\n" +
            "#countries, #countries.foo.bar.baz {}" +
            "Map {\n" +
            "  buffer-size: 256;\n" +
            "}\n" +
            "#world[NAME='Canada'],\n" +
            "#countries {\n" +
            "  polygon-fill: #eee;\n" +
            "  line-color: #ccc;\n" +
            "  line-width: 1;\n" +
            "\n" +
            "  .new {\n" +
            "    polygon-fill: #CCC;\n" +
            "  }\n" +
            "\n" +
            "  .new[zoom > 5] {\n" +
            "    line-width:0.5;\n" +
            "\n" +
            "    [NAME='United States'] {\n" +
            "      polygon-fill:#AFC;\n" +
            "    }\n" +
            "  }\n" +
            "}"
        );
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
    it("getShaders_basic", () => {
        var cartoCSS = new CartoCSS(
            "#world[NAME='United States'] {\n" +
            "  polygon-fill:#F00;\n" +
            "  marker-fill: fadeout(#000, 50%);\n" +
            "  [BLUE='red'] {\n" +
            "  \n" +
            "  }\n" +
            "  \n" +
            "}\n" +
            "#world {\n" +
            " marker-file:url(\"\");" +
            "polygon-pattern-file: url('http://a.tile.openstreetmap.org/0/0/0.png');" +
            "  text-name: \"[NAME]\";\n" +
            "  text-size: 11;\n" +
            "}" +
            "#landcover {\n" +
            "}" +
            "@us: 'US';\n" +
            "@thing: [COUNTRY];\n" +
            "\n" +
            "#world[COUNTRY=@us] {\n" +
            "  polygon-fill: #000;\n" +
            "}\n" +
            "#world {\n" +
            "  image-filters: blur(), sharpen(), agg-stack-blur(2, 2);\n" +
            "  comp-op: src-in;\n" +
            "}" +
            "#world {\n" +
            "  text-size: 11 % 2;\n" +
            "}\n" +
            "#world {\n" +
            "  raster-opacity:1;\n" +
            "  raster-scaling:bilinear;\n" +
            "  raster-colorizer-default-mode: linear;\n" +
            "  raster-colorizer-default-color: transparent;\n" +
            "}\n" +
            "#world[zoom=9] {\n" +
            "  polygon-fill: #000;\n" +
            "\n" +
            "  [zoom > 9] {\n" +
            "    polygon-fill: #FFF;\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "#landcover_a {\n" +
            "   ::a {\n" +
            "      //polygon-fill: #aacbaf;\n" +
            "   }\n" +
            "   ::b {\n" +
            "      // marker-width:4;\n" +
            "   }\n" +
            "}" +
            "#landcover_b {\n" +
            "  ::foo {\n" +
            "  }\n" +
            "}");
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
    it("getShaders_extends", () => {
        var cartoCSS = new CartoCSS(
            "        /*中国除外的其他国家的图层*/\n" +
            "        #Countries_World_1{" +
            "        text-placement-type:simple;" +
            "        text-placements:\"E,NE,SE,W,NW,SW\";" +
            "        text-name:\"[COUNTRY]\";" +
            "        text-placement-type:dummy;" +
            "        text-face-name:\"微软雅黑\";" +
            "        text-size:18;" +
            "        text-fill:rgba(63,63,63,1);" +
            "        text-opacity:1;" +
            "        text-size-fixed:true;" +
            "        text-halo-fill:rgba(255,255,255,1);" +
            "        text-halo:true;" +
            "        text-halo-radius:1;" +
            "        text-vertical-alignment:middle;" +
            "        text-horizontal-alignment:middle;" +
            "        }\n" +
            "        #continent_T_World{" +
            "        marker-width:9.070866141732283;" +
            "        marker-height:9.070866141732283;" +
            "        marker-fill:rgba(13,80,143,1);" +
            "        marker-type:ellipse;" +
            "        polygon-opacity:1.0;" +
            "        polygon-pattern-opacity:1.0;" +
            "        }\n" +
            "        #Railway_A___Road::a{\n" +
            "        line-width:2.5;\n" +
            "        }\n" +
            "        #Railway_A___Road::b{\n" +
            "        line-dasharray:18,18;\n" +
            "        line-width:1.5;\n" +
            "        }\n" +
            "        #layer {\n" +
            "        image-filters:invert();\n" +
            "        image-filters-inflate:true;\n" +
            "        direct-image-filters:invert();\n" +
            "        }\n" +
            "        #World_Division_pl___China{\n" +
            "        image-filters: blur(), sharpen(), agg-stack-blur(2, 2);\n" +
            "        line-width:1;\n" +
            "        }");
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
    it("getShaders_fillValues", () => {
        var cartoCSS = new CartoCSS(
            "        #World_Continent_pl___China[zoom >1.3502381658248012E-8][population>1000000]{\n" +
            "        [Type>=100001] {line-width: 4;}[Type<=10000]  {line-width: 2;}[Type=99999] {line-dasharray: 4,4;}[Type!=50000] {line-dasharray: 4,4;}" +
            "        [Type>50000] {line-dasharray: 4,4;}[Type<60000] {line-dasharray: 4,4;}\n " +
            "        }\n" +
            "        #Hydside_Area_pl___Hydside[zoom <1.3502381658248012E-8][population<1000000]{\n" +
            "        point-file:url(SYMBOLMARKER__Capitals_World#1__29__29__true__1052460277.png);" +
            "        }\n" +
            "        #China_Province_pl___China[zoom =1.3502381658248012E-8][population=1000000]{\n" +
            "        line-color:rgba(0,0,0,0);\n" +
            "        }\n" +
            "        #China_Provinces_L___China400[zoom >1.3502381658248012E-8][population<1000000]{\n" +
            "        line-dasharray:10,10;\n" +
            "        line-width:1;\n" +
            "        }\n" +
            "       #Countries_World_2{" +
            "        [\\\"ColorID\\\"=1]" +
            "        {line-color:rgba(199,207,247,1);}" +
            "        [\\\"ColorID\\\"=2]" +
            "        {line-color:rgba(193,227,201,1)}" +
            "        [\\\"ColorID\\\"=3]" +
            "        {line-color:rgba(247,209,197,1);}" +
            "        [\\\"ColorID\\\"=4]" +
            "        {line-color:rgba(247,231,197,1);}}");
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
    it("getShaders_Color", () => {
        var cartoCSS = new CartoCSS("#world {\n" +
            "  name/line-color: green;\n" +
            "  hex-3/line-color: #BED;\n" +
            "  hex-6/line-color: #DEADBE;\n" +
            "  @waterColor:rgb(208,221,238);\n" +
            "  @roadColora:rgb(0,0,0);\n" +
            "  @roadColorb:rgb(255,255,255);\n" +
            "  @provinceLineColor:#ddd;\n" +
            "  rgb/line-color: rgb(123, 45, 67);\n" +
            "  rgba/line-color: rgba(123, 45, 67, 89%);\n" +
            "  rgba-d/line-color: rgba(123, 45, 67, .89);\n" +
            "  hsl/line-color: hsl(123, 45%, 67%);\n" +
            "  hsl-d/line-color: hsl(123, .45, .67);\n" +
            "  hsla/line-color: hsla(123, 45%, 67%, 89%);\n" +
            "  hsla-d/line-color: hsla(123, 45%, 67%, .89);\n" +
            "  hsl-darken/line-color: darken(hsl(209, 81%, 64%), 10%);\n" +
            "  hsl-lighten/line-color: lighten(hsl(209, 81%, 64%), 10%);\n" +
            "  hsl-saturate/line-color: saturate(hsl(209, 81%, 64%), 10%);\n" +
            "  hsl-desaturate/line-color: desaturate(hsl(209, 81%, 64%), 10%);\n" +
            "  hsl-spin/line-color: spin(hsl(209, 81%, 64%), 10);\n" +
            "  hsl-fadein/line-color: fadein(hsla(209, 81%, 64%, 80%), 10%);\n" +
            "  hsl-fadeout/line-color: fadeout(hsla(209, 81%, 64%, 80%), 10%);\n" +
            "  hsl-greyscale/line-color: greyscale(hsl(209, 81%, 64%));\n" +
            "  mix/line-color: mix(hsl(209, 81%, 64%), hsl(109, 81%, 64%), 20%);\n" +
            "  mix2/line-color: mix(#5ba2a2, #0080ff, 50%);\n" +
            "  mix3/line-color: mix(#ff0000, #00ff00, 0%);\n" +
            "  mix4/line-color: mix(#ff0000, #00ff00, 100%);\n" +
            "  mix5/line-color: mix(rgba(255, 0, 0, 0.2), rgba(0, 255, 0, 0.8), 20%);\n" +
            "  multiply/line-color: #f8f4f0 * 0.8;\n" +
            "  divide/line-color: #f8f4f0 / 1.2;\n" +
            "  add/line-color: #f8f4f0 + 0.8;\n" +
            "  multiply2/line-color: #252525 * #020202;\n" +
            "  divide2/line-color: #f8f4f0 / #83b7eb;\n" +
            "  add2/line-color: #f8f4f0 + #020202;\n" +
            "  subtract3/line-color: lightness(rgb(208,221,238));\n" +
            "  components/line-color: hsl(hue(hsl(209, 81%, 64%)), saturation(hsl(209, 81%, 64%)), lightness(hsl(209, 81%, 64%)));\n" +
            "}");
        cartoCSS.getShaders();
        cartoCSS.destroy();
    });
});