# QUIZLOOM

## What is this project?

QUIZLOOM is a complete quiz application project that includes two parts:
- a backend server for managing data, users, and questions.
- a frontend client for registration, quiz creation, and student quiz taking.

### What does the project do?

This project enables building an online quiz platform with features such as:
- user login for students and administrators.
- creating categories, questions, and quizzes.
- presenting quizzes to students and saving results.
- managing student performance and analytics.

---

## 🎨 Application Screenshots

### Landing Page
<img width="1891" height="903" alt="Landing Page 1" src="https://github.com/user-attachments/assets/2fd6a57d-6499-4b25-9805-96b135c3e7ee" />
<img width="1879" height="891" alt="Landing Page 2" src="https://github.com/user-attachments/assets/f4766917-4f1c-4a9d-942e-a0e4ee305b95" />

---

### 🔐 Login & Sign Up Pages
<img width="692" height="695" alt="Login Page" src="https://github.com/user-attachments/assets/90f9a993-cf8a-43b6-811a-f1f26d981229" />
<img width="661" height="598" alt="Sign Up Page" src="https://github.com/user-attachments/assets/126bcd0e-7f21-43c4-b8fd-365dc4c51ad5" />

---

### 👨‍💼 Admin Dashboard Pages
<img width="1894" height="890" alt="Admin Dashboard 1" src="https://github.com/user-attachments/assets/f9021415-54d3-42b1-9652-5ae235d29aa8" />
<img width="1892" height="905" alt="Admin Dashboard 2" src="https://github.com/user-attachments/assets/50434551-dd7c-4ccd-baee-5808d7f9a4eb" />
<img width="1895" height="919" alt="Admin Dashboard 3" src="https://github.com/user-attachments/assets/914fc121-6e44-451c-a5d9-0525aee3f4ba" />
<img width="439" height="703" alt="Admin Mobile View" src="https://github.com/user-attachments/assets/2b494d67-4df2-4c82-aed4-107da6266c4a" />
<img width="1894" height="899" alt="Admin Analytics" src="https://github.com/user-attachments/assets/144ac929-e733-4792-9f93-ec2470e58632" />
<img width="1918" height="890" alt="Admin Users Management" src="https://github.com/user-attachments/assets/6863896f-8056-41d0-bc7d-21258e4917bb" />
<img width="1884" height="859" alt="Admin Categories" src="https://github.com/user-attachments/assets/b07765d1-3d1a-48b0-ad72-70dcc60cd5b9" />
<img width="1804" height="220" alt="Admin Filter Bar" src="https://github.com/user-attachments/assets/d774a03d-abc1-4d21-86d7-3d15e446f6c0" />
<img width="1899" height="894" alt="Admin Questions Bank" src="https://github.com/user-attachments/assets/25c14c47-6683-4963-be1c-9950f20cb32b" />
<img width="1693" height="790" alt="Admin Quiz Management" src="https://github.com/user-attachments/assets/d94a576c-acbd-40ad-8d68-4b1030bf1c0c" />
<img width="1910" height="883" alt="Admin Results View" src="https://github.com/user-attachments/assets/3dd6ed8c-f8dd-4147-896a-ec490ae23577" />

---

### 🎓 Student Dashboard Pages
<img width="1900" height="910" alt="Student Dashboard" src="https://github.com/user-attachments/assets/e0cbb924-9716-491e-b943-8f273d8eee54" />
<img width="1912" height="901" alt="Available Quizzes" src="https://github.com/user-attachments/assets/b2c48439-f446-46ce-8f27-ff37a8c6af34" />
<img width="1901" height="921" alt="Quiz Categories" src="https://github.com/user-attachments/assets/357c4a15-3ac0-4b8b-930d-96fd5030836b" />
<img width="1774" height="782" alt="Quiz Details" src="https://github.com/user-attachments/assets/d415fe1d-892a-40c9-b23e-0ed3ef9181fc" />
<img width="630" height="723" alt="Quiz Timer Mobile" src="https://github.com/user-attachments/assets/604f123f-ca78-49fd-8cf6-a4e9830f91ae" />
<img width="1879" height="858" alt="Quiz Taking Interface" src="https://github.com/user-attachments/assets/f7abd2e4-cc3b-4fa8-875a-a2bf1904066f" />
<img width="1917" height="917" alt="Quiz Results" src="https://github.com/user-attachments/assets/c49b454f-8e90-4242-a9f1-18c4aefa0270" />

---

## Project Structure

- `Quiz-App-Backend22-main/`
  - Node.js + Express backend
  - MongoDB database integration with Mongoose
  - JWT authentication and role-based access control
  - APIs for quizzes, questions, categories, students, and results

- `Quiz-App-Front-mainV2-main/`
  - React frontend built with Vite
  - Admin and student interfaces
  - Authentication using JWT tokens
  - Quiz management, question browsing, and result views

## Quick Start

1. Open the backend folder and install dependencies:
   ```bash
   cd Quiz-App-Backend22-main/Quiz-App-Backend22-main
   npm install
   ```

2. Open the frontend folder and install dependencies:
   ```bash
   cd Quiz-App-Front-mainV2-main/Quiz-App-Front-mainV2-main
   npm install
   ```

3. Configure environment variables for each project locally using `.env` files.

4. Start the backend server and frontend app separately.