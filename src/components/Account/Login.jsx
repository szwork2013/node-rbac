import React from 'react';
import { Button, Checkbox, Card, Col, Form, Input, Row, Spin, notification } from 'antd';
import { Link } from 'react-router';
import LayoutLogin from '../../layouts/Shared/LayoutLogin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from '../../actions/auth'
import md5 from 'js-md5';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      that.props.actions.login({
        account: values.name,
        password: md5(values.passwd),
        rememberMe: values.agreement || false,
      })
    });
  }

  handleKeyDown(e) {
    console.log(e);
    if (e.which === 13) {
      const that = this;
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          console.log('Errors in form!!!');
          return;
        }
        that.props.actions.login({
          account: values.name,
          password: md5(values.passwd),
          rememberMe: values.agreement || false,
        })
      });
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, whitespace: true, message: '请填写用户名' },
      ],
    });
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Spin spinning={this.props.loading}>
        <Form horizontal form={this.props.form} onKeyDown={this.handleKeyDown.bind(this) }>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
            >
            <Input {...nameProps} placeholder="用户名/邮箱/手机号" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
            >
            <Input
              {...passwdProps} type="password"
              onContextMenu={noop}
              onPaste={noop}
              nCopy={noop}
              onCut={noop}
              placeholder="密码"
              />
          </FormItem>

          <FormItem
            wrapperCol={{ span: 12, offset: 7 }}
            >
            <Checkbox {...getFieldProps('agreement') }>记住我</Checkbox>
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" size="default" onClick={this.handleSubmit}>登录</Button>
            <p className="ant-form-text">
              <Link to="/signup"><a style={{ marginLeft: '10px' }}>注册账号</a></Link>
            </p>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { loading } = state.auth;
  return {
    loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
}


LoginForm = createForm()(connect(mapStateToProps, mapDispatchToProps)(LoginForm));


const Login = () => {
  return (
    <LayoutLogin>
      <Row align="bottom">
        <Col span={10} offset={7} style={{ marginTop: 60 }}>
          <Card title="登录">
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </LayoutLogin>
  )
};

export default Login;
