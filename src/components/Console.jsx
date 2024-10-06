import { useState, useEffect, useContext } from "react";
import { Box, Button, styled } from "@mui/material";
import { DataContext } from "../context/DataProvider";

const ConsoleContainer = styled(Box)`
  background-color: #1d1e22;
  color: #ffffff;
  padding: 10px;
  font-family: monospace;
  font-size: 12px;
  height: 15vh;
  overflow-y: auto;
  border-top: 1px solid #2f2f2f;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const ToggleButton = styled(Button)`
  background-color: #333;
  color: #fff;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  &:hover {
    background-color: #444;
  }
`;

// Debounce function to delay evaluation
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Console = () => {
  const { js } = useContext(DataContext);
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Debounced JS code to avoid evaluating incomplete code
  const debouncedJs = useDebounce(js, 1000);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const consoleLog = (...args) => {
      setLogs((prevLogs) => [...prevLogs, args.join(" ")]);
    };

    const consoleError = (error) => {
      setLogs((prevLogs) => [...prevLogs, `Error: ${error.message}`]);
    };

    const consoleObj = iframe.contentWindow.console;
    consoleObj.log = consoleLog;
    consoleObj.error = consoleError;

    try {
      iframe.contentWindow.eval(debouncedJs);
    } catch (error) {
      consoleError(error);
    }

    return () => {
      document.body.removeChild(iframe);
    };
  }, [debouncedJs]);

  return (
    <>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Console" : "Show Console"}
      </ToggleButton>
      <ConsoleContainer isVisible={isVisible}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </ConsoleContainer>
    </>
  );
};

export default Console;
