
import React, { useState, useMemo } from 'react';

interface DataImportProps {
  onDataLoaded: (names: string[]) => void;
  currentCount: number;
}

export const DataImport: React.FC<DataImportProps> = ({ onDataLoaded, currentCount }) => {
  const [textInput, setTextInput] = useState('');
  
  const mockData = [
    "王小明", "李美玲", "張大衛", "林志豪", "陳嘉欣", 
    "黃雅婷", "劉傑森", "趙自強", "孫曉華", "周公瑾",
    "吳芳如", "徐文才", "朱麗葉", "馬英勇", "郭富貴",
    "曾文玲", "韓小強", "沈佳宜", "潘瑋柏", "蔡英文"
  ];

  const duplicates = useMemo(() => {
    const names = textInput.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
    const counts: Record<string, number> = {};
    names.forEach(n => counts[n] = (counts[n] || 0) + 1);
    return Object.entries(counts).filter(([_, count]) => count > 1).map(([name]) => name);
  }, [textInput]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setTextInput(text);
    };
    reader.readAsText(file);
  };

  const handleTextSubmit = () => {
    const names = textInput
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);
    if (names.length > 0) {
      onDataLoaded(names);
    }
  };

  const removeDuplicates = () => {
    const names = textInput.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
    const uniqueNames = Array.from(new Set(names));
    setTextInput(uniqueNames.join(', '));
  };

  const loadMockData = () => {
    setTextInput(mockData.join(', '));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">匯入活動名單</h2>
        <p className="text-gray-500">快速建立您的參與者資料庫</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Methods */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
              快速開始
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={loadMockData}
                className="flex-1 min-w-[140px] px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
              >
                ✨ 填入模擬名單
              </button>
              <label className="flex-1 min-w-[140px] cursor-pointer bg-slate-50 text-slate-700 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                📂 上傳 CSV / TXT
                <input type="file" className="hidden" accept=".csv,.txt" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-4">名單編輯區</h3>
            <textarea
              className="w-full p-4 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[250px] font-mono leading-relaxed mb-4"
              placeholder="請輸入姓名，可用逗號或換行分隔..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button
              onClick={handleTextSubmit}
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!textInput.trim()}
            >
              確認匯入名單 ({textInput.split(/[\n,]+/).filter(n => n.trim()).length} 人)
            </button>
          </div>
        </div>

        {/* Status and Tools */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">名單狀態檢查</h3>
              {duplicates.length > 0 && (
                <button 
                  onClick={removeDuplicates}
                  className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-100 font-bold transition-colors"
                >
                  一鍵移除重複
                </button>
              )}
            </div>

            {textInput.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl">
                    <div className="text-slate-400 text-xs mb-1">總輸入數量</div>
                    <div className="text-xl font-bold text-slate-700">
                      {textInput.split(/[\n,]+/).filter(n => n.trim()).length}
                    </div>
                  </div>
                  <div className="flex-1 bg-rose-50 p-3 rounded-xl">
                    <div className="text-rose-400 text-xs mb-1">重複數量</div>
                    <div className="text-xl font-bold text-rose-600">{duplicates.length}</div>
                  </div>
                </div>

                {duplicates.length > 0 && (
                  <div className="p-4 border border-rose-100 bg-rose-50/30 rounded-xl animate-pulse">
                    <div className="text-xs font-bold text-rose-500 mb-2 uppercase tracking-wider">發現重複姓名：</div>
                    <div className="flex flex-wrap gap-2">
                      {duplicates.map(name => (
                        <span key={name} className="px-2 py-1 bg-white border border-rose-200 text-rose-600 text-xs rounded-md shadow-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-50">
                   <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase">預覽 (前 10 筆)：</h4>
                   <div className="text-xs text-indigo-700 space-y-1">
                     {textInput.split(/[\n,]+/).filter(n => n.trim()).slice(0, 10).map((name, i) => (
                       <div key={i}>{i+1}. {name.trim()}</div>
                     ))}
                     {textInput.split(/[\n,]+/).filter(n => n.trim()).length > 10 && <div>... 以及更多</div>}
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm">等待輸入名單或使用模擬名單</p>
              </div>
            )}
          </div>

          {currentCount > 0 && (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <span className="text-emerald-700 text-sm font-bold flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                系統已備妥 {currentCount} 位成員資料
              </span>
              <span className="text-[10px] bg-white text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 font-mono">READY</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
