define(function(require, exports, module) {
function parse(n) {
  if ("string" != typeof n) {
    var t = new TypeError("The regexp to parse must be represented as a string.");
    throw t;
  }
  return index = 1, cgs = {}, parser.parse(n);
}

function Token(n) {
  this.type = n, this.offset = Token.offset(), this.text = Token.text();
}

function Alternate(n, t) {
  Token.call(this, "alternate"), this.left = n, this.right = t;
}

function Match(n) {
  Token.call(this, "match"), this.body = n.filter(Boolean);
}

function Group(n, t) {
  Token.call(this, n), this.body = t;
}

function CaptureGroup(n) {
  Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
  this.body = n;
}

function Quantified(n, t) {
  Token.call(this, "quantified"), this.body = n, this.quantifier = t;
}

function Quantifier(n, t) {
  Token.call(this, "quantifier"), this.min = n, this.max = t, this.greedy = !0;
}

function CharSet(n, t) {
  Token.call(this, "charset"), this.invert = n, this.body = t;
}

function CharacterRange(n, t) {
  Token.call(this, "range"), this.start = n, this.end = t;
}

function Literal(n) {
  Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
}

function Unicode(n) {
  Token.call(this, "unicode"), this.code = n.toUpperCase();
}

function Hex(n) {
  Token.call(this, "hex"), this.code = n.toUpperCase();
}

function Octal(n) {
  Token.call(this, "octal"), this.code = n.toUpperCase();
}

function BackReference(n) {
  Token.call(this, "back-reference"), this.code = n.toUpperCase();
}

function ControlCharacter(n) {
  Token.call(this, "control-character"), this.code = n.toUpperCase();
}

var parser = function() {
  function n(n, t) {
    function r() {
      this.constructor = n;
    }
    r.prototype = t.prototype, n.prototype = new r();
  }
  function t(n, t, r, e, l) {
    function u(n, t) {
      function r(n) {
        function t(n) {
          return n.charCodeAt(0).toString(16).toUpperCase();
        }
        return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n) {
          return "\\x0" + t(n);
        }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n) {
          return "\\x" + t(n);
        }).replace(/[\u0180-\u0FFF]/g, function(n) {
          return "\\u0" + t(n);
        }).replace(/[\u1080-\uFFFF]/g, function(n) {
          return "\\u" + t(n);
        });
      }
      var e, l;
      switch (n.length) {
       case 0:
        e = "end of input";
        break;

       case 1:
        e = n[0];
        break;

       default:
        e = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];
      }
      return l = t ? '"' + r(t) + '"' : "end of input", "Expected " + e + " but " + l + " found.";
    }
    this.expected = n, this.found = t, this.offset = r, this.line = e, this.column = l,
    this.name = "SyntaxError", this.message = u(n, t);
  }
  function r(n) {
    function r() {
      return n.substring(Ee, Me);
    }
    function e() {
      return Ee;
    }
    function l(t) {
      function r(t, r, e) {
        var l, u;
        for (l = r; e > l; l++) u = n.charAt(l), "\n" === u ? (t.seenCR || t.line++, t.column = 1,
        t.seenCR = !1) : "\r" === u || "\u2028" === u || "\u2029" === u ? (t.line++, t.column = 1,
        t.seenCR = !0) : (t.column++, t.seenCR = !1);
      }
      return He !== t && (He > t && (He = 0, $e = {
        line: 1,
        column: 1,
        seenCR: !1
      }), r($e, He, t), He = t), $e;
    }
    function u(n) {
      qe > Me || (Me > qe && (qe = Me, De = []), De.push(n));
    }
    function o(n) {
      var t = 0;
      for (n.sort(); t < n.length; ) n[t - 1] === n[t] ? n.splice(t, 1) : t++;
    }
    function c() {
      var t, r, e, l, o;
      return t = Me, r = a(), null !== r ? (e = Me, 124 === n.charCodeAt(Me) ? (l = st,
      Me++) : (l = null, 0 === We && u(ft)), null !== l ? (o = c(), null !== o ? (l = [ l, o ],
      e = l) : (Me = e, e = at)) : (Me = e, e = at), null === e && (e = it), null !== e ? (Ee = t,
      r = pt(r, e), null === r ? (Me = t, t = r) : t = r) : (Me = t, t = at)) : (Me = t,
      t = at), t;
    }
    function a() {
      var n, t, r, e, l;
      if (n = Me, t = s(), null === t && (t = it), null !== t) if (r = Me, We++, e = h(),
      We--, null === e ? r = it : (Me = r, r = at), null !== r) {
        for (e = [], l = p(), null === l && (l = i()); null !== l; ) e.push(l), l = p(),
        null === l && (l = i());
        null !== e ? (l = f(), null === l && (l = it), null !== l ? (Ee = n, t = ht(t, e, l),
        null === t ? (Me = n, n = t) : n = t) : (Me = n, n = at)) : (Me = n, n = at);
      } else Me = n, n = at; else Me = n, n = at;
      return n;
    }
    function i() {
      var n;
      return n = T(), null === n && (n = j(), null === n && (n = U())), n;
    }
    function s() {
      var t, r;
      return t = Me, 94 === n.charCodeAt(Me) ? (r = dt, Me++) : (r = null, 0 === We && u(Ct)),
      null !== r && (Ee = t, r = kt()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function f() {
      var t, r;
      return t = Me, 36 === n.charCodeAt(Me) ? (r = vt, Me++) : (r = null, 0 === We && u(yt)),
      null !== r && (Ee = t, r = bt()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function p() {
      var n, t, r;
      return n = Me, t = i(), null !== t ? (r = h(), null !== r ? (Ee = n, t = At(t, r),
      null === t ? (Me = n, n = t) : n = t) : (Me = n, n = at)) : (Me = n, n = at), n;
    }
    function h() {
      var n, t, r;
      return We++, n = Me, t = d(), null !== t ? (r = w(), null === r && (r = it), null !== r ? (Ee = n,
      t = xt(t, r), null === t ? (Me = n, n = t) : n = t) : (Me = n, n = at)) : (Me = n,
      n = at), We--, null === n && (t = null, 0 === We && u(wt)), n;
    }
    function d() {
      var n;
      return n = C(), null === n && (n = k(), null === n && (n = v(), null === n && (n = y(),
      null === n && (n = b(), null === n && (n = A()))))), n;
    }
    function C() {
      var t, r, e, l, o, c;
      return t = Me, 123 === n.charCodeAt(Me) ? (r = Tt, Me++) : (r = null, 0 === We && u(gt)),
      null !== r ? (e = x(), null !== e ? (44 === n.charCodeAt(Me) ? (l = Rt, Me++) : (l = null,
      0 === We && u(Ot)), null !== l ? (o = x(), null !== o ? (125 === n.charCodeAt(Me) ? (c = Qt,
      Me++) : (c = null, 0 === We && u(jt)), null !== c ? (Ee = t, r = mt(e, o), null === r ? (Me = t,
      t = r) : t = r) : (Me = t, t = at)) : (Me = t, t = at)) : (Me = t, t = at)) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function k() {
      var t, r, e, l;
      return t = Me, 123 === n.charCodeAt(Me) ? (r = Tt, Me++) : (r = null, 0 === We && u(gt)),
      null !== r ? (e = x(), null !== e ? (n.substr(Me, 2) === Gt ? (l = Gt, Me += 2) : (l = null,
      0 === We && u(Ft)), null !== l ? (Ee = t, r = St(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at)) : (Me = t, t = at), t;
    }
    function v() {
      var t, r, e, l;
      return t = Me, 123 === n.charCodeAt(Me) ? (r = Tt, Me++) : (r = null, 0 === We && u(gt)),
      null !== r ? (e = x(), null !== e ? (125 === n.charCodeAt(Me) ? (l = Qt, Me++) : (l = null,
      0 === We && u(jt)), null !== l ? (Ee = t, r = Ut(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at)) : (Me = t, t = at), t;
    }
    function y() {
      var t, r;
      return t = Me, 43 === n.charCodeAt(Me) ? (r = Bt, Me++) : (r = null, 0 === We && u(Lt)),
      null !== r && (Ee = t, r = Mt()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function b() {
      var t, r;
      return t = Me, 42 === n.charCodeAt(Me) ? (r = Et, Me++) : (r = null, 0 === We && u(Ht)),
      null !== r && (Ee = t, r = $t()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function A() {
      var t, r;
      return t = Me, 63 === n.charCodeAt(Me) ? (r = qt, Me++) : (r = null, 0 === We && u(Dt)),
      null !== r && (Ee = t, r = Wt()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function w() {
      var t;
      return 63 === n.charCodeAt(Me) ? (t = qt, Me++) : (t = null, 0 === We && u(Dt)),
      t;
    }
    function x() {
      var t, r, e;
      if (t = Me, r = [], zt.test(n.charAt(Me)) ? (e = n.charAt(Me), Me++) : (e = null,
      0 === We && u(It)), null !== e) for (;null !== e; ) r.push(e), zt.test(n.charAt(Me)) ? (e = n.charAt(Me),
      Me++) : (e = null, 0 === We && u(It)); else r = at;
      return null !== r && (Ee = t, r = Jt(r)), null === r ? (Me = t, t = r) : t = r,
      t;
    }
    function T() {
      var t, r, e, l;
      return t = Me, 40 === n.charCodeAt(Me) ? (r = Kt, Me++) : (r = null, 0 === We && u(Nt)),
      null !== r ? (e = O(), null === e && (e = Q(), null === e && (e = R(), null === e && (e = g()))),
      null !== e ? (41 === n.charCodeAt(Me) ? (l = Pt, Me++) : (l = null, 0 === We && u(Vt)),
      null !== l ? (Ee = t, r = Xt(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at)) : (Me = t, t = at), t;
    }
    function g() {
      var n, t;
      return n = Me, t = c(), null !== t && (Ee = n, t = Yt(t)), null === t ? (Me = n,
      n = t) : n = t, n;
    }
    function R() {
      var t, r, e;
      return t = Me, n.substr(Me, 2) === Zt ? (r = Zt, Me += 2) : (r = null, 0 === We && u(_t)),
      null !== r ? (e = c(), null !== e ? (Ee = t, r = nr(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function O() {
      var t, r, e;
      return t = Me, n.substr(Me, 2) === tr ? (r = tr, Me += 2) : (r = null, 0 === We && u(rr)),
      null !== r ? (e = c(), null !== e ? (Ee = t, r = er(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function Q() {
      var t, r, e;
      return t = Me, n.substr(Me, 2) === lr ? (r = lr, Me += 2) : (r = null, 0 === We && u(ur)),
      null !== r ? (e = c(), null !== e ? (Ee = t, r = or(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function j() {
      var t, r, e, l, o;
      if (We++, t = Me, 91 === n.charCodeAt(Me) ? (r = ar, Me++) : (r = null, 0 === We && u(ir)),
      null !== r) if (94 === n.charCodeAt(Me) ? (e = dt, Me++) : (e = null, 0 === We && u(Ct)),
      null === e && (e = it), null !== e) {
        for (l = [], o = m(), null === o && (o = G()); null !== o; ) l.push(o), o = m(),
        null === o && (o = G());
        null !== l ? (93 === n.charCodeAt(Me) ? (o = sr, Me++) : (o = null, 0 === We && u(fr)),
        null !== o ? (Ee = t, r = pr(e, l), null === r ? (Me = t, t = r) : t = r) : (Me = t,
        t = at)) : (Me = t, t = at);
      } else Me = t, t = at; else Me = t, t = at;
      return We--, null === t && (r = null, 0 === We && u(cr)), t;
    }
    function m() {
      var t, r, e, l;
      return We++, t = Me, r = G(), null !== r ? (45 === n.charCodeAt(Me) ? (e = dr, Me++) : (e = null,
      0 === We && u(Cr)), null !== e ? (l = G(), null !== l ? (Ee = t, r = kr(r, l), null === r ? (Me = t,
      t = r) : t = r) : (Me = t, t = at)) : (Me = t, t = at)) : (Me = t, t = at), We--,
      null === t && (r = null, 0 === We && u(hr)), t;
    }
    function G() {
      var n, t;
      return We++, n = S(), null === n && (n = F()), We--, null === n && (t = null, 0 === We && u(vr)),
      n;
    }
    function F() {
      var t, r;
      return t = Me, yr.test(n.charAt(Me)) ? (r = n.charAt(Me), Me++) : (r = null, 0 === We && u(br)),
      null !== r && (Ee = t, r = Ar(r)), null === r ? (Me = t, t = r) : t = r, t;
    }
    function S() {
      var n;
      return n = E(), null === n && (n = Y(), null === n && (n = q(), null === n && (n = D(),
      null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(),
      null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(),
      null === n && (n = X(), null === n && (n = _(), null === n && (n = nt(), null === n && (n = tt(),
      null === n && (n = rt(), null === n && (n = et()))))))))))))))))), n;
    }
    function U() {
      var n;
      return n = B(), null === n && (n = M(), null === n && (n = L())), n;
    }
    function B() {
      var t, r;
      return t = Me, 46 === n.charCodeAt(Me) ? (r = wr, Me++) : (r = null, 0 === We && u(xr)),
      null !== r && (Ee = t, r = Tr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function L() {
      var t, r;
      return We++, t = Me, Rr.test(n.charAt(Me)) ? (r = n.charAt(Me), Me++) : (r = null,
      0 === We && u(Or)), null !== r && (Ee = t, r = Ar(r)), null === r ? (Me = t, t = r) : t = r,
      We--, null === t && (r = null, 0 === We && u(gr)), t;
    }
    function M() {
      var n;
      return n = H(), null === n && (n = $(), null === n && (n = Y(), null === n && (n = q(),
      null === n && (n = D(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(),
      null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(),
      null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(),
      null === n && (n = nt(), null === n && (n = tt(), null === n && (n = rt(), null === n && (n = et()))))))))))))))))))),
      n;
    }
    function E() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Qr ? (r = Qr, Me += 2) : (r = null, 0 === We && u(jr)),
      null !== r && (Ee = t, r = mr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function H() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Qr ? (r = Qr, Me += 2) : (r = null, 0 === We && u(jr)),
      null !== r && (Ee = t, r = Gr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function $() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Fr ? (r = Fr, Me += 2) : (r = null, 0 === We && u(Sr)),
      null !== r && (Ee = t, r = Ur()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function q() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Br ? (r = Br, Me += 2) : (r = null, 0 === We && u(Lr)),
      null !== r && (Ee = t, r = Mr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function D() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Er ? (r = Er, Me += 2) : (r = null, 0 === We && u(Hr)),
      null !== r && (Ee = t, r = $r()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function W() {
      var t, r;
      return t = Me, n.substr(Me, 2) === qr ? (r = qr, Me += 2) : (r = null, 0 === We && u(Dr)),
      null !== r && (Ee = t, r = Wr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function z() {
      var t, r;
      return t = Me, n.substr(Me, 2) === zr ? (r = zr, Me += 2) : (r = null, 0 === We && u(Ir)),
      null !== r && (Ee = t, r = Jr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function I() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Kr ? (r = Kr, Me += 2) : (r = null, 0 === We && u(Nr)),
      null !== r && (Ee = t, r = Pr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function J() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Vr ? (r = Vr, Me += 2) : (r = null, 0 === We && u(Xr)),
      null !== r && (Ee = t, r = Yr()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function K() {
      var t, r;
      return t = Me, n.substr(Me, 2) === Zr ? (r = Zr, Me += 2) : (r = null, 0 === We && u(_r)),
      null !== r && (Ee = t, r = ne()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function N() {
      var t, r;
      return t = Me, n.substr(Me, 2) === te ? (r = te, Me += 2) : (r = null, 0 === We && u(re)),
      null !== r && (Ee = t, r = ee()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function P() {
      var t, r;
      return t = Me, n.substr(Me, 2) === le ? (r = le, Me += 2) : (r = null, 0 === We && u(ue)),
      null !== r && (Ee = t, r = oe()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function V() {
      var t, r;
      return t = Me, n.substr(Me, 2) === ce ? (r = ce, Me += 2) : (r = null, 0 === We && u(ae)),
      null !== r && (Ee = t, r = ie()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function X() {
      var t, r;
      return t = Me, n.substr(Me, 2) === se ? (r = se, Me += 2) : (r = null, 0 === We && u(fe)),
      null !== r && (Ee = t, r = pe()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function Y() {
      var t, r, e;
      return t = Me, n.substr(Me, 2) === he ? (r = he, Me += 2) : (r = null, 0 === We && u(de)),
      null !== r ? (n.length > Me ? (e = n.charAt(Me), Me++) : (e = null, 0 === We && u(Ce)),
      null !== e ? (Ee = t, r = ke(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function Z() {
      var t, r, e;
      return t = Me, 92 === n.charCodeAt(Me) ? (r = ve, Me++) : (r = null, 0 === We && u(ye)),
      null !== r ? (be.test(n.charAt(Me)) ? (e = n.charAt(Me), Me++) : (e = null, 0 === We && u(Ae)),
      null !== e ? (Ee = t, r = we(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    function _() {
      var t, r, e, l;
      if (t = Me, n.substr(Me, 2) === xe ? (r = xe, Me += 2) : (r = null, 0 === We && u(Te)),
      null !== r) {
        if (e = [], ge.test(n.charAt(Me)) ? (l = n.charAt(Me), Me++) : (l = null, 0 === We && u(Re)),
        null !== l) for (;null !== l; ) e.push(l), ge.test(n.charAt(Me)) ? (l = n.charAt(Me),
        Me++) : (l = null, 0 === We && u(Re)); else e = at;
        null !== e ? (Ee = t, r = Oe(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
        t = at);
      } else Me = t, t = at;
      return t;
    }
    function nt() {
      var t, r, e, l;
      if (t = Me, n.substr(Me, 2) === Qe ? (r = Qe, Me += 2) : (r = null, 0 === We && u(je)),
      null !== r) {
        if (e = [], me.test(n.charAt(Me)) ? (l = n.charAt(Me), Me++) : (l = null, 0 === We && u(Ge)),
        null !== l) for (;null !== l; ) e.push(l), me.test(n.charAt(Me)) ? (l = n.charAt(Me),
        Me++) : (l = null, 0 === We && u(Ge)); else e = at;
        null !== e ? (Ee = t, r = Fe(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
        t = at);
      } else Me = t, t = at;
      return t;
    }
    function tt() {
      var t, r, e, l;
      if (t = Me, n.substr(Me, 2) === Se ? (r = Se, Me += 2) : (r = null, 0 === We && u(Ue)),
      null !== r) {
        if (e = [], me.test(n.charAt(Me)) ? (l = n.charAt(Me), Me++) : (l = null, 0 === We && u(Ge)),
        null !== l) for (;null !== l; ) e.push(l), me.test(n.charAt(Me)) ? (l = n.charAt(Me),
        Me++) : (l = null, 0 === We && u(Ge)); else e = at;
        null !== e ? (Ee = t, r = Be(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
        t = at);
      } else Me = t, t = at;
      return t;
    }
    function rt() {
      var t, r;
      return t = Me, n.substr(Me, 2) === xe ? (r = xe, Me += 2) : (r = null, 0 === We && u(Te)),
      null !== r && (Ee = t, r = Le()), null === r ? (Me = t, t = r) : t = r, t;
    }
    function et() {
      var t, r, e;
      return t = Me, 92 === n.charCodeAt(Me) ? (r = ve, Me++) : (r = null, 0 === We && u(ye)),
      null !== r ? (n.length > Me ? (e = n.charAt(Me), Me++) : (e = null, 0 === We && u(Ce)),
      null !== e ? (Ee = t, r = Ar(e), null === r ? (Me = t, t = r) : t = r) : (Me = t,
      t = at)) : (Me = t, t = at), t;
    }
    var lt, ut = arguments.length > 1 ? arguments[1] : {}, ot = {
      regexp: c
    }, ct = c, at = null, it = "", st = "|", ft = '"|"', pt = function(n, t) {
      return t ? new Alternate(n, t[1]) : n;
    }, ht = function(n, t, r) {
      return new Match([ n ].concat(t).concat([ r ]));
    }, dt = "^", Ct = '"^"', kt = function() {
      return new Token("start");
    }, vt = "$", yt = '"$"', bt = function() {
      return new Token("end");
    }, At = function(n, t) {
      return new Quantified(n, t);
    }, wt = "Quantifier", xt = function(n, t) {
      return t && (n.greedy = !1), n;
    }, Tt = "{", gt = '"{"', Rt = ",", Ot = '","', Qt = "}", jt = '"}"', mt = function(n, t) {
      return new Quantifier(n, t);
    }, Gt = ",}", Ft = '",}"', St = function(n) {
      return new Quantifier(n, 1/0);
    }, Ut = function(n) {
      return new Quantifier(n, n);
    }, Bt = "+", Lt = '"+"', Mt = function() {
      return new Quantifier(1, 1/0);
    }, Et = "*", Ht = '"*"', $t = function() {
      return new Quantifier(0, 1/0);
    }, qt = "?", Dt = '"?"', Wt = function() {
      return new Quantifier(0, 1);
    }, zt = /^[0-9]/, It = "[0-9]", Jt = function(n) {
      return +n.join("");
    }, Kt = "(", Nt = '"("', Pt = ")", Vt = '")"', Xt = function(n) {
      return n;
    }, Yt = function(n) {
      return new CaptureGroup(n);
    }, Zt = "?:", _t = '"?:"', nr = function(n) {
      return new Group("non-capture-group", n);
    }, tr = "?=", rr = '"?="', er = function(n) {
      return new Group("positive-lookahead", n);
    }, lr = "?!", ur = '"?!"', or = function(n) {
      return new Group("negative-lookahead", n);
    }, cr = "CharacterSet", ar = "[", ir = '"["', sr = "]", fr = '"]"', pr = function(n, t) {
      return new CharSet(!!n, t);
    }, hr = "CharacterRange", dr = "-", Cr = '"-"', kr = function(n, t) {
      return new CharacterRange(n, t);
    }, vr = "Character", yr = /^[^\\\]]/, br = "[^\\\\\\]]", Ar = function(n) {
      return new Literal(n);
    }, wr = ".", xr = '"."', Tr = function() {
      return new Token("any-character");
    }, gr = "Literal", Rr = /^[^|\\\/.[()?+*$\^]/, Or = "[^|\\\\\\/.[()?+*$\\^]", Qr = "\\b", jr = '"\\\\b"', mr = function() {
      return new Token("backspace");
    }, Gr = function() {
      return new Token("word-boundary");
    }, Fr = "\\B", Sr = '"\\\\B"', Ur = function() {
      return new Token("non-word-boundary");
    }, Br = "\\d", Lr = '"\\\\d"', Mr = function() {
      return new Token("digit");
    }, Er = "\\D", Hr = '"\\\\D"', $r = function() {
      return new Token("non-digit");
    }, qr = "\\f", Dr = '"\\\\f"', Wr = function() {
      return new Token("form-feed");
    }, zr = "\\n", Ir = '"\\\\n"', Jr = function() {
      return new Token("line-feed");
    }, Kr = "\\r", Nr = '"\\\\r"', Pr = function() {
      return new Token("carriage-return");
    }, Vr = "\\s", Xr = '"\\\\s"', Yr = function() {
      return new Token("white-space");
    }, Zr = "\\S", _r = '"\\\\S"', ne = function() {
      return new Token("non-white-space");
    }, te = "\\t", re = '"\\\\t"', ee = function() {
      return new Token("tab");
    }, le = "\\v", ue = '"\\\\v"', oe = function() {
      return new Token("vertical-tab");
    }, ce = "\\w", ae = '"\\\\w"', ie = function() {
      return new Token("word");
    }, se = "\\W", fe = '"\\\\W"', pe = function() {
      return new Token("non-word");
    }, he = "\\c", de = '"\\\\c"', Ce = "any character", ke = function(n) {
      return new ControlCharacter(n);
    }, ve = "\\", ye = '"\\\\"', be = /^[1-9]/, Ae = "[1-9]", we = function(n) {
      return new BackReference(n);
    }, xe = "\\0", Te = '"\\\\0"', ge = /^[0-7]/, Re = "[0-7]", Oe = function(n) {
      return new Octal(n.join(""));
    }, Qe = "\\x", je = '"\\\\x"', me = /^[0-9a-fA-F]/, Ge = "[0-9a-fA-F]", Fe = function(n) {
      return new Hex(n.join(""));
    }, Se = "\\u", Ue = '"\\\\u"', Be = function(n) {
      return new Unicode(n.join(""));
    }, Le = function() {
      return new Token("null-character");
    }, Me = 0, Ee = 0, He = 0, $e = {
      line: 1,
      column: 1,
      seenCR: !1
    }, qe = 0, De = [], We = 0;
    if ("startRule" in ut) {
      if (!(ut.startRule in ot)) throw new Error("Can't start parsing from rule \"" + ut.startRule + '".');
      ct = ot[ut.startRule];
    }
    if (Token.offset = e, Token.text = r, lt = ct(), null !== lt && Me === n.length) return lt;
    throw o(De), Ee = Math.max(Me, qe), new t(De, Ee < n.length ? n.charAt(Ee) : null, Ee, l(Ee).line, l(Ee).column);
  }
  return n(t, Error), {
    SyntaxError: t,
    parse: r
  };
}(), index = 1, cgs = {};

exports = module.exports = parse, exports.Token = Token, exports.Alternate = Alternate,
Alternate.prototype = Object.create(Token.prototype), Alternate.prototype.constructor = Alternate,
exports.Match = Match, Match.prototype = Object.create(Token.prototype), Match.prototype.constructor = Match,
exports.Group = Group, Group.prototype = Object.create(Token.prototype), Group.prototype.constructor = Group,
exports.CaptureGroup = CaptureGroup, CaptureGroup.prototype = Object.create(Group.prototype),
CaptureGroup.prototype.constructor = CaptureGroup, exports.Quantified = Quantified,
Quantified.prototype = Object.create(Token.prototype), Quantified.prototype.constructor = Quantified,
exports.Quantifier = Quantifier, Quantifier.prototype = Object.create(Token.prototype),
Quantifier.prototype.constructor = Quantifier, exports.CharSet = CharSet, CharSet.prototype = Object.create(Token.prototype),
CharSet.prototype.constructor = CharSet, exports.CharacterRange = CharacterRange,
CharacterRange.prototype = Object.create(Token.prototype), CharacterRange.prototype.constructor = CharacterRange,
exports.Literal = Literal, Literal.prototype = Object.create(Token.prototype), Literal.prototype.constructor = Literal,
exports.Unicode = Unicode, Unicode.prototype = Object.create(Token.prototype), Unicode.prototype.constructor = Unicode,
exports.Hex = Hex, Hex.prototype = Object.create(Token.prototype), Hex.prototype.constructor = Hex,
exports.Octal = Octal, Octal.prototype = Object.create(Token.prototype), Octal.prototype.constructor = Octal,
exports.BackReference = BackReference, BackReference.prototype = Object.create(Token.prototype),
BackReference.prototype.constructor = BackReference, exports.ControlCharacter = ControlCharacter,
ControlCharacter.prototype = Object.create(Token.prototype), ControlCharacter.prototype.constructor = ControlCharacter;
});
