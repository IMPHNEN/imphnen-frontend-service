import { ReactElement } from "react";
import { Contribute } from "./_components/contribute";
import { WorkWithUs } from "./_components/work-with-us";
import { Collaborate } from "./_components/collaborate";

export default function Components(): ReactElement {
  return (
    <main>
      <Contribute />
      <WorkWithUs />
      <Collaborate />
    </main>
  )
}
