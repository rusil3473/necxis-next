"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Container, Paper, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '@/provider/AuthProvider';
import TextField from '@mui/material/TextField';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password must be at most 20 characters long" })
})
type userType = z.infer<typeof userSchema>;

function SignIn() {
  const { user, handleSignIn: signIn, handleSignInWithPassword } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();


  const { control, handleSubmit, watch } = useForm<userType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });


  const onSignIn = async (data: userType) => {
    setIsLoading(true);
    try {
      handleSignInWithPassword(data);
      router.refresh();
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return (
      <Container sx={{display:"flex",justifyContent: 'center', alignItems: 'center',height:"100vh"}}>
          <CircularProgress />
      </Container>)
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#f5f5f5", flexDirection: 'column', gap: 2, borderRadius: 7 }}>
      <Paper sx={{ padding: 5, width: { xs: 350, sm: 400 } }}>
        <Typography textAlign={"center"} sx={{ fontWeight: "500", fontSize: 30, marginBottom: 3 }}>Sign In</Typography>
        <Paper elevation={0} sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 5, bgcolor: "#fff", borderRadius: 2, boxShadow: 3 }}>
          <Paper elevation={0} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Controller
              name='email'
              control={control}
              render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => {
                return (
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={!!error}
                    helperText={error?.message}
                  />
                )
              }}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => {
                return (
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error?.message}
                  />
                )
              }}
            />
          </Paper>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, margin: 3 }}>
          <Button variant={isLoading ? "contained" : "outlined"} color="primary" fullWidth disabled={isLoading} onClick={handleSubmit(onSignIn)}>
            Sign In
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, margin: 3, flexDirection: "row" }}>
          <Typography>
            Already a user?{" "}
            <Link href="/signIn" >
              <Typography component="span" sx={{ color: "primary", textDecoration: "underline", cursor: "pointer", "&:hover": { color: "primary.dark" } }}>
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
      <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>OR</Typography>
      <Box>
        <Button variant="outlined" startIcon={<GoogleIcon />} onClick={signIn}>
          SignIn with Google
        </Button>
      </Box>
    </Container>
  )
}

export default SignIn
