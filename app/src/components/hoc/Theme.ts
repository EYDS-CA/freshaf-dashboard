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

export const theme = createTheme({
  /** Colors */

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

  /** Overrides */
  overrides: {},
});
