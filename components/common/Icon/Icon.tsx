import * as React from 'react';

const Icon: React.FC<{ type: string }> = ({ type }) => <i className="material-icons">{type}</i>;

export default Icon;
