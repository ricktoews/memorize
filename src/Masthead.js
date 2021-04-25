import React, { useRef, useState } from 'react';
import { useOnClickOutside } from './hooks';
import { Burger, Menu } from './components/nav';
import styled from 'styled-components';

const SiteHeader = styled.header`
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100vw;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;

	background: ${({ theme }) => theme.mastheadBg};
	color: ${({ theme }) => theme.mastheadColor};
	font-size: 20px;
`;

function Masthead(props) {
	const { title, children } = props;
	const [open, setOpen] = useState(false);

	const node = useRef(); 
	useOnClickOutside(node, () => setOpen(false));

	return (
		<SiteHeader>
	          <div ref={node}>
	            <Burger open={open} setOpen={setOpen}/>
	            <Menu open={open} setOpen={setOpen}/>
	          </div>
		  {children}
                  <div className="title">{title}</div>
		</SiteHeader>
	);
}

export default Masthead;
