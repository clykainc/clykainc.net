/* Heritage Speed theme: tag filter buttons on the Racing and Videos pages.
   Buttons are built from the tags on the posts shown, so new series
   (a new tag) get a button automatically. */
(function () {
    document.querySelectorAll('.js-filters').forEach(function (bar) {
        var block = bar.closest('.block');
        var list = block && block.querySelector('.js-filterable');
        if (!list) return;
        var items = Array.prototype.slice.call(list.children);
        var exclude = (bar.getAttribute('data-exclude') || '').toLowerCase();
        var counts = {};
        items.forEach(function (item) {
            (item.getAttribute('data-tags') || '').split('|').forEach(function (t) {
                t = t.trim();
                if (t && t.toLowerCase() !== exclude) counts[t] = (counts[t] || 0) + 1;
            });
        });
        var names = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 6);
        if (!names.length) { bar.remove(); return; }

        function makeButton(label, value, pressed) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = label;
            b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
            b.addEventListener('click', function () {
                bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
                items.forEach(function (item) {
                    var tags = (item.getAttribute('data-tags') || '').split('|');
                    item.hidden = !(value === null || tags.indexOf(value) !== -1);
                });
            });
            bar.appendChild(b);
        }
        makeButton('All', null, true);
        names.forEach(function (n) { makeButton(n, n, false); });
    });
})();
