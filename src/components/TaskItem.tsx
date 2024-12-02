import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete, editTask } from '../store/taskSlice';
import { Task } from '../types/task';
import { Pencil, Trash2, Check, X, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(
        editTask({
          ...task,
          title: editedTitle,
          description: editedDescription,
          dueDate: editedDueDate,
        })
      );
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${task.completed ? 'opacity-75' : ''}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Check className="w-4 h-4 mr-1" /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <X className="w-4 h-4 mr-1" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
              {task.dueDate && (
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(toggleTaskComplete(task.id))}
                className={`p-2 rounded-lg ${
                  task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-75`}
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-opacity-75"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-opacity-75"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}