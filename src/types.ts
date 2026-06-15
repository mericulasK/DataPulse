export interface RegionData {
  id: string;
  name: string;
  value: number;
  color: string;
}

export interface Metric {
  title: string;
  value: string;
  rawStrValue: string;
  change: string;
  isPositive: boolean;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  target: number;
}

export interface ProductData {
  id: string;
  name: string;
  value: number;
  regionId: string | null;
}
