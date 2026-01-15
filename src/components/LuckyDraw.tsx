
import React, { useState, useEffect, useRef } from 'react';

interface LuckyDrawProps {
  participants: string[];
}

export const LuckyDraw: React.FC<LuckyDrawProps> = ({ participants }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [availableList, setAvailableList] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [displayWinner, setDisplayWinner] = useState<string | null>(null);
  const [animatingList, setAnimatingList] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setAvailableList(participants);
  }, [participants]);

  const startDraw = () => {
    const source = allowRepeat ? participants : availableList;
    if (source.length === 0) {
      alert('所有參與者都已經中過獎了！');
      return;
    }

    setIsSpinning(true);
    setDisplayWinner(null);
    
    // Create random list for animation
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    setAnimatingList(shuffled.concat(shuffled).concat(shuffled));

    let count = 0;
    const duration = 2000; // 2 seconds
    const interval = 50;
    
    timerRef.current = window.setInterval(() => {
      count += interval;
      if (count >= duration) {
        if (timerRef.current) clearInterval(timerRef.current);
        const finalWinner = source[Math.floor(Math.random() * source.length)];
        
        setWinners(prev => [finalWinner, ...prev]);
        setDisplayWinner(finalWinner);
        setIsSpinning(false);

        if (!allowRepeat) {
          setAvailableList(prev => prev.filter(name => name !== finalWinner));
        }
      }
    }, interval);
  };

  const resetDraw = () => {
    setAvailableList(participants);
    setWinners([]);
    setDisplayWinner(null);
  };

  if (participants.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
        <p className="text-gray-400">請先匯入參與者名單</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* Control Area */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-md text-center border-4 border-indigo-50 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">重複中獎</span>
            <button 
              onClick={() => setAllowRepeat(!allowRepeat)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${allowRepeat ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${allowRepeat ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-700">幸運大抽獎</h3>
            
            <div className="h-24 flex items-center justify-center">
              {isSpinning ? (
                <div className="text-5xl font-black text-indigo-600 animate-pulse tracking-widest">
                  抽獎中...
                </div>
              ) : displayWinner ? (
                <div className="animate-bounce scale-110">
                  <span className="text-sm text-indigo-400 block mb-1 uppercase tracking-widest font-bold">Winner</span>
                  <span className="text-6xl font-black text-indigo-700">{displayWinner}</span>
                </div>
              ) : (
                <div className="text-gray-300 text-6xl font-black">? ? ?</div>
              )}
            </div>

            <button
              onClick={startDraw}
              disabled={isSpinning || (!allowRepeat && availableList.length === 0)}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              {isSpinning ? '正在抽取...' : '開始抽獎'}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 bg-white p-4 rounded-xl shadow-sm">
          <span>剩餘待抽人數: <span className="font-bold text-indigo-600">{availableList.length}</span></span>
          <button onClick={resetDraw} className="text-red-500 hover:text-red-700 font-medium">清空所有紀錄</button>
        </div>
      </div>

      {/* History Area */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[500px]">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-amber-400 rounded-full"></span>
          中獎名單 ({winners.length})
        </h4>
        <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {winners.length === 0 && <p className="text-gray-400 text-center py-10 italic">尚未開出獎項</p>}
          {winners.map((winner, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl animate-slideInRight">
              <span className="font-medium text-gray-700">{winner}</span>
              <span className="text-xs text-gray-400 font-mono">#{winners.length - idx}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
