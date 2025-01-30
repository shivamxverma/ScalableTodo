import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [difficulty, setDifficulty] = useState(50); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [time, setTime] = useState('12:00');
  const [success, setSuccess] = useState(null);
  const backendUrl = 'http://localhost:8000/todo';
  const navigate = useNavigate();


  const fetchTodos = async () => {
    try {
      const res = await axios.get(backendUrl);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos', err);
    }
  };

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    fetchTodos();
  }, [todos]);

  const onSubmit = async () => {
    if (todo.trim() === '' || description.trim() === '') {
      setSuccess(false);
      return;
    }

    try {
      // const token = localStorage.getItem('token');
      // const payload = JSON.parse(atob(token.split('.')[1]));
      // const userId = payload.id;
      // console.log(token);
      // console.log(token);
      const xd = await axios.post(backendUrl, { 
        todo, 
        description, 
        isDone: false, 
        difficulty, 
        date, 
        time,
      });
      console.log(xd);
      setSuccess(true);
      setTodo('');
      setDescription('');
      setDifficulty(50);
      setDate(new Date().toISOString().split('T')[0]);
      setTime('12:00');
    } catch (err) {
      console.error("Error adding todo", err);
      alert("Error adding todo");
    }
  };

  const handleDone = async (index) => {
    const id = todos[index]._id;
    const isDone = !todos[index].isDone;
    try {
      await axios.patch(`${backendUrl}/${id}`, { isDone });
    } catch (err) {
      alert("Error updating todo",err);
    }
  };

  const handleDelete = async (index) => {
    const id = todos[index]._id;
    try {
      await axios.delete(`${backendUrl}/${id}`);
    } catch (err) {
      alert("Error deleting todo",err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // window.location.reload();
    navigate('/signin');
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        
        {success !== null && (
          <div className={`p-3 text-white text-center font-semibold rounded-lg mb-4 ${success ? 'bg-green-500' : 'bg-red-500'}`}>
            {success ? "Todo Added Successfully" : "Enter the Todo and Description Both"}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your todo"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <label>Difficulty: {difficulty}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}
            className="w-full"
          />

          <label>Date:</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <label>Time:</label>
          <input 
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={onSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Todos</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Todo</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Difficulty</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index} className={`border-b ${todo.isDone ? 'bg-green-100' : 'bg-red-100'}`}>
                <td className="py-2 px-4">{todo.todo}</td>
                <td className="py-2 px-4">{todo.description}</td>
                <td className="py-2 px-4">{todo.difficulty}</td>
                <td className="py-2 px-4">{new Date(todo.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{todo.time}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button onClick={() => handleDone(index)} className="bg-gray-500 text-white px-2 rounded cursor-pointer">{todo.isDone ? "Undo" : "Done"}</button>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 rounded cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div><button onClick={handleLogout}>Logout</button></div>
    </div>
  );
}

export default LandingPage;
