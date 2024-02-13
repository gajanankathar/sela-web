import React from "react";

import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import HomeScreen from "./components/screens/HomeScreen";
import TaskScreen from "./components/screens/TaskScreen";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen/>}></Route>
        <Route exact path="/create/tasks" element={<TaskScreen/>}></Route>
      </Routes>
    </Router>
  );
}