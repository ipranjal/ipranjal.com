/**
 * Markdown Article Loader
 * 
 * Utilities for loading and parsing markdown articles with frontmatter.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleMetadata {
  id: string;
  title: string;
  premise: string;
  tag?: 'Architecture' | 'AI' | 'Systems' | 'Leadership' | 'Engineering' | 'Case Study';
  date?: string;
  featuredImage?: string;
  featured?: boolean;
}

export interface Article extends ArticleMetadata {
  content: string;
  htmlContent: string;
}

/**
 * Get all article IDs for static generation
 */
export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

/**
 * Get metadata for all articles (for listing pages)
 */
export function getAllArticles(): ArticleMetadata[] {
  const ids = getAllArticleIds();
  const articles = ids.map(id => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id: data.id || id,
      title: data.title,
      premise: data.premise,
      tag: data.tag,
      date: data.date,
      featuredImage: data.featuredImage,
      featured: data.featured || false,
    };
  });

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get full article content by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const htmlContent = processedContent.toString();

    return {
      id: data.id || id,
      title: data.title,
      premise: data.premise,
      tag: data.tag,
      date: data.date,
      featuredImage: data.featuredImage,
      featured: data.featured || false,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error loading article ${id}:`, error);
    return null;
  }
}
