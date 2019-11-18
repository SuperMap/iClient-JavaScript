import mapboxgl from 'mapbox-gl';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { ArrayStatistic } from '../../../src/common/util/ArrayStatistic';
import { ColorsPickerUtil } from '../../../src/common/util/ColorsPickerUtil';
import '../../resources/WebMapV5.js';
import img from '../../resources/img/baiduTileTest.png';
import convert from 'xml-js';
import jsonsql from 'jsonsql';
import canvg from 'canvg';

describe('mapboxgl_WebMap', () => {
	var originalTimeout, testDiv;
	var server = 'http://support.supermap.com:8090/iportal/';
	var id = 1788054202;
	beforeEach(() => {
		testDiv = window.document.createElement('div');
		testDiv.setAttribute('id', 'map');
		testDiv.style.styleFloat = 'left';
		testDiv.style.marginLeft = '8px';
		testDiv.style.marginTop = '50px';
		testDiv.style.width = '500px';
		testDiv.style.height = '500px';
		window.document.body.appendChild(testDiv);
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
	});
	afterEach(() => {
		window.document.body.removeChild(testDiv);
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	it('initialize_TIANDITU_VEC', (done) => {
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_VEC1;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, {
	        server: server
	    });

	    setTimeout(() => {
	        expect(datavizWebmap.callBack).toBeUndefined();
	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        var map = datavizWebmap.map;

	        expect(map).not.toBe(null);
					expect(map.getZoom()).toBe(0);
					var center = map.getCenter();
					expect(+center.lat.toFixed(4)).toEqual(4.2149);
					expect(+center.lng.toFixed(4)).toEqual(110);
	        expect(datavizWebmap.mapParams.title).toBe('tianditu');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('resize', done => {
		let options = {
        server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
        if (url.indexOf("map.json") > -1) {
            var mapJson = datavizWebMap_CLOUD;
            return Promise.resolve(new Response(mapJson));
        }
        return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
		setTimeout(() => {
			datavizWebmap.resize();
			done();
		},1000);
	});
	it('setMapId', done => {
    let options = {
        server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
        if (url.indexOf("map.json") > -1) {
            var mapJson = datavizWebMap_CLOUD;
            return Promise.resolve(new Response(mapJson));
        }
        return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
    setTimeout(() => {
			datavizWebmap.setMapId('testID');
			expect(datavizWebmap.mapId).toEqual('testID');
			done();
		},1000);
	});
	it('setWebMapOptions', done => {
		let options = {
      server: server
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
        if (url.indexOf("map.json") > -1) {
            var mapJson = datavizWebMap_CLOUD;
            return Promise.resolve(new Response(mapJson));
        }
        return Promise.resolve();
    });
    var datavizWebmap = new WebMap(id, options);
		setTimeout(() => {
			datavizWebmap.setWebMapOptions({ server: 'http://www.test.com' });
			expect(datavizWebmap.server).toEqual('http://www.test.com/');
			done();
		},1000);
	});
	it('setMapOptions', done => {
		spyOn(FetchRequest, 'get').and.callFake(url => {
			if (url.indexOf('map.json') > -1) {
				var mapJson = datavizWebMap_TIANDITU_VEC1;
				return Promise.resolve(new Response(mapJson));
			}
			return Promise.resolve();
		});
		var datavizWebmap = new WebMap(id, {
			server: server
		});
		let mapOptions = {
			center: [0, 0],
			zoom: 1,
			minZoom: 10,
			maxZoom: 12,
			isWorldCopy: true
		};
		setTimeout(() => {
			datavizWebmap.setMapOptions(mapOptions);
			done();
		},1000);
	});
	it('initialize_TIANDITU_IMAGE', (done) => {
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_IMAGE;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });

	    let options = {
	        server: server,
	    };
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(1);
	        expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
	        expect(datavizWebmap.mapParams.description).toBe('This is a image');
	        done();
	    }, 1000)
	});

	it('initialize_TIANDITU_TER', (done) => {
	    let options = {
	        server: server
	    }
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_TER;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {
	        expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
	        done();
	    }, 1000)
	});

	it('initialize_OPENSTREET', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_OPENSTREET;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(1);
	        // expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
	        expect(datavizWebmap.mapParams.title).toBe('openstreet');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('initialize_FAILD', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        return Promise.reject();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        done();
	    }, 1000)
	});

	it('initialize_CLOUD', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_CLOUD;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(0);
	        //expect(map.getCenter()).toEqual([0, -7.081154551613622e-10]);
	        expect(datavizWebmap.mapParams.title).toBe('GAOD');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('initialize_GOOGLE', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_GOOGLE;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(0);
	        //expect(map.getCenter()).toEqual([0, -7.081154551613622e-10]);
	        expect(datavizWebmap.mapParams.title).toBe('google_map');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	// 暂时不写
	it('initialize_UNDEFIED', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_UNDEFIED;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {
	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        expect(datavizWebmap.mapParams.title).toBe('undefinedMap');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Vector_Basis', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Theme_base;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(csvData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);
	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(6);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
	        expect(datavizWebmap.mapParams.title).toBe('theme_base');
	        expect(datavizWebmap.mapParams.description).toBe('base style');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Vector_Basis_Line', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Theme_base_Line;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(geojsonData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);
	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(9);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.39560889343755, 39.93917738600353));
	        expect(datavizWebmap.mapParams.title).toBe('Line_basis');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Vector_IMAGE', (done) => {
	    let options = {
	        server: server
	    };

	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Image;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(geojsonData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);
	    datavizWebmap.on('mapinitialized', () => {
	        spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
	            let img = new Image();
	            img.onload = () => {
	                isLoaded = true;
	                load.emit(url);
	            };
	            img.src = url;
	            cb(img)
	        })
	    })

	    setTimeout(() => {
	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        expect(datavizWebmap.mapParams.title).toBe('Image');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(6);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
	        done();
	    }, 5000)
	});

	it('createThemeLayer_Unique', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Unique;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(xlsData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(11);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.32442464111325, 39.98897628932847));
	        expect(datavizWebmap.mapParams.title).toBe('Unique');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Range', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Range;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(geojsonData));
	        }
	        return Promise.resolve();
	    });
	    spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
	        return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
	    });
	    var datavizWebmap = new WebMap(id, options);
	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(9);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.40097798513068, 39.900378604132094));
	        expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Heat', (done) => {
	    //插件里面i未定义报错
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Heat;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(csvData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(6);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
	        expect(datavizWebmap.mapParams.title).toBe('Heat');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_Marker', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_Marker;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(markerData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(1);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(8.437500000000002, -7.710991655433243));
	        expect(datavizWebmap.mapParams.title).toBe('标注图层');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	xit('createThemeLayer_SUPERMAP_MAP_datasource', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_RestMap1;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    spyOn(FetchRequest, 'post').and.callFake((url) => {
	        if (url.indexOf('queryResults.json') > -1) {
	            return Promise.resolve(new Response(supermapRestData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(8);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.46675928388001, 40.15816517545865));
	        expect(datavizWebmap.mapParams.title).toBe('RestMap');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_SUPERMAP_MAP', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_RestMap;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });

	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(6);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.872606854085, 40.11626853496025));
	        expect(datavizWebmap.mapParams.title).toBe('RestMap');
	        expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');
	        done();
	    }, 1000)
	});

	it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_RestData;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    spyOn(FetchRequest, 'post').and.callFake((url) => {
	        if (url === 'http://192.168.12.27:8091/iserver/services/data-jingjin/rest/data/featureResults.json?returnContent=true&fromIndex=0&toIndex=100000') {
	            return Promise.resolve(new Response(supermapData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map.getZoom()).toBe(8);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.8995771532053, 39.700527641334965));
	        expect(datavizWebmap.mapParams.title).toBe('RestData');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('WMS', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_WMS;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();

	        var map = datavizWebmap.map;
	        expect(map).not.toBe(null);
	        expect(map.getZoom()).toBe(0);
	        expect(map.getCenter()).toEqual(new mapboxgl.LngLat(0, 0));
	        expect(datavizWebmap.mapParams.title).toBe('wms');
	        expect(datavizWebmap.mapParams.description).toBe('');
	        done();
	    }, 1000)
	});

	it('changeWeight', (done) => {
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_VEC;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, {});
	    var features = [];
	    let feature = {
	        "type": "Feature",
	        "geometry": {
	            "type": "Point",
	            "coordinates": [116, 39]
	        },
	        "properties": {
	            // 'field': 10
	        }
	    };
	    features.push(feature);
	    setTimeout(() => {
	        datavizWebmap.fieldMaxValue = {
	            field: 10
	        };
	        datavizWebmap._changeWeight(features, 'field');
	        // expect(feature.get('weight')).toBe(1);
	        done();
	    }, 1000)
	});

	it('getRangeStyleGroup', (done) => {
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_VEC;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
	        return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
	    });
	    var datavizWebmap = new WebMap(id, {
	        server: server
	    });
	    setTimeout(() => {
	        var params = '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
	        var features = [];
	        let feature = {
	            "type": "Feature",
	            "geometry": {
	                "type": "Point",
	                "coordinates": [116, 39]
	            },
	            "properties": {
	                'field': 10
	            }
	        };
	        features.push(feature);
	        datavizWebmap._getRangeStyleGroup(JSON.parse(params), features);
	        expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
	        done();
	    }, 1000)
	});

	it('dashStyle', (done) => {
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_VEC1;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, {
	        server: server
	    });
	    let style = [{ 'strokeDashstyle': 'solid' }, { 'strokeDashstyle': 'dot' }, { 'strokeDashstyle': 'dashdot' }, { 'strokeDashstyle': 'dash' }, { 'strokeDashstyle': '' }, { 'strokeDashstyle': 'longdash' }, { 'strokeDashstyle': 'longdashdot' }]
	    expect(datavizWebmap._dashStyle(style[0]).length).toBe(0);
	    expect(datavizWebmap._dashStyle(style[1]).length).toBe(2);
	    expect(datavizWebmap._dashStyle(style[2]).length).toBe(4);
	    datavizWebmap._dashStyle(style[4])
	    expect(datavizWebmap._dashStyle(style[3]).length).toBe(2);
	    expect(datavizWebmap._dashStyle(style[5]).length).toBe(2);
	    expect(datavizWebmap._dashStyle(style[6]).length).toBe(4);
	    done();
	})
	it('vector_svg', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_SVG1;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(geojsonData));
	        }
	        return Promise.resolve();
	    });

	    var datavizWebmap = new WebMap(id, options);
	    datavizWebmap.on('mapinitialized', () => {
	        spyOn(datavizWebmap, '_getCanvasFromSVG').and.callFake((svg_url, svgDiv, cb) => {
	            let canvas = document.createElement('canvas');
	            canvas.width = '150px';
	            cb(canvas);
	        })
	        spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
	            let img = new Image();
	            img.onload = () => {
	                isLoaded = true;
	                load.emit(url);
	            };
	            img.src = url;
	            cb(img)
	        })
	    })
	    setTimeout(() => {
	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
          done();
	    }, 1000)
	})
	it('vector_symbol', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_symbol;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('content.json?') > -1) {
	            return Promise.resolve(new Response(geojsonData));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
          done();
	    }, 1000)
	})
	it('_getFiterFeatures', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_TIANDITU_VEC1;
	            return Promise.resolve(new Response(mapJson));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);
	    datavizWebmap._getFiterFeatures("SmID>20", geojsonData)
	    let feature = '[{ "type" : "Feature", "properties" : { "name" : "aaaa" }, "geometry" : { "type" : "Polygon", "coordinates" : [ [[92.6806640625, 35.9957853864], [92.548828125, 29.8025179058], [99.9755859375, 33.541394669], [92.6806640625, 35.9957853864]], [[110.830078125, 34.5246614718], [103.6326255336, 36.859947123], [109.7218666539, 40.599259339], [110.830078125, 34.5246614718]] ] } } ]'
	    datavizWebmap._handleMultyPolygon(JSON.parse(feature));
	    setTimeout(() => {

	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        done();
	    }, 1000)
	})
	it('datavizWebMap_WMTS', (done) => {
	    let options = {
	        server: server
	    };
	    spyOn(FetchRequest, 'get').and.callFake((url) => {
	        if (url.indexOf("map.json") > -1) {
	            var mapJson = datavizWebMap_WMTS1;
	            return Promise.resolve(new Response(mapJson));
	        } else if (url.indexOf('wmts') > -1) {
	            return Promise.resolve(new Response(wmtsInfo2));
	        }
	        return Promise.resolve();
	    });
	    var datavizWebmap = new WebMap(id, options);

	    setTimeout(() => {
	        expect(datavizWebmap.credentialKey).toBeUndefined();
	        expect(datavizWebmap.credentialValue).toBeUndefined();
	        done();
	    }, 1000)
	})
});
