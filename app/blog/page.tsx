"use client"

import { useState, useMemo } from "react"
import { getBlogPosts, type BlogPost } from "@/lib/blog-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, Factory, Search } from "lucide-react"
import { BlogModal } from "@/components/blog-modal"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const allPosts = getBlogPosts()
  const categories = ["All", ...new Set(allPosts.map((post) => post.category))]

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [allPosts, selectedCategory, searchQuery])

  const featuredPost = filteredPosts[0]
  const recentPosts = filteredPosts.slice(1)

  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
              <Factory className="w-6 h-6" />
              <span className="text-lg font-semibold">SKS Auto Industries</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
              <Link href="/#about" className="hover:text-blue-200 transition-colors">
                About
              </Link>
              <Link href="/#products" className="hover:text-blue-200 transition-colors">
                Products
              </Link>
              <Link href="/#contact" className="hover:text-blue-200 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry Insights & Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest trends, technologies, and insights from the automotive manufacturing
              industry
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 bg-transparent"
                  }
                >
                  {category}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {category === "All"
                      ? allPosts.length
                      : allPosts.filter((post) => post.category === category).length}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {searchQuery || selectedCategory !== "All" ? (
              <p>
                Showing {filteredPosts.length} of {allPosts.length} articles
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              </p>
            ) : (
              <p>Showing all {allPosts.length} articles</p>
            )}
          </div>
        </section>

        {filteredPosts.length === 0 ? (
          /* No Results */
          <section className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse different categories to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {selectedCategory !== "All" || searchQuery ? "Top Result" : "Featured Article"}
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="md:flex" onClick={() => openModal(featuredPost)}>
                    <div className="md:w-1/2">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          {featuredPost.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {selectedCategory !== "All" || searchQuery ? "More Results" : "Recent Articles"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                      onClick={() => openModal(post)}
                    >
                      <div className="relative">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:translate-x-1 transition-all"
                          >
                            Read More
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <section className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest insights, industry updates, and manufacturing innovations
            directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">Subscribe</Button>
          </div>
        </section>
      </main>

      {/* Blog Modal */}
      <BlogModal post={selectedPost} isOpen={isModalOpen} onClose={closeModal} />

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
