"use client";
import { EditorConstants } from "@/lib/constants";
import { FieldLabel, useField } from "@payloadcms/ui";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

type Props = {
  path: string;
  label: string;
};

export const ContentEditor: React.FC<Props> = ({ path, label }) => {
  const { value, setValue } = useField<string>({ path });

  const handleChange = (content: string) => {
    setValue(content || "");
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
        defaultValue={value ?? ""}
        onChange={(content: string) => {
          handleChange(content);
        }}
        height="300px"
      />
    </div>
  );
};
