import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const healthTips = [
  {
    id: 1,
    title: "Benefits of Dry Fruits",
    subtitle: "10 Reasons to Include Them in Your Daily Diet",
    excerpt: "Discover how almonds, dates, and figs can boost your energy, improve heart health, and provide essential nutrients for optimal wellness.",
    image: "https://images.unsplash.com/photo-1743956345250-4a43d73a7628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5lZml0cyUyMGRyeSUyMGZydWl0cyUyMG51dHJpdGlvbiUyMGhlYWx0aHxlbnwxfHx8fDE3NTc4MjQzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Nutrition"
  },
  {
    id: 2,
    title: "Protein Bars for Fitness",
    subtitle: "Pre & Post Workout Nutrition Guide",
    excerpt: "Learn how protein bars can enhance your workout performance, aid muscle recovery, and fit perfectly into your fitness routine.",
    image: "https://images.unsplash.com/photo-1687041568037-dab13851ea14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwYmFyJTIwZml0bmVzcyUyMG51dHJpdGlvbiUyMHBvc3QlMjB3b3Jrb3V0fGVufDF8fHx8MTc1NzgyNDM0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Fitness Expert Raj",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Fitness"
  },
  {
    id: 3,
    title: "Healthy Snacking with Chips",
    subtitle: "Smart Alternatives to Traditional Snacks",
    excerpt: "Explore baked, natural chip options that satisfy cravings while providing nutrients, making snacking guilt-free and delicious.",
    image: "https://images.unsplash.com/photo-1604565011092-c0fa4416f80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tpbmclMjBjaGlwcyUyMGFsdGVybmF0aXZlcyUyMG5hdHVyYWx8ZW58MXx8fHwxNzU3ODI0MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Nutritionist Maya",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Lifestyle"
  }
];

export function Blog() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Health <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Tips</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Expert insights and practical tips for a healthier lifestyle with our natural food products
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {healthTips.map((tip) => (
            <Card key={tip.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white relative">
              
              {/* Paper Rip Overlay Background */}
              <div className="absolute inset-0 opacity-5">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path 
                    d="M0,0 L400,0 L400,350 C380,360 360,340 340,355 C320,370 300,350 280,365 C260,350 240,370 220,355 C200,340 180,360 160,350 C140,360 120,340 100,355 C80,370 60,350 40,365 C20,350 10,370 0,360 Z" 
                    fill="currentColor"
                    className="text-green-100"
                  />
                </svg>
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium font-inter">
                  {tip.category}
                </div>
              </div>
              
              <div className="relative p-6">
                {/* Torn Paper Effect at Top */}
                <div className="absolute -top-3 left-0 right-0 h-6">
                  <svg 
                    className="w-full h-6" 
                    viewBox="0 0 400 24" 
                    preserveAspectRatio="none"
                    fill="white"
                  >
                    <path d="M0,8 C50,2 100,14 150,6 C200,10 250,2 300,8 C350,4 380,12 400,6 L400,24 L0,24 Z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors font-poppins">
                  {tip.title}
                </h3>
                
                <h4 className="text-lg font-medium text-green-600 mb-3 font-poppins">
                  {tip.subtitle}
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed font-inter">
                  {tip.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-inter">{new Date(tip.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-inter">{tip.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-inter">By {tip.author}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-50 to-yellow-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Stay Updated with Health Tips
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
            Get weekly nutrition insights, healthy recipes, and wellness tips delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter"
            />
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-poppins"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 font-inter">
            Join 5,000+ health enthusiasts • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}