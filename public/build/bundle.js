
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    const identity$4 = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }

    const is_client = typeof window !== 'undefined';
    let now$1 = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop$1;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append$1(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append$1(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$2(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text$2(' ');
    }
    function empty$1() {
        return text$2('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch$1(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity$4, tick = noop$1, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now$1() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch$1(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch$1(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity$4, tick = noop$1, css } = config || null_transition;
            const program = {
                start: now$1() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch$1(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch$1(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch$1(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append$1(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function ascending$1(a, b) {
      return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function descending(a, b) {
      return a == null || b == null ? NaN
        : b < a ? -1
        : b > a ? 1
        : b >= a ? 0
        : NaN;
    }

    function bisector(f) {
      let compare1, compare2, delta;

      // If an accessor is specified, promote it to a comparator. In this case we
      // can test whether the search value is (self-) comparable. We can’t do this
      // for a comparator (except for specific, known comparators) because we can’t
      // tell if the comparator is symmetric, and an asymmetric comparator can’t be
      // used to test whether a single value is comparable.
      if (f.length !== 2) {
        compare1 = ascending$1;
        compare2 = (d, x) => ascending$1(f(d), x);
        delta = (d, x) => f(d) - x;
      } else {
        compare1 = f === ascending$1 || f === descending ? f : zero$1;
        compare2 = f;
        delta = f;
      }

      function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) < 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) <= 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
      }

      return {left, center, right};
    }

    function zero$1() {
      return 0;
    }

    function number$2(x) {
      return x === null ? NaN : +x;
    }

    const ascendingBisect = bisector(ascending$1);
    const bisectRight = ascendingBisect.right;
    bisector(number$2).center;
    var bisect = bisectRight;

    const e10 = Math.sqrt(50),
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

    function tickSpec(start, stop, count) {
      const step = (stop - start) / Math.max(0, count),
          power = Math.floor(Math.log10(step)),
          error = step / Math.pow(10, power),
          factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
      let i1, i2, inc;
      if (power < 0) {
        inc = Math.pow(10, -power) / factor;
        i1 = Math.round(start * inc);
        i2 = Math.round(stop * inc);
        if (i1 / inc < start) ++i1;
        if (i2 / inc > stop) --i2;
        inc = -inc;
      } else {
        inc = Math.pow(10, power) * factor;
        i1 = Math.round(start / inc);
        i2 = Math.round(stop / inc);
        if (i1 * inc < start) ++i1;
        if (i2 * inc > stop) --i2;
      }
      if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
      return [i1, i2, inc];
    }

    function ticks(start, stop, count) {
      stop = +stop, start = +start, count = +count;
      if (!(count > 0)) return [];
      if (start === stop) return [start];
      const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
      if (!(i2 >= i1)) return [];
      const n = i2 - i1 + 1, ticks = new Array(n);
      if (reverse) {
        if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
        else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
      } else {
        if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
        else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
      }
      return ticks;
    }

    function tickIncrement(start, stop, count) {
      stop = +stop, start = +start, count = +count;
      return tickSpec(start, stop, count)[2];
    }

    function tickStep(start, stop, count) {
      stop = +stop, start = +start, count = +count;
      const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
      return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
    }

    function identity$3(x) {
      return x;
    }

    var top = 1,
        right = 2,
        bottom = 3,
        left = 4,
        epsilon$1 = 1e-6;

    function translateX(x) {
      return "translate(" + x + ",0)";
    }

    function translateY(y) {
      return "translate(0," + y + ")";
    }

    function number$1(scale) {
      return d => +scale(d);
    }

    function center(scale, offset) {
      offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
      if (scale.round()) offset = Math.round(offset);
      return d => +scale(d) + offset;
    }

    function entering() {
      return !this.__axis;
    }

    function axis(orient, scale) {
      var tickArguments = [],
          tickValues = null,
          tickFormat = null,
          tickSizeInner = 6,
          tickSizeOuter = 6,
          tickPadding = 3,
          offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
          k = orient === top || orient === left ? -1 : 1,
          x = orient === left || orient === right ? "x" : "y",
          transform = orient === top || orient === bottom ? translateX : translateY;

      function axis(context) {
        var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
            format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$3) : tickFormat,
            spacing = Math.max(tickSizeInner, 0) + tickPadding,
            range = scale.range(),
            range0 = +range[0] + offset,
            range1 = +range[range.length - 1] + offset,
            position = (scale.bandwidth ? center : number$1)(scale.copy(), offset),
            selection = context.selection ? context.selection() : context,
            path = selection.selectAll(".domain").data([null]),
            tick = selection.selectAll(".tick").data(values, scale).order(),
            tickExit = tick.exit(),
            tickEnter = tick.enter().append("g").attr("class", "tick"),
            line = tick.select("line"),
            text = tick.select("text");

        path = path.merge(path.enter().insert("path", ".tick")
            .attr("class", "domain")
            .attr("stroke", "currentColor"));

        tick = tick.merge(tickEnter);

        line = line.merge(tickEnter.append("line")
            .attr("stroke", "currentColor")
            .attr(x + "2", k * tickSizeInner));

        text = text.merge(tickEnter.append("text")
            .attr("fill", "currentColor")
            .attr(x, k * spacing)
            .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

        if (context !== selection) {
          path = path.transition(context);
          tick = tick.transition(context);
          line = line.transition(context);
          text = text.transition(context);

          tickExit = tickExit.transition(context)
              .attr("opacity", epsilon$1)
              .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

          tickEnter
              .attr("opacity", epsilon$1)
              .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
        }

        tickExit.remove();

        path
            .attr("d", orient === left || orient === right
                ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
                : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

        tick
            .attr("opacity", 1)
            .attr("transform", function(d) { return transform(position(d) + offset); });

        line
            .attr(x + "2", k * tickSizeInner);

        text
            .attr(x, k * spacing)
            .text(format);

        selection.filter(entering)
            .attr("fill", "none")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

        selection
            .each(function() { this.__axis = position; });
      }

      axis.scale = function(_) {
        return arguments.length ? (scale = _, axis) : scale;
      };

      axis.ticks = function() {
        return tickArguments = Array.from(arguments), axis;
      };

      axis.tickArguments = function(_) {
        return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
      };

      axis.tickValues = function(_) {
        return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
      };

      axis.tickFormat = function(_) {
        return arguments.length ? (tickFormat = _, axis) : tickFormat;
      };

      axis.tickSize = function(_) {
        return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
      };

      axis.tickSizeInner = function(_) {
        return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
      };

      axis.tickSizeOuter = function(_) {
        return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
      };

      axis.tickPadding = function(_) {
        return arguments.length ? (tickPadding = +_, axis) : tickPadding;
      };

      axis.offset = function(_) {
        return arguments.length ? (offset = +_, axis) : offset;
      };

      return axis;
    }

    function axisBottom(scale) {
      return axis(bottom, scale);
    }

    function axisLeft(scale) {
      return axis(left, scale);
    }

    var noop = {value: () => {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames$1(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames$1(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$1(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    // Given something array like (or null), returns something that is strictly an
    // array. This is used to ensure that array-like objects passed to d3.selectAll
    // or selection.selectAll are converted into proper arrays when creating a
    // selection; we don’t ever want to create a selection backed by a live
    // HTMLCollection or NodeList. However, note that selection.selectAll will use a
    // static NodeList as a group, since it safely derived from querySelectorAll.
    function array$1(x) {
      return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function arrayAll(select) {
      return function() {
        return array$1(select.apply(this, arguments));
      };
    }

    function selection_selectAll(select) {
      if (typeof select === "function") select = arrayAll(select);
      else select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function childMatcher(selector) {
      return function(node) {
        return node.matches(selector);
      };
    }

    var find = Array.prototype.find;

    function childFind(match) {
      return function() {
        return find.call(this.children, match);
      };
    }

    function childFirst() {
      return this.firstElementChild;
    }

    function selection_selectChild(match) {
      return this.select(match == null ? childFirst
          : childFind(typeof match === "function" ? match : childMatcher(match)));
    }

    var filter = Array.prototype.filter;

    function children() {
      return Array.from(this.children);
    }

    function childrenFilter(match) {
      return function() {
        return filter.call(this.children, match);
      };
    }

    function selection_selectChildren(match) {
      return this.selectAll(match == null ? children
          : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = new Map,
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (i = 0; i < groupLength; ++i) {
        if (node = group[i]) {
          keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
          if (nodeByKeyValue.has(keyValue)) {
            exit[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
        }
      }

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (i = 0; i < dataLength; ++i) {
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
          update[i] = node;
          node.__data__ = data[i];
          nodeByKeyValue.delete(keyValue);
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
          exit[i] = node;
        }
      }
    }

    function datum(node) {
      return node.__data__;
    }

    function selection_data(value, key) {
      if (!arguments.length) return Array.from(this, datum);

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    // Given some data, this returns an array-like view of it: an object that
    // exposes a length property and allows numeric indexing. Note that unlike
    // selectAll, this isn’t worried about “live” collections because the resulting
    // array will only be used briefly while data is being bound. (It is possible to
    // cause the data to change while iterating by using a key function, but please
    // don’t; we’d rather avoid a gratuitous copy.)
    function arraylike(data) {
      return typeof data === "object" && "length" in data
        ? data // Array, TypedArray, NodeList, array-like
        : Array.from(data); // Map, Set, iterable, string, or anything else
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
      } else {
        enter = enter.append(onenter + "");
      }
      if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
      }
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(context) {
      var selection = context.selection ? context.selection() : context;

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending;

      function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
      }

      for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            sortgroup[i] = node;
          }
        }
        sortgroup.sort(compareNode);
      }

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      return Array.from(this);
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      let size = 0;
      for (const node of this) ++size; // eslint-disable-line no-unused-vars
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

    function propertyRemove(name) {
      return function() {
        delete this[name];
      };
    }

    function propertyConstant(name, value) {
      return function() {
        this[name] = value;
      };
    }

    function propertyFunction(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

    function classArray(string) {
      return string.trim().split(/^|\s+/);
    }

    function classList(node) {
      return node.classList || new ClassList(node);
    }

    function ClassList(node) {
      this._node = node;
      this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };

    function classedAdd(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
      return function() {
        classedAdd(this, names);
      };
    }

    function classedFalse(names) {
      return function() {
        classedRemove(this, names);
      };
    }

    function classedFunction(names, value) {
      return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
      };
    }

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

    function htmlRemove() {
      this.innerHTML = "";
    }

    function htmlConstant(value) {
      return function() {
        this.innerHTML = value;
      };
    }

    function htmlFunction(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      };
    }

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    function contextListener(listener) {
      return function(event) {
        listener.call(this, event, this.__data__);
      };
    }

    function parseTypenames(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, options) {
      return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, options);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, options) {
      var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
      return this;
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    function* selection_iterator() {
      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) yield node;
        }
      }
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    function selection_selection() {
      return this;
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      selectChild: selection_selectChild,
      selectChildren: selection_selectChildren,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      selection: selection_selection,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch,
      [Symbol.iterator]: selection_iterator
    };

    function select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
        reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
        reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
        reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
        reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
        reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHex8: color_formatHex8,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHex8() {
      return this.rgb().formatHex8();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
      },
      displayable() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatHex8: rgb_formatHex8,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
    }

    function rgb_formatHex8() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
    }

    function rgb_formatRgb() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
    }

    function clampa(opacity) {
      return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
    }

    function clampi(value) {
      return Math.max(0, Math.min(255, Math.round(value) || 0));
    }

    function hex(value) {
      value = clampi(value);
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      clamp() {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
      },
      displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl() {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
      }
    }));

    function clamph(value) {
      value = (value || 0) % 360;
      return value < 0 ? value + 360 : value;
    }

    function clampt(value) {
      return Math.max(0, Math.min(1, value || 0));
    }

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant$1 = x => () => x;

    function linear$1(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function numberArray(a, b) {
      if (!b) b = [];
      var n = a ? Math.min(b.length, a.length) : 0,
          c = b.slice(),
          i;
      return function(t) {
        for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
      };
    }

    function isNumberArray(x) {
      return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }

    function genericArray(a, b) {
      var nb = b ? b.length : 0,
          na = a ? Math.min(nb, a.length) : 0,
          x = new Array(na),
          c = new Array(nb),
          i;

      for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
      for (; i < nb; ++i) c[i] = b[i];

      return function(t) {
        for (i = 0; i < na; ++i) c[i] = x[i](t);
        return c;
      };
    }

    function date(a, b) {
      var d = new Date;
      return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
      };
    }

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    function object(a, b) {
      var i = {},
          c = {},
          k;

      if (a === null || typeof a !== "object") a = {};
      if (b === null || typeof b !== "object") b = {};

      for (k in b) {
        if (k in a) {
          i[k] = interpolate$1(a[k], b[k]);
        } else {
          c[k] = b[k];
        }
      }

      return function(t) {
        for (k in i) c[k] = i[k](t);
        return c;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    function interpolate$1(a, b) {
      var t = typeof b, c;
      return b == null || t === "boolean" ? constant$1(b)
          : (t === "number" ? interpolateNumber
          : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
          : b instanceof color ? interpolateRgb
          : b instanceof Date ? date
          : isNumberArray(b) ? numberArray
          : Array.isArray(b) ? genericArray
          : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
          : interpolateNumber)(a, b);
    }

    function interpolateRound(a, b) {
      return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
      };
    }

    var degrees = 180 / Math.PI;

    var identity$2 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var svgNode;

    /* eslint-disable no-undef */
    function parseCss(value) {
      const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? identity$2 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
    }

    function parseSvg(value) {
      if (value == null) return identity$2;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };

    function timer(callback, delay, time) {
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
          t0 = t1, t1 = t1._next;
        } else {
          t2 = t1._next, t1._next = null;
          t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
      }
      taskTail = t0;
      sleep(time);
    }

    function sleep(time) {
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(elapsed => {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
      });
    }

    function init(node, id) {
      var schedule = get(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = tween0 = tween;
          for (var i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1 = tween1.slice();
              tween1.splice(i, 1);
              break;
            }
          }
        }

        schedule.tween = tween1;
      };
    }

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? interpolateRgb
          : (c = color(b)) ? (b = c, interpolateRgb)
          : interpolateString)(a, b);
    }

    function attrRemove(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

    function attrInterpolate(name, i) {
      return function(t) {
        this.setAttribute(name, i.call(this, t));
      };
    }

    function attrInterpolateNS(fullname, i) {
      return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
      };
    }

    function attrTweenNS(fullname, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get(this.node(), id).ease;
    }

    function easeVarying(id, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        set(this, id).ease = v;
      };
    }

    function transition_easeVarying(value) {
      if (typeof value !== "function") throw new Error;
      return this.each(easeVarying(this._id, value));
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Transition(merges, this._parents, this._name, this._id);
    }

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });

        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      easeVarying: transition_easeVarying,
      end: transition_end,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          throw new Error(`transition ${id} not found`);
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    const pi = Math.PI,
        tau = 2 * pi,
        epsilon = 1e-6,
        tauEpsilon = tau - epsilon;

    function append(strings) {
      this._ += strings[0];
      for (let i = 1, n = strings.length; i < n; ++i) {
        this._ += arguments[i] + strings[i];
      }
    }

    function appendRound(digits) {
      let d = Math.floor(digits);
      if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
      if (d > 15) return append;
      const k = 10 ** d;
      return function(strings) {
        this._ += strings[0];
        for (let i = 1, n = strings.length; i < n; ++i) {
          this._ += Math.round(arguments[i] * k) / k + strings[i];
        }
      };
    }

    class Path {
      constructor(digits) {
        this._x0 = this._y0 = // start of current subpath
        this._x1 = this._y1 = null; // end of current subpath
        this._ = "";
        this._append = digits == null ? append : appendRound(digits);
      }
      moveTo(x, y) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
      }
      closePath() {
        if (this._x1 !== null) {
          this._x1 = this._x0, this._y1 = this._y0;
          this._append`Z`;
        }
      }
      lineTo(x, y) {
        this._append`L${this._x1 = +x},${this._y1 = +y}`;
      }
      quadraticCurveTo(x1, y1, x, y) {
        this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
      }
      bezierCurveTo(x1, y1, x2, y2, x, y) {
        this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
      }
      arcTo(x1, y1, x2, y2, r) {
        x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);

        let x0 = this._x1,
            y0 = this._y1,
            x21 = x2 - x1,
            y21 = y2 - y1,
            x01 = x0 - x1,
            y01 = y0 - y1,
            l01_2 = x01 * x01 + y01 * y01;

        // Is this path empty? Move to (x1,y1).
        if (this._x1 === null) {
          this._append`M${this._x1 = x1},${this._y1 = y1}`;
        }

        // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
        else if (!(l01_2 > epsilon));

        // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
        // Equivalently, is (x1,y1) coincident with (x2,y2)?
        // Or, is the radius zero? Line to (x1,y1).
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
          this._append`L${this._x1 = x1},${this._y1 = y1}`;
        }

        // Otherwise, draw an arc!
        else {
          let x20 = x2 - x0,
              y20 = y2 - y0,
              l21_2 = x21 * x21 + y21 * y21,
              l20_2 = x20 * x20 + y20 * y20,
              l21 = Math.sqrt(l21_2),
              l01 = Math.sqrt(l01_2),
              l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
              t01 = l / l01,
              t21 = l / l21;

          // If the start tangent is not coincident with (x0,y0), line to.
          if (Math.abs(t01 - 1) > epsilon) {
            this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
          }

          this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
        }
      }
      arc(x, y, r, a0, a1, ccw) {
        x = +x, y = +y, r = +r, ccw = !!ccw;

        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);

        let dx = r * Math.cos(a0),
            dy = r * Math.sin(a0),
            x0 = x + dx,
            y0 = y + dy,
            cw = 1 ^ ccw,
            da = ccw ? a0 - a1 : a1 - a0;

        // Is this path empty? Move to (x0,y0).
        if (this._x1 === null) {
          this._append`M${x0},${y0}`;
        }

        // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
        else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
          this._append`L${x0},${y0}`;
        }

        // Is this arc empty? We’re done.
        if (!r) return;

        // Does the angle go the wrong way? Flip the direction.
        if (da < 0) da = da % tau + tau;

        // Is this a complete circle? Draw two arcs to complete the circle.
        if (da > tauEpsilon) {
          this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
        }

        // Is this arc non-empty? Draw an arc!
        else if (da > epsilon) {
          this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
        }
      }
      rect(x, y, w, h) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
      }
      toString() {
        return this._;
      }
    }

    function formatDecimal(x) {
      return Math.abs(x = Math.round(x)) >= 1e21
          ? x.toLocaleString("en").replace(/,/g, "")
          : x.toString(10);
    }

    // Computes the decimal coefficient and exponent of the specified number x with
    // significant digits p, where x is positive and p is in [1, 21] or undefined.
    // For example, formatDecimalParts(1.23) returns ["123", 0].
    function formatDecimalParts(x, p) {
      if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
      var i, coefficient = x.slice(0, i);

      // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
      // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
      return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
      ];
    }

    function exponent(x) {
      return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
    }

    function formatGroup(grouping, thousands) {
      return function(value, width) {
        var i = value.length,
            t = [],
            j = 0,
            g = grouping[0],
            length = 0;

        while (i > 0 && g > 0) {
          if (length + g + 1 > width) g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width) break;
          g = grouping[j = (j + 1) % grouping.length];
        }

        return t.reverse().join(thousands);
      };
    }

    function formatNumerals(numerals) {
      return function(value) {
        return value.replace(/[0-9]/g, function(i) {
          return numerals[+i];
        });
      };
    }

    // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
    var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function formatSpecifier(specifier) {
      if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
      var match;
      return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
      });
    }

    formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

    function FormatSpecifier(specifier) {
      this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
      this.align = specifier.align === undefined ? ">" : specifier.align + "";
      this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
      this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
      this.zero = !!specifier.zero;
      this.width = specifier.width === undefined ? undefined : +specifier.width;
      this.comma = !!specifier.comma;
      this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
      this.trim = !!specifier.trim;
      this.type = specifier.type === undefined ? "" : specifier.type + "";
    }

    FormatSpecifier.prototype.toString = function() {
      return this.fill
          + this.align
          + this.sign
          + this.symbol
          + (this.zero ? "0" : "")
          + (this.width === undefined ? "" : Math.max(1, this.width | 0))
          + (this.comma ? "," : "")
          + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
          + (this.trim ? "~" : "")
          + this.type;
    };

    // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
    function formatTrim(s) {
      out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".": i0 = i1 = i; break;
          case "0": if (i0 === 0) i0 = i; i1 = i; break;
          default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
        }
      }
      return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    }

    var prefixExponent;

    function formatPrefixAuto(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1],
          i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
          n = coefficient.length;
      return i === n ? coefficient
          : i > n ? coefficient + new Array(i - n + 1).join("0")
          : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    }

    function formatRounded(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1];
      return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
          : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
          : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    }

    var formatTypes = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded(x * 100, p),
      "r": formatRounded,
      "s": formatPrefixAuto,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };

    function identity$1(x) {
      return x;
    }

    var map = Array.prototype.map,
        prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

    function formatLocale(locale) {
      var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
          currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
          currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
          decimal = locale.decimal === undefined ? "." : locale.decimal + "",
          numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
          percent = locale.percent === undefined ? "%" : locale.percent + "",
          minus = locale.minus === undefined ? "−" : locale.minus + "",
          nan = locale.nan === undefined ? "NaN" : locale.nan + "";

      function newFormat(specifier) {
        specifier = formatSpecifier(specifier);

        var fill = specifier.fill,
            align = specifier.align,
            sign = specifier.sign,
            symbol = specifier.symbol,
            zero = specifier.zero,
            width = specifier.width,
            comma = specifier.comma,
            precision = specifier.precision,
            trim = specifier.trim,
            type = specifier.type;

        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";

        // The "" type, and any invalid type, is an alias for ".12~g".
        else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
            suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = formatTypes[type],
            maybeSuffix = /[defgprs%]/.test(type);

        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6
            : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
            : Math.max(0, Math.min(20, precision));

        function format(value) {
          var valuePrefix = prefix,
              valueSuffix = suffix,
              i, n, c;

          if (type === "c") {
            valueSuffix = formatType(value) + valueSuffix;
            value = "";
          } else {
            value = +value;

            // Determine the sign. -0 is not less than 0, but 1 / -0 is!
            var valueNegative = value < 0 || 1 / value < 0;

            // Perform the initial formatting.
            value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

            // Trim insignificant zeros.
            if (trim) value = formatTrim(value);

            // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
            if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

            // Compute the prefix and suffix.
            valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
            valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

            // Break the formatted value into the integer “value” part that can be
            // grouped, and fractional or exponential “suffix” part that is not.
            if (maybeSuffix) {
              i = -1, n = value.length;
              while (++i < n) {
                if (c = value.charCodeAt(i), 48 > c || c > 57) {
                  valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                  value = value.slice(0, i);
                  break;
                }
              }
            }
          }

          // If the fill character is not "0", grouping is applied before padding.
          if (comma && !zero) value = group(value, Infinity);

          // Compute the padding.
          var length = valuePrefix.length + value.length + valueSuffix.length,
              padding = length < width ? new Array(width - length + 1).join(fill) : "";

          // If the fill character is "0", grouping is applied after padding.
          if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

          // Reconstruct the final output based on the desired alignment.
          switch (align) {
            case "<": value = valuePrefix + value + valueSuffix + padding; break;
            case "=": value = valuePrefix + padding + value + valueSuffix; break;
            case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
            default: value = padding + valuePrefix + value + valueSuffix; break;
          }

          return numerals(value);
        }

        format.toString = function() {
          return specifier + "";
        };

        return format;
      }

      function formatPrefix(specifier, value) {
        var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
            e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
            k = Math.pow(10, -e),
            prefix = prefixes[8 + e / 3];
        return function(value) {
          return f(k * value) + prefix;
        };
      }

      return {
        format: newFormat,
        formatPrefix: formatPrefix
      };
    }

    var locale;
    var format;
    var formatPrefix;

    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });

    function defaultLocale(definition) {
      locale = formatLocale(definition);
      format = locale.format;
      formatPrefix = locale.formatPrefix;
      return locale;
    }

    function precisionFixed(step) {
      return Math.max(0, -exponent(Math.abs(step)));
    }

    function precisionPrefix(step, value) {
      return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
    }

    function precisionRound(step, max) {
      step = Math.abs(step), max = Math.abs(max) - step;
      return Math.max(0, exponent(max) - exponent(step)) + 1;
    }

    function initRange(domain, range) {
      switch (arguments.length) {
        case 0: break;
        case 1: this.range(domain); break;
        default: this.range(range).domain(domain); break;
      }
      return this;
    }

    function constants(x) {
      return function() {
        return x;
      };
    }

    function number(x) {
      return +x;
    }

    var unit = [0, 1];

    function identity(x) {
      return x;
    }

    function normalize(a, b) {
      return (b -= (a = +a))
          ? function(x) { return (x - a) / b; }
          : constants(isNaN(b) ? NaN : 0.5);
    }

    function clamper(a, b) {
      var t;
      if (a > b) t = a, a = b, b = t;
      return function(x) { return Math.max(a, Math.min(b, x)); };
    }

    // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
    // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
    function bimap(domain, range, interpolate) {
      var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
      if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
      else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
      return function(x) { return r0(d0(x)); };
    }

    function polymap(domain, range, interpolate) {
      var j = Math.min(domain.length, range.length) - 1,
          d = new Array(j),
          r = new Array(j),
          i = -1;

      // Reverse descending domains.
      if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
      }

      while (++i < j) {
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
      }

      return function(x) {
        var i = bisect(domain, x, 1, j) - 1;
        return r[i](d[i](x));
      };
    }

    function copy(source, target) {
      return target
          .domain(source.domain())
          .range(source.range())
          .interpolate(source.interpolate())
          .clamp(source.clamp())
          .unknown(source.unknown());
    }

    function transformer() {
      var domain = unit,
          range = unit,
          interpolate = interpolate$1,
          transform,
          untransform,
          unknown,
          clamp = identity,
          piecewise,
          output,
          input;

      function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
      }

      function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
      }

      scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
      };

      scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
      };

      scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate = interpolateRound, rescale();
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
      };

      scale.interpolate = function(_) {
        return arguments.length ? (interpolate = _, rescale()) : interpolate;
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t, u) {
        transform = t, untransform = u;
        return rescale();
      };
    }

    function continuous() {
      return transformer()(identity, identity);
    }

    function tickFormat(start, stop, count, specifier) {
      var step = tickStep(start, stop, count),
          precision;
      specifier = formatSpecifier(specifier == null ? ",f" : specifier);
      switch (specifier.type) {
        case "s": {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }
        case "":
        case "e":
        case "g":
        case "p":
        case "r": {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }
        case "f":
        case "%": {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
      }
      return format(specifier);
    }

    function linearish(scale) {
      var domain = scale.domain;

      scale.ticks = function(count) {
        var d = domain();
        return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
      };

      scale.tickFormat = function(count, specifier) {
        var d = domain();
        return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
      };

      scale.nice = function(count) {
        if (count == null) count = 10;

        var d = domain();
        var i0 = 0;
        var i1 = d.length - 1;
        var start = d[i0];
        var stop = d[i1];
        var prestep;
        var step;
        var maxIter = 10;

        if (stop < start) {
          step = start, start = stop, stop = step;
          step = i0, i0 = i1, i1 = step;
        }
        
        while (maxIter-- > 0) {
          step = tickIncrement(start, stop, count);
          if (step === prestep) {
            d[i0] = start;
            d[i1] = stop;
            return domain(d);
          } else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
          } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
          } else {
            break;
          }
          prestep = step;
        }

        return scale;
      };

      return scale;
    }

    function linear() {
      var scale = continuous();

      scale.copy = function() {
        return copy(scale, linear());
      };

      initRange.apply(scale, arguments);

      return linearish(scale);
    }

    function constant(x) {
      return function constant() {
        return x;
      };
    }

    function withPath(shape) {
      let digits = 3;

      shape.digits = function(_) {
        if (!arguments.length) return digits;
        if (_ == null) {
          digits = null;
        } else {
          const d = Math.floor(_);
          if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
          digits = d;
        }
        return shape;
      };

      return () => new Path(digits);
    }

    function array(x) {
      return typeof x === "object" && "length" in x
        ? x // Array, TypedArray, NodeList, array-like
        : Array.from(x); // Map, Set, iterable, string, or anything else
    }

    function Linear(context) {
      this._context = context;
    }

    Linear.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x, y) {
        x = +x, y = +y;
        switch (this._point) {
          case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
          case 1: this._point = 2; // falls through
          default: this._context.lineTo(x, y); break;
        }
      }
    };

    function curveLinear(context) {
      return new Linear(context);
    }

    function x(p) {
      return p[0];
    }

    function y(p) {
      return p[1];
    }

    function line(x$1, y$1) {
      var defined = constant(true),
          context = null,
          curve = curveLinear,
          output = null,
          path = withPath(line);

      x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant(x$1);
      y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant(y$1);

      function line(data) {
        var i,
            n = (data = array(data)).length,
            d,
            defined0 = false,
            buffer;

        if (context == null) output = curve(buffer = path());

        for (i = 0; i <= n; ++i) {
          if (!(i < n && defined(d = data[i], i, data)) === defined0) {
            if (defined0 = !defined0) output.lineStart();
            else output.lineEnd();
          }
          if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
        }

        if (buffer) return output = null, buffer + "" || null;
      }

      line.x = function(_) {
        return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
      };

      line.y = function(_) {
        return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
      };

      line.defined = function(_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
      };

      line.curve = function(_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
      };

      line.context = function(_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
      };

      return line;
    }

    function area(x0, y0, y1) {
      var x1 = null,
          defined = constant(true),
          context = null,
          curve = curveLinear,
          output = null,
          path = withPath(area);

      x0 = typeof x0 === "function" ? x0 : (x0 === undefined) ? x : constant(+x0);
      y0 = typeof y0 === "function" ? y0 : (y0 === undefined) ? constant(0) : constant(+y0);
      y1 = typeof y1 === "function" ? y1 : (y1 === undefined) ? y : constant(+y1);

      function area(data) {
        var i,
            j,
            k,
            n = (data = array(data)).length,
            d,
            defined0 = false,
            buffer,
            x0z = new Array(n),
            y0z = new Array(n);

        if (context == null) output = curve(buffer = path());

        for (i = 0; i <= n; ++i) {
          if (!(i < n && defined(d = data[i], i, data)) === defined0) {
            if (defined0 = !defined0) {
              j = i;
              output.areaStart();
              output.lineStart();
            } else {
              output.lineEnd();
              output.lineStart();
              for (k = i - 1; k >= j; --k) {
                output.point(x0z[k], y0z[k]);
              }
              output.lineEnd();
              output.areaEnd();
            }
          }
          if (defined0) {
            x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
            output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
          }
        }

        if (buffer) return output = null, buffer + "" || null;
      }

      function arealine() {
        return line().defined(defined).curve(curve).context(context);
      }

      area.x = function(_) {
        return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
      };

      area.x0 = function(_) {
        return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
      };

      area.x1 = function(_) {
        return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
      };

      area.y = function(_) {
        return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
      };

      area.y0 = function(_) {
        return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
      };

      area.y1 = function(_) {
        return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
      };

      area.lineX0 =
      area.lineY0 = function() {
        return arealine().x(x0).y(y0);
      };

      area.lineY1 = function() {
        return arealine().x(x0).y(y1);
      };

      area.lineX1 = function() {
        return arealine().x(x1).y(y0);
      };

      area.defined = function(_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
      };

      area.curve = function(_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
      };

      area.context = function(_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
      };

      return area;
    }

    function Transform(k, x, y) {
      this.k = k;
      this.x = x;
      this.y = y;
    }

    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };

    new Transform(1, 0, 0);

    Transform.prototype;

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier} [start]
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    /* src\components\Chart.svelte generated by Svelte v3.59.2 */
    const file$7 = "src\\components\\Chart.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let svg_1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg_1 = svg_element("svg");
    			attr_dev(svg_1, "class", "svelte-hcyypq");
    			add_location(svg_1, file$7, 101, 4, 3274);
    			attr_dev(div, "class", "chart-container svelte-hcyypq");
    			add_location(div, file$7, 100, 0, 3217);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg_1);
    			/*svg_1_binding*/ ctx[7](svg_1);
    			/*div_binding*/ ctx[8](div);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*svg_1_binding*/ ctx[7](null);
    			/*div_binding*/ ctx[8](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const x_lim = 999;

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chart', slots, []);
    	let { E0 } = $$props;
    	let { b } = $$props;
    	let { R } = $$props;
    	let { m } = $$props;
    	let { n } = $$props;
    	let svg;
    	let container;
    	let width, height;
    	const margin = { top: 40, right: 0, bottom: 70, left: 90 };

    	const lineData = derived([E0, b, R, m, n], ([$E0, $b, $R, $m, $n]) => {
    		const data = [];

    		for (let i = 0.001; i <= x_lim; i += 0.1) {
    			const E = $E0 - $b * Math.log10(i) - $R * i - $m * Math.exp($n * i);
    			data.push({ i, E });
    		}

    		return data;
    	});

    	function drawChart(data) {
    		const xScale = linear().domain([0, x_lim]).range([0, width]);
    		const yScale = linear().domain([0, 1.5]).range([height, 0]);
    		const xAxis = axisBottom(xScale).tickSizeOuter(0).tickPadding(10).tickFormat(d => `${d}`);
    		const yAxis = axisLeft(yScale).tickSizeOuter(0).tickPadding(10).tickFormat(d => `${d}`);
    		const lineGenerator = line().x(d => xScale(d.i)).y(d => yScale(d.E));
    		select(svg).selectAll('*').remove();
    		const g = select(svg).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    		g.append('g').attr('transform', `translate(0,${height})`).call(xAxis).append('text').attr('x', width / 2).attr('y', margin.bottom - 10).attr('fill', '#000').attr('font-size', '16px').text('Current Density (mA/cm^2)').attr('text-anchor', 'middle');
    		g.append('g').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', -margin.left + 10).attr('x', -height / 2).attr('dy', '0.71em').attr('fill', '#000').attr('font-size', '16px').text('Voltage (V)').attr('text-anchor', 'middle');
    		g.append('path').datum(data).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1.5).attr('d', lineGenerator);
    	}

    	function updateDimensions() {
    		if (container) {
    			const containerWidth = container.clientWidth;
    			const containerHeight = container.clientHeight;
    			width = containerWidth - margin.left - margin.right;
    			height = containerHeight - margin.top - margin.bottom;
    			lineData.subscribe(drawChart);
    		}
    	}

    	onMount(() => {
    		updateDimensions();
    		window.addEventListener('resize', updateDimensions);
    		return () => window.removeEventListener('resize', updateDimensions);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (E0 === undefined && !('E0' in $$props || $$self.$$.bound[$$self.$$.props['E0']])) {
    			console.warn("<Chart> was created without expected prop 'E0'");
    		}

    		if (b === undefined && !('b' in $$props || $$self.$$.bound[$$self.$$.props['b']])) {
    			console.warn("<Chart> was created without expected prop 'b'");
    		}

    		if (R === undefined && !('R' in $$props || $$self.$$.bound[$$self.$$.props['R']])) {
    			console.warn("<Chart> was created without expected prop 'R'");
    		}

    		if (m === undefined && !('m' in $$props || $$self.$$.bound[$$self.$$.props['m']])) {
    			console.warn("<Chart> was created without expected prop 'm'");
    		}

    		if (n === undefined && !('n' in $$props || $$self.$$.bound[$$self.$$.props['n']])) {
    			console.warn("<Chart> was created without expected prop 'n'");
    		}
    	});

    	const writable_props = ['E0', 'b', 'R', 'm', 'n'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chart> was created with unknown prop '${key}'`);
    	});

    	function svg_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			svg = $$value;
    			$$invalidate(0, svg);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(1, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('E0' in $$props) $$invalidate(2, E0 = $$props.E0);
    		if ('b' in $$props) $$invalidate(3, b = $$props.b);
    		if ('R' in $$props) $$invalidate(4, R = $$props.R);
    		if ('m' in $$props) $$invalidate(5, m = $$props.m);
    		if ('n' in $$props) $$invalidate(6, n = $$props.n);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		scaleLinear: linear,
    		select,
    		axisBottom,
    		axisLeft,
    		line,
    		derived,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		svg,
    		container,
    		width,
    		height,
    		margin,
    		x_lim,
    		lineData,
    		drawChart,
    		updateDimensions
    	});

    	$$self.$inject_state = $$props => {
    		if ('E0' in $$props) $$invalidate(2, E0 = $$props.E0);
    		if ('b' in $$props) $$invalidate(3, b = $$props.b);
    		if ('R' in $$props) $$invalidate(4, R = $$props.R);
    		if ('m' in $$props) $$invalidate(5, m = $$props.m);
    		if ('n' in $$props) $$invalidate(6, n = $$props.n);
    		if ('svg' in $$props) $$invalidate(0, svg = $$props.svg);
    		if ('container' in $$props) $$invalidate(1, container = $$props.container);
    		if ('width' in $$props) width = $$props.width;
    		if ('height' in $$props) height = $$props.height;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [svg, container, E0, b, R, m, n, svg_1_binding, div_binding];
    }

    class Chart extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { E0: 2, b: 3, R: 4, m: 5, n: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chart",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get E0() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set E0(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get b() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set b(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get R() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set R(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get m() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set m(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get n() {
    		throw new Error("<Chart>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set n(value) {
    		throw new Error("<Chart>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Scrolly.svelte generated by Svelte v3.59.2 */
    const file$6 = "src\\components\\Scrolly.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div, file$6, 80, 2, 2222);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[8](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[8](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scrolly', slots, ['default']);
    	let { root = null } = $$props;
    	let { top = 0 } = $$props;
    	let { bottom = 0 } = $$props;
    	let { increments = 100 } = $$props;
    	let { value = undefined } = $$props;
    	const steps = [];
    	const threshold = [];
    	let nodes = [];
    	let intersectionObservers = [];
    	let container;

    	const update = () => {
    		if (!nodes.length) return;
    		nodes.forEach(createObserver);
    	};

    	const mostInView = () => {
    		let maxRatio = 0;
    		let maxIndex = 0;

    		for (let i = 0; i < steps.length; i++) {
    			if (steps[i] > maxRatio) {
    				maxRatio = steps[i];
    				maxIndex = i;
    			}
    		}

    		if (maxRatio > 0) $$invalidate(1, value = maxIndex); else $$invalidate(1, value = undefined);
    	};

    	const createObserver = (node, index) => {
    		const handleIntersect = e => {
    			e[0].isIntersecting;
    			const ratio = e[0].intersectionRatio;
    			steps[index] = ratio;
    			mostInView();
    		};

    		const marginTop = top ? top * -1 : 0;
    		const marginBottom = bottom ? bottom * -1 : 0;
    		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
    		const options = { root, rootMargin, threshold };
    		if (intersectionObservers[index]) intersectionObservers[index].disconnect();
    		const io = new IntersectionObserver(handleIntersect, options);
    		io.observe(node);
    		intersectionObservers[index] = io;
    	};

    	onMount(() => {
    		for (let i = 0; i < increments + 1; i++) {
    			threshold.push(i / increments);
    		}

    		nodes = container.querySelectorAll(":scope > *");
    		update();
    	});

    	const writable_props = ['root', 'top', 'bottom', 'increments', 'value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scrolly> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(0, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('root' in $$props) $$invalidate(2, root = $$props.root);
    		if ('top' in $$props) $$invalidate(3, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ('increments' in $$props) $$invalidate(5, increments = $$props.increments);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('$$scope' in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		root,
    		top,
    		bottom,
    		increments,
    		value,
    		steps,
    		threshold,
    		nodes,
    		intersectionObservers,
    		container,
    		update,
    		mostInView,
    		createObserver
    	});

    	$$self.$inject_state = $$props => {
    		if ('root' in $$props) $$invalidate(2, root = $$props.root);
    		if ('top' in $$props) $$invalidate(3, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ('increments' in $$props) $$invalidate(5, increments = $$props.increments);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('nodes' in $$props) nodes = $$props.nodes;
    		if ('intersectionObservers' in $$props) intersectionObservers = $$props.intersectionObservers;
    		if ('container' in $$props) $$invalidate(0, container = $$props.container);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*top, bottom*/ 24) {
    			(update());
    		}
    	};

    	return [container, value, root, top, bottom, increments, $$scope, slots, div_binding];
    }

    class Scrolly extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			root: 2,
    			top: 3,
    			bottom: 4,
    			increments: 5,
    			value: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scrolly",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get root() {
    		throw new Error("<Scrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error("<Scrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<Scrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Scrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<Scrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Scrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get increments() {
    		throw new Error("<Scrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set increments(value) {
    		throw new Error("<Scrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Scrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Scrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\ChartScrolly.svelte generated by Svelte v3.59.2 */
    const file$5 = "src\\components\\ChartScrolly.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let svg_1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg_1 = svg_element("svg");
    			attr_dev(svg_1, "class", "svelte-uvxlpj");
    			add_location(svg_1, file$5, 132, 4, 4205);
    			set_style(div, "width", "100%");
    			set_style(div, "height", "100%");
    			add_location(div, file$5, 131, 0, 4137);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg_1);
    			/*svg_1_binding*/ ctx[9](svg_1);
    			/*div_binding*/ ctx[10](div);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*svg_1_binding*/ ctx[9](null);
    			/*div_binding*/ ctx[10](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChartScrolly', slots, []);
    	let { E0 } = $$props;
    	let { b } = $$props;
    	let { R } = $$props;
    	let { m } = $$props;
    	let { n } = $$props;
    	let { highlightRange = [0, 0] } = $$props;
    	let { highlightOpacity = 0 } = $$props;
    	let svg;
    	let container;
    	let margin = { top: 20, right: 10, bottom: 40, left: 50 };

    	function getLineData() {
    		const data = [];

    		for (let i = 0.001; i <= 999; i += 0.1) {
    			const E = E0 - b * Math.log10(i) - R * i - m * Math.exp(n * i);
    			data.push({ i, E });
    		}

    		return data;
    	}

    	function updateDimensions() {
    		if (!container) return;
    		const width = container.clientWidth - margin.left - margin.right;
    		const height = container.clientHeight - margin.top - margin.bottom;
    		drawChart(width, height);
    	}

    	function drawChart(width, height) {
    		const data = getLineData();
    		const xScale = linear().domain([0, 999]).range([0, width]);
    		const yScale = linear().domain([0, 1.5]).range([height, 0]);
    		const xAxis = axisBottom(xScale).tickSizeOuter(0).tickPadding(5).tickFormat(d => `${d}`);
    		const yAxis = axisLeft(yScale).tickSizeOuter(0).tickPadding(5).tickFormat(d => `${d}`);
    		const lineGenerator = line().x(d => xScale(d.i)).y(d => yScale(d.E));
    		const highlightAreaAbove = area().x(d => xScale(d.i)).y0(0).y1(d => yScale(d.E));
    		const highlightAreaBelow = area().x(d => xScale(d.i)).y0(height).y1(d => yScale(d.E));
    		select(svg).selectAll('*').remove();
    		const g = select(svg).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    		g.append('g').attr('transform', `translate(0,${height})`).call(xAxis).append('text').attr('x', width / 2).attr('y', margin.bottom - 5).attr('fill', '#000').attr('font-size', '14px').text('Current Density (mA/cm^2)').attr('text-anchor', 'middle');
    		g.append('g').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', -margin.left + 5).attr('x', -height / 2).attr('dy', '0.71em').attr('fill', '#000').attr('font-size', '14px').text('Voltage (V)').attr('text-anchor', 'middle');
    		g.append('path').datum(data).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1.5).attr('d', lineGenerator);

    		if (highlightRange[0] !== highlightRange[1]) {
    			const highlightData = data.filter(d => d.i >= highlightRange[0] && d.i <= highlightRange[1]);
    			g.append('path').datum(highlightData).attr('fill', 'rgba(204, 213, 174, ' + highlightOpacity + ')').attr('d', highlightAreaAbove);
    			g.append('path').datum(highlightData).attr('fill', 'rgba(204, 213, 174, ' + highlightOpacity + ')').attr('d', highlightAreaBelow);
    		}
    	}

    	onMount(() => {
    		updateDimensions();
    		window.addEventListener('resize', updateDimensions);
    	});

    	onDestroy(() => {
    		window.removeEventListener('resize', updateDimensions);
    	});

    	setContext('chartContainer', container);

    	$$self.$$.on_mount.push(function () {
    		if (E0 === undefined && !('E0' in $$props || $$self.$$.bound[$$self.$$.props['E0']])) {
    			console.warn("<ChartScrolly> was created without expected prop 'E0'");
    		}

    		if (b === undefined && !('b' in $$props || $$self.$$.bound[$$self.$$.props['b']])) {
    			console.warn("<ChartScrolly> was created without expected prop 'b'");
    		}

    		if (R === undefined && !('R' in $$props || $$self.$$.bound[$$self.$$.props['R']])) {
    			console.warn("<ChartScrolly> was created without expected prop 'R'");
    		}

    		if (m === undefined && !('m' in $$props || $$self.$$.bound[$$self.$$.props['m']])) {
    			console.warn("<ChartScrolly> was created without expected prop 'm'");
    		}

    		if (n === undefined && !('n' in $$props || $$self.$$.bound[$$self.$$.props['n']])) {
    			console.warn("<ChartScrolly> was created without expected prop 'n'");
    		}
    	});

    	const writable_props = ['E0', 'b', 'R', 'm', 'n', 'highlightRange', 'highlightOpacity'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChartScrolly> was created with unknown prop '${key}'`);
    	});

    	function svg_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			svg = $$value;
    			$$invalidate(0, svg);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(1, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('E0' in $$props) $$invalidate(2, E0 = $$props.E0);
    		if ('b' in $$props) $$invalidate(3, b = $$props.b);
    		if ('R' in $$props) $$invalidate(4, R = $$props.R);
    		if ('m' in $$props) $$invalidate(5, m = $$props.m);
    		if ('n' in $$props) $$invalidate(6, n = $$props.n);
    		if ('highlightRange' in $$props) $$invalidate(7, highlightRange = $$props.highlightRange);
    		if ('highlightOpacity' in $$props) $$invalidate(8, highlightOpacity = $$props.highlightOpacity);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		setContext,
    		scaleLinear: linear,
    		select,
    		axisBottom,
    		axisLeft,
    		line,
    		area,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		highlightRange,
    		highlightOpacity,
    		svg,
    		container,
    		margin,
    		getLineData,
    		updateDimensions,
    		drawChart
    	});

    	$$self.$inject_state = $$props => {
    		if ('E0' in $$props) $$invalidate(2, E0 = $$props.E0);
    		if ('b' in $$props) $$invalidate(3, b = $$props.b);
    		if ('R' in $$props) $$invalidate(4, R = $$props.R);
    		if ('m' in $$props) $$invalidate(5, m = $$props.m);
    		if ('n' in $$props) $$invalidate(6, n = $$props.n);
    		if ('highlightRange' in $$props) $$invalidate(7, highlightRange = $$props.highlightRange);
    		if ('highlightOpacity' in $$props) $$invalidate(8, highlightOpacity = $$props.highlightOpacity);
    		if ('svg' in $$props) $$invalidate(0, svg = $$props.svg);
    		if ('container' in $$props) $$invalidate(1, container = $$props.container);
    		if ('margin' in $$props) margin = $$props.margin;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	{
    		updateDimensions();
    	}

    	return [
    		svg,
    		container,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		highlightRange,
    		highlightOpacity,
    		svg_1_binding,
    		div_binding
    	];
    }

    class ChartScrolly extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			E0: 2,
    			b: 3,
    			R: 4,
    			m: 5,
    			n: 6,
    			highlightRange: 7,
    			highlightOpacity: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChartScrolly",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get E0() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set E0(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get b() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set b(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get R() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set R(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get m() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set m(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get n() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set n(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightRange() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightRange(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightOpacity() {
    		throw new Error("<ChartScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightOpacity(value) {
    		throw new Error("<ChartScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * Lexing or parsing positional information for error reporting.
     * This object is immutable.
     */
    class SourceLocation {
      // The + prefix indicates that these fields aren't writeable
      // Lexer holding the input string.
      // Start offset, zero-based inclusive.
      // End offset, zero-based exclusive.
      constructor(lexer, start, end) {
        this.lexer = void 0;
        this.start = void 0;
        this.end = void 0;
        this.lexer = lexer;
        this.start = start;
        this.end = end;
      }
      /**
       * Merges two `SourceLocation`s from location providers, given they are
       * provided in order of appearance.
       * - Returns the first one's location if only the first is provided.
       * - Returns a merged range of the first and the last if both are provided
       *   and their lexers match.
       * - Otherwise, returns null.
       */


      static range(first, second) {
        if (!second) {
          return first && first.loc;
        } else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) {
          return null;
        } else {
          return new SourceLocation(first.loc.lexer, first.loc.start, second.loc.end);
        }
      }

    }

    /**
     * Interface required to break circular dependency between Token, Lexer, and
     * ParseError.
     */

    /**
     * The resulting token returned from `lex`.
     *
     * It consists of the token text plus some position information.
     * The position information is essentially a range in an input string,
     * but instead of referencing the bare input string, we refer to the lexer.
     * That way it is possible to attach extra metadata to the input string,
     * like for example a file name or similar.
     *
     * The position information is optional, so it is OK to construct synthetic
     * tokens if appropriate. Not providing available position information may
     * lead to degraded error reporting, though.
     */
    class Token {
      // don't expand the token
      // used in \noexpand
      constructor(text, // the text of this token
      loc) {
        this.text = void 0;
        this.loc = void 0;
        this.noexpand = void 0;
        this.treatAsRelax = void 0;
        this.text = text;
        this.loc = loc;
      }
      /**
       * Given a pair of tokens (this and endToken), compute a `Token` encompassing
       * the whole input range enclosed by these two.
       */


      range(endToken, // last token of the range, inclusive
      text // the text of the newly constructed token
      ) {
        return new Token(text, SourceLocation.range(this, endToken));
      }

    }

    /**
     * This is the ParseError class, which is the main error thrown by KaTeX
     * functions when something has gone wrong. This is used to distinguish internal
     * errors from errors in the expression that the user provided.
     *
     * If possible, a caller should provide a Token or ParseNode with information
     * about where in the source string the problem occurred.
     */
    class ParseError {
      // Error start position based on passed-in Token or ParseNode.
      // Length of affected text based on passed-in Token or ParseNode.
      // The underlying error message without any context added.
      constructor(message, // The error message
      token // An object providing position information
      ) {
        this.name = void 0;
        this.position = void 0;
        this.length = void 0;
        this.rawMessage = void 0;
        var error = "KaTeX parse error: " + message;
        var start;
        var end;
        var loc = token && token.loc;

        if (loc && loc.start <= loc.end) {
          // If we have the input and a position, make the error a bit fancier
          // Get the input
          var input = loc.lexer.input; // Prepend some information

          start = loc.start;
          end = loc.end;

          if (start === input.length) {
            error += " at end of input: ";
          } else {
            error += " at position " + (start + 1) + ": ";
          } // Underline token in question using combining underscores


          var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332"); // Extract some context from the input and add it to the error

          var left;

          if (start > 15) {
            left = "…" + input.slice(start - 15, start);
          } else {
            left = input.slice(0, start);
          }

          var right;

          if (end + 15 < input.length) {
            right = input.slice(end, end + 15) + "…";
          } else {
            right = input.slice(end);
          }

          error += left + underlined + right;
        } // Some hackery to make ParseError a prototype of Error
        // See http://stackoverflow.com/a/8460753
        // $FlowFixMe


        var self = new Error(error);
        self.name = "ParseError"; // $FlowFixMe

        self.__proto__ = ParseError.prototype;
        self.position = start;

        if (start != null && end != null) {
          self.length = end - start;
        }

        self.rawMessage = message;
        return self;
      }

    } // $FlowFixMe More hackery


    ParseError.prototype.__proto__ = Error.prototype;

    /**
     * This file contains a list of utility functions which are useful in other
     * files.
     */

    /**
     * Return whether an element is contained in a list
     */
    var contains = function contains(list, elem) {
      return list.indexOf(elem) !== -1;
    };
    /**
     * Provide a default value if a setting is undefined
     * NOTE: Couldn't use `T` as the output type due to facebook/flow#5022.
     */


    var deflt = function deflt(setting, defaultIfUndefined) {
      return setting === undefined ? defaultIfUndefined : setting;
    }; // hyphenate and escape adapted from Facebook's React under Apache 2 license


    var uppercase = /([A-Z])/g;

    var hyphenate = function hyphenate(str) {
      return str.replace(uppercase, "-$1").toLowerCase();
    };

    var ESCAPE_LOOKUP = {
      "&": "&amp;",
      ">": "&gt;",
      "<": "&lt;",
      "\"": "&quot;",
      "'": "&#x27;"
    };
    var ESCAPE_REGEX = /[&><"']/g;
    /**
     * Escapes text to prevent scripting attacks.
     */

    function escape(text) {
      return String(text).replace(ESCAPE_REGEX, match => ESCAPE_LOOKUP[match]);
    }
    /**
     * Sometimes we want to pull out the innermost element of a group. In most
     * cases, this will just be the group itself, but when ordgroups and colors have
     * a single element, we want to pull that out.
     */


    var getBaseElem = function getBaseElem(group) {
      if (group.type === "ordgroup") {
        if (group.body.length === 1) {
          return getBaseElem(group.body[0]);
        } else {
          return group;
        }
      } else if (group.type === "color") {
        if (group.body.length === 1) {
          return getBaseElem(group.body[0]);
        } else {
          return group;
        }
      } else if (group.type === "font") {
        return getBaseElem(group.body);
      } else {
        return group;
      }
    };
    /**
     * TeXbook algorithms often reference "character boxes", which are simply groups
     * with a single character in them. To decide if something is a character box,
     * we find its innermost group, and see if it is a single character.
     */


    var isCharacterBox = function isCharacterBox(group) {
      var baseElem = getBaseElem(group); // These are all they types of groups which hold single characters

      return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
    };

    var assert = function assert(value) {
      if (!value) {
        throw new Error('Expected non-null, but got ' + String(value));
      }

      return value;
    };
    /**
     * Return the protocol of a URL, or "_relative" if the URL does not specify a
     * protocol (and thus is relative), or `null` if URL has invalid protocol
     * (so should be outright rejected).
     */

    var protocolFromUrl = function protocolFromUrl(url) {
      // Check for possible leading protocol.
      // https://url.spec.whatwg.org/#url-parsing strips leading whitespace
      // (U+20) or C0 control (U+00-U+1F) characters.
      // eslint-disable-next-line no-control-regex
      var protocol = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(url);

      if (!protocol) {
        return "_relative";
      } // Reject weird colons


      if (protocol[2] !== ":") {
        return null;
      } // Reject invalid characters in scheme according to
      // https://datatracker.ietf.org/doc/html/rfc3986#section-3.1


      if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(protocol[1])) {
        return null;
      } // Lowercase the protocol


      return protocol[1].toLowerCase();
    };
    var utils = {
      contains,
      deflt,
      escape,
      hyphenate,
      getBaseElem,
      isCharacterBox,
      protocolFromUrl
    };

    /* eslint no-console:0 */
    // TODO: automatically generate documentation
    // TODO: check all properties on Settings exist
    // TODO: check the type of a property on Settings matches
    var SETTINGS_SCHEMA = {
      displayMode: {
        type: "boolean",
        description: "Render math in display mode, which puts the math in " + "display style (so \\int and \\sum are large, for example), and " + "centers the math on the page on its own line.",
        cli: "-d, --display-mode"
      },
      output: {
        type: {
          enum: ["htmlAndMathml", "html", "mathml"]
        },
        description: "Determines the markup language of the output.",
        cli: "-F, --format <type>"
      },
      leqno: {
        type: "boolean",
        description: "Render display math in leqno style (left-justified tags)."
      },
      fleqn: {
        type: "boolean",
        description: "Render display math flush left."
      },
      throwOnError: {
        type: "boolean",
        default: true,
        cli: "-t, --no-throw-on-error",
        cliDescription: "Render errors (in the color given by --error-color) ins" + "tead of throwing a ParseError exception when encountering an error."
      },
      errorColor: {
        type: "string",
        default: "#cc0000",
        cli: "-c, --error-color <color>",
        cliDescription: "A color string given in the format 'rgb' or 'rrggbb' " + "(no #). This option determines the color of errors rendered by the " + "-t option.",
        cliProcessor: color => "#" + color
      },
      macros: {
        type: "object",
        cli: "-m, --macro <def>",
        cliDescription: "Define custom macro of the form '\\foo:expansion' (use " + "multiple -m arguments for multiple macros).",
        cliDefault: [],
        cliProcessor: (def, defs) => {
          defs.push(def);
          return defs;
        }
      },
      minRuleThickness: {
        type: "number",
        description: "Specifies a minimum thickness, in ems, for fraction lines," + " `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, " + "`\\hdashline`, `\\underline`, `\\overline`, and the borders of " + "`\\fbox`, `\\boxed`, and `\\fcolorbox`.",
        processor: t => Math.max(0, t),
        cli: "--min-rule-thickness <size>",
        cliProcessor: parseFloat
      },
      colorIsTextColor: {
        type: "boolean",
        description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, " + "instead of LaTeX's one-argument \\color mode change.",
        cli: "-b, --color-is-text-color"
      },
      strict: {
        type: [{
          enum: ["warn", "ignore", "error"]
        }, "boolean", "function"],
        description: "Turn on strict / LaTeX faithfulness mode, which throws an " + "error if the input uses features that are not supported by LaTeX.",
        cli: "-S, --strict",
        cliDefault: false
      },
      trust: {
        type: ["boolean", "function"],
        description: "Trust the input, enabling all HTML features such as \\url.",
        cli: "-T, --trust"
      },
      maxSize: {
        type: "number",
        default: Infinity,
        description: "If non-zero, all user-specified sizes, e.g. in " + "\\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, " + "elements and spaces can be arbitrarily large",
        processor: s => Math.max(0, s),
        cli: "-s, --max-size <n>",
        cliProcessor: parseInt
      },
      maxExpand: {
        type: "number",
        default: 1000,
        description: "Limit the number of macro expansions to the specified " + "number, to prevent e.g. infinite macro loops. If set to Infinity, " + "the macro expander will try to fully expand as in LaTeX.",
        processor: n => Math.max(0, n),
        cli: "-e, --max-expand <n>",
        cliProcessor: n => n === "Infinity" ? Infinity : parseInt(n)
      },
      globalGroup: {
        type: "boolean",
        cli: false
      }
    };

    function getDefaultValue(schema) {
      if (schema.default) {
        return schema.default;
      }

      var type = schema.type;
      var defaultType = Array.isArray(type) ? type[0] : type;

      if (typeof defaultType !== 'string') {
        return defaultType.enum[0];
      }

      switch (defaultType) {
        case 'boolean':
          return false;

        case 'string':
          return '';

        case 'number':
          return 0;

        case 'object':
          return {};
      }
    }
    /**
     * The main Settings object
     *
     * The current options stored are:
     *  - displayMode: Whether the expression should be typeset as inline math
     *                 (false, the default), meaning that the math starts in
     *                 \textstyle and is placed in an inline-block); or as display
     *                 math (true), meaning that the math starts in \displaystyle
     *                 and is placed in a block with vertical margin.
     */


    class Settings {
      constructor(options) {
        this.displayMode = void 0;
        this.output = void 0;
        this.leqno = void 0;
        this.fleqn = void 0;
        this.throwOnError = void 0;
        this.errorColor = void 0;
        this.macros = void 0;
        this.minRuleThickness = void 0;
        this.colorIsTextColor = void 0;
        this.strict = void 0;
        this.trust = void 0;
        this.maxSize = void 0;
        this.maxExpand = void 0;
        this.globalGroup = void 0;
        // allow null options
        options = options || {};

        for (var prop in SETTINGS_SCHEMA) {
          if (SETTINGS_SCHEMA.hasOwnProperty(prop)) {
            // $FlowFixMe
            var schema = SETTINGS_SCHEMA[prop]; // TODO: validate options
            // $FlowFixMe

            this[prop] = options[prop] !== undefined ? schema.processor ? schema.processor(options[prop]) : options[prop] : getDefaultValue(schema);
          }
        }
      }
      /**
       * Report nonstrict (non-LaTeX-compatible) input.
       * Can safely not be called if `this.strict` is false in JavaScript.
       */


      reportNonstrict(errorCode, errorMsg, token) {
        var strict = this.strict;

        if (typeof strict === "function") {
          // Allow return value of strict function to be boolean or string
          // (or null/undefined, meaning no further processing).
          strict = strict(errorCode, errorMsg, token);
        }

        if (!strict || strict === "ignore") {
          return;
        } else if (strict === true || strict === "error") {
          throw new ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
        } else if (strict === "warn") {
          typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
        } else {
          // won't happen in type-safe code
          typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
        }
      }
      /**
       * Check whether to apply strict (LaTeX-adhering) behavior for unusual
       * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
       * instead, "error" translates to a return value of `true`, while "ignore"
       * translates to a return value of `false`.  May still print a warning:
       * "warn" prints a warning and returns `false`.
       * This is for the second category of `errorCode`s listed in the README.
       */


      useStrictBehavior(errorCode, errorMsg, token) {
        var strict = this.strict;

        if (typeof strict === "function") {
          // Allow return value of strict function to be boolean or string
          // (or null/undefined, meaning no further processing).
          // But catch any exceptions thrown by function, treating them
          // like "error".
          try {
            strict = strict(errorCode, errorMsg, token);
          } catch (error) {
            strict = "error";
          }
        }

        if (!strict || strict === "ignore") {
          return false;
        } else if (strict === true || strict === "error") {
          return true;
        } else if (strict === "warn") {
          typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
          return false;
        } else {
          // won't happen in type-safe code
          typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
          return false;
        }
      }
      /**
       * Check whether to test potentially dangerous input, and return
       * `true` (trusted) or `false` (untrusted).  The sole argument `context`
       * should be an object with `command` field specifying the relevant LaTeX
       * command (as a string starting with `\`), and any other arguments, etc.
       * If `context` has a `url` field, a `protocol` field will automatically
       * get added by this function (changing the specified object).
       */


      isTrusted(context) {
        if (context.url && !context.protocol) {
          var protocol = utils.protocolFromUrl(context.url);

          if (protocol == null) {
            return false;
          }

          context.protocol = protocol;
        }

        var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
        return Boolean(trust);
      }

    }

    /**
     * This file contains information and classes for the various kinds of styles
     * used in TeX. It provides a generic `Style` class, which holds information
     * about a specific style. It then provides instances of all the different kinds
     * of styles possible, and provides functions to move between them and get
     * information about them.
     */

    /**
     * The main style class. Contains a unique id for the style, a size (which is
     * the same for cramped and uncramped version of a style), and a cramped flag.
     */
    class Style {
      constructor(id, size, cramped) {
        this.id = void 0;
        this.size = void 0;
        this.cramped = void 0;
        this.id = id;
        this.size = size;
        this.cramped = cramped;
      }
      /**
       * Get the style of a superscript given a base in the current style.
       */


      sup() {
        return styles[sup[this.id]];
      }
      /**
       * Get the style of a subscript given a base in the current style.
       */


      sub() {
        return styles[sub[this.id]];
      }
      /**
       * Get the style of a fraction numerator given the fraction in the current
       * style.
       */


      fracNum() {
        return styles[fracNum[this.id]];
      }
      /**
       * Get the style of a fraction denominator given the fraction in the current
       * style.
       */


      fracDen() {
        return styles[fracDen[this.id]];
      }
      /**
       * Get the cramped version of a style (in particular, cramping a cramped style
       * doesn't change the style).
       */


      cramp() {
        return styles[cramp[this.id]];
      }
      /**
       * Get a text or display version of this style.
       */


      text() {
        return styles[text$1[this.id]];
      }
      /**
       * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
       */


      isTight() {
        return this.size >= 2;
      }

    } // Export an interface for type checking, but don't expose the implementation.
    // This way, no more styles can be generated.


    // IDs of the different styles
    var D = 0;
    var Dc = 1;
    var T = 2;
    var Tc = 3;
    var S = 4;
    var Sc = 5;
    var SS = 6;
    var SSc = 7; // Instances of the different styles

    var styles = [new Style(D, 0, false), new Style(Dc, 0, true), new Style(T, 1, false), new Style(Tc, 1, true), new Style(S, 2, false), new Style(Sc, 2, true), new Style(SS, 3, false), new Style(SSc, 3, true)]; // Lookup tables for switching from one style to another

    var sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
    var sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
    var fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
    var fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
    var cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
    var text$1 = [D, Dc, T, Tc, T, Tc, T, Tc]; // We only export some of the styles.

    var Style$1 = {
      DISPLAY: styles[D],
      TEXT: styles[T],
      SCRIPT: styles[S],
      SCRIPTSCRIPT: styles[SS]
    };

    /*
     * This file defines the Unicode scripts and script families that we
     * support. To add new scripts or families, just add a new entry to the
     * scriptData array below. Adding scripts to the scriptData array allows
     * characters from that script to appear in \text{} environments.
     */

    /**
     * Each script or script family has a name and an array of blocks.
     * Each block is an array of two numbers which specify the start and
     * end points (inclusive) of a block of Unicode codepoints.
     */

    /**
     * Unicode block data for the families of scripts we support in \text{}.
     * Scripts only need to appear here if they do not have font metrics.
     */
    var scriptData = [{
      // Latin characters beyond the Latin-1 characters we have metrics for.
      // Needed for Czech, Hungarian and Turkish text, for example.
      name: 'latin',
      blocks: [[0x0100, 0x024f], // Latin Extended-A and Latin Extended-B
      [0x0300, 0x036f] // Combining Diacritical marks
      ]
    }, {
      // The Cyrillic script used by Russian and related languages.
      // A Cyrillic subset used to be supported as explicitly defined
      // symbols in symbols.js
      name: 'cyrillic',
      blocks: [[0x0400, 0x04ff]]
    }, {
      // Armenian
      name: 'armenian',
      blocks: [[0x0530, 0x058F]]
    }, {
      // The Brahmic scripts of South and Southeast Asia
      // Devanagari (0900–097F)
      // Bengali (0980–09FF)
      // Gurmukhi (0A00–0A7F)
      // Gujarati (0A80–0AFF)
      // Oriya (0B00–0B7F)
      // Tamil (0B80–0BFF)
      // Telugu (0C00–0C7F)
      // Kannada (0C80–0CFF)
      // Malayalam (0D00–0D7F)
      // Sinhala (0D80–0DFF)
      // Thai (0E00–0E7F)
      // Lao (0E80–0EFF)
      // Tibetan (0F00–0FFF)
      // Myanmar (1000–109F)
      name: 'brahmic',
      blocks: [[0x0900, 0x109F]]
    }, {
      name: 'georgian',
      blocks: [[0x10A0, 0x10ff]]
    }, {
      // Chinese and Japanese.
      // The "k" in cjk is for Korean, but we've separated Korean out
      name: "cjk",
      blocks: [[0x3000, 0x30FF], // CJK symbols and punctuation, Hiragana, Katakana
      [0x4E00, 0x9FAF], // CJK ideograms
      [0xFF00, 0xFF60] // Fullwidth punctuation
      // TODO: add halfwidth Katakana and Romanji glyphs
      ]
    }, {
      // Korean
      name: 'hangul',
      blocks: [[0xAC00, 0xD7AF]]
    }];
    /**
     * Given a codepoint, return the name of the script or script family
     * it is from, or null if it is not part of a known block
     */

    function scriptFromCodepoint(codepoint) {
      for (var i = 0; i < scriptData.length; i++) {
        var script = scriptData[i];

        for (var _i = 0; _i < script.blocks.length; _i++) {
          var block = script.blocks[_i];

          if (codepoint >= block[0] && codepoint <= block[1]) {
            return script.name;
          }
        }
      }

      return null;
    }
    /**
     * A flattened version of all the supported blocks in a single array.
     * This is an optimization to make supportedCodepoint() fast.
     */

    var allBlocks = [];
    scriptData.forEach(s => s.blocks.forEach(b => allBlocks.push(...b)));
    /**
     * Given a codepoint, return true if it falls within one of the
     * scripts or script families defined above and false otherwise.
     *
     * Micro benchmarks shows that this is faster than
     * /[\u3000-\u30FF\u4E00-\u9FAF\uFF00-\uFF60\uAC00-\uD7AF\u0900-\u109F]/.test()
     * in Firefox, Chrome and Node.
     */

    function supportedCodepoint(codepoint) {
      for (var i = 0; i < allBlocks.length; i += 2) {
        if (codepoint >= allBlocks[i] && codepoint <= allBlocks[i + 1]) {
          return true;
        }
      }

      return false;
    }

    /**
     * This file provides support to domTree.js and delimiter.js.
     * It's a storehouse of path geometry for SVG images.
     */
    // In all paths below, the viewBox-to-em scale is 1000:1.
    var hLinePad = 80; // padding above a sqrt vinculum. Prevents image cropping.
    // The vinculum of a \sqrt can be made thicker by a KaTeX rendering option.
    // Think of variable extraVinculum as two detours in the SVG path.
    // The detour begins at the lower left of the area labeled extraVinculum below.
    // The detour proceeds one extraVinculum distance up and slightly to the right,
    // displacing the radiused corner between surd and vinculum. The radius is
    // traversed as usual, then the detour resumes. It goes right, to the end of
    // the very long vinculum, then down one extraVinculum distance,
    // after which it resumes regular path geometry for the radical.

    /*                                                  vinculum
                                                       /
             /▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒←extraVinculum
            / █████████████████████←0.04em (40 unit) std vinculum thickness
           / /
          / /
         / /\
        / / surd
    */

    var sqrtMain = function sqrtMain(extraVinculum, hLinePad) {
      // sqrtMain path geometry is from glyph U221A in the font KaTeX Main
      return "M95," + (622 + extraVinculum + hLinePad) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraVinculum / 2.075 + " -" + extraVinculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraVinculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
    };

    var sqrtSize1 = function sqrtSize1(extraVinculum, hLinePad) {
      // size1 is from glyph U221A in the font KaTeX_Size1-Regular
      return "M263," + (601 + extraVinculum + hLinePad) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraVinculum / 2.084 + " -" + extraVinculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraVinculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
    };

    var sqrtSize2 = function sqrtSize2(extraVinculum, hLinePad) {
      // size2 is from glyph U221A in the font KaTeX_Size2-Regular
      return "M983 " + (10 + extraVinculum + hLinePad) + "\nl" + extraVinculum / 3.13 + " -" + extraVinculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraVinculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
    };

    var sqrtSize3 = function sqrtSize3(extraVinculum, hLinePad) {
      // size3 is from glyph U221A in the font KaTeX_Size3-Regular
      return "M424," + (2398 + extraVinculum + hLinePad) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraVinculum / 4.223 + " -" + extraVinculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraVinculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraVinculum) + " " + hLinePad + "\nh400000v" + (40 + extraVinculum) + "h-400000z";
    };

    var sqrtSize4 = function sqrtSize4(extraVinculum, hLinePad) {
      // size4 is from glyph U221A in the font KaTeX_Size4-Regular
      return "M473," + (2713 + extraVinculum + hLinePad) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraVinculum / 5.298 + " -" + extraVinculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraVinculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "H1017.7z";
    };

    var phasePath = function phasePath(y) {
      var x = y / 2; // x coordinate at top of angle

      return "M400000 " + y + " H0 L" + x + " 0 l65 45 L145 " + (y - 80) + " H400000z";
    };

    var sqrtTall = function sqrtTall(extraVinculum, hLinePad, viewBoxHeight) {
      // sqrtTall is from glyph U23B7 in the font KaTeX_Size4-Regular
      // One path edge has a variable length. It runs vertically from the vinculum
      // to a point near (14 units) the bottom of the surd. The vinculum
      // is normally 40 units thick. So the length of the line in question is:
      var vertSegment = viewBoxHeight - 54 - hLinePad - extraVinculum;
      return "M702 " + (extraVinculum + hLinePad) + "H400000" + (40 + extraVinculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad + "H400000v" + (40 + extraVinculum) + "H742z";
    };

    var sqrtPath = function sqrtPath(size, extraVinculum, viewBoxHeight) {
      extraVinculum = 1000 * extraVinculum; // Convert from document ems to viewBox.

      var path = "";

      switch (size) {
        case "sqrtMain":
          path = sqrtMain(extraVinculum, hLinePad);
          break;

        case "sqrtSize1":
          path = sqrtSize1(extraVinculum, hLinePad);
          break;

        case "sqrtSize2":
          path = sqrtSize2(extraVinculum, hLinePad);
          break;

        case "sqrtSize3":
          path = sqrtSize3(extraVinculum, hLinePad);
          break;

        case "sqrtSize4":
          path = sqrtSize4(extraVinculum, hLinePad);
          break;

        case "sqrtTall":
          path = sqrtTall(extraVinculum, hLinePad, viewBoxHeight);
      }

      return path;
    };
    var innerPath = function innerPath(name, height) {
      // The inner part of stretchy tall delimiters
      switch (name) {
        case "\u239c":
          return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";

        case "\u2223":
          return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";

        case "\u2225":
          return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");

        case "\u239f":
          return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";

        case "\u23a2":
          return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";

        case "\u23a5":
          return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";

        case "\u23aa":
          return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";

        case "\u23d0":
          return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";

        case "\u2016":
          return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");

        default:
          return "";
      }
    };
    var path = {
      // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
      doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
      // doublerightarrow is from glyph U+21D2 in font KaTeX Main
      doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
      // leftarrow is from glyph U+2190 in font KaTeX Main
      leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
      // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
      leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
      leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
      // overgroup is from the MnSymbol package (public domain)
      leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
      leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
      // Harpoons are from glyph U+21BD in font KaTeX Main
      leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
      leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
      leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
      leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
      // hook is from glyph U+21A9 in font KaTeX Main
      lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
      leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
      leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
      // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
      leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
      longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
      midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
      midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
      oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
      oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
      oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
      oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
      rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
      rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
      rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
      rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
      rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
      rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
      rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
      rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
      rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
      righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
      rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
      rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
      // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
      twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
      twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
      // tilde1 is a modified version of a glyph from the MnSymbol package
      tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
      // ditto tilde2, tilde3, & tilde4
      tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
      tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
      tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
      // vec is from glyph U+20D7 in font KaTeX Main
      vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
      // widehat1 is a modified version of a glyph from the MnSymbol package
      widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
      // ditto widehat2, widehat3, & widehat4
      widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
      widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
      widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
      // widecheck paths are all inverted versions of widehat
      widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
      widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
      widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
      widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
      // The next ten paths support reaction arrows from the mhchem package.
      // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
      // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
      baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
      // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
      rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
      // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
      // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
      baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
      rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
      shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
      shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
    };
    var tallDelim = function tallDelim(label, midHeight) {
      switch (label) {
        case "lbrack":
          return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + midHeight + " v1759 h84z";

        case "rbrack":
          return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + midHeight + " v1759 h84z";

        case "vert":
          return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z";

        case "doublevert":
          return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z\nM367 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + midHeight + " v585 h43z";

        case "lfloor":
          return "M319 602 V0 H403 V602 v" + midHeight + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";

        case "rfloor":
          return "M319 602 V0 H403 V602 v" + midHeight + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";

        case "lceil":
          return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v602 h84z\nM403 1759 V0 H319 V1759 v" + midHeight + " v602 h84z";

        case "rceil":
          return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + midHeight + " v602 h84z";

        case "lparen":
          return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (midHeight + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (midHeight + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";

        case "rparen":
          return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (midHeight + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (midHeight + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";

        default:
          // We should not ever get here.
          throw new Error("Unknown stretchy delimiter.");
      }
    };

    /**
     * This node represents a document fragment, which contains elements, but when
     * placed into the DOM doesn't have any representation itself. It only contains
     * children and doesn't have any DOM node properties.
     */
    class DocumentFragment {
      // HtmlDomNode
      // Never used; needed for satisfying interface.
      constructor(children) {
        this.children = void 0;
        this.classes = void 0;
        this.height = void 0;
        this.depth = void 0;
        this.maxFontSize = void 0;
        this.style = void 0;
        this.children = children;
        this.classes = [];
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
        this.style = {};
      }

      hasClass(className) {
        return utils.contains(this.classes, className);
      }
      /** Convert the fragment into a node. */


      toNode() {
        var frag = document.createDocumentFragment();

        for (var i = 0; i < this.children.length; i++) {
          frag.appendChild(this.children[i].toNode());
        }

        return frag;
      }
      /** Convert the fragment into HTML markup. */


      toMarkup() {
        var markup = ""; // Simply concatenate the markup for the children together.

        for (var i = 0; i < this.children.length; i++) {
          markup += this.children[i].toMarkup();
        }

        return markup;
      }
      /**
       * Converts the math node into a string, similar to innerText. Applies to
       * MathDomNode's only.
       */


      toText() {
        // To avoid this, we would subclass documentFragment separately for
        // MathML, but polyfills for subclassing is expensive per PR 1469.
        // $FlowFixMe: Only works for ChildType = MathDomNode.
        var toText = child => child.toText();

        return this.children.map(toText).join("");
      }

    }

    // This file is GENERATED by buildMetrics.sh. DO NOT MODIFY.
    var fontMetricsData = {
      "AMS-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "65": [0, 0.68889, 0, 0, 0.72222],
        "66": [0, 0.68889, 0, 0, 0.66667],
        "67": [0, 0.68889, 0, 0, 0.72222],
        "68": [0, 0.68889, 0, 0, 0.72222],
        "69": [0, 0.68889, 0, 0, 0.66667],
        "70": [0, 0.68889, 0, 0, 0.61111],
        "71": [0, 0.68889, 0, 0, 0.77778],
        "72": [0, 0.68889, 0, 0, 0.77778],
        "73": [0, 0.68889, 0, 0, 0.38889],
        "74": [0.16667, 0.68889, 0, 0, 0.5],
        "75": [0, 0.68889, 0, 0, 0.77778],
        "76": [0, 0.68889, 0, 0, 0.66667],
        "77": [0, 0.68889, 0, 0, 0.94445],
        "78": [0, 0.68889, 0, 0, 0.72222],
        "79": [0.16667, 0.68889, 0, 0, 0.77778],
        "80": [0, 0.68889, 0, 0, 0.61111],
        "81": [0.16667, 0.68889, 0, 0, 0.77778],
        "82": [0, 0.68889, 0, 0, 0.72222],
        "83": [0, 0.68889, 0, 0, 0.55556],
        "84": [0, 0.68889, 0, 0, 0.66667],
        "85": [0, 0.68889, 0, 0, 0.72222],
        "86": [0, 0.68889, 0, 0, 0.72222],
        "87": [0, 0.68889, 0, 0, 1.0],
        "88": [0, 0.68889, 0, 0, 0.72222],
        "89": [0, 0.68889, 0, 0, 0.72222],
        "90": [0, 0.68889, 0, 0, 0.66667],
        "107": [0, 0.68889, 0, 0, 0.55556],
        "160": [0, 0, 0, 0, 0.25],
        "165": [0, 0.675, 0.025, 0, 0.75],
        "174": [0.15559, 0.69224, 0, 0, 0.94666],
        "240": [0, 0.68889, 0, 0, 0.55556],
        "295": [0, 0.68889, 0, 0, 0.54028],
        "710": [0, 0.825, 0, 0, 2.33334],
        "732": [0, 0.9, 0, 0, 2.33334],
        "770": [0, 0.825, 0, 0, 2.33334],
        "771": [0, 0.9, 0, 0, 2.33334],
        "989": [0.08167, 0.58167, 0, 0, 0.77778],
        "1008": [0, 0.43056, 0.04028, 0, 0.66667],
        "8245": [0, 0.54986, 0, 0, 0.275],
        "8463": [0, 0.68889, 0, 0, 0.54028],
        "8487": [0, 0.68889, 0, 0, 0.72222],
        "8498": [0, 0.68889, 0, 0, 0.55556],
        "8502": [0, 0.68889, 0, 0, 0.66667],
        "8503": [0, 0.68889, 0, 0, 0.44445],
        "8504": [0, 0.68889, 0, 0, 0.66667],
        "8513": [0, 0.68889, 0, 0, 0.63889],
        "8592": [-0.03598, 0.46402, 0, 0, 0.5],
        "8594": [-0.03598, 0.46402, 0, 0, 0.5],
        "8602": [-0.13313, 0.36687, 0, 0, 1.0],
        "8603": [-0.13313, 0.36687, 0, 0, 1.0],
        "8606": [0.01354, 0.52239, 0, 0, 1.0],
        "8608": [0.01354, 0.52239, 0, 0, 1.0],
        "8610": [0.01354, 0.52239, 0, 0, 1.11111],
        "8611": [0.01354, 0.52239, 0, 0, 1.11111],
        "8619": [0, 0.54986, 0, 0, 1.0],
        "8620": [0, 0.54986, 0, 0, 1.0],
        "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
        "8622": [-0.13313, 0.36687, 0, 0, 1.0],
        "8624": [0, 0.69224, 0, 0, 0.5],
        "8625": [0, 0.69224, 0, 0, 0.5],
        "8630": [0, 0.43056, 0, 0, 1.0],
        "8631": [0, 0.43056, 0, 0, 1.0],
        "8634": [0.08198, 0.58198, 0, 0, 0.77778],
        "8635": [0.08198, 0.58198, 0, 0, 0.77778],
        "8638": [0.19444, 0.69224, 0, 0, 0.41667],
        "8639": [0.19444, 0.69224, 0, 0, 0.41667],
        "8642": [0.19444, 0.69224, 0, 0, 0.41667],
        "8643": [0.19444, 0.69224, 0, 0, 0.41667],
        "8644": [0.1808, 0.675, 0, 0, 1.0],
        "8646": [0.1808, 0.675, 0, 0, 1.0],
        "8647": [0.1808, 0.675, 0, 0, 1.0],
        "8648": [0.19444, 0.69224, 0, 0, 0.83334],
        "8649": [0.1808, 0.675, 0, 0, 1.0],
        "8650": [0.19444, 0.69224, 0, 0, 0.83334],
        "8651": [0.01354, 0.52239, 0, 0, 1.0],
        "8652": [0.01354, 0.52239, 0, 0, 1.0],
        "8653": [-0.13313, 0.36687, 0, 0, 1.0],
        "8654": [-0.13313, 0.36687, 0, 0, 1.0],
        "8655": [-0.13313, 0.36687, 0, 0, 1.0],
        "8666": [0.13667, 0.63667, 0, 0, 1.0],
        "8667": [0.13667, 0.63667, 0, 0, 1.0],
        "8669": [-0.13313, 0.37788, 0, 0, 1.0],
        "8672": [-0.064, 0.437, 0, 0, 1.334],
        "8674": [-0.064, 0.437, 0, 0, 1.334],
        "8705": [0, 0.825, 0, 0, 0.5],
        "8708": [0, 0.68889, 0, 0, 0.55556],
        "8709": [0.08167, 0.58167, 0, 0, 0.77778],
        "8717": [0, 0.43056, 0, 0, 0.42917],
        "8722": [-0.03598, 0.46402, 0, 0, 0.5],
        "8724": [0.08198, 0.69224, 0, 0, 0.77778],
        "8726": [0.08167, 0.58167, 0, 0, 0.77778],
        "8733": [0, 0.69224, 0, 0, 0.77778],
        "8736": [0, 0.69224, 0, 0, 0.72222],
        "8737": [0, 0.69224, 0, 0, 0.72222],
        "8738": [0.03517, 0.52239, 0, 0, 0.72222],
        "8739": [0.08167, 0.58167, 0, 0, 0.22222],
        "8740": [0.25142, 0.74111, 0, 0, 0.27778],
        "8741": [0.08167, 0.58167, 0, 0, 0.38889],
        "8742": [0.25142, 0.74111, 0, 0, 0.5],
        "8756": [0, 0.69224, 0, 0, 0.66667],
        "8757": [0, 0.69224, 0, 0, 0.66667],
        "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
        "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
        "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
        "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
        "8774": [0.30274, 0.79383, 0, 0, 0.77778],
        "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
        "8778": [0.08167, 0.58167, 0, 0, 0.77778],
        "8782": [0.06062, 0.54986, 0, 0, 0.77778],
        "8783": [0.06062, 0.54986, 0, 0, 0.77778],
        "8785": [0.08198, 0.58198, 0, 0, 0.77778],
        "8786": [0.08198, 0.58198, 0, 0, 0.77778],
        "8787": [0.08198, 0.58198, 0, 0, 0.77778],
        "8790": [0, 0.69224, 0, 0, 0.77778],
        "8791": [0.22958, 0.72958, 0, 0, 0.77778],
        "8796": [0.08198, 0.91667, 0, 0, 0.77778],
        "8806": [0.25583, 0.75583, 0, 0, 0.77778],
        "8807": [0.25583, 0.75583, 0, 0, 0.77778],
        "8808": [0.25142, 0.75726, 0, 0, 0.77778],
        "8809": [0.25142, 0.75726, 0, 0, 0.77778],
        "8812": [0.25583, 0.75583, 0, 0, 0.5],
        "8814": [0.20576, 0.70576, 0, 0, 0.77778],
        "8815": [0.20576, 0.70576, 0, 0, 0.77778],
        "8816": [0.30274, 0.79383, 0, 0, 0.77778],
        "8817": [0.30274, 0.79383, 0, 0, 0.77778],
        "8818": [0.22958, 0.72958, 0, 0, 0.77778],
        "8819": [0.22958, 0.72958, 0, 0, 0.77778],
        "8822": [0.1808, 0.675, 0, 0, 0.77778],
        "8823": [0.1808, 0.675, 0, 0, 0.77778],
        "8828": [0.13667, 0.63667, 0, 0, 0.77778],
        "8829": [0.13667, 0.63667, 0, 0, 0.77778],
        "8830": [0.22958, 0.72958, 0, 0, 0.77778],
        "8831": [0.22958, 0.72958, 0, 0, 0.77778],
        "8832": [0.20576, 0.70576, 0, 0, 0.77778],
        "8833": [0.20576, 0.70576, 0, 0, 0.77778],
        "8840": [0.30274, 0.79383, 0, 0, 0.77778],
        "8841": [0.30274, 0.79383, 0, 0, 0.77778],
        "8842": [0.13597, 0.63597, 0, 0, 0.77778],
        "8843": [0.13597, 0.63597, 0, 0, 0.77778],
        "8847": [0.03517, 0.54986, 0, 0, 0.77778],
        "8848": [0.03517, 0.54986, 0, 0, 0.77778],
        "8858": [0.08198, 0.58198, 0, 0, 0.77778],
        "8859": [0.08198, 0.58198, 0, 0, 0.77778],
        "8861": [0.08198, 0.58198, 0, 0, 0.77778],
        "8862": [0, 0.675, 0, 0, 0.77778],
        "8863": [0, 0.675, 0, 0, 0.77778],
        "8864": [0, 0.675, 0, 0, 0.77778],
        "8865": [0, 0.675, 0, 0, 0.77778],
        "8872": [0, 0.69224, 0, 0, 0.61111],
        "8873": [0, 0.69224, 0, 0, 0.72222],
        "8874": [0, 0.69224, 0, 0, 0.88889],
        "8876": [0, 0.68889, 0, 0, 0.61111],
        "8877": [0, 0.68889, 0, 0, 0.61111],
        "8878": [0, 0.68889, 0, 0, 0.72222],
        "8879": [0, 0.68889, 0, 0, 0.72222],
        "8882": [0.03517, 0.54986, 0, 0, 0.77778],
        "8883": [0.03517, 0.54986, 0, 0, 0.77778],
        "8884": [0.13667, 0.63667, 0, 0, 0.77778],
        "8885": [0.13667, 0.63667, 0, 0, 0.77778],
        "8888": [0, 0.54986, 0, 0, 1.11111],
        "8890": [0.19444, 0.43056, 0, 0, 0.55556],
        "8891": [0.19444, 0.69224, 0, 0, 0.61111],
        "8892": [0.19444, 0.69224, 0, 0, 0.61111],
        "8901": [0, 0.54986, 0, 0, 0.27778],
        "8903": [0.08167, 0.58167, 0, 0, 0.77778],
        "8905": [0.08167, 0.58167, 0, 0, 0.77778],
        "8906": [0.08167, 0.58167, 0, 0, 0.77778],
        "8907": [0, 0.69224, 0, 0, 0.77778],
        "8908": [0, 0.69224, 0, 0, 0.77778],
        "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
        "8910": [0, 0.54986, 0, 0, 0.76042],
        "8911": [0, 0.54986, 0, 0, 0.76042],
        "8912": [0.03517, 0.54986, 0, 0, 0.77778],
        "8913": [0.03517, 0.54986, 0, 0, 0.77778],
        "8914": [0, 0.54986, 0, 0, 0.66667],
        "8915": [0, 0.54986, 0, 0, 0.66667],
        "8916": [0, 0.69224, 0, 0, 0.66667],
        "8918": [0.0391, 0.5391, 0, 0, 0.77778],
        "8919": [0.0391, 0.5391, 0, 0, 0.77778],
        "8920": [0.03517, 0.54986, 0, 0, 1.33334],
        "8921": [0.03517, 0.54986, 0, 0, 1.33334],
        "8922": [0.38569, 0.88569, 0, 0, 0.77778],
        "8923": [0.38569, 0.88569, 0, 0, 0.77778],
        "8926": [0.13667, 0.63667, 0, 0, 0.77778],
        "8927": [0.13667, 0.63667, 0, 0, 0.77778],
        "8928": [0.30274, 0.79383, 0, 0, 0.77778],
        "8929": [0.30274, 0.79383, 0, 0, 0.77778],
        "8934": [0.23222, 0.74111, 0, 0, 0.77778],
        "8935": [0.23222, 0.74111, 0, 0, 0.77778],
        "8936": [0.23222, 0.74111, 0, 0, 0.77778],
        "8937": [0.23222, 0.74111, 0, 0, 0.77778],
        "8938": [0.20576, 0.70576, 0, 0, 0.77778],
        "8939": [0.20576, 0.70576, 0, 0, 0.77778],
        "8940": [0.30274, 0.79383, 0, 0, 0.77778],
        "8941": [0.30274, 0.79383, 0, 0, 0.77778],
        "8994": [0.19444, 0.69224, 0, 0, 0.77778],
        "8995": [0.19444, 0.69224, 0, 0, 0.77778],
        "9416": [0.15559, 0.69224, 0, 0, 0.90222],
        "9484": [0, 0.69224, 0, 0, 0.5],
        "9488": [0, 0.69224, 0, 0, 0.5],
        "9492": [0, 0.37788, 0, 0, 0.5],
        "9496": [0, 0.37788, 0, 0, 0.5],
        "9585": [0.19444, 0.68889, 0, 0, 0.88889],
        "9586": [0.19444, 0.74111, 0, 0, 0.88889],
        "9632": [0, 0.675, 0, 0, 0.77778],
        "9633": [0, 0.675, 0, 0, 0.77778],
        "9650": [0, 0.54986, 0, 0, 0.72222],
        "9651": [0, 0.54986, 0, 0, 0.72222],
        "9654": [0.03517, 0.54986, 0, 0, 0.77778],
        "9660": [0, 0.54986, 0, 0, 0.72222],
        "9661": [0, 0.54986, 0, 0, 0.72222],
        "9664": [0.03517, 0.54986, 0, 0, 0.77778],
        "9674": [0.11111, 0.69224, 0, 0, 0.66667],
        "9733": [0.19444, 0.69224, 0, 0, 0.94445],
        "10003": [0, 0.69224, 0, 0, 0.83334],
        "10016": [0, 0.69224, 0, 0, 0.83334],
        "10731": [0.11111, 0.69224, 0, 0, 0.66667],
        "10846": [0.19444, 0.75583, 0, 0, 0.61111],
        "10877": [0.13667, 0.63667, 0, 0, 0.77778],
        "10878": [0.13667, 0.63667, 0, 0, 0.77778],
        "10885": [0.25583, 0.75583, 0, 0, 0.77778],
        "10886": [0.25583, 0.75583, 0, 0, 0.77778],
        "10887": [0.13597, 0.63597, 0, 0, 0.77778],
        "10888": [0.13597, 0.63597, 0, 0, 0.77778],
        "10889": [0.26167, 0.75726, 0, 0, 0.77778],
        "10890": [0.26167, 0.75726, 0, 0, 0.77778],
        "10891": [0.48256, 0.98256, 0, 0, 0.77778],
        "10892": [0.48256, 0.98256, 0, 0, 0.77778],
        "10901": [0.13667, 0.63667, 0, 0, 0.77778],
        "10902": [0.13667, 0.63667, 0, 0, 0.77778],
        "10933": [0.25142, 0.75726, 0, 0, 0.77778],
        "10934": [0.25142, 0.75726, 0, 0, 0.77778],
        "10935": [0.26167, 0.75726, 0, 0, 0.77778],
        "10936": [0.26167, 0.75726, 0, 0, 0.77778],
        "10937": [0.26167, 0.75726, 0, 0, 0.77778],
        "10938": [0.26167, 0.75726, 0, 0, 0.77778],
        "10949": [0.25583, 0.75583, 0, 0, 0.77778],
        "10950": [0.25583, 0.75583, 0, 0, 0.77778],
        "10955": [0.28481, 0.79383, 0, 0, 0.77778],
        "10956": [0.28481, 0.79383, 0, 0, 0.77778],
        "57350": [0.08167, 0.58167, 0, 0, 0.22222],
        "57351": [0.08167, 0.58167, 0, 0, 0.38889],
        "57352": [0.08167, 0.58167, 0, 0, 0.77778],
        "57353": [0, 0.43056, 0.04028, 0, 0.66667],
        "57356": [0.25142, 0.75726, 0, 0, 0.77778],
        "57357": [0.25142, 0.75726, 0, 0, 0.77778],
        "57358": [0.41951, 0.91951, 0, 0, 0.77778],
        "57359": [0.30274, 0.79383, 0, 0, 0.77778],
        "57360": [0.30274, 0.79383, 0, 0, 0.77778],
        "57361": [0.41951, 0.91951, 0, 0, 0.77778],
        "57366": [0.25142, 0.75726, 0, 0, 0.77778],
        "57367": [0.25142, 0.75726, 0, 0, 0.77778],
        "57368": [0.25142, 0.75726, 0, 0, 0.77778],
        "57369": [0.25142, 0.75726, 0, 0, 0.77778],
        "57370": [0.13597, 0.63597, 0, 0, 0.77778],
        "57371": [0.13597, 0.63597, 0, 0, 0.77778]
      },
      "Caligraphic-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "65": [0, 0.68333, 0, 0.19445, 0.79847],
        "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
        "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
        "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
        "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
        "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
        "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
        "72": [0, 0.68333, 0.00965, 0.11111, 0.84452],
        "73": [0, 0.68333, 0.07382, 0, 0.54452],
        "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
        "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
        "76": [0, 0.68333, 0, 0.13889, 0.68972],
        "77": [0, 0.68333, 0, 0.13889, 1.2009],
        "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
        "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
        "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
        "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
        "82": [0, 0.68333, 0, 0.08334, 0.8475],
        "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
        "84": [0, 0.68333, 0.25417, 0, 0.54464],
        "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
        "86": [0, 0.68333, 0.08222, 0, 0.61278],
        "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
        "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
        "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
        "90": [0, 0.68333, 0.07944, 0.13889, 0.72473],
        "160": [0, 0, 0, 0, 0.25]
      },
      "Fraktur-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69141, 0, 0, 0.29574],
        "34": [0, 0.69141, 0, 0, 0.21471],
        "38": [0, 0.69141, 0, 0, 0.73786],
        "39": [0, 0.69141, 0, 0, 0.21201],
        "40": [0.24982, 0.74947, 0, 0, 0.38865],
        "41": [0.24982, 0.74947, 0, 0, 0.38865],
        "42": [0, 0.62119, 0, 0, 0.27764],
        "43": [0.08319, 0.58283, 0, 0, 0.75623],
        "44": [0, 0.10803, 0, 0, 0.27764],
        "45": [0.08319, 0.58283, 0, 0, 0.75623],
        "46": [0, 0.10803, 0, 0, 0.27764],
        "47": [0.24982, 0.74947, 0, 0, 0.50181],
        "48": [0, 0.47534, 0, 0, 0.50181],
        "49": [0, 0.47534, 0, 0, 0.50181],
        "50": [0, 0.47534, 0, 0, 0.50181],
        "51": [0.18906, 0.47534, 0, 0, 0.50181],
        "52": [0.18906, 0.47534, 0, 0, 0.50181],
        "53": [0.18906, 0.47534, 0, 0, 0.50181],
        "54": [0, 0.69141, 0, 0, 0.50181],
        "55": [0.18906, 0.47534, 0, 0, 0.50181],
        "56": [0, 0.69141, 0, 0, 0.50181],
        "57": [0.18906, 0.47534, 0, 0, 0.50181],
        "58": [0, 0.47534, 0, 0, 0.21606],
        "59": [0.12604, 0.47534, 0, 0, 0.21606],
        "61": [-0.13099, 0.36866, 0, 0, 0.75623],
        "63": [0, 0.69141, 0, 0, 0.36245],
        "65": [0, 0.69141, 0, 0, 0.7176],
        "66": [0, 0.69141, 0, 0, 0.88397],
        "67": [0, 0.69141, 0, 0, 0.61254],
        "68": [0, 0.69141, 0, 0, 0.83158],
        "69": [0, 0.69141, 0, 0, 0.66278],
        "70": [0.12604, 0.69141, 0, 0, 0.61119],
        "71": [0, 0.69141, 0, 0, 0.78539],
        "72": [0.06302, 0.69141, 0, 0, 0.7203],
        "73": [0, 0.69141, 0, 0, 0.55448],
        "74": [0.12604, 0.69141, 0, 0, 0.55231],
        "75": [0, 0.69141, 0, 0, 0.66845],
        "76": [0, 0.69141, 0, 0, 0.66602],
        "77": [0, 0.69141, 0, 0, 1.04953],
        "78": [0, 0.69141, 0, 0, 0.83212],
        "79": [0, 0.69141, 0, 0, 0.82699],
        "80": [0.18906, 0.69141, 0, 0, 0.82753],
        "81": [0.03781, 0.69141, 0, 0, 0.82699],
        "82": [0, 0.69141, 0, 0, 0.82807],
        "83": [0, 0.69141, 0, 0, 0.82861],
        "84": [0, 0.69141, 0, 0, 0.66899],
        "85": [0, 0.69141, 0, 0, 0.64576],
        "86": [0, 0.69141, 0, 0, 0.83131],
        "87": [0, 0.69141, 0, 0, 1.04602],
        "88": [0, 0.69141, 0, 0, 0.71922],
        "89": [0.18906, 0.69141, 0, 0, 0.83293],
        "90": [0.12604, 0.69141, 0, 0, 0.60201],
        "91": [0.24982, 0.74947, 0, 0, 0.27764],
        "93": [0.24982, 0.74947, 0, 0, 0.27764],
        "94": [0, 0.69141, 0, 0, 0.49965],
        "97": [0, 0.47534, 0, 0, 0.50046],
        "98": [0, 0.69141, 0, 0, 0.51315],
        "99": [0, 0.47534, 0, 0, 0.38946],
        "100": [0, 0.62119, 0, 0, 0.49857],
        "101": [0, 0.47534, 0, 0, 0.40053],
        "102": [0.18906, 0.69141, 0, 0, 0.32626],
        "103": [0.18906, 0.47534, 0, 0, 0.5037],
        "104": [0.18906, 0.69141, 0, 0, 0.52126],
        "105": [0, 0.69141, 0, 0, 0.27899],
        "106": [0, 0.69141, 0, 0, 0.28088],
        "107": [0, 0.69141, 0, 0, 0.38946],
        "108": [0, 0.69141, 0, 0, 0.27953],
        "109": [0, 0.47534, 0, 0, 0.76676],
        "110": [0, 0.47534, 0, 0, 0.52666],
        "111": [0, 0.47534, 0, 0, 0.48885],
        "112": [0.18906, 0.52396, 0, 0, 0.50046],
        "113": [0.18906, 0.47534, 0, 0, 0.48912],
        "114": [0, 0.47534, 0, 0, 0.38919],
        "115": [0, 0.47534, 0, 0, 0.44266],
        "116": [0, 0.62119, 0, 0, 0.33301],
        "117": [0, 0.47534, 0, 0, 0.5172],
        "118": [0, 0.52396, 0, 0, 0.5118],
        "119": [0, 0.52396, 0, 0, 0.77351],
        "120": [0.18906, 0.47534, 0, 0, 0.38865],
        "121": [0.18906, 0.47534, 0, 0, 0.49884],
        "122": [0.18906, 0.47534, 0, 0, 0.39054],
        "160": [0, 0, 0, 0, 0.25],
        "8216": [0, 0.69141, 0, 0, 0.21471],
        "8217": [0, 0.69141, 0, 0, 0.21471],
        "58112": [0, 0.62119, 0, 0, 0.49749],
        "58113": [0, 0.62119, 0, 0, 0.4983],
        "58114": [0.18906, 0.69141, 0, 0, 0.33328],
        "58115": [0.18906, 0.69141, 0, 0, 0.32923],
        "58116": [0.18906, 0.47534, 0, 0, 0.50343],
        "58117": [0, 0.69141, 0, 0, 0.33301],
        "58118": [0, 0.62119, 0, 0, 0.33409],
        "58119": [0, 0.47534, 0, 0, 0.50073]
      },
      "Main-Bold": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0, 0, 0.35],
        "34": [0, 0.69444, 0, 0, 0.60278],
        "35": [0.19444, 0.69444, 0, 0, 0.95833],
        "36": [0.05556, 0.75, 0, 0, 0.575],
        "37": [0.05556, 0.75, 0, 0, 0.95833],
        "38": [0, 0.69444, 0, 0, 0.89444],
        "39": [0, 0.69444, 0, 0, 0.31944],
        "40": [0.25, 0.75, 0, 0, 0.44722],
        "41": [0.25, 0.75, 0, 0, 0.44722],
        "42": [0, 0.75, 0, 0, 0.575],
        "43": [0.13333, 0.63333, 0, 0, 0.89444],
        "44": [0.19444, 0.15556, 0, 0, 0.31944],
        "45": [0, 0.44444, 0, 0, 0.38333],
        "46": [0, 0.15556, 0, 0, 0.31944],
        "47": [0.25, 0.75, 0, 0, 0.575],
        "48": [0, 0.64444, 0, 0, 0.575],
        "49": [0, 0.64444, 0, 0, 0.575],
        "50": [0, 0.64444, 0, 0, 0.575],
        "51": [0, 0.64444, 0, 0, 0.575],
        "52": [0, 0.64444, 0, 0, 0.575],
        "53": [0, 0.64444, 0, 0, 0.575],
        "54": [0, 0.64444, 0, 0, 0.575],
        "55": [0, 0.64444, 0, 0, 0.575],
        "56": [0, 0.64444, 0, 0, 0.575],
        "57": [0, 0.64444, 0, 0, 0.575],
        "58": [0, 0.44444, 0, 0, 0.31944],
        "59": [0.19444, 0.44444, 0, 0, 0.31944],
        "60": [0.08556, 0.58556, 0, 0, 0.89444],
        "61": [-0.10889, 0.39111, 0, 0, 0.89444],
        "62": [0.08556, 0.58556, 0, 0, 0.89444],
        "63": [0, 0.69444, 0, 0, 0.54305],
        "64": [0, 0.69444, 0, 0, 0.89444],
        "65": [0, 0.68611, 0, 0, 0.86944],
        "66": [0, 0.68611, 0, 0, 0.81805],
        "67": [0, 0.68611, 0, 0, 0.83055],
        "68": [0, 0.68611, 0, 0, 0.88194],
        "69": [0, 0.68611, 0, 0, 0.75555],
        "70": [0, 0.68611, 0, 0, 0.72361],
        "71": [0, 0.68611, 0, 0, 0.90416],
        "72": [0, 0.68611, 0, 0, 0.9],
        "73": [0, 0.68611, 0, 0, 0.43611],
        "74": [0, 0.68611, 0, 0, 0.59444],
        "75": [0, 0.68611, 0, 0, 0.90138],
        "76": [0, 0.68611, 0, 0, 0.69166],
        "77": [0, 0.68611, 0, 0, 1.09166],
        "78": [0, 0.68611, 0, 0, 0.9],
        "79": [0, 0.68611, 0, 0, 0.86388],
        "80": [0, 0.68611, 0, 0, 0.78611],
        "81": [0.19444, 0.68611, 0, 0, 0.86388],
        "82": [0, 0.68611, 0, 0, 0.8625],
        "83": [0, 0.68611, 0, 0, 0.63889],
        "84": [0, 0.68611, 0, 0, 0.8],
        "85": [0, 0.68611, 0, 0, 0.88472],
        "86": [0, 0.68611, 0.01597, 0, 0.86944],
        "87": [0, 0.68611, 0.01597, 0, 1.18888],
        "88": [0, 0.68611, 0, 0, 0.86944],
        "89": [0, 0.68611, 0.02875, 0, 0.86944],
        "90": [0, 0.68611, 0, 0, 0.70277],
        "91": [0.25, 0.75, 0, 0, 0.31944],
        "92": [0.25, 0.75, 0, 0, 0.575],
        "93": [0.25, 0.75, 0, 0, 0.31944],
        "94": [0, 0.69444, 0, 0, 0.575],
        "95": [0.31, 0.13444, 0.03194, 0, 0.575],
        "97": [0, 0.44444, 0, 0, 0.55902],
        "98": [0, 0.69444, 0, 0, 0.63889],
        "99": [0, 0.44444, 0, 0, 0.51111],
        "100": [0, 0.69444, 0, 0, 0.63889],
        "101": [0, 0.44444, 0, 0, 0.52708],
        "102": [0, 0.69444, 0.10903, 0, 0.35139],
        "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
        "104": [0, 0.69444, 0, 0, 0.63889],
        "105": [0, 0.69444, 0, 0, 0.31944],
        "106": [0.19444, 0.69444, 0, 0, 0.35139],
        "107": [0, 0.69444, 0, 0, 0.60694],
        "108": [0, 0.69444, 0, 0, 0.31944],
        "109": [0, 0.44444, 0, 0, 0.95833],
        "110": [0, 0.44444, 0, 0, 0.63889],
        "111": [0, 0.44444, 0, 0, 0.575],
        "112": [0.19444, 0.44444, 0, 0, 0.63889],
        "113": [0.19444, 0.44444, 0, 0, 0.60694],
        "114": [0, 0.44444, 0, 0, 0.47361],
        "115": [0, 0.44444, 0, 0, 0.45361],
        "116": [0, 0.63492, 0, 0, 0.44722],
        "117": [0, 0.44444, 0, 0, 0.63889],
        "118": [0, 0.44444, 0.01597, 0, 0.60694],
        "119": [0, 0.44444, 0.01597, 0, 0.83055],
        "120": [0, 0.44444, 0, 0, 0.60694],
        "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
        "122": [0, 0.44444, 0, 0, 0.51111],
        "123": [0.25, 0.75, 0, 0, 0.575],
        "124": [0.25, 0.75, 0, 0, 0.31944],
        "125": [0.25, 0.75, 0, 0, 0.575],
        "126": [0.35, 0.34444, 0, 0, 0.575],
        "160": [0, 0, 0, 0, 0.25],
        "163": [0, 0.69444, 0, 0, 0.86853],
        "168": [0, 0.69444, 0, 0, 0.575],
        "172": [0, 0.44444, 0, 0, 0.76666],
        "176": [0, 0.69444, 0, 0, 0.86944],
        "177": [0.13333, 0.63333, 0, 0, 0.89444],
        "184": [0.17014, 0, 0, 0, 0.51111],
        "198": [0, 0.68611, 0, 0, 1.04166],
        "215": [0.13333, 0.63333, 0, 0, 0.89444],
        "216": [0.04861, 0.73472, 0, 0, 0.89444],
        "223": [0, 0.69444, 0, 0, 0.59722],
        "230": [0, 0.44444, 0, 0, 0.83055],
        "247": [0.13333, 0.63333, 0, 0, 0.89444],
        "248": [0.09722, 0.54167, 0, 0, 0.575],
        "305": [0, 0.44444, 0, 0, 0.31944],
        "338": [0, 0.68611, 0, 0, 1.16944],
        "339": [0, 0.44444, 0, 0, 0.89444],
        "567": [0.19444, 0.44444, 0, 0, 0.35139],
        "710": [0, 0.69444, 0, 0, 0.575],
        "711": [0, 0.63194, 0, 0, 0.575],
        "713": [0, 0.59611, 0, 0, 0.575],
        "714": [0, 0.69444, 0, 0, 0.575],
        "715": [0, 0.69444, 0, 0, 0.575],
        "728": [0, 0.69444, 0, 0, 0.575],
        "729": [0, 0.69444, 0, 0, 0.31944],
        "730": [0, 0.69444, 0, 0, 0.86944],
        "732": [0, 0.69444, 0, 0, 0.575],
        "733": [0, 0.69444, 0, 0, 0.575],
        "915": [0, 0.68611, 0, 0, 0.69166],
        "916": [0, 0.68611, 0, 0, 0.95833],
        "920": [0, 0.68611, 0, 0, 0.89444],
        "923": [0, 0.68611, 0, 0, 0.80555],
        "926": [0, 0.68611, 0, 0, 0.76666],
        "928": [0, 0.68611, 0, 0, 0.9],
        "931": [0, 0.68611, 0, 0, 0.83055],
        "933": [0, 0.68611, 0, 0, 0.89444],
        "934": [0, 0.68611, 0, 0, 0.83055],
        "936": [0, 0.68611, 0, 0, 0.89444],
        "937": [0, 0.68611, 0, 0, 0.83055],
        "8211": [0, 0.44444, 0.03194, 0, 0.575],
        "8212": [0, 0.44444, 0.03194, 0, 1.14999],
        "8216": [0, 0.69444, 0, 0, 0.31944],
        "8217": [0, 0.69444, 0, 0, 0.31944],
        "8220": [0, 0.69444, 0, 0, 0.60278],
        "8221": [0, 0.69444, 0, 0, 0.60278],
        "8224": [0.19444, 0.69444, 0, 0, 0.51111],
        "8225": [0.19444, 0.69444, 0, 0, 0.51111],
        "8242": [0, 0.55556, 0, 0, 0.34444],
        "8407": [0, 0.72444, 0.15486, 0, 0.575],
        "8463": [0, 0.69444, 0, 0, 0.66759],
        "8465": [0, 0.69444, 0, 0, 0.83055],
        "8467": [0, 0.69444, 0, 0, 0.47361],
        "8472": [0.19444, 0.44444, 0, 0, 0.74027],
        "8476": [0, 0.69444, 0, 0, 0.83055],
        "8501": [0, 0.69444, 0, 0, 0.70277],
        "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8593": [0.19444, 0.69444, 0, 0, 0.575],
        "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8595": [0.19444, 0.69444, 0, 0, 0.575],
        "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8597": [0.25, 0.75, 0, 0, 0.575],
        "8598": [0.19444, 0.69444, 0, 0, 1.14999],
        "8599": [0.19444, 0.69444, 0, 0, 1.14999],
        "8600": [0.19444, 0.69444, 0, 0, 1.14999],
        "8601": [0.19444, 0.69444, 0, 0, 1.14999],
        "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8657": [0.19444, 0.69444, 0, 0, 0.70277],
        "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8659": [0.19444, 0.69444, 0, 0, 0.70277],
        "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
        "8661": [0.25, 0.75, 0, 0, 0.70277],
        "8704": [0, 0.69444, 0, 0, 0.63889],
        "8706": [0, 0.69444, 0.06389, 0, 0.62847],
        "8707": [0, 0.69444, 0, 0, 0.63889],
        "8709": [0.05556, 0.75, 0, 0, 0.575],
        "8711": [0, 0.68611, 0, 0, 0.95833],
        "8712": [0.08556, 0.58556, 0, 0, 0.76666],
        "8715": [0.08556, 0.58556, 0, 0, 0.76666],
        "8722": [0.13333, 0.63333, 0, 0, 0.89444],
        "8723": [0.13333, 0.63333, 0, 0, 0.89444],
        "8725": [0.25, 0.75, 0, 0, 0.575],
        "8726": [0.25, 0.75, 0, 0, 0.575],
        "8727": [-0.02778, 0.47222, 0, 0, 0.575],
        "8728": [-0.02639, 0.47361, 0, 0, 0.575],
        "8729": [-0.02639, 0.47361, 0, 0, 0.575],
        "8730": [0.18, 0.82, 0, 0, 0.95833],
        "8733": [0, 0.44444, 0, 0, 0.89444],
        "8734": [0, 0.44444, 0, 0, 1.14999],
        "8736": [0, 0.69224, 0, 0, 0.72222],
        "8739": [0.25, 0.75, 0, 0, 0.31944],
        "8741": [0.25, 0.75, 0, 0, 0.575],
        "8743": [0, 0.55556, 0, 0, 0.76666],
        "8744": [0, 0.55556, 0, 0, 0.76666],
        "8745": [0, 0.55556, 0, 0, 0.76666],
        "8746": [0, 0.55556, 0, 0, 0.76666],
        "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
        "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
        "8768": [0.19444, 0.69444, 0, 0, 0.31944],
        "8771": [0.00222, 0.50222, 0, 0, 0.89444],
        "8773": [0.027, 0.638, 0, 0, 0.894],
        "8776": [0.02444, 0.52444, 0, 0, 0.89444],
        "8781": [0.00222, 0.50222, 0, 0, 0.89444],
        "8801": [0.00222, 0.50222, 0, 0, 0.89444],
        "8804": [0.19667, 0.69667, 0, 0, 0.89444],
        "8805": [0.19667, 0.69667, 0, 0, 0.89444],
        "8810": [0.08556, 0.58556, 0, 0, 1.14999],
        "8811": [0.08556, 0.58556, 0, 0, 1.14999],
        "8826": [0.08556, 0.58556, 0, 0, 0.89444],
        "8827": [0.08556, 0.58556, 0, 0, 0.89444],
        "8834": [0.08556, 0.58556, 0, 0, 0.89444],
        "8835": [0.08556, 0.58556, 0, 0, 0.89444],
        "8838": [0.19667, 0.69667, 0, 0, 0.89444],
        "8839": [0.19667, 0.69667, 0, 0, 0.89444],
        "8846": [0, 0.55556, 0, 0, 0.76666],
        "8849": [0.19667, 0.69667, 0, 0, 0.89444],
        "8850": [0.19667, 0.69667, 0, 0, 0.89444],
        "8851": [0, 0.55556, 0, 0, 0.76666],
        "8852": [0, 0.55556, 0, 0, 0.76666],
        "8853": [0.13333, 0.63333, 0, 0, 0.89444],
        "8854": [0.13333, 0.63333, 0, 0, 0.89444],
        "8855": [0.13333, 0.63333, 0, 0, 0.89444],
        "8856": [0.13333, 0.63333, 0, 0, 0.89444],
        "8857": [0.13333, 0.63333, 0, 0, 0.89444],
        "8866": [0, 0.69444, 0, 0, 0.70277],
        "8867": [0, 0.69444, 0, 0, 0.70277],
        "8868": [0, 0.69444, 0, 0, 0.89444],
        "8869": [0, 0.69444, 0, 0, 0.89444],
        "8900": [-0.02639, 0.47361, 0, 0, 0.575],
        "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
        "8902": [-0.02778, 0.47222, 0, 0, 0.575],
        "8968": [0.25, 0.75, 0, 0, 0.51111],
        "8969": [0.25, 0.75, 0, 0, 0.51111],
        "8970": [0.25, 0.75, 0, 0, 0.51111],
        "8971": [0.25, 0.75, 0, 0, 0.51111],
        "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
        "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
        "9651": [0.19444, 0.69444, 0, 0, 1.02222],
        "9657": [-0.02778, 0.47222, 0, 0, 0.575],
        "9661": [0.19444, 0.69444, 0, 0, 1.02222],
        "9667": [-0.02778, 0.47222, 0, 0, 0.575],
        "9711": [0.19444, 0.69444, 0, 0, 1.14999],
        "9824": [0.12963, 0.69444, 0, 0, 0.89444],
        "9825": [0.12963, 0.69444, 0, 0, 0.89444],
        "9826": [0.12963, 0.69444, 0, 0, 0.89444],
        "9827": [0.12963, 0.69444, 0, 0, 0.89444],
        "9837": [0, 0.75, 0, 0, 0.44722],
        "9838": [0.19444, 0.69444, 0, 0, 0.44722],
        "9839": [0.19444, 0.69444, 0, 0, 0.44722],
        "10216": [0.25, 0.75, 0, 0, 0.44722],
        "10217": [0.25, 0.75, 0, 0, 0.44722],
        "10815": [0, 0.68611, 0, 0, 0.9],
        "10927": [0.19667, 0.69667, 0, 0, 0.89444],
        "10928": [0.19667, 0.69667, 0, 0, 0.89444],
        "57376": [0.19444, 0.69444, 0, 0, 0]
      },
      "Main-BoldItalic": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0.11417, 0, 0.38611],
        "34": [0, 0.69444, 0.07939, 0, 0.62055],
        "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
        "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
        "38": [0, 0.69444, 0.08528, 0, 0.88555],
        "39": [0, 0.69444, 0.12945, 0, 0.35555],
        "40": [0.25, 0.75, 0.15806, 0, 0.47333],
        "41": [0.25, 0.75, 0.03306, 0, 0.47333],
        "42": [0, 0.75, 0.14333, 0, 0.59111],
        "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
        "44": [0.19444, 0.14722, 0, 0, 0.35555],
        "45": [0, 0.44444, 0.02611, 0, 0.41444],
        "46": [0, 0.14722, 0, 0, 0.35555],
        "47": [0.25, 0.75, 0.15806, 0, 0.59111],
        "48": [0, 0.64444, 0.13167, 0, 0.59111],
        "49": [0, 0.64444, 0.13167, 0, 0.59111],
        "50": [0, 0.64444, 0.13167, 0, 0.59111],
        "51": [0, 0.64444, 0.13167, 0, 0.59111],
        "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
        "53": [0, 0.64444, 0.13167, 0, 0.59111],
        "54": [0, 0.64444, 0.13167, 0, 0.59111],
        "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
        "56": [0, 0.64444, 0.13167, 0, 0.59111],
        "57": [0, 0.64444, 0.13167, 0, 0.59111],
        "58": [0, 0.44444, 0.06695, 0, 0.35555],
        "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
        "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
        "63": [0, 0.69444, 0.11472, 0, 0.59111],
        "64": [0, 0.69444, 0.09208, 0, 0.88555],
        "65": [0, 0.68611, 0, 0, 0.86555],
        "66": [0, 0.68611, 0.0992, 0, 0.81666],
        "67": [0, 0.68611, 0.14208, 0, 0.82666],
        "68": [0, 0.68611, 0.09062, 0, 0.87555],
        "69": [0, 0.68611, 0.11431, 0, 0.75666],
        "70": [0, 0.68611, 0.12903, 0, 0.72722],
        "71": [0, 0.68611, 0.07347, 0, 0.89527],
        "72": [0, 0.68611, 0.17208, 0, 0.8961],
        "73": [0, 0.68611, 0.15681, 0, 0.47166],
        "74": [0, 0.68611, 0.145, 0, 0.61055],
        "75": [0, 0.68611, 0.14208, 0, 0.89499],
        "76": [0, 0.68611, 0, 0, 0.69777],
        "77": [0, 0.68611, 0.17208, 0, 1.07277],
        "78": [0, 0.68611, 0.17208, 0, 0.8961],
        "79": [0, 0.68611, 0.09062, 0, 0.85499],
        "80": [0, 0.68611, 0.0992, 0, 0.78721],
        "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
        "82": [0, 0.68611, 0.02559, 0, 0.85944],
        "83": [0, 0.68611, 0.11264, 0, 0.64999],
        "84": [0, 0.68611, 0.12903, 0, 0.7961],
        "85": [0, 0.68611, 0.17208, 0, 0.88083],
        "86": [0, 0.68611, 0.18625, 0, 0.86555],
        "87": [0, 0.68611, 0.18625, 0, 1.15999],
        "88": [0, 0.68611, 0.15681, 0, 0.86555],
        "89": [0, 0.68611, 0.19803, 0, 0.86555],
        "90": [0, 0.68611, 0.14208, 0, 0.70888],
        "91": [0.25, 0.75, 0.1875, 0, 0.35611],
        "93": [0.25, 0.75, 0.09972, 0, 0.35611],
        "94": [0, 0.69444, 0.06709, 0, 0.59111],
        "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
        "97": [0, 0.44444, 0.09426, 0, 0.59111],
        "98": [0, 0.69444, 0.07861, 0, 0.53222],
        "99": [0, 0.44444, 0.05222, 0, 0.53222],
        "100": [0, 0.69444, 0.10861, 0, 0.59111],
        "101": [0, 0.44444, 0.085, 0, 0.53222],
        "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
        "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
        "104": [0, 0.69444, 0.09426, 0, 0.59111],
        "105": [0, 0.69326, 0.11387, 0, 0.35555],
        "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
        "107": [0, 0.69444, 0.11111, 0, 0.53222],
        "108": [0, 0.69444, 0.10861, 0, 0.29666],
        "109": [0, 0.44444, 0.09426, 0, 0.94444],
        "110": [0, 0.44444, 0.09426, 0, 0.64999],
        "111": [0, 0.44444, 0.07861, 0, 0.59111],
        "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
        "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
        "114": [0, 0.44444, 0.11111, 0, 0.50167],
        "115": [0, 0.44444, 0.08167, 0, 0.48694],
        "116": [0, 0.63492, 0.09639, 0, 0.385],
        "117": [0, 0.44444, 0.09426, 0, 0.62055],
        "118": [0, 0.44444, 0.11111, 0, 0.53222],
        "119": [0, 0.44444, 0.11111, 0, 0.76777],
        "120": [0, 0.44444, 0.12583, 0, 0.56055],
        "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
        "122": [0, 0.44444, 0.13889, 0, 0.49055],
        "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
        "160": [0, 0, 0, 0, 0.25],
        "168": [0, 0.69444, 0.11473, 0, 0.59111],
        "176": [0, 0.69444, 0, 0, 0.94888],
        "184": [0.17014, 0, 0, 0, 0.53222],
        "198": [0, 0.68611, 0.11431, 0, 1.02277],
        "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
        "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
        "230": [0, 0.44444, 0.085, 0, 0.82666],
        "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
        "305": [0, 0.44444, 0.09426, 0, 0.35555],
        "338": [0, 0.68611, 0.11431, 0, 1.14054],
        "339": [0, 0.44444, 0.085, 0, 0.82666],
        "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
        "710": [0, 0.69444, 0.06709, 0, 0.59111],
        "711": [0, 0.63194, 0.08271, 0, 0.59111],
        "713": [0, 0.59444, 0.10444, 0, 0.59111],
        "714": [0, 0.69444, 0.08528, 0, 0.59111],
        "715": [0, 0.69444, 0, 0, 0.59111],
        "728": [0, 0.69444, 0.10333, 0, 0.59111],
        "729": [0, 0.69444, 0.12945, 0, 0.35555],
        "730": [0, 0.69444, 0, 0, 0.94888],
        "732": [0, 0.69444, 0.11472, 0, 0.59111],
        "733": [0, 0.69444, 0.11472, 0, 0.59111],
        "915": [0, 0.68611, 0.12903, 0, 0.69777],
        "916": [0, 0.68611, 0, 0, 0.94444],
        "920": [0, 0.68611, 0.09062, 0, 0.88555],
        "923": [0, 0.68611, 0, 0, 0.80666],
        "926": [0, 0.68611, 0.15092, 0, 0.76777],
        "928": [0, 0.68611, 0.17208, 0, 0.8961],
        "931": [0, 0.68611, 0.11431, 0, 0.82666],
        "933": [0, 0.68611, 0.10778, 0, 0.88555],
        "934": [0, 0.68611, 0.05632, 0, 0.82666],
        "936": [0, 0.68611, 0.10778, 0, 0.88555],
        "937": [0, 0.68611, 0.0992, 0, 0.82666],
        "8211": [0, 0.44444, 0.09811, 0, 0.59111],
        "8212": [0, 0.44444, 0.09811, 0, 1.18221],
        "8216": [0, 0.69444, 0.12945, 0, 0.35555],
        "8217": [0, 0.69444, 0.12945, 0, 0.35555],
        "8220": [0, 0.69444, 0.16772, 0, 0.62055],
        "8221": [0, 0.69444, 0.07939, 0, 0.62055]
      },
      "Main-Italic": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0.12417, 0, 0.30667],
        "34": [0, 0.69444, 0.06961, 0, 0.51444],
        "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
        "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
        "38": [0, 0.69444, 0.09694, 0, 0.76666],
        "39": [0, 0.69444, 0.12417, 0, 0.30667],
        "40": [0.25, 0.75, 0.16194, 0, 0.40889],
        "41": [0.25, 0.75, 0.03694, 0, 0.40889],
        "42": [0, 0.75, 0.14917, 0, 0.51111],
        "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
        "44": [0.19444, 0.10556, 0, 0, 0.30667],
        "45": [0, 0.43056, 0.02826, 0, 0.35778],
        "46": [0, 0.10556, 0, 0, 0.30667],
        "47": [0.25, 0.75, 0.16194, 0, 0.51111],
        "48": [0, 0.64444, 0.13556, 0, 0.51111],
        "49": [0, 0.64444, 0.13556, 0, 0.51111],
        "50": [0, 0.64444, 0.13556, 0, 0.51111],
        "51": [0, 0.64444, 0.13556, 0, 0.51111],
        "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
        "53": [0, 0.64444, 0.13556, 0, 0.51111],
        "54": [0, 0.64444, 0.13556, 0, 0.51111],
        "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
        "56": [0, 0.64444, 0.13556, 0, 0.51111],
        "57": [0, 0.64444, 0.13556, 0, 0.51111],
        "58": [0, 0.43056, 0.0582, 0, 0.30667],
        "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
        "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
        "63": [0, 0.69444, 0.1225, 0, 0.51111],
        "64": [0, 0.69444, 0.09597, 0, 0.76666],
        "65": [0, 0.68333, 0, 0, 0.74333],
        "66": [0, 0.68333, 0.10257, 0, 0.70389],
        "67": [0, 0.68333, 0.14528, 0, 0.71555],
        "68": [0, 0.68333, 0.09403, 0, 0.755],
        "69": [0, 0.68333, 0.12028, 0, 0.67833],
        "70": [0, 0.68333, 0.13305, 0, 0.65277],
        "71": [0, 0.68333, 0.08722, 0, 0.77361],
        "72": [0, 0.68333, 0.16389, 0, 0.74333],
        "73": [0, 0.68333, 0.15806, 0, 0.38555],
        "74": [0, 0.68333, 0.14028, 0, 0.525],
        "75": [0, 0.68333, 0.14528, 0, 0.76888],
        "76": [0, 0.68333, 0, 0, 0.62722],
        "77": [0, 0.68333, 0.16389, 0, 0.89666],
        "78": [0, 0.68333, 0.16389, 0, 0.74333],
        "79": [0, 0.68333, 0.09403, 0, 0.76666],
        "80": [0, 0.68333, 0.10257, 0, 0.67833],
        "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
        "82": [0, 0.68333, 0.03868, 0, 0.72944],
        "83": [0, 0.68333, 0.11972, 0, 0.56222],
        "84": [0, 0.68333, 0.13305, 0, 0.71555],
        "85": [0, 0.68333, 0.16389, 0, 0.74333],
        "86": [0, 0.68333, 0.18361, 0, 0.74333],
        "87": [0, 0.68333, 0.18361, 0, 0.99888],
        "88": [0, 0.68333, 0.15806, 0, 0.74333],
        "89": [0, 0.68333, 0.19383, 0, 0.74333],
        "90": [0, 0.68333, 0.14528, 0, 0.61333],
        "91": [0.25, 0.75, 0.1875, 0, 0.30667],
        "93": [0.25, 0.75, 0.10528, 0, 0.30667],
        "94": [0, 0.69444, 0.06646, 0, 0.51111],
        "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
        "97": [0, 0.43056, 0.07671, 0, 0.51111],
        "98": [0, 0.69444, 0.06312, 0, 0.46],
        "99": [0, 0.43056, 0.05653, 0, 0.46],
        "100": [0, 0.69444, 0.10333, 0, 0.51111],
        "101": [0, 0.43056, 0.07514, 0, 0.46],
        "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
        "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
        "104": [0, 0.69444, 0.07671, 0, 0.51111],
        "105": [0, 0.65536, 0.1019, 0, 0.30667],
        "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
        "107": [0, 0.69444, 0.10764, 0, 0.46],
        "108": [0, 0.69444, 0.10333, 0, 0.25555],
        "109": [0, 0.43056, 0.07671, 0, 0.81777],
        "110": [0, 0.43056, 0.07671, 0, 0.56222],
        "111": [0, 0.43056, 0.06312, 0, 0.51111],
        "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
        "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
        "114": [0, 0.43056, 0.10764, 0, 0.42166],
        "115": [0, 0.43056, 0.08208, 0, 0.40889],
        "116": [0, 0.61508, 0.09486, 0, 0.33222],
        "117": [0, 0.43056, 0.07671, 0, 0.53666],
        "118": [0, 0.43056, 0.10764, 0, 0.46],
        "119": [0, 0.43056, 0.10764, 0, 0.66444],
        "120": [0, 0.43056, 0.12042, 0, 0.46389],
        "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
        "122": [0, 0.43056, 0.12292, 0, 0.40889],
        "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
        "160": [0, 0, 0, 0, 0.25],
        "168": [0, 0.66786, 0.10474, 0, 0.51111],
        "176": [0, 0.69444, 0, 0, 0.83129],
        "184": [0.17014, 0, 0, 0, 0.46],
        "198": [0, 0.68333, 0.12028, 0, 0.88277],
        "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
        "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
        "230": [0, 0.43056, 0.07514, 0, 0.71555],
        "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
        "338": [0, 0.68333, 0.12028, 0, 0.98499],
        "339": [0, 0.43056, 0.07514, 0, 0.71555],
        "710": [0, 0.69444, 0.06646, 0, 0.51111],
        "711": [0, 0.62847, 0.08295, 0, 0.51111],
        "713": [0, 0.56167, 0.10333, 0, 0.51111],
        "714": [0, 0.69444, 0.09694, 0, 0.51111],
        "715": [0, 0.69444, 0, 0, 0.51111],
        "728": [0, 0.69444, 0.10806, 0, 0.51111],
        "729": [0, 0.66786, 0.11752, 0, 0.30667],
        "730": [0, 0.69444, 0, 0, 0.83129],
        "732": [0, 0.66786, 0.11585, 0, 0.51111],
        "733": [0, 0.69444, 0.1225, 0, 0.51111],
        "915": [0, 0.68333, 0.13305, 0, 0.62722],
        "916": [0, 0.68333, 0, 0, 0.81777],
        "920": [0, 0.68333, 0.09403, 0, 0.76666],
        "923": [0, 0.68333, 0, 0, 0.69222],
        "926": [0, 0.68333, 0.15294, 0, 0.66444],
        "928": [0, 0.68333, 0.16389, 0, 0.74333],
        "931": [0, 0.68333, 0.12028, 0, 0.71555],
        "933": [0, 0.68333, 0.11111, 0, 0.76666],
        "934": [0, 0.68333, 0.05986, 0, 0.71555],
        "936": [0, 0.68333, 0.11111, 0, 0.76666],
        "937": [0, 0.68333, 0.10257, 0, 0.71555],
        "8211": [0, 0.43056, 0.09208, 0, 0.51111],
        "8212": [0, 0.43056, 0.09208, 0, 1.02222],
        "8216": [0, 0.69444, 0.12417, 0, 0.30667],
        "8217": [0, 0.69444, 0.12417, 0, 0.30667],
        "8220": [0, 0.69444, 0.1685, 0, 0.51444],
        "8221": [0, 0.69444, 0.06961, 0, 0.51444],
        "8463": [0, 0.68889, 0, 0, 0.54028]
      },
      "Main-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0, 0, 0.27778],
        "34": [0, 0.69444, 0, 0, 0.5],
        "35": [0.19444, 0.69444, 0, 0, 0.83334],
        "36": [0.05556, 0.75, 0, 0, 0.5],
        "37": [0.05556, 0.75, 0, 0, 0.83334],
        "38": [0, 0.69444, 0, 0, 0.77778],
        "39": [0, 0.69444, 0, 0, 0.27778],
        "40": [0.25, 0.75, 0, 0, 0.38889],
        "41": [0.25, 0.75, 0, 0, 0.38889],
        "42": [0, 0.75, 0, 0, 0.5],
        "43": [0.08333, 0.58333, 0, 0, 0.77778],
        "44": [0.19444, 0.10556, 0, 0, 0.27778],
        "45": [0, 0.43056, 0, 0, 0.33333],
        "46": [0, 0.10556, 0, 0, 0.27778],
        "47": [0.25, 0.75, 0, 0, 0.5],
        "48": [0, 0.64444, 0, 0, 0.5],
        "49": [0, 0.64444, 0, 0, 0.5],
        "50": [0, 0.64444, 0, 0, 0.5],
        "51": [0, 0.64444, 0, 0, 0.5],
        "52": [0, 0.64444, 0, 0, 0.5],
        "53": [0, 0.64444, 0, 0, 0.5],
        "54": [0, 0.64444, 0, 0, 0.5],
        "55": [0, 0.64444, 0, 0, 0.5],
        "56": [0, 0.64444, 0, 0, 0.5],
        "57": [0, 0.64444, 0, 0, 0.5],
        "58": [0, 0.43056, 0, 0, 0.27778],
        "59": [0.19444, 0.43056, 0, 0, 0.27778],
        "60": [0.0391, 0.5391, 0, 0, 0.77778],
        "61": [-0.13313, 0.36687, 0, 0, 0.77778],
        "62": [0.0391, 0.5391, 0, 0, 0.77778],
        "63": [0, 0.69444, 0, 0, 0.47222],
        "64": [0, 0.69444, 0, 0, 0.77778],
        "65": [0, 0.68333, 0, 0, 0.75],
        "66": [0, 0.68333, 0, 0, 0.70834],
        "67": [0, 0.68333, 0, 0, 0.72222],
        "68": [0, 0.68333, 0, 0, 0.76389],
        "69": [0, 0.68333, 0, 0, 0.68056],
        "70": [0, 0.68333, 0, 0, 0.65278],
        "71": [0, 0.68333, 0, 0, 0.78472],
        "72": [0, 0.68333, 0, 0, 0.75],
        "73": [0, 0.68333, 0, 0, 0.36111],
        "74": [0, 0.68333, 0, 0, 0.51389],
        "75": [0, 0.68333, 0, 0, 0.77778],
        "76": [0, 0.68333, 0, 0, 0.625],
        "77": [0, 0.68333, 0, 0, 0.91667],
        "78": [0, 0.68333, 0, 0, 0.75],
        "79": [0, 0.68333, 0, 0, 0.77778],
        "80": [0, 0.68333, 0, 0, 0.68056],
        "81": [0.19444, 0.68333, 0, 0, 0.77778],
        "82": [0, 0.68333, 0, 0, 0.73611],
        "83": [0, 0.68333, 0, 0, 0.55556],
        "84": [0, 0.68333, 0, 0, 0.72222],
        "85": [0, 0.68333, 0, 0, 0.75],
        "86": [0, 0.68333, 0.01389, 0, 0.75],
        "87": [0, 0.68333, 0.01389, 0, 1.02778],
        "88": [0, 0.68333, 0, 0, 0.75],
        "89": [0, 0.68333, 0.025, 0, 0.75],
        "90": [0, 0.68333, 0, 0, 0.61111],
        "91": [0.25, 0.75, 0, 0, 0.27778],
        "92": [0.25, 0.75, 0, 0, 0.5],
        "93": [0.25, 0.75, 0, 0, 0.27778],
        "94": [0, 0.69444, 0, 0, 0.5],
        "95": [0.31, 0.12056, 0.02778, 0, 0.5],
        "97": [0, 0.43056, 0, 0, 0.5],
        "98": [0, 0.69444, 0, 0, 0.55556],
        "99": [0, 0.43056, 0, 0, 0.44445],
        "100": [0, 0.69444, 0, 0, 0.55556],
        "101": [0, 0.43056, 0, 0, 0.44445],
        "102": [0, 0.69444, 0.07778, 0, 0.30556],
        "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
        "104": [0, 0.69444, 0, 0, 0.55556],
        "105": [0, 0.66786, 0, 0, 0.27778],
        "106": [0.19444, 0.66786, 0, 0, 0.30556],
        "107": [0, 0.69444, 0, 0, 0.52778],
        "108": [0, 0.69444, 0, 0, 0.27778],
        "109": [0, 0.43056, 0, 0, 0.83334],
        "110": [0, 0.43056, 0, 0, 0.55556],
        "111": [0, 0.43056, 0, 0, 0.5],
        "112": [0.19444, 0.43056, 0, 0, 0.55556],
        "113": [0.19444, 0.43056, 0, 0, 0.52778],
        "114": [0, 0.43056, 0, 0, 0.39167],
        "115": [0, 0.43056, 0, 0, 0.39445],
        "116": [0, 0.61508, 0, 0, 0.38889],
        "117": [0, 0.43056, 0, 0, 0.55556],
        "118": [0, 0.43056, 0.01389, 0, 0.52778],
        "119": [0, 0.43056, 0.01389, 0, 0.72222],
        "120": [0, 0.43056, 0, 0, 0.52778],
        "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
        "122": [0, 0.43056, 0, 0, 0.44445],
        "123": [0.25, 0.75, 0, 0, 0.5],
        "124": [0.25, 0.75, 0, 0, 0.27778],
        "125": [0.25, 0.75, 0, 0, 0.5],
        "126": [0.35, 0.31786, 0, 0, 0.5],
        "160": [0, 0, 0, 0, 0.25],
        "163": [0, 0.69444, 0, 0, 0.76909],
        "167": [0.19444, 0.69444, 0, 0, 0.44445],
        "168": [0, 0.66786, 0, 0, 0.5],
        "172": [0, 0.43056, 0, 0, 0.66667],
        "176": [0, 0.69444, 0, 0, 0.75],
        "177": [0.08333, 0.58333, 0, 0, 0.77778],
        "182": [0.19444, 0.69444, 0, 0, 0.61111],
        "184": [0.17014, 0, 0, 0, 0.44445],
        "198": [0, 0.68333, 0, 0, 0.90278],
        "215": [0.08333, 0.58333, 0, 0, 0.77778],
        "216": [0.04861, 0.73194, 0, 0, 0.77778],
        "223": [0, 0.69444, 0, 0, 0.5],
        "230": [0, 0.43056, 0, 0, 0.72222],
        "247": [0.08333, 0.58333, 0, 0, 0.77778],
        "248": [0.09722, 0.52778, 0, 0, 0.5],
        "305": [0, 0.43056, 0, 0, 0.27778],
        "338": [0, 0.68333, 0, 0, 1.01389],
        "339": [0, 0.43056, 0, 0, 0.77778],
        "567": [0.19444, 0.43056, 0, 0, 0.30556],
        "710": [0, 0.69444, 0, 0, 0.5],
        "711": [0, 0.62847, 0, 0, 0.5],
        "713": [0, 0.56778, 0, 0, 0.5],
        "714": [0, 0.69444, 0, 0, 0.5],
        "715": [0, 0.69444, 0, 0, 0.5],
        "728": [0, 0.69444, 0, 0, 0.5],
        "729": [0, 0.66786, 0, 0, 0.27778],
        "730": [0, 0.69444, 0, 0, 0.75],
        "732": [0, 0.66786, 0, 0, 0.5],
        "733": [0, 0.69444, 0, 0, 0.5],
        "915": [0, 0.68333, 0, 0, 0.625],
        "916": [0, 0.68333, 0, 0, 0.83334],
        "920": [0, 0.68333, 0, 0, 0.77778],
        "923": [0, 0.68333, 0, 0, 0.69445],
        "926": [0, 0.68333, 0, 0, 0.66667],
        "928": [0, 0.68333, 0, 0, 0.75],
        "931": [0, 0.68333, 0, 0, 0.72222],
        "933": [0, 0.68333, 0, 0, 0.77778],
        "934": [0, 0.68333, 0, 0, 0.72222],
        "936": [0, 0.68333, 0, 0, 0.77778],
        "937": [0, 0.68333, 0, 0, 0.72222],
        "8211": [0, 0.43056, 0.02778, 0, 0.5],
        "8212": [0, 0.43056, 0.02778, 0, 1.0],
        "8216": [0, 0.69444, 0, 0, 0.27778],
        "8217": [0, 0.69444, 0, 0, 0.27778],
        "8220": [0, 0.69444, 0, 0, 0.5],
        "8221": [0, 0.69444, 0, 0, 0.5],
        "8224": [0.19444, 0.69444, 0, 0, 0.44445],
        "8225": [0.19444, 0.69444, 0, 0, 0.44445],
        "8230": [0, 0.123, 0, 0, 1.172],
        "8242": [0, 0.55556, 0, 0, 0.275],
        "8407": [0, 0.71444, 0.15382, 0, 0.5],
        "8463": [0, 0.68889, 0, 0, 0.54028],
        "8465": [0, 0.69444, 0, 0, 0.72222],
        "8467": [0, 0.69444, 0, 0.11111, 0.41667],
        "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
        "8476": [0, 0.69444, 0, 0, 0.72222],
        "8501": [0, 0.69444, 0, 0, 0.61111],
        "8592": [-0.13313, 0.36687, 0, 0, 1.0],
        "8593": [0.19444, 0.69444, 0, 0, 0.5],
        "8594": [-0.13313, 0.36687, 0, 0, 1.0],
        "8595": [0.19444, 0.69444, 0, 0, 0.5],
        "8596": [-0.13313, 0.36687, 0, 0, 1.0],
        "8597": [0.25, 0.75, 0, 0, 0.5],
        "8598": [0.19444, 0.69444, 0, 0, 1.0],
        "8599": [0.19444, 0.69444, 0, 0, 1.0],
        "8600": [0.19444, 0.69444, 0, 0, 1.0],
        "8601": [0.19444, 0.69444, 0, 0, 1.0],
        "8614": [0.011, 0.511, 0, 0, 1.0],
        "8617": [0.011, 0.511, 0, 0, 1.126],
        "8618": [0.011, 0.511, 0, 0, 1.126],
        "8636": [-0.13313, 0.36687, 0, 0, 1.0],
        "8637": [-0.13313, 0.36687, 0, 0, 1.0],
        "8640": [-0.13313, 0.36687, 0, 0, 1.0],
        "8641": [-0.13313, 0.36687, 0, 0, 1.0],
        "8652": [0.011, 0.671, 0, 0, 1.0],
        "8656": [-0.13313, 0.36687, 0, 0, 1.0],
        "8657": [0.19444, 0.69444, 0, 0, 0.61111],
        "8658": [-0.13313, 0.36687, 0, 0, 1.0],
        "8659": [0.19444, 0.69444, 0, 0, 0.61111],
        "8660": [-0.13313, 0.36687, 0, 0, 1.0],
        "8661": [0.25, 0.75, 0, 0, 0.61111],
        "8704": [0, 0.69444, 0, 0, 0.55556],
        "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
        "8707": [0, 0.69444, 0, 0, 0.55556],
        "8709": [0.05556, 0.75, 0, 0, 0.5],
        "8711": [0, 0.68333, 0, 0, 0.83334],
        "8712": [0.0391, 0.5391, 0, 0, 0.66667],
        "8715": [0.0391, 0.5391, 0, 0, 0.66667],
        "8722": [0.08333, 0.58333, 0, 0, 0.77778],
        "8723": [0.08333, 0.58333, 0, 0, 0.77778],
        "8725": [0.25, 0.75, 0, 0, 0.5],
        "8726": [0.25, 0.75, 0, 0, 0.5],
        "8727": [-0.03472, 0.46528, 0, 0, 0.5],
        "8728": [-0.05555, 0.44445, 0, 0, 0.5],
        "8729": [-0.05555, 0.44445, 0, 0, 0.5],
        "8730": [0.2, 0.8, 0, 0, 0.83334],
        "8733": [0, 0.43056, 0, 0, 0.77778],
        "8734": [0, 0.43056, 0, 0, 1.0],
        "8736": [0, 0.69224, 0, 0, 0.72222],
        "8739": [0.25, 0.75, 0, 0, 0.27778],
        "8741": [0.25, 0.75, 0, 0, 0.5],
        "8743": [0, 0.55556, 0, 0, 0.66667],
        "8744": [0, 0.55556, 0, 0, 0.66667],
        "8745": [0, 0.55556, 0, 0, 0.66667],
        "8746": [0, 0.55556, 0, 0, 0.66667],
        "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
        "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
        "8768": [0.19444, 0.69444, 0, 0, 0.27778],
        "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
        "8773": [-0.022, 0.589, 0, 0, 0.778],
        "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
        "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
        "8784": [-0.133, 0.673, 0, 0, 0.778],
        "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
        "8804": [0.13597, 0.63597, 0, 0, 0.77778],
        "8805": [0.13597, 0.63597, 0, 0, 0.77778],
        "8810": [0.0391, 0.5391, 0, 0, 1.0],
        "8811": [0.0391, 0.5391, 0, 0, 1.0],
        "8826": [0.0391, 0.5391, 0, 0, 0.77778],
        "8827": [0.0391, 0.5391, 0, 0, 0.77778],
        "8834": [0.0391, 0.5391, 0, 0, 0.77778],
        "8835": [0.0391, 0.5391, 0, 0, 0.77778],
        "8838": [0.13597, 0.63597, 0, 0, 0.77778],
        "8839": [0.13597, 0.63597, 0, 0, 0.77778],
        "8846": [0, 0.55556, 0, 0, 0.66667],
        "8849": [0.13597, 0.63597, 0, 0, 0.77778],
        "8850": [0.13597, 0.63597, 0, 0, 0.77778],
        "8851": [0, 0.55556, 0, 0, 0.66667],
        "8852": [0, 0.55556, 0, 0, 0.66667],
        "8853": [0.08333, 0.58333, 0, 0, 0.77778],
        "8854": [0.08333, 0.58333, 0, 0, 0.77778],
        "8855": [0.08333, 0.58333, 0, 0, 0.77778],
        "8856": [0.08333, 0.58333, 0, 0, 0.77778],
        "8857": [0.08333, 0.58333, 0, 0, 0.77778],
        "8866": [0, 0.69444, 0, 0, 0.61111],
        "8867": [0, 0.69444, 0, 0, 0.61111],
        "8868": [0, 0.69444, 0, 0, 0.77778],
        "8869": [0, 0.69444, 0, 0, 0.77778],
        "8872": [0.249, 0.75, 0, 0, 0.867],
        "8900": [-0.05555, 0.44445, 0, 0, 0.5],
        "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
        "8902": [-0.03472, 0.46528, 0, 0, 0.5],
        "8904": [0.005, 0.505, 0, 0, 0.9],
        "8942": [0.03, 0.903, 0, 0, 0.278],
        "8943": [-0.19, 0.313, 0, 0, 1.172],
        "8945": [-0.1, 0.823, 0, 0, 1.282],
        "8968": [0.25, 0.75, 0, 0, 0.44445],
        "8969": [0.25, 0.75, 0, 0, 0.44445],
        "8970": [0.25, 0.75, 0, 0, 0.44445],
        "8971": [0.25, 0.75, 0, 0, 0.44445],
        "8994": [-0.14236, 0.35764, 0, 0, 1.0],
        "8995": [-0.14236, 0.35764, 0, 0, 1.0],
        "9136": [0.244, 0.744, 0, 0, 0.412],
        "9137": [0.244, 0.745, 0, 0, 0.412],
        "9651": [0.19444, 0.69444, 0, 0, 0.88889],
        "9657": [-0.03472, 0.46528, 0, 0, 0.5],
        "9661": [0.19444, 0.69444, 0, 0, 0.88889],
        "9667": [-0.03472, 0.46528, 0, 0, 0.5],
        "9711": [0.19444, 0.69444, 0, 0, 1.0],
        "9824": [0.12963, 0.69444, 0, 0, 0.77778],
        "9825": [0.12963, 0.69444, 0, 0, 0.77778],
        "9826": [0.12963, 0.69444, 0, 0, 0.77778],
        "9827": [0.12963, 0.69444, 0, 0, 0.77778],
        "9837": [0, 0.75, 0, 0, 0.38889],
        "9838": [0.19444, 0.69444, 0, 0, 0.38889],
        "9839": [0.19444, 0.69444, 0, 0, 0.38889],
        "10216": [0.25, 0.75, 0, 0, 0.38889],
        "10217": [0.25, 0.75, 0, 0, 0.38889],
        "10222": [0.244, 0.744, 0, 0, 0.412],
        "10223": [0.244, 0.745, 0, 0, 0.412],
        "10229": [0.011, 0.511, 0, 0, 1.609],
        "10230": [0.011, 0.511, 0, 0, 1.638],
        "10231": [0.011, 0.511, 0, 0, 1.859],
        "10232": [0.024, 0.525, 0, 0, 1.609],
        "10233": [0.024, 0.525, 0, 0, 1.638],
        "10234": [0.024, 0.525, 0, 0, 1.858],
        "10236": [0.011, 0.511, 0, 0, 1.638],
        "10815": [0, 0.68333, 0, 0, 0.75],
        "10927": [0.13597, 0.63597, 0, 0, 0.77778],
        "10928": [0.13597, 0.63597, 0, 0, 0.77778],
        "57376": [0.19444, 0.69444, 0, 0, 0]
      },
      "Math-BoldItalic": {
        "32": [0, 0, 0, 0, 0.25],
        "48": [0, 0.44444, 0, 0, 0.575],
        "49": [0, 0.44444, 0, 0, 0.575],
        "50": [0, 0.44444, 0, 0, 0.575],
        "51": [0.19444, 0.44444, 0, 0, 0.575],
        "52": [0.19444, 0.44444, 0, 0, 0.575],
        "53": [0.19444, 0.44444, 0, 0, 0.575],
        "54": [0, 0.64444, 0, 0, 0.575],
        "55": [0.19444, 0.44444, 0, 0, 0.575],
        "56": [0, 0.64444, 0, 0, 0.575],
        "57": [0.19444, 0.44444, 0, 0, 0.575],
        "65": [0, 0.68611, 0, 0, 0.86944],
        "66": [0, 0.68611, 0.04835, 0, 0.8664],
        "67": [0, 0.68611, 0.06979, 0, 0.81694],
        "68": [0, 0.68611, 0.03194, 0, 0.93812],
        "69": [0, 0.68611, 0.05451, 0, 0.81007],
        "70": [0, 0.68611, 0.15972, 0, 0.68889],
        "71": [0, 0.68611, 0, 0, 0.88673],
        "72": [0, 0.68611, 0.08229, 0, 0.98229],
        "73": [0, 0.68611, 0.07778, 0, 0.51111],
        "74": [0, 0.68611, 0.10069, 0, 0.63125],
        "75": [0, 0.68611, 0.06979, 0, 0.97118],
        "76": [0, 0.68611, 0, 0, 0.75555],
        "77": [0, 0.68611, 0.11424, 0, 1.14201],
        "78": [0, 0.68611, 0.11424, 0, 0.95034],
        "79": [0, 0.68611, 0.03194, 0, 0.83666],
        "80": [0, 0.68611, 0.15972, 0, 0.72309],
        "81": [0.19444, 0.68611, 0, 0, 0.86861],
        "82": [0, 0.68611, 0.00421, 0, 0.87235],
        "83": [0, 0.68611, 0.05382, 0, 0.69271],
        "84": [0, 0.68611, 0.15972, 0, 0.63663],
        "85": [0, 0.68611, 0.11424, 0, 0.80027],
        "86": [0, 0.68611, 0.25555, 0, 0.67778],
        "87": [0, 0.68611, 0.15972, 0, 1.09305],
        "88": [0, 0.68611, 0.07778, 0, 0.94722],
        "89": [0, 0.68611, 0.25555, 0, 0.67458],
        "90": [0, 0.68611, 0.06979, 0, 0.77257],
        "97": [0, 0.44444, 0, 0, 0.63287],
        "98": [0, 0.69444, 0, 0, 0.52083],
        "99": [0, 0.44444, 0, 0, 0.51342],
        "100": [0, 0.69444, 0, 0, 0.60972],
        "101": [0, 0.44444, 0, 0, 0.55361],
        "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
        "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
        "104": [0, 0.69444, 0, 0, 0.66759],
        "105": [0, 0.69326, 0, 0, 0.4048],
        "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
        "107": [0, 0.69444, 0.01852, 0, 0.6037],
        "108": [0, 0.69444, 0.0088, 0, 0.34815],
        "109": [0, 0.44444, 0, 0, 1.0324],
        "110": [0, 0.44444, 0, 0, 0.71296],
        "111": [0, 0.44444, 0, 0, 0.58472],
        "112": [0.19444, 0.44444, 0, 0, 0.60092],
        "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
        "114": [0, 0.44444, 0.03194, 0, 0.5287],
        "115": [0, 0.44444, 0, 0, 0.53125],
        "116": [0, 0.63492, 0, 0, 0.41528],
        "117": [0, 0.44444, 0, 0, 0.68102],
        "118": [0, 0.44444, 0.03704, 0, 0.56666],
        "119": [0, 0.44444, 0.02778, 0, 0.83148],
        "120": [0, 0.44444, 0, 0, 0.65903],
        "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
        "122": [0, 0.44444, 0.04213, 0, 0.55509],
        "160": [0, 0, 0, 0, 0.25],
        "915": [0, 0.68611, 0.15972, 0, 0.65694],
        "916": [0, 0.68611, 0, 0, 0.95833],
        "920": [0, 0.68611, 0.03194, 0, 0.86722],
        "923": [0, 0.68611, 0, 0, 0.80555],
        "926": [0, 0.68611, 0.07458, 0, 0.84125],
        "928": [0, 0.68611, 0.08229, 0, 0.98229],
        "931": [0, 0.68611, 0.05451, 0, 0.88507],
        "933": [0, 0.68611, 0.15972, 0, 0.67083],
        "934": [0, 0.68611, 0, 0, 0.76666],
        "936": [0, 0.68611, 0.11653, 0, 0.71402],
        "937": [0, 0.68611, 0.04835, 0, 0.8789],
        "945": [0, 0.44444, 0, 0, 0.76064],
        "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
        "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
        "948": [0, 0.69444, 0.03819, 0, 0.52222],
        "949": [0, 0.44444, 0, 0, 0.52882],
        "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
        "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
        "952": [0, 0.69444, 0.03194, 0, 0.5618],
        "953": [0, 0.44444, 0, 0, 0.41204],
        "954": [0, 0.44444, 0, 0, 0.66759],
        "955": [0, 0.69444, 0, 0, 0.67083],
        "956": [0.19444, 0.44444, 0, 0, 0.70787],
        "957": [0, 0.44444, 0.06898, 0, 0.57685],
        "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
        "959": [0, 0.44444, 0, 0, 0.58472],
        "960": [0, 0.44444, 0.03704, 0, 0.68241],
        "961": [0.19444, 0.44444, 0, 0, 0.6118],
        "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
        "963": [0, 0.44444, 0.03704, 0, 0.68588],
        "964": [0, 0.44444, 0.13472, 0, 0.52083],
        "965": [0, 0.44444, 0.03704, 0, 0.63055],
        "966": [0.19444, 0.44444, 0, 0, 0.74722],
        "967": [0.19444, 0.44444, 0, 0, 0.71805],
        "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
        "969": [0, 0.44444, 0.03704, 0, 0.71782],
        "977": [0, 0.69444, 0, 0, 0.69155],
        "981": [0.19444, 0.69444, 0, 0, 0.7125],
        "982": [0, 0.44444, 0.03194, 0, 0.975],
        "1009": [0.19444, 0.44444, 0, 0, 0.6118],
        "1013": [0, 0.44444, 0, 0, 0.48333],
        "57649": [0, 0.44444, 0, 0, 0.39352],
        "57911": [0.19444, 0.44444, 0, 0, 0.43889]
      },
      "Math-Italic": {
        "32": [0, 0, 0, 0, 0.25],
        "48": [0, 0.43056, 0, 0, 0.5],
        "49": [0, 0.43056, 0, 0, 0.5],
        "50": [0, 0.43056, 0, 0, 0.5],
        "51": [0.19444, 0.43056, 0, 0, 0.5],
        "52": [0.19444, 0.43056, 0, 0, 0.5],
        "53": [0.19444, 0.43056, 0, 0, 0.5],
        "54": [0, 0.64444, 0, 0, 0.5],
        "55": [0.19444, 0.43056, 0, 0, 0.5],
        "56": [0, 0.64444, 0, 0, 0.5],
        "57": [0.19444, 0.43056, 0, 0, 0.5],
        "65": [0, 0.68333, 0, 0.13889, 0.75],
        "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
        "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
        "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
        "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
        "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
        "71": [0, 0.68333, 0, 0.08334, 0.78625],
        "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
        "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
        "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
        "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
        "76": [0, 0.68333, 0, 0.02778, 0.68056],
        "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
        "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
        "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
        "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
        "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
        "82": [0, 0.68333, 0.00773, 0.08334, 0.75929],
        "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
        "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
        "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
        "86": [0, 0.68333, 0.22222, 0, 0.58333],
        "87": [0, 0.68333, 0.13889, 0, 0.94445],
        "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
        "89": [0, 0.68333, 0.22222, 0, 0.58056],
        "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
        "97": [0, 0.43056, 0, 0, 0.52859],
        "98": [0, 0.69444, 0, 0, 0.42917],
        "99": [0, 0.43056, 0, 0.05556, 0.43276],
        "100": [0, 0.69444, 0, 0.16667, 0.52049],
        "101": [0, 0.43056, 0, 0.05556, 0.46563],
        "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
        "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
        "104": [0, 0.69444, 0, 0, 0.57616],
        "105": [0, 0.65952, 0, 0, 0.34451],
        "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
        "107": [0, 0.69444, 0.03148, 0, 0.5206],
        "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
        "109": [0, 0.43056, 0, 0, 0.87801],
        "110": [0, 0.43056, 0, 0, 0.60023],
        "111": [0, 0.43056, 0, 0.05556, 0.48472],
        "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
        "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
        "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
        "115": [0, 0.43056, 0, 0.05556, 0.46875],
        "116": [0, 0.61508, 0, 0.08334, 0.36111],
        "117": [0, 0.43056, 0, 0.02778, 0.57246],
        "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
        "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
        "120": [0, 0.43056, 0, 0.02778, 0.57153],
        "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
        "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
        "160": [0, 0, 0, 0, 0.25],
        "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
        "916": [0, 0.68333, 0, 0.16667, 0.83334],
        "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
        "923": [0, 0.68333, 0, 0.16667, 0.69445],
        "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
        "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
        "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
        "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
        "934": [0, 0.68333, 0, 0.08334, 0.66667],
        "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
        "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
        "945": [0, 0.43056, 0.0037, 0.02778, 0.6397],
        "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
        "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
        "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
        "949": [0, 0.43056, 0, 0.08334, 0.46632],
        "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
        "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
        "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
        "953": [0, 0.43056, 0, 0.05556, 0.35394],
        "954": [0, 0.43056, 0, 0, 0.57616],
        "955": [0, 0.69444, 0, 0, 0.58334],
        "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
        "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
        "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
        "959": [0, 0.43056, 0, 0.05556, 0.48472],
        "960": [0, 0.43056, 0.03588, 0, 0.57003],
        "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
        "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
        "963": [0, 0.43056, 0.03588, 0, 0.57141],
        "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
        "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
        "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
        "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
        "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
        "969": [0, 0.43056, 0.03588, 0, 0.62245],
        "977": [0, 0.69444, 0, 0.08334, 0.59144],
        "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
        "982": [0, 0.43056, 0.02778, 0, 0.82813],
        "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
        "1013": [0, 0.43056, 0, 0.05556, 0.4059],
        "57649": [0, 0.43056, 0, 0.02778, 0.32246],
        "57911": [0.19444, 0.43056, 0, 0.08334, 0.38403]
      },
      "SansSerif-Bold": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0, 0, 0.36667],
        "34": [0, 0.69444, 0, 0, 0.55834],
        "35": [0.19444, 0.69444, 0, 0, 0.91667],
        "36": [0.05556, 0.75, 0, 0, 0.55],
        "37": [0.05556, 0.75, 0, 0, 1.02912],
        "38": [0, 0.69444, 0, 0, 0.83056],
        "39": [0, 0.69444, 0, 0, 0.30556],
        "40": [0.25, 0.75, 0, 0, 0.42778],
        "41": [0.25, 0.75, 0, 0, 0.42778],
        "42": [0, 0.75, 0, 0, 0.55],
        "43": [0.11667, 0.61667, 0, 0, 0.85556],
        "44": [0.10556, 0.13056, 0, 0, 0.30556],
        "45": [0, 0.45833, 0, 0, 0.36667],
        "46": [0, 0.13056, 0, 0, 0.30556],
        "47": [0.25, 0.75, 0, 0, 0.55],
        "48": [0, 0.69444, 0, 0, 0.55],
        "49": [0, 0.69444, 0, 0, 0.55],
        "50": [0, 0.69444, 0, 0, 0.55],
        "51": [0, 0.69444, 0, 0, 0.55],
        "52": [0, 0.69444, 0, 0, 0.55],
        "53": [0, 0.69444, 0, 0, 0.55],
        "54": [0, 0.69444, 0, 0, 0.55],
        "55": [0, 0.69444, 0, 0, 0.55],
        "56": [0, 0.69444, 0, 0, 0.55],
        "57": [0, 0.69444, 0, 0, 0.55],
        "58": [0, 0.45833, 0, 0, 0.30556],
        "59": [0.10556, 0.45833, 0, 0, 0.30556],
        "61": [-0.09375, 0.40625, 0, 0, 0.85556],
        "63": [0, 0.69444, 0, 0, 0.51945],
        "64": [0, 0.69444, 0, 0, 0.73334],
        "65": [0, 0.69444, 0, 0, 0.73334],
        "66": [0, 0.69444, 0, 0, 0.73334],
        "67": [0, 0.69444, 0, 0, 0.70278],
        "68": [0, 0.69444, 0, 0, 0.79445],
        "69": [0, 0.69444, 0, 0, 0.64167],
        "70": [0, 0.69444, 0, 0, 0.61111],
        "71": [0, 0.69444, 0, 0, 0.73334],
        "72": [0, 0.69444, 0, 0, 0.79445],
        "73": [0, 0.69444, 0, 0, 0.33056],
        "74": [0, 0.69444, 0, 0, 0.51945],
        "75": [0, 0.69444, 0, 0, 0.76389],
        "76": [0, 0.69444, 0, 0, 0.58056],
        "77": [0, 0.69444, 0, 0, 0.97778],
        "78": [0, 0.69444, 0, 0, 0.79445],
        "79": [0, 0.69444, 0, 0, 0.79445],
        "80": [0, 0.69444, 0, 0, 0.70278],
        "81": [0.10556, 0.69444, 0, 0, 0.79445],
        "82": [0, 0.69444, 0, 0, 0.70278],
        "83": [0, 0.69444, 0, 0, 0.61111],
        "84": [0, 0.69444, 0, 0, 0.73334],
        "85": [0, 0.69444, 0, 0, 0.76389],
        "86": [0, 0.69444, 0.01528, 0, 0.73334],
        "87": [0, 0.69444, 0.01528, 0, 1.03889],
        "88": [0, 0.69444, 0, 0, 0.73334],
        "89": [0, 0.69444, 0.0275, 0, 0.73334],
        "90": [0, 0.69444, 0, 0, 0.67223],
        "91": [0.25, 0.75, 0, 0, 0.34306],
        "93": [0.25, 0.75, 0, 0, 0.34306],
        "94": [0, 0.69444, 0, 0, 0.55],
        "95": [0.35, 0.10833, 0.03056, 0, 0.55],
        "97": [0, 0.45833, 0, 0, 0.525],
        "98": [0, 0.69444, 0, 0, 0.56111],
        "99": [0, 0.45833, 0, 0, 0.48889],
        "100": [0, 0.69444, 0, 0, 0.56111],
        "101": [0, 0.45833, 0, 0, 0.51111],
        "102": [0, 0.69444, 0.07639, 0, 0.33611],
        "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
        "104": [0, 0.69444, 0, 0, 0.56111],
        "105": [0, 0.69444, 0, 0, 0.25556],
        "106": [0.19444, 0.69444, 0, 0, 0.28611],
        "107": [0, 0.69444, 0, 0, 0.53056],
        "108": [0, 0.69444, 0, 0, 0.25556],
        "109": [0, 0.45833, 0, 0, 0.86667],
        "110": [0, 0.45833, 0, 0, 0.56111],
        "111": [0, 0.45833, 0, 0, 0.55],
        "112": [0.19444, 0.45833, 0, 0, 0.56111],
        "113": [0.19444, 0.45833, 0, 0, 0.56111],
        "114": [0, 0.45833, 0.01528, 0, 0.37222],
        "115": [0, 0.45833, 0, 0, 0.42167],
        "116": [0, 0.58929, 0, 0, 0.40417],
        "117": [0, 0.45833, 0, 0, 0.56111],
        "118": [0, 0.45833, 0.01528, 0, 0.5],
        "119": [0, 0.45833, 0.01528, 0, 0.74445],
        "120": [0, 0.45833, 0, 0, 0.5],
        "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
        "122": [0, 0.45833, 0, 0, 0.47639],
        "126": [0.35, 0.34444, 0, 0, 0.55],
        "160": [0, 0, 0, 0, 0.25],
        "168": [0, 0.69444, 0, 0, 0.55],
        "176": [0, 0.69444, 0, 0, 0.73334],
        "180": [0, 0.69444, 0, 0, 0.55],
        "184": [0.17014, 0, 0, 0, 0.48889],
        "305": [0, 0.45833, 0, 0, 0.25556],
        "567": [0.19444, 0.45833, 0, 0, 0.28611],
        "710": [0, 0.69444, 0, 0, 0.55],
        "711": [0, 0.63542, 0, 0, 0.55],
        "713": [0, 0.63778, 0, 0, 0.55],
        "728": [0, 0.69444, 0, 0, 0.55],
        "729": [0, 0.69444, 0, 0, 0.30556],
        "730": [0, 0.69444, 0, 0, 0.73334],
        "732": [0, 0.69444, 0, 0, 0.55],
        "733": [0, 0.69444, 0, 0, 0.55],
        "915": [0, 0.69444, 0, 0, 0.58056],
        "916": [0, 0.69444, 0, 0, 0.91667],
        "920": [0, 0.69444, 0, 0, 0.85556],
        "923": [0, 0.69444, 0, 0, 0.67223],
        "926": [0, 0.69444, 0, 0, 0.73334],
        "928": [0, 0.69444, 0, 0, 0.79445],
        "931": [0, 0.69444, 0, 0, 0.79445],
        "933": [0, 0.69444, 0, 0, 0.85556],
        "934": [0, 0.69444, 0, 0, 0.79445],
        "936": [0, 0.69444, 0, 0, 0.85556],
        "937": [0, 0.69444, 0, 0, 0.79445],
        "8211": [0, 0.45833, 0.03056, 0, 0.55],
        "8212": [0, 0.45833, 0.03056, 0, 1.10001],
        "8216": [0, 0.69444, 0, 0, 0.30556],
        "8217": [0, 0.69444, 0, 0, 0.30556],
        "8220": [0, 0.69444, 0, 0, 0.55834],
        "8221": [0, 0.69444, 0, 0, 0.55834]
      },
      "SansSerif-Italic": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0.05733, 0, 0.31945],
        "34": [0, 0.69444, 0.00316, 0, 0.5],
        "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
        "36": [0.05556, 0.75, 0.11156, 0, 0.5],
        "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
        "38": [0, 0.69444, 0.03058, 0, 0.75834],
        "39": [0, 0.69444, 0.07816, 0, 0.27778],
        "40": [0.25, 0.75, 0.13164, 0, 0.38889],
        "41": [0.25, 0.75, 0.02536, 0, 0.38889],
        "42": [0, 0.75, 0.11775, 0, 0.5],
        "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
        "44": [0.125, 0.08333, 0, 0, 0.27778],
        "45": [0, 0.44444, 0.01946, 0, 0.33333],
        "46": [0, 0.08333, 0, 0, 0.27778],
        "47": [0.25, 0.75, 0.13164, 0, 0.5],
        "48": [0, 0.65556, 0.11156, 0, 0.5],
        "49": [0, 0.65556, 0.11156, 0, 0.5],
        "50": [0, 0.65556, 0.11156, 0, 0.5],
        "51": [0, 0.65556, 0.11156, 0, 0.5],
        "52": [0, 0.65556, 0.11156, 0, 0.5],
        "53": [0, 0.65556, 0.11156, 0, 0.5],
        "54": [0, 0.65556, 0.11156, 0, 0.5],
        "55": [0, 0.65556, 0.11156, 0, 0.5],
        "56": [0, 0.65556, 0.11156, 0, 0.5],
        "57": [0, 0.65556, 0.11156, 0, 0.5],
        "58": [0, 0.44444, 0.02502, 0, 0.27778],
        "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
        "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
        "63": [0, 0.69444, 0.11809, 0, 0.47222],
        "64": [0, 0.69444, 0.07555, 0, 0.66667],
        "65": [0, 0.69444, 0, 0, 0.66667],
        "66": [0, 0.69444, 0.08293, 0, 0.66667],
        "67": [0, 0.69444, 0.11983, 0, 0.63889],
        "68": [0, 0.69444, 0.07555, 0, 0.72223],
        "69": [0, 0.69444, 0.11983, 0, 0.59722],
        "70": [0, 0.69444, 0.13372, 0, 0.56945],
        "71": [0, 0.69444, 0.11983, 0, 0.66667],
        "72": [0, 0.69444, 0.08094, 0, 0.70834],
        "73": [0, 0.69444, 0.13372, 0, 0.27778],
        "74": [0, 0.69444, 0.08094, 0, 0.47222],
        "75": [0, 0.69444, 0.11983, 0, 0.69445],
        "76": [0, 0.69444, 0, 0, 0.54167],
        "77": [0, 0.69444, 0.08094, 0, 0.875],
        "78": [0, 0.69444, 0.08094, 0, 0.70834],
        "79": [0, 0.69444, 0.07555, 0, 0.73611],
        "80": [0, 0.69444, 0.08293, 0, 0.63889],
        "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
        "82": [0, 0.69444, 0.08293, 0, 0.64584],
        "83": [0, 0.69444, 0.09205, 0, 0.55556],
        "84": [0, 0.69444, 0.13372, 0, 0.68056],
        "85": [0, 0.69444, 0.08094, 0, 0.6875],
        "86": [0, 0.69444, 0.1615, 0, 0.66667],
        "87": [0, 0.69444, 0.1615, 0, 0.94445],
        "88": [0, 0.69444, 0.13372, 0, 0.66667],
        "89": [0, 0.69444, 0.17261, 0, 0.66667],
        "90": [0, 0.69444, 0.11983, 0, 0.61111],
        "91": [0.25, 0.75, 0.15942, 0, 0.28889],
        "93": [0.25, 0.75, 0.08719, 0, 0.28889],
        "94": [0, 0.69444, 0.0799, 0, 0.5],
        "95": [0.35, 0.09444, 0.08616, 0, 0.5],
        "97": [0, 0.44444, 0.00981, 0, 0.48056],
        "98": [0, 0.69444, 0.03057, 0, 0.51667],
        "99": [0, 0.44444, 0.08336, 0, 0.44445],
        "100": [0, 0.69444, 0.09483, 0, 0.51667],
        "101": [0, 0.44444, 0.06778, 0, 0.44445],
        "102": [0, 0.69444, 0.21705, 0, 0.30556],
        "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
        "104": [0, 0.69444, 0.01778, 0, 0.51667],
        "105": [0, 0.67937, 0.09718, 0, 0.23889],
        "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
        "107": [0, 0.69444, 0.08336, 0, 0.48889],
        "108": [0, 0.69444, 0.09483, 0, 0.23889],
        "109": [0, 0.44444, 0.01778, 0, 0.79445],
        "110": [0, 0.44444, 0.01778, 0, 0.51667],
        "111": [0, 0.44444, 0.06613, 0, 0.5],
        "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
        "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
        "114": [0, 0.44444, 0.10836, 0, 0.34167],
        "115": [0, 0.44444, 0.0778, 0, 0.38333],
        "116": [0, 0.57143, 0.07225, 0, 0.36111],
        "117": [0, 0.44444, 0.04169, 0, 0.51667],
        "118": [0, 0.44444, 0.10836, 0, 0.46111],
        "119": [0, 0.44444, 0.10836, 0, 0.68334],
        "120": [0, 0.44444, 0.09169, 0, 0.46111],
        "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
        "122": [0, 0.44444, 0.08752, 0, 0.43472],
        "126": [0.35, 0.32659, 0.08826, 0, 0.5],
        "160": [0, 0, 0, 0, 0.25],
        "168": [0, 0.67937, 0.06385, 0, 0.5],
        "176": [0, 0.69444, 0, 0, 0.73752],
        "184": [0.17014, 0, 0, 0, 0.44445],
        "305": [0, 0.44444, 0.04169, 0, 0.23889],
        "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
        "710": [0, 0.69444, 0.0799, 0, 0.5],
        "711": [0, 0.63194, 0.08432, 0, 0.5],
        "713": [0, 0.60889, 0.08776, 0, 0.5],
        "714": [0, 0.69444, 0.09205, 0, 0.5],
        "715": [0, 0.69444, 0, 0, 0.5],
        "728": [0, 0.69444, 0.09483, 0, 0.5],
        "729": [0, 0.67937, 0.07774, 0, 0.27778],
        "730": [0, 0.69444, 0, 0, 0.73752],
        "732": [0, 0.67659, 0.08826, 0, 0.5],
        "733": [0, 0.69444, 0.09205, 0, 0.5],
        "915": [0, 0.69444, 0.13372, 0, 0.54167],
        "916": [0, 0.69444, 0, 0, 0.83334],
        "920": [0, 0.69444, 0.07555, 0, 0.77778],
        "923": [0, 0.69444, 0, 0, 0.61111],
        "926": [0, 0.69444, 0.12816, 0, 0.66667],
        "928": [0, 0.69444, 0.08094, 0, 0.70834],
        "931": [0, 0.69444, 0.11983, 0, 0.72222],
        "933": [0, 0.69444, 0.09031, 0, 0.77778],
        "934": [0, 0.69444, 0.04603, 0, 0.72222],
        "936": [0, 0.69444, 0.09031, 0, 0.77778],
        "937": [0, 0.69444, 0.08293, 0, 0.72222],
        "8211": [0, 0.44444, 0.08616, 0, 0.5],
        "8212": [0, 0.44444, 0.08616, 0, 1.0],
        "8216": [0, 0.69444, 0.07816, 0, 0.27778],
        "8217": [0, 0.69444, 0.07816, 0, 0.27778],
        "8220": [0, 0.69444, 0.14205, 0, 0.5],
        "8221": [0, 0.69444, 0.00316, 0, 0.5]
      },
      "SansSerif-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "33": [0, 0.69444, 0, 0, 0.31945],
        "34": [0, 0.69444, 0, 0, 0.5],
        "35": [0.19444, 0.69444, 0, 0, 0.83334],
        "36": [0.05556, 0.75, 0, 0, 0.5],
        "37": [0.05556, 0.75, 0, 0, 0.83334],
        "38": [0, 0.69444, 0, 0, 0.75834],
        "39": [0, 0.69444, 0, 0, 0.27778],
        "40": [0.25, 0.75, 0, 0, 0.38889],
        "41": [0.25, 0.75, 0, 0, 0.38889],
        "42": [0, 0.75, 0, 0, 0.5],
        "43": [0.08333, 0.58333, 0, 0, 0.77778],
        "44": [0.125, 0.08333, 0, 0, 0.27778],
        "45": [0, 0.44444, 0, 0, 0.33333],
        "46": [0, 0.08333, 0, 0, 0.27778],
        "47": [0.25, 0.75, 0, 0, 0.5],
        "48": [0, 0.65556, 0, 0, 0.5],
        "49": [0, 0.65556, 0, 0, 0.5],
        "50": [0, 0.65556, 0, 0, 0.5],
        "51": [0, 0.65556, 0, 0, 0.5],
        "52": [0, 0.65556, 0, 0, 0.5],
        "53": [0, 0.65556, 0, 0, 0.5],
        "54": [0, 0.65556, 0, 0, 0.5],
        "55": [0, 0.65556, 0, 0, 0.5],
        "56": [0, 0.65556, 0, 0, 0.5],
        "57": [0, 0.65556, 0, 0, 0.5],
        "58": [0, 0.44444, 0, 0, 0.27778],
        "59": [0.125, 0.44444, 0, 0, 0.27778],
        "61": [-0.13, 0.37, 0, 0, 0.77778],
        "63": [0, 0.69444, 0, 0, 0.47222],
        "64": [0, 0.69444, 0, 0, 0.66667],
        "65": [0, 0.69444, 0, 0, 0.66667],
        "66": [0, 0.69444, 0, 0, 0.66667],
        "67": [0, 0.69444, 0, 0, 0.63889],
        "68": [0, 0.69444, 0, 0, 0.72223],
        "69": [0, 0.69444, 0, 0, 0.59722],
        "70": [0, 0.69444, 0, 0, 0.56945],
        "71": [0, 0.69444, 0, 0, 0.66667],
        "72": [0, 0.69444, 0, 0, 0.70834],
        "73": [0, 0.69444, 0, 0, 0.27778],
        "74": [0, 0.69444, 0, 0, 0.47222],
        "75": [0, 0.69444, 0, 0, 0.69445],
        "76": [0, 0.69444, 0, 0, 0.54167],
        "77": [0, 0.69444, 0, 0, 0.875],
        "78": [0, 0.69444, 0, 0, 0.70834],
        "79": [0, 0.69444, 0, 0, 0.73611],
        "80": [0, 0.69444, 0, 0, 0.63889],
        "81": [0.125, 0.69444, 0, 0, 0.73611],
        "82": [0, 0.69444, 0, 0, 0.64584],
        "83": [0, 0.69444, 0, 0, 0.55556],
        "84": [0, 0.69444, 0, 0, 0.68056],
        "85": [0, 0.69444, 0, 0, 0.6875],
        "86": [0, 0.69444, 0.01389, 0, 0.66667],
        "87": [0, 0.69444, 0.01389, 0, 0.94445],
        "88": [0, 0.69444, 0, 0, 0.66667],
        "89": [0, 0.69444, 0.025, 0, 0.66667],
        "90": [0, 0.69444, 0, 0, 0.61111],
        "91": [0.25, 0.75, 0, 0, 0.28889],
        "93": [0.25, 0.75, 0, 0, 0.28889],
        "94": [0, 0.69444, 0, 0, 0.5],
        "95": [0.35, 0.09444, 0.02778, 0, 0.5],
        "97": [0, 0.44444, 0, 0, 0.48056],
        "98": [0, 0.69444, 0, 0, 0.51667],
        "99": [0, 0.44444, 0, 0, 0.44445],
        "100": [0, 0.69444, 0, 0, 0.51667],
        "101": [0, 0.44444, 0, 0, 0.44445],
        "102": [0, 0.69444, 0.06944, 0, 0.30556],
        "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
        "104": [0, 0.69444, 0, 0, 0.51667],
        "105": [0, 0.67937, 0, 0, 0.23889],
        "106": [0.19444, 0.67937, 0, 0, 0.26667],
        "107": [0, 0.69444, 0, 0, 0.48889],
        "108": [0, 0.69444, 0, 0, 0.23889],
        "109": [0, 0.44444, 0, 0, 0.79445],
        "110": [0, 0.44444, 0, 0, 0.51667],
        "111": [0, 0.44444, 0, 0, 0.5],
        "112": [0.19444, 0.44444, 0, 0, 0.51667],
        "113": [0.19444, 0.44444, 0, 0, 0.51667],
        "114": [0, 0.44444, 0.01389, 0, 0.34167],
        "115": [0, 0.44444, 0, 0, 0.38333],
        "116": [0, 0.57143, 0, 0, 0.36111],
        "117": [0, 0.44444, 0, 0, 0.51667],
        "118": [0, 0.44444, 0.01389, 0, 0.46111],
        "119": [0, 0.44444, 0.01389, 0, 0.68334],
        "120": [0, 0.44444, 0, 0, 0.46111],
        "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
        "122": [0, 0.44444, 0, 0, 0.43472],
        "126": [0.35, 0.32659, 0, 0, 0.5],
        "160": [0, 0, 0, 0, 0.25],
        "168": [0, 0.67937, 0, 0, 0.5],
        "176": [0, 0.69444, 0, 0, 0.66667],
        "184": [0.17014, 0, 0, 0, 0.44445],
        "305": [0, 0.44444, 0, 0, 0.23889],
        "567": [0.19444, 0.44444, 0, 0, 0.26667],
        "710": [0, 0.69444, 0, 0, 0.5],
        "711": [0, 0.63194, 0, 0, 0.5],
        "713": [0, 0.60889, 0, 0, 0.5],
        "714": [0, 0.69444, 0, 0, 0.5],
        "715": [0, 0.69444, 0, 0, 0.5],
        "728": [0, 0.69444, 0, 0, 0.5],
        "729": [0, 0.67937, 0, 0, 0.27778],
        "730": [0, 0.69444, 0, 0, 0.66667],
        "732": [0, 0.67659, 0, 0, 0.5],
        "733": [0, 0.69444, 0, 0, 0.5],
        "915": [0, 0.69444, 0, 0, 0.54167],
        "916": [0, 0.69444, 0, 0, 0.83334],
        "920": [0, 0.69444, 0, 0, 0.77778],
        "923": [0, 0.69444, 0, 0, 0.61111],
        "926": [0, 0.69444, 0, 0, 0.66667],
        "928": [0, 0.69444, 0, 0, 0.70834],
        "931": [0, 0.69444, 0, 0, 0.72222],
        "933": [0, 0.69444, 0, 0, 0.77778],
        "934": [0, 0.69444, 0, 0, 0.72222],
        "936": [0, 0.69444, 0, 0, 0.77778],
        "937": [0, 0.69444, 0, 0, 0.72222],
        "8211": [0, 0.44444, 0.02778, 0, 0.5],
        "8212": [0, 0.44444, 0.02778, 0, 1.0],
        "8216": [0, 0.69444, 0, 0, 0.27778],
        "8217": [0, 0.69444, 0, 0, 0.27778],
        "8220": [0, 0.69444, 0, 0, 0.5],
        "8221": [0, 0.69444, 0, 0, 0.5]
      },
      "Script-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "65": [0, 0.7, 0.22925, 0, 0.80253],
        "66": [0, 0.7, 0.04087, 0, 0.90757],
        "67": [0, 0.7, 0.1689, 0, 0.66619],
        "68": [0, 0.7, 0.09371, 0, 0.77443],
        "69": [0, 0.7, 0.18583, 0, 0.56162],
        "70": [0, 0.7, 0.13634, 0, 0.89544],
        "71": [0, 0.7, 0.17322, 0, 0.60961],
        "72": [0, 0.7, 0.29694, 0, 0.96919],
        "73": [0, 0.7, 0.19189, 0, 0.80907],
        "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
        "75": [0, 0.7, 0.31259, 0, 0.91364],
        "76": [0, 0.7, 0.19189, 0, 0.87373],
        "77": [0, 0.7, 0.15981, 0, 1.08031],
        "78": [0, 0.7, 0.3525, 0, 0.9015],
        "79": [0, 0.7, 0.08078, 0, 0.73787],
        "80": [0, 0.7, 0.08078, 0, 1.01262],
        "81": [0, 0.7, 0.03305, 0, 0.88282],
        "82": [0, 0.7, 0.06259, 0, 0.85],
        "83": [0, 0.7, 0.19189, 0, 0.86767],
        "84": [0, 0.7, 0.29087, 0, 0.74697],
        "85": [0, 0.7, 0.25815, 0, 0.79996],
        "86": [0, 0.7, 0.27523, 0, 0.62204],
        "87": [0, 0.7, 0.27523, 0, 0.80532],
        "88": [0, 0.7, 0.26006, 0, 0.94445],
        "89": [0, 0.7, 0.2939, 0, 0.70961],
        "90": [0, 0.7, 0.24037, 0, 0.8212],
        "160": [0, 0, 0, 0, 0.25]
      },
      "Size1-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "40": [0.35001, 0.85, 0, 0, 0.45834],
        "41": [0.35001, 0.85, 0, 0, 0.45834],
        "47": [0.35001, 0.85, 0, 0, 0.57778],
        "91": [0.35001, 0.85, 0, 0, 0.41667],
        "92": [0.35001, 0.85, 0, 0, 0.57778],
        "93": [0.35001, 0.85, 0, 0, 0.41667],
        "123": [0.35001, 0.85, 0, 0, 0.58334],
        "125": [0.35001, 0.85, 0, 0, 0.58334],
        "160": [0, 0, 0, 0, 0.25],
        "710": [0, 0.72222, 0, 0, 0.55556],
        "732": [0, 0.72222, 0, 0, 0.55556],
        "770": [0, 0.72222, 0, 0, 0.55556],
        "771": [0, 0.72222, 0, 0, 0.55556],
        "8214": [-0.00099, 0.601, 0, 0, 0.77778],
        "8593": [1e-05, 0.6, 0, 0, 0.66667],
        "8595": [1e-05, 0.6, 0, 0, 0.66667],
        "8657": [1e-05, 0.6, 0, 0, 0.77778],
        "8659": [1e-05, 0.6, 0, 0, 0.77778],
        "8719": [0.25001, 0.75, 0, 0, 0.94445],
        "8720": [0.25001, 0.75, 0, 0, 0.94445],
        "8721": [0.25001, 0.75, 0, 0, 1.05556],
        "8730": [0.35001, 0.85, 0, 0, 1.0],
        "8739": [-0.00599, 0.606, 0, 0, 0.33333],
        "8741": [-0.00599, 0.606, 0, 0, 0.55556],
        "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
        "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
        "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
        "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
        "8896": [0.25001, 0.75, 0, 0, 0.83334],
        "8897": [0.25001, 0.75, 0, 0, 0.83334],
        "8898": [0.25001, 0.75, 0, 0, 0.83334],
        "8899": [0.25001, 0.75, 0, 0, 0.83334],
        "8968": [0.35001, 0.85, 0, 0, 0.47222],
        "8969": [0.35001, 0.85, 0, 0, 0.47222],
        "8970": [0.35001, 0.85, 0, 0, 0.47222],
        "8971": [0.35001, 0.85, 0, 0, 0.47222],
        "9168": [-0.00099, 0.601, 0, 0, 0.66667],
        "10216": [0.35001, 0.85, 0, 0, 0.47222],
        "10217": [0.35001, 0.85, 0, 0, 0.47222],
        "10752": [0.25001, 0.75, 0, 0, 1.11111],
        "10753": [0.25001, 0.75, 0, 0, 1.11111],
        "10754": [0.25001, 0.75, 0, 0, 1.11111],
        "10756": [0.25001, 0.75, 0, 0, 0.83334],
        "10758": [0.25001, 0.75, 0, 0, 0.83334]
      },
      "Size2-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "40": [0.65002, 1.15, 0, 0, 0.59722],
        "41": [0.65002, 1.15, 0, 0, 0.59722],
        "47": [0.65002, 1.15, 0, 0, 0.81111],
        "91": [0.65002, 1.15, 0, 0, 0.47222],
        "92": [0.65002, 1.15, 0, 0, 0.81111],
        "93": [0.65002, 1.15, 0, 0, 0.47222],
        "123": [0.65002, 1.15, 0, 0, 0.66667],
        "125": [0.65002, 1.15, 0, 0, 0.66667],
        "160": [0, 0, 0, 0, 0.25],
        "710": [0, 0.75, 0, 0, 1.0],
        "732": [0, 0.75, 0, 0, 1.0],
        "770": [0, 0.75, 0, 0, 1.0],
        "771": [0, 0.75, 0, 0, 1.0],
        "8719": [0.55001, 1.05, 0, 0, 1.27778],
        "8720": [0.55001, 1.05, 0, 0, 1.27778],
        "8721": [0.55001, 1.05, 0, 0, 1.44445],
        "8730": [0.65002, 1.15, 0, 0, 1.0],
        "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
        "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
        "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
        "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
        "8896": [0.55001, 1.05, 0, 0, 1.11111],
        "8897": [0.55001, 1.05, 0, 0, 1.11111],
        "8898": [0.55001, 1.05, 0, 0, 1.11111],
        "8899": [0.55001, 1.05, 0, 0, 1.11111],
        "8968": [0.65002, 1.15, 0, 0, 0.52778],
        "8969": [0.65002, 1.15, 0, 0, 0.52778],
        "8970": [0.65002, 1.15, 0, 0, 0.52778],
        "8971": [0.65002, 1.15, 0, 0, 0.52778],
        "10216": [0.65002, 1.15, 0, 0, 0.61111],
        "10217": [0.65002, 1.15, 0, 0, 0.61111],
        "10752": [0.55001, 1.05, 0, 0, 1.51112],
        "10753": [0.55001, 1.05, 0, 0, 1.51112],
        "10754": [0.55001, 1.05, 0, 0, 1.51112],
        "10756": [0.55001, 1.05, 0, 0, 1.11111],
        "10758": [0.55001, 1.05, 0, 0, 1.11111]
      },
      "Size3-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "40": [0.95003, 1.45, 0, 0, 0.73611],
        "41": [0.95003, 1.45, 0, 0, 0.73611],
        "47": [0.95003, 1.45, 0, 0, 1.04445],
        "91": [0.95003, 1.45, 0, 0, 0.52778],
        "92": [0.95003, 1.45, 0, 0, 1.04445],
        "93": [0.95003, 1.45, 0, 0, 0.52778],
        "123": [0.95003, 1.45, 0, 0, 0.75],
        "125": [0.95003, 1.45, 0, 0, 0.75],
        "160": [0, 0, 0, 0, 0.25],
        "710": [0, 0.75, 0, 0, 1.44445],
        "732": [0, 0.75, 0, 0, 1.44445],
        "770": [0, 0.75, 0, 0, 1.44445],
        "771": [0, 0.75, 0, 0, 1.44445],
        "8730": [0.95003, 1.45, 0, 0, 1.0],
        "8968": [0.95003, 1.45, 0, 0, 0.58334],
        "8969": [0.95003, 1.45, 0, 0, 0.58334],
        "8970": [0.95003, 1.45, 0, 0, 0.58334],
        "8971": [0.95003, 1.45, 0, 0, 0.58334],
        "10216": [0.95003, 1.45, 0, 0, 0.75],
        "10217": [0.95003, 1.45, 0, 0, 0.75]
      },
      "Size4-Regular": {
        "32": [0, 0, 0, 0, 0.25],
        "40": [1.25003, 1.75, 0, 0, 0.79167],
        "41": [1.25003, 1.75, 0, 0, 0.79167],
        "47": [1.25003, 1.75, 0, 0, 1.27778],
        "91": [1.25003, 1.75, 0, 0, 0.58334],
        "92": [1.25003, 1.75, 0, 0, 1.27778],
        "93": [1.25003, 1.75, 0, 0, 0.58334],
        "123": [1.25003, 1.75, 0, 0, 0.80556],
        "125": [1.25003, 1.75, 0, 0, 0.80556],
        "160": [0, 0, 0, 0, 0.25],
        "710": [0, 0.825, 0, 0, 1.8889],
        "732": [0, 0.825, 0, 0, 1.8889],
        "770": [0, 0.825, 0, 0, 1.8889],
        "771": [0, 0.825, 0, 0, 1.8889],
        "8730": [1.25003, 1.75, 0, 0, 1.0],
        "8968": [1.25003, 1.75, 0, 0, 0.63889],
        "8969": [1.25003, 1.75, 0, 0, 0.63889],
        "8970": [1.25003, 1.75, 0, 0, 0.63889],
        "8971": [1.25003, 1.75, 0, 0, 0.63889],
        "9115": [0.64502, 1.155, 0, 0, 0.875],
        "9116": [1e-05, 0.6, 0, 0, 0.875],
        "9117": [0.64502, 1.155, 0, 0, 0.875],
        "9118": [0.64502, 1.155, 0, 0, 0.875],
        "9119": [1e-05, 0.6, 0, 0, 0.875],
        "9120": [0.64502, 1.155, 0, 0, 0.875],
        "9121": [0.64502, 1.155, 0, 0, 0.66667],
        "9122": [-0.00099, 0.601, 0, 0, 0.66667],
        "9123": [0.64502, 1.155, 0, 0, 0.66667],
        "9124": [0.64502, 1.155, 0, 0, 0.66667],
        "9125": [-0.00099, 0.601, 0, 0, 0.66667],
        "9126": [0.64502, 1.155, 0, 0, 0.66667],
        "9127": [1e-05, 0.9, 0, 0, 0.88889],
        "9128": [0.65002, 1.15, 0, 0, 0.88889],
        "9129": [0.90001, 0, 0, 0, 0.88889],
        "9130": [0, 0.3, 0, 0, 0.88889],
        "9131": [1e-05, 0.9, 0, 0, 0.88889],
        "9132": [0.65002, 1.15, 0, 0, 0.88889],
        "9133": [0.90001, 0, 0, 0, 0.88889],
        "9143": [0.88502, 0.915, 0, 0, 1.05556],
        "10216": [1.25003, 1.75, 0, 0, 0.80556],
        "10217": [1.25003, 1.75, 0, 0, 0.80556],
        "57344": [-0.00499, 0.605, 0, 0, 1.05556],
        "57345": [-0.00499, 0.605, 0, 0, 1.05556],
        "57680": [0, 0.12, 0, 0, 0.45],
        "57681": [0, 0.12, 0, 0, 0.45],
        "57682": [0, 0.12, 0, 0, 0.45],
        "57683": [0, 0.12, 0, 0, 0.45]
      },
      "Typewriter-Regular": {
        "32": [0, 0, 0, 0, 0.525],
        "33": [0, 0.61111, 0, 0, 0.525],
        "34": [0, 0.61111, 0, 0, 0.525],
        "35": [0, 0.61111, 0, 0, 0.525],
        "36": [0.08333, 0.69444, 0, 0, 0.525],
        "37": [0.08333, 0.69444, 0, 0, 0.525],
        "38": [0, 0.61111, 0, 0, 0.525],
        "39": [0, 0.61111, 0, 0, 0.525],
        "40": [0.08333, 0.69444, 0, 0, 0.525],
        "41": [0.08333, 0.69444, 0, 0, 0.525],
        "42": [0, 0.52083, 0, 0, 0.525],
        "43": [-0.08056, 0.53055, 0, 0, 0.525],
        "44": [0.13889, 0.125, 0, 0, 0.525],
        "45": [-0.08056, 0.53055, 0, 0, 0.525],
        "46": [0, 0.125, 0, 0, 0.525],
        "47": [0.08333, 0.69444, 0, 0, 0.525],
        "48": [0, 0.61111, 0, 0, 0.525],
        "49": [0, 0.61111, 0, 0, 0.525],
        "50": [0, 0.61111, 0, 0, 0.525],
        "51": [0, 0.61111, 0, 0, 0.525],
        "52": [0, 0.61111, 0, 0, 0.525],
        "53": [0, 0.61111, 0, 0, 0.525],
        "54": [0, 0.61111, 0, 0, 0.525],
        "55": [0, 0.61111, 0, 0, 0.525],
        "56": [0, 0.61111, 0, 0, 0.525],
        "57": [0, 0.61111, 0, 0, 0.525],
        "58": [0, 0.43056, 0, 0, 0.525],
        "59": [0.13889, 0.43056, 0, 0, 0.525],
        "60": [-0.05556, 0.55556, 0, 0, 0.525],
        "61": [-0.19549, 0.41562, 0, 0, 0.525],
        "62": [-0.05556, 0.55556, 0, 0, 0.525],
        "63": [0, 0.61111, 0, 0, 0.525],
        "64": [0, 0.61111, 0, 0, 0.525],
        "65": [0, 0.61111, 0, 0, 0.525],
        "66": [0, 0.61111, 0, 0, 0.525],
        "67": [0, 0.61111, 0, 0, 0.525],
        "68": [0, 0.61111, 0, 0, 0.525],
        "69": [0, 0.61111, 0, 0, 0.525],
        "70": [0, 0.61111, 0, 0, 0.525],
        "71": [0, 0.61111, 0, 0, 0.525],
        "72": [0, 0.61111, 0, 0, 0.525],
        "73": [0, 0.61111, 0, 0, 0.525],
        "74": [0, 0.61111, 0, 0, 0.525],
        "75": [0, 0.61111, 0, 0, 0.525],
        "76": [0, 0.61111, 0, 0, 0.525],
        "77": [0, 0.61111, 0, 0, 0.525],
        "78": [0, 0.61111, 0, 0, 0.525],
        "79": [0, 0.61111, 0, 0, 0.525],
        "80": [0, 0.61111, 0, 0, 0.525],
        "81": [0.13889, 0.61111, 0, 0, 0.525],
        "82": [0, 0.61111, 0, 0, 0.525],
        "83": [0, 0.61111, 0, 0, 0.525],
        "84": [0, 0.61111, 0, 0, 0.525],
        "85": [0, 0.61111, 0, 0, 0.525],
        "86": [0, 0.61111, 0, 0, 0.525],
        "87": [0, 0.61111, 0, 0, 0.525],
        "88": [0, 0.61111, 0, 0, 0.525],
        "89": [0, 0.61111, 0, 0, 0.525],
        "90": [0, 0.61111, 0, 0, 0.525],
        "91": [0.08333, 0.69444, 0, 0, 0.525],
        "92": [0.08333, 0.69444, 0, 0, 0.525],
        "93": [0.08333, 0.69444, 0, 0, 0.525],
        "94": [0, 0.61111, 0, 0, 0.525],
        "95": [0.09514, 0, 0, 0, 0.525],
        "96": [0, 0.61111, 0, 0, 0.525],
        "97": [0, 0.43056, 0, 0, 0.525],
        "98": [0, 0.61111, 0, 0, 0.525],
        "99": [0, 0.43056, 0, 0, 0.525],
        "100": [0, 0.61111, 0, 0, 0.525],
        "101": [0, 0.43056, 0, 0, 0.525],
        "102": [0, 0.61111, 0, 0, 0.525],
        "103": [0.22222, 0.43056, 0, 0, 0.525],
        "104": [0, 0.61111, 0, 0, 0.525],
        "105": [0, 0.61111, 0, 0, 0.525],
        "106": [0.22222, 0.61111, 0, 0, 0.525],
        "107": [0, 0.61111, 0, 0, 0.525],
        "108": [0, 0.61111, 0, 0, 0.525],
        "109": [0, 0.43056, 0, 0, 0.525],
        "110": [0, 0.43056, 0, 0, 0.525],
        "111": [0, 0.43056, 0, 0, 0.525],
        "112": [0.22222, 0.43056, 0, 0, 0.525],
        "113": [0.22222, 0.43056, 0, 0, 0.525],
        "114": [0, 0.43056, 0, 0, 0.525],
        "115": [0, 0.43056, 0, 0, 0.525],
        "116": [0, 0.55358, 0, 0, 0.525],
        "117": [0, 0.43056, 0, 0, 0.525],
        "118": [0, 0.43056, 0, 0, 0.525],
        "119": [0, 0.43056, 0, 0, 0.525],
        "120": [0, 0.43056, 0, 0, 0.525],
        "121": [0.22222, 0.43056, 0, 0, 0.525],
        "122": [0, 0.43056, 0, 0, 0.525],
        "123": [0.08333, 0.69444, 0, 0, 0.525],
        "124": [0.08333, 0.69444, 0, 0, 0.525],
        "125": [0.08333, 0.69444, 0, 0, 0.525],
        "126": [0, 0.61111, 0, 0, 0.525],
        "127": [0, 0.61111, 0, 0, 0.525],
        "160": [0, 0, 0, 0, 0.525],
        "176": [0, 0.61111, 0, 0, 0.525],
        "184": [0.19445, 0, 0, 0, 0.525],
        "305": [0, 0.43056, 0, 0, 0.525],
        "567": [0.22222, 0.43056, 0, 0, 0.525],
        "711": [0, 0.56597, 0, 0, 0.525],
        "713": [0, 0.56555, 0, 0, 0.525],
        "714": [0, 0.61111, 0, 0, 0.525],
        "715": [0, 0.61111, 0, 0, 0.525],
        "728": [0, 0.61111, 0, 0, 0.525],
        "730": [0, 0.61111, 0, 0, 0.525],
        "770": [0, 0.61111, 0, 0, 0.525],
        "771": [0, 0.61111, 0, 0, 0.525],
        "776": [0, 0.61111, 0, 0, 0.525],
        "915": [0, 0.61111, 0, 0, 0.525],
        "916": [0, 0.61111, 0, 0, 0.525],
        "920": [0, 0.61111, 0, 0, 0.525],
        "923": [0, 0.61111, 0, 0, 0.525],
        "926": [0, 0.61111, 0, 0, 0.525],
        "928": [0, 0.61111, 0, 0, 0.525],
        "931": [0, 0.61111, 0, 0, 0.525],
        "933": [0, 0.61111, 0, 0, 0.525],
        "934": [0, 0.61111, 0, 0, 0.525],
        "936": [0, 0.61111, 0, 0, 0.525],
        "937": [0, 0.61111, 0, 0, 0.525],
        "8216": [0, 0.61111, 0, 0, 0.525],
        "8217": [0, 0.61111, 0, 0, 0.525],
        "8242": [0, 0.61111, 0, 0, 0.525],
        "9251": [0.11111, 0.21944, 0, 0, 0.525]
      }
    };

    /**
     * This file contains metrics regarding fonts and individual symbols. The sigma
     * and xi variables, as well as the metricMap map contain data extracted from
     * TeX, TeX font metrics, and the TTF files. These data are then exposed via the
     * `metrics` variable and the getCharacterMetrics function.
     */
    // In TeX, there are actually three sets of dimensions, one for each of
    // textstyle (size index 5 and higher: >=9pt), scriptstyle (size index 3 and 4:
    // 7-8pt), and scriptscriptstyle (size index 1 and 2: 5-6pt).  These are
    // provided in the arrays below, in that order.
    //
    // The font metrics are stored in fonts cmsy10, cmsy7, and cmsy5 respectively.
    // This was determined by running the following script:
    //
    //     latex -interaction=nonstopmode \
    //     '\documentclass{article}\usepackage{amsmath}\begin{document}' \
    //     '$a$ \expandafter\show\the\textfont2' \
    //     '\expandafter\show\the\scriptfont2' \
    //     '\expandafter\show\the\scriptscriptfont2' \
    //     '\stop'
    //
    // The metrics themselves were retrieved using the following commands:
    //
    //     tftopl cmsy10
    //     tftopl cmsy7
    //     tftopl cmsy5
    //
    // The output of each of these commands is quite lengthy.  The only part we
    // care about is the FONTDIMEN section. Each value is measured in EMs.
    var sigmasAndXis = {
      slant: [0.250, 0.250, 0.250],
      // sigma1
      space: [0.000, 0.000, 0.000],
      // sigma2
      stretch: [0.000, 0.000, 0.000],
      // sigma3
      shrink: [0.000, 0.000, 0.000],
      // sigma4
      xHeight: [0.431, 0.431, 0.431],
      // sigma5
      quad: [1.000, 1.171, 1.472],
      // sigma6
      extraSpace: [0.000, 0.000, 0.000],
      // sigma7
      num1: [0.677, 0.732, 0.925],
      // sigma8
      num2: [0.394, 0.384, 0.387],
      // sigma9
      num3: [0.444, 0.471, 0.504],
      // sigma10
      denom1: [0.686, 0.752, 1.025],
      // sigma11
      denom2: [0.345, 0.344, 0.532],
      // sigma12
      sup1: [0.413, 0.503, 0.504],
      // sigma13
      sup2: [0.363, 0.431, 0.404],
      // sigma14
      sup3: [0.289, 0.286, 0.294],
      // sigma15
      sub1: [0.150, 0.143, 0.200],
      // sigma16
      sub2: [0.247, 0.286, 0.400],
      // sigma17
      supDrop: [0.386, 0.353, 0.494],
      // sigma18
      subDrop: [0.050, 0.071, 0.100],
      // sigma19
      delim1: [2.390, 1.700, 1.980],
      // sigma20
      delim2: [1.010, 1.157, 1.420],
      // sigma21
      axisHeight: [0.250, 0.250, 0.250],
      // sigma22
      // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
      // they correspond to the font parameters of the extension fonts (family 3).
      // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
      // match cmex7, we'd use cmex7.tfm values for script and scriptscript
      // values.
      defaultRuleThickness: [0.04, 0.049, 0.049],
      // xi8; cmex7: 0.049
      bigOpSpacing1: [0.111, 0.111, 0.111],
      // xi9
      bigOpSpacing2: [0.166, 0.166, 0.166],
      // xi10
      bigOpSpacing3: [0.2, 0.2, 0.2],
      // xi11
      bigOpSpacing4: [0.6, 0.611, 0.611],
      // xi12; cmex7: 0.611
      bigOpSpacing5: [0.1, 0.143, 0.143],
      // xi13; cmex7: 0.143
      // The \sqrt rule width is taken from the height of the surd character.
      // Since we use the same font at all sizes, this thickness doesn't scale.
      sqrtRuleThickness: [0.04, 0.04, 0.04],
      // This value determines how large a pt is, for metrics which are defined
      // in terms of pts.
      // This value is also used in katex.less; if you change it make sure the
      // values match.
      ptPerEm: [10.0, 10.0, 10.0],
      // The space between adjacent `|` columns in an array definition. From
      // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
      doubleRuleSep: [0.2, 0.2, 0.2],
      // The width of separator lines in {array} environments. From
      // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
      arrayRuleWidth: [0.04, 0.04, 0.04],
      // Two values from LaTeX source2e:
      fboxsep: [0.3, 0.3, 0.3],
      //        3 pt / ptPerEm
      fboxrule: [0.04, 0.04, 0.04] // 0.4 pt / ptPerEm

    }; // This map contains a mapping from font name and character code to character
    // should have Latin-1 and Cyrillic characters, but may not depending on the
    // operating system.  The metrics do not account for extra height from the
    // accents.  In the case of Cyrillic characters which have both ascenders and
    // descenders we prefer approximations with ascenders, primarily to prevent
    // the fraction bar or root line from intersecting the glyph.
    // TODO(kevinb) allow union of multiple glyph metrics for better accuracy.

    var extraCharacterMap = {
      // Latin-1
      'Å': 'A',
      'Ð': 'D',
      'Þ': 'o',
      'å': 'a',
      'ð': 'd',
      'þ': 'o',
      // Cyrillic
      'А': 'A',
      'Б': 'B',
      'В': 'B',
      'Г': 'F',
      'Д': 'A',
      'Е': 'E',
      'Ж': 'K',
      'З': '3',
      'И': 'N',
      'Й': 'N',
      'К': 'K',
      'Л': 'N',
      'М': 'M',
      'Н': 'H',
      'О': 'O',
      'П': 'N',
      'Р': 'P',
      'С': 'C',
      'Т': 'T',
      'У': 'y',
      'Ф': 'O',
      'Х': 'X',
      'Ц': 'U',
      'Ч': 'h',
      'Ш': 'W',
      'Щ': 'W',
      'Ъ': 'B',
      'Ы': 'X',
      'Ь': 'B',
      'Э': '3',
      'Ю': 'X',
      'Я': 'R',
      'а': 'a',
      'б': 'b',
      'в': 'a',
      'г': 'r',
      'д': 'y',
      'е': 'e',
      'ж': 'm',
      'з': 'e',
      'и': 'n',
      'й': 'n',
      'к': 'n',
      'л': 'n',
      'м': 'm',
      'н': 'n',
      'о': 'o',
      'п': 'n',
      'р': 'p',
      'с': 'c',
      'т': 'o',
      'у': 'y',
      'ф': 'b',
      'х': 'x',
      'ц': 'n',
      'ч': 'n',
      'ш': 'w',
      'щ': 'w',
      'ъ': 'a',
      'ы': 'm',
      'ь': 'a',
      'э': 'e',
      'ю': 'm',
      'я': 'r'
    };

    /**
     * This function adds new font metrics to default metricMap
     * It can also override existing metrics
     */
    function setFontMetrics(fontName, metrics) {
      fontMetricsData[fontName] = metrics;
    }
    /**
     * This function is a convenience function for looking up information in the
     * metricMap table. It takes a character as a string, and a font.
     *
     * Note: the `width` property may be undefined if fontMetricsData.js wasn't
     * built using `Make extended_metrics`.
     */

    function getCharacterMetrics(character, font, mode) {
      if (!fontMetricsData[font]) {
        throw new Error("Font metrics not found for font: " + font + ".");
      }

      var ch = character.charCodeAt(0);
      var metrics = fontMetricsData[font][ch];

      if (!metrics && character[0] in extraCharacterMap) {
        ch = extraCharacterMap[character[0]].charCodeAt(0);
        metrics = fontMetricsData[font][ch];
      }

      if (!metrics && mode === 'text') {
        // We don't typically have font metrics for Asian scripts.
        // But since we support them in text mode, we need to return
        // some sort of metrics.
        // So if the character is in a script we support but we
        // don't have metrics for it, just use the metrics for
        // the Latin capital letter M. This is close enough because
        // we (currently) only care about the height of the glyph
        // not its width.
        if (supportedCodepoint(ch)) {
          metrics = fontMetricsData[font][77]; // 77 is the charcode for 'M'
        }
      }

      if (metrics) {
        return {
          depth: metrics[0],
          height: metrics[1],
          italic: metrics[2],
          skew: metrics[3],
          width: metrics[4]
        };
      }
    }
    var fontMetricsBySizeIndex = {};
    /**
     * Get the font metrics for a given size.
     */

    function getGlobalMetrics(size) {
      var sizeIndex;

      if (size >= 5) {
        sizeIndex = 0;
      } else if (size >= 3) {
        sizeIndex = 1;
      } else {
        sizeIndex = 2;
      }

      if (!fontMetricsBySizeIndex[sizeIndex]) {
        var metrics = fontMetricsBySizeIndex[sizeIndex] = {
          cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18
        };

        for (var key in sigmasAndXis) {
          if (sigmasAndXis.hasOwnProperty(key)) {
            metrics[key] = sigmasAndXis[key][sizeIndex];
          }
        }
      }

      return fontMetricsBySizeIndex[sizeIndex];
    }

    /**
     * This file contains information about the options that the Parser carries
     * around with it while parsing. Data is held in an `Options` object, and when
     * recursing, a new `Options` object can be created with the `.with*` and
     * `.reset` functions.
     */
    var sizeStyleMap = [// Each element contains [textsize, scriptsize, scriptscriptsize].
    // The size mappings are taken from TeX with \normalsize=10pt.
    [1, 1, 1], // size1: [5, 5, 5]              \tiny
    [2, 1, 1], // size2: [6, 5, 5]
    [3, 1, 1], // size3: [7, 5, 5]              \scriptsize
    [4, 2, 1], // size4: [8, 6, 5]              \footnotesize
    [5, 2, 1], // size5: [9, 6, 5]              \small
    [6, 3, 1], // size6: [10, 7, 5]             \normalsize
    [7, 4, 2], // size7: [12, 8, 6]             \large
    [8, 6, 3], // size8: [14.4, 10, 7]          \Large
    [9, 7, 6], // size9: [17.28, 12, 10]        \LARGE
    [10, 8, 7], // size10: [20.74, 14.4, 12]     \huge
    [11, 10, 9] // size11: [24.88, 20.74, 17.28] \HUGE
    ];
    var sizeMultipliers = [// fontMetrics.js:getGlobalMetrics also uses size indexes, so if
    // you change size indexes, change that function.
    0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.44, 1.728, 2.074, 2.488];

    var sizeAtStyle = function sizeAtStyle(size, style) {
      return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
    }; // In these types, "" (empty string) means "no change".


    /**
     * This is the main options class. It contains the current style, size, color,
     * and font.
     *
     * Options objects should not be modified. To create a new Options with
     * different properties, call a `.having*` method.
     */
    class Options {
      // A font family applies to a group of fonts (i.e. SansSerif), while a font
      // represents a specific font (i.e. SansSerif Bold).
      // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm

      /**
       * The base size index.
       */
      constructor(data) {
        this.style = void 0;
        this.color = void 0;
        this.size = void 0;
        this.textSize = void 0;
        this.phantom = void 0;
        this.font = void 0;
        this.fontFamily = void 0;
        this.fontWeight = void 0;
        this.fontShape = void 0;
        this.sizeMultiplier = void 0;
        this.maxSize = void 0;
        this.minRuleThickness = void 0;
        this._fontMetrics = void 0;
        this.style = data.style;
        this.color = data.color;
        this.size = data.size || Options.BASESIZE;
        this.textSize = data.textSize || this.size;
        this.phantom = !!data.phantom;
        this.font = data.font || "";
        this.fontFamily = data.fontFamily || "";
        this.fontWeight = data.fontWeight || '';
        this.fontShape = data.fontShape || '';
        this.sizeMultiplier = sizeMultipliers[this.size - 1];
        this.maxSize = data.maxSize;
        this.minRuleThickness = data.minRuleThickness;
        this._fontMetrics = undefined;
      }
      /**
       * Returns a new options object with the same properties as "this".  Properties
       * from "extension" will be copied to the new options object.
       */


      extend(extension) {
        var data = {
          style: this.style,
          size: this.size,
          textSize: this.textSize,
          color: this.color,
          phantom: this.phantom,
          font: this.font,
          fontFamily: this.fontFamily,
          fontWeight: this.fontWeight,
          fontShape: this.fontShape,
          maxSize: this.maxSize,
          minRuleThickness: this.minRuleThickness
        };

        for (var key in extension) {
          if (extension.hasOwnProperty(key)) {
            data[key] = extension[key];
          }
        }

        return new Options(data);
      }
      /**
       * Return an options object with the given style. If `this.style === style`,
       * returns `this`.
       */


      havingStyle(style) {
        if (this.style === style) {
          return this;
        } else {
          return this.extend({
            style: style,
            size: sizeAtStyle(this.textSize, style)
          });
        }
      }
      /**
       * Return an options object with a cramped version of the current style. If
       * the current style is cramped, returns `this`.
       */


      havingCrampedStyle() {
        return this.havingStyle(this.style.cramp());
      }
      /**
       * Return an options object with the given size and in at least `\textstyle`.
       * Returns `this` if appropriate.
       */


      havingSize(size) {
        if (this.size === size && this.textSize === size) {
          return this;
        } else {
          return this.extend({
            style: this.style.text(),
            size: size,
            textSize: size,
            sizeMultiplier: sizeMultipliers[size - 1]
          });
        }
      }
      /**
       * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
       * changes to at least `\textstyle`.
       */


      havingBaseStyle(style) {
        style = style || this.style.text();
        var wantSize = sizeAtStyle(Options.BASESIZE, style);

        if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) {
          return this;
        } else {
          return this.extend({
            style: style,
            size: wantSize
          });
        }
      }
      /**
       * Remove the effect of sizing changes such as \Huge.
       * Keep the effect of the current style, such as \scriptstyle.
       */


      havingBaseSizing() {
        var size;

        switch (this.style.id) {
          case 4:
          case 5:
            size = 3; // normalsize in scriptstyle

            break;

          case 6:
          case 7:
            size = 1; // normalsize in scriptscriptstyle

            break;

          default:
            size = 6;
          // normalsize in textstyle or displaystyle
        }

        return this.extend({
          style: this.style.text(),
          size: size
        });
      }
      /**
       * Create a new options object with the given color.
       */


      withColor(color) {
        return this.extend({
          color: color
        });
      }
      /**
       * Create a new options object with "phantom" set to true.
       */


      withPhantom() {
        return this.extend({
          phantom: true
        });
      }
      /**
       * Creates a new options object with the given math font or old text font.
       * @type {[type]}
       */


      withFont(font) {
        return this.extend({
          font
        });
      }
      /**
       * Create a new options objects with the given fontFamily.
       */


      withTextFontFamily(fontFamily) {
        return this.extend({
          fontFamily,
          font: ""
        });
      }
      /**
       * Creates a new options object with the given font weight
       */


      withTextFontWeight(fontWeight) {
        return this.extend({
          fontWeight,
          font: ""
        });
      }
      /**
       * Creates a new options object with the given font weight
       */


      withTextFontShape(fontShape) {
        return this.extend({
          fontShape,
          font: ""
        });
      }
      /**
       * Return the CSS sizing classes required to switch from enclosing options
       * `oldOptions` to `this`. Returns an array of classes.
       */


      sizingClasses(oldOptions) {
        if (oldOptions.size !== this.size) {
          return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
        } else {
          return [];
        }
      }
      /**
       * Return the CSS sizing classes required to switch to the base size. Like
       * `this.havingSize(BASESIZE).sizingClasses(this)`.
       */


      baseSizingClasses() {
        if (this.size !== Options.BASESIZE) {
          return ["sizing", "reset-size" + this.size, "size" + Options.BASESIZE];
        } else {
          return [];
        }
      }
      /**
       * Return the font metrics for this size.
       */


      fontMetrics() {
        if (!this._fontMetrics) {
          this._fontMetrics = getGlobalMetrics(this.size);
        }

        return this._fontMetrics;
      }
      /**
       * Gets the CSS color of the current options object
       */


      getColor() {
        if (this.phantom) {
          return "transparent";
        } else {
          return this.color;
        }
      }

    }

    Options.BASESIZE = 6;

    /**
     * This file does conversion between units.  In particular, it provides
     * calculateSize to convert other units into ems.
     */
    // Thus, multiplying a length by this number converts the length from units
    // into pts.  Dividing the result by ptPerEm gives the number of ems
    // *assuming* a font size of ptPerEm (normal size, normal style).

    var ptPerUnit = {
      // https://en.wikibooks.org/wiki/LaTeX/Lengths and
      // https://tex.stackexchange.com/a/8263
      "pt": 1,
      // TeX point
      "mm": 7227 / 2540,
      // millimeter
      "cm": 7227 / 254,
      // centimeter
      "in": 72.27,
      // inch
      "bp": 803 / 800,
      // big (PostScript) points
      "pc": 12,
      // pica
      "dd": 1238 / 1157,
      // didot
      "cc": 14856 / 1157,
      // cicero (12 didot)
      "nd": 685 / 642,
      // new didot
      "nc": 1370 / 107,
      // new cicero (12 new didot)
      "sp": 1 / 65536,
      // scaled point (TeX's internal smallest unit)
      // https://tex.stackexchange.com/a/41371
      "px": 803 / 800 // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX

    }; // Dictionary of relative units, for fast validity testing.

    var relativeUnit = {
      "ex": true,
      "em": true,
      "mu": true
    };

    /**
     * Determine whether the specified unit (either a string defining the unit
     * or a "size" parse node containing a unit field) is valid.
     */
    var validUnit = function validUnit(unit) {
      if (typeof unit !== "string") {
        unit = unit.unit;
      }

      return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
    };
    /*
     * Convert a "size" parse node (with numeric "number" and string "unit" fields,
     * as parsed by functions.js argType "size") into a CSS em value for the
     * current style/scale.  `options` gives the current options.
     */

    var calculateSize = function calculateSize(sizeValue, options) {
      var scale;

      if (sizeValue.unit in ptPerUnit) {
        // Absolute units
        scale = ptPerUnit[sizeValue.unit] // Convert unit to pt
        / options.fontMetrics().ptPerEm // Convert pt to CSS em
        / options.sizeMultiplier; // Unscale to make absolute units
      } else if (sizeValue.unit === "mu") {
        // `mu` units scale with scriptstyle/scriptscriptstyle.
        scale = options.fontMetrics().cssEmPerMu;
      } else {
        // Other relative units always refer to the *textstyle* font
        // in the current size.
        var unitOptions;

        if (options.style.isTight()) {
          // isTight() means current style is script/scriptscript.
          unitOptions = options.havingStyle(options.style.text());
        } else {
          unitOptions = options;
        } // TODO: In TeX these units are relative to the quad of the current
        // *text* font, e.g. cmr10. KaTeX instead uses values from the
        // comparably-sized *Computer Modern symbol* font. At 10pt, these
        // match. At 7pt and 5pt, they differ: cmr7=1.138894, cmsy7=1.170641;
        // cmr5=1.361133, cmsy5=1.472241. Consider $\scriptsize a\kern1emb$.
        // TeX \showlists shows a kern of 1.13889 * fontsize;
        // KaTeX shows a kern of 1.171 * fontsize.


        if (sizeValue.unit === "ex") {
          scale = unitOptions.fontMetrics().xHeight;
        } else if (sizeValue.unit === "em") {
          scale = unitOptions.fontMetrics().quad;
        } else {
          throw new ParseError("Invalid unit: '" + sizeValue.unit + "'");
        }

        if (unitOptions !== options) {
          scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
        }
      }

      return Math.min(sizeValue.number * scale, options.maxSize);
    };
    /**
     * Round `n` to 4 decimal places, or to the nearest 1/10,000th em. See
     * https://github.com/KaTeX/KaTeX/pull/2460.
     */

    var makeEm = function makeEm(n) {
      return +n.toFixed(4) + "em";
    };

    /**
     * These objects store the data about the DOM nodes we create, as well as some
     * extra data. They can then be transformed into real DOM nodes with the
     * `toNode` function or HTML markup using `toMarkup`. They are useful for both
     * storing extra properties on the nodes, as well as providing a way to easily
     * work with the DOM.
     *
     * Similar functions for working with MathML nodes exist in mathMLTree.js.
     *
     * TODO: refactor `span` and `anchor` into common superclass when
     * target environments support class inheritance
     */

    /**
     * Create an HTML className based on a list of classes. In addition to joining
     * with spaces, we also remove empty classes.
     */
    var createClass = function createClass(classes) {
      return classes.filter(cls => cls).join(" ");
    };

    var initNode = function initNode(classes, options, style) {
      this.classes = classes || [];
      this.attributes = {};
      this.height = 0;
      this.depth = 0;
      this.maxFontSize = 0;
      this.style = style || {};

      if (options) {
        if (options.style.isTight()) {
          this.classes.push("mtight");
        }

        var color = options.getColor();

        if (color) {
          this.style.color = color;
        }
      }
    };
    /**
     * Convert into an HTML node
     */


    var toNode = function toNode(tagName) {
      var node = document.createElement(tagName); // Apply the class

      node.className = createClass(this.classes); // Apply inline styles

      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          // $FlowFixMe Flow doesn't seem to understand span.style's type.
          node.style[style] = this.style[style];
        }
      } // Apply attributes


      for (var attr in this.attributes) {
        if (this.attributes.hasOwnProperty(attr)) {
          node.setAttribute(attr, this.attributes[attr]);
        }
      } // Append the children, also as HTML nodes


      for (var i = 0; i < this.children.length; i++) {
        node.appendChild(this.children[i].toNode());
      }

      return node;
    };
    /**
     * Convert into an HTML markup string
     */


    var toMarkup = function toMarkup(tagName) {
      var markup = "<" + tagName; // Add the class

      if (this.classes.length) {
        markup += " class=\"" + utils.escape(createClass(this.classes)) + "\"";
      }

      var styles = ""; // Add the styles, after hyphenation

      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
      }

      if (styles) {
        markup += " style=\"" + utils.escape(styles) + "\"";
      } // Add the attributes


      for (var attr in this.attributes) {
        if (this.attributes.hasOwnProperty(attr)) {
          markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
        }
      }

      markup += ">"; // Add the markup of the children, also as markup

      for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
      }

      markup += "</" + tagName + ">";
      return markup;
    }; // Making the type below exact with all optional fields doesn't work due to
    // - https://github.com/facebook/flow/issues/4582
    // - https://github.com/facebook/flow/issues/5688
    // However, since *all* fields are optional, $Shape<> works as suggested in 5688
    // above.
    // This type does not include all CSS properties. Additional properties should
    // be added as needed.


    /**
     * This node represents a span node, with a className, a list of children, and
     * an inline style. It also contains information about its height, depth, and
     * maxFontSize.
     *
     * Represents two types with different uses: SvgSpan to wrap an SVG and DomSpan
     * otherwise. This typesafety is important when HTML builders access a span's
     * children.
     */
    class Span {
      constructor(classes, children, options, style) {
        this.children = void 0;
        this.attributes = void 0;
        this.classes = void 0;
        this.height = void 0;
        this.depth = void 0;
        this.width = void 0;
        this.maxFontSize = void 0;
        this.style = void 0;
        initNode.call(this, classes, options, style);
        this.children = children || [];
      }
      /**
       * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
       * all browsers support attributes the same, and having too many custom
       * attributes is probably bad.
       */


      setAttribute(attribute, value) {
        this.attributes[attribute] = value;
      }

      hasClass(className) {
        return utils.contains(this.classes, className);
      }

      toNode() {
        return toNode.call(this, "span");
      }

      toMarkup() {
        return toMarkup.call(this, "span");
      }

    }
    /**
     * This node represents an anchor (<a>) element with a hyperlink.  See `span`
     * for further details.
     */

    class Anchor {
      constructor(href, classes, children, options) {
        this.children = void 0;
        this.attributes = void 0;
        this.classes = void 0;
        this.height = void 0;
        this.depth = void 0;
        this.maxFontSize = void 0;
        this.style = void 0;
        initNode.call(this, classes, options);
        this.children = children || [];
        this.setAttribute('href', href);
      }

      setAttribute(attribute, value) {
        this.attributes[attribute] = value;
      }

      hasClass(className) {
        return utils.contains(this.classes, className);
      }

      toNode() {
        return toNode.call(this, "a");
      }

      toMarkup() {
        return toMarkup.call(this, "a");
      }

    }
    /**
     * This node represents an image embed (<img>) element.
     */

    class Img {
      constructor(src, alt, style) {
        this.src = void 0;
        this.alt = void 0;
        this.classes = void 0;
        this.height = void 0;
        this.depth = void 0;
        this.maxFontSize = void 0;
        this.style = void 0;
        this.alt = alt;
        this.src = src;
        this.classes = ["mord"];
        this.style = style;
      }

      hasClass(className) {
        return utils.contains(this.classes, className);
      }

      toNode() {
        var node = document.createElement("img");
        node.src = this.src;
        node.alt = this.alt;
        node.className = "mord"; // Apply inline styles

        for (var style in this.style) {
          if (this.style.hasOwnProperty(style)) {
            // $FlowFixMe
            node.style[style] = this.style[style];
          }
        }

        return node;
      }

      toMarkup() {
        var markup = "<img src=\"" + utils.escape(this.src) + "\"" + (" alt=\"" + utils.escape(this.alt) + "\""); // Add the styles, after hyphenation

        var styles = "";

        for (var style in this.style) {
          if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
          }
        }

        if (styles) {
          markup += " style=\"" + utils.escape(styles) + "\"";
        }

        markup += "'/>";
        return markup;
      }

    }
    var iCombinations = {
      'î': '\u0131\u0302',
      'ï': '\u0131\u0308',
      'í': '\u0131\u0301',
      // 'ī': '\u0131\u0304', // enable when we add Extended Latin
      'ì': '\u0131\u0300'
    };
    /**
     * A symbol node contains information about a single symbol. It either renders
     * to a single text node, or a span with a single text node in it, depending on
     * whether it has CSS classes, styles, or needs italic correction.
     */

    class SymbolNode {
      constructor(text, height, depth, italic, skew, width, classes, style) {
        this.text = void 0;
        this.height = void 0;
        this.depth = void 0;
        this.italic = void 0;
        this.skew = void 0;
        this.width = void 0;
        this.maxFontSize = void 0;
        this.classes = void 0;
        this.style = void 0;
        this.text = text;
        this.height = height || 0;
        this.depth = depth || 0;
        this.italic = italic || 0;
        this.skew = skew || 0;
        this.width = width || 0;
        this.classes = classes || [];
        this.style = style || {};
        this.maxFontSize = 0; // Mark text from non-Latin scripts with specific classes so that we
        // can specify which fonts to use.  This allows us to render these
        // characters with a serif font in situations where the browser would
        // either default to a sans serif or render a placeholder character.
        // We use CSS class names like cjk_fallback, hangul_fallback and
        // brahmic_fallback. See ./unicodeScripts.js for the set of possible
        // script names

        var script = scriptFromCodepoint(this.text.charCodeAt(0));

        if (script) {
          this.classes.push(script + "_fallback");
        }

        if (/[îïíì]/.test(this.text)) {
          // add ī when we add Extended Latin
          this.text = iCombinations[this.text];
        }
      }

      hasClass(className) {
        return utils.contains(this.classes, className);
      }
      /**
       * Creates a text node or span from a symbol node. Note that a span is only
       * created if it is needed.
       */


      toNode() {
        var node = document.createTextNode(this.text);
        var span = null;

        if (this.italic > 0) {
          span = document.createElement("span");
          span.style.marginRight = makeEm(this.italic);
        }

        if (this.classes.length > 0) {
          span = span || document.createElement("span");
          span.className = createClass(this.classes);
        }

        for (var style in this.style) {
          if (this.style.hasOwnProperty(style)) {
            span = span || document.createElement("span"); // $FlowFixMe Flow doesn't seem to understand span.style's type.

            span.style[style] = this.style[style];
          }
        }

        if (span) {
          span.appendChild(node);
          return span;
        } else {
          return node;
        }
      }
      /**
       * Creates markup for a symbol node.
       */


      toMarkup() {
        // TODO(alpert): More duplication than I'd like from
        // span.prototype.toMarkup and symbolNode.prototype.toNode...
        var needsSpan = false;
        var markup = "<span";

        if (this.classes.length) {
          needsSpan = true;
          markup += " class=\"";
          markup += utils.escape(createClass(this.classes));
          markup += "\"";
        }

        var styles = "";

        if (this.italic > 0) {
          styles += "margin-right:" + this.italic + "em;";
        }

        for (var style in this.style) {
          if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
          }
        }

        if (styles) {
          needsSpan = true;
          markup += " style=\"" + utils.escape(styles) + "\"";
        }

        var escaped = utils.escape(this.text);

        if (needsSpan) {
          markup += ">";
          markup += escaped;
          markup += "</span>";
          return markup;
        } else {
          return escaped;
        }
      }

    }
    /**
     * SVG nodes are used to render stretchy wide elements.
     */

    class SvgNode {
      constructor(children, attributes) {
        this.children = void 0;
        this.attributes = void 0;
        this.children = children || [];
        this.attributes = attributes || {};
      }

      toNode() {
        var svgNS = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(svgNS, "svg"); // Apply attributes

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
          }
        }

        for (var i = 0; i < this.children.length; i++) {
          node.appendChild(this.children[i].toNode());
        }

        return node;
      }

      toMarkup() {
        var markup = "<svg xmlns=\"http://www.w3.org/2000/svg\""; // Apply attributes

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
          }
        }

        markup += ">";

        for (var i = 0; i < this.children.length; i++) {
          markup += this.children[i].toMarkup();
        }

        markup += "</svg>";
        return markup;
      }

    }
    class PathNode {
      constructor(pathName, alternate) {
        this.pathName = void 0;
        this.alternate = void 0;
        this.pathName = pathName;
        this.alternate = alternate; // Used only for \sqrt, \phase, & tall delims
      }

      toNode() {
        var svgNS = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(svgNS, "path");

        if (this.alternate) {
          node.setAttribute("d", this.alternate);
        } else {
          node.setAttribute("d", path[this.pathName]);
        }

        return node;
      }

      toMarkup() {
        if (this.alternate) {
          return "<path d=\"" + utils.escape(this.alternate) + "\"/>";
        } else {
          return "<path d=\"" + utils.escape(path[this.pathName]) + "\"/>";
        }
      }

    }
    class LineNode {
      constructor(attributes) {
        this.attributes = void 0;
        this.attributes = attributes || {};
      }

      toNode() {
        var svgNS = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(svgNS, "line"); // Apply attributes

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
          }
        }

        return node;
      }

      toMarkup() {
        var markup = "<line";

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
          }
        }

        markup += "/>";
        return markup;
      }

    }
    function assertSymbolDomNode(group) {
      if (group instanceof SymbolNode) {
        return group;
      } else {
        throw new Error("Expected symbolNode but got " + String(group) + ".");
      }
    }
    function assertSpan(group) {
      if (group instanceof Span) {
        return group;
      } else {
        throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
      }
    }

    /**
     * This file holds a list of all no-argument functions and single-character
     * symbols (like 'a' or ';').
     *
     * For each of the symbols, there are three properties they can have:
     * - font (required): the font to be used for this symbol. Either "main" (the
         normal font), or "ams" (the ams fonts).
     * - group (required): the ParseNode group type the symbol should have (i.e.
         "textord", "mathord", etc).
         See https://github.com/KaTeX/KaTeX/wiki/Examining-TeX#group-types
     * - replace: the character that this symbol or function should be
     *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
     *   character in the main font).
     *
     * The outermost map in the table indicates what mode the symbols should be
     * accepted in (e.g. "math" or "text").
     */
    // Some of these have a "-token" suffix since these are also used as `ParseNode`
    // types for raw text tokens, and we want to avoid conflicts with higher-level
    // `ParseNode` types. These `ParseNode`s are constructed within `Parser` by
    // looking up the `symbols` map.
    var ATOMS = {
      "bin": 1,
      "close": 1,
      "inner": 1,
      "open": 1,
      "punct": 1,
      "rel": 1
    };
    var NON_ATOMS = {
      "accent-token": 1,
      "mathord": 1,
      "op-token": 1,
      "spacing": 1,
      "textord": 1
    };
    var symbols = {
      "math": {},
      "text": {}
    };
    /** `acceptUnicodeChar = true` is only applicable if `replace` is set. */

    function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
      symbols[mode][name] = {
        font,
        group,
        replace
      };

      if (acceptUnicodeChar && replace) {
        symbols[mode][replace] = symbols[mode][name];
      }
    } // Some abbreviations for commonly used strings.
    // This helps minify the code, and also spotting typos using jshint.
    // modes:

    var math = "math";
    var text = "text"; // fonts:

    var main = "main";
    var ams = "ams"; // groups:

    var accent = "accent-token";
    var bin = "bin";
    var close = "close";
    var inner = "inner";
    var mathord = "mathord";
    var op = "op-token";
    var open = "open";
    var punct = "punct";
    var rel = "rel";
    var spacing = "spacing";
    var textord = "textord"; // Now comes the symbol table
    // Relation Symbols

    defineSymbol(math, main, rel, "\u2261", "\\equiv", true);
    defineSymbol(math, main, rel, "\u227a", "\\prec", true);
    defineSymbol(math, main, rel, "\u227b", "\\succ", true);
    defineSymbol(math, main, rel, "\u223c", "\\sim", true);
    defineSymbol(math, main, rel, "\u22a5", "\\perp");
    defineSymbol(math, main, rel, "\u2aaf", "\\preceq", true);
    defineSymbol(math, main, rel, "\u2ab0", "\\succeq", true);
    defineSymbol(math, main, rel, "\u2243", "\\simeq", true);
    defineSymbol(math, main, rel, "\u2223", "\\mid", true);
    defineSymbol(math, main, rel, "\u226a", "\\ll", true);
    defineSymbol(math, main, rel, "\u226b", "\\gg", true);
    defineSymbol(math, main, rel, "\u224d", "\\asymp", true);
    defineSymbol(math, main, rel, "\u2225", "\\parallel");
    defineSymbol(math, main, rel, "\u22c8", "\\bowtie", true);
    defineSymbol(math, main, rel, "\u2323", "\\smile", true);
    defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq", true);
    defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq", true);
    defineSymbol(math, main, rel, "\u2250", "\\doteq", true);
    defineSymbol(math, main, rel, "\u2322", "\\frown", true);
    defineSymbol(math, main, rel, "\u220b", "\\ni", true);
    defineSymbol(math, main, rel, "\u221d", "\\propto", true);
    defineSymbol(math, main, rel, "\u22a2", "\\vdash", true);
    defineSymbol(math, main, rel, "\u22a3", "\\dashv", true);
    defineSymbol(math, main, rel, "\u220b", "\\owns"); // Punctuation

    defineSymbol(math, main, punct, "\u002e", "\\ldotp");
    defineSymbol(math, main, punct, "\u22c5", "\\cdotp"); // Misc Symbols

    defineSymbol(math, main, textord, "\u0023", "\\#");
    defineSymbol(text, main, textord, "\u0023", "\\#");
    defineSymbol(math, main, textord, "\u0026", "\\&");
    defineSymbol(text, main, textord, "\u0026", "\\&");
    defineSymbol(math, main, textord, "\u2135", "\\aleph", true);
    defineSymbol(math, main, textord, "\u2200", "\\forall", true);
    defineSymbol(math, main, textord, "\u210f", "\\hbar", true);
    defineSymbol(math, main, textord, "\u2203", "\\exists", true);
    defineSymbol(math, main, textord, "\u2207", "\\nabla", true);
    defineSymbol(math, main, textord, "\u266d", "\\flat", true);
    defineSymbol(math, main, textord, "\u2113", "\\ell", true);
    defineSymbol(math, main, textord, "\u266e", "\\natural", true);
    defineSymbol(math, main, textord, "\u2663", "\\clubsuit", true);
    defineSymbol(math, main, textord, "\u2118", "\\wp", true);
    defineSymbol(math, main, textord, "\u266f", "\\sharp", true);
    defineSymbol(math, main, textord, "\u2662", "\\diamondsuit", true);
    defineSymbol(math, main, textord, "\u211c", "\\Re", true);
    defineSymbol(math, main, textord, "\u2661", "\\heartsuit", true);
    defineSymbol(math, main, textord, "\u2111", "\\Im", true);
    defineSymbol(math, main, textord, "\u2660", "\\spadesuit", true);
    defineSymbol(math, main, textord, "\u00a7", "\\S", true);
    defineSymbol(text, main, textord, "\u00a7", "\\S");
    defineSymbol(math, main, textord, "\u00b6", "\\P", true);
    defineSymbol(text, main, textord, "\u00b6", "\\P"); // Math and Text

    defineSymbol(math, main, textord, "\u2020", "\\dag");
    defineSymbol(text, main, textord, "\u2020", "\\dag");
    defineSymbol(text, main, textord, "\u2020", "\\textdagger");
    defineSymbol(math, main, textord, "\u2021", "\\ddag");
    defineSymbol(text, main, textord, "\u2021", "\\ddag");
    defineSymbol(text, main, textord, "\u2021", "\\textdaggerdbl"); // Large Delimiters

    defineSymbol(math, main, close, "\u23b1", "\\rmoustache", true);
    defineSymbol(math, main, open, "\u23b0", "\\lmoustache", true);
    defineSymbol(math, main, close, "\u27ef", "\\rgroup", true);
    defineSymbol(math, main, open, "\u27ee", "\\lgroup", true); // Binary Operators

    defineSymbol(math, main, bin, "\u2213", "\\mp", true);
    defineSymbol(math, main, bin, "\u2296", "\\ominus", true);
    defineSymbol(math, main, bin, "\u228e", "\\uplus", true);
    defineSymbol(math, main, bin, "\u2293", "\\sqcap", true);
    defineSymbol(math, main, bin, "\u2217", "\\ast");
    defineSymbol(math, main, bin, "\u2294", "\\sqcup", true);
    defineSymbol(math, main, bin, "\u25ef", "\\bigcirc", true);
    defineSymbol(math, main, bin, "\u2219", "\\bullet", true);
    defineSymbol(math, main, bin, "\u2021", "\\ddagger");
    defineSymbol(math, main, bin, "\u2240", "\\wr", true);
    defineSymbol(math, main, bin, "\u2a3f", "\\amalg");
    defineSymbol(math, main, bin, "\u0026", "\\And"); // from amsmath
    // Arrow Symbols

    defineSymbol(math, main, rel, "\u27f5", "\\longleftarrow", true);
    defineSymbol(math, main, rel, "\u21d0", "\\Leftarrow", true);
    defineSymbol(math, main, rel, "\u27f8", "\\Longleftarrow", true);
    defineSymbol(math, main, rel, "\u27f6", "\\longrightarrow", true);
    defineSymbol(math, main, rel, "\u21d2", "\\Rightarrow", true);
    defineSymbol(math, main, rel, "\u27f9", "\\Longrightarrow", true);
    defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow", true);
    defineSymbol(math, main, rel, "\u27f7", "\\longleftrightarrow", true);
    defineSymbol(math, main, rel, "\u21d4", "\\Leftrightarrow", true);
    defineSymbol(math, main, rel, "\u27fa", "\\Longleftrightarrow", true);
    defineSymbol(math, main, rel, "\u21a6", "\\mapsto", true);
    defineSymbol(math, main, rel, "\u27fc", "\\longmapsto", true);
    defineSymbol(math, main, rel, "\u2197", "\\nearrow", true);
    defineSymbol(math, main, rel, "\u21a9", "\\hookleftarrow", true);
    defineSymbol(math, main, rel, "\u21aa", "\\hookrightarrow", true);
    defineSymbol(math, main, rel, "\u2198", "\\searrow", true);
    defineSymbol(math, main, rel, "\u21bc", "\\leftharpoonup", true);
    defineSymbol(math, main, rel, "\u21c0", "\\rightharpoonup", true);
    defineSymbol(math, main, rel, "\u2199", "\\swarrow", true);
    defineSymbol(math, main, rel, "\u21bd", "\\leftharpoondown", true);
    defineSymbol(math, main, rel, "\u21c1", "\\rightharpoondown", true);
    defineSymbol(math, main, rel, "\u2196", "\\nwarrow", true);
    defineSymbol(math, main, rel, "\u21cc", "\\rightleftharpoons", true); // AMS Negated Binary Relations

    defineSymbol(math, ams, rel, "\u226e", "\\nless", true); // Symbol names preceded by "@" each have a corresponding macro.

    defineSymbol(math, ams, rel, "\ue010", "\\@nleqslant");
    defineSymbol(math, ams, rel, "\ue011", "\\@nleqq");
    defineSymbol(math, ams, rel, "\u2a87", "\\lneq", true);
    defineSymbol(math, ams, rel, "\u2268", "\\lneqq", true);
    defineSymbol(math, ams, rel, "\ue00c", "\\@lvertneqq");
    defineSymbol(math, ams, rel, "\u22e6", "\\lnsim", true);
    defineSymbol(math, ams, rel, "\u2a89", "\\lnapprox", true);
    defineSymbol(math, ams, rel, "\u2280", "\\nprec", true); // unicode-math maps \u22e0 to \npreccurlyeq. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u22e0", "\\npreceq", true);
    defineSymbol(math, ams, rel, "\u22e8", "\\precnsim", true);
    defineSymbol(math, ams, rel, "\u2ab9", "\\precnapprox", true);
    defineSymbol(math, ams, rel, "\u2241", "\\nsim", true);
    defineSymbol(math, ams, rel, "\ue006", "\\@nshortmid");
    defineSymbol(math, ams, rel, "\u2224", "\\nmid", true);
    defineSymbol(math, ams, rel, "\u22ac", "\\nvdash", true);
    defineSymbol(math, ams, rel, "\u22ad", "\\nvDash", true);
    defineSymbol(math, ams, rel, "\u22ea", "\\ntriangleleft");
    defineSymbol(math, ams, rel, "\u22ec", "\\ntrianglelefteq", true);
    defineSymbol(math, ams, rel, "\u228a", "\\subsetneq", true);
    defineSymbol(math, ams, rel, "\ue01a", "\\@varsubsetneq");
    defineSymbol(math, ams, rel, "\u2acb", "\\subsetneqq", true);
    defineSymbol(math, ams, rel, "\ue017", "\\@varsubsetneqq");
    defineSymbol(math, ams, rel, "\u226f", "\\ngtr", true);
    defineSymbol(math, ams, rel, "\ue00f", "\\@ngeqslant");
    defineSymbol(math, ams, rel, "\ue00e", "\\@ngeqq");
    defineSymbol(math, ams, rel, "\u2a88", "\\gneq", true);
    defineSymbol(math, ams, rel, "\u2269", "\\gneqq", true);
    defineSymbol(math, ams, rel, "\ue00d", "\\@gvertneqq");
    defineSymbol(math, ams, rel, "\u22e7", "\\gnsim", true);
    defineSymbol(math, ams, rel, "\u2a8a", "\\gnapprox", true);
    defineSymbol(math, ams, rel, "\u2281", "\\nsucc", true); // unicode-math maps \u22e1 to \nsucccurlyeq. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u22e1", "\\nsucceq", true);
    defineSymbol(math, ams, rel, "\u22e9", "\\succnsim", true);
    defineSymbol(math, ams, rel, "\u2aba", "\\succnapprox", true); // unicode-math maps \u2246 to \simneqq. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u2246", "\\ncong", true);
    defineSymbol(math, ams, rel, "\ue007", "\\@nshortparallel");
    defineSymbol(math, ams, rel, "\u2226", "\\nparallel", true);
    defineSymbol(math, ams, rel, "\u22af", "\\nVDash", true);
    defineSymbol(math, ams, rel, "\u22eb", "\\ntriangleright");
    defineSymbol(math, ams, rel, "\u22ed", "\\ntrianglerighteq", true);
    defineSymbol(math, ams, rel, "\ue018", "\\@nsupseteqq");
    defineSymbol(math, ams, rel, "\u228b", "\\supsetneq", true);
    defineSymbol(math, ams, rel, "\ue01b", "\\@varsupsetneq");
    defineSymbol(math, ams, rel, "\u2acc", "\\supsetneqq", true);
    defineSymbol(math, ams, rel, "\ue019", "\\@varsupsetneqq");
    defineSymbol(math, ams, rel, "\u22ae", "\\nVdash", true);
    defineSymbol(math, ams, rel, "\u2ab5", "\\precneqq", true);
    defineSymbol(math, ams, rel, "\u2ab6", "\\succneqq", true);
    defineSymbol(math, ams, rel, "\ue016", "\\@nsubseteqq");
    defineSymbol(math, ams, bin, "\u22b4", "\\unlhd");
    defineSymbol(math, ams, bin, "\u22b5", "\\unrhd"); // AMS Negated Arrows

    defineSymbol(math, ams, rel, "\u219a", "\\nleftarrow", true);
    defineSymbol(math, ams, rel, "\u219b", "\\nrightarrow", true);
    defineSymbol(math, ams, rel, "\u21cd", "\\nLeftarrow", true);
    defineSymbol(math, ams, rel, "\u21cf", "\\nRightarrow", true);
    defineSymbol(math, ams, rel, "\u21ae", "\\nleftrightarrow", true);
    defineSymbol(math, ams, rel, "\u21ce", "\\nLeftrightarrow", true); // AMS Misc

    defineSymbol(math, ams, rel, "\u25b3", "\\vartriangle");
    defineSymbol(math, ams, textord, "\u210f", "\\hslash");
    defineSymbol(math, ams, textord, "\u25bd", "\\triangledown");
    defineSymbol(math, ams, textord, "\u25ca", "\\lozenge");
    defineSymbol(math, ams, textord, "\u24c8", "\\circledS");
    defineSymbol(math, ams, textord, "\u00ae", "\\circledR");
    defineSymbol(text, ams, textord, "\u00ae", "\\circledR");
    defineSymbol(math, ams, textord, "\u2221", "\\measuredangle", true);
    defineSymbol(math, ams, textord, "\u2204", "\\nexists");
    defineSymbol(math, ams, textord, "\u2127", "\\mho");
    defineSymbol(math, ams, textord, "\u2132", "\\Finv", true);
    defineSymbol(math, ams, textord, "\u2141", "\\Game", true);
    defineSymbol(math, ams, textord, "\u2035", "\\backprime");
    defineSymbol(math, ams, textord, "\u25b2", "\\blacktriangle");
    defineSymbol(math, ams, textord, "\u25bc", "\\blacktriangledown");
    defineSymbol(math, ams, textord, "\u25a0", "\\blacksquare");
    defineSymbol(math, ams, textord, "\u29eb", "\\blacklozenge");
    defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
    defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle", true);
    defineSymbol(math, ams, textord, "\u2201", "\\complement", true); // unicode-math maps U+F0 to \matheth. We map to AMS function \eth

    defineSymbol(math, ams, textord, "\u00f0", "\\eth", true);
    defineSymbol(text, main, textord, "\u00f0", "\u00f0");
    defineSymbol(math, ams, textord, "\u2571", "\\diagup");
    defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
    defineSymbol(math, ams, textord, "\u25a1", "\\square");
    defineSymbol(math, ams, textord, "\u25a1", "\\Box");
    defineSymbol(math, ams, textord, "\u25ca", "\\Diamond"); // unicode-math maps U+A5 to \mathyen. We map to AMS function \yen

    defineSymbol(math, ams, textord, "\u00a5", "\\yen", true);
    defineSymbol(text, ams, textord, "\u00a5", "\\yen", true);
    defineSymbol(math, ams, textord, "\u2713", "\\checkmark", true);
    defineSymbol(text, ams, textord, "\u2713", "\\checkmark"); // AMS Hebrew

    defineSymbol(math, ams, textord, "\u2136", "\\beth", true);
    defineSymbol(math, ams, textord, "\u2138", "\\daleth", true);
    defineSymbol(math, ams, textord, "\u2137", "\\gimel", true); // AMS Greek

    defineSymbol(math, ams, textord, "\u03dd", "\\digamma", true);
    defineSymbol(math, ams, textord, "\u03f0", "\\varkappa"); // AMS Delimiters

    defineSymbol(math, ams, open, "\u250c", "\\@ulcorner", true);
    defineSymbol(math, ams, close, "\u2510", "\\@urcorner", true);
    defineSymbol(math, ams, open, "\u2514", "\\@llcorner", true);
    defineSymbol(math, ams, close, "\u2518", "\\@lrcorner", true); // AMS Binary Relations

    defineSymbol(math, ams, rel, "\u2266", "\\leqq", true);
    defineSymbol(math, ams, rel, "\u2a7d", "\\leqslant", true);
    defineSymbol(math, ams, rel, "\u2a95", "\\eqslantless", true);
    defineSymbol(math, ams, rel, "\u2272", "\\lesssim", true);
    defineSymbol(math, ams, rel, "\u2a85", "\\lessapprox", true);
    defineSymbol(math, ams, rel, "\u224a", "\\approxeq", true);
    defineSymbol(math, ams, bin, "\u22d6", "\\lessdot");
    defineSymbol(math, ams, rel, "\u22d8", "\\lll", true);
    defineSymbol(math, ams, rel, "\u2276", "\\lessgtr", true);
    defineSymbol(math, ams, rel, "\u22da", "\\lesseqgtr", true);
    defineSymbol(math, ams, rel, "\u2a8b", "\\lesseqqgtr", true);
    defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
    defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq", true);
    defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq", true);
    defineSymbol(math, ams, rel, "\u223d", "\\backsim", true);
    defineSymbol(math, ams, rel, "\u22cd", "\\backsimeq", true);
    defineSymbol(math, ams, rel, "\u2ac5", "\\subseteqq", true);
    defineSymbol(math, ams, rel, "\u22d0", "\\Subset", true);
    defineSymbol(math, ams, rel, "\u228f", "\\sqsubset", true);
    defineSymbol(math, ams, rel, "\u227c", "\\preccurlyeq", true);
    defineSymbol(math, ams, rel, "\u22de", "\\curlyeqprec", true);
    defineSymbol(math, ams, rel, "\u227e", "\\precsim", true);
    defineSymbol(math, ams, rel, "\u2ab7", "\\precapprox", true);
    defineSymbol(math, ams, rel, "\u22b2", "\\vartriangleleft");
    defineSymbol(math, ams, rel, "\u22b4", "\\trianglelefteq");
    defineSymbol(math, ams, rel, "\u22a8", "\\vDash", true);
    defineSymbol(math, ams, rel, "\u22aa", "\\Vvdash", true);
    defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
    defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
    defineSymbol(math, ams, rel, "\u224f", "\\bumpeq", true);
    defineSymbol(math, ams, rel, "\u224e", "\\Bumpeq", true);
    defineSymbol(math, ams, rel, "\u2267", "\\geqq", true);
    defineSymbol(math, ams, rel, "\u2a7e", "\\geqslant", true);
    defineSymbol(math, ams, rel, "\u2a96", "\\eqslantgtr", true);
    defineSymbol(math, ams, rel, "\u2273", "\\gtrsim", true);
    defineSymbol(math, ams, rel, "\u2a86", "\\gtrapprox", true);
    defineSymbol(math, ams, bin, "\u22d7", "\\gtrdot");
    defineSymbol(math, ams, rel, "\u22d9", "\\ggg", true);
    defineSymbol(math, ams, rel, "\u2277", "\\gtrless", true);
    defineSymbol(math, ams, rel, "\u22db", "\\gtreqless", true);
    defineSymbol(math, ams, rel, "\u2a8c", "\\gtreqqless", true);
    defineSymbol(math, ams, rel, "\u2256", "\\eqcirc", true);
    defineSymbol(math, ams, rel, "\u2257", "\\circeq", true);
    defineSymbol(math, ams, rel, "\u225c", "\\triangleq", true);
    defineSymbol(math, ams, rel, "\u223c", "\\thicksim");
    defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
    defineSymbol(math, ams, rel, "\u2ac6", "\\supseteqq", true);
    defineSymbol(math, ams, rel, "\u22d1", "\\Supset", true);
    defineSymbol(math, ams, rel, "\u2290", "\\sqsupset", true);
    defineSymbol(math, ams, rel, "\u227d", "\\succcurlyeq", true);
    defineSymbol(math, ams, rel, "\u22df", "\\curlyeqsucc", true);
    defineSymbol(math, ams, rel, "\u227f", "\\succsim", true);
    defineSymbol(math, ams, rel, "\u2ab8", "\\succapprox", true);
    defineSymbol(math, ams, rel, "\u22b3", "\\vartriangleright");
    defineSymbol(math, ams, rel, "\u22b5", "\\trianglerighteq");
    defineSymbol(math, ams, rel, "\u22a9", "\\Vdash", true);
    defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
    defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
    defineSymbol(math, ams, rel, "\u226c", "\\between", true);
    defineSymbol(math, ams, rel, "\u22d4", "\\pitchfork", true);
    defineSymbol(math, ams, rel, "\u221d", "\\varpropto");
    defineSymbol(math, ams, rel, "\u25c0", "\\blacktriangleleft"); // unicode-math says that \therefore is a mathord atom.
    // We kept the amssymb atom type, which is rel.

    defineSymbol(math, ams, rel, "\u2234", "\\therefore", true);
    defineSymbol(math, ams, rel, "\u220d", "\\backepsilon");
    defineSymbol(math, ams, rel, "\u25b6", "\\blacktriangleright"); // unicode-math says that \because is a mathord atom.
    // We kept the amssymb atom type, which is rel.

    defineSymbol(math, ams, rel, "\u2235", "\\because", true);
    defineSymbol(math, ams, rel, "\u22d8", "\\llless");
    defineSymbol(math, ams, rel, "\u22d9", "\\gggtr");
    defineSymbol(math, ams, bin, "\u22b2", "\\lhd");
    defineSymbol(math, ams, bin, "\u22b3", "\\rhd");
    defineSymbol(math, ams, rel, "\u2242", "\\eqsim", true);
    defineSymbol(math, main, rel, "\u22c8", "\\Join");
    defineSymbol(math, ams, rel, "\u2251", "\\Doteq", true); // AMS Binary Operators

    defineSymbol(math, ams, bin, "\u2214", "\\dotplus", true);
    defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
    defineSymbol(math, ams, bin, "\u22d2", "\\Cap", true);
    defineSymbol(math, ams, bin, "\u22d3", "\\Cup", true);
    defineSymbol(math, ams, bin, "\u2a5e", "\\doublebarwedge", true);
    defineSymbol(math, ams, bin, "\u229f", "\\boxminus", true);
    defineSymbol(math, ams, bin, "\u229e", "\\boxplus", true);
    defineSymbol(math, ams, bin, "\u22c7", "\\divideontimes", true);
    defineSymbol(math, ams, bin, "\u22c9", "\\ltimes", true);
    defineSymbol(math, ams, bin, "\u22ca", "\\rtimes", true);
    defineSymbol(math, ams, bin, "\u22cb", "\\leftthreetimes", true);
    defineSymbol(math, ams, bin, "\u22cc", "\\rightthreetimes", true);
    defineSymbol(math, ams, bin, "\u22cf", "\\curlywedge", true);
    defineSymbol(math, ams, bin, "\u22ce", "\\curlyvee", true);
    defineSymbol(math, ams, bin, "\u229d", "\\circleddash", true);
    defineSymbol(math, ams, bin, "\u229b", "\\circledast", true);
    defineSymbol(math, ams, bin, "\u22c5", "\\centerdot");
    defineSymbol(math, ams, bin, "\u22ba", "\\intercal", true);
    defineSymbol(math, ams, bin, "\u22d2", "\\doublecap");
    defineSymbol(math, ams, bin, "\u22d3", "\\doublecup");
    defineSymbol(math, ams, bin, "\u22a0", "\\boxtimes", true); // AMS Arrows
    // Note: unicode-math maps \u21e2 to their own function \rightdasharrow.
    // We'll map it to AMS function \dashrightarrow. It produces the same atom.

    defineSymbol(math, ams, rel, "\u21e2", "\\dashrightarrow", true); // unicode-math maps \u21e0 to \leftdasharrow. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u21e0", "\\dashleftarrow", true);
    defineSymbol(math, ams, rel, "\u21c7", "\\leftleftarrows", true);
    defineSymbol(math, ams, rel, "\u21c6", "\\leftrightarrows", true);
    defineSymbol(math, ams, rel, "\u21da", "\\Lleftarrow", true);
    defineSymbol(math, ams, rel, "\u219e", "\\twoheadleftarrow", true);
    defineSymbol(math, ams, rel, "\u21a2", "\\leftarrowtail", true);
    defineSymbol(math, ams, rel, "\u21ab", "\\looparrowleft", true);
    defineSymbol(math, ams, rel, "\u21cb", "\\leftrightharpoons", true);
    defineSymbol(math, ams, rel, "\u21b6", "\\curvearrowleft", true); // unicode-math maps \u21ba to \acwopencirclearrow. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u21ba", "\\circlearrowleft", true);
    defineSymbol(math, ams, rel, "\u21b0", "\\Lsh", true);
    defineSymbol(math, ams, rel, "\u21c8", "\\upuparrows", true);
    defineSymbol(math, ams, rel, "\u21bf", "\\upharpoonleft", true);
    defineSymbol(math, ams, rel, "\u21c3", "\\downharpoonleft", true);
    defineSymbol(math, main, rel, "\u22b6", "\\origof", true); // not in font

    defineSymbol(math, main, rel, "\u22b7", "\\imageof", true); // not in font

    defineSymbol(math, ams, rel, "\u22b8", "\\multimap", true);
    defineSymbol(math, ams, rel, "\u21ad", "\\leftrightsquigarrow", true);
    defineSymbol(math, ams, rel, "\u21c9", "\\rightrightarrows", true);
    defineSymbol(math, ams, rel, "\u21c4", "\\rightleftarrows", true);
    defineSymbol(math, ams, rel, "\u21a0", "\\twoheadrightarrow", true);
    defineSymbol(math, ams, rel, "\u21a3", "\\rightarrowtail", true);
    defineSymbol(math, ams, rel, "\u21ac", "\\looparrowright", true);
    defineSymbol(math, ams, rel, "\u21b7", "\\curvearrowright", true); // unicode-math maps \u21bb to \cwopencirclearrow. We'll use the AMS synonym.

    defineSymbol(math, ams, rel, "\u21bb", "\\circlearrowright", true);
    defineSymbol(math, ams, rel, "\u21b1", "\\Rsh", true);
    defineSymbol(math, ams, rel, "\u21ca", "\\downdownarrows", true);
    defineSymbol(math, ams, rel, "\u21be", "\\upharpoonright", true);
    defineSymbol(math, ams, rel, "\u21c2", "\\downharpoonright", true);
    defineSymbol(math, ams, rel, "\u21dd", "\\rightsquigarrow", true);
    defineSymbol(math, ams, rel, "\u21dd", "\\leadsto");
    defineSymbol(math, ams, rel, "\u21db", "\\Rrightarrow", true);
    defineSymbol(math, ams, rel, "\u21be", "\\restriction");
    defineSymbol(math, main, textord, "\u2018", "`");
    defineSymbol(math, main, textord, "$", "\\$");
    defineSymbol(text, main, textord, "$", "\\$");
    defineSymbol(text, main, textord, "$", "\\textdollar");
    defineSymbol(math, main, textord, "%", "\\%");
    defineSymbol(text, main, textord, "%", "\\%");
    defineSymbol(math, main, textord, "_", "\\_");
    defineSymbol(text, main, textord, "_", "\\_");
    defineSymbol(text, main, textord, "_", "\\textunderscore");
    defineSymbol(math, main, textord, "\u2220", "\\angle", true);
    defineSymbol(math, main, textord, "\u221e", "\\infty", true);
    defineSymbol(math, main, textord, "\u2032", "\\prime");
    defineSymbol(math, main, textord, "\u25b3", "\\triangle");
    defineSymbol(math, main, textord, "\u0393", "\\Gamma", true);
    defineSymbol(math, main, textord, "\u0394", "\\Delta", true);
    defineSymbol(math, main, textord, "\u0398", "\\Theta", true);
    defineSymbol(math, main, textord, "\u039b", "\\Lambda", true);
    defineSymbol(math, main, textord, "\u039e", "\\Xi", true);
    defineSymbol(math, main, textord, "\u03a0", "\\Pi", true);
    defineSymbol(math, main, textord, "\u03a3", "\\Sigma", true);
    defineSymbol(math, main, textord, "\u03a5", "\\Upsilon", true);
    defineSymbol(math, main, textord, "\u03a6", "\\Phi", true);
    defineSymbol(math, main, textord, "\u03a8", "\\Psi", true);
    defineSymbol(math, main, textord, "\u03a9", "\\Omega", true);
    defineSymbol(math, main, textord, "A", "\u0391");
    defineSymbol(math, main, textord, "B", "\u0392");
    defineSymbol(math, main, textord, "E", "\u0395");
    defineSymbol(math, main, textord, "Z", "\u0396");
    defineSymbol(math, main, textord, "H", "\u0397");
    defineSymbol(math, main, textord, "I", "\u0399");
    defineSymbol(math, main, textord, "K", "\u039A");
    defineSymbol(math, main, textord, "M", "\u039C");
    defineSymbol(math, main, textord, "N", "\u039D");
    defineSymbol(math, main, textord, "O", "\u039F");
    defineSymbol(math, main, textord, "P", "\u03A1");
    defineSymbol(math, main, textord, "T", "\u03A4");
    defineSymbol(math, main, textord, "X", "\u03A7");
    defineSymbol(math, main, textord, "\u00ac", "\\neg", true);
    defineSymbol(math, main, textord, "\u00ac", "\\lnot");
    defineSymbol(math, main, textord, "\u22a4", "\\top");
    defineSymbol(math, main, textord, "\u22a5", "\\bot");
    defineSymbol(math, main, textord, "\u2205", "\\emptyset");
    defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
    defineSymbol(math, main, mathord, "\u03b1", "\\alpha", true);
    defineSymbol(math, main, mathord, "\u03b2", "\\beta", true);
    defineSymbol(math, main, mathord, "\u03b3", "\\gamma", true);
    defineSymbol(math, main, mathord, "\u03b4", "\\delta", true);
    defineSymbol(math, main, mathord, "\u03f5", "\\epsilon", true);
    defineSymbol(math, main, mathord, "\u03b6", "\\zeta", true);
    defineSymbol(math, main, mathord, "\u03b7", "\\eta", true);
    defineSymbol(math, main, mathord, "\u03b8", "\\theta", true);
    defineSymbol(math, main, mathord, "\u03b9", "\\iota", true);
    defineSymbol(math, main, mathord, "\u03ba", "\\kappa", true);
    defineSymbol(math, main, mathord, "\u03bb", "\\lambda", true);
    defineSymbol(math, main, mathord, "\u03bc", "\\mu", true);
    defineSymbol(math, main, mathord, "\u03bd", "\\nu", true);
    defineSymbol(math, main, mathord, "\u03be", "\\xi", true);
    defineSymbol(math, main, mathord, "\u03bf", "\\omicron", true);
    defineSymbol(math, main, mathord, "\u03c0", "\\pi", true);
    defineSymbol(math, main, mathord, "\u03c1", "\\rho", true);
    defineSymbol(math, main, mathord, "\u03c3", "\\sigma", true);
    defineSymbol(math, main, mathord, "\u03c4", "\\tau", true);
    defineSymbol(math, main, mathord, "\u03c5", "\\upsilon", true);
    defineSymbol(math, main, mathord, "\u03d5", "\\phi", true);
    defineSymbol(math, main, mathord, "\u03c7", "\\chi", true);
    defineSymbol(math, main, mathord, "\u03c8", "\\psi", true);
    defineSymbol(math, main, mathord, "\u03c9", "\\omega", true);
    defineSymbol(math, main, mathord, "\u03b5", "\\varepsilon", true);
    defineSymbol(math, main, mathord, "\u03d1", "\\vartheta", true);
    defineSymbol(math, main, mathord, "\u03d6", "\\varpi", true);
    defineSymbol(math, main, mathord, "\u03f1", "\\varrho", true);
    defineSymbol(math, main, mathord, "\u03c2", "\\varsigma", true);
    defineSymbol(math, main, mathord, "\u03c6", "\\varphi", true);
    defineSymbol(math, main, bin, "\u2217", "*", true);
    defineSymbol(math, main, bin, "+", "+");
    defineSymbol(math, main, bin, "\u2212", "-", true);
    defineSymbol(math, main, bin, "\u22c5", "\\cdot", true);
    defineSymbol(math, main, bin, "\u2218", "\\circ", true);
    defineSymbol(math, main, bin, "\u00f7", "\\div", true);
    defineSymbol(math, main, bin, "\u00b1", "\\pm", true);
    defineSymbol(math, main, bin, "\u00d7", "\\times", true);
    defineSymbol(math, main, bin, "\u2229", "\\cap", true);
    defineSymbol(math, main, bin, "\u222a", "\\cup", true);
    defineSymbol(math, main, bin, "\u2216", "\\setminus", true);
    defineSymbol(math, main, bin, "\u2227", "\\land");
    defineSymbol(math, main, bin, "\u2228", "\\lor");
    defineSymbol(math, main, bin, "\u2227", "\\wedge", true);
    defineSymbol(math, main, bin, "\u2228", "\\vee", true);
    defineSymbol(math, main, textord, "\u221a", "\\surd");
    defineSymbol(math, main, open, "\u27e8", "\\langle", true);
    defineSymbol(math, main, open, "\u2223", "\\lvert");
    defineSymbol(math, main, open, "\u2225", "\\lVert");
    defineSymbol(math, main, close, "?", "?");
    defineSymbol(math, main, close, "!", "!");
    defineSymbol(math, main, close, "\u27e9", "\\rangle", true);
    defineSymbol(math, main, close, "\u2223", "\\rvert");
    defineSymbol(math, main, close, "\u2225", "\\rVert");
    defineSymbol(math, main, rel, "=", "=");
    defineSymbol(math, main, rel, ":", ":");
    defineSymbol(math, main, rel, "\u2248", "\\approx", true);
    defineSymbol(math, main, rel, "\u2245", "\\cong", true);
    defineSymbol(math, main, rel, "\u2265", "\\ge");
    defineSymbol(math, main, rel, "\u2265", "\\geq", true);
    defineSymbol(math, main, rel, "\u2190", "\\gets");
    defineSymbol(math, main, rel, ">", "\\gt", true);
    defineSymbol(math, main, rel, "\u2208", "\\in", true);
    defineSymbol(math, main, rel, "\ue020", "\\@not");
    defineSymbol(math, main, rel, "\u2282", "\\subset", true);
    defineSymbol(math, main, rel, "\u2283", "\\supset", true);
    defineSymbol(math, main, rel, "\u2286", "\\subseteq", true);
    defineSymbol(math, main, rel, "\u2287", "\\supseteq", true);
    defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq", true);
    defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq", true);
    defineSymbol(math, main, rel, "\u22a8", "\\models");
    defineSymbol(math, main, rel, "\u2190", "\\leftarrow", true);
    defineSymbol(math, main, rel, "\u2264", "\\le");
    defineSymbol(math, main, rel, "\u2264", "\\leq", true);
    defineSymbol(math, main, rel, "<", "\\lt", true);
    defineSymbol(math, main, rel, "\u2192", "\\rightarrow", true);
    defineSymbol(math, main, rel, "\u2192", "\\to");
    defineSymbol(math, ams, rel, "\u2271", "\\ngeq", true);
    defineSymbol(math, ams, rel, "\u2270", "\\nleq", true);
    defineSymbol(math, main, spacing, "\u00a0", "\\ ");
    defineSymbol(math, main, spacing, "\u00a0", "\\space"); // Ref: LaTeX Source 2e: \DeclareRobustCommand{\nobreakspace}{%

    defineSymbol(math, main, spacing, "\u00a0", "\\nobreakspace");
    defineSymbol(text, main, spacing, "\u00a0", "\\ ");
    defineSymbol(text, main, spacing, "\u00a0", " ");
    defineSymbol(text, main, spacing, "\u00a0", "\\space");
    defineSymbol(text, main, spacing, "\u00a0", "\\nobreakspace");
    defineSymbol(math, main, spacing, null, "\\nobreak");
    defineSymbol(math, main, spacing, null, "\\allowbreak");
    defineSymbol(math, main, punct, ",", ",");
    defineSymbol(math, main, punct, ";", ";");
    defineSymbol(math, ams, bin, "\u22bc", "\\barwedge", true);
    defineSymbol(math, ams, bin, "\u22bb", "\\veebar", true);
    defineSymbol(math, main, bin, "\u2299", "\\odot", true);
    defineSymbol(math, main, bin, "\u2295", "\\oplus", true);
    defineSymbol(math, main, bin, "\u2297", "\\otimes", true);
    defineSymbol(math, main, textord, "\u2202", "\\partial", true);
    defineSymbol(math, main, bin, "\u2298", "\\oslash", true);
    defineSymbol(math, ams, bin, "\u229a", "\\circledcirc", true);
    defineSymbol(math, ams, bin, "\u22a1", "\\boxdot", true);
    defineSymbol(math, main, bin, "\u25b3", "\\bigtriangleup");
    defineSymbol(math, main, bin, "\u25bd", "\\bigtriangledown");
    defineSymbol(math, main, bin, "\u2020", "\\dagger");
    defineSymbol(math, main, bin, "\u22c4", "\\diamond");
    defineSymbol(math, main, bin, "\u22c6", "\\star");
    defineSymbol(math, main, bin, "\u25c3", "\\triangleleft");
    defineSymbol(math, main, bin, "\u25b9", "\\triangleright");
    defineSymbol(math, main, open, "{", "\\{");
    defineSymbol(text, main, textord, "{", "\\{");
    defineSymbol(text, main, textord, "{", "\\textbraceleft");
    defineSymbol(math, main, close, "}", "\\}");
    defineSymbol(text, main, textord, "}", "\\}");
    defineSymbol(text, main, textord, "}", "\\textbraceright");
    defineSymbol(math, main, open, "{", "\\lbrace");
    defineSymbol(math, main, close, "}", "\\rbrace");
    defineSymbol(math, main, open, "[", "\\lbrack", true);
    defineSymbol(text, main, textord, "[", "\\lbrack", true);
    defineSymbol(math, main, close, "]", "\\rbrack", true);
    defineSymbol(text, main, textord, "]", "\\rbrack", true);
    defineSymbol(math, main, open, "(", "\\lparen", true);
    defineSymbol(math, main, close, ")", "\\rparen", true);
    defineSymbol(text, main, textord, "<", "\\textless", true); // in T1 fontenc

    defineSymbol(text, main, textord, ">", "\\textgreater", true); // in T1 fontenc

    defineSymbol(math, main, open, "\u230a", "\\lfloor", true);
    defineSymbol(math, main, close, "\u230b", "\\rfloor", true);
    defineSymbol(math, main, open, "\u2308", "\\lceil", true);
    defineSymbol(math, main, close, "\u2309", "\\rceil", true);
    defineSymbol(math, main, textord, "\\", "\\backslash");
    defineSymbol(math, main, textord, "\u2223", "|");
    defineSymbol(math, main, textord, "\u2223", "\\vert");
    defineSymbol(text, main, textord, "|", "\\textbar", true); // in T1 fontenc

    defineSymbol(math, main, textord, "\u2225", "\\|");
    defineSymbol(math, main, textord, "\u2225", "\\Vert");
    defineSymbol(text, main, textord, "\u2225", "\\textbardbl");
    defineSymbol(text, main, textord, "~", "\\textasciitilde");
    defineSymbol(text, main, textord, "\\", "\\textbackslash");
    defineSymbol(text, main, textord, "^", "\\textasciicircum");
    defineSymbol(math, main, rel, "\u2191", "\\uparrow", true);
    defineSymbol(math, main, rel, "\u21d1", "\\Uparrow", true);
    defineSymbol(math, main, rel, "\u2193", "\\downarrow", true);
    defineSymbol(math, main, rel, "\u21d3", "\\Downarrow", true);
    defineSymbol(math, main, rel, "\u2195", "\\updownarrow", true);
    defineSymbol(math, main, rel, "\u21d5", "\\Updownarrow", true);
    defineSymbol(math, main, op, "\u2210", "\\coprod");
    defineSymbol(math, main, op, "\u22c1", "\\bigvee");
    defineSymbol(math, main, op, "\u22c0", "\\bigwedge");
    defineSymbol(math, main, op, "\u2a04", "\\biguplus");
    defineSymbol(math, main, op, "\u22c2", "\\bigcap");
    defineSymbol(math, main, op, "\u22c3", "\\bigcup");
    defineSymbol(math, main, op, "\u222b", "\\int");
    defineSymbol(math, main, op, "\u222b", "\\intop");
    defineSymbol(math, main, op, "\u222c", "\\iint");
    defineSymbol(math, main, op, "\u222d", "\\iiint");
    defineSymbol(math, main, op, "\u220f", "\\prod");
    defineSymbol(math, main, op, "\u2211", "\\sum");
    defineSymbol(math, main, op, "\u2a02", "\\bigotimes");
    defineSymbol(math, main, op, "\u2a01", "\\bigoplus");
    defineSymbol(math, main, op, "\u2a00", "\\bigodot");
    defineSymbol(math, main, op, "\u222e", "\\oint");
    defineSymbol(math, main, op, "\u222f", "\\oiint");
    defineSymbol(math, main, op, "\u2230", "\\oiiint");
    defineSymbol(math, main, op, "\u2a06", "\\bigsqcup");
    defineSymbol(math, main, op, "\u222b", "\\smallint");
    defineSymbol(text, main, inner, "\u2026", "\\textellipsis");
    defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
    defineSymbol(text, main, inner, "\u2026", "\\ldots", true);
    defineSymbol(math, main, inner, "\u2026", "\\ldots", true);
    defineSymbol(math, main, inner, "\u22ef", "\\@cdots", true);
    defineSymbol(math, main, inner, "\u22f1", "\\ddots", true);
    defineSymbol(math, main, textord, "\u22ee", "\\varvdots"); // \vdots is a macro

    defineSymbol(math, main, accent, "\u02ca", "\\acute");
    defineSymbol(math, main, accent, "\u02cb", "\\grave");
    defineSymbol(math, main, accent, "\u00a8", "\\ddot");
    defineSymbol(math, main, accent, "\u007e", "\\tilde");
    defineSymbol(math, main, accent, "\u02c9", "\\bar");
    defineSymbol(math, main, accent, "\u02d8", "\\breve");
    defineSymbol(math, main, accent, "\u02c7", "\\check");
    defineSymbol(math, main, accent, "\u005e", "\\hat");
    defineSymbol(math, main, accent, "\u20d7", "\\vec");
    defineSymbol(math, main, accent, "\u02d9", "\\dot");
    defineSymbol(math, main, accent, "\u02da", "\\mathring"); // \imath and \jmath should be invariant to \mathrm, \mathbf, etc., so use PUA

    defineSymbol(math, main, mathord, "\ue131", "\\@imath");
    defineSymbol(math, main, mathord, "\ue237", "\\@jmath");
    defineSymbol(math, main, textord, "\u0131", "\u0131");
    defineSymbol(math, main, textord, "\u0237", "\u0237");
    defineSymbol(text, main, textord, "\u0131", "\\i", true);
    defineSymbol(text, main, textord, "\u0237", "\\j", true);
    defineSymbol(text, main, textord, "\u00df", "\\ss", true);
    defineSymbol(text, main, textord, "\u00e6", "\\ae", true);
    defineSymbol(text, main, textord, "\u0153", "\\oe", true);
    defineSymbol(text, main, textord, "\u00f8", "\\o", true);
    defineSymbol(text, main, textord, "\u00c6", "\\AE", true);
    defineSymbol(text, main, textord, "\u0152", "\\OE", true);
    defineSymbol(text, main, textord, "\u00d8", "\\O", true);
    defineSymbol(text, main, accent, "\u02ca", "\\'"); // acute

    defineSymbol(text, main, accent, "\u02cb", "\\`"); // grave

    defineSymbol(text, main, accent, "\u02c6", "\\^"); // circumflex

    defineSymbol(text, main, accent, "\u02dc", "\\~"); // tilde

    defineSymbol(text, main, accent, "\u02c9", "\\="); // macron

    defineSymbol(text, main, accent, "\u02d8", "\\u"); // breve

    defineSymbol(text, main, accent, "\u02d9", "\\."); // dot above

    defineSymbol(text, main, accent, "\u00b8", "\\c"); // cedilla

    defineSymbol(text, main, accent, "\u02da", "\\r"); // ring above

    defineSymbol(text, main, accent, "\u02c7", "\\v"); // caron

    defineSymbol(text, main, accent, "\u00a8", '\\"'); // diaresis

    defineSymbol(text, main, accent, "\u02dd", "\\H"); // double acute

    defineSymbol(text, main, accent, "\u25ef", "\\textcircled"); // \bigcirc glyph
    // These ligatures are detected and created in Parser.js's `formLigatures`.

    var ligatures = {
      "--": true,
      "---": true,
      "``": true,
      "''": true
    };
    defineSymbol(text, main, textord, "\u2013", "--", true);
    defineSymbol(text, main, textord, "\u2013", "\\textendash");
    defineSymbol(text, main, textord, "\u2014", "---", true);
    defineSymbol(text, main, textord, "\u2014", "\\textemdash");
    defineSymbol(text, main, textord, "\u2018", "`", true);
    defineSymbol(text, main, textord, "\u2018", "\\textquoteleft");
    defineSymbol(text, main, textord, "\u2019", "'", true);
    defineSymbol(text, main, textord, "\u2019", "\\textquoteright");
    defineSymbol(text, main, textord, "\u201c", "``", true);
    defineSymbol(text, main, textord, "\u201c", "\\textquotedblleft");
    defineSymbol(text, main, textord, "\u201d", "''", true);
    defineSymbol(text, main, textord, "\u201d", "\\textquotedblright"); //  \degree from gensymb package

    defineSymbol(math, main, textord, "\u00b0", "\\degree", true);
    defineSymbol(text, main, textord, "\u00b0", "\\degree"); // \textdegree from inputenc package

    defineSymbol(text, main, textord, "\u00b0", "\\textdegree", true); // TODO: In LaTeX, \pounds can generate a different character in text and math
    // mode, but among our fonts, only Main-Regular defines this character "163".

    defineSymbol(math, main, textord, "\u00a3", "\\pounds");
    defineSymbol(math, main, textord, "\u00a3", "\\mathsterling", true);
    defineSymbol(text, main, textord, "\u00a3", "\\pounds");
    defineSymbol(text, main, textord, "\u00a3", "\\textsterling", true);
    defineSymbol(math, ams, textord, "\u2720", "\\maltese");
    defineSymbol(text, ams, textord, "\u2720", "\\maltese"); // There are lots of symbols which are the same, so we add them in afterwards.
    // All of these are textords in math mode

    var mathTextSymbols = "0123456789/@.\"";

    for (var i = 0; i < mathTextSymbols.length; i++) {
      var ch = mathTextSymbols.charAt(i);
      defineSymbol(math, main, textord, ch, ch);
    } // All of these are textords in text mode


    var textSymbols = "0123456789!@*()-=+\";:?/.,";

    for (var _i = 0; _i < textSymbols.length; _i++) {
      var _ch = textSymbols.charAt(_i);

      defineSymbol(text, main, textord, _ch, _ch);
    } // All of these are textords in text mode, and mathords in math mode


    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var _i2 = 0; _i2 < letters.length; _i2++) {
      var _ch2 = letters.charAt(_i2);

      defineSymbol(math, main, mathord, _ch2, _ch2);
      defineSymbol(text, main, textord, _ch2, _ch2);
    } // Blackboard bold and script letters in Unicode range


    defineSymbol(math, ams, textord, "C", "\u2102"); // blackboard bold

    defineSymbol(text, ams, textord, "C", "\u2102");
    defineSymbol(math, ams, textord, "H", "\u210D");
    defineSymbol(text, ams, textord, "H", "\u210D");
    defineSymbol(math, ams, textord, "N", "\u2115");
    defineSymbol(text, ams, textord, "N", "\u2115");
    defineSymbol(math, ams, textord, "P", "\u2119");
    defineSymbol(text, ams, textord, "P", "\u2119");
    defineSymbol(math, ams, textord, "Q", "\u211A");
    defineSymbol(text, ams, textord, "Q", "\u211A");
    defineSymbol(math, ams, textord, "R", "\u211D");
    defineSymbol(text, ams, textord, "R", "\u211D");
    defineSymbol(math, ams, textord, "Z", "\u2124");
    defineSymbol(text, ams, textord, "Z", "\u2124");
    defineSymbol(math, main, mathord, "h", "\u210E"); // italic h, Planck constant

    defineSymbol(text, main, mathord, "h", "\u210E"); // The next loop loads wide (surrogate pair) characters.
    // We support some letters in the Unicode range U+1D400 to U+1D7FF,
    // Mathematical Alphanumeric Symbols.
    // Some editors do not deal well with wide characters. So don't write the
    // string into this file. Instead, create the string from the surrogate pair.

    var wideChar = "";

    for (var _i3 = 0; _i3 < letters.length; _i3++) {
      var _ch3 = letters.charAt(_i3); // The hex numbers in the next line are a surrogate pair.
      // 0xD835 is the high surrogate for all letters in the range we support.
      // 0xDC00 is the low surrogate for bold A.


      wideChar = String.fromCharCode(0xD835, 0xDC00 + _i3); // A-Z a-z bold

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDC34 + _i3); // A-Z a-z italic

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDC68 + _i3); // A-Z a-z bold italic

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDD04 + _i3); // A-Z a-z Fractur

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDD6C + _i3); // A-Z a-z bold Fractur

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDDA0 + _i3); // A-Z a-z sans-serif

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDDD4 + _i3); // A-Z a-z sans bold

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDE08 + _i3); // A-Z a-z sans italic

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDE70 + _i3); // A-Z a-z monospace

      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);

      if (_i3 < 26) {
        // KaTeX fonts have only capital letters for blackboard bold and script.
        // See exception for k below.
        wideChar = String.fromCharCode(0xD835, 0xDD38 + _i3); // A-Z double struck

        defineSymbol(math, main, mathord, _ch3, wideChar);
        defineSymbol(text, main, textord, _ch3, wideChar);
        wideChar = String.fromCharCode(0xD835, 0xDC9C + _i3); // A-Z script

        defineSymbol(math, main, mathord, _ch3, wideChar);
        defineSymbol(text, main, textord, _ch3, wideChar);
      } // TODO: Add bold script when it is supported by a KaTeX font.

    } // "k" is the only double struck lower case letter in the KaTeX fonts.


    wideChar = String.fromCharCode(0xD835, 0xDD5C); // k double struck

    defineSymbol(math, main, mathord, "k", wideChar);
    defineSymbol(text, main, textord, "k", wideChar); // Next, some wide character numerals

    for (var _i4 = 0; _i4 < 10; _i4++) {
      var _ch4 = _i4.toString();

      wideChar = String.fromCharCode(0xD835, 0xDFCE + _i4); // 0-9 bold

      defineSymbol(math, main, mathord, _ch4, wideChar);
      defineSymbol(text, main, textord, _ch4, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDFE2 + _i4); // 0-9 sans serif

      defineSymbol(math, main, mathord, _ch4, wideChar);
      defineSymbol(text, main, textord, _ch4, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDFEC + _i4); // 0-9 bold sans

      defineSymbol(math, main, mathord, _ch4, wideChar);
      defineSymbol(text, main, textord, _ch4, wideChar);
      wideChar = String.fromCharCode(0xD835, 0xDFF6 + _i4); // 0-9 monospace

      defineSymbol(math, main, mathord, _ch4, wideChar);
      defineSymbol(text, main, textord, _ch4, wideChar);
    } // We add these Latin-1 letters as symbols for backwards-compatibility,
    // but they are not actually in the font, nor are they supported by the
    // Unicode accent mechanism, so they fall back to Times font and look ugly.
    // TODO(edemaine): Fix this.


    var extraLatin = "\u00d0\u00de\u00fe";

    for (var _i5 = 0; _i5 < extraLatin.length; _i5++) {
      var _ch5 = extraLatin.charAt(_i5);

      defineSymbol(math, main, mathord, _ch5, _ch5);
      defineSymbol(text, main, textord, _ch5, _ch5);
    }

    /**
     * This file provides support for Unicode range U+1D400 to U+1D7FF,
     * Mathematical Alphanumeric Symbols.
     *
     * Function wideCharacterFont takes a wide character as input and returns
     * the font information necessary to render it properly.
     */
    /**
     * Data below is from https://www.unicode.org/charts/PDF/U1D400.pdf
     * That document sorts characters into groups by font type, say bold or italic.
     *
     * In the arrays below, each subarray consists three elements:
     *      * The CSS class of that group when in math mode.
     *      * The CSS class of that group when in text mode.
     *      * The font name, so that KaTeX can get font metrics.
     */

    var wideLatinLetterData = [["mathbf", "textbf", "Main-Bold"], // A-Z bold upright
    ["mathbf", "textbf", "Main-Bold"], // a-z bold upright
    ["mathnormal", "textit", "Math-Italic"], // A-Z italic
    ["mathnormal", "textit", "Math-Italic"], // a-z italic
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"], // A-Z bold italic
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"], // a-z bold italic
    // Map fancy A-Z letters to script, not calligraphic.
    // This aligns with unicode-math and math fonts (except Cambria Math).
    ["mathscr", "textscr", "Script-Regular"], // A-Z script
    ["", "", ""], // a-z script.  No font
    ["", "", ""], // A-Z bold script. No font
    ["", "", ""], // a-z bold script. No font
    ["mathfrak", "textfrak", "Fraktur-Regular"], // A-Z Fraktur
    ["mathfrak", "textfrak", "Fraktur-Regular"], // a-z Fraktur
    ["mathbb", "textbb", "AMS-Regular"], // A-Z double-struck
    ["mathbb", "textbb", "AMS-Regular"], // k double-struck
    // Note that we are using a bold font, but font metrics for regular Fraktur.
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], // A-Z bold Fraktur
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], // a-z bold Fraktur
    ["mathsf", "textsf", "SansSerif-Regular"], // A-Z sans-serif
    ["mathsf", "textsf", "SansSerif-Regular"], // a-z sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"], // A-Z bold sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"], // a-z bold sans-serif
    ["mathitsf", "textitsf", "SansSerif-Italic"], // A-Z italic sans-serif
    ["mathitsf", "textitsf", "SansSerif-Italic"], // a-z italic sans-serif
    ["", "", ""], // A-Z bold italic sans. No font
    ["", "", ""], // a-z bold italic sans. No font
    ["mathtt", "texttt", "Typewriter-Regular"], // A-Z monospace
    ["mathtt", "texttt", "Typewriter-Regular"] // a-z monospace
    ];
    var wideNumeralData = [["mathbf", "textbf", "Main-Bold"], // 0-9 bold
    ["", "", ""], // 0-9 double-struck. No KaTeX font.
    ["mathsf", "textsf", "SansSerif-Regular"], // 0-9 sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"], // 0-9 bold sans-serif
    ["mathtt", "texttt", "Typewriter-Regular"] // 0-9 monospace
    ];
    var wideCharacterFont = function wideCharacterFont(wideChar, mode) {
      // IE doesn't support codePointAt(). So work with the surrogate pair.
      var H = wideChar.charCodeAt(0); // high surrogate

      var L = wideChar.charCodeAt(1); // low surrogate

      var codePoint = (H - 0xD800) * 0x400 + (L - 0xDC00) + 0x10000;
      var j = mode === "math" ? 0 : 1; // column index for CSS class.

      if (0x1D400 <= codePoint && codePoint < 0x1D6A4) {
        // wideLatinLetterData contains exactly 26 chars on each row.
        // So we can calculate the relevant row. No traverse necessary.
        var i = Math.floor((codePoint - 0x1D400) / 26);
        return [wideLatinLetterData[i][2], wideLatinLetterData[i][j]];
      } else if (0x1D7CE <= codePoint && codePoint <= 0x1D7FF) {
        // Numerals, ten per row.
        var _i = Math.floor((codePoint - 0x1D7CE) / 10);

        return [wideNumeralData[_i][2], wideNumeralData[_i][j]];
      } else if (codePoint === 0x1D6A5 || codePoint === 0x1D6A6) {
        // dotless i or j
        return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
      } else if (0x1D6A6 < codePoint && codePoint < 0x1D7CE) {
        // Greek letters. Not supported, yet.
        return ["", ""];
      } else {
        // We don't support any wide characters outside 1D400–1D7FF.
        throw new ParseError("Unsupported character: " + wideChar);
      }
    };

    /* eslint no-console:0 */

    /**
     * Looks up the given symbol in fontMetrics, after applying any symbol
     * replacements defined in symbol.js
     */
    var lookupSymbol = function lookupSymbol(value, // TODO(#963): Use a union type for this.
    fontName, mode) {
      // Replace the value with its replaced value from symbol.js
      if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
      }

      return {
        value: value,
        metrics: getCharacterMetrics(value, fontName, mode)
      };
    };
    /**
     * Makes a symbolNode after translation via the list of symbols in symbols.js.
     * Correctly pulls out metrics for the character, and optionally takes a list of
     * classes to be attached to the node.
     *
     * TODO: make argument order closer to makeSpan
     * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
     * should if present come first in `classes`.
     * TODO(#953): Make `options` mandatory and always pass it in.
     */


    var makeSymbol = function makeSymbol(value, fontName, mode, options, classes) {
      var lookup = lookupSymbol(value, fontName, mode);
      var metrics = lookup.metrics;
      value = lookup.value;
      var symbolNode;

      if (metrics) {
        var italic = metrics.italic;

        if (mode === "text" || options && options.font === "mathit") {
          italic = 0;
        }

        symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
      } else {
        // TODO(emily): Figure out a good way to only print this in development
        typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
        symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
      }

      if (options) {
        symbolNode.maxFontSize = options.sizeMultiplier;

        if (options.style.isTight()) {
          symbolNode.classes.push("mtight");
        }

        var color = options.getColor();

        if (color) {
          symbolNode.style.color = color;
        }
      }

      return symbolNode;
    };
    /**
     * Makes a symbol in Main-Regular or AMS-Regular.
     * Used for rel, bin, open, close, inner, and punct.
     */


    var mathsym = function mathsym(value, mode, options, classes) {
      if (classes === void 0) {
        classes = [];
      }

      // Decide what font to render the symbol in by its entry in the symbols
      // table.
      // Have a special case for when the value = \ because the \ is used as a
      // textord in unsupported command errors but cannot be parsed as a regular
      // text ordinal and is therefore not present as a symbol in the symbols
      // table for text, as well as a special case for boldsymbol because it
      // can be used for bold + and -
      if (options.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) {
        return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
      } else if (value === "\\" || symbols[mode][value].font === "main") {
        return makeSymbol(value, "Main-Regular", mode, options, classes);
      } else {
        return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
      }
    };
    /**
     * Determines which of the two font names (Main-Bold and Math-BoldItalic) and
     * corresponding style tags (mathbf or boldsymbol) to use for font "boldsymbol",
     * depending on the symbol.  Use this function instead of fontMap for font
     * "boldsymbol".
     */


    var boldsymbol = function boldsymbol(value, mode, options, classes, type) {
      if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
        return {
          fontName: "Math-BoldItalic",
          fontClass: "boldsymbol"
        };
      } else {
        // Some glyphs do not exist in Math-BoldItalic so we need to use
        // Main-Bold instead.
        return {
          fontName: "Main-Bold",
          fontClass: "mathbf"
        };
      }
    };
    /**
     * Makes either a mathord or textord in the correct font and color.
     */


    var makeOrd = function makeOrd(group, options, type) {
      var mode = group.mode;
      var text = group.text;
      var classes = ["mord"]; // Math mode or Old font (i.e. \rm)

      var isFont = mode === "math" || mode === "text" && options.font;
      var fontOrFamily = isFont ? options.font : options.fontFamily;
      var wideFontName = "";
      var wideFontClass = "";

      if (text.charCodeAt(0) === 0xD835) {
        [wideFontName, wideFontClass] = wideCharacterFont(text, mode);
      }

      if (wideFontName.length > 0) {
        // surrogate pairs get special treatment
        return makeSymbol(text, wideFontName, mode, options, classes.concat(wideFontClass));
      } else if (fontOrFamily) {
        var fontName;
        var fontClasses;

        if (fontOrFamily === "boldsymbol") {
          var fontData = boldsymbol(text, mode, options, classes, type);
          fontName = fontData.fontName;
          fontClasses = [fontData.fontClass];
        } else if (isFont) {
          fontName = fontMap[fontOrFamily].fontName;
          fontClasses = [fontOrFamily];
        } else {
          fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
          fontClasses = [fontOrFamily, options.fontWeight, options.fontShape];
        }

        if (lookupSymbol(text, fontName, mode).metrics) {
          return makeSymbol(text, fontName, mode, options, classes.concat(fontClasses));
        } else if (ligatures.hasOwnProperty(text) && fontName.slice(0, 10) === "Typewriter") {
          // Deconstruct ligatures in monospace fonts (\texttt, \tt).
          var parts = [];

          for (var i = 0; i < text.length; i++) {
            parts.push(makeSymbol(text[i], fontName, mode, options, classes.concat(fontClasses)));
          }

          return makeFragment(parts);
        }
      } // Makes a symbol in the default font for mathords and textords.


      if (type === "mathord") {
        return makeSymbol(text, "Math-Italic", mode, options, classes.concat(["mathnormal"]));
      } else if (type === "textord") {
        var font = symbols[mode][text] && symbols[mode][text].font;

        if (font === "ams") {
          var _fontName = retrieveTextFontName("amsrm", options.fontWeight, options.fontShape);

          return makeSymbol(text, _fontName, mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
        } else if (font === "main" || !font) {
          var _fontName2 = retrieveTextFontName("textrm", options.fontWeight, options.fontShape);

          return makeSymbol(text, _fontName2, mode, options, classes.concat(options.fontWeight, options.fontShape));
        } else {
          // fonts added by plugins
          var _fontName3 = retrieveTextFontName(font, options.fontWeight, options.fontShape); // We add font name as a css class


          return makeSymbol(text, _fontName3, mode, options, classes.concat(_fontName3, options.fontWeight, options.fontShape));
        }
      } else {
        throw new Error("unexpected type: " + type + " in makeOrd");
      }
    };
    /**
     * Returns true if subsequent symbolNodes have the same classes, skew, maxFont,
     * and styles.
     */


    var canCombine = (prev, next) => {
      if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) {
        return false;
      } // If prev and next both are just "mbin"s or "mord"s we don't combine them
      // so that the proper spacing can be preserved.


      if (prev.classes.length === 1) {
        var cls = prev.classes[0];

        if (cls === "mbin" || cls === "mord") {
          return false;
        }
      }

      for (var style in prev.style) {
        if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
          return false;
        }
      }

      for (var _style in next.style) {
        if (next.style.hasOwnProperty(_style) && prev.style[_style] !== next.style[_style]) {
          return false;
        }
      }

      return true;
    };
    /**
     * Combine consecutive domTree.symbolNodes into a single symbolNode.
     * Note: this function mutates the argument.
     */


    var tryCombineChars = chars => {
      for (var i = 0; i < chars.length - 1; i++) {
        var prev = chars[i];
        var next = chars[i + 1];

        if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
          prev.text += next.text;
          prev.height = Math.max(prev.height, next.height);
          prev.depth = Math.max(prev.depth, next.depth); // Use the last character's italic correction since we use
          // it to add padding to the right of the span created from
          // the combined characters.

          prev.italic = next.italic;
          chars.splice(i + 1, 1);
          i--;
        }
      }

      return chars;
    };
    /**
     * Calculate the height, depth, and maxFontSize of an element based on its
     * children.
     */


    var sizeElementFromChildren = function sizeElementFromChildren(elem) {
      var height = 0;
      var depth = 0;
      var maxFontSize = 0;

      for (var i = 0; i < elem.children.length; i++) {
        var child = elem.children[i];

        if (child.height > height) {
          height = child.height;
        }

        if (child.depth > depth) {
          depth = child.depth;
        }

        if (child.maxFontSize > maxFontSize) {
          maxFontSize = child.maxFontSize;
        }
      }

      elem.height = height;
      elem.depth = depth;
      elem.maxFontSize = maxFontSize;
    };
    /**
     * Makes a span with the given list of classes, list of children, and options.
     *
     * TODO(#953): Ensure that `options` is always provided (currently some call
     * sites don't pass it) and make the type below mandatory.
     * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
     * should if present come first in `classes`.
     */


    var makeSpan$2 = function makeSpan(classes, children, options, style) {
      var span = new Span(classes, children, options, style);
      sizeElementFromChildren(span);
      return span;
    }; // SVG one is simpler -- doesn't require height, depth, max-font setting.
    // This is also a separate method for typesafety.


    var makeSvgSpan = (classes, children, options, style) => new Span(classes, children, options, style);

    var makeLineSpan = function makeLineSpan(className, options, thickness) {
      var line = makeSpan$2([className], [], options);
      line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
      line.style.borderBottomWidth = makeEm(line.height);
      line.maxFontSize = 1.0;
      return line;
    };
    /**
     * Makes an anchor with the given href, list of classes, list of children,
     * and options.
     */


    var makeAnchor = function makeAnchor(href, classes, children, options) {
      var anchor = new Anchor(href, classes, children, options);
      sizeElementFromChildren(anchor);
      return anchor;
    };
    /**
     * Makes a document fragment with the given list of children.
     */


    var makeFragment = function makeFragment(children) {
      var fragment = new DocumentFragment(children);
      sizeElementFromChildren(fragment);
      return fragment;
    };
    /**
     * Wraps group in a span if it's a document fragment, allowing to apply classes
     * and styles
     */


    var wrapFragment = function wrapFragment(group, options) {
      if (group instanceof DocumentFragment) {
        return makeSpan$2([], [group], options);
      }

      return group;
    }; // These are exact object types to catch typos in the names of the optional fields.


    // Computes the updated `children` list and the overall depth.
    //
    // This helper function for makeVList makes it easier to enforce type safety by
    // allowing early exits (returns) in the logic.
    var getVListChildrenAndDepth = function getVListChildrenAndDepth(params) {
      if (params.positionType === "individualShift") {
        var oldChildren = params.children;
        var children = [oldChildren[0]]; // Add in kerns to the list of params.children to get each element to be
        // shifted to the correct specified shift

        var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;

        var currPos = _depth;

        for (var i = 1; i < oldChildren.length; i++) {
          var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
          var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);
          currPos = currPos + diff;
          children.push({
            type: "kern",
            size
          });
          children.push(oldChildren[i]);
        }

        return {
          children,
          depth: _depth
        };
      }

      var depth;

      if (params.positionType === "top") {
        // We always start at the bottom, so calculate the bottom by adding up
        // all the sizes
        var bottom = params.positionData;

        for (var _i = 0; _i < params.children.length; _i++) {
          var child = params.children[_i];
          bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
        }

        depth = bottom;
      } else if (params.positionType === "bottom") {
        depth = -params.positionData;
      } else {
        var firstChild = params.children[0];

        if (firstChild.type !== "elem") {
          throw new Error('First child must have type "elem".');
        }

        if (params.positionType === "shift") {
          depth = -firstChild.elem.depth - params.positionData;
        } else if (params.positionType === "firstBaseline") {
          depth = -firstChild.elem.depth;
        } else {
          throw new Error("Invalid positionType " + params.positionType + ".");
        }
      }

      return {
        children: params.children,
        depth
      };
    };
    /**
     * Makes a vertical list by stacking elements and kerns on top of each other.
     * Allows for many different ways of specifying the positioning method.
     *
     * See VListParam documentation above.
     */


    var makeVList = function makeVList(params, options) {
      var {
        children,
        depth
      } = getVListChildrenAndDepth(params); // Create a strut that is taller than any list item. The strut is added to
      // each item, where it will determine the item's baseline. Since it has
      // `overflow:hidden`, the strut's top edge will sit on the item's line box's
      // top edge and the strut's bottom edge will sit on the item's baseline,
      // with no additional line-height spacing. This allows the item baseline to
      // be positioned precisely without worrying about font ascent and
      // line-height.

      var pstrutSize = 0;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.type === "elem") {
          var elem = child.elem;
          pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
        }
      }

      pstrutSize += 2;
      var pstrut = makeSpan$2(["pstrut"], []);
      pstrut.style.height = makeEm(pstrutSize); // Create a new list of actual children at the correct offsets

      var realChildren = [];
      var minPos = depth;
      var maxPos = depth;
      var currPos = depth;

      for (var _i2 = 0; _i2 < children.length; _i2++) {
        var _child = children[_i2];

        if (_child.type === "kern") {
          currPos += _child.size;
        } else {
          var _elem = _child.elem;
          var classes = _child.wrapperClasses || [];
          var style = _child.wrapperStyle || {};
          var childWrap = makeSpan$2(classes, [pstrut, _elem], undefined, style);
          childWrap.style.top = makeEm(-pstrutSize - currPos - _elem.depth);

          if (_child.marginLeft) {
            childWrap.style.marginLeft = _child.marginLeft;
          }

          if (_child.marginRight) {
            childWrap.style.marginRight = _child.marginRight;
          }

          realChildren.push(childWrap);
          currPos += _elem.height + _elem.depth;
        }

        minPos = Math.min(minPos, currPos);
        maxPos = Math.max(maxPos, currPos);
      } // The vlist contents go in a table-cell with `vertical-align:bottom`.
      // This cell's bottom edge will determine the containing table's baseline
      // without overly expanding the containing line-box.


      var vlist = makeSpan$2(["vlist"], realChildren);
      vlist.style.height = makeEm(maxPos); // A second row is used if necessary to represent the vlist's depth.

      var rows;

      if (minPos < 0) {
        // We will define depth in an empty span with display: table-cell.
        // It should render with the height that we define. But Chrome, in
        // contenteditable mode only, treats that span as if it contains some
        // text content. And that min-height over-rides our desired height.
        // So we put another empty span inside the depth strut span.
        var emptySpan = makeSpan$2([], []);
        var depthStrut = makeSpan$2(["vlist"], [emptySpan]);
        depthStrut.style.height = makeEm(-minPos); // Safari wants the first row to have inline content; otherwise it
        // puts the bottom of the *second* row on the baseline.

        var topStrut = makeSpan$2(["vlist-s"], [new SymbolNode("\u200b")]);
        rows = [makeSpan$2(["vlist-r"], [vlist, topStrut]), makeSpan$2(["vlist-r"], [depthStrut])];
      } else {
        rows = [makeSpan$2(["vlist-r"], [vlist])];
      }

      var vtable = makeSpan$2(["vlist-t"], rows);

      if (rows.length === 2) {
        vtable.classes.push("vlist-t2");
      }

      vtable.height = maxPos;
      vtable.depth = -minPos;
      return vtable;
    }; // Glue is a concept from TeX which is a flexible space between elements in
    // either a vertical or horizontal list. In KaTeX, at least for now, it's
    // static space between elements in a horizontal layout.


    var makeGlue = (measurement, options) => {
      // Make an empty span for the space
      var rule = makeSpan$2(["mspace"], [], options);
      var size = calculateSize(measurement, options);
      rule.style.marginRight = makeEm(size);
      return rule;
    }; // Takes font options, and returns the appropriate fontLookup name


    var retrieveTextFontName = function retrieveTextFontName(fontFamily, fontWeight, fontShape) {
      var baseFontName = "";

      switch (fontFamily) {
        case "amsrm":
          baseFontName = "AMS";
          break;

        case "textrm":
          baseFontName = "Main";
          break;

        case "textsf":
          baseFontName = "SansSerif";
          break;

        case "texttt":
          baseFontName = "Typewriter";
          break;

        default:
          baseFontName = fontFamily;
        // use fonts added by a plugin
      }

      var fontStylesName;

      if (fontWeight === "textbf" && fontShape === "textit") {
        fontStylesName = "BoldItalic";
      } else if (fontWeight === "textbf") {
        fontStylesName = "Bold";
      } else if (fontWeight === "textit") {
        fontStylesName = "Italic";
      } else {
        fontStylesName = "Regular";
      }

      return baseFontName + "-" + fontStylesName;
    };
    /**
     * Maps TeX font commands to objects containing:
     * - variant: string used for "mathvariant" attribute in buildMathML.js
     * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
     */
    // A map between tex font commands an MathML mathvariant attribute values


    var fontMap = {
      // styles
      "mathbf": {
        variant: "bold",
        fontName: "Main-Bold"
      },
      "mathrm": {
        variant: "normal",
        fontName: "Main-Regular"
      },
      "textit": {
        variant: "italic",
        fontName: "Main-Italic"
      },
      "mathit": {
        variant: "italic",
        fontName: "Main-Italic"
      },
      "mathnormal": {
        variant: "italic",
        fontName: "Math-Italic"
      },
      // "boldsymbol" is missing because they require the use of multiple fonts:
      // Math-BoldItalic and Main-Bold.  This is handled by a special case in
      // makeOrd which ends up calling boldsymbol.
      // families
      "mathbb": {
        variant: "double-struck",
        fontName: "AMS-Regular"
      },
      "mathcal": {
        variant: "script",
        fontName: "Caligraphic-Regular"
      },
      "mathfrak": {
        variant: "fraktur",
        fontName: "Fraktur-Regular"
      },
      "mathscr": {
        variant: "script",
        fontName: "Script-Regular"
      },
      "mathsf": {
        variant: "sans-serif",
        fontName: "SansSerif-Regular"
      },
      "mathtt": {
        variant: "monospace",
        fontName: "Typewriter-Regular"
      }
    };
    var svgData = {
      //   path, width, height
      vec: ["vec", 0.471, 0.714],
      // values from the font glyph
      oiintSize1: ["oiintSize1", 0.957, 0.499],
      // oval to overlay the integrand
      oiintSize2: ["oiintSize2", 1.472, 0.659],
      oiiintSize1: ["oiiintSize1", 1.304, 0.499],
      oiiintSize2: ["oiiintSize2", 1.98, 0.659]
    };

    var staticSvg = function staticSvg(value, options) {
      // Create a span with inline SVG for the element.
      var [pathName, width, height] = svgData[value];
      var path = new PathNode(pathName);
      var svgNode = new SvgNode([path], {
        "width": makeEm(width),
        "height": makeEm(height),
        // Override CSS rule `.katex svg { width: 100% }`
        "style": "width:" + makeEm(width),
        "viewBox": "0 0 " + 1000 * width + " " + 1000 * height,
        "preserveAspectRatio": "xMinYMin"
      });
      var span = makeSvgSpan(["overlay"], [svgNode], options);
      span.height = height;
      span.style.height = makeEm(height);
      span.style.width = makeEm(width);
      return span;
    };

    var buildCommon = {
      fontMap,
      makeSymbol,
      mathsym,
      makeSpan: makeSpan$2,
      makeSvgSpan,
      makeLineSpan,
      makeAnchor,
      makeFragment,
      wrapFragment,
      makeVList,
      makeOrd,
      makeGlue,
      staticSvg,
      svgData,
      tryCombineChars
    };

    /**
     * Describes spaces between different classes of atoms.
     */
    var thinspace = {
      number: 3,
      unit: "mu"
    };
    var mediumspace = {
      number: 4,
      unit: "mu"
    };
    var thickspace = {
      number: 5,
      unit: "mu"
    }; // Making the type below exact with all optional fields doesn't work due to
    // - https://github.com/facebook/flow/issues/4582
    // - https://github.com/facebook/flow/issues/5688
    // However, since *all* fields are optional, $Shape<> works as suggested in 5688
    // above.

    // Spacing relationships for display and text styles
    var spacings = {
      mord: {
        mop: thinspace,
        mbin: mediumspace,
        mrel: thickspace,
        minner: thinspace
      },
      mop: {
        mord: thinspace,
        mop: thinspace,
        mrel: thickspace,
        minner: thinspace
      },
      mbin: {
        mord: mediumspace,
        mop: mediumspace,
        mopen: mediumspace,
        minner: mediumspace
      },
      mrel: {
        mord: thickspace,
        mop: thickspace,
        mopen: thickspace,
        minner: thickspace
      },
      mopen: {},
      mclose: {
        mop: thinspace,
        mbin: mediumspace,
        mrel: thickspace,
        minner: thinspace
      },
      mpunct: {
        mord: thinspace,
        mop: thinspace,
        mrel: thickspace,
        mopen: thinspace,
        mclose: thinspace,
        mpunct: thinspace,
        minner: thinspace
      },
      minner: {
        mord: thinspace,
        mop: thinspace,
        mbin: mediumspace,
        mrel: thickspace,
        mopen: thinspace,
        mpunct: thinspace,
        minner: thinspace
      }
    }; // Spacing relationships for script and scriptscript styles

    var tightSpacings = {
      mord: {
        mop: thinspace
      },
      mop: {
        mord: thinspace,
        mop: thinspace
      },
      mbin: {},
      mrel: {},
      mopen: {},
      mclose: {
        mop: thinspace
      },
      mpunct: {},
      minner: {
        mop: thinspace
      }
    };

    /** Context provided to function handlers for error messages. */
    // Note: reverse the order of the return type union will cause a flow error.
    // See https://github.com/facebook/flow/issues/3663.
    // More general version of `HtmlBuilder` for nodes (e.g. \sum, accent types)
    // whose presence impacts super/subscripting. In this case, ParseNode<"supsub">
    // delegates its HTML building to the HtmlBuilder corresponding to these nodes.

    /**
     * Final function spec for use at parse time.
     * This is almost identical to `FunctionPropSpec`, except it
     * 1. includes the function handler, and
     * 2. requires all arguments except argTypes.
     * It is generated by `defineFunction()` below.
     */

    /**
     * All registered functions.
     * `functions.js` just exports this same dictionary again and makes it public.
     * `Parser.js` requires this dictionary.
     */
    var _functions = {};
    /**
     * All HTML builders. Should be only used in the `define*` and the `build*ML`
     * functions.
     */

    var _htmlGroupBuilders = {};
    /**
     * All MathML builders. Should be only used in the `define*` and the `build*ML`
     * functions.
     */

    var _mathmlGroupBuilders = {};
    function defineFunction(_ref) {
      var {
        type,
        names,
        props,
        handler,
        htmlBuilder,
        mathmlBuilder
      } = _ref;
      // Set default values of functions
      var data = {
        type,
        numArgs: props.numArgs,
        argTypes: props.argTypes,
        allowedInArgument: !!props.allowedInArgument,
        allowedInText: !!props.allowedInText,
        allowedInMath: props.allowedInMath === undefined ? true : props.allowedInMath,
        numOptionalArgs: props.numOptionalArgs || 0,
        infix: !!props.infix,
        primitive: !!props.primitive,
        handler: handler
      };

      for (var i = 0; i < names.length; ++i) {
        _functions[names[i]] = data;
      }

      if (type) {
        if (htmlBuilder) {
          _htmlGroupBuilders[type] = htmlBuilder;
        }

        if (mathmlBuilder) {
          _mathmlGroupBuilders[type] = mathmlBuilder;
        }
      }
    }
    /**
     * Use this to register only the HTML and MathML builders for a function (e.g.
     * if the function's ParseNode is generated in Parser.js rather than via a
     * stand-alone handler provided to `defineFunction`).
     */

    function defineFunctionBuilders(_ref2) {
      var {
        type,
        htmlBuilder,
        mathmlBuilder
      } = _ref2;
      defineFunction({
        type,
        names: [],
        props: {
          numArgs: 0
        },

        handler() {
          throw new Error('Should never be called.');
        },

        htmlBuilder,
        mathmlBuilder
      });
    }
    var normalizeArgument = function normalizeArgument(arg) {
      return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
    }; // Since the corresponding buildHTML/buildMathML function expects a
    // list of elements, we normalize for different kinds of arguments

    var ordargument = function ordargument(arg) {
      return arg.type === "ordgroup" ? arg.body : [arg];
    };

    /**
     * This file does the main work of building a domTree structure from a parse
     * tree. The entry point is the `buildHTML` function, which takes a parse tree.
     * Then, the buildExpression, buildGroup, and various groupBuilders functions
     * are called, to produce a final HTML tree.
     */
    var makeSpan$1 = buildCommon.makeSpan; // Binary atoms (first class `mbin`) change into ordinary atoms (`mord`)
    // depending on their surroundings. See TeXbook pg. 442-446, Rules 5 and 6,
    // and the text before Rule 19.

    var binLeftCanceller = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"];
    var binRightCanceller = ["rightmost", "mrel", "mclose", "mpunct"];
    var styleMap$1 = {
      "display": Style$1.DISPLAY,
      "text": Style$1.TEXT,
      "script": Style$1.SCRIPT,
      "scriptscript": Style$1.SCRIPTSCRIPT
    };
    var DomEnum = {
      mord: "mord",
      mop: "mop",
      mbin: "mbin",
      mrel: "mrel",
      mopen: "mopen",
      mclose: "mclose",
      mpunct: "mpunct",
      minner: "minner"
    };

    /**
     * Take a list of nodes, build them in order, and return a list of the built
     * nodes. documentFragments are flattened into their contents, so the
     * returned list contains no fragments. `isRealGroup` is true if `expression`
     * is a real group (no atoms will be added on either side), as opposed to
     * a partial group (e.g. one created by \color). `surrounding` is an array
     * consisting type of nodes that will be added to the left and right.
     */
    var buildExpression$1 = function buildExpression(expression, options, isRealGroup, surrounding) {
      if (surrounding === void 0) {
        surrounding = [null, null];
      }

      // Parse expressions into `groups`.
      var groups = [];

      for (var i = 0; i < expression.length; i++) {
        var output = buildGroup$1(expression[i], options);

        if (output instanceof DocumentFragment) {
          var children = output.children;
          groups.push(...children);
        } else {
          groups.push(output);
        }
      } // Combine consecutive domTree.symbolNodes into a single symbolNode.


      buildCommon.tryCombineChars(groups); // If `expression` is a partial group, let the parent handle spacings
      // to avoid processing groups multiple times.

      if (!isRealGroup) {
        return groups;
      }

      var glueOptions = options;

      if (expression.length === 1) {
        var node = expression[0];

        if (node.type === "sizing") {
          glueOptions = options.havingSize(node.size);
        } else if (node.type === "styling") {
          glueOptions = options.havingStyle(styleMap$1[node.style]);
        }
      } // Dummy spans for determining spacings between surrounding atoms.
      // If `expression` has no atoms on the left or right, class "leftmost"
      // or "rightmost", respectively, is used to indicate it.


      var dummyPrev = makeSpan$1([surrounding[0] || "leftmost"], [], options);
      var dummyNext = makeSpan$1([surrounding[1] || "rightmost"], [], options); // TODO: These code assumes that a node's math class is the first element
      // of its `classes` array. A later cleanup should ensure this, for
      // instance by changing the signature of `makeSpan`.
      // Before determining what spaces to insert, perform bin cancellation.
      // Binary operators change to ordinary symbols in some contexts.

      var isRoot = isRealGroup === "root";
      traverseNonSpaceNodes(groups, (node, prev) => {
        var prevType = prev.classes[0];
        var type = node.classes[0];

        if (prevType === "mbin" && utils.contains(binRightCanceller, type)) {
          prev.classes[0] = "mord";
        } else if (type === "mbin" && utils.contains(binLeftCanceller, prevType)) {
          node.classes[0] = "mord";
        }
      }, {
        node: dummyPrev
      }, dummyNext, isRoot);
      traverseNonSpaceNodes(groups, (node, prev) => {
        var prevType = getTypeOfDomTree(prev);
        var type = getTypeOfDomTree(node); // 'mtight' indicates that the node is script or scriptscript style.

        var space = prevType && type ? node.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;

        if (space) {
          // Insert glue (spacing) after the `prev`.
          return buildCommon.makeGlue(space, glueOptions);
        }
      }, {
        node: dummyPrev
      }, dummyNext, isRoot);
      return groups;
    }; // Depth-first traverse non-space `nodes`, calling `callback` with the current and
    // previous node as arguments, optionally returning a node to insert after the
    // previous node. `prev` is an object with the previous node and `insertAfter`
    // function to insert after it. `next` is a node that will be added to the right.
    // Used for bin cancellation and inserting spacings.

    var traverseNonSpaceNodes = function traverseNonSpaceNodes(nodes, callback, prev, next, isRoot) {
      if (next) {
        // temporarily append the right node, if exists
        nodes.push(next);
      }

      var i = 0;

      for (; i < nodes.length; i++) {
        var node = nodes[i];
        var partialGroup = checkPartialGroup(node);

        if (partialGroup) {
          // Recursive DFS
          // $FlowFixMe: make nodes a $ReadOnlyArray by returning a new array
          traverseNonSpaceNodes(partialGroup.children, callback, prev, null, isRoot);
          continue;
        } // Ignore explicit spaces (e.g., \;, \,) when determining what implicit
        // spacing should go between atoms of different classes


        var nonspace = !node.hasClass("mspace");

        if (nonspace) {
          var result = callback(node, prev.node);

          if (result) {
            if (prev.insertAfter) {
              prev.insertAfter(result);
            } else {
              // insert at front
              nodes.unshift(result);
              i++;
            }
          }
        }

        if (nonspace) {
          prev.node = node;
        } else if (isRoot && node.hasClass("newline")) {
          prev.node = makeSpan$1(["leftmost"]); // treat like beginning of line
        }

        prev.insertAfter = (index => n => {
          nodes.splice(index + 1, 0, n);
          i++;
        })(i);
      }

      if (next) {
        nodes.pop();
      }
    }; // Check if given node is a partial group, i.e., does not affect spacing around.


    var checkPartialGroup = function checkPartialGroup(node) {
      if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) {
        return node;
      }

      return null;
    }; // Return the outermost node of a domTree.


    var getOutermostNode = function getOutermostNode(node, side) {
      var partialGroup = checkPartialGroup(node);

      if (partialGroup) {
        var children = partialGroup.children;

        if (children.length) {
          if (side === "right") {
            return getOutermostNode(children[children.length - 1], "right");
          } else if (side === "left") {
            return getOutermostNode(children[0], "left");
          }
        }
      }

      return node;
    }; // Return math atom class (mclass) of a domTree.
    // If `side` is given, it will get the type of the outermost node at given side.


    var getTypeOfDomTree = function getTypeOfDomTree(node, side) {
      if (!node) {
        return null;
      }

      if (side) {
        node = getOutermostNode(node, side);
      } // This makes a lot of assumptions as to where the type of atom
      // appears.  We should do a better job of enforcing this.


      return DomEnum[node.classes[0]] || null;
    };
    var makeNullDelimiter = function makeNullDelimiter(options, classes) {
      var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
      return makeSpan$1(classes.concat(moreClasses));
    };
    /**
     * buildGroup is the function that takes a group and calls the correct groupType
     * function for it. It also handles the interaction of size and style changes
     * between parents and children.
     */

    var buildGroup$1 = function buildGroup(group, options, baseOptions) {
      if (!group) {
        return makeSpan$1();
      }

      if (_htmlGroupBuilders[group.type]) {
        // Call the groupBuilders function
        // $FlowFixMe
        var groupNode = _htmlGroupBuilders[group.type](group, options); // If the size changed between the parent and the current group, account
        // for that size difference.

        if (baseOptions && options.size !== baseOptions.size) {
          groupNode = makeSpan$1(options.sizingClasses(baseOptions), [groupNode], options);
          var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
          groupNode.height *= multiplier;
          groupNode.depth *= multiplier;
        }

        return groupNode;
      } else {
        throw new ParseError("Got group of unknown type: '" + group.type + "'");
      }
    };
    /**
     * Combine an array of HTML DOM nodes (e.g., the output of `buildExpression`)
     * into an unbreakable HTML node of class .base, with proper struts to
     * guarantee correct vertical extent.  `buildHTML` calls this repeatedly to
     * make up the entire expression as a sequence of unbreakable units.
     */

    function buildHTMLUnbreakable(children, options) {
      // Compute height and depth of this chunk.
      var body = makeSpan$1(["base"], children, options); // Add strut, which ensures that the top of the HTML element falls at
      // the height of the expression, and the bottom of the HTML element
      // falls at the depth of the expression.

      var strut = makeSpan$1(["strut"]);
      strut.style.height = makeEm(body.height + body.depth);

      if (body.depth) {
        strut.style.verticalAlign = makeEm(-body.depth);
      }

      body.children.unshift(strut);
      return body;
    }
    /**
     * Take an entire parse tree, and build it into an appropriate set of HTML
     * nodes.
     */


    function buildHTML(tree, options) {
      // Strip off outer tag wrapper for processing below.
      var tag = null;

      if (tree.length === 1 && tree[0].type === "tag") {
        tag = tree[0].tag;
        tree = tree[0].body;
      } // Build the expression contained in the tree


      var expression = buildExpression$1(tree, options, "root");
      var eqnNum;

      if (expression.length === 2 && expression[1].hasClass("tag")) {
        // An environment with automatic equation numbers, e.g. {gather}.
        eqnNum = expression.pop();
      }

      var children = []; // Create one base node for each chunk between potential line breaks.
      // The TeXBook [p.173] says "A formula will be broken only after a
      // relation symbol like $=$ or $<$ or $\rightarrow$, or after a binary
      // operation symbol like $+$ or $-$ or $\times$, where the relation or
      // binary operation is on the ``outer level'' of the formula (i.e., not
      // enclosed in {...} and not part of an \over construction)."

      var parts = [];

      for (var i = 0; i < expression.length; i++) {
        parts.push(expression[i]);

        if (expression[i].hasClass("mbin") || expression[i].hasClass("mrel") || expression[i].hasClass("allowbreak")) {
          // Put any post-operator glue on same line as operator.
          // Watch for \nobreak along the way, and stop at \newline.
          var nobreak = false;

          while (i < expression.length - 1 && expression[i + 1].hasClass("mspace") && !expression[i + 1].hasClass("newline")) {
            i++;
            parts.push(expression[i]);

            if (expression[i].hasClass("nobreak")) {
              nobreak = true;
            }
          } // Don't allow break if \nobreak among the post-operator glue.


          if (!nobreak) {
            children.push(buildHTMLUnbreakable(parts, options));
            parts = [];
          }
        } else if (expression[i].hasClass("newline")) {
          // Write the line except the newline
          parts.pop();

          if (parts.length > 0) {
            children.push(buildHTMLUnbreakable(parts, options));
            parts = [];
          } // Put the newline at the top level


          children.push(expression[i]);
        }
      }

      if (parts.length > 0) {
        children.push(buildHTMLUnbreakable(parts, options));
      } // Now, if there was a tag, build it too and append it as a final child.


      var tagChild;

      if (tag) {
        tagChild = buildHTMLUnbreakable(buildExpression$1(tag, options, true));
        tagChild.classes = ["tag"];
        children.push(tagChild);
      } else if (eqnNum) {
        children.push(eqnNum);
      }

      var htmlNode = makeSpan$1(["katex-html"], children);
      htmlNode.setAttribute("aria-hidden", "true"); // Adjust the strut of the tag to be the maximum height of all children
      // (the height of the enclosing htmlNode) for proper vertical alignment.

      if (tagChild) {
        var strut = tagChild.children[0];
        strut.style.height = makeEm(htmlNode.height + htmlNode.depth);

        if (htmlNode.depth) {
          strut.style.verticalAlign = makeEm(-htmlNode.depth);
        }
      }

      return htmlNode;
    }

    /**
     * These objects store data about MathML nodes. This is the MathML equivalent
     * of the types in domTree.js. Since MathML handles its own rendering, and
     * since we're mainly using MathML to improve accessibility, we don't manage
     * any of the styling state that the plain DOM nodes do.
     *
     * The `toNode` and `toMarkup` functions work similarly to how they do in
     * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
     */
    function newDocumentFragment(children) {
      return new DocumentFragment(children);
    }
    /**
     * This node represents a general purpose MathML node of any type. The
     * constructor requires the type of node to create (for example, `"mo"` or
     * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
     */

    class MathNode {
      constructor(type, children, classes) {
        this.type = void 0;
        this.attributes = void 0;
        this.children = void 0;
        this.classes = void 0;
        this.type = type;
        this.attributes = {};
        this.children = children || [];
        this.classes = classes || [];
      }
      /**
       * Sets an attribute on a MathML node. MathML depends on attributes to convey a
       * semantic content, so this is used heavily.
       */


      setAttribute(name, value) {
        this.attributes[name] = value;
      }
      /**
       * Gets an attribute on a MathML node.
       */


      getAttribute(name) {
        return this.attributes[name];
      }
      /**
       * Converts the math node into a MathML-namespaced DOM element.
       */


      toNode() {
        var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
          }
        }

        if (this.classes.length > 0) {
          node.className = createClass(this.classes);
        }

        for (var i = 0; i < this.children.length; i++) {
          node.appendChild(this.children[i].toNode());
        }

        return node;
      }
      /**
       * Converts the math node into an HTML markup string.
       */


      toMarkup() {
        var markup = "<" + this.type; // Add the attributes

        for (var attr in this.attributes) {
          if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
          }
        }

        if (this.classes.length > 0) {
          markup += " class =\"" + utils.escape(createClass(this.classes)) + "\"";
        }

        markup += ">";

        for (var i = 0; i < this.children.length; i++) {
          markup += this.children[i].toMarkup();
        }

        markup += "</" + this.type + ">";
        return markup;
      }
      /**
       * Converts the math node into a string, similar to innerText, but escaped.
       */


      toText() {
        return this.children.map(child => child.toText()).join("");
      }

    }
    /**
     * This node represents a piece of text.
     */

    class TextNode {
      constructor(text) {
        this.text = void 0;
        this.text = text;
      }
      /**
       * Converts the text node into a DOM text node.
       */


      toNode() {
        return document.createTextNode(this.text);
      }
      /**
       * Converts the text node into escaped HTML markup
       * (representing the text itself).
       */


      toMarkup() {
        return utils.escape(this.toText());
      }
      /**
       * Converts the text node into a string
       * (representing the text itself).
       */


      toText() {
        return this.text;
      }

    }
    /**
     * This node represents a space, but may render as <mspace.../> or as text,
     * depending on the width.
     */

    class SpaceNode {
      /**
       * Create a Space node with width given in CSS ems.
       */
      constructor(width) {
        this.width = void 0;
        this.character = void 0;
        this.width = width; // See https://www.w3.org/TR/2000/WD-MathML2-20000328/chapter6.html
        // for a table of space-like characters.  We use Unicode
        // representations instead of &LongNames; as it's not clear how to
        // make the latter via document.createTextNode.

        if (width >= 0.05555 && width <= 0.05556) {
          this.character = "\u200a"; // &VeryThinSpace;
        } else if (width >= 0.1666 && width <= 0.1667) {
          this.character = "\u2009"; // &ThinSpace;
        } else if (width >= 0.2222 && width <= 0.2223) {
          this.character = "\u2005"; // &MediumSpace;
        } else if (width >= 0.2777 && width <= 0.2778) {
          this.character = "\u2005\u200a"; // &ThickSpace;
        } else if (width >= -0.05556 && width <= -0.05555) {
          this.character = "\u200a\u2063"; // &NegativeVeryThinSpace;
        } else if (width >= -0.1667 && width <= -0.1666) {
          this.character = "\u2009\u2063"; // &NegativeThinSpace;
        } else if (width >= -0.2223 && width <= -0.2222) {
          this.character = "\u205f\u2063"; // &NegativeMediumSpace;
        } else if (width >= -0.2778 && width <= -0.2777) {
          this.character = "\u2005\u2063"; // &NegativeThickSpace;
        } else {
          this.character = null;
        }
      }
      /**
       * Converts the math node into a MathML-namespaced DOM element.
       */


      toNode() {
        if (this.character) {
          return document.createTextNode(this.character);
        } else {
          var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
          node.setAttribute("width", makeEm(this.width));
          return node;
        }
      }
      /**
       * Converts the math node into an HTML markup string.
       */


      toMarkup() {
        if (this.character) {
          return "<mtext>" + this.character + "</mtext>";
        } else {
          return "<mspace width=\"" + makeEm(this.width) + "\"/>";
        }
      }
      /**
       * Converts the math node into a string, similar to innerText.
       */


      toText() {
        if (this.character) {
          return this.character;
        } else {
          return " ";
        }
      }

    }

    var mathMLTree = {
      MathNode,
      TextNode,
      SpaceNode,
      newDocumentFragment
    };

    /**
     * This file converts a parse tree into a corresponding MathML tree. The main
     * entry point is the `buildMathML` function, which takes a parse tree from the
     * parser.
     */

    /**
     * Takes a symbol and converts it into a MathML text node after performing
     * optional replacement from symbols.js.
     */
    var makeText = function makeText(text, mode, options) {
      if (symbols[mode][text] && symbols[mode][text].replace && text.charCodeAt(0) !== 0xD835 && !(ligatures.hasOwnProperty(text) && options && (options.fontFamily && options.fontFamily.slice(4, 6) === "tt" || options.font && options.font.slice(4, 6) === "tt"))) {
        text = symbols[mode][text].replace;
      }

      return new mathMLTree.TextNode(text);
    };
    /**
     * Wrap the given array of nodes in an <mrow> node if needed, i.e.,
     * unless the array has length 1.  Always returns a single node.
     */

    var makeRow = function makeRow(body) {
      if (body.length === 1) {
        return body[0];
      } else {
        return new mathMLTree.MathNode("mrow", body);
      }
    };
    /**
     * Returns the math variant as a string or null if none is required.
     */

    var getVariant = function getVariant(group, options) {
      // Handle \text... font specifiers as best we can.
      // MathML has a limited list of allowable mathvariant specifiers; see
      // https://www.w3.org/TR/MathML3/chapter3.html#presm.commatt
      if (options.fontFamily === "texttt") {
        return "monospace";
      } else if (options.fontFamily === "textsf") {
        if (options.fontShape === "textit" && options.fontWeight === "textbf") {
          return "sans-serif-bold-italic";
        } else if (options.fontShape === "textit") {
          return "sans-serif-italic";
        } else if (options.fontWeight === "textbf") {
          return "bold-sans-serif";
        } else {
          return "sans-serif";
        }
      } else if (options.fontShape === "textit" && options.fontWeight === "textbf") {
        return "bold-italic";
      } else if (options.fontShape === "textit") {
        return "italic";
      } else if (options.fontWeight === "textbf") {
        return "bold";
      }

      var font = options.font;

      if (!font || font === "mathnormal") {
        return null;
      }

      var mode = group.mode;

      if (font === "mathit") {
        return "italic";
      } else if (font === "boldsymbol") {
        return group.type === "textord" ? "bold" : "bold-italic";
      } else if (font === "mathbf") {
        return "bold";
      } else if (font === "mathbb") {
        return "double-struck";
      } else if (font === "mathfrak") {
        return "fraktur";
      } else if (font === "mathscr" || font === "mathcal") {
        // MathML makes no distinction between script and calligraphic
        return "script";
      } else if (font === "mathsf") {
        return "sans-serif";
      } else if (font === "mathtt") {
        return "monospace";
      }

      var text = group.text;

      if (utils.contains(["\\imath", "\\jmath"], text)) {
        return null;
      }

      if (symbols[mode][text] && symbols[mode][text].replace) {
        text = symbols[mode][text].replace;
      }

      var fontName = buildCommon.fontMap[font].fontName;

      if (getCharacterMetrics(text, fontName, mode)) {
        return buildCommon.fontMap[font].variant;
      }

      return null;
    };
    /**
     * Takes a list of nodes, builds them, and returns a list of the generated
     * MathML nodes.  Also combine consecutive <mtext> outputs into a single
     * <mtext> tag.
     */

    var buildExpression = function buildExpression(expression, options, isOrdgroup) {
      if (expression.length === 1) {
        var group = buildGroup(expression[0], options);

        if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
          // When TeX writers want to suppress spacing on an operator,
          // they often put the operator by itself inside braces.
          group.setAttribute("lspace", "0em");
          group.setAttribute("rspace", "0em");
        }

        return [group];
      }

      var groups = [];
      var lastGroup;

      for (var i = 0; i < expression.length; i++) {
        var _group = buildGroup(expression[i], options);

        if (_group instanceof MathNode && lastGroup instanceof MathNode) {
          // Concatenate adjacent <mtext>s
          if (_group.type === 'mtext' && lastGroup.type === 'mtext' && _group.getAttribute('mathvariant') === lastGroup.getAttribute('mathvariant')) {
            lastGroup.children.push(..._group.children);
            continue; // Concatenate adjacent <mn>s
          } else if (_group.type === 'mn' && lastGroup.type === 'mn') {
            lastGroup.children.push(..._group.children);
            continue; // Concatenate <mn>...</mn> followed by <mi>.</mi>
          } else if (_group.type === 'mi' && _group.children.length === 1 && lastGroup.type === 'mn') {
            var child = _group.children[0];

            if (child instanceof TextNode && child.text === '.') {
              lastGroup.children.push(..._group.children);
              continue;
            }
          } else if (lastGroup.type === 'mi' && lastGroup.children.length === 1) {
            var lastChild = lastGroup.children[0];

            if (lastChild instanceof TextNode && lastChild.text === '\u0338' && (_group.type === 'mo' || _group.type === 'mi' || _group.type === 'mn')) {
              var _child = _group.children[0];

              if (_child instanceof TextNode && _child.text.length > 0) {
                // Overlay with combining character long solidus
                _child.text = _child.text.slice(0, 1) + "\u0338" + _child.text.slice(1);
                groups.pop();
              }
            }
          }
        }

        groups.push(_group);
        lastGroup = _group;
      }

      return groups;
    };
    /**
     * Equivalent to buildExpression, but wraps the elements in an <mrow>
     * if there's more than one.  Returns a single node instead of an array.
     */

    var buildExpressionRow = function buildExpressionRow(expression, options, isOrdgroup) {
      return makeRow(buildExpression(expression, options, isOrdgroup));
    };
    /**
     * Takes a group from the parser and calls the appropriate groupBuilders function
     * on it to produce a MathML node.
     */

    var buildGroup = function buildGroup(group, options) {
      if (!group) {
        return new mathMLTree.MathNode("mrow");
      }

      if (_mathmlGroupBuilders[group.type]) {
        // Call the groupBuilders function
        // $FlowFixMe
        var result = _mathmlGroupBuilders[group.type](group, options); // $FlowFixMe

        return result;
      } else {
        throw new ParseError("Got group of unknown type: '" + group.type + "'");
      }
    };
    /**
     * Takes a full parse tree and settings and builds a MathML representation of
     * it. In particular, we put the elements from building the parse tree into a
     * <semantics> tag so we can also include that TeX source as an annotation.
     *
     * Note that we actually return a domTree element with a `<math>` inside it so
     * we can do appropriate styling.
     */

    function buildMathML(tree, texExpression, options, isDisplayMode, forMathmlOnly) {
      var expression = buildExpression(tree, options); // TODO: Make a pass thru the MathML similar to buildHTML.traverseNonSpaceNodes
      // and add spacing nodes. This is necessary only adjacent to math operators
      // like \sin or \lim or to subsup elements that contain math operators.
      // MathML takes care of the other spacing issues.
      // Wrap up the expression in an mrow so it is presented in the semantics
      // tag correctly, unless it's a single <mrow> or <mtable>.

      var wrapper;

      if (expression.length === 1 && expression[0] instanceof MathNode && utils.contains(["mrow", "mtable"], expression[0].type)) {
        wrapper = expression[0];
      } else {
        wrapper = new mathMLTree.MathNode("mrow", expression);
      } // Build a TeX annotation of the source


      var annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
      annotation.setAttribute("encoding", "application/x-tex");
      var semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
      var math = new mathMLTree.MathNode("math", [semantics]);
      math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");

      if (isDisplayMode) {
        math.setAttribute("display", "block");
      } // You can't style <math> nodes, so we wrap the node in a span.
      // NOTE: The span class is not typed to have <math> nodes as children, and
      // we don't want to make the children type more generic since the children
      // of span are expected to have more fields in `buildHtml` contexts.


      var wrapperClass = forMathmlOnly ? "katex" : "katex-mathml"; // $FlowFixMe

      return buildCommon.makeSpan([wrapperClass], [math]);
    }

    var optionsFromSettings = function optionsFromSettings(settings) {
      return new Options({
        style: settings.displayMode ? Style$1.DISPLAY : Style$1.TEXT,
        maxSize: settings.maxSize,
        minRuleThickness: settings.minRuleThickness
      });
    };

    var displayWrap = function displayWrap(node, settings) {
      if (settings.displayMode) {
        var classes = ["katex-display"];

        if (settings.leqno) {
          classes.push("leqno");
        }

        if (settings.fleqn) {
          classes.push("fleqn");
        }

        node = buildCommon.makeSpan(classes, [node]);
      }

      return node;
    };

    var buildTree = function buildTree(tree, expression, settings) {
      var options = optionsFromSettings(settings);
      var katexNode;

      if (settings.output === "mathml") {
        return buildMathML(tree, expression, options, settings.displayMode, true);
      } else if (settings.output === "html") {
        var htmlNode = buildHTML(tree, options);
        katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
      } else {
        var mathMLNode = buildMathML(tree, expression, options, settings.displayMode, false);

        var _htmlNode = buildHTML(tree, options);

        katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, _htmlNode]);
      }

      return displayWrap(katexNode, settings);
    };
    var buildHTMLTree = function buildHTMLTree(tree, expression, settings) {
      var options = optionsFromSettings(settings);
      var htmlNode = buildHTML(tree, options);
      var katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
      return displayWrap(katexNode, settings);
    };

    /**
     * This file provides support to buildMathML.js and buildHTML.js
     * for stretchy wide elements rendered from SVG files
     * and other CSS trickery.
     */
    var stretchyCodePoint = {
      widehat: "^",
      widecheck: "ˇ",
      widetilde: "~",
      utilde: "~",
      overleftarrow: "\u2190",
      underleftarrow: "\u2190",
      xleftarrow: "\u2190",
      overrightarrow: "\u2192",
      underrightarrow: "\u2192",
      xrightarrow: "\u2192",
      underbrace: "\u23df",
      overbrace: "\u23de",
      overgroup: "\u23e0",
      undergroup: "\u23e1",
      overleftrightarrow: "\u2194",
      underleftrightarrow: "\u2194",
      xleftrightarrow: "\u2194",
      Overrightarrow: "\u21d2",
      xRightarrow: "\u21d2",
      overleftharpoon: "\u21bc",
      xleftharpoonup: "\u21bc",
      overrightharpoon: "\u21c0",
      xrightharpoonup: "\u21c0",
      xLeftarrow: "\u21d0",
      xLeftrightarrow: "\u21d4",
      xhookleftarrow: "\u21a9",
      xhookrightarrow: "\u21aa",
      xmapsto: "\u21a6",
      xrightharpoondown: "\u21c1",
      xleftharpoondown: "\u21bd",
      xrightleftharpoons: "\u21cc",
      xleftrightharpoons: "\u21cb",
      xtwoheadleftarrow: "\u219e",
      xtwoheadrightarrow: "\u21a0",
      xlongequal: "=",
      xtofrom: "\u21c4",
      xrightleftarrows: "\u21c4",
      xrightequilibrium: "\u21cc",
      // Not a perfect match.
      xleftequilibrium: "\u21cb",
      // None better available.
      "\\cdrightarrow": "\u2192",
      "\\cdleftarrow": "\u2190",
      "\\cdlongequal": "="
    };

    var mathMLnode = function mathMLnode(label) {
      var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.replace(/^\\/, '')])]);
      node.setAttribute("stretchy", "true");
      return node;
    }; // Many of the KaTeX SVG images have been adapted from glyphs in KaTeX fonts.
    // Copyright (c) 2009-2010, Design Science, Inc. (<www.mathjax.org>)
    // Copyright (c) 2014-2017 Khan Academy (<www.khanacademy.org>)
    // Licensed under the SIL Open Font License, Version 1.1.
    // See \nhttp://scripts.sil.org/OFL
    // Very Long SVGs
    //    Many of the KaTeX stretchy wide elements use a long SVG image and an
    //    overflow: hidden tactic to achieve a stretchy image while avoiding
    //    distortion of arrowheads or brace corners.
    //    The SVG typically contains a very long (400 em) arrow.
    //    The SVG is in a container span that has overflow: hidden, so the span
    //    acts like a window that exposes only part of the  SVG.
    //    The SVG always has a longer, thinner aspect ratio than the container span.
    //    After the SVG fills 100% of the height of the container span,
    //    there is a long arrow shaft left over. That left-over shaft is not shown.
    //    Instead, it is sliced off because the span's CSS has overflow: hidden.
    //    Thus, the reader sees an arrow that matches the subject matter width
    //    without distortion.
    //    Some functions, such as \cancel, need to vary their aspect ratio. These
    //    functions do not get the overflow SVG treatment.
    // Second Brush Stroke
    //    Low resolution monitors struggle to display images in fine detail.
    //    So browsers apply anti-aliasing. A long straight arrow shaft therefore
    //    will sometimes appear as if it has a blurred edge.
    //    To mitigate this, these SVG files contain a second "brush-stroke" on the
    //    arrow shafts. That is, a second long thin rectangular SVG path has been
    //    written directly on top of each arrow shaft. This reinforcement causes
    //    some of the screen pixels to display as black instead of the anti-aliased
    //    gray pixel that a  single path would generate. So we get arrow shafts
    //    whose edges appear to be sharper.
    // In the katexImagesData object just below, the dimensions all
    // correspond to path geometry inside the relevant SVG.
    // For example, \overrightarrow uses the same arrowhead as glyph U+2192
    // from the KaTeX Main font. The scaling factor is 1000.
    // That is, inside the font, that arrowhead is 522 units tall, which
    // corresponds to 0.522 em inside the document.


    var katexImagesData = {
      //   path(s), minWidth, height, align
      overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
      overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
      underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
      underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
      xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
      "\\cdrightarrow": [["rightarrow"], 3.0, 522, "xMaxYMin"],
      // CD minwwidth2.5pc
      xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
      "\\cdleftarrow": [["leftarrow"], 3.0, 522, "xMinYMin"],
      Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
      xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
      xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
      overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
      xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
      xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
      overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
      xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
      xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
      xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
      "\\cdlongequal": [["longequal"], 3.0, 334, "xMinYMin"],
      xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
      xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
      overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
      overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
      underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
      underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
      xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
      xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
      xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
      xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
      xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
      xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
      overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
      underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
      overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
      undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
      xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
      xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
      // The next three arrows are from the mhchem package.
      // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
      // document as \xrightarrow or \xrightleftharpoons. Those have
      // min-length = 1.75em, so we set min-length on these next three to match.
      xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
      xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
      xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
    };

    var groupLength = function groupLength(arg) {
      if (arg.type === "ordgroup") {
        return arg.body.length;
      } else {
        return 1;
      }
    };

    var svgSpan = function svgSpan(group, options) {
      // Create a span with inline SVG for the element.
      function buildSvgSpan_() {
        var viewBoxWidth = 400000; // default

        var label = group.label.slice(1);

        if (utils.contains(["widehat", "widecheck", "widetilde", "utilde"], label)) {
          // Each type in the `if` statement corresponds to one of the ParseNode
          // types below. This narrowing is required to access `grp.base`.
          // $FlowFixMe
          var grp = group; // There are four SVG images available for each function.
          // Choose a taller image when there are more characters.

          var numChars = groupLength(grp.base);
          var viewBoxHeight;
          var pathName;

          var _height;

          if (numChars > 5) {
            if (label === "widehat" || label === "widecheck") {
              viewBoxHeight = 420;
              viewBoxWidth = 2364;
              _height = 0.42;
              pathName = label + "4";
            } else {
              viewBoxHeight = 312;
              viewBoxWidth = 2340;
              _height = 0.34;
              pathName = "tilde4";
            }
          } else {
            var imgIndex = [1, 1, 2, 2, 3, 3][numChars];

            if (label === "widehat" || label === "widecheck") {
              viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
              viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
              _height = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
              pathName = label + imgIndex;
            } else {
              viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
              viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
              _height = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
              pathName = "tilde" + imgIndex;
            }
          }

          var path = new PathNode(pathName);
          var svgNode = new SvgNode([path], {
            "width": "100%",
            "height": makeEm(_height),
            "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
            "preserveAspectRatio": "none"
          });
          return {
            span: buildCommon.makeSvgSpan([], [svgNode], options),
            minWidth: 0,
            height: _height
          };
        } else {
          var spans = [];
          var data = katexImagesData[label];
          var [paths, _minWidth, _viewBoxHeight] = data;

          var _height2 = _viewBoxHeight / 1000;

          var numSvgChildren = paths.length;
          var widthClasses;
          var aligns;

          if (numSvgChildren === 1) {
            // $FlowFixMe: All these cases must be of the 4-tuple type.
            var align1 = data[3];
            widthClasses = ["hide-tail"];
            aligns = [align1];
          } else if (numSvgChildren === 2) {
            widthClasses = ["halfarrow-left", "halfarrow-right"];
            aligns = ["xMinYMin", "xMaxYMin"];
          } else if (numSvgChildren === 3) {
            widthClasses = ["brace-left", "brace-center", "brace-right"];
            aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
          } else {
            throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
          }

          for (var i = 0; i < numSvgChildren; i++) {
            var _path = new PathNode(paths[i]);

            var _svgNode = new SvgNode([_path], {
              "width": "400em",
              "height": makeEm(_height2),
              "viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
              "preserveAspectRatio": aligns[i] + " slice"
            });

            var _span = buildCommon.makeSvgSpan([widthClasses[i]], [_svgNode], options);

            if (numSvgChildren === 1) {
              return {
                span: _span,
                minWidth: _minWidth,
                height: _height2
              };
            } else {
              _span.style.height = makeEm(_height2);
              spans.push(_span);
            }
          }

          return {
            span: buildCommon.makeSpan(["stretchy"], spans, options),
            minWidth: _minWidth,
            height: _height2
          };
        }
      } // buildSvgSpan_()


      var {
        span,
        minWidth,
        height
      } = buildSvgSpan_(); // Note that we are returning span.depth = 0.
      // Any adjustments relative to the baseline must be done in buildHTML.

      span.height = height;
      span.style.height = makeEm(height);

      if (minWidth > 0) {
        span.style.minWidth = makeEm(minWidth);
      }

      return span;
    };

    var encloseSpan = function encloseSpan(inner, label, topPad, bottomPad, options) {
      // Return an image span for \cancel, \bcancel, \xcancel, \fbox, or \angl
      var img;
      var totalHeight = inner.height + inner.depth + topPad + bottomPad;

      if (/fbox|color|angl/.test(label)) {
        img = buildCommon.makeSpan(["stretchy", label], [], options);

        if (label === "fbox") {
          var color = options.color && options.getColor();

          if (color) {
            img.style.borderColor = color;
          }
        }
      } else {
        // \cancel, \bcancel, or \xcancel
        // Since \cancel's SVG is inline and it omits the viewBox attribute,
        // its stroke-width will not vary with span area.
        var lines = [];

        if (/^[bx]cancel$/.test(label)) {
          lines.push(new LineNode({
            "x1": "0",
            "y1": "0",
            "x2": "100%",
            "y2": "100%",
            "stroke-width": "0.046em"
          }));
        }

        if (/^x?cancel$/.test(label)) {
          lines.push(new LineNode({
            "x1": "0",
            "y1": "100%",
            "x2": "100%",
            "y2": "0",
            "stroke-width": "0.046em"
          }));
        }

        var svgNode = new SvgNode(lines, {
          "width": "100%",
          "height": makeEm(totalHeight)
        });
        img = buildCommon.makeSvgSpan([], [svgNode], options);
      }

      img.height = totalHeight;
      img.style.height = makeEm(totalHeight);
      return img;
    };

    var stretchy = {
      encloseSpan,
      mathMLnode,
      svgSpan
    };

    /**
     * Asserts that the node is of the given type and returns it with stricter
     * typing. Throws if the node's type does not match.
     */
    function assertNodeType(node, type) {
      if (!node || node.type !== type) {
        throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
      } // $FlowFixMe, >=0.125


      return node;
    }
    /**
     * Returns the node more strictly typed iff it is of the given type. Otherwise,
     * returns null.
     */

    function assertSymbolNodeType(node) {
      var typedNode = checkSymbolNodeType(node);

      if (!typedNode) {
        throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
      }

      return typedNode;
    }
    /**
     * Returns the node more strictly typed iff it is of the given type. Otherwise,
     * returns null.
     */

    function checkSymbolNodeType(node) {
      if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) {
        // $FlowFixMe
        return node;
      }

      return null;
    }

    // NOTE: Unlike most `htmlBuilder`s, this one handles not only "accent", but
    // also "supsub" since an accent can affect super/subscripting.
    var htmlBuilder$a = (grp, options) => {
      // Accents are handled in the TeXbook pg. 443, rule 12.
      var base;
      var group;
      var supSubGroup;

      if (grp && grp.type === "supsub") {
        // If our base is a character box, and we have superscripts and
        // subscripts, the supsub will defer to us. In particular, we want
        // to attach the superscripts and subscripts to the inner body (so
        // that the position of the superscripts and subscripts won't be
        // affected by the height of the accent). We accomplish this by
        // sticking the base of the accent into the base of the supsub, and
        // rendering that, while keeping track of where the accent is.
        // The real accent group is the base of the supsub group
        group = assertNodeType(grp.base, "accent"); // The character box is the base of the accent group

        base = group.base; // Stick the character box into the base of the supsub group

        grp.base = base; // Rerender the supsub group with its new base, and store that
        // result.

        supSubGroup = assertSpan(buildGroup$1(grp, options)); // reset original base

        grp.base = group;
      } else {
        group = assertNodeType(grp, "accent");
        base = group.base;
      } // Build the base group


      var body = buildGroup$1(base, options.havingCrampedStyle()); // Does the accent need to shift for the skew of a character?

      var mustShift = group.isShifty && utils.isCharacterBox(base); // Calculate the skew of the accent. This is based on the line "If the
      // nucleus is not a single character, let s = 0; otherwise set s to the
      // kern amount for the nucleus followed by the \skewchar of its font."
      // Note that our skew metrics are just the kern between each character
      // and the skewchar.

      var skew = 0;

      if (mustShift) {
        // If the base is a character box, then we want the skew of the
        // innermost character. To do that, we find the innermost character:
        var baseChar = utils.getBaseElem(base); // Then, we render its group to get the symbol inside it

        var baseGroup = buildGroup$1(baseChar, options.havingCrampedStyle()); // Finally, we pull the skew off of the symbol.

        skew = assertSymbolDomNode(baseGroup).skew; // Note that we now throw away baseGroup, because the layers we
        // removed with getBaseElem might contain things like \color which
        // we can't get rid of.
        // TODO(emily): Find a better way to get the skew
      }

      var accentBelow = group.label === "\\c"; // calculate the amount of space between the body and the accent

      var clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options.fontMetrics().xHeight); // Build the accent

      var accentBody;

      if (!group.isStretchy) {
        var accent;
        var width;

        if (group.label === "\\vec") {
          // Before version 0.9, \vec used the combining font glyph U+20D7.
          // But browsers, especially Safari, are not consistent in how they
          // render combining characters when not preceded by a character.
          // So now we use an SVG.
          // If Safari reforms, we should consider reverting to the glyph.
          accent = buildCommon.staticSvg("vec", options);
          width = buildCommon.svgData.vec[1];
        } else {
          accent = buildCommon.makeOrd({
            mode: group.mode,
            text: group.label
          }, options, "textord");
          accent = assertSymbolDomNode(accent); // Remove the italic correction of the accent, because it only serves to
          // shift the accent over to a place we don't want.

          accent.italic = 0;
          width = accent.width;

          if (accentBelow) {
            clearance += accent.depth;
          }
        }

        accentBody = buildCommon.makeSpan(["accent-body"], [accent]); // "Full" accents expand the width of the resulting symbol to be
        // at least the width of the accent, and overlap directly onto the
        // character without any vertical offset.

        var accentFull = group.label === "\\textcircled";

        if (accentFull) {
          accentBody.classes.push('accent-full');
          clearance = body.height;
        } // Shift the accent over by the skew.


        var left = skew; // CSS defines `.katex .accent .accent-body:not(.accent-full) { width: 0 }`
        // so that the accent doesn't contribute to the bounding box.
        // We need to shift the character by its width (effectively half
        // its width) to compensate.

        if (!accentFull) {
          left -= width / 2;
        }

        accentBody.style.left = makeEm(left); // \textcircled uses the \bigcirc glyph, so it needs some
        // vertical adjustment to match LaTeX.

        if (group.label === "\\textcircled") {
          accentBody.style.top = ".2em";
        }

        accentBody = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: body
          }, {
            type: "kern",
            size: -clearance
          }, {
            type: "elem",
            elem: accentBody
          }]
        }, options);
      } else {
        accentBody = stretchy.svgSpan(group, options);
        accentBody = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: body
          }, {
            type: "elem",
            elem: accentBody,
            wrapperClasses: ["svg-align"],
            wrapperStyle: skew > 0 ? {
              width: "calc(100% - " + makeEm(2 * skew) + ")",
              marginLeft: makeEm(2 * skew)
            } : undefined
          }]
        }, options);
      }

      var accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options);

      if (supSubGroup) {
        // Here, we replace the "base" child of the supsub with our newly
        // generated accent.
        supSubGroup.children[0] = accentWrap; // Since we don't rerun the height calculation after replacing the
        // accent, we manually recalculate height.

        supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height); // Accents should always be ords, even when their innards are not.

        supSubGroup.classes[0] = "mord";
        return supSubGroup;
      } else {
        return accentWrap;
      }
    };

    var mathmlBuilder$9 = (group, options) => {
      var accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [makeText(group.label, group.mode)]);
      var node = new mathMLTree.MathNode("mover", [buildGroup(group.base, options), accentNode]);
      node.setAttribute("accent", "true");
      return node;
    };

    var NON_STRETCHY_ACCENT_REGEX = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map(accent => "\\" + accent).join("|")); // Accents

    defineFunction({
      type: "accent",
      names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
      props: {
        numArgs: 1
      },
      handler: (context, args) => {
        var base = normalizeArgument(args[0]);
        var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
        var isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
        return {
          type: "accent",
          mode: context.parser.mode,
          label: context.funcName,
          isStretchy: isStretchy,
          isShifty: isShifty,
          base: base
        };
      },
      htmlBuilder: htmlBuilder$a,
      mathmlBuilder: mathmlBuilder$9
    }); // Text-mode accents

    defineFunction({
      type: "accent",
      names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
      props: {
        numArgs: 1,
        allowedInText: true,
        allowedInMath: true,
        // unless in strict mode
        argTypes: ["primitive"]
      },
      handler: (context, args) => {
        var base = args[0];
        var mode = context.parser.mode;

        if (mode === "math") {
          context.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context.funcName + " works only in text mode");
          mode = "text";
        }

        return {
          type: "accent",
          mode: mode,
          label: context.funcName,
          isStretchy: false,
          isShifty: true,
          base: base
        };
      },
      htmlBuilder: htmlBuilder$a,
      mathmlBuilder: mathmlBuilder$9
    });

    // Horizontal overlap functions
    defineFunction({
      type: "accentUnder",
      names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
      props: {
        numArgs: 1
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var base = args[0];
        return {
          type: "accentUnder",
          mode: parser.mode,
          label: funcName,
          base: base
        };
      },
      htmlBuilder: (group, options) => {
        // Treat under accents much like underlines.
        var innerGroup = buildGroup$1(group.base, options);
        var accentBody = stretchy.svgSpan(group, options);
        var kern = group.label === "\\utilde" ? 0.12 : 0; // Generate the vlist, with the appropriate kerns

        var vlist = buildCommon.makeVList({
          positionType: "top",
          positionData: innerGroup.height,
          children: [{
            type: "elem",
            elem: accentBody,
            wrapperClasses: ["svg-align"]
          }, {
            type: "kern",
            size: kern
          }, {
            type: "elem",
            elem: innerGroup
          }]
        }, options);
        return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options);
      },
      mathmlBuilder: (group, options) => {
        var accentNode = stretchy.mathMLnode(group.label);
        var node = new mathMLTree.MathNode("munder", [buildGroup(group.base, options), accentNode]);
        node.setAttribute("accentunder", "true");
        return node;
      }
    });

    // Helper function
    var paddedNode = group => {
      var node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
      node.setAttribute("width", "+0.6em");
      node.setAttribute("lspace", "0.3em");
      return node;
    }; // Stretchy arrows with an optional argument


    defineFunction({
      type: "xArrow",
      names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", // The next 3 functions are here to support the mhchem extension.
      // Direct use of these functions is discouraged and may break someday.
      "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", // The next 3 functions are here only to support the {CD} environment.
      "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"],
      props: {
        numArgs: 1,
        numOptionalArgs: 1
      },

      handler(_ref, args, optArgs) {
        var {
          parser,
          funcName
        } = _ref;
        return {
          type: "xArrow",
          mode: parser.mode,
          label: funcName,
          body: args[0],
          below: optArgs[0]
        };
      },

      // Flow is unable to correctly infer the type of `group`, even though it's
      // unambiguously determined from the passed-in `type` above.
      htmlBuilder(group, options) {
        var style = options.style; // Build the argument groups in the appropriate style.
        // Ref: amsmath.dtx:   \hbox{$\scriptstyle\mkern#3mu{#6}\mkern#4mu$}%
        // Some groups can return document fragments.  Handle those by wrapping
        // them in a span.

        var newOptions = options.havingStyle(style.sup());
        var upperGroup = buildCommon.wrapFragment(buildGroup$1(group.body, newOptions, options), options);
        var arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
        upperGroup.classes.push(arrowPrefix + "-arrow-pad");
        var lowerGroup;

        if (group.below) {
          // Build the lower group
          newOptions = options.havingStyle(style.sub());
          lowerGroup = buildCommon.wrapFragment(buildGroup$1(group.below, newOptions, options), options);
          lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
        }

        var arrowBody = stretchy.svgSpan(group, options); // Re shift: Note that stretchy.svgSpan returned arrowBody.depth = 0.
        // The point we want on the math axis is at 0.5 * arrowBody.height.

        var arrowShift = -options.fontMetrics().axisHeight + 0.5 * arrowBody.height; // 2 mu kern. Ref: amsmath.dtx: #7\if0#2\else\mkern#2mu\fi

        var upperShift = -options.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111; // 0.111 em = 2 mu

        if (upperGroup.depth > 0.25 || group.label === "\\xleftequilibrium") {
          upperShift -= upperGroup.depth; // shift up if depth encroaches
        } // Generate the vlist


        var vlist;

        if (lowerGroup) {
          var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
          vlist = buildCommon.makeVList({
            positionType: "individualShift",
            children: [{
              type: "elem",
              elem: upperGroup,
              shift: upperShift
            }, {
              type: "elem",
              elem: arrowBody,
              shift: arrowShift
            }, {
              type: "elem",
              elem: lowerGroup,
              shift: lowerShift
            }]
          }, options);
        } else {
          vlist = buildCommon.makeVList({
            positionType: "individualShift",
            children: [{
              type: "elem",
              elem: upperGroup,
              shift: upperShift
            }, {
              type: "elem",
              elem: arrowBody,
              shift: arrowShift
            }]
          }, options);
        } // $FlowFixMe: Replace this with passing "svg-align" into makeVList.


        vlist.children[0].children[0].children[1].classes.push("svg-align");
        return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options);
      },

      mathmlBuilder(group, options) {
        var arrowNode = stretchy.mathMLnode(group.label);
        arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
        var node;

        if (group.body) {
          var upperNode = paddedNode(buildGroup(group.body, options));

          if (group.below) {
            var lowerNode = paddedNode(buildGroup(group.below, options));
            node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
          } else {
            node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
          }
        } else if (group.below) {
          var _lowerNode = paddedNode(buildGroup(group.below, options));

          node = new mathMLTree.MathNode("munder", [arrowNode, _lowerNode]);
        } else {
          // This should never happen.
          // Parser.js throws an error if there is no argument.
          node = paddedNode();
          node = new mathMLTree.MathNode("mover", [arrowNode, node]);
        }

        return node;
      }

    });

    var makeSpan = buildCommon.makeSpan;

    function htmlBuilder$9(group, options) {
      var elements = buildExpression$1(group.body, options, true);
      return makeSpan([group.mclass], elements, options);
    }

    function mathmlBuilder$8(group, options) {
      var node;
      var inner = buildExpression(group.body, options);

      if (group.mclass === "minner") {
        node = new mathMLTree.MathNode("mpadded", inner);
      } else if (group.mclass === "mord") {
        if (group.isCharacterBox) {
          node = inner[0];
          node.type = "mi";
        } else {
          node = new mathMLTree.MathNode("mi", inner);
        }
      } else {
        if (group.isCharacterBox) {
          node = inner[0];
          node.type = "mo";
        } else {
          node = new mathMLTree.MathNode("mo", inner);
        } // Set spacing based on what is the most likely adjacent atom type.
        // See TeXbook p170.


        if (group.mclass === "mbin") {
          node.attributes.lspace = "0.22em"; // medium space

          node.attributes.rspace = "0.22em";
        } else if (group.mclass === "mpunct") {
          node.attributes.lspace = "0em";
          node.attributes.rspace = "0.17em"; // thinspace
        } else if (group.mclass === "mopen" || group.mclass === "mclose") {
          node.attributes.lspace = "0em";
          node.attributes.rspace = "0em";
        } else if (group.mclass === "minner") {
          node.attributes.lspace = "0.0556em"; // 1 mu is the most likely option

          node.attributes.width = "+0.1111em";
        } // MathML <mo> default space is 5/18 em, so <mrel> needs no action.
        // Ref: https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo

      }

      return node;
    } // Math class commands except \mathop


    defineFunction({
      type: "mclass",
      names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
      props: {
        numArgs: 1,
        primitive: true
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        var body = args[0];
        return {
          type: "mclass",
          mode: parser.mode,
          mclass: "m" + funcName.slice(5),
          // TODO(kevinb): don't prefix with 'm'
          body: ordargument(body),
          isCharacterBox: utils.isCharacterBox(body)
        };
      },

      htmlBuilder: htmlBuilder$9,
      mathmlBuilder: mathmlBuilder$8
    });
    var binrelClass = arg => {
      // \binrel@ spacing varies with (bin|rel|ord) of the atom in the argument.
      // (by rendering separately and with {}s before and after, and measuring
      // the change in spacing).  We'll do roughly the same by detecting the
      // atom type directly.
      var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;

      if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
        return "m" + atom.family;
      } else {
        return "mord";
      }
    }; // \@binrel{x}{y} renders like y but as mbin/mrel/mord if x is mbin/mrel/mord.
    // This is equivalent to \binrel@{x}\binrel@@{y} in AMSTeX.

    defineFunction({
      type: "mclass",
      names: ["\\@binrel"],
      props: {
        numArgs: 2
      },

      handler(_ref2, args) {
        var {
          parser
        } = _ref2;
        return {
          type: "mclass",
          mode: parser.mode,
          mclass: binrelClass(args[0]),
          body: ordargument(args[1]),
          isCharacterBox: utils.isCharacterBox(args[1])
        };
      }

    }); // Build a relation or stacked op by placing one symbol on top of another

    defineFunction({
      type: "mclass",
      names: ["\\stackrel", "\\overset", "\\underset"],
      props: {
        numArgs: 2
      },

      handler(_ref3, args) {
        var {
          parser,
          funcName
        } = _ref3;
        var baseArg = args[1];
        var shiftedArg = args[0];
        var mclass;

        if (funcName !== "\\stackrel") {
          // LaTeX applies \binrel spacing to \overset and \underset.
          mclass = binrelClass(baseArg);
        } else {
          mclass = "mrel"; // for \stackrel
        }

        var baseOp = {
          type: "op",
          mode: baseArg.mode,
          limits: true,
          alwaysHandleSupSub: true,
          parentIsSupSub: false,
          symbol: false,
          suppressBaseShift: funcName !== "\\stackrel",
          body: ordargument(baseArg)
        };
        var supsub = {
          type: "supsub",
          mode: shiftedArg.mode,
          base: baseOp,
          sup: funcName === "\\underset" ? null : shiftedArg,
          sub: funcName === "\\underset" ? shiftedArg : null
        };
        return {
          type: "mclass",
          mode: parser.mode,
          mclass,
          body: [supsub],
          isCharacterBox: utils.isCharacterBox(supsub)
        };
      },

      htmlBuilder: htmlBuilder$9,
      mathmlBuilder: mathmlBuilder$8
    });

    // \pmb is a simulation of bold font.
    // The version of \pmb in ambsy.sty works by typesetting three copies
    // with small offsets. We use CSS text-shadow.
    // It's a hack. Not as good as a real bold font. Better than nothing.
    defineFunction({
      type: "pmb",
      names: ["\\pmb"],
      props: {
        numArgs: 1,
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        return {
          type: "pmb",
          mode: parser.mode,
          mclass: binrelClass(args[0]),
          body: ordargument(args[0])
        };
      },

      htmlBuilder(group, options) {
        var elements = buildExpression$1(group.body, options, true);
        var node = buildCommon.makeSpan([group.mclass], elements, options);
        node.style.textShadow = "0.02em 0.01em 0.04px";
        return node;
      },

      mathmlBuilder(group, style) {
        var inner = buildExpression(group.body, style); // Wrap with an <mstyle> element.

        var node = new mathMLTree.MathNode("mstyle", inner);
        node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px");
        return node;
      }

    });

    var cdArrowFunctionName = {
      ">": "\\\\cdrightarrow",
      "<": "\\\\cdleftarrow",
      "=": "\\\\cdlongequal",
      "A": "\\uparrow",
      "V": "\\downarrow",
      "|": "\\Vert",
      ".": "no arrow"
    };

    var newCell = () => {
      // Create an empty cell, to be filled below with parse nodes.
      // The parseTree from this module must be constructed like the
      // one created by parseArray(), so an empty CD cell must
      // be a ParseNode<"styling">. And CD is always displaystyle.
      // So these values are fixed and flow can do implicit typing.
      return {
        type: "styling",
        body: [],
        mode: "math",
        style: "display"
      };
    };

    var isStartOfArrow = node => {
      return node.type === "textord" && node.text === "@";
    };

    var isLabelEnd = (node, endChar) => {
      return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
    };

    function cdArrow(arrowChar, labels, parser) {
      // Return a parse tree of an arrow and its labels.
      // This acts in a way similar to a macro expansion.
      var funcName = cdArrowFunctionName[arrowChar];

      switch (funcName) {
        case "\\\\cdrightarrow":
        case "\\\\cdleftarrow":
          return parser.callFunction(funcName, [labels[0]], [labels[1]]);

        case "\\uparrow":
        case "\\downarrow":
          {
            var leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
            var bareArrow = {
              type: "atom",
              text: funcName,
              mode: "math",
              family: "rel"
            };
            var sizedArrow = parser.callFunction("\\Big", [bareArrow], []);
            var rightLabel = parser.callFunction("\\\\cdright", [labels[1]], []);
            var arrowGroup = {
              type: "ordgroup",
              mode: "math",
              body: [leftLabel, sizedArrow, rightLabel]
            };
            return parser.callFunction("\\\\cdparent", [arrowGroup], []);
          }

        case "\\\\cdlongequal":
          return parser.callFunction("\\\\cdlongequal", [], []);

        case "\\Vert":
          {
            var arrow = {
              type: "textord",
              text: "\\Vert",
              mode: "math"
            };
            return parser.callFunction("\\Big", [arrow], []);
          }

        default:
          return {
            type: "textord",
            text: " ",
            mode: "math"
          };
      }
    }

    function parseCD(parser) {
      // Get the array's parse nodes with \\ temporarily mapped to \cr.
      var parsedRows = [];
      parser.gullet.beginGroup();
      parser.gullet.macros.set("\\cr", "\\\\\\relax");
      parser.gullet.beginGroup();

      while (true) {
        // eslint-disable-line no-constant-condition
        // Get the parse nodes for the next row.
        parsedRows.push(parser.parseExpression(false, "\\\\"));
        parser.gullet.endGroup();
        parser.gullet.beginGroup();
        var next = parser.fetch().text;

        if (next === "&" || next === "\\\\") {
          parser.consume();
        } else if (next === "\\end") {
          if (parsedRows[parsedRows.length - 1].length === 0) {
            parsedRows.pop(); // final row ended in \\
          }

          break;
        } else {
          throw new ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
        }
      }

      var row = [];
      var body = [row]; // Loop thru the parse nodes. Collect them into cells and arrows.

      for (var i = 0; i < parsedRows.length; i++) {
        // Start a new row.
        var rowNodes = parsedRows[i]; // Create the first cell.

        var cell = newCell();

        for (var j = 0; j < rowNodes.length; j++) {
          if (!isStartOfArrow(rowNodes[j])) {
            // If a parseNode is not an arrow, it goes into a cell.
            cell.body.push(rowNodes[j]);
          } else {
            // Parse node j is an "@", the start of an arrow.
            // Before starting on the arrow, push the cell into `row`.
            row.push(cell); // Now collect parseNodes into an arrow.
            // The character after "@" defines the arrow type.

            j += 1;
            var arrowChar = assertSymbolNodeType(rowNodes[j]).text; // Create two empty label nodes. We may or may not use them.

            var labels = new Array(2);
            labels[0] = {
              type: "ordgroup",
              mode: "math",
              body: []
            };
            labels[1] = {
              type: "ordgroup",
              mode: "math",
              body: []
            }; // Process the arrow.

            if ("=|.".indexOf(arrowChar) > -1) ; else if ("<>AV".indexOf(arrowChar) > -1) {
              // Four arrows, `@>>>`, `@<<<`, `@AAA`, and `@VVV`, each take
              // two optional labels. E.g. the right-point arrow syntax is
              // really:  @>{optional label}>{optional label}>
              // Collect parseNodes into labels.
              for (var labelNum = 0; labelNum < 2; labelNum++) {
                var inLabel = true;

                for (var k = j + 1; k < rowNodes.length; k++) {
                  if (isLabelEnd(rowNodes[k], arrowChar)) {
                    inLabel = false;
                    j = k;
                    break;
                  }

                  if (isStartOfArrow(rowNodes[k])) {
                    throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k]);
                  }

                  labels[labelNum].body.push(rowNodes[k]);
                }

                if (inLabel) {
                  // isLabelEnd never returned a true.
                  throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j]);
                }
              }
            } else {
              throw new ParseError("Expected one of \"<>AV=|.\" after @", rowNodes[j]);
            } // Now join the arrow to its labels.


            var arrow = cdArrow(arrowChar, labels, parser); // Wrap the arrow in  ParseNode<"styling">.
            // This is done to match parseArray() behavior.

            var wrappedArrow = {
              type: "styling",
              body: [arrow],
              mode: "math",
              style: "display" // CD is always displaystyle.

            };
            row.push(wrappedArrow); // In CD's syntax, cells are implicit. That is, everything that
            // is not an arrow gets collected into a cell. So create an empty
            // cell now. It will collect upcoming parseNodes.

            cell = newCell();
          }
        }

        if (i % 2 === 0) {
          // Even-numbered rows consist of: cell, arrow, cell, arrow, ... cell
          // The last cell is not yet pushed into `row`, so:
          row.push(cell);
        } else {
          // Odd-numbered rows consist of: vert arrow, empty cell, ... vert arrow
          // Remove the empty cell that was placed at the beginning of `row`.
          row.shift();
        }

        row = [];
        body.push(row);
      } // End row group


      parser.gullet.endGroup(); // End array group defining \\

      parser.gullet.endGroup(); // define column separation.

      var cols = new Array(body[0].length).fill({
        type: "align",
        align: "c",
        pregap: 0.25,
        // CD package sets \enskip between columns.
        postgap: 0.25 // So pre and post each get half an \enskip, i.e. 0.25em.

      });
      return {
        type: "array",
        mode: "math",
        body,
        arraystretch: 1,
        addJot: true,
        rowGaps: [null],
        cols,
        colSeparationType: "CD",
        hLinesBeforeRow: new Array(body.length + 1).fill([])
      };
    } // The functions below are not available for general use.
    // They are here only for internal use by the {CD} environment in placing labels
    // next to vertical arrows.
    // We don't need any such functions for horizontal arrows because we can reuse
    // the functionality that already exists for extensible arrows.

    defineFunction({
      type: "cdlabel",
      names: ["\\\\cdleft", "\\\\cdright"],
      props: {
        numArgs: 1
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        return {
          type: "cdlabel",
          mode: parser.mode,
          side: funcName.slice(4),
          label: args[0]
        };
      },

      htmlBuilder(group, options) {
        var newOptions = options.havingStyle(options.style.sup());
        var label = buildCommon.wrapFragment(buildGroup$1(group.label, newOptions, options), options);
        label.classes.push("cd-label-" + group.side);
        label.style.bottom = makeEm(0.8 - label.depth); // Zero out label height & depth, so vertical align of arrow is set
        // by the arrow height, not by the label.

        label.height = 0;
        label.depth = 0;
        return label;
      },

      mathmlBuilder(group, options) {
        var label = new mathMLTree.MathNode("mrow", [buildGroup(group.label, options)]);
        label = new mathMLTree.MathNode("mpadded", [label]);
        label.setAttribute("width", "0");

        if (group.side === "left") {
          label.setAttribute("lspace", "-1width");
        } // We have to guess at vertical alignment. We know the arrow is 1.8em tall,
        // But we don't know the height or depth of the label.


        label.setAttribute("voffset", "0.7em");
        label = new mathMLTree.MathNode("mstyle", [label]);
        label.setAttribute("displaystyle", "false");
        label.setAttribute("scriptlevel", "1");
        return label;
      }

    });
    defineFunction({
      type: "cdlabelparent",
      names: ["\\\\cdparent"],
      props: {
        numArgs: 1
      },

      handler(_ref2, args) {
        var {
          parser
        } = _ref2;
        return {
          type: "cdlabelparent",
          mode: parser.mode,
          fragment: args[0]
        };
      },

      htmlBuilder(group, options) {
        // Wrap the vertical arrow and its labels.
        // The parent gets position: relative. The child gets position: absolute.
        // So CSS can locate the label correctly.
        var parent = buildCommon.wrapFragment(buildGroup$1(group.fragment, options), options);
        parent.classes.push("cd-vert-arrow");
        return parent;
      },

      mathmlBuilder(group, options) {
        return new mathMLTree.MathNode("mrow", [buildGroup(group.fragment, options)]);
      }

    });

    // {123} and converts into symbol with code 123.  It is used by the *macro*
    // \char defined in macros.js.

    defineFunction({
      type: "textord",
      names: ["\\@char"],
      props: {
        numArgs: 1,
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        var arg = assertNodeType(args[0], "ordgroup");
        var group = arg.body;
        var number = "";

        for (var i = 0; i < group.length; i++) {
          var node = assertNodeType(group[i], "textord");
          number += node.text;
        }

        var code = parseInt(number);
        var text;

        if (isNaN(code)) {
          throw new ParseError("\\@char has non-numeric argument " + number); // If we drop IE support, the following code could be replaced with
          // text = String.fromCodePoint(code)
        } else if (code < 0 || code >= 0x10ffff) {
          throw new ParseError("\\@char with invalid code point " + number);
        } else if (code <= 0xffff) {
          text = String.fromCharCode(code);
        } else {
          // Astral code point; split into surrogate halves
          code -= 0x10000;
          text = String.fromCharCode((code >> 10) + 0xd800, (code & 0x3ff) + 0xdc00);
        }

        return {
          type: "textord",
          mode: parser.mode,
          text: text
        };
      }

    });

    var htmlBuilder$8 = (group, options) => {
      var elements = buildExpression$1(group.body, options.withColor(group.color), false); // \color isn't supposed to affect the type of the elements it contains.
      // To accomplish this, we wrap the results in a fragment, so the inner
      // elements will be able to directly interact with their neighbors. For
      // example, `\color{red}{2 +} 3` has the same spacing as `2 + 3`

      return buildCommon.makeFragment(elements);
    };

    var mathmlBuilder$7 = (group, options) => {
      var inner = buildExpression(group.body, options.withColor(group.color));
      var node = new mathMLTree.MathNode("mstyle", inner);
      node.setAttribute("mathcolor", group.color);
      return node;
    };

    defineFunction({
      type: "color",
      names: ["\\textcolor"],
      props: {
        numArgs: 2,
        allowedInText: true,
        argTypes: ["color", "original"]
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        var color = assertNodeType(args[0], "color-token").color;
        var body = args[1];
        return {
          type: "color",
          mode: parser.mode,
          color,
          body: ordargument(body)
        };
      },

      htmlBuilder: htmlBuilder$8,
      mathmlBuilder: mathmlBuilder$7
    });
    defineFunction({
      type: "color",
      names: ["\\color"],
      props: {
        numArgs: 1,
        allowedInText: true,
        argTypes: ["color"]
      },

      handler(_ref2, args) {
        var {
          parser,
          breakOnTokenText
        } = _ref2;
        var color = assertNodeType(args[0], "color-token").color; // Set macro \current@color in current namespace to store the current
        // color, mimicking the behavior of color.sty.
        // This is currently used just to correctly color a \right
        // that follows a \color command.

        parser.gullet.macros.set("\\current@color", color); // Parse out the implicit body that should be colored.

        var body = parser.parseExpression(true, breakOnTokenText);
        return {
          type: "color",
          mode: parser.mode,
          color,
          body
        };
      },

      htmlBuilder: htmlBuilder$8,
      mathmlBuilder: mathmlBuilder$7
    });

    // Row breaks within tabular environments, and line breaks at top level

    defineFunction({
      type: "cr",
      names: ["\\\\"],
      props: {
        numArgs: 0,
        numOptionalArgs: 0,
        allowedInText: true
      },

      handler(_ref, args, optArgs) {
        var {
          parser
        } = _ref;
        var size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
        var newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline " + "does nothing in display mode");
        return {
          type: "cr",
          mode: parser.mode,
          newLine,
          size: size && assertNodeType(size, "size").value
        };
      },

      // The following builders are called only at the top level,
      // not within tabular/array environments.
      htmlBuilder(group, options) {
        var span = buildCommon.makeSpan(["mspace"], [], options);

        if (group.newLine) {
          span.classes.push("newline");

          if (group.size) {
            span.style.marginTop = makeEm(calculateSize(group.size, options));
          }
        }

        return span;
      },

      mathmlBuilder(group, options) {
        var node = new mathMLTree.MathNode("mspace");

        if (group.newLine) {
          node.setAttribute("linebreak", "newline");

          if (group.size) {
            node.setAttribute("height", makeEm(calculateSize(group.size, options)));
          }
        }

        return node;
      }

    });

    var globalMap = {
      "\\global": "\\global",
      "\\long": "\\\\globallong",
      "\\\\globallong": "\\\\globallong",
      "\\def": "\\gdef",
      "\\gdef": "\\gdef",
      "\\edef": "\\xdef",
      "\\xdef": "\\xdef",
      "\\let": "\\\\globallet",
      "\\futurelet": "\\\\globalfuture"
    };

    var checkControlSequence = tok => {
      var name = tok.text;

      if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
        throw new ParseError("Expected a control sequence", tok);
      }

      return name;
    };

    var getRHS = parser => {
      var tok = parser.gullet.popToken();

      if (tok.text === "=") {
        // consume optional equals
        tok = parser.gullet.popToken();

        if (tok.text === " ") {
          // consume one optional space
          tok = parser.gullet.popToken();
        }
      }

      return tok;
    };

    var letCommand = (parser, name, tok, global) => {
      var macro = parser.gullet.macros.get(tok.text);

      if (macro == null) {
        // don't expand it later even if a macro with the same name is defined
        // e.g., \let\foo=\frac \def\frac{\relax} \frac12
        tok.noexpand = true;
        macro = {
          tokens: [tok],
          numArgs: 0,
          // reproduce the same behavior in expansion
          unexpandable: !parser.gullet.isExpandable(tok.text)
        };
      }

      parser.gullet.macros.set(name, macro, global);
    }; // <assignment> -> <non-macro assignment>|<macro assignment>
    // <non-macro assignment> -> <simple assignment>|\global<non-macro assignment>
    // <macro assignment> -> <definition>|<prefix><macro assignment>
    // <prefix> -> \global|\long|\outer


    defineFunction({
      type: "internal",
      names: ["\\global", "\\long", "\\\\globallong" // can’t be entered directly
      ],
      props: {
        numArgs: 0,
        allowedInText: true
      },

      handler(_ref) {
        var {
          parser,
          funcName
        } = _ref;
        parser.consumeSpaces();
        var token = parser.fetch();

        if (globalMap[token.text]) {
          // KaTeX doesn't have \par, so ignore \long
          if (funcName === "\\global" || funcName === "\\\\globallong") {
            token.text = globalMap[token.text];
          }

          return assertNodeType(parser.parseFunction(), "internal");
        }

        throw new ParseError("Invalid token after macro prefix", token);
      }

    }); // Basic support for macro definitions: \def, \gdef, \edef, \xdef
    // <definition> -> <def><control sequence><definition text>
    // <def> -> \def|\gdef|\edef|\xdef
    // <definition text> -> <parameter text><left brace><balanced text><right brace>

    defineFunction({
      type: "internal",
      names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
      props: {
        numArgs: 0,
        allowedInText: true,
        primitive: true
      },

      handler(_ref2) {
        var {
          parser,
          funcName
        } = _ref2;
        var tok = parser.gullet.popToken();
        var name = tok.text;

        if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
          throw new ParseError("Expected a control sequence", tok);
        }

        var numArgs = 0;
        var insert;
        var delimiters = [[]]; // <parameter text> contains no braces

        while (parser.gullet.future().text !== "{") {
          tok = parser.gullet.popToken();

          if (tok.text === "#") {
            // If the very last character of the <parameter text> is #, so that
            // this # is immediately followed by {, TeX will behave as if the {
            // had been inserted at the right end of both the parameter text
            // and the replacement text.
            if (parser.gullet.future().text === "{") {
              insert = parser.gullet.future();
              delimiters[numArgs].push("{");
              break;
            } // A parameter, the first appearance of # must be followed by 1,
            // the next by 2, and so on; up to nine #’s are allowed


            tok = parser.gullet.popToken();

            if (!/^[1-9]$/.test(tok.text)) {
              throw new ParseError("Invalid argument number \"" + tok.text + "\"");
            }

            if (parseInt(tok.text) !== numArgs + 1) {
              throw new ParseError("Argument number \"" + tok.text + "\" out of order");
            }

            numArgs++;
            delimiters.push([]);
          } else if (tok.text === "EOF") {
            throw new ParseError("Expected a macro definition");
          } else {
            delimiters[numArgs].push(tok.text);
          }
        } // replacement text, enclosed in '{' and '}' and properly nested


        var {
          tokens
        } = parser.gullet.consumeArg();

        if (insert) {
          tokens.unshift(insert);
        }

        if (funcName === "\\edef" || funcName === "\\xdef") {
          tokens = parser.gullet.expandTokens(tokens);
          tokens.reverse(); // to fit in with stack order
        } // Final arg is the expansion of the macro


        parser.gullet.macros.set(name, {
          tokens,
          numArgs,
          delimiters
        }, funcName === globalMap[funcName]);
        return {
          type: "internal",
          mode: parser.mode
        };
      }

    }); // <simple assignment> -> <let assignment>
    // <let assignment> -> \futurelet<control sequence><token><token>
    //     | \let<control sequence><equals><one optional space><token>
    // <equals> -> <optional spaces>|<optional spaces>=

    defineFunction({
      type: "internal",
      names: ["\\let", "\\\\globallet" // can’t be entered directly
      ],
      props: {
        numArgs: 0,
        allowedInText: true,
        primitive: true
      },

      handler(_ref3) {
        var {
          parser,
          funcName
        } = _ref3;
        var name = checkControlSequence(parser.gullet.popToken());
        parser.gullet.consumeSpaces();
        var tok = getRHS(parser);
        letCommand(parser, name, tok, funcName === "\\\\globallet");
        return {
          type: "internal",
          mode: parser.mode
        };
      }

    }); // ref: https://www.tug.org/TUGboat/tb09-3/tb22bechtolsheim.pdf

    defineFunction({
      type: "internal",
      names: ["\\futurelet", "\\\\globalfuture" // can’t be entered directly
      ],
      props: {
        numArgs: 0,
        allowedInText: true,
        primitive: true
      },

      handler(_ref4) {
        var {
          parser,
          funcName
        } = _ref4;
        var name = checkControlSequence(parser.gullet.popToken());
        var middle = parser.gullet.popToken();
        var tok = parser.gullet.popToken();
        letCommand(parser, name, tok, funcName === "\\\\globalfuture");
        parser.gullet.pushToken(tok);
        parser.gullet.pushToken(middle);
        return {
          type: "internal",
          mode: parser.mode
        };
      }

    });

    /**
     * This file deals with creating delimiters of various sizes. The TeXbook
     * discusses these routines on page 441-442, in the "Another subroutine sets box
     * x to a specified variable delimiter" paragraph.
     *
     * There are three main routines here. `makeSmallDelim` makes a delimiter in the
     * normal font, but in either text, script, or scriptscript style.
     * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
     * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
     * smaller pieces that are stacked on top of one another.
     *
     * The functions take a parameter `center`, which determines if the delimiter
     * should be centered around the axis.
     *
     * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
     * one of the given sizes. This is used for things like `\bigl`.
     * `customSizedDelim` makes a delimiter with a given total height+depth. It is
     * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
     * delimiter which surrounds an expression of a given height an depth. It is
     * used in `\left` and `\right`.
     */

    /**
     * Get the metrics for a given symbol and font, after transformation (i.e.
     * after following replacement from symbols.js)
     */
    var getMetrics = function getMetrics(symbol, font, mode) {
      var replace = symbols.math[symbol] && symbols.math[symbol].replace;
      var metrics = getCharacterMetrics(replace || symbol, font, mode);

      if (!metrics) {
        throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
      }

      return metrics;
    };
    /**
     * Puts a delimiter span in a given style, and adds appropriate height, depth,
     * and maxFontSizes.
     */


    var styleWrap = function styleWrap(delim, toStyle, options, classes) {
      var newOptions = options.havingBaseStyle(toStyle);
      var span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
      var delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
      span.height *= delimSizeMultiplier;
      span.depth *= delimSizeMultiplier;
      span.maxFontSize = newOptions.sizeMultiplier;
      return span;
    };

    var centerSpan = function centerSpan(span, options, style) {
      var newOptions = options.havingBaseStyle(style);
      var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
      span.classes.push("delimcenter");
      span.style.top = makeEm(shift);
      span.height -= shift;
      span.depth += shift;
    };
    /**
     * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
     * font, but is restyled to either be in textstyle, scriptstyle, or
     * scriptscriptstyle.
     */


    var makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
      var text = buildCommon.makeSymbol(delim, "Main-Regular", mode, options);
      var span = styleWrap(text, style, options, classes);

      if (center) {
        centerSpan(span, options, style);
      }

      return span;
    };
    /**
     * Builds a symbol in the given font size (note size is an integer)
     */


    var mathrmSize = function mathrmSize(value, size, mode, options) {
      return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options);
    };
    /**
     * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
     * Size3, or Size4 fonts. It is always rendered in textstyle.
     */


    var makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
      var inner = mathrmSize(delim, size, mode, options);
      var span = styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner], options), Style$1.TEXT, options, classes);

      if (center) {
        centerSpan(span, options, Style$1.TEXT);
      }

      return span;
    };
    /**
     * Make a span from a font glyph with the given offset and in the given font.
     * This is used in makeStackedDelim to make the stacking pieces for the delimiter.
     */


    var makeGlyphSpan = function makeGlyphSpan(symbol, font, mode) {
      var sizeClass; // Apply the correct CSS class to choose the right font.

      if (font === "Size1-Regular") {
        sizeClass = "delim-size1";
      } else
        /* if (font === "Size4-Regular") */
        {
          sizeClass = "delim-size4";
        }

      var corner = buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]); // Since this will be passed into `makeVList` in the end, wrap the element
      // in the appropriate tag that VList uses.

      return {
        type: "elem",
        elem: corner
      };
    };

    var makeInner = function makeInner(ch, height, options) {
      // Create a span with inline SVG for the inner part of a tall stacked delimiter.
      var width = fontMetricsData['Size4-Regular'][ch.charCodeAt(0)] ? fontMetricsData['Size4-Regular'][ch.charCodeAt(0)][4] : fontMetricsData['Size1-Regular'][ch.charCodeAt(0)][4];
      var path = new PathNode("inner", innerPath(ch, Math.round(1000 * height)));
      var svgNode = new SvgNode([path], {
        "width": makeEm(width),
        "height": makeEm(height),
        // Override CSS rule `.katex svg { width: 100% }`
        "style": "width:" + makeEm(width),
        "viewBox": "0 0 " + 1000 * width + " " + Math.round(1000 * height),
        "preserveAspectRatio": "xMinYMin"
      });
      var span = buildCommon.makeSvgSpan([], [svgNode], options);
      span.height = height;
      span.style.height = makeEm(height);
      span.style.width = makeEm(width);
      return {
        type: "elem",
        elem: span
      };
    }; // Helpers for makeStackedDelim


    var lapInEms = 0.008;
    var lap = {
      type: "kern",
      size: -1 * lapInEms
    };
    var verts = ["|", "\\lvert", "\\rvert", "\\vert"];
    var doubleVerts = ["\\|", "\\lVert", "\\rVert", "\\Vert"];
    /**
     * Make a stacked delimiter out of a given delimiter, with the total height at
     * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
     */

    var makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
      // There are four parts, the top, an optional middle, a repeated part, and a
      // bottom.
      var top;
      var middle;
      var repeat;
      var bottom;
      var svgLabel = "";
      var viewBoxWidth = 0;
      top = repeat = bottom = delim;
      middle = null; // Also keep track of what font the delimiters are in

      var font = "Size1-Regular"; // We set the parts and font based on the symbol. Note that we use
      // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
      // repeats of the arrows

      if (delim === "\\uparrow") {
        repeat = bottom = "\u23d0";
      } else if (delim === "\\Uparrow") {
        repeat = bottom = "\u2016";
      } else if (delim === "\\downarrow") {
        top = repeat = "\u23d0";
      } else if (delim === "\\Downarrow") {
        top = repeat = "\u2016";
      } else if (delim === "\\updownarrow") {
        top = "\\uparrow";
        repeat = "\u23d0";
        bottom = "\\downarrow";
      } else if (delim === "\\Updownarrow") {
        top = "\\Uparrow";
        repeat = "\u2016";
        bottom = "\\Downarrow";
      } else if (utils.contains(verts, delim)) {
        repeat = "\u2223";
        svgLabel = "vert";
        viewBoxWidth = 333;
      } else if (utils.contains(doubleVerts, delim)) {
        repeat = "\u2225";
        svgLabel = "doublevert";
        viewBoxWidth = 556;
      } else if (delim === "[" || delim === "\\lbrack") {
        top = "\u23a1";
        repeat = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
        svgLabel = "lbrack";
        viewBoxWidth = 667;
      } else if (delim === "]" || delim === "\\rbrack") {
        top = "\u23a4";
        repeat = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
        svgLabel = "rbrack";
        viewBoxWidth = 667;
      } else if (delim === "\\lfloor" || delim === "\u230a") {
        repeat = top = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
        svgLabel = "lfloor";
        viewBoxWidth = 667;
      } else if (delim === "\\lceil" || delim === "\u2308") {
        top = "\u23a1";
        repeat = bottom = "\u23a2";
        font = "Size4-Regular";
        svgLabel = "lceil";
        viewBoxWidth = 667;
      } else if (delim === "\\rfloor" || delim === "\u230b") {
        repeat = top = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
        svgLabel = "rfloor";
        viewBoxWidth = 667;
      } else if (delim === "\\rceil" || delim === "\u2309") {
        top = "\u23a4";
        repeat = bottom = "\u23a5";
        font = "Size4-Regular";
        svgLabel = "rceil";
        viewBoxWidth = 667;
      } else if (delim === "(" || delim === "\\lparen") {
        top = "\u239b";
        repeat = "\u239c";
        bottom = "\u239d";
        font = "Size4-Regular";
        svgLabel = "lparen";
        viewBoxWidth = 875;
      } else if (delim === ")" || delim === "\\rparen") {
        top = "\u239e";
        repeat = "\u239f";
        bottom = "\u23a0";
        font = "Size4-Regular";
        svgLabel = "rparen";
        viewBoxWidth = 875;
      } else if (delim === "\\{" || delim === "\\lbrace") {
        top = "\u23a7";
        middle = "\u23a8";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } else if (delim === "\\}" || delim === "\\rbrace") {
        top = "\u23ab";
        middle = "\u23ac";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } else if (delim === "\\lgroup" || delim === "\u27ee") {
        top = "\u23a7";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } else if (delim === "\\rgroup" || delim === "\u27ef") {
        top = "\u23ab";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } else if (delim === "\\lmoustache" || delim === "\u23b0") {
        top = "\u23a7";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } else if (delim === "\\rmoustache" || delim === "\u23b1") {
        top = "\u23ab";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
      } // Get the metrics of the four sections


      var topMetrics = getMetrics(top, font, mode);
      var topHeightTotal = topMetrics.height + topMetrics.depth;
      var repeatMetrics = getMetrics(repeat, font, mode);
      var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
      var bottomMetrics = getMetrics(bottom, font, mode);
      var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
      var middleHeightTotal = 0;
      var middleFactor = 1;

      if (middle !== null) {
        var middleMetrics = getMetrics(middle, font, mode);
        middleHeightTotal = middleMetrics.height + middleMetrics.depth;
        middleFactor = 2; // repeat symmetrically above and below middle
      } // Calculate the minimal height that the delimiter can have.
      // It is at least the size of the top, bottom, and optional middle combined.


      var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal; // Compute the number of copies of the repeat symbol we will need

      var repeatCount = Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal))); // Compute the total height of the delimiter including all the symbols

      var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal; // The center of the delimiter is placed at the center of the axis. Note
      // that in this context, "center" means that the delimiter should be
      // centered around the axis in the current style, while normally it is
      // centered around the axis in textstyle.

      var axisHeight = options.fontMetrics().axisHeight;

      if (center) {
        axisHeight *= options.sizeMultiplier;
      } // Calculate the depth


      var depth = realHeightTotal / 2 - axisHeight; // Now, we start building the pieces that will go into the vlist
      // Keep a list of the pieces of the stacked delimiter

      var stack = [];

      if (svgLabel.length > 0) {
        // Instead of stacking glyphs, create a single SVG.
        // This evades browser problems with imprecise positioning of spans.
        var midHeight = realHeightTotal - topHeightTotal - bottomHeightTotal;
        var viewBoxHeight = Math.round(realHeightTotal * 1000);
        var pathStr = tallDelim(svgLabel, Math.round(midHeight * 1000));
        var path = new PathNode(svgLabel, pathStr);
        var width = (viewBoxWidth / 1000).toFixed(3) + "em";
        var height = (viewBoxHeight / 1000).toFixed(3) + "em";
        var svg = new SvgNode([path], {
          "width": width,
          "height": height,
          "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight
        });
        var wrapper = buildCommon.makeSvgSpan([], [svg], options);
        wrapper.height = viewBoxHeight / 1000;
        wrapper.style.width = width;
        wrapper.style.height = height;
        stack.push({
          type: "elem",
          elem: wrapper
        });
      } else {
        // Stack glyphs
        // Start by adding the bottom symbol
        stack.push(makeGlyphSpan(bottom, font, mode));
        stack.push(lap); // overlap

        if (middle === null) {
          // The middle section will be an SVG. Make it an extra 0.016em tall.
          // We'll overlap by 0.008em at top and bottom.
          var innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
          stack.push(makeInner(repeat, innerHeight, options));
        } else {
          // When there is a middle bit, we need the middle part and two repeated
          // sections
          var _innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;

          stack.push(makeInner(repeat, _innerHeight, options)); // Now insert the middle of the brace.

          stack.push(lap);
          stack.push(makeGlyphSpan(middle, font, mode));
          stack.push(lap);
          stack.push(makeInner(repeat, _innerHeight, options));
        } // Add the top symbol


        stack.push(lap);
        stack.push(makeGlyphSpan(top, font, mode));
      } // Finally, build the vlist


      var newOptions = options.havingBaseStyle(Style$1.TEXT);
      var inner = buildCommon.makeVList({
        positionType: "bottom",
        positionData: depth,
        children: stack
      }, newOptions);
      return styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner], newOptions), Style$1.TEXT, options, classes);
    }; // All surds have 0.08em padding above the vinculum inside the SVG.
    // That keeps browser span height rounding error from pinching the line.


    var vbPad = 80; // padding above the surd, measured inside the viewBox.

    var emPad = 0.08; // padding, in ems, measured in the document.

    var sqrtSvg = function sqrtSvg(sqrtName, height, viewBoxHeight, extraVinculum, options) {
      var path = sqrtPath(sqrtName, extraVinculum, viewBoxHeight);
      var pathNode = new PathNode(sqrtName, path);
      var svg = new SvgNode([pathNode], {
        // Note: 1000:1 ratio of viewBox to document em width.
        "width": "400em",
        "height": makeEm(height),
        "viewBox": "0 0 400000 " + viewBoxHeight,
        "preserveAspectRatio": "xMinYMin slice"
      });
      return buildCommon.makeSvgSpan(["hide-tail"], [svg], options);
    };
    /**
     * Make a sqrt image of the given height,
     */


    var makeSqrtImage = function makeSqrtImage(height, options) {
      // Define a newOptions that removes the effect of size changes such as \Huge.
      // We don't pick different a height surd for \Huge. For it, we scale up.
      var newOptions = options.havingBaseSizing(); // Pick the desired surd glyph from a sequence of surds.

      var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
      var sizeMultiplier = newOptions.sizeMultiplier; // default
      // The standard sqrt SVGs each have a 0.04em thick vinculum.
      // If Settings.minRuleThickness is larger than that, we add extraVinculum.

      var extraVinculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness); // Create a span containing an SVG image of a sqrt symbol.

      var span;
      var spanHeight = 0;
      var texHeight = 0;
      var viewBoxHeight = 0;
      var advanceWidth; // We create viewBoxes with 80 units of "padding" above each surd.
      // Then browser rounding error on the parent span height will not
      // encroach on the ink of the vinculum. But that padding is not
      // included in the TeX-like `height` used for calculation of
      // vertical alignment. So texHeight = span.height < span.style.height.

      if (delim.type === "small") {
        // Get an SVG that is derived from glyph U+221A in font KaTeX-Main.
        // 1000 unit normal glyph height.
        viewBoxHeight = 1000 + 1000 * extraVinculum + vbPad;

        if (height < 1.0) {
          sizeMultiplier = 1.0; // mimic a \textfont radical
        } else if (height < 1.4) {
          sizeMultiplier = 0.7; // mimic a \scriptfont radical
        }

        spanHeight = (1.0 + extraVinculum + emPad) / sizeMultiplier;
        texHeight = (1.00 + extraVinculum) / sizeMultiplier;
        span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraVinculum, options);
        span.style.minWidth = "0.853em";
        advanceWidth = 0.833 / sizeMultiplier; // from the font.
      } else if (delim.type === "large") {
        // These SVGs come from fonts: KaTeX_Size1, _Size2, etc.
        viewBoxHeight = (1000 + vbPad) * sizeToMaxHeight[delim.size];
        texHeight = (sizeToMaxHeight[delim.size] + extraVinculum) / sizeMultiplier;
        spanHeight = (sizeToMaxHeight[delim.size] + extraVinculum + emPad) / sizeMultiplier;
        span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraVinculum, options);
        span.style.minWidth = "1.02em";
        advanceWidth = 1.0 / sizeMultiplier; // 1.0 from the font.
      } else {
        // Tall sqrt. In TeX, this would be stacked using multiple glyphs.
        // We'll use a single SVG to accomplish the same thing.
        spanHeight = height + extraVinculum + emPad;
        texHeight = height + extraVinculum;
        viewBoxHeight = Math.floor(1000 * height + extraVinculum) + vbPad;
        span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraVinculum, options);
        span.style.minWidth = "0.742em";
        advanceWidth = 1.056;
      }

      span.height = texHeight;
      span.style.height = makeEm(spanHeight);
      return {
        span,
        advanceWidth,
        // Calculate the actual line width.
        // This actually should depend on the chosen font -- e.g. \boldmath
        // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
        // have thicker rules.
        ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraVinculum) * sizeMultiplier
      };
    }; // There are three kinds of delimiters, delimiters that stack when they become
    // too large


    var stackLargeDelimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230a", "\u230b", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"]; // delimiters that always stack

    var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27ee", "\u27ef", "\\lmoustache", "\\rmoustache", "\u23b0", "\u23b1"]; // and delimiters that never stack

    var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]; // Metrics of the different sizes. Found by looking at TeX's output of
    // $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
    // Used to create stacked delimiters of appropriate sizes in makeSizedDelim.

    var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];
    /**
     * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
     */

    var makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
      // < and > turn into \langle and \rangle in delimiters
      if (delim === "<" || delim === "\\lt" || delim === "\u27e8") {
        delim = "\\langle";
      } else if (delim === ">" || delim === "\\gt" || delim === "\u27e9") {
        delim = "\\rangle";
      } // Sized delimiters are never centered.


      if (utils.contains(stackLargeDelimiters, delim) || utils.contains(stackNeverDelimiters, delim)) {
        return makeLargeDelim(delim, size, false, options, mode, classes);
      } else if (utils.contains(stackAlwaysDelimiters, delim)) {
        return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
      } else {
        throw new ParseError("Illegal delimiter: '" + delim + "'");
      }
    };
    /**
     * There are three different sequences of delimiter sizes that the delimiters
     * follow depending on the kind of delimiter. This is used when creating custom
     * sized delimiters to decide whether to create a small, large, or stacked
     * delimiter.
     *
     * In real TeX, these sequences aren't explicitly defined, but are instead
     * defined inside the font metrics. Since there are only three sequences that
     * are possible for the delimiters that TeX defines, it is easier to just encode
     * them explicitly here.
     */


    // Delimiters that never stack try small delimiters and large delimiters only
    var stackNeverDelimiterSequence = [{
      type: "small",
      style: Style$1.SCRIPTSCRIPT
    }, {
      type: "small",
      style: Style$1.SCRIPT
    }, {
      type: "small",
      style: Style$1.TEXT
    }, {
      type: "large",
      size: 1
    }, {
      type: "large",
      size: 2
    }, {
      type: "large",
      size: 3
    }, {
      type: "large",
      size: 4
    }]; // Delimiters that always stack try the small delimiters first, then stack

    var stackAlwaysDelimiterSequence = [{
      type: "small",
      style: Style$1.SCRIPTSCRIPT
    }, {
      type: "small",
      style: Style$1.SCRIPT
    }, {
      type: "small",
      style: Style$1.TEXT
    }, {
      type: "stack"
    }]; // Delimiters that stack when large try the small and then large delimiters, and
    // stack afterwards

    var stackLargeDelimiterSequence = [{
      type: "small",
      style: Style$1.SCRIPTSCRIPT
    }, {
      type: "small",
      style: Style$1.SCRIPT
    }, {
      type: "small",
      style: Style$1.TEXT
    }, {
      type: "large",
      size: 1
    }, {
      type: "large",
      size: 2
    }, {
      type: "large",
      size: 3
    }, {
      type: "large",
      size: 4
    }, {
      type: "stack"
    }];
    /**
     * Get the font used in a delimiter based on what kind of delimiter it is.
     * TODO(#963) Use more specific font family return type once that is introduced.
     */

    var delimTypeToFont = function delimTypeToFont(type) {
      if (type.type === "small") {
        return "Main-Regular";
      } else if (type.type === "large") {
        return "Size" + type.size + "-Regular";
      } else if (type.type === "stack") {
        return "Size4-Regular";
      } else {
        throw new Error("Add support for delim type '" + type.type + "' here.");
      }
    };
    /**
     * Traverse a sequence of types of delimiters to decide what kind of delimiter
     * should be used to create a delimiter of the given height+depth.
     */


    var traverseSequence = function traverseSequence(delim, height, sequence, options) {
      // Here, we choose the index we should start at in the sequences. In smaller
      // sizes (which correspond to larger numbers in style.size) we start earlier
      // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
      // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
      var start = Math.min(2, 3 - options.style.size);

      for (var i = start; i < sequence.length; i++) {
        if (sequence[i].type === "stack") {
          // This is always the last delimiter, so we just break the loop now.
          break;
        }

        var metrics = getMetrics(delim, delimTypeToFont(sequence[i]), "math");
        var heightDepth = metrics.height + metrics.depth; // Small delimiters are scaled down versions of the same font, so we
        // account for the style change size.

        if (sequence[i].type === "small") {
          var newOptions = options.havingBaseStyle(sequence[i].style);
          heightDepth *= newOptions.sizeMultiplier;
        } // Check if the delimiter at this size works for the given height.


        if (heightDepth > height) {
          return sequence[i];
        }
      } // If we reached the end of the sequence, return the last sequence element.


      return sequence[sequence.length - 1];
    };
    /**
     * Make a delimiter of a given height+depth, with optional centering. Here, we
     * traverse the sequences, and create a delimiter that the sequence tells us to.
     */


    var makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
      if (delim === "<" || delim === "\\lt" || delim === "\u27e8") {
        delim = "\\langle";
      } else if (delim === ">" || delim === "\\gt" || delim === "\u27e9") {
        delim = "\\rangle";
      } // Decide what sequence to use


      var sequence;

      if (utils.contains(stackNeverDelimiters, delim)) {
        sequence = stackNeverDelimiterSequence;
      } else if (utils.contains(stackLargeDelimiters, delim)) {
        sequence = stackLargeDelimiterSequence;
      } else {
        sequence = stackAlwaysDelimiterSequence;
      } // Look through the sequence


      var delimType = traverseSequence(delim, height, sequence, options); // Get the delimiter from font glyphs.
      // Depending on the sequence element we decided on, call the
      // appropriate function.

      if (delimType.type === "small") {
        return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
      } else if (delimType.type === "large") {
        return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
      } else
        /* if (delimType.type === "stack") */
        {
          return makeStackedDelim(delim, height, center, options, mode, classes);
        }
    };
    /**
     * Make a delimiter for use with `\left` and `\right`, given a height and depth
     * of an expression that the delimiters surround.
     */


    var makeLeftRightDelim = function makeLeftRightDelim(delim, height, depth, options, mode, classes) {
      // We always center \left/\right delimiters, so the axis is always shifted
      var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier; // Taken from TeX source, tex.web, function make_left_right

      var delimiterFactor = 901;
      var delimiterExtend = 5.0 / options.fontMetrics().ptPerEm;
      var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
      var totalHeight = Math.max( // In real TeX, calculations are done using integral values which are
      // 65536 per pt, or 655360 per em. So, the division here truncates in
      // TeX but doesn't here, producing different results. If we wanted to
      // exactly match TeX's calculation, we could do
      //   Math.floor(655360 * maxDistFromAxis / 500) *
      //    delimiterFactor / 655360
      // (To see the difference, compare
      //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
      // in TeX and KaTeX)
      maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend); // Finally, we defer to `makeCustomSizedDelim` with our calculated total
      // height

      return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
    };

    var delimiter = {
      sqrtImage: makeSqrtImage,
      sizedDelim: makeSizedDelim,
      sizeToMaxHeight: sizeToMaxHeight,
      customSizedDelim: makeCustomSizedDelim,
      leftRightDelim: makeLeftRightDelim
    };

    // Extra data needed for the delimiter handler down below
    var delimiterSizes = {
      "\\bigl": {
        mclass: "mopen",
        size: 1
      },
      "\\Bigl": {
        mclass: "mopen",
        size: 2
      },
      "\\biggl": {
        mclass: "mopen",
        size: 3
      },
      "\\Biggl": {
        mclass: "mopen",
        size: 4
      },
      "\\bigr": {
        mclass: "mclose",
        size: 1
      },
      "\\Bigr": {
        mclass: "mclose",
        size: 2
      },
      "\\biggr": {
        mclass: "mclose",
        size: 3
      },
      "\\Biggr": {
        mclass: "mclose",
        size: 4
      },
      "\\bigm": {
        mclass: "mrel",
        size: 1
      },
      "\\Bigm": {
        mclass: "mrel",
        size: 2
      },
      "\\biggm": {
        mclass: "mrel",
        size: 3
      },
      "\\Biggm": {
        mclass: "mrel",
        size: 4
      },
      "\\big": {
        mclass: "mord",
        size: 1
      },
      "\\Big": {
        mclass: "mord",
        size: 2
      },
      "\\bigg": {
        mclass: "mord",
        size: 3
      },
      "\\Bigg": {
        mclass: "mord",
        size: 4
      }
    };
    var delimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230a", "\u230b", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27e8", "\\rangle", "\u27e9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27ee", "\u27ef", "\\lmoustache", "\\rmoustache", "\u23b0", "\u23b1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];

    // Delimiter functions
    function checkDelimiter(delim, context) {
      var symDelim = checkSymbolNodeType(delim);

      if (symDelim && utils.contains(delimiters, symDelim.text)) {
        return symDelim;
      } else if (symDelim) {
        throw new ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context.funcName + "'", delim);
      } else {
        throw new ParseError("Invalid delimiter type '" + delim.type + "'", delim);
      }
    }

    defineFunction({
      type: "delimsizing",
      names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
      props: {
        numArgs: 1,
        argTypes: ["primitive"]
      },
      handler: (context, args) => {
        var delim = checkDelimiter(args[0], context);
        return {
          type: "delimsizing",
          mode: context.parser.mode,
          size: delimiterSizes[context.funcName].size,
          mclass: delimiterSizes[context.funcName].mclass,
          delim: delim.text
        };
      },
      htmlBuilder: (group, options) => {
        if (group.delim === ".") {
          // Empty delimiters still count as elements, even though they don't
          // show anything.
          return buildCommon.makeSpan([group.mclass]);
        } // Use delimiter.sizedDelim to generate the delimiter.


        return delimiter.sizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
      },
      mathmlBuilder: group => {
        var children = [];

        if (group.delim !== ".") {
          children.push(makeText(group.delim, group.mode));
        }

        var node = new mathMLTree.MathNode("mo", children);

        if (group.mclass === "mopen" || group.mclass === "mclose") {
          // Only some of the delimsizing functions act as fences, and they
          // return "mopen" or "mclose" mclass.
          node.setAttribute("fence", "true");
        } else {
          // Explicitly disable fencing if it's not a fence, to override the
          // defaults.
          node.setAttribute("fence", "false");
        }

        node.setAttribute("stretchy", "true");
        var size = makeEm(delimiter.sizeToMaxHeight[group.size]);
        node.setAttribute("minsize", size);
        node.setAttribute("maxsize", size);
        return node;
      }
    });

    function assertParsed(group) {
      if (!group.body) {
        throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
      }
    }

    defineFunction({
      type: "leftright-right",
      names: ["\\right"],
      props: {
        numArgs: 1,
        primitive: true
      },
      handler: (context, args) => {
        // \left case below triggers parsing of \right in
        //   `const right = parser.parseFunction();`
        // uses this return value.
        var color = context.parser.gullet.macros.get("\\current@color");

        if (color && typeof color !== "string") {
          throw new ParseError("\\current@color set to non-string in \\right");
        }

        return {
          type: "leftright-right",
          mode: context.parser.mode,
          delim: checkDelimiter(args[0], context).text,
          color // undefined if not set via \color

        };
      }
    });
    defineFunction({
      type: "leftright",
      names: ["\\left"],
      props: {
        numArgs: 1,
        primitive: true
      },
      handler: (context, args) => {
        var delim = checkDelimiter(args[0], context);
        var parser = context.parser; // Parse out the implicit body

        ++parser.leftrightDepth; // parseExpression stops before '\\right'

        var body = parser.parseExpression(false);
        --parser.leftrightDepth; // Check the next token

        parser.expect("\\right", false);
        var right = assertNodeType(parser.parseFunction(), "leftright-right");
        return {
          type: "leftright",
          mode: parser.mode,
          body,
          left: delim.text,
          right: right.delim,
          rightColor: right.color
        };
      },
      htmlBuilder: (group, options) => {
        assertParsed(group); // Build the inner expression

        var inner = buildExpression$1(group.body, options, true, ["mopen", "mclose"]);
        var innerHeight = 0;
        var innerDepth = 0;
        var hadMiddle = false; // Calculate its height and depth

        for (var i = 0; i < inner.length; i++) {
          // Property `isMiddle` not defined on `span`. See comment in
          // "middle"'s htmlBuilder.
          // $FlowFixMe
          if (inner[i].isMiddle) {
            hadMiddle = true;
          } else {
            innerHeight = Math.max(inner[i].height, innerHeight);
            innerDepth = Math.max(inner[i].depth, innerDepth);
          }
        } // The size of delimiters is the same, regardless of what style we are
        // in. Thus, to correctly calculate the size of delimiter we need around
        // a group, we scale down the inner size based on the size.


        innerHeight *= options.sizeMultiplier;
        innerDepth *= options.sizeMultiplier;
        var leftDelim;

        if (group.left === ".") {
          // Empty delimiters in \left and \right make null delimiter spaces.
          leftDelim = makeNullDelimiter(options, ["mopen"]);
        } else {
          // Otherwise, use leftRightDelim to generate the correct sized
          // delimiter.
          leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
        } // Add it to the beginning of the expression


        inner.unshift(leftDelim); // Handle middle delimiters

        if (hadMiddle) {
          for (var _i = 1; _i < inner.length; _i++) {
            var middleDelim = inner[_i]; // Property `isMiddle` not defined on `span`. See comment in
            // "middle"'s htmlBuilder.
            // $FlowFixMe

            var isMiddle = middleDelim.isMiddle;

            if (isMiddle) {
              // Apply the options that were active when \middle was called
              inner[_i] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
            }
          }
        }

        var rightDelim; // Same for the right delimiter, but using color specified by \color

        if (group.right === ".") {
          rightDelim = makeNullDelimiter(options, ["mclose"]);
        } else {
          var colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
          rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
        } // Add it to the end of the expression.


        inner.push(rightDelim);
        return buildCommon.makeSpan(["minner"], inner, options);
      },
      mathmlBuilder: (group, options) => {
        assertParsed(group);
        var inner = buildExpression(group.body, options);

        if (group.left !== ".") {
          var leftNode = new mathMLTree.MathNode("mo", [makeText(group.left, group.mode)]);
          leftNode.setAttribute("fence", "true");
          inner.unshift(leftNode);
        }

        if (group.right !== ".") {
          var rightNode = new mathMLTree.MathNode("mo", [makeText(group.right, group.mode)]);
          rightNode.setAttribute("fence", "true");

          if (group.rightColor) {
            rightNode.setAttribute("mathcolor", group.rightColor);
          }

          inner.push(rightNode);
        }

        return makeRow(inner);
      }
    });
    defineFunction({
      type: "middle",
      names: ["\\middle"],
      props: {
        numArgs: 1,
        primitive: true
      },
      handler: (context, args) => {
        var delim = checkDelimiter(args[0], context);

        if (!context.parser.leftrightDepth) {
          throw new ParseError("\\middle without preceding \\left", delim);
        }

        return {
          type: "middle",
          mode: context.parser.mode,
          delim: delim.text
        };
      },
      htmlBuilder: (group, options) => {
        var middleDelim;

        if (group.delim === ".") {
          middleDelim = makeNullDelimiter(options, []);
        } else {
          middleDelim = delimiter.sizedDelim(group.delim, 1, options, group.mode, []);
          var isMiddle = {
            delim: group.delim,
            options
          }; // Property `isMiddle` not defined on `span`. It is only used in
          // this file above.
          // TODO: Fix this violation of the `span` type and possibly rename
          // things since `isMiddle` sounds like a boolean, but is a struct.
          // $FlowFixMe

          middleDelim.isMiddle = isMiddle;
        }

        return middleDelim;
      },
      mathmlBuilder: (group, options) => {
        // A Firefox \middle will stretch a character vertically only if it
        // is in the fence part of the operator dictionary at:
        // https://www.w3.org/TR/MathML3/appendixc.html.
        // So we need to avoid U+2223 and use plain "|" instead.
        var textNode = group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode);
        var middleNode = new mathMLTree.MathNode("mo", [textNode]);
        middleNode.setAttribute("fence", "true"); // MathML gives 5/18em spacing to each <mo> element.
        // \middle should get delimiter spacing instead.

        middleNode.setAttribute("lspace", "0.05em");
        middleNode.setAttribute("rspace", "0.05em");
        return middleNode;
      }
    });

    var htmlBuilder$7 = (group, options) => {
      // \cancel, \bcancel, \xcancel, \sout, \fbox, \colorbox, \fcolorbox, \phase
      // Some groups can return document fragments.  Handle those by wrapping
      // them in a span.
      var inner = buildCommon.wrapFragment(buildGroup$1(group.body, options), options);
      var label = group.label.slice(1);
      var scale = options.sizeMultiplier;
      var img;
      var imgShift = 0; // In the LaTeX cancel package, line geometry is slightly different
      // depending on whether the subject is wider than it is tall, or vice versa.
      // We don't know the width of a group, so as a proxy, we test if
      // the subject is a single character. This captures most of the
      // subjects that should get the "tall" treatment.

      var isSingleChar = utils.isCharacterBox(group.body);

      if (label === "sout") {
        img = buildCommon.makeSpan(["stretchy", "sout"]);
        img.height = options.fontMetrics().defaultRuleThickness / scale;
        imgShift = -0.5 * options.fontMetrics().xHeight;
      } else if (label === "phase") {
        // Set a couple of dimensions from the steinmetz package.
        var lineWeight = calculateSize({
          number: 0.6,
          unit: "pt"
        }, options);
        var clearance = calculateSize({
          number: 0.35,
          unit: "ex"
        }, options); // Prevent size changes like \Huge from affecting line thickness

        var newOptions = options.havingBaseSizing();
        scale = scale / newOptions.sizeMultiplier;
        var angleHeight = inner.height + inner.depth + lineWeight + clearance; // Reserve a left pad for the angle.

        inner.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight); // Create an SVG

        var viewBoxHeight = Math.floor(1000 * angleHeight * scale);
        var path = phasePath(viewBoxHeight);
        var svgNode = new SvgNode([new PathNode("phase", path)], {
          "width": "400em",
          "height": makeEm(viewBoxHeight / 1000),
          "viewBox": "0 0 400000 " + viewBoxHeight,
          "preserveAspectRatio": "xMinYMin slice"
        }); // Wrap it in a span with overflow: hidden.

        img = buildCommon.makeSvgSpan(["hide-tail"], [svgNode], options);
        img.style.height = makeEm(angleHeight);
        imgShift = inner.depth + lineWeight + clearance;
      } else {
        // Add horizontal padding
        if (/cancel/.test(label)) {
          if (!isSingleChar) {
            inner.classes.push("cancel-pad");
          }
        } else if (label === "angl") {
          inner.classes.push("anglpad");
        } else {
          inner.classes.push("boxpad");
        } // Add vertical padding


        var topPad = 0;
        var bottomPad = 0;
        var ruleThickness = 0; // ref: cancel package: \advance\totalheight2\p@ % "+2"

        if (/box/.test(label)) {
          ruleThickness = Math.max(options.fontMetrics().fboxrule, // default
          options.minRuleThickness // User override.
          );
          topPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
          bottomPad = topPad;
        } else if (label === "angl") {
          ruleThickness = Math.max(options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
          topPad = 4 * ruleThickness; // gap = 3 × line, plus the line itself.

          bottomPad = Math.max(0, 0.25 - inner.depth);
        } else {
          topPad = isSingleChar ? 0.2 : 0;
          bottomPad = topPad;
        }

        img = stretchy.encloseSpan(inner, label, topPad, bottomPad, options);

        if (/fbox|boxed|fcolorbox/.test(label)) {
          img.style.borderStyle = "solid";
          img.style.borderWidth = makeEm(ruleThickness);
        } else if (label === "angl" && ruleThickness !== 0.049) {
          img.style.borderTopWidth = makeEm(ruleThickness);
          img.style.borderRightWidth = makeEm(ruleThickness);
        }

        imgShift = inner.depth + bottomPad;

        if (group.backgroundColor) {
          img.style.backgroundColor = group.backgroundColor;

          if (group.borderColor) {
            img.style.borderColor = group.borderColor;
          }
        }
      }

      var vlist;

      if (group.backgroundColor) {
        vlist = buildCommon.makeVList({
          positionType: "individualShift",
          children: [// Put the color background behind inner;
          {
            type: "elem",
            elem: img,
            shift: imgShift
          }, {
            type: "elem",
            elem: inner,
            shift: 0
          }]
        }, options);
      } else {
        var classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
        vlist = buildCommon.makeVList({
          positionType: "individualShift",
          children: [// Write the \cancel stroke on top of inner.
          {
            type: "elem",
            elem: inner,
            shift: 0
          }, {
            type: "elem",
            elem: img,
            shift: imgShift,
            wrapperClasses: classes
          }]
        }, options);
      }

      if (/cancel/.test(label)) {
        // The cancel package documentation says that cancel lines add their height
        // to the expression, but tests show that isn't how it actually works.
        vlist.height = inner.height;
        vlist.depth = inner.depth;
      }

      if (/cancel/.test(label) && !isSingleChar) {
        // cancel does not create horiz space for its line extension.
        return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options);
      } else {
        return buildCommon.makeSpan(["mord"], [vlist], options);
      }
    };

    var mathmlBuilder$6 = (group, options) => {
      var fboxsep = 0;
      var node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildGroup(group.body, options)]);

      switch (group.label) {
        case "\\cancel":
          node.setAttribute("notation", "updiagonalstrike");
          break;

        case "\\bcancel":
          node.setAttribute("notation", "downdiagonalstrike");
          break;

        case "\\phase":
          node.setAttribute("notation", "phasorangle");
          break;

        case "\\sout":
          node.setAttribute("notation", "horizontalstrike");
          break;

        case "\\fbox":
          node.setAttribute("notation", "box");
          break;

        case "\\angl":
          node.setAttribute("notation", "actuarial");
          break;

        case "\\fcolorbox":
        case "\\colorbox":
          // <menclose> doesn't have a good notation option. So use <mpadded>
          // instead. Set some attributes that come included with <menclose>.
          fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
          node.setAttribute("width", "+" + 2 * fboxsep + "pt");
          node.setAttribute("height", "+" + 2 * fboxsep + "pt");
          node.setAttribute("lspace", fboxsep + "pt"); //

          node.setAttribute("voffset", fboxsep + "pt");

          if (group.label === "\\fcolorbox") {
            var thk = Math.max(options.fontMetrics().fboxrule, // default
            options.minRuleThickness // user override
            );
            node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
          }

          break;

        case "\\xcancel":
          node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
          break;
      }

      if (group.backgroundColor) {
        node.setAttribute("mathbackground", group.backgroundColor);
      }

      return node;
    };

    defineFunction({
      type: "enclose",
      names: ["\\colorbox"],
      props: {
        numArgs: 2,
        allowedInText: true,
        argTypes: ["color", "text"]
      },

      handler(_ref, args, optArgs) {
        var {
          parser,
          funcName
        } = _ref;
        var color = assertNodeType(args[0], "color-token").color;
        var body = args[1];
        return {
          type: "enclose",
          mode: parser.mode,
          label: funcName,
          backgroundColor: color,
          body
        };
      },

      htmlBuilder: htmlBuilder$7,
      mathmlBuilder: mathmlBuilder$6
    });
    defineFunction({
      type: "enclose",
      names: ["\\fcolorbox"],
      props: {
        numArgs: 3,
        allowedInText: true,
        argTypes: ["color", "color", "text"]
      },

      handler(_ref2, args, optArgs) {
        var {
          parser,
          funcName
        } = _ref2;
        var borderColor = assertNodeType(args[0], "color-token").color;
        var backgroundColor = assertNodeType(args[1], "color-token").color;
        var body = args[2];
        return {
          type: "enclose",
          mode: parser.mode,
          label: funcName,
          backgroundColor,
          borderColor,
          body
        };
      },

      htmlBuilder: htmlBuilder$7,
      mathmlBuilder: mathmlBuilder$6
    });
    defineFunction({
      type: "enclose",
      names: ["\\fbox"],
      props: {
        numArgs: 1,
        argTypes: ["hbox"],
        allowedInText: true
      },

      handler(_ref3, args) {
        var {
          parser
        } = _ref3;
        return {
          type: "enclose",
          mode: parser.mode,
          label: "\\fbox",
          body: args[0]
        };
      }

    });
    defineFunction({
      type: "enclose",
      names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
      props: {
        numArgs: 1
      },

      handler(_ref4, args) {
        var {
          parser,
          funcName
        } = _ref4;
        var body = args[0];
        return {
          type: "enclose",
          mode: parser.mode,
          label: funcName,
          body
        };
      },

      htmlBuilder: htmlBuilder$7,
      mathmlBuilder: mathmlBuilder$6
    });
    defineFunction({
      type: "enclose",
      names: ["\\angl"],
      props: {
        numArgs: 1,
        argTypes: ["hbox"],
        allowedInText: false
      },

      handler(_ref5, args) {
        var {
          parser
        } = _ref5;
        return {
          type: "enclose",
          mode: parser.mode,
          label: "\\angl",
          body: args[0]
        };
      }

    });

    /**
     * All registered environments.
     * `environments.js` exports this same dictionary again and makes it public.
     * `Parser.js` requires this dictionary via `environments.js`.
     */
    var _environments = {};
    function defineEnvironment(_ref) {
      var {
        type,
        names,
        props,
        handler,
        htmlBuilder,
        mathmlBuilder
      } = _ref;
      // Set default values of environments.
      var data = {
        type,
        numArgs: props.numArgs || 0,
        allowedInText: false,
        numOptionalArgs: 0,
        handler
      };

      for (var i = 0; i < names.length; ++i) {
        // TODO: The value type of _environments should be a type union of all
        // possible `EnvSpec<>` possibilities instead of `EnvSpec<*>`, which is
        // an existential type.
        _environments[names[i]] = data;
      }

      if (htmlBuilder) {
        _htmlGroupBuilders[type] = htmlBuilder;
      }

      if (mathmlBuilder) {
        _mathmlGroupBuilders[type] = mathmlBuilder;
      }
    }

    /**
     * All registered global/built-in macros.
     * `macros.js` exports this same dictionary again and makes it public.
     * `Parser.js` requires this dictionary via `macros.js`.
     */
    var _macros = {}; // This function might one day accept an additional argument and do more things.

    function defineMacro(name, body) {
      _macros[name] = body;
    }

    // Helper functions
    function getHLines(parser) {
      // Return an array. The array length = number of hlines.
      // Each element in the array tells if the line is dashed.
      var hlineInfo = [];
      parser.consumeSpaces();
      var nxt = parser.fetch().text;

      if (nxt === "\\relax") {
        // \relax is an artifact of the \cr macro below
        parser.consume();
        parser.consumeSpaces();
        nxt = parser.fetch().text;
      }

      while (nxt === "\\hline" || nxt === "\\hdashline") {
        parser.consume();
        hlineInfo.push(nxt === "\\hdashline");
        parser.consumeSpaces();
        nxt = parser.fetch().text;
      }

      return hlineInfo;
    }

    var validateAmsEnvironmentContext = context => {
      var settings = context.parser.settings;

      if (!settings.displayMode) {
        throw new ParseError("{" + context.envName + "} can be used only in" + " display mode.");
      }
    }; // autoTag (an argument to parseArray) can be one of three values:
    // * undefined: Regular (not-top-level) array; no tags on each row
    // * true: Automatic equation numbering, overridable by \tag
    // * false: Tags allowed on each row, but no automatic numbering
    // This function *doesn't* work with the "split" environment name.


    function getAutoTag(name) {
      if (name.indexOf("ed") === -1) {
        return name.indexOf("*") === -1;
      } // return undefined;

    }
    /**
     * Parse the body of the environment, with rows delimited by \\ and
     * columns delimited by &, and create a nested list in row-major order
     * with one group per cell.  If given an optional argument style
     * ("text", "display", etc.), then each cell is cast into that style.
     */


    function parseArray(parser, _ref, style) {
      var {
        hskipBeforeAndAfter,
        addJot,
        cols,
        arraystretch,
        colSeparationType,
        autoTag,
        singleRow,
        emptySingleRow,
        maxNumCols,
        leqno
      } = _ref;
      parser.gullet.beginGroup();

      if (!singleRow) {
        // \cr is equivalent to \\ without the optional size argument (see below)
        // TODO: provide helpful error when \cr is used outside array environment
        parser.gullet.macros.set("\\cr", "\\\\\\relax");
      } // Get current arraystretch if it's not set by the environment


      if (!arraystretch) {
        var stretch = parser.gullet.expandMacroAsText("\\arraystretch");

        if (stretch == null) {
          // Default \arraystretch from lttab.dtx
          arraystretch = 1;
        } else {
          arraystretch = parseFloat(stretch);

          if (!arraystretch || arraystretch < 0) {
            throw new ParseError("Invalid \\arraystretch: " + stretch);
          }
        }
      } // Start group for first cell


      parser.gullet.beginGroup();
      var row = [];
      var body = [row];
      var rowGaps = [];
      var hLinesBeforeRow = [];
      var tags = autoTag != null ? [] : undefined; // amsmath uses \global\@eqnswtrue and \global\@eqnswfalse to represent
      // whether this row should have an equation number.  Simulate this with
      // a \@eqnsw macro set to 1 or 0.

      function beginRow() {
        if (autoTag) {
          parser.gullet.macros.set("\\@eqnsw", "1", true);
        }
      }

      function endRow() {
        if (tags) {
          if (parser.gullet.macros.get("\\df@tag")) {
            tags.push(parser.subparse([new Token("\\df@tag")]));
            parser.gullet.macros.set("\\df@tag", undefined, true);
          } else {
            tags.push(Boolean(autoTag) && parser.gullet.macros.get("\\@eqnsw") === "1");
          }
        }
      }

      beginRow(); // Test for \hline at the top of the array.

      hLinesBeforeRow.push(getHLines(parser));

      while (true) {
        // eslint-disable-line no-constant-condition
        // Parse each cell in its own group (namespace)
        var cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
        parser.gullet.endGroup();
        parser.gullet.beginGroup();
        cell = {
          type: "ordgroup",
          mode: parser.mode,
          body: cell
        };

        if (style) {
          cell = {
            type: "styling",
            mode: parser.mode,
            style,
            body: [cell]
          };
        }

        row.push(cell);
        var next = parser.fetch().text;

        if (next === "&") {
          if (maxNumCols && row.length === maxNumCols) {
            if (singleRow || colSeparationType) {
              // {equation} or {split}
              throw new ParseError("Too many tab characters: &", parser.nextToken);
            } else {
              // {array} environment
              parser.settings.reportNonstrict("textEnv", "Too few columns " + "specified in the {array} column argument.");
            }
          }

          parser.consume();
        } else if (next === "\\end") {
          endRow(); // Arrays terminate newlines with `\crcr` which consumes a `\cr` if
          // the last line is empty.  However, AMS environments keep the
          // empty row if it's the only one.
          // NOTE: Currently, `cell` is the last item added into `row`.

          if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) {
            body.pop();
          }

          if (hLinesBeforeRow.length < body.length + 1) {
            hLinesBeforeRow.push([]);
          }

          break;
        } else if (next === "\\\\") {
          parser.consume();
          var size = void 0; // \def\Let@{\let\\\math@cr}
          // \def\math@cr{...\math@cr@}
          // \def\math@cr@{\new@ifnextchar[\math@cr@@{\math@cr@@[\z@]}}
          // \def\math@cr@@[#1]{...\math@cr@@@...}
          // \def\math@cr@@@{\cr}

          if (parser.gullet.future().text !== " ") {
            size = parser.parseSizeGroup(true);
          }

          rowGaps.push(size ? size.value : null);
          endRow(); // check for \hline(s) following the row separator

          hLinesBeforeRow.push(getHLines(parser));
          row = [];
          body.push(row);
          beginRow();
        } else {
          throw new ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
        }
      } // End cell group


      parser.gullet.endGroup(); // End array group defining \cr

      parser.gullet.endGroup();
      return {
        type: "array",
        mode: parser.mode,
        addJot,
        arraystretch,
        body,
        cols,
        rowGaps,
        hskipBeforeAndAfter,
        hLinesBeforeRow,
        colSeparationType,
        tags,
        leqno
      };
    } // Decides on a style for cells in an array according to whether the given
    // environment name starts with the letter 'd'.


    function dCellStyle(envName) {
      if (envName.slice(0, 1) === "d") {
        return "display";
      } else {
        return "text";
      }
    }

    var htmlBuilder$6 = function htmlBuilder(group, options) {
      var r;
      var c;
      var nr = group.body.length;
      var hLinesBeforeRow = group.hLinesBeforeRow;
      var nc = 0;
      var body = new Array(nr);
      var hlines = [];
      var ruleThickness = Math.max( // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
      options.fontMetrics().arrayRuleWidth, options.minRuleThickness // User override.
      ); // Horizontal spacing

      var pt = 1 / options.fontMetrics().ptPerEm;
      var arraycolsep = 5 * pt; // default value, i.e. \arraycolsep in article.cls

      if (group.colSeparationType && group.colSeparationType === "small") {
        // We're in a {smallmatrix}. Default column space is \thickspace,
        // i.e. 5/18em = 0.2778em, per amsmath.dtx for {smallmatrix}.
        // But that needs adjustment because LaTeX applies \scriptstyle to the
        // entire array, including the colspace, but this function applies
        // \scriptstyle only inside each element.
        var localMultiplier = options.havingStyle(Style$1.SCRIPT).sizeMultiplier;
        arraycolsep = 0.2778 * (localMultiplier / options.sizeMultiplier);
      } // Vertical spacing


      var baselineskip = group.colSeparationType === "CD" ? calculateSize({
        number: 3,
        unit: "ex"
      }, options) : 12 * pt; // see size10.clo
      // Default \jot from ltmath.dtx
      // TODO(edemaine): allow overriding \jot via \setlength (#687)

      var jot = 3 * pt;
      var arrayskip = group.arraystretch * baselineskip;
      var arstrutHeight = 0.7 * arrayskip; // \strutbox in ltfsstrc.dtx and

      var arstrutDepth = 0.3 * arrayskip; // \@arstrutbox in lttab.dtx

      var totalHeight = 0; // Set a position for \hline(s) at the top of the array, if any.

      function setHLinePos(hlinesInGap) {
        for (var i = 0; i < hlinesInGap.length; ++i) {
          if (i > 0) {
            totalHeight += 0.25;
          }

          hlines.push({
            pos: totalHeight,
            isDashed: hlinesInGap[i]
          });
        }
      }

      setHLinePos(hLinesBeforeRow[0]);

      for (r = 0; r < group.body.length; ++r) {
        var inrow = group.body[r];
        var height = arstrutHeight; // \@array adds an \@arstrut

        var depth = arstrutDepth; // to each tow (via the template)

        if (nc < inrow.length) {
          nc = inrow.length;
        }

        var outrow = new Array(inrow.length);

        for (c = 0; c < inrow.length; ++c) {
          var elt = buildGroup$1(inrow[c], options);

          if (depth < elt.depth) {
            depth = elt.depth;
          }

          if (height < elt.height) {
            height = elt.height;
          }

          outrow[c] = elt;
        }

        var rowGap = group.rowGaps[r];
        var gap = 0;

        if (rowGap) {
          gap = calculateSize(rowGap, options);

          if (gap > 0) {
            // \@argarraycr
            gap += arstrutDepth;

            if (depth < gap) {
              depth = gap; // \@xargarraycr
            }

            gap = 0;
          }
        } // In AMS multiline environments such as aligned and gathered, rows
        // correspond to lines that have additional \jot added to the
        // \baselineskip via \openup.


        if (group.addJot) {
          depth += jot;
        }

        outrow.height = height;
        outrow.depth = depth;
        totalHeight += height;
        outrow.pos = totalHeight;
        totalHeight += depth + gap; // \@yargarraycr

        body[r] = outrow; // Set a position for \hline(s), if any.

        setHLinePos(hLinesBeforeRow[r + 1]);
      }

      var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
      var colDescriptions = group.cols || [];
      var cols = [];
      var colSep;
      var colDescrNum;
      var tagSpans = [];

      if (group.tags && group.tags.some(tag => tag)) {
        // An environment with manual tags and/or automatic equation numbers.
        // Create node(s), the latter of which trigger CSS counter increment.
        for (r = 0; r < nr; ++r) {
          var rw = body[r];
          var shift = rw.pos - offset;
          var tag = group.tags[r];
          var tagSpan = void 0;

          if (tag === true) {
            // automatic numbering
            tagSpan = buildCommon.makeSpan(["eqn-num"], [], options);
          } else if (tag === false) {
            // \nonumber/\notag or starred environment
            tagSpan = buildCommon.makeSpan([], [], options);
          } else {
            // manual \tag
            tagSpan = buildCommon.makeSpan([], buildExpression$1(tag, options, true), options);
          }

          tagSpan.depth = rw.depth;
          tagSpan.height = rw.height;
          tagSpans.push({
            type: "elem",
            elem: tagSpan,
            shift
          });
        }
      }

      for (c = 0, colDescrNum = 0; // Continue while either there are more columns or more column
      // descriptions, so trailing separators don't get lost.
      c < nc || colDescrNum < colDescriptions.length; ++c, ++colDescrNum) {
        var colDescr = colDescriptions[colDescrNum] || {};
        var firstSeparator = true;

        while (colDescr.type === "separator") {
          // If there is more than one separator in a row, add a space
          // between them.
          if (!firstSeparator) {
            colSep = buildCommon.makeSpan(["arraycolsep"], []);
            colSep.style.width = makeEm(options.fontMetrics().doubleRuleSep);
            cols.push(colSep);
          }

          if (colDescr.separator === "|" || colDescr.separator === ":") {
            var lineType = colDescr.separator === "|" ? "solid" : "dashed";
            var separator = buildCommon.makeSpan(["vertical-separator"], [], options);
            separator.style.height = makeEm(totalHeight);
            separator.style.borderRightWidth = makeEm(ruleThickness);
            separator.style.borderRightStyle = lineType;
            separator.style.margin = "0 " + makeEm(-ruleThickness / 2);

            var _shift = totalHeight - offset;

            if (_shift) {
              separator.style.verticalAlign = makeEm(-_shift);
            }

            cols.push(separator);
          } else {
            throw new ParseError("Invalid separator type: " + colDescr.separator);
          }

          colDescrNum++;
          colDescr = colDescriptions[colDescrNum] || {};
          firstSeparator = false;
        }

        if (c >= nc) {
          continue;
        }

        var sepwidth = void 0;

        if (c > 0 || group.hskipBeforeAndAfter) {
          sepwidth = utils.deflt(colDescr.pregap, arraycolsep);

          if (sepwidth !== 0) {
            colSep = buildCommon.makeSpan(["arraycolsep"], []);
            colSep.style.width = makeEm(sepwidth);
            cols.push(colSep);
          }
        }

        var col = [];

        for (r = 0; r < nr; ++r) {
          var row = body[r];
          var elem = row[c];

          if (!elem) {
            continue;
          }

          var _shift2 = row.pos - offset;

          elem.depth = row.depth;
          elem.height = row.height;
          col.push({
            type: "elem",
            elem: elem,
            shift: _shift2
          });
        }

        col = buildCommon.makeVList({
          positionType: "individualShift",
          children: col
        }, options);
        col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
        cols.push(col);

        if (c < nc - 1 || group.hskipBeforeAndAfter) {
          sepwidth = utils.deflt(colDescr.postgap, arraycolsep);

          if (sepwidth !== 0) {
            colSep = buildCommon.makeSpan(["arraycolsep"], []);
            colSep.style.width = makeEm(sepwidth);
            cols.push(colSep);
          }
        }
      }

      body = buildCommon.makeSpan(["mtable"], cols); // Add \hline(s), if any.

      if (hlines.length > 0) {
        var line = buildCommon.makeLineSpan("hline", options, ruleThickness);
        var dashes = buildCommon.makeLineSpan("hdashline", options, ruleThickness);
        var vListElems = [{
          type: "elem",
          elem: body,
          shift: 0
        }];

        while (hlines.length > 0) {
          var hline = hlines.pop();
          var lineShift = hline.pos - offset;

          if (hline.isDashed) {
            vListElems.push({
              type: "elem",
              elem: dashes,
              shift: lineShift
            });
          } else {
            vListElems.push({
              type: "elem",
              elem: line,
              shift: lineShift
            });
          }
        }

        body = buildCommon.makeVList({
          positionType: "individualShift",
          children: vListElems
        }, options);
      }

      if (tagSpans.length === 0) {
        return buildCommon.makeSpan(["mord"], [body], options);
      } else {
        var eqnNumCol = buildCommon.makeVList({
          positionType: "individualShift",
          children: tagSpans
        }, options);
        eqnNumCol = buildCommon.makeSpan(["tag"], [eqnNumCol], options);
        return buildCommon.makeFragment([body, eqnNumCol]);
      }
    };

    var alignMap = {
      c: "center ",
      l: "left ",
      r: "right "
    };

    var mathmlBuilder$5 = function mathmlBuilder(group, options) {
      var tbl = [];
      var glue = new mathMLTree.MathNode("mtd", [], ["mtr-glue"]);
      var tag = new mathMLTree.MathNode("mtd", [], ["mml-eqn-num"]);

      for (var i = 0; i < group.body.length; i++) {
        var rw = group.body[i];
        var row = [];

        for (var j = 0; j < rw.length; j++) {
          row.push(new mathMLTree.MathNode("mtd", [buildGroup(rw[j], options)]));
        }

        if (group.tags && group.tags[i]) {
          row.unshift(glue);
          row.push(glue);

          if (group.leqno) {
            row.unshift(tag);
          } else {
            row.push(tag);
          }
        }

        tbl.push(new mathMLTree.MathNode("mtr", row));
      }

      var table = new mathMLTree.MathNode("mtable", tbl); // Set column alignment, row spacing, column spacing, and
      // array lines by setting attributes on the table element.
      // Set the row spacing. In MathML, we specify a gap distance.
      // We do not use rowGap[] because MathML automatically increases
      // cell height with the height/depth of the element content.
      // LaTeX \arraystretch multiplies the row baseline-to-baseline distance.
      // We simulate this by adding (arraystretch - 1)em to the gap. This
      // does a reasonable job of adjusting arrays containing 1 em tall content.
      // The 0.16 and 0.09 values are found empirically. They produce an array
      // similar to LaTeX and in which content does not interfere with \hlines.

      var gap = group.arraystretch === 0.5 ? 0.1 // {smallmatrix}, {subarray}
      : 0.16 + group.arraystretch - 1 + (group.addJot ? 0.09 : 0);
      table.setAttribute("rowspacing", makeEm(gap)); // MathML table lines go only between cells.
      // To place a line on an edge we'll use <menclose>, if necessary.

      var menclose = "";
      var align = "";

      if (group.cols && group.cols.length > 0) {
        // Find column alignment, column spacing, and  vertical lines.
        var cols = group.cols;
        var columnLines = "";
        var prevTypeWasAlign = false;
        var iStart = 0;
        var iEnd = cols.length;

        if (cols[0].type === "separator") {
          menclose += "top ";
          iStart = 1;
        }

        if (cols[cols.length - 1].type === "separator") {
          menclose += "bottom ";
          iEnd -= 1;
        }

        for (var _i = iStart; _i < iEnd; _i++) {
          if (cols[_i].type === "align") {
            align += alignMap[cols[_i].align];

            if (prevTypeWasAlign) {
              columnLines += "none ";
            }

            prevTypeWasAlign = true;
          } else if (cols[_i].type === "separator") {
            // MathML accepts only single lines between cells.
            // So we read only the first of consecutive separators.
            if (prevTypeWasAlign) {
              columnLines += cols[_i].separator === "|" ? "solid " : "dashed ";
              prevTypeWasAlign = false;
            }
          }
        }

        table.setAttribute("columnalign", align.trim());

        if (/[sd]/.test(columnLines)) {
          table.setAttribute("columnlines", columnLines.trim());
        }
      } // Set column spacing.


      if (group.colSeparationType === "align") {
        var _cols = group.cols || [];

        var spacing = "";

        for (var _i2 = 1; _i2 < _cols.length; _i2++) {
          spacing += _i2 % 2 ? "0em " : "1em ";
        }

        table.setAttribute("columnspacing", spacing.trim());
      } else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") {
        table.setAttribute("columnspacing", "0em");
      } else if (group.colSeparationType === "small") {
        table.setAttribute("columnspacing", "0.2778em");
      } else if (group.colSeparationType === "CD") {
        table.setAttribute("columnspacing", "0.5em");
      } else {
        table.setAttribute("columnspacing", "1em");
      } // Address \hline and \hdashline


      var rowLines = "";
      var hlines = group.hLinesBeforeRow;
      menclose += hlines[0].length > 0 ? "left " : "";
      menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";

      for (var _i3 = 1; _i3 < hlines.length - 1; _i3++) {
        rowLines += hlines[_i3].length === 0 ? "none " // MathML accepts only a single line between rows. Read one element.
        : hlines[_i3][0] ? "dashed " : "solid ";
      }

      if (/[sd]/.test(rowLines)) {
        table.setAttribute("rowlines", rowLines.trim());
      }

      if (menclose !== "") {
        table = new mathMLTree.MathNode("menclose", [table]);
        table.setAttribute("notation", menclose.trim());
      }

      if (group.arraystretch && group.arraystretch < 1) {
        // A small array. Wrap in scriptstyle so row gap is not too large.
        table = new mathMLTree.MathNode("mstyle", [table]);
        table.setAttribute("scriptlevel", "1");
      }

      return table;
    }; // Convenience function for align, align*, aligned, alignat, alignat*, alignedat.


    var alignedHandler = function alignedHandler(context, args) {
      if (context.envName.indexOf("ed") === -1) {
        validateAmsEnvironmentContext(context);
      }

      var cols = [];
      var separationType = context.envName.indexOf("at") > -1 ? "alignat" : "align";
      var isSplit = context.envName === "split";
      var res = parseArray(context.parser, {
        cols,
        addJot: true,
        autoTag: isSplit ? undefined : getAutoTag(context.envName),
        emptySingleRow: true,
        colSeparationType: separationType,
        maxNumCols: isSplit ? 2 : undefined,
        leqno: context.parser.settings.leqno
      }, "display"); // Determining number of columns.
      // 1. If the first argument is given, we use it as a number of columns,
      //    and makes sure that each row doesn't exceed that number.
      // 2. Otherwise, just count number of columns = maximum number
      //    of cells in each row ("aligned" mode -- isAligned will be true).
      //
      // At the same time, prepend empty group {} at beginning of every second
      // cell in each row (starting with second cell) so that operators become
      // binary.  This behavior is implemented in amsmath's \start@aligned.

      var numMaths;
      var numCols = 0;
      var emptyGroup = {
        type: "ordgroup",
        mode: context.mode,
        body: []
      };

      if (args[0] && args[0].type === "ordgroup") {
        var arg0 = "";

        for (var i = 0; i < args[0].body.length; i++) {
          var textord = assertNodeType(args[0].body[i], "textord");
          arg0 += textord.text;
        }

        numMaths = Number(arg0);
        numCols = numMaths * 2;
      }

      var isAligned = !numCols;
      res.body.forEach(function (row) {
        for (var _i4 = 1; _i4 < row.length; _i4 += 2) {
          // Modify ordgroup node within styling node
          var styling = assertNodeType(row[_i4], "styling");
          var ordgroup = assertNodeType(styling.body[0], "ordgroup");
          ordgroup.body.unshift(emptyGroup);
        }

        if (!isAligned) {
          // Case 1
          var curMaths = row.length / 2;

          if (numMaths < curMaths) {
            throw new ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
          }
        } else if (numCols < row.length) {
          // Case 2
          numCols = row.length;
        }
      }); // Adjusting alignment.
      // In aligned mode, we add one \qquad between columns;
      // otherwise we add nothing.

      for (var _i5 = 0; _i5 < numCols; ++_i5) {
        var align = "r";
        var pregap = 0;

        if (_i5 % 2 === 1) {
          align = "l";
        } else if (_i5 > 0 && isAligned) {
          // "aligned" mode.
          pregap = 1; // add one \quad
        }

        cols[_i5] = {
          type: "align",
          align: align,
          pregap: pregap,
          postgap: 0
        };
      }

      res.colSeparationType = isAligned ? "align" : "alignat";
      return res;
    }; // Arrays are part of LaTeX, defined in lttab.dtx so its documentation
    // is part of the source2e.pdf file of LaTeX2e source documentation.
    // {darray} is an {array} environment where cells are set in \displaystyle,
    // as defined in nccmath.sty.


    defineEnvironment({
      type: "array",
      names: ["array", "darray"],
      props: {
        numArgs: 1
      },

      handler(context, args) {
        // Since no types are specified above, the two possibilities are
        // - The argument is wrapped in {} or [], in which case Parser's
        //   parseGroup() returns an "ordgroup" wrapping some symbol node.
        // - The argument is a bare symbol node.
        var symNode = checkSymbolNodeType(args[0]);
        var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
        var cols = colalign.map(function (nde) {
          var node = assertSymbolNodeType(nde);
          var ca = node.text;

          if ("lcr".indexOf(ca) !== -1) {
            return {
              type: "align",
              align: ca
            };
          } else if (ca === "|") {
            return {
              type: "separator",
              separator: "|"
            };
          } else if (ca === ":") {
            return {
              type: "separator",
              separator: ":"
            };
          }

          throw new ParseError("Unknown column alignment: " + ca, nde);
        });
        var res = {
          cols,
          hskipBeforeAndAfter: true,
          // \@preamble in lttab.dtx
          maxNumCols: cols.length
        };
        return parseArray(context.parser, res, dCellStyle(context.envName));
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    }); // The matrix environments of amsmath builds on the array environment
    // of LaTeX, which is discussed above.
    // The mathtools package adds starred versions of the same environments.
    // These have an optional argument to choose left|center|right justification.

    defineEnvironment({
      type: "array",
      names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
      props: {
        numArgs: 0
      },

      handler(context) {
        var delimiters = {
          "matrix": null,
          "pmatrix": ["(", ")"],
          "bmatrix": ["[", "]"],
          "Bmatrix": ["\\{", "\\}"],
          "vmatrix": ["|", "|"],
          "Vmatrix": ["\\Vert", "\\Vert"]
        }[context.envName.replace("*", "")]; // \hskip -\arraycolsep in amsmath

        var colAlign = "c";
        var payload = {
          hskipBeforeAndAfter: false,
          cols: [{
            type: "align",
            align: colAlign
          }]
        };

        if (context.envName.charAt(context.envName.length - 1) === "*") {
          // It's one of the mathtools starred functions.
          // Parse the optional alignment argument.
          var parser = context.parser;
          parser.consumeSpaces();

          if (parser.fetch().text === "[") {
            parser.consume();
            parser.consumeSpaces();
            colAlign = parser.fetch().text;

            if ("lcr".indexOf(colAlign) === -1) {
              throw new ParseError("Expected l or c or r", parser.nextToken);
            }

            parser.consume();
            parser.consumeSpaces();
            parser.expect("]");
            parser.consume();
            payload.cols = [{
              type: "align",
              align: colAlign
            }];
          }
        }

        var res = parseArray(context.parser, payload, dCellStyle(context.envName)); // Populate cols with the correct number of column alignment specs.

        var numCols = Math.max(0, ...res.body.map(row => row.length));
        res.cols = new Array(numCols).fill({
          type: "align",
          align: colAlign
        });
        return delimiters ? {
          type: "leftright",
          mode: context.mode,
          body: [res],
          left: delimiters[0],
          right: delimiters[1],
          rightColor: undefined // \right uninfluenced by \color in array

        } : res;
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    });
    defineEnvironment({
      type: "array",
      names: ["smallmatrix"],
      props: {
        numArgs: 0
      },

      handler(context) {
        var payload = {
          arraystretch: 0.5
        };
        var res = parseArray(context.parser, payload, "script");
        res.colSeparationType = "small";
        return res;
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    });
    defineEnvironment({
      type: "array",
      names: ["subarray"],
      props: {
        numArgs: 1
      },

      handler(context, args) {
        // Parsing of {subarray} is similar to {array}
        var symNode = checkSymbolNodeType(args[0]);
        var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
        var cols = colalign.map(function (nde) {
          var node = assertSymbolNodeType(nde);
          var ca = node.text; // {subarray} only recognizes "l" & "c"

          if ("lc".indexOf(ca) !== -1) {
            return {
              type: "align",
              align: ca
            };
          }

          throw new ParseError("Unknown column alignment: " + ca, nde);
        });

        if (cols.length > 1) {
          throw new ParseError("{subarray} can contain only one column");
        }

        var res = {
          cols,
          hskipBeforeAndAfter: false,
          arraystretch: 0.5
        };
        res = parseArray(context.parser, res, "script");

        if (res.body.length > 0 && res.body[0].length > 1) {
          throw new ParseError("{subarray} can contain only one column");
        }

        return res;
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    }); // A cases environment (in amsmath.sty) is almost equivalent to
    // \def\arraystretch{1.2}%
    // \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
    // {dcases} is a {cases} environment where cells are set in \displaystyle,
    // as defined in mathtools.sty.
    // {rcases} is another mathtools environment. It's brace is on the right side.

    defineEnvironment({
      type: "array",
      names: ["cases", "dcases", "rcases", "drcases"],
      props: {
        numArgs: 0
      },

      handler(context) {
        var payload = {
          arraystretch: 1.2,
          cols: [{
            type: "align",
            align: "l",
            pregap: 0,
            // TODO(kevinb) get the current style.
            // For now we use the metrics for TEXT style which is what we were
            // doing before.  Before attempting to get the current style we
            // should look at TeX's behavior especially for \over and matrices.
            postgap: 1.0
            /* 1em quad */

          }, {
            type: "align",
            align: "l",
            pregap: 0,
            postgap: 0
          }]
        };
        var res = parseArray(context.parser, payload, dCellStyle(context.envName));
        return {
          type: "leftright",
          mode: context.mode,
          body: [res],
          left: context.envName.indexOf("r") > -1 ? "." : "\\{",
          right: context.envName.indexOf("r") > -1 ? "\\}" : ".",
          rightColor: undefined
        };
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    }); // In the align environment, one uses ampersands, &, to specify number of
    // columns in each row, and to locate spacing between each column.
    // align gets automatic numbering. align* and aligned do not.
    // The alignedat environment can be used in math mode.
    // Note that we assume \nomallineskiplimit to be zero,
    // so that \strut@ is the same as \strut.

    defineEnvironment({
      type: "array",
      names: ["align", "align*", "aligned", "split"],
      props: {
        numArgs: 0
      },
      handler: alignedHandler,
      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    }); // A gathered environment is like an array environment with one centered
    // column, but where rows are considered lines so get \jot line spacing
    // and contents are set in \displaystyle.

    defineEnvironment({
      type: "array",
      names: ["gathered", "gather", "gather*"],
      props: {
        numArgs: 0
      },

      handler(context) {
        if (utils.contains(["gather", "gather*"], context.envName)) {
          validateAmsEnvironmentContext(context);
        }

        var res = {
          cols: [{
            type: "align",
            align: "c"
          }],
          addJot: true,
          colSeparationType: "gather",
          autoTag: getAutoTag(context.envName),
          emptySingleRow: true,
          leqno: context.parser.settings.leqno
        };
        return parseArray(context.parser, res, "display");
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    }); // alignat environment is like an align environment, but one must explicitly
    // specify maximum number of columns in each row, and can adjust spacing between
    // each columns.

    defineEnvironment({
      type: "array",
      names: ["alignat", "alignat*", "alignedat"],
      props: {
        numArgs: 1
      },
      handler: alignedHandler,
      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    });
    defineEnvironment({
      type: "array",
      names: ["equation", "equation*"],
      props: {
        numArgs: 0
      },

      handler(context) {
        validateAmsEnvironmentContext(context);
        var res = {
          autoTag: getAutoTag(context.envName),
          emptySingleRow: true,
          singleRow: true,
          maxNumCols: 1,
          leqno: context.parser.settings.leqno
        };
        return parseArray(context.parser, res, "display");
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    });
    defineEnvironment({
      type: "array",
      names: ["CD"],
      props: {
        numArgs: 0
      },

      handler(context) {
        validateAmsEnvironmentContext(context);
        return parseCD(context.parser);
      },

      htmlBuilder: htmlBuilder$6,
      mathmlBuilder: mathmlBuilder$5
    });
    defineMacro("\\nonumber", "\\gdef\\@eqnsw{0}");
    defineMacro("\\notag", "\\nonumber"); // Catch \hline outside array environment

    defineFunction({
      type: "text",
      // Doesn't matter what this is.
      names: ["\\hline", "\\hdashline"],
      props: {
        numArgs: 0,
        allowedInText: true,
        allowedInMath: true
      },

      handler(context, args) {
        throw new ParseError(context.funcName + " valid only within array environment");
      }

    });

    var environments = _environments;

    // defineEnvironment definitions.

    defineFunction({
      type: "environment",
      names: ["\\begin", "\\end"],
      props: {
        numArgs: 1,
        argTypes: ["text"]
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        var nameGroup = args[0];

        if (nameGroup.type !== "ordgroup") {
          throw new ParseError("Invalid environment name", nameGroup);
        }

        var envName = "";

        for (var i = 0; i < nameGroup.body.length; ++i) {
          envName += assertNodeType(nameGroup.body[i], "textord").text;
        }

        if (funcName === "\\begin") {
          // begin...end is similar to left...right
          if (!environments.hasOwnProperty(envName)) {
            throw new ParseError("No such environment: " + envName, nameGroup);
          } // Build the environment object. Arguments and other information will
          // be made available to the begin and end methods using properties.


          var env = environments[envName];
          var {
            args: _args,
            optArgs
          } = parser.parseArguments("\\begin{" + envName + "}", env);
          var context = {
            mode: parser.mode,
            envName,
            parser
          };
          var result = env.handler(context, _args, optArgs);
          parser.expect("\\end", false);
          var endNameToken = parser.nextToken;
          var end = assertNodeType(parser.parseFunction(), "environment");

          if (end.name !== envName) {
            throw new ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
          } // $FlowFixMe, "environment" handler returns an environment ParseNode


          return result;
        }

        return {
          type: "environment",
          mode: parser.mode,
          name: envName,
          nameGroup
        };
      }

    });

    // TODO(kevinb): implement \\sl and \\sc

    var htmlBuilder$5 = (group, options) => {
      var font = group.font;
      var newOptions = options.withFont(font);
      return buildGroup$1(group.body, newOptions);
    };

    var mathmlBuilder$4 = (group, options) => {
      var font = group.font;
      var newOptions = options.withFont(font);
      return buildGroup(group.body, newOptions);
    };

    var fontAliases = {
      "\\Bbb": "\\mathbb",
      "\\bold": "\\mathbf",
      "\\frak": "\\mathfrak",
      "\\bm": "\\boldsymbol"
    };
    defineFunction({
      type: "font",
      names: [// styles, except \boldsymbol defined below
      "\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", // families
      "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", // aliases, except \bm defined below
      "\\Bbb", "\\bold", "\\frak"],
      props: {
        numArgs: 1,
        allowedInArgument: true
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var body = normalizeArgument(args[0]);
        var func = funcName;

        if (func in fontAliases) {
          func = fontAliases[func];
        }

        return {
          type: "font",
          mode: parser.mode,
          font: func.slice(1),
          body
        };
      },
      htmlBuilder: htmlBuilder$5,
      mathmlBuilder: mathmlBuilder$4
    });
    defineFunction({
      type: "mclass",
      names: ["\\boldsymbol", "\\bm"],
      props: {
        numArgs: 1
      },
      handler: (_ref2, args) => {
        var {
          parser
        } = _ref2;
        var body = args[0];
        var isCharacterBox = utils.isCharacterBox(body); // amsbsy.sty's \boldsymbol uses \binrel spacing to inherit the
        // argument's bin|rel|ord status

        return {
          type: "mclass",
          mode: parser.mode,
          mclass: binrelClass(body),
          body: [{
            type: "font",
            mode: parser.mode,
            font: "boldsymbol",
            body
          }],
          isCharacterBox: isCharacterBox
        };
      }
    }); // Old font changing functions

    defineFunction({
      type: "font",
      names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
      props: {
        numArgs: 0,
        allowedInText: true
      },
      handler: (_ref3, args) => {
        var {
          parser,
          funcName,
          breakOnTokenText
        } = _ref3;
        var {
          mode
        } = parser;
        var body = parser.parseExpression(true, breakOnTokenText);
        var style = "math" + funcName.slice(1);
        return {
          type: "font",
          mode: mode,
          font: style,
          body: {
            type: "ordgroup",
            mode: parser.mode,
            body
          }
        };
      },
      htmlBuilder: htmlBuilder$5,
      mathmlBuilder: mathmlBuilder$4
    });

    var adjustStyle = (size, originalStyle) => {
      // Figure out what style this fraction should be in based on the
      // function used
      var style = originalStyle;

      if (size === "display") {
        // Get display style as a default.
        // If incoming style is sub/sup, use style.text() to get correct size.
        style = style.id >= Style$1.SCRIPT.id ? style.text() : Style$1.DISPLAY;
      } else if (size === "text" && style.size === Style$1.DISPLAY.size) {
        // We're in a \tfrac but incoming style is displaystyle, so:
        style = Style$1.TEXT;
      } else if (size === "script") {
        style = Style$1.SCRIPT;
      } else if (size === "scriptscript") {
        style = Style$1.SCRIPTSCRIPT;
      }

      return style;
    };

    var htmlBuilder$4 = (group, options) => {
      // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
      var style = adjustStyle(group.size, options.style);
      var nstyle = style.fracNum();
      var dstyle = style.fracDen();
      var newOptions;
      newOptions = options.havingStyle(nstyle);
      var numerm = buildGroup$1(group.numer, newOptions, options);

      if (group.continued) {
        // \cfrac inserts a \strut into the numerator.
        // Get \strut dimensions from TeXbook page 353.
        var hStrut = 8.5 / options.fontMetrics().ptPerEm;
        var dStrut = 3.5 / options.fontMetrics().ptPerEm;
        numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
        numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
      }

      newOptions = options.havingStyle(dstyle);
      var denomm = buildGroup$1(group.denom, newOptions, options);
      var rule;
      var ruleWidth;
      var ruleSpacing;

      if (group.hasBarLine) {
        if (group.barSize) {
          ruleWidth = calculateSize(group.barSize, options);
          rule = buildCommon.makeLineSpan("frac-line", options, ruleWidth);
        } else {
          rule = buildCommon.makeLineSpan("frac-line", options);
        }

        ruleWidth = rule.height;
        ruleSpacing = rule.height;
      } else {
        rule = null;
        ruleWidth = 0;
        ruleSpacing = options.fontMetrics().defaultRuleThickness;
      } // Rule 15b


      var numShift;
      var clearance;
      var denomShift;

      if (style.size === Style$1.DISPLAY.size || group.size === "display") {
        numShift = options.fontMetrics().num1;

        if (ruleWidth > 0) {
          clearance = 3 * ruleSpacing;
        } else {
          clearance = 7 * ruleSpacing;
        }

        denomShift = options.fontMetrics().denom1;
      } else {
        if (ruleWidth > 0) {
          numShift = options.fontMetrics().num2;
          clearance = ruleSpacing;
        } else {
          numShift = options.fontMetrics().num3;
          clearance = 3 * ruleSpacing;
        }

        denomShift = options.fontMetrics().denom2;
      }

      var frac;

      if (!rule) {
        // Rule 15c
        var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);

        if (candidateClearance < clearance) {
          numShift += 0.5 * (clearance - candidateClearance);
          denomShift += 0.5 * (clearance - candidateClearance);
        }

        frac = buildCommon.makeVList({
          positionType: "individualShift",
          children: [{
            type: "elem",
            elem: denomm,
            shift: denomShift
          }, {
            type: "elem",
            elem: numerm,
            shift: -numShift
          }]
        }, options);
      } else {
        // Rule 15d
        var axisHeight = options.fontMetrics().axisHeight;

        if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
          numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
        }

        if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
          denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
        }

        var midShift = -(axisHeight - 0.5 * ruleWidth);
        frac = buildCommon.makeVList({
          positionType: "individualShift",
          children: [{
            type: "elem",
            elem: denomm,
            shift: denomShift
          }, {
            type: "elem",
            elem: rule,
            shift: midShift
          }, {
            type: "elem",
            elem: numerm,
            shift: -numShift
          }]
        }, options);
      } // Since we manually change the style sometimes (with \dfrac or \tfrac),
      // account for the possible size change here.


      newOptions = options.havingStyle(style);
      frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
      frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier; // Rule 15e

      var delimSize;

      if (style.size === Style$1.DISPLAY.size) {
        delimSize = options.fontMetrics().delim1;
      } else if (style.size === Style$1.SCRIPTSCRIPT.size) {
        delimSize = options.havingStyle(Style$1.SCRIPT).fontMetrics().delim2;
      } else {
        delimSize = options.fontMetrics().delim2;
      }

      var leftDelim;
      var rightDelim;

      if (group.leftDelim == null) {
        leftDelim = makeNullDelimiter(options, ["mopen"]);
      } else {
        leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
      }

      if (group.continued) {
        rightDelim = buildCommon.makeSpan([]); // zero width for \cfrac
      } else if (group.rightDelim == null) {
        rightDelim = makeNullDelimiter(options, ["mclose"]);
      } else {
        rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
      }

      return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [leftDelim, buildCommon.makeSpan(["mfrac"], [frac]), rightDelim], options);
    };

    var mathmlBuilder$3 = (group, options) => {
      var node = new mathMLTree.MathNode("mfrac", [buildGroup(group.numer, options), buildGroup(group.denom, options)]);

      if (!group.hasBarLine) {
        node.setAttribute("linethickness", "0px");
      } else if (group.barSize) {
        var ruleWidth = calculateSize(group.barSize, options);
        node.setAttribute("linethickness", makeEm(ruleWidth));
      }

      var style = adjustStyle(group.size, options.style);

      if (style.size !== options.style.size) {
        node = new mathMLTree.MathNode("mstyle", [node]);
        var isDisplay = style.size === Style$1.DISPLAY.size ? "true" : "false";
        node.setAttribute("displaystyle", isDisplay);
        node.setAttribute("scriptlevel", "0");
      }

      if (group.leftDelim != null || group.rightDelim != null) {
        var withDelims = [];

        if (group.leftDelim != null) {
          var leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
          leftOp.setAttribute("fence", "true");
          withDelims.push(leftOp);
        }

        withDelims.push(node);

        if (group.rightDelim != null) {
          var rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
          rightOp.setAttribute("fence", "true");
          withDelims.push(rightOp);
        }

        return makeRow(withDelims);
      }

      return node;
    };

    defineFunction({
      type: "genfrac",
      names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", // can’t be entered directly
      "\\\\bracefrac", "\\\\brackfrac" // ditto
      ],
      props: {
        numArgs: 2,
        allowedInArgument: true
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var numer = args[0];
        var denom = args[1];
        var hasBarLine;
        var leftDelim = null;
        var rightDelim = null;
        var size = "auto";

        switch (funcName) {
          case "\\dfrac":
          case "\\frac":
          case "\\tfrac":
            hasBarLine = true;
            break;

          case "\\\\atopfrac":
            hasBarLine = false;
            break;

          case "\\dbinom":
          case "\\binom":
          case "\\tbinom":
            hasBarLine = false;
            leftDelim = "(";
            rightDelim = ")";
            break;

          case "\\\\bracefrac":
            hasBarLine = false;
            leftDelim = "\\{";
            rightDelim = "\\}";
            break;

          case "\\\\brackfrac":
            hasBarLine = false;
            leftDelim = "[";
            rightDelim = "]";
            break;

          default:
            throw new Error("Unrecognized genfrac command");
        }

        switch (funcName) {
          case "\\dfrac":
          case "\\dbinom":
            size = "display";
            break;

          case "\\tfrac":
          case "\\tbinom":
            size = "text";
            break;
        }

        return {
          type: "genfrac",
          mode: parser.mode,
          continued: false,
          numer,
          denom,
          hasBarLine,
          leftDelim,
          rightDelim,
          size,
          barSize: null
        };
      },
      htmlBuilder: htmlBuilder$4,
      mathmlBuilder: mathmlBuilder$3
    });
    defineFunction({
      type: "genfrac",
      names: ["\\cfrac"],
      props: {
        numArgs: 2
      },
      handler: (_ref2, args) => {
        var {
          parser,
          funcName
        } = _ref2;
        var numer = args[0];
        var denom = args[1];
        return {
          type: "genfrac",
          mode: parser.mode,
          continued: true,
          numer,
          denom,
          hasBarLine: true,
          leftDelim: null,
          rightDelim: null,
          size: "display",
          barSize: null
        };
      }
    }); // Infix generalized fractions -- these are not rendered directly, but replaced
    // immediately by one of the variants above.

    defineFunction({
      type: "infix",
      names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
      props: {
        numArgs: 0,
        infix: true
      },

      handler(_ref3) {
        var {
          parser,
          funcName,
          token
        } = _ref3;
        var replaceWith;

        switch (funcName) {
          case "\\over":
            replaceWith = "\\frac";
            break;

          case "\\choose":
            replaceWith = "\\binom";
            break;

          case "\\atop":
            replaceWith = "\\\\atopfrac";
            break;

          case "\\brace":
            replaceWith = "\\\\bracefrac";
            break;

          case "\\brack":
            replaceWith = "\\\\brackfrac";
            break;

          default:
            throw new Error("Unrecognized infix genfrac command");
        }

        return {
          type: "infix",
          mode: parser.mode,
          replaceWith,
          token
        };
      }

    });
    var stylArray = ["display", "text", "script", "scriptscript"];

    var delimFromValue = function delimFromValue(delimString) {
      var delim = null;

      if (delimString.length > 0) {
        delim = delimString;
        delim = delim === "." ? null : delim;
      }

      return delim;
    };

    defineFunction({
      type: "genfrac",
      names: ["\\genfrac"],
      props: {
        numArgs: 6,
        allowedInArgument: true,
        argTypes: ["math", "math", "size", "text", "math", "math"]
      },

      handler(_ref4, args) {
        var {
          parser
        } = _ref4;
        var numer = args[4];
        var denom = args[5]; // Look into the parse nodes to get the desired delimiters.

        var leftNode = normalizeArgument(args[0]);
        var leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
        var rightNode = normalizeArgument(args[1]);
        var rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
        var barNode = assertNodeType(args[2], "size");
        var hasBarLine;
        var barSize = null;

        if (barNode.isBlank) {
          // \genfrac acts differently than \above.
          // \genfrac treats an empty size group as a signal to use a
          // standard bar size. \above would see size = 0 and omit the bar.
          hasBarLine = true;
        } else {
          barSize = barNode.value;
          hasBarLine = barSize.number > 0;
        } // Find out if we want displaystyle, textstyle, etc.


        var size = "auto";
        var styl = args[3];

        if (styl.type === "ordgroup") {
          if (styl.body.length > 0) {
            var textOrd = assertNodeType(styl.body[0], "textord");
            size = stylArray[Number(textOrd.text)];
          }
        } else {
          styl = assertNodeType(styl, "textord");
          size = stylArray[Number(styl.text)];
        }

        return {
          type: "genfrac",
          mode: parser.mode,
          numer,
          denom,
          continued: false,
          hasBarLine,
          barSize,
          leftDelim,
          rightDelim,
          size
        };
      },

      htmlBuilder: htmlBuilder$4,
      mathmlBuilder: mathmlBuilder$3
    }); // \above is an infix fraction that also defines a fraction bar size.

    defineFunction({
      type: "infix",
      names: ["\\above"],
      props: {
        numArgs: 1,
        argTypes: ["size"],
        infix: true
      },

      handler(_ref5, args) {
        var {
          parser,
          funcName,
          token
        } = _ref5;
        return {
          type: "infix",
          mode: parser.mode,
          replaceWith: "\\\\abovefrac",
          size: assertNodeType(args[0], "size").value,
          token
        };
      }

    });
    defineFunction({
      type: "genfrac",
      names: ["\\\\abovefrac"],
      props: {
        numArgs: 3,
        argTypes: ["math", "size", "math"]
      },
      handler: (_ref6, args) => {
        var {
          parser,
          funcName
        } = _ref6;
        var numer = args[0];
        var barSize = assert(assertNodeType(args[1], "infix").size);
        var denom = args[2];
        var hasBarLine = barSize.number > 0;
        return {
          type: "genfrac",
          mode: parser.mode,
          numer,
          denom,
          continued: false,
          hasBarLine,
          barSize,
          leftDelim: null,
          rightDelim: null,
          size: "auto"
        };
      },
      htmlBuilder: htmlBuilder$4,
      mathmlBuilder: mathmlBuilder$3
    });

    // NOTE: Unlike most `htmlBuilder`s, this one handles not only "horizBrace", but
    // also "supsub" since an over/underbrace can affect super/subscripting.
    var htmlBuilder$3 = (grp, options) => {
      var style = options.style; // Pull out the `ParseNode<"horizBrace">` if `grp` is a "supsub" node.

      var supSubGroup;
      var group;

      if (grp.type === "supsub") {
        // Ref: LaTeX source2e: }}}}\limits}
        // i.e. LaTeX treats the brace similar to an op and passes it
        // with \limits, so we need to assign supsub style.
        supSubGroup = grp.sup ? buildGroup$1(grp.sup, options.havingStyle(style.sup()), options) : buildGroup$1(grp.sub, options.havingStyle(style.sub()), options);
        group = assertNodeType(grp.base, "horizBrace");
      } else {
        group = assertNodeType(grp, "horizBrace");
      } // Build the base group


      var body = buildGroup$1(group.base, options.havingBaseStyle(Style$1.DISPLAY)); // Create the stretchy element

      var braceBody = stretchy.svgSpan(group, options); // Generate the vlist, with the appropriate kerns        ┏━━━━━━━━┓
      // This first vlist contains the content and the brace:   equation

      var vlist;

      if (group.isOver) {
        vlist = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: body
          }, {
            type: "kern",
            size: 0.1
          }, {
            type: "elem",
            elem: braceBody
          }]
        }, options); // $FlowFixMe: Replace this with passing "svg-align" into makeVList.

        vlist.children[0].children[0].children[1].classes.push("svg-align");
      } else {
        vlist = buildCommon.makeVList({
          positionType: "bottom",
          positionData: body.depth + 0.1 + braceBody.height,
          children: [{
            type: "elem",
            elem: braceBody
          }, {
            type: "kern",
            size: 0.1
          }, {
            type: "elem",
            elem: body
          }]
        }, options); // $FlowFixMe: Replace this with passing "svg-align" into makeVList.

        vlist.children[0].children[0].children[0].classes.push("svg-align");
      }

      if (supSubGroup) {
        // To write the supsub, wrap the first vlist in another vlist:
        // They can't all go in the same vlist, because the note might be
        // wider than the equation. We want the equation to control the
        // brace width.
        //      note          long note           long note
        //   ┏━━━━━━━━┓   or    ┏━━━┓     not    ┏━━━━━━━━━┓
        //    equation           eqn                 eqn
        var vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);

        if (group.isOver) {
          vlist = buildCommon.makeVList({
            positionType: "firstBaseline",
            children: [{
              type: "elem",
              elem: vSpan
            }, {
              type: "kern",
              size: 0.2
            }, {
              type: "elem",
              elem: supSubGroup
            }]
          }, options);
        } else {
          vlist = buildCommon.makeVList({
            positionType: "bottom",
            positionData: vSpan.depth + 0.2 + supSubGroup.height + supSubGroup.depth,
            children: [{
              type: "elem",
              elem: supSubGroup
            }, {
              type: "kern",
              size: 0.2
            }, {
              type: "elem",
              elem: vSpan
            }]
          }, options);
        }
      }

      return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
    };

    var mathmlBuilder$2 = (group, options) => {
      var accentNode = stretchy.mathMLnode(group.label);
      return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildGroup(group.base, options), accentNode]);
    }; // Horizontal stretchy braces


    defineFunction({
      type: "horizBrace",
      names: ["\\overbrace", "\\underbrace"],
      props: {
        numArgs: 1
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        return {
          type: "horizBrace",
          mode: parser.mode,
          label: funcName,
          isOver: /^\\over/.test(funcName),
          base: args[0]
        };
      },

      htmlBuilder: htmlBuilder$3,
      mathmlBuilder: mathmlBuilder$2
    });

    defineFunction({
      type: "href",
      names: ["\\href"],
      props: {
        numArgs: 2,
        argTypes: ["url", "original"],
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          parser
        } = _ref;
        var body = args[1];
        var href = assertNodeType(args[0], "url").url;

        if (!parser.settings.isTrusted({
          command: "\\href",
          url: href
        })) {
          return parser.formatUnsupportedCmd("\\href");
        }

        return {
          type: "href",
          mode: parser.mode,
          href,
          body: ordargument(body)
        };
      },
      htmlBuilder: (group, options) => {
        var elements = buildExpression$1(group.body, options, false);
        return buildCommon.makeAnchor(group.href, [], elements, options);
      },
      mathmlBuilder: (group, options) => {
        var math = buildExpressionRow(group.body, options);

        if (!(math instanceof MathNode)) {
          math = new MathNode("mrow", [math]);
        }

        math.setAttribute("href", group.href);
        return math;
      }
    });
    defineFunction({
      type: "href",
      names: ["\\url"],
      props: {
        numArgs: 1,
        argTypes: ["url"],
        allowedInText: true
      },
      handler: (_ref2, args) => {
        var {
          parser
        } = _ref2;
        var href = assertNodeType(args[0], "url").url;

        if (!parser.settings.isTrusted({
          command: "\\url",
          url: href
        })) {
          return parser.formatUnsupportedCmd("\\url");
        }

        var chars = [];

        for (var i = 0; i < href.length; i++) {
          var c = href[i];

          if (c === "~") {
            c = "\\textasciitilde";
          }

          chars.push({
            type: "textord",
            mode: "text",
            text: c
          });
        }

        var body = {
          type: "text",
          mode: parser.mode,
          font: "\\texttt",
          body: chars
        };
        return {
          type: "href",
          mode: parser.mode,
          href,
          body: ordargument(body)
        };
      }
    });

    // In LaTeX, \vcenter can act only on a box, as in
    // \vcenter{\hbox{$\frac{a+b}{\dfrac{c}{d}}$}}
    // This function by itself doesn't do anything but prevent a soft line break.

    defineFunction({
      type: "hbox",
      names: ["\\hbox"],
      props: {
        numArgs: 1,
        argTypes: ["text"],
        allowedInText: true,
        primitive: true
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        return {
          type: "hbox",
          mode: parser.mode,
          body: ordargument(args[0])
        };
      },

      htmlBuilder(group, options) {
        var elements = buildExpression$1(group.body, options, false);
        return buildCommon.makeFragment(elements);
      },

      mathmlBuilder(group, options) {
        return new mathMLTree.MathNode("mrow", buildExpression(group.body, options));
      }

    });

    defineFunction({
      type: "html",
      names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
      props: {
        numArgs: 2,
        argTypes: ["raw", "original"],
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName,
          token
        } = _ref;
        var value = assertNodeType(args[0], "raw").string;
        var body = args[1];

        if (parser.settings.strict) {
          parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
        }

        var trustContext;
        var attributes = {};

        switch (funcName) {
          case "\\htmlClass":
            attributes.class = value;
            trustContext = {
              command: "\\htmlClass",
              class: value
            };
            break;

          case "\\htmlId":
            attributes.id = value;
            trustContext = {
              command: "\\htmlId",
              id: value
            };
            break;

          case "\\htmlStyle":
            attributes.style = value;
            trustContext = {
              command: "\\htmlStyle",
              style: value
            };
            break;

          case "\\htmlData":
            {
              var data = value.split(",");

              for (var i = 0; i < data.length; i++) {
                var keyVal = data[i].split("=");

                if (keyVal.length !== 2) {
                  throw new ParseError("Error parsing key-value for \\htmlData");
                }

                attributes["data-" + keyVal[0].trim()] = keyVal[1].trim();
              }

              trustContext = {
                command: "\\htmlData",
                attributes
              };
              break;
            }

          default:
            throw new Error("Unrecognized html command");
        }

        if (!parser.settings.isTrusted(trustContext)) {
          return parser.formatUnsupportedCmd(funcName);
        }

        return {
          type: "html",
          mode: parser.mode,
          attributes,
          body: ordargument(body)
        };
      },
      htmlBuilder: (group, options) => {
        var elements = buildExpression$1(group.body, options, false);
        var classes = ["enclosing"];

        if (group.attributes.class) {
          classes.push(...group.attributes.class.trim().split(/\s+/));
        }

        var span = buildCommon.makeSpan(classes, elements, options);

        for (var attr in group.attributes) {
          if (attr !== "class" && group.attributes.hasOwnProperty(attr)) {
            span.setAttribute(attr, group.attributes[attr]);
          }
        }

        return span;
      },
      mathmlBuilder: (group, options) => {
        return buildExpressionRow(group.body, options);
      }
    });

    defineFunction({
      type: "htmlmathml",
      names: ["\\html@mathml"],
      props: {
        numArgs: 2,
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          parser
        } = _ref;
        return {
          type: "htmlmathml",
          mode: parser.mode,
          html: ordargument(args[0]),
          mathml: ordargument(args[1])
        };
      },
      htmlBuilder: (group, options) => {
        var elements = buildExpression$1(group.html, options, false);
        return buildCommon.makeFragment(elements);
      },
      mathmlBuilder: (group, options) => {
        return buildExpressionRow(group.mathml, options);
      }
    });

    var sizeData = function sizeData(str) {
      if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) {
        // str is a number with no unit specified.
        // default unit is bp, per graphix package.
        return {
          number: +str,
          unit: "bp"
        };
      } else {
        var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);

        if (!match) {
          throw new ParseError("Invalid size: '" + str + "' in \\includegraphics");
        }

        var data = {
          number: +(match[1] + match[2]),
          // sign + magnitude, cast to number
          unit: match[3]
        };

        if (!validUnit(data)) {
          throw new ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
        }

        return data;
      }
    };

    defineFunction({
      type: "includegraphics",
      names: ["\\includegraphics"],
      props: {
        numArgs: 1,
        numOptionalArgs: 1,
        argTypes: ["raw", "url"],
        allowedInText: false
      },
      handler: (_ref, args, optArgs) => {
        var {
          parser
        } = _ref;
        var width = {
          number: 0,
          unit: "em"
        };
        var height = {
          number: 0.9,
          unit: "em"
        }; // sorta character sized.

        var totalheight = {
          number: 0,
          unit: "em"
        };
        var alt = "";

        if (optArgs[0]) {
          var attributeStr = assertNodeType(optArgs[0], "raw").string; // Parser.js does not parse key/value pairs. We get a string.

          var attributes = attributeStr.split(",");

          for (var i = 0; i < attributes.length; i++) {
            var keyVal = attributes[i].split("=");

            if (keyVal.length === 2) {
              var str = keyVal[1].trim();

              switch (keyVal[0].trim()) {
                case "alt":
                  alt = str;
                  break;

                case "width":
                  width = sizeData(str);
                  break;

                case "height":
                  height = sizeData(str);
                  break;

                case "totalheight":
                  totalheight = sizeData(str);
                  break;

                default:
                  throw new ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
              }
            }
          }
        }

        var src = assertNodeType(args[0], "url").url;

        if (alt === "") {
          // No alt given. Use the file name. Strip away the path.
          alt = src;
          alt = alt.replace(/^.*[\\/]/, '');
          alt = alt.substring(0, alt.lastIndexOf('.'));
        }

        if (!parser.settings.isTrusted({
          command: "\\includegraphics",
          url: src
        })) {
          return parser.formatUnsupportedCmd("\\includegraphics");
        }

        return {
          type: "includegraphics",
          mode: parser.mode,
          alt: alt,
          width: width,
          height: height,
          totalheight: totalheight,
          src: src
        };
      },
      htmlBuilder: (group, options) => {
        var height = calculateSize(group.height, options);
        var depth = 0;

        if (group.totalheight.number > 0) {
          depth = calculateSize(group.totalheight, options) - height;
        }

        var width = 0;

        if (group.width.number > 0) {
          width = calculateSize(group.width, options);
        }

        var style = {
          height: makeEm(height + depth)
        };

        if (width > 0) {
          style.width = makeEm(width);
        }

        if (depth > 0) {
          style.verticalAlign = makeEm(-depth);
        }

        var node = new Img(group.src, group.alt, style);
        node.height = height;
        node.depth = depth;
        return node;
      },
      mathmlBuilder: (group, options) => {
        var node = new mathMLTree.MathNode("mglyph", []);
        node.setAttribute("alt", group.alt);
        var height = calculateSize(group.height, options);
        var depth = 0;

        if (group.totalheight.number > 0) {
          depth = calculateSize(group.totalheight, options) - height;
          node.setAttribute("valign", makeEm(-depth));
        }

        node.setAttribute("height", makeEm(height + depth));

        if (group.width.number > 0) {
          var width = calculateSize(group.width, options);
          node.setAttribute("width", makeEm(width));
        }

        node.setAttribute("src", group.src);
        return node;
      }
    });

    // Horizontal spacing commands

    defineFunction({
      type: "kern",
      names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
      props: {
        numArgs: 1,
        argTypes: ["size"],
        primitive: true,
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        var size = assertNodeType(args[0], "size");

        if (parser.settings.strict) {
          var mathFunction = funcName[1] === 'm'; // \mkern, \mskip

          var muUnit = size.value.unit === 'mu';

          if (mathFunction) {
            if (!muUnit) {
              parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
            }

            if (parser.mode !== "math") {
              parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
            }
          } else {
            // !mathFunction
            if (muUnit) {
              parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
            }
          }
        }

        return {
          type: "kern",
          mode: parser.mode,
          dimension: size.value
        };
      },

      htmlBuilder(group, options) {
        return buildCommon.makeGlue(group.dimension, options);
      },

      mathmlBuilder(group, options) {
        var dimension = calculateSize(group.dimension, options);
        return new mathMLTree.SpaceNode(dimension);
      }

    });

    // Horizontal overlap functions
    defineFunction({
      type: "lap",
      names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
      props: {
        numArgs: 1,
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var body = args[0];
        return {
          type: "lap",
          mode: parser.mode,
          alignment: funcName.slice(5),
          body
        };
      },
      htmlBuilder: (group, options) => {
        // mathllap, mathrlap, mathclap
        var inner;

        if (group.alignment === "clap") {
          // ref: https://www.math.lsu.edu/~aperlis/publications/mathclap/
          inner = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]); // wrap, since CSS will center a .clap > .inner > span

          inner = buildCommon.makeSpan(["inner"], [inner], options);
        } else {
          inner = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options)]);
        }

        var fix = buildCommon.makeSpan(["fix"], []);
        var node = buildCommon.makeSpan([group.alignment], [inner, fix], options); // At this point, we have correctly set horizontal alignment of the
        // two items involved in the lap.
        // Next, use a strut to set the height of the HTML bounding box.
        // Otherwise, a tall argument may be misplaced.
        // This code resolved issue #1153

        var strut = buildCommon.makeSpan(["strut"]);
        strut.style.height = makeEm(node.height + node.depth);

        if (node.depth) {
          strut.style.verticalAlign = makeEm(-node.depth);
        }

        node.children.unshift(strut); // Next, prevent vertical misplacement when next to something tall.
        // This code resolves issue #1234

        node = buildCommon.makeSpan(["thinbox"], [node], options);
        return buildCommon.makeSpan(["mord", "vbox"], [node], options);
      },
      mathmlBuilder: (group, options) => {
        // mathllap, mathrlap, mathclap
        var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);

        if (group.alignment !== "rlap") {
          var offset = group.alignment === "llap" ? "-1" : "-0.5";
          node.setAttribute("lspace", offset + "width");
        }

        node.setAttribute("width", "0px");
        return node;
      }
    });

    defineFunction({
      type: "styling",
      names: ["\\(", "$"],
      props: {
        numArgs: 0,
        allowedInText: true,
        allowedInMath: false
      },

      handler(_ref, args) {
        var {
          funcName,
          parser
        } = _ref;
        var outerMode = parser.mode;
        parser.switchMode("math");
        var close = funcName === "\\(" ? "\\)" : "$";
        var body = parser.parseExpression(false, close);
        parser.expect(close);
        parser.switchMode(outerMode);
        return {
          type: "styling",
          mode: parser.mode,
          style: "text",
          body
        };
      }

    }); // Check for extra closing math delimiters

    defineFunction({
      type: "text",
      // Doesn't matter what this is.
      names: ["\\)", "\\]"],
      props: {
        numArgs: 0,
        allowedInText: true,
        allowedInMath: false
      },

      handler(context, args) {
        throw new ParseError("Mismatched " + context.funcName);
      }

    });

    var chooseMathStyle = (group, options) => {
      switch (options.style.size) {
        case Style$1.DISPLAY.size:
          return group.display;

        case Style$1.TEXT.size:
          return group.text;

        case Style$1.SCRIPT.size:
          return group.script;

        case Style$1.SCRIPTSCRIPT.size:
          return group.scriptscript;

        default:
          return group.text;
      }
    };

    defineFunction({
      type: "mathchoice",
      names: ["\\mathchoice"],
      props: {
        numArgs: 4,
        primitive: true
      },
      handler: (_ref, args) => {
        var {
          parser
        } = _ref;
        return {
          type: "mathchoice",
          mode: parser.mode,
          display: ordargument(args[0]),
          text: ordargument(args[1]),
          script: ordargument(args[2]),
          scriptscript: ordargument(args[3])
        };
      },
      htmlBuilder: (group, options) => {
        var body = chooseMathStyle(group, options);
        var elements = buildExpression$1(body, options, false);
        return buildCommon.makeFragment(elements);
      },
      mathmlBuilder: (group, options) => {
        var body = chooseMathStyle(group, options);
        return buildExpressionRow(body, options);
      }
    });

    var assembleSupSub = (base, supGroup, subGroup, options, style, slant, baseShift) => {
      base = buildCommon.makeSpan([], [base]);
      var subIsSingleCharacter = subGroup && utils.isCharacterBox(subGroup);
      var sub;
      var sup; // We manually have to handle the superscripts and subscripts. This,
      // aside from the kern calculations, is copied from supsub.

      if (supGroup) {
        var elem = buildGroup$1(supGroup, options.havingStyle(style.sup()), options);
        sup = {
          elem,
          kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
        };
      }

      if (subGroup) {
        var _elem = buildGroup$1(subGroup, options.havingStyle(style.sub()), options);

        sub = {
          elem: _elem,
          kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - _elem.height)
        };
      } // Build the final group as a vlist of the possible subscript, base,
      // and possible superscript.


      var finalGroup;

      if (sup && sub) {
        var bottom = options.fontMetrics().bigOpSpacing5 + sub.elem.height + sub.elem.depth + sub.kern + base.depth + baseShift;
        finalGroup = buildCommon.makeVList({
          positionType: "bottom",
          positionData: bottom,
          children: [{
            type: "kern",
            size: options.fontMetrics().bigOpSpacing5
          }, {
            type: "elem",
            elem: sub.elem,
            marginLeft: makeEm(-slant)
          }, {
            type: "kern",
            size: sub.kern
          }, {
            type: "elem",
            elem: base
          }, {
            type: "kern",
            size: sup.kern
          }, {
            type: "elem",
            elem: sup.elem,
            marginLeft: makeEm(slant)
          }, {
            type: "kern",
            size: options.fontMetrics().bigOpSpacing5
          }]
        }, options);
      } else if (sub) {
        var top = base.height - baseShift; // Shift the limits by the slant of the symbol. Note
        // that we are supposed to shift the limits by 1/2 of the slant,
        // but since we are centering the limits adding a full slant of
        // margin will shift by 1/2 that.

        finalGroup = buildCommon.makeVList({
          positionType: "top",
          positionData: top,
          children: [{
            type: "kern",
            size: options.fontMetrics().bigOpSpacing5
          }, {
            type: "elem",
            elem: sub.elem,
            marginLeft: makeEm(-slant)
          }, {
            type: "kern",
            size: sub.kern
          }, {
            type: "elem",
            elem: base
          }]
        }, options);
      } else if (sup) {
        var _bottom = base.depth + baseShift;

        finalGroup = buildCommon.makeVList({
          positionType: "bottom",
          positionData: _bottom,
          children: [{
            type: "elem",
            elem: base
          }, {
            type: "kern",
            size: sup.kern
          }, {
            type: "elem",
            elem: sup.elem,
            marginLeft: makeEm(slant)
          }, {
            type: "kern",
            size: options.fontMetrics().bigOpSpacing5
          }]
        }, options);
      } else {
        // This case probably shouldn't occur (this would mean the
        // supsub was sending us a group with no superscript or
        // subscript) but be safe.
        return base;
      }

      var parts = [finalGroup];

      if (sub && slant !== 0 && !subIsSingleCharacter) {
        // A negative margin-left was applied to the lower limit.
        // Avoid an overlap by placing a spacer on the left on the group.
        var spacer = buildCommon.makeSpan(["mspace"], [], options);
        spacer.style.marginRight = makeEm(slant);
        parts.unshift(spacer);
      }

      return buildCommon.makeSpan(["mop", "op-limits"], parts, options);
    };

    // Limits, symbols
    // Most operators have a large successor symbol, but these don't.
    var noSuccessor = ["\\smallint"]; // NOTE: Unlike most `htmlBuilder`s, this one handles not only "op", but also
    // "supsub" since some of them (like \int) can affect super/subscripting.

    var htmlBuilder$2 = (grp, options) => {
      // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
      var supGroup;
      var subGroup;
      var hasLimits = false;
      var group;

      if (grp.type === "supsub") {
        // If we have limits, supsub will pass us its group to handle. Pull
        // out the superscript and subscript and set the group to the op in
        // its base.
        supGroup = grp.sup;
        subGroup = grp.sub;
        group = assertNodeType(grp.base, "op");
        hasLimits = true;
      } else {
        group = assertNodeType(grp, "op");
      }

      var style = options.style;
      var large = false;

      if (style.size === Style$1.DISPLAY.size && group.symbol && !utils.contains(noSuccessor, group.name)) {
        // Most symbol operators get larger in displaystyle (rule 13)
        large = true;
      }

      var base;

      if (group.symbol) {
        // If this is a symbol, create the symbol.
        var fontName = large ? "Size2-Regular" : "Size1-Regular";
        var stash = "";

        if (group.name === "\\oiint" || group.name === "\\oiiint") {
          // No font glyphs yet, so use a glyph w/o the oval.
          // TODO: When font glyphs are available, delete this code.
          stash = group.name.slice(1);
          group.name = stash === "oiint" ? "\\iint" : "\\iiint";
        }

        base = buildCommon.makeSymbol(group.name, fontName, "math", options, ["mop", "op-symbol", large ? "large-op" : "small-op"]);

        if (stash.length > 0) {
          // We're in \oiint or \oiiint. Overlay the oval.
          // TODO: When font glyphs are available, delete this code.
          var italic = base.italic;
          var oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options);
          base = buildCommon.makeVList({
            positionType: "individualShift",
            children: [{
              type: "elem",
              elem: base,
              shift: 0
            }, {
              type: "elem",
              elem: oval,
              shift: large ? 0.08 : 0
            }]
          }, options);
          group.name = "\\" + stash;
          base.classes.unshift("mop"); // $FlowFixMe

          base.italic = italic;
        }
      } else if (group.body) {
        // If this is a list, compose that list.
        var inner = buildExpression$1(group.body, options, true);

        if (inner.length === 1 && inner[0] instanceof SymbolNode) {
          base = inner[0];
          base.classes[0] = "mop"; // replace old mclass
        } else {
          base = buildCommon.makeSpan(["mop"], inner, options);
        }
      } else {
        // Otherwise, this is a text operator. Build the text from the
        // operator's name.
        var output = [];

        for (var i = 1; i < group.name.length; i++) {
          output.push(buildCommon.mathsym(group.name[i], group.mode, options));
        }

        base = buildCommon.makeSpan(["mop"], output, options);
      } // If content of op is a single symbol, shift it vertically.


      var baseShift = 0;
      var slant = 0;

      if ((base instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
        // We suppress the shift of the base of \overset and \underset. Otherwise,
        // shift the symbol so its center lies on the axis (rule 13). It
        // appears that our fonts have the centers of the symbols already
        // almost on the axis, so these numbers are very small. Note we
        // don't actually apply this here, but instead it is used either in
        // the vlist creation or separately when there are no limits.
        baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight; // The slant of the symbol is just its italic correction.
        // $FlowFixMe

        slant = base.italic;
      }

      if (hasLimits) {
        return assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
      } else {
        if (baseShift) {
          base.style.position = "relative";
          base.style.top = makeEm(baseShift);
        }

        return base;
      }
    };

    var mathmlBuilder$1 = (group, options) => {
      var node;

      if (group.symbol) {
        // This is a symbol. Just add the symbol.
        node = new MathNode("mo", [makeText(group.name, group.mode)]);

        if (utils.contains(noSuccessor, group.name)) {
          node.setAttribute("largeop", "false");
        }
      } else if (group.body) {
        // This is an operator with children. Add them.
        node = new MathNode("mo", buildExpression(group.body, options));
      } else {
        // This is a text operator. Add all of the characters from the
        // operator's name.
        node = new MathNode("mi", [new TextNode(group.name.slice(1))]); // Append an <mo>&ApplyFunction;</mo>.
        // ref: https://www.w3.org/TR/REC-MathML/chap3_2.html#sec3.2.4

        var operator = new MathNode("mo", [makeText("\u2061", "text")]);

        if (group.parentIsSupSub) {
          node = new MathNode("mrow", [node, operator]);
        } else {
          node = newDocumentFragment([node, operator]);
        }
      }

      return node;
    };

    var singleCharBigOps = {
      "\u220F": "\\prod",
      "\u2210": "\\coprod",
      "\u2211": "\\sum",
      "\u22c0": "\\bigwedge",
      "\u22c1": "\\bigvee",
      "\u22c2": "\\bigcap",
      "\u22c3": "\\bigcup",
      "\u2a00": "\\bigodot",
      "\u2a01": "\\bigoplus",
      "\u2a02": "\\bigotimes",
      "\u2a04": "\\biguplus",
      "\u2a06": "\\bigsqcup"
    };
    defineFunction({
      type: "op",
      names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22c0", "\u22c1", "\u22c2", "\u22c3", "\u2a00", "\u2a01", "\u2a02", "\u2a04", "\u2a06"],
      props: {
        numArgs: 0
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var fName = funcName;

        if (fName.length === 1) {
          fName = singleCharBigOps[fName];
        }

        return {
          type: "op",
          mode: parser.mode,
          limits: true,
          parentIsSupSub: false,
          symbol: true,
          name: fName
        };
      },
      htmlBuilder: htmlBuilder$2,
      mathmlBuilder: mathmlBuilder$1
    }); // Note: calling defineFunction with a type that's already been defined only
    // works because the same htmlBuilder and mathmlBuilder are being used.

    defineFunction({
      type: "op",
      names: ["\\mathop"],
      props: {
        numArgs: 1,
        primitive: true
      },
      handler: (_ref2, args) => {
        var {
          parser
        } = _ref2;
        var body = args[0];
        return {
          type: "op",
          mode: parser.mode,
          limits: false,
          parentIsSupSub: false,
          symbol: false,
          body: ordargument(body)
        };
      },
      htmlBuilder: htmlBuilder$2,
      mathmlBuilder: mathmlBuilder$1
    }); // There are 2 flags for operators; whether they produce limits in
    // displaystyle, and whether they are symbols and should grow in
    // displaystyle. These four groups cover the four possible choices.

    var singleCharIntegrals = {
      "\u222b": "\\int",
      "\u222c": "\\iint",
      "\u222d": "\\iiint",
      "\u222e": "\\oint",
      "\u222f": "\\oiint",
      "\u2230": "\\oiiint"
    }; // No limits, not symbols

    defineFunction({
      type: "op",
      names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
      props: {
        numArgs: 0
      },

      handler(_ref3) {
        var {
          parser,
          funcName
        } = _ref3;
        return {
          type: "op",
          mode: parser.mode,
          limits: false,
          parentIsSupSub: false,
          symbol: false,
          name: funcName
        };
      },

      htmlBuilder: htmlBuilder$2,
      mathmlBuilder: mathmlBuilder$1
    }); // Limits, not symbols

    defineFunction({
      type: "op",
      names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
      props: {
        numArgs: 0
      },

      handler(_ref4) {
        var {
          parser,
          funcName
        } = _ref4;
        return {
          type: "op",
          mode: parser.mode,
          limits: true,
          parentIsSupSub: false,
          symbol: false,
          name: funcName
        };
      },

      htmlBuilder: htmlBuilder$2,
      mathmlBuilder: mathmlBuilder$1
    }); // No limits, symbols

    defineFunction({
      type: "op",
      names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222b", "\u222c", "\u222d", "\u222e", "\u222f", "\u2230"],
      props: {
        numArgs: 0
      },

      handler(_ref5) {
        var {
          parser,
          funcName
        } = _ref5;
        var fName = funcName;

        if (fName.length === 1) {
          fName = singleCharIntegrals[fName];
        }

        return {
          type: "op",
          mode: parser.mode,
          limits: false,
          parentIsSupSub: false,
          symbol: true,
          name: fName
        };
      },

      htmlBuilder: htmlBuilder$2,
      mathmlBuilder: mathmlBuilder$1
    });

    // NOTE: Unlike most `htmlBuilder`s, this one handles not only
    // "operatorname", but also  "supsub" since \operatorname* can
    // affect super/subscripting.
    var htmlBuilder$1 = (grp, options) => {
      // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
      var supGroup;
      var subGroup;
      var hasLimits = false;
      var group;

      if (grp.type === "supsub") {
        // If we have limits, supsub will pass us its group to handle. Pull
        // out the superscript and subscript and set the group to the op in
        // its base.
        supGroup = grp.sup;
        subGroup = grp.sub;
        group = assertNodeType(grp.base, "operatorname");
        hasLimits = true;
      } else {
        group = assertNodeType(grp, "operatorname");
      }

      var base;

      if (group.body.length > 0) {
        var body = group.body.map(child => {
          // $FlowFixMe: Check if the node has a string `text` property.
          var childText = child.text;

          if (typeof childText === "string") {
            return {
              type: "textord",
              mode: child.mode,
              text: childText
            };
          } else {
            return child;
          }
        }); // Consolidate function names into symbol characters.

        var expression = buildExpression$1(body, options.withFont("mathrm"), true);

        for (var i = 0; i < expression.length; i++) {
          var child = expression[i];

          if (child instanceof SymbolNode) {
            // Per amsopn package,
            // change minus to hyphen and \ast to asterisk
            child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
          }
        }

        base = buildCommon.makeSpan(["mop"], expression, options);
      } else {
        base = buildCommon.makeSpan(["mop"], [], options);
      }

      if (hasLimits) {
        return assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
      } else {
        return base;
      }
    };

    var mathmlBuilder = (group, options) => {
      // The steps taken here are similar to the html version.
      var expression = buildExpression(group.body, options.withFont("mathrm")); // Is expression a string or has it something like a fraction?

      var isAllString = true; // default

      for (var i = 0; i < expression.length; i++) {
        var node = expression[i];

        if (node instanceof mathMLTree.SpaceNode) ; else if (node instanceof mathMLTree.MathNode) {
          switch (node.type) {
            case "mi":
            case "mn":
            case "ms":
            case "mspace":
            case "mtext":
              break;
            // Do nothing yet.

            case "mo":
              {
                var child = node.children[0];

                if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
                  child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                } else {
                  isAllString = false;
                }

                break;
              }

            default:
              isAllString = false;
          }
        } else {
          isAllString = false;
        }
      }

      if (isAllString) {
        // Write a single TextNode instead of multiple nested tags.
        var word = expression.map(node => node.toText()).join("");
        expression = [new mathMLTree.TextNode(word)];
      }

      var identifier = new mathMLTree.MathNode("mi", expression);
      identifier.setAttribute("mathvariant", "normal"); // \u2061 is the same as &ApplyFunction;
      // ref: https://www.w3schools.com/charsets/ref_html_entities_a.asp

      var operator = new mathMLTree.MathNode("mo", [makeText("\u2061", "text")]);

      if (group.parentIsSupSub) {
        return new mathMLTree.MathNode("mrow", [identifier, operator]);
      } else {
        return mathMLTree.newDocumentFragment([identifier, operator]);
      }
    }; // \operatorname
    // amsopn.dtx: \mathop{#1\kern\z@\operator@font#3}\newmcodes@


    defineFunction({
      type: "operatorname",
      names: ["\\operatorname@", "\\operatornamewithlimits"],
      props: {
        numArgs: 1
      },
      handler: (_ref, args) => {
        var {
          parser,
          funcName
        } = _ref;
        var body = args[0];
        return {
          type: "operatorname",
          mode: parser.mode,
          body: ordargument(body),
          alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
          limits: false,
          parentIsSupSub: false
        };
      },
      htmlBuilder: htmlBuilder$1,
      mathmlBuilder
    });
    defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");

    defineFunctionBuilders({
      type: "ordgroup",

      htmlBuilder(group, options) {
        if (group.semisimple) {
          return buildCommon.makeFragment(buildExpression$1(group.body, options, false));
        }

        return buildCommon.makeSpan(["mord"], buildExpression$1(group.body, options, true), options);
      },

      mathmlBuilder(group, options) {
        return buildExpressionRow(group.body, options, true);
      }

    });

    defineFunction({
      type: "overline",
      names: ["\\overline"],
      props: {
        numArgs: 1
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        var body = args[0];
        return {
          type: "overline",
          mode: parser.mode,
          body
        };
      },

      htmlBuilder(group, options) {
        // Overlines are handled in the TeXbook pg 443, Rule 9.
        // Build the inner group in the cramped style.
        var innerGroup = buildGroup$1(group.body, options.havingCrampedStyle()); // Create the line above the body

        var line = buildCommon.makeLineSpan("overline-line", options); // Generate the vlist, with the appropriate kerns

        var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
        var vlist = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: innerGroup
          }, {
            type: "kern",
            size: 3 * defaultRuleThickness
          }, {
            type: "elem",
            elem: line
          }, {
            type: "kern",
            size: defaultRuleThickness
          }]
        }, options);
        return buildCommon.makeSpan(["mord", "overline"], [vlist], options);
      },

      mathmlBuilder(group, options) {
        var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203e")]);
        operator.setAttribute("stretchy", "true");
        var node = new mathMLTree.MathNode("mover", [buildGroup(group.body, options), operator]);
        node.setAttribute("accent", "true");
        return node;
      }

    });

    defineFunction({
      type: "phantom",
      names: ["\\phantom"],
      props: {
        numArgs: 1,
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          parser
        } = _ref;
        var body = args[0];
        return {
          type: "phantom",
          mode: parser.mode,
          body: ordargument(body)
        };
      },
      htmlBuilder: (group, options) => {
        var elements = buildExpression$1(group.body, options.withPhantom(), false); // \phantom isn't supposed to affect the elements it contains.
        // See "color" for more details.

        return buildCommon.makeFragment(elements);
      },
      mathmlBuilder: (group, options) => {
        var inner = buildExpression(group.body, options);
        return new mathMLTree.MathNode("mphantom", inner);
      }
    });
    defineFunction({
      type: "hphantom",
      names: ["\\hphantom"],
      props: {
        numArgs: 1,
        allowedInText: true
      },
      handler: (_ref2, args) => {
        var {
          parser
        } = _ref2;
        var body = args[0];
        return {
          type: "hphantom",
          mode: parser.mode,
          body
        };
      },
      htmlBuilder: (group, options) => {
        var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options.withPhantom())]);
        node.height = 0;
        node.depth = 0;

        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            node.children[i].height = 0;
            node.children[i].depth = 0;
          }
        } // See smash for comment re: use of makeVList


        node = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: node
          }]
        }, options); // For spacing, TeX treats \smash as a math group (same spacing as ord).

        return buildCommon.makeSpan(["mord"], [node], options);
      },
      mathmlBuilder: (group, options) => {
        var inner = buildExpression(ordargument(group.body), options);
        var phantom = new mathMLTree.MathNode("mphantom", inner);
        var node = new mathMLTree.MathNode("mpadded", [phantom]);
        node.setAttribute("height", "0px");
        node.setAttribute("depth", "0px");
        return node;
      }
    });
    defineFunction({
      type: "vphantom",
      names: ["\\vphantom"],
      props: {
        numArgs: 1,
        allowedInText: true
      },
      handler: (_ref3, args) => {
        var {
          parser
        } = _ref3;
        var body = args[0];
        return {
          type: "vphantom",
          mode: parser.mode,
          body
        };
      },
      htmlBuilder: (group, options) => {
        var inner = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options.withPhantom())]);
        var fix = buildCommon.makeSpan(["fix"], []);
        return buildCommon.makeSpan(["mord", "rlap"], [inner, fix], options);
      },
      mathmlBuilder: (group, options) => {
        var inner = buildExpression(ordargument(group.body), options);
        var phantom = new mathMLTree.MathNode("mphantom", inner);
        var node = new mathMLTree.MathNode("mpadded", [phantom]);
        node.setAttribute("width", "0px");
        return node;
      }
    });

    defineFunction({
      type: "raisebox",
      names: ["\\raisebox"],
      props: {
        numArgs: 2,
        argTypes: ["size", "hbox"],
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        var amount = assertNodeType(args[0], "size").value;
        var body = args[1];
        return {
          type: "raisebox",
          mode: parser.mode,
          dy: amount,
          body
        };
      },

      htmlBuilder(group, options) {
        var body = buildGroup$1(group.body, options);
        var dy = calculateSize(group.dy, options);
        return buildCommon.makeVList({
          positionType: "shift",
          positionData: -dy,
          children: [{
            type: "elem",
            elem: body
          }]
        }, options);
      },

      mathmlBuilder(group, options) {
        var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);
        var dy = group.dy.number + group.dy.unit;
        node.setAttribute("voffset", dy);
        return node;
      }

    });

    defineFunction({
      type: "internal",
      names: ["\\relax"],
      props: {
        numArgs: 0,
        allowedInText: true
      },

      handler(_ref) {
        var {
          parser
        } = _ref;
        return {
          type: "internal",
          mode: parser.mode
        };
      }

    });

    defineFunction({
      type: "rule",
      names: ["\\rule"],
      props: {
        numArgs: 2,
        numOptionalArgs: 1,
        argTypes: ["size", "size", "size"]
      },

      handler(_ref, args, optArgs) {
        var {
          parser
        } = _ref;
        var shift = optArgs[0];
        var width = assertNodeType(args[0], "size");
        var height = assertNodeType(args[1], "size");
        return {
          type: "rule",
          mode: parser.mode,
          shift: shift && assertNodeType(shift, "size").value,
          width: width.value,
          height: height.value
        };
      },

      htmlBuilder(group, options) {
        // Make an empty span for the rule
        var rule = buildCommon.makeSpan(["mord", "rule"], [], options); // Calculate the shift, width, and height of the rule, and account for units

        var width = calculateSize(group.width, options);
        var height = calculateSize(group.height, options);
        var shift = group.shift ? calculateSize(group.shift, options) : 0; // Style the rule to the right size

        rule.style.borderRightWidth = makeEm(width);
        rule.style.borderTopWidth = makeEm(height);
        rule.style.bottom = makeEm(shift); // Record the height and width

        rule.width = width;
        rule.height = height + shift;
        rule.depth = -shift; // Font size is the number large enough that the browser will
        // reserve at least `absHeight` space above the baseline.
        // The 1.125 factor was empirically determined

        rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
        return rule;
      },

      mathmlBuilder(group, options) {
        var width = calculateSize(group.width, options);
        var height = calculateSize(group.height, options);
        var shift = group.shift ? calculateSize(group.shift, options) : 0;
        var color = options.color && options.getColor() || "black";
        var rule = new mathMLTree.MathNode("mspace");
        rule.setAttribute("mathbackground", color);
        rule.setAttribute("width", makeEm(width));
        rule.setAttribute("height", makeEm(height));
        var wrapper = new mathMLTree.MathNode("mpadded", [rule]);

        if (shift >= 0) {
          wrapper.setAttribute("height", makeEm(shift));
        } else {
          wrapper.setAttribute("height", makeEm(shift));
          wrapper.setAttribute("depth", makeEm(-shift));
        }

        wrapper.setAttribute("voffset", makeEm(shift));
        return wrapper;
      }

    });

    function sizingGroup(value, options, baseOptions) {
      var inner = buildExpression$1(value, options, false);
      var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier; // Add size-resetting classes to the inner list and set maxFontSize
      // manually. Handle nested size changes.

      for (var i = 0; i < inner.length; i++) {
        var pos = inner[i].classes.indexOf("sizing");

        if (pos < 0) {
          Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
        } else if (inner[i].classes[pos + 1] === "reset-size" + options.size) {
          // This is a nested size change: e.g., inner[i] is the "b" in
          // `\Huge a \small b`. Override the old size (the `reset-` class)
          // but not the new size.
          inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
        }

        inner[i].height *= multiplier;
        inner[i].depth *= multiplier;
      }

      return buildCommon.makeFragment(inner);
    }
    var sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
    var htmlBuilder = (group, options) => {
      // Handle sizing operators like \Huge. Real TeX doesn't actually allow
      // these functions inside of math expressions, so we do some special
      // handling.
      var newOptions = options.havingSize(group.size);
      return sizingGroup(group.body, newOptions, options);
    };
    defineFunction({
      type: "sizing",
      names: sizeFuncs,
      props: {
        numArgs: 0,
        allowedInText: true
      },
      handler: (_ref, args) => {
        var {
          breakOnTokenText,
          funcName,
          parser
        } = _ref;
        var body = parser.parseExpression(false, breakOnTokenText);
        return {
          type: "sizing",
          mode: parser.mode,
          // Figure out what size to use based on the list of functions above
          size: sizeFuncs.indexOf(funcName) + 1,
          body
        };
      },
      htmlBuilder,
      mathmlBuilder: (group, options) => {
        var newOptions = options.havingSize(group.size);
        var inner = buildExpression(group.body, newOptions);
        var node = new mathMLTree.MathNode("mstyle", inner); // TODO(emily): This doesn't produce the correct size for nested size
        // changes, because we don't keep state of what style we're currently
        // in, so we can't reset the size to normal before changing it.  Now
        // that we're passing an options parameter we should be able to fix
        // this.

        node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
        return node;
      }
    });

    // smash, with optional [tb], as in AMS
    defineFunction({
      type: "smash",
      names: ["\\smash"],
      props: {
        numArgs: 1,
        numOptionalArgs: 1,
        allowedInText: true
      },
      handler: (_ref, args, optArgs) => {
        var {
          parser
        } = _ref;
        var smashHeight = false;
        var smashDepth = false;
        var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");

        if (tbArg) {
          // Optional [tb] argument is engaged.
          // ref: amsmath: \renewcommand{\smash}[1][tb]{%
          //               def\mb@t{\ht}\def\mb@b{\dp}\def\mb@tb{\ht\z@\z@\dp}%
          var letter = "";

          for (var i = 0; i < tbArg.body.length; ++i) {
            var node = tbArg.body[i]; // $FlowFixMe: Not every node type has a `text` property.

            letter = node.text;

            if (letter === "t") {
              smashHeight = true;
            } else if (letter === "b") {
              smashDepth = true;
            } else {
              smashHeight = false;
              smashDepth = false;
              break;
            }
          }
        } else {
          smashHeight = true;
          smashDepth = true;
        }

        var body = args[0];
        return {
          type: "smash",
          mode: parser.mode,
          body,
          smashHeight,
          smashDepth
        };
      },
      htmlBuilder: (group, options) => {
        var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]);

        if (!group.smashHeight && !group.smashDepth) {
          return node;
        }

        if (group.smashHeight) {
          node.height = 0; // In order to influence makeVList, we have to reset the children.

          if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
              node.children[i].height = 0;
            }
          }
        }

        if (group.smashDepth) {
          node.depth = 0;

          if (node.children) {
            for (var _i = 0; _i < node.children.length; _i++) {
              node.children[_i].depth = 0;
            }
          }
        } // At this point, we've reset the TeX-like height and depth values.
        // But the span still has an HTML line height.
        // makeVList applies "display: table-cell", which prevents the browser
        // from acting on that line height. So we'll call makeVList now.


        var smashedNode = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: node
          }]
        }, options); // For spacing, TeX treats \hphantom as a math group (same spacing as ord).

        return buildCommon.makeSpan(["mord"], [smashedNode], options);
      },
      mathmlBuilder: (group, options) => {
        var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);

        if (group.smashHeight) {
          node.setAttribute("height", "0px");
        }

        if (group.smashDepth) {
          node.setAttribute("depth", "0px");
        }

        return node;
      }
    });

    defineFunction({
      type: "sqrt",
      names: ["\\sqrt"],
      props: {
        numArgs: 1,
        numOptionalArgs: 1
      },

      handler(_ref, args, optArgs) {
        var {
          parser
        } = _ref;
        var index = optArgs[0];
        var body = args[0];
        return {
          type: "sqrt",
          mode: parser.mode,
          body,
          index
        };
      },

      htmlBuilder(group, options) {
        // Square roots are handled in the TeXbook pg. 443, Rule 11.
        // First, we do the same steps as in overline to build the inner group
        // and line
        var inner = buildGroup$1(group.body, options.havingCrampedStyle());

        if (inner.height === 0) {
          // Render a small surd.
          inner.height = options.fontMetrics().xHeight;
        } // Some groups can return document fragments.  Handle those by wrapping
        // them in a span.


        inner = buildCommon.wrapFragment(inner, options); // Calculate the minimum size for the \surd delimiter

        var metrics = options.fontMetrics();
        var theta = metrics.defaultRuleThickness;
        var phi = theta;

        if (options.style.id < Style$1.TEXT.id) {
          phi = options.fontMetrics().xHeight;
        } // Calculate the clearance between the body and line


        var lineClearance = theta + phi / 4;
        var minDelimiterHeight = inner.height + inner.depth + lineClearance + theta; // Create a sqrt SVG of the required minimum size

        var {
          span: img,
          ruleWidth,
          advanceWidth
        } = delimiter.sqrtImage(minDelimiterHeight, options);
        var delimDepth = img.height - ruleWidth; // Adjust the clearance based on the delimiter size

        if (delimDepth > inner.height + inner.depth + lineClearance) {
          lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
        } // Shift the sqrt image


        var imgShift = img.height - inner.height - lineClearance - ruleWidth;
        inner.style.paddingLeft = makeEm(advanceWidth); // Overlay the image and the argument.

        var body = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: inner,
            wrapperClasses: ["svg-align"]
          }, {
            type: "kern",
            size: -(inner.height + imgShift)
          }, {
            type: "elem",
            elem: img
          }, {
            type: "kern",
            size: ruleWidth
          }]
        }, options);

        if (!group.index) {
          return buildCommon.makeSpan(["mord", "sqrt"], [body], options);
        } else {
          // Handle the optional root index
          // The index is always in scriptscript style
          var newOptions = options.havingStyle(Style$1.SCRIPTSCRIPT);
          var rootm = buildGroup$1(group.index, newOptions, options); // The amount the index is shifted by. This is taken from the TeX
          // source, in the definition of `\r@@t`.

          var toShift = 0.6 * (body.height - body.depth); // Build a VList with the superscript shifted up correctly

          var rootVList = buildCommon.makeVList({
            positionType: "shift",
            positionData: -toShift,
            children: [{
              type: "elem",
              elem: rootm
            }]
          }, options); // Add a class surrounding it so we can add on the appropriate
          // kerning

          var rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
          return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
        }
      },

      mathmlBuilder(group, options) {
        var {
          body,
          index
        } = group;
        return index ? new mathMLTree.MathNode("mroot", [buildGroup(body, options), buildGroup(index, options)]) : new mathMLTree.MathNode("msqrt", [buildGroup(body, options)]);
      }

    });

    var styleMap = {
      "display": Style$1.DISPLAY,
      "text": Style$1.TEXT,
      "script": Style$1.SCRIPT,
      "scriptscript": Style$1.SCRIPTSCRIPT
    };
    defineFunction({
      type: "styling",
      names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
      props: {
        numArgs: 0,
        allowedInText: true,
        primitive: true
      },

      handler(_ref, args) {
        var {
          breakOnTokenText,
          funcName,
          parser
        } = _ref;
        // parse out the implicit body
        var body = parser.parseExpression(true, breakOnTokenText); // TODO: Refactor to avoid duplicating styleMap in multiple places (e.g.
        // here and in buildHTML and de-dupe the enumeration of all the styles).
        // $FlowFixMe: The names above exactly match the styles.

        var style = funcName.slice(1, funcName.length - 5);
        return {
          type: "styling",
          mode: parser.mode,
          // Figure out what style to use by pulling out the style from
          // the function name
          style,
          body
        };
      },

      htmlBuilder(group, options) {
        // Style changes are handled in the TeXbook on pg. 442, Rule 3.
        var newStyle = styleMap[group.style];
        var newOptions = options.havingStyle(newStyle).withFont('');
        return sizingGroup(group.body, newOptions, options);
      },

      mathmlBuilder(group, options) {
        // Figure out what style we're changing to.
        var newStyle = styleMap[group.style];
        var newOptions = options.havingStyle(newStyle);
        var inner = buildExpression(group.body, newOptions);
        var node = new mathMLTree.MathNode("mstyle", inner);
        var styleAttributes = {
          "display": ["0", "true"],
          "text": ["0", "false"],
          "script": ["1", "false"],
          "scriptscript": ["2", "false"]
        };
        var attr = styleAttributes[group.style];
        node.setAttribute("scriptlevel", attr[0]);
        node.setAttribute("displaystyle", attr[1]);
        return node;
      }

    });

    /**
     * Sometimes, groups perform special rules when they have superscripts or
     * subscripts attached to them. This function lets the `supsub` group know that
     * Sometimes, groups perform special rules when they have superscripts or
     * its inner element should handle the superscripts and subscripts instead of
     * handling them itself.
     */
    var htmlBuilderDelegate = function htmlBuilderDelegate(group, options) {
      var base = group.base;

      if (!base) {
        return null;
      } else if (base.type === "op") {
        // Operators handle supsubs differently when they have limits
        // (e.g. `\displaystyle\sum_2^3`)
        var delegate = base.limits && (options.style.size === Style$1.DISPLAY.size || base.alwaysHandleSupSub);
        return delegate ? htmlBuilder$2 : null;
      } else if (base.type === "operatorname") {
        var _delegate = base.alwaysHandleSupSub && (options.style.size === Style$1.DISPLAY.size || base.limits);

        return _delegate ? htmlBuilder$1 : null;
      } else if (base.type === "accent") {
        return utils.isCharacterBox(base.base) ? htmlBuilder$a : null;
      } else if (base.type === "horizBrace") {
        var isSup = !group.sub;
        return isSup === base.isOver ? htmlBuilder$3 : null;
      } else {
        return null;
      }
    }; // Super scripts and subscripts, whose precise placement can depend on other
    // functions that precede them.


    defineFunctionBuilders({
      type: "supsub",

      htmlBuilder(group, options) {
        // Superscript and subscripts are handled in the TeXbook on page
        // 445-446, rules 18(a-f).
        // Here is where we defer to the inner group if it should handle
        // superscripts and subscripts itself.
        var builderDelegate = htmlBuilderDelegate(group, options);

        if (builderDelegate) {
          return builderDelegate(group, options);
        }

        var {
          base: valueBase,
          sup: valueSup,
          sub: valueSub
        } = group;
        var base = buildGroup$1(valueBase, options);
        var supm;
        var subm;
        var metrics = options.fontMetrics(); // Rule 18a

        var supShift = 0;
        var subShift = 0;
        var isCharacterBox = valueBase && utils.isCharacterBox(valueBase);

        if (valueSup) {
          var newOptions = options.havingStyle(options.style.sup());
          supm = buildGroup$1(valueSup, newOptions, options);

          if (!isCharacterBox) {
            supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
          }
        }

        if (valueSub) {
          var _newOptions = options.havingStyle(options.style.sub());

          subm = buildGroup$1(valueSub, _newOptions, options);

          if (!isCharacterBox) {
            subShift = base.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options.sizeMultiplier;
          }
        } // Rule 18c


        var minSupShift;

        if (options.style === Style$1.DISPLAY) {
          minSupShift = metrics.sup1;
        } else if (options.style.cramped) {
          minSupShift = metrics.sup3;
        } else {
          minSupShift = metrics.sup2;
        } // scriptspace is a font-size-independent size, so scale it
        // appropriately for use as the marginRight.


        var multiplier = options.sizeMultiplier;
        var marginRight = makeEm(0.5 / metrics.ptPerEm / multiplier);
        var marginLeft = null;

        if (subm) {
          // Subscripts shouldn't be shifted by the base's italic correction.
          // Account for that by shifting the subscript back the appropriate
          // amount. Note we only do this when the base is a single symbol.
          var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");

          if (base instanceof SymbolNode || isOiint) {
            // $FlowFixMe
            marginLeft = makeEm(-base.italic);
          }
        }

        var supsub;

        if (supm && subm) {
          supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
          subShift = Math.max(subShift, metrics.sub2);
          var ruleWidth = metrics.defaultRuleThickness; // Rule 18e

          var maxWidth = 4 * ruleWidth;

          if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
            subShift = maxWidth - (supShift - supm.depth) + subm.height;
            var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);

            if (psi > 0) {
              supShift += psi;
              subShift -= psi;
            }
          }

          var vlistElem = [{
            type: "elem",
            elem: subm,
            shift: subShift,
            marginRight,
            marginLeft
          }, {
            type: "elem",
            elem: supm,
            shift: -supShift,
            marginRight
          }];
          supsub = buildCommon.makeVList({
            positionType: "individualShift",
            children: vlistElem
          }, options);
        } else if (subm) {
          // Rule 18b
          subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);
          var _vlistElem = [{
            type: "elem",
            elem: subm,
            marginLeft,
            marginRight
          }];
          supsub = buildCommon.makeVList({
            positionType: "shift",
            positionData: subShift,
            children: _vlistElem
          }, options);
        } else if (supm) {
          // Rule 18c, d
          supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
          supsub = buildCommon.makeVList({
            positionType: "shift",
            positionData: -supShift,
            children: [{
              type: "elem",
              elem: supm,
              marginRight
            }]
          }, options);
        } else {
          throw new Error("supsub must have either sup or sub.");
        } // Wrap the supsub vlist in a span.msupsub to reset text-align.


        var mclass = getTypeOfDomTree(base, "right") || "mord";
        return buildCommon.makeSpan([mclass], [base, buildCommon.makeSpan(["msupsub"], [supsub])], options);
      },

      mathmlBuilder(group, options) {
        // Is the inner group a relevant horizonal brace?
        var isBrace = false;
        var isOver;
        var isSup;

        if (group.base && group.base.type === "horizBrace") {
          isSup = !!group.sup;

          if (isSup === group.base.isOver) {
            isBrace = true;
            isOver = group.base.isOver;
          }
        }

        if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) {
          group.base.parentIsSupSub = true;
        }

        var children = [buildGroup(group.base, options)];

        if (group.sub) {
          children.push(buildGroup(group.sub, options));
        }

        if (group.sup) {
          children.push(buildGroup(group.sup, options));
        }

        var nodeType;

        if (isBrace) {
          nodeType = isOver ? "mover" : "munder";
        } else if (!group.sub) {
          var base = group.base;

          if (base && base.type === "op" && base.limits && (options.style === Style$1.DISPLAY || base.alwaysHandleSupSub)) {
            nodeType = "mover";
          } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === Style$1.DISPLAY)) {
            nodeType = "mover";
          } else {
            nodeType = "msup";
          }
        } else if (!group.sup) {
          var _base = group.base;

          if (_base && _base.type === "op" && _base.limits && (options.style === Style$1.DISPLAY || _base.alwaysHandleSupSub)) {
            nodeType = "munder";
          } else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options.style === Style$1.DISPLAY)) {
            nodeType = "munder";
          } else {
            nodeType = "msub";
          }
        } else {
          var _base2 = group.base;

          if (_base2 && _base2.type === "op" && _base2.limits && options.style === Style$1.DISPLAY) {
            nodeType = "munderover";
          } else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options.style === Style$1.DISPLAY || _base2.limits)) {
            nodeType = "munderover";
          } else {
            nodeType = "msubsup";
          }
        }

        return new mathMLTree.MathNode(nodeType, children);
      }

    });

    defineFunctionBuilders({
      type: "atom",

      htmlBuilder(group, options) {
        return buildCommon.mathsym(group.text, group.mode, options, ["m" + group.family]);
      },

      mathmlBuilder(group, options) {
        var node = new mathMLTree.MathNode("mo", [makeText(group.text, group.mode)]);

        if (group.family === "bin") {
          var variant = getVariant(group, options);

          if (variant === "bold-italic") {
            node.setAttribute("mathvariant", variant);
          }
        } else if (group.family === "punct") {
          node.setAttribute("separator", "true");
        } else if (group.family === "open" || group.family === "close") {
          // Delims built here should not stretch vertically.
          // See delimsizing.js for stretchy delims.
          node.setAttribute("stretchy", "false");
        }

        return node;
      }

    });

    // "mathord" and "textord" ParseNodes created in Parser.js from symbol Groups in
    // src/symbols.js.
    var defaultVariant = {
      "mi": "italic",
      "mn": "normal",
      "mtext": "normal"
    };
    defineFunctionBuilders({
      type: "mathord",

      htmlBuilder(group, options) {
        return buildCommon.makeOrd(group, options, "mathord");
      },

      mathmlBuilder(group, options) {
        var node = new mathMLTree.MathNode("mi", [makeText(group.text, group.mode, options)]);
        var variant = getVariant(group, options) || "italic";

        if (variant !== defaultVariant[node.type]) {
          node.setAttribute("mathvariant", variant);
        }

        return node;
      }

    });
    defineFunctionBuilders({
      type: "textord",

      htmlBuilder(group, options) {
        return buildCommon.makeOrd(group, options, "textord");
      },

      mathmlBuilder(group, options) {
        var text = makeText(group.text, group.mode, options);
        var variant = getVariant(group, options) || "normal";
        var node;

        if (group.mode === 'text') {
          node = new mathMLTree.MathNode("mtext", [text]);
        } else if (/[0-9]/.test(group.text)) {
          node = new mathMLTree.MathNode("mn", [text]);
        } else if (group.text === "\\prime") {
          node = new mathMLTree.MathNode("mo", [text]);
        } else {
          node = new mathMLTree.MathNode("mi", [text]);
        }

        if (variant !== defaultVariant[node.type]) {
          node.setAttribute("mathvariant", variant);
        }

        return node;
      }

    });

    var cssSpace = {
      "\\nobreak": "nobreak",
      "\\allowbreak": "allowbreak"
    }; // A lookup table to determine whether a spacing function/symbol should be
    // treated like a regular space character.  If a symbol or command is a key
    // in this table, then it should be a regular space character.  Furthermore,
    // the associated value may have a `className` specifying an extra CSS class
    // to add to the created `span`.

    var regularSpace = {
      " ": {},
      "\\ ": {},
      "~": {
        className: "nobreak"
      },
      "\\space": {},
      "\\nobreakspace": {
        className: "nobreak"
      }
    }; // ParseNode<"spacing"> created in Parser.js from the "spacing" symbol Groups in
    // src/symbols.js.

    defineFunctionBuilders({
      type: "spacing",

      htmlBuilder(group, options) {
        if (regularSpace.hasOwnProperty(group.text)) {
          var className = regularSpace[group.text].className || ""; // Spaces are generated by adding an actual space. Each of these
          // things has an entry in the symbols table, so these will be turned
          // into appropriate outputs.

          if (group.mode === "text") {
            var ord = buildCommon.makeOrd(group, options, "textord");
            ord.classes.push(className);
            return ord;
          } else {
            return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options)], options);
          }
        } else if (cssSpace.hasOwnProperty(group.text)) {
          // Spaces based on just a CSS class.
          return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options);
        } else {
          throw new ParseError("Unknown type of space \"" + group.text + "\"");
        }
      },

      mathmlBuilder(group, options) {
        var node;

        if (regularSpace.hasOwnProperty(group.text)) {
          node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\u00a0")]);
        } else if (cssSpace.hasOwnProperty(group.text)) {
          // CSS-based MathML spaces (\nobreak, \allowbreak) are ignored
          return new mathMLTree.MathNode("mspace");
        } else {
          throw new ParseError("Unknown type of space \"" + group.text + "\"");
        }

        return node;
      }

    });

    var pad = () => {
      var padNode = new mathMLTree.MathNode("mtd", []);
      padNode.setAttribute("width", "50%");
      return padNode;
    };

    defineFunctionBuilders({
      type: "tag",

      mathmlBuilder(group, options) {
        var table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options)]), pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options)])])]);
        table.setAttribute("width", "100%");
        return table; // TODO: Left-aligned tags.
        // Currently, the group and options passed here do not contain
        // enough info to set tag alignment. `leqno` is in Settings but it is
        // not passed to Options. On the HTML side, leqno is
        // set by a CSS class applied in buildTree.js. That would have worked
        // in MathML if browsers supported <mlabeledtr>. Since they don't, we
        // need to rewrite the way this function is called.
      }

    });

    var textFontFamilies = {
      "\\text": undefined,
      "\\textrm": "textrm",
      "\\textsf": "textsf",
      "\\texttt": "texttt",
      "\\textnormal": "textrm"
    };
    var textFontWeights = {
      "\\textbf": "textbf",
      "\\textmd": "textmd"
    };
    var textFontShapes = {
      "\\textit": "textit",
      "\\textup": "textup"
    };

    var optionsWithFont = (group, options) => {
      var font = group.font; // Checks if the argument is a font family or a font style.

      if (!font) {
        return options;
      } else if (textFontFamilies[font]) {
        return options.withTextFontFamily(textFontFamilies[font]);
      } else if (textFontWeights[font]) {
        return options.withTextFontWeight(textFontWeights[font]);
      } else {
        return options.withTextFontShape(textFontShapes[font]);
      }
    };

    defineFunction({
      type: "text",
      names: [// Font families
      "\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", // Font weights
      "\\textbf", "\\textmd", // Font Shapes
      "\\textit", "\\textup"],
      props: {
        numArgs: 1,
        argTypes: ["text"],
        allowedInArgument: true,
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser,
          funcName
        } = _ref;
        var body = args[0];
        return {
          type: "text",
          mode: parser.mode,
          body: ordargument(body),
          font: funcName
        };
      },

      htmlBuilder(group, options) {
        var newOptions = optionsWithFont(group, options);
        var inner = buildExpression$1(group.body, newOptions, true);
        return buildCommon.makeSpan(["mord", "text"], inner, newOptions);
      },

      mathmlBuilder(group, options) {
        var newOptions = optionsWithFont(group, options);
        return buildExpressionRow(group.body, newOptions);
      }

    });

    defineFunction({
      type: "underline",
      names: ["\\underline"],
      props: {
        numArgs: 1,
        allowedInText: true
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        return {
          type: "underline",
          mode: parser.mode,
          body: args[0]
        };
      },

      htmlBuilder(group, options) {
        // Underlines are handled in the TeXbook pg 443, Rule 10.
        // Build the inner group.
        var innerGroup = buildGroup$1(group.body, options); // Create the line to go below the body

        var line = buildCommon.makeLineSpan("underline-line", options); // Generate the vlist, with the appropriate kerns

        var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
        var vlist = buildCommon.makeVList({
          positionType: "top",
          positionData: innerGroup.height,
          children: [{
            type: "kern",
            size: defaultRuleThickness
          }, {
            type: "elem",
            elem: line
          }, {
            type: "kern",
            size: 3 * defaultRuleThickness
          }, {
            type: "elem",
            elem: innerGroup
          }]
        }, options);
        return buildCommon.makeSpan(["mord", "underline"], [vlist], options);
      },

      mathmlBuilder(group, options) {
        var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203e")]);
        operator.setAttribute("stretchy", "true");
        var node = new mathMLTree.MathNode("munder", [buildGroup(group.body, options), operator]);
        node.setAttribute("accentunder", "true");
        return node;
      }

    });

    defineFunction({
      type: "vcenter",
      names: ["\\vcenter"],
      props: {
        numArgs: 1,
        argTypes: ["original"],
        // In LaTeX, \vcenter can act only on a box.
        allowedInText: false
      },

      handler(_ref, args) {
        var {
          parser
        } = _ref;
        return {
          type: "vcenter",
          mode: parser.mode,
          body: args[0]
        };
      },

      htmlBuilder(group, options) {
        var body = buildGroup$1(group.body, options);
        var axisHeight = options.fontMetrics().axisHeight;
        var dy = 0.5 * (body.height - axisHeight - (body.depth + axisHeight));
        return buildCommon.makeVList({
          positionType: "shift",
          positionData: dy,
          children: [{
            type: "elem",
            elem: body
          }]
        }, options);
      },

      mathmlBuilder(group, options) {
        // There is no way to do this in MathML.
        // Write a class as a breadcrumb in case some post-processor wants
        // to perform a vcenter adjustment.
        return new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)], ["vcenter"]);
      }

    });

    defineFunction({
      type: "verb",
      names: ["\\verb"],
      props: {
        numArgs: 0,
        allowedInText: true
      },

      handler(context, args, optArgs) {
        // \verb and \verb* are dealt with directly in Parser.js.
        // If we end up here, it's because of a failure to match the two delimiters
        // in the regex in Lexer.js.  LaTeX raises the following error when \verb is
        // terminated by end of line (or file).
        throw new ParseError("\\verb ended by end of line instead of matching delimiter");
      },

      htmlBuilder(group, options) {
        var text = makeVerb(group);
        var body = []; // \verb enters text mode and therefore is sized like \textstyle

        var newOptions = options.havingStyle(options.style.text());

        for (var i = 0; i < text.length; i++) {
          var c = text[i];

          if (c === '~') {
            c = '\\textasciitilde';
          }

          body.push(buildCommon.makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
        }

        return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), buildCommon.tryCombineChars(body), newOptions);
      },

      mathmlBuilder(group, options) {
        var text = new mathMLTree.TextNode(makeVerb(group));
        var node = new mathMLTree.MathNode("mtext", [text]);
        node.setAttribute("mathvariant", "monospace");
        return node;
      }

    });
    /**
     * Converts verb group into body string.
     *
     * \verb* replaces each space with an open box \u2423
     * \verb replaces each space with a no-break space \xA0
     */

    var makeVerb = group => group.body.replace(/ /g, group.star ? '\u2423' : '\xA0');

    /** Include this to ensure that all functions are defined. */
    var functions = _functions;

    /**
     * The Lexer class handles tokenizing the input in various ways. Since our
     * parser expects us to be able to backtrack, the lexer allows lexing from any
     * given starting point.
     *
     * Its main exposed function is the `lex` function, which takes a position to
     * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
     * function.
     *
     * The various `_innerLex` functions perform the actual lexing of different
     * kinds.
     */

    /* The following tokenRegex
     * - matches typical whitespace (but not NBSP etc.) using its first group
     * - does not match any control character \x00-\x1f except whitespace
     * - does not match a bare backslash
     * - matches any ASCII character except those just mentioned
     * - does not match the BMP private use area \uE000-\uF8FF
     * - does not match bare surrogate code units
     * - matches any BMP character except for those just described
     * - matches any valid Unicode surrogate pair
     * - matches a backslash followed by one or more whitespace characters
     * - matches a backslash followed by one or more letters then whitespace
     * - matches a backslash followed by any BMP character
     * Capturing groups:
     *   [1] regular whitespace
     *   [2] backslash followed by whitespace
     *   [3] anything else, which may include:
     *     [4] left character of \verb*
     *     [5] left character of \verb
     *     [6] backslash followed by word, excluding any trailing whitespace
     * Just because the Lexer matches something doesn't mean it's valid input:
     * If there is no matching function or symbol definition, the Parser will
     * still reject the input.
     */
    var spaceRegexString = "[ \r\n\t]";
    var controlWordRegexString = "\\\\[a-zA-Z@]+";
    var controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
    var controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
    var controlSpaceRegexString = "\\\\(\n|[ \r\t]+\n?)[ \r\t]*";
    var combiningDiacriticalMarkString = "[\u0300-\u036f]";
    var combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
    var tokenRegexString = "(" + spaceRegexString + "+)|" + ( // whitespace
    controlSpaceRegexString + "|") + // \whitespace
    "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + ( // single codepoint
    combiningDiacriticalMarkString + "*") + // ...plus accents
    "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + ( // surrogate pair
    combiningDiacriticalMarkString + "*") + // ...plus accents
    "|\\\\verb\\*([^]).*?\\4" + // \verb*
    "|\\\\verb([^*a-zA-Z]).*?\\5" + ( // \verb unstarred
    "|" + controlWordWhitespaceRegexString) + ( // \macroName + spaces
    "|" + controlSymbolRegexString + ")"); // \\, \', etc.

    /** Main Lexer class */

    class Lexer {
      // Category codes. The lexer only supports comment characters (14) for now.
      // MacroExpander additionally distinguishes active (13).
      constructor(input, settings) {
        this.input = void 0;
        this.settings = void 0;
        this.tokenRegex = void 0;
        this.catcodes = void 0;
        // Separate accents from characters
        this.input = input;
        this.settings = settings;
        this.tokenRegex = new RegExp(tokenRegexString, 'g');
        this.catcodes = {
          "%": 14,
          // comment character
          "~": 13 // active character

        };
      }

      setCatcode(char, code) {
        this.catcodes[char] = code;
      }
      /**
       * This function lexes a single token.
       */


      lex() {
        var input = this.input;
        var pos = this.tokenRegex.lastIndex;

        if (pos === input.length) {
          return new Token("EOF", new SourceLocation(this, pos, pos));
        }

        var match = this.tokenRegex.exec(input);

        if (match === null || match.index !== pos) {
          throw new ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
        }

        var text = match[6] || match[3] || (match[2] ? "\\ " : " ");

        if (this.catcodes[text] === 14) {
          // comment character
          var nlIndex = input.indexOf('\n', this.tokenRegex.lastIndex);

          if (nlIndex === -1) {
            this.tokenRegex.lastIndex = input.length; // EOF

            this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would " + "fail because of commenting the end of math mode (e.g. $)");
          } else {
            this.tokenRegex.lastIndex = nlIndex + 1;
          }

          return this.lex();
        }

        return new Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
      }

    }

    /**
     * A `Namespace` refers to a space of nameable things like macros or lengths,
     * which can be `set` either globally or local to a nested group, using an
     * undo stack similar to how TeX implements this functionality.
     * Performance-wise, `get` and local `set` take constant time, while global
     * `set` takes time proportional to the depth of group nesting.
     */
    class Namespace {
      /**
       * Both arguments are optional.  The first argument is an object of
       * built-in mappings which never change.  The second argument is an object
       * of initial (global-level) mappings, which will constantly change
       * according to any global/top-level `set`s done.
       */
      constructor(builtins, globalMacros) {
        if (builtins === void 0) {
          builtins = {};
        }

        if (globalMacros === void 0) {
          globalMacros = {};
        }

        this.current = void 0;
        this.builtins = void 0;
        this.undefStack = void 0;
        this.current = globalMacros;
        this.builtins = builtins;
        this.undefStack = [];
      }
      /**
       * Start a new nested group, affecting future local `set`s.
       */


      beginGroup() {
        this.undefStack.push({});
      }
      /**
       * End current nested group, restoring values before the group began.
       */


      endGroup() {
        if (this.undefStack.length === 0) {
          throw new ParseError("Unbalanced namespace destruction: attempt " + "to pop global namespace; please report this as a bug");
        }

        var undefs = this.undefStack.pop();

        for (var undef in undefs) {
          if (undefs.hasOwnProperty(undef)) {
            if (undefs[undef] == null) {
              delete this.current[undef];
            } else {
              this.current[undef] = undefs[undef];
            }
          }
        }
      }
      /**
       * Ends all currently nested groups (if any), restoring values before the
       * groups began.  Useful in case of an error in the middle of parsing.
       */


      endGroups() {
        while (this.undefStack.length > 0) {
          this.endGroup();
        }
      }
      /**
       * Detect whether `name` has a definition.  Equivalent to
       * `get(name) != null`.
       */


      has(name) {
        return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
      }
      /**
       * Get the current value of a name, or `undefined` if there is no value.
       *
       * Note: Do not use `if (namespace.get(...))` to detect whether a macro
       * is defined, as the definition may be the empty string which evaluates
       * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
       * `if (namespace.has(...))`.
       */


      get(name) {
        if (this.current.hasOwnProperty(name)) {
          return this.current[name];
        } else {
          return this.builtins[name];
        }
      }
      /**
       * Set the current value of a name, and optionally set it globally too.
       * Local set() sets the current value and (when appropriate) adds an undo
       * operation to the undo stack.  Global set() may change the undo
       * operation at every level, so takes time linear in their number.
       * A value of undefined means to delete existing definitions.
       */


      set(name, value, global) {
        if (global === void 0) {
          global = false;
        }

        if (global) {
          // Global set is equivalent to setting in all groups.  Simulate this
          // by destroying any undos currently scheduled for this name,
          // and adding an undo with the *new* value (in case it later gets
          // locally reset within this environment).
          for (var i = 0; i < this.undefStack.length; i++) {
            delete this.undefStack[i][name];
          }

          if (this.undefStack.length > 0) {
            this.undefStack[this.undefStack.length - 1][name] = value;
          }
        } else {
          // Undo this set at end of this group (possibly to `undefined`),
          // unless an undo is already in place, in which case that older
          // value is the correct one.
          var top = this.undefStack[this.undefStack.length - 1];

          if (top && !top.hasOwnProperty(name)) {
            top[name] = this.current[name];
          }
        }

        if (value == null) {
          delete this.current[name];
        } else {
          this.current[name] = value;
        }
      }

    }

    /**
     * Predefined macros for KaTeX.
     * This can be used to define some commands in terms of others.
     */
    var macros = _macros;
    // macro tools

    defineMacro("\\noexpand", function (context) {
      // The expansion is the token itself; but that token is interpreted
      // as if its meaning were ‘\relax’ if it is a control sequence that
      // would ordinarily be expanded by TeX’s expansion rules.
      var t = context.popToken();

      if (context.isExpandable(t.text)) {
        t.noexpand = true;
        t.treatAsRelax = true;
      }

      return {
        tokens: [t],
        numArgs: 0
      };
    });
    defineMacro("\\expandafter", function (context) {
      // TeX first reads the token that comes immediately after \expandafter,
      // without expanding it; let’s call this token t. Then TeX reads the
      // token that comes after t (and possibly more tokens, if that token
      // has an argument), replacing it by its expansion. Finally TeX puts
      // t back in front of that expansion.
      var t = context.popToken();
      context.expandOnce(true); // expand only an expandable token

      return {
        tokens: [t],
        numArgs: 0
      };
    }); // LaTeX's \@firstoftwo{#1}{#2} expands to #1, skipping #2
    // TeX source: \long\def\@firstoftwo#1#2{#1}

    defineMacro("\\@firstoftwo", function (context) {
      var args = context.consumeArgs(2);
      return {
        tokens: args[0],
        numArgs: 0
      };
    }); // LaTeX's \@secondoftwo{#1}{#2} expands to #2, skipping #1
    // TeX source: \long\def\@secondoftwo#1#2{#2}

    defineMacro("\\@secondoftwo", function (context) {
      var args = context.consumeArgs(2);
      return {
        tokens: args[1],
        numArgs: 0
      };
    }); // LaTeX's \@ifnextchar{#1}{#2}{#3} looks ahead to the next (unexpanded)
    // symbol that isn't a space, consuming any spaces but not consuming the
    // first nonspace character.  If that nonspace character matches #1, then
    // the macro expands to #2; otherwise, it expands to #3.

    defineMacro("\\@ifnextchar", function (context) {
      var args = context.consumeArgs(3); // symbol, if, else

      context.consumeSpaces();
      var nextToken = context.future();

      if (args[0].length === 1 && args[0][0].text === nextToken.text) {
        return {
          tokens: args[1],
          numArgs: 0
        };
      } else {
        return {
          tokens: args[2],
          numArgs: 0
        };
      }
    }); // LaTeX's \@ifstar{#1}{#2} looks ahead to the next (unexpanded) symbol.
    // If it is `*`, then it consumes the symbol, and the macro expands to #1;
    // otherwise, the macro expands to #2 (without consuming the symbol).
    // TeX source: \def\@ifstar#1{\@ifnextchar *{\@firstoftwo{#1}}}

    defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"); // LaTeX's \TextOrMath{#1}{#2} expands to #1 in text mode, #2 in math mode

    defineMacro("\\TextOrMath", function (context) {
      var args = context.consumeArgs(2);

      if (context.mode === 'text') {
        return {
          tokens: args[0],
          numArgs: 0
        };
      } else {
        return {
          tokens: args[1],
          numArgs: 0
        };
      }
    }); // Lookup table for parsing numbers in base 8 through 16

    var digitToNumber = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "a": 10,
      "A": 10,
      "b": 11,
      "B": 11,
      "c": 12,
      "C": 12,
      "d": 13,
      "D": 13,
      "e": 14,
      "E": 14,
      "f": 15,
      "F": 15
    }; // TeX \char makes a literal character (catcode 12) using the following forms:
    // (see The TeXBook, p. 43)
    //   \char123  -- decimal
    //   \char'123 -- octal
    //   \char"123 -- hex
    //   \char`x   -- character that can be written (i.e. isn't active)
    //   \char`\x  -- character that cannot be written (e.g. %)
    // These all refer to characters from the font, so we turn them into special
    // calls to a function \@char dealt with in the Parser.

    defineMacro("\\char", function (context) {
      var token = context.popToken();
      var base;
      var number = '';

      if (token.text === "'") {
        base = 8;
        token = context.popToken();
      } else if (token.text === '"') {
        base = 16;
        token = context.popToken();
      } else if (token.text === "`") {
        token = context.popToken();

        if (token.text[0] === "\\") {
          number = token.text.charCodeAt(1);
        } else if (token.text === "EOF") {
          throw new ParseError("\\char` missing argument");
        } else {
          number = token.text.charCodeAt(0);
        }
      } else {
        base = 10;
      }

      if (base) {
        // Parse a number in the given base, starting with first `token`.
        number = digitToNumber[token.text];

        if (number == null || number >= base) {
          throw new ParseError("Invalid base-" + base + " digit " + token.text);
        }

        var digit;

        while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
          number *= base;
          number += digit;
          context.popToken();
        }
      }

      return "\\@char{" + number + "}";
    }); // \newcommand{\macro}[args]{definition}
    // \renewcommand{\macro}[args]{definition}
    // TODO: Optional arguments: \newcommand{\macro}[args][default]{definition}

    var newcommand = (context, existsOK, nonexistsOK) => {
      var arg = context.consumeArg().tokens;

      if (arg.length !== 1) {
        throw new ParseError("\\newcommand's first argument must be a macro name");
      }

      var name = arg[0].text;
      var exists = context.isDefined(name);

      if (exists && !existsOK) {
        throw new ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
      }

      if (!exists && !nonexistsOK) {
        throw new ParseError("\\renewcommand{" + name + "} when command " + name + " " + "does not yet exist; use \\newcommand");
      }

      var numArgs = 0;
      arg = context.consumeArg().tokens;

      if (arg.length === 1 && arg[0].text === "[") {
        var argText = '';
        var token = context.expandNextToken();

        while (token.text !== "]" && token.text !== "EOF") {
          // TODO: Should properly expand arg, e.g., ignore {}s
          argText += token.text;
          token = context.expandNextToken();
        }

        if (!argText.match(/^\s*[0-9]+\s*$/)) {
          throw new ParseError("Invalid number of arguments: " + argText);
        }

        numArgs = parseInt(argText);
        arg = context.consumeArg().tokens;
      } // Final arg is the expansion of the macro


      context.macros.set(name, {
        tokens: arg,
        numArgs
      });
      return '';
    };

    defineMacro("\\newcommand", context => newcommand(context, false, true));
    defineMacro("\\renewcommand", context => newcommand(context, true, false));
    defineMacro("\\providecommand", context => newcommand(context, true, true)); // terminal (console) tools

    defineMacro("\\message", context => {
      var arg = context.consumeArgs(1)[0]; // eslint-disable-next-line no-console

      console.log(arg.reverse().map(token => token.text).join(""));
      return '';
    });
    defineMacro("\\errmessage", context => {
      var arg = context.consumeArgs(1)[0]; // eslint-disable-next-line no-console

      console.error(arg.reverse().map(token => token.text).join(""));
      return '';
    });
    defineMacro("\\show", context => {
      var tok = context.popToken();
      var name = tok.text; // eslint-disable-next-line no-console

      console.log(tok, context.macros.get(name), functions[name], symbols.math[name], symbols.text[name]);
      return '';
    }); //////////////////////////////////////////////////////////////////////
    // Grouping
    // \let\bgroup={ \let\egroup=}

    defineMacro("\\bgroup", "{");
    defineMacro("\\egroup", "}"); // Symbols from latex.ltx:
    // \def~{\nobreakspace{}}
    // \def\lq{`}
    // \def\rq{'}
    // \def \aa {\r a}
    // \def \AA {\r A}

    defineMacro("~", "\\nobreakspace");
    defineMacro("\\lq", "`");
    defineMacro("\\rq", "'");
    defineMacro("\\aa", "\\r a");
    defineMacro("\\AA", "\\r A"); // Copyright (C) and registered (R) symbols. Use raw symbol in MathML.
    // \DeclareTextCommandDefault{\textcopyright}{\textcircled{c}}
    // \DeclareTextCommandDefault{\textregistered}{\textcircled{%
    //      \check@mathfonts\fontsize\sf@size\z@\math@fontsfalse\selectfont R}}
    // \DeclareRobustCommand{\copyright}{%
    //    \ifmmode{\nfss@text{\textcopyright}}\else\textcopyright\fi}

    defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
    defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
    defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"); // Characters omitted from Unicode range 1D400–1D7FF

    defineMacro("\u212C", "\\mathscr{B}"); // script

    defineMacro("\u2130", "\\mathscr{E}");
    defineMacro("\u2131", "\\mathscr{F}");
    defineMacro("\u210B", "\\mathscr{H}");
    defineMacro("\u2110", "\\mathscr{I}");
    defineMacro("\u2112", "\\mathscr{L}");
    defineMacro("\u2133", "\\mathscr{M}");
    defineMacro("\u211B", "\\mathscr{R}");
    defineMacro("\u212D", "\\mathfrak{C}"); // Fraktur

    defineMacro("\u210C", "\\mathfrak{H}");
    defineMacro("\u2128", "\\mathfrak{Z}"); // Define \Bbbk with a macro that works in both HTML and MathML.

    defineMacro("\\Bbbk", "\\Bbb{k}"); // Unicode middle dot
    // The KaTeX fonts do not contain U+00B7. Instead, \cdotp displays
    // the dot at U+22C5 and gives it punct spacing.

    defineMacro("\u00b7", "\\cdotp"); // \llap and \rlap render their contents in text mode

    defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
    defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
    defineMacro("\\clap", "\\mathclap{\\textrm{#1}}"); // \mathstrut from the TeXbook, p 360

    defineMacro("\\mathstrut", "\\vphantom{(}"); // \underbar from TeXbook p 353

    defineMacro("\\underbar", "\\underline{\\text{#1}}"); // \not is defined by base/fontmath.ltx via
    // \DeclareMathSymbol{\not}{\mathrel}{symbols}{"36}
    // It's thus treated like a \mathrel, but defined by a symbol that has zero
    // width but extends to the right.  We use \rlap to get that spacing.
    // For MathML we write U+0338 here. buildMathML.js will then do the overlay.

    defineMacro("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'); // Negated symbols from base/fontmath.ltx:
    // \def\neq{\not=} \let\ne=\neq
    // \DeclareRobustCommand
    //   \notin{\mathrel{\m@th\mathpalette\c@ncel\in}}
    // \def\c@ncel#1#2{\m@th\ooalign{$\hfil#1\mkern1mu/\hfil$\crcr$#1#2$}}

    defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
    defineMacro("\\ne", "\\neq");
    defineMacro("\u2260", "\\neq");
    defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}" + "{\\mathrel{\\char`∉}}");
    defineMacro("\u2209", "\\notin"); // Unicode stacked relations

    defineMacro("\u2258", "\\html@mathml{" + "\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}" + "}{\\mathrel{\\char`\u2258}}");
    defineMacro("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
    defineMacro("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
    defineMacro("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}" + "{\\mathrel{\\char`\u225B}}");
    defineMacro("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}" + "{\\mathrel{\\char`\u225D}}");
    defineMacro("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}" + "{\\mathrel{\\char`\u225E}}");
    defineMacro("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}"); // Misc Unicode

    defineMacro("\u27C2", "\\perp");
    defineMacro("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
    defineMacro("\u220C", "\\notni");
    defineMacro("\u231C", "\\ulcorner");
    defineMacro("\u231D", "\\urcorner");
    defineMacro("\u231E", "\\llcorner");
    defineMacro("\u231F", "\\lrcorner");
    defineMacro("\u00A9", "\\copyright");
    defineMacro("\u00AE", "\\textregistered");
    defineMacro("\uFE0F", "\\textregistered"); // The KaTeX fonts have corners at codepoints that don't match Unicode.
    // For MathML purposes, use the Unicode code point.

    defineMacro("\\ulcorner", "\\html@mathml{\\@ulcorner}{\\mathop{\\char\"231c}}");
    defineMacro("\\urcorner", "\\html@mathml{\\@urcorner}{\\mathop{\\char\"231d}}");
    defineMacro("\\llcorner", "\\html@mathml{\\@llcorner}{\\mathop{\\char\"231e}}");
    defineMacro("\\lrcorner", "\\html@mathml{\\@lrcorner}{\\mathop{\\char\"231f}}"); //////////////////////////////////////////////////////////////////////
    // LaTeX_2ε
    // \vdots{\vbox{\baselineskip4\p@  \lineskiplimit\z@
    // \kern6\p@\hbox{.}\hbox{.}\hbox{.}}}
    // We'll call \varvdots, which gets a glyph from symbols.js.
    // The zero-width rule gets us an equivalent to the vertical 6pt kern.

    defineMacro("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
    defineMacro("\u22ee", "\\vdots"); //////////////////////////////////////////////////////////////////////
    // amsmath.sty
    // http://mirrors.concertpass.com/tex-archive/macros/latex/required/amsmath/amsmath.pdf
    // Italic Greek capital letters.  AMS defines these with \DeclareMathSymbol,
    // but they are equivalent to \mathit{\Letter}.

    defineMacro("\\varGamma", "\\mathit{\\Gamma}");
    defineMacro("\\varDelta", "\\mathit{\\Delta}");
    defineMacro("\\varTheta", "\\mathit{\\Theta}");
    defineMacro("\\varLambda", "\\mathit{\\Lambda}");
    defineMacro("\\varXi", "\\mathit{\\Xi}");
    defineMacro("\\varPi", "\\mathit{\\Pi}");
    defineMacro("\\varSigma", "\\mathit{\\Sigma}");
    defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
    defineMacro("\\varPhi", "\\mathit{\\Phi}");
    defineMacro("\\varPsi", "\\mathit{\\Psi}");
    defineMacro("\\varOmega", "\\mathit{\\Omega}"); //\newcommand{\substack}[1]{\subarray{c}#1\endsubarray}

    defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"); // \renewcommand{\colon}{\nobreak\mskip2mu\mathpunct{}\nonscript
    // \mkern-\thinmuskip{:}\mskip6muplus1mu\relax}

    defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}" + "\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"); // \newcommand{\boxed}[1]{\fbox{\m@th$\displaystyle#1$}}

    defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}"); // \def\iff{\DOTSB\;\Longleftrightarrow\;}
    // \def\implies{\DOTSB\;\Longrightarrow\;}
    // \def\impliedby{\DOTSB\;\Longleftarrow\;}

    defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
    defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
    defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;"); // AMSMath's automatic \dots, based on \mdots@@ macro.

    var dotsByToken = {
      ',': '\\dotsc',
      '\\not': '\\dotsb',
      // \keybin@ checks for the following:
      '+': '\\dotsb',
      '=': '\\dotsb',
      '<': '\\dotsb',
      '>': '\\dotsb',
      '-': '\\dotsb',
      '*': '\\dotsb',
      ':': '\\dotsb',
      // Symbols whose definition starts with \DOTSB:
      '\\DOTSB': '\\dotsb',
      '\\coprod': '\\dotsb',
      '\\bigvee': '\\dotsb',
      '\\bigwedge': '\\dotsb',
      '\\biguplus': '\\dotsb',
      '\\bigcap': '\\dotsb',
      '\\bigcup': '\\dotsb',
      '\\prod': '\\dotsb',
      '\\sum': '\\dotsb',
      '\\bigotimes': '\\dotsb',
      '\\bigoplus': '\\dotsb',
      '\\bigodot': '\\dotsb',
      '\\bigsqcup': '\\dotsb',
      '\\And': '\\dotsb',
      '\\longrightarrow': '\\dotsb',
      '\\Longrightarrow': '\\dotsb',
      '\\longleftarrow': '\\dotsb',
      '\\Longleftarrow': '\\dotsb',
      '\\longleftrightarrow': '\\dotsb',
      '\\Longleftrightarrow': '\\dotsb',
      '\\mapsto': '\\dotsb',
      '\\longmapsto': '\\dotsb',
      '\\hookrightarrow': '\\dotsb',
      '\\doteq': '\\dotsb',
      // Symbols whose definition starts with \mathbin:
      '\\mathbin': '\\dotsb',
      // Symbols whose definition starts with \mathrel:
      '\\mathrel': '\\dotsb',
      '\\relbar': '\\dotsb',
      '\\Relbar': '\\dotsb',
      '\\xrightarrow': '\\dotsb',
      '\\xleftarrow': '\\dotsb',
      // Symbols whose definition starts with \DOTSI:
      '\\DOTSI': '\\dotsi',
      '\\int': '\\dotsi',
      '\\oint': '\\dotsi',
      '\\iint': '\\dotsi',
      '\\iiint': '\\dotsi',
      '\\iiiint': '\\dotsi',
      '\\idotsint': '\\dotsi',
      // Symbols whose definition starts with \DOTSX:
      '\\DOTSX': '\\dotsx'
    };
    defineMacro("\\dots", function (context) {
      // TODO: If used in text mode, should expand to \textellipsis.
      // However, in KaTeX, \textellipsis and \ldots behave the same
      // (in text mode), and it's unlikely we'd see any of the math commands
      // that affect the behavior of \dots when in text mode.  So fine for now
      // (until we support \ifmmode ... \else ... \fi).
      var thedots = '\\dotso';
      var next = context.expandAfterFuture().text;

      if (next in dotsByToken) {
        thedots = dotsByToken[next];
      } else if (next.slice(0, 4) === '\\not') {
        thedots = '\\dotsb';
      } else if (next in symbols.math) {
        if (utils.contains(['bin', 'rel'], symbols.math[next].group)) {
          thedots = '\\dotsb';
        }
      }

      return thedots;
    });
    var spaceAfterDots = {
      // \rightdelim@ checks for the following:
      ')': true,
      ']': true,
      '\\rbrack': true,
      '\\}': true,
      '\\rbrace': true,
      '\\rangle': true,
      '\\rceil': true,
      '\\rfloor': true,
      '\\rgroup': true,
      '\\rmoustache': true,
      '\\right': true,
      '\\bigr': true,
      '\\biggr': true,
      '\\Bigr': true,
      '\\Biggr': true,
      // \extra@ also tests for the following:
      '$': true,
      // \extrap@ checks for the following:
      ';': true,
      '.': true,
      ',': true
    };
    defineMacro("\\dotso", function (context) {
      var next = context.future().text;

      if (next in spaceAfterDots) {
        return "\\ldots\\,";
      } else {
        return "\\ldots";
      }
    });
    defineMacro("\\dotsc", function (context) {
      var next = context.future().text; // \dotsc uses \extra@ but not \extrap@, instead specially checking for
      // ';' and '.', but doesn't check for ','.

      if (next in spaceAfterDots && next !== ',') {
        return "\\ldots\\,";
      } else {
        return "\\ldots";
      }
    });
    defineMacro("\\cdots", function (context) {
      var next = context.future().text;

      if (next in spaceAfterDots) {
        return "\\@cdots\\,";
      } else {
        return "\\@cdots";
      }
    });
    defineMacro("\\dotsb", "\\cdots");
    defineMacro("\\dotsm", "\\cdots");
    defineMacro("\\dotsi", "\\!\\cdots"); // amsmath doesn't actually define \dotsx, but \dots followed by a macro
    // starting with \DOTSX implies \dotso, and then \extra@ detects this case
    // and forces the added `\,`.

    defineMacro("\\dotsx", "\\ldots\\,"); // \let\DOTSI\relax
    // \let\DOTSB\relax
    // \let\DOTSX\relax

    defineMacro("\\DOTSI", "\\relax");
    defineMacro("\\DOTSB", "\\relax");
    defineMacro("\\DOTSX", "\\relax"); // Spacing, based on amsmath.sty's override of LaTeX defaults
    // \DeclareRobustCommand{\tmspace}[3]{%
    //   \ifmmode\mskip#1#2\else\kern#1#3\fi\relax}

    defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"); // \renewcommand{\,}{\tmspace+\thinmuskip{.1667em}}
    // TODO: math mode should use \thinmuskip

    defineMacro("\\,", "\\tmspace+{3mu}{.1667em}"); // \let\thinspace\,

    defineMacro("\\thinspace", "\\,"); // \def\>{\mskip\medmuskip}
    // \renewcommand{\:}{\tmspace+\medmuskip{.2222em}}
    // TODO: \> and math mode of \: should use \medmuskip = 4mu plus 2mu minus 4mu

    defineMacro("\\>", "\\mskip{4mu}");
    defineMacro("\\:", "\\tmspace+{4mu}{.2222em}"); // \let\medspace\:

    defineMacro("\\medspace", "\\:"); // \renewcommand{\;}{\tmspace+\thickmuskip{.2777em}}
    // TODO: math mode should use \thickmuskip = 5mu plus 5mu

    defineMacro("\\;", "\\tmspace+{5mu}{.2777em}"); // \let\thickspace\;

    defineMacro("\\thickspace", "\\;"); // \renewcommand{\!}{\tmspace-\thinmuskip{.1667em}}
    // TODO: math mode should use \thinmuskip

    defineMacro("\\!", "\\tmspace-{3mu}{.1667em}"); // \let\negthinspace\!

    defineMacro("\\negthinspace", "\\!"); // \newcommand{\negmedspace}{\tmspace-\medmuskip{.2222em}}
    // TODO: math mode should use \medmuskip

    defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}"); // \newcommand{\negthickspace}{\tmspace-\thickmuskip{.2777em}}
    // TODO: math mode should use \thickmuskip

    defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}"); // \def\enspace{\kern.5em }

    defineMacro("\\enspace", "\\kern.5em "); // \def\enskip{\hskip.5em\relax}

    defineMacro("\\enskip", "\\hskip.5em\\relax"); // \def\quad{\hskip1em\relax}

    defineMacro("\\quad", "\\hskip1em\\relax"); // \def\qquad{\hskip2em\relax}

    defineMacro("\\qquad", "\\hskip2em\\relax"); // \tag@in@display form of \tag

    defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
    defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
    defineMacro("\\tag@literal", context => {
      if (context.macros.get("\\df@tag")) {
        throw new ParseError("Multiple \\tag");
      }

      return "\\gdef\\df@tag{\\text{#1}}";
    }); // \renewcommand{\bmod}{\nonscript\mskip-\medmuskip\mkern5mu\mathbin
    //   {\operator@font mod}\penalty900
    //   \mkern5mu\nonscript\mskip-\medmuskip}
    // \newcommand{\pod}[1]{\allowbreak
    //   \if@display\mkern18mu\else\mkern8mu\fi(#1)}
    // \renewcommand{\pmod}[1]{\pod{{\operator@font mod}\mkern6mu#1}}
    // \newcommand{\mod}[1]{\allowbreak\if@display\mkern18mu
    //   \else\mkern12mu\fi{\operator@font mod}\,\,#1}
    // TODO: math mode should use \medmuskip = 4mu plus 2mu minus 4mu

    defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}" + "\\mathbin{\\rm mod}" + "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
    defineMacro("\\pod", "\\allowbreak" + "\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
    defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
    defineMacro("\\mod", "\\allowbreak" + "\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}" + "{\\rm mod}\\,\\,#1"); //////////////////////////////////////////////////////////////////////
    // LaTeX source2e
    // \expandafter\let\expandafter\@normalcr
    //     \csname\expandafter\@gobble\string\\ \endcsname
    // \DeclareRobustCommand\newline{\@normalcr\relax}

    defineMacro("\\newline", "\\\\\\relax"); // \def\TeX{T\kern-.1667em\lower.5ex\hbox{E}\kern-.125emX\@}
    // TODO: Doesn't normally work in math mode because \@ fails.  KaTeX doesn't
    // support \@ yet, so that's omitted, and we add \text so that the result
    // doesn't look funny in math mode.

    defineMacro("\\TeX", "\\textrm{\\html@mathml{" + "T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX" + "}{TeX}}"); // \DeclareRobustCommand{\LaTeX}{L\kern-.36em%
    //         {\sbox\z@ T%
    //          \vbox to\ht\z@{\hbox{\check@mathfonts
    //                               \fontsize\sf@size\z@
    //                               \math@fontsfalse\selectfont
    //                               A}%
    //                         \vss}%
    //         }%
    //         \kern-.15em%
    //         \TeX}
    // This code aligns the top of the A with the T (from the perspective of TeX's
    // boxes, though visually the A appears to extend above slightly).
    // We compute the corresponding \raisebox when A is rendered in \normalsize
    // \scriptstyle, which has a scale factor of 0.7 (see Options.js).

    var latexRaiseA = makeEm(fontMetricsData['Main-Regular']["T".charCodeAt(0)][1] - 0.7 * fontMetricsData['Main-Regular']["A".charCodeAt(0)][1]);
    defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}"); // New KaTeX logo based on tweaking LaTeX logo

    defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}"); // \DeclareRobustCommand\hspace{\@ifstar\@hspacer\@hspace}
    // \def\@hspace#1{\hskip  #1\relax}
    // \def\@hspacer#1{\vrule \@width\z@\nobreak
    //                 \hskip #1\hskip \z@skip}

    defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
    defineMacro("\\@hspace", "\\hskip #1\\relax");
    defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"); //////////////////////////////////////////////////////////////////////
    // mathtools.sty
    //\providecommand\ordinarycolon{:}

    defineMacro("\\ordinarycolon", ":"); //\def\vcentcolon{\mathrel{\mathop\ordinarycolon}}
    //TODO(edemaine): Not yet centered. Fix via \raisebox or #726

    defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}"); // \providecommand*\dblcolon{\vcentcolon\mathrel{\mkern-.9mu}\vcentcolon}

    defineMacro("\\dblcolon", "\\html@mathml{" + "\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}" + "{\\mathop{\\char\"2237}}"); // \providecommand*\coloneqq{\vcentcolon\mathrel{\mkern-1.2mu}=}

    defineMacro("\\coloneqq", "\\html@mathml{" + "\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}" + "{\\mathop{\\char\"2254}}"); // ≔
    // \providecommand*\Coloneqq{\dblcolon\mathrel{\mkern-1.2mu}=}

    defineMacro("\\Coloneqq", "\\html@mathml{" + "\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}" + "{\\mathop{\\char\"2237\\char\"3d}}"); // \providecommand*\coloneq{\vcentcolon\mathrel{\mkern-1.2mu}\mathrel{-}}

    defineMacro("\\coloneq", "\\html@mathml{" + "\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}" + "{\\mathop{\\char\"3a\\char\"2212}}"); // \providecommand*\Coloneq{\dblcolon\mathrel{\mkern-1.2mu}\mathrel{-}}

    defineMacro("\\Coloneq", "\\html@mathml{" + "\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}" + "{\\mathop{\\char\"2237\\char\"2212}}"); // \providecommand*\eqqcolon{=\mathrel{\mkern-1.2mu}\vcentcolon}

    defineMacro("\\eqqcolon", "\\html@mathml{" + "\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}" + "{\\mathop{\\char\"2255}}"); // ≕
    // \providecommand*\Eqqcolon{=\mathrel{\mkern-1.2mu}\dblcolon}

    defineMacro("\\Eqqcolon", "\\html@mathml{" + "\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}" + "{\\mathop{\\char\"3d\\char\"2237}}"); // \providecommand*\eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\vcentcolon}

    defineMacro("\\eqcolon", "\\html@mathml{" + "\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}" + "{\\mathop{\\char\"2239}}"); // \providecommand*\Eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\dblcolon}

    defineMacro("\\Eqcolon", "\\html@mathml{" + "\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}" + "{\\mathop{\\char\"2212\\char\"2237}}"); // \providecommand*\colonapprox{\vcentcolon\mathrel{\mkern-1.2mu}\approx}

    defineMacro("\\colonapprox", "\\html@mathml{" + "\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}" + "{\\mathop{\\char\"3a\\char\"2248}}"); // \providecommand*\Colonapprox{\dblcolon\mathrel{\mkern-1.2mu}\approx}

    defineMacro("\\Colonapprox", "\\html@mathml{" + "\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}" + "{\\mathop{\\char\"2237\\char\"2248}}"); // \providecommand*\colonsim{\vcentcolon\mathrel{\mkern-1.2mu}\sim}

    defineMacro("\\colonsim", "\\html@mathml{" + "\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}" + "{\\mathop{\\char\"3a\\char\"223c}}"); // \providecommand*\Colonsim{\dblcolon\mathrel{\mkern-1.2mu}\sim}

    defineMacro("\\Colonsim", "\\html@mathml{" + "\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}" + "{\\mathop{\\char\"2237\\char\"223c}}"); // Some Unicode characters are implemented with macros to mathtools functions.

    defineMacro("\u2237", "\\dblcolon"); // ::

    defineMacro("\u2239", "\\eqcolon"); // -:

    defineMacro("\u2254", "\\coloneqq"); // :=

    defineMacro("\u2255", "\\eqqcolon"); // =:

    defineMacro("\u2A74", "\\Coloneqq"); // ::=
    //////////////////////////////////////////////////////////////////////
    // colonequals.sty
    // Alternate names for mathtools's macros:

    defineMacro("\\ratio", "\\vcentcolon");
    defineMacro("\\coloncolon", "\\dblcolon");
    defineMacro("\\colonequals", "\\coloneqq");
    defineMacro("\\coloncolonequals", "\\Coloneqq");
    defineMacro("\\equalscolon", "\\eqqcolon");
    defineMacro("\\equalscoloncolon", "\\Eqqcolon");
    defineMacro("\\colonminus", "\\coloneq");
    defineMacro("\\coloncolonminus", "\\Coloneq");
    defineMacro("\\minuscolon", "\\eqcolon");
    defineMacro("\\minuscoloncolon", "\\Eqcolon"); // \colonapprox name is same in mathtools and colonequals.

    defineMacro("\\coloncolonapprox", "\\Colonapprox"); // \colonsim name is same in mathtools and colonequals.

    defineMacro("\\coloncolonsim", "\\Colonsim"); // Additional macros, implemented by analogy with mathtools definitions:

    defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
    defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
    defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
    defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"); // Present in newtxmath, pxfonts and txfonts

    defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
    defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
    defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"); //////////////////////////////////////////////////////////////////////
    // From amsopn.sty

    defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
    defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
    defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
    defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
    defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
    defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}"); //////////////////////////////////////////////////////////////////////
    // MathML alternates for KaTeX glyphs in the Unicode private area

    defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
    defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
    defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
    defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
    defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
    defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
    defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
    defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
    defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
    defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
    defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
    defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
    defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
    defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
    defineMacro("\\imath", "\\html@mathml{\\@imath}{\u0131}");
    defineMacro("\\jmath", "\\html@mathml{\\@jmath}{\u0237}"); //////////////////////////////////////////////////////////////////////
    // stmaryrd and semantic
    // The stmaryrd and semantic packages render the next four items by calling a
    // glyph. Those glyphs do not exist in the KaTeX fonts. Hence the macros.

    defineMacro("\\llbracket", "\\html@mathml{" + "\\mathopen{[\\mkern-3.2mu[}}" + "{\\mathopen{\\char`\u27e6}}");
    defineMacro("\\rrbracket", "\\html@mathml{" + "\\mathclose{]\\mkern-3.2mu]}}" + "{\\mathclose{\\char`\u27e7}}");
    defineMacro("\u27e6", "\\llbracket"); // blackboard bold [

    defineMacro("\u27e7", "\\rrbracket"); // blackboard bold ]

    defineMacro("\\lBrace", "\\html@mathml{" + "\\mathopen{\\{\\mkern-3.2mu[}}" + "{\\mathopen{\\char`\u2983}}");
    defineMacro("\\rBrace", "\\html@mathml{" + "\\mathclose{]\\mkern-3.2mu\\}}}" + "{\\mathclose{\\char`\u2984}}");
    defineMacro("\u2983", "\\lBrace"); // blackboard bold {

    defineMacro("\u2984", "\\rBrace"); // blackboard bold }
    // TODO: Create variable sized versions of the last two items. I believe that
    // will require new font glyphs.
    // The stmaryrd function `\minuso` provides a "Plimsoll" symbol that
    // superimposes the characters \circ and \mathminus. Used in chemistry.

    defineMacro("\\minuso", "\\mathbin{\\html@mathml{" + "{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}" + "{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}" + "{\\char`⦵}}");
    defineMacro("⦵", "\\minuso"); //////////////////////////////////////////////////////////////////////
    // texvc.sty
    // The texvc package contains macros available in mediawiki pages.
    // We omit the functions deprecated at
    // https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax
    // We also omit texvc's \O, which conflicts with \text{\O}

    defineMacro("\\darr", "\\downarrow");
    defineMacro("\\dArr", "\\Downarrow");
    defineMacro("\\Darr", "\\Downarrow");
    defineMacro("\\lang", "\\langle");
    defineMacro("\\rang", "\\rangle");
    defineMacro("\\uarr", "\\uparrow");
    defineMacro("\\uArr", "\\Uparrow");
    defineMacro("\\Uarr", "\\Uparrow");
    defineMacro("\\N", "\\mathbb{N}");
    defineMacro("\\R", "\\mathbb{R}");
    defineMacro("\\Z", "\\mathbb{Z}");
    defineMacro("\\alef", "\\aleph");
    defineMacro("\\alefsym", "\\aleph");
    defineMacro("\\Alpha", "\\mathrm{A}");
    defineMacro("\\Beta", "\\mathrm{B}");
    defineMacro("\\bull", "\\bullet");
    defineMacro("\\Chi", "\\mathrm{X}");
    defineMacro("\\clubs", "\\clubsuit");
    defineMacro("\\cnums", "\\mathbb{C}");
    defineMacro("\\Complex", "\\mathbb{C}");
    defineMacro("\\Dagger", "\\ddagger");
    defineMacro("\\diamonds", "\\diamondsuit");
    defineMacro("\\empty", "\\emptyset");
    defineMacro("\\Epsilon", "\\mathrm{E}");
    defineMacro("\\Eta", "\\mathrm{H}");
    defineMacro("\\exist", "\\exists");
    defineMacro("\\harr", "\\leftrightarrow");
    defineMacro("\\hArr", "\\Leftrightarrow");
    defineMacro("\\Harr", "\\Leftrightarrow");
    defineMacro("\\hearts", "\\heartsuit");
    defineMacro("\\image", "\\Im");
    defineMacro("\\infin", "\\infty");
    defineMacro("\\Iota", "\\mathrm{I}");
    defineMacro("\\isin", "\\in");
    defineMacro("\\Kappa", "\\mathrm{K}");
    defineMacro("\\larr", "\\leftarrow");
    defineMacro("\\lArr", "\\Leftarrow");
    defineMacro("\\Larr", "\\Leftarrow");
    defineMacro("\\lrarr", "\\leftrightarrow");
    defineMacro("\\lrArr", "\\Leftrightarrow");
    defineMacro("\\Lrarr", "\\Leftrightarrow");
    defineMacro("\\Mu", "\\mathrm{M}");
    defineMacro("\\natnums", "\\mathbb{N}");
    defineMacro("\\Nu", "\\mathrm{N}");
    defineMacro("\\Omicron", "\\mathrm{O}");
    defineMacro("\\plusmn", "\\pm");
    defineMacro("\\rarr", "\\rightarrow");
    defineMacro("\\rArr", "\\Rightarrow");
    defineMacro("\\Rarr", "\\Rightarrow");
    defineMacro("\\real", "\\Re");
    defineMacro("\\reals", "\\mathbb{R}");
    defineMacro("\\Reals", "\\mathbb{R}");
    defineMacro("\\Rho", "\\mathrm{P}");
    defineMacro("\\sdot", "\\cdot");
    defineMacro("\\sect", "\\S");
    defineMacro("\\spades", "\\spadesuit");
    defineMacro("\\sub", "\\subset");
    defineMacro("\\sube", "\\subseteq");
    defineMacro("\\supe", "\\supseteq");
    defineMacro("\\Tau", "\\mathrm{T}");
    defineMacro("\\thetasym", "\\vartheta"); // TODO: defineMacro("\\varcoppa", "\\\mbox{\\coppa}");

    defineMacro("\\weierp", "\\wp");
    defineMacro("\\Zeta", "\\mathrm{Z}"); //////////////////////////////////////////////////////////////////////
    // statmath.sty
    // https://ctan.math.illinois.edu/macros/latex/contrib/statmath/statmath.pdf

    defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
    defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
    defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits"); //////////////////////////////////////////////////////////////////////
    // braket.sty
    // http://ctan.math.washington.edu/tex-archive/macros/latex/contrib/braket/braket.pdf

    defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
    defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
    defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
    defineMacro("\\Bra", "\\left\\langle#1\\right|");
    defineMacro("\\Ket", "\\left|#1\\right\\rangle");

    var braketHelper = one => context => {
      var left = context.consumeArg().tokens;
      var middle = context.consumeArg().tokens;
      var middleDouble = context.consumeArg().tokens;
      var right = context.consumeArg().tokens;
      var oldMiddle = context.macros.get("|");
      var oldMiddleDouble = context.macros.get("\\|");
      context.macros.beginGroup();

      var midMacro = double => context => {
        if (one) {
          // Only modify the first instance of | or \|
          context.macros.set("|", oldMiddle);

          if (middleDouble.length) {
            context.macros.set("\\|", oldMiddleDouble);
          }
        }

        var doubled = double;

        if (!double && middleDouble.length) {
          // Mimic \@ifnextchar
          var nextToken = context.future();

          if (nextToken.text === "|") {
            context.popToken();
            doubled = true;
          }
        }

        return {
          tokens: doubled ? middleDouble : middle,
          numArgs: 0
        };
      };

      context.macros.set("|", midMacro(false));

      if (middleDouble.length) {
        context.macros.set("\\|", midMacro(true));
      }

      var arg = context.consumeArg().tokens;
      var expanded = context.expandTokens([...right, ...arg, ...left // reversed
      ]);
      context.macros.endGroup();
      return {
        tokens: expanded.reverse(),
        numArgs: 0
      };
    };

    defineMacro("\\bra@ket", braketHelper(false));
    defineMacro("\\bra@set", braketHelper(true));
    defineMacro("\\Braket", "\\bra@ket{\\left\\langle}" + "{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
    defineMacro("\\Set", "\\bra@set{\\left\\{\\:}" + "{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
    defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}"); // has no support for special || or \|
    //////////////////////////////////////////////////////////////////////
    // actuarialangle.dtx

    defineMacro("\\angln", "{\\angl n}"); // Custom Khan Academy colors, should be moved to an optional package

    defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
    defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
    defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
    defineMacro("\\red", "\\textcolor{##df0030}{#1}");
    defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
    defineMacro("\\gray", "\\textcolor{gray}{#1}");
    defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
    defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
    defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
    defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
    defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
    defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
    defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
    defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
    defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
    defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
    defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
    defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
    defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
    defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
    defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
    defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
    defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
    defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
    defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
    defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
    defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
    defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
    defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
    defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
    defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
    defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
    defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
    defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
    defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
    defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
    defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
    defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
    defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
    defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
    defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
    defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
    defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
    defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
    defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
    defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
    defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
    defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
    defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
    defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
    defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
    defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
    defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
    defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
    defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
    defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");

    /**
     * This file contains the “gullet” where macros are expanded
     * until only non-macro tokens remain.
     */
    // List of commands that act like macros but aren't defined as a macro,
    // function, or symbol.  Used in `isDefined`.
    var implicitCommands = {
      "^": true,
      // Parser.js
      "_": true,
      // Parser.js
      "\\limits": true,
      // Parser.js
      "\\nolimits": true // Parser.js

    };
    class MacroExpander {
      constructor(input, settings, mode) {
        this.settings = void 0;
        this.expansionCount = void 0;
        this.lexer = void 0;
        this.macros = void 0;
        this.stack = void 0;
        this.mode = void 0;
        this.settings = settings;
        this.expansionCount = 0;
        this.feed(input); // Make new global namespace

        this.macros = new Namespace(macros, settings.macros);
        this.mode = mode;
        this.stack = []; // contains tokens in REVERSE order
      }
      /**
       * Feed a new input string to the same MacroExpander
       * (with existing macros etc.).
       */


      feed(input) {
        this.lexer = new Lexer(input, this.settings);
      }
      /**
       * Switches between "text" and "math" modes.
       */


      switchMode(newMode) {
        this.mode = newMode;
      }
      /**
       * Start a new group nesting within all namespaces.
       */


      beginGroup() {
        this.macros.beginGroup();
      }
      /**
       * End current group nesting within all namespaces.
       */


      endGroup() {
        this.macros.endGroup();
      }
      /**
       * Ends all currently nested groups (if any), restoring values before the
       * groups began.  Useful in case of an error in the middle of parsing.
       */


      endGroups() {
        this.macros.endGroups();
      }
      /**
       * Returns the topmost token on the stack, without expanding it.
       * Similar in behavior to TeX's `\futurelet`.
       */


      future() {
        if (this.stack.length === 0) {
          this.pushToken(this.lexer.lex());
        }

        return this.stack[this.stack.length - 1];
      }
      /**
       * Remove and return the next unexpanded token.
       */


      popToken() {
        this.future(); // ensure non-empty stack

        return this.stack.pop();
      }
      /**
       * Add a given token to the token stack.  In particular, this get be used
       * to put back a token returned from one of the other methods.
       */


      pushToken(token) {
        this.stack.push(token);
      }
      /**
       * Append an array of tokens to the token stack.
       */


      pushTokens(tokens) {
        this.stack.push(...tokens);
      }
      /**
       * Find an macro argument without expanding tokens and append the array of
       * tokens to the token stack. Uses Token as a container for the result.
       */


      scanArgument(isOptional) {
        var start;
        var end;
        var tokens;

        if (isOptional) {
          this.consumeSpaces(); // \@ifnextchar gobbles any space following it

          if (this.future().text !== "[") {
            return null;
          }

          start = this.popToken(); // don't include [ in tokens

          ({
            tokens,
            end
          } = this.consumeArg(["]"]));
        } else {
          ({
            tokens,
            start,
            end
          } = this.consumeArg());
        } // indicate the end of an argument


        this.pushToken(new Token("EOF", end.loc));
        this.pushTokens(tokens);
        return start.range(end, "");
      }
      /**
       * Consume all following space tokens, without expansion.
       */


      consumeSpaces() {
        for (;;) {
          var token = this.future();

          if (token.text === " ") {
            this.stack.pop();
          } else {
            break;
          }
        }
      }
      /**
       * Consume an argument from the token stream, and return the resulting array
       * of tokens and start/end token.
       */


      consumeArg(delims) {
        // The argument for a delimited parameter is the shortest (possibly
        // empty) sequence of tokens with properly nested {...} groups that is
        // followed ... by this particular list of non-parameter tokens.
        // The argument for an undelimited parameter is the next nonblank
        // token, unless that token is ‘{’, when the argument will be the
        // entire {...} group that follows.
        var tokens = [];
        var isDelimited = delims && delims.length > 0;

        if (!isDelimited) {
          // Ignore spaces between arguments.  As the TeXbook says:
          // "After you have said ‘\def\row#1#2{...}’, you are allowed to
          //  put spaces between the arguments (e.g., ‘\row x n’), because
          //  TeX doesn’t use single spaces as undelimited arguments."
          this.consumeSpaces();
        }

        var start = this.future();
        var tok;
        var depth = 0;
        var match = 0;

        do {
          tok = this.popToken();
          tokens.push(tok);

          if (tok.text === "{") {
            ++depth;
          } else if (tok.text === "}") {
            --depth;

            if (depth === -1) {
              throw new ParseError("Extra }", tok);
            }
          } else if (tok.text === "EOF") {
            throw new ParseError("Unexpected end of input in a macro argument" + ", expected '" + (delims && isDelimited ? delims[match] : "}") + "'", tok);
          }

          if (delims && isDelimited) {
            if ((depth === 0 || depth === 1 && delims[match] === "{") && tok.text === delims[match]) {
              ++match;

              if (match === delims.length) {
                // don't include delims in tokens
                tokens.splice(-match, match);
                break;
              }
            } else {
              match = 0;
            }
          }
        } while (depth !== 0 || isDelimited); // If the argument found ... has the form ‘{<nested tokens>}’,
        // ... the outermost braces enclosing the argument are removed


        if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
          tokens.pop();
          tokens.shift();
        }

        tokens.reverse(); // to fit in with stack order

        return {
          tokens,
          start,
          end: tok
        };
      }
      /**
       * Consume the specified number of (delimited) arguments from the token
       * stream and return the resulting array of arguments.
       */


      consumeArgs(numArgs, delimiters) {
        if (delimiters) {
          if (delimiters.length !== numArgs + 1) {
            throw new ParseError("The length of delimiters doesn't match the number of args!");
          }

          var delims = delimiters[0];

          for (var i = 0; i < delims.length; i++) {
            var tok = this.popToken();

            if (delims[i] !== tok.text) {
              throw new ParseError("Use of the macro doesn't match its definition", tok);
            }
          }
        }

        var args = [];

        for (var _i = 0; _i < numArgs; _i++) {
          args.push(this.consumeArg(delimiters && delimiters[_i + 1]).tokens);
        }

        return args;
      }
      /**
       * Increment `expansionCount` by the specified amount.
       * Throw an error if it exceeds `maxExpand`.
       */


      countExpansion(amount) {
        this.expansionCount += amount;

        if (this.expansionCount > this.settings.maxExpand) {
          throw new ParseError("Too many expansions: infinite loop or " + "need to increase maxExpand setting");
        }
      }
      /**
       * Expand the next token only once if possible.
       *
       * If the token is expanded, the resulting tokens will be pushed onto
       * the stack in reverse order, and the number of such tokens will be
       * returned.  This number might be zero or positive.
       *
       * If not, the return value is `false`, and the next token remains at the
       * top of the stack.
       *
       * In either case, the next token will be on the top of the stack,
       * or the stack will be empty (in case of empty expansion
       * and no other tokens).
       *
       * Used to implement `expandAfterFuture` and `expandNextToken`.
       *
       * If expandableOnly, only expandable tokens are expanded and
       * an undefined control sequence results in an error.
       */


      expandOnce(expandableOnly) {
        var topToken = this.popToken();
        var name = topToken.text;
        var expansion = !topToken.noexpand ? this._getExpansion(name) : null;

        if (expansion == null || expandableOnly && expansion.unexpandable) {
          if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) {
            throw new ParseError("Undefined control sequence: " + name);
          }

          this.pushToken(topToken);
          return false;
        }

        this.countExpansion(1);
        var tokens = expansion.tokens;
        var args = this.consumeArgs(expansion.numArgs, expansion.delimiters);

        if (expansion.numArgs) {
          // paste arguments in place of the placeholders
          tokens = tokens.slice(); // make a shallow copy

          for (var i = tokens.length - 1; i >= 0; --i) {
            var tok = tokens[i];

            if (tok.text === "#") {
              if (i === 0) {
                throw new ParseError("Incomplete placeholder at end of macro body", tok);
              }

              tok = tokens[--i]; // next token on stack

              if (tok.text === "#") {
                // ## → #
                tokens.splice(i + 1, 1); // drop first #
              } else if (/^[1-9]$/.test(tok.text)) {
                // replace the placeholder with the indicated argument
                tokens.splice(i, 2, ...args[+tok.text - 1]);
              } else {
                throw new ParseError("Not a valid argument number", tok);
              }
            }
          }
        } // Concatenate expansion onto top of stack.


        this.pushTokens(tokens);
        return tokens.length;
      }
      /**
       * Expand the next token only once (if possible), and return the resulting
       * top token on the stack (without removing anything from the stack).
       * Similar in behavior to TeX's `\expandafter\futurelet`.
       * Equivalent to expandOnce() followed by future().
       */


      expandAfterFuture() {
        this.expandOnce();
        return this.future();
      }
      /**
       * Recursively expand first token, then return first non-expandable token.
       */


      expandNextToken() {
        for (;;) {
          if (this.expandOnce() === false) {
            // fully expanded
            var token = this.stack.pop(); // the token after \noexpand is interpreted as if its meaning
            // were ‘\relax’

            if (token.treatAsRelax) {
              token.text = "\\relax";
            }

            return token;
          }
        } // Flow unable to figure out that this pathway is impossible.
        // https://github.com/facebook/flow/issues/4808


        throw new Error(); // eslint-disable-line no-unreachable
      }
      /**
       * Fully expand the given macro name and return the resulting list of
       * tokens, or return `undefined` if no such macro is defined.
       */


      expandMacro(name) {
        return this.macros.has(name) ? this.expandTokens([new Token(name)]) : undefined;
      }
      /**
       * Fully expand the given token stream and return the resulting list of
       * tokens.  Note that the input tokens are in reverse order, but the
       * output tokens are in forward order.
       */


      expandTokens(tokens) {
        var output = [];
        var oldStackLength = this.stack.length;
        this.pushTokens(tokens);

        while (this.stack.length > oldStackLength) {
          // Expand only expandable tokens
          if (this.expandOnce(true) === false) {
            // fully expanded
            var token = this.stack.pop();

            if (token.treatAsRelax) {
              // the expansion of \noexpand is the token itself
              token.noexpand = false;
              token.treatAsRelax = false;
            }

            output.push(token);
          }
        } // Count all of these tokens as additional expansions, to prevent
        // exponential blowup from linearly many \edef's.


        this.countExpansion(output.length);
        return output;
      }
      /**
       * Fully expand the given macro name and return the result as a string,
       * or return `undefined` if no such macro is defined.
       */


      expandMacroAsText(name) {
        var tokens = this.expandMacro(name);

        if (tokens) {
          return tokens.map(token => token.text).join("");
        } else {
          return tokens;
        }
      }
      /**
       * Returns the expanded macro as a reversed array of tokens and a macro
       * argument count.  Or returns `null` if no such macro.
       */


      _getExpansion(name) {
        var definition = this.macros.get(name);

        if (definition == null) {
          // mainly checking for undefined here
          return definition;
        } // If a single character has an associated catcode other than 13
        // (active character), then don't expand it.


        if (name.length === 1) {
          var catcode = this.lexer.catcodes[name];

          if (catcode != null && catcode !== 13) {
            return;
          }
        }

        var expansion = typeof definition === "function" ? definition(this) : definition;

        if (typeof expansion === "string") {
          var numArgs = 0;

          if (expansion.indexOf("#") !== -1) {
            var stripped = expansion.replace(/##/g, "");

            while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
              ++numArgs;
            }
          }

          var bodyLexer = new Lexer(expansion, this.settings);
          var tokens = [];
          var tok = bodyLexer.lex();

          while (tok.text !== "EOF") {
            tokens.push(tok);
            tok = bodyLexer.lex();
          }

          tokens.reverse(); // to fit in with stack using push and pop

          var expanded = {
            tokens,
            numArgs
          };
          return expanded;
        }

        return expansion;
      }
      /**
       * Determine whether a command is currently "defined" (has some
       * functionality), meaning that it's a macro (in the current group),
       * a function, a symbol, or one of the special commands listed in
       * `implicitCommands`.
       */


      isDefined(name) {
        return this.macros.has(name) || functions.hasOwnProperty(name) || symbols.math.hasOwnProperty(name) || symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
      }
      /**
       * Determine whether a command is expandable.
       */


      isExpandable(name) {
        var macro = this.macros.get(name);
        return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : functions.hasOwnProperty(name) && !functions[name].primitive;
      }

    }

    // Helpers for Parser.js handling of Unicode (sub|super)script characters.
    var unicodeSubRegEx = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
    var uSubsAndSups = Object.freeze({
      '₊': '+',
      '₋': '-',
      '₌': '=',
      '₍': '(',
      '₎': ')',
      '₀': '0',
      '₁': '1',
      '₂': '2',
      '₃': '3',
      '₄': '4',
      '₅': '5',
      '₆': '6',
      '₇': '7',
      '₈': '8',
      '₉': '9',
      '\u2090': 'a',
      '\u2091': 'e',
      '\u2095': 'h',
      '\u1D62': 'i',
      '\u2C7C': 'j',
      '\u2096': 'k',
      '\u2097': 'l',
      '\u2098': 'm',
      '\u2099': 'n',
      '\u2092': 'o',
      '\u209A': 'p',
      '\u1D63': 'r',
      '\u209B': 's',
      '\u209C': 't',
      '\u1D64': 'u',
      '\u1D65': 'v',
      '\u2093': 'x',
      '\u1D66': 'β',
      '\u1D67': 'γ',
      '\u1D68': 'ρ',
      '\u1D69': '\u03d5',
      '\u1D6A': 'χ',
      '⁺': '+',
      '⁻': '-',
      '⁼': '=',
      '⁽': '(',
      '⁾': ')',
      '⁰': '0',
      '¹': '1',
      '²': '2',
      '³': '3',
      '⁴': '4',
      '⁵': '5',
      '⁶': '6',
      '⁷': '7',
      '⁸': '8',
      '⁹': '9',
      '\u1D2C': 'A',
      '\u1D2E': 'B',
      '\u1D30': 'D',
      '\u1D31': 'E',
      '\u1D33': 'G',
      '\u1D34': 'H',
      '\u1D35': 'I',
      '\u1D36': 'J',
      '\u1D37': 'K',
      '\u1D38': 'L',
      '\u1D39': 'M',
      '\u1D3A': 'N',
      '\u1D3C': 'O',
      '\u1D3E': 'P',
      '\u1D3F': 'R',
      '\u1D40': 'T',
      '\u1D41': 'U',
      '\u2C7D': 'V',
      '\u1D42': 'W',
      '\u1D43': 'a',
      '\u1D47': 'b',
      '\u1D9C': 'c',
      '\u1D48': 'd',
      '\u1D49': 'e',
      '\u1DA0': 'f',
      '\u1D4D': 'g',
      '\u02B0': 'h',
      '\u2071': 'i',
      '\u02B2': 'j',
      '\u1D4F': 'k',
      '\u02E1': 'l',
      '\u1D50': 'm',
      '\u207F': 'n',
      '\u1D52': 'o',
      '\u1D56': 'p',
      '\u02B3': 'r',
      '\u02E2': 's',
      '\u1D57': 't',
      '\u1D58': 'u',
      '\u1D5B': 'v',
      '\u02B7': 'w',
      '\u02E3': 'x',
      '\u02B8': 'y',
      '\u1DBB': 'z',
      '\u1D5D': 'β',
      '\u1D5E': 'γ',
      '\u1D5F': 'δ',
      '\u1D60': '\u03d5',
      '\u1D61': 'χ',
      '\u1DBF': 'θ'
    });

    /* eslint no-constant-condition:0 */

    var unicodeAccents = {
      "́": {
        "text": "\\'",
        "math": "\\acute"
      },
      "̀": {
        "text": "\\`",
        "math": "\\grave"
      },
      "̈": {
        "text": "\\\"",
        "math": "\\ddot"
      },
      "̃": {
        "text": "\\~",
        "math": "\\tilde"
      },
      "̄": {
        "text": "\\=",
        "math": "\\bar"
      },
      "̆": {
        "text": "\\u",
        "math": "\\breve"
      },
      "̌": {
        "text": "\\v",
        "math": "\\check"
      },
      "̂": {
        "text": "\\^",
        "math": "\\hat"
      },
      "̇": {
        "text": "\\.",
        "math": "\\dot"
      },
      "̊": {
        "text": "\\r",
        "math": "\\mathring"
      },
      "̋": {
        "text": "\\H"
      },
      "̧": {
        "text": "\\c"
      }
    };
    var unicodeSymbols = {
      "á": "á",
      "à": "à",
      "ä": "ä",
      "ǟ": "ǟ",
      "ã": "ã",
      "ā": "ā",
      "ă": "ă",
      "ắ": "ắ",
      "ằ": "ằ",
      "ẵ": "ẵ",
      "ǎ": "ǎ",
      "â": "â",
      "ấ": "ấ",
      "ầ": "ầ",
      "ẫ": "ẫ",
      "ȧ": "ȧ",
      "ǡ": "ǡ",
      "å": "å",
      "ǻ": "ǻ",
      "ḃ": "ḃ",
      "ć": "ć",
      "ḉ": "ḉ",
      "č": "č",
      "ĉ": "ĉ",
      "ċ": "ċ",
      "ç": "ç",
      "ď": "ď",
      "ḋ": "ḋ",
      "ḑ": "ḑ",
      "é": "é",
      "è": "è",
      "ë": "ë",
      "ẽ": "ẽ",
      "ē": "ē",
      "ḗ": "ḗ",
      "ḕ": "ḕ",
      "ĕ": "ĕ",
      "ḝ": "ḝ",
      "ě": "ě",
      "ê": "ê",
      "ế": "ế",
      "ề": "ề",
      "ễ": "ễ",
      "ė": "ė",
      "ȩ": "ȩ",
      "ḟ": "ḟ",
      "ǵ": "ǵ",
      "ḡ": "ḡ",
      "ğ": "ğ",
      "ǧ": "ǧ",
      "ĝ": "ĝ",
      "ġ": "ġ",
      "ģ": "ģ",
      "ḧ": "ḧ",
      "ȟ": "ȟ",
      "ĥ": "ĥ",
      "ḣ": "ḣ",
      "ḩ": "ḩ",
      "í": "í",
      "ì": "ì",
      "ï": "ï",
      "ḯ": "ḯ",
      "ĩ": "ĩ",
      "ī": "ī",
      "ĭ": "ĭ",
      "ǐ": "ǐ",
      "î": "î",
      "ǰ": "ǰ",
      "ĵ": "ĵ",
      "ḱ": "ḱ",
      "ǩ": "ǩ",
      "ķ": "ķ",
      "ĺ": "ĺ",
      "ľ": "ľ",
      "ļ": "ļ",
      "ḿ": "ḿ",
      "ṁ": "ṁ",
      "ń": "ń",
      "ǹ": "ǹ",
      "ñ": "ñ",
      "ň": "ň",
      "ṅ": "ṅ",
      "ņ": "ņ",
      "ó": "ó",
      "ò": "ò",
      "ö": "ö",
      "ȫ": "ȫ",
      "õ": "õ",
      "ṍ": "ṍ",
      "ṏ": "ṏ",
      "ȭ": "ȭ",
      "ō": "ō",
      "ṓ": "ṓ",
      "ṑ": "ṑ",
      "ŏ": "ŏ",
      "ǒ": "ǒ",
      "ô": "ô",
      "ố": "ố",
      "ồ": "ồ",
      "ỗ": "ỗ",
      "ȯ": "ȯ",
      "ȱ": "ȱ",
      "ő": "ő",
      "ṕ": "ṕ",
      "ṗ": "ṗ",
      "ŕ": "ŕ",
      "ř": "ř",
      "ṙ": "ṙ",
      "ŗ": "ŗ",
      "ś": "ś",
      "ṥ": "ṥ",
      "š": "š",
      "ṧ": "ṧ",
      "ŝ": "ŝ",
      "ṡ": "ṡ",
      "ş": "ş",
      "ẗ": "ẗ",
      "ť": "ť",
      "ṫ": "ṫ",
      "ţ": "ţ",
      "ú": "ú",
      "ù": "ù",
      "ü": "ü",
      "ǘ": "ǘ",
      "ǜ": "ǜ",
      "ǖ": "ǖ",
      "ǚ": "ǚ",
      "ũ": "ũ",
      "ṹ": "ṹ",
      "ū": "ū",
      "ṻ": "ṻ",
      "ŭ": "ŭ",
      "ǔ": "ǔ",
      "û": "û",
      "ů": "ů",
      "ű": "ű",
      "ṽ": "ṽ",
      "ẃ": "ẃ",
      "ẁ": "ẁ",
      "ẅ": "ẅ",
      "ŵ": "ŵ",
      "ẇ": "ẇ",
      "ẘ": "ẘ",
      "ẍ": "ẍ",
      "ẋ": "ẋ",
      "ý": "ý",
      "ỳ": "ỳ",
      "ÿ": "ÿ",
      "ỹ": "ỹ",
      "ȳ": "ȳ",
      "ŷ": "ŷ",
      "ẏ": "ẏ",
      "ẙ": "ẙ",
      "ź": "ź",
      "ž": "ž",
      "ẑ": "ẑ",
      "ż": "ż",
      "Á": "Á",
      "À": "À",
      "Ä": "Ä",
      "Ǟ": "Ǟ",
      "Ã": "Ã",
      "Ā": "Ā",
      "Ă": "Ă",
      "Ắ": "Ắ",
      "Ằ": "Ằ",
      "Ẵ": "Ẵ",
      "Ǎ": "Ǎ",
      "Â": "Â",
      "Ấ": "Ấ",
      "Ầ": "Ầ",
      "Ẫ": "Ẫ",
      "Ȧ": "Ȧ",
      "Ǡ": "Ǡ",
      "Å": "Å",
      "Ǻ": "Ǻ",
      "Ḃ": "Ḃ",
      "Ć": "Ć",
      "Ḉ": "Ḉ",
      "Č": "Č",
      "Ĉ": "Ĉ",
      "Ċ": "Ċ",
      "Ç": "Ç",
      "Ď": "Ď",
      "Ḋ": "Ḋ",
      "Ḑ": "Ḑ",
      "É": "É",
      "È": "È",
      "Ë": "Ë",
      "Ẽ": "Ẽ",
      "Ē": "Ē",
      "Ḗ": "Ḗ",
      "Ḕ": "Ḕ",
      "Ĕ": "Ĕ",
      "Ḝ": "Ḝ",
      "Ě": "Ě",
      "Ê": "Ê",
      "Ế": "Ế",
      "Ề": "Ề",
      "Ễ": "Ễ",
      "Ė": "Ė",
      "Ȩ": "Ȩ",
      "Ḟ": "Ḟ",
      "Ǵ": "Ǵ",
      "Ḡ": "Ḡ",
      "Ğ": "Ğ",
      "Ǧ": "Ǧ",
      "Ĝ": "Ĝ",
      "Ġ": "Ġ",
      "Ģ": "Ģ",
      "Ḧ": "Ḧ",
      "Ȟ": "Ȟ",
      "Ĥ": "Ĥ",
      "Ḣ": "Ḣ",
      "Ḩ": "Ḩ",
      "Í": "Í",
      "Ì": "Ì",
      "Ï": "Ï",
      "Ḯ": "Ḯ",
      "Ĩ": "Ĩ",
      "Ī": "Ī",
      "Ĭ": "Ĭ",
      "Ǐ": "Ǐ",
      "Î": "Î",
      "İ": "İ",
      "Ĵ": "Ĵ",
      "Ḱ": "Ḱ",
      "Ǩ": "Ǩ",
      "Ķ": "Ķ",
      "Ĺ": "Ĺ",
      "Ľ": "Ľ",
      "Ļ": "Ļ",
      "Ḿ": "Ḿ",
      "Ṁ": "Ṁ",
      "Ń": "Ń",
      "Ǹ": "Ǹ",
      "Ñ": "Ñ",
      "Ň": "Ň",
      "Ṅ": "Ṅ",
      "Ņ": "Ņ",
      "Ó": "Ó",
      "Ò": "Ò",
      "Ö": "Ö",
      "Ȫ": "Ȫ",
      "Õ": "Õ",
      "Ṍ": "Ṍ",
      "Ṏ": "Ṏ",
      "Ȭ": "Ȭ",
      "Ō": "Ō",
      "Ṓ": "Ṓ",
      "Ṑ": "Ṑ",
      "Ŏ": "Ŏ",
      "Ǒ": "Ǒ",
      "Ô": "Ô",
      "Ố": "Ố",
      "Ồ": "Ồ",
      "Ỗ": "Ỗ",
      "Ȯ": "Ȯ",
      "Ȱ": "Ȱ",
      "Ő": "Ő",
      "Ṕ": "Ṕ",
      "Ṗ": "Ṗ",
      "Ŕ": "Ŕ",
      "Ř": "Ř",
      "Ṙ": "Ṙ",
      "Ŗ": "Ŗ",
      "Ś": "Ś",
      "Ṥ": "Ṥ",
      "Š": "Š",
      "Ṧ": "Ṧ",
      "Ŝ": "Ŝ",
      "Ṡ": "Ṡ",
      "Ş": "Ş",
      "Ť": "Ť",
      "Ṫ": "Ṫ",
      "Ţ": "Ţ",
      "Ú": "Ú",
      "Ù": "Ù",
      "Ü": "Ü",
      "Ǘ": "Ǘ",
      "Ǜ": "Ǜ",
      "Ǖ": "Ǖ",
      "Ǚ": "Ǚ",
      "Ũ": "Ũ",
      "Ṹ": "Ṹ",
      "Ū": "Ū",
      "Ṻ": "Ṻ",
      "Ŭ": "Ŭ",
      "Ǔ": "Ǔ",
      "Û": "Û",
      "Ů": "Ů",
      "Ű": "Ű",
      "Ṽ": "Ṽ",
      "Ẃ": "Ẃ",
      "Ẁ": "Ẁ",
      "Ẅ": "Ẅ",
      "Ŵ": "Ŵ",
      "Ẇ": "Ẇ",
      "Ẍ": "Ẍ",
      "Ẋ": "Ẋ",
      "Ý": "Ý",
      "Ỳ": "Ỳ",
      "Ÿ": "Ÿ",
      "Ỹ": "Ỹ",
      "Ȳ": "Ȳ",
      "Ŷ": "Ŷ",
      "Ẏ": "Ẏ",
      "Ź": "Ź",
      "Ž": "Ž",
      "Ẑ": "Ẑ",
      "Ż": "Ż",
      "ά": "ά",
      "ὰ": "ὰ",
      "ᾱ": "ᾱ",
      "ᾰ": "ᾰ",
      "έ": "έ",
      "ὲ": "ὲ",
      "ή": "ή",
      "ὴ": "ὴ",
      "ί": "ί",
      "ὶ": "ὶ",
      "ϊ": "ϊ",
      "ΐ": "ΐ",
      "ῒ": "ῒ",
      "ῑ": "ῑ",
      "ῐ": "ῐ",
      "ό": "ό",
      "ὸ": "ὸ",
      "ύ": "ύ",
      "ὺ": "ὺ",
      "ϋ": "ϋ",
      "ΰ": "ΰ",
      "ῢ": "ῢ",
      "ῡ": "ῡ",
      "ῠ": "ῠ",
      "ώ": "ώ",
      "ὼ": "ὼ",
      "Ύ": "Ύ",
      "Ὺ": "Ὺ",
      "Ϋ": "Ϋ",
      "Ῡ": "Ῡ",
      "Ῠ": "Ῠ",
      "Ώ": "Ώ",
      "Ὼ": "Ὼ"
    };

    /**
     * This file contains the parser used to parse out a TeX expression from the
     * input. Since TeX isn't context-free, standard parsers don't work particularly
     * well.
     *
     * The strategy of this parser is as such:
     *
     * The main functions (the `.parse...` ones) take a position in the current
     * parse string to parse tokens from. The lexer (found in Lexer.js, stored at
     * this.gullet.lexer) also supports pulling out tokens at arbitrary places. When
     * individual tokens are needed at a position, the lexer is called to pull out a
     * token, which is then used.
     *
     * The parser has a property called "mode" indicating the mode that
     * the parser is currently in. Currently it has to be one of "math" or
     * "text", which denotes whether the current environment is a math-y
     * one or a text-y one (e.g. inside \text). Currently, this serves to
     * limit the functions which can be used in text mode.
     *
     * The main functions then return an object which contains the useful data that
     * was parsed at its given point, and a new position at the end of the parsed
     * data. The main functions can call each other and continue the parsing by
     * using the returned position as a new starting point.
     *
     * There are also extra `.handle...` functions, which pull out some reused
     * functionality into self-contained functions.
     *
     * The functions return ParseNodes.
     */
    class Parser {
      constructor(input, settings) {
        this.mode = void 0;
        this.gullet = void 0;
        this.settings = void 0;
        this.leftrightDepth = void 0;
        this.nextToken = void 0;
        // Start in math mode
        this.mode = "math"; // Create a new macro expander (gullet) and (indirectly via that) also a
        // new lexer (mouth) for this parser (stomach, in the language of TeX)

        this.gullet = new MacroExpander(input, settings, this.mode); // Store the settings for use in parsing

        this.settings = settings; // Count leftright depth (for \middle errors)

        this.leftrightDepth = 0;
      }
      /**
       * Checks a result to make sure it has the right type, and throws an
       * appropriate error otherwise.
       */


      expect(text, consume) {
        if (consume === void 0) {
          consume = true;
        }

        if (this.fetch().text !== text) {
          throw new ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
        }

        if (consume) {
          this.consume();
        }
      }
      /**
       * Discards the current lookahead token, considering it consumed.
       */


      consume() {
        this.nextToken = null;
      }
      /**
       * Return the current lookahead token, or if there isn't one (at the
       * beginning, or if the previous lookahead token was consume()d),
       * fetch the next token as the new lookahead token and return it.
       */


      fetch() {
        if (this.nextToken == null) {
          this.nextToken = this.gullet.expandNextToken();
        }

        return this.nextToken;
      }
      /**
       * Switches between "text" and "math" modes.
       */


      switchMode(newMode) {
        this.mode = newMode;
        this.gullet.switchMode(newMode);
      }
      /**
       * Main parsing function, which parses an entire input.
       */


      parse() {
        if (!this.settings.globalGroup) {
          // Create a group namespace for the math expression.
          // (LaTeX creates a new group for every $...$, $$...$$, \[...\].)
          this.gullet.beginGroup();
        } // Use old \color behavior (same as LaTeX's \textcolor) if requested.
        // We do this within the group for the math expression, so it doesn't
        // pollute settings.macros.


        if (this.settings.colorIsTextColor) {
          this.gullet.macros.set("\\color", "\\textcolor");
        }

        try {
          // Try to parse the input
          var parse = this.parseExpression(false); // If we succeeded, make sure there's an EOF at the end

          this.expect("EOF"); // End the group namespace for the expression

          if (!this.settings.globalGroup) {
            this.gullet.endGroup();
          }

          return parse; // Close any leftover groups in case of a parse error.
        } finally {
          this.gullet.endGroups();
        }
      }
      /**
       * Fully parse a separate sequence of tokens as a separate job.
       * Tokens should be specified in reverse order, as in a MacroDefinition.
       */


      subparse(tokens) {
        // Save the next token from the current job.
        var oldToken = this.nextToken;
        this.consume(); // Run the new job, terminating it with an excess '}'

        this.gullet.pushToken(new Token("}"));
        this.gullet.pushTokens(tokens);
        var parse = this.parseExpression(false);
        this.expect("}"); // Restore the next token from the current job.

        this.nextToken = oldToken;
        return parse;
      }

      /**
       * Parses an "expression", which is a list of atoms.
       *
       * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
       *                 happens when functions have higher precedence han infix
       *                 nodes in implicit parses.
       *
       * `breakOnTokenText`: The text of the token that the expression should end
       *                     with, or `null` if something else should end the
       *                     expression.
       */
      parseExpression(breakOnInfix, breakOnTokenText) {
        var body = []; // Keep adding atoms to the body until we can't parse any more atoms (either
        // we reached the end, a }, or a \right)

        while (true) {
          // Ignore spaces in math mode
          if (this.mode === "math") {
            this.consumeSpaces();
          }

          var lex = this.fetch();

          if (Parser.endOfExpression.indexOf(lex.text) !== -1) {
            break;
          }

          if (breakOnTokenText && lex.text === breakOnTokenText) {
            break;
          }

          if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) {
            break;
          }

          var atom = this.parseAtom(breakOnTokenText);

          if (!atom) {
            break;
          } else if (atom.type === "internal") {
            continue;
          }

          body.push(atom);
        }

        if (this.mode === "text") {
          this.formLigatures(body);
        }

        return this.handleInfixNodes(body);
      }
      /**
       * Rewrites infix operators such as \over with corresponding commands such
       * as \frac.
       *
       * There can only be one infix operator per group.  If there's more than one
       * then the expression is ambiguous.  This can be resolved by adding {}.
       */


      handleInfixNodes(body) {
        var overIndex = -1;
        var funcName;

        for (var i = 0; i < body.length; i++) {
          if (body[i].type === "infix") {
            if (overIndex !== -1) {
              throw new ParseError("only one infix operator per group", body[i].token);
            }

            overIndex = i;
            funcName = body[i].replaceWith;
          }
        }

        if (overIndex !== -1 && funcName) {
          var numerNode;
          var denomNode;
          var numerBody = body.slice(0, overIndex);
          var denomBody = body.slice(overIndex + 1);

          if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
            numerNode = numerBody[0];
          } else {
            numerNode = {
              type: "ordgroup",
              mode: this.mode,
              body: numerBody
            };
          }

          if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
            denomNode = denomBody[0];
          } else {
            denomNode = {
              type: "ordgroup",
              mode: this.mode,
              body: denomBody
            };
          }

          var node;

          if (funcName === "\\\\abovefrac") {
            node = this.callFunction(funcName, [numerNode, body[overIndex], denomNode], []);
          } else {
            node = this.callFunction(funcName, [numerNode, denomNode], []);
          }

          return [node];
        } else {
          return body;
        }
      }
      /**
       * Handle a subscript or superscript with nice errors.
       */


      handleSupSubscript(name // For error reporting.
      ) {
        var symbolToken = this.fetch();
        var symbol = symbolToken.text;
        this.consume();
        this.consumeSpaces(); // ignore spaces before sup/subscript argument

        var group = this.parseGroup(name);

        if (!group) {
          throw new ParseError("Expected group after '" + symbol + "'", symbolToken);
        }

        return group;
      }
      /**
       * Converts the textual input of an unsupported command into a text node
       * contained within a color node whose color is determined by errorColor
       */


      formatUnsupportedCmd(text) {
        var textordArray = [];

        for (var i = 0; i < text.length; i++) {
          textordArray.push({
            type: "textord",
            mode: "text",
            text: text[i]
          });
        }

        var textNode = {
          type: "text",
          mode: this.mode,
          body: textordArray
        };
        var colorNode = {
          type: "color",
          mode: this.mode,
          color: this.settings.errorColor,
          body: [textNode]
        };
        return colorNode;
      }
      /**
       * Parses a group with optional super/subscripts.
       */


      parseAtom(breakOnTokenText) {
        // The body of an atom is an implicit group, so that things like
        // \left(x\right)^2 work correctly.
        var base = this.parseGroup("atom", breakOnTokenText); // In text mode, we don't have superscripts or subscripts

        if (this.mode === "text") {
          return base;
        } // Note that base may be empty (i.e. null) at this point.


        var superscript;
        var subscript;

        while (true) {
          // Guaranteed in math mode, so eat any spaces first.
          this.consumeSpaces(); // Lex the first token

          var lex = this.fetch();

          if (lex.text === "\\limits" || lex.text === "\\nolimits") {
            // We got a limit control
            if (base && base.type === "op") {
              var limits = lex.text === "\\limits";
              base.limits = limits;
              base.alwaysHandleSupSub = true;
            } else if (base && base.type === "operatorname") {
              if (base.alwaysHandleSupSub) {
                base.limits = lex.text === "\\limits";
              }
            } else {
              throw new ParseError("Limit controls must follow a math operator", lex);
            }

            this.consume();
          } else if (lex.text === "^") {
            // We got a superscript start
            if (superscript) {
              throw new ParseError("Double superscript", lex);
            }

            superscript = this.handleSupSubscript("superscript");
          } else if (lex.text === "_") {
            // We got a subscript start
            if (subscript) {
              throw new ParseError("Double subscript", lex);
            }

            subscript = this.handleSupSubscript("subscript");
          } else if (lex.text === "'") {
            // We got a prime
            if (superscript) {
              throw new ParseError("Double superscript", lex);
            }

            var prime = {
              type: "textord",
              mode: this.mode,
              text: "\\prime"
            }; // Many primes can be grouped together, so we handle this here

            var primes = [prime];
            this.consume(); // Keep lexing tokens until we get something that's not a prime

            while (this.fetch().text === "'") {
              // For each one, add another prime to the list
              primes.push(prime);
              this.consume();
            } // If there's a superscript following the primes, combine that
            // superscript in with the primes.


            if (this.fetch().text === "^") {
              primes.push(this.handleSupSubscript("superscript"));
            } // Put everything into an ordgroup as the superscript


            superscript = {
              type: "ordgroup",
              mode: this.mode,
              body: primes
            };
          } else if (uSubsAndSups[lex.text]) {
            // A Unicode subscript or superscript character.
            // We treat these similarly to the unicode-math package.
            // So we render a string of Unicode (sub|super)scripts the
            // same as a (sub|super)script of regular characters.
            var isSub = unicodeSubRegEx.test(lex.text);
            var subsupTokens = [];
            subsupTokens.push(new Token(uSubsAndSups[lex.text]));
            this.consume(); // Continue fetching tokens to fill out the string.

            while (true) {
              var token = this.fetch().text;

              if (!uSubsAndSups[token]) {
                break;
              }

              if (unicodeSubRegEx.test(token) !== isSub) {
                break;
              }

              subsupTokens.unshift(new Token(uSubsAndSups[token]));
              this.consume();
            } // Now create a (sub|super)script.


            var body = this.subparse(subsupTokens);

            if (isSub) {
              subscript = {
                type: "ordgroup",
                mode: "math",
                body
              };
            } else {
              superscript = {
                type: "ordgroup",
                mode: "math",
                body
              };
            }
          } else {
            // If it wasn't ^, _, or ', stop parsing super/subscripts
            break;
          }
        } // Base must be set if superscript or subscript are set per logic above,
        // but need to check here for type check to pass.


        if (superscript || subscript) {
          // If we got either a superscript or subscript, create a supsub
          return {
            type: "supsub",
            mode: this.mode,
            base: base,
            sup: superscript,
            sub: subscript
          };
        } else {
          // Otherwise return the original body
          return base;
        }
      }
      /**
       * Parses an entire function, including its base and all of its arguments.
       */


      parseFunction(breakOnTokenText, name // For determining its context
      ) {
        var token = this.fetch();
        var func = token.text;
        var funcData = functions[func];

        if (!funcData) {
          return null;
        }

        this.consume(); // consume command token

        if (name && name !== "atom" && !funcData.allowedInArgument) {
          throw new ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
        } else if (this.mode === "text" && !funcData.allowedInText) {
          throw new ParseError("Can't use function '" + func + "' in text mode", token);
        } else if (this.mode === "math" && funcData.allowedInMath === false) {
          throw new ParseError("Can't use function '" + func + "' in math mode", token);
        }

        var {
          args,
          optArgs
        } = this.parseArguments(func, funcData);
        return this.callFunction(func, args, optArgs, token, breakOnTokenText);
      }
      /**
       * Call a function handler with a suitable context and arguments.
       */


      callFunction(name, args, optArgs, token, breakOnTokenText) {
        var context = {
          funcName: name,
          parser: this,
          token,
          breakOnTokenText
        };
        var func = functions[name];

        if (func && func.handler) {
          return func.handler(context, args, optArgs);
        } else {
          throw new ParseError("No function handler for " + name);
        }
      }
      /**
       * Parses the arguments of a function or environment
       */


      parseArguments(func, // Should look like "\name" or "\begin{name}".
      funcData) {
        var totalArgs = funcData.numArgs + funcData.numOptionalArgs;

        if (totalArgs === 0) {
          return {
            args: [],
            optArgs: []
          };
        }

        var args = [];
        var optArgs = [];

        for (var i = 0; i < totalArgs; i++) {
          var argType = funcData.argTypes && funcData.argTypes[i];
          var isOptional = i < funcData.numOptionalArgs;

          if (funcData.primitive && argType == null || // \sqrt expands into primitive if optional argument doesn't exist
          funcData.type === "sqrt" && i === 1 && optArgs[0] == null) {
            argType = "primitive";
          }

          var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);

          if (isOptional) {
            optArgs.push(arg);
          } else if (arg != null) {
            args.push(arg);
          } else {
            // should be unreachable
            throw new ParseError("Null argument, please report this as a bug");
          }
        }

        return {
          args,
          optArgs
        };
      }
      /**
       * Parses a group when the mode is changing.
       */


      parseGroupOfType(name, type, optional) {
        switch (type) {
          case "color":
            return this.parseColorGroup(optional);

          case "size":
            return this.parseSizeGroup(optional);

          case "url":
            return this.parseUrlGroup(optional);

          case "math":
          case "text":
            return this.parseArgumentGroup(optional, type);

          case "hbox":
            {
              // hbox argument type wraps the argument in the equivalent of
              // \hbox, which is like \text but switching to \textstyle size.
              var group = this.parseArgumentGroup(optional, "text");
              return group != null ? {
                type: "styling",
                mode: group.mode,
                body: [group],
                style: "text" // simulate \textstyle

              } : null;
            }

          case "raw":
            {
              var token = this.parseStringGroup("raw", optional);
              return token != null ? {
                type: "raw",
                mode: "text",
                string: token.text
              } : null;
            }

          case "primitive":
            {
              if (optional) {
                throw new ParseError("A primitive argument cannot be optional");
              }

              var _group = this.parseGroup(name);

              if (_group == null) {
                throw new ParseError("Expected group as " + name, this.fetch());
              }

              return _group;
            }

          case "original":
          case null:
          case undefined:
            return this.parseArgumentGroup(optional);

          default:
            throw new ParseError("Unknown group type as " + name, this.fetch());
        }
      }
      /**
       * Discard any space tokens, fetching the next non-space token.
       */


      consumeSpaces() {
        while (this.fetch().text === " ") {
          this.consume();
        }
      }
      /**
       * Parses a group, essentially returning the string formed by the
       * brace-enclosed tokens plus some position information.
       */


      parseStringGroup(modeName, // Used to describe the mode in error messages.
      optional) {
        var argToken = this.gullet.scanArgument(optional);

        if (argToken == null) {
          return null;
        }

        var str = "";
        var nextToken;

        while ((nextToken = this.fetch()).text !== "EOF") {
          str += nextToken.text;
          this.consume();
        }

        this.consume(); // consume the end of the argument

        argToken.text = str;
        return argToken;
      }
      /**
       * Parses a regex-delimited group: the largest sequence of tokens
       * whose concatenated strings match `regex`. Returns the string
       * formed by the tokens plus some position information.
       */


      parseRegexGroup(regex, modeName // Used to describe the mode in error messages.
      ) {
        var firstToken = this.fetch();
        var lastToken = firstToken;
        var str = "";
        var nextToken;

        while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
          lastToken = nextToken;
          str += lastToken.text;
          this.consume();
        }

        if (str === "") {
          throw new ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
        }

        return firstToken.range(lastToken, str);
      }
      /**
       * Parses a color description.
       */


      parseColorGroup(optional) {
        var res = this.parseStringGroup("color", optional);

        if (res == null) {
          return null;
        }

        var match = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);

        if (!match) {
          throw new ParseError("Invalid color: '" + res.text + "'", res);
        }

        var color = match[0];

        if (/^[0-9a-f]{6}$/i.test(color)) {
          // We allow a 6-digit HTML color spec without a leading "#".
          // This follows the xcolor package's HTML color model.
          // Predefined color names are all missed by this RegEx pattern.
          color = "#" + color;
        }

        return {
          type: "color-token",
          mode: this.mode,
          color
        };
      }
      /**
       * Parses a size specification, consisting of magnitude and unit.
       */


      parseSizeGroup(optional) {
        var res;
        var isBlank = false; // don't expand before parseStringGroup

        this.gullet.consumeSpaces();

        if (!optional && this.gullet.future().text !== "{") {
          res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
        } else {
          res = this.parseStringGroup("size", optional);
        }

        if (!res) {
          return null;
        }

        if (!optional && res.text.length === 0) {
          // Because we've tested for what is !optional, this block won't
          // affect \kern, \hspace, etc. It will capture the mandatory arguments
          // to \genfrac and \above.
          res.text = "0pt"; // Enable \above{}

          isBlank = true; // This is here specifically for \genfrac
        }

        var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);

        if (!match) {
          throw new ParseError("Invalid size: '" + res.text + "'", res);
        }

        var data = {
          number: +(match[1] + match[2]),
          // sign + magnitude, cast to number
          unit: match[3]
        };

        if (!validUnit(data)) {
          throw new ParseError("Invalid unit: '" + data.unit + "'", res);
        }

        return {
          type: "size",
          mode: this.mode,
          value: data,
          isBlank
        };
      }
      /**
       * Parses an URL, checking escaped letters and allowed protocols,
       * and setting the catcode of % as an active character (as in \hyperref).
       */


      parseUrlGroup(optional) {
        this.gullet.lexer.setCatcode("%", 13); // active character

        this.gullet.lexer.setCatcode("~", 12); // other character

        var res = this.parseStringGroup("url", optional);
        this.gullet.lexer.setCatcode("%", 14); // comment character

        this.gullet.lexer.setCatcode("~", 13); // active character

        if (res == null) {
          return null;
        } // hyperref package allows backslashes alone in href, but doesn't
        // generate valid links in such cases; we interpret this as
        // "undefined" behaviour, and keep them as-is. Some browser will
        // replace backslashes with forward slashes.


        var url = res.text.replace(/\\([#$%&~_^{}])/g, '$1');
        return {
          type: "url",
          mode: this.mode,
          url
        };
      }
      /**
       * Parses an argument with the mode specified.
       */


      parseArgumentGroup(optional, mode) {
        var argToken = this.gullet.scanArgument(optional);

        if (argToken == null) {
          return null;
        }

        var outerMode = this.mode;

        if (mode) {
          // Switch to specified mode
          this.switchMode(mode);
        }

        this.gullet.beginGroup();
        var expression = this.parseExpression(false, "EOF"); // TODO: find an alternative way to denote the end

        this.expect("EOF"); // expect the end of the argument

        this.gullet.endGroup();
        var result = {
          type: "ordgroup",
          mode: this.mode,
          loc: argToken.loc,
          body: expression
        };

        if (mode) {
          // Switch mode back
          this.switchMode(outerMode);
        }

        return result;
      }
      /**
       * Parses an ordinary group, which is either a single nucleus (like "x")
       * or an expression in braces (like "{x+y}") or an implicit group, a group
       * that starts at the current position, and ends right before a higher explicit
       * group ends, or at EOF.
       */


      parseGroup(name, // For error reporting.
      breakOnTokenText) {
        var firstToken = this.fetch();
        var text = firstToken.text;
        var result; // Try to parse an open brace or \begingroup

        if (text === "{" || text === "\\begingroup") {
          this.consume();
          var groupEnd = text === "{" ? "}" : "\\endgroup";
          this.gullet.beginGroup(); // If we get a brace, parse an expression

          var expression = this.parseExpression(false, groupEnd);
          var lastToken = this.fetch();
          this.expect(groupEnd); // Check that we got a matching closing brace

          this.gullet.endGroup();
          result = {
            type: "ordgroup",
            mode: this.mode,
            loc: SourceLocation.range(firstToken, lastToken),
            body: expression,
            // A group formed by \begingroup...\endgroup is a semi-simple group
            // which doesn't affect spacing in math mode, i.e., is transparent.
            // https://tex.stackexchange.com/questions/1930/when-should-one-
            // use-begingroup-instead-of-bgroup
            semisimple: text === "\\begingroup" || undefined
          };
        } else {
          // If there exists a function with this name, parse the function.
          // Otherwise, just return a nucleus
          result = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();

          if (result == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
            if (this.settings.throwOnError) {
              throw new ParseError("Undefined control sequence: " + text, firstToken);
            }

            result = this.formatUnsupportedCmd(text);
            this.consume();
          }
        }

        return result;
      }
      /**
       * Form ligature-like combinations of characters for text mode.
       * This includes inputs like "--", "---", "``" and "''".
       * The result will simply replace multiple textord nodes with a single
       * character in each value by a single textord node having multiple
       * characters in its value.  The representation is still ASCII source.
       * The group will be modified in place.
       */


      formLigatures(group) {
        var n = group.length - 1;

        for (var i = 0; i < n; ++i) {
          var a = group[i]; // $FlowFixMe: Not every node type has a `text` property.

          var v = a.text;

          if (v === "-" && group[i + 1].text === "-") {
            if (i + 1 < n && group[i + 2].text === "-") {
              group.splice(i, 3, {
                type: "textord",
                mode: "text",
                loc: SourceLocation.range(a, group[i + 2]),
                text: "---"
              });
              n -= 2;
            } else {
              group.splice(i, 2, {
                type: "textord",
                mode: "text",
                loc: SourceLocation.range(a, group[i + 1]),
                text: "--"
              });
              n -= 1;
            }
          }

          if ((v === "'" || v === "`") && group[i + 1].text === v) {
            group.splice(i, 2, {
              type: "textord",
              mode: "text",
              loc: SourceLocation.range(a, group[i + 1]),
              text: v + v
            });
            n -= 1;
          }
        }
      }
      /**
       * Parse a single symbol out of the string. Here, we handle single character
       * symbols and special functions like \verb.
       */


      parseSymbol() {
        var nucleus = this.fetch();
        var text = nucleus.text;

        if (/^\\verb[^a-zA-Z]/.test(text)) {
          this.consume();
          var arg = text.slice(5);
          var star = arg.charAt(0) === "*";

          if (star) {
            arg = arg.slice(1);
          } // Lexer's tokenRegex is constructed to always have matching
          // first/last characters.


          if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) {
            throw new ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
          }

          arg = arg.slice(1, -1); // remove first and last char

          return {
            type: "verb",
            mode: "text",
            body: arg,
            star
          };
        } // At this point, we should have a symbol, possibly with accents.
        // First expand any accented base symbol according to unicodeSymbols.


        if (unicodeSymbols.hasOwnProperty(text[0]) && !symbols[this.mode][text[0]]) {
          // This behavior is not strict (XeTeX-compatible) in math mode.
          if (this.settings.strict && this.mode === "math") {
            this.settings.reportNonstrict("unicodeTextInMathMode", "Accented Unicode text character \"" + text[0] + "\" used in " + "math mode", nucleus);
          }

          text = unicodeSymbols[text[0]] + text.slice(1);
        } // Strip off any combining characters


        var match = combiningDiacriticalMarksEndRegex.exec(text);

        if (match) {
          text = text.substring(0, match.index);

          if (text === 'i') {
            text = '\u0131'; // dotless i, in math and text mode
          } else if (text === 'j') {
            text = '\u0237'; // dotless j, in math and text mode
          }
        } // Recognize base symbol


        var symbol;

        if (symbols[this.mode][text]) {
          if (this.settings.strict && this.mode === 'math' && extraLatin.indexOf(text) >= 0) {
            this.settings.reportNonstrict("unicodeTextInMathMode", "Latin-1/Unicode text character \"" + text[0] + "\" used in " + "math mode", nucleus);
          }

          var group = symbols[this.mode][text].group;
          var loc = SourceLocation.range(nucleus);
          var s;

          if (ATOMS.hasOwnProperty(group)) {
            // $FlowFixMe
            var family = group;
            s = {
              type: "atom",
              mode: this.mode,
              family,
              loc,
              text
            };
          } else {
            // $FlowFixMe
            s = {
              type: group,
              mode: this.mode,
              loc,
              text
            };
          } // $FlowFixMe


          symbol = s;
        } else if (text.charCodeAt(0) >= 0x80) {
          // no symbol for e.g. ^
          if (this.settings.strict) {
            if (!supportedCodepoint(text.charCodeAt(0))) {
              this.settings.reportNonstrict("unknownSymbol", "Unrecognized Unicode character \"" + text[0] + "\"" + (" (" + text.charCodeAt(0) + ")"), nucleus);
            } else if (this.mode === "math") {
              this.settings.reportNonstrict("unicodeTextInMathMode", "Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
            }
          } // All nonmathematical Unicode characters are rendered as if they
          // are in text mode (wrapped in \text) because that's what it
          // takes to render them in LaTeX.  Setting `mode: this.mode` is
          // another natural choice (the user requested math mode), but
          // this makes it more difficult for getCharacterMetrics() to
          // distinguish Unicode characters without metrics and those for
          // which we want to simulate the letter M.


          symbol = {
            type: "textord",
            mode: "text",
            loc: SourceLocation.range(nucleus),
            text
          };
        } else {
          return null; // EOF, ^, _, {, }, etc.
        }

        this.consume(); // Transform combining characters into accents

        if (match) {
          for (var i = 0; i < match[0].length; i++) {
            var accent = match[0][i];

            if (!unicodeAccents[accent]) {
              throw new ParseError("Unknown accent ' " + accent + "'", nucleus);
            }

            var command = unicodeAccents[accent][this.mode] || unicodeAccents[accent].text;

            if (!command) {
              throw new ParseError("Accent " + accent + " unsupported in " + this.mode + " mode", nucleus);
            }

            symbol = {
              type: "accent",
              mode: this.mode,
              loc: SourceLocation.range(nucleus),
              label: command,
              isStretchy: false,
              isShifty: true,
              // $FlowFixMe
              base: symbol
            };
          }
        } // $FlowFixMe


        return symbol;
      }

    }
    Parser.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];

    /**
     * Provides a single function for parsing an expression using a Parser
     * TODO(emily): Remove this
     */

    /**
     * Parses an expression using a Parser, then returns the parsed result.
     */
    var parseTree = function parseTree(toParse, settings) {
      if (!(typeof toParse === 'string' || toParse instanceof String)) {
        throw new TypeError('KaTeX can only parse string typed expression');
      }

      var parser = new Parser(toParse, settings); // Blank out any \df@tag to avoid spurious "Duplicate \tag" errors

      delete parser.gullet.macros.current["\\df@tag"];
      var tree = parser.parse(); // Prevent a color definition from persisting between calls to katex.render().

      delete parser.gullet.macros.current["\\current@color"];
      delete parser.gullet.macros.current["\\color"]; // If the input used \tag, it will set the \df@tag macro to the tag.
      // In this case, we separately parse the tag and wrap the tree.

      if (parser.gullet.macros.get("\\df@tag")) {
        if (!settings.displayMode) {
          throw new ParseError("\\tag works only in display equations");
        }

        tree = [{
          type: "tag",
          mode: "text",
          body: tree,
          tag: parser.subparse([new Token("\\df@tag")])
        }];
      }

      return tree;
    };

    /* eslint no-console:0 */

    /**
     * Parse and build an expression, and place that expression in the DOM node
     * given.
     */
    var render = function render(expression, baseNode, options) {
      baseNode.textContent = "";
      var node = renderToDomTree(expression, options).toNode();
      baseNode.appendChild(node);
    }; // KaTeX's styles don't work properly in quirks mode. Print out an error, and
    // disable rendering.


    if (typeof document !== "undefined") {
      if (document.compatMode !== "CSS1Compat") {
        typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your " + "website has a suitable doctype.");

        render = function render() {
          throw new ParseError("KaTeX doesn't work in quirks mode.");
        };
      }
    }
    /**
     * Parse and build an expression, and return the markup for that.
     */


    var renderToString = function renderToString(expression, options) {
      var markup = renderToDomTree(expression, options).toMarkup();
      return markup;
    };
    /**
     * Parse an expression and return the parse tree.
     */


    var generateParseTree = function generateParseTree(expression, options) {
      var settings = new Settings(options);
      return parseTree(expression, settings);
    };
    /**
     * If the given error is a KaTeX ParseError and options.throwOnError is false,
     * renders the invalid LaTeX as a span with hover title giving the KaTeX
     * error message.  Otherwise, simply throws the error.
     */


    var renderError = function renderError(error, expression, options) {
      if (options.throwOnError || !(error instanceof ParseError)) {
        throw error;
      }

      var node = buildCommon.makeSpan(["katex-error"], [new SymbolNode(expression)]);
      node.setAttribute("title", error.toString());
      node.setAttribute("style", "color:" + options.errorColor);
      return node;
    };
    /**
     * Generates and returns the katex build tree. This is used for advanced
     * use cases (like rendering to custom output).
     */


    var renderToDomTree = function renderToDomTree(expression, options) {
      var settings = new Settings(options);

      try {
        var tree = parseTree(expression, settings);
        return buildTree(tree, expression, settings);
      } catch (error) {
        return renderError(error, expression, settings);
      }
    };
    /**
     * Generates and returns the katex build tree, with just HTML (no MathML).
     * This is used for advanced use cases (like rendering to custom output).
     */


    var renderToHTMLTree = function renderToHTMLTree(expression, options) {
      var settings = new Settings(options);

      try {
        var tree = parseTree(expression, settings);
        return buildHTMLTree(tree, expression, settings);
      } catch (error) {
        return renderError(error, expression, settings);
      }
    };

    var katex = {
      /**
       * Current KaTeX version
       */
      version: "0.16.10",

      /**
       * Renders the given LaTeX into an HTML+MathML combination, and adds
       * it as a child to the specified DOM node.
       */
      render,

      /**
       * Renders the given LaTeX into an HTML+MathML combination string,
       * for sending to the client.
       */
      renderToString,

      /**
       * KaTeX error, usually during parsing.
       */
      ParseError,

      /**
       * The shema of Settings
       */
      SETTINGS_SCHEMA,

      /**
       * Parses the given LaTeX into KaTeX's internal parse tree structure,
       * without rendering to HTML or MathML.
       *
       * NOTE: This method is not currently recommended for public use.
       * The internal tree representation is unstable and is very likely
       * to change. Use at your own risk.
       */
      __parse: generateParseTree,

      /**
       * Renders the given LaTeX into an HTML+MathML internal DOM tree
       * representation, without flattening that representation to a string.
       *
       * NOTE: This method is not currently recommended for public use.
       * The internal tree representation is unstable and is very likely
       * to change. Use at your own risk.
       */
      __renderToDomTree: renderToDomTree,

      /**
       * Renders the given LaTeX into an HTML internal DOM tree representation,
       * without MathML and without flattening that representation to a string.
       *
       * NOTE: This method is not currently recommended for public use.
       * The internal tree representation is unstable and is very likely
       * to change. Use at your own risk.
       */
      __renderToHTMLTree: renderToHTMLTree,

      /**
       * extends internal font metrics object with a new object
       * each key in the new object represents a font name
      */
      __setFontMetrics: setFontMetrics,

      /**
       * adds a new symbol to builtin symbols table
       */
      __defineSymbol: defineSymbol,

      /**
       * adds a new function to builtin function list,
       * which directly produce parse tree elements
       * and have their own html/mathml builders
       */
      __defineFunction: defineFunction,

      /**
       * adds a new macro to builtin macro list
       */
      __defineMacro: defineMacro,

      /**
       * Expose the dom tree node types, which can be useful for type checking nodes.
       *
       * NOTE: This method is not currently recommended for public use.
       * The internal tree representation is unstable and is very likely
       * to change. Use at your own risk.
       */
      __domTree: {
        Span,
        Anchor,
        SymbolNode,
        SvgNode,
        PathNode,
        LineNode
      }
    };

    function katexify(math, displayMode = false) {
      const options = {
        displayMode: displayMode,
        throwOnError: false,
      };
      return katex.renderToString(math, options);
    }

    /* src\components\VariablesScrolly.svelte generated by Svelte v3.59.2 */
    const file$4 = "src\\components\\VariablesScrolly.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (67:16) {#each steps as step, i}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let raw0_value = /*step*/ ctx[6].title + "";
    	let t;
    	let p;
    	let raw1_value = /*step*/ ctx[6].content + "";

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t = space();
    			p = element("p");
    			attr_dev(h1, "class", "step-title");
    			add_location(h1, file$4, 69, 28, 3570);
    			add_location(p, file$4, 70, 28, 3646);
    			attr_dev(div0, "class", "step-content svelte-1qgnk4w");
    			add_location(div0, file$4, 68, 24, 3514);
    			attr_dev(div1, "class", "step svelte-1qgnk4w");
    			toggle_class(div1, "active", /*value*/ ctx[0] === /*i*/ ctx[8]);
    			add_location(div1, file$4, 67, 20, 3443);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			h1.innerHTML = raw0_value;
    			append_dev(div0, t);
    			append_dev(div0, p);
    			p.innerHTML = raw1_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*steps*/ 2 && raw0_value !== (raw0_value = /*step*/ ctx[6].title + "")) h1.innerHTML = raw0_value;			if (dirty & /*steps*/ 2 && raw1_value !== (raw1_value = /*step*/ ctx[6].content + "")) p.innerHTML = raw1_value;
    			if (dirty & /*value*/ 1) {
    				toggle_class(div1, "active", /*value*/ ctx[0] === /*i*/ ctx[8]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(67:16) {#each steps as step, i}",
    		ctx
    	});

    	return block;
    }

    // (66:12) <Scrolly bind:value>
    function create_default_slot(ctx) {
    	let t;
    	let div;
    	let each_value = /*steps*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div = element("div");
    			attr_dev(div, "class", "spacer svelte-1qgnk4w");
    			add_location(div, file$4, 74, 16, 3776);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*value, steps*/ 3) {
    				each_value = /*steps*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t.parentNode, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(66:12) <Scrolly bind:value>",
    		ctx
    	});

    	return block;
    }

    // (95:12) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let chartscrolly;
    	let current;

    	const chartscrolly_spread_levels = [
    		/*chartParams*/ ctx[4],
    		{
    			highlightRange: /*highlightRange*/ ctx[2]
    		},
    		{
    			highlightOpacity: /*highlightOpacity*/ ctx[3]
    		}
    	];

    	let chartscrolly_props = {};

    	for (let i = 0; i < chartscrolly_spread_levels.length; i += 1) {
    		chartscrolly_props = assign(chartscrolly_props, chartscrolly_spread_levels[i]);
    	}

    	chartscrolly = new ChartScrolly({
    			props: chartscrolly_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chartscrolly.$$.fragment);
    			attr_dev(div, "class", "chart svelte-1qgnk4w");
    			add_location(div, file$4, 95, 16, 4841);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chartscrolly, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chartscrolly_changes = (dirty & /*chartParams, highlightRange, highlightOpacity*/ 28)
    			? get_spread_update(chartscrolly_spread_levels, [
    					dirty & /*chartParams*/ 16 && get_spread_object(/*chartParams*/ ctx[4]),
    					dirty & /*highlightRange*/ 4 && {
    						highlightRange: /*highlightRange*/ ctx[2]
    					},
    					dirty & /*highlightOpacity*/ 8 && {
    						highlightOpacity: /*highlightOpacity*/ ctx[3]
    					}
    				])
    			: {};

    			chartscrolly.$set(chartscrolly_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chartscrolly.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chartscrolly.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chartscrolly);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(95:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (91:34) 
    function create_if_block_3$1(ctx) {
    	let div;
    	let chartscrolly;
    	let current;

    	const chartscrolly_spread_levels = [
    		/*chartParams*/ ctx[4],
    		{ m: 0.0001 },
    		{ n: 0.0085 },
    		{
    			highlightRange: /*highlightRange*/ ctx[2]
    		},
    		{
    			highlightOpacity: /*highlightOpacity*/ ctx[3]
    		}
    	];

    	let chartscrolly_props = {};

    	for (let i = 0; i < chartscrolly_spread_levels.length; i += 1) {
    		chartscrolly_props = assign(chartscrolly_props, chartscrolly_spread_levels[i]);
    	}

    	chartscrolly = new ChartScrolly({
    			props: chartscrolly_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chartscrolly.$$.fragment);
    			attr_dev(div, "class", "chart svelte-1qgnk4w");
    			add_location(div, file$4, 91, 16, 4614);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chartscrolly, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chartscrolly_changes = (dirty & /*chartParams, highlightRange, highlightOpacity*/ 28)
    			? get_spread_update(chartscrolly_spread_levels, [
    					dirty & /*chartParams*/ 16 && get_spread_object(/*chartParams*/ ctx[4]),
    					chartscrolly_spread_levels[1],
    					chartscrolly_spread_levels[2],
    					dirty & /*highlightRange*/ 4 && {
    						highlightRange: /*highlightRange*/ ctx[2]
    					},
    					dirty & /*highlightOpacity*/ 8 && {
    						highlightOpacity: /*highlightOpacity*/ ctx[3]
    					}
    				])
    			: {};

    			chartscrolly.$set(chartscrolly_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chartscrolly.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chartscrolly.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chartscrolly);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(91:34) ",
    		ctx
    	});

    	return block;
    }

    // (87:34) 
    function create_if_block_2$1(ctx) {
    	let div;
    	let chartscrolly;
    	let current;

    	const chartscrolly_spread_levels = [
    		/*chartParams*/ ctx[4],
    		{ R: 0.0005 },
    		{
    			highlightRange: /*highlightRange*/ ctx[2]
    		},
    		{
    			highlightOpacity: /*highlightOpacity*/ ctx[3]
    		}
    	];

    	let chartscrolly_props = {};

    	for (let i = 0; i < chartscrolly_spread_levels.length; i += 1) {
    		chartscrolly_props = assign(chartscrolly_props, chartscrolly_spread_levels[i]);
    	}

    	chartscrolly = new ChartScrolly({
    			props: chartscrolly_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chartscrolly.$$.fragment);
    			attr_dev(div, "class", "chart svelte-1qgnk4w");
    			add_location(div, file$4, 87, 16, 4383);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chartscrolly, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chartscrolly_changes = (dirty & /*chartParams, highlightRange, highlightOpacity*/ 28)
    			? get_spread_update(chartscrolly_spread_levels, [
    					dirty & /*chartParams*/ 16 && get_spread_object(/*chartParams*/ ctx[4]),
    					chartscrolly_spread_levels[1],
    					dirty & /*highlightRange*/ 4 && {
    						highlightRange: /*highlightRange*/ ctx[2]
    					},
    					dirty & /*highlightOpacity*/ 8 && {
    						highlightOpacity: /*highlightOpacity*/ ctx[3]
    					}
    				])
    			: {};

    			chartscrolly.$set(chartscrolly_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chartscrolly.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chartscrolly.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chartscrolly);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(87:34) ",
    		ctx
    	});

    	return block;
    }

    // (83:34) 
    function create_if_block_1$2(ctx) {
    	let div;
    	let chartscrolly;
    	let current;

    	const chartscrolly_spread_levels = [
    		/*chartParams*/ ctx[4],
    		{
    			highlightRange: /*highlightRange*/ ctx[2]
    		},
    		{
    			highlightOpacity: /*highlightOpacity*/ ctx[3]
    		}
    	];

    	let chartscrolly_props = {};

    	for (let i = 0; i < chartscrolly_spread_levels.length; i += 1) {
    		chartscrolly_props = assign(chartscrolly_props, chartscrolly_spread_levels[i]);
    	}

    	chartscrolly = new ChartScrolly({
    			props: chartscrolly_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chartscrolly.$$.fragment);
    			attr_dev(div, "class", "chart svelte-1qgnk4w");
    			add_location(div, file$4, 83, 16, 4164);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chartscrolly, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chartscrolly_changes = (dirty & /*chartParams, highlightRange, highlightOpacity*/ 28)
    			? get_spread_update(chartscrolly_spread_levels, [
    					dirty & /*chartParams*/ 16 && get_spread_object(/*chartParams*/ ctx[4]),
    					dirty & /*highlightRange*/ 4 && {
    						highlightRange: /*highlightRange*/ ctx[2]
    					},
    					dirty & /*highlightOpacity*/ 8 && {
    						highlightOpacity: /*highlightOpacity*/ ctx[3]
    					}
    				])
    			: {};

    			chartscrolly.$set(chartscrolly_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chartscrolly.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chartscrolly.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chartscrolly);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(83:34) ",
    		ctx
    	});

    	return block;
    }

    // (79:12) {#if value === 0}
    function create_if_block$2(ctx) {
    	let div;
    	let chartscrolly;
    	let current;

    	const chartscrolly_spread_levels = [
    		/*chartParams*/ ctx[4],
    		{ E0: 1.2 },
    		{ b: 0.1 },
    		{
    			highlightRange: /*highlightRange*/ ctx[2]
    		},
    		{
    			highlightOpacity: /*highlightOpacity*/ ctx[3]
    		}
    	];

    	let chartscrolly_props = {};

    	for (let i = 0; i < chartscrolly_spread_levels.length; i += 1) {
    		chartscrolly_props = assign(chartscrolly_props, chartscrolly_spread_levels[i]);
    	}

    	chartscrolly = new ChartScrolly({
    			props: chartscrolly_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chartscrolly.$$.fragment);
    			attr_dev(div, "class", "chart svelte-1qgnk4w");
    			add_location(div, file$4, 79, 16, 3927);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chartscrolly, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chartscrolly_changes = (dirty & /*chartParams, highlightRange, highlightOpacity*/ 28)
    			? get_spread_update(chartscrolly_spread_levels, [
    					dirty & /*chartParams*/ 16 && get_spread_object(/*chartParams*/ ctx[4]),
    					chartscrolly_spread_levels[1],
    					chartscrolly_spread_levels[2],
    					dirty & /*highlightRange*/ 4 && {
    						highlightRange: /*highlightRange*/ ctx[2]
    					},
    					dirty & /*highlightOpacity*/ 8 && {
    						highlightOpacity: /*highlightOpacity*/ ctx[3]
    					}
    				])
    			: {};

    			chartscrolly.$set(chartscrolly_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chartscrolly.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chartscrolly.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chartscrolly);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(79:12) {#if value === 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let h20;
    	let t1;
    	let p0;
    	let t3;
    	let section;
    	let div2;
    	let div0;
    	let scrolly;
    	let updating_value;
    	let t4;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let t5;
    	let br0;
    	let br1;
    	let t6;
    	let h21;
    	let t8;
    	let p1;
    	let current;

    	function scrolly_value_binding(value) {
    		/*scrolly_value_binding*/ ctx[5](value);
    	}

    	let scrolly_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*value*/ ctx[0] !== void 0) {
    		scrolly_props.value = /*value*/ ctx[0];
    	}

    	scrolly = new Scrolly({ props: scrolly_props, $$inline: true });
    	binding_callbacks.push(() => bind(scrolly, 'value', scrolly_value_binding));

    	const if_block_creators = [
    		create_if_block$2,
    		create_if_block_1$2,
    		create_if_block_2$1,
    		create_if_block_3$1,
    		create_else_block$2
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*value*/ ctx[0] === 0) return 0;
    		if (/*value*/ ctx[0] === 1) return 1;
    		if (/*value*/ ctx[0] === 2) return 2;
    		if (/*value*/ ctx[0] === 3) return 3;
    		return 4;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			h20 = element("h2");
    			h20.textContent = "Understanding the Parameters";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Ideally, a fuel cell would operate at its theoretical voltage of 1.2 volts, no matter the condition. \r\n    However, fuel cells in real life are not perfect; factors such as temperature, pressure of the fuel, materials, and construction all contribute to fuel cell voltage losses, also known as irreversibilities.\r\n    Each parameter of this fitted characterization curve helps describe a different type of loss.";
    			t3 = space();
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(scrolly.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			if_block.c();
    			t5 = space();
    			br0 = element("br");
    			br1 = element("br");
    			t6 = space();
    			h21 = element("h2");
    			h21.textContent = "Conclusion";
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "The main takeaway from this website is that each a wide range of voltage losses can play a role in the effectiveness of the fuel cell.\r\n        The following interactive visualization gives a way for you to see how each parameter changes the shape of the characteristic curve.\r\n        Hopefully, this website illustrates the properties of a fuel cell, and how they operate.\r\n        From the current-density versus voltage curve, these parameters can be fitted from collected data, and key sources of fuel cell losses can be determined.\r\n        Therefore, with a solid understanding of this characterization method, better fuel cells can be designed for an energy efficient future.\r\n        (Note: this website provides a simplified view of this curve; lots of active research is still being done to more accurately model a fuel cell's behavior, especially at extreme temperatures and pressures.)";
    			attr_dev(h20, "class", "body-header svelte-1qgnk4w");
    			add_location(h20, file$4, 55, 0, 2724);
    			attr_dev(p0, "class", "body-text svelte-1qgnk4w");
    			add_location(p0, file$4, 56, 0, 2783);
    			attr_dev(div0, "class", "steps-container svelte-1qgnk4w");
    			add_location(div0, file$4, 64, 8, 3316);
    			attr_dev(div1, "class", "charts-container svelte-1qgnk4w");
    			add_location(div1, file$4, 77, 8, 3848);
    			attr_dev(div2, "class", "section-container svelte-1qgnk4w");
    			add_location(div2, file$4, 63, 4, 3275);
    			add_location(br0, file$4, 102, 4, 5066);
    			add_location(br1, file$4, 102, 10, 5072);
    			attr_dev(h21, "class", "body-header svelte-1qgnk4w");
    			add_location(h21, file$4, 103, 4, 5084);
    			attr_dev(p1, "class", "body-text svelte-1qgnk4w");
    			add_location(p1, file$4, 104, 4, 5129);
    			add_location(section, file$4, 61, 0, 3229);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h20, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			mount_component(scrolly, div0, null);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			append_dev(section, t5);
    			append_dev(section, br0);
    			append_dev(section, br1);
    			append_dev(section, t6);
    			append_dev(section, h21);
    			append_dev(section, t8);
    			append_dev(section, p1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const scrolly_changes = {};

    			if (dirty & /*$$scope, steps, value*/ 515) {
    				scrolly_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				scrolly_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			scrolly.$set(scrolly_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(scrolly.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(scrolly.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section);
    			destroy_component(scrolly);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const E0 = 1.0;
    const b = 0.05;
    const R = 30e-6;
    const m = 3e-5;
    const n = 8e-3;

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VariablesScrolly', slots, []);
    	let { value } = $$props;
    	let steps = [];

    	steps = [
    		{
    			title: 'Activation Losses: E<sub>0</sub> and b',
    			content: "Activation losses arise from the rate of the reaction at each electrode. E<sub>0</sub> encompasses the voltage differential between the reversible voltage and the measured voltage. b comes from the non-linear Tafel equation, which describes the variation in reaction rate at different current densities. A higher b indicates a slower reaction. Together, they form the low current density region."
    		},
    		{
    			title: 'Fuel Crossover and Internal Currents',
    			content: "An extra source of voltage loss is observed from the imperfect electrolyte. The electrolyte, despite its electronic resistivity, still lets through a small amount of electrons. Additionally, some hydrogen gas can diffuse through the electrolyte to react with the oxygen. Both result in voltage drop within the observed voltage."
    		},
    		{
    			title: 'Ohmic Losses: R',
    			content: "As implied in the name, ohmic losses come from interal resistance of the fuel cell. Internal resistance is affected by factors such as electrical conductivity of the electrodes and the ionic conductivity of the electrolyte. The ohmic losses describe the intermediate current density region, which is mostly linear."
    		},
    		{
    			title: 'Mass Transfer Losses: m and n',
    			content: "Lastly, mass transfer losses materialize from the concentration of gasses at each electrode. When hydrogen or oxygen gas is reacted, its partial pressure drops, reducing voltage. m and n are empirical parameters, providing a nice fit to the curve. Mass transfer losses dominate in the high current density region."
    		}
    	];

    	let chartParams = { E0, b, R, m, n };
    	let highlightRange = [0, 0];
    	let highlightOpacity = 0;

    	$$self.$$.on_mount.push(function () {
    		if (value === undefined && !('value' in $$props || $$self.$$.bound[$$self.$$.props['value']])) {
    			console.warn("<VariablesScrolly> was created without expected prop 'value'");
    		}
    	});

    	const writable_props = ['value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VariablesScrolly> was created with unknown prop '${key}'`);
    	});

    	function scrolly_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({
    		Scrolly,
    		ChartScrolly,
    		katexify,
    		value,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		steps,
    		chartParams,
    		highlightRange,
    		highlightOpacity
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('steps' in $$props) $$invalidate(1, steps = $$props.steps);
    		if ('chartParams' in $$props) $$invalidate(4, chartParams = $$props.chartParams);
    		if ('highlightRange' in $$props) $$invalidate(2, highlightRange = $$props.highlightRange);
    		if ('highlightOpacity' in $$props) $$invalidate(3, highlightOpacity = $$props.highlightOpacity);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 1) {
    			{
    				if (value === 0 || value === 1) {
    					$$invalidate(2, highlightRange = [0, 200]);
    					$$invalidate(3, highlightOpacity = 0.3);
    				} else if (value === 2) {
    					$$invalidate(2, highlightRange = [200, 700]);
    					$$invalidate(3, highlightOpacity = 0.3);
    				} else if (value === 3) {
    					$$invalidate(2, highlightRange = [700, 999]);
    					$$invalidate(3, highlightOpacity = 0.3);
    				} else {
    					$$invalidate(2, highlightRange = [0, 0]);
    					$$invalidate(3, highlightOpacity = 0);
    				}
    			}
    		}
    	};

    	return [
    		value,
    		steps,
    		highlightRange,
    		highlightOpacity,
    		chartParams,
    		scrolly_value_binding
    	];
    }

    class VariablesScrolly extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { value: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VariablesScrolly",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get value() {
    		throw new Error("<VariablesScrolly>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<VariablesScrolly>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity$4 } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = 'y' } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const primary_property = axis === 'y' ? 'height' : 'width';
        const primary_property_value = parseFloat(style[primary_property]);
        const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
        const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
        const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
        const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
        const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
        const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
        const border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]);
        const border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `${primary_property}: ${t * primary_property_value}px;` +
                `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
                `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
                `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
                `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
                `border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
                `border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
        };
    }

    /* src\components\DiagramFC.svelte generated by Svelte v3.59.2 */
    const file$3 = "src\\components\\DiagramFC.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[16] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[16] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[16] = i;
    	return child_ctx;
    }

    // (68:16) {#if clicked === 0}
    function create_if_block_6(ctx) {
    	let each_1_anchor;
    	let each_value_2 = Array(10);
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(68:16) {#if clicked === 0}",
    		ctx
    	});

    	return block;
    }

    // (69:20) {#each Array(10) as _, i}
    function create_each_block_2(ctx) {
    	let g;
    	let circle0;
    	let animateMotion0;
    	let mpath0;
    	let circle1;
    	let animateMotion1;
    	let mpath1;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			circle0 = svg_element("circle");
    			animateMotion0 = svg_element("animateMotion");
    			mpath0 = svg_element("mpath");
    			circle1 = svg_element("circle");
    			animateMotion1 = svg_element("animateMotion");
    			mpath1 = svg_element("mpath");
    			attr_dev(mpath0, "href", "#hydrogenPath");
    			add_location(mpath0, file$3, 78, 36, 3358);
    			attr_dev(animateMotion0, "class", "hydrogenMotion");
    			attr_dev(animateMotion0, "dur", "5s");
    			attr_dev(animateMotion0, "repeatCount", "indefinite");
    			attr_dev(animateMotion0, "begin", /*i*/ ctx[16] * 0.5 + "s");
    			add_location(animateMotion0, file$3, 72, 32, 3042);
    			attr_dev(circle0, "class", "hydrogen-circle");
    			attr_dev(circle0, "r", "20");
    			attr_dev(circle0, "fill", "red");
    			add_location(circle0, file$3, 71, 28, 2958);
    			attr_dev(mpath1, "href", "#hydrogenPath");
    			add_location(mpath1, file$3, 89, 36, 3992);
    			attr_dev(animateMotion1, "class", "hydrogenMotion");
    			attr_dev(animateMotion1, "dur", "5s");
    			attr_dev(animateMotion1, "repeatCount", "indefinite");
    			attr_dev(animateMotion1, "begin", /*i*/ ctx[16] * 0.5 + "s");
    			add_location(animateMotion1, file$3, 83, 32, 3676);
    			attr_dev(circle1, "class", "hydrogen-circle");
    			attr_dev(circle1, "r", "20");
    			attr_dev(circle1, "fill", "red");
    			attr_dev(circle1, "transform", "translate(0, 25)");
    			add_location(circle1, file$3, 82, 28, 3563);
    			add_location(g, file$3, 69, 24, 2869);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, circle0);
    			append_dev(circle0, animateMotion0);
    			append_dev(animateMotion0, mpath0);
    			append_dev(g, circle1);
    			append_dev(circle1, animateMotion1);
    			append_dev(animateMotion1, mpath1);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(69:20) {#each Array(10) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (120:16) {#if clicked === 3}
    function create_if_block_5(ctx) {
    	let each_1_anchor;
    	let each_value_1 = Array(5);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(120:16) {#if clicked === 3}",
    		ctx
    	});

    	return block;
    }

    // (121:20) {#each Array(5) as _, i}
    function create_each_block_1(ctx) {
    	let circle;
    	let animateMotion;
    	let mpath;

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			animateMotion = svg_element("animateMotion");
    			mpath = svg_element("mpath");
    			attr_dev(mpath, "href", "#circuitPath");
    			add_location(mpath, file$3, 127, 32, 5541);
    			attr_dev(animateMotion, "class", "electronMotion");
    			attr_dev(animateMotion, "dur", "5s");
    			attr_dev(animateMotion, "repeatCount", "indefinite");
    			attr_dev(animateMotion, "begin", /*i*/ ctx[16] * 1 + "s; anim" + /*i*/ ctx[16] + ".begin");
    			add_location(animateMotion, file$3, 122, 28, 5260);
    			attr_dev(circle, "class", "electron svelte-1lqswlk");
    			attr_dev(circle, "r", "15");
    			attr_dev(circle, "fill", "#ffb703");
    			add_location(circle, file$3, 121, 24, 5183);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);
    			append_dev(circle, animateMotion);
    			append_dev(animateMotion, mpath);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(121:20) {#each Array(5) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (156:16) {#if clicked === 2}
    function create_if_block_4(ctx) {
    	let each_1_anchor;
    	let each_value = Array(10);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(156:16) {#if clicked === 2}",
    		ctx
    	});

    	return block;
    }

    // (157:20) {#each Array(10) as _, i}
    function create_each_block(ctx) {
    	let g;
    	let circle0;
    	let animateMotion0;
    	let mpath0;
    	let circle1;
    	let animateMotion1;
    	let mpath1;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			circle0 = svg_element("circle");
    			animateMotion0 = svg_element("animateMotion");
    			mpath0 = svg_element("mpath");
    			circle1 = svg_element("circle");
    			animateMotion1 = svg_element("animateMotion");
    			mpath1 = svg_element("mpath");
    			attr_dev(mpath0, "href", "#oxygenPath");
    			add_location(mpath0, file$3, 166, 36, 7083);
    			attr_dev(animateMotion0, "class", "oxygenMotion");
    			attr_dev(animateMotion0, "dur", "5s");
    			attr_dev(animateMotion0, "repeatCount", "indefinite");
    			attr_dev(animateMotion0, "begin", /*i*/ ctx[16] * 0.5 + "s");
    			add_location(animateMotion0, file$3, 160, 32, 6769);
    			attr_dev(circle0, "class", "oxygen-circle");
    			attr_dev(circle0, "r", "20");
    			attr_dev(circle0, "fill", "blue");
    			add_location(circle0, file$3, 159, 28, 6686);
    			attr_dev(mpath1, "href", "#oxygenPath");
    			add_location(mpath1, file$3, 177, 36, 7712);
    			attr_dev(animateMotion1, "class", "oxygenMotion");
    			attr_dev(animateMotion1, "dur", "5s");
    			attr_dev(animateMotion1, "repeatCount", "indefinite");
    			attr_dev(animateMotion1, "begin", /*i*/ ctx[16] * 0.5 + "s");
    			add_location(animateMotion1, file$3, 171, 32, 7398);
    			attr_dev(circle1, "class", "oxygen-circle");
    			attr_dev(circle1, "r", "20");
    			attr_dev(circle1, "fill", "blue");
    			attr_dev(circle1, "transform", "translate(0, 25)");
    			add_location(circle1, file$3, 170, 28, 7286);
    			add_location(g, file$3, 157, 24, 6597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, circle0);
    			append_dev(circle0, animateMotion0);
    			append_dev(animateMotion0, mpath0);
    			append_dev(g, circle1);
    			append_dev(circle1, animateMotion1);
    			append_dev(animateMotion1, mpath1);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(157:20) {#each Array(10) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (314:12) {:else}
    function create_else_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Click any component of the fuel cell!";
    			set_style(p, "text-align", "center");
    			add_location(p, file$3, 314, 12, 13834);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(314:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (302:36) 
    function create_if_block_3(ctx) {
    	let div;
    	let header;
    	let t1;
    	let i;
    	let t3;
    	let div_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			header = element("header");
    			header.textContent = "Circuit";
    			t1 = text$2("\r\n                    The circuit provides the pathway for electrons. Electrons come from the anode (the negative electrode), and move to the cathode (the positive electrode). \r\n                    Note, the direction of electron travel is ");
    			i = element("i");
    			i.textContent = "opposite";
    			t3 = text$2(" to the direction of current. The arrows drawn in this diagram portray the movement of electrons, not current flow.");
    			attr_dev(header, "class", "svelte-1lqswlk");
    			add_location(header, file$3, 303, 16, 12987);
    			add_location(i, file$3, 305, 62, 13251);
    			add_location(div, file$3, 302, 12, 12956);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, header);
    			append_dev(div, t1);
    			append_dev(div, i);
    			append_dev(div, t3);
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}
    		},
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(302:36) ",
    		ctx
    	});

    	return block;
    }

    // (292:36) 
    function create_if_block_2(ctx) {
    	let div;
    	let header;
    	let t1;
    	let p;
    	let t2;
    	let sub0;
    	let t4;
    	let i;
    	let sup0;
    	let t7;
    	let sup1;
    	let t9;
    	let sub1;
    	let t11;
    	let t12;
    	let div_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			header = element("header");
    			header.textContent = "Cathode";
    			t1 = text$2("\r\n                    The cathode, also known as the positive electrode, reduces oxygen with this half reaction:\r\n                    ");
    			p = element("p");
    			t2 = text$2("O");
    			sub0 = element("sub");
    			sub0.textContent = "2";
    			t4 = text$2(" + 4");
    			i = element("i");
    			i.textContent = "e";
    			sup0 = element("sup");
    			sup0.textContent = "-";
    			t7 = text$2(" + 4H");
    			sup1 = element("sup");
    			sup1.textContent = "+";
    			t9 = text$2(" → 2H");
    			sub1 = element("sub");
    			sub1.textContent = "2";
    			t11 = text$2("O");
    			t12 = text$2("\r\n                    receiving electrons from the circuit and producing water from the oxygen. \r\n                    On this side, both atmospheric air or pure oxygen can be inputted, and water vapor is released into the atmosphere.");
    			attr_dev(header, "class", "svelte-1lqswlk");
    			add_location(header, file$3, 293, 16, 12340);
    			add_location(sub0, file$3, 296, 25, 12545);
    			add_location(i, file$3, 296, 41, 12561);
    			add_location(sup0, file$3, 296, 49, 12569);
    			add_location(sup1, file$3, 296, 66, 12586);
    			add_location(sub1, file$3, 296, 88, 12608);
    			attr_dev(p, "class", "equation svelte-1lqswlk");
    			add_location(p, file$3, 295, 20, 12498);
    			add_location(div, file$3, 292, 12, 12309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, header);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(p, sub0);
    			append_dev(p, t4);
    			append_dev(p, i);
    			append_dev(p, sup0);
    			append_dev(p, t7);
    			append_dev(p, sup1);
    			append_dev(p, t9);
    			append_dev(p, sub1);
    			append_dev(p, t11);
    			append_dev(div, t12);
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}
    		},
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(292:36) ",
    		ctx
    	});

    	return block;
    }

    // (285:36) 
    function create_if_block_1$1(ctx) {
    	let header;
    	let header_intro;
    	let t1;
    	let p;
    	let p_intro;

    	const block = {
    		c: function create() {
    			header = element("header");
    			header.textContent = "Electrolyte";
    			t1 = space();
    			p = element("p");
    			p.textContent = "The electrolyte is typically an ionic solution which enables the transfer of charged ions between electrodes. It also separates the two electrodes to prevent short circuiting.\r\n                However, in PEM fuel cells, the electrolyte is a semi-conductive polymer membrane, solely allowing the movement of hydrogen ions.\r\n                Once oxidized, hydrogen ions bond with the membrane, in which they can be used at the cathode for its reduction half-reaction.";
    			attr_dev(header, "class", "svelte-1lqswlk");
    			add_location(header, file$3, 285, 12, 11694);
    			add_location(p, file$3, 286, 12, 11744);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    		},
    		i: function intro(local) {
    			if (!header_intro) {
    				add_render_callback(() => {
    					header_intro = create_in_transition(header, fade, {});
    					header_intro.start();
    				});
    			}

    			if (!p_intro) {
    				add_render_callback(() => {
    					p_intro = create_in_transition(p, fade, {});
    					p_intro.start();
    				});
    			}
    		},
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(285:36) ",
    		ctx
    	});

    	return block;
    }

    // (273:12) {#if clicked === 0}
    function create_if_block$1(ctx) {
    	let div;
    	let header;
    	let t1;
    	let p;
    	let t2;
    	let sub;
    	let t4;
    	let sup0;
    	let t6;
    	let i;
    	let sup1;
    	let t9;
    	let div_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			header = element("header");
    			header.textContent = "Anode";
    			t1 = text$2("\r\n                The anode, also known as the negative electrode, oxidizes hydrogen with this half reaction,\r\n                ");
    			p = element("p");
    			t2 = text$2("2H");
    			sub = element("sub");
    			sub.textContent = "2";
    			t4 = text$2(" → 4H");
    			sup0 = element("sup");
    			sup0.textContent = "+";
    			t6 = text$2(" + 4");
    			i = element("i");
    			i.textContent = "e";
    			sup1 = element("sup");
    			sup1.textContent = "-";
    			t9 = text$2("\r\n                releasing electrons which do electrical work through the connected circuit. \r\n                The anode takes in pure hydrogen gas, and ionizes the hydrogen. \r\n                The electrode itself is a conductive material to easily transfer electrons to the circuit.\r\n                Typically, both electrodes use a catalyst such as platinum to speed up the reaction process, generating more energy.");
    			attr_dev(header, "class", "svelte-1lqswlk");
    			add_location(header, file$3, 274, 12, 10931);
    			add_location(sub, file$3, 277, 22, 11124);
    			add_location(sup0, file$3, 277, 44, 11146);
    			add_location(i, file$3, 277, 60, 11162);
    			add_location(sup1, file$3, 277, 68, 11170);
    			attr_dev(p, "class", "equation svelte-1lqswlk");
    			add_location(p, file$3, 276, 16, 11080);
    			add_location(div, file$3, 273, 12, 10904);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, header);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(p, sub);
    			append_dev(p, t4);
    			append_dev(p, sup0);
    			append_dev(p, t6);
    			append_dev(p, i);
    			append_dev(p, sup1);
    			append_dev(div, t9);
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}
    		},
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(273:12) {#if clicked === 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div4;
    	let div0;
    	let h2;
    	let t1;
    	let a0;
    	let b0;
    	let t3;
    	let a1;
    	let b1;
    	let t5;
    	let p;
    	let t6;
    	let sub0;
    	let t8;
    	let sub1;
    	let t10;
    	let sub2;
    	let t12;
    	let t13;
    	let br0;
    	let t14;
    	let br1;
    	let t15;
    	let div3;
    	let div1;
    	let svg;
    	let defs;
    	let filter;
    	let feDropShadow;
    	let marker;
    	let path0;
    	let rect0;
    	let rect0_fill_value;
    	let path1;
    	let path2;
    	let path2_fill_value;
    	let path3;
    	let rect1;
    	let rect1_fill_value;
    	let path4;
    	let rect2;
    	let rect2_fill_value;
    	let circle0;
    	let line0;
    	let circle1;
    	let line1;
    	let line2;
    	let path5;
    	let path6;
    	let t16;
    	let div2;
    	let mounted;
    	let dispose;
    	let if_block0 = /*clicked*/ ctx[0] === 0 && create_if_block_6(ctx);
    	let if_block1 = /*clicked*/ ctx[0] === 3 && create_if_block_5(ctx);
    	let if_block2 = /*clicked*/ ctx[0] === 2 && create_if_block_4(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*clicked*/ ctx[0] === 0) return create_if_block$1;
    		if (/*clicked*/ ctx[0] === 1) return create_if_block_1$1;
    		if (/*clicked*/ ctx[0] === 2) return create_if_block_2;
    		if (/*clicked*/ ctx[0] === 3) return create_if_block_3;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block3 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "What is a Fuel Cell?";
    			t1 = text$2("\r\n        Fuel cells operate based on the electrochemistry principles of oxidation and reduction. \r\n        Using an inlet fuel such as hydrogen, a fuel cell converts chemical energy to electricity with its  \r\n        ");
    			a0 = element("a");
    			b0 = element("b");
    			b0.textContent = "half reactions";
    			t3 = text$2(".\r\n        Unlike batteries, fuel cells need to be continuously supplied for the energy-releasing reaction to occur.\r\n        The most well-known fuel cell is the ");
    			a1 = element("a");
    			b1 = element("b");
    			b1.textContent = "Proton-Exchange Membrane Fuel Cell";
    			t5 = text$2(" (PEMFC), \r\n        which utilizes the reaction\r\n        ");
    			p = element("p");
    			t6 = text$2("2H");
    			sub0 = element("sub");
    			sub0.textContent = "2";
    			t8 = text$2(" + O");
    			sub1 = element("sub");
    			sub1.textContent = "2";
    			t10 = text$2(" → 2H");
    			sub2 = element("sub");
    			sub2.textContent = "2";
    			t12 = text$2("O");
    			t13 = text$2("\r\n        which has a potential of approximately 1.2 volts and produces electrical energy.\r\n        Click on different parts of this fuel cell to explore!\r\n        ");
    			br0 = element("br");
    			t14 = space();
    			br1 = element("br");
    			t15 = space();
    			div3 = element("div");
    			div1 = element("div");
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			filter = svg_element("filter");
    			feDropShadow = svg_element("feDropShadow");
    			marker = svg_element("marker");
    			path0 = svg_element("path");
    			rect0 = svg_element("rect");
    			path1 = svg_element("path");
    			if (if_block0) if_block0.c();
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			if (if_block1) if_block1.c();
    			rect1 = svg_element("rect");
    			path4 = svg_element("path");
    			if (if_block2) if_block2.c();
    			rect2 = svg_element("rect");
    			circle0 = svg_element("circle");
    			line0 = svg_element("line");
    			circle1 = svg_element("circle");
    			line1 = svg_element("line");
    			line2 = svg_element("line");
    			path5 = svg_element("path");
    			path6 = svg_element("path");
    			t16 = space();
    			div2 = element("div");
    			if_block3.c();
    			add_location(h2, file$3, 12, 8, 261);
    			add_location(b0, file$3, 16, 12, 683);
    			attr_dev(a0, "href", "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Electrochemistry/Redox_Chemistry/Half-Reactions");
    			add_location(a0, file$3, 15, 8, 508);
    			add_location(b1, file$3, 18, 118, 944);
    			attr_dev(a1, "href", "https://en.wikipedia.org/wiki/Proton-exchange_membrane_fuel_cell");
    			add_location(a1, file$3, 18, 45, 871);
    			add_location(sub0, file$3, 21, 14, 1082);
    			add_location(sub1, file$3, 21, 30, 1098);
    			add_location(sub2, file$3, 21, 52, 1120);
    			attr_dev(p, "class", "equation svelte-1lqswlk");
    			add_location(p, file$3, 20, 8, 1046);
    			add_location(br0, file$3, 25, 8, 1311);
    			add_location(br1, file$3, 26, 8, 1325);
    			attr_dev(div0, "id", "box1");
    			attr_dev(div0, "class", "info svelte-1lqswlk");
    			add_location(div0, file$3, 11, 4, 223);
    			attr_dev(feDropShadow, "dx", "-12");
    			attr_dev(feDropShadow, "dy", "14");
    			attr_dev(feDropShadow, "stdDeviation", "1");
    			attr_dev(feDropShadow, "flood-opacity", "0.7");
    			add_location(feDropShadow, file$3, 35, 24, 1546);
    			attr_dev(filter, "id", "f1");
    			add_location(filter, file$3, 34, 20, 1504);
    			attr_dev(path0, "d", "M0,0 V4 L2,2 Z");
    			attr_dev(path0, "fill", "black");
    			add_location(path0, file$3, 41, 24, 1857);
    			attr_dev(marker, "id", "head");
    			attr_dev(marker, "orient", "auto");
    			attr_dev(marker, "markerWidth", "10");
    			attr_dev(marker, "markerHeight", "10");
    			attr_dev(marker, "refX", "0.1");
    			attr_dev(marker, "refY", "2");
    			add_location(marker, file$3, 37, 20, 1668);
    			add_location(defs, file$3, 33, 16, 1476);
    			attr_dev(rect0, "id", "anode");
    			attr_dev(rect0, "width", "400");
    			attr_dev(rect0, "height", "950");
    			attr_dev(rect0, "x", "-490");
    			attr_dev(rect0, "y", "-490");
    			attr_dev(rect0, "fill", rect0_fill_value = /*hovered*/ ctx[1] === 0 ? hovered_color : "dimgray");
    			attr_dev(rect0, "stroke", "black");
    			attr_dev(rect0, "stroke-width", "5");
    			attr_dev(rect0, "class", "svelte-1lqswlk");
    			add_location(rect0, file$3, 45, 16, 1972);
    			attr_dev(path1, "id", "hydrogenPath");
    			attr_dev(path1, "d", "M -490 -400 H -175 V 370 H -490");
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "none");
    			add_location(path1, file$3, 60, 16, 2552);
    			attr_dev(path2, "class", "hoverable svelte-1lqswlk");
    			attr_dev(path2, "d", "M-400 -490\r\n                    L-400 -740\r\n                    L 400 -740\r\n                    L 400 -490\r\n                    L 350 -490\r\n                    L 350 -690\r\n                    L-350 -690\r\n                    L-350 -490\r\n                    Z");
    			attr_dev(path2, "fill", path2_fill_value = /*hovered*/ ctx[1] === 3 ? hovered_color : "white");
    			attr_dev(path2, "stroke", "black");
    			attr_dev(path2, "stroke-width", "5px");
    			add_location(path2, file$3, 98, 16, 4216);
    			attr_dev(path3, "id", "circuitPath");
    			attr_dev(path3, "d", "M-400 -490 V -740 H 400 V -490");
    			attr_dev(path3, "fill", "none");
    			attr_dev(path3, "stroke", "none");
    			add_location(path3, file$3, 118, 16, 4989);
    			attr_dev(rect1, "id", "cathode");
    			attr_dev(rect1, "width", "400");
    			attr_dev(rect1, "height", "950");
    			attr_dev(rect1, "x", "90");
    			attr_dev(rect1, "y", "-490");
    			attr_dev(rect1, "fill", rect1_fill_value = /*hovered*/ ctx[1] === 2 ? hovered_color : "lightgray");
    			attr_dev(rect1, "stroke", "black");
    			attr_dev(rect1, "stroke-width", "5");
    			attr_dev(rect1, "class", "svelte-1lqswlk");
    			add_location(rect1, file$3, 133, 16, 5722);
    			attr_dev(path4, "id", "oxygenPath");
    			attr_dev(path4, "d", "M 490 -400 H 165 V 370 H 490");
    			attr_dev(path4, "fill", "none");
    			attr_dev(path4, "stroke", "none");
    			add_location(path4, file$3, 148, 16, 6301);
    			attr_dev(rect2, "id", "electrolyte");
    			attr_dev(rect2, "width", "200");
    			attr_dev(rect2, "height", "950");
    			attr_dev(rect2, "x", "-100");
    			attr_dev(rect2, "y", "-490");
    			attr_dev(rect2, "fill", rect2_fill_value = /*hovered*/ ctx[1] === 1 ? hovered_color : "white");
    			attr_dev(rect2, "stroke", "black");
    			attr_dev(rect2, "stroke-width", "5");
    			attr_dev(rect2, "class", "svelte-1lqswlk");
    			add_location(rect2, file$3, 184, 16, 7930);
    			attr_dev(circle0, "r", "50");
    			attr_dev(circle0, "cx", "-600");
    			attr_dev(circle0, "cy", "-400");
    			attr_dev(circle0, "stroke", "black");
    			attr_dev(circle0, "stroke-width", "5");
    			attr_dev(circle0, "fill", "none");
    			add_location(circle0, file$3, 213, 16, 9136);
    			attr_dev(line0, "x1", "-625");
    			attr_dev(line0, "y1", "-400");
    			attr_dev(line0, "x2", "-575");
    			attr_dev(line0, "y2", "-400");
    			attr_dev(line0, "stroke", "black");
    			attr_dev(line0, "stroke-width", "5");
    			add_location(line0, file$3, 221, 16, 9371);
    			attr_dev(circle1, "r", "50");
    			attr_dev(circle1, "cx", "600");
    			attr_dev(circle1, "cy", "-400");
    			attr_dev(circle1, "stroke", "black");
    			attr_dev(circle1, "stroke-width", "5");
    			attr_dev(circle1, "fill", "none");
    			add_location(circle1, file$3, 230, 16, 9606);
    			attr_dev(line1, "x1", "625");
    			attr_dev(line1, "y1", "-400");
    			attr_dev(line1, "x2", "575");
    			attr_dev(line1, "y2", "-400");
    			attr_dev(line1, "stroke", "black");
    			attr_dev(line1, "stroke-width", "5");
    			add_location(line1, file$3, 238, 16, 9840);
    			attr_dev(line2, "x1", "600");
    			attr_dev(line2, "y1", "-425");
    			attr_dev(line2, "x2", "600");
    			attr_dev(line2, "y2", "-375");
    			attr_dev(line2, "stroke", "black");
    			attr_dev(line2, "stroke-width", "5");
    			add_location(line2, file$3, 246, 16, 10071);
    			attr_dev(path5, "d", "M-450 -700, -450 -800, -350 -800 ");
    			attr_dev(path5, "marker-end", "url(#head)");
    			attr_dev(path5, "fill", "none");
    			attr_dev(path5, "stroke", "black");
    			attr_dev(path5, "stroke-width", "8px");
    			add_location(path5, file$3, 254, 16, 10302);
    			attr_dev(path6, "d", "M350 -800, 450 -800, 450 -700");
    			attr_dev(path6, "marker-end", "url(#head)");
    			attr_dev(path6, "fill", "none");
    			attr_dev(path6, "stroke", "black");
    			attr_dev(path6, "stroke-width", "8px");
    			add_location(path6, file$3, 261, 16, 10556);
    			attr_dev(svg, "viewBox", "-1000 -900 2000 1400");
    			attr_dev(svg, "class", "svelte-1lqswlk");
    			add_location(svg, file$3, 32, 12, 1422);
    			attr_dev(div1, "class", "diagram svelte-1lqswlk");
    			add_location(div1, file$3, 31, 8, 1387);
    			attr_dev(div2, "class", "tooltip svelte-1lqswlk");
    			add_location(div2, file$3, 271, 8, 10836);
    			attr_dev(div3, "class", "diagram-full svelte-1lqswlk");
    			add_location(div3, file$3, 29, 4, 1349);
    			attr_dev(div4, "class", "container svelte-1lqswlk");
    			add_location(div4, file$3, 9, 0, 192);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, a0);
    			append_dev(a0, b0);
    			append_dev(div0, t3);
    			append_dev(div0, a1);
    			append_dev(a1, b1);
    			append_dev(div0, t5);
    			append_dev(div0, p);
    			append_dev(p, t6);
    			append_dev(p, sub0);
    			append_dev(p, t8);
    			append_dev(p, sub1);
    			append_dev(p, t10);
    			append_dev(p, sub2);
    			append_dev(p, t12);
    			append_dev(div0, t13);
    			append_dev(div0, br0);
    			append_dev(div0, t14);
    			append_dev(div0, br1);
    			append_dev(div4, t15);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, svg);
    			append_dev(svg, defs);
    			append_dev(defs, filter);
    			append_dev(filter, feDropShadow);
    			append_dev(defs, marker);
    			append_dev(marker, path0);
    			append_dev(svg, rect0);
    			append_dev(svg, path1);
    			if (if_block0) if_block0.m(svg, null);
    			append_dev(svg, path2);
    			append_dev(svg, path3);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, rect1);
    			append_dev(svg, path4);
    			if (if_block2) if_block2.m(svg, null);
    			append_dev(svg, rect2);
    			append_dev(svg, circle0);
    			append_dev(svg, line0);
    			append_dev(svg, circle1);
    			append_dev(svg, line1);
    			append_dev(svg, line2);
    			append_dev(svg, path5);
    			append_dev(svg, path6);
    			append_dev(div3, t16);
    			append_dev(div3, div2);
    			if_block3.m(div2, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(rect0, "click", /*click_handler*/ ctx[2], false, false, false, false),
    					listen_dev(rect0, "mouseover", /*mouseover_handler*/ ctx[3], false, false, false, false),
    					listen_dev(rect0, "mouseout", /*mouseout_handler*/ ctx[4], false, false, false, false),
    					listen_dev(path2, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(path2, "mouseover", /*mouseover_handler_1*/ ctx[6], false, false, false, false),
    					listen_dev(path2, "mouseout", /*mouseout_handler_1*/ ctx[7], false, false, false, false),
    					listen_dev(rect1, "click", /*click_handler_2*/ ctx[8], false, false, false, false),
    					listen_dev(rect1, "mouseover", /*mouseover_handler_2*/ ctx[9], false, false, false, false),
    					listen_dev(rect1, "mouseout", /*mouseout_handler_2*/ ctx[10], false, false, false, false),
    					listen_dev(rect2, "click", /*click_handler_3*/ ctx[11], false, false, false, false),
    					listen_dev(rect2, "mouseover", /*mouseover_handler_3*/ ctx[12], false, false, false, false),
    					listen_dev(rect2, "mouseout", /*mouseout_handler_3*/ ctx[13], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hovered*/ 2 && rect0_fill_value !== (rect0_fill_value = /*hovered*/ ctx[1] === 0 ? hovered_color : "dimgray")) {
    				attr_dev(rect0, "fill", rect0_fill_value);
    			}

    			if (/*clicked*/ ctx[0] === 0) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					if_block0.m(svg, path2);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*hovered*/ 2 && path2_fill_value !== (path2_fill_value = /*hovered*/ ctx[1] === 3 ? hovered_color : "white")) {
    				attr_dev(path2, "fill", path2_fill_value);
    			}

    			if (/*clicked*/ ctx[0] === 3) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					if_block1.m(svg, rect1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*hovered*/ 2 && rect1_fill_value !== (rect1_fill_value = /*hovered*/ ctx[1] === 2 ? hovered_color : "lightgray")) {
    				attr_dev(rect1, "fill", rect1_fill_value);
    			}

    			if (/*clicked*/ ctx[0] === 2) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_4(ctx);
    					if_block2.c();
    					if_block2.m(svg, rect2);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*hovered*/ 2 && rect2_fill_value !== (rect2_fill_value = /*hovered*/ ctx[1] === 1 ? hovered_color : "white")) {
    				attr_dev(rect2, "fill", rect2_fill_value);
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block3.d(1);
    				if_block3 = current_block_type(ctx);

    				if (if_block3) {
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div2, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block3);
    		},
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const hovered_color = "gold";

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DiagramFC', slots, []);
    	let clicked = -1;
    	let hovered = -1;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DiagramFC> was created with unknown prop '${key}'`);
    	});

    	const click_handler = event => {
    		$$invalidate(0, clicked = 0);
    	};

    	const mouseover_handler = event => {
    		$$invalidate(1, hovered = 0);
    	};

    	const mouseout_handler = event => {
    		$$invalidate(1, hovered = -1);
    	};

    	const click_handler_1 = event => {
    		$$invalidate(0, clicked = 3);
    		animateElectrons();
    	};

    	const mouseover_handler_1 = event => {
    		$$invalidate(1, hovered = 3);
    	};

    	const mouseout_handler_1 = event => {
    		$$invalidate(1, hovered = -1);
    	};

    	const click_handler_2 = event => {
    		$$invalidate(0, clicked = 2);
    	};

    	const mouseover_handler_2 = event => {
    		$$invalidate(1, hovered = 2);
    	};

    	const mouseout_handler_2 = event => {
    		$$invalidate(1, hovered = -1);
    	};

    	const click_handler_3 = event => {
    		$$invalidate(0, clicked = 1);
    	};

    	const mouseover_handler_3 = event => {
    		$$invalidate(1, hovered = 1);
    	};

    	const mouseout_handler_3 = event => {
    		$$invalidate(1, hovered = -1);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		onMount,
    		clicked,
    		hovered,
    		hovered_color
    	});

    	$$self.$inject_state = $$props => {
    		if ('clicked' in $$props) $$invalidate(0, clicked = $$props.clicked);
    		if ('hovered' in $$props) $$invalidate(1, hovered = $$props.hovered);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		clicked,
    		hovered,
    		click_handler,
    		mouseover_handler,
    		mouseout_handler,
    		click_handler_1,
    		mouseover_handler_1,
    		mouseout_handler_1,
    		click_handler_2,
    		mouseover_handler_2,
    		mouseout_handler_2,
    		click_handler_3,
    		mouseover_handler_3,
    		mouseout_handler_3
    	];
    }

    class DiagramFC extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DiagramFC",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Why.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\components\\Why.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let p0;
    	let t2;
    	let b0;
    	let t4;
    	let a;
    	let b1;
    	let t6;
    	let t7;
    	let p1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Why Fuel Cells?";
    			t1 = space();
    			p0 = element("p");
    			t2 = text$2("As the world transitions away from fossil fuels to combat climate change, there \r\n    needs to be other production methods to produce energy with lower carbon dioxide emmissions to fuel growing energy requirements.\r\n    Fuel cells can be an efficient way of providing energy without a large carbon footprint.\r\n    A hydrogen fuel cell's output is only water vapor, an attractive alternative for clean energy vehicles looking to reduce emissions.\r\n    (");
    			b0 = element("b");
    			b0.textContent = "Fun fact:";
    			t4 = text$2(" NASA used hydrogen fuel cells in their spacecrafts in the 1960's!)\r\n    Furthermore, by performing ");
    			a = element("a");
    			b1 = element("b");
    			b1.textContent = "electrolysis";
    			t6 = text$2(", the energy-intensive splitting of water, hydrogen\r\n    can be produced freely if energy is obtained from a clean source.");
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "Therefore, it becomes necessary to have tools to properly characterize a fuel cell in order to design an efficient one.\r\n    Enter, the current-density vs. voltage curve! Also known as a polarization curve, it tells a story of a fuel cell's effectiveness.";
    			add_location(h2, file$2, 5, 0, 45);
    			add_location(b0, file$2, 11, 5, 536);
    			add_location(b1, file$2, 12, 82, 703);
    			attr_dev(a, "href", "https://en.wikipedia.org/wiki/Electrolysis");
    			add_location(a, file$2, 12, 31, 652);
    			add_location(p0, file$2, 6, 0, 71);
    			add_location(p1, file$2, 15, 0, 856);
    			attr_dev(div, "class", "body svelte-3jpvu7");
    			add_location(div, file$2, 4, 0, 25);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(p0, t2);
    			append_dev(p0, b0);
    			append_dev(p0, t4);
    			append_dev(p0, a);
    			append_dev(a, b1);
    			append_dev(p0, t6);
    			append_dev(div, t7);
    			append_dev(div, p1);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Why', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Why> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Why extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Why",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\References.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\components\\References.svelte";

    // (21:4) {:else}
    function create_else_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text$2("—");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(21:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (19:4) {#if clicked}
    function create_if_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text$2("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(19:4) {#if clicked}",
    		ctx
    	});

    	return block;
    }

    // (26:0) {#if clicked}
    function create_if_block(ctx) {
    	let div;
    	let ul;
    	let li0;
    	let h30;
    	let t1;
    	let t2;
    	let li1;
    	let h31;
    	let t4;
    	let t5;
    	let li2;
    	let h32;
    	let t7;
    	let div_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			h30 = element("h3");
    			h30.textContent = "Reference #1";
    			t1 = text$2(" Dicks, A. L.; Rand, D. A. J., Fuel Cell Systems Explained, 3rd ed.; John Wiley and Sons:\r\n            New Jersey, 2018.");
    			t2 = space();
    			li1 = element("li");
    			h31 = element("h3");
    			h31.textContent = "Reference #2";
    			t4 = text$2(" Kim, J. et al. Modeling of Proton Exchange Membrane Fuel Cell Performance with an Empirical Equation. \r\n            J. Electrochem. Soc. 1995, 142, 2670–2674, DOI: 10.1149/1.2050072.");
    			t5 = space();
    			li2 = element("li");
    			h32 = element("h3");
    			h32.textContent = "Reference #3";
    			t7 = text$2(" Spiegel, C., PEM Fuel Cell Modeling and Simulation Using MATLAB; Elsevier: 2008.");
    			add_location(h30, file$1, 28, 12, 689);
    			add_location(li0, file$1, 28, 8, 685);
    			add_location(h31, file$1, 30, 12, 849);
    			add_location(li1, file$1, 30, 8, 845);
    			add_location(h32, file$1, 32, 12, 1072);
    			add_location(li2, file$1, 32, 8, 1068);
    			attr_dev(ul, "class", "list svelte-cl4vs1");
    			add_location(ul, file$1, 27, 4, 658);
    			attr_dev(div, "class", "reference svelte-cl4vs1");
    			add_location(div, file$1, 26, 0, 581);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(li0, h30);
    			append_dev(li0, t1);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(li1, h31);
    			append_dev(li1, t4);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(li2, h32);
    			append_dev(li2, t7);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, { duration: 250, axis: 'y' }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, { duration: 250, axis: 'y' }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(26:0) {#if clicked}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let input;
    	let t0;
    	let label;
    	let t1;
    	let strong;
    	let t3;
    	let if_block1_anchor;
    	let current;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*clicked*/ ctx[0]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*clicked*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			if_block0.c();
    			t1 = space();
    			strong = element("strong");
    			strong.textContent = "References";
    			t3 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty$1();
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "id", "check");
    			input.hidden = true;
    			attr_dev(input, "class", "svelte-cl4vs1");
    			add_location(input, file$1, 16, 0, 339);
    			add_location(strong, file$1, 23, 4, 526);
    			attr_dev(label, "for", "check");
    			attr_dev(label, "class", "button svelte-cl4vs1");
    			add_location(label, file$1, 17, 0, 423);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, label, anchor);
    			if_block0.m(label, null);
    			append_dev(label, t1);
    			append_dev(label, strong);
    			insert_dev(target, t3, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*change_handler*/ ctx[2], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(label, t1);
    				}
    			}

    			if (/*clicked*/ ctx[0]) {
    				if (if_block1) {
    					if (dirty & /*clicked*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(label);
    			if_block0.d();
    			if (detaching) detach_dev(t3);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('References', slots, []);
    	let clicked = 0;

    	function flip_clicked() {
    		$$invalidate(0, clicked = !clicked);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<References> was created with unknown prop '${key}'`);
    	});

    	const change_handler = event => {
    		flip_clicked();
    	};

    	$$self.$capture_state = () => ({ slide, clicked, flip_clicked });

    	$$self.$inject_state = $$props => {
    		if ('clicked' in $$props) $$invalidate(0, clicked = $$props.clicked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [clicked, flip_clicked, change_handler];
    }

    class References extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "References",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let div0;
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let h3;
    	let a0;
    	let t5;
    	let a1;
    	let t7;
    	let br;
    	let t8;
    	let t9;
    	let diagramfc;
    	let t10;
    	let why;
    	let t11;
    	let p0;
    	let raw0_value = katexify("E = E_0 - b \\log(i) - Ri - m \\exp(ni)") + "";
    	let t12;
    	let variablesscrolly;
    	let t13;
    	let p1;
    	let raw1_value = katexify("E = " + /*$E0*/ ctx[0] + " - " + /*$b*/ ctx[1] + " \\log(i) - " + String(/*$R*/ ctx[2] * 1000).slice(0, 4) + "i - " + /*$m*/ ctx[3] + "\\exp(" + /*$n*/ ctx[4] + "i)") + "";
    	let t14;
    	let div8;
    	let div6;
    	let div1;
    	let label0;
    	let raw2_value = katexify("E_0:") + "";
    	let t15;
    	let input0;
    	let t16;
    	let span0;
    	let t17;
    	let t18;
    	let html_tag;
    	let raw3_value = katexify("V") + "";
    	let t19;
    	let div2;
    	let label1;
    	let raw4_value = katexify("b:") + "";
    	let t20;
    	let input1;
    	let t21;
    	let span1;
    	let t22;
    	let t23;
    	let html_tag_1;
    	let raw5_value = katexify("V") + "";
    	let t24;
    	let div3;
    	let label2;
    	let raw6_value = katexify("R:") + "";
    	let t25;
    	let input2;
    	let t26;
    	let span2;
    	let t27_value = String(/*$R*/ ctx[2] * 1000).slice(0, 4) + "";
    	let t27;
    	let t28;
    	let html_tag_2;
    	let raw7_value = katexify("/cm^2") + "";
    	let t29;
    	let div4;
    	let label3;
    	let raw8_value = katexify("m:") + "";
    	let t30;
    	let input3;
    	let t31;
    	let span3;
    	let t32;
    	let t33;
    	let html_tag_3;
    	let raw9_value = katexify("V") + "";
    	let t34;
    	let div5;
    	let label4;
    	let raw10_value = katexify("n:") + "";
    	let t35;
    	let input4;
    	let t36;
    	let span4;
    	let t37;
    	let t38;
    	let html_tag_4;
    	let raw11_value = katexify("cm^2/mA") + "";
    	let t39;
    	let div7;
    	let chart;
    	let t40;
    	let references;
    	let current;
    	let mounted;
    	let dispose;
    	diagramfc = new DiagramFC({ $$inline: true });
    	why = new Why({ $$inline: true });
    	variablesscrolly = new VariablesScrolly({ $$inline: true });

    	chart = new Chart({
    			props: {
    				E0: /*E0*/ ctx[5],
    				b: /*b*/ ctx[6],
    				R: /*R*/ ctx[7],
    				m: /*m*/ ctx[8],
    				n: /*n*/ ctx[9]
    			},
    			$$inline: true
    		});

    	references = new References({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Fuel Cells:";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "A Quick Introduction to a Fuel Cell's Current-Density vs. Voltage Curve";
    			t3 = space();
    			h3 = element("h3");
    			a0 = element("a");
    			a0.textContent = "Katelyn";
    			t5 = text$2("\r\n\t\t\tand ");
    			a1 = element("a");
    			a1.textContent = "Jonathan";
    			t7 = space();
    			br = element("br");
    			t8 = text$2("\r\n            May - June 2024");
    			t9 = space();
    			create_component(diagramfc.$$.fragment);
    			t10 = space();
    			create_component(why.$$.fragment);
    			t11 = space();
    			p0 = element("p");
    			t12 = space();
    			create_component(variablesscrolly.$$.fragment);
    			t13 = space();
    			p1 = element("p");
    			t14 = space();
    			div8 = element("div");
    			div6 = element("div");
    			div1 = element("div");
    			label0 = element("label");
    			t15 = space();
    			input0 = element("input");
    			t16 = space();
    			span0 = element("span");
    			t17 = text$2(/*$E0*/ ctx[0]);
    			t18 = space();
    			html_tag = new HtmlTag(false);
    			t19 = space();
    			div2 = element("div");
    			label1 = element("label");
    			t20 = space();
    			input1 = element("input");
    			t21 = space();
    			span1 = element("span");
    			t22 = text$2(/*$b*/ ctx[1]);
    			t23 = space();
    			html_tag_1 = new HtmlTag(false);
    			t24 = space();
    			div3 = element("div");
    			label2 = element("label");
    			t25 = space();
    			input2 = element("input");
    			t26 = space();
    			span2 = element("span");
    			t27 = text$2(t27_value);
    			t28 = text$2(" Ω");
    			html_tag_2 = new HtmlTag(false);
    			t29 = space();
    			div4 = element("div");
    			label3 = element("label");
    			t30 = space();
    			input3 = element("input");
    			t31 = space();
    			span3 = element("span");
    			t32 = text$2(/*$m*/ ctx[3]);
    			t33 = space();
    			html_tag_3 = new HtmlTag(false);
    			t34 = space();
    			div5 = element("div");
    			label4 = element("label");
    			t35 = space();
    			input4 = element("input");
    			t36 = space();
    			span4 = element("span");
    			t37 = text$2(/*$n*/ ctx[4]);
    			t38 = space();
    			html_tag_4 = new HtmlTag(false);
    			t39 = space();
    			div7 = element("div");
    			create_component(chart.$$.fragment);
    			t40 = space();
    			create_component(references.$$.fragment);
    			attr_dev(h1, "id", "intro-hed");
    			attr_dev(h1, "class", "svelte-w45xyg");
    			add_location(h1, file, 19, 8, 606);
    			add_location(h2, file, 20, 8, 651);
    			attr_dev(a0, "href", "https://github.com/katemae");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-w45xyg");
    			add_location(a0, file, 22, 3, 766);
    			attr_dev(a1, "href", "https://github.com/jman2-go");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-w45xyg");
    			add_location(a1, file, 23, 7, 839);
    			add_location(br, file, 24, 3, 910);
    			attr_dev(h3, "id", "intro_date");
    			attr_dev(h3, "class", "svelte-w45xyg");
    			add_location(h3, file, 21, 8, 741);
    			attr_dev(div0, "class", "intro svelte-w45xyg");
    			add_location(div0, file, 18, 4, 577);
    			attr_dev(p0, "id", "desc");
    			attr_dev(p0, "class", "svelte-w45xyg");
    			add_location(p0, file, 32, 4, 1012);
    			attr_dev(p1, "id", "desc");
    			attr_dev(p1, "class", "svelte-w45xyg");
    			add_location(p1, file, 38, 4, 1140);
    			attr_dev(label0, "class", "svelte-w45xyg");
    			add_location(label0, file, 47, 16, 1450);
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", "1.2");
    			attr_dev(input0, "step", "0.01");
    			add_location(input0, file, 48, 16, 1508);
    			html_tag.a = null;
    			add_location(span0, file, 49, 16, 1595);
    			attr_dev(div1, "class", "control svelte-w45xyg");
    			add_location(div1, file, 46, 12, 1411);
    			attr_dev(label1, "class", "svelte-w45xyg");
    			add_location(label1, file, 52, 16, 1708);
    			attr_dev(input1, "type", "range");
    			attr_dev(input1, "min", "0.01");
    			attr_dev(input1, "max", "0.1");
    			attr_dev(input1, "step", "0.001");
    			add_location(input1, file, 53, 16, 1764);
    			html_tag_1.a = null;
    			add_location(span1, file, 54, 16, 1854);
    			attr_dev(div2, "class", "control svelte-w45xyg");
    			add_location(div2, file, 51, 12, 1669);
    			attr_dev(label2, "class", "svelte-w45xyg");
    			add_location(label2, file, 57, 16, 1966);
    			attr_dev(input2, "type", "range");
    			attr_dev(input2, "min", "10e-6");
    			attr_dev(input2, "max", "1000e-6");
    			attr_dev(input2, "step", "10e-6");
    			add_location(input2, file, 58, 16, 2022);
    			html_tag_2.a = null;
    			add_location(span2, file, 59, 16, 2117);
    			attr_dev(div3, "class", "control svelte-w45xyg");
    			add_location(div3, file, 56, 12, 1927);
    			attr_dev(label3, "class", "svelte-w45xyg");
    			add_location(label3, file, 62, 16, 2264);
    			attr_dev(input3, "type", "range");
    			attr_dev(input3, "min", "1e-5");
    			attr_dev(input3, "max", "10e-5");
    			attr_dev(input3, "step", "1e-6");
    			add_location(input3, file, 63, 16, 2320);
    			html_tag_3.a = null;
    			add_location(span3, file, 64, 16, 2411);
    			attr_dev(div4, "class", "control svelte-w45xyg");
    			add_location(div4, file, 61, 12, 2225);
    			attr_dev(label4, "class", "svelte-w45xyg");
    			add_location(label4, file, 67, 16, 2523);
    			attr_dev(input4, "type", "range");
    			attr_dev(input4, "min", "1e-3");
    			attr_dev(input4, "max", "10e-3");
    			attr_dev(input4, "step", "1e-4");
    			add_location(input4, file, 68, 16, 2579);
    			html_tag_4.a = null;
    			add_location(span4, file, 69, 16, 2670);
    			attr_dev(div5, "class", "control svelte-w45xyg");
    			add_location(div5, file, 66, 12, 2484);
    			attr_dev(div6, "class", "controls-container svelte-w45xyg");
    			add_location(div6, file, 45, 8, 1365);
    			attr_dev(div7, "class", "graph-container svelte-w45xyg");
    			add_location(div7, file, 73, 8, 2763);
    			attr_dev(div8, "class", "chart-container svelte-w45xyg");
    			add_location(div8, file, 44, 4, 1326);
    			add_location(main, file, 17, 0, 565);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div0, t3);
    			append_dev(div0, h3);
    			append_dev(h3, a0);
    			append_dev(h3, t5);
    			append_dev(h3, a1);
    			append_dev(h3, t7);
    			append_dev(h3, br);
    			append_dev(h3, t8);
    			append_dev(main, t9);
    			mount_component(diagramfc, main, null);
    			append_dev(main, t10);
    			mount_component(why, main, null);
    			append_dev(main, t11);
    			append_dev(main, p0);
    			p0.innerHTML = raw0_value;
    			append_dev(main, t12);
    			mount_component(variablesscrolly, main, null);
    			append_dev(main, t13);
    			append_dev(main, p1);
    			p1.innerHTML = raw1_value;
    			append_dev(main, t14);
    			append_dev(main, div8);
    			append_dev(div8, div6);
    			append_dev(div6, div1);
    			append_dev(div1, label0);
    			label0.innerHTML = raw2_value;
    			append_dev(div1, t15);
    			append_dev(div1, input0);
    			set_input_value(input0, /*$E0*/ ctx[0]);
    			append_dev(div1, t16);
    			append_dev(div1, span0);
    			append_dev(span0, t17);
    			append_dev(span0, t18);
    			html_tag.m(raw3_value, span0);
    			append_dev(div6, t19);
    			append_dev(div6, div2);
    			append_dev(div2, label1);
    			label1.innerHTML = raw4_value;
    			append_dev(div2, t20);
    			append_dev(div2, input1);
    			set_input_value(input1, /*$b*/ ctx[1]);
    			append_dev(div2, t21);
    			append_dev(div2, span1);
    			append_dev(span1, t22);
    			append_dev(span1, t23);
    			html_tag_1.m(raw5_value, span1);
    			append_dev(div6, t24);
    			append_dev(div6, div3);
    			append_dev(div3, label2);
    			label2.innerHTML = raw6_value;
    			append_dev(div3, t25);
    			append_dev(div3, input2);
    			set_input_value(input2, /*$R*/ ctx[2]);
    			append_dev(div3, t26);
    			append_dev(div3, span2);
    			append_dev(span2, t27);
    			append_dev(span2, t28);
    			html_tag_2.m(raw7_value, span2);
    			append_dev(div6, t29);
    			append_dev(div6, div4);
    			append_dev(div4, label3);
    			label3.innerHTML = raw8_value;
    			append_dev(div4, t30);
    			append_dev(div4, input3);
    			set_input_value(input3, /*$m*/ ctx[3]);
    			append_dev(div4, t31);
    			append_dev(div4, span3);
    			append_dev(span3, t32);
    			append_dev(span3, t33);
    			html_tag_3.m(raw9_value, span3);
    			append_dev(div6, t34);
    			append_dev(div6, div5);
    			append_dev(div5, label4);
    			label4.innerHTML = raw10_value;
    			append_dev(div5, t35);
    			append_dev(div5, input4);
    			set_input_value(input4, /*$n*/ ctx[4]);
    			append_dev(div5, t36);
    			append_dev(div5, span4);
    			append_dev(span4, t37);
    			append_dev(span4, t38);
    			html_tag_4.m(raw11_value, span4);
    			append_dev(div8, t39);
    			append_dev(div8, div7);
    			mount_component(chart, div7, null);
    			append_dev(main, t40);
    			mount_component(references, main, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_input_handler*/ ctx[10]),
    					listen_dev(input0, "input", /*input0_change_input_handler*/ ctx[10]),
    					listen_dev(input1, "change", /*input1_change_input_handler*/ ctx[11]),
    					listen_dev(input1, "input", /*input1_change_input_handler*/ ctx[11]),
    					listen_dev(input2, "change", /*input2_change_input_handler*/ ctx[12]),
    					listen_dev(input2, "input", /*input2_change_input_handler*/ ctx[12]),
    					listen_dev(input3, "change", /*input3_change_input_handler*/ ctx[13]),
    					listen_dev(input3, "input", /*input3_change_input_handler*/ ctx[13]),
    					listen_dev(input4, "change", /*input4_change_input_handler*/ ctx[14]),
    					listen_dev(input4, "input", /*input4_change_input_handler*/ ctx[14])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$E0, $b, $R, $m, $n*/ 31) && raw1_value !== (raw1_value = katexify("E = " + /*$E0*/ ctx[0] + " - " + /*$b*/ ctx[1] + " \\log(i) - " + String(/*$R*/ ctx[2] * 1000).slice(0, 4) + "i - " + /*$m*/ ctx[3] + "\\exp(" + /*$n*/ ctx[4] + "i)") + "")) p1.innerHTML = raw1_value;
    			if (dirty & /*$E0*/ 1) {
    				set_input_value(input0, /*$E0*/ ctx[0]);
    			}

    			if (!current || dirty & /*$E0*/ 1) set_data_dev(t17, /*$E0*/ ctx[0]);

    			if (dirty & /*$b*/ 2) {
    				set_input_value(input1, /*$b*/ ctx[1]);
    			}

    			if (!current || dirty & /*$b*/ 2) set_data_dev(t22, /*$b*/ ctx[1]);

    			if (dirty & /*$R*/ 4) {
    				set_input_value(input2, /*$R*/ ctx[2]);
    			}

    			if ((!current || dirty & /*$R*/ 4) && t27_value !== (t27_value = String(/*$R*/ ctx[2] * 1000).slice(0, 4) + "")) set_data_dev(t27, t27_value);

    			if (dirty & /*$m*/ 8) {
    				set_input_value(input3, /*$m*/ ctx[3]);
    			}

    			if (!current || dirty & /*$m*/ 8) set_data_dev(t32, /*$m*/ ctx[3]);

    			if (dirty & /*$n*/ 16) {
    				set_input_value(input4, /*$n*/ ctx[4]);
    			}

    			if (!current || dirty & /*$n*/ 16) set_data_dev(t37, /*$n*/ ctx[4]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(diagramfc.$$.fragment, local);
    			transition_in(why.$$.fragment, local);
    			transition_in(variablesscrolly.$$.fragment, local);
    			transition_in(chart.$$.fragment, local);
    			transition_in(references.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(diagramfc.$$.fragment, local);
    			transition_out(why.$$.fragment, local);
    			transition_out(variablesscrolly.$$.fragment, local);
    			transition_out(chart.$$.fragment, local);
    			transition_out(references.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(diagramfc);
    			destroy_component(why);
    			destroy_component(variablesscrolly);
    			destroy_component(chart);
    			destroy_component(references);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $E0;
    	let $b;
    	let $R;
    	let $m;
    	let $n;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const E0 = writable(1.0);
    	validate_store(E0, 'E0');
    	component_subscribe($$self, E0, value => $$invalidate(0, $E0 = value));
    	const b = writable(0.05);
    	validate_store(b, 'b');
    	component_subscribe($$self, b, value => $$invalidate(1, $b = value));
    	const R = writable(30e-6);
    	validate_store(R, 'R');
    	component_subscribe($$self, R, value => $$invalidate(2, $R = value));
    	const m = writable(3e-5);
    	validate_store(m, 'm');
    	component_subscribe($$self, m, value => $$invalidate(3, $m = value));
    	const n = writable(8e-3);
    	validate_store(n, 'n');
    	component_subscribe($$self, n, value => $$invalidate(4, $n = value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_change_input_handler() {
    		$E0 = to_number(this.value);
    		E0.set($E0);
    	}

    	function input1_change_input_handler() {
    		$b = to_number(this.value);
    		b.set($b);
    	}

    	function input2_change_input_handler() {
    		$R = to_number(this.value);
    		R.set($R);
    	}

    	function input3_change_input_handler() {
    		$m = to_number(this.value);
    		m.set($m);
    	}

    	function input4_change_input_handler() {
    		$n = to_number(this.value);
    		n.set($n);
    	}

    	$$self.$capture_state = () => ({
    		Chart,
    		VariablesScrolly,
    		DiagramFC,
    		Why,
    		References,
    		writable,
    		katexify,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		$E0,
    		$b,
    		$R,
    		$m,
    		$n
    	});

    	return [
    		$E0,
    		$b,
    		$R,
    		$m,
    		$n,
    		E0,
    		b,
    		R,
    		m,
    		n,
    		input0_change_input_handler,
    		input1_change_input_handler,
    		input2_change_input_handler,
    		input3_change_input_handler,
    		input4_change_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
