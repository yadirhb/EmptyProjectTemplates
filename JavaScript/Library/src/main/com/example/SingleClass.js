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