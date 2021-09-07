import React, { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MuiAlert from "@material-ui/lab/Alert";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  blue: {
    backgroundColor: "rgb(14, 71, 255, 0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(14, 71, 255)",
      color: "black",
    },
  },
  orange: {
    backgroundColor: "rgb(255, 125, 0, 0.7)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(255, 125, 0)",
      color: "black",
    },
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    backgroundColor: "rgb(10, 10, 10, 0.7)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(10, 10, 10)",
      color: "#17a2b8",
    },
    padding: 10,
  },
}));

const input = "rgb(187, 187, 187)";

function Relatorios() {
  const classes = useStyles();
  const [locale, setLocale] = useState("pt-br");
  const [code, setCode] = useState("Login inválido!");
  const [warning, setWarging] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [dateInicial, setDateInicial] = useState(new Date());
  const [dateFinal, setDateFinal] = useState(new Date());

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dateChangeInicial = (date) => {
    setDateInicial(date);
  };
  const dateChangeFinal = (date) => {
    setDateFinal(date);
  };

  async function devem() {
    await api
      .get(`/cliente-devem`)
      .then((response) => {
        if (response.data.status == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          if (response.data.clientes.length > 0)
            gerarDevem(response.data.clientes);
          else {
            setCode("Nenhum registro encontrado!");
            setWarging("error");
            handleClick();
          }
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function maisVendidos() {
    await api
      .get(
        `/mais-vendidos/${moment(dateInicial).format("YYYY-MM-DD")}/${moment(
          dateFinal
        ).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        if (response.data.status == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          if (response.data.produtos.length > 0)
            gerarMaisVendidos(response.data.produtos);
          else {
            setCode("Nenhum registro encontrado!");
            setWarging("error");
            handleClick();
          }
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function maisLucrativos() {
    await api
      .get(
        `/mais-Lucrativos/${moment(dateInicial).format("YYYY-MM-DD")}/${moment(
          dateFinal
        ).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        if (response.data.status == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          if (response.data.produtos.length > 0)
            gerarMaisLucrativos(response.data.produtos);
          else {
            setCode("Nenhum registro encontrado!");
            setWarging("error");
            handleClick();
          }
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function gerarDevem(clientes) {
    let csvContent = "";

    csvContent += "NOME,CPF,TELEFONE,VALOR DEVIDO\n";

    clientes.forEach(function (item, index) {
      csvContent += `${item.nome},${item.cpf},${item.telefone},R$ ${item["SUM(p.valor)"]}\n`;
    });

    var download = function (content, fileName, mimeType) {
      var a = document.createElement("a");
      mimeType = mimeType || "application/octet-stream";

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(
          new Blob([content], {
            type: mimeType,
          }),
          fileName
        );
      } else if (URL && "download" in a) {
        a.href = URL.createObjectURL(
          new Blob([content], {
            type: mimeType,
          })
        );
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.location.href =
          "data:application/octet-stream," + encodeURIComponent(content);
      }
    };

    download(
      csvContent,
      `clientes-devem${moment().format("DD-MM-YYYY")}_${moment().format(
        "HH:mm:ss"
      )}.csv`,
      "text/csv;encoding:utf-8"
    );
  }

  async function gerarMaisVendidos(produtos) {
    let csvContent = "";

    csvContent += "NOME,QUANTIDADE,VALOR\n";

    produtos.forEach(function (item, index) {
      csvContent += `${item.nome},${item["SUM(v.quantidade)"]},R$ ${item["SUM(v.valor_total)"]}\n`;
    });

    var download = function (content, fileName, mimeType) {
      var a = document.createElement("a");
      mimeType = mimeType || "application/octet-stream";

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(
          new Blob([content], {
            type: mimeType,
          }),
          fileName
        );
      } else if (URL && "download" in a) {
        a.href = URL.createObjectURL(
          new Blob([content], {
            type: mimeType,
          })
        );
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.location.href =
          "data:application/octet-stream," + encodeURIComponent(content);
      }
    };

    download(
      csvContent,
      `produtos-mais-vendidos${moment().format("DD-MM-YYYY")}_${moment().format(
        "HH:mm:ss"
      )}.csv`,
      "text/csv;encoding:utf-8"
    );
  }

  async function gerarMaisLucrativos(produtos) {
    let csvContent = "";

    csvContent += "NOME,QUANTIDADE,VALOR\n";

    produtos.forEach(function (item, index) {
      csvContent += `${item.nome},${item["SUM(v.quantidade)"]},R$ ${item["SUM(v.valor_total)"]}\n`;
    });

    var download = function (content, fileName, mimeType) {
      var a = document.createElement("a");
      mimeType = mimeType || "application/octet-stream";

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(
          new Blob([content], {
            type: mimeType,
          }),
          fileName
        );
      } else if (URL && "download" in a) {
        a.href = URL.createObjectURL(
          new Blob([content], {
            type: mimeType,
          })
        );
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.location.href =
          "data:application/octet-stream," + encodeURIComponent(content);
      }
    };

    download(
      csvContent,
      `produtos-mais-vendidos${moment().format("DD-MM-YYYY")}_${moment().format(
        "HH:mm:ss"
      )}.csv`,
      "text/csv;encoding:utf-8"
    );
  }

  return (
    <div>
      <Navbar valor={2} />
      <h1 style={{ textAlign: "center", marginTop: 25, marginBottom: 25 }}>
        RELATÓRIOS
      </h1>

      <div>
        <div
          className="row"
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => devem()}
            variant="contained"
            className={classes.blue}
            startIcon={<AccountCircleIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            CLIENTES QUE DEVEM
          </Button>
        </div>

        <div
          className="row"
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => maisVendidos()}
            variant="contained"
            className={classes.blue}
            startIcon={<LocalMallIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            PRODUTOS MAIS VENDIDOS
          </Button>
        </div>
      </div>

      <div className="row " align="center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            borderBottom: "1px solid white",
          }}
        >
          <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
            <KeyboardDatePicker
              disableToolbar
              helperText={"dd/mm/aaaa"}
              //variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="data-inicial-inline"
              label="Data Inicial"
              value={dateInicial}
              onChange={dateChangeInicial}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginRight: "1%" }}
            />
            <KeyboardDatePicker
              helperText={"dd/mm/aaaa"}
              disableToolbar
              //variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="data-final-inline"
              label="Data Final"
              value={dateFinal}
              onChange={dateChangeFinal}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginLeft: "1%" }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div>
        <div
          className="row"
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => maisLucrativos()}
            variant="contained"
            className={classes.blue}
            startIcon={<LocalAtmIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            PRODUTOS MAIS LUCRATIVOS
          </Button>
        </div>
      </div>

      <div className="row " align="center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            borderBottom: "1px solid white",
          }}
        >
          <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
            <KeyboardDatePicker
              disableToolbar
              helperText={"dd/mm/aaaa"}
              //variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="data-inicial-inline"
              label="Data Inicial"
              value={dateInicial}
              onChange={dateChangeInicial}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginRight: "1%" }}
            />
            <KeyboardDatePicker
              helperText={"dd/mm/aaaa"}
              disableToolbar
              //variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="data-final-inline"
              label="Data Final"
              value={dateFinal}
              onChange={dateChangeFinal}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginLeft: "1%" }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={warning}>
          {code}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Relatorios;
