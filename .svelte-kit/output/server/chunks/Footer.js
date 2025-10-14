import { y as attr, J as attr_class, K as clsx, F as ensure_array_like } from "./index.js";
import { e as escape_html } from "./context.js";
function Button($$renderer, $$props) {
  let {
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    href,
    type = "button",
    onclick,
    class: className = "",
    children
  } = $$props;
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
    danger: "bg-danger text-white hover:bg-red-600 focus:ring-danger"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  if (href) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<a${attr("href", href)}${attr_class(clsx(classes), void 0, { "opacity-50": disabled, "pointer-events-none": disabled })}>`);
    if (loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> `);
    children?.($$renderer);
    $$renderer.push(`<!----></a>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<button${attr("type", type)}${attr("disabled", disabled, true)}${attr_class(clsx(classes), void 0, { "cursor-wait": loading })}>`);
    if (loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> `);
    children?.($$renderer);
    $$renderer.push(`<!----></button>`);
  }
  $$renderer.push(`<!--]-->`);
}
function Card($$renderer, $$props) {
  let {
    class: className = "",
    hover = false,
    glass = false,
    children
  } = $$props;
  const baseClasses = "rounded-xl p-6 transition-all duration-300";
  const glassClasses = glass ? "glass-effect" : "bg-white shadow-md";
  const hoverClasses = hover ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;
  $$renderer.push(`<div${attr_class(clsx(classes))}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></div>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const navigation = {
      platform: [
        { name: "Browse Challenges", href: "/product" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Success Stories", href: "/#success-stories" }
      ],
      company: [
        { name: "About Us", href: "/#about" },
        { name: "Pitch Deck", href: "/pitch" },
        { name: "Roadmap", href: "/roadmap" },
        { name: "Contact", href: "/contact" }
      ],
      resources: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/api" },
        { name: "Community", href: "/community" },
        { name: "Blog", href: "/blog" }
      ],
      legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "IP Protection", href: "/ip-protection" }
      ]
    };
    const social = [
      {
        name: "GitHub",
        icon: "🐙",
        href: "https://github.com/TrillionUnicorn/OpenChance"
      },
      {
        name: "LinkedIn",
        icon: "💼",
        href: "https://linkedin.com/company/openchance"
      },
      {
        name: "Twitter",
        icon: "🐦",
        href: "https://twitter.com/openchance"
      },
      {
        name: "Discord",
        icon: "💬",
        href: "https://discord.gg/openchance"
      }
    ];
    $$renderer2.push(`<footer class="bg-gray-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8"><div class="lg:col-span-1"><div class="flex items-center gap-2 mb-4"><span class="text-3xl">🌍</span> <span class="text-xl font-bold">OpenChance</span></div> <p class="text-gray-400 text-sm mb-4">Solving the world's biggest challenges through collective intelligence.</p> <div class="flex gap-3"><!--[-->`);
    const each_array = ensure_array_like(social);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)} target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform"${attr("title", item.name)}>${escape_html(item.icon)}</a>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div><h3 class="font-semibold text-white mb-4">Platform</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(navigation.platform);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<li><a${attr("href", item.href)} class="text-gray-400 hover:text-white transition-colors text-sm">${escape_html(item.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="font-semibold text-white mb-4">Company</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_2 = ensure_array_like(navigation.company);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<li><a${attr("href", item.href)} class="text-gray-400 hover:text-white transition-colors text-sm">${escape_html(item.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="font-semibold text-white mb-4">Resources</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_3 = ensure_array_like(navigation.resources);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let item = each_array_3[$$index_3];
      $$renderer2.push(`<li><a${attr("href", item.href)} class="text-gray-400 hover:text-white transition-colors text-sm">${escape_html(item.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="font-semibold text-white mb-4">Legal</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_4 = ensure_array_like(navigation.legal);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let item = each_array_4[$$index_4];
      $$renderer2.push(`<li><a${attr("href", item.href)} class="text-gray-400 hover:text-white transition-colors text-sm">${escape_html(item.name)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="border-t border-gray-800 pt-8"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-gray-400 text-sm">© ${escape_html(currentYear)} OpenChance. All rights reserved.</div> <div class="flex items-center gap-6 text-sm text-gray-400"><div class="flex items-center gap-2"><span>🔒</span> <span>Enterprise-Grade Security</span></div> <div class="flex items-center gap-2"><span>✅</span> <span>GDPR Compliant</span></div> <div class="flex items-center gap-2"><span>🌍</span> <span>Global Platform</span></div></div></div> <div class="mt-6 text-center text-gray-500 text-xs"><p>Built with ❤️ by innovators, for innovators.</p> <p class="mt-1">Founder: <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Hunter Ho</a></p></div></div></div></footer>`);
  });
}
export {
  Button as B,
  Card as C,
  Footer as F
};
