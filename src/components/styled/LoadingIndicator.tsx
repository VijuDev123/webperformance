import styled, { keyframes } from "styled-components";
import settings from "../../settings";
import {CircularProgress} from "@mui/material";

interface LoadingIndicatorProps {
  "data-testid": string;
}

const LoadingIndicator = ({
  "data-testid": dataTestId,
}: LoadingIndicatorProps) => (
  <LoadingComponent data-testid={dataTestId}>
    <CircularProgress />
  </LoadingComponent>
);

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.svg`
  animation: ${spinAnimation} 1s linear infinite;
  height: 50px;
  width: 50px;
  fill: ${settings.colors.foreground};
`;

export const LoadingComponent = styled.div`
  color: ${settings.colors.foreground};
  background-color: ${settings.colors.backgroundSecondary};
  border-left: 5px solid ${settings.colors.foreground};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:before {
    content: "";
    display: inline-block;
    margin-right: 10px;
  }
`;

export default LoadingIndicator;
