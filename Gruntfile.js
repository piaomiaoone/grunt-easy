/*
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * author:  mycoin (nqliujiangtao@gmail.com)
 * date:    2014/7/14
 * resp:    https://github.com/mycoin/quick-start/
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // 初始化配置
    grunt.initConfig({
        // get workspace path
        root: require('path').resolve('.'),
        connect: {
            server: {
              options: {
                port: 9001,
                hostname: '127.0.0.1',
                base: './',
                livereload: true
              }
            }
        },

        'watch': {
            options: {
                interval: 100,
                event: ['added', 'changed', 'deleted'],
                livereload: true,
                debounceDelay: 200
            },

            'live': {
                options: {
                    livereload: 35729,
                },

                //刷新网页
                files: [
                    'src/css/{,*/}*.css',
                    'src/js/{,*/}*.js',
                    'src/html/{,*/}*.js',
                    'src/img/{,*/}*.{png,jpg,gif}',
                    'smarty/{,*/}*.tpl'
                ]
            },

            'less': {
                files: [
                    'src/less/{,*/}*.less',
                ],
                tasks: ['less:build']
            },

            'js': {
                files: [
                    'Gruntfile.js',
                    'src/js/{,*/}*.js'
                ],
                tasks: ['jshint']
            },

            'template': {
                files: [
                    'src/html/{,*/}*.html',
                ],
                tasks: ['template:build']
            }
        },

        'template': {
            options: {
                mode: 'format',
                wrap: true
            },

            'build': {
                files: [{
                    expand: true,
                    cwd: 'src/html',
                    src: [
                        '*.html',
                        '*/*.html',
                    ],
                    dest: 'src/html'
                }]
            }
        },

        // 先清理output目录
        'clean': {
            'release': {
                src: ['output']
            }
        },

        // 编译Less
        'less': {
            'build': {
                options: {
                    compress: false,
                    cleancss: false,
                    paths: [
                        'src/less',
                    ],
                    modifyVars: {
                        icon: '"../img/icon.png"',
                    }
                },

                files: [{
                    expand: true,
                    cwd: 'src/less',
                    src: [
                        '*.less'
                    ],
                    dest: 'src/css',

                    ext: '.css'
                }]
            }
        },

        // 压缩css
        'cssmin': {
            options: {
                banner: '/*Copyright 2014 Baidu Inc. All rights reserved.*/'
            },

            'release': {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: '**/*.css',
                    dest: 'output/css'
                }]
            }
        },

        // 验证JS
        'jshint': {
            options: {
                // 'asi': true, // Missing semicolon.
                'bitwise': true,
                'boss': true,
                'browser': true,
                'curly': false,
                // 'eqeqeq': false,
                // 'eqnull': true,
                'esnext': true,
                'expr': true, // function call and instead saw an expression
                'latedef': false,
                'loopfunc': true,
                // 'newcap': true,
                // 'noarg': true,
                // 'node': true,
                // 'proto': true,
                // 'regexp': true,
                // 'strict': false,
                'sub': true,
                'undef': true,
                'unused': true,

                '-W124': false, // A generator function shall contain a yield statement
                '-W014': false, // Bad line breaking before ? (in tertiary operator)
                '-W065': false, // Missing radix parameter to parseInt (defaults to 10)
                '-W069': false, // Literal accessor is better written in dot notation
                'globals': {
                    'describe': true,
                    'require': true,
                    'define': true,
                    'exports': true,
                    'module': true,
                    'jQuery': true,
                    'console': true,
                    'it': true,
                    '_': true,
                    'CSRD': true,
                    'beforeEach': true,
                    'afterEach': true
                }
            },
            test: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'src/js/*.js',
                        'src/js/*/*.js',
                        'src/js/deps/rigel.js',
                        '!src/js/require.js',
                        '!src/js/deps/backbone.js',
                        '!src/js/deps/etpl.js',
                        '!src/js/deps/zepto.js',
                        '!src/js/deps/underscore.js'
                    ]
                },
            }
        },

        // 压缩JS
        'uglify': {
            options: {
                mangle: {
                    except: ['jQuery', 'require', 'define']
                },
                banner: '/*Copyright 2014 Baidu Inc. All rights reserved.*/\n',
                footer: '\n/*last modify: <%=grunt.template.today("yyyy-mm-dd hh:MM:ss")%> */',
                report: 'gzip'
            },

            "release": {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: [
                        '{,*/}*.js'
                    ],
                    dest: 'output/js'
                }, {
                    expand: true,
                    cwd: 'src/html',
                    src: [
                        '{,*/}*.js'
                    ],
                    dest: 'output/html'
                }]
            }
        },

        // 复制二进制
        'copy': {
            'release': {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        '*.*',
                        'img/**',
                        'swf/**',
                    ],
                    dest: 'output'
                }]
            },

            'deploy':{
                files: [{
                    expand: true,
                    cwd: 'output',
                    src: [
                        '*.*',
                        '*/*',
                        '*/*/*',
                    ],
                    dest: '../www/'
                }]
            }


        },

        // 同步到预览环境
        'rsync': {
            options: {
                args: [
                    '--times',

                    '--omit-dir-times',
                    '--compress',
                    '--verbose',
                    '--chmod=ug=rwX,o=rX',
                    '--human-readable'
                ],
                exclude: ['.edpproj', '.svn', 'Desktop.ini', 'Thumbs.db', '.DS_Store', '*.bak'],
                recursive: true
            },

            'deploy': {
                options: {
                    src: 'output/',
                    dest: '../www/'
                }
            }
        }
    });

    grunt.registerTask('default', function() {
        grunt.log.subhead('Please use one of the following commands:');

        grunt.log.writeln('• grunt server  启动静态服务器.');
        grunt.log.writeln('• grunt watch   监视源并自动编译.');
        grunt.log.writeln('• grunt build   基础编译.');
        grunt.log.writeln('• grunt release 压缩构建并打包.');
        grunt.log.writeln('• grunt deploy  自动部署 `RD` 环境');

        grunt.log.writeln('\n\nsee all tasks `grunt --verbose`');
    });

    grunt.registerTask('server', [
        'build',
        'connect',
        'watch',
    ]);

    grunt.registerTask('build', [
        'less',
        'template',
    ]);

    grunt.registerTask('release', [
        'clean:release',
        'build',
        'cssmin',
        'uglify',
        'copy:release',
    ]);
    grunt.registerTask('deploy', [
        'release',
        // 'rsync',
        'copy:deploy',
    ]);

    grunt.registerTask('test', [
        'jshint',
    ]);
};