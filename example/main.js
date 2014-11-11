var grid = require('../');
var diy = require('diy')();
var domready = require('domready');

diy('/skills?limit=-1', function (err, body) {
    var skills = body.response;

    domready(function () {
        var g = grid(document.querySelector('.grid-wrapper'), { skills: skills.map(function (s) {
            return {
                img: {
                    src: s.images.large,
                    alt: s.title + ' Badge'
                },

                href: '/skills/' + s.url
            };
        }) });

        g.enable();
    })
})
