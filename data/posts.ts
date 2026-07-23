/**
 * ============================================
 * BLOG POSTS DATA
 * ============================================
 * All blog posts are defined here.
 * Each post includes: title, date, and summary text.
 * Optional fields: image, imageAlt.
 */

export interface Post {
  slug: string;
	title: string;
	date: string;
	summary: string;
  image?: string;
  imageAlt?: string;
	content: string;
  tags?: string[];
}

export const posts: Post[] = [
	{
		slug: 'astro-port',
		title: 'Porting my Personal Website from Astro',
		date: '2026-07-16',
		summary: 'Outlining the benefits of porting to Astro, and the lessons learned along the way.',
		image: 'blog-img/personal-site.png',
		imageAlt: `A picture of Greg Siekman's personal website.`,
		content: `<p>A few years ago, I built my website: <a href="https://siekmang.com" target="_blank">siekmang.com</a>. I wrote it with vanilla HTML, CSS and JavaScript because that is what I knew at the time. Since then, I've been battling with layout shift on first load of the site. Recently, when I decided to build out my developer site, I decided to use Astro. I was captivated by the speed at which pages load. After finishing that site(or this site, I guess,) I was intrigued if I could get similar performance on my personal site by switching over to Astro.</p>
		<p>I thought it was going to be a whole refactoring journey, building out components and layouts, but I was able to drop my existing site into an Astro project, change .html to .astro, move a few things around to the right places in the directory and have a functioning site. Better yet, the performance gains were already clear! The biggest issue I had in the port over had to do with my use of document selectors in some of my JavaScript. The solution was to use script tags for my existing JS files.</p>
		<p>Another thing that took some reworking was my header generator. What it currently does is pull the slug from the page, if that slug is privacy, sets the header to Privacy Policy, and if it's not, defaults the header to my name. How I was doing that in my old code:</p>
		<p><code> var page = window.location.pathname.split("/").pop();</code></p>
		<p>In the Astro build of the site, that kept turning up blank. After a little bit of troubleshooting, I figured out that it was easier to just peel away any back-slashes and just leave the slug using removeAll. That got the header generator working. At that point, I merged the astro code into main, and Cloudflare Pages built and shipped it.</p>
		<p>As a side note, I really gained an appreciation for Cloudflare Pages in the process. It's integration with GitHub is so effortless and it built every push in a preview environment, which helped increase my confidence that what I was going to eventually ship to main was going to work. Another tip: astro dev is great for visual changes on your site, but I got tricked a few times by things not working in that environment. astro build and astro preview swooped in to save the day on that.</p>
		<p>I still plan to move toward components and layouts for that site eventually, as well as replacing my bloated css with Tailwind, but having the performance upgrades from the jump with Astro was a really nice quality of life upgrade for my site.</p>`,
		tags: ["web"]
	}
];

export function getAllTags(): string[] {
	const allTags = posts.flatMap((post) => post.tags ?? []);
	const uniqueTags = [...new Set(allTags.map((tag) => tag.toLowerCase()))];
	return uniqueTags.sort();
}

export function getPostsByTag(tag: string): Post[] {
	return posts.filter((post) =>
		post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
	);
}
