import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

function Pomodoro() {
  // Work session state
  const [workTime, setWorkTime] = useState(25 * 60);
  const [isWorkActive, setIsWorkActive] = useState(false);

  // Break session state
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);

  const calculateBizProgress = () => {
    return (workTime / (25 * 60)) * 100; // Calculate progress percentage
  };

  const calculateBreakProgress = () => {
    return (breakTime / (25 * 60)) * 100; // Calculate progress percentage
  };

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
      <Container className="card-container d-flex flex-row align-items-center justify-content-center min-vh-100">
        <Card style={{ width: "30rem", height: "35rem" }} className="card">
          <Card.Body>
            <CircularProgress
              variant="determinate"
              value={calculateBizProgress()}
              size={150}
              thickness={4}
              color="inherit"
              sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            />
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
              endIcon={<RestartAltIcon />}
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
                startIcon={<ArrowUpwardIcon />}
                onClick={() => adjustWorkTime(60)}
                style={{
                  backgroundColor: "rgb(173, 158, 163)",
                  margin: "1rem",
                }}
              >
                Increase Time
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowDownwardIcon />}
                onClick={() => adjustWorkTime(-60)}
                style={{
                  backgroundColor: "rgb(173, 158, 163)",
                  margin: "1rem",
                }}
              >
                Decrease Time
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: "30rem", height: "35rem" }} className="card">
          <Card.Body>
            <CircularProgress
              variant="determinate"
              value={calculateBreakProgress()}
              size={150}
              thickness={4}
              color="inherit"
              sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            />
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
              endIcon={<RestartAltIcon />}
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
                startIcon={<ArrowUpwardIcon />}
                onClick={() => adjustBreakTime(60)}
                style={{
                  backgroundColor: "rgb(173, 158, 163)",
                  margin: "1rem",
                }}
              >
                Increase Time
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowDownwardIcon />}
                onClick={() => adjustBreakTime(-60)}
                style={{
                  backgroundColor: "rgb(173, 158, 163)",
                  margin: "1rem",
                }}
              >
                Decrease Time
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Pomodoro;
