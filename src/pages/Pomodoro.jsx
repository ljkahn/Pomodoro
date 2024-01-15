import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  //normal session clock
  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };
  // const startTimer = () => {
  //   setIsActive(true);
  // };

  // const stopTimer = () => {
  //   setIsActive(false);
  // };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(25 * 60);
  };

  const increaseTime = () => {
    setTime((prevTime) => prevTime + 1 * 60);
  };

  const decreaseTime = () => {
    setTime((prevTime) => prevTime - 1 * 60, 0);
  };

  //break clock
  const increaseBreak = () => {
    setBreakTime((prevBreakTime) => prevBreakTime + 1 * 60);
  };

  const decreaseBreak = () => {
    setBreakTime((prevBreakTime) => prevBreakTime - 1 * 60, 0);
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (time === 0) {
      setIsActive(false);
      if (!isBreak) {
        // If it's the end of the work session, start a 5-minute break
        setTime(5 * 60);
      } else {
        // If it's the end of the break, start a new 25-minute work session
        setTime(25 * 60);
      }
      setIsBreak(!isBreak);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, isBreak, time]);

  return (
    <>
      <h1 className="head">Pomodoro Clock</h1>
      <Container className="cardContainer d-flex align-items-center justify-content-center min-vh-100">
        <Row>
          <Col md={6}>
            <Card style={{ width: "30rem", height: "25rem" }} className="card">
              {/* <Card.Img variant="top" src="" /> */}
              <Card.Body>
                <Card.Title>Start Session</Card.Title>
                <Card.Text>{formatTime(time)}</Card.Text>

                <Button variant="dark" onClick={toggleTimer}>
                  {isActive ? "Pause Timer" : "Start Timer"}
                </Button>

                <Button variant="dark" onClick={resetTimer} disabled={isActive}>
                  Reset Timer
                </Button>

                <div>
                  <Button variant="dark" onClick={increaseTime}>
                    Increase Time
                  </Button>
                  <Button variant="dark" onClick={decreaseTime}>
                    Decrease Time
                  </Button>
                </div>

                <div>
                  <Button variant="dark" onClick={increaseBreak}>
                    Increase Break Time
                  </Button>
                  <Button variant="dark" onClick={decreaseBreak}>
                    Decrease Break Time
                  </Button>
                  <Button variant="outline-light">Light</Button>
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
