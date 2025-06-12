"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Play, Users, Award, Zap, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProprioLogicsLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      <Navbar theme='light'/>
      

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
             backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/propriologics-background.png')`
            // backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23064e3b;stop-opacity:1" /><stop offset="50%" style="stop-color:%23065f46;stop-opacity:1" /><stop offset="100%" style="stop-color:%23047857;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23forestGrad)"/><circle cx="200" cy="200" r="100" fill="%23059669" opacity="0.3"/><circle cx="800" cy="300" r="150" fill="%23047857" opacity="0.2"/><circle cx="1000" cy="600" r="120" fill="%23065f46" opacity="0.4"/></svg>')`
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome To
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Propriologics
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-4 font-light">
            by Anchor Logics, Co. Ltd.
          </p>
          
          <p className="text-lg md:text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Balance Compensation Platform for People with Balance Dysfunction
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('technology')}
              className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Explore Technology
              <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button className="flex items-center space-x-2 text-white border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pioneering Balance Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Propriologics, we're revolutionizing balance rehabilitation through cutting-edge biotech hardware solutions that restore confidence and mobility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Patient-Centered Care",
                description: "Our solutions are designed with the patient experience at the forefront, ensuring comfort and effectiveness in every interaction."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Clinical Excellence",
                description: "Backed by rigorous research and clinical validation, our platform delivers measurable improvements in balance function."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Advanced Technology",
                description: "State-of-the-art sensors and AI-driven algorithms provide real-time feedback and personalized treatment protocols."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-500 to-teal-600 text-white p-3 rounded-xl w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Revolutionary Balance
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  Compensation Platform
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our proprietary platform combines advanced proprioceptive feedback with intelligent compensation algorithms to help individuals with balance dysfunction regain stability and confidence in their daily activities.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Real-time balance assessment and feedback",
                  "Personalized compensation protocols",
                  "Progressive difficulty adjustment",
                  "Comprehensive progress tracking"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Learn More About Our Technology
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Balance Assessment</h3>
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stability Score</span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Compensation Active</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to learn more about our balance compensation platform? Contact us today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-teal-600 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                  <p className="text-gray-300">+82-10-8361-3065</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-teal-600 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-gray-300">nelson.an@propriologics.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-teal-600 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-300">
                    Suites 605 and 606, Business incubation Center, 154-42,<br />
                    Gwanggyosan-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, South Korea
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-lg">Propriologics</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Propriologics by Anchor Logics, Co. Ltd. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Pioneering balance rehabilitation technology
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProprioLogicsLanding;
