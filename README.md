# Currency Converter Application  
This is a full-stack Currency Converter application built using **React.js** for the frontend and **Spring Boot** for the backend. It integrates with a public API to provide real-time currency exchange rates and conversion functionality.  

---

## Table of Contents  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
  - [Frontend Setup](#frontend-setup)  
  - [Backend Setup](#backend-setup)  
- [Environment Variables](#environment-variables)  
- [Running the Application](#running-the-application)  
- [API Documentation](#api-documentation)  
- [Demo](#demo)  
- [License](#license)  

---

## Features  
- Real-time currency exchange rates  
- Currency conversion between different currencies  
- Swap currencies feature  
- Minimalistic and responsive user interface  

---

## Tech Stack  
- **Frontend:** React.js (Vite), Axios, Tailwind CSS  
- **Backend:** Spring Boot, RestTemplate, Maven  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---

## Prerequisites  
Make sure you have the following installed on your system:  
- **Node.js** (v18 or later)  
- **Java** (JDK 21 or compatible)  
- **Maven**  
- **Docker** (Optional, for containerization)  

---

## Getting Started  

### Frontend Setup  
1. **Navigate to the frontend directory:**  
```bash
cd currency-convertor-frontend
```
2. **Install dependencies:**
```bash
   npm install
```
3. **Create a .env file in the frontend root directory:**
```env
VITE_APP_API_URL=http://localhost:8080/
```
4. **Start the React development server:**
```bash
npm run dev
```
The frontend should now be running at [http://localhost:5173](http://localhost:5173)

### Backend Setup
1. Navigate to the backend directory:
```bash
cd currency-convertor-backend
```
2. Create a .env file in the backend root directory:
```env
API_BASE_URL=https://api.exchangerate-api.com/v4/latest
FRONTEND_URL=http://localhost:5173
```
3. Build and run the Spring Boot application:
```bash
./mvnw spring-boot:run
```
The backend should now be running at http://localhost:8080.


---


## Environment Variables  
-------------------------

| Variable           | Description                          | Example                                     |
| ------------------ | ------------------------------------ | ------------------------------------------- |
| VITE_APP_API_URL   | API URL for frontend Axios requests   | `http://localhost:8080/currency_convertor`   |
| API_BASE_URL       | Public exchange rates API URL         | `https://api.exchangerate-api.com/v4/latest` |
| FRONTEND_URL       | URL for CORS configuration            | `http://localhost:5173`                      |


## Running the Application

- Frontend: Navigate to currency-convertor-frontend and run:
```bash
npm run dev
```
- Backend: Navigate to currency-convertor-backend and run:
```bash
./mvnw spring-boot:run
```
Open [http://localhost:5173](http://localhost:5173) in your browser to use the application.

---

## API Documentation

1. GET /api/rates
Fetch exchange rates for a given base currency. Default base is USD if not provided.
```
GET /currency_convertor/rates?base=USD
```
Query Parameters:

- base (optional) - Base currency (e.g., USD, EUR, INR)

Responses: 

```json
{
  "base": "USD",
  "rates": {
    "EUR": 0.94,
    "INR": 82.45,
    "GBP": 0.82
  }
}
```
2. POST /api/convert
Convert an amount from one currency to another using the latest exchange rates.
Endpoint:

```bash
POST /currency_convertor/convert
```
Request Body:
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```
Response: 

```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "convertedAmount": 94.5
}
```
---

## Error Handling

- 400 Bad Request: Invalid currency codes or missing fields in the request body.
- 500 Internal Server Error: External API is unavailable or other server-side issues.
  
---

## Demo
Check out the live version of the application:
- Frontend(When you give convert it takes some time to give the output because of the render free tier🫡): [https://currency-convertor-frontend.vercel.app](https://currency-convertor-frontend.vercel.app/)
- Backend(Use Postman to test): [https://currency-convertor-backend-czmu.onrender.com/currency_convertor/convert](https://currency-convertor-backend-czmu.onrender.com/currency_convertor/convert)
  - Method: POST
  - Request Body:
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```

---

## License 
This project is licensed under the MIT License. 


