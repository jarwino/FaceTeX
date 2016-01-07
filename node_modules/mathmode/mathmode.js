var latex   = require("latex");
var spawn   = require("child_process").spawn;

function sanitize(expr) {
  var sanitized = expr.replace(/([^\\](\\\\)*)(\$)/g, "$1");
  if(sanitized.charAt(0) === "$") {
    return sanitized.substr(1)
  }
  return sanitized
}

module.exports = function(expr, options) {
  if(!options) {
    options = {};
  }
  var format = options.format || "png";
  var size   = options.dpi    || 300;
  
  var package_list = options.packages || [ "amsmath" ];
  var packages = [];
  for(var i=0; i<package_list.length; ++i) {
    var pkg = package_list[i];
    if(pkg instanceof Array) {
      packages.push("\\usepackage[" + pkg[1] + "]{" + pkg[0] + "}");
    } else {
      packages.push("\\usepackage{" + pkg + "}");
    }
  }
  
  var tex_stream = latex([
    "\\nonstopmode",
    "\\documentclass{minimal}",
    packages.join("\n"),
    "\\usepackage[active,tightpage]{preview}",
    "\\usepackage{transparent}",
    options.macros || "",
    "\\begin{document}",
    "\\begin{preview} $",
    sanitize(expr),
    "$ \\end{preview}",
    "\\end{document}"
  ], {
    command:  options.pdflatex_path || "pdflatex",
    format:   "pdf"
  });
  
  var convert_path = options.imagemagick_path || "convert";
  var convert = spawn(convert_path, [
    "-density", "" + size,
    "-quality", "100",
    "pdf:-",
    format + ":-"
  ]);
  
  var result = convert.stdout;
  tex_stream.on("error", function(err) {
    result.emit("error", err);
    convert.kill();
  });
  tex_stream.pipe(convert.stdin);

  return result;
}