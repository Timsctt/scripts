(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TockReact = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  /*

  Based off glamor's StyleSheet, thanks Sunil ❤️

  high performance StyleSheet for css-in-js systems

  - uses multiple style tags behind the scenes for millions of rules
  - uses `insertRule` for appending in production for *much* faster performance

  // usage

  import { StyleSheet } from '@emotion/sheet'

  let styleSheet = new StyleSheet({ key: '', container: document.head })

  styleSheet.insert('#box { border: 1px solid red; }')
  - appends a css rule into the stylesheet

  styleSheet.flush()
  - empties the stylesheet of all its contents

  */
  // $FlowFixMe
  function sheetForTag(tag) {
    if (tag.sheet) {
      // $FlowFixMe
      return tag.sheet;
    } // this weirdness brought to you by firefox

    /* istanbul ignore next */


    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        // $FlowFixMe
        return document.styleSheets[i];
      }
    }
  }

  function createStyleElement(options) {
    var tag = document.createElement('style');
    tag.setAttribute('data-emotion', options.key);

    if (options.nonce !== undefined) {
      tag.setAttribute('nonce', options.nonce);
    }

    tag.appendChild(document.createTextNode(''));
    return tag;
  }

  var StyleSheet =
  /*#__PURE__*/
  function () {
    function StyleSheet(options) {
      this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

      this.key = options.key;
      this.container = options.container;
      this.before = null;
    }

    var _proto = StyleSheet.prototype;

    _proto.insert = function insert(rule) {
      // the max length is how many rules we have per style tag, it's 65000 in speedy mode
      // it's 1 in dev because we insert source maps that map a single rule to a location
      // and you can only have one source map per style tag
      if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
        var _tag = createStyleElement(this);

        var before;

        if (this.tags.length === 0) {
          before = this.before;
        } else {
          before = this.tags[this.tags.length - 1].nextSibling;
        }

        this.container.insertBefore(_tag, before);
        this.tags.push(_tag);
      }

      var tag = this.tags[this.tags.length - 1];

      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);

        try {
          // this is a really hot path
          // we check the second character first because having "i"
          // as the second character will happen less often than
          // having "@" as the first character
          var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
          // the big drawback is that the css won't be editable in devtools

          sheet.insertRule(rule, // we need to insert @import rules before anything else
          // otherwise there will be an error
          // technically this means that the @import rules will
          // _usually_(not always since there could be multiple style tags)
          // be the first ones in prod and generally later in dev
          // this shouldn't really matter in the real world though
          // @import is generally only used for font faces from google fonts and etc.
          // so while this could be technically correct then it would be slower and larger
          // for a tiny bit of correctness that won't matter in the real world
          isImportRule ? 0 : sheet.cssRules.length);
        } catch (e) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }

      this.ctr++;
    };

    _proto.flush = function flush() {
      // $FlowFixMe
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };

    return StyleSheet;
  }();

  function stylis_min (W) {
    function M(d, c, e, h, a) {
      for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
        g = e.charCodeAt(l);
        l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

        if (0 === b + n + v + m) {
          if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
            switch (g) {
              case 32:
              case 9:
              case 59:
              case 13:
              case 10:
                break;

              default:
                f += e.charAt(l);
            }

            g = 59;
          }

          switch (g) {
            case 123:
              f = f.trim();
              q = f.charCodeAt(0);
              k = 1;

              for (t = ++l; l < B;) {
                switch (g = e.charCodeAt(l)) {
                  case 123:
                    k++;
                    break;

                  case 125:
                    k--;
                    break;

                  case 47:
                    switch (g = e.charCodeAt(l + 1)) {
                      case 42:
                      case 47:
                        a: {
                          for (u = l + 1; u < J; ++u) {
                            switch (e.charCodeAt(u)) {
                              case 47:
                                if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                  l = u + 1;
                                  break a;
                                }

                                break;

                              case 10:
                                if (47 === g) {
                                  l = u + 1;
                                  break a;
                                }

                            }
                          }

                          l = u;
                        }

                    }

                    break;

                  case 91:
                    g++;

                  case 40:
                    g++;

                  case 34:
                  case 39:
                    for (; l++ < J && e.charCodeAt(l) !== g;) {
                    }

                }

                if (0 === k) break;
                l++;
              }

              k = e.substring(t, l);
              0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

              switch (q) {
                case 64:
                  0 < r && (f = f.replace(N, ''));
                  g = f.charCodeAt(1);

                  switch (g) {
                    case 100:
                    case 109:
                    case 115:
                    case 45:
                      r = c;
                      break;

                    default:
                      r = O;
                  }

                  k = M(c, r, k, g, a + 1);
                  t = k.length;
                  0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                  if (0 < t) switch (g) {
                    case 115:
                      f = f.replace(da, ea);

                    case 100:
                    case 109:
                    case 45:
                      k = f + '{' + k + '}';
                      break;

                    case 107:
                      f = f.replace(fa, '$1 $2');
                      k = f + '{' + k + '}';
                      k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                      break;

                    default:
                      k = f + k, 112 === h && (k = (p += k, ''));
                  } else k = '';
                  break;

                default:
                  k = M(c, X(c, f, I), k, h, a + 1);
              }

              F += k;
              k = I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
              break;

            case 125:
            case 59:
              f = (0 < r ? f.replace(N, '') : f).trim();
              if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
                case 0:
                  break;

                case 64:
                  if (105 === g || 99 === g) {
                    G += f + e.charAt(l);
                    break;
                  }

                default:
                  58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
              }
              I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
          }
        }

        switch (g) {
          case 13:
          case 10:
            47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
            0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
            z = 1;
            D++;
            break;

          case 59:
          case 125:
            if (0 === b + n + v + m) {
              z++;
              break;
            }

          default:
            z++;
            y = e.charAt(l);

            switch (g) {
              case 9:
              case 32:
                if (0 === n + m + b) switch (x) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y = '';
                    break;

                  default:
                    32 !== g && (y = ' ');
                }
                break;

              case 0:
                y = '\\0';
                break;

              case 12:
                y = '\\f';
                break;

              case 11:
                y = '\\v';
                break;

              case 38:
                0 === n + b + m && (r = I = 1, y = '\f' + y);
                break;

              case 108:
                if (0 === n + b + m + E && 0 < u) switch (l - u) {
                  case 2:
                    112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                  case 8:
                    111 === K && (E = K);
                }
                break;

              case 58:
                0 === n + b + m && (u = l);
                break;

              case 44:
                0 === b + v + n + m && (r = 1, y += '\r');
                break;

              case 34:
              case 39:
                0 === b && (n = n === g ? 0 : 0 === n ? g : n);
                break;

              case 91:
                0 === n + b + v && m++;
                break;

              case 93:
                0 === n + b + v && m--;
                break;

              case 41:
                0 === n + b + m && v--;
                break;

              case 40:
                if (0 === n + b + m) {
                  if (0 === q) switch (2 * x + 3 * K) {
                    case 533:
                      break;

                    default:
                      q = 1;
                  }
                  v++;
                }

                break;

              case 64:
                0 === b + v + n + m + u + k && (k = 1);
                break;

              case 42:
              case 47:
                if (!(0 < n + m + v)) switch (b) {
                  case 0:
                    switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                      case 235:
                        b = 47;
                        break;

                      case 220:
                        t = l, b = 42;
                    }

                    break;

                  case 42:
                    47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
                }
            }

            0 === b && (f += y);
        }

        K = x;
        x = g;
        l++;
      }

      t = p.length;

      if (0 < t) {
        r = c;
        if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
        p = r.join(',') + '{' + p + '}';

        if (0 !== w * E) {
          2 !== w || L(p, 2) || (E = 0);

          switch (E) {
            case 111:
              p = p.replace(ha, ':-moz-$1') + p;
              break;

            case 112:
              p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
          }

          E = 0;
        }
      }

      return G + p + F;
    }

    function X(d, c, e) {
      var h = c.trim().split(ia);
      c = h;
      var a = h.length,
          m = d.length;

      switch (m) {
        case 0:
        case 1:
          var b = 0;

          for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
            c[b] = Z(d, c[b], e).trim();
          }

          break;

        default:
          var v = b = 0;

          for (c = []; b < a; ++b) {
            for (var n = 0; n < m; ++n) {
              c[v++] = Z(d[n] + ' ', h[b], e).trim();
            }
          }

      }

      return c;
    }

    function Z(d, c, e) {
      var h = c.charCodeAt(0);
      33 > h && (h = (c = c.trim()).charCodeAt(0));

      switch (h) {
        case 38:
          return c.replace(F, '$1' + d.trim());

        case 58:
          return d.trim() + c.replace(F, '$1' + d.trim());

        default:
          if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
      }

      return d + c;
    }

    function P(d, c, e, h) {
      var a = d + ';',
          m = 2 * c + 3 * e + 4 * h;

      if (944 === m) {
        d = a.indexOf(':', 9) + 1;
        var b = a.substring(d, a.length - 1).trim();
        b = a.substring(0, d).trim() + b + ';';
        return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
      }

      if (0 === w || 2 === w && !L(a, 1)) return a;

      switch (m) {
        case 1015:
          return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

        case 951:
          return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

        case 963:
          return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

        case 1009:
          if (100 !== a.charCodeAt(4)) break;

        case 969:
        case 942:
          return '-webkit-' + a + a;

        case 978:
          return '-webkit-' + a + '-moz-' + a + a;

        case 1019:
        case 983:
          return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

        case 883:
          if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
          if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
          break;

        case 932:
          if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
            case 103:
              return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

            case 115:
              return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

            case 98:
              return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
          }
          return '-webkit-' + a + '-ms-' + a + a;

        case 964:
          return '-webkit-' + a + '-ms-flex-' + a + a;

        case 1023:
          if (99 !== a.charCodeAt(8)) break;
          b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
          return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

        case 1005:
          return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

        case 1e3:
          b = a.substring(13).trim();
          c = b.indexOf('-') + 1;

          switch (b.charCodeAt(0) + b.charCodeAt(c)) {
            case 226:
              b = a.replace(G, 'tb');
              break;

            case 232:
              b = a.replace(G, 'tb-rl');
              break;

            case 220:
              b = a.replace(G, 'lr');
              break;

            default:
              return a;
          }

          return '-webkit-' + a + '-ms-' + b + a;

        case 1017:
          if (-1 === a.indexOf('sticky', 9)) break;

        case 975:
          c = (a = d).length - 10;
          b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

          switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
            case 203:
              if (111 > b.charCodeAt(8)) break;

            case 115:
              a = a.replace(b, '-webkit-' + b) + ';' + a;
              break;

            case 207:
            case 102:
              a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
          }

          return a + ';';

        case 938:
          if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
            case 105:
              return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

            case 115:
              return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

            default:
              return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
          }
          break;

        case 973:
        case 989:
          if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

        case 931:
        case 953:
          if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
          break;

        case 962:
          if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
      }

      return a;
    }

    function L(d, c) {
      var e = d.indexOf(1 === c ? ':' : '{'),
          h = d.substring(0, 3 !== c ? e : 10);
      e = d.substring(e + 1, d.length - 1);
      return R(2 !== c ? h : h.replace(na, '$1'), e, c);
    }

    function ea(d, c) {
      var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
      return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
    }

    function H(d, c, e, h, a, m, b, v, n, q) {
      for (var g = 0, x = c, w; g < A; ++g) {
        switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
          case void 0:
          case !1:
          case !0:
          case null:
            break;

          default:
            x = w;
        }
      }

      if (x !== c) return x;
    }

    function T(d) {
      switch (d) {
        case void 0:
        case null:
          A = S.length = 0;
          break;

        default:
          if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
            T(d[c]);
          } else Y = !!d | 0;
      }

      return T;
    }

    function U(d) {
      d = d.prefix;
      void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
      return U;
    }

    function B(d, c) {
      var e = d;
      33 > e.charCodeAt(0) && (e = e.trim());
      V = e;
      e = [V];

      if (0 < A) {
        var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
        void 0 !== h && 'string' === typeof h && (c = h);
      }

      var a = M(O, e, c, 0, 0);
      0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
      V = '';
      E = 0;
      z = D = 1;
      return a;
    }

    var ca = /^\0+/g,
        N = /[\0\r\f]/g,
        aa = /: */g,
        ka = /zoo|gra/,
        ma = /([,: ])(transform)/g,
        ia = /,\r+?/g,
        F = /([\t\r\n ])*\f?&/g,
        fa = /@(k\w+)\s*(\S*)\s*/,
        Q = /::(place)/g,
        ha = /:(read-only)/g,
        G = /[svh]\w+-[tblr]{2}/,
        da = /\(\s*(.*)\s*\)/g,
        oa = /([\s\S]*?);/g,
        ba = /-self|flex-/g,
        na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
        la = /stretch|:\s*\w+\-(?:conte|avail)/,
        ja = /([^-])(image-set\()/,
        z = 1,
        D = 1,
        E = 0,
        w = 1,
        O = [],
        S = [],
        A = 0,
        R = null,
        Y = 0,
        V = '';
    B.use = T;
    B.set = U;
    void 0 !== W && U(W);
    return B;
  }

  var weakMemoize = function weakMemoize(func) {
    // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
    var cache = new WeakMap();
    return function (arg) {
      if (cache.has(arg)) {
        // $FlowFixMe
        return cache.get(arg);
      }

      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };

  // https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
  // inlined to avoid umd wrapper and peerDep warnings/installing stylis
  // since we use stylis after closure compiler
  var delimiter = '/*|*/';
  var needle = delimiter + '}';

  function toSheet(block) {
    if (block) {
      Sheet.current.insert(block + '}');
    }
  }

  var Sheet = {
    current: null
  };
  var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
    switch (context) {
      // property
      case 1:
        {
          switch (content.charCodeAt(0)) {
            case 64:
              {
                // @import
                Sheet.current.insert(content + ';');
                return '';
              }
            // charcode for l

            case 108:
              {
                // charcode for b
                // this ignores label
                if (content.charCodeAt(2) === 98) {
                  return '';
                }
              }
          }

          break;
        }
      // selector

      case 2:
        {
          if (ns === 0) return content + delimiter;
          break;
        }
      // at-rule

      case 3:
        {
          switch (ns) {
            // @font-face, @page
            case 102:
            case 112:
              {
                Sheet.current.insert(selectors[0] + content);
                return '';
              }

            default:
              {
                return content + (at === 0 ? delimiter : '');
              }
          }
        }

      case -2:
        {
          content.split(needle).forEach(toSheet);
        }
    }
  };
  var removeLabel = function removeLabel(context, content) {
    if (context === 1 && // charcode for l
    content.charCodeAt(0) === 108 && // charcode for b
    content.charCodeAt(2) === 98 // this ignores label
    ) {
        return '';
      }
  };

  var isBrowser = typeof document !== 'undefined';
  var rootServerStylisCache = {};
  var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
    var getCache = weakMemoize(function () {
      return {};
    });
    var prefixTrueCache = {};
    var prefixFalseCache = {};
    return function (prefix) {
      if (prefix === undefined || prefix === true) {
        return prefixTrueCache;
      }

      if (prefix === false) {
        return prefixFalseCache;
      }

      return getCache(prefix);
    };
  });

  var createCache = function createCache(options) {
    if (options === undefined) options = {};
    var key = options.key || 'css';
    var stylisOptions;

    if (options.prefix !== undefined) {
      stylisOptions = {
        prefix: options.prefix
      };
    }

    var stylis = new stylis_min(stylisOptions);

    var inserted = {}; // $FlowFixMe

    var container;

    if (isBrowser) {
      container = options.container || document.head;
      var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
      Array.prototype.forEach.call(nodes, function (node) {
        var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

        attrib.split(' ').forEach(function (id) {
          inserted[id] = true;
        });

        if (node.parentNode !== container) {
          container.appendChild(node);
        }
      });
    }

    var _insert;

    if (isBrowser) {
      stylis.use(options.stylisPlugins)(ruleSheet);

      _insert = function insert(selector, serialized, sheet, shouldCache) {
        var name = serialized.name;
        Sheet.current = sheet;

        stylis(selector, serialized.styles);

        if (shouldCache) {
          cache.inserted[name] = true;
        }
      };
    } else {
      stylis.use(removeLabel);
      var serverStylisCache = rootServerStylisCache;

      if (options.stylisPlugins || options.prefix !== undefined) {
        stylis.use(options.stylisPlugins); // $FlowFixMe

        serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
      }

      var getRules = function getRules(selector, serialized) {
        var name = serialized.name;

        if (serverStylisCache[name] === undefined) {
          serverStylisCache[name] = stylis(selector, serialized.styles);
        }

        return serverStylisCache[name];
      };

      _insert = function _insert(selector, serialized, sheet, shouldCache) {
        var name = serialized.name;
        var rules = getRules(selector, serialized);

        if (cache.compat === undefined) {
          // in regular mode, we don't set the styles on the inserted cache
          // since we don't need to and that would be wasting memory
          // we return them so that they are rendered in a style tag
          if (shouldCache) {
            cache.inserted[name] = true;
          }

          return rules;
        } else {
          // in compat mode, we put the styles on the inserted cache so
          // that emotion-server can pull out the styles
          // except when we don't want to cache it which was in Global but now
          // is nowhere but we don't want to do a major right now
          // and just in case we're going to leave the case here
          // it's also not affecting client side bundle size
          // so it's really not a big deal
          if (shouldCache) {
            cache.inserted[name] = rules;
          } else {
            return rules;
          }
        }
      };
    }

    var cache = {
      key: key,
      sheet: new StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    };
    return cache;
  };

  var isBrowser$1 = typeof document !== 'undefined';
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = '';
    classNames.split(' ').forEach(function (className) {
      if (registered[className] !== undefined) {
        registeredStyles.push(registered[className]);
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var insertStyles = function insertStyles(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;

    if ( // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
      cache.registered[className] = serialized.styles;
    }

    if (cache.inserted[serialized.name] === undefined) {
      var stylesForSSR = '';
      var current = serialized;

      do {
        var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

        if (!isBrowser$1 && maybeStyles !== undefined) {
          stylesForSSR += maybeStyles;
        }

        current = current.next;
      } while (current !== undefined);

      if (!isBrowser$1 && stylesForSSR.length !== 0) {
        return stylesForSSR;
      }
    }
  };

  /* eslint-disable */
  // Inspired by https://github.com/garycourt/murmurhash-js
  // Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
  function murmur2(str) {
    // 'm' and 'r' are mixing constants generated offline.
    // They're not really 'magic', they just happen to work well.
    // const m = 0x5bd1e995;
    // const r = 24;
    // Initialize the hash
    var h = 0; // Mix 4 bytes at a time into the hash

    var k,
        i = 0,
        len = str.length;

    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
      k ^=
      /* k >>> r: */
      k >>> 24;
      h =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Handle the last few bytes of the input array


    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h =
        /* Math.imul(h, m): */
        (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Do a few final mixes of the hash to ensure the last few
    // bytes are well-incorporated.


    h ^= h >>> 13;
    h =
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }

  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

  var isCustomProperty = function isCustomProperty(property) {
    return property.charCodeAt(1) === 45;
  };

  var isProcessableValue = function isProcessableValue(value) {
    return value != null && typeof value !== 'boolean';
  };

  var processStyleName = memoize(function (styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
  });

  var processStyleValue = function processStyleValue(key, value) {
    switch (key) {
      case 'animation':
      case 'animationName':
        {
          if (typeof value === 'string') {
            return value.replace(animationRegex, function (match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
    }

    if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
      return value + 'px';
    }

    return value;
  };

  function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
    if (interpolation == null) {
      return '';
    }

    if (interpolation.__emotion_styles !== undefined) {

      return interpolation;
    }

    switch (typeof interpolation) {
      case 'boolean':
        {
          return '';
        }

      case 'object':
        {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }

          if (interpolation.styles !== undefined) {
            var next = interpolation.next;

            if (next !== undefined) {
              // not the most efficient thing ever but this is a pretty rare case
              // and there will be very few iterations of this generally
              while (next !== undefined) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }

            var styles = interpolation.styles + ";";

            return styles;
          }

          return createStringFromObject(mergedProps, registered, interpolation);
        }

      case 'function':
        {
          if (mergedProps !== undefined) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
          }

          break;
        }
    } // finalize string values (regular strings and functions interpolated into css calls)


    if (registered == null) {
      return interpolation;
    }

    var cached = registered[interpolation];

    return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
  }

  function createStringFromObject(mergedProps, registered, obj) {
    var string = '';

    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i], false);
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];

        if (typeof value !== 'object') {
          if (registered != null && registered[value] !== undefined) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
          }

          if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value, false);

            switch (_key) {
              case 'animation':
              case 'animationName':
                {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }

              default:
                {

                  string += _key + "{" + interpolated + "}";
                }
            }
          }
        }
      }
    }

    return string;
  }

  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
  // keyframes are stored on the SerializedStyles object as a linked list


  var cursor;
  var serializeStyles = function serializeStyles(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
      return args[0];
    }

    var stringMode = true;
    var styles = '';
    cursor = undefined;
    var strings = args[0];

    if (strings == null || strings.raw === undefined) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings, false);
    } else {

      styles += strings[0];
    } // we start at 1 since we've already handled the first arg


    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

      if (stringMode) {

        styles += strings[i];
      }
    }


    labelPattern.lastIndex = 0;
    var identifierName = '';
    var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

    while ((match = labelPattern.exec(styles)) !== null) {
      identifierName += '-' + // $FlowFixMe we know it's not null
      match[1];
    }

    var name = murmur2(styles) + identifierName;

    return {
      name: name,
      styles: styles,
      next: cursor
    };
  };

  function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return serializeStyles(args);
  }

  var isBrowser$2 = typeof document !== 'undefined';

  var EmotionCacheContext = React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== 'undefined' ? createCache() : null);
  var ThemeContext = React.createContext({});
  var CacheProvider = EmotionCacheContext.Provider;

  var withEmotionCache = function withEmotionCache(func) {
    var render = function render(props, ref) {
      return React.createElement(EmotionCacheContext.Consumer, null, function (cache) {
        return func(props, cache, ref);
      });
    }; // $FlowFixMe


    return React.forwardRef(render);
  };

  if (!isBrowser$2) {
    var BasicProvider =
    /*#__PURE__*/
    function (_React$Component) {
      inheritsLoose(BasicProvider, _React$Component);

      function BasicProvider(props, context, updater) {
        var _this;

        _this = _React$Component.call(this, props, context, updater) || this;
        _this.state = {
          value: createCache()
        };
        return _this;
      }

      var _proto = BasicProvider.prototype;

      _proto.render = function render() {
        return React.createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
      };

      return BasicProvider;
    }(React.Component);

    withEmotionCache = function withEmotionCache(func) {
      return function (props) {
        return React.createElement(EmotionCacheContext.Consumer, null, function (context) {
          if (context === null) {
            return React.createElement(BasicProvider, null, function (newContext) {
              return func(props, newContext);
            });
          } else {
            return func(props, context);
          }
        });
      };
    };
  }

  var keyframes = function keyframes() {
    var insertable = css.apply(void 0, arguments);
    var name = "animation-" + insertable.name; // $FlowFixMe

    return {
      name: name,
      styles: "@keyframes " + name + "{" + insertable.styles + "}",
      anim: 1,
      toString: function toString() {
        return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
      }
    };
  };

  var classnames = function classnames(args) {
    var len = args.length;
    var i = 0;
    var cls = '';

    for (; i < len; i++) {
      var arg = args[i];
      if (arg == null) continue;
      var toAdd = void 0;

      switch (typeof arg) {
        case 'boolean':
          break;

        case 'object':
          {
            if (Array.isArray(arg)) {
              toAdd = classnames(arg);
            } else {
              toAdd = '';

              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += ' ');
                  toAdd += k;
                }
              }
            }

            break;
          }

        default:
          {
            toAdd = arg;
          }
      }

      if (toAdd) {
        cls && (cls += ' ');
        cls += toAdd;
      }
    }

    return cls;
  };

  function merge(registered, css, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  var ClassNames = withEmotionCache(function (props, context) {
    return React.createElement(ThemeContext.Consumer, null, function (theme) {
      var rules = '';
      var serializedHashes = '';
      var hasRendered = false;

      var css = function css() {
        if (hasRendered && "production" !== 'production') {
          throw new Error('css can only be used during render');
        }

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var serialized = serializeStyles(args, context.registered);

        if (isBrowser$2) {
          insertStyles(context, serialized, false);
        } else {
          var res = insertStyles(context, serialized, false);

          if (res !== undefined) {
            rules += res;
          }
        }

        if (!isBrowser$2) {
          serializedHashes += " " + serialized.name;
        }

        return context.key + "-" + serialized.name;
      };

      var cx = function cx() {
        if (hasRendered && "production" !== 'production') {
          throw new Error('cx can only be used during render');
        }

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return merge(context.registered, css, classnames(args));
      };

      var content = {
        css: css,
        cx: cx,
        theme: theme
      };
      var ele = props.children(content);
      hasRendered = true;

      if (!isBrowser$2 && rules.length !== 0) {
        var _ref;

        return React.createElement(React.Fragment, null, React.createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref.nonce = context.sheet.nonce, _ref)), ele);
      }

      return ele;
    });
  });

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  });

  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
  Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
  function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
  var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
  var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
  var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

  var reactIs_production_min = {
  	AsyncMode: AsyncMode,
  	ConcurrentMode: ConcurrentMode,
  	ContextConsumer: ContextConsumer,
  	ContextProvider: ContextProvider,
  	Element: Element,
  	ForwardRef: ForwardRef,
  	Fragment: Fragment,
  	Lazy: Lazy,
  	Memo: Memo,
  	Portal: Portal,
  	Profiler: Profiler,
  	StrictMode: StrictMode,
  	Suspense: Suspense,
  	isAsyncMode: isAsyncMode,
  	isConcurrentMode: isConcurrentMode,
  	isContextConsumer: isContextConsumer,
  	isContextProvider: isContextProvider,
  	isElement: isElement,
  	isForwardRef: isForwardRef,
  	isFragment: isFragment,
  	isLazy: isLazy,
  	isMemo: isMemo,
  	isPortal: isPortal,
  	isProfiler: isProfiler,
  	isStrictMode: isStrictMode,
  	isSuspense: isSuspense,
  	isValidElementType: isValidElementType,
  	typeOf: typeOf
  };

  var reactIs_development = createCommonjsModule(function (module, exports) {
  });
  var reactIs_development_1 = reactIs_development.AsyncMode;
  var reactIs_development_2 = reactIs_development.ConcurrentMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Lazy;
  var reactIs_development_9 = reactIs_development.Memo;
  var reactIs_development_10 = reactIs_development.Portal;
  var reactIs_development_11 = reactIs_development.Profiler;
  var reactIs_development_12 = reactIs_development.StrictMode;
  var reactIs_development_13 = reactIs_development.Suspense;
  var reactIs_development_14 = reactIs_development.isAsyncMode;
  var reactIs_development_15 = reactIs_development.isConcurrentMode;
  var reactIs_development_16 = reactIs_development.isContextConsumer;
  var reactIs_development_17 = reactIs_development.isContextProvider;
  var reactIs_development_18 = reactIs_development.isElement;
  var reactIs_development_19 = reactIs_development.isForwardRef;
  var reactIs_development_20 = reactIs_development.isFragment;
  var reactIs_development_21 = reactIs_development.isLazy;
  var reactIs_development_22 = reactIs_development.isMemo;
  var reactIs_development_23 = reactIs_development.isPortal;
  var reactIs_development_24 = reactIs_development.isProfiler;
  var reactIs_development_25 = reactIs_development.isStrictMode;
  var reactIs_development_26 = reactIs_development.isSuspense;
  var reactIs_development_27 = reactIs_development.isValidElementType;
  var reactIs_development_28 = reactIs_development.typeOf;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_production_min;
  }
  });

  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var getTheme = function getTheme(outerTheme, theme) {
    if (typeof theme === 'function') {
      var mergedTheme = theme(outerTheme);

      return mergedTheme;
    }

    return _objectSpread({}, outerTheme, {}, theme);
  };

  var createCacheWithTheme = weakMemoize(function (outerTheme) {
    return weakMemoize(function (theme) {
      return getTheme(outerTheme, theme);
    });
  });

  var ThemeProvider = function ThemeProvider(props) {
    return React.createElement(ThemeContext.Consumer, null, function (theme) {
      if (props.theme !== theme) {
        theme = createCacheWithTheme(theme)(props.theme);
      }

      return React.createElement(ThemeContext.Provider, {
        value: theme
      }, props.children);
    });
  };

  function useTheme() {
    return React__default.useContext(ThemeContext);
  }

  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function getMergeFunction(key, options) {
  	if (!options.customMerge) {
  		return deepmerge
  	}
  	var customMerge = options.customMerge(key);
  	return typeof customMerge === 'function' ? customMerge : deepmerge
  }

  function getEnumerableOwnPropertySymbols(target) {
  	return Object.getOwnPropertySymbols
  		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
  			return target.propertyIsEnumerable(symbol)
  		})
  		: []
  }

  function getKeys(target) {
  	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  }

  function propertyIsOnObject(object, property) {
  	try {
  		return property in object
  	} catch(_) {
  		return false
  	}
  }

  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
  	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		getKeys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	getKeys(source).forEach(function(key) {
  		if (propertyIsUnsafe(target, key)) {
  			return
  		}

  		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
  			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  		} else {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  	// implementations can use it. The caller may not replace it.
  	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

  var cjs = deepmerge_1;

  function TockThemeProvider(props) {
      const theme = props.theme;
      if (!theme.overrides) {
          console.warn('[Theme deprecated] You seem providing a deprecated theme.\n Since version 20.3.4 you must provide a theme build by using "createTheme" function and the new TockTheme interface.');
          return ThemeProvider(cjs({ theme: createTockTheme({}) }, Object.assign({}, props)));
      }
      else {
          return ThemeProvider(props);
      }
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

  var index = memoize(function (prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
    /* o */
    && prop.charCodeAt(1) === 110
    /* n */
    && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
  );

  var testOmitPropsOnStringTag = index;

  var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
    return key !== 'theme' && key !== 'innerRef';
  };

  var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
    return typeof tag === 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
  };

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var isBrowser$3 = typeof document !== 'undefined';

  var createStyled = function createStyled(tag, options) {

    var identifierName;
    var shouldForwardProp;
    var targetClassName;

    if (options !== undefined) {
      identifierName = options.label;
      targetClassName = options.target;
      shouldForwardProp = tag.__emotion_forwardProp && options.shouldForwardProp ? function (propName) {
        return tag.__emotion_forwardProp(propName) && // $FlowFixMe
        options.shouldForwardProp(propName);
      } : options.shouldForwardProp;
    }

    var isReal = tag.__emotion_real === tag;
    var baseTag = isReal && tag.__emotion_base || tag;

    if (typeof shouldForwardProp !== 'function' && isReal) {
      shouldForwardProp = tag.__emotion_forwardProp;
    }

    var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
    var shouldUseAs = !defaultShouldForwardProp('as');
    return function () {
      var args = arguments;
      var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

      if (identifierName !== undefined) {
        styles.push("label:" + identifierName + ";");
      }

      if (args[0] == null || args[0].raw === undefined) {
        styles.push.apply(styles, args);
      } else {

        styles.push(args[0][0]);
        var len = args.length;
        var i = 1;

        for (; i < len; i++) {

          styles.push(args[i], args[0][i]);
        }
      } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


      var Styled = withEmotionCache(function (props, context, ref) {
        return React.createElement(ThemeContext.Consumer, null, function (theme) {
          var finalTag = shouldUseAs && props.as || baseTag;
          var className = '';
          var classInterpolations = [];
          var mergedProps = props;

          if (props.theme == null) {
            mergedProps = {};

            for (var key in props) {
              mergedProps[key] = props[key];
            }

            mergedProps.theme = theme;
          }

          if (typeof props.className === 'string') {
            className = getRegisteredStyles(context.registered, classInterpolations, props.className);
          } else if (props.className != null) {
            className = props.className + " ";
          }

          var serialized = serializeStyles(styles.concat(classInterpolations), context.registered, mergedProps);
          var rules = insertStyles(context, serialized, typeof finalTag === 'string');
          className += context.key + "-" + serialized.name;

          if (targetClassName !== undefined) {
            className += " " + targetClassName;
          }

          var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
          var newProps = {};

          for (var _key in props) {
            if (shouldUseAs && _key === 'as') continue;

            if ( // $FlowFixMe
            finalShouldForwardProp(_key)) {
              newProps[_key] = props[_key];
            }
          }

          newProps.className = className;
          newProps.ref = ref || props.innerRef;

          var ele = React.createElement(finalTag, newProps);

          if (!isBrowser$3 && rules !== undefined) {
            var _ref;

            var serializedNames = serialized.name;
            var next = serialized.next;

            while (next !== undefined) {
              serializedNames += ' ' + next.name;
              next = next.next;
            }

            return React.createElement(React.Fragment, null, React.createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
              __html: rules
            }, _ref.nonce = context.sheet.nonce, _ref)), ele);
          }

          return ele;
        });
      });
      Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
      Styled.defaultProps = tag.defaultProps;
      Styled.__emotion_real = Styled;
      Styled.__emotion_base = baseTag;
      Styled.__emotion_styles = styles;
      Styled.__emotion_forwardProp = shouldForwardProp;
      Object.defineProperty(Styled, 'toString', {
        value: function value() {
          if (targetClassName === undefined && "production" !== 'production') {
            return 'NO_COMPONENT_SELECTOR';
          } // $FlowFixMe: coerce undefined to string


          return "." + targetClassName;
        }
      });

      Styled.withComponent = function (nextTag, nextOptions) {
        return createStyled(nextTag, nextOptions !== undefined ? _objectSpread$1({}, options || {}, {}, nextOptions) : options).apply(void 0, styles);
      };

      return Styled;
    };
  };

  var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

  var newStyled = createStyled.bind();
  tags.forEach(function (tagName) {
    newStyled[tagName] = newStyled(tagName);
  });

  /**
   * Returns the value of `props[path]` or `defaultValue`
   * @example
   * import styled from "styled-components";
   * import { prop } from "styled-tools";
   *
   * const Button = styled.button`
   *   color: ${prop("color", "red")};
   * `;
   */
  var prop = function prop(path, defaultValue) {
    return function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof props[path] !== "undefined") {
        return props[path];
      }

      if (path && path.indexOf(".") > 0) {
        var paths = path.split(".");
        var length = paths.length;
        var object = props[paths[0]];
        var index = 1;

        while (object != null && index < length) {
          object = object[paths[index]];
          index += 1;
        }

        if (typeof object !== "undefined") {
          return object;
        }
      }

      return defaultValue;
    };
  };

  const CardOuter = newStyled.div `
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;
  const CardContainer = newStyled.div `
  padding: 0.5em;
  background: ${prop('theme.palette.background.card')};
  color: ${prop('theme.palette.text.card')};
  border-radius: ${prop('theme.sizing.borderRadius')};
  border: 2px solid ${prop('theme.palette.text.card')};
  width: 13em;
  margin-left: 1em;

  ${prop('theme.overrides.card.cardContainer', '')};
`;
  const CardTitle = newStyled.h3 `
  margin: 0.5em 0;
  font-size: 1.5em;

  ${prop('theme.overrides.card.cardTitle', '')};
`;
  const CardSubTitle = newStyled.h4 `
  margin: 0.5em 0;
  font-size: 1em;

  ${prop('theme.overrides.card.cardSubTitle', '')};
`;
  const CardImage = newStyled.img `
  max-width: 100%;
  max-height: 100%;

  ${prop('theme.overrides.card.cardImage', '')};
`;
  const ButtonList = newStyled.ul `
  margin: 0.5em 0;
  list-style: none;
  padding: 0.5em 0;

  ${prop('theme.overrides.card.buttonList', '')};

  & > li {
    padding: 0;
    margin: 0 0.5em;
    display: inline-block;

    ${prop('theme.overrides.card.buttonContainer', '')};
  }
`;
  const Button = newStyled.button `
  background: none;
  border-radius: ${prop('theme.sizing.borderRadius')};
  color: ${prop('theme.palette.text.card')};
  border: 2px solid ${prop('theme.palette.text.card')};
  padding: 0.5em 1em;
  cursor: pointer;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  font-family: inherit;
  font-size: inherit;

  &:hover,
  &:focus,
  &:active {
    color: ${prop('theme.palette.background.card')};
    background: ${prop('theme.palette.text.card')};
  }

  ${prop('theme.overrides.card.cardButton', '')};
`;
  const Card = React__default.forwardRef(function cardRender({ title, subTitle, imageUrl, buttons, sendAction }, ref) {
      return (React__default.createElement(CardOuter, { ref: ref },
          React__default.createElement(CardContainer, null,
              imageUrl && React__default.createElement(CardImage, { src: imageUrl, alt: title }),
              React__default.createElement(CardTitle, null, title),
              subTitle && (React__default.createElement(CardSubTitle, null,
                  React__default.createElement("div", { dangerouslySetInnerHTML: { __html: subTitle } }))),
              Array.isArray(buttons) && buttons.length > 0 && (React__default.createElement(ButtonList, null, buttons.map((button, index) => (React__default.createElement("li", { key: index },
                  React__default.createElement(Button, { onClick: sendAction.bind(null, button), onKeyPress: sendAction.bind(null, button) }, button.label)))))))));
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret_1) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    }  shim.isRequired = shim;
    function getShim() {
      return shim;
    }  // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,

      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
  });

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var ArrowLeftCircle = React.forwardRef(function (_ref, ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'currentColor' : _ref$color,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 24 : _ref$size,
        rest = _objectWithoutProperties(_ref, ["color", "size"]);

    return /*#__PURE__*/React__default.createElement("svg", _extends({
      ref: ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, rest), /*#__PURE__*/React__default.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default.createElement("polyline", {
      points: "12 8 8 12 12 16"
    }), /*#__PURE__*/React__default.createElement("line", {
      x1: "16",
      y1: "12",
      x2: "8",
      y2: "12"
    }));
  });
  ArrowLeftCircle.propTypes = {
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
  ArrowLeftCircle.displayName = 'ArrowLeftCircle';

  function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

  function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var ArrowRightCircle = React.forwardRef(function (_ref, ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'currentColor' : _ref$color,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 24 : _ref$size,
        rest = _objectWithoutProperties$1(_ref, ["color", "size"]);

    return /*#__PURE__*/React__default.createElement("svg", _extends$1({
      ref: ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, rest), /*#__PURE__*/React__default.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default.createElement("polyline", {
      points: "12 16 16 12 12 8"
    }), /*#__PURE__*/React__default.createElement("line", {
      x1: "8",
      y1: "12",
      x2: "16",
      y2: "12"
    }));
  });
  ArrowRightCircle.propTypes = {
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
  ArrowRightCircle.displayName = 'ArrowRightCircle';

  function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

  function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var Send = React.forwardRef(function (_ref, ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'currentColor' : _ref$color,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 24 : _ref$size,
        rest = _objectWithoutProperties$2(_ref, ["color", "size"]);

    return /*#__PURE__*/React__default.createElement("svg", _extends$2({
      ref: ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, rest), /*#__PURE__*/React__default.createElement("line", {
      x1: "22",
      y1: "2",
      x2: "11",
      y2: "13"
    }), /*#__PURE__*/React__default.createElement("polygon", {
      points: "22 2 15 22 11 13 2 9 22 2"
    }));
  });
  Send.propTypes = {
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
  Send.displayName = 'Send';

  function _extends$3() {
    _extends$3 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$3.apply(this, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   * @private
   */


  var PolishedError = /*#__PURE__*/function (_Error) {
    _inheritsLoose$1(PolishedError, _Error);

    function PolishedError(code) {
      var _this;

      {
        _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/master/src/internalHelpers/errors.md#" + code + " for more information.") || this;
      }

      return _assertThisInitialized(_this);
    }

    return PolishedError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function colorToInt(color) {
    return Math.round(color * 255);
  }

  function convertToInt(red, green, blue) {
    return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
  }

  function hslToRgb(hue, saturation, lightness, convert) {
    if (convert === void 0) {
      convert = convertToInt;
    }

    if (saturation === 0) {
      // achromatic
      return convert(lightness, lightness, lightness);
    } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV


    var huePrime = (hue % 360 + 360) % 360 / 60;
    var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    var red = 0;
    var green = 0;
    var blue = 0;

    if (huePrime >= 0 && huePrime < 1) {
      red = chroma;
      green = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      red = secondComponent;
      green = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      green = chroma;
      blue = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      green = secondComponent;
      blue = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      red = secondComponent;
      blue = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      red = chroma;
      blue = secondComponent;
    }

    var lightnessModification = lightness - chroma / 2;
    var finalRed = red + lightnessModification;
    var finalGreen = green + lightnessModification;
    var finalBlue = blue + lightnessModification;
    return convert(finalRed, finalGreen, finalBlue);
  }

  var namedColorMap = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkgrey: 'a9a9a9',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkslategrey: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1e90ff',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    grey: '808080',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred: 'cd5c5c',
    indigo: '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgray: 'd3d3d3',
    lightgreen: '90ee90',
    lightgrey: 'd3d3d3',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslategray: '789',
    lightslategrey: '789',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '0f0',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'f0f',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370db',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'db7093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    rebeccapurple: '639',
    red: 'f00',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    slategrey: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    wheat: 'f5deb3',
    white: 'fff',
    whitesmoke: 'f5f5f5',
    yellow: 'ff0',
    yellowgreen: '9acd32'
  };
  /**
   * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
   * @private
   */

  function nameToHex(color) {
    if (typeof color !== 'string') return color;
    var normalizedColorName = color.toLowerCase();
    return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
  }

  var hexRegex = /^#[a-fA-F0-9]{6}$/;
  var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
  var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
  var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
  var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
  var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
  var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  /**
   * Returns an RgbColor or RgbaColor object. This utility function is only useful
   * if want to extract a color component. With the color util `toColorString` you
   * can convert a RgbColor or RgbaColor object back to a string.
   *
   * @example
   * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
   * const color1 = parseToRgb('rgb(255, 0, 0)');
   * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
   * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
   */

  function parseToRgb(color) {
    if (typeof color !== 'string') {
      throw new PolishedError(3);
    }

    var normalizedColor = nameToHex(color);

    if (normalizedColor.match(hexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
      };
    }

    if (normalizedColor.match(hexRgbaRegex)) {
      var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
        alpha: alpha
      };
    }

    if (normalizedColor.match(reducedHexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
      };
    }

    if (normalizedColor.match(reducedRgbaHexRegex)) {
      var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
        alpha: _alpha
      };
    }

    var rgbMatched = rgbRegex.exec(normalizedColor);

    if (rgbMatched) {
      return {
        red: parseInt("" + rgbMatched[1], 10),
        green: parseInt("" + rgbMatched[2], 10),
        blue: parseInt("" + rgbMatched[3], 10)
      };
    }

    var rgbaMatched = rgbaRegex.exec(normalizedColor);

    if (rgbaMatched) {
      return {
        red: parseInt("" + rgbaMatched[1], 10),
        green: parseInt("" + rgbaMatched[2], 10),
        blue: parseInt("" + rgbaMatched[3], 10),
        alpha: parseFloat("" + rgbaMatched[4])
      };
    }

    var hslMatched = hslRegex.exec(normalizedColor);

    if (hslMatched) {
      var hue = parseInt("" + hslMatched[1], 10);
      var saturation = parseInt("" + hslMatched[2], 10) / 100;
      var lightness = parseInt("" + hslMatched[3], 10) / 100;
      var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
      var hslRgbMatched = rgbRegex.exec(rgbColorString);

      if (!hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, rgbColorString);
      }

      return {
        red: parseInt("" + hslRgbMatched[1], 10),
        green: parseInt("" + hslRgbMatched[2], 10),
        blue: parseInt("" + hslRgbMatched[3], 10)
      };
    }

    var hslaMatched = hslaRegex.exec(normalizedColor);

    if (hslaMatched) {
      var _hue = parseInt("" + hslaMatched[1], 10);

      var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

      var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

      var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

      var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

      if (!_hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, _rgbColorString);
      }

      return {
        red: parseInt("" + _hslRgbMatched[1], 10),
        green: parseInt("" + _hslRgbMatched[2], 10),
        blue: parseInt("" + _hslRgbMatched[3], 10),
        alpha: parseFloat("" + hslaMatched[4])
      };
    }

    throw new PolishedError(5);
  }

  /**
   * Reduces hex values if possible e.g. #ff8866 to #f86
   * @private
   */
  var reduceHexValue = function reduceHexValue(value) {
    if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
      return "#" + value[1] + value[3] + value[5];
    }

    return value;
  };

  function numberToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgb(255, 205, 100),
   *   background: rgb({ red: 255, green: 205, blue: 100 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgb(255, 205, 100)};
   *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffcd64";
   *   background: "#ffcd64";
   * }
   */
  function rgb(value, green, blue) {
    if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
      return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
    } else if (typeof value === 'object' && green === undefined && blue === undefined) {
      return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
    }

    throw new PolishedError(6);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
   *
   * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgba(255, 205, 100, 0.7),
   *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
   *   background: rgba(255, 205, 100, 1),
   *   background: rgba('#ffffff', 0.4),
   *   background: rgba('black', 0.7),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgba(255, 205, 100, 0.7)};
   *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
   *   background: ${rgba(255, 205, 100, 1)};
   *   background: ${rgba('#ffffff', 0.4)};
   *   background: ${rgba('black', 0.7)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(255,205,100,0.7)";
   *   background: "rgba(255,205,100,0.7)";
   *   background: "#ffcd64";
   *   background: "rgba(255,255,255,0.4)";
   *   background: "rgba(0,0,0,0.7)";
   * }
   */
  function rgba(firstValue, secondValue, thirdValue, fourthValue) {
    if (typeof firstValue === 'string' && typeof secondValue === 'number') {
      var rgbValue = parseToRgb(firstValue);
      return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
    } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
      return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
    } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
      return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
    }

    throw new PolishedError(7);
  }

  // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-redeclare
  function curried(f, length, acc) {
    return function fn() {
      // eslint-disable-next-line prefer-rest-params
      var combined = acc.concat(Array.prototype.slice.call(arguments));
      return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
    };
  } // eslint-disable-next-line no-redeclare


  function curry(f) {
    // eslint-disable-line no-redeclare
    return curried(f, f.length, []);
  }

  function guard(lowerBoundary, upperBoundary, value) {
    return Math.max(lowerBoundary, Math.min(upperBoundary, value));
  }

  /**
   * Returns a number (float) representing the luminance of a color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
   *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
   *                             'rgba(58, 133, 255, 1)' :
   *                             'rgba(255, 57, 149, 1)',
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
   *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
   *                             'rgba(58, 133, 255, 1)' :
   *                             'rgba(255, 57, 149, 1)'};
   *
   * // CSS in JS Output
   *
   * div {
   *   background: "#CCCD64";
   *   background: "rgba(58, 133, 255, 1)";
   * }
   */

  function getLuminance(color) {
    if (color === 'transparent') return 0;
    var rgbColor = parseToRgb(color);

    var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
      var channel = rgbColor[key] / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    }),
        r = _Object$keys$map[0],
        g = _Object$keys$map[1],
        b = _Object$keys$map[2];

    return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
  }

  /**
   * Returns the contrast ratio between two colors based on
   * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
   *
   * @example
   * const contrastRatio = getContrast('#444', '#fff');
   */

  function getContrast(color1, color2) {
    var luminance1 = getLuminance(color1);
    var luminance2 = getLuminance(color2);
    return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
  }

  /**
   * Increases the opacity of a color. Its range for the amount is between 0 to 1.
   *
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
   *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
   *   background: opacify('0.5', 'rgba(255, 0, 0, 0.2)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
   *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
   *   background: ${opacify('0.5', 'rgba(255, 0, 0, 0.2)')},
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#fff";
   *   background: "rgba(255,255,255,0.7)";
   *   background: "rgba(255,0,0,0.7)";
   * }
   */

  function opacify(amount, color) {
    if (color === 'transparent') return color;
    var parsedColor = parseToRgb(color);
    var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

    var colorWithAlpha = _extends$3({}, parsedColor, {
      alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
    });

    return rgba(colorWithAlpha);
  } // prettier-ignore


  var curriedOpacify = /*#__PURE__*/curry
  /* ::<number | string, string, string> */
  (opacify);

  var defaultLightReturnColor = '#000';
  var defaultDarkReturnColor = '#fff';
  /**
   * Returns black or white (or optional light and dark return colors) for best
   * contrast depending on the luminosity of the given color.
   * When passing custom return colors, set `strict` to `true` to ensure that the
   * return color always meets or exceeds WCAG level AA or greater. If this test
   * fails, the default return color (black or white) is returned in place of the
   * custom return color.
   *
   * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   color: readableColor('#000'),
   *   color: readableColor('black', '#001', '#ff8'),
   *   color: readableColor('white', '#001', '#ff8'),
   *   color: readableColor('red', '#333', '#ddd', true)
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   color: ${readableColor('#000')};
   *   color: ${readableColor('black', '#001', '#ff8')};
   *   color: ${readableColor('white', '#001', '#ff8')};
   *   color: ${readableColor('red', '#333', '#ddd', true)};
   * `
   *
   * // CSS in JS Output
   * element {
   *   color: "#fff";
   *   color: "#ff8";
   *   color: "#001";
   *   color: "#000";
   * }
   */

  function readableColor(color, lightReturnColor, darkReturnColor, strict) {
    if (lightReturnColor === void 0) {
      lightReturnColor = defaultLightReturnColor;
    }

    if (darkReturnColor === void 0) {
      darkReturnColor = defaultDarkReturnColor;
    }

    if (strict === void 0) {
      strict = false;
    }

    var isLightColor = getLuminance(color) > 0.179;
    var preferredReturnColor = isLightColor ? lightReturnColor : darkReturnColor; // TODO: Make `strict` the default behaviour in the next major release.
    // Without `strict`, this may return a color that does not meet WCAG AA.

    if (!strict || getContrast(color, preferredReturnColor) >= 4.5) {
      return preferredReturnColor;
    }

    return isLightColor ? defaultLightReturnColor : defaultDarkReturnColor;
  }

  function useRefs(count) {
      const [refs, setRefs] = React.useState([]);
      React.useEffect(() => {
          const initialRefs = Array.from(Array(count)).map(() => React.createRef());
          setRefs(initialRefs);
      }, []);
      React.useEffect(() => {
          setRefs((refs) => Array.from(Array(count)).map((_, i) => refs[i] || React.createRef()));
      }, [count]);
      return refs;
  }

  const measureElement = (element) => ({
      width: (element === null || element === void 0 ? void 0 : element.clientWidth) || 0,
      height: (element === null || element === void 0 ? void 0 : element.clientHeight) || 0,
      x: (element === null || element === void 0 ? void 0 : element.offsetLeft) || 0,
      y: (element === null || element === void 0 ? void 0 : element.offsetTop) || 0,
  });
  function useMeasures(refs) {
      const [measures, setMeasures] = React.useState([]);
      React.useEffect(() => {
          const nextMeasures = refs.map((ref) => measureElement(ref.current));
          setMeasures(nextMeasures);
      }, [refs]);
      return measures;
  }

  function getMeanX(previous, target) {
      if (!previous || !target)
          return 0;
      return Math.round((previous.x + previous.width + target.x) / 2);
  }
  function scrollStep(direction, container, measures) {
      if (!container)
          return;
      const x = container.scrollLeft;
      const width = container.clientWidth;
      if (direction === 'NEXT') {
          const targetIndex = measures.findIndex((measure) => measure.x + measure.width > x + width);
          container.scrollLeft = getMeanX(measures[targetIndex], measures[targetIndex - 1]);
      }
      else {
          const firstLeftHidden = measures
              .slice()
              .reverse()
              .find((measure) => measure.x < x);
          if (!firstLeftHidden)
              return;
          const targetIndex = measures.findIndex((measure) => firstLeftHidden.x - measure.x < width - firstLeftHidden.width);
          container.scrollLeft = getMeanX(measures[targetIndex - 1], measures[targetIndex]);
      }
  }
  function useCarousel(itemCount = 0) {
      const containerRef = React.useRef(null);
      const itemRefs = useRefs(itemCount);
      const measures = useMeasures(itemRefs);
      const previous = React.useCallback(() => scrollStep('PREVIOUS', containerRef.current, measures), [containerRef, measures]);
      const next = React.useCallback(() => scrollStep('NEXT', containerRef.current, measures), [containerRef, measures]);
      return [
          {
              container: containerRef,
              items: itemRefs,
          },
          previous,
          next,
      ];
  }

  function useArrowVisibility(ref, itemRefs) {
      const [visibility, setVisibility] = React.useState([
          false,
          true,
      ]);
      const computeVisibility = React.useCallback(() => {
          if (!ref.current)
              return;
          const { scrollLeft = 0, clientWidth = 0, scrollWidth = 0 } = ref.current;
          const leftVisibility = scrollLeft > 0;
          const rightVisibility = scrollLeft + clientWidth < scrollWidth;
          if (visibility[0] !== leftVisibility || visibility[1] !== rightVisibility) {
              setVisibility([leftVisibility, rightVisibility]);
          }
      }, [ref.current, visibility, setVisibility]);
      React.useEffect(computeVisibility, [itemRefs]);
      React.useEffect(() => {
          if (!ref.current)
              return;
          ref.current.addEventListener('resize', computeVisibility);
          ref.current.addEventListener('scroll', computeVisibility);
          return () => {
              var _a, _b;
              (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('resize', computeVisibility);
              (_b = ref.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('scroll', computeVisibility);
          };
      }, [ref.current, visibility]);
      return visibility;
  }

  const ButtonContainer = newStyled.div `
  margin: 0.4em 0;
  position: relative;
`;
  const ItemContainer = newStyled.div `
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  justify-content: start;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  ${prop('theme.overrides.carouselContainer', '')}

  & > div, & > * {
    margin-left: 1em;
    margin-right: 1em;

    ${prop('theme.overrides.carouselItem', '')}
  }
`;
  const Previous = newStyled.button `
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${(props) => curriedOpacify(-0.8, props.theme.palette.background.bot)};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop('theme.palette.text.bot')};
    }
  }

  ${prop('theme.overrides.carouselArrow', '')};
`;
  const Next = newStyled.button `
  position: absolute;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  background: ${(props) => curriedOpacify(-0.8, props.theme.palette.background.bot)};
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;

  cursor: pointer;
  z-index: 5;

  & svg {
    stroke: ${prop('theme.palette.background.bot')};
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${prop('theme.palette.text.bot')};
    }
  }

  ${prop('theme.overrides.carouselArrow', '')};
`;
  const Carousel = ({ children, }) => {
      const theme = useTheme();
      const [ref, previous, next] = useCarousel(children === null || children === void 0 ? void 0 : children.length);
      const [leftVisible, rightVisible] = useArrowVisibility(ref.container, ref.items);
      return (React__default.createElement(ButtonContainer, null,
          leftVisible && (React__default.createElement(Previous, { onClick: previous },
              React__default.createElement(ArrowLeftCircle, { size: `calc(${theme.typography.fontSize} * 2)` }))),
          React__default.createElement(ItemContainer, { ref: ref.container }, children === null || children === void 0 ? void 0 : children.map((child, i) => React__default.cloneElement(child, { ref: ref.items[i] }, undefined))),
          rightVisible && (React__default.createElement(Next, { onClick: next },
              React__default.createElement(ArrowRightCircle, { size: `calc(${theme.typography.fontSize} * 2)` })))));
  };

  /**
   * Retrieves persisted user id.
   */
  const retrieveUserId = () => fromLocalStorage('userId', () => {
      const date = Date.now().toString(36);
      const randomNumber = Math.random().toString(36).substr(2, 5);
      return (date + randomNumber).toUpperCase();
  });
  /**
   * Retrieves and returns an object from the local storage if found.
   * If the value is not found it will save an initialValue before returning it.
   * @param key - key in local storage
   * @param computeInitialValue - function to create an initial value if the object is not found
   */
  const fromLocalStorage = (key, computeInitialValue) => {
      try {
          const item = window.localStorage.getItem(key);
          if (item) {
              return JSON.parse(item);
          }
          else {
              const initialValue = computeInitialValue();
              window.localStorage.setItem(key, JSON.stringify(initialValue));
              return initialValue;
          }
      }
      catch (error) {
          console.log(error);
          return computeInitialValue();
      }
  };

  const TockStateContext = React.createContext(undefined);
  const TockStateDispatch = React.createContext(undefined);
  const useTockState = () => {
      const state = React.useContext(TockStateContext);
      if (!state) {
          throw new Error('useTockState must be used in a TockContext');
      }
      return state;
  };
  const useTockDispatch = () => {
      const dispatch = React.useContext(TockStateDispatch);
      if (!dispatch) {
          throw new Error('useTockDispatch must be used in a TockContext');
      }
      return dispatch;
  };
  class QuickReply {
      constructor(label, payload) {
          this.label = label;
          this.payload = payload;
      }
  }
  class PostBackButton {
      constructor(label, payload) {
          this.label = label;
          this.payload = payload;
      }
  }
  class UrlButton {
      constructor(label, url) {
          this.label = label;
          this.url = url;
      }
  }
  class UrlButtonGraphSignIn {
      constructor(label, url) {
          this.label = label;
          this.url = url;
      }
  }
  const tockReducer = (state, action) => {
      switch (action.type) {
          case 'SET_QUICKREPLIES':
              if (action.quickReplies) {
                  return Object.assign(Object.assign({}, state), { quickReplies: action.quickReplies });
              }
              break;
          case 'ADD_MESSAGE':
              if (action.messages) {
                  return Object.assign(Object.assign({}, state), { messages: [...state.messages, ...action.messages] });
              }
              break;
          case 'SET_LOADING':
              if (action.loading != undefined) {
                  return Object.assign(Object.assign({}, state), { loading: action.loading });
              }
              break;
          case 'SET_SSE_INITIALIZING':
              if (action.sseInitializing != undefined) {
                  return Object.assign(Object.assign({}, state), { sseInitializing: action.sseInitializing });
              }
              break;
      }
      return state;
  };
  const TockContext = ({ children, }) => {
      const [state, dispatch] = React.useReducer(tockReducer, {
          quickReplies: [],
          messages: [],
          userId: retrieveUserId(),
          loading: false,
          sseInitializing: false,
          behavior: {
              showChat: true,
              disabledInput: false,
          },
      });
      return (React__default.createElement(TockStateContext.Provider, { value: state },
          React__default.createElement(TockStateDispatch.Provider, { value: dispatch }, children)));
  };

  // eslint-disable-next-line @typescript-eslint/no-namespace
  var Sse;
  (function (Sse) {
      let sseIsEnabled = false;
      let eventSource;
      let notInitialised;
      function init(tockEndPoint, userId, handleBotResponse, onSseStateChange) {
          return new Promise((afterInit) => {
              if (typeof EventSource !== 'undefined' && tockEndPoint && !eventSource) {
                  notInitialised = true;
                  eventSource = new EventSource(tockEndPoint + '/sse?userid=' + userId);
                  setTimeout(() => onSseStateChange(eventSource.readyState));
                  eventSource.addEventListener('message', (e) => {
                      handleBotResponse(JSON.parse(e.data));
                  }, false);
                  eventSource.addEventListener('open', () => {
                      onSseStateChange(eventSource.readyState);
                      sseIsEnabled = true;
                      if (notInitialised) {
                          afterInit();
                          notInitialised = false;
                      }
                  }, false);
                  eventSource.addEventListener('error', () => {
                      if (eventSource.readyState == EventSource.CLOSED) {
                          onSseStateChange(eventSource.readyState);
                          sseIsEnabled = false;
                          if (notInitialised) {
                              afterInit();
                              notInitialised = false;
                          }
                      }
                  }, false);
              }
          });
      }
      Sse.init = init;
      function isEnable() {
          return sseIsEnabled;
      }
      Sse.isEnable = isEnable;
  })(Sse || (Sse = {}));

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var CryptoUtils = /** @class */ (function () {
      function CryptoUtils() {
      }
      /**
       * Creates a new random GUID
       * @returns string (GUID)
       */
      CryptoUtils.createNewGuid = function () {
          /*
           * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
           * pseudo-random numbers.
           * The algorithm is as follows:
           *     Set the two most significant bits (bits 6 and 7) of the
           *        clock_seq_hi_and_reserved to zero and one, respectively.
           *     Set the four most significant bits (bits 12 through 15) of the
           *        time_hi_and_version field to the 4-bit version number from
           *        Section 4.1.3. Version4
           *     Set all the other bits to randomly (or pseudo-randomly) chosen
           *     values.
           * UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
           * time-low               = 4hexOctet
           * time-mid               = 2hexOctet
           * time-high-and-version  = 2hexOctet
           * clock-seq-and-reserved = hexOctet:
           * clock-seq-low          = hexOctet
           * node                   = 6hexOctet
           * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
           * y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
           * y values are 8, 9, A, B
           */
          var cryptoObj = window.crypto; // for IE 11
          if (cryptoObj && cryptoObj.getRandomValues) {
              var buffer = new Uint8Array(16);
              cryptoObj.getRandomValues(buffer);
              // buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
              buffer[6] |= 0x40; // buffer[6] | 01000000 will set the 6 bit to 1.
              buffer[6] &= 0x4f; // buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
              // buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
              buffer[8] |= 0x80; // buffer[8] | 10000000 will set the 7 bit to 1.
              buffer[8] &= 0xbf; // buffer[8] & 10111111 will set the 6 bit to 0.
              return CryptoUtils.decimalToHex(buffer[0]) + CryptoUtils.decimalToHex(buffer[1])
                  + CryptoUtils.decimalToHex(buffer[2]) + CryptoUtils.decimalToHex(buffer[3])
                  + "-" + CryptoUtils.decimalToHex(buffer[4]) + CryptoUtils.decimalToHex(buffer[5])
                  + "-" + CryptoUtils.decimalToHex(buffer[6]) + CryptoUtils.decimalToHex(buffer[7])
                  + "-" + CryptoUtils.decimalToHex(buffer[8]) + CryptoUtils.decimalToHex(buffer[9])
                  + "-" + CryptoUtils.decimalToHex(buffer[10]) + CryptoUtils.decimalToHex(buffer[11])
                  + CryptoUtils.decimalToHex(buffer[12]) + CryptoUtils.decimalToHex(buffer[13])
                  + CryptoUtils.decimalToHex(buffer[14]) + CryptoUtils.decimalToHex(buffer[15]);
          }
          else {
              var guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
              var hex = "0123456789abcdef";
              var r = 0;
              var guidResponse = "";
              for (var i = 0; i < 36; i++) {
                  if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
                      // each x and y needs to be random
                      r = Math.random() * 16 | 0;
                  }
                  if (guidHolder[i] === "x") {
                      guidResponse += hex[r];
                  }
                  else if (guidHolder[i] === "y") {
                      // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                      r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                      r |= 0x8; // set pos 3 to 1 as 1???
                      guidResponse += hex[r];
                  }
                  else {
                      guidResponse += guidHolder[i];
                  }
              }
              return guidResponse;
          }
      };
      /**
       * verifies if a string is  GUID
       * @param guid
       */
      CryptoUtils.isGuid = function (guid) {
          var regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          return regexGuid.test(guid);
      };
      /**
       * Decimal to Hex
       *
       * @param num
       */
      CryptoUtils.decimalToHex = function (num) {
          var hex = num.toString(16);
          while (hex.length < 2) {
              hex = "0" + hex;
          }
          return hex;
      };
      // See: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_4_%E2%80%93_escaping_the_string_before_encoding_it
      /**
       * encoding string to base64 - platform specific check
       *
       * @param input
       */
      CryptoUtils.base64Encode = function (input) {
          return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
              return String.fromCharCode(Number("0x" + p1));
          }));
      };
      /**
       * Decodes a base64 encoded string.
       *
       * @param input
       */
      CryptoUtils.base64Decode = function (input) {
          var encodedString = input.replace(/-/g, "+").replace(/_/g, "/");
          switch (encodedString.length % 4) {
              case 0:
                  break;
              case 2:
                  encodedString += "==";
                  break;
              case 3:
                  encodedString += "=";
                  break;
              default:
                  throw new Error("Invalid base64 string");
          }
          return decodeURIComponent(atob(encodedString).split("").map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));
      };
      /**
       * deserialize a string
       *
       * @param query
       */
      CryptoUtils.deserialize = function (query) {
          var match; // Regex for replacing addition symbol with a space
          var pl = /\+/g;
          var search = /([^&=]+)=([^&]*)/g;
          var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
          var obj = {};
          match = search.exec(query);
          while (match) {
              obj[decode(match[1])] = decode(match[2]);
              match = search.exec(query);
          }
          return obj;
      };
      return CryptoUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   * Constants
   */
  var Constants = /** @class */ (function () {
      function Constants() {
      }
      Object.defineProperty(Constants, "libraryName", {
          get: function () { return "Msal.js"; } // used in telemetry sdkName
          ,
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "claims", {
          get: function () { return "claims"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "clientId", {
          get: function () { return "clientId"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "adalIdToken", {
          get: function () { return "adal.idtoken"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "cachePrefix", {
          get: function () { return "msal"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "scopes", {
          get: function () { return "scopes"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "no_account", {
          get: function () { return "NO_ACCOUNT"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "upn", {
          get: function () { return "upn"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "domain_hint", {
          get: function () { return "domain_hint"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "prompt_select_account", {
          get: function () { return "&prompt=select_account"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "prompt_none", {
          get: function () { return "&prompt=none"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "prompt", {
          get: function () { return "prompt"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "response_mode_fragment", {
          get: function () { return "&response_mode=fragment"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "resourceDelimiter", {
          get: function () { return "|"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "cacheDelimiter", {
          get: function () { return "."; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "popUpWidth", {
          get: function () { return this._popUpWidth; },
          set: function (width) {
              this._popUpWidth = width;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "popUpHeight", {
          get: function () { return this._popUpHeight; },
          set: function (height) {
              this._popUpHeight = height;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "login", {
          get: function () { return "LOGIN"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "renewToken", {
          get: function () { return "RENEW_TOKEN"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "unknown", {
          get: function () { return "UNKNOWN"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "ADFS", {
          get: function () { return "adfs"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "homeAccountIdentifier", {
          get: function () { return "homeAccountIdentifier"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "common", {
          get: function () { return "common"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "openidScope", {
          get: function () { return "openid"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "profileScope", {
          get: function () { return "profile"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "oidcScopes", {
          get: function () { return [this.openidScope, this.profileScope]; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "interactionTypeRedirect", {
          get: function () { return "redirectInteraction"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "interactionTypePopup", {
          get: function () { return "popupInteraction"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "interactionTypeSilent", {
          get: function () { return "silentInteraction"; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Constants, "inProgress", {
          get: function () { return "inProgress"; },
          enumerable: true,
          configurable: true
      });
      Constants._popUpWidth = 483;
      Constants._popUpHeight = 600;
      return Constants;
  }());
  /**
   * Keys in the hashParams
   */
  var ServerHashParamKeys;
  (function (ServerHashParamKeys) {
      ServerHashParamKeys["SCOPE"] = "scope";
      ServerHashParamKeys["STATE"] = "state";
      ServerHashParamKeys["ERROR"] = "error";
      ServerHashParamKeys["ERROR_DESCRIPTION"] = "error_description";
      ServerHashParamKeys["ACCESS_TOKEN"] = "access_token";
      ServerHashParamKeys["ID_TOKEN"] = "id_token";
      ServerHashParamKeys["EXPIRES_IN"] = "expires_in";
      ServerHashParamKeys["SESSION_STATE"] = "session_state";
      ServerHashParamKeys["CLIENT_INFO"] = "client_info";
  })(ServerHashParamKeys || (ServerHashParamKeys = {}));
  /**
   * @hidden
   * @ignore
   * response_type from OpenIDConnect
   * References: https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html & https://tools.ietf.org/html/rfc6749#section-4.2.1
   *
   */
  var ResponseTypes = {
      id_token: "id_token",
      token: "token",
      id_token_token: "id_token token"
  };
  /**
   * @hidden
   * CacheKeys for MSAL
   */
  var TemporaryCacheKeys;
  (function (TemporaryCacheKeys) {
      TemporaryCacheKeys["AUTHORITY"] = "authority";
      TemporaryCacheKeys["ACQUIRE_TOKEN_ACCOUNT"] = "acquireTokenAccount";
      TemporaryCacheKeys["SESSION_STATE"] = "session.state";
      TemporaryCacheKeys["STATE_LOGIN"] = "state.login";
      TemporaryCacheKeys["STATE_ACQ_TOKEN"] = "state.acquireToken";
      TemporaryCacheKeys["STATE_RENEW"] = "state.renew";
      TemporaryCacheKeys["NONCE_IDTOKEN"] = "nonce.idtoken";
      TemporaryCacheKeys["LOGIN_REQUEST"] = "login.request";
      TemporaryCacheKeys["RENEW_STATUS"] = "token.renew.status";
      TemporaryCacheKeys["URL_HASH"] = "urlHash";
      TemporaryCacheKeys["INTERACTION_STATUS"] = "interaction_status";
      TemporaryCacheKeys["REDIRECT_REQUEST"] = "redirect_request";
  })(TemporaryCacheKeys || (TemporaryCacheKeys = {}));
  var PersistentCacheKeys;
  (function (PersistentCacheKeys) {
      PersistentCacheKeys["IDTOKEN"] = "idtoken";
      PersistentCacheKeys["CLIENT_INFO"] = "client.info";
  })(PersistentCacheKeys || (PersistentCacheKeys = {}));
  var ErrorCacheKeys;
  (function (ErrorCacheKeys) {
      ErrorCacheKeys["LOGIN_ERROR"] = "login.error";
      ErrorCacheKeys["ERROR"] = "error";
      ErrorCacheKeys["ERROR_DESC"] = "error.description";
  })(ErrorCacheKeys || (ErrorCacheKeys = {}));
  var DEFAULT_AUTHORITY = "https://login.microsoftonline.com/common/";
  var AAD_INSTANCE_DISCOVERY_ENDPOINT = DEFAULT_AUTHORITY + "/discovery/instance?api-version=1.1&authorization_endpoint=";
  var WELL_KNOWN_SUFFIX = ".well-known/openid-configuration";
  /**
   * @hidden
   * SSO Types - generated to populate hints
   */
  var SSOTypes;
  (function (SSOTypes) {
      SSOTypes["ACCOUNT"] = "account";
      SSOTypes["SID"] = "sid";
      SSOTypes["LOGIN_HINT"] = "login_hint";
      SSOTypes["ORGANIZATIONS"] = "organizations";
      SSOTypes["ID_TOKEN"] = "id_token";
      SSOTypes["ACCOUNT_ID"] = "accountIdentifier";
      SSOTypes["HOMEACCOUNT_ID"] = "homeAccountIdentifier";
  })(SSOTypes || (SSOTypes = {}));
  /**
   * @hidden
   */
  var BlacklistedEQParams = [
      SSOTypes.SID,
      SSOTypes.LOGIN_HINT
  ];
  var NetworkRequestType = {
      GET: "GET",
      POST: "POST"
  };
  /**
   * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
   * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
   * internal partners too, hence the choice of generic "string" type instead of the "enum"
   * @hidden
   */
  var PromptState = {
      LOGIN: "login",
      SELECT_ACCOUNT: "select_account",
      CONSENT: "consent",
      NONE: "none"
  };
  /**
   * Frame name prefixes for the hidden iframe created in silent frames
   */
  var FramePrefix = {
      ID_TOKEN_FRAME: "msalIdTokenFrame",
      TOKEN_FRAME: "msalRenewFrame"
  };
  /**
   * MSAL JS Library Version
   */
  function libraryVersion() {
      return "1.4.0";
  }

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var AuthErrorMessage = {
      unexpectedError: {
          code: "unexpected_error",
          desc: "Unexpected error in authentication."
      },
      noWindowObjectError: {
          code: "no_window_object",
          desc: "No window object available. Details:"
      }
  };
  /**
   * General error class thrown by the MSAL.js library.
   */
  var AuthError = /** @class */ (function (_super) {
      __extends(AuthError, _super);
      function AuthError(errorCode, errorMessage) {
          var _this = _super.call(this, errorMessage) || this;
          Object.setPrototypeOf(_this, AuthError.prototype);
          _this.errorCode = errorCode;
          _this.errorMessage = errorMessage;
          _this.name = "AuthError";
          return _this;
      }
      AuthError.createUnexpectedError = function (errDesc) {
          return new AuthError(AuthErrorMessage.unexpectedError.code, AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
      };
      AuthError.createNoWindowObjectError = function (errDesc) {
          return new AuthError(AuthErrorMessage.noWindowObjectError.code, AuthErrorMessage.noWindowObjectError.desc + " " + errDesc);
      };
      return AuthError;
  }(Error));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var StringUtils = /** @class */ (function () {
      function StringUtils() {
      }
      /**
       * Check if a string is empty
       *
       * @param str
       */
      StringUtils.isEmpty = function (str) {
          return (typeof str === "undefined" || !str || 0 === str.length);
      };
      return StringUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var ClientAuthErrorMessage = {
      multipleMatchingTokens: {
          code: "multiple_matching_tokens",
          desc: "The cache contains multiple tokens satisfying the requirements. " +
              "Call AcquireToken again providing more requirements like authority."
      },
      multipleCacheAuthorities: {
          code: "multiple_authorities",
          desc: "Multiple authorities found in the cache. Pass authority in the API overload."
      },
      endpointResolutionError: {
          code: "endpoints_resolution_error",
          desc: "Error: could not resolve endpoints. Please check network and try again."
      },
      popUpWindowError: {
          code: "popup_window_error",
          desc: "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."
      },
      tokenRenewalError: {
          code: "token_renewal_error",
          desc: "Token renewal operation failed due to timeout."
      },
      invalidIdToken: {
          code: "invalid_id_token",
          desc: "Invalid ID token format."
      },
      invalidStateError: {
          code: "invalid_state_error",
          desc: "Invalid state."
      },
      nonceMismatchError: {
          code: "nonce_mismatch_error",
          desc: "Nonce is not matching, Nonce received: "
      },
      loginProgressError: {
          code: "login_progress_error",
          desc: "Login_In_Progress: Error during login call - login is already in progress."
      },
      acquireTokenProgressError: {
          code: "acquiretoken_progress_error",
          desc: "AcquireToken_In_Progress: Error during login call - login is already in progress."
      },
      userCancelledError: {
          code: "user_cancelled",
          desc: "User cancelled the flow."
      },
      callbackError: {
          code: "callback_error",
          desc: "Error occurred in token received callback function."
      },
      userLoginRequiredError: {
          code: "user_login_error",
          desc: "User login is required. For silent calls, request must contain either sid or login_hint"
      },
      userDoesNotExistError: {
          code: "user_non_existent",
          desc: "User object does not exist. Please call a login API."
      },
      clientInfoDecodingError: {
          code: "client_info_decoding_error",
          desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."
      },
      clientInfoNotPopulatedError: {
          code: "client_info_not_populated_error",
          desc: "The service did not populate client_info in the response, Please verify with the service team"
      },
      nullOrEmptyIdToken: {
          code: "null_or_empty_id_token",
          desc: "The idToken is null or empty. Please review the trace to determine the root cause."
      },
      idTokenNotParsed: {
          code: "id_token_parsing_error",
          desc: "ID token cannot be parsed. Please review stack trace to determine root cause."
      },
      tokenEncodingError: {
          code: "token_encoding_error",
          desc: "The token to be decoded is not encoded correctly."
      },
      invalidInteractionType: {
          code: "invalid_interaction_type",
          desc: "The interaction type passed to the handler was incorrect or unknown"
      },
      cacheParseError: {
          code: "cannot_parse_cache",
          desc: "The cached token key is not a valid JSON and cannot be parsed"
      },
      blockTokenRequestsInHiddenIframe: {
          code: "block_token_requests",
          desc: "Token calls are blocked in hidden iframes"
      }
  };
  /**
   * Error thrown when there is an error in the client code running on the browser.
   */
  var ClientAuthError = /** @class */ (function (_super) {
      __extends(ClientAuthError, _super);
      function ClientAuthError(errorCode, errorMessage) {
          var _this = _super.call(this, errorCode, errorMessage) || this;
          _this.name = "ClientAuthError";
          Object.setPrototypeOf(_this, ClientAuthError.prototype);
          return _this;
      }
      ClientAuthError.createEndpointResolutionError = function (errDetail) {
          var errorMessage = ClientAuthErrorMessage.endpointResolutionError.desc;
          if (errDetail && !StringUtils.isEmpty(errDetail)) {
              errorMessage += " Details: " + errDetail;
          }
          return new ClientAuthError(ClientAuthErrorMessage.endpointResolutionError.code, errorMessage);
      };
      ClientAuthError.createMultipleMatchingTokensInCacheError = function (scope) {
          return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingTokens.code, "Cache error for scope " + scope + ": " + ClientAuthErrorMessage.multipleMatchingTokens.desc + ".");
      };
      ClientAuthError.createMultipleAuthoritiesInCacheError = function (scope) {
          return new ClientAuthError(ClientAuthErrorMessage.multipleCacheAuthorities.code, "Cache error for scope " + scope + ": " + ClientAuthErrorMessage.multipleCacheAuthorities.desc + ".");
      };
      ClientAuthError.createPopupWindowError = function (errDetail) {
          var errorMessage = ClientAuthErrorMessage.popUpWindowError.desc;
          if (errDetail && !StringUtils.isEmpty(errDetail)) {
              errorMessage += " Details: " + errDetail;
          }
          return new ClientAuthError(ClientAuthErrorMessage.popUpWindowError.code, errorMessage);
      };
      ClientAuthError.createTokenRenewalTimeoutError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.tokenRenewalError.code, ClientAuthErrorMessage.tokenRenewalError.desc);
      };
      ClientAuthError.createInvalidIdTokenError = function (idToken) {
          return new ClientAuthError(ClientAuthErrorMessage.invalidIdToken.code, ClientAuthErrorMessage.invalidIdToken.desc + " Given token: " + idToken);
      };
      // TODO: Is this not a security flaw to send the user the state expected??
      ClientAuthError.createInvalidStateError = function (invalidState, actualState) {
          return new ClientAuthError(ClientAuthErrorMessage.invalidStateError.code, ClientAuthErrorMessage.invalidStateError.desc + " " + invalidState + ", state expected : " + actualState + ".");
      };
      // TODO: Is this not a security flaw to send the user the Nonce expected??
      ClientAuthError.createNonceMismatchError = function (invalidNonce, actualNonce) {
          return new ClientAuthError(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc + " " + invalidNonce + ", nonce expected : " + actualNonce + ".");
      };
      ClientAuthError.createLoginInProgressError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.loginProgressError.code, ClientAuthErrorMessage.loginProgressError.desc);
      };
      ClientAuthError.createAcquireTokenInProgressError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.acquireTokenProgressError.code, ClientAuthErrorMessage.acquireTokenProgressError.desc);
      };
      ClientAuthError.createUserCancelledError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.userCancelledError.code, ClientAuthErrorMessage.userCancelledError.desc);
      };
      ClientAuthError.createErrorInCallbackFunction = function (errorDesc) {
          return new ClientAuthError(ClientAuthErrorMessage.callbackError.code, ClientAuthErrorMessage.callbackError.desc + " " + errorDesc + ".");
      };
      ClientAuthError.createUserLoginRequiredError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.userLoginRequiredError.code, ClientAuthErrorMessage.userLoginRequiredError.desc);
      };
      ClientAuthError.createUserDoesNotExistError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.userDoesNotExistError.code, ClientAuthErrorMessage.userDoesNotExistError.desc);
      };
      ClientAuthError.createClientInfoDecodingError = function (caughtError) {
          return new ClientAuthError(ClientAuthErrorMessage.clientInfoDecodingError.code, ClientAuthErrorMessage.clientInfoDecodingError.desc + " Failed with error: " + caughtError);
      };
      ClientAuthError.createClientInfoNotPopulatedError = function (caughtError) {
          return new ClientAuthError(ClientAuthErrorMessage.clientInfoNotPopulatedError.code, ClientAuthErrorMessage.clientInfoNotPopulatedError.desc + " Failed with error: " + caughtError);
      };
      ClientAuthError.createIdTokenNullOrEmptyError = function (invalidRawTokenString) {
          return new ClientAuthError(ClientAuthErrorMessage.nullOrEmptyIdToken.code, ClientAuthErrorMessage.nullOrEmptyIdToken.desc + " Raw ID Token Value: " + invalidRawTokenString);
      };
      ClientAuthError.createIdTokenParsingError = function (caughtParsingError) {
          return new ClientAuthError(ClientAuthErrorMessage.idTokenNotParsed.code, ClientAuthErrorMessage.idTokenNotParsed.desc + " Failed with error: " + caughtParsingError);
      };
      ClientAuthError.createTokenEncodingError = function (incorrectlyEncodedToken) {
          return new ClientAuthError(ClientAuthErrorMessage.tokenEncodingError.code, ClientAuthErrorMessage.tokenEncodingError.desc + " Attempted to decode: " + incorrectlyEncodedToken);
      };
      ClientAuthError.createInvalidInteractionTypeError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.invalidInteractionType.code, ClientAuthErrorMessage.invalidInteractionType.desc);
      };
      ClientAuthError.createCacheParseError = function (key) {
          var errorMessage = "invalid key: " + key + ", " + ClientAuthErrorMessage.cacheParseError.desc;
          return new ClientAuthError(ClientAuthErrorMessage.cacheParseError.code, errorMessage);
      };
      ClientAuthError.createBlockTokenRequestsInHiddenIframeError = function () {
          return new ClientAuthError(ClientAuthErrorMessage.blockTokenRequestsInHiddenIframe.code, ClientAuthErrorMessage.blockTokenRequestsInHiddenIframe.desc);
      };
      return ClientAuthError;
  }(AuthError));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var ClientConfigurationErrorMessage = {
      configurationNotSet: {
          code: "no_config_set",
          desc: "Configuration has not been set. Please call the UserAgentApplication constructor with a valid Configuration object."
      },
      storageNotSupported: {
          code: "storage_not_supported",
          desc: "The value for the cacheLocation is not supported."
      },
      noRedirectCallbacksSet: {
          code: "no_redirect_callbacks",
          desc: "No redirect callbacks have been set. Please call handleRedirectCallback() with the appropriate function arguments before continuing. " +
              "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
      },
      invalidCallbackObject: {
          code: "invalid_callback_object",
          desc: "The object passed for the callback was invalid. " +
              "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
      },
      scopesRequired: {
          code: "scopes_required",
          desc: "Scopes are required to obtain an access token."
      },
      emptyScopes: {
          code: "empty_input_scopes_error",
          desc: "Scopes cannot be passed as empty array."
      },
      nonArrayScopes: {
          code: "nonarray_input_scopes_error",
          desc: "Scopes cannot be passed as non-array."
      },
      invalidPrompt: {
          code: "invalid_prompt_value",
          desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'",
      },
      invalidAuthorityType: {
          code: "invalid_authority_type",
          desc: "The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."
      },
      authorityUriInsecure: {
          code: "authority_uri_insecure",
          desc: "Authority URIs must use https."
      },
      authorityUriInvalidPath: {
          code: "authority_uri_invalid_path",
          desc: "Given authority URI is invalid."
      },
      unsupportedAuthorityValidation: {
          code: "unsupported_authority_validation",
          desc: "The authority validation is not supported for this authority type."
      },
      untrustedAuthority: {
          code: "untrusted_authority",
          desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter or set validateAuthority=false."
      },
      b2cAuthorityUriInvalidPath: {
          code: "b2c_authority_uri_invalid_path",
          desc: "The given URI for the B2C authority is invalid."
      },
      b2cKnownAuthoritiesNotSet: {
          code: "b2c_known_authorities_not_set",
          desc: "Must set known authorities when validateAuthority is set to True and using B2C"
      },
      claimsRequestParsingError: {
          code: "claims_request_parsing_error",
          desc: "Could not parse the given claims request object."
      },
      emptyRequestError: {
          code: "empty_request_error",
          desc: "Request object is required."
      },
      invalidCorrelationIdError: {
          code: "invalid_guid_sent_as_correlationId",
          desc: "Please set the correlationId as a valid guid"
      },
      telemetryConfigError: {
          code: "telemetry_config_error",
          desc: "Telemetry config is not configured with required values"
      },
      ssoSilentError: {
          code: "sso_silent_error",
          desc: "request must contain either sid or login_hint"
      },
      invalidAuthorityMetadataError: {
          code: "authority_metadata_error",
          desc: "Invalid authorityMetadata. Must be a JSON object containing authorization_endpoint, end_session_endpoint, and issuer fields."
      }
  };
  /**
   * Error thrown when there is an error in configuration of the .js library.
   */
  var ClientConfigurationError = /** @class */ (function (_super) {
      __extends(ClientConfigurationError, _super);
      function ClientConfigurationError(errorCode, errorMessage) {
          var _this = _super.call(this, errorCode, errorMessage) || this;
          _this.name = "ClientConfigurationError";
          Object.setPrototypeOf(_this, ClientConfigurationError.prototype);
          return _this;
      }
      ClientConfigurationError.createNoSetConfigurationError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.configurationNotSet.code, "" + ClientConfigurationErrorMessage.configurationNotSet.desc);
      };
      ClientConfigurationError.createStorageNotSupportedError = function (givenCacheLocation) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.storageNotSupported.code, ClientConfigurationErrorMessage.storageNotSupported.desc + " Given location: " + givenCacheLocation);
      };
      ClientConfigurationError.createRedirectCallbacksNotSetError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.noRedirectCallbacksSet.code, ClientConfigurationErrorMessage.noRedirectCallbacksSet.desc);
      };
      ClientConfigurationError.createInvalidCallbackObjectError = function (callbackObject) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCallbackObject.code, ClientConfigurationErrorMessage.invalidCallbackObject.desc + " Given value for callback function: " + callbackObject);
      };
      ClientConfigurationError.createEmptyScopesArrayError = function (scopesValue) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopes.code, ClientConfigurationErrorMessage.emptyScopes.desc + " Given value: " + scopesValue + ".");
      };
      ClientConfigurationError.createScopesNonArrayError = function (scopesValue) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.nonArrayScopes.code, ClientConfigurationErrorMessage.nonArrayScopes.desc + " Given value: " + scopesValue + ".");
      };
      ClientConfigurationError.createScopesRequiredError = function (scopesValue) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.scopesRequired.code, ClientConfigurationErrorMessage.scopesRequired.desc + " Given value: " + scopesValue);
      };
      ClientConfigurationError.createInvalidPromptError = function (promptValue) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code, ClientConfigurationErrorMessage.invalidPrompt.desc + " Given value: " + promptValue);
      };
      ClientConfigurationError.createClaimsRequestParsingError = function (claimsRequestParseError) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code, ClientConfigurationErrorMessage.claimsRequestParsingError.desc + " Given value: " + claimsRequestParseError);
      };
      ClientConfigurationError.createEmptyRequestError = function () {
          var _a = ClientConfigurationErrorMessage.emptyRequestError, code = _a.code, desc = _a.desc;
          return new ClientConfigurationError(code, desc);
      };
      ClientConfigurationError.createInvalidCorrelationIdError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCorrelationIdError.code, ClientConfigurationErrorMessage.invalidCorrelationIdError.desc);
      };
      ClientConfigurationError.createKnownAuthoritiesNotSetError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.code, ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.desc);
      };
      ClientConfigurationError.createInvalidAuthorityTypeError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityType.code, ClientConfigurationErrorMessage.invalidAuthorityType.desc);
      };
      ClientConfigurationError.createUntrustedAuthorityError = function (host) {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code, ClientConfigurationErrorMessage.untrustedAuthority.desc + " Provided Authority: " + host);
      };
      ClientConfigurationError.createTelemetryConfigError = function (config) {
          var _a = ClientConfigurationErrorMessage.telemetryConfigError, code = _a.code, desc = _a.desc;
          var requiredKeys = {
              applicationName: "string",
              applicationVersion: "string",
              telemetryEmitter: "function"
          };
          var missingKeys = Object.keys(requiredKeys)
              .reduce(function (keys, key) {
              return config[key] ? keys : keys.concat([key + " (" + requiredKeys[key] + ")"]);
          }, []);
          return new ClientConfigurationError(code, desc + " mising values: " + missingKeys.join(","));
      };
      ClientConfigurationError.createSsoSilentError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.ssoSilentError.code, ClientConfigurationErrorMessage.ssoSilentError.desc);
      };
      ClientConfigurationError.createInvalidAuthorityMetadataError = function () {
          return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityMetadataError.code, ClientConfigurationErrorMessage.invalidAuthorityMetadataError.desc);
      };
      return ClientConfigurationError;
  }(ClientAuthError));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var ScopeSet = /** @class */ (function () {
      function ScopeSet() {
      }
      /**
       * Check if there are dup scopes in a given request
       *
       * @param cachedScopes
       * @param scopes
       */
      // TODO: Rename this, intersecting scopes isn't a great name for duplicate checker
      ScopeSet.isIntersectingScopes = function (cachedScopes, scopes) {
          var convertedCachedScopes = this.trimAndConvertArrayToLowerCase(cachedScopes.slice());
          var requestScopes = this.trimAndConvertArrayToLowerCase(scopes.slice());
          for (var i = 0; i < requestScopes.length; i++) {
              if (convertedCachedScopes.indexOf(requestScopes[i].toLowerCase()) > -1) {
                  return true;
              }
          }
          return false;
      };
      /**
       * Check if a given scope is present in the request
       *
       * @param cachedScopes
       * @param scopes
       */
      ScopeSet.containsScope = function (cachedScopes, scopes) {
          var convertedCachedScopes = this.trimAndConvertArrayToLowerCase(cachedScopes.slice());
          var requestScopes = this.trimAndConvertArrayToLowerCase(scopes.slice());
          return requestScopes.every(function (value) { return convertedCachedScopes.indexOf(value.toString().toLowerCase()) >= 0; });
      };
      /**
       *  Trims and converts string to lower case
       *
       * @param scopes
       */
      // TODO: Rename this, too generic name for a function that only deals with scopes
      ScopeSet.trimAndConvertToLowerCase = function (scope) {
          return scope.trim().toLowerCase();
      };
      /**
       * Performs trimAndConvertToLowerCase on string array
       * @param scopes
       */
      ScopeSet.trimAndConvertArrayToLowerCase = function (scopes) {
          var _this = this;
          return scopes.map(function (scope) { return _this.trimAndConvertToLowerCase(scope); });
      };
      /**
       * Trims each scope in scopes array
       * @param scopes
       */
      ScopeSet.trimScopes = function (scopes) {
          return scopes.map(function (scope) { return scope.trim(); });
      };
      /**
       * Remove one element from a scope array
       *
       * @param scopes
       * @param scope
       */
      // TODO: Rename this, too generic name for a function that only deals with scopes
      ScopeSet.removeElement = function (scopes, scope) {
          var scopeVal = this.trimAndConvertToLowerCase(scope);
          return scopes.filter(function (value) { return value !== scopeVal; });
      };
      /**
       * Parse the scopes into a formatted scopeList
       * @param scopes
       */
      ScopeSet.parseScope = function (scopes) {
          var scopeList = "";
          if (scopes) {
              for (var i = 0; i < scopes.length; ++i) {
                  scopeList += (i !== scopes.length - 1) ? scopes[i] + " " : scopes[i];
              }
          }
          return scopeList;
      };
      /**
       * @hidden
       *
       * Used to validate the scopes input parameter requested  by the developer.
       * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
       * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
       * @ignore
       */
      ScopeSet.validateInputScope = function (scopes, scopesRequired, clientId) {
          if (!scopes) {
              if (scopesRequired) {
                  throw ClientConfigurationError.createScopesRequiredError(scopes);
              }
              else {
                  return;
              }
          }
          // Check that scopes is an array object (also throws error if scopes == null)
          if (!Array.isArray(scopes)) {
              throw ClientConfigurationError.createScopesNonArrayError(scopes);
          }
          // Check that scopes is not an empty array
          if (scopes.length < 1 && scopesRequired) {
              throw ClientConfigurationError.createEmptyScopesArrayError(scopes.toString());
          }
      };
      /**
       * @hidden
       *
       * Extracts scope value from the state sent with the authentication request.
       * @param {string} state
       * @returns {string} scope.
       * @ignore
       */
      ScopeSet.getScopeFromState = function (state) {
          if (state) {
              var splitIndex = state.indexOf(Constants.resourceDelimiter);
              if (splitIndex > -1 && splitIndex + 1 < state.length) {
                  return state.substring(splitIndex + 1);
              }
          }
          return "";
      };
      /**
       * @ignore
       * Appends extraScopesToConsent if passed
       * @param {@link AuthenticationParameters}
       */
      ScopeSet.appendScopes = function (reqScopes, reqExtraScopesToConsent) {
          if (reqScopes) {
              var convertedExtraScopes = reqExtraScopesToConsent ? this.trimAndConvertArrayToLowerCase(reqExtraScopesToConsent.slice()) : null;
              var convertedReqScopes = this.trimAndConvertArrayToLowerCase(reqScopes.slice());
              return convertedExtraScopes ? convertedReqScopes.concat(convertedExtraScopes) : convertedReqScopes;
          }
          return null;
      };
      // #endregion
      /**
       * @ignore
       * Returns true if the scopes array only contains openid and/or profile
       */
      ScopeSet.onlyContainsOidcScopes = function (scopes) {
          var scopesCount = scopes.length;
          var oidcScopesFound = 0;
          if (scopes.indexOf(Constants.openidScope) > -1) {
              oidcScopesFound += 1;
          }
          if (scopes.indexOf(Constants.profileScope) > -1) {
              oidcScopesFound += 1;
          }
          return (scopesCount > 0 && scopesCount === oidcScopesFound);
      };
      /**
       * @ignore
       * Returns true if the scopes array only contains openid and/or profile
       */
      ScopeSet.containsAnyOidcScopes = function (scopes) {
          var containsOpenIdScope = scopes.indexOf(Constants.openidScope) > -1;
          var containsProfileScope = scopes.indexOf(Constants.profileScope) > -1;
          return (containsOpenIdScope || containsProfileScope);
      };
      /**
       * @ignore
       * Returns true if the clientId is the only scope in the array
       */
      ScopeSet.onlyContainsClientId = function (scopes, clientId) {
          // Double negation to force false value returned in case scopes is null
          return !!scopes && (scopes.indexOf(clientId) > -1 && scopes.length === 1);
      };
      /**
       * @ignore
       * Adds missing OIDC scopes to scopes array withot duplication. Since STS requires OIDC scopes for
       * all implicit flow requests, 'openid' and 'profile' should always be included in the final request
       */
      ScopeSet.appendDefaultScopes = function (scopes) {
          var extendedScopes = scopes;
          if (extendedScopes.indexOf(Constants.openidScope) === -1) {
              extendedScopes.push(Constants.openidScope);
          }
          if (extendedScopes.indexOf(Constants.profileScope) === -1) {
              extendedScopes.push(Constants.profileScope);
          }
          return extendedScopes;
      };
      /**
       * @ignore
       * Removes clientId from scopes array if included as only scope. If it's not the only scope, it is treated as a resource scope.
       * @param scopes Array<string>: Pre-normalized scopes array
       * @param clientId string: The application's clientId that is searched for in the scopes array
       */
      ScopeSet.translateClientIdIfSingleScope = function (scopes, clientId) {
          return this.onlyContainsClientId(scopes, clientId) ? Constants.oidcScopes : scopes;
      };
      return ScopeSet;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var UrlUtils = /** @class */ (function () {
      function UrlUtils() {
      }
      /**
       * generates the URL with QueryString Parameters
       * @param scopes
       */
      UrlUtils.createNavigateUrl = function (serverRequestParams) {
          var str = this.createNavigationUrlString(serverRequestParams);
          var authEndpoint = serverRequestParams.authorityInstance.AuthorizationEndpoint;
          // if the endpoint already has queryparams, lets add to it, otherwise add the first one
          if (authEndpoint.indexOf("?") < 0) {
              authEndpoint += "?";
          }
          else {
              authEndpoint += "&";
          }
          var requestUrl = "" + authEndpoint + str.join("&");
          return requestUrl;
      };
      /**
       * Generate the array of all QueryStringParams to be sent to the server
       * @param scopes
       */
      UrlUtils.createNavigationUrlString = function (serverRequestParams) {
          var scopes = ScopeSet.appendDefaultScopes(serverRequestParams.scopes);
          var str = [];
          str.push("response_type=" + serverRequestParams.responseType);
          str.push("scope=" + encodeURIComponent(ScopeSet.parseScope(scopes)));
          str.push("client_id=" + encodeURIComponent(serverRequestParams.clientId));
          str.push("redirect_uri=" + encodeURIComponent(serverRequestParams.redirectUri));
          str.push("state=" + encodeURIComponent(serverRequestParams.state));
          str.push("nonce=" + encodeURIComponent(serverRequestParams.nonce));
          str.push("client_info=1");
          str.push("x-client-SKU=" + serverRequestParams.xClientSku);
          str.push("x-client-Ver=" + serverRequestParams.xClientVer);
          if (serverRequestParams.promptValue) {
              str.push("prompt=" + encodeURIComponent(serverRequestParams.promptValue));
          }
          if (serverRequestParams.claimsValue) {
              str.push("claims=" + encodeURIComponent(serverRequestParams.claimsValue));
          }
          if (serverRequestParams.queryParameters) {
              str.push(serverRequestParams.queryParameters);
          }
          if (serverRequestParams.extraQueryParameters) {
              str.push(serverRequestParams.extraQueryParameters);
          }
          str.push("client-request-id=" + encodeURIComponent(serverRequestParams.correlationId));
          return str;
      };
      /**
       * Returns current window URL as redirect uri
       */
      UrlUtils.getCurrentUrl = function () {
          return window.location.href.split("?")[0].split("#")[0];
      };
      /**
       * Returns given URL with query string removed
       */
      UrlUtils.removeHashFromUrl = function (url) {
          return url.split("#")[0];
      };
      /**
       * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
       * @param href The url
       * @param tenantId The tenant id to replace
       */
      UrlUtils.replaceTenantPath = function (url, tenantId) {
          var lowerCaseUrl = url.toLowerCase();
          var urlObject = this.GetUrlComponents(lowerCaseUrl);
          var pathArray = urlObject.PathSegments;
          if (tenantId && (pathArray.length !== 0 && (pathArray[0] === Constants.common || pathArray[0] === SSOTypes.ORGANIZATIONS))) {
              pathArray[0] = tenantId;
          }
          return this.constructAuthorityUriFromObject(urlObject, pathArray);
      };
      UrlUtils.constructAuthorityUriFromObject = function (urlObject, pathArray) {
          return this.CanonicalizeUri(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/"));
      };
      /**
       * Checks if an authority is common (ex. https://a:b/common/)
       * @param url The url
       * @returns true if authority is common and false otherwise
       */
      UrlUtils.isCommonAuthority = function (url) {
          var authority = this.CanonicalizeUri(url);
          var pathArray = this.GetUrlComponents(authority).PathSegments;
          return (pathArray.length !== 0 && pathArray[0] === Constants.common);
      };
      /**
       * Checks if an authority is for organizations (ex. https://a:b/organizations/)
       * @param url The url
       * @returns true if authority is for  and false otherwise
       */
      UrlUtils.isOrganizationsAuthority = function (url) {
          var authority = this.CanonicalizeUri(url);
          var pathArray = this.GetUrlComponents(authority).PathSegments;
          return (pathArray.length !== 0 && pathArray[0] === SSOTypes.ORGANIZATIONS);
      };
      /**
       * Parses out the components from a url string.
       * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
       */
      UrlUtils.GetUrlComponents = function (url) {
          if (!url) {
              throw "Url required";
          }
          // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
          var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
          var match = url.match(regEx);
          if (!match || match.length < 6) {
              throw "Valid url required";
          }
          var urlComponents = {
              Protocol: match[1],
              HostNameAndPort: match[4],
              AbsolutePath: match[5]
          };
          var pathSegments = urlComponents.AbsolutePath.split("/");
          pathSegments = pathSegments.filter(function (val) { return val && val.length > 0; }); // remove empty elements
          urlComponents.PathSegments = pathSegments;
          if (match[6]) {
              urlComponents.Search = match[6];
          }
          if (match[8]) {
              urlComponents.Hash = match[8];
          }
          return urlComponents;
      };
      /**
       * Given a url or path, append a trailing slash if one doesnt exist
       *
       * @param url
       */
      UrlUtils.CanonicalizeUri = function (url) {
          if (url) {
              url = url.toLowerCase();
          }
          if (url && !UrlUtils.endsWith(url, "/")) {
              url += "/";
          }
          return url;
      };
      /**
       * Checks to see if the url ends with the suffix
       * Required because we are compiling for es5 instead of es6
       * @param url
       * @param str
       */
      // TODO: Rename this, not clear what it is supposed to do
      UrlUtils.endsWith = function (url, suffix) {
          if (!url || !suffix) {
              return false;
          }
          return url.indexOf(suffix, url.length - suffix.length) !== -1;
      };
      /**
       * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
       * @param url
       * @param name
       */
      UrlUtils.urlRemoveQueryStringParameter = function (url, name) {
          if (StringUtils.isEmpty(url)) {
              return url;
          }
          var regex = new RegExp("(\\&" + name + "=)[^\&]+");
          url = url.replace(regex, "");
          // name=value&
          regex = new RegExp("(" + name + "=)[^\&]+&");
          url = url.replace(regex, "");
          // name=value
          regex = new RegExp("(" + name + "=)[^\&]+");
          url = url.replace(regex, "");
          return url;
      };
      /**
       * @hidden
       * @ignore
       *
       * Returns the anchor part(#) of the URL
       */
      UrlUtils.getHashFromUrl = function (urlStringOrFragment) {
          var hashIndex1 = urlStringOrFragment.indexOf("#");
          var hashIndex2 = urlStringOrFragment.indexOf("#/");
          if (hashIndex2 > -1) {
              return urlStringOrFragment.substring(hashIndex2 + 2);
          }
          else if (hashIndex1 > -1) {
              return urlStringOrFragment.substring(hashIndex1 + 1);
          }
          return urlStringOrFragment;
      };
      /**
       * @hidden
       * Check if the url contains a hash with known properties
       * @ignore
       */
      UrlUtils.urlContainsHash = function (urlString) {
          var parameters = UrlUtils.deserializeHash(urlString);
          return (parameters.hasOwnProperty(ServerHashParamKeys.ERROR_DESCRIPTION) ||
              parameters.hasOwnProperty(ServerHashParamKeys.ERROR) ||
              parameters.hasOwnProperty(ServerHashParamKeys.ACCESS_TOKEN) ||
              parameters.hasOwnProperty(ServerHashParamKeys.ID_TOKEN));
      };
      /**
       * @hidden
       * Returns deserialized portion of URL hash
       * @ignore
       */
      UrlUtils.deserializeHash = function (urlFragment) {
          var hash = UrlUtils.getHashFromUrl(urlFragment);
          return CryptoUtils.deserialize(hash);
      };
      /**
       * @ignore
       * @param {string} URI
       * @returns {string} host from the URI
       *
       * extract URI from the host
       */
      UrlUtils.getHostFromUri = function (uri) {
          // remove http:// or https:// from uri
          var extractedUri = String(uri).replace(/^(https?:)\/\//, "");
          extractedUri = extractedUri.split("/")[0];
          return extractedUri;
      };
      return UrlUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var AccessTokenKey = /** @class */ (function () {
      function AccessTokenKey(authority, clientId, scopes, uid, utid) {
          this.authority = UrlUtils.CanonicalizeUri(authority);
          this.clientId = clientId;
          this.scopes = scopes;
          this.homeAccountIdentifier = CryptoUtils.base64Encode(uid) + "." + CryptoUtils.base64Encode(utid);
      }
      return AccessTokenKey;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var AccessTokenValue = /** @class */ (function () {
      function AccessTokenValue(accessToken, idToken, expiresIn, homeAccountIdentifier) {
          this.accessToken = accessToken;
          this.idToken = idToken;
          this.expiresIn = expiresIn;
          this.homeAccountIdentifier = homeAccountIdentifier;
      }
      return AccessTokenValue;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * Nonce: OIDC Nonce definition: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
   * State: OAuth Spec: https://tools.ietf.org/html/rfc6749#section-10.12
   * @hidden
   */
  var ServerRequestParameters = /** @class */ (function () {
      /**
       * Constructor
       * @param authority
       * @param clientId
       * @param scope
       * @param responseType
       * @param redirectUri
       * @param state
       */
      function ServerRequestParameters(authority, clientId, responseType, redirectUri, scopes, state, correlationId) {
          this.authorityInstance = authority;
          this.clientId = clientId;
          this.nonce = CryptoUtils.createNewGuid();
          // set scope to clientId if null
          this.scopes = scopes ? scopes.slice() : Constants.oidcScopes;
          this.scopes = ScopeSet.trimScopes(this.scopes);
          // set state (already set at top level)
          this.state = state;
          // set correlationId
          this.correlationId = correlationId;
          // telemetry information
          this.xClientSku = "MSAL.JS";
          this.xClientVer = libraryVersion();
          this.responseType = responseType;
          this.redirectUri = redirectUri;
      }
      Object.defineProperty(ServerRequestParameters.prototype, "authority", {
          get: function () {
              return this.authorityInstance ? this.authorityInstance.CanonicalAuthority : null;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * @hidden
       * @ignore
       *
       * Utility to populate QueryParameters and ExtraQueryParameters to ServerRequestParamerers
       * @param request
       * @param serverAuthenticationRequest
       */
      ServerRequestParameters.prototype.populateQueryParams = function (account, request, adalIdTokenObject, silentCall) {
          var queryParameters = {};
          if (request) {
              // add the prompt parameter to serverRequestParameters if passed
              if (request.prompt) {
                  this.promptValue = request.prompt;
              }
              // Add claims challenge to serverRequestParameters if passed
              if (request.claimsRequest) {
                  this.claimsValue = request.claimsRequest;
              }
              // if the developer provides one of these, give preference to developer choice
              if (ServerRequestParameters.isSSOParam(request)) {
                  queryParameters = this.constructUnifiedCacheQueryParameter(request, null);
              }
          }
          if (adalIdTokenObject) {
              queryParameters = this.constructUnifiedCacheQueryParameter(null, adalIdTokenObject);
          }
          /*
           * adds sid/login_hint if not populated
           * this.logger.verbose("Calling addHint parameters");
           */
          queryParameters = this.addHintParameters(account, queryParameters);
          // sanity check for developer passed extraQueryParameters
          var eQParams = request ? request.extraQueryParameters : null;
          // Populate the extraQueryParameters to be sent to the server
          this.queryParameters = ServerRequestParameters.generateQueryParametersString(queryParameters);
          this.extraQueryParameters = ServerRequestParameters.generateQueryParametersString(eQParams, silentCall);
      };
      // #region QueryParam helpers
      /**
       * Constructs extraQueryParameters to be sent to the server for the AuthenticationParameters set by the developer
       * in any login() or acquireToken() calls
       * @param idTokenObject
       * @param extraQueryParameters
       * @param sid
       * @param loginHint
       */
      // TODO: check how this behaves when domain_hint only is sent in extraparameters and idToken has no upn.
      ServerRequestParameters.prototype.constructUnifiedCacheQueryParameter = function (request, idTokenObject) {
          // preference order: account > sid > login_hint
          var ssoType;
          var ssoData;
          var serverReqParam = {};
          // if account info is passed, account.sid > account.login_hint
          if (request) {
              if (request.account) {
                  var account = request.account;
                  if (account.sid) {
                      ssoType = SSOTypes.SID;
                      ssoData = account.sid;
                  }
                  else if (account.userName) {
                      ssoType = SSOTypes.LOGIN_HINT;
                      ssoData = account.userName;
                  }
              }
              // sid from request
              else if (request.sid) {
                  ssoType = SSOTypes.SID;
                  ssoData = request.sid;
              }
              // loginHint from request
              else if (request.loginHint) {
                  ssoType = SSOTypes.LOGIN_HINT;
                  ssoData = request.loginHint;
              }
          }
          // adalIdToken retrieved from cache
          else if (idTokenObject) {
              if (idTokenObject.hasOwnProperty(Constants.upn)) {
                  ssoType = SSOTypes.ID_TOKEN;
                  ssoData = idTokenObject.upn;
              }
          }
          serverReqParam = this.addSSOParameter(ssoType, ssoData);
          return serverReqParam;
      };
      /**
       * @hidden
       *
       * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
       * domain_hint if added skips the email based discovery process of the user - only supported for interactive calls in implicit_flow
       * domain_req utid received as part of the clientInfo
       * login_req uid received as part of clientInfo
       * Also does a sanity check for extraQueryParameters passed by the user to ensure no repeat queryParameters
       *
       * @param {@link Account} account - Account for which the token is requested
       * @param queryparams
       * @param {@link ServerRequestParameters}
       * @ignore
       */
      ServerRequestParameters.prototype.addHintParameters = function (account, qParams) {
          /*
           * This is a final check for all queryParams added so far; preference order: sid > login_hint
           * sid cannot be passed along with login_hint or domain_hint, hence we check both are not populated yet in queryParameters
           */
          if (account && !qParams[SSOTypes.SID]) {
              // sid - populate only if login_hint is not already populated and the account has sid
              var populateSID = !qParams[SSOTypes.LOGIN_HINT] && account.sid && this.promptValue === PromptState.NONE;
              if (populateSID) {
                  qParams = this.addSSOParameter(SSOTypes.SID, account.sid, qParams);
              }
              // login_hint - account.userName
              else {
                  var populateLoginHint = !qParams[SSOTypes.LOGIN_HINT] && account.userName && !StringUtils.isEmpty(account.userName);
                  if (populateLoginHint) {
                      qParams = this.addSSOParameter(SSOTypes.LOGIN_HINT, account.userName, qParams);
                  }
              }
          }
          return qParams;
      };
      /**
       * Add SID to extraQueryParameters
       * @param sid
       */
      ServerRequestParameters.prototype.addSSOParameter = function (ssoType, ssoData, ssoParam) {
          if (!ssoParam) {
              ssoParam = {};
          }
          if (!ssoData) {
              return ssoParam;
          }
          switch (ssoType) {
              case SSOTypes.SID: {
                  ssoParam[SSOTypes.SID] = ssoData;
                  break;
              }
              case SSOTypes.ID_TOKEN: {
                  ssoParam[SSOTypes.LOGIN_HINT] = ssoData;
                  break;
              }
              case SSOTypes.LOGIN_HINT: {
                  ssoParam[SSOTypes.LOGIN_HINT] = ssoData;
                  break;
              }
          }
          return ssoParam;
      };
      /**
       * Utility to generate a QueryParameterString from a Key-Value mapping of extraQueryParameters passed
       * @param extraQueryParameters
       */
      ServerRequestParameters.generateQueryParametersString = function (queryParameters, silentCall) {
          var paramsString = null;
          if (queryParameters) {
              Object.keys(queryParameters).forEach(function (key) {
                  // sid cannot be passed along with login_hint or domain_hint
                  if (key === Constants.domain_hint && (silentCall || queryParameters[SSOTypes.SID])) {
                      return;
                  }
                  if (paramsString == null) {
                      paramsString = key + "=" + encodeURIComponent(queryParameters[key]);
                  }
                  else {
                      paramsString += "&" + key + "=" + encodeURIComponent(queryParameters[key]);
                  }
              });
          }
          return paramsString;
      };
      // #endregion
      /**
       * Check to see if there are SSO params set in the Request
       * @param request
       */
      ServerRequestParameters.isSSOParam = function (request) {
          return request && (request.account || request.sid || request.loginHint);
      };
      /**
       * Returns the correct response_type string attribute for an acquireToken request configuration
       * @param accountsMatch boolean: Determines whether the account in the request matches the cached account
       * @param scopes Array<string>: AuthenticationRequest scopes configuration
       * @param loginScopesOnly boolean: True if the scopes array ONLY contains the clientId or any combination of OIDC scopes, without resource scopes
       */
      ServerRequestParameters.determineResponseType = function (accountsMatch, scopes) {
          // Supports getting an id_token by sending in clientId as only scope or OIDC scopes as only scopes
          if (ScopeSet.onlyContainsOidcScopes(scopes)) {
              return ResponseTypes.id_token;
          }
          // If accounts match, check if OIDC scopes are included, otherwise return id_token_token
          return (accountsMatch) ? this.responseTypeForMatchingAccounts(scopes) : ResponseTypes.id_token_token;
      };
      /**
       * Returns the correct response_type string attribute for an acquireToken request configuration that contains an
       * account that matches the account in the MSAL cache.
       * @param scopes Array<string>: AuthenticationRequest scopes configuration
       */
      ServerRequestParameters.responseTypeForMatchingAccounts = function (scopes) {
          // Opt-into also requesting an ID token by sending in 'openid', 'profile' or both along with resource scopes when login is not necessary.
          return (ScopeSet.containsAnyOidcScopes(scopes)) ? ResponseTypes.id_token_token : ResponseTypes.token;
      };
      return ServerRequestParameters;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * XHR client for JSON endpoints
   * https://www.npmjs.com/package/async-promise
   * @hidden
   */
  var XhrClient = /** @class */ (function () {
      function XhrClient() {
      }
      XhrClient.prototype.sendRequestAsync = function (url, method, enableCaching) {
          var _this = this;
          return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open(method, url, /* async: */ true);
              xhr.onload = function (ev) {
                  if (xhr.status < 200 || xhr.status >= 300) {
                      reject(_this.handleError(xhr.responseText));
                  }
                  var jsonResponse;
                  try {
                      jsonResponse = JSON.parse(xhr.responseText);
                  }
                  catch (e) {
                      reject(_this.handleError(xhr.responseText));
                  }
                  var response = {
                      statusCode: xhr.status,
                      body: jsonResponse
                  };
                  resolve(response);
              };
              xhr.onerror = function (ev) {
                  reject(xhr.status);
              };
              if (method === NetworkRequestType.GET) {
                  xhr.send();
              }
              else {
                  throw "not implemented";
              }
          });
      };
      XhrClient.prototype.handleError = function (responseText) {
          var jsonResponse;
          try {
              jsonResponse = JSON.parse(responseText);
              if (jsonResponse.error) {
                  return jsonResponse.error;
              }
              else {
                  throw responseText;
              }
          }
          catch (e) {
              return responseText;
          }
      };
      return XhrClient;
  }());

  var TrustedAuthority = /** @class */ (function () {
      function TrustedAuthority() {
      }
      /**
       *
       * @param validateAuthority
       * @param knownAuthorities
       */
      TrustedAuthority.setTrustedAuthoritiesFromConfig = function (validateAuthority, knownAuthorities) {
          if (validateAuthority && !this.getTrustedHostList().length) {
              knownAuthorities.forEach(function (authority) {
                  TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
              });
          }
      };
      /**
       *
       * @param telemetryManager
       * @param correlationId
       */
      TrustedAuthority.getAliases = function (authorityToVerify, telemetryManager, correlationId) {
          return __awaiter(this, void 0, void 0, function () {
              var client, httpMethod, instanceDiscoveryEndpoint, httpEvent;
              return __generator(this, function (_a) {
                  client = new XhrClient();
                  httpMethod = NetworkRequestType.GET;
                  instanceDiscoveryEndpoint = "" + AAD_INSTANCE_DISCOVERY_ENDPOINT + authorityToVerify + "oauth2/v2.0/authorize";
                  httpEvent = telemetryManager.createAndStartHttpEvent(correlationId, httpMethod, instanceDiscoveryEndpoint, "getAliases");
                  return [2 /*return*/, client.sendRequestAsync(instanceDiscoveryEndpoint, httpMethod, true)
                          .then(function (response) {
                          httpEvent.httpResponseStatus = response.statusCode;
                          telemetryManager.stopEvent(httpEvent);
                          return response.body.metadata;
                      })
                          .catch(function (err) {
                          httpEvent.serverErrorCode = err;
                          telemetryManager.stopEvent(httpEvent);
                          throw err;
                      })];
              });
          });
      };
      /**
       *
       * @param telemetryManager
       * @param correlationId
       */
      TrustedAuthority.setTrustedAuthoritiesFromNetwork = function (authorityToVerify, telemetryManager, correlationId) {
          return __awaiter(this, void 0, void 0, function () {
              var metadata, host;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.getAliases(authorityToVerify, telemetryManager, correlationId)];
                      case 1:
                          metadata = _a.sent();
                          metadata.forEach(function (entry) {
                              var authorities = entry.aliases;
                              authorities.forEach(function (authority) {
                                  TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
                              });
                          });
                          host = UrlUtils.GetUrlComponents(authorityToVerify).HostNameAndPort;
                          if (TrustedAuthority.getTrustedHostList().length && !TrustedAuthority.IsInTrustedHostList(host)) {
                              // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
                              TrustedAuthority.TrustedHostList.push(host.toLowerCase());
                          }
                          return [2 /*return*/];
                  }
              });
          });
      };
      TrustedAuthority.getTrustedHostList = function () {
          return this.TrustedHostList;
      };
      /**
       * Checks to see if the host is in a list of trusted hosts
       * @param host
       */
      TrustedAuthority.IsInTrustedHostList = function (host) {
          return this.TrustedHostList.indexOf(host.toLowerCase()) > -1;
      };
      TrustedAuthority.TrustedHostList = [];
      return TrustedAuthority;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var AuthorityType;
  (function (AuthorityType) {
      AuthorityType[AuthorityType["Default"] = 0] = "Default";
      AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
  })(AuthorityType || (AuthorityType = {}));
  /**
   * @hidden
   */
  var Authority = /** @class */ (function () {
      function Authority(authority, validateAuthority, authorityMetadata) {
          this.IsValidationEnabled = validateAuthority;
          this.CanonicalAuthority = authority;
          this.validateAsUri();
          this.tenantDiscoveryResponse = authorityMetadata;
      }
      Authority.isAdfs = function (authorityUrl) {
          var components = UrlUtils.GetUrlComponents(authorityUrl);
          var pathSegments = components.PathSegments;
          return (pathSegments.length && pathSegments[0].toLowerCase() === Constants.ADFS);
      };
      Object.defineProperty(Authority.prototype, "AuthorityType", {
          get: function () {
              return Authority.isAdfs(this.canonicalAuthority) ? AuthorityType.Adfs : AuthorityType.Default;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "Tenant", {
          get: function () {
              return this.CanonicalAuthorityUrlComponents.PathSegments[0];
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "AuthorizationEndpoint", {
          get: function () {
              this.validateResolved();
              return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace(/{tenant}|{tenantid}/g, this.Tenant);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "EndSessionEndpoint", {
          get: function () {
              this.validateResolved();
              return this.tenantDiscoveryResponse.EndSessionEndpoint.replace(/{tenant}|{tenantid}/g, this.Tenant);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "SelfSignedJwtAudience", {
          get: function () {
              this.validateResolved();
              return this.tenantDiscoveryResponse.Issuer.replace(/{tenant}|{tenantid}/g, this.Tenant);
          },
          enumerable: true,
          configurable: true
      });
      Authority.prototype.validateResolved = function () {
          if (!this.hasCachedMetadata()) {
              throw "Please call ResolveEndpointsAsync first";
          }
      };
      Object.defineProperty(Authority.prototype, "CanonicalAuthority", {
          /**
           * A URL that is the authority set by the developer
           */
          get: function () {
              return this.canonicalAuthority;
          },
          set: function (url) {
              this.canonicalAuthority = UrlUtils.CanonicalizeUri(url);
              this.canonicalAuthorityUrlComponents = null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "CanonicalAuthorityUrlComponents", {
          get: function () {
              if (!this.canonicalAuthorityUrlComponents) {
                  this.canonicalAuthorityUrlComponents = UrlUtils.GetUrlComponents(this.CanonicalAuthority);
              }
              return this.canonicalAuthorityUrlComponents;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Authority.prototype, "DefaultOpenIdConfigurationEndpoint", {
          // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
          get: function () {
              return (this.AuthorityType === AuthorityType.Adfs) ? "" + this.CanonicalAuthority + WELL_KNOWN_SUFFIX : this.CanonicalAuthority + "v2.0/" + WELL_KNOWN_SUFFIX;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Given a string, validate that it is of the form https://domain/path
       */
      Authority.prototype.validateAsUri = function () {
          var components;
          try {
              components = this.CanonicalAuthorityUrlComponents;
          }
          catch (e) {
              throw ClientConfigurationErrorMessage.invalidAuthorityType;
          }
          if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
              throw ClientConfigurationErrorMessage.authorityUriInsecure;
          }
          if (!components.PathSegments || components.PathSegments.length < 1) {
              throw ClientConfigurationErrorMessage.authorityUriInvalidPath;
          }
      };
      /**
       * Calls the OIDC endpoint and returns the response
       */
      Authority.prototype.DiscoverEndpoints = function (openIdConfigurationEndpoint, telemetryManager, correlationId) {
          var client = new XhrClient();
          var httpMethod = NetworkRequestType.GET;
          var httpEvent = telemetryManager.createAndStartHttpEvent(correlationId, httpMethod, openIdConfigurationEndpoint, "openIdConfigurationEndpoint");
          return client.sendRequestAsync(openIdConfigurationEndpoint, httpMethod, /* enableCaching: */ true)
              .then(function (response) {
              httpEvent.httpResponseStatus = response.statusCode;
              telemetryManager.stopEvent(httpEvent);
              return {
                  AuthorizationEndpoint: response.body.authorization_endpoint,
                  EndSessionEndpoint: response.body.end_session_endpoint,
                  Issuer: response.body.issuer
              };
          })
              .catch(function (err) {
              httpEvent.serverErrorCode = err;
              telemetryManager.stopEvent(httpEvent);
              throw err;
          });
      };
      /**
       * Returns a promise.
       * Checks to see if the authority is in the cache
       * Discover endpoints via openid-configuration
       * If successful, caches the endpoint for later use in OIDC
       */
      Authority.prototype.resolveEndpointsAsync = function (telemetryManager, correlationId) {
          return __awaiter(this, void 0, void 0, function () {
              var host, openIdConfigurationEndpointResponse, _a;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          if (!this.IsValidationEnabled) return [3 /*break*/, 3];
                          host = this.canonicalAuthorityUrlComponents.HostNameAndPort;
                          if (!(TrustedAuthority.getTrustedHostList().length === 0)) return [3 /*break*/, 2];
                          return [4 /*yield*/, TrustedAuthority.setTrustedAuthoritiesFromNetwork(this.canonicalAuthority, telemetryManager, correlationId)];
                      case 1:
                          _b.sent();
                          _b.label = 2;
                      case 2:
                          if (!TrustedAuthority.IsInTrustedHostList(host)) {
                              throw ClientConfigurationError.createUntrustedAuthorityError(host);
                          }
                          _b.label = 3;
                      case 3:
                          openIdConfigurationEndpointResponse = this.GetOpenIdConfigurationEndpoint();
                          _a = this;
                          return [4 /*yield*/, this.DiscoverEndpoints(openIdConfigurationEndpointResponse, telemetryManager, correlationId)];
                      case 4:
                          _a.tenantDiscoveryResponse = _b.sent();
                          return [2 /*return*/, this.tenantDiscoveryResponse];
                  }
              });
          });
      };
      /**
       * Checks if there is a cached tenant discovery response with required fields.
       */
      Authority.prototype.hasCachedMetadata = function () {
          return !!(this.tenantDiscoveryResponse &&
              this.tenantDiscoveryResponse.AuthorizationEndpoint &&
              this.tenantDiscoveryResponse.EndSessionEndpoint &&
              this.tenantDiscoveryResponse.Issuer);
      };
      /**
       * Returns a promise which resolves to the OIDC endpoint
       * Only responds with the endpoint
       */
      Authority.prototype.GetOpenIdConfigurationEndpoint = function () {
          return this.DefaultOpenIdConfigurationEndpoint;
      };
      return Authority;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var ClientInfo = /** @class */ (function () {
      function ClientInfo(rawClientInfo, authority) {
          if (!rawClientInfo || StringUtils.isEmpty(rawClientInfo)) {
              this.uid = "";
              this.utid = "";
              return;
          }
          try {
              var decodedClientInfo = CryptoUtils.base64Decode(rawClientInfo);
              var clientInfo = JSON.parse(decodedClientInfo);
              if (clientInfo) {
                  if (clientInfo.hasOwnProperty("uid")) {
                      this.uid = authority ? ClientInfo.stripPolicyFromUid(clientInfo.uid, authority) : clientInfo.uid;
                  }
                  if (clientInfo.hasOwnProperty("utid")) {
                      this.utid = clientInfo.utid;
                  }
              }
          }
          catch (e) {
              throw ClientAuthError.createClientInfoDecodingError(e);
          }
      }
      Object.defineProperty(ClientInfo.prototype, "uid", {
          get: function () {
              return this._uid ? this._uid : "";
          },
          set: function (uid) {
              this._uid = uid;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ClientInfo.prototype, "utid", {
          get: function () {
              return this._utid ? this._utid : "";
          },
          set: function (utid) {
              this._utid = utid;
          },
          enumerable: true,
          configurable: true
      });
      ClientInfo.createClientInfoFromIdToken = function (idToken, authority) {
          var clientInfo = {
              uid: idToken.subject,
              utid: ""
          };
          return new ClientInfo(CryptoUtils.base64Encode(JSON.stringify(clientInfo)), authority);
      };
      ClientInfo.stripPolicyFromUid = function (uid, authority) {
          var uidSegments = uid.split("-");
          // Reverse the url segments so the last one is more easily accessible
          var urlSegments = authority.split("/").reverse();
          var policy = "";
          if (!StringUtils.isEmpty(urlSegments[0])) {
              policy = urlSegments[0];
          }
          else if (urlSegments.length > 1) {
              // If the original url had a trailing slash, urlSegments[0] would be "" so take the next element
              policy = urlSegments[1];
          }
          if (uidSegments[uidSegments.length - 1] === policy) {
              // If the last segment of uid matches the last segment of authority url, remove the last segment of uid
              return uidSegments.slice(0, uidSegments.length - 1).join("-");
          }
          return uid;
      };
      ClientInfo.prototype.encodeClientInfo = function () {
          var clientInfo = JSON.stringify({ uid: this.uid, utid: this.utid });
          return CryptoUtils.base64Encode(clientInfo);
      };
      return ClientInfo;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var TokenUtils = /** @class */ (function () {
      function TokenUtils() {
      }
      /**
       * decode a JWT
       *
       * @param jwtToken
       */
      TokenUtils.decodeJwt = function (jwtToken) {
          if (StringUtils.isEmpty(jwtToken)) {
              return null;
          }
          var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
          var matches = idTokenPartsRegex.exec(jwtToken);
          if (!matches || matches.length < 4) {
              // this._requestContext.logger.warn("The returned id_token is not parseable.");
              return null;
          }
          var crackedToken = {
              header: matches[1],
              JWSPayload: matches[2],
              JWSSig: matches[3]
          };
          return crackedToken;
      };
      /**
       * Extract IdToken by decoding the RAWIdToken
       *
       * @param encodedIdToken
       */
      TokenUtils.extractIdToken = function (encodedIdToken) {
          // id token will be decoded to get the username
          var decodedToken = this.decodeJwt(encodedIdToken);
          if (!decodedToken) {
              return null;
          }
          try {
              var base64IdToken = decodedToken.JWSPayload;
              var base64Decoded = CryptoUtils.base64Decode(base64IdToken);
              if (!base64Decoded) {
                  // this._requestContext.logger.info("The returned id_token could not be base64 url safe decoded.");
                  return null;
              }
              // ECMA script has JSON built-in support
              return JSON.parse(base64Decoded);
          }
          catch (err) {
              // this._requestContext.logger.error("The returned id_token could not be decoded" + err);
          }
          return null;
      };
      return TokenUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var IdToken = /** @class */ (function () {
      /* tslint:disable:no-string-literal */
      function IdToken(rawIdToken) {
          if (StringUtils.isEmpty(rawIdToken)) {
              throw ClientAuthError.createIdTokenNullOrEmptyError(rawIdToken);
          }
          try {
              this.rawIdToken = rawIdToken;
              this.claims = TokenUtils.extractIdToken(rawIdToken);
              if (this.claims) {
                  if (this.claims.hasOwnProperty("iss")) {
                      this.issuer = this.claims["iss"];
                  }
                  if (this.claims.hasOwnProperty("oid")) {
                      this.objectId = this.claims["oid"];
                  }
                  if (this.claims.hasOwnProperty("sub")) {
                      this.subject = this.claims["sub"];
                  }
                  if (this.claims.hasOwnProperty("tid")) {
                      this.tenantId = this.claims["tid"];
                  }
                  if (this.claims.hasOwnProperty("ver")) {
                      this.version = this.claims["ver"];
                  }
                  if (this.claims.hasOwnProperty("preferred_username")) {
                      this.preferredName = this.claims["preferred_username"];
                  }
                  else if (this.claims.hasOwnProperty("upn")) {
                      this.preferredName = this.claims["upn"];
                  }
                  if (this.claims.hasOwnProperty("name")) {
                      this.name = this.claims["name"];
                  }
                  if (this.claims.hasOwnProperty("nonce")) {
                      this.nonce = this.claims["nonce"];
                  }
                  if (this.claims.hasOwnProperty("exp")) {
                      this.expiration = this.claims["exp"];
                  }
                  if (this.claims.hasOwnProperty("home_oid")) {
                      this.homeObjectId = this.claims["home_oid"];
                  }
                  if (this.claims.hasOwnProperty("sid")) {
                      this.sid = this.claims["sid"];
                  }
                  if (this.claims.hasOwnProperty("cloud_instance_host_name")) {
                      this.cloudInstance = this.claims["cloud_instance_host_name"];
                  }
                  /* tslint:enable:no-string-literal */
              }
          }
          catch (e) {
              /*
               * TODO: This error here won't really every be thrown, since extractIdToken() returns null if the decodeJwt() fails.
               * Need to add better error handling here to account for being unable to decode jwts.
               */
              throw ClientAuthError.createIdTokenParsingError(e);
          }
      }
      return IdToken;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var AccessTokenCacheItem = /** @class */ (function () {
      function AccessTokenCacheItem(key, value) {
          this.key = key;
          this.value = value;
      }
      return AccessTokenCacheItem;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var BrowserStorage = /** @class */ (function () {
      function BrowserStorage(cacheLocation) {
          if (!window) {
              throw AuthError.createNoWindowObjectError("Browser storage class could not find window object");
          }
          var storageSupported = typeof window[cacheLocation] !== "undefined" && window[cacheLocation] != null;
          if (!storageSupported) {
              throw ClientConfigurationError.createStorageNotSupportedError(cacheLocation);
          }
          this.cacheLocation = cacheLocation;
      }
      /**
       * add value to storage
       * @param key
       * @param value
       * @param enableCookieStorage
       */
      BrowserStorage.prototype.setItem = function (key, value, enableCookieStorage) {
          window[this.cacheLocation].setItem(key, value);
          if (enableCookieStorage) {
              this.setItemCookie(key, value);
          }
      };
      /**
       * get one item by key from storage
       * @param key
       * @param enableCookieStorage
       */
      BrowserStorage.prototype.getItem = function (key, enableCookieStorage) {
          if (enableCookieStorage && this.getItemCookie(key)) {
              return this.getItemCookie(key);
          }
          return window[this.cacheLocation].getItem(key);
      };
      /**
       * remove value from storage
       * @param key
       */
      BrowserStorage.prototype.removeItem = function (key) {
          return window[this.cacheLocation].removeItem(key);
      };
      /**
       * clear storage (remove all items from it)
       */
      BrowserStorage.prototype.clear = function () {
          return window[this.cacheLocation].clear();
      };
      /**
       * add value to cookies
       * @param cName
       * @param cValue
       * @param expires
       */
      BrowserStorage.prototype.setItemCookie = function (cName, cValue, expires) {
          var cookieStr = cName + "=" + cValue + ";path=/;";
          if (expires) {
              var expireTime = this.getCookieExpirationTime(expires);
              cookieStr += "expires=" + expireTime + ";";
          }
          document.cookie = cookieStr;
      };
      /**
       * get one item by key from cookies
       * @param cName
       */
      BrowserStorage.prototype.getItemCookie = function (cName) {
          var name = cName + "=";
          var ca = document.cookie.split(";");
          for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) === " ") {
                  c = c.substring(1);
              }
              if (c.indexOf(name) === 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      };
      /**
       * Clear an item in the cookies by key
       * @param cName
       */
      BrowserStorage.prototype.clearItemCookie = function (cName) {
          this.setItemCookie(cName, "", -1);
      };
      /**
       * Get cookie expiration time
       * @param cookieLifeDays
       */
      BrowserStorage.prototype.getCookieExpirationTime = function (cookieLifeDays) {
          var today = new Date();
          var expr = new Date(today.getTime() + cookieLifeDays * 24 * 60 * 60 * 1000);
          return expr.toUTCString();
      };
      return BrowserStorage;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var TimeUtils = /** @class */ (function () {
      function TimeUtils() {
      }
      /**
       * Returns time in seconds for expiration based on string value passed in.
       *
       * @param expiresIn
       */
      TimeUtils.parseExpiresIn = function (expiresIn) {
          // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
          if (!expiresIn) {
              expiresIn = "3599";
          }
          return parseInt(expiresIn, 10);
      };
      /**
       * Return the current time in Unix time (seconds). Date.getTime() returns in milliseconds.
       */
      TimeUtils.now = function () {
          return Math.round(new Date().getTime() / 1000.0);
      };
      /**
       * Returns the amount of time in milliseconds since the page loaded.
       */
      TimeUtils.relativeNowMs = function () {
          return window.performance.now();
      };
      return TimeUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var RequestUtils = /** @class */ (function () {
      function RequestUtils() {
      }
      /**
       * @ignore
       *
       * @param request
       * @param isLoginCall
       * @param cacheStorage
       * @param clientId
       *
       * validates all request parameters and generates a consumable request object
       */
      RequestUtils.validateRequest = function (request, isLoginCall, clientId, interactionType) {
          // Throw error if request is empty for acquire * calls
          if (!isLoginCall && !request) {
              throw ClientConfigurationError.createEmptyRequestError();
          }
          var scopes;
          var extraQueryParameters;
          if (request) {
              // if extraScopesToConsent is passed in loginCall, append them to the login request; Validate and filter scopes (the validate function will throw if validation fails)
              scopes = isLoginCall ? ScopeSet.appendScopes(request.scopes, request.extraScopesToConsent) : request.scopes;
              ScopeSet.validateInputScope(scopes, !isLoginCall, clientId);
              scopes = ScopeSet.translateClientIdIfSingleScope(scopes, clientId);
              // validate prompt parameter
              this.validatePromptParameter(request.prompt);
              // validate extraQueryParameters
              extraQueryParameters = this.validateEQParameters(request.extraQueryParameters, request.claimsRequest);
              // validate claimsRequest
              this.validateClaimsRequest(request.claimsRequest);
          }
          // validate and generate state and correlationId
          var state = this.validateAndGenerateState(request && request.state, interactionType);
          var correlationId = this.validateAndGenerateCorrelationId(request && request.correlationId);
          var validatedRequest = __assign({}, request, { extraQueryParameters: extraQueryParameters,
              scopes: scopes,
              state: state,
              correlationId: correlationId });
          return validatedRequest;
      };
      /**
       * @ignore
       *
       * Utility to test if valid prompt value is passed in the request
       * @param request
       */
      RequestUtils.validatePromptParameter = function (prompt) {
          if (prompt) {
              if ([PromptState.LOGIN, PromptState.SELECT_ACCOUNT, PromptState.CONSENT, PromptState.NONE].indexOf(prompt) < 0) {
                  throw ClientConfigurationError.createInvalidPromptError(prompt);
              }
          }
      };
      /**
       * @ignore
       *
       * Removes unnecessary or duplicate query parameters from extraQueryParameters
       * @param request
       */
      RequestUtils.validateEQParameters = function (extraQueryParameters, claimsRequest) {
          var eQParams = __assign({}, extraQueryParameters);
          if (!eQParams) {
              return null;
          }
          if (claimsRequest) {
              // this.logger.warning("Removed duplicate claims from extraQueryParameters. Please use either the claimsRequest field OR pass as extraQueryParameter - not both.");
              delete eQParams[Constants.claims];
          }
          BlacklistedEQParams.forEach(function (param) {
              if (eQParams[param]) {
                  // this.logger.warning("Removed duplicate " + param + " from extraQueryParameters. Please use the " + param + " field in request object.");
                  delete eQParams[param];
              }
          });
          return eQParams;
      };
      /**
       * @ignore
       *
       * Validates the claims passed in request is a JSON
       * TODO: More validation will be added when the server team tells us how they have actually implemented claims
       * @param claimsRequest
       */
      RequestUtils.validateClaimsRequest = function (claimsRequest) {
          if (!claimsRequest) {
              return;
          }
          var claims;
          try {
              claims = JSON.parse(claimsRequest);
          }
          catch (e) {
              throw ClientConfigurationError.createClaimsRequestParsingError(e);
          }
      };
      /**
       * @ignore
       *
       * generate unique state per request
       * @param userState User-provided state value
       * @returns State string include library state and user state
       */
      RequestUtils.validateAndGenerateState = function (userState, interactionType) {
          return !StringUtils.isEmpty(userState) ? "" + RequestUtils.generateLibraryState(interactionType) + Constants.resourceDelimiter + userState : RequestUtils.generateLibraryState(interactionType);
      };
      /**
       * Generates the state value used by the library.
       *
       * @returns Base64 encoded string representing the state
       */
      RequestUtils.generateLibraryState = function (interactionType) {
          var stateObject = {
              id: CryptoUtils.createNewGuid(),
              ts: TimeUtils.now(),
              method: interactionType
          };
          var stateString = JSON.stringify(stateObject);
          return CryptoUtils.base64Encode(stateString);
      };
      /**
       * Decodes the state value into a StateObject
       *
       * @param state State value returned in the request
       * @returns Parsed values from the encoded state value
       */
      RequestUtils.parseLibraryState = function (state) {
          var libraryState = decodeURIComponent(state).split(Constants.resourceDelimiter)[0];
          if (CryptoUtils.isGuid(libraryState)) {
              // If state is guid, assume timestamp is now and is redirect, as redirect should be only method where this can happen.
              return {
                  id: libraryState,
                  ts: TimeUtils.now(),
                  method: Constants.interactionTypeRedirect
              };
          }
          try {
              var stateString = CryptoUtils.base64Decode(libraryState);
              var stateObject = JSON.parse(stateString);
              return stateObject;
          }
          catch (e) {
              throw ClientAuthError.createInvalidStateError(state, null);
          }
      };
      /**
       * @ignore
       *
       * validate correlationId and generate if not valid or not set by the user
       * @param correlationId
       */
      RequestUtils.validateAndGenerateCorrelationId = function (correlationId) {
          // validate user set correlationId or set one for the user if null
          if (correlationId && !CryptoUtils.isGuid(correlationId)) {
              throw ClientConfigurationError.createInvalidCorrelationIdError();
          }
          return CryptoUtils.isGuid(correlationId) ? correlationId : CryptoUtils.createNewGuid();
      };
      /**
       * Create a request signature
       * @param request
       */
      RequestUtils.createRequestSignature = function (request) {
          return "" + request.scopes.join(" ").toLowerCase() + Constants.resourceDelimiter + request.authority;
      };
      return RequestUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var AuthCache = /** @class */ (function (_super) {
      __extends(AuthCache, _super);
      function AuthCache(clientId, cacheLocation, storeAuthStateInCookie) {
          var _this = _super.call(this, cacheLocation) || this;
          _this.clientId = clientId;
          // This is hardcoded to true for now. We may make this configurable in the future
          _this.rollbackEnabled = true;
          _this.migrateCacheEntries(storeAuthStateInCookie);
          return _this;
      }
      /**
       * Support roll back to old cache schema until the next major release: true by default now
       * @param storeAuthStateInCookie
       */
      AuthCache.prototype.migrateCacheEntries = function (storeAuthStateInCookie) {
          var _this = this;
          var idTokenKey = Constants.cachePrefix + "." + PersistentCacheKeys.IDTOKEN;
          var clientInfoKey = Constants.cachePrefix + "." + PersistentCacheKeys.CLIENT_INFO;
          var errorKey = Constants.cachePrefix + "." + ErrorCacheKeys.ERROR;
          var errorDescKey = Constants.cachePrefix + "." + ErrorCacheKeys.ERROR_DESC;
          var idTokenValue = _super.prototype.getItem.call(this, idTokenKey);
          var clientInfoValue = _super.prototype.getItem.call(this, clientInfoKey);
          var errorValue = _super.prototype.getItem.call(this, errorKey);
          var errorDescValue = _super.prototype.getItem.call(this, errorDescKey);
          var values = [idTokenValue, clientInfoValue, errorValue, errorDescValue];
          var keysToMigrate = [PersistentCacheKeys.IDTOKEN, PersistentCacheKeys.CLIENT_INFO, ErrorCacheKeys.ERROR, ErrorCacheKeys.ERROR_DESC];
          keysToMigrate.forEach(function (cacheKey, index) { return _this.duplicateCacheEntry(cacheKey, values[index], storeAuthStateInCookie); });
      };
      /**
       * Utility function to help with roll back keys
       * @param newKey
       * @param value
       * @param storeAuthStateInCookie
       */
      AuthCache.prototype.duplicateCacheEntry = function (newKey, value, storeAuthStateInCookie) {
          if (value) {
              this.setItem(newKey, value, storeAuthStateInCookie);
          }
      };
      /**
       * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
       * @param key
       * @param addInstanceId
       */
      AuthCache.prototype.generateCacheKey = function (key, addInstanceId) {
          try {
              // Defined schemas do not need the key appended
              JSON.parse(key);
              return key;
          }
          catch (e) {
              if (key.indexOf("" + Constants.cachePrefix) === 0 || key.indexOf(Constants.adalIdToken) === 0) {
                  return key;
              }
              return addInstanceId ? Constants.cachePrefix + "." + this.clientId + "." + key : Constants.cachePrefix + "." + key;
          }
      };
      /**
       * add value to storage
       * @param key
       * @param value
       * @param enableCookieStorage
       */
      AuthCache.prototype.setItem = function (key, value, enableCookieStorage) {
          _super.prototype.setItem.call(this, this.generateCacheKey(key, true), value, enableCookieStorage);
          // Values stored in cookies will have rollback disabled to minimize cookie length
          if (this.rollbackEnabled && !enableCookieStorage) {
              _super.prototype.setItem.call(this, this.generateCacheKey(key, false), value, enableCookieStorage);
          }
      };
      /**
       * get one item by key from storage
       * @param key
       * @param enableCookieStorage
       */
      AuthCache.prototype.getItem = function (key, enableCookieStorage) {
          return _super.prototype.getItem.call(this, this.generateCacheKey(key, true), enableCookieStorage);
      };
      /**
       * remove value from storage
       * @param key
       */
      AuthCache.prototype.removeItem = function (key) {
          _super.prototype.removeItem.call(this, this.generateCacheKey(key, true));
          if (this.rollbackEnabled) {
              _super.prototype.removeItem.call(this, this.generateCacheKey(key, false));
          }
      };
      /**
       * Reset the cache items
       */
      AuthCache.prototype.resetCacheItems = function () {
          var storage = window[this.cacheLocation];
          var key;
          for (key in storage) {
              // Check if key contains msal prefix; For now, we are clearing all cache items created by MSAL.js
              if (storage.hasOwnProperty(key) && (key.indexOf(Constants.cachePrefix) !== -1)) {
                  _super.prototype.removeItem.call(this, key);
                  // TODO: Clear cache based on client id (clarify use cases where this is needed)
              }
          }
      };
      /**
       * Reset all temporary cache items
       */
      AuthCache.prototype.resetTempCacheItems = function (state) {
          var _this = this;
          var stateId = state && RequestUtils.parseLibraryState(state).id;
          var isTokenRenewalInProgress = this.tokenRenewalInProgress(state);
          var storage = window[this.cacheLocation];
          // check state and remove associated cache
          if (stateId && !isTokenRenewalInProgress) {
              Object.keys(storage).forEach(function (key) {
                  if (key.indexOf(stateId) !== -1) {
                      _this.removeItem(key);
                      _super.prototype.clearItemCookie.call(_this, key);
                  }
              });
          }
          // delete the interaction status cache
          this.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
          this.removeItem(TemporaryCacheKeys.REDIRECT_REQUEST);
      };
      /**
       * Set cookies for IE
       * @param cName
       * @param cValue
       * @param expires
       */
      AuthCache.prototype.setItemCookie = function (cName, cValue, expires) {
          _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, true), cValue, expires);
          if (this.rollbackEnabled) {
              _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, false), cValue, expires);
          }
      };
      AuthCache.prototype.clearItemCookie = function (cName) {
          _super.prototype.clearItemCookie.call(this, this.generateCacheKey(cName, true));
          if (this.rollbackEnabled) {
              _super.prototype.clearItemCookie.call(this, this.generateCacheKey(cName, false));
          }
      };
      /**
       * get one item by key from cookies
       * @param cName
       */
      AuthCache.prototype.getItemCookie = function (cName) {
          return _super.prototype.getItemCookie.call(this, this.generateCacheKey(cName, true));
      };
      /**
       * Get all access tokens in the cache
       * @param clientId
       * @param homeAccountIdentifier
       */
      AuthCache.prototype.getAllAccessTokens = function (clientId, homeAccountIdentifier) {
          var _this = this;
          var results = Object.keys(window[this.cacheLocation]).reduce(function (tokens, key) {
              var keyMatches = key.match(clientId) && key.match(homeAccountIdentifier) && key.match(Constants.scopes);
              if (keyMatches) {
                  var value = _this.getItem(key);
                  if (value) {
                      try {
                          var parseAtKey = JSON.parse(key);
                          var newAccessTokenCacheItem = new AccessTokenCacheItem(parseAtKey, JSON.parse(value));
                          return tokens.concat([newAccessTokenCacheItem]);
                      }
                      catch (e) {
                          throw ClientAuthError.createCacheParseError(key);
                      }
                  }
              }
              return tokens;
          }, []);
          return results;
      };
      /**
       * Return if the token renewal is still in progress
       * @param stateValue
       */
      AuthCache.prototype.tokenRenewalInProgress = function (stateValue) {
          var renewStatus = this.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, stateValue));
          return !!(renewStatus && renewStatus === Constants.inProgress);
      };
      /**
       * Clear all cookies
       */
      AuthCache.prototype.clearMsalCookie = function (state) {
          var _this = this;
          /*
           * If state is truthy, remove values associated with that request.
           * Otherwise, remove all MSAL cookies.
           */
          if (state) {
              this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.NONCE_IDTOKEN, state));
              this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_LOGIN, state));
              this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.LOGIN_REQUEST, state));
              this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_ACQ_TOKEN, state));
          }
          else {
              var cookies = document.cookie.split(";");
              cookies.forEach(function (cookieString) {
                  var cookieName = cookieString.trim().split("=")[0];
                  if (cookieName.indexOf(Constants.cachePrefix) > -1) {
                      _super.prototype.clearItemCookie.call(_this, cookieName);
                  }
              });
          }
      };
      /**
       * Create acquireTokenAccountKey to cache account object
       * @param accountId
       * @param state
       */
      AuthCache.generateAcquireTokenAccountKey = function (accountId, state) {
          var stateId = RequestUtils.parseLibraryState(state).id;
          return "" + TemporaryCacheKeys.ACQUIRE_TOKEN_ACCOUNT + Constants.resourceDelimiter + accountId + Constants.resourceDelimiter + stateId;
      };
      /**
       * Create authorityKey to cache authority
       * @param state
       */
      AuthCache.generateAuthorityKey = function (state) {
          return AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.AUTHORITY, state);
      };
      /**
       * Generates the cache key for temporary cache items, using request state
       * @param tempCacheKey Cache key prefix
       * @param state Request state value
       */
      AuthCache.generateTemporaryCacheKey = function (tempCacheKey, state) {
          // Use the state id (a guid), in the interest of shorter key names, which is important for cookies.
          var stateId = RequestUtils.parseLibraryState(state).id;
          return "" + tempCacheKey + Constants.resourceDelimiter + stateId;
      };
      return AuthCache;
  }(BrowserStorage));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * accountIdentifier       combination of idToken.uid and idToken.utid
   * homeAccountIdentifier   combination of clientInfo.uid and clientInfo.utid
   * userName                idToken.preferred_username
   * name                    idToken.name
   * idToken                 idToken
   * sid                     idToken.sid - session identifier
   * environment             idtoken.issuer (the authority that issues the token)
   */
  var Account = /** @class */ (function () {
      /**
       * Creates an Account Object
       * @praram accountIdentifier
       * @param homeAccountIdentifier
       * @param userName
       * @param name
       * @param idToken
       * @param sid
       * @param environment
       */
      function Account(accountIdentifier, homeAccountIdentifier, userName, name, idTokenClaims, sid, environment) {
          this.accountIdentifier = accountIdentifier;
          this.homeAccountIdentifier = homeAccountIdentifier;
          this.userName = userName;
          this.name = name;
          // will be deprecated soon
          this.idToken = idTokenClaims;
          this.idTokenClaims = idTokenClaims;
          this.sid = sid;
          this.environment = environment;
      }
      /**
       * @hidden
       * @param idToken
       * @param clientInfo
       */
      Account.createAccount = function (idToken, clientInfo) {
          // create accountIdentifier
          var accountIdentifier = idToken.objectId || idToken.subject;
          // create homeAccountIdentifier
          var uid = clientInfo ? clientInfo.uid : "";
          var utid = clientInfo ? clientInfo.utid : "";
          var homeAccountIdentifier;
          if (!StringUtils.isEmpty(uid)) {
              homeAccountIdentifier = StringUtils.isEmpty(utid) ? CryptoUtils.base64Encode(uid) : CryptoUtils.base64Encode(uid) + "." + CryptoUtils.base64Encode(utid);
          }
          return new Account(accountIdentifier, homeAccountIdentifier, idToken.preferredName, idToken.name, idToken.claims, idToken.sid, idToken.issuer);
      };
      /**
       * Utils function to compare two Account objects - used to check if the same user account is logged in
       *
       * @param a1: Account object
       * @param a2: Account object
       */
      Account.compareAccounts = function (a1, a2) {
          if (!a1 || !a2) {
              return false;
          }
          if (a1.homeAccountIdentifier && a2.homeAccountIdentifier) {
              if (a1.homeAccountIdentifier === a2.homeAccountIdentifier) {
                  return true;
              }
          }
          return false;
      };
      return Account;
  }());

  var WindowUtils = /** @class */ (function () {
      function WindowUtils() {
      }
      /**
       * @hidden
       * Checks if the current page is running in an iframe.
       * @ignore
       */
      WindowUtils.isInIframe = function () {
          return window.parent !== window;
      };
      /**
       * @hidden
       * Check if the current page is running in a popup.
       * @ignore
       */
      WindowUtils.isInPopup = function () {
          return !!(window.opener && window.opener !== window);
      };
      /**
       * @hidden
       * @param prefix
       * @param scopes
       * @param authority
       */
      WindowUtils.generateFrameName = function (prefix, requestSignature) {
          return "" + prefix + Constants.resourceDelimiter + requestSignature;
      };
      /**
       * @hidden
       * Polls an iframe until it loads a url with a hash
       * @ignore
       */
      WindowUtils.monitorIframeForHash = function (contentWindow, timeout, urlNavigate, logger) {
          return new Promise(function (resolve, reject) {
              /*
               * Polling for iframes can be purely timing based,
               * since we don't need to account for interaction.
               */
              var nowMark = TimeUtils.relativeNowMs();
              var timeoutMark = nowMark + timeout;
              logger.verbose("monitorWindowForIframe polling started");
              var intervalId = setInterval(function () {
                  if (TimeUtils.relativeNowMs() > timeoutMark) {
                      logger.error("monitorIframeForHash unable to find hash in url, timing out");
                      logger.errorPii("monitorIframeForHash polling timed out for url: " + urlNavigate);
                      clearInterval(intervalId);
                      reject(ClientAuthError.createTokenRenewalTimeoutError());
                      return;
                  }
                  var href;
                  try {
                      /*
                       * Will throw if cross origin,
                       * which should be caught and ignored
                       * since we need the interval to keep running while on STS UI.
                       */
                      href = contentWindow.location.href;
                  }
                  catch (e) { }
                  if (href && UrlUtils.urlContainsHash(href)) {
                      logger.verbose("monitorIframeForHash found url in hash");
                      clearInterval(intervalId);
                      resolve(contentWindow.location.hash);
                  }
              }, WindowUtils.POLLING_INTERVAL_MS);
          });
      };
      /**
       * @hidden
       * Polls a popup until it loads a url with a hash
       * @ignore
       */
      WindowUtils.monitorPopupForHash = function (contentWindow, timeout, urlNavigate, logger) {
          return new Promise(function (resolve, reject) {
              /*
               * Polling for popups needs to be tick-based,
               * since a non-trivial amount of time can be spent on interaction (which should not count against the timeout).
               */
              var maxTicks = timeout / WindowUtils.POLLING_INTERVAL_MS;
              var ticks = 0;
              logger.verbose("monitorWindowForHash polling started");
              var intervalId = setInterval(function () {
                  if (contentWindow.closed) {
                      logger.error("monitorWindowForHash window closed");
                      clearInterval(intervalId);
                      reject(ClientAuthError.createUserCancelledError());
                      return;
                  }
                  var href;
                  try {
                      /*
                       * Will throw if cross origin,
                       * which should be caught and ignored
                       * since we need the interval to keep running while on STS UI.
                       */
                      href = contentWindow.location.href;
                  }
                  catch (e) { }
                  // Don't process blank pages or cross domain
                  if (!href || href === "about:blank") {
                      return;
                  }
                  /*
                   * Only run clock when we are on same domain for popups
                   * as popup operations can take a long time.
                   */
                  ticks++;
                  if (href && UrlUtils.urlContainsHash(href)) {
                      logger.verbose("monitorPopupForHash found url in hash");
                      clearInterval(intervalId);
                      resolve(contentWindow.location.hash);
                  }
                  else if (ticks > maxTicks) {
                      logger.error("monitorPopupForHash unable to find hash in url, timing out");
                      logger.errorPii("monitorPopupForHash polling timed out for url: " + urlNavigate);
                      clearInterval(intervalId);
                      reject(ClientAuthError.createTokenRenewalTimeoutError());
                  }
              }, WindowUtils.POLLING_INTERVAL_MS);
          });
      };
      /**
       * @hidden
       * Loads iframe with authorization endpoint URL
       * @ignore
       */
      WindowUtils.loadFrame = function (urlNavigate, frameName, timeoutMs, logger) {
          var _this = this;
          /*
           * This trick overcomes iframe navigation in IE
           * IE does not load the page consistently in iframe
           */
          logger.infoPii("LoadFrame: " + frameName);
          return new Promise(function (resolve, reject) {
              setTimeout(function () {
                  var frameHandle = _this.loadFrameSync(urlNavigate, frameName, logger);
                  if (!frameHandle) {
                      reject("Unable to load iframe with name: " + frameName);
                      return;
                  }
                  resolve(frameHandle);
              }, timeoutMs);
          });
      };
      /**
       * @hidden
       * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
       * @param urlNavigate
       * @param frameName
       * @param logger
       */
      WindowUtils.loadFrameSync = function (urlNavigate, frameName, logger) {
          var frameHandle = WindowUtils.addHiddenIFrame(frameName, logger);
          // returning to handle null in loadFrame, also to avoid null object access errors
          if (!frameHandle) {
              return null;
          }
          else if (frameHandle.src === "" || frameHandle.src === "about:blank") {
              frameHandle.src = urlNavigate;
              logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
          }
          return frameHandle;
      };
      /**
       * @hidden
       * Adds the hidden iframe for silent token renewal.
       * @ignore
       */
      WindowUtils.addHiddenIFrame = function (iframeId, logger) {
          if (typeof iframeId === "undefined") {
              return null;
          }
          logger.infoPii("Add msal frame to document:" + iframeId);
          var adalFrame = document.getElementById(iframeId);
          if (!adalFrame) {
              if (document.createElement &&
                  document.documentElement &&
                  (window.navigator.userAgent.indexOf("MSIE 5.0") === -1)) {
                  var ifr = document.createElement("iframe");
                  ifr.setAttribute("id", iframeId);
                  ifr.setAttribute("aria-hidden", "true");
                  ifr.style.visibility = "hidden";
                  ifr.style.position = "absolute";
                  ifr.style.width = ifr.style.height = "0";
                  ifr.style.border = "0";
                  ifr.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
                  adalFrame = document.getElementsByTagName("body")[0].appendChild(ifr);
              }
              else if (document.body && document.body.insertAdjacentHTML) {
                  document.body.insertAdjacentHTML("beforeend", "<iframe name='" + iframeId + "' id='" + iframeId + "' style='display:none'></iframe>");
              }
              if (window.frames && window.frames[iframeId]) {
                  adalFrame = window.frames[iframeId];
              }
          }
          return adalFrame;
      };
      /**
       * @hidden
       * Removes a hidden iframe from the page.
       * @ignore
       */
      WindowUtils.removeHiddenIframe = function (iframe) {
          if (document.body === iframe.parentNode) {
              document.body.removeChild(iframe);
          }
      };
      /**
       * @hidden
       * Find and return the iframe element with the given hash
       * @ignore
       */
      WindowUtils.getIframeWithHash = function (hash) {
          var iframes = document.getElementsByTagName("iframe");
          var iframeArray = Array.apply(null, Array(iframes.length)).map(function (iframe, index) { return iframes.item(index); }); // eslint-disable-line prefer-spread
          return iframeArray.filter(function (iframe) {
              try {
                  return iframe.contentWindow.location.hash === hash;
              }
              catch (e) {
                  return false;
              }
          })[0];
      };
      /**
       * @hidden
       * Returns an array of all the popups opened by MSAL
       * @ignore
       */
      WindowUtils.getPopups = function () {
          if (!window.openedWindows) {
              window.openedWindows = [];
          }
          return window.openedWindows;
      };
      /**
       * @hidden
       * Find and return the popup with the given hash
       * @ignore
       */
      WindowUtils.getPopUpWithHash = function (hash) {
          return WindowUtils.getPopups().filter(function (popup) {
              try {
                  return popup.location.hash === hash;
              }
              catch (e) {
                  return false;
              }
          })[0];
      };
      /**
       * @hidden
       * Add the popup to the known list of popups
       * @ignore
       */
      WindowUtils.trackPopup = function (popup) {
          WindowUtils.getPopups().push(popup);
      };
      /**
       * @hidden
       * Close all popups
       * @ignore
       */
      WindowUtils.closePopups = function () {
          WindowUtils.getPopups().forEach(function (popup) { return popup.close(); });
      };
      /**
       * @ignore
       *
       * blocks any login/acquireToken calls to reload from within a hidden iframe (generated for silent calls)
       */
      WindowUtils.blockReloadInHiddenIframes = function () {
          // return an error if called from the hidden iframe created by the msal js silent calls
          if (UrlUtils.urlContainsHash(window.location.hash) && WindowUtils.isInIframe()) {
              throw ClientAuthError.createBlockTokenRequestsInHiddenIframeError();
          }
      };
      /**
       *
       * @param cacheStorage
       */
      WindowUtils.checkIfBackButtonIsPressed = function (cacheStorage) {
          var redirectCache = cacheStorage.getItem(TemporaryCacheKeys.REDIRECT_REQUEST);
          // if redirect request is set and there is no hash
          if (redirectCache && !UrlUtils.urlContainsHash(window.location.hash)) {
              var splitCache = redirectCache.split(Constants.resourceDelimiter);
              splitCache.shift();
              var state = splitCache.length > 0 ? splitCache.join(Constants.resourceDelimiter) : null;
              cacheStorage.resetTempCacheItems(state);
          }
      };
      /**
       * @hidden
       * Interval in milliseconds that we poll a window
       * @ignore
       */
      WindowUtils.POLLING_INTERVAL_MS = 50;
      return WindowUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * @hidden
   */
  var ResponseUtils = /** @class */ (function () {
      function ResponseUtils() {
      }
      ResponseUtils.setResponseIdToken = function (originalResponse, idTokenObj) {
          if (!originalResponse) {
              return null;
          }
          else if (!idTokenObj) {
              return originalResponse;
          }
          var exp = Number(idTokenObj.expiration);
          if (exp && !originalResponse.expiresOn) {
              originalResponse.expiresOn = new Date(exp * 1000);
          }
          return __assign({}, originalResponse, { idToken: idTokenObj, idTokenClaims: idTokenObj.claims, uniqueId: idTokenObj.objectId || idTokenObj.subject, tenantId: idTokenObj.tenantId });
      };
      return ResponseUtils;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var AuthorityFactory = /** @class */ (function () {
      function AuthorityFactory() {
      }
      AuthorityFactory.saveMetadataFromNetwork = function (authorityInstance, telemetryManager, correlationId) {
          return __awaiter(this, void 0, void 0, function () {
              var metadata;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, authorityInstance.resolveEndpointsAsync(telemetryManager, correlationId)];
                      case 1:
                          metadata = _a.sent();
                          this.metadataMap.set(authorityInstance.CanonicalAuthority, metadata);
                          return [2 /*return*/, metadata];
                  }
              });
          });
      };
      AuthorityFactory.getMetadata = function (authorityUrl) {
          return this.metadataMap.get(authorityUrl);
      };
      AuthorityFactory.saveMetadataFromConfig = function (authorityUrl, authorityMetadataJson) {
          try {
              if (authorityMetadataJson) {
                  var parsedMetadata = JSON.parse(authorityMetadataJson);
                  if (!parsedMetadata.authorization_endpoint || !parsedMetadata.end_session_endpoint || !parsedMetadata.issuer) {
                      throw ClientConfigurationError.createInvalidAuthorityMetadataError();
                  }
                  this.metadataMap.set(authorityUrl, {
                      AuthorizationEndpoint: parsedMetadata.authorization_endpoint,
                      EndSessionEndpoint: parsedMetadata.end_session_endpoint,
                      Issuer: parsedMetadata.issuer
                  });
              }
          }
          catch (e) {
              throw ClientConfigurationError.createInvalidAuthorityMetadataError();
          }
      };
      /**
       * Create an authority object of the correct type based on the url
       * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
       */
      AuthorityFactory.CreateInstance = function (authorityUrl, validateAuthority, authorityMetadata) {
          if (StringUtils.isEmpty(authorityUrl)) {
              return null;
          }
          if (authorityMetadata) {
              // todo: log statements
              this.saveMetadataFromConfig(authorityUrl, authorityMetadata);
          }
          return new Authority(authorityUrl, validateAuthority, this.metadataMap.get(authorityUrl));
      };
      AuthorityFactory.metadataMap = new Map();
      return AuthorityFactory;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var LogLevel;
  (function (LogLevel) {
      LogLevel[LogLevel["Error"] = 0] = "Error";
      LogLevel[LogLevel["Warning"] = 1] = "Warning";
      LogLevel[LogLevel["Info"] = 2] = "Info";
      LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
  })(LogLevel || (LogLevel = {}));
  var Logger = /** @class */ (function () {
      function Logger(localCallback, options) {
          if (options === void 0) { options = {}; }
          /**
           * @hidden
           */
          this.level = LogLevel.Info;
          var _a = options.correlationId, correlationId = _a === void 0 ? "" : _a, _b = options.level, level = _b === void 0 ? LogLevel.Info : _b, _c = options.piiLoggingEnabled, piiLoggingEnabled = _c === void 0 ? false : _c;
          this.localCallback = localCallback;
          this.correlationId = correlationId;
          this.level = level;
          this.piiLoggingEnabled = piiLoggingEnabled;
      }
      /**
       * @hidden
       */
      Logger.prototype.logMessage = function (logLevel, logMessage, containsPii) {
          if ((logLevel > this.level) || (!this.piiLoggingEnabled && containsPii)) {
              return;
          }
          var timestamp = new Date().toUTCString();
          var log;
          if (!StringUtils.isEmpty(this.correlationId)) {
              log = timestamp + ":" + this.correlationId + "-" + libraryVersion() + "-" + LogLevel[logLevel] + (containsPii ? "-pii" : "") + " " + logMessage;
          }
          else {
              log = timestamp + ":" + libraryVersion() + "-" + LogLevel[logLevel] + (containsPii ? "-pii" : "") + " " + logMessage;
          }
          this.executeCallback(logLevel, log, containsPii);
      };
      /**
       * @hidden
       */
      Logger.prototype.executeCallback = function (level, message, containsPii) {
          if (this.localCallback) {
              this.localCallback(level, message, containsPii);
          }
      };
      /**
       * @hidden
       */
      Logger.prototype.error = function (message) {
          this.logMessage(LogLevel.Error, message, false);
      };
      /**
       * @hidden
       */
      Logger.prototype.errorPii = function (message) {
          this.logMessage(LogLevel.Error, message, true);
      };
      /**
       * @hidden
       */
      Logger.prototype.warning = function (message) {
          this.logMessage(LogLevel.Warning, message, false);
      };
      /**
       * @hidden
       */
      Logger.prototype.warningPii = function (message) {
          this.logMessage(LogLevel.Warning, message, true);
      };
      /**
       * @hidden
       */
      Logger.prototype.info = function (message) {
          this.logMessage(LogLevel.Info, message, false);
      };
      /**
       * @hidden
       */
      Logger.prototype.infoPii = function (message) {
          this.logMessage(LogLevel.Info, message, true);
      };
      /**
       * @hidden
       */
      Logger.prototype.verbose = function (message) {
          this.logMessage(LogLevel.Verbose, message, false);
      };
      /**
       * @hidden
       */
      Logger.prototype.verbosePii = function (message) {
          this.logMessage(LogLevel.Verbose, message, true);
      };
      Logger.prototype.isPiiLoggingEnabled = function () {
          return this.piiLoggingEnabled;
      };
      return Logger;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  /**
   * Defaults for the Configuration Options
   */
  var FRAME_TIMEOUT = 6000;
  var OFFSET = 300;
  var NAVIGATE_FRAME_WAIT = 500;
  var DEFAULT_AUTH_OPTIONS = {
      clientId: "",
      authority: null,
      validateAuthority: true,
      authorityMetadata: "",
      knownAuthorities: [],
      redirectUri: function () { return UrlUtils.getCurrentUrl(); },
      postLogoutRedirectUri: function () { return UrlUtils.getCurrentUrl(); },
      navigateToLoginRequestUrl: true
  };
  var DEFAULT_CACHE_OPTIONS = {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
  };
  var DEFAULT_SYSTEM_OPTIONS = {
      logger: new Logger(null),
      loadFrameTimeout: FRAME_TIMEOUT,
      tokenRenewalOffsetSeconds: OFFSET,
      navigateFrameWait: NAVIGATE_FRAME_WAIT
  };
  var DEFAULT_FRAMEWORK_OPTIONS = {
      isAngular: false,
      unprotectedResources: new Array(),
      protectedResourceMap: new Map()
  };
  /**
   * MSAL function that sets the default options when not explicitly configured from app developer
   *
   * @param TAuthOptions
   * @param TCacheOptions
   * @param TSystemOptions
   * @param TFrameworkOptions
   * @param TAuthorityDataOptions
   *
   * @returns TConfiguration object
   */
  function buildConfiguration(_a) {
      var auth = _a.auth, _b = _a.cache, cache = _b === void 0 ? {} : _b, _c = _a.system, system = _c === void 0 ? {} : _c, _d = _a.framework, framework = _d === void 0 ? {} : _d;
      var overlayedConfig = {
          auth: __assign({}, DEFAULT_AUTH_OPTIONS, auth),
          cache: __assign({}, DEFAULT_CACHE_OPTIONS, cache),
          system: __assign({}, DEFAULT_SYSTEM_OPTIONS, system),
          framework: __assign({}, DEFAULT_FRAMEWORK_OPTIONS, framework)
      };
      return overlayedConfig;
  }

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var ServerErrorMessage = {
      serverUnavailable: {
          code: "server_unavailable",
          desc: "Server is temporarily unavailable."
      },
      unknownServerError: {
          code: "unknown_server_error"
      },
  };
  /**
   * Error thrown when there is an error with the server code, for example, unavailability.
   */
  var ServerError = /** @class */ (function (_super) {
      __extends(ServerError, _super);
      function ServerError(errorCode, errorMessage) {
          var _this = _super.call(this, errorCode, errorMessage) || this;
          _this.name = "ServerError";
          Object.setPrototypeOf(_this, ServerError.prototype);
          return _this;
      }
      ServerError.createServerUnavailableError = function () {
          return new ServerError(ServerErrorMessage.serverUnavailable.code, ServerErrorMessage.serverUnavailable.desc);
      };
      ServerError.createUnknownServerError = function (errorDesc) {
          return new ServerError(ServerErrorMessage.unknownServerError.code, errorDesc);
      };
      return ServerError;
  }(AuthError));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  var InteractionRequiredAuthErrorMessage = {
      interactionRequired: {
          code: "interaction_required"
      },
      consentRequired: {
          code: "consent_required"
      },
      loginRequired: {
          code: "login_required"
      },
  };
  /**
   * Error thrown when the user is required to perform an interactive token request.
   */
  var InteractionRequiredAuthError = /** @class */ (function (_super) {
      __extends(InteractionRequiredAuthError, _super);
      function InteractionRequiredAuthError(errorCode, errorMessage) {
          var _this = _super.call(this, errorCode, errorMessage) || this;
          _this.name = "InteractionRequiredAuthError";
          Object.setPrototypeOf(_this, InteractionRequiredAuthError.prototype);
          return _this;
      }
      InteractionRequiredAuthError.isInteractionRequiredError = function (errorString) {
          var interactionRequiredCodes = [
              InteractionRequiredAuthErrorMessage.interactionRequired.code,
              InteractionRequiredAuthErrorMessage.consentRequired.code,
              InteractionRequiredAuthErrorMessage.loginRequired.code
          ];
          return errorString && interactionRequiredCodes.indexOf(errorString) > -1;
      };
      InteractionRequiredAuthError.createLoginRequiredAuthError = function (errorDesc) {
          return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.loginRequired.code, errorDesc);
      };
      InteractionRequiredAuthError.createInteractionRequiredAuthError = function (errorDesc) {
          return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.interactionRequired.code, errorDesc);
      };
      InteractionRequiredAuthError.createConsentRequiredAuthError = function (errorDesc) {
          return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.consentRequired.code, errorDesc);
      };
      return InteractionRequiredAuthError;
  }(ServerError));

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  function buildResponseStateOnly(state) {
      return {
          uniqueId: "",
          tenantId: "",
          tokenType: "",
          idToken: null,
          idTokenClaims: null,
          accessToken: "",
          scopes: null,
          expiresOn: null,
          account: null,
          accountState: state,
          fromCache: false
      };
  }

  var EVENT_NAME_PREFIX = "msal.";
  var EVENT_NAME_KEY = "event_name";
  var START_TIME_KEY = "start_time";
  var ELAPSED_TIME_KEY = "elapsed_time";
  var TELEMETRY_BLOB_EVENT_NAMES = {
      MsalCorrelationIdConstStrKey: "Microsoft.MSAL.correlation_id",
      ApiTelemIdConstStrKey: "msal.api_telem_id",
      ApiIdConstStrKey: "msal.api_id",
      BrokerAppConstStrKey: "Microsoft_MSAL_broker_app",
      CacheEventCountConstStrKey: "Microsoft_MSAL_cache_event_count",
      HttpEventCountTelemetryBatchKey: "Microsoft_MSAL_http_event_count",
      IdpConstStrKey: "Microsoft_MSAL_idp",
      IsSilentTelemetryBatchKey: "",
      IsSuccessfulConstStrKey: "Microsoft_MSAL_is_successful",
      ResponseTimeConstStrKey: "Microsoft_MSAL_response_time",
      TenantIdConstStrKey: "Microsoft_MSAL_tenant_id",
      UiEventCountTelemetryBatchKey: "Microsoft_MSAL_ui_event_count"
  };
  // This is used to replace the real tenant in telemetry info
  var TENANT_PLACEHOLDER = "<tenant>";

  var scrubTenantFromUri = function (uri) {
      var url = UrlUtils.GetUrlComponents(uri);
      // validate trusted host
      if (Authority.isAdfs(uri)) {
          /**
           * returning what was passed because the library needs to work with uris that are non
           * AAD trusted but passed by users such as B2C or others.
           * HTTP Events for instance can take a url to the open id config endpoint
           */
          return uri;
      }
      var pathParams = url.PathSegments;
      if (pathParams && pathParams.length >= 2) {
          var tenantPosition = pathParams[1] === "tfp" ? 2 : 1;
          if (tenantPosition < pathParams.length) {
              pathParams[tenantPosition] = TENANT_PLACEHOLDER;
          }
      }
      return url.Protocol + "//" + url.HostNameAndPort + "/" + pathParams.join("/");
  };
  var hashPersonalIdentifier = function (valueToHash) {
      /*
       * TODO sha256 this
       * Current test runner is being funny with node libs that are webpacked anyway
       * need a different solution
       */
      return CryptoUtils.base64Encode(valueToHash);
  };
  var prependEventNamePrefix = function (suffix) { return "" + EVENT_NAME_PREFIX + (suffix || ""); };
  var supportsBrowserPerformance = function () { return !!(typeof window !== "undefined" &&
      "performance" in window &&
      window.performance.mark &&
      window.performance.measure); };
  var endBrowserPerformanceMeasurement = function (measureName, startMark, endMark) {
      if (supportsBrowserPerformance()) {
          window.performance.mark(endMark);
          window.performance.measure(measureName, startMark, endMark);
          window.performance.clearMeasures(measureName);
          window.performance.clearMarks(startMark);
          window.performance.clearMarks(endMark);
      }
  };
  var startBrowserPerformanceMeasurement = function (startMark) {
      if (supportsBrowserPerformance()) {
          window.performance.mark(startMark);
      }
  };

  var TelemetryEvent = /** @class */ (function () {
      function TelemetryEvent(eventName, correlationId, eventLabel) {
          var _a;
          this.eventId = CryptoUtils.createNewGuid();
          this.label = eventLabel;
          this.event = (_a = {},
              _a[prependEventNamePrefix(EVENT_NAME_KEY)] = eventName,
              _a[prependEventNamePrefix(ELAPSED_TIME_KEY)] = -1,
              _a["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = correlationId,
              _a);
      }
      TelemetryEvent.prototype.setElapsedTime = function (time) {
          this.event[prependEventNamePrefix(ELAPSED_TIME_KEY)] = time;
      };
      TelemetryEvent.prototype.stop = function () {
          // Set duration of event
          this.setElapsedTime(+Date.now() - +this.startTimestamp);
          endBrowserPerformanceMeasurement(this.displayName, this.perfStartMark, this.perfEndMark);
      };
      TelemetryEvent.prototype.start = function () {
          this.startTimestamp = Date.now();
          this.event[prependEventNamePrefix(START_TIME_KEY)] = this.startTimestamp;
          startBrowserPerformanceMeasurement(this.perfStartMark);
      };
      Object.defineProperty(TelemetryEvent.prototype, "telemetryCorrelationId", {
          get: function () {
              return this.event["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey];
          },
          set: function (value) {
              this.event["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = value;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TelemetryEvent.prototype, "eventName", {
          get: function () {
              return this.event[prependEventNamePrefix(EVENT_NAME_KEY)];
          },
          enumerable: true,
          configurable: true
      });
      TelemetryEvent.prototype.get = function () {
          return __assign({}, this.event, { eventId: this.eventId });
      };
      Object.defineProperty(TelemetryEvent.prototype, "key", {
          get: function () {
              return this.telemetryCorrelationId + "_" + this.eventId + "-" + this.eventName;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TelemetryEvent.prototype, "displayName", {
          get: function () {
              return "Msal-" + this.label + "-" + this.telemetryCorrelationId;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TelemetryEvent.prototype, "perfStartMark", {
          get: function () {
              return "start-" + this.key;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TelemetryEvent.prototype, "perfEndMark", {
          get: function () {
              return "end-" + this.key;
          },
          enumerable: true,
          configurable: true
      });
      return TelemetryEvent;
  }());

  var DefaultEvent = /** @class */ (function (_super) {
      __extends(DefaultEvent, _super);
      // TODO Platform Type
      function DefaultEvent(platform, correlationId, clientId, eventCount) {
          var _this = _super.call(this, prependEventNamePrefix("default_event"), correlationId, "DefaultEvent") || this;
          _this.event[prependEventNamePrefix("client_id")] = clientId;
          _this.event[prependEventNamePrefix("sdk_plaform")] = platform.sdk;
          _this.event[prependEventNamePrefix("sdk_version")] = platform.sdkVersion;
          _this.event[prependEventNamePrefix("application_name")] = platform.applicationName;
          _this.event[prependEventNamePrefix("application_version")] = platform.applicationVersion;
          _this.event[prependEventNamePrefix("effective_connection_speed")] = platform.networkInformation && platform.networkInformation.connectionSpeed;
          _this.event["" + TELEMETRY_BLOB_EVENT_NAMES.UiEventCountTelemetryBatchKey] = _this.getEventCount(prependEventNamePrefix("ui_event"), eventCount);
          _this.event["" + TELEMETRY_BLOB_EVENT_NAMES.HttpEventCountTelemetryBatchKey] = _this.getEventCount(prependEventNamePrefix("http_event"), eventCount);
          _this.event["" + TELEMETRY_BLOB_EVENT_NAMES.CacheEventCountConstStrKey] = _this.getEventCount(prependEventNamePrefix("cache_event"), eventCount);
          return _this;
          // / Device id?
      }
      DefaultEvent.prototype.getEventCount = function (eventName, eventCount) {
          if (!eventCount[eventName]) {
              return 0;
          }
          return eventCount[eventName];
      };
      return DefaultEvent;
  }(TelemetryEvent));

  var _a;
  var EVENT_KEYS = {
      AUTHORITY: prependEventNamePrefix("authority"),
      AUTHORITY_TYPE: prependEventNamePrefix("authority_type"),
      PROMPT: prependEventNamePrefix("ui_behavior"),
      TENANT_ID: prependEventNamePrefix("tenant_id"),
      USER_ID: prependEventNamePrefix("user_id"),
      WAS_SUCESSFUL: prependEventNamePrefix("was_successful"),
      API_ERROR_CODE: prependEventNamePrefix("api_error_code"),
      LOGIN_HINT: prependEventNamePrefix("login_hint")
  };
  var API_CODE;
  (function (API_CODE) {
      API_CODE[API_CODE["AcquireTokenRedirect"] = 2001] = "AcquireTokenRedirect";
      API_CODE[API_CODE["AcquireTokenSilent"] = 2002] = "AcquireTokenSilent";
      API_CODE[API_CODE["AcquireTokenPopup"] = 2003] = "AcquireTokenPopup";
      API_CODE[API_CODE["LoginRedirect"] = 2004] = "LoginRedirect";
      API_CODE[API_CODE["LoginPopup"] = 2005] = "LoginPopup";
      API_CODE[API_CODE["Logout"] = 2006] = "Logout";
  })(API_CODE || (API_CODE = {}));
  var API_EVENT_IDENTIFIER;
  (function (API_EVENT_IDENTIFIER) {
      API_EVENT_IDENTIFIER["AcquireTokenRedirect"] = "AcquireTokenRedirect";
      API_EVENT_IDENTIFIER["AcquireTokenSilent"] = "AcquireTokenSilent";
      API_EVENT_IDENTIFIER["AcquireTokenPopup"] = "AcquireTokenPopup";
      API_EVENT_IDENTIFIER["LoginRedirect"] = "LoginRedirect";
      API_EVENT_IDENTIFIER["LoginPopup"] = "LoginPopup";
      API_EVENT_IDENTIFIER["Logout"] = "Logout";
  })(API_EVENT_IDENTIFIER || (API_EVENT_IDENTIFIER = {}));
  var mapEventIdentiferToCode = (_a = {},
      _a[API_EVENT_IDENTIFIER.AcquireTokenSilent] = API_CODE.AcquireTokenSilent,
      _a[API_EVENT_IDENTIFIER.AcquireTokenPopup] = API_CODE.AcquireTokenPopup,
      _a[API_EVENT_IDENTIFIER.AcquireTokenRedirect] = API_CODE.AcquireTokenRedirect,
      _a[API_EVENT_IDENTIFIER.LoginPopup] = API_CODE.LoginPopup,
      _a[API_EVENT_IDENTIFIER.LoginRedirect] = API_CODE.LoginRedirect,
      _a[API_EVENT_IDENTIFIER.Logout] = API_CODE.Logout,
      _a);
  var ApiEvent = /** @class */ (function (_super) {
      __extends(ApiEvent, _super);
      function ApiEvent(correlationId, piiEnabled, apiEventIdentifier) {
          var _this = _super.call(this, prependEventNamePrefix("api_event"), correlationId, apiEventIdentifier) || this;
          if (apiEventIdentifier) {
              _this.apiCode = mapEventIdentiferToCode[apiEventIdentifier];
              _this.apiEventIdentifier = apiEventIdentifier;
          }
          _this.piiEnabled = piiEnabled;
          return _this;
      }
      Object.defineProperty(ApiEvent.prototype, "apiEventIdentifier", {
          set: function (apiEventIdentifier) {
              this.event[TELEMETRY_BLOB_EVENT_NAMES.ApiTelemIdConstStrKey] = apiEventIdentifier;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "apiCode", {
          set: function (apiCode) {
              this.event[TELEMETRY_BLOB_EVENT_NAMES.ApiIdConstStrKey] = apiCode;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "authority", {
          set: function (uri) {
              this.event[EVENT_KEYS.AUTHORITY] = scrubTenantFromUri(uri).toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "apiErrorCode", {
          set: function (errorCode) {
              this.event[EVENT_KEYS.API_ERROR_CODE] = errorCode;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "tenantId", {
          set: function (tenantId) {
              this.event[EVENT_KEYS.TENANT_ID] = this.piiEnabled && tenantId ?
                  hashPersonalIdentifier(tenantId)
                  : null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "accountId", {
          set: function (accountId) {
              this.event[EVENT_KEYS.USER_ID] = this.piiEnabled && accountId ?
                  hashPersonalIdentifier(accountId)
                  : null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "wasSuccessful", {
          get: function () {
              return this.event[EVENT_KEYS.WAS_SUCESSFUL] === true;
          },
          set: function (wasSuccessful) {
              this.event[EVENT_KEYS.WAS_SUCESSFUL] = wasSuccessful;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "loginHint", {
          set: function (loginHint) {
              this.event[EVENT_KEYS.LOGIN_HINT] = this.piiEnabled && loginHint ?
                  hashPersonalIdentifier(loginHint)
                  : null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "authorityType", {
          set: function (authorityType) {
              this.event[EVENT_KEYS.AUTHORITY_TYPE] = authorityType.toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ApiEvent.prototype, "promptType", {
          set: function (promptType) {
              this.event[EVENT_KEYS.PROMPT] = promptType.toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      return ApiEvent;
  }(TelemetryEvent));

  var EVENT_KEYS$1 = {
      HTTP_PATH: prependEventNamePrefix("http_path"),
      USER_AGENT: prependEventNamePrefix("user_agent"),
      QUERY_PARAMETERS: prependEventNamePrefix("query_parameters"),
      API_VERSION: prependEventNamePrefix("api_version"),
      RESPONSE_CODE: prependEventNamePrefix("response_code"),
      O_AUTH_ERROR_CODE: prependEventNamePrefix("oauth_error_code"),
      HTTP_METHOD: prependEventNamePrefix("http_method"),
      REQUEST_ID_HEADER: prependEventNamePrefix("request_id_header"),
      SPE_INFO: prependEventNamePrefix("spe_info"),
      SERVER_ERROR_CODE: prependEventNamePrefix("server_error_code"),
      SERVER_SUB_ERROR_CODE: prependEventNamePrefix("server_sub_error_code"),
      URL: prependEventNamePrefix("url")
  };
  var HttpEvent = /** @class */ (function (_super) {
      __extends(HttpEvent, _super);
      function HttpEvent(correlationId, eventLabel) {
          return _super.call(this, prependEventNamePrefix("http_event"), correlationId, eventLabel) || this;
      }
      Object.defineProperty(HttpEvent.prototype, "url", {
          set: function (url) {
              var scrubbedUri = scrubTenantFromUri(url);
              this.event[EVENT_KEYS$1.URL] = scrubbedUri && scrubbedUri.toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "httpPath", {
          set: function (httpPath) {
              this.event[EVENT_KEYS$1.HTTP_PATH] = scrubTenantFromUri(httpPath).toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "userAgent", {
          set: function (userAgent) {
              this.event[EVENT_KEYS$1.USER_AGENT] = userAgent;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "queryParams", {
          set: function (queryParams) {
              this.event[EVENT_KEYS$1.QUERY_PARAMETERS] = ServerRequestParameters.generateQueryParametersString(queryParams);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "apiVersion", {
          set: function (apiVersion) {
              this.event[EVENT_KEYS$1.API_VERSION] = apiVersion.toLowerCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "httpResponseStatus", {
          set: function (statusCode) {
              this.event[EVENT_KEYS$1.RESPONSE_CODE] = statusCode;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "oAuthErrorCode", {
          set: function (errorCode) {
              this.event[EVENT_KEYS$1.O_AUTH_ERROR_CODE] = errorCode;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "httpMethod", {
          set: function (httpMethod) {
              this.event[EVENT_KEYS$1.HTTP_METHOD] = httpMethod;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "requestIdHeader", {
          set: function (requestIdHeader) {
              this.event[EVENT_KEYS$1.REQUEST_ID_HEADER] = requestIdHeader;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "speInfo", {
          /**
           * Indicates whether the request was executed on a ring serving SPE traffic.
           * An empty string indicates this occurred on an outer ring, and the string "I"
           * indicates the request occurred on the inner ring
           */
          set: function (speInfo) {
              this.event[EVENT_KEYS$1.SPE_INFO] = speInfo;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "serverErrorCode", {
          set: function (errorCode) {
              this.event[EVENT_KEYS$1.SERVER_ERROR_CODE] = errorCode;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(HttpEvent.prototype, "serverSubErrorCode", {
          set: function (subErrorCode) {
              this.event[EVENT_KEYS$1.SERVER_SUB_ERROR_CODE] = subErrorCode;
          },
          enumerable: true,
          configurable: true
      });
      return HttpEvent;
  }(TelemetryEvent));

  var TelemetryManager = /** @class */ (function () {
      function TelemetryManager(config, telemetryEmitter, logger) {
          // correlation Id to list of events
          this.completedEvents = {};
          // event key to event
          this.inProgressEvents = {};
          // correlation id to map of eventname to count
          this.eventCountByCorrelationId = {};
          // Implement after API EVENT
          this.onlySendFailureTelemetry = false;
          // TODO THROW if bad options
          this.telemetryPlatform = __assign({ sdk: Constants.libraryName, sdkVersion: libraryVersion(), networkInformation: {
                  // @ts-ignore
                  connectionSpeed: typeof navigator !== "undefined" && navigator.connection && navigator.connection.effectiveType
              } }, config.platform);
          this.clientId = config.clientId;
          this.onlySendFailureTelemetry = config.onlySendFailureTelemetry;
          /*
           * TODO, when i get to wiring this through, think about what it means if
           * a developer does not implement telem at all, we still instrument, but telemetryEmitter can be
           * optional?
           */
          this.telemetryEmitter = telemetryEmitter;
          this.logger = logger;
      }
      TelemetryManager.getTelemetrymanagerStub = function (clientId, logger) {
          var applicationName = "UnSetStub";
          var applicationVersion = "0.0";
          var telemetryEmitter = function () { };
          var telemetryPlatform = {
              applicationName: applicationName,
              applicationVersion: applicationVersion
          };
          var telemetryManagerConfig = {
              platform: telemetryPlatform,
              clientId: clientId
          };
          return new this(telemetryManagerConfig, telemetryEmitter, logger);
      };
      TelemetryManager.prototype.startEvent = function (event) {
          this.logger.verbose("Telemetry Event started: " + event.key);
          if (!this.telemetryEmitter) {
              return;
          }
          event.start();
          this.inProgressEvents[event.key] = event;
      };
      TelemetryManager.prototype.stopEvent = function (event) {
          this.logger.verbose("Telemetry Event stopped: " + event.key);
          if (!this.telemetryEmitter || !this.inProgressEvents[event.key]) {
              return;
          }
          event.stop();
          this.incrementEventCount(event);
          var completedEvents = this.completedEvents[event.telemetryCorrelationId];
          this.completedEvents[event.telemetryCorrelationId] = (completedEvents || []).concat([event]);
          delete this.inProgressEvents[event.key];
      };
      TelemetryManager.prototype.flush = function (correlationId) {
          var _this = this;
          this.logger.verbose("Flushing telemetry events: " + correlationId);
          // If there is only unfinished events should this still return them?
          if (!this.telemetryEmitter || !this.completedEvents[correlationId]) {
              return;
          }
          var orphanedEvents = this.getOrphanedEvents(correlationId);
          orphanedEvents.forEach(function (event) { return _this.incrementEventCount(event); });
          var eventsToFlush = this.completedEvents[correlationId].concat(orphanedEvents);
          delete this.completedEvents[correlationId];
          var eventCountsToFlush = this.eventCountByCorrelationId[correlationId];
          delete this.eventCountByCorrelationId[correlationId];
          // TODO add funcitonality for onlyFlushFailures after implementing api event? ??
          if (!eventsToFlush || !eventsToFlush.length) {
              return;
          }
          var defaultEvent = new DefaultEvent(this.telemetryPlatform, correlationId, this.clientId, eventCountsToFlush);
          var eventsWithDefaultEvent = eventsToFlush.concat([defaultEvent]);
          this.telemetryEmitter(eventsWithDefaultEvent.map(function (e) { return e.get(); }));
      };
      TelemetryManager.prototype.createAndStartApiEvent = function (correlationId, apiEventIdentifier) {
          var apiEvent = new ApiEvent(correlationId, this.logger.isPiiLoggingEnabled(), apiEventIdentifier);
          this.startEvent(apiEvent);
          return apiEvent;
      };
      TelemetryManager.prototype.stopAndFlushApiEvent = function (correlationId, apiEvent, wasSuccessful, errorCode) {
          apiEvent.wasSuccessful = wasSuccessful;
          if (errorCode) {
              apiEvent.apiErrorCode = errorCode;
          }
          this.stopEvent(apiEvent);
          this.flush(correlationId);
      };
      TelemetryManager.prototype.createAndStartHttpEvent = function (correlation, httpMethod, url, eventLabel) {
          var httpEvent = new HttpEvent(correlation, eventLabel);
          httpEvent.url = url;
          httpEvent.httpMethod = httpMethod;
          this.startEvent(httpEvent);
          return httpEvent;
      };
      TelemetryManager.prototype.incrementEventCount = function (event) {
          var _a;
          /*
           * TODO, name cache event different?
           * if type is cache event, change name
           */
          var eventName = event.eventName;
          var eventCount = this.eventCountByCorrelationId[event.telemetryCorrelationId];
          if (!eventCount) {
              this.eventCountByCorrelationId[event.telemetryCorrelationId] = (_a = {},
                  _a[eventName] = 1,
                  _a);
          }
          else {
              eventCount[eventName] = eventCount[eventName] ? eventCount[eventName] + 1 : 1;
          }
      };
      TelemetryManager.prototype.getOrphanedEvents = function (correlationId) {
          var _this = this;
          return Object.keys(this.inProgressEvents)
              .reduce(function (memo, eventKey) {
              if (eventKey.indexOf(correlationId) !== -1) {
                  var event_1 = _this.inProgressEvents[eventKey];
                  delete _this.inProgressEvents[eventKey];
                  return memo.concat([event_1]);
              }
              return memo;
          }, []);
      };
      return TelemetryManager;
  }());

  /*
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   */
  // default authority
  var DEFAULT_AUTHORITY$1 = "https://login.microsoftonline.com/common";
  /**
   * UserAgentApplication class
   *
   * Object Instance that the developer can use to make loginXX OR acquireTokenXX functions
   */
  var UserAgentApplication = /** @class */ (function () {
      /**
       * @constructor
       * Constructor for the UserAgentApplication used to instantiate the UserAgentApplication object
       *
       * Important attributes in the Configuration object for auth are:
       * - clientID: the application ID of your application.
       * You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
       * - authority: the authority URL for your application.
       *
       * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
       * It is of the form https://login.microsoftonline.com/&lt;Enter_the_Tenant_Info_Here&gt;.
       * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
       * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
       * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
       * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
       *
       *
       * In Azure B2C, authority is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/&lt;policyName&gt;/
       *
       * @param {@link (Configuration:type)} configuration object for the MSAL UserAgentApplication instance
       */
      function UserAgentApplication(configuration) {
          // callbacks for token/error
          this.authResponseCallback = null;
          this.tokenReceivedCallback = null;
          this.errorReceivedCallback = null;
          // Set the Configuration
          this.config = buildConfiguration(configuration);
          this.logger = this.config.system.logger;
          this.clientId = this.config.auth.clientId;
          this.inCookie = this.config.cache.storeAuthStateInCookie;
          this.telemetryManager = this.getTelemetryManagerFromConfig(this.config.system.telemetry, this.clientId);
          TrustedAuthority.setTrustedAuthoritiesFromConfig(this.config.auth.validateAuthority, this.config.auth.knownAuthorities);
          AuthorityFactory.saveMetadataFromConfig(this.config.auth.authority, this.config.auth.authorityMetadata);
          // if no authority is passed, set the default: "https://login.microsoftonline.com/common"
          this.authority = this.config.auth.authority || DEFAULT_AUTHORITY$1;
          // cache keys msal - typescript throws an error if any value other than "localStorage" or "sessionStorage" is passed
          this.cacheStorage = new AuthCache(this.clientId, this.config.cache.cacheLocation, this.inCookie);
          // Initialize window handling code
          window.activeRenewals = {};
          window.renewStates = [];
          window.callbackMappedToRenewStates = {};
          window.promiseMappedToRenewStates = {};
          window.msal = this;
          var urlHash = window.location.hash;
          var urlContainsHash = UrlUtils.urlContainsHash(urlHash);
          // check if back button is pressed
          WindowUtils.checkIfBackButtonIsPressed(this.cacheStorage);
          // On the server 302 - Redirect, handle this
          if (urlContainsHash) {
              var stateInfo = this.getResponseState(urlHash);
              if (stateInfo.method === Constants.interactionTypeRedirect) {
                  this.handleRedirectAuthenticationResponse(urlHash);
              }
          }
      }
      Object.defineProperty(UserAgentApplication.prototype, "authority", {
          /**
           * Method to manage the authority URL.
           *
           * @returns {string} authority
           */
          get: function () {
              return this.authorityInstance.CanonicalAuthority;
          },
          /**
           * setter for the authority URL
           * @param {string} authority
           */
          // If the developer passes an authority, create an instance
          set: function (val) {
              this.authorityInstance = AuthorityFactory.CreateInstance(val, this.config.auth.validateAuthority);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Get the current authority instance from the MSAL configuration object
       *
       * @returns {@link Authority} authority instance
       */
      UserAgentApplication.prototype.getAuthorityInstance = function () {
          return this.authorityInstance;
      };
      UserAgentApplication.prototype.handleRedirectCallback = function (authOrTokenCallback, errorReceivedCallback) {
          if (!authOrTokenCallback) {
              throw ClientConfigurationError.createInvalidCallbackObjectError(authOrTokenCallback);
          }
          // Set callbacks
          if (errorReceivedCallback) {
              this.tokenReceivedCallback = authOrTokenCallback;
              this.errorReceivedCallback = errorReceivedCallback;
              this.logger.warning("This overload for callback is deprecated - please change the format of the callbacks to a single callback as shown: (err: AuthError, response: AuthResponse).");
          }
          else {
              this.authResponseCallback = authOrTokenCallback;
          }
          if (this.redirectError) {
              this.authErrorHandler(Constants.interactionTypeRedirect, this.redirectError, this.redirectResponse);
          }
          else if (this.redirectResponse) {
              this.authResponseHandler(Constants.interactionTypeRedirect, this.redirectResponse);
          }
      };
      /**
       * Public API to verify if the URL contains the hash with known properties
       * @param hash
       */
      UserAgentApplication.prototype.urlContainsHash = function (hash) {
          this.logger.verbose("UrlContainsHash has been called");
          return UrlUtils.urlContainsHash(hash);
      };
      UserAgentApplication.prototype.authResponseHandler = function (interactionType, response, resolve) {
          this.logger.verbose("AuthResponseHandler has been called");
          if (interactionType === Constants.interactionTypeRedirect) {
              this.logger.verbose("Interaction type is redirect");
              if (this.errorReceivedCallback) {
                  this.logger.verbose("Two callbacks were provided to handleRedirectCallback, calling success callback with response");
                  this.tokenReceivedCallback(response);
              }
              else if (this.authResponseCallback) {
                  this.logger.verbose("One callback was provided to handleRedirectCallback, calling authResponseCallback with response");
                  this.authResponseCallback(null, response);
              }
          }
          else if (interactionType === Constants.interactionTypePopup) {
              this.logger.verbose("Interaction type is popup, resolving");
              resolve(response);
          }
          else {
              throw ClientAuthError.createInvalidInteractionTypeError();
          }
      };
      UserAgentApplication.prototype.authErrorHandler = function (interactionType, authErr, response, reject) {
          this.logger.verbose("AuthErrorHandler has been called");
          // set interaction_status to complete
          this.cacheStorage.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
          if (interactionType === Constants.interactionTypeRedirect) {
              this.logger.verbose("Interaction type is redirect");
              if (this.errorReceivedCallback) {
                  this.logger.verbose("Two callbacks were provided to handleRedirectCallback, calling error callback");
                  this.errorReceivedCallback(authErr, response.accountState);
              }
              else if (this.authResponseCallback) {
                  this.logger.verbose("One callback was provided to handleRedirectCallback, calling authResponseCallback with error");
                  this.authResponseCallback(authErr, response);
              }
              else {
                  this.logger.verbose("handleRedirectCallback has not been called and no callbacks are registered, throwing error");
                  throw authErr;
              }
          }
          else if (interactionType === Constants.interactionTypePopup) {
              this.logger.verbose("Interaction type is popup, rejecting");
              reject(authErr);
          }
          else {
              throw ClientAuthError.createInvalidInteractionTypeError();
          }
      };
      // #endregion
      /**
       * Use when initiating the login process by redirecting the user's browser to the authorization endpoint.
       * @param {@link (AuthenticationParameters:type)}
       */
      UserAgentApplication.prototype.loginRedirect = function (userRequest) {
          this.logger.verbose("LoginRedirect has been called");
          // validate request
          var request = RequestUtils.validateRequest(userRequest, true, this.clientId, Constants.interactionTypeRedirect);
          this.acquireTokenInteractive(Constants.interactionTypeRedirect, true, request, null, null);
      };
      /**
       * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint.
       * @param {@link (AuthenticationParameters:type)}
       *
       * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
       */
      UserAgentApplication.prototype.acquireTokenRedirect = function (userRequest) {
          this.logger.verbose("AcquireTokenRedirect has been called");
          // validate request
          var request = RequestUtils.validateRequest(userRequest, false, this.clientId, Constants.interactionTypeRedirect);
          this.acquireTokenInteractive(Constants.interactionTypeRedirect, false, request, null, null);
      };
      /**
       * Use when initiating the login process via opening a popup window in the user's browser
       *
       * @param {@link (AuthenticationParameters:type)}
       *
       * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
       */
      UserAgentApplication.prototype.loginPopup = function (userRequest) {
          var _this = this;
          this.logger.verbose("LoginPopup has been called");
          // validate request
          var request = RequestUtils.validateRequest(userRequest, true, this.clientId, Constants.interactionTypePopup);
          var apiEvent = this.telemetryManager.createAndStartApiEvent(request.correlationId, API_EVENT_IDENTIFIER.LoginPopup);
          return new Promise(function (resolve, reject) {
              _this.acquireTokenInteractive(Constants.interactionTypePopup, true, request, resolve, reject);
          })
              .then(function (resp) {
              _this.logger.verbose("Successfully logged in");
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, true);
              return resp;
          })
              .catch(function (error) {
              _this.cacheStorage.resetTempCacheItems(request.state);
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, false, error.errorCode);
              throw error;
          });
      };
      /**
       * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
       * @param {@link AuthenticationParameters}
       *
       * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
       * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
       */
      UserAgentApplication.prototype.acquireTokenPopup = function (userRequest) {
          var _this = this;
          this.logger.verbose("AcquireTokenPopup has been called");
          // validate request
          var request = RequestUtils.validateRequest(userRequest, false, this.clientId, Constants.interactionTypePopup);
          var apiEvent = this.telemetryManager.createAndStartApiEvent(request.correlationId, API_EVENT_IDENTIFIER.AcquireTokenPopup);
          return new Promise(function (resolve, reject) {
              _this.acquireTokenInteractive(Constants.interactionTypePopup, false, request, resolve, reject);
          })
              .then(function (resp) {
              _this.logger.verbose("Successfully acquired token");
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, true);
              return resp;
          })
              .catch(function (error) {
              _this.cacheStorage.resetTempCacheItems(request.state);
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, false, error.errorCode);
              throw error;
          });
      };
      // #region Acquire Token
      /**
       * Use when initiating the login process or when you want to obtain an access_token for your API,
       * either by redirecting the user's browser window to the authorization endpoint or via opening a popup window in the user's browser.
       * @param {@link (AuthenticationParameters:type)}
       *
       * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
       */
      UserAgentApplication.prototype.acquireTokenInteractive = function (interactionType, isLoginCall, request, resolve, reject) {
          var _this = this;
          this.logger.verbose("AcquireTokenInteractive has been called");
          // block the request if made from the hidden iframe
          WindowUtils.blockReloadInHiddenIframes();
          var interactionProgress = this.cacheStorage.getItem(TemporaryCacheKeys.INTERACTION_STATUS);
          if (interactionType === Constants.interactionTypeRedirect) {
              this.cacheStorage.setItem(TemporaryCacheKeys.REDIRECT_REQUEST, "" + Constants.inProgress + Constants.resourceDelimiter + request.state);
          }
          // If already in progress, do not proceed
          if (interactionProgress === Constants.inProgress) {
              var thrownError = isLoginCall ? ClientAuthError.createLoginInProgressError() : ClientAuthError.createAcquireTokenInProgressError();
              var stateOnlyResponse = buildResponseStateOnly(this.getAccountState(request.state));
              this.cacheStorage.resetTempCacheItems(request.state);
              this.authErrorHandler(interactionType, thrownError, stateOnlyResponse, reject);
              return;
          }
          // Get the account object if a session exists
          var account;
          if (request && request.account && !isLoginCall) {
              account = request.account;
              this.logger.verbose("Account set from request");
          }
          else {
              account = this.getAccount();
              this.logger.verbose("Account set from MSAL Cache");
          }
          // If no session exists, prompt the user to login.
          if (!account && !ServerRequestParameters.isSSOParam(request)) {
              if (isLoginCall) {
                  // extract ADAL id_token if exists
                  var adalIdToken = this.extractADALIdToken();
                  // silent login if ADAL id_token is retrieved successfully - SSO
                  if (adalIdToken && !request.scopes) {
                      this.logger.info("ADAL's idToken exists. Extracting login information from ADAL's idToken");
                      var tokenRequest = this.buildIDTokenRequest(request);
                      this.silentLogin = true;
                      this.acquireTokenSilent(tokenRequest).then(function (response) {
                          _this.silentLogin = false;
                          _this.logger.info("Unified cache call is successful");
                          _this.authResponseHandler(interactionType, response, resolve);
                          return;
                      }, function (error) {
                          _this.silentLogin = false;
                          _this.logger.error("Error occurred during unified cache ATS: " + error);
                          // proceed to login since ATS failed
                          _this.acquireTokenHelper(null, interactionType, isLoginCall, request, resolve, reject);
                      });
                  }
                  // No ADAL token found, proceed to login
                  else {
                      this.logger.verbose("Login call but no token found, proceed to login");
                      this.acquireTokenHelper(null, interactionType, isLoginCall, request, resolve, reject);
                  }
              }
              // AcquireToken call, but no account or context given, so throw error
              else {
                  this.logger.verbose("AcquireToken call, no context or account given");
                  this.logger.info("User login is required");
                  var stateOnlyResponse = buildResponseStateOnly(this.getAccountState(request.state));
                  this.cacheStorage.resetTempCacheItems(request.state);
                  this.authErrorHandler(interactionType, ClientAuthError.createUserLoginRequiredError(), stateOnlyResponse, reject);
                  return;
              }
          }
          // User session exists
          else {
              this.logger.verbose("User session exists, login not required");
              this.acquireTokenHelper(account, interactionType, isLoginCall, request, resolve, reject);
          }
      };
      /**
       * @hidden
       * @ignore
       * Helper function to acquireToken
       *
       */
      UserAgentApplication.prototype.acquireTokenHelper = function (account, interactionType, isLoginCall, request, resolve, reject) {
          return __awaiter(this, void 0, void 0, function () {
              var requestSignature, serverAuthenticationRequest, acquireTokenAuthority, popUpWindow, responseType, loginStartPage, urlNavigate, hash, error_1, navigate, err_1;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.logger.verbose("AcquireTokenHelper has been called");
                          this.logger.verbose("Interaction type: " + interactionType + ". isLoginCall: " + isLoginCall);
                          // Track the acquireToken progress
                          this.cacheStorage.setItem(TemporaryCacheKeys.INTERACTION_STATUS, Constants.inProgress);
                          requestSignature = request.scopes ? request.scopes.join(" ").toLowerCase() : Constants.oidcScopes.join(" ");
                          this.logger.verbosePii("Request signature: " + requestSignature);
                          acquireTokenAuthority = (request && request.authority) ? AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority, request.authorityMetadata) : this.authorityInstance;
                          _a.label = 1;
                      case 1:
                          _a.trys.push([1, 11, , 12]);
                          if (!!acquireTokenAuthority.hasCachedMetadata()) return [3 /*break*/, 3];
                          this.logger.verbose("No cached metadata for authority");
                          return [4 /*yield*/, AuthorityFactory.saveMetadataFromNetwork(acquireTokenAuthority, this.telemetryManager, request.correlationId)];
                      case 2:
                          _a.sent();
                          return [3 /*break*/, 4];
                      case 3:
                          this.logger.verbose("Cached metadata found for authority");
                          _a.label = 4;
                      case 4:
                          responseType = isLoginCall ? ResponseTypes.id_token : this.getTokenType(account, request.scopes);
                          loginStartPage = request.redirectStartPage || window.location.href;
                          serverAuthenticationRequest = new ServerRequestParameters(acquireTokenAuthority, this.clientId, responseType, this.getRedirectUri(request && request.redirectUri), request.scopes, request.state, request.correlationId);
                          this.logger.verbose("Finished building server authentication request");
                          this.updateCacheEntries(serverAuthenticationRequest, account, isLoginCall, loginStartPage);
                          this.logger.verbose("Updating cache entries");
                          // populate QueryParameters (sid/login_hint) and any other extraQueryParameters set by the developer
                          serverAuthenticationRequest.populateQueryParams(account, request);
                          this.logger.verbose("Query parameters populated from account");
                          urlNavigate = UrlUtils.createNavigateUrl(serverAuthenticationRequest) + Constants.response_mode_fragment;
                          // set state in cache
                          if (interactionType === Constants.interactionTypeRedirect) {
                              if (!isLoginCall) {
                                  this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_ACQ_TOKEN, request.state), serverAuthenticationRequest.state, this.inCookie);
                                  this.logger.verbose("State cached for redirect");
                                  this.logger.verbosePii("State cached: " + serverAuthenticationRequest.state);
                              }
                              else {
                                  this.logger.verbose("Interaction type redirect but login call is true. State not cached");
                              }
                          }
                          else if (interactionType === Constants.interactionTypePopup) {
                              window.renewStates.push(serverAuthenticationRequest.state);
                              window.requestType = isLoginCall ? Constants.login : Constants.renewToken;
                              this.logger.verbose("State saved to window");
                              this.logger.verbosePii("State saved: " + serverAuthenticationRequest.state);
                              // Register callback to capture results from server
                              this.registerCallback(serverAuthenticationRequest.state, requestSignature, resolve, reject);
                          }
                          else {
                              this.logger.verbose("Invalid interaction error. State not cached");
                              throw ClientAuthError.createInvalidInteractionTypeError();
                          }
                          if (!(interactionType === Constants.interactionTypePopup)) return [3 /*break*/, 9];
                          this.logger.verbose("Interaction type is popup. Generating popup window");
                          // Generate a popup window
                          try {
                              popUpWindow = this.openPopup(urlNavigate, "msal", Constants.popUpWidth, Constants.popUpHeight);
                              // Push popup window handle onto stack for tracking
                              WindowUtils.trackPopup(popUpWindow);
                          }
                          catch (e) {
                              this.logger.info(ClientAuthErrorMessage.popUpWindowError.code + ":" + ClientAuthErrorMessage.popUpWindowError.desc);
                              this.cacheStorage.setItem(ErrorCacheKeys.ERROR, ClientAuthErrorMessage.popUpWindowError.code);
                              this.cacheStorage.setItem(ErrorCacheKeys.ERROR_DESC, ClientAuthErrorMessage.popUpWindowError.desc);
                              if (reject) {
                                  reject(ClientAuthError.createPopupWindowError());
                                  return [2 /*return*/];
                              }
                          }
                          if (!popUpWindow) return [3 /*break*/, 8];
                          _a.label = 5;
                      case 5:
                          _a.trys.push([5, 7, , 8]);
                          return [4 /*yield*/, WindowUtils.monitorPopupForHash(popUpWindow, this.config.system.loadFrameTimeout, urlNavigate, this.logger)];
                      case 6:
                          hash = _a.sent();
                          this.handleAuthenticationResponse(hash);
                          // Request completed successfully, set to completed
                          this.cacheStorage.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
                          this.logger.info("Closing popup window");
                          // TODO: Check how this can be extracted for any framework specific code?
                          if (this.config.framework.isAngular) {
                              this.broadcast("msal:popUpHashChanged", hash);
                              WindowUtils.closePopups();
                          }
                          return [3 /*break*/, 8];
                      case 7:
                          error_1 = _a.sent();
                          if (reject) {
                              reject(error_1);
                          }
                          if (this.config.framework.isAngular) {
                              this.broadcast("msal:popUpClosed", error_1.errorCode + Constants.resourceDelimiter + error_1.errorMessage);
                          }
                          else {
                              // Request failed, set to canceled
                              this.cacheStorage.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
                              popUpWindow.close();
                          }
                          return [3 /*break*/, 8];
                      case 8: return [3 /*break*/, 10];
                      case 9:
                          // If onRedirectNavigate is implemented, invoke it and provide urlNavigate
                          if (request.onRedirectNavigate) {
                              this.logger.verbose("Invoking onRedirectNavigate callback");
                              navigate = request.onRedirectNavigate(urlNavigate);
                              // Returning false from onRedirectNavigate will stop navigation
                              if (navigate !== false) {
                                  this.logger.verbose("onRedirectNavigate did not return false, navigating");
                                  this.navigateWindow(urlNavigate);
                              }
                              else {
                                  this.logger.verbose("onRedirectNavigate returned false, stopping navigation");
                              }
                          }
                          else {
                              // Otherwise, perform navigation
                              this.logger.verbose("Navigating window to urlNavigate");
                              this.navigateWindow(urlNavigate);
                          }
                          _a.label = 10;
                      case 10: return [3 /*break*/, 12];
                      case 11:
                          err_1 = _a.sent();
                          this.logger.error(err_1);
                          this.cacheStorage.resetTempCacheItems(request.state);
                          this.authErrorHandler(interactionType, ClientAuthError.createEndpointResolutionError(err_1.toString), buildResponseStateOnly(request.state), reject);
                          if (popUpWindow) {
                              popUpWindow.close();
                          }
                          return [3 /*break*/, 12];
                      case 12: return [2 /*return*/];
                  }
              });
          });
      };
      /**
       * API interfacing idToken request when applications already have a session/hint acquired by authorization client applications
       * @param request
       */
      UserAgentApplication.prototype.ssoSilent = function (request) {
          this.logger.verbose("ssoSilent has been called");
          // throw an error on an empty request
          if (!request) {
              throw ClientConfigurationError.createEmptyRequestError();
          }
          // throw an error on no hints passed
          if (!request.sid && !request.loginHint) {
              throw ClientConfigurationError.createSsoSilentError();
          }
          return this.acquireTokenSilent(__assign({}, request, { scopes: Constants.oidcScopes }));
      };
      /**
       * Use this function to obtain a token before every call to the API / resource provider
       *
       * MSAL return's a cached token when available
       * Or it send's a request to the STS to obtain a new token using a hidden iframe.
       *
       * @param {@link AuthenticationParameters}
       *
       * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
       * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
       *
       */
      UserAgentApplication.prototype.acquireTokenSilent = function (userRequest) {
          var _this = this;
          this.logger.verbose("AcquireTokenSilent has been called");
          // validate the request
          var request = RequestUtils.validateRequest(userRequest, false, this.clientId, Constants.interactionTypeSilent);
          var apiEvent = this.telemetryManager.createAndStartApiEvent(request.correlationId, API_EVENT_IDENTIFIER.AcquireTokenSilent);
          var requestSignature = RequestUtils.createRequestSignature(request);
          return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
              var scope, account, adalIdToken, responseType, serverAuthenticationRequest, adalIdTokenObject, userContainedClaims, authErr, cacheResultResponse, logMessage, err_2;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          // block the request if made from the hidden iframe
                          WindowUtils.blockReloadInHiddenIframes();
                          scope = request.scopes.join(" ").toLowerCase();
                          this.logger.verbosePii("Serialized scopes: " + scope);
                          if (request.account) {
                              account = request.account;
                              this.logger.verbose("Account set from request");
                          }
                          else {
                              account = this.getAccount();
                              this.logger.verbose("Account set from MSAL Cache");
                          }
                          adalIdToken = this.cacheStorage.getItem(Constants.adalIdToken);
                          // In the event of no account being passed in the config, no session id, and no pre-existing adalIdToken, user will need to log in
                          if (!account && !(request.sid || request.loginHint) && StringUtils.isEmpty(adalIdToken)) {
                              this.logger.info("User login is required");
                              // The promise rejects with a UserLoginRequiredError, which should be caught and user should be prompted to log in interactively
                              return [2 /*return*/, reject(ClientAuthError.createUserLoginRequiredError())];
                          }
                          responseType = this.getTokenType(account, request.scopes);
                          this.logger.verbose("Response type: " + responseType);
                          serverAuthenticationRequest = new ServerRequestParameters(AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority, request.authorityMetadata), this.clientId, responseType, this.getRedirectUri(request.redirectUri), request.scopes, request.state, request.correlationId);
                          this.logger.verbose("Finished building server authentication request");
                          // populate QueryParameters (sid/login_hint) and any other extraQueryParameters set by the developer
                          if (ServerRequestParameters.isSSOParam(request) || account) {
                              serverAuthenticationRequest.populateQueryParams(account, request, null, true);
                              this.logger.verbose("Query parameters populated from existing SSO or account");
                          }
                          // if user didn't pass login_hint/sid and adal's idtoken is present, extract the login_hint from the adalIdToken
                          else if (!account && !StringUtils.isEmpty(adalIdToken)) {
                              adalIdTokenObject = TokenUtils.extractIdToken(adalIdToken);
                              this.logger.verbose("ADAL's idToken exists. Extracting login information from ADAL's idToken to populate query parameters");
                              serverAuthenticationRequest.populateQueryParams(account, null, adalIdTokenObject, true);
                          }
                          else {
                              this.logger.verbose("No additional query parameters added");
                          }
                          userContainedClaims = request.claimsRequest || serverAuthenticationRequest.claimsValue;
                          // If request.forceRefresh is set to true, force a request for a new token instead of getting it from the cache
                          if (!userContainedClaims && !request.forceRefresh) {
                              try {
                                  cacheResultResponse = this.getCachedToken(serverAuthenticationRequest, account);
                              }
                              catch (e) {
                                  authErr = e;
                              }
                          }
                          if (!cacheResultResponse) return [3 /*break*/, 1];
                          this.logger.verbose("Token found in cache lookup");
                          this.logger.verbosePii("Scopes found: " + JSON.stringify(cacheResultResponse.scopes));
                          resolve(cacheResultResponse);
                          return [2 /*return*/, null];
                      case 1:
                          if (!authErr) return [3 /*break*/, 2];
                          this.logger.infoPii(authErr.errorCode + ":" + authErr.errorMessage);
                          reject(authErr);
                          return [2 /*return*/, null];
                      case 2:
                          logMessage = void 0;
                          if (userContainedClaims) {
                              logMessage = "Skipped cache lookup since claims were given";
                          }
                          else if (request.forceRefresh) {
                              logMessage = "Skipped cache lookup since request.forceRefresh option was set to true";
                          }
                          else {
                              logMessage = "No token found in cache lookup";
                          }
                          this.logger.verbose(logMessage);
                          // Cache result can return null if cache is empty. In that case, set authority to default value if no authority is passed to the API.
                          if (!serverAuthenticationRequest.authorityInstance) {
                              serverAuthenticationRequest.authorityInstance = request.authority ? AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority, request.authorityMetadata) : this.authorityInstance;
                          }
                          this.logger.verbosePii("Authority instance: " + serverAuthenticationRequest.authority);
                          _a.label = 3;
                      case 3:
                          _a.trys.push([3, 7, , 8]);
                          if (!!serverAuthenticationRequest.authorityInstance.hasCachedMetadata()) return [3 /*break*/, 5];
                          this.logger.verbose("No cached metadata for authority");
                          return [4 /*yield*/, AuthorityFactory.saveMetadataFromNetwork(serverAuthenticationRequest.authorityInstance, this.telemetryManager, request.correlationId)];
                      case 4:
                          _a.sent();
                          this.logger.verbose("Authority has been updated with endpoint discovery response");
                          return [3 /*break*/, 6];
                      case 5:
                          this.logger.verbose("Cached metadata found for authority");
                          _a.label = 6;
                      case 6:
                          /*
                           * refresh attempt with iframe
                           * Already renewing for this scope, callback when we get the token.
                           */
                          if (window.activeRenewals[requestSignature]) {
                              this.logger.verbose("Renewing token in progress. Registering callback");
                              // Active renewals contains the state for each renewal.
                              this.registerCallback(window.activeRenewals[requestSignature], requestSignature, resolve, reject);
                          }
                          else {
                              if (request.scopes && ScopeSet.onlyContainsOidcScopes(request.scopes)) {
                                  /*
                                   * App uses idToken to send to api endpoints
                                   * Default scope is tracked as clientId to store this token
                                   */
                                  this.logger.verbose("OpenID Connect scopes only, renewing idToken");
                                  this.silentLogin = true;
                                  this.renewIdToken(requestSignature, resolve, reject, account, serverAuthenticationRequest);
                              }
                              else {
                                  // renew access token
                                  this.logger.verbose("Renewing access token");
                                  this.renewToken(requestSignature, resolve, reject, account, serverAuthenticationRequest);
                              }
                          }
                          return [3 /*break*/, 8];
                      case 7:
                          err_2 = _a.sent();
                          this.logger.error(err_2);
                          reject(ClientAuthError.createEndpointResolutionError(err_2.toString()));
                          return [2 /*return*/, null];
                      case 8: return [2 /*return*/];
                  }
              });
          }); })
              .then(function (res) {
              _this.logger.verbose("Successfully acquired token");
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, true);
              return res;
          })
              .catch(function (error) {
              _this.cacheStorage.resetTempCacheItems(request.state);
              _this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, false, error.errorCode);
              throw error;
          });
      };
      // #endregion
      // #region Popup Window Creation
      /**
       * @hidden
       *
       * Configures popup window for login.
       *
       * @param urlNavigate
       * @param title
       * @param popUpWidth
       * @param popUpHeight
       * @ignore
       * @hidden
       */
      UserAgentApplication.prototype.openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
          this.logger.verbose("OpenPopup has been called");
          try {
              /**
               * adding winLeft and winTop to account for dual monitor
               * using screenLeft and screenTop for IE8 and earlier
               */
              var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
              var winTop = window.screenTop ? window.screenTop : window.screenY;
              /**
               * window.innerWidth displays browser window"s height and width excluding toolbars
               * using document.documentElement.clientWidth for IE8 and earlier
               */
              var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              var left = ((width / 2) - (popUpWidth / 2)) + winLeft;
              var top_1 = ((height / 2) - (popUpHeight / 2)) + winTop;
              // open the window
              var popupWindow = window.open(urlNavigate, title, "width=" + popUpWidth + ", height=" + popUpHeight + ", top=" + top_1 + ", left=" + left + ", scrollbars=yes");
              if (!popupWindow) {
                  throw ClientAuthError.createPopupWindowError();
              }
              if (popupWindow.focus) {
                  popupWindow.focus();
              }
              return popupWindow;
          }
          catch (e) {
              this.cacheStorage.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
              throw ClientAuthError.createPopupWindowError(e.toString());
          }
      };
      // #endregion
      // #region Iframe Management
      /**
       * @hidden
       * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
       * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
       * @ignore
       */
      UserAgentApplication.prototype.loadIframeTimeout = function (urlNavigate, frameName, requestSignature) {
          return __awaiter(this, void 0, void 0, function () {
              var expectedState, iframe, _a, hash, error_2;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          expectedState = window.activeRenewals[requestSignature];
                          this.logger.verbosePii("Set loading state to pending for: " + requestSignature + ":" + expectedState);
                          this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, expectedState), Constants.inProgress);
                          if (!this.config.system.navigateFrameWait) return [3 /*break*/, 2];
                          return [4 /*yield*/, WindowUtils.loadFrame(urlNavigate, frameName, this.config.system.navigateFrameWait, this.logger)];
                      case 1:
                          _a = _b.sent();
                          return [3 /*break*/, 3];
                      case 2:
                          _a = WindowUtils.loadFrameSync(urlNavigate, frameName, this.logger);
                          _b.label = 3;
                      case 3:
                          iframe = _a;
                          _b.label = 4;
                      case 4:
                          _b.trys.push([4, 6, , 7]);
                          return [4 /*yield*/, WindowUtils.monitorIframeForHash(iframe.contentWindow, this.config.system.loadFrameTimeout, urlNavigate, this.logger)];
                      case 5:
                          hash = _b.sent();
                          if (hash) {
                              this.handleAuthenticationResponse(hash);
                          }
                          return [3 /*break*/, 7];
                      case 6:
                          error_2 = _b.sent();
                          if (this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, expectedState)) === Constants.inProgress) {
                              // fail the iframe session if it's in pending state
                              this.logger.verbose("Loading frame has timed out after: " + (this.config.system.loadFrameTimeout / 1000) + " seconds for scope/authority " + requestSignature + ":" + expectedState);
                              // Error after timeout
                              if (expectedState && window.callbackMappedToRenewStates[expectedState]) {
                                  window.callbackMappedToRenewStates[expectedState](null, error_2);
                              }
                              this.cacheStorage.removeItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, expectedState));
                          }
                          WindowUtils.removeHiddenIframe(iframe);
                          throw error_2;
                      case 7:
                          WindowUtils.removeHiddenIframe(iframe);
                          return [2 /*return*/];
                  }
              });
          });
      };
      // #endregion
      // #region General Helpers
      /**
       * @hidden
       * Used to redirect the browser to the STS authorization endpoint
       * @param {string} urlNavigate - URL of the authorization endpoint
       */
      UserAgentApplication.prototype.navigateWindow = function (urlNavigate, popupWindow) {
          // Navigate if valid URL
          if (urlNavigate && !StringUtils.isEmpty(urlNavigate)) {
              var navigateWindow = popupWindow ? popupWindow : window;
              var logMessage = popupWindow ? "Navigated Popup window to:" + urlNavigate : "Navigate to:" + urlNavigate;
              this.logger.infoPii(logMessage);
              navigateWindow.location.assign(urlNavigate);
          }
          else {
              this.logger.info("Navigate url is empty");
              throw AuthError.createUnexpectedError("Navigate url is empty");
          }
      };
      /**
       * @hidden
       * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
       * @param {string} expectedState - Unique state identifier (guid).
       * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
       * @param {Function} resolve - The resolve function of the promise object.
       * @param {Function} reject - The reject function of the promise object.
       * @ignore
       */
      UserAgentApplication.prototype.registerCallback = function (expectedState, requestSignature, resolve, reject) {
          var _this = this;
          // track active renewals
          window.activeRenewals[requestSignature] = expectedState;
          // initialize callbacks mapped array
          if (!window.promiseMappedToRenewStates[expectedState]) {
              window.promiseMappedToRenewStates[expectedState] = [];
          }
          // indexing on the current state, push the callback params to callbacks mapped
          window.promiseMappedToRenewStates[expectedState].push({ resolve: resolve, reject: reject });
          // Store the server response in the current window??
          if (!window.callbackMappedToRenewStates[expectedState]) {
              window.callbackMappedToRenewStates[expectedState] = function (response, error) {
                  // reset active renewals
                  window.activeRenewals[requestSignature] = null;
                  // for all promiseMappedtoRenewStates for a given 'state' - call the reject/resolve with error/token respectively
                  for (var i = 0; i < window.promiseMappedToRenewStates[expectedState].length; ++i) {
                      try {
                          if (error) {
                              window.promiseMappedToRenewStates[expectedState][i].reject(error);
                          }
                          else if (response) {
                              window.promiseMappedToRenewStates[expectedState][i].resolve(response);
                          }
                          else {
                              _this.cacheStorage.resetTempCacheItems(expectedState);
                              throw AuthError.createUnexpectedError("Error and response are both null");
                          }
                      }
                      catch (e) {
                          _this.logger.warning(e);
                      }
                  }
                  // reset
                  window.promiseMappedToRenewStates[expectedState] = null;
                  window.callbackMappedToRenewStates[expectedState] = null;
              };
          }
      };
      // #endregion
      // #region Logout
      /**
       * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
       * Default behaviour is to redirect the user to `window.location.href`.
       */
      UserAgentApplication.prototype.logout = function (correlationId) {
          this.logger.verbose("Logout has been called");
          this.logoutAsync(correlationId);
      };
      /**
       * Async version of logout(). Use to log out the current user.
       * @param correlationId Request correlationId
       */
      UserAgentApplication.prototype.logoutAsync = function (correlationId) {
          return __awaiter(this, void 0, void 0, function () {
              var requestCorrelationId, apiEvent, correlationIdParam, postLogoutQueryParam, urlNavigate, error_3;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          requestCorrelationId = correlationId || CryptoUtils.createNewGuid();
                          apiEvent = this.telemetryManager.createAndStartApiEvent(requestCorrelationId, API_EVENT_IDENTIFIER.Logout);
                          this.clearCache();
                          this.account = null;
                          _a.label = 1;
                      case 1:
                          _a.trys.push([1, 5, , 6]);
                          if (!!this.authorityInstance.hasCachedMetadata()) return [3 /*break*/, 3];
                          this.logger.verbose("No cached metadata for authority");
                          return [4 /*yield*/, AuthorityFactory.saveMetadataFromNetwork(this.authorityInstance, this.telemetryManager, correlationId)];
                      case 2:
                          _a.sent();
                          return [3 /*break*/, 4];
                      case 3:
                          this.logger.verbose("Cached metadata found for authority");
                          _a.label = 4;
                      case 4:
                          correlationIdParam = "client-request-id=" + requestCorrelationId;
                          postLogoutQueryParam = void 0;
                          if (this.getPostLogoutRedirectUri()) {
                              postLogoutQueryParam = "&post_logout_redirect_uri=" + encodeURIComponent(this.getPostLogoutRedirectUri());
                              this.logger.verbose("redirectUri found and set");
                          }
                          else {
                              postLogoutQueryParam = "";
                              this.logger.verbose("No redirectUri set for app. postLogoutQueryParam is empty");
                          }
                          urlNavigate = void 0;
                          if (this.authorityInstance.EndSessionEndpoint) {
                              urlNavigate = this.authorityInstance.EndSessionEndpoint + "?" + correlationIdParam + postLogoutQueryParam;
                              this.logger.verbose("EndSessionEndpoint found and urlNavigate set");
                              this.logger.verbosePii("urlNavigate set to: " + this.authorityInstance.EndSessionEndpoint);
                          }
                          else {
                              urlNavigate = this.authority + "oauth2/v2.0/logout?" + correlationIdParam + postLogoutQueryParam;
                              this.logger.verbose("No endpoint, urlNavigate set to default");
                          }
                          this.telemetryManager.stopAndFlushApiEvent(requestCorrelationId, apiEvent, true);
                          this.logger.verbose("Navigating window to urlNavigate");
                          this.navigateWindow(urlNavigate);
                          return [3 /*break*/, 6];
                      case 5:
                          error_3 = _a.sent();
                          this.telemetryManager.stopAndFlushApiEvent(requestCorrelationId, apiEvent, false, error_3.errorCode);
                          return [3 /*break*/, 6];
                      case 6: return [2 /*return*/];
                  }
              });
          });
      };
      /**
       * @hidden
       * Clear all access tokens in the cache.
       * @ignore
       */
      UserAgentApplication.prototype.clearCache = function () {
          this.logger.verbose("Clearing cache");
          window.renewStates = [];
          var accessTokenItems = this.cacheStorage.getAllAccessTokens(Constants.clientId, Constants.homeAccountIdentifier);
          for (var i = 0; i < accessTokenItems.length; i++) {
              this.cacheStorage.removeItem(JSON.stringify(accessTokenItems[i].key));
          }
          this.cacheStorage.resetCacheItems();
          this.cacheStorage.clearMsalCookie();
          this.logger.verbose("Cache cleared");
      };
      /**
       * @hidden
       * Clear a given access token from the cache.
       *
       * @param accessToken
       */
      UserAgentApplication.prototype.clearCacheForScope = function (accessToken) {
          this.logger.verbose("Clearing access token from cache");
          var accessTokenItems = this.cacheStorage.getAllAccessTokens(Constants.clientId, Constants.homeAccountIdentifier);
          for (var i = 0; i < accessTokenItems.length; i++) {
              var token = accessTokenItems[i];
              if (token.value.accessToken === accessToken) {
                  this.cacheStorage.removeItem(JSON.stringify(token.key));
                  this.logger.verbosePii("Access token removed: " + token.key);
              }
          }
      };
      // #endregion
      // #region Response
      /**
       * @hidden
       * @ignore
       * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
       * @param {string} hash - Hash passed from redirect page.
       * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
       */
      UserAgentApplication.prototype.isCallback = function (hash) {
          this.logger.info("isCallback will be deprecated in favor of urlContainsHash in MSAL.js v2.0.");
          this.logger.verbose("isCallback has been called");
          return UrlUtils.urlContainsHash(hash);
      };
      /**
       * @hidden
       * Used to call the constructor callback with the token/error
       * @param {string} [hash=window.location.hash] - Hash fragment of Url.
       */
      UserAgentApplication.prototype.processCallBack = function (hash, stateInfo, parentCallback) {
          this.logger.info("ProcessCallBack has been called. Processing callback from redirect response");
          // get the state info from the hash
          if (!stateInfo) {
              this.logger.verbose("StateInfo is null, getting stateInfo from hash");
              stateInfo = this.getResponseState(hash);
          }
          var response;
          var authErr;
          // Save the token info from the hash
          try {
              response = this.saveTokenFromHash(hash, stateInfo);
          }
          catch (err) {
              authErr = err;
          }
          try {
              // Clear the cookie in the hash
              this.cacheStorage.clearMsalCookie(stateInfo.state);
              var accountState = this.getAccountState(stateInfo.state);
              if (response) {
                  if ((stateInfo.requestType === Constants.renewToken) || response.accessToken) {
                      if (window.parent !== window) {
                          this.logger.verbose("Window is in iframe, acquiring token silently");
                      }
                      else {
                          this.logger.verbose("Acquiring token interactive in progress");
                      }
                      this.logger.verbose("Response tokenType set to " + ServerHashParamKeys.ACCESS_TOKEN);
                      response.tokenType = ServerHashParamKeys.ACCESS_TOKEN;
                  }
                  else if (stateInfo.requestType === Constants.login) {
                      this.logger.verbose("Response tokenType set to " + ServerHashParamKeys.ID_TOKEN);
                      response.tokenType = ServerHashParamKeys.ID_TOKEN;
                  }
                  if (!parentCallback) {
                      this.logger.verbose("Setting redirectResponse");
                      this.redirectResponse = response;
                      return;
                  }
              }
              else if (!parentCallback) {
                  this.logger.verbose("Response is null, setting redirectResponse with state");
                  this.redirectResponse = buildResponseStateOnly(accountState);
                  this.redirectError = authErr;
                  this.cacheStorage.resetTempCacheItems(stateInfo.state);
                  return;
              }
              this.logger.verbose("Calling callback provided to processCallback");
              parentCallback(response, authErr);
          }
          catch (err) {
              this.logger.error("Error occurred in token received callback function: " + err);
              throw ClientAuthError.createErrorInCallbackFunction(err.toString());
          }
      };
      /**
       * @hidden
       * This method must be called for processing the response received from the STS if using popups or iframes. It extracts the hash, processes the token or error
       * information and saves it in the cache. It then resolves the promises with the result.
       * @param {string} [hash=window.location.hash] - Hash fragment of Url.
       */
      UserAgentApplication.prototype.handleAuthenticationResponse = function (hash) {
          this.logger.verbose("HandleAuthenticationResponse has been called");
          // retrieve the hash
          var locationHash = hash || window.location.hash;
          // if (window.parent !== window), by using self, window.parent becomes equal to window in getResponseState method specifically
          var stateInfo = this.getResponseState(locationHash);
          this.logger.verbose("Obtained state from response");
          var tokenResponseCallback = window.callbackMappedToRenewStates[stateInfo.state];
          this.processCallBack(locationHash, stateInfo, tokenResponseCallback);
          // If current window is opener, close all windows
          WindowUtils.closePopups();
      };
      /**
       * @hidden
       * This method must be called for processing the response received from the STS when using redirect flows. It extracts the hash, processes the token or error
       * information and saves it in the cache. The result can then be accessed by user registered callbacks.
       * @param {string} [hash=window.location.hash] - Hash fragment of Url.
       */
      UserAgentApplication.prototype.handleRedirectAuthenticationResponse = function (hash) {
          this.logger.info("Returned from redirect url");
          this.logger.verbose("HandleRedirectAuthenticationResponse has been called");
          // clear hash from window
          window.location.hash = "";
          this.logger.verbose("Window.location.hash cleared");
          // if (window.parent !== window), by using self, window.parent becomes equal to window in getResponseState method specifically
          var stateInfo = this.getResponseState(hash);
          // if set to navigate to loginRequest page post login
          if (this.config.auth.navigateToLoginRequestUrl && window.parent === window) {
              this.logger.verbose("Window.parent is equal to window, not in popup or iframe. Navigation to login request url after login turned on");
              var loginRequestUrl = this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.LOGIN_REQUEST, stateInfo.state), this.inCookie);
              // Redirect to home page if login request url is null (real null or the string null)
              if (!loginRequestUrl || loginRequestUrl === "null") {
                  this.logger.error("Unable to get valid login request url from cache, redirecting to home page");
                  window.location.assign("/");
                  return;
              }
              else {
                  this.logger.verbose("Valid login request url obtained from cache");
                  var currentUrl = UrlUtils.removeHashFromUrl(window.location.href);
                  var finalRedirectUrl = UrlUtils.removeHashFromUrl(loginRequestUrl);
                  if (currentUrl !== finalRedirectUrl) {
                      this.logger.verbose("Current url is not login request url, navigating");
                      this.logger.verbosePii("CurrentUrl: " + currentUrl + ", finalRedirectUrl: " + finalRedirectUrl);
                      window.location.assign("" + finalRedirectUrl + hash);
                      return;
                  }
                  else {
                      this.logger.verbose("Current url matches login request url");
                      var loginRequestUrlComponents = UrlUtils.GetUrlComponents(loginRequestUrl);
                      if (loginRequestUrlComponents.Hash) {
                          this.logger.verbose("Login request url contains hash, resetting non-msal hash");
                          window.location.hash = loginRequestUrlComponents.Hash;
                      }
                  }
              }
          }
          else if (!this.config.auth.navigateToLoginRequestUrl) {
              this.logger.verbose("Default navigation to start page after login turned off");
          }
          this.processCallBack(hash, stateInfo, null);
      };
      /**
       * @hidden
       * Creates a stateInfo object from the URL fragment and returns it.
       * @param {string} hash  -  Hash passed from redirect page
       * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
       * @ignore
       */
      UserAgentApplication.prototype.getResponseState = function (hash) {
          this.logger.verbose("GetResponseState has been called");
          var parameters = UrlUtils.deserializeHash(hash);
          var stateResponse;
          if (!parameters) {
              throw AuthError.createUnexpectedError("Hash was not parsed correctly.");
          }
          if (parameters.hasOwnProperty(ServerHashParamKeys.STATE)) {
              this.logger.verbose("Hash contains state. Creating stateInfo object");
              var parsedState = RequestUtils.parseLibraryState(parameters.state);
              stateResponse = {
                  requestType: Constants.unknown,
                  state: parameters.state,
                  timestamp: parsedState.ts,
                  method: parsedState.method,
                  stateMatch: false
              };
          }
          else {
              throw AuthError.createUnexpectedError("Hash does not contain state.");
          }
          /*
           * async calls can fire iframe and login request at the same time if developer does not use the API as expected
           * incoming callback needs to be looked up to find the request type
           */
          // loginRedirect
          if (stateResponse.state === this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_LOGIN, stateResponse.state), this.inCookie) || stateResponse.state === this.silentAuthenticationState) {
              this.logger.verbose("State matches cached state, setting requestType to login");
              stateResponse.requestType = Constants.login;
              stateResponse.stateMatch = true;
              return stateResponse;
          }
          // acquireTokenRedirect
          else if (stateResponse.state === this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_ACQ_TOKEN, stateResponse.state), this.inCookie)) {
              this.logger.verbose("State matches cached state, setting requestType to renewToken");
              stateResponse.requestType = Constants.renewToken;
              stateResponse.stateMatch = true;
              return stateResponse;
          }
          // external api requests may have many renewtoken requests for different resource
          if (!stateResponse.stateMatch) {
              this.logger.verbose("State does not match cached state, setting requestType to type from window");
              stateResponse.requestType = window.requestType;
              var statesInParentContext = window.renewStates;
              for (var i = 0; i < statesInParentContext.length; i++) {
                  if (statesInParentContext[i] === stateResponse.state) {
                      this.logger.verbose("Matching state found for request");
                      stateResponse.stateMatch = true;
                      break;
                  }
              }
              if (!stateResponse.stateMatch) {
                  this.logger.verbose("Matching state not found for request");
              }
          }
          return stateResponse;
      };
      // #endregion
      // #region Token Processing (Extract to TokenProcessing.ts)
      /**
       * @hidden
       * Used to get token for the specified set of scopes from the cache
       * @param {@link ServerRequestParameters} - Request sent to the STS to obtain an id_token/access_token
       * @param {Account} account - Account for which the scopes were requested
       */
      UserAgentApplication.prototype.getCachedToken = function (serverAuthenticationRequest, account) {
          this.logger.verbose("GetCachedToken has been called");
          var accessTokenCacheItem = null;
          var scopes = serverAuthenticationRequest.scopes;
          // filter by clientId and account
          var tokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, account ? account.homeAccountIdentifier : null);
          this.logger.verbose("Getting all cached access tokens");
          // No match found after initial filtering
          if (tokenCacheItems.length === 0) {
              this.logger.verbose("No matching tokens found when filtered by clientId and account");
              return null;
          }
          var filteredItems = [];
          // if no authority passed or authority is common/organizations
          if (!serverAuthenticationRequest.authority || UrlUtils.isCommonAuthority(serverAuthenticationRequest.authority) || UrlUtils.isOrganizationsAuthority(serverAuthenticationRequest.authority)) {
              this.logger.verbose("No authority passed, filtering tokens by scope");
              // filter by scope
              for (var i = 0; i < tokenCacheItems.length; i++) {
                  var cacheItem = tokenCacheItems[i];
                  var cachedScopes = cacheItem.key.scopes.split(" ");
                  if (ScopeSet.containsScope(cachedScopes, scopes)) {
                      filteredItems.push(cacheItem);
                  }
              }
              // if only one cached token found
              if (filteredItems.length === 1) {
                  this.logger.verbose("One matching token found, setting authorityInstance");
                  accessTokenCacheItem = filteredItems[0];
                  serverAuthenticationRequest.authorityInstance = AuthorityFactory.CreateInstance(accessTokenCacheItem.key.authority, this.config.auth.validateAuthority);
              }
              // if more than one cached token is found
              else if (filteredItems.length > 1) {
                  // serverAuthenticationRequest.authority can only be common or organizations if not null
                  if (serverAuthenticationRequest.authority) {
                      // find an exact match for domain
                      var requestDomain_1 = UrlUtils.GetUrlComponents(serverAuthenticationRequest.authority).HostNameAndPort;
                      var filteredAuthorityItems = filteredItems.filter(function (filteredItem) {
                          var domain = UrlUtils.GetUrlComponents(filteredItem.key.authority).HostNameAndPort;
                          return domain === requestDomain_1;
                      });
                      if (filteredAuthorityItems.length === 1) {
                          accessTokenCacheItem = filteredAuthorityItems[0];
                          serverAuthenticationRequest.authorityInstance = AuthorityFactory.CreateInstance(accessTokenCacheItem.key.authority, this.config.auth.validateAuthority);
                      }
                      else if (filteredAuthorityItems.length > 1) {
                          throw ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
                      }
                      else {
                          this.logger.verbose("No matching tokens found");
                          return null;
                      }
                  }
                  else { // if not common or organizations authority, throw error
                      throw ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
                  }
              }
              // if no match found, check if there was a single authority used
              else {
                  this.logger.verbose("No matching token found when filtering by scope");
                  var authorityList = this.getUniqueAuthority(tokenCacheItems, "authority");
                  if (authorityList.length > 1) {
                      throw ClientAuthError.createMultipleAuthoritiesInCacheError(scopes.toString());
                  }
                  this.logger.verbose("Single authority used, setting authorityInstance");
                  serverAuthenticationRequest.authorityInstance = AuthorityFactory.CreateInstance(authorityList[0], this.config.auth.validateAuthority);
              }
          }
          // if an authority is passed in the API
          else {
              this.logger.verbose("Authority passed, filtering by authority and scope");
              // filter by authority and scope
              for (var i = 0; i < tokenCacheItems.length; i++) {
                  var cacheItem = tokenCacheItems[i];
                  var cachedScopes = cacheItem.key.scopes.split(" ");
                  if (ScopeSet.containsScope(cachedScopes, scopes) && UrlUtils.CanonicalizeUri(cacheItem.key.authority) === serverAuthenticationRequest.authority) {
                      filteredItems.push(cacheItem);
                  }
              }
              // no match
              if (filteredItems.length === 0) {
                  this.logger.verbose("No matching tokens found");
                  return null;
              }
              // if only one cachedToken Found
              else if (filteredItems.length === 1) {
                  this.logger.verbose("Single token found");
                  accessTokenCacheItem = filteredItems[0];
              }
              else {
                  // if more than one cached token is found
                  throw ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
              }
          }
          if (accessTokenCacheItem != null) {
              this.logger.verbose("Evaluating access token found");
              var expired = Number(accessTokenCacheItem.value.expiresIn);
              // If expiration is within offset, it will force renew
              var offset = this.config.system.tokenRenewalOffsetSeconds || 300;
              if (expired && (expired > TimeUtils.now() + offset)) {
                  this.logger.verbose("Token expiration is within offset, renewing token");
                  var idTokenObj = new IdToken(accessTokenCacheItem.value.idToken);
                  if (!account) {
                      account = this.getAccount();
                      if (!account) {
                          throw AuthError.createUnexpectedError("Account should not be null here.");
                      }
                  }
                  var aState = this.getAccountState(serverAuthenticationRequest.state);
                  var response = {
                      uniqueId: "",
                      tenantId: "",
                      tokenType: (accessTokenCacheItem.value.idToken === accessTokenCacheItem.value.accessToken) ? ServerHashParamKeys.ID_TOKEN : ServerHashParamKeys.ACCESS_TOKEN,
                      idToken: idTokenObj,
                      idTokenClaims: idTokenObj.claims,
                      accessToken: accessTokenCacheItem.value.accessToken,
                      scopes: accessTokenCacheItem.key.scopes.split(" "),
                      expiresOn: new Date(expired * 1000),
                      account: account,
                      accountState: aState,
                      fromCache: true
                  };
                  ResponseUtils.setResponseIdToken(response, idTokenObj);
                  this.logger.verbose("Response generated and token set");
                  return response;
              }
              else {
                  this.logger.verbose("Token expired, removing from cache");
                  this.cacheStorage.removeItem(JSON.stringify(filteredItems[0].key));
                  return null;
              }
          }
          else {
              this.logger.verbose("No tokens found");
              return null;
          }
      };
      /**
       * @hidden
       * Used to get a unique list of authorities from the cache
       * @param {Array<AccessTokenCacheItem>}  accessTokenCacheItems - accessTokenCacheItems saved in the cache
       * @ignore
       */
      UserAgentApplication.prototype.getUniqueAuthority = function (accessTokenCacheItems, property) {
          this.logger.verbose("GetUniqueAuthority has been called");
          var authorityList = [];
          var flags = [];
          accessTokenCacheItems.forEach(function (element) {
              if (element.key.hasOwnProperty(property) && (flags.indexOf(element.key[property]) === -1)) {
                  flags.push(element.key[property]);
                  authorityList.push(element.key[property]);
              }
          });
          return authorityList;
      };
      /**
       * @hidden
       * Check if ADAL id_token exists and return if exists.
       *
       */
      UserAgentApplication.prototype.extractADALIdToken = function () {
          this.logger.verbose("ExtractADALIdToken has been called");
          var adalIdToken = this.cacheStorage.getItem(Constants.adalIdToken);
          return (!StringUtils.isEmpty(adalIdToken)) ? TokenUtils.extractIdToken(adalIdToken) : null;
      };
      /**
       * @hidden
       * Acquires access token using a hidden iframe.
       * @ignore
       */
      UserAgentApplication.prototype.renewToken = function (requestSignature, resolve, reject, account, serverAuthenticationRequest) {
          this.logger.verbose("RenewToken has been called");
          this.logger.verbosePii("RenewToken scope and authority: " + requestSignature);
          var frameName = WindowUtils.generateFrameName(FramePrefix.TOKEN_FRAME, requestSignature);
          WindowUtils.addHiddenIFrame(frameName, this.logger);
          this.updateCacheEntries(serverAuthenticationRequest, account, false);
          this.logger.verbosePii("RenewToken expected state: " + serverAuthenticationRequest.state);
          // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame
          var urlNavigate = UrlUtils.urlRemoveQueryStringParameter(UrlUtils.createNavigateUrl(serverAuthenticationRequest), Constants.prompt) + Constants.prompt_none + Constants.response_mode_fragment;
          window.renewStates.push(serverAuthenticationRequest.state);
          window.requestType = Constants.renewToken;
          this.logger.verbose("Set window.renewState and requestType");
          this.registerCallback(serverAuthenticationRequest.state, requestSignature, resolve, reject);
          this.logger.infoPii("Navigate to: " + urlNavigate);
          this.loadIframeTimeout(urlNavigate, frameName, requestSignature).catch(function (error) { return reject(error); });
      };
      /**
       * @hidden
       * Renews idtoken for app's own backend when clientId is passed as a single scope in the scopes array.
       * @ignore
       */
      UserAgentApplication.prototype.renewIdToken = function (requestSignature, resolve, reject, account, serverAuthenticationRequest) {
          this.logger.info("RenewIdToken has been called");
          var frameName = WindowUtils.generateFrameName(FramePrefix.ID_TOKEN_FRAME, requestSignature);
          WindowUtils.addHiddenIFrame(frameName, this.logger);
          this.updateCacheEntries(serverAuthenticationRequest, account, false);
          this.logger.verbose("RenewIdToken expected state: " + serverAuthenticationRequest.state);
          // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame
          var urlNavigate = UrlUtils.urlRemoveQueryStringParameter(UrlUtils.createNavigateUrl(serverAuthenticationRequest), Constants.prompt) + Constants.prompt_none + Constants.response_mode_fragment;
          if (this.silentLogin) {
              this.logger.verbose("Silent login is true, set silentAuthenticationState");
              window.requestType = Constants.login;
              this.silentAuthenticationState = serverAuthenticationRequest.state;
          }
          else {
              this.logger.verbose("Not silent login, set window.renewState and requestType");
              window.requestType = Constants.renewToken;
              window.renewStates.push(serverAuthenticationRequest.state);
          }
          // note: scope here is clientId
          this.registerCallback(serverAuthenticationRequest.state, requestSignature, resolve, reject);
          this.logger.infoPii("Navigate to:\" " + urlNavigate);
          this.loadIframeTimeout(urlNavigate, frameName, requestSignature).catch(function (error) { return reject(error); });
      };
      /**
       * @hidden
       *
       * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
       * @param {string} authority authority received in the redirect response from AAD.
       * @param {TokenResponse} requestInfo an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
       * @param {Account} account account object for which scopes are consented for. The default account is the logged in account.
       * @param {ClientInfo} clientInfo clientInfo received as part of the response comprising of fields uid and utid.
       * @param {IdToken} idToken idToken received as part of the response.
       * @ignore
       * @private
       */
      /* tslint:disable:no-string-literal */
      UserAgentApplication.prototype.saveAccessToken = function (response, authority, parameters, clientInfo, idTokenObj) {
          this.logger.verbose("SaveAccessToken has been called");
          var scope;
          var accessTokenResponse = __assign({}, response);
          var expiration;
          // if the response contains "scope"
          if (parameters.hasOwnProperty(ServerHashParamKeys.SCOPE)) {
              this.logger.verbose("Response parameters contains scope");
              // read the scopes
              scope = parameters[ServerHashParamKeys.SCOPE];
              var consentedScopes = scope.split(" ");
              // retrieve all access tokens from the cache, remove the dup scores
              var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, authority);
              this.logger.verbose("Retrieving all access tokens from cache and removing duplicates");
              for (var i = 0; i < accessTokenCacheItems.length; i++) {
                  var accessTokenCacheItem = accessTokenCacheItems[i];
                  if (accessTokenCacheItem.key.homeAccountIdentifier === response.account.homeAccountIdentifier) {
                      var cachedScopes = accessTokenCacheItem.key.scopes.split(" ");
                      if (ScopeSet.isIntersectingScopes(cachedScopes, consentedScopes)) {
                          this.cacheStorage.removeItem(JSON.stringify(accessTokenCacheItem.key));
                      }
                  }
              }
              // Generate and cache accessTokenKey and accessTokenValue
              var expiresIn = TimeUtils.parseExpiresIn(parameters[ServerHashParamKeys.EXPIRES_IN]);
              var parsedState = RequestUtils.parseLibraryState(parameters[ServerHashParamKeys.STATE]);
              expiration = parsedState.ts + expiresIn;
              var accessTokenKey = new AccessTokenKey(authority, this.clientId, scope, clientInfo.uid, clientInfo.utid);
              var accessTokenValue = new AccessTokenValue(parameters[ServerHashParamKeys.ACCESS_TOKEN], idTokenObj.rawIdToken, expiration.toString(), clientInfo.encodeClientInfo());
              this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
              this.logger.verbose("Saving token to cache");
              accessTokenResponse.accessToken = parameters[ServerHashParamKeys.ACCESS_TOKEN];
              accessTokenResponse.scopes = consentedScopes;
          }
          // if the response does not contain "scope" - scope is set to OIDC scopes by default and the token will be id_token
          else {
              this.logger.verbose("Response parameters does not contain scope, clientId set as scope");
              // Generate and cache accessTokenKey and accessTokenValue
              var accessTokenKey = new AccessTokenKey(authority, this.clientId, scope, clientInfo.uid, clientInfo.utid);
              expiration = Number(idTokenObj.expiration);
              var accessTokenValue = new AccessTokenValue(parameters[ServerHashParamKeys.ID_TOKEN], parameters[ServerHashParamKeys.ID_TOKEN], expiration.toString(), clientInfo.encodeClientInfo());
              this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
              this.logger.verbose("Saving token to cache");
              accessTokenResponse.scopes = Constants.oidcScopes;
              accessTokenResponse.accessToken = parameters[ServerHashParamKeys.ID_TOKEN];
          }
          if (expiration) {
              this.logger.verbose("New expiration set");
              accessTokenResponse.expiresOn = new Date(expiration * 1000);
          }
          else {
              this.logger.error("Could not parse expiresIn parameter");
          }
          return accessTokenResponse;
      };
      /**
       * @hidden
       * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the account object.
       * @ignore
       */
      UserAgentApplication.prototype.saveTokenFromHash = function (hash, stateInfo) {
          this.logger.verbose("SaveTokenFromHash has been called");
          this.logger.info("State status: " + stateInfo.stateMatch + "; Request type: " + stateInfo.requestType);
          var response = {
              uniqueId: "",
              tenantId: "",
              tokenType: "",
              idToken: null,
              idTokenClaims: null,
              accessToken: null,
              scopes: [],
              expiresOn: null,
              account: null,
              accountState: "",
              fromCache: false
          };
          var error;
          var hashParams = UrlUtils.deserializeHash(hash);
          var authorityKey = "";
          var acquireTokenAccountKey = "";
          var idTokenObj = null;
          // If server returns an error
          if (hashParams.hasOwnProperty(ServerHashParamKeys.ERROR_DESCRIPTION) || hashParams.hasOwnProperty(ServerHashParamKeys.ERROR)) {
              this.logger.verbose("Server returned an error");
              this.logger.infoPii("Error : " + hashParams[ServerHashParamKeys.ERROR] + "; Error description: " + hashParams[ServerHashParamKeys.ERROR_DESCRIPTION]);
              this.cacheStorage.setItem(ErrorCacheKeys.ERROR, hashParams[ServerHashParamKeys.ERROR]);
              this.cacheStorage.setItem(ErrorCacheKeys.ERROR_DESC, hashParams[ServerHashParamKeys.ERROR_DESCRIPTION]);
              // login
              if (stateInfo.requestType === Constants.login) {
                  this.logger.verbose("RequestType is login, caching login error, generating authorityKey");
                  this.cacheStorage.setItem(ErrorCacheKeys.LOGIN_ERROR, hashParams[ServerHashParamKeys.ERROR_DESCRIPTION] + ":" + hashParams[ServerHashParamKeys.ERROR]);
                  authorityKey = AuthCache.generateAuthorityKey(stateInfo.state);
              }
              // acquireToken
              if (stateInfo.requestType === Constants.renewToken) {
                  this.logger.verbose("RequestType is renewToken, generating acquireTokenAccountKey");
                  authorityKey = AuthCache.generateAuthorityKey(stateInfo.state);
                  var account = this.getAccount();
                  var accountId = void 0;
                  if (account && !StringUtils.isEmpty(account.homeAccountIdentifier)) {
                      accountId = account.homeAccountIdentifier;
                      this.logger.verbose("AccountId is set");
                  }
                  else {
                      accountId = Constants.no_account;
                      this.logger.verbose("AccountId is set as no_account");
                  }
                  acquireTokenAccountKey = AuthCache.generateAcquireTokenAccountKey(accountId, stateInfo.state);
              }
              var _a = ServerHashParamKeys.ERROR, hashErr = hashParams[_a], _b = ServerHashParamKeys.ERROR_DESCRIPTION, hashErrDesc = hashParams[_b];
              if (InteractionRequiredAuthError.isInteractionRequiredError(hashErr) ||
                  InteractionRequiredAuthError.isInteractionRequiredError(hashErrDesc)) {
                  error = new InteractionRequiredAuthError(hashParams[ServerHashParamKeys.ERROR], hashParams[ServerHashParamKeys.ERROR_DESCRIPTION]);
              }
              else {
                  error = new ServerError(hashParams[ServerHashParamKeys.ERROR], hashParams[ServerHashParamKeys.ERROR_DESCRIPTION]);
              }
          }
          // If the server returns "Success"
          else {
              this.logger.verbose("Server returns success");
              // Verify the state from redirect and record tokens to storage if exists
              if (stateInfo.stateMatch) {
                  this.logger.info("State is right");
                  if (hashParams.hasOwnProperty(ServerHashParamKeys.SESSION_STATE)) {
                      this.logger.verbose("Fragment has session state, caching");
                      this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.SESSION_STATE, stateInfo.state), hashParams[ServerHashParamKeys.SESSION_STATE]);
                  }
                  response.accountState = this.getAccountState(stateInfo.state);
                  var clientInfo = void 0;
                  // Process access_token
                  if (hashParams.hasOwnProperty(ServerHashParamKeys.ACCESS_TOKEN)) {
                      this.logger.info("Fragment has access token");
                      response.accessToken = hashParams[ServerHashParamKeys.ACCESS_TOKEN];
                      if (hashParams.hasOwnProperty(ServerHashParamKeys.SCOPE)) {
                          response.scopes = hashParams[ServerHashParamKeys.SCOPE].split(" ");
                      }
                      // retrieve the id_token from response if present
                      if (hashParams.hasOwnProperty(ServerHashParamKeys.ID_TOKEN)) {
                          this.logger.verbose("Fragment has id_token");
                          idTokenObj = new IdToken(hashParams[ServerHashParamKeys.ID_TOKEN]);
                          response.idToken = idTokenObj;
                          response.idTokenClaims = idTokenObj.claims;
                      }
                      else {
                          this.logger.verbose("No idToken on fragment, getting idToken from cache");
                          idTokenObj = new IdToken(this.cacheStorage.getItem(PersistentCacheKeys.IDTOKEN));
                          response = ResponseUtils.setResponseIdToken(response, idTokenObj);
                      }
                      // set authority
                      var authority = this.populateAuthority(stateInfo.state, this.inCookie, this.cacheStorage, idTokenObj);
                      this.logger.verbose("Got authority from cache");
                      // retrieve client_info - if it is not found, generate the uid and utid from idToken
                      if (hashParams.hasOwnProperty(ServerHashParamKeys.CLIENT_INFO)) {
                          this.logger.verbose("Fragment has clientInfo");
                          clientInfo = new ClientInfo(hashParams[ServerHashParamKeys.CLIENT_INFO], authority);
                      }
                      else if (this.authorityInstance.AuthorityType === AuthorityType.Adfs) {
                          clientInfo = ClientInfo.createClientInfoFromIdToken(idTokenObj, authority);
                      }
                      else {
                          this.logger.warning("ClientInfo not received in the response from AAD");
                      }
                      response.account = Account.createAccount(idTokenObj, clientInfo);
                      this.logger.verbose("Account object created from response");
                      var accountKey = void 0;
                      if (response.account && !StringUtils.isEmpty(response.account.homeAccountIdentifier)) {
                          this.logger.verbose("AccountKey set");
                          accountKey = response.account.homeAccountIdentifier;
                      }
                      else {
                          this.logger.verbose("AccountKey set as no_account");
                          accountKey = Constants.no_account;
                      }
                      acquireTokenAccountKey = AuthCache.generateAcquireTokenAccountKey(accountKey, stateInfo.state);
                      var acquireTokenAccountKey_noaccount = AuthCache.generateAcquireTokenAccountKey(Constants.no_account, stateInfo.state);
                      this.logger.verbose("AcquireTokenAccountKey generated");
                      var cachedAccount = this.cacheStorage.getItem(acquireTokenAccountKey);
                      var acquireTokenAccount = void 0;
                      // Check with the account in the Cache
                      if (!StringUtils.isEmpty(cachedAccount)) {
                          acquireTokenAccount = JSON.parse(cachedAccount);
                          this.logger.verbose("AcquireToken request account retrieved from cache");
                          if (response.account && acquireTokenAccount && Account.compareAccounts(response.account, acquireTokenAccount)) {
                              response = this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
                              this.logger.info("The user object received in the response is the same as the one passed in the acquireToken request");
                          }
                          else {
                              this.logger.warning("The account object created from the response is not the same as the one passed in the acquireToken request");
                          }
                      }
                      else if (!StringUtils.isEmpty(this.cacheStorage.getItem(acquireTokenAccountKey_noaccount))) {
                          this.logger.verbose("No acquireToken account retrieved from cache");
                          response = this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
                      }
                  }
                  // Process id_token
                  if (hashParams.hasOwnProperty(ServerHashParamKeys.ID_TOKEN)) {
                      this.logger.info("Fragment has idToken");
                      // set the idToken
                      idTokenObj = new IdToken(hashParams[ServerHashParamKeys.ID_TOKEN]);
                      // set authority
                      var authority = this.populateAuthority(stateInfo.state, this.inCookie, this.cacheStorage, idTokenObj);
                      response = ResponseUtils.setResponseIdToken(response, idTokenObj);
                      if (hashParams.hasOwnProperty(ServerHashParamKeys.CLIENT_INFO)) {
                          this.logger.verbose("Fragment has clientInfo");
                          clientInfo = new ClientInfo(hashParams[ServerHashParamKeys.CLIENT_INFO], authority);
                      }
                      else if (this.authorityInstance.AuthorityType === AuthorityType.Adfs) {
                          clientInfo = ClientInfo.createClientInfoFromIdToken(idTokenObj, authority);
                      }
                      else {
                          this.logger.warning("ClientInfo not received in the response from AAD");
                      }
                      this.account = Account.createAccount(idTokenObj, clientInfo);
                      response.account = this.account;
                      this.logger.verbose("Account object created from response");
                      if (idTokenObj && idTokenObj.nonce) {
                          this.logger.verbose("IdToken has nonce");
                          // check nonce integrity if idToken has nonce - throw an error if not matched
                          var cachedNonce = this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.NONCE_IDTOKEN, stateInfo.state), this.inCookie);
                          if (idTokenObj.nonce !== cachedNonce) {
                              this.account = null;
                              this.cacheStorage.setItem(ErrorCacheKeys.LOGIN_ERROR, "Nonce Mismatch. Expected Nonce: " + cachedNonce + "," + "Actual Nonce: " + idTokenObj.nonce);
                              this.logger.error("Nonce Mismatch. Expected Nonce: " + cachedNonce + ", Actual Nonce: " + idTokenObj.nonce);
                              error = ClientAuthError.createNonceMismatchError(cachedNonce, idTokenObj.nonce);
                          }
                          // Save the token
                          else {
                              this.logger.verbose("Nonce matches, saving idToken to cache");
                              this.cacheStorage.setItem(PersistentCacheKeys.IDTOKEN, hashParams[ServerHashParamKeys.ID_TOKEN], this.inCookie);
                              this.cacheStorage.setItem(PersistentCacheKeys.CLIENT_INFO, clientInfo.encodeClientInfo(), this.inCookie);
                              // Save idToken as access token for app itself
                              this.saveAccessToken(response, authority, hashParams, clientInfo, idTokenObj);
                          }
                      }
                      else {
                          this.logger.verbose("No idToken or no nonce. Cache key for Authority set as state");
                          authorityKey = stateInfo.state;
                          acquireTokenAccountKey = stateInfo.state;
                          this.logger.error("Invalid id_token received in the response");
                          error = ClientAuthError.createInvalidIdTokenError(idTokenObj);
                          this.cacheStorage.setItem(ErrorCacheKeys.ERROR, error.errorCode);
                          this.cacheStorage.setItem(ErrorCacheKeys.ERROR_DESC, error.errorMessage);
                      }
                  }
              }
              // State mismatch - unexpected/invalid state
              else {
                  this.logger.verbose("State mismatch");
                  authorityKey = stateInfo.state;
                  acquireTokenAccountKey = stateInfo.state;
                  var expectedState = this.cacheStorage.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_LOGIN, stateInfo.state), this.inCookie);
                  this.logger.error("State Mismatch. Expected State: " + expectedState + ", Actual State: " + stateInfo.state);
                  error = ClientAuthError.createInvalidStateError(stateInfo.state, expectedState);
                  this.cacheStorage.setItem(ErrorCacheKeys.ERROR, error.errorCode);
                  this.cacheStorage.setItem(ErrorCacheKeys.ERROR_DESC, error.errorMessage);
              }
          }
          // Set status to completed
          this.cacheStorage.removeItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, stateInfo.state));
          this.cacheStorage.resetTempCacheItems(stateInfo.state);
          this.logger.verbose("Status set to complete, temporary cache cleared");
          // this is required if navigateToLoginRequestUrl=false
          if (this.inCookie) {
              this.logger.verbose("InCookie is true, setting authorityKey in cookie");
              this.cacheStorage.setItemCookie(authorityKey, "", -1);
              this.cacheStorage.clearMsalCookie(stateInfo.state);
          }
          if (error) {
              // Error case, set status to cancelled
              throw error;
          }
          if (!response) {
              throw AuthError.createUnexpectedError("Response is null");
          }
          return response;
      };
      /**
       * Set Authority when saving Token from the hash
       * @param state
       * @param inCookie
       * @param cacheStorage
       * @param idTokenObj
       * @param response
       */
      UserAgentApplication.prototype.populateAuthority = function (state, inCookie, cacheStorage, idTokenObj) {
          this.logger.verbose("PopulateAuthority has been called");
          var authorityKey = AuthCache.generateAuthorityKey(state);
          var cachedAuthority = cacheStorage.getItem(authorityKey, inCookie);
          // retrieve the authority from cache and replace with tenantID
          return StringUtils.isEmpty(cachedAuthority) ? cachedAuthority : UrlUtils.replaceTenantPath(cachedAuthority, idTokenObj.tenantId);
      };
      /* tslint:enable:no-string-literal */
      // #endregion
      // #region Account
      /**
       * Returns the signed in account
       * (the account object is created at the time of successful login)
       * or null when no state is found
       * @returns {@link Account} - the account object stored in MSAL
       */
      UserAgentApplication.prototype.getAccount = function () {
          // if a session already exists, get the account from the session
          if (this.account) {
              return this.account;
          }
          // frame is used to get idToken and populate the account for the given session
          var rawIdToken = this.cacheStorage.getItem(PersistentCacheKeys.IDTOKEN, this.inCookie);
          var rawClientInfo = this.cacheStorage.getItem(PersistentCacheKeys.CLIENT_INFO, this.inCookie);
          if (!StringUtils.isEmpty(rawIdToken) && !StringUtils.isEmpty(rawClientInfo)) {
              var idToken = new IdToken(rawIdToken);
              var clientInfo = new ClientInfo(rawClientInfo, "");
              this.account = Account.createAccount(idToken, clientInfo);
              return this.account;
          }
          // if login not yet done, return null
          return null;
      };
      /**
       * @hidden
       *
       * Extracts state value from the accountState sent with the authentication request.
       * @returns {string} scope.
       * @ignore
       */
      UserAgentApplication.prototype.getAccountState = function (state) {
          if (state) {
              var splitIndex = state.indexOf(Constants.resourceDelimiter);
              if (splitIndex > -1 && splitIndex + 1 < state.length) {
                  return state.substring(splitIndex + 1);
              }
          }
          return state;
      };
      /**
       * Use to get a list of unique accounts in MSAL cache based on homeAccountIdentifier.
       *
       * @param {@link Array<Account>} Account - all unique accounts in MSAL cache.
       */
      UserAgentApplication.prototype.getAllAccounts = function () {
          var accounts = [];
          var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(Constants.clientId, Constants.homeAccountIdentifier);
          for (var i = 0; i < accessTokenCacheItems.length; i++) {
              var idToken = new IdToken(accessTokenCacheItems[i].value.idToken);
              var clientInfo = new ClientInfo(accessTokenCacheItems[i].value.homeAccountIdentifier, "");
              var account = Account.createAccount(idToken, clientInfo);
              accounts.push(account);
          }
          return this.getUniqueAccounts(accounts);
      };
      /**
       * @hidden
       *
       * Used to filter accounts based on homeAccountIdentifier
       * @param {Array<Account>}  Accounts - accounts saved in the cache
       * @ignore
       */
      UserAgentApplication.prototype.getUniqueAccounts = function (accounts) {
          if (!accounts || accounts.length <= 1) {
              return accounts;
          }
          var flags = [];
          var uniqueAccounts = [];
          for (var index = 0; index < accounts.length; ++index) {
              if (accounts[index].homeAccountIdentifier && flags.indexOf(accounts[index].homeAccountIdentifier) === -1) {
                  flags.push(accounts[index].homeAccountIdentifier);
                  uniqueAccounts.push(accounts[index]);
              }
          }
          return uniqueAccounts;
      };
      // #endregion
      // #region Angular
      /**
       * @hidden
       *
       * Broadcast messages - Used only for Angular?  *
       * @param eventName
       * @param data
       */
      UserAgentApplication.prototype.broadcast = function (eventName, data) {
          var evt = new CustomEvent(eventName, { detail: data });
          window.dispatchEvent(evt);
      };
      /**
       * @hidden
       *
       * Helper function to retrieve the cached token
       *
       * @param scopes
       * @param {@link Account} account
       * @param state
       * @return {@link AuthResponse} AuthResponse
       */
      UserAgentApplication.prototype.getCachedTokenInternal = function (scopes, account, state, correlationId) {
          // Get the current session's account object
          var accountObject = account || this.getAccount();
          if (!accountObject) {
              return null;
          }
          // Construct AuthenticationRequest based on response type; set "redirectUri" from the "request" which makes this call from Angular - for this.getRedirectUri()
          var newAuthority = this.authorityInstance ? this.authorityInstance : AuthorityFactory.CreateInstance(this.authority, this.config.auth.validateAuthority);
          var responseType = this.getTokenType(accountObject, scopes);
          var serverAuthenticationRequest = new ServerRequestParameters(newAuthority, this.clientId, responseType, this.getRedirectUri(), scopes, state, correlationId);
          // get cached token
          return this.getCachedToken(serverAuthenticationRequest, account);
      };
      /**
       * @hidden
       *
       * Get scopes for the Endpoint - Used in Angular to track protected and unprotected resources without interaction from the developer app
       * Note: Please check if we need to set the "redirectUri" from the "request" which makes this call from Angular - for this.getRedirectUri()
       *
       * @param endpoint
       */
      UserAgentApplication.prototype.getScopesForEndpoint = function (endpoint) {
          // if user specified list of unprotectedResources, no need to send token to these endpoints, return null.
          if (this.config.framework.unprotectedResources.length > 0) {
              for (var i = 0; i < this.config.framework.unprotectedResources.length; i++) {
                  if (endpoint.indexOf(this.config.framework.unprotectedResources[i]) > -1) {
                      return null;
                  }
              }
          }
          // process all protected resources and send the matched one
          if (this.config.framework.protectedResourceMap.size > 0) {
              for (var _i = 0, _a = Array.from(this.config.framework.protectedResourceMap.keys()); _i < _a.length; _i++) {
                  var key = _a[_i];
                  // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1
                  if (endpoint.indexOf(key) > -1) {
                      return this.config.framework.protectedResourceMap.get(key);
                  }
              }
          }
          /*
           * default resource will be clientid if nothing specified
           * App will use idtoken for calls to itself
           * check if it's staring from http or https, needs to match with app host
           */
          if (endpoint.indexOf("http://") > -1 || endpoint.indexOf("https://") > -1) {
              if (UrlUtils.getHostFromUri(endpoint) === UrlUtils.getHostFromUri(this.getRedirectUri())) {
                  return new Array(this.clientId);
              }
          }
          else {
              /*
               * in angular level, the url for $http interceptor call could be relative url,
               * if it's relative call, we'll treat it as app backend call.
               */
              return new Array(this.clientId);
          }
          // if not the app's own backend or not a domain listed in the endpoints structure
          return null;
      };
      /**
       * Return boolean flag to developer to help inform if login is in progress
       * @returns {boolean} true/false
       */
      UserAgentApplication.prototype.getLoginInProgress = function () {
          return this.cacheStorage.getItem(TemporaryCacheKeys.INTERACTION_STATUS) === Constants.inProgress;
      };
      /**
       * @hidden
       * @ignore
       *
       * @param loginInProgress
       */
      UserAgentApplication.prototype.setInteractionInProgress = function (inProgress) {
          if (inProgress) {
              this.cacheStorage.setItem(TemporaryCacheKeys.INTERACTION_STATUS, Constants.inProgress);
          }
          else {
              this.cacheStorage.removeItem(TemporaryCacheKeys.INTERACTION_STATUS);
          }
      };
      /**
       * @hidden
       * @ignore
       *
       * @param loginInProgress
       */
      UserAgentApplication.prototype.setloginInProgress = function (loginInProgress) {
          this.setInteractionInProgress(loginInProgress);
      };
      /**
       * @hidden
       * @ignore
       *
       * returns the status of acquireTokenInProgress
       */
      UserAgentApplication.prototype.getAcquireTokenInProgress = function () {
          return this.cacheStorage.getItem(TemporaryCacheKeys.INTERACTION_STATUS) === Constants.inProgress;
      };
      /**
       * @hidden
       * @ignore
       *
       * @param acquireTokenInProgress
       */
      UserAgentApplication.prototype.setAcquireTokenInProgress = function (acquireTokenInProgress) {
          this.setInteractionInProgress(acquireTokenInProgress);
      };
      /**
       * @hidden
       * @ignore
       *
       * returns the logger handle
       */
      UserAgentApplication.prototype.getLogger = function () {
          return this.logger;
      };
      /**
       * Sets the logger callback.
       * @param logger Logger callback
       */
      UserAgentApplication.prototype.setLogger = function (logger) {
          this.logger = logger;
      };
      // #endregion
      // #region Getters and Setters
      /**
       * Use to get the redirect uri configured in MSAL or null.
       * Evaluates redirectUri if its a function, otherwise simply returns its value.
       *
       * @returns {string} redirect URL
       */
      UserAgentApplication.prototype.getRedirectUri = function (reqRedirectUri) {
          if (reqRedirectUri) {
              return reqRedirectUri;
          }
          else if (typeof this.config.auth.redirectUri === "function") {
              return this.config.auth.redirectUri();
          }
          return this.config.auth.redirectUri;
      };
      /**
       * Use to get the post logout redirect uri configured in MSAL or null.
       * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
       *
       * @returns {string} post logout redirect URL
       */
      UserAgentApplication.prototype.getPostLogoutRedirectUri = function () {
          if (typeof this.config.auth.postLogoutRedirectUri === "function") {
              return this.config.auth.postLogoutRedirectUri();
          }
          return this.config.auth.postLogoutRedirectUri;
      };
      /**
       * Use to get the current {@link Configuration} object in MSAL
       *
       * @returns {@link Configuration}
       */
      UserAgentApplication.prototype.getCurrentConfiguration = function () {
          if (!this.config) {
              throw ClientConfigurationError.createNoSetConfigurationError();
          }
          return this.config;
      };
      /**
       * @ignore
       *
       * Utils function to create the Authentication
       * @param {@link account} account object
       * @param scopes
       *
       * @returns {string} token type: token, id_token or id_token token
       *
       */
      UserAgentApplication.prototype.getTokenType = function (accountObject, scopes) {
          var accountsMatch = Account.compareAccounts(accountObject, this.getAccount());
          return ServerRequestParameters.determineResponseType(accountsMatch, scopes);
      };
      /**
       * @hidden
       * @ignore
       *
       * Sets the cachekeys for and stores the account information in cache
       * @param account
       * @param state
       * @hidden
       */
      UserAgentApplication.prototype.setAccountCache = function (account, state) {
          // Cache acquireTokenAccountKey
          var accountId = account ? this.getAccountId(account) : Constants.no_account;
          var acquireTokenAccountKey = AuthCache.generateAcquireTokenAccountKey(accountId, state);
          this.cacheStorage.setItem(acquireTokenAccountKey, JSON.stringify(account));
      };
      /**
       * @hidden
       * @ignore
       *
       * Sets the cacheKey for and stores the authority information in cache
       * @param state
       * @param authority
       * @hidden
       */
      UserAgentApplication.prototype.setAuthorityCache = function (state, authority) {
          // Cache authorityKey
          var authorityKey = AuthCache.generateAuthorityKey(state);
          this.cacheStorage.setItem(authorityKey, UrlUtils.CanonicalizeUri(authority), this.inCookie);
      };
      /**
       * Updates account, authority, and nonce in cache
       * @param serverAuthenticationRequest
       * @param account
       * @hidden
       * @ignore
       */
      UserAgentApplication.prototype.updateCacheEntries = function (serverAuthenticationRequest, account, isLoginCall, loginStartPage) {
          // Cache Request Originator Page
          if (loginStartPage) {
              this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.LOGIN_REQUEST, serverAuthenticationRequest.state), loginStartPage, this.inCookie);
          }
          // Cache account and authority
          if (isLoginCall) {
              // Cache the state
              this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_LOGIN, serverAuthenticationRequest.state), serverAuthenticationRequest.state, this.inCookie);
          }
          else {
              this.setAccountCache(account, serverAuthenticationRequest.state);
          }
          // Cache authorityKey
          this.setAuthorityCache(serverAuthenticationRequest.state, serverAuthenticationRequest.authority);
          // Cache nonce
          this.cacheStorage.setItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.NONCE_IDTOKEN, serverAuthenticationRequest.state), serverAuthenticationRequest.nonce, this.inCookie);
      };
      /**
       * Returns the unique identifier for the logged in account
       * @param account
       * @hidden
       * @ignore
       */
      UserAgentApplication.prototype.getAccountId = function (account) {
          // return `${account.accountIdentifier}` + Constants.resourceDelimiter + `${account.homeAccountIdentifier}`;
          var accountId;
          if (!StringUtils.isEmpty(account.homeAccountIdentifier)) {
              accountId = account.homeAccountIdentifier;
          }
          else {
              accountId = Constants.no_account;
          }
          return accountId;
      };
      /**
       * @ignore
       * @param extraQueryParameters
       *
       * Construct 'tokenRequest' from the available data in adalIdToken
       */
      UserAgentApplication.prototype.buildIDTokenRequest = function (request) {
          var tokenRequest = {
              scopes: Constants.oidcScopes,
              authority: this.authority,
              account: this.getAccount(),
              extraQueryParameters: request.extraQueryParameters,
              correlationId: request.correlationId
          };
          return tokenRequest;
      };
      /**
       * @ignore
       * @param config
       * @param clientId
       *
       * Construct TelemetryManager from Configuration
       */
      UserAgentApplication.prototype.getTelemetryManagerFromConfig = function (config, clientId) {
          if (!config) { // if unset
              return TelemetryManager.getTelemetrymanagerStub(clientId, this.logger);
          }
          // if set then validate
          var applicationName = config.applicationName, applicationVersion = config.applicationVersion, telemetryEmitter = config.telemetryEmitter;
          if (!applicationName || !applicationVersion || !telemetryEmitter) {
              throw ClientConfigurationError.createTelemetryConfigError(config);
          }
          // if valid then construct
          var telemetryPlatform = {
              applicationName: applicationName,
              applicationVersion: applicationVersion
          };
          var telemetryManagerConfig = {
              platform: telemetryPlatform,
              clientId: clientId
          };
          return new TelemetryManager(telemetryManagerConfig, telemetryEmitter, this.logger);
      };
      return UserAgentApplication;
  }());

  class AccessToken {
      constructor(accessToken, scopes, expiresOn) {
          AccessToken.accessToken = accessToken;
          AccessToken.scopes = scopes;
          AccessToken.expiresOn = expiresOn;
      }
      static getInstance(accessToken, scopes, expiresOn) {
          if (!AccessToken.instance) {
              AccessToken.instance = new AccessToken(accessToken, scopes, expiresOn);
          }
          return AccessToken.instance;
      }
  }
  /**
   * Method to get the access_token
   * The library MSAL is used for getting the access token that is reused in Tock application
   */
  function getAccessToken() {
      const msalConfig = {
          auth: {
              clientId: '2b6cda05-d3eb-43a9-a6c3-3a8e349ab772',
          },
      };
      const loginRequest = {
          scopes: ['user.read', 'mail.send', 'Calendars.ReadWrite'],
      };
      const msalInstance = new UserAgentApplication(msalConfig);
      // if the user is already logged in acquire a token
      if (msalInstance.getAccount()) {
          if (AccessToken.expiresOn > new Date()) {
              refreshToken();
          }
          msalInstance
              .acquireTokenSilent(loginRequest)
              .then((response) => {
              AccessToken.getInstance(response.accessToken, response.scopes, response.expiresOn);
          })
              .catch((err) => {
              // could also check if err instance of InteractionRequiredAuthError if you can import the class.
              if (err.name === 'InteractionRequiredAuthError') {
                  return msalInstance
                      .acquireTokenPopup(loginRequest)
                      .then((response) => {
                      console.log(response);
                  })
                      .catch((err) => {
                      console.log(err);
                  });
              }
              else {
                  return console.log(err);
              }
          });
      }
      else {
          // if the user is not logged set the scopes and open a popup
          msalInstance
              .loginPopup(loginRequest)
              .then((response) => {
              console.log(response);
          })
              .catch((err) => {
              console.log(err);
              // TODO If user ClientAuthError: User cancelled the flow.
              // TODO If user authentication failed.
          });
      }
      function refreshToken() {
          msalInstance
              .acquireTokenSilent(loginRequest)
              .then((response) => {
              AccessToken.getInstance(response.accessToken, response.scopes, response.expiresOn);
          });
      }
  }

  function mapButton(button) {
      if (button.type === 'web_url') {
          return new UrlButton(button.title, button.url);
      }
      else if (button.type === 'postback') {
          return new PostBackButton(button.title, button.payload);
      }
      else if (button.type === 'quick_reply') {
          return new QuickReply(button.title, button.payload);
      }
      else if (button.type === 'graph_sign_in') {
          return new UrlButtonGraphSignIn(button.title, button.url);
      }
      else {
          return new UrlButton(button.title, button.url);
      }
  }
  function mapCard(card) {
      return {
          title: card.title,
          subTitle: card.subTitle,
          imageUrl: card.file ? card.file.url : null,
          buttons: card.buttons.map((button) => mapButton(button)),
          type: 'card',
      };
  }
  function mapCalendarGraphCard(calendarGraphCard) {
      return {
          subject: calendarGraphCard.subject,
          bodyPreview: calendarGraphCard.bodyPreview,
          organizer: calendarGraphCard.bodyPreview,
          start: calendarGraphCard.start,
          end: calendarGraphCard.end,
          location: calendarGraphCard.location,
          type: 'calendarGraphCard',
      };
  }
  const useTock = (tockEndPoint) => {
      const { messages, quickReplies, userId, loading, sseInitializing, } = useTockState();
      const dispatch = useTockDispatch();
      const startLoading = () => {
          dispatch({
              type: 'SET_LOADING',
              loading: true,
          });
      };
      const stopLoading = () => {
          dispatch({
              type: 'SET_LOADING',
              loading: false,
          });
      };
      const handleBotResponse = ({ responses, }) => {
          // Debug
          if (Array.isArray(responses) && responses.length > 0) {
              const lastMessage = responses[responses.length - 1];
              if (lastMessage.buttons && lastMessage.buttons.length > 0) {
                  dispatch({
                      type: 'SET_QUICKREPLIES',
                      quickReplies: (lastMessage.buttons || [])
                          .filter((button) => button.type === 'quick_reply')
                          .map(mapButton),
                  });
              }
              else {
                  dispatch({
                      type: 'SET_QUICKREPLIES',
                      quickReplies: [],
                  });
              }
              dispatch({
                  type: 'ADD_MESSAGE',
                  messages: responses.map(({ text, card, calendarGraphCard, carousel, widget }) => {
                      if (widget) {
                          return {
                              widgetData: widget,
                              type: 'widget',
                          };
                      }
                      else if (text) {
                          return {
                              author: 'bot',
                              message: text,
                              type: 'message',
                              buttons: (lastMessage.buttons || [])
                                  .filter((button) => button.type !== 'quick_reply')
                                  .map(mapButton),
                          };
                      }
                      else if (card) {
                          return mapCard(card);
                      }
                      else if (calendarGraphCard) {
                          return mapCalendarGraphCard(calendarGraphCard);
                      }
                      else {
                          if (carousel.cards[0].subject != null) {
                              return {
                                  cards: carousel.cards.map(mapCalendarGraphCard),
                                  type: 'carousel',
                              };
                          }
                          else {
                              return {
                                  cards: carousel.cards.map(mapCard),
                                  type: 'carousel',
                              };
                          }
                      }
                  }),
              });
          }
      };
      const handleBotResponseIfSseDisabled = (botResponse) => {
          if (!Sse.isEnable()) {
              handleBotResponse(botResponse);
          }
      };
      const addMessage = React.useCallback((message, author, buttons) => dispatch({
          type: 'ADD_MESSAGE',
          messages: [{ author, message, type: 'message', buttons }],
      }), []);
      getAccessToken();
      const sendMessage = React.useCallback((message, payload) => {
          dispatch({
              type: 'ADD_MESSAGE',
              messages: [{ author: 'user', message, type: 'message' }],
          });
          startLoading();
          const body = payload
              ? {
                  payload,
                  userId,
              }
              : {
                  query: message,
                  userId,
                  code: AccessToken.accessToken,
              };
          return fetch(tockEndPoint, {
              body: JSON.stringify(body),
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
              .then((res) => res.json())
              .then(handleBotResponseIfSseDisabled)
              .finally(stopLoading);
      }, []);
      const sendReferralParameter = React.useCallback((referralParameter) => {
          startLoading();
          fetch(tockEndPoint, {
              body: JSON.stringify({
                  ref: referralParameter,
                  userId,
              }),
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
              .then((res) => res.json())
              .then(handleBotResponseIfSseDisabled)
              .finally(stopLoading);
      }, []);
      const sendQuickReply = (label, payload) => {
          if (payload) {
              setQuickReplies([]);
              addMessage(label, 'user');
              startLoading();
              return fetch(tockEndPoint, {
                  body: JSON.stringify({
                      payload,
                      userId,
                  }),
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              })
                  .then((res) => res.json())
                  .then(handleBotResponseIfSseDisabled)
                  .finally(stopLoading);
          }
          else {
              return sendMessage(label);
          }
      };
      const sendAction = (button) => {
          if (button instanceof UrlButton) {
              window.open(button.url, '_blank');
          }
          else if (button instanceof UrlButtonGraphSignIn) {
              // Open little window popup for user registration
              getAccessToken();
          }
          else {
              return sendMessage(button.label, button.payload);
          }
          return Promise.resolve();
      };
      const addCard = React.useCallback((title, imageUrl, subTitle, buttons) => dispatch({
          type: 'ADD_MESSAGE',
          messages: [
              {
                  title,
                  imageUrl,
                  subTitle,
                  buttons,
                  type: 'card',
              },
          ],
      }), []);
      const addCalendarGraphCard = React.useCallback((subject, bodyPreview, start, end, location) => dispatch({
          type: 'ADD_MESSAGE',
          messages: [
              {
                  subject,
                  bodyPreview,
                  start,
                  end,
                  location,
                  type: 'calendarGraphCard',
              },
          ],
      }), []);
      const addCarousel = React.useCallback((cards) => dispatch({
          type: 'ADD_MESSAGE',
          messages: [
              {
                  type: 'carousel',
                  cards,
              },
          ],
      }), []);
      const addWidget = React.useCallback((widgetData) => dispatch({
          type: 'ADD_MESSAGE',
          messages: [
              {
                  type: 'widget',
                  widgetData,
              },
          ],
      }), []);
      const setQuickReplies = React.useCallback((quickReplies) => dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies,
      }), []);
      const onSseStateChange = React.useCallback((state) => dispatch({
          type: 'SET_SSE_INITIALIZING',
          sseInitializing: state === EventSource.CONNECTING,
      }), []);
      const sseInitPromise = Sse.init(tockEndPoint, userId, handleBotResponse, onSseStateChange);
      return {
          messages,
          quickReplies,
          loading,
          addCard,
          addCalendarGraphCard,
          addCarousel,
          addMessage,
          addWidget,
          sendMessage,
          setQuickReplies,
          sendQuickReply,
          sendAction,
          sendReferralParameter,
          sseInitPromise,
          sseInitializing,
      };
  };

  const InputOuterContainer = newStyled.form `
  max-width: ${prop('theme.sizing.conversation.width')};
  width: 100%;
  position: relative;
  margin: 0.5em auto;
  display: flex;
  align-items: center;
  ${prop('theme.overrides.chatInput.container', '')}
`;
  const Input = newStyled.input `
  width: 100%;
  flex: 1;

  background: ${prop('theme.palette.background.input')};
  color: ${prop('theme.palette.text.input')};

  border: none;
  outline: none;

  font-family: inherit;
  font-size: inherit;

  &.disabled-input {
    background: ${prop('theme.palette.background.inputDisabled')};
  }

  ${prop('theme.overrides.chatInput.input', '')}
`;
  const Icon = newStyled.button `
  background: none;
  border: none;
  border-radius: 50%;
  right: 5px;
  flex: 0;
  cursor: pointer;

  & svg {
    stroke: ${prop('theme.palette.background.bot')};
    fill: ${prop('theme.palette.text.bot')};
  }

  & > svg {
    position: relative;
    top: 3px;
    right: 2px;

    &:hover,
    &:focus {
      stroke: ${prop('theme.palette.text.bot')};
      fill: ${prop('theme.palette.background.bot')};
    }
  }
  ${prop('theme.overrides.chatInput.icon', '')}
`;
  const ChatInput = ({ disabled, onSubmit, }) => {
      const [value, setValue] = React.useState('');
      const theme = useTheme();
      const submit = (event) => {
          event.preventDefault();
          if (value) {
              onSubmit(value);
              setValue('');
          }
      };
      return (React__default.createElement(InputOuterContainer, { onSubmit: submit },
          React__default.createElement(Input, { disabled: disabled, className: disabled ? 'disabled-input' : undefined, value: value, onChange: ({ target: { value } }) => setValue(value) }),
          React__default.createElement(Icon, null,
              React__default.createElement(Send, { size: `calc(${theme.typography.fontSize} * 1.5)` }))));
  };

  const ConversationContainer = newStyled.div `
  scroll-behavior: smooth;
  height: 100%;
  font-size: 16px;
`;
  const Conversation = (props) => {
      const container = React.useRef(null);
      const { children } = props, restProps = __rest(props, ["children"]);
      return (React__default.createElement(ConversationContainer, Object.assign({ ref: container }, restProps), children));
  };

  var html5NamedCharRefs = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var HTML5NamedCharRefs = {
      // We don't need the complete named character reference because linkifyHtml
      // does not modify the escape sequences. We do need &nbsp; so that
      // whitespace is parsed properly. Other types of whitespace should already
      // be accounted for
      nbsp: "\xA0"
  };
  exports.default = HTML5NamedCharRefs;
  });

  unwrapExports(html5NamedCharRefs);

  var entityParser = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  function EntityParser(named) {
    this.named = named;
  }

  var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
  var CHARCODE = /^#([0-9]+)$/;
  var NAMED = /^([A-Za-z0-9]+)$/;

  EntityParser.prototype.parse = function (entity) {
    if (!entity) {
      return;
    }
    var matches = entity.match(HEXCHARCODE);
    if (matches) {
      return "&#x" + matches[1] + ";";
    }
    matches = entity.match(CHARCODE);
    if (matches) {
      return "&#" + matches[1] + ";";
    }
    matches = entity.match(NAMED);
    if (matches) {
      return this.named[matches[1]] || "&" + matches[1] + ";";
    }
  };

  exports.default = EntityParser;
  });

  unwrapExports(entityParser);

  var utils = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.isSpace = isSpace;
  exports.isAlpha = isAlpha;
  exports.preprocessInput = preprocessInput;
  var WSP = /[\t\n\f ]/;
  var ALPHA = /[A-Za-z]/;
  var CRLF = /\r\n?/g;

  function isSpace(char) {
    return WSP.test(char);
  }

  function isAlpha(char) {
    return ALPHA.test(char);
  }

  function preprocessInput(input) {
    return input.replace(CRLF, "\n");
  }
  });

  unwrapExports(utils);
  var utils_1 = utils.isSpace;
  var utils_2 = utils.isAlpha;
  var utils_3 = utils.preprocessInput;

  var eventedTokenizer = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  function EventedTokenizer(delegate, entityParser) {
    this.delegate = delegate;
    this.entityParser = entityParser;

    this.state = null;
    this.input = null;

    this.index = -1;
    this.line = -1;
    this.column = -1;
    this.tagLine = -1;
    this.tagColumn = -1;

    this.reset();
  }

  EventedTokenizer.prototype = {
    reset: function reset() {
      this.state = 'beforeData';
      this.input = '';

      this.index = 0;
      this.line = 1;
      this.column = 0;

      this.tagLine = -1;
      this.tagColumn = -1;

      this.delegate.reset();
    },

    tokenize: function tokenize(input) {
      this.reset();
      this.tokenizePart(input);
      this.tokenizeEOF();
    },

    tokenizePart: function tokenizePart(input) {
      this.input += (0, utils.preprocessInput)(input);

      while (this.index < this.input.length) {
        this.states[this.state].call(this);
      }
    },

    tokenizeEOF: function tokenizeEOF() {
      this.flushData();
    },

    flushData: function flushData() {
      if (this.state === 'data') {
        this.delegate.finishData();
        this.state = 'beforeData';
      }
    },

    peek: function peek() {
      return this.input.charAt(this.index);
    },

    consume: function consume() {
      var char = this.peek();

      this.index++;

      if (char === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }

      return char;
    },

    consumeCharRef: function consumeCharRef() {
      var endIndex = this.input.indexOf(';', this.index);
      if (endIndex === -1) {
        return;
      }
      var entity = this.input.slice(this.index, endIndex);
      var chars = this.entityParser.parse(entity);
      if (chars) {
        var count = entity.length;
        // consume the entity chars
        while (count) {
          this.consume();
          count--;
        }
        // consume the `;`
        this.consume();

        return chars;
      }
    },

    markTagStart: function markTagStart() {
      // these properties to be removed in next major bump
      this.tagLine = this.line;
      this.tagColumn = this.column;

      if (this.delegate.tagOpen) {
        this.delegate.tagOpen();
      }
    },

    states: {
      beforeData: function beforeData() {
        var char = this.peek();

        if (char === "<") {
          this.state = 'tagOpen';
          this.markTagStart();
          this.consume();
        } else {
          this.state = 'data';
          this.delegate.beginData();
        }
      },

      data: function data() {
        var char = this.peek();

        if (char === "<") {
          this.delegate.finishData();
          this.state = 'tagOpen';
          this.markTagStart();
          this.consume();
        } else if (char === "&") {
          this.consume();
          this.delegate.appendToData(this.consumeCharRef() || "&");
        } else {
          this.consume();
          this.delegate.appendToData(char);
        }
      },

      tagOpen: function tagOpen() {
        var char = this.consume();

        if (char === "!") {
          this.state = 'markupDeclaration';
        } else if (char === "/") {
          this.state = 'endTagOpen';
        } else if ((0, utils.isAlpha)(char)) {
          this.state = 'tagName';
          this.delegate.beginStartTag();
          this.delegate.appendToTagName(char.toLowerCase());
        }
      },

      markupDeclaration: function markupDeclaration() {
        var char = this.consume();

        if (char === "-" && this.input.charAt(this.index) === "-") {
          this.consume();
          this.state = 'commentStart';
          this.delegate.beginComment();
        }
      },

      commentStart: function commentStart() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentStartDash';
        } else if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData(char);
          this.state = 'comment';
        }
      },

      commentStartDash: function commentStartDash() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEnd';
        } else if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData("-");
          this.state = 'comment';
        }
      },

      comment: function comment() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEndDash';
        } else {
          this.delegate.appendToCommentData(char);
        }
      },

      commentEndDash: function commentEndDash() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEnd';
        } else {
          this.delegate.appendToCommentData("-" + char);
          this.state = 'comment';
        }
      },

      commentEnd: function commentEnd() {
        var char = this.consume();

        if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData("--" + char);
          this.state = 'comment';
        }
      },

      tagName: function tagName() {
        var char = this.consume();

        if ((0, utils.isSpace)(char)) {
          this.state = 'beforeAttributeName';
        } else if (char === "/") {
          this.state = 'selfClosingStartTag';
        } else if (char === ">") {
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToTagName(char);
        }
      },

      beforeAttributeName: function beforeAttributeName() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.consume();
          return;
        } else if (char === "/") {
          this.state = 'selfClosingStartTag';
          this.consume();
        } else if (char === ">") {
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'attributeName';
          this.delegate.beginAttribute();
          this.consume();
          this.delegate.appendToAttributeName(char);
        }
      },

      attributeName: function attributeName() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.state = 'afterAttributeName';
          this.consume();
        } else if (char === "/") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === "=") {
          this.state = 'beforeAttributeValue';
          this.consume();
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.consume();
          this.delegate.appendToAttributeName(char);
        }
      },

      afterAttributeName: function afterAttributeName() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.consume();
          return;
        } else if (char === "/") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === "=") {
          this.consume();
          this.state = 'beforeAttributeValue';
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'attributeName';
          this.delegate.beginAttribute();
          this.delegate.appendToAttributeName(char);
        }
      },

      beforeAttributeValue: function beforeAttributeValue() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.consume();
        } else if (char === '"') {
          this.state = 'attributeValueDoubleQuoted';
          this.delegate.beginAttributeValue(true);
          this.consume();
        } else if (char === "'") {
          this.state = 'attributeValueSingleQuoted';
          this.delegate.beginAttributeValue(true);
          this.consume();
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'attributeValueUnquoted';
          this.delegate.beginAttributeValue(false);
          this.consume();
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
        var char = this.consume();

        if (char === '"') {
          this.delegate.finishAttributeValue();
          this.state = 'afterAttributeValueQuoted';
        } else if (char === "&") {
          this.delegate.appendToAttributeValue(this.consumeCharRef('"') || "&");
        } else {
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueSingleQuoted: function attributeValueSingleQuoted() {
        var char = this.consume();

        if (char === "'") {
          this.delegate.finishAttributeValue();
          this.state = 'afterAttributeValueQuoted';
        } else if (char === "&") {
          this.delegate.appendToAttributeValue(this.consumeCharRef("'") || "&");
        } else {
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueUnquoted: function attributeValueUnquoted() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'beforeAttributeName';
        } else if (char === "&") {
          this.consume();
          this.delegate.appendToAttributeValue(this.consumeCharRef(">") || "&");
        } else if (char === ">") {
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.consume();
          this.delegate.appendToAttributeValue(char);
        }
      },

      afterAttributeValueQuoted: function afterAttributeValueQuoted() {
        var char = this.peek();

        if ((0, utils.isSpace)(char)) {
          this.consume();
          this.state = 'beforeAttributeName';
        } else if (char === "/") {
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === ">") {
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'beforeAttributeName';
        }
      },

      selfClosingStartTag: function selfClosingStartTag() {
        var char = this.peek();

        if (char === ">") {
          this.consume();
          this.delegate.markTagAsSelfClosing();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'beforeAttributeName';
        }
      },

      endTagOpen: function endTagOpen() {
        var char = this.consume();

        if ((0, utils.isAlpha)(char)) {
          this.state = 'tagName';
          this.delegate.beginEndTag();
          this.delegate.appendToTagName(char.toLowerCase());
        }
      }
    }
  };

  exports.default = EventedTokenizer;
  });

  unwrapExports(eventedTokenizer);

  var tokenizer = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _eventedTokenizer2 = _interopRequireDefault(eventedTokenizer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function Tokenizer(entityParser, options) {
    this.token = null;
    this.startLine = 1;
    this.startColumn = 0;
    this.options = options || {};
    this.tokenizer = new _eventedTokenizer2.default(this, entityParser);
  }

  Tokenizer.prototype = {
    tokenize: function tokenize(input) {
      this.tokens = [];
      this.tokenizer.tokenize(input);
      return this.tokens;
    },

    tokenizePart: function tokenizePart(input) {
      this.tokens = [];
      this.tokenizer.tokenizePart(input);
      return this.tokens;
    },

    tokenizeEOF: function tokenizeEOF() {
      this.tokens = [];
      this.tokenizer.tokenizeEOF();
      return this.tokens[0];
    },

    reset: function reset() {
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
    },

    addLocInfo: function addLocInfo() {
      if (this.options.loc) {
        this.token.loc = {
          start: {
            line: this.startLine,
            column: this.startColumn
          },
          end: {
            line: this.tokenizer.line,
            column: this.tokenizer.column
          }
        };
      }
      this.startLine = this.tokenizer.line;
      this.startColumn = this.tokenizer.column;
    },

    // Data

    beginData: function beginData() {
      this.token = {
        type: 'Chars',
        chars: ''
      };
      this.tokens.push(this.token);
    },

    appendToData: function appendToData(char) {
      this.token.chars += char;
    },

    finishData: function finishData() {
      this.addLocInfo();
    },

    // Comment

    beginComment: function beginComment() {
      this.token = {
        type: 'Comment',
        chars: ''
      };
      this.tokens.push(this.token);
    },

    appendToCommentData: function appendToCommentData(char) {
      this.token.chars += char;
    },

    finishComment: function finishComment() {
      this.addLocInfo();
    },

    // Tags - basic

    beginStartTag: function beginStartTag() {
      this.token = {
        type: 'StartTag',
        tagName: '',
        attributes: [],
        selfClosing: false
      };
      this.tokens.push(this.token);
    },

    beginEndTag: function beginEndTag() {
      this.token = {
        type: 'EndTag',
        tagName: ''
      };
      this.tokens.push(this.token);
    },

    finishTag: function finishTag() {
      this.addLocInfo();
    },

    markTagAsSelfClosing: function markTagAsSelfClosing() {
      this.token.selfClosing = true;
    },

    // Tags - name

    appendToTagName: function appendToTagName(char) {
      this.token.tagName += char;
    },

    // Tags - attributes

    beginAttribute: function beginAttribute() {
      this._currentAttribute = ["", "", null];
      this.token.attributes.push(this._currentAttribute);
    },

    appendToAttributeName: function appendToAttributeName(char) {
      this._currentAttribute[0] += char;
    },

    beginAttributeValue: function beginAttributeValue(isQuoted) {
      this._currentAttribute[2] = isQuoted;
    },

    appendToAttributeValue: function appendToAttributeValue(char) {
      this._currentAttribute[1] = this._currentAttribute[1] || "";
      this._currentAttribute[1] += char;
    },

    finishAttributeValue: function finishAttributeValue() {}
  };

  exports.default = Tokenizer;
  });

  unwrapExports(tokenizer);

  var tokenize_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.default = tokenize;



  var _tokenizer2 = _interopRequireDefault(tokenizer);



  var _entityParser2 = _interopRequireDefault(entityParser);



  var _html5NamedCharRefs2 = _interopRequireDefault(html5NamedCharRefs);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function tokenize(input, options) {
    var tokenizer = new _tokenizer2.default(new _entityParser2.default(_html5NamedCharRefs2.default), options);
    return tokenizer.tokenize(input);
  }
  });

  unwrapExports(tokenize_1);

  var simpleHtmlTokenizer = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _html5NamedCharRefs2 = _interopRequireDefault(html5NamedCharRefs);



  var _entityParser2 = _interopRequireDefault(entityParser);



  var _eventedTokenizer2 = _interopRequireDefault(eventedTokenizer);



  var _tokenizer2 = _interopRequireDefault(tokenizer);



  var _tokenize2 = _interopRequireDefault(tokenize_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var HTML5Tokenizer = {
  	HTML5NamedCharRefs: _html5NamedCharRefs2.default,
  	EntityParser: _entityParser2.default,
  	EventedTokenizer: _eventedTokenizer2.default,
  	Tokenizer: _tokenizer2.default,
  	tokenize: _tokenize2.default
  };

  exports.default = HTML5Tokenizer;
  });

  unwrapExports(simpleHtmlTokenizer);

  var _class = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.inherits = inherits;
  function inherits(parent, child) {
  	var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  	var extended = Object.create(parent.prototype);
  	for (var p in props) {
  		extended[p] = props[p];
  	}
  	extended.constructor = child;
  	child.prototype = extended;
  	return child;
  }
  });

  unwrapExports(_class);
  var _class_1 = _class.inherits;

  var options = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var defaults = {
  	defaultProtocol: 'http',
  	events: null,
  	format: noop,
  	formatHref: noop,
  	nl2br: false,
  	tagName: 'a',
  	target: typeToTarget,
  	validate: true,
  	ignoreTags: [],
  	attributes: null,
  	className: 'linkified' // Deprecated value - no default class will be provided in the future
  };

  exports.defaults = defaults;
  exports.Options = Options;
  exports.contains = contains;


  function Options(opts) {
  	opts = opts || {};

  	this.defaultProtocol = opts.hasOwnProperty('defaultProtocol') ? opts.defaultProtocol : defaults.defaultProtocol;
  	this.events = opts.hasOwnProperty('events') ? opts.events : defaults.events;
  	this.format = opts.hasOwnProperty('format') ? opts.format : defaults.format;
  	this.formatHref = opts.hasOwnProperty('formatHref') ? opts.formatHref : defaults.formatHref;
  	this.nl2br = opts.hasOwnProperty('nl2br') ? opts.nl2br : defaults.nl2br;
  	this.tagName = opts.hasOwnProperty('tagName') ? opts.tagName : defaults.tagName;
  	this.target = opts.hasOwnProperty('target') ? opts.target : defaults.target;
  	this.validate = opts.hasOwnProperty('validate') ? opts.validate : defaults.validate;
  	this.ignoreTags = [];

  	// linkAttributes and linkClass is deprecated
  	this.attributes = opts.attributes || opts.linkAttributes || defaults.attributes;
  	this.className = opts.hasOwnProperty('className') ? opts.className : opts.linkClass || defaults.className;

  	// Make all tags names upper case
  	var ignoredTags = opts.hasOwnProperty('ignoreTags') ? opts.ignoreTags : defaults.ignoreTags;
  	for (var i = 0; i < ignoredTags.length; i++) {
  		this.ignoreTags.push(ignoredTags[i].toUpperCase());
  	}
  }

  Options.prototype = {
  	/**
    * Given the token, return all options for how it should be displayed
    */
  	resolve: function resolve(token) {
  		var href = token.toHref(this.defaultProtocol);
  		return {
  			formatted: this.get('format', token.toString(), token),
  			formattedHref: this.get('formatHref', href, token),
  			tagName: this.get('tagName', href, token),
  			className: this.get('className', href, token),
  			target: this.get('target', href, token),
  			events: this.getObject('events', href, token),
  			attributes: this.getObject('attributes', href, token)
  		};
  	},


  	/**
    * Returns true or false based on whether a token should be displayed as a
    * link based on the user options. By default,
    */
  	check: function check(token) {
  		return this.get('validate', token.toString(), token);
  	},


  	// Private methods

  	/**
    * Resolve an option's value based on the value of the option and the given
    * params.
    * @param {String} key Name of option to use
    * @param operator will be passed to the target option if it's method
    * @param {MultiToken} token The token from linkify.tokenize
    */
  	get: function get(key, operator, token) {
  		var optionValue = void 0,
  		    option = this[key];
  		if (!option) {
  			return option;
  		}

  		switch (typeof option === 'undefined' ? 'undefined' : _typeof(option)) {
  			case 'function':
  				return option(operator, token.type);
  			case 'object':
  				optionValue = option.hasOwnProperty(token.type) ? option[token.type] : defaults[key];
  				return typeof optionValue === 'function' ? optionValue(operator, token.type) : optionValue;
  		}

  		return option;
  	},
  	getObject: function getObject(key, operator, token) {
  		var option = this[key];
  		return typeof option === 'function' ? option(operator, token.type) : option;
  	}
  };

  /**
   * Quick indexOf replacement for checking the ignoreTags option
   */
  function contains(arr, value) {
  	for (var i = 0; i < arr.length; i++) {
  		if (arr[i] === value) {
  			return true;
  		}
  	}
  	return false;
  }

  function noop(val) {
  	return val;
  }

  function typeToTarget(href, type) {
  	return type === 'url' ? '_blank' : null;
  }
  });

  unwrapExports(options);
  var options_1 = options.defaults;
  var options_2 = options.Options;
  var options_3 = options.contains;

  var state = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.stateify = exports.TokenState = exports.CharacterState = undefined;



  function createStateClass() {
  	return function (tClass) {
  		this.j = [];
  		this.T = tClass || null;
  	};
  }

  /**
  	A simple state machine that can emit token classes

  	The `j` property in this class refers to state jumps. It's a
  	multidimensional array where for each element:

  	* index [0] is a symbol or class of symbols to transition to.
  	* index [1] is a State instance which matches

  	The type of symbol will depend on the target implementation for this class.
  	In Linkify, we have a two-stage scanner. Each stage uses this state machine
  	but with a slighly different (polymorphic) implementation.

  	The `T` property refers to the token class.

  	TODO: Can the `on` and `next` methods be combined?

  	@class BaseState
  */
  var BaseState = createStateClass();
  BaseState.prototype = {
  	defaultTransition: false,

  	/**
   	@method constructor
   	@param {Class} tClass Pass in the kind of token to emit if there are
   		no jumps after this state and the state is accepting.
   */

  	/**
   	On the given symbol(s), this machine should go to the given state
   		@method on
   	@param {Array|Mixed} symbol
   	@param {BaseState} state Note that the type of this state should be the
   		same as the current instance (i.e., don't pass in a different
   		subclass)
   */
  	on: function on(symbol, state) {
  		if (symbol instanceof Array) {
  			for (var i = 0; i < symbol.length; i++) {
  				this.j.push([symbol[i], state]);
  			}
  			return this;
  		}
  		this.j.push([symbol, state]);
  		return this;
  	},


  	/**
   	Given the next item, returns next state for that item
   	@method next
   	@param {Mixed} item Should be an instance of the symbols handled by
   		this particular machine.
   	@return {State} state Returns false if no jumps are available
   */
  	next: function next(item) {
  		for (var i = 0; i < this.j.length; i++) {
  			var jump = this.j[i];
  			var symbol = jump[0]; // Next item to check for
  			var state = jump[1]; // State to jump to if items match

  			// compare item with symbol
  			if (this.test(item, symbol)) {
  				return state;
  			}
  		}

  		// Nowhere left to jump!
  		return this.defaultTransition;
  	},


  	/**
   	Does this state accept?
   	`true` only of `this.T` exists
   		@method accepts
   	@return {Boolean}
   */
  	accepts: function accepts() {
  		return !!this.T;
  	},


  	/**
   	Determine whether a given item "symbolizes" the symbol, where symbol is
   	a class of items handled by this state machine.
   		This method should be overriden in extended classes.
   		@method test
   	@param {Mixed} item Does this item match the given symbol?
   	@param {Mixed} symbol
   	@return {Boolean}
   */
  	test: function test(item, symbol) {
  		return item === symbol;
  	},


  	/**
   	Emit the token for this State (just return it in this case)
   	If this emits a token, this instance is an accepting state
   	@method emit
   	@return {Class} T
   */
  	emit: function emit() {
  		return this.T;
  	}
  };

  /**
  	State machine for string-based input

  	@class CharacterState
  	@extends BaseState
  */
  var CharacterState = (0, _class.inherits)(BaseState, createStateClass(), {
  	/**
   	Does the given character match the given character or regular
   	expression?
   		@method test
   	@param {String} char
   	@param {String|RegExp} charOrRegExp
   	@return {Boolean}
   */
  	test: function test(character, charOrRegExp) {
  		return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
  	}
  });

  /**
  	State machine for input in the form of TextTokens

  	@class TokenState
  	@extends BaseState
  */
  var TokenState = (0, _class.inherits)(BaseState, createStateClass(), {

  	/**
    * Similar to `on`, but returns the state the results in the transition from
    * the given item
    * @method jump
    * @param {Mixed} item
    * @param {Token} [token]
    * @return state
    */
  	jump: function jump(token) {
  		var tClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  		var state = this.next(new token('')); // dummy temp token
  		if (state === this.defaultTransition) {
  			// Make a new state!
  			state = new this.constructor(tClass);
  			this.on(token, state);
  		} else if (tClass) {
  			state.T = tClass;
  		}
  		return state;
  	},


  	/**
   	Is the given token an instance of the given token class?
   		@method test
   	@param {TextToken} token
   	@param {Class} tokenClass
   	@return {Boolean}
   */
  	test: function test(token, tokenClass) {
  		return token instanceof tokenClass;
  	}
  });

  /**
  	Given a non-empty target string, generates states (if required) for each
  	consecutive substring of characters in str starting from the beginning of
  	the string. The final state will have a special value, as specified in
  	options. All other "in between" substrings will have a default end state.

  	This turns the state machine into a Trie-like data structure (rather than a
  	intelligently-designed DFA).

  	Note that I haven't really tried these with any strings other than
  	DOMAIN.

  	@param {String} str
  	@param {CharacterState} start State to jump from the first character
  	@param {Class} endToken Token class to emit when the given string has been
  		matched and no more jumps exist.
  	@param {Class} defaultToken "Filler token", or which token type to emit when
  		we don't have a full match
  	@return {Array} list of newly-created states
  */
  function stateify(str, start, endToken, defaultToken) {
  	var i = 0,
  	    len = str.length,
  	    state = start,
  	    newStates = [],
  	    nextState = void 0;

  	// Find the next state without a jump to the next character
  	while (i < len && (nextState = state.next(str[i]))) {
  		state = nextState;
  		i++;
  	}

  	if (i >= len) {
  		return [];
  	} // no new tokens were added

  	while (i < len - 1) {
  		nextState = new CharacterState(defaultToken);
  		newStates.push(nextState);
  		state.on(str[i], nextState);
  		state = nextState;
  		i++;
  	}

  	nextState = new CharacterState(endToken);
  	newStates.push(nextState);
  	state.on(str[len - 1], nextState);

  	return newStates;
  }

  exports.CharacterState = CharacterState;
  exports.TokenState = TokenState;
  exports.stateify = stateify;
  });

  unwrapExports(state);
  var state_1 = state.stateify;
  var state_2 = state.TokenState;
  var state_3 = state.CharacterState;

  var createTokenClass_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  function createTokenClass() {
  	return function (value) {
  		if (value) {
  			this.v = value;
  		}
  	};
  }

  exports.createTokenClass = createTokenClass;
  });

  unwrapExports(createTokenClass_1);
  var createTokenClass_2 = createTokenClass_1.createTokenClass;

  var text = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.AMPERSAND = exports.CLOSEPAREN = exports.CLOSEANGLEBRACKET = exports.CLOSEBRACKET = exports.CLOSEBRACE = exports.OPENPAREN = exports.OPENANGLEBRACKET = exports.OPENBRACKET = exports.OPENBRACE = exports.WS = exports.TLD = exports.SYM = exports.UNDERSCORE = exports.SLASH = exports.MAILTO = exports.PROTOCOL = exports.QUERY = exports.POUND = exports.PLUS = exports.NUM = exports.NL = exports.LOCALHOST = exports.PUNCTUATION = exports.DOT = exports.COLON = exports.AT = exports.DOMAIN = exports.Base = undefined;





  /******************************************************************************
  	Text Tokens
  	Tokens composed of strings
  ******************************************************************************/

  /**
  	Abstract class used for manufacturing text tokens.
  	Pass in the value this token represents

  	@class TextToken
  	@abstract
  */
  var TextToken = (0, createTokenClass_1.createTokenClass)();
  TextToken.prototype = {
  	toString: function toString() {
  		return this.v + '';
  	}
  };

  function inheritsToken(value) {
  	var props = value ? { v: value } : {};
  	return (0, _class.inherits)(TextToken, (0, createTokenClass_1.createTokenClass)(), props);
  }

  /**
  	A valid domain token
  	@class DOMAIN
  	@extends TextToken
  */
  var DOMAIN = inheritsToken();

  /**
  	@class AT
  	@extends TextToken
  */
  var AT = inheritsToken('@');

  /**
  	Represents a single colon `:` character

  	@class COLON
  	@extends TextToken
  */
  var COLON = inheritsToken(':');

  /**
  	@class DOT
  	@extends TextToken
  */
  var DOT = inheritsToken('.');

  /**
  	A character class that can surround the URL, but which the URL cannot begin
  	or end with. Does not include certain English punctuation like parentheses.

  	@class PUNCTUATION
  	@extends TextToken
  */
  var PUNCTUATION = inheritsToken();

  /**
  	The word localhost (by itself)
  	@class LOCALHOST
  	@extends TextToken
  */
  var LOCALHOST = inheritsToken();

  /**
  	Newline token
  	@class NL
  	@extends TextToken
  */
  var NL = inheritsToken('\n');

  /**
  	@class NUM
  	@extends TextToken
  */
  var NUM = inheritsToken();

  /**
  	@class PLUS
  	@extends TextToken
  */
  var PLUS = inheritsToken('+');

  /**
  	@class POUND
  	@extends TextToken
  */
  var POUND = inheritsToken('#');

  /**
  	Represents a web URL protocol. Supported types include

  	* `http:`
  	* `https:`
  	* `ftp:`
  	* `ftps:`

  	@class PROTOCOL
  	@extends TextToken
  */
  var PROTOCOL = inheritsToken();

  /**
  	Represents the start of the email URI protocol

  	@class MAILTO
  	@extends TextToken
  */
  var MAILTO = inheritsToken('mailto:');

  /**
  	@class QUERY
  	@extends TextToken
  */
  var QUERY = inheritsToken('?');

  /**
  	@class SLASH
  	@extends TextToken
  */
  var SLASH = inheritsToken('/');

  /**
  	@class UNDERSCORE
  	@extends TextToken
  */
  var UNDERSCORE = inheritsToken('_');

  /**
  	One ore more non-whitespace symbol.
  	@class SYM
  	@extends TextToken
  */
  var SYM = inheritsToken();

  /**
  	@class TLD
  	@extends TextToken
  */
  var TLD = inheritsToken();

  /**
  	Represents a string of consecutive whitespace characters

  	@class WS
  	@extends TextToken
  */
  var WS = inheritsToken();

  /**
  	Opening/closing bracket classes
  */

  var OPENBRACE = inheritsToken('{');
  var OPENBRACKET = inheritsToken('[');
  var OPENANGLEBRACKET = inheritsToken('<');
  var OPENPAREN = inheritsToken('(');
  var CLOSEBRACE = inheritsToken('}');
  var CLOSEBRACKET = inheritsToken(']');
  var CLOSEANGLEBRACKET = inheritsToken('>');
  var CLOSEPAREN = inheritsToken(')');

  var AMPERSAND = inheritsToken('&');

  exports.Base = TextToken;
  exports.DOMAIN = DOMAIN;
  exports.AT = AT;
  exports.COLON = COLON;
  exports.DOT = DOT;
  exports.PUNCTUATION = PUNCTUATION;
  exports.LOCALHOST = LOCALHOST;
  exports.NL = NL;
  exports.NUM = NUM;
  exports.PLUS = PLUS;
  exports.POUND = POUND;
  exports.QUERY = QUERY;
  exports.PROTOCOL = PROTOCOL;
  exports.MAILTO = MAILTO;
  exports.SLASH = SLASH;
  exports.UNDERSCORE = UNDERSCORE;
  exports.SYM = SYM;
  exports.TLD = TLD;
  exports.WS = WS;
  exports.OPENBRACE = OPENBRACE;
  exports.OPENBRACKET = OPENBRACKET;
  exports.OPENANGLEBRACKET = OPENANGLEBRACKET;
  exports.OPENPAREN = OPENPAREN;
  exports.CLOSEBRACE = CLOSEBRACE;
  exports.CLOSEBRACKET = CLOSEBRACKET;
  exports.CLOSEANGLEBRACKET = CLOSEANGLEBRACKET;
  exports.CLOSEPAREN = CLOSEPAREN;
  exports.AMPERSAND = AMPERSAND;
  });

  unwrapExports(text);
  var text_1 = text.AMPERSAND;
  var text_2 = text.CLOSEPAREN;
  var text_3 = text.CLOSEANGLEBRACKET;
  var text_4 = text.CLOSEBRACKET;
  var text_5 = text.CLOSEBRACE;
  var text_6 = text.OPENPAREN;
  var text_7 = text.OPENANGLEBRACKET;
  var text_8 = text.OPENBRACKET;
  var text_9 = text.OPENBRACE;
  var text_10 = text.WS;
  var text_11 = text.TLD;
  var text_12 = text.SYM;
  var text_13 = text.UNDERSCORE;
  var text_14 = text.SLASH;
  var text_15 = text.MAILTO;
  var text_16 = text.PROTOCOL;
  var text_17 = text.QUERY;
  var text_18 = text.POUND;
  var text_19 = text.PLUS;
  var text_20 = text.NUM;
  var text_21 = text.NL;
  var text_22 = text.LOCALHOST;
  var text_23 = text.PUNCTUATION;
  var text_24 = text.DOT;
  var text_25 = text.COLON;
  var text_26 = text.AT;
  var text_27 = text.DOMAIN;
  var text_28 = text.Base;

  var scanner = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.start = exports.run = exports.TOKENS = exports.State = undefined;





  var TOKENS = _interopRequireWildcard(text);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  var tlds = 'aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

  /**
  	The scanner provides an interface that takes a string of text as input, and
  	outputs an array of tokens instances that can be used for easy URL parsing.

  	@module linkify
  	@submodule scanner
  	@main scanner
  */

  var NUMBERS = '0123456789'.split('');
  var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  var WHITESPACE = [' ', '\f', '\r', '\t', '\v', '\xA0', '\u1680', '\u180E']; // excluding line breaks

  var domainStates = []; // states that jump to DOMAIN on /[a-z0-9]/
  var makeState = function makeState(tokenClass) {
  	return new state.CharacterState(tokenClass);
  };

  // Frequently used states
  var S_START = makeState();
  var S_NUM = makeState(text.NUM);
  var S_DOMAIN = makeState(text.DOMAIN);
  var S_DOMAIN_HYPHEN = makeState(); // domain followed by 1 or more hyphen characters
  var S_WS = makeState(text.WS);

  // States for special URL symbols
  S_START.on('@', makeState(text.AT)).on('.', makeState(text.DOT)).on('+', makeState(text.PLUS)).on('#', makeState(text.POUND)).on('?', makeState(text.QUERY)).on('/', makeState(text.SLASH)).on('_', makeState(text.UNDERSCORE)).on(':', makeState(text.COLON)).on('{', makeState(text.OPENBRACE)).on('[', makeState(text.OPENBRACKET)).on('<', makeState(text.OPENANGLEBRACKET)).on('(', makeState(text.OPENPAREN)).on('}', makeState(text.CLOSEBRACE)).on(']', makeState(text.CLOSEBRACKET)).on('>', makeState(text.CLOSEANGLEBRACKET)).on(')', makeState(text.CLOSEPAREN)).on('&', makeState(text.AMPERSAND)).on([',', ';', '!', '"', '\''], makeState(text.PUNCTUATION));

  // Whitespace jumps
  // Tokens of only non-newline whitespace are arbitrarily long
  S_START.on('\n', makeState(text.NL)).on(WHITESPACE, S_WS);

  // If any whitespace except newline, more whitespace!
  S_WS.on(WHITESPACE, S_WS);

  // Generates states for top-level domains
  // Note that this is most accurate when tlds are in alphabetical order
  for (var i = 0; i < tlds.length; i++) {
  	var newStates = (0, state.stateify)(tlds[i], S_START, text.TLD, text.DOMAIN);
  	domainStates.push.apply(domainStates, newStates);
  }

  // Collect the states generated by different protocls
  var partialProtocolFileStates = (0, state.stateify)('file', S_START, text.DOMAIN, text.DOMAIN);
  var partialProtocolFtpStates = (0, state.stateify)('ftp', S_START, text.DOMAIN, text.DOMAIN);
  var partialProtocolHttpStates = (0, state.stateify)('http', S_START, text.DOMAIN, text.DOMAIN);
  var partialProtocolMailtoStates = (0, state.stateify)('mailto', S_START, text.DOMAIN, text.DOMAIN);

  // Add the states to the array of DOMAINeric states
  domainStates.push.apply(domainStates, partialProtocolFileStates);
  domainStates.push.apply(domainStates, partialProtocolFtpStates);
  domainStates.push.apply(domainStates, partialProtocolHttpStates);
  domainStates.push.apply(domainStates, partialProtocolMailtoStates);

  // Protocol states
  var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
  var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
  var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
  var S_MAILTO = partialProtocolMailtoStates.pop();
  var S_PROTOCOL_SECURE = makeState(text.DOMAIN);
  var S_FULL_PROTOCOL = makeState(text.PROTOCOL); // Full protocol ends with COLON
  var S_FULL_MAILTO = makeState(text.MAILTO); // Mailto ends with COLON

  // Secure protocols (end with 's')
  S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

  S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

  domainStates.push(S_PROTOCOL_SECURE);

  // Become protocol tokens after a COLON
  S_PROTOCOL_FILE.on(':', S_FULL_PROTOCOL);
  S_PROTOCOL_SECURE.on(':', S_FULL_PROTOCOL);
  S_MAILTO.on(':', S_FULL_MAILTO);

  // Localhost
  var partialLocalhostStates = (0, state.stateify)('localhost', S_START, text.LOCALHOST, text.DOMAIN);
  domainStates.push.apply(domainStates, partialLocalhostStates);

  // Everything else
  // DOMAINs make more DOMAINs
  // Number and character transitions
  S_START.on(NUMBERS, S_NUM);
  S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_NUM).on(ALPHANUM, S_DOMAIN); // number becomes DOMAIN

  S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);

  // All the generated states should have a jump to DOMAIN
  for (var _i = 0; _i < domainStates.length; _i++) {
  	domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
  }

  S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_DOMAIN).on(ALPHANUM, S_DOMAIN);

  // Set default transition
  S_START.defaultTransition = makeState(text.SYM);

  /**
  	Given a string, returns an array of TOKEN instances representing the
  	composition of that string.

  	@method run
  	@param {String} str Input string to scan
  	@return {Array} Array of TOKEN instances
  */
  var run = function run(str) {

  	// The state machine only looks at lowercase strings.
  	// This selective `toLowerCase` is used because lowercasing the entire
  	// string causes the length and character position to vary in some in some
  	// non-English strings. This happens only on V8-based runtimes.
  	var lowerStr = str.replace(/[A-Z]/g, function (c) {
  		return c.toLowerCase();
  	});
  	var len = str.length;
  	var tokens = []; // return value

  	var cursor = 0;

  	// Tokenize the string
  	while (cursor < len) {
  		var state = S_START;
  		var nextState = null;
  		var tokenLength = 0;
  		var latestAccepting = null;
  		var sinceAccepts = -1;

  		while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
  			state = nextState;

  			// Keep track of the latest accepting state
  			if (state.accepts()) {
  				sinceAccepts = 0;
  				latestAccepting = state;
  			} else if (sinceAccepts >= 0) {
  				sinceAccepts++;
  			}

  			tokenLength++;
  			cursor++;
  		}

  		if (sinceAccepts < 0) {
  			continue;
  		} // Should never happen

  		// Roll back to the latest accepting state
  		cursor -= sinceAccepts;
  		tokenLength -= sinceAccepts;

  		// Get the class for the new token
  		var TOKEN = latestAccepting.emit(); // Current token class

  		// No more jumps, just make a new token
  		tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
  	}

  	return tokens;
  };

  var start = S_START;
  exports.State = state.CharacterState;
  exports.TOKENS = TOKENS;
  exports.run = run;
  exports.start = start;
  });

  unwrapExports(scanner);
  var scanner_1 = scanner.start;
  var scanner_2 = scanner.run;
  var scanner_3 = scanner.TOKENS;
  var scanner_4 = scanner.State;

  var multi = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.URL = exports.TEXT = exports.NL = exports.EMAIL = exports.MAILTOEMAIL = exports.Base = undefined;







  /******************************************************************************
  	Multi-Tokens
  	Tokens composed of arrays of TextTokens
  ******************************************************************************/

  // Is the given token a valid domain token?
  // Should nums be included here?
  function isDomainToken(token) {
  	return token instanceof text.DOMAIN || token instanceof text.TLD;
  }

  /**
  	Abstract class used for manufacturing tokens of text tokens. That is rather
  	than the value for a token being a small string of text, it's value an array
  	of text tokens.

  	Used for grouping together URLs, emails, hashtags, and other potential
  	creations.

  	@class MultiToken
  	@abstract
  */
  var MultiToken = (0, createTokenClass_1.createTokenClass)();

  MultiToken.prototype = {
  	/**
   	String representing the type for this token
   	@property type
   	@default 'TOKEN'
   */
  	type: 'token',

  	/**
   	Is this multitoken a link?
   	@property isLink
   	@default false
   */
  	isLink: false,

  	/**
   	Return the string this token represents.
   	@method toString
   	@return {String}
   */
  	toString: function toString() {
  		var result = [];
  		for (var i = 0; i < this.v.length; i++) {
  			result.push(this.v[i].toString());
  		}
  		return result.join('');
  	},


  	/**
   	What should the value for this token be in the `href` HTML attribute?
   	Returns the `.toString` value by default.
   		@method toHref
   	@return {String}
   */
  	toHref: function toHref() {
  		return this.toString();
  	},


  	/**
   	Returns a hash of relevant values for this token, which includes keys
   	* type - Kind of token ('url', 'email', etc.)
   	* value - Original text
   	* href - The value that should be added to the anchor tag's href
   		attribute
   		@method toObject
   	@param {String} [protocol] `'http'` by default
   	@return {Object}
   */
  	toObject: function toObject() {
  		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

  		return {
  			type: this.type,
  			value: this.toString(),
  			href: this.toHref(protocol)
  		};
  	}
  };

  /**
  	Represents an arbitrarily mailto email address with the prefix included
  	@class MAILTO
  	@extends MultiToken
  */
  var MAILTOEMAIL = (0, _class.inherits)(MultiToken, (0, createTokenClass_1.createTokenClass)(), {
  	type: 'email',
  	isLink: true
  });

  /**
  	Represents a list of tokens making up a valid email address
  	@class EMAIL
  	@extends MultiToken
  */
  var EMAIL = (0, _class.inherits)(MultiToken, (0, createTokenClass_1.createTokenClass)(), {
  	type: 'email',
  	isLink: true,
  	toHref: function toHref() {
  		return 'mailto:' + this.toString();
  	}
  });

  /**
  	Represents some plain text
  	@class TEXT
  	@extends MultiToken
  */
  var TEXT = (0, _class.inherits)(MultiToken, (0, createTokenClass_1.createTokenClass)(), { type: 'text' });

  /**
  	Multi-linebreak token - represents a line break
  	@class NL
  	@extends MultiToken
  */
  var NL = (0, _class.inherits)(MultiToken, (0, createTokenClass_1.createTokenClass)(), { type: 'nl' });

  /**
  	Represents a list of tokens making up a valid URL
  	@class URL
  	@extends MultiToken
  */
  var URL = (0, _class.inherits)(MultiToken, (0, createTokenClass_1.createTokenClass)(), {
  	type: 'url',
  	isLink: true,

  	/**
   	Lowercases relevant parts of the domain and adds the protocol if
   	required. Note that this will not escape unsafe HTML characters in the
   	URL.
   		@method href
   	@param {String} protocol
   	@return {String}
   */
  	toHref: function toHref() {
  		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

  		var hasProtocol = false;
  		var hasSlashSlash = false;
  		var tokens = this.v;
  		var result = [];
  		var i = 0;

  		// Make the first part of the domain lowercase
  		// Lowercase protocol
  		while (tokens[i] instanceof text.PROTOCOL) {
  			hasProtocol = true;
  			result.push(tokens[i].toString().toLowerCase());
  			i++;
  		}

  		// Skip slash-slash
  		while (tokens[i] instanceof text.SLASH) {
  			hasSlashSlash = true;
  			result.push(tokens[i].toString());
  			i++;
  		}

  		// Lowercase all other characters in the domain
  		while (isDomainToken(tokens[i])) {
  			result.push(tokens[i].toString().toLowerCase());
  			i++;
  		}

  		// Leave all other characters as they were written
  		for (; i < tokens.length; i++) {
  			result.push(tokens[i].toString());
  		}

  		result = result.join('');

  		if (!(hasProtocol || hasSlashSlash)) {
  			result = protocol + '://' + result;
  		}

  		return result;
  	},
  	hasProtocol: function hasProtocol() {
  		return this.v[0] instanceof text.PROTOCOL;
  	}
  });

  exports.Base = MultiToken;
  exports.MAILTOEMAIL = MAILTOEMAIL;
  exports.EMAIL = EMAIL;
  exports.NL = NL;
  exports.TEXT = TEXT;
  exports.URL = URL;
  });

  unwrapExports(multi);
  var multi_1 = multi.URL;
  var multi_2 = multi.TEXT;
  var multi_3 = multi.NL;
  var multi_4 = multi.EMAIL;
  var multi_5 = multi.MAILTOEMAIL;
  var multi_6 = multi.Base;

  var parser = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.start = exports.run = exports.TOKENS = exports.State = undefined;





  var MULTI_TOKENS = _interopRequireWildcard(multi);



  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  /**
  	Not exactly parser, more like the second-stage scanner (although we can
  	theoretically hotswap the code here with a real parser in the future... but
  	for a little URL-finding utility abstract syntax trees may be a little
  	overkill).

  	URL format: http://en.wikipedia.org/wiki/URI_scheme
  	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
  	reference)

  	@module linkify
  	@submodule parser
  	@main parser
  */

  var makeState = function makeState(tokenClass) {
  	return new state.TokenState(tokenClass);
  };

  // The universal starting state.
  var S_START = makeState();

  // Intermediate states for URLs. Note that domains that begin with a protocol
  // are treated slighly differently from those that don't.
  var S_PROTOCOL = makeState(); // e.g., 'http:'
  var S_MAILTO = makeState(); // 'mailto:'
  var S_PROTOCOL_SLASH = makeState(); // e.g., '/', 'http:/''
  var S_PROTOCOL_SLASH_SLASH = makeState(); // e.g., '//', 'http://'
  var S_DOMAIN = makeState(); // parsed string ends with a potential domain name (A)
  var S_DOMAIN_DOT = makeState(); // (A) domain followed by DOT
  var S_TLD = makeState(multi.URL); // (A) Simplest possible URL with no query string
  var S_TLD_COLON = makeState(); // (A) URL followed by colon (potential port number here)
  var S_TLD_PORT = makeState(multi.URL); // TLD followed by a port number
  var S_URL = makeState(multi.URL); // Long URL with optional port and maybe query string
  var S_URL_NON_ACCEPTING = makeState(); // URL followed by some symbols (will not be part of the final URL)
  var S_URL_OPENBRACE = makeState(); // URL followed by {
  var S_URL_OPENBRACKET = makeState(); // URL followed by [
  var S_URL_OPENANGLEBRACKET = makeState(); // URL followed by <
  var S_URL_OPENPAREN = makeState(); // URL followed by (
  var S_URL_OPENBRACE_Q = makeState(multi.URL); // URL followed by { and some symbols that the URL can end it
  var S_URL_OPENBRACKET_Q = makeState(multi.URL); // URL followed by [ and some symbols that the URL can end it
  var S_URL_OPENANGLEBRACKET_Q = makeState(multi.URL); // URL followed by < and some symbols that the URL can end it
  var S_URL_OPENPAREN_Q = makeState(multi.URL); // URL followed by ( and some symbols that the URL can end it
  var S_URL_OPENBRACE_SYMS = makeState(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it
  var S_URL_OPENBRACKET_SYMS = makeState(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it
  var S_URL_OPENANGLEBRACKET_SYMS = makeState(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it
  var S_URL_OPENPAREN_SYMS = makeState(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it
  var S_EMAIL_DOMAIN = makeState(); // parsed string starts with local email info + @ with a potential domain name (C)
  var S_EMAIL_DOMAIN_DOT = makeState(); // (C) domain followed by DOT
  var S_EMAIL = makeState(multi.EMAIL); // (C) Possible email address (could have more tlds)
  var S_EMAIL_COLON = makeState(); // (C) URL followed by colon (potential port number here)
  var S_EMAIL_PORT = makeState(multi.EMAIL); // (C) Email address with a port
  var S_MAILTO_EMAIL = makeState(multi.MAILTOEMAIL); // Email that begins with the mailto prefix (D)
  var S_MAILTO_EMAIL_NON_ACCEPTING = makeState(); // (D) Followed by some non-query string chars
  var S_LOCALPART = makeState(); // Local part of the email address
  var S_LOCALPART_AT = makeState(); // Local part of the email address plus @
  var S_LOCALPART_DOT = makeState(); // Local part of the email address plus '.' (localpart cannot end in .)
  var S_NL = makeState(multi.NL); // single new line

  // Make path from start to protocol (with '//')
  S_START.on(text.NL, S_NL).on(text.PROTOCOL, S_PROTOCOL).on(text.MAILTO, S_MAILTO).on(text.SLASH, S_PROTOCOL_SLASH);

  S_PROTOCOL.on(text.SLASH, S_PROTOCOL_SLASH);
  S_PROTOCOL_SLASH.on(text.SLASH, S_PROTOCOL_SLASH_SLASH);

  // The very first potential domain name
  S_START.on(text.TLD, S_DOMAIN).on(text.DOMAIN, S_DOMAIN).on(text.LOCALHOST, S_TLD).on(text.NUM, S_DOMAIN);

  // Force URL for protocol followed by anything sane
  S_PROTOCOL_SLASH_SLASH.on(text.TLD, S_URL).on(text.DOMAIN, S_URL).on(text.NUM, S_URL).on(text.LOCALHOST, S_URL);

  // Account for dots and hyphens
  // hyphens are usually parts of domain names
  S_DOMAIN.on(text.DOT, S_DOMAIN_DOT);
  S_EMAIL_DOMAIN.on(text.DOT, S_EMAIL_DOMAIN_DOT);

  // Hyphen can jump back to a domain name

  // After the first domain and a dot, we can find either a URL or another domain
  S_DOMAIN_DOT.on(text.TLD, S_TLD).on(text.DOMAIN, S_DOMAIN).on(text.NUM, S_DOMAIN).on(text.LOCALHOST, S_DOMAIN);

  S_EMAIL_DOMAIN_DOT.on(text.TLD, S_EMAIL).on(text.DOMAIN, S_EMAIL_DOMAIN).on(text.NUM, S_EMAIL_DOMAIN).on(text.LOCALHOST, S_EMAIL_DOMAIN);

  // S_TLD accepts! But the URL could be longer, try to find a match greedily
  // The `run` function should be able to "rollback" to the accepting state
  S_TLD.on(text.DOT, S_DOMAIN_DOT);
  S_EMAIL.on(text.DOT, S_EMAIL_DOMAIN_DOT);

  // Become real URLs after `SLASH` or `COLON NUM SLASH`
  // Here PSS and non-PSS converge
  S_TLD.on(text.COLON, S_TLD_COLON).on(text.SLASH, S_URL);
  S_TLD_COLON.on(text.NUM, S_TLD_PORT);
  S_TLD_PORT.on(text.SLASH, S_URL);
  S_EMAIL.on(text.COLON, S_EMAIL_COLON);
  S_EMAIL_COLON.on(text.NUM, S_EMAIL_PORT);

  // Types of characters the URL can definitely end in
  var qsAccepting = [text.DOMAIN, text.AT, text.LOCALHOST, text.NUM, text.PLUS, text.POUND, text.PROTOCOL, text.SLASH, text.TLD, text.UNDERSCORE, text.SYM, text.AMPERSAND];

  // Types of tokens that can follow a URL and be part of the query string
  // but cannot be the very last characters
  // Characters that cannot appear in the URL at all should be excluded
  var qsNonAccepting = [text.COLON, text.DOT, text.QUERY, text.PUNCTUATION, text.CLOSEBRACE, text.CLOSEBRACKET, text.CLOSEANGLEBRACKET, text.CLOSEPAREN, text.OPENBRACE, text.OPENBRACKET, text.OPENANGLEBRACKET, text.OPENPAREN];

  // These states are responsible primarily for determining whether or not to
  // include the final round bracket.

  // URL, followed by an opening bracket
  S_URL.on(text.OPENBRACE, S_URL_OPENBRACE).on(text.OPENBRACKET, S_URL_OPENBRACKET).on(text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(text.OPENPAREN, S_URL_OPENPAREN);

  // URL with extra symbols at the end, followed by an opening bracket
  S_URL_NON_ACCEPTING.on(text.OPENBRACE, S_URL_OPENBRACE).on(text.OPENBRACKET, S_URL_OPENBRACKET).on(text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(text.OPENPAREN, S_URL_OPENPAREN);

  // Closing bracket component. This character WILL be included in the URL
  S_URL_OPENBRACE.on(text.CLOSEBRACE, S_URL);
  S_URL_OPENBRACKET.on(text.CLOSEBRACKET, S_URL);
  S_URL_OPENANGLEBRACKET.on(text.CLOSEANGLEBRACKET, S_URL);
  S_URL_OPENPAREN.on(text.CLOSEPAREN, S_URL);
  S_URL_OPENBRACE_Q.on(text.CLOSEBRACE, S_URL);
  S_URL_OPENBRACKET_Q.on(text.CLOSEBRACKET, S_URL);
  S_URL_OPENANGLEBRACKET_Q.on(text.CLOSEANGLEBRACKET, S_URL);
  S_URL_OPENPAREN_Q.on(text.CLOSEPAREN, S_URL);
  S_URL_OPENBRACE_SYMS.on(text.CLOSEBRACE, S_URL);
  S_URL_OPENBRACKET_SYMS.on(text.CLOSEBRACKET, S_URL);
  S_URL_OPENANGLEBRACKET_SYMS.on(text.CLOSEANGLEBRACKET, S_URL);
  S_URL_OPENPAREN_SYMS.on(text.CLOSEPAREN, S_URL);

  // URL that beings with an opening bracket, followed by a symbols.
  // Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
  // has a single opening bracket for some reason).
  S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
  S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
  S_URL_OPENANGLEBRACKET.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
  S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
  S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
  S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
  S_URL_OPENANGLEBRACKET.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
  S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

  // URL that begins with an opening bracket, followed by some symbols
  S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
  S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
  S_URL_OPENANGLEBRACKET_Q.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
  S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
  S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
  S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
  S_URL_OPENANGLEBRACKET_Q.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
  S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);

  S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
  S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
  S_URL_OPENANGLEBRACKET_SYMS.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
  S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
  S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
  S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
  S_URL_OPENANGLEBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
  S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

  // Account for the query string
  S_URL.on(qsAccepting, S_URL);
  S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);

  S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
  S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING);

  // Email address-specific state definitions
  // Note: We are not allowing '/' in email addresses since this would interfere
  // with real URLs

  // For addresses with the mailto prefix
  // 'mailto:' followed by anything sane is a valid email
  S_MAILTO.on(text.TLD, S_MAILTO_EMAIL).on(text.DOMAIN, S_MAILTO_EMAIL).on(text.NUM, S_MAILTO_EMAIL).on(text.LOCALHOST, S_MAILTO_EMAIL);

  // Greedily get more potential valid email values
  S_MAILTO_EMAIL.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
  S_MAILTO_EMAIL_NON_ACCEPTING.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);

  // For addresses without the mailto prefix
  // Tokens allowed in the localpart of the email
  var localpartAccepting = [text.DOMAIN, text.NUM, text.PLUS, text.POUND, text.QUERY, text.UNDERSCORE, text.SYM, text.AMPERSAND, text.TLD];

  // Some of the tokens in `localpartAccepting` are already accounted for here and
  // will not be overwritten (don't worry)
  S_DOMAIN.on(localpartAccepting, S_LOCALPART).on(text.AT, S_LOCALPART_AT);
  S_TLD.on(localpartAccepting, S_LOCALPART).on(text.AT, S_LOCALPART_AT);
  S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);

  // Okay we're on a localpart. Now what?
  // TODO: IP addresses and what if the email starts with numbers?
  S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(text.AT, S_LOCALPART_AT) // close to an email address now
  .on(text.DOT, S_LOCALPART_DOT);
  S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
  S_LOCALPART_AT.on(text.TLD, S_EMAIL_DOMAIN).on(text.DOMAIN, S_EMAIL_DOMAIN).on(text.LOCALHOST, S_EMAIL);
  // States following `@` defined above

  var run = function run(tokens) {
  	var len = tokens.length;
  	var cursor = 0;
  	var multis = [];
  	var textTokens = [];

  	while (cursor < len) {
  		var state = S_START;
  		var secondState = null;
  		var nextState = null;
  		var multiLength = 0;
  		var latestAccepting = null;
  		var sinceAccepts = -1;

  		while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
  			// Starting tokens with nowhere to jump to.
  			// Consider these to be just plain text
  			textTokens.push(tokens[cursor++]);
  		}

  		while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {

  			// Get the next state
  			secondState = null;
  			state = nextState;

  			// Keep track of the latest accepting state
  			if (state.accepts()) {
  				sinceAccepts = 0;
  				latestAccepting = state;
  			} else if (sinceAccepts >= 0) {
  				sinceAccepts++;
  			}

  			cursor++;
  			multiLength++;
  		}

  		if (sinceAccepts < 0) {

  			// No accepting state was found, part of a regular text token
  			// Add all the tokens we looked at to the text tokens array
  			for (var i = cursor - multiLength; i < cursor; i++) {
  				textTokens.push(tokens[i]);
  			}
  		} else {

  			// Accepting state!

  			// First close off the textTokens (if available)
  			if (textTokens.length > 0) {
  				multis.push(new multi.TEXT(textTokens));
  				textTokens = [];
  			}

  			// Roll back to the latest accepting state
  			cursor -= sinceAccepts;
  			multiLength -= sinceAccepts;

  			// Create a new multitoken
  			var MULTI = latestAccepting.emit();
  			multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
  		}
  	}

  	// Finally close off the textTokens (if available)
  	if (textTokens.length > 0) {
  		multis.push(new multi.TEXT(textTokens));
  	}

  	return multis;
  };

  exports.State = state.TokenState;
  exports.TOKENS = MULTI_TOKENS;
  exports.run = run;
  exports.start = S_START;
  });

  unwrapExports(parser);
  var parser_1 = parser.start;
  var parser_2 = parser.run;
  var parser_3 = parser.TOKENS;
  var parser_4 = parser.State;

  var linkify = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.inherits = exports.find = undefined;





  var options$1 = _interopRequireWildcard(options);



  var scanner$1 = _interopRequireWildcard(scanner);



  var parser$1 = _interopRequireWildcard(parser);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  if (!Array.isArray) {
  	Array.isArray = function (arg) {
  		return Object.prototype.toString.call(arg) === '[object Array]';
  	};
  }

  /**
  	Converts a string into tokens that represent linkable and non-linkable bits
  	@method tokenize
  	@param {String} str
  	@return {Array} tokens
  */
  var tokenize = function tokenize(str) {
  	return parser$1.run(scanner$1.run(str));
  };

  /**
  	Returns a list of linkable items in the given string.
  */
  var find = function find(str) {
  	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  	var tokens = tokenize(str);
  	var filtered = [];

  	for (var i = 0; i < tokens.length; i++) {
  		var token = tokens[i];
  		if (token.isLink && (!type || token.type === type)) {
  			filtered.push(token.toObject());
  		}
  	}

  	return filtered;
  };

  /**
  	Is the given string valid linkable text of some sort
  	Note that this does not trim the text for you.

  	Optionally pass in a second `type` param, which is the type of link to test
  	for.

  	For example,

  		test(str, 'email');

  	Will return `true` if str is a valid email.
  */
  var test = function test(str) {
  	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  	var tokens = tokenize(str);
  	return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
  };

  // Scanner and parser provide states and tokens for the lexicographic stage
  // (will be used to add additional link types)
  exports.find = find;
  exports.inherits = _class.inherits;
  exports.options = options$1;
  exports.parser = parser$1;
  exports.scanner = scanner$1;
  exports.test = test;
  exports.tokenize = tokenize;
  });

  unwrapExports(linkify);
  var linkify_1 = linkify.tokenize;
  var linkify_2 = linkify.test;
  var linkify_3 = linkify.scanner;
  var linkify_4 = linkify.parser;
  var linkify_5 = linkify.options;
  var linkify_6 = linkify.inherits;
  var linkify_7 = linkify.find;

  var linkifyHtml_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.default = linkifyHtml;



  var _simpleHtmlTokenizer2 = _interopRequireDefault(simpleHtmlTokenizer);



  var linkify$1 = _interopRequireWildcard(linkify);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var options = linkify$1.options;
  var Options = options.Options;


  var StartTag = 'StartTag';
  var EndTag = 'EndTag';
  var Chars = 'Chars';
  var Comment = 'Comment';

  /**
  	`tokens` and `token` in this section refer to tokens generated by the HTML
  	parser.
  */
  function linkifyHtml(str) {
  	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  	var tokens = _simpleHtmlTokenizer2.default.tokenize(str);
  	var linkifiedTokens = [];
  	var linkified = [];
  	var i;

  	opts = new Options(opts);

  	// Linkify the tokens given by the parser
  	for (i = 0; i < tokens.length; i++) {
  		var token = tokens[i];

  		if (token.type === StartTag) {
  			linkifiedTokens.push(token);

  			// Ignore all the contents of ignored tags
  			var tagName = token.tagName.toUpperCase();
  			var isIgnored = tagName === 'A' || options.contains(opts.ignoreTags, tagName);
  			if (!isIgnored) {
  				continue;
  			}

  			var preskipLen = linkifiedTokens.length;
  			skipTagTokens(tagName, tokens, ++i, linkifiedTokens);
  			i += linkifiedTokens.length - preskipLen - 1;
  			continue;
  		} else if (token.type !== Chars) {
  			// Skip this token, it's not important
  			linkifiedTokens.push(token);
  			continue;
  		}

  		// Valid text token, linkify it!
  		var linkifedChars = linkifyChars(token.chars, opts);
  		linkifiedTokens.push.apply(linkifiedTokens, linkifedChars);
  	}

  	// Convert the tokens back into a string
  	for (i = 0; i < linkifiedTokens.length; i++) {
  		var _token = linkifiedTokens[i];
  		switch (_token.type) {
  			case StartTag:
  				{
  					var link = '<' + _token.tagName;
  					if (_token.attributes.length > 0) {
  						var attrs = attrsToStrings(_token.attributes);
  						link += ' ' + attrs.join(' ');
  					}
  					link += '>';
  					linkified.push(link);
  					break;
  				}
  			case EndTag:
  				linkified.push('</' + _token.tagName + '>');
  				break;
  			case Chars:
  				linkified.push(escapeText(_token.chars));
  				break;
  			case Comment:
  				linkified.push('<!--' + escapeText(_token.chars) + '-->');
  				break;
  		}
  	}

  	return linkified.join('');
  }

  /**
  	`tokens` and `token` in this section referes to tokens returned by
  	`linkify.tokenize`. `linkified` will contain HTML Parser-style tokens
  */
  function linkifyChars(str, opts) {
  	var tokens = linkify$1.tokenize(str);
  	var result = [];

  	for (var i = 0; i < tokens.length; i++) {
  		var token = tokens[i];

  		if (token.type === 'nl' && opts.nl2br) {
  			result.push({
  				type: StartTag,
  				tagName: 'br',
  				attributes: [],
  				selfClosing: true
  			});
  			continue;
  		} else if (!token.isLink || !opts.check(token)) {
  			result.push({ type: Chars, chars: token.toString() });
  			continue;
  		}

  		var _opts$resolve = opts.resolve(token),
  		    formatted = _opts$resolve.formatted,
  		    formattedHref = _opts$resolve.formattedHref,
  		    tagName = _opts$resolve.tagName,
  		    className = _opts$resolve.className,
  		    target = _opts$resolve.target,
  		    attributes = _opts$resolve.attributes;

  		// Build up attributes


  		var attributeArray = [['href', formattedHref]];

  		if (className) {
  			attributeArray.push(['class', className]);
  		}

  		if (target) {
  			attributeArray.push(['target', target]);
  		}

  		for (var attr in attributes) {
  			attributeArray.push([attr, attributes[attr]]);
  		}

  		// Add the required tokens
  		result.push({
  			type: StartTag,
  			tagName: tagName,
  			attributes: attributeArray,
  			selfClosing: false
  		});
  		result.push({ type: Chars, chars: formatted });
  		result.push({ type: EndTag, tagName: tagName });
  	}

  	return result;
  }

  /**
  	Returns a list of tokens skipped until the closing tag of tagName.

  	* `tagName` is the closing tag which will prompt us to stop skipping
  	* `tokens` is the array of tokens generated by HTML5Tokenizer which
  	* `i` is the index immediately after the opening tag to skip
  	* `skippedTokens` is an array which skipped tokens are being pushed into

  	Caveats

  	* Assumes that i is the first token after the given opening tagName
  	* The closing tag will be skipped, but nothing after it
  	* Will track whether there is a nested tag of the same type
  */
  function skipTagTokens(tagName, tokens, i, skippedTokens) {

  	// number of tokens of this type on the [fictional] stack
  	var stackCount = 1;

  	while (i < tokens.length && stackCount > 0) {
  		var token = tokens[i];

  		if (token.type === StartTag && token.tagName.toUpperCase() === tagName) {
  			// Nested tag of the same type, "add to stack"
  			stackCount++;
  		} else if (token.type === EndTag && token.tagName.toUpperCase() === tagName) {
  			// Closing tag
  			stackCount--;
  		}

  		skippedTokens.push(token);
  		i++;
  	}

  	// Note that if stackCount > 0 here, the HTML is probably invalid
  	return skippedTokens;
  }

  function escapeText(text) {
  	// Not required, HTML tokenizer ensures this occurs properly
  	return text;
  }

  function escapeAttr(attr) {
  	return attr.replace(/"/g, '&quot;');
  }

  function attrsToStrings(attrs) {
  	var attrStrs = [];
  	for (var i = 0; i < attrs.length; i++) {
  		var _attrs$i = attrs[i],
  		    name = _attrs$i[0],
  		    value = _attrs$i[1];

  		attrStrs.push(name + '="' + escapeAttr(value) + '"');
  	}
  	return attrStrs;
  }
  });

  unwrapExports(linkifyHtml_1);

  var html = linkifyHtml_1.default;

  const QuickReplyButton = newStyled.button `
  background: none;
  border: 2px solid ${prop('theme.palette.background.bot')};
  border-radius: ${prop('theme.sizing.borderRadius')};
  padding: 0.5em 1em;
  margin: 0 0.5em;
  display: inline-block;

  outline: none;
  color: ${prop('theme.palette.background.bot')};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    border-color: ${prop('theme.palette.text.bot')};
    color: ${prop('theme.palette.text.bot')};
    background: ${prop('theme.palette.background.bot')};
  }

  ${prop('theme.overrides.quickReply', '')};
`;
  const QuickReply$1 = (props) => (React__default.createElement(QuickReplyButton, Object.assign({}, props)));

  const QuickReplyListContainer = newStyled.div `
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  overflow-x: unset;
  white-space: nowrap;
  text-align: left;

  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-left: 1em;
  padding-right: 1em;

  & > * {
    display: inline-block;
  }
`;
  const QuickReplyListOuterContainer = newStyled.div ``;
  const QuickReplyList = ({ children, }) => (React__default.createElement(QuickReplyListOuterContainer, null,
      React__default.createElement(QuickReplyListContainer, null, children)));

  const MessageContainer = newStyled.div `
  width: 100%;
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;
  const Message = newStyled.div `
  display: inline-block;
  background: rgb(238, 238, 238) none repeat scroll 0% 0%;
  color: #000;
  padding: 0.5em 1.5em;
  margin: 0 1em;
  white-space: pre-line;
  border-radius: ${prop('theme.sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${prop('theme.overrides.messageBot', '')}
`;
  const MessageBot = ({ message, sendAction, }) => {
      function getHtmlContent() {
          var _a;
          const content = ((_a = message.message) === null || _a === void 0 ? void 0 : _a.toString()) || '';
          return html(content);
      }
      return (React__default.createElement(MessageContainer, null,
          React__default.createElement(Message, null,
              React__default.createElement("div", { dangerouslySetInnerHTML: { __html: getHtmlContent() } })),
          Array.isArray(message.buttons) && message.buttons.length > 0 && (React__default.createElement(QuickReplyList, null, message.buttons.map((button, i) => (React__default.createElement(QuickReply$1, { key: i, onClick: sendAction.bind(null, button) }, button.label)))))));
  };

  const MessageContainer$1 = newStyled.div `
  width: 100%;
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  text-align: right;
`;
  const Message$1 = newStyled.div `
  display: inline-block;
  background: rgb(106, 166, 23) none repeat scroll 0% 0%;
  color: white;
  padding: 0.5em 1.5em;
  margin: 0 1em;
  border-radius: ${prop('theme.sizing.borderRadius')};
  border-bottom-right-radius: 0;

  ${prop('theme.overrides.messageUser', '')}
`;
  const MessageUser = ({ children, }) => {
      return (React__default.createElement(MessageContainer$1, null,
          React__default.createElement(Message$1, null, children)));
  };

  const LoaderContainer = newStyled.div `
  width: 100%;
  max-width: ${prop('theme.sizing.conversation.width')};
`;
  const BulletList = newStyled.div `
  display: inline-block;
  color: ${prop('theme.palette.text.bot')};
  padding: 0.5em 1.5em;
  margin-left: 1em;
  white-space: pre-line;
  border-radius: ${prop('theme.sizing.borderRadius')};
  border-bottom-left-radius: 0;

  ${prop('theme.overrides.messageBot', '')}
`;
  const beat = keyframes `
  50% {
    transform: scale(0.75);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
  const Bullet = newStyled.div `
  display: inline-block;
  background-color: ${prop('theme.palette.text.bot')};
  width: ${prop('theme.sizing.loaderSize')};
  height: ${prop('theme.sizing.loaderSize')};
  margin: 0.5em 0.5em 0.5em 0;
  border-radius: 50%;
  animation: ${beat} 0.7s linear
    ${(props) => (props['data-rank'] % 2 ? '0s' : '0.35s')} infinite normal both
    running;
`;
  const Loader = () => (React__default.createElement(LoaderContainer, null,
      React__default.createElement(BulletList, null,
          React__default.createElement(Bullet, { "data-rank": 1 }),
          React__default.createElement(Bullet, { "data-rank": 2 }),
          React__default.createElement(Bullet, { "data-rank": 3 }))));

  const DefaultWidget = (props) => {
      return (React__default.createElement(MessageContainer, null,
          React__default.createElement(Message, null,
              React__default.createElement("pre", null, JSON.stringify(props)))));
  };

  const CalendarGraphCardOuter = newStyled.div `
  max-width: ${prop('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;
  const CalendarGraphCardContainer = newStyled.div `
  padding: 0.5em;
  background: rgb(238, 238, 238) none repeat scroll 0% 0%;
  color: ${prop('theme.palette.text.card')};
  border-radius: 6px;
  width: 13em;
  overflow-wrap: break-word;

  ${prop('theme.overrides.card.cardContainer', '')};
`;
  const CalendarGraphCardSubjet = newStyled.h3 `
  margin: 0.5em 0;
  font-size: 14px;

  ${prop('theme.overrides.card.cardTitle', '')};
`;
  const CalendarGraphCardBodyPreview = newStyled.h4 `
  margin: 0.5em 0;
  font-size: 14px;
  color: #4a4a4a;

  ${prop('theme.overrides.card.cardSubTitle', '')};
`;
  const CalendarGraphCard = React__default.forwardRef(function cardRender({ subject, bodyPreview, start, end, location }, ref) {
      return (React__default.createElement(CalendarGraphCardOuter, { ref: ref },
          React__default.createElement(CalendarGraphCardContainer, null,
              React__default.createElement(CalendarGraphCardSubjet, null, subject),
              bodyPreview && (React__default.createElement(CalendarGraphCardBodyPreview, null,
                  React__default.createElement("div", null,
                      "Organisateur : ",
                      bodyPreview))),
              React__default.createElement("div", null,
                  React__default.createElement("div", null,
                      "D\u00E9but : ",
                      start),
                  React__default.createElement("div", null,
                      "Fin : ",
                      end)),
              React__default.createElement("div", null,
                  "Lieu : ",
                  location == undefined ? 'inconnu' : location))));
  });

  const MainContainer = newStyled.div `
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;
  const MainConversation = (props) => {
      const container = React.useRef(null);
      const { children } = props, restProps = __rest(props, ["children"]);
      React.useEffect(() => {
          if (container.current) {
              const scroll = () => {
                  if (container.current) {
                      container.current.scrollTop = container.current.scrollHeight;
                  }
              };
              scroll();
              const images = container.current.querySelectorAll('img');
              images.forEach((img) => {
                  if (!img.onload) {
                      img.onload = scroll;
                  }
              });
          }
      });
      return (React__default.createElement(MainContainer, Object.assign({ ref: container }, restProps), children));
  };

  function Launcher({ openLabel, closeLabel }) {
      return (React__default.createElement("button", { type: "button", className: 'mgen-launcher' }, React__default.createElement("img", { src: '../src/components/Launcher/assets/launcher_button.svg', className: "mgen-close-launcher", alt: openLabel })));
  }

  const ChatApp = newStyled.div `
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 1%;
  bottom: 1%;

  ${prop('theme.overrides.card.cardContainer', '')};
`;
  const Container = newStyled.div `
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 1px #b5b5b5;
  width: 20em;
  position: fixed;
  right: 1%;
  bottom: 1%;
  max-height: 60%;
  min-height: 430px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;

  ${prop('theme.overrides.card.cardContainer', '')};
`;
  const SenderContainer = newStyled.div `
  align-items: center;
  display: flex;
  background-color: #f4f7f9;
  min-height: 30px;
  padding: 15px 5px;
`;
  const MainContainer$1 = newStyled.div `
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;
  const HeaderContainer = newStyled.div `
  background-color: #6aa617;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: -5px 2px 19px -4px black;
  min-height: 55px;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 1;
  .#{$namespace}avatar {
    all: initial;
    height: 31px;
    width: 31px;
    position: absolute;
    top: 12px;
    left: 14px;
  }
`;
  const Chat = ({ endPoint, referralParameter, timeoutBetweenMessage = 700, widgets = {}, }) => {
      const { messages, quickReplies, loading, sendMessage, sendQuickReply, sendAction, sendReferralParameter, sseInitPromise, sseInitializing, } = useTock(endPoint);
      const [displayableMessageCount, setDisplayableMessageCount] = React.useState(0);
      React.useEffect(() => {
          if (referralParameter) {
              sseInitPromise.then(() => sendReferralParameter(referralParameter));
          }
      }, [sendReferralParameter, referralParameter]);
      React.useEffect(() => {
          if (messages.length > displayableMessageCount) {
              setTimeout(() => {
                  setDisplayableMessageCount(displayableMessageCount + 1);
              }, timeoutBetweenMessage);
          }
      }, [messages, displayableMessageCount]);
      return (React__default.createElement("div", { className: "class" },
          React__default.createElement(ChatApp, null,
              React__default.createElement(Container, null,
                  React__default.createElement(HeaderContainer, null, "Chatbot MGEN"),
                  React__default.createElement(MainConversation, null,
                      React__default.createElement(Conversation, { className: "conversation" },
                          messages
                              .slice(0, displayableMessageCount)
                              .map((message, i) => {
                              if (message.type === 'widget') {
                                  const WidgetComponent = widgets[message.widgetData.type] || DefaultWidget;
                                  return (React__default.createElement(WidgetComponent, Object.assign({ key: i }, message.widgetData.data)));
                              }
                              else if (message.type === 'message') {
                                  return message.author === 'bot' ? (React__default.createElement(MessageBot, { key: i, message: message, sendAction: sendAction })) : (React__default.createElement(MessageUser, { key: i }, message.message));
                              }
                              else if (message.type === 'card') {
                                  return (React__default.createElement(Card, Object.assign({ sendAction: sendAction, key: i }, message)));
                              }
                              else if (message.type === 'carousel') {
                                  return (React__default.createElement(Carousel, { key: i }, message.cards.map((card, ic) => card.type == 'card' ? (React__default.createElement(Card, Object.assign({ sendAction: sendAction, key: ic }, card))) : (React__default.createElement(CalendarGraphCard, Object.assign({ key: ic }, card))))));
                              }
                              return null;
                          }),
                          loading && React__default.createElement(Loader, null))),
                  React__default.createElement("footer", null,
                      displayableMessageCount === messages.length && (React__default.createElement(QuickReplyList, null, quickReplies.map((qr, i) => (React__default.createElement(QuickReply$1, { key: i, onClick: sendQuickReply.bind(null, qr.label, qr.payload) }, qr.label))))),
                      React__default.createElement(SenderContainer, null,
                          React__default.createElement(ChatInput, { disabled: sseInitializing, onSubmit: sendMessage })))),
              React__default.createElement(Launcher, { openLabel: "conversation opened", closeLabel: "conversation closed" }))));
  };

  const Container$1 = newStyled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${prop('theme.typography.fontFamily')};
  font-size: ${prop('theme.typography.fontSize')};

  & > *:first-child {
    flex: 1;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0px; /* Remove scrollbar space */
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }

  & > *:not(:first-child) {
    flex: unset;
  }

  & * {
    font: inherit;
  }

  ${prop('theme.overrides.chat', '')};
`;

  const defaultTheme = {
      palette: {
          text: {
              user: 'black',
              bot: 'white',
              card: 'black',
              input: 'black',
          },
          background: {
              user: readableColor('black'),
              bot: readableColor('white'),
              card: readableColor('black'),
              input: readableColor('black'),
              inputDisabled: '#b6b4b4',
          },
      },
      sizing: {
          loaderSize: '8px',
          borderRadius: '1em',
          conversation: {
              width: '720px',
          },
      },
      typography: {
          fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif',
          fontSize: '16px',
      },
  };

  const renderChat = (container, endPoint, referralParameter, theme = defaultTheme, options = {}) => {
      ReactDOM.render(React__default.createElement(ThemeProvider, { theme: createTockTheme(theme) },
          React__default.createElement(TockContext, null,
              React__default.createElement(Chat, { endPoint: endPoint, referralParameter: referralParameter, timeoutBetweenMessage: options.timeoutBetweenMessage, widgets: options.widgets }))), container);
  };

  function createTockTheme(theme) {
      return cjs(defaultTheme, theme);
  }

  exports.Card = Card;
  exports.CardContainer = CardContainer;
  exports.CardOuter = CardOuter;
  exports.Carousel = Carousel;
  exports.Chat = Chat;
  exports.ChatInput = ChatInput;
  exports.Container = Container$1;
  exports.Conversation = Conversation;
  exports.Message = Message;
  exports.MessageBot = MessageBot;
  exports.MessageContainer = MessageContainer;
  exports.MessageUser = MessageUser;
  exports.QuickReply = QuickReply$1;
  exports.QuickReplyList = QuickReplyList;
  exports.ThemeProvider = TockThemeProvider;
  exports.TockContext = TockContext;
  exports.createTheme = createTockTheme;
  exports.renderChat = renderChat;
  exports.useTock = useTock;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
