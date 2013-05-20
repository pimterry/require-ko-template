'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        jasmine: {
            src: 'src/**/*.js',
            options: {
                host: "http://localhost:<%= connect.port %>/",
                specs: 'test/*-test.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                  requireConfig: {
                      paths: {
                          "test": "../test"
                      },
                      deps: ['js/template.js']
                  }
                }
            }
        },
        open: {
            jasmine: {
                path: 'http://127.0.0.1:8000/_SpecRunner.html'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true
                }
            },
            briefly: {
                options: {
                    port: 8000,
                    keepalive: false
                }
            }
        },
        jshint: {
            js: {
                options: {
                    jshintrc: 'js/.jshintrc',
                },
                src: ['js/**/*.js', '!js/lib/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js', '!test/lib/*.js']
            },
        },
        watch: {
            js: {
                files: '<%= jshint.js.src %>',
                tasks: ['jshint:js', 'jasmine:src:build']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'jasmine:src:build']
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('phantombrowser', function () {
        var phantomjs = require('grunt-lib-phantomjs').init(grunt);

        phantomjs.spawn({
            options: {
                webdriver: 8001
            }
        });
        return {};
    });

    // Default task.
    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['jshint', 'jasmine']);

    // Test with a live server and an actual browser
    grunt.registerTask('browsertest', ['jasmine:src:build', 'connect', 'open:jasmine']);

    // Test with lots of browsers on saucelabs
    grunt.registerTask('saucelabs', ['jasmine:src:build', 'connect', 'saucelabs-jasmine']);

};
