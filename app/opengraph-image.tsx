import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Jax Sod - Professional Sod Installation in Jacksonville, FL'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#22c55e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '52px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            J
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Jax Sod
          </div>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '500',
          }}
        >
          Professional Sod Installation | Jacksonville, FL
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
