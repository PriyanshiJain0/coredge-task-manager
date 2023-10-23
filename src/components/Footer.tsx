import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{ display: "block", width: "100%", height: "50px", pt: "15px", borderTop: '1px' }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Developed By © "}
        <Link
          color="inherit"
          target={"_blank"}
          href="https://www.linkedin.com/in/priyanshijainn/"
        >
          Priyanshi Jain
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
