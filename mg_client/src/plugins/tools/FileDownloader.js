import React from "react";
import PropTypes from 'prop-types'

import Composer from "plugins/tools/Composer";


function FileDownloader({content, fileName, fileExtension, disabled, children, onClick, ...rest}) {

    const saveFile = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    
        let parsed = JSON.stringify(content, null, 4);
        let blob = new Blob([parsed], { type: 'octet/stream' });
    
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        
        document.body.appendChild(a);
        
        a.href = url;
        a.download = fileName+'.'+fileExtension;
    
        setTimeout(() => {
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 100);
    };

    const createElement = (child) => {
     
        const click = (e) => {
            if (onClick) {
                if (disabled) return onClick(e);
                else {
                    saveFile(e);
                    return onClick(e);
                }
            } else {
                return (disabled) ? null : saveFile(e);
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

FileDownloader.propsTypes = {
    content: PropTypes.object.isRequired,
    fileExtension: PropTypes.string.isRequired,
    fileName: PropTypes.string,
    disabled: PropTypes.bool
}

FileDownloader.defaultProps = {
    disabled: false,
    fileName: 'file'
}

FileDownloader.isDecorator=true;

export default FileDownloader;


        
    

