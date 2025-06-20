# API Reference

## Base URL

http://localhost:3000/
---

## Endpoints

### 1. Test Endpoint

**GET** `/test`

- **Description:** Check API status.

- **Response:**
  {
    "status": "active",
    "message": "API operational"
  }

---

### 2. Calculate Eco-Impact

**POST** `/api/calculate-impact`

- **Body Parameters:**

  | Name       | Type   | Required | Description                                    |
  |------------|--------|----------|------------------------------------------------|
  | platform   | string | Yes      | AI provider (`chatgpt`, `claude`, `gemini`)    |
  | complexity | string | No       | Task complexity (`simple`, `medium`, `complex`)|

- **Example Request:**
  {
    "platform": "chatgpt",
    "complexity": "complex"
  }

- **Example Response:**
  {
    "water": 0.15,
    "electricity": 0.012,
    "units": {
      "water": "L",
      "electricity": "kWh"
    }
  }

---

### 3. Timestamp Endpoint

**POST** `/api/timestamps`

- **Body Parameters:**

  | Name | Type   | Required | Description         |
  |------|--------|----------|---------------------|
  | hash | string | Yes      | Content hash string |

- **Example Request:**
  {
    "hash": "abc123"
  }

- **Example Response:**
  {
    "timestamp": "2025-06-20T15:51:00.000Z",
    "signature": "abcdef123456...",
    "algorithm": "HMAC-SHA256"
  }

---

## Error Responses

- **400 Bad Request:** Invalid input.
- **500 Internal Server Error:** Server/configuration error.

---

Supported Platforms
-chatgpt

-claude

-gemini

Supported Complexity Levels
-simple

-medium

-complex
