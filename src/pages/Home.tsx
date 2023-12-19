import { useMediaQuery } from 'react-responsive';

import HomeDesktop from './mobile/HomeDesktop';
import HomeMobile from './mobile/HomeMobile';




function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  // Return the ProCard component for the home page
  return (
    <div>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </div>
  );
  
}

export default Home;