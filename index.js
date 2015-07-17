var Hapi = require('hapi');
var FalcorServer = require('falcor-hapi');
var FalcorRouterDemo = require('falcor-router-demo');

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
    handler: FalcorServer.dataSourceRoute(function(req, res) {
        return new FalcorRouterDemo();
    })
});

app.start(function () {
    console.log("Navigate to:", app.info.uri);
});

