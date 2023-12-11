


import { Form, Input, Button,} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {  Typography } from "antd";
import "./Auth"
const { Title } = Typography;

const SignUpForm = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Title>Sign Up</Title>

      <Form name="basic" initialValues={{ email: "" }} onFinish={onFinish} 
        style={{ width: 300,}} >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "length of password must be 6-24 characters",
              min: 6,
              max: 24,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback

          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    "The two passwords that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit">
            SignUp
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;