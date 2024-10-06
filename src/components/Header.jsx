import { useContext } from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { DataContext } from "../context/DataProvider";
import logo from "./logo.png";

const Container = styled(AppBar)`
  background: #060606;
  position: static;
  border-bottom: 1px solid #2f2f2f;
  height: 8vh;
`;

// Function to handle file download
const downloadFile = (code, language) => {
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `code.${language}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Header component
const Header = () => {
  const { html, css, js } = useContext(DataContext);

  return (
    <Container>
      <Toolbar>
        {/* Reload button */}
        <button
          className="button"
          onClick={() => window.location.reload(false)}
          style={{ border: 0 }}
        >
          <img src={logo} alt="logo" style={{ width: 50 }} />
        </button>

        <button className="button-2" onClick={() => downloadFile(html, "html")}>
          <IoCloudDownloadOutline className="icon" /> HTML
        </button>
        <button className="button-2" onClick={() => downloadFile(css, "css")}>
          <IoCloudDownloadOutline className="icon" /> CSS
        </button>
        <button className="button-2" onClick={() => downloadFile(js, "js")}>
          <IoCloudDownloadOutline className="icon" /> JS
        </button>
      </Toolbar>
    </Container>
  );
};

export default Header;
