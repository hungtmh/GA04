// Todo API Service using JSONPlaceholder as mock backend
const API_BASE = 'https://jsonplaceholder.typicode.com';

export const todoApi = {
  // Fetch all todos
  async getTodos() {
    try {
      const response = await fetch(`${API_BASE}/todos?_limit=10`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Add new todo
  async addTodo(title) {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1,
        }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      return await response.json();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  // Toggle todo completion status
  async toggleTodo(id, completed) {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      return await response.json();
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  },

  // Delete todo
  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};
