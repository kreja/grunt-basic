module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: './',
          src: "./page/**/*.jade",
          dest: './build/',
          ext: '.html'
        }]
      }
    },
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: [{
          expand: true,
          cwd: './',
          src: "./page/**/*.scss",
          dest: './build/',
          ext: '.css'
        }]
      }
    },
    postcss: {
        options: {
          map: true,
          cascade: true,
          pretty: true,
          expand: true,
          processors: [
            require('autoprefixer-core')({browsers: 'last 1 version'}).postcss,
            require('csswring').postcss
          ]
        },
        dist: {
            files: [{
                expand: true,
                flatten: false,
                src: './build/page/**/*.css'
            }]
        }
    },
    sprite: {
        options: {
            // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
            imagepath: './sprites/imgs/',
            // 映射CSS中背景路径，支持函数和数组，默认为 null
            imagepath_map: null,
            // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
            spritedest: './build/public/sprites/imgs/',
            // 替换后的背景路径，默认 ../images/
            spritepath: '../../public/sprites/imgs/',
            // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
            padding: 2,
            // 是否使用 image-set 作为2x图片实现，默认不使用
            useimageset: false,
            // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
            newsprite: false,
            // 给雪碧图追加时间戳，默认不追加
            spritestamp: true,
            // 在CSS文件末尾追加时间戳，默认不追加
            cssstamp: true,
            // 默认使用二叉树最优排列算法
            algorithm: 'binary-tree',
            // 默认使用`pixelsmith`图像处理引擎
            engine: 'pixelsmith'
        },
        autoSprite: {
            files: [{
                // 启用动态扩展
                expand: true,
                // css文件源的文件夹
                cwd: './',
                // 匹配规则
                src: './build/page/**/*.css',
                // 导出css和sprite的路径地址
                dest: './',
                // 导出的css名
                ext: '.css'
            }]
        }
    },
    jshint: {
      all: ['./page/**/*.js']
    },
    concat: {
      dist: {
        files: [{
          expand: true,
          cwd: './',
          src: "./page/**/*.js",
          dest: './build/',
          ext: '.js'
        }]
      },
    },
    uglify: {
      compressjs: {
        files: [{
          expand: true,
          cwd: './',
          src: "./build/page/**/*.js",
          dest: './',
          ext: '.js'
        }]
      }
    },
    clean: ["./build/page"],
    watch: {
      scripts: {
        files: ['./page/**/*.js'],
        tasks: ['jshint','concat','uglify']
      },
      jade: {
        files: ['./page/**/*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['./page/**/*.scss'],
        tasks: ['sass']
      },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              './page/**/*.jade',
              './page/**/*.scss',
              './page/**/*.js'
          ]
      }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9000,
          base: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-css-sprite');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('outputhtml',['jade']);
  grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('outpostcss',['postcss']);
  grunt.registerTask('outsprites',['sprite']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('hintjs',['jshint']);
  grunt.registerTask('compressjs',['jshint','concat','uglify']);
  grunt.registerTask('serve',['jade','sass','postcss','sprite','jshint','concat','uglify','connect','watch']);
  grunt.registerTask('default');

};
