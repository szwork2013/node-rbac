import React, { Component, PropTypes } from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { LinkContainer } from 'react-router-bootstrap';
import LayoutLogin from '../../layouts/Shared/LayoutLogin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from '../../actions/auth'
import md5 from 'js-md5';

const createForm = Form.create;
const FormItem = Form.Item;

class SignUp extends Component {
  render() {
    return (
      <LayoutLogin>
        <Row>
          <Col span="12" offset="6" >
            <Card title="注册" bordered="true" style={{ marginTop: '75px' }}>
              <SignupForm />
            </Card>
          </Col>
        </Row>
      </LayoutLogin>

    );
  }
}

SignUp.propTypes = {

};

class SignupForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPass2 = this.checkPass2.bind(this);
    this.checkPass = this.checkPass.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!', values);
      _this.props.actions.signup({
        tid: '93fcaa91-c0ea-4533-8412-2e81c0e425ad',
        un: values.name,
        pn: values.phoneProps,
        em: values.email,
        pw: md5(values.rePasswd),
      })
    });
  }
  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  }
  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      hasFeedback: true,
    };

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, whitespace: true, message: '必填' },
      ],
    });
    const phoneProps = getFieldProps('phoneProps', {
      validate: [
        {
          rules: [
            { required: true, whitespace: true, message: '必填' },
          ],
        }, {
          rules: [
            { type: 'string', pattern: /^1\d{10}$/, message: '请输入正确的手机号码' },
          ],
          trigger: ['onBlur'],
        }],
    })
    const emailProps = getFieldProps('email', {
      validate: [
        {
          rules: [
            { required: true, message: '必填' },
          ],
        }, {
          rules: [
            { type: 'email', message: '请输入正确的邮箱地址' },
          ],
          trigger: ['onBlur'],
        }],
    });
    const passwdProps = getFieldProps('passwd', {
      validate: [{
        rules: [
          { required: true, message: '请填写密码' },
          { validator: this.checkPass },
        ],
        trigger: ['onBlur'],
      }],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      validate: [{
        rules: [
          {
            required: true,
            message: '请再次输入密码',
          }, {
            validator: this.checkPass2,
          }],
        trigger: ['onBlur'],
      }],
    });

    return (
      <div>
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            required
          >
            <Input {...nameProps} placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
            required
          >
            <Input {...phoneProps} placeholder="请输入手机号" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            required
          >
            <Input {...emailProps} placeholder="请输入邮箱" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            required
          >
            <Input type="password" {...passwdProps} placeholder="请输入密码" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            required
          >
            <Input type="password" {...rePasswdProps} placeholder="请输入确认密码" />
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }} style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >确定</Button>
            <LinkContainer to="/login"><a style={{ marginLeft: '10px' }}>已有账号，直接登录</a></LinkContainer>
          </FormItem>
        </Form>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { loading } = state.auth;
  return {
    loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
}

SignupForm = createForm()(connect(mapStateToProps, mapDispatchToProps)(SignupForm));


export default SignUp;
