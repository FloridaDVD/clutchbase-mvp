import React, { useState } from 'react';

const VideoUpload = () => {
  const [videoURL, setVideoURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [description, setDescription] = useState('');

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !description.trim()) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'clutchbase-video-upload');
    formData.append('resource_type', 'video');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dwpgyp3kt/video/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setVideoURL(data.secure_url);

      // Skicka till OpenAI med din beskrivning
      const aiResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      const aiData = await aiResponse.json();
      setFeedback(aiData.feedback);

    } catch (error) {
      console.error('Fel vid uppladdning eller AI-feedback:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#0D0D0D', color: '#fff' }}>
      <h2>🎥 Ladda upp highlight-video</h2>
      <input
        type="text"
        placeholder="Beskriv klippet (t.ex. 1v3 clutch B site)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '0.5rem', width: '80%', marginBottom: '1rem' }}
      />
      <br />
      <input type="file" accept="video/*" onChange={handleVideoUpload} disabled={uploading} />
      {uploading && <p>🚀 Laddar upp och analyserar...</p>}
      {videoURL && (
        <div style={{ marginTop: '2rem' }}>
          <video src={videoURL} controls width="500" />
        </div>
      )}
      {feedback && (
        <div style={{ marginTop: '2rem', backgroundColor: '#111', padding: '1rem', borderRadius: '10px' }}>
          <h3>🧠 AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
