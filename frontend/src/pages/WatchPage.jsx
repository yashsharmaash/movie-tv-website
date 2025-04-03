import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect,useRef } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from "react-player"
import { Original_Img_Base_URL } from '../utils/constants.js';

import { Small_Img_Base_URl } from '../utils/constants.js';


function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailersIdx, setCurrentTrailersIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);



  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes('404')) {
          setTrailers([]);

        }
      }

    }; getTrailers();
  }, [contentType, id]);




  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes('404')) {
          setSimilarContent([]);

        }
      }

    }; getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes('404')) {
          setContent(null);

        }
      }
      finally {
        setLoading(false);
      }

    }; getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailersIdx < trailers.length - 1)
      setCurrentTrailersIdx(currentTrailersIdx + 1);

  }
  const handlePrev = () => {
    if (currentTrailersIdx > 0)
      setCurrentTrailersIdx(currentTrailersIdx - 1);

  }
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  }

  

  return (<div className='bg-black min-h-screen text-white'>
    <div className='mx-auto container px-4 py-8 h-full'>
      <Navbar />
      {console.log("navbar rendered")}
      {trailers.length > 0 && (
        <div className='flex justify-between items-center mb-4'>
          <button className={`bg-gray-500/60 hover:bg-gray-500  text-white py-2 px-4 rounded ${currentTrailersIdx === 0 ? 'cursor-not-allowed opacity-50' : " "} `}
            disabled={currentTrailersIdx === 0}
            onClick={handlePrev} >
            <ChevronLeft size={24}
            />
          </button>

          <button className={`bg-gray-500/60 hover:bg-gray-500  text-white py-2 px-4 rounded ${currentTrailersIdx === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : " "} `}
            disabled={currentTrailersIdx === trailers.length - 1}
            onClick={handleNext}>
            <ChevronRight size={24}
            />
          </button>

        </div>
      )}

      <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
        {trailers.length >0 && (
          <ReactPlayer 
          controls={true}
           width={"100%"}
            height={"100%"}
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
          />
        )}

        {trailers.length === 0 && (
          <h2 className="text-xl text-center mt-5">
            No trailers available for{"  "}
            <span className="font-bold text-teal-600">
              {content?.title || content?.name}
            </span>
          </h2>)}
        

      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">

        <div className="mb-4 md:mb-0">
          <h2 className="text-5xl font-bold text-balance">
            {content?.title || content?.name}
          </h2>
          <p className="mt-2 text-lg">
            {formatReleaseDate(content?.release_date || content?.first_air_date)} |{"  "} {content?.adult ? (
              <span className="text-red-500">18+</span>
            ) : (
              <span className="text-green-500">All ages</span>
            )}
          </p>
          <p className="mt-4 text-lg">{content?.overview}</p>

          
         

        </div>
        <img src={Original_Img_Base_URL + content.poster_path} alt="Img" className="max-h-[600px] rounded-md" />
         
          



      </div>
      {similarContent.length > 0 && (
        <div className=" mt-12 max-w-5xl mx-auto relative ">
          <h3 className='text-3xl fint-bold mb-4'>
            Similar Movies/Tv Shows

          </h3>
          <div className='flex overflow-hidden no-scrollbar gap-4 pb-4 group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={ Small_Img_Base_URl + content?.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-gray-800 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-gray-800
								text-white rounded-full'
								onClick={scrollLeft}
							/>
            
          </div>

        </div>
        
        )}



    </div>
  </div>





  )

}

export default WatchPage