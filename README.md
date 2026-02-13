# Node.js Authentication API

A comprehensive authentication system built with Node.js, Express, and Sequelize 3 ORM. Supports login, signup, password management, and WhatsApp OTP verification.

## Features

- **User Registration** - Signup with email, phone number, and optional password
- **Authentication Methods**
  - Password-based login
  - OTP-based login (via WhatsApp)
  - Hybrid mode (password OR OTP)
- **Password Management**
  - Change password
  - Forgot password with reset token
- **OTP System**
  - Generate and send OTP via WhatsApp API
  - OTP verification
  - Configurable expiry time
- **Security**
  - JWT token-based authentication
  - Bcrypt password hashing
  - CORS enabled
  - Helmet for HTTP headers security

## Project Structure