# Crypto Tracker - MERN Stack Application

A full-stack cryptocurrency tracker built with MongoDB, Express.js, React.js, and Node.js.

### Frontend URL
```
https://crypto-tracker-one-wheat.vercel.app
```

### Backend URL
```
https://crypto-tracker-production-0683.up.railway.app
```

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Real-time Dashboard**: Display top 10 cryptocurrencies from CoinGecko
- **Auto-refresh**: Updates every 30 minutes automatically
- **Search & Filter**: Search cryptocurrencies by name or symbol
- **Sorting**: Sort by price, market cap, 24h change
- **Historical Charts**: 7-day price charts using Chart.js
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile

### Backend (Node.js + Express.js)
- **RESTful API**: Clean API endpoints for all operations
- **JWT Authentication**: Secure authentication with HttpOnly cookies
- **Protected Routes**: Middleware to protect sensitive endpoints
- **Cron Jobs**: Automated data fetching every hour
- **Error Handling**: Comprehensive error handling and logging

### Database (MongoDB + Mongoose)
- **User Management**: Secure user registration and authentication
- **Current Data**: Real-time cryptocurrency data storage
- **Historical Data**: Time-series data for price tracking
- **Efficient Indexing**: Optimized queries for performance

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Chart.js, Axios, React Router
- **Backend**: Node.js, Express.js, JWT, bcryptjs, node-cron
- **Database**: MongoDB, Mongoose
- **API**: CoinGecko API for cryptocurrency data

## 📁 Project Structure

```
/client (React app)
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React Context providers
│   ├── services/      # API service functions
│   └── App.jsx        # Main app component
└── package.json

/server (Express app)
├── routes/            # API route definitions
├── controllers/       # Route handlers
├── models/           # Mongoose schemas
├── middleware/       # Custom middleware
├── cron/            # Scheduled tasks
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crypto-tracker
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=http://localhost:5173
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Database Setup

1. **MongoDB Local Setup**
   - Install MongoDB locally
   - Start MongoDB service
   - Database will be created automatically

2. **MongoDB Atlas Setup** (Recommended for production)
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get connection string and update `MONGODB_URI` in `.env`

## 🔄 Cron Job Explanation

The application uses `node-cron` to automatically fetch cryptocurrency data:

- **Schedule**: Runs every hour (`0 * * * *`)
- **Process**:
  1. Fetches top 10 cryptocurrencies from CoinGecko API
  2. Saves current data to `CurrentData` collection (overwrites existing)
  3. Appends historical data to `HistoryData` collection
  4. Logs success/failure for monitoring

**Cron Job Code Location**: `server/cron/coinFetcher.js`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Cryptocurrency Data
- `GET /api/coins` - Get top 10 cryptocurrencies
- `POST /api/history` - Save current data to history
- `GET /api/history/:coinId` - Get historical data for a coin

### Health Check
- `GET /api/health` - Server health status

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend Deployment (Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy with automatic builds

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access
3. Update connection string in environment variables

## 📸 Screenshots

### Sample MongoDB Data
```json
// CurrentData Collection
{
  "_id": "...",
  "coinId": "bitcoin",
  "name": "Bitcoin",
  "symbol": "btc",
  "price": 43250.50,
  "marketCap": 847392847392,
  "change24h": 2.45,
  "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}

// HistoryData Collection
{
  "_id": "...",
  "coinId": "bitcoin",
  "name": "Bitcoin",
  "symbol": "btc",
  "price": 43250.50,
  "marketCap": 847392847392,
  "change24h": 2.45,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Cron Job Logs
```bash
2024-01-15T10:00:00.000Z - Running scheduled coin data fetch...
2024-01-15T10:00:02.000Z - Fetched 10 coins from CoinGecko
2024-01-15T10:00:03.000Z - Saved to history collection
2024-01-15T10:00:04.000Z - Updated current data collection
```

## 🔧 Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```
