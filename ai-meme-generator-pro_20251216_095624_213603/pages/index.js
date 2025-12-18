import { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateMeme = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        throw new Error('Failed to generate image');
      }
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setPrompt('');
    setImageUrl(null);
    setError(null);
  };

  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore
      }
    }
  }, [imageUrl]);

  return (
    <main className="container">
      <h1 className="title">AI Meme Generator Pro</h1>

      <div className="ad ad-top">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <textarea
        placeholder="Enter your meme idea here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        rows={3}
      />

      <button onClick={generateMeme} disabled={loading || !prompt.trim()}>
        {loading ? 'Generating...' : 'Generate Meme'}
      </button>

      <div className="ad ad-middle">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot="1234567891"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <>
          <img src={imageUrl} alt="Generated Meme" className="meme-image" />
          <button onClick={downloadImage}>Download Image</button>
          <button onClick={reset}>Generate Another Meme</button>

          <div className="ad ad-bottom">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
              data-ad-slot="1234567892"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </>
      )}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 0 1rem;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          text-align: center;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        textarea {
          width: 100%;
          font-size: 1.2rem;
          padding: 1rem;
          border-radius: 12px;
          border: 2px solid #ccc;
          resize: vertical;
          font-family: inherit;
          margin-bottom: 1rem;
        }
        button {
          background-color: #ff4081;
          border: none;
          color: white;
          font-size: 1.2rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          margin: 0.5rem;
          transition: background-color 0.3s ease;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #e73370;
        }
        .error {
          color: red;
          margin-top: 1rem;
        }
        .meme-image {
          width: 100%;
          margin-top: 1rem;
          border-radius: 12px;
          animation: fadeIn 0.6s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ad {
          margin: 1.5rem 0;
        }
      `}</style>
    </main>
  );
}
