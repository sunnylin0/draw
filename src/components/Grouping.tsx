
import React, { useState } from 'react';
import { Group } from '../types';

interface GroupingProps {
  participants: string[];
}

export const Grouping: React.FC<GroupingProps> = ({ participants }) => {
  const [groupSize, setGroupSize] = useState(4);
  const [groups, setGroups] = useState<Group[]>([]);

  const generateGroups = () => {
    if (participants.length === 0) return;
    
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const result: Group[] = [];
    
    for (let i = 0; i < shuffled.length; i += groupSize) {
      result.push({
        id: Math.floor(i / groupSize) + 1,
        members: shuffled.slice(i, i + groupSize),
      });
    }
    
    setGroups(result);
  };

  const downloadCSV = () => {
    if (groups.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,組別,成員姓名\n";
    groups.forEach(group => {
      group.members.forEach(member => {
        csvContent += `第 ${group.id} 組,${member}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `分組結果_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (participants.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-200">
        <p className="text-gray-400">請先在「名單匯入」標籤中匯入參與者</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-8 justify-between">
        <div className="space-y-2 text-center lg:text-left">
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">自動分組系統</h3>
          <p className="text-slate-500">輸入每組人數，系統將為您公平分配成員</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 ml-2 uppercase">每組人數</span>
            <div className="flex items-center border rounded-xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-indigo-600 font-bold transition-colors border-r"
              >
                -
              </button>
              <input 
                type="number" 
                className="w-14 text-center bg-transparent border-none font-bold text-lg outline-none"
                value={groupSize}
                onChange={(e) => setGroupSize(Math.max(2, parseInt(e.target.value) || 2))}
              />
              <button 
                onClick={() => setGroupSize(groupSize + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-indigo-600 font-bold transition-colors border-l"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={generateGroups}
              className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              🚀 開始分組
            </button>
            {groups.length > 0 && (
              <button
                onClick={downloadCSV}
                className="px-6 py-3.5 bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-2"
                title="下載分組結果 CSV"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                導出 CSV
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all group animate-slideInUp">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg font-bold text-sm">
                  {group.id}
                </span>
                <span className="font-bold text-gray-700">Team Group</span>
              </div>
              <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-medium">
                {group.members.length} 人
              </span>
            </div>
            <div className="space-y-2">
              {group.members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-transparent group-hover:bg-indigo-50/50 group-hover:border-indigo-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  <span className="text-gray-700 font-medium">{member}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="lg:col-span-3 text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="font-medium">尚未進行分組，請點擊上方按鈕開始</p>
          </div>
        )}
      </div>
    </div>
  );
};
