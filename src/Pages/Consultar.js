import React, { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "./Navbar";
import { theme, options } from "./table_theme";
import MUIDataTable from "mui-datatables";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
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

function Consultar() {
  const classes = useStyles();
  const [vendas, setVendas] = useState([]);
  const [showVendas, setShowVendas] = useState(false);
  const [showVenda, setShowVenda] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [showProdutos, setShowProdutos] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const [showFornecedores, setShowFornecedores] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [showClientes, setShowClientes] = useState(false);

  const [code, setCode] = useState("Login inválido!");
  const [warning, setWarging] = useState("error");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function consultaVendas() {
    await api
      .get(`/todas-venda/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setVendas(response.data.vendas);
          setShowVendas(true);
        } else {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function consultaProdutos() {
    await api
      .get(`/todos-produto/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setProdutos(response.data.produtos);
          setShowProdutos(true);
        } else {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function consultaFornecedores() {
    await api
      .get(`/todos-fornecedor/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setFornecedores(response.data.fornecedores);
          setShowFornecedores(true);
        } else {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function consultaClientes() {
    await api
      .get(`/todos-cliente/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setClientes(response.data.clientes);
          setShowClientes(true);
        } else {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function consultaVenda(id) {
    await api
      .get(`/venda/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          setShowVenda(true);
        } else {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  function TableVendas() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "CLIENTE", options: { filter: false } },
      { name: "VALOR", options: { filter: false, searchable: false } },
      { name: "PAGO", options: { filter: false, searchable: false } },
      { name: "DATA", options: { filter: false } },
      { name: "PARCELAS", options: { filter: false, searchable: false } },
      {
        name: "ABRIR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                consultaVenda(tableMeta.rowData[0]);
              }}
            >
              <FolderOpenIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    vendas.forEach((item, index) => {
      itensRow.push([
        item.id,
        item.nome_cliente,
        `R$ ${item.valor_total.toFixed(2)}`,
        item.pago.data[0] == 1 ? "SIM" : "NÃO",
        moment(item.data).format("DD/MM/YYYY"),
        item.parcelas,
      ]);
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"VENDAS"}
          data={itensRow}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }

  function TableProdutos() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "FORNECEDOR", options: { filter: false } },
      { name: "VALOR", options: { filter: false, searchable: false } },
      {
        name: "ABRIR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                consultaVenda(tableMeta.rowData[0]);
              }}
            >
              <FolderOpenIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    produtos.forEach((item, index) => {
      itensRow.push([
        item.id,
        item.nome,
        item.nome_fornecedor,
        `R$ ${item.valor.toFixed(2)}`,
      ]);
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"PRODUTOS"}
          data={itensRow}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }

  function TableFornecedores() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "CPF", options: { filter: false } },
      { name: "TELEFONE", options: { filter: false } },
      { name: "PRODUTOS", options: { filter: false, searchable: false } },
      {
        name: "ABRIR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                consultaVenda(tableMeta.rowData[0]);
              }}
            >
              <FolderOpenIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    fornecedores.forEach((item, index) => {
      itensRow.push([
        item.id,
        item.nome,
        item.cpf,
        item.telefone,
        item.produtos,
      ]);
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"FORNECEDORES"}
          data={itensRow}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }

  function TableClientes() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "CPF", options: { filter: false } },
      { name: "TELEFONE", options: { filter: false } },
      { name: "COMPRAS", options: { filter: false, searchable: false } },
      {
        name: "ABRIR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                consultaVenda(tableMeta.rowData[0]);
              }}
            >
              <FolderOpenIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    clientes.forEach((item, index) => {
      itensRow.push([
        item.id,
        item.nome,
        item.cpf,
        item.telefone,
        item.compras,
      ]);
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"CLIENTES"}
          data={itensRow}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }

  return (
    <div>
      <Navbar valor={2} />
      <h1 style={{ textAlign: "center", marginTop: 25, marginBottom: 25 }}>
        CONSULTAS
      </h1>

      <div>
        <div
          className="row"
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => {
              setShowProdutos(false);
              setShowVendas(false);
              setShowFornecedores(false);
              setShowClientes(false);
              consultaClientes();
            }}
            variant="contained"
            className={classes.blue}
            startIcon={<AccountCircleIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            CLIENTE
          </Button>
        </div>

        <div
          className="row"
          style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => {
              setShowProdutos(false);
              setShowVendas(false);
              setShowFornecedores(false);
              setShowClientes(false);
              consultaFornecedores();
            }}
            variant="contained"
            className={classes.blue}
            startIcon={<HomeWorkIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            FORNECEDOR
          </Button>
        </div>

        <div
          className="row"
          style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => {
              setShowProdutos(false);
              setShowVendas(false);
              setShowFornecedores(false);
              setShowClientes(false);
              consultaProdutos();
            }}
            variant="contained"
            className={classes.blue}
            startIcon={<LocalMallIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            PRODUTO
          </Button>
        </div>

        <div
          className="row"
          style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => {
              setShowVendas(false);
              setShowProdutos(false);
              setShowFornecedores(false);
              setShowClientes(false);
              consultaVendas();
            }}
            variant="contained"
            className={classes.orange}
            startIcon={<LocalAtmIcon />}
            style={{ margin: "auto", width: "50%" }}
          >
            VENDA
          </Button>
        </div>
      </div>

      {showVendas ? (
        <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: 25 }}>
          <TableVendas />
        </div>
      ) : (
        ""
      )}

      {showProdutos ? (
        <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: 25 }}>
          <TableProdutos />
        </div>
      ) : (
        ""
      )}

      {showFornecedores ? (
        <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: 25 }}>
          <TableFornecedores />
        </div>
      ) : (
        ""
      )}

      {showClientes ? (
        <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: 25 }}>
          <TableClientes />
        </div>
      ) : (
        ""
      )}

      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={showVenda}
        onClose={() => setShowVenda(false)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowVenda(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              VENDA
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ backgroundColor: "#282c34" }}>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          ></div>
        </DialogContent>
      </Dialog>

      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={warning}>
          {code}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Consultar;
