import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <BottomNavigationAction label="INICIAL" icon={<HomeIcon />} />
        <BottomNavigationAction label="CADASTRAR" icon={<AddIcon />} />
        <BottomNavigationAction label="CONSULTAR" icon={<SearchIcon />} />
        <BottomNavigationAction label="RELATÓRIOS" icon={<EqualizerIcon />} />
        <BottomNavigationAction label="SAIR" icon={<CloseIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default Navbar;
