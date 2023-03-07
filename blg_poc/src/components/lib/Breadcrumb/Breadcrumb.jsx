import React from 'react';
import { ReactComponent as BreadcrumbIcon } from 'img/crumb-separator.svg';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ path }) => {
  const handleLink = (path) => {
    switch (path) {
      case 'Audit Management':
        return 'audit'
        break;
      case 'Home':
        return '/'
        break
      case 'Client Management':
        return 'client'
      default:
        break;
    }
  }
  return (
    <div className="breadcrumbs">
      {path.map((p, index) => (
        <React.Fragment key={p}>
          {index > 0 ? (
            <span className="crumb-arrow">
              <BreadcrumbIcon />
            </span>
          ) : null}

          {index + 1 !== path.length ? <Link style={{ textDecoration: 'none', color: 'rgb(46, 63, 87)' }} to={handleLink(p)}>
            <span>
              {p}
            </span>
          </Link> :
            <span style={{fontSize: '16px', fontWeight: '700'}}>
              {p}
            </span>
          }
        </React.Fragment>
      ))}
    </div>
  );
};

Breadcrumb.defaultProps = {
  path: [],
};

export default Breadcrumb;
