import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Task } from "../utils/interfaces";
import { taskSchema } from "../schemas/taskSchema";
import { ValidationError } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getSelectedTask,
  updateTask,
} from "../slices/tasksSlice";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";

const initialTask: Task = {
  title: "",
  description: "",
  dueDate: "",
  done: "created",
};

const initialErrors = {
  title: "",
  description: "",
  dueDate: "",
};

const TaskForm = () => {
  const [task, setTask] = useState(initialTask);
  const [errors, setErrors] = useState(initialErrors);
  const selected = useSelector(getSelectedTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      setTask(selected);
    }
  }, [selected]);

  const resetErrors = () => {
    setErrors(initialErrors);
  };

  const changeStatus = (status: Task["done"]) => {
    const updateTask = { ...task, done: status };
    setTask(updateTask);
  };

  const onChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = target;
    const newTask = { ...task, [name]: value };
    setTask(newTask);
  };

  const dispatchAction = (task: Task) => {
    if (selected) {
      dispatch(updateTask(task));
    } else {
      dispatch(createTask(task));
    }
    navigate("/");
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const isvalid = await taskSchema.isValid(task, { abortEarly: false });
    if (isvalid) {
      dispatchAction(task);
      resetErrors();
      setTask(initialTask);
      return;
    }

    taskSchema.validate(task, { abortEarly: false }).catch((err: any) => {
      const errors = err.inner.reduce((acc: any, error: ValidationError) => {
        return {
          ...acc,
          [error.path as string]: error.message,
        };
      }, {});

      setErrors(errors);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component={Paper}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "10px",
        }}
      >
        <Typography component="h1" variant="h6">
          {selected ? `Update ${selected.title}` : "create new task"}{" "}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={onChangeHandler}
            helperText={errors.title}
            error={!!errors.title}
            value={task.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            multiline
            rows={4}
            label="Description"
            name="description"
            onChange={onChangeHandler}
            helperText={errors.description}
            error={!!errors.description}
            value={task.description}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="dueDate"
            type="date"
            id="dueDate"
            onChange={onChangeHandler}
            helperText={errors.dueDate}
            error={!!errors.dueDate}
            value={task.dueDate}
          />
          <Stack
            direction="row"
            spacing={4}
            sx={{ mt: 2, ml: 3, flex: 1, display: "flex" }}
          >
            <ToggleButtonGroup
              value={task.done}
              exclusive
              onChange={(e, val) => changeStatus(val)}
              aria-label="text alignment"
            >
              <ToggleButton
                value="created"
                aria-label="right aligned"
                color={task.done === "created" ? "primary" : "standard"}
              >
                <FiberNewOutlinedIcon />
                New
              </ToggleButton>
              <ToggleButton
                value="complete"
                aria-label="left aligned"
                color={task.done === "complete" ? "success" : "standard"}
              >
                <DoneOutlinedIcon />
                Complete
              </ToggleButton>
              <ToggleButton
                value="in-progress"
                aria-label="centered"
                color={task.done === "in-progress" ? "info" : "standard"}
              >
                <ModelTrainingOutlinedIcon />
                In Progress
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 3 }}
          >
            {selected ? "Update Task" : "Add new task"}
          </Button>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};

export default TaskForm;
