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
        console.log("Deauthorize testing..");

              var myHeaders = new Headers();
              myHeaders.append("Authorization", "Basic TGRNdjFfQUhTeWlZdzVzSHZlNFp5Zzp5enVWSVNqdTYzTHlXSTRJNDVGNDlDZExVNmRjaE9JTQ==");
              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
              var urlencoded = new URLSearchParams();
              urlencoded.append("token", "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJkMTA5OTgzZC00ZGNhLTQ3MWEtYWI2OS01ZTE3NDBiNzNkYmMifQ.eyJ2ZXIiOjcsImF1aWQiOiI5ODZkYmM2YWI4Y2VjYzI3YTY1MDczNDlkYzJiNWYyNiIsImNvZGUiOiJtWmtwUDhvMDJUX0lZT3VuanFQU0xPUVlnc3RORmhKcXciLCJpc3MiOiJ6bTpjaWQ6TGRNdjFfQUhTeWlZdzVzSHZlNFp5ZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJJWU91bmpxUFNMT1FZZ3N0TkZoSnF3IiwibmJmIjoxNjQ0MzQwMzY0LCJleHAiOjE2NDQzNDM5NjQsImlhdCI6MTY0NDM0MDM2NCwiYWlkIjoiX2l4MUJPcmdRZ1NBeUpvY3V2OGN5USIsImp0aSI6ImI4ZTY1YWQzLTRhNmQtNDcwZi1hMDM3LTU3YTYwMTg1NzgzOCJ9.UYGFXK1qnPSqvqIA4QT0aX0EIoQPnslyS298meWFA6hpCuzicsUgmzj2kcTyHyhda-QvTuY42tmHocg1iqNTwA");

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded
              };

              fetch("https://zoom.us/oauth/revoke", requestOptions)
                .then(response => response.text())
                .then(result => console.log('hahahahah',result))
                .catch(error => console.log('error', error));
        
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
