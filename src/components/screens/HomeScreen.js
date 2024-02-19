import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { listTasks, deleteTask, updateTask } from "../../actions/taskActions";

import Loader from "../Loader";
import Message from "../Message";



function HomeScreen() {
    const dispatch = useDispatch();

    const initialState = { title: "", description: "", due_date:"", status:""};
    const [details, setDetails] = useState(initialState);
    const [refreshedTasks, setTasks] = useState([]);
    const [edit, setEdit] = useState({});

    const taskList = useSelector((state) => state.taskList);
    const {error, loading, tasks} = taskList
    console.log("Home Screen", taskList);
    const task_list = refreshedTasks.length > 0 ? refreshedTasks : tasks;

    useEffect(() => {
        dispatch(listTasks());
    }, [dispatch]);

    console.log("Tasks= ", tasks);
    console.log("Edit state= ", edit);

    const handleEdit = (event, id) => {
        event.preventDefault();
        setEdit({id: id});
        setDetails(...task_list.filter( task => task.id === id));
    }

    const handleDelete = async (id) => {
        await dispatch(deleteTask(id));
        setTasks(task_list.filter(task => task.id !== id ));
        console.log("Tasks after remove")
    }

    const handleChange = event => {
        const { target } = event;
        console.log("form change event==", event);
        setDetails( (prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }

    const handleUpdate = async (event, id) => {
        event.preventDefault();
        const payload = { ...details };
        await dispatch(updateTask(details.id, payload));
        console.log("task update handler ", payload, task_list, [...task_list.filter(task => task.id !== id), payload])
        setTasks([...task_list.filter(task => task.id !== id), payload]);
        setEdit({});
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
                    {task_list.map((task) => (
                      <tr key={task.id}>
                        {edit.id!==task.id && <td>{task.title}</td>}
                        {edit.id===task.id && <td><Form.Control sm={2} required={1} type="text" name="title" value={details.title || ""}
                            onChange={ handleChange }/></td>}

                        {edit.id!==task.id && <td>{task.description}</td>}
                        {edit.id===task.id && <td><Form.Control sm={3} required={1} type="text" name="description" value={details.description || ""}
                            onChange={ handleChange }/></td>}

                        {edit.id!==task.id && <td>{task.due_date}</td>}
                        {edit.id===task.id && <td><Form.Control sm={2} required={1} type="date" name="due_date" value={details.due_date || ""}
                            onChange={ handleChange }/></td>}

                        {edit.id!==task.id && <td>{task.status}</td>}
                        {edit.id===task.id && <td><Form.Select sm={2} required={1} name="status" value={details.status || ""} onChange={ handleChange }>
                            <option value="">--Select--</option>
                            <option value="todo">To Do</option>
                            <option value="progress">Progress</option>
                            <option value="done">Done</option>
                        </Form.Select></td>}

                        {edit.id!==task.id && <td>
                          <button onClick={(e) => handleEdit(e, task.id)} className="btn btn-sm btn-primary">Edit</button>
                          <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                        </td>}
                        {edit.id===task.id && <td>
                          <button onClick={(e) => handleUpdate(e, task.id)} sm={1} className="btn btn-sm btn-primary">Update</button>
                          <button onClick={(e) => setEdit({})} sm={1} className="btn btn-sm btn-danger ms-2">Discard</button>
                        </td>}
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