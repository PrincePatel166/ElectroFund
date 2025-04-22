# ElectroFund – Crowdfunding Platform using MERN Stack

## Project Title:
ElectroFund – Crowdfunding Platform using MERN Stack

## Introduction:
ElectroFund is a **full-stack web application** built using the **MERN (MongoDB, Express, React, Node.js)** stack. The platform aims to connect **startup creators** with **potential investors**, allowing them to showcase innovative ideas and raise funds. The app features **user registration**, **campaign creation**, **investor backing**, and a **real-time campaign dashboard**, all wrapped in a beautiful and responsive user interface.

## Vision & Mission

### Our Goal:
To create a **seamless crowdfunding experience** that enables startups to raise funds and investors to discover innovative projects, making it easier for entrepreneurs to bring their ideas to life.

### Why ElectroFund?
- **Simple Campaign Launching** – Easily create campaigns with title, description, and goal amounts, enabling startup creators to quickly reach investors.
- **Real-time Investment Tracking** – Investors can view campaign updates in real-time, ensuring they are always informed about the funds raised and the number of backers.
- **Secure & Scalable** – Implementing **JWT-based authentication** for secure and scalable user management ensures a reliable user experience for creators and investors alike.

## Features & Functionalities

### User Authentication:
- **Secure Sign-up & Login** – Enables user registration and login with email and password.
- **JWT-based Authentication** – Once logged in, users are issued a **JWT token**, which is used for session management and authentication.

### Campaign Management:
- **Create New Campaigns** – Project creators can launch new campaigns by providing details such as title, description, goal amount, and startup URL.
- **Campaign Tracking** – Creators can view how much has been raised and track the number of investors backing their campaign in real-time.
- **Campaign Listings** – All campaigns are listed on the homepage with options to filter and search by different criteria like title or goal amount.

### Investor Engagement:
- **Invest in Campaigns** – Investors can view campaign details and make investments in real-time.
- **Real-time Updates** – As soon as an investment is made, the campaign's raised amount and investor count are updated instantly on the platform.
- 
### Backend (Express + MongoDB):
- **REST API** – The backend is built with **Express.js**, offering a robust REST API for handling requests related to campaigns, investments, and user management.
- **MongoDB & Mongoose** – Campaign and user data are stored in **MongoDB**, and **Mongoose** is used for object data modeling.

### Database (MongoDB Atlas):
- **Database Name**: electrofund
- **Collections**:
  - **users** – Stores registered users with hashed passwords and roles (creator, investor).
  - **campaigns** – Holds all campaign data, such as title, description, goal amount, raised amount, and investor list.
  - **investments** (Optional/Extendable) – Tracks individual investments made by investors, allowing for analytics and transaction logs.

### Authentication Flow:
- **Email/Password Authentication** – Users sign up with their email and password. Passwords are hashed using **bcrypt** for security.
- **JWT for Sessions** – Upon login, the backend returns a **JWT** token, which is stored in **localStorage** on the frontend and used for validating user sessions.
- **Protected Routes** – Routes that require authentication (such as investment actions) validate the JWT on each request to ensure security.

## Tech Stack & Tools

### Frontend (React + Tailwind CSS):
- **React.js** – A JavaScript library for building user interfaces, used for creating reusable components.
- **Tailwind CSS** – A utility-first CSS framework that provides a modern and responsive UI.
- **React Router** – Provides routing for navigating between pages.
- **Axios** – A promise-based HTTP client for making API requests to the backend.

### Backend (Node.js + Express):
- **Node.js** – A JavaScript runtime for building scalable server-side applications.
- **Express.js** – A minimal and flexible web application framework for building the RESTful API.
- **MongoDB & Mongoose** – MongoDB is used as the NoSQL database for storing campaign and user data. Mongoose is used for object data modeling (ODM).

### Authentication & Security:
- **JWT (JSON Web Token)** – Secure user authentication and session management.
- **bcrypt.js** – A library used to hash user passwords before storing them in the database.

## Conclusion:
ElectroFund is a modern crowdfunding platform built using the MERN stack, designed to connect innovative startup creators with potential investors. The app supports secure user authentication, dynamic campaign creation, real-time updates, and investor contributions. The platform provides a seamless and engaging user experience, ensuring transparency and efficiency for both creators and investors.
