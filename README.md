# 🏡 Airbnb Clone

A full-stack web application inspired by Airbnb that allows users to explore, create, and manage property listings.

## 📌 Features

* 🏠 Browse property listings
* 🔍 View detailed information about each listing
* ➕ Create new property listings
* ✏️ Edit existing listings
* 🗑️ Delete listings
* 🖼️ Upload property images
* 📍 View property locations
* 👤 User authentication and authorization
* 🔐 Secure login and signup
* 🗺️ Interactive maps for property locations
* 💾 Database integration for storing listings and user data

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Technologies

* Cloudinary – Image storage and management
* Mapbox – Maps and location services
* Passport.js – Authentication and authorization
* MongoDB Atlas – Cloud database hosting

## 📂 Project Structure

```text
Airbnb-Clone/
│
├── models/          # Database models
├── routes/          # Application routes
├── controllers/     # Route controllers
├── views/           # EJS templates
├── public/          # Static files (CSS, JavaScript)
├── utils/           # Utility functions
├── middleware.js    # Custom middleware
├── app.js           # Main application file
├── package.json     # Project dependencies
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### 2. Navigate to the project folder

```bash
cd AirbnbColne
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the root directory and add the required environment variables:

```env
# MongoDB Atlas
ATLASDB_URL=your_mongodb_atlas_connection_string
# Cloudinary Credentials
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
# Session Secret
SECRET=your_session_secret
```

### 5. Run the application

```bash
node app.js
```

Or, if using Nodemon:

```bash
nodemon app.js
```

The application will run on:

```text
http://localhost:8080
```

## 🔐 Authentication

The application uses **Passport.js** for authentication and authorization.

Users can:

* Create an account
* Log in securely
* Log out
* Create property listings
* Edit their own listings
* Delete their own listings

## 🗺️ Maps and Location

Property locations are displayed using **Mapbox**, allowing users to visualize where listings are located.

## ☁️ Image Uploads

Images are uploaded and managed using **Cloudinary**, which provides cloud-based image storage.

## 🚀 Future Improvements

Some features planned for the future:

* ❤️ Add wishlist functionality
* 📅 Booking system
* 💳 Payment integration
* 🔎 Advanced search and filters
* 📱 Improved mobile responsiveness

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to fork this repository and submit a pull request.

## 👨‍💻 Author

**Adarsh A Ladwa**

GitHub: https://github.com/Adarsh812793

---

⭐ If you like this project, consider giving it a star!
