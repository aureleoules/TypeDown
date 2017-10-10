import React from 'react';

class MarkdownEditor extends React.Component {
    render() {
        return (
            <textarea 
                id="markdown-edit" 
                style={{minHeight: "45vh", height: "85vh", maxHeight: "85vh"}} 
                defaultValue={this.props.defaultValue} 
                onChange={txt => this.props.updateContent(txt.target.value)} 
                className="textarea">
            </textarea>            
        );
    }
}

export default MarkdownEditor;