import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Modal,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import db from "./firebase";

const useStyles = styled((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    color: "#fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo); // Initialize input state with todo text

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).update({ todo: input }); // Update the todo text
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="todo__editBox">
          <h1>Update Todo</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />{" "}
          <br />
          <Button onClick={updateTodo}>Update Todo</Button> {/* Use onClick */}
        </div>
      </Modal>
      <List>
        <div className="info_box">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={props.todo.todo}
              secondary="Dummy Deadline 🚨"
            />
          </ListItem>

          <Button onClick={() => setOpen(true)}>Update Todo</Button>
          <DeleteForeverIcon
            className="deleteIcon"
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
