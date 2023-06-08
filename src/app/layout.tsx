"use client";

import { Box, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Box sx={{ marginTop: 2.5 }}>{children}</Box>
      </body>
    </html>
  );
}
