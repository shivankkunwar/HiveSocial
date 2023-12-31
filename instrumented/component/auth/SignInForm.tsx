
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import axios from 'axios'
import "./Auth"
const { Title } = Typography;
function SignInForm() {
    const navigate= useNavigate();
    
    const onFinish = async (values:FieldType) => {
        console.log(values)
        try{
            const response = await axios.post('/api/login', values);
            console.log(response)
            if (response.data.status === 'ok') {
                message.success('Logged in successfully!');
                
                navigate("/home");
              } else {
                console.log("worked")
                message.error('Failed to log in.');
              }
        }
        catch(error ){
            console.log(error);
            
        }
       
      };

      const onFinishFailed = (errorInfo: ValidateErrorEntity<FieldType>) => {
        console.log('Failed:', errorInfo);
      };

    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
        <Title>Log In</Title>
        <Form
            name="basic"
           
            style={{ width: 300 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                
                name="email"
                hasFeedback
                rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mails!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}

            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="enter email" name="email" className='emailInput'/>
            </Form.Item>

            <Form.Item<FieldType>
               
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password" name='password'/>
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item >
                <Button name="login" type="primary" htmlType="submit" className='loginbutton'>
                   Login
                </Button>
            
            </Form.Item>
        </Form>
        </div>
    )
}

export default SignInForm