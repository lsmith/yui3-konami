/**
 * Based on the Konami code (http://en.wikipedia.org/wiki/Konami_Code).
 * Subscribers to this event should do something special.  The event will be
 * fired only once for each subscriber.  With great power comes great
 * responsibility, after all.
 *
 * @event konami
 * @for YUI
 * @param type {String} 'konami'
 * @param fn {Function} the callback function
 * @param id {String|Node|etc} the element to bind (typically document)
 * @param o {Object} optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 */
YUI.add('konami', function (Y) {

var progress = {},
    handlers = {},
    keys = [38,38,40,40,37,39,37,39,66,65],
    eventDef = {
        on: function (type, fn, el) {
            var args = Y.Array(arguments,0,true),
                el, ename;

            el = args[2] = Y.get(el);

            if (el) {
                ename = ('konami_' + Y.stamp(el)).replace(/,/g,'_');

                if (!Y.getEvent(ename)) {
                    progress[ename] = 0;

                    handlers[ename] = Y.on('keydown', function (e) {
                        if (e.keyCode === keys[progress[ename]]) {
                            if (++progress[ename] === keys.length) {
                                Y.fire(ename,e);
                                handlers[ename].detach();
                            }
                        } else {
                            progress[ename] = 0;
                        }
                    }, el);
                }

                args[0] = ename;
                args.splice(2,1);

                Y.on.apply(Y,args);
            }
        }
    };

Y.Env.evt.plugins.konami = eventDef;
if (Y.Node) {
    Y.Node.DOM_EVENTS.konami = eventDef;
}

},'3.0.0b1',{ requires: [ 'node-base','event-custom' ] });
