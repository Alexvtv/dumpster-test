import React from 'react';

import styles from './Shortcut.module.scss';

import {DirectoryT} from '../../../../App';

type ShortcutT = {
    item:DirectoryT,
    handler:Function,
}

export const Shortcut = ({item, handler}:ShortcutT) => {
    const {name, type} = item;

    return <div
        className={styles.item}
        style={{cursor: type === 'directory' ? 'pointer' : 'auto'}}
        onClick={() => type === 'directory' ? handler(item) : {}}>
        <img
            className={styles[`item__${type}`]}
            src={require(`../../../../../assets/${type}.png`)}
            alt={'icon'}/>
        <p className={styles.item__name}>{name}</p>
    </div>;
};
