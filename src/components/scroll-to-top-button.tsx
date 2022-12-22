import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const SCROLL_THRESHHOLD = 300;

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisible = () => {
        console.log('aaa scroll ');
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > SCROLL_THRESHHOLD) {
            setIsVisible(true);
        }
        else if (scrolled <= SCROLL_THRESHHOLD) {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible)
    }, []);

    return (<Button
        type="primary"
        onClick={scrollToTop}
        shape="circle" icon={<ArrowUpOutlined />}
        style={{ position: 'fixed', bottom: 20, right: 20, display: isVisible ? 'inline' : 'none' }}
    />)
}