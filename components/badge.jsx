import React from 'react';

export const Badge = ({ children, theme = 'info' }) => {
  // 定义不同主题的颜色
  const themes = {
    info: 'rgb(242, 243, 245)',
    primary: 'rgb(64, 128, 255)',
    success: 'rgb(35, 195, 67)',
    warning: 'rgb(255, 125, 0)',
    danger: 'rgb(247, 101, 96)'
  };

  // 根据主题选择颜色
  const color = themes[theme] || themes.info;

  // 定义徽章的样式
  const badgeStyle = {
    display: 'inline-block',
    padding: '0.3em 0.6em',
    fontSize: '0.75em',
    lineHeight: 1,
    color: theme === 'info'? 'inherit' :'#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    borderRadius: '0.25em',
    marginLeft: '0.5em',
    backgroundColor: color
  };

  return <span className='badge' style={badgeStyle}>{children}</span>;
};