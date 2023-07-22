const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

var myService = {
  MyService: {
    MyPort: {
      PriceLookup: function(args) {
        return {
          price: '$10.56',
          deliverydate: '07/22/2023 10:30 AM'
        };
      },

      // This is how to define an asynchronous function with a callback.
      MyAsyncFunction: function(args, callback) {
        // do some work
        callback({
          id: args.id
        });
      },

      // This is how to define an asynchronous function with a Promise.
      MyPromiseFunction: function(args) {
        return new Promise((resolve) => {
          // do some work
          resolve({
            id: args.id
          });
        });
      },

      // This is how to receive incoming headers
      HeadersAwareFunction: function(args, cb, headers) {
        return {
          name: headers.Token
        };
      },

      // You can also inspect the original `req`
      reallyDetailedFunction: function(args, cb, headers, req) {
        console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
        return {
          name: headers.Token
        };
      }
    }
  }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8000, function(){
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  const server = soap.listen(app, '/PriceLookup', myService, xml, function(){
    console.log('server initialized');
  });
  server.log = (type, data)  => {
    console.log(`Got something ${type} ${data}`);
  }
});
