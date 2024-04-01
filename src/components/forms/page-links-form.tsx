"use client";

import { User } from "next-auth";
import {
  AddCircle,
  Image as ImageIcon,
  LayoutMaximize,
  Ram,
  Trash,
} from "iconic-react";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";
import uniqid from "uniqid";

import { IPage } from "@/types/Page";
import SectionBox from "@/components/section-box";
import SubmitButton from "@/components/buttons/submit-button";
import { OtherLink } from "@/types";
import { uploadImage } from "@/utils/uploadImage";
import { saveOtherLinks } from "@/actions/saveOtherLinks";
import toast from "react-hot-toast";

export default function PageLinksForm({ page }: { page: IPage }) {
  const [links, setLinks] = useState<OtherLink[]>(page.links || []);

  const saveLinks = async () => {
    await saveOtherLinks(links);
    toast.success("Saved!");
  };

  const addNewLink = () => {
    setLinks((prev) => {
      return [
        ...prev,
        {
          id: uniqid(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, linkId: string) => {
    uploadImage(e, (uploadedImageUrl) => {
      setLinks((prev) => {
        const newLinks = [...prev];
        newLinks.forEach((link) => {
          if (link.id === linkId) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  };

  const handleInputChange = (
    linkId: string,
    e: ChangeEvent<HTMLInputElement>,
    inputType: keyof OtherLink
  ) => {
    setLinks((prev) => {
      const newLinks = [...prev];

      newLinks.forEach((link) => {
        if (link.id === linkId) {
          link[inputType] = e.target.value;
        }
      });

      return newLinks;
    });
  };

  const removeLink = (linkId: string) => {
    setLinks((prev) => {
      return [...prev].filter((link) => link.id !== linkId);
    });
  };

  return (
    <SectionBox>
      <form action={saveLinks} className="p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Links</h2>
        <div className="px-4">
          <button type="button" onClick={addNewLink} className="add-new-btn">
            <span>Add new</span>
            <AddCircle className="h-5 w-5 md:h-7 md:w-7" variant="Bold" />
          </button>

          <div className="mt-8">
            <ReactSortable list={links} setList={setLinks} handle=".handle">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="mb-4 flex flex-col md:flex-row items-center gap-4 border border-gray-400 rounded-md py-2 px-6 relative"
                >
                  <LayoutMaximize className="handle w-7 h-7 cursor-grabbing  text-gray-500 hover:text-black transition-all ease-in absolute top-2 left-2" />
                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="md:hidden hover:text-red-500 transition-all ease-out absolute top-2 right-2"
                  >
                    <Trash className="h-6 w-6" variant="Bold" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="hidden md:block hover:text-red-500 transition-all ease-out absolute bottom-2 left-2"
                  >
                    <Trash className="h-6 w-6" variant="Bold" />
                  </button>

                  {/* Image Input */}
                  <label
                    htmlFor={`icon${link.id}`}
                    className={`bg-neutral-600 hover:bg-neutral-400 transition-all ease-out text-white rounded-full h-full w-fit cursor-pointer ${
                      !link.icon && "p-2.5 md:p-[38px]"
                    }`}
                  >
                    {!link.icon ? (
                      <ImageIcon />
                    ) : (
                      <Image
                        src={link.icon}
                        alt="Icon"
                        width={160}
                        height={160}
                        className="aspect-square rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      id={`icon${link.id}`}
                      onChange={(e) => handleUpload(e, link.id)}
                      className="sr-only"
                    />
                  </label>

                  {/* Labels and Input Boxes */}
                  <div className="grow">
                    <label
                      htmlFor={`title${link.id}`}
                      className="page-info-label"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`title${link.id}`}
                      placeholder="Title"
                      value={link.title}
                      onChange={(e) => handleInputChange(link.id, e, "title")}
                      className="link-input"
                    />

                    <label
                      htmlFor={`subtitle${link.id}`}
                      className="page-info-label"
                    >
                      Subtitle
                    </label>
                    <input
                      type="text"
                      id={`subtitle${link.id}`}
                      placeholder="Subtitle (Optional)"
                      value={link.subtitle}
                      onChange={(e) =>
                        handleInputChange(link.id, e, "subtitle")
                      }
                      className="link-input"
                    />

                    <label
                      htmlFor={`url${link.id}`}
                      className="page-info-label"
                    >
                      URL
                    </label>
                    <input
                      type="text"
                      id={`url${link.id}`}
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => handleInputChange(link.id, e, "url")}
                      className="link-input"
                    />
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>

          {/* Submit Button */}
          <div className="border-t pt-4 mt-4">
            <div className="max-w-64 mx-auto md:ml-auto md:mx-0">
              <SubmitButton>
                <Ram size="24" />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </SectionBox>
  );
}
