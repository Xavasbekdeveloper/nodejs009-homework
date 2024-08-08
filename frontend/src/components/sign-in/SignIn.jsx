import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSignInMutation } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../context/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, isError, isLoading, isSuccess, error }] =
    useSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.payload.token));
      dispatch(setUser(data.payload.user));
      navigate("/dashboard");
    }
  }, [isSuccess]);

  const handleLogin = (values) => {
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 flex items-center justify-center min-h-screen flex-col gap-4">
      <h2 className="text-2xl font-medium">Sign in</h2>
      <Form
        name="basic"
        layout="vertical"
        className="w-96 max-sm:w-full"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignIn;
