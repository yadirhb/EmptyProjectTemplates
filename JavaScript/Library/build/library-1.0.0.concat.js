/*Library-1.0.0 2016-10-13 */
/**
 * @author yadirhb@gmail.com
 * @description
 * This is my awesome Library
 * @version Version 1.0.0
 */
(function () {
var $global = this;
// Change the $root variable name for the expected Library name
var $root = "com";
var $original = $global[$root];

// SYSTEM GLOBAL IMPORTS AND DECLARATIONS - DO NOT CHANGE THIS CODE
var System = $global.System.noConflict();
var using = System.using;
var Exception = using('System.Exception');
var Namespace = using('System.Namespace');
var Static = using('System.Static');
var Class = using('System.Class');
var Interface = using('System.Interface');
var Enum = using('System.Enum');

/**
 * The Library namespace its a wrapper
 */
var Library = System.setGlobal({});
System.disableAutoLoad(true);

/**
 * Created by yadirhb on 10/12/2016.
 */
Namespace('com.example',
    /**
     * Custom class
     */
    Class('MyClass', {
        'constructor': function () {
            throw new com.example.exception.MyCustomException("This is a bad Class");
        }
    })
)
/**
 * Created by yadirhb on 10/12/2016.
 */
Class('com.example.SingleClass', {
    '$implements': 'com.example.iface.Comparable',
    'constructor': function () {
    },
    'compareTo': function (obj) {
        if (obj) {
            if (obj.is(this.getClass())) {
                if (this.time < obj.time) return -1;
                else if (this.time == obj.time) return 0;
                else return 1;
            }
            throw new Exception("The supplied object is not instance of " + this.getClass().getFullPath(), "ClassCastException");
        }
        throw new Exception("The supplied object cannot be null", "NullPointerException");
    },
})
/**
 * Created by yadirhb on 10/12/2016.
 */
Namespace('com.example.exception',
    /**
     * Custom Exception class
     */
    Class('MyCustomException', {
        '$extends': Exception,
        'constructor': function (message) {
            this.$base(message);
        }
    })
)
/**
 * Created by yadirhb on 10/12/2016.
 */
Interface('com.example.iface.Comparable', {
    'compareTo': function (obj) {
    }
})
System.disableAutoLoad(false);
System.setGlobal($global);
Library = Library[$root];

var __init__callbacks = [];

/**
 *
 * @param force
 */
Library.noConflict = function (force) {
    var res = Library;
    if ($original || force === true) {
        $global[$root] = $original;
    }
    return res;
}
/**
 *
 */
Library.ready = function (/*callback[,fireOnReady]*/) {
    if (arguments.length > 0) {
        var listener = arguments[0], fireOnReady = System.Environment.isBrowser() ? false : arguments[1] === true;
        if (isFunction(listener)) {
            if (fireOnReady === false) {
                listener.call($global, System);
            } else {
                __init__callbacks.push(listener);
            }
        } else throw new System.exception.InvalidArgumentsException("Supplied arguments are invalid, expected (Function/Boolean)");
    }
};

if (System.Environment.isBrowser()) {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            for (var c in __init__callbacks) {
                if (System.hasProp(__init__callbacks, c)) __init__callbacks[c].call($global, Library);
            }
        }
    };
}
$global[$root] = Library;
if (System.Environment.isNode()) module.exports = Library;
})
(this);