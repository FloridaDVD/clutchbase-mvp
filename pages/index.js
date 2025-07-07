import React from 'react';
import VideoUpload from '../components/VideoUpload';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      textAlign: 'center',
      backgroundColor: '#0D0D0D',
      color: '#fff',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem' }}>CLUTCHBASE MVP</h1>
      <p style={{ fontSize: '1.2rem' }}>Från feed till feedback till frag. 🎯</p>

      <div style={{ marginTop: '3rem' }}>
        <VideoUpload />
      </div>
    </div>
  );
}
