import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Markdown from './Markdown-B';
import TextArea from '../components/TextArea-B';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns-B';
import { typingTitle, newArea, submitCode, saveText, load, edit, updateCode, resetAreas } from '../actions/codes';
import { submitMsg } from '../actions/messages';
import styles from '../css/components/code-b';

const cx = classNames.bind(styles);
const CodeMirror = require('react-codemirror');


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.cmOptions = {
      lineNumbers: true,
      mode: 'javascript',
    };
    this.mirrors = {};
    this.saveCode = this.saveCode.bind(this);
  }

  componentDidMount() {
    const { load, code } = this.props;
    let data = {
      'text-0': 'Enter Description Here'
    }
    let title = 'Enter Title Here';

    if (code.edit) {
      data = code.savedAreas;
      title = code.title;
    }

    resetAreas();

    load(data, title);
  }

  componentWillUnmount() {
    const { code, edit } = this.props;

    if (code.edit) {
      edit('');
    }
  }

  saveCode(className, focused) {
    const { saveText } = this.props;
    const mirror = this.mirrors[className];
    const value = mirror.getCodeMirror().getValue();

    saveText(value, className);

    return undefined;
  }

  buildAreas() {
    const mapAreas = [];
    const { areas, saveText, code } = this.props;
    let count = 0;
    areas.map((area) => {
      if (area === 'textArea') {
        const textCount = `text-${count}`;
        let text = '';

        if (code.edit) {
          text = code.savedAreas[textCount];
        }

        mapAreas.push(
          <TextArea
            key={count}
            save={saveText}
            count={textCount}
            content={text} />,
        );

        if (count > 1) {
          // renders markdown with each new area
          setTimeout(() => {
            saveText(text, textCount);
          }, 0);
        }
      } else if (area === 'codeMirror') {
        const mirrorCount = `mirror-${count}`;
        let text = 'Enter Your Code';
        if (code.edit) {
          text = code.savedAreas[mirrorCount];
        }

        mapAreas.push(
          <div
            key={count}
            className={cx('mirror-container')}>
            <CodeMirror
              options={this.cmOptions}
              className={mirrorCount}
              defaultValue={text}
              onChange={this.saveCode.bind(this, mirrorCount)}
              ref={instance => this.mirrors[mirrorCount] = instance}
            />
          </div>
        );

        if (count > 1) {
          // renders markdown with each new area
          setTimeout(() => {
            this.saveCode(mirrorCount, text);
          }, 0);
        }
      }
      count += 1;
      return undefined;
    });

    return mapAreas;
  }

  render() {
    const { typingTitle, newArea, submitCode, router, user, code, updateCode, saveText, submitMsg } = this.props;
    const mapAreas = this.buildAreas();

    const count = 0;
    const textCount = `text-${count}`;
    const text = code.savedAreas[textCount] || 'Enter Description Here';

    let titleText = code.title;

    return (
      <form
        className={cx('code-form')}
        onSubmit={this.props.submit} >
        <div className={cx('codes-container')}>
          <div
            className={cx('code-input')} >
            <Title
              onEntryChange={typingTitle}
              title={titleText} />
            <TextArea
              key={count}
              save={saveText}
              count={textCount}
              content={text} />
          </div>
          <div className={cx('code-markdown')}>
            <Markdown />
          </div>
        </div>
        <CodeBttns
          newArea={newArea}
          submit={submitCode}
          message={submitMsg}
          update={updateCode}
          router={router}
          authenticated={user.authenticated}
          />
      </form>
    );
  }
}

Code.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingTitle: PropTypes.func.isRequired,
  newArea: PropTypes.func.isRequired,
  submitCode: PropTypes.func.isRequired,
  saveText: PropTypes.func.isRequired,
};

Code.defaultProps = {
  areas: ['textArea', 'codeMirror'],
};

function mapStateToProps(state) {
  return {
    areas: state.code.areas,
    user: state.user,
    code: state.code
  };
}

export default connect(mapStateToProps, { typingTitle, newArea, submitCode, saveText, load, edit, updateCode, resetAreas, submitMsg })(Code);
