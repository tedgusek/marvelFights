import { useEffect, useState } from 'react';
import { LoadingProps } from '@/app/types/interface';

const LoadingComponent: React.FC<LoadingProps> = ({ loading }) => {
  const [loadingOpacity, setLoadingOpacity] = useState<number>(0); // Initial opacity

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingOpacity((prevOpacity) => {
          const newOpacity = prevOpacity + 0.2; // Increase opacity gradually
          return newOpacity >= 1 ? 1 : newOpacity; // Ensure opacity doesn't exceed 1
        });
      }, 250); // Adjust the interval duration as needed

      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else {
      setLoadingOpacity(0); // Reset opacity when loading is finished
    }
  }, [loading]); // Re-run effect when loading prop changes

  return (
    <div
      className='fixed inset-0 bg-white'
      style={{ opacity: loadingOpacity, transition: 'opacity 1s linear' }}
    >
      {/* Your loading indicator here */}
      <div className='h-full w-full flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 flex flex-row items-center bg-red-500 m-4'>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
