
import { PropsWithChildren, useState, useEffect } from 'react';

// Fade In component
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 300,
  className = ''
}: PropsWithChildren<{ 
  delay?: number; 
  duration?: number;
  className?: string;
}>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-opacity ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

// Slide Up component
export const SlideUp = ({ 
  children, 
  delay = 0,
  duration = 400,
  distance = 20,
  className = ''
}: PropsWithChildren<{ 
  delay?: number; 
  duration?: number;
  distance?: number;
  className?: string;
}>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        marginBottom: '40px'
      }}
    >
      {children}
    </div>
  );
};

// Staggered Container
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 100,
  initialDelay = 0,
  className = ''
}: PropsWithChildren<{ 
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}>) => {
  return (
    <div className={className}>
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <SlideUp key={index} delay={initialDelay + index * staggerDelay}>
            {child}
          </SlideUp>
        )) : 
        children
      }
    </div>
  );
};

// Scale In component
export const ScaleIn = ({ 
  children, 
  delay = 0,
  duration = 300,
  className = ''
}: PropsWithChildren<{ 
  delay?: number; 
  duration?: number;
  className?: string;
}>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};
