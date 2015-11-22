// dependencies
var fs = require("fs")
var postcss = require("postcss")
var atImport = require("postcss-import")

// css to be processed
var css = fs.readFileSync("css/input.css", "utf8")

// process css
var output = postcss()
  .use(atImport())
  .process(css, {
    // `from` option is required so relative import can work from input dirname
    from: "css/input.css"
  })
  .css

console.log(output)
