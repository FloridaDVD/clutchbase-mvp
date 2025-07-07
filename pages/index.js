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
          fontFamily: 'sans-serif',
          padding: '2rem',
        }}
      >
        <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Välkommen till <span style={{ color: '#00FFFF' }}>CLUTCHBASE</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#FF007F' }}>
            Från feed till feedback till frag. 🎯
          </p>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <LoginForm />
        </section>

        <section>
          <VideoUpload />
        </section>
      </main>
    </>
  );
}
