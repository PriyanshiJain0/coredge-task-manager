import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { SyntheticEvent, useState } from "react";
import Divider from "@mui/material/Divider";

interface ToolbarProps {
  filterBy: (field?: string) => void;
}

function TableToolbar({ filterBy }: ToolbarProps) {
  const [open, setOpen] = useState<any>(null);

  const handleOpenMenu = (event: SyntheticEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...{
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Task List
        </Typography>
        <Tooltip title="Filter list">
          <IconButton onClick={handleOpenMenu}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 20, horizontal: 50 }}
        transformOrigin={{ vertical: 20, horizontal: 50 }}
      >
        <MenuItem onClick={() => filterBy("created")}>Created</MenuItem>
        <Divider />
        <MenuItem onClick={() => filterBy("in-progress")}>In progress</MenuItem>
        <Divider />
        <MenuItem onClick={() => filterBy("complete")}>Complete</MenuItem>
        <Divider />
        <MenuItem onClick={() => filterBy()}>Clear Filter</MenuItem>
      </Popover>
    </>
  );
}

export default TableToolbar;
