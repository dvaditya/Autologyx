import React from 'react';
import { connect } from 'react-redux';
import { setUser as setUserAction } from 'store/actions/userActions';
import { setUsers } from 'store/actions/usersActions';


const UserWrapper = ({
  children,
  fields,
  setUserAction,
  setUsers,
  csrfToken,
  getDocassembleConfigAction,
}) => {
  const getValue = key => {
    var _field = fields.find(field => field.id === key);
    return typeof _field !== 'undefined' ? _field.value : '';
  };

  let userData = {
    firstName: getValue('first_name'),
    lastName: getValue('last_name'),
    company: getValue('company'),
    title: getValue('title'),
    email: getValue('email'),
    phone: getValue('phone'),
    csrfToken,
  };

  if (process.env.NODE_ENV === 'development') {
    userData = { ...userData, firstName: 'ALX', lastName: 'Dev' };
  }

  React.useEffect(() => {
    // getDocassembleConfigAction();
    setUserAction(userData);
    setUsers()
  }, [fields]);

  return <>{children}</>;
};

UserWrapper.defaultProps = {
  fields: [],
};

export default connect(() => ({}), {
  setUserAction,
  setUsers
})(UserWrapper);
