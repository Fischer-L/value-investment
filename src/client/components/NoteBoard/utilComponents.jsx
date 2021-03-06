import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Label, Icon, Button } from 'semantic-ui-react';
import { show } from '@/utils/showDisplay';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class Comment extends Component {

  renderParagraph({ texts, editMode, className }) {
    if (editMode) {
      return <textarea className={`note-pararaph--editMode ${className}`} rows="6" defaultValue={texts} />;
    }
    const lines = [];
    texts.split('\n').forEach((text, i) => lines.push(text.replace(/\s/g, '\u00A0'), <br key={i} />));
    return <p className={`note-pararaph ${className}`} style={show(texts)}>{ lines }</p>;
  }

  render() {
    const { header, texts, editMode, className, style } = this.props;
    return (
      <div className="note-comment" style={show(editMode || texts, style)}>
        <Header className="note-header" style={show(header)} as="h4">{ header }</Header>
        { this.renderParagraph({ texts, editMode, className }) }
      </div>
    );
  }
}
Comment.propTypes = {
  editMode: PropTypes.bool,
  texts: PropTypes.string,
  header: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

class EditModeButtons extends ClickableComponent {
  constructor(props) {
    super(props);

    this.onOK = this.onClickDo(() => this.fireCallback('whenOK'));
    this.onCancel = this.onClickDo(() => this.fireCallback('whenCancel'));
  }

  render() {
    return (
      <div>
        <Divider clearing hidden />
        <Button.Group className="noteBoard-editModeBtns">
          <Button className="noteBoard-cancelBtn" onClick={this.onCancel} onTouchEnd={this.onCancel}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={this.onOK} onTouchEnd={this.onOK}>Save</Button>
        </Button.Group>
        <Divider clearing hidden />
      </div>);
  }
}
EditModeButtons.propTypes = {
  whenOK: PropTypes.func.isRequired,
  whenCancel: PropTypes.func.isRequired,
};

class Note extends ClickableComponent {
  constructor(props) {
    super(props);

    this._data = {
      noteRef: null,
      originalNote: null,
    };

    this.extraNoteFromDOM = noteRef => {
      // Don't know why. This is not a stateless functional component.
      // But have to disable react/no-this-in-sfc, otherwise the Lint would complain.
      const note = this.props.noteSchema.fields // eslint-disable-line react/no-this-in-sfc
        .map(([ key ]) => [ key, noteRef.current.querySelector(`textarea.note-${key}`).value ])
        .filter(([ key, comment ]) => !!comment); // eslint-disable-line no-unused-vars

      if (note.length) {
        return note.reduce((_note, [ key, comment ]) => {
          _note[key] = { comment };
          return _note;
        }, {});
      }
      return null;
    };

    this.saveNote = () => this.fireCallback('whenSaveNote', { originalNote: this._data.originalNote, newNote: this.extraNoteFromDOM(this._data.noteRef) });
    this.cancelEditNote = () => this.fireCallback('whenCancelEditNote');
    this.onCopyNote = this.onClickDo(() => this.fireCallback('whenCopyNote', { originalNote: this._data.originalNote }));
    this.onEditNote = this.onClickDo(() => this.fireCallback('whenEditNote', { originalNote: this._data.originalNote }));
    this.onDeletNote = this.onClickDo(() => this.fireCallback('whenDeleteNote', { originalNote: this._data.originalNote }));

    this.commentOf = data => (data && data.comment ? data.comment : '');
    this.toDateInTW = time => (time ? (new Date(time + 8 * 60 * 60 * 1000)).toISOString().split('T')[0] : '');
  }

  renderComments(note, noteSchema, editMode) {
    return noteSchema.fields.map(([ key, header ]) => <Comment key={key} header={header} className={`note-${key}`} texts={this.commentOf(note[key])} editMode={editMode} />);
  }

  render() {
    const { note = {}, noteSchema, editMode } = this.props;

    this._data = {
      noteRef: React.createRef(),
      originalNote: JSON.parse(JSON.stringify(note)),
    };

    return (
      <div ref={this._data.noteRef}>
        { editMode ? <EditModeButtons whenOK={this.saveNote} whenCancel={this.cancelEditNote} /> : null }
        <Header className="note-header" as="h3">
          { noteSchema.title }
          <Icon className="note-copyBtn" name="copy outline" size="tiny" style={show(!editMode)} onClick={this.onCopyNote} onTouchEnd={this.onCopyNote} />
          <Icon className="note-editBtn" name="edit outline" size="tiny" style={show(!editMode)} onClick={this.onEditNote} onTouchEnd={this.onEditNote} />
          <Icon className="note-deleteBtn" name="trash alternate outline" size="tiny" style={show(!editMode)} onClick={this.onDeletNote} onTouchEnd={this.onDeletNote} />
          <Label className="note-date" as="span" color="orange" size="tiny" tag style={show(!editMode)}>{ this.toDateInTW(note.createTime) }</Label>
        </Header>
        { this.renderComments(note, noteSchema, editMode) }
        { editMode ? <EditModeButtons whenOK={this.saveNote} whenCancel={this.cancelEditNote} /> : null }
      </div>
    );
  }
}
Note.propTypes = {
  note: PropTypes.object,
  noteSchema: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  whenSaveNote: PropTypes.func.isRequired,
  whenCancelEditNote: PropTypes.func.isRequired,
  whenCopyNote: PropTypes.func,
  whenEditNote: PropTypes.func,
  whenDeleteNote: PropTypes.func,
};

class NewNoteElem extends ClickableComponent {
  constructor(props) {
    super(props);

    this.cancelNewNote = () => this.fireCallback('whenCancelNewNote');
    this.onOpenNewNoteMode = this.onClickDo(() => this.fireCallback('whenOpenNewNoteMode'));
  }

  render() {
    const { noteSchema, newNoteMode, defaultNote, whenSaveNote } = this.props;

    if (newNoteMode) {
      return (
        <section className="note">
          <Note
            note={defaultNote}
            noteSchema={noteSchema}
            editMode={newNoteMode}
            whenSaveNote={whenSaveNote}
            whenCancelEditNote={this.cancelNewNote}
          />
        </section>
      );
    }
    return (
      <section className="note">
        <Icon className="noteBoard-addBtn" name="add" size="large" onClick={this.onOpenNewNoteMode} onTouchEnd={this.onOpenNewNoteMode} />
        <Divider clearing hidden />
      </section>
    );
  }
}
NewNoteElem.propTypes = {
  newNoteMode: PropTypes.bool,
  defaultNote: PropTypes.object,
  noteSchema: PropTypes.object.isRequired,
  whenSaveNote: PropTypes.func.isRequired,
  whenCancelNewNote: PropTypes.func.isRequired,
  whenOpenNewNoteMode: PropTypes.func.isRequired,
};

export { NewNoteElem, Note };
