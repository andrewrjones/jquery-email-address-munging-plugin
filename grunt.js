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
    server: {
        port: 8085
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
    jade: {
      html: {
        src: ["docs/index.jade"],
        dest: "dist",
        options: {
          client: false
        }
      }
    },
    less: {
      index: {
        src: "docs/index.less",
        dest: "dist/index.css"
      }
    },
    qunit: {
      urls: ['1.9.0', '2.0.0b1'].map(function(version) {
        return 'http://localhost:<%= server.port %>/test/jquery.emailaddressmunging.html?jquery=' + version;
      })
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    beautify: {
      files: '<config:lint.files>'
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    copy: {
      dist: {
        options: {
          flatten: true
        },
        files: {
          'dist/': ['CHANGES', 'LICENSE', 'README', 'ext/bootstrap/bootstrap.min.css']
        }
      }
    },
    clean: ['dist'],
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
  grunt.registerTask('default', 'test dist');
  grunt.registerTask('test', 'server lint qunit');
  grunt.registerTask('dist', 'concat min jade less copy');

  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-beautify');

  grunt.registerTask('tidy', 'beautify');
};
