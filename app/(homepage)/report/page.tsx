import { Suspense } from "react";

import PlanningApplicationsReportContent from "./PlanningApplicationsReportContent";


export default function PlanningApplicationsReport() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlanningApplicationsReportContent />
    </Suspense>
  );
}


