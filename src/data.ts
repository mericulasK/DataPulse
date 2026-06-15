import { RegionData, Metric, MonthlyData, ProductData } from './types';

export const METRICS: Metric[] = [
  { title: "Total Revenue", value: "2.4M", rawStrValue: "2400000", change: "12%", isPositive: true },
  { title: "Active Users", value: "18.5K", rawStrValue: "18500", change: "8%", isPositive: true },
  { title: "Conversion Rate", value: "3.2%", rawStrValue: "3.2", change: "1.1%", isPositive: false },
  { title: "Avg. Order Value", value: "$147", rawStrValue: "147", change: "5%", isPositive: true }
];

export const REGIONS: RegionData[] = [
  { id: 'na', name: 'North America', value: 35, color: '#3b82f6' }, // blue
  { id: 'eu', name: 'Europe', value: 28, color: '#10b981' }, // emerald
  { id: 'asia', name: 'Asia', value: 22, color: '#f59e0b' }, // amber
  { id: 'latam', name: 'LATAM', value: 10, color: '#8b5cf6' }, // violet
  { id: 'other', name: 'Other', value: 5, color: '#64748b' }, // slate
];

export const MONTHLY_DATA: MonthlyData[] = [
  { month: 'Jan', revenue: 120, target: 110 },
  { month: 'Feb', revenue: 135, target: 120 },
  { month: 'Mar', revenue: 145, target: 130 },
  { month: 'Apr', revenue: 140, target: 140 },
  { month: 'May', revenue: 160, target: 150 },
  { month: 'Jun', revenue: 180, target: 160 },
  { month: 'Jul', revenue: 200, target: 170 },
  { month: 'Aug', revenue: 210, target: 180 },
  { month: 'Sep', revenue: 195, target: 190 },
  { month: 'Oct', revenue: 220, target: 200 },
  { month: 'Nov', revenue: 240, target: 210 },
  { month: 'Dec', revenue: 260, target: 220 },
];

export const PRODUCTS: ProductData[] = [
  { id: 'p1', name: 'Quantum Engine', value: 85, regionId: 'na' },
  { id: 'p2', name: 'Nebula Drive', value: 72, regionId: 'eu' },
  { id: 'p3', name: 'Pulse Interface', value: 65, regionId: 'na' },
  { id: 'p4', name: 'Vortex Controller', value: 50, regionId: 'asia' },
  { id: 'p5', name: 'Echo Module', value: 45, regionId: 'latam' },
  { id: 'p6', name: 'Nexus Array', value: 40, regionId: 'asia' },
  { id: 'p7', name: 'Aurora Core', value: 38, regionId: 'eu' },
  { id: 'p8', name: 'Zenith Processor', value: 35, regionId: 'other' },
];

export interface FunnelStep {
  stage: string;
  count: number;
  pct: number;
  color: string;
}

export const FUNNEL_DATA: FunnelStep[] = [
  { stage: 'Awareness (Sessions)', count: 185000, pct: 100, color: '#3b82f6' },
  { stage: 'Interest (Product Views)', count: 118400, pct: 64, color: '#10b981' },
  { stage: 'Consideration (Add to Cart)', count: 53650, pct: 29, color: '#f59e0b' },
  { stage: 'Intent (Checkout Initiated)', count: 25900, pct: 14, color: '#8b5cf6' },
  { stage: 'Conversion (Purchase)', count: 5920, pct: 3.2, color: '#ef4444' },
];

export interface PerformanceNode {
  time: string;
  loadTime: number;
  errorRate: number;
}

export const PERFORMANCE_HOURLY: PerformanceNode[] = [
  { time: '00:00', loadTime: 1.1, errorRate: 0.01 },
  { time: '04:00', loadTime: 0.9, errorRate: 0.00 },
  { time: '08:00', loadTime: 1.4, errorRate: 0.05 },
  { time: '12:00', loadTime: 1.6, errorRate: 0.08 },
  { time: '16:00', loadTime: 1.5, errorRate: 0.03 },
  { time: '20:00', loadTime: 1.2, errorRate: 0.02 },
];

export interface DemographicData {
  category: string;
  value: number;
  color: string;
}

export const DEMOGRAPHICS_AGE: DemographicData[] = [
  { category: '18-24 years', value: 25, color: '#3b82f6' },
  { category: '25-34 years', value: 45, color: '#10b981' },
  { category: '35-44 years', value: 20, color: '#f59e0b' },
  { category: '45+ years', value: 10, color: '#8b5cf6' },
];

export const DEMOGRAPHICS_DEVICE: DemographicData[] = [
  { category: 'Mobile App', value: 48, color: '#3b82f6' },
  { category: 'Desktop Browser', value: 44, color: '#10b981' },
  { category: 'Tablet / Other', value: 8, color: '#f59e0b' },
];

export interface CountryShare {
  name: string;
  code: string;
  share: number;
  color: string;
}

export const COUNTRY_DISTRIBUTION: CountryShare[] = [
  { name: 'United States', code: 'US', share: 42, color: '#3b82f6' },
  { name: 'Germany', code: 'DE', share: 18, color: '#10b981' },
  { name: 'United Kingdom', code: 'UK', share: 12, color: '#f59e0b' },
  { name: 'Japan', code: 'JP', share: 10, color: '#8b5cf6' },
  { name: 'Canada', code: 'CA', share: 8, color: '#ef4444' },
  { name: 'Others', code: 'OT', share: 10, color: '#64748b' },
];

export interface SavedReport {
  id: string;
  title: string;
  type: 'Revenue' | 'Audience' | 'Performance' | 'Growth';
  status: 'Ready' | 'Generating' | 'Failed';
  format: 'PDF' | 'CSV' | 'xlsx';
  size: string;
  date: string;
}

export const SAVED_REPORTS: SavedReport[] = [
  { id: 'rep-01', title: 'Q2 2024 Revenue & Conversions Audit', type: 'Revenue', status: 'Ready', format: 'PDF', size: '3.4 MB', date: '2026-06-12' },
  { id: 'rep-02', title: 'Global Device Platform Demographics', type: 'Audience', status: 'Ready', format: 'CSV', size: '142 KB', date: '2026-06-10' },
  { id: 'rep-03', title: 'Network Load & Performance Diagnostics', type: 'Performance', status: 'Ready', format: 'xlsx', size: '1.2 MB', date: '2026-06-08' },
];

export interface SeoKeyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  clickRate: number;
  monthlyTrend: number[];
  searchIntent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';
  competitors: { url: string; rank: number; relevance: number }[];
}

export const SEO_KEYWORDS: SeoKeyword[] = [
  {
    keyword: 'analytics platform for cloud developers',
    searchVolume: 18500,
    difficulty: 74,
    cpc: 8.45,
    clickRate: 64,
    monthlyTrend: [12000, 14500, 15000, 16200, 17800, 18500],
    searchIntent: 'Commercial',
    competitors: [
      { url: 'https://datapulse.dev/cloud-analytics', rank: 1, relevance: 98 },
      { url: 'https://clouddevs.io/best-analytics-suites', rank: 2, relevance: 88 },
      { url: 'https://platformops.net/observability-frameworks', rank: 3, relevance: 75 },
    ]
  },
  {
    keyword: 'realtime dashboard with svg charting',
    searchVolume: 4200,
    difficulty: 48,
    cpc: 4.20,
    clickRate: 78,
    monthlyTrend: [3100, 3400, 3600, 3900, 4000, 4200],
    searchIntent: 'Transactional',
    competitors: [
      { url: 'https://datapulse.dev/dashboard/vectors', rank: 1, relevance: 100 },
      { url: 'https://frontendmasters-guide.org/vector-charts', rank: 4, relevance: 70 },
      { url: 'https://svg-weekly-digest.com/react-charting', rank: 5, relevance: 68 },
    ]
  },
  {
    keyword: 'how to build high performance widgets',
    searchVolume: 9600,
    difficulty: 28,
    cpc: 1.15,
    clickRate: 85,
    monthlyTrend: [8000, 8400, 8800, 9100, 9400, 9600],
    searchIntent: 'Informational',
    competitors: [
      { url: 'https://dev.to/performance-optimized-custom-components', rank: 2, relevance: 95 },
      { url: 'https://datapulse.dev/blog/ultra-lightweight-ui-components', rank: 3, relevance: 92 },
      { url: 'https://javascript-insights.com/dom-minimization', rank: 6, relevance: 54 },
    ]
  },
  {
    keyword: 'professional dark theme components tailwind',
    searchVolume: 12400,
    difficulty: 56,
    cpc: 3.80,
    clickRate: 72,
    monthlyTrend: [10000, 11000, 11500, 12000, 12200, 12400],
    searchIntent: 'Commercial',
    competitors: [
      { url: 'https://tailwindui.com/dark-theme-layouts', rank: 1, relevance: 90 },
      { url: 'https://datapulse.dev/components/premium-dark-theme', rank: 2, relevance: 99 },
      { url: 'https://shadcn.dev/dark-presets', rank: 3, relevance: 85 },
    ]
  },
  {
    keyword: 'react interactive vector maps visualizer',
    searchVolume: 2800,
    difficulty: 32,
    cpc: 5.60,
    clickRate: 61,
    monthlyTrend: [1800, 2100, 2300, 2400, 2600, 2800],
    searchIntent: 'Transactional',
    competitors: [
      { url: 'https://datapulse.dev/interactive-maps-module', rank: 1, relevance: 100 },
      { url: 'https://reactmappinginsights.net/coordinates-svg', rank: 2, relevance: 82 },
    ]
  },
  {
    keyword: 'best conversion funnel tracking tools 2026',
    searchVolume: 6500,
    difficulty: 79,
    cpc: 12.80,
    clickRate: 55,
    monthlyTrend: [4500, 5100, 5600, 6000, 6200, 6500],
    searchIntent: 'Commercial',
    competitors: [
      { url: 'https://hotjar.com/funnel-analytics', rank: 1, relevance: 85 },
      { url: 'https://datapulse.dev/conversion-audit', rank: 4, relevance: 94 },
    ]
  }
];

