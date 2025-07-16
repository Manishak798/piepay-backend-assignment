# PiePay Backend Assignment

This project is a backend service that detects and stores Flipkart payment offers and calculates the highest applicable discount for a user based on their payment method.

---

## 1. 🔧 Project Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (running locally or on cloud)
- Thunder Client / Postman (for API testing)

### Installation Steps

```bash
git clone https://github.com/your-username/piepay-backend.git
cd piepay-backend
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
npm start
```

## 2. ✅ Assumptions Made
- The Flipkart offer API response is sent to our backend in the format:
{"flipkartOfferApiResponse": { ... }}

- Each offer has a unique id used to avoid duplicates.

- Offers contain: title, bankName, discountAmount, and paymentInstruments (like CREDIT, EMI_OPTIONS).

- Flipkart's original API is not accessible, so a realistic mock JSON was used for testing and demonstration.

## 3. 🧠 Design Choices
- Frameworks & Tools
  
Express.js: Lightweight, fast, and ideal for RESTful API development.

MongoDB with Mongoose: Flexible schema, fast inserts, and perfect for evolving offer structures.

- Folder Structure
Followed MVC pattern for clean separation of concerns: routes, controllers, models.

- Database Schema
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

