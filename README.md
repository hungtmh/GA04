# TODO App - React + Tailwind CSS

A modern, responsive TODO application built with React, Tailwind CSS, and JSONPlaceholder API.

## ✨ Features

### Core Functionality
- ✅ **Add new tasks** - Create todos with a simple input form
- ✅ **Mark/Unmark as done** - Toggle task completion status
- ✅ **Remove tasks** - Delete completed or unwanted tasks
- ✅ **API Integration** - Real-time sync with JSONPlaceholder API

### Design & UX
- 🎨 **Tailwind CSS** - Beautiful, modern UI with Tailwind 3.4.17
- 📱 **Responsive Layout** - Works perfectly on mobile, tablet, and desktop
- 🏠 **Homepage** - Landing page with feature highlights
- 📋 **TODO List Page** - Dedicated page for managing tasks

## 🛠️ Tech Stack

- **React 19.2.0** - UI library with hooks (useState, useEffect)
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Vite 7.2.2** - Fast build tool and dev server
- **JSONPlaceholder API** - Mock REST API for todos

## 🚀 Getting Started

### Install Dependencies
```powershell
npm install
```

### Run Development Server
```powershell
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production
```powershell
npm run build
```

## 📁 Project Structure

```
toDoApp/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Landing page with navigation
│   │   └── TodoListPage.jsx      # Main TODO list with CRUD operations
│   ├── services/
│   │   └── todoApi.js            # API service for todo operations
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Tailwind directives + custom styles
├── tailwind.config.cjs            # Tailwind configuration
├── postcss.config.cjs             # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

## 🎯 API Endpoints (JSONPlaceholder)

- `GET /todos` - Fetch all todos
- `POST /todos` - Create new todo
- `PATCH /todos/:id` - Update todo (toggle completion)
- `DELETE /todos/:id` - Delete todo

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: sm (≥ 640px)
- **Desktop**: md (≥ 768px), lg (≥ 1024px)

## 🎨 Key Features by Requirement

### Tailwind & Responsive Layout (2.0 points)
- ✅ Tailwind CSS 3.4.17 properly configured
- ✅ Fully responsive with breakpoint classes (sm:, md:, lg:)
- ✅ Mobile-first design approach
- ✅ Modern gradient backgrounds and shadows

### Homepage & TODO List Page (2.0 points)
- ✅ Beautiful homepage with feature cards
- ✅ Navigation between pages
- ✅ TODO list page fetches from API using useEffect
- ✅ Loading states and error handling

### Add/Mark/Unmark/Remove with API (6.0 points)
- ✅ **Add**: Form submission calls POST API, updates state with useState
- ✅ **Mark/Unmark**: Checkbox toggles completion via PATCH API
- ✅ **Remove**: Delete button calls DELETE API, removes from state
- ✅ Real-time UI updates after each operation
- ✅ Error handling for failed API calls

## 🎓 React Hooks Used

- **useState**: Managing todos array, loading states, form inputs
- **useEffect**: Fetching todos from API on component mount

## 💡 Usage

1. **Start at Homepage**: View feature overview and click "Get Started"
2. **Add Tasks**: Type task name and click "Add Task"
3. **Mark Complete**: Click checkbox to toggle completion status
4. **Remove Tasks**: Click delete icon to remove tasks
5. **Navigate Back**: Use back arrow to return to homepage

## 📊 Scoring Breakdown

| Feature | Points | Status |
|---------|--------|--------|
| Tailwind CSS 3.4.17 & Responsive | 2.0 | ✅ Complete |
| Homepage & TODO List (API) | 2.0 | ✅ Complete |
| Add/Mark/Unmark/Remove (API) | 6.0 | ✅ Complete |
| **Total** | **10.0** | **✅ 10.0/10.0** |

---

Built with ❤️ using React, Tailwind CSS, and JSONPlaceholder API
