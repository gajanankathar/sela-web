import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createTask } from "../../actions/taskActions";

import Loader from "../Loader";
import Message from "../Message";

function TaskScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('title');
    const [description, setDescription] = useState('description');
    const [due_date, setDueDate] = useState('due_date');
    const [status, setStatus] = useState('status');

    const createdTask = useSelector((state) => state.taskCreate);
    const {error, loading} = createdTask;
    console.log("Task Screen", createdTask);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            'title': title,
            'description': description,
            'due_date': due_date,
            'status': status
        }
        await dispatch(createTask(payload));
        console.log("redirecting to home!!!!!!!!!!!!!")
        navigate('/');
    };


    return (
        loading?(
            <Loader/>
        ):error ? (
            <Message variant='danger'>{error}</Message>
        ):(
            <>
            <Container>
                <br />
                <h1>Add New Tasks</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="form-group row mb-4">
                    <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Title:</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" required={1} name="title" id="inputTitle" placeholder="Title"
                        onChange={e => setTitle(e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label htmlFor="inputDescription" className="col-sm-1 col-form-label">Description:</label>
                    <div className="col-sm-4">
                      <textarea rows="3" className="form-control" required={1} name="description" id="inputDescription" placeholder="Description"
                        onChange={e => setDescription(e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label htmlFor="inputDueDate" className="col-sm-1 col-form-label">Due Date:</label>
                    <div className="col-sm-4">
                      <input type="date" className="form-control" required={1} name="due_date" id="inputDueDate" placeholder="Due By"
                        onChange={e => setDueDate(e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-sm-1 col-form-label" htmlFor="selectStatus">Status:</label>
                    <div className="col-sm-4">
                      <select className="form-control" required={1} name="status" id="selectStatus" value={status}
                        onChange={e => setStatus(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="todo">To Do</option>
                        <option value="progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row mb-4">
                    <div className="col-sm-1"/>
                    <div className="col-sm-4">
                      <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                  </div>
                </form>
            </Container>
            </>
        )
    );
}

export default TaskScreen;