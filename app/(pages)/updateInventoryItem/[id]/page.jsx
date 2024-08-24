import React from "react";
import UpdateInventoryForm from "@/app/(pages)/updateInventoryItem/[id]/UpdateInventoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = ({ params }) => {
  const { id } = params;

  //look up the single item using id (in handle submit) fetch route

  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Item</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateInventoryForm />
      </CardContent>
    </Card>
  );
};

export default page;
