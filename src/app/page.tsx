"use client"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Header from "@/component/Header";
export default function Home() {

    return (
        <Box sx={{height:"100vh",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <Header />
            <Container
      sx={{
        minHeight: "calc(100vh - 100px - 24px)",
        display: "flex",
        flexGrow:1,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: 4,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
        Welcome to My Portfolio
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: "800px", mb: 4, color: "text.secondary" }}>
        Hi, I’m Rusil Varu—a developer passionate about building innovative solutions. Explore my work on GitHub and connect with me on LinkedIn!
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" size="large" href="https://www.github.com/rusil3473" target="_blank" rel="noopener noreferrer">
          View Projects
        </Button>
        <Button variant="outlined" color="primary" size="large" href="https://www.linkedin.com/in/rusil-varu-964086335" target="_blank" rel="noopener noreferrer">
          Contact Me
        </Button>
      </Box>
    </Container>
         
        </Box>
    )
}
