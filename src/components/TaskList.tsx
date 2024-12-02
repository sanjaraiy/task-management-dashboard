import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { isAfter, parseISO } from 'date-fns';

export default function TaskList() {
  const { tasks, filter, searchQuery } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isOverdue = task.dueDate && isAfter(new Date(), parseISO(task.dueDate));

    switch (filter) {
      case 'completed':
        return task.completed && matchesSearch;
      case 'pending':
        return !task.completed && matchesSearch;
      case 'overdue':
        return isOverdue && !task.completed && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found
        </div>
      )}
    </div>
  );
}