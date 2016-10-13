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