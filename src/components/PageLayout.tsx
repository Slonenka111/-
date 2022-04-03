import React from 'react';
import './PageLayout.css'

const PageLayout: React.FC = ({children}) => {
    return (
        <main className='main'>
            {children}
        </main>
    );
}

export default PageLayout
