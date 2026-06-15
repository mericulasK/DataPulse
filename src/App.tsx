import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, Users, PieChart, Activity, Settings, Search, Menu, Sun, Moon, Bell } from 'lucide-react';
import { METRICS, REGIONS, MONTHLY_DATA, PRODUCTS } from './data';
import { AnimatedNumber } from './components/AnimatedNumber';
import { LineChart } from './components/LineChart';
import { DonutChart } from './components/DonutChart';
import { BarChart } from './components/BarChart';
import { AnalyticsView } from './components/AnalyticsView';
import { AudienceView } from './components/AudienceView';
import { ReportsView } from './components/ReportsView';
import { SeoSearchView } from './components/SeoSearchView';
import { AskDataPulse } from './components/AskDataPulse';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'analytics' | 'audience' | 'reports' | 'seo'>('dashboard');
  const [timeRange, setTimeRange] = useState<'3M' | '6M' | '1Y'>('1Y');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Filter products based on selected region
  const filteredProducts = useMemo(() => {
    if (!selectedRegion) return PRODUCTS.slice(0, 5); // top 5 overall default
    const filtered = PRODUCTS.filter(p => p.regionId === selectedRegion);
    return filtered.length > 0 ? filtered : PRODUCTS.slice(0, 5); // Fallback if no matching products
  }, [selectedRegion]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full transition-all duration-300 z-40 glass-panel border-y-0 border-l-0 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-emerald">DataPulse</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'analytics', icon: Activity, label: 'Analytics' },
            { id: 'audience', icon: Users, label: 'Audience' },
            { id: 'reports', icon: PieChart, label: 'Reports' },
            { id: 'seo', icon: Search, label: 'SEO Search' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 p-3 mb-1 rounded-lg transition-all duration-200 group ${isActive ? 'bg-brand-blue/15 text-brand-blue' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
              >
                <item.icon size={20} className={isActive ? 'text-brand-blue' : ''} />
                {sidebarOpen && <span className="font-medium text-[14px]">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 opacity-70 hover:opacity-100 transition-colors">
            <Settings size={22} className="text-white/60" />
            {sidebarOpen && <span className="font-medium text-[14px] text-white/60">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 min-h-screen flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Topbar */}
        <header className="h-20 glass-panel border-t-0 border-x-0 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 hidden sm:flex">
             <AskDataPulse onNavigate={(section) => setActiveSection(section)} />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-emerald rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-emerald p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-background-dark flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Panel Switcher */}
        <div className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto space-y-6">
          
          {activeSection === 'dashboard' && (
            <>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                 <div>
                   <h2 className="text-3xl font-bold tracking-tight mb-1">Overview</h2>
                   <p className="opacity-60 text-sm">Welcome back, here's what's happening today.</p>
                 </div>
                 <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                   {['3M', '6M', '1Y'].map(range => (
                     <button 
                       key={range}
                       onClick={() => setTimeRange(range as any)}
                       className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeRange === range ? 'bg-white/10 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                     >
                       {range}
                     </button>
                   ))}
                 </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {METRICS.map((metric, idx) => (
                  <div key={idx} className="glass-panel px-4 py-4 rounded-[16px] relative overflow-hidden group h-[100px] flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 mb-1 font-medium">{metric.title}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[24px] font-bold">
                        <AnimatedNumber valueStr={metric.value} rawValue={metric.rawStrValue} />
                      </span>
                    </div>
                    <div className={`flex items-center gap-1 text-[12px] font-medium mt-1 ${metric.isPositive ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                      <span>{metric.isPositive ? '▲' : '▼'}</span>
                      <span>{metric.change} vs LW</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Line Chart */}
                <div className="lg:col-span-2 glass-panel p-[16px] rounded-[16px] flex flex-col h-[400px]">
                  <div className="flex items-center justify-between mb-[15px]">
                    <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 m-0 font-medium">Revenue vs Target</h3>
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-brand-blue opacity-80"></span>Revenue</div>
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-brand-emerald opacity-80 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)] text-brand-emerald fill-transparent"></span>Target</div>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    <LineChart data={MONTHLY_DATA} timeRange={timeRange} />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  
                  {/* Donut Chart */}
                  <div className="glass-panel p-[16px] rounded-[16px] h-[280px] flex flex-col">
                     <div className="flex items-center justify-between mb-2">
                       <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 m-0 font-medium">Sales by Region</h3>
                     </div>
                     <div className="text-[11px] opacity-50 mb-4">Click to filter products</div>
                     <div className="flex-1 w-full min-h-0 relative">
                       <DonutChart data={REGIONS} selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
                     </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="glass-panel p-[16px] rounded-[16px] flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 m-0 font-medium">Top Products</h3>
                       {selectedRegion && <button onClick={() => setSelectedRegion(null)} className="text-[11px] text-brand-blue hover:underline">Clear</button>}
                     </div>
                     <div className="flex-1 w-full min-h-0">
                       <BarChart data={filteredProducts} />
                     </div>
                  </div>

                </div>
              </div>
            </>
          )}

          {activeSection === 'analytics' && <AnalyticsView />}

          {activeSection === 'audience' && <AudienceView />}

          {activeSection === 'reports' && <ReportsView />}

          {activeSection === 'seo' && <SeoSearchView />}

        </div>
      </main>
    </div>
  );
}

