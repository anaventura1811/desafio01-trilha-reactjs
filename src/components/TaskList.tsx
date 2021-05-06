import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Regex da linha 20 - source: https://www.youtube.com/watch?v=E1E08i2UJGI
  // https://github.com/briancodex/react-todo-app-v1/blob/master/src/App.css
  function handleCreateNewTask() {
    
    if (!newTaskTitle || /ˆ\s*$/.test(newTaskTitle)) {
      return;
    }
    const newTask = {
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTaskTitle,
      isComplete: false,
    }
      const newTaskList = [...tasks, newTask];
      setTasks(newTaskList);
      setNewTaskTitle('');
    
  }

  function handleToggleTaskCompletion(id: number) {
    let updateTask = [...tasks].map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task;
    })
    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    const removeTask = [...tasks].filter(task => task.id !== id);
    setTasks(removeTask);
  }
  
  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}