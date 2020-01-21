/* eslint-disable prettier/prettier */
// ----------------------------------------------------------------------------
// Buzz, a Javascript HTML5 Audio library
// v1.2.1 - Built 2018-05-10 10:14
// Licensed under the MIT license.
// http://buzz.jaysalvat.com/
// ----------------------------------------------------------------------------
// Copyright (C) 2010-2018 Jay Salvat
// http://jaysalvat.com/
// ----------------------------------------------------------------------------

!(function (a, b) {
    "use strict";
    "undefined" != typeof module && module.exports
        ? (module.exports = b())
        : "function" == typeof define && define.amd
            ? define([], b)
            : (a.buzz = b());
})(this, function () {
    "use strict";
    var a = window.AudioContext || window.webkitAudioContext,
        b = {
            defaults: {
                autoplay: !1,
                crossOrigin: null,
                duration: 5e3,
                formats: [],
                loop: !1,
                placeholder: "--",
                preload: "metadata",
                volume: 80,
                webAudioApi: !1,
                document: window.document
            },
            types: {
                mp3: "audio/mpeg",
                ogg: "audio/ogg",
                wav: "audio/wav",
                aac: "audio/aac",
                m4a: "audio/x-m4a"
            },
            sounds: [],
            el: document.createElement("audio"),
            getAudioContext: function () {
                if (void 0 === this.audioCtx)
                    try {
                        this.audioCtx = a ? new a() : null;
                    } catch (b) {
                        this.audioCtx = null;
                    }
                return this.audioCtx;
            },
            sound: function (a, c) {
                function d(a) {
                    for (var b = [], c = a.length - 1, d = 0; c >= d; d++)
                        b.push({ start: a.start(d), end: a.end(d) });
                    return b;
                }
                function e(a) {
                    return a.split(".").pop();
                }
                c = c || {};
                var f = c.document || b.defaults.document,
                    g = 0,
                    h = [],
                    i = {},
                    j = b.isSupported();
                if (
                    ((this.load = function () {
                        return j ? (this.sound.load(), this) : this;
                    }),
                        (this.play = function () {
                            return j ? (this.sound.play()["catch"](function () { }), this) : this;
                        }),
                        (this.togglePlay = function () {
                            return j
                                ? (this.sound.paused
                                    ? this.sound.play()["catch"](function () { })
                                    : this.sound.pause(),
                                    this)
                                : this;
                        }),
                        (this.pause = function () {
                            return j ? (this.sound.pause(), this) : this;
                        }),
                        (this.isPaused = function () {
                            return j ? this.sound.paused : null;
                        }),
                        (this.stop = function () {
                            return j ? (this.sound.pause(), this.setTime(0), this) : this;
                        }),
                        (this.isEnded = function () {
                            return j ? this.sound.ended : null;
                        }),
                        (this.loop = function () {
                            return j
                                ? ((this.sound.loop = "loop"),
                                    this.bind("ended.buzzloop", function () {
                                        (this.currentTime = 0), this.play();
                                    }),
                                    this)
                                : this;
                        }),
                        (this.unloop = function () {
                            return j
                                ? (this.sound.removeAttribute("loop"),
                                    this.unbind("ended.buzzloop"),
                                    this)
                                : this;
                        }),
                        (this.mute = function () {
                            return j ? ((this.sound.muted = !0), this) : this;
                        }),
                        (this.unmute = function () {
                            return j ? ((this.sound.muted = !1), this) : this;
                        }),
                        (this.toggleMute = function () {
                            return j ? ((this.sound.muted = !this.sound.muted), this) : this;
                        }),
                        (this.isMuted = function () {
                            return j ? this.sound.muted : null;
                        }),
                        (this.setVolume = function (a) {
                            return j
                                ? (0 > a && (a = 0),
                                    a > 100 && (a = 100),
                                    (this.volume = a),
                                    (this.sound.volume = a / 100),
                                    this)
                                : this;
                        }),
                        (this.getVolume = function () {
                            return j ? this.volume : this;
                        }),
                        (this.increaseVolume = function (a) {
                            return this.setVolume(this.volume + (a || 1));
                        }),
                        (this.decreaseVolume = function (a) {
                            return this.setVolume(this.volume - (a || 1));
                        }),
                        (this.setTime = function (a) {
                            if (!j) return this;
                            var b = !0;
                            return (
                                this.whenReady(function () {
                                    b === !0 && ((b = !1), (this.sound.currentTime = a));
                                }),
                                this
                            );
                        }),
                        (this.getTime = function () {
                            if (!j) return null;
                            var a = Math.round(100 * this.sound.currentTime) / 100;
                            return isNaN(a) ? b.defaults.placeholder : a;
                        }),
                        (this.setPercent = function (a) {
                            return j
                                ? this.setTime(b.fromPercent(a, this.sound.duration))
                                : this;
                        }),
                        (this.getPercent = function () {
                            if (!j) return null;
                            var a = Math.round(
                                b.toPercent(this.sound.currentTime, this.sound.duration)
                            );
                            return isNaN(a) ? b.defaults.placeholder : a;
                        }),
                        (this.setSpeed = function (a) {
                            return j ? ((this.sound.playbackRate = a), this) : this;
                        }),
                        (this.getSpeed = function () {
                            return j ? this.sound.playbackRate : null;
                        }),
                        (this.getDuration = function () {
                            if (!j) return null;
                            var a = Math.round(100 * this.sound.duration) / 100;
                            return isNaN(a) ? b.defaults.placeholder : a;
                        }),
                        (this.getPlayed = function () {
                            return j ? d(this.sound.played) : null;
                        }),
                        (this.getBuffered = function () {
                            return j ? d(this.sound.buffered) : null;
                        }),
                        (this.getSeekable = function () {
                            return j ? d(this.sound.seekable) : null;
                        }),
                        (this.getErrorCode = function () {
                            return j && this.sound.error ? this.sound.error.code : 0;
                        }),
                        (this.getErrorMessage = function () {
                            if (!j) return null;
                            switch (this.getErrorCode()) {
                                case 1:
                                    return "MEDIA_ERR_ABORTED";
                                case 2:
                                    return "MEDIA_ERR_NETWORK";
                                case 3:
                                    return "MEDIA_ERR_DECODE";
                                case 4:
                                    return "MEDIA_ERR_SRC_NOT_SUPPORTED";
                                default:
                                    return null;
                            }
                        }),
                        (this.getStateCode = function () {
                            return j ? this.sound.readyState : null;
                        }),
                        (this.getStateMessage = function () {
                            if (!j) return null;
                            switch (this.getStateCode()) {
                                case 0:
                                    return "HAVE_NOTHING";
                                case 1:
                                    return "HAVE_METADATA";
                                case 2:
                                    return "HAVE_CURRENT_DATA";
                                case 3:
                                    return "HAVE_FUTURE_DATA";
                                case 4:
                                    return "HAVE_ENOUGH_DATA";
                                default:
                                    return null;
                            }
                        }),
                        (this.getNetworkStateCode = function () {
                            return j ? this.sound.networkState : null;
                        }),
                        (this.getNetworkStateMessage = function () {
                            if (!j) return null;
                            switch (this.getNetworkStateCode()) {
                                case 0:
                                    return "NETWORK_EMPTY";
                                case 1:
                                    return "NETWORK_IDLE";
                                case 2:
                                    return "NETWORK_LOADING";
                                case 3:
                                    return "NETWORK_NO_SOURCE";
                                default:
                                    return null;
                            }
                        }),
                        (this.set = function (a, b) {
                            return j ? ((this.sound[a] = b), this) : this;
                        }),
                        (this.get = function (a) {
                            return j ? (a ? this.sound[a] : this.sound) : null;
                        }),
                        (this.bind = function (a, b) {
                            if (!j) return this;
                            a = a.split(" ");
                            for (
                                var c = this,
                                d = function (a) {
                                    b.call(c, a);
                                },
                                e = 0;
                                e < a.length;
                                e++
                            ) {
                                var f = a[e],
                                    g = f;
                                (f = g.split(".")[0]),
                                    h.push({ idx: g, func: d }),
                                    this.sound.addEventListener(f, d, !0);
                            }
                            return this;
                        }),
                        (this.unbind = function (a) {
                            if (!j) return this;
                            a = a.split(" ");
                            for (var b = 0; b < a.length; b++)
                                for (
                                    var c = a[b], d = c.split(".")[0], e = 0;
                                    e < h.length;
                                    e++
                                ) {
                                    var f = h[e].idx.split(".");
                                    (h[e].idx === c || (f[1] && f[1] === c.replace(".", ""))) &&
                                        (this.sound.removeEventListener(d, h[e].func, !0),
                                            h.splice(e, 1));
                                }
                            return this;
                        }),
                        (this.bindOnce = function (a, b) {
                            if (!j) return this;
                            var c = this;
                            return (
                                (i[g++] = !1),
                                this.bind(a + "." + g, function () {
                                    i[g] || ((i[g] = !0), b.call(c)), c.unbind(a + "." + g);
                                }),
                                this
                            );
                        }),
                        (this.trigger = function (a, b) {
                            if (!j) return this;
                            a = a.split(" ");
                            for (var c = 0; c < a.length; c++)
                                for (var d = a[c], e = 0; e < h.length; e++) {
                                    var g = h[e].idx.split(".");
                                    if (h[e].idx === d || (g[0] && g[0] === d.replace(".", ""))) {
                                        var i = f.createEvent("HTMLEvents");
                                        i.initEvent(g[0], !1, !0),
                                            (i.originalEvent = b),
                                            this.sound.dispatchEvent(i);
                                    }
                                }
                            return this;
                        }),
                        (this.fadeTo = function (a, c, d) {
                            function e() {
                                clearTimeout(f),
                                    (f = setTimeout(function () {
                                        a > g && i.volume < a
                                            ? (i.setVolume((i.volume += 1)), e())
                                            : g > a && i.volume > a
                                                ? (i.setVolume((i.volume -= 1)), e())
                                                : d instanceof Function && d.apply(i);
                                    }, h));
                            }
                            if (!j) return this;
                            c instanceof Function
                                ? ((d = c), (c = b.defaults.duration))
                                : (c = c || b.defaults.duration);
                            var f,
                                g = this.volume,
                                h = c / Math.abs(g - a),
                                i = this;
                            return (
                                this.play(),
                                this.whenReady(function () {
                                    e();
                                }),
                                this
                            );
                        }),
                        (this.fadeIn = function (a, b) {
                            return j ? this.setVolume(0).fadeTo(100, a, b) : this;
                        }),
                        (this.fadeOut = function (a, b) {
                            return j ? this.fadeTo(0, a, b) : this;
                        }),
                        (this.fadeWith = function (a, b) {
                            return j
                                ? (this.fadeOut(b, function () {
                                    this.stop();
                                }),
                                    a.play().fadeIn(b),
                                    this)
                                : this;
                        }),
                        (this.whenReady = function (a) {
                            if (!j) return null;
                            var b = this;
                            0 === this.sound.readyState
                                ? this.bind("canplay.buzzwhenready", function () {
                                    a.call(b);
                                })
                                : a.call(b);
                        }),
                        (this.addSource = function (a) {
                            var c = this,
                                d = f.createElement("source");
                            return (
                                (d.src = a),
                                b.types[e(a)] && (d.type = b.types[e(a)]),
                                this.sound.appendChild(d),
                                d.addEventListener("error", function (a) {
                                    c.trigger("sourceerror", a);
                                }),
                                d
                            );
                        }),
                        j && a)
                ) {
                    for (var k in b.defaults)
                        b.defaults.hasOwnProperty(k) &&
                            void 0 === c[k] &&
                            (c[k] = b.defaults[k]);
                    if (
                        ((this.sound = f.createElement("audio")),
                            null !== c.crossOrigin && (this.sound.crossOrigin = c.crossOrigin),
                            c.webAudioApi)
                    ) {
                        var l = b.getAudioContext();
                        l &&
                            ((this.source = l.createMediaElementSource(this.sound)),
                                this.source.connect(l.destination));
                    }
                    if (a instanceof Array)
                        for (var m in a) a.hasOwnProperty(m) && this.addSource(a[m]);
                    else if (c.formats.length)
                        for (var n in c.formats)
                            c.formats.hasOwnProperty(n) &&
                                this.addSource(a + "." + c.formats[n]);
                    else this.addSource(a);
                    c.loop && this.loop(),
                        c.autoplay && (this.sound.autoplay = "autoplay"),
                        c.preload === !0
                            ? (this.sound.preload = "auto")
                            : c.preload === !1
                                ? (this.sound.preload = "none")
                                : (this.sound.preload = c.preload),
                        this.setVolume(c.volume),
                        b.sounds.push(this);
                }
            },
            group: function (a) {
                function b() {
                    for (
                        var b = c(null, arguments), d = b.shift(), e = 0;
                        e < a.length;
                        e++
                    )
                        a[e][d].apply(a[e], b);
                }
                function c(a, b) {
                    return a instanceof Array ? a : Array.prototype.slice.call(b);
                }
                (a = c(a, arguments)),
                    (this.getSounds = function () {
                        return a;
                    }),
                    (this.add = function (b) {
                        b = c(b, arguments);
                        for (var d = 0; d < b.length; d++) a.push(b[d]);
                    }),
                    (this.remove = function (b) {
                        b = c(b, arguments);
                        for (var d = 0; d < b.length; d++)
                            for (var e = 0; e < a.length; e++)
                                if (a[e] === b[d]) {
                                    a.splice(e, 1);
                                    break;
                                }
                    }),
                    (this.load = function () {
                        return b("load"), this;
                    }),
                    (this.play = function () {
                        return b("play"), this;
                    }),
                    (this.togglePlay = function () {
                        return b("togglePlay"), this;
                    }),
                    (this.pause = function (a) {
                        return b("pause", a), this;
                    }),
                    (this.stop = function () {
                        return b("stop"), this;
                    }),
                    (this.mute = function () {
                        return b("mute"), this;
                    }),
                    (this.unmute = function () {
                        return b("unmute"), this;
                    }),
                    (this.toggleMute = function () {
                        return b("toggleMute"), this;
                    }),
                    (this.setVolume = function (a) {
                        return b("setVolume", a), this;
                    }),
                    (this.increaseVolume = function (a) {
                        return b("increaseVolume", a), this;
                    }),
                    (this.decreaseVolume = function (a) {
                        return b("decreaseVolume", a), this;
                    }),
                    (this.loop = function () {
                        return b("loop"), this;
                    }),
                    (this.unloop = function () {
                        return b("unloop"), this;
                    }),
                    (this.setSpeed = function (a) {
                        return b("setSpeed", a), this;
                    }),
                    (this.setTime = function (a) {
                        return b("setTime", a), this;
                    }),
                    (this.set = function (a, c) {
                        return b("set", a, c), this;
                    }),
                    (this.bind = function (a, c) {
                        return b("bind", a, c), this;
                    }),
                    (this.unbind = function (a) {
                        return b("unbind", a), this;
                    }),
                    (this.bindOnce = function (a, c) {
                        return b("bindOnce", a, c), this;
                    }),
                    (this.trigger = function (a) {
                        return b("trigger", a), this;
                    }),
                    (this.fade = function (a, c, d, e) {
                        return b("fade", a, c, d, e), this;
                    }),
                    (this.fadeIn = function (a, c) {
                        return b("fadeIn", a, c), this;
                    }),
                    (this.fadeOut = function (a, c) {
                        return b("fadeOut", a, c), this;
                    });
            },
            all: function () {
                return new b.group(b.sounds);
            },
            isSupported: function () {
                return !!b.el.canPlayType;
            },
            isOGGSupported: function () {
                return (
                    !!b.el.canPlayType && b.el.canPlayType('audio/ogg; codecs="vorbis"')
                );
            },
            isWAVSupported: function () {
                return !!b.el.canPlayType && b.el.canPlayType('audio/wav; codecs="1"');
            },
            isMP3Supported: function () {
                return !!b.el.canPlayType && b.el.canPlayType("audio/mpeg;");
            },
            isAACSupported: function () {
                return (
                    !!b.el.canPlayType &&
                    (b.el.canPlayType("audio/x-m4a;") || b.el.canPlayType("audio/aac;"))
                );
            },
            toTimer: function (a, b) {
                var c, d, e;
                return (
                    (c = Math.floor(a / 3600)),
                    (c = isNaN(c) ? "--" : c >= 10 ? c : "0" + c),
                    (d = b ? Math.floor((a / 60) % 60) : Math.floor(a / 60)),
                    (d = isNaN(d) ? "--" : d >= 10 ? d : "0" + d),
                    (e = Math.floor(a % 60)),
                    (e = isNaN(e) ? "--" : e >= 10 ? e : "0" + e),
                    b ? c + ":" + d + ":" + e : d + ":" + e
                );
            },
            fromTimer: function (a) {
                var b = a.toString().split(":");
                return (
                    b &&
                    3 === b.length &&
                    (a =
                        3600 * parseInt(b[0], 10) +
                        60 * parseInt(b[1], 10) +
                        parseInt(b[2], 10)),
                    b &&
                    2 === b.length &&
                    (a = 60 * parseInt(b[0], 10) + parseInt(b[1], 10)),
                    a
                );
            },
            toPercent: function (a, b, c) {
                var d = Math.pow(10, c || 0);
                return Math.round(((100 * a) / b) * d) / d;
            },
            fromPercent: function (a, b, c) {
                var d = Math.pow(10, c || 0);
                return Math.round((b / 100) * a * d) / d;
            }
        };
    return b;
});
