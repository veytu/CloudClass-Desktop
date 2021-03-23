import React, { EventHandler, FC, forwardRef, SyntheticEvent, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { BaseProps } from '~components/interface/base-props';
import './index.css';
import RcDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css'
import dayjs from 'dayjs'
import { Icon } from '~components';

export interface CalendarProps extends BaseProps {
  inputClassName?: string
  calendarClassName?: string
}

export const Calendar: FC<CalendarProps> = ({
  inputClassName,
  calendarClassName,
  ...restProps
}) => {
  const inputcls = classnames({
    [`${inputClassName}`]: !!inputClassName,
  });
  const calendarcls = classnames({
    [`${calendarClassName}`]: !!calendarClassName,
  });
  let today = new Date()
  const [startDate, setStartDate] = useState(today);
  const [isOpen, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month())
  const [selectedHour, setSelectedHour] = useState(dayjs(today).hour())
  const [selectedMinute, setSelectedMinute] = useState(dayjs(today).minute())
  const [selectedAMPM, setSelectedAMPM] = useState(0)
  const hourRef = useRef(null)
  const minuteRef = useRef(null)


  const onSelectHour = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let hour = Number(evt.currentTarget.dataset.hour || "1")
    setSelectedHour(hour)
  }

  const onSelectMinute = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let minute = Number(evt.currentTarget.dataset.minute || "0")
    setSelectedMinute(minute)
  }

  const onSelectAMPM = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let ampm = Number(evt.currentTarget.dataset.ampm || "0")
    setSelectedAMPM(ampm)
  }

  useEffect(() => {
    hourRef && hourRef.current.scrollIntoView()
    minuteRef && minuteRef.current.scrollIntoView()
  }, [])

  return (
    <div className="ag-calendar-container">
      <RcDatePicker
        selected={startDate}
        onChange={date => {
          let d: Date = date as Date
          setSelectedMonth(dayjs(d).month())
          setStartDate(d)
        }}
        onMonthChange={(date:Date) => setSelectedMonth(dayjs(date).month())}
        // showTimeSelect
        className={inputcls}
        calendarClassName={calendarcls}
        inline={true}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className="ag-calendar-header">
            {dayjs(date).format('YYYY年MM月')}
            <div className="ag-calendar-header-btn-groups">
              <Icon className="rotated" type="backward" onClick={() => decreaseMonth()} />
              <Icon className="rotated" type="forward" onClick={() => increaseMonth()}/>
            </div>
          </div>
        )}
        renderDayContents={(dayOfMonth:number, date?: Date) => {
          let classes = ['ag-calendar-date'];
          let d = dayjs(date);
          let today = dayjs();

          const equalDate = (d1:dayjs.Dayjs, d2:dayjs.Dayjs) => {
            return d1.date() === d2.date() && d1.month() === d2.month() && d1.year() === d2.year()
          }

          (d.month() !== selectedMonth) && classes.push('out-scoped')
          equalDate(d, dayjs(startDate)) && classes.push('selected')
          equalDate(d, today) && classes.push('today')

          return <div className={classes.join(' ')}>{dayOfMonth}</div>
        }}
        // customTimeInput={<ExampleCustomTimeInput></ExampleCustomTimeInput>}
      />
      <div className="ag-calendar-time-select-container">
        <div className="ag-calendar-hour-select ag-calendar-time-select">
          {[...Array(24).keys()].map(idx => 
            <li className="ag-calendar-time-item">
              <button data-hour={idx} ref={(selectedHour === idx) ? hourRef : null} className={(selectedHour === idx) ? "selected w-full" : "w-full"} onClick={onSelectHour}>{`${idx}`.padStart(2, '0')}</button>
            </li>
          )}
        </div>
        <div className="ag-calendar-minutes-select ag-calendar-time-select">
          {[...Array(60).keys()].map(idx => 
            <li className="ag-calendar-time-item">
              <button data-minute={idx} ref={(selectedMinute === idx) ? minuteRef : null} className={(selectedMinute === idx) ? "selected w-full" : "w-full"} onClick={onSelectMinute}>{`${idx}`.padStart(2, '0')}</button>
            </li>
          )}
        </div>
      </div>
    </div>
    
  );
};

