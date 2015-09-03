
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: ['build']
      },
      
      scripts: {
        src: ['build/bundle.min.js']
      },

      styles: {
        src: ['build/bundle.css']
      },
      
      images: {
        src: ['build/images/*']
      },
      
      temp: {
        src: ['build/bundle.js', 'build/**/*~', 'build/images/**/*.svg']
      },
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: [
          'src/js/class.js',
          'src/js/util.js',
          
          'src/js/events.js',
          'src/js/log.js',
          
          'src/js/thing.js',
          
          'src/js/asset.js',
          'src/js/loader.js',
          
          'src/js/asset-waiter.js',
          
          'src/js/main.js',
        ],
        dest: 'build/bundle.min.js',
      },
    },
    
    uglify: {
      options: {
        banner: '/* helios <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true
      },
      build: {
        src: ['build/bundle.js'],
        dest: 'build/bundle.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'build/bundle.css' : 'src/css/main.scss'
        }
      }
    },

    copy: {
      
      main: {
        
        files: [
          // index
          {
            expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'build/'
          },

          // images
          {
            expand: true,
            cwd: 'src/',
            src: 'images/**/*',
            dest: 'build/'
          },
          
          // json
          {
            expand: true,
            cwd: 'src/',
            src: '*.json',
            dest: 'build/'
          },
          
        ],

      },
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: 'build',
          hostname: 'localhost',
          livereload: true
        }
      }
    },
    
    watch: {
      options: {
        livereload: true
      },
      stylesheets: {
        files: ['src/**/*.scss'],
        tasks: ['stylesheets']
      },
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['scripts']
      },
      index: {
        files: ['src/**/*.html'],
        tasks: ['copy']
      },

    },
    
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
//  grunt.registerTask('scripts', ['clean:scripts', 'concat', 'uglify']);
  grunt.registerTask('scripts', ['clean:scripts', 'concat']);
  grunt.registerTask('styles',  ['clean:styles', 'sass']);
  grunt.registerTask('images',  []);
  
  grunt.registerTask('build', ['clean:build', 'scripts', 'styles', 'copy', 'images', 'clean:temp']);

  grunt.registerTask('default', ['build', 'connect', 'watch']);
  
};
