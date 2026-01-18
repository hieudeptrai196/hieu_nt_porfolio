import { useEffect } from 'react';

const Protect = () => {
  useEffect(() => {
    // Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable Keyboard Shortcuts
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element), Ctrl+U (Source)
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || // Mac Cmd+Opt+I/J/C
        (e.metaKey && e.key === 'U') // Mac Cmd+U
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Component này không render gì cả
};

export default Protect;
