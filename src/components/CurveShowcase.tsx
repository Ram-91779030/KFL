import React from 'react';
import { 
  EnhancedCurve, 
  PerfectCurveDivider, 
  LayeredCurve,
  KFLRedCurve,
  KFLGreenCurve,
  KFLYellowCurve,
  KFLWhiteCurve,
  KFLBlueCurve
} from './EnhancedCurves';
import { 
  RedCurveDivider,
  YellowCurveDivider,
  GreenCurveDivider,
  BlueCurveDivider,
  WhiteCurveDivider,
  GrayCurveDivider,
  LayeredCurveDivider
} from './CurveDivider';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

export function CurveShowcase() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-6 px-6 py-3 text-lg font-poppins">
            🎨 Curve Showcase
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
            Enhanced Curve System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Mathematically precise curves with perfect alignment and sophisticated gradients
          </p>
        </div>

        <div className="space-y-32">
          
          {/* Enhanced Curve Styles */}
          <section className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center font-poppins">Enhanced Curve Styles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Wave Style */}
              <Card className="p-8 bg-gradient-to-br from-red-50 to-pink-50 relative overflow-hidden">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Wave Style</h3>
                  <p className="text-gray-600 font-inter">Dynamic flowing curves</p>
                </div>
                <div className="h-32 bg-red-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold font-poppins">Content Area</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full">
                    <EnhancedCurve
                      position="bottom"
                      color="#ffffff"
                      height={60}
                      style="wave"
                    />
                  </div>
                </div>
              </Card>

              {/* Smooth Style */}
              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Smooth Style</h3>
                  <p className="text-gray-600 font-inter">Gentle, flowing transitions</p>
                </div>
                <div className="h-32 bg-green-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold font-poppins">Content Area</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full">
                    <EnhancedCurve
                      position="bottom"
                      color="#ffffff"
                      height={60}
                      style="smooth"
                    />
                  </div>
                </div>
              </Card>

              {/* Elegant Style */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Elegant Style</h3>
                  <p className="text-gray-600 font-inter">Sophisticated asymmetrical curves</p>
                </div>
                <div className="h-32 bg-blue-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold font-poppins">Content Area</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full">
                    <EnhancedCurve
                      position="bottom"
                      color="#ffffff"
                      height={60}
                      style="elegant"
                    />
                  </div>
                </div>
              </Card>

              {/* Organic Style */}
              <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Organic Style</h3>
                  <p className="text-gray-600 font-inter">Natural, irregular patterns</p>
                </div>
                <div className="h-32 bg-yellow-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 font-bold font-poppins">Content Area</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full">
                    <EnhancedCurve
                      position="bottom"
                      color="#ffffff"
                      height={60}
                      style="organic"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* KFL Brand Curves */}
          <section className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center font-poppins">KFL Brand Curves</h2>
            
            <div className="space-y-8">
              
              {/* Red Curve */}
              <div className="h-40 bg-gradient-to-r from-red-100 to-red-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-red-800 font-bold text-xl font-poppins">KFL Red Signature</span>
                </div>
                <KFLRedCurve position="bottom" style="elegant" />
              </div>

              {/* Green Curve */}
              <div className="h-40 bg-gradient-to-r from-green-100 to-green-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-green-800 font-bold text-xl font-poppins">KFL Green Natural</span>
                </div>
                <KFLGreenCurve position="bottom" style="smooth" />
              </div>

              {/* Yellow Curve */}
              <div className="h-40 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-yellow-800 font-bold text-xl font-poppins">KFL Yellow Energy</span>
                </div>
                <KFLYellowCurve position="bottom" style="organic" />
              </div>

              {/* Blue Curve */}
              <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-blue-800 font-bold text-xl font-poppins">KFL Blue Trust</span>
                </div>
                <KFLBlueCurve position="bottom" style="wave" />
              </div>
            </div>
          </section>

          {/* Layered Curves */}
          <section className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center font-poppins">Layered Depth System</h2>
            
            <div className="h-60 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl font-poppins">Multi-Layer Sophistication</span>
              </div>
              <LayeredCurve
                position="bottom"
                colors={['#ffffff', '#f8fafc', '#f1f5f9']}
                heights={[120, 100, 80]}
                style="elegant"
              />
            </div>
          </section>

          {/* Perfect Alignment Demo */}
          <section className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center font-poppins">Perfect Section Alignment</h2>
            
            <div className="space-y-0">
              
              {/* Section 1 */}
              <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-poppins">Section One</span>
                </div>
                <PerfectCurveDivider
                  position="bottom"
                  fromColor="#ffffff"
                  height={100}
                  style="smooth"
                />
              </div>

              {/* Section 2 */}
              <div className="h-48 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-xl font-poppins">Section Two</span>
                </div>
                <PerfectCurveDivider
                  position="bottom"
                  fromColor="#22C55E"
                  height={100}
                  style="elegant"
                />
              </div>

              {/* Section 3 */}
              <div className="h-48 bg-green-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-poppins">Section Three</span>
                </div>
                <PerfectCurveDivider
                  position="bottom"
                  fromColor="#3B82F6"
                  height={100}
                  style="wave"
                />
              </div>

              {/* Section 4 */}
              <div className="h-48 bg-blue-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-poppins">Perfect Alignment</span>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Traditional Curves */}
          <section className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-12 text-center font-poppins">Enhanced Traditional Curves</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="h-32 bg-gradient-to-r from-red-400 to-red-500 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold font-poppins">Enhanced Red</span>
                </div>
                <RedCurveDivider position="bottom" />
              </div>

              <div className="h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold font-poppins">Enhanced Green</span>
                </div>
                <GreenCurveDivider position="bottom" />
              </div>

              <div className="h-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-900 font-bold font-poppins">Enhanced Yellow</span>
                </div>
                <YellowCurveDivider position="bottom" />
              </div>

              <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold font-poppins">Enhanced Blue</span>
                </div>
                <BlueCurveDivider position="bottom" />
              </div>
            </div>
          </section>

        </div>
      </div>
      
      {/* Final Sophisticated Curve */}
      <div className="mt-20">
        <LayeredCurveDivider
          position="bottom"
          primaryColor="#ffffff"
          secondaryColor="#f8fafc"
        />
      </div>
    </div>
  );
}