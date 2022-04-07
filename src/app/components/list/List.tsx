import React from 'react';

import {Shortcut} from './parts';
import {DirectoryT} from '../../App';

import {ListInner} from './parts';

export type ListT = {
    directory:DirectoryT,
    clickHandler:Function,
    backHandler:Function
};

const backItem:DirectoryT = {name: '..', type: 'directory'};

export const List = React.memo(({directory, clickHandler, backHandler}:ListT) =>
    <>
        <Shortcut item={backItem} handler={backHandler}/>
        <ListInner directory={directory} clickHandler={clickHandler}/>
    </>, (prev, next) => prev.directory === next.directory);
