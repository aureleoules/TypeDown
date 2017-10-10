import React from 'react';
import {getUser} from '../../actions/userActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class Profile extends React.Component {

    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.getUser(username);
    }

    getDocuments = () => {
        if(this.props.user.data) {
            const documents = this.props.user.data.docs;
            
            let renderedDocuments = [];
            for(let i = 0; i < documents.length; i++) {
                const document = documents[i];
                const tags = [];
                for(let j = 0; j < document.tags.length; j++) {
                    const tag = document.tags[j];
                    tags.push(
                        <Link key={tag} to={`/search/${tag}`}>
                            <span className="tag is-primary" style={{marginRight: 5}}>{tag}</span>      
                        </Link>                  
                    );
                }
                renderedDocuments.push(
                    <div key={i} className="tile is-child box document">
                        <Link to={`/document/${document._id}`}>
                            <p className="title">{document.title}</p>
                            {tags}
                        </Link>
                    </div>
                );
            }
            
            return renderedDocuments;
        }
    }

    render() {
        return(
            <div className="profile-section">
                {this.props.user.fetched &&
                    <div style={{height: "100%"}}>
                        <div className="username-container">
                            <div className="animated zoomIn">
                                <p className="username">
                                    @{this.props.user.data.username}
                                </p>
                            </div>
                        </div>
                        <h1 className="title anim username-top">@{this.props.user.data.username}</h1>
                        <div className="container">
                            {this.getDocuments()}
                        </div>
                    </div>
                }
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({getUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);