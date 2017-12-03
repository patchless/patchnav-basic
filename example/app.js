
var h = require('hyperscript')
var path = require('path')
var fs = require('fs')
var style = fs.readFileSync(path.join(__dirname,'style.css'), 'utf8')

exports.needs = {layout: 'first'}
exports.gives = {}
exports.create = function (api) {
  document.head.appendChild(h('style', {textContent: style}))
  var root = api.layout()
  document.body.appendChild(root)
  return function () {
  }
}



