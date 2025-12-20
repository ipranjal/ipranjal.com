/**
 * Individual Writing Article Page
 * 
 * Displays full article content loaded from markdown files.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticleIds, getArticleById } from '@/lib/markdown';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleById(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const ogImage = article.featuredImage || '/og-image.png';
  const url = `https://ipranjal.com/writing/${slug}`;

  return {
    title: `${article.title} – Pranjal Pandey`,
    description: article.premise,
    openGraph: {
      title: article.title,
      description: article.premise,
      type: 'article',
      url,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: article.title,
      }],
      ...(article.date && { publishedTime: article.date }),
      ...(article.tag && { tags: [article.tag] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.premise,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleById(slug);

  if (!article) {
    notFound();
  }

  return (
    <Section id="article" width="wide">
      {/* Back Navigation */}
      <Link 
        href="/writing"
        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        All Writing
      </Link>

      {/* Article Header */}
      <article>
        {article.tag && (
          <div className="inline-block px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-4">
            {article.tag}
          </div>
        )}

        <Heading level={1} className="mb-4 text-4xl md:text-5xl lg:text-6xl">
          {article.title}
        </Heading>

        <p className="text-xl text-muted mb-6 leading-relaxed">
          {article.premise}
        </p>

        {article.date && (
          <p className="text-sm text-muted mb-12">
            {article.date}
          </p>
        )}

        <div className="section-divider mb-12"></div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-12 rounded-lg overflow-hidden border border-border/30 relative">
            <Image
              src={article.featuredImage}
              alt={article.title}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <Link 
            href="/writing"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back to All Writing
          </Link>
        </div>
      </article>
    </Section>
  );
}
