# Streaming Chat Application

A full-stack streaming chat application built with React, TypeScript, Material UI, Redux Toolkit, FastAPI, SQLAlchemy, and PostgreSQL.

## Tech Stack

### Frontend
- **React** with **TypeScript**
- **Material UI** for component library
- **Redux Toolkit** for state management
- **Axios** for API calls

### Backend
- **Python** with **FastAPI**
- **SQLAlchemy** as ORM
- **PostgreSQL** database
- **Pydantic** for data validation

### Infrastructure
- **Docker** for PostgreSQL database
- **Docker Compose** for orchestration

## Project Structure

```
streaming-chat/
├── backend/                 # Python FastAPI backend
│   ├── api/                # API routes and logic
│   │   ├── __init__.py
│   │   ├── crud.py         # CRUD operations
│   │   ├── routes.py       # FastAPI routes
│   │   └── schemas.py      # Pydantic schemas
│   ├── database/           # Database configuration
│   │   ├── __init__.py
│   │   ├── database.py     # SQLAlchemy setup
│   │   └── models.py       # Database models
│   ├── .env               # Environment variables
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── frontend/               # React TypeScript frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ItemManager.tsx
│   │   ├── services/      # API services
│   │   │   └── api.ts
│   │   ├── store/         # Redux store
│   │   │   ├── hooks.ts
│   │   │   ├── index.ts
│   │   │   └── itemSlice.ts
│   │   ├── types/         # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml     # PostgreSQL container
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Docker** and **Docker Compose**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd streaming-chat
```

### 2. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:
- Database: `streaming_chat`
- Username: `postgres`
- Password: `password`
- Port: `5432`

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Start the FastAPI development server:

```bash
python main.py
```

The backend API will be available at:
- **API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will be available at: http://localhost:3000

## Features

### Current Implementation (Boilerplate)

- ✅ **Generic CRUD API**: Complete REST API for managing generic items
- ✅ **React Frontend**: Modern UI with Material Design components
- ✅ **Redux State Management**: Centralized state with Redux Toolkit
- ✅ **TypeScript Support**: Full type safety across the application
- ✅ **Database Integration**: PostgreSQL with SQLAlchemy ORM
- ✅ **Docker Support**: Containerized database setup

### API Endpoints

The backend provides the following REST endpoints:

- `GET /api/v1/items` - List all items (with pagination)
- `GET /api/v1/items/{id}` - Get specific item
- `POST /api/v1/items` - Create new item
- `PUT /api/v1/items/{id}` - Update existing item
- `DELETE /api/v1/items/{id}` - Delete item

### Frontend Features

- **Item Management**: Create, read, update, and delete items
- **Material UI**: Modern, responsive design
- **Redux Integration**: Centralized state management
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client-side validation

## Development

### Backend Development

- **Automatic Reload**: The FastAPI server automatically reloads on code changes
- **API Documentation**: Interactive API docs available at `/docs`
- **Database Migrations**: Use Alembic for database schema changes

### Frontend Development

- **Hot Reload**: React development server with hot module replacement
- **TypeScript**: Full type checking and IntelliSense
- **Material UI**: Comprehensive component library
- **Redux DevTools**: Debug state changes in browser

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/streaming_chat
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=streaming_chat
```

## Testing the Application

1. **Start the database**: `docker-compose up -d`
2. **Start the backend**: `cd backend && python main.py`
3. **Start the frontend**: `cd frontend && npm start`
4. **Open browser**: Navigate to http://localhost:3000
5. **Test CRUD operations**: Use the Item Manager interface

## Next Steps

This boilerplate provides a solid foundation for building a streaming chat application. To extend it into a full chat application, you would typically add:

- **WebSocket support** for real-time messaging
- **User authentication** and session management
- **Chat room/channel** functionality
- **Message history** and persistence
- **File upload** capabilities
- **Real-time notifications**

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure Docker is running: `docker ps`
   - Check if PostgreSQL container is up: `docker-compose ps`
   - Restart containers: `docker-compose down && docker-compose up -d`

2. **CORS Issues**
   - Backend is configured to allow requests from `http://localhost:3000`
   - If using different ports, update CORS settings in `backend/main.py`

3. **Module Not Found Errors**
   - Backend: Ensure you're in the backend directory and have installed requirements
   - Frontend: Run `npm install` in the frontend directory

4. **TypeScript Errors**
   - Run `npm run build` to check for compilation errors
   - Ensure all types are properly imported

## License

This project is licensed under the MIT License.
