import React from 'react';
import Strings from '../../Strings';
import store from '../../store';
import {Link} from 'react-router-dom';
import {push} from 'react-router-redux';
import {getDocument} from '../../actions/documentActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import MarkdownEditor from '../../components/MarkdownEditor';
import MarkdownPreview from '../../components/MarkdownPreview';

class Document extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getDocument(id);
    }

    render() {

        return(
            <section className="document-section">
                {this.props.document.received && 
                    <div className="preview">
                        <div className="preview-infos animated flipInX">
                            <h1 className="title preview-title">{this.props.document.data.title}</h1>
                            <p>
                                {Strings.publishedBy + " "} 
                                <Link to={`/user/${this.props.document.data.owner}`}>
                                    <span 
                                        className="tag is-light">
                                        {this.props.document.data.owner ? this.props.document.data.owner : 'Anonymous'}
                                    </span>
                                </Link>
                            </p>
                        </div>
                        <div className="columns">
                            <div className="column is-12 animated slideInUp">
                                <MarkdownPreview borderRadius={15} content={this.props.document.data.content}/>
                            </div>
                        </div>
                    </div>
                }
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
    return bindActionCreators({getDocument}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Document);