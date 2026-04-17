import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../header/Header";
import Sidebar from "../sideBar/SideBar";

export default function Layout({ children, links }) {
  const [open, setOpen] =useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        links={links}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ marginTop: 64 }} />
        {children}
      </Box>
    </Box>
  );
}
