/**
 * @requires SuperMap/Lang.js
 */

/**
 * Namespace: SuperMap.Lang["en"]
 * Dictionary for English.  Keys for entries are used in calls to
 *     <SuperMap.Lang.translate>.  Entry bodies are normal strings or
 *     strings formatted for use with <SuperMap.String.format> calls.
 */
SuperMap.Lang.en = {

    'unhandledRequest': "Unhandled request return ${statusText}",

    'Permalink': "Permalink",

    'Overlays': "Overlays",

    'Base Layer': "Base Layer",

    'LayerSwitcher': "LayerSwitcher",

    'noFID': "Can't update a feature for which there is no FID.",

    'browserNotSupported':
        "Your browser does not support vector rendering. Currently supported renderers are:\n${renderers}",

    // console message
    'minZoomLevelError':
        "The minZoomLevel property is only intended for use " +
        "with the FixedZoomLevels-descendent layers. That this " +
        "wfs layer checks for minZoomLevel is a relic of the" +
        "past. We cannot, however, remove it without possibly " +
        " breaking OL based applications that may depend on it." +
        "Therefore we are deprecating it -- the minZoomLevel." +
        "Please instead use min/max resolution setting.",

    'commitSuccess': "WFS Transaction: SUCCESS ${response}",

    'commitFailed': "WFS Transaction: FAILED ${response}",

    'googleWarning':
        "The Google Layer was unable to load correctly.<br><br>" +
        "To get rid of this message, select a new BaseLayer " +
        "in the layer switcher in the upper-right corner.<br><br>" +
        "Most likely, this is because the Google Maps library " +
        "script was either not included, or does not contain the " +
        "correct API key for your site.<br><br>",

    'getLayerWarning':
        "The ${layerType} Layer was unable to load correctly.<br><br>" +
        "To get rid of this message, select a new BaseLayer " +
        "in the layer switcher in the upper-right corner.<br><br>" +
        "Most likely, this is because the ${layerLib} library " +
        "script was not correctly included.<br><br>",

    'Scale = 1 : ${scaleDenom}': "Scale = 1 : ${scaleDenom}",
    
    //labels for the graticule control
    'W': 'W',
    'E': 'E',
    'N': 'N',
    'S': 'S',
    'Graticule': 'Graticule',

    // console message
    'reprojectDeprecated':
        "You are using the 'reproject' option " +
        "on the ${layerName} layer. This option is deprecated: " +
        "its use was designed to support displaying data over commercial " + 
        "basemaps, but that functionality should now be achieved by using " +
        "Spherical Mercator support.",

    // console message
    'methodDeprecated':
        "This method has been deprecated and will be removed. " +
        "Please use ${newMethod} instead.",

    'proxyNeeded': "You probably need to set SuperMap.ProxyHost to access ${url}.",

    // **** end ****
    'end': '',
    'mi': "mi",
    'km': "km",
    'm': "m",
    'ft': "ft"
    
};
