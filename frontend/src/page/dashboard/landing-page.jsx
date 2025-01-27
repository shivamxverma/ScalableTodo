import { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from './components/Header';

function LandingPage() {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [Difficulty,setDifficulty] = useState(0);
  const [date,setdate] = useState(Date.now());
  const [success, setsucces] = useState(null);
  const [time,settime] = useState(0);
  const backendUrl = 'http://localhost:8000/todo';
  const fetchTodos = () => {
    fetch(backendUrl)
      .then(async (res) => {
        const data = await res.json();
        setTodos(data);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onsubmit = async () => {
    if (todo === '' || description === '') {
      setsucces(false);
      return;
    }
    try {
      await axios.post(backendUrl, { todo, description, isDone: false });
      setsucces(true);
      setTodo('');
      setDescription('');
    } catch (err) {
      alert("Enter the Todo and Description Both", err);
    }
  };

  const HandleDone = async (index) => {
    const id = todos[index]._id;
    const isDone = !todos[index].isDone;
    try {
      await axios.patch(`${backendUrl}/${id}`, { isDone });
      fetchTodos();
    } catch (err) {
      alert("Error in Updating the Todo", err);
    }
  };

  const HandleDelete = async (index) => {
    const id = todos[index]._id;
    try {
      await axios.delete(`${backendUrl}/${id}`);
      fetchTodos();
    } catch (err) {
      alert("Error in Deleting the Todo", err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* <Header /> */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        
        {/* Success/Error Messages */}
        {success !== null && (
          <div className={`p-3 text-white text-center font-semibold rounded-lg mb-4 ${success ? 'bg-green-500' : 'bg-red-500'}`}>
            {success ? "Todo Added Successfully" : "Enter the Todo and Description Both"}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-3">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your todo"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Difficulty Between 1 to 100 */}
          <input
            value={Difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            type="range"
            min="1"
            max="100"
            step="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
          />
          <input 
            value = {date}
            onChange={(e) => setdate(Number(e.target.value))}
            type="date" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type = "time"
            value = {time}
            min="05:00" max="23:00"
            onChange={(e) => settime(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onsubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Todos</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Todo</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr
                key={index}
                className={`border-b ${todo.isDone ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <td className="py-2 px-4">{todo.todo}</td>
                <td className="py-2 px-4">{todo.description}</td>
                <td className="py-2 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => HandleDone(index)}
                    className={`px-4 py-1 rounded-lg font-semibold ${todo.isDone ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                  >
                    {todo.isDone ? "Done" : "Not Done"}
                  </button>
                  <button
                    onClick={() => HandleDelete(index)}
                    className="px-4 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LandingPage;
