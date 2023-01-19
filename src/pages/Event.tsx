import { Button, Layout, Modal, Row } from "antd";
import { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.eventReducer);
  const { user } = useTypedSelector((state) => state.authReducer);

  const addNewEvent = (event: IEvent) => {
    createEvent(event);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
    //eslint-disable-next-line
  }, []);

  // т.к при создании эвента при первом рэндере показываются эвенты для всех пользователей я продублировал фильтрацию
  const filteredEvents = events.filter(
    (ev) => ev.author === user.username || ev.guest === user.username
  );

  return (
    <Layout>
      <EventCalendar events={filteredEvents} />
      <Row justify={"center"}>
        <Button onClick={() => setModalVisible(true)}>add event</Button>
      </Row>
      <Modal
        footer={null}
        onCancel={() => setModalVisible(false)}
        open={modalVisible}
        title={"add event"}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
