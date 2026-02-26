'use client';

import { useState, useEffect } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  aspectRatio?: 'square' | 'wide'; // square = 1:1, wide = 4:3
  objectFit?: 'cover' | 'contain'; // cover = zoomed, contain = full object
}

export default function ProductImageGallery({ 
  images, 
  productName,
  aspectRatio = 'square',
  objectFit = 'cover'
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Only show gallery UI if there are multiple images
  const hasMultipleImages = images.length > 1;

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      goToNext();
    } else if (isRightSwipe && currentImageIndex > 0) {
      goToPrevious();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!showLightbox) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
        goToNext();
      } else if (e.key === 'Escape') {
        setShowLightbox(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, currentImageIndex, images.length]);

  // Prevent body scroll when lightbox is open (app-like experience)
  useEffect(() => {
    if (showLightbox) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showLightbox]);

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]';
  const objectFitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <>
      {/* Thumbnail Gallery - Click to open lightbox */}
      <div 
        className={`${aspectClass} bg-[#f0ece6] overflow-hidden relative group cursor-pointer`}
        onClick={() => setShowLightbox(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Main Image */}
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full ${objectFitClass} group-hover:scale-105 transition-transform duration-700`}
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23f0ece6" width="400" height="400"/%3E%3C/svg%3E';
            }}
          />
          
          {/* Hover overlay - subtle dark fade */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 pointer-events-none" />
        </div>

        {/* Navigation Arrows - Modern sleek style, no borders */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl opacity-0 group-hover:opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300 z-10 hidden md:block"
              aria-label="Previous image"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl opacity-0 group-hover:opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300 z-10 hidden md:block"
              aria-label="Next image"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              ›
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Full-Screen Lightbox - Same style as yacht details page */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8 overflow-hidden touch-none"
          onClick={() => setShowLightbox(false)}
          style={{ touchAction: 'none' }}
        >
          <div 
            className="relative max-w-5xl w-full touch-pan-x"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={(e) => {
              e.preventDefault();
              onTouchMove(e);
            }}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-x' }}
          >
            {/* Product Name Header */}
            <div className="absolute -top-12 md:-top-16 left-0 right-0 text-center">
              <h2 className="editorial-card-name text-white text-xl md:text-2xl">
                {productName}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-10 right-0 md:-top-14 md:-right-14 text-white text-4xl md:text-5xl hover:text-[#c4a265] transition-colors z-10"
            >
              ×
            </button>
            
            {/* Previous Button - Desktop only */}
            {currentImageIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#c4a265] transition-colors"
              >
                ‹
              </button>
            )}
            
            {/* Next Button - Desktop only */}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={goToNext}
                className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-[#c4a265] transition-colors"
              >
                ›
              </button>
            )}
            
            {/* Full-Size Image */}
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${productName} - Photo ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain shadow-2xl select-none"
                draggable={false}
              />
              {/* Swipe hint on mobile */}
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs animate-pulse pointer-events-none">
                ← Swipe to navigate →
              </div>
            </div>
            
            {/* Counter */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm" style={{fontWeight: 400}}>
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
