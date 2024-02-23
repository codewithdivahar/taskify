import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constant/urls";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [singleTask, setSingleTask] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/auth/loginSuccess", {
        withCredentials: true,
      });
      console.log("User ---> Details", response.data);
      setUser(response?.data?.user);
    } catch (err) {
      console.error("API error", err);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/v1/tasks", {
        withCredentials: true,
      });
      setSingleTask(response?.data?.tasks);
    } catch (err) {
      console.error("API error", err);
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/v1/allTasks", {
        withCredentials: true,
      });
      console.log("User ---> tasks", response.data);
      setAllTasks(response?.data?.tasks);
    } catch (err) {
      console.error("API error", err);
    }
  };

  const logout = () => {
    window.open(SERVER_URL + "/auth/logout?deviceType=web", "_self");
  };

  const changeStatus = async () => {
    const task = { ...singleTask };
    task.data[0].status = "COMPLETED";
    const response = await axios
      .post(
        SERVER_URL + "/v1/tasks",
        { task },
        {
          withCredentials: true,
        }
      )
      .then((response) => console.log("Update -->", response?.data))
      .catch((err) => console.log("Error in updation", err));
  };

  useEffect(() => {
    getUser();
    getTasks();
    getAllTasks();
  }, []);

  if (Object.keys(user).length === 0 && getAllTasks.length === 0) {
    return (
      <div>
        <span>Loading....</span>
        <button onClick={() => logout()}>Logout</button>;
      </div>
    );
  }

  return (
    <main>
      <button onClick={changeStatus}>Change Status</button>
      <header>
        <nav className="flex w-full h-12 border-b-2 shadow-sm items-center px-8 justify-between bg-slate-800">
          <span className="text-xl font-bold text-cyan-600">Taskify</span>
          <div className="flex justify-center items-center gap-5">
            <span className="font-semibold invert">{user?.displayName}</span>
            <button className="invert" onClick={() => logout()}>
              Logout
            </button>
            <img
              src={user.image}
              alt="user"
              className="w-9 h-9 rounded-full object-contain"
            />
          </div>
        </nav>
      </header>
      <section>
        <div className="flex justify-between items-center p-8">
          <span className="font-semibold text-2xl">OverAll Tasks</span>
          <button onClick={() => getAllTasks()}>Refresh</button>
        </div>
        <table className="w-full border-collapse">
          <tr className="h-12 border-b-2 bg-slate-800">
            <th className="invert">User</th>
            <th className="invert">Location</th>
            <th className="invert">OverAll Task</th>
            <th className="invert">Completed Task</th>
          </tr>
          {allTasks.map((item) => {
            let overAllTask = item?.data?.length;
            let completedTask = 0;
            item?.data.map((task) => {
              if (task.status === "COMPLETED") {
                completedTask++;
              }
            });
            return item?.data?.map((task, index) => {
              return (
                <tr className="h-12 border-b-2">
                  {index === 0 && (
                    <td className="font-bold" align="center" rowSpan={3}>
                      {task.displayName}
                    </td>
                  )}
                  <td align="center">{task.location}</td>
                  {index === 0 && (
                    <td
                      className="font-semibold text-lg"
                      align="center"
                      rowSpan={3}
                    >
                      {overAllTask}
                    </td>
                  )}
                  {index === 0 && (
                    <td
                      className="font-semibold text-lg"
                      align="center"
                      rowSpan={3}
                    >
                      {completedTask}
                    </td>
                  )}
                </tr>
              );
            });
          })}
        </table>
      </section>
    </main>
  );
};

export default Dashboard;
