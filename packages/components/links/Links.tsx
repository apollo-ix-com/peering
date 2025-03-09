import classNames from "classnames";
import Link from "next/link";
import React, { ReactNode } from "react";
import Icon from "../icon/Icon";

// Define types for LinkItem props
export interface LinkItemProps {
  tag?: string;
  link: string;
  icon?: string;
  text?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler;
}

export const LinkItem: React.FC<LinkItemProps> = ({
  tag,
  link,
  icon,
  text,
  children,
  ...props
}) => {
  const content = (
    <>
      {icon && <Icon name={icon} />}

      <span>{text || children}</span>
    </>
  );

  return (
    <li>
      {tag !== "a" ? (
        <Link href={process.env.NEXT_PUBLIC_URL + link} {...props}>
          {content}
        </Link>
      ) : (
        <a
          href={process.env.NEXT_PUBLIC_URL + link}
          onClick={props.onClick}
          role="link"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault(); // Prevent default scrolling for Space key
              props.onClick?.(
                e as unknown as React.MouseEvent<Element, MouseEvent>,
              );
            }
          }}
          {...props}
        >
          {content}
        </a>
      )}
    </li>
  );
};

// Define types for LinkList props
interface LinkListProps {
  opt?: boolean;
  className?: string;
  children?: ReactNode;
  click?: React.MouseEventHandler;
}

export const LinkList: React.FC<LinkListProps> = ({
  opt,
  className,
  children,
  click,
}) => {
  const listClasses = classNames({
    "link-list": !opt,
    "link-list-opt": opt,
    [`${className}`]: className,
  });

  return (
    <ul
      className={listClasses}
      onClick={click}
      role="list"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Prevent scroll behavior for Space key
          if (click) {
            const mouseEvent = {
              ...e,
              type: "click",
            } as unknown as React.MouseEvent<HTMLUListElement>;
            click(mouseEvent);
          }
        }
      }}
    >
      {children}
    </ul>
  );
};
