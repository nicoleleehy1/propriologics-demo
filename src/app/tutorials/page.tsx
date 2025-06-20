"use client"
import React, { useState } from 'react';
import { X, Play, Clock, User } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  videoUrl: string;
  detailedDescription: string;
  tags: string[];
}

const VideoTutorialPage: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  // Sample tutorial data - replace with your actual data
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Getting Started with React",
      description: "Learn the fundamentals of React development",
      duration: "15:30",
      instructor: "Jane Smith",
      thumbnail: "https://via.placeholder.com/400x225/3B82F6/ffffff?text=React+Basics",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "This comprehensive tutorial covers the essential concepts of React including components, props, state management, and hooks. Perfect for beginners looking to start their React journey.",
      tags: ["React", "JavaScript", "Frontend", "Beginner"]
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      description: "Master advanced TypeScript techniques",
      duration: "22:45",
      instructor: "John Doe",
      thumbnail: "https://via.placeholder.com/400x225/8B5CF6/ffffff?text=TypeScript+Advanced",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "Dive deep into advanced TypeScript patterns including generics, conditional types, mapped types, and utility types. This tutorial will elevate your TypeScript skills to the next level.",
      tags: ["TypeScript", "Advanced", "Types", "Patterns"]
    },
    {
      id: 3,
      title: "Next.js App Router Deep Dive",
      description: "Explore the new App Router in Next.js 13+",
      duration: "28:12",
      instructor: "Sarah Wilson",
      thumbnail: "https://via.placeholder.com/400x225/10B981/ffffff?text=Next.js+App+Router",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "Learn everything about Next.js App Router including file-based routing, layouts, loading states, error handling, and server components. Build modern web applications with confidence.",
      tags: ["Next.js", "App Router", "React", "SSR"]
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox Mastery",
      description: "Master modern CSS layout techniques",
      duration: "18:45",
      instructor: "Mike Johnson",
      thumbnail: "https://via.placeholder.com/400x225/F59E0B/ffffff?text=CSS+Layout",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "Master the art of CSS layout with comprehensive coverage of CSS Grid and Flexbox. Learn when to use each technique and how to create responsive, beautiful layouts.",
      tags: ["CSS", "Grid", "Flexbox", "Layout"]
    },
    {
      id: 5,
      title: "API Design Best Practices",
      description: "Build robust and scalable APIs",
      duration: "35:20",
      instructor: "Alex Chen",
      thumbnail: "https://via.placeholder.com/400x225/EF4444/ffffff?text=API+Design",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "Learn industry best practices for API design including RESTful principles, authentication, error handling, versioning, and documentation. Build APIs that scale.",
      tags: ["API", "REST", "Backend", "Best Practices"]
    },
    {
      id: 6,
      title: "Database Optimization Techniques",
      description: "Optimize your database performance",
      duration: "31:15",
      instructor: "Lisa Park",
      thumbnail: "https://via.placeholder.com/400x225/6366F1/ffffff?text=Database+Optimization",
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
      detailedDescription: "Discover advanced database optimization techniques including indexing strategies, query optimization, connection pooling, and performance monitoring. Make your databases lightning fast.",
      tags: ["Database", "Performance", "SQL", "Optimization"]
    }
  ];

  const openModal = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
  };

  const closeModal = () => {
    setSelectedTutorial(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm -b pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Video Tutorials
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master new skills with our comprehensive video tutorial library. 
              Click on any tutorial to get started.
            </p>
          </div>
        </div>
      </header>

      {/* Tutorial Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              onClick={() => openModal(tutorial)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12" />
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {tutorial.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {tutorial.description}
                </p>
                
                {/* Instructor */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User className="w-4 h-4 mr-2" />
                  {tutorial.instructor}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {tutorial.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{tutorial.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b">
              <div className="flex-1 mr-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedTutorial.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {selectedTutorial.instructor}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedTutorial.duration}
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Video Container */}
            <div className="p-6">
              <div className="relative w-full h-0 pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden mb-6">
                <iframe
                  src={selectedTutorial.videoUrl}
                  title={selectedTutorial.title}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this tutorial
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedTutorial.detailedDescription}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Topics covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTutorial.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Add to Playlist
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Share Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTutorialPage;