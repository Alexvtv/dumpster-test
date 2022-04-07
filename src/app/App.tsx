import React, {useCallback, useState} from 'react';

import data from '../data.json';
import {List} from './components';

import styles from './App.module.scss';

let timeout:any = null;

export type DirectoryT = {
    type:'directory' | 'file',
    name:string,
    contents?:Array<DirectoryT>
}

export const App = () => {
    const [urlValue, setUrlValue] = useState('');
    const [directories, setDirectories] = useState<Array<DirectoryT>>([]);

    const replacing = (str:string) => str.replace(/^\//, '').replace(/\/$/, '');

    const inputHandler = (value:string) => {
        setUrlValue(value);

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (data) setDirectories(getDirectories(replacing(value)));
        }, 1000);
    };

    const clickHandler = useCallback((item:DirectoryT) => {
        setUrlValue(prev => replacing(prev) + `/${item.name}`);
        setDirectories(prev => [...prev, item]);
    }, []);

    // (папка "..")
    const backHandler = () => {
        setUrlValue(prev => {
            const {name} = directories[directories.length - 1];
            const url = replacing(prev);

            return url.substring(0, url.indexOf(`/${name}`));
        });
        setDirectories(prev => prev.filter((el, i) => i !== directories.length - 1));
    };

    const getDirectories = (value:string, directory = data as Array<DirectoryT>, selectedDirectories:Array<DirectoryT> = []):Array<DirectoryT> => {
        const currentDirectory = directory.find(({name}) => value.includes(name));

        //Значение совпадает с названием файла/папки
        if (value === currentDirectory?.name) {
            selectedDirectories.push(currentDirectory);
        } else if (currentDirectory?.contents) {
            const newValue = value.slice(currentDirectory.name.length);

            //Вложенные элементы найдены верно
            if (newValue[0] === '/') {
                selectedDirectories.push(currentDirectory);

                return getDirectories(newValue.slice(1), currentDirectory.contents, [...selectedDirectories]);
            } else {
                //Неверно определена вложенность: url должен обрезаться на символе /
                return getDirectories(value, directory.filter(({name}) => name !== currentDirectory.name));
            }
        } else {
            //Невозможно найти (как минимум дочерний) элемент
            return [];
        }

        return selectedDirectories;
    };

    const directory = directories[directories.length - 1];

    return (
        <div className={styles.app}>
            <input
                placeholder={'dumpster'}
                className={styles.app__input}
                value={urlValue}
                onChange={(e) => inputHandler(e.target.value)}/>
            <div className={styles.app__list}>
                {directory
                    ? <List
                        clickHandler={clickHandler}
                        directory={directory}
                        backHandler={backHandler}/>
                    : <div>Ничего не найдено</div>}
            </div>
        </div>
    );
};
