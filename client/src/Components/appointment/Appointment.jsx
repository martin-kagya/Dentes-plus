import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import appoint from '/images/shedrack-salami-yGrdQlFPFrY-unsplash.jpg';
import Button from '../button/Button';
import Confirmation from '../confirmation/Confirmation';
import { FaCalendarDays } from "react-icons/fa6";
import styles from './Appointment.module.css';

function Appointment() {
    const [patient, setPatient] = useState('');
    const [tel, setTel] = useState('');
    const [category, setCategory] = useState('select category')
    const [complaint, setComplaint] = useState('');
    const [confirmation, setConfirmation] = useState(false)
    const [date, setDate] = useState(null);
    const [minDate, setMinDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Only allow Thursdays (4) and Fridays (5)
    const isThursdayOrFriday = date => {
        const day = date.getDay();
        return day === 4 || day === 5;
    };
    const filterTime = time => {
        const hour = time.getHours();
        return hour >= 12 && hour <= 15;
      };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmation(true)
        setIsModalOpen(false);

    }
    return (
        <>
            <div className={styles.contain}>
            {confirmation && (
                <>
                    <Confirmation isVisible={true} header={"Booking Successful"} text={"A confirmation email has been sent to you. We look forward to see you"}/>
                </>
            )}
            {!confirmation && (
                <>
                    <p className={styles.head}>BOOK AN APPOINTMENT</p>
                    <div>Appointment Booking Guidelines
                    <ul>
                        <li><span className={styles.span}>Advance Booking:</span> All appointments must be booked at least 24 hours in advance. Same-day appointments are not available.</li>
                        <li><span className={styles.span}>Cancellations and Rescheduling:</span> If you need to cancel or reschedule your appointment, please do so at least 12 hours prior to your appointment time. Cancellations or rescheduling within 12 hours may incur a fee.</li>
                        <li><span className={styles.span}>Arrival Time:</span> Please arrive at least 10 minutes before your scheduled appointment to complete any necessary paperwork and prepare for your session. Late arrivals may result in a reduced appointment time.</li>
                        <li><span className={styles.span}>Confirmation:</span> You will receive a confirmation email or message once your appointment is successfully booked. Please keep this confirmation for your records.</li>
                        <li><span className={styles.span}>Health and Safety:</span> If you are feeling unwell or have any symptoms of illness, please reschedule your appointment. Your health and safety, as well as that of our staff, is our priority.</li>
                        <li><span className={styles.span}>Special Requests:</span> If you have any special requests or requirements, please inform us at the time of booking so we can accommodate your needs.</li>
                        <li><span className={styles.span}>Payment: </span>Payment is required at the time of booking. We accept all major credit cards and payment methods.</li>
                        <li><span className={styles.span}>Contact Information:</span> Ensure that your contact information is up-to-date when booking your appointment so we can reach you if needed.</li>
                        By following these guidelines, you help us provide you with the best possible service. Thank you for your cooperation.
                        We look forward to seeing you!<br></br>
                        Click the link below to book your appointment:

                    </ul>
                    </div>
                    <button onClick={handleOpenModal}>Book Appointment</button>
                </>
            )}
                {isModalOpen && (
                    <>
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p className={styles.head}>BOOK APPOINTMENT</p>
                            <span className={styles.close} onClick={handleCloseModal}>&times;</span>
                            <div className={styles.formContainer}>
                                <form onSubmit={handleSubmit} className={styles.form} id='appointment'>
                                    <input 
                                        type='text' 
                                        name='name' 
                                        placeholder='Your name'
                                        value={patient}
                                        onChange={(e) => setPatient(e.target.value)}
                                    />
                                    <input
                                        type='text'
                                        name='tel'
                                        placeholder='Tel'
                                        value={tel}
                                        onChange={(e) => {
                                            const regex = /^[0-9\b]+$/;
                                            if (e.target.value === '' || regex.test(e.target.value)) {
                                                setTel(e.target.value);
                                            }
                                        }}
                                    />
                                    <select onChange={(e) => setCategory(e.target.value)}>
                                        <option value={category} disabled>Select category</option>
                                        <option>Restorative</option>
                                        <option>Cosmetic</option>
                                        <option>Maintainance</option>
                                        <option>Emergency</option>
                                    </select>
                                    <textarea
                                        placeholder='Your Complaint'
                                        value={complaint}
                                        onChange={(e) => setComplaint(e.target.value)}
                                    />
                                        <DatePicker
                                            calendarClassName={styles.date}
                                            selected={date}
                                            showTimeSelect
                                            timeFormat='HH:mm'
                                            filterTime={filterTime}
                                            onChange={(date) => setDate(date)}
                                            minDate={minDate}
                                            filterDate={isThursdayOrFriday}
                                            placeholderText="Select date"
                                            showIcon
                                        />

                                    <Button text="Book"/>
                                </form> 
                            </div>
                        </div>
                    </div>
                </>
                )}
            </div>
        </>
    );
}

export default Appointment;
