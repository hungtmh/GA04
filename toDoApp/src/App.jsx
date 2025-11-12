import { useState } from 'react'
import HomePage from './pages/HomePage'
import TodoListPage from './pages/TodoListPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'todos' && <TodoListPage onNavigate={handleNavigate} />}
    </>
  )
}

export default App
