import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const theme = createTheme({
    palette: {
        persianBlue: {
            main: '#0541c9',
            light: '#534bae',
            dark: '#000051',
            contrastText: '#fff',
            box: 'f1ebe2'
        },
        verdigris: {
            main: '#45b3ba',
            light: 'DarkSlateGray',
            dark: '#c43e00',
            contrastText: '#000'
        },
        pear: {
            main: '#d7ed31'
        },
        aliceBlue: {
            main: '#f0f5ff'
        },
        error: {
            main: red[400],
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#fff'
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#fff'
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        background: {
            default: '#fff',
            paper: '#fff'
        }
    },
    typography: {
        fontFamily: [
            'Barlow Condensed',
            'Nunito Sans',
            // 'sans-serif'
        ].join(','),
        h1: {
            fontSize: '6rem',
            fontWeight: 300,
            letterSpacing: '-0.01562em'
        },
        h2: {
            fontSize: '3.75rem',
            fontWeight: 300,
            letterSpacing: '-0.00833em'
        },
        h3: {
            fontSize: '3rem',
            fontWeight: 400,
            letterSpacing: '0em'
        },
        h4: {
            fontSize: '2.125rem',
            fontWeight: 400,
            letterSpacing: '0.00735em'
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0em'
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0.0075em'
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.00938em'
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.00714em'
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.00938em'
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.01071em'
        },
        button: {
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '0.02857em'
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.03333em'
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.08333em',
            textTransform: 'uppercase'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        },
        MuiTableCell: {
            root: {
                padding: '8px 16px 8px 16px'
            }
        },
        MuiTableRow: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f5f5f5'
                }
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#1a237e'
            }
        },
        MuiPickersDay: {
            day: {
                color: '#1a237e'
            },
            daySelected: {
                backgroundColor: '#1a237e'
            },
            dayDisabled: {
                color: '#1a237e'
            },
            current: {
                color: '#1a237e'
            }
        },
        MuiPickersModal: {
            dialogAction: {
                color: '#1a237e'
            }
        }
    }
});