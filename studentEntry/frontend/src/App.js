import './App.css';
import React, { useState } from 'react';

function App() {

  const [student, setStudent] = useState({
    studentName: "",
    studentAddress: "",
    studentRollNo: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setStudent({ ...student, 
      [e.target.name]: e.target.value 
    });
  };

  const getStudents = async () => {
    const response = await fetch("http://localhost:8081/students/get/all", {
      method: "GET",
    });
    const data = await response.json();
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/students/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const data = await response.json();
    alert("Student added: " + data.studentName);
  };

  return (
  <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px", width: "300px" }}>
      <h1 style={{ textAlign: "center" }}>Student Entry </h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>student Name: </label>
          <input name="studentName" value={student.studentName} onChange={handleChange} style={{ width: "100%", height: "25px" }}/>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>student Address: </label>
          <input name="studentAddress" value={student.studentAddress} onChange={handleChange} style={{ width: "100%", height: "25px" }}/>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>student RollNo: </label>
          <input name="studentRollNo" value={student.studentRollNo} onChange={handleChange} style={{ width: "100%", height: "25px" }}/>
        </div>
        <button type="submit" style={{ width: "102%", fontWeight: "bold", padding: "0.5rem", backgroundColor: "#4CAF50", color: "white", display: "block", margin: "0 auto" , border: "none", borderRadius: "5px" }}>
          Submit</button>
      </form>

      <hr/>

      <p style={{ textAlign: "center"}}>Get list of all students</p>
      <button onClick={getStudents} style={{ width: "100%", fontWeight: "bold", padding: "0.5rem", backgroundColor: "#008CBA", color: "white", border: "none", borderRadius: "5px", marginBottom: "1rem" }}>
        Get All Students</button>
      <ul>
        {students.map((s) => (
          <li key={s.studentRollNo} style={{ padding: "0.4rem" }}>
            {s.studentName} , {s.studentAddress} , {s.studentRollNo}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );

}

export default App;
