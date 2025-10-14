import { x as head, y as attr, F as ensure_array_like, J as attr_class, G as stringify } from "../../../chunks/index.js";
import { C as ChallengeCard, m as mockChallenges } from "../../../chunks/challenges.js";
import { B as Button, F as Footer } from "../../../chunks/Footer.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedDifficulty = "all";
    let sortBy = "newest";
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
    const difficulties = ["all", "beginner", "intermediate", "advanced", "expert"];
    const filteredAndSortedChallenges = () => {
      let filtered = mockChallenges;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query) || c.tags.some((tag) => tag.toLowerCase().includes(query)));
      }
      if (selectedCategory !== "all") {
        filtered = filtered.filter((c) => c.category === selectedCategory);
      }
      if (selectedDifficulty !== "all") {
        filtered = filtered.filter((c) => c.difficulty === selectedDifficulty);
      }
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.createdAt.getTime() - a.createdAt.getTime();
          case "reward":
            const aReward = a.reward.amount || a.reward.max || 0;
            const bReward = b.reward.amount || b.reward.max || 0;
            return bReward - aReward;
          case "deadline":
            return a.deadline.getTime() - b.deadline.getTime();
          case "popular":
            return b.applicants - a.applicants;
          default:
            return 0;
        }
      });
      return sorted;
    };
    function handleApply(challengeId) {
      console.log("Applying to challenge:", challengeId);
      alert(`Application feature coming soon! Challenge ID: ${challengeId}`);
    }
    function getCategoryIcon(category) {
      const icons = {
        "all": "🌐",
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
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Browse Challenges | OpenChance</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Explore 1,000+ active challenges across sustainability, healthcare, technology, and more. Earn rewards from $1K to $1M+ by solving real-world problems."/>`);
    });
    $$renderer2.push(`<div class="product-header bg-gradient-to-br from-primary to-secondary text-white py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-8"><h1 class="text-4xl md:text-6xl font-bold mb-4">Browse Challenges</h1> <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">Discover ${escape_html(mockChallenges.length)}+ real-world problems waiting to be solved</p></div> <div class="max-w-2xl mx-auto"><div class="relative"><input type="text"${attr("value", searchQuery)} placeholder="Search challenges by title, description, or tags..." class="w-full px-6 py-4 pr-12 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"/> <svg class="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto"><div class="glass-effect rounded-lg p-4 text-center"><div class="text-2xl font-bold">${escape_html(filteredAndSortedChallenges().length)}</div> <div class="text-sm text-white/80">Matching Challenges</div></div> <div class="glass-effect rounded-lg p-4 text-center"><div class="text-2xl font-bold">$50M+</div> <div class="text-sm text-white/80">Total Rewards</div></div> <div class="glass-effect rounded-lg p-4 text-center"><div class="text-2xl font-bold">94%</div> <div class="text-sm text-white/80">Success Rate</div></div> <div class="glass-effect rounded-lg p-4 text-center"><div class="text-2xl font-bold">50K+</div> <div class="text-sm text-white/80">Active Solvers</div></div></div></div></div> <div class="bg-gray-50 min-h-screen py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="filters-section bg-white rounded-xl shadow-md p-6 mb-8"><div class="flex flex-col lg:flex-row gap-6"><div class="flex-1"><label class="block text-sm font-semibold text-gray-700 mb-2">Category</label> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${stringify(selectedCategory === category ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>${escape_html(getCategoryIcon(category))} ${escape_html(category === "all" ? "All" : category.replace("-", " "))}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="w-full lg:w-48"><label class="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label> `);
    $$renderer2.select(
      {
        value: selectedDifficulty,
        class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(difficulties);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let difficulty = each_array_1[$$index_1];
          $$renderer3.option({ value: difficulty }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1))}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="w-full lg:w-48"><label class="block text-sm font-semibold text-gray-700 mb-2">Sort By</label> `);
    $$renderer2.select(
      {
        value: sortBy,
        class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "newest" }, ($$renderer4) => {
          $$renderer4.push(`Newest First`);
        });
        $$renderer3.option({ value: "reward" }, ($$renderer4) => {
          $$renderer4.push(`Highest Reward`);
        });
        $$renderer3.option({ value: "deadline" }, ($$renderer4) => {
          $$renderer4.push(`Deadline Soon`);
        });
        $$renderer3.option({ value: "popular" }, ($$renderer4) => {
          $$renderer4.push(`Most Popular`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="w-full lg:w-auto flex items-end gap-2"><button${attr_class(`p-2 rounded-lg ${stringify(
      "bg-primary text-white"
    )}`)} title="Grid View"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button> <button${attr_class(`p-2 rounded-lg ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)} title="List View"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div></div> <div class="mb-6 flex items-center justify-between"><p class="text-gray-600">Showing <span class="font-semibold text-gray-900">${escape_html(filteredAndSortedChallenges().length)}</span> challenges</p> `);
    if (searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="text-primary hover:text-primary-dark font-medium text-sm">Clear Filters</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredAndSortedChallenges().length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      )}><!--[-->`);
      const each_array_2 = ensure_array_like(filteredAndSortedChallenges());
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let challenge = each_array_2[$$index_2];
        ChallengeCard($$renderer2, { challenge, onApply: handleApply });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="text-center py-16"><div class="text-6xl mb-4">🔍</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">No challenges found</h3> <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p> `);
      Button($$renderer2, {
        variant: "primary",
        onclick: () => {
          searchQuery = "";
          selectedCategory = "all";
          selectedDifficulty = "all";
        },
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Clear All Filters`);
        }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
