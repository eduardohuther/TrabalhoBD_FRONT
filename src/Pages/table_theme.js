import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: 'rgb(40, 40, 40) !important',
                color: '#17a2b8'
            },
        },
        MuiTableCell: {
            body: {
                color: '#fff'
            },
            head: {
                backgroundColor: 'rgb(35, 35, 35) !important',
                color: '#fff'
            },
        },
        MuiTypography: {
            root: {
                color: '#17a2b8 !important'
            }
        },
        MuiButton: {
            root: {
                color: '#fff !important',
            }
        },
        MuiInputBase: {
            root: {
                color: '#17a2b8 !important'
            }
        },
        MuiSvgIcon: {
            root: {
                color: '#17a2b8 !important'
            }
        },
        MUIDataTableHeadCell: {
            sortActive: {
                color: '#17a2b8 !important'
            },
        },
    },
});

export const options = {
    filter: false,
    filterType: "dropdown",
    download: false,
    print: false,
    //searchOpen: true,
    viewColumns: false,
    selectableRows: 'none',
    responsive: 'standard',
    rowsPerPageOptions: [10, 25, 50, 100],
    sortOrder: {
        name: 'CÓDIGO',
        direction: 'desc'
    },
    textLabels: {
        body: {
            noMatch: "Nenhum item encontrado!",
        },
        toolbar: {
            search: "Pesquisar",
            filterTable: "Filtrar tabela",
            viewColumns: "Mostrar/Esconder Colunas",
        },
        pagination: {
            next: "Próximo",
            previous: "Anterior",
            rowsPerPage: "Linhas:",
            displayRows: "de",
        },
        filter: {
            all: "Todos",
            title: "Filtros",
            reset: "Resetar",
        },
        viewColumns: {
            title: "Mostrar Colunas",
            titleAria: "Mostrar/Esconder Colunas",
        }
    }
};

export default (theme, options)