"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, X, Share2 } from "lucide-react"
import Image from "next/image"
import type { BlogPost } from "@/lib/blog-data"

interface BlogModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

export function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!post) return null

  // Simple function to render content with basic formatting
  const renderContent = (content: string) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "")

    return lines.map((line, index) => {
      const trimmedLine = line.trim()

      // Skip empty lines
      if (!trimmedLine) return null

      // Handle different heading levels
      if (trimmedLine.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            {trimmedLine.replace("# ", "")}
          </h1>
        )
      }

      if (trimmedLine.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            {trimmedLine.replace("## ", "")}
          </h2>
        )
      }

      if (trimmedLine.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
            {trimmedLine.replace("### ", "")}
          </h3>
        )
      }

      if (trimmedLine.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {trimmedLine.replace("#### ", "")}
          </h4>
        )
      }

      // Handle list items
      if (trimmedLine.startsWith("- ")) {
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="text-blue-600 mr-2 mt-2">•</span>
            <p className="text-gray-700 leading-relaxed flex-1">{trimmedLine.replace("- ", "")}</p>
          </div>
        )
      }

      // Handle bold text in paragraphs
      const processedText = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')

      // Regular paragraphs
      return (
        <p
          key={index}
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
      )
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{post.category}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                  {post.title}
                </DialogTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Featured Image */}
            <div className="mb-6">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <div className="text-lg text-gray-600 mb-6 font-medium leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              {post.excerpt}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div className="space-y-2">{renderContent(post.content)}</div>
            </article>

            {/* CTA Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interested in Our Solutions?</h3>
              <p className="text-gray-600 mb-4">
                Learn more about how SKS Auto Industries can meet your automotive fastener needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={onClose}>
                  Contact Us
                </Button>
                <Button variant="outline" onClick={onClose}>
                  View Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
