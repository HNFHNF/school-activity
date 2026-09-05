var sn = Object.defineProperty;
var ln = (k, U, x) => U in k ? sn(k, U, { enumerable: !0, configurable: !0, writable: !0, value: x }) : k[U] = x;
var C = (k, U, x) => ln(k, typeof U != "symbol" ? U + "" : U, x);
import fn from "node:fs";
import hn from "node:crypto";
function pn(k, U) {
  for (var x = 0; x < U.length; x++) {
    const F = U[x];
    if (typeof F != "string" && !Array.isArray(F)) {
      for (const B in F)
        if (B !== "default" && !(B in k)) {
          const ae = Object.getOwnPropertyDescriptor(F, B);
          ae && Object.defineProperty(k, B, ae.get ? ae : {
            enumerable: !0,
            get: () => F[B]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(k, Symbol.toStringTag, { value: "Module" }));
}
function mn(k) {
  return k && k.__esModule && Object.prototype.hasOwnProperty.call(k, "default") ? k.default : k;
}
var sr = { exports: {} };
(function(k, U) {
  var x = void 0, F = function(B) {
    return x || (x = new Promise(function(ae, fr) {
      var Ct, Ht, Zt, Jt, Kt;
      var z = typeof B < "u" ? B : {}, pt = z.onAbort;
      z.onAbort = function(e) {
        fr(new Error(e)), pt && pt(e);
      }, z.postRun = z.postRun || [], z.postRun.push(function() {
        ae(z);
      }), k = void 0;
      var u;
      u || (u = typeof z < "u" ? z : {});
      var hr = !!globalThis.window, We = !!globalThis.WorkerGlobalScope, ve = ((Ht = (Ct = globalThis.process) == null ? void 0 : Ct.versions) == null ? void 0 : Ht.node) && ((Zt = globalThis.process) == null ? void 0 : Zt.type) != "renderer";
      u.onRuntimeInitialized = function() {
        function e(o, l) {
          switch (typeof l) {
            case "boolean":
              an(o, l ? 1 : 0);
              break;
            case "number":
              rn(o, l);
              break;
            case "string":
              nn(o, l, -1, -1);
              break;
            case "object":
              if (l === null) ir(o);
              else if (l.length != null) {
                var h = De(l.length);
                M.set(l, h), on(o, h, l.length, -1), de(h);
              } else Ie(o, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
              break;
            default:
              ir(o);
          }
        }
        function t(o, l) {
          for (var h = [], p = 0; p < o; p += 1) {
            var d = Q(l + 4 * p, "i32"), w = Jr(d);
            if (w === 1 || w === 2) d = tn(d);
            else if (w === 3) d = Gr(d);
            else if (w === 4) {
              w = d, d = Kr(w), w = en(w);
              for (var P = new Uint8Array(d), L = 0; L < d; L += 1) P[L] = M[w + L];
              d = P;
            } else d = null;
            h.push(d);
          }
          return h;
        }
        function r(o, l) {
          this.Qa = o, this.db = l, this.Oa = 1, this.mb = [];
        }
        function n(o, l) {
          if (this.db = l, this.fb = Ue(o), this.fb === null) throw Error("Unable to allocate memory for the SQL string");
          this.lb = this.fb, this.$a = this.sb = null;
        }
        function i(o) {
          if (this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0), o != null) {
            var l = this.filename, h = "/", p = l;
            if (h && (h = typeof h == "string" ? h : Ge(h), p = l ? Ze(h + "/" + l) : h), l = qt(!0, !0), p = Nr(
              p,
              l
            ), o) {
              if (typeof o == "string") {
                h = Array(o.length);
                for (var d = 0, w = o.length; d < w; ++d) h[d] = o.charCodeAt(d);
                o = h;
              }
              xe(p, l | 146), h = oe(p, 577), Qt(h, o, 0, o.length, 0), ot(h), xe(p, l);
            }
          }
          this.handleError(m(this.filename, a)), this.db = Q(a, "i32"), ar(this.db), this.gb = {}, this.Sa = {};
        }
        var a = ee(4), s = u.cwrap, m = s("sqlite3_open", "number", ["string", "number"]), y = s("sqlite3_close_v2", "number", ["number"]), b = s("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), g = s("sqlite3_changes", "number", ["number"]), N = s(
          "sqlite3_prepare_v2",
          "number",
          ["number", "string", "number", "number", "number"]
        ), Gt = s("sqlite3_sql", "string", ["number"]), Pr = s("sqlite3_normalized_sql", "string", ["number"]), er = s("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), Ur = s("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), tr = s("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), Dr = s("sqlite3_bind_double", "number", ["number", "number", "number"]), jr = s("sqlite3_bind_int", "number", [
          "number",
          "number",
          "number"
        ]), Ir = s("sqlite3_bind_parameter_index", "number", ["number", "string"]), Wr = s("sqlite3_step", "number", ["number"]), zr = s("sqlite3_errmsg", "string", ["number"]), Qr = s("sqlite3_column_count", "number", ["number"]), Fr = s("sqlite3_data_count", "number", ["number"]), Br = s("sqlite3_column_double", "number", ["number", "number"]), rr = s("sqlite3_column_text", "string", ["number", "number"]), $r = s("sqlite3_column_blob", "number", ["number", "number"]), Vr = s("sqlite3_column_bytes", "number", ["number", "number"]), Yr = s(
          "sqlite3_column_type",
          "number",
          ["number", "number"]
        ), Xr = s("sqlite3_column_name", "string", ["number", "number"]), Cr = s("sqlite3_reset", "number", ["number"]), Hr = s("sqlite3_clear_bindings", "number", ["number"]), Zr = s("sqlite3_finalize", "number", ["number"]), nr = s("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), Jr = s("sqlite3_value_type", "number", ["number"]), Kr = s("sqlite3_value_bytes", "number", ["number"]), Gr = s("sqlite3_value_text", "string", ["number"]), en = s(
          "sqlite3_value_blob",
          "number",
          ["number"]
        ), tn = s("sqlite3_value_double", "number", ["number"]), rn = s("sqlite3_result_double", "", ["number", "number"]), ir = s("sqlite3_result_null", "", ["number"]), nn = s("sqlite3_result_text", "", ["number", "string", "number", "number"]), on = s("sqlite3_result_blob", "", ["number", "number", "number", "number"]), an = s("sqlite3_result_int", "", ["number", "number"]), Ie = s("sqlite3_result_error", "", ["number", "string", "number"]), or = s("sqlite3_aggregate_context", "number", ["number", "number"]), ar = s(
          "RegisterExtensionFunctions",
          "number",
          ["number"]
        ), ur = s("sqlite3_update_hook", "number", ["number", "number", "number"]);
        r.prototype.bind = function(o) {
          if (!this.Qa) throw "Statement closed";
          return this.reset(), Array.isArray(o) ? this.Gb(o) : o != null && typeof o == "object" ? this.Hb(o) : !0;
        }, r.prototype.step = function() {
          if (!this.Qa) throw "Statement closed";
          this.Oa = 1;
          var o = Wr(this.Qa);
          switch (o) {
            case 100:
              return !0;
            case 101:
              return !1;
            default:
              throw this.db.handleError(o);
          }
        }, r.prototype.Ab = function(o) {
          return o == null && (o = this.Oa, this.Oa += 1), Br(this.Qa, o);
        }, r.prototype.Ob = function(o) {
          if (o == null && (o = this.Oa, this.Oa += 1), o = rr(this.Qa, o), typeof BigInt != "function") throw Error("BigInt is not supported");
          return BigInt(o);
        }, r.prototype.Tb = function(o) {
          return o == null && (o = this.Oa, this.Oa += 1), rr(this.Qa, o);
        }, r.prototype.getBlob = function(o) {
          o == null && (o = this.Oa, this.Oa += 1);
          var l = Vr(this.Qa, o);
          o = $r(this.Qa, o);
          for (var h = new Uint8Array(l), p = 0; p < l; p += 1) h[p] = M[o + p];
          return h;
        }, r.prototype.get = function(o, l) {
          l = l || {}, o != null && this.bind(o) && this.step(), o = [];
          for (var h = Fr(this.Qa), p = 0; p < h; p += 1) switch (Yr(this.Qa, p)) {
            case 1:
              var d = l.useBigInt ? this.Ob(p) : this.Ab(p);
              o.push(d);
              break;
            case 2:
              o.push(this.Ab(p));
              break;
            case 3:
              o.push(this.Tb(p));
              break;
            case 4:
              o.push(this.getBlob(p));
              break;
            default:
              o.push(null);
          }
          return o;
        }, r.prototype.qb = function() {
          for (var o = [], l = Qr(this.Qa), h = 0; h < l; h += 1) o.push(Xr(this.Qa, h));
          return o;
        }, r.prototype.zb = function(o, l) {
          o = this.get(o, l), l = this.qb();
          for (var h = {}, p = 0; p < l.length; p += 1) h[l[p]] = o[p];
          return h;
        }, r.prototype.Sb = function() {
          return Gt(this.Qa);
        }, r.prototype.Pb = function() {
          return Pr(this.Qa);
        }, r.prototype.run = function(o) {
          return o != null && this.bind(o), this.step(), this.reset();
        }, r.prototype.wb = function(o, l) {
          l == null && (l = this.Oa, this.Oa += 1), o = Ue(o), this.mb.push(o), this.db.handleError(Ur(this.Qa, l, o, -1, 0));
        }, r.prototype.Fb = function(o, l) {
          l == null && (l = this.Oa, this.Oa += 1);
          var h = De(o.length);
          M.set(o, h), this.mb.push(h), this.db.handleError(tr(this.Qa, l, h, o.length, 0));
        }, r.prototype.vb = function(o, l) {
          l == null && (l = this.Oa, this.Oa += 1), this.db.handleError((o === (o | 0) ? jr : Dr)(
            this.Qa,
            l,
            o
          ));
        }, r.prototype.Ib = function(o) {
          o == null && (o = this.Oa, this.Oa += 1), tr(this.Qa, o, 0, 0, 0);
        }, r.prototype.xb = function(o, l) {
          switch (l == null && (l = this.Oa, this.Oa += 1), typeof o) {
            case "string":
              this.wb(o, l);
              return;
            case "number":
              this.vb(o, l);
              return;
            case "bigint":
              this.wb(o.toString(), l);
              return;
            case "boolean":
              this.vb(o + 0, l);
              return;
            case "object":
              if (o === null) {
                this.Ib(l);
                return;
              }
              if (o.length != null) {
                this.Fb(o, l);
                return;
              }
          }
          throw "Wrong API use : tried to bind a value of an unknown type (" + o + ").";
        }, r.prototype.Hb = function(o) {
          var l = this;
          return Object.keys(o).forEach(function(h) {
            var p = Ir(l.Qa, h);
            p !== 0 && l.xb(o[h], p);
          }), !0;
        }, r.prototype.Gb = function(o) {
          for (var l = 0; l < o.length; l += 1) this.xb(o[l], l + 1);
          return !0;
        }, r.prototype.reset = function() {
          return this.freemem(), Hr(this.Qa) === 0 && Cr(this.Qa) === 0;
        }, r.prototype.freemem = function() {
          for (var o; (o = this.mb.pop()) !== void 0; ) de(o);
        }, r.prototype.Ya = function() {
          this.freemem();
          var o = Zr(this.Qa) === 0;
          return delete this.db.gb[this.Qa], this.Qa = 0, o;
        }, n.prototype.next = function() {
          if (this.fb === null) return { done: !0 };
          if (this.$a !== null && (this.$a.Ya(), this.$a = null), !this.db.db) throw this.ob(), Error("Database closed");
          var o = ye(), l = ee(4);
          he(a), he(l);
          try {
            this.db.handleError(er(this.db.db, this.lb, -1, a, l)), this.lb = Q(l, "i32");
            var h = Q(a, "i32");
            return h === 0 ? (this.ob(), { done: !0 }) : (this.$a = new r(h, this.db), this.db.gb[h] = this.$a, { value: this.$a, done: !1 });
          } catch (p) {
            throw this.sb = q(this.lb), this.ob(), p;
          } finally {
            be(o);
          }
        }, n.prototype.ob = function() {
          de(this.fb), this.fb = null;
        }, n.prototype.Qb = function() {
          return this.sb !== null ? this.sb : q(this.lb);
        }, typeof Symbol == "function" && typeof Symbol.iterator == "symbol" && (n.prototype[Symbol.iterator] = function() {
          return this;
        }), i.prototype.run = function(o, l) {
          if (!this.db) throw "Database closed";
          if (l) {
            o = this.tb(o, l);
            try {
              o.step();
            } finally {
              o.Ya();
            }
          } else this.handleError(b(this.db, o, 0, 0, a));
          return this;
        }, i.prototype.exec = function(o, l, h) {
          if (!this.db) throw "Database closed";
          var p = ye(), d = null, w = null, P = null;
          try {
            P = w = Ue(o);
            var L = ee(4);
            for (o = []; Q(P, "i8") !== 0; ) {
              he(a), he(L), this.handleError(er(this.db, P, -1, a, L));
              var j = Q(a, "i32");
              if (P = Q(L, "i32"), j !== 0) {
                var O = null;
                for (d = new r(j, this), l != null && d.bind(l); d.step(); ) O === null && (O = { columns: d.qb(), values: [] }, o.push(O)), O.values.push(d.get(null, h));
                d.Ya();
              }
            }
            return o;
          } catch (we) {
            throw d && d.Ya(), we;
          } finally {
            w && de(w), be(p);
          }
        }, i.prototype.Mb = function(o, l, h, p, d) {
          typeof l == "function" && (p = h, h = l, l = void 0), o = this.tb(o, l);
          try {
            for (; o.step(); ) h(o.zb(null, d));
          } finally {
            o.Ya();
          }
          if (typeof p == "function") return p();
        }, i.prototype.tb = function(o, l) {
          if (he(a), this.handleError(N(this.db, o, -1, a, 0)), o = Q(a, "i32"), o === 0) throw "Nothing to prepare";
          var h = new r(o, this);
          return l != null && h.bind(l), this.gb[o] = h;
        }, i.prototype.Ub = function(o) {
          return new n(o, this);
        }, i.prototype.Nb = function() {
          Object.values(this.gb).forEach(function(l) {
            l.Ya();
          }), Object.values(this.Sa).forEach(Y), this.Sa = {}, this.handleError(y(this.db));
          var o = Ar(this.filename);
          return this.handleError(m(this.filename, a)), this.db = Q(a, "i32"), ar(this.db), o;
        }, i.prototype.close = function() {
          this.db !== null && (Object.values(this.gb).forEach(function(o) {
            o.Ya();
          }), Object.values(this.Sa).forEach(Y), this.Sa = {}, this.Za && (Y(this.Za), this.Za = void 0), this.handleError(y(this.db)), Dt("/" + this.filename), this.db = null);
        }, i.prototype.handleError = function(o) {
          if (o === 0) return null;
          throw o = zr(this.db), Error(o);
        }, i.prototype.Rb = function() {
          return g(this.db);
        }, i.prototype.Kb = function(o, l) {
          Object.prototype.hasOwnProperty.call(this.Sa, o) && (Y(this.Sa[o]), delete this.Sa[o]);
          var h = ce(function(p, d, w) {
            d = t(d, w);
            try {
              var P = l.apply(null, d);
            } catch (L) {
              Ie(p, L, -1);
              return;
            }
            e(p, P);
          }, "viii");
          return this.Sa[o] = h, this.handleError(nr(this.db, o, l.length, 1, 0, h, 0, 0, 0)), this;
        }, i.prototype.Jb = function(o, l) {
          var h = l.init || function() {
            return null;
          }, p = l.finalize || function(j) {
            return j;
          }, d = l.step;
          if (!d) throw "An aggregate function must have a step function in " + o;
          var w = {};
          Object.hasOwnProperty.call(this.Sa, o) && (Y(this.Sa[o]), delete this.Sa[o]), l = o + "__finalize", Object.hasOwnProperty.call(this.Sa, l) && (Y(this.Sa[l]), delete this.Sa[l]);
          var P = ce(function(j, O, we) {
            var te = or(j, 1);
            Object.hasOwnProperty.call(w, te) || (w[te] = h()), O = t(O, we), O = [w[te]].concat(O);
            try {
              w[te] = d.apply(null, O);
            } catch (un) {
              delete w[te], Ie(j, un, -1);
            }
          }, "viii"), L = ce(function(j) {
            var O = or(j, 1);
            try {
              var we = p(w[O]);
            } catch (te) {
              delete w[O], Ie(j, te, -1);
              return;
            }
            e(j, we), delete w[O];
          }, "vi");
          return this.Sa[o] = P, this.Sa[l] = L, this.handleError(nr(this.db, o, d.length - 1, 1, 0, 0, P, L, 0)), this;
        }, i.prototype.Zb = function(o) {
          return this.Za && (ur(this.db, 0, 0), Y(this.Za), this.Za = void 0), o ? (this.Za = ce(function(l, h, p, d, w) {
            switch (h) {
              case 18:
                l = "insert";
                break;
              case 23:
                l = "update";
                break;
              case 9:
                l = "delete";
                break;
              default:
                throw "unknown operationCode in updateHook callback: " + h;
            }
            if (p = q(p), d = q(d), w > Number.MAX_SAFE_INTEGER) throw "rowId too big to fit inside a Number";
            o(l, p, d, Number(w));
          }, "viiiij"), ur(this.db, this.Za, 0), this) : this;
        }, r.prototype.bind = r.prototype.bind, r.prototype.step = r.prototype.step, r.prototype.get = r.prototype.get, r.prototype.getColumnNames = r.prototype.qb, r.prototype.getAsObject = r.prototype.zb, r.prototype.getSQL = r.prototype.Sb, r.prototype.getNormalizedSQL = r.prototype.Pb, r.prototype.run = r.prototype.run, r.prototype.reset = r.prototype.reset, r.prototype.freemem = r.prototype.freemem, r.prototype.free = r.prototype.Ya, n.prototype.next = n.prototype.next, n.prototype.getRemainingSQL = n.prototype.Qb, i.prototype.run = i.prototype.run, i.prototype.exec = i.prototype.exec, i.prototype.each = i.prototype.Mb, i.prototype.prepare = i.prototype.tb, i.prototype.iterateStatements = i.prototype.Ub, i.prototype.export = i.prototype.Nb, i.prototype.close = i.prototype.close, i.prototype.handleError = i.prototype.handleError, i.prototype.getRowsModified = i.prototype.Rb, i.prototype.create_function = i.prototype.Kb, i.prototype.create_aggregate = i.prototype.Jb, i.prototype.updateHook = i.prototype.Zb, u.Database = i;
      };
      var ze = "./this.program", _e = (e, t) => {
        throw t;
      }, Qe = (Kt = (Jt = globalThis.document) == null ? void 0 : Jt.currentScript) == null ? void 0 : Kt.src;
      typeof __filename < "u" ? Qe = __filename : We && (Qe = self.location.href);
      var ge = "", Fe, Ee;
      if (ve) {
        var Be = fn;
        ge = __dirname + "/", Ee = (e) => (e = qe(e) ? new URL(e) : e, Be.readFileSync(e)), Fe = async (e) => (e = qe(e) ? new URL(e) : e, Be.readFileSync(e, void 0)), 1 < process.argv.length && (ze = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), k.exports = u, _e = (e, t) => {
          throw process.exitCode = e, t;
        };
      } else if (hr || We) {
        try {
          ge = new URL(".", Qe).href;
        } catch {
        }
        We && (Ee = (e) => {
          var t = new XMLHttpRequest();
          return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
        }), Fe = async (e) => {
          if (qe(e)) return new Promise((r, n) => {
            var i = new XMLHttpRequest();
            i.open("GET", e, !0), i.responseType = "arraybuffer", i.onload = () => {
              i.status == 200 || i.status == 0 && i.response ? r(i.response) : n(i.status);
            }, i.onerror = n, i.send(null);
          });
          var t = await fetch(e, { credentials: "same-origin" });
          if (t.ok) return t.arrayBuffer();
          throw Error(t.status + " : " + t.url);
        };
      }
      var $e = console.log.bind(console), H = console.error.bind(console), ue, ke = !1, Ve, qe = (e) => e.startsWith("file://"), M, A, se, E, v, Ye, Xe, D;
      function mt() {
        var e = je.buffer;
        M = new Int8Array(e), se = new Int16Array(e), A = new Uint8Array(e), E = new Int32Array(e), v = new Uint32Array(e), Ye = new Float32Array(e), Xe = new Float64Array(e), D = new BigInt64Array(e), new BigUint64Array(e);
      }
      function le(e) {
        var t;
        throw (t = u.onAbort) == null || t.call(u, e), e = "Aborted(" + e + ")", H(e), ke = !0, new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info.");
      }
      var Ce;
      async function pr(e) {
        if (!ue) try {
          var t = await Fe(e);
          return new Uint8Array(t);
        } catch {
        }
        if (e == Ce && ue) e = new Uint8Array(ue);
        else if (Ee) e = Ee(e);
        else throw "both async and sync fetching of the wasm failed";
        return e;
      }
      async function mr(e, t) {
        try {
          var r = await pr(e);
          return await WebAssembly.instantiate(r, t);
        } catch (n) {
          H(`failed to asynchronously prepare wasm: ${n}`), le(n);
        }
      }
      async function cr(e) {
        var t = Ce;
        if (!ue && !qe(t) && !ve) try {
          var r = fetch(t, { credentials: "same-origin" });
          return await WebAssembly.instantiateStreaming(r, e);
        } catch (n) {
          H(`wasm streaming compile failed: ${n}`), H("falling back to ArrayBuffer instantiation");
        }
        return mr(t, e);
      }
      class He {
        constructor(t) {
          C(this, "name", "ExitStatus");
          this.message = `Program terminated with exit(${t})`, this.status = t;
        }
      }
      var ct = (e) => {
        for (; 0 < e.length; ) e.shift()(u);
      }, dt = [], bt = [], dr = () => {
        var e = u.preRun.shift();
        bt.push(e);
      }, Z = 0, fe = null;
      function Q(e, t = "i8") {
        switch (t.endsWith("*") && (t = "*"), t) {
          case "i1":
            return M[e];
          case "i8":
            return M[e];
          case "i16":
            return se[e >> 1];
          case "i32":
            return E[e >> 2];
          case "i64":
            return D[e >> 3];
          case "float":
            return Ye[e >> 2];
          case "double":
            return Xe[e >> 3];
          case "*":
            return v[e >> 2];
          default:
            le(`invalid type for getValue: ${t}`);
        }
      }
      var Me = !0;
      function he(e) {
        var t = "i32";
        switch (t.endsWith("*") && (t = "*"), t) {
          case "i1":
            M[e] = 0;
            break;
          case "i8":
            M[e] = 0;
            break;
          case "i16":
            se[e >> 1] = 0;
            break;
          case "i32":
            E[e >> 2] = 0;
            break;
          case "i64":
            D[e >> 3] = BigInt(0);
            break;
          case "float":
            Ye[e >> 2] = 0;
            break;
          case "double":
            Xe[e >> 3] = 0;
            break;
          case "*":
            v[e >> 2] = 0;
            break;
          default:
            le(`invalid type for setValue: ${t}`);
        }
      }
      var yt = new TextDecoder(), wt = (e, t, r, n) => {
        if (r = t + r, n) return r;
        for (; e[t] && !(t >= r); ) ++t;
        return t;
      }, q = (e, t, r) => e ? yt.decode(A.subarray(e, wt(A, e, t, r))) : "", vt = (e, t) => {
        for (var r = 0, n = e.length - 1; 0 <= n; n--) {
          var i = e[n];
          i === "." ? e.splice(n, 1) : i === ".." ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
        }
        if (t) for (; r; r--) e.unshift("..");
        return e;
      }, Ze = (e) => {
        var t = e.charAt(0) === "/", r = e.slice(-1) === "/";
        return (e = vt(e.split("/").filter((n) => !!n), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e;
      }, _t = (e) => {
        var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
        return e = t[0], t = t[1], !e && !t ? "." : (t && (t = t.slice(0, -1)), e + t);
      }, Ne = (e) => e && e.match(/([^\/]+|\/)\/*$/)[1], br = () => {
        if (ve) {
          var e = hn;
          return (t) => e.randomFillSync(t);
        }
        return (t) => crypto.getRandomValues(t);
      }, gt = (e) => {
        (gt = br())(e);
      }, yr = (...e) => {
        for (var t = "", r = !1, n = e.length - 1; -1 <= n && !r; n--) {
          if (r = 0 <= n ? e[n] : "/", typeof r != "string") throw new TypeError("Arguments to path.resolve must be strings");
          if (!r) return "";
          t = r + "/" + t, r = r.charAt(0) === "/";
        }
        return t = vt(t.split("/").filter((i) => !!i), !r).join("/"), (r ? "/" : "") + t || ".";
      }, Ae = (e) => {
        var t = wt(e, 0);
        return yt.decode(e.buffer ? e.subarray(0, t) : new Uint8Array(e.slice(0, t)));
      }, Je = [], re = (e) => {
        for (var t = 0, r = 0; r < e.length; ++r) {
          var n = e.charCodeAt(r);
          127 >= n ? t++ : 2047 >= n ? t += 2 : 55296 <= n && 57343 >= n ? (t += 4, ++r) : t += 3;
        }
        return t;
      }, I = (e, t, r, n) => {
        if (!(0 < n)) return 0;
        var i = r;
        n = r + n - 1;
        for (var a = 0; a < e.length; ++a) {
          var s = e.codePointAt(a);
          if (127 >= s) {
            if (r >= n) break;
            t[r++] = s;
          } else if (2047 >= s) {
            if (r + 1 >= n) break;
            t[r++] = 192 | s >> 6, t[r++] = 128 | s & 63;
          } else if (65535 >= s) {
            if (r + 2 >= n) break;
            t[r++] = 224 | s >> 12, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | s & 63;
          } else {
            if (r + 3 >= n) break;
            t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | s & 63, a++;
          }
        }
        return t[r] = 0, r - i;
      }, Et = [];
      function kt(e, t) {
        Et[e] = { input: [], output: [], eb: t }, nt(e, wr);
      }
      var wr = { open(e) {
        var t = Et[e.node.rdev];
        if (!t) throw new f(43);
        e.tty = t, e.seekable = !1;
      }, close(e) {
        e.tty.eb.fsync(e.tty);
      }, fsync(e) {
        e.tty.eb.fsync(e.tty);
      }, read(e, t, r, n) {
        if (!e.tty || !e.tty.eb.Bb) throw new f(60);
        for (var i = 0, a = 0; a < n; a++) {
          try {
            var s = e.tty.eb.Bb(e.tty);
          } catch {
            throw new f(29);
          }
          if (s === void 0 && i === 0) throw new f(6);
          if (s == null) break;
          i++, t[r + a] = s;
        }
        return i && (e.node.atime = Date.now()), i;
      }, write(e, t, r, n) {
        if (!e.tty || !e.tty.eb.ub) throw new f(60);
        try {
          for (var i = 0; i < n; i++) e.tty.eb.ub(e.tty, t[r + i]);
        } catch {
          throw new f(29);
        }
        return n && (e.node.mtime = e.node.ctime = Date.now()), i;
      } }, vr = { Bb() {
        var i;
        e: {
          if (!Je.length) {
            var e = null;
            if (ve) {
              var t = Buffer.alloc(256), r = 0, n = process.stdin.fd;
              try {
                r = Be.readSync(n, t, 0, 256);
              } catch (a) {
                if (a.toString().includes("EOF")) r = 0;
                else throw a;
              }
              0 < r && (e = t.slice(0, r).toString("utf-8"));
            } else (i = globalThis.window) != null && i.prompt && (e = window.prompt("Input: "), e !== null && (e += `
`));
            if (!e) {
              e = null;
              break e;
            }
            t = Array(re(e) + 1), e = I(e, t, 0, t.length), t.length = e, Je = t;
          }
          e = Je.shift();
        }
        return e;
      }, ub(e, t) {
        t === null || t === 10 ? ($e(Ae(e.output)), e.output = []) : t != 0 && e.output.push(t);
      }, fsync(e) {
        var t;
        0 < ((t = e.output) == null ? void 0 : t.length) && ($e(Ae(e.output)), e.output = []);
      }, hc() {
        return { bc: 25856, dc: 5, ac: 191, cc: 35387, $b: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
      }, ic() {
        return 0;
      }, jc() {
        return [24, 80];
      } }, _r = { ub(e, t) {
        t === null || t === 10 ? (H(Ae(e.output)), e.output = []) : t != 0 && e.output.push(t);
      }, fsync(e) {
        var t;
        0 < ((t = e.output) == null ? void 0 : t.length) && (H(Ae(e.output)), e.output = []);
      } }, c = { Wa: null, Xa() {
        return c.createNode(null, "/", 16895, 0);
      }, createNode(e, t, r, n) {
        if ((r & 61440) === 24576 || (r & 61440) === 4096) throw new f(63);
        return c.Wa || (c.Wa = { dir: { node: { Ta: c.La.Ta, Ua: c.La.Ua, lookup: c.La.lookup, ib: c.La.ib, rename: c.La.rename, unlink: c.La.unlink, rmdir: c.La.rmdir, readdir: c.La.readdir, symlink: c.La.symlink }, stream: { Va: c.Ma.Va } }, file: { node: { Ta: c.La.Ta, Ua: c.La.Ua }, stream: { Va: c.Ma.Va, read: c.Ma.read, write: c.Ma.write, jb: c.Ma.jb, kb: c.Ma.kb } }, link: { node: { Ta: c.La.Ta, Ua: c.La.Ua, readlink: c.La.readlink }, stream: {} }, yb: { node: { Ta: c.La.Ta, Ua: c.La.Ua }, stream: Mr } }), r = Rt(e, t, r, n), R(r.mode) ? (r.La = c.Wa.dir.node, r.Ma = c.Wa.dir.stream, r.Na = {}) : (r.mode & 61440) === 32768 ? (r.La = c.Wa.file.node, r.Ma = c.Wa.file.stream, r.Ra = 0, r.Na = null) : (r.mode & 61440) === 40960 ? (r.La = c.Wa.link.node, r.Ma = c.Wa.link.stream) : (r.mode & 61440) === 8192 && (r.La = c.Wa.yb.node, r.Ma = c.Wa.yb.stream), r.atime = r.mtime = r.ctime = Date.now(), e && (e.Na[t] = r, e.atime = e.mtime = e.ctime = r.atime), r;
      }, fc(e) {
        return e.Na ? e.Na.subarray ? e.Na.subarray(0, e.Ra) : new Uint8Array(e.Na) : new Uint8Array(0);
      }, La: {
        Ta(e) {
          var t = {};
          return t.dev = (e.mode & 61440) === 8192 ? e.id : 1, t.ino = e.id, t.mode = e.mode, t.nlink = 1, t.uid = 0, t.gid = 0, t.rdev = e.rdev, R(e.mode) ? t.size = 4096 : (e.mode & 61440) === 32768 ? t.size = e.Ra : (e.mode & 61440) === 40960 ? t.size = e.link.length : t.size = 0, t.atime = new Date(e.atime), t.mtime = new Date(e.mtime), t.ctime = new Date(e.ctime), t.blksize = 4096, t.blocks = Math.ceil(t.size / t.blksize), t;
        },
        Ua(e, t) {
          for (var r of ["mode", "atime", "mtime", "ctime"]) t[r] != null && (e[r] = t[r]);
          t.size !== void 0 && (t = t.size, e.Ra != t && (t == 0 ? (e.Na = null, e.Ra = 0) : (r = e.Na, e.Na = new Uint8Array(t), r && e.Na.set(r.subarray(0, Math.min(t, e.Ra))), e.Ra = t)));
        },
        lookup() {
          throw c.nb || (c.nb = new f(44), c.nb.stack = "<generic error, no stack>"), c.nb;
        },
        ib(e, t, r, n) {
          return c.createNode(e, t, r, n);
        },
        rename(e, t, r) {
          try {
            var n = J(t, r);
          } catch {
          }
          if (n) {
            if (R(e.mode)) for (var i in n.Na) throw new f(55);
            tt(n);
          }
          delete e.parent.Na[e.name], t.Na[r] = e, e.name = r, t.ctime = t.mtime = e.parent.ctime = e.parent.mtime = Date.now();
        },
        unlink(e, t) {
          delete e.Na[t], e.ctime = e.mtime = Date.now();
        },
        rmdir(e, t) {
          var r = J(e, t), n;
          for (n in r.Na) throw new f(55);
          delete e.Na[t], e.ctime = e.mtime = Date.now();
        },
        readdir(e) {
          return [".", "..", ...Object.keys(e.Na)];
        },
        symlink(e, t, r) {
          return e = c.createNode(e, t, 41471, 0), e.link = r, e;
        },
        readlink(e) {
          if ((e.mode & 61440) !== 40960) throw new f(28);
          return e.link;
        }
      }, Ma: { read(e, t, r, n, i) {
        var a = e.node.Na;
        if (i >= e.node.Ra) return 0;
        if (e = Math.min(e.node.Ra - i, n), 8 < e && a.subarray) t.set(a.subarray(i, i + e), r);
        else for (n = 0; n < e; n++) t[r + n] = a[i + n];
        return e;
      }, write(e, t, r, n, i, a) {
        if (t.buffer === M.buffer && (a = !1), !n) return 0;
        if (e = e.node, e.mtime = e.ctime = Date.now(), t.subarray && (!e.Na || e.Na.subarray)) {
          if (a) return e.Na = t.subarray(r, r + n), e.Ra = n;
          if (e.Ra === 0 && i === 0) return e.Na = t.slice(r, r + n), e.Ra = n;
          if (i + n <= e.Ra) return e.Na.set(t.subarray(r, r + n), i), n;
        }
        a = i + n;
        var s = e.Na ? e.Na.length : 0;
        if (s >= a || (a = Math.max(a, s * (1048576 > s ? 2 : 1.125) >>> 0), s != 0 && (a = Math.max(a, 256)), s = e.Na, e.Na = new Uint8Array(a), 0 < e.Ra && e.Na.set(s.subarray(0, e.Ra), 0)), e.Na.subarray && t.subarray) e.Na.set(t.subarray(r, r + n), i);
        else for (a = 0; a < n; a++) e.Na[i + a] = t[r + a];
        return e.Ra = Math.max(e.Ra, i + n), n;
      }, Va(e, t, r) {
        if (r === 1 ? t += e.position : r === 2 && (e.node.mode & 61440) === 32768 && (t += e.node.Ra), 0 > t) throw new f(28);
        return t;
      }, jb(e, t, r, n, i) {
        if ((e.node.mode & 61440) !== 32768) throw new f(43);
        if (e = e.node.Na, i & 2 || !e || e.buffer !== M.buffer) {
          i = !0, n = 65536 * Math.ceil(t / 65536);
          var a = Yt(65536, n);
          if (a && A.fill(0, a, a + n), n = a, !n) throw new f(48);
          e && ((0 < r || r + t < e.length) && (e.subarray ? e = e.subarray(r, r + t) : e = Array.prototype.slice.call(e, r, r + t)), M.set(e, n));
        } else i = !1, n = e.byteOffset;
        return { Xb: n, Eb: i };
      }, kb(e, t, r, n) {
        return c.Ma.write(e, t, 0, n, r, !1), 0;
      } } }, qt = (e, t) => {
        var r = 0;
        return e && (r |= 365), t && (r |= 146), r;
      }, Ke = null, Mt = {}, ne = [], gr = 1, $ = null, Nt = !1, At = !0, St = {}, f = class {
        constructor(e) {
          C(this, "name", "ErrnoError");
          this.Pa = e;
        }
      }, Er = class {
        constructor() {
          C(this, "hb", {});
          C(this, "node", null);
        }
        get flags() {
          return this.hb.flags;
        }
        set flags(e) {
          this.hb.flags = e;
        }
        get position() {
          return this.hb.position;
        }
        set position(e) {
          this.hb.position = e;
        }
      }, kr = class {
        constructor(e, t, r, n) {
          C(this, "La", {});
          C(this, "Ma", {});
          C(this, "bb", null);
          e || (e = this), this.parent = e, this.Xa = e.Xa, this.id = gr++, this.name = t, this.mode = r, this.rdev = n, this.atime = this.mtime = this.ctime = Date.now();
        }
        get read() {
          return (this.mode & 365) === 365;
        }
        set read(e) {
          e ? this.mode |= 365 : this.mode &= -366;
        }
        get write() {
          return (this.mode & 146) === 146;
        }
        set write(e) {
          e ? this.mode |= 146 : this.mode &= -147;
        }
      };
      function T(e, t = {}) {
        if (!e) throw new f(44);
        t.pb ?? (t.pb = !0), e.charAt(0) === "/" || (e = "//" + e);
        var r = 0;
        e: for (; 40 > r; r++) {
          e = e.split("/").filter((m) => !!m);
          for (var n = Ke, i = "/", a = 0; a < e.length; a++) {
            var s = a === e.length - 1;
            if (s && t.parent) break;
            if (e[a] !== ".") if (e[a] === "..") if (i = _t(i), n === n.parent) {
              e = i + "/" + e.slice(a + 1).join("/"), r--;
              continue e;
            } else n = n.parent;
            else {
              i = Ze(i + "/" + e[a]);
              try {
                n = J(n, e[a]);
              } catch (m) {
                if ((m == null ? void 0 : m.Pa) === 44 && s && t.Wb) return { path: i };
                throw m;
              }
              if (!n.bb || s && !t.pb || (n = n.bb.root), (n.mode & 61440) === 40960 && (!s || t.ab)) {
                if (!n.La.readlink) throw new f(52);
                n = n.La.readlink(n), n.charAt(0) === "/" || (n = _t(i) + "/" + n), e = n + "/" + e.slice(a + 1).join("/");
                continue e;
              }
            }
          }
          return { path: i, node: n };
        }
        throw new f(32);
      }
      function Ge(e) {
        for (var t; ; ) {
          if (e === e.parent) return e = e.Xa.Db, t ? e[e.length - 1] !== "/" ? `${e}/${t}` : e + t : e;
          t = t ? `${e.name}/${t}` : e.name, e = e.parent;
        }
      }
      function et(e, t) {
        for (var r = 0, n = 0; n < t.length; n++) r = (r << 5) - r + t.charCodeAt(n) | 0;
        return (e + r >>> 0) % $.length;
      }
      function tt(e) {
        var t = et(e.parent.id, e.name);
        if ($[t] === e) $[t] = e.cb;
        else for (t = $[t]; t; ) {
          if (t.cb === e) {
            t.cb = e.cb;
            break;
          }
          t = t.cb;
        }
      }
      function J(e, t) {
        var r = R(e.mode) ? (r = ie(e, "x")) ? r : e.La.lookup ? 0 : 2 : 54;
        if (r) throw new f(r);
        for (r = $[et(e.id, t)]; r; r = r.cb) {
          var n = r.name;
          if (r.parent.id === e.id && n === t) return r;
        }
        return e.La.lookup(e, t);
      }
      function Rt(e, t, r, n) {
        return e = new kr(e, t, r, n), t = et(e.parent.id, e.name), e.cb = $[t], $[t] = e;
      }
      function R(e) {
        return (e & 61440) === 16384;
      }
      function Ot(e) {
        var t = ["r", "w", "rw"][e & 3];
        return e & 512 && (t += "w"), t;
      }
      function ie(e, t) {
        if (At) return 0;
        if (!t.includes("r") || e.mode & 292) {
          if (t.includes("w") && !(e.mode & 146) || t.includes("x") && !(e.mode & 73)) return 2;
        } else return 2;
        return 0;
      }
      function xt(e, t) {
        if (!R(e.mode)) return 54;
        try {
          return J(e, t), 20;
        } catch {
        }
        return ie(e, "wx");
      }
      function Lt(e, t, r) {
        try {
          var n = J(e, t);
        } catch (i) {
          return i.Pa;
        }
        if (e = ie(e, "wx")) return e;
        if (r) {
          if (!R(n.mode)) return 54;
          if (n === n.parent || Ge(n) === "/") return 10;
        } else if (R(n.mode)) return 31;
        return 0;
      }
      function Se(e) {
        if (!e) throw new f(63);
        return e;
      }
      function S(e) {
        if (e = ne[e], !e) throw new f(8);
        return e;
      }
      function Tt(e, t = -1) {
        if (e = Object.assign(new Er(), e), t == -1) e: {
          for (t = 0; 4096 >= t; t++) if (!ne[t]) break e;
          throw new f(33);
        }
        return e.fd = t, ne[t] = e;
      }
      function qr(e, t = -1) {
        var r, n;
        return e = Tt(e, t), (n = (r = e.Ma) == null ? void 0 : r.ec) == null || n.call(r, e), e;
      }
      function rt(e, t, r) {
        var n = e == null ? void 0 : e.Ma.Ua;
        e = n ? e : t, n ?? (n = t.La.Ua), Se(n), n(e, r);
      }
      var Mr = { open(e) {
        var t, r;
        e.Ma = Mt[e.node.rdev].Ma, (r = (t = e.Ma).open) == null || r.call(t, e);
      }, Va() {
        throw new f(70);
      } };
      function nt(e, t) {
        Mt[e] = { Ma: t };
      }
      function Pt(e, t) {
        var r = t === "/";
        if (r && Ke) throw new f(10);
        if (!r && t) {
          var n = T(t, { pb: !1 });
          if (t = n.path, n = n.node, n.bb) throw new f(10);
          if (!R(n.mode)) throw new f(54);
        }
        t = { type: e, kc: {}, Db: t, Vb: [] }, e = e.Xa(t), e.Xa = t, t.root = e, r ? Ke = e : n && (n.bb = t, n.Xa && n.Xa.Vb.push(t));
      }
      function Re(e, t, r) {
        var n = T(e, { parent: !0 }).node;
        if (e = Ne(e), !e) throw new f(28);
        if (e === "." || e === "..") throw new f(20);
        var i = xt(n, e);
        if (i) throw new f(i);
        if (!n.La.ib) throw new f(63);
        return n.La.ib(n, e, t, r);
      }
      function Nr(e, t = 438) {
        return Re(e, t & 4095 | 32768, 0);
      }
      function W(e, t = 511) {
        return Re(e, t & 1023 | 16384, 0);
      }
      function Oe(e, t, r) {
        typeof r > "u" && (r = t, t = 438), Re(e, t | 8192, r);
      }
      function it(e, t) {
        if (!yr(e)) throw new f(44);
        var r = T(t, { parent: !0 }).node;
        if (!r) throw new f(44);
        t = Ne(t);
        var n = xt(r, t);
        if (n) throw new f(n);
        if (!r.La.symlink) throw new f(63);
        r.La.symlink(r, t, e);
      }
      function Ut(e) {
        var t = T(e, { parent: !0 }).node;
        e = Ne(e);
        var r = J(t, e), n = Lt(t, e, !0);
        if (n) throw new f(n);
        if (!t.La.rmdir) throw new f(63);
        if (r.bb) throw new f(10);
        t.La.rmdir(t, e), tt(r);
      }
      function Dt(e) {
        var t = T(e, { parent: !0 }).node;
        if (!t) throw new f(44);
        e = Ne(e);
        var r = J(t, e), n = Lt(t, e, !1);
        if (n) throw new f(n);
        if (!t.La.unlink) throw new f(63);
        if (r.bb) throw new f(10);
        t.La.unlink(t, e), tt(r);
      }
      function pe(e, t) {
        return e = T(e, { ab: !t }).node, Se(e.La.Ta)(e);
      }
      function jt(e, t, r, n) {
        rt(e, t, { mode: r & 4095 | t.mode & -4096, ctime: Date.now(), Lb: n });
      }
      function xe(e, t) {
        e = typeof e == "string" ? T(e, { ab: !0 }).node : e, jt(null, e, t);
      }
      function It(e, t, r) {
        if (R(t.mode)) throw new f(31);
        if ((t.mode & 61440) !== 32768) throw new f(28);
        var n = ie(t, "w");
        if (n) throw new f(n);
        rt(e, t, { size: r, timestamp: Date.now() });
      }
      function oe(e, t, r = 438) {
        if (e === "") throw new f(44);
        if (typeof t == "string") {
          var n = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[t];
          if (typeof n > "u") throw Error(`Unknown file open mode: ${t}`);
          t = n;
        }
        if (r = t & 64 ? r & 4095 | 32768 : 0, typeof e == "object") n = e;
        else {
          var i = e.endsWith("/");
          e = T(e, { ab: !(t & 131072), Wb: !0 }), n = e.node, e = e.path;
        }
        var a = !1;
        if (t & 64) if (n) {
          if (t & 128) throw new f(20);
        } else {
          if (i) throw new f(31);
          n = Re(e, r | 511, 0), a = !0;
        }
        if (!n) throw new f(44);
        if ((n.mode & 61440) === 8192 && (t &= -513), t & 65536 && !R(n.mode)) throw new f(54);
        if (!a && (i = n ? (n.mode & 61440) === 40960 ? 32 : R(n.mode) && (Ot(t) !== "r" || t & 576) ? 31 : ie(n, Ot(t)) : 44)) throw new f(i);
        return t & 512 && !a && (i = n, i = typeof i == "string" ? T(i, { ab: !0 }).node : i, It(null, i, 0)), t &= -131713, i = Tt({ node: n, path: Ge(n), flags: t, seekable: !0, position: 0, Ma: n.Ma, Yb: [], error: !1 }), i.Ma.open && i.Ma.open(i), a && xe(n, r & 511), !u.logReadFiles || t & 1 || e in St || (St[e] = 1), i;
      }
      function ot(e) {
        if (e.fd === null) throw new f(8);
        e.rb && (e.rb = null);
        try {
          e.Ma.close && e.Ma.close(e);
        } catch (t) {
          throw t;
        } finally {
          ne[e.fd] = null;
        }
        e.fd = null;
      }
      function Wt(e, t, r) {
        if (e.fd === null) throw new f(8);
        if (!e.seekable || !e.Ma.Va) throw new f(70);
        if (r != 0 && r != 1 && r != 2) throw new f(28);
        e.position = e.Ma.Va(e, t, r), e.Yb = [];
      }
      function zt(e, t, r, n, i) {
        if (0 > n || 0 > i) throw new f(28);
        if (e.fd === null) throw new f(8);
        if ((e.flags & 2097155) === 1) throw new f(8);
        if (R(e.node.mode)) throw new f(31);
        if (!e.Ma.read) throw new f(28);
        var a = typeof i < "u";
        if (!a) i = e.position;
        else if (!e.seekable) throw new f(70);
        return t = e.Ma.read(e, t, r, n, i), a || (e.position += t), t;
      }
      function Qt(e, t, r, n, i) {
        if (0 > n || 0 > i) throw new f(28);
        if (e.fd === null) throw new f(8);
        if (!(e.flags & 2097155)) throw new f(8);
        if (R(e.node.mode)) throw new f(31);
        if (!e.Ma.write) throw new f(28);
        e.seekable && e.flags & 1024 && Wt(e, 0, 2);
        var a = typeof i < "u";
        if (!a) i = e.position;
        else if (!e.seekable) throw new f(70);
        return t = e.Ma.write(e, t, r, n, i, void 0), a || (e.position += t), t;
      }
      function Ar(e) {
        var t = t || 0;
        t = oe(e, t), e = pe(e).size;
        var r = new Uint8Array(e);
        return zt(t, r, 0, e, 0), ot(t), r;
      }
      function V(e, t, r) {
        e = Ze("/dev/" + e);
        var n = qt(!!t, !!r);
        V.Cb ?? (V.Cb = 64);
        var i = V.Cb++ << 8 | 0;
        nt(i, { open(a) {
          a.seekable = !1;
        }, close() {
          var a;
          (a = r == null ? void 0 : r.buffer) != null && a.length && r(10);
        }, read(a, s, m, y) {
          for (var b = 0, g = 0; g < y; g++) {
            try {
              var N = t();
            } catch {
              throw new f(29);
            }
            if (N === void 0 && b === 0) throw new f(6);
            if (N == null) break;
            b++, s[m + g] = N;
          }
          return b && (a.node.atime = Date.now()), b;
        }, write(a, s, m, y) {
          for (var b = 0; b < y; b++) try {
            r(s[m + b]);
          } catch {
            throw new f(29);
          }
          return y && (a.node.mtime = a.node.ctime = Date.now()), b;
        } }), Oe(e, n, i);
      }
      var _ = {};
      function K(e, t, r) {
        if (t.charAt(0) === "/") return t;
        if (e = e === -100 ? "/" : S(e).path, t.length == 0) {
          if (!r) throw new f(44);
          return e;
        }
        return e + "/" + t;
      }
      function Le(e, t) {
        v[e >> 2] = t.dev, v[e + 4 >> 2] = t.mode, v[e + 8 >> 2] = t.nlink, v[e + 12 >> 2] = t.uid, v[e + 16 >> 2] = t.gid, v[e + 20 >> 2] = t.rdev, D[e + 24 >> 3] = BigInt(t.size), E[e + 32 >> 2] = 4096, E[e + 36 >> 2] = t.blocks;
        var r = t.atime.getTime(), n = t.mtime.getTime(), i = t.ctime.getTime();
        return D[e + 40 >> 3] = BigInt(Math.floor(r / 1e3)), v[e + 48 >> 2] = r % 1e3 * 1e6, D[e + 56 >> 3] = BigInt(Math.floor(n / 1e3)), v[e + 64 >> 2] = n % 1e3 * 1e6, D[e + 72 >> 3] = BigInt(Math.floor(i / 1e3)), v[e + 80 >> 2] = i % 1e3 * 1e6, D[e + 88 >> 3] = BigInt(t.ino), 0;
      }
      var Te = void 0, Pe = () => {
        var e = E[+Te >> 2];
        return Te += 4, e;
      }, at = 0, Sr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Rr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], me = {}, Ft = (e) => {
        var t;
        Ve = e, Me || 0 < at || ((t = u.onExit) == null || t.call(u, e), ke = !0), _e(e, new He(e));
      }, Or = (e) => {
        if (!ke) try {
          e();
        } catch (t) {
          t instanceof He || t == "unwind" || _e(1, t);
        } finally {
          if (!(Me || 0 < at)) try {
            Ve = e = Ve, Ft(e);
          } catch (t) {
            t instanceof He || t == "unwind" || _e(1, t);
          }
        }
      }, ut = {}, Bt = () => {
        var n;
        if (!st) {
          var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (((n = globalThis.navigator) == null ? void 0 : n.language) ?? "C").replace("-", "_") + ".UTF-8", _: ze || "./this.program" }, t;
          for (t in ut) ut[t] === void 0 ? delete e[t] : e[t] = ut[t];
          var r = [];
          for (t in e) r.push(`${t}=${e[t]}`);
          st = r;
        }
        return st;
      }, st, xr = (e, t, r, n) => {
        var i = { string: (b) => {
          var g = 0;
          if (b != null && b !== 0) {
            g = re(b) + 1;
            var N = ee(g);
            I(b, A, N, g), g = N;
          }
          return g;
        }, array: (b) => {
          var g = ee(b.length);
          return M.set(b, g), g;
        } };
        e = u["_" + e];
        var a = [], s = 0;
        if (n) for (var m = 0; m < n.length; m++) {
          var y = i[r[m]];
          y ? (s === 0 && (s = ye()), a[m] = y(n[m])) : a[m] = n[m];
        }
        return r = e(...a), r = function(b) {
          return s !== 0 && be(s), t === "string" ? q(b) : t === "boolean" ? !!b : b;
        }(r);
      }, Ue = (e) => {
        var t = re(e) + 1, r = De(t);
        return r && I(e, A, r, t), r;
      }, G, lt = [], Y = (e) => {
        G.delete(X.get(e)), X.set(e, null), lt.push(e);
      }, $t = (e) => {
        const t = e.length;
        return [t % 128 | 128, t >> 7, ...e];
      }, Lr = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, Vt = (e) => $t(Array.from(e, (t) => Lr[t])), ce = (e, t) => {
        if (!G) {
          G = /* @__PURE__ */ new WeakMap();
          var r = X.length;
          if (G) for (var n = 0; n < 0 + r; n++) {
            var i = X.get(n);
            i && G.set(i, n);
          }
        }
        if (r = G.get(e) || 0) return r;
        r = lt.length ? lt.pop() : X.grow(1);
        try {
          X.set(r, e);
        } catch (a) {
          if (!(a instanceof TypeError)) throw a;
          t = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...$t([1, 96, ...Vt(t.slice(1)), ...Vt(t[0] === "v" ? "" : t[0])]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0), t = new WebAssembly.Module(t), t = new WebAssembly.Instance(t, { e: { f: e } }).exports.f, X.set(r, t);
        }
        return G.set(e, r), r;
      };
      if ($ = Array(4096), Pt(c, "/"), W("/tmp"), W("/home"), W("/home/web_user"), function() {
        W("/dev"), nt(259, { read: () => 0, write: (n, i, a, s) => s, Va: () => 0 }), Oe("/dev/null", 259), kt(1280, vr), kt(1536, _r), Oe("/dev/tty", 1280), Oe("/dev/tty1", 1536);
        var e = new Uint8Array(1024), t = 0, r = () => (t === 0 && (gt(e), t = e.byteLength), e[--t]);
        V("random", r), V("urandom", r), W("/dev/shm"), W("/dev/shm/tmp");
      }(), function() {
        W("/proc");
        var e = W("/proc/self");
        W("/proc/self/fd"), Pt({ Xa() {
          var t = Rt(e, "fd", 16895, 73);
          return t.Ma = { Va: c.Ma.Va }, t.La = { lookup(r, n) {
            r = +n;
            var i = S(r);
            return r = { parent: null, Xa: { Db: "fake" }, La: { readlink: () => i.path }, id: r + 1 }, r.parent = r;
          }, readdir() {
            return Array.from(ne.entries()).filter(([, r]) => r).map(([r]) => r.toString());
          } }, t;
        } }, "/proc/self/fd");
      }(), u.noExitRuntime && (Me = u.noExitRuntime), u.print && ($e = u.print), u.printErr && (H = u.printErr), u.wasmBinary && (ue = u.wasmBinary), u.thisProgram && (ze = u.thisProgram), u.preInit) for (typeof u.preInit == "function" && (u.preInit = [u.preInit]); 0 < u.preInit.length; ) u.preInit.shift()();
      u.stackSave = () => ye(), u.stackRestore = (e) => be(e), u.stackAlloc = (e) => ee(e), u.cwrap = (e, t, r, n) => {
        var i = !r || r.every((a) => a === "number" || a === "boolean");
        return t !== "string" && i && !n ? u["_" + e] : (...a) => xr(e, t, r, a);
      }, u.addFunction = ce, u.removeFunction = Y, u.UTF8ToString = q, u.stringToNewUTF8 = Ue, u.writeArrayToMemory = (e, t) => {
        M.set(e, t);
      };
      var De, de, Yt, Xt, be, ee, ye, je, X, Tr = {
        a: (e, t, r, n) => le(`Assertion failed: ${q(e)}, at: ` + [t ? q(t) : "unknown filename", r, n ? q(n) : "unknown function"]),
        i: function(e, t) {
          try {
            return e = q(e), xe(e, t), 0;
          } catch (r) {
            if (typeof _ > "u" || r.name !== "ErrnoError") throw r;
            return -r.Pa;
          }
        },
        L: function(e, t, r) {
          try {
            if (t = q(t), t = K(e, t), r & -8) return -28;
            var n = T(t, { ab: !0 }).node;
            return n ? (e = "", r & 4 && (e += "r"), r & 2 && (e += "w"), r & 1 && (e += "x"), e && ie(n, e) ? -2 : 0) : -44;
          } catch (i) {
            if (typeof _ > "u" || i.name !== "ErrnoError") throw i;
            return -i.Pa;
          }
        },
        j: function(e, t) {
          try {
            var r = S(e);
            return jt(r, r.node, t, !1), 0;
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return -n.Pa;
          }
        },
        h: function(e) {
          try {
            var t = S(e);
            return rt(t, t.node, { timestamp: Date.now(), Lb: !1 }), 0;
          } catch (r) {
            if (typeof _ > "u" || r.name !== "ErrnoError") throw r;
            return -r.Pa;
          }
        },
        b: function(e, t, r) {
          Te = r;
          try {
            var n = S(e);
            switch (t) {
              case 0:
                var i = Pe();
                if (0 > i) break;
                for (; ne[i]; ) i++;
                return qr(n, i).fd;
              case 1:
              case 2:
                return 0;
              case 3:
                return n.flags;
              case 4:
                return i = Pe(), n.flags |= i, 0;
              case 12:
                return i = Pe(), se[i + 0 >> 1] = 2, 0;
              case 13:
              case 14:
                return 0;
            }
            return -28;
          } catch (a) {
            if (typeof _ > "u" || a.name !== "ErrnoError") throw a;
            return -a.Pa;
          }
        },
        g: function(e, t) {
          try {
            var r = S(e), n = r.node, i = r.Ma.Ta;
            e = i ? r : n, i ?? (i = n.La.Ta), Se(i);
            var a = i(e);
            return Le(t, a);
          } catch (s) {
            if (typeof _ > "u" || s.name !== "ErrnoError") throw s;
            return -s.Pa;
          }
        },
        H: function(e, t) {
          t = -9007199254740992 > t || 9007199254740992 < t ? NaN : Number(t);
          try {
            if (isNaN(t)) return -61;
            var r = S(e);
            if (0 > t || !(r.flags & 2097155)) throw new f(28);
            return It(r, r.node, t), 0;
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return -n.Pa;
          }
        },
        G: function(e, t) {
          try {
            if (t === 0) return -28;
            var r = re("/") + 1;
            return t < r ? -68 : (I("/", A, e, t), r);
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return -n.Pa;
          }
        },
        K: function(e, t) {
          try {
            return e = q(e), Le(t, pe(e, !0));
          } catch (r) {
            if (typeof _ > "u" || r.name !== "ErrnoError") throw r;
            return -r.Pa;
          }
        },
        C: function(e, t, r) {
          try {
            return t = q(t), t = K(e, t), W(t, r), 0;
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return -n.Pa;
          }
        },
        J: function(e, t, r, n) {
          try {
            t = q(t);
            var i = n & 256;
            return t = K(e, t, n & 4096), Le(r, i ? pe(t, !0) : pe(t));
          } catch (a) {
            if (typeof _ > "u" || a.name !== "ErrnoError") throw a;
            return -a.Pa;
          }
        },
        x: function(e, t, r, n) {
          Te = n;
          try {
            t = q(t), t = K(e, t);
            var i = n ? Pe() : 0;
            return oe(t, r, i).fd;
          } catch (a) {
            if (typeof _ > "u" || a.name !== "ErrnoError") throw a;
            return -a.Pa;
          }
        },
        v: function(e, t, r, n) {
          try {
            if (t = q(t), t = K(e, t), 0 >= n) return -28;
            var i = T(t).node;
            if (!i) throw new f(44);
            if (!i.La.readlink) throw new f(28);
            var a = i.La.readlink(i), s = Math.min(n, re(a)), m = M[r + s];
            return I(
              a,
              A,
              r,
              n + 1
            ), M[r + s] = m, s;
          } catch (y) {
            if (typeof _ > "u" || y.name !== "ErrnoError") throw y;
            return -y.Pa;
          }
        },
        u: function(e) {
          try {
            return e = q(e), Ut(e), 0;
          } catch (t) {
            if (typeof _ > "u" || t.name !== "ErrnoError") throw t;
            return -t.Pa;
          }
        },
        f: function(e, t) {
          try {
            return e = q(e), Le(t, pe(e));
          } catch (r) {
            if (typeof _ > "u" || r.name !== "ErrnoError") throw r;
            return -r.Pa;
          }
        },
        r: function(e, t, r) {
          try {
            if (t = q(t), t = K(e, t), r) if (r === 512) Ut(t);
            else return -28;
            else Dt(t);
            return 0;
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return -n.Pa;
          }
        },
        q: function(e, t, r) {
          try {
            t = q(t), t = K(e, t, !0);
            var n = Date.now(), i, a;
            if (r) {
              var s = v[r >> 2] + 4294967296 * E[r + 4 >> 2], m = E[r + 8 >> 2];
              m == 1073741823 ? i = n : m == 1073741822 ? i = null : i = 1e3 * s + m / 1e6, r += 16, s = v[r >> 2] + 4294967296 * E[r + 4 >> 2], m = E[r + 8 >> 2], m == 1073741823 ? a = n : m == 1073741822 ? a = null : a = 1e3 * s + m / 1e6;
            } else a = i = n;
            if ((a ?? i) !== null) {
              e = i;
              var y = T(t, { ab: !0 }).node;
              Se(y.La.Ua)(y, { atime: e, mtime: a });
            }
            return 0;
          } catch (b) {
            if (typeof _ > "u" || b.name !== "ErrnoError") throw b;
            return -b.Pa;
          }
        },
        m: () => le(""),
        l: () => {
          Me = !1, at = 0;
        },
        A: function(e, t) {
          e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), e = new Date(1e3 * e), E[t >> 2] = e.getSeconds(), E[t + 4 >> 2] = e.getMinutes(), E[t + 8 >> 2] = e.getHours(), E[t + 12 >> 2] = e.getDate(), E[t + 16 >> 2] = e.getMonth(), E[t + 20 >> 2] = e.getFullYear() - 1900, E[t + 24 >> 2] = e.getDay();
          var r = e.getFullYear();
          E[t + 28 >> 2] = (r % 4 !== 0 || r % 100 === 0 && r % 400 !== 0 ? Rr : Sr)[e.getMonth()] + e.getDate() - 1 | 0, E[t + 36 >> 2] = -(60 * e.getTimezoneOffset()), r = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
          var n = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
          E[t + 32 >> 2] = (r != n && e.getTimezoneOffset() == Math.min(n, r)) | 0;
        },
        y: function(e, t, r, n, i, a, s) {
          i = -9007199254740992 > i || 9007199254740992 < i ? NaN : Number(i);
          try {
            var m = S(n);
            if (t & 2 && !(r & 2) && (m.flags & 2097155) !== 2) throw new f(2);
            if ((m.flags & 2097155) === 1) throw new f(2);
            if (!m.Ma.jb) throw new f(43);
            if (!e) throw new f(28);
            var y = m.Ma.jb(m, e, i, t, r), b = y.Xb;
            return E[a >> 2] = y.Eb, v[s >> 2] = b, 0;
          } catch (g) {
            if (typeof _ > "u" || g.name !== "ErrnoError") throw g;
            return -g.Pa;
          }
        },
        z: function(e, t, r, n, i, a) {
          a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
          try {
            var s = S(i);
            if (r & 2) {
              if (r = a, (s.node.mode & 61440) !== 32768) throw new f(43);
              if (!(n & 2)) {
                var m = A.slice(e, e + t);
                s.Ma.kb && s.Ma.kb(s, m, r, t, n);
              }
            }
          } catch (y) {
            if (typeof _ > "u" || y.name !== "ErrnoError") throw y;
            return -y.Pa;
          }
        },
        n: (e, t) => {
          if (me[e] && (clearTimeout(me[e].id), delete me[e]), !t) return 0;
          var r = setTimeout(() => {
            delete me[e], Or(() => Xt(e, performance.now()));
          }, t);
          return me[e] = { id: r, lc: t }, 0;
        },
        B: (e, t, r, n) => {
          var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1).getTimezoneOffset();
          i = new Date(i, 6, 1).getTimezoneOffset(), v[e >> 2] = 60 * Math.max(a, i), E[t >> 2] = +(a != i), t = (s) => {
            var m = Math.abs(s);
            return `UTC${0 <= s ? "-" : "+"}${String(Math.floor(m / 60)).padStart(2, "0")}${String(m % 60).padStart(2, "0")}`;
          }, e = t(a), t = t(i), i < a ? (I(e, A, r, 17), I(t, A, n, 17)) : (I(e, A, n, 17), I(t, A, r, 17));
        },
        d: () => Date.now(),
        s: () => 2147483648,
        c: () => performance.now(),
        o: (e) => {
          var t = A.length;
          if (e >>>= 0, 2147483648 < e) return !1;
          for (var r = 1; 4 >= r; r *= 2) {
            var n = t * (1 + 0.2 / r);
            n = Math.min(n, e + 100663296);
            e: {
              n = (Math.min(2147483648, 65536 * Math.ceil(Math.max(
                e,
                n
              ) / 65536)) - je.buffer.byteLength + 65535) / 65536 | 0;
              try {
                je.grow(n), mt();
                var i = 1;
                break e;
              } catch {
              }
              i = void 0;
            }
            if (i) return !0;
          }
          return !1;
        },
        E: (e, t) => {
          var r = 0, n = 0, i;
          for (i of Bt()) {
            var a = t + r;
            v[e + n >> 2] = a, r += I(i, A, a, 1 / 0) + 1, n += 4;
          }
          return 0;
        },
        F: (e, t) => {
          var r = Bt();
          v[e >> 2] = r.length, e = 0;
          for (var n of r) e += re(n) + 1;
          return v[t >> 2] = e, 0;
        },
        e: function(e) {
          try {
            var t = S(e);
            return ot(t), 0;
          } catch (r) {
            if (typeof _ > "u" || r.name !== "ErrnoError") throw r;
            return r.Pa;
          }
        },
        p: function(e, t) {
          try {
            var r = S(e);
            return M[t] = r.tty ? 2 : R(r.mode) ? 3 : (r.mode & 61440) === 40960 ? 7 : 4, se[t + 2 >> 1] = 0, D[t + 8 >> 3] = BigInt(0), D[t + 16 >> 3] = BigInt(0), 0;
          } catch (n) {
            if (typeof _ > "u" || n.name !== "ErrnoError") throw n;
            return n.Pa;
          }
        },
        w: function(e, t, r, n) {
          try {
            e: {
              var i = S(e);
              e = t;
              for (var a, s = t = 0; s < r; s++) {
                var m = v[e >> 2], y = v[e + 4 >> 2];
                e += 8;
                var b = zt(i, M, m, y, a);
                if (0 > b) {
                  var g = -1;
                  break e;
                }
                if (t += b, b < y) break;
                typeof a < "u" && (a += b);
              }
              g = t;
            }
            return v[n >> 2] = g, 0;
          } catch (N) {
            if (typeof _ > "u" || N.name !== "ErrnoError") throw N;
            return N.Pa;
          }
        },
        D: function(e, t, r, n) {
          t = -9007199254740992 > t || 9007199254740992 < t ? NaN : Number(t);
          try {
            if (isNaN(t)) return 61;
            var i = S(e);
            return Wt(i, t, r), D[n >> 3] = BigInt(i.position), i.rb && t === 0 && r === 0 && (i.rb = null), 0;
          } catch (a) {
            if (typeof _ > "u" || a.name !== "ErrnoError") throw a;
            return a.Pa;
          }
        },
        I: function(e) {
          var r, n;
          try {
            var t = S(e);
            return (n = (r = t.Ma) == null ? void 0 : r.fsync) == null ? void 0 : n.call(r, t);
          } catch (i) {
            if (typeof _ > "u" || i.name !== "ErrnoError") throw i;
            return i.Pa;
          }
        },
        t: function(e, t, r, n) {
          try {
            e: {
              var i = S(e);
              e = t;
              for (var a, s = t = 0; s < r; s++) {
                var m = v[e >> 2], y = v[e + 4 >> 2];
                e += 8;
                var b = Qt(i, M, m, y, a);
                if (0 > b) {
                  var g = -1;
                  break e;
                }
                if (t += b, b < y) break;
                typeof a < "u" && (a += b);
              }
              g = t;
            }
            return v[n >> 2] = g, 0;
          } catch (N) {
            if (typeof _ > "u" || N.name !== "ErrnoError") throw N;
            return N.Pa;
          }
        },
        k: Ft
      };
      function ft() {
        function e() {
          var i;
          if (u.calledRun = !0, !ke) {
            if (!u.noFSInit && !Nt) {
              var t, r;
              Nt = !0, t ?? (t = u.stdin), r ?? (r = u.stdout), n ?? (n = u.stderr), t ? V("stdin", t) : it("/dev/tty", "/dev/stdin"), r ? V("stdout", null, r) : it("/dev/tty", "/dev/stdout"), n ? V("stderr", null, n) : it("/dev/tty1", "/dev/stderr"), oe("/dev/stdin", 0), oe("/dev/stdout", 1), oe("/dev/stderr", 1);
            }
            if (ht.N(), At = !1, (i = u.onRuntimeInitialized) == null || i.call(u), u.postRun) for (typeof u.postRun == "function" && (u.postRun = [u.postRun]); u.postRun.length; ) {
              var n = u.postRun.shift();
              dt.push(n);
            }
            ct(dt);
          }
        }
        if (0 < Z) fe = ft;
        else {
          if (u.preRun) for (typeof u.preRun == "function" && (u.preRun = [u.preRun]); u.preRun.length; ) dr();
          ct(bt), 0 < Z ? fe = ft : u.setStatus ? (u.setStatus("Running..."), setTimeout(() => {
            setTimeout(() => u.setStatus(""), 1), e();
          }, 1)) : e();
        }
      }
      var ht;
      return async function() {
        var r;
        function e(n) {
          var i;
          return n = ht = n.exports, u._sqlite3_free = n.P, u._sqlite3_value_text = n.Q, u._sqlite3_prepare_v2 = n.R, u._sqlite3_step = n.S, u._sqlite3_reset = n.T, u._sqlite3_exec = n.U, u._sqlite3_finalize = n.V, u._sqlite3_column_name = n.W, u._sqlite3_column_text = n.X, u._sqlite3_column_type = n.Y, u._sqlite3_errmsg = n.Z, u._sqlite3_clear_bindings = n._, u._sqlite3_value_blob = n.$, u._sqlite3_value_bytes = n.aa, u._sqlite3_value_double = n.ba, u._sqlite3_value_int = n.ca, u._sqlite3_value_type = n.da, u._sqlite3_result_blob = n.ea, u._sqlite3_result_double = n.fa, u._sqlite3_result_error = n.ga, u._sqlite3_result_int = n.ha, u._sqlite3_result_int64 = n.ia, u._sqlite3_result_null = n.ja, u._sqlite3_result_text = n.ka, u._sqlite3_aggregate_context = n.la, u._sqlite3_column_count = n.ma, u._sqlite3_data_count = n.na, u._sqlite3_column_blob = n.oa, u._sqlite3_column_bytes = n.pa, u._sqlite3_column_double = n.qa, u._sqlite3_bind_blob = n.ra, u._sqlite3_bind_double = n.sa, u._sqlite3_bind_int = n.ta, u._sqlite3_bind_text = n.ua, u._sqlite3_bind_parameter_index = n.va, u._sqlite3_sql = n.wa, u._sqlite3_normalized_sql = n.xa, u._sqlite3_changes = n.ya, u._sqlite3_close_v2 = n.za, u._sqlite3_create_function_v2 = n.Aa, u._sqlite3_update_hook = n.Ba, u._sqlite3_open = n.Ca, De = u._malloc = n.Da, de = u._free = n.Ea, u._RegisterExtensionFunctions = n.Fa, Yt = n.Ga, Xt = n.Ha, be = n.Ia, ee = n.Ja, ye = n.Ka, je = n.M, X = n.O, mt(), Z--, (i = u.monitorRunDependencies) == null || i.call(u, Z), Z == 0 && fe && (n = fe, fe = null, n()), ht;
        }
        Z++, (r = u.monitorRunDependencies) == null || r.call(u, Z);
        var t = { a: Tr };
        return u.instantiateWasm ? new Promise((n) => {
          u.instantiateWasm(t, (i, a) => {
            n(e(i));
          });
        }) : (Ce ?? (Ce = u.locateFile ? u.locateFile("sql-wasm.wasm", ge) : ge + "sql-wasm.wasm"), e((await cr(t)).instance));
      }(), ft(), z;
    }), x);
  };
  k.exports = F, k.exports.default = F;
})(sr);
var lr = sr.exports;
const cn = /* @__PURE__ */ mn(lr), wn = /* @__PURE__ */ pn({
  __proto__: null,
  default: cn
}, [lr]);
export {
  wn as s
};
