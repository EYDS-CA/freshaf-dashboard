import React, { ReactElement, Fragment } from "react";
import { styled, Button } from "@material-ui/core";
import { StyledButtonProps } from "../../constants/interfaces/buttonInterfaces";

const StyledLogoutButton = styled(Button)({
  color: "#1D3150",
  fontSize: "16px",
  textTransform: "none",
  lineHeight: "21px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#e6efff",
    boxShadow: "none",
  },
});

const StyledProjectButton = styled(Button)({
  color: "#1D3150",
  minHeight: "51px",
  minWidth: "272px",
  fontSize: "16px",
  lineHeight: "21px",
  textAlign: "center",
  textTransform: "none",
  border: "2px solid #1D3150",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#e6efff",
    boxShadow: "none",
  },
  boxShadow: "0px 3px 3px rgba(123, 130, 155, 0.45)",
});

const StyledSaveButton = styled(Button)({
  color: "#1D3150",
  fontSize: "16px",
  lineHeight: "19px",
  textTransform: "none",
  minWidth: "272px",
  height: "29px",
  backgroundColor: "#fff",
  opacity: 0.5,
  borderRadius: "100px",
});
/**
 * Styled button reusable component
 *
 * @param {ButtonProps} props - MUI defined button props
 * @returns object of type ReactElement
 *
 */
export function StyledButton({
  variant,
  ...props
}: StyledButtonProps): ReactElement {
  return (
    <Fragment>
      {variant === "log-out" ? (
        <StyledLogoutButton variant="outlined" {...props} />
      ) : variant === "create-project" ? (
        <StyledProjectButton variant="outlined" {...props} />
      ) : variant === "save" ? (
        <StyledSaveButton variant="outlined" {...props} />
      ) : (
        <Button variant="text" {...props} />
      )}
    </Fragment>
  );
}
