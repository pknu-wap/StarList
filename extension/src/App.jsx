import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-blue-500 text-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Tailwind CSS 작동 중!</h1>
        <p className="text-lg">이 컴포넌트는 Tailwind CSS 클래스로 스타일링 되어 있습니다.</p>
      </div>
    </div>
  );
}

export default App;