var h = require('hyperscript')

exports.gives = {view: true, menuItem: true}

exports.create = function (api) {
  return {
    view: function (str) {
      if(str !== 'second') return
      return h('h1', 'secondary screen', new Date())
    },
    menuItem: function () {
      return 'second'
    }
  }
}
