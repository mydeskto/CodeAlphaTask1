import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([task, ...tasks]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.priority !== b.priority) return b.priority ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTask} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${
              filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-2 p-3 border rounded ${
                task.completed ? "bg-gray-50" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleComplete(task.id)}
                className="text-gray-500 hover:text-blue-600"
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <span
                className={`flex-1 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No tasks yet. Add some tasks to get started!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
