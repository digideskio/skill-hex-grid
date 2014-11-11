var grid = require('hex-grid');
var defined = require('defined');
var render = require('./render');

function SkillHexGrid ($el, data) {
    if (!(this instanceof SkillHexGrid)) return new SkillHexGrid($el, data);

    this.data = data || {};
    this.data.offset = defined(this.data.offset, { x: 0, y: 0 });
    this.skills = defined(data.skills, []);
    this.$el = $el;
    this.$grid = this.$el.querySelector('.skill-hex-grid');

    this.prev = false;
    this.enabled = false;

    this.init();
}

SkillHexGrid.prototype.init = function () {
    var $grid = this.$grid;

    $grid.innerHTML = this.skills.reduce(function (memo, s) {
        return memo += render(s);
    }, '');

    this.scan();
    window.addEventListener('resize', this.scan.bind(this));
    this.$el.addEventListener('scroll', this.scan.bind(this));

    var me = this;
    function onmove (ev) {
        if (!me.enabled) return;

        var h = me.g.lookup(ev.pageX, ev.pageY);
        if (!h) return;
        if (me.prev) me.prev.classList.remove('active');
        h.classList.add('active');
        me.prev = h;
    }

    function onout () {
        if (!me.enabled) return;

        var a = me.$el.querySelector('.active');
        if (a) a.classList.remove('active');
    }

    this.$el.addEventListener('mousemove', onmove);
    this.$el.addEventListener('mouseout', onout);
};

SkillHexGrid.prototype.scan = function () {
    var hexes = this.$grid.querySelectorAll('.skill-hex');
    this.prev = false;

    var s = window.getComputedStyle(this.$grid);

    var opts = {
        offset: {
            x: this.$grid.offsetLeft,
            y: (this.$grid.offsetTop - this.$el.scrollTop) + this.data.offset.y
        },
        width: s.width,
        height: s.height,
        spacing: 16,
        initRow: 1
    };

    this.g = grid(opts, hexes);
};

SkillHexGrid.prototype.enable = function () {
    this.enabled = true;
};

SkillHexGrid.prototype.disable = function () {
    this.enabled = false;
};

module.exports = SkillHexGrid;
