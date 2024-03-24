import { Flex, Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function verify() {
      await axios.post("http://localhost:8000/api/v1/verification", {
        token: params.email,
      });
    }
    verify();
    navigate("/login");
  }, []);
  return (
    <>
      <Flex align="center" gap="middle">
        <Spin size="large" /> <h2>Checking</h2>
      </Flex>
    </>
  );
};

export default EmailVerification;
