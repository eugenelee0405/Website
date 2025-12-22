import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { StockPost, ResearchArticle } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getStockPosts(): StockPost[] {
  const stockDir = path.join(contentDirectory, 'stock-analysis');
  
  if (!fs.existsSync(stockDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(stockDir);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(stockDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        rating: data.rating || 'Hold',
        excerpt: data.excerpt || '',
        content,
      } as StockPost;
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getStockPost(slug: string): StockPost | null {
  const stockDir = path.join(contentDirectory, 'stock-analysis');
  const fullPath = path.join(stockDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    rating: data.rating || 'Hold',
    excerpt: data.excerpt || '',
    content,
  } as StockPost;
}

export async function getStockPostWithHtml(slug: string): Promise<StockPost & { contentHtml: string } | null> {
  const post = getStockPost(slug);
  if (!post) return null;

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return {
    ...post,
    contentHtml,
  };
}

export function getResearchArticles(): ResearchArticle[] {
  const researchDir = path.join(contentDirectory, 'sports-medicine');
  
  if (!fs.existsSync(researchDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(researchDir);
  const allArticles = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(researchDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category,
        tags: data.tags || [],
        abstract: data.abstract,
        readingTime: data.readingTime || Math.ceil(content.split(' ').length / 200),
        content,
      } as ResearchArticle;
    });

  return allArticles.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getResearchArticle(slug: string): ResearchArticle | null {
  const researchDir = path.join(contentDirectory, 'sports-medicine');
  const fullPath = path.join(researchDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category,
    tags: data.tags || [],
    abstract: data.abstract,
    readingTime: data.readingTime || Math.ceil(content.split(' ').length / 200),
    content,
  } as ResearchArticle;
}

export async function getResearchArticleWithHtml(slug: string): Promise<ResearchArticle & { contentHtml: string } | null> {
  const article = getResearchArticle(slug);
  if (!article) return null;

  const processedContent = await remark().use(html).process(article.content);
  const contentHtml = processedContent.toString();

  return {
    ...article,
    contentHtml,
  };
}

