import React from 'react';
import { Button } from './ui/button';
import imgImage2 from "figma:asset/d607af063357e7fafecfb4fc3e553ac3029158c2.png";
import imgImage3 from "figma:asset/ecc718ae7402058f06971bb11b3f385525444514.png";
import imgCartoon3Gif from "figma:asset/a3c9d4f6e0661e255909b33427e09651adc3a2a7.png";
import imgImage from "figma:asset/31637df5aaec5166d824111d60c7b4d9861dd13c.png";
import imgLink from "figma:asset/4fe2df1776e2d8ab20ed8dd7ae4c9d5e9dfc8315.png";

export function HistoryMilestones() {
  return (
    <section className="relative bg-[#d95e24] py-28">
      {/* Top border decoration */}
      <div 
        className="absolute top-0 left-0 right-0 h-10 bg-cover bg-no-repeat bg-top-left"
        style={{ backgroundImage: `url('${imgImage2}')` }}
      />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            {/* Main Heading */}
            <h2 className="text-5xl font-bold font-['PoetsenOne',_sans-serif] leading-tight">
              History & Milestones
            </h2>

            {/* Subheading with underline */}
            <div className="relative">
              <h4 className="text-2xl font-bold mb-2 font-['Comic_Sans_MS',_sans-serif]">
                From humble beginnings to snacking greatness
              </h4>
              <div 
                className="h-1 w-[55px] bg-cover bg-no-repeat bg-top-left"
                style={{ backgroundImage: `url('${imgImage}')` }}
              />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed font-['Comic_Sans_MS',_sans-serif]">
                From humble beginnings, Karshak Food Life has risen to healthy food greatness.
                Our company has marked key milestones, from launching our flagship brand
                to partnering with premium suppliers, solidifying our place among the top healthy food
                companies in India. As one of the fastest growing natural food companies in India, we continue
                to set benchmarks in taste and quality, driven by our vision to remain at the
                forefront of the healthy food industry.
              </p>
            </div>

            {/* Read More Button */}
            <div className="pt-5">
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg text-lg font-['Comic_Sans_MS',_sans-serif]"
                style={{
                  backgroundImage: `url('${imgLink}')`,
                  backgroundSize: '100% 95.45%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left'
                }}
              >
                Read More
              </Button>
            </div>
          </div>

          {/* Animation/Image */}
          <div className="flex justify-center">
            <div 
              className="w-[445px] h-[283px] bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${imgCartoon3Gif}')`,
                backgroundSize: '106.74% 106.74%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom border decoration */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 bg-cover bg-no-repeat bg-top-left"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </section>
  );
}