import classNames from "classnames";
import Link from "next/link";
import React, { ReactNode, AnchorHTMLAttributes } from "react";
import Icon from "../icon/Icon";

// Base props for all components
interface BaseProps {
  className?: string;
  children: ReactNode;
}

// Block Component
interface BlockProps extends BaseProps {
  size?: "sm" | "lg" | "xl";
}

export const Block: React.FC<BlockProps> = ({ className, size, children }) => {
  const blockClass = classNames(
    "nk-block",
    {
      [`nk-block-${size}`]: size,
    },
    className,
  );

  return <div className={blockClass}>{children}</div>;
};

// Content Component
export const Content: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div className={classNames("nk-block-content", className)}>{children}</div>
  );
};

// Between Component
export const Between: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div className={classNames("nk-block-between", className)}>{children}</div>
  );
};

// Head Component
interface HeadProps extends BaseProps {
  size?: "sm" | "lg" | "xl";
  wide?: "sm" | "lg" | "xl";
}

export const Head: React.FC<HeadProps> = ({
  className,
  size,
  wide,
  children,
}) => {
  const blockHeadClass = classNames(
    "nk-block-head",
    {
      [`nk-block-head-${size}`]: size,
      [`wide-${wide}`]: wide,
    },
    className,
  );

  return <div className={blockHeadClass}>{children}</div>;
};

// HeadContent Component
export const HeadContent: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div className={classNames("nk-block-head-content", className)}>
      {children}
    </div>
  );
};

// Title Component
interface TitleProps extends BaseProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  isPageTitle?: boolean;
}

const Title: React.FC<TitleProps> = ({
  className,
  isPageTitle = false,
  children,
  tag: Tag = "h3",
}) => {
  const compClass = classNames(
    "nk-block-title",
    {
      "page-title": isPageTitle,
      title: !isPageTitle,
    },
    className,
  );

  return <Tag className={compClass}>{children}</Tag>;
};

// Description Component
const Des: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div className={classNames("nk-block-des", className)}>{children}</div>
  );
};

// HeadSub Component
const HeadSub: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div className={classNames("nk-block-head-sub", className)}>{children}</div>
  );
};

// BackTo Component
interface BackToProps
  extends BaseProps,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  link: string;
  icon?: string;
}

const BackTo: React.FC<BackToProps> = ({
  className,
  link,
  icon,
  children,
  onClick,
}) => {
  const compClass = classNames("back-to", className);

  return (
    <div className="nk-block-head-sub">
      <Link
        className={compClass}
        href={link}
        legacyBehavior
        onClick={onClick}
        passHref
      >
        <span>
          {icon && <Icon aria-hidden="true" name={icon} />}

          <span>{children}</span>
        </span>
      </Link>
    </div>
  );
};

// Set display names for debugging
Block.displayName = "Block";
Content.displayName = "Block.Content";
Between.displayName = "Block.Between";
Head.displayName = "Block.Head";
HeadContent.displayName = "Block.HeadContent";
Title.displayName = "Block.Title";
Des.displayName = "Block.Des";
HeadSub.displayName = "Block.HeadSub";
BackTo.displayName = "Block.BackTo";

// Attach subcomponents to the Block component for easier import and usage
export default Object.assign(Block, {
  Head,
  HeadContent,
  Content,
  Between,
  Title,
  Des,
  HeadSub,
  BackTo,
});
