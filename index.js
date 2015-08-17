var Hapi = require('hapi');
var FalcorHandler = require('falcor-hapi');
var falcorRouterDemoFactory = require('falcor-router-demo');

var app = new Hapi.Server();
app.connection({
    host: "localhost",
    port: 9090
});

// serve static files (index.html)
app.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: __dirname
        }
    }
});

app.route({
    method: ["GET", "POST"],
    path: "/model.json",
    handler: FalcorHandler.dataSourceRoute(function(req, res) {
        return falcorRouterDemoFactory("1");
    })
});

app.start(function () {
    console.log("Navigate to:", app.info.uri);
});

