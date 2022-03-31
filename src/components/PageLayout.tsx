import React, { ReactNode } from 'react';
import './PageLayout.css';

type Props = {
	children: ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
	return <main className="main">{children}</main>;
};

export default PageLayout;
