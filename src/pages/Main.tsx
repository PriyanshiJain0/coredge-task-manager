import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Container
      component={"main"}
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          pt: "50px",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
};

export default Main;
