var h = require('hyperscript')
var HyperNav = require('hyper-nav')
var HyperLoadMore = require('hyperloadmore')
var URL = require('url')

function ObvMap (obv, map) {
  return function (fn) {
    if(fn) return obv(function (v) {
      fn(map(v))
    })
    else
      return map(obv())
  }
}

exports.gives = {
  layout: { screen: true, goto: true }
}
exports.needs = {
  app: {
    view: 'first',
    menu: 'map'
  }
}

exports.create = function (api) {
  var nav

  return {
    layout: {
      screen: function () {
        var menu = api.app.menu().filter(Boolean)
        nav = HyperNav(function (href) {
            //TODO, handle 404s
            var content = api.app.view(href)
            if(content) return HyperLoadMore(content)
          },
          function (nav) {
            return h('div.nav__header', [
              h('div.nav__back', {
                'onclick': function () { nav.back() }
                },
                '<<<'
              ),
              //TODO: show the title of the current page...
              h('div.nav__title', ObvMap(nav.location, function (v) {
                if(nav.lastChild && nav.lastChild.title) return nav.lastChild.title
                return v.location
              }) ),
              h('div.nav__menu', h('div.nav__menu-items', menu.map(function (e) {
                return h('a', {href: e}, e)
              })))
            ])
          },
          HyperLoadMore(api.app.view(menu[0])) //open the first view
        )

        window.onclick = function (ev) {
          ev.preventDefault()
          //TODO: make path more generic
          var link = ev.target.getAttribute('href') //get the exact href provided
          if(link) {
            nav.push(link)
          }
        }

      nav.className = 'patchnav'

        nav.appendChild(
          h('style', {innerText: require('fs').readFileSync(require('path').join(__dirname, 'style.css'))})
        )

        return nav
      },
      goto: function (link, opts) {
        nav.push(link)
      }
    }
  }
}




