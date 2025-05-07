import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEvent.title) return;

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDate,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/calendar/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      setEvents((prev) => [...prev, event]);
      setNewEvent({ title: "", description: "" });
      setSelectedDate(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div
      className="container-padding section-spacing"
      style={{ maxWidth: 900, margin: "0 auto" }}
    >
      <h1>Calendar</h1>
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <button
            onClick={handlePrevMonth}
            className="btn-secondary"
            style={{ padding: "0.5rem 1rem" }}
          >
            ←
          </button>
          <h2 style={{ margin: 0 }}>{format(currentDate, "MMMM yyyy")}</h2>
          <button
            onClick={handleNextMonth}
            className="btn-secondary"
            style={{ padding: "0.5rem 1rem" }}
          >
            →
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            background: "#222",
            borderRadius: 8,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                background: "#111",
                padding: "8px 0",
                textAlign: "center",
                fontWeight: 600,
                color: "#ccc",
              }}
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayEvents = events.filter((event) => {
              const eventDate =
                event.date instanceof Date ? event.date : new Date(event.date);
              return (
                eventDate.getFullYear() === day.getFullYear() &&
                eventDate.getMonth() === day.getMonth() &&
                eventDate.getDate() === day.getDate()
              );
            });
            const isTodayDay = isToday(day);
            const isSelected =
              selectedDate && selectedDate.getTime() === day.getTime();
            const inCurrentMonth = day.getMonth() === currentDate.getMonth();

            return (
              <div
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                style={{
                  minHeight: 100,
                  padding: 8,
                  background: isTodayDay ? "#0ea5e9" : "#222",
                  border: isSelected ? "2px solid #38bdf8" : "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  color: inCurrentMonth ? "#fff" : "#888",
                  opacity: inCurrentMonth ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: 14 }}>{format(day, "d")}</span>
                {dayEvents.length > 0 && (
                  <div style={{ marginTop: 4 }}>
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        style={{
                          fontSize: 12,
                          padding: 4,
                          background: "#38bdf8",
                          color: "#111",
                          borderRadius: 6,
                          marginBottom: 2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {selectedDate && (
        <>
          <div className="card" style={{ marginTop: 24, marginBottom: 24 }}>
            <h3>Events for {format(selectedDate, "MMMM d, yyyy")}</h3>
            {(() => {
              const selectedDayEvents = events.filter((event) => {
                const eventDate =
                  event.date instanceof Date
                    ? event.date
                    : new Date(event.date);
                return (
                  eventDate.getFullYear() === selectedDate.getFullYear() &&
                  eventDate.getMonth() === selectedDate.getMonth() &&
                  eventDate.getDate() === selectedDate.getDate()
                );
              });
              if (selectedDayEvents.length === 0) {
                return (
                  <div style={{ color: "#ccc" }}>No events for this date.</div>
                );
              }
              return (
                <ul>
                  {selectedDayEvents.map((event) => (
                    <li key={event.id} style={{ marginBottom: 8 }}>
                      <strong>{event.title}</strong>
                      {event.description && (
                        <div style={{ fontSize: 14, color: "#aaa" }}>
                          {event.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>

          <div className="card" style={{ marginTop: 0 }}>
            <h3>Add Event for {format(selectedDate, "MMMM d, yyyy")}</h3>
            <form onSubmit={handleAddEvent} style={{ marginRight: 30 }}>
              <div style={{ marginBottom: 16 }}>
                <label
                  htmlFor="title"
                  style={{ display: "block", fontSize: 14, marginBottom: 4 }}
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="input-field"
                  required
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  htmlFor="description"
                  style={{ display: "block", fontSize: 14, marginBottom: 4 }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <button type="submit" className="btn-primary">
                Add Event
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
