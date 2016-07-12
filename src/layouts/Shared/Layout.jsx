/**
 * Created by guanzhenjie on 2016/6/22.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Menu, Icon, Dropdown, Row, Col, notification, message, Modal, Form, Input, Select} from 'antd';
import {Link, hashHistory} from 'react-router';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumb';
import xFetch from '../../services/xFetch';
import {signOut} from '../../utils/authUtil';
import {bindActionCreators} from 'redux';
import {Actions} from '../../actions/common';
import md5 from 'js-md5';

const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const Option = Select.Option;

class Layout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      pwdVisible: false,
      userName: '',
    };
  }

  render() {

    const {children, layout} = this.props;
    console.log(children)
    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"/>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['task']} defaultOpenKeys={['task']}>
            <Menu.SubMenu title={<span><Icon type="book"/>任务管理</span>} key="task">
              <Menu.Item><Link to="/app/ticket/current">当前任务</Link></Menu.Item>
              <Menu.Item><Link to="/app/ticket/classic">标准票</Link></Menu.Item>
              <Menu.Item><Link to="/app/ticket/history">历史票</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="folder"/>数据管理</span>} key="data">
              <Menu.Item><Link to="/app/device">设备管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/station">厂站管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/folders">电子票文件夹管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/locker">锁具柜管理</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="setting"/>系统管理</span>} key="system">
              <Menu.Item><Link to="/app/user">用户管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/role">角色管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/privileges">权限管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/profe">用户专业管理</Link></Menu.Item>
              <Menu.Item><Link to="/app/dept">组织机构管理</Link></Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <div className="ant-aside-action">
            <Footer />
          </div>
        </aside>
        <div className="ant-layout-main">
          <Row className="ant-layout-header">
            <Col sm={20}>
              <h1>{'aaaa'}</h1>
            </Col>
            <Col sm={4} style={{textAlign: 'right', paddingRight: '20px'}}>
              用户信息
            </Col>
          </Row>
          <div className="ant-layout-breadcrumb">
            <Breadcrumbs {...children.props} />
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => {
  return {layout: state.layout};
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      layout: bindActionCreators(Actions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
