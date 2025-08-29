# BFHL API (VIT Full Stack Objective)

REST API that exposes **POST `/bfhl`** and returns:
- `is_success` (boolean)
- `user_id` in the format: `full_name_ddmmyyyy` (full name lowercase, underscores)
- `email`
- `roll_number`
- `odd_numbers` (as strings)
- `even_numbers` (as strings)
- `alphabets` (uppercase, includes multi-letter tokens made purely of A–Z)
- `special_characters` (everything that's not purely numeric or purely alphabetic)
- `sum` of numbers (as a string)
- `concat_string`: Reverse of *all* alphabetical characters found in the input (character-by-character), with **alternating caps starting UPPER**.

### 0) Update your details
Open `server.js` and change these constants:
```js
const FULL_NAME = "premkumar_vusthulamuri"; // full name in lowercase with underscores
const DOB_DDMMYYYY = "05012005";            // ddmmyyyy
const EMAIL = "your_email@vitstudent.ac.in";
const ROLL_NUMBER = "22BCT0067p";
```

### 1) Run locally
```bash
npm install
npm start
# Server on http://localhost:3000
```

Test with curl:
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d "{\"data\":[\"a\",\"1\",\"334\",\"4\",\"R\",\"$\"]}"
```

### 2) Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: BFHL API"
git branch -M main
git remote add origin https://github.com/<your-username>/bfhl-api.git
git push -u origin main
```

### 3) Deploy on Render (recommended)
1. Go to https://render.com → New → **Web Service**.
2. Connect your GitHub repo and pick **bfhl-api**.
3. Set:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Click **Deploy**. When it's live, copy the URL like:
   - `https://your-service.onrender.com/bfhl`
5. Test with curl (replace the base URL):
```bash
curl -X POST https://your-service.onrender.com/bfhl \
  -H "Content-Type: application/json" \
  -d "{\"data\":[\"2\",\"a\",\"y\",\"4\",\"&\",\"-\",\"*\",\"5\",\"92\",\"b\"]}"
```

### 4) Examples (expected shape)

**Request A**
```json
{ "data": ["a","1","334","4","R","$"] }
```
**Response shape**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

> Your actual `user_id`, `email`, and `roll_number` will reflect what you set in `server.js`.

### Notes
- The API always returns numbers **as strings** in arrays and `"sum"`.
- If payload is invalid (e.g., `data` missing or not an array), the API returns `is_success: false` with status `200` (as per spec request style).
- Free hosts may cold-start the service; if the first attempt fails transiently, just retry.
