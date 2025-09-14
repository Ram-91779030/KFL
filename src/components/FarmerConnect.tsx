import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Handshake, Sprout, Award, MapPin, TrendingUp } from 'lucide-react';

const farmers = [
  {
    name: "Rajesh Kumar",
    location: "Rajasthan",
    specialty: "Premium Almonds",
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story: "Rajesh has been growing organic almonds using traditional methods passed down through generations.",
    impact: "2000+ families benefited"
  },
  {
    name: "Sunita Devi",
    location: "Kashmir",
    specialty: "Walnuts & Saffron",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1548942487-9d8c1b29-a27b7b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story: "Sunita leads a women's cooperative that produces the finest quality walnuts and saffron in Kashmir.",
    impact: "500+ women empowered"
  },
  {
    name: "Pradeep Singh",
    location: "Punjab",
    specialty: "Dates & Figs",
    experience: "20 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story: "Pradeep's innovative farming techniques have made him a leader in sustainable date cultivation.",
    impact: "1500+ acres organic"
  }
];

const partnerships = [
  {
    icon: Handshake,
    title: "Direct Trade Partnership",
    description: "We work directly with farmers, eliminating middlemen and ensuring fair prices for their premium produce.",
    stats: "200+ Farmer Partners"
  },
  {
    icon: TrendingUp,
    title: "Fair Pricing Guarantee",
    description: "Our farmers receive 40% above market rates, ensuring sustainable livelihoods and quality production.",
    stats: "40% Above Market Rate"
  },
  {
    icon: Sprout,
    title: "Organic Certification Support",
    description: "We provide technical support and certification assistance to help farmers transition to organic methods.",
    stats: "85% Organic Certified"
  },
  {
    icon: Award,
    title: "Quality Excellence Program",
    description: "Regular training and quality assessments ensure our farmers produce the finest products.",
    stats: "95% Quality Rating"
  }
];

const impact = [
  { number: "5000+", label: "Farmers Connected", icon: "👨‍🌾" },
  { number: "25,000+", label: "Families Benefited", icon: "👨‍👩‍👧‍👦" },
  { number: "15,000", label: "Acres Under Cultivation", icon: "🌾" },
  { number: "₹50Cr+", label: "Direct Income Generated", icon: "💰" }
];

export function FarmerConnect() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-6 px-6 py-2 text-lg border-white/30">
                🤝 Farmer Connect
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                From Farm to Your Table
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                We believe in building direct relationships with farmers, ensuring fair trade, 
                sustainable practices, and the highest quality products for our customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-xl">
                  <Users className="mr-3 h-6 w-6" />
                  Meet Our Farmers
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-xl">
                  <Handshake className="mr-3 h-6 w-6" />
                  Partnership Program
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Farmer in field"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-4 border-green-100">
                <div className="text-3xl font-black text-green-600">5000+</div>
                <div className="text-sm text-gray-600">Farmers Connected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-600 mb-6 px-6 py-3 text-lg">
              📊 Our Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Creating Sustainable Change
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together with our farming partners, we're building a more sustainable and equitable food system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-4xl font-black text-green-600 mb-2">{item.number}</div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-200 text-yellow-800 mb-6 px-6 py-3 text-lg">
              🌟 Partnership Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              How We Support Our Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive support system ensures farmers thrive while producing the highest quality products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-yellow-200">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <partnership.icon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-3">{partnership.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{partnership.description}</p>
                    <Badge className="bg-yellow-200 text-yellow-800">
                      {partnership.stats}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Farmers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-600 mb-6 px-6 py-3 text-lg">
              👨‍🌾 Meet Our Heroes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Stories from the Field
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get to know the dedicated farmers behind our premium products and their inspiring journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {farmers.map((farmer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/20 text-white border-white/30 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {farmer.location}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{farmer.name}</h3>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span className="font-medium">{farmer.specialty}</span>
                    <span>•</span>
                    <span>{farmer.experience}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{farmer.story}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {farmer.impact}
                    </Badge>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-200 text-green-800 mb-6 px-6 py-3 text-lg">
              🔄 Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              From Seed to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow the journey of how we work with farmers to bring you the finest quality products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Partner Selection", desc: "Carefully select farmers based on quality standards and sustainable practices", icon: "🤝" },
              { step: "02", title: "Training & Support", desc: "Provide comprehensive training on organic farming and quality improvement", icon: "📚" },
              { step: "03", title: "Quality Monitoring", desc: "Regular quality checks and certifications to ensure premium standards", icon: "🔍" },
              { step: "04", title: "Fair Trade", desc: "Direct procurement with fair pricing and timely payments to farmers", icon: "💰" }
            ].map((process, index) => (
              <Card key={index} className="relative p-6 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-green-200">
                <div className="text-4xl mb-4">{process.icon}</div>
                <div className="absolute -top-4 left-4 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {process.step}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{process.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Want to Join Our Farmer Network?
          </h2>
          <p className="text-xl mb-12 leading-relaxed">
            If you're a farmer committed to quality and sustainability, we'd love to partner with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-xl">
              <Users className="mr-3 h-6 w-6" />
              Become a Partner
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-xl">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}