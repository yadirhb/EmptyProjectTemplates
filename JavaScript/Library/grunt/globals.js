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
