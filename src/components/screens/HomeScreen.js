import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

//import Task from "../Task";
import { listTasks, deleteTask } from "../../actions/taskActions";

import Loader from "../Loader";
import Message from "../Message";



function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskList = useSelector((state)=>state.taskList);
  const {error, loading, tasks} = taskList

  useEffect(() => {
    dispatch(listTasks())
  }, [dispatch]);

  console.log("Tasks= ", tasks);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  }

  return (
    <Container>
      <br />
      <h1> Tasks </h1>

      {
        loading?(
          <Loader/>
        ):error ? (
          <Message variant='danger'>{error}</Message>
        ):(
          <>
            <Link to="create/tasks/" className="btn btn-success my-3"> Create</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    <td>{task.status}</td>
                    <td>
                      <button className="btn btn-sm btn-primary">Edit</button>
                      <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      }
    </Container>
  );
}

export default HomeScreen;