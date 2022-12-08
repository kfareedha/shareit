import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getUser } from "../../api/UserRequest";

function Tablerow({ row, index, deletePost, post }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const userDetails = async () => {
      const { data } = await getUser(row.userId);
      console.log(data, "asdfas");
      setUser(data);
    };
    userDetails();
  }, [row]);

  const handleDelete = async () => {
    await deletePost(row._id);
  };
  return (
    <>
      <TableRow
        key={user?.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="center" component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center">{user?.username}</TableCell>
        <TableCell align="center">{user?.email}</TableCell>
        <TableCell align="center">
          <img
            style={{ objectFit: "contain", height: "50px" }}
            src={`/images/${row?.image}`}
          />
        </TableCell>
        {!post && (
          <TableCell>
            <Button className="button infoButton" onClick={handleDelete}>
              Delete Post
            </Button>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default Tablerow;
