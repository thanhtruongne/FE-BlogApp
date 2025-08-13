import { RightOutlined } from '@ant-design/icons';
import React from 'react';
const ChevronRight = () => (
  <RightOutlined className="w-3 h-3 mx-2 text-gray-400" />
  // <svg
  //   className="w-3 h-3 mx-2 text-gray-400"
  //   fill="none"
  //   stroke="currentColor"
  //   viewBox="0 0 24 24"
  // >
  //   <path
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M9 5l7 7-7 7"
  //   />
  // </svg>
);


const BreadcrumbItem = ({ title, slug, isActive, isLast }) => {
  const baseStyles = "transition-colors duration-200 relative leading-[16px] text-[14px]";
  const activeStyles = isActive 
    ? "text-[#076db6] font-medium" 
    : "text-[#757575] hover:text-gray-700";

  if (isLast || !slug) {
    return <span className={`${baseStyles} ${activeStyles}`}>{title}</span>;
  }

  return (
    <a href={slug} className={`${baseStyles} ${activeStyles}`}>
      {title}
    </a>
  );
};

const BreadCrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      {items.map((item, index) => (
        <React.Fragment key={`breadcrumb-${index}`}>
          <BreadcrumbItem
            {...item}
            isActive={index === 0}
          />
          {index < items.length - 1 && <ChevronRight />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadCrumb;