module.exports = function(grunt) {
    
      grunt.initConfig({
        jshint: {
          options: {
            predef: [ "document", "console", "$", "firebase", "_"],
            esnext: true,
            globalstrict: true,
            globals: {"angular": true} //need to add app module's name
            // mainModule: "NutritionApp",
            // externalModules: ["ngRoute", "chart.js"]
          },
          files: ['../app/**/*.js']
        },
        sass: {
          dist: {
            files: {
              '../css/main.css': '../sass/main.scss'
            }
          }
        },
        watch: {
          javascripts: {
            files: ['../app/**/*.js'],
            tasks: ['jshint']
          },
          sass: {
            files: ['../sass/**/*.scss'],
            tasks: ['sass']
          }
        }
      });
    
      require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
      grunt.registerTask('default', ['jshint', 'sass', 'watch' ]);
    };
    