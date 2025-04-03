
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { Original_Img_Base_URL,MOVIE_CATEGORIES,TV_CATEGORIES } from '../../utils/constants';
import { useContentStore } from '../../store/content';
import Slider from '../../components/Slider';

const HomeScreen = () => {
  const {trendingContent}=useGetTrendingContent();
  const {contentType} = useContentStore();
  return (
    <div>
      <div className="relative h-screen text-teal-500">
        <Navbar />
        <img src={Original_Img_Base_URL + trendingContent?.backdrop_path} alt="img" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden="true" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
          <div className="max-w-2xl ">
            <h1 className=" mt-6 text-6xl font-extrabold text-balance">
              {trendingContent?.title||trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg ">
              {trendingContent?.release_date?.split("-")[0]||
              trendingContent?.first_air_date?.split("-")[0]}{""}
              {trendingContent?.adult ? "18+"  : " "+ "| " + "PG-13"}
            </p>
            <p className="mt-4 text-lg ">
              {trendingContent?.overview.length >200? trendingContent?.overview.slice(0,200)+"...":trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link to={`/watch/${trendingContent?.id}`} className="bg-white hover:bg-black hover:text-white text-teal-500 font-bold py-2 px-4 rounded mr-4 flex items-center transition duration-75 hover:scale-105">
            <Play className="size-6 inline-block mr-2 fill-black hover:fill-teal-700  " />
            Play
            </Link>
            <Link to={`/watch/${trendingContent?.id}`} className="bg-gray-600/70 hover:bg-white hover:text-black py-2 flex items-center rounded px-2 transition duration-75 hover:scale-105">
            <Info className="size-6 inline-block mr-2 " />
            More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType==="movie"? (MOVIE_CATEGORIES.map(category => <Slider key={category} category={category} />)) :(TV_CATEGORIES.map(category => <Slider key={category} category={category} />)) }

      </div>
    </div>
  );
};

export default HomeScreen;
