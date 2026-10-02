import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

  function addTask() {
    const trimmed = text.trim()
    if (trimmed === '') return
    setTasks([
      ...tasks,
      { id: Date.now(), text: trimmed, completed: false },
    ])
    setText('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <h1>MY Student Task Manager</h1>

      <div className="add-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
