import { getBlogPost, getBlogPosts } from "@/lib/blog-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Factory, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found - SKS Auto Industries Blog",
    }
  }

  return {
    title: `${post.title} - SKS Auto Industries Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.id === post.id)
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
              <Factory className="w-6 h-6" />
              <span className="text-lg font-semibold">SKS Auto Industries</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Blog
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back to Blog
            </Link>
            <span>•</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">{post.excerpt}</div>

          <div
            className="prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        </article>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 border-t border-gray-200 mb-12">
          {previousPost ? (
            <Link href={`/blog/${previousPost.id}`} className="group flex-1">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <div>
                    <div className="text-sm text-gray-500">Previous Article</div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {previousPost.title}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link href={`/blog/${nextPost.id}`} className="group flex-1">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-end space-x-3 text-right">
                  <div>
                    <div className="text-sm text-gray-500">Next Article</div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {nextPost.title}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{relatedPost.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Partner with Us?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover how SKS Auto Industries can provide the high-quality automotive fasteners and components your
            business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button className="bg-blue-600 hover:bg-blue-700">Get in Touch</Button>
            </Link>
            <Link href="/#products">
              <Button variant="outline">View Our Products</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Factory className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold">SKS Auto Industries</span>
          </div>
          <p className="text-gray-400 mb-4">
            India's trusted manufacturer of premium automotive fasteners and components since 1998.
          </p>
          <div className="text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} SKS Auto Industries. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
