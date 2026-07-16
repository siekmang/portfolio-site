import rss from "@astrojs/rss";
import { posts } from "data/posts";

export function GET(context) {
  return rss({
    title: "Greg Siekman - Blog",
    description:
      "A blog about automation, web development, ed tech tools, and more.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.summary,
      link: `/blog/${post.slug}`,
    })),
  });
}
