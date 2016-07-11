import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Layout.less';

const LayoutLogin = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={classnames(styles.content, styles.nobg)}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

LayoutLogin.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LayoutLogin;
