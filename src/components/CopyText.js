import React, { createRef } from "react";

class CopyText extends React.Component {

    state = {
        value: ``,
        copied: false,
        textareaRef: createRef()
    }

    handleBorderColor() {
        const currentElem = this.state.textareaRef.current;

        setTimeout(function() {
          currentElem.style.border = "1px solid #FF9800";
       },100);

       setTimeout(function() {
        currentElem.style.border = "1px solid #cacaca";
       }, 400)
    
       this.setState({ copied: true })
    
      }
   
    componentDidMount() {
      // get text in the text-container and 'put' it inside the empty textarea
      let textContainer = document.getElementById('text-container').innerText;
      document.getElementById('holdtext').value = textContainer;
    }
    
    copyText() {
      // set textarea to display block, then select the text inside the textarea
      let text = document.getElementById('holdtext');
      text.style.display = 'block';
      text.select();
      // copy the text in the textarea
      try {
        let status = document.execCommand("Copy");
        if(!status) {
          console.log('Cannot copy text');
        } else {
         // toastr.success('Copied');
          console.log('Copied');
        }
      } catch(err) {
        //toastr.error('Could not copy');
        // handle error
      }
      text.style.display = 'none';
    }
  
    render() {
      return (
      <section id="copy-text">
        <button
            onClick={this.copyText}
            className="copy-icon-container"
          >
            <i className="material-icons copy-icon">content_copy</i>
            Copy
          </button>
          <code id="text-container">
            press the button to copy this text here...
          </code>
          {/*we copy the text above in the 'code' block to this textarea, then select the text, and execute the copy shortcut for the user.*/}
          <textarea id="holdtext" value=""></textarea>
          {/*this textarea is set to display none, but temporarily set to display block when we want to perform the copy. then we put it back to display none to keep it off the DOM.*/}
          {/*this input is used to text your copy-paste*/}
          <h4>paste here:</h4>
          <input type="text"/>
       </section>
      )
    }
  }
  

  export default CopyText;