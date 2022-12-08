import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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

function Reported() {
  const user = useSelector((state) => state.authReducer.authData);
  console.log(user, "userrr");
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    reportedpost();
  }, []);
  async function reportedpost() {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/rposts");
      console.log(data);

      setPost(data.post);
      console.log(data.post, "postsssss");
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePost(id) {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/admin/${id}/${user.user._id}/report`
      );

      reportedpost();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography variant="h4" sx={{ color: "black", marginBottom: "5px" }}>
        {" "}
        Reported Posts
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Posts</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((row, index) => (
              <Tablerow
                deletePost={deletePost}
                row={row}
                key={index}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="button infoButton"
        style={{ marginTop: "10px", position: "relative", zIndex: "1000000" }}
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
    </div>
  );
}

export default Reported;
