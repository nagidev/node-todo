import React from 'react';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

import './App.css';

function App({apiUrl}) {
  return (
    <div className="App">
      <h1>TO:DO</h1>
      <NewTodo apiUrl={apiUrl} />
      <TodoList apiUrl={apiUrl} />
    </div>
  );
}

export default App;
