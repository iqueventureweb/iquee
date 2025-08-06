export const LOCK_DOCUMENT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const CACHE_REVALIDATE_TIME = 60 * 60 * 24 * 30; // 1 year in seconds

export const EditorConstants = {
  setOptions: {
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      // ['paragraphStyle', 'blockquote'],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor"],
      ["align", "list", "lineHeight"],
      ["outdent", "indent"],

      ["table", "horizontalRule", "link", "image", "video"],
      // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
      // ['imageGallery'], // You must add the "imageGalleryUrl".
      ["fullScreen", "showBlocks", "codeView", "preview"],
      ["removeFormat"],
    ],
    defaultTag: "p",
    showPathLabel: false,
  },
  setDefaultStyle: "font-size: 18px; ",
  zIndex: -1,
};
