import * as React from "react";
import {
  Box,
  TextField,
  Container,
  Paper,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Student() {
  // State variables
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [address, setAddress] = useState("");

  // Function to handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New student added");
      setName("");
      setAddress("");
      fetchStudents(); // Refresh student list
    });
  };

  // Function to fetch students
  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      {/* Add Student Form */}
      <Paper
        elevation={6}
        sx={{
          padding: "30px",
          width: "100%",
          maxWidth: 500,
          margin: "50px auto",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Add Student
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Students List */}
      <Typography variant="h4" align="center" color="secondary" sx={{ mt: 4 }}>
        Students List
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {students.map((student) => (
          <Card
            key={student.id}
            elevation={4}
            sx={{
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#e3f2fd",
              width: 250,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="primary">
                ID: {student.id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {student.name}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {student.address}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
