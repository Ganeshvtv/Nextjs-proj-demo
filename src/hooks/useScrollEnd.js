import { useEffect, useRef, useState } from 'react';

const useScrollEnd = (load) => {
  const loading = useRef(false);
  const [limit, setLimit] = useState(10);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!load) {
      loading.current = false;
    }
  }, [load]);

  useEffect(() => {
    const onScroll = () => {
      if (
        !loading.current &&
        scrollContainerRef.current &&
        scrollContainerRef.current.scrollTop +
          scrollContainerRef.current.clientHeight >=
          scrollContainerRef.current.scrollHeight
      ) {
        loading.current = true;
        setLimit((prevLimit) => prevLimit + 10);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return { scrollContainerRef, limit };
};

export default useScrollEnd;
