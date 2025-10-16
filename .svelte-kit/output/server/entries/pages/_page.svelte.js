import { V as head, X as ensure_array_like, W as attr_class, Z as stringify } from "../../chunks/index2.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer) {
  const challenges = [
    {
      id: 1,
      title: "Clean Water Access in Rural Areas",
      category: "Environment",
      reward: "$50,000",
      participants: 234,
      deadline: "30 days",
      difficulty: "High",
      description: "Design a cost-effective water purification system for remote communities."
    },
    {
      id: 2,
      title: "AI-Powered Learning Platform",
      category: "Education",
      reward: "$25,000",
      participants: 156,
      deadline: "45 days",
      difficulty: "Medium",
      description: "Create an adaptive learning system that personalizes education content."
    },
    {
      id: 3,
      title: "Sustainable Food Packaging",
      category: "Sustainability",
      reward: "$15,000",
      participants: 89,
      deadline: "60 days",
      difficulty: "Medium",
      description: "Develop biodegradable packaging that keeps food fresh longer."
    }
  ];
  let selectedCategory = "all";
  const categories = [
    "all",
    "Environment",
    "Education",
    "Healthcare",
    "Technology",
    "Sustainability"
  ];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>OpenChance - Global Problem-Solving Hub</title>`);
    });
  });
  $$renderer.push(`<div class="platform svelte-1uha8ag"><header class="hero svelte-1uha8ag"><h1 class="svelte-1uha8ag">🌍 OpenChance</h1> <p class="svelte-1uha8ag">Global Problem-Solving &amp; Collaboration Platform</p> <div class="hero-stats svelte-1uha8ag"><div class="stat svelte-1uha8ag"><div class="stat-number svelte-1uha8ag">1,247</div> <div class="stat-label svelte-1uha8ag">Active Challenges</div></div> <div class="stat svelte-1uha8ag"><div class="stat-number svelte-1uha8ag">15,892</div> <div class="stat-label svelte-1uha8ag">Problem Solvers</div></div> <div class="stat svelte-1uha8ag"><div class="stat-number svelte-1uha8ag">$2.3M</div> <div class="stat-label svelte-1uha8ag">Total Rewards</div></div></div></header> <div class="filters svelte-1uha8ag"><h2 class="svelte-1uha8ag">Browse Challenges</h2> <div class="category-filters svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(categories);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$renderer.push(`<button${attr_class(`filter-btn ${stringify(selectedCategory === category ? "active" : "")}`, "svelte-1uha8ag")}>${escape_html(category === "all" ? "All Categories" : category)}</button>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="challenges-grid svelte-1uha8ag"><!--[-->`);
  const each_array_1 = ensure_array_like(challenges);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let challenge = each_array_1[$$index_1];
    $$renderer.push(`<div class="challenge-card svelte-1uha8ag"><div class="challenge-header svelte-1uha8ag"><div class="challenge-category svelte-1uha8ag">${escape_html(challenge.category)}</div> <div${attr_class(`challenge-difficulty ${stringify(challenge.difficulty.toLowerCase())}`, "svelte-1uha8ag")}>${escape_html(challenge.difficulty)}</div></div> <h3 class="challenge-title svelte-1uha8ag">${escape_html(challenge.title)}</h3> <p class="challenge-description svelte-1uha8ag">${escape_html(challenge.description)}</p> <div class="challenge-stats svelte-1uha8ag"><div class="stat-item svelte-1uha8ag"><span class="stat-icon svelte-1uha8ag">💰</span> <span class="stat-text">${escape_html(challenge.reward)}</span></div> <div class="stat-item svelte-1uha8ag"><span class="stat-icon svelte-1uha8ag">👥</span> <span class="stat-text">${escape_html(challenge.participants)} participants</span></div> <div class="stat-item svelte-1uha8ag"><span class="stat-icon svelte-1uha8ag">⏰</span> <span class="stat-text">${escape_html(challenge.deadline)} left</span></div></div> <div class="challenge-actions svelte-1uha8ag"><button class="btn-primary svelte-1uha8ag">Join Challenge</button> <button class="btn-secondary svelte-1uha8ag">Learn More</button></div></div>`);
  }
  $$renderer.push(`<!--]--></div> <div class="cta-section svelte-1uha8ag"><h2 class="svelte-1uha8ag">Have a Problem to Solve?</h2> <p class="svelte-1uha8ag">Post your challenge and connect with innovators worldwide</p> <button class="btn-cta svelte-1uha8ag">Create Challenge</button></div></div>`);
}
export {
  _page as default
};
