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
              urlencoded.append("token", "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJjNjMzYmVjOS0xYjI5LTQ2ZTQtYTYwOS1iMjkyZGRlNzYxOGYifQ.eyJ2ZXIiOjcsImF1aWQiOiI5ODZkYmM2YWI4Y2VjYzI3YTY1MDczNDlkYzJiNWYyNiIsImNvZGUiOiJ4bWVYdFc3dm1LX0lZT3VuanFQU0xPUVlnc3RORmhKcXciLCJpc3MiOiJ6bTpjaWQ6TGRNdjFfQUhTeWlZdzVzSHZlNFp5ZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJJWU91bmpxUFNMT1FZZ3N0TkZoSnF3IiwibmJmIjoxNjQ0MzM5NzkzLCJleHAiOjE2NDQzNDMzOTMsImlhdCI6MTY0NDMzOTc5MywiYWlkIjoiX2l4MUJPcmdRZ1NBeUpvY3V2OGN5USIsImp0aSI6ImUzNTgxMzFlLTBkNzUtNGU1NS04MjE0LWNlZTc3NTAyMWY0NSJ9.xHRcBmlaQ9AUBMJaYZGUpJr4cFKdmp89UDBbbdzH5nD6kea_bDrIIVxa2834vOVee8zrRGUonZ2IPaRYw-rLMw");

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
