import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import VideoUpload from '../components/VideoUpload';

export default function Home() {
  return (
    <>
      <Head>
        <title>CLUTCHBASE MVP</title>
        <meta name="description" content="Från feed till feedback till frag." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        style={{
          backgroundColor: '#0D0D0D',
          color: '#FFFFFF',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Välkommen till <span style={{ color: '#00FFFF' }}>CLUTCHBASE</span>
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#FF007F' }}>
          Från feed till feedback till frag. 🎯
        </p>

        <LoginForm />
        <div style={{ height: '2rem' }} /> {/* Avstånd */}
        <VideoUpload />
      </main>
    </>
  );
}
