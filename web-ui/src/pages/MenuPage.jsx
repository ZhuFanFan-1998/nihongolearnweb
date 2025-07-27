import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuPage() {
    const navigate = useNavigate();

  return (
    <div>
      <button className="fancy-btn" onClick={() => navigate('/matchWaiting')}>
        対決
      </button>
    </div>
  );
}

export default MenuPage;