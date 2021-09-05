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
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";

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

function Cadastrar() {
  const classes = useStyles();
  const [showCliente, setShowCliente] = useState(false);
  const [showFornecedor, setShowFornecedor] = useState(false);
  const [showProduto, setShowProduto] = useState(false);
  const [showVenda, setShowVenda] = useState(false);
  const [inputFocus, setInputFocus] = useState(-1);
  const [fornecedores, setFornecedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [ddd, setDdd] = useState("");
  const [tel, setTel] = useState("");
  const [valor, setValor] = useState("");
  const [fornecedor, setFornecedor] = useState({ cod: "", nome: "" });
  const [showTableFornecedor, setShowTableFornecedor] = useState(false);
  const [cliente, setCliente] = useState({ cod: "", nome: "" });
  const [showTableCliente, setShowTableCliente] = useState(false);
  const [produto, setProduto] = useState([]);
  const [showTableProduto, setShowTableProduto] = useState(false);
  const [parcelas, setParcelas] = useState(1);
  const [pago_vista, setPagoVista] = useState(true);
  const [pago_metodo, setPagoMetodo] = useState(0);

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

  useEffect(() => {
    load();
  }, []);

  async function load() {
    await api
      .get(`/get-cadastros/${localStorage.getItem("usertoken")}`)
      .then((response) => {
        if (response.data.status == 200) {
          setFornecedores(response.data.fornecedores);
          setClientes(response.data.clientes);
          setProdutos(response.data.produtos);
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

  function TableClientes() {
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
                setCliente({
                  cod: tableMeta.rowData[0],
                  nome: tableMeta.rowData[1],
                });
                setShowTableCliente(false);
              }}
            >
              <AddIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    clientes.forEach((item, index) => {
      itensRow.push([item.id, item.nome, item.cpf]);
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

  function TableProdutos() {
    const columns = [
      { name: "CÓDIGO", options: { filter: false } },
      { name: "NOME", options: { filter: false } },
      { name: "VALOR", options: { filter: false, searchable: false } },
      {
        name: "QUANTIDADE",
        options: {
          filter: false,
          searchable: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <input
              type="tel"
              autoComplete="off"
              autoFocus={inputFocus == tableMeta.rowData[0]}
              onFocus={() => setInputFocus(tableMeta.rowData[0])}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                let v = event.target.value < 0 ? 1 : event.target.value;
                updateValue(v);
              }}
              style={{ backgroundColor: input, color: "black", width: "25%" }}
              value={value}
              className="form-control"
            />
          ),
        },
      },
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
                let aux = produto;
                aux.push({
                  nome: tableMeta.rowData[1],
                  cod_produto: tableMeta.rowData[0],
                  quantidade: tableMeta.rowData[3],
                  valor_unitario: tableMeta.rowData[2],
                  valor_total: tableMeta.rowData[2] * tableMeta.rowData[3],
                });
                setProduto(aux);
                setValor(
                  parseFloat(valor > 0 ? valor : 0) +
                    parseFloat(tableMeta.rowData[2] * tableMeta.rowData[3])
                );
                setShowTableProduto(false);
              }}
            >
              <AddIcon />
            </IconButton>
          ),
        },
      },
    ];

    let itensRow = [];

    produtos.forEach((item, index) => {
      itensRow.push([item.id, item.nome, item.valor, 1]);
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

  function clean() {
    setCpf("");
    setNome("");
    setDdd("");
    setTel("");
    setValor("");
    setFornecedor({ cod: "", nome: "" });
    setCliente({ cod: "", nome: "" });
    setProduto([]);
    setParcelas(1)
    setPagoMetodo(0)
    setPagoVista(1)
  }

  async function cadastroCliente() {
    setShowCliente(false);
    handleClose();
    await api
      .post(`/cliente-cadastro`, {
        cpf: cpf,
        nome: nome,
        telefone: `${ddd}${tel}`,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setShowCliente(true);
          setCode("Cliente já está cadastrado!");
          setWarging("warning");
          handleClick();
        } else {
          clean();
          setShowCliente(true);
          setCode("Cliente cadastrado!");
          setWarging("success");
          handleClick();
          load();
        }
      })
      .catch((err) => {
        setShowCliente(true);
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function cadastroFornecedor() {
    setShowFornecedor(false);
    handleClose();
    await api
      .post(`/fornecedor-cadastro`, {
        cpf: cpf,
        nome: nome,
        telefone: `${ddd}${tel}`,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setShowFornecedor(true);
          setCode("Fornecedor já está cadastrado!");
          setWarging("warning");
          handleClick();
        } else {
          clean();
          setShowFornecedor(true);
          setCode("Fornecedor cadastrado!");
          setWarging("success");
          handleClick();
          load();
        }
      })
      .catch((err) => {
        setShowFornecedor(true);
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function cadastroProduto() {
    setShowProduto(false);
    handleClose();
    await api
      .post(`/produto-cadastro`, {
        valor: valor.replace(",", "."),
        nome: nome,
        cod_fornecedor: fornecedor.cod,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setShowProduto(true);
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          clean();
          setShowProduto(true);
          setCode("Produto cadastrado!");
          setWarging("success");
          handleClick();
          load();
        }
      })
      .catch((err) => {
        setShowProduto(true);
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  async function cadastroVenda() {
    setShowVenda(false);
    handleClose();
    await api
      .post(`/venda-cadastro`, {
        valor_total: valor,
        pago: pago_vista == true ? 1 : 0,
        cod_cliente: cliente.cod,
        metodo: pago_metodo,
        produtos: produto,
        parcelas: parcelas,
        valor_parcelas: valor / parcelas,
        token: localStorage.getItem("usertoken"),
      })
      .then((response) => {
        if (response.data == 201) {
          setShowVenda(true);
          setCode("Ocorreu um erro!");
          setWarging("error");
          handleClick();
        } else {
          clean();
          setShowVenda(true);
          setCode("Venda cadastrada!");
          setWarging("success");
          handleClick();
        }
      })
      .catch((err) => {
        setShowVenda(true);
        setCode("Ocorreu um erro!");
        setWarging("error");
        handleClick();
      });
  }

  return (
    <div>
      <Navbar valor={1} />
      <h1 style={{ textAlign: "center", marginTop: 25, marginBottom: 25 }}>
        CADASTROS
      </h1>

      <div>
        <div
          className="row"
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => {
              clean();
              setShowCliente(true);
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
              clean();
              setShowFornecedor(true);
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
              clean();
              setShowProduto(true);
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
              clean();
              setShowVenda(true);
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
              CADASTRAR CLIENTE
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
                  cadastroCliente();
              }}
            >
              CADASTRAR
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
        </DialogContent>
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
              CADASTRAR FORNECEDOR
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
                  cadastroFornecedor();
              }}
            >
              CADASTRAR
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
              CADASTRAR PRODUTO
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (
                  valor.replace(",", ".") >= 0 &&
                  nome.length > 0 &&
                  fornecedor.cod > 0
                )
                  cadastroProduto();
              }}
            >
              CADASTRAR
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
              CADASTRAR VENDA
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (valor.toString().replace(",", ".") > 0 && cliente.cod > 0)
                  cadastroVenda();
              }}
            >
              CADASTRAR
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
              margin="dense"
              label="Cliente"
              value={cliente.nome}
              disabled={true}
              inputProps={{ maxLength: 9 }}
              style={{ marginTop: "auto", width: "60%" }}
            />

            <IconButton
              style={{ marginTop: "auto", width: "20%" }}
              onClick={() => {
                setShowTableCliente(true);
              }}
            >
              <AddIcon />
            </IconButton>
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
              value={valor}
              disabled={true}
              inputProps={{ maxLength: 18 }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>

          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              style={{ marginTop: "auto", width: "80%" }}
              onClick={() => {
                setShowTableProduto(true);
              }}
            >
              ADICIONAR PRODUTOS
              <AddIcon />
            </Button>
          </div>
          <div
            style={{
              marginTop: 5,
            }}
          >
            {produto.map((prod, index) => {
              return (
                <div key={index} style={{ textAlign: "center" }}>
                  <Typography>
                    {prod.nome} - {prod.quantidade}x = R$
                    {prod.valor_total.toFixed(2)}
                  </Typography>
                </div>
              );
            })}
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel
              required
              control={
                <Checkbox
                  color="primary"
                  checked={pago_vista}
                  onChange={() => setPagoVista(!pago_vista)}
                />
              }
              label="Pago à vista"
            />
            <Select
              required
              native
              value={pago_metodo}
              onChange={(e) => setPagoMetodo(e.target.value)}
              label="Método de Pagamento"
            >
              <option value={0}>Dinheiro</option>
              <option value={1}>Cartão de Débito</option>
              <option value={2}>Cartão de Crédito</option>
              <option value={3}>PIX</option>
              <option value={4}>Boleto</option>
              <option value={5}>Bitcoin</option>
            </Select>
          </div>
          <div
            style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
          >
            <Select
              required
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
              label="Parcelas"
            >
              <option value={1}>
                1x de R${parseFloat(valor > 0 ? valor : 0).toFixed(2)}
              </option>
              <option value={2}>
                2x de R${parseFloat(valor / 2).toFixed(2)}
              </option>
              <option value={3}>
                3x de R${parseFloat(valor / 3).toFixed(2)}
              </option>
              <option value={4}>
                4x de R${parseFloat(valor / 4).toFixed(2)}
              </option>
              <option value={5}>
                5x de R${parseFloat(valor / 5).toFixed(2)}
              </option>
              <option value={6}>
                6x de R${parseFloat(valor / 6).toFixed(2)}
              </option>
              <option value={7}>
                7x de R${parseFloat(valor / 7).toFixed(2)}
              </option>
              <option value={8}>
                8x de R${parseFloat(valor / 8).toFixed(2)}
              </option>
              <option value={9}>
                9x de R${parseFloat(valor / 9).toFixed(2)}
              </option>
              <option value={10}>
                10x de R${parseFloat(valor / 10).toFixed(2)}
              </option>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showTableProduto}
        onClose={() => setShowTableProduto(false)}
        maxWidth={"md"}
        fullWidth
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VISUALIZAR PRODUTOS
            </Typography>
            <Button color="inherit" onClick={() => setShowTableProduto(false)}>
              FECHAR
            </Button>
          </Toolbar>
        </AppBar>
        <TableProdutos />
      </Dialog>

      <Dialog
        open={showTableCliente}
        onClose={() => setShowTableCliente(false)}
        maxWidth={"sm"}
        fullWidth
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VISUALIZAR CLIENTES
            </Typography>
            <Button color="inherit" onClick={() => setShowTableCliente(false)}>
              FECHAR
            </Button>
          </Toolbar>
        </AppBar>
        <TableClientes />
      </Dialog>

      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={warning}>
          {code}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Cadastrar;
