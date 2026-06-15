import React, { useState, useEffect } from 'react';
import { SAVED_REPORTS, SavedReport } from '../data';
import { Download, FileDown, Plus, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<SavedReport[]>(SAVED_REPORTS);
  const [filterType, setFilterType] = useState<string>('All');
  const [newReportName, setNewReportName] = useState<string>('');
  const [newReportFormat, setNewReportFormat] = useState<'PDF' | 'CSV' | 'xlsx'>('PDF');
  const [newReportCategory, setNewReportCategory] = useState<'Revenue' | 'Audience' | 'Performance' | 'Growth'>('Revenue');
  
  // Generation simulator states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Filtered reports calculation
  const filteredReports = reports.filter(r => {
    if (filterType === 'All') return true;
    return r.type === filterType;
  });

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportName.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
  };

  // Run generation step-by-step progress simulation
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete and append new report to the top
          const newReport: SavedReport = {
            id: `rep-${Date.now()}`,
            title: newReportName,
            type: newReportCategory,
            status: 'Ready',
            format: newReportFormat,
            size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
            date: new Date().toISOString().split('T')[0]
          };

          setReports(prevList => [newReport, ...prevList]);
          setIsGenerating(false);
          setNewReportName('');
          return 0;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isGenerating, newReportName, newReportFormat, newReportCategory]);

  const handleDownloadReport = (rep: SavedReport) => {
    setDownloadNotification(`Successfully downloaded "${rep.title}.${rep.format.toLowerCase()}" (${rep.size})`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Downloader Notification Banner */}
      {downloadNotification && (
        <div className="fixed top-24 right-8 bg-[#0a0a0f] border-2 border-brand-blue/50 text-white rounded-xl shadow-2xl p-4 z-50 flex items-center gap-3 transition-all duration-300 transform translate-y-0 text-sm glass-panel max-w-sm">
          <CheckCircle2 className="text-brand-emerald animate-bounce" size={20} />
          <div>
            <p className="font-bold">Export Success</p>
            <p className="opacity-80 text-[12px]">{downloadNotification}</p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">Reports Cabinet</h2>
        <p className="opacity-60 text-sm">Download exported data files or construct target pipeline schemas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Export Pipeline Builder Column Form */}
        <div className="glass-panel p-6 rounded-[16px] h-fit">
          <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium mb-3">Report Pipeline Builder</h3>
          <p className="text-xs opacity-60 mb-6">Configure criteria definitions to trigger dynamic rendering output.</p>

          <form onSubmit={handleGenerateReport} className="space-y-4">
            <div>
              <label className="block text-xs opacity-60 mb-1">Report Name</label>
              <input 
                type="text" 
                required 
                value={newReportName}
                onChange={(e) => setNewReportName(e.target.value)}
                placeholder="e.g. Q2 Performance Overview" 
                className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-blue text-white"
                disabled={isGenerating}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-60 mb-1">Data Model Scope</label>
                <select 
                  value={newReportCategory} 
                  onChange={(e: any) => setNewReportCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#111119] border border-white/10 rounded-lg focus:outline-none focus:border-brand-blue text-white"
                  disabled={isGenerating}
                >
                  <option value="Revenue">Revenue Model</option>
                  <option value="Audience">Audience Demographics</option>
                  <option value="Performance">Performance Speed</option>
                  <option value="Growth">Growth Traction</option>
                </select>
              </div>
              <div>
                <label className="block text-xs opacity-60 mb-1">Export Target</label>
                <select 
                  value={newReportFormat}
                  onChange={(e: any) => setNewReportFormat(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#111119] border border-white/10 rounded-lg focus:outline-none focus:border-brand-blue text-white"
                  disabled={isGenerating}
                >
                  <option value="PDF">Adobe PDF</option>
                  <option value="CSV">Commas CSV</option>
                  <option value="xlsx">Excel File</option>
                </select>
              </div>
            </div>

            {/* Simulated progress indicator if generating */}
            {isGenerating ? (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 animate-pulse">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-brand-blue flex items-center gap-1.5">
                    <RefreshCw className="animate-spin" size={12} /> Compiling Model...
                  </span>
                  <span>{generationProgress}%</span>
                </div>
                {/* Visual bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full transition-all duration-300" style={{ width: `${generationProgress}%` }} />
                </div>
              </div>
            ) : (
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus size={14} /> Compile &amp; Export
              </button>
            )}
          </form>
        </div>

        {/* Database List of exported documents */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-[16px] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium">Export File Directory</h3>
              <p className="text-xs opacity-60">Directory database structure of prepared file records</p>
            </div>
            {/* Filter segments */}
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 self-end sm:self-auto">
              {['All', 'Revenue', 'Audience', 'Performance'].map(type => (
                <button 
                  key={type} 
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${filterType === type ? 'bg-white/10 text-white' : 'opacity-60 hover:opacity-100'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-x-auto min-h-[220px]">
            <table className="w-full text-left font-sans border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 opacity-40">
                  <th className="pb-3 font-medium uppercase tracking-[1px] text-[10px]">Title Name</th>
                  <th className="pb-3 font-medium uppercase tracking-[1px] text-[10px] hidden sm:table-cell">Model Category</th>
                  <th className="pb-3 font-medium uppercase tracking-[1px] text-[10px] hidden sm:table-cell">Size</th>
                  <th className="pb-3 font-medium uppercase tracking-[1px] text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3 flex flex-col justify-start">
                      <span className="font-semibold text-white/90 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                        <Layers size={12} className="text-brand-blue opacity-60" /> {report.title}
                      </span>
                      <span className="text-[10px] opacity-40 font-mono mt-0.5">{report.date} • {report.format} Format</span>
                    </td>
                    <td className="py-3 font-medium text-white/75 hidden sm:table-cell">{report.type}</td>
                    <td className="py-3 font-mono opacity-60 hidden sm:table-cell">{report.size}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => handleDownloadReport(report)}
                        className="flex items-center gap-1 text-[10px] font-bold text-brand-emerald hover:text-white bg-brand-emerald/10 hover:bg-brand-emerald px-2 py-1 rounded transition-all cursor-pointer"
                      >
                        <Download size={10} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 opacity-40 italic">
                      No export records found matching category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
