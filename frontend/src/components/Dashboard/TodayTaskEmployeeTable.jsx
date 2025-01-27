import React, { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

// Utility function to calculate the time remaining
const calculateTimeLeft = (deadline) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeDiff = deadlineDate - now;

  if (timeDiff <= 0) return "Deadline passed";

  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${daysLeft} day(s), ${hoursLeft} hour(s), ${minutesLeft} minute(s) left`;
};

const TodayTaskEmployeeTable = () => {
  const [todayTasks, setTodayTasks] = useState([
    {
      id: 1,
      employee: "John Doe",
      client: "Goldmines",
      deadline: "2025-02-01T12:00:00", // Example deadline
      postTasks: [
        {
          id: 1,
          description: "Create social media post about product launch",
          status: "Pending",
        },
        {
          id: 2,
          description: "Design infographic for monthly report",
          status: "Pending",
        },
      ],
      reelsTasks: [
        {
          id: 1,
          description: "Record short product demo video",
          status: "Pending",
        },
      ],
      mockupTasks: [
        {
          id: 1,
          description: "Create product mockup image",
          status: "Pending",
        },
      ],
      dailyStatus: "Incomplete",
    },
    {
      id: 2,
      employee: "Jane Smith",
      client: "Money Mining",
      deadline: "2025-01-30T12:00:00", // Example deadline
      postTasks: [
        { id: 1, description: "Develop content strategy", status: "Pending" },
      ],
      reelsTasks: [
        {
          id: 1,
          description: "Shoot behind-the-scenes reel",
          status: "Pending",
        },
      ],
      mockupTasks: [
        { id: 1, description: "Design brand style mockup", status: "Pending" },
      ],
      dailyStatus: "Incomplete",
    },
  ]);

  const markTaskDone = (taskId, taskType, subtaskId) => {
    setTodayTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task };
          const targetTasks = updatedTask[`${taskType}Tasks`];

          const updatedSubtasks = targetTasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, status: "Completed" }
              : subtask
          );

          updatedTask[`${taskType}Tasks`] = updatedSubtasks;

          const allPostTasksDone = updatedTask.postTasks.every(
            (task) => task.status === "Completed"
          );
          const allReelsTasksDone = updatedTask.reelsTasks.every(
            (task) => task.status === "Completed"
          );
          const allMockupTasksDone = updatedTask.mockupTasks.every(
            (task) => task.status === "Completed"
          );

          updatedTask.dailyStatus =
            allPostTasksDone && allReelsTasksDone && allMockupTasksDone
              ? "Completed"
              : "Incomplete";

          return updatedTask;
        }
        return task;
      })
    );
  };

  const renderTaskColumn = (tasks, taskType, taskId) => (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-2">
            {task.status === "Completed" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span
              className={`text-sm ${
                task.status === "Completed"
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {task.description}
            </span>
          </div>
          {task.status !== "Completed" && (
            <button
              onClick={() => markTaskDone(taskId, taskType, task.id)}
              className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              Done
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto  py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Today's Tasks
      </h2>

      {/* Mobile/Tablet View */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {todayTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-lg border border-gray-200 p-4 rounded-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {task.client}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.dailyStatus === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {task.dailyStatus}
              </span>
            </div>

            <div className="space-y-4">
              <div className="mb-2">
                <p className="text-sm text-gray-600">
                  <strong>Deadline:</strong>{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString()
                    : "No deadline"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time Left:</strong>{" "}
                  {task.deadline
                    ? calculateTimeLeft(task.deadline)
                    : "No deadline"}
                </p>
              </div>
              <div className="h-[10rem] overflow-y-auto flex flex-col gap-4 mt-6">
                <div className="">
                  <h4 className="font-medium text-gray-600 mb-2">Post Tasks</h4>
                  {renderTaskColumn(task.postTasks, "post", task.id)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-600 mb-2">
                    Reels Tasks
                  </h4>
                  {renderTaskColumn(task.reelsTasks, "reels", task.id)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-600 mb-2">
                    Mockup Tasks
                  </h4>
                  {renderTaskColumn(task.mockupTasks, "mockup", task.id)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden overflow-x-auto rounded-tl-lg rounded-tr-lg">
        <table className="w-full table-fixed bg-white border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600/60 via-blue-600/50 to-blue-500/90 text-white">
              <th className="p-4 text-left font-medium">Client</th>
              <th className="p-4 text-left font-medium">Deadline</th>
              <th className="p-4 text-left font-medium">Time Left</th>
              <th className="p-4 text-left font-medium">Post Tasks</th>
              <th className="p-4 text-left font-medium">Reels Tasks</th>
              <th className="p-4 text-left font-medium">Mockup Tasks</th>
              <th className="p-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-100 transition-all duration-300 border-b border-gray-200"
              >
                <td className="p-4 font-medium text-gray-800">{task.client}</td>
                <td className="p-4 text-sm text-gray-600">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString()
                    : "No deadline"}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {task.deadline
                    ? calculateTimeLeft(task.deadline)
                    : "No deadline"}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {renderTaskColumn(task.postTasks, "post", task.id)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {renderTaskColumn(task.reelsTasks, "reels", task.id)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {renderTaskColumn(task.mockupTasks, "mockup", task.id)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.dailyStatus === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {task.dailyStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayTaskEmployeeTable;
