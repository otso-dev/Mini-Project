/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
/** WeekList 미구현 */
const MainContainer = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 5px;
`;

const Header = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 10%;
  margin-bottom: 5px;

  & h1 {
    font-size: 30px;
  }

  & button {
    border: none;
    background-color: #454545;
  }
`;

const weekStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const weekContainer = css`
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 100%;
  height: 35%;
  overflow: auto;
`;

const dayContainer = css`
  border: 1px solid #dbdbdb;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 50px;
  padding: 10px;

  width: 100%;
  height: 35%;

  overflow: auto;
`;

const dayStyles = css`
  margin: 10px;
  width: 230px;
  height: 230px;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 1px #121212;
  background-color: #ffff66;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px 1px #ffff00;
    transition: all 0.3s ease;
  }
`;

const dayHeader = css`
  border-bottom: 1px solid #121212;
  box-sizing: border-box;
  padding: 2px;
  width: 100%;
  height: 40px;
  font-size: 30px;
`;

export const calendarModal = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000000dd;
`;

const CalendarModal = ({ onClose, onSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    onSelect(selectedDate);
    onClose();
  };

  return (
    <div css={calendarModal}>
      <div className="modal-content">
        <Calendar value={date} onClickDay={handleDateClick} />
      </div>
    </div>
  );
};

const WeekList = () => {
  const [startDate, setStartDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (selectedDate) => {
    setStartDate(selectedDate);
    const startOfWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const endOfWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 6
    );
    const highlightRange = [];
    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
      highlightRange.push(new Date(d));
    }
    setHighlightedDates(highlightRange);
  };

  const handleTodoChange = (date, value) => {
    console.log(`Saved todo for ${date}: ${value}`);
  };

  const renderWeek = () => {
    if (!startDate) {
      return null;
    }
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div css={weekContainer}>
        <div css={weekStyles}>
          {daysOfWeek.map((day) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + daysOfWeek.indexOf(day));
            return (
              <div key={date.getDate()}>
                <div>{date.getDate()}</div>
                <input type="text" onChange={(e) => handleTodoChange(date, e.target.value)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main css={MainContainer}>
      <header css={Header}>
        <h1>WEEK</h1>
        <button onClick={() => setShowCalendar(true)}>
          {startDate ? startDate.toLocaleDateString() : "Select Date"}
        </button>
        {showCalendar && (
          <CalendarModal onClose={() => setShowCalendar(false)} onSelect={handleDateSelect} />
        )}
      </header>
      <div css={dayContainer}>
        {highlightedDates.map((date) => (
          <div key={date} css={dayStyles}>
            <div css={dayHeader}>
              {`${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`}
            </div>
          </div>
        ))}
      </div>
      {renderWeek()}
    </main>
  );
};

export default WeekList;
