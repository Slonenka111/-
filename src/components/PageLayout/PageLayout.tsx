import React from 'react';
import './PageLayout.scss';

const PageLayout: React.FC = ({ children }) => {
	return <main className="main">{children}</main>;
};

export default PageLayout;
