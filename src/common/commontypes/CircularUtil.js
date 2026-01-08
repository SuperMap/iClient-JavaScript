const CircularUtil = {
  lastSeqID: 0,
  createUniqueID: function (prefix) {
    if (prefix == null) {
      prefix = 'id_';
    }
    CircularUtil.lastSeqID += 1;
    return prefix + CircularUtil.lastSeqID;
  },
  extend: function (destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined) {
          destination[property] = value;
        }
      }

      /**
       * IE doesn't include the toString property when iterating over an object's
       * properties with the for(property in object) syntax.  Explicitly check if
       * the source has its own toString property.
       */

      /*
       * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
       * prototype object" when calling hawOwnProperty if the source object
       * is an instance of window.Event.
       */

      var sourceIsEvt = typeof window.Event === 'function' && source instanceof window.Event;

      if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
        destination.toString = source.toString;
      }
    }
    return destination;
  }
};

export { CircularUtil };
