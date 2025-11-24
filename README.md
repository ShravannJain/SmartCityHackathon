# Smart City Hackathon Platform

A full-stack web application for managing hackathon events, including teams, companies, problem statements, judges, submissions, and analytics.

## Features

- 📊 **Dashboard** - Overview statistics and metrics
- 👥 **Teams Management** - Register and manage participating teams
- 🏢 **Companies** - Corporate sponsors and problem providers
- 🎯 **Problems** - Problem statements from companies
- ⚖️ **Judges** - Judge profiles and expertise
- 📝 **Submissions** - Team solution submissions with scoring
- 📈 **Analytics** - Comprehensive insights and leaderboards

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- TanStack Query (React Query)
- Tailwind CSS + shadcn/ui components
- Recharts for data visualization

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- In-memory storage fallback

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** (or local MongoDB) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ShravannJain/SmartCityHackathon.git
cd SmartCityHackathon
```

### 2. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create a file named `.env` with the following content:

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5001
```

**To get your MongoDB connection string:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't already)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with your database name (e.g., `hackathon`)

Example:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hackathon?retryWrites=true&w=majority
PORT=5001
```

**Important:** Make sure to whitelist your IP address in MongoDB Atlas:
- Go to "Network Access" in MongoDB Atlas
- Click "Add IP Address"
- Either add your current IP or use `0.0.0.0/0` (allow from anywhere - for development only)

## Running the Application

You need to run both the backend and frontend servers.

### Option 1: Run in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```
The backend will run on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
# From the root directory
npx vite --port 5174 --host
```
The frontend will run on `http://localhost:5174`

### Option 2: Windows PowerShell (Background Process)

```powershell
# Start backend in new window
cd backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js"
cd ..

# Start frontend
npx vite --port 5174 --host
```

## Accessing the Application

Once both servers are running:

1. Open your browser and go to: **http://localhost:5174**
2. The backend API is accessible at: **http://localhost:5001/api**

## API Endpoints

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/companies/:companyId/problems` - Get problems by company
- `POST /api/problems` - Create new problem
- `PUT /api/problems/:id` - Update problem
- `DELETE /api/problems/:id` - Delete problem

### Judges
- `GET /api/judges` - Get all judges
- `GET /api/judges/:id` - Get judge by ID
- `POST /api/judges` - Create new judge
- `PUT /api/judges/:id` - Update judge
- `DELETE /api/judges/:id` - Delete judge

### Submissions
- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/:id` - Get submission by ID
- `GET /api/teams/:teamId/submissions` - Get submissions by team
- `GET /api/problems/:problemId/submissions` - Get submissions by problem
- `POST /api/submissions` - Create new submission
- `PUT /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission

### Evaluations
- `GET /api/evaluations` - Get all evaluations
- `GET /api/evaluations/submission/:submissionId` - Get evaluations by submission
- `GET /api/evaluations/judge/:judgeId` - Get evaluations by judge
- `POST /api/evaluations` - Create new evaluation
- `PUT /api/evaluations/:id` - Update evaluation
- `DELETE /api/evaluations/:id` - Delete evaluation

### Statistics
- `GET /api/stats` - Get dashboard statistics

## Troubleshooting

### Backend won't start
- Check if port 5001 is already in use
- Verify your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas

### Frontend won't start
- Check if port 5174 is available
- Try clearing node_modules and reinstalling: `rm -rf node_modules && npm install`

### Database connection fails
- Verify your MongoDB URI in the `.env` file
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure your database user has proper read/write permissions

### CORS errors
- The backend already has CORS enabled for all origins
- Make sure both servers are running

## Project Structure

```
SmartCityHackathon/
├── backend/
│   ├── server.js           # Express server
│   ├── storage.js          # MongoDB storage implementation
│   ├── mem-storage.js      # In-memory fallback storage
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app component
│   ├── public/
│   └── package.json
├── shared/
│   └── schema.ts          # Shared TypeScript types
├── vite.config.ts         # Vite configuration
└── package.json           # Root package.json
```

## Development Notes

- The application uses a **MongoDB database** for data persistence
- If MongoDB is unavailable, it automatically falls back to **in-memory storage**
- All pages feature **animated UI** with gradient effects and smooth transitions
- **Real-time updates** using React Query with automatic refetching

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Hacking! 🚀**
