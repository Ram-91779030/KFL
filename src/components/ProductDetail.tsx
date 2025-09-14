import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Phone, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
  onAddToCart?: (variantId: number, qty: number) => void;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image]; // Mock multiple images
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const nutritionFacts = [
    { label: 'Calories', value: '160 per 30g' },
    { label: 'Protein', value: '6g' },
    { label: 'Fat', value: '14g' },
    { label: 'Carbs', value: '6g' },
    { label: 'Fiber', value: '3.5g' },
    { label: 'Sugar', value: '1g' }
  ];

  const benefits = [
    'Rich in Vitamin E and healthy fats',
    'Excellent source of protein and fiber',
    'Supports heart health',
    'Helps maintain healthy cholesterol levels',
    'Good for brain function',
    'Natural energy booster'
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.featured && (
                  <Badge className="bg-accent text-white">Featured</Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive text-white">{discount}% OFF</Badge>
                )}
                <Badge variant="outline" className="text-primary border-primary">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-accent fill-accent' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="text-green-600 font-semibold">Save ₹{product.originalPrice! - product.price}</span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag.replace('-', ' ')}
                </Badge>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? `Add to Cart - ₹${product.price * quantity}` : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'border-primary text-primary' : ''}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our {product.name} are carefully selected and sourced directly from trusted farmers 
                  who practice sustainable and organic farming methods. Each batch is quality tested 
                  to ensure you get the finest, most nutritious product. These premium nuts are 
                  naturally rich in essential nutrients and make for a perfect healthy snack.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Origin</h4>
                    <p className="text-gray-600">Sourced from premium farms in Kashmir Valley</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Processing</h4>
                    <p className="text-gray-600">Naturally dried, no artificial preservatives</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Storage</h4>
                    <p className="text-gray-600">Store in a cool, dry place</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Shelf Life</h4>
                    <p className="text-gray-600">12 months from packaging date</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Nutrition Facts</h3>
                <p className="text-gray-600">Per serving (30g)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {nutritionFacts.map((fact, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold">{fact.label}</div>
                      <div className="text-primary font-medium">{fact.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Health Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                          ))}
                        </div>
                        <span className="font-medium">Anonymous User</span>
                        <span className="text-gray-500 text-sm">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Excellent quality! Fresh, tasty, and well-packaged. Will definitely order again.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Contact for Bulk Orders */}
        <Card className="p-6 mt-8 bg-secondary">
          <div className="flex items-center gap-4">
            <Phone className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Need Bulk Orders?</h3>
              <p className="text-gray-600">Contact us for special pricing on bulk purchases</p>
            </div>
            <Button className="ml-auto">Contact Us</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}