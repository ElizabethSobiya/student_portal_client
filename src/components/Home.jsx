import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import background from "../assets/students.png";
import Icon from "../assets/icon.png";

function Home() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#AA336A",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar className="tools">
          <div className="navbar-nav">
                <Button color="inherit" component={Link} to="/">
                  <img
                    src={Icon}
                    alt="logo"
                    height={50}
                    width={50}
                    borderRadius={16}
                    objectFit="cover"
                  />
                </Button>
              </div>
            <div className="navbar-nav">
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/">
                Contact
              </Button>
              <Button color="inherit" component={Link} to="/">
                Careers
              </Button>
              <Button color="inherit" component={Link} to="/students">
                Students
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.9",
        }}
      >
        <p className="header">
          We are here to manage <br /> student details.
        </p>
        <Button
          component={Link}
          to="/students"
          className="learn"
          style={{ marginLeft: "710px", backgroundColor:'#AA336A' }}
        >
          Learn More
        </Button>
      </div>
      );
    </>
  );
}

export default Home;
