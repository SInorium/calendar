import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import { FC, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formateDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    guest: "",
    date: "",
    description: "",
  } as IEvent);

  const { username } = useTypedSelector((state) => state.authReducer.user);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formateDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[rules.required(), rules.isDateAfter("Can't select past date")]}
      >
        <DatePicker onChange={selectDate} />
      </Form.Item>
      <Form.Item label="current guest" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guests) => (
            <Select.Option key={guests.username} value={guests.username}>
              {guests.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify={"end"}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            create event
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
