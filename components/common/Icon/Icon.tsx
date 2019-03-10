import * as React from 'react';

const Icon: React.SFC<{ type: string }> = ({ type }) => <i className="material-icons">{type}</i>;

export default Icon;
