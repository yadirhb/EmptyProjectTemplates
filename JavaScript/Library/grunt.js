module.exports = function (grunt) {
    var buildPath = "build/";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        concat: {
            options: {
                banner: '/*<%= bower.name%>-<%= bower.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                src: [],
                dest: buildPath + '<%= bower.name.toLowerCase()%>-<%= pkg.version %>.concat.js'
            }
        },
        min: {
            main: {
                src: '<%= concat.main.dest%>',
                dest: buildPath + '<%= bower.name.toLowerCase()%>-<%= pkg.version %>.min.js',
            }
        },
        uglify: {
            build: {
                src: '<%= min.main.dest%>',
                dest: buildPath + '<%= bower.name.toLowerCase()%>-<%= pkg.version %>.ugly.js'
            }
        }
    });

    grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function () {
        var srcPaths = ["src"];
        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        concat.main.src.push("grunt/header.js");
        // concat.main.src.push("libs/system-1.0.0-min.js");
        concat.main.src.push("grunt/globals.js");

        var sourceSet = [];
        grunt.file.recurse("src/main/", function callback(abspath, rootdir, subdir, filename) {
            sourceSet.push(abspath);
        });

        concat.main.src = concat.main.src.concat(sourceSet.sort());

        concat.main.src.push("grunt/footer.js");

        console.log(concat.main.src);
        //add module subtasks to the concat task in initConfig
        grunt.config.set('concat', concat);
    });

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "min" task.
    grunt.loadNpmTasks('grunt-yui-compressor');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['prepareModules', 'concat', 'min', 'uglify']);
};