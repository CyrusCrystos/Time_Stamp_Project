
# Environmental Model Documentation

---

## Stamply Environmental Impact Model

### **Overview**

Stamply estimates the environmental impact of each AI query by calculating the approximate water and electricity usage associated with running large language models (LLMs) such as ChatGPT, Claude, and Gemini. These estimates are based on public research, platform disclosures, and are designed to be transparent, reproducible, and easy to update as new data becomes available.

---

### **Calculation Methodology**

#### **1. Models and Parameters**

For each AI platform, we define:

- **Base Water Usage** (liters/query)
- **Base Electricity Usage** (kWh/query)
- **Complexity Multiplier** (adjusts for simple, medium, or complex queries)

These values are stored in both the backend and extension for consistency.

#### **2. Example Model Table**

| Platform | Base Water (L/query) | Base Electricity (kWh/query) | Complexity Multipliers (simple / medium / complex) |
| -------- | -------------------- | ---------------------------- | -------------------------------------------------- |
| ChatGPT  | 0.10                 | 0.008                        | 0.8 / 1.0 / 1.5                                    |
| Claude   | 0.09                 | 0.007                        | 0.7 / 1.0 / 1.4                                    |
| Gemini   | 0.12                 | 0.010                        | 0.9 / 1.0 / 1.6                                    |

#### **3. Calculation Formula**

For each query:

impact = base_value * complexity_multiplier

Water Usage (L)      = Base Water × Complexity Multiplier
Electricity Usage (kWh) = Base Electricity × Complexity Multiplier

```python
# Example calculation
impact = base_value * complexity_multiplier
```

- **Complexity** is set to "medium" by default, but can be adjusted if the UI or API supports it.

#### **4. Example Calculation**

For a "medium" ChatGPT query:

- Water: 0.10 × 1.0 = **0.10 L**
- Electricity: 0.008 × 1.0 = **0.008 kWh**

For a "complex" Gemini query:

- Water: 0.12 × 1.6 = **0.192 L**
- Electricity: 0.01 × 1.6 = **0.016 kWh**

---

### **Sources**

- [Google AI Sustainability Report](https://storage.googleapis.com/gweb-uniblog-publish-prod/documents/AI_Sustainability_Report.pdf)
- [OpenAI Blog: Environmental Impact](https://openai.com/blog/ai-and-environment)
- [Academic studies on LLM energy/water usage](https://arxiv.org/abs/2104.10350)
- [Public platform disclosures and estimates](https://www.technologyreview.com/2023/04/13/1071272/chatgpt-water-use/)

*Note: These values are estimates and may be refined as more data becomes available.*

---

### **Updating the Model**

- **To update values:**  
  Edit the `impactModels` object in both `backend/routes.ts` and `extension/content.js`.
- **To add new platforms:**  
  Add a new entry to the model table and update both backend and extension.

---

### **Transparency and Reproducibility**

- All calculations are performed client-side (for display) and server-side (for API responses).
- Users can view the model and methodology in this document and in the extension dashboard.
- Source links and references are provided for further reading.

---

### **Contact & Feedback**

If you have suggestions, updated data, or corrections, please open an issue or pull request on our [GitHub repository](https://github.com/your-repo/stamply).

---

**This model is designed to make environmental impact tracking for AI accessible, transparent, and actionable for everyone.**
