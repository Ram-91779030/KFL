import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Handshake, TrendingUp, Users, MapPin, Phone, Mail, Building, Award } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: "High Profit Margins",
    description: "Enjoy competitive margins with our premium product range and strong market demand.",
    highlight: "Up to 35% margins"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Get comprehensive training, marketing support, and dedicated account management.",
    highlight: "24/7 support team"
  },
  {
    icon: Award,
    title: "Exclusive Territory Rights",
    description: "Secure exclusive distribution rights in your territory with protected market areas.",
    highlight: "Protected territories"
  },
  {
    icon: Building,
    title: "Marketing & Promotion",
    description: "Access to professional marketing materials, campaigns, and promotional support.",
    highlight: "Complete marketing kit"
  }
];

const requirements = [
  {
    title: "Business Experience",
    description: "Minimum 2 years of experience in FMCG or food distribution",
    icon: "💼"
  },
  {
    title: "Infrastructure",
    description: "Adequate warehouse space and distribution network in target area",
    icon: "🏪"
  },
  {
    title: "Financial Capability",
    description: "Initial investment capacity of ₹5-15 lakhs depending on territory",
    icon: "💰"
  },
  {
    title: "Market Knowledge",
    description: "Understanding of local market dynamics and customer preferences",
    icon: "📊"
  }
];

const territories = [
  { region: "North India", cities: ["Delhi", "Gurgaon", "Chandigarh", "Ludhiana"], status: "Available" },
  { region: "West India", cities: ["Mumbai", "Pune", "Ahmedabad", "Surat"], status: "Limited" },
  { region: "South India", cities: ["Bangalore", "Chennai", "Hyderabad", "Kochi"], status: "Available" },
  { region: "East India", cities: ["Kolkata", "Bhubaneswar", "Guwahati"], status: "Available" }
];

const successStories = [
  {
    name: "Rajesh Enterprises",
    location: "Mumbai, Maharashtra",
    achievement: "200% growth in first year",
    quote: "Partnering with KFL has been the best business decision. The products sell themselves!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Sharma Distributors",
    location: "Delhi, NCR",
    achievement: "Expanded to 3 new cities",
    quote: "KFL's support system and product quality helped us scale rapidly across NCR region.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function DistributorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    experience: '',
    territory: '',
    investment: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-6 px-6 py-2 text-lg border-white/30">
                🤝 Distributor Partnership
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                Become a KFL Distributor
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Join India's fastest-growing healthy food brand and build a profitable business 
                with our premium range of nuts, dried fruits, and organic products.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-xl">
                  <Handshake className="mr-3 h-6 w-6" />
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-xl">
                  <Phone className="mr-3 h-6 w-6" />
                  Call Us: +91 94906 05930‬
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business partnership"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-4 border-green-100">
                <div className="text-3xl font-black text-green-600">500+</div>
                <div className="text-sm text-gray-600">Happy Distributors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-600 mb-6 px-6 py-3 text-lg">
              💼 Partnership Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Partner with KFL?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a winning partnership with comprehensive support and lucrative opportunities in the healthy food market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-black text-gray-900">{benefit.title}</h3>
                      <Badge className="bg-green-200 text-green-800">
                        {benefit.highlight}
                      </Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-200 text-green-800 mb-6 px-6 py-3 text-lg">
              📋 Requirements
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Distributor Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensure you meet our partnership criteria for a successful business relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((requirement, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-green-200">
                <div className="text-5xl mb-4">{requirement.icon}</div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{requirement.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{requirement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Territory Availability */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-200 text-yellow-800 mb-6 px-6 py-3 text-lg">
              🗺️ Territory Map
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Available Territories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore available distribution territories across India and secure your market area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {territories.map((territory, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-gray-900">{territory.region}</h3>
                  <Badge className={`${
                    territory.status === 'Available' 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {territory.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {territory.cities.map((city, i) => (
                    <div key={i} className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {city}
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="sm" 
                  className={`w-full ${
                    territory.status === 'Available' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  } text-white`}
                >
                  {territory.status === 'Available' ? 'Apply for Territory' : 'Join Waitlist'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-200 text-purple-800 mb-6 px-6 py-3 text-lg">
              🏆 Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Distributor Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our successful distributors who have built thriving businesses with KFL.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {successStories.map((story, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200">
                <div className="flex items-start space-x-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1">{story.name}</h3>
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                      <Badge className="bg-green-200 text-green-800">
                        {story.achievement}
                      </Badge>
                    </div>
                    <blockquote className="text-gray-600 italic leading-relaxed">
                      "{story.quote}"
                    </blockquote>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-200 text-blue-800 mb-6 px-6 py-3 text-lg">
              📝 Apply Now
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Distributor Application
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to start your journey as a KFL distributor.
            </p>
          </div>

          <Card className="p-8 shadow-2xl border-2 border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <Input
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <Input
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Business Experience *</label>
                  <Select onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Territory *</label>
                  <Select onValueChange={(value) => handleInputChange('territory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select territory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Investment Capacity *</label>
                <Select onValueChange={(value) => handleInputChange('investment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                    <SelectItem value="10-15">₹10-15 Lakhs</SelectItem>
                    <SelectItem value="15-25">₹15-25 Lakhs</SelectItem>
                    <SelectItem value="25+">₹25+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Information</label>
                <Textarea
                  placeholder="Tell us about your distribution network, target market, or any questions..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-xl">
                <Handshake className="mr-3 h-6 w-6" />
                Submit Application
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 leading-relaxed">
            Have questions about our distributor program? Our team is here to help you every step of the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-black text-xl mb-2">Call Us</h3>
              <p>+91 94906 05930‬</p>
              <p className="text-sm opacity-80">Mon-Sat, 9 AM - 6 PM</p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-black text-xl mb-2">Email Us</h3>
              <p>distributors@kfl.com</p>
              <p className="text-sm opacity-80">We'll respond within 24 hours</p>
            </Card>
          </div>
          
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-xl">
            <Handshake className="mr-3 h-6 w-6" />
            Schedule a Call
          </Button>
        </div>
      </section>
    </div>
  );
}