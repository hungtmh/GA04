import { useState, useEffect } from 'react';
import { todoApi } from '../services/todoApi';

export default function TodoListPage({ onNavigate }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [editConfirmation, setEditConfirmation] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await todoApi.getTodos();
        setTodos(todosData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load todos.');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsAdding(true);
    try {
      const newTodo = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setNewTaskTitle('');
    } catch (err) {
      alert('Failed to add todo. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id, completed) => {
    try {
      await todoApi.updateTodo(id, { completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (err) {
      alert('Failed to update todo. Please try again.');
    }
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    try {
      setTodos(todos.filter((todo) => todo.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert('Không thể xóa task. Vui lòng thử lại.');
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Edit todo
  const handleEditTodo = (id, currentTitle) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleEditChange = (e) => {
    setEditingTitle(e.target.value);
  };

  const handleEditSave = async (id) => {
    if (!editingTitle.trim()) return;
    setEditConfirmation({ id, title: editingTitle });
  };

  const confirmEdit = () => {
    try {
      setTodos(
        todos.map((todo) =>
          todo.id === editConfirmation.id
            ? { ...todo, title: editConfirmation.title }
            : todo
        )
      );
      setEditingId(null);
      setEditingTitle('');
      setEditConfirmation(null);
    } catch (err) {
      alert('Không thể cập nhật task. Vui lòng thử lại.');
    }
  };

  const cancelEdit = () => {
    setEditConfirmation(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Tasks
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                {todos.filter((t) => !t.completed).length} Active
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {todos.filter((t) => t.completed).length} Done
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isAdding}
            />
            <button
              type="submit"
              disabled={isAdding || !newTaskTitle.trim()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isAdding ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-md p-4 sm:p-5 transition-all hover:shadow-lg ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleTodo(todo.id, todo.completed)}
                    className="flex-shrink-0 mt-1 sm:mt-0"
                  >
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-indigo-500'
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Task Title + Edit */}
                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          className="flex-1 px-2 py-1 border border-indigo-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editingTitle}
                          onChange={handleEditChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditSave(todo.id);
                            if (e.key === 'Escape') handleEditCancel();
                          }}
                          autoFocus
                        />
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => handleEditSave(todo.id)}
                        >
                          Lưu
                        </button>
                        <button
                          className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          onClick={handleEditCancel}
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-base sm:text-lg break-words ${
                            todo.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-900'
                          }`}
                        >
                          {todo.title}
                        </p>
                        <button
                          className="ml-2 px-2 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                          onClick={() => handleEditTodo(todo.id, todo.title)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">ID: {todo.id}</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete task"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận xóa</h2>
              <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa task này không?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Confirmation Modal */}
        {editConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận chỉnh sửa</h2>
              <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn lưu thay đổi cho task này không?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

