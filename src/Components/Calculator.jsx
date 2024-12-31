import React, { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

const Calculator = () => {
  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState([]);

  const initializeMatrix = () =>
    Array.from({ length: rows }, () => Array(cols).fill());

  const handleGenerate = () => {
    setMatrixA(initializeMatrix());
    setMatrixB(initializeMatrix());
    setResultMatrix([]);
  };

  const handleInputChange = (matrixSetter, rowIndex, colIndex, value) => {
    matrixSetter((prev) => {
      const updated = prev.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? value : cell
        )
      );
      return updated;
    });
  };

  const calculateResult = (operation) => {
    if (!matrixA.length || !matrixB.length) return;

    const newResult = matrixA.map((row, i) =>
      row.map((_, j) => {
        if (operation === "add") return matrixA[i][j] + matrixB[i][j];
        if (operation === "subtract") return matrixA[i][j] - matrixB[i][j];
        if (operation === "multiply") {
          return matrixA[i].reduce(
            (sum, _, k) => sum + matrixA[i][k] * matrixB[k][j],
            0
          );
        }
        return 0;
      })
    );

    setResultMatrix(newResult);
  };

  const renderMatrix = (matrix, matrixSetter) => (
    <Grid container spacing={1}>
      {matrix.map((row, rIdx) => (
        <Grid item xs={12} key={rIdx}>
          {row.map((cell, cIdx) => (
            <TextField
              key={`${rIdx}-${cIdx}`}
              type="number"
              value={cell}
              onChange={(e) =>
                handleInputChange(
                  matrixSetter,
                  rIdx,
                  cIdx,
                  Number(e.target.value)
                )
              }
              style={{ width: 70, margin: 4 }}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container sx={{ mt: 3 }}>
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

      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate Matrices
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setRows(0);
            setCols(0);
            setMatrixA([]);
            setMatrixB([]);
            setResultMatrix([]);
          }}
          sx={{ ml: 2 }}
        >
          Refresh
        </Button>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Matrix A</Typography>
          {renderMatrix(matrixA, setMatrixA)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Matrix B</Typography>
          {renderMatrix(matrixB, setMatrixB)}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
        {["add", "subtract", "multiply"].map((op) => (
          <Button
            key={op}
            variant="contained"
            color="secondary"
            onClick={() => calculateResult(op)}
            sx={{ mx: 1, my: 1 }}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </Button>
        ))}
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
