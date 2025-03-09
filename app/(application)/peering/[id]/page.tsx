import { StepProvider } from "@/packages";
import Promo from "../_components/promo";
import PeeringForm from "../peeringForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const validId = id;
  // const validId = /^[0-9]{1,5}$/.test(id) ? id : "100";

  return (
    <StepProvider>
      <div className="nk-split-content bg-dark is-dark p-5 d-flex justify-between flex-column text-center d-none d-lg-block">
        <Promo />
      </div>

      <div className="nk-split-content nk-split-stretch bg-white p-5 d-flex flex-column">
        <div className="wide-xs-fix-1">
          <PeeringForm employerId={validId} />
        </div>
      </div>
    </StepProvider>
  );
}
