//For one remark
// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const [currentRemark, setCurrentRemark] = useState(""); // State for input remark

//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([...tasks, { text: newTask, completed: false, remark: '' }]);
//       setNewTask("");
//     }
//   };

//   const toggleComplete = (index) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };

//   const removeTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const handleRemarkChange = (e) => {
//     setCurrentRemark(e.target.value);
//   };

//   const addRemark = (index) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, remark: currentRemark } : task
//     );
//     setTasks(updatedTasks);
//     setCurrentRemark(""); // Clear the input
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-200 p-4">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
//         <div className="flex mb-4">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Enter a new task"
//             className="flex-1 p-2 rounded-l-lg border-none bg-gray-700 text-white focus:outline-none"
//           />
//           <button
//             onClick={addTask}
//             className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
//           >
//             Add Task
//           </button>
//         </div>

//         <ul className="space-y-3">
//           {tasks.map((task, index) => (
//             <li
//               key={index}
//               className={`flex justify-between items-center p-2 ${
//                 task.completed ? "line-through text-gray-500" : ""
//               } bg-gray-700 rounded-lg`}
//             >
//               <span>{task.text}</span>
//               <div>
//                 <button
//                   onClick={() => toggleComplete(index)}
//                   className="mr-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md"
//                 >
//                   {task.completed ? "Undo" : "Complete"}
//                 </button>
//                 <button
//                   onClick={() => removeTask(index)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
//                 >
//                   Delete
//                 </button>
//                 {task.completed && !task.remark && (
//                   <div className="mt-2">
//                     <input
//                       type="text"
//                       value={currentRemark}
//                       onChange={handleRemarkChange}
//                       placeholder="Add a remark"
//                       className="p-2 bg-gray-700 text-white rounded-md mr-2"
//                     />
//                     <button
//                       onClick={() => addRemark(index)}
//                       className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
//                     >
//                       Add Remark
//                     </button>
//                   </div>
//                 )}
//                 {task.remark && (
//                   <div className="mt-2 text-gray-300">
//                     Remark: {task.remark}
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [remarks, setRemarks] = useState({});
  const [remarksCompleted, setRemarksCompleted] = useState({});

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, remarks: [] }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setRemarks((prev) => {
      const newRemarks = { ...prev };
      delete newRemarks[index];
      return newRemarks;
    });
    setRemarksCompleted((prev) => {
      const newRemarksCompleted = { ...prev };
      delete newRemarksCompleted[index];
      return newRemarksCompleted;
    });
  };

  const handleRemarkChange = (taskIndex, remarkIndex, value) => {
    setRemarks((prev) => ({
      ...prev,
      [taskIndex]: prev[taskIndex].map((remark, i) =>
        i === remarkIndex ? value : remark
      ),
    }));
  };

  const addRemark = (taskIndex) => {
    if (!remarksCompleted[taskIndex]) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex].remarks = [
          ...updatedTasks[taskIndex].remarks,
          remarks[taskIndex]?.[updatedTasks[taskIndex].remarks.length] || '',
        ];
        return updatedTasks;
      });
      setRemarks((prev) => ({
        ...prev,
        [taskIndex]: [...(prev[taskIndex] || []), ''],
      }));
    }
  };

  const removeRemark = (taskIndex, remarkIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex].remarks = updatedTasks[taskIndex].remarks.filter(
        (_, i) => i !== remarkIndex
      );
      return updatedTasks;
    });
    setRemarks((prev) => ({
      ...prev,
      [taskIndex]: prev[taskIndex].filter((_, i) => i !== remarkIndex),
    }));
  };

  const completeRemarks = (taskIndex) => {
    setRemarksCompleted((prev) => ({
      ...prev,
      [taskIndex]: true,
    }));
  };

  const undoCompleteRemarks = (taskIndex) => {
    setRemarksCompleted((prev) => ({
      ...prev,
      [taskIndex]: false,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto flex-1">
        <h1 className="text-3xl font-semibold text-center mb-6 text-teal-400">Task Manager</h1>
        <div className="flex mb-6 space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 p-4 rounded-l-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={addTask}
            className="p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-r-lg transition duration-300"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-6">
          {tasks.map((task, taskIndex) => (
            <li
              key={taskIndex}
              className={`flex flex-col p-6 ${
                task.completed ? "bg-gray-700 text-gray-500" : "bg-gray-700 text-gray-200"
              } rounded-lg shadow-md transition duration-300`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className={`flex-1 text-lg ${task.completed ? "line-through" : ""}`}>
                  {task.text}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleComplete(taskIndex)}
                    className={`px-4 py-2 rounded-md text-white transition duration-300 ${
                      task.completed ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => removeTask(taskIndex)}
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {task.completed && (
                <div className="mt-4 space-y-4">
                  {remarks[taskIndex]?.map((remark, remarkIndex) => (
                    <div key={remarkIndex} className="flex items-center space-x-4 mb-2">
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) =>
                          handleRemarkChange(taskIndex, remarkIndex, e.target.value)
                        }
                        placeholder="Add a remark"
                        className="p-2 bg-gray-700 text-white rounded-md flex-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <button
                        onClick={() => removeRemark(taskIndex, remarkIndex)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {!remarksCompleted[taskIndex] && (
                    <button
                      onClick={() => addRemark(taskIndex)}
                      className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition duration-300 mt-2"
                    >
                      Add Remark
                    </button>
                  )}
                  {!remarksCompleted[taskIndex] && (
                    <button
                      onClick={() => completeRemarks(taskIndex)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-2 transition duration-300"
                    >
                      Complete Remarks
                    </button>
                  )}
                  {remarksCompleted[taskIndex] && (
                    <button
                      onClick={() => undoCompleteRemarks(taskIndex)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md mt-2 transition duration-300"
                    >
                      Undo Complete
                    </button>
                  )}
                </div>
              )}

              {/* {task.remarks && task.remarks.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-yellow-400">Remarks:</h4>
                  <div className="space-y-2">
                    {task.remarks.map((remark, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-md text-white ${
                          index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-500'
                        }`}
                      >
                        {remark}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
