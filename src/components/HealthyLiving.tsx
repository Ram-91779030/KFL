import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Leaf, Apple, Activity, Zap, Shield } from 'lucide-react';

const healthTips = [
  {
    icon: Heart,
    title: "Heart-Healthy Nuts",
    description: "Almonds and walnuts are packed with omega-3 fatty acids and vitamin E, supporting cardiovascular health naturally.",
    benefits: ["Reduces cholesterol", "Improves heart function", "Rich in antioxidants"],
    image: "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Leaf,
    title: "Natural Energy Boosters",
    description: "Dates and dried fruits provide natural sugars and fiber for sustained energy without the crash.",
    benefits: ["Natural energy", "Rich in fiber", "No artificial additives"],
    image: "https://images.unsplash.com/photo-1609501676725-7186f00611db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Apple,
    title: "Antioxidant Powerhouses",
    description: "Goji berries and cranberries are loaded with antioxidants that fight free radicals and boost immunity.",
    benefits: ["Boosts immunity", "Anti-aging properties", "Fights inflammation"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Activity,
    title: "Protein-Rich Seeds",
    description: "Chia and pumpkin seeds provide complete proteins essential for muscle building and repair.",
    benefits: ["Complete proteins", "Muscle recovery", "High in minerals"],
    image: "https://images.unsplash.com/photo-1580234832988-ca788680d1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Zap,
    title: "Brain Food Champions",
    description: "Walnuts and almonds contain nutrients that support cognitive function and memory enhancement.",
    benefits: ["Improves memory", "Enhances focus", "Supports brain health"],
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Shield,
    title: "Digestive Health Heroes",
    description: "Prunes and figs are natural sources of fiber that promote healthy digestion and gut wellness.",
    benefits: ["Aids digestion", "Promotes gut health", "Natural fiber source"],
    image: "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const recipes = [
  {
    title: "Energy Power Bowl",
    description: "A perfect blend of nuts, seeds, and dried fruits for sustained energy",
    ingredients: ["Almonds", "Walnuts", "Chia Seeds", "Dates", "Goji Berries"],
    time: "5 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Antioxidant Trail Mix",
    description: "Immunity-boosting mix perfect for on-the-go snacking",
    ingredients: ["Cranberries", "Cashews", "Pumpkin Seeds", "Dark Chocolate", "Coconut Flakes"],
    time: "3 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1599909533730-c17e1b9afeef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Protein Smoothie Bowl",
    description: "Nutrient-dense smoothie bowl with natural protein sources",
    ingredients: ["Almond Butter", "Chia Seeds", "Banana", "Berries", "Honey"],
    time: "8 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function HealthyLiving() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white mb-6 px-6 py-2 text-lg border-white/30">
            🌱 Healthy Living Guide
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
            Live Your Healthiest Life
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover the power of natural nutrition with our premium selection of nuts, dried fruits, and superfoods. 
            Your journey to wellness starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-xl shadow-xl">
              <Heart className="mr-3 h-6 w-6" />
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-xl">
              <Leaf className="mr-3 h-6 w-6" />
              Explore Benefits
            </Button>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-600 mb-6 px-6 py-3 text-lg">
              💊 Health Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Science-Backed Nutrition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of our products is carefully selected for its proven health benefits and nutritional value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTips.map((tip, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <tip.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-3">{tip.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{tip.description}</p>
                  
                  <div className="space-y-2">
                    {tip.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Recipes Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-200 text-yellow-800 mb-6 px-6 py-3 text-lg">
              🍽️ Healthy Recipes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Delicious & Nutritious
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple recipes using our premium products to fuel your healthy lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-yellow-200">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <Badge className="bg-white/20 text-white border-white/30">
                        ⏱️ {recipe.time}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        📊 {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-3">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ingredient, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    View Full Recipe
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-600 mb-6 px-6 py-3 text-lg">
                💡 Wellness Tips
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Daily Wellness Habits
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Small changes in your daily routine can lead to significant improvements in your overall health and well-being.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: "🌅", title: "Morning Nutrition", desc: "Start your day with a handful of almonds and dates for natural energy" },
                  { icon: "💧", title: "Stay Hydrated", desc: "Pair your healthy snacks with plenty of water throughout the day" },
                  { icon: "🧘", title: "Mindful Eating", desc: "Practice mindfulness while enjoying your nutritious snacks" },
                  { icon: "🚶", title: "Active Lifestyle", desc: "Fuel your workouts with protein-rich nuts and seeds" }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="text-3xl">{tip.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-gray-600">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Healthy lifestyle"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-4 border-green-100">
                <div className="text-3xl font-black text-green-600">10K+</div>
                <div className="text-sm text-gray-600">Happy & Healthy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-12 leading-relaxed">
            Join thousands of satisfied customers who have improved their wellness with our premium natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-xl">
              <Heart className="mr-3 h-6 w-6" />
              Shop Healthy Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-6 text-xl">
              Get Nutrition Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}