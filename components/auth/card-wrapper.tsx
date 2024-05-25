"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import AuthHeader from "./auth-header";
import BackButton from "./back-button";

interface CardWrapperProps {
  label: string;
  title: string;
  children: React.ReactNode;
}
const CardWrapper = ({ label, title, children }: CardWrapperProps) => {
  return (
    <Card className=" shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
