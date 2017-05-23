import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About Moon Codes</h1>
      <div className={cx('description')}>
        Moon codes comes from an idea I had a while ago: to have a website where as A UI developer I can submit data structures, alogrithms, and code snippets to keep track of my growth.
      </div>
      <div className={cx('contribute')}>
        <p>This project is built on top of <a href="https://github.com/reactGo/reactGo/">reactGo</a>, a universal rendering boilerplate with React, Redux, Express, and MongoDB.</p>
        <p>You can submit your own <a href="../code">code</a> to see how everything works. Text areas and code areas can be dynamically inserted. I opted for this approach as opposed to having one large text area for two reasons. <br /> <br />
            1. I like breaking down problems into smaller parts and focusing on them one at a time, so each function or method should have appropriate documentation. <br />
            2. I wanted to dive deeper into React and Redux, inserting components dynamically was a good introduction to state management. </p>
        <p>The source code can be found on <a href="https://github.com/andrewmoon1/moon-codes">Github</a>.</p>
      </div>
    </div>
  );
};

export default About;
