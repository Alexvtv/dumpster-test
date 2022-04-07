import React from 'react';

import {Shortcut} from '../shortcut';

import {ListT} from '../../List';

type ListInnerT = {
    directory:ListT['directory'],
    clickHandler:ListT['clickHandler'],
};

export const ListInner = ({directory, clickHandler}:ListInnerT) => {
    const {contents, type} = directory;

    if (contents?.length) {
        const sortedContents = [...contents].sort((a, b) =>
            (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));

        return <>
            {sortedContents.map((item, index) =>
                <Shortcut item={item} handler={clickHandler} key={index}/>)}
        </>;
    }
    if (type === 'file') {
        return <Shortcut item={directory} handler={clickHandler}/>;
    }
    return <div> Папка пуста</div>;
};
