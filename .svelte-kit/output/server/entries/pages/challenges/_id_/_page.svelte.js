import { V as head, W as attr_class, X as ensure_array_like, Y as attr, Z as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer) {
  const challenge = {
    title: "Clean Water Access in Rural Areas",
    category: "Environment",
    reward: "$50,000",
    participants: 234,
    difficulty: "High",
    description: "Design a cost-effective water purification system for remote communities without access to clean water infrastructure.",
    fullDescription: `
			We are seeking innovative solutions to provide clean, safe drinking water to rural communities 
			in developing regions. The solution must be:
			
			- Cost-effective (under $100 per household)
			- Easy to maintain with minimal training
			- Sustainable and environmentally friendly
			- Scalable to serve communities of 100-1000 people
			- Able to purify water from various sources (rivers, wells, rainwater)
		`,
    requirements: [
      "Detailed technical specifications",
      "Cost breakdown and ROI analysis",
      "Implementation plan",
      "Maintenance guidelines",
      "Environmental impact assessment"
    ],
    deliverables: [
      "Working prototype or detailed design",
      "Technical documentation",
      "Implementation roadmap",
      "Cost analysis",
      "Pilot test results (if available)"
    ],
    tags: ["Water", "Sustainability", "Engineering", "Social Impact"],
    postedBy: {
      name: "Global Water Initiative",
      avatar: "https://via.placeholder.com/50/667eea/ffffff?text=GWI",
      rating: 4.8,
      challengesPosted: 12
    },
    timeline: {
      posted: "2 days ago",
      deadline: "March 15, 2025"
    }
  };
  const topSolvers = [
    {
      name: "Sarah Chen",
      avatar: "https://via.placeholder.com/40/10b981/ffffff?text=SC",
      expertise: "Water Engineering",
      rating: 4.9,
      solved: 23
    },
    {
      name: "Michael Rodriguez",
      avatar: "https://via.placeholder.com/40/3b82f6/ffffff?text=MR",
      expertise: "Sustainable Design",
      rating: 4.8,
      solved: 18
    },
    {
      name: "Aisha Patel",
      avatar: "https://via.placeholder.com/40/f59e0b/ffffff?text=AP",
      expertise: "Environmental Science",
      rating: 4.7,
      solved: 15
    }
  ];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(challenge.title)} - OpenChance</title>`);
    });
  });
  $$renderer.push(`<div class="challenge-detail-page svelte-wqeme3"><div class="container svelte-wqeme3"><div class="breadcrumb svelte-wqeme3"><a href="/challenges" class="svelte-wqeme3">← Back to Challenges</a></div> <div class="challenge-header svelte-wqeme3"><div class="header-main"><div class="category-badge svelte-wqeme3">${escape_html(challenge.category)}</div> <h1 class="svelte-wqeme3">${escape_html(challenge.title)}</h1> <p class="short-description svelte-wqeme3">${escape_html(challenge.description)}</p> <div class="meta-info svelte-wqeme3"><div class="meta-item svelte-wqeme3"><span class="icon svelte-wqeme3">💰</span> <span class="label svelte-wqeme3">Reward:</span> <span class="value svelte-wqeme3">${escape_html(challenge.reward)}</span></div> <div class="meta-item svelte-wqeme3"><span class="icon svelte-wqeme3">⏰</span> <span class="label svelte-wqeme3">Deadline:</span> <span class="value svelte-wqeme3">${escape_html(challenge.timeline.deadline)}</span></div> <div class="meta-item svelte-wqeme3"><span class="icon svelte-wqeme3">👥</span> <span class="label svelte-wqeme3">Participants:</span> <span class="value svelte-wqeme3">${escape_html(challenge.participants)}</span></div> <div class="meta-item svelte-wqeme3"><span class="icon svelte-wqeme3">📊</span> <span class="label svelte-wqeme3">Difficulty:</span> <span${attr_class(`value difficulty-${stringify(challenge.difficulty.toLowerCase())}`, "svelte-wqeme3")}>${escape_html(challenge.difficulty)}</span></div></div> <div class="tags svelte-wqeme3"><!--[-->`);
  const each_array = ensure_array_like(challenge.tags);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tag = each_array[$$index];
    $$renderer.push(`<span class="tag svelte-wqeme3">${escape_html(tag)}</span>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="header-actions svelte-wqeme3"><button class="btn-primary btn-large svelte-wqeme3">Apply Now</button> <button class="btn-secondary svelte-wqeme3">Save Challenge</button> <button class="btn-secondary svelte-wqeme3">Share</button></div></div> <div class="content-grid svelte-wqeme3"><div class="main-content"><section class="section svelte-wqeme3"><h2 class="svelte-wqeme3">Challenge Description</h2> <div class="description-content svelte-wqeme3">${escape_html(challenge.fullDescription)}</div></section> <section class="section svelte-wqeme3"><h2 class="svelte-wqeme3">Requirements</h2> <ul class="requirements-list svelte-wqeme3"><!--[-->`);
  const each_array_1 = ensure_array_like(challenge.requirements);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let requirement = each_array_1[$$index_1];
    $$renderer.push(`<li class="svelte-wqeme3">${escape_html(requirement)}</li>`);
  }
  $$renderer.push(`<!--]--></ul></section> <section class="section svelte-wqeme3"><h2 class="svelte-wqeme3">Deliverables</h2> <ul class="deliverables-list svelte-wqeme3"><!--[-->`);
  const each_array_2 = ensure_array_like(challenge.deliverables);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let deliverable = each_array_2[$$index_2];
    $$renderer.push(`<li class="svelte-wqeme3">${escape_html(deliverable)}</li>`);
  }
  $$renderer.push(`<!--]--></ul></section> <section class="section svelte-wqeme3"><h2 class="svelte-wqeme3">Timeline</h2> <div class="timeline svelte-wqeme3"><div class="timeline-item svelte-wqeme3"><div class="timeline-dot svelte-wqeme3"></div> <div class="timeline-content"><div class="timeline-title svelte-wqeme3">Challenge Posted</div> <div class="timeline-date svelte-wqeme3">${escape_html(challenge.timeline.posted)}</div></div></div> <div class="timeline-item svelte-wqeme3"><div class="timeline-dot active svelte-wqeme3"></div> <div class="timeline-content"><div class="timeline-title svelte-wqeme3">Applications Open</div> <div class="timeline-date svelte-wqeme3">Now</div></div></div> <div class="timeline-item svelte-wqeme3"><div class="timeline-dot svelte-wqeme3"></div> <div class="timeline-content"><div class="timeline-title svelte-wqeme3">Deadline</div> <div class="timeline-date svelte-wqeme3">${escape_html(challenge.timeline.deadline)}</div></div></div></div></section></div> <div class="sidebar"><div class="card svelte-wqeme3"><h3 class="svelte-wqeme3">Posted By</h3> <div class="poster-info svelte-wqeme3"><img${attr("src", challenge.postedBy.avatar)}${attr("alt", challenge.postedBy.name)} class="svelte-wqeme3"/> <div class="poster-details"><div class="poster-name svelte-wqeme3">${escape_html(challenge.postedBy.name)}</div> <div class="poster-stats svelte-wqeme3"><span>⭐ ${escape_html(challenge.postedBy.rating)}</span> <span>📝 ${escape_html(challenge.postedBy.challengesPosted)} challenges</span></div></div></div> <button class="btn-secondary btn-full svelte-wqeme3">View Profile</button></div> <div class="card svelte-wqeme3"><h3 class="svelte-wqeme3">Top Solvers Interested</h3> <div class="solvers-list svelte-wqeme3"><!--[-->`);
  const each_array_3 = ensure_array_like(topSolvers);
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let solver = each_array_3[$$index_3];
    $$renderer.push(`<div class="solver-item svelte-wqeme3"><img${attr("src", solver.avatar)}${attr("alt", solver.name)} class="svelte-wqeme3"/> <div class="solver-info"><div class="solver-name svelte-wqeme3">${escape_html(solver.name)}</div> <div class="solver-expertise svelte-wqeme3">${escape_html(solver.expertise)}</div> <div class="solver-stats svelte-wqeme3">⭐ ${escape_html(solver.rating)} • ✅ ${escape_html(solver.solved)} solved</div></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="card svelte-wqeme3"><h3 class="svelte-wqeme3">Similar Challenges</h3> <div class="similar-challenges svelte-wqeme3"><a href="/challenges/2" class="similar-item svelte-wqeme3"><div class="similar-title svelte-wqeme3">AI-Powered Learning Platform</div> <div class="similar-reward svelte-wqeme3">$25,000</div></a> <a href="/challenges/4" class="similar-item svelte-wqeme3"><div class="similar-title svelte-wqeme3">Urban Traffic Optimization</div> <div class="similar-reward svelte-wqeme3">$75,000</div></a></div></div></div></div></div></div>`);
}
export {
  _page as default
};
