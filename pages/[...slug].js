// pages/[...slug].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CatchAllPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/error');
  }, [router]);

  return null;
};

export default CatchAllPage;
