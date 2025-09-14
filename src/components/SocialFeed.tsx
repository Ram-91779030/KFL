import React from 'react';
import { Button } from './ui/button';
import svgPaths from "../imports/svg-mmoothu8jx";
import imgSection3 from "figma:asset/eb454601690fbb819ea12e9666fdcfe78f4fc677.png";
import imgImage1 from "figma:asset/ca2a0b233063bc5485e289b7f6ff6e3ff30d5941.png";

// Instagram posts from Figma
import imgPost1 from "figma:asset/c36636ca444580fe1a6c736fc778029bbf75b3fb.png";
import imgPost2 from "figma:asset/8b2709d91bcde7cf3830bd16da2c6a6bdf5a734d.png";
import imgPost3 from "figma:asset/3396f3cb350c8cdc900d4bd88ef39eb1022fcf21.png";
import imgPost4 from "figma:asset/7a0f1c14150317aaf52e54d71d126624273f6f20.png";
import imgPost5 from "figma:asset/072a32ff735f54b8385a1da0ff2b66c2e45e1ecf.png";
import imgPost6 from "figma:asset/8cd3545d7b77be0d2f1db98d4abf7cd3b2f75569.png";
import imgPost7 from "figma:asset/0360851ebacf90287148313f3082ef9846d0ab61.png";
import imgPost8 from "figma:asset/c3a77936255232a2c8b60183090d2c6f4ef5c3dd.png";

const instagramPosts = [
  { id: 1, image: imgPost1 },
  { id: 2, image: imgPost2 },
  { id: 3, image: imgPost3 },
  { id: 4, image: imgPost4 },
  { id: 5, image: imgPost5 },
  { id: 6, image: imgPost6 },
  { id: 7, image: imgPost7 },
  { id: 8, image: imgPost8 }
];

export function SocialFeed() {
  return (
    <section 
      className="relative py-36 bg-cover bg-no-repeat bg-top"
      style={{ 
        backgroundImage: `url('${imgSection3}')`,
        backgroundSize: '113.25% 100%'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-['PoetsenOne',_sans-serif]">
              Follow Us
            </h2>
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-1 bg-cover bg-no-repeat bg-top"
              style={{ 
                backgroundImage: `url('${imgImage1}')`,
                width: '55px'
              }}
            />
          </div>
          <p className="text-gray-600 font-['Comic_Sans_MS',_sans-serif] mt-4">
            Stay connected with our healthy food community
          </p>
        </div>

        {/* Instagram Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-5">
            {/* Profile Icon */}
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                <div className="w-9 h-9">
                  <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
                    <path d={svgPaths.p26b3be00} fill="white" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 font-['PoetsenOne',_sans-serif]">
                @karshakfoodlife
              </h3>
              <p className="text-gray-600 font-['Comic_Sans_MS',_sans-serif] text-sm">
                Premium Dry Fruits & Healthy Snacks
              </p>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {instagramPosts.map((post) => (
            <div 
              key={post.id}
              className="aspect-square bg-cover bg-center bg-no-repeat border-2 border-red-600 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundImage: `url('${post.image}')` }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="bg-gray-800 text-white border-gray-800 hover:bg-gray-900 px-8"
          >
            Load More
          </Button>
          
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center gap-3"
          >
            <div className="w-4 h-4">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
                <path d={svgPaths.p1dfb9700} fill="white" />
              </svg>
            </div>
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}