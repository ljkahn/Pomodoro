import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Pomodoro() {
  // Work session state
  const [workTime, setWorkTime] = useState(25 * 60);
  const [isWorkActive, setIsWorkActive] = useState(false);

  // Break session state
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const toggleWorkTimer = () => {
    setIsWorkActive((prevIsActive) => !prevIsActive);
  };

  const toggleBreakTimer = () => {
    setIsBreakActive((prevIsActive) => !prevIsActive);
  };

  const resetWorkTimer = () => {
    setIsWorkActive(false);
    setWorkTime(25 * 60);
  };

  const resetBreakTimer = () => {
    setIsBreakActive(false);
    setBreakTime(5 * 60);
  };

  const adjustWorkTime = (amount) => {
    setWorkTime((prevTime) => (prevTime + amount >= 0 ? prevTime + amount : 0));
  };

  const adjustBreakTime = (amount) => {
    setBreakTime((prevBreakTime) =>
      prevBreakTime + amount >= 0 ? prevBreakTime + amount : 0
    );
  };

  useEffect(() => {
    let workIntervalId;
    let breakIntervalId;

    if (isWorkActive) {
      workIntervalId = setInterval(() => {
        setWorkTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (isBreakActive) {
      breakIntervalId = setInterval(() => {
        setBreakTime((prevBreakTime) =>
          prevBreakTime > 0 ? prevBreakTime - 1 : 0
        );
      }, 1000);
    }

    if (workTime === 0 && isWorkActive) {
      setIsWorkActive(false);
      setBreakTime(5 * 60);
      setIsBreakActive(true);
    }

    if (breakTime === 0 && isBreakActive) {
      setIsBreakActive(false);
      setWorkTime(25 * 60);
      setIsWorkActive(true);
    }

    return () => {
      clearInterval(workIntervalId);
      clearInterval(breakIntervalId);
    };
  }, [isWorkActive, isBreakActive, workTime, breakTime]);

  return (
    <>
      <h1 className="head">Pomodoro Clock</h1>
      <Container className="card-container d-flex align-items-center justify-content-center min-vh-100">
        <Row>
          <Col md={6}>
            <Card style={{ width: "30rem", height: "20rem" }} className="card">
              <Card.Body>
                <Card.Title>Business</Card.Title>
                <Card.Text>{formatTime(workTime)}</Card.Text>
                <Button
                  variant="contained"
                  onClick={toggleWorkTimer}
                  startIcon={<PlayArrowIcon />}
                  style={{
                    backgroundColor: "rgb(173, 158, 163)",
                    margin: "1rem",
                  }}
                >
                  {isWorkActive ? "Pause Timer" : "Start Timer"}
                </Button>
                <Button
                  variant="contained"
                  onClick={resetWorkTimer}
                  disabled={isWorkActive}
                  style={{
                    backgroundColor: "rgb(173, 158, 163)",
                    margin: "1rem",
                  }}
                >
                  Reset Timer
                </Button>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => adjustWorkTime(60)}
                    style={{
                      backgroundColor: "rgb(173, 158, 163)",
                      margin: "1rem",
                    }}
                  >
                    ⬆️ Increase Time
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => adjustWorkTime(-60)}
                    style={{
                      backgroundColor: "rgb(173, 158, 163)",
                      margin: "1rem",
                    }}
                  >
                    ⬇️ Decrease Time
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ width: "30rem", height: "20rem" }} className="card">
              <Card.Body>
                <Card.Title>Break</Card.Title>
                <Card.Text>{formatTime(breakTime)}</Card.Text>
                <Button
                  variant="contained"
                  onClick={toggleBreakTimer}
                  startIcon={<PlayArrowIcon />}
                  style={{
                    backgroundColor: "rgb(173, 158, 163)",
                    margin: "1rem",
                  }}
                >
                  {isBreakActive ? "Pause Timer" : "Start Timer"}
                </Button>
                <Button
                  variant="contained"
                  onClick={resetBreakTimer}
                  disabled={isBreakActive}
                  style={{
                    backgroundColor: "rgb(173, 158, 163)",
                    margin: "1rem",
                  }}
                >
                  Reset Timer
                </Button>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => adjustBreakTime(60)}
                    style={{
                      backgroundColor: "rgb(173, 158, 163)",
                      margin: "1rem",
                    }}
                  >
                    ⬆️ Increase Time
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => adjustBreakTime(-60)}
                    style={{
                      backgroundColor: "rgb(173, 158, 163)",
                      margin: "1rem",
                    }}
                  >
                    ⬇️ Decrease Time
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Pomodoro;
