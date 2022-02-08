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
          body: JSON.stringify({ token: "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJlMGUwODQyMy05ZjYwLTRkYTYtYTcyMC0wM2FhNjU0MWRkMTEifQ.eyJ2ZXIiOjcsImF1aWQiOiI5ODZkYmM2YWI4Y2VjYzI3YTY1MDczNDlkYzJiNWYyNiIsImNvZGUiOiJGamM4cHM0dlZXX0lZT3VuanFQU0xPUVlnc3RORmhKcXciLCJpc3MiOiJ6bTpjaWQ6TGRNdjFfQUhTeWlZdzVzSHZlNFp5ZyIsImdubyI6MCwidHlwZSI6MSwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJJWU91bmpxUFNMT1FZZ3N0TkZoSnF3IiwibmJmIjoxNjQ0MzMzNDM5LCJleHAiOjIxMTczNzM0MzksImlhdCI6MTY0NDMzMzQzOSwiYWlkIjoiX2l4MUJPcmdRZ1NBeUpvY3V2OGN5USIsImp0aSI6ImU2YWU1ODg3LTIxMjItNDc4MS1iNmU5LWU3NTVjMjQ1NzRiZSJ9.tnIEzKP5Ghf3DAZGM4N3bylKr1Dgb6xUGWiyQ7klSOl8R7zd2dzW9B4SSEx028UFJ_MJ2gpfLl0nrWaq-dSfFA" }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic TGRNdjFfQUhTeWlZdzVzSHZlNFp5Zzp5enVWSVNqdTYzTHlXSTRJNDVGNDlDZExVNmRjaE9JTQ==",
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
