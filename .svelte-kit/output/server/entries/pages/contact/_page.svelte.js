import { x as head, y as attr, F as ensure_array_like } from "../../../chunks/index.js";
import { C as Card, B as Button, F as Footer } from "../../../chunks/Footer.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = "";
    let email = "";
    let subject = "";
    let message = "";
    let loading = false;
    const contactInfo = [
      {
        icon: "📧",
        title: "Email",
        value: "hello@openchance.com",
        link: "mailto:hello@openchance.com"
      },
      {
        icon: "💬",
        title: "Discord",
        value: "Join our community",
        link: "https://discord.gg/openchance"
      },
      {
        icon: "💼",
        title: "LinkedIn",
        value: "OpenChance",
        link: "https://linkedin.com/company/openchance"
      },
      {
        icon: "🐦",
        title: "Twitter",
        value: "@OpenChance",
        link: "https://twitter.com/openchance"
      }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Contact Us | OpenChance</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Get in touch with OpenChance. Whether you're a problem solver, organization with challenges, or investor, we'd love to hear from you."/>`);
    });
    $$renderer2.push(`<div class="bg-gradient-to-br from-primary to-secondary text-white py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h1 class="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1> <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">Have questions? Want to partner? We'd love to hear from you.</p></div></div> <div class="bg-gray-50 py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2">`);
    Card($$renderer2, {
      class: "contact-content",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2> `);
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Name *</label> <input type="text" id="name"${attr("value", name)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John Doe"/></div> <div><label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label> <input type="email" id="email"${attr("value", email)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com"/></div></div> <div><label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Subject *</label> <input type="text" id="subject"${attr("value", subject)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="How can we help you?"/></div> <div><label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label> <textarea id="message" required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Tell us more about your inquiry...">`);
          const $$body = escape_html(message);
          if ($$body) {
            $$renderer3.push(`${$$body}`);
          }
          $$renderer3.push(`</textarea></div> `);
          {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          Button($$renderer3, {
            type: "submit",
            variant: "primary",
            size: "lg",
            fullWidth: true,
            loading,
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html("Send Message")}`);
            }
          });
          $$renderer3.push(`<!----> <p class="text-xs text-gray-600 text-center">We typically respond within 24 hours during business days.</p></form>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="space-y-6">`);
    Card($$renderer2, {
      class: "contact-content",
      children: ($$renderer3) => {
        $$renderer3.push(`<h3 class="text-xl font-bold text-gray-900 mb-4">Contact Information</h3> <div class="space-y-4"><!--[-->`);
        const each_array = ensure_array_like(contactInfo);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let info = each_array[$$index];
          $$renderer3.push(`<a${attr("href", info.link)}${attr("target", info.link.startsWith("http") ? "_blank" : void 0)}${attr("rel", info.link.startsWith("http") ? "noopener noreferrer" : void 0)} class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"><div class="text-3xl">${escape_html(info.icon)}</div> <div><div class="font-semibold text-gray-900">${escape_html(info.title)}</div> <div class="text-sm text-gray-600">${escape_html(info.value)}</div></div></a>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "contact-content bg-primary/5 border-2 border-primary/20",
      children: ($$renderer3) => {
        $$renderer3.push(`<h3 class="text-lg font-bold text-gray-900 mb-3">Response Time</h3> <div class="space-y-2 text-sm text-gray-700"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>General inquiries: 24 hours</span></div> <div class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Partnership requests: 48 hours</span></div> <div class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Investment inquiries: 48 hours</span></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "contact-content",
      children: ($$renderer3) => {
        $$renderer3.push(`<h3 class="text-lg font-bold text-gray-900 mb-3">Office Hours</h3> <div class="space-y-2 text-sm text-gray-700"><div class="flex justify-between"><span class="font-medium">Monday - Friday:</span> <span>9:00 AM - 6:00 PM</span></div> <div class="flex justify-between"><span class="font-medium">Saturday:</span> <span>10:00 AM - 4:00 PM</span></div> <div class="flex justify-between"><span class="font-medium">Sunday:</span> <span>Closed</span></div> <div class="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">Timezone: UTC+8 (Singapore Time)</div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "contact-content",
      children: ($$renderer3) => {
        $$renderer3.push(`<h3 class="text-lg font-bold text-gray-900 mb-3">Quick Links</h3> <div class="space-y-2"><a href="/#waitlist" class="block text-primary hover:underline">Join Waitlist</a> <a href="/product" class="block text-primary hover:underline">Browse Challenges</a> <a href="/pitch" class="block text-primary hover:underline">Investor Deck</a> <a href="https://github.com/TrillionUnicorn/OpenChance" target="_blank" rel="noopener noreferrer" class="block text-primary hover:underline">GitHub Repository</a></div>`);
      }
    });
    $$renderer2.push(`<!----></div></div></div></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
