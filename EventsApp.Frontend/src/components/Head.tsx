import {ReactNode} from 'react';
import HeadNext from 'next/head';

interface HeadTitleProps {
    title: string;
    children?: ReactNode;
}

export default function Head({title, children}: HeadTitleProps): JSX.Element {
    return (
        <HeadNext>
            <title>{`${title}`}</title>
            {children}
        </HeadNext>
    );
}
