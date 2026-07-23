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
		slug: 'course-reset-tool',
		title: 'Canvas Test Course Reset Tool',
		date: '2026-07-23',
		summary: 'I recently built a Python utility that makes resetting your Canvas test course easier.',
		image: 'blog-img/course-tool.png',
		imageAlt: 'Screenshot of a dark screen showing the Test Course Reset Utility. Buttons for Configuration, Default Course Reset, Custom Course Reset and Quit are stacked in the middle.',
		content: `<p>In the process of building a <a href="https://github.com/siekmang/ops-tool">personal ops tool</a> to centralize a bunch of common work tasks, I created a process that resets my test courses. After using it for a bit, I realized it was something others might benefit from, so I worked on making a <a href="https://community.instructure.com/home/leaving?allowTrusted=1&amp;target=https%3A%2F%2Fgithub.com%2Fsiekmang%2Ftest-course-reset" rel="nofollow noopener ugc">standalone version</a> of it.</p>
		<p>The original verrsion was built in JavaScript because my ops tool is using Electron to run as an app. But I didn't want a heavy Electron setup for this course reset utility, so I opted to port the functions over to Python and wrap it all in a Textual UI. Needing the UI to at least be moderately pleasant to look at meant that Textual was a little heavier than I originally anticipated, but it came together nonetheless! It's packaged with pyinstaller, so it runs as a standalone file, which I thought was more accessible than needing to run a py file in the terminal.</p>
		<p>The tool is designed with Canvas admins in mind. When you open it up, you have the following buttons: 'Configuration,' 'Default Course Reset,' 'Custom Course Reset.' The configuration screen prompts you to enter their Canvas subdomain, an access key, the target course ID and the source course ID. Each step gives brief instructions on what you need to give it. subdomain is looking for something like "myschool" in "myschool.instructure.com." If you give it the full url, it will snip it back to just the subdomain. It does basic data validation for the other rows, checking that the access key is long enough to theoretically be an access key, and that the two course IDs are just numbers.</p>
		<p>Once your configuration is set up, you can user Default Course Reset to reset the course you just set with the other course's materials. The screen will throw a loading indicator while it waits for the response from Canvas. Once the response comes in, you get a confirmation and a command to click the link to go to the content migrations page. The reason that page was chosen as the landing page in Canvas is because content migrations take a while, and that screen has an indicator of the progress of the migration. I contemplated adding a progress bar in the tool, but opted against it as in introduced extra API calls.</p>
		<p>If you select Custom Course Search, it gives you a chance to select either your default course or a different course for both the target course and the source course. If you choose to use a different course, you can either enter the ID or the course name. The course name will run a search of courses available and give you a list to select from. If you're doing that for the target course and the course you selected doesn't have test in the name, it will ask you to confirm this is the course you wanted. Because this was designed around being a test course resetter, this felt like a reasonable thing to add. You can reset non-test courses if you want, but that's at your own risk. Once you've selected your custom courses, it runs just like Default Course Reset.</p>
		<p>The coolest thing about this tool is that it handles a weird Canvas quirk gracefully. In Canvas, when you reset a course, you are essentially deleting the old course and creating a new one with it's basic information. The id for the course changes. This can cause problems in automation, because you have to be careful about hard coding the id for a course you plan to reset more than once. This utility takes the returned course information from the API call when you reset the course, and replaces the old target course id in your config with the new one, so your config is always pointed at the newest version of your test course. It had a bug in it at first where it would replace the ID in your config at any time you ran a course reset, which was bad because it would replace your default target course when you ran a custom course search. To handle this, I added a check in the process:</p>
		<p><code>&nbsp;is_custom_course = (<br />&nbsp; &nbsp; target_course_id is not None<br />&nbsp; &nbsp; and target_course_id != default_env_course<br />&nbsp;)<br /><br />&nbsp;if not is_custom_course:<br />&nbsp; &nbsp;set_key(env_path, "TARGET_COURSE_ID", str(new_course_id))<br />&nbsp; &nbsp;os.environ["TARGET_COURSE_ID"] = str(new_course_id)</code></p>
		<p>Because the code only passes in a target_course_id when you're using the custom reset with a custom target course, this blocks it from overriding your config if you aren't using your default course. It's clever because it checks if you chose the custom course option but still chose your default course.</p>
		<p>Overall, it's meant to be a utility tool, not necessarily a consumer facing tool. But I hope people will get use out of it. It's certainly rough around the edge and has potential bug that I will continue to iron out as I find them or they get reported to me.</p>`,
		tags: ['edtech']
	},
	{
		slug: 'sprint-summary',
		title: 'Automating Sprint Summary Reports',
		date: '2026-07-23',
		summary: 'Reflecting on a python sprint summary tool I built.',
		content: `<p>For a few months, I was tasked with leading the sprint process on our team. This including running our debrief and planning meetings, and developing a summary write-up of what happened in the previous sprint for leadership on other teams. Despite leading the meetings, I wasn't always as sharply abreast on the specific details of what people were working on, which made it a bit tough to write the sprint summary from memory.</p>
		<p>Every two weeks, I could've opened up our Trello board and scrolled through cards and lists to write up this summary. That felt slow and tedious to me. So, I opened up me IDE and built a Python script that automated a little bit of this work. Using the Trello API, I pulled cards from the relevant lists in our board. The script dumped the cards into a csv, generated a data file, and created a template markdown file to draft into.</p>
		<p>The data file is my favorite part of the project. It attempts to establish keywords from the sprint by counting words from the titles and descriptions of cards. For example, one of the data files has a keyword "Field." It was in five cards, and then below the keyword, it lists the titles of each card. This section used a rudimentary filter list to filter out common words that weren't useful descriptions of the work being done(people's names.) It also attempts to use a frequency filter to determine relevancy. A word that is in 9 cards, for example, is assumed to be a common word and not a descriptive word of the work being done. The data sheet does this for completed items, and then in a separate list for active and planned items.</p>
		<p>At the bottom of the data file is then a 'Quick Scan Index' of the cards, which is just the card titles in a text list corresponding with the lists in Trello.</p>
		<p>With those files on hand, I was able to write the sprint summaries faster. I could use keywords to prompt what we got done and what we planned to get done. I could scan the cards to catch anything I missed. Once I was done drafting, I could run a formatter script that converted the markdown file into HTML; as that was a friendlier format for Outlook, and copied it to my clipboard.</p>
		<p>If I were going to pick this project up again, I would put more work into that formatter script. Outlook was a little fidgety with it's formatting preferences, and I always had to spend some time formatting it manually. I could also do more work on how it determines what a keyword is and surfacing relevant information from the cards.</p>`,
		tags: ['tooling']
	},
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
		tags: ['web']
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
