/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
      maxLength: 200,
    },
    {
      fieldName: "heroTitle",
      type: "string",
      required: false,
      label: "Hero Title",
      maxLength: 100,
    },
    {
      fieldName: "heroSubtitle",
      type: "string",
      required: false,
      label: "Hero Subtitle",
      maxLength: 300,
    },
    {
      fieldName: "uploadCtaLabel",
      type: "string",
      required: false,
      label: "Upload CTA Button Label",
      maxLength: 60,
    },
    {
      fieldName: "uploadHint",
      type: "string",
      required: false,
      label: "Upload Hint Text",
      maxLength: 120,
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
      maxLength: 200,
    },
    {
      fieldName: "colors",
      type: "object",
      required: false,
      label: "Extended Colors",
      fields: [
        { fieldName: "background", type: "color", required: false, label: "Page Background" },
        { fieldName: "surface", type: "color", required: false, label: "Card Surface" },
        { fieldName: "textPrimary", type: "color", required: false, label: "Primary Text" },
        { fieldName: "textMuted", type: "color", required: false, label: "Muted Text" },
        { fieldName: "success", type: "color", required: false, label: "Success" },
        { fieldName: "warning", type: "color", required: false, label: "Warning" },
        { fieldName: "destructive", type: "color", required: false, label: "Destructive" },
      ],
    },
    {
      fieldName: "features",
      type: "array",
      required: false,
      label: "Feature Highlights",
      item: {
        type: "object",
        fields: [
          { fieldName: "icon", type: "string", required: true, label: "Icon Name (lucide)" },
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "description", type: "string", required: false, label: "Description" },
        ],
      },
    },
    {
      fieldName: "maxUploadSizeMb",
      type: "number",
      required: false,
      label: "Max Upload Size (MB)",
      min: 1,
      max: 500,
    },
    {
      fieldName: "showLandingPage",
      type: "boolean",
      required: false,
      label: "Show Landing Page",
    },
    {
      fieldName: "showTranscriptSearch",
      type: "boolean",
      required: false,
      label: "Enable Transcript Search",
    },
  ],
};
