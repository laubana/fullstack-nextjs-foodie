"use client";

import { useEffect, useState } from "react";

export default () => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const main = async () => {
      const respnose = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await respnose.json();
      setTodos(data);
    };
    main();
  }, []);

  return (
    <div>
      {todos &&
        todos.map((todo, index) => (
          <div className="here" key={index}>
            {todo.id}
          </div>
        ))}
    </div>
  );
};
