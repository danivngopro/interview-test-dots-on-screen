import "./App.css";
import { useState, useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

export default function App() {
  const [totalCircles, setTotalCircles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [render, setRender] = useState(false);

  const handleMouseDown = (event) => {
    setCircles([
      ...circles,
      {
        x: event.clientX - event.target.offsetLeft - 10,
        y: event.clientY - event.target.offsetTop - 10,
      },
    ]);
    setTotalCircles([
      ...circles,
      {
        x: event.clientX - event.target.offsetLeft - 10,
        y: event.clientY - event.target.offsetTop - 10,
      },
    ]);
  };

  const handleStepBack = () => {
    if (circles.length > 0) {
      const temp = circles;
      temp.pop();
      setCircles(temp);
      setRender(!render);
    }
  };

  const handleStepForward = () => {
    const tempCircle = totalCircles.slice(circles.length, circles.length+1);
    const temp = [...circles];
    temp.push(...tempCircle);
    setCircles(temp);
    setRender(!render);
  };

  useEffect(() => {
    console.log(circles);
  }, [render]);

  return (
    <div>
      <div>
        {" "}
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button onClick={handleStepBack}>
            <UndoIcon />
          </Button>
          <Button onClick={handleStepForward}>
            <RedoIcon />
          </Button>
        </ButtonGroup>
      </div>
      <div className="container" onMouseDown={handleMouseDown}>
        {circles.map((circle, index) => {
          return (
            <div
              key={index}
              style={{ position: "absolute", left: circle.x, top: circle.y }}
            >
              <FiberManualRecordIcon />
            </div>
          );
        })}
      </div>
    </div>
  );
}
