# 🍲 Recipe Sharing Platform

A full-stack **Recipe Sharing Platform** built with **React + TypeScript (frontend)** and designed for a MERN-stack architecture. The app allows users to create, view, filter, and manage recipes, as well as search by ingredients. Future enhancements include user authentication, ratings, and comments.

## 📌 Features

### ✅ Recipe Management

- **Create Recipe:** Add recipes with title, ingredients, steps, and an image
- **View Recipes:** Display a list of all available recipes
- **Recipe Details:** View detailed information about a recipe
- **Update/Delete Recipes:** Edit or remove recipes

### ✅ Search & Filter

- **Search by Ingredients:** Quickly find recipes based on available ingredients
- **Filter by Rating or Time:** Narrow results by rating or preparation time

### 🚀 Upcoming Features

- **Ratings & Comments:** Users can rate recipes (1–5 stars) and leave comments
- **User Authentication:** Secure signup, login, and logout
- **Error Handling:** Friendly messages for validation and server errors

## 🛠️ Tech Stack

### Frontend

- **React + TypeScript** (with Vite)
- **Tailwind CSS** for styling
- **Context API** for state management
- **Uppy** for image uploads

### Backend (Planned)

- **Node.js + Express**
- **MongoDB** (for storing recipes, ratings, and user data)
- **JWT Authentication** for secure login

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── components/     # UI components (Form, Detail, Uploader, etc.)
│   ├── context/        # Global state management
│   ├── pages/          # Page-level components (Home, Create, Edit, etc.)
│   ├── seeds/          # Sample seed recipes
│   ├── types/          # TypeScript types
│   └── App.tsx         # App entry point
├── public/             # Static assets
├── package.json
└── vite.config.ts
```

## ⚡ Getting Started

### Prerequisites

- **Node.js** (>=18)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/recipe-sharing.git
   cd recipe-sharing/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```bash
   http://localhost:5173
   ```

## 📚 Assignment Reference

[Assignment 7: Recipe Sharing Platform](https://lakinmohapatra.notion.site/Assignment-7-Recipe-Sharing-Platform-71e1d4136d314f08b4551b52fa7739ab)
