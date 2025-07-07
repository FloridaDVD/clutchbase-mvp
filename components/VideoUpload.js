import React, { useState } from 'react';

export default function VideoUpload() {
  const [description, setDescription] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [feedback, setFeedback] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !description.trim()) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'clutchbase-video-upload');
    formData.append('resource_type', 'video');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/…/video/upload',
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      setVideoURL(data.secure_url);

      const aiRes = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const aiData = await aiRes.json();
      setFeedback(aiData.feedback);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#222', color: '#fff' }}>
      <h2>Ladda upp highlight-video</h2>
      <input
        type="text"
        placeholder="Beskriv klippet (t.ex. 1v3 clutch B site)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '80%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {uploading && <p>Laddar upp...</p>}
      {videoURL && <video src={videoURL} controls style={{ width: '100%', maxWidth: '600px' }} />}
      {feedback && (
        <>
          <h3>Feedback:</h3>
          <p>{feedback}</p>
        </>
      )}
    </div>
  );
}
