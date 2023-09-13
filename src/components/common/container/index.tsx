import { ReactNode } from "react";
import classes from "@src/components/common/container/container.module.css";

export default function Container({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor?: string;
}) {
  const styles: { backgroundColor: string } | {} = bgColor
    ? {
        backgroundColor: bgColor,
      }
    : {};

  return (
    <>
      <div style={styles} className={classes.container}>
        {children}
      </div>
    </>
  );
}
