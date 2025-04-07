"use client";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import {useAuth} from "@/provider/AuthProvider"


export default function Header() {
	const {handleSignOut}=useAuth();
  return (
  <Container sx={{}}>
    <Box
      sx={{
      height:"100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        backgroundColor:"blue"
      }}
    >
   
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold",fontSize:{xs:"0.8rem",sm:"1rem",md:"1.5rem"}}}>
          Rusil Varu
        </Typography>
      </Box>

      
      <Box sx={{ display: "flex", flexDirection: "row", gap:{xs:1,sm:2,md:3}, alignItems: "center",}}>
        <Link
          href="https://www.github.com/rusil3473"
          target="_blank"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GitHubIcon />
            <Typography variant="body1" sx={{fontSize:{xs:"0.7rem",sm:"0.87rem",md:"1.5rem"}}}>GitHub</Typography>
          </Box>
        </Link>
        <Link
          href="https://www.linkedin.com/in/rusil-varu-964086335"
          target="_blank"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LinkedInIcon />
            <Typography variant="body1" sx={{fontSize:{xs:"0.7rem",sm:"0.87rem",md:"1.5rem"}}}>LinkedIn</Typography>
          </Box>
        </Link>
        <Button variant="contained" color="error" sx={{fontSize: { xs: '0.75rem', sm: '0.875rem' },    padding: { xs: '4px 8px', sm: '6px 16px' },minWidth: 'auto',whiteSpace:'nowrap'}} onClick={handleSignOut}>Sign Out</Button>
      </Box>
    </Box>
    </Container>
  );
}
