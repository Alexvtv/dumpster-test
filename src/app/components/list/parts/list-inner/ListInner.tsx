import React from 'react';

import {Shortcut} from '../shortcut';

import {ListT} from '../../List';

type ListInnerT = {
    directory:ListT['directory'],
    clickHandler:ListT['clickHandler'],
};

export const ListInner = ({directory, clickHandler}:ListInnerT) => {
    if (directory.contents?.length) {
        return <>
            {directory.contents.map((item, index) =>
                <Shortcut item={item} handler={clickHandler} key={index}/>)}
        </>;
    }
    if (directory.type === 'file') {
        return <Shortcut item={directory} handler={clickHandler}/>;
    }
    return <div> Папка пуста</div>;
};
