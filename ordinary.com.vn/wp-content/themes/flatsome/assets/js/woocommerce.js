! function() {
    var t, e, o, i, r = {
            634: function() {
                Flatsome.behavior("equalize-box", {
                    attach(t) {
                        let e = {
                            ScreenSize: {
                                LARGE: 1,
                                MEDIUM: 2,
                                SMALL: 3
                            },
                            equalizeItems: function(t) {
                                const e = this;
                                e.maxHeight = 0, e.rowEnd = e.disablePerRow ? e.boxCount : e.colPerRow, e.$items = [], e.rating = {
                                    present: !1,
                                    height: 0,
                                    dummy: null
                                }, e.swatches = {
                                    present: !1,
                                    height: 0,
                                    dummy: null
                                }, jQuery(t, e.currentElement).each((function(t) {
                                    const o = jQuery(this);
                                    e.$items.push(o), o.height(""), o.children(".js-star-rating").remove();
                                    const i = o.children(".star-rating");
                                    var r;
                                    i.length && (e.rating.present = !0, e.rating.height = i.height(), e.rating.dummy = null !== (r = e.rating.dummy) && void 0 !== r ? r : '<div class="js-star-rating ' + i.attr("class") + '" style="opacity: 0; visibility: hidden"></div>'), o.children(".js-ux-swatches").remove();
                                    const n = o.children(".ux-swatches.ux-swatches-in-loop");
                                    var a;
                                    n.length && (e.swatches.present = !0, e.swatches.height = n.height(), e.swatches.dummy = null !== (a = e.swatches.dummy) && void 0 !== a ? a : '<div class="js-ux-swatches ' + n.attr("class") + '" style="opacity: 0; visibility: hidden"><div class="' + n.find(".ux-swatch").attr("class") + '"></div></div>'), o.height() > e.maxHeight && (e.maxHeight = o.height()), t !== e.rowEnd - 1 && t !== e.boxCount - 1 || (e.$items.forEach((function(t) {
                                        t.height(e.maxHeight), e.maybeAddDummyRating(t), e.maybeAddDummySwatches(t)
                                    })), e.rowEnd += e.colPerRow, e.maxHeight = 0, e.$items = [], e.rating.present = !1, e.swatches.present = !1)
                                }))
                            },
                            getColsPerRow: function() {
                                const t = jQuery(this.currentElement).attr("class"),
                                    e = /large-columns-(\d+)/g,
                                    o = /medium-columns-(\d+)/g,
                                    i = /small-columns-(\d+)/g;
                                let r;
                                switch (this.getScreenSize()) {
                                    case this.ScreenSize.LARGE:
                                        return r = e.exec(t), r ? parseInt(r[1]) : 3;
                                    case this.ScreenSize.MEDIUM:
                                        return r = o.exec(t), r ? parseInt(r[1]) : 3;
                                    case this.ScreenSize.SMALL:
                                        return r = i.exec(t), r ? parseInt(r[1]) : 2
                                }
                            },
                            maybeAddDummyRating: function(t) {
                                let e = t;
                                this.rating.present && e.hasClass("price-wrapper") && (e.children(".star-rating").length || (e.prepend(this.rating.dummy), e.children(".js-star-rating").height(this.rating.height)))
                            },
                            maybeAddDummySwatches: function(t) {
                                const e = t;
                                this.swatches.present && (e.children(".ux-swatches.ux-swatches-in-loop").length || (e.prepend(this.swatches.dummy), e.children(".js-ux-swatches").height(this.swatches.height)))
                            },
                            getScreenSize: function() {
                                return window.matchMedia("(min-width: 850px)").matches ? this.ScreenSize.LARGE : window.matchMedia("(min-width: 550px) and (max-width: 849px)").matches ? this.ScreenSize.MEDIUM : window.matchMedia("(max-width: 549px)").matches ? this.ScreenSize.SMALL : void 0
                            },
                            init: function() {
                                const e = this,
                                    o = [".product-title", ".price-wrapper", ".box-excerpt", ".add-to-cart-button"];
                                jQuery(".equalize-box", t).each(((t, i) => {
                                    e.currentElement = i, e.colPerRow = e.getColsPerRow(), 1 !== e.colPerRow && (e.disablePerRow = jQuery(i).hasClass("row-slider") || jQuery(i).hasClass("row-grid"), e.boxCount = jQuery(".box-text", e.currentElement).length, o.forEach((t => {
                                        e.equalizeItems(".box-text " + t)
                                    })), e.equalizeItems(".box-text"))
                                }))
                            }
                        };
                        e.init(), jQuery(window).on("resize", (() => {
                            e.init()
                        })), jQuery(document).on("flatsome-equalize-box", (() => {
                            e.init()
                        }))
                    }
                })
            },
            9222: function() {
                Flatsome.behavior("add-qty", {
                    attach(t) {
                        jQuery(".quantity", t).addQty()
                    }
                })
            },
            6619: function() {
                Flatsome.plugin("addQty", (function(t, e) {
                    const o = jQuery(t);
                    String.prototype.uxGetDecimals || (String.prototype.uxGetDecimals = function() {
                        const t = ("" + this).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
                    }), o.off("click.flatsome", ".plus, .minus").on("click.flatsome", ".plus, .minus", (function() {
                        const t = jQuery(this),
                            e = t.closest(".quantity").find(".qty");
                        let o = parseFloat(e.val()),
                            i = parseFloat(e.attr("max")),
                            r = parseFloat(e.attr("min")),
                            n = e.attr("step");
                        o && "" !== o && "NaN" !== o || (o = 0), "" !== i && "NaN" !== i || (i = ""), "" !== r && "NaN" !== r || (r = 0), "any" !== n && "" !== n && void 0 !== n && "NaN" !== parseFloat(n) || (n = 1), t.is(".plus") ? i && (i === o || o > i) ? e.val(i) : e.val((o + parseFloat(n)).toFixed(n.uxGetDecimals())) : r && (r === o || o < r) ? e.val(r) : o > 0 && e.val((o - parseFloat(n)).toFixed(n.uxGetDecimals())), e.trigger("input"), e.trigger("change")
                    }))
                }))
            },
            9791: function() {
                setTimeout((function() {
                    jQuery(document.body).on("country_to_state_changed", (function() {
                        "undefined" != typeof floatlabels && floatlabels.rebuild()
                    }))
                }), 500)
            },
            86: function() {
                jQuery((function(t) {
                    t(document.body).on("change", ".woocommerce-mini-cart-item .qty", (function() {
                        var e;
                        (e = t(this))[0].checkValidity() ? function(e, o) {
                            const i = e.find(".remove_from_cart_button").attr("data-cart_item_key");
                            i && (e.block({
                                message: null
                            }), t.post(flatsomeVars.ajaxurl, {
                                action: "flatsome_ajax_cart_item_alter_quantity",
                                quantity: o,
                                cart_item_key: i
                            }).done((() => {
                                t(document.body).trigger("updated_wc_div"), t(document.body).trigger("added_to_cart"), e.unblock(), e = null
                            })))
                        }(e.closest(".woocommerce-mini-cart-item"), e.val()) : e[0].reportValidity()
                    }))
                }))
            },
            8484: function() {
                jQuery(document).ready((function() {
                    if (!jQuery(".custom-product-page").length) return;
                    const t = jQuery("#respond p.stars");
                    if (t.length > 1) {
                        const e = t[0].outerHTML;
                        t.remove(), jQuery('select[id="rating"]').hide().before(e)
                    }
                }))
            },
            4850: function() {
                jQuery(document).on("yith_infs_adding_elem", (function(t) {
                    Flatsome.attach(jQuery(".shop-container"))
                }))
            },
            4168: function(t, e, o) {
                var i, r;
                ! function(n, a) {
                    "use strict";
                    i = [o(9567)], r = function(t) {
                        ! function(t) {
                            var e, o, i, r, n, a, s = {
                                loadingNotice: "Loading image",
                                errorNotice: "The image could not be loaded",
                                errorDuration: 2500,
                                linkAttribute: "href",
                                preventClicks: !0,
                                beforeShow: t.noop,
                                beforeHide: t.noop,
                                onShow: t.noop,
                                onHide: t.noop,
                                onMove: t.noop
                            };

                            function c(e, o) {
                                this.$target = t(e), this.opts = t.extend({}, s, o, this.$target.data()), void 0 === this.isOpen && this._init()
                            }
                            c.prototype._init = function() {
                                this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = t('<div class="easyzoom-flyout" />'), this.$notice = t('<div class="easyzoom-notice" />'), this.$target.on({
                                    "mousemove.easyzoom touchmove.easyzoom": t.proxy(this._onMove, this),
                                    "mouseleave.easyzoom touchend.easyzoom": t.proxy(this._onLeave, this),
                                    "mouseenter.easyzoom touchstart.easyzoom": t.proxy(this._onEnter, this)
                                }), this.opts.preventClicks && this.$target.on("click.easyzoom", (function(t) {
                                    t.preventDefault()
                                }))
                            }, c.prototype.show = function(t, n) {
                                var a = this;
                                if (!1 !== this.opts.beforeShow.call(this)) {
                                    if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), (function() {
                                        !a.isMouseOver && n || a.show(t)
                                    }));
                                    this.$target.append(this.$flyout);
                                    var s = this.$target.outerWidth(),
                                        c = this.$target.outerHeight(),
                                        l = this.$flyout.width(),
                                        u = this.$flyout.height(),
                                        d = this.$zoom.width(),
                                        h = this.$zoom.height();
                                    e = Math.ceil(d - l), o = Math.ceil(h - u), i = (e = e < 0 ? 0 : e) / s, r = (o = o < 0 ? 0 : o) / c, this.isOpen = !0, this.opts.onShow.call(this), t && this._move(t)
                                }
                            }, c.prototype._onEnter = function(t) {
                                var e = t.originalEvent.touches;
                                this.isMouseOver = !0, e && 1 != e.length || (t.preventDefault(), this.show(t, !0))
                            }, c.prototype._onMove = function(t) {
                                this.isOpen && (t.preventDefault(), this._move(t))
                            }, c.prototype._onLeave = function() {
                                this.isMouseOver = !1, this.isOpen && this.hide()
                            }, c.prototype._onLoad = function(t) {
                                t.currentTarget.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), t.data.call && t.data())
                            }, c.prototype._onError = function() {
                                var t = this;
                                this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout((function() {
                                    t.$notice.detach(), t.detachNotice = null
                                }), this.opts.errorDuration)
                            }, c.prototype._loadImage = function(e, o) {
                                var i = new Image;
                                this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = t(i).on("error", t.proxy(this._onError, this)).on("load", o, t.proxy(this._onLoad, this)), i.style.position = "absolute", i.src = e
                            }, c.prototype._move = function(t) {
                                a = 0 === t.type.indexOf("touch") ? (s = t.touches || t.originalEvent.touches, n = s[0].pageX, s[0].pageY) : (n = t.pageX || n, t.pageY || a);
                                var s = this.$target.offset();
                                t = n - s.left, s = a - s.top, t = Math.ceil(t * i), s = Math.ceil(s * r), t < 0 || s < 0 || e < t || o < s ? this.hide() : (s *= -1, t *= -1, "transform" in document.body.style ? this.$zoom.css({
                                    transform: "translate(" + t + "px, " + s + "px)"
                                }) : this.$zoom.css({
                                    top: s,
                                    left: t
                                }), this.opts.onMove.call(this, s, t))
                            }, c.prototype.hide = function() {
                                this.isOpen && !1 !== this.opts.beforeHide.call(this) && (this.$flyout.detach(), this.isOpen = !1, this.opts.onHide.call(this))
                            }, c.prototype.swap = function(e, o, i) {
                                this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
                                    src: e,
                                    srcset: t.isArray(i) ? i.join() : i
                                }), this.$link.attr(this.opts.linkAttribute, o)
                            }, c.prototype.teardown = function() {
                                this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, delete this.isReady
                            }, t.fn.easyZoom = function(e) {
                                return this.each((function() {
                                    var o = t.data(this, "easyZoom");
                                    o ? void 0 === o.isOpen && o._init() : t.data(this, "easyZoom", new c(this, e))
                                }))
                            }
                        }(t)
                    }.apply(e, i), void 0 === r || (t.exports = r)
                }()
            },
            9567: function(t) {
                "use strict";
                t.exports = window.jQuery
            }
        },
        n = {};

    function a(t) {
        var e = n[t];
        if (void 0 !== e) return e.exports;
        var o = n[t] = {
            exports: {}
        };
        return r[t].call(o.exports, o, o.exports, a), o.exports
    }
    a.m = r, e = Object.getPrototypeOf ? function(t) {
            return Object.getPrototypeOf(t)
        } : function(t) {
            return t.__proto__
        }, a.t = function(o, i) {
            if (1 & i && (o = this(o)), 8 & i) return o;
            if ("object" == typeof o && o) {
                if (4 & i && o.__esModule) return o;
                if (16 & i && "function" == typeof o.then) return o
            }
            var r = Object.create(null);
            a.r(r);
            var n = {};
            t = t || [null, e({}), e([]), e(e)];
            for (var s = 2 & i && o;
                "object" == typeof s && !~t.indexOf(s); s = e(s)) Object.getOwnPropertyNames(s).forEach((function(t) {
                n[t] = function() {
                    return o[t]
                }
            }));
            return n.default = function() {
                return o
            }, a.d(r, n), r
        }, a.d = function(t, e) {
            for (var o in e) a.o(e, o) && !a.o(t, o) && Object.defineProperty(t, o, {
                enumerable: !0,
                get: e[o]
            })
        }, a.f = {}, a.e = function(t) {
            return Promise.all(Object.keys(a.f).reduce((function(e, o) {
                return a.f[o](t, e), e
            }), []))
        }, a.u = function(t) {
            return "js/chunk.popups.js"
        }, a.miniCssF = function(t) {}, a.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, o = {}, i = "flatsome:", a.l = function(t, e, r, n) {
            if (o[t]) o[t].push(e);
            else {
                var s, c;
                if (void 0 !== r)
                    for (var l = document.getElementsByTagName("script"), u = 0; u < l.length; u++) {
                        var d = l[u];
                        if (d.getAttribute("src") == t || d.getAttribute("data-webpack") == i + r) {
                            s = d;
                            break
                        }
                    }
                s || (c = !0, (s = document.createElement("script")).charset = "utf-8", s.timeout = 120, a.nc && s.setAttribute("nonce", a.nc), s.setAttribute("data-webpack", i + r), s.src = t), o[t] = [e];
                var h = function(e, i) {
                        s.onerror = s.onload = null, clearTimeout(m);
                        var r = o[t];
                        if (delete o[t], s.parentNode && s.parentNode.removeChild(s), r && r.forEach((function(t) {
                                return t(i)
                            })), e) return e(i)
                    },
                    m = setTimeout(h.bind(null, void 0, {
                        type: "timeout",
                        target: s
                    }), 12e4);
                s.onerror = h.bind(null, s.onerror), s.onload = h.bind(null, s.onload), c && document.head.appendChild(s)
            }
        }, a.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        },
        function() {
            const t = a.u;
            a.u = e => {
                const o = t(e),
                    i = globalThis.flatsomeVars ? .theme.version;
                return o + (i ? "?ver=" + i : "")
            }
        }(), a.p = globalThis.flatsomeVars ? .assets_url ? ? "/",
        function() {
            var t = {
                960: 0
            };
            a.f.j = function(e, o) {
                var i = a.o(t, e) ? t[e] : void 0;
                if (0 !== i)
                    if (i) o.push(i[2]);
                    else {
                        var r = new Promise((function(o, r) {
                            i = t[e] = [o, r]
                        }));
                        o.push(i[2] = r);
                        var n = a.p + a.u(e),
                            s = new Error;
                        a.l(n, (function(o) {
                            if (a.o(t, e) && (0 !== (i = t[e]) && (t[e] = void 0), i)) {
                                var r = o && ("load" === o.type ? "missing" : o.type),
                                    n = o && o.target && o.target.src;
                                s.message = "Loading chunk " + e + " failed.\n(" + r + ": " + n + ")", s.name = "ChunkLoadError", s.type = r, s.request = n, i[1](s)
                            }
                        }), "chunk-" + e, e)
                    }
            };
            var e = function(e, o) {
                    var i, r, n = o[0],
                        s = o[1],
                        c = o[2],
                        l = 0;
                    if (n.some((function(e) {
                            return 0 !== t[e]
                        }))) {
                        for (i in s) a.o(s, i) && (a.m[i] = s[i]);
                        c && c(a)
                    }
                    for (e && e(o); l < n.length; l++) r = n[l], a.o(t, r) && t[r] && t[r][0](), t[r] = 0
                },
                o = self.flatsomeChunks = self.flatsomeChunks || [];
            o.forEach(e.bind(null, 0)), o.push = e.bind(null, o.push.bind(o))
        }(),
        function() {
            "use strict";
            a(6619), a(9222), a(634);
            const t = window.matchMedia("(prefers-reduced-motion: reduce)");
            let e = !1;

            function o() {
                e = "undefined" == typeof UxBuilder && t.matches
            }

            function i() {
                return jQuery.fn.magnificPopup ? Promise.resolve() : a.e(964).then(a.t.bind(a, 4343, 23))
            }
            o(), t.addEventListener ? .("change", o), jQuery.loadMagnificPopup = i, jQuery.fn.lazyMagnificPopup = function(t) {
                const e = jQuery(this),
                    o = t.delegate ? e.find(t.delegate) : e;
                return o.one("click", (r => {
                    r.preventDefault(), i().then((() => {
                        e.data("magnificPopup") || e.magnificPopup(t), e.magnificPopup("open", o.index(r.currentTarget) || 0)
                    }))
                })), e
            }, Flatsome.behavior("quick-view", {
                attach: function(t) {
                    "uxBuilder" !== jQuery("html").attr("ng-app") && jQuery(".quick-view", t).each((function(t, o) {
                        jQuery(o).hasClass("quick-view-added") || (jQuery(o).on("click", (function(t) {
                            if ("" != jQuery(this).attr("data-prod")) {
                                jQuery(this).parent().parent().addClass("processing");
                                var r = {
                                    action: "flatsome_quickview",
                                    product: jQuery(this).attr("data-prod")
                                };
                                jQuery.post(flatsomeVars.ajaxurl, r, (function(t) {
                                    i().then((() => {
                                        jQuery(".processing").removeClass("processing"), jQuery.magnificPopup.open({
                                            removalDelay: 300,
                                            autoFocusLast: !1,
                                            closeMarkup: flatsomeVars.lightbox.close_markup,
                                            closeBtnInside: flatsomeVars.lightbox.close_btn_inside,
                                            items: {
                                                src: '<div class="product-lightbox lightbox-content">' + t + "</div>",
                                                type: "inline"
                                            },
                                            callbacks: {
                                                afterClose: () => {
                                                    jQuery(o).closest(".box").find(".box-text a:first").trigger("focus")
                                                }
                                            }
                                        }), setTimeout((function() {
                                            const t = jQuery(".product-lightbox");
                                            t.imagesLoaded((function() {
                                                const t = {
                                                    cellAlign: "left",
                                                    wrapAround: !0,
                                                    autoPlay: !1,
                                                    prevNextButtons: !0,
                                                    adaptiveHeight: !0,
                                                    imagesLoaded: !0,
                                                    dragThreshold: 15,
                                                    rightToLeft: flatsomeVars.rtl
                                                };
                                                e && (t.friction = 1, t.selectedAttraction = 1), jQuery(".product-lightbox .slider").lazyFlickity(t)
                                            })), Flatsome.attach("tooltips", t)
                                        }), 300);
                                        let i = jQuery(".product-lightbox form.variations_form");
                                        jQuery(".product-lightbox form").hasClass("variations_form") && i.wc_variation_form();
                                        let r = jQuery(".product-lightbox .product-gallery-slider"),
                                            n = jQuery(".product-lightbox .product-gallery-slider .slide.first img"),
                                            a = jQuery(".product-lightbox .product-gallery-slider .slide.first a"),
                                            s = n.attr("data-src") ? n.attr("data-src") : n.attr("src");
                                        const c = jQuery.Deferred();
                                        r.one("flatsome-flickity-ready", (() => c.resolve()));
                                        let l = function() {
                                                r.data("flickity") && r.flickity("select", 0)
                                            },
                                            u = function() {
                                                r.data("flickity") && r.imagesLoaded((function() {
                                                    r.flickity("resize")
                                                }))
                                            };
                                        jQuery.when(c).done((() => {
                                            i.on("hide_variation", (function(t, e) {
                                                n.attr("src", s).attr("srcset", ""), u()
                                            })), i.on("click", ".reset_variations", (function() {
                                                n.attr("src", s).attr("srcset", ""), l(), u()
                                            }))
                                        })), i.on("show_variation", (function(t, e) {
                                            jQuery.when(c).done((() => {
                                                e.image.src ? (n.attr("src", e.image.src).attr("srcset", ""), a.attr("href", e.image_link), l(), u()) : e.image_src && (n.attr("src", e.image_src).attr("srcset", ""), a.attr("href", e.image_link), l(), u())
                                            }))
                                        })), jQuery(".product-lightbox .quantity").addQty()
                                    }))
                                })), t.preventDefault()
                            }
                        })), jQuery(o).addClass("quick-view-added"))
                    }))
                }
            }), a(9791), a(86), a(4168);
            var r = !1;
            const n = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

            function s() {
                return window.flatsomeVars.scrollPaddingTop
            }

            function c(t) {
                if (jQuery(".cart-item .nav-dropdown").length) jQuery(".cart-item").addClass("current-dropdown cart-active"), jQuery(".shop-container").on("click", (function() {
                    jQuery(".cart-item").removeClass("current-dropdown cart-active")
                })), jQuery(".cart-item").hover((function() {
                    jQuery(".cart-active").removeClass("cart-active")
                })), setTimeout((function() {
                    jQuery(".cart-active").removeClass("current-dropdown")
                }), t);
                else {
                    let t = 0;
                    if (jQuery.fn.magnificPopup) {
                        if (t = jQuery.magnificPopup.open ? 300 : 0, t && "#cart-popup" === jQuery.magnificPopup.instance ? .currItem ? .src) return;
                        t && jQuery.magnificPopup.close()
                    }
                    setTimeout((function() {
                        jQuery(".cart-item .off-canvas-toggle").trigger("click")
                    }), t)
                }
            }
            jQuery(document).on("flatsome-product-gallery-tools-init", (() => {
                n || (r = jQuery(".has-image-zoom .slide").easyZoom({
                    loadingNotice: "",
                    preventClicks: !1
                })), jQuery(".zoom-button").off("click.flatsome").on("click.flatsome", (function(t) {
                    jQuery(".product-gallery-slider").find(".is-selected a").trigger("click"), t.preventDefault()
                })), jQuery(".has-lightbox .product-gallery-slider").each((function() {
                    jQuery(this).lazyMagnificPopup({
                        delegate: "a",
                        type: "image",
                        tLoading: '<div class="loading-spin centered dark"></div>',
                        closeMarkup: flatsomeVars.lightbox.close_markup,
                        closeBtnInside: flatsomeVars.lightbox.close_btn_inside,
                        gallery: {
                            enabled: !0,
                            navigateByImgClick: !0,
                            preload: [0, 1],
                            arrowMarkup: '<button class="mfp-arrow mfp-arrow-%dir%" title="%title%"><i class="icon-angle-%dir%"></i></button>'
                        },
                        image: {
                            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                            verticalFit: !1
                        }
                    })
                }))
            })), jQuery((function(t) {
                const e = t(".product-thumbnails .first img").attr("data-src") ? t(".product-thumbnails .first img").attr("data-src") : t(".product-thumbnails .first img").attr("src"),
                    o = t("form.variations_form"),
                    i = t(".product-gallery-slider"),
                    a = t(".product-thumbnails");
                let s = null;
                const c = t.Deferred(),
                    l = t.Deferred();
                i.one("flatsome-flickity-ready", (() => c.resolve())), a.one("flatsome-flickity-ready", (() => l.resolve())), a.length && !a.is(":hidden") || l.resolve();
                const u = function() {
                        r && r.length && (s = r.filter(".has-image-zoom .slide.first").data("easyZoom"), s.swap(t(".has-image-zoom .slide.first img").attr("src"), t(".has-image-zoom .slide.first img").attr("data-large_image")))
                    },
                    d = function() {
                        i.data("flickity") && i.flickity("select", 0)
                    },
                    h = function() {
                        i.data("flickity") && i.imagesLoaded((function() {
                            i.flickity("resize")
                        }))
                    };
                t.when(c).then((() => {
                    t(document).trigger("flatsome-product-gallery-tools-init")
                }));
                const m = t.when(c, l).then((() => {
                    n && h(), o.on("hide_variation", (function(o, i) {
                        t(".product-thumbnails .first img, .sticky-add-to-cart-img").attr("src", e), h()
                    })), o.on("click", ".reset_variations", (function() {
                        t(".product-thumbnails .first img, .sticky-add-to-cart-img").attr("src", e), d(), u(), h()
                    }))
                }));
                o.on("show_variation", (function(o, i) {
                    t.when(m).done((() => {
                        i.hasOwnProperty("image") && i.image.thumb_src ? (t(".product-gallery-slider-old .slide.first img, .sticky-add-to-cart-img, .product-thumbnails .first img, .product-gallery-slider .slide.first .zoomImg").attr("src", i.image.thumb_src).attr("srcset", ""), d(), u(), h()) : (t(".product-thumbnails .first img").attr("src", e), h())
                    }))
                }))
            })), document.documentElement.style, window.getComputedStyle(document.documentElement)["scroll-behavior"], jQuery((function(t) {
                if (!document.body.classList.contains("single-product")) return;
                const e = window.location.hash,
                    o = window.location.href;

                function i() {
                    ! function() {
                        const e = t(".reviews_tab"),
                            o = e.length ? e : t("#reviews").closest(".accordion-item");
                        o.length && o.find("a:not(.active):first").trigger("click")
                    }(), setTimeout((() => {
                        t.scrollTo("#reviews", {
                            offset: -s() - 15
                        })
                    }), 500)
                }(e.toLowerCase().indexOf("comment-") >= 0 || "#comments" === e || "#reviews" === e || "#tab-reviews" === e || o.indexOf("comment-page-") > 0 || o.indexOf("cpage=") > 0) && i(), t("a.woocommerce-review-link").on("click", (function(t) {
                    t.preventDefault(), history.pushState(null, null, "#reviews"), i()
                }))
            })), a(8484), jQuery((function(t) {
                const e = t(".sticky-add-to-cart");
                if (!e.length) return;
                const o = function(t) {
                    return new IntersectionObserver((function(e) {
                        for (let o = 0; o < e.length; o++) t(e[o])
                    }), {
                        rootMargin: "0px",
                        threshold: .1,
                        ...arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    })
                }((o => {
                    const {
                        top: i
                    } = o.boundingClientRect, r = o.intersectionRatio <= 0 && i <= 0;
                    e.toggleClass("sticky-add-to-cart--active", r), t("body").toggleClass("has-sticky-product-cart", r)
                }), {
                    threshold: 0
                });
                t(".sticky-add-to-cart-select-options-button", e).on("click", (function(e) {
                    e.preventDefault(), t.scrollTo(".product form.variations_form", {
                        offset: -s() - 15
                    })
                }));
                const i = e.data("product-id") || 0;

                function r(e, o) {
                    e.on("change", (function() {
                        o.val(t(this).val())
                    }))
                }
                t(`#product-${i} button.single_add_to_cart_button:visible`).first().each(((i, n) => {
                    const a = t(n).closest("form.cart");
                    r(t(".qty", e), t(".qty", a)), r(t(".qty", a), t(".qty", e)), o.observe(n)
                }))
            })), a(4850), jQuery("table.my_account_orders").wrap('<div class="touch-scroll-table"/>'), jQuery(".single_add_to_cart_button").on("click", (function() {
                let t = jQuery(this),
                    e = t.closest("form.cart");
                e ? e.on("submit", (function() {
                    t.addClass("loading")
                })) : t.hasClass("disabled") || t.addClass("loading"), jQuery(window).on("pageshow", (() => {
                    t.removeClass("loading")
                }))
            })), jQuery(document).on("flatsome-open-mini-cart", (() => {
                c(5e3)
            })), flatsomeVars.is_mini_cart_reveal && (jQuery("body").on("added_to_cart", (function() {
                c("5000");
                const t = jQuery("#header"),
                    e = t.hasClass("has-sticky"),
                    o = jQuery(".header-wrapper", t);
                e && jQuery(".cart-item.has-dropdown").length && t.hasClass("sticky-hide-on-scroll--active") && (o.addClass("stuck"), t.removeClass("sticky-hide-on-scroll--active"))
            })), jQuery(document).ready((function() {
                jQuery("span.added-to-cart").length && c("5000")
            }))), jQuery(document.body).on("updated_cart_totals", (function() {
                jQuery(document).trigger("yith_wcwl_reload_fragments");
                const t = jQuery(".cart-wrapper");
                Flatsome.attach("lazy-load-images", t), Flatsome.attach("quick-view", t), Flatsome.attach("wishlist", t), Flatsome.attach("cart-refresh", t), Flatsome.attach("equalize-box", t)
            })), jQuery(document).ajaxComplete((function() {
                Flatsome.attach("add-qty", jQuery(".quantity").parent()), Flatsome.attach("lightboxes-link", jQuery(".woocommerce-checkout .woocommerce-terms-and-conditions-wrapper"))
            })), jQuery(document.body).on("wc_fragments_refreshed wc_fragments_loaded", (function() {
                Flatsome.attach("add-qty", jQuery(".quantity").parent())
            })), jQuery(document.body).on("updated_checkout", (function() {
                Flatsome.attach("lightboxes-link", jQuery(".woocommerce-checkout .woocommerce-terms-and-conditions-wrapper"))
            })), jQuery(".disable-lightbox a").on("click", (function(t) {
                t.preventDefault()
            })), jQuery((function(t) {
                t.scroll_to_notices = function(e) {
                    t.scrollTo(e)
                }
            })), jQuery((function(t) {
                t("#login-form-popup").find(".woocommerce-notices-wrapper > ul").length > 0 && t('[data-open="#login-form-popup"]').trigger("click")
            }))
        }()
}();