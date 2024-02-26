import React, { useEffect } from "react";
import { SERVER_URL } from "../constant/urls";
import { useApi } from "../services/ApiServices";
import Header from "../components/Header";
import Table from "../components/Table";

const Dashboard = () => {
  const { data: loginSuccessData, callApi: callLoginAPI } =
    useApi("loginSuccess");
  const { data: allTasksData, callApi: callAllTaskAPI } = useApi("getAllTasks");

  const logout = () => {
    localStorage.removeItem("@IS_LOGGED_IN");
    window.open(SERVER_URL + "/auth/logout?deviceType=web", "_self");
  };

  useEffect(() => {
    callLoginAPI();
    callAllTaskAPI();
  }, []);

  if (
    Object.keys(loginSuccessData).length === 0 &&
    Object.keys(allTasksData).length === 0
  ) {
    return (
      <div>
        <span>Loading....</span>
      </div>
    );
  }

  return (
    <main>
      <Header
        displayName={loginSuccessData?.user?.displayName}
        image={loginSuccessData?.user?.image}
        onLogoutClick={logout}
      />

      <section>
        <div className="flex justify-between items-center p-8">
          <span className="font-semibold text-xl sm:text-2xl">
            OverAll Tasks
          </span>
          <button onClick={callAllTaskAPI}>Refresh</button>
        </div>
        {Object.keys(allTasksData).length > 0 &&
        allTasksData?.tasks?.length === 0 ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="text-lg sm:text-xl text-slate-800">
              No Active Tasks for the users
            </span>
          </div>
        ) : (
          <>
            {Object.keys(allTasksData).length > 0 && (
              <Table allTasks={allTasksData?.tasks} />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
