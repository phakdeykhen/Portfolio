import { useEffect } from 'react';

export default function FacebookPlugin() {
  useEffect(() => {
    // 1. Ensure the fb-root element exists in the DOM
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    // 2. Load the Facebook SDK script asynchronously if not already present
    const scriptId = 'facebook-jssdk';
    let scriptElement = document.getElementById(scriptId);

    const parseFacebookWidget = () => {
      if (window.FB) {
        try {
          window.FB.XFBML.parse();
        } catch (err) {
          console.error('Error parsing Facebook SDK XFBML:', err);
        }
      }
    };

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.crossOrigin = 'anonymous';
      document.body.appendChild(scriptElement);

      scriptElement.addEventListener('load', parseFacebookWidget);
    } else {
      if (window.FB) {
        parseFacebookWidget();
      } else {
        scriptElement.addEventListener('load', parseFacebookWidget);
      }
    }

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener('load', parseFacebookWidget);
      }
    };
  }, []);

  return (
    <div 
      className="fb-page-wrapper" 
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '10px 0',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="fb-page" 
        data-href="https://www.facebook.com/profile.php?id=61551776304743"
        data-tabs="timeline,messages"
        data-width="500" 
        data-height="450"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        data-colorscheme="dark"
        style={{ width: '100%' }}
      >
        <blockquote cite="https://www.facebook.com/profile.php?id=61551776304743" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/profile.php?id=61551776304743" style={{ color: 'var(--color-primary, #6366f1)' }}>
            ServiceLogi Facebook Page
          </a>
        </blockquote>
      </div>
    </div>
  );
}
