import { app as le, safeStorage as xe, BrowserWindow as Ft, Menu as Li, ipcMain as se } from "electron";
import { fileURLToPath as Ii } from "node:url";
import P from "node:path";
import U from "node:crypto";
import q from "node:fs";
import { createRequire as Oi } from "node:module";
import ie from "events";
import Kt from "url";
import Qt from "util";
import Ge from "fs";
import Mi from "http";
import ji from "https";
import Ni from "zlib";
import O from "stream";
import he from "net";
import Gt from "dns";
import Wt from "os";
import Xt from "path";
import X from "crypto";
import Vt from "tls";
import Pi from "child_process";
var Ee = {}, Jt = { exports: {} }, V = {};
const ee = 2147483647, R = 36, We = 1, de = 26, Hi = 38, Ui = 700, Yt = 72, Zt = 128, ei = "-", Ri = /^xn--/, zi = /[^\0-\x7F]/, Di = /[\x2E\u3002\uFF0E\uFF61]/g, Bi = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Ce = R - We, z = Math.floor, Le = String.fromCharCode;
function F(o) {
  throw new RangeError(Bi[o]);
}
function qi(o, e) {
  const t = [];
  let s = o.length;
  for (; s--; )
    t[s] = e(o[s]);
  return t;
}
function ti(o, e) {
  const t = o.split("@");
  let s = "";
  t.length > 1 && (s = t[0] + "@", o = t[1]), o = o.replace(Di, ".");
  const i = o.split("."), n = qi(i, e).join(".");
  return s + n;
}
function ii(o) {
  const e = [];
  let t = 0;
  const s = o.length;
  for (; t < s; ) {
    const i = o.charCodeAt(t++);
    if (i >= 55296 && i <= 56319 && t < s) {
      const n = o.charCodeAt(t++);
      (n & 64512) == 56320 ? e.push(((i & 1023) << 10) + (n & 1023) + 65536) : (e.push(i), t--);
    } else
      e.push(i);
  }
  return e;
}
const $i = (o) => String.fromCodePoint(...o), Fi = function(o) {
  return o >= 48 && o < 58 ? 26 + (o - 48) : o >= 65 && o < 91 ? o - 65 : o >= 97 && o < 123 ? o - 97 : R;
}, at = function(o, e) {
  return o + 22 + 75 * (o < 26) - ((e != 0) << 5);
}, si = function(o, e, t) {
  let s = 0;
  for (
    o = t ? z(o / Ui) : o >> 1, o += z(o / e);
    /* no initialization */
    o > Ce * de >> 1;
    s += R
  )
    o = z(o / Ce);
  return z(s + (Ce + 1) * o / (o + Hi));
}, ni = function(o) {
  const e = [], t = o.length;
  let s = 0, i = Zt, n = Yt, a = o.lastIndexOf(ei);
  a < 0 && (a = 0);
  for (let r = 0; r < a; ++r)
    o.charCodeAt(r) >= 128 && F("not-basic"), e.push(o.charCodeAt(r));
  for (let r = a > 0 ? a + 1 : 0; r < t; ) {
    const p = s;
    for (let l = 1, m = R; ; m += R) {
      r >= t && F("invalid-input");
      const d = Fi(o.charCodeAt(r++));
      d >= R && F("invalid-input"), d > z((ee - s) / l) && F("overflow"), s += d * l;
      const u = m <= n ? We : m >= n + de ? de : m - n;
      if (d < u)
        break;
      const f = R - u;
      l > z(ee / f) && F("overflow"), l *= f;
    }
    const c = e.length + 1;
    n = si(s - p, c, p == 0), z(s / c) > ee - i && F("overflow"), i += z(s / c), s %= c, e.splice(s++, 0, i);
  }
  return String.fromCodePoint(...e);
}, ai = function(o) {
  const e = [];
  o = ii(o);
  const t = o.length;
  let s = Zt, i = 0, n = Yt;
  for (const p of o)
    p < 128 && e.push(Le(p));
  const a = e.length;
  let r = a;
  for (a && e.push(ei); r < t; ) {
    let p = ee;
    for (const l of o)
      l >= s && l < p && (p = l);
    const c = r + 1;
    p - s > z((ee - i) / c) && F("overflow"), i += (p - s) * c, s = p;
    for (const l of o)
      if (l < s && ++i > ee && F("overflow"), l === s) {
        let m = i;
        for (let d = R; ; d += R) {
          const u = d <= n ? We : d >= n + de ? de : d - n;
          if (m < u)
            break;
          const f = m - u, b = R - u;
          e.push(Le(at(u + f % b, 0))), m = z(f / b);
        }
        e.push(Le(at(m, 0))), n = si(i, c, r === a), i = 0, ++r;
      }
    ++i, ++s;
  }
  return e.join("");
}, Ki = function(o) {
  return ti(o, function(e) {
    return Ri.test(e) ? ni(e.slice(4).toLowerCase()) : e;
  });
}, Qi = function(o) {
  return ti(o, function(e) {
    return zi.test(e) ? "xn--" + ai(e) : e;
  });
}, Gi = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: ii,
    encode: $i
  },
  decode: ni,
  encode: ai,
  toASCII: Qi,
  toUnicode: Ki
};
var Xe = Gi;
const me = Kt, Wi = Xe, _e = typeof URL < "u" && URL || me.URL, Xi = /^([a-zA-Z][a-zA-Z0-9+.-]*:)(?!\/\/)(.+)$/;
function De(o) {
  try {
    return decodeURIComponent(o);
  } catch {
    return o;
  }
}
function Vi(o) {
  let e = o || "";
  return e ? e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" ? e.slice(1, -1) : Wi.toASCII(De(e)) : "";
}
V.parse = (o, e) => {
  if (o = o || "", !_e)
    return me.parse(o, e);
  const t = Xi.exec(o), s = t ? t[1] + "//" + t[2] : o;
  let i;
  try {
    i = new _e(s);
  } catch {
    return me.parse(o, e);
  }
  const n = Vi(i.hostname), a = i.port || null, r = i.pathname || null, p = i.search || null;
  let c = null;
  (i.username || i.password) && (c = De(i.username) + (i.password ? ":" + De(i.password) : ""));
  let l;
  return e ? (l = /* @__PURE__ */ Object.create(null), i.searchParams.forEach((m, d) => {
    Object.prototype.hasOwnProperty.call(l, d) ? Array.isArray(l[d]) ? l[d].push(m) : l[d] = [l[d], m] : l[d] = m;
  })) : l = p ? p.slice(1) : null, {
    protocol: i.protocol || null,
    host: i.host || null,
    hostname: n,
    port: a,
    pathname: r,
    search: p,
    path: (r || "") + (p || "") || null,
    href: i.href,
    auth: c,
    query: l
  };
};
V.resolve = (o, e) => {
  if (!_e)
    return me.resolve(o, e);
  try {
    return new _e(e, o).href;
  } catch {
    return me.resolve(o, e);
  }
};
var Ve = { exports: {} };
const ot = V, rt = 1800;
let Ji = class {
  constructor(e) {
    this.options = e || {}, this.cookies = [];
  }
  /**
   * Stores a cookie string to the cookie storage
   *
   * @param {String} cookieStr Value from the 'Set-Cookie:' header
   * @param {String} url Current URL
   */
  set(e, t) {
    const s = ot.parse(t || ""), i = this.parse(e);
    let n;
    return i.domain ? (n = i.domain.replace(/^\./, ""), // can't be valid if the requested domain is shorter than current hostname
    (s.hostname.length < n.length || // prefix domains with dot to be sure that partial matches are not used
    ("." + s.hostname).substr(-n.length + 1) !== "." + n) && (i.domain = s.hostname)) : i.domain = s.hostname, i.path || (i.path = this.getPath(s.pathname)), i.expires || (i.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || rt) || rt) * 1e3)), this.add(i);
  }
  /**
   * Returns cookie string for the 'Cookie:' header.
   *
   * @param {String} url URL to check for
   * @returns {String} Cookie header or empty string if no matches were found
   */
  get(e) {
    return this.list(e).map((t) => t.name + "=" + t.value).join("; ");
  }
  /**
   * Lists all valied cookie objects for the specified URL
   *
   * @param {String} url URL to check for
   * @returns {Array} An array of cookie objects
   */
  list(e) {
    const t = [];
    for (let s = this.cookies.length - 1; s >= 0; s--) {
      const i = this.cookies[s];
      if (this.isExpired(i)) {
        this.cookies.splice(s, 1);
        continue;
      }
      this.match(i, e) && t.unshift(i);
    }
    return t;
  }
  /**
   * Parses cookie string from the 'Set-Cookie:' header
   *
   * @param {String} cookieStr String from the 'Set-Cookie:' header
   * @returns {Object} Cookie object
   */
  parse(e) {
    const t = {};
    return (e || "").toString().split(";").forEach((s) => {
      const i = s.split("="), n = i.shift().trim().toLowerCase();
      let a = i.join("=").trim(), r;
      if (n)
        switch (n) {
          case "expires":
            a = new Date(a), a.toString() !== "Invalid Date" && (t.expires = a);
            break;
          case "path":
            t.path = a;
            break;
          case "domain":
            r = a.toLowerCase(), r.length && r.charAt(0) !== "." && (r = "." + r), t.domain = r;
            break;
          case "max-age":
            t.expires = new Date(Date.now() + (Number(a) || 0) * 1e3);
            break;
          case "secure":
            t.secure = !0;
            break;
          case "httponly":
            t.httponly = !0;
            break;
          default:
            t.name || (t.name = n, t.value = a);
        }
    }), t;
  }
  /**
   * Checks if a cookie object is valid for a specified URL
   *
   * @param {Object} cookie Cookie object
   * @param {String} url URL to check for
   * @returns {Boolean} true if cookie is valid for specifiec URL
   */
  match(e, t) {
    const s = ot.parse(t || "");
    return !(s.hostname !== e.domain && (e.domain.charAt(0) !== "." || ("." + s.hostname).substr(-e.domain.length) !== e.domain) || this.getPath(s.pathname).substr(0, e.path.length) !== e.path || e.secure && s.protocol !== "https:");
  }
  /**
   * Adds (or updates/removes if needed) a cookie object to the cookie storage
   *
   * @param {Object} cookie Cookie value to be stored
   */
  add(e) {
    if (!e || !e.name)
      return !1;
    for (let t = 0, s = this.cookies.length; t < s; t++)
      if (this.compare(this.cookies[t], e))
        return this.isExpired(e) ? (this.cookies.splice(t, 1), !1) : (this.cookies[t] = e, !0);
    return this.isExpired(e) || this.cookies.push(e), !0;
  }
  /**
   * Checks if two cookie objects are the same
   *
   * @param {Object} a Cookie to check against
   * @param {Object} b Cookie to check against
   * @returns {Boolean} True, if the cookies are the same
   */
  compare(e, t) {
    return e.name === t.name && e.path === t.path && e.domain === t.domain && e.secure === t.secure && e.httponly === t.httponly;
  }
  /**
   * Checks if a cookie is expired
   *
   * @param {Object} cookie Cookie object to check against
   * @returns {Boolean} True, if the cookie is expired
   */
  isExpired(e) {
    return e.expires && e.expires < /* @__PURE__ */ new Date() || !e.value;
  }
  /**
   * Returns normalized cookie path for an URL path argument
   *
   * @param {String} pathname
   * @returns {String} Normalized path
   */
  getPath(e) {
    let t = (e || "/").split("/");
    return t.pop(), t = t.join("/").trim(), t.charAt(0) !== "/" && (t = "/" + t), t.substr(-1) !== "/" && (t += "/"), t;
  }
};
var Yi = Ji;
const Zi = "nodemailer", es = "9.1.0", ts = "https://nodemailer.com/", D = {
  name: Zi,
  version: es,
  homepage: ts
};
var oi = { exports: {} };
(function(o) {
  const e = {
    // Connection errors
    ECONNECTION: "Connection closed unexpectedly",
    ETIMEDOUT: "Connection or operation timed out",
    ESOCKET: "Socket-level error",
    EDNS: "DNS resolution failed",
    // TLS/Security errors
    ETLS: "TLS handshake or STARTTLS failed",
    EREQUIRETLS: "REQUIRETLS not supported by server (RFC 8689)",
    // Protocol errors
    EPROTOCOL: "Invalid SMTP server response",
    EENVELOPE: "Invalid mail envelope (sender or recipients)",
    EMESSAGE: "Message delivery error",
    ESTREAM: "Stream processing error",
    // Authentication errors
    EAUTH: "Authentication failed",
    ENOAUTH: "Authentication credentials not provided",
    EOAUTH2: "OAuth2 token generation or refresh error",
    // Resource errors
    EMAXLIMIT: "Pool resource limit reached (max messages per connection)",
    EMAXRECIPIENTS: "Recipient count exceeds maxRecipients",
    // Transport-specific errors
    ESENDMAIL: "Sendmail command error",
    ESES: "AWS SES transport error",
    // Configuration and access errors
    ECONFIG: "Invalid configuration",
    EPROXY: "Proxy connection error",
    EFILEACCESS: "File access rejected (disableFileAccess is set)",
    EURLACCESS: "URL access rejected (disableUrlAccess is set)",
    EFETCH: "HTTP fetch error"
  };
  o.exports = { ERROR_CODES: e };
  for (const t of Object.keys(e))
    o.exports[t] = t;
})(oi);
var H = oi.exports, ri = { exports: {} };
(function(o) {
  o.exports.isProtoKey = (e) => e === "__proto__", o.exports.copyOwnKeys = (e, t, s) => (Object.keys(t || {}).forEach((i) => {
    o.exports.isProtoKey(i) || s && s(i) || (e[i] = t[i]);
  }), e);
})(ri);
var be = ri.exports;
const is = Mi, ss = ji, pi = V, ns = Ni, { PassThrough: as } = O, ci = Yi, os = D, rs = he, j = H, { isProtoKey: ps } = be, cs = 5, ls = [
  "ALPNProtocols",
  "ca",
  "cert",
  "checkServerIdentity",
  "ciphers",
  "crl",
  "dhparam",
  "ecdhCurve",
  "honorCipherOrder",
  "key",
  "maxVersion",
  "minVersion",
  "passphrase",
  "pfx",
  "rejectUnauthorized",
  "secureContext",
  "secureOptions",
  "secureProtocol",
  "servername",
  "sessionIdContext",
  "sigalgs"
];
function pt(o) {
  let e;
  try {
    e = pi.parse(o);
  } catch {
    return !1;
  }
  return e.protocol !== "http:" && e.protocol !== "https:" ? !1 : e;
}
Ve.exports = function(o, e) {
  return li(o, e);
};
Ve.exports.Cookies = ci;
function li(o, e) {
  e = e || {}, e.fetchRes = e.fetchRes || new as(), e.cookies = e.cookies || new ci(), e.redirects = e.redirects || 0, e.maxRedirects = isNaN(e.maxRedirects) ? cs : e.maxRedirects;
  const t = e.fetchRes, s = pt(o);
  if (!s)
    return e.body && typeof e.body.destroy == "function" && (e.body.on("error", () => !1), e.body.destroy()), setImmediate(() => {
      const d = new Error("Unsupported protocol for URL " + o);
      d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d);
    }), t;
  e.cookie && ([].concat(e.cookie || []).forEach((d) => {
    e.cookies.set(d, o);
  }), e.cookie = !1);
  let i = (e.method || "").toString().trim().toUpperCase() || "GET", n = !1, a, r;
  const p = s.protocol === "https:" ? ss : is, c = {
    "accept-encoding": "gzip,deflate",
    "user-agent": "nodemailer/" + os.version
  };
  if (Object.keys(e.headers || {}).forEach((d) => {
    ps(d.toLowerCase().trim()) || (c[d.toLowerCase().trim()] = e.headers[d]);
  }), e.userAgent && (c["user-agent"] = e.userAgent), s.auth && (c.Authorization = "Basic " + Buffer.from(s.auth).toString("base64")), (a = e.cookies.get(o)) && (c.cookie = a), e.body) {
    if (e.contentType !== !1 && (c["Content-Type"] = e.contentType || "application/x-www-form-urlencoded"), typeof e.body.pipe == "function")
      c["Transfer-Encoding"] = "chunked", r = e.body, r.on("error", (d) => {
        n || (n = !0, d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d));
      });
    else {
      if (e.body instanceof Buffer)
        r = e.body;
      else if (typeof e.body == "object")
        try {
          r = Buffer.from(
            Object.keys(e.body).map((d) => {
              const u = e.body[d].toString().trim();
              return encodeURIComponent(d) + "=" + encodeURIComponent(u);
            }).join("&")
          );
        } catch (d) {
          if (n)
            return;
          n = !0, d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d);
          return;
        }
      else
        r = Buffer.from(e.body.toString().trim());
      c["Content-Type"] = e.contentType || "application/x-www-form-urlencoded", c["Content-Length"] = r.length;
    }
    i = (e.method || "").toString().trim().toUpperCase() || "POST";
  }
  let l;
  const m = {
    method: i,
    host: s.hostname,
    path: s.path,
    port: s.port ? s.port : s.protocol === "https:" ? 443 : 80,
    headers: c,
    // Validate TLS certificates by default. Callers that genuinely need to
    // reach a self-signed/internal host opt out explicitly with
    // options.tls = { rejectUnauthorized: false }.
    rejectUnauthorized: !0,
    agent: !1
  };
  e.tls && Object.keys(e.tls).forEach((d) => {
    ls.includes(d) && (m[d] = e.tls[d]);
  }), s.protocol === "https:" && s.hostname && s.hostname !== m.host && !rs.isIP(s.hostname) && !m.servername && (m.servername = s.hostname);
  try {
    l = p.request(m);
  } catch (d) {
    return n = !0, setImmediate(() => {
      d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d);
    }), t;
  }
  return e.timeout && l.setTimeout(e.timeout, () => {
    if (n)
      return;
    n = !0, l.abort();
    const d = new Error("Request Timeout");
    d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d);
  }), l.on("error", (d) => {
    n || (n = !0, d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d));
  }), l.on("response", (d) => {
    let u;
    if (!n) {
      switch (d.headers["content-encoding"]) {
        case "gzip":
        case "deflate":
          u = ns.createUnzip();
          break;
      }
      if (d.headers["set-cookie"] && [].concat(d.headers["set-cookie"] || []).forEach((f) => {
        e.cookies.set(f, o);
      }), [301, 302, 303, 307, 308].includes(d.statusCode) && d.headers.location) {
        if (e.redirects++, e.redirects > e.maxRedirects) {
          n = !0;
          const S = new Error("Maximum redirect count exceeded");
          S.code = j.EFETCH, S.sourceUrl = o, t.emit("error", S), l.abort();
          return;
        }
        e.method = "GET", e.body = !1;
        let f;
        try {
          f = pi.resolve(o, d.headers.location);
        } catch {
          f = d.headers.location;
        }
        const b = pt(f);
        if (!b) {
          n = !0;
          const S = new Error("Unsupported protocol for URL " + f);
          S.code = j.EFETCH, S.sourceUrl = f, t.emit("error", S), l.abort();
          return;
        }
        const A = b.hostname !== s.hostname, $ = s.protocol === "https:" && b.protocol === "http:";
        if (e.headers && (A || $)) {
          const S = ["authorization", "cookie", "proxy-authorization"];
          Object.keys(e.headers).forEach((M) => {
            S.includes(M.toLowerCase()) && delete e.headers[M];
          });
        }
        return li(f, e);
      }
      if (t.statusCode = d.statusCode, t.headers = d.headers, d.statusCode >= 300 && !e.allowErrorResponse) {
        n = !0;
        const f = new Error("Invalid status code " + d.statusCode);
        f.code = j.EFETCH, f.sourceUrl = o, t.emit("error", f), l.abort();
        return;
      }
      d.on("error", (f) => {
        n || (n = !0, f.code = j.EFETCH, f.sourceUrl = o, t.emit("error", f), l.abort());
      }), u ? (d.pipe(u).pipe(t), u.on("error", (f) => {
        n || (n = !0, f.code = j.EFETCH, f.sourceUrl = o, t.emit("error", f), l.abort());
      })) : d.pipe(t);
    }
  }), setImmediate(() => {
    if (r)
      try {
        if (typeof r.pipe == "function")
          return r.pipe(l);
        l.write(r);
      } catch (d) {
        n = !0, d.code = j.EFETCH, d.sourceUrl = o, t.emit("error", d);
        return;
      }
    l.end();
  }), t;
}
var ye = Ve.exports;
(function(o) {
  const e = V, t = Qt, s = Ge, i = ye, n = H, a = be, r = Gt, p = he, c = Wt, l = o.exports.isProtoKey = a.isProtoKey;
  o.exports.copyOwnKeys = a.copyOwnKeys;
  const m = 5 * 60 * 1e3, d = 30 * 1e3, u = 1e3;
  let f = 0;
  o.exports._lastCacheCleanup = () => f, o.exports._resetCacheCleanup = () => {
    f = 0;
  };
  let b;
  try {
    b = c.networkInterfaces();
  } catch {
  }
  o.exports.networkInterfaces = b;
  const A = (h, v) => {
    const x = o.exports.networkInterfaces;
    return x ? Object.keys(x).map((g) => x[g]).reduce((g, E) => g.concat(E), []).filter((g) => !g.internal || v).some((g) => g.family === "IPv" + h || g.family === h) : !0;
  }, $ = (h, v, x, g) => {
    if (x = x || {}, !A(h, x.allowInternalNetworkInterfaces))
      return g(null, []);
    (r.Resolver ? new r.Resolver(x) : r)["resolve" + h](v, (w, _) => {
      if (w) {
        switch (w.code) {
          case r.NODATA:
          case r.NOTFOUND:
          case r.NOTIMP:
          case r.SERVFAIL:
          case r.CONNREFUSED:
          case r.REFUSED:
          case "EAI_AGAIN":
            return g(null, []);
        }
        return g(w);
      }
      return g(null, Array.isArray(_) ? _ : [].concat(_ || []));
    });
  }, S = o.exports.dnsCache = /* @__PURE__ */ new Map(), M = (h, v) => {
    if (!h)
      return Object.assign({}, v || {});
    const x = h.addresses || [], g = x.length > 0 ? x[Math.floor(Math.random() * x.length)] : null;
    return Object.assign(
      {
        servername: h.servername,
        host: g,
        // Include all addresses for connection fallback support
        _addresses: x
      },
      v || {}
    );
  };
  o.exports.resolveHostname = (h, v) => {
    if (h = h || {}, !h.host && h.servername && (h.host = h.servername), !h.host || p.isIP(h.host)) {
      const y = {
        addresses: [h.host],
        servername: h.servername || !1
      };
      return v(
        null,
        M(y, {
          cached: !1
        })
      );
    }
    let x;
    if (S.has(h.host)) {
      x = S.get(h.host);
      const y = Date.now();
      if (y - f > d) {
        f = y;
        for (const [k, T] of S.entries())
          T.expires && T.expires < y && S.delete(k);
        if (S.size > u) {
          const k = Math.floor(u * 0.1);
          Array.from(S.keys()).slice(0, k).forEach((B) => S.delete(B));
        }
      }
      if (!x.expires || x.expires >= y)
        return v(
          null,
          M(x.value, {
            cached: !0
          })
        );
    }
    let g = [], E = [], w = null, _ = null;
    $(4, h.host, h, (y, k) => {
      y ? w = y : g = k || [], $(6, h.host, h, (T, B) => {
        T ? _ = T : E = B || [];
        const J = g.concat(E);
        if (J.length) {
          const I = {
            addresses: J,
            servername: h.servername || h.host
          };
          return S.set(h.host, {
            value: I,
            expires: Date.now() + (h.dnsTtl || m)
          }), v(
            null,
            M(I, {
              cached: !1
            })
          );
        }
        if (w && _ && x)
          return S.set(h.host, {
            value: x.value,
            expires: Date.now() + (h.dnsTtl || m)
          }), v(
            null,
            M(x.value, {
              cached: !0,
              error: w
            })
          );
        try {
          r.lookup(h.host, { all: !0 }, (I, K) => {
            if (I)
              return x ? (S.set(h.host, {
                value: x.value,
                expires: Date.now() + (h.dnsTtl || m)
              }), v(
                null,
                M(x.value, {
                  cached: !0,
                  error: I
                })
              )) : v(I);
            const fe = K ? K.filter((ke) => A(ke.family)).map((ke) => ke.address) : [];
            if (K && K.length && !fe.length && console.warn(`Failed to resolve IPv${K[0].family} addresses with current network`), !fe.length && x)
              return v(
                null,
                M(x.value, {
                  cached: !0
                })
              );
            const nt = {
              addresses: fe.length ? fe : [h.host],
              servername: h.servername || h.host
            };
            return S.set(h.host, {
              value: nt,
              expires: Date.now() + (h.dnsTtl || m)
            }), v(
              null,
              M(nt, {
                cached: !1
              })
            );
          });
        } catch (I) {
          return x ? (S.set(h.host, {
            value: x.value,
            expires: Date.now() + (h.dnsTtl || m)
          }), v(
            null,
            M(x.value, {
              cached: !0,
              error: I
            })
          )) : v(w || _ || I);
        }
      });
    });
  }, o.exports.parseConnectionUrl = (h) => {
    h = h || "";
    const v = {}, x = e.parse(h, !0);
    switch (x.protocol) {
      case "smtp:":
        v.secure = !1;
        break;
      case "smtps:":
        v.secure = !0;
        break;
      case "direct:":
        v.direct = !0;
        break;
    }
    if (!isNaN(x.port) && Number(x.port) && (v.port = Number(x.port)), x.hostname && (v.host = x.hostname), x.auth) {
      const g = x.auth.split(":");
      v.auth = {
        user: g.shift(),
        pass: g.join(":")
      };
    }
    return Object.keys(x.query || {}).forEach((g) => {
      let E = v, w = g, _ = x.query[g];
      switch (isNaN(_) || (_ = Number(_)), _) {
        case "true":
          _ = !0;
          break;
        case "false":
          _ = !1;
          break;
      }
      if (g.indexOf("tls.") === 0)
        w = g.substr(4), v.tls || (v.tls = {}), E = v.tls;
      else if (g.indexOf(".") >= 0)
        return;
      !l(w) && !(w in E) && (E[w] = _);
    }), v;
  }, o.exports._logFunc = (h, v, x, g, E, ...w) => {
    const _ = Object.assign({}, x || {}, g || {});
    delete _.level;
    let y = v;
    typeof h[y] != "function" && (y = ["info", "debug", "log", "trace", "warn", "error"].find((k) => typeof h[k] == "function")), y && h[y](_, E, ...w);
  }, o.exports.getLogger = (h, v) => {
    h = h || {};
    const x = {}, g = ["trace", "debug", "info", "warn", "error", "fatal"];
    if (!h.logger)
      return g.forEach((w) => {
        x[w] = () => !1;
      }), x;
    const E = h.logger === !0 ? Ci(g) : h.logger;
    return g.forEach((w) => {
      x[w] = (_, y, ...k) => {
        o.exports._logFunc(E, w, v, _, y, ...k);
      };
    }), x;
  }, o.exports.callbackPromise = (h, v) => function() {
    const x = Array.from(arguments), g = x.shift();
    g ? v(g) : h(...x);
  }, o.exports.parseDataURI = (h) => {
    if (typeof h != "string" || !h.startsWith("data:"))
      return null;
    const v = h.indexOf(",");
    if (v === -1)
      return null;
    const x = h.substring(v + 1), g = h.substring(5, v);
    let E;
    const w = g.split(";");
    if (w.length > 0) {
      const T = w[w.length - 1].toLowerCase().trim();
      ["base64", "utf8", "utf-8"].includes(T) && T.indexOf("=") === -1 && (E = T, w.pop());
    }
    const _ = w.length > 0 ? w.shift() : "application/octet-stream", y = {};
    for (let T = 0; T < w.length; T++) {
      const B = w[T], J = B.indexOf("=");
      if (J > 0) {
        const I = B.substring(0, J).trim(), K = B.substring(J + 1).trim();
        I && !l(I) && (y[I] = K);
      }
    }
    let k;
    try {
      if (E === "base64")
        k = Buffer.from(x, "base64");
      else
        try {
          k = Buffer.from(decodeURIComponent(x));
        } catch {
          k = Buffer.from(x);
        }
    } catch {
      k = Buffer.alloc(0);
    }
    return {
      data: k,
      encoding: E || null,
      contentType: _ || "application/octet-stream",
      params: y
    };
  }, o.exports.resolveContent = (h, v, x, g) => {
    !g && typeof x == "function" && (g = x, x = !1), x = x || {};
    let E;
    return g || (E = new Promise((w, _) => {
      g = o.exports.callbackPromise(w, _);
    })), ki(h, v, x, g), E;
  };
  function ki(h, v, x, g) {
    let E = h && h[v] && h[v].content || h[v];
    const w = (typeof h[v] == "object" && h[v].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
    if (!E)
      return g(null, E);
    if (typeof E == "object") {
      if (typeof E.pipe == "function")
        return Ae(E, (_, y) => {
          if (_)
            return g(_);
          h[v].content ? h[v].content = y : h[v] = y, g(null, y);
        });
      if (/^data:/i.test(E.path || E.href)) {
        const _ = o.exports.parseDataURI(E.path || E.href);
        return g(null, _ && _.data ? _.data : Buffer.alloc(0));
      } else if (E.href || /^https?:\/\//i.test(E.path)) {
        const _ = E.href || E.path;
        return x.disableUrlAccess ? setImmediate(() => {
          const y = new Error("Url access rejected for " + _);
          y.code = n.EURLACCESS, g(y);
        }) : Ae(i(_, { headers: E.httpHeaders, tls: E.tls }), g);
      } else if (E.path)
        return x.disableFileAccess ? setImmediate(() => {
          const _ = new Error("File access rejected for " + E.path);
          _.code = n.EFILEACCESS, g(_);
        }) : Ae(s.createReadStream(E.path), g);
    }
    typeof h[v].content == "string" && !["utf8", "usascii", "ascii"].includes(w) && (E = Buffer.from(h[v].content, w)), setImmediate(() => g(null, E));
  }
  o.exports.assign = function() {
    const h = Array.from(arguments), v = h.shift() || {};
    return h.forEach((x) => {
      Object.keys(x || {}).forEach((g) => {
        l(g) || (["tls", "auth"].includes(g) && x[g] && typeof x[g] == "object" ? v[g] = o.exports.copyOwnKeys(v[g] || {}, x[g]) : v[g] = x[g]);
      });
    }), v;
  }, o.exports.encodeXText = (h) => {
    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(h))
      return h;
    const v = Buffer.from(h);
    let x = "";
    for (let g = 0, E = v.length; g < E; g++) {
      const w = v[g];
      w < 33 || w > 126 || w === 43 || w === 61 ? x += "+" + (w < 16 ? "0" : "") + w.toString(16).toUpperCase() : x += String.fromCharCode(w);
    }
    return x;
  };
  function Ae(h, v) {
    let x = !1;
    const g = [];
    let E = 0;
    h.on("error", (w) => {
      x || (x = !0, v(w));
    }), h.on("readable", () => {
      let w;
      for (; (w = h.read()) !== null; )
        g.push(w), E += w.length;
    }), h.on("end", () => {
      if (x)
        return;
      x = !0;
      let w;
      try {
        w = Buffer.concat(g, E);
      } catch (_) {
        return v(_);
      }
      v(null, w);
    });
  }
  function Ci(h) {
    const v = h.reduce((w, _) => Math.max(w, _.length), 0), x = /* @__PURE__ */ new Map();
    h.forEach((w) => {
      let _ = w.toUpperCase();
      _.length < v && (_ += " ".repeat(v - _.length)), x.set(w, _);
    });
    const g = (w, _, y, ...k) => {
      let T = "";
      _ && (_.tnx === "server" ? T = "S: " : _.tnx === "client" && (T = "C: "), _.sid && (T = "[" + _.sid + "] " + T), _.cid && (T = "[#" + _.cid + "] " + T)), y = t.format(y, ...k), y.split(/\r?\n/).forEach((B) => {
        console.log("[%s] %s %s", (/* @__PURE__ */ new Date()).toISOString().substr(0, 19).replace(/T/, " "), x.get(w), T + B);
      });
    }, E = {};
    return h.forEach((w) => {
      E[w] = g.bind(null, w);
    }), E;
  }
})(Jt);
var L = Jt.exports;
const ds = Xt, ct = "application/octet-stream", ms = "bin", lt = /* @__PURE__ */ new Map([
  ["application/acad", "dwg"],
  ["application/applixware", "aw"],
  ["application/arj", "arj"],
  ["application/atom+xml", "xml"],
  ["application/atomcat+xml", "atomcat"],
  ["application/atomsvc+xml", "atomsvc"],
  ["application/base64", ["mm", "mme"]],
  ["application/binhex", "hqx"],
  ["application/binhex4", "hqx"],
  ["application/book", ["book", "boo"]],
  ["application/ccxml+xml,", "ccxml"],
  ["application/cdf", "cdf"],
  ["application/cdmi-capability", "cdmia"],
  ["application/cdmi-container", "cdmic"],
  ["application/cdmi-domain", "cdmid"],
  ["application/cdmi-object", "cdmio"],
  ["application/cdmi-queue", "cdmiq"],
  ["application/clariscad", "ccad"],
  ["application/commonground", "dp"],
  ["application/cu-seeme", "cu"],
  ["application/davmount+xml", "davmount"],
  ["application/drafting", "drw"],
  ["application/dsptype", "tsp"],
  ["application/dssc+der", "dssc"],
  ["application/dssc+xml", "xdssc"],
  ["application/dxf", "dxf"],
  ["application/ecmascript", ["js", "es"]],
  ["application/emma+xml", "emma"],
  ["application/envoy", "evy"],
  ["application/epub+zip", "epub"],
  ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
  ["application/exi", "exi"],
  ["application/font-tdpfr", "pfr"],
  ["application/fractals", "fif"],
  ["application/freeloader", "frl"],
  ["application/futuresplash", "spl"],
  ["application/geo+json", "geojson"],
  ["application/gnutar", "tgz"],
  ["application/groupwise", "vew"],
  ["application/hlp", "hlp"],
  ["application/hta", "hta"],
  ["application/hyperstudio", "stk"],
  ["application/i-deas", "unv"],
  ["application/iges", ["iges", "igs"]],
  ["application/inf", "inf"],
  ["application/internet-property-stream", "acx"],
  ["application/ipfix", "ipfix"],
  ["application/java", "class"],
  ["application/java-archive", "jar"],
  ["application/java-byte-code", "class"],
  ["application/java-serialized-object", "ser"],
  ["application/java-vm", "class"],
  ["application/javascript", "js"],
  ["application/json", "json"],
  ["application/lha", "lha"],
  ["application/lzx", "lzx"],
  ["application/mac-binary", "bin"],
  ["application/mac-binhex", "hqx"],
  ["application/mac-binhex40", "hqx"],
  ["application/mac-compactpro", "cpt"],
  ["application/macbinary", "bin"],
  ["application/mads+xml", "mads"],
  ["application/marc", "mrc"],
  ["application/marcxml+xml", "mrcx"],
  ["application/mathematica", "ma"],
  ["application/mathml+xml", "mathml"],
  ["application/mbedlet", "mbd"],
  ["application/mbox", "mbox"],
  ["application/mcad", "mcd"],
  ["application/mediaservercontrol+xml", "mscml"],
  ["application/metalink4+xml", "meta4"],
  ["application/mets+xml", "mets"],
  ["application/mime", "aps"],
  ["application/mods+xml", "mods"],
  ["application/mp21", "m21"],
  ["application/mp4", "mp4"],
  ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
  ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
  ["application/mswrite", "wri"],
  ["application/mxf", "mxf"],
  ["application/netmc", "mcp"],
  ["application/octet-stream", ["*"]],
  ["application/oda", "oda"],
  ["application/oebps-package+xml", "opf"],
  ["application/ogg", "ogx"],
  ["application/olescript", "axs"],
  ["application/onenote", "onetoc"],
  ["application/patch-ops-error+xml", "xer"],
  ["application/pdf", "pdf"],
  ["application/pgp-encrypted", "asc"],
  ["application/pgp-signature", "pgp"],
  ["application/pics-rules", "prf"],
  ["application/pkcs-12", "p12"],
  ["application/pkcs-crl", "crl"],
  ["application/pkcs10", "p10"],
  ["application/pkcs7-mime", ["p7c", "p7m"]],
  ["application/pkcs7-signature", "p7s"],
  ["application/pkcs8", "p8"],
  ["application/pkix-attr-cert", "ac"],
  ["application/pkix-cert", ["cer", "crt"]],
  ["application/pkix-crl", "crl"],
  ["application/pkix-pkipath", "pkipath"],
  ["application/pkixcmp", "pki"],
  ["application/plain", "text"],
  ["application/pls+xml", "pls"],
  ["application/postscript", ["ps", "ai", "eps"]],
  ["application/powerpoint", "ppt"],
  ["application/pro_eng", ["part", "prt"]],
  ["application/prs.cww", "cww"],
  ["application/pskc+xml", "pskcxml"],
  ["application/rdf+xml", "rdf"],
  ["application/reginfo+xml", "rif"],
  ["application/relax-ng-compact-syntax", "rnc"],
  ["application/resource-lists+xml", "rl"],
  ["application/resource-lists-diff+xml", "rld"],
  ["application/ringing-tones", "rng"],
  ["application/rls-services+xml", "rs"],
  ["application/rsd+xml", "rsd"],
  ["application/rss+xml", "xml"],
  ["application/rtf", ["rtf", "rtx"]],
  ["application/sbml+xml", "sbml"],
  ["application/scvp-cv-request", "scq"],
  ["application/scvp-cv-response", "scs"],
  ["application/scvp-vp-request", "spq"],
  ["application/scvp-vp-response", "spp"],
  ["application/sdp", "sdp"],
  ["application/sea", "sea"],
  ["application/set", "set"],
  ["application/set-payment-initiation", "setpay"],
  ["application/set-registration-initiation", "setreg"],
  ["application/shf+xml", "shf"],
  ["application/sla", "stl"],
  ["application/smil", ["smi", "smil"]],
  ["application/smil+xml", "smi"],
  ["application/solids", "sol"],
  ["application/sounder", "sdr"],
  ["application/sparql-query", "rq"],
  ["application/sparql-results+xml", "srx"],
  ["application/srgs", "gram"],
  ["application/srgs+xml", "grxml"],
  ["application/sru+xml", "sru"],
  ["application/ssml+xml", "ssml"],
  ["application/step", ["step", "stp"]],
  ["application/streamingmedia", "ssm"],
  ["application/tei+xml", "tei"],
  ["application/thraud+xml", "tfi"],
  ["application/timestamped-data", "tsd"],
  ["application/toolbook", "tbk"],
  ["application/vda", "vda"],
  ["application/vnd.3gpp.pic-bw-large", "plb"],
  ["application/vnd.3gpp.pic-bw-small", "psb"],
  ["application/vnd.3gpp.pic-bw-var", "pvb"],
  ["application/vnd.3gpp2.tcap", "tcap"],
  ["application/vnd.3m.post-it-notes", "pwn"],
  ["application/vnd.accpac.simply.aso", "aso"],
  ["application/vnd.accpac.simply.imp", "imp"],
  ["application/vnd.acucobol", "acu"],
  ["application/vnd.acucorp", "atc"],
  ["application/vnd.adobe.air-application-installer-package+zip", "air"],
  ["application/vnd.adobe.fxp", "fxp"],
  ["application/vnd.adobe.xdp+xml", "xdp"],
  ["application/vnd.adobe.xfdf", "xfdf"],
  ["application/vnd.ahead.space", "ahead"],
  ["application/vnd.airzip.filesecure.azf", "azf"],
  ["application/vnd.airzip.filesecure.azs", "azs"],
  ["application/vnd.amazon.ebook", "azw"],
  ["application/vnd.americandynamics.acc", "acc"],
  ["application/vnd.amiga.ami", "ami"],
  ["application/vnd.android.package-archive", "apk"],
  ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
  ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
  ["application/vnd.antix.game-component", "atx"],
  ["application/vnd.apple.installer+xml", "mpkg"],
  ["application/vnd.apple.mpegurl", "m3u8"],
  ["application/vnd.aristanetworks.swi", "swi"],
  ["application/vnd.audiograph", "aep"],
  ["application/vnd.blueice.multipass", "mpm"],
  ["application/vnd.bmi", "bmi"],
  ["application/vnd.businessobjects", "rep"],
  ["application/vnd.chemdraw+xml", "cdxml"],
  ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
  ["application/vnd.cinderella", "cdy"],
  ["application/vnd.claymore", "cla"],
  ["application/vnd.cloanto.rp9", "rp9"],
  ["application/vnd.clonk.c4group", "c4g"],
  ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
  ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
  ["application/vnd.commonspace", "csp"],
  ["application/vnd.contact.cmsg", "cdbcmsg"],
  ["application/vnd.cosmocaller", "cmc"],
  ["application/vnd.crick.clicker", "clkx"],
  ["application/vnd.crick.clicker.keyboard", "clkk"],
  ["application/vnd.crick.clicker.palette", "clkp"],
  ["application/vnd.crick.clicker.template", "clkt"],
  ["application/vnd.crick.clicker.wordbank", "clkw"],
  ["application/vnd.criticaltools.wbs+xml", "wbs"],
  ["application/vnd.ctc-posml", "pml"],
  ["application/vnd.cups-ppd", "ppd"],
  ["application/vnd.curl.car", "car"],
  ["application/vnd.curl.pcurl", "pcurl"],
  ["application/vnd.data-vision.rdz", "rdz"],
  ["application/vnd.denovo.fcselayout-link", "fe_launch"],
  ["application/vnd.dna", "dna"],
  ["application/vnd.dolby.mlp", "mlp"],
  ["application/vnd.dpgraph", "dpg"],
  ["application/vnd.dreamfactory", "dfac"],
  ["application/vnd.dvb.ait", "ait"],
  ["application/vnd.dvb.service", "svc"],
  ["application/vnd.dynageo", "geo"],
  ["application/vnd.ecowin.chart", "mag"],
  ["application/vnd.enliven", "nml"],
  ["application/vnd.epson.esf", "esf"],
  ["application/vnd.epson.msf", "msf"],
  ["application/vnd.epson.quickanime", "qam"],
  ["application/vnd.epson.salt", "slt"],
  ["application/vnd.epson.ssf", "ssf"],
  ["application/vnd.eszigno3+xml", "es3"],
  ["application/vnd.ezpix-album", "ez2"],
  ["application/vnd.ezpix-package", "ez3"],
  ["application/vnd.fdf", "fdf"],
  ["application/vnd.fdsn.seed", "seed"],
  ["application/vnd.flographit", "gph"],
  ["application/vnd.fluxtime.clip", "ftc"],
  ["application/vnd.framemaker", "fm"],
  ["application/vnd.frogans.fnc", "fnc"],
  ["application/vnd.frogans.ltf", "ltf"],
  ["application/vnd.fsc.weblaunch", "fsc"],
  ["application/vnd.fujitsu.oasys", "oas"],
  ["application/vnd.fujitsu.oasys2", "oa2"],
  ["application/vnd.fujitsu.oasys3", "oa3"],
  ["application/vnd.fujitsu.oasysgp", "fg5"],
  ["application/vnd.fujitsu.oasysprs", "bh2"],
  ["application/vnd.fujixerox.ddd", "ddd"],
  ["application/vnd.fujixerox.docuworks", "xdw"],
  ["application/vnd.fujixerox.docuworks.binder", "xbd"],
  ["application/vnd.fuzzysheet", "fzs"],
  ["application/vnd.genomatix.tuxedo", "txd"],
  ["application/vnd.geogebra.file", "ggb"],
  ["application/vnd.geogebra.tool", "ggt"],
  ["application/vnd.geometry-explorer", "gex"],
  ["application/vnd.geonext", "gxt"],
  ["application/vnd.geoplan", "g2w"],
  ["application/vnd.geospace", "g3w"],
  ["application/vnd.gmx", "gmx"],
  ["application/vnd.google-earth.kml+xml", "kml"],
  ["application/vnd.google-earth.kmz", "kmz"],
  ["application/vnd.grafeq", "gqf"],
  ["application/vnd.groove-account", "gac"],
  ["application/vnd.groove-help", "ghf"],
  ["application/vnd.groove-identity-message", "gim"],
  ["application/vnd.groove-injector", "grv"],
  ["application/vnd.groove-tool-message", "gtm"],
  ["application/vnd.groove-tool-template", "tpl"],
  ["application/vnd.groove-vcard", "vcg"],
  ["application/vnd.hal+xml", "hal"],
  ["application/vnd.handheld-entertainment+xml", "zmm"],
  ["application/vnd.hbci", "hbci"],
  ["application/vnd.hhe.lesson-player", "les"],
  ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
  ["application/vnd.hp-hpid", "hpid"],
  ["application/vnd.hp-hps", "hps"],
  ["application/vnd.hp-jlyt", "jlt"],
  ["application/vnd.hp-pcl", "pcl"],
  ["application/vnd.hp-pclxl", "pclxl"],
  ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
  ["application/vnd.hzn-3d-crossword", "x3d"],
  ["application/vnd.ibm.minipay", "mpy"],
  ["application/vnd.ibm.modcap", "afp"],
  ["application/vnd.ibm.rights-management", "irm"],
  ["application/vnd.ibm.secure-container", "sc"],
  ["application/vnd.iccprofile", "icc"],
  ["application/vnd.igloader", "igl"],
  ["application/vnd.immervision-ivp", "ivp"],
  ["application/vnd.immervision-ivu", "ivu"],
  ["application/vnd.insors.igm", "igm"],
  ["application/vnd.intercon.formnet", "xpw"],
  ["application/vnd.intergeo", "i2g"],
  ["application/vnd.intu.qbo", "qbo"],
  ["application/vnd.intu.qfx", "qfx"],
  ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
  ["application/vnd.irepository.package+xml", "irp"],
  ["application/vnd.is-xpr", "xpr"],
  ["application/vnd.isac.fcs", "fcs"],
  ["application/vnd.jam", "jam"],
  ["application/vnd.jcp.javame.midlet-rms", "rms"],
  ["application/vnd.jisp", "jisp"],
  ["application/vnd.joost.joda-archive", "joda"],
  ["application/vnd.kahootz", "ktz"],
  ["application/vnd.kde.karbon", "karbon"],
  ["application/vnd.kde.kchart", "chrt"],
  ["application/vnd.kde.kformula", "kfo"],
  ["application/vnd.kde.kivio", "flw"],
  ["application/vnd.kde.kontour", "kon"],
  ["application/vnd.kde.kpresenter", "kpr"],
  ["application/vnd.kde.kspread", "ksp"],
  ["application/vnd.kde.kword", "kwd"],
  ["application/vnd.kenameaapp", "htke"],
  ["application/vnd.kidspiration", "kia"],
  ["application/vnd.kinar", "kne"],
  ["application/vnd.koan", "skp"],
  ["application/vnd.kodak-descriptor", "sse"],
  ["application/vnd.las.las+xml", "lasxml"],
  ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
  ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
  ["application/vnd.lotus-1-2-3", "123"],
  ["application/vnd.lotus-approach", "apr"],
  ["application/vnd.lotus-freelance", "pre"],
  ["application/vnd.lotus-notes", "nsf"],
  ["application/vnd.lotus-organizer", "org"],
  ["application/vnd.lotus-screencam", "scm"],
  ["application/vnd.lotus-wordpro", "lwp"],
  ["application/vnd.macports.portpkg", "portpkg"],
  ["application/vnd.mcd", "mcd"],
  ["application/vnd.medcalcdata", "mc1"],
  ["application/vnd.mediastation.cdkey", "cdkey"],
  ["application/vnd.mfer", "mwf"],
  ["application/vnd.mfmp", "mfm"],
  ["application/vnd.micrografx.flo", "flo"],
  ["application/vnd.micrografx.igx", "igx"],
  ["application/vnd.mif", "mif"],
  ["application/vnd.mobius.daf", "daf"],
  ["application/vnd.mobius.dis", "dis"],
  ["application/vnd.mobius.mbk", "mbk"],
  ["application/vnd.mobius.mqy", "mqy"],
  ["application/vnd.mobius.msl", "msl"],
  ["application/vnd.mobius.plc", "plc"],
  ["application/vnd.mobius.txf", "txf"],
  ["application/vnd.mophun.application", "mpn"],
  ["application/vnd.mophun.certificate", "mpc"],
  ["application/vnd.mozilla.xul+xml", "xul"],
  ["application/vnd.ms-artgalry", "cil"],
  ["application/vnd.ms-cab-compressed", "cab"],
  ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
  ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
  ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
  ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
  ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
  ["application/vnd.ms-fontobject", "eot"],
  ["application/vnd.ms-htmlhelp", "chm"],
  ["application/vnd.ms-ims", "ims"],
  ["application/vnd.ms-lrm", "lrm"],
  ["application/vnd.ms-officetheme", "thmx"],
  ["application/vnd.ms-outlook", "msg"],
  ["application/vnd.ms-pki.certstore", "sst"],
  ["application/vnd.ms-pki.pko", "pko"],
  ["application/vnd.ms-pki.seccat", "cat"],
  ["application/vnd.ms-pki.stl", "stl"],
  ["application/vnd.ms-pkicertstore", "sst"],
  ["application/vnd.ms-pkiseccat", "cat"],
  ["application/vnd.ms-pkistl", "stl"],
  ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
  ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
  ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
  ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
  ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
  ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
  ["application/vnd.ms-project", "mpp"],
  ["application/vnd.ms-word.document.macroenabled.12", "docm"],
  ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
  ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
  ["application/vnd.ms-wpl", "wpl"],
  ["application/vnd.ms-xpsdocument", "xps"],
  ["application/vnd.mseq", "mseq"],
  ["application/vnd.musician", "mus"],
  ["application/vnd.muvee.style", "msty"],
  ["application/vnd.neurolanguage.nlu", "nlu"],
  ["application/vnd.noblenet-directory", "nnd"],
  ["application/vnd.noblenet-sealer", "nns"],
  ["application/vnd.noblenet-web", "nnw"],
  ["application/vnd.nokia.configuration-message", "ncm"],
  ["application/vnd.nokia.n-gage.data", "ngdat"],
  ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
  ["application/vnd.nokia.radio-preset", "rpst"],
  ["application/vnd.nokia.radio-presets", "rpss"],
  ["application/vnd.nokia.ringing-tone", "rng"],
  ["application/vnd.novadigm.edm", "edm"],
  ["application/vnd.novadigm.edx", "edx"],
  ["application/vnd.novadigm.ext", "ext"],
  ["application/vnd.oasis.opendocument.chart", "odc"],
  ["application/vnd.oasis.opendocument.chart-template", "otc"],
  ["application/vnd.oasis.opendocument.database", "odb"],
  ["application/vnd.oasis.opendocument.formula", "odf"],
  ["application/vnd.oasis.opendocument.formula-template", "odft"],
  ["application/vnd.oasis.opendocument.graphics", "odg"],
  ["application/vnd.oasis.opendocument.graphics-template", "otg"],
  ["application/vnd.oasis.opendocument.image", "odi"],
  ["application/vnd.oasis.opendocument.image-template", "oti"],
  ["application/vnd.oasis.opendocument.presentation", "odp"],
  ["application/vnd.oasis.opendocument.presentation-template", "otp"],
  ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
  ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
  ["application/vnd.oasis.opendocument.text", "odt"],
  ["application/vnd.oasis.opendocument.text-master", "odm"],
  ["application/vnd.oasis.opendocument.text-template", "ott"],
  ["application/vnd.oasis.opendocument.text-web", "oth"],
  ["application/vnd.olpc-sugar", "xo"],
  ["application/vnd.oma.dd2+xml", "dd2"],
  ["application/vnd.openofficeorg.extension", "oxt"],
  ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
  ["application/vnd.osgeo.mapguide.package", "mgp"],
  ["application/vnd.osgi.dp", "dp"],
  ["application/vnd.palm", "pdb"],
  ["application/vnd.pawaafile", "paw"],
  ["application/vnd.pg.format", "str"],
  ["application/vnd.pg.osasli", "ei6"],
  ["application/vnd.picsel", "efif"],
  ["application/vnd.pmi.widget", "wg"],
  ["application/vnd.pocketlearn", "plf"],
  ["application/vnd.powerbuilder6", "pbd"],
  ["application/vnd.previewsystems.box", "box"],
  ["application/vnd.proteus.magazine", "mgz"],
  ["application/vnd.publishare-delta-tree", "qps"],
  ["application/vnd.pvi.ptid1", "ptid"],
  ["application/vnd.quark.quarkxpress", "qxd"],
  ["application/vnd.realvnc.bed", "bed"],
  ["application/vnd.recordare.musicxml", "mxl"],
  ["application/vnd.recordare.musicxml+xml", "musicxml"],
  ["application/vnd.rig.cryptonote", "cryptonote"],
  ["application/vnd.rim.cod", "cod"],
  ["application/vnd.rn-realmedia", "rm"],
  ["application/vnd.rn-realplayer", "rnx"],
  ["application/vnd.route66.link66+xml", "link66"],
  ["application/vnd.sailingtracker.track", "st"],
  ["application/vnd.seemail", "see"],
  ["application/vnd.sema", "sema"],
  ["application/vnd.semd", "semd"],
  ["application/vnd.semf", "semf"],
  ["application/vnd.shana.informed.formdata", "ifm"],
  ["application/vnd.shana.informed.formtemplate", "itp"],
  ["application/vnd.shana.informed.interchange", "iif"],
  ["application/vnd.shana.informed.package", "ipk"],
  ["application/vnd.simtech-mindmapper", "twd"],
  ["application/vnd.smaf", "mmf"],
  ["application/vnd.smart.teacher", "teacher"],
  ["application/vnd.solent.sdkm+xml", "sdkm"],
  ["application/vnd.spotfire.dxp", "dxp"],
  ["application/vnd.spotfire.sfs", "sfs"],
  ["application/vnd.stardivision.calc", "sdc"],
  ["application/vnd.stardivision.draw", "sda"],
  ["application/vnd.stardivision.impress", "sdd"],
  ["application/vnd.stardivision.math", "smf"],
  ["application/vnd.stardivision.writer", "sdw"],
  ["application/vnd.stardivision.writer-global", "sgl"],
  ["application/vnd.stepmania.stepchart", "sm"],
  ["application/vnd.sun.xml.calc", "sxc"],
  ["application/vnd.sun.xml.calc.template", "stc"],
  ["application/vnd.sun.xml.draw", "sxd"],
  ["application/vnd.sun.xml.draw.template", "std"],
  ["application/vnd.sun.xml.impress", "sxi"],
  ["application/vnd.sun.xml.impress.template", "sti"],
  ["application/vnd.sun.xml.math", "sxm"],
  ["application/vnd.sun.xml.writer", "sxw"],
  ["application/vnd.sun.xml.writer.global", "sxg"],
  ["application/vnd.sun.xml.writer.template", "stw"],
  ["application/vnd.sus-calendar", "sus"],
  ["application/vnd.svd", "svd"],
  ["application/vnd.symbian.install", "sis"],
  ["application/vnd.syncml+xml", "xsm"],
  ["application/vnd.syncml.dm+wbxml", "bdm"],
  ["application/vnd.syncml.dm+xml", "xdm"],
  ["application/vnd.tao.intent-module-archive", "tao"],
  ["application/vnd.tmobile-livetv", "tmo"],
  ["application/vnd.trid.tpt", "tpt"],
  ["application/vnd.triscape.mxs", "mxs"],
  ["application/vnd.trueapp", "tra"],
  ["application/vnd.ufdl", "ufd"],
  ["application/vnd.uiq.theme", "utz"],
  ["application/vnd.umajin", "umj"],
  ["application/vnd.unity", "unityweb"],
  ["application/vnd.uoml+xml", "uoml"],
  ["application/vnd.vcx", "vcx"],
  ["application/vnd.visio", "vsd"],
  ["application/vnd.visionary", "vis"],
  ["application/vnd.vsf", "vsf"],
  ["application/vnd.wap.wbxml", "wbxml"],
  ["application/vnd.wap.wmlc", "wmlc"],
  ["application/vnd.wap.wmlscriptc", "wmlsc"],
  ["application/vnd.webturbo", "wtb"],
  ["application/vnd.wolfram.player", "nbp"],
  ["application/vnd.wordperfect", "wpd"],
  ["application/vnd.wqd", "wqd"],
  ["application/vnd.wt.stf", "stf"],
  ["application/vnd.xara", ["web", "xar"]],
  ["application/vnd.xfdl", "xfdl"],
  ["application/vnd.yamaha.hv-dic", "hvd"],
  ["application/vnd.yamaha.hv-script", "hvs"],
  ["application/vnd.yamaha.hv-voice", "hvp"],
  ["application/vnd.yamaha.openscoreformat", "osf"],
  ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
  ["application/vnd.yamaha.smaf-audio", "saf"],
  ["application/vnd.yamaha.smaf-phrase", "spf"],
  ["application/vnd.yellowriver-custom-menu", "cmp"],
  ["application/vnd.zul", "zir"],
  ["application/vnd.zzazz.deck+xml", "zaz"],
  ["application/vocaltec-media-desc", "vmd"],
  ["application/vocaltec-media-file", "vmf"],
  ["application/voicexml+xml", "vxml"],
  ["application/widget", "wgt"],
  ["application/winhlp", "hlp"],
  ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
  ["application/wordperfect6.0", ["w60", "wp5"]],
  ["application/wordperfect6.1", "w61"],
  ["application/wsdl+xml", "wsdl"],
  ["application/wspolicy+xml", "wspolicy"],
  ["application/x-123", "wk1"],
  ["application/x-7z-compressed", "7z"],
  ["application/x-abiword", "abw"],
  ["application/x-ace-compressed", "ace"],
  ["application/x-aim", "aim"],
  ["application/x-authorware-bin", "aab"],
  ["application/x-authorware-map", "aam"],
  ["application/x-authorware-seg", "aas"],
  ["application/x-bcpio", "bcpio"],
  ["application/x-binary", "bin"],
  ["application/x-binhex40", "hqx"],
  ["application/x-bittorrent", "torrent"],
  ["application/x-bsh", ["bsh", "sh", "shar"]],
  ["application/x-bytecode.elisp", "elc"],
  ["application/x-bytecode.python", "pyc"],
  ["application/x-bzip", "bz"],
  ["application/x-bzip2", ["boz", "bz2"]],
  ["application/x-cdf", "cdf"],
  ["application/x-cdlink", "vcd"],
  ["application/x-chat", ["cha", "chat"]],
  ["application/x-chess-pgn", "pgn"],
  ["application/x-cmu-raster", "ras"],
  ["application/x-cocoa", "cco"],
  ["application/x-compactpro", "cpt"],
  ["application/x-compress", "z"],
  ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
  ["application/x-conference", "nsc"],
  ["application/x-cpio", "cpio"],
  ["application/x-cpt", "cpt"],
  ["application/x-csh", "csh"],
  ["application/x-debian-package", "deb"],
  ["application/x-deepv", "deepv"],
  ["application/x-director", ["dir", "dcr", "dxr"]],
  ["application/x-doom", "wad"],
  ["application/x-dtbncx+xml", "ncx"],
  ["application/x-dtbook+xml", "dtb"],
  ["application/x-dtbresource+xml", "res"],
  ["application/x-dvi", "dvi"],
  ["application/x-elc", "elc"],
  ["application/x-envoy", ["env", "evy"]],
  ["application/x-esrehber", "es"],
  ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
  ["application/x-font-bdf", "bdf"],
  ["application/x-font-ghostscript", "gsf"],
  ["application/x-font-linux-psf", "psf"],
  ["application/x-font-otf", "otf"],
  ["application/x-font-pcf", "pcf"],
  ["application/x-font-snf", "snf"],
  ["application/x-font-ttf", "ttf"],
  ["application/x-font-type1", "pfa"],
  ["application/x-font-woff", "woff"],
  ["application/x-frame", "mif"],
  ["application/x-freelance", "pre"],
  ["application/x-futuresplash", "spl"],
  ["application/x-gnumeric", "gnumeric"],
  ["application/x-gsp", "gsp"],
  ["application/x-gss", "gss"],
  ["application/x-gtar", "gtar"],
  ["application/x-gzip", ["gz", "gzip"]],
  ["application/x-hdf", "hdf"],
  ["application/x-helpfile", ["help", "hlp"]],
  ["application/x-httpd-imap", "imap"],
  ["application/x-ima", "ima"],
  ["application/x-internet-signup", ["ins", "isp"]],
  ["application/x-internett-signup", "ins"],
  ["application/x-inventor", "iv"],
  ["application/x-ip2", "ip"],
  ["application/x-iphone", "iii"],
  ["application/x-java-class", "class"],
  ["application/x-java-commerce", "jcm"],
  ["application/x-java-jnlp-file", "jnlp"],
  ["application/x-javascript", "js"],
  ["application/x-koan", ["skd", "skm", "skp", "skt"]],
  ["application/x-ksh", "ksh"],
  ["application/x-latex", ["latex", "ltx"]],
  ["application/x-lha", "lha"],
  ["application/x-lisp", "lsp"],
  ["application/x-livescreen", "ivy"],
  ["application/x-lotus", "wq1"],
  ["application/x-lotusscreencam", "scm"],
  ["application/x-lzh", "lzh"],
  ["application/x-lzx", "lzx"],
  ["application/x-mac-binhex40", "hqx"],
  ["application/x-macbinary", "bin"],
  ["application/x-magic-cap-package-1.0", "mc$"],
  ["application/x-mathcad", "mcd"],
  ["application/x-meme", "mm"],
  ["application/x-midi", ["mid", "midi"]],
  ["application/x-mif", "mif"],
  ["application/x-mix-transfer", "nix"],
  ["application/x-mobipocket-ebook", "prc"],
  ["application/x-mplayer2", "asx"],
  ["application/x-ms-application", "application"],
  ["application/x-ms-wmd", "wmd"],
  ["application/x-ms-wmz", "wmz"],
  ["application/x-ms-xbap", "xbap"],
  ["application/x-msaccess", "mdb"],
  ["application/x-msbinder", "obd"],
  ["application/x-mscardfile", "crd"],
  ["application/x-msclip", "clp"],
  ["application/x-msdownload", ["exe", "dll"]],
  ["application/x-msexcel", ["xls", "xla", "xlw"]],
  ["application/x-msmediaview", ["mvb", "m13", "m14"]],
  ["application/x-msmetafile", "wmf"],
  ["application/x-msmoney", "mny"],
  ["application/x-mspowerpoint", "ppt"],
  ["application/x-mspublisher", "pub"],
  ["application/x-msschedule", "scd"],
  ["application/x-msterminal", "trm"],
  ["application/x-mswrite", "wri"],
  ["application/x-navi-animation", "ani"],
  ["application/x-navidoc", "nvd"],
  ["application/x-navimap", "map"],
  ["application/x-navistyle", "stl"],
  ["application/x-netcdf", ["cdf", "nc"]],
  ["application/x-newton-compatible-pkg", "pkg"],
  ["application/x-nokia-9000-communicator-add-on-software", "aos"],
  ["application/x-omc", "omc"],
  ["application/x-omcdatamaker", "omcd"],
  ["application/x-omcregerator", "omcr"],
  ["application/x-pagemaker", ["pm4", "pm5"]],
  ["application/x-pcl", "pcl"],
  ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
  ["application/x-pixclscript", "plx"],
  ["application/x-pkcs10", "p10"],
  ["application/x-pkcs12", ["p12", "pfx"]],
  ["application/x-pkcs7-certificates", ["p7b", "spc"]],
  ["application/x-pkcs7-certreqresp", "p7r"],
  ["application/x-pkcs7-mime", ["p7m", "p7c"]],
  ["application/x-pkcs7-signature", ["p7s", "p7a"]],
  ["application/x-pointplus", "css"],
  ["application/x-portable-anymap", "pnm"],
  ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
  ["application/x-qpro", "wb1"],
  ["application/x-rar-compressed", "rar"],
  ["application/x-rtf", "rtf"],
  ["application/x-sdp", "sdp"],
  ["application/x-sea", "sea"],
  ["application/x-seelogo", "sl"],
  ["application/x-sh", "sh"],
  ["application/x-shar", ["shar", "sh"]],
  ["application/x-shockwave-flash", "swf"],
  ["application/x-silverlight-app", "xap"],
  ["application/x-sit", "sit"],
  ["application/x-sprite", ["spr", "sprite"]],
  ["application/x-stuffit", "sit"],
  ["application/x-stuffitx", "sitx"],
  ["application/x-sv4cpio", "sv4cpio"],
  ["application/x-sv4crc", "sv4crc"],
  ["application/x-tar", "tar"],
  ["application/x-tbook", ["sbk", "tbk"]],
  ["application/x-tcl", "tcl"],
  ["application/x-tex", "tex"],
  ["application/x-tex-tfm", "tfm"],
  ["application/x-texinfo", ["texi", "texinfo"]],
  ["application/x-troff", ["roff", "t", "tr"]],
  ["application/x-troff-man", "man"],
  ["application/x-troff-me", "me"],
  ["application/x-troff-ms", "ms"],
  ["application/x-troff-msvideo", "avi"],
  ["application/x-ustar", "ustar"],
  ["application/x-visio", ["vsd", "vst", "vsw"]],
  ["application/x-vnd.audioexplosion.mzz", "mzz"],
  ["application/x-vnd.ls-xpix", "xpix"],
  ["application/x-vrml", "vrml"],
  ["application/x-wais-source", ["src", "wsrc"]],
  ["application/x-winhelp", "hlp"],
  ["application/x-wintalk", "wtk"],
  ["application/x-world", ["wrl", "svr"]],
  ["application/x-wpwin", "wpd"],
  ["application/x-wri", "wri"],
  ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
  ["application/x-x509-user-cert", "crt"],
  ["application/x-xfig", "fig"],
  ["application/x-xpinstall", "xpi"],
  ["application/x-zip-compressed", "zip"],
  ["application/xcap-diff+xml", "xdf"],
  ["application/xenc+xml", "xenc"],
  ["application/xhtml+xml", "xhtml"],
  ["application/xml", "xml"],
  ["application/xml-dtd", "dtd"],
  ["application/xop+xml", "xop"],
  ["application/xslt+xml", "xslt"],
  ["application/xspf+xml", "xspf"],
  ["application/xv+xml", "mxml"],
  ["application/yang", "yang"],
  ["application/yin+xml", "yin"],
  ["application/ynd.ms-pkipko", "pko"],
  ["application/zip", "zip"],
  ["audio/adpcm", "adp"],
  ["audio/aiff", ["aiff", "aif", "aifc"]],
  ["audio/basic", ["snd", "au"]],
  ["audio/it", "it"],
  ["audio/make", ["funk", "my", "pfunk"]],
  ["audio/make.my.funk", "pfunk"],
  ["audio/mid", ["mid", "rmi"]],
  ["audio/midi", ["midi", "kar", "mid"]],
  ["audio/mod", "mod"],
  ["audio/mp4", "mp4a"],
  ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
  ["audio/mpeg3", "mp3"],
  ["audio/nspaudio", ["la", "lma"]],
  ["audio/ogg", "oga"],
  ["audio/s3m", "s3m"],
  ["audio/tsp-audio", "tsi"],
  ["audio/tsplayer", "tsp"],
  ["audio/vnd.dece.audio", "uva"],
  ["audio/vnd.digital-winds", "eol"],
  ["audio/vnd.dra", "dra"],
  ["audio/vnd.dts", "dts"],
  ["audio/vnd.dts.hd", "dtshd"],
  ["audio/vnd.lucent.voice", "lvp"],
  ["audio/vnd.ms-playready.media.pya", "pya"],
  ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
  ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
  ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
  ["audio/vnd.qcelp", "qcp"],
  ["audio/vnd.rip", "rip"],
  ["audio/voc", "voc"],
  ["audio/voxware", "vox"],
  ["audio/wav", "wav"],
  ["audio/webm", "weba"],
  ["audio/x-aac", "aac"],
  ["audio/x-adpcm", "snd"],
  ["audio/x-aiff", ["aiff", "aif", "aifc"]],
  ["audio/x-au", "au"],
  ["audio/x-gsm", ["gsd", "gsm"]],
  ["audio/x-jam", "jam"],
  ["audio/x-liveaudio", "lam"],
  ["audio/x-mid", ["mid", "midi"]],
  ["audio/x-midi", ["midi", "mid"]],
  ["audio/x-mod", "mod"],
  ["audio/x-mpeg", "mp2"],
  ["audio/x-mpeg-3", "mp3"],
  ["audio/x-mpegurl", "m3u"],
  ["audio/x-mpequrl", "m3u"],
  ["audio/x-ms-wax", "wax"],
  ["audio/x-ms-wma", "wma"],
  ["audio/x-nspaudio", ["la", "lma"]],
  ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
  ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
  ["audio/x-psid", "sid"],
  ["audio/x-realaudio", "ra"],
  ["audio/x-twinvq", "vqf"],
  ["audio/x-twinvq-plugin", ["vqe", "vql"]],
  ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
  ["audio/x-voc", "voc"],
  ["audio/x-wav", "wav"],
  ["audio/xm", "xm"],
  ["chemical/x-cdx", "cdx"],
  ["chemical/x-cif", "cif"],
  ["chemical/x-cmdf", "cmdf"],
  ["chemical/x-cml", "cml"],
  ["chemical/x-csml", "csml"],
  ["chemical/x-pdb", ["pdb", "xyz"]],
  ["chemical/x-xyz", "xyz"],
  ["drawing/x-dwf", "dwf"],
  ["i-world/i-vrml", "ivr"],
  ["image/bmp", ["bmp", "bm"]],
  ["image/cgm", "cgm"],
  ["image/cis-cod", "cod"],
  ["image/cmu-raster", ["ras", "rast"]],
  ["image/fif", "fif"],
  ["image/florian", ["flo", "turbot"]],
  ["image/g3fax", "g3"],
  ["image/gif", "gif"],
  ["image/ief", ["ief", "iefs"]],
  ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
  ["image/jutvision", "jut"],
  ["image/ktx", "ktx"],
  ["image/naplps", ["nap", "naplps"]],
  ["image/pict", ["pic", "pict"]],
  ["image/pipeg", "jfif"],
  ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
  ["image/png", ["png", "x-png"]],
  ["image/prs.btif", "btif"],
  ["image/svg+xml", "svg"],
  ["image/tiff", ["tif", "tiff"]],
  ["image/vasa", "mcf"],
  ["image/vnd.adobe.photoshop", "psd"],
  ["image/vnd.dece.graphic", "uvi"],
  ["image/vnd.djvu", "djvu"],
  ["image/vnd.dvb.subtitle", "sub"],
  ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
  ["image/vnd.dxf", "dxf"],
  ["image/vnd.fastbidsheet", "fbs"],
  ["image/vnd.fpx", "fpx"],
  ["image/vnd.fst", "fst"],
  ["image/vnd.fujixerox.edmics-mmr", "mmr"],
  ["image/vnd.fujixerox.edmics-rlc", "rlc"],
  ["image/vnd.ms-modi", "mdi"],
  ["image/vnd.net-fpx", ["fpx", "npx"]],
  ["image/vnd.rn-realflash", "rf"],
  ["image/vnd.rn-realpix", "rp"],
  ["image/vnd.wap.wbmp", "wbmp"],
  ["image/vnd.xiff", "xif"],
  ["image/webp", "webp"],
  ["image/x-cmu-raster", "ras"],
  ["image/x-cmx", "cmx"],
  ["image/x-dwg", ["dwg", "dxf", "svf"]],
  ["image/x-freehand", "fh"],
  ["image/x-icon", "ico"],
  ["image/x-jg", "art"],
  ["image/x-jps", "jps"],
  ["image/x-niff", ["niff", "nif"]],
  ["image/x-pcx", "pcx"],
  ["image/x-pict", ["pct", "pic"]],
  ["image/x-portable-anymap", "pnm"],
  ["image/x-portable-bitmap", "pbm"],
  ["image/x-portable-graymap", "pgm"],
  ["image/x-portable-greymap", "pgm"],
  ["image/x-portable-pixmap", "ppm"],
  ["image/x-quicktime", ["qif", "qti", "qtif"]],
  ["image/x-rgb", "rgb"],
  ["image/x-tiff", ["tif", "tiff"]],
  ["image/x-windows-bmp", "bmp"],
  ["image/x-xbitmap", "xbm"],
  ["image/x-xbm", "xbm"],
  ["image/x-xpixmap", ["xpm", "pm"]],
  ["image/x-xwd", "xwd"],
  ["image/x-xwindowdump", "xwd"],
  ["image/xbm", "xbm"],
  ["image/xpm", "xpm"],
  ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
  ["model/iges", ["iges", "igs"]],
  ["model/mesh", "msh"],
  ["model/vnd.collada+xml", "dae"],
  ["model/vnd.dwf", "dwf"],
  ["model/vnd.gdl", "gdl"],
  ["model/vnd.gtw", "gtw"],
  ["model/vnd.mts", "mts"],
  ["model/vnd.vtu", "vtu"],
  ["model/vrml", ["vrml", "wrl", "wrz"]],
  ["model/x-pov", "pov"],
  ["multipart/x-gzip", "gzip"],
  ["multipart/x-ustar", "ustar"],
  ["multipart/x-zip", "zip"],
  ["music/crescendo", ["mid", "midi"]],
  ["music/x-karaoke", "kar"],
  ["paleovu/x-pv", "pvu"],
  ["text/asp", "asp"],
  ["text/calendar", "ics"],
  ["text/css", "css"],
  ["text/csv", "csv"],
  ["text/ecmascript", "js"],
  ["text/h323", "323"],
  ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
  ["text/iuls", "uls"],
  ["text/javascript", "js"],
  ["text/mcf", "mcf"],
  ["text/n3", "n3"],
  ["text/pascal", "pas"],
  [
    "text/plain",
    [
      "txt",
      "bas",
      "c",
      "h",
      "c++",
      "cc",
      "com",
      "conf",
      "cxx",
      "def",
      "f",
      "f90",
      "for",
      "g",
      "hh",
      "idc",
      "jav",
      "java",
      "list",
      "log",
      "lst",
      "m",
      "mar",
      "pl",
      "sdml",
      "text"
    ]
  ],
  ["text/plain-bas", "par"],
  ["text/prs.lines.tag", "dsc"],
  ["text/richtext", ["rtx", "rt", "rtf"]],
  ["text/scriplet", "wsc"],
  ["text/scriptlet", "sct"],
  ["text/sgml", ["sgm", "sgml"]],
  ["text/tab-separated-values", "tsv"],
  ["text/troff", "t"],
  ["text/turtle", "ttl"],
  ["text/uri-list", ["uni", "unis", "uri", "uris"]],
  ["text/vnd.abc", "abc"],
  ["text/vnd.curl", "curl"],
  ["text/vnd.curl.dcurl", "dcurl"],
  ["text/vnd.curl.mcurl", "mcurl"],
  ["text/vnd.curl.scurl", "scurl"],
  ["text/vnd.fly", "fly"],
  ["text/vnd.fmi.flexstor", "flx"],
  ["text/vnd.graphviz", "gv"],
  ["text/vnd.in3d.3dml", "3dml"],
  ["text/vnd.in3d.spot", "spot"],
  ["text/vnd.rn-realtext", "rt"],
  ["text/vnd.sun.j2me.app-descriptor", "jad"],
  ["text/vnd.wap.wml", "wml"],
  ["text/vnd.wap.wmlscript", "wmls"],
  ["text/webviewhtml", "htt"],
  ["text/x-asm", ["asm", "s"]],
  ["text/x-audiosoft-intra", "aip"],
  ["text/x-c", ["c", "cc", "cpp"]],
  ["text/x-component", "htc"],
  ["text/x-fortran", ["for", "f", "f77", "f90"]],
  ["text/x-h", ["h", "hh"]],
  ["text/x-java-source", ["java", "jav"]],
  ["text/x-java-source,java", "java"],
  ["text/x-la-asf", "lsx"],
  ["text/x-m", "m"],
  ["text/x-pascal", "p"],
  ["text/x-script", "hlb"],
  ["text/x-script.csh", "csh"],
  ["text/x-script.elisp", "el"],
  ["text/x-script.guile", "scm"],
  ["text/x-script.ksh", "ksh"],
  ["text/x-script.lisp", "lsp"],
  ["text/x-script.perl", "pl"],
  ["text/x-script.perl-module", "pm"],
  ["text/x-script.phyton", "py"],
  ["text/x-script.rexx", "rexx"],
  ["text/x-script.scheme", "scm"],
  ["text/x-script.sh", "sh"],
  ["text/x-script.tcl", "tcl"],
  ["text/x-script.tcsh", "tcsh"],
  ["text/x-script.zsh", "zsh"],
  ["text/x-server-parsed-html", ["shtml", "ssi"]],
  ["text/x-setext", "etx"],
  ["text/x-sgml", ["sgm", "sgml"]],
  ["text/x-speech", ["spc", "talk"]],
  ["text/x-uil", "uil"],
  ["text/x-uuencode", ["uu", "uue"]],
  ["text/x-vcalendar", "vcs"],
  ["text/x-vcard", "vcf"],
  ["text/xml", "xml"],
  ["video/3gpp", "3gp"],
  ["video/3gpp2", "3g2"],
  ["video/animaflex", "afl"],
  ["video/avi", "avi"],
  ["video/avs-video", "avs"],
  ["video/dl", "dl"],
  ["video/fli", "fli"],
  ["video/gl", "gl"],
  ["video/h261", "h261"],
  ["video/h263", "h263"],
  ["video/h264", "h264"],
  ["video/jpeg", "jpgv"],
  ["video/jpm", "jpm"],
  ["video/mj2", "mj2"],
  ["video/mp4", "mp4"],
  ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
  ["video/msvideo", "avi"],
  ["video/ogg", "ogv"],
  ["video/quicktime", ["mov", "qt", "moov"]],
  ["video/vdo", "vdo"],
  ["video/vivo", ["viv", "vivo"]],
  ["video/vnd.dece.hd", "uvh"],
  ["video/vnd.dece.mobile", "uvm"],
  ["video/vnd.dece.pd", "uvp"],
  ["video/vnd.dece.sd", "uvs"],
  ["video/vnd.dece.video", "uvv"],
  ["video/vnd.fvt", "fvt"],
  ["video/vnd.mpegurl", "mxu"],
  ["video/vnd.ms-playready.media.pyv", "pyv"],
  ["video/vnd.rn-realvideo", "rv"],
  ["video/vnd.uvvu.mp4", "uvu"],
  ["video/vnd.vivo", ["viv", "vivo"]],
  ["video/vosaic", "vos"],
  ["video/webm", "webm"],
  ["video/x-amt-demorun", "xdr"],
  ["video/x-amt-showrun", "xsr"],
  ["video/x-atomic3d-feature", "fmf"],
  ["video/x-dl", "dl"],
  ["video/x-dv", ["dif", "dv"]],
  ["video/x-f4v", "f4v"],
  ["video/x-fli", "fli"],
  ["video/x-flv", "flv"],
  ["video/x-gl", "gl"],
  ["video/x-isvideo", "isu"],
  ["video/x-la-asf", ["lsf", "lsx"]],
  ["video/x-m4v", "m4v"],
  ["video/x-motion-jpeg", "mjpg"],
  ["video/x-mpeg", ["mp3", "mp2"]],
  ["video/x-mpeq2a", "mp2"],
  ["video/x-ms-asf", ["asf", "asr", "asx"]],
  ["video/x-ms-asf-plugin", "asx"],
  ["video/x-ms-wm", "wm"],
  ["video/x-ms-wmv", "wmv"],
  ["video/x-ms-wmx", "wmx"],
  ["video/x-ms-wvx", "wvx"],
  ["video/x-msvideo", "avi"],
  ["video/x-qtc", "qtc"],
  ["video/x-scm", "scm"],
  ["video/x-sgi-movie", ["movie", "mv"]],
  ["windows/metafile", "wmf"],
  ["www/mime", "mime"],
  ["x-conference/x-cooltalk", "ice"],
  ["x-music/x-midi", ["mid", "midi"]],
  ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
  ["x-world/x-svr", "svr"],
  ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
  ["x-world/x-vrt", "vrt"],
  ["xgl/drawing", "xgz"],
  ["xgl/movie", "xmz"]
]), dt = /* @__PURE__ */ new Map([
  ["123", "application/vnd.lotus-1-2-3"],
  ["323", "text/h323"],
  ["*", "application/octet-stream"],
  ["3dm", "x-world/x-3dmf"],
  ["3dmf", "x-world/x-3dmf"],
  ["3dml", "text/vnd.in3d.3dml"],
  ["3g2", "video/3gpp2"],
  ["3gp", "video/3gpp"],
  ["7z", "application/x-7z-compressed"],
  ["a", "application/octet-stream"],
  ["aab", "application/x-authorware-bin"],
  ["aac", "audio/x-aac"],
  ["aam", "application/x-authorware-map"],
  ["aas", "application/x-authorware-seg"],
  ["abc", "text/vnd.abc"],
  ["abw", "application/x-abiword"],
  ["ac", "application/pkix-attr-cert"],
  ["acc", "application/vnd.americandynamics.acc"],
  ["ace", "application/x-ace-compressed"],
  ["acgi", "text/html"],
  ["acu", "application/vnd.acucobol"],
  ["acx", "application/internet-property-stream"],
  ["adp", "audio/adpcm"],
  ["aep", "application/vnd.audiograph"],
  ["afl", "video/animaflex"],
  ["afp", "application/vnd.ibm.modcap"],
  ["ahead", "application/vnd.ahead.space"],
  ["ai", "application/postscript"],
  ["aif", ["audio/aiff", "audio/x-aiff"]],
  ["aifc", ["audio/aiff", "audio/x-aiff"]],
  ["aiff", ["audio/aiff", "audio/x-aiff"]],
  ["aim", "application/x-aim"],
  ["aip", "text/x-audiosoft-intra"],
  ["air", "application/vnd.adobe.air-application-installer-package+zip"],
  ["ait", "application/vnd.dvb.ait"],
  ["ami", "application/vnd.amiga.ami"],
  ["ani", "application/x-navi-animation"],
  ["aos", "application/x-nokia-9000-communicator-add-on-software"],
  ["apk", "application/vnd.android.package-archive"],
  ["application", "application/x-ms-application"],
  ["apr", "application/vnd.lotus-approach"],
  ["aps", "application/mime"],
  ["arc", "application/octet-stream"],
  ["arj", ["application/arj", "application/octet-stream"]],
  ["art", "image/x-jg"],
  ["asf", "video/x-ms-asf"],
  ["asm", "text/x-asm"],
  ["aso", "application/vnd.accpac.simply.aso"],
  ["asp", "text/asp"],
  ["asr", "video/x-ms-asf"],
  ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
  ["atc", "application/vnd.acucorp"],
  ["atomcat", "application/atomcat+xml"],
  ["atomsvc", "application/atomsvc+xml"],
  ["atx", "application/vnd.antix.game-component"],
  ["au", ["audio/basic", "audio/x-au"]],
  ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
  ["avs", "video/avs-video"],
  ["aw", "application/applixware"],
  ["axs", "application/olescript"],
  ["azf", "application/vnd.airzip.filesecure.azf"],
  ["azs", "application/vnd.airzip.filesecure.azs"],
  ["azw", "application/vnd.amazon.ebook"],
  ["bas", "text/plain"],
  ["bcpio", "application/x-bcpio"],
  ["bdf", "application/x-font-bdf"],
  ["bdm", "application/vnd.syncml.dm+wbxml"],
  ["bed", "application/vnd.realvnc.bed"],
  ["bh2", "application/vnd.fujitsu.oasysprs"],
  [
    "bin",
    ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]
  ],
  ["bm", "image/bmp"],
  ["bmi", "application/vnd.bmi"],
  ["bmp", ["image/bmp", "image/x-windows-bmp"]],
  ["boo", "application/book"],
  ["book", "application/book"],
  ["box", "application/vnd.previewsystems.box"],
  ["boz", "application/x-bzip2"],
  ["bsh", "application/x-bsh"],
  ["btif", "image/prs.btif"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["c", ["text/plain", "text/x-c"]],
  ["c++", "text/plain"],
  ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
  ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
  ["c4g", "application/vnd.clonk.c4group"],
  ["cab", "application/vnd.ms-cab-compressed"],
  ["car", "application/vnd.curl.car"],
  ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
  ["cc", ["text/plain", "text/x-c"]],
  ["ccad", "application/clariscad"],
  ["cco", "application/x-cocoa"],
  ["ccxml", "application/ccxml+xml,"],
  ["cdbcmsg", "application/vnd.contact.cmsg"],
  ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
  ["cdkey", "application/vnd.mediastation.cdkey"],
  ["cdmia", "application/cdmi-capability"],
  ["cdmic", "application/cdmi-container"],
  ["cdmid", "application/cdmi-domain"],
  ["cdmio", "application/cdmi-object"],
  ["cdmiq", "application/cdmi-queue"],
  ["cdx", "chemical/x-cdx"],
  ["cdxml", "application/vnd.chemdraw+xml"],
  ["cdy", "application/vnd.cinderella"],
  ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
  ["cgm", "image/cgm"],
  ["cha", "application/x-chat"],
  ["chat", "application/x-chat"],
  ["chm", "application/vnd.ms-htmlhelp"],
  ["chrt", "application/vnd.kde.kchart"],
  ["cif", "chemical/x-cif"],
  ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
  ["cil", "application/vnd.ms-artgalry"],
  ["cla", "application/vnd.claymore"],
  [
    "class",
    ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]
  ],
  ["clkk", "application/vnd.crick.clicker.keyboard"],
  ["clkp", "application/vnd.crick.clicker.palette"],
  ["clkt", "application/vnd.crick.clicker.template"],
  ["clkw", "application/vnd.crick.clicker.wordbank"],
  ["clkx", "application/vnd.crick.clicker"],
  ["clp", "application/x-msclip"],
  ["cmc", "application/vnd.cosmocaller"],
  ["cmdf", "chemical/x-cmdf"],
  ["cml", "chemical/x-cml"],
  ["cmp", "application/vnd.yellowriver-custom-menu"],
  ["cmx", "image/x-cmx"],
  ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
  ["com", ["application/octet-stream", "text/plain"]],
  ["conf", "text/plain"],
  ["cpio", "application/x-cpio"],
  ["cpp", "text/x-c"],
  ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
  ["crd", "application/x-mscardfile"],
  ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
  ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
  ["cryptonote", "application/vnd.rig.cryptonote"],
  ["csh", ["text/x-script.csh", "application/x-csh"]],
  ["csml", "chemical/x-csml"],
  ["csp", "application/vnd.commonspace"],
  ["css", ["text/css", "application/x-pointplus"]],
  ["csv", "text/csv"],
  ["cu", "application/cu-seeme"],
  ["curl", "text/vnd.curl"],
  ["cww", "application/prs.cww"],
  ["cxx", "text/plain"],
  ["dae", "model/vnd.collada+xml"],
  ["daf", "application/vnd.mobius.daf"],
  ["davmount", "application/davmount+xml"],
  ["dcr", "application/x-director"],
  ["dcurl", "text/vnd.curl.dcurl"],
  ["dd2", "application/vnd.oma.dd2+xml"],
  ["ddd", "application/vnd.fujixerox.ddd"],
  ["deb", "application/x-debian-package"],
  ["deepv", "application/x-deepv"],
  ["def", "text/plain"],
  ["der", "application/x-x509-ca-cert"],
  ["dfac", "application/vnd.dreamfactory"],
  ["dif", "video/x-dv"],
  ["dir", "application/x-director"],
  ["dis", "application/vnd.mobius.dis"],
  ["djvu", "image/vnd.djvu"],
  ["dl", ["video/dl", "video/x-dl"]],
  ["dll", "application/x-msdownload"],
  ["dms", "application/octet-stream"],
  ["dna", "application/vnd.dna"],
  ["doc", "application/msword"],
  ["docm", "application/vnd.ms-word.document.macroenabled.12"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["dot", "application/msword"],
  ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
  ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
  ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
  ["dpg", "application/vnd.dpgraph"],
  ["dra", "audio/vnd.dra"],
  ["drw", "application/drafting"],
  ["dsc", "text/prs.lines.tag"],
  ["dssc", "application/dssc+der"],
  ["dtb", "application/x-dtbook+xml"],
  ["dtd", "application/xml-dtd"],
  ["dts", "audio/vnd.dts"],
  ["dtshd", "audio/vnd.dts.hd"],
  ["dump", "application/octet-stream"],
  ["dv", "video/x-dv"],
  ["dvi", "application/x-dvi"],
  ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
  ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
  ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
  ["dxp", "application/vnd.spotfire.dxp"],
  ["dxr", "application/x-director"],
  ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
  ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
  ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
  ["edm", "application/vnd.novadigm.edm"],
  ["edx", "application/vnd.novadigm.edx"],
  ["efif", "application/vnd.picsel"],
  ["ei6", "application/vnd.pg.osasli"],
  ["el", "text/x-script.elisp"],
  ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
  ["eml", "message/rfc822"],
  ["emma", "application/emma+xml"],
  ["env", "application/x-envoy"],
  ["eol", "audio/vnd.digital-winds"],
  ["eot", "application/vnd.ms-fontobject"],
  ["eps", "application/postscript"],
  ["epub", "application/epub+zip"],
  ["es", ["application/ecmascript", "application/x-esrehber"]],
  ["es3", "application/vnd.eszigno3+xml"],
  ["esf", "application/vnd.epson.esf"],
  ["etx", "text/x-setext"],
  ["evy", ["application/envoy", "application/x-envoy"]],
  ["exe", ["application/octet-stream", "application/x-msdownload"]],
  ["exi", "application/exi"],
  ["ext", "application/vnd.novadigm.ext"],
  ["ez2", "application/vnd.ezpix-album"],
  ["ez3", "application/vnd.ezpix-package"],
  ["f", ["text/plain", "text/x-fortran"]],
  ["f4v", "video/x-f4v"],
  ["f77", "text/x-fortran"],
  ["f90", ["text/plain", "text/x-fortran"]],
  ["fbs", "image/vnd.fastbidsheet"],
  ["fcs", "application/vnd.isac.fcs"],
  ["fdf", "application/vnd.fdf"],
  ["fe_launch", "application/vnd.denovo.fcselayout-link"],
  ["fg5", "application/vnd.fujitsu.oasysgp"],
  ["fh", "image/x-freehand"],
  ["fif", ["application/fractals", "image/fif"]],
  ["fig", "application/x-xfig"],
  ["fli", ["video/fli", "video/x-fli"]],
  ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
  ["flr", "x-world/x-vrml"],
  ["flv", "video/x-flv"],
  ["flw", "application/vnd.kde.kivio"],
  ["flx", "text/vnd.fmi.flexstor"],
  ["fly", "text/vnd.fly"],
  ["fm", "application/vnd.framemaker"],
  ["fmf", "video/x-atomic3d-feature"],
  ["fnc", "application/vnd.frogans.fnc"],
  ["for", ["text/plain", "text/x-fortran"]],
  ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
  ["frl", "application/freeloader"],
  ["fsc", "application/vnd.fsc.weblaunch"],
  ["fst", "image/vnd.fst"],
  ["ftc", "application/vnd.fluxtime.clip"],
  ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
  ["funk", "audio/make"],
  ["fvt", "video/vnd.fvt"],
  ["fxp", "application/vnd.adobe.fxp"],
  ["fzs", "application/vnd.fuzzysheet"],
  ["g", "text/plain"],
  ["g2w", "application/vnd.geoplan"],
  ["g3", "image/g3fax"],
  ["g3w", "application/vnd.geospace"],
  ["gac", "application/vnd.groove-account"],
  ["gdl", "model/vnd.gdl"],
  ["geo", "application/vnd.dynageo"],
  ["geojson", "application/geo+json"],
  ["gex", "application/vnd.geometry-explorer"],
  ["ggb", "application/vnd.geogebra.file"],
  ["ggt", "application/vnd.geogebra.tool"],
  ["ghf", "application/vnd.groove-help"],
  ["gif", "image/gif"],
  ["gim", "application/vnd.groove-identity-message"],
  ["gl", ["video/gl", "video/x-gl"]],
  ["gmx", "application/vnd.gmx"],
  ["gnumeric", "application/x-gnumeric"],
  ["gph", "application/vnd.flographit"],
  ["gqf", "application/vnd.grafeq"],
  ["gram", "application/srgs"],
  ["grv", "application/vnd.groove-injector"],
  ["grxml", "application/srgs+xml"],
  ["gsd", "audio/x-gsm"],
  ["gsf", "application/x-font-ghostscript"],
  ["gsm", "audio/x-gsm"],
  ["gsp", "application/x-gsp"],
  ["gss", "application/x-gss"],
  ["gtar", "application/x-gtar"],
  ["gtm", "application/vnd.groove-tool-message"],
  ["gtw", "model/vnd.gtw"],
  ["gv", "text/vnd.graphviz"],
  ["gxt", "application/vnd.geonext"],
  ["gz", ["application/x-gzip", "application/x-compressed"]],
  ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
  ["h", ["text/plain", "text/x-h"]],
  ["h261", "video/h261"],
  ["h263", "video/h263"],
  ["h264", "video/h264"],
  ["hal", "application/vnd.hal+xml"],
  ["hbci", "application/vnd.hbci"],
  ["hdf", "application/x-hdf"],
  ["help", "application/x-helpfile"],
  ["hgl", "application/vnd.hp-hpgl"],
  ["hh", ["text/plain", "text/x-h"]],
  ["hlb", "text/x-script"],
  ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
  ["hpg", "application/vnd.hp-hpgl"],
  ["hpgl", "application/vnd.hp-hpgl"],
  ["hpid", "application/vnd.hp-hpid"],
  ["hps", "application/vnd.hp-hps"],
  [
    "hqx",
    [
      "application/mac-binhex40",
      "application/binhex",
      "application/binhex4",
      "application/mac-binhex",
      "application/x-binhex40",
      "application/x-mac-binhex40"
    ]
  ],
  ["hta", "application/hta"],
  ["htc", "text/x-component"],
  ["htke", "application/vnd.kenameaapp"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["htmls", "text/html"],
  ["htt", "text/webviewhtml"],
  ["htx", "text/html"],
  ["hvd", "application/vnd.yamaha.hv-dic"],
  ["hvp", "application/vnd.yamaha.hv-voice"],
  ["hvs", "application/vnd.yamaha.hv-script"],
  ["i2g", "application/vnd.intergeo"],
  ["icc", "application/vnd.iccprofile"],
  ["ice", "x-conference/x-cooltalk"],
  ["ico", "image/x-icon"],
  ["ics", "text/calendar"],
  ["idc", "text/plain"],
  ["ief", "image/ief"],
  ["iefs", "image/ief"],
  ["ifm", "application/vnd.shana.informed.formdata"],
  ["iges", ["application/iges", "model/iges"]],
  ["igl", "application/vnd.igloader"],
  ["igm", "application/vnd.insors.igm"],
  ["igs", ["application/iges", "model/iges"]],
  ["igx", "application/vnd.micrografx.igx"],
  ["iif", "application/vnd.shana.informed.interchange"],
  ["iii", "application/x-iphone"],
  ["ima", "application/x-ima"],
  ["imap", "application/x-httpd-imap"],
  ["imp", "application/vnd.accpac.simply.imp"],
  ["ims", "application/vnd.ms-ims"],
  ["inf", "application/inf"],
  ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
  ["ip", "application/x-ip2"],
  ["ipfix", "application/ipfix"],
  ["ipk", "application/vnd.shana.informed.package"],
  ["irm", "application/vnd.ibm.rights-management"],
  ["irp", "application/vnd.irepository.package+xml"],
  ["isp", "application/x-internet-signup"],
  ["isu", "video/x-isvideo"],
  ["it", "audio/it"],
  ["itp", "application/vnd.shana.informed.formtemplate"],
  ["iv", "application/x-inventor"],
  ["ivp", "application/vnd.immervision-ivp"],
  ["ivr", "i-world/i-vrml"],
  ["ivu", "application/vnd.immervision-ivu"],
  ["ivy", "application/x-livescreen"],
  ["jad", "text/vnd.sun.j2me.app-descriptor"],
  ["jam", ["application/vnd.jam", "audio/x-jam"]],
  ["jar", "application/java-archive"],
  ["jav", ["text/plain", "text/x-java-source"]],
  ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
  ["jcm", "application/x-java-commerce"],
  ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
  ["jfif-tbnl", "image/jpeg"],
  ["jisp", "application/vnd.jisp"],
  ["jlt", "application/vnd.hp-jlyt"],
  ["jnlp", "application/x-java-jnlp-file"],
  ["joda", "application/vnd.joost.joda-archive"],
  ["jpe", ["image/jpeg", "image/pjpeg"]],
  ["jpeg", ["image/jpeg", "image/pjpeg"]],
  ["jpg", ["image/jpeg", "image/pjpeg"]],
  ["jpgv", "video/jpeg"],
  ["jpm", "video/jpm"],
  ["jps", "image/x-jps"],
  ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
  ["json", "application/json"],
  ["jut", "image/jutvision"],
  ["kar", ["audio/midi", "music/x-karaoke"]],
  ["karbon", "application/vnd.kde.karbon"],
  ["kfo", "application/vnd.kde.kformula"],
  ["kia", "application/vnd.kidspiration"],
  ["kml", "application/vnd.google-earth.kml+xml"],
  ["kmz", "application/vnd.google-earth.kmz"],
  ["kne", "application/vnd.kinar"],
  ["kon", "application/vnd.kde.kontour"],
  ["kpr", "application/vnd.kde.kpresenter"],
  ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
  ["ksp", "application/vnd.kde.kspread"],
  ["ktx", "image/ktx"],
  ["ktz", "application/vnd.kahootz"],
  ["kwd", "application/vnd.kde.kword"],
  ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
  ["lam", "audio/x-liveaudio"],
  ["lasxml", "application/vnd.las.las+xml"],
  ["latex", "application/x-latex"],
  ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
  ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
  ["les", "application/vnd.hhe.lesson-player"],
  ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
  ["lhx", "application/octet-stream"],
  ["link66", "application/vnd.route66.link66+xml"],
  ["list", "text/plain"],
  ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
  ["log", "text/plain"],
  ["lrm", "application/vnd.ms-lrm"],
  ["lsf", "video/x-la-asf"],
  ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
  ["lst", "text/plain"],
  ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
  ["ltf", "application/vnd.frogans.ltf"],
  ["ltx", "application/x-latex"],
  ["lvp", "audio/vnd.lucent.voice"],
  ["lwp", "application/vnd.lotus-wordpro"],
  ["lzh", ["application/octet-stream", "application/x-lzh"]],
  ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
  ["m", ["text/plain", "text/x-m"]],
  ["m13", "application/x-msmediaview"],
  ["m14", "application/x-msmediaview"],
  ["m1v", "video/mpeg"],
  ["m21", "application/mp21"],
  ["m2a", "audio/mpeg"],
  ["m2v", "video/mpeg"],
  ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
  ["m3u8", "application/vnd.apple.mpegurl"],
  ["m4v", "video/x-m4v"],
  ["ma", "application/mathematica"],
  ["mads", "application/mads+xml"],
  ["mag", "application/vnd.ecowin.chart"],
  ["man", "application/x-troff-man"],
  ["map", "application/x-navimap"],
  ["mar", "text/plain"],
  ["mathml", "application/mathml+xml"],
  ["mbd", "application/mbedlet"],
  ["mbk", "application/vnd.mobius.mbk"],
  ["mbox", "application/mbox"],
  ["mc$", "application/x-magic-cap-package-1.0"],
  ["mc1", "application/vnd.medcalcdata"],
  ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
  ["mcf", ["image/vasa", "text/mcf"]],
  ["mcp", "application/netmc"],
  ["mcurl", "text/vnd.curl.mcurl"],
  ["mdb", "application/x-msaccess"],
  ["mdi", "image/vnd.ms-modi"],
  ["me", "application/x-troff-me"],
  ["meta4", "application/metalink4+xml"],
  ["mets", "application/mets+xml"],
  ["mfm", "application/vnd.mfmp"],
  ["mgp", "application/vnd.osgeo.mapguide.package"],
  ["mgz", "application/vnd.proteus.magazine"],
  ["mht", "message/rfc822"],
  ["mhtml", "message/rfc822"],
  ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
  ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
  ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
  ["mime", ["message/rfc822", "www/mime"]],
  ["mj2", "video/mj2"],
  ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
  ["mjpg", "video/x-motion-jpeg"],
  ["mlp", "application/vnd.dolby.mlp"],
  ["mm", ["application/base64", "application/x-meme"]],
  ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
  ["mme", "application/base64"],
  ["mmf", "application/vnd.smaf"],
  ["mmr", "image/vnd.fujixerox.edmics-mmr"],
  ["mny", "application/x-msmoney"],
  ["mod", ["audio/mod", "audio/x-mod"]],
  ["mods", "application/mods+xml"],
  ["moov", "video/quicktime"],
  ["mov", "video/quicktime"],
  ["movie", "video/x-sgi-movie"],
  ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
  ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
  ["mp4", ["video/mp4", "application/mp4"]],
  ["mp4a", "audio/mp4"],
  ["mpa", ["video/mpeg", "audio/mpeg"]],
  ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
  ["mpe", "video/mpeg"],
  ["mpeg", "video/mpeg"],
  ["mpg", ["video/mpeg", "audio/mpeg"]],
  ["mpga", "audio/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["mpm", "application/vnd.blueice.multipass"],
  ["mpn", "application/vnd.mophun.application"],
  ["mpp", "application/vnd.ms-project"],
  ["mpt", "application/x-project"],
  ["mpv", "application/x-project"],
  ["mpv2", "video/mpeg"],
  ["mpx", "application/x-project"],
  ["mpy", "application/vnd.ibm.minipay"],
  ["mqy", "application/vnd.mobius.mqy"],
  ["mrc", "application/marc"],
  ["mrcx", "application/marcxml+xml"],
  ["ms", "application/x-troff-ms"],
  ["mscml", "application/mediaservercontrol+xml"],
  ["mseq", "application/vnd.mseq"],
  ["msf", "application/vnd.epson.msf"],
  ["msg", "application/vnd.ms-outlook"],
  ["msh", "model/mesh"],
  ["msl", "application/vnd.mobius.msl"],
  ["msty", "application/vnd.muvee.style"],
  ["mts", "model/vnd.mts"],
  ["mus", "application/vnd.musician"],
  ["musicxml", "application/vnd.recordare.musicxml+xml"],
  ["mv", "video/x-sgi-movie"],
  ["mvb", "application/x-msmediaview"],
  ["mwf", "application/vnd.mfer"],
  ["mxf", "application/mxf"],
  ["mxl", "application/vnd.recordare.musicxml"],
  ["mxml", "application/xv+xml"],
  ["mxs", "application/vnd.triscape.mxs"],
  ["mxu", "video/vnd.mpegurl"],
  ["my", "audio/make"],
  ["mzz", "application/x-vnd.audioexplosion.mzz"],
  ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
  ["n3", "text/n3"],
  ["nap", "image/naplps"],
  ["naplps", "image/naplps"],
  ["nbp", "application/vnd.wolfram.player"],
  ["nc", "application/x-netcdf"],
  ["ncm", "application/vnd.nokia.configuration-message"],
  ["ncx", "application/x-dtbncx+xml"],
  ["ngdat", "application/vnd.nokia.n-gage.data"],
  ["nif", "image/x-niff"],
  ["niff", "image/x-niff"],
  ["nix", "application/x-mix-transfer"],
  ["nlu", "application/vnd.neurolanguage.nlu"],
  ["nml", "application/vnd.enliven"],
  ["nnd", "application/vnd.noblenet-directory"],
  ["nns", "application/vnd.noblenet-sealer"],
  ["nnw", "application/vnd.noblenet-web"],
  ["npx", "image/vnd.net-fpx"],
  ["nsc", "application/x-conference"],
  ["nsf", "application/vnd.lotus-notes"],
  ["nvd", "application/x-navidoc"],
  ["nws", "message/rfc822"],
  ["o", "application/octet-stream"],
  ["oa2", "application/vnd.fujitsu.oasys2"],
  ["oa3", "application/vnd.fujitsu.oasys3"],
  ["oas", "application/vnd.fujitsu.oasys"],
  ["obd", "application/x-msbinder"],
  ["oda", "application/oda"],
  ["odb", "application/vnd.oasis.opendocument.database"],
  ["odc", "application/vnd.oasis.opendocument.chart"],
  ["odf", "application/vnd.oasis.opendocument.formula"],
  ["odft", "application/vnd.oasis.opendocument.formula-template"],
  ["odg", "application/vnd.oasis.opendocument.graphics"],
  ["odi", "application/vnd.oasis.opendocument.image"],
  ["odm", "application/vnd.oasis.opendocument.text-master"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["omc", "application/x-omc"],
  ["omcd", "application/x-omcdatamaker"],
  ["omcr", "application/x-omcregerator"],
  ["onetoc", "application/onenote"],
  ["opf", "application/oebps-package+xml"],
  ["org", "application/vnd.lotus-organizer"],
  ["osf", "application/vnd.yamaha.openscoreformat"],
  ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
  ["otc", "application/vnd.oasis.opendocument.chart-template"],
  ["otf", "application/x-font-otf"],
  ["otg", "application/vnd.oasis.opendocument.graphics-template"],
  ["oth", "application/vnd.oasis.opendocument.text-web"],
  ["oti", "application/vnd.oasis.opendocument.image-template"],
  ["otp", "application/vnd.oasis.opendocument.presentation-template"],
  ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
  ["ott", "application/vnd.oasis.opendocument.text-template"],
  ["oxt", "application/vnd.openofficeorg.extension"],
  ["p", "text/x-pascal"],
  ["p10", ["application/pkcs10", "application/x-pkcs10"]],
  ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
  ["p7a", "application/x-pkcs7-signature"],
  ["p7b", "application/x-pkcs7-certificates"],
  ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
  ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
  ["p7r", "application/x-pkcs7-certreqresp"],
  ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
  ["p8", "application/pkcs8"],
  ["par", "text/plain-bas"],
  ["part", "application/pro_eng"],
  ["pas", "text/pascal"],
  ["paw", "application/vnd.pawaafile"],
  ["pbd", "application/vnd.powerbuilder6"],
  ["pbm", "image/x-portable-bitmap"],
  ["pcf", "application/x-font-pcf"],
  ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
  ["pclxl", "application/vnd.hp-pclxl"],
  ["pct", "image/x-pict"],
  ["pcurl", "application/vnd.curl.pcurl"],
  ["pcx", "image/x-pcx"],
  ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
  ["pdf", "application/pdf"],
  ["pfa", "application/x-font-type1"],
  ["pfr", "application/font-tdpfr"],
  ["pfunk", ["audio/make", "audio/make.my.funk"]],
  ["pfx", "application/x-pkcs12"],
  ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
  ["pgn", "application/x-chess-pgn"],
  ["pgp", "application/pgp-signature"],
  ["pic", ["image/pict", "image/x-pict"]],
  ["pict", "image/pict"],
  ["pkg", "application/x-newton-compatible-pkg"],
  ["pki", "application/pkixcmp"],
  ["pkipath", "application/pkix-pkipath"],
  ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
  ["pl", ["text/plain", "text/x-script.perl"]],
  ["plb", "application/vnd.3gpp.pic-bw-large"],
  ["plc", "application/vnd.mobius.plc"],
  ["plf", "application/vnd.pocketlearn"],
  ["pls", "application/pls+xml"],
  ["plx", "application/x-pixclscript"],
  ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
  ["pm4", "application/x-pagemaker"],
  ["pm5", "application/x-pagemaker"],
  ["pma", "application/x-perfmon"],
  ["pmc", "application/x-perfmon"],
  ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
  ["pmr", "application/x-perfmon"],
  ["pmw", "application/x-perfmon"],
  ["png", "image/png"],
  ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
  ["portpkg", "application/vnd.macports.portpkg"],
  ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
  ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
  ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
  ["pov", "model/x-pov"],
  ["ppa", "application/vnd.ms-powerpoint"],
  ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
  ["ppd", "application/vnd.cups-ppd"],
  ["ppm", "image/x-portable-pixmap"],
  ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
  ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
  ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
  ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
  ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["ppz", "application/mspowerpoint"],
  ["prc", "application/x-mobipocket-ebook"],
  ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
  ["prf", "application/pics-rules"],
  ["prt", "application/pro_eng"],
  ["ps", "application/postscript"],
  ["psb", "application/vnd.3gpp.pic-bw-small"],
  ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
  ["psf", "application/x-font-linux-psf"],
  ["pskcxml", "application/pskc+xml"],
  ["ptid", "application/vnd.pvi.ptid1"],
  ["pub", "application/x-mspublisher"],
  ["pvb", "application/vnd.3gpp.pic-bw-var"],
  ["pvu", "paleovu/x-pv"],
  ["pwn", "application/vnd.3m.post-it-notes"],
  ["pwz", "application/vnd.ms-powerpoint"],
  ["py", "text/x-script.phyton"],
  ["pya", "audio/vnd.ms-playready.media.pya"],
  ["pyc", "application/x-bytecode.python"],
  ["pyv", "video/vnd.ms-playready.media.pyv"],
  ["qam", "application/vnd.epson.quickanime"],
  ["qbo", "application/vnd.intu.qbo"],
  ["qcp", "audio/vnd.qcelp"],
  ["qd3", "x-world/x-3dmf"],
  ["qd3d", "x-world/x-3dmf"],
  ["qfx", "application/vnd.intu.qfx"],
  ["qif", "image/x-quicktime"],
  ["qps", "application/vnd.publishare-delta-tree"],
  ["qt", "video/quicktime"],
  ["qtc", "video/x-qtc"],
  ["qti", "image/x-quicktime"],
  ["qtif", "image/x-quicktime"],
  ["qxd", "application/vnd.quark.quarkxpress"],
  ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
  ["ram", "audio/x-pn-realaudio"],
  ["rar", "application/x-rar-compressed"],
  ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
  ["rast", "image/cmu-raster"],
  ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
  ["rdf", "application/rdf+xml"],
  ["rdz", "application/vnd.data-vision.rdz"],
  ["rep", "application/vnd.businessobjects"],
  ["res", "application/x-dtbresource+xml"],
  ["rexx", "text/x-script.rexx"],
  ["rf", "image/vnd.rn-realflash"],
  ["rgb", "image/x-rgb"],
  ["rif", "application/reginfo+xml"],
  ["rip", "audio/vnd.rip"],
  ["rl", "application/resource-lists+xml"],
  ["rlc", "image/vnd.fujixerox.edmics-rlc"],
  ["rld", "application/resource-lists-diff+xml"],
  ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
  ["rmi", "audio/mid"],
  ["rmm", "audio/x-pn-realaudio"],
  ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
  ["rms", "application/vnd.jcp.javame.midlet-rms"],
  ["rnc", "application/relax-ng-compact-syntax"],
  ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
  ["rnx", "application/vnd.rn-realplayer"],
  ["roff", "application/x-troff"],
  ["rp", "image/vnd.rn-realpix"],
  ["rp9", "application/vnd.cloanto.rp9"],
  ["rpm", "audio/x-pn-realaudio-plugin"],
  ["rpss", "application/vnd.nokia.radio-presets"],
  ["rpst", "application/vnd.nokia.radio-preset"],
  ["rq", "application/sparql-query"],
  ["rs", "application/rls-services+xml"],
  ["rsd", "application/rsd+xml"],
  ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
  ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
  ["rtx", ["text/richtext", "application/rtf"]],
  ["rv", "video/vnd.rn-realvideo"],
  ["s", "text/x-asm"],
  ["s3m", "audio/s3m"],
  ["saf", "application/vnd.yamaha.smaf-audio"],
  ["saveme", "application/octet-stream"],
  ["sbk", "application/x-tbook"],
  ["sbml", "application/sbml+xml"],
  ["sc", "application/vnd.ibm.secure-container"],
  ["scd", "application/x-msschedule"],
  [
    "scm",
    ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]
  ],
  ["scq", "application/scvp-cv-request"],
  ["scs", "application/scvp-cv-response"],
  ["sct", "text/scriptlet"],
  ["scurl", "text/vnd.curl.scurl"],
  ["sda", "application/vnd.stardivision.draw"],
  ["sdc", "application/vnd.stardivision.calc"],
  ["sdd", "application/vnd.stardivision.impress"],
  ["sdkm", "application/vnd.solent.sdkm+xml"],
  ["sdml", "text/plain"],
  ["sdp", ["application/sdp", "application/x-sdp"]],
  ["sdr", "application/sounder"],
  ["sdw", "application/vnd.stardivision.writer"],
  ["sea", ["application/sea", "application/x-sea"]],
  ["see", "application/vnd.seemail"],
  ["seed", "application/vnd.fdsn.seed"],
  ["sema", "application/vnd.sema"],
  ["semd", "application/vnd.semd"],
  ["semf", "application/vnd.semf"],
  ["ser", "application/java-serialized-object"],
  ["set", "application/set"],
  ["setpay", "application/set-payment-initiation"],
  ["setreg", "application/set-registration-initiation"],
  ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
  ["sfs", "application/vnd.spotfire.sfs"],
  ["sgl", "application/vnd.stardivision.writer-global"],
  ["sgm", ["text/sgml", "text/x-sgml"]],
  ["sgml", ["text/sgml", "text/x-sgml"]],
  ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
  ["shar", ["application/x-bsh", "application/x-shar"]],
  ["shf", "application/shf+xml"],
  ["shtml", ["text/html", "text/x-server-parsed-html"]],
  ["sid", "audio/x-psid"],
  ["sis", "application/vnd.symbian.install"],
  ["sit", ["application/x-stuffit", "application/x-sit"]],
  ["sitx", "application/x-stuffitx"],
  ["skd", "application/x-koan"],
  ["skm", "application/x-koan"],
  ["skp", ["application/vnd.koan", "application/x-koan"]],
  ["skt", "application/x-koan"],
  ["sl", "application/x-seelogo"],
  ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
  ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
  ["slt", "application/vnd.epson.salt"],
  ["sm", "application/vnd.stepmania.stepchart"],
  ["smf", "application/vnd.stardivision.math"],
  ["smi", ["application/smil", "application/smil+xml"]],
  ["smil", "application/smil"],
  ["snd", ["audio/basic", "audio/x-adpcm"]],
  ["snf", "application/x-font-snf"],
  ["sol", "application/solids"],
  ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
  ["spf", "application/vnd.yamaha.smaf-phrase"],
  ["spl", ["application/futuresplash", "application/x-futuresplash"]],
  ["spot", "text/vnd.in3d.spot"],
  ["spp", "application/scvp-vp-response"],
  ["spq", "application/scvp-vp-request"],
  ["spr", "application/x-sprite"],
  ["sprite", "application/x-sprite"],
  ["src", "application/x-wais-source"],
  ["sru", "application/sru+xml"],
  ["srx", "application/sparql-results+xml"],
  ["sse", "application/vnd.kodak-descriptor"],
  ["ssf", "application/vnd.epson.ssf"],
  ["ssi", "text/x-server-parsed-html"],
  ["ssm", "application/streamingmedia"],
  ["ssml", "application/ssml+xml"],
  ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
  ["st", "application/vnd.sailingtracker.track"],
  ["stc", "application/vnd.sun.xml.calc.template"],
  ["std", "application/vnd.sun.xml.draw.template"],
  ["step", "application/step"],
  ["stf", "application/vnd.wt.stf"],
  ["sti", "application/vnd.sun.xml.impress.template"],
  ["stk", "application/hyperstudio"],
  ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
  ["stm", "text/html"],
  ["stp", "application/step"],
  ["str", "application/vnd.pg.format"],
  ["stw", "application/vnd.sun.xml.writer.template"],
  ["sub", "image/vnd.dvb.subtitle"],
  ["sus", "application/vnd.sus-calendar"],
  ["sv4cpio", "application/x-sv4cpio"],
  ["sv4crc", "application/x-sv4crc"],
  ["svc", "application/vnd.dvb.service"],
  ["svd", "application/vnd.svd"],
  ["svf", ["image/vnd.dwg", "image/x-dwg"]],
  ["svg", "image/svg+xml"],
  ["svr", ["x-world/x-svr", "application/x-world"]],
  ["swf", "application/x-shockwave-flash"],
  ["swi", "application/vnd.aristanetworks.swi"],
  ["sxc", "application/vnd.sun.xml.calc"],
  ["sxd", "application/vnd.sun.xml.draw"],
  ["sxg", "application/vnd.sun.xml.writer.global"],
  ["sxi", "application/vnd.sun.xml.impress"],
  ["sxm", "application/vnd.sun.xml.math"],
  ["sxw", "application/vnd.sun.xml.writer"],
  ["t", ["text/troff", "application/x-troff"]],
  ["talk", "text/x-speech"],
  ["tao", "application/vnd.tao.intent-module-archive"],
  ["tar", "application/x-tar"],
  ["tbk", ["application/toolbook", "application/x-tbook"]],
  ["tcap", "application/vnd.3gpp2.tcap"],
  ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
  ["tcsh", "text/x-script.tcsh"],
  ["teacher", "application/vnd.smart.teacher"],
  ["tei", "application/tei+xml"],
  ["tex", "application/x-tex"],
  ["texi", "application/x-texinfo"],
  ["texinfo", "application/x-texinfo"],
  ["text", ["application/plain", "text/plain"]],
  ["tfi", "application/thraud+xml"],
  ["tfm", "application/x-tex-tfm"],
  ["tgz", ["application/gnutar", "application/x-compressed"]],
  ["thmx", "application/vnd.ms-officetheme"],
  ["tif", ["image/tiff", "image/x-tiff"]],
  ["tiff", ["image/tiff", "image/x-tiff"]],
  ["tmo", "application/vnd.tmobile-livetv"],
  ["torrent", "application/x-bittorrent"],
  ["tpl", "application/vnd.groove-tool-template"],
  ["tpt", "application/vnd.trid.tpt"],
  ["tr", "application/x-troff"],
  ["tra", "application/vnd.trueapp"],
  ["trm", "application/x-msterminal"],
  ["tsd", "application/timestamped-data"],
  ["tsi", "audio/tsp-audio"],
  ["tsp", ["application/dsptype", "audio/tsplayer"]],
  ["tsv", "text/tab-separated-values"],
  ["ttf", "application/x-font-ttf"],
  ["ttl", "text/turtle"],
  ["turbot", "image/florian"],
  ["twd", "application/vnd.simtech-mindmapper"],
  ["txd", "application/vnd.genomatix.tuxedo"],
  ["txf", "application/vnd.mobius.txf"],
  ["txt", "text/plain"],
  ["ufd", "application/vnd.ufdl"],
  ["uil", "text/x-uil"],
  ["uls", "text/iuls"],
  ["umj", "application/vnd.umajin"],
  ["uni", "text/uri-list"],
  ["unis", "text/uri-list"],
  ["unityweb", "application/vnd.unity"],
  ["unv", "application/i-deas"],
  ["uoml", "application/vnd.uoml+xml"],
  ["uri", "text/uri-list"],
  ["uris", "text/uri-list"],
  ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
  ["utz", "application/vnd.uiq.theme"],
  ["uu", ["application/octet-stream", "text/x-uuencode"]],
  ["uue", "text/x-uuencode"],
  ["uva", "audio/vnd.dece.audio"],
  ["uvh", "video/vnd.dece.hd"],
  ["uvi", "image/vnd.dece.graphic"],
  ["uvm", "video/vnd.dece.mobile"],
  ["uvp", "video/vnd.dece.pd"],
  ["uvs", "video/vnd.dece.sd"],
  ["uvu", "video/vnd.uvvu.mp4"],
  ["uvv", "video/vnd.dece.video"],
  ["vcd", "application/x-cdlink"],
  ["vcf", "text/x-vcard"],
  ["vcg", "application/vnd.groove-vcard"],
  ["vcs", "text/x-vcalendar"],
  ["vcx", "application/vnd.vcx"],
  ["vda", "application/vda"],
  ["vdo", "video/vdo"],
  ["vew", "application/groupwise"],
  ["vis", "application/vnd.visionary"],
  ["viv", ["video/vivo", "video/vnd.vivo"]],
  ["vivo", ["video/vivo", "video/vnd.vivo"]],
  ["vmd", "application/vocaltec-media-desc"],
  ["vmf", "application/vocaltec-media-file"],
  ["voc", ["audio/voc", "audio/x-voc"]],
  ["vos", "video/vosaic"],
  ["vox", "audio/voxware"],
  ["vqe", "audio/x-twinvq-plugin"],
  ["vqf", "audio/x-twinvq"],
  ["vql", "audio/x-twinvq-plugin"],
  ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
  ["vrt", "x-world/x-vrt"],
  ["vsd", ["application/vnd.visio", "application/x-visio"]],
  ["vsf", "application/vnd.vsf"],
  ["vst", "application/x-visio"],
  ["vsw", "application/x-visio"],
  ["vtu", "model/vnd.vtu"],
  ["vxml", "application/voicexml+xml"],
  ["w60", "application/wordperfect6.0"],
  ["w61", "application/wordperfect6.1"],
  ["w6w", "application/msword"],
  ["wad", "application/x-doom"],
  ["wav", ["audio/wav", "audio/x-wav"]],
  ["wax", "audio/x-ms-wax"],
  ["wb1", "application/x-qpro"],
  ["wbmp", "image/vnd.wap.wbmp"],
  ["wbs", "application/vnd.criticaltools.wbs+xml"],
  ["wbxml", "application/vnd.wap.wbxml"],
  ["wcm", "application/vnd.ms-works"],
  ["wdb", "application/vnd.ms-works"],
  ["web", "application/vnd.xara"],
  ["weba", "audio/webm"],
  ["webm", "video/webm"],
  ["webp", "image/webp"],
  ["wg", "application/vnd.pmi.widget"],
  ["wgt", "application/widget"],
  ["wiz", "application/msword"],
  ["wk1", "application/x-123"],
  ["wks", "application/vnd.ms-works"],
  ["wm", "video/x-ms-wm"],
  ["wma", "audio/x-ms-wma"],
  ["wmd", "application/x-ms-wmd"],
  ["wmf", ["windows/metafile", "application/x-msmetafile"]],
  ["wml", "text/vnd.wap.wml"],
  ["wmlc", "application/vnd.wap.wmlc"],
  ["wmls", "text/vnd.wap.wmlscript"],
  ["wmlsc", "application/vnd.wap.wmlscriptc"],
  ["wmv", "video/x-ms-wmv"],
  ["wmx", "video/x-ms-wmx"],
  ["wmz", "application/x-ms-wmz"],
  ["woff", "application/x-font-woff"],
  ["word", "application/msword"],
  ["wp", "application/wordperfect"],
  ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
  ["wp6", "application/wordperfect"],
  ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
  ["wpl", "application/vnd.ms-wpl"],
  ["wps", "application/vnd.ms-works"],
  ["wq1", "application/x-lotus"],
  ["wqd", "application/vnd.wqd"],
  ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
  ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
  ["wrz", ["model/vrml", "x-world/x-vrml"]],
  ["wsc", "text/scriplet"],
  ["wsdl", "application/wsdl+xml"],
  ["wspolicy", "application/wspolicy+xml"],
  ["wsrc", "application/x-wais-source"],
  ["wtb", "application/vnd.webturbo"],
  ["wtk", "application/x-wintalk"],
  ["wvx", "video/x-ms-wvx"],
  ["x-png", "image/png"],
  ["x3d", "application/vnd.hzn-3d-crossword"],
  ["xaf", "x-world/x-vrml"],
  ["xap", "application/x-silverlight-app"],
  ["xar", "application/vnd.xara"],
  ["xbap", "application/x-ms-xbap"],
  ["xbd", "application/vnd.fujixerox.docuworks.binder"],
  ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
  ["xdf", "application/xcap-diff+xml"],
  ["xdm", "application/vnd.syncml.dm+xml"],
  ["xdp", "application/vnd.adobe.xdp+xml"],
  ["xdr", "video/x-amt-demorun"],
  ["xdssc", "application/dssc+xml"],
  ["xdw", "application/vnd.fujixerox.docuworks"],
  ["xenc", "application/xenc+xml"],
  ["xer", "application/patch-ops-error+xml"],
  ["xfdf", "application/vnd.adobe.xfdf"],
  ["xfdl", "application/vnd.xfdl"],
  ["xgz", "xgl/drawing"],
  ["xhtml", "application/xhtml+xml"],
  ["xif", "image/vnd.xiff"],
  ["xl", "application/excel"],
  ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
  ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
  ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xld", ["application/excel", "application/x-excel"]],
  ["xlk", ["application/excel", "application/x-excel"]],
  ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
  ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
  ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
  ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
  ["xlv", ["application/excel", "application/x-excel"]],
  ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xm", "audio/xm"],
  ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
  ["xmz", "xgl/movie"],
  ["xo", "application/vnd.olpc-sugar"],
  ["xof", "x-world/x-vrml"],
  ["xop", "application/xop+xml"],
  ["xpi", "application/x-xpinstall"],
  ["xpix", "application/x-vnd.ls-xpix"],
  ["xpm", ["image/xpm", "image/x-xpixmap"]],
  ["xpr", "application/vnd.is-xpr"],
  ["xps", "application/vnd.ms-xpsdocument"],
  ["xpw", "application/vnd.intercon.formnet"],
  ["xslt", "application/xslt+xml"],
  ["xsm", "application/vnd.syncml+xml"],
  ["xspf", "application/xspf+xml"],
  ["xsr", "video/x-amt-showrun"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
  ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
  ["yang", "application/yang"],
  ["yin", "application/yin+xml"],
  ["z", ["application/x-compressed", "application/x-compress"]],
  ["zaz", "application/vnd.zzazz.deck+xml"],
  ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
  ["zir", "application/vnd.zul"],
  ["zmm", "application/vnd.handheld-entertainment+xml"],
  ["zoo", "application/octet-stream"],
  ["zsh", "text/x-script.zsh"]
]);
var di = {
  detectMimeType(o) {
    if (!o)
      return ct;
    const e = ds.parse(o), t = (e.ext.substr(1) || e.name || "").split("?").shift().trim().toLowerCase(), s = dt.has(t) ? dt.get(t) : ct;
    return Array.isArray(s) ? s[0] : s;
  },
  detectExtension(o) {
    if (!o)
      return ms;
    const e = o.toLowerCase().trim().split("/"), t = e.shift().trim(), s = e.join("/").trim();
    if (lt.has(t + "/" + s)) {
      const i = lt.get(t + "/" + s);
      return Array.isArray(i) ? i[0] : i;
    }
    switch (t) {
      case "text":
        return "txt";
      default:
        return "bin";
    }
  }
};
const { Transform: hs } = O;
function Be(o) {
  return typeof o == "string" && (o = Buffer.from(o, "utf-8")), o.toString("base64");
}
function qe(o, e) {
  if (o = (o || "").toString(), e = e || 76, o.length <= e)
    return o;
  const t = [];
  let s = 0;
  const i = e * 1024, n = new RegExp(".{" + e + "}", "g");
  for (; s < o.length; ) {
    const a = o.substr(s, i).replace(n, `$&\r
`).trim();
    t.push(a), s += i;
  }
  return t.join(`\r
`).trim();
}
let us = class extends hs {
  constructor(e) {
    super(), this.options = e || {}, this.options.lineLength !== !1 && (this.options.lineLength = this.options.lineLength || 76), this._curLine = "", this._remainingBytes = !1, this.inputBytes = 0, this.outputBytes = 0;
  }
  _transform(e, t, s) {
    if (t !== "buffer" && (e = Buffer.from(e, t)), !e || !e.length)
      return setImmediate(s);
    this.inputBytes += e.length, this._remainingBytes && this._remainingBytes.length && (e = Buffer.concat([this._remainingBytes, e], this._remainingBytes.length + e.length), this._remainingBytes = !1), e.length % 3 ? (this._remainingBytes = e.slice(e.length - e.length % 3), e = e.slice(0, e.length - e.length % 3)) : this._remainingBytes = !1;
    let i = this._curLine + Be(e);
    if (this.options.lineLength) {
      i = qe(i, this.options.lineLength);
      const n = i.lastIndexOf(`
`);
      n < 0 ? (this._curLine = i, i = "") : n === i.length - 1 ? this._curLine = "" : (this._curLine = i.substring(n + 1), i = i.substring(0, n + 1));
    }
    i && (this.outputBytes += i.length, this.push(Buffer.from(i, "ascii"))), setImmediate(s);
  }
  _flush(e) {
    this._remainingBytes && this._remainingBytes.length && (this._curLine += Be(this._remainingBytes)), this._curLine && (this._curLine = qe(this._curLine, this.options.lineLength), this.outputBytes += this._curLine.length, this.push(Buffer.from(this._curLine, "ascii")), this._curLine = ""), e();
  }
};
var mi = {
  encode: Be,
  wrap: qe,
  Encoder: us
};
const { Transform: fs } = O, xs = [
  [9],
  // <TAB>
  [10],
  // <LF>
  [13],
  // <CR>
  [32, 60],
  // <SP>!"#$%&'()*+,-./0123456789:;
  [62, 126]
  // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
];
function $e(o) {
  typeof o == "string" && (o = Buffer.from(o, "utf-8"));
  let e = "", t;
  for (let s = 0, i = o.length; s < i; s++) {
    if (t = o[s], gs(t, xs) && !((t === 32 || t === 9) && (s === i - 1 || o[s + 1] === 10 || o[s + 1] === 13))) {
      e += String.fromCharCode(t);
      continue;
    }
    e += "=" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase();
  }
  return e;
}
function hi(o, e) {
  if (o = (o || "").toString(), e = e || 76, o.length <= e)
    return o;
  let t = 0;
  const s = o.length;
  let i, n, a;
  const r = Math.floor(e / 3);
  let p = "";
  for (; t < s; ) {
    if (a = o.substr(t, e), i = a.match(/\r\n/)) {
      a = a.substr(0, i.index + i[0].length), p += a, t += a.length;
      continue;
    }
    if (a.substr(-1) === `
`) {
      p += a, t += a.length;
      continue;
    }
    if (i = a.substr(-r).match(/\n.*?$/)) {
      a = a.substr(0, a.length - (i[0].length - 1)), p += a, t += a.length;
      continue;
    }
    if (a.length > e - r && (i = a.substr(-r).match(/[ \t.,!?][^ \t.,!?]*$/)))
      a = a.substr(0, a.length - (i[0].length - 1));
    else if (a.match(/[=][\da-f]{0,2}$/i))
      for ((i = a.match(/[=][\da-f]{0,1}$/i)) && (a = a.substr(0, a.length - i[0].length)); a.length > 3 && a.length < s - t && !a.match(/^(?:=[\da-f]{2}){1,4}$/i) && (i = a.match(/[=][\da-f]{2}$/gi)) && (n = parseInt(i[0].substr(1, 2), 16), !(n < 128 || (a = a.substr(0, a.length - 3), n >= 192))); )
        ;
    t + a.length < s && a.substr(-1) !== `
` ? (a.length === e && a.match(/[=][\da-f]{2}$/i) ? a = a.substr(0, a.length - 3) : a.length === e && (a = a.substr(0, a.length - 1)), t += a.length, a += `=\r
`) : t += a.length, p += a;
  }
  return p;
}
function gs(o, e) {
  for (let t = e.length - 1; t >= 0; t--) {
    const s = e[t];
    if (s.length && (s.length === 1 && o === s[0] || s.length === 2 && o >= s[0] && o <= s[1]))
      return !0;
  }
  return !1;
}
class vs extends fs {
  constructor(e) {
    super(), this.options = e || {}, this.options.lineLength !== !1 && (this.options.lineLength = this.options.lineLength || 76), this._curLine = "", this.inputBytes = 0, this.outputBytes = 0;
  }
  _transform(e, t, s) {
    let i;
    if (t !== "buffer" && (e = Buffer.from(e, t)), !e || !e.length)
      return s();
    this.inputBytes += e.length, this.options.lineLength ? (i = this._curLine + $e(e), i = hi(i, this.options.lineLength), i = i.replace(/(^|\n)([^\n]*)$/, (n, a, r) => (this._curLine = r, a)), i && (this.outputBytes += i.length, this.push(i))) : (i = $e(e), this.outputBytes += i.length, this.push(i, "ascii")), s();
  }
  _flush(e) {
    this._curLine && (this.outputBytes += this._curLine.length, this.push(this._curLine, "ascii")), e();
  }
}
var ui = {
  encode: $e,
  wrap: hi,
  Encoder: vs
};
const ne = mi, ws = ui, mt = di, { isProtoKey: ht } = be;
var Se = {
  /**
   * Checks if a value is plaintext string (uses only printable 7bit chars)
   *
   * When isParam is set the value is destined for a header parameter, so HT, CR and LF
   * are not plaintext either: a header parameter has no way to carry them. HT is a valid
   * fold point, so folding and unfolding a header would rewrite it as a space, and CR/LF
   * cannot appear in a header value at all. DEL is neither a token character nor qtext,
   * so it can not be carried bare or quoted. Such values have to go through the rfc2231
   * parameter continuation encoding instead, the same way a quote already does.
   *
   * @param {String} value String to be tested
   * @param {Boolean} [isParam] Set to true if the value is a header parameter value
   * @returns {Boolean} true if it is a plaintext string
   */
  isPlainText(o, e) {
    return typeof o == "string" && !(e ? /[\x00-\x1f\x7f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/).test(o);
  },
  /**
   * Wraps a value into a quoted-string. Inside one a quote would end the string early
   * and a backslash would escape whatever follows it, so both go out as quoted-pairs.
   *
   * @param {String} value String to be quoted
   * @returns {String} The value as a quoted-string, quotes included
   */
  quoteString(o) {
    return '"' + (o || "").toString().replace(/["\\]/g, "\\$&") + '"';
  },
  /**
   * Checks if a multi line string containes lines longer than the selected value.
   *
   * Useful when detecting if a mail message needs any processing at all –
   * if only plaintext characters are used and lines are short, then there is
   * no need to encode the values in any way. If the value is plaintext but has
   * longer lines then allowed, then use format=flowed
   *
   * @param {Number} lineLength Max line length to check for
   * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
   */
  hasLongerLines(o, e) {
    return o.length > 128 * 1024 ? !0 : new RegExp("^.{" + (e + 1) + ",}", "m").test(o);
  },
  /**
   * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
   *
   * @param {String|Buffer} data String to be encoded
   * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
   * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
   * @return {String} Single or several mime words joined together
   */
  encodeWord(o, e, t) {
    e = (e || "Q").toString().toUpperCase().trim().charAt(0), t = t || 0;
    let s;
    const i = "UTF-8";
    if (t && t > 7 + i.length && (t -= 7 + i.length), e === "Q" ? s = ws.encode(o).replace(/[^a-z0-9!*+\-/=]/gi, (n) => {
      const a = n.charCodeAt(0).toString(16).toUpperCase();
      return n === " " ? "_" : "=" + (a.length === 1 ? "0" + a : a);
    }) : e === "B" && (s = typeof o == "string" ? o : ne.encode(o), t = t ? Math.max(3, (t - t % 4) / 4 * 3) : 0), t && (e !== "B" ? s : ne.encode(o)).length > t)
      if (e === "Q")
        s = this.splitMimeEncodedString(s, t).join("?= =?" + i + "?" + e + "?");
      else {
        const n = [];
        let a = "";
        for (let r = 0, p = s.length; r < p; r++) {
          let c = s.charAt(r);
          /[\ud800-\udbff]/.test(c) && /[\udc00-\udfff]/.test(s.charAt(r + 1)) && (c += s.charAt(++r)), Buffer.byteLength(a + c) <= t || r === 0 ? a += c : (n.push(ne.encode(a)), a = c);
        }
        a && n.push(ne.encode(a)), n.length > 1 ? s = n.join("?= =?" + i + "?" + e + "?") : s = n.join("");
      }
    else e === "B" && (s = ne.encode(o));
    return "=?" + i + "?" + e + "?" + s + (s.substr(-2) === "?=" ? "" : "?=");
  },
  /**
   * Finds word sequences with non ascii text and converts these to mime words
   *
   * @param {String} value String to be encoded
   * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
   * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
   * @param {Boolean} [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
   * @return {String} String with possible mime words
   */
  encodeWords(o, e, t, s) {
    t = t || 0;
    const i = o.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
    if (!i)
      return o;
    if (s)
      return this.encodeWord(o, e, t);
    const n = o.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
    if (!n)
      return o;
    const a = i.index + (i[0].match(/[^\s]/) || {
      index: 0
    }).index, r = n.index + (n[1] || "").length;
    return (a ? o.substr(0, a) : "") + this.encodeWord(o.substring(a, r), e || "Q", t) + (r < o.length ? o.substr(r) : "");
  },
  /**
   * Joins parsed header value together as 'value; param1=value1; param2=value2'
   * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
   *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
   * @param {Object} structured Parsed header value
   * @return {String} joined header value
   */
  buildHeaderValue(o) {
    const e = [];
    return Object.keys(o.params || {}).forEach((s) => {
      const i = o.params[s], n = s.replace(/[\x00-\x1f\x7f]/g, "");
      !this.isPlainText(i, !0) || i.length >= 75 ? this.buildHeaderParam(n, i, 50).forEach((a) => {
        !/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(a.value) || a.key.substr(-1) === "*" ? e.push(a.key + "=" + a.value) : e.push(a.key + "=" + JSON.stringify(a.value));
      }) : /[\s'"\\;:/=(),<>@[\]?]|^-/.test(i) ? e.push(n + "=" + JSON.stringify(i)) : e.push(n + "=" + i);
    }), (typeof o.value == "string" ? o.value.replace(/[\x00-\x1f\x7f]/g, "") : o.value) + (e.length ? "; " + e.join("; ") : "");
  },
  /**
   * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
   * Useful for splitting long parameter values.
   *
   * For example
   *      title="unicode string"
   * becomes
   *     title*0*=utf-8''unicode
   *     title*1*=%20string
   *
   * @param {String|Buffer} data String to be encoded
   * @param {Number} [maxLength=50] Max length for generated chunks
   * @param {String} [fromCharset='UTF-8'] Source sharacter set
   * @return {Array} A list of encoded keys and headers
   */
  buildHeaderParam(o, e, t) {
    const s = [];
    let i = typeof e == "string" ? e : (e || "").toString(), n, a, r = 0, p, c;
    if (t = t || 50, this.isPlainText(e, !0)) {
      if (i.length <= t)
        return [
          {
            key: o,
            value: i
          }
        ];
      i = i.replace(new RegExp(".{" + t + "}", "g"), (l) => (s.push({
        line: l
      }), "")), i && s.push({
        line: i
      });
    } else {
      if (/[\uD800-\uDBFF]/.test(i)) {
        const m = [];
        for (p = 0, c = i.length; p < c; p++)
          n = i.charAt(p), /[\ud800-\udbff]/.test(n) && /[\udc00-\udfff]/.test(i.charAt(p + 1)) ? (n += i.charAt(p + 1), m.push(n), p++) : m.push(n);
        i = m;
      }
      a = "utf-8''";
      let l = !0;
      for (r = 0, p = 0, c = i.length; p < c; p++) {
        if (n = i[p], l)
          n = this.safeEncodeURIComponent(n);
        else if (n = n === " " ? n : this.safeEncodeURIComponent(n), n !== i[p])
          if ((this.safeEncodeURIComponent(a) + n).length >= t)
            s.push({
              line: a,
              encoded: l
            }), a = "", l = !0;
          else {
            l = !0, p = r, a = "";
            continue;
          }
        (a + n).length >= t ? (s.push({
          line: a,
          encoded: l
        }), a = n = i[p] === " " ? " " : this.safeEncodeURIComponent(i[p]), n === i[p] ? (l = !1, r = p - 1) : l = !0) : a += n;
      }
      a && s.push({
        line: a,
        encoded: l
      });
    }
    return s.map((l, m) => ({
      // encoded lines: {name}*{part}*
      // unencoded lines: {name}*{part}
      // if any line needs to be encoded then the first line (part==0) is always encoded
      key: o + "*" + m + (l.encoded ? "*" : ""),
      value: l.line
    }));
  },
  /**
   * Parses a header value with key=value arguments into a structured
   * object.
   *
   *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
   *   {
   *     'value': 'text/plain',
   *     'params': {
   *       'charset': 'UTF-8'
   *     }
   *   }
   *
   * @param {String} str Header value
   * @return {Object} Header value as a parsed structure
   */
  parseHeaderValue(o) {
    const e = {
      value: !1,
      params: {}
    }, t = (c, l) => {
      ht(c) || (e.params[c] = l);
    };
    let s = !1, i = "", n = "value", a = !1, r = !1, p;
    for (let c = 0, l = o.length; c < l; c++)
      if (p = o.charAt(c), n === "key") {
        if (p === "=") {
          s = i.trim().toLowerCase(), n = "value", i = "";
          continue;
        }
        i += p;
      } else {
        if (r)
          i += p;
        else if (p === "\\") {
          r = !0;
          continue;
        } else a && p === a ? a = !1 : !a && p === '"' ? a = p : !a && p === ";" ? (s === !1 ? e.value = i.trim() : t(s, i.trim()), n = "key", i = "") : i += p;
        r = !1;
      }
    return n === "value" ? s === !1 ? e.value = i.trim() : t(s, i.trim()) : i.trim() && t(i.trim().toLowerCase(), ""), Object.keys(e.params).forEach((c) => {
      let l, m, d, u;
      if (d = c.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
        if (l = c.substr(0, d.index), m = Number(d[2] || d[3]) || 0, ht(l)) {
          delete e.params[c];
          return;
        }
        (!e.params[l] || typeof e.params[l] != "object") && (e.params[l] = {
          charset: !1,
          values: []
        }), u = e.params[c], m === 0 && d[0].substr(-1) === "*" && (d = u.match(/^([^']*)'[^']*'(.*)$/)) && (e.params[l].charset = d[1] || "iso-8859-1", u = d[2]), e.params[l].values[m] = u, delete e.params[c];
      }
    }), Object.keys(e.params).forEach((c) => {
      let l;
      e.params[c] && Array.isArray(e.params[c].values) && (l = e.params[c].values.map((m) => m || "").join(""), e.params[c].charset ? e.params[c] = "=?" + e.params[c].charset + "?Q?" + l.replace(/[=?_\s]/g, (m) => {
        const d = m.charCodeAt(0).toString(16);
        return m === " " ? "_" : "%" + (d.length < 2 ? "0" : "") + d;
      }).replace(/%/g, "=") + "?=" : e.params[c] = l);
    }), e;
  },
  /**
   * Returns file extension for a content type string. If no suitable extensions
   * are found, 'bin' is used as the default extension
   *
   * @param {String} mimeType Content type to be checked for
   * @return {String} File extension
   */
  detectExtension: (o) => mt.detectExtension(o),
  /**
   * Returns content type for a file extension. If no suitable content types
   * are found, 'application/octet-stream' is used as the default content type
   *
   * @param {String} extension Extension to be checked for
   * @return {String} File extension
   */
  detectMimeType: (o) => mt.detectMimeType(o),
  /**
   * Folds long lines, useful for folding header lines (afterSpace=false) and
   * flowed text (afterSpace=true)
   *
   * @param {String} str String to be folded
   * @param {Number} [lineLength=76] Maximum length of a line
   * @param {Boolean} afterSpace If true, leave a space in th end of a line
   * @return {String} String with folded lines
   */
  foldLines(o, e, t) {
    o = (o || "").toString(), e = e || 76;
    let s = 0;
    const i = o.length;
    let n = "", a, r;
    for (; s < i; ) {
      if (a = o.substr(s, e), a.length < e) {
        n += a;
        break;
      }
      if (r = a.match(/^[^\n\r]*(\r?\n|\r)/)) {
        a = r[0], n += a, s += a.length;
        continue;
      } else (r = a.match(/(\s+)[^\s]*$/)) && r[0].length - (t ? (r[1] || "").length : 0) < a.length ? a = a.substr(0, a.length - (r[0].length - (t ? (r[1] || "").length : 0))) : (r = o.substr(s + a.length).match(/^[^\s]+(\s*)/)) && (a = a + r[0].substr(0, r[0].length - (t ? 0 : (r[1] || "").length)));
      n += a, s += a.length, s < i && (n += `\r
`);
    }
    return n;
  },
  /**
   * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
   *
   * @param {String} str Mime encoded string to be split up
   * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
   * @return {Array} Split string
   */
  splitMimeEncodedString: (o, e) => {
    const t = [];
    let s, i, n, a, r;
    for (e = Math.max(e || 0, 12); o.length; ) {
      for (s = o.substr(0, e), (n = s.match(/[=][0-9A-F]?$/i)) && (s = s.substr(0, n.index)), i = s.length ? s : o.substr(0, e), r = !1; !r && s.length; )
        r = !0, (n = o.substr(s.length).match(/^[=]([0-9A-F]{2})/i)) && (a = parseInt(n[1], 16), a < 194 && a > 127 && (s = s.substr(0, s.length - 3), r = !1));
      s.length || (s = i), t.push(s), o = o.substr(s.length);
    }
    return t;
  },
  encodeURICharComponent: (o) => {
    let e = "", t = o.charCodeAt(0).toString(16).toUpperCase();
    if (t.length % 2 && (t = "0" + t), t.length > 2)
      for (let s = 0, i = t.length / 2; s < i; s++)
        e += "%" + t.substr(s, 2);
    else
      e += "%" + t;
    return e;
  },
  safeEncodeURIComponent(o) {
    o = (o || "").toString();
    try {
      o = encodeURIComponent(o);
    } catch {
      o = encodeURIComponent(Buffer.from(o, "utf-8").toString("utf-8"));
    }
    return o.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (e) => this.encodeURICharComponent(e));
  }
};
function _s(o) {
  const e = o.lastIndexOf("@");
  if (e < 0)
    return o;
  const t = o.substr(0, e);
  return /^[^\s"(),:;<>@[\\\]]+$/.test(t) || /^"(?:[^"\\]|\\[\s\S])*"$/.test(t) ? o : '"' + t.replace(/["\\]/g, "\\$&") + '"@' + o.substr(e + 1);
}
const Es = /\s/, bs = /^("(?:[^"\\]|\\[\s\S])*"@\S+)(?:\s+([\s\S]+))?$/, fi = /^[^@\s]+@[^@\s]+$/, ys = /^[^@\s]+@\S+$/;
function Ss(o) {
  if (!Es.test(o.address))
    return;
  let e, t;
  const s = o.address.match(bs);
  if (s) {
    if (!s[2])
      return;
    e = s[1], t = [s[2]];
  } else {
    if (o.address.indexOf('"') >= 0)
      return;
    const i = o.address.split(/\s+/);
    let n = i.findIndex((a) => fi.test(a));
    if (n < 0 && (n = i.findIndex((a) => ys.test(a))), n < 0)
      return;
    e = i.splice(n, 1)[0], t = i;
  }
  o.address = e, o.text = [o.text].concat(t).filter((i) => i).join(" ");
}
function Ts(o, e) {
  let t = !1, s = "text";
  const i = [], n = {
    address: [],
    comment: [],
    group: [],
    text: [],
    textWasQuoted: []
  };
  let a = !1;
  for (let r = 0, p = o.length; r < p; r++) {
    const c = o[r], l = r ? o[r - 1] : null;
    if (c.type === "operator")
      switch (c.value) {
        case "<":
          s = "address", a = !1;
          break;
        case "(":
          s = "comment", a = !1;
          break;
        case ":":
          s = "group", t = !0, a = !1;
          break;
        case '"':
          a = !a, s = "text";
          break;
        default:
          s = "text", a = !1;
          break;
      }
    else if (c.value) {
      s === "address" && (c.value = c.value.replace(/^[^<]*<\s*/, ""));
      const m = n[s];
      l && l.noBreak && m.length && (l.value !== ")" || m[m.length - 1].slice(-1) === "@" || c.value.charAt(0) === "@") ? (n[s][n[s].length - 1] += c.value, s === "text" && a && (n.textWasQuoted[n.textWasQuoted.length - 1] = !0)) : (n[s].push(c.value), s === "text" && n.textWasQuoted.push(a));
    }
  }
  if (!n.text.length && n.comment.length && (n.text = n.comment, n.comment = []), t) {
    n.text = n.text.join(" ");
    let r = [];
    n.group.length && xi(n.group.join(","), { _depth: e + 1 }).forEach((c) => {
      c.group ? r = r.concat(c.group) : r.push(c);
    }), i.push({
      name: n.text || "",
      group: r
    });
  } else {
    if (!n.address.length && n.text.length) {
      for (let c = n.text.length - 1; c >= 0; c--)
        if (!n.textWasQuoted[c] && fi.test(n.text[c])) {
          n.address = n.text.splice(c, 1), n.textWasQuoted.splice(c, 1);
          break;
        }
      if (!n.address.length) {
        let c = !1;
        for (let l = n.text.length - 1; l >= 0 && !(!n.textWasQuoted[l] && (n.text[l] = n.text[l].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, (m) => c ? m : (n.address = [m.trim()], c = !0, " ")).trim(), c)); l--)
          ;
      }
    }
    !n.text.length && n.comment.length && (n.text = n.comment, n.comment = []), n.address.length > 1 && (n.text = n.text.concat(n.address.splice(1)));
    const r = !n.address.length && n.textWasQuoted.some((c) => c);
    n.text = n.text.join(" "), n.address = n.address.join(" "), Ss(n);
    const p = {
      address: n.address || n.text || "",
      name: n.text || n.address || ""
    };
    p.address === p.name && (/@/.test(p.address || "") ? p.name = "" : p.address = ""), r && p.address && (p.address = _s(p.address)), i.push(p);
  }
  return i;
}
class As {
  constructor(e) {
    this.str = (e || "").toString(), this.operatorCurrent = "", this.operatorExpecting = "", this.node = null, this.escaped = !1, this.inDomainLiteral = !1, this.list = [], this.operators = {
      '"': '"',
      "(": ")",
      "<": ">",
      ",": "",
      ":": ";",
      // Semicolons are not a legal delimiter per the RFC2822 grammar other
      // than for terminating a group, but they are also not valid for any
      // other use in this context.  Given that some mail clients have
      // historically allowed the semicolon as a delimiter equivalent to the
      // comma in their UI, it makes sense to treat them the same as a comma
      // when used outside of a group.
      ";": ""
    };
  }
  /**
   * Tokenizes the original input string
   *
   * @return {Array} An array of operator|text tokens
   */
  tokenize() {
    const e = [];
    for (let t = 0, s = this.str.length; t < s; t++) {
      const i = this.str.charAt(t), n = t < s - 1 ? this.str.charAt(t + 1) : null;
      this.checkChar(i, n);
    }
    return this.list.forEach((t) => {
      t.value = (t.value || "").toString().trim(), t.value && e.push(t);
    }), e;
  }
  /**
   * Checks if a character is an operator or text and acts accordingly
   *
   * @param {String} chr Character from the address field
   */
  checkChar(e, t) {
    if (!this.escaped && !this.operatorExpecting && (!this.inDomainLiteral && e === "[" ? this.inDomainLiteral = !0 : this.inDomainLiteral && (e === "]" || e === "," || e === ";") && (this.inDomainLiteral = !1)), !this.escaped) {
      if (e === this.operatorExpecting) {
        this.node = {
          type: "operator",
          value: e
        }, t && ![" ", "	", "\r", `
`, ",", ";"].includes(t) && (this.node.noBreak = !0), this.list.push(this.node), this.node = null, this.operatorExpecting = "", this.escaped = !1;
        return;
      } else if (!this.operatorExpecting && !this.inDomainLiteral && e in this.operators) {
        this.node = {
          type: "operator",
          value: e
        }, this.list.push(this.node), this.node = null, this.operatorExpecting = this.operators[e], this.escaped = !1;
        return;
      } else if (['"', "'"].includes(this.operatorExpecting) && e === "\\") {
        this.escaped = !0;
        return;
      }
    }
    this.node || (this.node = {
      type: "text",
      value: ""
    }, this.list.push(this.node)), e === `
` && (e = " "), (e.charCodeAt(0) >= 33 || [" ", "	"].includes(e)) && (this.node.value += e), this.escaped = !1;
  }
}
const ks = 50;
function xi(o, e) {
  e = e || {};
  const t = e._depth || 0;
  if (t > ks)
    return [];
  const i = new As(o).tokenize(), n = [];
  let a = [], r = [];
  i.forEach((c) => {
    c.type === "operator" && (c.value === "," || c.value === ";") ? (a.length && n.push(a), a = []) : a.push(c);
  }), a.length && n.push(a), n.forEach((c) => {
    const l = Ts(c, t);
    for (let m = 0; m < l.length; m++)
      r.push(l[m]);
  });
  const p = [];
  for (let c = r.length - 1; c >= 0; c--) {
    const l = r[c], m = p.length ? p[p.length - 1] : null;
    m && l.address === "" && l.name && !l.group && m.address && m.name ? m.name = l.name + ", " + m.name : p.push(l);
  }
  if (p.reverse(), r = p, e.flatten) {
    const c = [], l = (m) => {
      m.forEach((d) => {
        if (d.group)
          return l(d.group);
        c.push(d);
      });
    };
    return l(r), c;
  }
  return r;
}
var Cs = xi;
const { Transform: Ls } = O;
let Is = class extends Ls {
  constructor() {
    super(), this.lastByte = !1;
  }
  _transform(e, t, s) {
    e.length && (this.lastByte = e[e.length - 1]), this.push(e), s();
  }
  _flush(e) {
    return this.lastByte === 10 ? e() : this.lastByte === 13 ? (this.push(Buffer.from(`
`)), e()) : (this.push(Buffer.from(`\r
`)), e());
  }
};
var Os = Is;
const { Transform: Ms } = O;
let js = class extends Ms {
  constructor(e) {
    super(e), this.lastByte = !1;
  }
  /**
   * Escapes dots
   */
  _transform(e, t, s) {
    let i, n = 0;
    for (let a = 0, r = e.length; a < r; a++)
      e[a] === 10 && (a && e[a - 1] !== 13 || !a && this.lastByte !== 13) && (a > n && (i = e.slice(n, a), this.push(i)), this.push(Buffer.from(`\r
`)), n = a + 1);
    n && n < e.length ? (i = e.slice(n), this.push(i)) : n || this.push(e), this.lastByte = e[e.length - 1], s();
  }
};
var Te = js;
const { Transform: Ns } = O;
let Ps = class extends Ns {
  constructor(e) {
    super(e);
  }
  /**
   * Escapes dots
   */
  _transform(e, t, s) {
    let i, n = 0;
    for (let a = 0, r = e.length; a < r; a++)
      e[a] === 13 && (i = e.slice(n, a), n = a + 1, this.push(i));
    n && n < e.length ? (i = e.slice(n), this.push(i)) : n || this.push(e), s();
  }
};
var Je = Ps;
const Ie = X, Hs = Ge, ut = Xe, { PassThrough: ae } = O, ge = L, ft = Kt, C = Se, Us = ui, Rs = mi, zs = Cs, Ds = ye, xt = H, Bs = Os, qs = Te, $s = Je, Fs = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"], gt = "[A-Za-z0-9!#$%&'*+\\-/=?^_`{|}~\\x80-\\uFFFF]", Ks = new RegExp("^" + gt + "+(?:\\." + gt + "+)*$"), Qs = /^"(?:[^"\\]|\\[\s\S])*"$/, Gs = /^[^\s"(),:;<>@[\\\]]+@[^\s"(),:;<>@[\\\]]+$/, Ws = /[/\\?#%\x00-\x20\x7F]/;
function Xs(o, e) {
  const t = e ? ft.domainToUnicode : ft.domainToASCII;
  if (typeof t == "function" && !Ws.test(o)) {
    const s = t(o);
    if (s)
      return s;
  }
  return e ? ut.toUnicode(o) : ut.toASCII(o);
}
let Vs = class gi {
  constructor(e, t) {
    this.nodeCounter = 0, t = t || {}, this.baseBoundary = t.baseBoundary || Ie.randomBytes(8).toString("hex"), this.boundaryPrefix = t.boundaryPrefix || "--_NmP", this.disableFileAccess = !!t.disableFileAccess, this.disableUrlAccess = !!t.disableUrlAccess, this.normalizeHeaderKey = t.normalizeHeaderKey, this.date = t.parentNode ? null : /* @__PURE__ */ new Date(), this.rootNode = t.rootNode || this, this.keepBcc = !!t.keepBcc, t.filename && (this.filename = t.filename, e || (e = C.detectMimeType(this.filename.split(".").pop()))), this.textEncoding = (t.textEncoding || "").toString().trim().charAt(0).toUpperCase(), this.parentNode = t.parentNode, this.hostname = t.hostname, this.newline = t.newline, this.childNodes = [], this._nodeId = ++this.rootNode.nodeCounter, this._headers = [], this._isPlainText = !1, this._hasLongLines = !1, this._envelope = !1, this._raw = !1, this._transforms = [], this._processFuncs = [], e && this.setHeader("Content-Type", e);
  }
  /////// PUBLIC METHODS
  /**
   * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
   *
   * @param {String} [contentType] Optional content type
   * @param {Object} [options] Optional options object
   * @return {Object} Created node object
   */
  createChild(e, t) {
    !t && typeof e == "object" && (t = e, e = void 0);
    const s = new gi(e, t);
    return this.appendChild(s), s;
  }
  /**
   * Appends an existing node to the mime tree. Removes the node from an existing
   * tree if needed
   *
   * @param {Object} childNode node to be appended
   * @return {Object} Appended node object
   */
  appendChild(e) {
    return e.rootNode !== this.rootNode && (e.rootNode = this.rootNode, e._nodeId = ++this.rootNode.nodeCounter), e.parentNode = this, this.childNodes.push(e), e;
  }
  /**
   * Replaces current node with another node
   *
   * @param {Object} node Replacement node
   * @return {Object} Replacement node
   */
  replace(e) {
    return e === this ? this : (this.parentNode.childNodes.forEach((t, s) => {
      t === this && (e.rootNode = this.rootNode, e.parentNode = this.parentNode, e._nodeId = this._nodeId, this.rootNode = this, this.parentNode = void 0, e.parentNode.childNodes[s] = e);
    }), e);
  }
  /**
   * Removes current node from the mime tree
   *
   * @return {Object} removed node
   */
  remove() {
    if (!this.parentNode)
      return this;
    for (let e = this.parentNode.childNodes.length - 1; e >= 0; e--)
      if (this.parentNode.childNodes[e] === this)
        return this.parentNode.childNodes.splice(e, 1), this.parentNode = void 0, this.rootNode = this, this;
  }
  /**
   * Sets a header value. If the value for selected key exists, it is overwritten.
   * You can set multiple values as well by using [{key:'', value:''}] or
   * {key: 'value'} as the first argument.
   *
   * @param {String|Array|Object} key Header key or a list of key value pairs
   * @param {String} value Header value
   * @return {Object} current node
   */
  setHeader(e, t) {
    let s = !1;
    if (!t && e && typeof e == "object")
      return e.key && "value" in e ? this.setHeader(e.key, e.value) : Array.isArray(e) ? e.forEach((n) => {
        this.setHeader(n.key, n.value);
      }) : Object.keys(e).forEach((n) => {
        this.setHeader(n, e[n]);
      }), this;
    e = this._normalizeHeaderKey(e);
    const i = {
      key: e,
      value: t
    };
    for (let n = 0, a = this._headers.length; n < a; n++)
      this._headers[n].key === e && (s ? (this._headers.splice(n, 1), n--, a--) : (this._headers[n] = i, s = !0));
    return s || this._headers.push(i), this;
  }
  /**
   * Adds a header value. If the value for selected key exists, the value is appended
   * as a new field and old one is not touched.
   * You can set multiple values as well by using [{key:'', value:''}] or
   * {key: 'value'} as the first argument.
   *
   * @param {String|Array|Object} key Header key or a list of key value pairs
   * @param {String} value Header value
   * @return {Object} current node
   */
  addHeader(e, t) {
    return !t && e && typeof e == "object" ? (e.key && e.value ? this.addHeader(e.key, e.value) : Array.isArray(e) ? e.forEach((s) => {
      this.addHeader(s.key, s.value);
    }) : Object.keys(e).forEach((s) => {
      this.addHeader(s, e[s]);
    }), this) : Array.isArray(t) ? (t.forEach((s) => {
      this.addHeader(e, s);
    }), this) : (this._headers.push({
      key: this._normalizeHeaderKey(e),
      value: t
    }), this);
  }
  /**
   * Retrieves the first mathcing value of a selected key
   *
   * @param {String} key Key to search for
   * @retun {String} Value for the key
   */
  getHeader(e) {
    e = this._normalizeHeaderKey(e);
    for (let t = 0, s = this._headers.length; t < s; t++)
      if (this._headers[t].key === e)
        return this._headers[t].value;
  }
  /**
   * Sets body content for current node. If the value is a string, charset is added automatically
   * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
   * the charset yourself
   *
   * @param (String|Buffer) content Body content
   * @return {Object} current node
   */
  setContent(e) {
    return this.content = e, typeof this.content.pipe == "function" ? (this._contentErrorHandler = (t) => {
      this.content.removeListener("error", this._contentErrorHandler), this.content = t;
    }, this.content.once("error", this._contentErrorHandler)) : typeof this.content == "string" && (this._isPlainText = C.isPlainText(this.content), this._isPlainText && C.hasLongerLines(this.content, 76) && (this._hasLongLines = !0)), this;
  }
  build(e) {
    let t;
    e || (t = new Promise((r, p) => {
      e = ge.callbackPromise(r, p);
    }));
    const s = this.createReadStream(), i = [];
    let n = 0, a = !1;
    return s.on("readable", () => {
      let r;
      for (; (r = s.read()) !== null; )
        i.push(r), n += r.length;
    }), s.once("error", (r) => {
      if (!a)
        return a = !0, e(r);
    }), s.once("end", (r) => {
      if (!a)
        return a = !0, r && r.length && (i.push(r), n += r.length), e(null, Buffer.concat(i, n));
    }), t;
  }
  getTransferEncoding() {
    let e = !1;
    const t = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
    return this.content && (e = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim(), (!e || !["base64", "quoted-printable"].includes(e)) && (/^text\//i.test(t) ? this._isPlainText && !this._hasLongLines ? e = "7bit" : typeof this.content == "string" || this.content instanceof Buffer ? e = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64" : e = this.textEncoding === "B" ? "base64" : "quoted-printable" : /^(multipart|message)\//i.test(t) || (e = e || "base64"))), e;
  }
  /**
   * Builds the header block for the mime node. Append \r\n\r\n before writing the content
   *
   * @returns {String} Headers
   */
  buildHeaders() {
    const e = this.getTransferEncoding(), t = [];
    if (e && this.setHeader("Content-Transfer-Encoding", e), this.filename && !this.getHeader("Content-Disposition") && this.setHeader("Content-Disposition", "attachment"), this.rootNode === this) {
      this.getHeader("Date") || this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000")), this.messageId(), this.getHeader("MIME-Version") || this.setHeader("MIME-Version", "1.0");
      for (let s = this._headers.length - 2; s >= 0; s--) {
        const i = this._headers[s];
        i.key === "Content-Type" && (this._headers.splice(s, 1), this._headers.push(i));
      }
    }
    return this._headers.forEach((s) => {
      let i = s.key, n = s.value, a, r;
      const p = {};
      if (!(n && typeof n == "object" && !Fs.includes(i) && (ge.copyOwnKeys(p, n, (l) => l === "value"), n = (n.value || "").toString(), !n.trim()))) {
        if (p.prepared) {
          p.foldLines ? t.push(C.foldLines(i + ": " + n)) : t.push(i + ": " + n);
          return;
        }
        switch (s.key) {
          case "Content-Disposition":
            a = C.parseHeaderValue(n), this.filename && (a.params.filename = this.filename), n = C.buildHeaderValue(a);
            break;
          case "Content-Type":
            a = C.parseHeaderValue(n), a.value = (a.value || "").toString().replace(/[\x00-\x1f\x7f]/g, ""), this._handleContentType(a), a.value.match(/^text\/plain\b/) && typeof this.content == "string" && /[\u0080-\uFFFF]/.test(this.content) && (a.params.charset = "utf-8"), n = C.buildHeaderValue(a), this.filename && (r = /[\x00-\x1f\x7f]/.test(this.filename) ? C.encodeWord(this.filename, this._getTextEncoding(this.filename), 52) : this._encodeWords(this.filename), (r !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(r)) && (r = JSON.stringify(r)), n += "; name=" + r);
            break;
          case "Bcc":
            if (!this.keepBcc)
              return;
            break;
        }
        if (n = this._encodeHeaderValue(i, n), !!(n || "").toString().trim()) {
          if (typeof this.normalizeHeaderKey == "function") {
            const l = this.normalizeHeaderKey(i, n), m = typeof l == "string" ? l.replace(/[\x00-\x1f\x7f]/g, "") : "";
            m && (i = m);
          }
          t.push(C.foldLines(i + ": " + n, 76));
        }
      }
    }), t.join(`\r
`);
  }
  /**
   * Streams the rfc2822 message from the current node. If this is a root node,
   * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
   *
   * @return {String} Compiled message
   */
  createReadStream(e) {
    e = e || {};
    const t = new ae(e);
    let s = t, i;
    this.stream(t, e, (n) => {
      if (n) {
        s.emit("error", n);
        return;
      }
      t.end();
    });
    for (let n = 0, a = this._transforms.length; n < a; n++)
      i = typeof this._transforms[n] == "function" ? this._transforms[n]() : this._transforms[n], s.once("error", (r) => {
        i.emit("error", r);
      }), s = s.pipe(i);
    i = new Bs(), s.once("error", (n) => {
      i.emit("error", n);
    }), s = s.pipe(i);
    for (let n = 0, a = this._processFuncs.length; n < a; n++)
      i = this._processFuncs[n], s = i(s);
    if (this.newline) {
      const a = ["win", "windows", "dos", `\r
`].includes(this.newline.toString().toLowerCase()) ? new qs() : new $s(), r = s.pipe(a);
      return s.on("error", (p) => r.emit("error", p)), r;
    }
    return s;
  }
  /**
   * Appends a transform stream object to the transforms list. Final output
   * is passed through this stream before exposing
   *
   * @param {Object} transform Read-Write stream
   */
  transform(e) {
    this._transforms.push(e);
  }
  /**
   * Appends a post process function. The functon is run after transforms and
   * uses the following syntax
   *
   *   processFunc(input) -> outputStream
   *
   * @param {Object} processFunc Read-Write stream
   */
  processFunc(e) {
    this._processFuncs.push(e);
  }
  stream(e, t, s) {
    const i = this.getTransferEncoding();
    let n, a, r = !1;
    const p = (m) => {
      r || (r = !0, s(m));
    }, c = () => {
      let m = 0;
      const d = () => {
        if (m >= this.childNodes.length)
          return e.write(`\r
--` + this.boundary + `--\r
`), p();
        const u = this.childNodes[m++];
        e.write((m > 1 ? `\r
` : "") + "--" + this.boundary + `\r
`), u.stream(e, t, (f) => {
          if (f)
            return p(f);
          setImmediate(d);
        });
      };
      if (this.multipart)
        setImmediate(d);
      else
        return p();
    }, l = () => {
      if (this.content) {
        if (Object.prototype.toString.call(this.content) === "[object Error]")
          return p(this.content);
        typeof this.content.pipe == "function" && (this.content.removeListener("error", this._contentErrorHandler), this._contentErrorHandler = (d) => p(d), this.content.once("error", this._contentErrorHandler));
        const m = () => {
          ["quoted-printable", "base64"].includes(i) ? (n = new (i === "base64" ? Rs : Us).Encoder(t), n.pipe(e, {
            end: !1
          }), n.once("end", c), n.once("error", (d) => p(d)), a = this._getStream(this.content), a.pipe(n)) : (a = this._getStream(this.content), a.pipe(e, {
            end: !1
          }), a.once("end", c)), a.once("error", (d) => p(d));
        };
        if (this.content._resolve) {
          const d = [];
          let u = 0, f = !1;
          const b = this._getStream(this.content);
          b.on("error", (A) => {
            f || (f = !0, p(A));
          }), b.on("readable", () => {
            let A;
            for (; (A = b.read()) !== null; )
              d.push(A), u += A.length;
          }), b.on("end", () => {
            f || (f = !0, this.content._resolve = !1, this.content._resolvedValue = Buffer.concat(d, u), setImmediate(m));
          });
        } else
          setImmediate(m);
        return;
      }
      return setImmediate(c);
    };
    this._raw ? setImmediate(() => {
      if (Object.prototype.toString.call(this._raw) === "[object Error]")
        return p(this._raw);
      typeof this._raw.pipe == "function" && this._raw.removeListener("error", this._contentErrorHandler);
      const m = this._getStream(this._raw);
      m.pipe(e, {
        end: !1
      }), m.on("error", (d) => e.emit("error", d)), m.on("end", c);
    }) : (e.write(this.buildHeaders() + `\r
\r
`), setImmediate(l));
  }
  /**
   * Sets envelope to be used instead of the generated one
   *
   * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
   */
  setEnvelope(e) {
    let t;
    this._envelope = {
      from: !1,
      to: []
    }, e.from && (t = [], this._convertAddresses(this._parseEnvelopeAddresses(e.from), t), t = t.filter((n) => n && n.address), t.length && t[0] && (this._envelope.from = t[0].address));
    const s = /* @__PURE__ */ new Set();
    ["to", "cc", "bcc"].forEach((n) => {
      e[n] && this._convertAddresses(this._parseEnvelopeAddresses(e[n]), this._envelope.to, s);
    }), this._envelope.to = this._envelope.to.map((n) => n.address).filter((n) => n);
    const i = ["to", "cc", "bcc", "from"];
    return ge.copyOwnKeys(this._envelope, e, (n) => i.includes(n)), this;
  }
  /**
   * Generates and returns an object with parsed address fields
   *
   * @return {Object} Address object
   */
  getAddresses() {
    const e = {}, t = /* @__PURE__ */ new Map();
    return this._headers.forEach((s) => {
      const i = s.key.toLowerCase();
      ["from", "sender", "reply-to", "to", "cc", "bcc"].includes(i) && (Array.isArray(e[i]) || (e[i] = [], t.set(i, /* @__PURE__ */ new Set())), this._convertAddresses(this._parseAddresses(s.value), e[i], t.get(i)));
    }), e;
  }
  /**
   * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
   *
   * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
   */
  getEnvelope() {
    if (this._envelope)
      return this._envelope;
    const e = {
      from: !1,
      to: []
    }, t = /* @__PURE__ */ new Set();
    return this._headers.forEach((s) => {
      const i = [];
      s.key === "From" || !e.from && ["Reply-To", "Sender"].includes(s.key) ? (this._convertAddresses(this._parseAddresses(s.value), i), i.length && i[0] && (e.from = i[0].address)) : ["To", "Cc", "Bcc"].includes(s.key) && this._convertAddresses(this._parseAddresses(s.value), e.to, t);
    }), e.to = e.to.map((s) => s.address), e;
  }
  /**
   * Returns Message-Id value. If it does not exist, then creates one
   *
   * @return {String} Message-Id value
   */
  messageId() {
    let e = this.getHeader("Message-ID");
    return e || (e = this._generateMessageId(), this.setHeader("Message-ID", e)), e;
  }
  /**
   * Sets pregenerated content that will be used as the output of this node
   *
   * @param {String|Buffer|Stream} Raw MIME contents
   */
  setRaw(e) {
    return this._raw = e, this._raw && typeof this._raw.pipe == "function" && (this._contentErrorHandler = (t) => {
      this._raw.removeListener("error", this._contentErrorHandler), this._raw = t;
    }, this._raw.once("error", this._contentErrorHandler)), this;
  }
  /////// PRIVATE METHODS
  /**
   * Detects and returns handle to a stream related with the content.
   *
   * @param {Mixed} content Node content
   * @returns {Object} Stream object
   */
  _getStream(e) {
    let t;
    return e._resolvedValue ? (t = new ae(), setImmediate(() => {
      try {
        t.end(e._resolvedValue);
      } catch (s) {
        t.emit("error", s);
      }
    }), t) : typeof e.pipe == "function" ? e : e && typeof e.path == "string" && !e.href ? this.disableFileAccess ? (t = new ae(), setImmediate(() => {
      const s = new Error("File access rejected for " + e.path);
      s.code = xt.EFILEACCESS, t.emit("error", s);
    }), t) : Hs.createReadStream(e.path) : e && typeof e.href == "string" ? this.disableUrlAccess ? (t = new ae(), setImmediate(() => {
      const s = new Error("Url access rejected for " + e.href);
      s.code = xt.EURLACCESS, t.emit("error", s);
    }), t) : Ds(e.href, { headers: e.httpHeaders, tls: e.tls }) : (t = new ae(), setImmediate(() => {
      try {
        t.end(e || "");
      } catch (s) {
        t.emit("error", s);
      }
    }), t);
  }
  /**
   * Parses addresses. Takes in a single address or an array or an
   * array of address arrays (eg. To: [[first group], [second group],...])
   *
   * @param {Mixed} addresses Addresses to be parsed
   * @return {Array} An array of address objects
   */
  _parseAddresses(e) {
    const t = [];
    return [].concat(e).forEach((s) => {
      if (s && s.address) {
        const n = this._normalizeAddress(s.address);
        if (n === s.address && typeof s.name == "string") {
          t.push(s);
          return;
        }
        const a = ge.copyOwnKeys({}, s);
        a.address = n, a.name = s.name || "", t.push(a);
        return;
      }
      const i = this._normalizeParsedAddresses(zs(s));
      for (let n = 0; n < i.length; n++)
        t.push(i[n]);
    }), t;
  }
  /**
   * Normalizes the addresses of a freshly parsed address list, groups included.
   *
   * Everything this method returns carries a normalized address, whether it arrived as an
   * object or was parsed out of a header value. Without this the two shapes disagree, and
   * a consumer reading the parsed form back is handed the ambiguous
   * 'user@evil.com@good.com' that the header and the envelope no longer carry.
   *
   * @param {Array} parsed An array of address objects, as returned by addressparser
   * @return {Array} The same array, with every address normalized
   */
  _normalizeParsedAddresses(e) {
    return e.forEach((t) => {
      t.address ? t.address = this._normalizeAddress(t.address) : t.group && this._normalizeParsedAddresses(t.group);
    }), e;
  }
  /**
   * Parses the addresses of an explicitly set envelope.
   *
   * An envelope value is an addr-spec and never a display name, so a bare local username
   * such as 'root' is the address here. Header parsing has to read the same value as a
   * display name, as a value with no '@' in it can not be an addr-spec in a header.
   *
   * @param {Mixed} addresses Addresses to be parsed
   * @return {Array} An array of address objects
   */
  _parseEnvelopeAddresses(e) {
    return this._parseAddresses(e).map((t) => t.address || t.group || !t.name || /[\s@]/.test(t.name) ? t : { address: this._normalizeAddress(t.name), name: "" });
  }
  /**
   * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
   *
   * @param {String} key Key to be normalized
   * @return {String} key in Camel-Case form
   */
  _normalizeHeaderKey(e) {
    return e = (e || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x1f\x7f]/g, "").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (t) => t.toUpperCase()).replace(/^Content-Features$/i, "Content-features"), e;
  }
  /**
   * Checks if the content type is multipart and defines boundary if needed.
   * Doesn't return anything, modifies object argument instead.
   *
   * @param {Object} structured Parsed header value for 'Content-Type' key
   */
  _handleContentType(e) {
    this.contentType = e.value.trim().toLowerCase(), this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : !1, this.multipart ? this.boundary = e.params.boundary = e.params.boundary || this.boundary || this._generateBoundary() : this.boundary = !1;
  }
  /**
   * Generates a multipart boundary value
   *
   * @return {String} boundary value
   */
  _generateBoundary() {
    return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
  }
  /**
   * Encodes a header value for use in the generated rfc2822 email.
   *
   * @param {String} key Header key
   * @param {String} value Header value
   */
  _encodeHeaderValue(e, t) {
    switch (e = this._normalizeHeaderKey(e), e) {
      case "From":
      case "Sender":
      case "To":
      case "Cc":
      case "Bcc":
      case "Reply-To":
        return this._convertAddresses(this._parseAddresses(t));
      case "Message-ID":
      case "In-Reply-To":
      case "Content-Id":
        return t = (t || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ""), t.charAt(0) !== "<" && (t = "<" + t), t.charAt(t.length - 1) !== ">" && (t = t + ">"), t;
      case "References":
        return t = [].concat.apply(
          [],
          [].concat(t || "").map((s) => (s = (s || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "").trim(), s.replace(/<[^>]*>/g, (i) => i.replace(/\s/g, "")).split(/\s+/)))
        ).map((s) => (s.charAt(0) !== "<" && (s = "<" + s), s.charAt(s.length - 1) !== ">" && (s = s + ">"), s)), t.join(" ").trim();
      case "Date":
        return Object.prototype.toString.call(t) === "[object Date]" ? t.toUTCString().replace(/GMT/, "+0000") : (t = (t || "").toString().replace(/\r?\n|\r/g, " "), this._encodeHeaderText(t));
      case "Content-Type":
      case "Content-Disposition":
        return (t || "").toString().replace(/\r?\n|\r/g, " ");
      default:
        return t = (t || "").toString().replace(/\r?\n|\r/g, " "), this._encodeHeaderText(t);
    }
  }
  /**
   * Rebuilds address object using punycode and other adjustments
   *
   * @param {Array} addresses An array of address objects
   * @param {Array} [uniqueList] An array to be populated with addresses
   * @return {String} address string
   */
  _convertAddresses(e, t, s) {
    const i = [];
    if (t = t || [], !s) {
      s = /* @__PURE__ */ new Set();
      for (let n = 0; n < t.length; n++)
        s.add(t[n].address);
    }
    return [].concat(e || []).forEach((n) => {
      if (n.address)
        n.address = this._normalizeAddress(n.address), n.name ? i.push(`${this._encodeAddressName(n.name)} <${n.address}>`) : i.push(Gs.test(n.address) ? n.address : `<${n.address}>`), s.has(n.address) || (s.add(n.address), t.push(n));
      else if (n.group) {
        const a = (n.group.length ? this._convertAddresses(n.group, t, s) : "").trim();
        i.push(`${this._encodeAddressName(n.name)}:${a};`);
      }
    }), i.join(", ");
  }
  /**
   * Normalizes an email address
   *
   * @param {Array} address An array of address objects
   * @return {String} address string
   */
  _normalizeAddress(e) {
    if (e = (e || "").toString().replace(/[\x00-\x1F\x7F<>]+/g, " ").trim(), !e)
      return e;
    const t = e.lastIndexOf("@");
    if (t < 0)
      return this._normalizeLocalPart(e);
    const s = e.substr(0, t), i = e.substr(t + 1);
    let n = i;
    const a = /[\x80-\uFFFF]/.test(s);
    try {
      n = Xs(i.toLowerCase(), a);
    } catch {
    }
    return `${this._normalizeLocalPart(s)}@${n}`;
  }
  /**
   * Normalizes the local part of an address into a form that can be emitted as is.
   *
   * A local part is either a dot-atom or a quoted-string, anything else is not a valid
   * addr-spec. The quotes of a quoted local part get lost along the way, and a bare
   * 'user@evil.com@good.com' leaves it to the receiver which '@' splits the domain off,
   * while the split here is always at the last one. So whatever is not already one of
   * the two valid forms goes back out as a quoted-string.
   *
   * @param {String} user Local part of an address
   * @return {String} Local part as a dot-atom or as a quoted-string
   */
  _normalizeLocalPart(e) {
    return Ks.test(e) || Qs.test(e) ? e : C.quoteString(e);
  }
  /**
   * If needed, mime encodes the name part
   *
   * @param {String} name Name part of an address
   * @returns {String} Mime word encoded string if needed
   */
  _encodeAddressName(e) {
    return /^[\w ]*$/.test(e) ? e : /^[\x20-\x7e]*$/.test(e) ? C.quoteString(e) : C.encodeWord(e, this._getTextEncoding(e), 52);
  }
  /**
   * Encodes an unstructured header value. Such a value can only carry VCHAR and WSP, so a
   * control char or DEL has to be forced into the mime encoded word that a non-ascii value
   * would get anyway. HT stays as it is, it is valid folding whitespace here.
   *
   * @param {String} value Header value to encode
   * @returns {String} Mime word encoded string if needed
   */
  _encodeHeaderText(e) {
    return /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(e) ? C.encodeWord(e, this._getTextEncoding(e), 52) : (
      // encodeWords only encodes if needed, otherwise the original string is returned
      this._encodeWords(e)
    );
  }
  /**
   * If needed, mime encodes the name part
   *
   * @param {String} name Name part of an address
   * @returns {String} Mime word encoded string if needed
   */
  _encodeWords(e) {
    return C.encodeWords(e, this._getTextEncoding(e), 52, !0);
  }
  /**
   * Detects best mime encoding for a text value
   *
   * @param {String} value Value to check for
   * @return {String} either 'Q' or 'B'
   */
  _getTextEncoding(e) {
    if (e = (e || "").toString(), this.textEncoding)
      return this.textEncoding;
    let t = 0, s = 0;
    for (let i = 0, n = e.length; i < n; i++) {
      const a = e.charCodeAt(i);
      a >= 0 && a <= 8 || a === 11 || a === 12 || a >= 14 && a <= 31 || a >= 128 ? t++ : (a >= 65 && a <= 90 || a >= 97 && a <= 122) && s++;
    }
    return t < s ? "Q" : "B";
  }
  /**
   * Generates a message id
   *
   * @return {String} Random Message-ID value
   */
  _generateMessageId() {
    return "<" + [2, 2, 2, 6].reduce(
      // crux to generate UUID-like random strings
      (e, t) => e + "-" + Ie.randomBytes(t).toString("hex"),
      Ie.randomBytes(4).toString("hex")
    ) + "@" + // try to use the domain of the FROM address or fallback to server hostname
    (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
  }
};
var Ye = Vs;
const oe = Ye, Oe = Se, { parseDataURI: Js, copyOwnKeys: vt } = L;
let Ys = class {
  constructor(e) {
    this.mail = e || {}, this.message = !1;
  }
  /**
   * Builds MimeNode instance
   */
  compile() {
    return this._alternatives = this.getAlternatives(), this._htmlNode = this._alternatives.filter((e) => /^text\/html\b/i.test(e.contentType)).pop(), this._attachments = this.getAttachments(!!this._htmlNode), this._useRelated = !!(this._htmlNode && this._attachments.related.length), this._useAlternative = this._alternatives.length > 1, this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1, this.mail.raw ? this.message = new oe("message/rfc822", {
      newline: this.mail.newline,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess
    }).setRaw(this.mail.raw) : this._useMixed ? this.message = this._createMixed() : this._useAlternative ? this.message = this._createAlternative() : this._useRelated ? this.message = this._createRelated() : this.message = this._createContentNode(
      !1,
      [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
        contentType: "text/plain",
        content: ""
      }
    ), this.mail.headers && this.message.addHeader(this.mail.headers), ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((e) => {
      const t = e.replace(/-(\w)/g, (s, i) => i.toUpperCase());
      this.mail[t] && this.message.setHeader(e, this.mail[t]);
    }), this.mail.envelope && this.message.setEnvelope(this.mail.envelope), this.message.messageId(), this.message;
  }
  /**
   * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
   *
   * @param {Boolean} findRelated If true separate related attachments from attached ones
   * @returns {Object} An object of arrays (`related` and `attached`)
   */
  getAttachments(e) {
    let t;
    const s = [].concat(this.mail.attachments || []).map((i, n) => {
      /^data:/i.test(i.path || i.href) && (i = this._processDataUrl(i));
      const a = i.contentType || Oe.detectMimeType(i.filename || i.path || i.href || "bin"), r = /^image\//i.test(a), p = /^message\//i.test(a), c = i.contentDisposition || (p || r && i.cid ? "inline" : "attachment");
      let l;
      "contentTransferEncoding" in i ? l = i.contentTransferEncoding : p ? l = "8bit" : l = "base64";
      const m = {
        contentType: a,
        contentDisposition: c,
        contentTransferEncoding: l
      };
      return i.filename ? m.filename = i.filename : !p && i.filename !== !1 && (m.filename = (i.path || i.href || "").split("/").pop().split("?").shift() || "attachment-" + (n + 1), m.filename.indexOf(".") < 0 && (m.filename += "." + Oe.detectExtension(m.contentType))), /^https?:\/\//i.test(i.path) && (i.href = i.path, i.path = void 0), i.cid && (m.cid = i.cid), i.raw ? m.raw = i.raw : i.path ? m.content = {
        path: i.path
      } : i.href ? m.content = {
        href: i.href,
        httpHeaders: i.httpHeaders,
        tls: i.tls
      } : m.content = i.content || "", i.encoding && (m.encoding = i.encoding), i.headers && (m.headers = i.headers), m;
    });
    return this.mail.icalEvent && (t = Object.assign({}, this._getIcalEvent()), t.contentType = "application/ics", t.headers || (t.headers = {}), t.filename = t.filename || "invite.ics", t.headers["Content-Disposition"] = "attachment", t.headers["Content-Transfer-Encoding"] = "base64"), e ? {
      attached: s.filter((i) => !i.cid).concat(t || []),
      related: s.filter((i) => !!i.cid)
    } : {
      attached: s.concat(t || []),
      related: []
    };
  }
  /**
   * Returns the icalEvent value with `path`/`href`/data uri input normalized into
   * a `content` entry, the same way as for regular attachments. The same event is
   * included twice (as a text/calendar alternative and as an application/ics
   * attachment), so the shared content object is marked to be resolved just once
   * and the buffered result is reused by the second node.
   *
   * @returns {Object} Normalized icalEvent data
   */
  _getIcalEvent() {
    if (!this._icalEvent) {
      let e;
      typeof this.mail.icalEvent == "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw) ? e = vt({}, this.mail.icalEvent) : e = {
        content: this.mail.icalEvent
      }, /^data:/i.test(e.path || e.href) && (e = this._processDataUrl(e)), /^https?:\/\//i.test(e.path) && (e.href = e.path, e.path = void 0), e.raw || (e.path ? (e.content = {
        path: e.path
      }, e.path = void 0) : e.href && (e.content = {
        href: e.href,
        httpHeaders: e.httpHeaders
      }, e.href = void 0)), e.content && typeof e.content == "object" && (e.content._resolve = !0), this._icalEvent = e;
    }
    return this._icalEvent;
  }
  /**
   * List alternatives. Resulting objects can be used as input for MimeNode nodes
   *
   * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
   */
  getAlternatives() {
    const e = [];
    let t, s, i, n, a;
    return this.mail.text && (typeof this.mail.text == "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw) ? t = this.mail.text : t = {
      content: this.mail.text
    }, t.contentType = "text/plain; charset=utf-8"), this.mail.watchHtml && (typeof this.mail.watchHtml == "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw) ? i = this.mail.watchHtml : i = {
      content: this.mail.watchHtml
    }, i.contentType = "text/watch-html; charset=utf-8"), this.mail.amp && (typeof this.mail.amp == "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw) ? n = this.mail.amp : n = {
      content: this.mail.amp
    }, n.contentType = "text/x-amp-html; charset=utf-8"), this.mail.icalEvent && (a = Object.assign({}, this._getIcalEvent()), a.filename = !1, a.contentType = "text/calendar; charset=utf-8; method=" + (a.method || "PUBLISH").toString().trim().toUpperCase(), a.headers || (a.headers = {})), this.mail.html && (typeof this.mail.html == "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw) ? s = this.mail.html : s = {
      content: this.mail.html
    }, s.contentType = "text/html; charset=utf-8"), [].concat(t || []).concat(i || []).concat(n || []).concat(s || []).concat(a || []).concat(this.mail.alternatives || []).forEach((r) => {
      /^data:/i.test(r.path || r.href) && (r = this._processDataUrl(r));
      const p = {
        contentType: r.contentType || Oe.detectMimeType(r.filename || r.path || r.href || "txt"),
        contentTransferEncoding: r.contentTransferEncoding
      };
      r.filename && (p.filename = r.filename), /^https?:\/\//i.test(r.path) && (r.href = r.path, r.path = void 0), r.raw ? p.raw = r.raw : r.path ? p.content = {
        path: r.path
      } : r.href ? p.content = {
        href: r.href
      } : p.content = r.content || "", r.encoding && (p.encoding = r.encoding), r.headers && (p.headers = r.headers), e.push(p);
    }), e;
  }
  /**
   * Builds multipart/mixed node. It should always contain different type of elements on the same level
   * eg. text + attachments
   *
   * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
   * @returns {Object} MimeNode node element
   */
  _createMixed(e) {
    const t = e ? e.createChild("multipart/mixed", {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new oe("multipart/mixed", {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    return this._useAlternative ? this._createAlternative(t) : this._useRelated && this._createRelated(t), [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((s) => {
      (!this._useRelated || s !== this._htmlNode) && this._createContentNode(t, s);
    }), t;
  }
  /**
   * Builds multipart/alternative node. It should always contain same type of elements on the same level
   * eg. text + html view of the same data
   *
   * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
   * @returns {Object} MimeNode node element
   */
  _createAlternative(e) {
    const t = e ? e.createChild("multipart/alternative", {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new oe("multipart/alternative", {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    return this._alternatives.forEach((s) => {
      this._useRelated && this._htmlNode === s ? this._createRelated(t) : this._createContentNode(t, s);
    }), t;
  }
  /**
   * Builds multipart/related node. It should always contain html node with related attachments
   *
   * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
   * @returns {Object} MimeNode node element
   */
  _createRelated(e) {
    const t = e ? e.createChild('multipart/related; type="text/html"', {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new oe('multipart/related; type="text/html"', {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    return this._createContentNode(t, this._htmlNode), this._attachments.related.forEach((s) => this._createContentNode(t, s)), t;
  }
  /**
   * Creates a regular node with contents
   *
   * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
   * @param {Object} element Node data
   * @returns {Object} MimeNode node element
   */
  _createContentNode(e, t) {
    t = t || {}, t.content = t.content || "";
    const s = (t.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, ""), i = e ? e.createChild(t.contentType, {
      filename: t.filename,
      textEncoding: this.mail.textEncoding,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new oe(t.contentType, {
      filename: t.filename,
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    return t.headers && i.addHeader(t.headers), t.cid && i.setHeader("Content-Id", "<" + t.cid.replace(/[<>]/g, "") + ">"), t.contentTransferEncoding ? i.setHeader("Content-Transfer-Encoding", t.contentTransferEncoding) : this.mail.encoding && /^text\//i.test(t.contentType) && i.setHeader("Content-Transfer-Encoding", this.mail.encoding), (!/^text\//i.test(t.contentType) || t.contentDisposition) && i.setHeader(
      "Content-Disposition",
      t.contentDisposition || (t.cid && /^image\//i.test(t.contentType) ? "inline" : "attachment")
    ), typeof t.content == "string" && !["utf8", "usascii", "ascii"].includes(s) && (t.content = Buffer.from(t.content, s)), t.raw ? i.setRaw(t.raw) : i.setContent(t.content), i;
  }
  /**
   * Parses data uri and converts it to a Buffer
   *
   * @param {Object} element Content element
   * @return {Object} Parsed element
   */
  _processDataUrl(e) {
    const t = e.path || e.href;
    if (!t || typeof t != "string" || !t.startsWith("data:"))
      return e;
    if (t.length > 52428800) {
      let i = "application/octet-stream";
      const n = t.indexOf(",");
      if (n > 0 && n < 200) {
        const r = t.substring(5, n).split(";");
        r[0] && r[0].includes("/") && (i = r[0].trim());
      }
      return Object.assign(vt({}, e), {
        path: !1,
        href: !1,
        content: Buffer.alloc(0),
        contentType: e.contentType || i
      });
    }
    let s;
    try {
      s = Js(t);
    } catch {
      return e;
    }
    return s && (e.content = s.data, e.contentType = e.contentType || s.contentType, "path" in e && (e.path = !1), "href" in e && (e.href = !1)), e;
  }
};
var Zs = Ys;
const { Transform: en } = O;
let tn = class extends en {
  constructor(e) {
    super(e), this.lastBytes = Buffer.alloc(4), this.headersParsed = !1, this.headerBytes = 0, this.headerChunks = [], this.rawHeaders = !1, this.bodySize = 0;
  }
  /**
   * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
   *
   * @param {Buffer} data Next data chunk from the stream
   */
  updateLastBytes(e) {
    const t = this.lastBytes.length, s = Math.min(e.length, t);
    for (let i = 0, n = t - s; i < n; i++)
      this.lastBytes[i] = this.lastBytes[i + s];
    for (let i = 1; i <= s; i++)
      this.lastBytes[t - i] = e[e.length - i];
  }
  /**
   * Finds and removes message headers from the remaining body. We want to keep
   * headers separated until final delivery to be able to modify these
   *
   * @param {Buffer} data Next chunk of data
   * @return {Boolean} Returns true if headers are already found or false otherwise
   */
  checkHeaders(e) {
    if (this.headersParsed)
      return !0;
    const t = this.lastBytes.length;
    let s = 0;
    for (let i = 0, n = this.lastBytes.length + e.length; i < n; i++) {
      let a;
      if (i < t ? a = this.lastBytes[i] : a = e[i - t], a === 10 && i) {
        const r = i - 1 < t ? this.lastBytes[i - 1] : e[i - 1 - t], p = i > 1 ? i - 2 < t ? this.lastBytes[i - 2] : e[i - 2 - t] : !1;
        if (r === 10) {
          this.headersParsed = !0, s = i - t + 1, this.headerBytes += s;
          break;
        } else if (r === 13 && p === 10) {
          this.headersParsed = !0, s = i - t + 1, this.headerBytes += s;
          break;
        }
      }
    }
    if (this.headersParsed) {
      if (this.headerChunks.push(e.slice(0, s)), this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes), this.headerChunks = null, this.emit("headers", this.parseHeaders()), e.length - 1 > s) {
        const i = e.slice(s);
        this.bodySize += i.length, setImmediate(() => this.push(i));
      }
      return !1;
    }
    return this.headerBytes += e.length, this.headerChunks.push(e), this.updateLastBytes(e), !1;
  }
  _transform(e, t, s) {
    if (!e || !e.length)
      return s();
    typeof e == "string" && (e = Buffer.from(e, t));
    let i;
    try {
      i = this.checkHeaders(e);
    } catch (n) {
      return s(n);
    }
    i && (this.bodySize += e.length, this.push(e)), setImmediate(s);
  }
  _flush(e) {
    if (this.headerChunks) {
      const t = Buffer.concat(this.headerChunks, this.headerBytes);
      this.bodySize += t.length, this.push(t), this.headerChunks = null;
    }
    e();
  }
  parseHeaders() {
    const e = (this.rawHeaders || "").toString().split(/\r?\n/);
    for (let t = e.length - 1; t > 0; t--)
      /^\s/.test(e[t]) && (e[t - 1] += `
` + e[t], e.splice(t, 1));
    return e.filter((t) => t.trim()).map((t) => ({
      key: t.substr(0, t.indexOf(":")).trim().toLowerCase(),
      line: t
    }));
  }
};
var sn = tn;
const { Transform: nn } = O, an = X;
let on = class extends nn {
  constructor(e) {
    super(), e = e || {}, this.chunkBuffer = [], this.chunkBufferLen = 0, this.bodyHash = an.createHash(e.hashAlgo || "sha256"), this.remainder = "", this.byteLength = 0, this.debug = e.debug, this._debugBody = e.debug ? [] : !1;
  }
  updateHash(e) {
    let t, s = "", i = "file";
    for (let a = e.length - 1; a >= 0; a--) {
      const r = e[a];
      if (!(i === "file" && (r === 10 || r === 13))) {
        if (i === "file" && (r === 9 || r === 32))
          i = "line";
        else if (!(i === "line" && (r === 9 || r === 32))) {
          if ((i === "file" || i === "line") && (i = "body", a === e.length - 1))
            break;
        }
      }
      if (a === 0) {
        if (i === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || i === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
          this.remainder += e.toString("binary");
          return;
        } else if (i === "line" || i === "file") {
          s = e.toString("binary"), e = !1;
          break;
        }
      }
      if (i === "body") {
        s = e.slice(a + 1).toString("binary"), e = e.slice(0, a + 1);
        break;
      }
    }
    let n = !!this.remainder;
    if (e && !n) {
      for (let a = 0, r = e.length; a < r; a++)
        if (a && e[a] === 10 && e[a - 1] !== 13) {
          n = !0;
          break;
        } else if (a && e[a] === 13 && e[a - 1] === 32) {
          n = !0;
          break;
        } else if (a && e[a] === 32 && e[a - 1] === 32) {
          n = !0;
          break;
        } else if (e[a] === 9) {
          n = !0;
          break;
        }
    }
    n ? (t = this.remainder + (e ? e.toString("binary") : ""), this.remainder = s, t = t.replace(/\r?\n/g, `
`).replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, `\r
`), e = Buffer.from(t, "binary")) : s && (this.remainder = s), this.debug && this._debugBody.push(e), this.bodyHash.update(e);
  }
  _transform(e, t, s) {
    if (!e || !e.length)
      return s();
    typeof e == "string" && (e = Buffer.from(e, t)), this.updateHash(e), this.byteLength += e.length, this.push(e), s();
  }
  _flush(e) {
    /[\r\n]$/.test(this.remainder) && this.byteLength > 2 && this.bodyHash.update(Buffer.from(`\r
`)), this.byteLength || this.push(Buffer.from(`\r
`)), this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : !1), e();
  }
};
var rn = on, Ze = { exports: {} };
const pn = Xe, cn = Se, ln = X;
Ze.exports = (o, e, t, s) => {
  s = s || {};
  const n = s.headerFieldNames || "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive", a = vi(o, n, s.skipFields), r = dn(s.domainName, s.keySelector, a.fieldNames, e, t);
  a.headers += "dkim-signature:" + wi(r);
  const p = ln.createSign(("rsa-" + e).toUpperCase());
  p.update(a.headers);
  let c;
  try {
    c = p.sign(s.privateKey, "base64");
  } catch {
    return !1;
  }
  return r + c.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, `$&\r
 `).trim();
};
Ze.exports.relaxedHeaders = vi;
function dn(o, e, t, s, i) {
  const n = (r) => (r || "").toString().replace(/[\x00-\x1f\x7f;=]/g, ""), a = [
    "v=1",
    "a=rsa-" + s,
    "c=relaxed/relaxed",
    "d=" + pn.toASCII(n(o)),
    "q=dns/txt",
    "s=" + n(e),
    "bh=" + i,
    "h=" + n(t)
  ].join("; ");
  return cn.foldLines("DKIM-Signature: " + a, 76) + `;\r
 b=`;
}
function vi(o, e, t) {
  const s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  (t || "").toLowerCase().split(":").forEach((p) => {
    i.add(p.trim());
  }), (e || "").toLowerCase().split(":").filter((p) => !i.has(p.trim())).forEach((p) => {
    s.add(p.trim());
  });
  for (let p = o.length - 1; p >= 0; p--) {
    const c = o[p];
    s.has(c.key) && !n.has(c.key) && n.set(c.key, wi(c.line));
  }
  const a = [], r = [];
  return s.forEach((p) => {
    n.has(p) && (r.push(p), a.push(p + ":" + n.get(p)));
  }), {
    headers: a.join(`\r
`) + `\r
`,
    fieldNames: r.join(":")
  };
}
function wi(o) {
  return o.substr(o.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
}
var mn = Ze.exports;
const hn = sn, un = rn, fn = mn, { PassThrough: Me } = O, je = Ge, xn = Xt, gn = X, { copyOwnKeys: wt } = be, vn = "sha256", wn = 2 * 1024 * 1024;
class _n {
  constructor(e, t, s, i) {
    this.options = e || {}, this.keys = t, this.cacheTreshold = Number(this.options.cacheTreshold) || wn, this.hashAlgo = this.options.hashAlgo || vn, this.cacheDir = this.options.cacheDir || !1, this.chunks = [], this.chunklen = 0, this.readPos = 0, this.cachePath = this.cacheDir ? xn.join(this.cacheDir, "message." + Date.now() + "-" + gn.randomBytes(14).toString("hex")) : !1, this.cache = !1, this.headers = !1, this.bodyHash = !1, this.parser = !1, this.relaxedBody = !1, this.input = s, this.output = i, this.output.usingCache = !1, this.hasErrored = !1, this.input.on("error", (n) => {
      this.hasErrored = !0, this.cleanup(), i.emit("error", n);
    });
  }
  cleanup() {
    !this.cache || !this.cachePath || je.unlink(this.cachePath, () => !1);
  }
  createReadCache() {
    this.cache = je.createReadStream(this.cachePath), this.cache.once("error", (e) => {
      this.cleanup(), this.output.emit("error", e);
    }), this.cache.once("close", () => {
      this.cleanup();
    }), this.cache.pipe(this.output);
  }
  sendNextChunk() {
    if (this.hasErrored)
      return;
    if (this.readPos >= this.chunks.length)
      return this.cache ? this.createReadCache() : this.output.end();
    const e = this.chunks[this.readPos++];
    if (this.output.write(e) === !1)
      return this.output.once("drain", () => {
        this.sendNextChunk();
      });
    setImmediate(() => this.sendNextChunk());
  }
  sendSignedOutput() {
    let e = 0;
    const t = () => {
      if (e >= this.keys.length)
        return this.output.write(this.parser.rawHeaders), setImmediate(() => this.sendNextChunk());
      const s = this.keys[e++], i = fn(this.headers, this.hashAlgo, this.bodyHash, {
        domainName: s.domainName,
        keySelector: s.keySelector,
        privateKey: s.privateKey,
        headerFieldNames: this.options.headerFieldNames,
        skipFields: this.options.skipFields
      });
      return i && this.output.write(Buffer.from(i + `\r
`)), setImmediate(t);
    };
    if (this.bodyHash && this.headers)
      return t();
    this.output.write(this.parser.rawHeaders), this.sendNextChunk();
  }
  createWriteCache() {
    this.output.usingCache = !0, this.cache = je.createWriteStream(this.cachePath), this.cache.once("error", (e) => {
      this.cleanup(), this.relaxedBody.unpipe(this.cache), this.relaxedBody.on("readable", () => {
        for (; this.relaxedBody.read() !== null; )
          ;
      }), this.hasErrored = !0, this.output.emit("error", e);
    }), this.cache.once("close", () => {
      this.sendSignedOutput();
    }), this.relaxedBody.removeAllListeners("readable"), this.relaxedBody.pipe(this.cache);
  }
  signStream() {
    this.parser = new hn(), this.relaxedBody = new un({
      hashAlgo: this.hashAlgo
    }), this.parser.on("headers", (e) => {
      this.headers = e;
    }), this.relaxedBody.on("hash", (e) => {
      this.bodyHash = e;
    }), this.relaxedBody.on("readable", () => {
      let e;
      if (!this.cache) {
        for (; (e = this.relaxedBody.read()) !== null; )
          if (this.chunks.push(e), this.chunklen += e.length, this.chunklen >= this.cacheTreshold && this.cachePath)
            return this.createWriteCache();
      }
    }), this.relaxedBody.on("end", () => {
      this.cache || this.sendSignedOutput();
    }), this.parser.pipe(this.relaxedBody), setImmediate(() => this.input.pipe(this.parser));
  }
}
let En = class {
  constructor(e) {
    this.options = e || {}, this.keys = [].concat(
      this.options.keys || {
        domainName: e.domainName,
        keySelector: e.keySelector,
        privateKey: e.privateKey
      }
    );
  }
  sign(e, t) {
    const s = new Me();
    let i = e, n = !1;
    Buffer.isBuffer(e) ? (n = e, i = new Me()) : typeof e == "string" && (n = Buffer.from(e), i = new Me());
    let a = this.options;
    t && Object.keys(t).length && (a = wt({}, t), wt(a, this.options));
    const r = new _n(a, this.keys, i, s);
    return setImmediate(() => {
      r.signStream(), n && setImmediate(() => {
        i.end(n);
      });
    }), s;
  }
};
var bn = En;
const _t = he, Et = Vt, yn = V, Ne = H, Sn = 64 * 1024;
function _i(o, e, t, s, i) {
  if (typeof s == "function" && (i = s, s = {}), s = s || {}, e = Number(e) || 0, !e || /[\r\n]/.test(t)) {
    const d = new Error("Invalid proxy destination");
    return d.code = Ne.EPROXY, setImmediate(() => i(d));
  }
  const n = yn.parse(o), a = {
    host: n.hostname,
    port: Number(n.port) ? Number(n.port) : n.protocol === "https:" ? 443 : 80
  };
  let r;
  n.protocol === "https:" ? (a.rejectUnauthorized = s.rejectUnauthorized !== !1, r = Et.connect.bind(Et)) : r = _t.connect.bind(_t);
  let p, c = !1;
  const l = (d) => {
    if (!c) {
      c = !0;
      try {
        p.destroy();
      } catch {
      }
      i(d);
    }
  }, m = () => {
    const d = new Error("Proxy socket timed out");
    d.code = "ETIMEDOUT", l(d);
  };
  p = r(a, () => {
    if (c)
      return;
    const d = {
      Host: t + ":" + e,
      Connection: "close"
    };
    n.auth && (d["Proxy-Authorization"] = "Basic " + Buffer.from(n.auth).toString("base64")), p.write(
      // HTTP method
      "CONNECT " + t + ":" + e + ` HTTP/1.1\r
` + // HTTP request headers
      Object.keys(d).map((b) => b + ": " + d[b]).join(`\r
`) + // End request
      `\r
\r
`
    );
    let u = "";
    const f = (b) => {
      let A, $;
      if (!c) {
        if (u += b.toString("binary"), A = u.match(/\r\n\r\n/)) {
          if (p.removeListener("data", f), $ = u.substr(A.index + A[0].length), u = u.substr(0, A.index), $ && p.unshift(Buffer.from($, "binary")), c = !0, A = u.match(/^HTTP\/\d+\.\d+ (\d+)/i), !A || (A[1] || "").charAt(0) !== "2") {
            try {
              p.destroy();
            } catch {
            }
            const S = new Error("Invalid response from proxy" + (A && ": " + A[1] || ""));
            return S.code = Ne.EPROXY, i(S);
          }
          return p.removeListener("error", l), p.removeListener("timeout", m), p.setTimeout(0), i(null, p);
        }
        if (u.length > Sn) {
          p.removeListener("data", f);
          const S = new Error("Proxy response headers too large");
          return S.code = Ne.EPROXY, l(S);
        }
      }
    };
    p.on("data", f);
  }), p.setTimeout(_i.timeout || 30 * 1e3), p.on("timeout", m), p.once("error", l);
}
var Tn = _i;
const Q = L, An = Ye, Y = Se, bt = (o, e) => Object.prototype.hasOwnProperty.call(o, e);
let kn = class {
  constructor(e, t) {
    this.mailer = e, this.data = {}, this.message = null, t = t || {};
    const s = e.options || {}, i = e._defaults || {};
    Q.copyOwnKeys(this.data, t), this.data.headers = this.data.headers || {}, Q.copyOwnKeys(this.data, i, (n) => bt(this.data, n)), Q.copyOwnKeys(this.data.headers, i.headers, (n) => bt(this.data.headers, n)), ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey", "maxRecipients"].forEach((n) => {
      n in s && (this.data[n] = s[n]);
    });
  }
  resolveContent(...e) {
    return Q.resolveContent(...e);
  }
  resolveAll(e) {
    const t = [
      [this.data, "html"],
      [this.data, "text"],
      [this.data, "watchHtml"],
      [this.data, "amp"],
      [this.data, "icalEvent"]
    ];
    this.data.alternatives && this.data.alternatives.length && this.data.alternatives.forEach((p, c) => {
      t.push([this.data.alternatives, c]);
    }), this.data.attachments && this.data.attachments.length && this.data.attachments.forEach((p, c) => {
      p.filename || (p.filename = (p.path || p.href || "").split("/").pop().split("?").shift() || "attachment-" + (c + 1), p.filename.indexOf(".") < 0 && (p.filename += "." + Y.detectExtension(p.contentType))), p.contentType || (p.contentType = Y.detectMimeType(p.filename || p.path || p.href || "bin")), t.push([this.data.attachments, c]);
    });
    const s = new An();
    ["from", "to", "cc", "bcc", "sender", "replyTo"].forEach((p) => {
      let c;
      this.message ? c = [].concat(s._parseAddresses(this.message.getHeader(p === "replyTo" ? "reply-to" : p)) || []) : this.data[p] && (c = [].concat(s._parseAddresses(this.data[p]) || [])), c && c.length ? this.data[p] = c : p in this.data && (this.data[p] = null);
    }), ["from", "sender"].forEach((p) => {
      this.data[p] && (this.data[p] = this.data[p].shift());
    });
    let a = 0;
    const r = () => {
      if (a >= t.length)
        return e(null, this.data);
      const p = t[a++];
      if (!p[0] || !p[0][p[1]])
        return r();
      Q.resolveContent(
        ...p,
        { disableFileAccess: this.data.disableFileAccess, disableUrlAccess: this.data.disableUrlAccess },
        (c, l) => {
          if (c)
            return e(c);
          const m = {
            content: l
          };
          p[0][p[1]] && typeof p[0][p[1]] == "object" && !Buffer.isBuffer(p[0][p[1]]) && Q.copyOwnKeys(m, p[0][p[1]], (d) => d in m || ["content", "path", "href", "raw"].includes(d)), p[0][p[1]] = m, r();
        }
      );
    };
    setImmediate(() => r());
  }
  normalize(e) {
    const t = this.message.getEnvelope(), s = this.message.messageId();
    this.resolveAll((i, n) => i ? e(i) : (n.envelope = t, n.messageId = s, ["html", "text", "watchHtml", "amp"].forEach((a) => {
      n[a] && n[a].content && (typeof n[a].content == "string" ? n[a] = n[a].content : Buffer.isBuffer(n[a].content) && (n[a] = n[a].content.toString()));
    }), n.icalEvent && Buffer.isBuffer(n.icalEvent.content) && (n.icalEvent.content = n.icalEvent.content.toString("base64"), n.icalEvent.encoding = "base64"), n.alternatives && n.alternatives.length && n.alternatives.forEach((a) => {
      a && a.content && Buffer.isBuffer(a.content) && (a.content = a.content.toString("base64"), a.encoding = "base64");
    }), n.attachments && n.attachments.length && n.attachments.forEach((a) => {
      a && a.content && Buffer.isBuffer(a.content) && (a.content = a.content.toString("base64"), a.encoding = "base64");
    }), n.normalizedHeaders = {}, Object.keys(n.headers || {}).forEach((a) => {
      if (Q.isProtoKey(a))
        return;
      let r = [].concat(n.headers[a] || []).shift();
      r = r && r.value || r, r && (["references", "in-reply-to", "message-id", "content-id"].includes(a) && (r = this.message._encodeHeaderValue(a, r)), n.normalizedHeaders[a] = r);
    }), n.list && typeof n.list == "object" && this._getListHeaders(n.list).forEach((r) => {
      n.normalizedHeaders[r.key] = r.value.map((p) => p && p.value || p).join(", ");
    }), n.references && (n.normalizedHeaders.references = this.message._encodeHeaderValue("references", n.references)), n.inReplyTo && (n.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", n.inReplyTo)), e(null, n)));
  }
  setMailerHeader() {
    !this.message || !this.data.xMailer || this.message.setHeader("X-Mailer", this.data.xMailer);
  }
  setPriorityHeaders() {
    if (!(!this.message || !this.data.priority))
      switch ((this.data.priority || "").toString().toLowerCase()) {
        case "high":
          this.message.setHeader("X-Priority", "1 (Highest)"), this.message.setHeader("X-MSMail-Priority", "High"), this.message.setHeader("Importance", "High");
          break;
        case "low":
          this.message.setHeader("X-Priority", "5 (Lowest)"), this.message.setHeader("X-MSMail-Priority", "Low"), this.message.setHeader("Importance", "Low");
          break;
      }
  }
  setListHeaders() {
    !this.message || !this.data.list || typeof this.data.list != "object" || this._getListHeaders(this.data.list).forEach((e) => {
      e.value.forEach((t) => {
        this.message.addHeader(e.key, t);
      });
    });
  }
  _getListHeaders(e) {
    return Object.keys(e).map((t) => ({
      key: "list-" + t.toLowerCase().trim(),
      value: [].concat(e[t] || []).map((s) => ({
        prepared: !0,
        foldLines: !0,
        value: [].concat(s || []).map((i) => {
          if (typeof i == "string" && (i = {
            url: i
          }), i && i.url) {
            let n = (i.comment || "").toString().replace(/\r?\n|\r/g, " ");
            const a = !Y.isPlainText(n) || /\x7f/.test(n);
            return t.toLowerCase().trim() === "id" ? (n = a ? Y.encodeWord(n) : Y.quoteString(n), (i.comment ? n + " " : "") + this._formatListUrl(i.url).replace(/^<[^:]+:\/{0,2}/, "<")) : (n = a ? Y.encodeWord(n) : n.replace(/[()\\]/g, "\\$&"), this._formatListUrl(i.url) + (i.comment ? " (" + n + ")" : ""));
          }
          return "";
        }).filter((i) => i).join(", ")
      }))
    }));
  }
  _formatListUrl(e) {
    return e = e.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "").replace(/[\s<]+|[\s>]+/g, ""), /^(https?|mailto|ftp):/.test(e) ? "<" + e + ">" : /^[^@]+@[^@]+$/.test(e) ? "<mailto:" + e + ">" : "<http://" + e + ">";
  }
};
var Cn = kn;
const Ln = ie, yt = L, In = di, On = Zs, St = bn, Mn = Tn, Pe = H, jn = Qt, Nn = V, He = D, Pn = Cn, Hn = he, Un = Gt, Rn = X, zn = 1e5;
class Dn extends Ln {
  constructor(e, t, s) {
    super(), this.options = t || {}, this._defaults = s || {}, this._defaultPlugins = {
      compile: [(...i) => this._convertDataImages(...i)],
      stream: []
    }, this._userPlugins = {
      compile: [],
      stream: []
    }, this.meta = /* @__PURE__ */ new Map(), this.dkim = this.options.dkim ? new St(this.options.dkim) : !1, this.transporter = e, this.transporter.mailer = this, this.logger = yt.getLogger(this.options, {
      component: this.options.component || "mail"
    }), this.logger.debug(
      {
        tnx: "create"
      },
      "Creating transport: %s",
      this.getVersionString()
    ), typeof this.transporter.on == "function" && (this.transporter.on("log", (i) => {
      this.logger.debug(
        {
          tnx: "transport"
        },
        "%s: %s",
        i.type,
        i.message
      );
    }), this.transporter.on("error", (i) => {
      this.logger.error(
        {
          err: i,
          tnx: "transport"
        },
        "Transport Error: %s",
        i.message
      ), this.emit("error", i);
    }), this.transporter.on("idle", (...i) => {
      this.emit("idle", ...i);
    }), this.transporter.on("clear", (...i) => {
      this.emit("clear", ...i);
    })), ["close", "isIdle", "verify"].forEach((i) => {
      this[i] = (...n) => typeof this.transporter[i] == "function" ? (i === "verify" && typeof this.getSocket == "function" && (this.transporter.getSocket = this.getSocket, this.getSocket = !1), this.transporter[i](...n)) : (this.logger.warn(
        {
          tnx: "transport",
          methodName: i
        },
        "Non existing method %s called for transport",
        i
      ), !1);
    }), this.options.proxy && typeof this.options.proxy == "string" && this.setupProxy(this.options.proxy);
  }
  use(e, t) {
    return e = (e || "").toString(), this._userPlugins.hasOwnProperty(e) ? this._userPlugins[e].push(t) : this._userPlugins[e] = [t], this;
  }
  /**
   * Sends an email using the preselected transport object
   *
   * @param {Object} data E-data description
   * @param {Function?} callback Callback to run once the sending succeeded or failed
   */
  sendMail(e, t = null) {
    let s;
    t || (s = new Promise((n, a) => {
      t = yt.callbackPromise(n, a);
    })), typeof this.getSocket == "function" && (this.transporter.getSocket = this.getSocket, this.getSocket = !1);
    const i = new Pn(this, e);
    return this.logger.debug(
      {
        tnx: "transport",
        name: this.transporter.name,
        version: this.transporter.version,
        action: "send"
      },
      "Sending mail using %s/%s",
      this.transporter.name,
      this.transporter.version
    ), this._processPlugins("compile", i, (n) => {
      if (n)
        return this.logger.error(
          {
            err: n,
            tnx: "plugin",
            action: "compile"
          },
          "PluginCompile Error: %s",
          n.message
        ), t(n);
      i.message = new On(i.data).compile(), i.setMailerHeader(), i.setPriorityHeaders(), i.setListHeaders();
      const a = i.data.maxRecipients === void 0 ? zn : i.data.maxRecipients, r = i.message.getEnvelope().to.length;
      if (a && r > a) {
        const p = new Error(
          `Message has ${r} recipients, which is over the ${a} allowed by maxRecipients`
        );
        return p.code = Pe.EMAXRECIPIENTS, this.logger.error(
          {
            err: p,
            tnx: "transport",
            action: "send"
          },
          "Send Error: %s",
          p.message
        ), t(p);
      }
      this._processPlugins("stream", i, (p) => {
        if (p)
          return this.logger.error(
            {
              err: p,
              tnx: "plugin",
              action: "stream"
            },
            "PluginStream Error: %s",
            p.message
          ), t(p);
        (i.data.dkim || this.dkim) && i.message.processFunc((c) => {
          const l = i.data.dkim ? new St(i.data.dkim) : this.dkim;
          return this.logger.debug(
            {
              tnx: "DKIM",
              messageId: i.message.messageId(),
              dkimDomains: l.keys.map((m) => m.keySelector + "." + m.domainName).join(", ")
            },
            "Signing outgoing message with %s keys",
            l.keys.length
          ), l.sign(c, i.data._dkim);
        }), this.transporter.send(i, (...c) => {
          c[0] && this.logger.error(
            {
              err: c[0],
              tnx: "transport",
              action: "send"
            },
            "Send Error: %s",
            c[0].message
          ), t(...c);
        });
      });
    }), s;
  }
  getVersionString() {
    return jn.format(
      "%s (%s; +%s; %s/%s)",
      He.name,
      He.version,
      He.homepage,
      this.transporter.name,
      this.transporter.version
    );
  }
  _processPlugins(e, t, s) {
    if (e = (e || "").toString(), !this._userPlugins.hasOwnProperty(e))
      return s();
    const i = this._userPlugins[e] || [], n = this._defaultPlugins[e] || [];
    if (i.length && this.logger.debug(
      {
        tnx: "transaction",
        pluginCount: i.length,
        step: e
      },
      "Using %s plugins for %s",
      i.length,
      e
    ), i.length + n.length === 0)
      return s();
    let a = 0, r = "default";
    const p = () => {
      let c = r === "default" ? n : i;
      if (a >= c.length)
        if (r === "default" && i.length)
          r = "user", a = 0, c = i;
        else
          return s();
      const l = c[a++];
      l(t, (m) => {
        if (m)
          return s(m);
        p();
      });
    };
    p();
  }
  /**
   * Sets up proxy handler for a Nodemailer object
   *
   * @param {String} proxyUrl Proxy configuration url
   */
  setupProxy(e) {
    const t = Nn.parse(e);
    this.getSocket = (s, i) => {
      const n = t.protocol.replace(/:$/, "").toLowerCase();
      if (this.meta.has("proxy_handler_" + n))
        return this.meta.get("proxy_handler_" + n)(t, s, i);
      switch (n) {
        case "http":
        case "https":
          Mn(t.href, s.port, s.host, this.options.tls || {}, (r, p) => r ? i(r) : i(null, {
            connection: p
          }));
          return;
        case "socks":
        case "socks5":
        case "socks4":
        case "socks4a": {
          if (!this.meta.has("proxy_socks_module")) {
            let p = new Error("Socks module not loaded");
            return p.code = Pe.EPROXY, i(p);
          }
          const r = (p) => {
            const c = !!this.meta.get("proxy_socks_module").SocksClient, l = c ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module"), m = Number(t.protocol.replace(/\D/g, "")) || 5, d = {
              proxy: {
                ipaddress: p,
                port: Number(t.port),
                type: m
              },
              [c ? "destination" : "target"]: {
                host: s.host,
                port: s.port
              },
              command: "connect"
            };
            if (t.auth) {
              const u = decodeURIComponent(t.auth.split(":").shift()), f = decodeURIComponent(t.auth.split(":").pop());
              c ? (d.proxy.userId = u, d.proxy.password = f) : m === 4 ? d.userid = u : d.authentication = {
                username: u,
                password: f
              };
            }
            l.createConnection(d, (u, f) => u ? i(u) : i(null, {
              connection: f.socket || f
            }));
          };
          return Hn.isIP(t.hostname) ? r(t.hostname) : Un.resolve(t.hostname, (p, c) => {
            if (p)
              return i(p);
            r(Array.isArray(c) ? c[0] : c);
          });
        }
      }
      let a = new Error("Unknown proxy configuration");
      a.code = Pe.EPROXY, i(a);
    };
  }
  _convertDataImages(e, t) {
    if (!this.options.attachDataUrls && !e.data.attachDataUrls || !e.data.html)
      return t();
    e.resolveContent(
      e.data,
      "html",
      { disableFileAccess: e.data.disableFileAccess, disableUrlAccess: e.data.disableUrlAccess },
      (s, i) => {
        if (s)
          return t(s);
        let n = 0;
        i = (i || "").toString().replace(
          /(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi,
          (a, r, p, c) => {
            const l = Rn.randomBytes(10).toString("hex") + "@localhost";
            return e.data.attachments || (e.data.attachments = []), Array.isArray(e.data.attachments) || (e.data.attachments = [].concat(e.data.attachments || [])), e.data.attachments.push({
              path: p,
              cid: l,
              filename: "image-" + ++n + "." + In.detectExtension(c)
            }), r + "cid:" + l;
          }
        ), e.data.html = i, t();
      }
    );
  }
  set(e, t) {
    return this.meta.set(e, t);
  }
  get(e) {
    return this.meta.get(e);
  }
}
var Bn = Dn;
const { Transform: qn } = O;
let $n = class extends qn {
  constructor(e) {
    super(e), this.options = e || {}, this.inByteCount = 0, this.outByteCount = 0, this.lastByte = !1;
  }
  /**
   * Escapes dots
   */
  _transform(e, t, s) {
    const i = [];
    let n = 0, a, r, p = 0, c;
    if (!e || !e.length)
      return s();
    for (typeof e == "string" && (e = Buffer.from(e)), this.inByteCount += e.length, a = 0, r = e.length; a < r; a++)
      e[a] === 46 ? (a && e[a - 1] === 10 || !a && (!this.lastByte || this.lastByte === 10)) && (c = e.slice(p, a + 1), i.push(c), i.push(Buffer.from(".")), n += c.length + 1, p = a + 1) : e[a] === 10 && (a && e[a - 1] !== 13 || !a && this.lastByte !== 13) && (a > p ? (c = e.slice(p, a), i.push(c), n += c.length + 2) : n += 2, i.push(Buffer.from(`\r
`)), p = a + 1);
    n ? (p < e.length && (c = e.slice(p), i.push(c), n += c.length), this.outByteCount += n, this.push(Buffer.concat(i, n))) : (this.outByteCount += e.length, this.push(e)), this.lastByte = e[e.length - 1], s();
  }
  /**
   * Finalizes the stream with a dot on a single line
   */
  _flush(e) {
    let t;
    this.lastByte === 10 ? t = Buffer.from(`.\r
`) : this.lastByte === 13 ? t = Buffer.from(`
.\r
`) : t = Buffer.from(`\r
.\r
`), this.outByteCount += t.length, this.push(t), e();
  }
};
var Fn = $n;
const Kn = D, { EventEmitter: Qn } = ie, Tt = he, At = Vt, Gn = Wt, kt = X, Wn = Fn, { PassThrough: Ct } = O, G = L, Xn = 2 * 60 * 1e3, Lt = 10 * 60 * 1e3, Vn = 30 * 1e3, Jn = 30 * 1e3, It = () => {
};
function Ot(o) {
  if (!o)
    return o;
  const e = Buffer.from(o, "binary").toString("utf8");
  return e.includes("�") ? o : e;
}
let Yn = class extends Qn {
  constructor(e) {
    super(e), this.id = kt.randomBytes(8).toString("base64").replace(/\W/g, ""), this.stage = "init", this.options = e || {}, this.secureConnection = !!this.options.secure, this.alreadySecured = !!this.options.secured, this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587), this.host = this.options.host || "localhost", this.servername = this.options.servername ? this.options.servername : Tt.isIP(this.host) ? !1 : this.host, this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || !1, typeof this.options.secure > "u" && this.port === 465 && (this.secureConnection = !0), this.name = (this.options.name || this._getHostname()).toString().replace(/[\r\n]+/g, ""), this.logger = G.getLogger(this.options, {
      component: this.options.component || "smtp-connection",
      sid: this.id
    }), this.customAuth = /* @__PURE__ */ new Map();
    for (const t of Object.keys(this.options.customAuth || {})) {
      const s = (t || "").toString().trim().toUpperCase();
      s && this.customAuth.set(s, this.options.customAuth[t]);
    }
    this.version = Kn.version, this.authenticated = !1, this.destroyed = !1, this.secure = !!this.secureConnection, this._remainder = "", this._responseQueue = [], this.lastServerResponse = !1, this._socket = !1, this._supportedAuth = [], this.allowsAuth = !1, this._envelope = !1, this._supportedExtensions = [], this._maxAllowedSize = 0, this._responseActions = [], this._recipientQueue = [], this._greetingTimeout = !1, this._connectionTimeout = !1, this._destroyed = !1, this._closing = !1, this._currentDataStream = !1, this._onSocketData = (t) => this._onData(t), this._onSocketError = (t) => this._onError(t, "ESOCKET", !1, "CONN"), this._onSocketClose = () => this._onClose(), this._onSocketEnd = () => this._onEnd(), this._onSocketTimeout = () => this._onTimeout(), this._onConnectionSocketError = (t) => this._onConnectionError(t, "ESOCKET"), this._connectionAttemptId = 0;
  }
  /**
   * Creates a connection to a SMTP server and sets up connection
   * listener
   */
  connect(e) {
    if (typeof e == "function") {
      this.once("connect", () => {
        this.logger.debug(
          {
            tnx: "smtp"
          },
          "SMTP handshake finished"
        ), e();
      });
      const s = this._isDestroyedMessage("connect");
      if (s)
        return e(this._formatError(s, "ECONNECTION", !1, "CONN"));
    }
    let t = {
      port: this.port,
      host: this.host,
      allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
      timeout: this.options.dnsTimeout || Jn
    };
    if (this.options.localAddress && (t.localAddress = this.options.localAddress), this.options.connection) {
      this._socket = this.options.connection, this._setupConnectionHandlers(), this.secureConnection && !this.alreadySecured ? setImmediate(
        () => this._upgradeConnection((s) => {
          if (s) {
            this._onError(new Error("Error initiating TLS - " + (s.message || s)), "ETLS", !1, "CONN");
            return;
          }
          this._onConnect();
        })
      ) : setImmediate(() => this._onConnect());
      return;
    } else return this.options.socket ? (this._socket = this.options.socket, this._resolveAndConnect(t, (s) => {
      try {
        this._socket.connect(this.port, this.host, () => {
          if (this._socket.setKeepAlive(!0), this.secureConnection && !this.alreadySecured)
            return this._upgradeConnection((i) => {
              if (i) {
                this._onError(new Error("Error initiating TLS - " + (i.message || i)), "ETLS", !1, "CONN");
                return;
              }
              this._onConnect();
            });
          this._onConnect();
        }), this._setupConnectionHandlers();
      } catch (i) {
        return setImmediate(() => this._onError(i, "ECONNECTION", !1, "CONN"));
      }
    })) : (this.secureConnection && (Object.assign(t, this.options.tls || {}), this.servername && !t.servername && (t.servername = this.servername)), this._resolveAndConnect(t, (s) => {
      this._fallbackAddresses = (s._addresses || []).filter((i) => i !== t.host), this._connectOpts = Object.assign({}, t), this._connectToHost(t, this.secureConnection);
    }));
  }
  /**
   * Resolves the hostname and applies resolved values to opts,
   * then calls the provided callback with the resolved data
   *
   * @param {Object} opts Connection options (modified in place)
   * @param {Function} callback Called with resolved data on success
   */
  _resolveAndConnect(e, t) {
    return G.resolveHostname(e, (s, i) => {
      if (s)
        return setImmediate(() => this._onError(s, "EDNS", !1, "CONN"));
      this.logger.debug(
        {
          tnx: "dns",
          source: e.host,
          resolved: i.host,
          cached: !!i.cached
        },
        "Resolved %s as %s [cache %s]",
        e.host,
        i.host,
        i.cached ? "hit" : "miss"
      );
      for (const n of Object.keys(i))
        n.charAt(0) !== "_" && i[n] && (e[n] = i[n]);
      t(i);
    });
  }
  /**
   * Attempts to connect to the specified host address
   *
   * @param {Object} opts Connection options
   * @param {Boolean} secure Whether to use TLS
   */
  _connectToHost(e, t) {
    if (this._destroyed || this._closing)
      return;
    this._connectionAttemptId++;
    const s = this._connectionAttemptId, i = t ? At.connect : Tt.connect;
    try {
      this._socket = i(e, () => {
        this._connectionAttemptId === s && (this._socket.setKeepAlive(!0), this._onConnect());
      }), this._setupConnectionHandlers();
    } catch (n) {
      return setImmediate(() => this._onError(n, "ECONNECTION", !1, "CONN"));
    }
  }
  /**
   * Sets up connection timeout and error handlers
   */
  _setupConnectionHandlers() {
    this._connectionTimeout = setTimeout(() => {
      this._onConnectionError("Connection timeout", "ETIMEDOUT");
    }, this.options.connectionTimeout || Xn), this._socket.on("error", this._onConnectionSocketError);
  }
  /**
   * Handles connection errors with fallback to alternative addresses
   *
   * @param {Error|String} err Error object or message
   * @param {String} code Error code
   */
  _onConnectionError(e, t) {
    if (clearTimeout(this._connectionTimeout), !(this._fallbackAddresses && this._fallbackAddresses.length && this.stage === "init" && !this._destroyed)) {
      this._onError(e, t, !1, "CONN");
      return;
    }
    const i = this._fallbackAddresses.shift();
    if (this.logger.info(
      {
        tnx: "network",
        failedHost: this._connectOpts.host,
        nextHost: i,
        error: e.message || e
      },
      "Connection to %s failed, trying %s",
      this._connectOpts.host,
      i
    ), this._socket) {
      try {
        this._socket.removeListener("error", this._onConnectionSocketError), this._socket.on("error", It), this._socket.destroy();
      } catch {
      }
      this._socket = null;
    }
    this._connectOpts.host = i, this._connectToHost(this._connectOpts, this.secureConnection);
  }
  /**
   * Sends QUIT
   */
  quit() {
    this._sendCommand("QUIT"), this._responseActions.push(this.close);
  }
  /**
   * Closes the connection to the server
   */
  close() {
    if (clearTimeout(this._connectionTimeout), clearTimeout(this._greetingTimeout), this._responseActions = [], this._closing)
      return;
    this._closing = !0;
    const e = this.stage === "init" ? "destroy" : "end";
    this.logger.debug(
      {
        tnx: "smtp"
      },
      'Closing connection to the server using "%s"',
      e
    );
    const t = this._socket && this._socket.socket || this._socket;
    if (this._currentDataStream) {
      try {
        this._currentDataStream.unpipe(this._socket);
      } catch {
      }
      this._currentDataStream = !1;
    }
    if (t && !t.destroyed)
      try {
        t.setTimeout(0), t.removeListener("data", this._onSocketData), t.removeListener("timeout", this._onSocketTimeout), t.removeListener("close", this._onSocketClose), t.removeListener("end", this._onSocketEnd), t.removeListener("error", this._onSocketError), t.removeListener("error", this._onConnectionSocketError), t.on("error", It), t[e]();
      } catch {
      }
    this._destroy();
  }
  /**
   * Authenticate user
   */
  login(e, t) {
    const s = this._isDestroyedMessage("login");
    if (s)
      return t(this._formatError(s, "ECONNECTION", !1, "API"));
    if (this._auth = e || {}, this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || !1, !this._authMethod && this._auth.oauth2 && !this._auth.credentials ? this._authMethod = "XOAUTH2" : (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) && (this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim()), this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass))
      if (this._auth.user && this._auth.pass || this.customAuth.has(this._authMethod))
        this._auth.credentials = {
          user: this._auth.user,
          pass: this._auth.pass,
          options: this._auth.options
        };
      else
        return t(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", !1, "API"));
    if (this.customAuth.has(this._authMethod)) {
      const i = this.customAuth.get(this._authMethod);
      let n, a = !1;
      const r = () => {
        a || (a = !0, this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          },
          "User %s authenticated",
          JSON.stringify(this._auth.user)
        ), this.authenticated = !0, t(null, !0));
      }, p = (l) => {
        a || (a = !0, t(this._formatError(l, "EAUTH", n, "AUTH " + this._authMethod)));
      }, c = i({
        auth: this._auth,
        method: this._authMethod,
        extensions: [].concat(this._supportedExtensions),
        authMethods: [].concat(this._supportedAuth),
        maxAllowedSize: this._maxAllowedSize || !1,
        sendCommand: (l, m) => {
          let d;
          return m || (d = new Promise((u, f) => {
            m = G.callbackPromise(u, f);
          })), this._responseActions.push((u) => {
            n = u;
            let f = u.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/), b = {
              command: l,
              response: u
            };
            f ? (b.status = Number(f[1]) || 0, f[2] && (b.code = f[2]), b.text = u.substr(f[0].length)) : (b.text = u, b.status = 0), m(null, b);
          }), setImmediate(() => this._sendCommand(l)), d;
        },
        resolve: r,
        reject: p
      });
      c && typeof c.catch == "function" && c.then(r).catch(p);
      return;
    }
    switch (this._authMethod) {
      case "XOAUTH2":
        this._handleXOauth2Token(!1, t);
        return;
      case "LOGIN":
        this._responseActions.push((i) => {
          this._actionAUTH_LOGIN_USER(i, t);
        }), this._sendCommand("AUTH LOGIN");
        return;
      case "PLAIN":
        this._responseActions.push((i) => {
          this._actionAUTHComplete(i, t);
        }), this._sendCommand(
          "AUTH PLAIN " + Buffer.from(
            //this._auth.user+'\u0000'+
            "\0" + // skip authorization identity as it causes problems with some servers
            this._auth.credentials.user + "\0" + this._auth.credentials.pass,
            "utf-8"
          ).toString("base64"),
          // log entry without passwords
          "AUTH PLAIN " + Buffer.from(
            //this._auth.user+'\u0000'+
            "\0" + // skip authorization identity as it causes problems with some servers
            this._auth.credentials.user + "\0/* secret */",
            "utf-8"
          ).toString("base64")
        );
        return;
      case "CRAM-MD5":
        this._responseActions.push((i) => {
          this._actionAUTH_CRAM_MD5(i, t);
        }), this._sendCommand("AUTH CRAM-MD5");
        return;
    }
    return t(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", !1, "API"));
  }
  /**
   * Sends a message
   *
   * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
   * @param {Object} message String, Buffer or a Stream
   * @param {Function} callback Callback to return once sending is completed
   */
  send(e, t, s) {
    if (!t)
      return s(this._formatError("Empty message", "EMESSAGE", !1, "API"));
    const i = this._isDestroyedMessage("send message");
    if (i)
      return s(this._formatError(i, "ECONNECTION", !1, "API"));
    if (this._maxAllowedSize && e.size > this._maxAllowedSize)
      return setImmediate(() => {
        s(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", !1, "MAIL FROM"));
      });
    let n = !1;
    const a = function() {
      n || (n = !0, s(...arguments));
    };
    typeof t.on == "function" && t.on("error", (p) => a(this._formatError(p, "ESTREAM", !1, "API")));
    const r = Date.now();
    this._setEnvelope(e, (p, c) => {
      if (p) {
        const d = new Ct();
        return typeof t.pipe == "function" ? t.pipe(d) : (d.write(t), d.end()), a(p);
      }
      const l = Date.now(), m = this._createSendStream((d, u) => d ? a(d) : (c.envelopeTime = l - r, c.messageTime = Date.now() - l, c.messageSize = m.outByteCount, c.response = u, a(null, c)));
      typeof t.pipe == "function" ? t.pipe(m) : (m.write(t), m.end());
    });
  }
  /**
   * Resets connection state
   *
   * @param {Function} callback Callback to return once connection is reset
   */
  reset(e) {
    const t = this._isDestroyedMessage("reset");
    if (t)
      return e(this._formatError(t, "ECONNECTION", !1, "API"));
    this._sendCommand("RSET"), this._responseActions.push((s) => s.charAt(0) !== "2" ? e(this._formatError("Could not reset session state. response=" + s, "EPROTOCOL", s, "RSET")) : (this._envelope = !1, e(null, !0)));
  }
  /**
   * Connection listener that is run when the connection to
   * the server is opened
   *
   * @event
   */
  _onConnect() {
    if (clearTimeout(this._connectionTimeout), this.logger.info(
      {
        tnx: "network",
        localAddress: this._socket.localAddress,
        localPort: this._socket.localPort,
        remoteAddress: this._socket.remoteAddress,
        remotePort: this._socket.remotePort
      },
      "%s established to %s:%s",
      this.secure ? "Secure connection" : "Connection",
      this._socket.remoteAddress,
      this._socket.remotePort
    ), this._destroyed) {
      this.close();
      return;
    }
    this.stage = "connected", this._socket.removeListener("data", this._onSocketData), this._socket.removeListener("timeout", this._onSocketTimeout), this._socket.removeListener("close", this._onSocketClose), this._socket.removeListener("end", this._onSocketEnd), this._socket.removeListener("error", this._onConnectionSocketError), this._socket.removeListener("error", this._onSocketError), this._socket.on("error", this._onSocketError), this._socket.on("data", this._onSocketData), this._socket.once("close", this._onSocketClose), this._socket.once("end", this._onSocketEnd), this._socket.setTimeout(this.options.socketTimeout || Lt), this._socket.on("timeout", this._onSocketTimeout), this._greetingTimeout = setTimeout(() => {
      this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting && this._onError("Greeting never received", "ETIMEDOUT", !1, "CONN");
    }, this.options.greetingTimeout || Vn), this._responseActions.push(this._actionGreeting), this._socket.resume();
  }
  /**
   * 'data' listener for data coming from the server
   *
   * @event
   * @param {Buffer} chunk Data chunk coming from the server
   */
  _onData(e) {
    if (this._destroyed || !e || !e.length)
      return;
    let t = e.toString("binary"), s = (this._remainder + t).split(/\r?\n/), i;
    this._remainder = s.pop();
    for (let n = 0, a = s.length; n < a; n++) {
      if (this._responseQueue.length && (i = this._responseQueue[this._responseQueue.length - 1], /^\d+-/.test(i.split(`
`).pop()))) {
        this._responseQueue[this._responseQueue.length - 1] += `
` + s[n];
        continue;
      }
      this._responseQueue.push(s[n]);
    }
    this._responseQueue.length && (i = this._responseQueue[this._responseQueue.length - 1], /^\d+-/.test(i.split(`
`).pop())) || this._processResponse();
  }
  /**
   * 'error' listener for the socket
   *
   * @event
   * @param {Error} err Error object
   * @param {String} type Error name
   */
  _onError(e, t, s, i) {
    if (clearTimeout(this._connectionTimeout), clearTimeout(this._greetingTimeout), this._destroyed)
      return;
    e = this._formatError(e, t, s, i), ["ETIMEDOUT", "ESOCKET", "ECONNECTION"].includes(e.code) ? this.logger.warn(s, e.message) : this.logger.error(s, e.message), this.emit("error", e), this.close();
  }
  _formatError(e, t, s, i) {
    let n;
    /Error\]$/i.test(Object.prototype.toString.call(e)) ? n = e : n = new Error(e), t && t !== "Error" && (n.code = t), s && (n.response = s, n.message += ": " + s);
    const a = typeof s == "string" && Number((s.match(/^\d+/) || [])[0]) || !1;
    return a && (n.responseCode = a), i && (n.command = i), n;
  }
  /**
   * 'close' listener for the socket
   *
   * @event
   */
  _onClose() {
    let e = !1;
    if (this._remainder && this._remainder.trim() && (this.lastServerResponse = e = Ot(this._remainder.trim()), (this.options.debug || this.options.transactionLog) && this.logger.debug(
      {
        tnx: "server"
      },
      e
    )), this.logger.info(
      {
        tnx: "network"
      },
      "Connection closed"
    ), this.upgrading && !this._destroyed)
      return this._onError(new Error("Connection closed unexpectedly"), "ETLS", e, "CONN");
    if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed)
      return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", e, "CONN");
    if (/^[45]\d{2}\b/.test(e))
      return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", e, "CONN");
    this._destroy();
  }
  /**
   * 'end' listener for the socket
   *
   * @event
   */
  _onEnd() {
    this._socket && !this._socket.destroyed && this._socket.end();
  }
  /**
   * 'timeout' listener for the socket
   *
   * @event
   */
  _onTimeout() {
    return this._onError(new Error("Timeout"), "ETIMEDOUT", !1, "CONN");
  }
  /**
   * Destroys the client, emits 'end'
   */
  _destroy() {
    this._destroyed || (this._destroyed = !0, this.destroyed = !0, this.emit("end"));
  }
  /**
   * Upgrades the connection to TLS
   *
   * @param {Function} callback Callback function to run when the connection
   *        has been secured
   */
  _upgradeConnection(e) {
    this._remainder = "", this._responseQueue = [], this._socket.removeListener("data", this._onSocketData), this._socket.removeListener("timeout", this._onSocketTimeout);
    const t = this._socket, s = Object.assign(
      {
        socket: this._socket,
        host: this.host
      },
      this.options.tls || {}
    );
    this.servername && !s.servername && (s.servername = this.servername);
    const i = () => {
      t.removeListener("close", this._onSocketClose), t.removeListener("end", this._onSocketEnd), t.removeListener("error", this._onSocketError), t.removeListener("error", this._onConnectionSocketError);
    };
    this.upgrading = !0;
    try {
      this._socket = At.connect(s, () => (this.secure = !0, this.upgrading = !1, this._socket.on("data", this._onSocketData), i(), e(null, !0)));
    } catch (n) {
      return i(), e(n);
    }
    this._socket.on("error", this._onSocketError), this._socket.once("close", this._onSocketClose), this._socket.once("end", this._onSocketEnd), this._socket.setTimeout(this.options.socketTimeout || Lt), this._socket.on("timeout", this._onSocketTimeout), t.resume();
  }
  /**
   * Processes queued responses from the server
   */
  _processResponse() {
    if (!this._responseQueue.length)
      return !1;
    const e = (this._responseQueue.shift() || "").toString();
    if (!e.trim()) {
      setImmediate(() => this._processResponse());
      return;
    }
    let t = this.lastServerResponse = Ot(e);
    if (/^\d+-/.test(t.split(`
`).pop())) {
      this._responseQueue.unshift(e);
      return;
    }
    (this.options.debug || this.options.transactionLog) && this.logger.debug(
      {
        tnx: "server"
      },
      t.replace(/\r?\n$/, "")
    );
    const s = this._responseActions.shift();
    if (typeof s == "function")
      s.call(this, t), setImmediate(() => this._processResponse());
    else
      return this._onError(new Error("Unexpected Response"), "EPROTOCOL", t, "CONN");
  }
  /**
   * Send a command to the server, append \r\n
   *
   * @param {String} str String to be sent to the server
   * @param {String} logStr Optional string to be used for logging instead of the actual string
   */
  _sendCommand(e, t) {
    if (!this._destroyed) {
      if (this._socket.destroyed)
        return this.close();
      (this.options.debug || this.options.transactionLog) && this.logger.debug(
        {
          tnx: "client"
        },
        (t || e || "").toString().replace(/\r?\n$/, "")
      ), this._socket.write(Buffer.from(e + `\r
`, "utf-8"));
    }
  }
  /**
   * Initiates a new message by submitting envelope data, starting with
   * MAIL FROM: command
   *
   * @param {Object} envelope Envelope object in the form of
   *        {from:'...', to:['...']}
   *        or
   *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
   */
  _setEnvelope(e, t) {
    const s = [];
    let i = !1;
    if (this._envelope = e || {}, this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim(), this._envelope.to = [].concat(this._envelope.to || []).map((n) => (n && n.address || n || "").toString().trim()), !this._envelope.to.length)
      return t(this._formatError("No recipients defined", "EENVELOPE", !1, "API"));
    if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from))
      return t(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", !1, "API"));
    /[\x80-\uFFFF]/.test(this._envelope.from) && (i = !0);
    for (let n = 0, a = this._envelope.to.length; n < a; n++) {
      if (!this._envelope.to[n] || /[\r\n<>]/.test(this._envelope.to[n]))
        return t(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[n]), "EENVELOPE", !1, "API"));
      /[\x80-\uFFFF]/.test(this._envelope.to[n]) && (i = !0);
    }
    if (this._envelope.rcptQueue = [].concat(this._envelope.to || []), this._envelope.rejected = [], this._envelope.rejectedErrors = [], this._envelope.accepted = [], this._envelope.dsn)
      try {
        this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
      } catch (n) {
        return t(this._formatError("Invalid DSN " + n.message, "EENVELOPE", !1, "API"));
      }
    if (this._envelope.requireTLSExtensionEnabled) {
      if (!this.secure)
        return t(
          this._formatError("REQUIRETLS can only be used over TLS connections (RFC 8689)", "EREQUIRETLS", !1, "MAIL FROM")
        );
      if (!this._supportedExtensions.includes("REQUIRETLS"))
        return t(
          this._formatError("Server does not support REQUIRETLS extension (RFC 8689)", "EREQUIRETLS", !1, "MAIL FROM")
        );
    }
    if (this._responseActions.push((n) => {
      this._actionMAIL(n, t);
    }), i && this._supportedExtensions.includes("SMTPUTF8") && (s.push("SMTPUTF8"), this._usingSmtpUtf8 = !0), this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME") && (s.push("BODY=8BITMIME"), this._using8BitMime = !0), this._envelope.size && this._supportedExtensions.includes("SIZE")) {
      const n = Number(this._envelope.size) || 0;
      n > 0 && s.push("SIZE=" + n);
    }
    this._envelope.dsn && this._supportedExtensions.includes("DSN") && (this._envelope.dsn.ret && s.push("RET=" + G.encodeXText(this._envelope.dsn.ret)), this._envelope.dsn.envid && s.push("ENVID=" + G.encodeXText(this._envelope.dsn.envid))), this._envelope.requireTLSExtensionEnabled && s.push("REQUIRETLS"), this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (s.length ? " " + s.join(" ") : ""));
  }
  _setDsnEnvelope(e) {
    let t = (e.ret || e.return || "").toString().toUpperCase() || null;
    if (t)
      switch (t) {
        case "HDRS":
        case "HEADERS":
          t = "HDRS";
          break;
        case "FULL":
        case "BODY":
          t = "FULL";
          break;
      }
    if (t && !["FULL", "HDRS"].includes(t))
      throw new Error("ret: " + JSON.stringify(t));
    const s = (e.envid || e.id || "").toString() || null;
    let i = e.notify || null;
    if (i) {
      typeof i == "string" && (i = i.split(",")), i = i.map((p) => p.trim().toUpperCase());
      const a = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
      if (i.filter((p) => !a.includes(p)).length || i.length > 1 && i.includes("NEVER"))
        throw new Error("notify: " + JSON.stringify(i.join(",")));
      i = i.join(",");
    }
    let n = (e.recipient || e.orcpt || "").toString() || null;
    return n && n.indexOf(";") < 0 && (n = "rfc822;" + n), {
      ret: t,
      envid: s,
      notify: i,
      orcpt: n
    };
  }
  _getDsnRcptToArgs() {
    const e = [];
    return this._envelope.dsn && this._supportedExtensions.includes("DSN") && (this._envelope.dsn.notify && e.push("NOTIFY=" + G.encodeXText(this._envelope.dsn.notify)), this._envelope.dsn.orcpt && e.push("ORCPT=" + G.encodeXText(this._envelope.dsn.orcpt))), e.length ? " " + e.join(" ") : "";
  }
  _createSendStream(e) {
    const t = new Wn();
    if (this.options.lmtp ? this._envelope.accepted.forEach((s, i) => {
      const n = i === this._envelope.accepted.length - 1;
      this._responseActions.push((a) => {
        this._actionLMTPStream(s, n, a, e);
      });
    }) : this._responseActions.push((s) => {
      this._actionSMTPStream(s, e);
    }), this._currentDataStream = t, t.pipe(this._socket, {
      end: !1
    }), this.options.debug) {
      const s = new Ct();
      s.on("readable", () => {
        let i;
        for (; i = s.read(); )
          this.logger.debug(
            {
              tnx: "message"
            },
            i.toString("binary").replace(/\r?\n$/, "")
          );
      }), t.pipe(s);
    }
    return t.once("end", () => {
      this._currentDataStream === t && (this._currentDataStream = !1), this.logger.info(
        {
          tnx: "message",
          inByteCount: t.inByteCount,
          outByteCount: t.outByteCount
        },
        "<%s bytes encoded mime message (source size %s bytes)>",
        t.outByteCount,
        t.inByteCount
      );
    }), t;
  }
  /** ACTIONS **/
  /**
   * Will be run after the connection is created and the server sends
   * a greeting. If the incoming message starts with 220 initiate
   * SMTP session by sending EHLO command
   *
   * @param {String} str Message from the server
   */
  _actionGreeting(e) {
    if (clearTimeout(this._greetingTimeout), e.substr(0, 3) !== "220") {
      this._onError(new Error("Invalid greeting. response=" + e), "EPROTOCOL", e, "CONN");
      return;
    }
    this.options.lmtp ? (this._responseActions.push(this._actionLHLO), this._sendCommand("LHLO " + this.name)) : (this._responseActions.push(this._actionEHLO), this._sendCommand("EHLO " + this.name));
  }
  /**
   * Handles server response for LHLO command. If it yielded in
   * error, emit 'error', otherwise treat this as an EHLO response
   *
   * @param {String} str Message from the server
   */
  _actionLHLO(e) {
    if (e.charAt(0) !== "2") {
      this._onError(new Error("Invalid LHLO. response=" + e), "EPROTOCOL", e, "LHLO");
      return;
    }
    this._actionEHLO(e);
  }
  /**
   * Handles server response for EHLO command. If it yielded in
   * error, try HELO instead, otherwise initiate TLS negotiation
   * if STARTTLS is supported by the server or move into the
   * authentication phase.
   *
   * @param {String} str Message from the server
   */
  _actionEHLO(e) {
    let t;
    if (e.substr(0, 3) === "421") {
      this._onError(new Error("Server terminates connection. response=" + e), "ECONNECTION", e, "EHLO");
      return;
    }
    if (e.charAt(0) !== "2") {
      if (this.options.requireTLS) {
        this._onError(
          new Error("EHLO failed but HELO does not support required STARTTLS. response=" + e),
          "ECONNECTION",
          e,
          "EHLO"
        );
        return;
      }
      this._responseActions.push(this._actionHELO), this._sendCommand("HELO " + this.name);
      return;
    }
    if (this._ehloLines = e.split(/\r?\n/).map((s) => s.replace(/^\d+[ -]/, "").trim()).filter((s) => s).slice(1), !this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(e) || this.options.requireTLS)) {
      this._sendCommand("STARTTLS"), this._responseActions.push(this._actionSTARTTLS);
      return;
    }
    /[ -]SMTPUTF8\b/im.test(e) && this._supportedExtensions.push("SMTPUTF8"), /[ -]DSN\b/im.test(e) && this._supportedExtensions.push("DSN"), /[ -]8BITMIME\b/im.test(e) && this._supportedExtensions.push("8BITMIME"), /[ -]REQUIRETLS\b/im.test(e) && this._supportedExtensions.push("REQUIRETLS"), /[ -]PIPELINING\b/im.test(e) && this._supportedExtensions.push("PIPELINING"), /[ -]AUTH\b/i.test(e) && (this.allowsAuth = !0), /[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(e) && this._supportedAuth.push("PLAIN"), /[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(e) && this._supportedAuth.push("LOGIN"), /[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(e) && this._supportedAuth.push("CRAM-MD5"), /[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(e) && this._supportedAuth.push("XOAUTH2"), (t = e.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) && (this._supportedExtensions.push("SIZE"), this._maxAllowedSize = Number(t[1]) || 0), this.emit("connect");
  }
  /**
   * Handles server response for HELO command. If it yielded in
   * error, emit 'error', otherwise move into the authentication phase.
   *
   * @param {String} str Message from the server
   */
  _actionHELO(e) {
    if (e.charAt(0) !== "2") {
      this._onError(new Error("Invalid HELO. response=" + e), "EPROTOCOL", e, "HELO");
      return;
    }
    this.allowsAuth = !0, this.emit("connect");
  }
  /**
   * Handles server response for STARTTLS command. If there's an error
   * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
   * succeedes restart the EHLO
   *
   * @param {String} str Message from the server
   */
  _actionSTARTTLS(e) {
    if (e.charAt(0) !== "2") {
      if (this.options.opportunisticTLS)
        return this.logger.info(
          {
            tnx: "smtp"
          },
          "Failed STARTTLS upgrade, continuing unencrypted"
        ), this.emit("connect");
      this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", e, "STARTTLS");
      return;
    }
    this._upgradeConnection((t, s) => {
      if (t) {
        this._onError(new Error("Error initiating TLS - " + (t.message || t)), "ETLS", !1, "STARTTLS");
        return;
      }
      this.logger.info(
        {
          tnx: "smtp"
        },
        "Connection upgraded with STARTTLS"
      ), s ? this.options.lmtp ? (this._responseActions.push(this._actionLHLO), this._sendCommand("LHLO " + this.name)) : (this._responseActions.push(this._actionEHLO), this._sendCommand("EHLO " + this.name)) : this.emit("connect");
    });
  }
  /**
   * Handle the response for AUTH LOGIN command. We are expecting
   * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
   * response needs to be base64 encoded username. We do not need
   * exact match but settle with 334 response in general as some
   * hosts invalidly use a longer message than VXNlcm5hbWU6
   *
   * @param {String} str Message from the server
   */
  _actionAUTH_LOGIN_USER(e, t) {
    if (!/^334[ -]/.test(e)) {
      t(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", e, "AUTH LOGIN"));
      return;
    }
    this._responseActions.push((s) => {
      this._actionAUTH_LOGIN_PASS(s, t);
    }), this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
  }
  /**
   * Handle the response for AUTH CRAM-MD5 command. We are expecting
   * '334 <challenge string>'. Data to be sent as response needs to be
   * base64 decoded challenge string, MD5 hashed using the password as
   * a HMAC key, prefixed by the username and a space, and finally all
   * base64 encoded again.
   *
   * @param {String} str Message from the server
   */
  _actionAUTH_CRAM_MD5(e, t) {
    const s = e.match(/^334\s+(.+)$/);
    if (!s)
      return t(
        this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", e, "AUTH CRAM-MD5")
      );
    const i = Buffer.from(s[1], "base64").toString("ascii"), n = kt.createHmac("md5", this._auth.credentials.pass);
    n.update(i);
    const a = this._auth.credentials.user + " " + n.digest("hex");
    this._responseActions.push((r) => {
      this._actionAUTH_CRAM_MD5_PASS(r, t);
    }), this._sendCommand(
      Buffer.from(a).toString("base64"),
      // hidden hash for logs
      Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64")
    );
  }
  /**
   * Handles the response to CRAM-MD5 authentication, if there's no error,
   * the user can be considered logged in. Start waiting for a message to send
   *
   * @param {String} str Message from the server
   */
  _actionAUTH_CRAM_MD5_PASS(e, t) {
    if (!e.match(/^235\s+/))
      return t(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", e, "AUTH CRAM-MD5"));
    this.logger.info(
      {
        tnx: "smtp",
        username: this._auth.user,
        action: "authenticated",
        method: this._authMethod
      },
      "User %s authenticated",
      JSON.stringify(this._auth.user)
    ), this.authenticated = !0, t(null, !0);
  }
  /**
   * Handle the response for AUTH LOGIN command. We are expecting
   * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
   * response needs to be base64 encoded password.
   *
   * @param {String} str Message from the server
   */
  _actionAUTH_LOGIN_PASS(e, t) {
    if (!/^334[ -]/.test(e))
      return t(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", e, "AUTH LOGIN"));
    this._responseActions.push((s) => {
      this._actionAUTHComplete(s, t);
    }), this._sendCommand(
      Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"),
      // Hidden pass for logs
      Buffer.from("/* secret */", "utf-8").toString("base64")
    );
  }
  /**
   * Handles the response for authentication, if there's no error,
   * the user can be considered logged in. Start waiting for a message to send
   *
   * @param {String} str Message from the server
   */
  _actionAUTHComplete(e, t, s) {
    if (!s && typeof t == "function" && (s = t, t = !1), e.substr(0, 3) === "334") {
      this._responseActions.push((i) => {
        t || this._authMethod !== "XOAUTH2" ? this._actionAUTHComplete(i, !0, s) : setImmediate(() => this._handleXOauth2Token(!0, s));
      }), this._sendCommand("");
      return;
    }
    if (e.charAt(0) !== "2")
      return this.logger.info(
        {
          tnx: "smtp",
          username: this._auth.user,
          action: "authfail",
          method: this._authMethod
        },
        "User %s failed to authenticate",
        JSON.stringify(this._auth.user)
      ), s(this._formatError("Invalid login", "EAUTH", e, "AUTH " + this._authMethod));
    this.logger.info(
      {
        tnx: "smtp",
        username: this._auth.user,
        action: "authenticated",
        method: this._authMethod
      },
      "User %s authenticated",
      JSON.stringify(this._auth.user)
    ), this.authenticated = !0, s(null, !0);
  }
  /**
   * Handle response for a MAIL FROM: command
   *
   * @param {String} str Message from the server
   */
  _actionMAIL(e, t) {
    if (Number(e.charAt(0)) !== 2) {
      const i = this._usingSmtpUtf8 && /^550 /.test(e) && /[\x80-\uFFFF]/.test(this._envelope.from) ? "Internationalized mailbox name not allowed" : "Mail command failed";
      return t(this._formatError(i, "EENVELOPE", e, "MAIL FROM"));
    }
    if (!this._envelope.rcptQueue.length)
      return t(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", !1, "API"));
    this._recipientQueue = [];
    const s = this._supportedExtensions.includes("PIPELINING");
    do {
      const i = this._envelope.rcptQueue.shift();
      this._recipientQueue.push(i), this._responseActions.push((n) => {
        this._actionRCPT(n, t);
      }), this._sendCommand("RCPT TO:<" + i + ">" + this._getDsnRcptToArgs());
    } while (s && this._envelope.rcptQueue.length);
  }
  /**
   * Handle response for a RCPT TO: command
   *
   * @param {String} str Message from the server
   */
  _actionRCPT(e, t) {
    let s;
    const i = this._recipientQueue.shift();
    if (Number(e.charAt(0)) !== 2) {
      const n = this._usingSmtpUtf8 && /^553 /.test(e) && /[\x80-\uFFFF]/.test(i) ? "Internationalized mailbox name not allowed" : "Recipient command failed";
      this._envelope.rejected.push(i), s = this._formatError(n, "EENVELOPE", e, "RCPT TO"), s.recipient = i, this._envelope.rejectedErrors.push(s);
    } else
      this._envelope.accepted.push(i);
    if (!this._envelope.rcptQueue.length && !this._recipientQueue.length)
      if (this._envelope.rejected.length < this._envelope.to.length)
        this._responseActions.push((n) => {
          this._actionDATA(n, t);
        }), this._sendCommand("DATA");
      else
        return s = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", e, "RCPT TO"), s.rejected = this._envelope.rejected, s.rejectedErrors = this._envelope.rejectedErrors, t(s);
    else if (this._envelope.rcptQueue.length) {
      const n = this._envelope.rcptQueue.shift();
      this._recipientQueue.push(n), this._responseActions.push((a) => {
        this._actionRCPT(a, t);
      }), this._sendCommand("RCPT TO:<" + n + ">" + this._getDsnRcptToArgs());
    }
  }
  /**
   * Handle response for a DATA command
   *
   * @param {String} str Message from the server
   */
  _actionDATA(e, t) {
    if (!/^[23]/.test(e))
      return t(this._formatError("Data command failed", "EENVELOPE", e, "DATA"));
    const s = {
      accepted: this._envelope.accepted,
      rejected: this._envelope.rejected
    };
    this._ehloLines && this._ehloLines.length && (s.ehlo = this._ehloLines), this._envelope.rejectedErrors.length && (s.rejectedErrors = this._envelope.rejectedErrors), t(null, s);
  }
  /**
   * Handle response for a DATA stream when using SMTP
   * We expect a single response that defines if the sending succeeded or failed
   *
   * @param {String} str Message from the server
   */
  _actionSMTPStream(e, t) {
    return Number(e.charAt(0)) !== 2 ? t(this._formatError("Message failed", "EMESSAGE", e, "DATA")) : t(null, e);
  }
  /**
   * Handle response for a DATA stream
   * We expect a separate response for every recipient. All recipients can either
   * succeed or fail separately
   *
   * @param {String} recipient The recipient this response applies to
   * @param {Boolean} final Is this the final recipient?
   * @param {String} str Message from the server
   */
  _actionLMTPStream(e, t, s, i) {
    let n;
    if (Number(s.charAt(0)) !== 2) {
      n = this._formatError("Message failed for recipient " + e, "EMESSAGE", s, "DATA"), n.recipient = e, this._envelope.rejected.push(e), this._envelope.rejectedErrors.push(n);
      for (let a = 0, r = this._envelope.accepted.length; a < r; a++)
        this._envelope.accepted[a] === e && this._envelope.accepted.splice(a, 1);
    }
    if (t)
      return i(null, s);
  }
  _handleXOauth2Token(e, t) {
    this._auth.oauth2.getToken(e, (s, i) => {
      if (s)
        return this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authfail",
            method: this._authMethod
          },
          "User %s failed to authenticate",
          JSON.stringify(this._auth.user)
        ), t(this._formatError(s, "EAUTH", !1, "AUTH XOAUTH2"));
      this._responseActions.push((n) => {
        this._actionAUTHComplete(n, e, t);
      }), this._sendCommand(
        "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(i),
        //  Hidden for logs
        "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */")
      );
    });
  }
  /**
   *
   * @param {string} command
   * @private
   */
  _isDestroyedMessage(e) {
    if (this._destroyed)
      return "Cannot " + e + " - smtp connection is already destroyed.";
    if (this._socket) {
      if (this._socket.destroyed)
        return "Cannot " + e + " - smtp connection socket is already destroyed.";
      if (!this._socket.writable)
        return "Cannot " + e + " - smtp connection socket is already half-closed.";
    }
  }
  _getHostname() {
    let e;
    try {
      e = Gn.hostname() || "";
    } catch {
      e = "localhost";
    }
    return (!e || e.indexOf(".") < 0) && (e = "[127.0.0.1]"), e.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) && (e = "[" + e + "]"), e;
  }
};
var et = Yn;
const { Stream: Zn } = O, ea = ye, ta = X, ia = L, W = H;
let sa = class extends Zn {
  constructor(e, t) {
    if (super(), this.options = e || {}, e && e.serviceClient) {
      if (!e.privateKey || !e.user) {
        const i = new Error('Options "privateKey" and "user" are required for service account!');
        i.code = W.EOAUTH2, setImmediate(() => this.emit("error", i));
        return;
      }
      const s = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
      this.options.serviceRequestTimeout = s || 5 * 60;
    }
    if (this.logger = ia.getLogger(
      {
        logger: t
      },
      {
        component: this.options.component || "OAuth2"
      }
    ), this.provisionCallback = typeof this.options.provisionCallback == "function" ? this.options.provisionCallback : !1, this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token", this.options.customHeaders = this.options.customHeaders || {}, this.options.customParams = this.options.customParams || {}, this.accessToken = this.options.accessToken || !1, this.options.expires && Number(this.options.expires))
      this.expires = this.options.expires;
    else {
      const s = Math.max(Number(this.options.timeout) || 0, 0);
      this.expires = s && Date.now() + s * 1e3 || 0;
    }
    this.renewing = !1, this.renewalQueue = [];
  }
  /**
   * Returns or generates (if previous has expired) a XOAuth2 token
   *
   * @param {Boolean} renew If false then use cached access token (if available)
   * @param {Function} callback Callback function with error object and token string
   */
  getToken(e, t) {
    if (!e && this.accessToken && (!this.expires || this.expires > Date.now()))
      return this.logger.debug(
        {
          tnx: "OAUTH2",
          user: this.options.user,
          action: "reuse"
        },
        "Reusing existing access token for %s",
        this.options.user
      ), t(null, this.accessToken);
    if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
      if (this.accessToken)
        return this.logger.debug(
          {
            tnx: "OAUTH2",
            user: this.options.user,
            action: "reuse"
          },
          "Reusing existing access token (no refresh capability) for %s",
          this.options.user
        ), t(null, this.accessToken);
      this.logger.error(
        {
          tnx: "OAUTH2",
          user: this.options.user,
          action: "renew"
        },
        "Cannot renew access token for %s: No refresh mechanism available",
        this.options.user
      );
      const i = new Error("Can't create new access token for user");
      return i.code = W.EOAUTH2, t(i);
    }
    if (this.renewing)
      return this.renewalQueue.push({ renew: e, callback: t });
    this.renewing = !0;
    const s = (i, n) => {
      this.renewalQueue.forEach((a) => a.callback(i, n)), this.renewalQueue = [], this.renewing = !1, i ? this.logger.error(
        {
          err: i,
          tnx: "OAUTH2",
          user: this.options.user,
          action: "renew"
        },
        "Failed generating new Access Token for %s",
        this.options.user
      ) : this.logger.info(
        {
          tnx: "OAUTH2",
          user: this.options.user,
          action: "renew"
        },
        "Generated new Access Token for %s",
        this.options.user
      ), t(i, n);
    };
    this.provisionCallback ? this.provisionCallback(this.options.user, !!e, (i, n, a) => {
      !i && n && (this.accessToken = n, this.expires = a || 0), s(i, n);
    }) : this.generateToken(s);
  }
  /**
   * Updates token values
   *
   * @param {String} accessToken New access token
   * @param {Number} timeout Access token lifetime in seconds
   *
   * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
   */
  updateToken(e, t) {
    this.accessToken = e, t = Math.max(Number(t) || 0, 0), this.expires = t && Date.now() + t * 1e3 || 0, this.emit("token", {
      user: this.options.user,
      accessToken: e || "",
      expires: this.expires
    });
  }
  /**
   * Generates a new XOAuth2 token with the credentials provided at initialization
   *
   * @param {Function} callback Callback function with error object and token string
   */
  generateToken(e) {
    let t, s;
    if (this.options.serviceClient) {
      const i = Math.floor(Date.now() / 1e3), n = {
        iss: this.options.serviceClient,
        scope: this.options.scope || "https://mail.google.com/",
        sub: this.options.user,
        aud: this.options.accessUrl,
        iat: i,
        exp: i + this.options.serviceRequestTimeout
      };
      let a;
      try {
        a = this.jwtSignRS256(n);
      } catch {
        const p = new Error("Can't generate token. Check your auth options");
        return p.code = W.EOAUTH2, e(p);
      }
      t = {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: a
      }, s = {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: n
      };
    } else {
      if (!this.options.refreshToken) {
        const i = new Error("Can't create new access token for user");
        return i.code = W.EOAUTH2, e(i);
      }
      t = {
        client_id: this.options.clientId || "",
        client_secret: this.options.clientSecret || "",
        refresh_token: this.options.refreshToken,
        grant_type: "refresh_token"
      }, s = {
        client_id: this.options.clientId || "",
        client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
        refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
        grant_type: "refresh_token"
      };
    }
    Object.assign(t, this.options.customParams), Object.assign(s, this.options.customParams), this.logger.debug(
      {
        tnx: "OAUTH2",
        user: this.options.user,
        action: "generate"
      },
      "Requesting token using: %s",
      JSON.stringify(s)
    ), this.postRequest(this.options.accessUrl, t, this.options, (i, n) => {
      let a;
      if (i)
        return e(i);
      try {
        a = JSON.parse(n.toString());
      } catch (c) {
        return e(c);
      }
      if (!a || typeof a != "object") {
        this.logger.debug(
          {
            tnx: "OAUTH2",
            user: this.options.user,
            action: "post"
          },
          "Response: %s",
          (n || "").toString()
        );
        const c = new Error("Invalid authentication response");
        return c.code = W.EOAUTH2, e(c);
      }
      const r = Object.assign({}, a);
      if (r.access_token && (r.access_token = (r.access_token || "").toString().substr(0, 6) + "..."), this.logger.debug(
        {
          tnx: "OAUTH2",
          user: this.options.user,
          action: "post"
        },
        "Response: %s",
        JSON.stringify(r)
      ), a.error) {
        let c = a.error;
        a.error_description && (c += ": " + a.error_description), a.error_uri && (c += " (" + a.error_uri + ")");
        const l = new Error(c);
        return l.code = W.EOAUTH2, e(l);
      }
      if (a.access_token)
        return this.updateToken(a.access_token, a.expires_in), e(null, this.accessToken);
      const p = new Error("No access token");
      return p.code = W.EOAUTH2, e(p);
    });
  }
  /**
   * Converts an access_token and user id into a base64 encoded XOAuth2 token
   *
   * @param {String} [accessToken] Access token string
   * @return {String} Base64 encoded token for IMAP or SMTP login
   */
  buildXOAuth2Token(e) {
    const t = ["user=" + (this.options.user || ""), "auth=Bearer " + (e || this.accessToken), "", ""];
    return Buffer.from(t.join(""), "utf-8").toString("base64");
  }
  /**
   * Custom POST request handler.
   * This is only needed to keep paths short in Windows – usually this module
   * is a dependency of a dependency and if it tries to require something
   * like the request module the paths get way too long to handle for Windows.
   * As we do only a simple POST request we do not actually require complicated
   * logic support (no redirects, no nothing) anyway.
   *
   * @param {String} url Url to POST to
   * @param {String|Buffer} payload Payload to POST
   * @param {Function} callback Callback function with (err, buff)
   */
  postRequest(e, t, s, i) {
    let n = !1;
    const a = [];
    let r = 0;
    const p = {
      method: "post",
      headers: s.customHeaders,
      body: t,
      allowErrorResponse: !0
    };
    /^https:/i.test(e) && (p.tls = Object.assign({ rejectUnauthorized: !0 }, s.tls || {}));
    const c = ea(e, p);
    c.on("readable", () => {
      let l;
      for (; (l = c.read()) !== null; )
        a.push(l), r += l.length;
    }), c.once("error", (l) => {
      if (!n)
        return n = !0, i(l);
    }), c.once("end", () => {
      if (!n)
        return n = !0, i(null, Buffer.concat(a, r));
    });
  }
  /**
   * Encodes a buffer or a string into Base64url format
   *
   * @param {Buffer|String} data The data to convert
   * @return {String} The encoded string
   */
  toBase64URL(e) {
    return typeof e == "string" && (e = Buffer.from(e)), e.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  /**
   * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
   *
   * @param {Object} payload The payload to include in the generated token
   * @return {String} The generated and signed token
   */
  jwtSignRS256(e) {
    e = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(e)].map((s) => this.toBase64URL(s)).join(".");
    const t = ta.createSign("RSA-SHA256").update(e).sign(this.options.privateKey);
    return e + "." + this.toBase64URL(t);
  }
};
var Ei = sa;
const na = et, aa = L.assign, oa = Ei, Mt = H, ra = ie;
let pa = class extends ra {
  constructor(e) {
    if (super(), this.pool = e, this.options = e.options, this.logger = this.pool.logger, this.options.auth)
      switch ((this.options.auth.type || "").toString().toUpperCase()) {
        case "OAUTH2": {
          const t = new oa(this.options.auth, this.logger);
          t.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || t.provisionCallback, this.auth = {
            type: "OAUTH2",
            user: this.options.auth.user,
            oauth2: t,
            method: "XOAUTH2"
          }, t.on("token", (s) => this.pool.mailer.emit("token", s)), t.on("error", (s) => this.emit("error", s));
          break;
        }
        default:
          if (!this.options.auth.user && !this.options.auth.pass)
            break;
          this.auth = {
            type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
            user: this.options.auth.user,
            credentials: {
              user: this.options.auth.user || "",
              pass: this.options.auth.pass,
              options: this.options.auth.options
            },
            method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || !1
          };
      }
    this._connection = !1, this._connected = !1, this.messages = 0, this.available = !0;
  }
  /**
   * Initiates a connection to the SMTP server
   *
   * @param {Function} callback Callback function to run once the connection is established or failed
   */
  connect(e) {
    this.pool.getSocket(this.options, (t, s) => {
      if (t)
        return e(t);
      let i = !1, n = this.options;
      s && s.connection && (this.logger.info(
        {
          tnx: "proxy",
          remoteAddress: s.connection.remoteAddress,
          remotePort: s.connection.remotePort,
          destHost: n.host || "",
          destPort: n.port || "",
          action: "connected"
        },
        "Using proxied socket from %s:%s to %s:%s",
        s.connection.remoteAddress,
        s.connection.remotePort,
        n.host || "",
        n.port || ""
      ), n = Object.assign(aa(!1, n), s)), this.connection = new na(n), this.connection.once("error", (a) => {
        if (this.emit("error", a), !i)
          return i = !0, e(a);
      }), this.connection.once("end", () => {
        if (this.close(), i)
          return;
        i = !0;
        const a = setTimeout(() => {
          if (i)
            return;
          const r = new Error("Unexpected socket close");
          this.connection && this.connection._socket && this.connection._socket.upgrading && (r.code = Mt.ETLS), e(r);
        }, 1e3);
        try {
          a.unref();
        } catch {
        }
      }), this.connection.connect(() => {
        if (!i)
          if (this.auth && (this.connection.allowsAuth || n.forceAuth))
            this.connection.login(this.auth, (a) => {
              if (!i) {
                if (i = !0, a)
                  return this.connection.close(), this.emit("error", a), e(a);
                this._connected = !0, e(null, !0);
              }
            });
          else
            return i = !0, this._connected = !0, e(null, !0);
      });
    });
  }
  /**
   * Sends an e-mail to be sent using the selected settings
   *
   * @param {Object} mail Mail object
   * @param {Function} callback Callback function
   */
  send(e, t) {
    if (!this._connected)
      return this.connect((a) => a ? t(a) : this.send(e, t));
    const s = e.message.getEnvelope(), i = e.message.messageId(), n = [].concat(s.to || []);
    n.length > 3 && n.push("...and " + n.splice(2).length + " more"), this.logger.info(
      {
        tnx: "send",
        messageId: i,
        cid: this.id
      },
      "Sending message %s using #%s to <%s>",
      i,
      this.id,
      n.join(", ")
    ), e.data.dsn && (s.dsn = e.data.dsn), e.data.requireTLSExtensionEnabled && (s.requireTLSExtensionEnabled = e.data.requireTLSExtensionEnabled), this.connection.send(s, e.message.createReadStream(), (a, r) => {
      if (this.messages++, a)
        return this.connection.close(), this.emit("error", a), t(a);
      r.envelope = {
        from: s.from,
        to: s.to
      }, r.messageId = i, setImmediate(() => {
        if (this.messages >= this.options.maxMessages) {
          const p = new Error("Resource exhausted");
          p.code = Mt.EMAXLIMIT, this.connection.close(), this.emit("error", p);
        } else
          this.pool._checkRateLimit(() => {
            this.available = !0, this.emit("available");
          });
      }), t(null, r);
    });
  }
  /**
   * Closes the connection
   */
  close() {
    this._connected = !1, this.auth && this.auth.oauth2 && this.auth.oauth2.removeAllListeners(), this.connection && this.connection.close(), this.emit("close");
  }
};
var ca = pa;
const la = {
  description: "Alibaba Cloud Mail",
  domains: [
    "aliyun.com"
  ],
  host: "smtp.aliyun.com",
  port: 465,
  secure: !0
}, da = {
  description: "Alibaba Cloud Enterprise Mail",
  host: "smtp.qiye.aliyun.com",
  port: 465,
  secure: !0
}, ma = {
  description: "AOL Mail",
  domains: [
    "aol.com"
  ],
  host: "smtp.aol.com",
  port: 587
}, ha = {
  description: "Aruba PEC (Italian email provider)",
  domains: [
    "aruba.it",
    "pec.aruba.it"
  ],
  aliases: [
    "Aruba PEC"
  ],
  host: "smtps.aruba.it",
  port: 465,
  secure: !0,
  authMethod: "LOGIN"
}, ua = {
  description: "Bluewin (Swiss email provider)",
  host: "smtpauths.bluewin.ch",
  domains: [
    "bluewin.ch"
  ],
  port: 465
}, fa = {
  description: "BOL Mail (Brazilian provider)",
  domains: [
    "bol.com.br"
  ],
  host: "smtp.bol.com.br",
  port: 587,
  requireTLS: !0
}, xa = {
  description: "DebugMail (email testing service)",
  host: "debugmail.io",
  port: 25
}, ga = {
  description: "Disroot (privacy-focused provider)",
  domains: [
    "disroot.org"
  ],
  host: "disroot.org",
  port: 587,
  secure: !1,
  authMethod: "LOGIN"
}, va = {
  description: "Dyn Email Delivery",
  aliases: [
    "Dynect"
  ],
  host: "smtp.dynect.net",
  port: 25
}, wa = {
  description: "Elastic Email",
  aliases: [
    "Elastic Email"
  ],
  host: "smtp.elasticemail.com",
  port: 465,
  secure: !0
}, _a = {
  description: "Ethereal Email (email testing service)",
  aliases: [
    "ethereal.email"
  ],
  host: "smtp.ethereal.email",
  port: 587
}, Ea = {
  description: "FastMail",
  domains: [
    "fastmail.fm"
  ],
  host: "smtp.fastmail.com",
  port: 465,
  secure: !0
}, ba = {
  description: "Gandi Mail",
  aliases: [
    "Gandi",
    "Gandi Mail"
  ],
  host: "mail.gandi.net",
  port: 587
}, ya = {
  description: "Gmail",
  aliases: [
    "Google Mail"
  ],
  domains: [
    "gmail.com",
    "googlemail.com"
  ],
  host: "smtp.gmail.com",
  port: 465,
  secure: !0
}, Sa = {
  description: "Gmail Workspace",
  aliases: [
    "Google Workspace Mail"
  ],
  host: "smtp-relay.gmail.com",
  port: 465,
  secure: !0
}, Ta = {
  description: "GMX Mail",
  domains: [
    "gmx.com",
    "gmx.net",
    "gmx.de"
  ],
  host: "mail.gmx.com",
  port: 587
}, Aa = {
  description: "GoDaddy Email (US)",
  host: "smtpout.secureserver.net",
  port: 25
}, ka = {
  description: "GoDaddy Email (Asia)",
  host: "smtp.asia.secureserver.net",
  port: 25
}, Ca = {
  description: "GoDaddy Email (Europe)",
  host: "smtp.europe.secureserver.net",
  port: 25
}, La = {
  description: "Outlook.com / Hotmail",
  aliases: [
    "Outlook",
    "Outlook.com",
    "Hotmail.com"
  ],
  domains: [
    "hotmail.com",
    "outlook.com"
  ],
  host: "smtp-mail.outlook.com",
  port: 587
}, Ia = {
  description: "iCloud Mail",
  aliases: [
    "Me",
    "Mac"
  ],
  domains: [
    "me.com",
    "mac.com"
  ],
  host: "smtp.mail.me.com",
  port: 587
}, Oa = {
  description: "Infomaniak Mail (Swiss hosting provider)",
  host: "mail.infomaniak.com",
  domains: [
    "ik.me",
    "ikmail.com",
    "etik.com"
  ],
  port: 587
}, Ma = {
  description: "KolabNow (secure email service)",
  domains: [
    "kolabnow.com"
  ],
  aliases: [
    "Kolab"
  ],
  host: "smtp.kolabnow.com",
  port: 465,
  secure: !0,
  authMethod: "LOGIN"
}, ja = {
  description: "Loopia (Swedish hosting provider)",
  host: "mailcluster.loopia.se",
  port: 465
}, Na = {
  description: "Loops",
  host: "smtp.loops.so",
  port: 587
}, Pa = {
  description: "MailDev (local email testing)",
  port: 1025,
  ignoreTLS: !0
}, Ha = {
  description: "MailerSend",
  host: "smtp.mailersend.net",
  port: 587
}, Ua = {
  description: "Mailgun",
  host: "smtp.mailgun.org",
  port: 465,
  secure: !0
}, Ra = {
  description: "Mailjet",
  host: "in.mailjet.com",
  port: 587
}, za = {
  description: "Mailosaur (email testing service)",
  host: "mailosaur.io",
  port: 25
}, Da = {
  description: "Mailtrap",
  host: "live.smtp.mailtrap.io",
  port: 587
}, Ba = {
  description: "Mandrill (by Mailchimp)",
  host: "smtp.mandrillapp.com",
  port: 587
}, qa = {
  description: "Naver Mail (Korean email provider)",
  host: "smtp.naver.com",
  port: 587
}, $a = {
  description: "OhMySMTP (email delivery service)",
  host: "smtp.ohmysmtp.com",
  port: 587,
  secure: !1
}, Fa = {
  description: "One.com Email",
  host: "send.one.com",
  port: 465,
  secure: !0
}, Ka = {
  description: "OpenMailBox",
  aliases: [
    "OMB",
    "openmailbox.org"
  ],
  host: "smtp.openmailbox.org",
  port: 465,
  secure: !0
}, Qa = {
  description: "Microsoft 365 / Office 365",
  host: "smtp.office365.com",
  port: 587,
  secure: !1
}, Ga = {
  description: "Postmark",
  aliases: [
    "PostmarkApp"
  ],
  host: "smtp.postmarkapp.com",
  port: 2525
}, Wa = {
  description: "Proton Mail",
  aliases: [
    "ProtonMail",
    "Proton.me",
    "Protonmail.com",
    "Protonmail.ch"
  ],
  domains: [
    "proton.me",
    "protonmail.com",
    "pm.me",
    "protonmail.ch"
  ],
  host: "smtp.protonmail.ch",
  port: 587,
  requireTLS: !0
}, Xa = {
  description: "QQ Mail",
  domains: [
    "qq.com"
  ],
  host: "smtp.qq.com",
  port: 465,
  secure: !0
}, Va = {
  description: "QQ Enterprise Mail",
  aliases: [
    "QQ Enterprise"
  ],
  domains: [
    "exmail.qq.com"
  ],
  host: "smtp.exmail.qq.com",
  port: 465,
  secure: !0
}, Ja = {
  description: "Resend",
  host: "smtp.resend.com",
  port: 465,
  secure: !0
}, Ya = {
  description: "Runbox (Norwegian email provider)",
  domains: [
    "runbox.com"
  ],
  host: "smtp.runbox.com",
  port: 465,
  secure: !0
}, Za = {
  description: "SendCloud (Chinese email delivery)",
  host: "smtp.sendcloud.net",
  port: 2525
}, eo = {
  description: "SendGrid",
  host: "smtp.sendgrid.net",
  port: 587
}, to = {
  description: "Brevo (formerly Sendinblue)",
  aliases: [
    "Brevo"
  ],
  host: "smtp-relay.brevo.com",
  port: 587
}, io = {
  description: "SendPulse",
  host: "smtp-pulse.com",
  port: 465,
  secure: !0
}, so = {
  description: "AWS SES US East (N. Virginia)",
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  secure: !0
}, no = {
  description: "Seznam Email (Czech email provider)",
  aliases: [
    "Seznam Email"
  ],
  domains: [
    "seznam.cz",
    "email.cz",
    "post.cz",
    "spoluzaci.cz"
  ],
  host: "smtp.seznam.cz",
  port: 465,
  secure: !0
}, ao = {
  description: "SMTP2GO",
  host: "mail.smtp2go.com",
  port: 2525
}, oo = {
  description: "SparkPost",
  aliases: [
    "SparkPost",
    "SparkPost Mail"
  ],
  domains: [
    "sparkpost.com"
  ],
  host: "smtp.sparkpostmail.com",
  port: 587,
  secure: !1
}, ro = {
  description: "Tipimail (email delivery service)",
  host: "smtp.tipimail.com",
  port: 587
}, po = {
  description: "TurboSMTP",
  host: "pro.turbo-smtp.com",
  port: 465,
  secure: !0
}, co = {
  description: "Tutanota (Tuta Mail)",
  domains: [
    "tutanota.com",
    "tuta.com",
    "tutanota.de",
    "tuta.io"
  ],
  host: "smtp.tutanota.com",
  port: 465,
  secure: !0
}, lo = {
  description: "Yahoo Mail",
  domains: [
    "yahoo.com"
  ],
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: !0
}, mo = {
  description: "Yandex Mail",
  domains: [
    "yandex.ru"
  ],
  host: "smtp.yandex.ru",
  port: 465,
  secure: !0
}, ho = {
  description: "Zimbra Mail Server",
  aliases: [
    "Zimbra Collaboration"
  ],
  host: "smtp.zimbra.com",
  port: 587,
  requireTLS: !0
}, uo = {
  description: "Zoho Mail",
  host: "smtp.zoho.com",
  port: 465,
  secure: !0,
  authMethod: "LOGIN"
}, fo = {
  126: {
    description: "126 Mail (NetEase)",
    host: "smtp.126.com",
    port: 465,
    secure: !0
  },
  163: {
    description: "163 Mail (NetEase)",
    host: "smtp.163.com",
    port: 465,
    secure: !0
  },
  "1und1": {
    description: "1&1 Mail (German hosting provider)",
    host: "smtp.1und1.de",
    port: 465,
    secure: !0,
    authMethod: "LOGIN"
  },
  Aliyun: la,
  AliyunQiye: da,
  AOL: ma,
  Aruba: ha,
  Bluewin: ua,
  BOL: fa,
  DebugMail: xa,
  Disroot: ga,
  DynectEmail: va,
  ElasticEmail: wa,
  Ethereal: _a,
  FastMail: Ea,
  "Feishu Mail": {
    description: "Feishu Mail (Lark)",
    aliases: [
      "Feishu",
      "FeishuMail"
    ],
    domains: [
      "www.feishu.cn"
    ],
    host: "smtp.feishu.cn",
    port: 465,
    secure: !0
  },
  "Forward Email": {
    description: "Forward Email (email forwarding service)",
    aliases: [
      "FE",
      "ForwardEmail"
    ],
    domains: [
      "forwardemail.net"
    ],
    host: "smtp.forwardemail.net",
    port: 465,
    secure: !0
  },
  GandiMail: ba,
  Gmail: ya,
  GmailWorkspace: Sa,
  GMX: Ta,
  Godaddy: Aa,
  GodaddyAsia: ka,
  GodaddyEurope: Ca,
  "hot.ee": {
    description: "Hot.ee (Estonian email provider)",
    host: "mail.hot.ee"
  },
  Hotmail: La,
  iCloud: Ia,
  Infomaniak: Oa,
  KolabNow: Ma,
  Loopia: ja,
  Loops: Na,
  "mail.ee": {
    description: "Mail.ee (Estonian email provider)",
    host: "smtp.mail.ee"
  },
  "Mail.ru": {
    description: "Mail.ru",
    host: "smtp.mail.ru",
    port: 465,
    secure: !0
  },
  "Mailcatch.app": {
    description: "Mailcatch (email testing service)",
    host: "sandbox-smtp.mailcatch.app",
    port: 2525
  },
  Maildev: Pa,
  MailerSend: Ha,
  Mailgun: Ua,
  Mailjet: Ra,
  Mailosaur: za,
  Mailtrap: Da,
  Mandrill: Ba,
  Naver: qa,
  OhMySMTP: $a,
  One: Fa,
  OpenMailBox: Ka,
  Outlook365: Qa,
  Postmark: Ga,
  Proton: Wa,
  "qiye.aliyun": {
    description: "Alibaba Mail Enterprise Edition",
    host: "smtp.mxhichina.com",
    port: "465",
    secure: !0
  },
  QQ: Xa,
  QQex: Va,
  Resend: Ja,
  Runbox: Ya,
  SendCloud: Za,
  SendGrid: eo,
  SendinBlue: to,
  SendPulse: io,
  SES: so,
  "SES-AP-NORTHEAST-1": {
    description: "AWS SES Asia Pacific (Tokyo)",
    host: "email-smtp.ap-northeast-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-AP-NORTHEAST-2": {
    description: "AWS SES Asia Pacific (Seoul)",
    host: "email-smtp.ap-northeast-2.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-AP-NORTHEAST-3": {
    description: "AWS SES Asia Pacific (Osaka)",
    host: "email-smtp.ap-northeast-3.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-AP-SOUTH-1": {
    description: "AWS SES Asia Pacific (Mumbai)",
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-AP-SOUTHEAST-1": {
    description: "AWS SES Asia Pacific (Singapore)",
    host: "email-smtp.ap-southeast-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-AP-SOUTHEAST-2": {
    description: "AWS SES Asia Pacific (Sydney)",
    host: "email-smtp.ap-southeast-2.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-CA-CENTRAL-1": {
    description: "AWS SES Canada (Central)",
    host: "email-smtp.ca-central-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-EU-CENTRAL-1": {
    description: "AWS SES Europe (Frankfurt)",
    host: "email-smtp.eu-central-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-EU-NORTH-1": {
    description: "AWS SES Europe (Stockholm)",
    host: "email-smtp.eu-north-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-EU-WEST-1": {
    description: "AWS SES Europe (Ireland)",
    host: "email-smtp.eu-west-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-EU-WEST-2": {
    description: "AWS SES Europe (London)",
    host: "email-smtp.eu-west-2.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-EU-WEST-3": {
    description: "AWS SES Europe (Paris)",
    host: "email-smtp.eu-west-3.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-SA-EAST-1": {
    description: "AWS SES South America (São Paulo)",
    host: "email-smtp.sa-east-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-EAST-1": {
    description: "AWS SES US East (N. Virginia)",
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-EAST-2": {
    description: "AWS SES US East (Ohio)",
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-GOV-EAST-1": {
    description: "AWS SES GovCloud (US-East)",
    host: "email-smtp.us-gov-east-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-GOV-WEST-1": {
    description: "AWS SES GovCloud (US-West)",
    host: "email-smtp.us-gov-west-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-WEST-1": {
    description: "AWS SES US West (N. California)",
    host: "email-smtp.us-west-1.amazonaws.com",
    port: 465,
    secure: !0
  },
  "SES-US-WEST-2": {
    description: "AWS SES US West (Oregon)",
    host: "email-smtp.us-west-2.amazonaws.com",
    port: 465,
    secure: !0
  },
  Seznam: no,
  SMTP2GO: ao,
  Sparkpost: oo,
  Tipimail: ro,
  TurboSMTP: po,
  "TurboSMTP-EU": {
    description: "TurboSMTP (EU region)",
    host: "pro.eu.turbo-smtp.com",
    port: 465,
    secure: !0
  },
  Tutanota: co,
  Yahoo: lo,
  Yandex: mo,
  Zimbra: ho,
  Zoho: uo
}, jt = fo, ve = {};
Object.keys(jt).forEach((o) => {
  const e = jt[o], t = xo(e);
  ve[we(o)] = t, [].concat(e.aliases || []).forEach((s) => {
    ve[we(s)] = t;
  }), [].concat(e.domains || []).forEach((s) => {
    ve[we(s)] = t;
  });
});
function we(o) {
  return o.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
}
function xo(o) {
  const e = {};
  return Object.keys(o).forEach((t) => {
    ["domains", "aliases"].includes(t) || (e[t] = o[t]);
  }), e;
}
var bi = function(o) {
  return o = we(o.split("@").pop()), ve[o] || !1;
};
const go = ie, Nt = ca, vo = et, wo = bi, re = L, Pt = H, Ht = D;
let _o = class extends go {
  constructor(e) {
    super(), e = e || {}, typeof e == "string" && (e = {
      url: e
    });
    let t, s = e.service;
    typeof e.getSocket == "function" && (this.getSocket = e.getSocket), e.url && (t = re.parseConnectionUrl(e.url), s = s || t.service), this.options = re.assign(
      !1,
      // create new object
      e,
      // regular options
      t,
      // url options
      s && wo(s)
      // wellknown options
    ), this.options.maxConnections = this.options.maxConnections || 5, this.options.maxMessages = this.options.maxMessages || 100, this.logger = re.getLogger(this.options, {
      component: this.options.component || "smtp-pool"
    }), this.name = "SMTP (pool)", this.version = Ht.version + "[client:" + Ht.version + "]", this._rateLimit = {
      counter: 0,
      timeout: null,
      waiting: [],
      checkpoint: !1,
      delta: Number(this.options.rateDelta) || 1e3,
      limit: Number(this.options.rateLimit) || 0
    }, this._closed = !1, this._queue = [], this._connections = [], this._connectionCounter = 0, this.idling = !0, setImmediate(() => {
      this.idling && this.emit("idle");
    });
  }
  /**
   * Placeholder function for creating proxy sockets. This method immediatelly returns
   * without a socket
   *
   * @param {Object} options Connection options
   * @param {Function} callback Callback function to run with the socket keys
   */
  getSocket(e, t) {
    return setImmediate(() => t(null, !1));
  }
  /**
   * Queues an e-mail to be sent using the selected settings
   *
   * @param {Object} mail Mail object
   * @param {Function} callback Callback function
   */
  send(e, t) {
    return this._closed ? !1 : (this._queue.push({
      mail: e,
      requeueAttempts: 0,
      callback: t
    }), this.idling && this._queue.length >= this.options.maxConnections && (this.idling = !1), setImmediate(() => this._processMessages()), !0);
  }
  /**
   * Closes all connections in the pool. If there is a message being sent, the connection
   * is closed later
   */
  close() {
    let e;
    const t = this._connections.length;
    if (this._closed = !0, clearTimeout(this._rateLimit.timeout), !t && !this._queue.length)
      return;
    for (let i = t - 1; i >= 0; i--)
      this._connections[i] && this._connections[i].available && (e = this._connections[i], e.close(), this.logger.info(
        {
          tnx: "connection",
          cid: e.id,
          action: "removed"
        },
        "Connection #%s removed",
        e.id
      ));
    if (t && !this._connections.length && this.logger.debug(
      {
        tnx: "connection"
      },
      "All connections removed"
    ), !this._queue.length)
      return;
    const s = () => {
      if (!this._queue.length) {
        this.logger.debug(
          {
            tnx: "connection"
          },
          "Pending queue entries cleared"
        );
        return;
      }
      const i = this._queue.shift();
      if (i && typeof i.callback == "function")
        try {
          i.callback(new Error("Connection pool was closed"));
        } catch (n) {
          this.logger.error(
            {
              err: n,
              tnx: "callback",
              cid: e.id
            },
            "Callback error for #%s: %s",
            e.id,
            n.message
          );
        }
      setImmediate(s);
    };
    setImmediate(s);
  }
  /**
   * Check the queue and available connections. If there is a message to be sent and there is
   * an available connection, then use this connection to send the mail
   */
  _processMessages() {
    if (this._closed)
      return;
    if (!this._queue.length) {
      this.idling || (this.idling = !0, this.emit("idle"));
      return;
    }
    let e = this._connections.find((s) => s.available);
    if (!e && this._connections.length < this.options.maxConnections && (e = this._createConnection()), !e) {
      this.idling = !1;
      return;
    }
    !this.idling && this._queue.length < this.options.maxConnections && (this.idling = !0, this.emit("idle"));
    const t = e.queueEntry = this._queue.shift();
    t.messageId = (e.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, ""), e.available = !1, this.logger.debug(
      {
        tnx: "pool",
        cid: e.id,
        messageId: t.messageId,
        action: "assign"
      },
      "Assigned message <%s> to #%s (%s)",
      t.messageId,
      e.id,
      e.messages + 1
    ), this._rateLimit.limit && (this._rateLimit.counter++, this._rateLimit.checkpoint || (this._rateLimit.checkpoint = Date.now())), e.send(t.mail, (s, i) => {
      if (t === e.queueEntry) {
        try {
          t.callback(s, i);
        } catch (n) {
          this.logger.error(
            {
              err: n,
              tnx: "callback",
              cid: e.id
            },
            "Callback error for #%s: %s",
            e.id,
            n.message
          );
        }
        e.queueEntry = !1;
      }
    });
  }
  /**
   * Creates a new pool resource
   */
  _createConnection() {
    const e = new Nt(this);
    return e.id = ++this._connectionCounter, this.logger.info(
      {
        tnx: "pool",
        cid: e.id,
        action: "conection"
      },
      "Created new pool resource #%s",
      e.id
    ), e.on("available", () => {
      this.logger.debug(
        {
          tnx: "connection",
          cid: e.id,
          action: "available"
        },
        "Connection #%s became available",
        e.id
      ), this._closed ? this.close() : this._processMessages();
    }), e.once("error", (t) => {
      if (t.code !== Pt.EMAXLIMIT ? this.logger.warn(
        {
          err: t,
          tnx: "pool",
          cid: e.id
        },
        "Pool Error for #%s: %s",
        e.id,
        t.message
      ) : this.logger.debug(
        {
          tnx: "pool",
          cid: e.id,
          action: "maxlimit"
        },
        "Max messages limit exchausted for #%s",
        e.id
      ), e.queueEntry) {
        try {
          e.queueEntry.callback(t);
        } catch (s) {
          this.logger.error(
            {
              err: s,
              tnx: "callback",
              cid: e.id
            },
            "Callback error for #%s: %s",
            e.id,
            s.message
          );
        }
        e.queueEntry = !1;
      }
      this._removeConnection(e), this._continueProcessing();
    }), e.once("close", () => {
      this.logger.info(
        {
          tnx: "connection",
          cid: e.id,
          action: "closed"
        },
        "Connection #%s was closed",
        e.id
      ), this._removeConnection(e), e.queueEntry ? setTimeout(() => {
        e.queueEntry && (this._shouldRequeuOnConnectionClose(e.queueEntry) ? this._requeueEntryOnConnectionClose(e) : this._failDeliveryOnConnectionClose(e)), this._continueProcessing();
      }, 50) : (!this._closed && this.idling && !this._connections.length && this.emit("clear"), this._continueProcessing());
    }), this._connections.push(e), e;
  }
  _shouldRequeuOnConnectionClose(e) {
    return this.options.maxRequeues === void 0 || this.options.maxRequeues < 0 ? !0 : e.requeueAttempts < this.options.maxRequeues;
  }
  _failDeliveryOnConnectionClose(e) {
    if (e.queueEntry && e.queueEntry.callback) {
      try {
        e.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
      } catch (t) {
        this.logger.error(
          {
            err: t,
            tnx: "callback",
            messageId: e.queueEntry.messageId,
            cid: e.id
          },
          "Callback error for #%s: %s",
          e.id,
          t.message
        );
      }
      e.queueEntry = !1;
    }
  }
  _requeueEntryOnConnectionClose(e) {
    e.queueEntry.requeueAttempts += 1, this.logger.debug(
      {
        tnx: "pool",
        cid: e.id,
        messageId: e.queueEntry.messageId,
        action: "requeue"
      },
      "Re-queued message <%s> for #%s. Attempt: #%s",
      e.queueEntry.messageId,
      e.id,
      e.queueEntry.requeueAttempts
    ), this._queue.unshift(e.queueEntry), e.queueEntry = !1;
  }
  /**
   * Continue to process message if the pool hasn't closed
   */
  _continueProcessing() {
    this._closed ? this.close() : setTimeout(() => this._processMessages(), 100);
  }
  /**
   * Remove resource from pool
   *
   * @param {Object} connection The PoolResource to remove
   */
  _removeConnection(e) {
    const t = this._connections.indexOf(e);
    t !== -1 && this._connections.splice(t, 1);
  }
  /**
   * Checks if connections have hit current rate limit and if so, queues the availability callback
   *
   * @param {Function} callback Callback function to run once rate limiter has been cleared
   */
  _checkRateLimit(e) {
    if (!this._rateLimit.limit)
      return e();
    const t = Date.now();
    if (this._rateLimit.counter < this._rateLimit.limit)
      return e();
    if (this._rateLimit.waiting.push(e), this._rateLimit.checkpoint <= t - this._rateLimit.delta)
      return this._clearRateLimit();
    this._rateLimit.timeout || (this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (t - this._rateLimit.checkpoint)), this._rateLimit.checkpoint = t);
  }
  /**
   * Clears current rate limit limitation and runs paused callback
   */
  _clearRateLimit() {
    for (clearTimeout(this._rateLimit.timeout), this._rateLimit.timeout = null, this._rateLimit.counter = 0, this._rateLimit.checkpoint = !1; this._rateLimit.waiting.length; ) {
      const e = this._rateLimit.waiting.shift();
      setImmediate(e);
    }
  }
  /**
   * Returns true if there are free slots in the queue
   */
  isIdle() {
    return this.idling;
  }
  /**
   * Verifies SMTP configuration
   *
   * @param {Function} callback Callback function
   */
  verify(e) {
    let t;
    e || (t = new Promise((i, n) => {
      e = re.callbackPromise(i, n);
    }));
    const s = new Nt(this).auth;
    return this.getSocket(this.options, (i, n) => {
      if (i)
        return e(i);
      let a = this.options;
      n && n.connection && (this.logger.info(
        {
          tnx: "proxy",
          remoteAddress: n.connection.remoteAddress,
          remotePort: n.connection.remotePort,
          destHost: a.host || "",
          destPort: a.port || "",
          action: "connected"
        },
        "Using proxied socket from %s:%s to %s:%s",
        n.connection.remoteAddress,
        n.connection.remotePort,
        a.host || "",
        a.port || ""
      ), a = Object.assign(re.assign(!1, a), n));
      const r = new vo(a);
      let p = !1;
      r.once("error", (l) => {
        if (!p)
          return p = !0, r.close(), e(l);
      }), r.once("end", () => {
        if (!p)
          return p = !0, e(new Error("Connection closed"));
      });
      const c = () => {
        if (!p)
          return p = !0, r.quit(), e(null, !0);
      };
      r.connect(() => {
        if (!p)
          if (s && (r.allowsAuth || a.forceAuth))
            r.login(s, (l) => {
              if (!p) {
                if (l)
                  return p = !0, r.close(), e(l);
                c();
              }
            });
          else if (!s && r.allowsAuth && a.forceAuth) {
            const l = new Error("Authentication info was not provided");
            return l.code = Pt.ENOAUTH, p = !0, r.close(), e(l);
          } else
            c();
      });
    }), t;
  }
};
var Eo = _o;
const bo = ie, Ut = et, yo = bi, Z = L, So = Ei, Rt = H, zt = D;
let To = class extends bo {
  constructor(e) {
    super(), e = e || {}, typeof e == "string" && (e = {
      url: e
    });
    let t, s = e.service;
    typeof e.getSocket == "function" && (this.getSocket = e.getSocket), e.url && (t = Z.parseConnectionUrl(e.url), s = s || t.service), this.options = Z.assign(
      !1,
      // create new object
      e,
      // regular options
      t,
      // url options
      s && yo(s)
      // wellknown options
    ), this.logger = Z.getLogger(this.options, {
      component: this.options.component || "smtp-transport"
    }), this.name = "SMTP", this.version = zt.version + "[client:" + zt.version + "]", this.options.auth && (this.auth = this.getAuth({}));
  }
  /**
   * Placeholder function for creating proxy sockets. This method immediatelly returns
   * without a socket
   *
   * @param {Object} options Connection options
   * @param {Function} callback Callback function to run with the socket keys
   */
  getSocket(e, t) {
    return setImmediate(() => t(null, !1));
  }
  getAuth(e) {
    if (!e)
      return this.auth && this.auth.oauth2 && this.mailer && (this.auth.oauth2.provisionCallback = this.mailer.get("oauth2_provision_cb") || this.auth.oauth2.provisionCallback), this.auth;
    const t = Object.assign(
      {},
      this.options.auth && typeof this.options.auth == "object" ? this.options.auth : {},
      typeof e == "object" ? e : {}
    );
    if (Object.keys(t).length === 0)
      return !1;
    switch ((t.type || "").toString().toUpperCase()) {
      case "OAUTH2": {
        if (!t.service && !t.user)
          return !1;
        const s = new So(t, this.logger);
        return s.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || s.provisionCallback, s.on("token", (i) => this.mailer.emit("token", i)), s.on("error", (i) => this.emit("error", i)), {
          type: "OAUTH2",
          user: t.user,
          oauth2: s,
          method: "XOAUTH2"
        };
      }
      default:
        return {
          type: (t.type || "").toString().toUpperCase() || "LOGIN",
          user: t.user,
          credentials: {
            user: t.user || "",
            pass: t.pass,
            options: t.options
          },
          method: (t.method || "").trim().toUpperCase() || this.options.authMethod || !1
        };
    }
  }
  /**
   * Sends an e-mail using the selected settings
   *
   * @param {Object} mail Mail object
   * @param {Function} callback Callback function
   */
  send(e, t) {
    this.getSocket(this.options, (s, i) => {
      if (s)
        return t(s);
      let n = !1, a = this.options;
      i && i.connection && (this.logger.info(
        {
          tnx: "proxy",
          remoteAddress: i.connection.remoteAddress,
          remotePort: i.connection.remotePort,
          destHost: a.host || "",
          destPort: a.port || "",
          action: "connected"
        },
        "Using proxied socket from %s:%s to %s:%s",
        i.connection.remoteAddress,
        i.connection.remotePort,
        a.host || "",
        a.port || ""
      ), a = Object.assign(Z.assign(!1, a), i));
      const r = new Ut(a);
      let p;
      const c = () => {
        p && p !== this.auth && p.oauth2 && p.oauth2.removeAllListeners(), p = null;
      };
      r.once("error", (m) => {
        if (!n)
          return n = !0, c(), r.close(), t(m);
      }), r.once("end", () => {
        if (n)
          return;
        const m = setTimeout(() => {
          if (n)
            return;
          n = !0, c();
          const d = new Error("Unexpected socket close");
          r && r._socket && r._socket.upgrading && (d.code = Rt.ETLS), t(d);
        }, 1e3);
        try {
          m.unref();
        } catch {
        }
      });
      const l = () => {
        const m = e.message.getEnvelope(), d = e.message.messageId(), u = [].concat(m.to || []);
        u.length > 3 && u.push("...and " + u.splice(2).length + " more"), e.data.dsn && (m.dsn = e.data.dsn), e.data.requireTLSExtensionEnabled && (m.requireTLSExtensionEnabled = e.data.requireTLSExtensionEnabled), this.logger.info(
          {
            tnx: "send",
            messageId: d
          },
          "Sending message %s to <%s>",
          d,
          u.join(", ")
        ), r.send(m, e.message.createReadStream(), (f, b) => {
          if (n = !0, c(), r.close(), f)
            return this.logger.error(
              {
                err: f,
                tnx: "send"
              },
              "Send error for %s: %s",
              d,
              f.message
            ), t(f);
          b.envelope = {
            from: m.from,
            to: m.to
          }, b.messageId = d;
          try {
            return t(null, b);
          } catch (A) {
            this.logger.error(
              {
                err: A,
                tnx: "callback"
              },
              "Callback error for %s: %s",
              d,
              A.message
            );
          }
        });
      };
      r.connect(() => {
        n || (p = this.getAuth(e.data.auth), p && (r.allowsAuth || a.forceAuth) ? r.login(p, (m) => {
          if (c(), !n) {
            if (m)
              return n = !0, r.close(), t(m);
            l();
          }
        }) : l());
      });
    });
  }
  /**
   * Verifies SMTP configuration
   *
   * @param {Function} callback Callback function
   */
  verify(e) {
    let t;
    return e || (t = new Promise((s, i) => {
      e = Z.callbackPromise(s, i);
    })), this.getSocket(this.options, (s, i) => {
      if (s)
        return e(s);
      let n = this.options;
      i && i.connection && (this.logger.info(
        {
          tnx: "proxy",
          remoteAddress: i.connection.remoteAddress,
          remotePort: i.connection.remotePort,
          destHost: n.host || "",
          destPort: n.port || "",
          action: "connected"
        },
        "Using proxied socket from %s:%s to %s:%s",
        i.connection.remoteAddress,
        i.connection.remotePort,
        n.host || "",
        n.port || ""
      ), n = Object.assign(Z.assign(!1, n), i));
      const a = new Ut(n);
      let r = !1, p;
      const c = () => {
        p && p !== this.auth && p.oauth2 && p.oauth2.removeAllListeners(), p = null;
      };
      a.once("error", (m) => {
        if (!r)
          return r = !0, c(), a.close(), e(m);
      }), a.once("end", () => {
        if (!r)
          return r = !0, c(), e(new Error("Connection closed"));
      });
      const l = () => {
        if (!r)
          return r = !0, c(), a.quit(), e(null, !0);
      };
      a.connect(() => {
        if (!r)
          if (p = this.getAuth({}), p && (a.allowsAuth || n.forceAuth))
            a.login(p, (m) => {
              if (c(), !r) {
                if (m)
                  return r = !0, a.close(), e(m);
                l();
              }
            });
          else if (!p && a.allowsAuth && n.forceAuth) {
            const m = new Error("Authentication info was not provided");
            return m.code = Rt.ENOAUTH, r = !0, c(), a.close(), e(m);
          } else
            l();
      });
    }), t;
  }
  /**
   * Releases resources
   */
  close() {
    this.auth && this.auth.oauth2 && this.auth.oauth2.removeAllListeners(), this.emit("close");
  }
};
var Ao = To;
const { spawn: ko } = Pi, Co = D, Lo = L, Ue = H, Io = Te, Oo = Je;
let Mo = class {
  constructor(e) {
    e = e || {}, this._spawn = ko, this.options = e, this.name = "Sendmail", this.version = Co.version, this.path = "sendmail", this.args = !1, this.logger = Lo.getLogger(this.options, {
      component: this.options.component || "sendmail"
    }), typeof e == "string" ? this.path = e : typeof e == "object" && (e.path && (this.path = e.path), Array.isArray(e.args) && (this.args = e.args)), this.winbreak = ["win", "windows", "dos", `\r
`].includes((e.newline || "").toString().toLowerCase());
  }
  /**
   * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
   *
   * @param {Object} emailMessage MailComposer object
   * @param {Function} callback Callback function to run when the sending is completed
   */
  send(e, t) {
    e.message.keepBcc = !0;
    const s = e.message.getEnvelope(), i = e.message.messageId();
    let n;
    if ([].concat(s.from || []).concat(s.to || []).some((l) => /^"?-/.test(l))) {
      const l = new Error("Can not send mail. Invalid envelope addresses.");
      return l.code = Ue.ESENDMAIL, t(l);
    }
    const r = this.args ? ["-i"].concat(this.args).concat(s.to) : ["-i"].concat(s.from ? ["-f", s.from] : []).concat(s.to), p = (l) => {
      if (!n && (n = !0, typeof t == "function"))
        return l ? t(l) : t(null, {
          envelope: s,
          messageId: i,
          response: "Messages queued for delivery"
        });
    };
    let c;
    try {
      c = this._spawn(this.path, r);
    } catch (l) {
      return this.logger.error(
        {
          err: l,
          tnx: "spawn",
          messageId: i
        },
        "Error occurred while spawning sendmail. %s",
        l.message
      ), p(l);
    }
    if (c) {
      c.on("error", (u) => {
        this.logger.error(
          {
            err: u,
            tnx: "spawn",
            messageId: i
          },
          "Error occurred when sending message %s. %s",
          i,
          u.message
        ), p(u);
      }), c.once("exit", (u) => {
        if (!u)
          return p();
        const f = new Error(
          u === 127 ? "Sendmail command not found, process exited with code " + u : "Sendmail exited with code " + u
        );
        f.code = Ue.ESENDMAIL, this.logger.error(
          {
            err: f,
            tnx: "stdin",
            messageId: i
          },
          "Error sending message %s to sendmail. %s",
          i,
          f.message
        ), p(f);
      }), c.once("close", p), c.stdin.on("error", (u) => {
        this.logger.error(
          {
            err: u,
            tnx: "stdin",
            messageId: i
          },
          "Error occurred when piping message %s to sendmail. %s",
          i,
          u.message
        ), p(u);
      });
      const l = [].concat(s.to || []);
      l.length > 3 && l.push("...and " + l.splice(2).length + " more"), this.logger.info(
        {
          tnx: "send",
          messageId: i
        },
        "Sending message %s to <%s>",
        i,
        l.join(", ")
      );
      const m = e.message.createReadStream();
      let d = m;
      this.options.newline && (d = m.pipe(this.winbreak ? new Io() : new Oo()), m.once("error", (u) => d.emit("error", u))), d.once("error", (u) => {
        this.logger.error(
          {
            err: u,
            tnx: "stdin",
            messageId: i
          },
          "Error occurred when generating message %s. %s",
          i,
          u.message
        ), c.kill("SIGINT"), p(u);
      }), d.pipe(c.stdin);
    } else {
      const l = new Error("sendmail was not found");
      return l.code = Ue.ESENDMAIL, p(l);
    }
  }
};
var jo = Mo;
const No = D, Po = L, Ho = Te, Uo = Je;
let Ro = class {
  constructor(e) {
    e = e || {}, this.options = e, this.name = "StreamTransport", this.version = No.version, this.logger = Po.getLogger(this.options, {
      component: this.options.component || "stream-transport"
    }), this.winbreak = ["win", "windows", "dos", `\r
`].includes((e.newline || "").toString().toLowerCase());
  }
  /**
   * Compiles a mailcomposer message and forwards it to handler that sends it
   *
   * @param {Object} emailMessage MailComposer object
   * @param {Function} callback Callback function to run when the sending is completed
   */
  send(e, t) {
    e.message.keepBcc = !0;
    const s = e.message.getEnvelope(), i = e.message.messageId(), n = [].concat(s.to || []);
    n.length > 3 && n.push("...and " + n.splice(2).length + " more"), this.logger.info(
      {
        tnx: "send",
        messageId: i
      },
      "Sending message %s to <%s> using %s line breaks",
      i,
      n.join(", "),
      this.winbreak ? "<CR><LF>" : "<LF>"
    ), setImmediate(() => {
      let a;
      try {
        if (a = e.message.createReadStream(), this.options.newline) {
          const c = a;
          a = c.pipe(this.winbreak ? new Ho() : new Uo()), c.once("error", (l) => a.emit("error", l));
        }
      } catch (c) {
        return this.logger.error(
          {
            err: c,
            tnx: "send",
            messageId: i
          },
          "Creating send stream failed for %s. %s",
          i,
          c.message
        ), t(c);
      }
      if (!this.options.buffer)
        return a.once("error", (c) => {
          this.logger.error(
            {
              err: c,
              tnx: "send",
              messageId: i
            },
            "Failed creating message for %s. %s",
            i,
            c.message
          );
        }), t(null, {
          envelope: s,
          messageId: i,
          message: a
        });
      const r = [];
      let p = 0;
      a.on("readable", () => {
        let c;
        for (; (c = a.read()) !== null; )
          r.push(c), p += c.length;
      }), a.once("error", (c) => (this.logger.error(
        {
          err: c,
          tnx: "send",
          messageId: i
        },
        "Failed creating message for %s. %s",
        i,
        c.message
      ), t(c))), a.on(
        "end",
        () => t(null, {
          envelope: s,
          messageId: i,
          message: Buffer.concat(r, p)
        })
      );
    });
  }
};
var zo = Ro;
const Do = D, Bo = L;
let qo = class {
  constructor(e) {
    e = e || {}, this.options = e, this.name = "JSONTransport", this.version = Do.version, this.logger = Bo.getLogger(this.options, {
      component: this.options.component || "json-transport"
    });
  }
  /**
   * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
   *
   * @param {Object} emailMessage MailComposer object
   * @param {Function} callback Callback function to run when the sending is completed
   */
  send(e, t) {
    e.message.keepBcc = !0;
    const s = e.message.getEnvelope(), i = e.message.messageId(), n = [].concat(s.to || []);
    n.length > 3 && n.push("...and " + n.splice(2).length + " more"), this.logger.info(
      {
        tnx: "send",
        messageId: i
      },
      "Composing JSON structure of %s to <%s>",
      i,
      n.join(", ")
    ), setImmediate(() => {
      e.normalize((a, r) => a ? (this.logger.error(
        {
          err: a,
          tnx: "send",
          messageId: i
        },
        "Failed building JSON structure for %s. %s",
        i,
        a.message
      ), t(a)) : (delete r.envelope, delete r.normalizedHeaders, t(null, {
        envelope: s,
        messageId: i,
        message: this.options.skipEncoding ? r : JSON.stringify(r)
      })));
    });
  }
};
var $o = qo;
const Fo = ie, Ko = D, Re = L, Qo = H, Go = Te, Wo = Ye;
function ze(o) {
  return o && typeof o == "object" && !o.code && (o.code = Qo.ESES), o;
}
let Xo = class extends Fo {
  constructor(e) {
    super(), e = e || {}, this.options = e, this.ses = this.options.SES, this.name = "SESTransport", this.version = Ko.version, this.logger = Re.getLogger(this.options, {
      component: this.options.component || "ses-transport"
    });
  }
  getRegion(e) {
    return this.ses.sesClient.config && typeof this.ses.sesClient.config.region == "function" ? this.ses.sesClient.config.region().then(
      (t) => e(null, t),
      (t) => e(t)
    ) : e(null, !1);
  }
  /**
   * Compiles a mailcomposer message and forwards it to SES
   *
   * @param {Object} emailMessage MailComposer object
   * @param {Function} callback Callback function to run when the sending is completed
   */
  send(e, t) {
    let s = e.message._headers.find((p) => /^from$/i.test(p.key));
    if (s) {
      const p = new Wo("text/plain");
      s = p._convertAddresses(p._parseAddresses(s.value));
    }
    const i = e.message.getEnvelope(), n = e.message.messageId(), a = [].concat(i.to || []);
    a.length > 3 && a.push("...and " + a.splice(2).length + " more"), this.logger.info(
      {
        tnx: "send",
        messageId: n
      },
      "Sending message %s to <%s>",
      n,
      a.join(", ")
    );
    const r = (p) => {
      e.data._dkim || (e.data._dkim = {}), e.data._dkim.skipFields && typeof e.data._dkim.skipFields == "string" ? e.data._dkim.skipFields += ":date:message-id" : e.data._dkim.skipFields = "date:message-id";
      const c = e.message.createReadStream(), l = c.pipe(new Go()), m = [];
      let d = 0;
      l.on("readable", () => {
        let u;
        for (; (u = l.read()) !== null; )
          m.push(u), d += u.length;
      }), c.once("error", (u) => l.emit("error", u)), l.once("error", (u) => p(u)), l.once("end", () => p(null, Buffer.concat(m, d)));
    };
    setImmediate(
      () => r((p, c) => {
        if (p)
          return this.logger.error(
            {
              err: p,
              tnx: "send",
              messageId: n
            },
            "Failed creating message for %s. %s",
            n,
            p.message
          ), t(p);
        const l = Re.copyOwnKeys(
          {
            Content: {
              Raw: {
                // required
                Data: c
                // required
              }
            },
            FromEmailAddress: s || i.from,
            Destination: {
              ToAddresses: i.to
            }
          },
          e.data.ses
        );
        this.getRegion((m, d) => {
          (m || !d) && (d = "us-east-1");
          let u;
          try {
            const f = new this.ses.SendEmailCommand(l);
            u = this.ses.sesClient.send(f);
          } catch (f) {
            ze(f), this.logger.error(
              {
                err: f,
                tnx: "send"
              },
              "Send error for %s: %s",
              n,
              f.message
            ), setImmediate(() => t(f));
            return;
          }
          u.then((f) => {
            d === "us-east-1" && (d = "email");
            const b = {
              envelope: {
                from: i.from,
                to: i.to
              },
              messageId: "<" + f.MessageId + (/@/.test(f.MessageId) ? "" : "@" + d + ".amazonses.com") + ">",
              response: f.MessageId,
              raw: c
            };
            setImmediate(() => t(null, b));
          }).catch((f) => {
            ze(f), this.logger.error(
              {
                err: f,
                tnx: "send"
              },
              "Send error for %s: %s",
              n,
              f.message
            ), setImmediate(() => t(f));
          });
        });
      })
    );
  }
  /**
   * Verifies SES configuration
   *
   * @param {Function} callback Callback function
   */
  verify(e) {
    let t;
    e || (t = new Promise((n, a) => {
      e = Re.callbackPromise(n, a);
    }));
    const s = (n) => n && !["InvalidParameterValue", "MessageRejected"].includes(n.code || n.Code || n.name) ? e(ze(n)) : e(null, !0), i = {
      Content: {
        Raw: {
          Data: Buffer.from(`From: <invalid@invalid>\r
To: <invalid@invalid>\r
 Subject: Invalid\r
\r
Invalid`)
        }
      },
      FromEmailAddress: "invalid@invalid",
      Destination: {
        ToAddresses: ["invalid@invalid"]
      }
    };
    return this.getRegion(() => {
      let n;
      try {
        const a = new this.ses.SendEmailCommand(i);
        n = this.ses.sesClient.send(a);
      } catch (a) {
        setImmediate(() => s(a));
        return;
      }
      n.then(() => setImmediate(() => s(null))).catch((a) => setImmediate(() => s(a)));
    }), t;
  }
};
var Vo = Xo;
const Jo = Bn, yi = L, Yo = Eo, Zo = Ao, er = jo, tr = zo, ir = $o, sr = Vo, nr = H, ar = ye, Dt = D, or = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, ""), rr = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, ""), Bt = (process.env.ETHEREAL_API_KEY || "").replace(/\s*/g, "") || null, pr = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
let pe = !1;
Ee.createTransport = function(o, e) {
  let t;
  if (
    // provided transporter is a configuration object, not transporter plugin
    typeof o == "object" && typeof o.send != "function" || // provided transporter looks like a connection url
    typeof o == "string" && /^(smtps?|direct):/i.test(o)
  ) {
    const s = typeof o == "string" ? o : o.url;
    if (s ? t = yi.parseConnectionUrl(s) : t = o, t.pool)
      o = new Yo(t);
    else if (t.sendmail)
      o = new er(t);
    else if (t.streamTransport)
      o = new tr(t);
    else if (t.jsonTransport)
      o = new ir(t);
    else if (t.SES) {
      if (t.SES.ses && t.SES.aws) {
        const i = new Error(
          "Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/"
        );
        throw i.code = nr.ECONFIG, i;
      }
      o = new sr(t);
    } else
      o = new Zo(t);
  }
  return new Jo(o, t, e);
};
Ee.createTestAccount = function(o, e) {
  let t;
  if (!e && typeof o == "function" && (e = o, o = !1), e || (t = new Promise((c, l) => {
    e = yi.callbackPromise(c, l);
  })), pr && pe)
    return setImmediate(() => e(null, pe)), t;
  o = o || or;
  const s = [];
  let i = 0;
  const n = {}, a = {
    requestor: Dt.name,
    version: Dt.version
  };
  Bt && (n.Authorization = "Bearer " + Bt);
  const r = {
    contentType: "application/json",
    method: "POST",
    headers: n,
    body: Buffer.from(JSON.stringify(a))
  };
  /^https:/i.test(o) && (r.tls = { rejectUnauthorized: !0 });
  const p = ar(o + "/user", r);
  return p.on("readable", () => {
    let c;
    for (; (c = p.read()) !== null; )
      s.push(c), i += c.length;
  }), p.once("error", (c) => e(c)), p.once("end", () => {
    const c = Buffer.concat(s, i);
    let l;
    try {
      l = JSON.parse(c.toString());
    } catch (m) {
      return e(m);
    }
    if (l.status !== "success" || l.error)
      return e(new Error(l.error || "Request failed"));
    delete l.status, pe = l, e(null, pe);
  }), t;
};
Ee.getTestMessageUrl = function(o) {
  if (!o || !o.response)
    return !1;
  const e = /* @__PURE__ */ new Map(), t = o.response.toString();
  if (t.length > 2 && t.charAt(t.length - 1) === "]") {
    const s = t.indexOf("[", t.lastIndexOf("]", t.length - 2) + 1);
    s >= 0 && s < t.length - 2 && t.substring(s + 1, t.length - 1).replace(/\b([A-Z0-9]+)=([^\s]+)/g, (n, a, r) => {
      e.set(a, r);
    });
  }
  return e.has("STATUS") && e.has("MSGID") ? (pe.web || rr) + "/message/" + e.get("MSGID") : !1;
};
const cr = "campus-events.db.enc", lr = "campus-events.key", Fe = "admin", dr = "campus-events-admin-v1", qt = "030d022ae91f89b3bb563cf2fa23d0b4cb44d1b7d1ed023f1b0835c65c944cde4a9cb87a8aa604bece9b8cfb9da91c08ae04914d2be683b3f4431c9c21328288";
let $t;
const ce = /* @__PURE__ */ new Map();
async function ue() {
  try {
    return await ($t ?? ($t = ur()));
  } catch (o) {
    throw $t = void 0, o;
  }
}
function tt() {
  const o = le.getPath("userData");
  return {
    database: P.join(o, cr),
    key: P.join(o, lr)
  };
}
function it(o) {
  if (q.existsSync(o)) {
    const t = q.readFileSync(o, "utf8");
    return t.startsWith("safe:") && xe.isEncryptionAvailable() ? xe.decryptString(Buffer.from(t.slice(5), "base64")) : t;
  }
  const e = U.randomBytes(32).toString("base64");
  if (xe.isEncryptionAvailable()) {
    const t = xe.encryptString(e).toString("base64");
    q.writeFileSync(o, `safe:${t}`, { mode: 384 });
  } else
    q.writeFileSync(o, e, { mode: 384 });
  return e;
}
function mr(o, e) {
  const t = U.randomBytes(12), s = U.createCipheriv("aes-256-gcm", Buffer.from(e, "base64"), t), i = Buffer.concat([s.update(Buffer.from(o)), s.final()]);
  return Buffer.concat([Buffer.from("CEV1"), t, s.getAuthTag(), i]);
}
function hr(o, e) {
  if (o.subarray(0, 4).toString() !== "CEV1") throw new Error("Invalid database format");
  const t = o.subarray(4, 16), s = o.subarray(16, 32), i = U.createDecipheriv("aes-256-gcm", Buffer.from(e, "base64"), t);
  return i.setAuthTag(s), Buffer.concat([i.update(o.subarray(32)), i.final()]);
}
async function ur() {
  const { database: o, key: e } = tt();
  q.mkdirSync(P.dirname(o), { recursive: !0 });
  const t = it(e), n = await Oi(import.meta.url)("sql.js")({ locateFile: () => P.join(process.env.VITE_PUBLIC, "sql-wasm.wasm") });
  let a;
  q.existsSync(o) ? a = new n.Database(new Uint8Array(hr(q.readFileSync(o), t))) : a = new n.Database(), a.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
      remember_me INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  try {
    a.run("ALTER TABLE users ADD COLUMN email TEXT");
  } catch {
  }
  return a.run("DELETE FROM users WHERE role = 'student' AND (email IS NULL OR TRIM(email) = '')"), await st(a, o, t), a;
}
async function st(o, e, t) {
  const s = `${e}.tmp`;
  q.writeFileSync(s, mr(o.export(), t), { mode: 384 }), q.renameSync(s, e);
}
function te(o, e) {
  return U.scryptSync(o, e, 64).toString("hex");
}
function Ke(o, e, t) {
  return { id: o, name: e, role: t, avatar: e.charAt(0).toUpperCase() };
}
async function fr(o) {
  const e = await ue(), t = o.account.trim(), s = o.name.trim();
  if (o.role !== "student") throw new Error("教师端不支持注册");
  if (!o.email || !/^\S+@qq\.com$/i.test(o.email.trim())) throw new Error("请填写有效的 QQ 邮箱");
  if (!t || !o.password || !s) throw new Error("请填写完整的账号、密码和姓名");
  if (t.toLowerCase() === Fe) throw new Error("该账号为教师专用账号");
  const i = U.randomBytes(16).toString("hex"), n = (/* @__PURE__ */ new Date()).toISOString();
  try {
    e.run(
      `INSERT INTO users (account, password_hash, password_salt, name, email, role, remember_me, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [t, te(o.password, i), i, s, o.email.trim().toLowerCase(), o.role, 0, n, n]
    );
  } catch {
    throw new Error("该账号已经注册过了");
  }
  const { database: a, key: r } = tt();
  return await st(e, a, it(r)), Ke(t, s, o.role);
}
async function xr() {
  var t, s;
  const e = (await ue()).exec("SELECT COUNT(*) FROM users WHERE role = 'student'");
  return Number(((s = (t = e[0]) == null ? void 0 : t.values[0]) == null ? void 0 : s[0]) ?? 0);
}
function gr() {
  const o = process.env.QQ_SMTP_USER || "3586621881@qq.com", e = process.env.QQ_SMTP_AUTH_CODE || "kmrtxynqdembcjji";
  return { user: o, transporter: Ee.createTransport({ host: "smtp.qq.com", port: 465, secure: !0, auth: { user: o, pass: e } }) };
}
async function vr(o) {
  var r, p;
  const s = (p = (r = (await ue()).exec("SELECT email FROM users WHERE account = ? AND role = 'student'", [o.trim()])[0]) == null ? void 0 : r.values[0]) == null ? void 0 : p[0];
  if (!s) throw new Error("该用户不存在或未绑定 QQ 邮箱");
  const i = String(U.randomInt(1e5, 1e6)), { user: n, transporter: a } = gr();
  try {
    await a.sendMail({ from: n, to: String(s), subject: "CampusEvents 密码重置验证码", text: `你的验证码是 ${i}，5 分钟内有效。` });
  } catch {
    throw new Error("验证码发送失败，请稍后重试");
  }
  return ce.set(o.trim(), { hash: te(i, "reset-code-salt"), expiresAt: Date.now() + 5 * 60 * 1e3, attempts: 0 }), { maskedEmail: String(s).replace(/^(.{2}).*(@.*)$/, "$1****$2") };
}
async function wr(o, e, t) {
  const s = o.trim(), i = ce.get(s);
  if (!i || i.expiresAt < Date.now())
    throw ce.delete(s), new Error("验证码无效或已过期");
  if (++i.attempts > 5)
    throw ce.delete(s), new Error("验证码错误次数过多，请重新获取");
  const n = te(e, "reset-code-salt");
  if (!U.timingSafeEqual(Buffer.from(n), Buffer.from(i.hash))) throw new Error("验证码错误");
  if (t.length < 6) throw new Error("新密码至少需要 6 位");
  const a = await ue(), r = U.randomBytes(16).toString("hex");
  a.run("UPDATE users SET password_hash = ?, password_salt = ?, updated_at = ? WHERE account = ? AND role = 'student'", [te(t, r), r, (/* @__PURE__ */ new Date()).toISOString(), s]);
  const { database: p, key: c } = tt();
  await st(a, p, it(c)), ce.delete(s);
}
async function _r(o, e, t) {
  var d;
  if (t === "teacher") {
    const u = te(e, dr);
    if (o.trim() !== Fe || u.length !== qt.length || !U.timingSafeEqual(Buffer.from(u), Buffer.from(qt)))
      throw new Error("账号或密码错误");
    return Ke(Fe, "admin", "teacher");
  }
  const n = (d = (await ue()).exec("SELECT account, password_hash, password_salt, name, role FROM users WHERE account = ?", [o.trim()])[0]) == null ? void 0 : d.values[0];
  if (!n) throw new Error("USER_NOT_FOUND");
  if (!n) throw new Error("账号或密码错误");
  const [a, r, p, c, l] = n.map(String), m = te(e, p);
  if (m.length !== r.length || !U.timingSafeEqual(Buffer.from(m), Buffer.from(r)))
    throw new Error("账号或密码错误");
  return Ke(a, c, l);
}
const Si = P.dirname(Ii(import.meta.url));
process.env.APP_ROOT = P.join(Si, "..");
const Qe = process.env.VITE_DEV_SERVER_URL, pp = P.join(process.env.APP_ROOT, "dist-electron"), Ti = P.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Qe ? P.join(process.env.APP_ROOT, "public") : Ti;
let N;
function Ai() {
  N = new Ft({
    width: 1232,
    height: 920,
    minWidth: 1232,
    minHeight: 920,
    icon: P.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: P.join(Si, "preload.mjs")
    }
  }), N.webContents.on("before-input-event", (o, e) => {
    e.type === "keyDown" && e.key === "F12" && (o.preventDefault(), N == null || N.webContents.toggleDevTools());
  }), N.webContents.on("did-finish-load", () => {
    N == null || N.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Qe ? N.loadURL(Qe) : N.loadFile(P.join(Ti, "index.html"));
}
le.on("window-all-closed", () => {
  process.platform !== "darwin" && (le.quit(), N = null);
});
le.on("activate", () => {
  Ft.getAllWindows().length === 0 && Ai();
});
le.whenReady().then(() => {
  Li.setApplicationMenu(null), se.handle("auth:register", (o, e) => fr(e)), se.handle("stats:public", async () => {
    try {
      return { registeredStudents: await xr() };
    } catch {
      throw new Error("统计数据暂时不可用");
    }
  }), se.handle("auth:send-reset-code", async (o, e) => {
    try {
      return await vr((e == null ? void 0 : e.account) ?? "");
    } catch (t) {
      const s = t instanceof Error ? t.message : "";
      throw s.includes("不存在") || s.includes("未绑定") ? new Error("该用户不存在或未绑定 QQ 邮箱") : s.includes("QQ 邮箱服务") ? new Error("尚未配置 QQ 邮箱服务，请联系管理员") : new Error("验证码发送失败，请稍后重试");
    }
  }), se.handle("auth:reset-password", async (o, e) => {
    try {
      return await wr((e == null ? void 0 : e.account) ?? "", (e == null ? void 0 : e.code) ?? "", (e == null ? void 0 : e.newPassword) ?? ""), { success: !0 };
    } catch (t) {
      const s = t instanceof Error ? t.message : "";
      throw s.includes("验证码无效") ? new Error("验证码无效或已过期") : s.includes("验证码错误次数") ? new Error("验证码错误次数过多，请重新获取") : s.includes("验证码错误") ? new Error("验证码错误") : s.includes("至少需要") ? new Error("新密码至少需要 6 位") : new Error("密码修改失败，请稍后重试");
    }
  }), se.handle("auth:login", async (o, e) => {
    try {
      return await _r(e.account, e.password, e.role);
    } catch (t) {
      const s = t instanceof Error ? t.message : "";
      throw s === "USER_NOT_FOUND" ? new Error("该用户不存在") : s.includes("账号") || s.includes("密码") || s.includes("璐") || s.includes("鎴") ? new Error("密码错误") : new Error("数据库暂时不可用，请重启软件后重试");
    }
  }), Ai();
});
export {
  pp as MAIN_DIST,
  Ti as RENDERER_DIST,
  Qe as VITE_DEV_SERVER_URL
};
