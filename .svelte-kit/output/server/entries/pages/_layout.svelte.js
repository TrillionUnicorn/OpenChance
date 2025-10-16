import { V as head, W as attr_class, X as ensure_array_like, Y as attr, Z as stringify, _ as store_get, $ as unsubscribe_stores } from "../../chunks/index2.js";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const favicon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const navLinks = [
      { href: "/", label: "Home" },
      { href: "/challenges", label: "Challenges" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="icon"${attr("href", favicon)}/>`);
    });
    $$renderer2.push(`<div class="app svelte-12qhfyh"><nav class="navbar svelte-12qhfyh"><div class="nav-container svelte-12qhfyh"><a href="/" class="logo svelte-12qhfyh"><span class="logo-icon svelte-12qhfyh">🌍</span> <span class="logo-text">OpenChance</span></a> <button class="mobile-menu-btn svelte-12qhfyh"><span class="hamburger svelte-12qhfyh"></span></button> <div${attr_class(`nav-links ${stringify("")}`, "svelte-12qhfyh")}><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)}${attr_class(`nav-link ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "active" : "")}`, "svelte-12qhfyh")}>${escape_html(link.label)}</a>`);
    }
    $$renderer2.push(`<!--]--> <a href="/login" class="btn-nav svelte-12qhfyh">Sign In</a></div></div></nav> <main class="svelte-12qhfyh">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="footer svelte-12qhfyh"><div class="footer-container svelte-12qhfyh"><div class="footer-grid svelte-12qhfyh"><div class="footer-section svelte-12qhfyh"><h3 class="svelte-12qhfyh">OpenChance</h3> <p class="svelte-12qhfyh">Connecting the world's brightest minds with the biggest challenges.</p></div> <div class="footer-section svelte-12qhfyh"><h4 class="svelte-12qhfyh">Platform</h4> <a href="/challenges" class="svelte-12qhfyh">Browse Challenges</a> <a href="/how-it-works" class="svelte-12qhfyh">How It Works</a> <a href="/pricing" class="svelte-12qhfyh">Pricing</a></div> <div class="footer-section svelte-12qhfyh"><h4 class="svelte-12qhfyh">Company</h4> <a href="/about" class="svelte-12qhfyh">About Us</a> <a href="/contact" class="svelte-12qhfyh">Contact</a> <a href="/careers" class="svelte-12qhfyh">Careers</a></div> <div class="footer-section svelte-12qhfyh"><h4 class="svelte-12qhfyh">Legal</h4> <a href="/privacy" class="svelte-12qhfyh">Privacy Policy</a> <a href="/terms" class="svelte-12qhfyh">Terms of Service</a> <a href="/security" class="svelte-12qhfyh">Security</a></div></div> <div class="footer-bottom svelte-12qhfyh"><p>© 2025 OpenChance. All rights reserved.</p> <div class="social-links svelte-12qhfyh"><a href="https://twitter.com/openchance" target="_blank" class="svelte-12qhfyh">Twitter</a> <a href="https://linkedin.com/company/openchance" target="_blank" class="svelte-12qhfyh">LinkedIn</a> <a href="https://discord.gg/openchance" target="_blank" class="svelte-12qhfyh">Discord</a></div></div></div></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
