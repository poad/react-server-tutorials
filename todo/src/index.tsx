import './index.css';
import React from 'react';
import { allTodos } from './actions.js';
import AddTodo from './AddTodo.js';
import Item from './Item.js';
import Layout from './Layout.js';

export default function Index() {
  const todos = React.use(allTodos());

  return (
    <Layout>
      <AddTodo />
      <React.Suspense fallback={<div>Loading...</div>}>
        {todos.length === 0 && <p className="text-gray-500">No todos yet!</p>}
        {todos.map((todo) => (
          <Item key={todo.id} title={todo.title} id={todo.id} />
        ))}
      </React.Suspense>
    </Layout>
  );
}
