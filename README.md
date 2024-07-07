# Issawi-Shark - A Platform to Showcase Projects to Issawi-Shark

## Overview

Issawi-Shark is an online platform designed to connect project owners with potential Issawi-Shark. It provides a space where innovative projects can be displayed, allowing Issawi-Shark to explore opportunities and contribute to the growth of promising ventures.

## Features

- **Project Showcase**: Project owners can create detailed profiles for their projects, including descriptions, images, videos, and relevant documents.
- **Investor Dashboard**: Issawi-Shark have access to a personalized dashboard where they can browse projects, save favorites, and contact project owners.
- **Search and Filter**: Advanced search and filtering options to help Issawi-Shark find projects that match their interests and criteria.
- **User Authentication**: Secure login and registration for both project owners and Issawi-Shark.
- **Notifications**: Real-time notifications to keep users updated on new projects and investor interest.
- **Analytics**: Project owners can view analytics on the performance of their project listings.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vite, Netlify (for frontend), render (for backend)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HusseinSpi/Issawi-Shark-V2
   cd Issawi-Shark-V2
   ```

### Install frontend dependencies:

```bash
cd client
npm install
```

### Install backend dependencies:

```bash
cd ../server
npm install
```

### Setup environment variables:

#### Create a config.env file in the server directory and add the following variables:

```bash
NODE_ENV=production
PORT=8000
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_mongodb_password_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_userName=your_email_user
EMAIL_PASSWORD=your_password_user

```

### Run the backend server:

```bash
npm start:prod
```

### Run the frontend server:

```
cd ../client
npm run dev
```
