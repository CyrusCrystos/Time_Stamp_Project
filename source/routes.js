import express from "express";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import { IMPACT_MODELS, COMPLEXITY_LEVELS } from "./config.js"; // Note .js extension

const router = express.Router();

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
router.use('/api/', apiLimiter);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ status: 'active', message: 'API operational' });
});

// Eco-impact calculation endpoint with validation
router.post(
  '/api/calculate-impact',
  [
    body('platform').isIn(Object.keys(IMPACT_MODELS)),
    body('complexity').optional().isIn(COMPLEXITY_LEVELS)
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { platform, complexity = 'medium' } = req.body;
    const model = IMPACT_MODELS[platform];
    const multiplier = model.complexityMultiplier[complexity];
    const water = parseFloat((model.baseWater * multiplier).toFixed(4));
    const electricity = parseFloat((model.baseElectricity * multiplier).toFixed(5));

    res.json({ water, electricity, units: { water: 'L', electricity: 'kWh' } });
  }
);

// Timestamp endpoint
router.post('/api/timestamps', (req, res) => {
  const { hash } = req.body;
  if (!hash || typeof hash !== 'string') {
    return res.status(400).json({ error: 'Invalid content hash' });

  } if (!process.env.TSA_SECRET) {
  throw new Error('TSA_SECRET environment variable not configured');
}

   router.post('/api/timestamps', (req, res) => {
  const { hash } = req.body;
  if (!hash || typeof hash !== 'string') {
    return res.status(400).json({ error: 'Invalid content hash' });
  }
  if (!process.env.TSA_SECRET) {
    return res.status(500).json({ error: 'TSA_SECRET environment variable not configured' });
  }
  const timestamp = new Date().toISOString();
  const signer = crypto.createHmac('sha256', process.env.TSA_SECRET);
  signer.update(`${hash}|${timestamp}`);
  const signature = signer.digest('hex');
  res.json({
    timestamp,
    signature,
    algorithm: 'HMAC-SHA256'
  });
});
import express from 'express';
const router = express.Router();

// GET /something
router.get('/something', (req, res) => {
  // Example condition
  if (req.query.secret === process.env.TSA_SECRET) {
    res.send('ok');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// POST /api/timestamps
router.post('/api/timestamps', (req, res) => {
  // Your logic here
  res.send('Timestamp received');
});

export default router;
