import './Comp.css';
import { AppBar, Toolbar, styled } from "@mui/material"
import logo from './logo.png'
import { IoCloudDownloadOutline } from "react-icons/io5";
const Container = styled(AppBar)`
    background: #060606;
    position: static;
    border-bottom: 1px solid #2f2f2f;
    height: 8vh;
`;

const Header = ({button}) => {
    
    return (
      <Container>
        <Toolbar>
          <button
            className="button"
            onClick={() => window.location.reload(false)}
            style={{ border: 0 }}
          >
            <img src={logo} alt="logo" style={{ width: 50 }} />
          </button>
          <button className="button-2" onClick={button}>
            <IoCloudDownloadOutline className="icon" />
          </button>
        </Toolbar>
      </Container>
    );
}

export default Header