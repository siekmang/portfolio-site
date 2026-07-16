import rss from "@astrojs/rss";
import { posts } from "data/posts";

export function GET(context) {
  const siteUrl = String(context.site).replace(/\/$/, "");

  return rss({
    title: "Greg Siekman - Blog",
    description:
      "A blog about automation, web development, ed tech tools, and more.",
    site: siteUrl,
    items: posts.map((post) => {
      const absolutePostUrl = `${siteUrl}/blog/${post.slug}`;

      const relativeImagePath = post.image
        ? post.image.replace(/^public\//, "")
        : null;
      const absoluteImageUrl = relativeImagePath
        ? `${siteUrl}/${relativeImagePath}`
        : null;

      return {
        title: post.title,
        pubDate: new Date(post.date),
        description: post.summary,
        link: absolutePostUrl,
        guid: absolutePostUrl, // Unique ID so feed readers track read/unread states
        content: post.content, // Full HTML content for in-app reading
        ...(absoluteImageUrl && {
          customData: `<enclosure url="${absoluteImageUrl}" type="image/png" length="0" />`,
        }),
      };
    }),
  });
}
