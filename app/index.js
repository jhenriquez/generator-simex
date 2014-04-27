'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('./utilities');


var SimexGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });

    // have Yeoman greet the user
    this.log(this.yeoman);
  },

  askFor: function () {
    var done = this.async();

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Simex generator.'));

    var prompts = [
    {
      type: 'input',
      name: 'appName',
      message: 'What will be the name of our project?'
    },
    {
      type: 'list',
      name: 'viewEngine',
      message: 'What view engine will be used?',
      choices:['haml', 'jade']
    }
    ];

    this.prompt(prompts, function (props) {
      this.viewEngine = props.viewEngine;
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('routes');
    this.copy('_routes_index.js', 'routes/index.js');

    this.veRequire = utils.SupportedTemplates[this.viewEngine].dep;
    this.veVersion = utils.SupportedTemplates[this.viewEngine].ver;
    
    
    this.copy('_app.js','app.js');

    this.mkdir('public');
    this.mkdir('public/css');
    this.mkdir('public/js');

    this.mkdir('views');
    this.copy(this.viewEngine + '_index','views/index.' + this.viewEngine);

    this.copy('_package.json', 'package.json');
  },

  _projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SimexGenerator;