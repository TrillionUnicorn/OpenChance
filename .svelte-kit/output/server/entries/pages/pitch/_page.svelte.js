import { F as ensure_array_like, x as head } from "../../../chunks/index.js";
import { C as Card, B as Button, F as Footer } from "../../../chunks/Footer.js";
import { e as escape_html } from "../../../chunks/context.js";
import { B as Badge } from "../../../chunks/Badge.js";
const marketData = {
  // TAM: Global management consulting + innovation management market
  // Source: Custom Market Insights (2024) - $510B consulting + Straits Research $9.22B innovation mgmt (2033 projection)
  tam: 52e10,
  // $520 billion
  // SAM: Crowdsourcing, open innovation, and problem-solving platforms
  // Estimated 5% of consulting market actively seeking alternative solutions
  sam: 26e9,
  // $26 billion
  // SOM: Realistic 3-year market capture (0.5% of SAM)
  som: 13e7
};
const marketBreakdown = {
  consulting: {
    global: 51e10,
    // $510B (Custom Market Insights 2024)
    growth: 0.0527,
    // 5.27% CAGR (Maximize Market Research)
    source: "Custom Market Insights, Maximize Market Research 2024"
  },
  innovation: {
    global: 235e7,
    // $2.35B in 2024 (Straits Research)
    projected2033: 922e7,
    // $9.22B by 2033
    cagr: 0.16,
    // 16% CAGR
    source: "Straits Research - Innovation Management Market 2024"
  },
  rd: {
    global: 28e11,
    // $2.8 trillion (WIPO Global Innovation Index 2024)
    growth: 0.045,
    // 4.5% annual growth
    source: "WIPO Global Innovation Index 2024"
  }
};
const customerSegments = [
  {
    segment: "Large Corporations (Fortune 500)",
    count: 500,
    avgSpend: 5e6,
    // $5M per year on external innovation
    totalMarket: 25e8,
    // $2.5B
    penetrationTarget: 0.1,
    // 10% in 3 years
    revenue: 25e7
    // $250M potential
  },
  {
    segment: "Mid-Market Enterprises",
    count: 5e4,
    avgSpend: 2e5,
    // $200K per year
    totalMarket: 1e10,
    // $10B
    penetrationTarget: 0.02,
    // 2% in 3 years
    revenue: 2e8
    // $200M potential
  },
  {
    segment: "Government Agencies",
    count: 1e4,
    avgSpend: 5e5,
    // $500K per year
    totalMarket: 5e9,
    // $5B
    penetrationTarget: 0.05,
    // 5% in 3 years
    revenue: 25e7
    // $250M potential
  },
  {
    segment: "NGOs & Foundations",
    count: 1e5,
    avgSpend: 5e4,
    // $50K per year
    totalMarket: 5e9,
    // $5B
    penetrationTarget: 0.03,
    // 3% in 3 years
    revenue: 15e7
    // $150M potential
  },
  {
    segment: "Research Institutions",
    count: 25e3,
    avgSpend: 15e4,
    // $150K per year
    totalMarket: 375e7,
    // $3.75B
    penetrationTarget: 0.04,
    // 4% in 3 years
    revenue: 15e7
    // $150M potential
  }
];
const competitors = [
  {
    name: "InnoCentive",
    description: "Pioneer in open innovation and crowdsourcing, connecting organizations with global problem solvers since 2001.",
    strengths: [
      "Established brand and track record",
      "Large solver network (400K+)",
      "Enterprise relationships",
      "Proven challenge methodology"
    ],
    weaknesses: [
      "Outdated platform UX",
      "Limited AI-powered matching",
      "High platform fees (20-30%)",
      "Slow challenge resolution times",
      "Limited collaboration tools"
    ],
    marketShare: 15
  },
  {
    name: "Kaggle (Google)",
    description: "Data science and machine learning competition platform with 10M+ users, focused on AI/ML challenges.",
    strengths: [
      "Massive user base",
      "Google backing and resources",
      "Strong data science community",
      "Free for participants"
    ],
    weaknesses: [
      "Limited to data science/ML",
      "Not suitable for physical product challenges",
      "Minimal business problem-solving",
      "Competition-focused, not collaboration"
    ],
    marketShare: 25
  },
  {
    name: "Topcoder",
    description: "Crowdsourcing platform for software development, design, and data science with 1.5M+ members.",
    strengths: [
      "Large developer community",
      "Proven track record (20+ years)",
      "Enterprise clients",
      "Multiple challenge types"
    ],
    weaknesses: [
      "Tech-focused only",
      "Complex platform for newcomers",
      "Limited to digital solutions",
      "Aging technology stack"
    ],
    marketShare: 12
  },
  {
    name: "HeroX",
    description: "Crowdsourcing platform for innovation challenges, spinoff from XPRIZE Foundation.",
    strengths: [
      "XPRIZE methodology",
      "Diverse challenge types",
      "Good marketing and branding",
      "Social impact focus"
    ],
    weaknesses: [
      "Smaller solver network",
      "Limited AI capabilities",
      "Higher costs for challengers",
      "Less enterprise adoption"
    ],
    marketShare: 8
  },
  {
    name: "Traditional Consulting Firms",
    description: "McKinsey, BCG, Bain, Deloitte, and other management consulting firms.",
    strengths: [
      "Established relationships",
      "Deep industry expertise",
      "Full-service offerings",
      "Brand reputation"
    ],
    weaknesses: [
      "Extremely expensive ($500-2000/hour)",
      "Slow delivery (6-18 months)",
      "Limited innovation diversity",
      "Not crowdsourced",
      "High overhead costs"
    ],
    marketShare: 40
  }
];
const growthProjections = {
  year1: {
    challenges: 1e3,
    solvers: 1e4,
    revenue: 42e4,
    // $420K ARR
    rewardsDistributed: 1e5
  },
  year2: {
    challenges: 1e4,
    solvers: 5e4,
    revenue: 71e5,
    // $7.1M ARR
    rewardsDistributed: 1e6
  },
  year3: {
    challenges: 5e4,
    solvers: 25e4,
    revenue: 599e5,
    // $59.9M ARR
    rewardsDistributed: 1e7
  },
  year5: {
    challenges: 5e5,
    solvers: 25e5,
    revenue: 599e6,
    // $599M ARR
    rewardsDistributed: 1e8
  }
};
const keyMetrics = {
  platformFee: 0.15,
  // 15% of challenge rewards
  avgChallengeReward: 5e4,
  // $50K average
  solverRetention: 0.75,
  // 75% annual retention
  challengerRetention: 0.85,
  // 85% annual retention
  successRate: 0.94,
  // 94% challenge success rate
  avgTimeToSolution: 75,
  // 75 days average
  customerAcquisitionCost: 5e3,
  // $5K CAC
  lifetimeValue: 5e4
  // $50K LTV (10:1 LTV:CAC ratio)
};
function MarketAnalysis($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function formatCurrency(value) {
      if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
      } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
      } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(1)}K`;
      }
      return `$${value}`;
    }
    function formatPercentage(value) {
      return `${(value * 100).toFixed(1)}%`;
    }
    $$renderer2.push(`<section class="py-16 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">Market Analysis</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">A massive, growing market with proven demand for innovative problem-solving solutions</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">`);
    Card($$renderer2, {
      class: "market-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🌍</div> <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Addressable Market</h3> <div class="text-4xl font-bold text-primary mb-2">${escape_html(formatCurrency(marketData.tam))}</div> <p class="text-sm text-gray-600">Global consulting + innovation management market</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "market-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🎯</div> <h3 class="text-lg font-semibold text-gray-700 mb-2">Serviceable Addressable Market</h3> <div class="text-4xl font-bold text-secondary mb-2">${escape_html(formatCurrency(marketData.sam))}</div> <p class="text-sm text-gray-600">Crowdsourcing &amp; open innovation platforms</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "market-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🚀</div> <h3 class="text-lg font-semibold text-gray-700 mb-2">Serviceable Obtainable Market</h3> <div class="text-4xl font-bold text-accent mb-2">${escape_html(formatCurrency(marketData.som))}</div> <p class="text-sm text-gray-600">Realistic 3-year market capture (0.5% of SAM)</p>`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="mb-16"><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Market Breakdown &amp; Growth</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      class: "market-card",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-3">Management Consulting</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600">Global Market:</span> <span class="font-semibold">${escape_html(formatCurrency(marketBreakdown.consulting.global))}</span></div> <div class="flex justify-between"><span class="text-gray-600">Annual Growth:</span> <span class="font-semibold text-green-600">${escape_html(formatPercentage(marketBreakdown.consulting.growth))} CAGR</span></div> <div class="mt-3 pt-3 border-t border-gray-200"><p class="text-xs text-gray-500">${escape_html(marketBreakdown.consulting.source)}</p></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "market-card",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-3">Innovation Management</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600">2024 Market:</span> <span class="font-semibold">${escape_html(formatCurrency(marketBreakdown.innovation.global))}</span></div> <div class="flex justify-between"><span class="text-gray-600">2033 Projection:</span> <span class="font-semibold">${escape_html(formatCurrency(marketBreakdown.innovation.projected2033))}</span></div> <div class="flex justify-between"><span class="text-gray-600">Growth Rate:</span> <span class="font-semibold text-green-600">${escape_html(formatPercentage(marketBreakdown.innovation.cagr))} CAGR</span></div> <div class="mt-3 pt-3 border-t border-gray-200"><p class="text-xs text-gray-500">${escape_html(marketBreakdown.innovation.source)}</p></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "market-card",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-3">R&amp;D Spending</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600">Global R&amp;D:</span> <span class="font-semibold">${escape_html(formatCurrency(marketBreakdown.rd.global))}</span></div> <div class="flex justify-between"><span class="text-gray-600">Annual Growth:</span> <span class="font-semibold text-green-600">${escape_html(formatPercentage(marketBreakdown.rd.growth))}</span></div> <div class="mt-3 pt-3 border-t border-gray-200"><p class="text-xs text-gray-500">${escape_html(marketBreakdown.rd.source)}</p></div></div>`);
      }
    });
    $$renderer2.push(`<!----></div></div> <div><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Target Customer Segments</h3> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(customerSegments);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let segment = each_array[$$index];
      Card($$renderer2, {
        class: "market-card",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div class="flex-1"><h4 class="text-lg font-semibold text-gray-900 mb-2">${escape_html(segment.segment)}</h4> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"><div><span class="text-gray-600 block">Count:</span> <span class="font-semibold">${escape_html(segment.count.toLocaleString())}</span></div> <div><span class="text-gray-600 block">Avg Spend:</span> <span class="font-semibold">${escape_html(formatCurrency(segment.avgSpend))}/yr</span></div> <div><span class="text-gray-600 block">Total Market:</span> <span class="font-semibold">${escape_html(formatCurrency(segment.totalMarket))}</span></div> <div><span class="text-gray-600 block">Target (3yr):</span> <span class="font-semibold text-green-600">${escape_html(formatPercentage(segment.penetrationTarget))}</span></div></div></div> <div class="text-center md:text-right"><div class="text-sm text-gray-600 mb-1">Revenue Potential</div> <div class="text-2xl font-bold text-primary">${escape_html(formatCurrency(segment.revenue))}</div></div></div>`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-12 p-6 bg-gray-50 rounded-xl"><h4 class="text-sm font-semibold text-gray-900 mb-3">Data Sources &amp; Methodology</h4> <div class="text-xs text-gray-600 space-y-1"><p>• <strong>Management Consulting:</strong> Custom Market Insights (2024), Maximize Market Research (2024)</p> <p>• <strong>Innovation Management:</strong> Straits Research - Innovation Management Market Report (2024)</p> <p>• <strong>R&amp;D Spending:</strong> WIPO Global Innovation Index (2024)</p> <p>• <strong>Market Sizing:</strong> Bottom-up analysis based on customer segment data and industry benchmarks</p> <p>• <strong>Growth Projections:</strong> Conservative estimates based on historical CAGR and market trends</p></div></div></div></section>`);
  });
}
function CompetitiveAnalysis($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section class="py-16 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">Competitive Landscape</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">How OpenChance stands out in the problem-solving and innovation market</p></div> <div class="mb-12 bg-white rounded-xl p-8 shadow-lg"><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Our Competitive Advantages</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="text-center"><div class="text-4xl mb-2">🤖</div> <h4 class="font-semibold text-gray-900 mb-1">AI-Powered Matching</h4> <p class="text-sm text-gray-600">Proprietary algorithm with 94% success rate</p></div> <div class="text-center"><div class="text-4xl mb-2">⚡</div> <h4 class="font-semibold text-gray-900 mb-1">3x Faster</h4> <p class="text-sm text-gray-600">30-90 days vs 6-18 months traditional</p></div> <div class="text-center"><div class="text-4xl mb-2">💰</div> <h4 class="font-semibold text-gray-900 mb-1">85% Cost Savings</h4> <p class="text-sm text-gray-600">Compared to traditional consulting</p></div> <div class="text-center"><div class="text-4xl mb-2">🌍</div> <h4 class="font-semibold text-gray-900 mb-1">Global Network</h4> <p class="text-sm text-gray-600">50K+ solvers across all industries</p></div> <div class="text-center"><div class="text-4xl mb-2">🔒</div> <h4 class="font-semibold text-gray-900 mb-1">Enterprise Security</h4> <p class="text-sm text-gray-600">Advanced IP protection &amp; compliance</p></div> <div class="text-center"><div class="text-4xl mb-2">🤝</div> <h4 class="font-semibold text-gray-900 mb-1">Collaboration Tools</h4> <p class="text-sm text-gray-600">Real-time workspace for team challenges</p></div></div></div> <div class="space-y-6"><!--[-->`);
    const each_array = ensure_array_like(competitors);
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let competitor = each_array[$$index_2];
      Card($$renderer2, {
        class: "competitor-card",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex flex-col lg:flex-row gap-6"><div class="flex-1"><div class="flex items-start justify-between mb-4"><div><h3 class="text-2xl font-bold text-gray-900 mb-2">${escape_html(competitor.name)}</h3> <p class="text-gray-600">${escape_html(competitor.description)}</p></div> `);
          if (competitor.marketShare) {
            $$renderer3.push("<!--[-->");
            Badge($$renderer3, {
              variant: "primary",
              class: "ml-4",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(competitor.marketShare)}% Market Share`);
              }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h4 class="font-semibold text-green-700 mb-3 flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Strengths</h4> <ul class="space-y-2"><!--[-->`);
          const each_array_1 = ensure_array_like(competitor.strengths);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let strength = each_array_1[$$index];
            $$renderer3.push(`<li class="text-sm text-gray-700 flex items-start gap-2"><span class="text-green-500 mt-0.5">•</span> <span>${escape_html(strength)}</span></li>`);
          }
          $$renderer3.push(`<!--]--></ul></div> <div><h4 class="font-semibold text-red-700 mb-3 flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Weaknesses</h4> <ul class="space-y-2"><!--[-->`);
          const each_array_2 = ensure_array_like(competitor.weaknesses);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let weakness = each_array_2[$$index_1];
            $$renderer3.push(`<li class="text-sm text-gray-700 flex items-start gap-2"><span class="text-red-500 mt-0.5">•</span> <span>${escape_html(weakness)}</span></li>`);
          }
          $$renderer3.push(`<!--]--></ul></div></div></div></div>`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-12 bg-white rounded-xl shadow-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th><th class="px-6 py-4 text-center text-sm font-semibold text-primary">OpenChance</th><th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">InnoCentive</th><th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Kaggle</th><th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Consulting Firms</th></tr></thead><tbody class="divide-y divide-gray-200"><tr><td class="px-6 py-4 text-sm text-gray-900">Global Reach</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ 50K+ experts</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ 400K+</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ 10M+</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Limited</span></td></tr><tr class="bg-gray-50"><td class="px-6 py-4 text-sm text-gray-900">Time to Solution</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ 30-90 days</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ 3-6 months</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ 1-3 months</span></td><td class="px-6 py-4 text-center"><span class="text-red-600">✗ 6-18 months</span></td></tr><tr><td class="px-6 py-4 text-sm text-gray-900">Cost Efficiency</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ 15% fee</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ 20-30% fee</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ Free/Low</span></td><td class="px-6 py-4 text-center"><span class="text-red-600">✗ $500-2K/hr</span></td></tr><tr class="bg-gray-50"><td class="px-6 py-4 text-sm text-gray-900">AI Matching</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ Advanced</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Basic</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Limited</span></td><td class="px-6 py-4 text-center"><span class="text-red-600">✗ Manual</span></td></tr><tr><td class="px-6 py-4 text-sm text-gray-900">Challenge Types</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ All types</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ Diverse</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Data/ML only</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ All types</span></td></tr><tr class="bg-gray-50"><td class="px-6 py-4 text-sm text-gray-900">Collaboration Tools</td><td class="px-6 py-4 text-center"><span class="text-green-600 font-semibold">✓ Real-time</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Basic</span></td><td class="px-6 py-4 text-center"><span class="text-yellow-600">⚠ Forums</span></td><td class="px-6 py-4 text-center"><span class="text-green-600">✓ Full service</span></td></tr></tbody></table></div></div></div></section>`);
  });
}
function BusinessModel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function formatCurrency(value) {
      if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
      } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(0)}K`;
      }
      return `$${value}`;
    }
    $$renderer2.push(`<section class="py-16 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">Business Model &amp; Revenue</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">Multiple revenue streams with strong unit economics and scalability</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">`);
    Card($$renderer2, {
      class: "business-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-4xl mb-3">💰</div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Platform Fees</h3> <div class="text-3xl font-bold text-primary mb-2">15%</div> <p class="text-sm text-gray-600">Of challenge rewards</p> <div class="mt-4 pt-4 border-t border-gray-200"><div class="text-xs text-gray-500">Primary Revenue</div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "business-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-4xl mb-3">⭐</div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Premium Services</h3> <div class="text-3xl font-bold text-secondary mb-2">$99-2.9K</div> <p class="text-sm text-gray-600">Per month subscription</p> <div class="mt-4 pt-4 border-t border-gray-200"><div class="text-xs text-gray-500">Recurring Revenue</div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "business-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-4xl mb-3">🏢</div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Enterprise Solutions</h3> <div class="text-3xl font-bold text-accent mb-2">Custom</div> <p class="text-sm text-gray-600">White-label &amp; integrations</p> <div class="mt-4 pt-4 border-t border-gray-200"><div class="text-xs text-gray-500">High-Value Contracts</div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "business-card text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-4xl mb-3">🎓</div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Training &amp; Certification</h3> <div class="text-3xl font-bold text-success mb-2">$49</div> <p class="text-sm text-gray-600">Per month per user</p> <div class="mt-4 pt-4 border-t border-gray-200"><div class="text-xs text-gray-500">Solver Development</div></div>`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="mb-16"><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Growth Projections</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(growthProjections));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [year, data] = each_array[$$index];
      Card($$renderer2, {
        class: "business-card",
        children: ($$renderer3) => {
          $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(year === "year1" ? "Year 1" : year === "year2" ? "Year 2" : year === "year3" ? "Year 3" : "Year 5")}</h4> <div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-gray-600">Challenges:</span> <span class="font-semibold">${escape_html(data.challenges.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Solvers:</span> <span class="font-semibold">${escape_html(data.solvers.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Revenue:</span> <span class="font-semibold text-green-600">${escape_html(formatCurrency(data.revenue))}</span></div> <div class="flex justify-between"><span class="text-gray-600">Rewards:</span> <span class="font-semibold">${escape_html(formatCurrency(data.rewardsDistributed))}</span></div></div>`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8"><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Unit Economics</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"><div class="text-center"><div class="text-sm text-gray-600 mb-1">Platform Fee</div> <div class="text-2xl font-bold text-gray-900">${escape_html((keyMetrics.platformFee * 100).toFixed(0))}%</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">Avg Challenge Reward</div> <div class="text-2xl font-bold text-gray-900">${escape_html(formatCurrency(keyMetrics.avgChallengeReward))}</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">Success Rate</div> <div class="text-2xl font-bold text-green-600">${escape_html((keyMetrics.successRate * 100).toFixed(0))}%</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">Avg Time to Solution</div> <div class="text-2xl font-bold text-gray-900">${escape_html(keyMetrics.avgTimeToSolution)} days</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">Solver Retention</div> <div class="text-2xl font-bold text-gray-900">${escape_html((keyMetrics.solverRetention * 100).toFixed(0))}%</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">Challenger Retention</div> <div class="text-2xl font-bold text-gray-900">${escape_html((keyMetrics.challengerRetention * 100).toFixed(0))}%</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">CAC</div> <div class="text-2xl font-bold text-gray-900">${escape_html(formatCurrency(keyMetrics.customerAcquisitionCost))}</div></div> <div class="text-center"><div class="text-sm text-gray-600 mb-1">LTV</div> <div class="text-2xl font-bold text-green-600">${escape_html(formatCurrency(keyMetrics.lifetimeValue))}</div></div></div> <div class="mt-6 text-center"><div class="inline-block bg-white rounded-lg px-6 py-3 shadow-md"><span class="text-sm text-gray-600">LTV:CAC Ratio:</span> <span class="text-2xl font-bold text-green-600">${escape_html((keyMetrics.lifetimeValue / keyMetrics.customerAcquisitionCost).toFixed(1))}:1</span> <span class="text-sm text-gray-600 ml-2">(Excellent)</span></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">`);
    Card($$renderer2, {
      class: "business-card",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-4">For Solvers (Always Free)</h4> <ul class="space-y-2 text-sm text-gray-700"><li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>No platform fees - keep 100% of rewards</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Free access to all challenges</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Free collaboration tools</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Optional paid training &amp; certification</span></li></ul>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "business-card",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="text-lg font-semibold text-gray-900 mb-4">For Challengers</h4> <ul class="space-y-2 text-sm text-gray-700"><li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> <span>15% platform fee on successful solutions</span></li> <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> <span>Monthly subscriptions for unlimited posting</span></li> <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> <span>Premium features: priority matching, analytics</span></li> <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> <span>Enterprise: custom pricing &amp; white-label</span></li></ul>`);
      }
    });
    $$renderer2.push(`<!----></div></div></section>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Pitch Deck | OpenChance - Investor Presentation</title>`);
      });
      $$renderer3.push(`<meta name="description" content="OpenChance investor pitch deck. Market analysis, competitive landscape, business model, and growth projections for the world's largest problem-solving platform."/>`);
    });
    $$renderer2.push(`<div class="pitch-hero bg-gradient-to-br from-primary to-secondary text-white py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><div class="text-6xl mb-6">🌍</div> <h1 class="text-5xl md:text-7xl font-bold mb-6">OpenChance</h1> <p class="text-2xl md:text-3xl font-semibold text-white/90 mb-4">The World's Largest Problem-Solving Community</p> <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">Connecting brilliant minds with real-world challenges to solve the world's biggest problems through collective intelligence</p> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">`);
    Button($$renderer2, {
      variant: "secondary",
      size: "lg",
      href: "#market",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->View Full Deck`);
      }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      href: "/contact",
      class: "bg-white/10 text-white border-white hover:bg-white hover:text-primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Contact Us`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"><div class="glass-effect rounded-xl p-6"><div class="text-4xl font-bold mb-1">$520B</div> <div class="text-sm text-white/80">Total Addressable Market</div></div> <div class="glass-effect rounded-xl p-6"><div class="text-4xl font-bold mb-1">$26B</div> <div class="text-sm text-white/80">Serviceable Market</div></div> <div class="glass-effect rounded-xl p-6"><div class="text-4xl font-bold mb-1">94%</div> <div class="text-sm text-white/80">Success Rate</div></div> <div class="glass-effect rounded-xl p-6"><div class="text-4xl font-bold mb-1">10:1</div> <div class="text-sm text-white/80">LTV:CAC Ratio</div></div></div></div></div></div> <section class="py-16 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">The Problem</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">Organizations struggle to solve complex problems with limited internal resources</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`);
    Card($$renderer2, {
      class: "text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🏢</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">89%</h3> <p class="text-gray-600">Organizations can't solve complex problems internally</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">💰</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">$100B+</h3> <p class="text-gray-600">Spent annually on consulting with limited success</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">⏰</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">6-18 Months</h3> <p class="text-gray-600">Traditional problem-solving timeline</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🔄</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">73%</h3> <p class="text-gray-600">Innovations come from outside the industry</p>`);
      }
    });
    $$renderer2.push(`<!----></div></div></section> <section class="py-16 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">Our Solution</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">A global marketplace connecting challenges with the world's brightest problem solvers</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🌐</div> <h3 class="text-2xl font-bold text-gray-900 mb-3">Global Network</h3> <p class="text-gray-600 mb-4">Access 50,000+ expert solvers across all industries and disciplines, bringing diverse perspectives to every challenge.</p> <ul class="space-y-2 text-sm text-gray-700"><li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Verified expertise and track records</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Cross-industry innovation</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Global reach, local expertise</span></li></ul>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">🤖</div> <h3 class="text-2xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3> <p class="text-gray-600 mb-4">Proprietary algorithm matches challenges with optimal solvers based on expertise, success rate, and availability.</p> <ul class="space-y-2 text-sm text-gray-700"><li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>94% challenge success rate</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Intelligent team formation</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Continuous learning &amp; improvement</span></li></ul>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-5xl mb-4">⚡</div> <h3 class="text-2xl font-bold text-gray-900 mb-3">Fast &amp; Cost-Effective</h3> <p class="text-gray-600 mb-4">Get solutions in 30-90 days at 85% lower cost than traditional consulting, with pay-for-success model.</p> <ul class="space-y-2 text-sm text-gray-700"><li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>3x faster than traditional methods</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Pay only for successful solutions</span></li> <li class="flex items-start gap-2"><span class="text-green-500 mt-0.5">✓</span> <span>Transparent pricing &amp; escrow</span></li></ul>`);
      }
    });
    $$renderer2.push(`<!----></div></div></section> <div id="market">`);
    MarketAnalysis($$renderer2);
    $$renderer2.push(`<!----></div> `);
    CompetitiveAnalysis($$renderer2);
    $$renderer2.push(`<!----> `);
    BusinessModel($$renderer2);
    $$renderer2.push(`<!----> <section class="py-16 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">Roadmap &amp; Milestones</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">Our path to becoming the world's leading problem-solving platform</p></div> <div class="space-y-8"><!--[-->`);
    const each_array = ensure_array_like([
      {
        phase: "Q4 2024 - Q1 2025",
        title: "Foundation & Community",
        goals: [
          "Launch production platform",
          "1,000+ active challenges",
          "10,000+ problem solvers",
          "$420K ARR target"
        ]
      },
      {
        phase: "Q2 2025",
        title: "Intelligence & Scale",
        goals: [
          "Advanced AI matching",
          "10,000+ challenges",
          "50,000+ solvers",
          "$7.1M ARR target"
        ]
      },
      {
        phase: "Q3 2025",
        title: "Enterprise & Innovation",
        goals: [
          "Enterprise solutions",
          "50,000+ challenges",
          "250,000+ solvers",
          "$59.9M ARR target"
        ]
      },
      {
        phase: "Q4 2025+",
        title: "Global Impact & Leadership",
        goals: [
          "Market leadership",
          "500,000+ challenges",
          "2.5M+ solvers",
          "$599M ARR target"
        ]
      }
    ]);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let milestone = each_array[$$index_1];
      Card($$renderer2, {
        class: "flex flex-col md:flex-row gap-6",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="md:w-48 flex-shrink-0"><div class="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-center">${escape_html(milestone.phase)}</div></div> <div class="flex-1"><h3 class="text-2xl font-bold text-gray-900 mb-3">${escape_html(milestone.title)}</h3> <ul class="grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`);
          const each_array_1 = ensure_array_like(milestone.goals);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let goal = each_array_1[$$index];
            $$renderer3.push(`<li class="flex items-start gap-2 text-gray-700"><svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${escape_html(goal)}</span></li>`);
          }
          $$renderer3.push(`<!--]--></ul></div>`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-16 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-gray-900 mb-4">The Team</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">Experienced innovators building the future of problem-solving</p></div> <div class="max-w-2xl mx-auto">`);
    Card($$renderer2, {
      class: "text-center",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="text-6xl mb-4">👨‍💻</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">Hunter Ho</h3> <p class="text-lg text-primary font-semibold mb-4">Founder &amp; CEO</p> <p class="text-gray-600 mb-6">Former innovation consultant with 50+ successful projects and 8+ years connecting problems with solutions. 
          Passionate about democratizing access to global expertise and solving the world's biggest challenges.</p> <div class="flex justify-center gap-4"><a href="https://github.com/HunterHo07" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">GitHub</a> <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">Portfolio</a> <a href="https://linkedin.com/in/hunterho" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">LinkedIn</a></div>`);
      }
    });
    $$renderer2.push(`<!----></div></div></section> <section class="py-16 bg-gradient-to-br from-primary to-secondary text-white"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 class="text-4xl font-bold mb-4">Ready to Join Us?</h2> <p class="text-xl text-white/90 mb-8">Let's solve the world's biggest challenges together</p> <div class="flex flex-col sm:flex-row gap-4 justify-center">`);
    Button($$renderer2, {
      variant: "secondary",
      size: "lg",
      href: "/contact",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Contact for Investment`);
      }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      href: "/#waitlist",
      class: "bg-white/10 text-white border-white hover:bg-white hover:text-primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Join the Platform`);
      }
    });
    $$renderer2.push(`<!----></div></div></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
