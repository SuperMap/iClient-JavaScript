import { WebPrintingService } from '../../../src/common/iServer/WebPrintingService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.webPrintingURL;
var initWebPringtingService = () => {
  return new WebPrintingService(url);
};
describe('WebPrintingService', () => {
  it('constructor', () => {
    var webPrintingService = initWebPringtingService();
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.url).toEqual(url);
  });

  it('headers', () => {
    let myHeaders = new Headers();
    var webPrintingService = new WebPrintingService(url, { headers: myHeaders });
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.headers).not.toBeNull();
    webPrintingService.destroy();
  });

  it('crossOrigin', () => {
    var webPrintingService = new WebPrintingService(url, { crossOrigin: false });
    expect(webPrintingService).not.toBeNull();
    expect(webPrintingService.crossOrigin).toBeFalsy();
    webPrintingService.destroy();
  });

  it('running status not trigger callback', (done) => {
    var count = 0;
    var webPrintingService = new WebPrintingService(url, { crossOrigin: false });
    var jobId = 'e3ff26fa-a0b5-46d3-ad4a-096611a59c03@9fd5defe-d77d-4e17-967e-643c4f34d67e';
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
      count++;
      expect(method).toBe('GET');
      expect(testUrl).toBe(url + `/jobs/${jobId}`);
      if (count === 3) {
        return Promise.resolve(new Response(JSON.stringify(getPrintingJobResultJson)));
      }
      return Promise.resolve(new Response(JSON.stringify(getPrintingJobRunningJson)));
    });
    webPrintingService.getPrintingJob(jobId, (result) => {
      var serviceResult = result;
      try {
        expect(serviceResult).not.toBeNull();
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.id).toEqual(jobId);
        expect(serviceResult.result.status).toEqual('FINISHED');
        done();
      } catch (e) {
        console.log("'getPrintingJob'案例失败" + e.name + ':' + e.message);
        expect(false).toBeTruthy();
        done();
      }
    })
  })

  it('_processParams', (done) => {
    var webPrintingService = new WebPrintingService(url, { crossOrigin: false });
    const templates = [
      {
        layoutOptions: {
          hasNorthArrow: false,
          hasCopyright: false,
          hasSummaryText: true,
          hasSubtitle: false,
          hasAuthor: true,
          hasScaleBar: false,
          hasTitle: true,
          hasLegend: false,
          hasTime: true,
          hasLittleMap: false
        },
        templateName: 'MapGrid',
        maxDPI: 400,
        webMapFrameSize: [1008, 565],
        suggestionDpis: [72, 120, 200, 254, 300]
      },
      {
        layoutOptions: {
          hasNorthArrow: true,
          hasCopyright: true,
          hasSummaryText: false,
          hasSubtitle: true,
          hasAuthor: true,
          hasScaleBar: true,
          hasTitle: true,
          hasLegend: true,
          hasTime: false,
          hasLittleMap: true
        },
        templateName: 'A2_landscape',
        maxDPI: 400,
        webMapFrameSize: [1600, 900],
        suggestionDpis: [72, 120, 200, 254, 300]
      }
    ];
    spyOn(webPrintingService, 'getLayoutTemplates').and.callFake(() => {
      return Promise.resolve({ result: templates });
    });
    expect(webPrintingService.templates.length).toBe(0);
    let params = {
      content: { type: 'WEBMAP', url: 'https://www.supermapol.com/web/maps/1887887232/map.json' },
      layoutOptions: {
        templateName: 'A2_landscape',
        title: '土地利用',
        author: '北京超图软件股份有限公司',
        scaleBarOptions: { scaleText: '', type: 'BAR', intervals: '', unit: 'METER' },
        littleMapOptions: {
          scale: 0.00012532763580614162,
          center: { x: '108.90481660020251', y: '23.82283337896889' }
        },
        legendOptions: {
          title: '',
          picAsBase64:
            'iVBORw0KGgoAAAANSUhEUgAAAuUAAABhCAYAAABxhN8ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFxEAABcRAcom8z8AABBnSURBVHhe7d07rxxFGofxc7wSEeGKACFArIXEF AmICDABAQbgAQkECBusQUJIQnIMTcRQAJol5AAExAA4vYFkJBBsFoRrDYkQlrO1jMzr10ud8/0zOnpru55ftKruboNPlPT/36rus/xkaTR/HbhvZPV3bVuPP/04ja9f3G7K7bTto30mt8HkiSN5MzqVlKlIkjvM5BLkqRxGcqlivUVpA3kkiTV7fj2C9d3mj4fwo/nf3f6XAclBeXW8ddHkGYb6LKd9F7Hn6pycvJdNfun4 O7HB S9spOuSRJkjQyQ7lUob665GzjtNuRJEn75/IVaUQpMF8z/voM5Ntw Ypq4/IVaXs/fHuxmnFzx93nHDdbsFMuVYIgPVYglyRJ4zKUSxWIIG0glyTpMBnKpZH1FaQN5JIkTZehXBpRH0GabRjIJUmaNkO5JEmSNDJDuTSiPrrkbKOP7UiSpPEYyqWJ6mvJiktfJEkan6FcmqA gjTbMJBLklQHQ7k0MX0FcrZhINccHb//7ure1dqel6Qa7BzKfzz/  WSNIw A7kkSarHTqGcIH77hesvl Fc2i C9IQC X2puvya55dSXVrelSTpsG0dyiOQ5/JwXgl29p8u7zYiCDy vCtpIt5YlSRJs Oa8mYE9nUdPF7v0gmUTi262y5bOfol1QupOOiWJGlWDOXd3JaKEM6tNJi gvTEAjkHxIy3sl5LBW6bXl83OyZJUtXmFMojOFPstM9lj2ONa9TfUn1YPLfrtDhdu9iG1Js gjTbGDCQxzj4cvHoyuNYOx6PoxinjMV4zDgNb6Y63rIeTiVJOoXv3n3zqqoA 5CDWLo4p1D c6rYOV9cVTz anWbf7ry16kXU0XAJrBHWGjqvj2wuo1gUcWnVvPRVyBnGwN2yGMsvbx4dOXx66nOZo jeN9P2WPG6SYxRqVrcMnDuOxh3M rfH5keUOnSzUtqWQb62aIeH3dUkxpobIQXvo6FUsXY7VC2Whtq9ymCxDE66OuiNg6lDed0BlXXylPAB0RXfImBO/7l3cb30N4IBw8kSrCQt594zl aHw4EGHii1S8Jp1an4F8JM ubqVBnTz1zFZVgfygdF2xT piU/CQGt31zAuLqhQNG44WHl08uoLmKeMjcl2Ml3i8CWMln6Ed3U6d8gjmeRivKJDHPzChu6lDcG8qvgjplHe5Agudhgjc8QHo gUpdUaQnkEgz7/gGH8xxrj1yinS1fLlW uK2dvTYvyxLTvnmiKaqjROhxAX86AG7ZzvvHwlgnhFYTw8mSqWr3yWKp/a4x/3X8u7R6SWp5d31 JDwBenpM1eSfXO8u5i/EWY D7VQ6k4yJW0tGunPAJ2fv5U00Hvg6ki NMGdamlGuVLVyrqmMfMT17555zxw3PleUzxGBGw8/e0NWzBNtlvjTJW5rSmPLDj/3x5d3FkxVrWCAL8MD9a3l1gHXofUxesMbf7oJ1Fd3sGXXLGG v/wPjj4Jhxx1jjIJgQ0XXMNX0h8 dRPk9Jh4KxRVjnvIw4P4rnQowJAnse/LmsqPsqrVXRuvI4HzAKH6xu0WX5CpmvfA/7qUBYZ6zEviW2GX8P 67BzC2UsxMvv3AI6axx5bUI64F/dDp7u4puBYeVr/KEtK2 gvTIgRz85eV4IihE24UvWEJElzFHeCi/kKnyJNK8pKnpc/kK 6PoBsaYiPEi7aSirjnNVQ5Au1wQYJPonoOwzljpug59r YWytnZl6mEoxyOinj Y57IxA831r1uK7oVEQjihyx10keQZhsVBHKWhnFAnM9EIa6KFFgOtunShS4X06HYdflKE/ZHVQQLTVec8BlVCfYvdLL5jBPOWaaMLstXmkT3vDpzCuX80JiqK0MB6CCwzrVpGoIk09aFyI mNrkpFR8QqbM Ajnb6GM7p8TY6uM64XFSTSyBkeYqLhXaBfu1ru9dhzXmg07HaxoqC Elzk/CnakI51zxDl2Wr wqLgoyqLl1ypum6jiqYglL21m7fNkxJRInhLLMhZDOD5uk0nQ01XSUdXMq1 ppMH11xyvosuf40sVvq1tprqKrt03tOqvL/o0/T PqAk9IE8FnN2ZPyWYE7shgbQeYsfRxF dTMVYI/6dZ3ryTOYVyfjhNwZv15JvagEyJxCUUmfbgh0lF5y9 8BEYmvD3lGvWpb3oI0izjZED a2pygNZTprmINlunuYu9jNlgeUqTa81zQR3wb4stsF zAaSpoCZU2aIIpRzBipBmc9vfrBaLl JWveLtdpw0BpjhauGsZ2Ywd27uXXKm/AD3XRiAAGAHwDv5bYJXXiO0sofehQfkrZuvKQry8GiyhOk eLjOY4Smq68Qq27 souX8DSHDAj3DVoO6urqSCb5cu2YpaH1Q8RnDmApZEDbmNJC9W0pDL2LV2C9o2r28GaRIcQyvtC4I4fdFP1sZ5W2qivLjnb2FOXvG3qMKYc88oPmPltbXyp8r7YxjblGNQUtB1wRmFdAygOPjnI5SCVWV5mnZrWnDetW e9zkRpqviej88v5wsyuxrNHV5j/TljLEcAj246Oz32F UYiH1O/vzg5woayqUJ6TOQV4gAYbDW3G064ETb8hWKMUIwJ4jEcyzBRJyLUYaSHLNRcaKcNEVxYMulc OzHzgIZQcXs0HMIhGso4OeH6TyfPzSoCYsfY6TTAdxfPuF6/kfq8KP53/nH0ySpKOTk  q2T8dH9811P6J/2dC a7rx kerruMButyyyCjGfnh24vVjJs77j7Xx7ih0x3Bms83wToP14T0OB8wMJPEjNO6sRTvacPfWc407ZWdckmS5oPATThpKwO5poyZoi5BOZZLrju4jfe01aCBHIZySZLqQRjYtUsuzRHrvBkXbedCtJ3HNDmz J QJEnSLJevHAw75ZIkSdLIDOWSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSBnC8upU0gn889veTxe1TNywej njR97x 0CSpJGcWd1KGgFhvIZALkmSxmUolyRJkkZ2/M2l5xbT5zW45 zbTp/roDz6ybPVjD Xr6g2f548X834OHP8luND0l7ZKZckSZJGZiiXJEmSRubyFWlELl R2rl8RdreHxdvqWbcXHfuV8fNFuyUS5IkSSMzlEuSJEkjM5RLkiRJIzOUS5IkSSMzlEuSJEkjM5RLE/fxI 9cLkmSNE2GcknSLJ15/3 re5JUP0O5NHGPfvLs5ZIkSdNkKJcmLF 6UsESlpdSfbq8ew2ef2N5d6F83AW/EOO 5V1pti6lenx5V9IhMZRLE0UAz7vkUSMG869TnU0V4ZlwwX3qXKoX1jymbkslqRuCez5 upaBX6rU3EN5U eOHT9fTHbcNGsjhPOvUhHK30z13uo v2KZupiK59seUz nktTdT6nyMUT9LRW4LV/j/ZIqZadcUt9eTEUgzzt50RnnYJiD5bJTbpdcuuLm1W2OBpPNJGnG5hTKowOe12up2Pnnz0Wn4MtU fNUIEww9d4mwoZUpeiScztgx5wxUYYGOuJNXbqXUzU9n4/HstA0bqMMLJqKps9vPqvLvivH Rfsy55cPJL25Lr/3npVaVidQvk9//zP6t61eC0q1/TcnjH1HTv5KHb8eSigYmrv/lT581SbCPx28zQJ5TrzARCIn0hFaKYTvqtyTEYxjtE0XR/F8hlpCsrPLp/vz1PlYu03YZ1ZJfZZzEJJe9EUwg3mw5r78pXXUz28vHtZhPe duAEkOh0SIOJkzrLGiiElxhPH6XioJcuXwSKfKYqDojBe5qeb8K2Yr35Z6lOE/qlGjFOOFE6cPD5YSpmbHmNMeJBpzRzG0N5dLtH6Hzvio5d7Oy7VL5MJQI2X4Z8CXK/PFEUD6xueZ1wwQlr0iAifCPvhkeNLA56CegR0hEdQU4ARTyOWneSJ PxwvLu0QepvCC71sp/aRD3K/8lQux3COF56H4lVSzrWjc Yj VV/w5bsvXNh0ASxrRxlD zWM3XL6N xPBl0 54y L6fYcnfV4ni807ued9viSYyoRsZ0vUsUXoaQr4lrkeSjIu RRbedwcFDMeMxDCYGl6WBZWvjzqb9M6bd5Mh74TJd4jvGy7lyJ2E/lFcG7aR/ofkqt/vjrL6t7VzQ9p/3ptHxlXRiPsF6 p m5gUWAXld04DaJLgbiS64M89JelctTKuiIt4mZKs6/YNkJU  MlzwYoDyng6u1lCLQ03HP8ZiQ7jIWbURApyrFZ5z9S/kZB88xC8t5GpIOwJzXlDd1CcrqEq7pnkfnQdJ696aKg9inV7cc/OYHwyivohJr0AOBmxmp8pyQwAlvHJkYzNWo4iAeOIDlM97UJQ98zhlPzgxpENEZ57aSLvm2S5LzyvcrsZ02eUNpNHM/0XMorDFfdwlF6VA8mIqTMekAxpUiunTK804hQZsp/U0Hw3TXeZ/BXI0qD YcmHLVlaYueY7POTNOBnMdsnx/0aW6IIQTxqsx51De1/KVdQgebIdux6s8Ie1DRSdybkJ44BwLOtyxDnybTjljKgL5upM/A1  vN/AoimJJk7bTFCJzzljK8aPpP1hfxT7pkE754e0fIWQnv/CEuq0a8PpBMa24BemDll0HL5f3YaunfJYssLjLoE88H66iQZzTQHjhP1T20wQz/97efcqfM7prDsrq0PFPiLCcluVM6cRsOPcDO43jSGWXoKsSCNplKvqzTGUc1mprjt1gkDTCWYhfphd3JQq1tJKhyjWk5djr0unnIqrH 2Ccdy16yiNqdxHxVrWKIJ32zXJ Yzn ywCfP5nqdgPcVu 1nYgIF1W8RVXYh xrnhPjpzH8zSCwP18DMW iBlXMEZ4D5ffxTYNolObUygvv9jK4h af/Sm16LAdggRvJ8T1fjhlOKHnLs5lR0MHTLW1rCevFR2yttKOkQR0qO2ObgkeOd/dlPZOJKubrjGrG2E9lHNKZSXX2xl8WVULl8pi/WsHDXF4/hyjCOlO1e3TQgk5a9Jlg4J3Yfy14AzjjadyNYV22rrIEqHZtNMbxPe39d4lIa0qfGaV5yj1KapsVqFOa8p30WsEW9CoC n4fOiS15Om0iSJOl08sYr670p7keHO5adUH0ceOaX9x2Moby7TWuZXM8qSZI0HlY8ULs6n4pGK8ud1/0Ogb04pFDOtJ2dbEmSpOl6KBWX3m1zmjNVL6SKZitXEiOgD3ZZxONvLj3HX1iFe86 zT CJElHf548X83 6czxW 6fNAl/XLylmnFz3blfTztuWEse5/qB9eIsJY7HBGaWmbB8hfP/WEpMh5v3cJGBWMoS22G5C7e8nz/HY5bGxOuxHZR/9965fEWSJEm1IyRH2A4EaC4jSsCOg5FyTTnBnXCN91IRsstLHcaa9fz5wS91bSiXJElSzSJY593vwDl9BGqqvCIRv0woOunl6zwfvzSoCZfFbrrM797wHyhJkqQZmOnylV00BfhcLIVpQ2jf9rKjp2KnXJIkSTWLTnjX6oLA3vRnowYN5DCUS5IkqUax1ntb/Jl1XXJJkiRJKh0d/R/xG4kGdYu0AQAAAABJRU5ErkJggg: ='
        },
        northArrowOptions: null,
        time: null,
        summaryText: null
      },
      exportOptions: { format: 'PDF', dpi: 96, scale: 0.00006266381790307081, center: null }
    };
    webPrintingService._processParams(params).then(() => {
      expect(webPrintingService.templates).toEqual(templates);
      expect(params.layoutOptions.subTitle).not.toBeUndefined();
      expect(params.layoutOptions.copyright).not.toBeUndefined();
      expect(params.layoutOptions.time).toBeUndefined();
      expect(params.layoutOptions.summaryText).toBeUndefined();
      params.layoutOptions.templateName = 'MapGrid';
      webPrintingService._processParams(params).then(() => {
        expect(params.layoutOptions.legendOptions).toBeUndefined();
        expect(params.layoutOptions.northArrowOptions).toBeUndefined();
        expect(params.layoutOptions.scaleBarOptions).toBeUndefined();
        expect(params.layoutOptions.littleMapOptions).toBeUndefined();
        webPrintingService.destroy();
        done();
      });
    });
  });
});
