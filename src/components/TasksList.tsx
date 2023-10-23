import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { useSelector } from "react-redux";
import { getTasks } from "../slices/tasksSlice";
import { Task } from "../utils/interfaces";

const TasksList = () => {
  const taskRecords = useSelector(getTasks);
  const [records, setRecords] = useState<Task[]>([]);

  useEffect(() => {
    setRecords(taskRecords);
  }, [taskRecords]);

  const filterBy = (field?: string) => {
    console.log(field);
    if (!field) {
      setRecords(taskRecords);
      return;
    }
    const filterRecords = records.filter((item) => item.done === field);
    console.log(filterRecords)
    setRecords(filterRecords);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar filterBy={filterBy} />
        <TableContainer sx={{ p: "10px" }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader />
            <TableRows records={records} />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TasksList;
