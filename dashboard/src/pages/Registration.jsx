import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useState } from "react";
import ResendMailModal from "../components/ResendMailModal";
import "../App.css";

const Registration = () => {
  const [showButton, setShowButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState();

  // registration function
  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/registration",
      {
        name: values.name,
        email: values.email,
        password: values.password,
      }
    );
    if (data.success) {
      setMsg(data);
    } else if (data.error) {
      setMsg(data);
    }
    if (data.email) {
      setShowButton(true);
    }
  };

  setTimeout(() => {
    setMsg(false);
  }, 2500);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // resend mail function
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onResendMail = async (values) => {
    setIsModalOpen(false);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/resendmail",
      {
        email: values.email,
      }
    );
    console.log(data);
    if (data.success) {
      setMsg(data);
    } else if (data.error) {
      setMsg(data);
    }
    setTimeout(() => {
      setMsg(false);
    }, 3500);
  };

  const onResendFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsModalOpen(false);
  };
  return (
    <>
      {msg && (
        <Alert
          message={(msg && msg.success) || msg.error}
          type={(msg.success && `success`) || (msg.error && `error`)}
        />
      )}

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {showButton && (
        <>
          <ResendMailModal
            isModalOpen={isModalOpen}
            showModal={showModal}
            onResendMail={onResendMail}
            onResendFailed={onResendFailed}
          />
        </>
      )}
    </>
  );
};

export default Registration;
