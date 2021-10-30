import { ButtonProps } from '@material-ui/core';

export interface StyledButtonProps extends Omit<ButtonProps, 'variant'> {
  variant: 'text' | 'outlined' | 'contained' | 'log-out' | 'create-project' | 'save' | undefined;
}
