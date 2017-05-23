import React, { Component } from 'react';
import Page from '../pages/Page';
import MarkdownContainer from '../containers/Markdown';
import MDSelect from '../components/MDSelect';
import classNames from 'classnames/bind';
import styles from '../css/components/markdown';

const cx = classNames.bind(styles);


class Markdown extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Documentation | moon.codes';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Markdown' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <div className={cx('page-markdown')} >
          <MarkdownContainer {...this.props} />
          <MDSelect {...this.props} />
        </div>
      </Page>
    );
  }
}

export default Markdown;
