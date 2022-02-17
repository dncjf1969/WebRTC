import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { purple } from "@material-ui/core/colors";
import "./Mypage.css";
export default function MyTable({ Personality, Job, Debate, PT }) {
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
      minHeight: 180,
      backgroundColor: "white",
    },
    container: {
      width: "100%",
    },
  });

  function createData(
    name,
    intervCategory,
    interviewCounting,
    interviewBestmember
  ) {
    return { name, intervCategory, interviewCounting, interviewBestmember };
  }

  // console.log(Personality)
  // console.log(Job)
  // console.log(Debate)
  // console.log(PT)
  const classes = useStyles();
  const rows = [
    createData(
      "면접 횟수",
      <h1>
        <b>{Personality}</b>
      </h1>,
      <h1>
        <b>{Job}</b>
      </h1>,
      <h1>
        <b>{Debate}</b>
      </h1>,
      <h1>
        <b>{PT}</b>
      </h1>
    ),
    // createData('Best Member', 0, 0, 0),
  ];

  return (
    <TableContainer id="table" component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell id="black" align="center">
              인성면접
            </TableCell>
            <TableCell align="center">직무면접</TableCell>
            <TableCell align="center">토론면접</TableCell>
            <TableCell align="center">PT면접</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow align="center" key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.intervCategory}</TableCell>
              <TableCell align="center">{row.interviewCounting}</TableCell>
              <TableCell align="center">{row.interviewBestmember}</TableCell>
              <TableCell align="center">{row.interviewBestmember}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
