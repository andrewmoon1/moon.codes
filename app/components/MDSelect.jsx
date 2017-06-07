import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import classNames from 'classnames/bind';
import styles from '../css/components/markdown';
import { getDocs, load, edit } from '../actions/codes';


const cx = classNames.bind(styles);


class MDSelect extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.submit = this.submit.bind(this);
    this.download = this.download.bind(this);
    this.editDoc = this.editDoc.bind(this);
  }

  componentDidMount() {
    const { getDocs, areas } = this.props;
    getDocs();
    this.submission = areas;
  }

  componentDidUpdate() {
    const { docs, areas, title } = this.props;
    const select = document.getElementById('mdSelect');

    for (let i = this.index; i < docs.length; i += 1) {
      const parsedTitle = JSON.parse(docs[i].title);
      const option = document.createElement('option');
      option.text = parsedTitle;
      select.add(option);

      if (i === 0 && (!this.submission || title === 'Enter Title Here')) {
        this.submit(null, parsedTitle);
      }

      this.index += 1;
    }
  }

  editDoc(event) {
    const { edit, title } = this.props;
    edit(title);
    this.props.router.push('/code');
  }

  submit(event, title) {
    const { docs, load } = this.props;
    let submission;
    if (event) {
      event.preventDefault();
      submission = event.target.value;
    } else {
      submission = title;
    }

    docs.some((doc) => {
      const title = JSON.parse(doc.title);
      if (title === submission) {
        const documentation = JSON.parse(doc.code);
        load(documentation, title);
      }
    });
  }

  download() {
    const { areas, title } = this.props;
    const result = [`# ${title}  \n \n`];

    Object.keys(areas).forEach((area) => {
      let section = '';

      if (area.includes('mirror')) {
        section = '```js \n' +
          areas[area] +
          '\n' +
          '``` \n \n';
      } else {
        section = `${areas[area]} \n`;
      }

      result.push(section);
    });

    const blob = new Blob(result, {type: 'text/plain;charset=utf-8'});

    FileSaver.saveAs(blob, `${title}.md`);
  }

  render() {
    return (
      <div className={cx('md-select-container')}>
        <select
          id={'mdSelect'}
          onChange={this.submit}
          className={cx('md-select')} />
        <button
          className={cx('md-save')}
          onClick={this.download} >
          Download
        </button>
        <button
          className={cx('md-edit')}
          onClick={this.editDoc} >
          Edit
        </button>
      </div>
    );
  }
}

MDSelect.propTypes = {
  getDocs: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,

};

function mapStateToProps(state) {
  return {
    docs: state.code.documentation,
    areas: state.code.savedAreas,
    title: state.code.title,
  };
}

export default connect(mapStateToProps, { getDocs, load, edit })(MDSelect);
