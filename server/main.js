define([
  // Require in modules here
  'dojo/_base/config',
  'dojo/node!express',
  'dojo/node!http',
  'dojo/node!path',
  'server/routes/index',
  'server/routes/user'
], function(config, express, http, path, routes, user){

  var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(config.baseUrl,'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(config.baseUrl, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);
  app.get('/users', user.list);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

});