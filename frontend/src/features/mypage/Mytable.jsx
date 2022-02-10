import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




export default function MyTable({Personality, Debate, PT}) {

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      minHeight: 200,
    },
    container: {
      width: '100%',
    },
  });
  
  function createData(name, intervCategory, interviewCounting, interviewBestmember ) {
    return { name, intervCategory, interviewCounting, interviewBestmember };
  }

  console.log(Personality)
  // console.log(data)
  const classes = useStyles();
  const rows = [
    createData('면접 횟수', 
    Personality, 
    Debate,
    PT,
    ),
    createData('Best Member', 0, 0, 0),
  ];
  
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow selected>
            <TableCell />
            <TableCell align="center">직무/인성면접</TableCell>
            <TableCell align="center">PT면접</TableCell>
            <TableCell align="center">토론면접</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}