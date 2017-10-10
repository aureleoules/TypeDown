import React from 'react';
import MarkdownIt from 'markdown-it';
import '../../../scss/markdown-dark-material.css';

const md = new MarkdownIt();

class MarkdownPreview extends React.Component {
    render() {
        return (
            <div 
                className="rendered-markdown-div markdown-dark-material" 
                style={{overflowY: this.props.scrollBar ? "scroll" : 'none', height: this.props.height, maxHeight: this.props.maxHeight, borderRadius: this.props.borderRadius, padding: 50, backgroundColor: "#282C34"}} 
                dangerouslySetInnerHTML={{__html: md.render(this.props.content)}}>
            </div>         
        );
    }
}

export default MarkdownPreview;