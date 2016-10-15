module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['javascripts/**/*.js'],
      options: {
        predef: [ "document", "console", "$", "Gauntlet" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};
