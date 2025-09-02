"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterest: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Predefined query templates
  const queryTemplates = {
    "bulk-order": "I am interested in placing a bulk order for automotive fasteners. Please provide:\n• Minimum order quantities\n• Volume discounts available\n• Lead times for large orders\n• Payment terms\n• Quality certifications",
    
    "custom-manufacturing": "I need custom automotive fasteners manufactured according to our specifications. Please share:\n• Your custom manufacturing capabilities\n• Technical drawing requirements\n• Prototyping process and timeline\n• Tooling costs and setup fees\n• Quality control procedures",
    
    "product-catalog": "I would like to explore your complete product range. Please provide:\n• Detailed product catalog with specifications\n• Technical datasheets\n• Material grades and certifications\n• Standard sizes and variants available\n• Application guidelines",
    
    "partnership-inquiry": "We are looking for a reliable supplier partner for our automotive manufacturing needs. Please share:\n• Your manufacturing capacity\n• Quality certifications (ISO, TS, etc.)\n• Supply chain capabilities\n• Technical support services\n• Long-term partnership terms"
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (
      !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.productInterest.trim()) {
      newErrors.productInterest = "Please select your inquiry type"
    }

    // Only validate message if "Other" is selected
    if (formData.productInterest === "other" && !formData.message.trim()) {
      newErrors.message = "Message is required when selecting 'Other'"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Get the message content based on selection
    let messageContent = ""
    if (formData.productInterest === "other") {
      messageContent = formData.message
    } else {
      messageContent = queryTemplates[formData.productInterest] || "General inquiry about your automotive fasteners and components."
    }

    // Get user-friendly product interest name
    const productInterestNames = {
      "bulk-order": "Bulk Order Inquiry",
      "custom-manufacturing": "Custom Manufacturing",
      "product-catalog": "Product Catalog Request", 
      "partnership-inquiry": "Partnership Inquiry",
      "other": "Other"
    }

    // Create WhatsApp message
    const whatsappMessage = `Hello SKS Auto Industries,

I am interested in your automotive fasteners and components. Here are my details and requirements:

*Contact Information:*
• Name: ${formData.name}
• Company: ${formData.company || "Not specified"}
• Email: ${formData.email}
• Phone: ${formData.phone}

*Inquiry Type:* ${productInterestNames[formData.productInterest] || formData.productInterest}

*Requirements:*
${messageContent}

Thank you for your time. Looking forward to your response.

Best regards,
${formData.name}`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappNumber = "919810910389"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productInterest: "",
        message: "",
      })
      setIsSubmitting(false)

      alert("Form submitted! WhatsApp should open with your message.")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <Input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name (optional)"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={`w-full ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What can we help you with? *
        </label>
        <select
          name="productInterest"
          value={formData.productInterest}
          onChange={handleChange}
          className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.productInterest ? "border-red-500" : ""}`}
        >
          <option value="">Please select your inquiry type</option>
          <option value="bulk-order">🏭 Bulk Order Inquiry - Volume orders for manufacturing</option>
          <option value="custom-manufacturing">⚙️ Custom Manufacturing - Bespoke fasteners to your specs</option>
          <option value="product-catalog">📋 Product Catalog Request - Browse our complete range</option>
          <option value="partnership-inquiry">🤝 Partnership Inquiry - Long-term supplier relationship</option>
          <option value="other">✏️ Other - Specific custom requirements</option>
        </select>
        {errors.productInterest && (
          <p className="text-red-500 text-sm mt-1">{errors.productInterest}</p>
        )}
      </div>

      {/* Conditional Message Box - Only show when "Other" is selected */}
      {formData.productInterest === "other" && (
        <div className="animate-in slide-in-from-top duration-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your specific requirements *
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your specific requirements, quantities needed, technical specifications, or any other details..."
            rows={4}
            className={`w-full ${errors.message ? "border-red-500" : ""}`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
      )}

      {/* Preview of what will be sent (only for predefined queries) */}
      {formData.productInterest && formData.productInterest !== "other" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Your inquiry will include:</h4>
          <p className="text-sm text-blue-700 whitespace-pre-line">
            {queryTemplates[formData.productInterest]}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 text-lg font-semibold transition-all duration-300"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Sending...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.90-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700" />
            </svg>
  <span className="text-sm lg:text-lg">Send WhatsApp Message</span>

          </div>
        )}
      </Button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this form, WhatsApp will open with your pre-filled
        message to contact SKS Auto Industries directly.
      </p>
    </form>
  )
}

export default ContactForm
