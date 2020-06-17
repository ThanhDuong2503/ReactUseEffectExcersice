import React from 'react';
import "./LoadingSpinner";
import LoadingSpinner from "./LoadingSpinner";

function loadStudents(query) {
  return fetch("http://localhost:8080/students?query="+query)
      .then(response => response.json())
}

function App() {

  const [students, setStudents]= React.useState([]);
  const [loading, setLoading]= React.useState("");
  const [query, setQuery]= React.useState("");

  React.useEffect(() => {
    setLoading("LOADING");
    loadStudents(query)
        .then(data => {
      setStudents(data);
      setLoading("SUCCESS")
    }).catch( () => setLoading("FAILED"));
  }, [query]);

  return (
    <div>
      <input onChange={(event) => setQuery(event.target.value)}/>

      {students.map(student => <div key={student.id}>{student.name}</div>)}
      {loading === "LOADING" && <LoadingSpinner></LoadingSpinner>}
      {loading === "FAILED" && <div>FAILED</div>}
    </div>
  );
}

export default App;
