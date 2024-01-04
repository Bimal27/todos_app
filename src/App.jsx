import { useState, useEffect } from 'react'
import './App.css'
import {
  MantineProvider,
  Container,
  Grid,
  Card,
} from '@mantine/core'

function App() {
  const [todos, setTodos] = useState([])
  const [newtasks, setNewtasks] = useState([])

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [updatedTaskText, setUpdatedTaskText] = useState('')

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(storedTask)
  }, [])

  const addTask = () => {
    const updatedTodos = [...todos, { id: Date.now(), text: newtasks }]
    setTodos(updatedTodos)
    setNewtasks('')

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    alert(`"${newtasks}" has been added to the task list.`)
  }
  const updateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTaskId ? { ...todo, text: updatedTaskText } : todo,
    )
    setTodos(updatedTodos)
    setEditingTaskId(null)
    setUpdatedTaskText('')

    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    alert('Task updated successfully.')
  }

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  return (
    <>
      <h2>Todos App</h2>
      <MantineProvider>
        <Container size="xl">
          <Grid gutter="md">
            <div style={{ marginBottom: '16px' }}>
              <input
                style={{ borderRadius: '4px', padding: '8px' }}
                value={newtasks}
                placeholder="Add a new task"
                onChange={(e) => setNewtasks(e.target.value)}
              />
              <button
                onClick={addTask}
                style={{
                  marginLeft: '8px',
                  background: 'green',
                  color: 'white',
                }}
              >
                Add Task
              </button>
            </div>

            {todos.map((todo) => (
              <Card
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                {editingTaskId === todo.id ? (
                  <>
                    <input
                      style={{ borderRadius: '3px', padding: '6px' }}
                      value={updatedTaskText}
                      onChange={(e) => setUpdatedTaskText(e.target.value)}
                      placeholder="Update task text"
                    />
                    <button onClick={updateTodo} style={{ color: 'orange' }}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <li> {todo.text}</li>
                    <button
                      onClick={() => setEditingTaskId(todo.id)}
                      style={{ color: 'orange' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      style={{ color: 'red' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </Card>
            ))}
          </Grid>
        </Container>
      </MantineProvider>
    </>
  )
}

export default App
