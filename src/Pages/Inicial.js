import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "50%",
    height: 65,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Inicial() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: 25, marginBottom: 25 }}>
        Página Inicial
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <DescriptionIcon />
          </IconButton>
          <InputBase
            autoComplete="off"
            className={classes.input}
            placeholder="Pesquise cpf, codigo de produto, codigo de venda, nome..."
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value={0}>Cliente</MenuItem>
              <MenuItem value={1}>Produto</MenuItem>
              <MenuItem value={2}>Fornecedor</MenuItem>
              <MenuItem value={3}>Venda</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>
    </div>
  );
}

export default Inicial;
