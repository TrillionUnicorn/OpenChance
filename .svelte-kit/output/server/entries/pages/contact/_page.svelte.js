import { V as head, Y as attr } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  let formData = { name: "", email: "", subject: "", message: "" };
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Contact Us - OpenChance</title>`);
    });
  });
  $$renderer.push(`<div class="contact-page svelte-1bv7ezn"><div class="container svelte-1bv7ezn"><header class="page-header svelte-1bv7ezn"><h1 class="svelte-1bv7ezn">Get in Touch</h1> <p class="svelte-1bv7ezn">Have questions? We'd love to hear from you.</p></header> <div class="content-grid svelte-1bv7ezn"><div class="contact-form-section svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">Send us a Message</h2> `);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<form class="contact-form svelte-1bv7ezn"><div class="form-group svelte-1bv7ezn"><label for="name" class="svelte-1bv7ezn">Name</label> <input type="text" id="name"${attr("value", formData.name)} required placeholder="Your name" class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="email" class="svelte-1bv7ezn">Email</label> <input type="email" id="email"${attr("value", formData.email)} required placeholder="your@email.com" class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="subject" class="svelte-1bv7ezn">Subject</label> `);
    $$renderer.select(
      {
        id: "subject",
        value: formData.subject,
        required: true,
        class: ""
      },
      ($$renderer2) => {
        $$renderer2.option({ value: "" }, ($$renderer3) => {
          $$renderer3.push(`Select a subject`);
        });
        $$renderer2.option({ value: "general" }, ($$renderer3) => {
          $$renderer3.push(`General Inquiry`);
        });
        $$renderer2.option({ value: "support" }, ($$renderer3) => {
          $$renderer3.push(`Technical Support`);
        });
        $$renderer2.option({ value: "partnership" }, ($$renderer3) => {
          $$renderer3.push(`Partnership Opportunity`);
        });
        $$renderer2.option({ value: "feedback" }, ($$renderer3) => {
          $$renderer3.push(`Feedback`);
        });
        $$renderer2.option({ value: "other" }, ($$renderer3) => {
          $$renderer3.push(`Other`);
        });
      }
    );
    $$renderer.push(`</div> <div class="form-group svelte-1bv7ezn"><label for="message" class="svelte-1bv7ezn">Message</label> <textarea id="message" required placeholder="Tell us how we can help..." rows="6" class="svelte-1bv7ezn">`);
    const $$body = escape_html(formData.message);
    if ($$body) {
      $$renderer.push(`${$$body}`);
    }
    $$renderer.push(`</textarea></div> <button type="submit" class="btn-primary btn-large svelte-1bv7ezn">Send Message</button></form>`);
  }
  $$renderer.push(`<!--]--></div> <div class="contact-info-section svelte-1bv7ezn"><div class="info-card svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Contact Information</h3> <div class="info-item svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">📧</div> <div class="info-content svelte-1bv7ezn"><div class="info-label svelte-1bv7ezn">Email</div> <a href="mailto:hello@openchance.com" class="svelte-1bv7ezn">hello@openchance.com</a></div></div> <div class="info-item svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">💬</div> <div class="info-content svelte-1bv7ezn"><div class="info-label svelte-1bv7ezn">Discord</div> <a href="https://discord.gg/openchance" target="_blank" class="svelte-1bv7ezn">Join our community</a></div></div> <div class="info-item svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">🐦</div> <div class="info-content svelte-1bv7ezn"><div class="info-label svelte-1bv7ezn">Twitter</div> <a href="https://twitter.com/openchance" target="_blank" class="svelte-1bv7ezn">@OpenChance</a></div></div> <div class="info-item svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">💼</div> <div class="info-content svelte-1bv7ezn"><div class="info-label svelte-1bv7ezn">LinkedIn</div> <a href="https://linkedin.com/company/openchance" target="_blank" class="svelte-1bv7ezn">OpenChance</a></div></div></div> <div class="info-card svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Office Hours</h3> <p class="svelte-1bv7ezn">Monday - Friday: 9:00 AM - 6:00 PM PST</p> <p class="svelte-1bv7ezn">Saturday - Sunday: Closed</p> <p class="note svelte-1bv7ezn">We typically respond within 24 hours during business days.</p></div> <div class="info-card svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Frequently Asked Questions</h3> <div class="faq-list svelte-1bv7ezn"><a href="/faq#getting-started" class="faq-link svelte-1bv7ezn">How do I get started?</a> <a href="/faq#payments" class="faq-link svelte-1bv7ezn">How do payments work?</a> <a href="/faq#security" class="faq-link svelte-1bv7ezn">Is my data secure?</a> <a href="/faq" class="faq-link svelte-1bv7ezn">View all FAQs →</a></div></div></div></div></div></div>`);
}
export {
  _page as default
};
