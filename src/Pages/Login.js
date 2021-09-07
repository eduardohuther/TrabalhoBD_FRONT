import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loadButton, setLoadButton] = useState(true);
  const [code, setCode] = useState("Login inválido!");
  const [warning, setWarging] = useState("error");
  const [open, setOpen] = React.useState(false);

  async function makeLogin(e) {
    e.preventDefault();
    handleClose();
    if (cpf.length != 11) {
      setCode("Por favor, digite o CPF");
      setWarging("error");
      return handleClick();
    }
    if (password.length < 1 || password == "") {
      setCode("Por favor, digite a sua senha.");
      setWarging("error");
      return handleClick();
    }
    setLoadButton(false);
    await api
      .get(`/usuario-login/${cpf}/${password}`)
      .then((response) => {
        if (response.data.status == "200") {
          localStorage.setItem("usertoken", response.data.token);
          localStorage.setItem("cpf", cpf);
          history.push("/");
        } else {
          setCode("Login inválido!");
          setWarging("error");
          setPassword("");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Login inválido!");
        setWarging("error");
        setPassword("");
        handleClick();
      });
    setLoadButton(true);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "auto",
              width: "50%",
              height: "100%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <h2>Fazer Login no Sistema</h2>
          </div>
        </div>
        <div>
          <img src="/logo.png">
          
          </img>
        </div>
        <form
          onSubmit={makeLogin}
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              marginTop: 10,
            }}
          >
            <TextField
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
              }}
              className={classes.margin}
              id="input-with-icon-textfield"
              type="search"
              required
              label="CPF"
              placeholder="Digite o CPF"
              inputProps={{ maxLength: 11 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={classes.margin}
              id="input-with-icon-textfield2"
              type={"password"}
              label="Senha"
              placeholder="Digite a senha"
              inputProps={{ maxLength: 30 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div style={{ marginTop: 5 }}>
            {loadButton ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  endIcon={<SubdirectoryArrowRightIcon />}
                >
                  {" "}
                  Entrar{" "}
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress style={{ margin: "auto" }} />
              </div>
            )}
          </div>
        </form>
      </div>

      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={warning}>
          {code}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
