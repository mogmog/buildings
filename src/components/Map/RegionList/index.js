import React from 'react';
import styles from './index.less';

export default props => (
  <dl className={styles.regionlist}>
    {props.regions.map(item => (
      <dt onClick={e => props.onClick(item)}> O {item.name}</dt>
    ))}
  </dl>
);
