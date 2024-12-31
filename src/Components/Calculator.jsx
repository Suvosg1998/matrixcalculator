import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const Calculator = () => {
  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState([]);

  const handleGenerate = () => {
    const generateMatrix = () => {
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      );
    };

    setMatrixA(generateMatrix());
    setMatrixB(generateMatrix());
    setResultMatrix([]);
  };

  const handleInputChange = (matrixSetter, matrix, rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value : cell))
    );
    matrixSetter(newMatrix);
  };

  const calculateResult = (operation) => {
    if (matrixA.length === 0 || matrixB.length === 0) return;

    const newResult = matrixA.map((row, i) =>
      row.map((cell, j) => {
        if (operation === "add") return matrixA[i][j] + matrixB[i][j];
        if (operation === "subtract") return matrixA[i][j] - matrixB[i][j];
        if (operation === "multiply") {
          return matrixA[i].reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0);
        }
        return 0;
      })
    );

    setResultMatrix(newResult);
  };

  const handleRefresh = () => {
    setRows(0);
    setCols(0);
    setMatrixA([]);
    setMatrixB([]);
    setResultMatrix([]);
  };

  const renderMatrix = (matrix, setMatrix) => (
    <Grid container spacing={2}>
      {matrix.map((row, rowIndex) => (
        <Grid item xs={12} key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <TextField
              key={`cell-${rowIndex}-${colIndex}`}
              type="number"
              value={cell}
              onChange={(e) =>
                handleInputChange(setMatrix, matrix, rowIndex, colIndex, Number(e.target.value))
              }
              style={{ width: 70, margin: 4 }}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Matrix Calculator
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            width="50%"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Columns"
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            width="50%"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleGenerate}>
            Generate Matrices
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleRefresh} sx={{color: 'white', backgroundColor: 'red'}}>
            Refresh
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ marginTop: 16 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Matrix A</Typography>
          {renderMatrix(matrixA, setMatrixA)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Matrix B</Typography>
          {renderMatrix(matrixB, setMatrixB)}
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => calculateResult("add")}
          >
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => calculateResult("subtract")}
          >
            Subtract
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => calculateResult("multiply")}
          >
            Multiply
          </Button>
        </Grid>
      </Grid>

      {resultMatrix.length > 0 && (
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Typography variant="h6">Result Matrix</Typography>
          {renderMatrix(resultMatrix, () => {})}
        </div>
      )}
    </Container>
  );
};

export default Calculator;
