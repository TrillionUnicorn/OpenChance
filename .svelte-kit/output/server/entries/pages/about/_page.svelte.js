import { V as head, X as ensure_array_like, Y as attr } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  const team = [
    {
      name: "Hunter Ho",
      role: "Founder & CEO",
      bio: "Former innovation consultant with 50+ successful projects",
      image: "https://via.placeholder.com/150/667eea/ffffff?text=HH"
    }
  ];
  const stats = [
    { label: "Active Challenges", value: "1,247" },
    { label: "Problem Solvers", value: "15,892" },
    { label: "Total Rewards", value: "$2.3M" },
    { label: "Success Rate", value: "94%" }
  ];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>About Us - OpenChance</title>`);
    });
  });
  $$renderer.push(`<div class="about-page svelte-cwls5q"><section class="hero svelte-cwls5q"><h1 class="svelte-cwls5q">About OpenChance</h1> <p class="subtitle svelte-cwls5q">Connecting the world's brightest minds with the biggest challenges</p></section> <section class="mission svelte-cwls5q"><div class="container svelte-cwls5q"><h2 class="svelte-cwls5q">Our Mission</h2> <p class="large-text svelte-cwls5q">We believe that every problem has a solution, and every solution has a solver. OpenChance
				bridges the gap between organizations facing complex challenges and the global community of
				innovators ready to solve them.</p></div></section> <section class="stats-section svelte-cwls5q"><div class="container svelte-cwls5q"><div class="stats-grid svelte-cwls5q"><!--[-->`);
  const each_array = ensure_array_like(stats);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let stat = each_array[$$index];
    $$renderer.push(`<div class="stat-card svelte-cwls5q"><div class="stat-value svelte-cwls5q">${escape_html(stat.value)}</div> <div class="stat-label svelte-cwls5q">${escape_html(stat.label)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="story svelte-cwls5q"><div class="container svelte-cwls5q"><h2 class="svelte-cwls5q">Our Story</h2> <p class="svelte-cwls5q">OpenChance was born from a simple observation: the world's most pressing problems often go
				unsolved not because solutions don't exist, but because the right people never connect.</p> <p class="svelte-cwls5q">Traditional consulting is expensive, slow, and limited to a small network. Academic research
				is thorough but often disconnected from real-world implementation. Internal R&amp;D teams are
				constrained by organizational boundaries.</p> <p class="svelte-cwls5q">We created OpenChance to break down these barriers. By building a global marketplace for
				problem-solving, we enable organizations to tap into unlimited expertise while giving
				innovators the opportunity to make a real impact.</p></div></section> <section class="team svelte-cwls5q"><div class="container svelte-cwls5q"><h2 class="svelte-cwls5q">Meet Our Team</h2> <div class="team-grid svelte-cwls5q"><!--[-->`);
  const each_array_1 = ensure_array_like(team);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let member = each_array_1[$$index_1];
    $$renderer.push(`<div class="team-card svelte-cwls5q"><img${attr("src", member.image)}${attr("alt", member.name)} class="svelte-cwls5q"/> <h3 class="svelte-cwls5q">${escape_html(member.name)}</h3> <p class="role svelte-cwls5q">${escape_html(member.role)}</p> <p class="bio svelte-cwls5q">${escape_html(member.bio)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="values svelte-cwls5q"><div class="container svelte-cwls5q"><h2 class="svelte-cwls5q">Our Values</h2> <div class="values-grid svelte-cwls5q"><div class="value-card svelte-cwls5q"><div class="icon svelte-cwls5q">🌍</div> <h3 class="svelte-cwls5q">Global Impact</h3> <p class="svelte-cwls5q">We believe in solving problems that matter, at scale.</p></div> <div class="value-card svelte-cwls5q"><div class="icon svelte-cwls5q">🤝</div> <h3 class="svelte-cwls5q">Collaboration</h3> <p class="svelte-cwls5q">The best solutions come from diverse perspectives working together.</p></div> <div class="value-card svelte-cwls5q"><div class="icon svelte-cwls5q">💡</div> <h3 class="svelte-cwls5q">Innovation</h3> <p class="svelte-cwls5q">We encourage bold thinking and unconventional approaches.</p></div> <div class="value-card svelte-cwls5q"><div class="icon svelte-cwls5q">⚖️</div> <h3 class="svelte-cwls5q">Fairness</h3> <p class="svelte-cwls5q">Merit-based rewards and transparent evaluation for all.</p></div></div></div></section> <section class="cta svelte-cwls5q"><div class="container svelte-cwls5q"><h2 class="svelte-cwls5q">Join Our Mission</h2> <p class="svelte-cwls5q">Be part of the global problem-solving revolution</p> <div class="cta-buttons svelte-cwls5q"><a href="/challenges" class="btn-primary svelte-cwls5q">Browse Challenges</a> <a href="/contact" class="btn-secondary svelte-cwls5q">Get in Touch</a></div></div></section></div>`);
}
export {
  _page as default
};
