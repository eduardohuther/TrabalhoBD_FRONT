import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Navbar({ valor }) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(valor);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="CADASTRAR" icon={<AddIcon />} onClick={() => history.push("/")}/>
        <BottomNavigationAction label="CONSULTAR" icon={<SearchIcon />} onClick={() => history.push("/consultar")}/>
        <BottomNavigationAction label="RELATÓRIOS" icon={<EqualizerIcon/>} onClick={() => history.push("/relatorios")}/>
        <BottomNavigationAction label="SAIR" icon={<CloseIcon />} onClick={() => {
          localStorage.removeItem('usertoken')
          localStorage.removeItem('cpf')
          history.push('/login')
        }}/>
      </BottomNavigation>
    </div>
  );
}

export default Navbar;
