function debounce(t, n) {
  let i;
  return (...e) => {
    clearTimeout(i),
      (i = setTimeout(() => {
        t.apply(this, e);
      }, n));
  };
}
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.ClipboardJS = t())
    : (e.ClipboardJS = t());
})(this, function () {
  return (
    (n = [
      function (e, t, n) {
        var i;
        (n = [e, n(7)]),
          void 0 !==
            (t =
              "function" ==
              typeof (i = function (e, t) {
                "use strict";
                function n(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                }
                var i = (function (e) {
                    return e && e.__esModule ? e : { default: e };
                  })(t),
                  r =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                      ? function (e) {
                          return typeof e;
                        }
                      : function (e) {
                          return e &&
                            "function" == typeof Symbol &&
                            e.constructor === Symbol &&
                            e !== Symbol.prototype
                            ? "symbol"
                            : typeof e;
                        },
                  o = (function () {
                    function i(e, t) {
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        (i.enumerable = i.enumerable || !1),
                          (i.configurable = !0),
                          "value" in i && (i.writable = !0),
                          Object.defineProperty(e, i.key, i);
                      }
                    }
                    return function (e, t, n) {
                      return t && i(e.prototype, t), n && i(e, n), e;
                    };
                  })(),
                  s = (function () {
                    function t(e) {
                      n(this, t), this.resolveOptions(e), this.initSelection();
                    }
                    return (
                      o(t, [
                        {
                          key: "resolveOptions",
                          value: function () {
                            var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {};
                            (this.action = e.action),
                              (this.container = e.container),
                              (this.emitter = e.emitter),
                              (this.target = e.target),
                              (this.text = e.text),
                              (this.trigger = e.trigger),
                              (this.selectedText = "");
                          },
                        },
                        {
                          key: "initSelection",
                          value: function () {
                            this.text
                              ? this.selectFake()
                              : this.target && this.selectTarget();
                          },
                        },
                        {
                          key: "selectFake",
                          value: function () {
                            var e = this,
                              t =
                                "rtl" ==
                                document.documentElement.getAttribute("dir");
                            this.removeFake(),
                              (this.fakeHandlerCallback = function () {
                                return e.removeFake();
                              }),
                              (this.fakeHandler =
                                this.container.addEventListener(
                                  "click",
                                  this.fakeHandlerCallback
                                ) || !0),
                              (this.fakeElem =
                                document.createElement("textarea")),
                              (this.fakeElem.style.fontSize = "12pt"),
                              (this.fakeElem.style.border = "0"),
                              (this.fakeElem.style.padding = "0"),
                              (this.fakeElem.style.margin = "0"),
                              (this.fakeElem.style.position = "absolute"),
                              (this.fakeElem.style[t ? "right" : "left"] =
                                "-9999px");
                            var n =
                              window.pageYOffset ||
                              document.documentElement.scrollTop;
                            (this.fakeElem.style.top = n + "px"),
                              this.fakeElem.setAttribute("readonly", ""),
                              (this.fakeElem.value = this.text),
                              this.container.appendChild(this.fakeElem),
                              (this.selectedText = (0, i.default)(
                                this.fakeElem
                              )),
                              this.copyText();
                          },
                        },
                        {
                          key: "removeFake",
                          value: function () {
                            this.fakeHandler &&
                              (this.container.removeEventListener(
                                "click",
                                this.fakeHandlerCallback
                              ),
                              (this.fakeHandler = null),
                              (this.fakeHandlerCallback = null)),
                              this.fakeElem &&
                                (this.container.removeChild(this.fakeElem),
                                (this.fakeElem = null));
                          },
                        },
                        {
                          key: "selectTarget",
                          value: function () {
                            (this.selectedText = (0, i.default)(this.target)),
                              this.copyText();
                          },
                        },
                        {
                          key: "copyText",
                          value: function () {
                            var t = void 0;
                            try {
                              t = document.execCommand(this.action);
                            } catch (e) {
                              t = !1;
                            }
                            this.handleResult(t);
                          },
                        },
                        {
                          key: "handleResult",
                          value: function (e) {
                            this.emitter.emit(e ? "success" : "error", {
                              action: this.action,
                              text: this.selectedText,
                              trigger: this.trigger,
                              clearSelection: this.clearSelection.bind(this),
                            });
                          },
                        },
                        {
                          key: "clearSelection",
                          value: function () {
                            this.trigger && this.trigger.focus(),
                              window.getSelection().removeAllRanges();
                          },
                        },
                        {
                          key: "destroy",
                          value: function () {
                            this.removeFake();
                          },
                        },
                        {
                          key: "action",
                          set: function () {
                            var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : "copy";
                            if (
                              ((this._action = e),
                              "copy" !== this._action && "cut" !== this._action)
                            )
                              throw new Error(
                                'Invalid "action" value, use either "copy" or "cut"'
                              );
                          },
                          get: function () {
                            return this._action;
                          },
                        },
                        {
                          key: "target",
                          set: function (e) {
                            if (void 0 !== e) {
                              if (
                                !e ||
                                "object" !==
                                  (void 0 === e ? "undefined" : r(e)) ||
                                1 !== e.nodeType
                              )
                                throw new Error(
                                  'Invalid "target" value, use a valid Element'
                                );
                              if (
                                "copy" === this.action &&
                                e.hasAttribute("disabled")
                              )
                                throw new Error(
                                  'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                                );
                              if (
                                "cut" === this.action &&
                                (e.hasAttribute("readonly") ||
                                  e.hasAttribute("disabled"))
                              )
                                throw new Error(
                                  'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                                );
                              this._target = e;
                            }
                          },
                          get: function () {
                            return this._target;
                          },
                        },
                      ]),
                      t
                    );
                  })();
                e.exports = s;
              })
                ? i.apply(t, n)
                : i) && (e.exports = t);
      },
      function (e, t, n) {
        var u = n(6),
          c = n(5);
        e.exports = function (e, t, n) {
          if (!e && !t && !n) throw new Error("Missing required arguments");
          if (!u.string(t))
            throw new TypeError("Second argument must be a String");
          if (!u.fn(n))
            throw new TypeError("Third argument must be a Function");
          if (u.node(e))
            return (
              (r = t),
              (o = n),
              (i = e).addEventListener(r, o),
              {
                destroy: function () {
                  i.removeEventListener(r, o);
                },
              }
            );
          var i, r, o, s, a, l;
          if (u.nodeList(e))
            return (
              (s = e),
              (a = t),
              (l = n),
              Array.prototype.forEach.call(s, function (e) {
                e.addEventListener(a, l);
              }),
              {
                destroy: function () {
                  Array.prototype.forEach.call(s, function (e) {
                    e.removeEventListener(a, l);
                  });
                },
              }
            );
          if (u.string(e)) return c(document.body, e, t, n);
          throw new TypeError(
            "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
          );
        };
      },
      function (e, t) {
        function n() {}
        (n.prototype = {
          on: function (e, t, n) {
            var i = this.e || (this.e = {});
            return (i[e] || (i[e] = [])).push({ fn: t, ctx: n }), this;
          },
          once: function (e, t, n) {
            function i() {
              r.off(e, i), t.apply(n, arguments);
            }
            var r = this;
            return (i._ = t), this.on(e, i, n);
          },
          emit: function (e) {
            for (
              var t = [].slice.call(arguments, 1),
                n = ((this.e || (this.e = {}))[e] || []).slice(),
                i = 0,
                r = n.length;
              i < r;
              i++
            )
              n[i].fn.apply(n[i].ctx, t);
            return this;
          },
          off: function (e, t) {
            var n = this.e || (this.e = {}),
              i = n[e],
              r = [];
            if (i && t)
              for (var o = 0, s = i.length; o < s; o++)
                i[o].fn !== t && i[o].fn._ !== t && r.push(i[o]);
            return r.length ? (n[e] = r) : delete n[e], this;
          },
        }),
          (e.exports = n);
      },
      function (e, t, n) {
        var i;
        (n = [e, n(0), n(2), n(1)]),
          void 0 !==
            (t =
              "function" ==
              typeof (i = function (e, t, n, i) {
                "use strict";
                function r(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function o(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                }
                function s(e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                }
                function a(e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " +
                        typeof t
                    );
                  (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    t &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, t)
                        : (e.__proto__ = t));
                }
                function l(e, t) {
                  var n = "data-clipboard-" + e;
                  if (t.hasAttribute(n)) return t.getAttribute(n);
                }
                var u = r(t),
                  c = r(n),
                  d = r(i),
                  f =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                      ? function (e) {
                          return typeof e;
                        }
                      : function (e) {
                          return e &&
                            "function" == typeof Symbol &&
                            e.constructor === Symbol &&
                            e !== Symbol.prototype
                            ? "symbol"
                            : typeof e;
                        },
                  p = (function () {
                    function i(e, t) {
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        (i.enumerable = i.enumerable || !1),
                          (i.configurable = !0),
                          "value" in i && (i.writable = !0),
                          Object.defineProperty(e, i.key, i);
                      }
                    }
                    return function (e, t, n) {
                      return t && i(e.prototype, t), n && i(e, n), e;
                    };
                  })(),
                  h = (function (e) {
                    function i(e, t) {
                      o(this, i);
                      var n = s(
                        this,
                        (i.__proto__ || Object.getPrototypeOf(i)).call(this)
                      );
                      return n.resolveOptions(t), n.listenClick(e), n;
                    }
                    return (
                      a(i, e),
                      p(
                        i,
                        [
                          {
                            key: "resolveOptions",
                            value: function () {
                              var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                  ? arguments[0]
                                  : {};
                              (this.action =
                                "function" == typeof e.action
                                  ? e.action
                                  : this.defaultAction),
                                (this.target =
                                  "function" == typeof e.target
                                    ? e.target
                                    : this.defaultTarget),
                                (this.text =
                                  "function" == typeof e.text
                                    ? e.text
                                    : this.defaultText),
                                (this.container =
                                  "object" === f(e.container)
                                    ? e.container
                                    : document.body);
                            },
                          },
                          {
                            key: "listenClick",
                            value: function (e) {
                              var t = this;
                              this.listener = (0, d.default)(
                                e,
                                "click",
                                function (e) {
                                  return t.onClick(e);
                                }
                              );
                            },
                          },
                          {
                            key: "onClick",
                            value: function (e) {
                              var t = e.delegateTarget || e.currentTarget;
                              this.clipboardAction &&
                                (this.clipboardAction = null),
                                (this.clipboardAction = new u.default({
                                  action: this.action(t),
                                  target: this.target(t),
                                  text: this.text(t),
                                  container: this.container,
                                  trigger: t,
                                  emitter: this,
                                }));
                            },
                          },
                          {
                            key: "defaultAction",
                            value: function (e) {
                              return l("action", e);
                            },
                          },
                          {
                            key: "defaultTarget",
                            value: function (e) {
                              var t = l("target", e);
                              if (t) return document.querySelector(t);
                            },
                          },
                          {
                            key: "defaultText",
                            value: function (e) {
                              return l("text", e);
                            },
                          },
                          {
                            key: "destroy",
                            value: function () {
                              this.listener.destroy(),
                                this.clipboardAction &&
                                  (this.clipboardAction.destroy(),
                                  (this.clipboardAction = null));
                            },
                          },
                        ],
                        [
                          {
                            key: "isSupported",
                            value: function () {
                              var e =
                                  arguments.length > 0 &&
                                  void 0 !== arguments[0]
                                    ? arguments[0]
                                    : ["copy", "cut"],
                                t = "string" == typeof e ? [e] : e,
                                n = !!document.queryCommandSupported;
                              return (
                                t.forEach(function (e) {
                                  n = n && !!document.queryCommandSupported(e);
                                }),
                                n
                              );
                            },
                          },
                        ]
                      ),
                      i
                    );
                  })(c.default);
                e.exports = h;
              })
                ? i.apply(t, n)
                : i) && (e.exports = t);
      },
      function (e, t) {
        var n;
        "undefined" == typeof Element ||
          Element.prototype.matches ||
          ((n = Element.prototype).matches =
            n.matchesSelector ||
            n.mozMatchesSelector ||
            n.msMatchesSelector ||
            n.oMatchesSelector ||
            n.webkitMatchesSelector),
          (e.exports = function (e, t) {
            for (; e && 9 !== e.nodeType; ) {
              if ("function" == typeof e.matches && e.matches(t)) return e;
              e = e.parentNode;
            }
          });
      },
      function (e, t, n) {
        function o(e, t, n, i, r) {
          var o = function (t, n, e, i) {
            return function (e) {
              (e.delegateTarget = s(e.target, n)),
                e.delegateTarget && i.call(t, e);
            };
          }.apply(this, arguments);
          return (
            e.addEventListener(n, o, r),
            {
              destroy: function () {
                e.removeEventListener(n, o, r);
              },
            }
          );
        }
        var s = n(4);
        e.exports = function (e, t, n, i, r) {
          return "function" == typeof e.addEventListener
            ? o.apply(null, arguments)
            : "function" == typeof n
            ? o.bind(null, document).apply(null, arguments)
            : ("string" == typeof e && (e = document.querySelectorAll(e)),
              Array.prototype.map.call(e, function (e) {
                return o(e, t, n, i, r);
              }));
        };
      },
      function (e, n) {
        (n.node = function (e) {
          return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType;
        }),
          (n.nodeList = function (e) {
            var t = Object.prototype.toString.call(e);
            return (
              void 0 !== e &&
              ("[object NodeList]" === t || "[object HTMLCollection]" === t) &&
              "length" in e &&
              (0 === e.length || n.node(e[0]))
            );
          }),
          (n.string = function (e) {
            return "string" == typeof e || e instanceof String;
          }),
          (n.fn = function (e) {
            return "[object Function]" === Object.prototype.toString.call(e);
          });
      },
      function (e, t) {
        e.exports = function (e) {
          var t, n;
          return (e =
            "SELECT" === e.nodeName
              ? (e.focus(), e.value)
              : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName
              ? ((t = e.hasAttribute("readonly")) ||
                  e.setAttribute("readonly", ""),
                e.select(),
                e.setSelectionRange(0, e.value.length),
                t || e.removeAttribute("readonly"),
                e.value)
              : (e.hasAttribute("contenteditable") && e.focus(),
                (t = window.getSelection()),
                (n = document.createRange()).selectNodeContents(e),
                t.removeAllRanges(),
                t.addRange(n),
                t.toString()));
        };
      },
    ]),
    (r = {}),
    (i.m = n),
    (i.c = r),
    (i.i = function (e) {
      return e;
    }),
    (i.d = function (e, t, n) {
      i.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ""),
    i((i.s = 3))
  );
  function i(e) {
    if (r[e]) return r[e].exports;
    var t = (r[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  var n, r;
}),
  !(function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (e.document) return t(e);
              throw new Error("jQuery requires a window with a document");
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (b, F) {
    "use strict";
    function y(e) {
      return "function" == typeof e && "number" != typeof e.nodeType;
    }
    function m(e) {
      return null != e && e === e.window;
    }
    var e = [],
      w = b.document,
      N = Object.getPrototypeOf,
      a = e.slice,
      j = e.concat,
      $ = e.push,
      B = e.indexOf,
      G = {},
      q = G.toString,
      U = G.hasOwnProperty,
      V = U.toString,
      H = V.call(Object),
      g = {},
      z = { type: !0, src: !0, noModule: !0 };
    function W(e, t, n) {
      var i,
        r = (t = t || w).createElement("script");
      if (((r.text = e), n)) for (i in z) n[i] && (r[i] = n[i]);
      t.head.appendChild(r).parentNode.removeChild(r);
    }
    function h(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? G[q.call(e)] || "object"
        : typeof e;
    }
    var T = function (e, t) {
        return new T.fn.init(e, t);
      },
      Y = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function X(e) {
      var t = !!e && "length" in e && e.length,
        n = h(e);
      return (
        !y(e) &&
        !m(e) &&
        ("array" === n ||
          0 === t ||
          ("number" == typeof t && 0 < t && t - 1 in e))
      );
    }
    (T.fn = T.prototype =
      {
        jquery: "3.3.1",
        constructor: T,
        length: 0,
        toArray: function () {
          return a.call(this);
        },
        get: function (e) {
          return null == e
            ? a.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          e = T.merge(this.constructor(), e);
          return (e.prevObject = this), e;
        },
        each: function (e) {
          return T.each(this, e);
        },
        map: function (n) {
          return this.pushStack(
            T.map(this, function (e, t) {
              return n.call(e, t, e);
            })
          );
        },
        slice: function () {
          return this.pushStack(a.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            e = +e + (e < 0 ? t : 0);
          return this.pushStack(0 <= e && e < t ? [this[e]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: $,
        sort: e.sort,
        splice: e.splice,
      }),
      (T.extend = T.fn.extend =
        function () {
          var e,
            t,
            n,
            i,
            r,
            o = arguments[0] || {},
            s = 1,
            a = arguments.length,
            l = !1;
          for (
            "boolean" == typeof o && ((l = o), (o = arguments[s] || {}), s++),
              "object" == typeof o || y(o) || (o = {}),
              s === a && ((o = this), s--);
            s < a;
            s++
          )
            if (null != (e = arguments[s]))
              for (t in e)
                (r = o[t]),
                  o !== (n = e[t]) &&
                    (l && n && (T.isPlainObject(n) || (i = Array.isArray(n)))
                      ? ((r = i
                          ? ((i = !1), r && Array.isArray(r) ? r : [])
                          : r && T.isPlainObject(r)
                          ? r
                          : {}),
                        (o[t] = T.extend(l, r, n)))
                      : void 0 !== n && (o[t] = n));
          return o;
        }),
      T.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          return !(
            !e ||
            "[object Object]" !== q.call(e) ||
            ((e = N(e)) &&
              ("function" !=
                typeof (e = U.call(e, "constructor") && e.constructor) ||
                V.call(e) !== H))
          );
        },
        isEmptyObject: function (e) {
          for (var t in e) return !1;
          return !0;
        },
        globalEval: function (e) {
          W(e);
        },
        each: function (e, t) {
          var n,
            i = 0;
          if (X(e))
            for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
          else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(Y, "");
        },
        makeArray: function (e, t) {
          t = t || [];
          return (
            null != e &&
              (X(Object(e))
                ? T.merge(t, "string" == typeof e ? [e] : e)
                : $.call(t, e)),
            t
          );
        },
        inArray: function (e, t, n) {
          return null == t ? -1 : B.call(t, e, n);
        },
        merge: function (e, t) {
          for (var n = +t.length, i = 0, r = e.length; i < n; i++)
            e[r++] = t[i];
          return (e.length = r), e;
        },
        grep: function (e, t, n) {
          for (var i = [], r = 0, o = e.length, s = !n; r < o; r++)
            !t(e[r], r) != s && i.push(e[r]);
          return i;
        },
        map: function (e, t, n) {
          var i,
            r,
            o = 0,
            s = [];
          if (X(e))
            for (i = e.length; o < i; o++)
              null != (r = t(e[o], o, n)) && s.push(r);
          else for (o in e) null != (r = t(e[o], o, n)) && s.push(r);
          return j.apply([], s);
        },
        guid: 1,
        support: g,
      }),
      "function" == typeof Symbol &&
        (T.fn[Symbol.iterator] = e[Symbol.iterator]),
      T.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          G["[object " + t + "]"] = t.toLowerCase();
        }
      );
    function i(e, t, n) {
      for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (r && T(e).is(n)) break;
          i.push(e);
        }
      return i;
    }
    function Z(e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    }
    var e = (function (n) {
        function d(e, t, n) {
          var i = "0x" + t - 65536;
          return i != i || n
            ? t
            : i < 0
            ? String.fromCharCode(65536 + i)
            : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
        }
        function F(e, t) {
          return t
            ? "\0" === e
              ? "ï¿½"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        }
        function N() {
          w();
        }
        var e,
          p,
          E,
          o,
          j,
          h,
          $,
          B,
          b,
          l,
          u,
          w,
          T,
          i,
          S,
          m,
          r,
          s,
          g,
          I = "sizzle" + +new Date(),
          v = n.document,
          k = 0,
          G = 0,
          q = ce(),
          U = ce(),
          y = ce(),
          V = function (e, t) {
            return e === t && (u = !0), 0;
          },
          H = {}.hasOwnProperty,
          t = [],
          z = t.pop,
          W = t.push,
          C = t.push,
          Y = t.slice,
          _ = function (e, t) {
            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            return -1;
          },
          X =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          a = "[\\x20\\t\\r\\n\\f]",
          c = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
          Z =
            "\\[" +
            a +
            "*(" +
            c +
            ")(?:" +
            a +
            "*([*^$|!~]?=)" +
            a +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            c +
            "))|)" +
            a +
            "*\\]",
          K =
            ":(" +
            c +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            Z +
            ")*)|.*)\\)|)",
          J = new RegExp(a + "+", "g"),
          x = new RegExp(
            "^" + a + "+|((?:^|[^\\\\])(?:\\\\.)*)" + a + "+$",
            "g"
          ),
          Q = new RegExp("^" + a + "*," + a + "*"),
          ee = new RegExp("^" + a + "*([>+~]|" + a + ")" + a + "*"),
          te = new RegExp("=" + a + "*([^\\]'\"]*?)" + a + "*\\]", "g"),
          ne = new RegExp(K),
          ie = new RegExp("^" + c + "$"),
          f = {
            ID: new RegExp("^#(" + c + ")"),
            CLASS: new RegExp("^\\.(" + c + ")"),
            TAG: new RegExp("^(" + c + "|[*])"),
            ATTR: new RegExp("^" + Z),
            PSEUDO: new RegExp("^" + K),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                a +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                a +
                "*(?:([+-]|)" +
                a +
                "*(\\d+)|))" +
                a +
                "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + X + ")$", "i"),
            needsContext: new RegExp(
              "^" +
                a +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                a +
                "*((?:-\\d)?\\d*)" +
                a +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          re = /^(?:input|select|textarea|button)$/i,
          oe = /^h\d$/i,
          A = /^[^{]+\{\s*\[native \w/,
          se = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          ae = /[+~]/,
          D = new RegExp("\\\\([\\da-f]{1,6}" + a + "?|(" + a + ")|.)", "ig"),
          le = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
          ue = ge(
            function (e) {
              return !0 === e.disabled && ("form" in e || "label" in e);
            },
            { dir: "parentNode", next: "legend" }
          );
        try {
          C.apply((t = Y.call(v.childNodes)), v.childNodes),
            t[v.childNodes.length].nodeType;
        } catch (n) {
          C = {
            apply: t.length
              ? function (e, t) {
                  W.apply(e, Y.call(t));
                }
              : function (e, t) {
                  for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                  e.length = n - 1;
                },
          };
        }
        function O(e, t, n, i) {
          var r,
            o,
            s,
            a,
            l,
            u,
            c,
            d = t && t.ownerDocument,
            f = t ? t.nodeType : 9;
          if (
            ((n = n || []),
            "string" != typeof e || !e || (1 !== f && 9 !== f && 11 !== f))
          )
            return n;
          if (
            !i &&
            ((t ? t.ownerDocument || t : v) !== T && w(t), (t = t || T), S)
          ) {
            if (11 !== f && (l = se.exec(e)))
              if ((r = l[1])) {
                if (9 === f) {
                  if (!(s = t.getElementById(r))) return n;
                  if (s.id === r) return n.push(s), n;
                } else if (
                  d &&
                  (s = d.getElementById(r)) &&
                  g(t, s) &&
                  s.id === r
                )
                  return n.push(s), n;
              } else {
                if (l[2]) return C.apply(n, t.getElementsByTagName(e)), n;
                if (
                  (r = l[3]) &&
                  p.getElementsByClassName &&
                  t.getElementsByClassName
                )
                  return C.apply(n, t.getElementsByClassName(r)), n;
              }
            if (p.qsa && !y[e + " "] && (!m || !m.test(e))) {
              if (1 !== f) (d = t), (c = e);
              else if ("object" !== t.nodeName.toLowerCase()) {
                for (
                  (a = t.getAttribute("id"))
                    ? (a = a.replace(le, F))
                    : t.setAttribute("id", (a = I)),
                    o = (u = h(e)).length;
                  o--;

                )
                  u[o] = "#" + a + " " + L(u[o]);
                (c = u.join(",")), (d = (ae.test(e) && he(t.parentNode)) || t);
              }
              if (c)
                try {
                  return C.apply(n, d.querySelectorAll(c)), n;
                } catch (e) {
                } finally {
                  a === I && t.removeAttribute("id");
                }
            }
          }
          return B(e.replace(x, "$1"), t, n, i);
        }
        function ce() {
          var n = [];
          function i(e, t) {
            return (
              n.push(e + " ") > E.cacheLength && delete i[n.shift()],
              (i[e + " "] = t)
            );
          }
          return i;
        }
        function R(e) {
          return (e[I] = !0), e;
        }
        function P(e) {
          var t = T.createElement("fieldset");
          try {
            return !!e(t);
          } catch (e) {
            return !1;
          } finally {
            t.parentNode && t.parentNode.removeChild(t);
          }
        }
        function de(e, t) {
          for (var n = e.split("|"), i = n.length; i--; )
            E.attrHandle[n[i]] = t;
        }
        function fe(e, t) {
          var n = t && e,
            i =
              n &&
              1 === e.nodeType &&
              1 === t.nodeType &&
              e.sourceIndex - t.sourceIndex;
          if (i) return i;
          if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
          return e ? 1 : -1;
        }
        function pe(t) {
          return function (e) {
            return "form" in e
              ? e.parentNode && !1 === e.disabled
                ? "label" in e
                  ? "label" in e.parentNode
                    ? e.parentNode.disabled === t
                    : e.disabled === t
                  : e.isDisabled === t || (e.isDisabled !== !t && ue(e) === t)
                : e.disabled === t
              : "label" in e && e.disabled === t;
          };
        }
        function M(s) {
          return R(function (o) {
            return (
              (o = +o),
              R(function (e, t) {
                for (var n, i = s([], e.length, o), r = i.length; r--; )
                  e[(n = i[r])] && (e[n] = !(t[n] = e[n]));
              })
            );
          });
        }
        function he(e) {
          return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in ((p = O.support = {}),
        (j = O.isXML =
          function (e) {
            e = e && (e.ownerDocument || e).documentElement;
            return !!e && "HTML" !== e.nodeName;
          }),
        (w = O.setDocument =
          function (e) {
            var e = e ? e.ownerDocument || e : v;
            return (
              e !== T &&
                9 === e.nodeType &&
                e.documentElement &&
                ((i = (T = e).documentElement),
                (S = !j(T)),
                v !== T &&
                  (e = T.defaultView) &&
                  e.top !== e &&
                  (e.addEventListener
                    ? e.addEventListener("unload", N, !1)
                    : e.attachEvent && e.attachEvent("onunload", N)),
                (p.attributes = P(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (p.getElementsByTagName = P(function (e) {
                  return (
                    e.appendChild(T.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (p.getElementsByClassName = A.test(T.getElementsByClassName)),
                (p.getById = P(function (e) {
                  return (
                    (i.appendChild(e).id = I),
                    !T.getElementsByName || !T.getElementsByName(I).length
                  );
                })),
                p.getById
                  ? ((E.filter.ID = function (e) {
                      var t = e.replace(D, d);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }),
                    (E.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && S)
                        return (t = t.getElementById(e)) ? [t] : [];
                    }))
                  : ((E.filter.ID = function (e) {
                      var t = e.replace(D, d);
                      return function (e) {
                        e =
                          void 0 !== e.getAttributeNode &&
                          e.getAttributeNode("id");
                        return e && e.value === t;
                      };
                    }),
                    (E.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && S) {
                        var n,
                          i,
                          r,
                          o = t.getElementById(e);
                        if (o) {
                          if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                          for (
                            r = t.getElementsByName(e), i = 0;
                            (o = r[i++]);

                          )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                              return [o];
                        }
                        return [];
                      }
                    })),
                (E.find.TAG = p.getElementsByTagName
                  ? function (e, t) {
                      return void 0 !== t.getElementsByTagName
                        ? t.getElementsByTagName(e)
                        : p.qsa
                        ? t.querySelectorAll(e)
                        : void 0;
                    }
                  : function (e, t) {
                      var n,
                        i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                      if ("*" !== e) return o;
                      for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                      return i;
                    }),
                (E.find.CLASS =
                  p.getElementsByClassName &&
                  function (e, t) {
                    if (void 0 !== t.getElementsByClassName && S)
                      return t.getElementsByClassName(e);
                  }),
                (r = []),
                (m = []),
                (p.qsa = A.test(T.querySelectorAll)) &&
                  (P(function (e) {
                    (i.appendChild(e).innerHTML =
                      "<a id='" +
                      I +
                      "'></a><select id='" +
                      I +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      e.querySelectorAll("[msallowcapture^='']").length &&
                        m.push("[*^$]=" + a + "*(?:''|\"\")"),
                      e.querySelectorAll("[selected]").length ||
                        m.push("\\[" + a + "*(?:value|" + X + ")"),
                      e.querySelectorAll("[id~=" + I + "-]").length ||
                        m.push("~="),
                      e.querySelectorAll(":checked").length ||
                        m.push(":checked"),
                      e.querySelectorAll("a#" + I + "+*").length ||
                        m.push(".#.+[+~]");
                  }),
                  P(function (e) {
                    e.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = T.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("name", "D"),
                      e.querySelectorAll("[name=d]").length &&
                        m.push("name" + a + "*[*^$|!~]?="),
                      2 !== e.querySelectorAll(":enabled").length &&
                        m.push(":enabled", ":disabled"),
                      (i.appendChild(e).disabled = !0),
                      2 !== e.querySelectorAll(":disabled").length &&
                        m.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      m.push(",.*:");
                  })),
                (p.matchesSelector = A.test(
                  (s =
                    i.matches ||
                    i.webkitMatchesSelector ||
                    i.mozMatchesSelector ||
                    i.oMatchesSelector ||
                    i.msMatchesSelector)
                )) &&
                  P(function (e) {
                    (p.disconnectedMatch = s.call(e, "*")),
                      s.call(e, "[s!='']:x"),
                      r.push("!=", K);
                  }),
                (m = m.length && new RegExp(m.join("|"))),
                (r = r.length && new RegExp(r.join("|"))),
                (e = A.test(i.compareDocumentPosition)),
                (g =
                  e || A.test(i.contains)
                    ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                          t = t && t.parentNode;
                        return (
                          e === t ||
                          !(
                            !t ||
                            1 !== t.nodeType ||
                            !(n.contains
                              ? n.contains(t)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(t))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          for (; (t = t.parentNode); ) if (t === e) return !0;
                        return !1;
                      }),
                (V = e
                  ? function (e, t) {
                      return e === t
                        ? ((u = !0), 0)
                        : !e.compareDocumentPosition -
                            !t.compareDocumentPosition ||
                            (1 &
                              (n =
                                (e.ownerDocument || e) ===
                                (t.ownerDocument || t)
                                  ? e.compareDocumentPosition(t)
                                  : 1) ||
                            (!p.sortDetached &&
                              t.compareDocumentPosition(e) === n)
                              ? e === T || (e.ownerDocument === v && g(v, e))
                                ? -1
                                : t === T || (t.ownerDocument === v && g(v, t))
                                ? 1
                                : l
                                ? _(l, e) - _(l, t)
                                : 0
                              : 4 & n
                              ? -1
                              : 1);
                      var n;
                    }
                  : function (e, t) {
                      if (e === t) return (u = !0), 0;
                      var n,
                        i = 0,
                        r = e.parentNode,
                        o = t.parentNode,
                        s = [e],
                        a = [t];
                      if (!r || !o)
                        return e === T
                          ? -1
                          : t === T
                          ? 1
                          : r
                          ? -1
                          : o
                          ? 1
                          : l
                          ? _(l, e) - _(l, t)
                          : 0;
                      if (r === o) return fe(e, t);
                      for (n = e; (n = n.parentNode); ) s.unshift(n);
                      for (n = t; (n = n.parentNode); ) a.unshift(n);
                      for (; s[i] === a[i]; ) i++;
                      return i
                        ? fe(s[i], a[i])
                        : s[i] === v
                        ? -1
                        : a[i] === v
                        ? 1
                        : 0;
                    })),
              T
            );
          }),
        (O.matches = function (e, t) {
          return O(e, null, null, t);
        }),
        (O.matchesSelector = function (e, t) {
          if (
            ((e.ownerDocument || e) !== T && w(e),
            (t = t.replace(te, "='$1']")),
            p.matchesSelector &&
              S &&
              !y[t + " "] &&
              (!r || !r.test(t)) &&
              (!m || !m.test(t)))
          )
            try {
              var n = s.call(e, t);
              if (
                n ||
                p.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return n;
            } catch (e) {}
          return 0 < O(t, T, null, [e]).length;
        }),
        (O.contains = function (e, t) {
          return (e.ownerDocument || e) !== T && w(e), g(e, t);
        }),
        (O.attr = function (e, t) {
          (e.ownerDocument || e) !== T && w(e);
          var n = E.attrHandle[t.toLowerCase()],
            n =
              n && H.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !S) : void 0;
          return void 0 !== n
            ? n
            : p.attributes || !S
            ? e.getAttribute(t)
            : (n = e.getAttributeNode(t)) && n.specified
            ? n.value
            : null;
        }),
        (O.escape = function (e) {
          return (e + "").replace(le, F);
        }),
        (O.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (O.uniqueSort = function (e) {
          var t,
            n = [],
            i = 0,
            r = 0;
          if (
            ((u = !p.detectDuplicates),
            (l = !p.sortStable && e.slice(0)),
            e.sort(V),
            u)
          ) {
            for (; (t = e[r++]); ) t === e[r] && (i = n.push(r));
            for (; i--; ) e.splice(n[i], 1);
          }
          return (l = null), e;
        }),
        (o = O.getText =
          function (e) {
            var t,
              n = "",
              i = 0,
              r = e.nodeType;
            if (r) {
              if (1 === r || 9 === r || 11 === r) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
              } else if (3 === r || 4 === r) return e.nodeValue;
            } else for (; (t = e[i++]); ) n += o(t);
            return n;
          }),
        ((E = O.selectors =
          {
            cacheLength: 50,
            createPseudo: R,
            match: f,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace(D, d)),
                  (e[3] = (e[3] || e[4] || e[5] || "").replace(D, d)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || O.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && O.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var t,
                  n = !e[6] && e[2];
                return f.CHILD.test(e[0])
                  ? null
                  : (e[3]
                      ? (e[2] = e[4] || e[5] || "")
                      : n &&
                        ne.test(n) &&
                        (t = h(n, !0)) &&
                        (t = n.indexOf(")", n.length - t) - n.length) &&
                        ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(D, d).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = q[e + " "];
                return (
                  t ||
                  ((t = new RegExp("(^|" + a + ")" + e + "(" + a + "|$)")) &&
                    q(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (void 0 !== e.getAttribute &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (t, n, i) {
                return function (e) {
                  e = O.attr(e, t);
                  return null == e
                    ? "!=" === n
                    : !n ||
                        ((e += ""),
                        "=" === n
                          ? e === i
                          : "!=" === n
                          ? e !== i
                          : "^=" === n
                          ? i && 0 === e.indexOf(i)
                          : "*=" === n
                          ? i && -1 < e.indexOf(i)
                          : "$=" === n
                          ? i && e.slice(-i.length) === i
                          : "~=" === n
                          ? -1 < (" " + e.replace(J, " ") + " ").indexOf(i)
                          : "|=" === n &&
                            (e === i || e.slice(0, i.length + 1) === i + "-"));
                };
              },
              CHILD: function (h, e, t, m, g) {
                var v = "nth" !== h.slice(0, 3),
                  y = "last" !== h.slice(-4),
                  _ = "of-type" === e;
                return 1 === m && 0 === g
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (e, t, n) {
                      var i,
                        r,
                        o,
                        s,
                        a,
                        l,
                        u = v != y ? "nextSibling" : "previousSibling",
                        c = e.parentNode,
                        d = _ && e.nodeName.toLowerCase(),
                        f = !n && !_,
                        p = !1;
                      if (c) {
                        if (v) {
                          for (; u; ) {
                            for (s = e; (s = s[u]); )
                              if (
                                _
                                  ? s.nodeName.toLowerCase() === d
                                  : 1 === s.nodeType
                              )
                                return !1;
                            l = u = "only" === h && !l && "nextSibling";
                          }
                          return !0;
                        }
                        if (((l = [y ? c.firstChild : c.lastChild]), y && f)) {
                          for (
                            p =
                              (a =
                                (i =
                                  (r =
                                    (o = (s = c)[I] || (s[I] = {}))[
                                      s.uniqueID
                                    ] || (o[s.uniqueID] = {}))[h] || [])[0] ===
                                  k && i[1]) && i[2],
                              s = a && c.childNodes[a];
                            (s = (++a && s && s[u]) || (p = a = 0) || l.pop());

                          )
                            if (1 === s.nodeType && ++p && s === e) {
                              r[h] = [k, a, p];
                              break;
                            }
                        } else if (
                          !1 ===
                          (p = f
                            ? (a =
                                (i =
                                  (r =
                                    (o = (s = e)[I] || (s[I] = {}))[
                                      s.uniqueID
                                    ] || (o[s.uniqueID] = {}))[h] || [])[0] ===
                                  k && i[1])
                            : p)
                        )
                          for (
                            ;
                            (s =
                              (++a && s && s[u]) || (p = a = 0) || l.pop()) &&
                            ((_
                              ? s.nodeName.toLowerCase() !== d
                              : 1 !== s.nodeType) ||
                              !++p ||
                              (f &&
                                ((r =
                                  (o = s[I] || (s[I] = {}))[s.uniqueID] ||
                                  (o[s.uniqueID] = {}))[h] = [k, p]),
                              s !== e));

                          );
                        return (p -= g) === m || (p % m == 0 && 0 <= p / m);
                      }
                    };
              },
              PSEUDO: function (e, o) {
                var t,
                  s =
                    E.pseudos[e] ||
                    E.setFilters[e.toLowerCase()] ||
                    O.error("unsupported pseudo: " + e);
                return s[I]
                  ? s(o)
                  : 1 < s.length
                  ? ((t = [e, e, "", o]),
                    E.setFilters.hasOwnProperty(e.toLowerCase())
                      ? R(function (e, t) {
                          for (var n, i = s(e, o), r = i.length; r--; )
                            e[(n = _(e, i[r]))] = !(t[n] = i[r]);
                        })
                      : function (e) {
                          return s(e, 0, t);
                        })
                  : s;
              },
            },
            pseudos: {
              not: R(function (e) {
                var i = [],
                  r = [],
                  a = $(e.replace(x, "$1"));
                return a[I]
                  ? R(function (e, t, n, i) {
                      for (var r, o = a(e, null, i, []), s = e.length; s--; )
                        (r = o[s]) && (e[s] = !(t[s] = r));
                    })
                  : function (e, t, n) {
                      return (
                        (i[0] = e), a(i, null, n, r), (i[0] = null), !r.pop()
                      );
                    };
              }),
              has: R(function (t) {
                return function (e) {
                  return 0 < O(t, e).length;
                };
              }),
              contains: R(function (t) {
                return (
                  (t = t.replace(D, d)),
                  function (e) {
                    return (
                      -1 < (e.textContent || e.innerText || o(e)).indexOf(t)
                    );
                  }
                );
              }),
              lang: R(function (n) {
                return (
                  ie.test(n || "") || O.error("unsupported lang: " + n),
                  (n = n.replace(D, d).toLowerCase()),
                  function (e) {
                    var t;
                    do {
                      if (
                        (t = S
                          ? e.lang
                          : e.getAttribute("xml:lang") ||
                            e.getAttribute("lang"))
                      )
                        return (
                          (t = t.toLowerCase()) === n ||
                          0 === t.indexOf(n + "-")
                        );
                    } while ((e = e.parentNode) && 1 === e.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (e) {
                var t = n.location && n.location.hash;
                return t && t.slice(1) === e.id;
              },
              root: function (e) {
                return e === i;
              },
              focus: function (e) {
                return (
                  e === T.activeElement &&
                  (!T.hasFocus || T.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: pe(!1),
              disabled: pe(!0),
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0;
              },
              parent: function (e) {
                return !E.pseudos.empty(e);
              },
              header: function (e) {
                return oe.test(e.nodeName);
              },
              input: function (e) {
                return re.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (e = e.getAttribute("type")) ||
                    "text" === e.toLowerCase())
                );
              },
              first: M(function () {
                return [0];
              }),
              last: M(function (e, t) {
                return [t - 1];
              }),
              eq: M(function (e, t, n) {
                return [n < 0 ? n + t : n];
              }),
              even: M(function (e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e;
              }),
              odd: M(function (e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e;
              }),
              lt: M(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
                return e;
              }),
              gt: M(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                return e;
              }),
            },
          }).pseudos.nth = E.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
          E.pseudos[e] = (function (t) {
            return function (e) {
              return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
          })(e);
        for (e in { submit: !0, reset: !0 })
          E.pseudos[e] = (function (n) {
            return function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t || "button" === t) && e.type === n;
            };
          })(e);
        function me() {}
        function L(e) {
          for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
          return i;
        }
        function ge(s, e, t) {
          var a = e.dir,
            l = e.next,
            u = l || a,
            c = t && "parentNode" === u,
            d = G++;
          return e.first
            ? function (e, t, n) {
                for (; (e = e[a]); )
                  if (1 === e.nodeType || c) return s(e, t, n);
                return !1;
              }
            : function (e, t, n) {
                var i,
                  r,
                  o = [k, d];
                if (n) {
                  for (; (e = e[a]); )
                    if ((1 === e.nodeType || c) && s(e, t, n)) return !0;
                } else
                  for (; (e = e[a]); )
                    if (1 === e.nodeType || c)
                      if (
                        ((r =
                          (r = e[I] || (e[I] = {}))[e.uniqueID] ||
                          (r[e.uniqueID] = {})),
                        l && l === e.nodeName.toLowerCase())
                      )
                        e = e[a] || e;
                      else {
                        if ((i = r[u]) && i[0] === k && i[1] === d)
                          return (o[2] = i[2]);
                        if (((r[u] = o)[2] = s(e, t, n))) return !0;
                      }
                return !1;
              };
        }
        function ve(r) {
          return 1 < r.length
            ? function (e, t, n) {
                for (var i = r.length; i--; ) if (!r[i](e, t, n)) return !1;
                return !0;
              }
            : r[0];
        }
        function ye(e, t, n, i, r) {
          for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)
            !(o = e[a]) || (n && !n(o, i, r)) || (s.push(o), u && t.push(a));
          return s;
        }
        function _e(p, h, m, g, v, e) {
          return (
            g && !g[I] && (g = _e(g)),
            v && !v[I] && (v = _e(v, e)),
            R(function (e, t, n, i) {
              var r,
                o,
                s,
                a = [],
                l = [],
                u = t.length,
                c =
                  e ||
                  (function (e, t, n) {
                    for (var i = 0, r = t.length; i < r; i++) O(e, t[i], n);
                    return n;
                  })(h || "*", n.nodeType ? [n] : n, []),
                d = !p || (!e && h) ? c : ye(c, a, p, n, i),
                f = m ? (v || (e ? p : u || g) ? [] : t) : d;
              if ((m && m(d, f, n, i), g))
                for (r = ye(f, l), g(r, [], n, i), o = r.length; o--; )
                  (s = r[o]) && (f[l[o]] = !(d[l[o]] = s));
              if (e) {
                if (v || p) {
                  if (v) {
                    for (r = [], o = f.length; o--; )
                      (s = f[o]) && r.push((d[o] = s));
                    v(null, (f = []), r, i);
                  }
                  for (o = f.length; o--; )
                    (s = f[o]) &&
                      -1 < (r = v ? _(e, s) : a[o]) &&
                      (e[r] = !(t[r] = s));
                }
              } else (f = ye(f === t ? f.splice(u, f.length) : f)), v ? v(null, t, f, i) : C.apply(t, f);
            })
          );
        }
        function Ee(g, v) {
          function e(e, t, n, i, r) {
            var o,
              s,
              a,
              l = 0,
              u = "0",
              c = e && [],
              d = [],
              f = b,
              p = e || (_ && E.find.TAG("*", r)),
              h = (k += null == f ? 1 : Math.random() || 0.1),
              m = p.length;
            for (
              r && (b = t === T || t || r);
              u !== m && null != (o = p[u]);
              u++
            ) {
              if (_ && o) {
                for (
                  s = 0, t || o.ownerDocument === T || (w(o), (n = !S));
                  (a = g[s++]);

                )
                  if (a(o, t || T, n)) {
                    i.push(o);
                    break;
                  }
                r && (k = h);
              }
              y && ((o = !a && o) && l--, e && c.push(o));
            }
            if (((l += u), y && u !== l)) {
              for (s = 0; (a = v[s++]); ) a(c, d, t, n);
              if (e) {
                if (0 < l) for (; u--; ) c[u] || d[u] || (d[u] = z.call(i));
                d = ye(d);
              }
              C.apply(i, d),
                r && !e && 0 < d.length && 1 < l + v.length && O.uniqueSort(i);
            }
            return r && ((k = h), (b = f)), c;
          }
          var y = 0 < v.length,
            _ = 0 < g.length;
          return y ? R(e) : e;
        }
        return (
          (me.prototype = E.filters = E.pseudos),
          (E.setFilters = new me()),
          (h = O.tokenize =
            function (e, t) {
              var n,
                i,
                r,
                o,
                s,
                a,
                l,
                u = U[e + " "];
              if (u) return t ? 0 : u.slice(0);
              for (s = e, a = [], l = E.preFilter; s; ) {
                for (o in ((n && !(i = Q.exec(s))) ||
                  (i && (s = s.slice(i[0].length) || s), a.push((r = []))),
                (n = !1),
                (i = ee.exec(s)) &&
                  ((n = i.shift()),
                  r.push({ value: n, type: i[0].replace(x, " ") }),
                  (s = s.slice(n.length))),
                E.filter))
                  !(i = f[o].exec(s)) ||
                    (l[o] && !(i = l[o](i))) ||
                    ((n = i.shift()),
                    r.push({ value: n, type: o, matches: i }),
                    (s = s.slice(n.length)));
                if (!n) break;
              }
              return t ? s.length : s ? O.error(e) : U(e, a).slice(0);
            }),
          ($ = O.compile =
            function (e, t) {
              var n,
                i = [],
                r = [],
                o = y[e + " "];
              if (!o) {
                for (n = (t = t || h(e)).length; n--; )
                  ((o = (function e(t) {
                    for (
                      var i,
                        n,
                        r,
                        o = t.length,
                        s = E.relative[t[0].type],
                        a = s || E.relative[" "],
                        l = s ? 1 : 0,
                        u = ge(
                          function (e) {
                            return e === i;
                          },
                          a,
                          !0
                        ),
                        c = ge(
                          function (e) {
                            return -1 < _(i, e);
                          },
                          a,
                          !0
                        ),
                        d = [
                          function (e, t, n) {
                            return (
                              (e =
                                (!s && (n || t !== b)) ||
                                ((i = t).nodeType ? u : c)(e, t, n)),
                              (i = null),
                              e
                            );
                          },
                        ];
                      l < o;
                      l++
                    )
                      if ((n = E.relative[t[l].type])) d = [ge(ve(d), n)];
                      else {
                        if (
                          (n = E.filter[t[l].type].apply(null, t[l].matches))[I]
                        ) {
                          for (r = ++l; r < o && !E.relative[t[r].type]; r++);
                          return _e(
                            1 < l && ve(d),
                            1 < l &&
                              L(
                                t
                                  .slice(0, l - 1)
                                  .concat({
                                    value: " " === t[l - 2].type ? "*" : "",
                                  })
                              ).replace(x, "$1"),
                            n,
                            l < r && e(t.slice(l, r)),
                            r < o && e((t = t.slice(r))),
                            r < o && L(t)
                          );
                        }
                        d.push(n);
                      }
                    return ve(d);
                  })(t[n]))[I]
                    ? i
                    : r
                  ).push(o);
                (o = y(e, Ee(r, i))).selector = e;
              }
              return o;
            }),
          (B = O.select =
            function (e, t, n, i) {
              var r,
                o,
                s,
                a,
                l,
                u = "function" == typeof e && e,
                c = !i && h((e = u.selector || e));
              if (((n = n || []), 1 === c.length)) {
                if (
                  2 < (o = c[0] = c[0].slice(0)).length &&
                  "ID" === (s = o[0]).type &&
                  9 === t.nodeType &&
                  S &&
                  E.relative[o[1].type]
                ) {
                  if (
                    !(t = (E.find.ID(s.matches[0].replace(D, d), t) || [])[0])
                  )
                    return n;
                  u && (t = t.parentNode),
                    (e = e.slice(o.shift().value.length));
                }
                for (
                  r = f.needsContext.test(e) ? 0 : o.length;
                  r-- && ((s = o[r]), !E.relative[(a = s.type)]);

                )
                  if (
                    (l = E.find[a]) &&
                    (i = l(
                      s.matches[0].replace(D, d),
                      (ae.test(o[0].type) && he(t.parentNode)) || t
                    ))
                  ) {
                    if ((o.splice(r, 1), (e = i.length && L(o)))) break;
                    return C.apply(n, i), n;
                  }
              }
              return (
                (u || $(e, c))(
                  i,
                  t,
                  !S,
                  n,
                  !t || (ae.test(e) && he(t.parentNode)) || t
                ),
                n
              );
            }),
          (p.sortStable = I.split("").sort(V).join("") === I),
          (p.detectDuplicates = !!u),
          w(),
          (p.sortDetached = P(function (e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
          })),
          P(function (e) {
            return (
              (e.innerHTML = "<a href='#'></a>"),
              "#" === e.firstChild.getAttribute("href")
            );
          }) ||
            de("type|href|height|width", function (e, t, n) {
              if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
            }),
          (p.attributes &&
            P(function (e) {
              return (
                (e.innerHTML = "<input/>"),
                e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
              );
            })) ||
            de("value", function (e, t, n) {
              if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue;
            }),
          P(function (e) {
            return null == e.getAttribute("disabled");
          }) ||
            de(X, function (e, t, n) {
              if (!n)
                return !0 === e[t]
                  ? t.toLowerCase()
                  : (n = e.getAttributeNode(t)) && n.specified
                  ? n.value
                  : null;
            }),
          O
        );
      })(b),
      K =
        ((T.find = e),
        (T.expr = e.selectors),
        (T.expr[":"] = T.expr.pseudos),
        (T.uniqueSort = T.unique = e.uniqueSort),
        (T.text = e.getText),
        (T.isXMLDoc = e.isXML),
        (T.contains = e.contains),
        (T.escapeSelector = e.escape),
        T.expr.match.needsContext);
    function l(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var J = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function Q(e, n, i) {
      return y(n)
        ? T.grep(e, function (e, t) {
            return !!n.call(e, t, e) !== i;
          })
        : n.nodeType
        ? T.grep(e, function (e) {
            return (e === n) !== i;
          })
        : "string" != typeof n
        ? T.grep(e, function (e) {
            return -1 < B.call(n, e) !== i;
          })
        : T.filter(n, e, i);
    }
    (T.filter = function (e, t, n) {
      var i = t[0];
      return (
        n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType
          ? T.find.matchesSelector(i, e)
            ? [i]
            : []
          : T.find.matches(
              e,
              T.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      T.fn.extend({
        find: function (e) {
          var t,
            n,
            i = this.length,
            r = this;
          if ("string" != typeof e)
            return this.pushStack(
              T(e).filter(function () {
                for (t = 0; t < i; t++) if (T.contains(r[t], this)) return !0;
              })
            );
          for (n = this.pushStack([]), t = 0; t < i; t++) T.find(e, r[t], n);
          return 1 < i ? T.uniqueSort(n) : n;
        },
        filter: function (e) {
          return this.pushStack(Q(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(Q(this, e || [], !0));
        },
        is: function (e) {
          return !!Q(
            this,
            "string" == typeof e && K.test(e) ? T(e) : e || [],
            !1
          ).length;
        },
      });
    var ee,
      te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      ne =
        (((T.fn.init = function (e, t, n) {
          if (!e) return this;
          if (((n = n || ee), "string" != typeof e))
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : y(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(T)
              : T.makeArray(e, this);
          if (
            !(i =
              "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
                ? [null, e, null]
                : te.exec(e)) ||
            (!i[1] && t)
          )
            return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
          if (i[1]) {
            if (
              ((t = t instanceof T ? t[0] : t),
              T.merge(
                this,
                T.parseHTML(
                  i[1],
                  t && t.nodeType ? t.ownerDocument || t : w,
                  !0
                )
              ),
              J.test(i[1]) && T.isPlainObject(t))
            )
              for (var i in t) y(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            return this;
          }
          return (
            (n = w.getElementById(i[2])) && ((this[0] = n), (this.length = 1)),
            this
          );
        }).prototype = T.fn),
        (ee = T(w)),
        /^(?:parents|prev(?:Until|All))/),
      ie = { children: !0, contents: !0, next: !0, prev: !0 };
    function re(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    T.fn.extend({
      has: function (e) {
        var t = T(e, this),
          n = t.length;
        return this.filter(function () {
          for (var e = 0; e < n; e++) if (T.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var n,
          i = 0,
          r = this.length,
          o = [],
          s = "string" != typeof e && T(e);
        if (!K.test(e))
          for (; i < r; i++)
            for (n = this[i]; n && n !== t; n = n.parentNode)
              if (
                n.nodeType < 11 &&
                (s
                  ? -1 < s.index(n)
                  : 1 === n.nodeType && T.find.matchesSelector(n, e))
              ) {
                o.push(n);
                break;
              }
        return this.pushStack(1 < o.length ? T.uniqueSort(o) : o);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? B.call(T(e), this[0])
            : B.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(T.uniqueSort(T.merge(this.get(), T(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      T.each(
        {
          parent: function (e) {
            e = e.parentNode;
            return e && 11 !== e.nodeType ? e : null;
          },
          parents: function (e) {
            return i(e, "parentNode");
          },
          parentsUntil: function (e, t, n) {
            return i(e, "parentNode", n);
          },
          next: function (e) {
            return re(e, "nextSibling");
          },
          prev: function (e) {
            return re(e, "previousSibling");
          },
          nextAll: function (e) {
            return i(e, "nextSibling");
          },
          prevAll: function (e) {
            return i(e, "previousSibling");
          },
          nextUntil: function (e, t, n) {
            return i(e, "nextSibling", n);
          },
          prevUntil: function (e, t, n) {
            return i(e, "previousSibling", n);
          },
          siblings: function (e) {
            return Z((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return Z(e.firstChild);
          },
          contents: function (e) {
            return l(e, "iframe")
              ? e.contentDocument
              : (l(e, "template") && (e = e.content || e),
                T.merge([], e.childNodes));
          },
        },
        function (i, r) {
          T.fn[i] = function (e, t) {
            var n = T.map(this, r, e);
            return (
              (t = "Until" !== i.slice(-5) ? e : t) &&
                "string" == typeof t &&
                (n = T.filter(t, n)),
              1 < this.length &&
                (ie[i] || T.uniqueSort(n), ne.test(i) && n.reverse()),
              this.pushStack(n)
            );
          };
        }
      );
    var S = /[^\x20\t\r\n\f]+/g;
    function c(e) {
      return e;
    }
    function oe(e) {
      throw e;
    }
    function se(e, t, n, i) {
      var r;
      try {
        e && y((r = e.promise))
          ? r.call(e).done(t).fail(n)
          : e && y((r = e.then))
          ? r.call(e, t, n)
          : t.apply(void 0, [e].slice(i));
      } catch (e) {
        n.apply(void 0, [e]);
      }
    }
    (T.Callbacks = function (i) {
      var e, n;
      i =
        "string" == typeof i
          ? ((e = i),
            (n = {}),
            T.each(e.match(S) || [], function (e, t) {
              n[t] = !0;
            }),
            n)
          : T.extend({}, i);
      function r() {
        for (a = a || i.once, s = o = !0; u.length; c = -1)
          for (t = u.shift(); ++c < l.length; )
            !1 === l[c].apply(t[0], t[1]) &&
              i.stopOnFalse &&
              ((c = l.length), (t = !1));
        i.memory || (t = !1), (o = !1), a && (l = t ? [] : "");
      }
      var o,
        t,
        s,
        a,
        l = [],
        u = [],
        c = -1,
        d = {
          add: function () {
            return (
              l &&
                (t && !o && ((c = l.length - 1), u.push(t)),
                (function n(e) {
                  T.each(e, function (e, t) {
                    y(t)
                      ? (i.unique && d.has(t)) || l.push(t)
                      : t && t.length && "string" !== h(t) && n(t);
                  });
                })(arguments),
                t && !o && r()),
              this
            );
          },
          remove: function () {
            return (
              T.each(arguments, function (e, t) {
                for (var n; -1 < (n = T.inArray(t, l, n)); )
                  l.splice(n, 1), n <= c && c--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? -1 < T.inArray(e, l) : 0 < l.length;
          },
          empty: function () {
            return (l = l && []), this;
          },
          disable: function () {
            return (a = u = []), (l = t = ""), this;
          },
          disabled: function () {
            return !l;
          },
          lock: function () {
            return (a = u = []), t || o || (l = t = ""), this;
          },
          locked: function () {
            return !!a;
          },
          fireWith: function (e, t) {
            return (
              a ||
                ((t = [e, (t = t || []).slice ? t.slice() : t]),
                u.push(t),
                o || r()),
              this
            );
          },
          fire: function () {
            return d.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!s;
          },
        };
      return d;
    }),
      T.extend({
        Deferred: function (e) {
          var o = [
              [
                "notify",
                "progress",
                T.Callbacks("memory"),
                T.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                T.Callbacks("once memory"),
                T.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                T.Callbacks("once memory"),
                T.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            r = "pending",
            s = {
              state: function () {
                return r;
              },
              always: function () {
                return a.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return s.then(null, e);
              },
              pipe: function () {
                var r = arguments;
                return T.Deferred(function (i) {
                  T.each(o, function (e, t) {
                    var n = y(r[t[4]]) && r[t[4]];
                    a[t[1]](function () {
                      var e = n && n.apply(this, arguments);
                      e && y(e.promise)
                        ? e
                            .promise()
                            .progress(i.notify)
                            .done(i.resolve)
                            .fail(i.reject)
                        : i[t[0] + "With"](this, n ? [e] : arguments);
                    });
                  }),
                    (r = null);
                }).promise();
              },
              then: function (t, n, i) {
                var l = 0;
                function u(r, o, s, a) {
                  return function () {
                    function e() {
                      var e, t;
                      if (!(r < l)) {
                        if ((e = s.apply(n, i)) === o.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          y(t)
                            ? a
                              ? t.call(e, u(l, o, c, a), u(l, o, oe, a))
                              : (l++,
                                t.call(
                                  e,
                                  u(l, o, c, a),
                                  u(l, o, oe, a),
                                  u(l, o, c, o.notifyWith)
                                ))
                            : (s !== c && ((n = void 0), (i = [e])),
                              (a || o.resolveWith)(n, i));
                      }
                    }
                    var n = this,
                      i = arguments,
                      t = a
                        ? e
                        : function () {
                            try {
                              e();
                            } catch (e) {
                              T.Deferred.exceptionHook &&
                                T.Deferred.exceptionHook(e, t.stackTrace),
                                l <= r + 1 &&
                                  (s !== oe && ((n = void 0), (i = [e])),
                                  o.rejectWith(n, i));
                            }
                          };
                    r
                      ? t()
                      : (T.Deferred.getStackHook &&
                          (t.stackTrace = T.Deferred.getStackHook()),
                        b.setTimeout(t));
                  };
                }
                return T.Deferred(function (e) {
                  o[0][3].add(u(0, e, y(i) ? i : c, e.notifyWith)),
                    o[1][3].add(u(0, e, y(t) ? t : c)),
                    o[2][3].add(u(0, e, y(n) ? n : oe));
                }).promise();
              },
              promise: function (e) {
                return null != e ? T.extend(e, s) : s;
              },
            },
            a = {};
          return (
            T.each(o, function (e, t) {
              var n = t[2],
                i = t[5];
              (s[t[1]] = n.add),
                i &&
                  n.add(
                    function () {
                      r = i;
                    },
                    o[3 - e][2].disable,
                    o[3 - e][3].disable,
                    o[0][2].lock,
                    o[0][3].lock
                  ),
                n.add(t[3].fire),
                (a[t[0]] = function () {
                  return (
                    a[t[0] + "With"](this === a ? void 0 : this, arguments),
                    this
                  );
                }),
                (a[t[0] + "With"] = n.fireWith);
            }),
            s.promise(a),
            e && e.call(a, a),
            a
          );
        },
        when: function (e) {
          function t(t) {
            return function (e) {
              (r[t] = this),
                (o[t] = 1 < arguments.length ? a.call(arguments) : e),
                --n || s.resolveWith(r, o);
            };
          }
          var n = arguments.length,
            i = n,
            r = Array(i),
            o = a.call(arguments),
            s = T.Deferred();
          if (
            n <= 1 &&
            (se(e, s.done(t(i)).resolve, s.reject, !n),
            "pending" === s.state() || y(o[i] && o[i].then))
          )
            return s.then();
          for (; i--; ) se(o[i], t(i), s.reject);
          return s.promise();
        },
      });
    var ae = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/,
      le =
        ((T.Deferred.exceptionHook = function (e, t) {
          b.console &&
            b.console.warn &&
            e &&
            ae.test(e.name) &&
            b.console.warn(
              "jQuery.Deferred exception: " + e.message,
              e.stack,
              t
            );
        }),
        (T.readyException = function (e) {
          b.setTimeout(function () {
            throw e;
          });
        }),
        T.Deferred());
    function ue() {
      w.removeEventListener("DOMContentLoaded", ue),
        b.removeEventListener("load", ue),
        T.ready();
    }
    (T.fn.ready = function (e) {
      return (
        le.then(e).catch(function (e) {
          T.readyException(e);
        }),
        this
      );
    }),
      T.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --T.readyWait : T.isReady) ||
            ((T.isReady = !0) !== e && 0 < --T.readyWait) ||
            le.resolveWith(w, [T]);
        },
      }),
      (T.ready.then = le.then),
      "complete" === w.readyState ||
      ("loading" !== w.readyState && !w.documentElement.doScroll)
        ? b.setTimeout(T.ready)
        : (w.addEventListener("DOMContentLoaded", ue),
          b.addEventListener("load", ue));
    function d(e, t, n, i, r, o, s) {
      var a = 0,
        l = e.length,
        u = null == n;
      if ("object" === h(n))
        for (a in ((r = !0), n)) d(e, t, a, n[a], !0, o, s);
      else if (
        void 0 !== i &&
        ((r = !0),
        y(i) || (s = !0),
        (t = u
          ? s
            ? (t.call(e, i), null)
            : ((u = t),
              function (e, t, n) {
                return u.call(T(e), n);
              })
          : t))
      )
        for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
      return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
    }
    var ce = /^-ms-/,
      de = /-([a-z])/g;
    function fe(e, t) {
      return t.toUpperCase();
    }
    function _(e) {
      return e.replace(ce, "ms-").replace(de, fe);
    }
    function pe(e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    function t() {
      this.expando = T.expando + t.uid++;
    }
    (t.uid = 1),
      (t.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              pe(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, n) {
          var i,
            r = this.cache(e);
          if ("string" == typeof t) r[_(t)] = n;
          else for (i in t) r[_(i)] = t[i];
          return r;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][_(t)];
        },
        access: function (e, t, n) {
          return void 0 === t || (t && "string" == typeof t && void 0 === n)
            ? this.get(e, t)
            : (this.set(e, t, n), void 0 !== n ? n : t);
        },
        remove: function (e, t) {
          var n,
            i = e[this.expando];
          if (void 0 !== i) {
            if (void 0 !== t) {
              n = (t = Array.isArray(t)
                ? t.map(_)
                : (t = _(t)) in i
                ? [t]
                : t.match(S) || []).length;
              for (; n--; ) delete i[t[n]];
            }
            (void 0 !== t && !T.isEmptyObject(i)) ||
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          e = e[this.expando];
          return void 0 !== e && !T.isEmptyObject(e);
        },
      });
    var v = new t(),
      u = new t(),
      he = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      me = /[A-Z]/g;
    function ge(e, t, n) {
      var i, r;
      if (void 0 === n && 1 === e.nodeType)
        if (
          ((i = "data-" + t.replace(me, "-$&").toLowerCase()),
          "string" == typeof (n = e.getAttribute(i)))
        ) {
          try {
            n =
              "true" === (r = n) ||
              ("false" !== r &&
                ("null" === r
                  ? null
                  : r === +r + ""
                  ? +r
                  : he.test(r)
                  ? JSON.parse(r)
                  : r));
          } catch (e) {}
          u.set(e, t, n);
        } else n = void 0;
      return n;
    }
    T.extend({
      hasData: function (e) {
        return u.hasData(e) || v.hasData(e);
      },
      data: function (e, t, n) {
        return u.access(e, t, n);
      },
      removeData: function (e, t) {
        u.remove(e, t);
      },
      _data: function (e, t, n) {
        return v.access(e, t, n);
      },
      _removeData: function (e, t) {
        v.remove(e, t);
      },
    }),
      T.fn.extend({
        data: function (n, e) {
          var t,
            i,
            r,
            o = this[0],
            s = o && o.attributes;
          if (void 0 !== n)
            return "object" == typeof n
              ? this.each(function () {
                  u.set(this, n);
                })
              : d(
                  this,
                  function (e) {
                    var t;
                    if (o && void 0 === e)
                      return void 0 !== (t = u.get(o, n)) ||
                        void 0 !== (t = ge(o, n))
                        ? t
                        : void 0;
                    this.each(function () {
                      u.set(this, n, e);
                    });
                  },
                  null,
                  e,
                  1 < arguments.length,
                  null,
                  !0
                );
          if (
            this.length &&
            ((r = u.get(o)), 1 === o.nodeType && !v.get(o, "hasDataAttrs"))
          ) {
            for (t = s.length; t--; )
              s[t] &&
                0 === (i = s[t].name).indexOf("data-") &&
                ((i = _(i.slice(5))), ge(o, i, r[i]));
            v.set(o, "hasDataAttrs", !0);
          }
          return r;
        },
        removeData: function (e) {
          return this.each(function () {
            u.remove(this, e);
          });
        },
      }),
      T.extend({
        queue: function (e, t, n) {
          var i;
          if (e)
            return (
              (i = v.get(e, (t = (t || "fx") + "queue"))),
              n &&
                (!i || Array.isArray(n)
                  ? (i = v.access(e, t, T.makeArray(n)))
                  : i.push(n)),
              i || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var n = T.queue(e, t),
            i = n.length,
            r = n.shift(),
            o = T._queueHooks(e, t);
          "inprogress" === r && ((r = n.shift()), i--),
            r &&
              ("fx" === t && n.unshift("inprogress"),
              delete o.stop,
              r.call(
                e,
                function () {
                  T.dequeue(e, t);
                },
                o
              )),
            !i && o && o.empty.fire();
        },
        _queueHooks: function (e, t) {
          var n = t + "queueHooks";
          return (
            v.get(e, n) ||
            v.access(e, n, {
              empty: T.Callbacks("once memory").add(function () {
                v.remove(e, [t + "queue", n]);
              }),
            })
          );
        },
      }),
      T.fn.extend({
        queue: function (t, n) {
          var e = 2;
          return (
            "string" != typeof t && ((n = t), (t = "fx"), e--),
            arguments.length < e
              ? T.queue(this[0], t)
              : void 0 === n
              ? this
              : this.each(function () {
                  var e = T.queue(this, t, n);
                  T._queueHooks(this, t),
                    "fx" === t && "inprogress" !== e[0] && T.dequeue(this, t);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            T.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          function n() {
            --r || o.resolveWith(s, [s]);
          }
          var i,
            r = 1,
            o = T.Deferred(),
            s = this,
            a = this.length;
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            a--;

          )
            (i = v.get(s[a], e + "queueHooks")) &&
              i.empty &&
              (r++, i.empty.add(n));
          return n(), o.promise(t);
        },
      });
    function ve(e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display &&
          T.contains(e.ownerDocument, e) &&
          "none" === T.css(e, "display"))
      );
    }
    function ye(e, t, n, i) {
      var r,
        o = {};
      for (r in t) (o[r] = e.style[r]), (e.style[r] = t[r]);
      for (r in ((n = n.apply(e, i || [])), t)) e.style[r] = o[r];
      return n;
    }
    var e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      f = new RegExp("^(?:([+-])=|)(" + e + ")([a-z%]*)$", "i"),
      p = ["Top", "Right", "Bottom", "Left"];
    function _e(e, t, n, i) {
      var r,
        o,
        s = 20,
        a = i
          ? function () {
              return i.cur();
            }
          : function () {
              return T.css(e, t, "");
            },
        l = a(),
        u = (n && n[3]) || (T.cssNumber[t] ? "" : "px"),
        c = (T.cssNumber[t] || ("px" !== u && +l)) && f.exec(T.css(e, t));
      if (c && c[3] !== u) {
        for (u = u || c[3], c = +(l /= 2) || 1; s--; )
          T.style(e, t, c + u),
            (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
            (c /= o);
        T.style(e, t, (c *= 2) + u), (n = n || []);
      }
      return (
        n &&
          ((c = +c || +l || 0),
          (r = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
          i && ((i.unit = u), (i.start = c), (i.end = r))),
        r
      );
    }
    var Ee = {};
    function E(e, t) {
      for (var n, i, r, o, s, a = [], l = 0, u = e.length; l < u; l++)
        (i = e[l]).style &&
          ((n = i.style.display),
          t
            ? ("none" === n &&
                ((a[l] = v.get(i, "display") || null),
                a[l] || (i.style.display = "")),
              "" === i.style.display &&
                ve(i) &&
                (a[l] =
                  ((s = o = void 0),
                  (o = (r = i).ownerDocument),
                  (r = r.nodeName),
                  (s = Ee[r]) ||
                    ((o = o.body.appendChild(o.createElement(r))),
                    (s = T.css(o, "display")),
                    o.parentNode.removeChild(o),
                    (Ee[r] = s = "none" === s ? "block" : s)))))
            : "none" !== n && ((a[l] = "none"), v.set(i, "display", n)));
      for (l = 0; l < u; l++) null != a[l] && (e[l].style.display = a[l]);
      return e;
    }
    T.fn.extend({
      show: function () {
        return E(this, !0);
      },
      hide: function () {
        return E(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              ve(this) ? T(this).show() : T(this).hide();
            });
      },
    });
    var be = /^(?:checkbox|radio)$/i,
      we = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      Te = /^$|^module$|\/(?:java|ecma)script/i,
      I = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    function k(e, t) {
      var n =
        void 0 !== e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : void 0 !== e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : [];
      return void 0 === t || (t && l(e, t)) ? T.merge([e], n) : n;
    }
    function Se(e, t) {
      for (var n = 0, i = e.length; n < i; n++)
        v.set(e[n], "globalEval", !t || v.get(t[n], "globalEval"));
    }
    (I.optgroup = I.option),
      (I.tbody = I.tfoot = I.colgroup = I.caption = I.thead),
      (I.th = I.td);
    var Ie = /<|&#?\w+;/;
    function ke(e, t, n, i, r) {
      for (
        var o,
          s,
          a,
          l,
          u,
          c = t.createDocumentFragment(),
          d = [],
          f = 0,
          p = e.length;
        f < p;
        f++
      )
        if ((o = e[f]) || 0 === o)
          if ("object" === h(o)) T.merge(d, o.nodeType ? [o] : o);
          else if (Ie.test(o)) {
            for (
              s = s || c.appendChild(t.createElement("div")),
                a = (we.exec(o) || ["", ""])[1].toLowerCase(),
                a = I[a] || I._default,
                s.innerHTML = a[1] + T.htmlPrefilter(o) + a[2],
                u = a[0];
              u--;

            )
              s = s.lastChild;
            T.merge(d, s.childNodes), ((s = c.firstChild).textContent = "");
          } else d.push(t.createTextNode(o));
      for (c.textContent = "", f = 0; (o = d[f++]); )
        if (i && -1 < T.inArray(o, i)) r && r.push(o);
        else if (
          ((l = T.contains(o.ownerDocument, o)),
          (s = k(c.appendChild(o), "script")),
          l && Se(s),
          n)
        )
          for (u = 0; (o = s[u++]); ) Te.test(o.type || "") && n.push(o);
      return c;
    }
    (O = w.createDocumentFragment().appendChild(w.createElement("div"))),
      (s = w.createElement("input")).setAttribute("type", "radio"),
      s.setAttribute("checked", "checked"),
      s.setAttribute("name", "t"),
      O.appendChild(s),
      (g.checkClone = O.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (O.innerHTML = "<textarea>x</textarea>"),
      (g.noCloneChecked = !!O.cloneNode(!0).lastChild.defaultValue);
    var Ce = w.documentElement,
      xe = /^key/,
      Ae = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      De = /^([^.]*)(?:\.(.+)|)/;
    function Oe() {
      return !0;
    }
    function C() {
      return !1;
    }
    function Re() {
      try {
        return w.activeElement;
      } catch (e) {}
    }
    function Pe(e, t, n, i, r, o) {
      var s, a;
      if ("object" == typeof t) {
        for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), t))
          Pe(e, a, n, i, t[a], o);
        return e;
      }
      if (
        (null == i && null == r
          ? ((r = n), (i = n = void 0))
          : null == r &&
            ("string" == typeof n
              ? ((r = i), (i = void 0))
              : ((r = i), (i = n), (n = void 0))),
        !1 === r)
      )
        r = C;
      else if (!r) return e;
      return (
        1 === o &&
          ((s = r),
          ((r = function (e) {
            return T().off(e), s.apply(this, arguments);
          }).guid = s.guid || (s.guid = T.guid++))),
        e.each(function () {
          T.event.add(this, t, r, i, n);
        })
      );
    }
    (T.event = {
      global: {},
      add: function (t, e, n, i, r) {
        var o,
          s,
          a,
          l,
          u,
          c,
          d,
          f,
          p,
          h = v.get(t);
        if (h)
          for (
            n.handler && ((n = (o = n).handler), (r = o.selector)),
              r && T.find.matchesSelector(Ce, r),
              n.guid || (n.guid = T.guid++),
              (a = h.events) || (a = h.events = {}),
              (s = h.handle) ||
                (s = h.handle =
                  function (e) {
                    return void 0 !== T && T.event.triggered !== e.type
                      ? T.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              l = (e = (e || "").match(S) || [""]).length;
            l--;

          )
            (d = p = (f = De.exec(e[l]) || [])[1]),
              (f = (f[2] || "").split(".").sort()),
              d &&
                ((u = T.event.special[d] || {}),
                (d = (r ? u.delegateType : u.bindType) || d),
                (u = T.event.special[d] || {}),
                (p = T.extend(
                  {
                    type: d,
                    origType: p,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && T.expr.match.needsContext.test(r),
                    namespace: f.join("."),
                  },
                  o
                )),
                (c = a[d]) ||
                  (((c = a[d] = []).delegateCount = 0),
                  (u.setup && !1 !== u.setup.call(t, i, f, s)) ||
                    (t.addEventListener && t.addEventListener(d, s))),
                u.add &&
                  (u.add.call(t, p),
                  p.handler.guid || (p.handler.guid = n.guid)),
                r ? c.splice(c.delegateCount++, 0, p) : c.push(p),
                (T.event.global[d] = !0));
      },
      remove: function (e, t, n, i, r) {
        var o,
          s,
          a,
          l,
          u,
          c,
          d,
          f,
          p,
          h,
          m,
          g = v.hasData(e) && v.get(e);
        if (g && (l = g.events)) {
          for (u = (t = (t || "").match(S) || [""]).length; u--; )
            if (
              ((p = m = (a = De.exec(t[u]) || [])[1]),
              (h = (a[2] || "").split(".").sort()),
              p)
            ) {
              for (
                d = T.event.special[p] || {},
                  f = l[(p = (i ? d.delegateType : d.bindType) || p)] || [],
                  a =
                    a[2] &&
                    new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = o = f.length;
                o--;

              )
                (c = f[o]),
                  (!r && m !== c.origType) ||
                    (n && n.guid !== c.guid) ||
                    (a && !a.test(c.namespace)) ||
                    (i && i !== c.selector && ("**" !== i || !c.selector)) ||
                    (f.splice(o, 1),
                    c.selector && f.delegateCount--,
                    d.remove && d.remove.call(e, c));
              s &&
                !f.length &&
                ((d.teardown && !1 !== d.teardown.call(e, h, g.handle)) ||
                  T.removeEvent(e, p, g.handle),
                delete l[p]);
            } else for (p in l) T.event.remove(e, p + t[u], n, i, !0);
          T.isEmptyObject(l) && v.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          n,
          i,
          r,
          o,
          s = T.event.fix(e),
          a = new Array(arguments.length),
          e = (v.get(this, "events") || {})[s.type] || [],
          l = T.event.special[s.type] || {};
        for (a[0] = s, t = 1; t < arguments.length; t++) a[t] = arguments[t];
        if (
          ((s.delegateTarget = this),
          !l.preDispatch || !1 !== l.preDispatch.call(this, s))
        ) {
          for (
            o = T.event.handlers.call(this, s, e), t = 0;
            (i = o[t++]) && !s.isPropagationStopped();

          )
            for (
              s.currentTarget = i.elem, n = 0;
              (r = i.handlers[n++]) && !s.isImmediatePropagationStopped();

            )
              (s.rnamespace && !s.rnamespace.test(r.namespace)) ||
                ((s.handleObj = r),
                (s.data = r.data),
                void 0 !==
                  (r = (
                    (T.event.special[r.origType] || {}).handle || r.handler
                  ).apply(i.elem, a)) &&
                  !1 === (s.result = r) &&
                  (s.preventDefault(), s.stopPropagation()));
          return l.postDispatch && l.postDispatch.call(this, s), s.result;
        }
      },
      handlers: function (e, t) {
        var n,
          i,
          r,
          o,
          s,
          a = [],
          l = t.delegateCount,
          u = e.target;
        if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
          for (; u !== this; u = u.parentNode || this)
            if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
              for (o = [], s = {}, n = 0; n < l; n++)
                void 0 === s[(r = (i = t[n]).selector + " ")] &&
                  (s[r] = i.needsContext
                    ? -1 < T(r, this).index(u)
                    : T.find(r, this, null, [u]).length),
                  s[r] && o.push(i);
              o.length && a.push({ elem: u, handlers: o });
            }
        return (
          (u = this),
          l < t.length && a.push({ elem: u, handlers: t.slice(l) }),
          a
        );
      },
      addProp: function (t, e) {
        Object.defineProperty(T.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: y(e)
            ? function () {
                if (this.originalEvent) return e(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (e) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: e,
            });
          },
        });
      },
      fix: function (e) {
        return e[T.expando] ? e : new T.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== Re() && this.focus) return this.focus(), !1;
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === Re() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if ("checkbox" === this.type && this.click && l(this, "input"))
              return this.click(), !1;
          },
          _default: function (e) {
            return l(e.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (T.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
      }),
      (T.Event = function (e, t) {
        if (!(this instanceof T.Event)) return new T.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? Oe
                : C),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && T.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[T.expando] = !0);
      }),
      (T.Event.prototype = {
        constructor: T.Event,
        isDefaultPrevented: C,
        isPropagationStopped: C,
        isImmediatePropagationStopped: C,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = Oe),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = Oe),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = Oe),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      T.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (e) {
            var t = e.button;
            return null == e.which && xe.test(e.type)
              ? null != e.charCode
                ? e.charCode
                : e.keyCode
              : !e.which && void 0 !== t && Ae.test(e.type)
              ? 1 & t
                ? 1
                : 2 & t
                ? 3
                : 4 & t
                ? 2
                : 0
              : e.which;
          },
        },
        T.event.addProp
      ),
      T.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, r) {
          T.event.special[e] = {
            delegateType: r,
            bindType: r,
            handle: function (e) {
              var t,
                n = e.relatedTarget,
                i = e.handleObj;
              return (
                (n && (n === this || T.contains(this, n))) ||
                  ((e.type = i.origType),
                  (t = i.handler.apply(this, arguments)),
                  (e.type = r)),
                t
              );
            },
          };
        }
      ),
      T.fn.extend({
        on: function (e, t, n, i) {
          return Pe(this, e, t, n, i);
        },
        one: function (e, t, n, i) {
          return Pe(this, e, t, n, i, 1);
        },
        off: function (e, t, n) {
          var i, r;
          if (e && e.preventDefault && e.handleObj)
            return (
              (i = e.handleObj),
              T(e.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" != typeof e)
            return (
              (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
              !1 === n && (n = C),
              this.each(function () {
                T.event.remove(this, e, n, t);
              })
            );
          for (r in e) this.off(r, t, e[r]);
          return this;
        },
      });
    var Me =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Le = /<script|<style|<link/i,
      Fe = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function je(e, t) {
      return (
        (l(e, "table") &&
          l(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          T(e).children("tbody")[0]) ||
        e
      );
    }
    function $e(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function Be(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function Ge(e, t) {
      var n, i, r, o, s, a;
      if (1 === t.nodeType) {
        if (
          v.hasData(e) &&
          ((o = v.access(e)), (s = v.set(t, o)), (a = o.events))
        )
          for (r in (delete s.handle, (s.events = {}), a))
            for (n = 0, i = a[r].length; n < i; n++) T.event.add(t, r, a[r][n]);
        u.hasData(e) && ((o = u.access(e)), (s = T.extend({}, o)), u.set(t, s));
      }
    }
    function x(n, i, r, o) {
      i = j.apply([], i);
      var e,
        t,
        s,
        a,
        l,
        u,
        c = 0,
        d = n.length,
        f = d - 1,
        p = i[0],
        h = y(p);
      if (h || (1 < d && "string" == typeof p && !g.checkClone && Fe.test(p)))
        return n.each(function (e) {
          var t = n.eq(e);
          h && (i[0] = p.call(this, e, t.html())), x(t, i, r, o);
        });
      if (
        d &&
        ((t = (e = ke(i, n[0].ownerDocument, !1, n, o)).firstChild),
        1 === e.childNodes.length && (e = t),
        t || o)
      ) {
        for (a = (s = T.map(k(e, "script"), $e)).length; c < d; c++)
          (l = e),
            c !== f &&
              ((l = T.clone(l, !0, !0)), a && T.merge(s, k(l, "script"))),
            r.call(n[c], l, c);
        if (a)
          for (
            u = s[s.length - 1].ownerDocument, T.map(s, Be), c = 0;
            c < a;
            c++
          )
            (l = s[c]),
              Te.test(l.type || "") &&
                !v.access(l, "globalEval") &&
                T.contains(u, l) &&
                (l.src && "module" !== (l.type || "").toLowerCase()
                  ? T._evalUrl && T._evalUrl(l.src)
                  : W(l.textContent.replace(Ne, ""), u, l));
      }
      return n;
    }
    function qe(e, t, n) {
      for (var i, r = t ? T.filter(t, e) : e, o = 0; null != (i = r[o]); o++)
        n || 1 !== i.nodeType || T.cleanData(k(i)),
          i.parentNode &&
            (n && T.contains(i.ownerDocument, i) && Se(k(i, "script")),
            i.parentNode.removeChild(i));
      return e;
    }
    T.extend({
      htmlPrefilter: function (e) {
        return e.replace(Me, "<$1></$2>");
      },
      clone: function (e, t, n) {
        var i,
          r,
          o,
          s,
          a,
          l,
          u,
          c = e.cloneNode(!0),
          d = T.contains(e.ownerDocument, e);
        if (
          !(
            g.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            T.isXMLDoc(e)
          )
        )
          for (s = k(c), i = 0, r = (o = k(e)).length; i < r; i++)
            (a = o[i]),
              (l = s[i]),
              (u = void 0),
              "input" === (u = l.nodeName.toLowerCase()) && be.test(a.type)
                ? (l.checked = a.checked)
                : ("input" !== u && "textarea" !== u) ||
                  (l.defaultValue = a.defaultValue);
        if (t)
          if (n)
            for (o = o || k(e), s = s || k(c), i = 0, r = o.length; i < r; i++)
              Ge(o[i], s[i]);
          else Ge(e, c);
        return (
          0 < (s = k(c, "script")).length && Se(s, !d && k(e, "script")), c
        );
      },
      cleanData: function (e) {
        for (
          var t, n, i, r = T.event.special, o = 0;
          void 0 !== (n = e[o]);
          o++
        )
          if (pe(n)) {
            if ((t = n[v.expando])) {
              if (t.events)
                for (i in t.events)
                  r[i] ? T.event.remove(n, i) : T.removeEvent(n, i, t.handle);
              n[v.expando] = void 0;
            }
            n[u.expando] && (n[u.expando] = void 0);
          }
      },
    }),
      T.fn.extend({
        detach: function (e) {
          return qe(this, e, !0);
        },
        remove: function (e) {
          return qe(this, e);
        },
        text: function (e) {
          return d(
            this,
            function (e) {
              return void 0 === e
                ? T.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return x(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              je(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return x(this, arguments, function (e) {
            var t;
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              (t = je(this, e)).insertBefore(e, t.firstChild);
          });
        },
        before: function () {
          return x(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return x(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (T.cleanData(k(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return T.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return d(
            this,
            function (e) {
              var t = this[0] || {},
                n = 0,
                i = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Le.test(e) &&
                !I[(we.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = T.htmlPrefilter(e);
                try {
                  for (; n < i; n++)
                    1 === (t = this[n] || {}).nodeType &&
                      (T.cleanData(k(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (e) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var n = [];
          return x(
            this,
            arguments,
            function (e) {
              var t = this.parentNode;
              T.inArray(this, n) < 0 &&
                (T.cleanData(k(this)), t && t.replaceChild(e, this));
            },
            n
          );
        },
      }),
      T.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, s) {
          T.fn[e] = function (e) {
            for (var t, n = [], i = T(e), r = i.length - 1, o = 0; o <= r; o++)
              (t = o === r ? this : this.clone(!0)),
                T(i[o])[s](t),
                $.apply(n, t.get());
            return this.pushStack(n);
          };
        }
      );
    function Ue(e) {
      var t = e.ownerDocument.defaultView;
      return (t = t && t.opener ? t : b).getComputedStyle(e);
    }
    var Ve,
      He,
      ze,
      We,
      Ye,
      Xe,
      n,
      Ze = new RegExp("^(" + e + ")(?!px)[a-z%]+$", "i"),
      Ke = new RegExp(p.join("|"), "i");
    function r() {
      var e;
      n &&
        ((Xe.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
        (n.style.cssText =
          "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
        Ce.appendChild(Xe).appendChild(n),
        (e = b.getComputedStyle(n)),
        (Ve = "1%" !== e.top),
        (Ye = 12 === Je(e.marginLeft)),
        (n.style.right = "60%"),
        (We = 36 === Je(e.right)),
        (He = 36 === Je(e.width)),
        (n.style.position = "absolute"),
        (ze = 36 === n.offsetWidth || "absolute"),
        Ce.removeChild(Xe),
        (n = null));
    }
    function Je(e) {
      return Math.round(parseFloat(e));
    }
    function A(e, t, n) {
      var i,
        r,
        o = e.style;
      return (
        (n = n || Ue(e)) &&
          ("" !== (r = n.getPropertyValue(t) || n[t]) ||
            T.contains(e.ownerDocument, e) ||
            (r = T.style(e, t)),
          !g.pixelBoxStyles() &&
            Ze.test(r) &&
            Ke.test(t) &&
            ((e = o.width),
            (t = o.minWidth),
            (i = o.maxWidth),
            (o.minWidth = o.maxWidth = o.width = r),
            (r = n.width),
            (o.width = e),
            (o.minWidth = t),
            (o.maxWidth = i))),
        void 0 !== r ? r + "" : r
      );
    }
    function Qe(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    (Xe = w.createElement("div")),
      (n = w.createElement("div")).style &&
        ((n.style.backgroundClip = "content-box"),
        (n.cloneNode(!0).style.backgroundClip = ""),
        (g.clearCloneStyle = "content-box" === n.style.backgroundClip),
        T.extend(g, {
          boxSizingReliable: function () {
            return r(), He;
          },
          pixelBoxStyles: function () {
            return r(), We;
          },
          pixelPosition: function () {
            return r(), Ve;
          },
          reliableMarginLeft: function () {
            return r(), Ye;
          },
          scrollboxSize: function () {
            return r(), ze;
          },
        }));
    var et = /^(none|table(?!-c[ea]).+)/,
      tt = /^--/,
      nt = { position: "absolute", visibility: "hidden", display: "block" },
      it = { letterSpacing: "0", fontWeight: "400" },
      rt = ["Webkit", "Moz", "ms"],
      ot = w.createElement("div").style;
    function st(e) {
      return (
        T.cssProps[e] ||
        (T.cssProps[e] =
          (function (e) {
            if (e in ot) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = rt.length; n--; )
              if ((e = rt[n] + t) in ot) return e;
          })(e) || e)
      );
    }
    function at(e, t, n) {
      var i = f.exec(t);
      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
    }
    function lt(e, t, n, i, r, o) {
      var s = "width" === t ? 1 : 0,
        a = 0,
        l = 0;
      if (n === (i ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === n && (l += T.css(e, n + p[s], !0, r)),
          i
            ? ("content" === n && (l -= T.css(e, "padding" + p[s], !0, r)),
              "margin" !== n &&
                (l -= T.css(e, "border" + p[s] + "Width", !0, r)))
            : ((l += T.css(e, "padding" + p[s], !0, r)),
              "padding" !== n
                ? (l += T.css(e, "border" + p[s] + "Width", !0, r))
                : (a += T.css(e, "border" + p[s] + "Width", !0, r)));
      return (
        !i &&
          0 <= o &&
          (l += Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - 0.5
            )
          )),
        l
      );
    }
    function ut(e, t, n) {
      var i = Ue(e),
        r = A(e, t, i),
        o = "border-box" === T.css(e, "boxSizing", !1, i),
        s = o;
      if (Ze.test(r)) {
        if (!n) return r;
        r = "auto";
      }
      return (
        (s = s && (g.boxSizingReliable() || r === e.style[t])),
        ("auto" !== r &&
          (parseFloat(r) || "inline" !== T.css(e, "display", !1, i))) ||
          ((r = e["offset" + t[0].toUpperCase() + t.slice(1)]), (s = !0)),
        (r = parseFloat(r) || 0) +
          lt(e, t, n || (o ? "border" : "content"), s, i, r) +
          "px"
      );
    }
    function o(e, t, n, i, r) {
      return new o.prototype.init(e, t, n, i, r);
    }
    T.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) return "" === (t = A(e, "opacity")) ? "1" : t;
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, n, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var r,
            o,
            s,
            a = _(t),
            l = tt.test(t),
            u = e.style;
          if (
            (l || (t = st(a)),
            (s = T.cssHooks[t] || T.cssHooks[a]),
            void 0 === n)
          )
            return s && "get" in s && void 0 !== (r = s.get(e, !1, i))
              ? r
              : u[t];
          "string" == (o = typeof n) &&
            (r = f.exec(n)) &&
            r[1] &&
            ((n = _e(e, t, r)), (o = "number")),
            null != n &&
              n == n &&
              ("number" === o &&
                (n += (r && r[3]) || (T.cssNumber[a] ? "" : "px")),
              g.clearCloneStyle ||
                "" !== n ||
                0 !== t.indexOf("background") ||
                (u[t] = "inherit"),
              (s && "set" in s && void 0 === (n = s.set(e, n, i))) ||
                (l ? u.setProperty(t, n) : (u[t] = n)));
        }
      },
      css: function (e, t, n, i) {
        var r,
          o = _(t);
        return (
          tt.test(t) || (t = st(o)),
          "normal" ===
            (r =
              void 0 ===
              (r =
                (o = T.cssHooks[t] || T.cssHooks[o]) && "get" in o
                  ? o.get(e, !0, n)
                  : r)
                ? A(e, t, i)
                : r) &&
            t in it &&
            (r = it[t]),
          "" === n || n
            ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r)
            : r
        );
      },
    }),
      T.each(["height", "width"], function (e, o) {
        T.cssHooks[o] = {
          get: function (e, t, n) {
            if (t)
              return !et.test(T.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? ut(e, o, n)
                : ye(e, nt, function () {
                    return ut(e, o, n);
                  });
          },
          set: function (e, t, n) {
            var i = Ue(e),
              r = "border-box" === T.css(e, "boxSizing", !1, i),
              n = n && lt(e, o, n, r, i);
            return (
              r &&
                g.scrollboxSize() === i.position &&
                (n -= Math.ceil(
                  e["offset" + o[0].toUpperCase() + o.slice(1)] -
                    parseFloat(i[o]) -
                    lt(e, o, "border", !1, i) -
                    0.5
                )),
              n &&
                (r = f.exec(t)) &&
                "px" !== (r[3] || "px") &&
                ((e.style[o] = t), (t = T.css(e, o))),
              at(0, t, n)
            );
          },
        };
      }),
      (T.cssHooks.marginLeft = Qe(g.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(A(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                ye(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      T.each({ margin: "", padding: "", border: "Width" }, function (r, o) {
        (T.cssHooks[r + o] = {
          expand: function (e) {
            for (
              var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e];
              t < 4;
              t++
            )
              n[r + p[t] + o] = i[t] || i[t - 2] || i[0];
            return n;
          },
        }),
          "margin" !== r && (T.cssHooks[r + o].set = at);
      }),
      T.fn.extend({
        css: function (e, t) {
          return d(
            this,
            function (e, t, n) {
              var i,
                r,
                o = {},
                s = 0;
              if (Array.isArray(t)) {
                for (i = Ue(e), r = t.length; s < r; s++)
                  o[t[s]] = T.css(e, t[s], !1, i);
                return o;
              }
              return void 0 !== n ? T.style(e, t, n) : T.css(e, t);
            },
            e,
            t,
            1 < arguments.length
          );
        },
      }),
      (((T.Tween = o).prototype = {
        constructor: o,
        init: function (e, t, n, i, r, o) {
          (this.elem = e),
            (this.prop = n),
            (this.easing = r || T.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = o || (T.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var e = o.propHooks[this.prop];
          return (e && e.get ? e : o.propHooks._default).get(this);
        },
        run: function (e) {
          var t,
            n = o.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  T.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            (n && n.set ? n : o.propHooks._default).set(this),
            this
          );
        },
      }).init.prototype = o.prototype),
      ((o.propHooks = {
        _default: {
          get: function (e) {
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (e = T.css(e.elem, e.prop, "")) && "auto" !== e
              ? e
              : 0;
          },
          set: function (e) {
            T.fx.step[e.prop]
              ? T.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (null == e.elem.style[T.cssProps[e.prop]] &&
                  !T.cssHooks[e.prop])
              ? (e.elem[e.prop] = e.now)
              : T.style(e.elem, e.prop, e.now + e.unit);
          },
        },
      }).scrollTop = o.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (T.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (T.fx = o.prototype.init),
      (T.fx.step = {});
    var D,
      ct,
      s,
      O,
      dt = /^(?:toggle|show|hide)$/,
      ft = /queueHooks$/;
    function pt() {
      ct &&
        (!1 === w.hidden && b.requestAnimationFrame
          ? b.requestAnimationFrame(pt)
          : b.setTimeout(pt, T.fx.interval),
        T.fx.tick());
    }
    function ht() {
      return (
        b.setTimeout(function () {
          D = void 0;
        }),
        (D = Date.now())
      );
    }
    function mt(e, t) {
      var n,
        i = 0,
        r = { height: e };
      for (t = t ? 1 : 0; i < 4; i += 2 - t)
        r["margin" + (n = p[i])] = r["padding" + n] = e;
      return t && (r.opacity = r.width = e), r;
    }
    function gt(e, t, n) {
      for (
        var i,
          r = (R.tweeners[t] || []).concat(R.tweeners["*"]),
          o = 0,
          s = r.length;
        o < s;
        o++
      )
        if ((i = r[o].call(n, t, e))) return i;
    }
    function R(r, e, t) {
      var n,
        o,
        i,
        s,
        a,
        l,
        u,
        c = 0,
        d = R.prefilters.length,
        f = T.Deferred().always(function () {
          delete p.elem;
        }),
        p = function () {
          if (o) return !1;
          for (
            var e = D || ht(),
              e = Math.max(0, h.startTime + h.duration - e),
              t = 1 - (e / h.duration || 0),
              n = 0,
              i = h.tweens.length;
            n < i;
            n++
          )
            h.tweens[n].run(t);
          return (
            f.notifyWith(r, [h, t, e]),
            t < 1 && i
              ? e
              : (i || f.notifyWith(r, [h, 1, 0]), f.resolveWith(r, [h]), !1)
          );
        },
        h = f.promise({
          elem: r,
          props: T.extend({}, e),
          opts: T.extend(
            !0,
            { specialEasing: {}, easing: T.easing._default },
            t
          ),
          originalProperties: e,
          originalOptions: t,
          startTime: D || ht(),
          duration: t.duration,
          tweens: [],
          createTween: function (e, t) {
            t = T.Tween(
              r,
              h.opts,
              e,
              t,
              h.opts.specialEasing[e] || h.opts.easing
            );
            return h.tweens.push(t), t;
          },
          stop: function (e) {
            var t = 0,
              n = e ? h.tweens.length : 0;
            if (o) return this;
            for (o = !0; t < n; t++) h.tweens[t].run(1);
            return (
              e
                ? (f.notifyWith(r, [h, 1, 0]), f.resolveWith(r, [h, e]))
                : f.rejectWith(r, [h, e]),
              this
            );
          },
        }),
        m = h.props,
        g = m,
        v = h.opts.specialEasing;
      for (i in g)
        if (
          ((s = _(i)),
          (a = v[s]),
          (l = g[i]),
          Array.isArray(l) && ((a = l[1]), (l = g[i] = l[0])),
          i !== s && ((g[s] = l), delete g[i]),
          (u = T.cssHooks[s]) && "expand" in u)
        )
          for (i in ((l = u.expand(l)), delete g[s], l))
            i in g || ((g[i] = l[i]), (v[i] = a));
        else v[s] = a;
      for (; c < d; c++)
        if ((n = R.prefilters[c].call(h, r, m, h.opts)))
          return (
            y(n.stop) &&
              (T._queueHooks(h.elem, h.opts.queue).stop = n.stop.bind(n)),
            n
          );
      return (
        T.map(m, gt, h),
        y(h.opts.start) && h.opts.start.call(r, h),
        h
          .progress(h.opts.progress)
          .done(h.opts.done, h.opts.complete)
          .fail(h.opts.fail)
          .always(h.opts.always),
        T.fx.timer(T.extend(p, { elem: r, anim: h, queue: h.opts.queue })),
        h
      );
    }
    (T.Animation = T.extend(R, {
      tweeners: {
        "*": [
          function (e, t) {
            var n = this.createTween(e, t);
            return _e(n.elem, e, f.exec(t), n), n;
          },
        ],
      },
      tweener: function (e, t) {
        for (
          var n, i = 0, r = (e = y(e) ? ((t = e), ["*"]) : e.match(S)).length;
          i < r;
          i++
        )
          (n = e[i]),
            (R.tweeners[n] = R.tweeners[n] || []),
            R.tweeners[n].unshift(t);
      },
      prefilters: [
        function (e, t, n) {
          var i,
            r,
            o,
            s,
            a,
            l,
            u,
            c = "width" in t || "height" in t,
            d = this,
            f = {},
            p = e.style,
            h = e.nodeType && ve(e),
            m = v.get(e, "fxshow");
          for (i in (n.queue ||
            (null == (s = T._queueHooks(e, "fx")).unqueued &&
              ((s.unqueued = 0),
              (a = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || a();
              })),
            s.unqueued++,
            d.always(function () {
              d.always(function () {
                s.unqueued--, T.queue(e, "fx").length || s.empty.fire();
              });
            })),
          t))
            if (((r = t[i]), dt.test(r))) {
              if (
                (delete t[i],
                (o = o || "toggle" === r),
                r === (h ? "hide" : "show"))
              ) {
                if ("show" !== r || !m || void 0 === m[i]) continue;
                h = !0;
              }
              f[i] = (m && m[i]) || T.style(e, i);
            }
          if ((l = !T.isEmptyObject(t)) || !T.isEmptyObject(f))
            for (i in (c &&
              1 === e.nodeType &&
              ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
              null == (u = m && m.display) && (u = v.get(e, "display")),
              "none" === (c = T.css(e, "display")) &&
                (u
                  ? (c = u)
                  : (E([e], !0),
                    (u = e.style.display || u),
                    (c = T.css(e, "display")),
                    E([e]))),
              ("inline" === c || ("inline-block" === c && null != u)) &&
                "none" === T.css(e, "float") &&
                (l ||
                  (d.done(function () {
                    p.display = u;
                  }),
                  null == u && ((c = p.display), (u = "none" === c ? "" : c))),
                (p.display = "inline-block"))),
            n.overflow &&
              ((p.overflow = "hidden"),
              d.always(function () {
                (p.overflow = n.overflow[0]),
                  (p.overflowX = n.overflow[1]),
                  (p.overflowY = n.overflow[2]);
              })),
            (l = !1),
            f))
              l ||
                (m
                  ? "hidden" in m && (h = m.hidden)
                  : (m = v.access(e, "fxshow", { display: u })),
                o && (m.hidden = !h),
                h && E([e], !0),
                d.done(function () {
                  for (i in (h || E([e]), v.remove(e, "fxshow"), f))
                    T.style(e, i, f[i]);
                })),
                (l = gt(h ? m[i] : 0, i, d)),
                i in m ||
                  ((m[i] = l.start), h && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? R.prefilters.unshift(e) : R.prefilters.push(e);
      },
    })),
      (T.speed = function (e, t, n) {
        var i =
          e && "object" == typeof e
            ? T.extend({}, e)
            : {
                complete: n || (!n && t) || (y(e) && e),
                duration: e,
                easing: (n && t) || (t && !y(t) && t),
              };
        return (
          T.fx.off
            ? (i.duration = 0)
            : "number" != typeof i.duration &&
              (i.duration in T.fx.speeds
                ? (i.duration = T.fx.speeds[i.duration])
                : (i.duration = T.fx.speeds._default)),
          (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            y(i.old) && i.old.call(this), i.queue && T.dequeue(this, i.queue);
          }),
          i
        );
      }),
      T.fn.extend({
        fadeTo: function (e, t, n, i) {
          return this.filter(ve)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, n, i);
        },
        animate: function (t, e, n, i) {
          function r() {
            var e = R(this, T.extend({}, t), s);
            (o || v.get(this, "finish")) && e.stop(!0);
          }
          var o = T.isEmptyObject(t),
            s = T.speed(e, n, i);
          return (
            (r.finish = r),
            o || !1 === s.queue ? this.each(r) : this.queue(s.queue, r)
          );
        },
        stop: function (r, e, o) {
          function s(e) {
            var t = e.stop;
            delete e.stop, t(o);
          }
          return (
            "string" != typeof r && ((o = e), (e = r), (r = void 0)),
            e && !1 !== r && this.queue(r || "fx", []),
            this.each(function () {
              var e = !0,
                t = null != r && r + "queueHooks",
                n = T.timers,
                i = v.get(this);
              if (t) i[t] && i[t].stop && s(i[t]);
              else for (t in i) i[t] && i[t].stop && ft.test(t) && s(i[t]);
              for (t = n.length; t--; )
                n[t].elem !== this ||
                  (null != r && n[t].queue !== r) ||
                  (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
              (!e && o) || T.dequeue(this, r);
            })
          );
        },
        finish: function (s) {
          return (
            !1 !== s && (s = s || "fx"),
            this.each(function () {
              var e,
                t = v.get(this),
                n = t[s + "queue"],
                i = t[s + "queueHooks"],
                r = T.timers,
                o = n ? n.length : 0;
              for (
                t.finish = !0,
                  T.queue(this, s, []),
                  i && i.stop && i.stop.call(this, !0),
                  e = r.length;
                e--;

              )
                r[e].elem === this &&
                  r[e].queue === s &&
                  (r[e].anim.stop(!0), r.splice(e, 1));
              for (e = 0; e < o; e++)
                n[e] && n[e].finish && n[e].finish.call(this);
              delete t.finish;
            })
          );
        },
      }),
      T.each(["toggle", "show", "hide"], function (e, i) {
        var r = T.fn[i];
        T.fn[i] = function (e, t, n) {
          return null == e || "boolean" == typeof e
            ? r.apply(this, arguments)
            : this.animate(mt(i, !0), e, t, n);
        };
      }),
      T.each(
        {
          slideDown: mt("show"),
          slideUp: mt("hide"),
          slideToggle: mt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, i) {
          T.fn[e] = function (e, t, n) {
            return this.animate(i, e, t, n);
          };
        }
      ),
      (T.timers = []),
      (T.fx.tick = function () {
        var e,
          t = 0,
          n = T.timers;
        for (D = Date.now(); t < n.length; t++)
          (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || T.fx.stop(), (D = void 0);
      }),
      (T.fx.timer = function (e) {
        T.timers.push(e), T.fx.start();
      }),
      (T.fx.interval = 13),
      (T.fx.start = function () {
        ct || ((ct = !0), pt());
      }),
      (T.fx.stop = function () {
        ct = null;
      }),
      (T.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (T.fn.delay = function (i, e) {
        return (
          (i = (T.fx && T.fx.speeds[i]) || i),
          this.queue((e = e || "fx"), function (e, t) {
            var n = b.setTimeout(e, i);
            t.stop = function () {
              b.clearTimeout(n);
            };
          })
        );
      }),
      (s = w.createElement("input")),
      (O = w.createElement("select").appendChild(w.createElement("option"))),
      (s.type = "checkbox"),
      (g.checkOn = "" !== s.value),
      (g.optSelected = O.selected),
      ((s = w.createElement("input")).value = "t"),
      (s.type = "radio"),
      (g.radioValue = "t" === s.value);
    var vt,
      P = T.expr.attrHandle,
      yt =
        (T.fn.extend({
          attr: function (e, t) {
            return d(this, T.attr, e, t, 1 < arguments.length);
          },
          removeAttr: function (e) {
            return this.each(function () {
              T.removeAttr(this, e);
            });
          },
        }),
        T.extend({
          attr: function (e, t, n) {
            var i,
              r,
              o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
              return void 0 === e.getAttribute
                ? T.prop(e, t, n)
                : ((1 === o && T.isXMLDoc(e)) ||
                    (r =
                      T.attrHooks[t.toLowerCase()] ||
                      (T.expr.match.bool.test(t) ? vt : void 0)),
                  void 0 !== n
                    ? null === n
                      ? void T.removeAttr(e, t)
                      : r && "set" in r && void 0 !== (i = r.set(e, n, t))
                      ? i
                      : (e.setAttribute(t, n + ""), n)
                    : !(r && "get" in r && null !== (i = r.get(e, t))) &&
                      null == (i = T.find.attr(e, t))
                    ? void 0
                    : i);
          },
          attrHooks: {
            type: {
              set: function (e, t) {
                var n;
                if (!g.radioValue && "radio" === t && l(e, "input"))
                  return (
                    (n = e.value),
                    e.setAttribute("type", t),
                    n && (e.value = n),
                    t
                  );
              },
            },
          },
          removeAttr: function (e, t) {
            var n,
              i = 0,
              r = t && t.match(S);
            if (r && 1 === e.nodeType)
              for (; (n = r[i++]); ) e.removeAttribute(n);
          },
        }),
        (vt = {
          set: function (e, t, n) {
            return !1 === t ? T.removeAttr(e, n) : e.setAttribute(n, n), n;
          },
        }),
        T.each(T.expr.match.bool.source.match(/\w+/g), function (e, t) {
          var s = P[t] || T.find.attr;
          P[t] = function (e, t, n) {
            var i,
              r,
              o = t.toLowerCase();
            return (
              n ||
                ((r = P[o]),
                (P[o] = i),
                (i = null != s(e, t, n) ? o : null),
                (P[o] = r)),
              i
            );
          };
        }),
        /^(?:input|select|textarea|button)$/i),
      _t = /^(?:a|area)$/i;
    function M(e) {
      return (e.match(S) || []).join(" ");
    }
    function L(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function Et(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(S)) || [];
    }
    T.fn.extend({
      prop: function (e, t) {
        return d(this, T.prop, e, t, 1 < arguments.length);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[T.propFix[e] || e];
        });
      },
    }),
      T.extend({
        prop: function (e, t, n) {
          var i,
            r,
            o = e.nodeType;
          if (3 !== o && 8 !== o && 2 !== o)
            return (
              (1 === o && T.isXMLDoc(e)) ||
                ((t = T.propFix[t] || t), (r = T.propHooks[t])),
              void 0 !== n
                ? r && "set" in r && void 0 !== (i = r.set(e, n, t))
                  ? i
                  : (e[t] = n)
                : r && "get" in r && null !== (i = r.get(e, t))
                ? i
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = T.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : yt.test(e.nodeName) || (_t.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      g.optSelected ||
        (T.propHooks.selected = {
          get: function (e) {
            e = e.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null;
          },
          set: function (e) {
            e = e.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
          },
        }),
      T.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          T.propFix[this.toLowerCase()] = this;
        }
      ),
      T.fn.extend({
        addClass: function (t) {
          var e,
            n,
            i,
            r,
            o,
            s,
            a = 0;
          if (y(t))
            return this.each(function (e) {
              T(this).addClass(t.call(this, e, L(this)));
            });
          if ((e = Et(t)).length)
            for (; (n = this[a++]); )
              if (((s = L(n)), (i = 1 === n.nodeType && " " + M(s) + " "))) {
                for (o = 0; (r = e[o++]); )
                  i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                s !== (s = M(i)) && n.setAttribute("class", s);
              }
          return this;
        },
        removeClass: function (t) {
          var e,
            n,
            i,
            r,
            o,
            s,
            a = 0;
          if (y(t))
            return this.each(function (e) {
              T(this).removeClass(t.call(this, e, L(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((e = Et(t)).length)
            for (; (n = this[a++]); )
              if (((s = L(n)), (i = 1 === n.nodeType && " " + M(s) + " "))) {
                for (o = 0; (r = e[o++]); )
                  for (; -1 < i.indexOf(" " + r + " "); )
                    i = i.replace(" " + r + " ", " ");
                s !== (s = M(i)) && n.setAttribute("class", s);
              }
          return this;
        },
        toggleClass: function (r, t) {
          var o = typeof r,
            s = "string" == o || Array.isArray(r);
          return "boolean" == typeof t && s
            ? t
              ? this.addClass(r)
              : this.removeClass(r)
            : y(r)
            ? this.each(function (e) {
                T(this).toggleClass(r.call(this, e, L(this), t), t);
              })
            : this.each(function () {
                var e, t, n, i;
                if (s)
                  for (t = 0, n = T(this), i = Et(r); (e = i[t++]); )
                    n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else
                  (void 0 !== r && "boolean" != o) ||
                    ((e = L(this)) && v.set(this, "__className__", e),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        (!e && !1 !== r && v.get(this, "__className__")) || ""
                      ));
              });
        },
        hasClass: function (e) {
          for (var t, n = 0, i = " " + e + " "; (t = this[n++]); )
            if (1 === t.nodeType && -1 < (" " + M(L(t)) + " ").indexOf(i))
              return !0;
          return !1;
        },
      });
    function bt(e) {
      e.stopPropagation();
    }
    var wt = /\r/g,
      Tt =
        (T.fn.extend({
          val: function (t) {
            var n,
              e,
              i,
              r = this[0];
            return arguments.length
              ? ((i = y(t)),
                this.each(function (e) {
                  1 === this.nodeType &&
                    (null == (e = i ? t.call(this, e, T(this).val()) : t)
                      ? (e = "")
                      : "number" == typeof e
                      ? (e += "")
                      : Array.isArray(e) &&
                        (e = T.map(e, function (e) {
                          return null == e ? "" : e + "";
                        })),
                    ((n =
                      T.valHooks[this.type] ||
                      T.valHooks[this.nodeName.toLowerCase()]) &&
                      "set" in n &&
                      void 0 !== n.set(this, e, "value")) ||
                      (this.value = e));
                }))
              : r
              ? (n =
                  T.valHooks[r.type] || T.valHooks[r.nodeName.toLowerCase()]) &&
                "get" in n &&
                void 0 !== (e = n.get(r, "value"))
                ? e
                : "string" == typeof (e = r.value)
                ? e.replace(wt, "")
                : null == e
                ? ""
                : e
              : void 0;
          },
        }),
        T.extend({
          valHooks: {
            option: {
              get: function (e) {
                var t = T.find.attr(e, "value");
                return null != t ? t : M(T.text(e));
              },
            },
            select: {
              get: function (e) {
                for (
                  var t,
                    n = e.options,
                    i = e.selectedIndex,
                    r = "select-one" === e.type,
                    o = r ? null : [],
                    s = r ? i + 1 : n.length,
                    a = i < 0 ? s : r ? i : 0;
                  a < s;
                  a++
                )
                  if (
                    ((t = n[a]).selected || a === i) &&
                    !t.disabled &&
                    (!t.parentNode.disabled || !l(t.parentNode, "optgroup"))
                  ) {
                    if (((t = T(t).val()), r)) return t;
                    o.push(t);
                  }
                return o;
              },
              set: function (e, t) {
                for (
                  var n, i, r = e.options, o = T.makeArray(t), s = r.length;
                  s--;

                )
                  ((i = r[s]).selected =
                    -1 < T.inArray(T.valHooks.option.get(i), o)) && (n = !0);
                return n || (e.selectedIndex = -1), o;
              },
            },
          },
        }),
        T.each(["radio", "checkbox"], function () {
          (T.valHooks[this] = {
            set: function (e, t) {
              if (Array.isArray(t))
                return (e.checked = -1 < T.inArray(T(e).val(), t));
            },
          }),
            g.checkOn ||
              (T.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value;
              });
        }),
        (g.focusin = "onfocusin" in b),
        /^(?:focusinfocus|focusoutblur)$/),
      St =
        (T.extend(T.event, {
          trigger: function (e, t, n, i) {
            var r,
              o,
              s,
              a,
              l,
              u,
              c,
              d = [n || w],
              f = U.call(e, "type") ? e.type : e,
              p = U.call(e, "namespace") ? e.namespace.split(".") : [],
              h = (c = o = n = n || w);
            if (
              3 !== n.nodeType &&
              8 !== n.nodeType &&
              !Tt.test(f + T.event.triggered) &&
              (-1 < f.indexOf(".") &&
                ((f = (p = f.split(".")).shift()), p.sort()),
              (a = f.indexOf(":") < 0 && "on" + f),
              ((e = e[T.expando]
                ? e
                : new T.Event(f, "object" == typeof e && e)).isTrigger = i
                ? 2
                : 3),
              (e.namespace = p.join(".")),
              (e.rnamespace = e.namespace
                ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
                : null),
              (e.result = void 0),
              e.target || (e.target = n),
              (t = null == t ? [e] : T.makeArray(t, [e])),
              (u = T.event.special[f] || {}),
              i || !u.trigger || !1 !== u.trigger.apply(n, t))
            ) {
              if (!i && !u.noBubble && !m(n)) {
                for (
                  s = u.delegateType || f, Tt.test(s + f) || (h = h.parentNode);
                  h;
                  h = h.parentNode
                )
                  d.push(h), (o = h);
                o === (n.ownerDocument || w) &&
                  d.push(o.defaultView || o.parentWindow || b);
              }
              for (r = 0; (h = d[r++]) && !e.isPropagationStopped(); )
                (c = h),
                  (e.type = 1 < r ? s : u.bindType || f),
                  (l =
                    (v.get(h, "events") || {})[e.type] && v.get(h, "handle")) &&
                    l.apply(h, t),
                  (l = a && h[a]) &&
                    l.apply &&
                    pe(h) &&
                    ((e.result = l.apply(h, t)),
                    !1 === e.result && e.preventDefault());
              return (
                (e.type = f),
                i ||
                  e.isDefaultPrevented() ||
                  (u._default && !1 !== u._default.apply(d.pop(), t)) ||
                  !pe(n) ||
                  (a &&
                    y(n[f]) &&
                    !m(n) &&
                    ((o = n[a]) && (n[a] = null),
                    (T.event.triggered = f),
                    e.isPropagationStopped() && c.addEventListener(f, bt),
                    n[f](),
                    e.isPropagationStopped() && c.removeEventListener(f, bt),
                    (T.event.triggered = void 0),
                    o && (n[a] = o))),
                e.result
              );
            }
          },
          simulate: function (e, t, n) {
            n = T.extend(new T.Event(), n, { type: e, isSimulated: !0 });
            T.event.trigger(n, null, t);
          },
        }),
        T.fn.extend({
          trigger: function (e, t) {
            return this.each(function () {
              T.event.trigger(e, t, this);
            });
          },
          triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return T.event.trigger(e, t, n, !0);
          },
        }),
        g.focusin ||
          T.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
            function r(e) {
              T.event.simulate(i, e.target, T.event.fix(e));
            }
            T.event.special[i] = {
              setup: function () {
                var e = this.ownerDocument || this,
                  t = v.access(e, i);
                t || e.addEventListener(n, r, !0), v.access(e, i, (t || 0) + 1);
              },
              teardown: function () {
                var e = this.ownerDocument || this,
                  t = v.access(e, i) - 1;
                t
                  ? v.access(e, i, t)
                  : (e.removeEventListener(n, r, !0), v.remove(e, i));
              },
            };
          }),
        b.location),
      It = Date.now(),
      kt = /\?/,
      Ct =
        ((T.parseXML = function (e) {
          var t;
          if (!e || "string" != typeof e) return null;
          try {
            t = new b.DOMParser().parseFromString(e, "text/xml");
          } catch (e) {
            t = void 0;
          }
          return (
            (t && !t.getElementsByTagName("parsererror").length) ||
              T.error("Invalid XML: " + e),
            t
          );
        }),
        /\[\]$/),
      xt = /\r?\n/g,
      At = /^(?:submit|button|image|reset|file)$/i,
      Dt = /^(?:input|select|textarea|keygen)/i;
    (T.param = function (e, t) {
      function n(e, t) {
        (t = y(t) ? t() : t),
          (r[r.length] =
            encodeURIComponent(e) +
            "=" +
            encodeURIComponent(null == t ? "" : t));
      }
      var i,
        r = [];
      if (Array.isArray(e) || (e.jquery && !T.isPlainObject(e)))
        T.each(e, function () {
          n(this.name, this.value);
        });
      else
        for (i in e)
          !(function n(i, e, r, o) {
            if (Array.isArray(e))
              T.each(e, function (e, t) {
                r || Ct.test(i)
                  ? o(i, t)
                  : n(
                      i +
                        "[" +
                        ("object" == typeof t && null != t ? e : "") +
                        "]",
                      t,
                      r,
                      o
                    );
              });
            else if (r || "object" !== h(e)) o(i, e);
            else for (var t in e) n(i + "[" + t + "]", e[t], r, o);
          })(i, e[i], t, n);
      return r.join("&");
    }),
      T.fn.extend({
        serialize: function () {
          return T.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = T.prop(this, "elements");
            return e ? T.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !T(this).is(":disabled") &&
                Dt.test(this.nodeName) &&
                !At.test(e) &&
                (this.checked || !be.test(e))
              );
            })
            .map(function (e, t) {
              var n = T(this).val();
              return null == n
                ? null
                : Array.isArray(n)
                ? T.map(n, function (e) {
                    return { name: t.name, value: e.replace(xt, "\r\n") };
                  })
                : { name: t.name, value: n.replace(xt, "\r\n") };
            })
            .get();
        },
      });
    var Ot = /%20/g,
      Rt = /#.*$/,
      Pt = /([?&])_=[^&]*/,
      Mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Lt = /^(?:GET|HEAD)$/,
      Ft = /^\/\//,
      Nt = {},
      jt = {},
      $t = "*/".concat("*"),
      Bt = w.createElement("a");
    function Gt(o) {
      return function (e, t) {
        "string" != typeof e && ((t = e), (e = "*"));
        var n,
          i = 0,
          r = e.toLowerCase().match(S) || [];
        if (y(t))
          for (; (n = r[i++]); )
            "+" === n[0]
              ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
              : (o[n] = o[n] || []).push(t);
      };
    }
    function qt(t, i, r, o) {
      var s = {},
        a = t === jt;
      function l(e) {
        var n;
        return (
          (s[e] = !0),
          T.each(t[e] || [], function (e, t) {
            t = t(i, r, o);
            return "string" != typeof t || a || s[t]
              ? a
                ? !(n = t)
                : void 0
              : (i.dataTypes.unshift(t), l(t), !1);
          }),
          n
        );
      }
      return l(i.dataTypes[0]) || (!s["*"] && l("*"));
    }
    function Ut(e, t) {
      var n,
        i,
        r = T.ajaxSettings.flatOptions || {};
      for (n in t) void 0 !== t[n] && ((r[n] ? e : (i = i || {}))[n] = t[n]);
      return i && T.extend(!0, e, i), e;
    }
    (Bt.href = St.href),
      T.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: St.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              St.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": $t,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": T.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? Ut(Ut(e, T.ajaxSettings), t) : Ut(T.ajaxSettings, e);
        },
        ajaxPrefilter: Gt(Nt),
        ajaxTransport: Gt(jt),
        ajax: function (e, t) {
          "object" == typeof e && ((t = e), (e = void 0));
          var l,
            u,
            c,
            n,
            d,
            f,
            p,
            i,
            h = T.ajaxSetup({}, (t = t || {})),
            m = h.context || h,
            g = h.context && (m.nodeType || m.jquery) ? T(m) : T.event,
            v = T.Deferred(),
            y = T.Callbacks("once memory"),
            _ = h.statusCode || {},
            r = {},
            o = {},
            s = "canceled",
            E = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (f) {
                  if (!n)
                    for (n = {}; (t = Mt.exec(c)); )
                      n[t[1].toLowerCase()] = t[2];
                  t = n[e.toLowerCase()];
                }
                return null == t ? null : t;
              },
              getAllResponseHeaders: function () {
                return f ? c : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == f &&
                    ((e = o[e.toLowerCase()] = o[e.toLowerCase()] || e),
                    (r[e] = t)),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == f && (h.mimeType = e), this;
              },
              statusCode: function (e) {
                if (e)
                  if (f) E.always(e[E.status]);
                  else for (var t in e) _[t] = [_[t], e[t]];
                return this;
              },
              abort: function (e) {
                e = e || s;
                return l && l.abort(e), a(0, e), this;
              },
            };
          if (
            (v.promise(E),
            (h.url = ((e || h.url || St.href) + "").replace(
              Ft,
              St.protocol + "//"
            )),
            (h.type = t.method || t.type || h.method || h.type),
            (h.dataTypes = (h.dataType || "*").toLowerCase().match(S) || [""]),
            null == h.crossDomain)
          ) {
            e = w.createElement("a");
            try {
              (e.href = h.url),
                (e.href = e.href),
                (h.crossDomain =
                  Bt.protocol + "//" + Bt.host != e.protocol + "//" + e.host);
            } catch (e) {
              h.crossDomain = !0;
            }
          }
          if (
            (h.data &&
              h.processData &&
              "string" != typeof h.data &&
              (h.data = T.param(h.data, h.traditional)),
            qt(Nt, h, t, E),
            f)
          )
            return E;
          for (i in ((p = T.event && h.global) &&
            0 == T.active++ &&
            T.event.trigger("ajaxStart"),
          (h.type = h.type.toUpperCase()),
          (h.hasContent = !Lt.test(h.type)),
          (u = h.url.replace(Rt, "")),
          h.hasContent
            ? h.data &&
              h.processData &&
              0 ===
                (h.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (h.data = h.data.replace(Ot, "+"))
            : ((e = h.url.slice(u.length)),
              h.data &&
                (h.processData || "string" == typeof h.data) &&
                ((u += (kt.test(u) ? "&" : "?") + h.data), delete h.data),
              !1 === h.cache &&
                ((u = u.replace(Pt, "$1")),
                (e = (kt.test(u) ? "&" : "?") + "_=" + It++ + e)),
              (h.url = u + e)),
          h.ifModified &&
            (T.lastModified[u] &&
              E.setRequestHeader("If-Modified-Since", T.lastModified[u]),
            T.etag[u] && E.setRequestHeader("If-None-Match", T.etag[u])),
          ((h.data && h.hasContent && !1 !== h.contentType) || t.contentType) &&
            E.setRequestHeader("Content-Type", h.contentType),
          E.setRequestHeader(
            "Accept",
            h.dataTypes[0] && h.accepts[h.dataTypes[0]]
              ? h.accepts[h.dataTypes[0]] +
                  ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "")
              : h.accepts["*"]
          ),
          h.headers))
            E.setRequestHeader(i, h.headers[i]);
          if (h.beforeSend && (!1 === h.beforeSend.call(m, E, h) || f))
            return E.abort();
          if (
            ((s = "abort"),
            y.add(h.complete),
            E.done(h.success),
            E.fail(h.error),
            (l = qt(jt, h, t, E)))
          ) {
            if (((E.readyState = 1), p && g.trigger("ajaxSend", [E, h]), f))
              return E;
            h.async &&
              0 < h.timeout &&
              (d = b.setTimeout(function () {
                E.abort("timeout");
              }, h.timeout));
            try {
              (f = !1), l.send(r, a);
            } catch (e) {
              if (f) throw e;
              a(-1, e);
            }
          } else a(-1, "No Transport");
          function a(e, t, n, i) {
            var r,
              o,
              s,
              a = t;
            f ||
              ((f = !0),
              d && b.clearTimeout(d),
              (l = void 0),
              (c = i || ""),
              (E.readyState = 0 < e ? 4 : 0),
              (i = (200 <= e && e < 300) || 304 === e),
              n &&
                (s = (function (e, t, n) {
                  for (
                    var i, r, o, s, a = e.contents, l = e.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === i &&
                        (i = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (i)
                    for (r in a)
                      if (a[r] && a[r].test(i)) {
                        l.unshift(r);
                        break;
                      }
                  if (l[0] in n) o = l[0];
                  else {
                    for (r in n) {
                      if (!l[0] || e.converters[r + " " + l[0]]) {
                        o = r;
                        break;
                      }
                      s = s || r;
                    }
                    o = o || s;
                  }
                  if (o) return o !== l[0] && l.unshift(o), n[o];
                })(h, E, n)),
              (s = (function (e, t, n, i) {
                var r,
                  o,
                  s,
                  a,
                  l,
                  u = {},
                  c = e.dataTypes.slice();
                if (c[1])
                  for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                for (o = c.shift(); o; )
                  if (
                    (e.responseFields[o] && (n[e.responseFields[o]] = t),
                    !l &&
                      i &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (l = o),
                    (o = c.shift()))
                  )
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                      if (!(s = u[l + " " + o] || u["* " + o]))
                        for (r in u)
                          if (
                            (a = r.split(" "))[1] === o &&
                            (s = u[l + " " + a[0]] || u["* " + a[0]])
                          ) {
                            !0 === s
                              ? (s = u[r])
                              : !0 !== u[r] && ((o = a[0]), c.unshift(a[1]));
                            break;
                          }
                      if (!0 !== s)
                        if (s && e.throws) t = s(t);
                        else
                          try {
                            t = s(t);
                          } catch (e) {
                            return {
                              state: "parsererror",
                              error: s
                                ? e
                                : "No conversion from " + l + " to " + o,
                            };
                          }
                    }
                return { state: "success", data: t };
              })(h, s, E, i)),
              i
                ? (h.ifModified &&
                    ((n = E.getResponseHeader("Last-Modified")) &&
                      (T.lastModified[u] = n),
                    (n = E.getResponseHeader("etag")) && (T.etag[u] = n)),
                  204 === e || "HEAD" === h.type
                    ? (a = "nocontent")
                    : 304 === e
                    ? (a = "notmodified")
                    : ((a = s.state), (r = s.data), (i = !(o = s.error))))
                : ((o = a), (!e && a) || ((a = "error"), e < 0 && (e = 0))),
              (E.status = e),
              (E.statusText = (t || a) + ""),
              i ? v.resolveWith(m, [r, a, E]) : v.rejectWith(m, [E, a, o]),
              E.statusCode(_),
              (_ = void 0),
              p &&
                g.trigger(i ? "ajaxSuccess" : "ajaxError", [E, h, i ? r : o]),
              y.fireWith(m, [E, a]),
              p &&
                (g.trigger("ajaxComplete", [E, h]),
                --T.active || T.event.trigger("ajaxStop")));
          }
          return E;
        },
        getJSON: function (e, t, n) {
          return T.get(e, t, n, "json");
        },
        getScript: function (e, t) {
          return T.get(e, void 0, t, "script");
        },
      }),
      T.each(["get", "post"], function (e, r) {
        T[r] = function (e, t, n, i) {
          return (
            y(t) && ((i = i || n), (n = t), (t = void 0)),
            T.ajax(
              T.extend(
                { url: e, type: r, dataType: i, data: t, success: n },
                T.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      (T._evalUrl = function (e) {
        return T.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      T.fn.extend({
        wrapAll: function (e) {
          return (
            this[0] &&
              (y(e) && (e = e.call(this[0])),
              (e = T(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && e.insertBefore(this[0]),
              e
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (n) {
          return y(n)
            ? this.each(function (e) {
                T(this).wrapInner(n.call(this, e));
              })
            : this.each(function () {
                var e = T(this),
                  t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n);
              });
        },
        wrap: function (t) {
          var n = y(t);
          return this.each(function (e) {
            T(this).wrapAll(n ? t.call(this, e) : t);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                T(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (T.expr.pseudos.hidden = function (e) {
        return !T.expr.pseudos.visible(e);
      }),
      (T.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (T.ajaxSettings.xhr = function () {
        try {
          return new b.XMLHttpRequest();
        } catch (e) {}
      });
    var Vt = { 0: 200, 1223: 204 },
      Ht = T.ajaxSettings.xhr(),
      zt =
        ((g.cors = !!Ht && "withCredentials" in Ht),
        (g.ajax = Ht = !!Ht),
        T.ajaxTransport(function (r) {
          var o, s;
          if (g.cors || (Ht && !r.crossDomain))
            return {
              send: function (e, t) {
                var n,
                  i = r.xhr();
                if (
                  (i.open(r.type, r.url, r.async, r.username, r.password),
                  r.xhrFields)
                )
                  for (n in r.xhrFields) i[n] = r.xhrFields[n];
                for (n in (r.mimeType &&
                  i.overrideMimeType &&
                  i.overrideMimeType(r.mimeType),
                r.crossDomain ||
                  e["X-Requested-With"] ||
                  (e["X-Requested-With"] = "XMLHttpRequest"),
                e))
                  i.setRequestHeader(n, e[n]);
                (o = function (e) {
                  return function () {
                    o &&
                      ((o =
                        s =
                        i.onload =
                        i.onerror =
                        i.onabort =
                        i.ontimeout =
                        i.onreadystatechange =
                          null),
                      "abort" === e
                        ? i.abort()
                        : "error" === e
                        ? "number" != typeof i.status
                          ? t(0, "error")
                          : t(i.status, i.statusText)
                        : t(
                            Vt[i.status] || i.status,
                            i.statusText,
                            "text" !== (i.responseType || "text") ||
                              "string" != typeof i.responseText
                              ? { binary: i.response }
                              : { text: i.responseText },
                            i.getAllResponseHeaders()
                          ));
                  };
                }),
                  (i.onload = o()),
                  (s = i.onerror = i.ontimeout = o("error")),
                  void 0 !== i.onabort
                    ? (i.onabort = s)
                    : (i.onreadystatechange = function () {
                        4 === i.readyState &&
                          b.setTimeout(function () {
                            o && s();
                          });
                      }),
                  (o = o("abort"));
                try {
                  i.send((r.hasContent && r.data) || null);
                } catch (e) {
                  if (o) throw e;
                }
              },
              abort: function () {
                o && o();
              },
            };
        }),
        T.ajaxPrefilter(function (e) {
          e.crossDomain && (e.contents.script = !1);
        }),
        T.ajaxSetup({
          accepts: {
            script:
              "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          },
          contents: { script: /\b(?:java|ecma)script\b/ },
          converters: {
            "text script": function (e) {
              return T.globalEval(e), e;
            },
          },
        }),
        T.ajaxPrefilter("script", function (e) {
          void 0 === e.cache && (e.cache = !1),
            e.crossDomain && (e.type = "GET");
        }),
        T.ajaxTransport("script", function (n) {
          var i, r;
          if (n.crossDomain)
            return {
              send: function (e, t) {
                (i = T("<script>")
                  .prop({ charset: n.scriptCharset, src: n.url })
                  .on(
                    "load error",
                    (r = function (e) {
                      i.remove(),
                        (r = null),
                        e && t("error" === e.type ? 404 : 200, e.type);
                    })
                  )),
                  w.head.appendChild(i[0]);
              },
              abort: function () {
                r && r();
              },
            };
        }),
        []),
      Wt = /(=)\?(?=&|$)|\?\?/,
      Yt =
        (T.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
            var e = zt.pop() || T.expando + "_" + It++;
            return (this[e] = !0), e;
          },
        }),
        T.ajaxPrefilter("json jsonp", function (e, t, n) {
          var i,
            r,
            o,
            s =
              !1 !== e.jsonp &&
              (Wt.test(e.url)
                ? "url"
                : "string" == typeof e.data &&
                  0 ===
                    (e.contentType || "").indexOf(
                      "application/x-www-form-urlencoded"
                    ) &&
                  Wt.test(e.data) &&
                  "data");
          if (s || "jsonp" === e.dataTypes[0])
            return (
              (i = e.jsonpCallback =
                y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
              s
                ? (e[s] = e[s].replace(Wt, "$1" + i))
                : !1 !== e.jsonp &&
                  (e.url += (kt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
              (e.converters["script json"] = function () {
                return o || T.error(i + " was not called"), o[0];
              }),
              (e.dataTypes[0] = "json"),
              (r = b[i]),
              (b[i] = function () {
                o = arguments;
              }),
              n.always(function () {
                void 0 === r ? T(b).removeProp(i) : (b[i] = r),
                  e[i] && ((e.jsonpCallback = t.jsonpCallback), zt.push(i)),
                  o && y(r) && r(o[0]),
                  (o = r = void 0);
              }),
              "script"
            );
        }),
        (g.createHTMLDocument =
          (((e = w.implementation.createHTMLDocument("").body).innerHTML =
            "<form></form><form></form>"),
          2 === e.childNodes.length)),
        (T.parseHTML = function (e, t, n) {
          return "string" != typeof e
            ? []
            : ("boolean" == typeof t && ((n = t), (t = !1)),
              t ||
                (g.createHTMLDocument
                  ? (((i = (t =
                      w.implementation.createHTMLDocument("")).createElement(
                      "base"
                    )).href = w.location.href),
                    t.head.appendChild(i))
                  : (t = w)),
              (i = !n && []),
              (n = J.exec(e))
                ? [t.createElement(n[1])]
                : ((n = ke([e], t, i)),
                  i && i.length && T(i).remove(),
                  T.merge([], n.childNodes)));
          var i;
        }),
        (T.fn.load = function (e, t, n) {
          var i,
            r,
            o,
            s = this,
            a = e.indexOf(" ");
          return (
            -1 < a && ((i = M(e.slice(a))), (e = e.slice(0, a))),
            y(t)
              ? ((n = t), (t = void 0))
              : t && "object" == typeof t && (r = "POST"),
            0 < s.length &&
              T.ajax({ url: e, type: r || "GET", dataType: "html", data: t })
                .done(function (e) {
                  (o = arguments),
                    s.html(i ? T("<div>").append(T.parseHTML(e)).find(i) : e);
                })
                .always(
                  n &&
                    function (e, t) {
                      s.each(function () {
                        n.apply(this, o || [e.responseText, t, e]);
                      });
                    }
                ),
            this
          );
        }),
        T.each(
          [
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend",
          ],
          function (e, t) {
            T.fn[t] = function (e) {
              return this.on(t, e);
            };
          }
        ),
        (T.expr.pseudos.animated = function (t) {
          return T.grep(T.timers, function (e) {
            return t === e.elem;
          }).length;
        }),
        (T.offset = {
          setOffset: function (e, t, n) {
            var i,
              r,
              o,
              s,
              a = T.css(e, "position"),
              l = T(e),
              u = {};
            "static" === a && (e.style.position = "relative"),
              (o = l.offset()),
              (i = T.css(e, "top")),
              (s = T.css(e, "left")),
              (a =
                ("absolute" === a || "fixed" === a) &&
                -1 < (i + s).indexOf("auto")
                  ? ((r = (a = l.position()).top), a.left)
                  : ((r = parseFloat(i) || 0), parseFloat(s) || 0)),
              null != (t = y(t) ? t.call(e, n, T.extend({}, o)) : t).top &&
                (u.top = t.top - o.top + r),
              null != t.left && (u.left = t.left - o.left + a),
              "using" in t ? t.using.call(e, u) : l.css(u);
          },
        }),
        T.fn.extend({
          offset: function (t) {
            if (arguments.length)
              return void 0 === t
                ? this
                : this.each(function (e) {
                    T.offset.setOffset(this, t, e);
                  });
            var e,
              n = this[0];
            return n
              ? n.getClientRects().length
                ? ((e = n.getBoundingClientRect()),
                  (n = n.ownerDocument.defaultView),
                  { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
                : { top: 0, left: 0 }
              : void 0;
          },
          position: function () {
            if (this[0]) {
              var e,
                t,
                n,
                i = this[0],
                r = { top: 0, left: 0 };
              if ("fixed" === T.css(i, "position"))
                t = i.getBoundingClientRect();
              else {
                for (
                  t = this.offset(),
                    n = i.ownerDocument,
                    e = i.offsetParent || n.documentElement;
                  e &&
                  (e === n.body || e === n.documentElement) &&
                  "static" === T.css(e, "position");

                )
                  e = e.parentNode;
                e &&
                  e !== i &&
                  1 === e.nodeType &&
                  (((r = T(e).offset()).top += T.css(e, "borderTopWidth", !0)),
                  (r.left += T.css(e, "borderLeftWidth", !0)));
              }
              return {
                top: t.top - r.top - T.css(i, "marginTop", !0),
                left: t.left - r.left - T.css(i, "marginLeft", !0),
              };
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var e = this.offsetParent;
                e && "static" === T.css(e, "position");

              )
                e = e.offsetParent;
              return e || Ce;
            });
          },
        }),
        T.each(
          { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
          function (t, r) {
            var o = "pageYOffset" === r;
            T.fn[t] = function (e) {
              return d(
                this,
                function (e, t, n) {
                  var i;
                  if (
                    (m(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView),
                    void 0 === n)
                  )
                    return i ? i[r] : e[t];
                  i
                    ? i.scrollTo(o ? i.pageXOffset : n, o ? n : i.pageYOffset)
                    : (e[t] = n);
                },
                t,
                e,
                arguments.length
              );
            };
          }
        ),
        T.each(["top", "left"], function (e, n) {
          T.cssHooks[n] = Qe(g.pixelPosition, function (e, t) {
            if (t)
              return (t = A(e, n)), Ze.test(t) ? T(e).position()[n] + "px" : t;
          });
        }),
        T.each({ Height: "height", Width: "width" }, function (s, a) {
          T.each(
            { padding: "inner" + s, content: a, "": "outer" + s },
            function (i, o) {
              T.fn[o] = function (e, t) {
                var n = arguments.length && (i || "boolean" != typeof e),
                  r = i || (!0 === e || !0 === t ? "margin" : "border");
                return d(
                  this,
                  function (e, t, n) {
                    var i;
                    return m(e)
                      ? 0 === o.indexOf("outer")
                        ? e["inner" + s]
                        : e.document.documentElement["client" + s]
                      : 9 === e.nodeType
                      ? ((i = e.documentElement),
                        Math.max(
                          e.body["scroll" + s],
                          i["scroll" + s],
                          e.body["offset" + s],
                          i["offset" + s],
                          i["client" + s]
                        ))
                      : void 0 === n
                      ? T.css(e, t, r)
                      : T.style(e, t, n, r);
                  },
                  a,
                  n ? e : void 0,
                  n
                );
              };
            }
          );
        }),
        T.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
            " "
          ),
          function (e, n) {
            T.fn[n] = function (e, t) {
              return 0 < arguments.length
                ? this.on(n, null, e, t)
                : this.trigger(n);
            };
          }
        ),
        T.fn.extend({
          hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e);
          },
        }),
        T.fn.extend({
          bind: function (e, t, n) {
            return this.on(e, null, t, n);
          },
          unbind: function (e, t) {
            return this.off(e, null, t);
          },
          delegate: function (e, t, n, i) {
            return this.on(t, e, n, i);
          },
          undelegate: function (e, t, n) {
            return 1 === arguments.length
              ? this.off(e, "**")
              : this.off(t, e || "**", n);
          },
        }),
        (T.proxy = function (e, t) {
          var n, i;
          if (("string" == typeof t && ((i = e[t]), (t = e), (e = i)), y(e)))
            return (
              (n = a.call(arguments, 2)),
              ((i = function () {
                return e.apply(t || this, n.concat(a.call(arguments)));
              }).guid = e.guid =
                e.guid || T.guid++),
              i
            );
        }),
        (T.holdReady = function (e) {
          e ? T.readyWait++ : T.ready(!0);
        }),
        (T.isArray = Array.isArray),
        (T.parseJSON = JSON.parse),
        (T.nodeName = l),
        (T.isFunction = y),
        (T.isWindow = m),
        (T.camelCase = _),
        (T.type = h),
        (T.now = Date.now),
        (T.isNumeric = function (e) {
          var t = T.type(e);
          return (
            ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
          );
        }),
        "function" == typeof define &&
          define.amd &&
          define("jquery", [], function () {
            return T;
          }),
        b.jQuery),
      Xt = b.$;
    return (
      (T.noConflict = function (e) {
        return (
          b.$ === T && (b.$ = Xt), e && b.jQuery === T && (b.jQuery = Yt), T
        );
      }),
      F || (b.jQuery = b.$ = T),
      T
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], t)
      : t(
          ((e =
            "undefined" != typeof globalThis ? globalThis : e || self).IMask =
            {})
        );
  })(this, function (e) {
    "use strict";
    function O(e) {
      return e && e.Math == Math && e;
    }
    function t(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    }
    function R(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      };
    }
    function P(e) {
      if (null == e) throw TypeError("Can't call method on " + e);
      return e;
    }
    function M(e) {
      return ie(re(e));
    }
    function L(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    }
    function F(e, t) {
      if (!oe(e)) return e;
      var n, i;
      if (t && "function" == typeof (n = e.toString) && !oe((i = n.call(e))))
        return i;
      if ("function" == typeof (n = e.valueOf) && !oe((i = n.call(e))))
        return i;
      if (t || "function" != typeof (n = e.toString) || oe((i = n.call(e))))
        throw TypeError("Can't convert object to primitive value");
      return i;
    }
    function q(e) {
      return Object(se(e));
    }
    function U(e) {
      if (Ee(e)) return e;
      throw TypeError(String(e) + " is not an object");
    }
    function V(t, n) {
      try {
        Ae(xe, t, n);
      } catch (e) {
        xe[t] = n;
      }
      return n;
    }
    var n,
      H,
      z,
      W,
      Y,
      i,
      X,
      r,
      o =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : {},
      o =
        O("object" == typeof globalThis && globalThis) ||
        O("object" == typeof window && window) ||
        O("object" == typeof self && self) ||
        O("object" == typeof o && o) ||
        (function () {
          return this;
        })() ||
        Function("return this")(),
      Z = {},
      s = !t(function () {
        return (
          7 !=
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      }),
      K = {},
      J = {}.propertyIsEnumerable,
      Q = Object.getOwnPropertyDescriptor,
      a = Q && !J.call({ 1: 2 }, 1),
      ee =
        ((K.f = a
          ? function (e) {
              e = Q(this, e);
              return !!e && e.enumerable;
            }
          : J),
        {}.toString),
      a = t,
      te = function (e) {
        return ee.call(e).slice(8, -1);
      },
      ne = "".split,
      J = a(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (e) {
            return "String" == te(e) ? ne.call(e, "") : Object(e);
          }
        : Object,
      ie = J,
      re = P,
      oe = L,
      se = P,
      ae = q,
      le = {}.hasOwnProperty,
      a =
        Object.hasOwn ||
        function (e, t) {
          return le.call(ae(e), t);
        },
      l = L,
      ue = o.document,
      ce = l(ue) && l(ue.createElement),
      de = function (e) {
        return ce ? ue.createElement(e) : {};
      },
      l =
        !s &&
        !t(function () {
          return (
            7 !=
            Object.defineProperty(de("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        }),
      fe = K,
      pe = R,
      he = M,
      me = F,
      ge = a,
      ve = l,
      ye = Object.getOwnPropertyDescriptor,
      _e =
        ((Z.f = s
          ? ye
          : function (e, t) {
              if (((e = he(e)), (t = me(t, !0)), ve))
                try {
                  return ye(e, t);
                } catch (e) {}
              if (ge(e, t)) return pe(!fe.f.call(e, t), e[t]);
            }),
        {}),
      Ee = L,
      be = l,
      we = U,
      Te = F,
      Se = Object.defineProperty,
      l =
        ((_e.f = s
          ? Se
          : function (e, t, n) {
              if ((we(e), (t = Te(t, !0)), we(n), be))
                try {
                  return Se(e, t, n);
                } catch (e) {}
              if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported");
              return "value" in n && (e[t] = n.value), e;
            }),
        s),
      Ie = _e,
      ke = R,
      l = l
        ? function (e, t, n) {
            return Ie.f(e, t, ke(1, n));
          }
        : function (e, t, n) {
            return (e[t] = n), e;
          },
      Ce = { exports: {} },
      xe = o,
      Ae = l,
      u = V,
      c = "__core-js_shared__",
      u = o[c] || u(c, {}),
      c = u,
      De = Function.toString,
      c =
        ("function" != typeof c.inspectSource &&
          (c.inspectSource = function (e) {
            return De.call(e);
          }),
        c.inspectSource),
      d = c,
      f = o.WeakMap,
      d = "function" == typeof f && /native code/.test(d(f)),
      f = { exports: {} },
      Oe = u,
      Re =
        ((f.exports = function (e, t) {
          return Oe[e] || (Oe[e] = void 0 !== t ? t : {});
        })("versions", []).push({
          version: "3.15.2",
          mode: "global",
          copyright: "Â© 2021 Denis Pushkarev (zloirock.ru)",
        }),
        0),
      Pe = Math.random(),
      f = f.exports,
      Me = function (e) {
        return (
          "Symbol(" +
          String(void 0 === e ? "" : e) +
          ")_" +
          (++Re + Pe).toString(36)
        );
      },
      Le = f("keys"),
      f = {},
      Fe = L,
      Ne = l,
      je = a,
      p = function (e) {
        return Le[e] || (Le[e] = Me(e));
      },
      h = f,
      $e = "Object already initialized",
      Be = o.WeakMap,
      d =
        ((X =
          d || u.state
            ? ((n = u.state || (u.state = new Be())),
              (H = n.get),
              (z = n.has),
              (W = n.set),
              (Y = function (e, t) {
                if (z.call(n, e)) throw new TypeError($e);
                return (t.facade = e), W.call(n, e, t), t;
              }),
              (i = function (e) {
                return H.call(n, e) || {};
              }),
              function (e) {
                return z.call(n, e);
              })
            : ((h[(r = p("state"))] = !0),
              (Y = function (e, t) {
                if (je(e, r)) throw new TypeError($e);
                return (t.facade = e), Ne(e, r, t), t;
              }),
              (i = function (e) {
                return je(e, r) ? e[r] : {};
              }),
              function (e) {
                return je(e, r);
              })),
        {
          set: Y,
          get: i,
          has: X,
          enforce: function (e) {
            return X(e) ? i(e) : Y(e, {});
          },
          getterFor: function (t) {
            return function (e) {
              if (Fe(e) && (e = i(e)).type === t) return e;
              throw TypeError("Incompatible receiver, " + t + " required");
            };
          },
        }),
      Ge = o,
      qe = l,
      Ue = a,
      Ve = V,
      He = c,
      ze = d.get,
      We = d.enforce,
      Ye = String(String).split("String");
    (Ce.exports = function (e, t, n, i) {
      var r,
        o = !!i && !!i.unsafe,
        s = !!i && !!i.enumerable,
        i = !!i && !!i.noTargetGet;
      "function" == typeof n &&
        ("string" != typeof t || Ue(n, "name") || qe(n, "name", t),
        (r = We(n)).source ||
          (r.source = Ye.join("string" == typeof t ? t : ""))),
        e === Ge
          ? s
            ? (e[t] = n)
            : Ve(t, n)
          : (o ? !i && e[t] && (s = !0) : delete e[t],
            s ? (e[t] = n) : qe(e, t, n));
    })(Function.prototype, "toString", function () {
      return ("function" == typeof this && ze(this).source) || He(this);
    });
    function Xe(e) {
      return "function" == typeof e ? e : void 0;
    }
    function Ze(e, t) {
      return arguments.length < 2
        ? Xe(ot[e]) || Xe(st[e])
        : (ot[e] && ot[e][t]) || (st[e] && st[e][t]);
    }
    function Ke(e) {
      return isNaN((e = +e)) ? 0 : (0 < e ? lt : at)(e);
    }
    function Je(e) {
      return 0 < e ? ct(ut(e), 9007199254740991) : 0;
    }
    function Qe(a) {
      return function (e, t, n) {
        var i,
          r = ht(e),
          o = mt(r.length),
          s = gt(n, o);
        if (a && t != t) {
          for (; s < o; ) if ((i = r[s++]) != i) return !0;
        } else for (; s < o; s++) if ((a || s in r) && r[s] === t) return a || s || 0;
        return !a && -1;
      };
    }
    function et(e, t) {
      var n,
        i = yt(e),
        r = 0,
        o = [];
      for (n in i) !vt(Et, n) && vt(i, n) && o.push(n);
      for (; t.length > r; ) !vt(i, (n = t[r++])) || ~_t(o, n) || o.push(n);
      return o;
    }
    function tt(e, t) {
      return (
        (e = Pt[Rt(e)]) == Lt ||
        (e != Mt && ("function" == typeof t ? Dt(t) : !!t))
      );
    }
    function nt(e, t) {
      var n,
        i,
        r,
        o = e.target,
        s = e.global,
        a = e.stat,
        l = s ? Ft : a ? Ft[o] || Bt(o, {}) : (Ft[o] || {}).prototype;
      if (l)
        for (n in t) {
          if (
            ((i = t[n]),
            (r = e.noTargetGet ? (r = Nt(l, n)) && r.value : l[n]),
            !qt(s ? n : o + (a ? "." : "#") + n, e.forced) && void 0 !== r)
          ) {
            if (typeof i == typeof r) continue;
            Gt(i, r);
          }
          (e.sham || (r && r.sham)) && jt(i, "sham", !0), $t(l, n, i, e);
        }
    }
    function it(e) {
      var t = String(Qt(this)),
        n = "",
        i = Jt(e);
      if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions");
      for (; 0 < i; (i >>>= 1) && (t += t)) 1 & i && (n += t);
      return n;
    }
    function rt(r) {
      return function (e, t, n) {
        var e = String(nn(e)),
          i = e.length,
          n = void 0 === n ? " " : String(n),
          t = en(t);
        return t <= i || "" == n
          ? e
          : ((i = tn.call(n, rn((t = t - i) / n.length))).length > t &&
              (i = i.slice(0, t)),
            r ? e + i : i + e);
      };
    }
    var ot = o,
      st = o,
      u = {},
      at = Math.ceil,
      lt = Math.floor,
      ut = Ke,
      ct = Math.min,
      dt = Ke,
      ft = Math.max,
      pt = Math.min,
      ht = M,
      mt = Je,
      gt = function (e, t) {
        e = dt(e);
        return e < 0 ? ft(e + t, 0) : pt(e, t);
      },
      Be = { includes: Qe(!0), indexOf: Qe(!1) },
      vt = a,
      yt = M,
      _t = Be.indexOf,
      Et = f,
      h = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ],
      bt = et,
      wt = h.concat("length", "prototype"),
      p =
        ((u.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return bt(e, wt);
          }),
        {}),
      c = ((p.f = Object.getOwnPropertySymbols), Ze),
      Tt = u,
      St = p,
      It = U,
      d =
        c("Reflect", "ownKeys") ||
        function (e) {
          var t = Tt.f(It(e)),
            n = St.f;
          return n ? t.concat(n(e)) : t;
        },
      kt = a,
      Ct = d,
      xt = Z,
      At = _e,
      Dt = t,
      Ot = /#|\.prototype\./,
      Rt = (tt.normalize = function (e) {
        return String(e).replace(Ot, ".").toLowerCase();
      }),
      Pt = (tt.data = {}),
      Mt = (tt.NATIVE = "N"),
      Lt = (tt.POLYFILL = "P"),
      Ft = o,
      Nt = Z.f,
      jt = l,
      $t = Ce.exports,
      Bt = V,
      Gt = function (e, t) {
        for (var n = Ct(t), i = At.f, r = xt.f, o = 0; o < n.length; o++) {
          var s = n[o];
          kt(e, s) || i(e, s, r(t, s));
        }
      },
      qt = tt,
      Ut = et,
      Vt = h,
      Be =
        Object.keys ||
        function (e) {
          return Ut(e, Vt);
        },
      Ht = s,
      f = t,
      zt = Be,
      Wt = p,
      Yt = K,
      Xt = q,
      Zt = J,
      m = Object.assign,
      Kt = Object.defineProperty,
      u =
        !m ||
        f(function () {
          if (
            Ht &&
            1 !==
              m(
                { b: 1 },
                m(
                  Kt({}, "a", {
                    enumerable: !0,
                    get: function () {
                      Kt(this, "b", { value: 3, enumerable: !1 });
                    },
                  }),
                  { b: 2 }
                )
              ).b
          )
            return !0;
          var e = {},
            t = {},
            n = Symbol(),
            i = "abcdefghijklmnopqrst";
          return (
            (e[n] = 7),
            i.split("").forEach(function (e) {
              t[e] = e;
            }),
            7 != m({}, e)[n] || zt(m({}, t)).join("") != i
          );
        })
          ? function (e, t) {
              for (
                var n = Xt(e), i = arguments.length, r = 1, o = Wt.f, s = Yt.f;
                r < i;

              )
                for (
                  var a,
                    l = Zt(arguments[r++]),
                    u = o ? zt(l).concat(o(l)) : zt(l),
                    c = u.length,
                    d = 0;
                  d < c;

                )
                  (a = u[d++]), (Ht && !s.call(l, a)) || (n[a] = l[a]);
              return n;
            }
          : m,
      Jt =
        (nt(
          { target: "Object", stat: !0, forced: Object.assign !== u },
          { assign: u }
        ),
        Ke),
      Qt = P,
      en = (nt({ target: "String", proto: !0 }, { repeat: it }), Je),
      tn = it,
      nn = P,
      rn = Math.ceil,
      c = { start: rt(!1), end: rt(!0) },
      a = Ze("navigator", "userAgent") || "",
      d =
        /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(
          a
        ),
      _e = nt,
      on = c.start,
      Z =
        (_e(
          { target: "String", proto: !0, forced: d },
          {
            padStart: function (e) {
              return on(this, e, 1 < arguments.length ? arguments[1] : void 0);
            },
          }
        ),
        nt),
      sn = c.end;
    function an(e) {
      return (an =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function g(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function ln(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function v(e, t, n) {
      t && ln(e.prototype, t), n && ln(e, n);
    }
    function y(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && un(e, t);
    }
    function _(e) {
      return (_ = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function un(e, t) {
      return (un =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function cn(e, t) {
      if (null == e) return {};
      var n,
        i = (function (e, t) {
          if (null == e) return {};
          for (var n, i = {}, r = Object.keys(e), o = 0; o < r.length; o++)
            (n = r[o]), 0 <= t.indexOf(n) || (i[n] = e[n]);
          return i;
        })(e, t);
      if (Object.getOwnPropertySymbols)
        for (var r = Object.getOwnPropertySymbols(e), o = 0; o < r.length; o++)
          (n = r[o]),
            0 <= t.indexOf(n) ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (i[n] = e[n]));
      return i;
    }
    function dn(e, t) {
      if (!t || ("object" != typeof t && "function" != typeof t)) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      return t;
    }
    function E(n) {
      var i = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var e,
          t = _(n);
        return dn(
          this,
          i
            ? ((e = _(this).constructor), Reflect.construct(t, arguments, e))
            : t.apply(this, arguments)
        );
      };
    }
    function fn(e, t) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = _(e));

      );
      return e;
    }
    function b(e, t, n) {
      return (b =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (e, t, n) {
              var e = fn(e, t);
              if (e)
                return (
                  (e = Object.getOwnPropertyDescriptor(e, t)),
                  e.get ? e.get.call(n) : e.value
                );
            })(e, t, n || e);
    }
    function pn(e, t, n, i) {
      return (pn =
        "undefined" != typeof Reflect && Reflect.set
          ? Reflect.set
          : function (e, t, n, i) {
              var r,
                e = fn(e, t);
              if (e) {
                if ((r = Object.getOwnPropertyDescriptor(e, t)).set)
                  return r.set.call(i, n), !0;
                if (!r.writable) return !1;
              }
              if ((r = Object.getOwnPropertyDescriptor(i, t))) {
                if (!r.writable) return !1;
                (r.value = n), Object.defineProperty(i, t, r);
              } else
                (e = n),
                  (r = t) in (n = i)
                    ? Object.defineProperty(n, r, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (n[r] = e);
              return !0;
            })(e, t, n, i);
    }
    function w(e, t, n, i, r) {
      if (!pn(e, t, n, i || e) && r) throw new Error("failed to set property");
    }
    function T(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != n) {
            var i,
              r,
              o = [],
              s = !0,
              a = !1;
            try {
              for (
                n = n.call(e);
                !(s = (i = n.next()).done) &&
                (o.push(i.value), !t || o.length !== t);
                s = !0
              );
            } catch (e) {
              (a = !0), (r = e);
            } finally {
              try {
                s || null == n.return || n.return();
              } finally {
                if (a) throw r;
              }
            }
            return o;
          }
        })(e, t) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return hn(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" ===
              (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
              "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? hn(e, t)
              : void 0;
          }
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function hn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function S(e) {
      return "string" == typeof e || e instanceof String;
    }
    Z(
      { target: "String", proto: !0, forced: d },
      {
        padEnd: function (e) {
          return sn(this, e, 1 < arguments.length ? arguments[1] : void 0);
        },
      }
    ),
      nt({ global: !0 }, { globalThis: o });
    var N = "NONE",
      j = "LEFT",
      $ = "FORCE_LEFT",
      B = "RIGHT",
      G = "FORCE_RIGHT";
    function mn(e) {
      return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    }
    var gn = (function () {
        function r(e, t, n, i) {
          for (
            g(this, r),
              this.value = e,
              this.cursorPos = t,
              this.oldValue = n,
              this.oldSelection = i;
            this.value.slice(0, this.startChangePos) !==
            this.oldValue.slice(0, this.startChangePos);

          )
            --this.oldSelection.start;
        }
        return (
          v(r, [
            {
              key: "startChangePos",
              get: function () {
                return Math.min(this.cursorPos, this.oldSelection.start);
              },
            },
            {
              key: "insertedCount",
              get: function () {
                return this.cursorPos - this.startChangePos;
              },
            },
            {
              key: "inserted",
              get: function () {
                return this.value.substr(
                  this.startChangePos,
                  this.insertedCount
                );
              },
            },
            {
              key: "removedCount",
              get: function () {
                return Math.max(
                  this.oldSelection.end - this.startChangePos ||
                    this.oldValue.length - this.value.length,
                  0
                );
              },
            },
            {
              key: "removed",
              get: function () {
                return this.oldValue.substr(
                  this.startChangePos,
                  this.removedCount
                );
              },
            },
            {
              key: "head",
              get: function () {
                return this.value.substring(0, this.startChangePos);
              },
            },
            {
              key: "tail",
              get: function () {
                return this.value.substring(
                  this.startChangePos + this.insertedCount
                );
              },
            },
            {
              key: "removeDirection",
              get: function () {
                return !this.removedCount || this.insertedCount
                  ? N
                  : this.oldSelection.end === this.cursorPos ||
                    this.oldSelection.start === this.cursorPos
                  ? B
                  : j;
              },
            },
          ]),
          r
        );
      })(),
      I = (function () {
        function t(e) {
          g(this, t),
            Object.assign(
              this,
              { inserted: "", rawInserted: "", skip: !1, tailShift: 0 },
              e
            );
        }
        return (
          v(t, [
            {
              key: "aggregate",
              value: function (e) {
                return (
                  (this.rawInserted += e.rawInserted),
                  (this.skip = this.skip || e.skip),
                  (this.inserted += e.inserted),
                  (this.tailShift += e.tailShift),
                  this
                );
              },
            },
            {
              key: "offset",
              get: function () {
                return this.tailShift + this.inserted.length;
              },
            },
          ]),
          t
        );
      })(),
      k = (function () {
        function i() {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            n = 2 < arguments.length ? arguments[2] : void 0;
          g(this, i), (this.value = e), (this.from = t), (this.stop = n);
        }
        return (
          v(i, [
            {
              key: "toString",
              value: function () {
                return this.value;
              },
            },
            {
              key: "extend",
              value: function (e) {
                this.value += String(e);
              },
            },
            {
              key: "appendTo",
              value: function (e) {
                return e
                  .append(this.toString(), { tail: !0 })
                  .aggregate(e._appendPlaceholder());
              },
            },
            {
              key: "state",
              get: function () {
                return { value: this.value, from: this.from, stop: this.stop };
              },
              set: function (e) {
                Object.assign(this, e);
              },
            },
            {
              key: "shiftBefore",
              value: function (e) {
                if (this.from >= e || !this.value.length) return "";
                e = this.value[0];
                return (this.value = this.value.slice(1)), e;
              },
            },
          ]),
          i
        );
      })();
    function C(e) {
      return new C.InputMask(
        e,
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
      );
    }
    var x = (function () {
      function t(e) {
        g(this, t),
          (this._value = ""),
          this._update(Object.assign({}, t.DEFAULTS, e)),
          (this.isInitialized = !0);
      }
      return (
        v(t, [
          {
            key: "updateOptions",
            value: function (e) {
              Object.keys(e).length &&
                this.withValueRefresh(this._update.bind(this, e));
            },
          },
          {
            key: "_update",
            value: function (e) {
              Object.assign(this, e);
            },
          },
          {
            key: "state",
            get: function () {
              return { _value: this.value };
            },
            set: function (e) {
              this._value = e._value;
            },
          },
          {
            key: "reset",
            value: function () {
              this._value = "";
            },
          },
          {
            key: "value",
            get: function () {
              return this._value;
            },
            set: function (e) {
              this.resolve(e);
            },
          },
          {
            key: "resolve",
            value: function (e) {
              return (
                this.reset(),
                this.append(e, { input: !0 }, ""),
                this.doCommit(),
                this.value
              );
            },
          },
          {
            key: "unmaskedValue",
            get: function () {
              return this.value;
            },
            set: function (e) {
              this.reset(), this.append(e, {}, ""), this.doCommit();
            },
          },
          {
            key: "typedValue",
            get: function () {
              return this.doParse(this.value);
            },
            set: function (e) {
              this.value = this.doFormat(e);
            },
          },
          {
            key: "rawInputValue",
            get: function () {
              return this.extractInput(0, this.value.length, { raw: !0 });
            },
            set: function (e) {
              this.reset(), this.append(e, { raw: !0 }, ""), this.doCommit();
            },
          },
          {
            key: "isComplete",
            get: function () {
              return !0;
            },
          },
          {
            key: "nearestInputPos",
            value: function (e, t) {
              return e;
            },
          },
          {
            key: "extractInput",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return this.value.slice(e, t);
            },
          },
          {
            key: "extractTail",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return new k(this.extractInput(e, t), e);
            },
          },
          {
            key: "appendTail",
            value: function (e) {
              return (e = S(e) ? new k(String(e)) : e).appendTo(this);
            },
          },
          {
            key: "_appendCharRaw",
            value: function (e) {
              return e
                ? ((this._value += e), new I({ inserted: e, rawInserted: e }))
                : new I();
            },
          },
          {
            key: "_appendChar",
            value: function (e) {
              var t,
                n,
                i,
                r =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                o = 2 < arguments.length ? arguments[2] : void 0,
                s = this.state,
                e = this._appendCharRaw(this.doPrepare(e, r), r);
              return (
                e.inserted &&
                  ((r = !1 !== this.doValidate(r)) &&
                    null != o &&
                    ((n = this.state),
                    this.overwrite &&
                      ((t = o.state), o.shiftBefore(this.value.length)),
                    (r =
                      (i = this.appendTail(o)).rawInserted === o.toString()) &&
                      i.inserted &&
                      (this.state = n)),
                  r ||
                    ((e = new I()), (this.state = s), o && t && (o.state = t))),
                e
              );
            },
          },
          {
            key: "_appendPlaceholder",
            value: function () {
              return new I();
            },
          },
          {
            key: "append",
            value: function (e, t, n) {
              if (!S(e)) throw new Error("value should be string");
              var i = new I(),
                r = S(n) ? new k(String(n)) : n;
              t && t.tail && (t._beforeTailState = this.state);
              for (var o = 0; o < e.length; ++o)
                i.aggregate(this._appendChar(e[o], t, r));
              return (
                null != r && (i.tailShift += this.appendTail(r).tailShift), i
              );
            },
          },
          {
            key: "remove",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return (
                (this._value = this.value.slice(0, e) + this.value.slice(t)),
                new I()
              );
            },
          },
          {
            key: "withValueRefresh",
            value: function (e) {
              if (this._refreshing || !this.isInitialized) return e();
              this._refreshing = !0;
              var t = this.rawInputValue,
                n = this.value,
                e = e();
              return (
                (this.rawInputValue = t),
                this.value &&
                  this.value !== n &&
                  0 === n.indexOf(this.value) &&
                  this.append(n.slice(this.value.length), {}, ""),
                delete this._refreshing,
                e
              );
            },
          },
          {
            key: "runIsolated",
            value: function (e) {
              if (this._isolated || !this.isInitialized) return e(this);
              this._isolated = !0;
              var t = this.state,
                e = e(this);
              return (this.state = t), delete this._isolated, e;
            },
          },
          {
            key: "doPrepare",
            value: function (e) {
              return this.prepare
                ? this.prepare(
                    e,
                    this,
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {}
                  )
                : e;
            },
          },
          {
            key: "doValidate",
            value: function (e) {
              return (
                (!this.validate || this.validate(this.value, this, e)) &&
                (!this.parent || this.parent.doValidate(e))
              );
            },
          },
          {
            key: "doCommit",
            value: function () {
              this.commit && this.commit(this.value, this);
            },
          },
          {
            key: "doFormat",
            value: function (e) {
              return this.format ? this.format(e, this) : e;
            },
          },
          {
            key: "doParse",
            value: function (e) {
              return this.parse ? this.parse(e, this) : e;
            },
          },
          {
            key: "splice",
            value: function (e, t, n, i) {
              (t = this.extractTail(e + t)), (i = this.nearestInputPos(e, i));
              return new I({ tailShift: i - e })
                .aggregate(this.remove(i))
                .aggregate(this.append(n, { input: !0 }, t));
            },
          },
        ]),
        t
      );
    })();
    function vn(e) {
      if (null == e) throw new Error("mask property should be defined");
      return e instanceof RegExp
        ? C.MaskedRegExp
        : S(e)
        ? C.MaskedPattern
        : e instanceof Date || e === Date
        ? C.MaskedDate
        : e instanceof Number || "number" == typeof e || e === Number
        ? C.MaskedNumber
        : Array.isArray(e) || e === Array
        ? C.MaskedDynamic
        : C.Masked && e.prototype instanceof C.Masked
        ? e
        : e instanceof Function
        ? C.MaskedFunction
        : e instanceof C.Masked
        ? e.constructor
        : (console.warn("Mask not found for mask", e), C.Masked);
    }
    function A(e) {
      if (C.Masked && e instanceof C.Masked) return e;
      var t = (e = Object.assign({}, e)).mask;
      if (C.Masked && t instanceof C.Masked) return t;
      t = vn(t);
      if (t) return new t(e);
      throw new Error(
        "Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask."
      );
    }
    (x.DEFAULTS = {
      format: function (e) {
        return e;
      },
      parse: function (e) {
        return e;
      },
    }),
      (C.Masked = x),
      (C.createMask = A);
    var yn = ["mask"],
      _n = {
        0: /\d/,
        a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        "*": /./,
      },
      En = (function () {
        function n(e) {
          g(this, n);
          var t = e.mask,
            e = cn(e, yn);
          (this.masked = A({ mask: t })), Object.assign(this, e);
        }
        return (
          v(n, [
            {
              key: "reset",
              value: function () {
                (this._isFilled = !1), this.masked.reset();
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length;
                return 0 === e && 1 <= t
                  ? ((this._isFilled = !1), this.masked.remove(e, t))
                  : new I();
              },
            },
            {
              key: "value",
              get: function () {
                return (
                  this.masked.value ||
                  (this._isFilled && !this.isOptional
                    ? this.placeholderChar
                    : "")
                );
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.masked.unmaskedValue;
              },
            },
            {
              key: "isComplete",
              get: function () {
                return Boolean(this.masked.value) || this.isOptional;
              },
            },
            {
              key: "_appendChar",
              value: function (e) {
                var t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (this._isFilled) return new I();
                var n = this.masked.state,
                  e = this.masked._appendChar(e, t);
                return (
                  e.inserted &&
                    !1 === this.doValidate(t) &&
                    ((e.inserted = e.rawInserted = ""),
                    (this.masked.state = n)),
                  e.inserted ||
                    this.isOptional ||
                    this.lazy ||
                    t.input ||
                    (e.inserted = this.placeholderChar),
                  (e.skip = !e.inserted && !this.isOptional),
                  (this._isFilled = Boolean(e.inserted)),
                  e
                );
              },
            },
            {
              key: "append",
              value: function () {
                var e;
                return (e = this.masked).append.apply(e, arguments);
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = new I();
                return (
                  this._isFilled ||
                    this.isOptional ||
                    ((this._isFilled = !0),
                    (e.inserted = this.placeholderChar)),
                  e
                );
              },
            },
            {
              key: "extractTail",
              value: function () {
                var e;
                return (e = this.masked).extractTail.apply(e, arguments);
              },
            },
            {
              key: "appendTail",
              value: function () {
                var e;
                return (e = this.masked).appendTail.apply(e, arguments);
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length;
                return this.masked.extractInput(
                  e,
                  t,
                  2 < arguments.length ? arguments[2] : void 0
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : N,
                  n = this.value.length,
                  i = Math.min(Math.max(e, 0), n);
                switch (t) {
                  case j:
                  case $:
                    return this.isComplete ? i : 0;
                  case B:
                  case G:
                    return this.isComplete ? i : n;
                  default:
                    return i;
                }
              },
            },
            {
              key: "doValidate",
              value: function () {
                var e;
                return (
                  (e = this.masked).doValidate.apply(e, arguments) &&
                  (!this.parent ||
                    (e = this.parent).doValidate.apply(e, arguments))
                );
              },
            },
            {
              key: "doCommit",
              value: function () {
                this.masked.doCommit();
              },
            },
            {
              key: "state",
              get: function () {
                return { masked: this.masked.state, _isFilled: this._isFilled };
              },
              set: function (e) {
                (this.masked.state = e.masked), (this._isFilled = e._isFilled);
              },
            },
          ]),
          n
        );
      })(),
      bn = (function () {
        function t(e) {
          g(this, t), Object.assign(this, e), (this._value = "");
        }
        return (
          v(t, [
            {
              key: "value",
              get: function () {
                return this._value;
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.isUnmasking ? this.value : "";
              },
            },
            {
              key: "reset",
              value: function () {
                (this._isRawInput = !1), (this._value = "");
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this._value.length;
                return (
                  (this._value =
                    this._value.slice(0, e) + this._value.slice(t)),
                  this._value || (this._isRawInput = !1),
                  new I()
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : N,
                  n = this._value.length;
                switch (t) {
                  case j:
                  case $:
                    return 0;
                  default:
                    return n;
                }
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this._value.length;
                return (
                  ((2 < arguments.length && void 0 !== arguments[2]
                    ? arguments[2]
                    : {}
                  ).raw &&
                    this._isRawInput &&
                    this._value.slice(e, t)) ||
                  ""
                );
              },
            },
            {
              key: "isComplete",
              get: function () {
                return !0;
              },
            },
            {
              key: "_appendChar",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = new I();
                if (this._value) return n;
                e =
                  this.char === e[0] &&
                  (this.isUnmasking || t.input || t.raw) &&
                  !t.tail;
                return (
                  e && (n.rawInserted = this.char),
                  (this._value = n.inserted = this.char),
                  (this._isRawInput = e && (t.raw || t.input)),
                  n
                );
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = new I();
                return this._value || (this._value = e.inserted = this.char), e;
              },
            },
            {
              key: "extractTail",
              value: function () {
                return (
                  (1 < arguments.length && void 0 !== arguments[1]) ||
                    this.value.length,
                  new k("")
                );
              },
            },
            {
              key: "appendTail",
              value: function (e) {
                return (e = S(e) ? new k(String(e)) : e).appendTo(this);
              },
            },
            {
              key: "append",
              value: function (e, t, n) {
                e = this._appendChar(e, t);
                return (
                  null != n && (e.tailShift += this.appendTail(n).tailShift), e
                );
              },
            },
            { key: "doCommit", value: function () {} },
            {
              key: "state",
              get: function () {
                return { _value: this._value, _isRawInput: this._isRawInput };
              },
              set: function (e) {
                Object.assign(this, e);
              },
            },
          ]),
          t
        );
      })(),
      wn = ["chunks"],
      Tn = (function () {
        function a() {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 0;
          g(this, a), (this.chunks = e), (this.from = t);
        }
        return (
          v(a, [
            {
              key: "toString",
              value: function () {
                return this.chunks.map(String).join("");
              },
            },
            {
              key: "extend",
              value: function (e) {
                if (String(e)) {
                  S(e) && (e = new k(String(e)));
                  var t,
                    n = this.chunks[this.chunks.length - 1],
                    i =
                      n &&
                      (n.stop === e.stop || null == e.stop) &&
                      e.from === n.from + n.toString().length;
                  if (e instanceof k)
                    i ? n.extend(e.toString()) : this.chunks.push(e);
                  else if (e instanceof a) {
                    if (null == e.stop)
                      for (; e.chunks.length && null == e.chunks[0].stop; )
                        ((t = e.chunks.shift()).from += e.from), this.extend(t);
                    e.toString() &&
                      ((e.stop = e.blockIndex), this.chunks.push(e));
                  }
                }
              },
            },
            {
              key: "appendTo",
              value: function (e) {
                if (!(e instanceof C.MaskedPattern))
                  return new k(this.toString()).appendTo(e);
                for (
                  var t = new I(), n = 0;
                  n < this.chunks.length && !t.skip;
                  ++n
                ) {
                  var i = this.chunks[n],
                    r = e._mapPosToBlock(e.value.length),
                    o = i.stop,
                    s = void 0;
                  null != o &&
                    (!r || r.index <= o) &&
                    ((i instanceof a || 0 <= e._stops.indexOf(o)) &&
                      t.aggregate(e._appendPlaceholder(o)),
                    (s = i instanceof a && e._blocks[o])),
                    s
                      ? (((r = s.appendTail(i)).skip = !1),
                        t.aggregate(r),
                        (e._value += r.inserted),
                        (o = i.toString().slice(r.rawInserted.length)) &&
                          t.aggregate(e.append(o, { tail: !0 })))
                      : t.aggregate(e.append(i.toString(), { tail: !0 }));
                }
                return t;
              },
            },
            {
              key: "state",
              get: function () {
                return {
                  chunks: this.chunks.map(function (e) {
                    return e.state;
                  }),
                  from: this.from,
                  stop: this.stop,
                  blockIndex: this.blockIndex,
                };
              },
              set: function (e) {
                var t = e.chunks,
                  e = cn(e, wn);
                Object.assign(this, e),
                  (this.chunks = t.map(function (e) {
                    var t = new ("chunks" in e ? a : k)();
                    return (t.state = e), t;
                  }));
              },
            },
            {
              key: "shiftBefore",
              value: function (e) {
                if (this.from >= e || !this.chunks.length) return "";
                for (var t = e - this.from, n = 0; n < this.chunks.length; ) {
                  var i = this.chunks[n],
                    r = i.shiftBefore(t);
                  if (i.toString()) {
                    if (!r) break;
                    ++n;
                  } else this.chunks.splice(n, 1);
                  if (r) return r;
                }
                return "";
              },
            },
          ]),
          a
        );
      })(),
      l = (function () {
        y(n, x);
        var e = E(n);
        function n() {
          return g(this, n), e.apply(this, arguments);
        }
        return (
          v(n, [
            {
              key: "_update",
              value: function (t) {
                t.mask &&
                  (t.validate = function (e) {
                    return 0 <= e.search(t.mask);
                  }),
                  b(_(n.prototype), "_update", this).call(this, t);
              },
            },
          ]),
          n
        );
      })(),
      Sn = ((C.MaskedRegExp = l), ["_blocks"]),
      D = (function () {
        y(l, x);
        var t = E(l);
        function l() {
          var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            g(this, l),
            (e.definitions = Object.assign({}, _n, e.definitions)),
            t.call(this, Object.assign({}, l.DEFAULTS, e))
          );
        }
        return (
          v(l, [
            {
              key: "_update",
              value: function () {
                var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                (e.definitions = Object.assign(
                  {},
                  this.definitions,
                  e.definitions
                )),
                  b(_(l.prototype), "_update", this).call(this, e),
                  this._rebuildMask();
              },
            },
            {
              key: "_rebuildMask",
              value: function () {
                var i = this,
                  e = this.definitions,
                  r =
                    ((this._blocks = []),
                    (this._stops = []),
                    (this._maskedBlocks = {}),
                    this.mask);
                if (r && e)
                  for (var t = !1, n = !1, o = 0; o < r.length; ++o) {
                    if (this.blocks)
                      if (
                        "continue" ===
                        (function () {
                          var e,
                            t = r.slice(o),
                            n = Object.keys(i.blocks).filter(function (e) {
                              return 0 === t.indexOf(e);
                            }),
                            n =
                              (n.sort(function (e, t) {
                                return t.length - e.length;
                              }),
                              n[0]);
                          if (n)
                            return (
                              (e = A(
                                Object.assign(
                                  {
                                    parent: i,
                                    lazy: i.lazy,
                                    placeholderChar: i.placeholderChar,
                                    overwrite: i.overwrite,
                                  },
                                  i.blocks[n]
                                )
                              )) &&
                                (i._blocks.push(e),
                                i._maskedBlocks[n] || (i._maskedBlocks[n] = []),
                                i._maskedBlocks[n].push(i._blocks.length - 1)),
                              (o += n.length - 1),
                              "continue"
                            );
                        })()
                      )
                        continue;
                    var s = r[o],
                      a = s in e;
                    if (s === l.STOP_CHAR)
                      this._stops.push(this._blocks.length);
                    else if ("{" === s || "}" === s) t = !t;
                    else if ("[" === s || "]" === s) n = !n;
                    else {
                      if (s === l.ESCAPE_CHAR) {
                        if (!(s = r[++o])) break;
                        a = !1;
                      }
                      a = a
                        ? new En({
                            parent: this,
                            lazy: this.lazy,
                            placeholderChar: this.placeholderChar,
                            mask: e[s],
                            isOptional: n,
                          })
                        : new bn({ char: s, isUnmasking: t });
                      this._blocks.push(a);
                    }
                  }
              },
            },
            {
              key: "state",
              get: function () {
                return Object.assign({}, b(_(l.prototype), "state", this), {
                  _blocks: this._blocks.map(function (e) {
                    return e.state;
                  }),
                });
              },
              set: function (e) {
                var n = e._blocks,
                  e = cn(e, Sn);
                this._blocks.forEach(function (e, t) {
                  return (e.state = n[t]);
                }),
                  w(_(l.prototype), "state", e, this, !0);
              },
            },
            {
              key: "reset",
              value: function () {
                b(_(l.prototype), "reset", this).call(this),
                  this._blocks.forEach(function (e) {
                    return e.reset();
                  });
              },
            },
            {
              key: "isComplete",
              get: function () {
                return this._blocks.every(function (e) {
                  return e.isComplete;
                });
              },
            },
            {
              key: "doCommit",
              value: function () {
                this._blocks.forEach(function (e) {
                  return e.doCommit();
                }),
                  b(_(l.prototype), "doCommit", this).call(this);
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this._blocks.reduce(function (e, t) {
                  return e + t.unmaskedValue;
                }, "");
              },
              set: function (e) {
                w(_(l.prototype), "unmaskedValue", e, this, !0);
              },
            },
            {
              key: "value",
              get: function () {
                return this._blocks.reduce(function (e, t) {
                  return e + t.value;
                }, "");
              },
              set: function (e) {
                w(_(l.prototype), "value", e, this, !0);
              },
            },
            {
              key: "appendTail",
              value: function (e) {
                return b(_(l.prototype), "appendTail", this)
                  .call(this, e)
                  .aggregate(this._appendPlaceholder());
              },
            },
            {
              key: "_appendCharRaw",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = this._mapPosToBlock(this.value.length),
                  i = new I();
                if (!n) return i;
                for (var r = n.index; ; ++r) {
                  var o = this._blocks[r];
                  if (!o) break;
                  var o = o._appendChar(e, t),
                    s = o.skip;
                  if ((i.aggregate(o), s || o.rawInserted)) break;
                }
                return i;
              },
            },
            {
              key: "extractTail",
              value: function () {
                var r = this,
                  e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  o = new Tn();
                return (
                  e === t ||
                    this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                      e = e.extractTail(n, i);
                      (e.stop = r._findStopBefore(t)),
                        (e.from = r._blockStartPos(t)),
                        e instanceof Tn && (e.blockIndex = t),
                        o.extend(e);
                    }),
                  o
                );
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  r =
                    2 < arguments.length && void 0 !== arguments[2]
                      ? arguments[2]
                      : {};
                if (e === t) return "";
                var o = "";
                return (
                  this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                    o += e.extractInput(n, i, r);
                  }),
                  o
                );
              },
            },
            {
              key: "_findStopBefore",
              value: function (e) {
                for (var t, n = 0; n < this._stops.length; ++n) {
                  var i = this._stops[n];
                  if (!(i <= e)) break;
                  t = i;
                }
                return t;
              },
            },
            {
              key: "_appendPlaceholder",
              value: function (n) {
                var i = this,
                  r = new I();
                if (this.lazy && null == n) return r;
                var e = this._mapPosToBlock(this.value.length);
                if (!e) return r;
                var e = e.index,
                  t = null != n ? n : this._blocks.length;
                return (
                  this._blocks.slice(e, t).forEach(function (e) {
                    var t;
                    (e.lazy && null == n) ||
                      ((t = null != e._blocks ? [e._blocks.length] : []),
                      (e = e._appendPlaceholder.apply(e, t)),
                      (i._value += e.inserted),
                      r.aggregate(e));
                  }),
                  r
                );
              },
            },
            {
              key: "_mapPosToBlock",
              value: function (e) {
                for (var t = "", n = 0; n < this._blocks.length; ++n) {
                  var i = this._blocks[n],
                    r = t.length;
                  if (e <= (t += i.value).length)
                    return { index: n, offset: e - r };
                }
              },
            },
            {
              key: "_blockStartPos",
              value: function (e) {
                return this._blocks.slice(0, e).reduce(function (e, t) {
                  return e + t.value.length;
                }, 0);
              },
            },
            {
              key: "_forEachBlocksInRange",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  n = 2 < arguments.length ? arguments[2] : void 0,
                  e = this._mapPosToBlock(e);
                if (e) {
                  var i = this._mapPosToBlock(t),
                    t = i && e.index === i.index,
                    r = e.offset,
                    o = i && t ? i.offset : this._blocks[e.index].value.length;
                  if ((n(this._blocks[e.index], e.index, r, o), i && !t)) {
                    for (var s = e.index + 1; s < i.index; ++s)
                      n(this._blocks[s], s, 0, this._blocks[s].value.length);
                    n(this._blocks[i.index], i.index, 0, i.offset);
                  }
                }
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  r = b(_(l.prototype), "remove", this).call(this, e, t);
                return (
                  this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                    r.aggregate(e.remove(n, i));
                  }),
                  r
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : N,
                  n = this._mapPosToBlock(e) || { index: 0, offset: 0 },
                  i = n.offset,
                  n = n.index,
                  r = this._blocks[n];
                if (!r) return e;
                var o = i,
                  i =
                    (o =
                      0 !== o && o < r.value.length
                        ? r.nearestInputPos(
                            i,
                            (function (e) {
                              switch (e) {
                                case j:
                                  return $;
                                case B:
                                  return G;
                                default:
                                  return e;
                              }
                            })(t)
                          )
                        : o) === r.value.length;
                if (!(0 === o) && !i) return this._blockStartPos(n) + o;
                var s = i ? n + 1 : n;
                if (t === N) {
                  if (0 < s) {
                    (r = this._blocks[s - 1]), (o = r.nearestInputPos(0, N));
                    if (!r.value.length || o !== r.value.length)
                      return this._blockStartPos(s);
                  }
                  for (var a = s; a < this._blocks.length; ++a) {
                    var l = this._blocks[a],
                      u = l.nearestInputPos(0, N);
                    if (!l.value.length || u !== l.value.length)
                      return this._blockStartPos(a) + u;
                  }
                  for (var c = s - 1; 0 <= c; --c) {
                    var d = this._blocks[c],
                      L = d.nearestInputPos(0, N);
                    if (!d.value.length || L !== d.value.length)
                      return this._blockStartPos(c) + d.value.length;
                  }
                  return e;
                }
                if (t === j || t === $) {
                  for (var f, p = s; p < this._blocks.length; ++p)
                    if (this._blocks[p].value) {
                      f = p;
                      break;
                    }
                  if (null != f) {
                    (i = this._blocks[f]), (n = i.nearestInputPos(0, B));
                    if (0 === n && i.unmaskedValue.length)
                      return this._blockStartPos(f) + n;
                  }
                  for (var h, m = -1, g = s - 1; 0 <= g; --g) {
                    var v = this._blocks[g],
                      y = v.nearestInputPos(v.value.length, $);
                    if (((v.value && 0 === y) || (h = g), 0 !== y)) {
                      if (y !== v.value.length)
                        return this._blockStartPos(g) + y;
                      m = g;
                      break;
                    }
                  }
                  if (t === j)
                    for (
                      var _ = m + 1;
                      _ <= Math.min(s, this._blocks.length - 1);
                      ++_
                    ) {
                      var E = this._blocks[_],
                        b = E.nearestInputPos(0, N),
                        w = this._blockStartPos(_) + b;
                      if (e < w) break;
                      if (b !== E.value.length) return w;
                    }
                  if (0 <= m)
                    return (
                      this._blockStartPos(m) + this._blocks[m].value.length
                    );
                  if (
                    t === $ ||
                    (this.lazy &&
                      !this.extractInput() &&
                      !(function (e) {
                        if (!e) return;
                        var t = e.value;
                        return !t || e.nearestInputPos(0, N) !== t.length;
                      })(this._blocks[s]))
                  )
                    return 0;
                  if (null != h) return this._blockStartPos(h);
                  for (var T = s; T < this._blocks.length; ++T) {
                    var S = this._blocks[T],
                      I = S.nearestInputPos(0, N);
                    if (!S.value.length || I !== S.value.length)
                      return this._blockStartPos(T) + I;
                  }
                  return 0;
                }
                if (t === B || t === G) {
                  for (var k, C, x = s; x < this._blocks.length; ++x) {
                    var A = this._blocks[x],
                      D = A.nearestInputPos(0, N);
                    if (D !== A.value.length) {
                      (C = this._blockStartPos(x) + D), (k = x);
                      break;
                    }
                  }
                  if (null != k && null != C) {
                    for (var O = k; O < this._blocks.length; ++O) {
                      var R = this._blocks[O],
                        F = R.nearestInputPos(0, G);
                      if (F !== R.value.length)
                        return this._blockStartPos(O) + F;
                    }
                    return t === G ? this.value.length : C;
                  }
                  for (
                    var P = Math.min(s, this._blocks.length - 1);
                    0 <= P;
                    --P
                  ) {
                    var M = this._blocks[P],
                      M = M.nearestInputPos(M.value.length, j);
                    if (0 !== M) {
                      M = this._blockStartPos(P) + M;
                      if (e <= M) return M;
                      break;
                    }
                  }
                }
                return e;
              },
            },
            {
              key: "maskedBlock",
              value: function (e) {
                return this.maskedBlocks(e)[0];
              },
            },
            {
              key: "maskedBlocks",
              value: function (e) {
                var t = this,
                  e = this._maskedBlocks[e];
                return e
                  ? e.map(function (e) {
                      return t._blocks[e];
                    })
                  : [];
              },
            },
          ]),
          l
        );
      })();
    (D.DEFAULTS = { lazy: !0, placeholderChar: "_" }),
      (D.STOP_CHAR = "`"),
      (D.ESCAPE_CHAR = "\\"),
      (D.InputDefinition = En),
      (D.FixedDefinition = bn),
      (C.MaskedPattern = D);
    var In = (function () {
        y(c, D);
        var e = E(c);
        function c() {
          return g(this, c), e.apply(this, arguments);
        }
        return (
          v(c, [
            {
              key: "_matchFrom",
              get: function () {
                return this.maxLength - String(this.from).length;
              },
            },
            {
              key: "_update",
              value: function (e) {
                e = Object.assign(
                  { to: this.to || 0, from: this.from || 0 },
                  e
                );
                for (
                  var t = String(e.to).length,
                    n =
                      (null != e.maxLength && (t = Math.max(t, e.maxLength)),
                      (e.maxLength = t),
                      String(e.from).padStart(t, "0")),
                    i = String(e.to).padStart(t, "0"),
                    r = 0;
                  r < i.length && i[r] === n[r];

                )
                  ++r;
                (e.mask =
                  i.slice(0, r).replace(/0/g, "\\0") + "0".repeat(t - r)),
                  b(_(c.prototype), "_update", this).call(this, e);
              },
            },
            {
              key: "isComplete",
              get: function () {
                return (
                  b(_(c.prototype), "isComplete", this) && Boolean(this.value)
                );
              },
            },
            {
              key: "boundaries",
              value: function (e) {
                var t = "",
                  n = "",
                  e = T(e.match(/^(\D*)(\d*)(\D*)/) || [], 3),
                  i = e[1],
                  e = e[2];
                return (
                  e &&
                    ((t = "0".repeat(i.length) + e),
                    (n = "9".repeat(i.length) + e)),
                  [
                    (t = t.padEnd(this.maxLength, "0")),
                    (n = n.padEnd(this.maxLength, "9")),
                  ]
                );
              },
            },
            {
              key: "doPrepare",
              value: function (e) {
                var t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (
                  ((e = b(_(c.prototype), "doPrepare", this)
                    .call(this, e, t)
                    .replace(/\D/g, "")),
                  !this.autofix)
                )
                  return e;
                for (
                  var n = String(this.from).padStart(this.maxLength, "0"),
                    i = String(this.to).padStart(this.maxLength, "0"),
                    r = this.value,
                    o = "",
                    s = 0;
                  s < e.length;
                  ++s
                ) {
                  var a = r + o + e[s],
                    l = T(this.boundaries(a), 2),
                    u = l[0],
                    l = l[1];
                  Number(l) < this.from
                    ? (o += n[a.length - 1])
                    : Number(u) > this.to
                    ? (o += i[a.length - 1])
                    : (o += e[s]);
                }
                return o;
              },
            },
            {
              key: "doValidate",
              value: function () {
                var e = this.value;
                if (-1 === e.search(/[^0]/) && e.length <= this._matchFrom)
                  return !0;
                for (
                  var e = T(this.boundaries(e), 2),
                    t = e[0],
                    e = e[1],
                    n = arguments.length,
                    i = new Array(n),
                    r = 0;
                  r < n;
                  r++
                )
                  i[r] = arguments[r];
                return (
                  this.from <= Number(e) &&
                  Number(t) <= this.to &&
                  (e = b(_(c.prototype), "doValidate", this)).call.apply(
                    e,
                    [this].concat(i)
                  )
                );
              },
            },
          ]),
          c
        );
      })(),
      kn =
        ((C.MaskedRange = In),
        (function () {
          y(o, D);
          var t = E(o);
          function o(e) {
            return g(this, o), t.call(this, Object.assign({}, o.DEFAULTS, e));
          }
          return (
            v(o, [
              {
                key: "_update",
                value: function (t) {
                  t.mask === Date && delete t.mask,
                    t.pattern && (t.mask = t.pattern);
                  var e = t.blocks;
                  (t.blocks = Object.assign({}, o.GET_DEFAULT_BLOCKS())),
                    t.min && (t.blocks.Y.from = t.min.getFullYear()),
                    t.max && (t.blocks.Y.to = t.max.getFullYear()),
                    t.min &&
                      t.max &&
                      t.blocks.Y.from === t.blocks.Y.to &&
                      ((t.blocks.m.from = t.min.getMonth() + 1),
                      (t.blocks.m.to = t.max.getMonth() + 1),
                      t.blocks.m.from === t.blocks.m.to &&
                        ((t.blocks.d.from = t.min.getDate()),
                        (t.blocks.d.to = t.max.getDate()))),
                    Object.assign(t.blocks, e),
                    Object.keys(t.blocks).forEach(function (e) {
                      e = t.blocks[e];
                      "autofix" in e || (e.autofix = t.autofix);
                    }),
                    b(_(o.prototype), "_update", this).call(this, t);
                },
              },
              {
                key: "doValidate",
                value: function () {
                  for (
                    var e,
                      t = this.date,
                      n = arguments.length,
                      i = new Array(n),
                      r = 0;
                    r < n;
                    r++
                  )
                    i[r] = arguments[r];
                  return (
                    (e = b(_(o.prototype), "doValidate", this)).call.apply(
                      e,
                      [this].concat(i)
                    ) &&
                    (!this.isComplete ||
                      (this.isDateExist(this.value) &&
                        null != t &&
                        (null == this.min || this.min <= t) &&
                        (null == this.max || t <= this.max)))
                  );
                },
              },
              {
                key: "isDateExist",
                value: function (e) {
                  return 0 <= this.format(this.parse(e, this), this).indexOf(e);
                },
              },
              {
                key: "date",
                get: function () {
                  return this.typedValue;
                },
                set: function (e) {
                  this.typedValue = e;
                },
              },
              {
                key: "typedValue",
                get: function () {
                  return this.isComplete
                    ? b(_(o.prototype), "typedValue", this)
                    : null;
                },
                set: function (e) {
                  w(_(o.prototype), "typedValue", e, this, !0);
                },
              },
            ]),
            o
          );
        })()),
      Cn =
        ((kn.DEFAULTS = {
          pattern: "d{.}`m{.}`Y",
          format: function (e) {
            return [
              String(e.getDate()).padStart(2, "0"),
              String(e.getMonth() + 1).padStart(2, "0"),
              e.getFullYear(),
            ].join(".");
          },
          parse: function (e) {
            var e = T(e.split("."), 3),
              t = e[0],
              n = e[1],
              e = e[2];
            return new Date(e, n - 1, t);
          },
        }),
        (kn.GET_DEFAULT_BLOCKS = function () {
          return {
            d: { mask: In, from: 1, to: 31, maxLength: 2 },
            m: { mask: In, from: 1, to: 12, maxLength: 2 },
            Y: { mask: In, from: 1900, to: 9999 },
          };
        }),
        (C.MaskedDate = kn),
        (function () {
          function e() {
            g(this, e);
          }
          return (
            v(e, [
              {
                key: "selectionStart",
                get: function () {
                  var e;
                  try {
                    e = this._unsafeSelectionStart;
                  } catch (e) {}
                  return null != e ? e : this.value.length;
                },
              },
              {
                key: "selectionEnd",
                get: function () {
                  var e;
                  try {
                    e = this._unsafeSelectionEnd;
                  } catch (e) {}
                  return null != e ? e : this.value.length;
                },
              },
              {
                key: "select",
                value: function (e, t) {
                  if (
                    null != e &&
                    null != t &&
                    (e !== this.selectionStart || t !== this.selectionEnd)
                  )
                    try {
                      this._unsafeSelect(e, t);
                    } catch (e) {}
                },
              },
              { key: "_unsafeSelect", value: function (e, t) {} },
              {
                key: "isActive",
                get: function () {
                  return !1;
                },
              },
              { key: "bindEvents", value: function (e) {} },
              { key: "unbindEvents", value: function () {} },
            ]),
            e
          );
        })()),
      xn =
        ((C.MaskElement = Cn),
        (function () {
          y(i, Cn);
          var n = E(i);
          function i(e) {
            var t;
            return (
              g(this, i), ((t = n.call(this)).input = e), (t._handlers = {}), t
            );
          }
          return (
            v(i, [
              {
                key: "rootElement",
                get: function () {
                  return this.input.getRootNode
                    ? this.input.getRootNode()
                    : document;
                },
              },
              {
                key: "isActive",
                get: function () {
                  return this.input === this.rootElement.activeElement;
                },
              },
              {
                key: "_unsafeSelectionStart",
                get: function () {
                  return this.input.selectionStart;
                },
              },
              {
                key: "_unsafeSelectionEnd",
                get: function () {
                  return this.input.selectionEnd;
                },
              },
              {
                key: "_unsafeSelect",
                value: function (e, t) {
                  this.input.setSelectionRange(e, t);
                },
              },
              {
                key: "value",
                get: function () {
                  return this.input.value;
                },
                set: function (e) {
                  this.input.value = e;
                },
              },
              {
                key: "bindEvents",
                value: function (t) {
                  var n = this;
                  Object.keys(t).forEach(function (e) {
                    return n._toggleEventHandler(i.EVENTS_MAP[e], t[e]);
                  });
                },
              },
              {
                key: "unbindEvents",
                value: function () {
                  var t = this;
                  Object.keys(this._handlers).forEach(function (e) {
                    return t._toggleEventHandler(e);
                  });
                },
              },
              {
                key: "_toggleEventHandler",
                value: function (e, t) {
                  this._handlers[e] &&
                    (this.input.removeEventListener(e, this._handlers[e]),
                    delete this._handlers[e]),
                    t &&
                      (this.input.addEventListener(e, t),
                      (this._handlers[e] = t));
                },
              },
            ]),
            i
          );
        })()),
      An =
        ((xn.EVENTS_MAP = {
          selectionChange: "keydown",
          input: "input",
          drop: "drop",
          click: "click",
          focus: "focus",
          commit: "blur",
        }),
        (C.HTMLMaskElement = xn),
        (function () {
          y(t, xn);
          var e = E(t);
          function t() {
            return g(this, t), e.apply(this, arguments);
          }
          return (
            v(t, [
              {
                key: "_unsafeSelectionStart",
                get: function () {
                  var e = this.rootElement,
                    e = e.getSelection && e.getSelection();
                  return e && e.anchorOffset;
                },
              },
              {
                key: "_unsafeSelectionEnd",
                get: function () {
                  var e = this.rootElement,
                    e = e.getSelection && e.getSelection();
                  return e && this._unsafeSelectionStart + String(e).length;
                },
              },
              {
                key: "_unsafeSelect",
                value: function (e, t) {
                  var n;
                  this.rootElement.createRange &&
                    ((n = this.rootElement.createRange()).setStart(
                      this.input.firstChild || this.input,
                      e
                    ),
                    n.setEnd(this.input.lastChild || this.input, t),
                    (t =
                      (e = this.rootElement).getSelection &&
                      e.getSelection()) &&
                      (t.removeAllRanges(), t.addRange(n)));
                },
              },
              {
                key: "value",
                get: function () {
                  return this.input.textContent;
                },
                set: function (e) {
                  this.input.textContent = e;
                },
              },
            ]),
            t
          );
        })()),
      Dn = ((C.HTMLContenteditableMaskElement = An), ["mask"]),
      Ce = (function () {
        function n(e, t) {
          g(this, n),
            (this.el =
              e instanceof Cn
                ? e
                : new (e.isContentEditable &&
                  "INPUT" !== e.tagName &&
                  "TEXTAREA" !== e.tagName
                    ? An
                    : xn)(e)),
            (this.masked = A(t)),
            (this._listeners = {}),
            (this._value = ""),
            (this._unmaskedValue = ""),
            (this._saveSelection = this._saveSelection.bind(this)),
            (this._onInput = this._onInput.bind(this)),
            (this._onChange = this._onChange.bind(this)),
            (this._onDrop = this._onDrop.bind(this)),
            (this._onFocus = this._onFocus.bind(this)),
            (this._onClick = this._onClick.bind(this)),
            (this.alignCursor = this.alignCursor.bind(this)),
            (this.alignCursorFriendly = this.alignCursorFriendly.bind(this)),
            this._bindEvents(),
            this.updateValue(),
            this._onChange();
        }
        return (
          v(n, [
            {
              key: "mask",
              get: function () {
                return this.masked.mask;
              },
              set: function (e) {
                var t;
                this.maskEquals(e) ||
                  (e instanceof C.Masked || this.masked.constructor !== vn(e)
                    ? (((t = A({ mask: e })).unmaskedValue =
                        this.masked.unmaskedValue),
                      (this.masked = t))
                    : this.masked.updateOptions({ mask: e }));
              },
            },
            {
              key: "maskEquals",
              value: function (e) {
                return (
                  null == e ||
                  e === this.masked.mask ||
                  (e === Date && this.masked instanceof kn)
                );
              },
            },
            {
              key: "value",
              get: function () {
                return this._value;
              },
              set: function (e) {
                (this.masked.value = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this._unmaskedValue;
              },
              set: function (e) {
                (this.masked.unmaskedValue = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "typedValue",
              get: function () {
                return this.masked.typedValue;
              },
              set: function (e) {
                (this.masked.typedValue = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "_bindEvents",
              value: function () {
                this.el.bindEvents({
                  selectionChange: this._saveSelection,
                  input: this._onInput,
                  drop: this._onDrop,
                  click: this._onClick,
                  focus: this._onFocus,
                  commit: this._onChange,
                });
              },
            },
            {
              key: "_unbindEvents",
              value: function () {
                this.el && this.el.unbindEvents();
              },
            },
            {
              key: "_fireEvent",
              value: function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(1 < t ? t - 1 : 0),
                    i = 1;
                  i < t;
                  i++
                )
                  n[i - 1] = arguments[i];
                e = this._listeners[e];
                e &&
                  e.forEach(function (e) {
                    return e.apply(void 0, n);
                  });
              },
            },
            {
              key: "selectionStart",
              get: function () {
                return this._cursorChanging
                  ? this._changingCursorPos
                  : this.el.selectionStart;
              },
            },
            {
              key: "cursorPos",
              get: function () {
                return this._cursorChanging
                  ? this._changingCursorPos
                  : this.el.selectionEnd;
              },
              set: function (e) {
                this.el &&
                  this.el.isActive &&
                  (this.el.select(e, e), this._saveSelection());
              },
            },
            {
              key: "_saveSelection",
              value: function () {
                this.value !== this.el.value &&
                  console.warn(
                    "Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."
                  ),
                  (this._selection = {
                    start: this.selectionStart,
                    end: this.cursorPos,
                  });
              },
            },
            {
              key: "updateValue",
              value: function () {
                (this.masked.value = this.el.value),
                  (this._value = this.masked.value);
              },
            },
            {
              key: "updateControl",
              value: function () {
                var e = this.masked.unmaskedValue,
                  t = this.masked.value,
                  n = this.unmaskedValue !== e || this.value !== t;
                (this._unmaskedValue = e),
                  (this._value = t),
                  this.el.value !== t && (this.el.value = t),
                  n && this._fireChangeEvents();
              },
            },
            {
              key: "updateOptions",
              value: function (e) {
                var t = e.mask,
                  e = cn(e, Dn),
                  n = !this.maskEquals(t),
                  i = !(function e(t, n) {
                    if (n === t) return 1;
                    var i = Array.isArray(n),
                      r = Array.isArray(t);
                    if (i && r) {
                      if (n.length != t.length) return;
                      for (s = 0; s < n.length; s++) if (!e(n[s], t[s])) return;
                      return 1;
                    }
                    if (i == r) {
                      if (n && t && "object" === an(n) && "object" === an(t)) {
                        if (
                          ((i = n instanceof Date),
                          (r = t instanceof Date),
                          i && r)
                        )
                          return n.getTime() == t.getTime();
                        if (i != r) return;
                        if (
                          ((i = n instanceof RegExp),
                          (r = t instanceof RegExp),
                          i && r)
                        )
                          return n.toString() == t.toString();
                        if (i != r) return;
                        for (var o = Object.keys(n), s = 0; s < o.length; s++)
                          if (!Object.prototype.hasOwnProperty.call(t, o[s]))
                            return;
                        for (s = 0; s < o.length; s++)
                          if (!e(t[o[s]], n[o[s]])) return;
                        return 1;
                      }
                      return (
                        n &&
                        t &&
                        "function" == typeof n &&
                        "function" == typeof t &&
                        n.toString() === t.toString()
                      );
                    }
                  })(this.masked, e);
                n && (this.mask = t),
                  i && this.masked.updateOptions(e),
                  (n || i) && this.updateControl();
              },
            },
            {
              key: "updateCursor",
              value: function (e) {
                null != e && ((this.cursorPos = e), this._delayUpdateCursor(e));
              },
            },
            {
              key: "_delayUpdateCursor",
              value: function (e) {
                var t = this;
                this._abortUpdateCursor(),
                  (this._changingCursorPos = e),
                  (this._cursorChanging = setTimeout(function () {
                    t.el &&
                      ((t.cursorPos = t._changingCursorPos),
                      t._abortUpdateCursor());
                  }, 10));
              },
            },
            {
              key: "_fireChangeEvents",
              value: function () {
                this._fireEvent("accept", this._inputEvent),
                  this.masked.isComplete &&
                    this._fireEvent("complete", this._inputEvent);
              },
            },
            {
              key: "_abortUpdateCursor",
              value: function () {
                this._cursorChanging &&
                  (clearTimeout(this._cursorChanging),
                  delete this._cursorChanging);
              },
            },
            {
              key: "alignCursor",
              value: function () {
                this.cursorPos = this.masked.nearestInputPos(this.cursorPos, j);
              },
            },
            {
              key: "alignCursorFriendly",
              value: function () {
                this.selectionStart === this.cursorPos && this.alignCursor();
              },
            },
            {
              key: "on",
              value: function (e, t) {
                return (
                  this._listeners[e] || (this._listeners[e] = []),
                  this._listeners[e].push(t),
                  this
                );
              },
            },
            {
              key: "off",
              value: function (e, t) {
                if (!this._listeners[e]) return this;
                if (!t) return delete this._listeners[e], this;
                t = this._listeners[e].indexOf(t);
                return 0 <= t && this._listeners[e].splice(t, 1), this;
              },
            },
            {
              key: "_onInput",
              value: function (e) {
                if (
                  ((this._inputEvent = e),
                  this._abortUpdateCursor(),
                  !this._selection)
                )
                  return this.updateValue();
                var e = new gn(
                    this.el.value,
                    this.cursorPos,
                    this.value,
                    this._selection
                  ),
                  t = this.masked.rawInputValue,
                  n = this.masked.splice(
                    e.startChangePos,
                    e.removed.length,
                    e.inserted,
                    e.removeDirection
                  ).offset,
                  t = t === this.masked.rawInputValue ? e.removeDirection : N,
                  e = this.masked.nearestInputPos(e.startChangePos + n, t);
                this.updateControl(),
                  this.updateCursor(e),
                  delete this._inputEvent;
              },
            },
            {
              key: "_onChange",
              value: function () {
                this.value !== this.el.value && this.updateValue(),
                  this.masked.doCommit(),
                  this.updateControl(),
                  this._saveSelection();
              },
            },
            {
              key: "_onDrop",
              value: function (e) {
                e.preventDefault(), e.stopPropagation();
              },
            },
            {
              key: "_onFocus",
              value: function (e) {
                this.alignCursorFriendly();
              },
            },
            {
              key: "_onClick",
              value: function (e) {
                this.alignCursorFriendly();
              },
            },
            {
              key: "destroy",
              value: function () {
                this._unbindEvents(),
                  (this._listeners.length = 0),
                  delete this.el;
              },
            },
          ]),
          n
        );
      })(),
      h =
        ((C.InputMask = Ce),
        (function () {
          y(o, D);
          var e = E(o);
          function o() {
            return g(this, o), e.apply(this, arguments);
          }
          return (
            v(o, [
              {
                key: "_update",
                value: function (e) {
                  e.enum && (e.mask = "*".repeat(e.enum[0].length)),
                    b(_(o.prototype), "_update", this).call(this, e);
                },
              },
              {
                key: "doValidate",
                value: function () {
                  for (
                    var e,
                      t = this,
                      n = arguments.length,
                      i = new Array(n),
                      r = 0;
                    r < n;
                    r++
                  )
                    i[r] = arguments[r];
                  return (
                    this.enum.some(function (e) {
                      return 0 <= e.indexOf(t.unmaskedValue);
                    }) &&
                    (e = b(_(o.prototype), "doValidate", this)).call.apply(
                      e,
                      [this].concat(i)
                    )
                  );
                },
              },
            ]),
            o
          );
        })()),
      s =
        ((C.MaskedEnum = h),
        (function () {
          y(o, x);
          var t = E(o);
          function o(e) {
            return g(this, o), t.call(this, Object.assign({}, o.DEFAULTS, e));
          }
          return (
            v(o, [
              {
                key: "_update",
                value: function (e) {
                  b(_(o.prototype), "_update", this).call(this, e),
                    this._updateRegExps();
                },
              },
              {
                key: "_updateRegExps",
                value: function () {
                  var e = "^" + (this.allowNegative ? "[+|\\-]?" : ""),
                    t =
                      (this.scale
                        ? "(" + mn(this.radix) + "\\d{0," + this.scale + "})?"
                        : "") + "$";
                  (this._numberRegExpInput = new RegExp(
                    e + "(0|([1-9]+\\d*))?" + t
                  )),
                    (this._numberRegExp = new RegExp(e + "\\d*" + t)),
                    (this._mapToRadixRegExp = new RegExp(
                      "[" + this.mapToRadix.map(mn).join("") + "]",
                      "g"
                    )),
                    (this._thousandsSeparatorRegExp = new RegExp(
                      mn(this.thousandsSeparator),
                      "g"
                    ));
                },
              },
              {
                key: "_removeThousandsSeparators",
                value: function (e) {
                  return e.replace(this._thousandsSeparatorRegExp, "");
                },
              },
              {
                key: "_insertThousandsSeparators",
                value: function (e) {
                  e = e.split(this.radix);
                  return (
                    (e[0] = e[0].replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      this.thousandsSeparator
                    )),
                    e.join(this.radix)
                  );
                },
              },
              {
                key: "doPrepare",
                value: function (e) {
                  for (
                    var t,
                      n = arguments.length,
                      i = new Array(1 < n ? n - 1 : 0),
                      r = 1;
                    r < n;
                    r++
                  )
                    i[r - 1] = arguments[r];
                  return (t = b(_(o.prototype), "doPrepare", this)).call.apply(
                    t,
                    [
                      this,
                      this._removeThousandsSeparators(
                        e.replace(this._mapToRadixRegExp, this.radix)
                      ),
                    ].concat(i)
                  );
                },
              },
              {
                key: "_separatorsCount",
                value: function (e) {
                  for (
                    var t =
                        1 < arguments.length &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                      n = 0,
                      i = 0;
                    i < e;
                    ++i
                  )
                    this._value.indexOf(this.thousandsSeparator, i) === i &&
                      (++n, t && (e += this.thousandsSeparator.length));
                  return n;
                },
              },
              {
                key: "_separatorsCountFromSlice",
                value: function () {
                  var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : this._value;
                  return this._separatorsCount(
                    this._removeThousandsSeparators(e).length,
                    !0
                  );
                },
              },
              {
                key: "extractInput",
                value: function () {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.value.length,
                    n = 2 < arguments.length ? arguments[2] : void 0,
                    i = T(this._adjustRangeWithSeparators(e, t), 2),
                    e = i[0],
                    t = i[1];
                  return this._removeThousandsSeparators(
                    b(_(o.prototype), "extractInput", this).call(this, e, t, n)
                  );
                },
              },
              {
                key: "_appendCharRaw",
                value: function (e) {
                  var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                  if (!this.thousandsSeparator)
                    return b(_(o.prototype), "_appendCharRaw", this).call(
                      this,
                      e,
                      t
                    );
                  var n = (
                      t.tail && t._beforeTailState ? t._beforeTailState : this
                    )._value,
                    n = this._separatorsCountFromSlice(n),
                    i =
                      ((this._value = this._removeThousandsSeparators(
                        this.value
                      )),
                      b(_(o.prototype), "_appendCharRaw", this).call(
                        this,
                        e,
                        t
                      )),
                    t =
                      ((this._value = this._insertThousandsSeparators(
                        this._value
                      )),
                      (t.tail && t._beforeTailState ? t._beforeTailState : this)
                        ._value),
                    t = this._separatorsCountFromSlice(t);
                  return (
                    (i.tailShift += (t - n) * this.thousandsSeparator.length),
                    (i.skip = !i.rawInserted && e === this.thousandsSeparator),
                    i
                  );
                },
              },
              {
                key: "_findSeparatorAround",
                value: function (e) {
                  if (this.thousandsSeparator) {
                    var t = e - this.thousandsSeparator.length + 1,
                      t = this.value.indexOf(this.thousandsSeparator, t);
                    if (t <= e) return t;
                  }
                  return -1;
                },
              },
              {
                key: "_adjustRangeWithSeparators",
                value: function (e, t) {
                  var n = this._findSeparatorAround(e),
                    n = (0 <= n && (e = n), this._findSeparatorAround(t));
                  return [
                    e,
                    (t = 0 <= n ? n + this.thousandsSeparator.length : t),
                  ];
                },
              },
              {
                key: "remove",
                value: function () {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.value.length,
                    n = T(this._adjustRangeWithSeparators(e, t), 2),
                    e = n[0],
                    t = n[1],
                    n = this.value.slice(0, e),
                    e = this.value.slice(t),
                    t = this._separatorsCount(n.length),
                    e =
                      ((this._value = this._insertThousandsSeparators(
                        this._removeThousandsSeparators(n + e)
                      )),
                      this._separatorsCountFromSlice(n));
                  return new I({
                    tailShift: (e - t) * this.thousandsSeparator.length,
                  });
                },
              },
              {
                key: "nearestInputPos",
                value: function (e, t) {
                  if (!this.thousandsSeparator) return e;
                  switch (t) {
                    case N:
                    case j:
                    case $:
                      var n = this._findSeparatorAround(e - 1);
                      if (0 <= n) {
                        var i = n + this.thousandsSeparator.length;
                        if (e < i || this.value.length <= i || t === $)
                          return n;
                      }
                      break;
                    case B:
                    case G:
                      i = this._findSeparatorAround(e);
                      if (0 <= i) return i + this.thousandsSeparator.length;
                  }
                  return e;
                },
              },
              {
                key: "doValidate",
                value: function (e) {
                  var t,
                    n = (
                      e.input ? this._numberRegExpInput : this._numberRegExp
                    ).test(this._removeThousandsSeparators(this.value));
                  return (
                    n &&
                      ((t = this.number),
                      (n =
                        n &&
                        !isNaN(t) &&
                        (null == this.min ||
                          0 <= this.min ||
                          this.min <= this.number) &&
                        (null == this.max ||
                          this.max <= 0 ||
                          this.number <= this.max))),
                    n && b(_(o.prototype), "doValidate", this).call(this, e)
                  );
                },
              },
              {
                key: "doCommit",
                value: function () {
                  var e, t;
                  this.value &&
                    ((e = t = this.number),
                    null != this.min && (e = Math.max(e, this.min)),
                    (e = null != this.max ? Math.min(e, this.max) : e) !== t &&
                      (this.unmaskedValue = String(e)),
                    (t = this.value),
                    this.normalizeZeros && (t = this._normalizeZeros(t)),
                    this.padFractionalZeros &&
                      (t = this._padFractionalZeros(t)),
                    (this._value = t)),
                    b(_(o.prototype), "doCommit", this).call(this);
                },
              },
              {
                key: "_normalizeZeros",
                value: function (e) {
                  var t = this._removeThousandsSeparators(e).split(this.radix);
                  return (
                    (t[0] = t[0].replace(
                      /^(\D*)(0*)(\d*)/,
                      function (e, t, n, i) {
                        return t + i;
                      }
                    )),
                    e.length && !/\d$/.test(t[0]) && (t[0] = t[0] + "0"),
                    1 < t.length &&
                      ((t[1] = t[1].replace(/0*$/, "")),
                      t[1].length || (t.length = 1)),
                    this._insertThousandsSeparators(t.join(this.radix))
                  );
                },
              },
              {
                key: "_padFractionalZeros",
                value: function (e) {
                  if (!e) return e;
                  e = e.split(this.radix);
                  return (
                    e.length < 2 && e.push(""),
                    (e[1] = e[1].padEnd(this.scale, "0")),
                    e.join(this.radix)
                  );
                },
              },
              {
                key: "unmaskedValue",
                get: function () {
                  return this._removeThousandsSeparators(
                    this._normalizeZeros(this.value)
                  ).replace(this.radix, ".");
                },
                set: function (e) {
                  w(
                    _(o.prototype),
                    "unmaskedValue",
                    e.replace(".", this.radix),
                    this,
                    !0
                  );
                },
              },
              {
                key: "typedValue",
                get: function () {
                  return Number(this.unmaskedValue);
                },
                set: function (e) {
                  w(_(o.prototype), "unmaskedValue", String(e), this, !0);
                },
              },
              {
                key: "number",
                get: function () {
                  return this.typedValue;
                },
                set: function (e) {
                  this.typedValue = e;
                },
              },
              {
                key: "allowNegative",
                get: function () {
                  return (
                    this.signed ||
                    (null != this.min && this.min < 0) ||
                    (null != this.max && this.max < 0)
                  );
                },
              },
            ]),
            o
          );
        })()),
      Be =
        ((s.DEFAULTS = {
          radix: ",",
          thousandsSeparator: "",
          mapToRadix: ["."],
          scale: 2,
          signed: !1,
          normalizeZeros: !0,
          padFractionalZeros: !1,
        }),
        (C.MaskedNumber = s),
        (function () {
          y(t, x);
          var e = E(t);
          function t() {
            return g(this, t), e.apply(this, arguments);
          }
          return (
            v(t, [
              {
                key: "_update",
                value: function (e) {
                  e.mask && (e.validate = e.mask),
                    b(_(t.prototype), "_update", this).call(this, e);
                },
              },
            ]),
            t
          );
        })()),
      On =
        ((C.MaskedFunction = Be),
        ["compiledMasks", "currentMaskRef", "currentMask"]),
      p = (function () {
        y(r, x);
        var t = E(r);
        function r(e) {
          return (
            g(this, r),
            ((e = t.call(this, Object.assign({}, r.DEFAULTS, e))).currentMask =
              null),
            e
          );
        }
        return (
          v(r, [
            {
              key: "_update",
              value: function (e) {
                b(_(r.prototype), "_update", this).call(this, e),
                  "mask" in e &&
                    (this.compiledMasks = Array.isArray(e.mask)
                      ? e.mask.map(A)
                      : []);
              },
            },
            {
              key: "_appendCharRaw",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = this._applyDispatch(e, t);
                return (
                  this.currentMask &&
                    n.aggregate(this.currentMask._appendChar(e, t)),
                  n
                );
              },
            },
            {
              key: "_applyDispatch",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : "",
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n =
                    t.tail && null != t._beforeTailState
                      ? t._beforeTailState._value
                      : this.value,
                  i = this.rawInputValue,
                  r =
                    t.tail && null != t._beforeTailState
                      ? t._beforeTailState._rawInputValue
                      : i,
                  i = i.slice(r.length),
                  o = this.currentMask,
                  s = new I(),
                  a = o && o.state;
                return (
                  (this.currentMask = this.doDispatch(e, Object.assign({}, t))),
                  this.currentMask &&
                    (this.currentMask !== o
                      ? (this.currentMask.reset(),
                        r &&
                          ((e = this.currentMask.append(r, { raw: !0 })),
                          (s.tailShift = e.inserted.length - n.length)),
                        i &&
                          (s.tailShift += this.currentMask.append(i, {
                            raw: !0,
                            tail: !0,
                          }).tailShift))
                      : (this.currentMask.state = a)),
                  s
                );
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = this._applyDispatch.apply(this, arguments);
                return (
                  this.currentMask &&
                    e.aggregate(this.currentMask._appendPlaceholder()),
                  e
                );
              },
            },
            {
              key: "doDispatch",
              value: function (e) {
                return this.dispatch(
                  e,
                  this,
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {}
                );
              },
            },
            {
              key: "doValidate",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return (
                  (e = b(_(r.prototype), "doValidate", this)).call.apply(
                    e,
                    [this].concat(n)
                  ) &&
                  (!this.currentMask ||
                    (e = this.currentMask).doValidate.apply(e, n))
                );
              },
            },
            {
              key: "reset",
              value: function () {
                this.currentMask && this.currentMask.reset(),
                  this.compiledMasks.forEach(function (e) {
                    return e.reset();
                  });
              },
            },
            {
              key: "value",
              get: function () {
                return this.currentMask ? this.currentMask.value : "";
              },
              set: function (e) {
                w(_(r.prototype), "value", e, this, !0);
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.currentMask ? this.currentMask.unmaskedValue : "";
              },
              set: function (e) {
                w(_(r.prototype), "unmaskedValue", e, this, !0);
              },
            },
            {
              key: "typedValue",
              get: function () {
                return this.currentMask ? this.currentMask.typedValue : "";
              },
              set: function (e) {
                var t = String(e);
                this.currentMask &&
                  ((this.currentMask.typedValue = e),
                  (t = this.currentMask.unmaskedValue)),
                  (this.unmaskedValue = t);
              },
            },
            {
              key: "isComplete",
              get: function () {
                return !!this.currentMask && this.currentMask.isComplete;
              },
            },
            {
              key: "remove",
              value: function () {
                var e,
                  t = new I();
                return (
                  this.currentMask &&
                    t
                      .aggregate(
                        (e = this.currentMask).remove.apply(e, arguments)
                      )
                      .aggregate(this._applyDispatch()),
                  t
                );
              },
            },
            {
              key: "state",
              get: function () {
                return Object.assign({}, b(_(r.prototype), "state", this), {
                  _rawInputValue: this.rawInputValue,
                  compiledMasks: this.compiledMasks.map(function (e) {
                    return e.state;
                  }),
                  currentMaskRef: this.currentMask,
                  currentMask: this.currentMask && this.currentMask.state,
                });
              },
              set: function (e) {
                var n = e.compiledMasks,
                  t = e.currentMaskRef,
                  i = e.currentMask,
                  e = cn(e, On);
                this.compiledMasks.forEach(function (e, t) {
                  return (e.state = n[t]);
                }),
                  null != t &&
                    ((this.currentMask = t), (this.currentMask.state = i)),
                  w(_(r.prototype), "state", e, this, !0);
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e;
                return this.currentMask
                  ? (e = this.currentMask).extractInput.apply(e, arguments)
                  : "";
              },
            },
            {
              key: "extractTail",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return this.currentMask
                  ? (e = this.currentMask).extractTail.apply(e, n)
                  : (e = b(_(r.prototype), "extractTail", this)).call.apply(
                      e,
                      [this].concat(n)
                    );
              },
            },
            {
              key: "doCommit",
              value: function () {
                this.currentMask && this.currentMask.doCommit(),
                  b(_(r.prototype), "doCommit", this).call(this);
              },
            },
            {
              key: "nearestInputPos",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return this.currentMask
                  ? (e = this.currentMask).nearestInputPos.apply(e, n)
                  : (e = b(_(r.prototype), "nearestInputPos", this)).call.apply(
                      e,
                      [this].concat(n)
                    );
              },
            },
            {
              key: "overwrite",
              get: function () {
                return this.currentMask
                  ? this.currentMask.overwrite
                  : b(_(r.prototype), "overwrite", this);
              },
              set: function (e) {
                console.warn(
                  '"overwrite" option is not available in dynamic mask, use this option in siblings'
                );
              },
            },
          ]),
          r
        );
      })(),
      Rn =
        ((p.DEFAULTS = {
          dispatch: function (n, e, i) {
            var r, t;
            if (e.compiledMasks.length)
              return (
                (r = e.rawInputValue),
                (t = e.compiledMasks.map(function (e, t) {
                  return (
                    e.reset(),
                    e.append(r, { raw: !0 }),
                    e.append(n, i),
                    { weight: e.rawInputValue.length, index: t }
                  );
                })),
                t.sort(function (e, t) {
                  return t.weight - e.weight;
                }),
                e.compiledMasks[t[0].index]
              );
          },
        }),
        (C.MaskedDynamic = p),
        { MASKED: "value", UNMASKED: "unmaskedValue", TYPED: "typedValue" });
    function Pn(e) {
      var n =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : Rn.MASKED,
        i =
          2 < arguments.length && void 0 !== arguments[2]
            ? arguments[2]
            : Rn.MASKED,
        r = A(e);
      return function (t) {
        return r.runIsolated(function (e) {
          return (e[n] = t), e[i];
        });
      };
    }
    function Mn(e) {
      for (
        var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1;
        i < t;
        i++
      )
        n[i - 1] = arguments[i];
      return Pn.apply(void 0, n)(e);
    }
    (C.PIPE_TYPE = Rn), (C.createPipe = Pn), (C.pipe = Mn);
    try {
      globalThis.IMask = C;
    } catch (e) {}
    (e.HTMLContenteditableMaskElement = An),
      (e.HTMLMaskElement = xn),
      (e.InputMask = Ce),
      (e.MaskElement = Cn),
      (e.Masked = x),
      (e.MaskedDate = kn),
      (e.MaskedDynamic = p),
      (e.MaskedEnum = h),
      (e.MaskedFunction = Be),
      (e.MaskedNumber = s),
      (e.MaskedPattern = D),
      (e.MaskedRange = In),
      (e.MaskedRegExp = l),
      (e.PIPE_TYPE = Rn),
      (e.createMask = A),
      (e.createPipe = Pn),
      (e.default = C),
      (e.pipe = Mn),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  !(function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "undefined" != typeof exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (u) {
    "use strict";
    var i,
      o = window.Slick || {};
    (i = 0),
      ((o = function (e, t) {
        var n = this;
        (n.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: u(e),
          appendDots: u(e),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (e, t) {
            return u('<button type="button" />').text(t + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          u.extend(n, n.initials),
          (n.activeBreakpoint = null),
          (n.animType = null),
          (n.animProp = null),
          (n.breakpoints = []),
          (n.breakpointSettings = []),
          (n.cssTransitions = !1),
          (n.focussed = !1),
          (n.interrupted = !1),
          (n.hidden = "hidden"),
          (n.paused = !0),
          (n.positionProp = null),
          (n.respondTo = null),
          (n.rowCount = 1),
          (n.shouldClick = !0),
          (n.$slider = u(e)),
          (n.$slidesCache = null),
          (n.transformType = null),
          (n.transitionType = null),
          (n.visibilityChange = "visibilitychange"),
          (n.windowWidth = 0),
          (n.windowTimer = null),
          (e = u(e).data("slick") || {}),
          (n.options = u.extend({}, n.defaults, t, e)),
          (n.currentSlide = n.options.initialSlide),
          (n.originalSettings = n.options),
          void 0 !== document.mozHidden
            ? ((n.hidden = "mozHidden"),
              (n.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((n.hidden = "webkitHidden"),
              (n.visibilityChange = "webkitvisibilitychange")),
          (n.autoPlay = u.proxy(n.autoPlay, n)),
          (n.autoPlayClear = u.proxy(n.autoPlayClear, n)),
          (n.autoPlayIterator = u.proxy(n.autoPlayIterator, n)),
          (n.changeSlide = u.proxy(n.changeSlide, n)),
          (n.clickHandler = u.proxy(n.clickHandler, n)),
          (n.selectHandler = u.proxy(n.selectHandler, n)),
          (n.setPosition = u.proxy(n.setPosition, n)),
          (n.swipeHandler = u.proxy(n.swipeHandler, n)),
          (n.dragHandler = u.proxy(n.dragHandler, n)),
          (n.keyHandler = u.proxy(n.keyHandler, n)),
          (n.instanceUid = i++),
          (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          n.registerBreakpoints(),
          n.init(!0);
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
      (o.prototype.addSlide = o.prototype.slickAdd =
        function (e, t, n) {
          var i = this;
          if ("boolean" == typeof t) (n = t), (t = null);
          else if (t < 0 || t >= i.slideCount) return !1;
          i.unload(),
            "number" == typeof t
              ? 0 === t && 0 === i.$slides.length
                ? u(e).appendTo(i.$slideTrack)
                : n
                ? u(e).insertBefore(i.$slides.eq(t))
                : u(e).insertAfter(i.$slides.eq(t))
              : !0 === n
              ? u(e).prependTo(i.$slideTrack)
              : u(e).appendTo(i.$slideTrack),
            (i.$slides = i.$slideTrack.children(this.options.slide)),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.append(i.$slides),
            i.$slides.each(function (e, t) {
              u(t).attr("data-slick-index", e);
            }),
            (i.$slidesCache = i.$slides),
            i.reinit();
        }),
      (o.prototype.animateHeight = function () {
        var e,
          t = this;
        1 === t.options.slidesToShow &&
          !0 === t.options.adaptiveHeight &&
          !1 === t.options.vertical &&
          ((e = t.$slides.eq(t.currentSlide).outerHeight(!0)),
          t.$list.animate({ height: e }, t.options.speed));
      }),
      (o.prototype.animateSlide = function (e, t) {
        var n = {},
          i = this;
        i.animateHeight(),
          !0 === i.options.rtl && !1 === i.options.vertical && (e = -e),
          !1 === i.transformsEnabled
            ? !1 === i.options.vertical
              ? i.$slideTrack.animate(
                  { left: e },
                  i.options.speed,
                  i.options.easing,
                  t
                )
              : i.$slideTrack.animate(
                  { top: e },
                  i.options.speed,
                  i.options.easing,
                  t
                )
            : !1 === i.cssTransitions
            ? (!0 === i.options.rtl && (i.currentLeft = -i.currentLeft),
              u({ animStart: i.currentLeft }).animate(
                { animStart: e },
                {
                  duration: i.options.speed,
                  easing: i.options.easing,
                  step: function (e) {
                    (e = Math.ceil(e)),
                      !1 === i.options.vertical
                        ? (n[i.animType] = "translate(" + e + "px, 0px)")
                        : (n[i.animType] = "translate(0px," + e + "px)"),
                      i.$slideTrack.css(n);
                  },
                  complete: function () {
                    t && t.call();
                  },
                }
              ))
            : (i.applyTransition(),
              (e = Math.ceil(e)),
              !1 === i.options.vertical
                ? (n[i.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (n[i.animType] = "translate3d(0px," + e + "px, 0px)"),
              i.$slideTrack.css(n),
              t &&
                setTimeout(function () {
                  i.disableTransition(), t.call();
                }, i.options.speed));
      }),
      (o.prototype.getNavTarget = function () {
        var e = this.options.asNavFor;
        return (e = e && null !== e ? u(e).not(this.$slider) : e);
      }),
      (o.prototype.asNavFor = function (t) {
        var e = this.getNavTarget();
        null !== e &&
          "object" == typeof e &&
          e.each(function () {
            var e = u(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0);
          });
      }),
      (o.prototype.applyTransition = function (e) {
        var t = this,
          n = {};
        !1 === t.options.fade
          ? (n[t.transitionType] =
              t.transformType +
              " " +
              t.options.speed +
              "ms " +
              t.options.cssEase)
          : (n[t.transitionType] =
              "opacity " + t.options.speed + "ms " + t.options.cssEase),
          (!1 === t.options.fade ? t.$slideTrack : t.$slides.eq(e)).css(n);
      }),
      (o.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(),
          e.slideCount > e.options.slidesToShow &&
            (e.autoPlayTimer = setInterval(
              e.autoPlayIterator,
              e.options.autoplaySpeed
            ));
      }),
      (o.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (o.prototype.autoPlayIterator = function () {
        var e = this,
          t = e.currentSlide + e.options.slidesToScroll;
        e.paused ||
          e.interrupted ||
          e.focussed ||
          (!1 === e.options.infinite &&
            (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1
              ? (e.direction = 0)
              : 0 === e.direction &&
                ((t = e.currentSlide - e.options.slidesToScroll),
                e.currentSlide - 1 == 0 && (e.direction = 1))),
          e.slideHandler(t));
      }),
      (o.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows &&
          ((e.$prevArrow = u(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = u(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              !0 !== e.options.infinite &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow
                .add(e.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (o.prototype.buildDots = function () {
        var e,
          t,
          n = this;
        if (!0 === n.options.dots) {
          for (
            n.$slider.addClass("slick-dotted"),
              t = u("<ul />").addClass(n.options.dotsClass),
              e = 0;
            e <= n.getDotCount();
            e += 1
          )
            t.append(
              u("<li />").append(n.options.customPaging.call(this, n, e))
            );
          (n.$dots = t.appendTo(n.options.appendDots)),
            n.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (o.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (e, t) {
            u(t)
              .attr("data-slick-index", e)
              .data("originalStyling", u(t).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            0 === e.slideCount
              ? u('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
            (e.options.slidesToScroll = 1),
          u("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          !0 === e.options.draggable && e.$list.addClass("draggable");
      }),
      (o.prototype.buildRows = function () {
        var e,
          t,
          n,
          i = this,
          r = document.createDocumentFragment(),
          o = i.$slider.children();
        if (1 < i.options.rows) {
          for (
            n = i.options.slidesPerRow * i.options.rows,
              t = Math.ceil(o.length / n),
              e = 0;
            e < t;
            e++
          ) {
            for (
              var s = document.createElement("div"), a = 0;
              a < i.options.rows;
              a++
            ) {
              for (
                var l = document.createElement("div"), u = 0;
                u < i.options.slidesPerRow;
                u++
              ) {
                var c = e * n + (a * i.options.slidesPerRow + u);
                o.get(c) && l.appendChild(o.get(c));
              }
              s.appendChild(l);
            }
            r.appendChild(s);
          }
          i.$slider.empty().append(r),
            i.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / i.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (o.prototype.checkResponsive = function (e, t) {
        var n,
          i,
          r,
          o = this,
          s = !1,
          a = o.$slider.width(),
          l = window.innerWidth || u(window).width();
        if (
          ("window" === o.respondTo
            ? (r = l)
            : "slider" === o.respondTo
            ? (r = a)
            : "min" === o.respondTo && (r = Math.min(l, a)),
          o.options.responsive &&
            o.options.responsive.length &&
            null !== o.options.responsive)
        ) {
          for (n in ((i = null), o.breakpoints))
            o.breakpoints.hasOwnProperty(n) &&
              (!1 === o.originalSettings.mobileFirst
                ? r < o.breakpoints[n] && (i = o.breakpoints[n])
                : r > o.breakpoints[n] && (i = o.breakpoints[n]));
          null !== i
            ? (null !== o.activeBreakpoint && i === o.activeBreakpoint && !t) ||
              ((o.activeBreakpoint = i),
              "unslick" === o.breakpointSettings[i]
                ? o.unslick(i)
                : ((o.options = u.extend(
                    {},
                    o.originalSettings,
                    o.breakpointSettings[i]
                  )),
                  !0 === e && (o.currentSlide = o.options.initialSlide),
                  o.refresh(e)),
              (s = i))
            : null !== o.activeBreakpoint &&
              ((o.activeBreakpoint = null),
              (o.options = o.originalSettings),
              !0 === e && (o.currentSlide = o.options.initialSlide),
              o.refresh(e),
              (s = i)),
            e || !1 === s || o.$slider.trigger("breakpoint", [o, s]);
        }
      }),
      (o.prototype.changeSlide = function (e, t) {
        var n,
          i = this,
          r = u(e.currentTarget);
        switch (
          (r.is("a") && e.preventDefault(),
          r.is("li") || (r = r.closest("li")),
          (n =
            i.slideCount % i.options.slidesToScroll != 0
              ? 0
              : (i.slideCount - i.currentSlide) % i.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (o =
              0 == n ? i.options.slidesToScroll : i.options.slidesToShow - n),
              i.slideCount > i.options.slidesToShow &&
                i.slideHandler(i.currentSlide - o, !1, t);
            break;
          case "next":
            (o = 0 == n ? i.options.slidesToScroll : n),
              i.slideCount > i.options.slidesToShow &&
                i.slideHandler(i.currentSlide + o, !1, t);
            break;
          case "index":
            var o =
              0 === e.data.index
                ? 0
                : e.data.index || r.index() * i.options.slidesToScroll;
            i.slideHandler(i.checkNavigable(o), !1, t),
              r.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (o.prototype.checkNavigable = function (e) {
        var t = this.getNavigableIndexes(),
          n = 0;
        if (e > t[t.length - 1]) e = t[t.length - 1];
        else
          for (var i in t) {
            if (e < t[i]) {
              e = n;
              break;
            }
            n = t[i];
          }
        return e;
      }),
      (o.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots &&
          null !== e.$dots &&
          (u("li", e.$dots)
            .off("click.slick", e.changeSlide)
            .off("mouseenter.slick", u.proxy(e.interrupt, e, !0))
            .off("mouseleave.slick", u.proxy(e.interrupt, e, !1)),
          !0 === e.options.accessibility &&
            e.$dots.off("keydown.slick", e.keyHandler)),
          e.$slider.off("focus.slick blur.slick"),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
            e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
            !0 === e.options.accessibility &&
              (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
              e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
          e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
          e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
          e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
          e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
          e.$list.off("click.slick", e.clickHandler),
          u(document).off(e.visibilityChange, e.visibility),
          e.cleanUpSlideEvents(),
          !0 === e.options.accessibility &&
            e.$list.off("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().off("click.slick", e.selectHandler),
          u(window).off(
            "orientationchange.slick.slick-" + e.instanceUid,
            e.orientationChange
          ),
          u(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
          u("[draggable!=true]", e.$slideTrack).off(
            "dragstart",
            e.preventDefault
          ),
          u(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
      }),
      (o.prototype.cleanUpSlideEvents = function () {
        this.$list.off("mouseenter.slick", u.proxy(this.interrupt, this, !0)),
          this.$list.off("mouseleave.slick", u.proxy(this.interrupt, this, !1));
      }),
      (o.prototype.cleanUpRows = function () {
        var e;
        1 < this.options.rows &&
          ((e = this.$slides.children().children()).removeAttr("style"),
          this.$slider.empty().append(e));
      }),
      (o.prototype.clickHandler = function (e) {
        !1 === this.shouldClick &&
          (e.stopImmediatePropagation(),
          e.stopPropagation(),
          e.preventDefault());
      }),
      (o.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(),
          (t.touchObject = {}),
          t.cleanUpEvents(),
          u(".slick-cloned", t.$slider).detach(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.$prevArrow.length &&
            (t.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
          t.$nextArrow &&
            t.$nextArrow.length &&
            (t.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
          t.$slides &&
            (t.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                u(this).attr("style", u(this).data("originalStyling"));
              }),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slideTrack.detach(),
            t.$list.detach(),
            t.$slider.append(t.$slides)),
          t.cleanUpRows(),
          t.$slider.removeClass("slick-slider"),
          t.$slider.removeClass("slick-initialized"),
          t.$slider.removeClass("slick-dotted"),
          (t.unslicked = !0),
          e || t.$slider.trigger("destroy", [t]);
      }),
      (o.prototype.disableTransition = function (e) {
        var t = {};
        (t[this.transitionType] = ""),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(e)
          ).css(t);
      }),
      (o.prototype.fadeSlide = function (e, t) {
        var n = this;
        !1 === n.cssTransitions
          ? (n.$slides.eq(e).css({ zIndex: n.options.zIndex }),
            n.$slides
              .eq(e)
              .animate({ opacity: 1 }, n.options.speed, n.options.easing, t))
          : (n.applyTransition(e),
            n.$slides.eq(e).css({ opacity: 1, zIndex: n.options.zIndex }),
            t &&
              setTimeout(function () {
                n.disableTransition(e), t.call();
              }, n.options.speed));
      }),
      (o.prototype.fadeSlideOut = function (e) {
        !1 === this.cssTransitions
          ? this.$slides
              .eq(e)
              .animate(
                { opacity: 0, zIndex: this.options.zIndex - 2 },
                this.options.speed,
                this.options.easing
              )
          : (this.applyTransition(e),
            this.$slides
              .eq(e)
              .css({ opacity: 0, zIndex: this.options.zIndex - 2 }));
      }),
      (o.prototype.filterSlides = o.prototype.slickFilter =
        function (e) {
          null !== e &&
            ((this.$slidesCache = this.$slides),
            this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.filter(e).appendTo(this.$slideTrack),
            this.reinit());
        }),
      (o.prototype.focusHandler = function () {
        var n = this;
        n.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (e) {
            e.stopImmediatePropagation();
            var t = u(this);
            setTimeout(function () {
              n.options.pauseOnFocus &&
                ((n.focussed = t.is(":focus")), n.autoPlay());
            }, 0);
          });
      }),
      (o.prototype.getCurrent = o.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide;
        }),
      (o.prototype.getDotCount = function () {
        var e = this,
          t = 0,
          n = 0,
          i = 0;
        if (!0 === e.options.infinite)
          if (e.slideCount <= e.options.slidesToShow) ++i;
          else
            for (; t < e.slideCount; )
              ++i,
                (t = n + e.options.slidesToScroll),
                (n +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                    ? e.options.slidesToScroll
                    : e.options.slidesToShow);
        else if (!0 === e.options.centerMode) i = e.slideCount;
        else if (e.options.asNavFor)
          for (; t < e.slideCount; )
            ++i,
              (t = n + e.options.slidesToScroll),
              (n +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        else
          i =
            1 +
            Math.ceil(
              (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
            );
        return i - 1;
      }),
      (o.prototype.getLeft = function (e) {
        var t,
          n,
          i = this,
          r = 0;
        return (
          (i.slideOffset = 0),
          (t = i.$slides.first().outerHeight(!0)),
          !0 === i.options.infinite
            ? (i.slideCount > i.options.slidesToShow &&
                ((i.slideOffset = i.slideWidth * i.options.slidesToShow * -1),
                (n = -1),
                !0 === i.options.vertical &&
                  !0 === i.options.centerMode &&
                  (2 === i.options.slidesToShow
                    ? (n = -1.5)
                    : 1 === i.options.slidesToShow && (n = -2)),
                (r = t * i.options.slidesToShow * n)),
              i.slideCount % i.options.slidesToScroll != 0 &&
                e + i.options.slidesToScroll > i.slideCount &&
                i.slideCount > i.options.slidesToShow &&
                (r =
                  e > i.slideCount
                    ? ((i.slideOffset =
                        (i.options.slidesToShow - (e - i.slideCount)) *
                        i.slideWidth *
                        -1),
                      (i.options.slidesToShow - (e - i.slideCount)) * t * -1)
                    : ((i.slideOffset =
                        (i.slideCount % i.options.slidesToScroll) *
                        i.slideWidth *
                        -1),
                      (i.slideCount % i.options.slidesToScroll) * t * -1)))
            : e + i.options.slidesToShow > i.slideCount &&
              ((i.slideOffset =
                (e + i.options.slidesToShow - i.slideCount) * i.slideWidth),
              (r = (e + i.options.slidesToShow - i.slideCount) * t)),
          i.slideCount <= i.options.slidesToShow && (r = i.slideOffset = 0),
          !0 === i.options.centerMode && i.slideCount <= i.options.slidesToShow
            ? (i.slideOffset =
                (i.slideWidth * Math.floor(i.options.slidesToShow)) / 2 -
                (i.slideWidth * i.slideCount) / 2)
            : !0 === i.options.centerMode && !0 === i.options.infinite
            ? (i.slideOffset +=
                i.slideWidth * Math.floor(i.options.slidesToShow / 2) -
                i.slideWidth)
            : !0 === i.options.centerMode &&
              ((i.slideOffset = 0),
              (i.slideOffset +=
                i.slideWidth * Math.floor(i.options.slidesToShow / 2))),
          (n =
            !1 === i.options.vertical
              ? e * i.slideWidth * -1 + i.slideOffset
              : e * t * -1 + r),
          !0 === i.options.variableWidth &&
            ((t =
              i.slideCount <= i.options.slidesToShow ||
              !1 === i.options.infinite
                ? i.$slideTrack.children(".slick-slide").eq(e)
                : i.$slideTrack
                    .children(".slick-slide")
                    .eq(e + i.options.slidesToShow)),
            (n =
              !0 === i.options.rtl
                ? t[0]
                  ? -1 * (i.$slideTrack.width() - t[0].offsetLeft - t.width())
                  : 0
                : t[0]
                ? -1 * t[0].offsetLeft
                : 0),
            !0 === i.options.centerMode &&
              ((t =
                i.slideCount <= i.options.slidesToShow ||
                !1 === i.options.infinite
                  ? i.$slideTrack.children(".slick-slide").eq(e)
                  : i.$slideTrack
                      .children(".slick-slide")
                      .eq(e + i.options.slidesToShow + 1)),
              (n =
                !0 === i.options.rtl
                  ? t[0]
                    ? -1 * (i.$slideTrack.width() - t[0].offsetLeft - t.width())
                    : 0
                  : t[0]
                  ? -1 * t[0].offsetLeft
                  : 0),
              (n += (i.$list.width() - t.outerWidth()) / 2))),
          n
        );
      }),
      (o.prototype.getOption = o.prototype.slickGetOption =
        function (e) {
          return this.options[e];
        }),
      (o.prototype.getNavigableIndexes = function () {
        for (
          var e = this,
            t = 0,
            n = 0,
            i = [],
            r =
              !1 === e.options.infinite
                ? e.slideCount
                : ((t = -1 * e.options.slidesToScroll),
                  (n = -1 * e.options.slidesToScroll),
                  2 * e.slideCount);
          t < r;

        )
          i.push(t),
            (t = n + e.options.slidesToScroll),
            (n +=
              e.options.slidesToScroll <= e.options.slidesToShow
                ? e.options.slidesToScroll
                : e.options.slidesToShow);
        return i;
      }),
      (o.prototype.getSlick = function () {
        return this;
      }),
      (o.prototype.getSlideCount = function () {
        var n,
          i = this,
          r =
            !0 === i.options.centerMode
              ? i.slideWidth * Math.floor(i.options.slidesToShow / 2)
              : 0;
        return !0 === i.options.swipeToSlide
          ? (i.$slideTrack.find(".slick-slide").each(function (e, t) {
              if (t.offsetLeft - r + u(t).outerWidth() / 2 > -1 * i.swipeLeft)
                return (n = t), !1;
            }),
            Math.abs(u(n).attr("data-slick-index") - i.currentSlide) || 1)
          : i.options.slidesToScroll;
      }),
      (o.prototype.goTo = o.prototype.slickGoTo =
        function (e, t) {
          this.changeSlide(
            { data: { message: "index", index: parseInt(e) } },
            t
          );
        }),
      (o.prototype.init = function (e) {
        var t = this;
        u(t.$slider).hasClass("slick-initialized") ||
          (u(t.$slider).addClass("slick-initialized"),
          t.buildRows(),
          t.buildOut(),
          t.setProps(),
          t.startLoad(),
          t.loadSlider(),
          t.initializeEvents(),
          t.updateArrows(),
          t.updateDots(),
          t.checkResponsive(!0),
          t.focusHandler()),
          e && t.$slider.trigger("init", [t]),
          !0 === t.options.accessibility && t.initADA(),
          t.options.autoplay && ((t.paused = !1), t.autoPlay());
      }),
      (o.prototype.initADA = function () {
        var n = this,
          i = Math.ceil(n.slideCount / n.options.slidesToShow),
          r = n.getNavigableIndexes().filter(function (e) {
            return 0 <= e && e < n.slideCount;
          });
        n.$slides
          .add(n.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          null !== n.$dots &&
            (n.$slides
              .not(n.$slideTrack.find(".slick-cloned"))
              .each(function (e) {
                var t = r.indexOf(e);
                u(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + n.instanceUid + e,
                  tabindex: -1,
                }),
                  -1 !== t &&
                    u(this).attr({
                      "aria-describedby":
                        "slick-slide-control" + n.instanceUid + t,
                    });
              }),
            n.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (e) {
                var t = r[e];
                u(this).attr({ role: "presentation" }),
                  u(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + n.instanceUid + e,
                      "aria-controls": "slick-slide" + n.instanceUid + t,
                      "aria-label": e + 1 + " of " + i,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(n.currentSlide)
              .find("button")
              .attr({ "aria-selected": "true", tabindex: "0" })
              .end());
        for (var e = n.currentSlide, t = e + n.options.slidesToShow; e < t; e++)
          n.$slides.eq(e).attr("tabindex", 0);
        n.activateADA();
      }),
      (o.prototype.initArrowEvents = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, e.changeSlide),
          e.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow.on("keydown.slick", e.keyHandler),
            e.$nextArrow.on("keydown.slick", e.keyHandler)));
      }),
      (o.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots &&
          (u("li", e.$dots).on(
            "click.slick",
            { message: "index" },
            e.changeSlide
          ),
          !0 === e.options.accessibility &&
            e.$dots.on("keydown.slick", e.keyHandler)),
          !0 === e.options.dots &&
            !0 === e.options.pauseOnDotsHover &&
            u("li", e.$dots)
              .on("mouseenter.slick", u.proxy(e.interrupt, e, !0))
              .on("mouseleave.slick", u.proxy(e.interrupt, e, !1));
      }),
      (o.prototype.initSlideEvents = function () {
        this.options.pauseOnHover &&
          (this.$list.on("mouseenter.slick", u.proxy(this.interrupt, this, !0)),
          this.$list.on("mouseleave.slick", u.proxy(this.interrupt, this, !1)));
      }),
      (o.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(),
          e.initDotEvents(),
          e.initSlideEvents(),
          e.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on("click.slick", e.clickHandler),
          u(document).on(e.visibilityChange, u.proxy(e.visibility, e)),
          !0 === e.options.accessibility &&
            e.$list.on("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().on("click.slick", e.selectHandler),
          u(window).on(
            "orientationchange.slick.slick-" + e.instanceUid,
            u.proxy(e.orientationChange, e)
          ),
          u(window).on(
            "resize.slick.slick-" + e.instanceUid,
            u.proxy(e.resize, e)
          ),
          u("[draggable!=true]", e.$slideTrack).on(
            "dragstart",
            e.preventDefault
          ),
          u(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
          u(e.setPosition);
      }),
      (o.prototype.initUI = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow.show(), this.$nextArrow.show()),
          !0 === this.options.dots &&
            this.slideCount > this.options.slidesToShow &&
            this.$dots.show();
      }),
      (o.prototype.keyHandler = function (e) {
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === e.keyCode && !0 === this.options.accessibility
            ? this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "next" : "previous",
                },
              })
            : 39 === e.keyCode &&
              !0 === this.options.accessibility &&
              this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "previous" : "next",
                },
              }));
      }),
      (o.prototype.lazyLoad = function () {
        function e(e) {
          u("img[data-lazy]", e).each(function () {
            var e = u(this),
              t = u(this).attr("data-lazy"),
              n = u(this).attr("data-srcset"),
              i = u(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
              r = document.createElement("img");
            (r.onload = function () {
              e.animate({ opacity: 0 }, 100, function () {
                n && (e.attr("srcset", n), i && e.attr("sizes", i)),
                  e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                    e.removeAttr(
                      "data-lazy data-srcset data-sizes"
                    ).removeClass("slick-loading");
                  }),
                  o.$slider.trigger("lazyLoaded", [o, e, t]);
              });
            }),
              (r.onerror = function () {
                e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  o.$slider.trigger("lazyLoadError", [o, e, t]);
              }),
              (r.src = t);
          });
        }
        var t,
          n,
          i,
          o = this;
        if (
          (!0 === o.options.centerMode
            ? (i =
                !0 === o.options.infinite
                  ? (n = o.currentSlide + (o.options.slidesToShow / 2 + 1)) +
                    o.options.slidesToShow +
                    2
                  : ((n = Math.max(
                      0,
                      o.currentSlide - (o.options.slidesToShow / 2 + 1)
                    )),
                    o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide))
            : ((n = o.options.infinite
                ? o.options.slidesToShow + o.currentSlide
                : o.currentSlide),
              (i = Math.ceil(n + o.options.slidesToShow)),
              !0 === o.options.fade &&
                (0 < n && n--, i <= o.slideCount && i++)),
          (t = o.$slider.find(".slick-slide").slice(n, i)),
          "anticipated" === o.options.lazyLoad)
        )
          for (
            var r = n - 1, s = i, a = o.$slider.find(".slick-slide"), l = 0;
            l < o.options.slidesToScroll;
            l++
          )
            r < 0 && (r = o.slideCount - 1),
              (t = (t = t.add(a.eq(r))).add(a.eq(s))),
              r--,
              s++;
        e(t),
          o.slideCount <= o.options.slidesToShow
            ? e(o.$slider.find(".slick-slide"))
            : o.currentSlide >= o.slideCount - o.options.slidesToShow
            ? e(
                o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)
              )
            : 0 === o.currentSlide &&
              e(
                o.$slider
                  .find(".slick-cloned")
                  .slice(-1 * o.options.slidesToShow)
              );
      }),
      (o.prototype.loadSlider = function () {
        this.setPosition(),
          this.$slideTrack.css({ opacity: 1 }),
          this.$slider.removeClass("slick-loading"),
          this.initUI(),
          "progressive" === this.options.lazyLoad && this.progressiveLazyLoad();
      }),
      (o.prototype.next = o.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: "next" } });
        }),
      (o.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (o.prototype.pause = o.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0);
        }),
      (o.prototype.play = o.prototype.slickPlay =
        function () {
          this.autoPlay(),
            (this.options.autoplay = !0),
            (this.paused = !1),
            (this.focussed = !1),
            (this.interrupted = !1);
        }),
      (o.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked ||
          (t.$slider.trigger("afterChange", [t, e]),
          (t.animating = !1),
          t.slideCount > t.options.slidesToShow && t.setPosition(),
          (t.swipeLeft = null),
          t.options.autoplay && t.autoPlay(),
          !0 === t.options.accessibility &&
            (t.initADA(),
            t.options.focusOnChange &&
              u(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (o.prototype.prev = o.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: "previous" } });
        }),
      (o.prototype.preventDefault = function (e) {
        e.preventDefault();
      }),
      (o.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t,
          n,
          i,
          r,
          o = this,
          s = u("img[data-lazy]", o.$slider);
        s.length
          ? ((t = s.first()),
            (n = t.attr("data-lazy")),
            (i = t.attr("data-srcset")),
            (r = t.attr("data-sizes") || o.$slider.attr("data-sizes")),
            ((s = document.createElement("img")).onload = function () {
              i && (t.attr("srcset", i), r && t.attr("sizes", r)),
                t
                  .attr("src", n)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === o.options.adaptiveHeight && o.setPosition(),
                o.$slider.trigger("lazyLoaded", [o, t, n]),
                o.progressiveLazyLoad();
            }),
            (s.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    o.progressiveLazyLoad(e + 1);
                  }, 500)
                : (t
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  o.$slider.trigger("lazyLoadError", [o, t, n]),
                  o.progressiveLazyLoad());
            }),
            (s.src = n))
          : o.$slider.trigger("allImagesLoaded", [o]);
      }),
      (o.prototype.refresh = function (e) {
        var t = this,
          n = t.slideCount - t.options.slidesToShow;
        !t.options.infinite && t.currentSlide > n && (t.currentSlide = n),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          (n = t.currentSlide),
          t.destroy(!0),
          u.extend(t, t.initials, { currentSlide: n }),
          t.init(),
          e || t.changeSlide({ data: { message: "index", index: n } }, !1);
      }),
      (o.prototype.registerBreakpoints = function () {
        var e,
          t,
          n,
          i = this,
          r = i.options.responsive || null;
        if ("array" === u.type(r) && r.length) {
          for (e in ((i.respondTo = i.options.respondTo || "window"), r))
            if (((n = i.breakpoints.length - 1), r.hasOwnProperty(e))) {
              for (t = r[e].breakpoint; 0 <= n; )
                i.breakpoints[n] &&
                  i.breakpoints[n] === t &&
                  i.breakpoints.splice(n, 1),
                  n--;
              i.breakpoints.push(t), (i.breakpointSettings[t] = r[e].settings);
            }
          i.breakpoints.sort(function (e, t) {
            return i.options.mobileFirst ? e - t : t - e;
          });
        }
      }),
      (o.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            0 !== e.currentSlide &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (o.prototype.resize = function () {
        var e = this;
        u(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = u(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (o.prototype.removeSlide = o.prototype.slickRemove =
        function (e, t, n) {
          var i = this;
          if (
            ((e =
              "boolean" == typeof e
                ? !0 === (t = e)
                  ? 0
                  : i.slideCount - 1
                : !0 === t
                ? --e
                : e),
            i.slideCount < 1 || e < 0 || e > i.slideCount - 1)
          )
            return !1;
          i.unload(),
            (!0 === n
              ? i.$slideTrack.children()
              : i.$slideTrack.children(this.options.slide).eq(e)
            ).remove(),
            (i.$slides = i.$slideTrack.children(this.options.slide)),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.append(i.$slides),
            (i.$slidesCache = i.$slides),
            i.reinit();
        }),
      (o.prototype.setCSS = function (e) {
        var t,
          n,
          i = this,
          r = {};
        !0 === i.options.rtl && (e = -e),
          (t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px"),
          (n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px"),
          (r[i.positionProp] = e),
          !1 !== i.transformsEnabled &&
            (!(r = {}) === i.cssTransitions
              ? (r[i.animType] = "translate(" + t + ", " + n + ")")
              : (r[i.animType] = "translate3d(" + t + ", " + n + ", 0px)")),
          i.$slideTrack.css(r);
      }),
      (o.prototype.setDimensions = function () {
        var e = this,
          t =
            (!1 === e.options.vertical
              ? !0 === e.options.centerMode &&
                e.$list.css({ padding: "0px " + e.options.centerPadding })
              : (e.$list.height(
                  e.$slides.first().outerHeight(!0) * e.options.slidesToShow
                ),
                !0 === e.options.centerMode &&
                  e.$list.css({ padding: e.options.centerPadding + " 0px" })),
            (e.listWidth = e.$list.width()),
            (e.listHeight = e.$list.height()),
            !1 === e.options.vertical && !1 === e.options.variableWidth
              ? ((e.slideWidth = Math.ceil(
                  e.listWidth / e.options.slidesToShow
                )),
                e.$slideTrack.width(
                  Math.ceil(
                    e.slideWidth * e.$slideTrack.children(".slick-slide").length
                  )
                ))
              : !0 === e.options.variableWidth
              ? e.$slideTrack.width(5e3 * e.slideCount)
              : ((e.slideWidth = Math.ceil(e.listWidth)),
                e.$slideTrack.height(
                  Math.ceil(
                    e.$slides.first().outerHeight(!0) *
                      e.$slideTrack.children(".slick-slide").length
                  )
                )),
            e.$slides.first().outerWidth(!0) - e.$slides.first().width());
        !1 === e.options.variableWidth &&
          e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
      }),
      (o.prototype.setFade = function () {
        var n,
          i = this;
        i.$slides.each(function (e, t) {
          (n = i.slideWidth * e * -1),
            !0 === i.options.rtl
              ? u(t).css({
                  position: "relative",
                  right: n,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                })
              : u(t).css({
                  position: "relative",
                  left: n,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          i.$slides
            .eq(i.currentSlide)
            .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
      }),
      (o.prototype.setHeight = function () {
        var e;
        1 === this.options.slidesToShow &&
          !0 === this.options.adaptiveHeight &&
          !1 === this.options.vertical &&
          ((e = this.$slides.eq(this.currentSlide).outerHeight(!0)),
          this.$list.css("height", e));
      }),
      (o.prototype.setOption = o.prototype.slickSetOption =
        function () {
          var e,
            t,
            n,
            i,
            r,
            o = this,
            s = !1;
          if (
            ("object" === u.type(arguments[0])
              ? ((n = arguments[0]), (s = arguments[1]), (r = "multiple"))
              : "string" === u.type(arguments[0]) &&
                ((n = arguments[0]),
                (i = arguments[1]),
                (s = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === u.type(arguments[1])
                  ? (r = "responsive")
                  : void 0 !== arguments[1] && (r = "single")),
            "single" === r)
          )
            o.options[n] = i;
          else if ("multiple" === r)
            u.each(n, function (e, t) {
              o.options[e] = t;
            });
          else if ("responsive" === r)
            for (t in i)
              if ("array" !== u.type(o.options.responsive))
                o.options.responsive = [i[t]];
              else {
                for (e = o.options.responsive.length - 1; 0 <= e; )
                  o.options.responsive[e].breakpoint === i[t].breakpoint &&
                    o.options.responsive.splice(e, 1),
                    e--;
                o.options.responsive.push(i[t]);
              }
          s && (o.unload(), o.reinit());
        }),
      (o.prototype.setPosition = function () {
        this.setDimensions(),
          this.setHeight(),
          !1 === this.options.fade
            ? this.setCSS(this.getLeft(this.currentSlide))
            : this.setFade(),
          this.$slider.trigger("setPosition", [this]);
      }),
      (o.prototype.setProps = function () {
        var e = this,
          t = document.body.style;
        (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
          "top" === e.positionProp
            ? e.$slider.addClass("slick-vertical")
            : e.$slider.removeClass("slick-vertical"),
          (void 0 === t.WebkitTransition &&
            void 0 === t.MozTransition &&
            void 0 === t.msTransition) ||
            (!0 === e.options.useCSS && (e.cssTransitions = !0)),
          e.options.fade &&
            ("number" == typeof e.options.zIndex
              ? e.options.zIndex < 3 && (e.options.zIndex = 3)
              : (e.options.zIndex = e.defaults.zIndex)),
          void 0 !== t.OTransform &&
            ((e.animType = "OTransform"),
            (e.transformType = "-o-transform"),
            (e.transitionType = "OTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.MozTransform &&
            ((e.animType = "MozTransform"),
            (e.transformType = "-moz-transform"),
            (e.transitionType = "MozTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.MozPerspective &&
              (e.animType = !1)),
          void 0 !== t.webkitTransform &&
            ((e.animType = "webkitTransform"),
            (e.transformType = "-webkit-transform"),
            (e.transitionType = "webkitTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.msTransform &&
            ((e.animType = "msTransform"),
            (e.transformType = "-ms-transform"),
            (e.transitionType = "msTransition"),
            void 0 === t.msTransform && (e.animType = !1)),
          void 0 !== t.transform &&
            !1 !== e.animType &&
            ((e.animType = "transform"),
            (e.transformType = "transform"),
            (e.transitionType = "transition")),
          (e.transformsEnabled =
            e.options.useTransform && null !== e.animType && !1 !== e.animType);
      }),
      (o.prototype.setSlideClasses = function (e) {
        var t,
          n,
          i,
          r = this,
          o = r.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true");
        r.$slides.eq(e).addClass("slick-current"),
          !0 === r.options.centerMode
            ? ((n = r.options.slidesToShow % 2 == 0 ? 1 : 0),
              (i = Math.floor(r.options.slidesToShow / 2)),
              !0 === r.options.infinite &&
                (i <= e && e <= r.slideCount - 1 - i
                  ? r.$slides
                      .slice(e - i + n, e + i + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((t = r.options.slidesToShow + e),
                    o
                      .slice(t - i + 1 + n, t + i + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === e
                  ? o
                      .eq(o.length - 1 - r.options.slidesToShow)
                      .addClass("slick-center")
                  : e === r.slideCount - 1 &&
                    o.eq(r.options.slidesToShow).addClass("slick-center")),
              r.$slides.eq(e).addClass("slick-center"))
            : 0 <= e && e <= r.slideCount - r.options.slidesToShow
            ? r.$slides
                .slice(e, e + r.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : o.length <= r.options.slidesToShow
            ? o.addClass("slick-active").attr("aria-hidden", "false")
            : ((n = r.slideCount % r.options.slidesToShow),
              (t = !0 === r.options.infinite ? r.options.slidesToShow + e : e),
              (r.options.slidesToShow == r.options.slidesToScroll &&
              r.slideCount - e < r.options.slidesToShow
                ? o.slice(t - (r.options.slidesToShow - n), t + n)
                : o.slice(t, t + r.options.slidesToShow)
              )
                .addClass("slick-active")
                .attr("aria-hidden", "false")),
          ("ondemand" !== r.options.lazyLoad &&
            "anticipated" !== r.options.lazyLoad) ||
            r.lazyLoad();
      }),
      (o.prototype.setupInfinite = function () {
        var e,
          t,
          n,
          i = this;
        if (
          (!0 === i.options.fade && (i.options.centerMode = !1),
          !0 === i.options.infinite &&
            !1 === i.options.fade &&
            ((t = null), i.slideCount > i.options.slidesToShow))
        ) {
          for (
            n =
              !0 === i.options.centerMode
                ? i.options.slidesToShow + 1
                : i.options.slidesToShow,
              e = i.slideCount;
            e > i.slideCount - n;
            --e
          )
            u(i.$slides[(t = e - 1)])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - i.slideCount)
              .prependTo(i.$slideTrack)
              .addClass("slick-cloned");
          for (e = 0; e < n + i.slideCount; e += 1)
            (t = e),
              u(i.$slides[t])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", t + i.slideCount)
                .appendTo(i.$slideTrack)
                .addClass("slick-cloned");
          i.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              u(this).attr("id", "");
            });
        }
      }),
      (o.prototype.interrupt = function (e) {
        e || this.autoPlay(), (this.interrupted = e);
      }),
      (o.prototype.selectHandler = function (e) {
        (e = u(e.target).is(".slick-slide")
          ? u(e.target)
          : u(e.target).parents(".slick-slide")),
          (e = (e = parseInt(e.attr("data-slick-index"))) || 0);
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(e, !1, !0)
          : this.slideHandler(e);
      }),
      (o.prototype.slideHandler = function (e, t, n) {
        var i,
          r,
          o,
          s = this;
        if (
          ((t = t || !1),
          !(
            (!0 === s.animating && !0 === s.options.waitForAnimate) ||
            (!0 === s.options.fade && s.currentSlide === e)
          ))
        )
          if (
            (!1 === t && s.asNavFor(e),
            (i = e),
            (t = s.getLeft(i)),
            (o = s.getLeft(s.currentSlide)),
            (s.currentLeft = null === s.swipeLeft ? o : s.swipeLeft),
            !1 === s.options.infinite &&
              !1 === s.options.centerMode &&
              (e < 0 || e > s.getDotCount() * s.options.slidesToScroll))
          )
            !1 === s.options.fade &&
              ((i = s.currentSlide),
              !0 !== n
                ? s.animateSlide(o, function () {
                    s.postSlide(i);
                  })
                : s.postSlide(i));
          else if (
            !1 === s.options.infinite &&
            !0 === s.options.centerMode &&
            (e < 0 || e > s.slideCount - s.options.slidesToScroll)
          )
            !1 === s.options.fade &&
              ((i = s.currentSlide),
              !0 !== n
                ? s.animateSlide(o, function () {
                    s.postSlide(i);
                  })
                : s.postSlide(i));
          else {
            if (
              (s.options.autoplay && clearInterval(s.autoPlayTimer),
              (r =
                i < 0
                  ? s.slideCount % s.options.slidesToScroll != 0
                    ? s.slideCount - (s.slideCount % s.options.slidesToScroll)
                    : s.slideCount + i
                  : i >= s.slideCount
                  ? s.slideCount % s.options.slidesToScroll != 0
                    ? 0
                    : i - s.slideCount
                  : i),
              (s.animating = !0),
              s.$slider.trigger("beforeChange", [s, s.currentSlide, r]),
              (e = s.currentSlide),
              (s.currentSlide = r),
              s.setSlideClasses(s.currentSlide),
              s.options.asNavFor &&
                (o = (o = s.getNavTarget()).slick("getSlick")).slideCount <=
                  o.options.slidesToShow &&
                o.setSlideClasses(s.currentSlide),
              s.updateDots(),
              s.updateArrows(),
              !0 === s.options.fade)
            )
              return (
                !0 !== n
                  ? (s.fadeSlideOut(e),
                    s.fadeSlide(r, function () {
                      s.postSlide(r);
                    }))
                  : s.postSlide(r),
                void s.animateHeight()
              );
            !0 !== n
              ? s.animateSlide(t, function () {
                  s.postSlide(r);
                })
              : s.postSlide(r);
          }
      }),
      (o.prototype.startLoad = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.hide(), e.$nextArrow.hide()),
          !0 === e.options.dots &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.hide(),
          e.$slider.addClass("slick-loading");
      }),
      (o.prototype.swipeDirection = function () {
        var e = this.touchObject.startX - this.touchObject.curX,
          t = this.touchObject.startY - this.touchObject.curY,
          t = Math.atan2(t, e);
        return ((e =
          (e = Math.round((180 * t) / Math.PI)) < 0 ? 360 - Math.abs(e) : e) <=
          45 &&
          0 <= e) ||
          (e <= 360 && 315 <= e)
          ? !1 === this.options.rtl
            ? "left"
            : "right"
          : 135 <= e && e <= 225
          ? !1 === this.options.rtl
            ? "right"
            : "left"
          : !0 === this.options.verticalSwiping
          ? 35 <= e && e <= 135
            ? "down"
            : "up"
          : "vertical";
      }),
      (o.prototype.swipeEnd = function (e) {
        var t,
          n,
          i = this;
        if (((i.dragging = !1), (i.swiping = !1), i.scrolling))
          return (i.scrolling = !1);
        if (
          ((i.interrupted = !1),
          (i.shouldClick = !(10 < i.touchObject.swipeLength)),
          void 0 === i.touchObject.curX)
        )
          return !1;
        if (
          (!0 === i.touchObject.edgeHit &&
            i.$slider.trigger("edge", [i, i.swipeDirection()]),
          i.touchObject.swipeLength >= i.touchObject.minSwipe)
        ) {
          switch ((n = i.swipeDirection())) {
            case "left":
            case "down":
              (t = i.options.swipeToSlide
                ? i.checkNavigable(i.currentSlide + i.getSlideCount())
                : i.currentSlide + i.getSlideCount()),
                (i.currentDirection = 0);
              break;
            case "right":
            case "up":
              (t = i.options.swipeToSlide
                ? i.checkNavigable(i.currentSlide - i.getSlideCount())
                : i.currentSlide - i.getSlideCount()),
                (i.currentDirection = 1);
          }
          "vertical" != n &&
            (i.slideHandler(t),
            (i.touchObject = {}),
            i.$slider.trigger("swipe", [i, n]));
        } else
          i.touchObject.startX !== i.touchObject.curX &&
            (i.slideHandler(i.currentSlide), (i.touchObject = {}));
      }),
      (o.prototype.swipeHandler = function (e) {
        var t = this;
        if (
          !(
            !1 === t.options.swipe ||
            ("ontouchend" in document && !1 === t.options.swipe) ||
            (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))
          )
        )
          switch (
            ((t.touchObject.fingerCount =
              e.originalEvent && void 0 !== e.originalEvent.touches
                ? e.originalEvent.touches.length
                : 1),
            (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
            !0 === t.options.verticalSwiping &&
              (t.touchObject.minSwipe =
                t.listHeight / t.options.touchThreshold),
            e.data.action)
          ) {
            case "start":
              t.swipeStart(e);
              break;
            case "move":
              t.swipeMove(e);
              break;
            case "end":
              t.swipeEnd(e);
          }
      }),
      (o.prototype.swipeMove = function (e) {
        var t,
          n,
          i = this,
          r = void 0 !== e.originalEvent ? e.originalEvent.touches : null;
        return (
          !(!i.dragging || i.scrolling || (r && 1 !== r.length)) &&
          ((t = i.getLeft(i.currentSlide)),
          (i.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX),
          (i.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY),
          (i.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(i.touchObject.curX - i.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(i.touchObject.curY - i.touchObject.startY, 2))
          )),
          !i.options.verticalSwiping && !i.swiping && 4 < r
            ? !(i.scrolling = !0)
            : (!0 === i.options.verticalSwiping &&
                (i.touchObject.swipeLength = r),
              (r = i.swipeDirection()),
              void 0 !== e.originalEvent &&
                4 < i.touchObject.swipeLength &&
                ((i.swiping = !0), e.preventDefault()),
              (e =
                (!1 === i.options.rtl ? 1 : -1) *
                (i.touchObject.curX > i.touchObject.startX ? 1 : -1)),
              !0 === i.options.verticalSwiping &&
                (e = i.touchObject.curY > i.touchObject.startY ? 1 : -1),
              (n = i.touchObject.swipeLength),
              (i.touchObject.edgeHit = !1) === i.options.infinite &&
                ((0 === i.currentSlide && "right" === r) ||
                  (i.currentSlide >= i.getDotCount() && "left" === r)) &&
                ((n = i.touchObject.swipeLength * i.options.edgeFriction),
                (i.touchObject.edgeHit = !0)),
              !1 === i.options.vertical
                ? (i.swipeLeft = t + n * e)
                : (i.swipeLeft = t + n * (i.$list.height() / i.listWidth) * e),
              !0 === i.options.verticalSwiping && (i.swipeLeft = t + n * e),
              !0 !== i.options.fade &&
                !1 !== i.options.touchMove &&
                (!0 === i.animating
                  ? ((i.swipeLeft = null), !1)
                  : void i.setCSS(i.swipeLeft))))
        );
      }),
      (o.prototype.swipeStart = function (e) {
        var t,
          n = this;
        if (
          ((n.interrupted = !0),
          1 !== n.touchObject.fingerCount ||
            n.slideCount <= n.options.slidesToShow)
        )
          return !(n.touchObject = {});
        void 0 !== e.originalEvent &&
          void 0 !== e.originalEvent.touches &&
          (t = e.originalEvent.touches[0]),
          (n.touchObject.startX = n.touchObject.curX =
            void 0 !== t ? t.pageX : e.clientX),
          (n.touchObject.startY = n.touchObject.curY =
            void 0 !== t ? t.pageY : e.clientY),
          (n.dragging = !0);
      }),
      (o.prototype.unfilterSlides = o.prototype.slickUnfilter =
        function () {
          null !== this.$slidesCache &&
            (this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.appendTo(this.$slideTrack),
            this.reinit());
        }),
      (o.prototype.unload = function () {
        var e = this;
        u(".slick-cloned", e.$slider).remove(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.htmlExpr.test(e.options.prevArrow) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.htmlExpr.test(e.options.nextArrow) &&
            e.$nextArrow.remove(),
          e.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (o.prototype.unslick = function (e) {
        this.$slider.trigger("unslick", [this, e]), this.destroy();
      }),
      (o.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            !e.options.infinite &&
            (e.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === e.currentSlide
              ? (e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                  !1 === e.options.centerMode) ||
                  (e.currentSlide >= e.slideCount - 1 &&
                    !0 === e.options.centerMode)) &&
                (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (o.prototype.updateDots = function () {
        null !== this.$dots &&
          (this.$dots.find("li").removeClass("slick-active").end(),
          this.$dots
            .find("li")
            .eq(Math.floor(this.currentSlide / this.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (o.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1));
      }),
      (u.fn.slick = function () {
        for (
          var e,
            t = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            i = this.length,
            r = 0;
          r < i;
          r++
        )
          if (
            ("object" == typeof t || void 0 === t
              ? (this[r].slick = new o(this[r], t))
              : (e = this[r].slick[t].apply(this[r].slick, n)),
            void 0 !== e)
          )
            return e;
        return this;
      });
  }),
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipe = t());
  })(this, function () {
    "use strict";
    return function (f, N, t, j) {
      var p = {
          features: null,
          bind: function (e, t, n, i) {
            var r = (i ? "remove" : "add") + "EventListener";
            t = t.split(" ");
            for (var o = 0; o < t.length; o++) t[o] && e[r](t[o], n, !1);
          },
          isArray: function (e) {
            return e instanceof Array;
          },
          createEl: function (e, t) {
            t = document.createElement(t || "div");
            return e && (t.className = e), t;
          },
          getScrollY: function () {
            var e = window.pageYOffset;
            return void 0 !== e ? e : document.documentElement.scrollTop;
          },
          unbind: function (e, t, n) {
            p.bind(e, t, n, !0);
          },
          removeClass: function (e, t) {
            t = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className
              .replace(t, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
          },
          addClass: function (e, t) {
            p.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
          },
          hasClass: function (e, t) {
            return (
              e.className &&
              new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            );
          },
          getChildByClass: function (e, t) {
            for (var n = e.firstChild; n; ) {
              if (p.hasClass(n, t)) return n;
              n = n.nextSibling;
            }
          },
          arraySearch: function (e, t, n) {
            for (var i = e.length; i--; ) if (e[i][n] === t) return i;
            return -1;
          },
          extend: function (e, t, n) {
            for (var i in t)
              if (t.hasOwnProperty(i)) {
                if (n && e.hasOwnProperty(i)) continue;
                e[i] = t[i];
              }
          },
          easing: {
            sine: {
              out: function (e) {
                return Math.sin(e * (Math.PI / 2));
              },
              inOut: function (e) {
                return -(Math.cos(Math.PI * e) - 1) / 2;
              },
            },
            cubic: {
              out: function (e) {
                return --e * e * e + 1;
              },
            },
          },
          detectFeatures: function () {
            if (p.features) return p.features;
            var e,
              t,
              n = p.createEl().style,
              i = "",
              r = {};
            (r.oldIE = document.all && !document.addEventListener),
              (r.touch = "ontouchstart" in window),
              window.requestAnimationFrame &&
                ((r.raf = window.requestAnimationFrame),
                (r.caf = window.cancelAnimationFrame)),
              (r.pointerEvent =
                navigator.pointerEnabled || navigator.msPointerEnabled),
              r.pointerEvent ||
                ((e = navigator.userAgent),
                /iP(hone|od)/.test(navigator.platform) &&
                  (t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) &&
                  0 < t.length &&
                  1 <= (t = parseInt(t[1], 10)) &&
                  t < 8 &&
                  (r.isOldIOSPhone = !0),
                (t = (t = e.match(/Android\s([0-9\.]*)/)) ? t[1] : 0),
                1 <= (t = parseFloat(t)) &&
                  (t < 4.4 && (r.isOldAndroid = !0), (r.androidVersion = t)),
                (r.isMobileOpera = /opera mini|opera mobi/i.test(e)));
            for (
              var o,
                s,
                a,
                l = ["transform", "perspective", "animationName"],
                u = ["", "webkit", "Moz", "ms", "O"],
                c = 0;
              c < 4;
              c++
            ) {
              for (var i = u[c], d = 0; d < 3; d++)
                (o = l[d]),
                  (s = i + (i ? o.charAt(0).toUpperCase() + o.slice(1) : o)),
                  !r[o] && s in n && (r[o] = s);
              i &&
                !r.raf &&
                ((i = i.toLowerCase()),
                (r.raf = window[i + "RequestAnimationFrame"]),
                r.raf &&
                  (r.caf =
                    window[i + "CancelAnimationFrame"] ||
                    window[i + "CancelRequestAnimationFrame"]));
            }
            return (
              r.raf ||
                ((a = 0),
                (r.raf = function (e) {
                  var t = new Date().getTime(),
                    n = Math.max(0, 16 - (t - a)),
                    i = window.setTimeout(function () {
                      e(t + n);
                    }, n);
                  return (a = t + n), i;
                }),
                (r.caf = function (e) {
                  clearTimeout(e);
                })),
              (r.svg =
                !!document.createElementNS &&
                !!document.createElementNS("http://www.w3.org/2000/svg", "svg")
                  .createSVGRect),
              (p.features = r)
            );
          },
        },
        h =
          (p.detectFeatures(),
          p.features.oldIE &&
            (p.bind = function (e, t, n, i) {
              t = t.split(" ");
              for (
                var r,
                  o = (i ? "detach" : "attach") + "Event",
                  s = function () {
                    n.handleEvent.call(n);
                  },
                  a = 0;
                a < t.length;
                a++
              )
                if ((r = t[a]))
                  if ("object" == typeof n && n.handleEvent) {
                    if (i) {
                      if (!n["oldIE" + r]) return !1;
                    } else n["oldIE" + r] = s;
                    e[o]("on" + r, n["oldIE" + r]);
                  } else e[o]("on" + r, n);
            }),
          this),
        $ = 25,
        m = {
          allowPanToNext: !0,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: !1,
          loop: !0,
          pinchToClose: !0,
          closeOnScroll: !0,
          closeOnVerticalDrag: !0,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: !1,
          focus: !0,
          escKey: !0,
          arrowKeys: !0,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          isClickableElement: function (e) {
            return "A" === e.tagName;
          },
          getDoubleTapZoom: function (e, t) {
            return e || t.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          maxSpreadZoom: 1.33,
          modal: !0,
          scaleMode: "fit",
        };
      p.extend(m, j);
      function e() {
        return { x: 0, y: 0 };
      }
      function B(e, t) {
        p.extend(h, t.publicMethods), He.push(e);
      }
      function G(e) {
        var t = P();
        return t - 1 < e ? e - t : e < 0 ? t + e : e;
      }
      function o(e, t) {
        return Ye[e] || (Ye[e] = []), Ye[e].push(t);
      }
      function q(e, t, n, i) {
        i === h.currItem.initialZoomLevel
          ? (n[e] = h.currItem.initialPosition[e])
          : ((n[e] = Qe(e, i)),
            n[e] > t.min[e]
              ? (n[e] = t.min[e])
              : n[e] < t.max[e] && (n[e] = t.max[e]));
      }
      function U(e) {
        var t = "";
        m.escKey && 27 === e.keyCode
          ? (t = "close")
          : m.arrowKeys &&
            (37 === e.keyCode
              ? (t = "prev")
              : 39 === e.keyCode && (t = "next")),
          !t ||
            e.ctrlKey ||
            e.altKey ||
            e.shiftKey ||
            e.metaKey ||
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            h[t]());
      }
      function V(e) {
        e && (Ae || xe || y || Ie) && (e.preventDefault(), e.stopPropagation());
      }
      function H() {
        h.setScrollOffset(0, p.getScrollY());
      }
      function z(e) {
        var t;
        ("mousedown" === e.type && 0 < e.button) ||
          (Qt
            ? e.preventDefault()
            : (ke && "mousedown" === e.type) ||
              (Ot(e, !0) && e.preventDefault(),
              T("pointerDown"),
              pe &&
                ((t = p.arraySearch(mt, e.pointerId, "id")) < 0 &&
                  (t = mt.length),
                (mt[t] = { x: e.pageX, y: e.pageY, id: e.pointerId })),
              (e = (t = $t(e)).length),
              (u = null),
              ut(),
              (l && 1 !== e) ||
                ((l = Le = !0),
                p.bind(window, ee, h),
                (Se = je = Fe = Ie = Oe = Ae = Ce = xe = !1),
                (Me = null),
                T("firstTouchStart", t),
                C(Ge, _),
                (Be.x = Be.y = 0),
                C(O, t[0]),
                C(ht, O),
                (gt.x = b.x * qe),
                (vt = [{ x: O.x, y: O.y }]),
                (we = be = S()),
                it(v, !0),
                kt(),
                Ct()),
              !c &&
                1 < e &&
                !y &&
                !Oe &&
                ((ne = v),
                (c = Ce = !(xe = !1)),
                (Be.y = Be.x = 0),
                C(Ge, _),
                C(A, t[0]),
                C(pt, t[1]),
                Pt(A, pt, Tt),
                (wt.x = Math.abs(Tt.x) - _.x),
                (wt.y = Math.abs(Tt.y) - _.y),
                (Re = It(A, pt)))));
      }
      function W(e) {
        var t;
        e.preventDefault(),
          pe &&
            -1 < (t = p.arraySearch(mt, e.pointerId, "id")) &&
            (((t = mt[t]).x = e.pageX), (t.y = e.pageY)),
          l &&
            ((t = $t(e)),
            Me || Ae || c
              ? (u = t)
              : R.x !== b.x * qe
              ? (Me = "h")
              : ((e = Math.abs(t[0].x - O.x) - Math.abs(t[0].y - O.y)),
                Math.abs(e) >= ft && ((Me = 0 < e ? "h" : "v"), (u = t))));
      }
      function Y(e) {
        if (a.isOldAndroid) {
          if (ke && "mouseup" === e.type) return;
          -1 < e.type.indexOf("touch") &&
            (clearTimeout(ke),
            (ke = setTimeout(function () {
              ke = 0;
            }, 600)));
        }
        var t;
        T("pointerUp"),
          Ot(e, !1) && e.preventDefault(),
          pe &&
            -1 < (o = p.arraySearch(mt, e.pointerId, "id")) &&
            ((t = mt.splice(o, 1)[0]),
            navigator.pointerEnabled
              ? (t.type = e.pointerType || "mouse")
              : ((t.type = { 4: "mouse", 2: "touch", 3: "pen" }[e.pointerType]),
                t.type || (t.type = e.pointerType || "mouse")));
        var n = (o = $t(e)).length;
        if (2 === (n = "mouseup" === e.type ? 0 : n)) return !(u = null);
        1 === n && C(ht, o[0]),
          0 !== n ||
            Me ||
            y ||
            (t ||
              ("mouseup" === e.type
                ? (t = { x: e.pageX, y: e.pageY, type: "mouse" })
                : e.changedTouches &&
                  e.changedTouches[0] &&
                  (t = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch",
                  })),
            T("touchRelease", e, t));
        var i,
          r,
          o = -1;
        if (
          (0 === n &&
            ((l = !1),
            p.unbind(window, ee, h),
            kt(),
            c ? (o = 0) : -1 !== bt && (o = S() - bt)),
          (bt = 1 === n ? S() : -1),
          (e = -1 !== o && o < 150 ? "zoom" : "swipe"),
          c &&
            n < 2 &&
            ((c = !1), 1 === n && (e = "zoomPointerUp"), T("zoomGestureEnded")),
          (u = null),
          Ae || xe || y || Ie)
        )
          if ((ut(), (Te = Te || qt()).calculateSwipeSpeed("x"), Ie))
            Lt() < m.verticalDragRange
              ? h.close()
              : ((i = _.y),
                (r = Ne),
                ct("verticalDrag", 0, 1, 300, p.easing.cubic.out, function (e) {
                  (_.y = (h.currItem.initialPosition.y - i) * e + i),
                    I((1 - r) * e + r),
                    k();
                }),
                T("onVerticalDrag", 1));
          else {
            if ((Oe || y) && 0 === n) {
              if (Vt(e, Te)) return;
              e = "zoomPointerUp";
            }
            if (!y)
              return "swipe" !== e
                ? void zt()
                : void (!Oe && v > h.currItem.fitRatio && Ut(Te));
          }
      }
      var X,
        Z,
        K,
        g,
        J,
        Q,
        ee,
        te,
        n,
        v,
        ne,
        ie,
        re,
        oe,
        se,
        s,
        ae,
        le,
        ue,
        ce,
        de,
        fe,
        pe,
        i,
        he,
        me,
        ge,
        ve,
        ye,
        _e,
        a,
        Ee,
        be,
        we,
        Te,
        Se,
        Ie,
        ke,
        l,
        Ce,
        xe,
        Ae,
        De,
        Oe,
        u,
        c,
        Re,
        d,
        Pe,
        y,
        Me,
        Le,
        Fe,
        Ne,
        je,
        $e,
        Be = e(),
        Ge = e(),
        _ = e(),
        E = {},
        qe = 0,
        Ue = {},
        b = e(),
        w = 0,
        Ve = !0,
        He = [],
        ze = {},
        We = !1,
        Ye = {},
        T = function (e) {
          var t = Ye[e];
          if (t) {
            var n = Array.prototype.slice.call(arguments);
            n.shift();
            for (var i = 0; i < t.length; i++) t[i].apply(h, n);
          }
        },
        S = function () {
          return new Date().getTime();
        },
        I = function (e) {
          (Ne = e), (h.bg.style.opacity = e * m.bgOpacity);
        },
        Xe = function (e, t, n, i, r) {
          (!We || (r && r !== h.currItem)) && (i /= (r || h.currItem).fitRatio),
            (e[fe] = ie + t + "px, " + n + "px" + re + " scale(" + i + ")");
        },
        k = function (e) {
          Pe &&
            (e &&
              (v > h.currItem.fitRatio
                ? We || (un(h.currItem, !1, !0), (We = !0))
                : We && (un(h.currItem), (We = !1))),
            Xe(Pe, _.x, _.y, v));
        },
        Ze = function (e) {
          e.container &&
            Xe(
              e.container.style,
              e.initialPosition.x,
              e.initialPosition.y,
              e.initialZoomLevel,
              e
            );
        },
        Ke = function (e, t) {
          t[fe] = ie + e + "px, 0px" + re;
        },
        Je = function (e, t) {
          var n;
          !m.loop &&
            t &&
            ((t = g + (b.x * qe - e) / b.x),
            (n = Math.round(e - R.x)),
            ((t < 0 && 0 < n) || (t >= P() - 1 && n < 0)) &&
              (e = R.x + n * m.mainScrollEndFriction)),
            (R.x = e),
            Ke(e, J);
        },
        Qe = function (e, t) {
          var n = wt[e] - Ue[e];
          return Ge[e] + Be[e] + n - (t / ne) * n;
        },
        C = function (e, t) {
          (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
        },
        et = function (e) {
          (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
        },
        tt = null,
        nt = function () {
          tt &&
            (p.unbind(document, "mousemove", nt),
            p.addClass(f, "pswp--has_mouse"),
            (m.mouseUsed = !0),
            T("mouseUsed")),
            (tt = setTimeout(function () {
              tt = null;
            }, 100));
        },
        it = function (e, t) {
          e = an(h.currItem, E, e);
          return t && (d = e), e;
        },
        rt = function (e) {
          return (e = e || h.currItem).initialZoomLevel;
        },
        ot = function (e) {
          return 0 < (e = e || h.currItem).w ? m.maxSpreadZoom : 1;
        },
        x = {},
        st = 0,
        at = function (e) {
          x[e] && (x[e].raf && me(x[e].raf), st--, delete x[e]);
        },
        lt = function (e) {
          x[e] && at(e), x[e] || (st++, (x[e] = {}));
        },
        ut = function () {
          for (var e in x) x.hasOwnProperty(e) && at(e);
        },
        ct = function (e, t, n, i, r, o, s) {
          function a() {
            if (x[e]) {
              if (((l = S() - u), i <= l)) return at(e), o(n), void (s && s());
              o((n - t) * r(l / i) + t), (x[e].raf = he(a));
            }
          }
          var l,
            u = S();
          lt(e);
          a();
        },
        j = {
          shout: T,
          listen: o,
          viewportSize: E,
          options: m,
          isMainScrollAnimating: function () {
            return y;
          },
          getZoomLevel: function () {
            return v;
          },
          getCurrentIndex: function () {
            return g;
          },
          isDragging: function () {
            return l;
          },
          isZooming: function () {
            return c;
          },
          setScrollOffset: function (e, t) {
            (Ue.x = e), (_e = Ue.y = t), T("updateScrollOffset", Ue);
          },
          applyZoomPan: function (e, t, n, i) {
            (_.x = t), (_.y = n), (v = e), k(i);
          },
          init: function () {
            if (!X && !Z) {
              (h.framework = p),
                (h.template = f),
                (h.bg = p.getChildByClass(f, "pswp__bg")),
                (ge = f.className),
                (X = !0),
                (a = p.detectFeatures()),
                (he = a.raf),
                (me = a.caf),
                (fe = a.transform),
                (ye = a.oldIE),
                (h.scrollWrap = p.getChildByClass(f, "pswp__scroll-wrap")),
                (h.container = p.getChildByClass(
                  h.scrollWrap,
                  "pswp__container"
                )),
                (J = h.container.style),
                (h.itemHolders = s =
                  [
                    { el: h.container.children[0], wrap: 0, index: -1 },
                    { el: h.container.children[1], wrap: 0, index: -1 },
                    { el: h.container.children[2], wrap: 0, index: -1 },
                  ]),
                (s[0].el.style.display = s[2].el.style.display = "none"),
                (function () {
                  var e;
                  if (fe)
                    return (
                      (e = a.perspective && !i),
                      (ie = "translate" + (e ? "3d(" : "(")),
                      (re = a.perspective ? ", 0px)" : ")")
                    );
                  (fe = "left"),
                    p.addClass(f, "pswp--ie"),
                    (Ke = function (e, t) {
                      t.left = e + "px";
                    }),
                    (Ze = function (e) {
                      var t = 1 < e.fitRatio ? 1 : e.fitRatio,
                        n = e.container.style,
                        i = t * e.w,
                        t = t * e.h;
                      (n.width = i + "px"),
                        (n.height = t + "px"),
                        (n.left = e.initialPosition.x + "px"),
                        (n.top = e.initialPosition.y + "px");
                    }),
                    (k = function () {
                      var e, t, n, i;
                      Pe &&
                        ((e = Pe),
                        (n =
                          (i = 1 < (t = h.currItem).fitRatio ? 1 : t.fitRatio) *
                          t.w),
                        (i = i * t.h),
                        (e.width = n + "px"),
                        (e.height = i + "px"),
                        (e.left = _.x + "px"),
                        (e.top = _.y + "px"));
                    });
                })(),
                (n = {
                  resize: h.updateSize,
                  orientationchange: function () {
                    clearTimeout(Ee),
                      (Ee = setTimeout(function () {
                        E.x !== h.scrollWrap.clientWidth && h.updateSize();
                      }, 500));
                  },
                  scroll: H,
                  keydown: U,
                  click: V,
                });
              var e,
                t = a.isOldIOSPhone || a.isOldAndroid || a.isMobileOpera;
              for (
                (a.animationName && a.transform && !t) ||
                  (m.showAnimationDuration = m.hideAnimationDuration = 0),
                  e = 0;
                e < He.length;
                e++
              )
                h["init" + He[e]]();
              N && (h.ui = new N(h, p)).init(),
                T("firstUpdate"),
                (g = g || m.index || 0),
                (isNaN(g) || g < 0 || g >= P()) && (g = 0),
                (h.currItem = en(g)),
                (a.isOldIOSPhone || a.isOldAndroid) && (Ve = !1),
                f.setAttribute("aria-hidden", "false"),
                m.modal &&
                  (Ve
                    ? (f.style.position = "fixed")
                    : ((f.style.position = "absolute"),
                      (f.style.top = p.getScrollY() + "px"))),
                void 0 === _e &&
                  (T("initialLayout"), (_e = ve = p.getScrollY()));
              t = "pswp--open ";
              for (
                m.mainClass && (t += m.mainClass + " "),
                  m.showHideOpacity && (t += "pswp--animate_opacity "),
                  t =
                    (t =
                      (t += i ? "pswp--touch" : "pswp--notouch") +
                      (a.animationName ? " pswp--css_animation" : "")) +
                    (a.svg ? " pswp--svg" : ""),
                  p.addClass(f, t),
                  h.updateSize(),
                  Q = -1,
                  w = null,
                  e = 0;
                e < 3;
                e++
              )
                Ke((e + Q) * b.x, s[e].el.style);
              ye || p.bind(h.scrollWrap, te, h),
                o("initialZoomInEnd", function () {
                  h.setContent(s[0], g - 1),
                    h.setContent(s[2], g + 1),
                    (s[0].el.style.display = s[2].el.style.display = "block"),
                    m.focus && f.focus(),
                    p.bind(document, "keydown", h),
                    a.transform && p.bind(h.scrollWrap, "click", h),
                    m.mouseUsed || p.bind(document, "mousemove", nt),
                    p.bind(window, "resize scroll orientationchange", h),
                    T("bindEvents");
                }),
                h.setContent(s[1], g),
                h.updateCurrItem(),
                T("afterInit"),
                Ve ||
                  (oe = setInterval(function () {
                    st ||
                      l ||
                      c ||
                      v !== h.currItem.initialZoomLevel ||
                      h.updateSize();
                  }, 1e3)),
                p.addClass(f, "pswp--visible");
            }
          },
          close: function () {
            X &&
              ((Z = !(X = !1)),
              T("close"),
              p.unbind(window, "resize scroll orientationchange", h),
              p.unbind(window, "scroll", n.scroll),
              p.unbind(document, "keydown", h),
              p.unbind(document, "mousemove", nt),
              a.transform && p.unbind(h.scrollWrap, "click", h),
              l && p.unbind(window, ee, h),
              clearTimeout(Ee),
              T("unbindEvents"),
              tn(h.currItem, null, !0, h.destroy));
          },
          destroy: function () {
            T("destroy"),
              Zt && clearTimeout(Zt),
              f.setAttribute("aria-hidden", "true"),
              (f.className = ge),
              oe && clearInterval(oe),
              p.unbind(h.scrollWrap, te, h),
              p.unbind(window, "scroll", h),
              kt(),
              ut(),
              (Ye = null);
          },
          panTo: function (e, t, n) {
            n ||
              (e > d.min.x ? (e = d.min.x) : e < d.max.x && (e = d.max.x),
              t > d.min.y ? (t = d.min.y) : t < d.max.y && (t = d.max.y)),
              (_.x = e),
              (_.y = t),
              k();
          },
          handleEvent: function (e) {
            (e = e || window.event), n[e.type] && n[e.type](e);
          },
          goTo: function (e) {
            var t = (e = G(e)) - g;
            (w = t),
              (g = e),
              (h.currItem = en(g)),
              (qe -= t),
              Je(b.x * qe),
              ut(),
              (y = !1),
              h.updateCurrItem();
          },
          next: function () {
            h.goTo(g + 1);
          },
          prev: function () {
            h.goTo(g - 1);
          },
          updateCurrZoomItem: function (e) {
            var t;
            e && T("beforeChange", 0),
              (Pe = s[1].el.children.length
                ? ((t = s[1].el.children[0]),
                  p.hasClass(t, "pswp__zoom-wrap") ? t.style : null)
                : null),
              (d = h.currItem.bounds),
              (ne = v = h.currItem.initialZoomLevel),
              (_.x = d.center.x),
              (_.y = d.center.y),
              e && T("afterChange");
          },
          invalidateCurrItems: function () {
            se = !0;
            for (var e = 0; e < 3; e++)
              s[e].item && (s[e].item.needsUpdate = !0);
          },
          updateCurrItem: function (e) {
            if (0 !== w) {
              var t,
                n = Math.abs(w);
              if (!(e && n < 2)) {
                (h.currItem = en(g)),
                  (We = !1),
                  T("beforeChange", w),
                  3 <= n && ((Q += w + (0 < w ? -3 : 3)), (n = 3));
                for (var i = 0; i < n; i++)
                  0 < w
                    ? ((t = s.shift()),
                      (s[2] = t),
                      Ke((++Q + 2) * b.x, t.el.style),
                      h.setContent(t, g - n + i + 1 + 1))
                    : ((t = s.pop()),
                      s.unshift(t),
                      Ke(--Q * b.x, t.el.style),
                      h.setContent(t, g + n - i - 1 - 1));
                !Pe ||
                  1 !== Math.abs(w) ||
                  ((e = en(ae)).initialZoomLevel !== v &&
                    (an(e, E), un(e), Ze(e))),
                  (w = 0),
                  h.updateCurrZoomItem(),
                  (ae = g),
                  T("afterChange");
              }
            }
          },
          updateSize: function (e) {
            if (!Ve && m.modal) {
              var t = p.getScrollY();
              if (
                (_e !== t && ((f.style.top = t + "px"), (_e = t)),
                !e && ze.x === window.innerWidth && ze.y === window.innerHeight)
              )
                return;
              (ze.x = window.innerWidth),
                (ze.y = window.innerHeight),
                (f.style.height = ze.y + "px");
            }
            if (
              ((E.x = h.scrollWrap.clientWidth),
              (E.y = h.scrollWrap.clientHeight),
              H(),
              (b.x = E.x + Math.round(E.x * m.spacing)),
              (b.y = E.y),
              Je(b.x * qe),
              T("beforeResize"),
              void 0 !== Q)
            ) {
              for (var n, i, r, o = 0; o < 3; o++)
                (n = s[o]),
                  Ke((o + Q) * b.x, n.el.style),
                  (r = g + o - 1),
                  m.loop && 2 < P() && (r = G(r)),
                  (i = en(r)) && (se || i.needsUpdate || !i.bounds)
                    ? (h.cleanSlide(i),
                      h.setContent(n, r),
                      1 === o && ((h.currItem = i), h.updateCurrZoomItem(!0)),
                      (i.needsUpdate = !1))
                    : -1 === n.index && 0 <= r && h.setContent(n, r),
                  i && i.container && (an(i, E), un(i), Ze(i));
              se = !1;
            }
            (ne = v = h.currItem.initialZoomLevel),
              (d = h.currItem.bounds) &&
                ((_.x = d.center.x), (_.y = d.center.y), k(!0)),
              T("resize");
          },
          zoomTo: function (t, e, n, i, r) {
            e &&
              ((ne = v),
              (wt.x = Math.abs(e.x) - _.x),
              (wt.y = Math.abs(e.y) - _.y),
              C(Ge, _));
            function o(e) {
              1 === e
                ? ((v = t), (_.x = s.x), (_.y = s.y))
                : ((v = (t - a) * e + a),
                  (_.x = (s.x - l.x) * e + l.x),
                  (_.y = (s.y - l.y) * e + l.y)),
                r && r(e),
                k(1 === e);
            }
            var e = it(t, !1),
              s = {},
              a = (q("x", e, s, t), q("y", e, s, t), v),
              l = { x: _.x, y: _.y };
            et(s);
            n ? ct("customZoomTo", 0, 1, n, i || p.easing.sine.inOut, o) : o(1);
          },
        },
        dt = 30,
        ft = 10,
        A = {},
        pt = {},
        D = {},
        O = {},
        ht = {},
        mt = [],
        gt = {},
        vt = [],
        yt = {},
        _t = 0,
        Et = e(),
        bt = 0,
        R = e(),
        wt = e(),
        Tt = e(),
        St = function (e, t) {
          return e.x === t.x && e.y === t.y;
        },
        It = function (e, t) {
          return (
            (yt.x = Math.abs(e.x - t.x)),
            (yt.y = Math.abs(e.y - t.y)),
            Math.sqrt(yt.x * yt.x + yt.y * yt.y)
          );
        },
        kt = function () {
          De && (me(De), (De = null));
        },
        Ct = function () {
          l && ((De = he(Ct)), Gt());
        },
        xt = function () {
          return !("fit" === m.scaleMode && v === h.currItem.initialZoomLevel);
        },
        At = function (e, t) {
          return (
            !(!e || e === document) &&
            !(
              e.getAttribute("class") &&
              -1 < e.getAttribute("class").indexOf("pswp__scroll-wrap")
            ) &&
            (t(e) ? e : At(e.parentNode, t))
          );
        },
        Dt = {},
        Ot = function (e, t) {
          return (
            (Dt.prevent = !At(e.target, m.isClickableElement)),
            T("preventDragEvent", e, t, Dt),
            Dt.prevent
          );
        },
        Rt = function (e, t) {
          return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
        },
        Pt = function (e, t, n) {
          (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y));
        },
        Mt = function (e, t, n) {
          var i;
          50 < e - we &&
            (((i = 2 < vt.length ? vt.shift() : {}).x = t),
            (i.y = n),
            vt.push(i),
            (we = e));
        },
        Lt = function () {
          var e = _.y - h.currItem.initialPosition.y;
          return 1 - Math.abs(e / (E.y / 2));
        },
        Ft = {},
        Nt = {},
        jt = [],
        $t = function (e) {
          for (; 0 < jt.length; ) jt.pop();
          return (
            pe
              ? (($e = 0),
                mt.forEach(function (e) {
                  0 === $e ? (jt[0] = e) : 1 === $e && (jt[1] = e), $e++;
                }))
              : -1 < e.type.indexOf("touch")
              ? e.touches &&
                0 < e.touches.length &&
                ((jt[0] = Rt(e.touches[0], Ft)),
                1 < e.touches.length && (jt[1] = Rt(e.touches[1], Nt)))
              : ((Ft.x = e.pageX),
                (Ft.y = e.pageY),
                (Ft.id = ""),
                (jt[0] = Ft)),
            jt
          );
        },
        Bt = function (e, t) {
          var n,
            i,
            r,
            o = _[e] + t[e],
            s = 0 < t[e],
            a = R.x + t.x,
            l = R.x - gt.x,
            u = o > d.min[e] || o < d.max[e] ? m.panEndFriction : 1,
            o = _[e] + t[e] * u;
          return (!m.allowPanToNext && v !== h.currItem.initialZoomLevel) ||
            (Pe
              ? "h" !== Me ||
                "x" !== e ||
                xe ||
                (s
                  ? (o > d.min[e] &&
                      ((u = m.panEndFriction),
                      d.min[e],
                      (n = d.min[e] - Ge[e])),
                    (n <= 0 || l < 0) && 1 < P()
                      ? ((r = a), l < 0 && a > gt.x && (r = gt.x))
                      : d.min.x !== d.max.x && (i = o))
                  : (o < d.max[e] &&
                      ((u = m.panEndFriction),
                      d.max[e],
                      (n = Ge[e] - d.max[e])),
                    (n <= 0 || 0 < l) && 1 < P()
                      ? ((r = a), 0 < l && a < gt.x && (r = gt.x))
                      : d.min.x !== d.max.x && (i = o)))
              : (r = a),
            "x" !== e)
            ? void (y || Oe || (v > h.currItem.fitRatio && (_[e] += t[e] * u)))
            : (void 0 !== r && (Je(r, !0), (Oe = r !== gt.x)),
              d.min.x !== d.max.x &&
                (void 0 !== i ? (_.x = i) : Oe || (_.x += t.x * u)),
              void 0 !== r);
        },
        Gt = function () {
          if (u) {
            var e,
              t,
              n,
              i,
              r,
              o = u.length;
            if (0 !== o)
              if (
                (C(A, u[0]), (D.x = A.x - O.x), (D.y = A.y - O.y), c && 1 < o)
              )
                (O.x = A.x),
                  (O.y = A.y),
                  (!D.x && !D.y && St(u[1], pt)) ||
                    (C(pt, u[1]),
                    xe || ((xe = !0), T("zoomGestureStarted")),
                    (o = It(A, pt)),
                    (e = Ht(o)) >
                      h.currItem.initialZoomLevel +
                        h.currItem.initialZoomLevel / 15 && (je = !0),
                    (t = 1),
                    (n = rt()),
                    (i = ot()),
                    e < n
                      ? m.pinchToClose &&
                        !je &&
                        ne <= h.currItem.initialZoomLevel
                        ? (I((r = 1 - (n - e) / (n / 1.2))),
                          T("onPinchClose", r),
                          (Fe = !0))
                        : (e =
                            n - (t = 1 < (t = (n - e) / n) ? 1 : t) * (n / 3))
                      : i < e &&
                        (e = i + (t = 1 < (t = (e - i) / (6 * n)) ? 1 : t) * n),
                    t < 0 && (t = 0),
                    Pt(A, pt, Et),
                    (Be.x += Et.x - Tt.x),
                    (Be.y += Et.y - Tt.y),
                    C(Tt, Et),
                    (_.x = Qe("x", e)),
                    (_.y = Qe("y", e)),
                    (Se = v < e),
                    (v = e),
                    k());
              else if (
                Me &&
                (Le &&
                  ((Le = !1),
                  Math.abs(D.x) >= ft && (D.x -= u[0].x - ht.x),
                  Math.abs(D.y) >= ft && (D.y -= u[0].y - ht.y)),
                (O.x = A.x),
                (O.y = A.y),
                0 !== D.x || 0 !== D.y)
              ) {
                if ("v" === Me && m.closeOnVerticalDrag && !xt())
                  return (
                    (Be.y += D.y),
                    (_.y += D.y),
                    (r = Lt()),
                    (Ie = !0),
                    T("onVerticalDrag", r),
                    I(r),
                    void k()
                  );
                Mt(S(), A.x, A.y),
                  (Ae = !0),
                  (d = h.currItem.bounds),
                  Bt("x", D) || (Bt("y", D), et(_), k());
              }
          }
        },
        qt = function () {
          var t,
            n,
            i = {
              lastFlickOffset: {},
              lastFlickDist: {},
              lastFlickSpeed: {},
              slowDownRatio: {},
              slowDownRatioReverse: {},
              speedDecelerationRatio: {},
              speedDecelerationRatioAbs: {},
              distanceOffset: {},
              backAnimDestination: {},
              backAnimStarted: {},
              calculateSwipeSpeed: function (e) {
                (n =
                  1 < vt.length
                    ? ((t = S() - we + 50), vt[vt.length - 2][e])
                    : ((t = S() - be), ht[e])),
                  (i.lastFlickOffset[e] = O[e] - n),
                  (i.lastFlickDist[e] = Math.abs(i.lastFlickOffset[e])),
                  20 < i.lastFlickDist[e]
                    ? (i.lastFlickSpeed[e] = i.lastFlickOffset[e] / t)
                    : (i.lastFlickSpeed[e] = 0),
                  Math.abs(i.lastFlickSpeed[e]) < 0.1 &&
                    (i.lastFlickSpeed[e] = 0),
                  (i.slowDownRatio[e] = 0.95),
                  (i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e]),
                  (i.speedDecelerationRatio[e] = 1);
              },
              calculateOverBoundsAnimOffset: function (t, e) {
                i.backAnimStarted[t] ||
                  (_[t] > d.min[t]
                    ? (i.backAnimDestination[t] = d.min[t])
                    : _[t] < d.max[t] && (i.backAnimDestination[t] = d.max[t]),
                  void 0 !== i.backAnimDestination[t] &&
                    ((i.slowDownRatio[t] = 0.7),
                    (i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t]),
                    i.speedDecelerationRatioAbs[t] < 0.05 &&
                      ((i.lastFlickSpeed[t] = 0),
                      (i.backAnimStarted[t] = !0),
                      ct(
                        "bounceZoomPan" + t,
                        _[t],
                        i.backAnimDestination[t],
                        e || 300,
                        p.easing.sine.out,
                        function (e) {
                          (_[t] = e), k();
                        }
                      ))));
              },
              calculateAnimOffset: function (e) {
                i.backAnimStarted[e] ||
                  ((i.speedDecelerationRatio[e] =
                    i.speedDecelerationRatio[e] *
                    (i.slowDownRatio[e] +
                      i.slowDownRatioReverse[e] -
                      (i.slowDownRatioReverse[e] * i.timeDiff) / 10)),
                  (i.speedDecelerationRatioAbs[e] = Math.abs(
                    i.lastFlickSpeed[e] * i.speedDecelerationRatio[e]
                  )),
                  (i.distanceOffset[e] =
                    i.lastFlickSpeed[e] *
                    i.speedDecelerationRatio[e] *
                    i.timeDiff),
                  (_[e] += i.distanceOffset[e]));
              },
              panAnimLoop: function () {
                if (
                  x.zoomPan &&
                  ((x.zoomPan.raf = he(i.panAnimLoop)),
                  (i.now = S()),
                  (i.timeDiff = i.now - i.lastNow),
                  (i.lastNow = i.now),
                  i.calculateAnimOffset("x"),
                  i.calculateAnimOffset("y"),
                  k(),
                  i.calculateOverBoundsAnimOffset("x"),
                  i.calculateOverBoundsAnimOffset("y"),
                  i.speedDecelerationRatioAbs.x < 0.05 &&
                    i.speedDecelerationRatioAbs.y < 0.05)
                )
                  return (
                    (_.x = Math.round(_.x)),
                    (_.y = Math.round(_.y)),
                    k(),
                    void at("zoomPan")
                  );
              },
            };
          return i;
        },
        Ut = function (e) {
          return (
            e.calculateSwipeSpeed("y"),
            (d = h.currItem.bounds),
            (e.backAnimDestination = {}),
            (e.backAnimStarted = {}),
            Math.abs(e.lastFlickSpeed.x) <= 0.05 &&
            Math.abs(e.lastFlickSpeed.y) <= 0.05
              ? ((e.speedDecelerationRatioAbs.x =
                  e.speedDecelerationRatioAbs.y =
                    0),
                e.calculateOverBoundsAnimOffset("x"),
                e.calculateOverBoundsAnimOffset("y"),
                !0)
              : (lt("zoomPan"), (e.lastNow = S()), void e.panAnimLoop())
          );
        },
        Vt = function (e, t) {
          var n, i, r;
          y || (_t = g),
            "swipe" === e &&
              ((e = O.x - ht.x),
              (o = t.lastFlickDist.x < 10),
              dt < e && (o || 20 < t.lastFlickOffset.x)
                ? (i = -1)
                : e < -dt && (o || t.lastFlickOffset.x < -20) && (i = 1)),
            i &&
              ((g += i) < 0
                ? ((g = m.loop ? P() - 1 : 0), (r = !0))
                : g >= P() && ((g = m.loop ? 0 : P() - 1), (r = !0)),
              (r && !m.loop) || ((w += i), (qe -= i), (n = !0)));
          var e = b.x * qe,
            o = Math.abs(e - R.x),
            s =
              n || e > R.x == 0 < t.lastFlickSpeed.x
                ? ((s =
                    0 < Math.abs(t.lastFlickSpeed.x)
                      ? o / Math.abs(t.lastFlickSpeed.x)
                      : 333),
                  (s = Math.min(s, 400)),
                  Math.max(s, 250))
                : 333;
          return (
            _t === g && (n = !1),
            (y = !0),
            T("mainScrollAnimStart"),
            ct("mainScroll", R.x, e, s, p.easing.cubic.out, Je, function () {
              ut(),
                (y = !1),
                (_t = -1),
                (!n && _t === g) || h.updateCurrItem(),
                T("mainScrollAnimComplete");
            }),
            n && h.updateCurrItem(!0),
            n
          );
        },
        Ht = function (e) {
          return (1 / Re) * e * ne;
        },
        zt = function () {
          var e = v,
            t = rt(),
            n = ot();
          v < t ? (e = t) : n < v && (e = n);
          var i,
            r = Ne;
          return (
            Fe && !Se && !je && v < t
              ? h.close()
              : (Fe &&
                  (i = function (e) {
                    I((1 - r) * e + r);
                  }),
                h.zoomTo(e, 0, 200, p.easing.cubic.out, i)),
            !0
          );
        };
      B("Gestures", {
        publicMethods: {
          initGestures: function () {
            function e(e, t, n, i, r) {
              (le = e + t), (ue = e + n), (ce = e + i), (de = r ? e + r : "");
            }
            (pe = a.pointerEvent) && a.touch && (a.touch = !1),
              pe
                ? navigator.pointerEnabled
                  ? e("pointer", "down", "move", "up", "cancel")
                  : e("MSPointer", "Down", "Move", "Up", "Cancel")
                : a.touch
                ? (e("touch", "start", "move", "end", "cancel"), (i = !0))
                : e("mouse", "down", "move", "up"),
              (ee = ue + " " + ce + " " + de),
              (te = le),
              pe &&
                !i &&
                (i =
                  1 < navigator.maxTouchPoints ||
                  1 < navigator.msMaxTouchPoints),
              (h.likelyTouchDevice = i),
              (n[le] = z),
              (n[ue] = W),
              (n[ce] = Y),
              de && (n[de] = n[ce]),
              a.touch &&
                ((te += " mousedown"),
                (ee += " mousemove mouseup"),
                (n.mousedown = n[le]),
                (n.mousemove = n[ue]),
                (n.mouseup = n[ce])),
              i || (m.allowPanToNext = !1);
          },
        },
      });
      function Wt(e) {
        function t() {
          (e.loading = !1),
            (e.loaded = !0),
            e.loadComplete ? e.loadComplete(e) : (e.img = null),
            (n.onload = n.onerror = null),
            (n = null);
        }
        (e.loading = !0), (e.loaded = !1);
        var n = (e.img = p.createEl("pswp__img", "img"));
        (n.onload = t),
          (n.onerror = function () {
            (e.loadError = !0), t();
          }),
          (n.src = e.src);
      }
      function Yt(e, t) {
        return (
          e.src &&
          e.loadError &&
          e.container &&
          (t && (e.container.innerHTML = ""),
          (e.container.innerHTML = m.errorMsg.replace("%url%", e.src)),
          1)
        );
      }
      function Xt() {
        if (nn.length) {
          for (var e, t = 0; t < nn.length; t++)
            (e = nn[t]).holder.index === e.index &&
              ln(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
          nn = [];
        }
      }
      var Zt,
        Kt,
        Jt,
        Qt,
        en,
        P,
        tn = function (o, e, s, t) {
          function a() {
            at("initialZoom"),
              s
                ? (h.template.removeAttribute("style"),
                  h.bg.removeAttribute("style"))
                : (I(1),
                  e && (e.style.display = "block"),
                  p.addClass(f, "pswp--animated-in"),
                  T("initialZoom" + (s ? "OutEnd" : "InEnd"))),
              t && t(),
              (Qt = !1);
          }
          Zt && clearTimeout(Zt),
            (Jt = Qt = !0),
            o.initialLayout
              ? ((l = o.initialLayout), (o.initialLayout = null))
              : (l = m.getThumbBoundsFn && m.getThumbBoundsFn(g));
          var l,
            u = s ? m.hideAnimationDuration : m.showAnimationDuration;
          if (!u || !l || void 0 === l.x)
            return (
              T("initialZoom" + (s ? "Out" : "In")),
              (v = o.initialZoomLevel),
              C(_, o.initialPosition),
              k(),
              (f.style.opacity = s ? 0 : 1),
              I(1),
              void (u
                ? setTimeout(function () {
                    a();
                  }, u)
                : a())
            );
          var c, d;
          (c = K),
            (d = !h.currItem.src || h.currItem.loadError || m.showHideOpacity),
            o.miniImg && (o.miniImg.style.webkitBackfaceVisibility = "hidden"),
            s ||
              ((v = l.w / o.w),
              (_.x = l.x),
              (_.y = l.y - ve),
              (h[d ? "template" : "bg"].style.opacity = 0.001),
              k()),
            lt("initialZoom"),
            s && !c && p.removeClass(f, "pswp--animated-in"),
            d &&
              (s
                ? p[(c ? "remove" : "add") + "Class"](
                    f,
                    "pswp--animate_opacity"
                  )
                : setTimeout(function () {
                    p.addClass(f, "pswp--animate_opacity");
                  }, 30)),
            (Zt = setTimeout(
              function () {
                var t, n, i, r, e;
                T("initialZoom" + (s ? "Out" : "In")),
                  s
                    ? ((t = l.w / o.w),
                      (n = { x: _.x, y: _.y }),
                      (i = v),
                      (r = Ne),
                      (e = function (e) {
                        1 === e
                          ? ((v = t), (_.x = l.x), (_.y = l.y - _e))
                          : ((v = (t - i) * e + i),
                            (_.x = (l.x - n.x) * e + n.x),
                            (_.y = (l.y - _e - n.y) * e + n.y)),
                          k(),
                          d ? (f.style.opacity = 1 - e) : I(r - e * r);
                      }),
                      c
                        ? ct("initialZoom", 0, 1, u, p.easing.cubic.out, e, a)
                        : (e(1), (Zt = setTimeout(a, u + 20))))
                    : ((v = o.initialZoomLevel),
                      C(_, o.initialPosition),
                      k(),
                      I(1),
                      d ? (f.style.opacity = 1) : I(1),
                      (Zt = setTimeout(a, u + 20)));
              },
              s ? 25 : 90
            ));
        },
        M = {},
        nn = [],
        rn = {
          index: 0,
          errorMsg:
            '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading: !1,
          preload: [1, 1],
          getNumItemsFn: function () {
            return Kt.length;
          },
        },
        on = function () {
          return {
            center: { x: 0, y: 0 },
            max: { x: 0, y: 0 },
            min: { x: 0, y: 0 },
          };
        },
        sn = function (e, t, n) {
          var i = e.bounds;
          (i.center.x = Math.round((M.x - t) / 2)),
            (i.center.y = Math.round((M.y - n) / 2) + e.vGap.top),
            (i.max.x = t > M.x ? Math.round(M.x - t) : i.center.x),
            (i.max.y = n > M.y ? Math.round(M.y - n) + e.vGap.top : i.center.y),
            (i.min.x = t > M.x ? 0 : i.center.x),
            (i.min.y = n > M.y ? e.vGap.top : i.center.y);
        },
        an = function (e, t, n) {
          var i, r;
          return e.src && !e.loadError
            ? ((i = !n) &&
                (e.vGap || (e.vGap = { top: 0, bottom: 0 }),
                T("parseVerticalMargin", e)),
              (M.x = t.x),
              (M.y = t.y - e.vGap.top - e.vGap.bottom),
              i &&
                ((t = M.x / e.w),
                (r = M.y / e.h),
                (e.fitRatio = t < r ? t : r),
                "orig" === (t = m.scaleMode)
                  ? (n = 1)
                  : "fit" === t && (n = e.fitRatio),
                (e.initialZoomLevel = n = 1 < n ? 1 : n),
                e.bounds || (e.bounds = on())),
              n
                ? (sn(e, e.w * n, e.h * n),
                  i &&
                    n === e.initialZoomLevel &&
                    (e.initialPosition = e.bounds.center),
                  e.bounds)
                : void 0)
            : ((e.w = e.h = 0),
              (e.initialZoomLevel = e.fitRatio = 1),
              (e.bounds = on()),
              (e.initialPosition = e.bounds.center),
              e.bounds);
        },
        ln = function (e, t, n, i, r, o) {
          t.loadError ||
            (i &&
              ((t.imageAppended = !0),
              un(t, i, t === h.currItem && We),
              n.appendChild(i),
              o &&
                setTimeout(function () {
                  t &&
                    t.loaded &&
                    t.placeholder &&
                    ((t.placeholder.style.display = "none"),
                    (t.placeholder = null));
                }, 500)));
        },
        un = function (e, t, n) {
          var i;
          e.src &&
            ((t = t || e.container.lastChild),
            (i = n ? e.w : Math.round(e.w * e.fitRatio)),
            (n = n ? e.h : Math.round(e.h * e.fitRatio)),
            e.placeholder &&
              !e.loaded &&
              ((e.placeholder.style.width = i + "px"),
              (e.placeholder.style.height = n + "px")),
            (t.style.width = i + "px"),
            (t.style.height = n + "px"));
        };
      B("Controller", {
        publicMethods: {
          lazyLoadItem: function (e) {
            e = G(e);
            var t = en(e);
            t &&
              ((!t.loaded && !t.loading) || se) &&
              (T("gettingData", e, t), t.src && Wt(t));
          },
          initController: function () {
            p.extend(m, rn, !0),
              (h.items = Kt = t),
              (en = h.getItemAt),
              (P = m.getNumItemsFn),
              m.loop,
              P() < 3 && (m.loop = !1),
              o("beforeChange", function (e) {
                for (
                  var t = m.preload,
                    n = null === e || 0 <= e,
                    i = Math.min(t[0], P()),
                    r = Math.min(t[1], P()),
                    o = 1;
                  o <= (n ? r : i);
                  o++
                )
                  h.lazyLoadItem(g + o);
                for (o = 1; o <= (n ? i : r); o++) h.lazyLoadItem(g - o);
              }),
              o("initialLayout", function () {
                h.currItem.initialLayout =
                  m.getThumbBoundsFn && m.getThumbBoundsFn(g);
              }),
              o("mainScrollAnimComplete", Xt),
              o("initialZoomInEnd", Xt),
              o("destroy", function () {
                for (var e, t = 0; t < Kt.length; t++)
                  (e = Kt[t]).container && (e.container = null),
                    e.placeholder && (e.placeholder = null),
                    e.img && (e.img = null),
                    e.preloader && (e.preloader = null),
                    e.loadError && (e.loaded = e.loadError = !1);
                nn = null;
              });
          },
          getItemAt: function (e) {
            return 0 <= e && void 0 !== Kt[e] && Kt[e];
          },
          allowProgressiveImg: function () {
            return (
              m.forceProgressiveLoading ||
              !i ||
              m.mouseUsed ||
              1200 < screen.width
            );
          },
          setContent: function (t, n) {
            m.loop && (n = G(n));
            var e = h.getItemAt(t.index);
            e && (e.container = null);
            var i,
              r,
              o,
              e = h.getItemAt(n);
            e
              ? (T("gettingData", n, e),
                (t.index = n),
                (r = (t.item = e).container = p.createEl("pswp__zoom-wrap")),
                !e.src &&
                  e.html &&
                  (e.html.tagName
                    ? r.appendChild(e.html)
                    : (r.innerHTML = e.html)),
                Yt(e),
                an(e, E),
                !e.src || e.loadError || e.loaded
                  ? e.src &&
                    !e.loadError &&
                    (((i = p.createEl("pswp__img", "img")).style.opacity = 1),
                    (i.src = e.src),
                    un(e, i),
                    ln(n, e, r, i, !0))
                  : ((e.loadComplete = function (e) {
                      if (X) {
                        if (t && t.index === n) {
                          if (Yt(e, !0))
                            return (
                              (e.loadComplete = e.img = null),
                              an(e, E),
                              Ze(e),
                              void (t.index === g && h.updateCurrZoomItem())
                            );
                          e.imageAppended
                            ? !Qt &&
                              e.placeholder &&
                              ((e.placeholder.style.display = "none"),
                              (e.placeholder = null))
                            : a.transform && (y || Qt)
                            ? nn.push({
                                item: e,
                                baseDiv: r,
                                img: e.img,
                                index: n,
                                holder: t,
                                clearPlaceholder: !0,
                              })
                            : ln(n, e, r, e.img, y || Qt, !0);
                        }
                        (e.loadComplete = null),
                          (e.img = null),
                          T("imageLoadComplete", n, e);
                      }
                    }),
                    p.features.transform &&
                      ((o = "pswp__img pswp__img--placeholder"),
                      (o += e.msrc ? "" : " pswp__img--placeholder--blank"),
                      (o = p.createEl(o, e.msrc ? "img" : "")),
                      e.msrc && (o.src = e.msrc),
                      un(e, o),
                      r.appendChild(o),
                      (e.placeholder = o)),
                    e.loading || Wt(e),
                    h.allowProgressiveImg() &&
                      (!Jt && a.transform
                        ? nn.push({
                            item: e,
                            baseDiv: r,
                            img: e.img,
                            index: n,
                            holder: t,
                          })
                        : ln(n, e, r, e.img, !0, !0))),
                Jt || n !== g ? Ze(e) : ((Pe = r.style), tn(e, i || e.img)),
                (t.el.innerHTML = ""),
                t.el.appendChild(r))
              : (t.el.innerHTML = "");
          },
          cleanSlide: function (e) {
            e.img && (e.img.onload = e.img.onerror = null),
              (e.loaded = e.loading = e.img = e.imageAppended = !1);
          },
        },
      });
      function cn(e, t, n) {
        var i = document.createEvent("CustomEvent"),
          t = {
            origEvent: e,
            target: e.target,
            releasePoint: t,
            pointerType: n || "touch",
          };
        i.initCustomEvent("pswpTap", !0, !0, t), e.target.dispatchEvent(i);
      }
      var dn,
        L,
        fn = {};
      B("Tap", {
        publicMethods: {
          initTap: function () {
            o("firstTouchStart", h.onTapStart),
              o("touchRelease", h.onTapRelease),
              o("destroy", function () {
                (fn = {}), (dn = null);
              });
          },
          onTapStart: function (e) {
            1 < e.length && (clearTimeout(dn), (dn = null));
          },
          onTapRelease: function (e, t) {
            var n, i, r;
            !t ||
              Ae ||
              Ce ||
              st ||
              ((n = t),
              dn &&
              (clearTimeout(dn),
              (dn = null),
              (i = n),
              (r = fn),
              Math.abs(i.x - r.x) < $ && Math.abs(i.y - r.y) < $)
                ? T("doubleTap", n)
                : "mouse" === t.type
                ? cn(e, t, "mouse")
                : "BUTTON" === e.target.tagName.toUpperCase() ||
                  p.hasClass(e.target, "pswp__single-tap")
                ? cn(e, t)
                : (C(fn, n),
                  (dn = setTimeout(function () {
                    cn(e, t), (dn = null);
                  }, 300))));
          },
        },
      }),
        B("DesktopZoom", {
          publicMethods: {
            initDesktopZoom: function () {
              ye ||
                (i
                  ? o("mouseUsed", function () {
                      h.setupDesktopZoom();
                    })
                  : h.setupDesktopZoom(!0));
            },
            setupDesktopZoom: function (e) {
              L = {};
              var t = "wheel mousewheel DOMMouseScroll";
              o("bindEvents", function () {
                p.bind(f, t, h.handleMouseWheel);
              }),
                o("unbindEvents", function () {
                  L && p.unbind(f, t, h.handleMouseWheel);
                }),
                (h.mouseZoomedIn = !1);
              function n() {
                h.mouseZoomedIn &&
                  (p.removeClass(f, "pswp--zoomed-in"), (h.mouseZoomedIn = !1)),
                  v < 1
                    ? p.addClass(f, "pswp--zoom-allowed")
                    : p.removeClass(f, "pswp--zoom-allowed"),
                  r();
              }
              var i,
                r = function () {
                  i && (p.removeClass(f, "pswp--dragging"), (i = !1));
                };
              o("resize", n),
                o("afterChange", n),
                o("pointerDown", function () {
                  h.mouseZoomedIn &&
                    ((i = !0), p.addClass(f, "pswp--dragging"));
                }),
                o("pointerUp", r),
                e || n();
            },
            handleMouseWheel: function (e) {
              if (v <= h.currItem.fitRatio)
                return (
                  m.modal &&
                    (!m.closeOnScroll || st || l
                      ? e.preventDefault()
                      : fe && 2 < Math.abs(e.deltaY) && ((K = !0), h.close())),
                  !0
                );
              if ((e.stopPropagation(), (L.x = 0), "deltaX" in e))
                1 === e.deltaMode
                  ? ((L.x = 18 * e.deltaX), (L.y = 18 * e.deltaY))
                  : ((L.x = e.deltaX), (L.y = e.deltaY));
              else if ("wheelDelta" in e)
                e.wheelDeltaX && (L.x = -0.16 * e.wheelDeltaX),
                  e.wheelDeltaY
                    ? (L.y = -0.16 * e.wheelDeltaY)
                    : (L.y = -0.16 * e.wheelDelta);
              else {
                if (!("detail" in e)) return;
                L.y = e.detail;
              }
              it(v, !0);
              var t = _.x - L.x,
                n = _.y - L.y;
              (m.modal ||
                (t <= d.min.x &&
                  t >= d.max.x &&
                  n <= d.min.y &&
                  n >= d.max.y)) &&
                e.preventDefault(),
                h.panTo(t, n);
            },
            toggleDesktopZoom: function (e) {
              e = e || { x: E.x / 2 + Ue.x, y: E.y / 2 + Ue.y };
              var t = m.getDoubleTapZoom(!0, h.currItem),
                n = v === t;
              (h.mouseZoomedIn = !n),
                h.zoomTo(n ? h.currItem.initialZoomLevel : t, e, 333),
                p[(n ? "remove" : "add") + "Class"](f, "pswp--zoomed-in");
            },
          },
        });
      function pn() {
        mn && clearTimeout(mn), vn && clearTimeout(vn);
      }
      function hn() {
        var e = kn(),
          t = {};
        if (e.length < 5) return t;
        var n,
          i = e.split("&");
        for (o = 0; o < i.length; o++)
          !i[o] || (n = i[o].split("=")).length < 2 || (t[n[0]] = n[1]);
        if (m.galleryPIDs) {
          for (var r = t.pid, o = (t.pid = 0); o < Kt.length; o++)
            if (Kt[o].pid === r) {
              t.pid = o;
              break;
            }
        } else t.pid = parseInt(t.pid, 10) - 1;
        return t.pid < 0 && (t.pid = 0), t;
      }
      var mn,
        gn,
        vn,
        yn,
        _n,
        En,
        r,
        bn,
        wn,
        Tn,
        F,
        Sn,
        In = { history: !0, galleryUID: 1 },
        kn = function () {
          return F.hash.substring(1);
        },
        Cn = function () {
          var e, t;
          vn && clearTimeout(vn),
            st || l
              ? (vn = setTimeout(Cn, 500))
              : (yn ? clearTimeout(gn) : (yn = !0),
                (t = g + 1),
                (e = en(g)).hasOwnProperty("pid") && (t = e.pid),
                (e = r + "&gid=" + m.galleryUID + "&pid=" + t),
                bn || (-1 === F.hash.indexOf(e) && (Tn = !0)),
                (t = F.href.split("#")[0] + "#" + e),
                Sn
                  ? "#" + e !== window.location.hash &&
                    history[bn ? "replaceState" : "pushState"](
                      "",
                      document.title,
                      t
                    )
                  : bn
                  ? F.replace(t)
                  : (F.hash = e),
                (bn = !0),
                (gn = setTimeout(function () {
                  yn = !1;
                }, 60)));
        };
      B("History", {
        publicMethods: {
          initHistory: function () {
            var e, t;
            p.extend(m, In, !0),
              m.history &&
                ((F = window.location),
                (bn = wn = Tn = !1),
                (r = kn()),
                (Sn = "pushState" in history),
                -1 < r.indexOf("gid=") &&
                  (r = (r = r.split("&gid=")[0]).split("?gid=")[0]),
                o("afterChange", h.updateURL),
                o("unbindEvents", function () {
                  p.unbind(window, "hashchange", h.onHashChange);
                }),
                (e = function () {
                  (En = !0),
                    wn ||
                      (Tn
                        ? history.back()
                        : r
                        ? (F.hash = r)
                        : Sn
                        ? history.pushState(
                            "",
                            document.title,
                            F.pathname + F.search
                          )
                        : (F.hash = "")),
                    pn();
                }),
                o("unbindEvents", function () {
                  K && e();
                }),
                o("destroy", function () {
                  En || e();
                }),
                o("firstUpdate", function () {
                  g = hn().pid;
                }),
                -1 < (t = r.indexOf("pid=")) &&
                  "&" === (r = r.substring(0, t)).slice(-1) &&
                  (r = r.slice(0, -1)),
                setTimeout(function () {
                  X && p.bind(window, "hashchange", h.onHashChange);
                }, 40));
          },
          onHashChange: function () {
            return kn() === r
              ? ((wn = !0), void h.close())
              : void (yn || ((_n = !0), h.goTo(hn().pid), (_n = !1)));
          },
          updateURL: function () {
            pn(), _n || (bn ? (mn = setTimeout(Cn, 800)) : Cn());
          },
        },
      }),
        p.extend(h, j);
    };
  }),
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipeUI_Default = t());
  })(this, function () {
    "use strict";
    return function (i, a) {
      function e(e) {
        if (k) return !0;
        (e = e || window.event), I.timeToIdle && I.mouseUsed && !_ && l();
        for (
          var t,
            n,
            i = (e.target || e.srcElement).getAttribute("class") || "",
            r = 0;
          r < L.length;
          r++
        )
          (t = L[r]).onTap &&
            -1 < i.indexOf("pswp__" + t.name) &&
            (t.onTap(), (n = !0));
        n &&
          (e.stopPropagation && e.stopPropagation(),
          (k = !0),
          (e = a.features.isOldAndroid ? 600 : 30),
          setTimeout(function () {
            k = !1;
          }, e));
      }
      function n() {
        var e = 1 === I.getNumItemsFn();
        e !== S && (P(p, "ui--one-slide", e), (S = e));
      }
      function s() {
        P(v, "share-modal--hidden", R);
      }
      function r() {
        if (
          ((R = !R)
            ? (a.removeClass(v, "pswp__share-modal--fade-in"),
              setTimeout(function () {
                R && s();
              }, 300))
            : (s(),
              setTimeout(function () {
                R || a.addClass(v, "pswp__share-modal--fade-in");
              }, 30)),
          !R)
        ) {
          for (var e, t, n, i, r = "", o = 0; o < I.shareButtons.length; o++)
            (e = I.shareButtons[o]),
              (t = I.getImageURLForShare(e)),
              (n = I.getPageURLForShare(e)),
              (i = I.getTextForShare(e)),
              (r +=
                '<a href="' +
                e.url
                  .replace("{{url}}", encodeURIComponent(n))
                  .replace("{{image_url}}", encodeURIComponent(t))
                  .replace("{{raw_image_url}}", t)
                  .replace("{{text}}", encodeURIComponent(i)) +
                '" target="_blank" class="pswp__share--' +
                e.id +
                '"' +
                (e.download ? "download" : "") +
                ">" +
                e.label +
                "</a>"),
              I.parseShareButtonOut && (r = I.parseShareButtonOut(e, r));
          (v.children[0].innerHTML = r), (v.children[0].onclick = j);
        }
      }
      function o(e) {
        for (var t = 0; t < I.closeElClasses.length; t++)
          if (a.hasClass(e, "pswp__" + I.closeElClasses[t])) return !0;
      }
      function l() {
        clearTimeout(x), (M = 0), _ && A.setIdle(!1);
      }
      function u(e) {
        ((e = (e = e || window.event).relatedTarget || e.toElement) &&
          "HTML" !== e.nodeName) ||
          (clearTimeout(x),
          (x = setTimeout(function () {
            A.setIdle(!0);
          }, I.timeToIdleOutside)));
      }
      function c(e) {
        w !== e && (P(b, "preloader--active", !e), (w = e));
      }
      function d(e) {
        var t,
          n = e.vGap;
        !i.likelyTouchDevice || I.mouseUsed || screen.width > I.fitControlsWidth
          ? ((t = I.barsSize),
            I.captionEl && "auto" === t.bottom
              ? (m ||
                  ((m = a.createEl(
                    "pswp__caption pswp__caption--fake"
                  )).appendChild(a.createEl("pswp__caption__center")),
                  p.insertBefore(m, h),
                  a.addClass(p, "pswp__ui--fit")),
                I.addCaptionHTMLFn(e, m, !0)
                  ? ((e = m.clientHeight), (n.bottom = parseInt(e, 10) || 44))
                  : (n.bottom = t.top))
              : (n.bottom = "auto" === t.bottom ? 0 : t.bottom),
            (n.top = t.top))
          : (n.top = n.bottom = 0);
      }
      function F() {
        function e(e) {
          if (e)
            for (var t = e.length, n = 0; n < t; n++) {
              (r = e[n]), (o = r.className);
              for (var i = 0; i < L.length; i++)
                (s = L[i]),
                  -1 < o.indexOf("pswp__" + s.name) &&
                    (I[s.option]
                      ? (a.removeClass(r, "pswp__element--disabled"),
                        s.onInit && s.onInit(r))
                      : a.addClass(r, "pswp__element--disabled"));
            }
        }
        e(p.children);
        var r,
          o,
          s,
          t = a.getChildByClass(p, "pswp__top-bar");
        t && e(t.children);
      }
      var f,
        p,
        h,
        m,
        t,
        g,
        v,
        y,
        _,
        E,
        b,
        w,
        T,
        S,
        I,
        k,
        C,
        x,
        A = this,
        D = !1,
        O = !0,
        R = !0,
        N = {
          barsSize: { top: 44, bottom: "auto" },
          closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
          timeToIdle: 4e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          addCaptionHTMLFn: function (e, t) {
            return e.title
              ? ((t.children[0].innerHTML = e.title), !0)
              : ((t.children[0].innerHTML = ""), !1);
          },
          closeEl: !0,
          captionEl: !0,
          fullscreenEl: !0,
          zoomEl: !0,
          shareEl: !0,
          counterEl: !0,
          arrowEl: !0,
          preloaderEl: !0,
          tapToClose: !1,
          tapToToggleControls: !0,
          clickToCloseNonZoomable: !0,
          shareButtons: [
            {
              id: "facebook",
              label: "Share on Facebook",
              url: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
            },
            {
              id: "twitter",
              label: "Tweet",
              url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
            },
            {
              id: "pinterest",
              label: "Pin it",
              url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}",
            },
            {
              id: "download",
              label: "Download image",
              url: "{{raw_image_url}}",
              download: !0,
            },
          ],
          getImageURLForShare: function () {
            return i.currItem.src || "";
          },
          getPageURLForShare: function () {
            return window.location.href;
          },
          getTextForShare: function () {
            return i.currItem.title || "";
          },
          indexIndicatorSep: " / ",
          fitControlsWidth: 1200,
        },
        P = function (e, t, n) {
          a[(n ? "add" : "remove") + "Class"](e, "pswp__" + t);
        },
        j = function (e) {
          var t = (e = e || window.event).target || e.srcElement;
          return (
            i.shout("shareLinkClick", e, t),
            !(
              !t.href ||
              (!t.hasAttribute("download") &&
                (window.open(
                  t.href,
                  "pswp_share",
                  "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" +
                    (window.screen ? Math.round(screen.width / 2 - 275) : 100)
                ),
                R || r(),
                1))
            )
          );
        },
        M = 0,
        L = [
          {
            name: "caption",
            option: "captionEl",
            onInit: function (e) {
              h = e;
            },
          },
          {
            name: "share-modal",
            option: "shareEl",
            onInit: function (e) {
              v = e;
            },
            onTap: function () {
              r();
            },
          },
          {
            name: "button--share",
            option: "shareEl",
            onInit: function (e) {
              g = e;
            },
            onTap: function () {
              r();
            },
          },
          {
            name: "button--zoom",
            option: "zoomEl",
            onTap: i.toggleDesktopZoom,
          },
          {
            name: "counter",
            option: "counterEl",
            onInit: function (e) {
              t = e;
            },
          },
          { name: "button--close", option: "closeEl", onTap: i.close },
          { name: "button--arrow--left", option: "arrowEl", onTap: i.prev },
          { name: "button--arrow--right", option: "arrowEl", onTap: i.next },
          {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
              f.isFullscreen() ? f.exit() : f.enter();
            },
          },
          {
            name: "preloader",
            option: "preloaderEl",
            onInit: function (e) {
              b = e;
            },
          },
        ];
      (A.init = function () {
        var t;
        a.extend(i.options, N, !0),
          (I = i.options),
          (p = a.getChildByClass(i.scrollWrap, "pswp__ui")),
          (E = i.listen)("onVerticalDrag", function (e) {
            O && e < 0.95
              ? A.hideControls()
              : !O && 0.95 <= e && A.showControls();
          }),
          E("onPinchClose", function (e) {
            O && e < 0.9
              ? (A.hideControls(), (t = !0))
              : t && !O && 0.9 < e && A.showControls();
          }),
          E("zoomGestureEnded", function () {
            (t = !1) && !O && A.showControls();
          }),
          E("beforeChange", A.update),
          E("doubleTap", function (e) {
            var t = i.currItem.initialZoomLevel;
            i.getZoomLevel() !== t
              ? i.zoomTo(t, e, 333)
              : i.zoomTo(I.getDoubleTapZoom(!1, i.currItem), e, 333);
          }),
          E("preventDragEvent", function (e, t, n) {
            var i = e.target || e.srcElement;
            i &&
              i.getAttribute("class") &&
              -1 < e.type.indexOf("mouse") &&
              (0 < i.getAttribute("class").indexOf("__caption") ||
                /(SMALL|STRONG|EM)/i.test(i.tagName)) &&
              (n.prevent = !1);
          }),
          E("bindEvents", function () {
            a.bind(p, "pswpTap click", e),
              a.bind(i.scrollWrap, "pswpTap", A.onGlobalTap),
              i.likelyTouchDevice ||
                a.bind(i.scrollWrap, "mouseover", A.onMouseOver);
          }),
          E("unbindEvents", function () {
            R || r(),
              C && clearInterval(C),
              a.unbind(document, "mouseout", u),
              a.unbind(document, "mousemove", l),
              a.unbind(p, "pswpTap click", e),
              a.unbind(i.scrollWrap, "pswpTap", A.onGlobalTap),
              a.unbind(i.scrollWrap, "mouseover", A.onMouseOver),
              f &&
                (a.unbind(document, f.eventK, A.updateFullscreen),
                f.isFullscreen() && ((I.hideAnimationDuration = 0), f.exit()),
                (f = null));
          }),
          E("destroy", function () {
            I.captionEl &&
              (m && p.removeChild(m), a.removeClass(h, "pswp__caption--empty")),
              v && (v.children[0].onclick = null),
              a.removeClass(p, "pswp__ui--over-close"),
              a.addClass(p, "pswp__ui--hidden"),
              A.setIdle(!1);
          }),
          I.showAnimationDuration || a.removeClass(p, "pswp__ui--hidden"),
          E("initialZoomIn", function () {
            I.showAnimationDuration && a.removeClass(p, "pswp__ui--hidden");
          }),
          E("initialZoomOut", function () {
            a.addClass(p, "pswp__ui--hidden");
          }),
          E("parseVerticalMargin", d),
          F(),
          I.shareEl && g && v && (R = !0),
          n(),
          I.timeToIdle &&
            E("mouseUsed", function () {
              a.bind(document, "mousemove", l),
                a.bind(document, "mouseout", u),
                (C = setInterval(function () {
                  2 === ++M && A.setIdle(!0);
                }, I.timeToIdle / 2));
            }),
          I.fullscreenEl &&
            !a.features.isOldAndroid &&
            ((f = f || A.getFullscreenAPI())
              ? (a.bind(document, f.eventK, A.updateFullscreen),
                A.updateFullscreen(),
                a.addClass(i.template, "pswp--supports-fs"))
              : a.removeClass(i.template, "pswp--supports-fs")),
          I.preloaderEl &&
            (c(!0),
            E("beforeChange", function () {
              clearTimeout(T),
                (T = setTimeout(function () {
                  i.currItem && i.currItem.loading
                    ? (i.allowProgressiveImg() &&
                        (!i.currItem.img || i.currItem.img.naturalWidth)) ||
                      c(!1)
                    : c(!0);
                }, I.loadingIndicatorDelay));
            }),
            E("imageLoadComplete", function (e, t) {
              i.currItem === t && c(!0);
            }));
      }),
        (A.setIdle = function (e) {
          P(p, "ui--idle", (_ = e));
        }),
        (A.update = function () {
          (D =
            !(!O || !i.currItem) &&
            (A.updateIndexIndicator(),
            I.captionEl &&
              (I.addCaptionHTMLFn(i.currItem, h),
              P(h, "caption--empty", !i.currItem.title)),
            !0)),
            R || r(),
            n();
        }),
        (A.updateFullscreen = function (e) {
          e &&
            setTimeout(function () {
              i.setScrollOffset(0, a.getScrollY());
            }, 50),
            a[(f.isFullscreen() ? "add" : "remove") + "Class"](
              i.template,
              "pswp--fs"
            );
        }),
        (A.updateIndexIndicator = function () {
          I.counterEl &&
            (t.innerHTML =
              i.getCurrentIndex() +
              1 +
              I.indexIndicatorSep +
              I.getNumItemsFn());
        }),
        (A.onGlobalTap = function (e) {
          var t = (e = e || window.event).target || e.srcElement;
          if (!k)
            if (e.detail && "mouse" === e.detail.pointerType)
              o(t)
                ? i.close()
                : a.hasClass(t, "pswp__img") &&
                  (1 === i.getZoomLevel() &&
                  i.getZoomLevel() <= i.currItem.fitRatio
                    ? I.clickToCloseNonZoomable && i.close()
                    : i.toggleDesktopZoom(e.detail.releasePoint));
            else if (
              (I.tapToToggleControls &&
                (O ? A.hideControls() : A.showControls()),
              I.tapToClose && (a.hasClass(t, "pswp__img") || o(t)))
            )
              return void i.close();
        }),
        (A.onMouseOver = function (e) {
          e = (e = e || window.event).target || e.srcElement;
          P(p, "ui--over-close", o(e));
        }),
        (A.hideControls = function () {
          a.addClass(p, "pswp__ui--hidden"), (O = !1);
        }),
        (A.showControls = function () {
          (O = !0), D || A.update(), a.removeClass(p, "pswp__ui--hidden");
        }),
        (A.supportsFullscreen = function () {
          var e = document;
          return !!(
            e.exitFullscreen ||
            e.mozCancelFullScreen ||
            e.webkitExitFullscreen ||
            e.msExitFullscreen
          );
        }),
        (A.getFullscreenAPI = function () {
          var e,
            t = document.documentElement,
            n = "fullscreenchange";
          return (
            t.requestFullscreen
              ? (e = {
                  enterK: "requestFullscreen",
                  exitK: "exitFullscreen",
                  elementK: "fullscreenElement",
                  eventK: n,
                })
              : t.mozRequestFullScreen
              ? (e = {
                  enterK: "mozRequestFullScreen",
                  exitK: "mozCancelFullScreen",
                  elementK: "mozFullScreenElement",
                  eventK: "moz" + n,
                })
              : t.webkitRequestFullscreen
              ? (e = {
                  enterK: "webkitRequestFullscreen",
                  exitK: "webkitExitFullscreen",
                  elementK: "webkitFullscreenElement",
                  eventK: "webkit" + n,
                })
              : t.msRequestFullscreen &&
                (e = {
                  enterK: "msRequestFullscreen",
                  exitK: "msExitFullscreen",
                  elementK: "msFullscreenElement",
                  eventK: "MSFullscreenChange",
                }),
            e &&
              ((e.enter = function () {
                return (
                  (y = I.closeOnScroll),
                  (I.closeOnScroll = !1),
                  "webkitRequestFullscreen" !== this.enterK
                    ? i.template[this.enterK]()
                    : void i.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                );
              }),
              (e.exit = function () {
                return (I.closeOnScroll = y), document[this.exitK]();
              }),
              (e.isFullscreen = function () {
                return document[this.elementK];
              })),
            e
          );
        });
    };
  }),
  !(function (s) {
    "use strict";
    function n() {
      return !1;
    }
    function o(e, t) {
      return (
        (this.settings = t),
        (this.el = e),
        (this.$el = s(e)),
        this._initElements(),
        this
      );
    }
    var e = "kinetic-active";
    window.requestAnimationFrame ||
      (window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 1e3 / 60);
        }),
      (s.support = s.support || {}),
      s.extend(s.support, { touch: "ontouchend" in document });
    (o.DATA_KEY = "kinetic"),
      (o.DEFAULTS = {
        cursor: "move",
        decelerate: !0,
        triggerHardware: !1,
        threshold: 0,
        y: !0,
        x: !0,
        slowdown: 0.9,
        maxvelocity: 40,
        throttleFPS: 60,
        movingClass: {
          up: "kinetic-moving-up",
          down: "kinetic-moving-down",
          left: "kinetic-moving-left",
          right: "kinetic-moving-right",
        },
        deceleratingClass: {
          up: "kinetic-decelerating-up",
          down: "kinetic-decelerating-down",
          left: "kinetic-decelerating-left",
          right: "kinetic-decelerating-right",
        },
      }),
      (o.prototype.start = function (e) {
        (this.settings = s.extend(this.settings, e)),
          (this.velocity = e.velocity || this.velocity),
          (this.velocityY = e.velocityY || this.velocityY),
          (this.settings.decelerate = !1),
          this._move();
      }),
      (o.prototype.end = function () {
        this.settings.decelerate = !0;
      }),
      (o.prototype.stop = function () {
        (this.velocity = 0),
          (this.velocityY = 0),
          (this.settings.decelerate = !0),
          s.isFunction(this.settings.stopped) &&
            this.settings.stopped.call(this);
      }),
      (o.prototype.detach = function () {
        this._detachListeners(), this.$el.removeClass(e).css("cursor", "");
      }),
      (o.prototype.attach = function () {
        this.$el.hasClass(e) ||
          (this._attachListeners(this.$el),
          this.$el.addClass(e).css("cursor", this.settings.cursor));
      }),
      (o.prototype._initElements = function () {
        this.$el.addClass(e),
          s.extend(this, {
            xpos: null,
            prevXPos: !1,
            ypos: null,
            prevYPos: !1,
            mouseDown: !1,
            throttleTimeout: 1e3 / this.settings.throttleFPS,
            lastMove: null,
            elementFocused: null,
          }),
          (this.velocity = 0),
          (this.velocityY = 0),
          s(document)
            .mouseup(s.proxy(this._resetMouse, this))
            .click(s.proxy(this._resetMouse, this)),
          this._initEvents(),
          this.$el.css("cursor", this.settings.cursor),
          this.settings.triggerHardware &&
            this.$el.css({
              "-webkit-transform": "translate3d(0,0,0)",
              "-webkit-perspective": "1000",
              "-webkit-backface-visibility": "hidden",
            });
      }),
      (o.prototype._initEvents = function () {
        var n = this;
        (this.settings.events = {
          touchStart: function (e) {
            var t;
            n._useTarget(e.target, e) &&
              ((t = e.originalEvent.touches[0]),
              (n.threshold = n._threshold(e.target, e)),
              n._start(t.clientX, t.clientY),
              e.stopPropagation());
          },
          touchMove: function (e) {
            var t;
            n.mouseDown &&
              ((t = e.originalEvent.touches[0]),
              n._inputmove(t.clientX, t.clientY),
              e.preventDefault && e.preventDefault());
          },
          inputDown: function (e) {
            n._useTarget(e.target, e) &&
              ((n.threshold = n._threshold(e.target, e)),
              n._start(e.clientX, e.clientY),
              (n.elementFocused = e.target),
              "IMG" === e.target.nodeName && e.preventDefault(),
              e.stopPropagation());
          },
          inputEnd: function (e) {
            n._useTarget(e.target, e) &&
              (n._end(),
              (n.elementFocused = null),
              e.preventDefault && e.preventDefault());
          },
          inputMove: function (e) {
            n.mouseDown &&
              (n._inputmove(e.clientX, e.clientY),
              e.preventDefault && e.preventDefault());
          },
          scroll: function (e) {
            s.isFunction(n.settings.moved) &&
              n.settings.moved.call(n, n.settings),
              e.preventDefault && e.preventDefault();
          },
          inputClick: function (e) {
            return 0 < Math.abs(n.velocity) ? (e.preventDefault(), !1) : void 0;
          },
          dragStart: function (e) {
            return (!n._useTarget(e.target, e) || !n.elementFocused) && void 0;
          },
        }),
          this._attachListeners(this.$el, this.settings);
      }),
      (o.prototype._inputmove = function (e, t) {
        var n = this.$el;
        if (
          (this.el,
          (!this.lastMove ||
            new Date() >
              new Date(this.lastMove.getTime() + this.throttleTimeout)) &&
            ((this.lastMove = new Date()),
            this.mouseDown && (this.xpos || this.ypos)))
        ) {
          var i = e - this.xpos,
            r = t - this.ypos;
          if (0 < this.threshold) {
            var o = Math.sqrt(i * i + r * r);
            if (this.threshold > o) return;
            this.threshold = 0;
          }
          this.elementFocused &&
            (s(this.elementFocused).blur(),
            (this.elementFocused = null),
            n.focus()),
            (this.settings.decelerate = !1),
            (this.velocity = this.velocityY = 0);
          (o = this.scrollLeft()), (n = this.scrollTop());
          this.scrollLeft(this.settings.x ? o - i : o),
            this.scrollTop(this.settings.y ? n - r : n),
            (this.prevXPos = this.xpos),
            (this.prevYPos = this.ypos),
            (this.xpos = e),
            (this.ypos = t),
            this._calculateVelocities(),
            this._setMoveClasses(this.settings.movingClass),
            s.isFunction(this.settings.moved) &&
              this.settings.moved.call(this, this.settings);
        }
      }),
      (o.prototype._calculateVelocities = function () {
        (this.velocity = this._capVelocity(
          this.prevXPos - this.xpos,
          this.settings.maxvelocity
        )),
          (this.velocityY = this._capVelocity(
            this.prevYPos - this.ypos,
            this.settings.maxvelocity
          ));
      }),
      (o.prototype._end = function () {
        this.xpos &&
          this.prevXPos &&
          !1 === this.settings.decelerate &&
          ((this.settings.decelerate = !0),
          this._calculateVelocities(),
          (this.xpos = this.prevXPos = this.mouseDown = !1),
          this._move());
      }),
      (o.prototype._useTarget = function (e, t) {
        return (
          !s.isFunction(this.settings.filterTarget) ||
          !1 !== this.settings.filterTarget.call(this, e, t)
        );
      }),
      (o.prototype._threshold = function (e, t) {
        return s.isFunction(this.settings.threshold)
          ? this.settings.threshold.call(this, e, t)
          : this.settings.threshold;
      }),
      (o.prototype._start = function (e, t) {
        (this.mouseDown = !0),
          (this.velocity = this.prevXPos = 0),
          (this.velocityY = this.prevYPos = 0),
          (this.xpos = e),
          (this.ypos = t);
      }),
      (o.prototype._resetMouse = function () {
        (this.xpos = !1), (this.ypos = !1), (this.mouseDown = !1);
      }),
      (o.prototype._decelerateVelocity = function (e, t) {
        return 0 === Math.floor(Math.abs(e)) ? 0 : e * t;
      }),
      (o.prototype._capVelocity = function (e, t) {
        var n = e;
        return 0 < e ? t < e && (n = t) : e < 0 - t && (n = 0 - t), n;
      }),
      (o.prototype._setMoveClasses = function (e) {
        var t = this.settings,
          n = this.$el;
        n
          .removeClass(t.movingClass.up)
          .removeClass(t.movingClass.down)
          .removeClass(t.movingClass.left)
          .removeClass(t.movingClass.right)
          .removeClass(t.deceleratingClass.up)
          .removeClass(t.deceleratingClass.down)
          .removeClass(t.deceleratingClass.left)
          .removeClass(t.deceleratingClass.right),
          0 < this.velocity && n.addClass(e.right),
          this.velocity < 0 && n.addClass(e.left),
          0 < this.velocityY && n.addClass(e.down),
          this.velocityY < 0 && n.addClass(e.up);
      }),
      (o.prototype._move = function () {
        this.$el;
        var e = this.el,
          t = this,
          n = t.settings;
        n.x && 0 < e.scrollWidth
          ? (this.scrollLeft(this.scrollLeft() + this.velocity),
            0 < Math.abs(this.velocity) &&
              (this.velocity = n.decelerate
                ? t._decelerateVelocity(this.velocity, n.slowdown)
                : this.velocity))
          : (this.velocity = 0),
          n.y && 0 < e.scrollHeight
            ? (this.scrollTop(this.scrollTop() + this.velocityY),
              0 < Math.abs(this.velocityY) &&
                (this.velocityY = n.decelerate
                  ? t._decelerateVelocity(this.velocityY, n.slowdown)
                  : this.velocityY))
            : (this.velocityY = 0),
          t._setMoveClasses(n.deceleratingClass),
          s.isFunction(n.moved) && n.moved.call(this, n),
          0 < Math.abs(this.velocity) || 0 < Math.abs(this.velocityY)
            ? this.moving ||
              ((this.moving = !0),
              window.requestAnimationFrame(function () {
                (t.moving = !1), t._move();
              }))
            : t.stop();
      }),
      (o.prototype._getScroller = function () {
        var e = this.$el;
        return (e = this.$el.is("body") || this.$el.is("html") ? s(window) : e);
      }),
      (o.prototype.scrollLeft = function (e) {
        var t = this._getScroller();
        return "number" != typeof e
          ? t.scrollLeft()
          : (t.scrollLeft(e), void (this.settings.scrollLeft = e));
      }),
      (o.prototype.scrollTop = function (e) {
        var t = this._getScroller();
        return "number" != typeof e
          ? t.scrollTop()
          : (t.scrollTop(e), void (this.settings.scrollTop = e));
      }),
      (o.prototype._attachListeners = function () {
        var e = this.$el,
          t = this.settings;
        s.support.touch &&
          e
            .bind("touchstart", t.events.touchStart)
            .bind("touchend", t.events.inputEnd)
            .bind("touchmove", t.events.touchMove),
          e
            .mousedown(t.events.inputDown)
            .mouseup(t.events.inputEnd)
            .mousemove(t.events.inputMove),
          e
            .click(t.events.inputClick)
            .scroll(t.events.scroll)
            .bind("selectstart", n)
            .bind("dragstart", t.events.dragStart);
      }),
      (o.prototype._detachListeners = function () {
        var e = this.$el,
          t = this.settings;
        s.support.touch &&
          e
            .unbind("touchstart", t.events.touchStart)
            .unbind("touchend", t.events.inputEnd)
            .unbind("touchmove", t.events.touchMove),
          e
            .unbind("mousedown", t.events.inputDown)
            .unbind("mouseup", t.events.inputEnd)
            .unbind("mousemove", t.events.inputMove),
          e
            .unbind("click", t.events.inputClick)
            .unbind("scroll", t.events.scroll)
            .unbind("selectstart", n)
            .unbind("dragstart", t.events.dragStart);
      }),
      (s.Kinetic = o),
      (s.fn.kinetic = function (i, r) {
        return this.each(function () {
          var e = s(this),
            t = e.data(o.DATA_KEY),
            n = s.extend({}, o.DEFAULTS, e.data(), "object" == typeof i && i);
          t || e.data(o.DATA_KEY, (t = new o(this, n))),
            "string" == typeof i && t[i](r);
        });
      });
  })(window.jQuery || window.Zepto),
  !(function (c) {
    "use strict";
    function i(e, t) {
      var n;
      if (!(this instanceof i)) return (n = new i(e, t)).open(), n;
      (this.id = i.id++),
        this.setup(e, t),
        this.chainCallbacks(i._callbackChain);
    }
    if (void 0 === c)
      return (
        "console" in window &&
        window.console.info("Too much lightness, Featherlight needs jQuery.")
      );
    if (c.fn.jquery.match(/-ajax/))
      return (
        "console" in window &&
        window.console.info(
          "Featherlight needs regular jQuery, not the slim version."
        )
      );
    function r(t) {
      return (s = c.grep(s, function (e) {
        return e !== t && 0 < e.$instance.closest("body").length;
      }));
    }
    function n(e) {
      c.each(i.opened().reverse(), function () {
        return e.isDefaultPrevented() || !1 !== this[l[e.type]](e)
          ? void 0
          : (e.preventDefault(), e.stopPropagation(), !1);
      });
    }
    function o(e) {
      var t;
      e !== i._globalHandlerInstalled &&
        ((i._globalHandlerInstalled = e),
        (t = c
          .map(l, function (e, t) {
            return t + "." + i.prototype.namespace;
          })
          .join(" ")),
        c(window)[e ? "on" : "off"](t, n));
    }
    var s = [],
      a = {
        allow: 1,
        allowfullscreen: 1,
        frameborder: 1,
        height: 1,
        longdesc: 1,
        marginheight: 1,
        marginwidth: 1,
        mozallowfullscreen: 1,
        name: 1,
        referrerpolicy: 1,
        sandbox: 1,
        scrolling: 1,
        src: 1,
        srcdoc: 1,
        style: 1,
        webkitallowfullscreen: 1,
        width: 1,
      },
      l = { keyup: "onKeyUp", resize: "onResize" };
    (i.prototype = {
      constructor: i,
      namespace: "featherlight",
      targetAttr: "data-featherlight",
      variant: null,
      resetCss: !1,
      background: null,
      openTrigger: "click",
      closeTrigger: "click",
      filter: null,
      root: "body",
      openSpeed: 250,
      closeSpeed: 250,
      closeOnClick: "background",
      closeOnEsc: !0,
      closeIcon: "&#10005;",
      loading: "",
      persist: !1,
      otherClose: null,
      beforeOpen: c.noop,
      beforeContent: c.noop,
      beforeClose: c.noop,
      afterOpen: c.noop,
      afterContent: c.noop,
      afterClose: c.noop,
      onKeyUp: c.noop,
      onResize: c.noop,
      type: null,
      contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
      setup: function (e, t) {
        "object" != typeof e ||
          e instanceof c != 0 ||
          t ||
          ((t = e), (e = void 0));
        var n = c.extend(this, t, { target: e }),
          t = n.resetCss ? n.namespace + "-reset" : n.namespace,
          e = c(
            n.background ||
              [
                '<div class="' + t + "-loading " + t + '">',
                '<div class="' + t + '-content">',
                '<button class="' +
                  t +
                  "-close-icon " +
                  n.namespace +
                  '-close" aria-label="Close">',
                n.closeIcon,
                "</button>",
                '<div class="' +
                  n.namespace +
                  '-inner">' +
                  n.loading +
                  "</div>",
                "</div>",
                "</div>",
              ].join("")
          ),
          i =
            "." +
            n.namespace +
            "-close" +
            (n.otherClose ? "," + n.otherClose : "");
        return (
          (n.$instance = e.clone().addClass(n.variant)),
          n.$instance.on(n.closeTrigger + "." + n.namespace, function (e) {
            var t;
            e.isDefaultPrevented() ||
              ((t = c(e.target)),
              (("background" === n.closeOnClick && t.is("." + n.namespace)) ||
                "anywhere" === n.closeOnClick ||
                t.closest(i).length) &&
                (n.close(e), e.preventDefault()));
          }),
          this
        );
      },
      getContent: function () {
        if (!1 !== this.persist && this.$content) return this.$content;
        function e(e) {
          return t.$currentTarget && t.$currentTarget.attr(e);
        }
        var t = this,
          n = this.constructor.contentFilters,
          i = e(t.targetAttr),
          r = t.target || i || "",
          o = n[t.type];
        if (
          (!o && r in n && ((o = n[r]), (r = t.target && i)),
          (r = r || e("href") || ""),
          !o)
        )
          for (var s in n) t[s] && ((o = n[s]), (r = t[s]));
        if (!o) {
          var a = r,
            r = null;
          if (
            (c.each(t.contentFilters, function () {
              return (
                (o = n[this]),
                !(r =
                  !(r = o.test ? o.test(a) : r) &&
                  o.regex &&
                  a.match &&
                  a.match(o.regex)
                    ? a
                    : r)
              );
            }),
            !r)
          )
            return (
              "console" in window &&
                window.console.error(
                  "Featherlight: no content filter found " +
                    (a ? ' for "' + a + '"' : " (no target specified)")
                ),
              !1
            );
        }
        return o.process.call(t, r);
      },
      setContent: function (e) {
        return (
          this.$instance.removeClass(this.namespace + "-loading"),
          this.$instance.toggleClass(
            this.namespace + "-iframe",
            e.is("iframe")
          ),
          this.$instance
            .find("." + this.namespace + "-inner")
            .not(e)
            .slice(1)
            .remove()
            .end()
            .replaceWith(c.contains(this.$instance[0], e[0]) ? "" : e),
          (this.$content = e.addClass(this.namespace + "-inner")),
          this
        );
      },
      open: function (t) {
        var n = this;
        if (
          (n.$instance.hide().appendTo(n.root),
          !((t && t.isDefaultPrevented()) || !1 === n.beforeOpen(t)))
        ) {
          t && t.preventDefault();
          var e = n.getContent();
          if (e)
            return (
              s.push(n),
              o(!0),
              n.$instance.fadeIn(n.openSpeed),
              n.beforeContent(t),
              c
                .when(e)
                .always(function (e) {
                  n.setContent(e), n.afterContent(t);
                })
                .then(n.$instance.promise())
                .done(function () {
                  n.afterOpen(t);
                })
            );
        }
        return n.$instance.detach(), c.Deferred().reject().promise();
      },
      close: function (e) {
        var t = this,
          n = c.Deferred();
        return (
          !1 === t.beforeClose(e)
            ? n.reject()
            : (0 === r(t).length && o(!1),
              t.$instance.fadeOut(t.closeSpeed, function () {
                t.$instance.detach(), t.afterClose(e), n.resolve();
              })),
          n.promise()
        );
      },
      resize: function (e, t) {
        var n;
        e &&
          t &&
          (this.$content.css("width", "").css("height", ""),
          1 <
            (n = Math.max(
              e / (this.$content.parent().width() - 1),
              t / (this.$content.parent().height() - 1)
            )) &&
            ((n = t / Math.floor(t / n)),
            this.$content
              .css("width", e / n + "px")
              .css("height", t / n + "px")));
      },
      chainCallbacks: function (e) {
        for (var t in e) this[t] = c.proxy(e[t], this, c.proxy(this[t], this));
      },
    }),
      c.extend(i, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: i.prototype,
        contentFilters: {
          jquery: {
            regex: /^[#.]\w/,
            test: function (e) {
              return e instanceof c && e;
            },
            process: function (e) {
              return !1 !== this.persist ? c(e) : c(e).clone(!0);
            },
          },
          image: {
            regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
            process: function (e) {
              var t = c.Deferred(),
                n = new Image(),
                i = c(
                  '<img src="' +
                    e +
                    '" alt="" class="' +
                    this.namespace +
                    '-image" />'
                );
              return (
                (n.onload = function () {
                  (i.naturalWidth = n.width),
                    (i.naturalHeight = n.height),
                    t.resolve(i);
                }),
                (n.onerror = function () {
                  t.reject(i);
                }),
                (n.src = e),
                t.promise()
              );
            },
          },
          html: {
            regex: /^\s*<[\w!][^<]*>/,
            process: function (e) {
              return c(e);
            },
          },
          ajax: {
            regex: /./,
            process: function (e) {
              var n = c.Deferred(),
                i = c("<div></div>").load(e, function (e, t) {
                  "error" !== t && n.resolve(i.contents()), n.fail();
                });
              return n.promise();
            },
          },
          iframe: {
            process: function (e) {
              var t = new c.Deferred(),
                n = c("<iframe/>"),
                i = (function (e, t) {
                  var n,
                    i = {},
                    r = new RegExp("^" + t + "([A-Z])(.*)");
                  for (n in e) {
                    var o = n.match(r);
                    o &&
                      (i[
                        (o[1] + o[2].replace(/([A-Z])/g, "-$1")).toLowerCase()
                      ] = e[n]);
                  }
                  return i;
                })(this, "iframe"),
                r = (function (e, t) {
                  var n,
                    i = {};
                  for (n in e) n in t && ((i[n] = e[n]), delete e[n]);
                  return i;
                })(i, a);
              return (
                n
                  .hide()
                  .attr("src", e)
                  .attr(r)
                  .css(i)
                  .on("load", function () {
                    t.resolve(n.show());
                  })
                  .appendTo(
                    this.$instance.find("." + this.namespace + "-content")
                  ),
                t.promise()
              );
            },
          },
          text: {
            process: function (e) {
              return c("<div>", { text: e });
            },
          },
        },
        functionAttributes: [
          "beforeOpen",
          "afterOpen",
          "beforeContent",
          "afterContent",
          "beforeClose",
          "afterClose",
        ],
        readElementConfig: function (e, t) {
          var n = this,
            i = new RegExp("^data-" + t + "-(.*)"),
            r = {};
          return (
            e &&
              e.attributes &&
              c.each(e.attributes, function () {
                var e = this.name.match(i);
                if (e) {
                  var t = this.value,
                    e = c.camelCase(e[1]);
                  if (0 <= c.inArray(e, n.functionAttributes))
                    t = new Function(t);
                  else
                    try {
                      t = JSON.parse(t);
                    } catch (e) {}
                  r[e] = t;
                }
              }),
            r
          );
        },
        extend: function (e, t) {
          function n() {
            this.constructor = e;
          }
          return (
            (n.prototype = this.prototype),
            (e.prototype = new n()),
            (e.__super__ = this.prototype),
            c.extend(e, this, t),
            (e.defaults = e.prototype),
            e
          );
        },
        attach: function (r, o, s) {
          var a = this;
          "object" != typeof o ||
            o instanceof c != 0 ||
            s ||
            ((s = o), (o = void 0));
          function e(e) {
            var t = c(e.currentTarget),
              n = c.extend(
                { $source: r, $currentTarget: t },
                a.readElementConfig(r[0], u.namespace),
                a.readElementConfig(e.currentTarget, u.namespace),
                s
              ),
              i = l || t.data("featherlight-persisted") || new a(o, n);
            "shared" === i.persist
              ? (l = i)
              : !1 !== i.persist && t.data("featherlight-persisted", i),
              n.$currentTarget.blur && n.$currentTarget.blur(),
              i.open(e);
          }
          var l,
            t = (s = c.extend({}, s)).namespace || a.defaults.namespace,
            u = c.extend({}, a.defaults, a.readElementConfig(r[0], t), s);
          return (
            r.on(u.openTrigger + "." + u.namespace, u.filter, e),
            { filter: u.filter, handler: e }
          );
        },
        current: function () {
          var e = this.opened();
          return e[e.length - 1] || null;
        },
        opened: function () {
          var t = this;
          return (
            r(),
            c.grep(s, function (e) {
              return e instanceof t;
            })
          );
        },
        close: function (e) {
          var t = this.current();
          return t ? t.close(e) : void 0;
        },
        _onReady: function () {
          var i,
            r = this;
          r.autoBind &&
            ((i = c(r.autoBind)).each(function () {
              r.attach(c(this));
            }),
            c(document).on("click", r.autoBind, function (e) {
              var t, n;
              e.isDefaultPrevented() ||
                ((t = c(e.currentTarget)),
                i.length !== (i = i.add(t)).length &&
                  (!(n = r.attach(t)).filter ||
                    0 < c(e.target).parentsUntil(t, n.filter).length) &&
                  n.handler(e));
            }));
        },
        _callbackChain: {
          onKeyUp: function (e, t) {
            return 27 === t.keyCode
              ? (this.closeOnEsc && c.featherlight.close(t), !1)
              : e(t);
          },
          beforeOpen: function (e, t) {
            return (
              c(document.documentElement).addClass("with-featherlight"),
              (this._previouslyActive = document.activeElement),
              (this._$previouslyTabbable = c(
                "a, input, select, textarea, iframe, button, iframe, [contentEditable=true]"
              )
                .not("[tabindex]")
                .not(this.$instance.find("button"))),
              (this._$previouslyWithTabIndex =
                c("[tabindex]").not('[tabindex="-1"]')),
              (this._previousWithTabIndices = this._$previouslyWithTabIndex.map(
                function (e, t) {
                  return c(t).attr("tabindex");
                }
              )),
              this._$previouslyWithTabIndex
                .add(this._$previouslyTabbable)
                .attr("tabindex", -1),
              document.activeElement.blur && document.activeElement.blur(),
              e(t)
            );
          },
          afterClose: function (e, t) {
            var e = e(t),
              n = this;
            return (
              this._$previouslyTabbable.removeAttr("tabindex"),
              this._$previouslyWithTabIndex.each(function (e, t) {
                c(t).attr("tabindex", n._previousWithTabIndices[e]);
              }),
              this._previouslyActive.focus(),
              0 === i.opened().length &&
                c(document.documentElement).removeClass("with-featherlight"),
              e
            );
          },
          onResize: function (e, t) {
            return (
              this.resize(
                this.$content.naturalWidth,
                this.$content.naturalHeight
              ),
              e(t)
            );
          },
          afterContent: function (e, t) {
            e = e(t);
            return (
              this.$instance.find("[autofocus]:not([disabled])").focus(),
              this.onResize(t),
              e
            );
          },
        },
      }),
      (c.featherlight = i),
      (c.fn.featherlight = function (e, t) {
        return i.attach(this, e, t), this;
      }),
      c(document).ready(function () {
        i._onReady();
      });
  })(jQuery),
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof module && "undefined" != typeof exports
      ? (module.exports = t())
      : (e.Papa = t());
  })(this, function r() {
    "use strict";
    var u,
      o =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : void 0 !== o
          ? o
          : {},
      s = !o.document && !!o.postMessage,
      a = o.IS_PAPA_WORKER || !1,
      l = {},
      c = 0,
      E = {
        parse: function (e, t) {
          var n = (t = t || {}).dynamicTyping || !1;
          if (
            (z(n) && ((t.dynamicTypingFunction = n), (n = {})),
            (t.dynamicTyping = n),
            (t.transform = !!z(t.transform) && t.transform),
            t.worker && E.WORKERS_SUPPORTED)
          )
            return (
              ((n = (function () {
                if (!E.WORKERS_SUPPORTED) return !1;
                (e = o.URL || o.webkitURL || null), (t = r.toString());
                var e =
                    E.BLOB_URL ||
                    (E.BLOB_URL = e.createObjectURL(
                      new Blob(
                        [
                          "var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ",
                          "(",
                          t,
                          ")();",
                        ],
                        { type: "text/javascript" }
                      )
                    )),
                  t = new o.Worker(e);
                return (t.onmessage = g), (t.id = c++), (l[t.id] = t);
              })()).userStep = t.step),
              (n.userChunk = t.chunk),
              (n.userComplete = t.complete),
              (n.userError = t.error),
              (t.step = z(t.step)),
              (t.chunk = z(t.chunk)),
              (t.complete = z(t.complete)),
              (t.error = z(t.error)),
              delete t.worker,
              void n.postMessage({ input: e, config: t, workerId: n.id })
            );
          var i,
            n = null;
          return (
            E.NODE_STREAM_INPUT,
            "string" == typeof e
              ? ((e = 65279 === (i = e).charCodeAt(0) ? i.slice(1) : i),
                (n = new (t.download ? f : h)(t)))
              : !0 === e.readable && z(e.read) && z(e.on)
              ? (n = new m(t))
              : ((o.File && e instanceof File) || e instanceof Object) &&
                (n = new p(t)),
            n.stream(e)
          );
        },
        unparse: function (e, t) {
          var r = !1,
            g = !0,
            v = ",",
            y = "\r\n",
            o = '"',
            s = o + o,
            n = !1,
            i = null,
            a = !1;
          if ("object" == typeof t) {
            if (
              ("string" != typeof t.delimiter ||
                E.BAD_DELIMITERS.filter(function (e) {
                  return -1 !== t.delimiter.indexOf(e);
                }).length ||
                (v = t.delimiter),
              ("boolean" != typeof t.quotes &&
                "function" != typeof t.quotes &&
                !Array.isArray(t.quotes)) ||
                (r = t.quotes),
              ("boolean" != typeof t.skipEmptyLines &&
                "string" != typeof t.skipEmptyLines) ||
                (n = t.skipEmptyLines),
              "string" == typeof t.newline && (y = t.newline),
              "string" == typeof t.quoteChar && (o = t.quoteChar),
              "boolean" == typeof t.header && (g = t.header),
              Array.isArray(t.columns))
            ) {
              if (0 === t.columns.length)
                throw new Error("Option columns is empty");
              i = t.columns;
            }
            void 0 !== t.escapeChar && (s = t.escapeChar + o),
              ("boolean" == typeof t.escapeFormulae ||
                t.escapeFormulae instanceof RegExp) &&
                (a =
                  t.escapeFormulae instanceof RegExp
                    ? t.escapeFormulae
                    : /^[=+\-@\t\r].*$/);
          }
          var l = new RegExp(H(o), "g");
          if (("string" == typeof e && (e = JSON.parse(e)), Array.isArray(e))) {
            if (!e.length || Array.isArray(e[0])) return u(null, e, n);
            if ("object" == typeof e[0]) return u(i || Object.keys(e[0]), e, n);
          } else if ("object" == typeof e)
            return (
              "string" == typeof e.data && (e.data = JSON.parse(e.data)),
              Array.isArray(e.data) &&
                (e.fields || (e.fields = (e.meta && e.meta.fields) || i),
                e.fields ||
                  (e.fields = Array.isArray(e.data[0])
                    ? e.fields
                    : "object" == typeof e.data[0]
                    ? Object.keys(e.data[0])
                    : []),
                Array.isArray(e.data[0]) ||
                  "object" == typeof e.data[0] ||
                  (e.data = [e.data])),
              u(e.fields || [], e.data || [], n)
            );
          throw new Error("Unable to serialize unrecognized input");
          function u(e, t, n) {
            var i = "",
              r =
                ("string" == typeof e && (e = JSON.parse(e)),
                "string" == typeof t && (t = JSON.parse(t)),
                Array.isArray(e) && 0 < e.length),
              o = !Array.isArray(t[0]);
            if (r && g) {
              for (var s = 0; s < e.length; s++)
                0 < s && (i += v), (i += _(e[s], s));
              0 < t.length && (i += y);
            }
            for (var a = 0; a < t.length; a++) {
              var l = (r ? e : t[a]).length,
                u = !1,
                c = r ? 0 === Object.keys(t[a]).length : 0 === t[a].length;
              if (
                (n &&
                  !r &&
                  (u =
                    "greedy" === n
                      ? "" === t[a].join("").trim()
                      : 1 === t[a].length && 0 === t[a][0].length),
                "greedy" === n && r)
              ) {
                for (var d = [], f = 0; f < l; f++) {
                  var p = o ? e[f] : f;
                  d.push(t[a][p]);
                }
                u = "" === d.join("").trim();
              }
              if (!u) {
                for (var h = 0; h < l; h++) {
                  0 < h && !c && (i += v);
                  var m = r && o ? e[h] : h;
                  i += _(t[a][m], h);
                }
                a < t.length - 1 && (!n || (0 < l && !c)) && (i += y);
              }
            }
            return i;
          }
          function _(e, t) {
            if (null == e) return "";
            if (e.constructor === Date) return JSON.stringify(e).slice(1, 25);
            var n = !1,
              i =
                (a &&
                  "string" == typeof e &&
                  a.test(e) &&
                  ((e = "'" + e), (n = !0)),
                e.toString().replace(l, s));
            return (n =
              n ||
              !0 === r ||
              ("function" == typeof r && r(e, t)) ||
              (Array.isArray(r) && r[t]) ||
              (function (e, t) {
                for (var n = 0; n < t.length; n++)
                  if (-1 < e.indexOf(t[n])) return !0;
                return !1;
              })(i, E.BAD_DELIMITERS) ||
              -1 < i.indexOf(v) ||
              " " === i.charAt(0) ||
              " " === i.charAt(i.length - 1))
              ? o + i + o
              : i;
          }
        },
      };
    function d(e) {
      (this._handle = null),
        (this._finished = !1),
        (this._completed = !1),
        (this._halted = !1),
        (this._input = null),
        (this._baseIndex = 0),
        (this._partialLine = ""),
        (this._rowCount = 0),
        (this._start = 0),
        (this._nextChunk = null),
        (this.isFirstChunk = !0),
        (this._completeResults = { data: [], errors: [], meta: {} }),
        function (e) {
          var t = w(e);
          (t.chunkSize = parseInt(t.chunkSize)),
            e.step || e.chunk || (t.chunkSize = null),
            (this._handle = new n(t)),
            ((this._handle.streamer = this)._config = t);
        }.call(this, e),
        (this.parseChunk = function (e, t) {
          this.isFirstChunk &&
            z(this._config.beforeFirstChunk) &&
            void 0 !== (n = this._config.beforeFirstChunk(e)) &&
            (e = n),
            (this.isFirstChunk = !1),
            (this._halted = !1);
          var n = this._partialLine + e,
            e =
              ((this._partialLine = ""),
              this._handle.parse(n, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            var i = e.meta.cursor,
              n =
                (this._finished ||
                  ((this._partialLine = n.substring(i - this._baseIndex)),
                  (this._baseIndex = i)),
                e && e.data && (this._rowCount += e.data.length),
                this._finished ||
                  (this._config.preview &&
                    this._rowCount >= this._config.preview));
            if (a)
              o.postMessage({ results: e, workerId: E.WORKER_ID, finished: n });
            else if (z(this._config.chunk) && !t) {
              if (
                (this._config.chunk(e, this._handle),
                this._handle.paused() || this._handle.aborted())
              )
                return void (this._halted = !0);
              this._completeResults = e = void 0;
            }
            return (
              this._config.step ||
                this._config.chunk ||
                ((this._completeResults.data =
                  this._completeResults.data.concat(e.data)),
                (this._completeResults.errors =
                  this._completeResults.errors.concat(e.errors)),
                (this._completeResults.meta = e.meta)),
              this._completed ||
                !n ||
                !z(this._config.complete) ||
                (e && e.meta.aborted) ||
                (this._config.complete(this._completeResults, this._input),
                (this._completed = !0)),
              n || (e && e.meta.paused) || this._nextChunk(),
              e
            );
          }
          this._halted = !0;
        }),
        (this._sendError = function (e) {
          z(this._config.error)
            ? this._config.error(e)
            : a &&
              this._config.error &&
              o.postMessage({ workerId: E.WORKER_ID, error: e, finished: !1 });
        });
    }
    function f(e) {
      var i;
      (e = e || {}).chunkSize || (e.chunkSize = E.RemoteChunkSize),
        d.call(this, e),
        (this._nextChunk = s
          ? function () {
              this._readChunk(), this._chunkLoaded();
            }
          : function () {
              this._readChunk();
            }),
        (this.stream = function (e) {
          (this._input = e), this._nextChunk();
        }),
        (this._readChunk = function () {
          if (this._finished) this._chunkLoaded();
          else {
            if (
              ((i = new XMLHttpRequest()),
              this._config.withCredentials &&
                (i.withCredentials = this._config.withCredentials),
              s ||
                ((i.onload = _(this._chunkLoaded, this)),
                (i.onerror = _(this._chunkError, this))),
              i.open(
                this._config.downloadRequestBody ? "POST" : "GET",
                this._input,
                !s
              ),
              this._config.downloadRequestHeaders)
            ) {
              var e,
                t = this._config.downloadRequestHeaders;
              for (e in t) i.setRequestHeader(e, t[e]);
            }
            var n;
            this._config.chunkSize &&
              ((n = this._start + this._config.chunkSize - 1),
              i.setRequestHeader("Range", "bytes=" + this._start + "-" + n));
            try {
              i.send(this._config.downloadRequestBody);
            } catch (t) {
              this._chunkError(t.message);
            }
            s && 0 === i.status && this._chunkError();
          }
        }),
        (this._chunkLoaded = function () {
          var e;
          4 === i.readyState &&
            (i.status < 200 || 400 <= i.status
              ? this._chunkError()
              : ((this._start +=
                  this._config.chunkSize || i.responseText.length),
                (this._finished =
                  !this._config.chunkSize ||
                  this._start >=
                    (null === (e = i.getResponseHeader("Content-Range"))
                      ? -1
                      : parseInt(e.substring(e.lastIndexOf("/") + 1)))),
                this.parseChunk(i.responseText)));
        }),
        (this._chunkError = function (e) {
          e = i.statusText || e;
          this._sendError(new Error(e));
        });
    }
    function p(e) {
      (e = e || {}).chunkSize || (e.chunkSize = E.LocalChunkSize),
        d.call(this, e);
      var n,
        i,
        r = "undefined" != typeof FileReader;
      (this.stream = function (e) {
        (this._input = e),
          (i = e.slice || e.webkitSlice || e.mozSlice),
          r
            ? (((n = new FileReader()).onload = _(this._chunkLoaded, this)),
              (n.onerror = _(this._chunkError, this)))
            : (n = new FileReaderSync()),
          this._nextChunk();
      }),
        (this._nextChunk = function () {
          this._finished ||
            (this._config.preview &&
              !(this._rowCount < this._config.preview)) ||
            this._readChunk();
        }),
        (this._readChunk = function () {
          var e = this._input,
            t =
              (this._config.chunkSize &&
                ((t = Math.min(
                  this._start + this._config.chunkSize,
                  this._input.size
                )),
                (e = i.call(e, this._start, t))),
              n.readAsText(e, this._config.encoding));
          r || this._chunkLoaded({ target: { result: t } });
        }),
        (this._chunkLoaded = function (e) {
          (this._start += this._config.chunkSize),
            (this._finished =
              !this._config.chunkSize || this._start >= this._input.size),
            this.parseChunk(e.target.result);
        }),
        (this._chunkError = function () {
          this._sendError(n.error);
        });
    }
    function h(e) {
      var n;
      d.call(this, (e = e || {})),
        (this.stream = function (e) {
          return (n = e), this._nextChunk();
        }),
        (this._nextChunk = function () {
          var e, t;
          if (!this._finished)
            return (
              (t = this._config.chunkSize),
              (n = t
                ? ((e = n.substring(0, t)), n.substring(t))
                : ((e = n), "")),
              (this._finished = !n),
              this.parseChunk(e)
            );
        });
    }
    function m(e) {
      d.call(this, (e = e || {}));
      var t = [],
        n = !0,
        i = !1;
      (this.pause = function () {
        d.prototype.pause.apply(this, arguments), this._input.pause();
      }),
        (this.resume = function () {
          d.prototype.resume.apply(this, arguments), this._input.resume();
        }),
        (this.stream = function (e) {
          (this._input = e),
            this._input.on("data", this._streamData),
            this._input.on("end", this._streamEnd),
            this._input.on("error", this._streamError);
        }),
        (this._checkIsFinished = function () {
          i && 1 === t.length && (this._finished = !0);
        }),
        (this._nextChunk = function () {
          this._checkIsFinished(),
            t.length ? this.parseChunk(t.shift()) : (n = !0);
        }),
        (this._streamData = _(function (e) {
          try {
            t.push(
              "string" == typeof e ? e : e.toString(this._config.encoding)
            ),
              n &&
                ((n = !1), this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e) {
            this._streamError(e);
          }
        }, this)),
        (this._streamError = _(function (e) {
          this._streamCleanUp(), this._sendError(e);
        }, this)),
        (this._streamEnd = _(function () {
          this._streamCleanUp(), (i = !0), this._streamData("");
        }, this)),
        (this._streamCleanUp = _(function () {
          this._input.removeListener("data", this._streamData),
            this._input.removeListener("end", this._streamEnd),
            this._input.removeListener("error", this._streamError);
        }, this));
    }
    function n(v) {
      var r,
        o,
        s,
        t,
        l = Math.pow(2, 53),
        u = -l,
        c = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,
        d =
          /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,
        n = this,
        i = 0,
        f = 0,
        a = !1,
        e = !1,
        p = [],
        h = { data: [], errors: [], meta: {} };
      function y(e) {
        return "greedy" === v.skipEmptyLines
          ? "" === e.join("").trim()
          : 1 === e.length && 0 === e[0].length;
      }
      function m() {
        if (
          (h &&
            s &&
            (_(
              "Delimiter",
              "UndetectableDelimiter",
              "Unable to auto-detect delimiting character; defaulted to '" +
                E.DefaultDelimiter +
                "'"
            ),
            (s = !1)),
          v.skipEmptyLines &&
            (h.data = h.data.filter(function (e) {
              return !y(e);
            })),
          g())
        ) {
          if (h)
            if (Array.isArray(h.data[0])) {
              for (var e = 0; g() && e < h.data.length; e++)
                h.data[e].forEach(t);
              h.data.splice(0, 1);
            } else h.data.forEach(t);
          function t(e, t) {
            z(v.transformHeader) && (e = v.transformHeader(e, t)), p.push(e);
          }
        }
        function n(e, t) {
          for (var n, i, r = v.header ? {} : [], o = 0; o < e.length; o++) {
            var s = o,
              a = e[o];
            v.header && (s = o >= p.length ? "__parsed_extra" : p[o]),
              v.transform && (a = v.transform(a, s)),
              (i = a),
              (n = n = s),
              v.dynamicTypingFunction &&
                void 0 === v.dynamicTyping[n] &&
                (v.dynamicTyping[n] = v.dynamicTypingFunction(n)),
              (a =
                !0 === (v.dynamicTyping[n] || v.dynamicTyping)
                  ? "true" === i ||
                    "TRUE" === i ||
                    ("false" !== i &&
                      "FALSE" !== i &&
                      ((function (e) {
                        if (c.test(e)) {
                          e = parseFloat(e);
                          if (u < e && e < l) return 1;
                        }
                      })(i)
                        ? parseFloat(i)
                        : d.test(i)
                        ? new Date(i)
                        : "" === i
                        ? null
                        : i))
                  : i),
              "__parsed_extra" === s
                ? ((r[s] = r[s] || []), r[s].push(a))
                : (r[s] = a);
          }
          return (
            v.header &&
              (o > p.length
                ? _(
                    "FieldMismatch",
                    "TooManyFields",
                    "Too many fields: expected " +
                      p.length +
                      " fields but parsed " +
                      o,
                    f + t
                  )
                : o < p.length &&
                  _(
                    "FieldMismatch",
                    "TooFewFields",
                    "Too few fields: expected " +
                      p.length +
                      " fields but parsed " +
                      o,
                    f + t
                  )),
            r
          );
        }
        var i;
        h &&
          (v.header || v.dynamicTyping || v.transform) &&
          ((i = 1),
          !h.data.length || Array.isArray(h.data[0])
            ? ((h.data = h.data.map(n)), (i = h.data.length))
            : (h.data = n(h.data, 0)),
          v.header && h.meta && (h.meta.fields = p),
          (f += i));
      }
      function g() {
        return v.header && 0 === p.length;
      }
      function _(e, t, n, i) {
        e = { type: e, code: t, message: n };
        void 0 !== i && (e.row = i), h.errors.push(e);
      }
      z(v.step) &&
        ((t = v.step),
        (v.step = function (e) {
          (h = e),
            g()
              ? m()
              : (m(),
                0 !== h.data.length &&
                  ((i += e.data.length),
                  v.preview && i > v.preview
                    ? o.abort()
                    : ((h.data = h.data[0]), t(h, n))));
        })),
        (this.parse = function (e, t, n) {
          var i = v.quoteChar || '"',
            i =
              (v.newline ||
                (v.newline = (function (e, t) {
                  e = e.substring(0, 1048576);
                  var t = new RegExp(H(t) + "([^]*?)" + H(t), "gm"),
                    n = (e = e.replace(t, "")).split("\r"),
                    t = e.split("\n"),
                    e = 1 < t.length && t[0].length < n[0].length;
                  if (1 === n.length || e) return "\n";
                  for (var i = 0, r = 0; r < n.length; r++)
                    "\n" === n[r][0] && i++;
                  return i >= n.length / 2 ? "\r\n" : "\r";
                })(e, i)),
              (s = !1),
              v.delimiter
                ? z(v.delimiter) &&
                  ((v.delimiter = v.delimiter(e)),
                  (h.meta.delimiter = v.delimiter))
                : ((i = (function (e, t, n, i, r) {
                    var o, s, a;
                    r = v.delimitersToGuess || [
                      ",",
                      "\t",
                      "|",
                      ";",
                      E.RECORD_SEP,
                      E.UNIT_SEP,
                    ];
                    for (var l = 0; l < r.length; l++) {
                      for (
                        var u,
                          c = r[l],
                          d = 0,
                          f = 0,
                          p = 0,
                          h = void 0,
                          m = new b({
                            comments: i,
                            delimiter: c,
                            newline: t,
                            preview: 10,
                          }).parse(e),
                          g = 0;
                        g < m.data.length;
                        g++
                      )
                        n && y(m.data[g])
                          ? p++
                          : ((f += u = m.data[g].length),
                            void 0 !== h
                              ? 0 < u && ((d += Math.abs(u - h)), (h = u))
                              : (h = u));
                      0 < m.data.length && (f /= m.data.length - p),
                        (void 0 === s || d <= s) &&
                          (void 0 === a || a < f) &&
                          1.99 < f &&
                          ((s = d), (o = c), (a = f));
                    }
                    return {
                      successful: !!(v.delimiter = o),
                      bestDelimiter: o,
                    };
                  })(e, v.newline, v.skipEmptyLines, v.comments)).successful
                    ? (v.delimiter = i.bestDelimiter)
                    : ((s = !0), (v.delimiter = E.DefaultDelimiter)),
                  (h.meta.delimiter = v.delimiter)),
              w(v));
          return (
            v.preview && v.header && i.preview++,
            (r = e),
            (o = new b(i)),
            (h = o.parse(r, t, n)),
            m(),
            a ? { meta: { paused: !0 } } : h || { meta: { paused: !1 } }
          );
        }),
        (this.paused = function () {
          return a;
        }),
        (this.pause = function () {
          (a = !0),
            o.abort(),
            (r = z(v.chunk) ? "" : r.substring(o.getCharIndex()));
        }),
        (this.resume = function () {
          n.streamer._halted
            ? ((a = !1), n.streamer.parseChunk(r, !0))
            : setTimeout(n.resume, 3);
        }),
        (this.aborted = function () {
          return e;
        }),
        (this.abort = function () {
          (e = !0),
            o.abort(),
            (h.meta.aborted = !0),
            z(v.complete) && v.complete(h),
            (r = "");
        });
    }
    function H(e) {
      return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function b(M) {
      var L,
        F = (M = M || {}).delimiter,
        N = M.newline,
        j = M.comments,
        $ = M.step,
        B = M.preview,
        G = M.fastMode,
        q = (L =
          void 0 === M.quoteChar || null === M.quoteChar ? '"' : M.quoteChar);
      if (
        (void 0 !== M.escapeChar && (q = M.escapeChar),
        ("string" != typeof F || -1 < E.BAD_DELIMITERS.indexOf(F)) && (F = ","),
        j === F)
      )
        throw new Error("Comment character same as delimiter");
      !0 === j
        ? (j = "#")
        : ("string" != typeof j || -1 < E.BAD_DELIMITERS.indexOf(j)) &&
          (j = !1),
        "\n" !== N && "\r" !== N && "\r\n" !== N && (N = "\n");
      var U = 0,
        V = !1;
      (this.parse = function (n, t, i) {
        if ("string" != typeof n) throw new Error("Input must be a string");
        var r = n.length,
          e = F.length,
          o = N.length,
          s = j.length,
          a = z($),
          l = [],
          u = [],
          c = [],
          d = (U = 0);
        if (!n) return R();
        if (M.header && !t) {
          var f,
            p,
            h = n.split(N)[0].split(F),
            m = [],
            g = {},
            v = !1;
          for (f in h) {
            var y = h[f],
              _ = (y = z(M.transformHeader) ? M.transformHeader(y, f) : y),
              E = g[y] || 0;
            for (
              0 < E && ((v = !0), (_ = y + "_" + E)), g[y] = E + 1;
              m.includes(_);

            )
              _ = _ + "_" + E;
            m.push(_);
          }
          v && (((p = n.split(N))[0] = m.join(F)), (n = p.join(N)));
        }
        if (G || (!1 !== G && -1 === n.indexOf(L))) {
          for (var b = n.split(N), w = 0; w < b.length; w++) {
            if (((c = b[w]), (U += c.length), w !== b.length - 1))
              U += N.length;
            else if (i) return R();
            if (!j || c.substring(0, s) !== j) {
              if (a) {
                if (((l = []), x(c.split(F)), P(), V)) return R();
              } else x(c.split(F));
              if (B && B <= w) return (l = l.slice(0, B)), R(!0);
            }
          }
          return R();
        }
        for (
          var T = n.indexOf(F, U),
            S = n.indexOf(N, U),
            I = new RegExp(H(q) + H(L), "g"),
            k = n.indexOf(L, U);
          ;

        )
          if (n[U] !== L)
            if (j && 0 === c.length && n.substring(U, U + s) === j) {
              if (-1 === S) return R();
              (U = S + o), (S = n.indexOf(N, U)), (T = n.indexOf(F, U));
            } else if (-1 !== T && (T < S || -1 === S))
              c.push(n.substring(U, T)), (U = T + e), (T = n.indexOf(F, U));
            else {
              if (-1 === S) break;
              if ((c.push(n.substring(U, S)), O(S + o), a && (P(), V)))
                return R();
              if (B && l.length >= B) return R(!0);
            }
          else
            for (k = U, U++; ; ) {
              if (-1 === (k = n.indexOf(L, k + 1)))
                return (
                  i ||
                    u.push({
                      type: "Quotes",
                      code: "MissingQuotes",
                      message: "Quoted field unterminated",
                      row: l.length,
                      index: U,
                    }),
                  D()
                );
              if (k === r - 1) return D(n.substring(U, k).replace(I, L));
              if (L !== q || n[k + 1] !== q) {
                if (L === q || 0 === k || n[k - 1] !== q) {
                  -1 !== T && T < k + 1 && (T = n.indexOf(F, k + 1));
                  var C = A(
                    -1 === (S = -1 !== S && S < k + 1 ? n.indexOf(N, k + 1) : S)
                      ? T
                      : Math.min(T, S)
                  );
                  if (n.substr(k + 1 + C, e) === F) {
                    c.push(n.substring(U, k).replace(I, L)),
                      n[(U = k + 1 + C + e)] !== L && (k = n.indexOf(L, U)),
                      (T = n.indexOf(F, U)),
                      (S = n.indexOf(N, U));
                    break;
                  }
                  C = A(S);
                  if (n.substring(k + 1 + C, k + 1 + C + o) === N) {
                    if (
                      (c.push(n.substring(U, k).replace(I, L)),
                      O(k + 1 + C + o),
                      (T = n.indexOf(F, U)),
                      (k = n.indexOf(L, U)),
                      a && (P(), V))
                    )
                      return R();
                    if (B && l.length >= B) return R(!0);
                    break;
                  }
                  u.push({
                    type: "Quotes",
                    code: "InvalidQuotes",
                    message: "Trailing quote on quoted field is malformed",
                    row: l.length,
                    index: U,
                  }),
                    k++;
                }
              } else k++;
            }
        return D();
        function x(e) {
          l.push(e), (d = U);
        }
        function A(e) {
          var t = 0;
          return (t =
            -1 !== e && (e = n.substring(k + 1, e)) && "" === e.trim()
              ? e.length
              : t);
        }
        function D(e) {
          return (
            i ||
              (void 0 === e && (e = n.substring(U)),
              c.push(e),
              (U = r),
              x(c),
              a && P()),
            R()
          );
        }
        function O(e) {
          (U = e), x(c), (c = []), (S = n.indexOf(N, U));
        }
        function R(e) {
          return {
            data: l,
            errors: u,
            meta: {
              delimiter: F,
              linebreak: N,
              aborted: V,
              truncated: !!e,
              cursor: d + (t || 0),
            },
          };
        }
        function P() {
          $(R()), (l = []), (u = []);
        }
      }),
        (this.abort = function () {
          V = !0;
        }),
        (this.getCharIndex = function () {
          return U;
        });
    }
    function g(e) {
      var t = e.data,
        n = l[t.workerId],
        i = !1;
      if (t.error) n.userError(t.error, t.file);
      else if (t.results && t.results.data) {
        var r = {
          abort: function () {
            (i = !0),
              v(t.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          },
          pause: y,
          resume: y,
        };
        if (z(n.userStep)) {
          for (
            var o = 0;
            o < t.results.data.length &&
            (n.userStep(
              {
                data: t.results.data[o],
                errors: t.results.errors,
                meta: t.results.meta,
              },
              r
            ),
            !i);
            o++
          );
          delete t.results;
        } else
          z(n.userChunk) &&
            (n.userChunk(t.results, r, t.file), delete t.results);
      }
      t.finished && !i && v(t.workerId, t.results);
    }
    function v(e, t) {
      var n = l[e];
      z(n.userComplete) && n.userComplete(t), n.terminate(), delete l[e];
    }
    function y() {
      throw new Error("Not implemented.");
    }
    function w(e) {
      if ("object" != typeof e || null === e) return e;
      var t,
        n = Array.isArray(e) ? [] : {};
      for (t in e) n[t] = w(e[t]);
      return n;
    }
    function _(e, t) {
      return function () {
        e.apply(t, arguments);
      };
    }
    function z(e) {
      return "function" == typeof e;
    }
    return (
      (E.RECORD_SEP = String.fromCharCode(30)),
      (E.UNIT_SEP = String.fromCharCode(31)),
      (E.BYTE_ORDER_MARK = "\ufeff"),
      (E.BAD_DELIMITERS = ["\r", "\n", '"', E.BYTE_ORDER_MARK]),
      (E.WORKERS_SUPPORTED = !s && !!o.Worker),
      (E.NODE_STREAM_INPUT = 1),
      (E.LocalChunkSize = 10485760),
      (E.RemoteChunkSize = 5242880),
      (E.DefaultDelimiter = ","),
      (E.Parser = b),
      (E.ParserHandle = n),
      (E.NetworkStreamer = f),
      (E.FileStreamer = p),
      (E.StringStreamer = h),
      (E.ReadableStreamStreamer = m),
      o.jQuery &&
        ((u = o.jQuery).fn.parse = function (s) {
          var n = s.config || {},
            a = [];
          return (
            this.each(function (e) {
              if (
                "INPUT" !== u(this).prop("tagName").toUpperCase() ||
                "file" !== u(this).attr("type").toLowerCase() ||
                !o.FileReader ||
                !this.files ||
                0 === this.files.length
              )
                return !0;
              for (var t = 0; t < this.files.length; t++)
                a.push({
                  file: this.files[t],
                  inputElem: this,
                  instanceConfig: u.extend({}, n),
                });
            }),
            e(),
            this
          );
          function e() {
            if (0 !== a.length) {
              var e,
                t,
                n,
                i = a[0];
              if (z(s.before)) {
                var r = s.before(i.file, i.inputElem);
                if ("object" == typeof r) {
                  if ("abort" === r.action)
                    return (
                      (e = i.file),
                      (t = i.inputElem),
                      (n = r.reason),
                      z(s.error) && s.error({ name: "AbortError" }, e, t, n)
                    );
                  if ("skip" === r.action) return l();
                  "object" == typeof r.config &&
                    (i.instanceConfig = u.extend(i.instanceConfig, r.config));
                } else if ("skip" === r) return l();
              }
              var o = i.instanceConfig.complete;
              (i.instanceConfig.complete = function (e) {
                z(o) && o(e, i.file, i.inputElem), l();
              }),
                E.parse(i.file, i.instanceConfig);
            } else z(s.complete) && s.complete();
          }
          function l() {
            a.splice(0, 1), e();
          }
        }),
      a &&
        (o.onmessage = function (e) {
          var e = e.data;
          void 0 === E.WORKER_ID && e && (E.WORKER_ID = e.workerId),
            "string" == typeof e.input
              ? o.postMessage({
                  workerId: E.WORKER_ID,
                  results: E.parse(e.input, e.config),
                  finished: !0,
                })
              : ((o.File && e.input instanceof File) ||
                  e.input instanceof Object) &&
                (e = E.parse(e.input, e.config)) &&
                o.postMessage({
                  workerId: E.WORKER_ID,
                  results: e,
                  finished: !0,
                });
        }),
      ((f.prototype = Object.create(d.prototype)).constructor = f),
      ((p.prototype = Object.create(d.prototype)).constructor = p),
      ((h.prototype = Object.create(h.prototype)).constructor = h),
      ((m.prototype = Object.create(d.prototype)).constructor = m),
      E
    );
  }),
  !function () {
    var a,
      o,
      r,
      s,
      l = {}.hasOwnProperty;
    function u(e, t) {
      var n, i;
      (this.form_field = e),
        (this.options = null != t ? t : {}),
        (this.label_click_handler =
          ((n = this.label_click_handler),
          (i = this),
          function () {
            return n.apply(i, arguments);
          })),
        u.browser_is_supported() &&
          ((this.is_multiple = this.form_field.multiple),
          this.set_default_text(),
          this.set_default_values(),
          this.setup(),
          this.set_up_html(),
          this.register_observers(),
          this.on_ready());
    }
    function e() {
      (this.options_index = 0), (this.parsed = []);
    }
    (e.prototype.add_node = function (e) {
      return "OPTGROUP" === e.nodeName.toUpperCase()
        ? this.add_group(e)
        : this.add_option(e);
    }),
      (e.prototype.add_group = function (e) {
        var t,
          n,
          i,
          r,
          o,
          s = this.parsed.length;
        for (
          this.parsed.push({
            array_index: s,
            group: !0,
            label: e.label,
            title: e.title || void 0,
            children: 0,
            disabled: e.disabled,
            classes: e.className,
          }),
            o = [],
            t = 0,
            n = (r = e.childNodes).length;
          t < n;
          t++
        )
          (i = r[t]), o.push(this.add_option(i, s, e.disabled));
        return o;
      }),
      (e.prototype.add_option = function (e, t, n) {
        if ("OPTION" === e.nodeName.toUpperCase())
          return (
            "" !== e.text
              ? (null != t && (this.parsed[t].children += 1),
                this.parsed.push({
                  array_index: this.parsed.length,
                  options_index: this.options_index,
                  value: e.value,
                  text: e.text,
                  html: e.innerHTML,
                  title: e.title || void 0,
                  selected: e.selected,
                  disabled: !0 === n ? n : e.disabled,
                  group_array_index: t,
                  group_label: null != t ? this.parsed[t].label : null,
                  classes: e.className,
                  style: e.style.cssText,
                }))
              : this.parsed.push({
                  array_index: this.parsed.length,
                  options_index: this.options_index,
                  empty: !0,
                }),
            (this.options_index += 1)
          );
      }),
      ((s = e).select_to_array = function (e) {
        for (
          var t, n, i = new s(), r = 0, o = (n = e.childNodes).length;
          r < o;
          r++
        )
          (t = n[r]), i.add_node(t);
        return i.parsed;
      }),
      (u.prototype.set_default_values = function () {
        return (
          (this.click_test_action =
            ((n = this),
            function (e) {
              return n.test_active_click(e);
            })),
          (this.activate_action =
            ((t = this),
            function (e) {
              return t.activate_field(e);
            })),
          (this.active_field = !1),
          (this.mouse_on_container = !1),
          (this.results_showing = !1),
          (this.result_highlighted = null),
          (this.is_rtl =
            this.options.rtl ||
            /\bchosen-rtl\b/.test(this.form_field.className)),
          (this.allow_single_deselect =
            null != this.options.allow_single_deselect &&
            null != this.form_field.options[0] &&
            "" === this.form_field.options[0].text &&
            this.options.allow_single_deselect),
          (this.disable_search_threshold =
            this.options.disable_search_threshold || 0),
          (this.disable_search = this.options.disable_search || !1),
          (this.enable_split_word_search =
            null == this.options.enable_split_word_search ||
            this.options.enable_split_word_search),
          (this.group_search =
            null == this.options.group_search || this.options.group_search),
          (this.search_contains = this.options.search_contains || !1),
          (this.single_backstroke_delete =
            null == this.options.single_backstroke_delete ||
            this.options.single_backstroke_delete),
          (this.max_selected_options =
            this.options.max_selected_options || 1 / 0),
          (this.inherit_select_classes =
            this.options.inherit_select_classes || !1),
          (this.display_selected_options =
            null == this.options.display_selected_options ||
            this.options.display_selected_options),
          (this.display_disabled_options =
            null == this.options.display_disabled_options ||
            this.options.display_disabled_options),
          (this.include_group_label_in_selected =
            this.options.include_group_label_in_selected || !1),
          (this.max_shown_results =
            this.options.max_shown_results || Number.POSITIVE_INFINITY),
          (this.case_sensitive_search =
            this.options.case_sensitive_search || !1),
          (this.hide_results_on_select =
            null == this.options.hide_results_on_select ||
            this.options.hide_results_on_select)
        );
        var t, n;
      }),
      (u.prototype.set_default_text = function () {
        return (
          this.form_field.getAttribute("data-placeholder")
            ? (this.default_text =
                this.form_field.getAttribute("data-placeholder"))
            : this.is_multiple
            ? (this.default_text =
                this.options.placeholder_text_multiple ||
                this.options.placeholder_text ||
                u.default_multiple_text)
            : (this.default_text =
                this.options.placeholder_text_single ||
                this.options.placeholder_text ||
                u.default_single_text),
          (this.default_text = this.escape_html(this.default_text)),
          (this.results_none_found =
            this.form_field.getAttribute("data-no_results_text") ||
            this.options.no_results_text ||
            u.default_no_result_text)
        );
      }),
      (u.prototype.choice_label = function (e) {
        return this.include_group_label_in_selected && null != e.group_label
          ? "<b class='group-name'>" +
              this.escape_html(e.group_label) +
              "</b>" +
              e.html
          : e.html;
      }),
      (u.prototype.mouse_enter = function () {
        return (this.mouse_on_container = !0);
      }),
      (u.prototype.mouse_leave = function () {
        return (this.mouse_on_container = !1);
      }),
      (u.prototype.input_focus = function (e) {
        if (this.is_multiple) {
          if (!this.active_field)
            return setTimeout(
              ((t = this),
              function () {
                return t.container_mousedown();
              }),
              50
            );
        } else if (!this.active_field) return this.activate_field();
        var t;
      }),
      (u.prototype.input_blur = function (e) {
        if (!this.mouse_on_container)
          return (
            (this.active_field = !1),
            setTimeout(
              ((t = this),
              function () {
                return t.blur_test();
              }),
              100
            )
          );
        var t;
      }),
      (u.prototype.label_click_handler = function (e) {
        return this.is_multiple
          ? this.container_mousedown(e)
          : this.activate_field();
      }),
      (u.prototype.results_option_build = function (e) {
        for (
          var t, n, i, r = "", o = 0, s = 0, a = (i = this.results_data).length;
          s < a &&
          ("" !==
            (n = (t = i[s]).group
              ? this.result_add_group(t)
              : this.result_add_option(t)) && (o++, (r += n)),
          null != e &&
            e.first &&
            (t.selected && this.is_multiple
              ? this.choice_build(t)
              : t.selected &&
                !this.is_multiple &&
                this.single_set_selected_text(this.choice_label(t))),
          !(o >= this.max_shown_results));
          s++
        );
        return r;
      }),
      (u.prototype.result_add_option = function (e) {
        var t, n;
        return e.search_match && this.include_option_in_results(e)
          ? ((t = []),
            e.disabled ||
              (e.selected && this.is_multiple) ||
              t.push("active-result"),
            !e.disabled ||
              (e.selected && this.is_multiple) ||
              t.push("disabled-result"),
            e.selected && t.push("result-selected"),
            null != e.group_array_index && t.push("group-option"),
            "" !== e.classes && t.push(e.classes),
            ((n = document.createElement("li")).className = t.join(" ")),
            e.style && (n.style.cssText = e.style),
            n.setAttribute("data-option-array-index", e.array_index),
            (n.innerHTML = e.highlighted_html || e.html),
            e.title && (n.title = e.title),
            this.outerHTML(n))
          : "";
      }),
      (u.prototype.result_add_group = function (e) {
        var t, n;
        return (e.search_match || e.group_match) && 0 < e.active_options
          ? ((t = []).push("group-result"),
            e.classes && t.push(e.classes),
            ((n = document.createElement("li")).className = t.join(" ")),
            (n.innerHTML = e.highlighted_html || this.escape_html(e.label)),
            e.title && (n.title = e.title),
            this.outerHTML(n))
          : "";
      }),
      (u.prototype.results_update_field = function () {
        if (
          (this.set_default_text(),
          this.is_multiple || this.results_reset_cleanup(),
          this.result_clear_highlight(),
          this.results_build(),
          this.results_showing)
        )
          return this.winnow_results();
      }),
      (u.prototype.reset_single_select_options = function () {
        for (
          var e, t, n = [], i = 0, r = (e = this.results_data).length;
          i < r;
          i++
        )
          (t = e[i]).selected ? n.push((t.selected = !1)) : n.push(void 0);
        return n;
      }),
      (u.prototype.results_toggle = function () {
        return this.results_showing ? this.results_hide() : this.results_show();
      }),
      (u.prototype.results_search = function (e) {
        return this.results_showing
          ? this.winnow_results()
          : this.results_show();
      }),
      (u.prototype.winnow_results = function (e) {
        var t, n, i, r, o, s, a, l, u, c, d, f, p;
        for (
          this.no_results_clear(),
            c = 0,
            t = (a = this.get_search_text()).replace(
              /[-[\]{}()*+?.,\\^$|#\s]/g,
              "\\$&"
            ),
            u = this.get_search_regex(t),
            i = 0,
            r = (l = this.results_data).length;
          i < r;
          i++
        )
          ((o = l[i]).search_match = !1),
            (d = null),
            (o.highlighted_html = ""),
            this.include_option_in_results(o) &&
              (o.group && ((o.group_match = !1), (o.active_options = 0)),
              null != o.group_array_index &&
                this.results_data[o.group_array_index] &&
                (0 ===
                  (d = this.results_data[o.group_array_index]).active_options &&
                  d.search_match &&
                  (c += 1),
                (d.active_options += 1)),
              (p = o.group ? o.label : o.text),
              (o.group && !this.group_search) ||
                ((f = this.search_string_match(p, u)),
                (o.search_match = null != f),
                o.search_match && !o.group && (c += 1),
                o.search_match
                  ? (a.length &&
                      ((f = f.index),
                      (s = p.slice(0, f)),
                      (n = p.slice(f, f + a.length)),
                      (p = p.slice(f + a.length)),
                      (o.highlighted_html =
                        this.escape_html(s) +
                        "<em>" +
                        this.escape_html(n) +
                        "</em>" +
                        this.escape_html(p))),
                    null != d && (d.group_match = !0))
                  : null != o.group_array_index &&
                    this.results_data[o.group_array_index].search_match &&
                    (o.search_match = !0)));
        return (
          this.result_clear_highlight(),
          c < 1 && a.length
            ? (this.update_results_content(""), this.no_results(a))
            : (this.update_results_content(this.results_option_build()),
              null != e && e.skip_highlight
                ? void 0
                : this.winnow_results_set_highlight())
        );
      }),
      (u.prototype.get_search_regex = function (e) {
        var t,
          e = this.search_contains ? e : "(^|\\s|\\b)" + e + "[^\\s]*";
        return (
          this.enable_split_word_search ||
            this.search_contains ||
            (e = "^" + e),
          (t = this.case_sensitive_search ? "" : "i"),
          new RegExp(e, t)
        );
      }),
      (u.prototype.search_string_match = function (e, t) {
        t = t.exec(e);
        return !this.search_contains && null != t && t[1] && (t.index += 1), t;
      }),
      (u.prototype.choices_count = function () {
        var e, t, n;
        if (null != this.selected_option_count)
          return this.selected_option_count;
        for (
          e = this.selected_option_count = 0,
            t = (n = this.form_field.options).length;
          e < t;
          e++
        )
          n[e].selected && (this.selected_option_count += 1);
        return this.selected_option_count;
      }),
      (u.prototype.choices_click = function (e) {
        if (
          (e.preventDefault(),
          this.activate_field(),
          !this.results_showing && !this.is_disabled)
        )
          return this.results_show();
      }),
      (u.prototype.keydown_checker = function (e) {
        var t = null != (t = e.which) ? t : e.keyCode;
        switch (
          (this.search_field_scale(),
          8 !== t && this.pending_backstroke && this.clear_backstroke(),
          t)
        ) {
          case 8:
            this.backstroke_length = this.get_search_field_value().length;
            break;
          case 9:
            this.results_showing && !this.is_multiple && this.result_select(e),
              (this.mouse_on_container = !1);
            break;
          case 13:
          case 27:
            this.results_showing && e.preventDefault();
            break;
          case 32:
            this.disable_search && e.preventDefault();
            break;
          case 38:
            e.preventDefault(), this.keyup_arrow();
            break;
          case 40:
            e.preventDefault(), this.keydown_arrow();
        }
      }),
      (u.prototype.keyup_checker = function (e) {
        var t = null != (t = e.which) ? t : e.keyCode;
        switch ((this.search_field_scale(), t)) {
          case 8:
            this.is_multiple &&
            this.backstroke_length < 1 &&
            0 < this.choices_count()
              ? this.keydown_backstroke()
              : this.pending_backstroke ||
                (this.result_clear_highlight(), this.results_search());
            break;
          case 13:
            e.preventDefault(), this.results_showing && this.result_select(e);
            break;
          case 27:
            this.results_showing && this.results_hide();
            break;
          case 9:
          case 16:
          case 17:
          case 18:
          case 38:
          case 40:
          case 91:
            break;
          default:
            this.results_search();
        }
      }),
      (u.prototype.clipboard_event_checker = function (e) {
        if (!this.is_disabled)
          return setTimeout(
            ((t = this),
            function () {
              return t.results_search();
            }),
            50
          );
        var t;
      }),
      (u.prototype.container_width = function () {
        return null != this.options.width
          ? this.options.width
          : this.form_field.offsetWidth + "px";
      }),
      (u.prototype.include_option_in_results = function (e) {
        return !(
          (this.is_multiple && !this.display_selected_options && e.selected) ||
          (!this.display_disabled_options && e.disabled) ||
          e.empty
        );
      }),
      (u.prototype.search_results_touchstart = function (e) {
        return (this.touch_started = !0), this.search_results_mouseover(e);
      }),
      (u.prototype.search_results_touchmove = function (e) {
        return (this.touch_started = !1), this.search_results_mouseout(e);
      }),
      (u.prototype.search_results_touchend = function (e) {
        if (this.touch_started) return this.search_results_mouseup(e);
      }),
      (u.prototype.outerHTML = function (e) {
        var t;
        return (
          e.outerHTML ||
          ((t = document.createElement("div")).appendChild(e), t.innerHTML)
        );
      }),
      (u.prototype.get_single_html = function () {
        return (
          '<a class="chosen-single chosen-default">\n  <span>' +
          this.default_text +
          '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
        );
      }),
      (u.prototype.get_multi_html = function () {
        return (
          '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' +
          this.default_text +
          '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
        );
      }),
      (u.prototype.get_no_results_html = function (e) {
        return (
          '<li class="no-results">\n  ' +
          this.results_none_found +
          " <span>" +
          this.escape_html(e) +
          "</span>\n</li>"
        );
      }),
      (u.browser_is_supported = function () {
        return !0;
      }),
      (u.default_multiple_text = "Select Some Options"),
      (u.default_single_text = "Select an Option"),
      (u.default_no_result_text = "No results match"),
      (o = u),
      (a = jQuery).fn.extend({
        chosen: function (i) {
          return o.browser_is_supported()
            ? this.each(function (e) {
                var t,
                  n = (t = a(this)).data("chosen");
                "destroy" !== i
                  ? n instanceof r || t.data("chosen", new r(this, i))
                  : n instanceof r && n.destroy();
              })
            : this;
        },
      }),
      (r = (function () {
        function e() {
          return e.__super__.constructor.apply(this, arguments);
        }
        var t,
          n = e,
          i = o;
        function r() {
          this.constructor = n;
        }
        for (t in i) l.call(i, t) && (n[t] = i[t]);
        return (
          (r.prototype = i.prototype),
          (n.prototype = new r()),
          (n.__super__ = i.prototype),
          (e.prototype.setup = function () {
            return (
              (this.form_field_jq = a(this.form_field)),
              (this.current_selectedIndex = this.form_field.selectedIndex)
            );
          }),
          (e.prototype.set_up_html = function () {
            var e;
            return (
              (e = ["chosen-container"]).push(
                "chosen-container-" + (this.is_multiple ? "multi" : "single")
              ),
              this.inherit_select_classes &&
                this.form_field.className &&
                e.push(this.form_field.className),
              this.is_rtl && e.push("chosen-rtl"),
              (e = { class: e.join(" "), title: this.form_field.title }),
              this.form_field.id.length &&
                (e.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
              (this.container = a("<div />", e)),
              this.container.width(this.container_width()),
              this.is_multiple
                ? this.container.html(this.get_multi_html())
                : this.container.html(this.get_single_html()),
              this.form_field_jq.hide().after(this.container),
              (this.dropdown = this.container.find("div.chosen-drop").first()),
              (this.search_field = this.container.find("input").first()),
              (this.search_results = this.container
                .find("ul.chosen-results")
                .first()),
              this.search_field_scale(),
              (this.search_no_results = this.container
                .find("li.no-results")
                .first()),
              this.is_multiple
                ? ((this.search_choices = this.container
                    .find("ul.chosen-choices")
                    .first()),
                  (this.search_container = this.container
                    .find("li.search-field")
                    .first()))
                : ((this.search_container = this.container
                    .find("div.chosen-search")
                    .first()),
                  (this.selected_item = this.container
                    .find(".chosen-single")
                    .first())),
              this.results_build(),
              this.set_tab_index(),
              this.set_label_behavior()
            );
          }),
          (e.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", { chosen: this });
          }),
          (e.prototype.register_observers = function () {
            return (
              this.container.on(
                "touchstart.chosen",
                ((S = this),
                function (e) {
                  S.container_mousedown(e);
                })
              ),
              this.container.on(
                "touchend.chosen",
                ((T = this),
                function (e) {
                  T.container_mouseup(e);
                })
              ),
              this.container.on(
                "mousedown.chosen",
                ((w = this),
                function (e) {
                  w.container_mousedown(e);
                })
              ),
              this.container.on(
                "mouseup.chosen",
                ((b = this),
                function (e) {
                  b.container_mouseup(e);
                })
              ),
              this.container.on(
                "mouseenter.chosen",
                ((E = this),
                function (e) {
                  E.mouse_enter(e);
                })
              ),
              this.container.on(
                "mouseleave.chosen",
                ((_ = this),
                function (e) {
                  _.mouse_leave(e);
                })
              ),
              this.search_results.on(
                "mouseup.chosen",
                ((y = this),
                function (e) {
                  y.search_results_mouseup(e);
                })
              ),
              this.search_results.on(
                "mouseover.chosen",
                ((v = this),
                function (e) {
                  v.search_results_mouseover(e);
                })
              ),
              this.search_results.on(
                "mouseout.chosen",
                ((g = this),
                function (e) {
                  g.search_results_mouseout(e);
                })
              ),
              this.search_results.on(
                "mousewheel.chosen DOMMouseScroll.chosen",
                ((m = this),
                function (e) {
                  m.search_results_mousewheel(e);
                })
              ),
              this.search_results.on(
                "touchstart.chosen",
                ((h = this),
                function (e) {
                  h.search_results_touchstart(e);
                })
              ),
              this.search_results.on(
                "touchmove.chosen",
                ((p = this),
                function (e) {
                  p.search_results_touchmove(e);
                })
              ),
              this.search_results.on(
                "touchend.chosen",
                ((f = this),
                function (e) {
                  f.search_results_touchend(e);
                })
              ),
              this.form_field_jq.on(
                "chosen:updated.chosen",
                ((d = this),
                function (e) {
                  d.results_update_field(e);
                })
              ),
              this.form_field_jq.on(
                "chosen:activate.chosen",
                ((c = this),
                function (e) {
                  c.activate_field(e);
                })
              ),
              this.form_field_jq.on(
                "chosen:open.chosen",
                ((u = this),
                function (e) {
                  u.container_mousedown(e);
                })
              ),
              this.form_field_jq.on(
                "chosen:close.chosen",
                ((l = this),
                function (e) {
                  l.close_field(e);
                })
              ),
              this.search_field.on(
                "blur.chosen",
                ((a = this),
                function (e) {
                  a.input_blur(e);
                })
              ),
              this.search_field.on(
                "keyup.chosen",
                ((s = this),
                function (e) {
                  s.keyup_checker(e);
                })
              ),
              this.search_field.on(
                "keydown.chosen",
                ((o = this),
                function (e) {
                  o.keydown_checker(e);
                })
              ),
              this.search_field.on(
                "focus.chosen",
                ((r = this),
                function (e) {
                  r.input_focus(e);
                })
              ),
              this.search_field.on(
                "cut.chosen",
                ((i = this),
                function (e) {
                  i.clipboard_event_checker(e);
                })
              ),
              this.search_field.on(
                "paste.chosen",
                ((n = this),
                function (e) {
                  n.clipboard_event_checker(e);
                })
              ),
              this.is_multiple
                ? this.search_choices.on(
                    "click.chosen",
                    ((t = this),
                    function (e) {
                      t.choices_click(e);
                    })
                  )
                : this.container.on("click.chosen", function (e) {
                    e.preventDefault();
                  })
            );
            var t,
              n,
              i,
              r,
              o,
              s,
              a,
              l,
              u,
              c,
              d,
              f,
              p,
              h,
              m,
              g,
              v,
              y,
              _,
              E,
              b,
              w,
              T,
              S;
          }),
          (e.prototype.destroy = function () {
            return (
              a(this.container[0].ownerDocument).off(
                "click.chosen",
                this.click_test_action
              ),
              0 < this.form_field_label.length &&
                this.form_field_label.off("click.chosen"),
              this.search_field[0].tabIndex &&
                (this.form_field_jq[0].tabIndex =
                  this.search_field[0].tabIndex),
              this.container.remove(),
              this.form_field_jq.removeData("chosen"),
              this.form_field_jq.show()
            );
          }),
          (e.prototype.search_field_disabled = function () {
            return (
              (this.is_disabled =
                this.form_field.disabled ||
                this.form_field_jq.parents("fieldset").is(":disabled")),
              this.container.toggleClass("chosen-disabled", this.is_disabled),
              (this.search_field[0].disabled = this.is_disabled),
              this.is_multiple ||
                this.selected_item.off("focus.chosen", this.activate_field),
              this.is_disabled
                ? this.close_field()
                : this.is_multiple
                ? void 0
                : this.selected_item.on("focus.chosen", this.activate_field)
            );
          }),
          (e.prototype.container_mousedown = function (e) {
            var t;
            if (!this.is_disabled)
              return (
                !e ||
                  ("mousedown" !== (t = e.type) && "touchstart" !== t) ||
                  this.results_showing ||
                  e.preventDefault(),
                null != e && a(e.target).hasClass("search-choice-close")
                  ? void 0
                  : (this.active_field
                      ? this.is_multiple ||
                        !e ||
                        (a(e.target)[0] !== this.selected_item[0] &&
                          !a(e.target).parents("a.chosen-single").length) ||
                        (e.preventDefault(), this.results_toggle())
                      : (this.is_multiple && this.search_field.val(""),
                        a(this.container[0].ownerDocument).on(
                          "click.chosen",
                          this.click_test_action
                        ),
                        this.results_show()),
                    this.activate_field())
              );
          }),
          (e.prototype.container_mouseup = function (e) {
            if ("ABBR" === e.target.nodeName && !this.is_disabled)
              return this.results_reset(e);
          }),
          (e.prototype.search_results_mousewheel = function (e) {
            var t;
            if (
              null !=
              (t = e.originalEvent
                ? e.originalEvent.deltaY ||
                  -e.originalEvent.wheelDelta ||
                  e.originalEvent.detail
                : t)
            )
              return (
                e.preventDefault(),
                "DOMMouseScroll" === e.type && (t *= 40),
                this.search_results.scrollTop(
                  t + this.search_results.scrollTop()
                )
              );
          }),
          (e.prototype.blur_test = function (e) {
            if (
              !this.active_field &&
              this.container.hasClass("chosen-container-active")
            )
              return this.close_field();
          }),
          (e.prototype.close_field = function () {
            return (
              a(this.container[0].ownerDocument).off(
                "click.chosen",
                this.click_test_action
              ),
              (this.active_field = !1),
              this.results_hide(),
              this.container.removeClass("chosen-container-active"),
              this.clear_backstroke(),
              this.show_search_field_default(),
              this.search_field_scale(),
              this.search_field.blur()
            );
          }),
          (e.prototype.activate_field = function () {
            if (!this.is_disabled)
              return (
                this.container.addClass("chosen-container-active"),
                (this.active_field = !0),
                this.search_field.val(this.search_field.val()),
                this.search_field.focus()
              );
          }),
          (e.prototype.test_active_click = function (e) {
            return (e = a(e.target).closest(".chosen-container")).length &&
              this.container[0] === e[0]
              ? (this.active_field = !0)
              : this.close_field();
          }),
          (e.prototype.results_build = function () {
            return (
              (this.parsing = !0),
              (this.selected_option_count = null),
              (this.results_data = s.select_to_array(this.form_field)),
              this.is_multiple
                ? this.search_choices.find("li.search-choice").remove()
                : (this.single_set_selected_text(),
                  this.disable_search ||
                  this.form_field.options.length <=
                    this.disable_search_threshold
                    ? ((this.search_field[0].readOnly = !0),
                      this.container.addClass(
                        "chosen-container-single-nosearch"
                      ))
                    : ((this.search_field[0].readOnly = !1),
                      this.container.removeClass(
                        "chosen-container-single-nosearch"
                      ))),
              this.update_results_content(
                this.results_option_build({ first: !0 })
              ),
              this.search_field_disabled(),
              this.show_search_field_default(),
              this.search_field_scale(),
              (this.parsing = !1)
            );
          }),
          (e.prototype.result_do_highlight = function (e) {
            var t, n, i, r;
            if (e.length)
              return (
                this.result_clear_highlight(),
                (this.result_highlight = e),
                this.result_highlight.addClass("highlighted"),
                (i =
                  (e = parseInt(this.search_results.css("maxHeight"), 10)) +
                  (r = this.search_results.scrollTop())),
                (t =
                  (n =
                    this.result_highlight.position().top +
                    this.search_results.scrollTop()) +
                  this.result_highlight.outerHeight()) >= i
                  ? this.search_results.scrollTop(0 < t - e ? t - e : 0)
                  : n < r
                  ? this.search_results.scrollTop(n)
                  : void 0
              );
          }),
          (e.prototype.result_clear_highlight = function () {
            return (
              this.result_highlight &&
                this.result_highlight.removeClass("highlighted"),
              (this.result_highlight = null)
            );
          }),
          (e.prototype.results_show = function () {
            return this.is_multiple &&
              this.max_selected_options <= this.choices_count()
              ? (this.form_field_jq.trigger("chosen:maxselected", {
                  chosen: this,
                }),
                !1)
              : (this.container.addClass("chosen-with-drop"),
                (this.results_showing = !0),
                this.search_field.focus(),
                this.search_field.val(this.get_search_field_value()),
                this.winnow_results(),
                this.form_field_jq.trigger("chosen:showing_dropdown", {
                  chosen: this,
                }));
          }),
          (e.prototype.update_results_content = function (e) {
            return this.search_results.html(e);
          }),
          (e.prototype.results_hide = function () {
            return (
              this.results_showing &&
                (this.result_clear_highlight(),
                this.container.removeClass("chosen-with-drop"),
                this.form_field_jq.trigger("chosen:hiding_dropdown", {
                  chosen: this,
                })),
              (this.results_showing = !1)
            );
          }),
          (e.prototype.set_tab_index = function (e) {
            var t;
            if (this.form_field.tabIndex)
              return (
                (t = this.form_field.tabIndex),
                (this.form_field.tabIndex = -1),
                (this.search_field[0].tabIndex = t)
              );
          }),
          (e.prototype.set_label_behavior = function () {
            if (
              ((this.form_field_label = this.form_field_jq.parents("label")),
              !this.form_field_label.length &&
                this.form_field.id.length &&
                (this.form_field_label = a(
                  "label[for='" + this.form_field.id + "']"
                )),
              0 < this.form_field_label.length)
            )
              return this.form_field_label.on(
                "click.chosen",
                this.label_click_handler
              );
          }),
          (e.prototype.show_search_field_default = function () {
            return this.is_multiple &&
              this.choices_count() < 1 &&
              !this.active_field
              ? (this.search_field.val(this.default_text),
                this.search_field.addClass("default"))
              : (this.search_field.val(""),
                this.search_field.removeClass("default"));
          }),
          (e.prototype.search_results_mouseup = function (e) {
            var t;
            if (
              (t = a(e.target).hasClass("active-result")
                ? a(e.target)
                : a(e.target).parents(".active-result").first()).length
            )
              return (
                (this.result_highlight = t),
                this.result_select(e),
                this.search_field.focus()
              );
          }),
          (e.prototype.search_results_mouseover = function (e) {
            if (
              (e = a(e.target).hasClass("active-result")
                ? a(e.target)
                : a(e.target).parents(".active-result").first())
            )
              return this.result_do_highlight(e);
          }),
          (e.prototype.search_results_mouseout = function (e) {
            if (
              a(e.target).hasClass("active-result") ||
              a(e.target).parents(".active-result").first()
            )
              return this.result_clear_highlight();
          }),
          (e.prototype.choice_build = function (e) {
            var t,
              n = a("<li />", { class: "search-choice" }).html(
                "<span>" + this.choice_label(e) + "</span>"
              );
            return (
              e.disabled
                ? n.addClass("search-choice-disabled")
                : ((e = a("<a />", {
                    class: "search-choice-close",
                    "data-option-array-index": e.array_index,
                  })).on(
                    "click.chosen",
                    ((t = this),
                    function (e) {
                      return t.choice_destroy_link_click(e);
                    })
                  ),
                  n.append(e)),
              this.search_container.before(n)
            );
          }),
          (e.prototype.choice_destroy_link_click = function (e) {
            if ((e.preventDefault(), e.stopPropagation(), !this.is_disabled))
              return this.choice_destroy(a(e.target));
          }),
          (e.prototype.choice_destroy = function (e) {
            if (
              this.result_deselect(e[0].getAttribute("data-option-array-index"))
            )
              return (
                this.active_field
                  ? this.search_field.focus()
                  : this.show_search_field_default(),
                this.is_multiple &&
                  0 < this.choices_count() &&
                  this.get_search_field_value().length < 1 &&
                  this.results_hide(),
                e.parents("li").first().remove(),
                this.search_field_scale()
              );
          }),
          (e.prototype.results_reset = function () {
            if (
              (this.reset_single_select_options(),
              (this.form_field.options[0].selected = !0),
              this.single_set_selected_text(),
              this.show_search_field_default(),
              this.results_reset_cleanup(),
              this.trigger_form_field_change(),
              this.active_field)
            )
              return this.results_hide();
          }),
          (e.prototype.results_reset_cleanup = function () {
            return (
              (this.current_selectedIndex = this.form_field.selectedIndex),
              this.selected_item.find("abbr").remove()
            );
          }),
          (e.prototype.result_select = function (e) {
            var t;
            if (this.result_highlight)
              return (
                (t = this.result_highlight),
                this.result_clear_highlight(),
                this.is_multiple &&
                this.max_selected_options <= this.choices_count()
                  ? (this.form_field_jq.trigger("chosen:maxselected", {
                      chosen: this,
                    }),
                    !1)
                  : (this.is_multiple
                      ? t.removeClass("active-result")
                      : this.reset_single_select_options(),
                    t.addClass("result-selected"),
                    ((t =
                      this.results_data[
                        t[0].getAttribute("data-option-array-index")
                      ]).selected = !0),
                    (this.form_field.options[t.options_index].selected = !0),
                    (this.selected_option_count = null),
                    this.is_multiple
                      ? this.choice_build(t)
                      : this.single_set_selected_text(this.choice_label(t)),
                    this.is_multiple &&
                    (!this.hide_results_on_select || e.metaKey || e.ctrlKey)
                      ? e.metaKey || e.ctrlKey
                        ? this.winnow_results({ skip_highlight: !0 })
                        : (this.search_field.val(""), this.winnow_results())
                      : (this.results_hide(), this.show_search_field_default()),
                    (!this.is_multiple &&
                      this.form_field.selectedIndex ===
                        this.current_selectedIndex) ||
                      this.trigger_form_field_change({
                        selected:
                          this.form_field.options[t.options_index].value,
                      }),
                    (this.current_selectedIndex =
                      this.form_field.selectedIndex),
                    e.preventDefault(),
                    this.search_field_scale())
              );
          }),
          (e.prototype.single_set_selected_text = function (e) {
            return (
              (e = null == e ? this.default_text : e) === this.default_text
                ? this.selected_item.addClass("chosen-default")
                : (this.single_deselect_control_build(),
                  this.selected_item.removeClass("chosen-default")),
              this.selected_item.find("span").html(e)
            );
          }),
          (e.prototype.result_deselect = function (e) {
            e = this.results_data[e];
            return (
              !this.form_field.options[e.options_index].disabled &&
              ((e.selected = !1),
              (this.form_field.options[e.options_index].selected = !1),
              (this.selected_option_count = null),
              this.result_clear_highlight(),
              this.results_showing && this.winnow_results(),
              this.trigger_form_field_change({
                deselected: this.form_field.options[e.options_index].value,
              }),
              this.search_field_scale(),
              !0)
            );
          }),
          (e.prototype.single_deselect_control_build = function () {
            if (this.allow_single_deselect)
              return (
                this.selected_item.find("abbr").length ||
                  this.selected_item
                    .find("span")
                    .first()
                    .after('<abbr class="search-choice-close"></abbr>'),
                this.selected_item.addClass("chosen-single-with-deselect")
              );
          }),
          (e.prototype.get_search_field_value = function () {
            return this.search_field.val();
          }),
          (e.prototype.get_search_text = function () {
            return a.trim(this.get_search_field_value());
          }),
          (e.prototype.escape_html = function (e) {
            return a("<div/>").text(e).html();
          }),
          (e.prototype.winnow_results_set_highlight = function () {
            var e = this.is_multiple
              ? []
              : this.search_results.find(".result-selected.active-result");
            if (
              null !=
              (e = (
                e.length ? e : this.search_results.find(".active-result")
              ).first())
            )
              return this.result_do_highlight(e);
          }),
          (e.prototype.no_results = function (e) {
            e = this.get_no_results_html(e);
            return (
              this.search_results.append(e),
              this.form_field_jq.trigger("chosen:no_results", { chosen: this })
            );
          }),
          (e.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove();
          }),
          (e.prototype.keydown_arrow = function () {
            var e;
            return this.results_showing && this.result_highlight
              ? (e = this.result_highlight.nextAll("li.active-result").first())
                ? this.result_do_highlight(e)
                : void 0
              : this.results_show();
          }),
          (e.prototype.keyup_arrow = function () {
            var e;
            return this.results_showing || this.is_multiple
              ? this.result_highlight
                ? (e = this.result_highlight.prevAll("li.active-result")).length
                  ? this.result_do_highlight(e.first())
                  : (0 < this.choices_count() && this.results_hide(),
                    this.result_clear_highlight())
                : void 0
              : this.results_show();
          }),
          (e.prototype.keydown_backstroke = function () {
            var e;
            return this.pending_backstroke
              ? (this.choice_destroy(this.pending_backstroke.find("a").first()),
                this.clear_backstroke())
              : (e = this.search_container.siblings("li.search-choice").last())
                  .length && !e.hasClass("search-choice-disabled")
              ? ((this.pending_backstroke = e),
                this.single_backstroke_delete
                  ? this.keydown_backstroke()
                  : this.pending_backstroke.addClass("search-choice-focus"))
              : void 0;
          }),
          (e.prototype.clear_backstroke = function () {
            return (
              this.pending_backstroke &&
                this.pending_backstroke.removeClass("search-choice-focus"),
              (this.pending_backstroke = null)
            );
          }),
          (e.prototype.search_field_scale = function () {
            var e, t, n, i, r, o, s;
            if (this.is_multiple) {
              for (
                r = {
                  position: "absolute",
                  left: "-1000px",
                  top: "-1000px",
                  display: "none",
                  whiteSpace: "pre",
                },
                  t = 0,
                  n = (o = [
                    "fontSize",
                    "fontStyle",
                    "fontWeight",
                    "fontFamily",
                    "lineHeight",
                    "textTransform",
                    "letterSpacing",
                  ]).length;
                t < n;
                t++
              )
                r[(i = o[t])] = this.search_field.css(i);
              return (
                (e = a("<div />").css(r)).text(this.get_search_field_value()),
                a("body").append(e),
                (s = e.width() + 25),
                e.remove(),
                this.container.is(":visible") &&
                  (s = Math.min(this.container.outerWidth() - 10, s)),
                this.search_field.width(s)
              );
            }
          }),
          (e.prototype.trigger_form_field_change = function (e) {
            return (
              this.form_field_jq.trigger("input", e),
              this.form_field_jq.trigger("change", e)
            );
          }),
          e
        );
      })());
  }.call(this),
  !(function (e, t) {
    "object" == typeof exports
      ? ((module.exports = t()), (module.exports.default = t()))
      : "function" == typeof define && define.amd
      ? define(t)
      : (e.slugify = t());
  })(this, function () {
    var s = JSON.parse(
        '{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","Â¢":"cent","Â£":"pound","Â¤":"currency","Â¥":"yen","Â©":"(c)","Âª":"a","Â®":"(r)","Âº":"o","Ã€":"A","Ã":"A","Ã‚":"A","Ãƒ":"A","Ã„":"A","Ã…":"A","Ã†":"AE","Ã‡":"C","Ãˆ":"E","Ã‰":"E","ÃŠ":"E","Ã‹":"E","ÃŒ":"I","Ã":"I","ÃŽ":"I","Ã":"I","Ã":"D","Ã‘":"N","Ã’":"O","Ã“":"O","Ã”":"O","Ã•":"O","Ã–":"O","Ã˜":"O","Ã™":"U","Ãš":"U","Ã›":"U","Ãœ":"U","Ã":"Y","Ãž":"TH","ÃŸ":"ss","Ã ":"a","Ã¡":"a","Ã¢":"a","Ã£":"a","Ã¤":"a","Ã¥":"a","Ã¦":"ae","Ã§":"c","Ã¨":"e","Ã©":"e","Ãª":"e","Ã«":"e","Ã¬":"i","Ã­":"i","Ã®":"i","Ã¯":"i","Ã°":"d","Ã±":"n","Ã²":"o","Ã³":"o","Ã´":"o","Ãµ":"o","Ã¶":"o","Ã¸":"o","Ã¹":"u","Ãº":"u","Ã»":"u","Ã¼":"u","Ã½":"y","Ã¾":"th","Ã¿":"y","Ä€":"A","Ä":"a","Ä‚":"A","Äƒ":"a","Ä„":"A","Ä…":"a","Ä†":"C","Ä‡":"c","ÄŒ":"C","Ä":"c","ÄŽ":"D","Ä":"d","Ä":"DJ","Ä‘":"dj","Ä’":"E","Ä“":"e","Ä–":"E","Ä—":"e","Ä˜":"e","Ä™":"e","Äš":"E","Ä›":"e","Äž":"G","ÄŸ":"g","Ä¢":"G","Ä£":"g","Ä¨":"I","Ä©":"i","Äª":"i","Ä«":"i","Ä®":"I","Ä¯":"i","Ä°":"I","Ä±":"i","Ä¶":"k","Ä·":"k","Ä»":"L","Ä¼":"l","Ä½":"L","Ä¾":"l","Å":"L","Å‚":"l","Åƒ":"N","Å„":"n","Å…":"N","Å†":"n","Å‡":"N","Åˆ":"n","ÅŒ":"O","Å":"o","Å":"O","Å‘":"o","Å’":"OE","Å“":"oe","Å”":"R","Å•":"r","Å˜":"R","Å™":"r","Åš":"S","Å›":"s","Åž":"S","ÅŸ":"s","Å ":"S","Å¡":"s","Å¢":"T","Å£":"t","Å¤":"T","Å¥":"t","Å¨":"U","Å©":"u","Åª":"u","Å«":"u","Å®":"U","Å¯":"u","Å°":"U","Å±":"u","Å²":"U","Å³":"u","Å´":"W","Åµ":"w","Å¶":"Y","Å·":"y","Å¸":"Y","Å¹":"Z","Åº":"z","Å»":"Z","Å¼":"z","Å½":"Z","Å¾":"z","Æ":"E","Æ’":"f","Æ ":"O","Æ¡":"o","Æ¯":"U","Æ°":"u","Çˆ":"LJ","Ç‰":"lj","Ç‹":"NJ","ÇŒ":"nj","È˜":"S","È™":"s","Èš":"T","È›":"t","É™":"e","Ëš":"o","Î†":"A","Îˆ":"E","Î‰":"H","ÎŠ":"I","ÎŒ":"O","ÎŽ":"Y","Î":"W","Î":"i","Î‘":"A","Î’":"B","Î“":"G","Î”":"D","Î•":"E","Î–":"Z","Î—":"H","Î˜":"8","Î™":"I","Îš":"K","Î›":"L","Îœ":"M","Î":"N","Îž":"3","ÎŸ":"O","Î ":"P","Î¡":"R","Î£":"S","Î¤":"T","Î¥":"Y","Î¦":"F","Î§":"X","Î¨":"PS","Î©":"W","Îª":"I","Î«":"Y","Î¬":"a","Î­":"e","Î®":"h","Î¯":"i","Î°":"y","Î±":"a","Î²":"b","Î³":"g","Î´":"d","Îµ":"e","Î¶":"z","Î·":"h","Î¸":"8","Î¹":"i","Îº":"k","Î»":"l","Î¼":"m","Î½":"n","Î¾":"3","Î¿":"o","Ï€":"p","Ï":"r","Ï‚":"s","Ïƒ":"s","Ï„":"t","Ï…":"y","Ï†":"f","Ï‡":"x","Ïˆ":"ps","Ï‰":"w","ÏŠ":"i","Ï‹":"y","ÏŒ":"o","Ï":"y","ÏŽ":"w","Ð":"Yo","Ð‚":"DJ","Ð„":"Ye","Ð†":"I","Ð‡":"Yi","Ðˆ":"J","Ð‰":"LJ","ÐŠ":"NJ","Ð‹":"C","Ð":"DZ","Ð":"A","Ð‘":"B","Ð’":"V","Ð“":"G","Ð”":"D","Ð•":"E","Ð–":"Zh","Ð—":"Z","Ð˜":"I","Ð™":"J","Ðš":"K","Ð›":"L","Ðœ":"M","Ð":"N","Ðž":"O","ÐŸ":"P","Ð ":"R","Ð¡":"S","Ð¢":"T","Ð£":"U","Ð¤":"F","Ð¥":"H","Ð¦":"C","Ð§":"Ch","Ð¨":"Sh","Ð©":"Sh","Ðª":"U","Ð«":"Y","Ð¬":"","Ð­":"E","Ð®":"Yu","Ð¯":"Ya","Ð°":"a","Ð±":"b","Ð²":"v","Ð³":"g","Ð´":"d","Ðµ":"e","Ð¶":"zh","Ð·":"z","Ð¸":"i","Ð¹":"j","Ðº":"k","Ð»":"l","Ð¼":"m","Ð½":"n","Ð¾":"o","Ð¿":"p","Ñ€":"r","Ñ":"s","Ñ‚":"t","Ñƒ":"u","Ñ„":"f","Ñ…":"h","Ñ†":"c","Ñ‡":"ch","Ñˆ":"sh","Ñ‰":"sh","ÑŠ":"u","Ñ‹":"y","ÑŒ":"","Ñ":"e","ÑŽ":"yu","Ñ":"ya","Ñ‘":"yo","Ñ’":"dj","Ñ”":"ye","Ñ–":"i","Ñ—":"yi","Ñ˜":"j","Ñ™":"lj","Ñš":"nj","Ñ›":"c","Ñ":"u","ÑŸ":"dz","Ò":"G","Ò‘":"g","Ò’":"GH","Ò“":"gh","Òš":"KH","Ò›":"kh","Ò¢":"NG","Ò£":"ng","Ò®":"UE","Ò¯":"ue","Ò°":"U","Ò±":"u","Òº":"H","Ò»":"h","Ó˜":"AE","Ó™":"ae","Ó¨":"OE","Ó©":"oe","Ô±":"A","Ô²":"B","Ô³":"G","Ô´":"D","Ôµ":"E","Ô¶":"Z","Ô·":"E\'","Ô¸":"Y\'","Ô¹":"T\'","Ôº":"JH","Ô»":"I","Ô¼":"L","Ô½":"X","Ô¾":"C\'","Ô¿":"K","Õ€":"H","Õ":"D\'","Õ‚":"GH","Õƒ":"TW","Õ„":"M","Õ…":"Y","Õ†":"N","Õ‡":"SH","Õ‰":"CH","ÕŠ":"P","Õ‹":"J","ÕŒ":"R\'","Õ":"S","ÕŽ":"V","Õ":"T","Õ":"R","Õ‘":"C","Õ“":"P\'","Õ”":"Q\'","Õ•":"O\'\'","Õ–":"F","Ö‡":"EV","Ø¡":"a","Ø¢":"aa","Ø£":"a","Ø¤":"u","Ø¥":"i","Ø¦":"e","Ø§":"a","Ø¨":"b","Ø©":"h","Øª":"t","Ø«":"th","Ø¬":"j","Ø­":"h","Ø®":"kh","Ø¯":"d","Ø°":"th","Ø±":"r","Ø²":"z","Ø³":"s","Ø´":"sh","Øµ":"s","Ø¶":"dh","Ø·":"t","Ø¸":"z","Ø¹":"a","Øº":"gh","Ù":"f","Ù‚":"q","Ùƒ":"k","Ù„":"l","Ù…":"m","Ù†":"n","Ù‡":"h","Ùˆ":"w","Ù‰":"a","ÙŠ":"y","Ù‹":"an","ÙŒ":"on","Ù":"en","ÙŽ":"a","Ù":"u","Ù":"e","Ù’":"","Ù ":"0","Ù¡":"1","Ù¢":"2","Ù£":"3","Ù¤":"4","Ù¥":"5","Ù¦":"6","Ù§":"7","Ù¨":"8","Ù©":"9","Ù¾":"p","Ú†":"ch","Ú˜":"zh","Ú©":"k","Ú¯":"g","ÛŒ":"y","Û°":"0","Û±":"1","Û²":"2","Û³":"3","Û´":"4","Ûµ":"5","Û¶":"6","Û·":"7","Û¸":"8","Û¹":"9","à¸¿":"baht","áƒ":"a","áƒ‘":"b","áƒ’":"g","áƒ“":"d","áƒ”":"e","áƒ•":"v","áƒ–":"z","áƒ—":"t","áƒ˜":"i","áƒ™":"k","áƒš":"l","áƒ›":"m","áƒœ":"n","áƒ":"o","áƒž":"p","áƒŸ":"zh","áƒ ":"r","áƒ¡":"s","áƒ¢":"t","áƒ£":"u","áƒ¤":"f","áƒ¥":"k","áƒ¦":"gh","áƒ§":"q","áƒ¨":"sh","áƒ©":"ch","áƒª":"ts","áƒ«":"dz","áƒ¬":"ts","áƒ­":"ch","áƒ®":"kh","áƒ¯":"j","áƒ°":"h","á¹¢":"S","á¹£":"s","áº€":"W","áº":"w","áº‚":"W","áºƒ":"w","áº„":"W","áº…":"w","áºž":"SS","áº ":"A","áº¡":"a","áº¢":"A","áº£":"a","áº¤":"A","áº¥":"a","áº¦":"A","áº§":"a","áº¨":"A","áº©":"a","áºª":"A","áº«":"a","áº¬":"A","áº­":"a","áº®":"A","áº¯":"a","áº°":"A","áº±":"a","áº²":"A","áº³":"a","áº´":"A","áºµ":"a","áº¶":"A","áº·":"a","áº¸":"E","áº¹":"e","áºº":"E","áº»":"e","áº¼":"E","áº½":"e","áº¾":"E","áº¿":"e","á»€":"E","á»":"e","á»‚":"E","á»ƒ":"e","á»„":"E","á»…":"e","á»†":"E","á»‡":"e","á»ˆ":"I","á»‰":"i","á»Š":"I","á»‹":"i","á»Œ":"O","á»":"o","á»Ž":"O","á»":"o","á»":"O","á»‘":"o","á»’":"O","á»“":"o","á»”":"O","á»•":"o","á»–":"O","á»—":"o","á»˜":"O","á»™":"o","á»š":"O","á»›":"o","á»œ":"O","á»":"o","á»ž":"O","á»Ÿ":"o","á» ":"O","á»¡":"o","á»¢":"O","á»£":"o","á»¤":"U","á»¥":"u","á»¦":"U","á»§":"u","á»¨":"U","á»©":"u","á»ª":"U","á»«":"u","á»¬":"U","á»­":"u","á»®":"U","á»¯":"u","á»°":"U","á»±":"u","á»²":"Y","á»³":"y","á»´":"Y","á»µ":"y","á»¶":"Y","á»·":"y","á»¸":"Y","á»¹":"y","â€“":"-","â€˜":"\'","â€™":"\'","â€œ":"\\"","â€":"\\"","â€ž":"\\"","â€ ":"+","â€¢":"*","â€¦":"...","â‚ ":"ecu","â‚¢":"cruzeiro","â‚£":"french franc","â‚¤":"lira","â‚¥":"mill","â‚¦":"naira","â‚§":"peseta","â‚¨":"rupee","â‚©":"won","â‚ª":"new shequel","â‚«":"dong","â‚¬":"eur","â‚­":"kip","â‚®":"tugrik","â‚¯":"drachma","â‚°":"penny","â‚±":"peso","â‚²":"guarani","â‚³":"austral","â‚´":"hryvnia","â‚µ":"cedi","â‚¸":"kazakhstani tenge","â‚¹":"indian rupee","â‚º":"turkish lira","â‚½":"russian ruble","â‚¿":"bitcoin","â„ ":"sm","â„¢":"tm","âˆ‚":"d","âˆ†":"delta","âˆ‘":"sum","âˆž":"infinity","â™¥":"love","å…ƒ":"yuan","å††":"yen","ï·¼":"rial","ï»µ":"laa","ï»·":"laa","ï»¹":"lai","ï»»":"la"}'
      ),
      n = JSON.parse(
        '{"bg":{"Ð™":"Y","Ð¦":"Ts","Ð©":"Sht","Ðª":"A","Ð¬":"Y","Ð¹":"y","Ñ†":"ts","Ñ‰":"sht","ÑŠ":"a","ÑŒ":"y"},"de":{"Ã„":"AE","Ã¤":"ae","Ã–":"OE","Ã¶":"oe","Ãœ":"UE","Ã¼":"ue","ÃŸ":"ss","%":"prozent","&":"und","|":"oder","âˆ‘":"summe","âˆž":"unendlich","â™¥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","Â¢":"centavos","Â£":"libras","Â¤":"moneda","â‚£":"francos","âˆ‘":"suma","âˆž":"infinito","â™¥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","Â¢":"centime","Â£":"livre","Â¤":"devise","â‚£":"franc","âˆ‘":"somme","âˆž":"infini","â™¥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","Â¢":"centavo","âˆ‘":"soma","Â£":"libra","âˆž":"infinito","â™¥":"amor"},"uk":{"Ð˜":"Y","Ð¸":"y","Ð™":"Y","Ð¹":"y","Ð¦":"Ts","Ñ†":"ts","Ð¥":"Kh","Ñ…":"kh","Ð©":"Shch","Ñ‰":"shch","Ð“":"H","Ð³":"h"},"vi":{"Ä":"D","Ä‘":"d"},"da":{"Ã˜":"OE","Ã¸":"oe","Ã…":"AA","Ã¥":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"stÃ¸rre end"},"nb":{"&":"og","Ã…":"AA","Ã†":"AE","Ã˜":"OE","Ã¥":"aa","Ã¦":"ae","Ã¸":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Ã…":"AA","Ã„":"AE","Ã–":"OE","Ã¥":"aa","Ã¤":"ae","Ã¶":"oe"}}'
      );
    function e(e, i) {
      if ("string" != typeof e)
        throw Error("slugify: string argument expected");
      var r =
          n[(i = "string" == typeof i ? { replacement: i } : i || {}).locale] ||
          {},
        o = void 0 === i.replacement ? "-" : i.replacement,
        t = void 0 === i.trim || i.trim,
        e = e
          .normalize()
          .split("")
          .reduce(function (e, t) {
            var n = r[t];
            return (
              e +
              (n =
                (n = void 0 === (n = void 0 === n ? s[t] : n) ? t : n) === o
                  ? " "
                  : n).replace(i.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "")
            );
          }, "");
      return (
        i.strict && (e = e.replace(/[^A-Za-z0-9\s]/g, "")),
        (e = (e = t ? e.trim() : e).replace(/\s+/g, o)),
        (e = i.lower ? e.toLowerCase() : e)
      );
    }
    return (
      (e.extend = function (e) {
        Object.assign(s, e);
      }),
      e
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).FilePondPluginImagePreview = t());
  })(this, function () {
    "use strict";
    function h(e, t) {
      return (
        n(e) ||
        (function (e, t) {
          var n = [],
            i = !0,
            r = !1,
            o = void 0;
          try {
            for (
              var s, a = e[Symbol.iterator]();
              !(i = (s = a.next()).done) &&
              (n.push(s.value), !t || n.length !== t);
              i = !0
            );
          } catch (e) {
            (r = !0), (o = e);
          } finally {
            try {
              i || null == a.return || a.return();
            } finally {
              if (r) throw o;
            }
          }
          return n;
        })(e, t) ||
        i()
      );
    }
    function n(e) {
      if (Array.isArray(e)) return e;
    }
    function i() {
      throw TypeError("Invalid attempt to destructure non-iterable instance");
    }
    function u(e, t) {
      return y(e.x * t, e.y * t);
    }
    function c(e, t) {
      return y(e.x + t.x, e.y + t.y);
    }
    function d(e, t, n) {
      var i = Math.cos(t),
        t = Math.sin(t),
        e = y(e.x - n.x, e.y - n.y);
      return y(n.x + i * e.x - t * e.y, n.y + t * e.x + i * e.y);
    }
    function f(e, t) {
      var n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
        i = 3 < arguments.length ? arguments[3] : void 0;
      return "string" == typeof e
        ? parseFloat(e) * n
        : "number" == typeof e
        ? e * (i ? t[i] : Math.min(t.width, t.height))
        : void 0;
    }
    function p(e) {
      return null != e;
    }
    function m(t, n) {
      return Object.keys(n).forEach(function (e) {
        return t.setAttribute(e, n[e]);
      });
    }
    function r(e, t) {
      return (
        (e = document.createElementNS("http://www.w3.org/2000/svg", e)),
        t && m(e, t),
        e
      );
    }
    function e(t) {
      return function (e) {
        return r(t, { id: e.id });
      };
    }
    function s(e, t) {
      return { x: e, y: t };
    }
    function o(e, t) {
      return s(e.x - t.x, e.y - t.y);
    }
    function a(e, t) {
      return Math.sqrt(
        ((n = o((e = e), t)), (e = o(e, t)), n.x * e.x + n.y * e.y)
      );
      var n;
    }
    function l(e, t) {
      var n = 1.5707963267948966 - t,
        i = Math.cos(n);
      return s(i * ((e = +e) * Math.sin(t)), i * (e * Math.sin(n)));
    }
    function g(e, t) {
      return Math.floor(Math.sqrt(e / (t / 4)));
    }
    function v(e) {
      function m(i, r, o) {
        return new Promise(function (t) {
          i.ref.imageData ||
            (i.ref.imageData = o
              .getContext("2d")
              .getImageData(0, 0, o.width, o.height));
          var e = $(i.ref.imageData);
          if (!r || 20 !== r.length)
            return o.getContext("2d").putImageData(e, 0, 0), t();
          var n = s(P);
          n.post(
            { imageData: e, colorMatrix: r },
            function (e) {
              o.getContext("2d").putImageData(e, 0, 0), n.terminate(), t();
            },
            [e.data.buffer]
          );
        });
      }
      function g(e) {
        var t,
          n,
          i,
          r,
          o,
          s = e.root,
          a = e.props,
          e = e.image,
          l = a.id;
        (a = s.query("GET_ITEM", { id: l })) &&
          ((i = a.getMetadata("crop") || {
            center: { x: 0.5, y: 0.5 },
            flip: { horizontal: !1, vertical: !1 },
            zoom: 1,
            rotation: 0,
            aspectRatio: null,
          }),
          (r = s.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR")),
          (o = !1),
          s.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
            ((t = a.getMetadata("markup") || []),
            (n = a.getMetadata("resize")),
            (o = !0)),
          (a = s.appendChildView(
            s.createChildView(u, {
              id: l,
              image: e,
              crop: i,
              resize: n,
              markup: t,
              dirty: o,
              background: r,
              opacity: 0,
              scaleX: 1.15,
              scaleY: 1.15,
              translateY: 15,
            }),
            s.childViews.length
          )),
          s.ref.images.push(a),
          (a.opacity = 1),
          (a.scaleX = 1),
          (a.scaleY = 1),
          (a.translateY = 0),
          setTimeout(function () {
            s.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: l });
          }, 250));
      }
      function t(e) {
        ((e = e.root).ref.overlayShadow.opacity = 1),
          (e.ref.overlayError.opacity = 0),
          (e.ref.overlaySuccess.opacity = 0);
      }
      function n(e) {
        ((e = e.root).ref.overlayShadow.opacity = 0.25),
          (e.ref.overlayError.opacity = 1);
      }
      var i,
        r = e.utils.createView({
          name: "image-preview-overlay",
          tag: "div",
          ignoreRect: !0,
          create: function (e) {
            var t,
              n = e.root,
              e = e.props,
              i =
                '<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">\n    <defs>\n        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">\n            <stop offset=\'50%\' stop-color=\'#000000\'/>\n            <stop offset=\'56%\' stop-color=\'#0a0a0a\'/>\n            <stop offset=\'63%\' stop-color=\'#262626\'/>\n            <stop offset=\'69%\' stop-color=\'#4f4f4f\'/>\n            <stop offset=\'75%\' stop-color=\'#808080\'/>\n            <stop offset=\'81%\' stop-color=\'#b1b1b1\'/>\n            <stop offset=\'88%\' stop-color=\'#dadada\'/>\n            <stop offset=\'94%\' stop-color=\'#f6f6f6\'/>\n            <stop offset=\'100%\' stop-color=\'#ffffff\'/>\n        </radialGradient>\n        <mask id="mask-__UID__">\n            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>\n        </mask>\n    </defs>\n    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>\n</svg>';
            document.querySelector("base") &&
              ((t = new URL(
                window.location.href.replace(window.location.hash, "")
              ).href),
              (i = i.replace(/url\(\#/g, "url(" + t + "#"))),
              O++,
              n.element.classList.add(
                "filepond--image-preview-overlay-".concat(e.status)
              ),
              (n.element.innerHTML = i.replace(/__UID__/g, O));
          },
          mixins: {
            styles: ["opacity"],
            animations: { opacity: { type: "spring", mass: 25 } },
          },
        }),
        u = (i = e).utils.createView({
          name: "image-preview",
          tag: "div",
          ignoreRect: !0,
          mixins: {
            apis: ["image", "crop", "markup", "resize", "dirty", "background"],
            styles: ["translateY", "scaleX", "scaleY", "opacity"],
            animations: {
              scaleX: D,
              scaleY: D,
              translateY: D,
              opacity: { type: "tween", duration: 400 },
            },
          },
          create: function (e) {
            var r,
              t = e.root,
              e = e.props;
            t.ref.clip = t.appendChildView(
              t.createChildView(
                (r = i).utils.createView({
                  name: "image-clip",
                  tag: "div",
                  ignoreRect: !0,
                  mixins: {
                    apis: [
                      "crop",
                      "markup",
                      "resize",
                      "width",
                      "height",
                      "dirty",
                      "background",
                    ],
                    styles: ["width", "height", "opacity"],
                    animations: { opacity: { type: "tween", duration: 250 } },
                  },
                  didWriteView: function (e) {
                    var t = e.root,
                      e = e.props;
                    e.background &&
                      (t.element.style.backgroundColor = e.background);
                  },
                  create: function (e) {
                    var n,
                      t = e.root,
                      i = e.props,
                      e =
                        ((t.ref.image = t.appendChildView(
                          t.createChildView(
                            (n = r).utils.createView({
                              name: "image-canvas-wrapper",
                              tag: "div",
                              ignoreRect: !0,
                              mixins: {
                                apis: ["crop", "width", "height"],
                                styles: [
                                  "originX",
                                  "originY",
                                  "translateX",
                                  "translateY",
                                  "scaleX",
                                  "scaleY",
                                  "rotateZ",
                                ],
                                animations: {
                                  originX: D,
                                  originY: D,
                                  scaleX: D,
                                  scaleY: D,
                                  translateX: D,
                                  translateY: D,
                                  rotateZ: D,
                                },
                              },
                              create: function (e) {
                                var t = e.root,
                                  e = e.props;
                                (e.width = e.image.width),
                                  (e.height = e.image.height),
                                  (t.ref.bitmap = t.appendChildView(
                                    t.createChildView(
                                      n.utils.createView({
                                        name: "image-bitmap",
                                        ignoreRect: !0,
                                        mixins: {
                                          styles: ["scaleX", "scaleY"],
                                        },
                                        create: function (e) {
                                          var t = e.root,
                                            e = e.props;
                                          t.appendChild(e.image);
                                        },
                                      }),
                                      { image: e.image }
                                    )
                                  ));
                              },
                              write: function (e) {
                                var t = e.root,
                                  e = e.props.crop.flip,
                                  t = t.ref.bitmap;
                                (t.scaleX = e.horizontal ? -1 : 1),
                                  (t.scaleY = e.vertical ? -1 : 1);
                              },
                            }),
                            Object.assign({}, i)
                          )
                        )),
                        (t.ref.createMarkup = function () {
                          t.ref.markup ||
                            (t.ref.markup = t.appendChildView(
                              t.createChildView(
                                r.utils.createView({
                                  name: "image-preview-markup",
                                  tag: "svg",
                                  ignoreRect: !0,
                                  mixins: {
                                    apis: [
                                      "width",
                                      "height",
                                      "crop",
                                      "markup",
                                      "resize",
                                      "dirty",
                                    ],
                                  },
                                  write: function (e) {
                                    var t,
                                      n,
                                      i,
                                      r,
                                      o,
                                      s,
                                      a,
                                      l,
                                      u,
                                      c,
                                      d,
                                      f,
                                      p = e.root,
                                      e = e.props;
                                    e.dirty &&
                                      ((r = e.crop),
                                      (l = e.resize),
                                      (t = e.markup),
                                      (n = e.width),
                                      (e = e.height),
                                      (i = r.width),
                                      (r = r.height),
                                      l &&
                                        ((f = (o = l.size) && o.width),
                                        (o = o && o.height),
                                        (s = l.mode),
                                        (l = l.upscale),
                                        (i <
                                          (f =
                                            (o = f && !o ? f : o) && !f
                                              ? o
                                              : f) &&
                                          r < o &&
                                          !l) ||
                                          ((l = f / i),
                                          (u = o / r),
                                          "force" === s
                                            ? ((i = f), (r = o))
                                            : ("cover" === s
                                                ? (a = Math.max(l, u))
                                                : "contain" === s &&
                                                  (a = Math.min(l, u)),
                                              (i *= a),
                                              (r *= a)))),
                                      p.element.setAttribute(
                                        "width",
                                        (c = { width: n, height: e }).width
                                      ),
                                      p.element.setAttribute(
                                        "height",
                                        c.height
                                      ),
                                      (d = Math.min(n / i, e / r)),
                                      (p.element.innerHTML = ""),
                                      (f = p.query(
                                        "GET_IMAGE_PREVIEW_MARKUP_FILTER"
                                      )),
                                      t
                                        .filter(f)
                                        .map(I)
                                        .sort(k)
                                        .forEach(function (e) {
                                          var e = h(e, 2),
                                            t = e[0],
                                            e = e[1],
                                            n = b[t](e);
                                          T(n, t, e, c, d),
                                            p.element.appendChild(n);
                                        }));
                                  },
                                }),
                                Object.assign({}, i)
                              )
                            ));
                        }),
                        (t.ref.destroyMarkup = function () {
                          t.ref.markup &&
                            (t.removeChildView(t.ref.markup),
                            (t.ref.markup = null));
                        }),
                        t.query("GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR"));
                    null !== e &&
                      (t.element.dataset.transparencyIndicator =
                        "grid" === e ? e : "color");
                  },
                  write: function (e) {
                    var t = e.root,
                      n = e.props,
                      e = e.shouldOptimize,
                      i = n.crop,
                      r = n.markup,
                      o = n.resize,
                      s = n.dirty,
                      a = n.width,
                      n = n.height,
                      l =
                        ((t.ref.image.crop = i),
                        {
                          x: 0,
                          y: 0,
                          width: a,
                          height: n,
                          center: { x: 0.5 * a, y: 0.5 * n },
                        }),
                      u = {
                        width: t.ref.image.width,
                        height: t.ref.image.height,
                      },
                      c = { x: i.center.x * u.width, y: i.center.y * u.height },
                      d = {
                        x: l.center.x - u.width * i.center.x,
                        y: l.center.y - u.height * i.center.y,
                      },
                      f = 2 * Math.PI + (i.rotation % (2 * Math.PI)),
                      p = i.aspectRatio || u.height / u.width,
                      h = void 0 === i.scaleToFit || i.scaleToFit,
                      l = C(u, x(l, p), f, h ? i.center : { x: 0.5, y: 0.5 }),
                      p = i.zoom * l,
                      h =
                        (r && r.length
                          ? (t.ref.createMarkup(),
                            (t.ref.markup.width = a),
                            (t.ref.markup.height = n),
                            (t.ref.markup.resize = o),
                            (t.ref.markup.dirty = s),
                            (t.ref.markup.markup = r),
                            (t.ref.markup.crop = A(u, i)))
                          : t.ref.markup && t.ref.destroyMarkup(),
                        t.ref.image);
                    if (e)
                      return (
                        (h.originX = null),
                        (h.originY = null),
                        (h.translateX = null),
                        (h.translateY = null),
                        (h.rotateZ = null),
                        (h.scaleX = null),
                        void (h.scaleY = null)
                      );
                    (h.originX = c.x),
                      (h.originY = c.y),
                      (h.translateX = d.x),
                      (h.translateY = d.y),
                      (h.rotateZ = f),
                      (h.scaleX = p),
                      (h.scaleY = p);
                  },
                }),
                {
                  id: e.id,
                  image: e.image,
                  crop: e.crop,
                  markup: e.markup,
                  resize: e.resize,
                  dirty: e.dirty,
                  background: e.background,
                }
              )
            );
          },
          write: function (e) {
            var t,
              n = e.root,
              i = e.props,
              e = e.shouldOptimize,
              r = n.ref.clip,
              o = i.image,
              s = i.crop,
              a = i.markup,
              l = i.resize,
              i = i.dirty;
            (r.crop = s),
              (r.markup = a),
              (r.resize = l),
              (r.dirty = i),
              (r.opacity = e ? 0 : 1),
              e ||
                n.rect.element.hidden ||
                ((a = o.height / o.width),
                (l = s.aspectRatio || a),
                (i = n.rect.inner.width),
                (e = n.rect.inner.height),
                (o = n.query("GET_IMAGE_PREVIEW_HEIGHT")),
                (s = n.query("GET_IMAGE_PREVIEW_MIN_HEIGHT")),
                (a = n.query("GET_IMAGE_PREVIEW_MAX_HEIGHT")),
                (t = n.query("GET_PANEL_ASPECT_RATIO")),
                (n = n.query("GET_ALLOW_MULTIPLE")),
                t && !n && ((o = i * t), (l = t)),
                e <
                  (n =
                    i <
                    (t =
                      (n = null !== o ? o : Math.max(s, Math.min(i * l, a))) /
                      l)
                      ? (t = i) * l
                      : n) && (t = (n = e) / l),
                (r.width = t),
                (r.height = n));
          },
        }),
        s = e.utils.createWorker;
      return e.utils.createView({
        name: "image-preview-wrapper",
        create: function (e) {
          e = e.root;
          (e.ref.images = []),
            (e.ref.imageData = null),
            (e.ref.imageViewBin = []),
            (e.ref.overlayShadow = e.appendChildView(
              e.createChildView(r, { opacity: 0, status: "idle" })
            )),
            (e.ref.overlaySuccess = e.appendChildView(
              e.createChildView(r, { opacity: 0, status: "success" })
            )),
            (e.ref.overlayError = e.appendChildView(
              e.createChildView(r, { opacity: 0, status: "failure" })
            ));
        },
        styles: ["height"],
        apis: ["height"],
        destroy: function (e) {
          e.root.ref.images.forEach(function (e) {
            (e.image.width = 1), (e.image.height = 1);
          });
        },
        didWriteView: function (e) {
          e.root.ref.images.forEach(function (e) {
            e.dirty = !1;
          });
        },
        write: e.utils.createRoute(
          {
            DID_IMAGE_PREVIEW_DRAW: function (e) {
              (e = e.root), (e = e.ref.images[e.ref.images.length - 1]);
              (e.translateY = 0),
                (e.scaleX = 1),
                (e.scaleY = 1),
                (e.opacity = 1);
            },
            DID_IMAGE_PREVIEW_CONTAINER_CREATE: function (e) {
              var n = e.root,
                i = e.props.id,
                e = n.query("GET_ITEM", i);
              e &&
                M(URL.createObjectURL(e.file), function (e, t) {
                  n.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
                    id: i,
                    width: e,
                    height: t,
                  });
                });
            },
            DID_FINISH_CALCULATE_PREVIEWSIZE: function (e) {
              var d,
                t,
                n,
                i,
                r,
                f = e.root,
                p = e.props,
                e = p.id,
                h = f.query("GET_ITEM", e);
              h &&
                ((d = URL.createObjectURL(h.file)),
                (t = function () {
                  var i = d;
                  new Promise(function (e, t) {
                    var n = new Image();
                    (n.crossOrigin = "Anonymous"),
                      (n.onload = function () {
                        e(n);
                      }),
                      (n.onerror = function (e) {
                        t(e);
                      }),
                      (n.src = i);
                  }).then(n);
                }),
                (n = function (t) {
                  URL.revokeObjectURL(d);
                  var e,
                    n,
                    i,
                    r,
                    o,
                    s,
                    a,
                    l = (h.getMetadata("exif") || {}).orientation || -1,
                    u = t.width,
                    c = t.height;
                  u &&
                    c &&
                    (5 <= l && l <= 8 && ((u = (e = [c, u])[0]), (c = e[1])),
                    (e = Math.max(1, 0.75 * window.devicePixelRatio)),
                    (e = f.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR") * e),
                    (a = f.rect.element.width),
                    (i = f.rect.element.height),
                    (o = (r = a) * (n = c / u)),
                    1 < n
                      ? (o = (r = Math.min(u, a * e)) * n)
                      : (r = (o = Math.min(c, i * e)) / n),
                    (s = N(t, r, o, l)),
                    (u = function () {
                      var e = f.query(
                        "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR"
                      )
                        ? j(data)
                        : null;
                      h.setMetadata("color", e, !0),
                        "close" in t && t.close(),
                        (f.ref.overlayShadow.opacity = 1),
                        g({ root: f, props: p, image: s });
                    }),
                    (a = h.getMetadata("filter")) ? m(f, a, s).then(u) : u());
                }),
                (e = h.file),
                !(
                  null !==
                    (r = (r =
                      window.navigator.userAgent.match(/Firefox\/([0-9]+)\./))
                      ? parseInt(r[1])
                      : null) && r <= 58
                ) &&
                "createImageBitmap" in window &&
                L(e)
                  ? (i = s(R)).post({ file: h.file }, function (e) {
                      i.terminate(), e ? n(e) : t();
                    })
                  : t());
            },
            DID_UPDATE_ITEM_METADATA: function (e) {
              var t = e.root,
                n = e.props,
                e = e.action;
              if (
                /crop|filter|markup|resize/.test(e.change.key) &&
                t.ref.images.length
              ) {
                var i,
                  r,
                  o = t.query("GET_ITEM", { id: n.id });
                if (o) {
                  if (/filter/.test(e.change.key))
                    return (
                      (i = t.ref.images[t.ref.images.length - 1]),
                      void m(t, e.change.value, i.image)
                    );
                  /crop|markup|resize/.test(e.change.key) &&
                    ((i = o.getMetadata("crop")),
                    (e = t.ref.images[t.ref.images.length - 1]),
                    i &&
                    i.aspectRatio &&
                    e.crop &&
                    e.crop.aspectRatio &&
                    1e-5 < Math.abs(i.aspectRatio - e.crop.aspectRatio)
                      ? ((o = (o = { root: t }).root),
                        ((i = o.ref.images.shift()).opacity = 0),
                        (i.translateY = -15),
                        o.ref.imageViewBin.push(i),
                        g({
                          root: t,
                          props: n,
                          image:
                            ((e = i.image),
                            ((r = r || document.createElement("canvas")).width =
                              e.width),
                            (r.height = e.height),
                            r.getContext("2d").drawImage(e, 0, 0),
                            r),
                        }))
                      : ((e = (o = { root: t, props: n }).root),
                        (o = o.props),
                        (o = e.query("GET_ITEM", { id: o.id })) &&
                          (((r = e.ref.images[e.ref.images.length - 1]).crop =
                            o.getMetadata("crop")),
                          (r.background = e.query(
                            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                          )),
                          e.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
                            ((r.dirty = !0),
                            (r.resize = o.getMetadata("resize")),
                            (r.markup = o.getMetadata("markup"))))));
                }
              }
            },
            DID_THROW_ITEM_LOAD_ERROR: n,
            DID_THROW_ITEM_PROCESSING_ERROR: n,
            DID_THROW_ITEM_INVALID: n,
            DID_COMPLETE_ITEM_PROCESSING: function (e) {
              e = e.root;
              (e.ref.overlayShadow.opacity = 0.25),
                (e.ref.overlaySuccess.opacity = 1);
            },
            DID_START_ITEM_PROCESSING: t,
            DID_REVERT_ITEM_PROCESSING: t,
          },
          function (e) {
            var t = e.root,
              e = t.ref.imageViewBin.filter(function (e) {
                return 0 === e.opacity;
              });
            (t.ref.imageViewBin = t.ref.imageViewBin.filter(function (e) {
              return 0 < e.opacity;
            })),
              e.forEach(function (e) {
                return (
                  (e = e),
                  t.removeChildView(e),
                  (e.image.width = 1),
                  (e.image.height = 1),
                  void e._destroy()
                );
              }),
              (e.length = 0);
          }
        ),
      });
    }
    function t(e) {
      var t = e.addFilter,
        n = e.utils,
        i = n.Type,
        r = n.createRoute,
        l = n.isFile,
        u = v(e);
      return (
        t("CREATE_VIEW", function (e) {
          var t = e.is,
            s = e.view,
            a = e.query;
          t("file") &&
            a("GET_ALLOW_IMAGE_PREVIEW") &&
            s.registerWriter(
              r(
                {
                  DID_RESIZE_ROOT: (e = function (e) {
                    e.root.ref.shouldRescale = !0;
                  }),
                  DID_STOP_RESIZE: e,
                  DID_LOAD_ITEM: function (e) {
                    var t,
                      n,
                      i,
                      r = e.root,
                      e = e.props.id,
                      o = a("GET_ITEM", e);
                    o &&
                      l(o.file) &&
                      !o.archived &&
                      ((t = o.file),
                      /^image/.test(t.type) &&
                        a("GET_IMAGE_PREVIEW_FILTER_ITEM")(o) &&
                        ((n = "createImageBitmap" in (window || {})),
                        (i = a("GET_IMAGE_PREVIEW_MAX_FILE_SIZE")),
                        (!n && i && t.size > i) ||
                          ((r.ref.imagePreview = s.appendChildView(
                            s.createChildView(u, { id: e })
                          )),
                          (i = r.query("GET_IMAGE_PREVIEW_HEIGHT")) &&
                            r.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                              id: o.id,
                              height: i,
                            }),
                          (o =
                            !n &&
                            t.size >
                              a(
                                "GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE"
                              )),
                          r.dispatch(
                            "DID_IMAGE_PREVIEW_CONTAINER_CREATE",
                            { id: e },
                            o
                          ))));
                  },
                  DID_IMAGE_PREVIEW_CALCULATE_SIZE: function (e) {
                    var t = e.root,
                      e = e.action;
                    (t.ref.imageWidth = e.width),
                      (t.ref.imageHeight = e.height),
                      (t.ref.shouldRescale = !0),
                      (t.ref.shouldDrawPreview = !0),
                      t.dispatch("KICK");
                  },
                  DID_UPDATE_ITEM_METADATA: function (e) {
                    var t = e.root;
                    "crop" === e.action.change.key &&
                      (t.ref.shouldRescale = !0);
                  },
                },
                function (e) {
                  var t,
                    n,
                    i,
                    r,
                    o,
                    s,
                    a = e.root,
                    l = e.props;
                  a.ref.imagePreview &&
                    !a.rect.element.hidden &&
                    (a.ref.shouldRescale &&
                      ((e = l),
                      (t = a).ref.imagePreview &&
                        ((e = e.id),
                        (e = t.query("GET_ITEM", { id: e })) &&
                          ((s = t.query("GET_PANEL_ASPECT_RATIO")),
                          (r = t.query("GET_ITEM_PANEL_ASPECT_RATIO")),
                          (i = t.query("GET_IMAGE_PREVIEW_HEIGHT")),
                          s ||
                            r ||
                            i ||
                            ((r = (s = t.ref).imageWidth),
                            (i = s.imageHeight),
                            r &&
                              i &&
                              ((s = t.query("GET_IMAGE_PREVIEW_MIN_HEIGHT")),
                              (n = t.query("GET_IMAGE_PREVIEW_MAX_HEIGHT")),
                              5 <=
                                (o =
                                  (e.getMetadata("exif") || {}).orientation ||
                                  -1) &&
                                o <= 8 &&
                                ((r = (o = [i, r])[0]), (i = o[1])),
                              (L(e.file) &&
                                !t.query("GET_IMAGE_PREVIEW_UPSCALE")) ||
                                ((r *= o = 2048 / r), (i *= o)),
                              (o = i / r),
                              (r =
                                (e.getMetadata("crop") || {}).aspectRatio || o),
                              (o = Math.max(s, Math.min(i, n))),
                              (s = t.rect.element.width),
                              t.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                                id: e.id,
                                height: Math.min(s * r, o),
                              }))))),
                      (a.ref.shouldRescale = !1)),
                    a.ref.shouldDrawPreview &&
                      (requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                          a.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
                            id: l.id,
                          });
                        });
                      }),
                      (a.ref.shouldDrawPreview = !1)));
                }
              )
            );
        }),
        {
          options: {
            allowImagePreview: [!0, i.BOOLEAN],
            imagePreviewFilterItem: [
              function () {
                return !0;
              },
              i.FUNCTION,
            ],
            imagePreviewHeight: [null, i.INT],
            imagePreviewMinHeight: [44, i.INT],
            imagePreviewMaxHeight: [256, i.INT],
            imagePreviewMaxFileSize: [null, i.INT],
            imagePreviewZoomFactor: [2, i.INT],
            imagePreviewUpscale: [!1, i.BOOLEAN],
            imagePreviewMaxInstantPreviewFileSize: [1e6, i.INT],
            imagePreviewTransparencyIndicator: [null, i.STRING],
            imagePreviewCalculateAverageImageColor: [!1, i.BOOLEAN],
            imagePreviewMarkupShow: [!0, i.BOOLEAN],
            imagePreviewMarkupFilter: [
              function () {
                return !0;
              },
              i.FUNCTION,
            ],
          },
        }
      );
    }
    var y = function () {
        return {
          x: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
          y: 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
        };
      },
      _ = { contain: "xMidYMid meet", cover: "xMidYMid slice" },
      E = { left: "start", center: "middle", right: "end" },
      b = {
        image: function (e) {
          var t = r("image", {
            id: e.id,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            opacity: "0",
          });
          return (
            (t.onload = function () {
              t.setAttribute("opacity", e.opacity || 1);
            }),
            t.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              e.src
            ),
            t
          );
        },
        rect: e("rect"),
        ellipse: e("ellipse"),
        text: e("text"),
        path: e("path"),
        line: function (e) {
          var e = r("g", {
              id: e.id,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            }),
            t = r("line"),
            t = (e.appendChild(t), r("path")),
            t = (e.appendChild(t), r("path"));
          return e.appendChild(t), e;
        },
      },
      w = {
        rect: function (e) {
          return m(e, Object.assign({}, e.rect, e.styles));
        },
        ellipse: function (e) {
          var t = e.rect.x + 0.5 * e.rect.width,
            n = e.rect.y + 0.5 * e.rect.height,
            i = 0.5 * e.rect.width,
            r = 0.5 * e.rect.height;
          return m(e, Object.assign({ cx: t, cy: n, rx: i, ry: r }, e.styles));
        },
        image: function (e, t) {
          m(
            e,
            Object.assign({}, e.rect, e.styles, {
              preserveAspectRatio: _[t.fit] || "none",
            })
          );
        },
        text: function (e, t, n, i) {
          var n = f(t.fontSize, n, i),
            i = t.fontFamily || "sans-serif",
            r = t.fontWeight || "normal",
            o = E[t.textAlign] || "start";
          m(
            e,
            Object.assign({}, e.rect, e.styles, {
              "stroke-width": 0,
              "font-weight": r,
              "font-size": n,
              "font-family": i,
              "text-anchor": o,
            })
          ),
            e.text !== t.text &&
              ((e.text = t.text),
              (e.textContent = t.text.length ? t.text : " "));
        },
        path: function (e, t, n, i) {
          m(
            e,
            Object.assign({}, e.styles, {
              fill: "none",
              d: t.points
                .map(function (e) {
                  return {
                    x: f(e.x, n, i, "width"),
                    y: f(e.y, n, i, "height"),
                  };
                })
                .map(function (e, t) {
                  return ""
                    .concat(0 === t ? "M" : "L", " ")
                    .concat(e.x, " ")
                    .concat(e.y);
                })
                .join(" "),
            })
          );
        },
        line: function (e, t, n, i) {
          m(e, Object.assign({}, e.rect, e.styles, { fill: "none" }));
          var r,
            o = e.childNodes[0],
            s = e.childNodes[1],
            a = e.childNodes[2],
            l = e.rect,
            e = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
          m(o, { x1: l.x, y1: l.y, x2: e.x, y2: e.y }),
            t.lineDecoration &&
              ((s.style.display = "none"),
              (a.style.display = "none"),
              (o = { x: e.x - l.x, y: e.y - l.y }),
              (o =
                0 === (r = Math.sqrt(o.x * o.x + o.y * o.y))
                  ? { x: 0, y: 0 }
                  : y(o.x / r, o.y / r)),
              (r = f(0.05, n, i)),
              -1 !== t.lineDecoration.indexOf("arrow-begin") &&
                ((n = u(o, r)),
                (i = c(l, n)),
                (n = d(l, 2, i)),
                (i = d(l, -2, i)),
                m(s, {
                  style: "display:block;",
                  d: "M"
                    .concat(n.x, ",")
                    .concat(n.y, " L")
                    .concat(l.x, ",")
                    .concat(l.y, " L")
                    .concat(i.x, ",")
                    .concat(i.y),
                })),
              -1 !== t.lineDecoration.indexOf("arrow-end") &&
                ((s = u(o, -r)),
                (n = c(e, s)),
                (l = d(e, 2, n)),
                (i = d(e, -2, n)),
                m(a, {
                  style: "display:block;",
                  d: "M"
                    .concat(l.x, ",")
                    .concat(l.y, " L")
                    .concat(e.x, ",")
                    .concat(e.y, " L")
                    .concat(i.x, ",")
                    .concat(i.y),
                })));
        },
      },
      T = function (e, t, n, i, r) {
        var o, s, a, l, u, c, d;
        "path" !== t &&
          (e.rect = (function (e, t) {
            var n =
                2 < arguments.length && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1,
              i = f(e.x, t, n, "width") || f(e.left, t, n, "width"),
              r = f(e.y, t, n, "height") || f(e.top, t, n, "height"),
              o = f(e.width, t, n, "width"),
              s = f(e.height, t, n, "height"),
              a = f(e.right, t, n, "width"),
              e = f(e.bottom, t, n, "height");
            return (
              p(r) || (r = p(s) && p(e) ? t.height - s - e : e),
              {
                x: (i = p(i) ? i : p(o) && p(a) ? t.width - o - a : a) || 0,
                y: r || 0,
                width: (o = p(o) ? o : p(i) && p(a) ? t.width - i - a : 0) || 0,
                height:
                  (s = p(s) ? s : p(r) && p(e) ? t.height - r - e : 0) || 0,
              }
            );
          })(n, i, r)),
          (e.styles =
            ((s = i),
            (a = r),
            (l = (o = n).borderStyle || o.lineStyle || "solid"),
            (u = o.backgroundColor || o.fontColor || "transparent"),
            (c = o.borderColor || o.lineColor || "transparent"),
            (d = f(o.borderWidth || o.lineWidth, s, a)),
            {
              "stroke-linecap": o.lineCap || "round",
              "stroke-linejoin": o.lineJoin || "round",
              "stroke-width": d || 0,
              "stroke-dasharray":
                "string" == typeof l
                  ? ""
                  : l
                      .map(function (e) {
                        return f(e, s, a);
                      })
                      .join(","),
              stroke: c,
              fill: u,
              opacity: o.opacity || 1,
            })),
          w[t](e, n, i, r);
      },
      S = ["x", "y", "left", "top", "right", "bottom", "width", "height"],
      I = function (e) {
        var e = h(e, 2),
          t = e[0],
          n = e[1],
          e = n.points
            ? {}
            : S.reduce(function (e, t) {
                return (
                  (e[t] =
                    "string" == typeof (t = n[t]) && /%/.test(t)
                      ? parseFloat(t) / 100
                      : t),
                  e
                );
              }, {});
        return [t, Object.assign({ zIndex: 0 }, n, e)];
      },
      k = function (e, t) {
        return e[1].zIndex > t[1].zIndex
          ? 1
          : e[1].zIndex < t[1].zIndex
          ? -1
          : 0;
      },
      C = function (e, t, n, i) {
        var r = 0.5 < i.x ? 1 - i.x : i.x,
          i = 0.5 < i.y ? 1 - i.y : i.y,
          r = 2 * r * e.width,
          i = 2 * i * e.height,
          o =
            ((e = n),
            (t = (n = t).width),
            (o = n.height),
            (t = l(t, e)),
            (o = l(o, e)),
            (e = s(n.x + Math.abs(t.x), n.y - Math.abs(t.y))),
            (t = s(n.x + n.width + Math.abs(o.y), n.y + Math.abs(o.x))),
            (n = s(n.x - Math.abs(o.y), n.y + n.height - Math.abs(o.x))),
            { width: a(e, t), height: a(e, n) });
        return Math.max(o.width / r, o.height / i);
      },
      x = function (e, t) {
        var n = e.width,
          i = n * t;
        return (
          i > e.height && (n = (i = e.height) / t),
          {
            x: 0.5 * (e.width - n),
            y: 0.5 * (e.height - i),
            width: n,
            height: i,
          }
        );
      },
      A = function (e) {
        var t =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.zoom,
          i = t.rotation,
          r = t.center,
          o = t.aspectRatio,
          s = (function (e, t) {
            var n =
                2 < arguments.length && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1,
              i = e.height / e.width,
              r = 1,
              o = i,
              i = (t < i && (r = (o = t) / i), Math.max(1 / r, t / o)),
              o = e.width / (n * i * r);
            return { width: o, height: o * t };
          })(e, (o = o || e.height / e.width), n),
          a = { x: 0.5 * s.width, y: 0.5 * s.height },
          a = { x: 0, y: 0, width: s.width, height: s.height, center: a },
          t = void 0 === t.scaleToFit || t.scaleToFit,
          n = n * C(e, x(a, o), i, t ? r : { x: 0.5, y: 0.5 });
        return {
          widthFloat: s.width / n,
          heightFloat: s.height / n,
          width: Math.round(s.width / n),
          height: Math.round(s.height / n),
        };
      },
      D = { type: "spring", stiffness: 0.5, damping: 0.45, mass: 10 },
      O = 0,
      R = function () {
        self.onmessage = function (t) {
          createImageBitmap(t.data.message.file).then(function (e) {
            self.postMessage({ id: t.data.id, message: e }, [e]);
          });
        };
      },
      P = function () {
        self.onmessage = function (e) {
          for (
            var t,
              n,
              i,
              r,
              o = e.data.message.imageData,
              s = e.data.message.colorMatrix,
              a = o.data,
              l = a.length,
              u = s[0],
              c = s[1],
              d = s[2],
              f = s[3],
              p = s[4],
              h = s[5],
              m = s[6],
              g = s[7],
              v = s[8],
              y = s[9],
              _ = s[10],
              E = s[11],
              b = s[12],
              w = s[13],
              T = s[14],
              S = s[15],
              I = s[16],
              k = s[17],
              C = s[18],
              x = s[19],
              A = 0;
            A < l;
            A += 4
          )
            (t = a[A] / 255),
              (n = a[A + 1] / 255),
              (i = a[A + 2] / 255),
              (r = a[A + 3] / 255),
              (a[A] = Math.max(
                0,
                Math.min(255 * (t * u + n * c + i * d + r * f + p), 255)
              )),
              (a[A + 1] = Math.max(
                0,
                Math.min(255 * (t * h + n * m + i * g + r * v + y), 255)
              )),
              (a[A + 2] = Math.max(
                0,
                Math.min(255 * (t * _ + n * E + i * b + r * w + T), 255)
              )),
              (a[A + 3] = Math.max(
                0,
                Math.min(255 * (t * S + n * I + i * k + r * C + x), 255)
              ));
          self.postMessage({ id: e.data.id, message: o }, [o.data.buffer]);
        };
      },
      M = function (e, n) {
        var i = new Image();
        (i.onload = function () {
          var e = i.naturalWidth,
            t = i.naturalHeight;
          (i = null), n(e, t);
        }),
          (i.src = e);
      },
      F = {
        1: function () {
          return [1, 0, 0, 1, 0, 0];
        },
        2: function (e) {
          return [-1, 0, 0, 1, e, 0];
        },
        3: function (e, t) {
          return [-1, 0, 0, -1, e, t];
        },
        4: function (e, t) {
          return [1, 0, 0, -1, 0, t];
        },
        5: function () {
          return [0, 1, 1, 0, 0, 0];
        },
        6: function (e, t) {
          return [0, 1, -1, 0, t, 0];
        },
        7: function (e, t) {
          return [0, -1, -1, 0, t, e];
        },
        8: function (e) {
          return [0, -1, 1, 0, 0, e];
        },
      },
      N = function (e, t, n, i) {
        (t = Math.round(t)), (n = Math.round(n));
        var r,
          o,
          s,
          a = document.createElement("canvas"),
          l = ((a.width = t), (a.height = n), a.getContext("2d"));
        return (
          5 <= i && i <= 8 && ((t = (r = [n, t])[0]), (n = r[1])),
          (r = l),
          (o = t),
          (s = n),
          -1 !== (i = i) && r.transform.apply(r, F[i](o, s)),
          l.drawImage(e, 0, 0, t, n),
          a
        );
      },
      L = function (e) {
        return /^image/.test(e.type) && !/svg/.test(e.type);
      },
      j = function (e) {
        var t = Math.min(10 / e.width, 10 / e.height),
          n = document.createElement("canvas"),
          i = n.getContext("2d"),
          r = (n.width = Math.ceil(e.width * t)),
          n = (n.height = Math.ceil(e.height * t)),
          o = (i.drawImage(e, 0, 0, r, n), null);
        try {
          o = i.getImageData(0, 0, r, n).data;
        } catch (e) {
          return null;
        }
        for (var s = o.length, a = 0, l = 0, u = 0, c = 0; c < s; c += 4)
          (a += o[c] * o[c]),
            (l += o[c + 1] * o[c + 1]),
            (u += o[c + 2] * o[c + 2]);
        return { r: (a = g(a, s)), g: (l = g(l, s)), b: (u = g(u, s)) };
      },
      $ = function (t) {
        var n;
        try {
          n = new ImageData(t.width, t.height);
        } catch (e) {
          n = document
            .createElement("canvas")
            .getContext("2d")
            .createImageData(t.width, t.height);
        }
        return n.data.set(new Uint8ClampedArray(t.data)), n;
      };
    return (
      "undefined" != typeof window &&
        void 0 !== window.document &&
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: t })
        ),
      t
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e =
          "undefined" != typeof globalThis
            ? globalThis
            : e || self).FilePondPluginMediaPreview = t());
  })(this, function () {
    "use strict";
    const l = (e) => /^video/.test(e.type),
      u = (e) => /^audio/.test(e.type);
    class s {
      constructor(e, t) {
        (this.mediaEl = e),
          (this.audioElems = t),
          (this.onplayhead = !1),
          (this.duration = 0),
          (this.timelineWidth =
            this.audioElems.timeline.offsetWidth -
            this.audioElems.playhead.offsetWidth),
          (this.moveplayheadFn = this.moveplayhead.bind(this)),
          this.registerListeners();
      }
      registerListeners() {
        this.mediaEl.addEventListener(
          "timeupdate",
          this.timeUpdate.bind(this),
          !1
        ),
          this.mediaEl.addEventListener(
            "canplaythrough",
            () => (this.duration = this.mediaEl.duration),
            !1
          ),
          this.audioElems.timeline.addEventListener(
            "click",
            this.timelineClicked.bind(this),
            !1
          ),
          this.audioElems.button.addEventListener(
            "click",
            this.play.bind(this)
          ),
          this.audioElems.playhead.addEventListener(
            "mousedown",
            this.mouseDown.bind(this),
            !1
          ),
          window.addEventListener("mouseup", this.mouseUp.bind(this), !1);
      }
      play() {
        this.mediaEl.paused ? this.mediaEl.play() : this.mediaEl.pause(),
          this.audioElems.button.classList.toggle("play"),
          this.audioElems.button.classList.toggle("pause");
      }
      timeUpdate() {
        var e = (this.mediaEl.currentTime / this.duration) * 100;
        (this.audioElems.playhead.style.marginLeft = e + "%"),
          this.mediaEl.currentTime === this.duration &&
            (this.audioElems.button.classList.toggle("play"),
            this.audioElems.button.classList.toggle("pause"));
      }
      moveplayhead(e) {
        e = e.clientX - this.getPosition(this.audioElems.timeline);
        0 <= e &&
          e <= this.timelineWidth &&
          (this.audioElems.playhead.style.marginLeft = e + "px"),
          e < 0 && (this.audioElems.playhead.style.marginLeft = "0px"),
          e > this.timelineWidth &&
            (this.audioElems.playhead.style.marginLeft =
              this.timelineWidth - 4 + "px");
      }
      timelineClicked(e) {
        this.moveplayhead(e),
          (this.mediaEl.currentTime = this.duration * this.clickPercent(e));
      }
      mouseDown() {
        (this.onplayhead = !0),
          window.addEventListener("mousemove", this.moveplayheadFn, !0),
          this.mediaEl.removeEventListener(
            "timeupdate",
            this.timeUpdate.bind(this),
            !1
          );
      }
      mouseUp(e) {
        window.removeEventListener("mousemove", this.moveplayheadFn, !0),
          1 == this.onplayhead &&
            (this.moveplayhead(e),
            (this.mediaEl.currentTime = this.duration * this.clickPercent(e)),
            this.mediaEl.addEventListener(
              "timeupdate",
              this.timeUpdate.bind(this),
              !1
            )),
          (this.onplayhead = !1);
      }
      clickPercent(e) {
        return (
          (e.clientX - this.getPosition(this.audioElems.timeline)) /
          this.timelineWidth
        );
      }
      getPosition(e) {
        return e.getBoundingClientRect().left;
      }
    }
    const e = (e) => {
      const { addFilter: t, utils: n } = e,
        { Type: i, createRoute: r } = n,
        a = (o = e).utils.createView({
          name: "media-preview-wrapper",
          create: ({ root: e, props: t }) => {
            var n = o.utils.createView({
              name: "media-preview",
              tag: "div",
              ignoreRect: !0,
              create: ({ root: t, props: e }) => {
                var {} = e,
                  e = t.query("GET_ITEM", { id: e.id }),
                  n = u(e.file) ? "audio" : "video";
                if (
                  ((t.ref.media = document.createElement(n)),
                  t.ref.media.setAttribute("controls", !0),
                  t.element.appendChild(t.ref.media),
                  u(e.file))
                ) {
                  let e = document.createDocumentFragment();
                  (t.ref.audio = []),
                    (t.ref.audio.container = document.createElement("div")),
                    (t.ref.audio.button = document.createElement("span")),
                    (t.ref.audio.timeline = document.createElement("div")),
                    (t.ref.audio.playhead = document.createElement("div")),
                    (t.ref.audio.container.className = "audioplayer"),
                    (t.ref.audio.button.className = "playpausebtn play"),
                    (t.ref.audio.timeline.className = "timeline"),
                    (t.ref.audio.playhead.className = "playhead"),
                    t.ref.audio.timeline.appendChild(t.ref.audio.playhead),
                    t.ref.audio.container.appendChild(t.ref.audio.button),
                    t.ref.audio.container.appendChild(t.ref.audio.timeline),
                    e.appendChild(t.ref.audio.container),
                    t.element.appendChild(e);
                }
              },
              write: o.utils.createRoute({
                DID_MEDIA_PREVIEW_LOAD: ({ root: n, props: i }) => {
                  const {} = i,
                    r = n.query("GET_ITEM", { id: i.id });
                  if (r) {
                    let e = window.URL || window.webkitURL,
                      t = new Blob([r.file], { type: r.file.type });
                    (n.ref.media.type = r.file.type),
                      (n.ref.media.src =
                        (r.file.mock && r.file.url) || e.createObjectURL(t)),
                      u(r.file) && new s(n.ref.media, n.ref.audio),
                      n.ref.media.addEventListener(
                        "loadeddata",
                        () => {
                          let e = 75;
                          var t;
                          l(r.file) &&
                            ((t = n.ref.media.offsetWidth),
                            (t = n.ref.media.videoWidth / t),
                            (e = n.ref.media.videoHeight / t)),
                            n.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                              id: i.id,
                              height: e,
                            });
                        },
                        !1
                      );
                  }
                },
              }),
            });
            e.ref.media = e.appendChildView(e.createChildView(n, { id: t.id }));
          },
          write: o.utils.createRoute({
            DID_MEDIA_PREVIEW_CONTAINER_CREATE: ({ root: e, props: t }) => {
              t = t.id;
              e.query("GET_ITEM", t) &&
                e.dispatch("DID_MEDIA_PREVIEW_LOAD", { id: t });
            },
          }),
        });
      var o;
      return (
        t("CREATE_VIEW", (e) => {
          const { is: t, view: o, query: s } = e;
          t("file") &&
            o.registerWriter(
              r(
                {
                  DID_LOAD_ITEM: ({ root: e, props: t }) => {
                    var t = t["id"],
                      n = s("GET_ITEM", t),
                      i = s("GET_ALLOW_VIDEO_PREVIEW"),
                      r = s("GET_ALLOW_AUDIO_PREVIEW");
                    n &&
                      !n.archived &&
                      ((l(n.file) && i) || (u(n.file) && r)) &&
                      ((e.ref.mediaPreview = o.appendChildView(
                        o.createChildView(a, { id: t })
                      )),
                      e.dispatch("DID_MEDIA_PREVIEW_CONTAINER_CREATE", {
                        id: t,
                      }));
                  },
                },
                ({ root: e, props: t }) => {
                  var t = t["id"],
                    t = s("GET_ITEM", t),
                    n = e.query("GET_ALLOW_VIDEO_PREVIEW"),
                    i = e.query("GET_ALLOW_AUDIO_PREVIEW");
                  t &&
                    ((l(t.file) && n) || (u(t.file) && i)) &&
                    e.rect.element.hidden;
                }
              )
            );
        }),
        {
          options: {
            allowVideoPreview: [!0, i.BOOLEAN],
            allowAudioPreview: [!0, i.BOOLEAN],
          },
        }
      );
    };
    return (
      "undefined" != typeof window &&
        void 0 !== window.document &&
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: e })
        ),
      e
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).FilePondPluginFileValidateSize = t());
  })(this, function () {
    "use strict";
    function e(e) {
      var t = e.addFilter,
        n = (e = e.utils).Type,
        o = e.replaceInString,
        s = e.toNaturalFileSize;
      return (
        t("ALLOW_HOPPER_ITEM", function (e, t) {
          t = t.query;
          if (!t("GET_ALLOW_FILE_SIZE_VALIDATION")) return !0;
          var n = t("GET_MAX_FILE_SIZE");
          if (null !== n && e.size > n) return !1;
          n = t("GET_MIN_FILE_SIZE");
          return !(null !== n && e.size < n);
        }),
        t("LOAD_FILE", function (i, e) {
          var r = e.query;
          return new Promise(function (e, t) {
            if (!r("GET_ALLOW_FILE_SIZE_VALIDATION")) return e(i);
            var n = r("GET_FILE_VALIDATE_SIZE_FILTER");
            if (n && !n(i)) return e(i);
            n = r("GET_MAX_FILE_SIZE");
            if (null !== n && i.size > n)
              t({
                status: {
                  main: r("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
                  sub: o(r("GET_LABEL_MAX_FILE_SIZE"), {
                    filesize: s(
                      n,
                      ".",
                      r("GET_FILE_SIZE_BASE"),
                      r("GET_FILE_SIZE_LABELS", r)
                    ),
                  }),
                },
              });
            else {
              n = r("GET_MIN_FILE_SIZE");
              if (null !== n && i.size < n)
                t({
                  status: {
                    main: r("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
                    sub: o(r("GET_LABEL_MIN_FILE_SIZE"), {
                      filesize: s(
                        n,
                        ".",
                        r("GET_FILE_SIZE_BASE"),
                        r("GET_FILE_SIZE_LABELS", r)
                      ),
                    }),
                  },
                });
              else {
                n = r("GET_MAX_TOTAL_FILE_SIZE");
                if (null !== n)
                  if (
                    n <
                    r("GET_ACTIVE_ITEMS").reduce(function (e, t) {
                      return e + t.fileSize;
                    }, 0)
                  )
                    return void t({
                      status: {
                        main: r("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"),
                        sub: o(r("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
                          filesize: s(
                            n,
                            ".",
                            r("GET_FILE_SIZE_BASE"),
                            r("GET_FILE_SIZE_LABELS", r)
                          ),
                        }),
                      },
                    });
                e(i);
              }
            }
          });
        }),
        {
          options: {
            allowFileSizeValidation: [!0, n.BOOLEAN],
            maxFileSize: [null, n.INT],
            minFileSize: [null, n.INT],
            maxTotalFileSize: [null, n.INT],
            fileValidateSizeFilter: [null, n.FUNCTION],
            labelMinFileSizeExceeded: ["File is too small", n.STRING],
            labelMinFileSize: ["Minimum file size is {filesize}", n.STRING],
            labelMaxFileSizeExceeded: ["File is too large", n.STRING],
            labelMaxFileSize: ["Maximum file size is {filesize}", n.STRING],
            labelMaxTotalFileSizeExceeded: [
              "Maximum total size exceeded",
              n.STRING,
            ],
            labelMaxTotalFileSize: [
              "Maximum total file size is {filesize}",
              n.STRING,
            ],
          },
        }
      );
    }
    return (
      "undefined" != typeof window &&
        void 0 !== window.document &&
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: e })
        ),
      e
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).FilePondPluginFileValidateType = t());
  })(this, function () {
    "use strict";
    function e(e) {
      function a(e, t) {
        return e.some(function (e) {
          return /\*$/.test(e) ? i(t, e) : e === t;
        });
      }
      function l(e, i, r) {
        if (0 === i.length) return !0;
        (o = ""),
          u((t = e)) ? ((n = p(t)), (n = f(n)) && (o = d(n))) : (o = t.type);
        var t,
          n,
          o,
          s = o;
        return r
          ? new Promise(function (t, n) {
              r(e, s)
                .then(function (e) {
                  (a(i, e) ? t : n)();
                })
                .catch(n);
            })
          : a(i, s);
      }
      var t = e.addFilter,
        n = (e = e.utils).Type,
        u = e.isString,
        c = e.replaceInString,
        d = e.guesstimateMimeType,
        f = e.getExtensionFromFilename,
        p = e.getFilenameFromURL,
        i = function (e, t) {
          return (/^[^/]+/.exec(e) || []).pop() === t.slice(0, -2);
        };
      return (
        t("SET_ATTRIBUTE_TO_OPTION_MAP", function (e) {
          return Object.assign(e, { accept: "acceptedFileTypes" });
        }),
        t("ALLOW_HOPPER_ITEM", function (e, t) {
          t = t.query;
          return (
            !t("GET_ALLOW_FILE_TYPE_VALIDATION") ||
            l(e, t("GET_ACCEPTED_FILE_TYPES"))
          );
        }),
        t("LOAD_FILE", function (o, e) {
          var s = e.query;
          return new Promise(function (e, i) {
            var r, t, n;
            {
              if (s("GET_ALLOW_FILE_TYPE_VALIDATION"))
                return (
                  (r = s("GET_ACCEPTED_FILE_TYPES")),
                  (t = s("GET_FILE_VALIDATE_TYPE_DETECT_TYPE")),
                  (n = function () {
                    var t,
                      n = r
                        .map(
                          ((t = s(
                            "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"
                          )),
                          function (e) {
                            return null !== t[e] && (t[e] || e);
                          })
                        )
                        .filter(function (e) {
                          return !1 !== e;
                        }),
                      e = n.filter(function (e, t) {
                        return n.indexOf(e) === t;
                      });
                    i({
                      status: {
                        main: s("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
                        sub: c(
                          s("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"),
                          {
                            allTypes: e.join(", "),
                            allButLastType: e.slice(0, -1).join(", "),
                            lastType: e[e.length - 1],
                          }
                        ),
                      },
                    });
                  }),
                  "boolean" == typeof (t = l(o, r, t))
                    ? t
                      ? e(o)
                      : n()
                    : void t
                        .then(function () {
                          e(o);
                        })
                        .catch(n)
                );
              e(o);
            }
          });
        }),
        {
          options: {
            allowFileTypeValidation: [!0, n.BOOLEAN],
            acceptedFileTypes: [[], n.ARRAY],
            labelFileTypeNotAllowed: ["File is of invalid type", n.STRING],
            fileValidateTypeLabelExpectedTypes: [
              "Expects {allButLastType} or {lastType}",
              n.STRING,
            ],
            fileValidateTypeLabelExpectedTypesMap: [{}, n.OBJECT],
            fileValidateTypeDetectType: [null, n.FUNCTION],
          },
        }
      );
    }
    return (
      "undefined" != typeof window &&
        void 0 !== window.document &&
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: e })
        ),
      e
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], t)
      : t(((e = e || self).FilePond = {}));
  })(this, function (n) {
    "use strict";
    function G(i) {
      var r = {};
      return (
        D(i, function (e) {
          var t, n;
          (t = r),
            "function" != typeof (n = i[(e = e)])
              ? Object.defineProperty(t, e, Object.assign({}, n))
              : (t[e] = n);
        }),
        r
      );
    }
    function k(e) {
      return ee.includes(e);
    }
    function q(e, t) {
      var n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
        i =
          ("object" == typeof t && ((n = t), (t = null)),
          k(e)
            ? document.createElementNS("http://www.w3.org/2000/svg", e)
            : document.createElement(e));
      return (
        t && (k(e) ? l(i, "class", t) : (i.className = t)),
        D(n, function (e, t) {
          l(i, e, t);
        }),
        i
      );
    }
    function U(e, t, n, i) {
      var r = n[0] || e.left,
        n = n[1] || e.top,
        o = r + e.width,
        i = n + e.height * (i[1] || 1),
        s = {
          element: Object.assign({}, e),
          inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom },
          outer: { left: r, top: n, right: o, bottom: i },
        };
      return (
        t
          .filter(function (e) {
            return !e.isRectIgnored();
          })
          .map(function (e) {
            return e.rect;
          })
          .forEach(function (e) {
            ie(s.inner, Object.assign({}, e.inner)),
              ie(s.outer, Object.assign({}, e.outer));
          }),
        re(s.inner),
        (s.outer.bottom += s.element.marginBottom),
        (s.outer.right += s.element.marginRight),
        re(s.outer),
        s
      );
    }
    function C(e) {
      return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
    }
    function x(e, t, o) {
      var s = 3 < arguments.length && void 0 !== arguments[3] && arguments[3];
      (t = Array.isArray(t) ? t : [t]).forEach(function (r) {
        e.forEach(function (t) {
          var e = t,
            n = function () {
              return o[t];
            },
            i = function (e) {
              return (o[t] = e);
            };
          "object" == typeof t &&
            ((e = t.key), (n = t.getter || n), (i = t.setter || i)),
            (r[e] && !s) || (r[e] = { get: n, set: i });
        });
      });
    }
    function _(e) {
      return null != e;
    }
    function V() {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      return (
        t.layoutCalculated ||
          ((e.paddingTop = parseInt(n.paddingTop, 10) || 0),
          (e.marginTop = parseInt(n.marginTop, 10) || 0),
          (e.marginRight = parseInt(n.marginRight, 10) || 0),
          (e.marginBottom = parseInt(n.marginBottom, 10) || 0),
          (e.marginLeft = parseInt(n.marginLeft, 10) || 0),
          (t.layoutCalculated = !0)),
        (e.left = t.offsetLeft || 0),
        (e.top = t.offsetTop || 0),
        (e.width = t.offsetWidth || 0),
        (e.height = t.offsetHeight || 0),
        (e.right = e.left + e.width),
        (e.bottom = e.top + e.height),
        (e.scrollTop = t.scrollTop),
        (e.hidden = null === t.offsetParent),
        e
      );
    }
    function o() {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.tag,
        x = void 0 === t ? "div" : t,
        A = void 0 === (t = e.name) ? null : t,
        D = void 0 === (t = e.attributes) ? {} : t,
        O = void 0 === (t = e.read) ? function () {} : t,
        R = void 0 === (t = e.write) ? function () {} : t,
        P = void 0 === (t = e.create) ? function () {} : t,
        M = void 0 === (t = e.destroy) ? function () {} : t,
        L =
          void 0 === (t = e.filterFrameActionsForChild)
            ? function (e, t) {
                return t;
              }
            : t,
        F = void 0 === (t = e.didCreateView) ? function () {} : t,
        N = void 0 === (t = e.didWriteView) ? function () {} : t,
        j = void 0 !== (t = e.ignoreRect) && t,
        $ = void 0 !== (t = e.ignoreRectUpdate) && t,
        B = void 0 === (t = e.mixins) ? [] : t;
      return function (e) {
        function t() {
          return c;
        }
        function n() {
          return m.concat();
        }
        function i() {
          return (p = p || U(f, m, [0, 0], [1, 1]));
        }
        var r,
          o,
          s,
          a,
          l,
          u =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          c = q(x, "filepond--" + A, D),
          d = window.getComputedStyle(c, null),
          f = V(),
          p = null,
          h = !1,
          m = [],
          g = [],
          v = {},
          y = {},
          _ = [R],
          E = [O],
          b = [M],
          w = {
            element: { get: t },
            style: {
              get: function () {
                return d;
              },
            },
            childViews: { get: n },
          },
          T = Object.assign({}, w, {
            rect: { get: i },
            ref: {
              get: function () {
                return v;
              },
            },
            is: function (e) {
              return A === e;
            },
            appendChild: function (e, t) {
              void 0 !== t && r.children[t]
                ? r.insertBefore(e, r.children[t])
                : r.appendChild(e);
            },
            createChildView: function (e, t) {
              return e(l, t);
            },
            linkView: function (e) {
              return m.push(e), e;
            },
            unlinkView: function (e) {
              m.splice(m.indexOf(e), 1);
            },
            appendChildView: function (e, t) {
              return void 0 !== t ? a.splice(t, 0, e) : a.push(e), e;
            },
            removeChildView:
              ((o = r = c),
              (s = a = m),
              function (e) {
                return (
                  s.splice(s.indexOf(e), 1),
                  e.element.parentNode && o.removeChild(e.element),
                  e
                );
              }),
            registerWriter: function (e) {
              return _.push(e);
            },
            registerReader: function (e) {
              return E.push(e);
            },
            registerDestroyer: function (e) {
              return b.push(e);
            },
            invalidateLayout: function () {
              return (c.layoutCalculated = !1);
            },
            dispatch: (l = e).dispatch,
            query: e.query,
          }),
          S = {
            element: { get: t },
            childViews: { get: n },
            rect: { get: i },
            resting: {
              get: function () {
                return h;
              },
            },
            isRectIgnored: function () {
              return j;
            },
            _read: function () {
              (p = null),
                m.forEach(function (e) {
                  return e._read();
                }),
                ($ && f.width && f.height) || V(f, c, d);
              var t = { root: k, props: u, rect: f };
              E.forEach(function (e) {
                return e(t);
              });
            },
            _write: function (n, i, r) {
              var o = 0 === i.length;
              return (
                _.forEach(function (e) {
                  !1 ===
                    e({
                      props: u,
                      root: k,
                      actions: i,
                      timestamp: n,
                      shouldOptimize: r,
                    }) && (o = !1);
                }),
                g.forEach(function (e) {
                  !1 === e.write(n) && (o = !1);
                }),
                m
                  .filter(function (e) {
                    return !!e.element.parentNode;
                  })
                  .forEach(function (e) {
                    e._write(n, L(e, i), r) || (o = !1);
                  }),
                m.forEach(function (e, t) {
                  e.element.parentNode ||
                    (k.appendChild(e.element, t),
                    e._read(),
                    e._write(n, L(e, i), r),
                    (o = !1));
                }),
                (h = o),
                N({ props: u, root: k, actions: i, timestamp: n }),
                o
              );
            },
            _destroy: function () {
              g.forEach(function (e) {
                return e.destroy();
              }),
                b.forEach(function (e) {
                  e({ root: k, props: u });
                }),
                m.forEach(function (e) {
                  return e._destroy();
                });
            },
          },
          I = Object.assign({}, w, {
            rect: {
              get: function () {
                return f;
              },
            },
          }),
          k =
            (Object.keys(B)
              .sort(function (e, t) {
                return "styles" === e ? 1 : "styles" === t ? -1 : 0;
              })
              .forEach(function (e) {
                e = ae[e]({
                  mixinConfig: B[e],
                  viewProps: u,
                  viewState: y,
                  viewInternalAPI: T,
                  viewExternalAPI: S,
                  view: G(I),
                });
                e && g.push(e);
              }),
            G(T)),
          C = (P({ root: k, props: u }), ne(c));
        return (
          m.forEach(function (e, t) {
            k.appendChild(e.element, C + t);
          }),
          F(k),
          G(S)
        );
      };
    }
    function t(s, a) {
      return function (e) {
        var t = e.root,
          n = e.props,
          i = e.actions,
          i = void 0 === i ? [] : i,
          r = e.timestamp,
          o = e.shouldOptimize;
        i
          .filter(function (e) {
            return s[e.type];
          })
          .forEach(function (e) {
            return s[e.type]({
              root: t,
              props: n,
              action: e.data,
              timestamp: r,
              shouldOptimize: o,
            });
          }),
          a &&
            a({
              root: t,
              props: n,
              actions: i,
              timestamp: r,
              shouldOptimize: o,
            });
      };
    }
    function $(e, t) {
      return t.parentNode.insertBefore(e, t);
    }
    function B(e, t) {
      return t.parentNode.insertBefore(e, t.nextSibling);
    }
    function H(e) {
      return Array.isArray(e);
    }
    function A(e) {
      return e.trim();
    }
    function z(e) {
      return "boolean" == typeof e;
    }
    function W(e) {
      return z(e) ? e : "true" === e;
    }
    function Y(e) {
      return parseInt(ue(e), 10);
    }
    function X(e) {
      return parseFloat(ue(e));
    }
    function Z(e) {
      var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1e3;
      return a(e)
        ? e
        : ((e = le(e).trim()),
          /MB$/i.test(e)
            ? ((e = e.replace(/MB$i/, "").trim()), Y(e) * t * t)
            : /KB/i.test(e)
            ? ((e = e.replace(/KB$i/, "").trim()), Y(e) * t)
            : Y(e));
    }
    function y(e) {
      return "function" == typeof e;
    }
    function K(e) {
      return H(e)
        ? "array"
        : null === e
        ? "null"
        : a(e)
        ? "int"
        : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
        ? "bytes"
        : R((t = e)) &&
          E(t.url) &&
          R(t.process) &&
          R(t.revert) &&
          R(t.restore) &&
          R(t.fetch)
        ? "api"
        : typeof e;
      var t;
    }
    function J(e, t, n) {
      if (e === t) return e;
      if (K(e) !== n) {
        t = e;
        t = de[n](t);
        K(t);
        if (null === t)
          throw (
            'Trying to assign value with incorrect type to "' +
            option +
            '", allowed type: "' +
            n +
            '"'
          );
        e = t;
      }
      return e;
    }
    function Q(e) {
      var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "-";
      return e
        .split(/(?=[A-Z])/)
        .map(function (e) {
          return e.toLowerCase();
        })
        .join(t);
    }
    var D = function (e, t) {
        for (var n in e) e.hasOwnProperty(n) && t(n, e[n]);
      },
      l = function (e, t) {
        var n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (null === n) return e.getAttribute(t) || e.hasAttribute(t);
        e.setAttribute(t, n);
      },
      ee = ["svg", "path"],
      te = "undefined" != typeof window && void 0 !== window.document,
      ne =
        "children" in (te ? q("svg") : {})
          ? function (e) {
              return e.children.length;
            }
          : function (e) {
              return e.childNodes.length;
            },
      ie = function (e, t) {
        (t.top += e.top),
          (t.right += e.left),
          (t.bottom += e.top),
          (t.left += e.left),
          t.bottom > e.bottom && (e.bottom = t.bottom),
          t.right > e.right && (e.right = t.right);
      },
      re = function (e) {
        (e.width = e.right - e.left), (e.height = e.bottom - e.top);
      },
      O = function (e) {
        return "number" == typeof e;
      },
      oe = {
        spring: function () {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.stiffness,
            n = void 0 === t ? 0.5 : t,
            t = e.damping,
            i = void 0 === t ? 0.75 : t,
            t = e.mass,
            r = void 0 === t ? 10 : t,
            o = null,
            s = null,
            a = 0,
            l = !1,
            u = G({
              interpolate: function (e, t) {
                if (!l) {
                  if (!O(o) || !O(s)) return (l = !0), void (a = 0);
                  (function (e, t, n, i) {
                    i = 3 < arguments.length && void 0 !== i ? i : 0.001;
                    return Math.abs(e - t) < i && Math.abs(n) < i;
                  })((s += a += (-(s - o) * n) / r), o, (a *= i)) || t
                    ? ((s = o), (l = !(a = 0)), u.onupdate(s), u.oncomplete(s))
                    : u.onupdate(s);
                }
              },
              target: {
                set: function (e) {
                  if (
                    (O(e) && !O(s) && (s = e),
                    (s = null === o ? (o = e) : s) === (o = e) || void 0 === o)
                  )
                    return (
                      (l = !0), (a = 0), u.onupdate(s), void u.oncomplete(s)
                    );
                  l = !1;
                },
                get: function () {
                  return o;
                },
              },
              resting: {
                get: function () {
                  return l;
                },
              },
              onupdate: function (e) {},
              oncomplete: function (e) {},
            });
          return u;
        },
        tween: function () {
          var n,
            i,
            e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.duration,
            r = void 0 === t ? 500 : t,
            t = e.easing,
            o = void 0 === t ? C : t,
            t = e.delay,
            s = void 0 === t ? 0 : t,
            a = null,
            l = !0,
            u = !1,
            c = null,
            d = G({
              interpolate: function (e, t) {
                l ||
                  null === c ||
                  e - (a = null === a ? e : a) < s ||
                  ((n = e - a - s) >= r || t
                    ? ((n = 1),
                      (i = u ? 0 : 1),
                      d.onupdate(i * c),
                      d.oncomplete(i * c),
                      (l = !0))
                    : ((i = n / r),
                      d.onupdate((0 <= n ? o(u ? 1 - i : i) : 0) * c)));
              },
              target: {
                get: function () {
                  return u ? 0 : c;
                },
                set: function (e) {
                  if (null === c)
                    return (c = e), d.onupdate(e), void d.oncomplete(e);
                  e < c ? ((c = 1), (u = !0)) : ((u = !1), (c = e)),
                    (l = !1),
                    (a = null);
                },
              },
              resting: {
                get: function () {
                  return l;
                },
              },
              onupdate: function (e) {},
              oncomplete: function (e) {},
            });
          return d;
        },
      },
      se = {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        originX: 0,
        originY: 0,
      },
      ae = {
        styles: function (e) {
          function t() {
            return v.rect
              ? U(
                  v.rect,
                  v.childViews,
                  [g.translateX || 0, g.translateY || 0],
                  [g.scaleX || 0, g.scaleY || 0]
                )
              : null;
          }
          var n = e.mixinConfig,
            g = e.viewProps,
            i = e.viewInternalAPI,
            r = e.viewExternalAPI,
            v = e.view,
            o = Object.assign({}, g),
            y = {};
          x(n, [i, r], g);
          return (
            (i.rect = { get: t }),
            (r.rect = { get: t }),
            n.forEach(function (e) {
              g[e] = (void 0 === o[e] ? se : o)[e];
            }),
            {
              write: function () {
                if (
                  (function (e, t) {
                    if (Object.keys(e).length !== Object.keys(t).length)
                      return !0;
                    for (var n in t) if (t[n] !== e[n]) return !0;
                    return !1;
                  })(y, g)
                )
                  return (
                    (e = v.element),
                    (n = (t = g).opacity),
                    (i = t.perspective),
                    (r = t.translateX),
                    (o = t.translateY),
                    (s = t.scaleX),
                    (a = t.scaleY),
                    (l = t.rotateX),
                    (u = t.rotateY),
                    (c = t.rotateZ),
                    (d = t.originX),
                    (f = t.originY),
                    (p = t.width),
                    (t = t.height),
                    (m = h = ""),
                    (_(d) || _(f)) &&
                      (m +=
                        "transform-origin: " +
                        (d || 0) +
                        "px " +
                        (f || 0) +
                        "px;"),
                    _(i) && (h += "perspective(" + i + "px) "),
                    (_(r) || _(o)) &&
                      (h +=
                        "translate3d(" +
                        (r || 0) +
                        "px, " +
                        (o || 0) +
                        "px, 0) "),
                    (_(s) || _(a)) &&
                      (h +=
                        "scale3d(" +
                        (_(s) ? s : 1) +
                        ", " +
                        (_(a) ? a : 1) +
                        ", 1) "),
                    _(c) && (h += "rotateZ(" + c + "rad) "),
                    _(l) && (h += "rotateX(" + l + "rad) "),
                    _(u) && (h += "rotateY(" + u + "rad) "),
                    h.length && (m += "transform:" + h + ";"),
                    _(n) &&
                      ((m += "opacity:" + n + ";"),
                      0 === n && (m += "visibility:hidden;"),
                      n < 1 && (m += "pointer-events:none;")),
                    _(t) && (m += "height:" + t + "px;"),
                    _(p) && (m += "width:" + p + "px;"),
                    (d = e.elementCurrentStyle || ""),
                    (m.length === d.length && m === d) ||
                      ((e.style.cssText = m), (e.elementCurrentStyle = m)),
                    Object.assign(y, Object.assign({}, g)),
                    !0
                  );
                var e, t, n, i, r, o, s, a, l, u, c, d, f, p, h, m;
              },
              destroy: function () {},
            }
          );
        },
        listeners: function (e) {
          e.mixinConfig, e.viewProps, e.viewInternalAPI;
          var n,
            i,
            t = e.viewExternalAPI,
            e = (e.viewState, e.view),
            r = [],
            o =
              ((n = e.element),
              (i = e.element),
              function (e, t) {
                i.removeEventListener(e, t);
              });
          return (
            (t.on = function (e, t) {
              r.push({ type: e, fn: t }), n.addEventListener(e, t);
            }),
            (t.off = function (t, n) {
              r.splice(
                r.findIndex(function (e) {
                  return e.type === t && e.fn === n;
                }),
                1
              ),
                o(t, n);
            }),
            {
              write: function () {
                return !0;
              },
              destroy: function () {
                r.forEach(function (e) {
                  o(e.type, e.fn);
                });
              },
            }
          );
        },
        animations: function (e) {
          var t = e.mixinConfig,
            i = e.viewProps,
            r = e.viewInternalAPI,
            o = e.viewExternalAPI,
            s = Object.assign({}, i),
            a = [];
          return (
            D(t, function (t, e) {
              var n = (function (e, t, n) {
                (n = e[t] && "object" == typeof e[t][n] ? e[t][n] : e[t] || e),
                  (t = "string" == typeof n ? n : n.type),
                  (e = "object" == typeof n ? Object.assign({}, n) : {});
                return oe[t] ? oe[t](e) : null;
              })(e);
              n &&
                ((n.onupdate = function (e) {
                  i[t] = e;
                }),
                (n.target = s[t]),
                x(
                  [
                    {
                      key: t,
                      setter: function (e) {
                        n.target !== e && (n.target = e);
                      },
                      getter: function () {
                        return i[t];
                      },
                    },
                  ],
                  [r, o],
                  i,
                  !0
                ),
                a.push(n));
            }),
            {
              write: function (t) {
                var n = document.hidden,
                  i = !0;
                return (
                  a.forEach(function (e) {
                    e.resting || (i = !1), e.interpolate(t, n);
                  }),
                  i
                );
              },
              destroy: function () {},
            }
          );
        },
        apis: function (e) {
          var t = e.mixinConfig,
            n = e.viewProps,
            e = e.viewExternalAPI;
          x(t, e, n);
        },
      },
      w = function (e) {
        return null == e;
      },
      le = function (e) {
        return "" + e;
      },
      E = function (e) {
        return "string" == typeof e;
      },
      ue = function (e) {
        return O(e) ? e : E(e) ? le(e).replace(/[a-z]+/gi, "") : 0;
      },
      a = function (e) {
        return O(e) && isFinite(e) && Math.floor(e) === e;
      },
      ce = {
        process: "POST",
        patch: "PATCH",
        revert: "DELETE",
        fetch: "GET",
        restore: "GET",
        load: "GET",
      },
      R = function (e) {
        return "object" == typeof e && null !== e;
      },
      de = {
        array: function (e) {
          var t =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : ",";
          return w(e)
            ? []
            : H(e)
            ? e
            : le(e)
                .split(t)
                .map(A)
                .filter(function (e) {
                  return e.length;
                });
        },
        boolean: W,
        int: function (e) {
          return ("bytes" === K(e) ? Z : Y)(e);
        },
        number: X,
        float: X,
        bytes: Z,
        string: function (e) {
          return y(e) ? e : le(e);
        },
        function: function (e) {
          for (var t, n = self, i = e.split("."); (t = i.shift()); )
            if (!(n = n[t])) return null;
          return n;
        },
        serverapi: function (e) {
          return (
            ((n = {}).url = E((t = e)) ? t : t.url || ""),
            (n.timeout = t.timeout ? parseInt(t.timeout, 10) : 0),
            (n.headers = t.headers || {}),
            D(ce, function (e) {
              n[e] = (function (e, t, n, i, r) {
                if (null === t) return null;
                if ("function" == typeof t) return t;
                e = {
                  url: "GET" === n || "PATCH" === n ? "?" + e + "=" : "",
                  method: n,
                  headers: r,
                  withCredentials: !1,
                  timeout: i,
                  onload: null,
                  ondata: null,
                  onerror: null,
                };
                return (
                  E(t)
                    ? (e.url = t)
                    : (Object.assign(e, t),
                      E(e.headers) &&
                        ((n = e.headers.split(/:(.+)/)),
                        (e.headers = { header: n[0], value: n[1] })),
                      (e.withCredentials = W(e.withCredentials))),
                  e
                );
              })(e, t[e], ce[e], n.timeout, n.headers);
            }),
            (n.process = t.process || E(t) || t.url ? n.process : null),
            (n.remove = t.remove || null),
            delete n.headers,
            n
          );
          var t, n;
        },
        object: function (e) {
          try {
            return JSON.parse(
              e
                .replace(/{\s*'/g, '{"')
                .replace(/'\s*}/g, '"}')
                .replace(/'\s*:/g, '":')
                .replace(/:\s*'/g, ':"')
                .replace(/,\s*'/g, ',"')
                .replace(/'\s*,/g, '",')
            );
          } catch (e) {
            return null;
          }
        },
      },
      fe = 1,
      pe = 2,
      he = 3,
      me = 5,
      ge = function () {
        return Math.random().toString(36).substring(2, 11);
      };
    function ve(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++)
              n[t] = e[t];
            return n;
          }
        })(e) ||
        (function (e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ye() {
      function n(t, n) {
        at(
          o,
          o.findIndex(function (e) {
            return e.event === t && (e.cb === n || !n);
          })
        );
      }
      function r(t, n, i) {
        o.filter(function (e) {
          return e.event === t;
        })
          .map(function (e) {
            return e.cb;
          })
          .forEach(function (e) {
            var t;
            (t = function () {
              return e.apply(void 0, ve(n));
            }),
              i
                ? t()
                : document.hidden
                ? Promise.resolve(1).then(t)
                : setTimeout(t, 0);
          });
      }
      var o = [];
      return {
        fireSync: function (e) {
          for (
            var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          r(e, n, !0);
        },
        fire: function (e) {
          for (
            var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          r(e, n, !1);
        },
        on: function (e, t) {
          o.push({ event: e, cb: t });
        },
        onOnce: function (e, t) {
          o.push({
            event: e,
            cb: function () {
              n(e, t), t.apply(void 0, arguments);
            },
          });
        },
        off: n,
      };
    }
    function P(e) {
      var t = {};
      return lt(e, t, ut), t;
    }
    function _e(e) {
      return /[^0-9]+/.exec(e);
    }
    function Ee() {
      return _e((1.1).toLocaleString())[0];
    }
    function b(r, o, s) {
      return new Promise(function (t, n) {
        var e,
          i = ct
            .filter(function (e) {
              return e.key === r;
            })
            .map(function (e) {
              return e.cb;
            });
        0 !== i.length
          ? ((e = i.shift()),
            i
              .reduce(function (e, t) {
                return e.then(function (e) {
                  return t(e, s);
                });
              }, e(o, s))
              .then(function (e) {
                return t(e);
              })
              .catch(function (e) {
                return n(e);
              }))
          : t(o);
      });
    }
    function T(t, n, i) {
      return ct
        .filter(function (e) {
          return e.key === t;
        })
        .map(function (e) {
          return e.cb(n, i);
        });
    }
    function be(e, t) {
      return ct.push({ key: e, cb: t });
    }
    function c(e, t) {
      return w(t)
        ? e[0] || null
        : a(t)
        ? e[t] || null
        : ("object" == typeof t && (t = t.id),
          e.find(function (e) {
            return e.id === t;
          }) || null);
    }
    function we(e) {
      return w(e)
        ? e
        : /:/.test(e)
        ? (t = e.split(":"))[1] / t[0]
        : parseFloat(e);
      var t;
    }
    function S(e) {
      return e.filter(function (e) {
        return !e.archived;
      });
    }
    function Te(e) {
      return ht.includes(e.status);
    }
    function Se(e) {
      return mt.includes(e.status);
    }
    function Ie(e) {
      return gt.includes(e.status);
    }
    function ke(e) {
      return (
        R(e.options.server) &&
        (R(e.options.server.process) || y(e.options.server.process))
      );
    }
    function Ce(o) {
      return {
        GET_STATUS: function () {
          var e = S(o.items),
            t = ft.ERROR,
            n = ft.BUSY,
            i = ft.IDLE,
            r = ft.READY;
          return 0 === e.length
            ? ft.EMPTY
            : e.some(Te)
            ? t
            : e.some(Se)
            ? n
            : e.some(Ie)
            ? r
            : i;
        },
        GET_ITEM: function (e) {
          return c(o.items, e);
        },
        GET_ACTIVE_ITEM: function (e) {
          return c(S(o.items), e);
        },
        GET_ACTIVE_ITEMS: function () {
          return S(o.items);
        },
        GET_ITEMS: function () {
          return o.items;
        },
        GET_ITEM_NAME: function (e) {
          e = c(o.items, e);
          return e ? e.filename : null;
        },
        GET_ITEM_SIZE: function (e) {
          e = c(o.items, e);
          return e ? e.fileSize : null;
        },
        GET_STYLES: function () {
          return Object.keys(o.options)
            .filter(function (e) {
              return /^style/.test(e);
            })
            .map(function (e) {
              return { name: e, value: o.options[e] };
            });
        },
        GET_PANEL_ASPECT_RATIO: function () {
          return /circle/.test(o.options.stylePanelLayout)
            ? 1
            : we(o.options.stylePanelAspectRatio);
        },
        GET_ITEM_PANEL_ASPECT_RATIO: function () {
          return o.options.styleItemPanelAspectRatio;
        },
        GET_ITEMS_BY_STATUS: function (t) {
          return S(o.items).filter(function (e) {
            return e.status === t;
          });
        },
        GET_TOTAL_ITEMS: function () {
          return S(o.items).length;
        },
        SHOULD_UPDATE_FILE_INPUT: function () {
          return (
            o.options.storeAsFile &&
            (function () {
              if (null === pt)
                try {
                  var e = new DataTransfer(),
                    t =
                      (e.items.add(new File(["hello world"], "This_Works.txt")),
                      document.createElement("input"));
                  t.setAttribute("type", "file"),
                    (t.files = e.files),
                    (pt = 1 === t.files.length);
                } catch (e) {
                  pt = !1;
                }
              return pt;
            })() &&
            !ke(o)
          );
        },
        IS_ASYNC: function () {
          return ke(o);
        },
        GET_FILE_SIZE_LABELS: function (e) {
          return {
            labelBytes: e("GET_LABEL_FILE_SIZE_BYTES") || void 0,
            labelKilobytes: e("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
            labelMegabytes: e("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
            labelGigabytes: e("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0,
          };
        },
      };
    }
    function xe(e, t, n) {
      return Math.max(Math.min(n, e), t);
    }
    function Ae(e) {
      return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
        e
      );
    }
    function De(e) {
      return ("" + e).split("/").pop().split("?").shift();
    }
    function Oe(e) {
      var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
      return (t + e).slice(-t.length);
    }
    function d(e, t) {
      var n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
        i =
          3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return (
        ((n =
          "string" == typeof n
            ? e.slice(0, e.size, n)
            : e.slice(0, e.size, e.type)).lastModifiedDate = new Date()),
        e._relativePath && (n._relativePath = e._relativePath),
        (t = E(t) ? t : yt()) && null === i && vt(t)
          ? (n.name = t)
          : ((i =
              i ||
              (function (e) {
                if ("string" != typeof e) return "";
                e = e.split("/").pop();
                return /svg/.test(e)
                  ? "svg"
                  : /zip|compressed/.test(e)
                  ? "zip"
                  : /plain/.test(e)
                  ? "txt"
                  : /msword/.test(e)
                  ? "doc"
                  : /[a-z]+/.test(e)
                  ? "jpeg" === e
                    ? "jpg"
                    : e
                  : "";
              })(n.type)),
            (n.name = t + (i ? "." + i : ""))),
        n
      );
    }
    function Re(e, t) {
      var n = (window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder);
      return n
        ? ((n = new n()).append(e), n.getBlob(t))
        : new Blob([e], { type: t });
    }
    function Pe(e) {
      return (/^data:(.+);/.exec(e) || [])[1] || null;
    }
    function Me(e) {
      var t,
        n,
        i = { source: null, name: null, size: null },
        r = e.split("\n"),
        o = !0,
        s = !1,
        a = void 0;
      try {
        for (
          var l, u = r[Symbol.iterator]();
          !(o = (l = u.next()).done);
          o = !0
        ) {
          var c,
            d,
            f = l.value,
            p = (function (e) {
              if (!/^content-disposition:/i.test(e)) return null;
              e = e
                .split(/filename=|filename\*=.+''/)
                .splice(1)
                .map(function (e) {
                  return e.trim().replace(/^["']|[;"']{0,2}$/g, "");
                })
                .filter(function (e) {
                  return e.length;
                });
              return e.length ? decodeURI(e[e.length - 1]) : null;
            })(f);
          p
            ? (i.name = p)
            : (c =
                /content-length:/i.test((n = f)) && (n = n.match(/[0-9]+/)[0])
                  ? parseInt(n, 10)
                  : null)
            ? (i.size = c)
            : (d =
                (/x-content-transfer-id:/i.test((t = f)) &&
                  (t.split(":")[1] || "").trim()) ||
                null) && (i.source = d);
        }
      } catch (e) {
        (s = !0), (a = e);
      } finally {
        try {
          o || null == u.return || u.return();
        } finally {
          if (s) throw a;
        }
      }
      return i;
    }
    function Le(n) {
      var i = {
          source: null,
          complete: !1,
          progress: 0,
          size: null,
          timestamp: null,
          duration: 0,
          request: null,
        },
        r = Object.assign({}, ye(), {
          setSource: function (e) {
            return (i.source = e);
          },
          getProgress: function () {
            return i.progress;
          },
          abort: function () {
            i.request && i.request.abort && i.request.abort();
          },
          load: function () {
            var t,
              e = i.source;
            r.fire("init", e),
              e instanceof File
                ? r.fire("load", e)
                : e instanceof Blob
                ? r.fire("load", d(e, e.name))
                : Ae(e)
                ? r.fire(
                    "load",
                    d(
                      (function (e) {
                        for (
                          var t = Pe(e),
                            n =
                              ((e = e),
                              atob(e.split(",")[1].replace(/\s/g, ""))),
                            e = t,
                            t = new ArrayBuffer(n.length),
                            i = new Uint8Array(t),
                            r = 0;
                          r < n.length;
                          r++
                        )
                          i[r] = n.charCodeAt(r);
                        return Re(t, e);
                      })(e),
                      void 0,
                      null,
                      void 0
                    )
                  )
                : ((t = e),
                  n
                    ? ((i.timestamp = Date.now()),
                      (i.request = n(
                        t,
                        function (e) {
                          (i.duration = Date.now() - i.timestamp),
                            (i.complete = !0),
                            e instanceof Blob && (e = d(e, e.name || De(t))),
                            r.fire(
                              "load",
                              e instanceof Blob ? e : e ? e.body : null
                            );
                        },
                        function (e) {
                          r.fire(
                            "error",
                            "string" == typeof e
                              ? { type: "error", code: 0, body: e }
                              : e
                          );
                        },
                        function (e, t, n) {
                          n && (i.size = n),
                            (i.duration = Date.now() - i.timestamp),
                            e
                              ? ((i.progress = t / n),
                                r.fire("progress", i.progress))
                              : (i.progress = null);
                        },
                        function () {
                          r.fire("abort");
                        },
                        function (e) {
                          e = Me("string" == typeof e ? e : e.headers);
                          r.fire("meta", {
                            size: i.size || e.size,
                            filename: e.name,
                            source: e.source,
                          });
                        }
                      )))
                    : r.fire("error", {
                        type: "error",
                        body: "Can't load URL",
                        code: 400,
                      }));
          },
        });
      return r;
    }
    function Fe(e) {
      return /GET|HEAD/.test(e);
    }
    function M(e, t, n) {
      var i = {
          onheaders: function () {},
          onprogress: function () {},
          onload: function () {},
          ontimeout: function () {},
          onerror: function () {},
          onabort: function () {},
          abort: function () {
            (r = !0), s.abort();
          },
        },
        r = !1,
        o = !1,
        s =
          ((n = Object.assign(
            { method: "POST", headers: {}, withCredentials: !1 },
            n
          )),
          (t = encodeURI(t)),
          Fe(n.method) &&
            e &&
            (t =
              "" +
              t +
              encodeURIComponent("string" == typeof e ? e : JSON.stringify(e))),
          new XMLHttpRequest());
      return (
        ((Fe(n.method) ? s : s.upload).onprogress = function (e) {
          r || i.onprogress(e.lengthComputable, e.loaded, e.total);
        }),
        (s.onreadystatechange = function () {
          s.readyState < 2 ||
            (4 === s.readyState && 0 === s.status) ||
            o ||
            ((o = !0), i.onheaders(s));
        }),
        (s.onload = function () {
          200 <= s.status && s.status < 300 ? i.onload(s) : i.onerror(s);
        }),
        (s.onerror = function () {
          return i.onerror(s);
        }),
        (s.onabort = function () {
          (r = !0), i.onabort();
        }),
        (s.ontimeout = function () {
          return i.ontimeout(s);
        }),
        s.open(n.method, t, !0),
        a(n.timeout) && (s.timeout = n.timeout),
        Object.keys(n.headers).forEach(function (e) {
          var t = unescape(encodeURIComponent(n.headers[e]));
          s.setRequestHeader(e, t);
        }),
        n.responseType && (s.responseType = n.responseType),
        n.withCredentials && (s.withCredentials = !0),
        s.send(e),
        i
      );
    }
    function L(t) {
      return function (e) {
        t(j("error", 0, "Timeout", e.getAllResponseHeaders()));
      };
    }
    function Ne(e) {
      return /\?/.test(e);
    }
    function je() {
      for (
        var t = "", e = arguments.length, n = new Array(e), i = 0;
        i < e;
        i++
      )
        n[i] = arguments[i];
      return (
        n.forEach(function (e) {
          t += Ne(t) && Ne(e) ? e.replace(/\?/, "&") : e;
        }),
        t
      );
    }
    function $e() {
      var a =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
        l = 1 < arguments.length ? arguments[1] : void 0;
      if ("function" == typeof l) return l;
      if (!l || !E(l.url)) return null;
      var u =
          l.onload ||
          function (e) {
            return e;
          },
        c =
          l.onerror ||
          function (e) {
            return null;
          };
      return function (i, r, t, e, n, o) {
        var s = M(
          i,
          je(a, l.url),
          Object.assign({}, l, { responseType: "blob" })
        );
        return (
          (s.onload = function (e) {
            var t = e.getAllResponseHeaders(),
              n = Me(t).name || De(i);
            r(
              j(
                "load",
                e.status,
                "HEAD" === l.method ? null : d(u(e.response), n),
                t
              )
            );
          }),
          (s.onerror = function (e) {
            t(
              j(
                "error",
                e.status,
                c(e.response) || e.statusText,
                e.getAllResponseHeaders()
              )
            );
          }),
          (s.onheaders = function (e) {
            o(j("headers", e.status, null, e.getAllResponseHeaders()));
          }),
          (s.ontimeout = L(t)),
          (s.onprogress = e),
          (s.onabort = n),
          s
        );
      };
    }
    function Be(o, e, t, s, n, a, l, u, c, i, r) {
      for (
        var d = [],
          f = r.chunkTransferId,
          p = r.chunkServer,
          h = r.chunkSize,
          m = r.chunkRetryDelays,
          g = { serverId: f, aborted: !1 },
          r =
            e.ondata ||
            function (e) {
              return e;
            },
          v =
            e.onload ||
            function (e, t) {
              return "HEAD" === t
                ? e.getResponseHeader("Upload-Offset")
                : e.response;
            },
          y =
            e.onerror ||
            function (e) {
              return null;
            },
          _ = Math.floor(s.size / h),
          E = 0;
        E <= _;
        E++
      ) {
        var b = E * h,
          w = s.slice(b, b + h, "application/offset+octet-stream");
        d[E] = {
          index: E,
          size: w.size,
          offset: b,
          data: w,
          file: s,
          progress: 0,
          retries: ve(m),
          status: 0,
          error: null,
          request: null,
          timeout: null,
        };
      }
      function T(e) {
        return 0 === e.status || 3 === e.status;
      }
      function S(e) {
        return (
          0 !== e.retries.length &&
          ((e.status = 4),
          clearTimeout(e.timeout),
          (e.timeout = setTimeout(function () {
            A(e);
          }, e.retries.shift())),
          !0)
        );
      }
      function I() {
        1 <=
          d.filter(function (e) {
            return 2 === e.status;
          }).length || A();
      }
      var k,
        C,
        x,
        A = function (i) {
          var t, e, n, r;
          g.aborted ||
            ((i = i || d.find(T))
              ? ((i.status = 2),
                (i.progress = null),
                (r =
                  p.ondata ||
                  function (e) {
                    return e;
                  }),
                (t =
                  p.onerror ||
                  function (e) {
                    return null;
                  }),
                (e = je(o, p.url, g.serverId)),
                (n =
                  "function" == typeof p.headers
                    ? p.headers(i)
                    : Object.assign({}, p.headers, {
                        "Content-Type": "application/offset+octet-stream",
                        "Upload-Offset": i.offset,
                        "Upload-Length": s.size,
                        "Upload-Name": s.name,
                      })),
                ((r = i.request =
                  M(
                    r(i.data),
                    e,
                    Object.assign({}, p, { headers: n })
                  )).onload = function () {
                  (i.status = 1), (i.request = null), I();
                }),
                (r.onprogress = function (e, t, n) {
                  i.progress = e ? t : null;
                  e = d.reduce(function (e, t) {
                    return null === e || null === t.progress
                      ? null
                      : e + t.progress;
                  }, 0);
                  null === e
                    ? u(!1, 0, 0)
                    : ((t = d.reduce(function (e, t) {
                        return e + t.size;
                      }, 0)),
                      u(!0, e, t));
                }),
                (r.onerror = function (e) {
                  (i.status = 3),
                    (i.request = null),
                    (i.error = t(e.response) || e.statusText),
                    S(i) ||
                      l(
                        j(
                          "error",
                          e.status,
                          t(e.response) || e.statusText,
                          e.getAllResponseHeaders()
                        )
                      );
                }),
                (r.ontimeout = function (e) {
                  (i.status = 3), (i.request = null), S(i) || L(l)(e);
                }),
                (r.onabort = function () {
                  (i.status = 0), (i.request = null), c();
                }))
              : d.every(function (e) {
                  return 1 === e.status;
                }) && a(g.serverId));
        };
      return (
        g.serverId
          ? ((k = function (t) {
              g.aborted ||
                (d
                  .filter(function (e) {
                    return e.offset < t;
                  })
                  .forEach(function (e) {
                    (e.status = 1), (e.progress = e.size);
                  }),
                I());
            }),
            (f = je(o, p.url, g.serverId)),
            (C = {
              headers:
                "function" == typeof e.headers
                  ? e.headers(g.serverId)
                  : Object.assign({}, e.headers),
              method: "HEAD",
            }),
            ((f = M(null, f, C)).onload = function (e) {
              return k(v(e, C.method));
            }),
            (f.onerror = function (e) {
              return l(
                j(
                  "error",
                  e.status,
                  y(e.response) || e.statusText,
                  e.getAllResponseHeaders()
                )
              );
            }),
            (f.ontimeout = L(l)))
          : ((f = new FormData()),
            R(n) && f.append(t, JSON.stringify(n)),
            (t =
              "function" == typeof e.headers
                ? e.headers(s, n)
                : Object.assign({}, e.headers, { "Upload-Length": s.size })),
            (x = Object.assign({}, e, { headers: t })),
            ((t = M(r(f), je(o, e.url), x)).onload = function (e) {
              (e = v(e, x.method)), g.aborted || (i(e), (g.serverId = e), I());
            }),
            (t.onerror = function (e) {
              return l(
                j(
                  "error",
                  e.status,
                  y(e.response) || e.statusText,
                  e.getAllResponseHeaders()
                )
              );
            }),
            (t.ontimeout = L(l))),
        {
          abort: function () {
            (g.aborted = !0),
              d.forEach(function (e) {
                clearTimeout(e.timeout), e.request && e.request.abort();
              });
          },
        }
      );
    }
    function Ge() {
      var i =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
        r = 1 < arguments.length ? arguments[1] : void 0;
      if ("function" == typeof r) return r;
      if (!r || !E(r.url))
        return function (e, t) {
          return t();
        };
      var o =
          r.onload ||
          function (e) {
            return e;
          },
        s =
          r.onerror ||
          function (e) {
            return null;
          };
      return function (e, t, n) {
        e = M(e, i + r.url, r);
        return (
          (e.onload = function (e) {
            t(j("load", e.status, o(e.response), e.getAllResponseHeaders()));
          }),
          (e.onerror = function (e) {
            n(
              j(
                "error",
                e.status,
                s(e.response) || e.statusText,
                e.getAllResponseHeaders()
              )
            );
          }),
          (e.ontimeout = L(n)),
          e
        );
      };
    }
    function qe() {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
        t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
      return e + Math.random() * (t - e);
    }
    function Ue(e) {
      return e.substring(0, e.lastIndexOf(".")) || e;
    }
    function I(e) {
      return !!(e instanceof File || (e instanceof Blob && e.name));
    }
    function Ve() {
      function o(e) {
        l.status = e;
      }
      function s(e) {
        if (!l.released && !l.frozen) {
          for (
            var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          d.fire.apply(d, [e].concat(n));
        }
      }
      function r(e, t, n) {
        var i = (e = e.split("."))[0],
          r = e.pop(),
          o = c;
        e.forEach(function (e) {
          return (o = o[e]);
        }),
          JSON.stringify(o[r]) !== JSON.stringify(t) &&
            ((o[r] = t),
            s("metadata-update", { key: i, value: c[i], silent: n }));
      }
      var a =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
        e =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
        t =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
        n = ge(),
        l = {
          archived: !1,
          frozen: !1,
          released: !1,
          source: null,
          file: t,
          serverFileReference: e,
          transferId: null,
          processingAborted: !1,
          status: e ? F.PROCESSING_COMPLETE : F.INIT,
          activeLoader: null,
          activeProcessor: null,
        },
        u = null,
        c = {},
        d = Object.assign(
          {
            id: {
              get: function () {
                return n;
              },
            },
            origin: {
              get: function () {
                return a;
              },
              set: function (e) {
                return (a = e);
              },
            },
            serverId: {
              get: function () {
                return l.serverFileReference;
              },
            },
            transferId: {
              get: function () {
                return l.transferId;
              },
            },
            status: {
              get: function () {
                return l.status;
              },
            },
            filename: {
              get: function () {
                return l.file.name;
              },
            },
            filenameWithoutExtension: {
              get: function () {
                return Ue(l.file.name);
              },
            },
            fileExtension: {
              get: function () {
                return vt(l.file.name);
              },
            },
            fileType: {
              get: function () {
                return l.file.type;
              },
            },
            fileSize: {
              get: function () {
                return l.file.size;
              },
            },
            file: {
              get: function () {
                return l.file;
              },
            },
            relativePath: {
              get: function () {
                return l.file._relativePath;
              },
            },
            source: {
              get: function () {
                return l.source;
              },
            },
            getMetadata: function (e) {
              return (function e(t) {
                if (!R(t)) return t;
                var n,
                  i,
                  r = H(t) ? [] : {};
                for (n in t)
                  t.hasOwnProperty(n) &&
                    ((i = t[n]), (r[n] = i && R(i) ? e(i) : i));
                return r;
              })(e ? c[e] : c);
            },
            setMetadata: function (e, t, n) {
              var i;
              return R(e)
                ? ((i = e),
                  Object.keys(i).forEach(function (e) {
                    r(e, i[e], t);
                  }),
                  e)
                : (r(e, t, n), t);
            },
            extend: function (e, t) {
              return (i[e] = t);
            },
            abortLoad: function () {
              l.activeLoader
                ? l.activeLoader.abort()
                : (o(F.INIT), s("load-abort"));
            },
            retryLoad: function () {
              l.activeLoader && l.activeLoader.load();
            },
            requestProcessing: function () {
              (l.processingAborted = !1), o(F.PROCESSING_QUEUED);
            },
            abortProcessing: function () {
              return new Promise(function (e) {
                if (!l.activeProcessor)
                  return (
                    (l.processingAborted = !0),
                    o(F.IDLE),
                    s("process-abort"),
                    void e()
                  );
                (u = function () {
                  e();
                }),
                  l.activeProcessor.abort();
              });
            },
            load: function (e, t, n) {
              var i, r;
              (l.source = e),
                d.fireSync("init"),
                l.file
                  ? d.fireSync("load-skip")
                  : ((l.file =
                      ((r = [(i = e).name, i.size, i.type]),
                      i instanceof Blob || Ae(i)
                        ? (r[0] = i.name || yt())
                        : Ae(i)
                        ? ((r[1] = i.length), (r[2] = Pe(i)))
                        : E(i) &&
                          ((r[0] = De(i)),
                          (r[1] = 0),
                          (r[2] = "application/octet-stream")),
                      { name: r[0], size: r[1], type: r[2] })),
                    t.on("init", function () {
                      s("load-init");
                    }),
                    t.on("meta", function (e) {
                      (l.file.size = e.size),
                        (l.file.filename = e.filename),
                        e.source &&
                          ((a = N.LIMBO),
                          (l.serverFileReference = e.source),
                          (l.status = F.PROCESSING_COMPLETE)),
                        s("load-meta");
                    }),
                    t.on("progress", function (e) {
                      o(F.LOADING), s("load-progress", e);
                    }),
                    t.on("error", function (e) {
                      o(F.LOAD_ERROR), s("load-request-error", e);
                    }),
                    t.on("abort", function () {
                      o(F.INIT), s("load-abort");
                    }),
                    t.on("load", function (t) {
                      l.activeLoader = null;
                      function e(e) {
                        (l.file = I(e) ? e : l.file),
                          a === N.LIMBO && l.serverFileReference
                            ? o(F.PROCESSING_COMPLETE)
                            : o(F.IDLE),
                          s("load");
                      }
                      l.serverFileReference
                        ? e(t)
                        : n(t, e, function (e) {
                            (l.file = t),
                              s("load-meta"),
                              o(F.LOAD_ERROR),
                              s("load-file-error", e);
                          });
                    }),
                    t.setSource(e),
                    (l.activeLoader = t).load());
            },
            process: function e(t, n) {
              var i;
              l.processingAborted
                ? (l.processingAborted = !1)
                : (o(F.PROCESSING),
                  (u = null),
                  l.file instanceof Blob
                    ? (t.on("load", function (e) {
                        (l.transferId = null), (l.serverFileReference = e);
                      }),
                      t.on("transfer", function (e) {
                        l.transferId = e;
                      }),
                      t.on("load-perceived", function (e) {
                        (l.activeProcessor = null),
                          (l.transferId = null),
                          (l.serverFileReference = e),
                          o(F.PROCESSING_COMPLETE),
                          s("process-complete", e);
                      }),
                      t.on("start", function () {
                        s("process-start");
                      }),
                      t.on("error", function (e) {
                        (l.activeProcessor = null),
                          o(F.PROCESSING_ERROR),
                          s("process-error", e);
                      }),
                      t.on("abort", function (e) {
                        (l.activeProcessor = null),
                          (l.serverFileReference = e),
                          o(F.IDLE),
                          s("process-abort"),
                          u && u();
                      }),
                      t.on("progress", function (e) {
                        s("process-progress", e);
                      }),
                      (i = console.error),
                      n(
                        l.file,
                        function (e) {
                          l.archived || t.process(e, Object.assign({}, c));
                        },
                        i
                      ),
                      (l.activeProcessor = t))
                    : d.on("load", function () {
                        e(t, n);
                      }));
            },
            revert: function (i, r) {
              return new Promise(function (t, n) {
                var e =
                  null !== l.serverFileReference
                    ? l.serverFileReference
                    : l.transferId;
                null !== e
                  ? (i(
                      e,
                      function () {
                        (l.serverFileReference = null),
                          (l.transferId = null),
                          t();
                      },
                      function (e) {
                        r
                          ? (o(F.PROCESSING_REVERT_ERROR),
                            s("process-revert-error"),
                            n(e))
                          : t();
                      }
                    ),
                    o(F.IDLE),
                    s("process-revert"))
                  : t();
              });
            },
          },
          ye(),
          {
            freeze: function () {
              return (l.frozen = !0);
            },
            release: function () {
              return (l.released = !0);
            },
            released: {
              get: function () {
                return l.released;
              },
            },
            archive: function () {
              return (l.archived = !0);
            },
            archived: {
              get: function () {
                return l.archived;
              },
            },
            setFile: function (e) {
              return (l.file = e);
            },
          }
        ),
        i = G(d);
      return i;
    }
    function He(e, t) {
      var n, i;
      if (
        ((n = e),
        !(
          (t = w((i = t))
            ? 0
            : E(i)
            ? n.findIndex(function (e) {
                return e.id === i;
              })
            : -1) < 0
        ))
      )
        return e[t] || null;
    }
    function ze(i, r, t, e, n, o) {
      var s = M(null, i, { method: "GET", responseType: "blob" });
      return (
        (s.onload = function (e) {
          var t = e.getAllResponseHeaders(),
            n = Me(t).name || De(i);
          r(j("load", e.status, d(e.response, n), t));
        }),
        (s.onerror = function (e) {
          t(j("error", e.status, e.statusText, e.getAllResponseHeaders()));
        }),
        (s.onheaders = function (e) {
          o(j("headers", e.status, null, e.getAllResponseHeaders()));
        }),
        (s.ontimeout = L(t)),
        (s.onprogress = e),
        (s.onabort = n),
        s
      );
    }
    function We(e) {
      return (e = 0 === e.indexOf("//") ? location.protocol + e : e)
        .toLowerCase()
        .replace("blob:", "")
        .replace(/([a-z])?:\/\//, "$1")
        .split("/")[0];
    }
    function Ye(e) {
      return function () {
        return y(e) ? e.apply(void 0, arguments) : e;
      };
    }
    function Xe(e, t) {
      clearTimeout(t.listUpdateTimeout),
        (t.listUpdateTimeout = setTimeout(function () {
          e("DID_UPDATE_ITEMS", { items: S(t.items) });
        }, 0));
    }
    function Ze(n) {
      for (
        var e = arguments.length, i = new Array(1 < e ? e - 1 : 0), t = 1;
        t < e;
        t++
      )
        i[t - 1] = arguments[t];
      return new Promise(function (e) {
        if (!n) return e(!0);
        var t = n.apply(void 0, i);
        return null == t
          ? e(!0)
          : "boolean" == typeof t
          ? e(t)
          : void ("function" == typeof t.then && t.then(e));
      });
    }
    function Ke(e, n) {
      e.items.sort(function (e, t) {
        return n(P(e), P(t));
      });
    }
    function e(r, o) {
      return function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.query,
          n = e.success,
          n = void 0 === n ? function () {} : n,
          i = e.failure,
          i = void 0 === i ? function () {} : i,
          e = (function (e, t) {
            if (null == e) return {};
            var n,
              i = (function (e, t) {
                if (null == e) return {};
                for (
                  var n, i = {}, r = Object.keys(e), o = 0;
                  o < r.length;
                  o++
                )
                  (n = r[o]), 0 <= t.indexOf(n) || (i[n] = e[n]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols)
              for (
                var r = Object.getOwnPropertySymbols(e), o = 0;
                o < r.length;
                o++
              )
                (n = r[o]),
                  0 <= t.indexOf(n) ||
                    (Object.prototype.propertyIsEnumerable.call(e, n) &&
                      (i[n] = e[n]));
            return i;
          })(e, ["query", "success", "failure"]),
          t = c(r.items, t);
        t
          ? o(t, n, i, e || {})
          : i({ error: j("error", 0, "Item not found"), file: null });
      };
    }
    function Je(m, g, v) {
      return {
        ABORT_ALL: function () {
          S(v.items).forEach(function (e) {
            e.freeze(), e.abortLoad(), e.abortProcessing();
          });
        },
        DID_SET_FILES: function (e) {
          var e = e.value,
            n = (void 0 === e ? [] : e).map(function (e) {
              return { source: e.source || e, options: e.options };
            }),
            i = S(v.items);
          i.forEach(function (t) {
            n.find(function (e) {
              return e.source === t.source || e.source === t.file;
            }) || m("REMOVE_ITEM", { query: t, remove: !1 });
          }),
            (i = S(v.items)),
            n.forEach(function (t, e) {
              i.find(function (e) {
                return e.source === t.source || e.file === t.source;
              }) ||
                m(
                  "ADD_ITEM",
                  Object.assign({}, t, { interactionMethod: me, index: e })
                );
            });
        },
        DID_UPDATE_ITEM_METADATA: function (e) {
          var i = e.id,
            r = e.action,
            o = e.change;
          o.silent ||
            (clearTimeout(v.itemUpdateTimeout),
            (v.itemUpdateTimeout = setTimeout(function () {
              var e,
                t,
                n = He(v.items, i);
              if (g("IS_ASYNC"))
                return (
                  n.origin === N.LOCAL &&
                    m("DID_LOAD_ITEM", {
                      id: n.id,
                      error: null,
                      serverFileReference: n.source,
                    }),
                  (e = function () {
                    setTimeout(function () {
                      m("REQUEST_ITEM_PROCESSING", { query: i });
                    }, 32);
                  }),
                  n.status === F.PROCESSING_COMPLETE
                    ? ((t = v.options.instantUpload),
                      void n
                        .revert(
                          Ge(v.options.server.url, v.options.server.revert),
                          g("GET_FORCE_REVERT")
                        )
                        .then(t ? e : function () {})
                        .catch(function () {}))
                    : n.status === F.PROCESSING
                    ? ((t = v.options.instantUpload),
                      void n.abortProcessing().then(t ? e : function () {}))
                    : void (v.options.instantUpload && e())
                );
              b("SHOULD_PREPARE_OUTPUT", !1, {
                item: n,
                query: g,
                action: r,
                change: o,
              }).then(function (e) {
                var t = g("GET_BEFORE_PREPARE_FILE");
                (e = t ? t(n, e) : e) &&
                  m(
                    "REQUEST_PREPARE_OUTPUT",
                    {
                      query: i,
                      item: n,
                      success: function (e) {
                        m("DID_PREPARE_OUTPUT", { id: i, file: e });
                      },
                    },
                    !0
                  );
              });
            }, 0)));
        },
        MOVE_ITEM: function (e) {
          var t = e.query,
            e = e.index,
            t = c(v.items, t);
          t &&
            (t = v.items.indexOf(t)) !== (e = xe(e, 0, v.items.length - 1)) &&
            v.items.splice(e, 0, v.items.splice(t, 1)[0]);
        },
        SORT: function (e) {
          e = e.compare;
          Ke(v, e), m("DID_SORT_ITEMS", { items: g("GET_ACTIVE_ITEMS") });
        },
        ADD_ITEMS: function (e) {
          var t,
            n = e.items,
            i = e.index,
            r = e.interactionMethod,
            o = e.success,
            o = void 0 === o ? function () {} : o,
            e = e.failure,
            e = void 0 === e ? function () {} : e,
            s = i,
            a =
              ((-1 !== i && void 0 !== i) ||
                ((i = g("GET_ITEM_INSERT_LOCATION")),
                (t = g("GET_TOTAL_ITEMS")),
                (s = "before" === i ? 0 : t)),
              g("GET_IGNORED_FILES")),
            i = n
              .filter(function (e) {
                return I(e) ? !a.includes(e.name.toLowerCase()) : !w(e);
              })
              .map(function (n) {
                return new Promise(function (e, t) {
                  m("ADD_ITEM", {
                    interactionMethod: r,
                    source: n.source || n,
                    success: e,
                    failure: t,
                    index: s++,
                    options: n.options || {},
                  });
                });
              });
          Promise.all(i).then(o).catch(e);
        },
        ADD_ITEM: function (e) {
          var i = e.source,
            t = e.index,
            n = void 0 === t ? -1 : t,
            r = e.interactionMethod,
            t = e.success,
            o = void 0 === t ? function () {} : t,
            t = e.failure,
            s = void 0 === t ? function () {} : t,
            t = e.options,
            a = void 0 === t ? {} : t;
          if (w(i)) s({ error: j("error", 0, "No source"), file: null });
          else if (
            !I(i) ||
            !v.options.ignoredFiles.includes(i.name.toLowerCase())
          ) {
            if (
              !(function (e) {
                var t = S(e.items).length;
                if (!e.options.allowMultiple) return 0 === t;
                e = e.options.maxFiles;
                return null === e || t < e;
              })(v)
            ) {
              if (
                v.options.allowMultiple ||
                (!v.options.allowMultiple && !v.options.allowReplace)
              )
                return (
                  (e = j("warning", 0, "Max files")),
                  m("DID_THROW_MAX_FILES", { source: i, error: e }),
                  void s({ error: e, file: null })
                );
              t = S(v.items)[0];
              if (
                t.status === F.PROCESSING_COMPLETE ||
                t.status === F.PROCESSING_REVERT_ERROR
              ) {
                var l = g("GET_FORCE_REVERT");
                if (
                  (t
                    .revert(
                      Ge(v.options.server.url, v.options.server.revert),
                      l
                    )
                    .then(function () {
                      l &&
                        m("ADD_ITEM", {
                          source: i,
                          index: n,
                          interactionMethod: r,
                          success: o,
                          failure: s,
                          options: a,
                        });
                    })
                    .catch(function () {}),
                  l)
                )
                  return;
              }
              m("REMOVE_ITEM", { query: t.id });
            }
            var e =
                "local" === a.type
                  ? N.LOCAL
                  : "limbo" === a.type
                  ? N.LIMBO
                  : N.INPUT,
              u = Ve(e, e === N.INPUT ? null : i, a.file),
              t =
                (Object.keys(a.metadata || {}).forEach(function (e) {
                  u.setMetadata(e, a.metadata[e]);
                }),
                T("DID_CREATE_ITEM", u, { query: g, dispatch: m }),
                g("GET_ITEM_INSERT_LOCATION")),
              c =
                (v.options.itemInsertLocationFreedom ||
                  (n = "before" === t ? -1 : v.items.length),
                (p = v.items),
                (d = n),
                w((h = u)) ||
                  (void 0 === d
                    ? p.push(h)
                    : ((f = p),
                      (p = d = xe(d, 0, p.length)),
                      f.splice(p, 0, h))),
                y(t) && i && Ke(v, t),
                u.id),
              d =
                (u.on("init", function () {
                  m("DID_INIT_ITEM", { id: c });
                }),
                u.on("load-init", function () {
                  m("DID_START_ITEM_LOAD", { id: c });
                }),
                u.on("load-meta", function () {
                  m("DID_UPDATE_ITEM_META", { id: c });
                }),
                u.on("load-progress", function (e) {
                  m("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: c, progress: e });
                }),
                u.on("load-request-error", function (e) {
                  var t = Ye(v.options.labelFileLoadError)(e);
                  if (400 <= e.code && e.code < 500)
                    return (
                      m("DID_THROW_ITEM_INVALID", {
                        id: c,
                        error: e,
                        status: { main: t, sub: e.code + " (" + e.body + ")" },
                      }),
                      void s({ error: e, file: P(u) })
                    );
                  m("DID_THROW_ITEM_LOAD_ERROR", {
                    id: c,
                    error: e,
                    status: { main: t, sub: v.options.labelTapToRetry },
                  });
                }),
                u.on("load-file-error", function (e) {
                  m("DID_THROW_ITEM_INVALID", {
                    id: c,
                    error: e.status,
                    status: e.status,
                  }),
                    s({ error: e.status, file: P(u) });
                }),
                u.on("load-abort", function () {
                  m("REMOVE_ITEM", { query: c });
                }),
                u.on("load-skip", function () {
                  u.on("metadata-update", function (e) {
                    I(u.file) &&
                      m("DID_UPDATE_ITEM_METADATA", { id: c, change: e });
                  }),
                    m("COMPLETE_LOAD_ITEM", {
                      query: c,
                      item: u,
                      data: { source: i, success: o },
                    });
                }),
                u.on("load", function () {
                  function t(e) {
                    e
                      ? (u.on("metadata-update", function (e) {
                          m("DID_UPDATE_ITEM_METADATA", { id: c, change: e });
                        }),
                        b("SHOULD_PREPARE_OUTPUT", !1, {
                          item: u,
                          query: g,
                        }).then(function (e) {
                          function t() {
                            m("COMPLETE_LOAD_ITEM", {
                              query: c,
                              item: u,
                              data: { source: i, success: o },
                            }),
                              Xe(m, v);
                          }
                          var n = g("GET_BEFORE_PREPARE_FILE");
                          n && (e = n(u, e));
                          e
                            ? m(
                                "REQUEST_PREPARE_OUTPUT",
                                {
                                  query: c,
                                  item: u,
                                  success: function (e) {
                                    m("DID_PREPARE_OUTPUT", { id: c, file: e }),
                                      t();
                                  },
                                },
                                !0
                              )
                            : t();
                        }))
                      : m("REMOVE_ITEM", { query: c });
                  }
                  b("DID_LOAD_ITEM", u, { query: g, dispatch: m })
                    .then(function () {
                      Ze(g("GET_BEFORE_ADD_FILE"), P(u)).then(t);
                    })
                    .catch(function (e) {
                      if (!e || !e.error || !e.status) return t(!1);
                      m("DID_THROW_ITEM_INVALID", {
                        id: c,
                        error: e.error,
                        status: e.status,
                      });
                    });
                }),
                u.on("process-start", function () {
                  m("DID_START_ITEM_PROCESSING", { id: c });
                }),
                u.on("process-progress", function (e) {
                  m("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: c, progress: e });
                }),
                u.on("process-error", function (e) {
                  m("DID_THROW_ITEM_PROCESSING_ERROR", {
                    id: c,
                    error: e,
                    status: {
                      main: Ye(v.options.labelFileProcessingError)(e),
                      sub: v.options.labelTapToRetry,
                    },
                  });
                }),
                u.on("process-revert-error", function (e) {
                  m("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
                    id: c,
                    error: e,
                    status: {
                      main: Ye(v.options.labelFileProcessingRevertError)(e),
                      sub: v.options.labelTapToRetry,
                    },
                  });
                }),
                u.on("process-complete", function (e) {
                  m("DID_COMPLETE_ITEM_PROCESSING", {
                    id: c,
                    error: null,
                    serverFileReference: e,
                  }),
                    m("DID_DEFINE_VALUE", { id: c, value: e });
                }),
                u.on("process-abort", function () {
                  m("DID_ABORT_ITEM_PROCESSING", { id: c });
                }),
                u.on("process-revert", function () {
                  m("DID_REVERT_ITEM_PROCESSING", { id: c }),
                    m("DID_DEFINE_VALUE", { id: c, value: null });
                }),
                m("DID_ADD_ITEM", { id: c, index: n, interactionMethod: r }),
                Xe(m, v),
                v.options.server || {}),
              f = d.url,
              p = d.load,
              h = d.restore,
              t = d.fetch;
            u.load(
              i,
              Le(
                e === N.INPUT
                  ? E(i) &&
                    (-1 < (d = i).indexOf(":") || -1 < d.indexOf("//")) &&
                    We(location.href) !== We(d) &&
                    t
                    ? $e(f, t)
                    : ze
                  : $e(f, e === N.LIMBO ? h : p)
              ),
              function (e, t, n) {
                b("LOAD_FILE", e, { query: g }).then(t).catch(n);
              }
            );
          }
        },
        REQUEST_PREPARE_OUTPUT: function (e) {
          var t = e.item,
            n = e.success,
            e = e.failure,
            i = void 0 === e ? function () {} : e,
            r = { error: j("error", 0, "Item not found"), file: null };
          if (t.archived) return i(r);
          b("PREPARE_OUTPUT", t.file, { query: g, item: t }).then(function (e) {
            b("COMPLETE_PREPARE_OUTPUT", e, { query: g, item: t }).then(
              function (e) {
                if (t.archived) return i(r);
                n(e);
              }
            );
          });
        },
        COMPLETE_LOAD_ITEM: function (e) {
          var t = e.item,
            e = e.data,
            n = e.success,
            e = e.source,
            i = g("GET_ITEM_INSERT_LOCATION");
          if (
            (y(i) && e && Ke(v, i),
            m("DID_LOAD_ITEM", {
              id: t.id,
              error: null,
              serverFileReference: t.origin === N.INPUT ? null : e,
            }),
            n(P(t)),
            t.origin !== N.LOCAL)
          )
            return t.origin === N.LIMBO
              ? (m("DID_COMPLETE_ITEM_PROCESSING", {
                  id: t.id,
                  error: null,
                  serverFileReference: e,
                }),
                void m("DID_DEFINE_VALUE", {
                  id: t.id,
                  value: t.serverId || e,
                }))
              : void (
                  g("IS_ASYNC") &&
                  v.options.instantUpload &&
                  m("REQUEST_ITEM_PROCESSING", { query: t.id })
                );
          m("DID_LOAD_LOCAL_ITEM", { id: t.id });
        },
        RETRY_ITEM_LOAD: e(v, function (e) {
          e.retryLoad();
        }),
        REQUEST_ITEM_PREPARE: e(v, function (t, n, e) {
          m(
            "REQUEST_PREPARE_OUTPUT",
            {
              query: t.id,
              item: t,
              success: function (e) {
                m("DID_PREPARE_OUTPUT", { id: t.id, file: e }),
                  n({ file: t, output: e });
              },
              failure: e,
            },
            !0
          );
        }),
        REQUEST_ITEM_PROCESSING: e(v, function (e, t, n) {
          var i, r;
          e.status === F.IDLE || e.status === F.PROCESSING_ERROR
            ? e.status !== F.PROCESSING_QUEUED &&
              (e.requestProcessing(),
              m("DID_REQUEST_ITEM_PROCESSING", { id: e.id }),
              m("PROCESS_ITEM", { query: e, success: t, failure: n }, !0))
            : ((i = function () {
                return m("REQUEST_ITEM_PROCESSING", {
                  query: e,
                  success: t,
                  failure: n,
                });
              }),
              (r = function () {
                return document.hidden ? i() : setTimeout(i, 32);
              }),
              e.status === F.PROCESSING_COMPLETE ||
              e.status === F.PROCESSING_REVERT_ERROR
                ? e
                    .revert(
                      Ge(v.options.server.url, v.options.server.revert),
                      g("GET_FORCE_REVERT")
                    )
                    .then(r)
                    .catch(function () {})
                : e.status === F.PROCESSING && e.abortProcessing().then(r));
        }),
        PROCESS_ITEM: e(v, function (i, t, n) {
          var r,
            o,
            s,
            a,
            l,
            e = g("GET_MAX_PARALLEL_UPLOADS");
          function u() {
            s.request &&
              (s.perceivedPerformanceUpdater.clear(),
              s.request.abort && s.request.abort(),
              (s.complete = !0));
          }
          g("GET_ITEMS_BY_STATUS", F.PROCESSING).length !== e
            ? i.status !== F.PROCESSING &&
              ((r = function e() {
                var t,
                  n,
                  i,
                  r = v.processingQueue.shift();
                r &&
                  ((t = r.id),
                  (n = r.success),
                  (r = r.failure),
                  (i = c(v.items, t)) && !i.archived
                    ? m(
                        "PROCESS_ITEM",
                        { query: t, success: n, failure: r },
                        !0
                      )
                    : e());
              }),
              i.onOnce("process-complete", function () {
                t(P(i)), r();
                var e = v.options.server;
                v.options.instantUpload &&
                  i.origin === N.LOCAL &&
                  y(e.remove) &&
                  ((e = function () {}),
                  (i.origin = N.LIMBO),
                  v.options.server.remove(i.source, e, e)),
                  g("GET_ITEMS_BY_STATUS", F.PROCESSING_COMPLETE).length ===
                    v.items.length && m("DID_COMPLETE_ITEM_PROCESSING_ALL");
              }),
              i.onOnce("process-error", function (e) {
                n({ error: e, file: P(i) }), r();
              }),
              (e = v.options),
              i.process(
                ((o = (function () {
                  var f,
                    p,
                    h,
                    m,
                    e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : "",
                    i = 1 < arguments.length ? arguments[1] : void 0,
                    r = 2 < arguments.length ? arguments[2] : void 0,
                    o = 3 < arguments.length ? arguments[3] : void 0;
                  return "function" == typeof i
                    ? function () {
                        for (
                          var e = arguments.length, t = new Array(e), n = 0;
                          n < e;
                          n++
                        )
                          t[n] = arguments[n];
                        return i.apply(void 0, [r].concat(t, [o]));
                      }
                    : i && E(i.url)
                    ? ((f = e),
                      (p = i),
                      (h = r),
                      (m = o),
                      function (e, t, n, i, r, o, s) {
                        if (e) {
                          var a = m.chunkUploads,
                            l = a && e.size > m.chunkSize,
                            a = a && (l || m.chunkForce);
                          if (e instanceof Blob && a)
                            return Be(f, p, h, e, t, n, i, r, o, s, m);
                          var l =
                              p.ondata ||
                              function (e) {
                                return e;
                              },
                            u =
                              p.onload ||
                              function (e) {
                                return e;
                              },
                            c =
                              p.onerror ||
                              function (e) {
                                return null;
                              },
                            a =
                              "function" == typeof p.headers
                                ? p.headers(e, t) || {}
                                : Object.assign({}, p.headers),
                            s = Object.assign({}, p, { headers: a }),
                            d = new FormData(),
                            a =
                              (R(t) && d.append(h, JSON.stringify(t)),
                              (e instanceof Blob
                                ? [{ name: null, file: e }]
                                : e
                              ).forEach(function (e) {
                                d.append(
                                  h,
                                  e.file,
                                  null === e.name
                                    ? e.file.name
                                    : "" + e.name + e.file.name
                                );
                              }),
                              M(l(d), je(f, p.url), s));
                          return (
                            (a.onload = function (e) {
                              n(
                                j(
                                  "load",
                                  e.status,
                                  u(e.response),
                                  e.getAllResponseHeaders()
                                )
                              );
                            }),
                            (a.onerror = function (e) {
                              i(
                                j(
                                  "error",
                                  e.status,
                                  c(e.response) || e.statusText,
                                  e.getAllResponseHeaders()
                                )
                              );
                            }),
                            (a.ontimeout = L(i)),
                            (a.onprogress = r),
                            (a.onabort = o),
                            a
                          );
                        }
                      })
                    : null;
                })(e.server.url, e.server.process, e.name, {
                  chunkTransferId: i.transferId,
                  chunkServer: e.server.patch,
                  chunkUploads: e.chunkUploads,
                  chunkForce: e.chunkForce,
                  chunkSize: e.chunkSize,
                  chunkRetryDelays: e.chunkRetryDelays,
                })),
                (e = {
                  allowMinimumUploadDuration: g(
                    "GET_ALLOW_MINIMUM_UPLOAD_DURATION"
                  ),
                }),
                (s = {
                  complete: !1,
                  perceivedProgress: 0,
                  perceivedPerformanceUpdater: null,
                  progress: null,
                  timestamp: null,
                  perceivedDuration: 0,
                  duration: 0,
                  request: null,
                  response: null,
                }),
                (a = e.allowMinimumUploadDuration),
                (l = Object.assign({}, ye(), {
                  process: function (e, t) {
                    function i() {
                      0 !== s.duration &&
                        null !== s.progress &&
                        l.fire("progress", l.getProgress());
                    }
                    function n() {
                      (s.complete = !0),
                        l.fire("load-perceived", s.response.body);
                    }
                    l.fire("start"),
                      (s.timestamp = Date.now()),
                      (s.perceivedPerformanceUpdater = (function (
                        i,
                        e,
                        t,
                        n,
                        r
                      ) {
                        var o = 1 < arguments.length && void 0 !== e ? e : 1e3,
                          s = 3 < arguments.length && void 0 !== n ? n : 25,
                          a = 4 < arguments.length && void 0 !== r ? r : 250,
                          l = null,
                          u = Date.now();
                        return (
                          0 < o &&
                            (function e() {
                              var t = Date.now() - u,
                                n = qe(s, a),
                                t = (o < t + n && (n = t + n - o), t / o);
                              1 <= t || document.hidden
                                ? i(1)
                                : (i(t), (l = setTimeout(e, n)));
                            })(),
                          {
                            clear: function () {
                              clearTimeout(l);
                            },
                          }
                        );
                      })(
                        function (e) {
                          (s.perceivedProgress = e),
                            (s.perceivedDuration = Date.now() - s.timestamp),
                            i(),
                            s.response &&
                              1 === s.perceivedProgress &&
                              !s.complete &&
                              n();
                        },
                        a ? qe(750, 1500) : 0
                      )),
                      (s.request = o(
                        e,
                        t,
                        function (e) {
                          (s.response = R(e)
                            ? e
                            : {
                                type: "load",
                                code: 200,
                                body: "" + e,
                                headers: {},
                              }),
                            (s.duration = Date.now() - s.timestamp),
                            (s.progress = 1),
                            l.fire("load", s.response.body),
                            (a && 1 !== s.perceivedProgress) || n();
                        },
                        function (e) {
                          s.perceivedPerformanceUpdater.clear(),
                            l.fire(
                              "error",
                              R(e)
                                ? e
                                : { type: "error", code: 0, body: "" + e }
                            );
                        },
                        function (e, t, n) {
                          (s.duration = Date.now() - s.timestamp),
                            (s.progress = e ? t / n : null),
                            i();
                        },
                        function () {
                          s.perceivedPerformanceUpdater.clear(),
                            l.fire(
                              "abort",
                              s.response ? s.response.body : null
                            );
                        },
                        function (e) {
                          l.fire("transfer", e);
                        }
                      ));
                  },
                  abort: u,
                  getProgress: a
                    ? function () {
                        return s.progress
                          ? Math.min(s.progress, s.perceivedProgress)
                          : null;
                      }
                    : function () {
                        return s.progress || null;
                      },
                  getDuration: a
                    ? function () {
                        return Math.min(s.duration, s.perceivedDuration);
                      }
                    : function () {
                        return s.duration;
                      },
                  reset: function () {
                    u(),
                      (s.complete = !1),
                      (s.perceivedProgress = 0),
                      (s.progress = 0),
                      (s.timestamp = null),
                      (s.perceivedDuration = 0),
                      (s.duration = 0),
                      (s.request = null),
                      (s.response = null);
                  },
                }))),
                function (e, t, n) {
                  b("PREPARE_OUTPUT", e, { query: g, item: i })
                    .then(function (e) {
                      m("DID_PREPARE_OUTPUT", { id: i.id, file: e }), t(e);
                    })
                    .catch(n);
                }
              ))
            : v.processingQueue.push({ id: i.id, success: t, failure: n });
        }),
        RETRY_ITEM_PROCESSING: e(v, function (e) {
          m("REQUEST_ITEM_PROCESSING", { query: e });
        }),
        REQUEST_REMOVE_ITEM: e(v, function (t) {
          Ze(g("GET_BEFORE_REMOVE_FILE"), P(t)).then(function (e) {
            e && m("REMOVE_ITEM", { query: t });
          });
        }),
        RELEASE_ITEM: e(v, function (e) {
          e.release();
        }),
        REMOVE_ITEM: e(v, function (t, n, e, i) {
          function r() {
            var e = t.id;
            He(v.items, e).archive(),
              m("DID_REMOVE_ITEM", { error: null, id: e, item: t }),
              Xe(m, v),
              n(P(t));
          }
          var o = v.options.server;
          t.origin === N.LOCAL && o && y(o.remove) && !1 !== i.remove
            ? (m("DID_START_ITEM_REMOVE", { id: t.id }),
              o.remove(t.source, r, function (e) {
                m("DID_THROW_ITEM_REMOVE_ERROR", {
                  id: t.id,
                  error: j("error", 0, e, null),
                  status: {
                    main: Ye(v.options.labelFileRemoveError)(e),
                    sub: v.options.labelTapToRetry,
                  },
                });
              }))
            : (((i.revert && t.origin !== N.LOCAL && null !== t.serverId) ||
                (v.options.chunkUploads && t.file.size > v.options.chunkSize) ||
                (v.options.chunkUploads && v.options.chunkForce)) &&
                t.revert(
                  Ge(v.options.server.url, v.options.server.revert),
                  g("GET_FORCE_REVERT")
                ),
              r());
        }),
        ABORT_ITEM_LOAD: e(v, function (e) {
          e.abortLoad();
        }),
        ABORT_ITEM_PROCESSING: e(v, function (e) {
          e.serverId
            ? m("REVERT_ITEM_PROCESSING", { id: e.id })
            : e.abortProcessing().then(function () {
                v.options.instantUpload && m("REMOVE_ITEM", { query: e.id });
              });
        }),
        REQUEST_REVERT_ITEM_PROCESSING: e(v, function (t) {
          if (v.options.instantUpload) {
            var e = function (e) {
                e && m("REVERT_ITEM_PROCESSING", { query: t });
              },
              n = g("GET_BEFORE_REMOVE_FILE");
            if (!n) return e(!0);
            n = n(P(t));
            return null == n
              ? e(!0)
              : "boolean" == typeof n
              ? e(n)
              : "function" == typeof n.then && n.then(e);
          }
          m("REVERT_ITEM_PROCESSING", { query: t });
        }),
        REVERT_ITEM_PROCESSING: e(v, function (e) {
          e.revert(
            Ge(v.options.server.url, v.options.server.revert),
            g("GET_FORCE_REVERT")
          )
            .then(function () {
              (!v.options.instantUpload && I(e.file)) ||
                m("REMOVE_ITEM", { query: e.id });
            })
            .catch(function () {});
        }),
        SET_OPTIONS: function (e) {
          var t = e.options,
            n = Object.keys(t),
            i = _t.filter(function (e) {
              return n.includes(e);
            });
          []
            .concat(
              ve(i),
              ve(
                Object.keys(t).filter(function (e) {
                  return !i.includes(e);
                })
              )
            )
            .forEach(function (e) {
              m("SET_" + Q(e, "_").toUpperCase(), { value: t[e] });
            });
        },
      };
    }
    function u(e) {
      return document.createElement(e);
    }
    function r(e, t) {
      var n = e.childNodes[0];
      n
        ? t !== n.nodeValue && (n.nodeValue = t)
        : ((n = document.createTextNode(t)), e.appendChild(n));
    }
    function Qe(e, t, n, i) {
      return (
        (i = (((i % 360) - 90) * Math.PI) / 180),
        { x: e + n * Math.cos(i), y: t + n * Math.sin(i) }
      );
    }
    function et(e) {
      var t =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ".",
        n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1e3,
        i =
          void 0 ===
          (i = (s =
            3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {})
            .labelBytes)
            ? "bytes"
            : i,
        r = void 0 === (r = s.labelKilobytes) ? "KB" : r,
        o = void 0 === (o = s.labelMegabytes) ? "MB" : o,
        s = void 0 === (s = s.labelGigabytes) ? "GB" : s,
        a = n,
        l = n * n,
        n = n * n * n;
      return (e = Math.round(Math.abs(e))) < a
        ? e + " " + i
        : e < l
        ? Math.floor(e / a) + " " + r
        : e < n
        ? wt(e / l, 1, t) + " " + o
        : wt(e / n, 2, t) + " " + s;
    }
    function tt(e) {
      var t = e.root,
        e = e.props;
      r(
        t.ref.fileSize,
        et(
          t.query("GET_ITEM_SIZE", e.id),
          ".",
          t.query("GET_FILE_SIZE_BASE"),
          t.query("GET_FILE_SIZE_LABELS", t.query)
        )
      ),
        r(t.ref.fileName, t.query("GET_ITEM_NAME", e.id));
    }
    function nt(e) {
      var t = e.root,
        e = e.props;
      a(t.query("GET_ITEM_SIZE", e.id))
        ? tt({ root: t, props: e })
        : r(t.ref.fileSize, t.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
    }
    function it(e) {
      return Math.round(100 * e);
    }
    function rt(e) {
      var t = e.root,
        e =
          null === (e = e.action).progress
            ? t.query("GET_LABEL_FILE_LOADING")
            : t.query("GET_LABEL_FILE_LOADING") + " " + it(e.progress) + "%";
      r(t.ref.main, e), r(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"));
    }
    function ot(e) {
      (e = e.root), r(e.ref.main, ""), r(e.ref.sub, "");
    }
    function st(e) {
      var t = e.root,
        e = e.action;
      r(t.ref.main, e.status.main), r(t.ref.sub, e.status.sub);
    }
    var at = function (e, t) {
        return e.splice(t, 1);
      },
      lt = function (t, n, i) {
        Object.getOwnPropertyNames(t)
          .filter(function (e) {
            return !i.includes(e);
          })
          .forEach(function (e) {
            return Object.defineProperty(
              n,
              e,
              Object.getOwnPropertyDescriptor(t, e)
            );
          });
      },
      ut = [
        "fire",
        "process",
        "revert",
        "load",
        "on",
        "off",
        "onOnce",
        "retryLoad",
        "extend",
        "archive",
        "archived",
        "release",
        "released",
        "requestProcessing",
        "freeze",
      ],
      F = {
        INIT: 1,
        IDLE: 2,
        PROCESSING_QUEUED: 9,
        PROCESSING: 3,
        PROCESSING_COMPLETE: 5,
        PROCESSING_ERROR: 6,
        PROCESSING_REVERT_ERROR: 10,
        LOADING: 7,
        LOAD_ERROR: 8,
      },
      N = { INPUT: 1, LIMBO: 2, LOCAL: 3 },
      i = {
        BOOLEAN: "boolean",
        INT: "int",
        NUMBER: "number",
        STRING: "string",
        ARRAY: "array",
        OBJECT: "object",
        FUNCTION: "function",
        ACTION: "action",
        SERVER_API: "serverapi",
        REGEX: "regex",
      },
      ct = [],
      dt = function () {
        return Object.assign({}, s);
      },
      s = {
        id: [null, i.STRING],
        name: ["filepond", i.STRING],
        disabled: [
          !function (e) {
            return this._invoke("return", e);
          },
          i.BOOLEAN,
        ],
        className: [null, i.STRING],
        required: [!1, i.BOOLEAN],
        captureMethod: [null, i.STRING],
        allowSyncAcceptAttribute: [!0, i.BOOLEAN],
        allowDrop: [!0, i.BOOLEAN],
        allowBrowse: [!0, i.BOOLEAN],
        allowPaste: [!0, i.BOOLEAN],
        allowMultiple: [!1, i.BOOLEAN],
        allowReplace: [!0, i.BOOLEAN],
        allowRevert: [!0, i.BOOLEAN],
        allowRemove: [!0, i.BOOLEAN],
        allowProcess: [!0, i.BOOLEAN],
        allowReorder: [!1, i.BOOLEAN],
        allowDirectoriesOnly: [!1, i.BOOLEAN],
        storeAsFile: [!1, i.BOOLEAN],
        forceRevert: [!1, i.BOOLEAN],
        maxFiles: [null, i.INT],
        checkValidity: [!1, i.BOOLEAN],
        itemInsertLocationFreedom: [!0, i.BOOLEAN],
        itemInsertLocation: ["before", i.STRING],
        itemInsertInterval: [75, i.INT],
        dropOnPage: [!1, i.BOOLEAN],
        dropOnElement: [!0, i.BOOLEAN],
        dropValidation: [!1, i.BOOLEAN],
        ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], i.ARRAY],
        instantUpload: [!0, i.BOOLEAN],
        maxParallelUploads: [2, i.INT],
        allowMinimumUploadDuration: [!0, i.BOOLEAN],
        chunkUploads: [!1, i.BOOLEAN],
        chunkForce: [!1, i.BOOLEAN],
        chunkSize: [5e6, i.INT],
        chunkRetryDelays: [[500, 1e3, 3e3], i.ARRAY],
        server: [null, i.SERVER_API],
        fileSizeBase: [1e3, i.INT],
        labelFileSizeBytes: ["bytes", i.STRING],
        labelFileSizeKilobytes: ["KB", i.STRING],
        labelFileSizeMegabytes: ["MB", i.STRING],
        labelFileSizeGigabytes: ["GB", i.STRING],
        labelDecimalSeparator: [Ee(), i.STRING],
        labelThousandsSeparator: [
          ((g = Ee()),
          (bn = (1e3).toLocaleString()) !== (1e3).toString()
            ? _e(bn)[0]
            : "." === g
            ? ","
            : "."),
          i.STRING,
        ],
        labelIdle: [
          'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
          i.STRING,
        ],
        labelInvalidField: ["Field contains invalid files", i.STRING],
        labelFileWaitingForSize: ["Waiting for size", i.STRING],
        labelFileSizeNotAvailable: ["Size not available", i.STRING],
        labelFileCountSingular: ["file in list", i.STRING],
        labelFileCountPlural: ["files in list", i.STRING],
        labelFileLoading: ["Loading", i.STRING],
        labelFileAdded: ["Added", i.STRING],
        labelFileLoadError: ["Error during load", i.STRING],
        labelFileRemoved: ["Removed", i.STRING],
        labelFileRemoveError: ["Error during remove", i.STRING],
        labelFileProcessing: ["Uploading", i.STRING],
        labelFileProcessingComplete: ["Upload complete", i.STRING],
        labelFileProcessingAborted: ["Upload cancelled", i.STRING],
        labelFileProcessingError: ["Error during upload", i.STRING],
        labelFileProcessingRevertError: ["Error during revert", i.STRING],
        labelTapToCancel: ["tap to cancel", i.STRING],
        labelTapToRetry: ["tap to retry", i.STRING],
        labelTapToUndo: ["tap to undo", i.STRING],
        labelButtonRemoveItem: ["Remove", i.STRING],
        labelButtonAbortItemLoad: ["Abort", i.STRING],
        labelButtonRetryItemLoad: ["Retry", i.STRING],
        labelButtonAbortItemProcessing: ["Cancel", i.STRING],
        labelButtonUndoItemProcessing: ["Undo", i.STRING],
        labelButtonRetryItemProcessing: ["Retry", i.STRING],
        labelButtonProcessItem: ["Upload", i.STRING],
        iconRemove: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
          i.STRING,
        ],
        iconProcess: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
          i.STRING,
        ],
        iconRetry: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
          i.STRING,
        ],
        iconUndo: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
          i.STRING,
        ],
        iconDone: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
          i.STRING,
        ],
        oninit: [null, i.FUNCTION],
        onwarning: [null, i.FUNCTION],
        onerror: [null, i.FUNCTION],
        onactivatefile: [null, i.FUNCTION],
        oninitfile: [null, i.FUNCTION],
        onaddfilestart: [null, i.FUNCTION],
        onaddfileprogress: [null, i.FUNCTION],
        onaddfile: [null, i.FUNCTION],
        onprocessfilestart: [null, i.FUNCTION],
        onprocessfileprogress: [null, i.FUNCTION],
        onprocessfileabort: [null, i.FUNCTION],
        onprocessfilerevert: [null, i.FUNCTION],
        onprocessfile: [null, i.FUNCTION],
        onprocessfiles: [null, i.FUNCTION],
        onremovefile: [null, i.FUNCTION],
        onpreparefile: [null, i.FUNCTION],
        onupdatefiles: [null, i.FUNCTION],
        onreorderfiles: [null, i.FUNCTION],
        beforeDropFile: [null, i.FUNCTION],
        beforeAddFile: [null, i.FUNCTION],
        beforeRemoveFile: [null, i.FUNCTION],
        beforePrepareFile: [null, i.FUNCTION],
        stylePanelLayout: [null, i.STRING],
        stylePanelAspectRatio: [null, i.STRING],
        styleItemPanelAspectRatio: [null, i.STRING],
        styleButtonRemoveItemPosition: ["left", i.STRING],
        styleButtonProcessItemPosition: ["right", i.STRING],
        styleLoadIndicatorPosition: ["right", i.STRING],
        styleProgressIndicatorPosition: ["right", i.STRING],
        styleButtonRemoveItemAlign: [!1, i.BOOLEAN],
        files: [[], i.ARRAY],
        credits: [["https://pqina.nl/", "Powered by PQINA"], i.ARRAY],
      },
      ft = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 },
      pt = null,
      ht = [F.LOAD_ERROR, F.PROCESSING_ERROR, F.PROCESSING_REVERT_ERROR],
      mt = [F.LOADING, F.PROCESSING, F.PROCESSING_QUEUED, F.INIT],
      gt = [F.PROCESSING_COMPLETE],
      vt = function (e) {
        return e.split(".").pop();
      },
      yt = function () {
        var e =
          0 < arguments.length && void 0 !== arguments[0]
            ? arguments[0]
            : new Date();
        return (
          e.getFullYear() +
          "-" +
          Oe(e.getMonth() + 1, "00") +
          "-" +
          Oe(e.getDate(), "00") +
          "_" +
          Oe(e.getHours(), "00") +
          "-" +
          Oe(e.getMinutes(), "00") +
          "-" +
          Oe(e.getSeconds(), "00")
        );
      },
      j = function (e, t, n, i) {
        return { type: e, code: t, body: n, headers: i };
      },
      _t = ["server"],
      Et = o({
        tag: "div",
        name: "progress-indicator",
        ignoreRectUpdate: !0,
        ignoreRect: !0,
        create: function (e) {
          var t = e.root,
            e = e.props,
            e = ((e.spin = !1), (e.progress = 0), (e.opacity = 0), q("svg"));
          (t.ref.path = q("path", {
            "stroke-width": 2,
            "stroke-linecap": "round",
          })),
            e.appendChild(t.ref.path),
            (t.ref.svg = e),
            t.appendChild(e);
        },
        write: function (e) {
          var t,
            n,
            i,
            r,
            o,
            s,
            a = e.root,
            e = e.props;
          0 !== e.opacity &&
            (e.align && (a.element.dataset.align = e.align),
            (i = parseInt(l(a.ref.path, "stroke-width"), 10)),
            (t = 0.5 * a.rect.element.width),
            (o = r = 0),
            (o = e.spin ? ((r = 0), 0.5) : ((r = 0), e.progress)),
            (i = (n = t = t) - i),
            (s =
              ((o = o) < (r = r) && 0.5 <= r - o) || (r < o && o - r <= 0.5)
                ? 0
                : 1),
            (r = 360 * Math.min(0.9999, r)),
            (o = 360 * Math.min(0.9999, o)),
            (o = Qe(t, n, i, o)),
            (t = Qe(t, n, i, r)),
            (n = ["M", o.x, o.y, "A", i, i, 0, s, 0, t.x, t.y].join(" ")),
            l(a.ref.path, "d", n),
            l(a.ref.path, "stroke-opacity", e.spin || 0 < e.progress ? 1 : 0));
        },
        mixins: {
          apis: ["progress", "spin", "align"],
          styles: ["opacity"],
          animations: {
            opacity: { type: "tween", duration: 500 },
            progress: {
              type: "spring",
              stiffness: 0.95,
              damping: 0.65,
              mass: 10,
            },
          },
        },
      }),
      bt = o({
        tag: "button",
        attributes: { type: "button" },
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        name: "file-action-button",
        mixins: {
          apis: ["label"],
          styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 },
          },
          listeners: !0,
        },
        create: function (e) {
          var t = e.root,
            e = e.props;
          (t.element.innerHTML =
            (e.icon || "") + "<span>" + e.label + "</span>"),
            (e.isDisabled = !1);
        },
        write: function (e) {
          var t = e.root,
            e = e.props,
            n = e.isDisabled,
            i = t.query("GET_DISABLED") || 0 === e.opacity;
          i && !n
            ? ((e.isDisabled = !0), l(t.element, "disabled", "disabled"))
            : !i &&
              n &&
              ((e.isDisabled = !1), t.element.removeAttribute("disabled"));
        },
      }),
      wt = function (e, t, n) {
        return e
          .toFixed(t)
          .split(".")
          .filter(function (e) {
            return "0" !== e;
          })
          .join(n);
      },
      Tt = o({
        name: "file-info",
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: t({
          DID_LOAD_ITEM: tt,
          DID_UPDATE_ITEM_META: tt,
          DID_THROW_ITEM_LOAD_ERROR: nt,
          DID_THROW_ITEM_INVALID: nt,
        }),
        didCreateView: function (e) {
          T("CREATE_VIEW", Object.assign({}, e, { view: e }));
        },
        create: function (e) {
          var t = e.root,
            e = e.props,
            n = u("span"),
            i =
              ((n.className = "filepond--file-info-main"),
              l(n, "aria-hidden", "true"),
              t.appendChild(n),
              (t.ref.fileName = n),
              u("span"));
          (i.className = "filepond--file-info-sub"),
            t.appendChild(i),
            (t.ref.fileSize = i),
            r(i, t.query("GET_LABEL_FILE_WAITING_FOR_SIZE")),
            r(n, t.query("GET_ITEM_NAME", e.id));
        },
        mixins: {
          styles: ["translateX", "translateY"],
          animations: { translateX: "spring", translateY: "spring" },
        },
      }),
      St = o({
        name: "file-status",
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: t({
          DID_LOAD_ITEM: ot,
          DID_REVERT_ITEM_PROCESSING: ot,
          DID_REQUEST_ITEM_PROCESSING: function (e) {
            e = e.root;
            r(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")),
              r(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
          },
          DID_ABORT_ITEM_PROCESSING: function (e) {
            e = e.root;
            r(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")),
              r(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
          },
          DID_COMPLETE_ITEM_PROCESSING: function (e) {
            e = e.root;
            r(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")),
              r(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
          },
          DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
            var t = e.root,
              e = e.action,
              e =
                null === e.progress
                  ? t.query("GET_LABEL_FILE_PROCESSING")
                  : t.query("GET_LABEL_FILE_PROCESSING") +
                    " " +
                    it(e.progress) +
                    "%";
            r(t.ref.main, e), r(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"));
          },
          DID_UPDATE_ITEM_LOAD_PROGRESS: rt,
          DID_THROW_ITEM_LOAD_ERROR: st,
          DID_THROW_ITEM_INVALID: st,
          DID_THROW_ITEM_PROCESSING_ERROR: st,
          DID_THROW_ITEM_PROCESSING_REVERT_ERROR: st,
          DID_THROW_ITEM_REMOVE_ERROR: st,
        }),
        didCreateView: function (e) {
          T("CREATE_VIEW", Object.assign({}, e, { view: e }));
        },
        create: function (e) {
          var e = e.root,
            t = u("span"),
            t =
              ((t.className = "filepond--file-status-main"),
              e.appendChild(t),
              (e.ref.main = t),
              u("span"));
          (t.className = "filepond--file-status-sub"),
            e.appendChild(t),
            (e.ref.sub = t),
            rt({ root: e, action: { progress: null } });
        },
        mixins: {
          styles: ["translateX", "translateY", "opacity"],
          animations: {
            opacity: { type: "tween", duration: 250 },
            translateX: "spring",
            translateY: "spring",
          },
        },
      }),
      It = {
        AbortItemLoad: {
          label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
          action: "ABORT_ITEM_LOAD",
          className: "filepond--action-abort-item-load",
          align: "LOAD_INDICATOR_POSITION",
        },
        RetryItemLoad: {
          label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
          action: "RETRY_ITEM_LOAD",
          icon: "GET_ICON_RETRY",
          className: "filepond--action-retry-item-load",
          align: "BUTTON_PROCESS_ITEM_POSITION",
        },
        RemoveItem: {
          label: "GET_LABEL_BUTTON_REMOVE_ITEM",
          action: "REQUEST_REMOVE_ITEM",
          icon: "GET_ICON_REMOVE",
          className: "filepond--action-remove-item",
          align: "BUTTON_REMOVE_ITEM_POSITION",
        },
        ProcessItem: {
          label: "GET_LABEL_BUTTON_PROCESS_ITEM",
          action: "REQUEST_ITEM_PROCESSING",
          icon: "GET_ICON_PROCESS",
          className: "filepond--action-process-item",
          align: "BUTTON_PROCESS_ITEM_POSITION",
        },
        AbortItemProcessing: {
          label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
          action: "ABORT_ITEM_PROCESSING",
          className: "filepond--action-abort-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION",
        },
        RetryItemProcessing: {
          label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
          action: "RETRY_ITEM_PROCESSING",
          icon: "GET_ICON_RETRY",
          className: "filepond--action-retry-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION",
        },
        RevertItemProcessing: {
          label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
          action: "REQUEST_REVERT_ITEM_PROCESSING",
          icon: "GET_ICON_UNDO",
          className: "filepond--action-revert-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION",
        },
      },
      kt = [];
    D(It, function (e) {
      kt.push(e);
    });
    function f(e) {
      return "right" === Dt(e)
        ? 0
        : (e = e.ref.buttonRemoveItem.rect.element).hidden
        ? null
        : e.width + e.left;
    }
    function Ct(e) {
      return e.ref.buttonAbortItemLoad.rect.element.width;
    }
    function xt(e) {
      return Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4);
    }
    function At(e) {
      return Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2);
    }
    function Dt(e) {
      return e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
    }
    function Ot(e, t) {
      return Math.max(1, Math.floor((e + 1) / t));
    }
    function Rt(e, t, n) {
      var i,
        r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0,
        o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1;
      e.dragOffset
        ? ((e.translateX = null),
          (e.translateY = null),
          (e.translateX = e.dragOrigin.x + e.dragOffset.x),
          (e.translateY = e.dragOrigin.y + e.dragOffset.y),
          (e.scaleX = 1.025),
          (e.scaleY = 1.025))
        : ((e.translateX = t),
          (e.translateY = n),
          Date.now() > e.spawnDate &&
            (0 === e.opacity &&
              ((t = t),
              (n = n),
              (r = r),
              (o = o),
              (i = e).interactionMethod === me
                ? ((i.translateX = null),
                  (i.translateX = t),
                  (i.translateY = null),
                  (i.translateY = n))
                : i.interactionMethod === pe
                ? ((i.translateX = null),
                  (i.translateX = t - 20 * r),
                  (i.translateY = null),
                  (i.translateY = n - 10 * o),
                  (i.scaleX = 0.8),
                  (i.scaleY = 0.8))
                : i.interactionMethod === he
                ? ((i.translateY = null), (i.translateY = n - 30))
                : i.interactionMethod === fe &&
                  ((i.translateX = null),
                  (i.translateX = t - 30),
                  (i.translateY = null))),
            (e.scaleX = 1),
            (e.scaleY = 1),
            (e.opacity = 1)));
    }
    function Pt(e) {
      return (
        e.rect.element.height +
        0.5 * e.rect.element.marginBottom +
        0.5 * e.rect.element.marginTop
      );
    }
    function p(e, t, n) {
      n
        ? l(
            e,
            t,
            3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : ""
          )
        : e.removeAttribute(t);
    }
    function Mt(e) {
      var t = e.root,
        e = e.action;
      t.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
        p(t.element, "accept", !!e.value, e.value ? e.value.join(",") : "");
    }
    function Lt(e) {
      var t = e.root,
        e = e.action;
      p(t.element, "multiple", e.value);
    }
    function Ft(e) {
      var t = e.root,
        e = e.action;
      p(t.element, "webkitdirectory", e.value);
    }
    function Nt(e) {
      var t = (e = e.root).query("GET_DISABLED"),
        n = e.query("GET_ALLOW_BROWSE");
      p(e.element, "disabled", t || !n);
    }
    function jt(e) {
      var t = e.root;
      e.action.value
        ? 0 === t.query("GET_TOTAL_ITEMS") && p(t.element, "required", !0)
        : p(t.element, "required", !1);
    }
    function $t(e) {
      var t = e.root,
        e = e.action;
      p(t.element, "capture", !!e.value, !0 === e.value ? "" : e.value);
    }
    function Bt(e) {
      var t = (e = e.root).element;
      0 < e.query("GET_TOTAL_ITEMS")
        ? (p(t, "required", !1), p(t, "name", !1))
        : (p(t, "name", !0, e.query("GET_NAME")),
          e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""),
          e.query("GET_REQUIRED") && p(t, "required", !0));
    }
    function Gt(e, t) {
      (e.innerHTML = t),
        (e = e.querySelector(".filepond--label-action")) &&
          l(e, "tabindex", "0");
    }
    function qt(e, t) {
      try {
        var n = new DataTransfer();
        t.forEach(function (e) {
          e instanceof File
            ? n.items.add(e)
            : n.items.add(new File([e], e.name, { type: e.type }));
        }),
          (e.files = n.files);
      } catch (e) {
        return;
      }
    }
    function Ut(e, t) {
      return e.ref.fields[t];
    }
    function Vt(t) {
      t.query("GET_ACTIVE_ITEMS").forEach(function (e) {
        t.ref.fields[e.id] && t.element.appendChild(t.ref.fields[e.id]);
      });
    }
    function Ht(e) {
      return (e = e.root), Vt(e);
    }
    function zt() {
      var e = (e =
        0 < arguments.length && void 0 !== arguments[0]
          ? arguments[0]
          : "").toLowerCase();
      return Vn.includes(e)
        ? "image/" + ("jpg" === e ? "jpeg" : "svg" === e ? "svg+xml" : e)
        : Hn.includes(e)
        ? "text/" + e
        : zn[e] || "";
    }
    function Wt(o) {
      return new Promise(function (e, t) {
        var n,
          i,
          r = (function (e) {
            var t = [];
            try {
              if ((t = Qn(e)).length) return t;
              t = Jn(e);
            } catch (e) {}
            return t;
          })(o);
        if (r.length && !((n = o).files && 0 < n.files.length)) return e(r);
        (i = o),
          new Promise(function (n, e) {
            var t = (i.items ? Array.from(i.items) : [])
              .filter(function (e) {
                return Wn(e);
              })
              .map(function (e) {
                return Yn(e);
              });
            t.length
              ? Promise.all(t)
                  .then(function (e) {
                    var t = [];
                    e.forEach(function (e) {
                      t.push.apply(t, e);
                    }),
                      n(
                        t
                          .filter(function (e) {
                            return e;
                          })
                          .map(function (e) {
                            return (
                              e._relativePath ||
                                (e._relativePath = e.webkitRelativePath),
                              e
                            );
                          })
                      );
                  })
                  .catch(console.error)
              : n(i.files ? Array.from(i.files) : []);
          }).then(e);
      });
    }
    function h(e) {
      return {
        pageLeft: e.pageX,
        pageTop: e.pageY,
        scopeLeft: e.offsetX || e.layerX,
        scopeTop: e.offsetY || e.layerY,
      };
    }
    function Yt(e, t) {
      (n = "getRootNode" in t ? t.getRootNode() : document),
        (e = {
          x: e.pageX - window.pageXOffset,
          y: e.pageY - window.pageYOffset,
        });
      var n = (n = "elementFromPoint" in n ? n : document).elementFromPoint(
        e.x,
        e.y
      );
      return n === t || t.contains(n);
    }
    function Xt(e, t) {
      try {
        e.dropEffect = t;
      } catch (e) {}
    }
    function Zt() {
      function e(e) {
        n.onload(e);
      }
      var t,
        n = {
          destroy: function () {
            at(li, li.indexOf(e)),
              0 === li.length &&
                (document.removeEventListener("paste", ui), (ai = !1));
          },
          onload: function () {},
        };
      return (
        (t = e),
        li.includes(t) ||
          (li.push(t),
          ai || ((ai = !0), document.addEventListener("paste", ui))),
        n
      );
    }
    function Kt(e, t) {
      e.element.textContent = t;
    }
    function Jt(e, t, n) {
      var i = e.query("GET_TOTAL_ITEMS");
      Kt(
        e,
        n +
          " " +
          t +
          ", " +
          i +
          " " +
          (1 === i
            ? e.query("GET_LABEL_FILE_COUNT_SINGULAR")
            : e.query("GET_LABEL_FILE_COUNT_PLURAL"))
      ),
        clearTimeout(di),
        (di = setTimeout(function () {
          e.element.textContent = "";
        }, 1500));
    }
    function Qt(e) {
      return e.element.parentNode.contains(document.activeElement);
    }
    function en(e) {
      var t = e.root,
        e = e.action,
        e = t.query("GET_ITEM", e.id).filename,
        n = t.query("GET_LABEL_FILE_PROCESSING_ABORTED");
      Kt(t, e + " " + n);
    }
    function tn(e) {
      var t = e.root,
        e = e.action,
        n = t.query("GET_ITEM", e.id).filename;
      Kt(t, e.status.main + " " + n + " " + e.status.sub);
    }
    function nn(o) {
      var s =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 16,
        a = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2],
        l = Date.now(),
        u = null;
      return function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        clearTimeout(u);
        function i() {
          (l = Date.now()), o.apply(void 0, t);
        }
        var r = Date.now() - l;
        r < s ? a || (u = setTimeout(i, s - r)) : i();
      };
    }
    function rn(e) {
      return e.preventDefault();
    }
    function on(e, t) {
      var n = e.query("GET_ALLOW_REPLACE"),
        i = e.query("GET_ALLOW_MULTIPLE"),
        r = e.query("GET_TOTAL_ITEMS"),
        o = e.query("GET_MAX_FILES"),
        s = t.length;
      return !i && 1 < s
        ? (e.dispatch("DID_THROW_MAX_FILES", {
            source: t,
            error: j("warning", 0, "Max files"),
          }),
          !0)
        : !(
            (!i && n) ||
            !(a((o = i ? o : 1)) && o < r + s) ||
            (e.dispatch("DID_THROW_MAX_FILES", {
              source: t,
              error: j("warning", 0, "Max files"),
            }),
            0)
          );
    }
    function sn(o) {
      var e,
        n,
        t,
        i,
        r,
        s,
        a,
        l,
        u,
        c = o.query("GET_ALLOW_DROP"),
        d = o.query("GET_DISABLED");
      (c = c && !d) && !o.ref.hopper
        ? ((e = o.element),
          (n = function (e) {
            var t =
              o.query("GET_BEFORE_DROP_FILE") ||
              function () {
                return !0;
              };
            return (
              !o.query("GET_DROP_VALIDATION") ||
              e.every(function (e) {
                return (
                  T("ALLOW_HOPPER_ITEM", e, { query: o.query }).every(function (
                    e
                  ) {
                    return !0 === e;
                  }) && t(e)
                );
              })
            );
          }),
          (d = {
            filterItems: function (e) {
              var t = o.query("GET_IGNORED_FILES");
              return e.filter(function (e) {
                return !I(e) || !t.includes(e.name.toLowerCase());
              });
            },
            catchesDropsOnPage: o.query("GET_DROP_ON_PAGE"),
            requiresDropOnElement: o.query("GET_DROP_ON_ELEMENT"),
          }),
          e.classList.add("filepond--hopper"),
          (t = d.catchesDropsOnPage),
          (i = d.requiresDropOnElement),
          (d = d.filterItems),
          (r =
            void 0 === d
              ? function (e) {
                  return e;
                }
              : d),
          (s = (function (e, t, n) {
            (t = ti(t)),
              (e = {
                element: e,
                filterElement: n,
                state: null,
                ondrop: function () {},
                onenter: function () {},
                ondrag: function () {},
                onexit: function () {},
                onload: function () {},
                allowdrop: function () {},
              });
            return (e.destroy = t.addListener(e)), e;
          })(e, t ? document.documentElement : e, i)),
          (l = a = ""),
          (s.allowdrop = function (e) {
            return n(r(e));
          }),
          (s.ondrop = function (e, t) {
            t = r(t);
            n(t) ? ((l = "drag-drop"), u.onload(t, e)) : u.ondragend(e);
          }),
          (s.ondrag = function (e) {
            u.ondrag(e);
          }),
          (s.onenter = function (e) {
            (l = "drag-over"), u.ondragstart(e);
          }),
          (s.onexit = function (e) {
            (l = "drag-exit"), u.ondragend(e);
          }),
          ((d = u =
            {
              updateHopperState: function () {
                a !== l && ((e.dataset.hopperState = l), (a = l));
              },
              onload: function () {},
              ondragstart: function () {},
              ondrag: function () {},
              ondragend: function () {},
              destroy: function () {
                s.destroy();
              },
            }).onload = function (e, n) {
            var i = o.ref.list.childViews[0].childViews.filter(function (e) {
                return e.rect.element.height;
              }),
              r = o
                .query("GET_ACTIVE_ITEMS")
                .map(function (t) {
                  return i.find(function (e) {
                    return e.id === t.id;
                  });
                })
                .filter(function (e) {
                  return e;
                });
            b("ADD_ITEMS", e, { dispatch: o.dispatch }).then(function (e) {
              if (on(o, e)) return !1;
              var t;
              o.dispatch("ADD_ITEMS", {
                items: e,
                index:
                  ((e = o.ref.list),
                  (t = e.childViews[0]),
                  Rn(t, r, {
                    left: n.scopeLeft - t.rect.element.left,
                    top:
                      n.scopeTop -
                      (e.rect.outer.top +
                        e.rect.element.marginTop +
                        e.rect.element.scrollTop),
                  })),
                interactionMethod: pe,
              });
            }),
              o.dispatch("DID_DROP", { position: n }),
              o.dispatch("DID_END_DRAG", { position: n });
          }),
          (d.ondragstart = function (e) {
            o.dispatch("DID_START_DRAG", { position: e });
          }),
          (d.ondrag = nn(function (e) {
            o.dispatch("DID_DRAG", { position: e });
          })),
          (d.ondragend = function (e) {
            o.dispatch("DID_END_DRAG", { position: e });
          }),
          (o.ref.hopper = d),
          (o.ref.drip = o.appendChildView(o.createChildView(qn))))
        : !c &&
          o.ref.hopper &&
          (o.ref.hopper.destroy(),
          (o.ref.hopper = null),
          o.removeChildView(o.ref.drip));
    }
    function an(t, e) {
      var n = t.query("GET_ALLOW_BROWSE"),
        i = t.query("GET_DISABLED");
      (n = n && !i) && !t.ref.browser
        ? (t.ref.browser = t.appendChildView(
            t.createChildView(
              jn,
              Object.assign({}, e, {
                onload: function (e) {
                  b("ADD_ITEMS", e, { dispatch: t.dispatch }).then(function (
                    e
                  ) {
                    if (on(t, e)) return !1;
                    t.dispatch("ADD_ITEMS", {
                      items: e,
                      index: -1,
                      interactionMethod: he,
                    });
                  });
                },
              })
            ),
            0
          ))
        : !n &&
          t.ref.browser &&
          (t.removeChildView(t.ref.browser), (t.ref.browser = null));
    }
    function ln(t) {
      var e = t.query("GET_ALLOW_PASTE"),
        n = t.query("GET_DISABLED");
      (e = e && !n) && !t.ref.paster
        ? ((t.ref.paster = Zt()),
          (t.ref.paster.onload = function (e) {
            b("ADD_ITEMS", e, { dispatch: t.dispatch }).then(function (e) {
              if (on(t, e)) return !1;
              t.dispatch("ADD_ITEMS", {
                items: e,
                index: -1,
                interactionMethod: 4,
              });
            });
          }))
        : !e && t.ref.paster && (t.ref.paster.destroy(), (t.ref.paster = null));
    }
    function un() {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        n = {};
      return (
        D(dt(), function (e, t) {
          n[e] = t[0];
        }),
        vi(Object.assign({}, n, {}, e))
      );
    }
    function cn() {
      return (
        (arguments.length <= 0 ? void 0 : arguments[0]) instanceof HTMLElement
          ? function (e) {
              var t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                n = {
                  "^class$": "className",
                  "^multiple$": "allowMultiple",
                  "^capture$": "captureMethod",
                  "^webkitdirectory$": "allowDirectoriesOnly",
                  "^server": {
                    group: "server",
                    mapping: {
                      "^process": { group: "process" },
                      "^revert": { group: "revert" },
                      "^fetch": { group: "fetch" },
                      "^restore": { group: "restore" },
                      "^load": { group: "load" },
                    },
                  },
                  "^type$": !1,
                  "^files$": !1,
                },
                i = (T("SET_ATTRIBUTE_TO_OPTION_MAP", n), Object.assign({}, t)),
                r = (function (r) {
                  var e =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    t = [],
                    n =
                      (D(r.attributes, function (e) {
                        t.push(r.attributes[e]);
                      }),
                      t
                        .filter(function (e) {
                          return e.name;
                        })
                        .reduce(function (e, t) {
                          var n,
                            i = l(r, t.name);
                          return (
                            (e[((n = t.name), hi(n.replace(/^data-/, "")))] =
                              i === t.name || i),
                            e
                          );
                        }, {}));
                  return (
                    (function e(s, t) {
                      D(t, function (r, o) {
                        D(s, function (e, t) {
                          var n,
                            i = new RegExp(r);
                          i.test(e) &&
                            (delete s[e], !1 !== o) &&
                            (E(o)
                              ? (s[o] = t)
                              : ((n = o.group),
                                R(o) && !s[n] && (s[n] = {}),
                                (s[n][
                                  (n = e.replace(i, ""))
                                    .charAt(0)
                                    .toLowerCase() + n.slice(1)
                                ] = t)));
                        }),
                          o.mapping && e(s[o.group], o.mapping);
                      });
                    })(n, e),
                    n
                  );
                })(
                  "FIELDSET" === e.nodeName
                    ? e.querySelector("input[type=file]")
                    : e,
                  n
                ),
                o =
                  (Object.keys(r).forEach(function (e) {
                    R(r[e])
                      ? (R(i[e]) || (i[e] = {}), Object.assign(i[e], r[e]))
                      : (i[e] = r[e]);
                  }),
                  (i.files = (t.files || []).concat(
                    Array.from(
                      e.querySelectorAll("input:not([type=file])")
                    ).map(function (e) {
                      return {
                        source: e.value,
                        options: { type: e.dataset.type },
                      };
                    })
                  )),
                  un(i));
              return (
                e.files &&
                  Array.from(e.files).forEach(function (e) {
                    o.addFile(e);
                  }),
                o.replaceElement(e),
                o
              );
            }
          : un
      ).apply(void 0, arguments);
    }
    function dn(e) {
      var t = {};
      return lt(e, t, yi), t;
    }
    function fn(e, n) {
      return e.replace(/(?:{([a-zA-Z]+)})/g, function (e, t) {
        return n[t];
      });
    }
    function pn(e) {
      var e = new Blob(["(", e.toString(), ")()"], {
          type: "application/javascript",
        }),
        t = URL.createObjectURL(e),
        r = new Worker(t);
      return {
        transfer: function (e, t) {},
        post: function (e, t, n) {
          var i = ge();
          (r.onmessage = function (e) {
            e.data.id === i && t(e.data.message);
          }),
            r.postMessage({ id: i, message: e }, n);
        },
        terminate: function () {
          r.terminate(), URL.revokeObjectURL(t);
        },
      };
    }
    function hn(i) {
      return new Promise(function (e, t) {
        var n = new Image();
        (n.onload = function () {
          e(n);
        }),
          (n.onerror = function (e) {
            t(e);
          }),
          (n.src = i);
      });
    }
    function mn(e) {
      return _i(e, e.name);
    }
    function gn(e) {
      Ei.includes(e) ||
        (Ei.push(e),
        (e = e({
          addFilter: be,
          utils: {
            Type: i,
            forin: D,
            isString: E,
            isFile: I,
            toNaturalFileSize: et,
            replaceInString: fn,
            getExtensionFromFilename: vt,
            getFilenameWithoutExtension: Ue,
            guesstimateMimeType: zt,
            getFileFromBlob: d,
            getFilenameFromURL: De,
            createRoute: t,
            createWorker: pn,
            createView: o,
            createItemAPI: P,
            loadImage: hn,
            copyFile: mn,
            renameFile: _i,
            createBlob: Re,
            applyFilterChain: b,
            text: r,
            getNumericAspectRatioFromString: we,
          },
          views: { fileActionButton: bt },
        }).options),
        Object.assign(s, e));
    }
    function vn() {
      return yn;
    }
    function m() {}
    var yn,
      _n,
      En = {
        buttonAbortItemLoad: { opacity: 0 },
        buttonRetryItemLoad: { opacity: 0 },
        buttonRemoveItem: { opacity: 0 },
        buttonProcessItem: { opacity: 0 },
        buttonAbortItemProcessing: { opacity: 0 },
        buttonRetryItemProcessing: { opacity: 0 },
        buttonRevertItemProcessing: { opacity: 0 },
        loadProgressIndicator: {
          opacity: 0,
          align: function (e) {
            return e.query("GET_STYLE_LOAD_INDICATOR_POSITION");
          },
        },
        processProgressIndicator: {
          opacity: 0,
          align: function (e) {
            return e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
          },
        },
        processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
        info: { translateX: 0, translateY: 0, opacity: 0 },
        status: { translateX: 0, translateY: 0, opacity: 0 },
      },
      bn = {
        buttonRemoveItem: { opacity: 1 },
        buttonProcessItem: { opacity: 1 },
        info: { translateX: f },
        status: { translateX: f },
      },
      g = {
        buttonAbortItemProcessing: { opacity: 1 },
        processProgressIndicator: { opacity: 1 },
        status: { opacity: 1 },
      },
      wn = {
        DID_THROW_ITEM_INVALID: {
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: f },
          status: { translateX: f, opacity: 1 },
        },
        DID_START_ITEM_LOAD: {
          buttonAbortItemLoad: { opacity: 1 },
          loadProgressIndicator: { opacity: 1 },
          status: { opacity: 1 },
        },
        DID_THROW_ITEM_LOAD_ERROR: {
          buttonRetryItemLoad: { opacity: 1 },
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: f },
          status: { opacity: 1 },
        },
        DID_START_ITEM_REMOVE: {
          processProgressIndicator: { opacity: 1, align: Dt },
          info: { translateX: f },
          status: { opacity: 0 },
        },
        DID_THROW_ITEM_REMOVE_ERROR: {
          processProgressIndicator: { opacity: 0, align: Dt },
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: f },
          status: { opacity: 1, translateX: f },
        },
        DID_LOAD_ITEM: bn,
        DID_LOAD_LOCAL_ITEM: {
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: f },
          status: { translateX: f },
        },
        DID_START_ITEM_PROCESSING: g,
        DID_REQUEST_ITEM_PROCESSING: g,
        DID_UPDATE_ITEM_PROCESS_PROGRESS: g,
        DID_COMPLETE_ITEM_PROCESSING: {
          buttonRevertItemProcessing: { opacity: 1 },
          info: { opacity: 1 },
          status: { opacity: 1 },
        },
        DID_THROW_ITEM_PROCESSING_ERROR: {
          buttonRemoveItem: { opacity: 1 },
          buttonRetryItemProcessing: { opacity: 1 },
          status: { opacity: 1 },
          info: { translateX: f },
        },
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
          buttonRevertItemProcessing: { opacity: 1 },
          status: { opacity: 1 },
          info: { opacity: 1 },
        },
        DID_ABORT_ITEM_PROCESSING: {
          buttonRemoveItem: { opacity: 1 },
          buttonProcessItem: { opacity: 1 },
          info: { translateX: f },
          status: { opacity: 1 },
        },
        DID_REVERT_ITEM_PROCESSING: bn,
      },
      Tn = o({
        create: function (e) {
          e = e.root;
          e.element.innerHTML = e.query("GET_ICON_DONE");
        },
        name: "processing-complete-indicator",
        ignoreRect: !0,
        mixins: {
          styles: ["scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            opacity: { type: "tween", duration: 250 },
          },
        },
      }),
      Sn = t({
        DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: function (e) {
          var t = e.root,
            e = e.action;
          t.ref.buttonAbortItemProcessing.label = e.value;
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: function (e) {
          var t = e.root,
            e = e.action;
          t.ref.buttonAbortItemLoad.label = e.value;
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: function (e) {
          var t = e.root,
            e = e.action;
          t.ref.buttonAbortItemRemoval.label = e.value;
        },
        DID_REQUEST_ITEM_PROCESSING: function (e) {
          e = e.root;
          (e.ref.processProgressIndicator.spin = !0),
            (e.ref.processProgressIndicator.progress = 0);
        },
        DID_START_ITEM_LOAD: function (e) {
          e = e.root;
          (e.ref.loadProgressIndicator.spin = !0),
            (e.ref.loadProgressIndicator.progress = 0);
        },
        DID_START_ITEM_REMOVE: function (e) {
          e = e.root;
          (e.ref.processProgressIndicator.spin = !0),
            (e.ref.processProgressIndicator.progress = 0);
        },
        DID_UPDATE_ITEM_LOAD_PROGRESS: function (e) {
          var t = e.root,
            e = e.action;
          (t.ref.loadProgressIndicator.spin = !1),
            (t.ref.loadProgressIndicator.progress = e.progress);
        },
        DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
          var t = e.root,
            e = e.action;
          (t.ref.processProgressIndicator.spin = !1),
            (t.ref.processProgressIndicator.progress = e.progress);
        },
      }),
      In = o({
        create: function (e) {
          var i = e.root,
            e = e.props,
            t = Object.keys(It).reduce(function (e, t) {
              return (e[t] = Object.assign({}, It[t])), e;
            }, {}),
            r = e.id,
            e = i.query("GET_ALLOW_REVERT"),
            n = i.query("GET_ALLOW_REMOVE"),
            o = i.query("GET_ALLOW_PROCESS"),
            s = i.query("GET_INSTANT_UPLOAD"),
            a = i.query("IS_ASYNC"),
            l = i.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN"),
            u =
              (a
                ? o && !e
                  ? (c = function (e) {
                      return !/RevertItemProcessing/.test(e);
                    })
                  : !o && e
                  ? (c = function (e) {
                      return !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
                        e
                      );
                    })
                  : o ||
                    e ||
                    (c = function (e) {
                      return !/Process/.test(e);
                    })
                : (c = function (e) {
                    return !/Process/.test(e);
                  }),
              c ? kt.filter(c) : kt.concat()),
            c =
              (s &&
                e &&
                ((t.RevertItemProcessing.label =
                  "GET_LABEL_BUTTON_REMOVE_ITEM"),
                (t.RevertItemProcessing.icon = "GET_ICON_REMOVE")),
              a &&
                !e &&
                (((c = wn.DID_COMPLETE_ITEM_PROCESSING).info.translateX = At),
                (c.info.translateY = xt),
                (c.status.translateY = xt),
                (c.processingCompleteIndicator = {
                  opacity: 1,
                  scaleX: 1,
                  scaleY: 1,
                })),
              a &&
                !o &&
                ([
                  "DID_START_ITEM_PROCESSING",
                  "DID_REQUEST_ITEM_PROCESSING",
                  "DID_UPDATE_ITEM_PROCESS_PROGRESS",
                  "DID_THROW_ITEM_PROCESSING_ERROR",
                ].forEach(function (e) {
                  wn[e].status.translateY = xt;
                }),
                (wn.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Ct)),
              l &&
                e &&
                ((t.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION"),
                ((s = wn.DID_COMPLETE_ITEM_PROCESSING).info.translateX = f),
                (s.status.translateY = xt),
                (s.processingCompleteIndicator = {
                  opacity: 1,
                  scaleX: 1,
                  scaleY: 1,
                })),
              n || (t.RemoveItem.disabled = !0),
              D(t, function (e, t) {
                var n = i.createChildView(bt, {
                  label: i.query(t.label),
                  icon: i.query(t.icon),
                  opacity: 0,
                });
                u.includes(e) && i.appendChildView(n),
                  t.disabled &&
                    (n.element.setAttribute("disabled", "disabled"),
                    n.element.setAttribute("hidden", "hidden")),
                  (n.element.dataset.align = i.query("GET_STYLE_" + t.align)),
                  n.element.classList.add(t.className),
                  n.on("click", function (e) {
                    e.stopPropagation(),
                      t.disabled || i.dispatch(t.action, { query: r });
                  }),
                  (i.ref["button" + e] = n);
              }),
              (i.ref.processingCompleteIndicator = i.appendChildView(
                i.createChildView(Tn)
              )),
              (i.ref.processingCompleteIndicator.element.dataset.align =
                i.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION")),
              (i.ref.info = i.appendChildView(
                i.createChildView(Tt, { id: r })
              )),
              (i.ref.status = i.appendChildView(
                i.createChildView(St, { id: r })
              )),
              i.appendChildView(
                i.createChildView(Et, {
                  opacity: 0,
                  align: i.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
                })
              )),
            a =
              (c.element.classList.add("filepond--load-indicator"),
              (i.ref.loadProgressIndicator = c),
              i.appendChildView(
                i.createChildView(Et, {
                  opacity: 0,
                  align: i.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
                })
              ));
          a.element.classList.add("filepond--process-indicator"),
            (i.ref.processProgressIndicator = a),
            (i.ref.activeStyles = []);
        },
        write: function (e) {
          var r,
            o = e.root,
            t = e.actions,
            e = e.props,
            e =
              (Sn({ root: o, actions: t, props: e }),
              t
                .concat()
                .filter(function (e) {
                  return /^DID_/.test(e.type);
                })
                .reverse()
                .find(function (e) {
                  return wn[e.type];
                }));
          e &&
            ((o.ref.activeStyles = []),
            (r = wn[e.type]),
            D(En, function (n, e) {
              var i = o.ref[n];
              D(e, function (e, t) {
                t = r[n] && void 0 !== r[n][e] ? r[n][e] : t;
                o.ref.activeStyles.push({ control: i, key: e, value: t });
              });
            })),
            o.ref.activeStyles.forEach(function (e) {
              var t = e.control,
                n = e.key,
                e = e.value;
              t[n] = "function" == typeof e ? e(o) : e;
            });
        },
        didCreateView: function (e) {
          T("CREATE_VIEW", Object.assign({}, e, { view: e }));
        },
        name: "file",
      }),
      kn = o({
        create: function (e) {
          var t = e.root,
            e = e.props;
          (t.ref.fileName = u("legend")),
            t.appendChild(t.ref.fileName),
            (t.ref.file = t.appendChildView(
              t.createChildView(In, { id: e.id })
            )),
            (t.ref.data = !1);
        },
        ignoreRect: !0,
        write: t({
          DID_LOAD_ITEM: function (e) {
            var t = e.root,
              e = e.props;
            r(t.ref.fileName, t.query("GET_ITEM_NAME", e.id));
          },
        }),
        didCreateView: function (e) {
          T("CREATE_VIEW", Object.assign({}, e, { view: e }));
        },
        tag: "fieldset",
        name: "file-wrapper",
      }),
      Cn = { type: "spring", damping: 0.6, mass: 7 },
      xn = o({
        name: "panel",
        read: function (e) {
          var t = e.root;
          return (e.props.heightCurrent = t.ref.bottom.translateY);
        },
        write: function (e) {
          var t,
            n,
            i = e.root,
            e = e.props;
          (null !== i.ref.scalable && e.scalable === i.ref.scalable) ||
            ((i.ref.scalable = !z(e.scalable) || e.scalable),
            (i.element.dataset.scalable = i.ref.scalable)),
            e.height &&
              ((t = i.ref.top.rect.element),
              (n = i.ref.bottom.rect.element),
              (e = Math.max(t.height + n.height, e.height)),
              (i.ref.center.translateY = t.height),
              (i.ref.center.scaleY = (e - t.height - n.height) / 100),
              (i.ref.bottom.translateY = e - n.height));
        },
        create: function (e) {
          var i = e.root,
            r = e.props;
          [
            { name: "top" },
            {
              name: "center",
              props: { translateY: null, scaleY: null },
              mixins: {
                animations: { scaleY: Cn },
                styles: ["translateY", "scaleY"],
              },
            },
            {
              name: "bottom",
              props: { translateY: null },
              mixins: {
                animations: { translateY: Cn },
                styles: ["translateY"],
              },
            },
          ].forEach(function (e) {
            var t = i,
              n = r.name;
            (n = o({
              name: "panel-" + e.name + " filepond--" + n,
              mixins: e.mixins,
              ignoreRectUpdate: !0,
            })),
              (n = t.createChildView(n, e.props)),
              (t.ref[e.name] = t.appendChildView(n));
          }),
            i.element.classList.add("filepond--" + r.name),
            (i.ref.scalable = null);
        },
        ignoreRect: !0,
        mixins: { apis: ["height", "heightCurrent", "scalable"] },
      }),
      g = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 },
      An = {
        DID_START_ITEM_LOAD: "busy",
        DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
        DID_THROW_ITEM_INVALID: "load-invalid",
        DID_THROW_ITEM_LOAD_ERROR: "load-error",
        DID_LOAD_ITEM: "idle",
        DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
        DID_START_ITEM_REMOVE: "busy",
        DID_START_ITEM_PROCESSING: "busy processing",
        DID_REQUEST_ITEM_PROCESSING: "busy processing",
        DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
        DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
        DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
        DID_ABORT_ITEM_PROCESSING: "cancelled",
        DID_REVERT_ITEM_PROCESSING: "idle",
      },
      Dn = t({
        DID_UPDATE_PANEL_HEIGHT: function (e) {
          var t = e.root,
            e = e.action;
          t.height = e.height;
        },
      }),
      bn = t(
        {
          DID_GRAB_ITEM: function (e) {
            var t = e.root;
            e.props.dragOrigin = { x: t.translateX, y: t.translateY };
          },
          DID_DRAG_ITEM: function (e) {
            e.root.element.dataset.dragState = "drag";
          },
          DID_DROP_ITEM: function (e) {
            var t = e.root,
              e = e.props;
            (e.dragOffset = null),
              (e.dragOrigin = null),
              (t.element.dataset.dragState = "drop");
          },
        },
        function (e) {
          var t = e.root,
            n = e.actions,
            i = e.props,
            e = e.shouldOptimize,
            r =
              ("drop" === t.element.dataset.dragState &&
                t.scaleX <= 1 &&
                (t.element.dataset.dragState = "idle"),
              n
                .concat()
                .filter(function (e) {
                  return /^DID_/.test(e.type);
                })
                .reverse()
                .find(function (e) {
                  return An[e.type];
                })),
            r =
              (r &&
                r.type !== i.currentState &&
                ((i.currentState = r.type),
                (t.element.dataset.filepondItemState =
                  An[i.currentState] || "")),
              t.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
                t.query("GET_PANEL_ASPECT_RATIO"));
          r
            ? e || (t.height = t.rect.element.width * r)
            : (Dn({ root: t, actions: n, props: i }),
              !t.height &&
                0 < t.ref.container.rect.element.height &&
                (t.height = t.ref.container.rect.element.height)),
            e && (t.ref.panel.height = null),
            (t.ref.panel.height = t.height);
        }
      ),
      On = o({
        create: function (e) {
          var d = e.root,
            f = e.props;
          (d.ref.handleClick = function (e) {
            return d.dispatch("DID_ACTIVATE_ITEM", { id: f.id });
          }),
            (d.element.id = "filepond--item-" + f.id),
            d.element.addEventListener("click", d.ref.handleClick),
            (d.ref.container = d.appendChildView(
              d.createChildView(kn, { id: f.id })
            )),
            (d.ref.panel = d.appendChildView(
              d.createChildView(xn, { name: "item-panel" })
            )),
            (d.ref.panel.height = null),
            (f.markedForRemoval = !1),
            d.query("GET_ALLOW_REORDER") &&
              ((d.element.dataset.dragState = "idle"),
              d.element.addEventListener("pointerdown", function (e) {
                var t, n, i, r, o, s, a, l, u, c;
                e.isPrimary &&
                  ((t = !1),
                  (n = e.pageX),
                  (i = e.pageY),
                  (f.dragOrigin = { x: d.translateX, y: d.translateY }),
                  (f.dragCenter = { x: e.offsetX, y: e.offsetY }),
                  (e = d.query("GET_ACTIVE_ITEMS")),
                  (r = e.map(function (e) {
                    return e.id;
                  })),
                  (o = void 0),
                  (s = {
                    setIndex: function (e) {
                      o = e;
                    },
                    getIndex: function () {
                      return o;
                    },
                    getItemIndex: function (e) {
                      return r.indexOf(e.id);
                    },
                  }),
                  d.dispatch("DID_GRAB_ITEM", { id: f.id, dragState: s }),
                  (a = function (e) {
                    e.isPrimary &&
                      (e.stopPropagation(),
                      e.preventDefault(),
                      (f.dragOffset = { x: e.pageX - n, y: e.pageY - i }),
                      16 <
                        f.dragOffset.x * f.dragOffset.x +
                          f.dragOffset.y * f.dragOffset.y &&
                        !t &&
                        ((t = !0),
                        d.element.removeEventListener(
                          "click",
                          d.ref.handleClick
                        )),
                      d.dispatch("DID_DRAG_ITEM", { id: f.id, dragState: s }));
                  }),
                  (l = function (e) {
                    e.isPrimary &&
                      ((f.dragOffset = { x: e.pageX - n, y: e.pageY - i }),
                      c());
                  }),
                  (u = function () {
                    c();
                  }),
                  (c = function () {
                    document.removeEventListener("pointercancel", u),
                      document.removeEventListener("pointermove", a),
                      document.removeEventListener("pointerup", l),
                      d.dispatch("DID_DROP_ITEM", { id: f.id, dragState: s }),
                      t &&
                        setTimeout(function () {
                          return d.element.addEventListener(
                            "click",
                            d.ref.handleClick
                          );
                        }, 0);
                  }),
                  document.addEventListener("pointercancel", u),
                  document.addEventListener("pointermove", a),
                  document.addEventListener("pointerup", l));
              }));
        },
        write: bn,
        destroy: function (e) {
          var t = e.root,
            e = e.props;
          t.element.removeEventListener("click", t.ref.handleClick),
            t.dispatch("RELEASE_ITEM", { query: e.id });
        },
        tag: "li",
        name: "item",
        mixins: {
          apis: [
            "id",
            "interactionMethod",
            "markedForRemoval",
            "spawnDate",
            "dragCenter",
            "dragOrigin",
            "dragOffset",
          ],
          styles: [
            "translateX",
            "translateY",
            "scaleX",
            "scaleY",
            "opacity",
            "height",
          ],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: g,
            translateY: g,
            opacity: { type: "tween", duration: 150 },
          },
        },
      }),
      Rn = function (e, t, n) {
        if (n) {
          var e = e.rect.element.width,
            i = t.length,
            r = null;
          if (0 === i || n.top < t[0].rect.element.top) return -1;
          var o = t[0].rect.element,
            s = o.marginLeft + o.marginRight,
            a = o.width + s,
            l = Ot(e, a);
          if (1 === l) {
            for (var u = 0; u < i; u++) {
              var c = t[u],
                c = c.rect.outer.top + 0.5 * c.rect.element.height;
              if (n.top < c) return u;
            }
            return i;
          }
          for (
            var s = o.marginTop + o.marginBottom, d = o.height + s, f = 0;
            f < i;
            f++
          ) {
            var p = (f % l) * a,
              h = Math.floor(f / l) * d,
              m = h - o.marginTop,
              h = h + d + o.marginBottom;
            if (n.top < h && n.top > m) {
              if (n.left < p + a) return f;
              r = f !== i - 1 ? f : null;
            }
          }
          return null !== r ? r : i;
        }
      },
      Pn = {
        height: 0,
        width: 0,
        get getHeight() {
          return this.height;
        },
        set setHeight(e) {
          (0 !== this.height && 0 !== e) || (this.height = e);
        },
        get getWidth() {
          return this.width;
        },
        set setWidth(e) {
          (0 !== this.width && 0 !== e) || (this.width = e);
        },
        setDimensions: function (e, t) {
          (0 !== this.height && 0 !== e) || (this.height = e),
            (0 !== this.width && 0 !== t) || (this.width = t);
        },
      },
      Mn = t({
        DID_ADD_ITEM: function (e) {
          var t,
            n,
            i = e.root,
            e = e.action,
            r = e.id,
            o = e.index,
            e = e.interactionMethod,
            s = ((i.ref.addIndex = o), Date.now()),
            a = s,
            l = 1;
          e !== me &&
            ((l = 0),
            (t = i.query("GET_ITEM_INSERT_INTERVAL")),
            (a = (n = s - i.ref.lastItemSpanwDate) < t ? s + (t - n) : s)),
            (i.ref.lastItemSpanwDate = a),
            i.appendChildView(
              i.createChildView(On, {
                spawnDate: a,
                id: r,
                opacity: l,
                interactionMethod: e,
              }),
              o
            );
        },
        DID_REMOVE_ITEM: function (e) {
          var t = e.root,
            n = e.action.id,
            e = t.childViews.find(function (e) {
              return e.id === n;
            });
          e &&
            ((e.scaleX = 0.9),
            (e.scaleY = 0.9),
            (e.opacity = 0),
            (e.markedForRemoval = !0));
        },
        DID_DRAG_ITEM: function (e) {
          var t,
            d,
            n,
            i,
            f = e.root,
            e = e.action,
            r = e.id,
            e = e.dragState,
            o = f.query("GET_ITEM", { id: r }),
            p = f.childViews.find(function (e) {
              return e.id === r;
            }),
            s = f.childViews.length,
            a = e.getItemIndex(o);
          p &&
            ((t = p.dragOrigin.x + p.dragOffset.x + p.dragCenter.x),
            (d = p.dragOrigin.y + p.dragOffset.y + p.dragCenter.y),
            (o = Pt(p)),
            (i =
              p.rect.element.width +
              0.5 * p.rect.element.marginLeft +
              0.5 * p.rect.element.marginRight),
            s < (n = Math.floor(f.rect.outer.width / i)) && (n = s),
            (s = Math.floor(s / n + 1)),
            (Pn.setHeight = o * s),
            (Pn.setWidth = i * n),
            (s = {
              y: Math.floor(d / o),
              x: Math.floor(t / i),
              getGridIndex: function () {
                return d > Pn.getHeight || d < 0 || t > Pn.getWidth || t < 0
                  ? a
                  : this.y * n + this.x;
              },
              getColIndex: function () {
                for (
                  var e,
                    t,
                    n = f.query("GET_ACTIVE_ITEMS"),
                    i = f.childViews.filter(function (e) {
                      return e.rect.element.height;
                    }),
                    r = n.map(function (t) {
                      return i.find(function (e) {
                        return e.id === t.id;
                      });
                    }),
                    o = r.findIndex(function (e) {
                      return e === p;
                    }),
                    s = Pt(p),
                    a = r.length,
                    l = a,
                    u = 0,
                    c = 0;
                  c < a;
                  c++
                )
                  if (((e = Pt(r[c])), d < (u = (t = u) + e))) {
                    if (c < o) {
                      if (d < t + s) {
                        l = c;
                        break;
                      }
                      continue;
                    }
                    l = c;
                    break;
                  }
                return l;
              },
            }),
            (o = 1 < n ? s.getGridIndex() : s.getColIndex()),
            f.dispatch("MOVE_ITEM", { query: p, index: o }),
            (void 0 !== (i = e.getIndex()) && i === o) ||
              (e.setIndex(o),
              void 0 !== i &&
                f.dispatch("DID_REORDER_ITEMS", {
                  items: f.query("GET_ACTIVE_ITEMS"),
                  origin: a,
                  target: o,
                })));
        },
      }),
      Ln = o({
        create: function (e) {
          e = e.root;
          l(e.element, "role", "list"), (e.ref.lastItemSpanwDate = Date.now());
        },
        write: function (e) {
          var n,
            o,
            s,
            a,
            i,
            r,
            l,
            u,
            t = e.root,
            c = e.props,
            d = e.actions,
            f = e.shouldOptimize,
            e = (Mn({ root: t, props: c, actions: d }), c.dragCoordinates),
            d = t.rect.element.width,
            p = t.childViews.filter(function (e) {
              return e.rect.element.height;
            }),
            c = t
              .query("GET_ACTIVE_ITEMS")
              .map(function (t) {
                return p.find(function (e) {
                  return e.id === t.id;
                });
              })
              .filter(function (e) {
                return e;
              }),
            h = e ? Rn(t, c, e) : null,
            m = t.ref.addIndex || null,
            g = ((t.ref.addIndex = null), 0),
            v = 0,
            y = 0;
          0 !== c.length &&
            ((e = c[0].rect.element),
            (n = e.marginTop + e.marginBottom),
            (t = e.marginLeft + e.marginRight),
            (o = e.width + t),
            (s = e.height + n),
            1 === (a = Ot(d, o))
              ? ((r = i = 0),
                c.forEach(function (e, t) {
                  h &&
                    (r =
                      -2 == (t = t - h)
                        ? 0.25 * -n
                        : -1 == t
                        ? 0.75 * -n
                        : 0 == t
                        ? 0.75 * n
                        : 1 == t
                        ? 0.25 * n
                        : 0),
                    f && ((e.translateX = null), (e.translateY = null)),
                    e.markedForRemoval || Rt(e, 0, i + r);
                  t =
                    (e.rect.element.height + n) *
                    (e.markedForRemoval ? e.opacity : 1);
                  i += t;
                }))
              : ((u = l = 0),
                c.forEach(function (e, t) {
                  t === h && (g = 1),
                    t === m && (y += 1),
                    e.markedForRemoval && e.opacity < 0.5 && --v;
                  var t = t + y + g + v,
                    n = t % a,
                    t = Math.floor(t / a),
                    n = n * o,
                    t = t * s,
                    i = Math.sign(n - l),
                    r = Math.sign(t - u);
                  (l = n),
                    (u = t),
                    e.markedForRemoval ||
                      (f && ((e.translateX = null), (e.translateY = null)),
                      Rt(e, n, t, i, r));
                })));
        },
        tag: "ul",
        name: "list",
        didWriteView: function (e) {
          var t = e.root;
          t.childViews
            .filter(function (e) {
              return e.markedForRemoval && 0 === e.opacity && e.resting;
            })
            .forEach(function (e) {
              e._destroy(), t.removeChildView(e);
            });
        },
        filterFrameActionsForChild: function (t, e) {
          return e.filter(function (e) {
            return !e.data || !e.data.id || t.id === e.data.id;
          });
        },
        mixins: { apis: ["dragCoordinates"] },
      }),
      Fn = t({
        DID_DRAG: function (e) {
          var t = e.root,
            n = e.props,
            e = e.action;
          t.query("GET_ITEM_INSERT_LOCATION_FREEDOM") &&
            (n.dragCoordinates = {
              left: e.position.scopeLeft - t.ref.list.rect.element.left,
              top:
                e.position.scopeTop -
                (t.rect.outer.top +
                  t.rect.element.marginTop +
                  t.rect.element.scrollTop),
            });
        },
        DID_END_DRAG: function (e) {
          e.props.dragCoordinates = null;
        },
      }),
      Nn = o({
        create: function (e) {
          var t = e.root,
            e = e.props;
          (t.ref.list = t.appendChildView(t.createChildView(Ln))),
            (e.dragCoordinates = null),
            (e.overflowing = !1);
        },
        write: function (e) {
          var t = e.root,
            n = e.props,
            e = e.actions;
          Fn({ root: t, props: n, actions: e }),
            (t.ref.list.dragCoordinates = n.dragCoordinates),
            n.overflowing &&
              !n.overflow &&
              ((n.overflowing = !1),
              (t.element.dataset.state = ""),
              (t.height = null)),
            n.overflow &&
              (e = Math.round(n.overflow)) !== t.height &&
              ((n.overflowing = !0),
              (t.element.dataset.state = "overflow"),
              (t.height = e));
        },
        name: "list-scroller",
        mixins: {
          apis: ["overflow", "dragCoordinates"],
          styles: ["height", "translateY"],
          animations: { translateY: "spring" },
        },
      }),
      jn = o({
        tag: "input",
        name: "browser",
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        attributes: { type: "file" },
        create: function (e) {
          var o = e.root,
            s = e.props;
          (o.element.id = "filepond--browser-" + s.id),
            l(o.element, "name", o.query("GET_NAME")),
            l(o.element, "aria-controls", "filepond--assistant-" + s.id),
            l(o.element, "aria-labelledby", "filepond--drop-label-" + s.id),
            Mt({
              root: o,
              action: { value: o.query("GET_ACCEPTED_FILE_TYPES") },
            }),
            Lt({ root: o, action: { value: o.query("GET_ALLOW_MULTIPLE") } }),
            Ft({
              root: o,
              action: { value: o.query("GET_ALLOW_DIRECTORIES_ONLY") },
            }),
            Nt({ root: o }),
            jt({ root: o, action: { value: o.query("GET_REQUIRED") } }),
            $t({ root: o, action: { value: o.query("GET_CAPTURE_METHOD") } }),
            (o.ref.handleChange = function (e) {
              var r;
              o.element.value &&
                ((r = Array.from(o.element.files).map(function (e) {
                  return (e._relativePath = e.webkitRelativePath), e;
                })),
                setTimeout(function () {
                  s.onload(r);
                  var e,
                    t,
                    n,
                    i = o.element;
                  if (i && "" !== i.value) {
                    try {
                      i.value = "";
                    } catch (i) {}
                    i.value &&
                      ((e = u("form")),
                      (t = i.parentNode),
                      (n = i.nextSibling),
                      e.appendChild(i),
                      e.reset(),
                      n ? t.insertBefore(i, n) : t.appendChild(i));
                  }
                }, 250));
            }),
            o.element.addEventListener("change", o.ref.handleChange);
        },
        destroy: function (e) {
          e = e.root;
          e.element.removeEventListener("change", e.ref.handleChange);
        },
        write: t({
          DID_LOAD_ITEM: Bt,
          DID_REMOVE_ITEM: Bt,
          DID_THROW_ITEM_INVALID: function (e) {
            e = e.root;
            e.query("GET_CHECK_VALIDITY") &&
              e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
          },
          DID_SET_DISABLED: Nt,
          DID_SET_ALLOW_BROWSE: Nt,
          DID_SET_ALLOW_DIRECTORIES_ONLY: Ft,
          DID_SET_ALLOW_MULTIPLE: Lt,
          DID_SET_ACCEPTED_FILE_TYPES: Mt,
          DID_SET_CAPTURE_METHOD: $t,
          DID_SET_REQUIRED: jt,
        }),
      }),
      $n = o({
        name: "drop-label",
        ignoreRect: !0,
        create: function (e) {
          var t = e.root,
            e = e.props,
            n = u("label");
          l(n, "for", "filepond--browser-" + e.id),
            l(n, "id", "filepond--drop-label-" + e.id),
            l(n, "aria-hidden", "true"),
            (t.ref.handleKeyDown = function (e) {
              (13 !== e.keyCode && 32 !== e.keyCode) ||
                (e.preventDefault(), t.ref.label.click());
            }),
            (t.ref.handleClick = function (e) {
              e.target === n || n.contains(e.target) || t.ref.label.click();
            }),
            n.addEventListener("keydown", t.ref.handleKeyDown),
            t.element.addEventListener("click", t.ref.handleClick),
            Gt(n, e.caption),
            t.appendChild(n),
            (t.ref.label = n);
        },
        destroy: function (e) {
          e = e.root;
          e.ref.label.addEventListener("keydown", e.ref.handleKeyDown),
            e.element.removeEventListener("click", e.ref.handleClick);
        },
        write: t({
          DID_SET_LABEL_IDLE: function (e) {
            var t = e.root,
              e = e.action;
            Gt(t.ref.label, e.value);
          },
        }),
        mixins: {
          styles: ["opacity", "translateX", "translateY"],
          animations: {
            opacity: { type: "tween", duration: 150 },
            translateX: "spring",
            translateY: "spring",
          },
        },
      }),
      Bn = o({
        name: "drip-blob",
        ignoreRect: !0,
        mixins: {
          styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 },
          },
        },
      }),
      Gn = t({
        DID_DRAG: function (e) {
          var t,
            n = e.root,
            e = e.action;
          n.ref.blob
            ? ((n.ref.blob.translateX = e.position.scopeLeft),
              (n.ref.blob.translateY = e.position.scopeTop),
              (n.ref.blob.scaleX = 1),
              (n.ref.blob.scaleY = 1),
              (n.ref.blob.opacity = 1))
            : ((n = 0.5 * (e = { root: n }.root).rect.element.width),
              (t = 0.5 * e.rect.element.height),
              (e.ref.blob = e.appendChildView(
                e.createChildView(Bn, {
                  opacity: 0,
                  scaleX: 2.5,
                  scaleY: 2.5,
                  translateX: n,
                  translateY: t,
                })
              )));
        },
        DID_DROP: function (e) {
          e = e.root;
          e.ref.blob &&
            ((e.ref.blob.scaleX = 2.5),
            (e.ref.blob.scaleY = 2.5),
            (e.ref.blob.opacity = 0));
        },
        DID_END_DRAG: function (e) {
          e = e.root;
          e.ref.blob && (e.ref.blob.opacity = 0);
        },
      }),
      qn = o({
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        name: "drip",
        write: function (e) {
          var t = e.root,
            n = e.props,
            e = e.actions,
            n = (Gn({ root: t, props: n, actions: e }), t.ref.blob);
          0 === e.length &&
            n &&
            0 === n.opacity &&
            (t.removeChildView(n), (t.ref.blob = null));
        },
      }),
      bn = t({
        DID_SET_DISABLED: function (e) {
          e = e.root;
          e.element.disabled = e.query("GET_DISABLED");
        },
        DID_ADD_ITEM: function (e) {
          var t = e.root,
            e = e.action,
            n =
              !(t.query("GET_ITEM", e.id).origin === N.LOCAL) &&
              t.query("SHOULD_UPDATE_FILE_INPUT"),
            i = u("input");
          (i.type = n ? "file" : "hidden"),
            (i.name = t.query("GET_NAME")),
            (i.disabled = t.query("GET_DISABLED")),
            (t.ref.fields[e.id] = i),
            Vt(t);
        },
        DID_LOAD_ITEM: function (e) {
          var t = e.root,
            e = e.action,
            n = Ut(t, e.id);
          n &&
            (null !== e.serverFileReference &&
              (n.value = e.serverFileReference),
            t.query("SHOULD_UPDATE_FILE_INPUT")) &&
            ((t = t.query("GET_ITEM", e.id)), qt(n, [t.file]));
        },
        DID_REMOVE_ITEM: function (e) {
          var t = e.root,
            e = e.action,
            n = Ut(t, e.id);
          n &&
            (n.parentNode && n.parentNode.removeChild(n),
            delete t.ref.fields[e.id]);
        },
        DID_DEFINE_VALUE: function (e) {
          var t = e.root,
            e = e.action,
            n = Ut(t, e.id);
          n &&
            (null === e.value
              ? n.removeAttribute("value")
              : "file" != n.type && (n.value = e.value),
            Vt(t));
        },
        DID_PREPARE_OUTPUT: function (e) {
          var t = e.root,
            n = e.action;
          t.query("SHOULD_UPDATE_FILE_INPUT") &&
            setTimeout(function () {
              var e = Ut(t, n.id);
              e && qt(e, [n.file]);
            }, 0);
        },
        DID_REORDER_ITEMS: Ht,
        DID_SORT_ITEMS: Ht,
      }),
      Un = o({
        tag: "fieldset",
        name: "data",
        create: function (e) {
          return (e.root.ref.fields = {});
        },
        write: bn,
        ignoreRect: !0,
      }),
      Vn = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"],
      Hn = ["css", "csv", "html", "txt"],
      zn = { zip: "zip|compressed", epub: "application/epub+zip" },
      Wn = function (e) {
        if (Zn(e)) {
          var t = Kn(e);
          if (t) return t.isFile || t.isDirectory;
        }
        return "file" === e.kind;
      },
      Yn = function (r) {
        return new Promise(function (e, t) {
          var n, i;
          Zn((i = r)) && (Kn(i) || {}).isDirectory
            ? ((n = Kn(r)),
              new Promise(function (e, r) {
                function o() {
                  0 === l && 0 === a && e(s);
                }
                var s = [],
                  a = 0,
                  l = 0;
                !(function n(e) {
                  a++;
                  var i = e.createReader();
                  !(function t() {
                    i.readEntries(function (e) {
                      if (0 === e.length) return a--, void o();
                      e.forEach(function (t) {
                        t.isDirectory
                          ? n(t)
                          : (l++,
                            t.file(function (e) {
                              e = Xn(e);
                              t.fullPath && (e._relativePath = t.fullPath),
                                s.push(e),
                                l--,
                                o();
                            }));
                      }),
                        t();
                    }, r);
                  })();
                })(n);
              })
                .then(e)
                .catch(t))
            : e([r.getAsFile()]);
        });
      },
      Xn = function (e) {
        if (e.type.length) return e;
        var t = e.lastModifiedDate,
          n = e.name,
          i = zt(vt(e.name));
        return (
          i.length &&
            (((e = e.slice(0, e.size, i)).name = n), (e.lastModifiedDate = t)),
          e
        );
      },
      Zn = function (e) {
        return "webkitGetAsEntry" in e;
      },
      Kn = function (e) {
        return e.webkitGetAsEntry();
      },
      Jn = function (e) {
        e = e.getData("url");
        return "string" == typeof e && e.length ? [e] : [];
      },
      Qn = function (e) {
        e = e.getData("text/html");
        if ("string" == typeof e && e.length) {
          e = e.match(/src\s*=\s*"(.+?)"/);
          if (e) return [e[1]];
        }
        return [];
      },
      ei = [],
      ti = function (t) {
        var e = ei.find(function (e) {
          return e.element === t;
        });
        if (e) return e;
        (n = t),
          (i = []),
          (o = {}),
          D(
            (r = { dragenter: ii, dragover: ri, dragleave: si, drop: oi }),
            function (e, t) {
              (o[e] = t(n, i)), n.addEventListener(e, o[e], !1);
            }
          );
        var n,
          i,
          r,
          o,
          s,
          e = (s = {
            element: n,
            addListener: function (e) {
              return (
                i.push(e),
                function () {
                  i.splice(i.indexOf(e), 1),
                    0 === i.length &&
                      (ei.splice(ei.indexOf(s), 1),
                      D(r, function (e) {
                        n.removeEventListener(e, o[e], !1);
                      }));
                }
              );
            },
          });
        return ei.push(e), e;
      },
      ni = null,
      ii = function (e, t) {
        return function (i) {
          i.preventDefault(),
            (ni = i.target),
            t.forEach(function (e) {
              var t = e.element,
                n = e.onenter;
              Yt(i, t) && ((e.state = "enter"), n(h(i)));
            });
        };
      },
      ri = function (e, t) {
        return function (u) {
          u.preventDefault();
          var c = u.dataTransfer;
          Wt(c).then(function (a) {
            var l = !1;
            t.some(function (e) {
              var t = e.filterElement,
                n = e.element,
                i = e.onenter,
                r = e.onexit,
                o = e.ondrag,
                s = e.allowdrop,
                s = (Xt(c, "copy"), s(a));
              if (s)
                if (Yt(u, n)) {
                  if (((l = !0), null === e.state))
                    return (e.state = "enter"), void i(h(u));
                  ((e.state = "over"), t && !s) ? Xt(c, "none") : o(h(u));
                } else
                  t && !l && Xt(c, "none"),
                    e.state && ((e.state = null), r(h(u)));
              else Xt(c, "none");
            });
          });
        };
      },
      oi = function (e, t) {
        return function (a) {
          a.preventDefault();
          var e = a.dataTransfer;
          Wt(e).then(function (s) {
            t.forEach(function (e) {
              var t = e.filterElement,
                n = e.element,
                i = e.ondrop,
                r = e.onexit,
                o = e.allowdrop;
              if (((e.state = null), !t || Yt(a, n)))
                return o(s) ? void i(h(a), s) : r(h(a));
            });
          });
        };
      },
      si = function (e, t) {
        return function (n) {
          ni === n.target &&
            t.forEach(function (e) {
              var t = e.onexit;
              (e.state = null), t(h(n));
            });
        };
      },
      ai = !1,
      li = [],
      ui = function (e) {
        var t = document.activeElement;
        if (t && /textarea|input/i.test(t.nodeName)) {
          for (var n = !1, i = t; i !== document.body; ) {
            if (i.classList.contains("filepond--root")) {
              n = !0;
              break;
            }
            i = i.parentNode;
          }
          if (!n) return;
        }
        Wt(e.clipboardData).then(function (t) {
          t.length &&
            li.forEach(function (e) {
              return e(t);
            });
        });
      },
      ci = null,
      di = null,
      fi = [],
      pi = o({
        create: function (e) {
          var t = e.root,
            e = e.props;
          (t.element.id = "filepond--assistant-" + e.id),
            l(t.element, "role", "status"),
            l(t.element, "aria-live", "polite"),
            l(t.element, "aria-relevant", "additions");
        },
        ignoreRect: !0,
        ignoreRectUpdate: !0,
        write: t({
          DID_LOAD_ITEM: function (e) {
            var t = e.root,
              e = e.action;
            Qt(t) &&
              ((t.element.textContent = ""),
              (e = t.query("GET_ITEM", e.id)),
              fi.push(e.filename),
              clearTimeout(ci),
              (ci = setTimeout(function () {
                Jt(t, fi.join(", "), t.query("GET_LABEL_FILE_ADDED")),
                  (fi.length = 0);
              }, 750)));
          },
          DID_REMOVE_ITEM: function (e) {
            var t = e.root,
              e = e.action;
            Qt(t) &&
              ((e = e.item),
              Jt(t, e.filename, t.query("GET_LABEL_FILE_REMOVED")));
          },
          DID_COMPLETE_ITEM_PROCESSING: function (e) {
            var t = e.root,
              e = e.action,
              e = t.query("GET_ITEM", e.id).filename,
              n = t.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
            Kt(t, e + " " + n);
          },
          DID_ABORT_ITEM_PROCESSING: en,
          DID_REVERT_ITEM_PROCESSING: en,
          DID_THROW_ITEM_REMOVE_ERROR: tn,
          DID_THROW_ITEM_LOAD_ERROR: tn,
          DID_THROW_ITEM_INVALID: tn,
          DID_THROW_ITEM_PROCESSING_ERROR: tn,
        }),
        tag: "span",
        name: "assistant",
      }),
      hi = function (e) {
        return e.replace(
          new RegExp(
            (1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : "-") + ".",
            "g"
          ),
          function (e) {
            return e.charAt(1).toUpperCase();
          }
        );
      },
      mi = t({
        DID_SET_ALLOW_BROWSE: function (e) {
          var t = e.root,
            e = e.props;
          an(t, e);
        },
        DID_SET_ALLOW_DROP: function (e) {
          e = e.root;
          sn(e);
        },
        DID_SET_ALLOW_PASTE: function (e) {
          e = e.root;
          ln(e);
        },
        DID_SET_DISABLED: function (e) {
          var t = e.root,
            e = e.props;
          sn(t),
            ln(t),
            an(t, e),
            t.query("GET_DISABLED")
              ? (t.element.dataset.disabled = "disabled")
              : t.element.removeAttribute("data-disabled");
        },
      }),
      gi = o({
        name: "root",
        read: function (e) {
          e = e.root;
          e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
        },
        create: function (e) {
          var n = e.root,
            e = e.props,
            t = n.query("GET_ID"),
            t = (t && (n.element.id = t), n.query("GET_CLASS_NAME")),
            t =
              (t &&
                t
                  .split(" ")
                  .filter(function (e) {
                    return e.length;
                  })
                  .forEach(function (e) {
                    n.element.classList.add(e);
                  }),
              (n.ref.label = n.appendChildView(
                n.createChildView(
                  $n,
                  Object.assign({}, e, {
                    translateY: null,
                    caption: n.query("GET_LABEL_IDLE"),
                  })
                )
              )),
              (n.ref.list = n.appendChildView(
                n.createChildView(Nn, { translateY: null })
              )),
              (n.ref.panel = n.appendChildView(
                n.createChildView(xn, { name: "panel-root" })
              )),
              (n.ref.assistant = n.appendChildView(
                n.createChildView(pi, Object.assign({}, e))
              )),
              (n.ref.data = n.appendChildView(
                n.createChildView(Un, Object.assign({}, e))
              )),
              (n.ref.measure = u("div")),
              (n.ref.measure.style.height = "100%"),
              n.element.appendChild(n.ref.measure),
              (n.ref.bounds = null),
              n
                .query("GET_STYLES")
                .filter(function (e) {
                  return !w(e.value);
                })
                .map(function (e) {
                  var t = e.name,
                    e = e.value;
                  n.element.dataset[t] = e;
                }),
              (n.ref.widthPrevious = null),
              (n.ref.widthUpdated = nn(function () {
                (n.ref.updateHistory = []), n.dispatch("DID_RESIZE_ROOT");
              }, 250)),
              (n.ref.previousAspectRatio = null),
              (n.ref.updateHistory = []),
              window.matchMedia("(pointer: fine) and (hover: hover)").matches),
            e = "PointerEvent" in window,
            e =
              (n.query("GET_ALLOW_REORDER") &&
                e &&
                !t &&
                (n.element.addEventListener("touchmove", rn, { passive: !1 }),
                n.element.addEventListener("gesturestart", rn)),
              n.query("GET_CREDITS"));
          2 === e.length &&
            (((t = document.createElement("a")).className =
              "filepond--credits"),
            t.setAttribute("aria-hidden", "true"),
            (t.href = e[0]),
            (t.tabindex = -1),
            (t.target = "_blank"),
            (t.rel = "noopener noreferrer"),
            (t.textContent = e[1]),
            n.element.appendChild(t),
            (n.ref.credits = t));
        },
        write: function (e) {
          var n = e.root,
            t = e.props,
            e = e.actions;
          if (
            (mi({ root: n, props: t, actions: e }),
            e
              .filter(function (e) {
                return /^DID_SET_STYLE_/.test(e.type);
              })
              .filter(function (e) {
                return !w(e.data.value);
              })
              .map(function (e) {
                var t = e.type,
                  e = e.data,
                  t = hi(t.substring(8).toLowerCase(), "_");
                (n.element.dataset[t] = e.value), n.invalidateLayout();
              }),
            !n.rect.element.hidden)
          ) {
            n.rect.element.width !== n.ref.widthPrevious &&
              ((n.ref.widthPrevious = n.rect.element.width),
              n.ref.widthUpdated());
            var t = n.ref.bounds,
              i =
                (t ||
                  ((t = n.ref.bounds =
                    ((i = n.ref.measureHeight || null),
                    {
                      cappedHeight: parseInt(n.style.maxHeight, 10) || null,
                      fixedHeight: 0 === i ? null : i,
                    })),
                  n.element.removeChild(n.ref.measure),
                  (n.ref.measure = null)),
                n.ref),
              r = i.hopper,
              o = i.label,
              s = i.list,
              a = i.panel,
              r =
                (r && r.updateHopperState(), n.query("GET_PANEL_ASPECT_RATIO")),
              l = n.query("GET_ALLOW_MULTIPLE"),
              u = n.query("GET_TOTAL_ITEMS"),
              c = u === (l ? n.query("GET_MAX_FILES") || 1e6 : 1),
              e = e.find(function (e) {
                return "DID_ADD_ITEM" === e.type;
              }),
              e =
                (c && e
                  ? ((e = e.data.interactionMethod),
                    (o.opacity = 0),
                    l
                      ? (o.translateY = -40)
                      : e === fe
                      ? (o.translateX = 40)
                      : (o.translateY = e === he ? 40 : 30))
                  : c ||
                    ((o.opacity = 1), (o.translateX = 0), (o.translateY = 0)),
                (function (e) {
                  e = e.ref.list.childViews[0].childViews[0];
                  return e
                    ? {
                        top: e.rect.element.marginTop,
                        bottom: e.rect.element.marginBottom,
                      }
                    : { top: 0, bottom: 0 };
                })(n)),
              d = (function (e) {
                var n = 0,
                  i = 0,
                  t = e.ref.list,
                  r = t.childViews[0],
                  o = r.childViews.filter(function (e) {
                    return e.rect.element.height;
                  }),
                  e = e
                    .query("GET_ACTIVE_ITEMS")
                    .map(function (t) {
                      return o.find(function (e) {
                        return e.id === t.id;
                      });
                    })
                    .filter(function (e) {
                      return e;
                    });
                if (0 === e.length) return { visual: n, bounds: i };
                var s = r.rect.element.width,
                  r = Rn(r, e, t.dragCoordinates),
                  t = e[0].rect.element,
                  a = t.marginTop + t.marginBottom,
                  l = t.marginLeft + t.marginRight,
                  l = t.width + l,
                  t = t.height + a,
                  r = void 0 !== r && 0 <= r ? 1 : 0,
                  u = e.find(function (e) {
                    return e.markedForRemoval && e.opacity < 0.45;
                  })
                    ? -1
                    : 0,
                  r = e.length + r + u,
                  u = Ot(s, l);
                return (
                  1 === u
                    ? e.forEach(function (e) {
                        var t = e.rect.element.height + a;
                        (i += t), (n += t * e.opacity);
                      })
                    : ((i = Math.ceil(r / u) * t), (n = i)),
                  { visual: n, bounds: i }
                );
              })(n),
              o = o.rect.element.height,
              l = !l || c ? 0 : o,
              f = c ? s.rect.element.marginTop : 0,
              p = 0 === u ? 0 : s.rect.element.marginBottom,
              h = l + f + d.visual + p,
              m = l + f + d.bounds + p;
            if (
              ((s.translateY =
                Math.max(0, l - s.rect.element.marginTop) - e.top),
              r)
            ) {
              var g = n.rect.element.width,
                v = g * r,
                y =
                  (r !== n.ref.previousAspectRatio &&
                    ((n.ref.previousAspectRatio = r),
                    (n.ref.updateHistory = [])),
                  n.ref.updateHistory);
              if ((y.push(g), 4 < y.length))
                for (var r = y.length, _ = r - 10, E = 0, b = r; _ <= b; b--)
                  if ((y[b] === y[b - 2] && E++, 2 <= E)) return;
              a.scalable = !1;
              var g = (a.height = v) - l - (p - e.bottom) - (c ? f : 0);
              d.visual > g ? (s.overflow = g) : (s.overflow = null),
                (n.height = v);
            } else
              t.fixedHeight
                ? ((a.scalable = !1),
                  (r = t.fixedHeight - l - (p - e.bottom) - (c ? f : 0)),
                  d.visual > r ? (s.overflow = r) : (s.overflow = null))
                : t.cappedHeight
                ? ((g = h >= t.cappedHeight),
                  (v = Math.min(t.cappedHeight, h)),
                  (a.scalable = !0),
                  (a.height = g ? v : v - e.top - e.bottom),
                  (r = v - l - (p - e.bottom) - (c ? f : 0)),
                  h > t.cappedHeight && d.visual > r
                    ? (s.overflow = r)
                    : (s.overflow = null),
                  (n.height = Math.min(t.cappedHeight, m - e.top - e.bottom)))
                : ((g = 0 < u ? e.top + e.bottom : 0),
                  (a.scalable = !0),
                  (a.height = Math.max(o, h - g)),
                  (n.height = Math.max(o, m - g)));
            n.ref.credits &&
              a.heightCurrent &&
              (n.ref.credits.style.transform =
                "translateY(" + a.heightCurrent + "px)");
          }
        },
        destroy: function (e) {
          e = e.root;
          e.ref.paster && e.ref.paster.destroy(),
            e.ref.hopper && e.ref.hopper.destroy(),
            e.element.removeEventListener("touchmove", rn),
            e.element.removeEventListener("gesturestart", rn);
        },
        mixins: { styles: ["height"] },
      }),
      vi = function () {
        function e() {
          document.hidden || y.dispatch("KICK");
        }
        function t() {
          (E = E || !0),
            clearTimeout(_),
            (_ = setTimeout(function () {
              (E = !1),
                (T = w = null),
                b && ((b = !1), y.dispatch("DID_STOP_RESIZE"));
            }, 500));
        }
        function n(i) {
          return function (e) {
            var t,
              n = { type: i };
            return (
              e &&
                (e.hasOwnProperty("error") &&
                  (n.error = e.error ? Object.assign({}, e.error) : null),
                e.status && (n.status = Object.assign({}, e.status)),
                e.file && (n.output = e.file),
                e.source
                  ? (n.file = e.source)
                  : (e.item || e.id) &&
                    ((t = e.item || y.query("GET_ITEM", e.id)),
                    (n.file = t ? P(t) : null)),
                e.items && (n.items = e.items.map(P)),
                /progress/.test(i) && (n.progress = e.progress),
                e.hasOwnProperty("origin") &&
                  e.hasOwnProperty("target") &&
                  ((n.origin = e.origin), (n.target = e.target))),
              n
            );
          };
        }
        function i(t) {
          var e = Object.assign({ pond: A }, t),
            n =
              (delete e.type,
              S.element.dispatchEvent(
                new CustomEvent("FilePond:" + t.type, {
                  detail: e,
                  bubbles: !0,
                  cancelable: !0,
                  composed: !0,
                })
              ),
              []),
            i =
              (t.hasOwnProperty("error") && n.push(t.error),
              t.hasOwnProperty("file") && n.push(t.file),
              ["type", "error", "file"]);
          Object.keys(t)
            .filter(function (e) {
              return !i.includes(e);
            })
            .forEach(function (e) {
              return n.push(t[e]);
            }),
            A.fire.apply(A, [t.type].concat(n)),
            (e = y.query("GET_ON" + t.type.toUpperCase())) &&
              e.apply(void 0, n);
        }
        function r(e) {
          return new Promise(function (t, n) {
            y.dispatch("REQUEST_ITEM_PREPARE", {
              query: e,
              success: function (e) {
                t(e);
              },
              failure: function (e) {
                n(e);
              },
            });
          });
        }
        function s(e, t) {
          return (
            "object" != typeof e ||
              (e.file && e.id) ||
              t ||
              ((t = e), (e = void 0)),
            y.dispatch("REMOVE_ITEM", Object.assign({}, t, { query: e })),
            null === y.query("GET_ACTIVE_ITEM", e)
          );
        }
        function o() {
          for (var e = arguments.length, o = new Array(e), t = 0; t < e; t++)
            o[t] = arguments[t];
          return new Promise(function (e, t) {
            var n,
              i = [],
              r = {};
            H(o[0])
              ? (i.push.apply(i, o[0]), Object.assign(r, o[1] || {}))
              : ("object" != typeof (n = o[o.length - 1]) ||
                  n instanceof Blob ||
                  Object.assign(r, o.pop()),
                i.push.apply(i, o)),
              y.dispatch("ADD_ITEMS", {
                items: i,
                index: r.index,
                interactionMethod: fe,
                success: e,
                failure: t,
              });
          });
        }
        function a() {
          return y.query("GET_ACTIVE_ITEMS");
        }
        function l(e) {
          return new Promise(function (t, n) {
            y.dispatch("REQUEST_ITEM_PROCESSING", {
              query: e,
              success: function (e) {
                t(e);
              },
              failure: function (e) {
                n(e);
              },
            });
          });
        }
        var u,
          c,
          d,
          f,
          p,
          h,
          m =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          g = null,
          v = dt(),
          y = (function (e, t, n) {
            function i(e, t, n) {
              !n || document.hidden
                ? (u[e] && u[e](t), s.push({ type: e, data: t }))
                : a.push({ type: e, data: t });
            }
            function r(e) {
              for (
                var t = arguments.length,
                  n = new Array(1 < t ? t - 1 : 0),
                  i = 1;
                i < t;
                i++
              )
                n[i - 1] = arguments[i];
              return l[e] ? l[e].apply(l, n) : null;
            }
            var t = 1 < arguments.length && void 0 !== t ? t : [],
              n = 2 < arguments.length && void 0 !== n ? n : [],
              o = Object.assign({}, e),
              s = [],
              a = [],
              e = {
                getState: function () {
                  return Object.assign({}, o);
                },
                processActionQueue: function () {
                  var e = [].concat(s);
                  return (s.length = 0), e;
                },
                processDispatchQueue: function () {
                  var e = [].concat(a);
                  (a.length = 0),
                    e.forEach(function (e) {
                      var t = e.type,
                        e = e.data;
                      i(t, e);
                    });
                },
                dispatch: i,
                query: r,
              },
              l = {},
              u =
                (t.forEach(function (e) {
                  l = Object.assign({}, e(o), {}, l);
                }),
                {});
            return (
              n.forEach(function (e) {
                u = Object.assign({}, e(i, r, o), {}, u);
              }),
              e
            );
          })(
            {
              items: [],
              listUpdateTimeout: null,
              itemUpdateTimeout: null,
              processingQueue: [],
              options:
                ((f = {}),
                D((d = v), function (e) {
                  var t,
                    n,
                    i,
                    r = d[e];
                  f[e] =
                    ((t = r[0]),
                    (n = r[1]),
                    (i = t),
                    {
                      enumerable: !0,
                      get: function () {
                        return i;
                      },
                      set: function (e) {
                        i = J(e, t, n);
                      },
                    });
                }),
                G(f)),
            },
            [
              Ce,
              function (n) {
                var e = {};
                return (
                  D(c, function (t) {
                    e["GET_" + Q(t, "_").toUpperCase()] = function (e) {
                      return n.options[t];
                    };
                  }),
                  e
                );
              },
            ],
            [
              Je,
              ((u = c = v),
              function (i, e, r) {
                var o = {};
                return (
                  D(u, function (t) {
                    var n = Q(t, "_").toUpperCase();
                    o["SET_" + n] = function (e) {
                      try {
                        r.options[t] = e.value;
                      } catch (e) {}
                      i("DID_SET_" + n, { value: r.options[t] });
                    };
                  }),
                  o
                );
              }),
            ]
          ),
          _ =
            (y.dispatch("SET_OPTIONS", { options: m }),
            document.addEventListener("visibilitychange", e),
            null),
          E = !1,
          b = !1,
          w = null,
          T = null,
          S = (window.addEventListener("resize", t), gi(y, { id: ge() })),
          I = !1,
          k = !1,
          C = {
            DID_DESTROY: n("destroy"),
            DID_INIT: n("init"),
            DID_THROW_MAX_FILES: n("warning"),
            DID_INIT_ITEM: n("initfile"),
            DID_START_ITEM_LOAD: n("addfilestart"),
            DID_UPDATE_ITEM_LOAD_PROGRESS: n("addfileprogress"),
            DID_LOAD_ITEM: n("addfile"),
            DID_THROW_ITEM_INVALID: [n("error"), n("addfile")],
            DID_THROW_ITEM_LOAD_ERROR: [n("error"), n("addfile")],
            DID_THROW_ITEM_REMOVE_ERROR: [n("error"), n("removefile")],
            DID_PREPARE_OUTPUT: n("preparefile"),
            DID_START_ITEM_PROCESSING: n("processfilestart"),
            DID_UPDATE_ITEM_PROCESS_PROGRESS: n("processfileprogress"),
            DID_ABORT_ITEM_PROCESSING: n("processfileabort"),
            DID_COMPLETE_ITEM_PROCESSING: n("processfile"),
            DID_COMPLETE_ITEM_PROCESSING_ALL: n("processfiles"),
            DID_REVERT_ITEM_PROCESSING: n("processfilerevert"),
            DID_THROW_ITEM_PROCESSING_ERROR: [n("error"), n("processfile")],
            DID_REMOVE_ITEM: n("removefile"),
            DID_UPDATE_ITEMS: n("updatefiles"),
            DID_ACTIVATE_ITEM: n("activatefile"),
            DID_REORDER_ITEMS: n("reorderfiles"),
          },
          x = function (e) {
            e.length &&
              e
                .filter(function (e) {
                  return C[e.type];
                })
                .forEach(function (t) {
                  var e = C[t.type];
                  (Array.isArray(e) ? e : [e]).forEach(function (e) {
                    "DID_INIT_ITEM" === t.type
                      ? i(e(t.data))
                      : setTimeout(function () {
                          i(e(t.data));
                        }, 0);
                  });
                });
          },
          A = Object.assign(
            {},
            ye(),
            {},
            {
              _read: function () {
                E &&
                  ((T = window.innerWidth),
                  (w = w || T),
                  b || T === w || (y.dispatch("DID_START_RESIZE"), (b = !0))),
                  (I = k && I ? null === S.element.offsetParent : I) ||
                    (S._read(), (k = S.rect.element.hidden));
              },
              _write: function (e) {
                var n,
                  t = y.processActionQueue().filter(function (e) {
                    return !/^SET_/.test(e.type);
                  });
                (I && !t.length) ||
                  (x(t),
                  (I = S._write(e, t, b)),
                  (n = y.query("GET_ITEMS")).forEach(function (e, t) {
                    e.released && at(n, t);
                  }),
                  I && y.processDispatchQueue());
              },
            },
            {},
            ((p = y),
            (h = {}),
            D(v, function (t) {
              h[t] = {
                get: function () {
                  return p.getState().options[t];
                },
                set: function (e) {
                  p.dispatch("SET_" + Q(t, "_").toUpperCase(), { value: e });
                },
              };
            }),
            h),
            {
              setOptions: function (e) {
                return y.dispatch("SET_OPTIONS", { options: e });
              },
              addFile: function (n) {
                var i =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                return new Promise(function (t, e) {
                  o([{ source: n, options: i }], { index: i.index })
                    .then(function (e) {
                      return t(e && e[0]);
                    })
                    .catch(e);
                });
              },
              addFiles: o,
              getFile: function (e) {
                return y.query("GET_ACTIVE_ITEM", e);
              },
              processFile: l,
              prepareFile: r,
              removeFile: s,
              moveFile: function (e, t) {
                return y.dispatch("MOVE_ITEM", { query: e, index: t });
              },
              getFiles: a,
              processFiles: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                var i = Array.isArray(t[0]) ? t[0] : t;
                return (
                  i.length ||
                    (i = a().filter(function (e) {
                      return (
                        !(e.status === F.IDLE && e.origin === N.LOCAL) &&
                        e.status !== F.PROCESSING &&
                        e.status !== F.PROCESSING_COMPLETE &&
                        e.status !== F.PROCESSING_REVERT_ERROR
                      );
                    })),
                  Promise.all(i.map(l))
                );
              },
              removeFiles: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                var i,
                  r = Array.isArray(t[0]) ? t[0] : t,
                  o =
                    ("object" == typeof r[r.length - 1]
                      ? (i = r.pop())
                      : Array.isArray(t[0]) && (i = t[1]),
                    a());
                return r.length
                  ? r
                      .map(function (e) {
                        return O(e) ? (o[e] ? o[e].id : null) : e;
                      })
                      .filter(function (e) {
                        return e;
                      })
                      .map(function (e) {
                        return s(e, i);
                      })
                  : Promise.all(
                      o.map(function (e) {
                        return s(e, i);
                      })
                    );
              },
              prepareFiles: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                var i = Array.isArray(t[0]) ? t[0] : t,
                  i = i.length ? i : a();
                return Promise.all(i.map(r));
              },
              sort: function (e) {
                return y.dispatch("SORT", { compare: e });
              },
              browse: function () {
                var e = S.element.querySelector("input[type=file]");
                e && e.click();
              },
              destroy: function () {
                A.fire("destroy", S.element),
                  y.dispatch("ABORT_ALL"),
                  S._destroy(),
                  window.removeEventListener("resize", t),
                  document.removeEventListener("visibilitychange", e),
                  y.dispatch("DID_DESTROY");
              },
              insertBefore: function (e) {
                return $(S.element, e);
              },
              insertAfter: function (e) {
                return B(S.element, e);
              },
              appendTo: function (e) {
                return e.appendChild(S.element);
              },
              replaceElement: function (e) {
                $(S.element, e), e.parentNode.removeChild(e), (g = e);
              },
              restoreElement: function () {
                g &&
                  (B(g, S.element),
                  S.element.parentNode.removeChild(S.element),
                  (g = null));
              },
              isAttachedTo: function (e) {
                return S.element === e || g === e;
              },
              element: {
                get: function () {
                  return S.element;
                },
              },
              status: {
                get: function () {
                  return y.query("GET_STATUS");
                },
              },
            }
          );
        return y.dispatch("DID_INIT"), G(A);
      },
      yi = ["fire", "_read", "_write"],
      _i = function (e, t) {
        var n = e.slice(0, e.size, e.type);
        return (n.lastModifiedDate = e.lastModifiedDate), (n.name = t), n;
      },
      Ei = [],
      v =
        ((yn =
          te &&
          !(
            "[object OperaMini]" ===
            Object.prototype.toString.call(window.operamini)
          ) &&
          "visibilityState" in document &&
          "Promise" in window &&
          "slice" in Blob.prototype &&
          "URL" in window &&
          "createObjectURL" in window.URL &&
          "performance" in window &&
          ("supports" in (window.CSS || {}) ||
            /MSIE|Trident/.test(window.navigator.userAgent))),
        { apps: [] });
    (n.Status = {}),
      (n.FileStatus = {}),
      (n.FileOrigin = {}),
      (n.OptionTypes = {}),
      (n.create = m),
      (n.destroy = m),
      (n.parse = m),
      (n.find = m),
      (n.registerPlugin = m),
      (n.getOptions = m),
      (n.setOptions = m),
      yn &&
        ((function (e, t, n) {
          var n = 2 < arguments.length && void 0 !== n ? n : 60,
            i = "__framePainter";
          if (window[i])
            return window[i].readers.push(e), window[i].writers.push(t);
          window[i] = { readers: [e], writers: [t] };
          function r() {
            c = document.hidden
              ? ((u = function () {
                  return window.setTimeout(function () {
                    return d(performance.now());
                  }, s);
                }),
                function () {
                  return window.clearTimeout(l);
                })
              : ((u = function () {
                  return window.requestAnimationFrame(d);
                }),
                function () {
                  return window.cancelAnimationFrame(l);
                });
          }
          var o = window[i],
            s = 1e3 / n,
            a = null,
            l = null,
            u = null,
            c = null,
            d =
              (document.addEventListener("visibilitychange", function () {
                c && c(), r(), d(performance.now());
              }),
              function e(t) {
                l = u(e);
                var n = t - (a = a || t);
                n <= s ||
                  ((a = t - (n % s)),
                  o.readers.forEach(function (e) {
                    return e();
                  }),
                  o.writers.forEach(function (e) {
                    return e(t);
                  }));
              });
          r(), d(performance.now());
        })(
          function () {
            v.apps.forEach(function (e) {
              return e._read();
            });
          },
          function (t) {
            v.apps.forEach(function (e) {
              return e._write(t);
            });
          }
        ),
        (g = function e() {
          document.dispatchEvent(
            new CustomEvent("FilePond:loaded", {
              detail: {
                supported: vn,
                create: n.create,
                destroy: n.destroy,
                parse: n.parse,
                find: n.find,
                registerPlugin: n.registerPlugin,
                setOptions: n.setOptions,
              },
            })
          ),
            document.removeEventListener("DOMContentLoaded", e);
        }),
        "loading" !== document.readyState
          ? setTimeout(g, 0)
          : document.addEventListener("DOMContentLoaded", g),
        (_n = function () {
          return D(dt(), function (e, t) {
            n.OptionTypes[e] = t[1];
          });
        }),
        (n.Status = Object.assign({}, ft)),
        (n.FileOrigin = Object.assign({}, N)),
        (n.FileStatus = Object.assign({}, F)),
        (n.OptionTypes = {}),
        _n(),
        (n.create = function () {
          var e = cn.apply(void 0, arguments);
          return e.on("destroy", n.destroy), v.apps.push(e), dn(e);
        }),
        (n.destroy = function (t) {
          var e = v.apps.findIndex(function (e) {
            return e.isAttachedTo(t);
          });
          return 0 <= e && (v.apps.splice(e, 1)[0].restoreElement(), !0);
        }),
        (n.parse = function (e) {
          return Array.from(e.querySelectorAll(".filepond"))
            .filter(function (t) {
              return !v.apps.find(function (e) {
                return e.isAttachedTo(t);
              });
            })
            .map(function (e) {
              return n.create(e);
            });
        }),
        (n.find = function (t) {
          var e = v.apps.find(function (e) {
            return e.isAttachedTo(t);
          });
          return e ? dn(e) : null;
        }),
        (n.registerPlugin = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          t.forEach(gn), _n();
        }),
        (n.getOptions = function () {
          var n = {};
          return (
            D(dt(), function (e, t) {
              n[e] = t[0];
            }),
            n
          );
        }),
        (n.setOptions = function (t) {
          return (
            R(t) &&
              (v.apps.forEach(function (e) {
                e.setOptions(t);
              }),
              D(t, function (e, t) {
                s[e] && (s[e][0] = J(t, s[e][0], s[e][1]));
              })),
            n.getOptions()
          );
        })),
      (n.supported = vn),
      Object.defineProperty(n, "__esModule", { value: !0 });
  }),
  window.FilePond &&
    (FilePond.registerPlugin(FilePondPluginImagePreview),
    FilePond.registerPlugin(FilePondPluginMediaPreview),
    FilePond.registerPlugin(FilePondPluginFileValidateSize),
    FilePond.registerPlugin(FilePondPluginFileValidateType));
const formatFileData = (t) => {
  Object.keys(t).forEach((e) => {
    "string" == typeof e &&
      e.startsWith("unicorn-file-upload__") &&
      "string" == typeof t[e] &&
      ((t[e] = t[e].replace(/"/g, "")),
      delete Object.assign(t, {
        [e.replace("unicorn-file-upload__", "")]: t[e],
      })[e]);
  });
};
function getCookie(e) {
  try {
    const t = "; " + document.cookie,
      n = t.split(`; ${e}=`);
    if (2 === n.length) return n.pop().split(";").shift();
  } catch (e) {
    return console.error(e), "";
  }
}
const deleteParamsFromUrl = (e) => {
  try {
    const t = new URL(window.location);
    e.forEach((e) => {
      t.searchParams.delete(e);
    }),
      window.history.replaceState({}, document.title, t.toString());
  } catch (e) {
    console.error(e);
  }
};
deleteParamsFromUrl(["access_token", "nocache"]),
  window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    (window.unicornplatform = {}), (window.upUtils = {});
    const DEBOUNCE_ROWS_COUNT = 100,
      DEFAULT_DIRECTORY_TOP_SECTION_HTML = `<div
  x-cloak
  x-data='{ 
    filtersV2Items: {{filtersV2Items}},
    amount: {{amount}},
    searchPlaceholder: "{{searchPlaceholder}}",
    isDarkBg: {{isDarkBg}},
    inputValue: "",
    selectedFilters: {},

    showNoItemsPlaceholder(display) {
      const placeholder = document.querySelector("#{{id}} .directory-01__not-found-placeholder-container");
      if (placeholder) {
        placeholder.style.display = display;
      }
    },

    getActualFilters(filterV2Item) {
      const result = filterV2Item.filters.filter(filter => {
        const showByFiltersArray = filterV2Item.showByFilters.items.split(";").map(value => value.trim()).filter(value => !!value);
        return showByFiltersArray.includes(filter) || showByFiltersArray.length === 0;
      });
      return result;
    },

    hideShowAllButton() {
      const button = document.querySelector("#{{id}} .directory-01__show-more-box");
      if (button) {
        button.style.display = "none";
      }
    },

    getIsHiddenByFilter(item, mode) {
      const { selectedFilters } = this;
      const itemFilters = JSON.parse(item.dataset.filters);

      if (Object.keys(selectedFilters).length === 0) {
        return false;
      }

      const matchFilter = (itemFilterValues, selectedFilterValues) => {
        const itemValues = itemFilterValues.split(";").map(value => value.trim());
        return selectedFilterValues.some(value => itemValues.includes(value));
      };

      const categories = Object.keys(selectedFilters);

      return !categories.every(category => 
        itemFilters.hasOwnProperty(category) && 
        matchFilter(itemFilters[category], selectedFilters[category])
      );

      return false;
    },

    handleInput() {
      let amountHidden = 0;
      const inputValue = this.inputValue.toString().toLowerCase();
      this.selectedFilters = {}
      this.hideShowAllButton();
      document.querySelectorAll("#{{id}} .directory-item-parent").forEach((item) => {
        let itemFilters = Object.values(JSON.parse(item.dataset.filters)).join(" ");
        const itemChild = item.querySelector(".directory-01__item");
        if (itemChild && itemChild.dataset.customfilters) {
          itemFilters += " " + itemChild.dataset.customfilters;
        }
        const itemSearchValue = item.innerText.toLowerCase() + " " + itemFilters.toLowerCase();
        if (!inputValue || itemSearchValue.includes(inputValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
          amountHidden++;
        }
      })
      if (amountHidden >= this.amount) {
        this.showNoItemsPlaceholder("flex");
      } else {
        this.showNoItemsPlaceholder("none");
      }
    },

    addSelectedFilter(filterV2Item, filter) {
      const multiselect = filterV2Item.multiselect === "on";
      if (this.selectedFilters[filterV2Item.column]) {
        if (multiselect) {
          this.selectedFilters[filterV2Item.column].push(filter);
        } else {
          this.selectedFilters[filterV2Item.column] = [filter];
        }
      } else {
        this.selectedFilters[filterV2Item.column] = [filter];
      }
    },

    removeSelectedFilter(filterV2Item, filter) {
      if (this.selectedFilters[filterV2Item.column]) {
        this.selectedFilters[filterV2Item.column] = this.selectedFilters[filterV2Item.column].filter(f => f !== filter);
        if (this.selectedFilters[filterV2Item.column].length === 0) {
          delete this.selectedFilters[filterV2Item.column];
        }
      }
    },

    handleClick($event, filterV2Item) {
      let amountHidden = 0;
      const filter = $event.target.dataset.tag;
      if (!filter) return;
      this.inputValue = "";
      this.hideShowAllButton();
      const selectedFilters = this.selectedFilters[filterV2Item.column] || [];
      if (selectedFilters.includes(filter)) {
        this.removeSelectedFilter(filterV2Item, filter);
      } else {
        this.addSelectedFilter(filterV2Item, filter);
      }
      document.querySelectorAll("#{{id}} .directory-item-parent").forEach((el) => {
        const isHidden = this.getIsHiddenByFilter(el, "all");
        el.style.display = isHidden ? "none" : "block";
        if (isHidden) {
          amountHidden++;
        }
      })
      if (amountHidden >= this.amount) {
        this.showNoItemsPlaceholder("flex");
      } else {
        this.showNoItemsPlaceholder("none");
      }
    },
  }'
  class="directory-01__search-container"
>
  <div class="directory-01__search-box"
    x-show="!!searchPlaceholder"
  >
    <input
      type="text"
      class="directory-01__search-input text-input"
      :placeholder="(searchPlaceholder || '').replace(/{{amount}}/g, amount)"
      @input.debounce.{{debounce}}="handleInput"
      :class="{ 'text-input--white': isDarkBg }"
      x-model.debounce.{{debounce}}="inputValue"
    />
  </div>
  <template x-for="filterV2Item in filtersV2Items">
    <div 
      class="directory-01__filters-container" 
      x-show="(!!filterV2Item.column || !!filterV2Item.label) && filterV2Item.isHidden !== 'hidden' && getActualFilters(filterV2Item).length > 1"
    >
      <h3 class="directory-01__filters-label" x-show="!!filterV2Item.label">
        <span x-text="filterV2Item.label"></span>
      </h3>
      <div
        class="directory-01__tags-box"
        @click="handleClick($event, filterV2Item)"
        x-show="getActualFilters(filterV2Item).length > 1"
      >
        <template x-for="filter in getActualFilters(filterV2Item).sort((a,b)=>window.upUtils.sortPrimitivesFn(a,b,filterV2Item.sorting))">
          <button
            class="directory-01__tag-button content-text def-14"
            x-text="filter"
            :data-tag="filter"
            :class="{ 'is-selected': selectedFilters[filterV2Item.column] && selectedFilters[filterV2Item.column].includes(filter) }"
          ></button>
        </template>
      </div>
    </div>
  </template>
</div>`,
      getQueryParamsAsArray = () => {
        var e = new URL(window.location.href);
        const t = new URLSearchParams(e.search),
          n = [];
        for (const i of t.keys()) "nocache" !== i && n.push(i);
        return n;
      },
      isKeyValue = (e) =>
        "object" == typeof e && !Array.isArray(e) && null !== e,
      lowerCaseKeys = (n) =>
        Object.keys(n).reduce(
          (e, t) => ((e[t.toString().toLowerCase().trim()] = n[t]), e),
          {}
        ),
      clearForm = (e) => {
        $(":input", e)
          .not(":button, :submit, :reset, :hidden, select")
          .val("")
          .prop("checked", !1)
          .prop("selected", !1),
          $("select", e).prop("selectedIndex", 0),
          $(e).find(".chosen-select").val("").trigger("chosen:updated"),
          window.filepondRefs &&
            window.filepondRefs.forEach((e) => {
              e.removeFiles();
            });
      },
      combineSameParams = (e) => {
        const t = {};
        return (
          e.forEach((e) => {
            t[e.name]
              ? (t[e.name] = t[e.name] + ";" + e.value)
              : (t[e.name] = e.value);
          }),
          t
        );
      },
      validateRequiredMultipleChoice = (e) => {
        let n = !1;
        const t = e.find(".form__input--multiple");
        return (
          t.each(function () {
            if (n) return !1;
            const e = $(this);
            var t = e.find(".chosen-select").data("required");
            if (t && 0 === e.find(".chosen-choices .search-choice").length)
              return (
                (n = !0),
                e.find(".chosen-choices").trigger("click"),
                e
                  .find(".chosen-select")
                  .val("")
                  .trigger("chosen:updated")
                  .trigger("chosen:activate"),
                !1
              );
          }),
          n
        );
      };
    function getUrlParameter(e) {
      e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      e = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
      return null === e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "));
    }
    function getMarketingParameters(i) {
      const r = {
        ref: "REF",
        utm_source: "UTM_SOURCE",
        utm_medium: "UTM_MEDIUM",
        utm_content: "UTM_CONT",
        utm_campaign: "UTM_CAMP",
        utm_term: "UTM_TERM",
      };
      return getQueryParamsAsArray().map((e, t) => {
        let n = e;
        return (
          "mailchimp" === i && n in r && (n = r[n]),
          {
            name: (n =
              "mailerlite" === i
                ? `fields[${(n || "").toString().toLowerCase()}]`
                : n),
            value: getUrlParameter(e),
          }
        );
      });
    }
    let elementsWithMask = document.querySelectorAll("[data-mask]");
    if (0 < elementsWithMask.length && void 0 !== window.IMask)
      for (let index = 0; index < elementsWithMask.length; index++) {
        const element = elementsWithMask[index],
          elementMask = element.getAttribute("data-mask");
        let mask = IMask(element, { mask: elementMask });
      }
    function removeParam(e) {
      var t = window.location.href,
        n = t.split("?")[0],
        i = [],
        t = -1 !== t.indexOf("?") ? t.split("?")[1] : "";
      if ("" !== t) {
        for (var r = (i = t.split("&")).length - 1; 0 <= r; --r)
          i[r].split("=")[0] === e && i.splice(r, 1);
        n = n + "?" + i.join("&");
      }
      return n;
    }
    function isMobile() {
      return /Android|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent || navigator.vendor || window.opera
      );
    }
    function isTablet() {
      return /(ipad|iPad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        navigator.userAgent
      );
    }
    function isPhone() {
      return Math.min(window.screen.width, window.screen.height) < 500;
    }
    !(function () {
      let e = $("body");
      isMobile() ? e.addClass("body--mobile") : e.addClass("body--desktop"),
        isTablet() && e.addClass("body--tablet"),
        isPhone() && e.addClass("body--phone"),
        e.addClass("body--loaded");
    })();
    var message = (function () {
        function t(e, t) {
          t && e.find(".js-error-message-text").text(t),
            e.addClass("state-visible");
        }
        function n(e) {
          for (var t, n = e.length, i = 0; i < n; i++)
            e[i].removeClass("state-visible"),
              (t = e[i]).removeClass("state-reacted"),
              t.find(".js-react-on-message").removeAttr("disabled");
        }
        function e() {
          $(document).on("click", ".js-react-on-message", function (e) {
            var t, n;
            e.preventDefault(),
              (e = $(this)),
              (t = e.parents(".js-message")),
              (n = t).addClass("state-reacted"),
              n.find(".js-react-on-message").attr("disabled", "disabled"),
              (n = e.text()),
              t.find(".js-reaction-text").text(n);
          });
        }
        return {
          show: t,
          hide: n,
          init: function () {
            $(document).on("click", ".js-open-engaging-message", function (e) {
              e.preventDefault();
              e = $(this).attr("data-index");
              t($('.js-engaging-message[data-index="' + e + '"]'));
            }),
              e(),
              $(document).on("click", ".js-close-message", function (e) {
                e.preventDefault(), n([$(this).parents(".js-message")]);
              });
          },
        };
      })(),
      button =
        (message.init(),
        {
          showSuccessTick: function (e) {
            e.addClass("state-show-success-tick");
          },
          removeSuccessTick: function (e) {
            e.removeClass("state-show-success-tick");
          },
          disableSubmit: function (e) {
            e.attr("disabled", "disabled");
          },
          enableSubmit: function (e) {
            e.removeAttr("disabled");
          },
          showSpinner: function (e) {
            e.addClass("state-show-spinner");
          },
          stopSpinner: function (e) {
            e.removeClass("state-show-spinner");
          },
        }),
      submitNoIntegrationForm = {
        init: function () {
          for (
            var e = $(".js-no-integration-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (e) {
              var t = e.find(".js-engaging-message"),
                n = e.find(".js-success-message"),
                i = e.find(".js-error-message"),
                r = e.find(".js-submit-button"),
                o = e.find(".js-form-input"),
                s = o.not("textarea");
              e.attr("success-redirect");
              e.on("submit", function (e) {
                e.preventDefault(),
                  $(this),
                  message.show(
                    i,
                    "The form is not connected to any integration."
                  );
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                o
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([n, t, i]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      };
    function evaluateCodeAfterFormSubmission(
      codeString,
      $emailFormObject,
      responseData
    ) {
      if (codeString && 0 !== codeString.length)
        try {
          var formDataSerialize = $emailFormObject.serialize(),
            formDataSerializeArray = $emailFormObject.serializeArray(),
            formDataKeyValue = $emailFormObject
              .serializeArray()
              .reduce(function (e, t) {
                return (e[t.name] = t.value), e;
              }, {});
          eval(codeString);
        } catch (e) {
          console.error(
            'âš ï¸ Your "after form submission" JS code has failed to execute.'
          ),
            console.error("The code: "),
            console.info(codeString),
            console.error("The error message: "),
            console.info(e);
        }
    }
    function redirectAfterFormSubmission(e, t, n, i) {
      void 0 !== e &&
        0 < e.length &&
        (-1 !== (e = e).indexOf(".") &&
          -1 === e.indexOf("http://") &&
          -1 === e.indexOf("https://") &&
          (e = "http://" + e),
        "True" === n && (e = -1 !== e.indexOf("?") ? e + "&" + i : e + "?" + i),
        window.open(e, "True" === t ? "_blank" : "_self"));
    }
    function openPopupAfterFormSubmission(e) {
      e && "" !== e && customPopup().openPopup(e);
    }
    submitNoIntegrationForm.init(),
      (window.unicornplatform.subscribeMailchimpForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-mailchimp-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (r) {
              var o = r.find(".js-engaging-message"),
                s = r.find(".js-success-message"),
                a = r.find(".js-error-message"),
                l = r.find(".js-submit-button"),
                e = r.find(".js-form-input"),
                t = e.not("textarea"),
                u = r.attr("data-redirect-url"),
                c = r.attr("data-redirect-target-blank"),
                d = r.attr("data-pass-values-redirect"),
                f = r.attr("data-success-code");
              const p = r.attr("data-custom-popup-id");
              function i() {
                if (!validateRequiredMultipleChoice(r)) {
                  (n = r.attr("action")),
                    (i = ""),
                    (i = n.replace(/post\?u=/i, "post-json?u="));
                  let e = (i += "&c=?");
                  let t = "application/json; charset=utf-8";
                  r.attr("data-validation") &&
                    ((e = r.attr("action")),
                    (t = "application/x-www-form-urlencoded; charset=UTF-8")),
                    button.showSpinner(l),
                    button.disableSubmit(l);
                  var n = r.serializeArray(),
                    i =
                      "false" === r.attr("data-preserve-params")
                        ? []
                        : getMarketingParameters("mailchimp"),
                    n = combineSameParams([...n, ...i]);
                  formatFileData(n),
                    $.ajax({
                      type: r.attr("method"),
                      url: e,
                      data: n,
                      cache: !1,
                      dataType: "json",
                      contentType: t,
                    })
                      .done(function (e) {
                        "success" != e.result
                          ? (message.hide([s, o, a]),
                            message.show(a, e.msg),
                            button.stopSpinner(l),
                            button.enableSubmit(l))
                          : (message.hide([s, o, a]),
                            button.showSuccessTick(l),
                            setTimeout(function () {
                              button.stopSpinner(l);
                            }, 200),
                            setTimeout(function () {
                              button.removeSuccessTick(l),
                                button.enableSubmit(l);
                            }, 3e3),
                            evaluateCodeAfterFormSubmission(f, r),
                            redirectAfterFormSubmission(u, c, d, r.serialize()),
                            openPopupAfterFormSubmission(p),
                            clearForm(r));
                      })
                      .fail(function (e) {
                        button.stopSpinner(l), button.enableSubmit(l);
                        let t =
                          "Uh. We could not connect to the server. Please try again later.";
                        e.responseJSON &&
                          e.responseJSON.error &&
                          (t = e.responseJSON.error),
                          message.hide([s, o, a]),
                          message.show(a, t),
                          console.log(e);
                      })
                      .always(function (e) {});
                }
              }
              r.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) i($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else i($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return l.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([s, o, a]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeMailchimpForm.init(),
      (window.unicornplatform.subscribeZapierForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-zapier-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (n) {
              var i = n.find(".js-engaging-message"),
                r = n.find(".js-success-message"),
                o = n.find(".js-error-message"),
                s = n.find(".js-submit-button"),
                e = n.find(".js-form-input"),
                t = e.not("textarea"),
                a = n.attr("data-redirect-url"),
                l = n.attr("data-redirect-target-blank"),
                u = n.attr("data-pass-values-redirect");
              const c = n.attr("data-custom-popup-id");
              var d = n.attr("data-success-code");
              function f() {
                var e, t;
                validateRequiredMultipleChoice(n) ||
                  (button.showSpinner(s),
                  button.disableSubmit(s),
                  (t = n.serializeArray()),
                  (e =
                    "false" === n.attr("data-preserve-params")
                      ? []
                      : getMarketingParameters()),
                  (t = combineSameParams([...t, ...e])),
                  formatFileData(t),
                  $.ajax({
                    type: n.attr("method"),
                    url: n.attr("action"),
                    data: t,
                    cache: !1,
                    dataType: "json",
                  })
                    .done(function (e) {
                      "success" !== e.status
                        ? (message.hide([r, i, o]),
                          message.show(
                            o,
                            "There is an unknown error. We are so sorry!"
                          ),
                          button.stopSpinner(s),
                          button.enableSubmit(s))
                        : (message.hide([r, i, o]),
                          button.showSuccessTick(s),
                          setTimeout(function () {
                            button.stopSpinner(s);
                          }, 200),
                          setTimeout(function () {
                            button.removeSuccessTick(s), button.enableSubmit(s);
                          }, 3e3),
                          evaluateCodeAfterFormSubmission(d, n),
                          redirectAfterFormSubmission(a, l, u, n.serialize()),
                          openPopupAfterFormSubmission(c),
                          clearForm(n));
                    })
                    .fail(function (e) {
                      button.stopSpinner(s), button.enableSubmit(s);
                      let t =
                        "Uh. We could not connect to the server. Please try again later.";
                      e.responseJSON &&
                        e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([r, i, o]),
                        message.show(o, t),
                        console.log(e);
                    })
                    .always(function (e) {}));
              }
              n.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) f($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else f($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return s.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([r, i, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeZapierForm.init(),
      (window.unicornplatform.subscribeGoogleSheetForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-google-sheet-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (i) {
              var r = i.find(".js-engaging-message"),
                o = i.find(".js-success-message"),
                s = i.find(".js-error-message"),
                a = i.find(".js-submit-button"),
                e = i.find(".js-form-input"),
                t = e.not("textarea"),
                l = i.attr("data-redirect-url"),
                u = i.attr("data-redirect-target-blank"),
                c = i.attr("data-sheet-id"),
                d = i.attr("data-pass-values-redirect");
              const f = i.attr("data-custom-popup-id");
              var p = i.attr("data-success-code");
              function h() {
                if (!validateRequiredMultipleChoice(i)) {
                  button.showSpinner(a), button.disableSubmit(a);
                  var e = i.serializeArray(),
                    t =
                      "false" === i.attr("data-preserve-params")
                        ? []
                        : getMarketingParameters();
                  const n = combineSameParams([...e, ...t]);
                  (n.SHEET_ID = c),
                    formatFileData(n),
                    $.ajax({
                      type: i.attr("method"),
                      url: i.attr("action"),
                      data: n,
                      cache: !1,
                      dataType: "json",
                    })
                      .done(function (e) {
                        "success" !== e.status
                          ? (message.hide([o, r, s]),
                            message.show(
                              s,
                              'There was an error. Perhaps you deleted the "ID" column or revoked access to the sheet? Re-adding the integration usually helps.'
                            ),
                            button.stopSpinner(a),
                            button.enableSubmit(a))
                          : (message.hide([o, r, s]),
                            button.showSuccessTick(a),
                            setTimeout(function () {
                              button.stopSpinner(a);
                            }, 200),
                            setTimeout(function () {
                              button.removeSuccessTick(a),
                                button.enableSubmit(a);
                            }, 3e3),
                            evaluateCodeAfterFormSubmission(p, i),
                            redirectAfterFormSubmission(l, u, d, i.serialize()),
                            openPopupAfterFormSubmission(f),
                            clearForm(i));
                      })
                      .fail(function (e) {
                        button.stopSpinner(a), button.enableSubmit(a);
                        let t =
                          'Uh. We could not connect to the server. Please try again later. Perhaps you deleted the "ID" column or revoked access to the sheet? Re-adding the integration usually helps.';
                        e.responseJSON &&
                          e.responseJSON.error &&
                          (t = e.responseJSON.error),
                          message.hide([o, r, s]),
                          message.show(s, t),
                          console.log(e);
                      })
                      .always(function (e) {});
                }
              }
              i.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) h($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else h($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return a.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([o, r, s]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeGoogleSheetForm.init(),
      (window.unicornplatform.subscribeWebhookForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-webhook-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (i) {
              var r = i.find(".js-engaging-message"),
                o = i.find(".js-success-message"),
                s = i.find(".js-error-message"),
                a = i.find(".js-submit-button"),
                e = i.find(".js-form-input"),
                t = e.not("textarea"),
                l = i.attr("data-redirect-url"),
                u = i.attr("data-redirect-target-blank"),
                c = i.attr("data-pass-values-redirect");
              const d = i.attr("data-custom-popup-id");
              var f = i.attr("data-success-code");
              function p() {
                if (!validateRequiredMultipleChoice(i)) {
                  button.showSpinner(a), button.disableSubmit(a);
                  var e = i.serializeArray(),
                    t =
                      "false" === i.attr("data-preserve-params")
                        ? []
                        : getMarketingParameters(),
                    e = combineSameParams([...e, ...t]);
                  formatFileData(e);
                  const n = {
                    type: i.attr("method"),
                    url: i.attr("action"),
                    data: e,
                    cache: !1,
                  };
                  window.uniCustomWebhookHeaders &&
                    (n.headers = window.uniCustomWebhookHeaders);
                  t = getCookie("access_token");
                  t &&
                    (n.headers = {
                      ...n.headers,
                      Authorization: "Bearer " + t,
                    }),
                    $.ajax(n)
                      .done(function (e) {
                        message.hide([o, r, s]),
                          button.showSuccessTick(a),
                          setTimeout(function () {
                            button.stopSpinner(a);
                          }, 200),
                          setTimeout(function () {
                            button.removeSuccessTick(a), button.enableSubmit(a);
                          }, 3e3),
                          evaluateCodeAfterFormSubmission(f, i, e),
                          redirectAfterFormSubmission(l, u, c, i.serialize()),
                          openPopupAfterFormSubmission(d),
                          clearForm(i);
                      })
                      .fail(function (e) {
                        button.stopSpinner(a), button.enableSubmit(a);
                        var t =
                          "Uh. We could not connect to the server. Please try again later.";
                        void 0 !== e.responseJSON &&
                          void 0 !== e.responseJSON.error &&
                          (t = e.responseJSON.error),
                          message.hide([o, r, s]),
                          message.show(s, t);
                      })
                      .always(function (e) {});
                }
              }
              i.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) p($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else p($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return a.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([o, r, s]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeWebhookForm.init(),
      (window.unicornplatform.subscribeSendToEmailForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-email-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (n) {
              var i = n.find(".js-engaging-message"),
                r = n.find(".js-success-message"),
                o = n.find(".js-error-message"),
                s = n.find(".js-submit-button"),
                e = n.find(".js-form-input"),
                t = e.not("textarea"),
                a = n.attr("data-redirect-url"),
                l = n.attr("data-redirect-target-blank"),
                u = n.attr("data-pass-values-redirect");
              const c = n.attr("data-custom-popup-id");
              var d = n.attr("data-success-code");
              function f() {
                var e, t;
                validateRequiredMultipleChoice(n) ||
                  (button.showSpinner(s),
                  button.disableSubmit(s),
                  (t = n.serializeArray()),
                  (e =
                    "false" === n.attr("data-preserve-params")
                      ? []
                      : getMarketingParameters()),
                  (t = combineSameParams([...t, ...e])),
                  formatFileData(t),
                  $.ajax({
                    type: n.attr("method"),
                    url: n.attr("action"),
                    data: t,
                    cache: !1,
                  })
                    .done(function (e) {
                      message.hide([r, i, o]),
                        button.showSuccessTick(s),
                        setTimeout(function () {
                          button.stopSpinner(s);
                        }, 200),
                        setTimeout(function () {
                          button.removeSuccessTick(s), button.enableSubmit(s);
                        }, 3e3),
                        evaluateCodeAfterFormSubmission(d, n),
                        redirectAfterFormSubmission(a, l, u, n.serialize()),
                        openPopupAfterFormSubmission(c),
                        clearForm(n);
                    })
                    .fail(function (e) {
                      button.stopSpinner(s), button.enableSubmit(s);
                      var t =
                        "Uh. We could not connect to the server. Please try again later.";
                      void 0 !== e.responseJSON &&
                        void 0 !== e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([r, i, o]),
                        message.show(o, t);
                    })
                    .always(function (e) {}));
              }
              n.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) f($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else f($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return s.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([r, i, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeSendToEmailForm.init(),
      (window.unicornplatform.subscribeSendToMailerliteForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-mailerlite-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (n) {
              var i = n.find(".js-engaging-message"),
                r = n.find(".js-success-message"),
                o = n.find(".js-error-message"),
                s = n.find(".js-submit-button"),
                e = n.find(".js-form-input"),
                t = e.not("textarea"),
                a = n.attr("data-redirect-url"),
                l = n.attr("data-redirect-target-blank"),
                u = n.attr("data-pass-values-redirect");
              const c = n.attr("data-custom-popup-id");
              var d = n.attr("data-success-code");
              function f() {
                var e, t;
                validateRequiredMultipleChoice(n) ||
                  (button.showSpinner(s),
                  button.disableSubmit(s),
                  (t = n
                    .serializeArray()
                    .map(({ name: e, value: t }) =>
                      "g-recaptcha-response" === e
                        ? { name: e, value: t }
                        : { name: `fields[${e.toLowerCase()}]`, value: t }
                    )),
                  (e =
                    "false" === n.attr("data-preserve-params")
                      ? []
                      : getMarketingParameters("mailerlite")),
                  (t = combineSameParams([...t, ...e])),
                  formatFileData(t),
                  $.ajax({
                    type: n.attr("method"),
                    url: n.attr("action"),
                    data: t,
                    cache: !1,
                  })
                    .done(function (e) {
                      message.hide([r, i, o]),
                        button.showSuccessTick(s),
                        setTimeout(function () {
                          button.stopSpinner(s);
                        }, 200),
                        setTimeout(function () {
                          button.removeSuccessTick(s), button.enableSubmit(s);
                        }, 3e3),
                        evaluateCodeAfterFormSubmission(d, n),
                        redirectAfterFormSubmission(a, l, u, n.serialize()),
                        openPopupAfterFormSubmission(c),
                        clearForm(n);
                    })
                    .fail(function (e) {
                      button.stopSpinner(s), button.enableSubmit(s);
                      var t =
                        "Uh. We could not connect to the server. Please try again later.";
                      void 0 !== e.responseJSON &&
                        void 0 !== e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([r, i, o]),
                        message.show(o, t);
                    })
                    .always(function (e) {}));
              }
              n.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) f($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else f($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return s.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([r, i, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeSendToMailerliteForm.init(),
      (window.unicornplatform.subscribeCmsForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-cms-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                r = t.find(".js-error-message"),
                o = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-pass-values-redirect");
              const c = t.attr("data-custom-popup-id");
              var d = t.attr("data-success-code");
              function f() {
                var e;
                validateRequiredMultipleChoice(t) ||
                  (button.showSpinner(o),
                  button.disableSubmit(o),
                  (e = t.serializeArray()),
                  (e = combineSameParams([...e])),
                  formatFileData(e),
                  $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: e,
                    cache: !1,
                  })
                    .done(function (e) {
                      message.hide([i, n, r]),
                        button.showSuccessTick(o),
                        setTimeout(function () {
                          button.stopSpinner(o);
                        }, 200),
                        setTimeout(function () {
                          button.removeSuccessTick(o), button.enableSubmit(o);
                        }, 3e3),
                        evaluateCodeAfterFormSubmission(d, t),
                        redirectAfterFormSubmission(a, l, u, t.serialize()),
                        openPopupAfterFormSubmission(c),
                        clearForm(t);
                    })
                    .fail(function (e) {
                      button.stopSpinner(o), button.enableSubmit(o);
                      var t =
                        "Uh. We could not connect to the server. Please try again later.";
                      void 0 !== e.responseJSON &&
                        void 0 !== e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([i, n, r]),
                        message.show(r, t);
                    })
                    .always(function (e) {}));
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) f($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else f($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return o.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, r]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeCmsForm.init(),
      (window.unicornplatform.roadmapScroll = {
        init: function () {
          var e,
            t,
            n = $("#js-roadmap-wrapper");
          0 < n.length &&
            ((e = 700),
            isMobile() && (e = 150),
            (t =
              (t = $(".js-roadmap-item")).length * (t.eq(0).width() + 60) + e),
            $(".js-roadmap-box").css("width", t),
            isMobile() || n.kinetic({ maxvelocity: 30 }));
        },
      }),
      window.unicornplatform.roadmapScroll.init(),
      (window.unicornplatform.slider = {
        init: function () {
          for (
            var e = $(".js-slider"), t = e.length, n = "", i = 0;
            i < t;
            i++
          ) {
            var n = e.eq(i),
              r = JSON.parse(n.attr("data-slider-config")),
              o = n.parent().find(".js-prev-arrow"),
              s = n.parent().find(".js-next-arrow");
            0 < o.length && 0 < s.length
              ? ((r.prevArrow = o), (r.nextArrow = s))
              : (r.arrows = !1),
              n.hasClass("slick-initialized") || n.slick(r);
          }
        },
      }),
      window.unicornplatform.slider.init(),
      (window.unicornplatform.tabs = (function () {
        var t, c;
        function d(e) {
          if (2 <= parseInt(e.attr("data-gallery-version") || "1")) {
            const n = e.find(
              ".js-tab-content.state-active-tab .js-tab-content-item"
            );
            e.css({ height: n.outerHeight() });
          } else {
            for (
              var t,
                n = e.find(".js-tab-content-item"),
                i = 0,
                r = n.length,
                o = 0;
              o < r;
              o++
            )
              i < (t = n.eq(o).outerHeight()) && (i = t);
            20 < i && e.css({ height: i });
          }
        }
        function n() {
          for (var e = 0; e < c; e++) d(t.eq(e));
        }
        function e() {
          var e, u;
          n(),
            (e = !1),
            window.addEventListener("resize", function () {
              clearTimeout(e), (e = setTimeout(n, 350));
            }),
            (u = setInterval(function () {
              if ($(".js-tabs-item-list.state-loaded").length === c)
                clearInterval(u);
              else
                for (
                  var e = $(".js-tabs-item-list:not(.state-loaded)"),
                    t = e.length,
                    n = 0;
                  n < t;
                  n++
                ) {
                  for (
                    var i = e.eq(n),
                      r = i.find(".js-tab-content-item"),
                      o = r.length,
                      s = 0;
                    s < o;
                    s++
                  ) {
                    var a = r.eq(s),
                      l = a.find("img");
                    (0 === l.length ||
                      (!1 === a.hasClass("state-loaded") && l[0].complete)) &&
                      a.addClass("state-loaded");
                  }
                  o === i.find(".js-tab-content-item.state-loaded").length &&
                    (i.addClass("state-loaded"), d(i));
                }
            }, 500));
        }
        return {
          init: function () {
            (t = $(".js-tabs-item-list")),
              0 < (c = t.length) && e(),
              $(document).on("click", ".js-open-tab", function (e) {
                if ((e.preventDefault(), $(this).hasClass("state-active-tab")))
                  return !1;
                var e = $(this).attr("data-index"),
                  t = $(this).attr("data-group");
                $('.js-open-tab[data-group="' + t + '"]').removeClass(
                  "state-active-tab"
                ),
                  $(this).addClass("state-active-tab");
                $('.js-tab-content[data-group="' + t + '"]').removeClass(
                  "state-active-tab"
                );
                t = $(
                  '.js-tab-content[data-group="' +
                    t +
                    '"][data-index="' +
                    e +
                    '"]'
                );
                t.addClass("state-active-tab");
                const n = t.parent();
                n &&
                  2 <= parseInt(n.attr("data-gallery-version") || "1") &&
                  d(n);
              });
          },
          setAll: n,
        };
      })()),
      window.unicornplatform.tabs.init();
    var showContentOnClick = {
        bind: function () {
          $(document).on(
            "mouseenter",
            ".js-hover-to-show-sibling",
            function (e) {
              e.preventDefault(),
                $(this)
                  .siblings(".js-content-to-show")
                  .addClass("state-visible");
            }
          ),
            $(document).on(
              "mouseleave",
              ".js-hover-to-show-sibling",
              function (e) {
                e.preventDefault(),
                  $(this)
                    .siblings(".js-content-to-show")
                    .removeClass("state-visible");
              }
            );
        },
      },
      clipboard = (showContentOnClick.bind(), new ClipboardJS(".js-copy-text")),
      faqToggle =
        (clipboard.on("success", function (e) {
          var t = $(e.trigger);
          button.showSuccessTick(t),
            button.disableSubmit(t),
            setTimeout(function () {
              button.removeSuccessTick(t), button.enableSubmit(t);
            }, 3e3);
        }),
        clipboard.on("error", function (e) {
          console.error("Copy action error: ", e.action),
            console.error("Trigger:", e.trigger);
        }),
        {
          init: function () {
            $(document).on("click", ".js-open-faq", function (e) {
              e.preventDefault(),
                $(this).find(".js-faq-item").slideToggle(200),
                $(this).toggleClass("state-active");
            }),
              $(document).on("click", ".js-open-faq a", function (e) {
                e.stopPropagation();
              });
          },
        }),
      openMenu =
        (faqToggle.init(),
        (function () {
          var n = $("body");
          function i(e, t) {
            e.removeClass("state-opened-menu"),
              t.removeClass("state-active-burger"),
              n.removeClass("state-fixed-body");
          }
          return {
            bind: function () {
              $(document).on("click", ".js-open-menu", function (e) {
                e.preventDefault();
                var t,
                  e = $(this).parents(".js-menu");
                $(this).hasClass("state-active-burger")
                  ? i(e, $(this))
                  : ((e = e),
                    (t = $(this)),
                    e.addClass("state-opened-menu"),
                    t.addClass("state-active-burger"),
                    n.addClass("state-fixed-body"));
              });
            },
            close: i,
          };
        })()),
      toggleDropdown =
        (openMenu.bind(),
        (function () {
          function i(e) {
            e.removeClass("state-opened-dropdown");
          }
          return {
            bind: function () {
              var n = $(".js-toggle-dropdown");
              $(document).on("click", ".js-toggle-dropdown", function (e) {
                var t = $(this);
                $(this).hasClass("state-opened-dropdown")
                  ? i(t)
                  : (i(n), t.addClass("state-opened-dropdown"));
              }),
                $(document).on("click", function (e) {
                  !0 !== $(e.target).hasClass("js-toggle-dropdown") &&
                    1 !== $(e.target).parents(".js-toggle-dropdown").length &&
                    i(n);
                });
            },
            close: i,
          };
        })()),
      scrollDown =
        (toggleDropdown.bind(),
        {
          bind: function () {
            $(document).on("click", ".js-scroll-down", function (e) {
              e.preventDefault();
              (e = $(this).parents(".js-scroll-this-box")),
                (e = e.outerHeight() + e.position().top);
              $("html, body").animate({ scrollTop: e }, 450);
            });
          },
        }),
      highlightHeadingWord =
        (scrollDown.bind(),
        {
          init: function () {
            $(".js-scroll-down").addClass("state-active");
          },
        }),
      interactions =
        (highlightHeadingWord.init(),
        {
          bind: function () {
            $(document).on("click", ".js-toggle-animation", function (e) {
              e.preventDefault(), $(this).toggleClass("state-active-animation");
            });
          },
        }),
      lightbox =
        (interactions.bind(),
        {
          bind: function () {
            $(document).on("click", ".js-lightbox-single-image", function (e) {
              e.preventDefault();
              var e = document.querySelectorAll(".pswp")[0],
                t = $(this).attr("src"),
                n = $(this).attr("data-height"),
                i = $(this).attr("data-width");
              new PhotoSwipe(
                e,
                PhotoSwipeUI_Default,
                [{ src: t, w: i, h: n }],
                {
                  index: 0,
                  closeEl: !0,
                  captionEl: !0,
                  fullscreenEl: !1,
                  zoomEl: !1,
                  shareEl: !1,
                  counterEl: !1,
                  arrowEl: !0,
                  preloaderEl: !0,
                  history: !1,
                }
              ).init();
            });
          },
        });
    lightbox.bind();
    const customPopup = () => {
      const n = (e, t = 0, n = !1) => {
          e = e.replace("#", "");
          if (n) {
            if (sessionStorage.getItem(e)) return;
            sessionStorage.setItem(e, !0);
          }
          const i = $("#" + e);
          setTimeout(() => {
            i.fadeIn(150),
              $(".js-custom-popup-mask").fadeIn(200),
              0 !== i.length && $("body").addClass("state-fixed-body_popup");
          }, 1e3 * t);
        },
        i = () => {
          $(".js-custom-popup").fadeOut(100),
            $(".js-custom-popup-mask").fadeOut(100),
            $("body").removeClass("state-fixed-body_popup");
        };
      return {
        bindOpen: () => {
          $(document).on("click", ".js-open-custom-popup-button", function (e) {
            e.preventDefault();
            var t = $(this).attr("data-custom-popup-id");
            n(t), e.stopImmediatePropagation();
          });
        },
        bindClose: () => {
          $(document).on(
            "click",
            ".js-close-custom-popup-button",
            function (e) {
              e.preventDefault(), i();
            }
          ),
            $(document).on("keydown", function (e) {
              var t =
                0 !==
                $(".js-custom-popup:not(.popup-component__editor)").length;
              "Escape" === e.key && t && i();
            });
        },
        openPopup: n,
        closeAllPopups: i,
      };
    };
    customPopup().bindOpen(),
      customPopup().bindClose(),
      (window.unicornplatform.openPopup = customPopup().openPopup),
      (window.unicornplatform.closeAllPopups = customPopup().closeAllPopups);
    var scrollTo = {
        init: function () {
          $(document).on(
            "click",
            'a[href^="#"]:not([href="#"]), a[href^="/#"]:not([href="/#"]), .js-scroll-to-id',
            function (e) {
              var t = $(this).attr("href");
              if ("/" === window.location.pathname || -1 === t.indexOf("/#")) {
                e.preventDefault();
                (e = "#" + t.split("#")[1]), (t = $(e));
                const n = $(".nav-02--sticky");
                (e = n.outerHeight() || 0),
                  (t = t.offset().top - e),
                  (e =
                    ($("html, body").animate({ scrollTop: t }, 400),
                    $(".js-menu.state-opened-menu"))),
                  (t = $(".js-open-menu.state-active-burger"));
                0 < e.length && 0 < t.length && openMenu.close(e, t);
              }
            }
          );
        },
      },
      showError =
        (scrollTo.init(),
        {
          showManually: function (e) {
            void 0 !== e && $(".js-form-error-message").text(e),
              $(".js-form-error-box").addClass("state-visible");
          },
          showAutomatically: function () {
            var e = getUrlParameter("error_message");
            0 < e.length &&
              ($(".js-form-error-box").addClass("state-visible"),
              $(".js-form-error-message").text(e));
          },
        }),
      popup =
        (showError.showAutomatically(),
        (window.unicornplatform.stripeCheckout = {
          bind: function () {
            $(document).on("click", "[data-stripe-product-id]", function (e) {
              var t, n, i, r, o, s;
              void 0 !== window.Stripe &&
                void 0 !== window.stripe_public_api_key &&
                "" !== window.stripe_public_api_key &&
                ((s = (t = $(this)).attr("data-stripe-product-id")),
                (n = t.attr("data-successful-payment-url")),
                (i = t.attr("data-cancel-payment-url")),
                ("" !== n && void 0 !== n) ||
                  (n = window.location.href + "?popup_id=successful_payment"),
                ("" !== i && void 0 !== i) ||
                  (i = window.location.href + "?popup_id=cancelled_payment"),
                s &&
                  "" !== s &&
                  (e.preventDefault(),
                  (e = Stripe(window.stripe_public_api_key)),
                  (o = [{ quantity: 1 }]),
                  "plan" === (r = s.split("_")[0])
                    ? (o[0].plan = s)
                    : "sku" === r
                    ? (o[0].sku = s)
                    : "price" === r
                    ? (o[0].price = s)
                    : (alert(
                        "Stripe integration error: wrong product ID was used. Please take a careful look at our guide and copy proper product ID: https://help.unicornplatform.com/en/article/stripe-checkout-integration-1ji5u1/"
                      ),
                      console.error(
                        "A message for the website owner: there has been a mistake in setting up your Stripe integration. Please contact the Unicorn Platform support crew."
                      )),
                  "price" === r
                    ? ((s = t.attr("data-stripe-mode")),
                      e
                        .redirectToCheckout({
                          lineItems: o,
                          mode: s,
                          successUrl: n,
                          cancelUrl: i,
                        })
                        .then(function (e) {
                          e.error &&
                            alert(
                              'The purchase ended up with an error: "' +
                                e.error.message +
                                '" We are sorry.'
                            );
                        }))
                    : e
                        .redirectToCheckout({
                          items: o,
                          successUrl: n,
                          cancelUrl: i,
                        })
                        .then(function (e) {
                          e.error &&
                            alert(
                              'The purchase ended up with an error: "' +
                                e.error.message +
                                '" We are sorry.'
                            );
                        })));
            });
          },
        }),
        window.unicornplatform.stripeCheckout.bind(),
        (function () {
          var t = {
            openSpeed: 150,
            closeSpeed: 50,
            loading: "",
            afterClose: function () {
              var e = { Title: document.title, Url: removeParam("popup_id") };
              history.pushState(e, e.Title, e.Url);
            },
          };
          function n(e) {
            var e = $("#" + e),
              t = e;
            return (t = 0 === e.length ? $("#no_such_popup") : t);
          }
          return {
            openOnPageLoad: function () {
              var e = getUrlParameter("popup_id");
              e && "" !== e && $.featherlight(n(e), t);
            },
            bind: function () {
              $(document).on("click", ".js-open-popup", function (e) {
                e.preventDefault();
                e = $(this).attr("data-popup-id");
                $(this).featherlight(n(e), t);
              });
            },
          };
        })()),
      loadMore,
      $overlayList =
        (popup.openOnPageLoad(),
        popup.bind(),
        null !== localStorage.getItem("allBlogPosts") &&
          ((loadMore = (function () {
            var r = $(".js-post-item"),
              o = $(".js-posts-list"),
              s = r.length,
              a = JSON.parse(localStorage.getItem("allBlogPosts"));
            return {
              bind: function () {
                var t = (a.length - s) / 5;
                $(document).on("click", "#js-load-more", function (e) {
                  if ((e.preventDefault(), 0 < t)) {
                    for (var n = s; n < s + 5 && n < a.length; n++) {
                      var i = r.clone().eq(0);
                      if (
                        (i.find(".js-post-item__img").attr("srcset", null),
                        i.find(".js-post-item__img").attr("sizes", null),
                        i.attr("href", a[n].url),
                        a[n].og_image_url || a[n].first_image_url)
                      ) {
                        let e = a[n].post_thumbnail_srcdict_big,
                          t =
                            (n % 5 != 0 &&
                              (e = a[n].post_thumbnail_srcdict_small),
                            a[n].og_image_url || a[n].first_image_url);
                        e && e.src && (t = e.src),
                          i.find(".js-post-item__img").attr("src", t),
                          e &&
                            e.srcset &&
                            i
                              .find(".js-post-item__img")
                              .attr("srcset", e.srcset),
                          e &&
                            e.sizes &&
                            i.find(".js-post-item__img").attr("sizes", e.sizes);
                      } else
                        i.find(".js-post-item__img").attr("src", null),
                          i
                            .find(".js-post-item__img")
                            .addClass("post-item__img-pattern");
                      i.find(".js-post-item__title").text(a[n].title),
                        a[n].thumbnail_alt
                          ? i
                              .find(".js-post-item__img")
                              .attr("alt", a[n].thumbnail_alt)
                          : i.find(".js-post-item__img").removeAttr("alt"),
                        o.append(i);
                    }
                    (s += 5),
                      t <= 1 && $(".js-load-more-wrapper").hide(),
                      (t -= 1);
                  }
                });
              },
            };
          })()),
          loadMore.bind()),
        $("#js-overlay-list"));
    setTimeout(function () {
      var n, i, r, o;
      $overlayList.hasClass("read-more-zoom") &&
        ((n = $("#js-read-more")),
        (i = $(".js-nav")),
        (r = $(window).height()),
        (o = $overlayList.height()),
        i.css({ transition: "0.6s cubic-bezier(0.33, 1, 0.68, 1)" }),
        $(window).on("scroll", function () {
          var e = n.offset().top,
            t = $(this).scrollTop();
          r < o
            ? e - r < t
              ? ($overlayList.css("transform", "scale(0.92) translateY(-60px)"),
                i.css({ opacity: "0", visibility: "hidden" }))
              : ($overlayList.css("transform", "scale(1)"),
                i.css({ opacity: "1", visibility: "visible" }))
            : o < r &&
              (0 < t
                ? ($overlayList.css(
                    "transform",
                    "scale(0.92) translateY(-60px)"
                  ),
                  i.css({ opacity: "0", visibility: "hidden" }))
                : ($overlayList.css("transform", "scale(1)"),
                  i.css({ opacity: "1", visibility: "visible" })));
        }));
    }, 500);
    const slugifyNew = (e) =>
        window.slugify(
          (e || "")
            .toString()
            .replace(/[!@#$%^&*(),.?":{}|<>`\\/=+_;'\[\]~]/g, "-"),
          { lower: !0 }
        ),
      filterRowsByFilterV2Fn = (i, e) => {
        let r = !0;
        const t = e.filter(
          (e) => !!e.showByFilters && 0 < e.showByFilters.items.length
        );
        return (
          t.forEach((n) => {
            const { mode: e, items: t } = n.showByFilters;
            "all" === e
              ? t
                  .split(";")
                  .filter((e) => !!e)
                  .every((e) => {
                    let t = i[n.column] || "";
                    return (t = Array.isArray(t) ? t.join(";") : t)
                      .toString()
                      .split(";")
                      .map((e) => e.trim())
                      .includes(e);
                  }) || (r = !1)
              : t
                  .split(";")
                  .filter((e) => !!e)
                  .some((e) => {
                    let t = i[n.column] || "";
                    return (t = Array.isArray(t) ? t.join(";") : t)
                      .toString()
                      .split(";")
                      .map((e) => e.trim())
                      .includes(e);
                  }) || (r = !1);
          }),
          r
        );
      },
      filterRowsByFieldsFn = (r, e, t) => {
        var n = (e) => {
          let t = !1,
            n = e;
          if ((e.startsWith("-") && ((n = e.slice(1)), (t = !0)), !(n in r)))
            return !0;
          const i = (r[n] || "").toString().trim();
          return !i || "false" === i.toLowerCase() ? t : !t;
        };
        if ("string" != typeof e || !e.trim()) return !0;
        const i = e.split(";").map((e) => e.trim());
        return "any" === t ? i.some(n) : i.every(n);
      },
      convertToNumber = (e) => {
        if ("string" != typeof e) return parseFloat(e);
        let t = e.replace(/KKK$/i, "B").replace(/KK$/i, "M").replace(/,/g, "");
        return t.toLowerCase().endsWith("k")
          ? 1e3 * parseFloat(t.slice(0, -1))
          : t.toLowerCase().endsWith("m")
          ? 1e6 * parseFloat(t.slice(0, -1))
          : t.toLowerCase().endsWith("b")
          ? 1e9 * parseFloat(t.slice(0, -1))
          : parseFloat(t);
      },
      formatGoogleSheetUrl = (e, t) => {
        if ("string" != typeof e) return e;
        if (!e.startsWith("https://docs.google.com/spreadsheets/")) return e;
        var n = "output=csv",
          e = e
            .replace("pubhtml", "pub?" + n)
            .replace("output=tsv", n)
            .replace("output=pdf", n)
            .replace("output=xlsx", n)
            .replace("output=ods", n);
        return `${t}/get-pages?sheet_url=${encodeURIComponent(e)}&v=2`;
      },
      sortPrimitivesFn = (e, t, n) => {
        return "no_sorting" === n
          ? 0
          : isNaN(convertToNumber(e)) || isNaN(convertToNumber(t))
          ? "z-a" === n
            ? t
                .toString()
                .toLowerCase()
                .localeCompare(e.toString().toLowerCase())
            : e
                .toString()
                .toLowerCase()
                .localeCompare(t.toString().toLowerCase())
          : ((e = convertToNumber(e)),
            (t = convertToNumber(t)),
            "z-a" === n ? t - e : e - t);
      },
      checkIfStringContainsProtocol =
        ((window.upUtils.sortPrimitivesFn = sortPrimitivesFn),
        (e) => {
          const t = new RegExp("^(?:[a-z]+:)?//", "i");
          return t.test(e);
        });
    function replaceWithObjectValues(e, o, s, a, l) {
      return e
        ? e.toString().replace(/\{\{(\w+)\}\}/g, function (e, t) {
            let n = t.toLowerCase();
            var t = "dynamicurl" === n,
              i = "dynamictarget" === n;
            t && (n = s);
            let r = o[n];
            return (
              t &&
                !checkIfStringContainsProtocol(r) &&
                ((r = slugifyNew(r)).startsWith("/") || (r = "/" + r),
                a && "no_prefix" !== a && (r = "/" + a + r)),
              (r = i ? ("same_tab" === l ? "_self" : "_blank") : r)
            );
          })
        : "";
    }
    const unescapeCommas = (n) =>
      Object.keys(n).reduce(
        (e, t) => (
          "string" != typeof n[t]
            ? (e[t] = n[t])
            : (e[t] = n[t].replace(/&comma;/g, ",")),
          e
        ),
        {}
      );
    function showAll(e) {
      e.find(".directory-item-parent").show(),
        e.find(".directory-01__show-more-box").hide();
    }
    const initDirectory = (u) => {
        const c =
            u.data("sheetsapibase") || "https://sheets-api.unicornplatform.com",
          d = u.parents(".page-component__bg_image_box").attr("id"),
          f = 0 < u.parents(".uni-is-dark-bg").length;
        var e = formatGoogleSheetUrl(u.data("cmsurl"), c);
        const p = u.data("directoryitemhtml"),
          h = u.data("sortingfield"),
          m = u.data("searchplaceholder"),
          g = u.data("filterfields"),
          v = u.data("categorycolumn"),
          y = u.data("filteredtagsmode"),
          _ = u.data("filterfieldsmode"),
          E = u.data("sortingorder"),
          b = u.data("showmorebuttontext"),
          w = u.data("dynamicurl"),
          T = u.data("dynamictarget"),
          S = u.data("dynamicurlprefix");
        var t = u.data("buttonversion");
        const I = 2 <= parseInt(t),
          k = "true" === u.data("istagshidden").toString().toLowerCase();
        let C = u.data("topsectionhtml");
        t = JSON5.parse((u.data("filtersv2") || "{}").toString());
        const x = parseInt(u.data("version")),
          A = t.items || [],
          D = u.data("filteredtags");
        let O = parseInt(u.data("maxitems"));
        isNaN(O) && (O = 4);
        const R = u.data("cmstype") || "googleSheets";
        var t = u.data("unicorncollectionid"),
          n = u.data("customapiurl");
        u.data("apibase");
        let P = "";
        if (
          ("unicorn" === R && t && (P = c + "/cms/items?collection_id=" + t),
          "googleSheets" === R && e && (P = e),
          !(P = "custom" === R && n ? n : P) ||
            (!P.startsWith("https://") && !P.startsWith("http://")))
        ) {
          const r = u.find(".directory-01__items");
          return r.html(""), void u.removeClass("dir-is-loading");
        }
        t = getCookie("access_token");
        let i = t ? { headers: { Authorization: "Bearer " + t } } : void 0;
        fetch(P, i)
          .then((e) => {
            if (e.ok) return e.text();
            throw (console.error(e), new Error());
          })
          .then((e) => {
            let o = [],
              t = "text",
              n = null;
            try {
              n = JSON.parse(e);
            } catch (e) {}
            if (
              (n &&
                (Array.isArray(n) && (t = "jsonArray"),
                isKeyValue(n) && (t = "jsonObject")),
              "jsonArray" === t)
            )
              o = n.map((e) => lowerCaseKeys(e));
            else if ("jsonObject" === t)
              if ("googleSheets" === R && P && P.startsWith(c + "/get-pages")) {
                let e = [];
                n && n.items && (e = n.items),
                  (o = e.map((e) => lowerCaseKeys(e)));
              } else o = [lowerCaseKeys(n)];
            else
              o = window.Papa.parse(e, { header: !0 }).data.map((e) =>
                lowerCaseKeys(unescapeCommas(e))
              );
            if (
              (o.forEach((e) => {
                "title" in e && (e.slugified_title = slugifyNew(e.title));
              }),
              (o = o.filter((e) => filterRowsByFieldsFn(e, g, _))),
              A.forEach((i) => {
                const r = [];
                o.forEach((e, t) => {
                  const n = e[i.column];
                  n &&
                    (Array.isArray(n)
                      ? r.push(...n)
                      : r.push(
                          ...n
                            .toString()
                            .split(";")
                            .map((e) => e.trim())
                        ));
                });
                var e = [...new Set(r)];
                i.filters = e;
              }),
              o.sort((e, t) => {
                if (!h) return 0;
                if ("no_sorting" === h) return 0;
                if ("random_sorting" === h) return Math.random() - 0.5;
                if ("string" != typeof h) return 0;
                let n = h.toLowerCase(),
                  i = !1;
                if (
                  (h.startsWith("-") &&
                    ((n = h.slice(1).toLowerCase()), (i = !0)),
                  "descending" === E && (i = !i),
                  !Object.keys(e).includes(n))
                )
                  return 0;
                if (!Object.keys(t).includes(n)) return 0;
                let r = e[n],
                  o = t[n];
                return isNaN(convertToNumber(r)) || isNaN(convertToNumber(o))
                  ? i
                    ? o.toString().localeCompare(r)
                    : r.toString().localeCompare(o)
                  : ((r = convertToNumber(r)),
                    (o = convertToNumber(o)),
                    i ? o - r : r - o);
              }),
              window.uniDirectoryData
                ? (window.uniDirectoryData[d] = o)
                : (window.uniDirectoryData = { [d]: o }),
              (!x || x < 2) &&
                ((C = DEFAULT_DIRECTORY_TOP_SECTION_HTML),
                "no_tags" !== v && 0 === A.length))
            ) {
              let n = [];
              o.forEach((e) => {
                const t = e[v];
                t &&
                  n.push(
                    ...t
                      .toString()
                      .split(";")
                      .map((e) => e.trim())
                  );
              }),
                (n = [...new Set(n)]),
                A.push({
                  id: "legacy-tag",
                  column: v || "category",
                  label: "",
                  sorting: "a-z",
                  multiselect: "off",
                  filters: n,
                  showByFilters: { items: D || "", mode: y || "any" },
                  isHidden: k ? "hidden" : "visible",
                });
            }
            o = o.filter((e) => filterRowsByFilterV2Fn(e, A));
            const s = u.find(".directory-01__items");
            s.html(""),
              o.forEach((i, e) => {
                const t = {};
                A.forEach((e) => {
                  t[e.column] = Array.isArray(i[e.column])
                    ? i[e.column].join(";")
                    : i[e.column];
                });
                let n = "";
                var r = `data-filters='${JSON.stringify(t).replace(
                    /'/g,
                    "&#39;"
                  )}'`,
                  e = `<li class="${Object.keys(i).reduce((e, t) => {
                    const n = (i[t] || "").toString().trim();
                    return n && "false" !== n.toString().toLowerCase()
                      ? e + " dir-has-" + t.toString().trim().replace(/ /g, "-")
                      : e;
                  }, "directory-item-parent")}" ${(n =
                    e >= O
                      ? "style='display:none;'"
                      : n)} ${r}>${replaceWithObjectValues(
                    p,
                    i,
                    w,
                    S,
                    T
                  )}</li>`;
                s.append(e);
              });
            u.find(".directory-01__search-container").replaceWith(
              ((e) => {
                const t = (m || "")
                  .toString()
                  .replace(/{{amount}}/g, o.length.toString());
                if ("string" != typeof e) return e;
                const n = {
                  "{{searchPlaceholder}}": t
                    .replace(/\\/g, "\\\\")
                    .replace(/'/g, "&#39;")
                    .replace(/"/g, '\\"'),
                  "{{id}}": d,
                  "{{amount}}": o.length,
                  "{{debounce}}":
                    500 < o.length
                      ? "600ms"
                      : o.length > DEBOUNCE_ROWS_COUNT
                      ? "300ms"
                      : "1ms",
                  "{{isDarkBg}}": f,
                  "{{filtersV2Items}}": JSON.stringify(A).replace(
                    /'/g,
                    "&#39;"
                  ),
                };
                return e.replace(
                  /{{searchPlaceholder}}|{{amount}}|{{id}}|{{debounce}}|{{isDarkBg}}|{{filtersV2Items}}/g,
                  (e) => n[e]
                );
              })(C)
            );
            const i = u.find(".directory-01__show-more-box");
            if (
              ((!b && I) || (o.length > O && i.show()),
              i.find(".button").on("click", () => {
                showAll(u);
              }),
              u.removeClass("dir-is-loading"),
              u.hasClass("directory-04"))
            ) {
              const r = $(`#${d} .page-component__wrapper`),
                a = $(`#${d} .directory-04`),
                l = a.detach();
              setTimeout(() => {
                r.append(l);
              }, 0);
            }
            window.uniOnDirectorySuccess &&
              "function" == typeof window.uniOnDirectorySuccess &&
              window.uniOnDirectorySuccess(u);
          })
          .catch((e) => {
            console.error("Directory error:", e),
              window.uniOnDirectoryError &&
                "function" == typeof window.uniOnDirectoryError &&
                window.uniOnDirectoryError(u);
          });
      },
      $directories = $(".js-directory"),
      initLoadMore =
        ($directories.each(function () {
          initDirectory($(this));
        }),
        (window.unicornplatform.initDirectory = initDirectory),
        $(".chosen-select").each(function () {
          const e = $(this);
          var t = e.data("noresultstext") || "No results match";
          e.chosen({
            hide_results_on_select: !1,
            width: "100%",
            no_results_text: t,
          });
        }),
        () => {
          const n = $("#loading-posts-wrapper"),
            i = (e) => {
              const o = $(".js-posts-list");
              e.forEach((e) => {
                let t = 'class="js-post-item__img post-item__img"',
                  n =
                    (e.og_image_url ||
                      e.first_image_url ||
                      (t =
                        'class="js-post-item__img post-item__img post-item__img-pattern"'),
                    ""),
                  i =
                    (e.thumbnail_alt && e.og_image_url
                      ? (n = `alt="${e.thumbnail_alt}"`)
                      : e.is_seobot_post &&
                        e.og_image_url &&
                        (n = `alt="${e.title}"`),
                    null),
                  r =
                    ((e.og_image_url || e.first_image_url) &&
                      (i =
                        window.blogHomeData.currentPostsCount % 5 == 0
                          ? e.post_thumbnail_srcdict_big
                          : e.post_thumbnail_srcdict_small),
                    e.og_image_url
                      ? "src=" + e.og_image_url
                      : "src=" + e.first_image_url);
                i &&
                  window.blogHomeData.isImageOptimizationOn &&
                  ((r = ""),
                  i.src &&
                    (r += `
src="${i.src}"`),
                  i.srcset &&
                    (r += `
srcset="${i.srcset}"`),
                  i.sizes &&
                    (r += `
sizes="${i.sizes}"`));
                e = $(`
          <a class="js-post-item post-item bg-medium-hover link" href="${e.url}" target="_blank">
            <img 
              ${t}
              ${n}
              ${r}
            >
            <h3 class="js-post-item__title post-item__title">${e.title}</h3>
          </a>
        `);
                o.append(e), (window.blogHomeData.currentPostsCount += 1);
              });
            },
            r = () => {
              window.blogHomeData.isPostsLoading = !0;
              let e =
                `${window.blogHomeData.apiBase}/api/v1/blog_posts/get_posts_for_homepage/${window.blogHomeData.websiteSubdomain}?current_posts_count=${window.blogHomeData.currentPostsCount}&path=${window.blogHomeData.path}&new_posts_count=15&render_time=` +
                window.blogHomeData.renderTime;
              window.blogHomeData.isImageOptimizationOn &&
                (e += "&is_image_optimization_on=true"),
                $.ajax({
                  type: "GET",
                  url: e,
                  cache: !1,
                  contentType: "application/json",
                })
                  .done((e) => {
                    var t = n.offset().top;
                    if (
                      (t && window.scrollY >= t && $(window).scrollTop(t - 160),
                      i(e),
                      window.blogHomeData.currentPostsCount >=
                        window.blogHomeData.totalPostsCount || 0 === e.length)
                    )
                      return n.remove(), void o.disconnect();
                    window.blogHomeData.isPostsLoading = !1;
                  })
                  .fail((e) => {
                    console.error("error: ", e),
                      (window.blogHomeData.isPostsLoading = !1);
                  });
            },
            o = new IntersectionObserver((e, t) => {
              e.forEach((e) => {
                e.isIntersecting && !window.blogHomeData.isPostsLoading && r();
              });
            });
          0 < n.length && o.observe(n[0]),
            (window.unicornplatform.loadMorePosts = r),
            (window.unicornplatform.renderBlogPosts = i);
        }),
      inputElements =
        (initLoadMore(), document.querySelectorAll(".js-file-input"));
    inputElements.forEach((e) => {
      const t = parseInt(e.dataset.maxFiles || 1);
      var n = (e.dataset.allowedFileTypes || "")
          .toString()
          .toLowerCase()
          .replace(/ /g, "")
          .split(";")
          .filter((e) => !!e),
        i = e.dataset.apibase || "https://app.unicornplatform.com",
        e = FilePond.create(e, {
          server: i + "/api/v1/meta/upload_file_to_cdn",
          credits: !1,
          allowReorder: !0,
          maxFileSize: "10MB",
          maxFiles: t,
          acceptedFileTypes: n,
          allowMultiple: 1 < t,
          onwarning: (e) => {
            console.log("error: ", e),
              e &&
                "Max files" === e.body &&
                alert(`Error: You can upload up to ${t} files.`);
          },
        });
      window.filepondRefs
        ? window.filepondRefs.push(e)
        : (window.filepondRefs = [e]);
    });
  });
var widgets = {
    bindClose: function () {
      $(document).on("click", ".js-close-widget", function (e) {
        e.preventDefault();
        e = $(this).attr("data-widget-id");
        $("#" + e).toggleClass("state-visible"),
          (localStorage["unicorn-widget-" + e] = "hidden");
      });
    },
    bindInit: function () {
      var e,
        t = $(".js-widget");
      0 < t.length &&
        ((e = t.attr("id")),
        "hidden" !== localStorage["unicorn-widget-" + e] &&
          setTimeout(function () {
            t.toggleClass("state-visible");
          }, 2e3));
    },
  },
  languageSwitchHreflangs =
    (widgets.bindClose(),
    widgets.bindInit(),
    {
      bind: function () {
        if (0 < $(".js-lang-widget").length) {
          let n = $(".js-language-link");
          if (0 < n.length) {
            let t = $('link[rel="alternate"]');
            if (0 < t.length)
              for (let e = 0; e < t.length; e++) {
                var i = t.eq(e).attr("hreflang"),
                  r = t.eq(e).attr("href");
                if (i && "" !== i && r && "" !== r)
                  for (let t = 0; t < n.length; t++) {
                    let e = n.eq(t);
                    e.attr("data-lang-code") === i && e.attr("href", r);
                  }
              }
          }
        }
      },
    });
languageSwitchHreflangs.bind();
