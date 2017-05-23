import React, { Component } from 'react';
import Page from '../pages/Page';
import CodeContainer from '../containers/Code';

class Code extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Code | moon.codes';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Submit Your Code' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <CodeContainer {...this.props} />
      </Page>
    );
  }
}

export default Code;
