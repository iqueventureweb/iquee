"use client";
import { EditorConstants } from "@/lib/constants";
import {
  decodeArticleContent,
  encodeArticleContent,
  isHTMLString,
  stripHtml,
} from "@/lib/globalMethods";
import { FieldLabel, useField } from "@payloadcms/ui";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
type Props = {
  path: string;
  label: string;
};

export const ContentEditor: React.FC<Props> = ({ path, label }) => {
  const { value, setValue, rows } = useField<any>({ path });
  const handleChange = async (content: any) => {
    if (!content || !stripHtml(content)) {
      setValue("");
    } else {
      setValue(encodeArticleContent(content));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
        gap: "0.5rem",
      }}
    >
      <FieldLabel label={label || "Blog Content"} />
      <SunEditor
        {...EditorConstants}
        defaultValue={isHTMLString(value) ? value : decodeArticleContent(value)}
        onChange={(content: any) => {
          handleChange(content);
        }}
        height="300px"
      />
    </div>
  );
};
