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