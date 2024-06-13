import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { dateState, userState, todoState, calendarEvents } from '../../../lib/atom';
import { FullCalendarContainer } from './FullCalendarContainer'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5
import { useEffect, useState} from 'react';


export default function Calendar () {
    const userInfo = useRecoilValue(userState);
    const uuid = userInfo ? userInfo.user.id : null;
    const [date, setDate] = useRecoilState(dateState);
    const [error, setError] = useState(null);
    const [todoList, setTodoList] = useRecoilState(todoState);
    const calEvent = useRecoilValue(calendarEvents);
    // console.log('calEvent');
    // console.log(calEvent);

    
    
    //날짜 상태관리
    

    const onClickDate = (date) => {
        console.log('onClickDate')
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const fullDate = `${year}-${month}-${day}`;
        setDate(fullDate);

        
    }
    
    return (
        <>
            <FullCalendarContainer>
                <FullCalendar 
                    plugins={[dayGridPlugin, interaction, bootstrap5Plugin ]}
                    initialView='dayGridMonth'
                    events={calEvent}
                    viewHeight={300}
                    themeSystem='bootstrap5'
                    headerToolbar={{
                        start: 'title',
                        center: '',
                        end: 'prev today next'
                    }}
                    dateClick={(arg) => onClickDate(arg.date)}
                    eventClick={(info) => console.log('이벤트클릭',info.event._def)} //이벤트 클릭
                />
            </FullCalendarContainer>
        </>
    );
}