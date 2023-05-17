import React from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const width = 220;
const margin = 18;
const dWidth = (width - 2 * margin) / 5;
const fontSize = "17px";

const MonthView = ({ month }: { month: number }) => {
  const today = new Date();
  const year = today.getFullYear();

  const firstDay = new Date(year, month, 1).getDay(); // 0-indexed months
  const numDays = new Date(year, month + 1, 0).getDate();

  const days: JSX.Element[] = [];
  for (let i = 1; i <= numDays; i++) {
    days.push(
      <div
        style={{
          display: "flex",
          width: `${dWidth}px`,
          height: `${dWidth - 10}px`,
          fontSize: fontSize,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: today.getMonth() === month && today.getDate() === i ? "bisque" : "",
        }}
        key={`m-${month}-day-${i}`}
        id={`${year}-${month}-${i}`}
      >
        {i}
      </div>
    );
  }

  const grid = (
    <div>
      {[0, 1, 2, 3, 4, 5].map((week) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={`m-${month}-w-${week}`}>
            {[0, 1, 2, 3, 4, 5, 6].map((dayofweek) => {
              const didx = week * 7 + dayofweek;
              if (didx >= firstDay && didx < numDays + firstDay) {
                return days[didx - firstDay];
              }
              return (
                <div style={{ display: "flex", width: `${dWidth}px` }} key={`m-${month}-w-${week}-d-${dayofweek}`}>
                  {""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
  return grid;
};

const YearView = () => {
  const today = new Date();

  const monthsGrid = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={`month-row-${i}`}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {[0, 1, 2, 3].map((j) => (
            <div
              key={`month-item-${4 * i + j}`}
              style={{ width: `${width}px`, margin: `0 ${margin}px`, display: "flex", flexDirection: "column" }}
            >
              <span style={{ fontSize: "22px" }}>{MONTHS[4 * i + j]}</span>
              <div
                style={{
                  borderBottom: "solid 2px",
                  fontSize: fontSize,
                  color: "gray",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {DAYS.map((day) => (
                  <div
                    style={{ display: "flex", width: `${dWidth}px`, justifyContent: "center", fontWeight: "500" }}
                    key={`${day}-of-week-${4 * i + j}`}
                  >
                    {day[0]}
                  </div>
                ))}
              </div>
              <MonthView month={4 * i + j} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      Year {today.getFullYear()}
      {monthsGrid}
    </div>
  );
};

export default YearView;
