import { createTheme } from '@material-ui/core/styles';
import Centra from '../../assets/fonts/Centra.ttf';

const CentraNo2 = {
  fontFamily: 'Centra',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('CentraNo2'),
    url(${Centra}) format('truetype')
  `,
};

const colors = {
  textSecondary: '#1D3150',
  white: '#FFFFFF',
};

export const theme = createTheme({
  /** Colors */
  palette: {
    text: {
      secondary: colors.textSecondary,
    },
  },

  /** Typography */
  typography: {
    fontFamily: '"CentraNo2", sans-serif;',
    h1: {
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '0.7px',
      fontWeight: 'bold',
    },
  },

  props: {
    MuiAccordion: {
      elevation: 0,
    },
  },

  /** Overrides */
  overrides: {
    MuiButton: {
      root: {
        paddingTop: '12px',
        paddingBottom: '12px',
        borderRadius: '10px',
      },
      contained: {
        backgroundColor: colors.textSecondary,
        color: colors.white,
      },
      outlined: {
        color: colors.textSecondary,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: '19px',
      },
    },
    MuiFilledInput: {
      input: {
        backgroundColor: '#FFFFFF',
      },
    },
    MuiAccordion: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
});
