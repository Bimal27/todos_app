import { useState, useEffect } from 'react'
import './App.css'
import {
  MantineProvider,
  Container,
  Grid,
  Notification,
  Card,
} from '@mantine/core'

function App() {
  const [todos, setTodos] = useState([])
  const [newtasks, setNewtasks] = useState([])

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(storedTask)
  }, [])

  const addTask = () => {
    if (newtasks.trim() === '') {
      Notification.error('Please enter a task')
      return
    }

    const updatedTodos = [...todos, { id: Date.now(), text: newtasks }]
    setTodos(updatedTodos)
    setNewtasks('')

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    alert(`"${newtasks}" has been added to the task list.`)
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
            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <input
                style={{ borderRadius: '4px', padding: '8px' }}
                placeholder="Please add a new task"
                value={newtasks}
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
            <ul>
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
                  <li> {todo.text}</li>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </Card>
              ))}
            </ul>
          </Grid>
        </Container>
      </MantineProvider>
    </>
  )
}

export default App
