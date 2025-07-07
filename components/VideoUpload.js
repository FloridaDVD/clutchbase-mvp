import React, { useState } from 'react';

const VideoUpload = () => {
  const [videoURL, setVideoURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [description, setDescription] = useState('');

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || description.trim() === '') return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'clutchbase-video-upload');
    formData.append('resource_type', 'video');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhvyp3k7t/video/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setVideoURL(data.secure_url);

      // Skicka till OpenAI för feedback
      const aiResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
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
      <h2>🎥 Ladda upp Highlight-video</h2>
      <input
        type="text"
        placeholder="Beskriv klippet (t.ex. 1v3 clutch B site)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '80%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {uploading && <p>Laddar upp...</p>}
      {videoURL && <video src={videoURL} controls style={{ marginTop: '1rem', width: '80%' }} />}
      {feedback && (
        <div style={{ marginTop: '1.5rem', backgroundColor: '#222', padding: '1rem', borderRadius: '8px' }}>
          <h3>🧠 AI-feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
