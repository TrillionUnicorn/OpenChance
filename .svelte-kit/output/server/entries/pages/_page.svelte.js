import { z as attr_style, F as ensure_array_like, G as stringify, y as attr, J as attr_class, x as head } from "../../chunks/index.js";
import { B as Button, C as Card, F as Footer } from "../../chunks/Footer.js";
import { e as escape_html } from "../../chunks/context.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { C as ChallengeCard, m as mockChallenges } from "../../chunks/challenges.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let scrollY = 0;
    const stats = [
      { number: "1,247", label: "Active Challenges", icon: "🎯" },
      { number: "50K+", label: "Problem Solvers", icon: "👥" },
      { number: "$50M+", label: "Rewards Paid", icon: "💰" },
      { number: "94%", label: "Success Rate", icon: "✅" }
    ];
    $$renderer2.push(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden svelte-gzujjl"><div class="absolute inset-0 z-0 svelte-gzujjl"${attr_style(`transform: translateY(${stringify(scrollY * 0.5)}px)`)}><div class="absolute inset-0 gradient-primary opacity-90 svelte-gzujjl"></div> <div class="absolute inset-0 opacity-10 svelte-gzujjl"><div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float svelte-gzujjl"></div> <div class="absolute top-40 right-40 w-96 h-96 bg-white rounded-full blur-3xl animate-float svelte-gzujjl" style="animation-delay: 1s;"></div> <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl animate-float svelte-gzujjl" style="animation-delay: 2s;"></div></div></div> <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center svelte-gzujjl"><div class="hero-title mb-6 svelte-gzujjl"><h1 class="text-5xl md:text-7xl font-bold text-white mb-4 svelte-gzujjl">🌍 OpenChance</h1> <div class="text-2xl md:text-4xl font-semibold text-white/90 svelte-gzujjl">Global Problem-Solving Hub</div></div> <p class="hero-subtitle text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 svelte-gzujjl">Connect brilliant minds with real-world challenges. From climate change to healthcare innovation, 
      we're solving the world's biggest problems through collective intelligence.</p> <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center mb-16 svelte-gzujjl">`);
    Button($$renderer2, {
      variant: "secondary",
      size: "lg",
      href: "#waitlist",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Join as Solver`);
      }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      href: "#waitlist",
      class: "bg-white/10 text-white border-white hover:bg-white hover:text-primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Post a Challenge`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto svelte-gzujjl"><!--[-->`);
    const each_array = ensure_array_like(stats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stat = each_array[$$index];
      $$renderer2.push(`<div class="hero-stats glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 svelte-gzujjl"><div class="text-4xl mb-2 svelte-gzujjl">${escape_html(stat.icon)}</div> <div class="text-3xl md:text-4xl font-bold text-white mb-1 svelte-gzujjl">${escape_html(stat.number)}</div> <div class="text-sm md:text-base text-white/80 svelte-gzujjl">${escape_html(stat.label)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce svelte-gzujjl"><svg class="w-6 h-6 text-white svelte-gzujjl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" class="svelte-gzujjl"></path></svg></div></div></section>`);
  });
}
function WhyUs($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const advantages = [
      {
        icon: "🌍",
        title: "Global Reach",
        description: "Access 50,000+ expert problem solvers from around the world, bringing diverse perspectives and innovative solutions.",
        highlight: "50K+ Experts"
      },
      {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Get solutions in 30-90 days instead of 6-18 months with traditional consulting. Speed without compromising quality.",
        highlight: "30-90 Days"
      },
      {
        icon: "💎",
        title: "Cost-Effective",
        description: "Pay only for successful solutions. Our platform fees are 85% lower than traditional consulting rates.",
        highlight: "85% Savings"
      },
      {
        icon: "🎯",
        title: "AI-Powered Matching",
        description: "Our proprietary algorithm matches your challenge with the perfect solvers based on expertise, track record, and availability.",
        highlight: "94% Success Rate"
      },
      {
        icon: "🔒",
        title: "IP Protection",
        description: "Robust intellectual property safeguards, NDAs, and secure escrow system protect your innovations and investments.",
        highlight: "Enterprise-Grade Security"
      },
      {
        icon: "🤝",
        title: "Proven Results",
        description: "$50M+ in rewards distributed, 1,000+ challenges solved, and 4.8/5 satisfaction rating from organizations worldwide.",
        highlight: "$50M+ Distributed"
      }
    ];
    $$renderer2.push(`<section class="why-us-section py-20 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose OpenChance?</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">The world's most effective problem-solving platform, combining global expertise with cutting-edge AI matching</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
    const each_array = ensure_array_like(advantages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let advantage = each_array[$$index];
      Card($$renderer2, {
        class: "why-us-card",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="text-5xl mb-4">${escape_html(advantage.icon)}</div> <h3 class="text-2xl font-bold text-gray-900 mb-3">${escape_html(advantage.title)}</h3> <p class="text-gray-600 mb-4">${escape_html(advantage.description)}</p> <div class="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm">${escape_html(advantage.highlight)}</div>`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
function HowItWorks($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const steps = [
      {
        number: "01",
        title: "Post Your Challenge",
        description: "Define your problem, set requirements, and establish rewards. Our AI helps optimize your challenge description for maximum solver engagement.",
        icon: "📝",
        details: [
          "Detailed problem description",
          "Set budget and timeline",
          "Define success criteria",
          "AI-powered optimization"
        ]
      },
      {
        number: "02",
        title: "AI Matches Solvers",
        description: "Our proprietary algorithm analyzes your challenge and matches it with the most qualified solvers based on expertise, track record, and availability.",
        icon: "🤖",
        details: [
          "Intelligent solver matching",
          "Expertise verification",
          "Success rate analysis",
          "Team formation (if needed)"
        ]
      },
      {
        number: "03",
        title: "Collaborate & Solve",
        description: "Solvers work on your challenge using our collaboration tools. Track progress, provide feedback, and iterate until you have the perfect solution.",
        icon: "🚀",
        details: [
          "Real-time collaboration",
          "Progress tracking",
          "Milestone reviews",
          "Secure communication"
        ]
      }
    ];
    $$renderer2.push(`<section class="how-it-works-section py-20 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">From problem to solution in three simple steps</p></div> <div class="relative"><div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 step-connector" style="transform-origin: left;"></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10"><!--[-->`);
    const each_array = ensure_array_like(steps);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let step = each_array[index];
      $$renderer2.push(`<div class="step-card"><div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-100"><div class="flex items-center justify-between mb-6"><div class="text-6xl font-bold text-primary/20">${escape_html(step.number)}</div> <div class="text-5xl">${escape_html(step.icon)}</div></div> <h3 class="text-2xl font-bold text-gray-900 mb-4">${escape_html(step.title)}</h3> <p class="text-gray-600 mb-6">${escape_html(step.description)}</p> <ul class="space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(step.details);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let detail = each_array_1[$$index];
        $$renderer2.push(`<li class="flex items-start gap-2 text-sm text-gray-700"><svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${escape_html(detail)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div> `);
      if (index < steps.length - 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="lg:hidden flex justify-center my-6"><svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="text-center mt-16"><a href="#waitlist" class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl">Get Started Now <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></a></div></div></section>`);
  });
}
function Pricing($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const plans = [
      {
        name: "Solver",
        price: "Free",
        period: "Forever",
        description: "For problem solvers looking to earn rewards",
        features: [
          "Browse unlimited challenges",
          "Apply to challenges",
          "Earn rewards up to $1M+",
          "Build your reputation",
          "Access collaboration tools",
          "Portfolio showcase",
          "Community support"
        ],
        cta: "Join as Solver",
        popular: false,
        highlight: "Always Free"
      },
      {
        name: "Basic Challenger",
        price: "$499",
        originalPrice: "$999",
        period: "per month",
        description: "For organizations with occasional challenges",
        features: [
          "Post up to 5 challenges/month",
          "AI-powered solver matching",
          "Basic analytics dashboard",
          "Email support",
          "15% platform fee",
          "Standard IP protection",
          "Challenge templates"
        ],
        cta: "Start Free Trial",
        popular: false,
        highlight: "50% Off First Year"
      },
      {
        name: "Premium Challenger",
        price: "$1,499",
        originalPrice: "$2,999",
        period: "per month",
        description: "For organizations with ongoing innovation needs",
        features: [
          "Unlimited challenges",
          "Priority solver matching",
          "Advanced analytics & insights",
          "Dedicated success manager",
          "12% platform fee",
          "Enhanced IP protection",
          "Custom challenge workflows",
          "API access",
          "24/7 priority support"
        ],
        cta: "Start Free Trial",
        popular: true,
        highlight: "50% Off First Year"
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "Contact us",
        description: "For large organizations with complex needs",
        features: [
          "Everything in Premium",
          "White-label solutions",
          "Custom integrations",
          "Private challenge network",
          "Negotiable platform fees",
          "Advanced security & compliance",
          "Dedicated infrastructure",
          "Custom SLAs",
          "On-site training"
        ],
        cta: "Contact Sales",
        popular: false,
        highlight: "Custom Pricing"
      }
    ];
    $$renderer2.push(`<section class="pricing-section py-20 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Early Access Pricing</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-4">Limited-time founder pricing for early adopters</p> <div class="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">🎉 50% Off First Year for Challengers</div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><!--[-->`);
    const each_array = ensure_array_like(plans);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let plan = each_array[$$index_1];
      $$renderer2.push(`<div class="pricing-card relative">`);
      if (plan.popular) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">Most Popular</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      Card($$renderer2, {
        class: `h-full flex flex-col ${stringify(plan.popular ? "border-2 border-primary shadow-xl" : "")}`,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="text-center mb-6"><h3 class="text-2xl font-bold text-gray-900 mb-2">${escape_html(plan.name)}</h3> <p class="text-gray-600 text-sm mb-4">${escape_html(plan.description)}</p> <div class="mb-2">`);
          if (plan.originalPrice) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-gray-400 line-through text-lg">${escape_html(plan.originalPrice)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="flex items-baseline justify-center gap-1"><span class="text-4xl font-bold text-gray-900">${escape_html(plan.price)}</span> `);
          if (plan.period !== "Contact us") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-gray-600">/${escape_html(plan.period)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="mt-2 text-sm font-semibold text-primary">${escape_html(plan.highlight)}</div></div> <ul class="space-y-3 mb-8 flex-grow"><!--[-->`);
          const each_array_1 = ensure_array_like(plan.features);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let feature = each_array_1[$$index];
            $$renderer3.push(`<li class="flex items-start gap-2 text-sm text-gray-700"><svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${escape_html(feature)}</span></li>`);
          }
          $$renderer3.push(`<!--]--></ul> `);
          Button($$renderer3, {
            variant: plan.popular ? "primary" : "outline",
            fullWidth: true,
            href: "#waitlist",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(plan.cta)}`);
            }
          });
          $$renderer3.push(`<!---->`);
        }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-12 text-center text-gray-600"><p class="mb-2">All plans include our 94% success rate guarantee</p> <p class="text-sm">No hidden fees • Cancel anytime • 30-day money-back guarantee</p></div></div></section>`);
  });
}
function Waitlist($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let name = "";
    let role = "solver";
    let loading = false;
    $$renderer2.push(`<section id="waitlist" class="py-20 bg-gradient-to-br from-primary to-secondary"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Join the Waitlist</h2> <p class="text-xl text-white/90 max-w-2xl mx-auto">Be among the first to access the world's largest problem-solving community. 
        Early members get exclusive benefits and founder pricing.</p></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form class="waitlist-form bg-white rounded-2xl p-8 shadow-2xl"><div class="space-y-6"><div><label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label> <input type="text" id="name"${attr("value", name)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John Doe"/></div> <div><label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label> <input type="email" id="email"${attr("value", email)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com"/></div> <div><label class="block text-sm font-semibold text-gray-700 mb-3">I'm interested in:</label> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><label${attr_class(`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${stringify(
        "border-primary bg-primary/5"
      )}`)}><input type="radio" name="role" value="solver"${attr("checked", role === "solver", true)} class="sr-only svelte-16g89jo"/> <div class="text-center"><div class="text-2xl mb-1">🧠</div> <div class="font-semibold text-gray-900">Solving</div> <div class="text-xs text-gray-600">Earn rewards</div></div></label> <label${attr_class(`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${stringify("border-gray-200 hover:border-gray-300")}`)}><input type="radio" name="role" value="challenger"${attr("checked", role === "challenger", true)} class="sr-only svelte-16g89jo"/> <div class="text-center"><div class="text-2xl mb-1">🎯</div> <div class="font-semibold text-gray-900">Posting</div> <div class="text-xs text-gray-600">Get solutions</div></div></label> <label${attr_class(`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${stringify("border-gray-200 hover:border-gray-300")}`)}><input type="radio" name="role" value="both"${attr("checked", role === "both", true)} class="sr-only svelte-16g89jo"/> <div class="text-center"><div class="text-2xl mb-1">🤝</div> <div class="font-semibold text-gray-900">Both</div> <div class="text-xs text-gray-600">Full access</div></div></label></div></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      Button($$renderer2, {
        type: "submit",
        variant: "primary",
        size: "lg",
        fullWidth: true,
        loading,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html("Join Waitlist")}`);
        }
      });
      $$renderer2.push(`<!----> <p class="text-xs text-gray-600 text-center">By joining, you agree to receive updates about OpenChance. Unsubscribe anytime.</p></div></form>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-12 text-center text-white/90"><p class="text-lg font-semibold mb-2">Join 10,000+ innovators already on the waitlist</p> <div class="flex items-center justify-center gap-8 text-sm"><div>🌍 50+ Countries</div> <div>🏢 500+ Organizations</div> <div>🚀 Growing Daily</div></div></div></div></section>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedCategory = "all";
    const categories = [
      "all",
      "sustainability",
      "healthcare",
      "smart-cities",
      "business-tech",
      "education",
      "environment",
      "social-impact"
    ];
    const filteredChallenges = mockChallenges.slice(0, 6);
    function handleApply(challengeId) {
      console.log("Applying to challenge:", challengeId);
      window.location.href = "#waitlist";
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>OpenChance - Global Problem-Solving Hub | Connect Challenges with Solutions</title>`);
      });
      $$renderer3.push(`<meta name="description" content="The world's largest problem-solving community. Connect brilliant minds with real-world challenges. From climate change to healthcare innovation, solve problems through collective intelligence."/> <meta name="keywords" content="problem solving, innovation, crowdsourcing, challenges, solutions, global community"/>`);
    });
    Hero($$renderer2);
    $$renderer2.push(`<!----> `);
    WhyUs($$renderer2);
    $$renderer2.push(`<!----> `);
    HowItWorks($$renderer2);
    $$renderer2.push(`<!----> <section class="challenges-section py-20 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Challenges</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">Explore real-world problems waiting to be solved. Earn rewards from $1K to $1M+</p></div> <div class="flex flex-wrap justify-center gap-3 mb-12"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${stringify(selectedCategory === category ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>${escape_html(category === "all" ? "All Categories" : category.replace("-", " "))}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredChallenges);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let challenge = each_array_1[$$index_1];
      ChallengeCard($$renderer2, { challenge, onApply: handleApply });
    }
    $$renderer2.push(`<!--]--></div> <div class="text-center"><a href="/product" class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl">View All ${escape_html(mockChallenges.length)}+ Challenges <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></a></div></div></section> `);
    Pricing($$renderer2);
    $$renderer2.push(`<!----> `);
    Waitlist($$renderer2);
    $$renderer2.push(`<!----> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
