import { redirect } from "next/navigation";
import { StepProvider } from "@/packages";
import NodeForm from "../nodeForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const uuid = (await params).id;

  const validId =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      uuid,
    )
      ? uuid
      : redirect("/peering/100");

  return (
    <StepProvider>
      <NodeForm uuidId={validId} />
    </StepProvider>
  );
}
