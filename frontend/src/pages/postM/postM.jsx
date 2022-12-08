import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import Tablerow from "../../components/tablerow/tablerow";

function PostManagement() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    postmanagement();
  }, []);
  async function postmanagement() {
    try {
      console.log("keri");
      const { data } = await axios.get("http://localhost:5000/admin/posts");
      console.log(data, "axios data");

      setPosts(data.posts);
      console.log(data.posts, "postss admin side");
    } catch (error) {
      console.log(error);
    }
  }

  //   async function updateUser(id) {
  //     try {
  //       const { data } = await axios.put("http://localhost:5000/admin/" + id, {});
  //       if (data.status) {
  //         usermanagement();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    <>
      <Typography variant="h4" sx={{ color: "black", marginBottom: "5px" }}>
        {" "}
        Post Management
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Post</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.map((row, index) => (
              <Tablerow row={row} key={index} index={index} post />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="button infoButton"
        style={{ marginTop: "10px", zIndex: "10000" }}
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
    </>
  );
}

export default PostManagement;
