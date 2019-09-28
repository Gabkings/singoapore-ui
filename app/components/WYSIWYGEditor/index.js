/* eslint-disable prettier/prettier */
import React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';
import { toolbarOptions } from './options';


export default class CustomEditor extends React.PureComponent {
  static propTypes = {
    rich_text: PropTypes.string,
    onChange: PropTypes.func,
  };
  state = {
    editorState: EditorState.createEmpty(),
  };

  getInitialEditorState = () => {
    try {
      if (this.props.rich_text === null || this.props.rich_text === undefined || this.props.rich_text === '' || convertFromHTML(this.props.rich_text) === null) {
        return EditorState.createEmpty();
      }
      return EditorState.createWithContent(ContentState.createFromBlockArray(
        convertFromHTML(this.props.rich_text).contentBlocks,
        convertFromHTML(this.props.rich_text).entityMap
      ))

    } catch (e) {
      return EditorState.createEmpty();
    }
  };
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={toolbarOptions}
      />
    );
  }
  componentDidMount() {
    const editorState = this.getInitialEditorState();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ editorState })
    this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  };
}
