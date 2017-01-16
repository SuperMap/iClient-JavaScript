/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes.js
 * @requires SuperMap/BaseTypes/Bounds.js
 * @requires SuperMap/BaseTypes/Element.js
 * @requires SuperMap/BaseTypes/LonLat.js
 * @requires SuperMap/BaseTypes/Pixel.js
 * @requires SuperMap/BaseTypes/Size.js
 * @requires SuperMap/Console.js
 * @requires SuperMap/Lang.js
 */
/**
 * Class: SuperMap.Util
 * 常用的一些函数。
 */
 
/** 
 * Function: getElement
 * This is the old $() from prototype
 *
 * Parameters:
 * e - {String or DOMElement or Window}
 * Return:
 * {Array(DOMElement)}
 */
SuperMap.Util.getElement = function() {
    var elements = [];

    for (var i=0, len=arguments.length; i<len; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/**
 * Function: isElement
 * A cross-browser implementation of "e instanceof Element".
 *
 * Parameters:
 * o - {Object} The object to test.
 *
 * Returns:
 * {Boolean}
 */
SuperMap.Util.isElement = function(o) {
    return !!(o && o.nodeType === 1);
};

/**
 * Function: isArray
 * Tests that the provided object is an array.
 * This test handles the cross-IFRAME case not caught
 * by "a instanceof Array" and should be used instead.
 * 
 * Parameters:
 * a - {Object} the object test.
 * 
 * Returns
 * {Boolean} true if the object is an array.
 */
SuperMap.Util.isArray = function(a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};

/** 
 * Maintain existing definition of $.
 * $已经公认为jquery，这里不对$进行定义，暂时注释掉
 */
/*if(typeof window.$  === "undefined") {
    window.$ = SuperMap.Util.getElement;
};*/

/** 
 * Function: removeItem
 * Remove an object from an array. Iterates through the array
 *     to find the item, then removes it.
 *
 * Parameters:
 * array - {Array}
 * item - {Object}
 * 
 * Return
 * {Array} A reference to the array
 */
SuperMap.Util.removeItem = function(array, item) {
    for(var i = array.length - 1; i >= 0; i--) {
        if(array[i] === item) {
            array.splice(i,1);
            //break;more than once??
        }
    }
    return array;
};

/** 
 * Function: indexOf
 * Seems to exist already in FF, but not in MOZ.
 * 
 * Parameters:
 * array - {Array}
 * obj - {*}
 * 
 * Returns:
 * {Integer} The index at, which the first object was found in the array.
 *           If not found, returns -1.
 */
SuperMap.Util.indexOf = function(array, obj) {
    if(array==null)
    {
        return -1;
    }
    else
    {
        // use the build-in function if available.
        if (typeof array.indexOf === "function") {
            return array.indexOf(obj);
        } else {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
};



/**
 * Function: modifyDOMElement
 * 
 * Modifies many properties of a DOM element all at once.  Passing in 
 * null to an individual parameter will avoid setting the attribute.
 *
 * Parameters:
 * element - {DOMElement} DOM element to modify.
 * id - {String} The element id attribute to set.
 * px - {<SuperMap.Pixel>} The left and top style position.
 * sz - {<SuperMap.Size>}  The width and height style attributes.
 * position - {String}       The position attribute.  eg: absolute, 
 *                           relative, etc.
 * border - {String}         The style.border attribute.  eg:
 *                           solid black 2px
 * overflow - {String}       The style.overview attribute.  
 * opacity - {Float}         Fractional value (0.0 - 1.0)
 */
SuperMap.Util.modifyDOMElement = function(element, id, px, sz, position, 
                                            border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};

/** 
 * Function: createDiv
 * Creates a new div and optionally set some standard attributes.
 * Null may be passed to each parameter if you do not wish to
 * set a particular attribute.
 * Note - zIndex is NOT set on the resulting div.
 * 
 * Parameters:
 * id - {String} An identifier for this element.  If no id is
 *               passed an identifier will be created 
 *               automatically.
 * px - {<SuperMap.Pixel>} The element left and top position. 
 * sz - {<SuperMap.Size>} The element width and height.
 * imgURL - {String} A url pointing to an image to use as a 
 *                   background image.
 * position - {String} The style.position value. eg: absolute,
 *                     relative etc.
 * border - {String} The the style.border value. 
 *                   eg: 2px solid black
 * overflow - {String} The style.overflow value. Eg. hidden
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * 
 * Returns: 
 * {DOMElement} A DOM Div created with the specified attributes.
 */
SuperMap.Util.createDiv = function(id, px, sz, imgURL, position, 
                                     border, overflow, opacity) {

    var dom = document.createElement('div');

    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }

    //set generic properties
    if (!id) {
        id = SuperMap.Util.createUniqueID("SuperMapDiv");
    }
    if (!position) {
        position = "absolute";
    }
    SuperMap.Util.modifyDOMElement(dom, id, px, sz, position, 
                                     border, overflow, opacity);

    return dom;
};

/**
 * Function: createImage
 * Creates an img element with specific attribute values.
 *  
 * Parameters:
 * id - {String} The id field for the img.  If none assigned one will be
 *               automatically generated.
 * px - {<SuperMap.Pixel>} The left and top positions.
 * sz - {<SuperMap.Size>} The style.width and style.height values.
 * imgURL - {String} The url to use as the image source.
 * position - {String} The style.position value.
 * border - {String} The border to place around the image.
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * delayDisplay - {Boolean} If true waits until the image has been
 *                          loaded.
 * 
 * Returns:
 * {DOMElement} A DOM Image created with the specified attributes.
 */
SuperMap.Util.createImage = function(id, px, sz, imgURL, position, border,
                                       opacity, delayDisplay) {

    var image = document.createElement("img");

    //set generic properties
    if (!id) {
        id = SuperMap.Util.createUniqueID("SuperMapDiv");
    }
    if (!position) {
        position = "relative";
    }
    SuperMap.Util.modifyDOMElement(image, id, px, sz, position, 
                                     border, null, opacity);

    if(delayDisplay) {
        image.style.display = "none";
        SuperMap.Event.observe(image, "load", 
            SuperMap.Function.bind(SuperMap.Util.onImageLoad, image));
        SuperMap.Event.observe(image, "error", 
            SuperMap.Function.bind(SuperMap.Util.onImageLoadError, image));
        
    }
    
    //set special properties
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }
        
    return image;
};

/**
 * Function: onImageLoad
 * Bound to image load events.  For all images created with <createImage> or
 *     <createAlphaImageDiv>, this function will be bound to the load event.
 */
SuperMap.Util.onImageLoad = function() {
    // The complex check here is to solve issues described in #480.
    // Every time a map view changes, it increments the 'viewRequestID' 
    // property. As the requests for the images for the new map view are sent
    // out, they are tagged with this unique viewRequestID. 
    // 
    // If an image has no viewRequestID property set, we display it regardless, 
    // but if it does have a viewRequestID property, we check that it matches 
    // the viewRequestID set on the map.
    // 
    // If the viewRequestID on the map has changed, that means that the user
    // has changed the map view since this specific request was sent out, and
    // therefore this tile does not need to be displayed (so we do not execute
    // this code that turns its display on).
    //
    if (!this.viewRequestID ||
        (this.map && this.viewRequestID === this.map.viewRequestID)) {
        this.style.display = "";  
    }
    SuperMap.Element.removeClass(this, "smImageLoadError");
};

/**
 * Property: IMAGE_RELOAD_ATTEMPTS
 * {Integer} How many times should we try to reload an image before giving up?
 *           Default is 0
 */
SuperMap.IMAGE_RELOAD_ATTEMPTS = 0;

/**
 * Function: onImageLoadError 
 */
SuperMap.Util.onImageLoadError = function() {
    this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
    if (this._attempts <= SuperMap.IMAGE_RELOAD_ATTEMPTS) {
        var urls = this.urls;
        if (urls && SuperMap.Util.isArray(urls) && urls.length > 1){
            var src = this.src.toString();
            var current_url, k;
            for (k = 0; current_url = urls[k]; k++){
                if(src.indexOf(current_url) !== -1){
                    break;
                }
            }
            var guess = Math.floor(urls.length * Math.random());
            var new_url = urls[guess];
            k = 0;
            while(new_url === current_url && k++ < 4){
                guess = Math.floor(urls.length * Math.random());
                new_url = urls[guess];
            }
            this.src = src.replace(current_url, new_url);
        } else {
            this.src = this.src;
        }
    } else {
        SuperMap.Element.addClass(this, "smImageLoadError");
    }
    this.style.display = "";
};

/**
 * Property: alphaHackNeeded
 * {Boolean} true if the png alpha hack is necessary and possible, false otherwise.
 */
SuperMap.Util.alphaHackNeeded = null;

/**
 * Function: alphaHack
 * Checks whether it's necessary (and possible) to use the png alpha
 * hack which allows alpha transparency for png images under Internet
 * Explorer.
 * 
 * Returns:
 * {Boolean} true if the png alpha hack is necessary and possible, false otherwise.
 */
SuperMap.Util.alphaHack = function() {
    if (SuperMap.Util.alphaHackNeeded == null) {
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        var filter = false;
    
        // IEs4Lin dies when trying to access document.body.filters, because 
        // the property is there, but requires a DLL that can't be provided. This
        // means that we need to wrap this in a try/catch so that this can
        // continue.
    
        try { 
            filter = !!(document.body.filters);
        } catch (e) {}    
    
        SuperMap.Util.alphaHackNeeded = (filter && 
                                           (version >= 5.5) && (version < 7));
    }
    return SuperMap.Util.alphaHackNeeded;
};

/** 
 * Function: modifyAlphaImageDiv
 * 
 * Parameters:
 * div - {DOMElement} Div containing Alpha-adjusted Image
 * id - {String}
 * px - {<SuperMap.Pixel>}
 * sz - {<SuperMap.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing - {String} 'crop', 'scale', or 'image'. Default is "scale"
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * display - {String}
 */ 
SuperMap.Util.modifyAlphaImageDiv = function(div, id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity,display) {

    SuperMap.Util.modifyDOMElement(div, id, px, sz, position,
                                     null, null, opacity);

    var img = div.childNodes[0];

    if (imgURL) {
        img.src = imgURL;
    }
    if(!!display) {
        img.style.display = display;
    }
    SuperMap.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, 
                                     position, border);
    
    if (SuperMap.Util.alphaHack()) {
        if(div.style.display !== "none") {
            div.style.display = "inline-block";
        }
        if (sizing == null) {
            sizing = "scale";
        }
        
        div.style.filter = "progid:DXImageTransform.Microsoft" +
                           ".AlphaImageLoader(src='" + img.src + "', " +
                           "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && 
            parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }

        img.style.filter = "alpha(opacity=0)";
    }
};

/** 
 * Function: createAlphaImageDiv
 * 
 * Parameters:
 * id - {String}
 * px - {<SuperMap.Pixel>}
 * sz - {<SuperMap.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing - {String} 'crop', 'scale', or 'image'. Default is "scale"
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * delayDisplay - {Boolean} If true waits until the image has been
 *                          loaded.
 * 
 * Returns:
 * {DOMElement} A DOM Div created with a DOM Image inside it. If the hack is 
 *              needed for transparency in IE, it is added.
 */ 
SuperMap.Util.createAlphaImageDiv = function(id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity, delayDisplay) {
    
    var div = SuperMap.Util.createDiv();
    var img = SuperMap.Util.createImage(null, null, null, null, position, null, 
                                          null, delayDisplay);

    img.className = "olAlphaImg";
    div.appendChild(img);

    SuperMap.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, 
                                        border, sizing, opacity,"block");
    
    return div;
};


/** 
 * Function: upperCaseObject
 * Creates a new hashtable and copies over all the keys from the 
 *     passed-in object, but storing them under an uppercased
 *     version of the key at which they were stored.
 * 
 * Parameters: 
 * object - {Object}
 * 
 * Returns: 
 * {Object} A new Object with all the same keys but uppercased
 */
SuperMap.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};

/** 
 * Function: applyDefaults
 * Takes an object and copies any properties that don't exist from
 *     another properties, by analogy with SuperMap.Util.extend() from
 *     Prototype.js.
 * 
 * Parameters:
 * to - {Object} The destination object.
 * from - {Object} The source object.  Any properties of this object that
 *     are undefined in the to object will be set on the to object.
 *
 * Returns:
 * {Object} A reference to the to object.  Note that the to argument is modified
 *     in place and returned by this function.
 */
SuperMap.Util.applyDefaults = function (to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === "function"
                    && from instanceof window.Event;

    for (var key in from) {
        if (to[key] === undefined ||
            (!fromIsEvt && from.hasOwnProperty
             && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if(!fromIsEvt && from && from.hasOwnProperty
       && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }
    
    return to;
};

/**
 * Function: getParameterString
 * 
 * Parameters:
 * params - {Object}
 * 
 * Returns:
 * {String} A concatenation of the properties of an object in 
 *          http parameter notation. 
 *          (ex. <i>"key1=value1&key2=value2&key3=value3"</i>)
 *          If a parameter is actually a list, that parameter will then
 *          be set to a comma-seperated list of values (foo,bar) instead
 *          of being URL escaped (foo%3Abar). 
 */
SuperMap.Util.getParameterString = function(params) {
    var paramsArray = [];
    
    for (var key in params) {
      var value = params[key];
      if ((value != null) && (typeof value !== 'function')) {
        var encodedValue;
        if (typeof value === 'object' && value.constructor === Array) {
          /* value is an array; encode items and separate with "," */
          var encodedItemArray = [];
          var item;
          for (var itemIndex=0, len=value.length; itemIndex<len; itemIndex++) {
            item = value[itemIndex];
            encodedItemArray.push(encodeURIComponent(
                (item === null || item === undefined) ? "" : item)
            );
          }
          encodedValue = encodedItemArray.join(",");
        }
        else {
          /* value is a string; simply encode */
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
      }
    }
    
    return paramsArray.join("&");
};

/**
 * Function: urlAppend
 * Appends a parameter string to a url. This function includes the logic for
 * using the appropriate character (none, & or ?) to append to the url before
 * appending the param string.
 * 
 * Parameters:
 * url - {String} The url to append to
 * paramStr - {String} The param string to append
 * 
 * Returns:
 * {String} The new url
 */
SuperMap.Util.urlAppend = function(url, paramStr) {
    var newUrl = url;
    if(paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ?
            paramStr :
            parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};

/**
 * APIProperty: ImgPath
 * {SuperMap.ImgPath} 设置控件图片的路径。该变量需在控件初始化之前设置。默认为 ""。
 */
SuperMap.ImgPath = '';

/** 
 * Function: getImagesLocation
 * 
 * Returns:
 * {String} The fully formatted image location string
 */
SuperMap.Util.getImagesLocation = function() {
    return SuperMap.ImgPath || (SuperMap._getScriptLocation() + "../theme/images/");
};


/** 
 * Function: Try
 * Execute functions until one of them doesn't throw an error. 
 *     Capitalized because "try" is a reserved word in JavaScript.
 *     Taken directly from SuperMap.Util.Try()
 * 
 * Parameters:
 * [*] - {Function} Any number of parameters may be passed to Try()
 *    It will attempt to execute each of them until one of them 
 *    successfully executes. 
 *    If none executes successfully, returns null.
 * 
 * Returns:
 * {*} The value returned by the first successfully executed function.
 */
SuperMap.Util.Try = function() {
    var returnValue = null;

    for (var i=0, len=arguments.length; i<len; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
};

/**
 * Function: getXmlNodeValue
 * 
 * Parameters:
 * node - {XMLNode}
 * 
 * Returns:
 * {String} The text value of the given node, without breaking in firefox or IE
 */
SuperMap.Util.getXmlNodeValue = function(node) {
    var val = null;
    SuperMap.Util.Try( 
        function() {
            val = node.text;
            if (!val) {
                val = node.textContent;
            }
            if (!val) {
                val = node.firstChild.nodeValue;
            }
        }, 
        function() {
            val = node.textContent;
        }); 
    return val;
};

/** 
 * Function: mouseLeft
 * 
 * Parameters:
 * evt - {Event}
 * div - {HTMLDivElement}
 * 
 * Returns:
 * {Boolean}
 */
SuperMap.Util.mouseLeft = function (evt, div) {
    // start with the element to which the mouse has moved
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    // walk up the DOM tree.
    while (target !== div && target != null) {
        target = target.parentNode;
    }
    // if the target we stop at isn't the div, then we've left the div.
    return (target !== div);
};

/**
 * Property: precision
 * {Number} The number of significant digits to retain to avoid
 * floating point precision errors.
 *
 * We use 14 as a "safe" default because, although IEEE 754 double floats
 * (standard on most modern operating systems) support up to about 16
 * significant digits, 14 significant digits are sufficient to represent
 * sub-millimeter accuracy in any coordinate system that anyone is likely to
 * use with SuperMap.
 *
 * If DEFAULT_PRECISION is set to 0, the original non-truncating behavior
 * of SuperMap <2.8 is preserved. Be aware that this will cause problems
 * with certain projections, e.g. spherical Mercator.
 *
 */
SuperMap.Util.DEFAULT_PRECISION = 14;

/**
 * Function: toFloat
 * Convenience method to cast an object to a Number, rounded to the
 * desired floating point precision.
 *
 * Parameters:
 * number    - {Number} The number to cast and round.
 * precision - {Number} An integer suitable for use with
 *      Number.toPrecision(). Defaults to SuperMap.Util.DEFAULT_PRECISION.
 *      If set to 0, no rounding is performed.
 *
 * Returns:
 * {Number} The cast, rounded number.
 */
SuperMap.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = SuperMap.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number :
                             parseFloat(number.toPrecision(precision));
};

/**
 * Function: rad
 * 
 * Parameters:
 * x - {Float}
 * 
 * Returns:
 * {Float}
 */
SuperMap.Util.rad = function(x) {return x*Math.PI/180;};

/**
 * Function: deg
 *
 * Parameters:
 * x - {Float}
 *
 * Returns:
 * {Float}
 */
SuperMap.Util.deg = function(x) {return x*180/Math.PI;};

/**
 * Property: VincentyConstants
 * {Object} Constants for Vincenty functions.
 */
SuperMap.Util.VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1/298.257223563
};

/**
 * APIFunction: distVincenty
 * 给出两个带有地理坐标的点对象，计算这些点在椭球表面上的距离。
 *
 * Parameters:
 * p1 - {<SuperMap.LonLat>} 带有地理坐标的点对象或者带有经纬度属性的对象。
 * p2 - {<SuperMap.LonLat>} 带有地理坐标的点对象或者带有经纬度属性的对象。
 *
 * Returns:
 * {Float} 传入的两点在椭球表面上的距离（单位：km）。
 */
SuperMap.Util.distVincenty = function(p1, p2) {
    var ct = SuperMap.Util.VincentyConstants;
    var a = ct.a, b = ct.b, f = ct.f;

    var L = SuperMap.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1-f) * Math.tan(SuperMap.Util.rad(p1.lat)));
    var U2 = Math.atan((1-f) * Math.tan(SuperMap.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
    var lambda = L, lambdaP = 2*Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0) {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) +
        (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
        if (sinSigma==0) {
            return 0;  // co-incident points
        }
        var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
        var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1-C) * f * Math.sin(alpha) *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
    }
    if (iterLimit==0) {
        return NaN;  // formula failed to converge
    }
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
    var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
        B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
    var s = b*A*(sigma-deltaSigma);
    var d = s.toFixed(3)/1000; // round to 1mm precision
    return d;
};

/**
 * APIFunction: destinationVincenty
 * 根据传入的起始点计算目标点的经纬度(度)、角方向（度）和距离(米)。
 *
 * Parameters:
 * lonlat  - {<SuperMap.LonLat>} (或者带有经纬度属性的任何对象)起点。 
 * brng  - {Float} 角方向(度)。
 * dist  - {Float} 距离(米)。
 *
 * Returns:
 * {<SuperMap.LonLat>} 目标点。
 */
SuperMap.Util.destinationVincenty = function(lonlat, brng, dist) {
    var u = SuperMap.Util;
    var ct = u.VincentyConstants;
    var a = ct.a, b = ct.b, f = ct.f;

    var lon1 = lonlat.lon;
    var lat1 = lonlat.lat;

    var s = dist;
    var alpha1 = u.rad(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);

    var tanU1 = (1-f) * Math.tan(u.rad(lat1));
    var cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1;
    var sigma1 = Math.atan2(tanU1, cosAlpha1);
    var sinAlpha = cosU1 * sinAlpha1;
    var cosSqAlpha = 1 - sinAlpha*sinAlpha;
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));

    var sigma = s / (b*A), sigmaP = 2*Math.PI;
    while (Math.abs(sigma-sigmaP) > 1e-12) {
        var cos2SigmaM = Math.cos(2*sigma1 + sigma);
        var sinSigma = Math.sin(sigma);
        var cosSigma = Math.cos(sigma);
        var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
            B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b*A) + deltaSigma;
    }

    var tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
    var lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1,
        (1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
    var lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
    var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
    var L = lambda - (1-C) * f * sinAlpha *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));

    var revAz = Math.atan2(sinAlpha, -tmp);  // final bearing

    return new SuperMap.LonLat(lon1+u.deg(L), u.deg(lat2));
};

/**
 * Function: getParameters
 * Parse the parameters from a URL or from the current page itself into a 
 *     JavaScript Object. Note that parameter values with commas are separated
 *     out into an Array.
 * 
 * Parameters:
 * url - {String} Optional url used to extract the query string.
 *                If url is null or is not supplied, query string is taken 
 *                from the page location.
 * 
 * Returns:
 * {Object} An object of key/value pairs from the query string.
 */
SuperMap.Util.getParameters = function(url) {
    // if no url specified, take it from the location bar
    url = (url === null || url === undefined) ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (SuperMap.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = SuperMap.String.contains(url, "#") ?
                    url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for(var i=0, len=pairs.length; i<len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }
            
            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }
            
            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }                
            
            parameters[key] = value;
         }
     }
    return parameters;
};

/**
 * Property: lastSeqID
 * {Integer} The ever-incrementing count variable.
 *           Used for generating unique ids.
 */
SuperMap.Util.lastSeqID = 0;

/**
 * Function: createUniqueID
 * Create a unique identifier for this session.  Each time this function
 *     is called, a counter is incremented.  The return will be the optional
 *     prefix (defaults to "id_") appended with the counter value.
 * 
 * Parameters:
 * prefix {String} Optionsal string to prefix unique id. Default is "id_".
 * 
 * Returns:
 * {String} A unique id string, built on the passed in prefix.
 */
SuperMap.Util.createUniqueID = function(prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    SuperMap.Util.lastSeqID += 1; 
    return prefix + SuperMap.Util.lastSeqID;        
};

/**
 * Constant: INCHES_PER_UNIT
 * {SuperMap.INCHES_PER_UNIT} 每单位的英尺数。
 */
SuperMap.INCHES_PER_UNIT = { 
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
SuperMap.INCHES_PER_UNIT["in"]= SuperMap.INCHES_PER_UNIT.inches;
SuperMap.INCHES_PER_UNIT["degrees"] = SuperMap.INCHES_PER_UNIT.dd;
SuperMap.INCHES_PER_UNIT["nmi"] = 1852 * SuperMap.INCHES_PER_UNIT.m;

// Units from CS-Map
SuperMap.METERS_PER_INCH = 0.02540005080010160020;
SuperMap.Util.extend(SuperMap.INCHES_PER_UNIT, {
    "Inch": SuperMap.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / SuperMap.METERS_PER_INCH,   //EPSG:9001
    "Foot": 0.30480060960121920243 / SuperMap.METERS_PER_INCH,   //EPSG:9003
    "IFoot": 0.30480000000000000000 / SuperMap.METERS_PER_INCH,   //EPSG:9002
    "ClarkeFoot": 0.3047972651151 / SuperMap.METERS_PER_INCH,   //EPSG:9005
    "SearsFoot": 0.30479947153867624624 / SuperMap.METERS_PER_INCH,   //EPSG:9041
    "GoldCoastFoot": 0.30479971018150881758 / SuperMap.METERS_PER_INCH,   //EPSG:9094
    "IInch": 0.02540000000000000000 / SuperMap.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / SuperMap.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / SuperMap.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / SuperMap.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / SuperMap.METERS_PER_INCH,   //EPSG:9036
    "Yard": 0.91440182880365760731 / SuperMap.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / SuperMap.METERS_PER_INCH,   //EPSG:9040
    "IndianYard": 0.91439853074444079983 / SuperMap.METERS_PER_INCH,   //EPSG:9084
    "IndianYd37": 0.91439523 / SuperMap.METERS_PER_INCH,   //EPSG:9085
    "IndianYd62": 0.9143988 / SuperMap.METERS_PER_INCH,   //EPSG:9086
    "IndianYd75": 0.9143985 / SuperMap.METERS_PER_INCH,   //EPSG:9087
    "IndianFoot": 0.30479951 / SuperMap.METERS_PER_INCH,   //EPSG:9080
    "IndianFt37": 0.30479841 / SuperMap.METERS_PER_INCH,   //EPSG:9081
    "IndianFt62": 0.3047996 / SuperMap.METERS_PER_INCH,   //EPSG:9082
    "IndianFt75": 0.3047995 / SuperMap.METERS_PER_INCH,   //EPSG:9083
    "Mile": 1609.34721869443738887477 / SuperMap.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / SuperMap.METERS_PER_INCH,   //EPSG:9096
    "IMile": 1609.34400000000000000000 / SuperMap.METERS_PER_INCH,   //EPSG:9093
    "NautM": 1852.00000000000000000000 / SuperMap.METERS_PER_INCH,   //EPSG:9030
    "Lat-66": 110943.316488932731 / SuperMap.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / SuperMap.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / SuperMap.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / SuperMap.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / SuperMap.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / SuperMap.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / SuperMap.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / SuperMap.METERS_PER_INCH,   //EPSG:9031
    "CaGrid": 0.999738 / SuperMap.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / SuperMap.METERS_PER_INCH,   //EPSG:9038
    "GunterChain": 20.11684023368047 / SuperMap.METERS_PER_INCH,   //EPSG:9033
    "BenoitChain": 20.116782494375872 / SuperMap.METERS_PER_INCH,   //EPSG:9062
    "SearsChain": 20.11676512155 / SuperMap.METERS_PER_INCH,   //EPSG:9042
    "ClarkeLink": 0.201166194976 / SuperMap.METERS_PER_INCH,   //EPSG:9039
    "GunterLink": 0.2011684023368047 / SuperMap.METERS_PER_INCH,   //EPSG:9034
    "BenoitLink": 0.20116782494375872 / SuperMap.METERS_PER_INCH,   //EPSG:9063
    "SearsLink": 0.2011676512155 / SuperMap.METERS_PER_INCH,   //EPSG:9043
    "Rod": 5.02921005842012 / SuperMap.METERS_PER_INCH,
    "IntnlChain": 20.1168 / SuperMap.METERS_PER_INCH,   //EPSG:9097
    "IntnlLink": 0.201168 / SuperMap.METERS_PER_INCH,   //EPSG:9098
    "Perch": 5.02921005842012 / SuperMap.METERS_PER_INCH,
    "Pole": 5.02921005842012 / SuperMap.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / SuperMap.METERS_PER_INCH,
    "Rood": 3.778266898 / SuperMap.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / SuperMap.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / SuperMap.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / SuperMap.METERS_PER_INCH,
    "Fathom": 1.8288 / SuperMap.METERS_PER_INCH,
    "NautM-UK": 1853.184 / SuperMap.METERS_PER_INCH,
    "50kilometers": 50000.0 / SuperMap.METERS_PER_INCH,
    "150kilometers": 150000.0 / SuperMap.METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
SuperMap.Util.extend(SuperMap.INCHES_PER_UNIT, {
    "mm": SuperMap.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": SuperMap.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": SuperMap.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": SuperMap.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": SuperMap.INCHES_PER_UNIT["nmi"],    //International Nautical Mile
    "fath": SuperMap.INCHES_PER_UNIT["Fathom"], //International Fathom
    "ch": SuperMap.INCHES_PER_UNIT["IntnlChain"],  //International Chain
    "link": SuperMap.INCHES_PER_UNIT["IntnlLink"], //International Link
    "us-in": SuperMap.INCHES_PER_UNIT["inches"], //U.S. Surveyor's Inch
    "us-ft": SuperMap.INCHES_PER_UNIT["Foot"],    //U.S. Surveyor's Foot
    "us-yd": SuperMap.INCHES_PER_UNIT["Yard"],    //U.S. Surveyor's Yard
    "us-ch": SuperMap.INCHES_PER_UNIT["GunterChain"], //U.S. Surveyor's Chain
    "us-mi": SuperMap.INCHES_PER_UNIT["Mile"],   //U.S. Surveyor's Statute Mile
    "ind-yd": SuperMap.INCHES_PER_UNIT["IndianYd37"],  //Indian Yard
    "ind-ft": SuperMap.INCHES_PER_UNIT["IndianFt37"],  //Indian Foot
    "ind-ch": 20.11669506 / SuperMap.METERS_PER_INCH  //Indian Chain
});

/** 
 * APIProperty: DOTS_PER_INCH
 * {SuperMap.DOTS_PER_INCH} 分辨率与比例尺之间转换的常量，默认值72。
 */
SuperMap.DOTS_PER_INCH = 96;

/**
 * Function: normalizeScale
 * 
 * Parameters:
 * scale - {float}
 * 
 * Returns:
 * {Float} A normalized scale value, in 1 / X format. 
 *         This means that if a value less than one ( already 1/x) is passed
 *         in, it just returns scale directly. Otherwise, it returns 
 *         1 / scale
 */
SuperMap.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) 
                                  : scale;
    return normScale;
};

/**
 * Function: getResolutionFromScale
 * 
 * Parameters:
 * scale - {Float}
 * units - {String} Index into SuperMap.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Returns:
 * {Float} The corresponding resolution given passed-in scale and unit 
 *     parameters.  If the given scale is falsey, the returned resolution will
 *     be undefined.
 */
SuperMap.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = SuperMap.Util.normalizeScale(scale);
        resolution = 1 / (normScale * SuperMap.INCHES_PER_UNIT[units]
                                        * SuperMap.DOTS_PER_INCH);        
    }
    return resolution;
};

/**
 * Function: getScaleFromResolution
 * 
 * Parameters:
 * resolution - {Float}
 * units - {String} Index into SuperMap.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Returns:
 * {Float} The corresponding scale given passed-in resolution and unit 
 *         parameters.
 */
SuperMap.Util.getScaleFromResolution = function (resolution, units) {

    if (units == null) {
        units = "degrees";
    }

    var scale = resolution * SuperMap.INCHES_PER_UNIT[units] *
                    SuperMap.DOTS_PER_INCH;
    return scale;
};

/**
 * Function: pagePosition
 * Calculates the position of an element on the page (see
 * http://code.google.com/p/doctype/wiki/ArticlePageOffset)
 *
 * SuperMap.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 * 
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * Parameters:
 * forElement - {DOMElement}
 * 
 * Returns:
 * {Array} two item array, Left value then Top value.
 */
SuperMap.Util.pagePosition =  function(forElement) {
    // NOTE: If element is hidden (display none or disconnected or any the
    // ancestors are hidden) we get (0,0) by default but we still do the
    // accumulation of scroll position.

    var pos = [0, 0];
    var viewportElement = SuperMap.Util.getViewportElement();
    if (!forElement || forElement === window || forElement === viewportElement) {
        // viewport is always at 0,0 as that defined the coordinate system for
        // this function - this avoids special case checks in the code below
        return pos;
    }

    // Gecko browsers normally use getBoxObjectFor to calculate the position.
    // When invoked for an element with an implicit absolute position though it
    // can be off by one. Therefore the recursive implementation is used in
    // those (relatively rare) cases.
    var BUGGY_GECKO_BOX_OBJECT =
        SuperMap.IS_GECKO && document.getBoxObjectFor &&
        SuperMap.Element.getStyle(forElement, 'position') === 'absolute' &&
        (forElement.style.top == '' || forElement.style.left == '');

    var parent = null;
    var box;

    if (forElement.getBoundingClientRect) { // IE
        box = forElement.getBoundingClientRect();
        var scrollTop = viewportElement.scrollTop;
        var scrollLeft = viewportElement.scrollLeft;

        pos[0] = box.left + scrollLeft;
        pos[1] = box.top + scrollTop;

    } else if (document.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) { // gecko
        // Gecko ignores the scroll values for ancestors, up to 1.9.  See:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
        // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

        box = document.getBoxObjectFor(forElement);
        var vpBox = document.getBoxObjectFor(viewportElement);
        pos[0] = box.screenX - vpBox.screenX;
        pos[1] = box.screenY - vpBox.screenY;

    } else { // safari/opera
        pos[0] = forElement.offsetLeft;
        pos[1] = forElement.offsetTop;
        parent = forElement.offsetParent;
        if (parent !== forElement) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }

        var browser = SuperMap.Browser.name;

        // opera & (safari absolute) incorrectly account for body offsetTop
        if (browser === "opera" || (browser === "safari" &&
              SuperMap.Element.getStyle(forElement, 'position') === 'absolute')) {
            pos[1] -= document.body.offsetTop;
        }

        // accumulate the scroll positions for everything but the body element
        parent = forElement.offsetParent;
        while (parent && parent !== document.body) {
            pos[0] -= parent.scrollLeft;
            // see https://bugs.opera.com/show_bug.cgi?id=249965
            if (browser !== "opera" || parent.tagName !== 'TR') {
                pos[1] -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }
    
    return pos;
};

/**
 * Function: getViewportElement
 * Returns die viewport element of the document. The viewport element is
 * usually document.documentElement, except in IE,where it is either
 * document.body or document.documentElement, depending on the document's
 * compatibility mode (see
 * http://code.google.com/p/doctype/wiki/ArticleClientViewportElement)
 */
SuperMap.Util.getViewportElement = function() {
    var viewportElement = arguments.callee.viewportElement;
    if (viewportElement == undefined) {
        viewportElement = (SuperMap.Browser.name === "msie" &&
            document.compatMode !== 'CSS1Compat') ? document.body :
            document.documentElement;
        //此处多余且不规范，暂时注释 by jinjianbo
		//arguments.callee.viewportElement = viewportElement;
    }
    return viewportElement;
};

/** 
 * Function: isEquivalentUrl
 * Test two URLs for equivalence. 
 * 
 * Setting 'ignoreCase' allows for case-independent comparison.
 * 
 * Comparison is based on: 
 *  - Protocol
 *  - Host (evaluated without the port)
 *  - Port (set 'ignorePort80' to ignore "80" values)
 *  - Hash ( set 'ignoreHash' to disable)
 *  - Pathname (for relative <-> absolute comparison) 
 *  - Arguments (so they can be out of order)
 *  
 * Parameters:
 * url1 - {String}
 * url2 - {String}
 * options - {Object} Allows for customization of comparison:
 *                    'ignoreCase' - Default is True
 *                    'ignorePort80' - Default is True
 *                    'ignoreHash' - Default is True
 *
 * Returns:
 * {Boolean} Whether or not the two URLs are equivalent
 */
SuperMap.Util.isEquivalentUrl = function(url1, url2, options) {
    options = options || {};

    SuperMap.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });

    var urlObj1 = SuperMap.Util.createUrlObject(url1, options);
    var urlObj2 = SuperMap.Util.createUrlObject(url2, options);

    //compare all keys except for "args" (treated below)
    for(var key in urlObj1) {
        if(key !== "args") {
            if(urlObj1[key] !== urlObj2[key]) {
                return false;
            }
        }
    }

    // compare search args - irrespective of order
    for(var key in urlObj1.args) {
        if(urlObj1.args[key] !== urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    // urlObj2 shouldn't have any args left
    for(var key in urlObj2.args) {
        return false;
    }
    
    return true;
};

/**
 * Function: createUrlObject
 * 
 * Parameters:
 * url - {String}
 * options - {Object} A hash of options.  Can be one of:
 *            ignoreCase: lowercase url,
 *            ignorePort80: don't include explicit port if port is 80,
 *            ignoreHash: Don't include part of url after the hash (#).
 * 
 * Returns:
 * {Object} An object with separate url, a, port, host, and args parsed out 
 *          and ready for comparison
 */
SuperMap.Util.createUrlObject = function(url, options) {
    options = options || {};

    // deal with relative urls first
    if(!(/^\w+:\/\//).test(url)) {
        var loc = window.location;
        var port = loc.port ? ":" + loc.port : "";
        var fullUrl = loc.protocol + "//" + loc.host.split(":").shift() + port;
        if(url.indexOf("/") === 0) {
            // full pathname
            url = fullUrl + url;
        } else {
            // relative to current path
            var parts = loc.pathname.split("/");
            parts.pop();
            url = fullUrl + parts.join("/") + "/" + url;
        }
    }
  
    if (options.ignoreCase) {
        url = url.toLowerCase(); 
    }

    var a = document.createElement('a');
    a.href = url;
    
    var urlObject = {};
    
    //host (without port)
    urlObject.host = a.host.split(":").shift();

    //protocol
    urlObject.protocol = a.protocol;  

    //port (get uniform browser behavior with port 80 here)
    if(options.ignorePort80) {
        urlObject.port = (a.port === "80" || a.port == "0") ? "" : a.port;
    } else {
        urlObject.port = (a.port == "" || a.port == "0") ? "80" : a.port;
    }

    //hash
    urlObject.hash = (options.ignoreHash || a.hash === "#") ? "" : a.hash;  
    
    //args
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark !== -1) ? url.substr(qMark) : "";
    }
    urlObject.args = SuperMap.Util.getParameters(queryString);

    //pathname (uniform browser behavior with leading "/")
    urlObject.pathname = (a.pathname.charAt(0) === "/") ? a.pathname : "/" + a.pathname;
    
    return urlObject; 
};
 
/**
 * Function: removeTail
 * Takes a url and removes everything after the ? and #
 * 
 * Parameters:
 * url - {String} The url to process
 * 
 * Returns:
 * {String} The string with all queryString and Hash removed
 */
SuperMap.Util.removeTail = function(url) {
    var head = null;
    
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");

    if (qMark == -1) {
        head = (hashMark !== -1) ? url.substr(0,hashMark) : url;
    } else {
        head = (hashMark !== -1) ? url.substr(0,Math.min(qMark, hashMark))
                                  : url.substr(0, qMark);
    }
    return head;
};

/**
 * Constant: IS_GECKO
 * {SuperMap.IS_GECKO} 如果userAgent捕获到浏览器使用的是Gecko引擎则返回true。
 */
SuperMap.IS_GECKO = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
})();

/**
 * Constant: Browser
 * {SuperMap.Browser}
 * 浏览器名称，依赖于userAgent属性，BROWSER_NAME可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 */
SuperMap.Browser = (function() {
        var name = '', version = '', device = 'pc', uaMatch;
        //以下进行测试
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("msie")>-1 || (ua.indexOf("trident")>-1 && ua.indexOf("rv")>-1)) {
            name = 'msie';
            uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
        } else if (ua.indexOf("chrome")>-1) {
            name = 'chrome';
            uaMatch = ua.match(/chrome\/([\d.]+)/);
        } else if (ua.indexOf("firefox")>-1) {
            name = 'firefox';
            uaMatch = ua.match(/firefox\/([\d.]+)/);
        } else if (ua.indexOf("opera")>-1) {
            name = 'opera';
            uaMatch = ua.match(/version\/([\d.]+)/);
        } else if (ua.indexOf("safari")>-1) {
            name = 'safari';
            uaMatch = ua.match(/version\/([\d.]+)/);
        }
        version = uaMatch ? uaMatch[1] : '';

        if (ua.indexOf("ipad")>-1 || ua.indexOf("ipod")>-1 || ua.indexOf("iphone")>-1) {
            device = 'apple';
        } else if (ua.indexOf("android")>-1) {
            uaMatch = ua.match(/version\/([\d.]+)/);
            version = uaMatch ? uaMatch[1] : '';
            device = 'android';
        }
        return {name: name, version: version, device: device};
})();

/**
 * APIFunction: getBrowser
 * 
 * Returns:
 * {Object} 获取浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
 * 
 *           支持的浏览器包括：
 *           * 'opera' -- Opera
 *           * 'msie'  -- Internet Explorer
 *           * 'safari' -- Safari
 *           * 'firefox' -- Firefox
 */
SuperMap.Util.getBrowser = function() {
    return SuperMap.Browser;
};

SuperMap.Util.isSupportCanvas =(function() {
    var checkRes = true, broz = SuperMap.Util.getBrowser();
    if(document.createElement("canvas").getContext) {
        if(broz.name === 'firefox' && parseFloat(broz.version) < 5) {
            checkRes = false;
        }
        if(broz.name === 'safari' && parseFloat(broz.version) < 4) {
            checkRes = false;
        }
        if(broz.name === 'opera' && parseFloat(broz.version) < 10) {
            checkRes = false;
        }
        if(broz.name === 'msie' && parseFloat(broz.version) < 9) {
            checkRes = false;
        }
    } else {
        checkRes = false;
    }
    return checkRes;
})();

/**
 * Function: supportCanvas
 * Returns:
 * {Boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
SuperMap.Util.supportCanvas = function() {
    return SuperMap.Util.isSupportCanvas;
};

/**
 * Method: getRenderedDimensions
 * Renders the contentHTML offscreen to determine actual dimensions for
 *     popup sizing. As we need layout to determine dimensions the content
 *     is rendered -9999px to the left and absolute to ensure the 
 *     scrollbars do not flicker
 *     
 * Parameters:
 * contentHTML
 * size - {<SuperMap.Size>} If either the 'w' or 'h' properties is 
 *     specified, we fix that dimension of the div to be measured. This is 
 *     useful in the case where we have a limit in one dimension and must 
 *     therefore meaure the flow in the other dimension.
 * options - {Object}
 *
 * Allowed Options:
 *     displayClass - {String} Optional parameter.  A CSS class name(s) string
 *         to provide the CSS context of the rendered content.
 *     containerElement - {DOMElement} Optional parameter. Insert the HTML to 
 *         this node instead of the body root when calculating dimensions. 
 * 
 * Returns:
 * {SuperMap.Size}
 */
SuperMap.Util.getRenderedDimensions = function(contentHTML, size, options) {
    
    var w, h;
    
    // create temp container div with restricted size
    var container = document.createElement("div");
    container.style.visibility = "hidden";
        
    var containerElement = (options && options.containerElement) 
        ? options.containerElement : document.body;

    // Opera and IE7 can't handle a node with position:aboslute if it inherits
    // position:absolute from a parent.
    var parentHasPositionAbsolute = false;
    var superContainer = null;
    var parent = containerElement;
    while (parent && parent.tagName.toLowerCase()!=="body") {
        var parentPosition = SuperMap.Element.getStyle(parent, "position");
        if(parentPosition === "absolute") {
            parentHasPositionAbsolute = true;
            break;
        } else if (parentPosition && parentPosition !== "static") {
            break;
        }
        parent = parent.parentNode;
    }
    /*if(parentHasPositionAbsolute && (containerElement.clientHeight === 0 ||
        containerElement.clientWidth === 0) ){
        superContainer = document.createElement("div");
        superContainer.style.visibility = "hidden";
        superContainer.style.position = "absolute";
        superContainer.style.overflow = "visible";
        superContainer.style.width = document.body.clientWidth + "px";
        superContainer.style.height = document.body.clientHeight + "px";
        superContainer.appendChild(container);
    }*/
    if(!parentHasPositionAbsolute) {
        container.style.position = "absolute";
    }

    //fix a dimension, if specified.
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px";
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px";
        }
    }

    //add css classes, if specified
    if (options && options.displayClass) {
        container.className = options.displayClass;
    }
    
    // create temp content div and assign content
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    
    // we need overflow visible when calculating the size
    content.style.overflow = "visible";
    if (content.childNodes) {
        for (var i=0, l=content.childNodes.length; i<l; i++) {
            if (!content.childNodes[i].style) continue;
            content.childNodes[i].style.overflow = "visible";
        }
    }
    
    // add content to restricted container 
    container.appendChild(content);
    
    // append container to body for rendering
    containerElement.appendChild(container);

    // append container to body for rendering
    /*if (superContainer) {
        containerElement.appendChild(superContainer);
    } else {
        containerElement.appendChild(container);
    }*/
    containerElement.appendChild(container);
    // calculate scroll width of content and add corners and shadow width
    if (!w) {
        w = parseInt(content.scrollWidth);
    
        // update container width to allow height to adjust
        container.style.width = w + "px";
    }        
    // capture height and add shadow and corner image widths
    if (!h) {
        h = parseInt(content.scrollHeight);
    }

    // remove elements
    container.removeChild(content);
    
    containerElement.removeChild(container);
    
    return new SuperMap.Size(w, h);
};

/**
 * APIFunction: getScrollbarWidth
 * 
 * Returns:
 * {Integer} 返回scrollbarWidth。
 */
SuperMap.Util.getScrollbarWidth = function() {
    
    var scrollbarWidth = SuperMap.Util._scrollbarWidth;
    
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
    
        // Outer scrolling div
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        // Start with no scrollbar
        scr.style.overflow = 'hidden';
    
        // Inner content div
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
    
        // Put the inner div in the scrolling div
        scr.appendChild(inn);
        // Append the scrolling div to the doc
        document.body.appendChild(scr);
    
        // Width of the inner div sans scrollbar
        wNoScroll = inn.offsetWidth;
    
        // Add the scrollbar
        scr.style.overflow = 'scroll';
        // Width of the inner div width scrollbar
        wScroll = inn.offsetWidth;
    
        // Remove the scrolling div from the doc
        document.body.removeChild(document.body.lastChild);
    
        // Pixel width of the scroller
        SuperMap.Util._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = SuperMap.Util._scrollbarWidth;
    }

    return scrollbarWidth;
};

/**
 * APIFunction: getFormattedLonLat
 * 格式化字符串。
 * Parameters:
 * coordinate - {Float} 要格式化的坐标值。
 * axis - {String} 将要被格式化的axis，可以是经度，纬度，默认为纬度，经度则为"lon"。
 * dmsOption - {String} 指定的输出精度，可以是：
 *           'dms'显示度、分、秒；
 *           'dm'显示度、分；
 *           'd'显示度；
 * 
 * Returns:
 * {String} 格式化为字符串的坐标值。
 */
SuperMap.Util.getFormattedLonLat = function(coordinate, axis, dmsOption) {
    if (!dmsOption) {
        dmsOption = 'dms';    //default to show degree, minutes, seconds
    }
    
    coordinate = (coordinate+540)%360 - 180; // normalize for sphere being round
    
    var abscoordinate = Math.abs(coordinate);
    var coordinatedegrees = Math.floor(abscoordinate);

    var coordinateminutes = (abscoordinate - coordinatedegrees)/(1/60);
    var tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    var coordinateseconds = (tempcoordinateminutes - coordinateminutes)/(1/60);
    coordinateseconds =  Math.round(coordinateseconds*10);
    coordinateseconds /= 10;

    if( coordinateseconds >= 60) { 
        coordinateseconds -= 60; 
        coordinateminutes += 1; 
        if( coordinateminutes >= 60) { 
            coordinateminutes -= 60; 
            coordinatedegrees += 1; 
        } 
    }
    
    if( coordinatedegrees < 10 ) {
        coordinatedegrees = "0" + coordinatedegrees;
    }
    var str = coordinatedegrees + "\u00B0";

    if (dmsOption.indexOf('dm') >= 0) {
        if( coordinateminutes < 10 ) {
            coordinateminutes = "0" + coordinateminutes;
        }
        str += coordinateminutes + "'";
  
        if (dmsOption.indexOf('dms') >= 0) {
            if( coordinateseconds < 10 ) {
                coordinateseconds = "0" + coordinateseconds;
            }
            str += coordinateseconds + '"';
        }
    }
    
    if (axis === "lon") {
        str += coordinate < 0 ? SuperMap.i18n("W") : SuperMap.i18n("E");
    } else {
        str += coordinate < 0 ? SuperMap.i18n("S") : SuperMap.i18n("N");
    }
    return str;
};

//将服务端的地图单位转成SuperMap的地图单位
SuperMap.INCHES_PER_UNIT["degree"] = SuperMap.INCHES_PER_UNIT.dd;
SuperMap.INCHES_PER_UNIT["meter"] = SuperMap.INCHES_PER_UNIT.m;
SuperMap.INCHES_PER_UNIT["foot"] = SuperMap.INCHES_PER_UNIT.ft;
SuperMap.INCHES_PER_UNIT["inch"] = SuperMap.INCHES_PER_UNIT.inches;
SuperMap.INCHES_PER_UNIT["mile"] = SuperMap.INCHES_PER_UNIT.mi;
SuperMap.INCHES_PER_UNIT["kilometer"] = SuperMap.INCHES_PER_UNIT.km;
SuperMap.INCHES_PER_UNIT["yard"] = SuperMap.INCHES_PER_UNIT.yd;
 
 /**
 * Function: SuperMap.Util.isInTheSameDomain
 * 判断一个 URL 请求是否在当前域中。  
 *
 * Parameters:
 * url - {String}  URL 请求字符串。 
 *
 * Returns:
 * {Boolean} URL 请求是否在当前域中。
 */
SuperMap.Util.isInTheSameDomain = function (url) {
    if (!url) {
        return true;
    }
    var index = url.indexOf("//");
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf("//");
    if (index === -1) {
        return true;
    } else {
        var substring = url.substring(0, index);
        var documentSubString = documentUrl.substring(documentIndex + 2);
        documentIndex = documentSubString.indexOf("/");
        var documentDomainWithPort = documentSubString.substring(0, documentIndex);
        var documentprotocol = document.location.protocol;
        if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
            return false;
        }
        substring = url.substring(index + 2);
        var portIndex = substring.indexOf(":");
        index = substring.indexOf("/");
        var domain = substring.substring(0, portIndex);
        var domainWithPort = substring.substring(0, index);
        var documentDomain = document.domain;
        if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
            return true;
        }
    }
    return false;
};

/**
 * APIFunction: SuperMap.Util.calculateDpi
 * 计算iServer服务的REST图层的显示分辨率，需要从iServer的REST图层表述中获取viewBounds、viewer、scale、coordUnit、datumAxis 五个参数，
 * 来进行计算。
 *
 * Parameters:
 * viewBounds - {<SuperMap.Bounds>} 地图的参照可视范围，即地图初始化时默认的地图显示范围。 
 * viewer - {<SuperMap.Size>} 地图初始化时默认的地图图片的尺寸。
 * scale - {Number} 地图初始化时默认的显示比例尺。
 * coordUnit - {String} 投影坐标系统的地图单位。
 * datumAxis - {Number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，
 * 则系统默认为WGS84参考系的椭球体长半轴6378137。
 *
 * Returns:
 * {Number} 返回图层显示分辨率。
 */
SuperMap.Util.calculateDpi = function (viewBounds, viewer, scale, coordUnit, datumAxis){
    //10000 是 0.1毫米与米的转换。DPI的计算公式：Viewer / DPI *  0.0254 * 10000 = ViewBounds * scale ，公式中的10000是为了提高计算结果的精度，以下出现的ratio皆为如此。
    if (!viewBounds || !viewer || !scale) {
        return;
    }
    var ratio = 10000,
        rvbWidth = viewBounds.getWidth(),
        rvbHeight = viewBounds.getHeight(),
        rvWidth = viewer.w,
        rvHeight = viewer.h;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "degrees";
    if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
        var num1 = rvbWidth / rvWidth,
            num2 = rvbHeight / rvHeight,
            resolution = num1 > num2 ? num1 : num2,
            dpi = 0.0254 * ratio / resolution / scale/ ((Math.PI * 2 * datumAxis) / 360) / ratio;
        return dpi;
    } else {
        var resolution = rvbWidth / rvWidth,
            dpi = 0.0254 * ratio / resolution / scale / ratio;
        return dpi;
    }
}; 
 
/**
 * APIFunction: SuperMap.Util.toJSON
 * 将对象转换成 JSON 字符串。  
 *
 * Parameters:
 * obj - {Object} 要转换成 JSON 的 Object 对象。 
 *
 * Returns:
 * {String} 返回转换后的 JSON 对象。
 */
SuperMap.Util.toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn= objInn.replace(/\n/g,"\\n");
            objInn= objInn.replace(/\r/g,"\\r");
            objInn= objInn.replace("<", "&lt;");
            objInn= objInn.replace(">", "&gt;");
            objInn= objInn.replace(/%/g, "%25");
            objInn= objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for(var i=0,len=objInn.length;i<len;i++) {
                arr.push(SuperMap.Util.toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," + 
                        "'Year':" + objInn.getFullYear() + "," +
                        "'Month':" + (objInn.getMonth() + 1) + "," +
                        "'Day':" + objInn.getDate() + "," +
                        "'Hour':" + objInn.getHours() + "," +
                        "'Minute':" + objInn.getMinutes() + "," +
                        "'Second':" + objInn.getSeconds() + "," + 
                        "'Millisecond':" + objInn.getMilliseconds() + "," +
                        "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;            
        default:
            if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
                return objInn.toJSON();
            }
            if (typeof objInn === "object") {
                if (objInn.length) {
                    var arr = [];
                    for(var i=0,len=objInn.length;i<len;i++)
                        arr.push(SuperMap.Util.toJSON(objInn[i]));
                    return "[" + arr.join(",") + "]";
                }
                var arr=[];
                for (var attr in objInn) {
                    //为解决SuperMap.Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME" && attr !== "parent") {
                        arr.push("'" + attr + "':" + SuperMap.Util.toJSON(objInn[attr]));
                    }
                }

                if (arr.length > 0) {
                    return "{" + arr.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};

/**
 * APIFunction: SuperMap.Util.getResolutionFromScaleDpi
 * 根据比例尺和dpi计算屏幕分辨率。  
 *
 * Parameters:
 * scale - {Number} 比例尺。
 * dpi - {Number} 图像分辨率，表示每英寸内的像素个数。
 * coordUnit - {String} 投影坐标系统的地图单位。
 * datumAxis - {Number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，
 * 则DPI默认按照WGS84参考系的椭球体长半轴6378137来计算。
 *
 * Returns:
 * {Number} 返回当前比例尺下的屏幕分辨率。
 */
SuperMap.Util.getResolutionFromScaleDpi = function (scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (scale > 0 && dpi > 0) {
	    scale = SuperMap.Util.normalizeScale(scale);
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            //scale = SuperMap.Util.normalizeScale(scale);
            resolution = 0.0254 * ratio / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return resolution;
        } else {
            resolution = 0.0254 * ratio / dpi / scale / ratio;
            return resolution;
        }
    }
    return -1;
};

/**
 * APIFunction: SuperMap.Util.getScaleFromResolutionDpi
 * 根据resolution、dpi、coordUnit和datumAxis计算比例尺。  
 *
 * Parameters:
 * resolution - {Number} 用于计算比例尺的地图分辨率。
 * dpi - {Number} 图像分辨率，表示每英寸内的像素个数。
 * coordUnit - {String} 投影坐标系统的地图单位。
 * datumAxis - {Number} 地理坐标系统椭球体长半轴。用户自定义地图的Options时，若未指定该参数的值，
 * 则DPI默认按照WGS84参考系的椭球体长半轴6378137来计算。
 * 
 * Returns:
 * {Number} 返回当前屏幕分辨率下的比例尺。
 */
SuperMap.Util.getScaleFromResolutionDpi = function (resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (resolution > 0 && dpi > 0) {
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            scale = 0.0254 * ratio / dpi / resolution / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return scale;
        } else {
            scale = 0.0254 * ratio / dpi / resolution / ratio;
            return scale;
        }
    }
    return -1;
};

/**
 * Function: SuperMap.Util.urlIsLong
 * 判断一个url字符串的字节长度是否过长。  
 *
 * Parameters:
 * url - {String} url字符串。
 *
 * Returns:
 * {Boolean} url字符串的字节长度是否过长。
 */
SuperMap.Util.urlIsLong = function (url){
    //当前url的字节长度。
    var totalLength = 0,
        charCode = null;
    for (var i=0, len=url.length; i<len; i++) {
        //转化为Unicode编码
        charCode = url.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength++;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        }
    }
    return (totalLength < 2000) ? false : true;
};

/**
 * APIMethod: SuperMap.Util.committer
 * 与服务器进行通信。
 *
 * Parameters:
 * options - {Object} 参数。
 *
 * Allowed options properties:
 * method - {String} 请求方式，包括GET，POST，PUT， DELETE。
 * url - {String} 发送请求的地址。
 * params - {Object} 作为查询字符串添加到url中的一组键值对，此参数只适用于GET方式发送的请求。
 * data - {Object } 除GET请求外其他类型请求，发送到服务器的数据。
 * success - {Function} 请求成功后的回调函数。
 * failure - {Function} 请求失败后的回调函数。
 * scope - {Object} 如果回调函数是对象的一个公共方法，设定该对象的范围。
 * isInTheSameDomain - {Boolean} 请求是否在当前域中。
 */
SuperMap.Util.committer = function (options) {
    if(!options){
        return;
    }

    var url = options.url,
		separator = url.indexOf("?") > -1 ? "&" : "?",
        end = url.substr(url.length - 1, 1);
    
    //判断当前脚本运行于本地上下文中或者是Web上下文中，由于在本地上下文中脚本可以调用Windows运行时，我们姑且使用Windows对象来区分两者
    if (typeof Windows === "undefined") {
        //url编码
        options.url = window.encodeURI(options.url);
        options.isInTheSameDomain = options.isInTheSameDomain || SuperMap.Util.isInTheSameDomain(options.url);
        if (options.isInTheSameDomain){
            if (options.method ==="GET" && options.params) {
                var params = options.params,
                    paramString = SuperMap.Util.getParameterString(params);
                if (SuperMap.Util.urlIsLong(paramString)) {
                    var data = options.data;                
                    options.method = "POST";
                    options.url += separator + "_method=GET";
                    
                    data = "{";
                    for (var key in params) {
                        data += "'" + key + "':" + encodeURIComponent(params[key]) + ",";
                    }
                    data += "}";
                    options.data = data;
                } else {
                    if(paramString.length > 0) {                    
                        url += separator + paramString;
                    }
                    options.url = url;
                }
                delete options.params;
            }
            
            //iServer 6R 服务端只支持["Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"] 的post
            //现在只加在POST的请求头里面，PUT和DELETE有需要再加。
            var headers = options.headers || {};
            options.headers = headers;
            switch (options.method) {
                case "GET":
                    SuperMap.Request.GET(options);
                    break;
                case "POST":
                    headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
                    SuperMap.Request.POST(options);
                    break;
                case "PUT":
                    //options.url += (end === "?") ? "_method=PUT" : "&_method=PUT";
                    headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
                    SuperMap.Request.PUT(options);
                    break;
                case "DELETE":    
                    //options.url += (end === "?") ? "_method=DELETE" : "&_method=DELETE";
                    //同域请求的时候因为使用的方法中标记了请求类型，因此无图添加模拟字段
                    headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
                    SuperMap.Request.DELETE(options);
                    break;
            }
        } else {
            switch (options.method) {
                case "GET":
                    SuperMap.Util.RequestJSONP.GET(options);
                    break;
                case "POST":
                    options.url += separator + "_method=POST";
                    SuperMap.Util.RequestJSONP.POST(options);
                    break;
                case "PUT":
                    options.url += separator + "_method=PUT";
                    SuperMap.Util.RequestJSONP.PUT(options);
                    break;
                case "DELETE":
                    options.url += separator + "_method=DELETE";
                    SuperMap.Util.RequestJSONP.DELETE(options);
                    break;
            }
        }
    } else {
        var urlParams = "", isFirstKey = true;
        if (options.params && options.method === "GET") {
            for (var key in options.params) {
                if (!isFirstKey) {
                    urlParams += "&" + key + "=" + options.params[key];
                } else {
                    isFirstKey = false;
                    urlParams += key + "=" + options.params[key];
                }
            }
        }
        options.url = options.url.replace(/jsonp/, "json");
        if (urlParams) {
            options.url += separator + urlParams;
        }
        options.url = window.encodeURI(options.url);
        WinJS.xhr({
            url: options.url,
            type: options.method,
            data: options.data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function (result) {
            var success = (options.scope) ? SuperMap.Function.bind(options.success, options.scope) : options.success;
            success(result);
        }, function (error) {
            var failure = (options.scope) ? SuperMap.Function.bind(options.failure, options.scope) : options.failure;
            failure(error);
        });
    }
};

SuperMap.Util.RequestJSONP = {
    limitLength: 1500,
    queryKeys: [],
    queryValues: [],
    supermap_callbacks: {},
    addQueryStrings: function(values) {
        var me = this;
        for (var key in values) {
            me.queryKeys.push(key);
            if (typeof values[key] !== "string") {
                values[key] = SuperMap.Util.toJSON(values[key]);
            }
            var tempValue = encodeURIComponent(values[key]);
            //防止将“=”先转义成%3D后，下文无法将其再转换成“&eq;”
            // tempValue = tempValue.replace("%3D", "&eq;");              
            me.queryValues.push(tempValue);
            /*if (document.attachEvent) {
                var tempValue = encodeURIComponent(values[i]);
                //防止将“=”先转义成%3D后，下文无法将其再转换成“&eq;”
                tempValue = tempValue.replace("%3D", "&eq;");              
                me.queryValues.push(tempValue);
            
            } else {
                var tempValue = encodeURIComponent(values[i]);
                //防止将“=”先转义成%3D后，下文无法将其再转换成“&eq;”
                tempValue = tempValue.replace("%3D", "&eq;");              
                me.queryValues.push(tempValue);
            }*/
        }
    },
    issue: function(config) {
        //url, method, params, data, scope, success, failure, userContext,isInTheSameDomain
        var me = this,
            uid = me.getUid(),
            url = config.url,
            success = null,
            failure = null,
            splitQuestUrl = [];
        if(config.success) {
            success = (config.scope) ?
                SuperMap.Function.bind(config.success, config.scope) :
                config.success;
        }
        if(config.failure) {
            failure = (config.scope) ?
                SuperMap.Function.bind(config.failure, config.scope) :
                config.failure;
        }
        me.supermap_callbacks[uid] = function(json) {
            var result = SuperMap.Util.transformResult(json);
            result.succeed = result.succeed == undefined ? true : result.succeed;
            if (result.succeed && success) {
                success(json);
            } else if (failure) {
                failure(json);
            }
            delete me.supermap_callbacks[uid];
        };
        me.addQueryStrings({callback: "SuperMap.Util.RequestJSONP.supermap_callbacks[" + uid + "]"});
        var queryKeys = me.queryKeys,
            sectionURL = url,
            keysCount = 0;//此次sectionURL中有多少个key
        var length = me.queryKeys ? me.queryKeys.length : 0;
        for (var i = 0; i < length; i++) {
            if (sectionURL.length + me.queryKeys[i].length + 2 >= me.limitLength) {//+2 for ("&"or"?")and"="
                if (keysCount == 0) { return false; }
                if (splitQuestUrl == null) {
                    splitQuestUrl = new Array();
                }
                splitQuestUrl.push(sectionURL);
                sectionURL = url;
                keysCount = 0;
                i--;
            } else {
                if (sectionURL.length + me.queryKeys[i].length + 2 + me.queryValues[i].length > me.limitLength) {
                    var leftValue = me.queryValues[i];
                    while (leftValue.length > 0) {
                        var leftLength = me.limitLength - sectionURL.length - me.queryKeys[i].length - 2;//+2 for ("&"or"?")and"="
                        if (sectionURL.indexOf("?") > -1) {
                            sectionURL += "&";
                        } else {
                            sectionURL += "?";
                        }
                        var tempLeftValue = leftValue.substring(0, leftLength);
                        //避免 截断sectionURL时，将类似于%22这样的符号截成两半，从而导致服务端组装sectionURL时发生错误
                        if(tempLeftValue.substring(leftLength-1, leftLength) === "%"){
                            leftLength -= 1;
                            tempLeftValue = leftValue.substring(0, leftLength);
                        }
                        else if(tempLeftValue.substring(leftLength-2, leftLength-1) === "%"){
                            leftLength -= 2;
                            tempLeftValue = leftValue.substring(0, leftLength);
                        }

                        sectionURL += me.queryKeys[i] + "=" + tempLeftValue;
                        leftValue = leftValue.substring(leftLength);
                        if (tempLeftValue.length > 0) {
                            if (splitQuestUrl == null) {
                                splitQuestUrl = new Array();
                            }
                            splitQuestUrl.push(sectionURL);
                            sectionURL = url;
                            keysCount = 0;
                        }
                    }
                } else {
                    keysCount++;
                    if (sectionURL.indexOf("?") > -1) {
                        sectionURL += "&";
                    } else {
                        sectionURL += "?";
                    }
                    var tempLeftValue = me.queryValues[i];
                    sectionURL += me.queryKeys[i] + "=" + tempLeftValue;
                }
            }
        }
        if (splitQuestUrl == null) {
            splitQuestUrl = new Array();
        }
        sectionURL !== url && splitQuestUrl.push(sectionURL);
        me.send(splitQuestUrl);
    },

    
    getUid: function() {
        var uid = new Date().getTime(),
            random = Math.floor(Math.random() * 1e17);
        return uid * 1000 + random;
    },
    
    send: function(splitQuestUrl) {
        var len = splitQuestUrl.length;
        if (len > 0) {
            var jsonpUserID = new Date().getTime();
            for (var i = 0; i < len; i++) {
                var script = document.createElement("script");
                var url = splitQuestUrl[i];
                if (url.indexOf("?") > -1) {
                    url += "&";
                } else {
                    url += "?";
                }
                url += "sectionCount=" + len;
                url += "&sectionIndex=" + i;
                url += "&jsonpUserID=" + jsonpUserID;
                script.setAttribute("src", url);
                script.setAttribute("type", "text/javascript");
                
                if (navigator.userAgent.indexOf("IE") >= 0) {
                    script.onreadystatechange = function() {
                        if (this && ("loaded" === this.readyState || "complete" === this.readyState)) {
                            this.onreadystatechange = null;
                            try {
                                document.body.removeChild(this);
                            } catch(e) {
                                if (this.parentNode) {
                                    this.parentNode.removeChild(this);
                                }
                                delete this;
                            }
                        }
                    };
                } else {
                    script.onload = function() {
                        this.onload = null;
                        document.body.removeChild(this);
                    };
                }
                document.body.appendChild(script);
            }    
        }
    },
    
    GET: function(config) {
        var me = this;
        me.queryKeys.length = 0;
        me.queryValues.length = 0;
        me.addQueryStrings(config.params);
        me.issue(config);
    },
    
    POST: function(config) {
        var me = this;
        me.queryKeys.length = 0;
        me.queryValues.length = 0;
        me.addQueryStrings({requestEntity: config.data});
        me.issue(config);
    },
    
    PUT: function(config) {
        var me = this;
        me.queryKeys.length = 0;
        me.queryValues.length = 0;
        me.addQueryStrings({requestEntity: config.data});
        me.issue(config);
    },
    DELETE: function(config) {
        var me = this;
        me.queryKeys.length = 0;
        me.queryValues.length = 0;
        me.addQueryStrings({requestEntity: config.data});
        me.issue(config);
    }
};

/**
 * Function: SuperMap.Util.transformResult
 * 转换查询结果。
 *
 * Parameters:
 * result - {Object} 查询结果。
 *
  * Returns:
 * {Object} 转换后的查询结果。
 */
SuperMap.Util.transformResult = function (result) {
    if (result.responseText && typeof result.responseText === "string") {
        //支持JSON对象的浏览器Firefox 3.1 + ，IE 8 RC1 +
        if(typeof JSON != 'undefined' && JSON.parse){
            result = JSON.parse(result.responseText);
        }else{
            result = eval("("+result.responseText+")");
        }
    }
    return result;
};

/**
 * Function: SuperMap.Util.copyAttributes
 * 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
 *
 * Parameters:
 * destination - {Object} 拷贝目标。
 * source {Object} 属性拷贝源对象。
 * 
 */
SuperMap.Util.copyAttributes = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * APIFunction: SuperMap.Util.copyAttributesWithClip
 * 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
 *
 * Parameters:
 * destination - {Object} 目标对象。
 * source - {Object} 源对象。
 * clip - {Array{String}} 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
 *
 */
SuperMap.Util.copyAttributesWithClip = function(destination, source, clip) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            //去掉禁止拷贝的属性
            var isInClip = false;
            if(clip && clip.length){
                for(var i = 0, len = clip.length; i < len; i++){
                    if(property === clip[i]){
                        isInClip = true;
                        break;
                    }
                }
            }
            if(isInClip === true){
                continue;
            }

            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * Function: SuperMap.Util.JSONClone
 * JSON对象拷贝，所有新属性信息等。
 *
 * Parameters:
 * destination - {Object} 拷贝目标。
 * source {Object} 属性拷贝源对象。
 * 
 */
SuperMap.Util.JSONClone = function (destination, source) {
    destination = destination || {};
    if (source) {
        if(source instanceof Array){
            destination = [];
            for(var index = 0, len = source.length; index < len; index++){
                var iObject = source[index];
                destination.push( SuperMap.Util.JSONClone({}, iObject))
            }
        }else{
            for (var property in source) {
                var value = source[property];
                if (typeof value === "object") {
                    var tempObj = {};
                    destination[property] = SuperMap.Util.JSONClone(tempObj, value);
                }
                destination[property] = value;
            }
        }
    }
    return destination;
};
/**
 * Function: SuperMap.Util.setApp
 * 设置该应用为移动端应用。
 *
 * Parameters:
 * isApp - {Boolean}  是否是移动项目。
 * 
 */
SuperMap.Util.setApp = function(isApp){
    SuperMap.isApp = !!isApp;
}
/**
 * APIMethod: SuperMap.Util.cloneObject
 * 克隆一份Object对象
 *
 * Parameters:
 * object - {Object}  需要克隆的对象。
 *  Returns:
 *  {Object} 返回对象的拷贝对象，注意是新的对象，不是指向
 */
SuperMap.Util.cloneObject = function(obj){
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = obj.slice(0);
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
            {
                copy[attr] = SuperMap.Util.cloneObject(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * Method: SuperMap.Util.lineIntersection
 * 判断两条线段是不是有交点
 *
 * Parameters:
 * a1 - {SuperMap.Geometry.Point}  第一条线段的起始节点。
 * a2 - {SuperMap.Geometry.Point}  第一条线段的结束节点。
 * b1 - {SuperMap.Geometry.Point}  第二条线段的起始节点。
 * b2 - {SuperMap.Geometry.Point}  第二条线段的结束节点。
 *  Returns:
 *  {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系
 */
SuperMap.Util.lineIntersection = function(a1,a2,b1,b2){
    var intersectValue = null;
    var k1;
    var k2;
    var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    //ab==0代表两条线断的斜率一样
    if (ab != 0)
    {
        k1 = b / ab;
        k2 = a / ab;

        if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0)
        {
            intersectValue = new SuperMap.Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
        }
        else
        {
            intersectValue = "No Intersection";
        }
    }
    else
    {

        if (b == 0 && a == 0)
        {
            var maxy = Math.max(a1.y, a2.y);
            var miny = Math.min(a1.y, a2.y);
            var maxx = Math.max(a1.x, a2.x);
            var minx = Math.min(a1.x, a2.x);
            if(((b1.y >= miny && b1.y <= maxy) || (b2.y >= miny && b2.y <= maxy)) &&
                (b1.x >= minx && b1.x <= maxx) || (b2.x >= minx && b2.x <= maxx))
            {
                intersectValue = "Coincident";//重合
            }
            else
            {
                intersectValue = "Parallel";//平行
            }

        }
        else
        {
            intersectValue = "Parallel";//平行
        }
    }
    return intersectValue;
}

/**
 * Method: SuperMap.Util.clipLineRect
 * 用矩形对线段进行裁剪
 *
 * Parameters:
 * startPt - {SuperMap.Geometry.Point}  线段的起始节点。
 * endPt - {SuperMap.Geometry.Point}  线段的结束节点。
 * rect - {SuperMap.Bounds}  矩形。
 *  Returns:
 *  {Array} 返回交点（SuperMap.Geometry.Point）数组（可能是0个、1个或2个）
 */
SuperMap.Util.clipLineRect = function(startPt, endPt, rect){
    var aryRect = [];
    var lbPoint = new SuperMap.Geometry.Point(rect.left, rect.bottom);
    var rtPoint = new SuperMap.Geometry.Point(rect.right, rect.top);
    var rbPoint = new SuperMap.Geometry.Point(rect.right, rect.bottom);
    var ltPoint = new SuperMap.Geometry.Point(rect.left, rect.top);

    var aryPoints = [];
    aryPoints.push(SuperMap.Util.lineIntersection(lbPoint, rbPoint, startPt, endPt));
    aryPoints.push(SuperMap.Util.lineIntersection(rbPoint, rtPoint, startPt, endPt));
    aryPoints.push(SuperMap.Util.lineIntersection(rtPoint, ltPoint, startPt, endPt));
    aryPoints.push(SuperMap.Util.lineIntersection(ltPoint, lbPoint, startPt, endPt));

    var i = 0;
    while (i < aryPoints.length)
    {
        if (aryPoints[i].CLASS_NAME === "SuperMap.Geometry.Point")
        {
            aryRect.push(aryPoints[i]);
        }
        i++;
    }
    return aryRect;
}
/**
 * Method: SuperMap.Util.clipLineStringRect
 * 用矩形对LineString或LinearRing进行裁剪
 *
 * Parameters:
 * lineStr - {SuperMap.Geometry.LineString}  需要进行裁剪的线串（也可以是LinearRing）。
 * rect - {SuperMap.Bounds}  矩形。
 * isRetArr - {Boolean} 是否返回LineString的数组形式，默认为true。一般情况矩形裁剪线后都可能是多段的，所以数组形式比较合理，如果设置为false，那么返回一条折线，中间断开部分会连接起来
 * isCloneId - {Boolean} 是否将裁剪前的线的id赋值给裁剪后的线，此属性默认为false，并且只有isRetArr设置为false时此属性才能设置为ture
 *  Returns:
 *  {Array} 返回线串（SuperMap.Geometry.LineString）数组（里面的线串都是一条线段）
 */
SuperMap.Util.clipLineStringRect = function(lineStr,rect,isRetArr,isCloneId){
    isRetArr = isRetArr != undefined ? isRetArr : true;
    isCloneId = isCloneId != undefined ? isCloneId : false;
    //不相交返回null
    if(!rect.intersectsBounds(lineStr.getBounds()))
    {
        return null;
    }
    //图形在矩形内部直接返回
    if(rect.containsBounds(lineStr.getBounds()))
    {
        return [lineStr];
    }
    var points = lineStr.components;
    var lineStringResult = [];
    for(var i = 0;i<points.length-1;i++)
    {
        var point1 = new SuperMap.Geometry.Point(points[i].x,points[i].y);
        var point2 = new SuperMap.Geometry.Point(points[i+1].x,points[i+1].y);
        var array = SuperMap.Util.clipLineRect(point1,point2,rect);
        var line;
        //两个交点直接存入
        if(array.length === 2)
        {
            //两个交点的时候必须拍一下顺序，因为在求交的时候没有考虑交点的先后顺序
            if(((array[0].x - point1.x)*(array[0].x - point1.x) + (array[0].y - point1.y)*(array[0].y- point1.y)) > ((array[1].x - point1.x)*(array[1].x - point1.x) + (array[1].y - point1.y)*(array[1].y- point1.y)))
            {
                //如果第一个交点里裁剪起始点远，则把两个交点交换位置
                var a = array[0];
                array[0] = array[1];
                array[1] = a;
            }
            if(isRetArr)
            {
                line = new SuperMap.Geometry.LineString(array);
                lineStringResult.push(line);
            }
            else
            {
                lineStringResult.push(array[0],array[1]);
            }
        }
        //一个交点，需要保留内部的点
        else if(array.length === 1)
        {
            //存起始点和相交点
            //不包含边界，因为可能出现刚好是端点相交于边界
            if(rect.contains(point1.x,point1.y,false))
            {
                if(isRetArr)
                {
                    line = new SuperMap.Geometry.LineString([point1,array[0]]);
                    lineStringResult.push(line);
                }
                else
                {
                    lineStringResult.push(point1,array[0]);
                }
            }
            //存相交点和结束点
            //不包含边界，因为可能出现刚好是端点相交于边界
            else if(rect.contains(point2.x,point2.y,false))
            {
                if(isRetArr)
                {
                    line = new SuperMap.Geometry.LineString([array[0],point2]);
                    lineStringResult.push(line);
                }
                else
                {
                    lineStringResult.push(array[0],point2);
                }
            }
            //代表交予矩形的顶点或者是线段的端点相交于矩形边界上，那么就不作处理
            else
            {
            }
        }
        //没有交点有两种情况，在外面或者在里面
        else if(array.length == 0)
        {
            //都在里面，包括边界重合，将两个点加进去
            if(rect.contains(point1.x,point1.y) && rect.contains(point2.x,point2.y))
            {
                if(isRetArr)
                {
                    line = new SuperMap.Geometry.LineString([point1,point2]);
                    lineStringResult.push(line);
                }
                else
                {
                    lineStringResult.push(point1,point2);
                }
            }
            //都在外面
            else
            {
            }
        }
    }
    if( lineStringResult.length>0)
    {
        if(!isRetArr)
        {
            var lineString = new  SuperMap.Geometry.LineString(lineStringResult);
            if(isCloneId)
            {
                lineString.id = lineStr.id;
            }
            //此处返回的是一条线
            return lineString;
        }
        else{      //对于多线，id后缀_clip_i
            if(isCloneId){
                lineStringResult[0].id = lineStr.id;
                if(lineStringResult.length>1){
                    for(var i=1;i<lineStringResult.length;i++){
                        lineStringResult[i].id = lineStr.id+"_clip_"+i;
                    }
                }
            }
        }
        //此处返回的是线数组
        return  lineStringResult;
    }

}
/**
 * Method: SuperMap.Util.clipMultiLineStringRect
 * 用矩形对MultiLineString进行裁剪
 *
 * Parameters:
 * multiLineStr - {SuperMap.Geometry.MultiLineString}  需要进行裁剪的多线。
 * rect - {SuperMap.Bounds}  矩形。
 * isRetArr - {Boolean} MultiLineString是由LineString组成的，此处设置内部进行LineString裁剪时是否返回LineString的数组形式，默认为true。一般情况矩形裁剪线后都可能是多段的，所以数组形式比较合理，如果设置为false，那么返回一条折线，中间断开部分会连接起来
 * isCloneId - {Boolean} 是否将裁剪前的线的id赋值给裁剪后的线，此属性默认为false，并且只有isRetArr设置为false时此属性才能设置为ture
 *  Returns:
 *  {SuperMap.Geometry.MultiLineString} 返回多线
 */
SuperMap.Util.clipMultiLineStringRect = function(multiLineStr,rect,isRetArr,isCloneId){
    isRetArr = isRetArr != undefined ? isRetArr : true;
    isCloneId = isCloneId != undefined ? isCloneId : false;
    //不相交返回null
    if(!rect.intersectsBounds(multiLineStr.getBounds()))
    {
        return null;
    }
    //图形在矩形内部直接返回
    if(rect.containsBounds(multiLineStr.getBounds()))
    {
        return multiLineStr;
    }
    var lineStrs = multiLineStr.components;
    var result = [];
    for(var i = 0;i<lineStrs.length;i++)
    {
         var arr = SuperMap.Util.clipLineStringRect(lineStrs[i],rect,isRetArr,isCloneId);
        if(!arr)
        {
            //为空继续
            continue;
        }
        //此处返回可能是数组可能是一条线
        if(arr  instanceof Array)
        {
            result = result.concat(arr);
        }
        else
        {
            result.push(arr);
        }

    }
    if(result.length>0)
    {

        var mu = new SuperMap.Geometry.MultiLineString(result);
        if(isCloneId )
        {
            mu.id =  multiLineStr.id;
            return mu ;
        }

        return mu ;
    }

}
/**
 * Method: SuperMap.Util.getIntersectLineArray
 * 根据待裁剪的多边形的bounds范围将矩形的bounds四条边进行扩展出四条裁剪标准边界
 *
 * Parameters:
 * rect1 - {SuperMap.Bounds}  矩形的bounds。
 * rect2 - {SuperMap.Bounds}  待裁剪多边形的bounds。
 *  Returns:
 *  {Array} 返回左、上、右、下四条扩展后的裁剪边界数组
 */
SuperMap.Util.getIntersectLineArray = function(rect1,rect2){

    //左边缘的边的下面的点的x保留自身，y取最小的
    var leftLineBottomPoint = new SuperMap.Geometry.Point(rect1.left,rect1.bottom<rect2.bottom?rect1.bottom:rect2.bottom);
    //左边缘的边的上面的点的x保留自身，y取最大的
    var leftLineTopPoint = new SuperMap.Geometry.Point(rect1.left,rect1.top>rect2.top?rect1.top:rect2.top);
    //按照顺时针添加这两个点
    //左边缘的边
    var leftLine = new SuperMap.Geometry.LineString([leftLineBottomPoint,leftLineTopPoint]);


    //上边缘的边的左边的点的x取最小值，y保留自身
    var topLineLeftPoint = new SuperMap.Geometry.Point(rect1.left<rect2.left?rect1.left:rect2.left,rect1.top);
    //上边缘的边的右边的点的x取最大值，y保留自身
    var topLineRightPoint = new SuperMap.Geometry.Point(rect1.right>rect2.right?rect1.right:rect2.right,rect1.top);
    //按照顺时针添加这两个点
    //上边缘的边
    var topLine = new SuperMap.Geometry.LineString([topLineLeftPoint,topLineRightPoint]);


    var rightLineTopPoint = new SuperMap.Geometry.Point(rect1.right,rect1.top>rect2.top?rect1.top:rect2.top);
    var rightLineBottomPoint = new SuperMap.Geometry.Point(rect1.right,rect1.bottom<rect2.bottom?rect1.bottom:rect2.bottom);
    //按照顺时针添加这两个点
    var rightLine = new SuperMap.Geometry.LineString([rightLineTopPoint,rightLineBottomPoint]);


    var bottomLineRightPoint = new SuperMap.Geometry.Point(rect1.right>rect2.right?rect1.right:rect2.right,rect1.bottom);
    var bottomLineLeftPoint = new SuperMap.Geometry.Point(rect1.left<rect2.left?rect1.left:rect2.left,rect1.bottom);
    //按照顺时针添加这两个点
    var bottomLine = new SuperMap.Geometry.LineString([bottomLineRightPoint,bottomLineLeftPoint]);

    return [leftLine,topLine,rightLine,bottomLine];
}

SuperMap.Util.isInside = function(point, rect, side) {
    if((side==0) &&  point.x>=rect.left)
    {
        return true;
    }
    else if((side===1) &&  point.y<=rect.top)
    {
        return true;
    }
    else if((side===2) &&  point.x<=rect.right)
    {
        return true;
    }
    else if((side===3) &&  point.y>=rect.bottom)
    {
        return true;
    }
    return false;
}

/**
 * Method: SuperMap.Util.clipPolygonRect
 * 用矩形对多边形进行裁剪
 *
 * Parameters:
 * polygon - {SuperMap.Geometry.Polygon}  待裁剪的多边形。
 * rect - {SuperMap.Bounds}  作为裁剪标准的bounds。
 * isCloneId - {Boolean} 是否将裁剪前的面的id以及面内部的线环的id赋值给裁剪后的面以及线环（裁剪后的线环不会变成多个，所以和裁剪线不同），此属性默认为false。
 *  Returns:
 *  {SuperMap.Geometry.Polygon} 返回裁剪后的多边形
 */
SuperMap.Util.clipPolygonRect = function(polygon,rect,isCloneId){

    //不相交返回null
    if(!rect.intersectsBounds(polygon.getBounds()))
    {
        return null;
    }
    //图形在矩形内部直接返回
    if(rect.containsBounds(polygon.getBounds()))
    {
        return polygon;
    }
    isCloneId = isCloneId != undefined ? isCloneId : false;
    var polygonResult = [];
    //获取线环数组
    var linearRings = polygon.components;
    for(var i = 0;i<linearRings.length;i++)
    {
        //当前线环在bounds内直接添加进行
        if(rect.containsBounds(linearRings[i].getBounds()))
        {
            polygonResult.push(linearRings[i]);
            continue;
        }
        //将矩形的四个点取出根据面的bounds计算出一个能够延长到面的bounds边缘的四条线，给后面线线求交提供基础
        var intersectLines = SuperMap.Util.getIntersectLineArray(rect,linearRings[i].getBounds());
        var pointArray = linearRings[i].components;

        var cur = [],
            result = [],
            resultPoints = [];

        var rectSize = 4,
            pointSize = pointArray.length;

        var S = pointArray[pointSize - 1];

        for(var j = 0; j < pointSize; j ++) {
            result.push(pointArray[j]);
        }

        var flag;
        // flag=false点在内侧，true点在外侧
        for(var j = 0; j < rectSize; j ++) {
            if(SuperMap.Util.isInside(S, rect, j)) {
                flag = false;
            } else {
                flag = true;
            }

            var resultSize = result.length;
            for(var k = 0; k < resultSize; k ++) {
                //证明其在vector内
                if(SuperMap.Util.isInside(result[k], rect, j)) {
                    //如果前一个点在外侧，则将他们的交点加入结果集
                    if(flag) {
                        flag = false;
                        cur.push(SuperMap.Util.lineIntersection(S, result[k], intersectLines[j].components[0], intersectLines[j].components[1]));
                    }
                    //并将他们当前节点加入结果集
                    cur.push(result[k]);
                } else {
                    if(!flag) {
                        //如果前一个点在内侧，则将他们的交点加入结果集
                        flag = true;
                        cur.push(SuperMap.Util.lineIntersection(S, result[k], intersectLines[j].components[0], intersectLines[j].components[1]));
                    }
                }
                //更新首次比较的节点
                S = result[k];
            }

            var curLength = cur.length;
            result.length = 0;
            //将本次结果拷贝出来作为下次对比的样本
            for(var l = 0; l < curLength; l ++) {
                result.push(cur[l]);
            }
            cur.length = 0;
        }

        for(var j = 0; j < result.length; j ++) {
            resultPoints.push(result[j]);
        }

        if(resultPoints.length>2)
        {
            var linear =  new SuperMap.Geometry.LinearRing(resultPoints);
            if(isCloneId)
            {
                linear.id = linearRings[i].id;
            }
            polygonResult.push(linear);
        }
    }
    if(polygonResult.length>0)
    {
        var reg = new SuperMap.Geometry.Polygon(polygonResult);
        if(isCloneId )
        {

            reg.id = polygon.id;
            return reg;
        }
        return reg;
    }

}
/**
 * Method: SuperMap.Util.clipMultiPolygonRect
 * 用矩形对MultiPolygon进行裁剪
 *
 * Parameters:
 * multiPolygon - {SuperMap.Geometry.MultiPolygon}  待裁剪的MultiPolygon。
 * rect - {SuperMap.Bounds}  作为裁剪标准的bounds。
 * isCloneId - {Boolean} 是否将裁剪前的多面的id以及多面内部的面和线环的id赋值给裁剪后的多的id以及面和线环（裁剪后的线环不会变成多个，所以和裁剪线不同），此属性默认为false。
 *  Returns:
 *  {SuperMap.Geometry.MultiPolygon} 返回裁剪后的MultiPolygon
*/
SuperMap.Util.clipMultiPolygonRect = function(multiPolygon,rect,isCloneId){
    //不相交返回null
    if(!rect.intersectsBounds(multiPolygon.getBounds()))
    {
        return null;
    }
    //图形在矩形内部直接返回
    if(rect.containsBounds(multiPolygon.getBounds()))
    {
        return multiPolygon;
    }

    isCloneId = isCloneId != undefined ? isCloneId : false;
    var resultMultiPolygon = [];
    for(var i = 0;i<multiPolygon.components.length;i++)
    {
        var polygon = SuperMap.Util.clipPolygonRect(multiPolygon.components[i],rect,isCloneId);
        if(polygon)
        {
            resultMultiPolygon.push(polygon);
        }
    }
    if(resultMultiPolygon.length>0)
    {
        var mp = new SuperMap.Geometry.MultiPolygon( resultMultiPolygon);
        if(isCloneId)
        {
            mp.id = multiPolygon.id;
        }
        return  mp;
    }

}
/**
 * Method: SuperMap.Util.clipGeometryRect
 * 用矩形对Geometry进行裁剪（主要针对线和面）
 * 支持对 LineString  LinearRing  MultiLineString   Polygon   MultiPolygon的裁剪
 *
 * Parameters:
 * geometry - {SuperMap.Geometry}  需要进行裁剪的 Geometry
 * rect - {SuperMap.Bounds}  矩形。
 * isRetArr - {Boolean} 此参数只在对线裁剪时有用，如果设置为ture，那就是默认的，一般线被裁剪后都会变成多线，如果设置为false，会将多线组合成为一条线。一般情况矩形裁剪线后都可能是多段的，所以数组形式比较合理，如果设置为false，那么返回一条折线，中间断开部分会连接起来
 * isCloneId - {Boolean} 是否将裁剪前的Geometryid赋值给裁剪后的Geometry，此属性默认为false
 *  Returns:
 *  {SuperMap.Geometry} 返回裁剪后的SuperMap.Geometry
 */
SuperMap.Util.clipGeometryRect = function(geometry,rect,isRetArr,isCloneId){
    if(geometry)
    {
        isRetArr = isRetArr != undefined ? isRetArr : true;
        isCloneId = isCloneId != undefined ? isCloneId : false;
        if(((geometry.CLASS_NAME === "SuperMap.Geometry.LineString") || (geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") ) && (geometry.components.length>1))
        {
            var arr = SuperMap.Util.clipLineStringRect(geometry,rect,isRetArr,isCloneId);
            if(arr)
            {
                //返回的一条折线
                if(arr.length ===1)
                {
                    return arr[0];
                }
                //返回的是一条多线
                else
                {
                    //进入此处那么必然返回的是线数组了，那么id也没意义了，不用赋值
                    return new SuperMap.Geometry.MultiLineString(arr);
                }
            }
        }
        else if( (geometry.CLASS_NAME === "SuperMap.Geometry.MultiLineString") && (geometry.components.length>0) && (geometry.components[0].components.length>1))
        {
            return SuperMap.Util.clipMultiLineStringRect(geometry,rect,isRetArr,isCloneId);
        }
        else if( (geometry.CLASS_NAME === "SuperMap.Geometry.Polygon") && (geometry.components.length>0) && (geometry.components[0].components.length>2) )
        {
            return SuperMap.Util.clipPolygonRect(geometry,rect,isCloneId);
        }
        else if( (geometry.CLASS_NAME === "SuperMap.Geometry.MultiPolygon") && (geometry.components.length>0) )
        {
            return SuperMap.Util.clipMultiPolygonRect(geometry,rect,true);
        }
        else
        {
            return geometry;
        }
    }
}