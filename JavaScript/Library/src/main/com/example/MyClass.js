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