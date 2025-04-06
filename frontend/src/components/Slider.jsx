import React from 'react'
import { useContentStore } from '../store/content'
import { Small_Img_Base_URl } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ category }) => {
  const { contentType } = useContentStore();
  const formattedCategory = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

  const formattedContentType = contentType === 'movie' ? "Movies" : "TV Shows";
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/${contentType}/${category}`)
      setContent(res.data.content)
    }
    getContent();
  }, [contentType, category])

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeftStart(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
    sliderRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)} 
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategory} {formattedContentType}
      </h2>
      <div 
        className="flex space-x-4 overflow-x-auto no-scrollbar"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {content.map((item) => (
          <Link 
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group flex-shrink-0" 
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img 
                src={Small_Img_Base_URl + item.backdrop_path} 
                alt="Movie Img" 
                className="transition-transform duration-300 ease-in-out group-hover:scale-125" 
              />
            </div>
            <p className='mt-2 text-center'>
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>
      
      {showArrows && (
        <div>
          <button 
            className='absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-90 text-white z-10' 
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-90 text-white z-10' 
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Slider