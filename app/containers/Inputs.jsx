import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns';
// import { typingTitle, newArea, submitCode, saveText } from '../actions/codes';
import styles from '../css/components/code';

const cx = classNames.bind(styles);
const CodeMirror = require('react-codemirror');


class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.cmOptions = {
      lineNumbers: true,
      mode: 'javascript',
    };
    this.mirrors = {};
    this.saveCode = this.saveCode.bind(this);
  }


  saveCode(className, focused) {
    const { saveText } = this.props;
    const mirror = this.mirrors[className];
    const value = mirror.getCodeMirror().getValue();

    saveText(value, className);

    return undefined;
  }

  render() {
    const { typingTitle, areas, newArea, submitCode, saveText } = this.props;
    const mapAreas = [];
    let count = 0;
    areas.map((area) => {
      if (area === 'textArea') {
        const textCount = `text-${count}`;
        mapAreas.push(
          <TextArea
            key={count}
            save={saveText}
            count={textCount} />,
        );
      } else if (area === 'codeMirror') {
        const mirrorCount = `mirror-${count}`;
        mapAreas.push(
          <div
            key={count}
            className={cx('mirror-container')}>
            <CodeMirror
              options={this.cmOptions}
              className={mirrorCount}
              defaultValue={'Enter Your Code'}
              onChange={this.saveCode.bind(this, mirrorCount)}
              ref={instance => this.mirrors[mirrorCount] = instance}
            />
          </div>
        );
      }
      count += 1;
      return undefined;
    });
    return (
      <form
        className={cx('code-input')}
        onSubmit={this.props.submit}
        >
        <Title
          onEntryChange={typingTitle} />
        {mapAreas}
        <CodeBttns
          newArea={newArea}
          submit={submitCode}
          />
      </form>
    );
  }
}

Inputs.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingTitle: PropTypes.func.isRequired,
  newArea: PropTypes.func.isRequired,
  submitCode: PropTypes.func.isRequired,
  saveText: PropTypes.func.isRequired,
  // documentation: PropTypes.objectOf(PropTypes.string).isRequired,
  // submit: PropTypes.func.isRequired,
};

Inputs.defaultProps = {
  areas: ['textArea', 'codeMirror'],
};

function mapStateToProps(state) {
  return {
    areas: state.code.areas
  };
}

export default connect(mapStateToProps, { typingTitle, newArea, submitCode, saveText })(Inputs);
