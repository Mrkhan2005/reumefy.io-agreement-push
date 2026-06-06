import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import ServicesPage from './pages/ServicesPage';
import AgreementPage from './pages/AgreementPage';
import AdminDashboard from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <OrderProvider>
      <Router>
        <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden">
          {/* Loop Video Background with force-autoplay DOM ref */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.muted = true;
                // Force play command to ensure browser media engine activates
                videoElement.play().catch((err) => {
                  console.warn("Autoplay was prevented by browser security engine: ", err);
                });
              }
            }}
            className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-0 opacity-22 transition-opacity duration-1000 scale-[1.02]"
            src="./bg-video.mp4"
          />

          {/* Grid Pattern Overlay */}
          <div className="fixed inset-0 grid-overlay z-0 pointer-events-none opacity-45" />

          {/* Radial Dark Gradient Overlay (Keeps content legible in center, dark around edges) */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(10,15,30,0.50)_0%,rgba(10,15,30,0.94)_85%)] z-0 pointer-events-none" />

          {/* Core Content */}
          <div className="relative z-10 w-full min-h-screen">
            <Routes>
              <Route path="/" element={<ServicesPage />} />
              <Route path="/agreement" element={<AgreementPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </OrderProvider>
  );
};

export default App;
