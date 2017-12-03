var h = require('hyperscript')

exports.gives = {view: true, menuItem: true}

exports.create = function (api) {
  return {
    view: function (str) {
      if(str !== 'main') return
      return h('h1', 'main screen turn on', h('a', {href: 'second'}, '2nd'))
    },
    menuItem: function () {
      return 'main'
    }
  }
}
