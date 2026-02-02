# 🛡️ Lost and Found Hub for Campus

> *A full-stack web application to help campus students, faculty, and staff easily report and recover lost items.*

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)]()
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()

## 📖 About

This is my first hackathon project! 🎉

The **Lost and Found Hub for Campus** is designed to solve a common problem on campus — students losing important belongings like ID cards, books, notes, or personal items with no proper system to recover them. 

Our platform provides a simple, secure, and efficient way for users to:
- 📝 Report lost items
- 🔍 Browse found items
- 🤝 Connect finders and owners quickly
- 🏆 Promote honesty and responsibility within the campus community

---

## ✨ Features

- 🏠 **Landing Page** - Welcoming interface with smooth animations
- 🔐 **User Authentication** - Secure login and registration system
- 📋 **Lost Items Page** - Browse and search for lost items
- 🎯 **Found Items Page** - View items that have been found
- ➕ **Create Item Post** - Users can report lost or found items
- 👤 **User Profile** - Manage your posted items (lost & found)
- 🛡️ **Admin Panel** - Manage all items and users (admin only)
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Beautiful Animations** - Smooth UI/UX with custom CSS animations

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** (implied) - Database for storing items and users
- **Authentication** - Session-based authentication with cookies

---

## 📁 Project Structure

```
Lost-and-found-hub-for-campus/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── assets/         # Images and static files
│   │   ├── Components/     # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── ProfileItemCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/       # React Context (AuthContext)
│   │   ├── pages/          # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LostItemPage.jsx
│   │   │   ├── FoundItemPage.jsx
│   │   │   ├── CreateItem.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── userItemPages/
│   │   │   │   ├── UserItems.jsx
│   │   │   │   ├── UserLostItems.jsx
│   │   │   │   └── UserFoundItem.jsx
│   │   │   └── admin/
│   │   │       ├── adminIndex.jsx
│   │   │       ├── AdminItemList.jsx
│   │   │       ├── AdminAllItemList.jsx
│   │   │       └── AdminUsers.jsx
│   │   ├── stylesheets/    # CSS files
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── eslint.config.js
│
└── server/                  # Backend Express application
    └── src/
        └── app.js          # Express server setup

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lagdhir-parth/Lost-and-found-hub-for-campus.git
   cd Lost-and-found-hub-for-campus
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

5. **Run the development servers**

   In the `client` directory:
   ```bash
   npm run dev
   ```

   In the `server` directory:
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port Vite assigns)

---

## 🎯 Key Features Breakdown

### 🔐 Authentication System
- Protected routes using React Context API
- Session-based authentication with cookies
- Separate login/register pages

### 👤 User Dashboard
- View all items posted by the user
- Filter by lost or found items
- Edit or delete owned items

### 🛡️ Admin Panel
- View all items (lost and found)
- Manage users
- Approve or reject item posts

### 📱 Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- User-friendly interface

---

## 👥 Team - Tech Titans

This project was built with love and collaboration by:

- **Lagdhir Parth** - [@lagdhir-parth](https://github.com/lagdhir-parth)
- **Dabhi Chandresh**
- **Bagathariya Tanisha**

---

## 🎯 Our Mission

Our journey began with a simple observation — students often lose important belongings like ID cards, notes, or personal items on campus, and there was no proper system to help them get those items back. 

What started as a small idea among a few classmates turned into a project with a purpose: to create a reliable digital platform where lost and found items could be reported and recovered easily.

Through teamwork, creativity, and a shared desire to help others, we built this website to make campus life a little less stressful and a lot more connected. 

Today, our Lost and Found website stands as a reflection of our dedication to solving real-world problems through technology and collaboration.

---

## 📸 Screenshots

> *Add screenshots of your application here*

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

For any questions or suggestions, feel free to reach out!

**Repository**: [Lost-and-found-hub-for-campus](https://github.com/lagdhir-parth/Lost-and-found-hub-for-campus)

---

<div align="center">

**Made with ❤️ by Team Tech Titans**

⭐ Star this repo if you find it helpful!

</div>