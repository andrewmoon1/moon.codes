import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ReactMarkdown from 'react-markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns';
import { typingTitle, newArea, submitCode, saveText } from '../actions/codes';
import styles from '../css/components/markdown-b';

const cx = classNames.bind(styles);
const CodeMirror = require('react-codemirror');


class MarkdownContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  // componentWillReceiveProps(nextProps) {
  // }

  buildMarkdown() {
    const { areas, title } = this.props;
    const markdowns = [];
    let count = 0;

    Object.keys(areas).map((md) => {
      let template = '';
      let type = '';
      const position = parseInt(md.split('-', md.indexOf('-') + 1)[1], 10);
      if (md.includes('text')) {
        type = 'text';
        template = template.concat('\n' + areas[md] + '\n \n');
      } else {
        return undefined;
      }

      markdowns[position] =
        (<ReactMarkdown
          className={cx('markdown', `markdown-${position}`, `markdown-${type}`)}
          key={count}
          source={template}
          escapeHtml />);

      count += 1;
    });

    return markdowns;
  }

  render() {
    const { title } = this.props;
    const markdowns = this.buildMarkdown();

    return (
      <div
        className={cx('markdown-container')}>
        <h1 className={cx('markdown-title')}>
          {title || 'Enter title here'}
        </h1>
        {markdowns}
      </div>
    );
  }
}

MarkdownContainer.propTypes = {
  areas: PropTypes.objectOf(PropTypes.string).isRequired,
};

MarkdownContainer.defaultProps = {
  areas: {
    'text-0': '### Enter Text Here',
    'code-0': '### Enter Code Here'
  },
  title: 'Enter title here'
};

function mapStateToProps(state) {
  return {
    areas: state.code.savedAreas,
    title: state.code.title
  };
}

export default connect(mapStateToProps, { typingTitle, newArea, submitCode, saveText })(MarkdownContainer);
