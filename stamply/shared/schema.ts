export interface AIQuery {
  id: number;
  platform: string;
  content: string;
  contentHash: string;
  waterUsage: number;
  electricityUsage: number;
  timestamp: Date;
  isTimestamped: boolean;
  tsaSignature?: string;
}
