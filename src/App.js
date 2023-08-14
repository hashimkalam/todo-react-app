import { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when app loads, need to listen to database and fetch new todos as they get added/ removed
  useEffect(() => {
    // this code runs when app loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button'
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="app__container">
      <title>Hashim</title>
      <h1> 🌟 Ready to Conquer the Day's Quests? 🌟 </h1>

      <form>
        <FormControl>
          <InputLabel> ✅ Write a Todo </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add ToDo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
