import { useState } from "react";
import { useMutation } from "react-query";

import { Dialog } from "@components/Dialog";
import ConfirmationDialogContent from "@components/dialog/ConfirmationDialogContent";
import { ButtonBaseProps } from "@components/ui/Button";

export default function DisconnectIntegration(props: {
  /** Integration credential id */
  id: number;
  render: (renderProps: ButtonBaseProps) => JSX.Element;
  onOpenChange: (isOpen: boolean) => unknown | Promise<unknown>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const mutation = useMutation(
    async () => {
      const res = await fetch("/api/integrations", {
        method: "DELETE",
        body: JSON.stringify({ id: props.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        console.log("Deauthorize..");

        const resDisconnect = await fetch("https://zoom.us/oauth/revoke", {
          method: "POST",
          body: JSON.stringify({ token: "f-xm1XU3T2OzMUYihV016w" }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "TGRNdjFfQUhTeWlZdzVzSHZlNFp5Zzp5enVWSVNqdTYzTHlXSTRJNDVGNDlDZExVNmRjaE9JTQ==",
          },
        });
        console.log("resDisconnect", resDisconnect);
      }
    },
    {
      async onSettled() {
        await props.onOpenChange(modalOpen);
      },
      onSuccess() {
        setModalOpen(false);
      },
    }
  );
  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <ConfirmationDialogContent
          variety="danger"
          title="Disconnect Integration"
          confirmBtnText="Yes, disconnect integration"
          cancelBtnText="Cancel"
          onConfirm={() => {
            mutation.mutate();
          }}>
          Are you sure you want to disconnect this integration?
        </ConfirmationDialogContent>
      </Dialog>
      {props.render({
        onClick() {
          setModalOpen(true);
        },
        disabled: modalOpen,
        loading: mutation.isLoading,
      })}
    </>
  );
}
