import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import { deleteTask } from "../actions/taskActions";


function Task({task}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    navigate('/');
  }

  return (
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
  )
}

export default Task