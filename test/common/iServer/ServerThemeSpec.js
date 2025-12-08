import {ServerTheme} from '../../../src/common/iServer/ServerTheme';
import {ThemeLabel} from '../../../src/common/iServer/ThemeLabel';
import {ThemeUnique} from '../../../src/common/iServer/ThemeUnique';
import {ThemeGraph} from '../../../src/common/iServer/ThemeGraph';
import {ThemeDotDensity} from '../../../src/common/iServer/ThemeDotDensity';
import {ThemeGraduatedSymbol} from '../../../src/common/iServer/ThemeGraduatedSymbol';
import {ThemeRange} from '../../../src/common/iServer/ThemeRange';
import {LonLat} from '../../../src/common/commontypes/LonLat';

describe('ServerTheme', () => {
    it('constructor', () => {
        var serverTheme = new ServerTheme();
        expect(serverTheme).not.toBeNull();
        expect(serverTheme.CLASS_NAME).toEqual("SuperMap.ServerTheme");
        expect(serverTheme.theme).toBeNull();
        expect(serverTheme.themeElementPosition).toBeNull();
        
        var options = {
            theme: {type: 'LABEL'},
            themeElementPosition: new LonLat(30, 45)
        };
        var serverTheme2 = new ServerTheme(options);
        expect(serverTheme2.theme).not.toBeNull();
        expect(serverTheme2.themeElementPosition).not.toBeNull();
    });

    it('destroy', () => {
        var serverTheme = new ServerTheme({
            theme: {type: 'LABEL'},
            themeElementPosition: new LonLat(30, 45)
        });
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.themeElementPosition).not.toBeNull();
        
        serverTheme.destroy();
        expect(serverTheme.theme).toBeNull();
        expect(serverTheme.themeElementPosition).toBeNull();
    });

    it('fromJson_with_label_theme', () => {
        var jsonObject = {
            theme: {
                type: 'LABEL'
            },
            themeElementPosition: {
                x: 30,
                y: 45
            }
        };
        spyOn(ThemeLabel, 'fromObj').and.returnValue(new ThemeLabel());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeLabel).toBeTruthy();
        expect(serverTheme.themeElementPosition).not.toBeNull();
        expect(serverTheme.themeElementPosition instanceof LonLat).toBeTruthy();
        expect(serverTheme.themeElementPosition.lon).toEqual(30);
        expect(serverTheme.themeElementPosition.lat).toEqual(45);
    });

    it('fromJson_with_unique_theme', () => {
        var jsonObject = {
            theme: {
                type: 'UNIQUE'
            }
        };
        spyOn(ThemeUnique, 'fromObj').and.returnValue(new ThemeUnique());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeUnique).toBeTruthy();
    });

    it('fromJson_with_graph_theme', () => {
        var jsonObject = {
            theme: {
                type: 'GRAPH'
            }
        };
        spyOn(ThemeGraph, 'fromObj').and.returnValue(new ThemeGraph());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeGraph).toBeTruthy();
    });

    it('fromJson_with_dotdensity_theme', () => {
        var jsonObject = {
            theme: {
                type: 'DOTDENSITY'
            }
        };
        spyOn(ThemeDotDensity, 'fromObj').and.returnValue(new ThemeDotDensity());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeDotDensity).toBeTruthy();
    });

    it('fromJson_with_graduatedsymbol_theme', () => {
        var jsonObject = {
            theme: {
                type: 'GRADUATEDSYMBOL'
            }
        };
        spyOn(ThemeGraduatedSymbol, 'fromObj').and.returnValue(new ThemeGraduatedSymbol());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeGraduatedSymbol).toBeTruthy();
    });

    it('fromJson_with_range_theme', () => {
        var jsonObject = {
            theme: {
                type: 'RANGE'
            }
        };
        spyOn(ThemeRange, 'fromObj').and.returnValue(new ThemeRange());
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme instanceof ThemeRange).toBeTruthy();
    });

    it('fromJson_with_unknown_theme', () => {
        var jsonObject = {
            theme: {
                type: 'UNKNOWN'
            }
        };
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).not.toBeNull();
        expect(serverTheme.theme.type).toEqual('UNKNOWN');
    });

    it('fromJson_without_theme', () => {
        var jsonObject = {
            themeElementPosition: {
                x: 30,
                y: 45
            }
        };
        
        var serverTheme = new ServerTheme();
        serverTheme.fromJson(jsonObject);
        
        expect(serverTheme.theme).toBeNull();
        expect(serverTheme.themeElementPosition).not.toBeNull();
        expect(serverTheme.themeElementPosition instanceof LonLat).toBeTruthy();
    });

    it('toServerJSONObject', () => {
        // 创建具有toServerJSONObject方法的对象
        var position = new LonLat(30, 45);
        position.toServerJSONObject = jasmine.createSpy('toServerJSONObject').and.returnValue({x: 30, y: 45});
        
        // 创建具有toServerJSONObject方法的主题对象
        var theme = new ThemeLabel();
        theme.toServerJSONObject = jasmine.createSpy('toServerJSONObject').and.returnValue({type: 'LABEL'});
        
        var serverTheme = new ServerTheme({
            theme: theme,
            themeElementPosition: position
        });
        
        var jsonObject = serverTheme.toServerJSONObject();
        expect(jsonObject.theme).not.toBeNull();
        expect(jsonObject.theme.type).toEqual('LABEL');
        expect(jsonObject.themeElementPosition).not.toBeNull();
        expect(jsonObject.themeElementPosition.x).toEqual(30);
        expect(jsonObject.themeElementPosition.y).toEqual(45);
    });

    it('toServerJSONObject_without_special_methods', () => {
        // 测试themeElementPosition和theme没有toServerJSONObject方法的情况
        var position = {x: 30, y: 45};
        var theme = {type: 'LABEL'};
        
        var serverTheme = new ServerTheme({
            theme: theme,
            themeElementPosition: position
        });
        
        var jsonObject = serverTheme.toServerJSONObject();
        expect(jsonObject.theme).toEqual(theme);
        expect(jsonObject.themeElementPosition).toEqual(position);
    });
});