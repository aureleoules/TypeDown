import React from 'react';
import Strings from '../../Strings';
import store from '../../store';
import {push} from 'react-router-redux';
import MarkdownIt from 'markdown-it';
import '../../../scss/markdown-dark-material.css';
import '../../../scss/markdown-light.css';
import {saveDocument} from '../../actions/documentActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const md = new MarkdownIt();

class NewDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            html: md.render("# " + Strings.newDocument)
        }
    }

    updateContent = content => {
        const html = md.render(content);
        this.setState({html});
    }
    
    clearDocument = () => {
        document.getElementById("markdown-edit").value = "";
        this.updateContent("");
    }

    saveDocument = () => {
        const content = document.getElementById("markdown-edit").value;
        this.props.saveDocument(content);
    }

    render() {
        return(
            <section className="new-document-section">
                <div className="editor">
                    <div className="columns">
                        <div className="column animated fadeInDown">
                            <textarea id="markdown-edit" style={{minHeight: "45vh", height: "85vh", maxHeight: "85vh"}} defaultValue={"# " + Strings.newDocument} onChange={txt => this.updateContent(txt.target.value)} className="textarea"></textarea>
                        </div>
                        <div className="column animated fadeInUp">
                            <div className="rendered-markdown-div markdown-dark-material" style={{overflowY: "scroll", height: "85vh", maxHeight: "85vh", padding: 50, backgroundColor: "#282C34"}} dangerouslySetInnerHTML={{__html:this.state.html}}> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped document-buttons animated flipInX">
                    <p className="control">
                        <a onClick={() => this.saveDocument()} className="button is-primary">
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