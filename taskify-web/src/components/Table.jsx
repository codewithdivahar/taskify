import React from "react";

const Table = ({ allTasks }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="h-12 border-b-2 bg-slate-800">
          <th className="invert">User</th>
          <th className="invert">Location</th>
          <th className="invert">OverAll Task</th>
          <th className="invert">Completed Task</th>
        </tr>
      </thead>
      <tbody>
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
              <tr className="h-12 border-b-2" key={index}>
                {index === 0 && (
                  <td className="font-bold" align="center" rowSpan={4}>
                    {task.displayName}
                  </td>
                )}
                <td align="center">{task.location}</td>
                {index === 0 && (
                  <td
                    className="font-semibold text-lg"
                    align="center"
                    rowSpan={4}
                  >
                    {overAllTask}
                  </td>
                )}
                {index === 0 && (
                  <td
                    className="font-semibold text-lg"
                    align="center"
                    rowSpan={4}
                  >
                    {completedTask}
                  </td>
                )}
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default Table;
