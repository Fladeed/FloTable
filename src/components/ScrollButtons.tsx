import { useCallback, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { cn } from "../utils/cn";

type ScrollButtonsProps = {
  show?: boolean;
  className?: string;
  buttonClassName?: string;
};

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ show = true, className, buttonClassName }) => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Scroll functions
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  // Monitor scroll position to show/hide scroll buttons
  useEffect(() => {
    if (!show) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButtons(scrollTop > 300); // Show buttons after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  if (!show || !showScrollButtons) return null;

  return (
    <div className={cn(className)} style={{ position: 'fixed', right: '1rem', bottom: '1rem', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Tooltip title="Scroll to top" placement="left">
        <button
          onClick={scrollToTop}
          className={cn(buttonClassName)}
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 200ms ease',
            backdropFilter: 'blur(4px)',
            border: '1px solid #d1d5db',
            backgroundColor: 'rgba(229, 231, 235, 0.8)',
            color: '#374151'
          }}
          aria-label="Scroll to top"
        >
          <UpOutlined />
        </button>
      </Tooltip>
      <Tooltip title="Scroll to bottom" placement="left">
        <button
          onClick={scrollToBottom}
          className={cn(buttonClassName)}
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 200ms ease',
            backdropFilter: 'blur(4px)',
            border: '1px solid #d1d5db',
            backgroundColor: 'rgba(229, 231, 235, 0.8)',
            color: '#374151'
          }}
          aria-label="Scroll to bottom"
        >
          <DownOutlined />
        </button>
      </Tooltip>
    </div>
  );
};

export default ScrollButtons;
