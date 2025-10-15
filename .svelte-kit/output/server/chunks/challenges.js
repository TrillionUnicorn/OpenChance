import { y as attr, F as ensure_array_like } from "./index.js";
import { C as Card, B as Button } from "./Footer.js";
import { B as Badge } from "./Badge.js";
import { e as escape_html } from "./context.js";
function ChallengeCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { challenge, onApply, showApplyButton = true } = $$props;
    function formatReward(reward) {
      if (reward.type === "fixed" && reward.amount) {
        return `$${(reward.amount / 1e3).toFixed(0)}K`;
      } else if (reward.type === "range" && reward.min && reward.max) {
        return `$${(reward.min / 1e3).toFixed(0)}K - $${(reward.max / 1e3).toFixed(0)}K`;
      } else if (reward.type === "milestone" && reward.milestones) {
        const total = reward.milestones.reduce((sum, m) => sum + m.amount, 0);
        return `$${(total / 1e3).toFixed(0)}K`;
      }
      return "TBD";
    }
    function formatDeadline(deadline) {
      const now = /* @__PURE__ */ new Date();
      const diff = deadline.getTime() - now.getTime();
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      if (days < 0) return "Expired";
      if (days === 0) return "Today";
      if (days === 1) return "1 day left";
      if (days < 30) return `${days} days left`;
      if (days < 60) return "1 month left";
      const months = Math.floor(days / 30);
      return `${months} months left`;
    }
    function getDifficultyColor(difficulty) {
      switch (difficulty) {
        case "beginner":
        case "intermediate":
          return "success";
        case "advanced":
          return "warning";
        case "expert":
          return "danger";
        default:
          return "warning";
      }
    }
    function getCategoryIcon(category) {
      const icons = {
        "sustainability": "🌱",
        "healthcare": "🏥",
        "smart-cities": "🏙️",
        "business-tech": "💼",
        "education": "🎓",
        "environment": "🌍",
        "social-impact": "🤝"
      };
      return icons[category] || "💡";
    }
    Card($$renderer2, {
      hover: true,
      class: "h-full flex flex-col",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-start justify-between mb-4"><div class="flex items-center gap-2"><span class="text-2xl">${escape_html(getCategoryIcon(challenge.category))}</span> `);
        Badge($$renderer3, {
          variant: "primary",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(challenge.category.replace("-", " "))}`);
          }
        });
        $$renderer3.push(`<!----></div> `);
        Badge($$renderer3, {
          variant: getDifficultyColor(challenge.difficulty),
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(challenge.difficulty)}`);
          }
        });
        $$renderer3.push(`<!----></div> <h3 class="text-xl font-bold mb-3 line-clamp-2 text-gray-900 svelte-1igz2zx">${escape_html(challenge.title)}</h3> <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow svelte-1igz2zx">${escape_html(challenge.description)}</p> <div class="space-y-2 mb-4"><div class="flex items-center justify-between text-sm"><span class="text-gray-500 flex items-center gap-1"><span>💰</span> <span class="font-semibold">Reward:</span></span> <span class="font-bold text-green-600">${escape_html(formatReward(challenge.reward))}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-500 flex items-center gap-1"><span>👥</span> <span class="font-semibold">Applicants:</span></span> <span class="font-medium text-gray-700">${escape_html(challenge.applicants)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-500 flex items-center gap-1"><span>⏰</span> <span class="font-semibold">Deadline:</span></span> <span class="font-medium text-gray-700">${escape_html(formatDeadline(challenge.deadline))}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-500 flex items-center gap-1"><span>🏢</span> <span class="font-semibold">Organization:</span></span> <span class="font-medium text-gray-700 truncate max-w-[150px]"${attr("title", challenge.organizationName)}>${escape_html(challenge.organizationName)}</span></div></div> <div class="flex flex-wrap gap-1 mb-4"><!--[-->`);
        const each_array = ensure_array_like(challenge.tags.slice(0, 3));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tag = each_array[$$index];
          Badge($$renderer3, {
            variant: "outline",
            class: "text-xs",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(tag)}`);
            }
          });
        }
        $$renderer3.push(`<!--]--> `);
        if (challenge.tags.length > 3) {
          $$renderer3.push("<!--[-->");
          Badge($$renderer3, {
            variant: "outline",
            class: "text-xs",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->+${escape_html(challenge.tags.length - 3)}`);
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> `);
        if (showApplyButton) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex gap-2 mt-auto">`);
          Button($$renderer3, {
            variant: "primary",
            fullWidth: true,
            onclick: () => onApply?.(challenge.id),
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Apply Now`);
            }
          });
          $$renderer3.push(`<!----> `);
          Button($$renderer3, {
            variant: "outline",
            onclick: () => {
            },
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Details`);
            }
          });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
  });
}
const mockChallenges = [
  {
    id: "ch-001",
    title: "Carbon Capture Innovation for Industrial Plants",
    description: "Design a cost-effective carbon capture system that can be retrofitted to existing industrial facilities. The solution must capture at least 90% of CO2 emissions while maintaining operational efficiency. Focus on scalability and economic viability for mid-sized manufacturing plants.",
    category: "sustainability",
    difficulty: "expert",
    reward: {
      type: "fixed",
      amount: 5e5,
      currency: "USD"
    },
    requirements: {
      skills: ["Chemical Engineering", "Environmental Science", "Process Design", "Cost Analysis"],
      experience: "Minimum 5 years in industrial engineering or environmental technology",
      deliverables: [
        "Detailed technical design and specifications",
        "Cost-benefit analysis",
        "Prototype or proof-of-concept",
        "Implementation roadmap",
        "Environmental impact assessment"
      ],
      constraints: [
        "Must work with existing infrastructure",
        "ROI within 5 years",
        "Comply with EPA regulations"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2025-12-31"),
    status: "open",
    applicants: 47,
    views: 1234,
    createdAt: /* @__PURE__ */ new Date("2024-10-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-14"),
    organizationId: "org-001",
    organizationName: "Global Climate Solutions Inc.",
    tags: ["climate-tech", "carbon-capture", "sustainability", "industrial"],
    featured: true
  },
  {
    id: "ch-002",
    title: "AI-Powered Telemedicine Platform for Rural Healthcare",
    description: "Create an AI-assisted telemedicine platform that enables remote diagnosis and treatment in underserved rural areas. The system should work with limited internet connectivity and provide real-time translation for multiple languages. Include features for vital sign monitoring integration and prescription management.",
    category: "healthcare",
    difficulty: "advanced",
    reward: {
      type: "range",
      min: 75e3,
      max: 15e4,
      currency: "USD"
    },
    requirements: {
      skills: ["AI/ML", "Healthcare IT", "Mobile Development", "UX Design", "HIPAA Compliance"],
      experience: "Experience in healthcare technology or telemedicine",
      deliverables: [
        "Functional web and mobile applications",
        "AI diagnostic assistance module",
        "Offline-capable architecture",
        "Security and compliance documentation",
        "User training materials"
      ],
      constraints: [
        "HIPAA compliant",
        "Works with 2G/3G networks",
        "Support for 10+ languages"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2025-09-30"),
    status: "open",
    applicants: 89,
    views: 2156,
    createdAt: /* @__PURE__ */ new Date("2024-09-15"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-13"),
    organizationId: "org-002",
    organizationName: "HealthBridge Foundation",
    tags: ["healthcare", "ai", "telemedicine", "rural-health", "accessibility"],
    featured: true
  },
  {
    id: "ch-003",
    title: "Smart Traffic Management System for Urban Areas",
    description: "Develop an intelligent traffic management system that uses real-time data from IoT sensors, cameras, and mobile devices to optimize traffic flow in congested urban areas. The solution should reduce average commute times by at least 20% and integrate with existing city infrastructure.",
    category: "smart-cities",
    difficulty: "advanced",
    reward: {
      type: "milestone",
      currency: "USD",
      milestones: [
        { name: "Prototype & Simulation", amount: 5e4, description: "Working prototype with simulation results" },
        { name: "Pilot Implementation", amount: 1e5, description: "Successful pilot in one district" },
        { name: "Full Deployment", amount: 1e5, description: "City-wide deployment and 20% improvement" }
      ]
    },
    requirements: {
      skills: ["IoT", "Data Analytics", "Machine Learning", "Urban Planning", "Systems Integration"],
      experience: "Smart city or transportation technology experience preferred",
      deliverables: [
        "System architecture and design",
        "IoT sensor integration plan",
        "Traffic prediction algorithms",
        "Real-time dashboard",
        "Implementation and maintenance guide"
      ],
      constraints: [
        "Compatible with existing city infrastructure",
        "Privacy-compliant data collection",
        "Scalable to 1M+ vehicles"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2026-03-31"),
    status: "open",
    applicants: 34,
    views: 987,
    createdAt: /* @__PURE__ */ new Date("2024-10-05"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-14"),
    organizationId: "org-003",
    organizationName: "Metro City Council",
    tags: ["smart-city", "iot", "traffic", "urban-planning", "ai"],
    featured: false
  },
  {
    id: "ch-004",
    title: "Blockchain-Based Supply Chain Transparency Platform",
    description: "Build a blockchain-powered platform that provides end-to-end supply chain transparency for ethical sourcing. The system should track products from origin to consumer, verify certifications, and provide immutable audit trails. Focus on fashion and food industries initially.",
    category: "business-tech",
    difficulty: "advanced",
    reward: {
      type: "fixed",
      amount: 12e4,
      currency: "USD"
    },
    requirements: {
      skills: ["Blockchain", "Smart Contracts", "Supply Chain Management", "Web3", "API Development"],
      experience: "Blockchain development and supply chain experience",
      deliverables: [
        "Blockchain architecture design",
        "Smart contract implementation",
        "Web and mobile interfaces",
        "Integration APIs for existing systems",
        "Documentation and training materials"
      ],
      constraints: [
        "Support for multiple blockchain networks",
        "Low transaction costs",
        "User-friendly for non-technical users"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2025-11-30"),
    status: "open",
    applicants: 56,
    views: 1543,
    createdAt: /* @__PURE__ */ new Date("2024-09-20"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-12"),
    organizationId: "org-004",
    organizationName: "Ethical Trade Alliance",
    tags: ["blockchain", "supply-chain", "transparency", "web3", "sustainability"],
    featured: false
  },
  {
    id: "ch-005",
    title: "Adaptive Learning Platform for STEM Education",
    description: "Create an AI-powered adaptive learning platform that personalizes STEM education for K-12 students. The system should assess individual learning styles, pace, and knowledge gaps, then dynamically adjust content and teaching methods. Include gamification elements and progress tracking for parents and teachers.",
    category: "education",
    difficulty: "intermediate",
    reward: {
      type: "range",
      min: 4e4,
      max: 8e4,
      currency: "USD"
    },
    requirements: {
      skills: ["EdTech", "AI/ML", "Curriculum Design", "Gamification", "Learning Analytics"],
      experience: "Education technology or instructional design background",
      deliverables: [
        "Adaptive learning algorithm",
        "Interactive learning modules for math and science",
        "Student assessment system",
        "Teacher and parent dashboards",
        "Pilot study results with 100+ students"
      ],
      constraints: [
        "COPPA compliant",
        "Accessible (WCAG 2.1 AA)",
        "Works on tablets and low-end devices"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2025-08-31"),
    status: "open",
    applicants: 67,
    views: 1876,
    createdAt: /* @__PURE__ */ new Date("2024-09-10"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-14"),
    organizationId: "org-005",
    organizationName: "Future Learners Foundation",
    tags: ["education", "ai", "edtech", "stem", "adaptive-learning"],
    featured: true
  },
  {
    id: "ch-006",
    title: "Biodegradable Packaging from Agricultural Waste",
    description: "Develop a manufacturing process to create biodegradable packaging materials from agricultural waste (rice husks, corn stalks, etc.). The packaging must be cost-competitive with plastic, fully compostable within 90 days, and suitable for food contact. Provide scalable production methodology.",
    category: "sustainability",
    difficulty: "expert",
    reward: {
      type: "fixed",
      amount: 2e5,
      currency: "USD"
    },
    requirements: {
      skills: ["Materials Science", "Chemical Engineering", "Manufacturing", "Food Safety", "Sustainability"],
      experience: "Materials engineering or sustainable packaging experience",
      deliverables: [
        "Material formulation and specifications",
        "Manufacturing process design",
        "Cost analysis and pricing model",
        "Biodegradability testing results",
        "Food safety certifications",
        "Scalability roadmap"
      ],
      constraints: [
        "Cost within 20% of plastic alternatives",
        "FDA food contact approved",
        "Compostable within 90 days"
      ]
    },
    deadline: /* @__PURE__ */ new Date("2026-01-31"),
    status: "open",
    applicants: 23,
    views: 654,
    createdAt: /* @__PURE__ */ new Date("2024-10-08"),
    updatedAt: /* @__PURE__ */ new Date("2024-10-14"),
    organizationId: "org-006",
    organizationName: "EcoPackage Innovations",
    tags: ["sustainability", "packaging", "biodegradable", "agriculture", "circular-economy"],
    featured: false
  }
];
export {
  ChallengeCard as C,
  mockChallenges as m
};
