import React from "react";
import PropTypes from 'prop-types'

import Composer from "plugins/tools/Composer";


function CopyToClipBoard({content, disabled, children, onClick, ...rest}) {

    const copyToClipboard = textToCopy => {
        try {
          textToCopy = JSON.stringify(textToCopy, null, 2);
        } catch (error) {
          textToCopy = "unable to stringify data";
        }
    
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy);
        } else {
          const el = document.createElement("textarea");
          el.value = textToCopy;
          el.style.display = "none";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }
      };

    const createElement = (child) => {
     
        const click = (e) => {
            if (onClick) {
                if (disabled) return onClick(e);
                else {
                    copyToClipboard(content);
                    return onClick(e);
                }
            } else {
                return (disabled) ? null : copyToClipboard(content);
            }
        }

        return React.cloneElement(child, { onClick: click, ...rest });
    };
    
    
    return (
        <Composer createElement={createElement}>
            {children}
        </Composer>
    );
    
}

CopyToClipBoard.propsTypes = {
    content: PropTypes.object.isRequired,
    disabled: PropTypes.bool
}

CopyToClipBoard.defaultProps = {
    disabled: false
}

CopyToClipBoard.isDecorator=true;

export default CopyToClipBoard;


        
    

