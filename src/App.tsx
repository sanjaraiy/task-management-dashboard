import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center mb-8">
            <CheckSquare className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Task Management Dashboard</h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <TaskForm />
            <TaskFilters />
            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;