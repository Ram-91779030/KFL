import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Eye, Download, Play, FileText, Image, Video } from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    title: "KFL Announces Expansion into Organic Superfood Market",
    date: "January 15, 2024",
    category: "Business",
    excerpt: "Karshak Food Life expands its premium product line with a new range of organic superfoods, targeting health-conscious consumers.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "2.5k",
    type: "press-release"
  },
  {
    id: 2,
    title: "KFL Partners with 1000+ Farmers for Direct Trade Initiative",
    date: "December 20, 2023",
    category: "Sustainability",
    excerpt: "Major milestone achieved in farmer partnership program, ensuring fair trade and sustainable sourcing practices.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "3.8k",
    type: "press-release"
  },
  {
    id: 3,
    title: "Awards & Recognition: KFL Wins Best Healthy Food Brand 2023",
    date: "November 10, 2023",
    category: "Awards",
    excerpt: "Karshak Food Life recognized for excellence in healthy food innovation and customer satisfaction.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "5.2k",
    type: "award"
  }
];

const mediaKit = [
  {
    title: "Brand Guidelines",
    description: "Complete brand guidelines including logos, colors, and typography",
    size: "12.5 MB",
    type: "PDF",
    icon: FileText,
    downloadCount: "1.2k"
  },
  {
    title: "High-Resolution Logos",
    description: "KFL and OG brand logos in various formats and resolutions",
    size: "8.3 MB",
    type: "ZIP",
    icon: Image,
    downloadCount: "892"
  },
  {
    title: "Product Photography",
    description: "Professional product photos for editorial use",
    size: "45.7 MB",
    type: "ZIP",
    icon: Image,
    downloadCount: "567"
  },
  {
    title: "Company Video Kit",
    description: "Brand videos, interviews, and promotional content",
    size: "156.2 MB",
    type: "ZIP",
    icon: Video,
    downloadCount: "234"
  }
];

const mediaAppearances = [
  {
    title: "The Future of Healthy Snacking - TV Interview",
    outlet: "Health TV",
    date: "January 8, 2024",
    type: "video",
    duration: "15:30",
    thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "12.5k"
  },
  {
    title: "Sustainable Farming Practices Podcast",
    outlet: "Green Business Today",
    date: "December 15, 2023",
    type: "audio",
    duration: "28:45",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "8.7k"
  },
  {
    title: "Innovation in Food Industry Feature",
    outlet: "Business Magazine",
    date: "November 22, 2023",
    type: "article",
    duration: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: "15.2k"
  }
];

export function MediaRoom() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPress = selectedCategory === 'all' 
    ? pressReleases 
    : pressReleases.filter(item => item.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white mb-6 px-6 py-2 text-lg border-white/30">
            📰 Media Room
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
            News & Media Center
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest news, press releases, and media coverage about 
            Karshak Food Life's journey in the healthy food industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-xl">
              <FileText className="mr-3 h-6 w-6" />
              Press Releases
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-xl">
              <Download className="mr-3 h-6 w-6" />
              Media Kit
            </Button>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-600 mb-6 px-6 py-3 text-lg">
              📰 Latest News
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Press Releases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the latest updates on our company milestones, partnerships, and industry insights.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'business', 'sustainability', 'awards'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 capitalize ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPress.map((release) => (
              <Card key={release.id} className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {release.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{release.views}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{release.excerpt}</p>
                  
                  <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-600">
                    Read Full Release
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-200 text-purple-800 mb-6 px-6 py-3 text-lg">
              📁 Media Kit
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Brand Assets & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download high-quality brand assets, logos, and marketing materials for editorial use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((asset, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <asset.icon className="h-8 w-8 text-purple-600" />
                </div>
                
                <h3 className="text-lg font-black text-gray-900 mb-2">{asset.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{asset.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{asset.type}</span>
                  <span>{asset.size}</span>
                </div>
                
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <div className="mt-2 text-xs text-gray-500">
                  {asset.downloadCount} downloads
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Appearances */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-200 text-yellow-800 mb-6 px-6 py-3 text-lg">
              📺 Media Coverage
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              In the Spotlight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch, listen, and read our latest media appearances and industry insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mediaAppearances.map((appearance, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-yellow-200 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={appearance.thumbnail}
                    alt={appearance.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white border-white/30 capitalize">
                      {appearance.type}
                    </Badge>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>{appearance.duration}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{appearance.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <span className="font-medium">{appearance.outlet}</span>
                    <span>•</span>
                    <span>{appearance.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                    {appearance.title}
                  </h3>
                  
                  <Button variant="outline" className="w-full hover:bg-yellow-50 hover:text-yellow-600">
                    <Play className="mr-2 h-4 w-4" />
                    Watch/Listen
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Media Inquiries
          </h2>
          <p className="text-xl mb-12 leading-relaxed">
            For press inquiries, interview requests, or additional information, 
            please contact our media relations team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-black text-xl mb-4">Press Contact</h3>
              <div className="text-left space-y-2">
                <p>Priya Sharma</p>
                <p>Head of Communications</p>
                <p>press@kfl.com</p>
                <p>+91 94906 05930‬</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-black text-xl mb-4">Partnership Inquiries</h3>
              <div className="text-left space-y-2">
                <p>Rahul Kumar</p>
                <p>Business Development</p>
                <p>partnerships@kfl.com</p>
                <p>+91 98765 43211</p>
              </div>
            </Card>
          </div>
          
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-xl">
            <FileText className="mr-3 h-6 w-6" />
            Download Media Kit
          </Button>
        </div>
      </section>
    </div>
  );
}