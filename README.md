# 🚀 MERN Stack Complete CRUD Application

A full-stack User Management System built with MongoDB, Express.js, React.js, and Node.js. This application provides a complete CRUD (Create, Read, Update, Delete) functionality for managing user data with a modern, responsive user interface.

## 🌟 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete users
- **Modern UI/UX**: Professional and responsive design with smooth animations
- **Form Validation**: Client-side validation with real-time error feedback
- **Toast Notifications**: User-friendly success and error messages
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Loading States**: Enhanced UX with loading indicators
- **Error Handling**: Comprehensive error handling on both client and server
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful toast notifications
- **Bootstrap 5.3** - CSS framework for responsive design
- **Font Awesome** - Icon library
- **Sass** - CSS preprocessor

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Parse incoming request bodies
- **dotenv** - Environment variable management

## 📁 Project Structure

```
MERN-Stack-Complete-Crud/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── addUser/     # Add user component
│   │   │   ├── getUsers/    # Display users component
│   │   │   └── updateUser/  # Update user component
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── server/                  # Node.js backend application
│   ├── controller/
│   │   └── userController.js # User CRUD operations
│   ├── model/
│   │   └── userModel.js     # User schema definition
│   ├── routes/
│   │   └── userRoute.js     # API routes
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
│
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zohaib-Karamat/MERN-Stack-Complete-CRUD.git
   cd MERN-Stack-Complete-CRUD
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/mern_crud
   # Or for MongoDB Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/mern_crud
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user` | Create a new user |
| GET | `/api/get/users` | Get all users |
| GET | `/api/get/user/:id` | Get user by ID |
| PUT | `/api/update/user/:id` | Update user by ID |
| DELETE | `/api/delete/user/:id` | Delete user by ID |

### API Request/Response Examples

#### Create User
```javascript
POST /api/user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, City, Country"
}
```

#### Update User
```javascript
PUT /api/update/user/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "address": "456 Updated St, City, Country"
}
```

## 🎨 Features Overview

### User Management
- **Add New Users**: Form with validation for name, email, and address
- **View All Users**: Responsive table displaying all users
- **Update Users**: Edit existing user information
- **Delete Users**: Remove users with confirmation dialog

### Validation Features
- **Real-time Validation**: Instant feedback as user types
- **Email Format Validation**: Ensures valid email format
- **Required Field Validation**: All fields are mandatory
- **Duplicate Email Prevention**: Server-side check for unique emails

### UI/UX Features
- **Loading States**: Visual feedback during API calls
- **Toast Notifications**: Success and error messages
- **Responsive Design**: Mobile-friendly interface
- **Modern Animations**: Smooth transitions and effects
- **Professional Styling**: Clean and modern design

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGO_URL=mongodb://localhost:27017/mern_crud

# For MongoDB Atlas (replace with your connection string)
# MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

### Database Schema

The application uses a simple User schema:

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  }
}
```

## 🚦 Testing

### Manual Testing

1. **Create User**: Test adding new users with valid and invalid data
2. **Read Users**: Verify all users are displayed correctly
3. **Update User**: Test editing user information
4. **Delete User**: Test user deletion with confirmation

### API Testing

You can test the API endpoints using tools like:
- **Postman**
- **Insomnia**
- **curl commands**
- **VS Code REST Client**

## 🔒 Security Features

- **Input Validation**: Both client-side and server-side validation
- **CORS Configuration**: Secure cross-origin requests
- **Error Handling**: Proper error responses without exposing sensitive data
- **Data Sanitization**: Clean input data before database operations

## 🎯 Future Enhancements

- [ ] User Authentication and Authorization
- [ ] Pagination for large datasets
- [ ] Search and Filter functionality
- [ ] File upload for user avatars
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Code with Zohaib**
- GitHub: [@Zohaib-Karamat](https://github.com/Zohaib-Karamat)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB team for the robust database solution
- Express.js team for the minimal web framework
- Bootstrap team for the responsive CSS framework

---

⭐ If you found this project helpful, please give it a star!
