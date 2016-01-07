 
var http = require('http');
var config = require('./config.json');
var fs = require('fs');
var mjAPI = require("./node_modules/mathjax-node/lib/mj-single");
var http = require('http');
 mjAPI.config(
        {MathJax: {SVG: {font: "TeX"}}, extensions: ""}
 );
  mjAPI.start();
  mjAPI.typeset({
      math: "$LEL$",
      format: "inline-TeX", // "inline-TeX", "MathML"
      png:true, //  svg:true,
      dpi: 800,
      ex: 50, 
      width: 100
  }, function (data) {
      console.log(data);
      if (!data.errors) {
        var base64Data = data.png.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('file.png', base64Data, 'base64', function(err) {
            if(err) throw err
        });
   }
});