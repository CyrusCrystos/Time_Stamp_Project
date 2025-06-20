console.log("Loaded routes.ts");

import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Environmental Impact Models (can be moved to DB/config)
const impactModels = {
  chatgpt: { baseWater: 0.1, baseElectricity: 0.008, complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.5 } },
  claude:  { baseWater: 0.09, baseElectricity: 0.007, complexityMultiplier: { simple: 0.7, medium: 1.0, complex: 1.4 } },
  gemini:  { baseWater: 0.12, baseElectricity: 0.01,  complexityMultiplier: { simple: 0.9, medium: 1.0, complex: 1.6 } }
};

// Test route
router.get('/test', (req, res) => {
  console.log("Test route hit");
  res.json({ message: 'Test route works!' });
});

// Calculate eco-impact
router.post('/api/calculate-impact', (req, res) => {
  const { platform } = req.body;
  const complexity: "simple" | "medium" | "complex" = req.body.complexity || "medium";
  type PlatformKey = keyof typeof impactModels;
  const safePlatform = (platform in impactModels ? platform : "chatgpt") as PlatformKey;
  const model = impactModels[safePlatform];
  const water = model.baseWater * model.complexityMultiplier[complexity];
  const electricity = model.baseElectricity * model.complexityMultiplier[complexity];
  res.json({ water, electricity });
});

// Cryptographic timestamping
router.post('/api/timestamps', (req, res) => {
  const { hash } = req.body;
  const timestamp = new Date().toISOString();
  // Simulate digital signature (replace with real key/signature in production)
  const signature = crypto
    .createHmac('sha256', process.env.TSA_SECRET || 'secret')
    .update(hash + timestamp)
    .digest('hex');
  res.json({ timestamp, signature });
});

// (Optional) Example: TypeScript interface for AI queries (not used directly in Express)
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

export default router;
