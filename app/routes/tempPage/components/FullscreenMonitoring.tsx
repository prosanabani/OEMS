import React, { useEffect,useState } from "react";

const MaximizedText = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMaximized(window.innerWidth === window.screen.width);
    };

    window.addEventListener("resize", handleResize);
    // use effect clear function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div>
        {isMaximized && <p>You are using the website in a maximized size.</p>}
      </div>
    </div>
  );
};

export default MaximizedText;
