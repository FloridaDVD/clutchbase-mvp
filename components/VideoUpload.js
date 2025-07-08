import { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const { url } = await uploadRes.json();

    const feedbackRes = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl: url }),
    });

    const { feedback } = await feedbackRes.json();
    setFeedback(feedback);
    setUploading(false);
  };

  return (
    <div className="p-4 bg-black rounded-xl shadow-md text-white">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beskriv klippet" className="w-full mb-2 p-2 rounded" />
        <button type="submit" disabled={uploading} className="bg-cyan-500 px-4 py-2 rounded text-black">
          {uploading ? 'Laddar upp...' : 'Skicka till AI'}
        </button>
      </form>
      {feedback && <FeedbackDisplay feedback={feedback} />}
    </div>
  );
}
