var hyperglue = require('hyperglue');
var fs = require('fs');
var hexHtml = fs.readFileSync(__dirname + '/hex-default.html').toString();

module.exports = function (hex) {
    var inProgress = hex.earned ? '' : 'hex-in-progress';
    return hyperglue(hexHtml, {
        'a:first-child': {
            href: hex.href,
            'class': 'skill-hex ' + inProgress
        },
        '.skill-hex-img': {
            src: hex.img.src
        }
    }).outerHTML;
}
