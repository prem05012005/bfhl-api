// BFHL API - Express server
// Route: POST /bfhl
// Expected 200 for successful requests. Returns categorized arrays and computed fields.
// NOTE: Update the constants below with YOUR details before deploying.

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ====== CHANGE THESE VALUES ======
const FULL_NAME = "premkumar_vusthulamuri";        // full name in lowercase with underscores
const DOB_DDMMYYYY = "05012005";                   // <-- change to your DOB as ddmmyyyy
const EMAIL = "prem.kumar2022@vitstudent.ac.in";       // <-- change to your email
const ROLL_NUMBER = "22BCT0067";                  // <-- change if needed
// =================================

function isNumericToken(token) {
  if (typeof token === "number") return Number.isFinite(token) && Number.isInteger(token);
  if (typeof token === "string") return /^-?\d+$/.test(token.trim());
  return false;
}

function isAlphaToken(token) {
  return typeof token === "string" && /^[A-Za-z]+$/.test(token);
}

function toStringToken(token) {
  return typeof token === "string" ? token : String(token);
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body || {};

    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Invalid payload: 'data' must be an array."
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    const letterChars = [];

    for (const item of data) {
      const s = toStringToken(item);

      // Collect each alphabetical character (for concat_string)
      for (const ch of s) {
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) {
          letterChars.push(ch);
        }
      }

      if (isNumericToken(item)) {
        const n = typeof item === "number" ? item : parseInt(s, 10);
        sum += n;
        if (Math.abs(n % 2) === 1) {
          odd_numbers.push(s);   // keep as string
        } else {
          even_numbers.push(s);  // keep as string
        }
      } else if (isAlphaToken(s)) {
        alphabets.push(s.toUpperCase());
      } else {
        special_characters.push(s);
      }
    }

    // Build alternating-caps reversed concatenation of all letter characters
    const reversedLetters = letterChars.reverse();
    const concat_string = reversedLetters
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Internal error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFHL API server running on port ${PORT}`);
});
