/**
 * ============================================
 * BLOG POSTS DATA
 * ============================================
 * All blog posts are defined here.
 * Each post includes: title, date, image, and summary text.
 * Optional fields: imageAlt, solution, and impact for detailed posts.
 */

export interface Post {
  slug: string;
	title: string;
	date: string;
	summary: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export const posts: Post[] = [];
