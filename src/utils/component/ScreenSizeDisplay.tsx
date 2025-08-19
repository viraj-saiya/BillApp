import React, { useState } from 'react'

function ScreenSizeDisplay() {
  const [screenSize, setScreenSize] = useState('Mobile');
  useState(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenSize('Desktop (1024px+)');
      else if (width >= 768) setScreenSize('Tablet (768px+)');
      else setScreenSize('Mobile (<768px)');
    };
  
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  });
  return (
   <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white px-3 py-2 rounded-full text-xs font-bold z-50">
        📱 {screenSize}
      </div>
  )
}

export default ScreenSizeDisplay

  // Update screen size indicator