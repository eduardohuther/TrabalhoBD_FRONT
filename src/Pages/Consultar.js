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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
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
  const [parcelas, setParcelas] = useState([]);
  const [vendaProdutos, setVendaProdutos] = useState([]);
  const [vendaId, setVendaId] = useState(0);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [cpf, setCpf] = useState("");
  const [ddd, setDdd] = useState("");
  const [tel, setTel] = useState("");
  const [fornecedor, setFornecedor] = useState({ cod: "", nome: "" });
  const [showProduto, setShowProduto] = useState(false);
  const [showTableFornecedor, setShowTableFornecedor] = useState(false);
  const [prodId, setProdId] = useState(0);
  const [showFornecedor, setShowFornecedor] = useState(false);
  const [forncId, setForncId] = useState(0);
  const [showCliente, setShowCliente] = useState(false);
  const [clienteId, setClienteId] = useState(0);

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

  async function consultaFornecedores2() {
    await api
      .get(`/todos-fornecedor/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setFornecedores(response.data.fornecedores);
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
          setVendaId(id);
          setShowVenda(true);
          setParcelas(response.data.parcelas);
          setVendaProdutos(response.data.produtos);
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

  async function pagaParcela(id) {
    await api
      .get(`/paga-parcela/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          setShowVenda(false);
          setCode("Parcela marcada como paga!");
          setWarging("success");
          handleClick();
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

  async function deleteFornecedor(id) {
    await api
      .get(`/delete-fornecedor/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          consultaFornecedores()
          setShowFornecedor(false);
          setShowFornecedores(false);
          setCode("Fornecedor deletado!");
          setWarging("success");
          handleClick();
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

  async function deleteVenda(id) {
    await api
      .get(`/delete-venda/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          consultaVendas()
          setShowVenda(false);
          setShowVendas(false);
          setCode("Venda deletada!");
          setWarging("success");
          handleClick();
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

  async function deleteProduto(id) {
    await api
      .get(`/delete-produto/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          consultaProdutos()
          setShowProduto(false);
          setShowProdutos(false);
          setCode("Produto deletado!");
          setWarging("success");
          handleClick();
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

  async function deleteCliente(id) {
    await api
      .get(`/delete-cliente/${id}`)
      .then((response) => {
        if (response.data.status == 200) {
          consultaClientes()
          setShowCliente(false);
          setShowClientes(false);
          setCode("Cliente deletado!");
          setWarging("success");
          handleClick();
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

  function TableProdutos() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "FORNECEDOR", options: { filter: false } },
      { name: "FORNECEDOR CÓDIGO", options: { filter: false } },
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
                consultaFornecedores2()
                setProdId(tableMeta.rowData[0]);
                setNome(tableMeta.rowData[1])
                setFornecedor({cod: tableMeta.rowData[3], nome: tableMeta.rowData[2]})
                setValor(tableMeta.rowData[4].replace('.', ','))
                setShowProduto(true)
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
        item.cod_fornecedor,
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
                setClienteId(tableMeta.rowData[0])
                setNome(tableMeta.rowData[1])
                setCpf(tableMeta.rowData[2])
                setDdd(tableMeta.rowData[3].substring(0, 2))
                setTel(tableMeta.rowData[3].substring(2, 11))
                setShowCliente(true)
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

  function TableParcelas() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "PAGO", options: { filter: false } },
      { name: "VALOR", options: { filter: false, searchable: false } },
      { name: "DATA DE PAGAMENTO", options: { filter: false } },
      { name: "DATA DE VENCIMENTO", options: { filter: false } },
      {
        name: "MARCAR COMO PAGO",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            if (tableMeta.rowData[1] != "SIM") {
              return (
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    pagaParcela(tableMeta.rowData[0]);
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
              );
            } else {
              return "";
            }
          },
        },
      },
    ];

    let itensRow = [];

    parcelas.forEach((item, index) => {
      itensRow.push([
        item.id,
        item.pago.data[0] == 1 ? "SIM" : "NÃO",
        `R$ ${item.valor.toFixed(2)}`,
        item.data_pagamento != null
          ? moment(item.data_pagamento).format("DD/MM/YYYY")
          : "",
        moment(item.data_vencimento).format("DD/MM/YYYY"),
      ]);
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"PARCELAS"}
          data={itensRow}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }

  async function editarProduto() {
    setShowProduto(false);
    handleClose();
    await api
      .post(`/produto-editar`, {
        id: prodId,
        valor: valor.replace(",", ".").replace('R', '').replace("$", '').replace(' ', ''),
        nome: nome,
        cod_fornecedor: fornecedor.cod,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          consultaProdutos()
          setCode("Produto editado!");
          setWarging("success");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function editarFornecedor() {
    setShowFornecedor(false);
    handleClose();
    await api
      .post(`/fornecedor-editar`, {
        id: forncId,
        cpf: cpf,
        telefone: `${ddd}${tel}`,
        nome: nome,
        cod_fornecedor: fornecedor.cod,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          consultaFornecedores()
          setCode("Fornecedor editado!");
          setWarging("success");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function editarCliente() {
    setShowCliente(false);
    handleClose();
    await api
      .post(`/cliente-editar`, {
        id: clienteId,
        cpf: cpf,
        telefone: `${ddd}${tel}`,
        nome: nome,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          consultaClientes()
          setCode("Cliente editado!");
          setWarging("success");
          handleClick();
        }
      })
      .catch((err) => {
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  function TableFornecedores() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "CPF", options: { filter: false } },
      {
        name: "ADICIONAR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                setFornecedor({
                  cod: tableMeta.rowData[0],
                  nome: tableMeta.rowData[1],
                });
                setShowTableFornecedor(false);
              }}
            >
              <AddIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    fornecedores.forEach((item, index) => {
      itensRow.push([item.id, item.nome, item.cpf]);
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

  function TableFornecedores2() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "CPF", options: { filter: false } },
      { name: "TELEFONE", options: { filter: false } },
      {
        name: "EDITAR",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                setForncId(tableMeta.rowData[0])
                setNome(tableMeta.rowData[1])
                setCpf(tableMeta.rowData[2])
                setDdd(tableMeta.rowData[3].substring(0, 2))
                setTel(tableMeta.rowData[3].substring(2, 11))
                setShowFornecedor(true)
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
      itensRow.push([item.id, item.nome, item.cpf, item.telefone]);
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

  return (
    <div>
      <Navbar valor={1} />
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
          <TableFornecedores2 />
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
        maxWidth={"md"}
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
          >
            <TableParcelas />
          </div>
          <div
            style={{
              marginTop: 5,
              textAlign: "center",
            }}
          >
            <Typography>PRODUTOS:</Typography>
          </div>
          <div
            style={{
              marginTop: 5,
            }}
          >
            {vendaProdutos.map((prod, index) => {
              return (
                <div key={index} style={{ textAlign: "center" }}>
                  <Typography>
                    {prod.nome} - {prod.quantidade}x R$ {prod.valor_unitario} =
                    R$
                    {prod.valor_total.toFixed(2)}
                  </Typography>
                </div>
              );
            })}
          </div>
          <div
            className="row"
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                deleteVenda(vendaId);
              }}
              variant="contained"
              className={classes.orange}
              startIcon={<DeleteIcon />}
              style={{ margin: "auto", width: "50%" }}
            >
              DELETAR VENDA
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={showProduto}
        onClose={() => setShowProduto(false)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowProduto(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              EDITAR PRODUTO
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (
                  valor.replace(",", ".").replace('R', '').replace("$", '').replace(' ', '') >= 0 &&
                  nome.length > 0 &&
                  fornecedor.cod > 0
                )
                  editarProduto();
              }}
            >
              EDITAR
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ backgroundColor: "#282c34" }}>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              autoFocus
              margin="dense"
              id="nome"
              label="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              inputProps={{ maxLength: 80 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="valor"
              label="Valor (R$)"
              type="text"
              value={valor}
              onKeyPress={(event) => {
                if (!/[0-9]|[,]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                if ((e.target.value.match(/[,]/g) || []).length <= 1) {
                  setValor(e.target.value);
                }
              }}
              inputProps={{ maxLength: 18 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              label="Fornecedor"
              value={fornecedor.nome}
              disabled={true}
              inputProps={{ maxLength: 9 }}
              style={{ marginTop: "auto", width: "60%" }}
            />

            <IconButton
              style={{ marginTop: "auto", width: "20%" }}
              onClick={() => {
                setShowTableFornecedor(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
          <div
            className="row"
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                deleteProduto(prodId);
              }}
              variant="contained"
              className={classes.orange}
              startIcon={<DeleteIcon />}
              style={{ margin: "auto", width: "50%" }}
            >
              DELETAR PRODUTO
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showTableFornecedor}
        onClose={() => setShowTableFornecedor(false)}
        maxWidth={"sm"}
        fullWidth
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VISUALIZAR FORNECEDORES
            </Typography>
            <Button
              color="inherit"
              onClick={() => setShowTableFornecedor(false)}
            >
              FECHAR
            </Button>
          </Toolbar>
        </AppBar>
        <TableFornecedores />
      </Dialog>

      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={showFornecedor}
        onClose={() => setShowFornecedor(false)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowFornecedor(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              EDITAR FORNECEDOR
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (
                  cpf.length == 11 &&
                  nome.length > 0 &&
                  ddd.length == 2 &&
                  tel.length >= 8
                )
                 editarFornecedor();
              }}
            >
              EDITAR
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ backgroundColor: "#282c34" }}>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              autoFocus
              margin="dense"
              id="nome"
              label="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              inputProps={{ maxLength: 80 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="cpf"
              label="CPF"
              type="text"
              value={cpf}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setCpf(e.target.value)}
              inputProps={{ maxLength: 11 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="ddd"
              label="DDD"
              type="text"
              value={ddd}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setDdd(e.target.value)}
              inputProps={{ maxLength: 2 }}
              style={{ marginTop: "auto", width: "20%" }}
            />
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="tel"
              label="Telefone"
              type="text"
              value={tel}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setTel(e.target.value)}
              inputProps={{ maxLength: 9 }}
              style={{ marginTop: "auto", width: "60%" }}
            />
          </div>

          <div
            className="row"
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                deleteFornecedor(forncId);
              }}
              variant="contained"
              className={classes.orange}
              startIcon={<DeleteIcon />}
              style={{ margin: "auto", width: "50%" }}
            >
              DELETAR FORNECEDOR
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={showCliente}
        onClose={() => setShowCliente(false)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowCliente(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              EDITAR CLIENTE
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (
                  cpf.length == 11 &&
                  nome.length > 0 &&
                  ddd.length == 2 &&
                  tel.length >= 8
                )
                  editarCliente();
              }}
            >
              EDITAR
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ backgroundColor: "#282c34" }}>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              autoFocus
              margin="dense"
              id="nome"
              label="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              inputProps={{ maxLength: 80 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="cpf"
              label="CPF"
              type="text"
              value={cpf}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setCpf(e.target.value)}
              inputProps={{ maxLength: 11 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="ddd"
              label="DDD"
              type="text"
              value={ddd}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setDdd(e.target.value)}
              inputProps={{ maxLength: 2 }}
              style={{ marginTop: "auto", width: "20%" }}
            />
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              margin="dense"
              id="tel"
              label="Telefone"
              type="text"
              value={tel}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setTel(e.target.value)}
              inputProps={{ maxLength: 9 }}
              style={{ marginTop: "auto", width: "60%" }}
            />
          </div>

          <div
            className="row"
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                deleteCliente(clienteId);
              }}
              variant="contained"
              className={classes.orange}
              startIcon={<DeleteIcon />}
              style={{ margin: "auto", width: "50%" }}
            >
              DELETAR Cleinte
            </Button>
          </div>
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
