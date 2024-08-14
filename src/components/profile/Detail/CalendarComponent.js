import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';

function getTodoList(date) {
    const day = date.getDate();

    switch (day) {
        case 10:
            return [
                { time: '10:30 am', title: 'Meeting' },
                { time: '12:00 pm', title: 'Lunch' }
            ];
        case 15:
            return [
                { time: '09:30 am', title: 'Products Introduction Meeting' },
                { time: '12:30 pm', title: 'Client entertaining' },
                { time: '02:00 pm', title: 'Product design discussion' },
                { time: '05:00 pm', title: 'Product test and acceptance' },
                { time: '06:30 pm', title: 'Reporting' },
                { time: '10:00 pm', title: 'Going home to walk the dog' }
            ];
        default:
            return [];
    }
}

const CalendarComponent = () => {
    function renderCell(date) {
        const list = getTodoList(date);

        if (list.length) {
            return (
                <Whisper
                    placement="top"
                    trigger="click"
                    speaker={
                        <Popover title={`Appointments for ${date.toDateString()}`}>
                            {list.map((item, index) => (
                                <div key={index} style={{ padding: '5px 0', fontSize: 'x-small' }}>
                                    <Badge /> <b>{item.time}</b> - {item.title}
                                </div>
                            ))}
                        </Popover>
                    }
                >
                    <div style={{ cursor: 'pointer', width: '100%' }}>
                        <ul className="calendar-todo-list" style={{ padding: '0', margin: '0', fontSize: 'x-small' }}>
                            {list.map((item, index) => (
                                <li key={index} style={{ padding: '2px 0' }}>
                                    <Badge /> <b>{item.time}</b> - {item.title}
                                </li>
                            ))}
                            {list.length > 2 && <li>+{list.length - 2} more</li>}
                        </ul>
                    </div>
                </Whisper>
            );
        }

        return null;
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <Calendar bordered renderCell={renderCell} />
            </div>
        </div>
    );
};

export default CalendarComponent;
