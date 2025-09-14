import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { PageHeader } from './PageHeader';
import { PageContainer } from './PageContainer';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="We're Here to Help"
        description="Have questions about our products or need assistance? We're here to help! Reach out to us and we'll get back to you as soon as possible."
        badge="Contact Us"
        badgeColor="blue"
        icon={MessageCircle}
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3"
        size="md"
      />
      
      <PageContainer background="gray" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                  <p className="text-primary font-semibold">+91 94906 05930‬</p>
                  <p className="text-primary font-semibold">+91 87654 32109</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 mb-2">Send us your queries</p>
                  <p className="text-primary font-semibold">info@karshakfoodlife.com</p>
                  <p className="text-primary font-semibold">support@karshakfoodlife.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-600 mb-2">Visit our headquarters</p>
                  <p className="text-gray-800">
                    Karshak Food Life Pvt. Ltd.<br />
                    Hyderabad<br />
                    India<br />
                    India
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600 mb-2">We're available during</p>
                  <div className="space-y-1 text-gray-800">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-0 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter message subject"
                      className="bg-input-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                    rows={6}
                    className="bg-input-background resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What is your delivery time?",
                answer: "We typically deliver within 2-5 business days for metro cities and 5-7 business days for other locations."
              },
              {
                question: "Are your products organic?",
                answer: "Yes, most of our products are certified organic and sourced directly from organic farms."
              },
              {
                question: "Do you offer bulk discounts?",
                answer: "Yes, we offer special pricing for bulk orders. Contact us for custom quotes on large quantities."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 7 days of delivery if products are unused and in original packaging."
              },
              {
                question: "How do you ensure freshness?",
                answer: "We use advanced packaging techniques and maintain cold chain logistics to ensure maximum freshness."
              },
              {
                question: "Do you ship internationally?",
                answer: "Currently, we only ship within India. International shipping will be available soon."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 mt-16 bg-gradient-to-r from-primary to-destructive text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
          <p className="mb-6 opacity-90">
            Our customer support team is ready to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}