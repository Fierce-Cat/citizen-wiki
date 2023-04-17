var ht = Object.defineProperty, vt = Object.defineProperties;
var bt = Object.getOwnPropertyDescriptors;
var ye = Object.getOwnPropertySymbols;
var Oe = Object.prototype.hasOwnProperty, qe = Object.prototype.propertyIsEnumerable;
var Re = (e, t, n) => t in e ? ht(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ze = (e, t) => {
  for (var n in t || (t = {}))
    Oe.call(t, n) && Re(e, n, t[n]);
  if (ye)
    for (var n of ye(t))
      qe.call(t, n) && Re(e, n, t[n]);
  return e;
}, He = (e, t) => vt(e, bt(t));
var Ce = (e, t) => {
  var n = {};
  for (var s in e)
    Oe.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && ye)
    for (var s of ye(e))
      t.indexOf(s) < 0 && qe.call(e, s) && (n[s] = e[s]);
  return n;
};
var Be = (e, t, n) => new Promise((s, a) => {
  var u = (o) => {
    try {
      i(n.next(o));
    } catch (r) {
      a(r);
    }
  }, l = (o) => {
    try {
      i(n.throw(o));
    } catch (r) {
      a(r);
    }
  }, i = (o) => o.done ? s(o.value) : Promise.resolve(o.value).then(u, l);
  i((n = n.apply(e, t)).next());
});
import { ref as f, onMounted as re, defineComponent as K, computed as p, openBlock as d, createElementBlock as m, normalizeClass as V, toDisplayString as H, createCommentVNode as $, Comment as gt, warn as yt, withKeys as Y, renderSlot as A, resolveComponent as I, Fragment as he, renderList as $e, createBlock as L, withCtx as F, createTextVNode as oe, createVNode as z, Transition as Me, normalizeStyle as ce, resolveDynamicComponent as Xe, createElementVNode as v, getCurrentInstance as Ct, toRef as Q, withDirectives as de, withModifiers as X, vModelCheckbox as Ye, onUnmounted as De, watch as te, nextTick as ge, mergeProps as Z, vShow as _e, vModelDynamic as _t, useCssVars as Ee, vModelRadio as $t, inject as je, provide as Ue, toRefs as At } from "vue";
function se(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const we = "cdx", It = [
  "default",
  "progressive",
  "destructive"
], Bt = [
  "normal",
  "primary",
  "quiet"
], wt = [
  "x-small",
  "small",
  "medium"
], kt = [
  "notice",
  "warning",
  "error",
  "success"
], et = se(kt), xt = [
  "text",
  "search",
  "number",
  "email",
  "month",
  "password",
  "tel",
  "url",
  "week",
  "date",
  "datetime-local",
  "time"
], Ae = [
  "default",
  "error"
], St = 120, Mt = 500, me = "cdx-menu-footer-item", tt = Symbol("CdxTabs"), nt = Symbol("CdxActiveTab"), Dt = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Et = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Tt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Lt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Vt = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Ft = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Kt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Nt = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Rt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Ot = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', qt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', zt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ht = '<path fill-rule="evenodd" d="M10 20a10 10 0 100-20 10 10 0 000 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z" clip-rule="evenodd"/>', ot = Dt, jt = Et, Ut = Tt, lt = Lt, at = Vt, st = Ft, Wt = Kt, Pt = {
  langCodeMap: {
    ar: Nt
  },
  default: Rt
}, Qt = {
  ltr: Ot,
  shouldFlip: !0
}, Gt = {
  ltr: qt,
  shouldFlip: !0
}, Zt = zt, ut = Ht;
function Jt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function Xt(e, t) {
  if (typeof e == "string")
    return !1;
  if ("langCodeMap" in e) {
    const n = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
    if (typeof n == "string")
      return !1;
    e = n;
  }
  if ("shouldFlipExceptions" in e && Array.isArray(e.shouldFlipExceptions)) {
    const n = e.shouldFlipExceptions.indexOf(t);
    return n === void 0 || n === -1;
  }
  return "shouldFlip" in e ? e.shouldFlip : !1;
}
function it(e) {
  const t = f(null);
  return re(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function Yt(e) {
  const t = f("");
  return re(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
const en = se(wt), tn = K({
  name: "CdxIcon",
  props: {
    icon: {
      type: [String, Object],
      required: !0
    },
    iconLabel: {
      type: String,
      default: ""
    },
    lang: {
      type: String,
      default: null
    },
    dir: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "medium",
      validator: en
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = f(), s = it(n), a = Yt(n), u = p(() => e.dir || s.value), l = p(() => e.lang || a.value), i = p(() => ({
      "cdx-icon--flipped": u.value === "rtl" && l.value !== null && Xt(e.icon, l.value),
      [`cdx-icon--${e.size}`]: !0
    })), o = p(
      () => Jt(e.icon, l.value || "", u.value || "ltr")
    ), r = p(() => typeof o.value == "string" ? o.value : ""), c = p(() => typeof o.value != "string" ? o.value.path : "");
    return {
      rootElement: n,
      rootClasses: i,
      iconSvg: r,
      iconPath: c,
      onClick: (y) => {
        t("click", y);
      }
    };
  }
});
const N = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, nn = ["aria-hidden"], on = { key: 0 }, ln = ["innerHTML"], an = ["d"];
function sn(e, t, n, s, a, u) {
  return d(), m("span", {
    ref: "rootElement",
    class: V(["cdx-icon", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l))
  }, [
    (d(), m("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (d(), m("title", on, H(e.iconLabel), 1)) : $("", !0),
      e.iconSvg ? (d(), m("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, ln)) : (d(), m("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, an))
    ], 8, nn))
  ], 2);
}
const G = /* @__PURE__ */ N(tn, [["render", sn]]), un = se(It), dn = se(Bt), rn = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && yt(`icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/button.html#default-icon-only`);
};
function xe(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...xe(n)) : typeof n == "object" && n && (typeof n.type == "string" || typeof n.type == "object" ? t.push(n) : n.type !== gt && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...xe(n.children))));
  return t;
}
const cn = (e, t) => {
  if (!e)
    return !1;
  const n = xe(e);
  if (n.length !== 1)
    return !1;
  const s = n[0], a = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === G.name, u = typeof s == "object" && s.type === "svg";
  return a || u ? (rn(t), !0) : !1;
}, pn = K({
  name: "CdxButton",
  props: {
    action: {
      type: String,
      default: "default",
      validator: un
    },
    weight: {
      type: String,
      default: "normal",
      validator: dn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const a = f(!1);
    return {
      rootClasses: p(() => {
        var o;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${e.weight}`]: !0,
          "cdx-button--framed": e.weight !== "quiet",
          "cdx-button--icon-only": cn((o = n.default) == null ? void 0 : o.call(n), s),
          "cdx-button--is-active": a.value
        };
      }),
      onClick: (o) => {
        t("click", o);
      },
      setActive: (o) => {
        a.value = o;
      }
    };
  }
});
function fn(e, t, n, s, a, u) {
  return d(), m("button", {
    class: V(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = Y((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = Y((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    A(e.$slots, "default")
  ], 34);
}
const ve = /* @__PURE__ */ N(pn, [["render", fn]]);
function dt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const mn = K({
  name: "CdxButtonGroup",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  props: {
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "click"
  ],
  setup() {
    return {
      getButtonLabel: dt
    };
  }
});
const hn = { class: "cdx-button-group" };
function vn(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-button");
  return d(), m("div", hn, [
    (d(!0), m(he, null, $e(e.buttons, (o) => (d(), L(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: F(() => [
        A(e.$slots, "default", { button: o }, () => [
          o.icon ? (d(), L(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          oe(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const kl = /* @__PURE__ */ N(mn, [["render", vn]]), bn = K({
  name: "CdxThumbnail",
  components: { CdxIcon: G },
  props: {
    thumbnail: {
      type: [Object, null],
      default: null
    },
    placeholderIcon: {
      type: [String, Object],
      default: Wt
    }
  },
  setup: (e) => {
    const t = f(!1), n = f({}), s = (a) => {
      const u = a.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        n.value = { backgroundImage: `url("${u}")` }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = u;
    };
    return re(() => {
      var a;
      (a = e.thumbnail) != null && a.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const gn = { class: "cdx-thumbnail" }, yn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Cn(e, t, n, s, a, u) {
  const l = I("cdx-icon");
  return d(), m("span", gn, [
    e.thumbnailLoaded ? $("", !0) : (d(), m("span", yn, [
      z(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    z(Me, { name: "cdx-thumbnail__image" }, {
      default: F(() => [
        e.thumbnailLoaded ? (d(), m("span", {
          key: 0,
          style: ce(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : $("", !0)
      ]),
      _: 1
    })
  ]);
}
const rt = /* @__PURE__ */ N(bn, [["render", Cn]]), _n = K({
  name: "CdxCard",
  components: { CdxIcon: G, CdxThumbnail: rt },
  props: {
    url: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    thumbnail: {
      type: [Object, null],
      default: null
    },
    forceThumbnail: {
      type: Boolean,
      default: !1
    },
    customPlaceholderIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  setup(e) {
    const t = p(() => !!e.url), n = p(() => t.value ? "a" : "span"), s = p(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: s
    };
  }
});
const $n = { class: "cdx-card__text" }, An = { class: "cdx-card__text__title" }, In = {
  key: 0,
  class: "cdx-card__text__description"
}, Bn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function wn(e, t, n, s, a, u) {
  const l = I("cdx-thumbnail"), i = I("cdx-icon");
  return d(), L(Xe(e.contentTag), {
    href: e.cardLink,
    class: V(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: F(() => [
      e.thumbnail || e.forceThumbnail ? (d(), L(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (d(), L(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : $("", !0),
      v("span", $n, [
        v("span", An, [
          A(e.$slots, "title")
        ]),
        e.$slots.description ? (d(), m("span", In, [
          A(e.$slots, "description")
        ])) : $("", !0),
        e.$slots["supporting-text"] ? (d(), m("span", Bn, [
          A(e.$slots, "supporting-text")
        ])) : $("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const xl = /* @__PURE__ */ N(_n, [["render", wn]]);
function ue(e, t, n) {
  return p({
    get: () => e.value,
    set: (s) => t(n || "update:modelValue", s)
  });
}
let ke = 0;
function ne(e) {
  const t = Ct(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${we}-${e}-${ke++}` : n ? `${we}-${n}-${ke++}` : `${we}-${ke++}`;
}
const kn = K({
  name: "CdxCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: !1
    },
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    indeterminate: {
      type: Boolean,
      default: !1
    },
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = p(() => ({
      "cdx-checkbox--inline": e.inline
    })), s = f(), a = ne("checkbox"), u = () => {
      s.value.click();
    }, l = ue(Q(e, "modelValue"), t);
    return {
      rootClasses: n,
      input: s,
      checkboxId: a,
      clickInput: u,
      wrappedModel: l
    };
  }
});
const xn = ["id", "value", "disabled", ".indeterminate"], Sn = /* @__PURE__ */ v("span", { class: "cdx-checkbox__icon" }, null, -1), Mn = ["for"];
function Dn(e, t, n, s, a, u) {
  return d(), m("span", {
    class: V(["cdx-checkbox", e.rootClasses])
  }, [
    de(v("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-checkbox__input",
      type: "checkbox",
      value: e.inputValue,
      disabled: e.disabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = Y(X((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
    }, null, 40, xn), [
      [Ye, e.wrappedModel]
    ]),
    Sn,
    v("label", {
      class: "cdx-checkbox__label",
      for: e.checkboxId
    }, [
      A(e.$slots, "default")
    ], 8, Mn)
  ], 2);
}
const Sl = /* @__PURE__ */ N(kn, [["render", Dn]]), En = {
  error: at,
  warning: ot,
  success: ut
}, Tn = K({
  name: "CdxInfoChip",
  components: { CdxIcon: G },
  props: {
    status: {
      type: String,
      default: "notice",
      validator: et
    },
    icon: {
      type: [String, Object],
      default: null
    }
  },
  setup(e) {
    const t = p(() => ({
      [`cdx-info-chip__icon--${e.status}`]: !0
    })), n = p(
      () => e.status === "notice" ? e.icon : En[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const Ln = { class: "cdx-info-chip" }, Vn = { class: "cdx-info-chip--text" };
function Fn(e, t, n, s, a, u) {
  const l = I("cdx-icon");
  return d(), m("div", Ln, [
    e.computedIcon ? (d(), L(l, {
      key: 0,
      class: V(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : $("", !0),
    v("span", Vn, [
      A(e.$slots, "default")
    ])
  ]);
}
const Ml = /* @__PURE__ */ N(Tn, [["render", Fn]]);
function ct(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Kn = "[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]";
function pt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = ct(e), s = new RegExp(
    n + Kn + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const a = s.index, u = a + s[0].length, l = t.slice(a, u), i = t.slice(0, a), o = t.slice(u, t.length);
  return [i, l, o];
}
const Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: ct,
  splitStringAtMatch: pt
}, Symbol.toStringTag, { value: "Module" })), Nn = K({
  name: "CdxSearchResultTitle",
  props: {
    title: {
      type: String,
      required: !0
    },
    searchQuery: {
      type: String,
      default: ""
    }
  },
  setup: (e) => ({
    titleChunks: p(() => pt(e.searchQuery, String(e.title)))
  })
});
const Rn = { class: "cdx-search-result-title" }, On = { class: "cdx-search-result-title__match" };
function qn(e, t, n, s, a, u) {
  return d(), m("span", Rn, [
    v("bdi", null, [
      oe(H(e.titleChunks[0]), 1),
      v("span", On, H(e.titleChunks[1]), 1),
      oe(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const zn = /* @__PURE__ */ N(Nn, [["render", qn]]), Hn = K({
  name: "CdxMenuItem",
  components: { CdxIcon: G, CdxThumbnail: rt, CdxSearchResultTitle: zn },
  props: {
    id: {
      type: String,
      required: !0
    },
    value: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    selected: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !1
    },
    highlighted: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: ""
    },
    match: {
      type: String,
      default: ""
    },
    supportingText: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    thumbnail: {
      type: [Object, null],
      default: null
    },
    description: {
      type: [String, null],
      default: ""
    },
    searchQuery: {
      type: String,
      default: ""
    },
    boldLabel: {
      type: Boolean,
      default: !1
    },
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    language: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "change"
  ],
  setup: (e, { emit: t }) => {
    const n = () => {
      e.highlighted || t("change", "highlighted", !0);
    }, s = () => {
      t("change", "highlighted", !1);
    }, a = (c) => {
      c.button === 0 && t("change", "active", !0);
    }, u = () => {
      t("change", "selected", !0);
    }, l = p(() => e.searchQuery.length > 0), i = p(() => ({
      "cdx-menu-item--selected": e.selected,
      "cdx-menu-item--active": e.active && e.highlighted,
      "cdx-menu-item--highlighted": e.highlighted,
      "cdx-menu-item--enabled": !e.disabled,
      "cdx-menu-item--disabled": e.disabled,
      "cdx-menu-item--highlight-query": l.value,
      "cdx-menu-item--bold-label": e.boldLabel,
      "cdx-menu-item--has-description": !!e.description,
      "cdx-menu-item--hide-description-overflow": e.hideDescriptionOverflow
    })), o = p(() => e.url ? "a" : "span"), r = p(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: s,
      onMouseDown: a,
      onClick: u,
      highlightQuery: l,
      rootClasses: i,
      contentTag: o,
      title: r
    };
  }
});
const jn = ["id", "aria-disabled", "aria-selected"], Un = { class: "cdx-menu-item__text" }, Wn = ["lang"], Pn = ["lang"], Qn = ["lang"], Gn = ["lang"];
function Zn(e, t, n, s, a, u) {
  const l = I("cdx-thumbnail"), i = I("cdx-icon"), o = I("cdx-search-result-title");
  return d(), m("li", {
    id: e.id,
    role: "option",
    class: V(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = X((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    A(e.$slots, "default", {}, () => [
      (d(), L(Xe(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: F(() => {
          var r, c, C, y, D, k;
          return [
            e.showThumbnail ? (d(), L(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (d(), L(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : $("", !0),
            v("span", Un, [
              e.highlightQuery ? (d(), L(o, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (d(), m("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (c = e.language) == null ? void 0 : c.label
              }, [
                v("bdi", null, H(e.title), 1)
              ], 8, Wn)),
              e.match ? (d(), m(he, { key: 2 }, [
                oe(H(" ") + " "),
                e.highlightQuery ? (d(), L(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (C = e.language) == null ? void 0 : C.match
                }, null, 8, ["title", "search-query", "lang"])) : (d(), m("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (y = e.language) == null ? void 0 : y.match
                }, [
                  v("bdi", null, H(e.match), 1)
                ], 8, Pn))
              ], 64)) : $("", !0),
              e.supportingText ? (d(), m(he, { key: 3 }, [
                oe(H(" ") + " "),
                v("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (D = e.language) == null ? void 0 : D.supportingText
                }, [
                  v("bdi", null, H(e.supportingText), 1)
                ], 8, Qn)
              ], 64)) : $("", !0),
              e.description ? (d(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (k = e.language) == null ? void 0 : k.description
              }, [
                v("bdi", null, H(e.description), 1)
              ], 8, Gn)) : $("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, jn);
}
const Jn = /* @__PURE__ */ N(Hn, [["render", Zn]]), Xn = K({
  name: "CdxProgressBar",
  props: {
    inline: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return {
      rootClasses: p(() => ({
        "cdx-progress-bar--block": !e.inline,
        "cdx-progress-bar--inline": e.inline,
        "cdx-progress-bar--enabled": !e.disabled,
        "cdx-progress-bar--disabled": e.disabled
      }))
    };
  }
});
const Yn = ["aria-disabled"], eo = /* @__PURE__ */ v("div", { class: "cdx-progress-bar__bar" }, null, -1), to = [
  eo
];
function no(e, t, n, s, a, u) {
  return d(), m("div", {
    class: V(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, to, 10, Yn);
}
const oo = /* @__PURE__ */ N(Xn, [["render", no]]);
function Se(e, t) {
  const n = f(!1);
  let s = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const a = new window.IntersectionObserver(
    (u) => {
      const l = u[0];
      l && (n.value = l.isIntersecting);
    },
    t
  );
  return re(() => {
    s = !0, e.value && a.observe(e.value);
  }), De(() => {
    s = !1, a.disconnect();
  }), te(e, (u) => {
    !s || (a.disconnect(), n.value = !1, u && a.observe(u));
  }), n;
}
function pe(e, t = p(() => ({}))) {
  const n = p(() => {
    const u = Ce(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      u[i] = !0;
    }), u;
  }), s = p(() => {
    if ("style" in e)
      return e.style;
  }), a = p(() => {
    const o = e, { class: u, style: l } = o;
    return Ce(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: s,
    otherAttrs: a
  };
}
const lo = K({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Jn,
    CdxProgressBar: oo
  },
  inheritAttrs: !1,
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    footer: {
      type: Object,
      default: null
    },
    selected: {
      type: [String, Number, null],
      required: !0
    },
    expanded: {
      type: Boolean,
      required: !0
    },
    showPending: {
      type: Boolean,
      default: !1
    },
    visibleItemLimit: {
      type: Number,
      default: null
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    boldLabel: {
      type: Boolean,
      default: !1
    },
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    searchQuery: {
      type: String,
      default: ""
    },
    showNoResultsSlot: {
      type: Boolean,
      default: null
    }
  },
  emits: [
    "update:selected",
    "update:expanded",
    "menu-item-click",
    "menu-item-keyboard-navigation",
    "load-more"
  ],
  expose: [
    "clearActive",
    "getHighlightedMenuItem",
    "getHighlightedViaKeyboard",
    "delegateKeyNavigation"
  ],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const a = p(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((w) => He(ze({}, w), {
      id: ne("menu-item")
    }))), u = p(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : a.value.length === 0 : !1), l = f(null), i = f(!1), o = f(null);
    function r() {
      return a.value.find(
        (b) => b.value === e.selected
      );
    }
    function c(b, w) {
      var O;
      if (!(w && w.disabled))
        switch (b) {
          case "selected":
            t("update:selected", (O = w == null ? void 0 : w.value) != null ? O : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            l.value = w || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = w || null, i.value = !0;
            break;
          case "active":
            o.value = w || null;
            break;
        }
    }
    const C = p(() => {
      if (l.value !== null)
        return a.value.findIndex(
          (b) => b.value === l.value.value
        );
    });
    function y(b) {
      !b || (c("highlightedViaKeyboard", b), t("menu-item-keyboard-navigation", b));
    }
    function D(b) {
      var j;
      const w = (be) => {
        for (let ie = be - 1; ie >= 0; ie--)
          if (!a.value[ie].disabled)
            return a.value[ie];
      };
      b = b || a.value.length;
      const O = (j = w(b)) != null ? j : w(a.value.length);
      y(O);
    }
    function k(b) {
      const w = (j) => a.value.find((be, ie) => !be.disabled && ie > j);
      b = b != null ? b : -1;
      const O = w(b) || w(-1);
      y(O);
    }
    function R(b, w = !0) {
      function O() {
        t("update:expanded", !0), c("highlighted", r());
      }
      function j() {
        w && (b.preventDefault(), b.stopPropagation());
      }
      switch (b.key) {
        case "Enter":
        case " ":
          return j(), e.expanded ? (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)) : O(), !0;
        case "Tab":
          return e.expanded && (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return j(), e.expanded ? (l.value === null && c("highlightedViaKeyboard", r()), D(C.value)) : O(), P(), !0;
        case "ArrowDown":
          return j(), e.expanded ? (l.value === null && c("highlightedViaKeyboard", r()), k(C.value)) : O(), P(), !0;
        case "Home":
          return j(), e.expanded ? (l.value === null && c("highlightedViaKeyboard", r()), k()) : O(), P(), !0;
        case "End":
          return j(), e.expanded ? (l.value === null && c("highlightedViaKeyboard", r()), D()) : O(), P(), !0;
        case "Escape":
          return j(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function B() {
      c("active");
    }
    const S = [], M = f(void 0), E = Se(
      M,
      { threshold: 0.8 }
    );
    te(E, (b) => {
      b && t("load-more");
    });
    function le(b, w) {
      if (b) {
        S[w] = b.$el;
        const O = e.visibleItemLimit;
        if (!O || e.menuItems.length < O)
          return;
        const j = Math.min(
          O,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        w === e.menuItems.length - j && (M.value = b.$el);
      }
    }
    function P() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || C.value === void 0)
        return;
      const b = C.value >= 0 ? C.value : 0;
      S[b].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const U = f(null), J = f(null);
    function g() {
      if (J.value = null, !e.visibleItemLimit || S.length <= e.visibleItemLimit) {
        U.value = null;
        return;
      }
      const b = S[0], w = S[e.visibleItemLimit];
      if (U.value = h(
        b,
        w
      ), e.footer) {
        const O = S[S.length - 1];
        J.value = O.scrollHeight;
      }
    }
    function h(b, w) {
      const O = b.getBoundingClientRect().top;
      return w.getBoundingClientRect().top - O + 2;
    }
    re(() => {
      document.addEventListener("mouseup", B);
    }), De(() => {
      document.removeEventListener("mouseup", B);
    }), te(Q(e, "expanded"), (b) => Be(this, null, function* () {
      const w = r();
      !b && l.value && w === void 0 && c("highlighted"), b && w !== void 0 && c("highlighted", w), b && (yield ge(), g(), yield ge(), P());
    })), te(Q(e, "menuItems"), (b) => Be(this, null, function* () {
      b.length < S.length && (S.length = b.length), e.expanded && (yield ge(), g(), yield ge(), P());
    }), { deep: !0 });
    const x = p(() => ({
      "max-height": U.value ? `${U.value}px` : void 0,
      "overflow-y": U.value ? "scroll" : void 0,
      "margin-bottom": J.value ? `${J.value}px` : void 0
    })), q = p(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!U.value
    })), {
      rootClasses: T,
      rootStyle: ee,
      otherAttrs: fe
    } = pe(s, q);
    return {
      listBoxStyle: x,
      rootClasses: T,
      rootStyle: ee,
      otherAttrs: fe,
      assignTemplateRef: le,
      computedMenuItems: a,
      computedShowNoResultsSlot: u,
      highlightedMenuItem: l,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: c,
      handleKeyNavigation: R
    };
  },
  methods: {
    getHighlightedMenuItem() {
      return this.highlightedMenuItem;
    },
    getHighlightedViaKeyboard() {
      return this.highlightedViaKeyboard;
    },
    clearActive() {
      this.handleMenuItemChange("active");
    },
    delegateKeyNavigation(e, t = !0) {
      return this.handleKeyNavigation(e, t);
    }
  }
});
const ao = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, so = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function uo(e, t, n, s, a, u) {
  const l = I("cdx-menu-item"), i = I("cdx-progress-bar");
  return de((d(), m("div", {
    class: V(["cdx-menu", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    v("ul", Z({
      class: "cdx-menu__listbox",
      role: "listbox",
      "aria-multiselectable": "false",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (d(), m("li", ao, [
        A(e.$slots, "pending")
      ])) : $("", !0),
      e.computedShowNoResultsSlot ? (d(), m("li", so, [
        A(e.$slots, "no-results")
      ])) : $("", !0),
      (d(!0), m(he, null, $e(e.computedMenuItems, (o, r) => {
        var c, C;
        return d(), L(l, Z({
          key: o.value,
          ref_for: !0,
          ref: (y) => e.assignTemplateRef(y, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((c = e.activeMenuItem) == null ? void 0 : c.value),
          highlighted: o.value === ((C = e.highlightedMenuItem) == null ? void 0 : C.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (y, D) => e.handleMenuItemChange(y, D && o),
          onClick: (y) => e.$emit("menu-item-click", o)
        }), {
          default: F(() => {
            var y, D;
            return [
              A(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((y = e.activeMenuItem) == null ? void 0 : y.value) && o.value === ((D = e.highlightedMenuItem) == null ? void 0 : D.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (d(), L(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : $("", !0)
    ], 16)
  ], 6)), [
    [_e, e.expanded]
  ]);
}
const Ie = /* @__PURE__ */ N(lo, [["render", uo]]), io = se(xt), ro = se(Ae), co = K({
  name: "CdxTextInput",
  components: { CdxIcon: G },
  inheritAttrs: !1,
  expose: ["focus"],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputType: {
      type: String,
      default: "text",
      validator: io
    },
    status: {
      type: String,
      default: "default",
      validator: ro
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    endIcon: {
      type: [String, Object],
      default: void 0
    },
    clearable: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue",
    "keydown",
    "input",
    "change",
    "focus",
    "blur"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = ue(Q(e, "modelValue"), t), a = p(() => e.clearable && !!s.value && !e.disabled), u = p(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": a.value,
      [`cdx-text-input--status-${e.status}`]: !0
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o
    } = pe(n, u), r = p(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      wrappedModel: s,
      isClearable: a,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o,
      inputClasses: r,
      onClear: () => {
        s.value = "";
      },
      onInput: (B) => {
        t("input", B);
      },
      onChange: (B) => {
        t("change", B);
      },
      onKeydown: (B) => {
        (B.key === "Home" || B.key === "End") && !B.ctrlKey && !B.metaKey || t("keydown", B);
      },
      onFocus: (B) => {
        t("focus", B);
      },
      onBlur: (B) => {
        t("blur", B);
      },
      cdxIconClear: Ut
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});
const po = ["type", "disabled"];
function fo(e, t, n, s, a, u) {
  const l = I("cdx-icon");
  return d(), m("div", {
    class: V(["cdx-text-input", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    de(v("input", Z({
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrs, {
      type: e.inputType,
      disabled: e.disabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i)),
      onChange: t[2] || (t[2] = (...i) => e.onChange && e.onChange(...i)),
      onFocus: t[3] || (t[3] = (...i) => e.onFocus && e.onFocus(...i)),
      onBlur: t[4] || (t[4] = (...i) => e.onBlur && e.onBlur(...i)),
      onKeydown: t[5] || (t[5] = (...i) => e.onKeydown && e.onKeydown(...i))
    }), null, 16, po), [
      [_t, e.wrappedModel]
    ]),
    e.startIcon ? (d(), L(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.endIcon ? (d(), L(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.isClearable ? (d(), L(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = X(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : $("", !0)
  ], 6);
}
const Te = /* @__PURE__ */ N(co, [["render", fo]]);
function Le(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (a) => {
      const u = a[0];
      u && (t.value = {
        width: u.borderBoxSize[0].inlineSize,
        height: u.borderBoxSize[0].blockSize
      });
    }
  );
  let s = !1;
  return re(() => {
    s = !0, e.value && n.observe(e.value);
  }), De(() => {
    s = !1, n.disconnect();
  }), te(e, (a) => {
    !s || (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, a && n.observe(a));
  }), t;
}
const mo = se(Ae), Ve = K({
  name: "CdxCombobox",
  components: {
    CdxButton: ve,
    CdxIcon: G,
    CdxMenu: Ie,
    CdxTextInput: Te
  },
  inheritAttrs: !1,
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    selected: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: String,
      default: "default",
      validator: mo
    }
  },
  emits: [
    "update:selected",
    "load-more"
  ],
  setup(e, { emit: t, attrs: n, slots: s }) {
    const a = f(), u = f(), l = f(), i = ne("combobox"), o = Q(e, "selected"), r = ue(o, t, "update:selected"), c = f(!1), C = f(!1), y = p(() => {
      var g, h;
      return (h = (g = l.value) == null ? void 0 : g.getHighlightedMenuItem()) == null ? void 0 : h.id;
    }), D = p(() => ({
      "cdx-combobox--expanded": c.value,
      "cdx-combobox--disabled": e.disabled
    })), k = Le(u), R = p(() => {
      var g;
      return `${(g = k.value.width) != null ? g : 0}px`;
    }), {
      rootClasses: B,
      rootStyle: S,
      otherAttrs: M
    } = pe(n, D);
    function E() {
      C.value && c.value ? c.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (c.value = !0);
    }
    function le() {
      c.value = C.value && c.value;
    }
    function P() {
      e.disabled || (C.value = !0);
    }
    function U() {
      var g;
      e.disabled || (g = a.value) == null || g.focus();
    }
    function J(g) {
      !l.value || e.disabled || e.menuItems.length === 0 || g.key === " " || l.value.delegateKeyNavigation(g);
    }
    return te(c, () => {
      C.value = !1;
    }), {
      input: a,
      inputWrapper: u,
      currentWidthInPx: R,
      menu: l,
      menuId: i,
      modelWrapper: r,
      expanded: c,
      highlightedId: y,
      onInputFocus: E,
      onInputBlur: le,
      onKeydown: J,
      onButtonClick: U,
      onButtonMousedown: P,
      cdxIconExpand: st,
      rootClasses: B,
      rootStyle: S,
      otherAttrs: M
    };
  }
}), We = () => {
  Ee((e) => ({
    "21ba103d": e.currentWidthInPx
  }));
}, Pe = Ve.setup;
Ve.setup = Pe ? (e, t) => (We(), Pe(e, t)) : We;
const ho = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function vo(e, t, n, s, a, u) {
  const l = I("cdx-text-input"), i = I("cdx-icon"), o = I("cdx-button"), r = I("cdx-menu");
  return d(), m("div", {
    class: V(["cdx-combobox", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    v("div", ho, [
      z(l, Z({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => e.modelWrapper = c)
      }, e.otherAttrs, {
        class: "cdx-combobox__input",
        "aria-activedescendant": e.highlightedId,
        "aria-expanded": e.expanded,
        "aria-controls": e.menuId,
        "aria-owns": e.menuId,
        disabled: e.disabled,
        status: e.status,
        "aria-autocomplete": "list",
        autocomplete: "off",
        role: "combobox",
        onKeydown: e.onKeydown,
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "aria-owns", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      z(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.disabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: F(() => [
          z(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    z(r, Z({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[1] || (t[1] = (c) => e.modelWrapper = c),
      expanded: e.expanded,
      "onUpdate:expanded": t[2] || (t[2] = (c) => e.expanded = c),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[3] || (t[3] = (c) => e.$emit("load-more"))
    }), {
      default: F(({ menuItem: c }) => [
        A(e.$slots, "menu-item", { menuItem: c })
      ]),
      "no-results": F(() => [
        A(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const El = /* @__PURE__ */ N(Ve, [["render", vo]]), bo = K({
  name: "CdxDialog",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  inheritAttrs: !1,
  props: {
    open: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      required: !0
    },
    subtitle: {
      type: String,
      required: !1,
      default: null
    },
    hideTitle: {
      type: Boolean,
      default: !1
    },
    closeButtonLabel: {
      type: String,
      default: ""
    },
    primaryAction: {
      type: Object,
      default: null
    },
    defaultAction: {
      type: Object,
      default: null
    },
    stackedActions: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:open",
    "primary",
    "default"
  ],
  setup(e, { emit: t }) {
    const n = ne("dialog-label"), s = f(), a = f(), u = f(), l = f(), i = f(), o = p(() => !e.hideTitle || !!e.closeButtonLabel), r = p(() => !!e.primaryAction || !!e.defaultAction), c = p(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions
    })), C = f(0);
    function y() {
      t("update:open", !1);
    }
    function D() {
      R(s.value);
    }
    function k() {
      R(s.value, !0);
    }
    function R(B, S = !1) {
      let M = Array.from(
        B.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      S && (M = M.reverse());
      for (const E of M)
        if (E.focus(), document.activeElement === E)
          return !0;
      return !1;
    }
    return te(Q(e, "open"), (B) => {
      B ? (C.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${C.value}px`), document.body.classList.add("cdx-dialog-open"), ge(() => {
        var S;
        R(a.value) || (S = u.value) == null || S.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), {
      close: y,
      cdxIconClose: lt,
      labelId: n,
      rootClasses: c,
      dialogElement: s,
      focusTrapStart: l,
      focusTrapEnd: i,
      focusFirst: D,
      focusLast: k,
      dialogBody: a,
      focusHolder: u,
      showHeader: o,
      showFooterActions: r
    };
  }
});
const go = ["aria-label", "aria-labelledby"], yo = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, Co = ["id"], _o = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, $o = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Ao = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Io = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Bo(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-button");
  return d(), L(Me, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: F(() => [
      e.open ? (d(), m("div", {
        key: 0,
        class: "cdx-dialog-backdrop",
        onClick: t[5] || (t[5] = (...o) => e.close && e.close(...o)),
        onKeyup: t[6] || (t[6] = Y((...o) => e.close && e.close(...o), ["escape"]))
      }, [
        v("div", {
          ref: "focusTrapStart",
          tabindex: "0",
          onFocus: t[0] || (t[0] = (...o) => e.focusLast && e.focusLast(...o))
        }, null, 544),
        v("div", Z({
          ref: "dialogElement",
          class: ["cdx-dialog", e.rootClasses],
          role: "dialog"
        }, e.$attrs, {
          "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
          "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
          onClick: t[3] || (t[3] = X(() => {
          }, ["stop"]))
        }), [
          e.showHeader || e.$slots.header ? (d(), m("header", {
            key: 0,
            class: V(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            A(e.$slots, "header", {}, () => [
              e.hideTitle ? $("", !0) : (d(), m("div", yo, [
                v("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, H(e.title), 9, Co),
                e.subtitle ? (d(), m("p", _o, H(e.subtitle), 1)) : $("", !0)
              ])),
              e.closeButtonLabel ? (d(), L(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: F(() => [
                  z(l, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : $("", !0)
            ])
          ], 2)) : $("", !0),
          v("div", $o, null, 512),
          v("div", {
            ref: "dialogBody",
            class: V(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            A(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (d(), m("footer", {
            key: 1,
            class: V(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            A(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (d(), m("p", Ao, [
                A(e.$slots, "footer-text")
              ])) : $("", !0),
              e.showFooterActions ? (d(), m("div", Io, [
                e.primaryAction ? (d(), L(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                }, {
                  default: F(() => [
                    oe(H(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : $("", !0),
                e.defaultAction ? (d(), L(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                }, {
                  default: F(() => [
                    oe(H(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2)) : $("", !0)
        ], 16, go),
        v("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
        }, null, 544)
      ], 32)) : $("", !0)
    ]),
    _: 3
  });
}
const Tl = /* @__PURE__ */ N(bo, [["render", Bo]]), wo = se(Ae), Fe = K({
  name: "CdxLookup",
  components: {
    CdxMenu: Ie,
    CdxTextInput: Te
  },
  inheritAttrs: !1,
  props: {
    selected: {
      type: [String, Number, null],
      required: !0
    },
    menuItems: {
      type: Array,
      required: !0
    },
    initialInputValue: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: String,
      default: "default",
      validator: wo
    }
  },
  emits: [
    "update:selected",
    "input",
    "load-more"
  ],
  setup: (e, { emit: t, attrs: n, slots: s }) => {
    const a = f(), u = f(), l = ne("lookup-menu"), i = f(!1), o = f(!1), r = f(!1), c = Q(e, "selected"), C = ue(c, t, "update:selected"), y = p(
      () => e.menuItems.find((h) => h.value === e.selected)
    ), D = p(() => {
      var h, x;
      return (x = (h = u.value) == null ? void 0 : h.getHighlightedMenuItem()) == null ? void 0 : x.id;
    }), k = f(e.initialInputValue), R = Le(a), B = p(() => {
      var h;
      return `${(h = R.value.width) != null ? h : 0}px`;
    }), S = p(() => ({
      "cdx-lookup--disabled": e.disabled,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: M,
      rootStyle: E,
      otherAttrs: le
    } = pe(n, S);
    function P(h) {
      y.value && y.value.label !== h && y.value.value !== h && (C.value = null), h === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", h);
    }
    function U() {
      r.value = !0, k.value !== null && k.value !== "" && (e.menuItems.length > 0 || s["no-results"]) && (o.value = !0);
    }
    function J() {
      r.value = !1, o.value = !1;
    }
    function g(h) {
      !u.value || e.disabled || e.menuItems.length === 0 && !s["no-results"] || h.key === " " || u.value.delegateKeyNavigation(h);
    }
    return te(c, (h) => {
      if (h !== null) {
        const x = y.value ? y.value.label || y.value.value : "";
        k.value !== x && (k.value = x, t("input", k.value));
      }
    }), te(Q(e, "menuItems"), (h) => {
      r.value && i.value && (h.length > 0 || s["no-results"]) && (o.value = !0), h.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: a,
      currentWidthInPx: B,
      menu: u,
      menuId: l,
      highlightedId: D,
      inputValue: k,
      modelWrapper: C,
      expanded: o,
      onInputBlur: J,
      rootClasses: M,
      rootStyle: E,
      otherAttrs: le,
      onUpdateInput: P,
      onInputFocus: U,
      onKeydown: g
    };
  }
}), Qe = () => {
  Ee((e) => ({
    "51c485f8": e.currentWidthInPx
  }));
}, Ge = Fe.setup;
Fe.setup = Ge ? (e, t) => (Qe(), Ge(e, t)) : Qe;
function ko(e, t, n, s, a, u) {
  const l = I("cdx-text-input"), i = I("cdx-menu");
  return d(), m("div", {
    ref: "rootElement",
    class: V(["cdx-lookup", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    z(l, Z({
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.inputValue = o)
    }, e.otherAttrs, {
      class: "cdx-lookup__input",
      role: "combobox",
      autocomplete: "off",
      "aria-autocomplete": "list",
      "aria-controls": e.menuId,
      "aria-owns": e.menuId,
      "aria-expanded": e.expanded,
      "aria-activedescendant": e.highlightedId,
      disabled: e.disabled,
      status: e.status,
      "onUpdate:modelValue": e.onUpdateInput,
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-owns", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    z(i, Z({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[1] || (t[1] = (o) => e.modelWrapper = o),
      expanded: e.expanded,
      "onUpdate:expanded": t[2] || (t[2] = (o) => e.expanded = o),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[3] || (t[3] = (o) => e.$emit("load-more"))
    }), {
      default: F(({ menuItem: o }) => [
        A(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": F(() => [
        A(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Ll = /* @__PURE__ */ N(Fe, [["render", ko]]), xo = {
  notice: Pt,
  error: at,
  warning: ot,
  success: ut
}, So = K({
  name: "CdxMessage",
  components: { CdxButton: ve, CdxIcon: G },
  props: {
    type: {
      type: String,
      default: "notice",
      validator: et
    },
    inline: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: [String, Object],
      default: null
    },
    fadeIn: {
      type: Boolean,
      default: !1
    },
    dismissButtonLabel: {
      type: String,
      default: ""
    },
    autoDismiss: {
      type: [Boolean, Number],
      default: !1,
      validator: (e) => typeof e == "boolean" || typeof e == "number" && e > 0
    }
  },
  emits: [
    "user-dismissed",
    "auto-dismissed"
  ],
  setup(e, { emit: t }) {
    const n = f(!1), s = p(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), a = p(() => e.autoDismiss === !1 ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), u = p(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), l = p(
      () => e.icon && e.type === "notice" ? e.icon : xo[e.type]
    ), i = f("");
    function o(r) {
      n.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return re(() => {
      a.value && setTimeout(() => o("auto-dismissed"), a.value);
    }), {
      dismissed: n,
      userDismissable: s,
      rootClasses: u,
      leaveActiveClass: i,
      computedIcon: l,
      onDismiss: o,
      cdxIconClose: lt
    };
  }
});
const Mo = ["aria-live", "role"], Do = { class: "cdx-message__content" };
function Eo(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-button");
  return d(), L(Me, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: F(() => [
      e.dismissed ? $("", !0) : (d(), m("div", {
        key: 0,
        class: V(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        z(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        v("div", Do, [
          A(e.$slots, "default")
        ]),
        e.userDismissable ? (d(), L(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: F(() => [
            z(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : $("", !0)
      ], 10, Mo))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const Vl = /* @__PURE__ */ N(So, [["render", Eo]]), To = K({
  name: "CdxRadio",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = p(() => ({
      "cdx-radio--inline": e.inline
    })), s = f(), a = ne("radio"), u = () => {
      s.value.focus();
    }, l = ue(Q(e, "modelValue"), t);
    return {
      rootClasses: n,
      input: s,
      radioId: a,
      focusInput: u,
      wrappedModel: l
    };
  }
});
const Lo = ["id", "name", "value", "disabled"], Vo = /* @__PURE__ */ v("span", { class: "cdx-radio__icon" }, null, -1), Fo = ["for"];
function Ko(e, t, n, s, a, u) {
  return d(), m("span", {
    class: V(["cdx-radio", e.rootClasses])
  }, [
    de(v("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-radio__input",
      type: "radio",
      name: e.name,
      value: e.inputValue,
      disabled: e.disabled
    }, null, 8, Lo), [
      [$t, e.wrappedModel]
    ]),
    Vo,
    v("label", {
      class: "cdx-radio__label",
      for: e.radioId,
      onClick: t[1] || (t[1] = (...l) => e.focusInput && e.focusInput(...l))
    }, [
      A(e.$slots, "default")
    ], 8, Fo)
  ], 2);
}
const Fl = /* @__PURE__ */ N(To, [["render", Ko]]), No = se(Ae), Ro = K({
  name: "CdxSearchInput",
  components: {
    CdxButton: ve,
    CdxTextInput: Te
  },
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    buttonLabel: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "default",
      validator: No
    }
  },
  emits: [
    "update:modelValue",
    "submit-click"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = ue(Q(e, "modelValue"), t), a = p(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i
    } = pe(n, a);
    return {
      wrappedModel: s,
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i,
      handleSubmit: () => {
        t("submit-click", s.value);
      },
      searchIcon: Zt
    };
  },
  methods: {
    focus() {
      this.$refs.textInput.focus();
    }
  }
});
const Oo = { class: "cdx-search-input__input-wrapper" };
function qo(e, t, n, s, a, u) {
  const l = I("cdx-text-input"), i = I("cdx-button");
  return d(), m("div", {
    class: V(["cdx-search-input", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    v("div", Oo, [
      z(l, Z({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: Y(e.handleSubmit, ["enter"])
      }), null, 16, ["modelValue", "start-icon", "status", "onKeydown"]),
      A(e.$slots, "default")
    ]),
    e.buttonLabel ? (d(), L(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      onClick: e.handleSubmit
    }, {
      default: F(() => [
        oe(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["onClick"])) : $("", !0)
  ], 6);
}
const zo = /* @__PURE__ */ N(Ro, [["render", qo]]), Ke = K({
  name: "CdxSelect",
  components: {
    CdxIcon: G,
    CdxMenu: Ie
  },
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    selected: {
      type: [String, Number, null],
      required: !0
    },
    defaultLabel: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    defaultIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  emits: [
    "update:selected",
    "load-more"
  ],
  setup(e, { emit: t }) {
    const n = f(), s = f(), a = ne("select-handle"), u = ne("select-menu"), l = f(!1), i = ue(Q(e, "selected"), t, "update:selected"), o = p(
      () => e.menuItems.find((M) => M.value === e.selected)
    ), r = p(() => o.value ? o.value.label || o.value.value : e.defaultLabel), c = Le(n), C = p(() => {
      var M;
      return `${(M = c.value.width) != null ? M : 0}px`;
    }), y = p(() => {
      if (e.defaultIcon && !o.value)
        return e.defaultIcon;
      if (o.value && o.value.icon)
        return o.value.icon;
    }), D = p(() => ({
      "cdx-select-vue--enabled": !e.disabled,
      "cdx-select-vue--disabled": e.disabled,
      "cdx-select-vue--expanded": l.value,
      "cdx-select-vue--value-selected": !!o.value,
      "cdx-select-vue--no-selections": !o.value,
      "cdx-select-vue--has-start-icon": !!y.value
    })), k = p(() => {
      var M, E;
      return (E = (M = s.value) == null ? void 0 : M.getHighlightedMenuItem()) == null ? void 0 : E.id;
    });
    function R() {
      l.value = !1;
    }
    function B() {
      var M;
      e.disabled || (l.value = !l.value, (M = n.value) == null || M.focus());
    }
    function S(M) {
      var E;
      e.disabled || (E = s.value) == null || E.delegateKeyNavigation(M);
    }
    return {
      handle: n,
      handleId: a,
      menu: s,
      menuId: u,
      modelWrapper: i,
      selectedMenuItem: o,
      highlightedId: k,
      expanded: l,
      onBlur: R,
      currentLabel: r,
      currentWidthInPx: C,
      rootClasses: D,
      onClick: B,
      onKeydown: S,
      startIcon: y,
      cdxIconExpand: st
    };
  }
}), Ze = () => {
  Ee((e) => ({
    46589886: e.currentWidthInPx
  }));
}, Je = Ke.setup;
Ke.setup = Je ? (e, t) => (Ze(), Je(e, t)) : Ze;
const Ho = ["aria-disabled"], jo = ["aria-owns", "aria-labelledby", "aria-activedescendant", "aria-expanded"], Uo = ["id"];
function Wo(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-menu");
  return d(), m("div", {
    class: V(["cdx-select-vue", e.rootClasses]),
    "aria-disabled": e.disabled
  }, [
    v("div", {
      ref: "handle",
      class: "cdx-select-vue__handle",
      tabindex: "0",
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-owns": e.menuId,
      "aria-labelledby": e.handleId,
      "aria-activedescendant": e.highlightedId,
      "aria-haspopup": "listbox",
      "aria-expanded": e.expanded,
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onKeydown: t[2] || (t[2] = (...o) => e.onKeydown && e.onKeydown(...o))
    }, [
      v("span", {
        id: e.handleId,
        role: "textbox",
        "aria-readonly": "true"
      }, [
        A(e.$slots, "label", {
          selectedMenuItem: e.selectedMenuItem,
          defaultLabel: e.defaultLabel
        }, () => [
          oe(H(e.currentLabel), 1)
        ])
      ], 8, Uo),
      e.startIcon ? (d(), L(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : $("", !0),
      z(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 40, jo),
    z(i, Z({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (o) => e.modelWrapper = o),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (o) => e.expanded = o),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (o) => e.$emit("load-more"))
    }), {
      default: F(({ menuItem: o }) => [
        A(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 10, Ho);
}
const Kl = /* @__PURE__ */ N(Ke, [["render", Wo]]), Po = K({
  name: "CdxTab",
  props: {
    name: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = je(tt), n = je(nt);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, a = p(() => e.name === n.value);
    return {
      tab: s,
      isActive: a
    };
  }
});
const Qo = ["id", "aria-hidden", "aria-labelledby"];
function Go(e, t, n, s, a, u) {
  return de((d(), m("section", {
    id: e.tab.id,
    "aria-hidden": !e.isActive,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    A(e.$slots, "default")
  ], 8, Qo)), [
    [_e, e.isActive]
  ]);
}
const Nl = /* @__PURE__ */ N(Po, [["render", Go]]), Zo = K({
  name: "CdxTabs",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  props: {
    active: {
      type: String,
      required: !0
    },
    framed: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:active"
  ],
  expose: [
    "select",
    "next",
    "prev"
  ],
  setup(e, { slots: t, emit: n }) {
    const s = f(), a = f(), u = f(), l = f(), i = f(), o = it(s), r = p(() => {
      var q;
      const g = [], h = (q = t.default) == null ? void 0 : q.call(t);
      h && h.forEach(x);
      function x(T) {
        T && typeof T == "object" && "type" in T && (typeof T.type == "object" && "name" in T.type && T.type.name === "CdxTab" ? g.push(T) : "children" in T && Array.isArray(T.children) && T.children.forEach(x));
      }
      return g;
    });
    if (!r.value || r.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const c = p(() => r.value.reduce((g, h) => {
      var x;
      if (((x = h.props) == null ? void 0 : x.name) && typeof h.props.name == "string") {
        if (g.get(h.props.name))
          throw new Error("Tab names must be unique");
        g.set(h.props.name, {
          name: h.props.name,
          id: ne(h.props.name),
          label: h.props.label || h.props.name,
          disabled: h.props.disabled
        });
      }
      return g;
    }, /* @__PURE__ */ new Map())), C = ue(Q(e, "active"), n, "update:active"), y = p(() => Array.from(c.value.keys())), D = p(() => y.value.indexOf(C.value)), k = p(() => {
      var g;
      return (g = c.value.get(C.value)) == null ? void 0 : g.id;
    });
    Ue(nt, C), Ue(tt, c);
    const R = f(), B = f(), S = Se(R, { threshold: 0.95 }), M = Se(B, { threshold: 0.95 });
    function E(g, h) {
      const x = g;
      x && (h === 0 ? R.value = x : h === y.value.length - 1 && (B.value = x));
    }
    function le(g) {
      var q;
      const h = g === C.value, x = !!((q = c.value.get(g)) != null && q.disabled);
      return {
        "cdx-tabs__list__item--selected": h,
        "cdx-tabs__list__item--enabled": !x,
        "cdx-tabs__list__item--disabled": x
      };
    }
    const P = p(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function U(g) {
      if (!a.value || !l.value || !i.value)
        return 0;
      const h = o.value === "rtl" ? i.value : l.value, x = o.value === "rtl" ? l.value : i.value, q = g.offsetLeft, T = q + g.clientWidth, ee = a.value.scrollLeft + h.clientWidth, fe = a.value.scrollLeft + a.value.clientWidth - x.clientWidth;
      return q < ee ? q - ee : T > fe ? T - fe : 0;
    }
    function J(g) {
      var T;
      if (!a.value || !l.value || !i.value)
        return;
      const h = g === "next" && o.value === "ltr" || g === "prev" && o.value === "rtl" ? 1 : -1;
      let x = 0, q = g === "next" ? a.value.firstElementChild : a.value.lastElementChild;
      for (; q; ) {
        const ee = g === "next" ? q.nextElementSibling : q.previousElementSibling;
        if (x = U(q), Math.sign(x) === h) {
          ee && Math.abs(x) < 0.25 * a.value.clientWidth && (x = U(ee));
          break;
        }
        q = ee;
      }
      a.value.scrollBy({
        left: x,
        behavior: "smooth"
      }), (T = u.value) == null || T.focus();
    }
    return te(C, () => {
      if (k.value === void 0 || !a.value || !l.value || !i.value)
        return;
      const g = document.getElementById(`${k.value}-label`);
      !g || a.value.scrollBy({
        left: U(g),
        behavior: "smooth"
      });
    }), {
      activeTab: C,
      activeTabIndex: D,
      activeTabId: k,
      currentDirection: o,
      rootElement: s,
      listElement: a,
      focusHolder: u,
      prevScroller: l,
      nextScroller: i,
      rootClasses: P,
      tabNames: y,
      tabsData: c,
      firstLabelVisible: S,
      lastLabelVisible: M,
      getLabelClasses: le,
      assignTemplateRefIfNecessary: E,
      scrollTabs: J,
      cdxIconPrevious: Gt,
      cdxIconNext: Qt
    };
  },
  methods: {
    select(e) {
      const t = this.tabsData.get(e);
      t && !(t != null && t.disabled) && (this.activeTab = e);
    },
    selectNonDisabled(e, t) {
      const n = this.tabsData.get(this.tabNames[e + t]);
      n && (n.disabled ? this.selectNonDisabled(e + t, t) : this.select(n.name));
    },
    next() {
      this.selectNonDisabled(this.activeTabIndex, 1);
    },
    prev() {
      this.selectNonDisabled(this.activeTabIndex, -1);
    },
    onLeftArrowKeypress() {
      this.currentDirection === "rtl" ? this.next() : this.prev();
    },
    onRightArrowKeypress() {
      this.currentDirection === "rtl" ? this.prev() : this.next();
    },
    onDownArrowKeypress() {
      var e;
      this.activeTabId && ((e = document.getElementById(this.activeTabId)) == null || e.focus());
    }
  }
});
const Jo = {
  ref: "focusHolder",
  tabindex: "-1"
}, Xo = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Yo = ["aria-activedescendant"], el = ["id"], tl = ["href", "aria-disabled", "aria-selected", "onClick", "onKeyup"], nl = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, ol = { class: "cdx-tabs__content" };
function ll(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-button");
  return d(), m("div", {
    ref: "rootElement",
    class: V(["cdx-tabs", e.rootClasses])
  }, [
    v("div", {
      class: "cdx-tabs__header",
      tabindex: "0",
      onKeydown: [
        t[4] || (t[4] = Y(X((...o) => e.onRightArrowKeypress && e.onRightArrowKeypress(...o), ["prevent"]), ["right"])),
        t[5] || (t[5] = Y(X((...o) => e.onDownArrowKeypress && e.onDownArrowKeypress(...o), ["prevent"]), ["down"])),
        t[6] || (t[6] = Y(X((...o) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...o), ["prevent"]), ["left"]))
      ]
    }, [
      v("div", Jo, null, 512),
      de(v("div", Xo, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = X(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: F(() => [
            z(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [_e, !e.firstLabelVisible]
      ]),
      v("ul", {
        ref: "listElement",
        class: "cdx-tabs__list",
        role: "tablist",
        "aria-activedescendant": e.activeTabId
      }, [
        (d(!0), m(he, null, $e(e.tabsData.values(), (o, r) => (d(), m("li", {
          id: `${o.id}-label`,
          key: r,
          ref_for: !0,
          ref: (c) => e.assignTemplateRefIfNecessary(c, r),
          class: V([e.getLabelClasses(o.name), "cdx-tabs__list__item"]),
          role: "presentation"
        }, [
          v("a", {
            href: `#${o.id}`,
            role: "tab",
            tabIndex: "-1",
            "aria-disabled": o.disabled,
            "aria-selected": o.name === e.activeTab,
            onClick: X((c) => e.select(o.name), ["prevent"]),
            onKeyup: Y((c) => e.select(o.name), ["enter"])
          }, H(o.label), 41, tl)
        ], 10, el))), 128))
      ], 8, Yo),
      de(v("div", nl, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[2] || (t[2] = X(() => {
          }, ["prevent"])),
          onClick: t[3] || (t[3] = (o) => e.scrollTabs("next"))
        }, {
          default: F(() => [
            z(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [_e, !e.lastLabelVisible]
      ])
    ], 32),
    v("div", ol, [
      A(e.$slots, "default")
    ])
  ], 2);
}
const Rl = /* @__PURE__ */ N(Zo, [["render", ll]]), al = K({
  name: "CdxToggleButton",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    quiet: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = f(!1);
    return {
      rootClasses: p(() => ({
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--is-active": n.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (l) => {
        n.value = l;
      }
    };
  }
});
const sl = ["aria-pressed", "disabled"];
function ul(e, t, n, s, a, u) {
  return d(), m("button", {
    class: V(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = Y((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = Y((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    A(e.$slots, "default")
  ], 42, sl);
}
const il = /* @__PURE__ */ N(al, [["render", ul]]), dl = K({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: G,
    CdxToggleButton: il
  },
  props: {
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    modelValue: {
      type: [String, Number, null, Array],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    function n(a) {
      return Array.isArray(e.modelValue) ? e.modelValue.indexOf(a.value) !== -1 : e.modelValue !== null ? e.modelValue === a.value : !1;
    }
    function s(a, u) {
      if (Array.isArray(e.modelValue)) {
        const l = e.modelValue.indexOf(a.value) !== -1;
        u && !l ? t("update:modelValue", e.modelValue.concat(a.value)) : !u && l && t("update:modelValue", e.modelValue.filter((i) => i !== a.value));
      } else
        u && e.modelValue !== a.value && t("update:modelValue", a.value);
    }
    return {
      getButtonLabel: dt,
      isSelected: n,
      onUpdate: s
    };
  }
});
const rl = { class: "cdx-toggle-button-group" };
function cl(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-toggle-button");
  return d(), m("div", rl, [
    (d(!0), m(he, null, $e(e.buttons, (o) => (d(), L(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: F(() => [
        A(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (d(), L(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          oe(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const Ol = /* @__PURE__ */ N(dl, [["render", cl]]), pl = K({
  name: "CdxToggleSwitch",
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const s = f(), a = ne("toggle-switch"), {
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i
    } = pe(t), o = ue(Q(e, "modelValue"), n);
    return {
      input: s,
      inputId: a,
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i,
      wrappedModel: o,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const fl = ["id", "disabled"], ml = ["for"], hl = /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function vl(e, t, n, s, a, u) {
  return d(), m("span", {
    class: V(["cdx-toggle-switch", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    de(v("input", Z({
      id: e.inputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-toggle-switch__input",
      type: "checkbox",
      disabled: e.disabled
    }, e.otherAttrs, {
      onKeydown: t[1] || (t[1] = Y(X((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
    }), null, 16, fl), [
      [Ye, e.wrappedModel]
    ]),
    e.$slots.default ? (d(), m("label", {
      key: 0,
      for: e.inputId,
      class: "cdx-toggle-switch__label"
    }, [
      A(e.$slots, "default")
    ], 8, ml)) : $("", !0),
    hl
  ], 6);
}
const ql = /* @__PURE__ */ N(pl, [["render", vl]]), bl = K({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: G,
    CdxMenu: Ie,
    CdxSearchInput: zo
  },
  inheritAttrs: !1,
  props: {
    id: {
      type: String,
      required: !0
    },
    formAction: {
      type: String,
      required: !0
    },
    searchResultsLabel: {
      type: String,
      required: !0
    },
    searchResults: {
      type: Array,
      required: !0
    },
    buttonLabel: {
      type: String,
      default: ""
    },
    initialInputValue: {
      type: String,
      default: ""
    },
    searchFooterUrl: {
      type: String,
      default: ""
    },
    debounceInterval: {
      type: Number,
      default: St
    },
    highlightQuery: {
      type: Boolean,
      default: !1
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    autoExpandWidth: {
      type: Boolean,
      default: !1
    },
    visibleItemLimit: {
      type: Number,
      default: null
    }
  },
  emits: [
    "input",
    "search-result-click",
    "submit",
    "load-more"
  ],
  setup(e, { attrs: t, emit: n, slots: s }) {
    const { searchResults: a, searchFooterUrl: u, debounceInterval: l } = At(e), i = f(), o = f(), r = ne("typeahead-search-menu"), c = f(!1), C = f(!1), y = f(!1), D = f(!1), k = f(e.initialInputValue), R = f(""), B = p(() => {
      var _, W;
      return (W = (_ = o.value) == null ? void 0 : _.getHighlightedMenuItem()) == null ? void 0 : W.id;
    }), S = f(null), M = p(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), E = p(
      () => e.searchResults.find(
        (_) => _.value === S.value
      )
    ), le = p(
      () => u.value ? { value: me, url: u.value } : void 0
    ), P = p(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": c.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: U,
      rootStyle: J,
      otherAttrs: g
    } = pe(t, P);
    function h(_) {
      return _;
    }
    const x = p(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let q, T;
    function ee(_, W = !1) {
      E.value && E.value.label !== _ && E.value.value !== _ && (S.value = null), T !== void 0 && (clearTimeout(T), T = void 0), _ === "" ? c.value = !1 : (C.value = !0, s["search-results-pending"] && (T = setTimeout(() => {
        D.value && (c.value = !0), y.value = !0;
      }, Mt))), q !== void 0 && (clearTimeout(q), q = void 0);
      const ae = () => {
        n("input", _);
      };
      W ? ae() : q = setTimeout(() => {
        ae();
      }, l.value);
    }
    function fe(_) {
      if (_ === me) {
        S.value = null, k.value = R.value;
        return;
      }
      S.value = _, _ !== null && (k.value = E.value ? E.value.label || String(E.value.value) : "");
    }
    function b() {
      D.value = !0, (R.value || y.value) && (c.value = !0);
    }
    function w() {
      D.value = !1, c.value = !1;
    }
    function O(_) {
      const Ne = _, { id: W } = Ne, ae = Ce(Ne, ["id"]);
      if (ae.value === me) {
        n("search-result-click", {
          searchResult: null,
          index: a.value.length,
          numberOfResults: a.value.length
        });
        return;
      }
      j(ae);
    }
    function j(_) {
      const W = {
        searchResult: _,
        index: a.value.findIndex(
          (ae) => ae.value === _.value
        ),
        numberOfResults: a.value.length
      };
      n("search-result-click", W);
    }
    function be(_) {
      if (_.value === me) {
        k.value = R.value;
        return;
      }
      k.value = _.value ? _.label || String(_.value) : "";
    }
    function ie(_) {
      var W;
      c.value = !1, (W = o.value) == null || W.clearActive(), O(_);
    }
    function ft(_) {
      if (E.value)
        j(E.value), _.stopPropagation(), window.location.assign(E.value.url), _.preventDefault();
      else {
        const W = {
          searchResult: null,
          index: -1,
          numberOfResults: a.value.length
        };
        n("submit", W);
      }
    }
    function mt(_) {
      if (!o.value || !R.value || _.key === " ")
        return;
      const W = o.value.getHighlightedMenuItem(), ae = o.value.getHighlightedViaKeyboard();
      switch (_.key) {
        case "Enter":
          W && (W.value === me && ae ? window.location.assign(u.value) : o.value.delegateKeyNavigation(_, !1)), c.value = !1;
          break;
        case "Tab":
          c.value = !1;
          break;
        default:
          o.value.delegateKeyNavigation(_);
          break;
      }
    }
    return re(() => {
      e.initialInputValue && ee(e.initialInputValue, !0);
    }), te(Q(e, "searchResults"), () => {
      R.value = k.value.trim(), D.value && C.value && R.value.length > 0 && (c.value = !0), T !== void 0 && (clearTimeout(T), T = void 0), C.value = !1, y.value = !1;
    }), {
      form: i,
      menu: o,
      menuId: r,
      highlightedId: B,
      selection: S,
      menuMessageClass: M,
      footer: le,
      asSearchResult: h,
      inputValue: k,
      searchQuery: R,
      expanded: c,
      showPending: y,
      rootClasses: U,
      rootStyle: J,
      otherAttrs: g,
      menuConfig: x,
      onUpdateInputValue: ee,
      onUpdateMenuSelection: fe,
      onFocus: b,
      onBlur: w,
      onSearchResultClick: O,
      onSearchResultKeyboardNavigation: be,
      onSearchFooterClick: ie,
      onSubmit: ft,
      onKeydown: mt,
      MenuFooterValue: me,
      articleIcon: jt
    };
  },
  methods: {
    focus() {
      this.$refs.searchInput.focus();
    }
  }
});
const gl = ["id", "action"], yl = { class: "cdx-typeahead-search__menu-message__text" }, Cl = { class: "cdx-typeahead-search__menu-message__text" }, _l = ["href", "onClickCapture"], $l = { class: "cdx-typeahead-search__search-footer__text" }, Al = { class: "cdx-typeahead-search__search-footer__query" };
function Il(e, t, n, s, a, u) {
  const l = I("cdx-icon"), i = I("cdx-menu"), o = I("cdx-search-input");
  return d(), m("div", {
    class: V(["cdx-typeahead-search", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    v("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      z(o, Z({
        ref: "searchInput",
        modelValue: e.inputValue,
        "onUpdate:modelValue": t[3] || (t[3] = (r) => e.inputValue = r),
        "button-label": e.buttonLabel
      }, e.otherAttrs, {
        class: "cdx-typeahead-search__input",
        name: "search",
        role: "combobox",
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-owns": e.menuId,
        "aria-expanded": e.expanded,
        "aria-activedescendant": e.highlightedId,
        "onUpdate:modelValue": e.onUpdateInputValue,
        onFocus: e.onFocus,
        onBlur: e.onBlur,
        onKeydown: e.onKeydown
      }), {
        default: F(() => [
          z(i, Z({
            id: e.menuId,
            ref: "menu",
            expanded: e.expanded,
            "onUpdate:expanded": t[0] || (t[0] = (r) => e.expanded = r),
            "show-pending": e.showPending,
            selected: e.selection,
            "menu-items": e.searchResults,
            footer: e.footer,
            "search-query": e.highlightQuery ? e.searchQuery : "",
            "show-no-results-slot": e.searchQuery.length > 0 && e.searchResults.length === 0 && e.$slots["search-no-results-text"] && e.$slots["search-no-results-text"]().length > 0
          }, e.menuConfig, {
            "aria-label": e.searchResultsLabel,
            "onUpdate:selected": e.onUpdateMenuSelection,
            onMenuItemClick: t[1] || (t[1] = (r) => e.onSearchResultClick(e.asSearchResult(r))),
            onMenuItemKeyboardNavigation: e.onSearchResultKeyboardNavigation,
            onLoadMore: t[2] || (t[2] = (r) => e.$emit("load-more"))
          }), {
            pending: F(() => [
              v("div", {
                class: V(["cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", yl, [
                  A(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": F(() => [
              v("div", {
                class: V(["cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", Cl, [
                  A(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: F(({ menuItem: r, active: c }) => [
              r.value === e.MenuFooterValue ? (d(), m("a", {
                key: 0,
                class: V(["cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": c
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: X((C) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                z(l, {
                  class: "cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                v("span", $l, [
                  A(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    v("strong", Al, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, _l)) : $("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-owns", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      A(e.$slots, "default")
    ], 40, gl)
  ], 6);
}
const zl = /* @__PURE__ */ N(bl, [["render", Il]]);
export {
  ve as CdxButton,
  kl as CdxButtonGroup,
  xl as CdxCard,
  Sl as CdxCheckbox,
  El as CdxCombobox,
  Tl as CdxDialog,
  G as CdxIcon,
  Ml as CdxInfoChip,
  Ll as CdxLookup,
  Ie as CdxMenu,
  Jn as CdxMenuItem,
  Vl as CdxMessage,
  oo as CdxProgressBar,
  Fl as CdxRadio,
  zo as CdxSearchInput,
  zn as CdxSearchResultTitle,
  Kl as CdxSelect,
  Nl as CdxTab,
  Rl as CdxTabs,
  Te as CdxTextInput,
  rt as CdxThumbnail,
  il as CdxToggleButton,
  Ol as CdxToggleButtonGroup,
  ql as CdxToggleSwitch,
  zl as CdxTypeaheadSearch,
  Dl as stringHelpers,
  it as useComputedDirection,
  Yt as useComputedLanguage,
  ne as useGeneratedId,
  Se as useIntersectionObserver,
  ue as useModelWrapper,
  Le as useResizeObserver,
  pe as useSplitAttributes
};
