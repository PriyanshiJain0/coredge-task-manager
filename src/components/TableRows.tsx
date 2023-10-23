import TableBody from "@mui/material/TableBody";
import { Task } from "../utils/interfaces";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { removeTask, setSelected } from "../slices/tasksSlice";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

interface TabelRowProps {
  records: Task[] | any[];
}
type Actions = "delete" | "edit";

const TableRows = ({ records }: TabelRowProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActions = (task: Task, type: Actions) => {
    if (type === "delete") {
      dispatch(removeTask(task));
      return;
    }

    dispatch(setSelected(task));
    navigate("/edit-task");
  };
  return (
    <TableBody>
      {records.length ? (
        records.map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;
          const color =
            row.done === "created"
              ? "primary"
              : row.done === "complete"
              ? "success"
              : "info";
          return (
            <TableRow tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }}>
              <TableCell component="th" id={row.id} scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right">{row.dueDate}</TableCell>
              <TableCell align="right">
                <Chip label={row.done} color={color} variant={"outlined"} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    aria-label="Edit"
                    onClick={() => handleActions(row, "edit")}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    aria-label="Delete"
                    onClick={() => handleActions(row, "delete")}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow style={{ height: 53 }}>
          <TableCell sx={{ textAlign: "center" }} colSpan={6}>
            No tasks to show!
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableRows;
