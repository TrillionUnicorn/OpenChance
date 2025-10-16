import { V as head, Y as attr, X as ensure_array_like, W as attr_class, Z as stringify } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const challenges = [
      {
        id: 1,
        title: "Clean Water Access in Rural Areas",
        category: "Environment",
        reward: "$50,000",
        participants: 234,
        deadline: "30 days",
        difficulty: "High",
        description: "Design a cost-effective water purification system for remote communities.",
        tags: ["Water", "Sustainability", "Engineering"]
      },
      {
        id: 2,
        title: "AI-Powered Learning Platform",
        category: "Education",
        reward: "$25,000",
        participants: 156,
        deadline: "45 days",
        difficulty: "Medium",
        description: "Create an adaptive learning system that personalizes education content.",
        tags: ["AI", "Education", "Software"]
      },
      {
        id: 3,
        title: "Sustainable Food Packaging",
        category: "Sustainability",
        reward: "$15,000",
        participants: 89,
        deadline: "60 days",
        difficulty: "Medium",
        description: "Develop biodegradable packaging that keeps food fresh longer.",
        tags: ["Packaging", "Sustainability", "Materials"]
      },
      {
        id: 4,
        title: "Urban Traffic Optimization",
        category: "Smart Cities",
        reward: "$75,000",
        participants: 312,
        deadline: "90 days",
        difficulty: "High",
        description: "Create an AI system to reduce traffic congestion in major cities.",
        tags: ["AI", "Transportation", "Urban Planning"]
      },
      {
        id: 5,
        title: "Telemedicine Platform for Rural Areas",
        category: "Healthcare",
        reward: "$40,000",
        participants: 178,
        deadline: "60 days",
        difficulty: "Medium",
        description: "Build a platform connecting rural patients with healthcare professionals.",
        tags: ["Healthcare", "Technology", "Accessibility"]
      },
      {
        id: 6,
        title: "Renewable Energy Storage Solution",
        category: "Energy",
        reward: "$100,000",
        participants: 445,
        deadline: "120 days",
        difficulty: "High",
        description: "Develop cost-effective energy storage for renewable sources.",
        tags: ["Energy", "Innovation", "Engineering"]
      }
    ];
    let selectedCategory = "all";
    let searchQuery = "";
    let sortBy = "newest";
    const categories = [
      "all",
      "Environment",
      "Education",
      "Healthcare",
      "Technology",
      "Sustainability",
      "Smart Cities",
      "Energy"
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Browse Challenges - OpenChance</title>`);
      });
    });
    $$renderer2.push(`<div class="challenges-page svelte-1b1r7oj"><header class="page-header svelte-1b1r7oj"><div class="container svelte-1b1r7oj"><h1 class="svelte-1b1r7oj">Browse Challenges</h1> <p class="svelte-1b1r7oj">Discover problems that match your expertise and make an impact</p></div></header> <div class="container svelte-1b1r7oj"><div class="filters-section svelte-1b1r7oj"><div class="search-bar svelte-1b1r7oj"><input type="text" placeholder="Search challenges..."${attr("value", searchQuery)} class="search-input svelte-1b1r7oj"/></div> <div class="filter-controls svelte-1b1r7oj"><div class="category-filters svelte-1b1r7oj"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`filter-btn ${stringify(selectedCategory === category ? "active" : "")}`, "svelte-1b1r7oj")}>${escape_html(category === "all" ? "All Categories" : category)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="sort-controls svelte-1b1r7oj"><label for="sort">Sort by:</label> `);
    $$renderer2.select({ id: "sort", value: sortBy, class: "sort-select" }, ($$renderer3) => {
      $$renderer3.option({ value: "newest" }, ($$renderer4) => {
        $$renderer4.push(`Newest First`);
      });
      $$renderer3.option({ value: "reward" }, ($$renderer4) => {
        $$renderer4.push(`Highest Reward`);
      });
      $$renderer3.option({ value: "deadline" }, ($$renderer4) => {
        $$renderer4.push(`Ending Soon`);
      });
      $$renderer3.option({ value: "popular" }, ($$renderer4) => {
        $$renderer4.push(`Most Popular`);
      });
    });
    $$renderer2.push(`</div></div></div> <div class="results-info svelte-1b1r7oj"><p>Showing ${escape_html(challenges.length)} challenges</p></div> <div class="challenges-grid svelte-1b1r7oj"><!--[-->`);
    const each_array_1 = ensure_array_like(challenges);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let challenge = each_array_1[$$index_2];
      $$renderer2.push(`<div class="challenge-card svelte-1b1r7oj"><div class="challenge-header svelte-1b1r7oj"><div class="challenge-category svelte-1b1r7oj">${escape_html(challenge.category)}</div> <div${attr_class(`challenge-difficulty ${stringify(challenge.difficulty.toLowerCase())}`, "svelte-1b1r7oj")}>${escape_html(challenge.difficulty)}</div></div> <h3 class="challenge-title svelte-1b1r7oj">${escape_html(challenge.title)}</h3> <p class="challenge-description svelte-1b1r7oj">${escape_html(challenge.description)}</p> <div class="challenge-tags svelte-1b1r7oj"><!--[-->`);
      const each_array_2 = ensure_array_like(challenge.tags);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let tag = each_array_2[$$index_1];
        $$renderer2.push(`<span class="tag svelte-1b1r7oj">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="challenge-stats svelte-1b1r7oj"><div class="stat-item svelte-1b1r7oj"><span class="stat-icon svelte-1b1r7oj">💰</span> <span class="stat-text">${escape_html(challenge.reward)}</span></div> <div class="stat-item svelte-1b1r7oj"><span class="stat-icon svelte-1b1r7oj">👥</span> <span class="stat-text">${escape_html(challenge.participants)} participants</span></div> <div class="stat-item svelte-1b1r7oj"><span class="stat-icon svelte-1b1r7oj">⏰</span> <span class="stat-text">${escape_html(challenge.deadline)} left</span></div></div> <div class="challenge-actions svelte-1b1r7oj"><a${attr("href", `/challenges/${stringify(challenge.id)}`)} class="btn-primary svelte-1b1r7oj">View Details</a> <button class="btn-secondary svelte-1b1r7oj">Save</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="pagination svelte-1b1r7oj"><button class="page-btn svelte-1b1r7oj">Previous</button> <button class="page-btn active svelte-1b1r7oj">1</button> <button class="page-btn svelte-1b1r7oj">2</button> <button class="page-btn svelte-1b1r7oj">3</button> <button class="page-btn svelte-1b1r7oj">Next</button></div></div></div>`);
  });
}
export {
  _page as default
};
