var cluster = require('cluster');
var http = require('http');
var numCPUs = 4;

if (cluster.isMaster) {
 for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
 }
} else {
    require("./axios.js");
    console.log("Running Cluster.")
}