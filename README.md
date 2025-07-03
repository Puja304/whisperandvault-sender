# Whisper and Vault – Encrypted Messaging with AWS
Visit at : https://puja304.github.io/whisperandvault-sender/

**Whisper and Vault** is a secure message delivery platform built to explore client-side encryption and AWS services. It enables users to send password-protected messages via email, with strict limits on access and expiration.

---

## Features

- 🔐 AES-encrypted messages
- 📩 Email delivery via SendGrid
- 🧾 Password-protected access with retry/view limits
- 🧊 Vault: one-time secure message delivery
- 💌 Whisper: casual, time-limited message sharing
- ⏳ Messages auto-expire after a defined time
- 🔁 All encryption done client-side – messages & passwords are never stored

---

## Use Case Comparison

| Feature                  | Whisper                              | Vault                                |
|--------------------------|--------------------------------------|--------------------------------------|
| **Message Expiry**       | 30 days                              | 24 hours                             |
| **Max Views**            | 1–5 or unlimited                     | 1 (only one view allowed)            |
| **Password Attempts**    | 1–5 or unlimited                     | 1–3 (max 3 tries)                    |
| **Use Case**             | Sentimental notes, casual sharing    | High-security, one-time messages     |

---

## How It Works

### 1. **Frontend (React)**
- Users fill a multi-step form:
  - Sender name (optional)
  - Recipient name & email
  - Message content
  - Access limits
  - Password
- AES-CBC encryption is done **in-browser**.
- A random salt and IV are generated.
- Password hash is generated using SHA-256.
- The encrypted message, IV, salt, and hash are sent to the backend.

### 2. **Backend (AWS)**
- **AWS API Gateway** receives message payload.
- **AWS Lambda**:
  - Generates a unique `message_id`
  - Stores the encrypted data in **DynamoDB**
  - Sends a link to the recipient via **SendGrid** (API key from **Secrets Manager**)

### 3. **Message Retrieval**
- Recipient accesses the link and enters the password.
- Lambda function:
  - Compares hash of password + salt
  - Decrypts and returns the message if correct
  - Tracks and deletes on view/attempt limits

---

## Vault Tip: Two-Step Message Strategy

For highly sensitive content:

1. **Step 1** – Use Vault to send a password. Add the password for *this message* in the email note (optional).
2. **Step 2** – Once the recipient accesses it, send the real message with Vault using that password.

---

## Tech Stack

- **Frontend**: React.js, CryptoJS
- **Backend**: AWS Lambda, API Gateway
- **Database**: AWS DynamoDB
- **Secrets Management**: AWS Secrets Manager
- **Email Delivery**: SendGrid API
- **Crypto**:
  - AES-CBC (with PKCS7 padding)
  - PBKDF2 for key derivation
  - SHA-256 for password hashing

---

## Future Improvements (v2)

- 📎 File attachments (zip downloads)

---

## 📄 License

This project is for educational purposes and personal learning. Encryption is implemented securely but may not be production-grade.

---

