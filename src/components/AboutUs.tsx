import React from 'react';
import { Shield, Leaf, Heart, Award, Users, Target, Globe, Truck } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PageHeader } from './PageHeader';
import { PageContainer } from './PageContainer';

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every product undergoes rigorous quality checks to ensure the highest standards of purity and freshness.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Leaf,
    title: "Natural & Organic",
    description: "We source only the finest natural and organic ingredients, free from harmful chemicals and preservatives.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Your wellbeing is our priority. We provide nutritious foods that support a healthy lifestyle.",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to excellence in every aspect, from sourcing to packaging to customer service.",
    color: "bg-yellow-100 text-yellow-600"
  }
];

const stats = [
  { number: "50K+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
  { number: "1000+", label: "Premium Products", icon: Award, color: "text-green-600" },
  { number: "500+", label: "Partner Farms", icon: Leaf, color: "text-emerald-600" },
  { number: "99.5%", label: "Customer Satisfaction", icon: Heart, color: "text-red-600" }
];

const achievements = [
  {
    year: "2019",
    title: "Company Founded",
    description: "Started with a vision to bring premium healthy foods to every home"
  },
  {
    year: "2020",
    title: "Online Platform Launch",
    description: "Launched our e-commerce platform and reached 1000+ customers"
  },
  {
    year: "2021",
    title: "Organic Certification",
    description: "Achieved organic certification and launched OG brand"
  },
  {
    year: "2022",
    title: "Pan-India Expansion",
    description: "Expanded delivery to 500+ cities across India"
  },
  {
    year: "2023",
    title: "Farmer Partnership Program",
    description: "Direct partnerships with 500+ farmers for sustainable sourcing"
  },
  {
    year: "2024",
    title: "50K+ Customers",
    description: "Reached milestone of 50,000+ satisfied customers"
  }
];

export function AboutUs() {
  return (
    <>
      <PageHeader
        title="About KFL"
        subtitle="Nourishing Lives, Naturally"
        description="From premium dry fruits to organic superfoods, we're committed to bringing nature's finest to your table while supporting sustainable farming practices."
        badge="Our Story"
        badgeColor="red"
        icon={Heart}
        backgroundImage="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        size="lg"
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4">
            <Heart className="mr-3 h-5 w-5" />
            Our Story
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4">
            <Users className="mr-3 h-5 w-5" />
            Meet Our Team
          </Button>
        </div>
      </PageHeader>

      <PageContainer background="white" padding="lg">
        <div className="space-y-20">
          {/* Stats Section */}
          <div className="text-center">
            <Badge className="bg-blue-100 text-blue-600 mb-6 px-6 py-3 text-lg font-poppins">
              📊 Our Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
              Numbers That Tell Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-inter">
              These milestones reflect our commitment to quality, customer satisfaction, and sustainable growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200">
                  <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-4xl font-black mb-2 ${stat.color} font-poppins`}>{stat.number}</div>
                  <div className="text-gray-600 font-medium font-inter">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Story Section */}
      <PageContainer background="gradient" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-green-200 text-green-800 mb-6 px-6 py-3 text-lg font-poppins">
              📖 Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 font-poppins">
              From Vision to Reality
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-inter">
              <p>
                What started as a simple belief in the power of natural nutrition has grown into 
                a movement towards healthier living. At KFL, we understand that quality food is 
                the foundation of a vibrant life.
              </p>
              <p>
                Our journey began with a commitment to source the finest ingredients directly from 
                trusted farmers and suppliers. Today, we're proud to offer two distinct brands - 
                KFL for premium everyday nutrition and OG for certified organic products.
              </p>
              <p>
                Every product in our collection is carefully selected, quality-tested, and 
                packaged to preserve its natural goodness. We believe in transparency, 
                sustainability, and the transformative power of pure, wholesome food.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Leaf className="mr-3 h-5 w-5" />
                Learn About Sustainability
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Globe className="mr-3 h-5 w-5" />
                Our Global Impact
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Our farmers"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-4 border-green-100">
              <div className="text-3xl font-black text-green-600 font-poppins">500+</div>
              <div className="text-sm text-gray-600 font-inter">Partner Farms</div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Values Section */}
      <PageContainer background="white" padding="lg">
        <div className="text-center mb-16">
          <Badge className="bg-purple-200 text-purple-800 mb-6 px-6 py-3 text-lg font-poppins">
            💎 Core Values
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
            What Drives Us Every Day
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Our values are the foundation of everything we do - from sourcing to customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 group">
              <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors font-poppins">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed font-inter">{value.description}</p>
            </Card>
          ))}
        </div>
      </PageContainer>

      {/* Timeline Section */}
      <PageContainer background="gradient" padding="lg">
        <div className="text-center mb-16">
          <Badge className="bg-yellow-200 text-yellow-800 mb-6 px-6 py-3 text-lg font-poppins">
            🏆 Milestones
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
            Our Journey Through Time
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Every milestone marks a step forward in our mission to bring healthy, natural foods to your table.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
          
          <div className="space-y-16">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-yellow-200">
                    <div className={`text-3xl font-black text-yellow-600 mb-2 ${index % 2 === 0 ? 'text-right' : 'text-left'} font-poppins`}>
                      {achievement.year}
                    </div>
                    <h3 className={`text-xl font-bold text-gray-900 mb-3 ${index % 2 === 0 ? 'text-right' : 'text-left'} font-poppins`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-gray-600 ${index % 2 === 0 ? 'text-right' : 'text-left'} font-inter`}>
                      {achievement.description}
                    </p>
                  </Card>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>

      {/* Enhanced Mission & Vision */}
      <PageContainer background="white" padding="lg">
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-600 mb-6 px-6 py-3 text-lg font-poppins">
            🎯 Mission & Vision
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
            Our Purpose & Direction
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Guided by clear mission and vision, we work every day to transform the healthy food landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-12 border-2 border-red-100 shadow-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-3xl hover:border-red-200 transition-all duration-500 group">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-6 font-poppins group-hover:text-red-600 transition-colors">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
              To make premium quality, natural and organic food accessible to every household, 
              promoting healthier lifestyles and supporting sustainable farming practices that 
              benefit both consumers and farmers.
            </p>
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-red-600 hover:border-red-700"
            >
              <Heart className="mr-3 h-5 w-5" />
              Learn More About Our Mission
            </Button>
          </Card>
          
          <Card className="p-12 border-2 border-green-100 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-3xl hover:border-green-200 transition-all duration-500 group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-6 font-poppins group-hover:text-green-600 transition-colors">Our Vision</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
              To become India's most trusted brand for healthy, natural foods, creating a positive 
              impact on millions of lives while fostering sustainable agricultural practices and 
              building a healthier future for generations to come.
            </p>
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-600 hover:border-green-700"
            >
              <Leaf className="mr-3 h-5 w-5" />
              Explore Our Vision
            </Button>
          </Card>
        </div>
      </PageContainer>

      {/* CTA Section */}
      <PageContainer background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-poppins">
            Join Our Healthy Living Community
          </h2>
          <p className="text-xl mb-12 leading-relaxed font-inter">
            Be part of a movement that's transforming the way India eats. 
            Together, we're building a healthier, more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              <Truck className="mr-3 h-5 w-5" />
              Shop Our Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Users className="mr-3 h-5 w-5" />
              Connect With Us
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  );
}