import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Task } from "../utils/interfaces";

interface HeadCell {
  field: keyof Task | "actions";
  label: string;
  align: "left" | "right";
}

const headCells: readonly HeadCell[] = [
  {
    field: "title",
    label: "Title",
    align: "left",
  },
  {
    field: "description",
    label: "Description",
    align: "left",
  },
  {
    field: "dueDate",
    label: "Due Date",
    align: "right",
  },
  {
    field: "done",
    label: "Status",
    align: "right",
  },
  {
    field: "actions",
    label: "Actions",
    align: "right",
  },
];

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align={'left'}>#</TableCell>
        {headCells.map(({ label, align }) => (
          <TableCell align={align}>{label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
