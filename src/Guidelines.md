# Karshak Food Life Website Guidelines

## Brand Identity

### Company Information
- **Brand Name**: Karshak Food Life (KFL)
- **Industry**: Premium Dry Fruits & Healthy Snacks
- **Mission**: Bringing farm-fresh, 100% natural healthy foods directly from farmers to consumers
- **Values**: Quality, Health, Sustainability, Trust

### Brand Colors (Defined in globals.css)
- **Primary Red**: #DC2626 (--kfl-primary)
- **Accent Yellow**: #FFAF3A (--kfl-accent) 
- **Pure White**: #ffffff (--kfl-white)
- **Light Red**: #FEF2F2 (--kfl-red-light)
- **Dark Red**: #B91C1C (--kfl-red-dark)

## Typography Guidelines

### Font Usage
- **Headers/Titles**: Use `font-['PoetsenOne',_sans-serif]` for main headings
- **Body/Content**: Use `font-['Comic_Sans_MS',_sans-serif]` for descriptions and content
- **Navigation**: Use `font-['Arial',_sans-serif]` for footer and formal links

### Text Sizing
- **Hero Titles**: text-4xl to text-8xl (responsive)
- **Section Headers**: text-4xl to text-5xl (responsive)
- **Subheadings**: text-xl to text-2xl
- **Body Text**: text-base to text-lg
- **Captions**: text-sm to text-base

## Layout & Alignment Guidelines

### Container Structure
- **Max Width**: max-w-7xl mx-auto for main content containers
- **Padding**: px-4 sm:px-6 lg:px-8 for consistent horizontal spacing
- **Vertical Spacing**: py-16 to py-28 for section spacing

### Responsive Design
- **Mobile First**: Design for mobile screens first
- **Breakpoints**: Use sm:, md:, lg:, xl: prefixes appropriately
- **Text Scaling**: Ensure text scales properly across devices
- **Image Scaling**: Use responsive image containers

### Grid Systems
- **Product Grids**: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- **Content Sections**: grid-cols-1 lg:grid-cols-2 for two-column layouts
- **Gaps**: gap-6 to gap-12 depending on content density

## Content Guidelines

### Messaging
- **Tone**: Professional yet approachable, health-focused
- **Keywords**: Premium, Natural, Farm-fresh, Healthy, Quality, Trust
- **Avoid**: Any references to "Yellow Diamond" or competitor brands

### Product Categories
- Premium Nuts
- Dried Fruits  
- Healthy Snacks
- Superfoods
- Gift Hampers

### Navigation Structure
- Home
- About Us
- Products (with dropdown)
- Healthy Living
- Farmer Connect
- Blog
- Media Room
- Distributor
- Contact Us

## Visual Design Standards

### Component Spacing
- **Section Margins**: mb-12 to mb-16 between major sections
- **Element Spacing**: space-y-6 for vertical element spacing
- **Card Padding**: p-6 to p-8 for card content

### Interactive Elements
- **Buttons**: Use primary/secondary button variants from UI library
- **Hover Effects**: Subtle scale/color transitions
- **Focus States**: Ensure accessibility with proper focus indicators

### Image Usage
- **Hero Images**: High-quality product photography
- **Background Images**: Use CSS background-image for decorative elements
- **Product Images**: Consistent sizing and quality
- **Social Media**: Use actual brand social media content

## Accessibility Standards

### Color Contrast
- Ensure minimum 4.5:1 contrast ratio for text
- Use white text on dark backgrounds
- Maintain brand colors while meeting accessibility requirements

### Navigation
- Clear hierarchy and logical tab order
- Descriptive link text and button labels
- Mobile-friendly touch targets (minimum 44px)

## SEO & Performance

### Content Structure
- Proper heading hierarchy (h1, h2, h3)
- Descriptive alt text for images
- Semantic HTML structure

### Loading Optimization
- Optimize images for web
- Use appropriate image formats
- Implement lazy loading where appropriate

## Brand Voice Guidelines

### Messaging Principles
- **Authentic**: Genuine commitment to health and quality
- **Trustworthy**: Transparent about sourcing and processes
- **Educational**: Share health benefits and usage tips
- **Community-Focused**: Emphasize farmer partnerships and customer relationships

### Content Examples
- "Farm-fresh quality you can trust"
- "100% natural, preservative-free goodness"
- "Supporting farmers, nourishing families"
- "Premium nutrition for healthy living"

## Technical Implementation

### Component Standards
- Use consistent prop interfaces across components
- Implement proper error boundaries and loading states
- Follow React best practices for state management
- Maintain responsive design patterns

### Code Organization
- Keep components focused and reusable
- Use TypeScript interfaces for type safety
- Implement proper accessibility attributes
- Follow established naming conventions