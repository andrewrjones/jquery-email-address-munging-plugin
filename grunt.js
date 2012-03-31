/*global module:false, require:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');
  
  grunt.registerTask('dist', 'default haml sass copy');

  // for now, cheat
  // TODO: use haml-js
  grunt.registerTask('haml', 'Run haml on files', function() {
    var exec = require('child_process').exec,
        child;
        
    child = exec('haml docs/index.haml dist/index.htm',
      function (error, stdout, stderr) {
    });
  });

  // for now, cheat
  // TODO: convert to less, create task
  grunt.registerTask('sass', 'Run sass on files', function() {
    var exec = require('child_process').exec,
        child;
        
    child = exec('sass docs/index.scss dist/index.css',
      function (error, stdout, stderr) {
    });
  });
  
  // TODO: create generic copy task
  grunt.registerTask('copy', 'Copy misc files to dist', function() {
    var files = [
      'CHANGES',
      'LICENSE',
      'README',
      'ext/bootstrap/bootstrap.min.css'
    ];
    
    files.forEach(function(f) {
      var name = f.split("/").pop();
      grunt.file.copy(f, "dist/" + name);
    });
  });
};
