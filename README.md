# PiePay Backend Assignment

This project is a backend service that detects and stores Flipkart payment offers and calculates the highest applicable discount for a user based on their payment method.

<img width="500" height="400" alt="Screenshot 2025-07-16 215021" src="https://github.com/user-attachments/assets/4337eba4-2930-4586-a083-2626c6da773b" />

<img width="500" height="400" alt="Screenshot 2025-07-16 214958" src="https://github.com/user-attachments/assets/e83c6ddc-3a60-4572-97eb-4868e72eaac0" />

<img width="500" height="400" alt="Screenshot 2025-07-16 214916" src="https://github.com/user-attachments/assets/611bc12c-5eb0-4583-8798-0e34c8161895" />

---

## 1. 🔧 Project Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (running locally or on cloud)
- Thunder Client / Postman (for API testing)

### Installation Steps

```bash
git clone https://github.com/Manishak798/piepay-backend-assignment.git
npm install
```

### Setup Environment Variables
Create a .env file in the root directory and add the following:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/piepay
```

### Run the Server
```bash
# for production
npm run dev
```

## 2. ✅ Assumptions Made
- The Flipkart offer API response is sent to our backend in the format:
{"flipkartOfferApiResponse": { ... }}

- Each offer has a unique id used to avoid duplicates.

- Offers contain: title, bankName, discountAmount, and paymentInstruments (like CREDIT, EMI_OPTIONS).

- Flipkart's original API is not accessible, so a realistic mock JSON was used for testing and demonstration.

## 3. 🧠 Design Choices
🧰 Frameworks & Tools
- **TypeScript:** Enables static typing, improved developer experience, and early error detection. Enforces robust, maintainable code throughout the backend.

- **Express.js:** Minimal and performant Node.js framework used to build scalable, RESTful APIs with middleware flexibility and routing control.

- **MongoDB + Mongoose:** NoSQL database with Mongoose ODM for schema definition, validation, and fast, dynamic document handling—ideal for evolving offer data models.

🗂️ Project Structure

- **Modular MVC with TypeScript**: Organized codebase following the MVC pattern with strict TypeScript typing for routes, controllers, models, and reusable interfaces. This structure ensures clarity, reusability, and ease of scaling.

🛢️ Database Schema
```
Each Offer stores:

offerId (unique key)

title, bank, discountAmount

paymentInstruments (array of strings)
```

This schema supports fast lookups by bank and paymentInstrument, and prevents duplicates using offerId.

## 4. ⚙️ Scaling /highest-discount to 1,000 RPS
To scale the GET endpoint effectively:

🔍 Add MongoDB Indexes on bank and paymentInstruments fields for faster filtering.

🧠 Use Redis caching for high-frequency queries like
bank=AXIS&paymentInstrument=CREDIT to reduce DB load.

📦 Implement horizontal scaling with Node.js clustering or Kubernetes pods behind a load balancer.

📊 Add rate limiting and use an API gateway to protect the backend from abuse.

📉 Integrate monitoring tools like Sentry, Prometheus, or Datadog to track latency (e.g., p95), errors, and performance.

## 5. 🚀 Improvements If I Had More Time
- Add comprehensive unit & integration tests using Jest + Supertest

- Implement auto-refresh mechanism to periodically pull offers from Flipkart (e.g., cron job or scheduler)

- Build a simple admin dashboard for managing and viewing offers

- Add JWT-based authentication and RBAC to protect endpoints

- Dockerize the entire setup and configure CI/CD for smoother deployment

# 📘 API Documentation – PiePay Backend

This document outlines the available API endpoints, request formats, parameters, and expected responses for the PiePay backend assignment.

---

## 🔗 Base URL

``` http://localhost:3000/api ```


All routes below are prefixed with `/api`.

---

## 📩 POST /offer

### ➕ Purpose:
Receives Flipkart offer API response and stores parsed offers in the database.

### 🔧 Request Format

**Endpoint:**

- POST /api/offer
  
**Headers:**

Content-Type: application/json

**Body (Example):**
```json
{
  "flipkartOfferApiResponse": {
    "data": {
      "sections": [
        {
          "offers": [
            {
              "id": "OFFER123",
              "title": "10% off on AXIS Bank Credit Cards",
              "bankName": "AXIS",
              "discountAmount": 500,
              "paymentInstruments": ["CREDIT"]
            },
            {
              "id": "OFFER124",
              "title": "Flat ₹750 off on IDFC EMI",
              "bankName": "IDFC",
              "discountAmount": 750,
              "paymentInstruments": ["EMI_OPTIONS"]
            }
          ]
        }
      ]
    }
  }
}
```

**✅ Response (Example)**
```
{
  "noOfOffersIdentified": 2,
  "noOfNewOffersCreated": 2
}
```
**📝 Notes**
- Duplicate offers (based on offerId) are not reinserted.

- Stores bank, title, discountAmount, paymentInstruments.

## 📈 GET /highest-discount
**🔍 Purpose:**
Find the best offer (highest discount) for a given bank and optional payment instrument.

**📎 Endpoint:**
```
GET /api/highest-discount
```
**🔐 Query Parameters:**
| Parameter           | Type   | Required | Description                                                    |
| ------------------- | ------ | -------- | -------------------------------------------------------------- |
| `amountToPay`       | number | ✅        | Final amount user needs to pay                                 |
| `bankName`          | string | ✅        | Bank name (e.g., AXIS, HDFC)                                   |
| `paymentInstrument` | string | ❌        | (Optional) Filter by payment mode (e.g., CREDIT, EMI\_OPTIONS) |

**📤Example Request:**
```
GET /api/highest-discount?amountToPay=10000&bankName=HDFC&paymentInstrument=CREDIT
```
**✅ Example Response: json Copy code**
```
{
  "highestDiscountAmount": 600
}
```

**📝 Notes:**
- If no matching offers are found, highestDiscountAmount is 0.

- Filters by both bankName and optionally paymentInstrument.

## 📃 GET /offers (Optional Utility API)
**🔍 Purpose:**
Fetch all offers stored in the database (for testing/debug/admin purposes).

**Endpoint:**

```bash
GET /api/offers
```
**Example Response:**

```
{
  "offers": [
    {
      "_id": "66a8a86d2...",
      "offerId": "OFFER123",
      "title": "10% off on AXIS Credit Cards",
      "bank": "AXIS",
      "discountAmount": 500,
      "paymentInstruments": ["CREDIT"],
      "createdAt": "2024-07-16T12:00:00.000Z"
    },
    ...
  ]
}
```

## ❤️ Final Note
I truly enjoyed building this assignment and exploring PiePay's problem space. The idea of unlocking better payment experiences through backend intelligence excites me, and I'd love to contribute to building a robust, scalable, and user-centric infrastructure at PiePay.

## Manisha kundnani
