import React from 'react';
import Strings from '../../Strings';
import {saveDocument} from '../../actions/documentActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'

import history from '../../history';

import MarkdownEditor from '../../components/MarkdownEditor';
import MarkdownPreview from '../../components/MarkdownPreview';

class NewDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "# " + Strings.newDocument,
            title: "",
            saveDisabled: false
        }
    }

    updateContent = content => {
        this.setState({content});
    }
    
    updateTitle = title => {
        this.setState({title});
    }   
    updateTags = tags => {
        this.setState({tags: tags.split(',')});
    }

    clearDocument = () => {
        document.getElementById("markdown-edit").value = "";
        this.updateContent("");
    }

    saveDocument = () => {
        const content = this.state.content;
        const title = this.state.title;
        const tags = this.state.tags;
        this.props.saveDocument(content, title, tags, err => {
            if(err) throw err;
            this.setState({redirect: true});
        });
    }

    _renderRedirect = () => {
        if(this.state.redirect) {
            return (<Redirect to={`/document/${this.props.document.data._id}`} push/>);
        }
    }

    render() {
        return(
            <section className="new-document-section">
                <div className="editor">
                    <div className="columns">
                        <div className="column is-6 animated fadeInDown">
                            <MarkdownEditor defaultValue={"# " + Strings.newDocument} updateContent={this.updateContent}/>
                        </div>
                        <div className="column is-6 animated fadeInUp">
                            <MarkdownPreview scrollBar height="85vh" maxHeight="85vh" content={this.state.content}/>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped document-buttons animated flipInX">
                    <p className="control">
                        <input style={{width: 225}} onChange={txt => this.updateTitle(txt.target.value)} className="input" type="text" placeholder={Strings.title + " (" + Strings.required + ")"}/>                    
                    </p>
                    <p className="control">
                        <input style={{width: 225}} onChange={txt => this.updateTags(txt.target.value)} className="input" type="text" placeholder={Strings.tags + " (" + Strings.atLeastOne + ")"}/>                    
                    </p>
                </div>
                <div className="field is-grouped document-buttons animated flipInX">
                    <p className="control">
                        <a onClick={() => this.saveDocument()} className={`button is-primary ${(this.state.content.length > 5 && this.state.title.length > 3) ? '' : 'disabled'}`}>
                            {Strings.save}
                        </a>
                    </p>
                    <p className="control">
                        <a onClick={() => this.setState({modal: true})} className="button is-danger">
                            {Strings.clear}
                        </a>
                    </p>
                </div>  
                <div className={`modal ${this.state.modal ? 'is-active' : ''}`} onClick={() => this.setState({modal: false})}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="content has-text-centered has-text-light"> 
                            <p>{Strings.clearDocumentConfirmation}</p>
                            <div className="field is-grouped is-grouped-centered is-horizontal">
                                <p className="control">
                                    <a onClick={() => this.clearDocument()} className="button is-danger is-outlined">{Strings.clear}</a>
                                </p>
                                <p className="control">
                                    <a className="button is-primary is-outlined">{Strings.cancel}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close"></button>
                </div>
                {this._renderRedirect()}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        document: state.document
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({saveDocument}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewDocument);