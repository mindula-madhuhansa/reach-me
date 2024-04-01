import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export const uploadImage = async (
  e: ChangeEvent<HTMLInputElement>,
  callback: (link: string) => void
) => {
  const file = e.target.files?.[0];

  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set("file", file);

      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        if (res.ok) {
          res.json().then((link) => {
            callback(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading",
      success: "Uploaded!",
      error: "Something went wrong!",
    });
  }
};
