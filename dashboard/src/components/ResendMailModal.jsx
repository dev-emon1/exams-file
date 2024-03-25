/* eslint-disable react/prop-types */
import { Button, Modal, Form, Input } from "antd";

// eslint-disable-next-line react/prop-types
const ResendMailModal = ({
  showModal,
  isModalOpen,
  onResendMail,
  onResendFailed,
}) => {
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Resend mail
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={onResendFailed}>
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
          onFinish={onResendMail}
          onFinishFailed={onResendFailed}
          autoComplete="off"
        >
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
      </Modal>
    </>
  );
};

export default ResendMailModal;
