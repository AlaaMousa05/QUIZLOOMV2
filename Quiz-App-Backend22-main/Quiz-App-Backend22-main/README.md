# Quiz App - Backend API

A comprehensive REST API for a Quiz Application built with Express.js and MongoDB. This backend handles user authentication, quiz management, question banking, and analytics.

## Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Role-based access control (Student & Admin)
- Password reset functionality
- User profile management

### 📚 Content Management
- Category and subcategory management
- Question bank with multiple types
- Quiz creation and customization
- Question difficulty levels
- Answer explanations

### 🎯 Quiz Features
- Create and publish quizzes
- Set quiz duration and passing criteria
- Shuffle questions option
- Show/hide correct answers
- Auto-grading system

### 📊 Analytics & Results
- Submit and track quiz results
- Student performance analytics
- Quiz statistics and reports
- Category-wise performance analysis
- Time tracking for each attempt

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB (local or cloud)

## Installation

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Quiz-App-Backend22-main
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## Project Structure

```
Quiz-App-Backend22-main/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── categoryController.js
│   ├── questionController.js
│   ├── quizController.js
│   ├── resultController.js
│   └── studentController.js
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Question.js
│   ├── Quiz.js
│   ├── Result.js
│   └── SubCategory.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── questionRoutes.js
│   ├── quizRoutes.js
│   ├── resultRoutes.js
│   └── studentRoutes.js
├── middleware/
│   └── auth.js              # JWT authentication
├── utils/
│   ├── constants.js
│   └── responseHelper.js
├── server.js                # Main server file
└── package.json
```

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### SubCategories
- `GET /api/categories/:categoryId/subcategories` - Get subcategories
- `POST /api/categories/:categoryId/subcategories` - Create subcategory (Admin only)
- `PUT /api/categories/subcategories/:id` - Update subcategory (Admin only)
- `DELETE /api/categories/subcategories/:id` - Delete subcategory (Admin only)

### Questions
- `GET /api/questions` - Get all questions
- `POST /api/questions` - Create question (Admin only)
- `GET /api/questions/:id` - Get question by ID
- `PUT /api/questions/:id` - Update question (Admin only)
- `DELETE /api/questions/:id` - Delete question (Admin only)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create quiz (Admin only)
- `GET /api/quizzes/:id` - Get quiz by ID
- `PUT /api/quizzes/:id` - Update quiz (Admin only)
- `DELETE /api/quizzes/:id` - Delete quiz (Admin only)
- `PUT /api/quizzes/:id/publish` - Publish quiz (Admin only)
- `POST /api/quizzes/:id/questions` - Add questions to quiz (Admin only)
- `DELETE /api/quizzes/:id/questions` - Remove question from quiz (Admin only)

### Results
- `POST /api/results` - Submit quiz result
- `GET /api/results/my-results` - Get my quiz results
- `GET /api/results/:id` - Get result by ID
- `GET /api/results/quiz/:quizId/my-result` - Get my result for a quiz
- `GET /api/results/quiz/:quizId/results` - Get all results for a quiz (Admin only)
- `GET /api/results/student/performance` - Get student performance
- `GET /api/results/quiz/:quizId/statistics` - Get quiz statistics (Admin only)

### Students
- `GET /api/students` - Get all students (Admin only)
- `GET /api/students/search` - Search students (Admin only)
- `GET /api/students/profile` - Get student profile
- `GET /api/students/:id` - Get student by ID (Admin only)
- `PUT /api/students/:id/status` - Update student status (Admin only)

## Database Schema

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: String ('student' | 'admin'),
  profileImage: String,
  department: String,
  enrollmentNumber: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Category
```javascript
{
  name: String,
  description: String,
  imageUrl: String,
  isActive: Boolean,
  createdBy: ObjectId (User),
  timestamps: true
}
```

### Question
```javascript
{
  text: String,
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  correctAnswer: String,
  explanation: String,
  difficulty: String,
  category: ObjectId (Category),
  subCategory: ObjectId (SubCategory),
  marks: Number,
  isActive: Boolean,
  createdBy: ObjectId (User),
  timestamps: true
}
```

### Quiz
```javascript
{
  title: String,
  description: String,
  category: ObjectId (Category),
  subCategory: ObjectId (SubCategory),
  questions: [ObjectId (Question)],
  totalMarks: Number,
  duration: Number (minutes),
  passingMarks: Number,
  totalQuestions: Number,
  shuffleQuestions: Boolean,
  showCorrectAnswers: Boolean,
  isPublished: Boolean,
  createdBy: ObjectId (User),
  timestamps: true
}
```

### Result
```javascript
{
  student: ObjectId (User),
  quiz: ObjectId (Quiz),
  answers: [{
    questionId: ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean,
    marksObtained: Number
  }],
  totalMarks: Number,
  obtainedMarks: Number,
  percentage: Number,
  isPassed: Boolean,
  timeTaken: Number (seconds),
  startTime: Date,
  endTime: Date,
  status: String,
  timestamps: true
}
```

## Quick Start

### Create Admin Account
```bash
node create-admin.js
```

### Seed Sample Data
```bash
node seed-english-data.js
```

### Test Connection
```bash
node test-connection.js
```

## Scripts

```bash
npm start           # Start production server
npm run dev         # Start with nodemon (development)
npm audit           # Check vulnerabilities
npm audit fix       # Fix vulnerabilities
```

## Security Considerations

- Change `JWT_SECRET` in production
- Enable HTTPS in production
- Use environment variables for sensitive data
- Enable helmet middleware (already configured)
- Validate and sanitize all inputs

## Error Handling

The API returns structured error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## Troubleshooting

### MongoDB Connection Issues
```bash
# Test connection
node test-connection.js
```

### Port Already in Use
Change the PORT in `.env` file or kill the process using the port.

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [API_REFERENCE.md](./API_REFERENCE.md) - Complete API documentation
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Frontend integration guide

## License

ISC

## Support

For issues or questions, please check the documentation or create an issue in the repository.
  "imageUrl": "https://example.com/math.png"
}
```

### 4. Create questions (Admin)
```bash
POST /api/questions
Headers: Authorization: Bearer <token>
{
  "text": "What is 2+2?",
  "options": [
    {"text": "3", "isCorrect": false},
    {"text": "4", "isCorrect": true},
    {"text": "5", "isCorrect": false}
  ],
  "correctAnswer": "4",
  "explanation": "2+2 equals 4",
  "difficulty": "easy",
  "categoryId": "63f7a1b2c3d4e5f6g7h8i9j0",
  "marks": 1
}
```

### 5. Create a quiz (Admin)
```bash
POST /api/quizzes
Headers: Authorization: Bearer <token>
{
  "title": "Math Quiz 1",
  "description": "Basic math questions",
  "categoryId": "63f7a1b2c3d4e5f6g7h8i9j0",
  "questionIds": ["63f7a1b2c3d4e5f6g7h8i9j0", "63f7a1b2c3d4e5f6g7h8i9j1"],
  "totalMarks": 10,
  "duration": 30,
  "passingMarks": 6,
  "shuffleQuestions": true,
  "showCorrectAnswers": true
}
```

### 6. Submit quiz result
```bash
POST /api/results
Headers: Authorization: Bearer <token>
{
  "quizId": "63f7a1b2c3d4e5f6g7h8i9j0",
  "answers": [
    {"questionId": "63f7a1b2c3d4e5f6g7h8i9j0", "selectedAnswer": "4"},
    {"questionId": "63f7a1b2c3d4e5f6g7h8i9j1", "selectedAnswer": "true"}
  ],
  "timeTaken": 600
}
```

## Error Handling

All endpoints return standardized error responses:

```javascript
{
  "success": false,
  "message": "Error message",
  "errors": [] // If validation errors
}
```

## Security Features

- ✅ Password encryption with bcryptjs
- ✅ JWT-based authentication
- ✅ Role-based authorization
- ✅ CORS enabled
- ✅ Helmet security headers
- ✅ Input validation with express-validator

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT generation and verification
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **express-validator** - Input validation

## Development Dependencies

- **nodemon** - Auto-reload during development

## Future Enhancements

- [ ] Email notifications
- [ ] Quiz scheduling
- [ ] Progress tracking
- [ ] Leaderboards
- [ ] File upload for profile pictures
- [ ] Bulk import of questions
- [ ] Question difficulty analytics
- [ ] Time-based question analytics
- [ ] CSV export of results

## License

ISC

## Support

For issues and questions, please create an issue in the repository.

