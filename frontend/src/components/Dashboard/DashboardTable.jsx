import React, { useState } from "react";
import { PlusCircle, CheckCircle, Trash2, X } from "lucide-react";

const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between mb-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ variant, children, ...props }) => (
  <button
    className={`px-2 sm:px-6 py-2 rounded-md text-xs font-medium flex items-center ${
      variant === "danger"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full"
    {...props}
  />
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-1">
    {children}
  </label>
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select
      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full appearance-none"
      {...props}
    >
      {children}
    </select>
  </div>
);

const SelectItem = ({ children, ...props }) => (
  <option className="bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2">
    {children}
  </option>
);

const DashboardTable = () => {
  const [tasks, setTasks] = useState([
    {
      assignee: "John Doe",
      client: "Goldmines",
      package: "Starter",
      startDate: "22-01-2025",
      status: "Completed",
    },
    {
      assignee: "Jane Smith",
      client: "Money Mining",
      package: "Premium",
      startDate: "22-01-2025",
      status: "Pending",
    },
    {
      assignee: "Bob Johnson",
      client: "Billion Bucks",
      package: "Super Pro",
      startDate: "22-01-2025",
      status: "Completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    assignee: "",
    client: "",
    package: "",
    startDate: "",
    status: "Pending",
  });

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({
      assignee: "",
      client: "",
      package: "",
      startDate: "",
      status: "Pending",
    });
    setShowModal(false);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "Completed";
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatToDateInput = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`; // Converts DD-MM-YYYY to YYYY-MM-DD
  };

  const formatFromDateInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`; // Converts YYYY-MM-DD to DD-MM-YYYY
  };

  // Function to calculate time left based on the package
  const calculateTimeLeft = (startDate, packageType) => {
    const [day, month, year] = startDate.split("-").map(Number);
    const start = new Date(year, month - 1, day);

    // Set the end date based on the package type
    let end = new Date(start);
    if (packageType === "Starter") {
      end.setDate(start.getDate() + 12); // 12 days for Starter package
    } else if (packageType === "Premium") {
      end.setDate(start.getDate() + 21); // 21 days for Premium package
    } else if (packageType === "Super Pro") {
      end.setDate(start.getDate() + 30); // 30 days for Super Pro package
    }

    const currentDate = new Date();

    const timeDiff = end.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft <= 0) return "Expired";

    return `${daysLeft} days left`;
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <Button onClick={() => setShowModal(true)}>
          <PlusCircle className="mr-1 w-4 sm:w-5 h-4 sm:h-5" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-tl-lg rounded-tr-lg">
          <table className="w-full border-collapse ">
            <thead className="">
              <tr className="text-gray-700 ">
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Assignee
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Client
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Package
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Time Left
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-700"
                >
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {task.assignee}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {task.client}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {task.package}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {formatDate(task.startDate)}
                  </td>

                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {calculateTimeLeft(task.startDate, task.package)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                    {task.status === "Pending" ? (
                      <Button
                        variant="primary"
                        onClick={() => handleCompleteTask(index)}
                      >
                        <CheckCircle className="mr-1 w-4 h-4" />
                        Complete
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveTask(index)}
                      >
                        <Trash2 className="mr-1 w-4 h-4 " />
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
 {/* Add Task Modal */}
 {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-4 sm:p-8 m-[1.5rem] sm:m-0 w-full max-w-md shadow-2xl transform transition-all animate-in fade-in-0 zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Add New Task
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
              className="space-y-2"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="assignee"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Assignee
                </Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                  placeholder="Enter assignee name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="client"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Client
                </Label>
                <Input
                  id="client"
                  value={newTask.client}
                  onChange={(e) =>
                    setNewTask({ ...newTask, client: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="package"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Package
                </Label>
                <Select
                  id="package"
                  value={newTask.package}
                  onChange={(e) =>
                    setNewTask({ ...newTask, package: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                  required
                >
                  <option value="">Select a package</option>
                  <option value="Starter">Starter</option>
                  <option value="Premium">Premium</option>
                  <option value="Super Pro">Super Pro</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formatToDateInput(newTask.startDate)} // Format to YYYY-MM-DD for the input
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      startDate: formatFromDateInput(e.target.value),
                    })
                  } // Convert back to DD-MM-YYYY when changing
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Status
                </Label>
                <Select
                  id="status"
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DashboardTable;
